import type { PageLines } from './pdf/extract';
import { parseReport, type ParsedReport } from './parser';
import { toEntries, type LineEntry } from './format/line';

export type { PageLines } from './pdf/extract';
export type { ParsedReport, ExamItem } from './parser';
export { buildLine, formatValue, shortDate, DEFAULT_OPTIONS, type LineEntry, type LineOptions } from './format/line';

export interface ExtractedReport {
  report: ParsedReport;
  entries: LineEntry[];
}

/** Linhas do PDF → laudo interpretado e itens prontos para a linha. */
export function extractReport(pages: PageLines[]): ExtractedReport {
  const report = parseReport(pages);
  return { report, entries: toEntries(report) };
}
