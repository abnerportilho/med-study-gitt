import type { ExamItem, Measurement, ParsedReport } from '../parser/types';
import { RULES, contextGroup, fallbackRule, findRuleIndex, isIgnored, perVolume, type PrintRule } from './rules';
import { panelIndex } from './panels';

export interface LineEntry {
  /** Identificador estável dentro do laudo (para marcar/desmarcar na tela). */
  id: string;
  abbr: string;
  /** Valor principal como impresso ("13,2", "3.782", "Negativo"). */
  value: string;
  unit?: string;
  /** Percentual do leucograma, quando a linha traz % e absoluto. */
  percent?: string;
  group?: string;
  /** Casou uma regra (ou é item de urina); false = só o rótulo impresso. */
  known: boolean;
  /** Repetição de um analito já impresso (histórico, segundo hemograma): fica fora da linha. */
  duplicate: boolean;
  /** Entra na linha por padrão. */
  selected: boolean;
  /** Painel clínico (índice em PANELS): hemograma, glicemia, função renal... */
  panel: number;
  item: ExamItem;
}

export interface LineOptions {
  units: boolean;
  date: boolean;
  /** Exames do mesmo painel juntos (hemograma, glicemia, função renal...), na ordem dos painéis. */
  grouped: boolean;
  /** Lista: uma linha por painel (ou por exame, sem agrupar). Linha: tudo numa linha só. */
  list: boolean;
}

export const DEFAULT_OPTIONS: LineOptions = { units: true, date: true, grouped: true, list: false };

/** Unidade canônica (minúscula) → como aparece no prontuário. */
const UNIT_DISPLAY: Record<string, string> = {
  'g/dl': 'g/dL',
  'g/l': 'g/L',
  'mg/dl': 'mg/dL',
  'mg/l': 'mg/L',
  'mg/g': 'mg/g',
  'mg/24h': 'mg/24h',
  'µg/dl': 'µg/dL',
  'µg/l': 'µg/L',
  'µg/ml': 'µg/mL',
  'ng/ml': 'ng/mL',
  'ng/dl': 'ng/dL',
  'ng/l': 'ng/L',
  'ng/ml feu': 'ng/mL FEU',
  'pg/ml': 'pg/mL',
  pg: 'pg',
  fl: 'fL',
  '/mm3': '/mm³',
  '/µl': '/µL',
  '/ml': '/mL',
  '/campo': '/campo',
  'milhões/mm3': 'milhões/mm³',
  'milhões/µl': 'milhões/µL',
  'mmol/l': 'mmol/L',
  'µmol/l': 'µmol/L',
  'nmol/l': 'nmol/L',
  'pmol/l': 'pmol/L',
  'meq/l': 'mEq/L',
  'mosm/kg': 'mOsm/kg',
  'u/l': 'U/L',
  'u/ml': 'U/mL',
  'ui/l': 'UI/L',
  'ui/ml': 'UI/mL',
  'mui/l': 'mUI/L',
  'mui/ml': 'mUI/mL',
  'µui/ml': 'µUI/mL',
  'µu/ml': 'µU/mL',
  'ml/min/1,73m2': 'mL/min/1,73m²',
  'ml/min': 'mL/min',
  'mm/h': 'mm/h',
  mmhg: 'mmHg',
  s: 's',
  '%': '%',
};

export const displayUnit = (unit?: string) => (unit ? (UNIT_DISPLAY[unit] ?? unit) : '');

/**
 * Leucograma: o laudo traz "% /µL" (DASA-SP, Biosul), "% absoluto" sem unidades
 * (Sabin) ou só um dos dois. Devolve o absoluto e o percentual que existirem.
 */
function differential(values: Measurement[]): { main: Measurement; percent?: string } | undefined {
  const abs = perVolume(values);
  const pct = values.find((v) => v.unit === '%');
  if (abs) return { main: abs, percent: pct?.value };
  if (pct) return { main: pct };
  const [first, second] = values;
  if (!first) return undefined;
  // "56 2.049 40-70": percentual e absoluto sem unidade, como no Sabin. O número é lido no
  // formato brasileiro: "13.047" é treze mil (absoluto atual de uma tabela evolutiva), não 13,047%.
  if (second && !second.unit && ptNumber(first.value) <= 100) {
    return { main: { value: second.value, unit: '/µl' }, percent: first.value };
  }
  return { main: first };
}

/**
 * Itens na ordem da linha: os reconhecidos pela posição da regra, depois os demais
 * na ordem do documento. Quando a mesma regra casa duas vezes no mesmo grupo
 * (histórico, dois hemogramas), a primeira ocorrência vence e as outras ficam
 * marcadas como repetição.
 */
export function toEntries(report: ParsedReport): LineEntry[] {
  const seen = new Set<string>();
  // "Rótulo: Inferior a X" só vale quando o exame não tem outro valor no laudo: com o
  // mesmo formato vêm as faixas de referência ("Colesterol total: Inferior a 190 mg/dL").
  const plainRules = new Set(report.items.filter((it) => !it.comparatorRow && !isIgnored(it)).map((it) => findRuleIndex(it)));
  return report.items
    .flatMap((item, docIndex) => {
      if (isIgnored(item)) return [];
      const index = findRuleIndex(item);
      if (item.comparatorRow && (index < 0 || plainRules.has(index))) return [];
      const inContext = !!contextGroup(item);
      const known = index >= 0 || inContext;
      const rule: PrintRule = index >= 0 ? RULES[index] : fallbackRule(item);
      const group = rule.group?.(item);
      const key = index >= 0 ? `${index}|${group ?? ''}` : `${group ?? ''}|${rule.abbr.toUpperCase()}`;
      const duplicate = seen.has(key);
      const entry = toEntry(rule, item, known, group, duplicate, `${docIndex}`);
      if (!entry) return [];
      seen.add(key);
      // Urina e afins ficam depois do sangue, na ordem do laudo; desconhecidos por último.
      const order = index >= 0 ? index : RULES.length + (inContext ? 0 : 10_000) + docIndex;
      return [{ order, entry }];
    })
    .sort((a, b) => a.order - b.order)
    .map((e) => e.entry);
}

function toEntry(
  rule: PrintRule,
  item: ExamItem,
  known: boolean,
  group: string | undefined,
  duplicate: boolean,
  id: string,
): LineEntry | null {
  let main: Measurement | undefined;
  let percent: string | undefined;
  if (rule.differential) {
    const d = differential(item.values);
    main = d?.main;
    percent = d?.percent;
  } else {
    main = rule.pick ? rule.pick(item.values) : item.values[0];
  }
  if (!main) return null;
  let unit = main.unit;
  if (!unit && rule.suffix) unit = rule.suffix;
  // Valor com comparador ("> 45", "< 100") num item desconhecido quase sempre é referência.
  const hasData = (!!unit && !/^[<>]/.test(main.value)) || !!main.qualitative || !!percent;
  return {
    id,
    abbr: rule.abbr,
    value: main.value,
    unit,
    percent,
    group,
    known,
    duplicate,
    // Itens desconhecidos sem unidade costumam ser lixo (números de texto corrido): ficam
    // desmarcados. "Resultado:" logo abaixo de um título é confiável mesmo sem unidade.
    selected: !duplicate && !isOrphanResult(item) && (known || hasData || isTitledResult(item)),
    panel: panelIndex(rule.abbr, known, group, item),
    item,
  };
}

const isResult = (item: ExamItem) => /^RESULTADOS?$/i.test(item.label);
const isTitledResult = (item: ExamItem) => isResult(item) && item.exam !== item.label;
/** "Resultado:" sem título de exame acima: não se sabe de quê, fica para o médico decidir. */
const isOrphanResult = (item: ExamItem) => isResult(item) && item.exam === item.label;

/** "3.660" → 3660, "11,3" → 11.3 (ponto é milhar, vírgula é decimal). */
export function ptNumber(value: string): number {
  return Number(value.replace(/[<>\s]/g, '').replace(/\.(?=\d{3}(?!\d))/g, '').replace(',', '.'));
}

/** "13,2 g/dL", "39%", "8.500/mm³", "3.782/mm³ (62%)", "Negativo". */
export function formatValue(e: LineEntry, opts: LineOptions = DEFAULT_OPTIONS): string {
  const unit = opts.units ? displayUnit(e.unit) : e.unit === '%' ? '%' : '';
  const sep = !unit || unit === '%' || unit.startsWith('/') ? '' : ' ';
  let out = `${e.value}${sep}${unit}`;
  if (e.percent) out += ` (${e.percent.replace(/%$/, '')}%)`;
  return out;
}

/** dd/mm/aaaa → dd/mm/aa. */
export function shortDate(date: string): string {
  const m = /^(\d{2})\/(\d{2})\/(\d{2,4})$/.exec(date);
  return m ? `${m[1]}/${m[2]}/${m[3].slice(-2)}` : date;
}

/**
 * O texto para o prontuário: "(14/05/26) Hb 13,2 g/dL | Ht 39% | ... | Urina: pH 6,0, Nitrito Negativo".
 * Itens de um grupo (gasometria, urina) saem juntos na posição do primeiro. Agrupado, os
 * exames seguem a ordem dos painéis (PANELS); em lista, cada painel vai numa linha.
 */
export function buildLine(entries: LineEntry[], collectedAt: string | undefined, opts: LineOptions = DEFAULT_OPTIONS): string {
  // Agrupado: ordem dos painéis; dentro do painel, a ordem de sempre (ordem estável).
  const chosen = entries.filter((e) => e.selected);
  if (opts.grouped) chosen.sort((a, b) => a.panel - b.panel);
  // Cada parte é um exame, ou um grupo de contexto inteiro ("Urina: pH 6,0, Nitrito Negativo").
  const parts: { panel: number; text: string }[] = [];
  const emitted = new Set<string>();
  for (const e of chosen) {
    if (!e.group) {
      parts.push({ panel: e.panel, text: `${e.abbr} ${formatValue(e, opts)}` });
    } else if (!emitted.has(e.group)) {
      emitted.add(e.group);
      const inGroup = chosen.filter((x) => x.group === e.group).map((x) => `${x.abbr} ${formatValue(x, opts)}`);
      parts.push({ panel: e.panel, text: `${e.group}: ${inGroup.join(', ')}` });
    }
  }
  if (!parts.length) return '';
  const date = opts.date && collectedAt ? `(${shortDate(collectedAt)})` : '';
  if (!opts.list) {
    const body = parts.map((p) => p.text).join(' | ');
    return date ? `${date} ${body}` : body;
  }
  // Lista: uma linha por painel quando agrupado, senão uma linha por exame.
  const lines: string[] = [];
  parts.forEach((p, i) => {
    if (opts.grouped && i > 0 && parts[i - 1].panel === p.panel) lines[lines.length - 1] += ` | ${p.text}`;
    else lines.push(p.text);
  });
  return [date, ...lines].filter(Boolean).join('\n');
}
