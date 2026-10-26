import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BlockView, CHAPTERS, useDefinitionPopup, type Block } from './DermatologiaCapitulo';

// ==========================================================================
// Módulo de doença dermatológica no mesmo modelo dos resumos de doença do app
// (ex.: Dislipidemias): cabeçalho com destaques, abas numeradas e cards de conteúdo.
// O conteúdo usa os mesmos blocos dos capítulos do manual (tabelas, quadros, fluxos).
// ==========================================================================

type Icon = React.ComponentType<{ size?: number; className?: string }>;

export interface DoencaSection {
  title: string;
  blocks: Block[];
}

export interface DoencaTab {
  id: string;
  label: string;
  icon: Icon;
  sections: DoencaSection[];
}

export interface DoencaContent {
  icon: Icon;
  eyebrow: string;
  title: string;
  description: string;
  highlights: { label: string; value: string; note: string; tone: string }[];
  tabs: DoencaTab[];
  seeAlso: { chapterId: string; note: string }[];
  references: string[];
}

export function DermatologiaDoenca({ content, onSelectTopic }: { content: DoencaContent; onSelectTopic: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState(content.tabs[0].id);
  const { onClick, popup } = useDefinitionPopup();
  const tab = content.tabs.find((t) => t.id === activeTab) ?? content.tabs[0];
  const HeaderIcon = content.icon;

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
            <span className="text-sky-400 font-bold tracking-widest uppercase text-xs">{content.eyebrow}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">{content.title}</h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">{content.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
            {content.highlights.map((h) => (
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
      <div className="flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
        {content.tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
              activeTab === t.id ? 'border-sky-400 text-sky-300 bg-sky-500/5 rounded-t-xl' : 'border-transparent text-ink-muted hover:text-brand-navy hover:border-slate-400'
            }`}
          >
            <t.icon size={16} />
            {i + 1}. {t.label}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba */}
      {tab.sections.map((s) => (
        <section key={s.title} className="card p-5 md:p-6 space-y-3">
          <h3 className="text-lg md:text-xl font-black text-brand-navy">{s.title}</h3>
          {s.blocks.map((b, j) => <div key={j}><BlockView b={b} onZoom={() => undefined} /></div>)}
        </section>
      ))}

      {/* Ligações com o manual e referências */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-sky-300"><BookOpen size={14} /> Veja também no manual</div>
          {content.seeAlso.map((s) => {
            const ch = CHAPTERS.find((c) => c.id === s.chapterId);
            if (!ch) return null;
            return (
              <button key={s.chapterId} onClick={() => onSelectTopic(ch.id)} className="w-full text-left flex items-start gap-2 p-2 rounded-lg hover:bg-bg cursor-pointer">
                <ArrowRight size={14} className="text-sky-400 mt-0.5 shrink-0" />
                <span className="text-sm text-ink"><strong className="text-brand-navy">Cap. {ch.num} · {ch.short}:</strong> {s.note}</span>
              </button>
            );
          })}
        </div>
        <div className="card p-5 space-y-2">
          <div className="text-[11px] font-black uppercase tracking-wider text-ink-muted">Referências</div>
          <ul className="text-xs text-ink-muted space-y-1.5 list-disc pl-4 leading-relaxed">
            {content.references.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>
      {popup}
    </div>
  );
}
