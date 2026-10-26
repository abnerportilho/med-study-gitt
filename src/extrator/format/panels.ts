import type { ExamItem } from '../parser/types';
import { itemName, norm } from './rules';

/**
 * Painéis clínicos para agrupar a linha: hemograma junto, glicemia junto, função renal
 * junto... A ordem do array é a ordem de saída. Os nomes não vão para o texto colado.
 */
export interface Panel {
  id: string;
  name: string;
  /** Siglas das regras (RULES) que pertencem ao painel. */
  abbrs: string[];
  /** Itens sem regra: casados pelo nome impresso (normalizado). */
  unknown?: RegExp;
}

export const PANELS: Panel[] = [
  {
    id: 'hemograma',
    name: 'Hemograma',
    abbrs: ['Hm', 'Hb', 'Ht', 'VCM', 'HCM', 'CHCM', 'RDW', 'RDW-SD', 'Leuco', 'Blastos', 'Promielo', 'Mielo', 'Metamielo', 'Bast', 'Seg', 'Neut', 'Eos', 'Baso', 'Linf atíp', 'Linf', 'Mono', 'Plaq', 'VPM', 'Retic', 'Retic abs', 'IRF', 'Ret-He'],
    unknown: /HEMOGRAMA|HEMACIA|ERITROBLAST|PLAQUET|LEUCOCIT|NEUTROFIL|LINFOCIT|PDW|PLAQUETOCRITO|RETICUL/,
  },
  {
    id: 'ferro',
    name: 'Perfil de ferro',
    abbrs: ['Ferro', 'Ferritina', 'CLLF', 'CTLF', 'IST', 'Transferrina'],
    unknown: /FERRO|FERRITINA|TRANSFERRINA/,
  },
  {
    id: 'glicemia',
    name: 'Glicemia e diabetes',
    abbrs: ['Glicemia', 'HbA1c', 'Glicemia média est.', 'Insulina'],
    unknown: /GLICEMIA|GLICOSE|GLICAD|GLICOHEMOGLOBINA|INSULINA|HOMA|PEPTIDEO C|FRUTOSAMINA|CURVA GLIC|TOTG|TOLERANCIA/,
  },
  {
    id: 'lipidios',
    name: 'Perfil lipídico',
    abbrs: ['CT', 'HDL', 'LDL', 'não-HDL', 'VLDL', 'TG', 'Apo B', 'Apo A1'],
    unknown: /COLESTEROL|TRIGLIC|LIPOPROTEINA|\bLP ?\(A\)|APOLIPO/,
  },
  {
    id: 'renal',
    name: 'Função renal e eletrólitos',
    abbrs: ['Ur', 'Cr', 'TFG', 'AU', 'Na', 'K', 'Cl', 'Mg', 'Cai', 'Ca', 'P'],
    unknown: /UREIA|CREATININ|FILTRACAO|CISTATINA|MICROALBUMIN|ALBUMINURIA|RELACAO ALBUMINA|PROTEINURIA|ACIDO URICO|SODIO|POTASSIO|CALCIO|FOSFORO|MAGNESIO|BICARBONATO/,
  },
  {
    id: 'hepatica',
    name: 'Função hepática e pancreática',
    abbrs: ['TGO', 'TGP', 'FA', 'GGT', 'BT', 'BD', 'BI', 'Alb', 'PT', 'Glob', 'Amilase', 'Lipase', 'DHL'],
    unknown: /BILIRRUBIN|TRANSAMINASE|FOSFATASE|AMINOTRANSFERASE|ALBUMINA|PROTEINAS|AMILASE|LIPASE/,
  },
  {
    id: 'tireoide',
    name: 'Tireoide',
    abbrs: ['TSH', 'T4L', 'T4 total', 'T3L', 'T3', 'Anti-TPO', 'Anti-Tg'],
    unknown: /TIREO|TIROX|TRIIODO|\bTRAB\b|CALCITONINA/,
  },
  {
    id: 'hormonios',
    name: 'Hormônios',
    abbrs: ['LH', 'FSH', 'Estradiol', 'Testosterona total', 'Testosterona livre', 'SHBG', 'Cortisol', 'DHEA-S', 'Prolactina', 'PTH'],
    unknown: /TESTOSTERONA|ESTRADIOL|PROGESTERONA|PROLACTINA|CORTISOL|ACTH|DHEA|ANDROST|HORMONIO|SOMATOMEDINA|IGF|\bGH\b|ALDOSTERONA|RENINA|\bAMH\b|ANTI-?MULLERIANO|BETA ?-?HCG|GONADOTROFINA/,
  },
  {
    id: 'vitaminas',
    name: 'Vitaminas',
    abbrs: ['B12', 'Ác. fólico', 'Vit D', 'Homocisteína'],
    unknown: /VITAMINA|ZINCO|SELENIO|COBRE/,
  },
  {
    id: 'inflamacao',
    name: 'Marcadores inflamatórios',
    abbrs: ['PCR', 'VHS', 'Procalcitonina'],
    unknown: /PROTEINA C REATIVA|HEMOSSEDIMENT|FERRITINA ULTRA|INTERLEUCINA/,
  },
  {
    id: 'coagulacao',
    name: 'Coagulação',
    abbrs: ['TAP', 'AP', 'INR', 'TTPA', 'R TTPA', 'Fibrinogênio', 'D-dímero'],
    unknown: /PROTROMBINA|TROMBOPLASTINA|FIBRINOG|DIMERO|COAGUL/,
  },
  {
    id: 'cardiaco',
    name: 'Marcadores cardíacos e musculares',
    abbrs: ['NT-proBNP', 'BNP', 'Troponina', 'CK-MB', 'CPK', 'Lactato'],
    unknown: /TROPONINA|BNP|CK-?MB|MIOGLOBINA|ALDOLASE/,
  },
  {
    id: 'gasometria',
    name: 'Gasometria',
    abbrs: ['pH', 'pCO2', 'pO2', 'HCO3', 'BE', 'SatO2'],
  },
  {
    id: 'tumorais',
    name: 'Marcadores tumorais',
    abbrs: ['PSA livre', 'PSA total', 'PSA L/T'],
    unknown: /\bPSA\b|\bCEA\b|CARCINOEMBRIO|\bCA ?-?(125|15-?3|19-?9|72-?4|27-?29)\b|ALFA ?-?FETOPROTEINA|\bAFP\b|BETA ?-?2 ?MICROGLOBULINA|CROMOGRANINA|TIREOGLOBULINA/,
  },
  {
    id: 'sorologias',
    name: 'Sorologias e imunologia',
    abbrs: ['HBsAg', 'Anti-HBs', 'Anti-HBc total', 'Anti-HBc IgM', 'Anti-HCV', 'Anti-HAV IgG', 'Anti-HAV IgM', 'Anti-HIV', 'VDRL', 'Toxo IgG', 'Toxo IgM', 'FR', 'IgG', 'IgA', 'IgM', 'IgE', 'C3', 'C4'],
    unknown: /\bIG[GMAE]\b|ANTI-?|HEPATITE|SIFILIS|TREPONEMA|RUBEOLA|CITOMEGALO|TOXOPLASMA|HERPES|EPSTEIN|DENGUE|CHAGAS|FAN\b|FATOR ANTINUCLEO|COMPLEMENTO|REAGENTE/,
  },
  {
    id: 'urina',
    name: 'Urina',
    abbrs: ['Urocultura'],
    unknown: /UROCULTURA|URINA|EAS\b/,
  },
  { id: 'outros', name: 'Outros', abbrs: [] },
];

const BY_ABBR = new Map(PANELS.flatMap((p, i) => p.abbrs.map((a) => [a, i] as const)));
const OTHERS = PANELS.length - 1;
const URINE = PANELS.findIndex((p) => p.id === 'urina');
const GAS = PANELS.findIndex((p) => p.id === 'gasometria');

/** Índice do painel do item na ordem de PANELS. */
export function panelIndex(abbr: string, known: boolean, group: string | undefined, item: ExamItem): number {
  if (group === 'Urina') return URINE;
  if (group === 'GSA' || group === 'GSV') return GAS;
  if (group) return OTHERS; // eletroforese, líquor, líquidos cavitários
  if (known) {
    const i = BY_ABBR.get(abbr);
    if (i !== undefined) return i;
  }
  const n = norm(`${itemName(item)} ${item.exam}`);
  const i = PANELS.findIndex((p) => p.unknown?.test(n));
  return i >= 0 ? i : OTHERS;
}
