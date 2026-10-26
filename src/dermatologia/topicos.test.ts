import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { TOPICOS, TOPICO_GROUPS } from './topicos';
import { parseRef, sliceSection } from './secoes';

const chapter = (n: number) =>
  JSON.parse(readFileSync(join(__dirname, 'capitulos', `derm-cap-${String(n).padStart(2, '0')}.json`), 'utf8')).blocks;

describe('tópicos de dermatologia', () => {
  it('têm ids únicos e grupo conhecido', () => {
    const ids = TOPICOS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of TOPICOS) expect(TOPICO_GROUPS).toContain(t.group);
  });

  it('apontam para trechos existentes do manual', () => {
    for (const t of TOPICOS) {
      expect(t.tabs.length, t.id).toBeGreaterThan(0);
      for (const tab of t.tabs) {
        for (const ref of tab.refs) {
          const r = parseRef(ref);
          const slice = sliceSection(chapter(r.chapter), r);
          expect(slice, `${t.id} → ${ref}`).not.toBeNull();
        }
      }
    }
  });

  it('recortam só o subtítulo pedido', () => {
    const s = sliceSection(chapter(7), parseRef('7:c07-s2#Rubéola'))!;
    expect(s.title).toBe('Rubéola');
    expect(s.blocks.some((b: { t: string }) => b.t === 'h3')).toBe(false);
    const intro = sliceSection(chapter(16), parseRef('16:c14-s2#'))!;
    expect(JSON.stringify(intro.blocks)).not.toContain('Herpes orolabial');
  });
});
