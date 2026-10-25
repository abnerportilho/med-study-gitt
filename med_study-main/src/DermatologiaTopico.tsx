import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen, ArrowRight, Bug, Biohazard, Sprout, Activity, Waves, Palette, Sparkles, Scissors, Hand,
  Footprints, Pill, HeartPulse, Microscope,
} from 'lucide-react';
import { BlockView, CHAPTERS, ImageZoom, LOADERS, LoadError, useDefinitionPopup, type Block } from './DermatologiaCapitulo';
import { TOPICOS, type Topico } from './dermatologia/topicos';
import { parseRef, sliceSection, type SectionSlice } from './dermatologia/secoes';

// ==========================================================================
// Tópico por doença: reúne em abas as seções do manual sobre a mesma doença (teoria,
// caso da aula prática, aula complementar), no mesmo modelo de Pênfigo e Psoríase.
// ==========================================================================

type Icon = React.ComponentType<{ size?: number; className?: string }>;

export const GROUP_ICON: Record<string, Icon> = {
  Piodermites: Bug,
  Viroses: Biohazard,
  Micoses: Sprout,
  Hanseníase: Activity,
  Eczemas: Waves,
  'Inflamatórias e pigmentares': Palette,
  Acne: Sparkles,
  Cabelos: Scissors,
  Unhas: Hand,
  'Úlceras e feridas': Footprints,
  'Farmacodermias e fotoproteção': Pill,
  'Doenças sistêmicas': HeartPulse,
  'Semiologia armada': Microscope,
};

interface ResolvedTab {
  label: string;
  slices: (SectionSlice<Block> & { chapter: number })[];
}

const chapterId = (n: number) => `derm-cap-${String(n).padStart(2, '0')}`;

export function DermatologiaTopico({ topico, onSelectTopic }: { topico: Topico; onSelectTopic: (id: string) => void }) {
  const [tabs, setTabs] = useState<ResolvedTab[] | null>(null);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [zoom, setZoom] = useState<{ key: string; cap: string } | null>(null);
  const { onClick, popup } = useDefinitionPopup();

  const chapterNums = useMemo(
    () => Array.from(new Set(topico.tabs.flatMap((t) => t.refs.map((r) => parseRef(r).chapter)))),
    [topico],
  );

  useEffect(() => {
    let alive = true;
    Promise.all(chapterNums.map((n) => LOADERS[chapterId(n)]().then((m) => [n, (m.default as { blocks: Block[] }).blocks] as const)))
      .then((loaded) => {
        if (!alive) return;
        const byNum = new Map<number, Block[]>(loaded);
        setTabs(
          topico.tabs.map((t) => ({
            label: t.label,
            slices: t.refs.flatMap((ref) => {
              const r = parseRef(ref);
              const s = sliceSection(byNum.get(r.chapter)!, r);
              return s ? [{ ...s, chapter: r.chapter }] : [];
            }),
          })),
        );
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [topico, chapterNums]);

  const HeaderIcon = GROUP_ICON[topico.group] ?? BookOpen;
  const sources = chapterNums.map((n) => CHAPTERS.find((c) => c.num === n)!).filter(Boolean);
  const related = TOPICOS.filter((t) => t.group === topico.group && t.id !== topico.id);

  if (error) return <LoadError what="este tópico" />;
  if (!tabs) return <div className="card p-6 text-sm text-ink-muted animate-pulse">Carregando tópico…</div>;

  const tab = tabs[activeTab] ?? tabs[0];
  const sectionCount = tabs.reduce((n, t) => n + t.slices.length, 0);
  const figCount = tabs.reduce(
    (n, t) => n + t.slices.reduce((m, s) => m + s.blocks.reduce((k, b) => k + (b.t === 'figs' ? b.figs.length : 0), 0), 0),
    0,
  );
  const highlights = [
    { label: 'Abas', value: String(tabs.length), note: 'organizadas por tema', tone: 'text-sky-400' },
    { label: 'Seções', value: String(sectionCount), note: 'do manual, na íntegra', tone: 'text-emerald-400' },
    { label: 'Imagens', value: String(figCount), note: 'clínicas e esquemas', tone: 'text-amber-400' },
    { label: 'Capítulos', value: sources.map((c) => c.num).join(' · '), note: 'de origem', tone: 'text-rose-400' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full" onClick={onClick}>
      {/* Cabeçalho */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <HeaderIcon size={220} />
        </div>
        <div className="relative z-10 w-full md:w-4/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-sky-500/20 rounded-xl border border-sky-500/30">
              <HeaderIcon className="text-sky-400" size={24} />
            </div>
            <span className="text-sky-400 font-bold tracking-widest uppercase text-xs">Dermatologia • {topico.group} • Manual de Dermatologia</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">{topico.name}</h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Tudo o que o manual traz sobre <strong>{topico.name}</strong>, reunido de{' '}
            {sources.map((c, i) => (
              <React.Fragment key={c.id}>
                {i > 0 && (i === sources.length - 1 ? ' e ' : ', ')}
                <span className="text-white">Cap. {c.num} · {c.short}</span>
              </React.Fragment>
            ))}
            .
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
            {highlights.map((h) => (
              <div key={h.label} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-bold block uppercase">{h.label}</span>
                <span className={`text-base sm:text-lg font-black ${h.tone}`}>{h.value}</span>
                <span className="text-[10px] text-slate-500 block">{h.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Abas */}
      {tabs.length > 1 && (
        <div className="flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
                tab === t ? 'border-sky-400 text-sky-300 bg-sky-500/5 rounded-t-xl' : 'border-transparent text-ink-muted hover:text-brand-navy hover:border-slate-400'
              }`}
            >
              {i + 1}. {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Conteúdo da aba */}
      {tab.slices.map((s) => {
        const ch = CHAPTERS.find((c) => c.num === s.chapter);
        return (
          <section key={`${s.chapter}-${s.num}-${s.title}`} className="card p-5 md:p-6 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-lg md:text-xl font-black text-brand-navy flex items-baseline gap-2">
                <span className="text-sky-400 font-mono text-base">{s.num}</span>
                {s.title}
              </h3>
              {ch && (
                <button
                  onClick={() => onSelectTopic(ch.id)}
                  className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-line text-[10.5px] font-bold text-ink-muted hover:text-sky-300 hover:border-sky-500/40 cursor-pointer"
                  title="Abrir o capítulo completo"
                >
                  <BookOpen size={11} /> Cap. {ch.num} · {ch.short}
                </button>
              )}
            </div>
            {s.blocks.map((b, j) => <div key={j}><BlockView b={b} onZoom={(key, cap) => setZoom({ key, cap })} /></div>)}
          </section>
        );
      })}

      {/* Ligações com o manual e outros tópicos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-sky-300"><BookOpen size={14} /> Capítulos completos no manual</div>
          {sources.map((c) => (
            <button key={c.id} onClick={() => onSelectTopic(c.id)} className="w-full text-left flex items-start gap-2 p-2 rounded-lg hover:bg-bg cursor-pointer">
              <ArrowRight size={14} className="text-sky-400 mt-0.5 shrink-0" />
              <span className="text-sm text-ink"><strong className="text-brand-navy">Cap. {c.num} · {c.short}:</strong> {c.title}</span>
            </button>
          ))}
        </div>
        {related.length > 0 && (
          <div className="card p-5 space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-ink-muted"><HeaderIcon size={14} /> Outros tópicos · {topico.group}</div>
            <div className="flex flex-wrap gap-1.5">
              {related.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTopic(t.id)}
                  className="px-2.5 py-1.5 rounded-lg border border-line bg-bg text-[11px] font-bold text-ink-muted hover:text-brand-navy hover:border-sky-500/40 cursor-pointer"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {zoom && <ImageZoom zoom={zoom} onClose={() => setZoom(null)} />}
      {popup}
    </div>
  );
}
