// Recorta, dos blocos de um capítulo, o trecho que uma referência de tópico aponta
// (formato descrito em ./topicos.ts). Puro, para ser usado no app e nos testes.

export interface SectionRef {
  chapter: number;
  section: string;
  // undefined: seção inteira; '': trecho antes do primeiro h3; texto: trecho do h3 que começa com ele.
  sub?: string;
}

export function parseRef(ref: string): SectionRef {
  const [chapter, rest] = ref.split(':');
  const hash = rest.indexOf('#');
  return hash < 0
    ? { chapter: Number(chapter), section: rest }
    : { chapter: Number(chapter), section: rest.slice(0, hash), sub: rest.slice(hash + 1) };
}

interface AnyBlock {
  t: string;
  id?: string;
  num?: string;
  text?: string;
  kind?: string;
  label?: string;
}

export interface SectionSlice<B> {
  num: string;
  title: string;
  blocks: B[];
}

const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

// O resumo do capítulo fica no fim da última seção; fora do capítulo ele não faz sentido.
const isChapterSummary = (b: AnyBlock) => b.t === 'box' && b.kind === 'resumo' && (b.label ?? '').startsWith('Resumo do capítulo');

export function sliceSection<B extends AnyBlock>(blocks: B[], ref: SectionRef): SectionSlice<B> | null {
  const start = blocks.findIndex((b) => b.t === 'h2' && b.id === ref.section);
  if (start < 0) return null;
  let end = blocks.findIndex((b, i) => i > start && b.t === 'h2');
  if (end < 0) end = blocks.length;
  const head = blocks[start];
  let body = blocks.slice(start + 1, end);
  let title = head.text ?? '';

  if (ref.sub === '') {
    const firstH3 = body.findIndex((b) => b.t === 'h3');
    if (firstH3 >= 0) body = body.slice(0, firstH3);
  } else if (ref.sub !== undefined) {
    const want = norm(ref.sub);
    const from = body.findIndex((b) => b.t === 'h3' && norm(b.text ?? '').startsWith(want));
    if (from < 0) return null;
    let to = body.findIndex((b, i) => i > from && b.t === 'h3');
    if (to < 0) to = body.length;
    title = body[from].text ?? '';
    body = body.slice(from + 1, to);
  }

  body = body.filter((b) => !isChapterSummary(b));
  return body.length ? { num: (head.num ?? '').trim(), title, blocks: body } : null;
}
