import type { ExamItem, Measurement } from '../parser/types';

export interface Rule {
  /** Sigla que vai para o prontuário ("Hb", "Cr"). A posição em RULES é a ordem na linha. */
  abbr: string;
  /** Testado contra o nome normalizado (rótulo, ou título do exame em linhas "RESULTADO") e o exame. */
  match: (name: string, exam: string) => boolean;
  /** Qual valor da linha imprimir; padrão: o primeiro. undefined descarta o item. */
  pick?: (values: Measurement[]) => Measurement | undefined;
  /** Linha do leucograma: imprime o absoluto e o % entre parênteses. */
  differential?: boolean;
  /** Acrescentado ao valor quando o laudo não traz unidade ("%" para percentuais). */
  suffix?: string;
  /** Prefixo do grupo, impresso uma vez antes do primeiro item ("GSA", "Urina"). */
  group?: (item: ExamItem) => string;
}

/** Maiúsculas, sem acentos, pontos ou espaços repetidos. */
export function norm(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[.:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Nome do item: o rótulo, ou o título do exame quando o rótulo é só "RESULTADO". */
export function itemName(item: ExamItem): string {
  return /^RESULTADOS?$/i.test(item.label) ? item.exam : item.label;
}

/** Casa o nome, opcionalmente só dentro de exames cujo título casa `examPattern`. */
const name = (pattern: string, examPattern?: string) => {
  const re = new RegExp(pattern, 'i');
  const ex = examPattern ? new RegExp(examPattern, 'i') : undefined;
  return (n: string, exam: string) => re.test(n) && (!ex || ex.test(exam));
};

const any =
  (...matchers: Rule['match'][]): Rule['match'] =>
  (n, exam) =>
    matchers.some((m) => m(n, exam));

// --- escolha do valor --------------------------------------------------------
// As unidades aqui já são canônicas (labelValue.ts converte "x 10³/mm3" em "/mm3").

const PER_VOLUME = /^\/(µl|mm3)$/;
export const perVolume = (values: Measurement[]) => values.find((v) => v.unit && PER_VOLUME.test(v.unit));

/** Leucócitos totais: o valor em /µL, senão o primeiro dos dois que não é o "100" %. */
const leukocytes = (values: Measurement[]) =>
  perVolume(values) ?? values.slice(0, 2).find((v) => !/^100(,0+)?$/.test(v.value)) ?? values[0];

/** Gasometria: GSA (arterial) ou GSV (venosa). */
const gasometria = (item: ExamItem) => (/ARTERIAL/i.test(item.exam) ? 'GSA' : 'GSV');

/**
 * Exames cujos itens não podem ser confundidos com os do sangue: Leucócitos e
 * Hemoglobina da urina, a fração de Albumina da eletroforese. Saem num grupo próprio,
 * com o rótulo impresso.
 */
const CONTEXT_GROUPS: [RegExp, string][] = [
  [/URINA|\bEAS\b|SEDIMENTO|URINALISE|ELEMENTOS ANORMAIS|\bUROANALISE/, 'Urina'],
  [/ELETROFORESE/, 'Eletroforese'],
  [/LIQUOR|LIQUIDO CEFALORRAQUIDIANO|\bLCR\b/, 'Líquor'],
  [/LIQUIDO (PLEURAL|ASCITICO|SINOVIAL|PERITONEAL)/, 'Líquido'],
];

// --- regras ------------------------------------------------------------------

export const RULES: Rule[] = [
  // Hemograma
  { abbr: 'Hm', match: name('^(CONTAGEM (TOTAL )?DE )?(HEMACIAS|ERITROCITOS|GLOBULOS VERMELHOS|G ROJOS)( TOTAIS)?$') },
  { abbr: 'Hb', match: name('^HEMOGLOBINA( \\(HGB\\)| HGB)?$') },
  { abbr: 'Ht', match: name('^HEMATOCRITO( \\(HCT\\)| HCT)?$') },
  { abbr: 'VCM', match: name('^(MEDIA )?(VCM|VGM|V C M|VOLUME CORPUSCULAR MEDIO)$') },
  { abbr: 'HCM', match: name('^(MEDIA )?(HCM|HGM|H C M|HEMOGLOBINA CORPUSCULAR MEDIA)$') },
  { abbr: 'CHCM', match: name('^(MEDIA )?(CHCM|CHGM|C H C M|CONCENTRACAO DE HEMOGLOBINA CORPUSCULAR MEDIA)$') },
  { abbr: 'RDW', match: name('^(MEDIA )?(RDW|R D W)( ?-? ?CV)?$|\\(RDW\\)$') },
  { abbr: 'RDW-SD', match: name('^RDW ?-? ?SD$') },
  { abbr: 'Leuco', pick: leukocytes, match: name('^(CONTAGEM (TOTAL )?DE )?(LEUCOCITOS|GLOBULOS BRANCOS|G BLANCOS)( TOTAIS| - GLOBAL| GLOBAL)?$') },
  { abbr: 'Blastos', differential: true, match: name('^BLASTOS$') },
  { abbr: 'Promielo', differential: true, match: name('^PROMIELOCITOS$') },
  { abbr: 'Mielo', differential: true, match: name('^MIELOCITOS$') },
  { abbr: 'Metamielo', differential: true, match: name('^METAMIELOCITOS$') },
  { abbr: 'Bast', differential: true, match: name('^BASTONETES$|^BASTOES$') },
  { abbr: 'Seg', differential: true, match: name('^(NEUTROFILOS )?SEGMENTADOS$') },
  { abbr: 'Neut', differential: true, match: name('^NEUTROFILOS( ?\\(#\\)| TOTAIS)?$') },
  { abbr: 'Eos', differential: true, match: name('^EOSINOFILOS( ?\\(#\\))?$') },
  { abbr: 'Baso', differential: true, match: name('^BASOFILOS( ?\\(#\\))?$') },
  { abbr: 'Linf atíp', differential: true, match: name('^(LINFOCITOS )?(ATIPICOS|REATIVOS)$') },
  { abbr: 'Linf', differential: true, match: name('^LINFOCITOS( TIPICOS| ?\\(#\\))?$') },
  { abbr: 'Mono', differential: true, match: name('^MONOCITOS( ?\\(#\\))?$') },
  { abbr: 'Plaq', match: name('^(CONTAGEM (TOTAL )?DE |TOTAL DE )?PLAQUETAS$') },
  { abbr: 'VPM', match: name('^(VMP|VPM|MPV)( - VOLUME PLAQUETARIO MEDIO)?$|^VOLUME PLAQUETARIO MEDIO$') },
  { abbr: 'Retic', suffix: '%', match: any(name('^VALOR PERCENTUAL$', 'RETICUL'), name('^RETICULOCITOS$')) },
  { abbr: 'Retic abs', match: name('^VALOR ABSOLUTO$', 'RETICUL') },
  { abbr: 'IRF', suffix: '%', match: name('^IRF', 'RETICUL') },
  { abbr: 'Ret-He', match: name('^RET-?HE', 'RETICUL') },

  // Ferro / vitaminas
  { abbr: 'Ferro', match: name('^FERRO( SERICO)?$') },
  { abbr: 'Ferritina', match: name('^FERRITINA') },
  { abbr: 'CLLF', match: name('CAPACIDADE (DE FIXACAO )?LATENTE|CAPACIDADE.*LATENTE') },
  { abbr: 'CTLF', match: name('CAPACIDADE (DE FIXACAO )?TOTAL|CAPACIDADE.*TOTAL') },
  { abbr: 'IST', suffix: '%', match: name('SATURACAO DE TRANSFERRINA|INDICE DE SATURACAO') },
  { abbr: 'Transferrina', match: name('^TRANSFERRINA') },
  { abbr: 'Homocisteína', match: name('HOMOCISTEINA') },
  { abbr: 'B12', match: name('VITAMINA B ?-?12|COBALAMINA') },
  { abbr: 'Ác. fólico', match: name('ACIDO FOLICO|FOLATO') },

  // Hormônios
  { abbr: 'LH', match: name('^LH\\b|LUTEINIZANTE') },
  { abbr: 'FSH', match: name('^FSH\\b|FOLICULO ?ESTIMULANTE') },
  { abbr: 'Estradiol', match: name('ESTRADIOL') },
  { abbr: 'Testosterona total', match: name('TESTOSTERONA TOTAL') },
  { abbr: 'Testosterona livre', match: name('TESTOSTERONA LIVRE') },
  { abbr: 'SHBG', match: name('SHBG|GLOBULINA LIGADORA') },
  { abbr: 'Cortisol', match: name('^CORTISOL') },
  { abbr: 'DHEA-S', match: name('DHEA-?S|SULFATO DE (DE)?HIDROEPIANDROSTERONA') },
  { abbr: 'Prolactina', match: name('PROLACTINA') },
  { abbr: 'TSH', match: name('^TSH|TIREOESTIMULANTE') },
  { abbr: 'T4L', match: name('^T4 LIVRE|TIROXINA LIVRE') },
  { abbr: 'T4 total', match: name('^T4 TOTAL|^TIROXINA( TOTAL)?$|^T4 \\(TIROXINA\\)$') },
  { abbr: 'T3L', match: name('^T3 LIVRE|TRIIODOTIRONINA LIVRE') },
  { abbr: 'T3', match: name('^T3\\b|TRIIODOTIRONINA') },
  { abbr: 'PTH', match: name('^PTH|PARATORMONIO') },
  { abbr: 'Vit D', match: name('VITAMINA D|25 ?-? ?OH') },
  { abbr: 'PSA livre', match: name('^PSA LIVRE|ANTIGENO PROSTATICO ESPECIFICO LIVRE') },
  { abbr: 'PSA total', match: (n) => !/LIVRE/.test(n) && /^PSA( TOTAL| ULTRA ?-?SENSIVEL)?\b|ANTIGENO PROSTATICO ESPECIFICO/.test(n) },
  { abbr: 'PSA L/T', suffix: '%', match: name('RELACAO.*PSA|PSA.*RELACAO') },

  // Glicose
  { abbr: 'Glicemia', match: name('^GLICOSE|^GLICEMIA( DE JEJUM)?$') },
  { abbr: 'HbA1c', suffix: '%', match: (n) => /HEMOGLOBINA GLICADA|HB ?A1C|GLICOHEMOGLOBINA/.test(n) && !/LABIL/.test(n) },
  { abbr: 'Glicemia média est.', match: name('GLICEMIA (MEDIA )?ESTIMADA|GLICOSE MEDIA ESTIMADA') },
  { abbr: 'Insulina', match: name('^INSULINA') },

  // Lipídios
  { abbr: 'CT', match: name('^COLESTEROL TOTAL') },
  { abbr: 'TG', match: name('^TRIGLIC') },
  { abbr: 'HDL', match: name('^COLESTEROL,?( -)? (FRACAO )?HDL|^HDL') },
  { abbr: 'LDL', match: name('^COLESTEROL,?( -)? (FRACAO )?LDL|^LDL') },
  { abbr: 'não-HDL', match: name('NAO[ -]?HDL') },
  { abbr: 'VLDL', match: name('VLDL') },

  // Urina (cultura; o EAS sai no grupo de contexto "Urina")
  { abbr: 'Urocultura', match: name('^UROCULTURA') },

  // Função renal / eletrólitos
  { abbr: 'Ur', match: name('^UREIA') },
  { abbr: 'Cr', match: name('^CREATININA') },
  { abbr: 'TFG', match: name('FILTRACAO GLOMERULAR|^\\*?E?TFG|^\\*?EGFR') },
  { abbr: 'AU', match: name('ACIDO URICO') },
  { abbr: 'Na', match: name('^SODIO|^NA\\+$') },
  { abbr: 'K', match: name('^POTASSIO|^K\\+$') },
  { abbr: 'Cl', match: name('^CLORO|^CLORETO|^CL-?$') },
  { abbr: 'Mg', match: name('^MAGNESIO') },
  { abbr: 'Cai', match: name('CALCIO IONICO|CALCIO IONIZADO|^CA\\+\\+') },
  { abbr: 'Ca', match: name('^CALCIO( TOTAL| SERICO)?$') },
  { abbr: 'P', match: name('^FOSFORO') },

  // Fígado / enzimas
  { abbr: 'TGO', match: name('TGO|OXALACETICA|\\bAST\\b') },
  { abbr: 'TGP', match: name('TGP|PIRUVICA|\\bALT\\b') },
  { abbr: 'FA', match: name('FOSFATASE ALCALINA') },
  { abbr: 'GGT', match: name('GAMA[ -]?GLUTAMIL|\\bGGT\\b|GAMA GT') },
  { abbr: 'BT', match: name('^BILIRRUBINA TOTAL') },
  { abbr: 'BD', match: name('^BILIRRUBINA DIRETA') },
  { abbr: 'BI', match: name('^BILIRRUBINA INDIRETA') },
  { abbr: 'Alb', match: name('^ALBUMINA') },
  { abbr: 'PT', match: name('^PROTEINAS TOTAIS') },
  { abbr: 'Glob', match: name('^GLOBULINAS?$') },
  { abbr: 'Amilase', match: name('^AMILASE') },
  { abbr: 'Lipase', match: name('^LIPASE') },
  { abbr: 'DHL', match: name('DESIDROGENASE LA[CT]?TICA|LACTATO DESIDROGENASE|\\bDHL\\b|\\bLDH\\b') },
  { abbr: 'CPK', match: name('CREATINO ?FOSFOQUINASE|\\bCPK\\b|\\bCK\\b|CREATINOQUINASE') },

  // Sorologias
  { abbr: 'HBsAg', match: name('HBSAG|ANTIGENO (DE )?SUPERFICIE') },
  { abbr: 'Anti-HBs', match: name('ANTI-?HBS\\b|ANTICORPOS? (DE |ANTI-?)?SUPERFICIE') },
  { abbr: 'Anti-HBc total', match: name('ANTI-?HBC( TOTAL)?$|ANTI-?HBC TOTAL') },
  { abbr: 'Anti-HBc IgM', match: name('ANTI-?HBC IGM') },
  { abbr: 'Anti-HCV', match: name('ANTI-?HCV|HEPATITE C') },
  { abbr: 'Anti-HAV IgG', match: name('ANTI-?HAV IGG|HEPATITE A.*IGG') },
  { abbr: 'Anti-HAV IgM', match: name('ANTI-?HAV IGM|HEPATITE A.*IGM') },
  { abbr: 'Anti-HIV', match: name('\\bHIV\\b') },
  { abbr: 'VDRL', match: name('VDRL') },
  { abbr: 'Toxo IgG', match: name('TOXOPLASM.*IGG') },
  { abbr: 'Toxo IgM', match: name('TOXOPLASM.*IGM') },

  // Imunologia
  { abbr: 'FR', match: name('FATOR REUMATOIDE') },
  { abbr: 'Anti-TPO', match: name('ANTI-?TPO|ANTITIREOPEROXIDASE|ANTI-?PEROXIDASE') },
  { abbr: 'Anti-Tg', match: name('ANTI-?TIREOGLOBULINA') },
  { abbr: 'IgG', match: name('^IMUNOGLOBULINA G\\b|^IGG$') },
  { abbr: 'IgA', match: name('^IMUNOGLOBULINA A\\b|^IGA$') },
  { abbr: 'IgM', match: name('^IMUNOGLOBULINA M\\b|^IGM$') },
  { abbr: 'IgE', match: name('^IMUNOGLOBULINA E\\b|^IGE( TOTAL)?$') },
  { abbr: 'C3', match: name('^COMPLEMENTO C3|^C3$') },
  { abbr: 'C4', match: name('^COMPLEMENTO C4|^C4$') },
  { abbr: 'Apo B', match: name('APOLIPOPROTEINA B') },
  { abbr: 'Apo A1', match: name('APOLIPOPROTEINA A') },

  // Inflamação
  { abbr: 'PCR', match: name('PROTEINA C REATIVA|^PCR') },
  { abbr: 'VHS', match: name('^VHS|HEMOSSEDIMENTACAO') },
  { abbr: 'Procalcitonina', match: name('PROCALCITONINA') },

  // Coagulação
  { abbr: 'TAP', match: any(name('^PROTROMBINA \\(PACIENTE\\)|^TEMPO DE PROTROMBINA|^TAP$|^TP$'), name('^TEMPO DO PACIENTE$', 'PROTROMBINA|TAP|\\bTP\\b')) },
  { abbr: 'AP', suffix: '%', match: name('^ATIVIDADE( DE PROTROMBINA)?$') },
  { abbr: 'INR', match: name('\\bINR\\b|\\bRNI\\b') },
  { abbr: 'TTPA', match: any(name('^PLASMA PACIENTE|^TEMPO DE TROMBOPLASTINA|^TTPA'), name('^TEMPO DO PACIENTE$', 'TROMBOPLASTINA|TTPA')) },
  { abbr: 'R TTPA', match: any(name('^RELACAO PACIENTE/(CONTROLE|NORMAL)'), name('^RELACAO( \\(R\\))?$', 'TROMBOPLASTINA|TTPA')) },
  { abbr: 'Fibrinogênio', match: name('^FIBRINOGENIO') },
  { abbr: 'D-dímero', match: name('DIMERO') },

  // Cardíaco
  { abbr: 'NT-proBNP', match: name('NT-?PROBNP') },
  { abbr: 'BNP', match: name('^BNP') },
  { abbr: 'Troponina', match: name('TROPONINA') },
  { abbr: 'CK-MB', match: name('CK-?MB') },
  { abbr: 'Lactato', match: name('^(ACIDO )?LA[CT]?TICO|^LACTATO$') },

  // Gasometria
  { abbr: 'pH', group: gasometria, match: name('^PH$', 'GASOMETRIA') },
  { abbr: 'pCO2', group: gasometria, match: name('^PCO2$', 'GASOMETRIA') },
  { abbr: 'pO2', group: gasometria, match: name('^PO2$', 'GASOMETRIA') },
  { abbr: 'HCO3', group: gasometria, match: name('^HCO3', 'GASOMETRIA') },
  { abbr: 'BE', group: gasometria, match: name('^B ?E$|^BE$|BASE EXCESS|EXCESSO DE BASE', 'GASOMETRIA') },
  { abbr: 'SatO2', group: gasometria, suffix: '%', match: name('^O2 SATURACAO|^SATURACAO|^SAT O2', 'GASOMETRIA') },
];

/** Linhas que passam como resultado mas são controles, padrões ou índices que ninguém cola. */
const IGNORED = /^PROTROMBINA \(PADRAO\)|^PLASMA CONTROLE|^SENSIBILIDADE INTERNACIONAL|RELACAO PACIENTE\/PADRAO|^TEMPO DO CONTROLE|^NORMAL DO DIA|^ISI\b|^POOL\b/i;

/** Frações do HPLC impressas junto da hemoglobina glicada (Hb A1a, A1b, F, lábil, A0). */
const A1C_FRACTIONS = /^HB ?(A1A|A1B|A1C LABIL|F|A|A0)$/;

export function isIgnored(item: ExamItem): boolean {
  const n = norm(itemName(item));
  if (A1C_FRACTIONS.test(n) && /GLICADA|A1C/.test(norm(item.exam))) return true;
  return IGNORED.test(n);
}

/** Grupo de contexto do item (Urina, Eletroforese...), se o exame for um desses. */
export function contextGroup(item: ExamItem): string | undefined {
  const exam = norm(item.exam);
  return CONTEXT_GROUPS.find(([re]) => re.test(exam))?.[1];
}

/** Índice da primeira regra que casa, ou -1. Itens de urina e afins nunca casam regras do sangue. */
export function findRuleIndex(item: ExamItem): number {
  if (contextGroup(item)) return -1;
  const n = norm(itemName(item));
  const exam = norm(item.exam);
  const find = (name: string) => RULES.findIndex((r) => r.match(name, exam));
  const index = find(n);
  if (index >= 0) return index;
  // Nome quebrado em duas linhas ("Contagem de" / "Plaquetas"): só vale se o nome
  // completo for reconhecido, para uma linha qualquer de baixo não virar parte do nome.
  if (item.continuation) {
    const joined = find(`${n} ${norm(item.continuation.replace(/^[-(\s]+/, ''))}`);
    if (joined >= 0) return joined;
  }
  // Começo do nome na linha de cima (Fleury). A linha de cima não pode ser reconhecida
  // sozinha: se for, é outro exame (um título), não metade deste nome.
  if (item.prefix) {
    const prefix = norm(item.prefix);
    if (find(prefix) < 0) return find(`${prefix} ${n}`);
  }
  return -1;
}

/** O que o formatador precisa de uma regra depois do casamento. */
export type PrintRule = Omit<Rule, 'match'>;

/** Regra para um item que nenhuma regra reconheceu: sai com o próprio rótulo. */
export function fallbackRule(item: ExamItem): PrintRule {
  const raw = itemName(item);
  // Sigla entre parênteses é melhor que o nome longo: "Hepatite B, antígeno de superfície (HBsAg)".
  const acronym = /\(([A-Za-z][\w\-/]{1,11})\)\s*$/.exec(raw)?.[1];
  const group = contextGroup(item);
  return {
    abbr: acronym ?? titleCase(raw.replace(/\s*\(.*?\)\s*/g, ' ').replace(/^[-–•·*\s]+|[.:]+$/g, '').trim()),
    group: group ? () => group : undefined,
  };
}

const MINOR_WORDS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'a', 'o', 'em', 'no', 'na', 'por']);
// Siglas que os laudos escrevem em maiúsculas no meio do nome.
const ACRONYMS = new Set(['PSA', 'HIV', 'HCV', 'HBV', 'HAV', 'VDRL', 'TSH', 'CEA', 'AFP', 'HCG', 'ACTH', 'DHEA', 'FAN', 'ANCA', 'IGF', 'HDL', 'LDL', 'VLDL', 'PCR', 'VHS', 'CK', 'CPK', 'DHL', 'LDH', 'TGO', 'TGP', 'GGT', 'AST', 'ALT', 'INR', 'HLA', 'PTH', 'COI']);

/** "IMUNOGLOBULINA G" → "Imunoglobulina G"; siglas curtas (C3, Ig) ficam como estão. */
function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (i > 0 && MINOR_WORDS.has(lower)) return lower;
      if (lower === 'ph') return 'pH';
      if (w.length <= 2 || /\d/.test(w) || ACRONYMS.has(w.toUpperCase().replace(/[^A-Z]/g, ''))) return w.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}
