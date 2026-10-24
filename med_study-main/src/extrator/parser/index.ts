import type { PageLines } from '../pdf/extract';
import type { ParsedReport } from './types';
import { parseLabelValue } from './labelValue';
import { GENERIC, LAYOUTS } from './layouts';

export type { ExamItem, Measurement, ParsedReport } from './types';

export function parseReport(pages: PageLines[]): ParsedReport {
  // Documento inteiro: a DASA só se identifica no rodapé da última página.
  const text = pages.map((p) => p.lines.join('\n')).join('\n');
  const layout = LAYOUTS.find((l) => l.detect.test(text)) ?? GENERIC;
  return parseLabelValue(pages, layout);
}
