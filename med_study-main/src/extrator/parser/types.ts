/** Um número como foi impresso, com a unidade que veio depois ("11,3" + "g/dl"). */
export interface Measurement {
  value: string;
  unit?: string;
  /** Resultado escrito por extenso ("Negativo", "Não reagente"). */
  qualitative?: boolean;
  /** Marcador de fora da referência impresso pelo laboratório ("H", "L", "↑"). */
  flag?: string;
}

export interface ExamItem {
  /** Título do exame a que a linha pertence ("HEMOGRAMA COMPLETO"); o próprio rótulo quando não há título. */
  exam: string;
  /** Rótulo como impresso ("HEMOGLOBINA", "RESULTADO", "Contagem de Plaquetas"). */
  label: string;
  /** Valores do início da linha. O leucograma traz % e absoluto; limites de referência podem vir depois. */
  values: Measurement[];
  page: number;
  /** Linha original, para conferência na tela. */
  source: string;
  /** Linha seguinte só com texto, que pode ser o resto do nome ("Contagem de" / "Plaquetas"). */
  continuation?: string;
  /** Linha anterior só com texto, que pode ser o começo do nome ("CONCENTRAÇÃO DE HEMOGLOBINA" / "CORPUSCULAR MÉDIA: 32,4"). */
  prefix?: string;
}

export interface ParsedReport {
  lab: string;
  /** Data da coleta como impressa, dd/mm/aaaa ou dd/mm/aa. */
  collectedAt?: string;
  items: ExamItem[];
  /** Preenchido quando o layout é um palpite e não um laboratório reconhecido. */
  warning?: string;
}
