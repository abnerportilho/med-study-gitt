import type { PageLines } from './pdf/extract';
import { parseReport, type ParsedReport } from './parser';
import { toEntries, type LineEntry } from './format/line';
import { parseImaging, type ImagingReport } from './imagem';

export type { PageLines } from './pdf/extract';
export type { ParsedReport, ExamItem } from './parser';
export { buildLine, formatValue, shortDate, DEFAULT_OPTIONS, type LineEntry, type LineOptions } from './format/line';
export { buildImagingLine, type ImagingReport } from './imagem';

export interface ExtractedReport {
  report: ParsedReport;
  entries: LineEntry[];
}

/** Linhas do PDF → laudo interpretado e itens prontos para a linha. */
export function extractReport(pages: PageLines[]): ExtractedReport {
  const report = parseReport(pages);
  return { report, entries: toEntries(report) };
}

export type DocumentKind = 'laboratorio' | 'imagem' | 'misto';

export interface ExtractedDocument extends ExtractedReport {
  kind: DocumentKind;
  imaging: ImagingReport[];
}

/**
 * Laboratório, imagem ou os dois. Num laudo de imagem, o texto também tem números com
 * unidade ("Átrio esquerdo 42 mm", "volume 16,1 cm³") que o motor de laboratório leria
 * como exames desconhecidos; eles só ficam se houver exames de sangue de verdade no PDF.
 */
export function extractDocument(pages: PageLines[]): ExtractedDocument {
  const lab = extractReport(pages);
  const imaging = parseImaging(pages);
  if (imaging.length === 0) return { ...lab, kind: 'laboratorio', imaging };
  const knownLab = lab.entries.filter((e) => e.selected && e.known && !e.group).length;
  if (knownLab >= 3) return { ...lab, kind: 'misto', imaging };
  return { ...lab, entries: [], kind: 'imagem', imaging };
}
