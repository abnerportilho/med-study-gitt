import type { Measurement } from './types';

/** Uma linha que casou "rótulo [:] número(s)" e ainda precisa ser aceita pelo layout. */
export interface RowCandidate {
  label: string;
  /** Rótulo e valor separados por dois-pontos ("RESULTADO: 53"). */
  colon: boolean;
  values: Measurement[];
}

/**
 * Tudo o que é específico de como um laboratório imprime o laudo. O parser em
 * labelValue.ts é mecânico: conhece linhas, resultados e títulos, e pergunta ao
 * layout tudo o que depende do laboratório.
 */
export interface Layout {
  lab: string;
  /** Testado contra o texto do documento inteiro. */
  detect: RegExp;
  /** Mostrado quando o layout é um palpite e não um laboratório reconhecido. */
  warning?: string;
  /** Cabeçalho, rodapé e histórico que nunca viram resultado. */
  skip: RegExp[];
  /** Páginas descartadas inteiras (ex.: tabela comparativa que repete todos os valores). */
  skipPage?: RegExp;
  /** Se a linha é um resultado, e não um limite de referência ou texto corrido. */
  accepts: (row: RowCandidate) => boolean;
  /** Se uma linha que não é resultado abre um novo exame, dada a linha seguinte. */
  isTitle: (line: string, next: string) => boolean;
  /** Linha que fecha o exame atual, para as próximas não serem atribuídas a ele. */
  endsExam?: RegExp;
  /** Cabeçalho de tabela de resultados anteriores: as linhas seguintes não são o resultado atual. */
  historyHeader?: RegExp;
  /** Título do exame na mesma linha de outra informação; o grupo 1 é o título. */
  inlineTitle?: RegExp;
  /** Linha que encerra a tabela de resultados anteriores (o bloco do resultado atual começou). */
  historyEnd?: RegExp;
  /** O nome do exame pode continuar na linha de baixo ("Transaminase" / "oxalacética - TGO"). */
  nameContinues?: boolean;
}

/**
 * Pedaço de frase, não rótulo: parêntese sem abertura ("...). Valores"), duas frases,
 * conta ("valor padrão de albumina = 4,3") ou frase em minúscula ("diabetes mellitus
 * deve inferior a 7%"). Siglas como pH e pCO2 começam em minúscula mas seguem em maiúscula.
 */
function isSentence(label: string): boolean {
  const start = label.replace(/^[*\s\-–•·]+/, '');
  return (
    (/\)/.test(label) && !/\(/.test(label)) ||
    /[a-zà-ÿ]\.\s+[A-Za-zÀ-ÿ]/.test(label) ||
    /=/.test(label) ||
    // Uma palavra em minúscula é nome quebrado ("Linfócitos típicos" / "atípicos....: 0,0 %").
    (/^[a-zà-ÿ]{2}/.test(start) && start.split(/\s+/).length >= 3)
  );
}

export function isUpperDominant(s: string): boolean {
  const upper = (s.match(/[A-ZÀ-Ú]/g) ?? []).length;
  const lower = (s.match(/[a-zà-ÿ]/g) ?? []).length;
  return upper > 0 && upper >= lower;
}

// Sabin imprime o título do exame em maiúsculas, depois "Método:"/"Material:",
// depois "RESULTADO: valor" ou uma tabela em maiúsculas (hemograma), depois a
// referência em linhas separadas, e fecha com "Coleta: ... Liberação: ...".
const SABIN_META = /^(M[eé]todo|Material)\s*:/i;

export const SABIN: Layout = {
  lab: 'Sabin',
  // O bloco do paciente: "Nome :" com "Código da OS" logo abaixo. Ancorado no bloco
  // para o rodapé de um laboratório de apoio não disparar a detecção.
  detect: /^Nome\s*:[^\n]*\n(?:[^\n]*\n){0,3}[^\n]*Código da OS/im,
  skipPage: /LAUDO COMPARATIVO/i,
  endsExam: /^Coleta\s*:/i,
  skip: [
    /^(Nome|DN|RG|CPF|Médico|Convênio|Unidade|Sexo)\s*:/i,
    /^(Responsável Técnico|Endereço da Unidade|Laborat[oó]rio registrado)/i,
    /Código da OS|Qnt de exames|Página\s*:|Atendimento\s*:/i,
    /^(Coleta|Liberação)\s*:/i,
    /LIBERADO ELETRONICAMENTE|ESTE EXAME FOI REALIZADO|CNES do respons|ASSINATURA DIGITAL/i,
    /^\*?COLETA DE MATERIAL/i,
    /^_{10,}$/,
    /^(Atenção|Nota|Fonte|Observação|OBS)\b/i,
    /^Valor(es)? (de )?[Rr]efer/i,
    /^Resultados? não apresentad/i,
    /^Horas de Jejum/i,
    SABIN_META,
    /^(Eritrograma|Leucograma|Série Plaquetária|Serie Plaquetaria)\b/i,
  ],
  // "RÓTULO: valor" pode ter minúsculas (pH, RET-HE); linhas de tabela sem ":" têm de
  // ser só maiúsculas, para uma referência como "Colesterol Total < 190" ser ignorada.
  accepts: ({ label, colon }) => (colon ? isUpperDominant(label) : !/[a-zà-ÿ]/.test(label)),
  isTitle: (line, next) =>
    line.length >= 3 &&
    !line.includes(':') &&
    isUpperDominant(line) &&
    (SABIN_META.test(next) || /^RESULTADO\s*:/.test(next)),
};

// DASA (Exame, Lavoisier, Delboni...) imprime o nome do exame, depois "(Material: ...)"
// ou o cabeçalho "RESULTADO INTERVALO DE REFERÊNCIA", depois linhas autoexplicativas
// com a referência na mesma linha, e fecha cada exame com "Assinado eletronicamente por".
const DASA_AFTER_TITLE = /^\((Material|Método)\s*:|RESULTADO INTERVALO|^Série (Vermelha|Branca)/i;

export const DASA: Layout = {
  lab: 'DASA',
  detect: /\bDASA\b|dasa\.com\.br/i,
  nameContinues: true,
  endsExam: /^Assinado eletronicamente/i,
  skip: [
    /^(Cliente|Data de Nascimento|Médico|Solicitante|Prontuário|Atendimento|Local|Exame Resultado|Gênero)\b/i,
    /CPF:|FAP:|Token:/,
    /^Resultado\s/, // histórico: "Resultado 1,20 mg/dL 1,25 mg/dL ..."
    /^Data\s/,
    /^(Assinado|Responsável|Hash|Pág\.|Fontes|Histórico|Nota|Referência|Observação|Legenda|Confirmado)\b/i,
    /^(Dentro do intervalo|Laborat[oó]rio registrado|Locais? de [Ee]xecução|- DASA|Sob a responsabilidade)/i,
  ],
  // Texto corrido também termina em número ("acima de 18 anos"): exige unidade ou o
  // par %/absoluto, e um rótulo curto demais para ser uma frase.
  accepts: ({ label, values }) =>
    label.length <= 40 && !isSentence(label) && (values.some((v) => v.unit) || values.length >= 2),
  isTitle: (line, next) => line.length >= 3 && line.length <= 60 && !/\d|:/.test(line) && DASA_AFTER_TITLE.test(next),
};

// Rótulos que abrem linhas de valor de referência, não de resultado:
// "Homens 13,0 a 17,0", "De 02 a 12 meses: 0,17", "Desejável: menor que 190".
const REFERENCE_LABEL = new RegExp(
  String.raw`^(?:\d|(?:homem|homens|mulher|mulheres|masculino|feminino|masc|fem|adultos?|adolescentes?|lactentes?|neonatos?|jovens|crian[çc]as?|rec[ée]m[- ]nascidos?|gestantes?|idosos?` +
    String.raw`|maiores|menores|acima|abaixo|at[ée]|de|entre|inferior|superior|menor|maior|desej[áa]vel|[óo]timo` +
    String.raw`|lim[íi]trofe|alto|baixo|muito|normal|elevado|risco|meta|alvo|vr|v\.r|ref|refer[êe]ncia|intervalo|faixa|fase` +
    String.raw`|p[óo]s|pr[ée]|jejum|sem|com|para|ideal|categoria|n[íi]vel|in[íi]cio|pico|folicular|l[úu]tea|ovulat[óo]ria` +
    String.raw`|menopausa|trimestre|primeiro|segundo|terceiro|intermedi[áa]rio|moderado|grave|leve|semanas?|dias?|m[êe]s|meses|anos?|horas?)(?![A-Za-zÀ-ÿ])` +
    String.raw`|(?:deficien|insufici|suficien|intoxica|t[óo]xic))`,
  'i',
);

// Linhas de cabeçalho, rodapé e histórico comuns a quase todos os laboratórios.
const GENERIC_SKIP = [
  /^(paciente|nome|m[ée]dico|dr\(a\)|dra?\b|solicitante|requisitante|conv[êe]nio|cpf|rg|documento|idade|sexo|g[êe]nero|prontu[áa]rio|atendimento|pedido|origem|destino|entrada|entrega|unidade|posto|c[óo]digo|os\b|data|nasc|emiss[ãa]o|impress[ãa]o|libera[çc][ãa]o|coleta|colhido|recebido|cadastro)\b/i,
  /^(material|m[ée]todo|metodologia|equipamento|amostra|aparelho)\b/i,
  /^(assinado|conferido|liberado|validado|respons[áa]vel|resp\.|cr[bfm]|p[áa]gina|p[áa]g\.|laudo|obs|observa|nota|aten[çc][ãa]o|coment|interpreta|fonte|refer[êe]ncia|valor(es)? de refer|valores? referenciais|resultados? anteriores|hist[óo]rico|legenda|telefone|fone|site|www|endere[çc]o|av\.|rua)\b/i,
  /^resultados?\s*(\(s\))?\s+anterior/i,
  /^(c\.?\s?n\.?\s?e\.?\s?s|cnes|lote|validade|kit|reagente\s+lote|n[úu]mero|emitido|requisi[çc][ãa]o|protocolo|ficha)\b/i,
  /^\|/, // bordas de tabelas de referência desenhadas com "|"
  /^\*?\s*(exame\s+realizado|realizado\s+(no|em|pelo)|laborat[óo]rio\s+de\s+apoio)/i,
];

// "Resultados anteriores", "Resultado(s) Anterior(es)", "Histórico de resultados".
const HISTORY = String.raw`resultados?\s*(?:\(s\))?\s+anterior(?:es)?\s*(?:\(es\))?|hist[óo]rico\s+de\s+resultados`;
// Linha logo abaixo de um título de exame.
const EXAM_META = /^(data\/hora|data\s+(da\s+)?coleta|material|m[ée]todos?|metodologia|coleta|amostra|valor(es)?\s+de\s+refer|resultados?\s*:)/i;
// Linhas em maiúsculas que não são exame.
const NOT_TITLE = /^\*?\s*(exame\s+realizado|realizado\s+(no|em|pelo)|laborat[óo]rio\s+de\s+apoio|amostra\s+sint|synthetic|resultados?\s+(valores?|intervalo|unidade)|r\s?e\s?s\s?u\s?l\s?t\s?a\s?d\s?o\s)/i;

export const GENERIC: Layout = {
  lab: 'Desconhecido',
  detect: /$^/, // nunca casa: é o último recurso
  warning: 'Laboratório não reconhecido: confira os itens extraídos com o laudo.',
  skip: GENERIC_SKIP,
  accepts: ({ label, colon, values }) => {
    const words = label.split(/\s+/).length;
    if (label.length > 45 || words > 7) return false; // frase, não rótulo
    if (isSentence(label)) return false;
    if (REFERENCE_LABEL.test(label)) return false;
    if (/\b(data|impress[ãa]o|emiss[ãa]o|libera[çc][ãa]o|p[áa]gina)\b/i.test(label)) return false;
    // Frase cortada ("acima de"), só em minúsculas para "Imunoglobulina A" passar. Com
    // unidade é nome quebrado em duas linhas ("Contagem de 148.000 /µL" / "Plaquetas").
    if (/\s(de|a|at[ée]|e|ou|que|com|para|por)$/.test(label) && !values.some((v) => v.unit)) return false;
    return colon || values.some((v) => v.unit || v.qualitative) || values.length >= 2;
  },
  // \b antes do lookahead: sem ele, "Resultados anteriores: 10/01/2026 - 34,8" casava só
  // "anterior" e o resto da linha ("es: 10/01...") escapava do lookahead.
  historyHeader: new RegExp(String.raw`^(?:${HISTORY})\b(?!\s*:\s*\S)`, 'i'),
  historyEnd: EXAM_META,
  // Título: linha curta, sem ":" nem valores (decimais, datas). Em maiúsculas basta;
  // em minúsculas ("Urina tipo I", "Plaquetas") só quando a linha seguinte é a do
  // material/método/coleta, como fazem Unimed, Unilab e muitos laboratórios regionais.
  // Números grudados em letras são permitidos ("25-HIDROXIVITAMINA D", "T4 LIVRE").
  isTitle: (line, next) => {
    if (line.length < 3 || line.length > 70 || line.includes(':') || /\.$/.test(line)) return false;
    if (!/[A-Za-zÀ-ÿ]{3}/.test(line) || NOT_TITLE.test(line) || line.split(/\s+/).length > 9) return false;
    if (/\d[.,]\d|\d{2}\/\d{2}/.test(line)) return false; // valores e datas
    // Com material/método logo abaixo, o título pode ter número solto ("Vitamina D3, 25 hidroxi").
    if (EXAM_META.test(next)) return true;
    return !/(^|\s)\d+(\s|$)/.test(line) && isUpperDominant(line);
  },
  // "FERRO Material: sangue Método: ..." e "INSULINA MÉTODO: ..." (IPC): o título vem antes.
  // "COLESTEROL TOTAL    Resultado" com o valor na linha de baixo, também.
  inlineTitle:
    /^(?!RESULTADOS?\b)([A-Za-zÀ-ÿ][^:]{2,60}?)\s+(?:(?:Material|Amostra|M[ée]todo|Coleta)\s*:|(?:Resultados?|Valor(?:es)?\s*(?:\(es\))?\s+de\s+refer[êe]ncia)\s*:?\s*$)/i,
  // Separadores e rodapé de assinatura fecham o exame: se o próximo título não for
  // reconhecido, o resultado fica sem nome em vez de cair no exame anterior.
  endsExam: /^(_{5,}|-{5,}|={5,}|data\s+da\s+libera|exame\s+assinado|assinado\s+eletronicamente|conferido\s+e\s+assinado|liberado\s+(eletronicamente|por)|assinatura\s+digital)/i,
};

export const LAYOUTS = [SABIN, DASA];
