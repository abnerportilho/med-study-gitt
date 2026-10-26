import type { ExamItem, Measurement, ParsedReport } from './types';
import type { Layout } from './layouts';
import type { PageLines } from '../pdf/extract';

/**
 * Parser genérico de laudos impressos como linhas "rótulo + número(s) [unidade]":
 *
 *   TÍTULO DO EXAME
 *   RÓTULO....: 11,3 g/dL
 *   HEMOGLOBINA 11,3 g/dL 12,0 a 15,8
 *   Hemoglobina 7,4 g/dL 13,0 a 17,0 g/dL
 *
 * Percorre as linhas página a página, lembra o título do exame atual e coleta
 * cada linha aceita. Tudo o que depende do laboratório (o que pular, o que é
 * resultado, o que abre/fecha um exame) vem do Layout.
 */

// Número como impresso: "11,3", "3.660", "1.576,0", "-6,2", "> 2.000".
const NUM = String.raw`[<>]?\s?-?\d+(?:[.,]\d+)*`;
const NUM_RE = new RegExp(`^${NUM}$`);

// "RÓTULO....: 11,3 g/dL 12,0 a 15,8" ou "RÓTULO 11,3 g/dL ...". O grupo 2 captura os
// dois-pontos, quando há. O número pode ter marcador ("128*") ou unidade colada
// ("92mg/dL"); datas, horas e números de documento ("03/09/2026") não passam.
// O rótulo pode começar com número quando grudado em letras ("25-OH Vitamina D").
const LABEL_START = String.raw`(?:\d{1,2}-?(?=[A-Za-zÀ-ÿ]))?[A-Za-zÀ-ÿ*]`;
const ROW = new RegExp(
  String.raw`^(${LABEL_START}[A-Za-zÀ-ÿ0-9 ()\-/.,*ªº³^+=&≥≤]*?)(?:\s*\.*\s*(:)\s*|\s+)(${NUM})\*?(?=\s|$|[A-Za-zµμ%]|\/(?!\d))\s*(.*)$`,
);
// Marcadores de resultado fora da referência que alguns laboratórios imprimem.
const FLAG = /^\(?(H|L|A|B|AA|BB|HH|LL|\*{1,2}|↑|↓|▲|▼)\)?$/;
// Número com unidade grudada, no meio da linha: "4.464/mm3", "45,0%".
const GLUED = /^([<>]?-?\d+(?:[.,]\d+)*)((?:[%A-Za-zµμ]|\/(?!\d)).*)$/;
// Prefixos que não fazem parte do rótulo: "RESULTADO: COLESTEROL TOTAL : 232", "- HDL : 32".
// Só quando vem um rótulo depois: "RESULTADO: 53" continua sendo o resultado do título.
const ROW_PREFIX = /^(?:RESULTADO\s*:\s*(?=[A-Za-zÀ-ÿ]|[-–•·]\s)|[-–•·]\s+)+/i;

// Resultado escrito por extenso, só depois de ":" ("Nitrito: Negativo", "HBsAg....: Não reagente").
const QUALITATIVE = String.raw`tra[çc]os|moderad[oa]s|abundantes|escass[oa]s|pouc[oa]s|incont[áa]veis|n[ãa]o\s+reagentes?|reagentes?|negativ[oa]s?|positiv[oa]s?|ausentes?|presentes?|indetect[áa]vel|detect[áa]vel|raros?|raras?|numeros[oa]s|frequentes|l[íi]mpid[oa]|ligeiramente\s+turv[oa]|turv[oa]|amarel[oa](?:[- ]citrino|\s+claro|\s+escuro)?|citrino`;
// Com ":" ou pontilhado o valor pode vir sozinho; sem eles, a linha tem de terminar no
// resultado (e talvez na referência, também por extenso), para texto corrido não passar.
const QUAL_START = new RegExp(String.raw`^(?:${QUALITATIVE})(?![A-Za-zÀ-ÿ])`, 'i');
const QUAL_ROW = new RegExp(
  String.raw`^(${LABEL_START}[A-Za-zÀ-ÿ0-9 ()\-/,*+]*?)(?:\s*\.*\s*:|\s*\.{3,}|\s)\s*(${QUALITATIVE})(?:\s+(?:${QUALITATIVE}|n[ãa]o\s+dispon[íi]vel|[<>]?[\d.,]+))?\s*$`,
  'i',
);

/**
 * Unidades que um resultado pode trazer. Cada uma vira uma unidade canônica e o
 * fator que leva o valor impresso para ela ("85 x 10³/mm3" → "85.000 /mm3"),
 * assim o resto do código nunca precisa saber como cada laboratório escreve "mil por µL".
 * As chaves são normalizadas com normUnit na carga; escreva-as naturalmente.
 */
const UNIT_TABLE: Record<string, { unit: string; factor?: number }> = {
  '%': { unit: '%' },
  '/µL': { unit: '/µl' },
  '/uL': { unit: '/µl' },
  'µL': { unit: '/µl' },
  '/mm3': { unit: '/mm3' },
  'mm3': { unit: '/mm3' },
  '/mm³': { unit: '/mm3' },
  'céls/mm3': { unit: '/mm3' },
  'cels/mm3': { unit: '/mm3' },
  'células/mm3': { unit: '/mm3' },
  'céls/µL': { unit: '/µl' },
  'mil/mm3': { unit: '/mm3', factor: 1000 },
  'mil/µL': { unit: '/µl', factor: 1000 },
  'mil/uL': { unit: '/µl', factor: 1000 },
  'x 10³/mm3': { unit: '/mm3', factor: 1000 },
  'x10³/mm3': { unit: '/mm3', factor: 1000 },
  'x 10³/µL': { unit: '/µl', factor: 1000 },
  'x10³/µL': { unit: '/µl', factor: 1000 },
  '10^3/µL': { unit: '/µl', factor: 1000 },
  '10^3/uL': { unit: '/µl', factor: 1000 },
  '10³/µL': { unit: '/µl', factor: 1000 },
  '10³/mm3': { unit: '/mm3', factor: 1000 },
  '10^6/µL': { unit: 'milhões/µl' },
  '10^6/uL': { unit: 'milhões/µl' },
  '10⁶/µL': { unit: 'milhões/µl' },
  'x 10^6/µL': { unit: 'milhões/µl' },
  'milhões/mm3': { unit: 'milhões/mm3' },
  'milhões/µL': { unit: 'milhões/µl' },
  'milhões/uL': { unit: 'milhões/µl' },
  'tera/L': { unit: 'milhões/µl' },
  'g/dL': { unit: 'g/dl' },
  'g/L': { unit: 'g/l' },
  'mg/dL': { unit: 'mg/dl' },
  'mg/L': { unit: 'mg/l' },
  'mg/g': { unit: 'mg/g' },
  'mg/24h': { unit: 'mg/24h' },
  'mg/24 horas': { unit: 'mg/24h' },
  'µg/dL': { unit: 'µg/dl' },
  'ug/dL': { unit: 'µg/dl' },
  'µg/L': { unit: 'µg/l' },
  'mcg/dL': { unit: 'µg/dl' },
  'mcg/L': { unit: 'µg/l' },
  'mcg/mL': { unit: 'µg/ml' },
  'µg/mL': { unit: 'µg/ml' },
  'ng/mL': { unit: 'ng/ml' },
  'ng/dL': { unit: 'ng/dl' },
  'ng/L': { unit: 'ng/l' },
  'ng/mL FEU': { unit: 'ng/ml feu' },
  'pg/mL': { unit: 'pg/ml' },
  'pg': { unit: 'pg' },
  'fL': { unit: 'fl' },
  'µ3': { unit: 'fl' },
  'µm3': { unit: 'fl' },
  'mmol/L': { unit: 'mmol/l' },
  'µmol/L': { unit: 'µmol/l' },
  'nmol/L': { unit: 'nmol/l' },
  'pmol/L': { unit: 'pmol/l' },
  'mEq/L': { unit: 'meq/l' },
  'mOsm/kg': { unit: 'mosm/kg' },
  'U/L': { unit: 'u/l' },
  'U/mL': { unit: 'u/ml' },
  'UI/L': { unit: 'ui/l' },
  'UI/mL': { unit: 'ui/ml' },
  'IU/mL': { unit: 'ui/ml' },
  'IU/L': { unit: 'ui/l' },
  'mIU/mL': { unit: 'mui/ml' },
  'mIU/L': { unit: 'mui/l' },
  'µIU/mL': { unit: 'µui/ml' },
  'uIU/mL': { unit: 'µui/ml' },
  'mUI/L': { unit: 'mui/l' },
  'mUI/mL': { unit: 'mui/ml' },
  'µUI/mL': { unit: 'µui/ml' },
  'uUI/mL': { unit: 'µui/ml' },
  'microUI/mL': { unit: 'µui/ml' },
  'µU/mL': { unit: 'µu/ml' },
  'uU/mL': { unit: 'µu/ml' },
  'mL/min/1,73m2': { unit: 'ml/min/1,73m2' },
  'mL/min/1.73m2': { unit: 'ml/min/1,73m2' },
  'mL/min/1,73 m2': { unit: 'ml/min/1,73m2' },
  'mL/min': { unit: 'ml/min' },
  'mm/1h': { unit: 'mm/h' },
  'mm/h': { unit: 'mm/h' },
  'mm/1ª hora': { unit: 'mm/h' },
  'mmHg': { unit: 'mmhg' },
  '/mL': { unit: '/ml' },
  '/campo': { unit: '/campo' },
  'p/campo': { unit: '/campo' },
  'por campo': { unit: '/campo' },
  'segundos': { unit: 's' },
  'seg': { unit: 's' },
  'seg.': { unit: 's' },
  's': { unit: 's' },
};

// Mu grego (U+03BC, como o pdf.js entrega no Sabin) vs. sinal micro (U+00B5); sobrescritos variam.
const normUnit = (tokens: string[]) =>
  tokens
    .join(' ')
    .toLowerCase()
    .replace(/μ/g, 'µ')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/⁶/g, '6');

const UNITS = new Map(Object.entries(UNIT_TABLE).map(([k, v]) => [normUnit([k]), v]));

const UNIT_BELOW = /^Unidades?\s*:\s*(\S+)/i;

// Assinaturas e registros profissionais aparecem no rodapé de todo layout.
const COMMON_SKIP = [/^[0-9A-Fa-f]{40,}$/, /\b(CRM|CRBM|CRF)\b/];

// Data da coleta, do rótulo mais confiável para o menos; o primeiro que casar no documento vence.
const COLLECTED = [
  /data\s+(?:da\s+)?coleta[^\d\n]{0,25}(\d{2}\/\d{2}\/\d{2,4})/i,
  /colet(?:ad[oa]|a)\s+em[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
  /colhid[oa]\s+em[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
  /coleta[^:\n]{0,30}:\s*(\d{2}\/\d{2}\/\d{2,4})/i,
  /data\s+(?:de\s+)?atend\w*[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
  /entrada[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
  /recebid[oa]\/colet\w*\s+em[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
  /data\s+(?:d[ae]\s+)?(?:req|cadastro|recebimento)\w*[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
];

// Linhas de resultado são curtas; uma linha gigante num PDF hostil faria a regex ROW
// (com backtracking) travar a thread principal.
const MAX_ROW_LENGTH = 500;

export function parseLabelValue(pages: PageLines[], layout: Layout): ParsedReport {
  const report: ParsedReport = { lab: layout.lab, items: [], warning: layout.warning };
  const skip = [...COMMON_SKIP, ...layout.skip];
  let exam = '';
  // Dentro de uma tabela de resultados anteriores: nada vira resultado até o próximo exame.
  let inHistory = false;
  let afterResultHeader = false;
  // O título atual já recebeu um "Resultado:". Um segundo, sem título novo no meio, quer
  // dizer que o título do exame seguinte não foi reconhecido: o valor não pode herdar este.
  let examHasResult = false;

  for (const page of pages) {
    const lines = page.lines.map((l) => halfWidth(l).trim()).filter(Boolean);
    if (layout.skipPage && lines.some((l) => layout.skipPage!.test(l))) continue;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (layout.endsExam?.test(line)) {
        exam = '';
        inHistory = false;
        examHasResult = false;
      }
      if (layout.historyHeader?.test(line)) {
        inHistory = true;
        continue;
      }
      // Belém imprime o histórico antes do "Material:"/"Método:" do resultado atual.
      if (inHistory && layout.historyEnd?.test(line)) inHistory = false;
      if (skip.some((re) => re.test(line))) continue;
      const inline = layout.inlineTitle?.exec(line);
      if (inline) {
        exam = inline[1].trim();
        inHistory = false;
        examHasResult = false;
        afterResultHeader = true; // o valor pode vir sozinho na linha de baixo
        continue;
      }

      // Linha só com o valor, logo abaixo do cabeçalho "RESULTADO ..." (Fleury):
      // "0,93 mg/dL Masc: mais de 12 anos: 0,70 a 1,30 mg/dL".
      const bare = !inHistory && afterResultHeader && exam ? parseBareValue(line) : null;
      afterResultHeader = RESULT_HEADER.test(line);
      if (afterResultHeader) continue;

      const row = bare ?? (inHistory ? null : parseRow(line, layout));
      if (row && row.label === 'RESULTADO') {
        if (examHasResult) exam = '';
        examHasResult = true;
      }
      if (row) {
        // Resto do nome na linha de baixo: só quando o layout imprime assim (DASA) ou o nome
        // termina pela metade ("Contagem de"). Uma linha qualquer (o título do próximo exame)
        // nunca pode virar parte do nome.
        const cont = lines[i + 1] ?? '';
        const cutShort = /\s(de|da|do|das|dos|e)$/i.test(row.label);
        if ((layout.nameContinues || cutShort) && CONTINUATION.test(cont) && !skip.some((re) => re.test(cont))) {
          row.continuation = cont;
        }
        const prev = lines[i - 1] ?? '';
        if (row.label !== 'RESULTADO' && CONTINUATION.test(prev) && !skip.some((re) => re.test(prev))) row.prefix = prev;
        // Unidade impressa na linha de baixo ("Unidade: mg/dL Referência: ...").
        const below = UNIT_BELOW.exec(lines[i + 1] ?? '');
        const spec = below && UNITS.get(normUnit([below[1]]));
        if (spec && !row.values[0].unit && !row.values[0].qualitative) {
          row.values[0].unit = spec.unit;
          if (spec.factor) row.values[0].value = scale(row.values[0].value, spec.factor);
        }
        report.items.push({ ...row, exam: exam || row.label, page: page.page, source: line });
      } else if (layout.isTitle(line, lines[i + 1] ?? '')) {
        exam = line;
        inHistory = false;
        examHasResult = false;
      }
    }
  }
  report.collectedAt = findCollectedAt(pages);
  return report;
}

export function findCollectedAt(pages: PageLines[]): string | undefined {
  const text = pages.map((p) => p.lines.join('\n')).join('\n');
  for (const re of COLLECTED) {
    const m = re.exec(text);
    if (m) return m[1];
  }
  return undefined;
}

// Cabeçalho da coluna de resultado: "RESULTADO VALORES DE REFERÊNCIA", "R E S U LTA D O ...".
export const RESULT_HEADER = /^(?:RESULTADOS?|R\s?E\s?S\s?U\s?L\s?T\s?A\s?D\s?O)(?:\s+(?:VALORES?|INTERVALO|UNIDADE|REFER|I\s?N\s?T)\b.*)?$/i;
// Resto do nome na linha de baixo: só texto, curto, sem ser cabeçalho de material/método.
const CONTINUATION = /^(?![(*]?\s*(material|m[ée]todo|amostra|valor|nota|obs|resultado|refer|legenda|a interpreta))[-(]?\s*[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s\-()/]{1,40}$/i;
const BARE_VALUE = new RegExp(String.raw`^(${NUM})\s*(.*)$`);

type Row = Pick<ExamItem, 'label' | 'values' | 'continuation' | 'prefix'>;

/** Valor sem rótulo: vale como "RESULTADO" do exame atual, desde que traga unidade. */
function parseBareValue(line: string): Row | null {
  const m = BARE_VALUE.exec(line);
  if (!m) return null;
  const values = readMeasurements([m[1], ...m[2].split(/\s+/).filter(Boolean)]);
  return values[0]?.unit ? { label: 'RESULTADO', values: values.slice(0, 1) } : null;
}

function parseRow(raw: string, layout: Layout): Row | null {
  if (raw.length > MAX_ROW_LENGTH) return null;
  const line = raw.replace(ROW_PREFIX, '');
  const r = resultText(raw);
  if (r) return r;
  const m = ROW.exec(line);
  if (m) {
    const [, rawLabel, colon, first, rest] = m;
    let label = cleanLabel(rawLabel);
    const values = readMeasurements([first, ...rest.split(/\s+/).filter(Boolean)]);
    // Resultado impresso com comparador: "Antiperoxidase Inferior a 10,4 U/mL" é "<10,4", não 10,4.
    const cmp = COMPARATOR_SUFFIX.exec(label);
    if (cmp && values[0] && !/^[<>]/.test(values[0].value)) {
      label = label.slice(0, cmp.index).trim();
      values[0] = { ...values[0], value: (/inferior|menor|abaixo/i.test(cmp[1]) ? '<' : '>') + values[0].value };
    }
    // Pontilhado ("INR ........ 1,05") separa rótulo e valor tanto quanto os dois-pontos.
    const separated = !!colon || /\.{3,}\s*$/.test(rawLabel);
    if (layout.accepts({ label, colon: separated, values })) return { label, values };
  }
  const q = QUAL_ROW.exec(line);
  // "Amarelo Citrino" é um resultado solto (a cor), não "rótulo Amarelo, resultado Citrino".
  if (q && !QUAL_START.test(q[1])) {
    const label = cleanLabel(q[1]);
    const values: Measurement[] = [{ value: capitalize(q[2].replace(/\s+/g, ' ')), qualitative: true }];
    if (layout.accepts({ label, colon: true, values })) return { label, values };
  }
  return null;
}

const COMPARATOR_SUFFIX = /\s(inferior\s+a|menor\s+(?:que|do\s+que)|abaixo\s+de|superior\s+a|maior\s+(?:que|do\s+que)|acima\s+de)$/i;

// "Resultado: Menor que 2.00 UI/L", "Resultado: AMOSTRA NÃO REAGENTE PARA HIV".
const RESULT_TEXT = /^RESULTADOS?\s*\.*\s*:\s*(.{2,80})$/i;
const COMPARATOR = new RegExp(String.raw`^(menor|inferior|maior|superior)\s+(?:que|a)\s+(${NUM})\s*(.*)$`, 'i');
const QUAL_IN_TEXT: [RegExp, string][] = [
  [/\bn[ãa]o\s+reagentes?\b/i, 'Não reagente'],
  [/\breagentes?\b/i, 'Reagente'],
  [/\bn[ãa]o\s+detect[áa]vel\b|\bindetect[áa]vel\b/i, 'Indetectável'],
  [/\bdetect[áa]vel\b/i, 'Detectável'],
  [/\bnegativ[oa]\b/i, 'Negativo'],
  [/\bpositiv[oa]\b/i, 'Positivo'],
];

/** "RESULTADO:" seguido de comparador ou de texto com resultado qualitativo. */
function resultText(line: string): Row | null {
  const m = RESULT_TEXT.exec(line);
  if (!m) return null;
  const text = m[1].trim();
  const c = COMPARATOR.exec(text);
  if (c) {
    const sign = /menor|inferior/i.test(c[1]) ? '<' : '>';
    const [value] = readMeasurements([c[2], ...c[3].split(/\s+/).filter(Boolean)]);
    return { label: 'RESULTADO', values: [{ ...value, value: sign + value.value }] };
  }
  const q = QUAL_IN_TEXT.find(([re]) => re.test(text));
  return q ? { label: 'RESULTADO', values: [{ value: q[1], qualitative: true }] } : null;
}

/**
 * Caracteres de largura dupla ("0,９", "ｍｇ") viram os comuns. Não usa NFKC, que também
 * mudaria "10³" para "103" e "1ª hora" para "1a hora" e quebraria as unidades.
 */
const halfWidth = (s: string) => s.replace(/[\uFF01-\uFF5E]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));

const cleanLabel = (raw: string) => raw.replace(/[.\s]+$/g, '').replace(/\s+/g, ' ').trim();
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

/**
 * Lê pares "número [unidade]" do início: "56 2.049 40-70" → [56], [2.049];
 * "85 x 10³/mm3 130 a 450" → [85.000 /mm3], [130]. Para no primeiro token que não
 * é número nem unidade conhecida.
 */
function readMeasurements(raw: string[]): Measurement[] {
  const tokens = raw.flatMap((t) => {
    const g = GLUED.exec(t);
    return g ? [g[1], g[2]] : [t];
  });
  const out: Measurement[] = [];
  let i = 0;
  while (i < tokens.length && NUM_RE.test(tokens[i])) {
    const m: Measurement = { value: tokens[i++].replace(/\s+/g, '') };
    // Marcador de alterado entre o valor e a unidade ("0,80 H mg/dL", "10,9 ↓ g/dL") ou
    // entre o valor atual e o anterior ("0,80 H 11,93"); "A"/"B" só antes de unidade,
    // porque "13,0 A 17,5" é uma faixa de referência.
    const next = tokens[i + 1] ?? '';
    if (
      i < tokens.length &&
      FLAG.test(tokens[i]) &&
      (readUnit(tokens, i + 1) || (NUM_RE.test(next) && !/^\(?[AB]{1,2}\)?$/.test(tokens[i])))
    ) {
      m.flag = tokens[i].replace(/[()]/g, '');
      i++;
    }
    const unit = readUnit(tokens, i);
    // "54,9 % - 3184 /mm³" (IPC): hífen entre o percentual e o absoluto.
    if (unit && tokens[i] === '%' && tokens[i + 1] === '-' && NUM_RE.test(tokens[i + 2] ?? '')) {
      tokens.splice(i + 1, 1);
    }
    if (unit) {
      const spec = UNITS.get(normUnit(tokens.slice(i, i + unit)))!;
      m.unit = spec.unit;
      if (spec.factor) m.value = scale(m.value, spec.factor);
      i += unit;
    }
    out.push(m);
  }
  return out;
}

/** Quantos tokens a partir de `start` formam uma unidade conhecida (o maior casamento), ou 0. */
function readUnit(tokens: string[], start: number): number {
  for (let n = 3; n >= 1; n--) {
    if (start + n <= tokens.length && UNITS.has(normUnit(tokens.slice(start, start + n)))) return n;
  }
  return 0;
}

/** "85" ×1000 → "85.000"; mantém "<"/">" na frente ("<10" → "<10.000"). */
function scale(value: string, factor: number): string {
  const m = /^([<>]?)(-?[\d.,]+)$/.exec(value);
  if (!m) return value;
  const n = Number(m[2].replace(/\./g, '').replace(',', '.'));
  if (!Number.isFinite(n)) return value;
  return m[1] + (n * factor).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}
