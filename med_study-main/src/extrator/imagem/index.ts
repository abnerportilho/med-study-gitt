import type { PageLines } from '../pdf/extract';
import { findCollectedAt } from '../parser/labelValue';
import { shortDate } from '../format/line';

/**
 * Laudos de imagem e métodos gráficos (TC, RX, USG, mamografia, densitometria, RM, eco).
 *
 * Diferente dos exames de sangue, o que vai para o prontuário é: qual exame, a data, a
 * conclusão copiada palavra por palavra e os escores (BI-RADS, TI-RADS, FEVE...). Nada é
 * resumido nem reescrito: sem IA, sem risco de inventar um achado.
 */

export interface ImagingReport {
  id: string;
  /** Nome curto do exame ("TC do tórax", "USG de abdome total"). */
  exam: string;
  /** Título como impresso. */
  title: string;
  date?: string;
  /** Conclusão / impressão diagnóstica / opinião, como impressa. */
  conclusion?: string;
  /** A conclusão não existia e foi usada a descrição (laudos curtos de RX). */
  conclusionFromFindings?: boolean;
  /** Escores e medidas-chave encontrados no laudo ("BI-RADS 4A", "FEVE 55,9%"). */
  scores: string[];
  /** Linhas de onde saiu a conclusão, para conferência na tela. */
  source: string[];
  page: number;
  selected: boolean;
}

export interface ImagingOptions {
  date: boolean;
}

// --- títulos de exame ---------------------------------------------------------

// Modalidade no começo do título, com a sigla que vai para o prontuário.
const MODALITIES: [RegExp, string][] = [
  [/^angio-?tomografia(\s+computadorizada)?/i, 'AngioTC'],
  [/^tomografia\s+computadorizada\s+de\s+alta\s+resolu[çc][ãa]o/i, 'TCAR'],
  [/^tomografia(\s+computadorizada|\s+computadorizada\s+multislice)?/i, 'TC'],
  [/^angio-?resson[âa]ncia(\s+magn[ée]tica)?/i, 'AngioRM'],
  [/^resson[âa]ncia(\s+magn[ée]tica|\s+nuclear\s+magn[ée]tica)?/i, 'RM'],
  [/^(ultrassonografia|ultra-?sonografia|ultrassom|ecografia)(\s+com\s+doppler|\s+doppler)?/i, 'USG'],
  [/^(eco)?doppler(\s+colorido)?/i, 'Doppler'],
  [/^(laudo\s+de\s+)?ecocardiogra(ma|fia)(\s+transtor[áa]cico|\s+bidimensional)?/i, 'Ecocardiograma'],
  [/^(radiografia|raio[s]?[- ]?x|rx)\b/i, 'RX'],
  [/^mamografia(\s+digital)?(\s+bilateral)?/i, 'Mamografia'],
  [/^densitometria(\s+[óo]ssea)?/i, 'Densitometria óssea'],
  [/^cintilografia/i, 'Cintilografia'],
  [/^(laudo\s+de\s+)?polissonografia(\s+basal|\s+completa|\s+de\s+noite\s+inteira)?/i, 'Polissonografia'],
  [/^poligrafia(\s+respirat[óo]ria)?/i, 'Poligrafia respiratória'],
  [/^pet[- ]?ct/i, 'PET-CT'],
  [/^(tc|rm|usg|us)\b/i, ''], // já abreviado: mantém como está
];

// "TOMOGRAFIA COMPUTADORIZADA DO TÓRAX S/C" e "RESSONANCIA MAGNETICA, JOELHO, DIREITO".
const TITLE_RE =
  /^(?:laudo\s+de\s+)?(angio-?tomografia|tomografia|angio-?resson[âa]ncia|resson[âa]ncia|ultrassonografia|ultra-?sonografia|ultrassom|ecografia|(eco)?doppler|ecocardiogra(ma|fia)|radiografia|raios?[- ]?x|rx|mamografia|densitometria|cintilografia|polissonografia|poligrafia|pet[- ]?ct|tc|rm|usg)\b/i;

/** Linha que abre um laudo de imagem: começa pela modalidade e não é uma frase do texto. */
function isExamTitle(line: string): boolean {
  if (!TITLE_RE.test(line) || line.length > 110) return false;
  if (/\.\s*$/.test(line)) return false; // frase do texto ("Tomografia de tórax sem alterações.")
  if (/:\s*$/.test(line)) return false; // cabeçalho de seção ("Doppler obstétrico:")
  // "Tomografia de 10/03/2025 para comparação" é frase de exame anterior, não título.
  if (/\d{2}\/\d{2}\/\d{2,4}/.test(line.slice(0, 60))) return false;
  const head = line.split(/\s(?:t[ée]cnica|m[ée]todo|an[áa]lise|descri[çc][ãa]o|relat[óo]rio|achados)\s*:/i)[0];
  // Título é curto e "grita" (maiúsculas) ou é curto e seguido de seção.
  const upper = (head.match(/[A-ZÀ-Ý]/g) ?? []).length;
  const lower = (head.match(/[a-zà-ÿ]/g) ?? []).length;
  return upper >= lower || head.split(/\s+/).length <= 8;
}

/** "TOMOGRAFIA COMPUTADORIZADA DO TÓRAX S/C" → "TC do tórax s/c". */
export function shortExamName(title: string): string {
  let t = title
    .split(/\s(?:t[ée]cnica|m[ée]todo|an[áa]lise|descri[çc][ãa]o|relat[óo]rio|achados|indica[çc][ãa]o)\s*:/i)[0]
    .replace(/^laudo\s+de\s+/i, '')
    .replace(/\s*[-–—]\s*$/, '')
    .replace(/,\s*/g, ' ')
    .trim();
  for (const [re, abbr] of MODALITIES) {
    const m = re.exec(t);
    if (!m) continue;
    const rest = t.slice(m[0].length).replace(/\([^)]*\)/g, ' ').trim();
    const head = abbr || m[0].toUpperCase();
    const doppler = /doppler/i.test(m[0]) && abbr === 'USG' ? ' com Doppler' : '';
    t = `${head}${rest ? ' ' + lowerKeepAcronyms(rest) : ''}${doppler}`;
    break;
  }
  return t.replace(/\s+/g, ' ').slice(0, 60).trim();
}

const KEEP_UPPER = /^(s\/c|c\/c|tc|rm|usg|rx|pa|ap|ct|pet|atm|lcr|dpoc|tep|avc|bi-rads|ti-rads|ii|iii|iv|l\d-l\d|t\d|c\d)$/i;
function lowerKeepAcronyms(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (KEEP_UPPER.test(w) && w.length <= 3 && /^[A-Z]/.test(w) ? w.toUpperCase() : w.toLowerCase()))
    .join(' ');
}

// --- seções -------------------------------------------------------------------

// Cabeçalho de conclusão, sozinho na linha ou seguido de ":" (também no meio de um laudo de uma linha só).
const CONCLUSION_HEAD =
  /(?:^|\n|[.!]\s+)\s*[◆◇•●▪■►*\-–]*\s*(impress[ãa]o\s+diagn[óo]stica|impress[ãa]o|conclus[ãa]o\s+diagn[óo]stica|conclus[õo]es|conclus[ãa]o|opini[ãa]o|diagn[óo]stico|hip[óo]tese\s+diagn[óo]stica|parecer|I\.?\s?D\.?(?=\s*:\s*[A-Za-zÀ-ÿ]))\s*(?::\s*|\n)/i;

// O que termina a conclusão: outra seção, assinatura, rodapé ou outro exame.
const CONCLUSION_END = new RegExp(
  [
    String.raw`\n\s*(conduta|recomenda[çc][ãa]o|recomenda[çc][õo]es|sugest[ãa]o|nota|notas|obs\.?|observa[çc][ãa]o|observa[çc][õo]es|coment[áa]rio|refer[êe]ncias?|bibliografia|t[ée]cnica|m[ée]todo|an[áa]lise|descri[çc][ãa]o|achados|relat[óo]rio|exame\s+anterior)\s*:`,
    String.raw`\n\s*(dra?\.?\s+[A-ZÀ-Ý]|dr\(a\)|m[ée]dic[oa]\s+(radiologista|respons[áa]vel|executante)|crm\b|assinad|assinatura|laudo\s+(liberado|assinado|conferido|revisado)|laudado\s+por|revisado\s+por|liberado\s+em|atenciosamente|exame\s+(realizado|revisado|liberado)\s+por|respons[áa]vel\s+t[ée]cnic|este\s+laudo|a\s+interpreta[çc][ãa]o|_{5,}|-{8,})`,
    // assinatura na mesma linha da última frase ("... meniscocapsular. Laudado por: CRM ...")
    String.raw`\s(laudado|revisado|assinado)\s+por\s*:|\s_{5,}`,
  ].join('|'),
  'i',
);

const RECOMMENDATION_HEAD = /(?:^|\n)\s*(conduta|recomenda[çc][ãa]o|recomenda[çc][õo]es|sugest[ãa]o)\s*:\s*/i;

const FINDINGS_HEAD = /(?:^|\n|[.!]\s+)\s*(an[áa]lise|descri[çc][ãa]o|relat[óo]rio|achados|laudo)\s*(?::\s*|\n)/i;

// --- escores ------------------------------------------------------------------

const SCORE_PATTERNS: { re: RegExp; label: (m: RegExpExecArray) => string }[] = [
  { re: /\bBI-?RADS\s*[®™:]?\s*(?:categoria\s*)?([0-6][ABC]?)\b/gi, label: (m) => `BI-RADS ${m[1].toUpperCase()}` },
  { re: /\b(?:ACR\s+)?TI-?RADS\s*[:]?\s*(?:TR\s*)?([1-5])\b/gi, label: (m) => `TI-RADS ${m[1]}` },
  { re: /\bTR\s*([1-5])\b(?=[^\n]{0,40}TI-?RADS)/gi, label: (m) => `TI-RADS ${m[1]}` },
  { re: /\bO-?RADS\s*(?:US|MRI)?\s*[:]?\s*([0-5])\b/gi, label: (m) => `O-RADS ${m[1]}` },
  { re: /\bLung-?RADS\s*(?:v?\d{4})?\s*[:]?\s*(?:categoria\s*)?([0-4][ABSX]?)\b/gi, label: (m) => `Lung-RADS ${m[1].toUpperCase()}` },
  { re: /\bLI-?RADS\s*[:]?\s*(?:LR-?)?([1-5M])\b/gi, label: (m) => `LI-RADS ${m[1].toUpperCase()}` },
  { re: /\bPI-?RADS\s*(?:v?\d(?:\.\d)?)?\s*[:]?\s*([1-5])\b/gi, label: (m) => `PI-RADS ${m[1]}` },
  { re: /\bBosniak\s*[:]?\s*(IIF|IV|III|II|I|[1-4]F?)\b/gi, label: (m) => `Bosniak ${m[1].toUpperCase()}` },
  {
    re: /fra[çc][ãa]o\s+de\s+eje[çc][ãa]o(?:\s+do\s+ve)?(?:\s*\((?:teichholz|simpson)[^)]*\))?\s*(?:\((?:teichholz|simpson)\))?[\s:=.]*(?:de\s+)?(\d{1,2}(?:[.,]\d)?)\s*%/gi,
    label: (m) => `FEVE ${m[1].replace('.', ',')}%`,
  },
  { re: /\bFEVE\b[^\n\d]{0,20}(\d{1,2}(?:[.,]\d)?)\s*%/gi, label: (m) => `FEVE ${m[1].replace('.', ',')}%` },
  { re: /\bPSAP\b[^\n\d]{0,25}(\d{2,3})\s*mm\s*hg/gi, label: (m) => `PSAP ${m[1]} mmHg` },
  { re: /\bIAH\b\s*[=:]?\s*(?:de\s+)?(\d{1,3}(?:[.,]\d)?)/gi, label: (m) => `IAH ${m[1].replace('.', ',')}/h` },
];

// Densitometria: "Coluna lombar (L1-L4) 0,897 -2,6 -1,9" ou "Colo do fêmur ... T-score: -2,1".
const DXA_REGION = /(coluna(?:\s+lombar)?(?:\s*\(?L\d\s*-\s*L\d\)?)?|L1\s*-\s*L4|colo\s+(?:do\s+)?f[êe]mur|f[êe]mur\s+total|f[êe]mur|quadril|r[áa]dio(?:\s+33\s*%)?|antebra[çc]o|corpo\s+inteiro)/i;
const T_SCORE = /T-?\s?score\s*[:=]?\s*(-?\d+[.,]\d+)/i;

function findScores(text: string): string[] {
  const found: string[] = [];
  const add = (s: string) => {
    if (!found.includes(s)) found.push(s);
  };
  for (const { re, label } of SCORE_PATTERNS) {
    re.lastIndex = 0;
    for (let m = re.exec(text); m; m = re.exec(text)) add(label(m));
  }
  for (const line of text.split('\n')) {
    const t = T_SCORE.exec(line);
    const r = DXA_REGION.exec(line);
    if (t && r) add(`${capitalize(r[1].replace(/\s+/g, ' '))} T ${t[1].replace('.', ',')}`);
  }
  return found;
}

const capitalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/\bl(\d)\s*-\s*l(\d)\b/g, 'L$1-L$2')
    .replace(/^./, (c) => c.toUpperCase());

// --- datas --------------------------------------------------------------------

const EXAM_DATE = [
  /data\s+(?:do|de)\s+exame[^\d\n]{0,15}(\d{2}\/\d{2}\/\d{2,4})/i,
  /data\s+(?:da|de)\s+realiza[çc][ãa]o[^\d\n]{0,15}(\d{2}\/\d{2}\/\d{2,4})/i,
  /realizado\s+em[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
  /data\s+(?:do\s+)?atendimento[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i,
  /(?:^|\n)\s*data\s*:\s*(\d{2}\/\d{2}\/\d{2,4})/i,
];

function findExamDate(text: string, pages: PageLines[]): string | undefined {
  for (const re of EXAM_DATE) {
    const m = re.exec(text);
    if (m) return m[1];
  }
  return findCollectedAt(pages) ?? /liberado\s+em[^\d\n]{0,10}(\d{2}\/\d{2}\/\d{2,4})/i.exec(text)?.[1];
}

// --- limpeza do texto ---------------------------------------------------------

/**
 * Linhas que se repetem em várias páginas (cabeçalho da clínica, rodapé "Página 2")
 * saem do texto, para a conclusão que vira a página não ganhar o endereço no meio.
 */
function dropRepeatedLines(pages: PageLines[]): PageLines[] {
  if (pages.length < 2) return pages;
  const key = (l: string) => l.replace(/\d+/g, '#').trim();
  const count = new Map<string, number>();
  for (const p of pages) for (const k of new Set(p.lines.map(key))) count.set(k, (count.get(k) ?? 0) + 1);
  const limit = Math.max(2, Math.ceil(pages.length / 2));
  return pages.map((p) => ({ ...p, lines: p.lines.filter((l) => (count.get(key(l)) ?? 0) < limit) }));
}

/** Junta as linhas da conclusão num parágrafo e conserta texto tokenizado ("normal ." → "normal."). */
function tidy(text: string): string {
  return text
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+([.,;:!?)%])/g, '$1')
    .replace(/([(])\s+/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[-–•·*\s]+/, '')
    .trim();
}

const endWithPeriod = (s: string) => (/[.!?)]$/.test(s) ? s : `${s}.`);

// --- leitura ------------------------------------------------------------------

/** Segmentos do documento, um por exame (um PDF pode trazer TC de tórax e de abdome). */
/** Mesmo exame escrito de dois jeitos ("RM JOELHO, DIREITO" e "RM do joelho direito"). */
function sameExam(a: string, b: string): boolean {
  const words = (s: string) =>
    shortExamName(s)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .split(/[^a-z0-9/]+/)
      .filter((w) => w && !['de', 'da', 'do', 'das', 'dos', 'e', 'com', 's/c', 'c/c'].includes(w))
      .sort()
      .join(' ');
  return words(a) === words(b);
}

function splitExams(lines: { text: string; page: number }[]): { title: string; page: number; body: string[] }[] {
  const exams: { title: string; page: number; body: string[] }[] = [];
  for (const { text, page } of lines) {
    if (isExamTitle(text)) {
      const prev = exams[exams.length - 1];
      const prevHasConclusion = prev && CONCLUSION_HEAD.test(prev.body.join('\n'));
      // O mesmo exame repetido (cabeçalho e corpo, ou a página seguinte) é continuação.
      // Dentro do ecocardiograma, "DOPPLER CONVENCIONAL" e "DOPPLER TECIDUAL" são seções.
      const ecoSection = prev && /^Ecocardiograma/.test(shortExamName(prev.title)) && /^(eco)?doppler/i.test(text);
      if (prev && !prevHasConclusion && (sameExam(prev.title, text) || ecoSection)) {
        prev.body.push(text);
        continue;
      }
      exams.push({ title: text, page, body: [text] });
    } else if (exams.length) {
      exams[exams.length - 1].body.push(text);
    }
  }
  return exams;
}

// Laudo inteiro numa linha só ("TOMOGRAFIA ... Técnica : ... Análise : ... Impressão diagnóstica : ..."):
// quebra antes de cada cabeçalho de seção para o resto funcionar como num laudo comum.
const SECTION_INLINE =
  /\s+(?=(?:t[ée]cnica|m[ée]todo|an[áa]lise|descri[çc][ãa]o|relat[óo]rio|achados|indica[çc][ãa]o|impress[ãa]o\s+diagn[óo]stica|conclus[ãa]o|conclus[õo]es|opini[ãa]o|conduta|recomenda[çc][ãa]o|exame\s+anterior)\s*:)/gi;

export function parseImaging(pages: PageLines[]): ImagingReport[] {
  const clean = dropRepeatedLines(pages);
  const lines = clean
    .flatMap((p) =>
      p.lines.flatMap((text) => (text.length > 120 ? text.split(SECTION_INLINE) : [text]).map((t) => ({ text: t.trim(), page: p.page }))),
    )
    .filter((l) => l.text);
  const fullText = pages.map((p) => p.lines.join('\n')).join('\n');
  const date = findExamDate(fullText, pages);

  return splitExams(lines)
    .map((seg, i) => {
      const body = seg.body.join('\n');
      const scores = findScores(body);
      let conclusion: string | undefined;
      let fromFindings = false;
      let source: string[] = [];

      const head = CONCLUSION_HEAD.exec(body);
      if (head) {
        const after = body.slice(head.index + head[0].length);
        const end = CONCLUSION_END.exec('\n' + after);
        const raw = (end ? after.slice(0, Math.max(0, end.index - 1)) : after).split('\n').slice(0, 15).join('\n');
        source = raw.split('\n').filter(Boolean);
        conclusion = tidy(raw) || undefined;
      } else {
        // Sem seção de conclusão (RX normal costuma ser assim): a descrição curta vale como conclusão.
        const f = FINDINGS_HEAD.exec(body);
        const findings = (f ? body.slice(f.index + f[0].length) : body.split('\n').slice(1).join('\n')).trim();
        const end = CONCLUSION_END.exec('\n' + findings);
        const raw = end ? findings.slice(0, Math.max(0, end.index - 1)) : findings;
        if (raw && raw.length <= 450) {
          source = raw.split('\n').filter(Boolean);
          conclusion = tidy(raw);
          fromFindings = true;
        }
      }

      const rec = RECOMMENDATION_HEAD.exec(body);
      if (conclusion && rec && !/condut|recomend/i.test(conclusion)) {
        const after = body.slice(rec.index + rec[0].length);
        const end = CONCLUSION_END.exec('\n' + after);
        const text = tidy((end ? after.slice(0, Math.max(0, end.index - 1)) : after).split('\n').slice(0, 4).join('\n'));
        if (text) conclusion = `${endWithPeriod(conclusion)} Conduta: ${text}`;
      }

      return {
        id: `img-${i}`,
        exam: shortExamName(seg.title),
        title: seg.title.slice(0, 120),
        date,
        conclusion,
        conclusionFromFindings: fromFindings || undefined,
        scores,
        source,
        page: seg.page,
        // Sem conclusão nem escores, fica fora da linha até o médico decidir.
        selected: !!(conclusion || scores.length),
      } satisfies ImagingReport;
    });
}

/** "TC do tórax (10/09/25): Nódulo sólido de 6 mm no LSD. Lung-RADS 2." */
export function buildImagingLine(r: ImagingReport, opts: ImagingOptions = { date: true }): string {
  const head = opts.date && r.date ? `${r.exam} (${shortDate(r.date)})` : r.exam;
  // Comparação sem pontuação nem unidade: "BI-RADS: 1" já cita "BI-RADS 1", "IAH= 7.1" já cita "IAH 7,1/h".
  const norm = (s: string) => s.toUpperCase().replace(/\/H\b|%|MMHG|CATEGORIA/g, '').replace(/[^A-Z0-9]/g, '');
  const conclusion = r.conclusion ? endWithPeriod(r.conclusion) : '';
  // Escores que a conclusão já cita não se repetem.
  const extra = r.scores.filter((s) => !norm(conclusion).includes(norm(s)));
  const parts = [conclusion, extra.join(' | ')].filter(Boolean);
  return parts.length ? `${head}: ${parts.join(' ')}` : head;
}

/** Tem cara de laudo de imagem: um título de modalidade com conclusão ou escores. */
export function looksLikeImaging(pages: PageLines[]): boolean {
  return parseImaging(pages).length > 0;
}
