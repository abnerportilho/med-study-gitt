import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen, Target, Microscope, Lightbulb, AlertTriangle, ClipboardList, Stethoscope, ArrowRight, ArrowLeft,
  ChevronRight, X, Search, Image as ImageIcon, Presentation, BookMarked,
} from 'lucide-react';
import MANIFEST from './dermatologia/manifest.json';

// ==========================================================================
// Capítulos do Manual de Dermatologia. O conteúdo vem do manual em HTML, convertido por
// tools/dermatologia/convert.py; cada capítulo é um JSON carregado sob demanda.
// ==========================================================================

type Inline = string; // HTML inline já saneado na conversão (strong, em, dfn[title]...)

export type Block =
  | { t: 'h2'; id: string; num: string; text: string }
  | { t: 'h3'; text: string }
  | { t: 'p'; h: Inline }
  | { t: 'ul' | 'ol'; items: Inline[] }
  | { t: 'table'; caption?: Inline; head?: Inline[]; rows: Inline[][]; plain?: boolean }
  | { t: 'kv'; pairs: [Inline, Inline][] }
  | { t: 'flow'; steps: [Inline, Inline][] }
  | { t: 'box'; kind: string; label: string; blocks: Block[] }
  | { t: 'src'; kind: string; k: string; v: string; s: string }
  | { t: 'figs'; figs: { key: string; alt: string; w: number; h: number; cap: Inline }[] };

interface Chapter {
  num: number;
  id: string;
  part: string;
  partName: string;
  kind: 'teorica' | 'pratica';
  short: string;
  title: string;
  lead: Inline;
  goals: Inline[];
  blocks: Block[];
}

export interface ChapterMeta {
  num: number;
  id: string;
  part: string;
  partName: string;
  kind: string;
  short: string;
  title: string;
}

export const CHAPTERS = MANIFEST as ChapterMeta[];

export const LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  'derm-cap-01': () => import('./dermatologia/capitulos/derm-cap-01.json'),
  'derm-cap-02': () => import('./dermatologia/capitulos/derm-cap-02.json'),
  'derm-cap-03': () => import('./dermatologia/capitulos/derm-cap-03.json'),
  'derm-cap-04': () => import('./dermatologia/capitulos/derm-cap-04.json'),
  'derm-cap-05': () => import('./dermatologia/capitulos/derm-cap-05.json'),
  'derm-cap-06': () => import('./dermatologia/capitulos/derm-cap-06.json'),
  'derm-cap-07': () => import('./dermatologia/capitulos/derm-cap-07.json'),
  'derm-cap-08': () => import('./dermatologia/capitulos/derm-cap-08.json'),
  'derm-cap-09': () => import('./dermatologia/capitulos/derm-cap-09.json'),
  'derm-cap-10': () => import('./dermatologia/capitulos/derm-cap-10.json'),
  'derm-cap-11': () => import('./dermatologia/capitulos/derm-cap-11.json'),
  'derm-cap-12': () => import('./dermatologia/capitulos/derm-cap-12.json'),
  'derm-cap-13': () => import('./dermatologia/capitulos/derm-cap-13.json'),
  'derm-cap-14': () => import('./dermatologia/capitulos/derm-cap-14.json'),
  'derm-cap-15': () => import('./dermatologia/capitulos/derm-cap-15.json'),
  'derm-cap-16': () => import('./dermatologia/capitulos/derm-cap-16.json'),
  'derm-cap-17': () => import('./dermatologia/capitulos/derm-cap-17.json'),
  'derm-cap-18': () => import('./dermatologia/capitulos/derm-cap-18.json'),
  'derm-cap-19': () => import('./dermatologia/capitulos/derm-cap-19.json'),
};

// Imagens em public/derm (relativo à página: funciona no domínio e no artefato).
const imgSrc = (key: string) => `derm/${key}.webp`;

const html = (h: Inline) => ({ __html: h });

const BOX_STYLE: Record<string, { cls: string; title: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  fisio: { cls: 'border-indigo-500/40 bg-indigo-500/5', title: 'text-indigo-300', icon: Microscope },
  extra: { cls: 'border-slate-500/40 bg-slate-500/5', title: 'text-slate-300', icon: Lightbulb },
  alerta: { cls: 'border-rose-500/40 bg-rose-500/5', title: 'text-rose-300', icon: AlertTriangle },
  resumo: { cls: 'border-emerald-500/40 bg-emerald-500/5', title: 'text-emerald-300', icon: ClipboardList },
  caso: { cls: 'border-amber-500/40 bg-amber-500/5', title: 'text-amber-300', icon: Stethoscope },
};

const SRC_STYLE: Record<string, { cls: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  teorica: { cls: 'text-violet-300 border-violet-500/30 bg-violet-500/5', icon: Presentation },
  pratica: { cls: 'text-pink-300 border-pink-500/30 bg-pink-500/5', icon: Stethoscope },
  apostila: { cls: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/5', icon: BookMarked },
  extra: { cls: 'text-slate-300 border-slate-500/30 bg-slate-500/5', icon: Lightbulb },
};

// Termos com definição (<dfn title>) ficam sublinhados; o clique mostra a definição (útil no celular).
export const PROSE =
  '[&_dfn]:not-italic [&_dfn]:underline [&_dfn]:decoration-dotted [&_dfn]:decoration-sky-400/70 [&_dfn]:underline-offset-2 [&_dfn]:cursor-help ' +
  '[&_strong]:text-brand-navy [&_strong]:font-bold [&_em]:text-ink';

export function BlockView({ b, onZoom }: { b: Block; onZoom: (key: string, cap: string) => void }) {
  switch (b.t) {
    case 'h3':
      return <h3 className="text-sm font-black text-sky-300 uppercase tracking-wide pt-2 border-l-2 border-sky-500 pl-2">{b.text}</h3>;
    case 'p':
      return <p className={`text-sm text-ink leading-relaxed ${PROSE}`} dangerouslySetInnerHTML={html(b.h)} />;
    case 'ul':
    case 'ol': {
      const Tag = b.t;
      return (
        <Tag className={`text-sm text-ink leading-relaxed space-y-1 pl-5 ${b.t === 'ol' ? 'list-decimal' : 'list-disc'} marker:text-sky-400 ${PROSE}`}>
          {b.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={html(it)} />)}
        </Tag>
      );
    }
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className={`w-full text-xs ${PROSE}`}>
            {b.caption && <caption className="caption-top text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted bg-bg/40" dangerouslySetInnerHTML={html(b.caption)} />}
            {b.head && (
              <thead>
                <tr className="bg-sky-500/10 text-sky-200">
                  {b.head.map((h, i) => <th key={i} className="text-left px-3 py-2 font-bold align-bottom" dangerouslySetInnerHTML={html(h)} />)}
                </tr>
              </thead>
            )}
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-line/60 odd:bg-bg/20">
                  {r.map((c, j) => (
                    <td key={j} className={`px-3 py-2 align-top leading-relaxed ${j === 0 && !b.plain && !b.head ? 'font-bold text-brand-navy w-1/4' : 'text-ink'}`} dangerouslySetInnerHTML={html(c)} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'kv':
      return (
        <div className={`grid grid-cols-1 sm:grid-cols-[minmax(120px,30%)_1fr] gap-x-4 gap-y-2 rounded-xl border border-line bg-bg/30 p-3 text-sm ${PROSE}`}>
          {b.pairs.map(([k, v], i) => (
            <React.Fragment key={i}>
              <div className="font-bold text-sky-300" dangerouslySetInnerHTML={html(k)} />
              <div className="text-ink leading-relaxed" dangerouslySetInnerHTML={html(v)} />
            </React.Fragment>
          ))}
        </div>
      );
    case 'flow':
      return (
        <div className="flex flex-col md:flex-row md:items-stretch gap-2">
          {b.steps.map(([title, body], i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="hidden md:block self-center text-sky-400 shrink-0" size={18} />}
              <div className={`flex-1 rounded-xl border border-sky-500/30 bg-sky-500/5 p-3 text-xs leading-relaxed ${PROSE}`}>
                <div className="font-black text-sky-200 mb-1" dangerouslySetInnerHTML={html(title)} />
                <div className="text-ink" dangerouslySetInnerHTML={html(body)} />
              </div>
            </React.Fragment>
          ))}
        </div>
      );
    case 'box': {
      const st = BOX_STYLE[b.kind] ?? BOX_STYLE.extra;
      const Icon = st.icon;
      return (
        <aside className={`rounded-xl border p-4 space-y-2 ${st.cls}`}>
          <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-wider ${st.title}`}>
            <Icon size={14} /> {b.label}
          </div>
          {b.blocks.map((x, i) => <div key={i}><BlockView b={x} onZoom={onZoom} /></div>)}
        </aside>
      );
    }
    case 'src': {
      const st = SRC_STYLE[b.kind] ?? SRC_STYLE.extra;
      const Icon = st.icon;
      return (
        <div className={`inline-flex flex-wrap items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[10.5px] font-semibold ${st.cls}`}>
          <Icon size={11} /> <span className="uppercase tracking-wider">{b.k}</span>
          {b.v && <span className="text-ink-muted font-normal">· {b.v}</span>}
          {b.s && <span className="text-ink-muted font-normal">· {b.s}</span>}
        </div>
      );
    }
    case 'figs': {
      const cols = b.figs.length >= 3 ? 'md:grid-cols-3' : b.figs.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-2xl';
      return (
        <div className={`grid grid-cols-1 ${cols} gap-3`}>
          {b.figs.map((f) => (
            <figure key={f.key} className="rounded-xl border border-line bg-bg/40 overflow-hidden">
              <button type="button" onClick={() => onZoom(f.key, f.cap)} className="block w-full bg-black/30 cursor-zoom-in" title="Ampliar">
                <img src={imgSrc(f.key)} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" className="w-full h-auto max-h-80 object-contain" />
              </button>
              {f.cap && <figcaption className={`px-3 py-2 text-[11px] text-ink-muted leading-snug ${PROSE}`} dangerouslySetInnerHTML={html(f.cap)} />}
            </figure>
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}

export function ImageZoom({ zoom, onClose }: { zoom: { key: string; cap: string }; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/85 flex flex-col items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 p-2 text-white/80 hover:text-white cursor-pointer" aria-label="Fechar"><X size={22} /></button>
      <img src={imgSrc(zoom.key)} alt="" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
      {zoom.cap && <p className="mt-3 max-w-3xl text-center text-sm text-slate-200" dangerouslySetInnerHTML={html(zoom.cap)} />}
    </div>
  );
}

// Falha ao baixar o arquivo do capítulo (sem internet ou aba aberta antes de uma atualização).
export function LoadError({ what }: { what: string }) {
  return (
    <div className="card p-6 space-y-3">
      <p className="text-sm text-rose-300">Não foi possível carregar {what}. Verifique a internet ou recarregue a página.</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold cursor-pointer">
        Recarregar página
      </button>
    </div>
  );
}

interface Section {
  head?: Extract<Block, { t: 'h2' }>;
  blocks: Block[];
}

function toSections(blocks: Block[]): Section[] {
  const out: Section[] = [{ blocks: [] }];
  for (const b of blocks) {
    if (b.t === 'h2') out.push({ head: b, blocks: [] });
    else out[out.length - 1].blocks.push(b);
  }
  return out.filter((s) => s.head || s.blocks.length);
}

// Mostra a definição do termo clicado (equivale ao "passe o mouse" no celular).
export function useDefinitionPopup() {
  const [def, setDef] = useState<{ term: string; text: string } | null>(null);
  const onClick = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest('dfn');
    if (el && el.getAttribute('title')) setDef({ term: el.textContent || '', text: el.getAttribute('title') || '' });
  };
  const popup = def && (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(92vw,560px)] rounded-2xl border border-sky-500/40 bg-slate-900 shadow-2xl p-4">
      <button onClick={() => setDef(null)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white cursor-pointer" aria-label="Fechar"><X size={16} /></button>
      <div className="text-xs font-black text-sky-300 uppercase tracking-wider mb-1 pr-6">{def.term}</div>
      <p className="text-sm text-slate-200 leading-relaxed">{def.text}</p>
    </div>
  );
  return { onClick, popup };
}

export function DermatologiaCapitulo({ chapterId, onSelectTopic }: { chapterId: string; onSelectTopic: (id: string) => void }) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState<{ key: string; cap: string } | null>(null);
  const { onClick, popup } = useDefinitionPopup();

  useEffect(() => {
    let alive = true;
    setChapter(null);
    setError(false);
    const load = LOADERS[chapterId];
    if (!load) {
      setError(true);
      return;
    }
    load()
      .then((m) => alive && setChapter(m.default as Chapter))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [chapterId]);

  const sections = useMemo(() => (chapter ? toSections(chapter.blocks) : []), [chapter]);
  const idx = CHAPTERS.findIndex((c) => c.id === chapterId);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx >= 0 && idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  if (error) return <LoadError what="este capítulo" />;
  if (!chapter) return <div className="card p-6 text-sm text-ink-muted animate-pulse">Carregando capítulo…</div>;

  const figCount = chapter.blocks.reduce((n, b) => n + (b.t === 'figs' ? b.figs.length : 0), 0);

  return (
    <div className="space-y-5" onClick={onClick}>
      {/* Cabeçalho do capítulo */}
      <div className="card p-5 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-widest">
          <span className="text-sky-400">Capítulo {chapter.num}</span>
          <span className="text-ink-muted">·</span>
          <span className="text-ink-muted">Parte {chapter.part} — {chapter.partName}</span>
          <span className={`px-2 py-0.5 rounded-md border ${chapter.kind === 'pratica' ? 'border-pink-500/40 text-pink-300' : 'border-violet-500/40 text-violet-300'}`}>
            {chapter.kind === 'pratica' ? 'Aula prática' : 'Aula teórica'}
          </span>
          {figCount > 0 && (
            <span className="px-2 py-0.5 rounded-md border border-line text-ink-muted inline-flex items-center gap-1"><ImageIcon size={11} /> {figCount} imagens</span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">{chapter.title}</h2>
        {chapter.lead && <p className={`text-sm md:text-base text-ink leading-relaxed ${PROSE}`} dangerouslySetInnerHTML={html(chapter.lead)} />}
        {chapter.goals.length > 0 && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-emerald-300 mb-2"><Target size={14} /> Ao terminar o capítulo você deve saber</div>
            <ul className={`text-sm text-ink space-y-1 list-disc pl-5 marker:text-emerald-400 ${PROSE}`}>
              {chapter.goals.map((g, i) => <li key={i} dangerouslySetInnerHTML={html(g)} />)}
            </ul>
          </div>
        )}
        {/* Índice das seções */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {sections.filter((s) => s.head).map((s) => (
            <a
              key={s.head!.id}
              href={`#${s.head!.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.head!.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="shrink-0 px-2.5 py-1.5 rounded-lg border border-line bg-bg text-[11px] font-bold text-ink-muted hover:text-brand-navy hover:border-sky-500/40 whitespace-nowrap"
            >
              <span className="text-sky-400 mr-1">{s.head!.num.trim()}</span>{s.head!.text}
            </a>
          ))}
        </div>
      </div>

      {/* Seções */}
      {sections.map((s, i) => (
        <section key={s.head?.id ?? `intro-${i}`} id={s.head?.id} className="card p-5 md:p-6 space-y-3 scroll-mt-4">
          {s.head && (
            <h3 className="text-lg md:text-xl font-black text-brand-navy flex items-baseline gap-2">
              <span className="text-sky-400 font-mono text-base">{s.head.num.trim()}</span>
              {s.head.text}
            </h3>
          )}
          {s.blocks.map((b, j) => <div key={j}><BlockView b={b} onZoom={(key, cap) => setZoom({ key, cap })} /></div>)}
        </section>
      ))}

      {/* Navegação entre capítulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prev ? (
          <button onClick={() => onSelectTopic(prev.id)} className="card p-4 text-left hover:border-sky-500/40 cursor-pointer">
            <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1"><ArrowLeft size={12} /> Capítulo {prev.num}</div>
            <div className="text-sm font-bold text-brand-navy">{prev.short}</div>
          </button>
        ) : <div />}
        {next && (
          <button onClick={() => onSelectTopic(next.id)} className="card p-4 text-right hover:border-sky-500/40 cursor-pointer">
            <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider flex items-center justify-end gap-1">Capítulo {next.num} <ArrowRight size={12} /></div>
            <div className="text-sm font-bold text-brand-navy">{next.short}</div>
          </button>
        )}
      </div>

      {zoom && <ImageZoom zoom={zoom} onClose={() => setZoom(null)} />}
      {popup}
    </div>
  );
}

// ==========================================================================
// Glossário (746 termos definidos no manual)
// ==========================================================================
type Term = [string, Inline, number | null];

export function DermatologiaGlossario({ onSelectTopic }: { onSelectTopic: (id: string) => void }) {
  const [terms, setTerms] = useState<Term[] | null>(null);
  const [q, setQ] = useState('');
  const [letter, setLetter] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    import('./dermatologia/capitulos/glossario.json')
      .then((m) => setTerms(m.default as Term[]))
      .catch(() => setFailed(true));
  }, []);

  const fold = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  // Letra do índice: primeira letra do termo, ignorando aspas, números e símbolos.
  const initial = (t: string) => (fold(t).match(/[a-z]/)?.[0] ?? '#').toUpperCase();
  const letters = useMemo(() => Array.from(new Set((terms ?? []).map(([t]) => initial(t)))).sort(), [terms]);
  const shown = useMemo(() => {
    if (!terms) return [];
    const f = fold(q.trim());
    return terms.filter(([t, d]) => (!letter || initial(t) === letter) && (!f || fold(t).includes(f) || fold(d).includes(f)));
  }, [terms, q, letter]);

  if (failed) return <LoadError what="o glossário" />;
  if (!terms) return <div className="card p-6 text-sm text-ink-muted animate-pulse">Carregando glossário…</div>;

  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-400"><BookOpen size={14} /> Glossário · {terms.length} termos</div>
        <div className="flex items-center gap-2 bg-bg px-3 py-2 rounded-xl border border-line">
          <Search size={14} className="text-ink-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar termo ou definição…" className="bg-transparent text-sm text-ink w-full focus:outline-none" />
        </div>
        <div className="flex flex-wrap gap-1">
          <button onClick={() => setLetter('')} className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer ${!letter ? 'bg-sky-600 text-white' : 'bg-bg border border-line text-ink-muted'}`}>Todas</button>
          {letters.map((l) => (
            <button key={l} onClick={() => setLetter(l === letter ? '' : l)} className={`w-7 py-1 rounded-md text-[11px] font-bold cursor-pointer ${letter === l ? 'bg-sky-600 text-white' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'}`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="card divide-y divide-line/60">
        {shown.map(([t, d, num]) => {
          const ch = CHAPTERS.find((c) => c.num === num);
          return (
          <div key={t} className="p-4 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-1 md:gap-4">
            <div>
              <div className="text-sm font-bold text-sky-300">{t}</div>
              {ch && (
                <button onClick={() => onSelectTopic(ch.id)} className="text-[11px] text-ink-muted hover:text-sky-300 cursor-pointer text-left">
                  Cap. {ch.num} · {ch.short}
                </button>
              )}
            </div>
            <div className={`text-sm text-ink leading-relaxed ${PROSE}`} dangerouslySetInnerHTML={html(d)} />
          </div>
          );
        })}
        {shown.length === 0 && <div className="p-6 text-sm text-ink-muted">Nenhum termo encontrado.</div>}
      </div>
    </div>
  );
}
