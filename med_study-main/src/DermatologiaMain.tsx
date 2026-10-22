import React, { useEffect } from 'react';
import { Sun, BookOpen, Layers, Droplets } from 'lucide-react';
import { CHAPTERS, DermatologiaCapitulo, DermatologiaGlossario } from './DermatologiaCapitulo';
import PenfigoMain from './PenfigoMain';
import PsoriaseMain from './PsoriaseMain';

// ==========================================================================
// Dermatologia: Manual de Dermatologia (19 capítulos em 4 partes + glossário)
// e os tópicos de doença Pênfigo e Psoríase. Cada capítulo é um item do menu.
// ==========================================================================

interface DermatologiaMainProps {
  key?: React.Key;
  initialTopic?: string;
  onSelectTopic: (topicId: string) => void;
}

export const DERM_GLOSSARIO_ID = 'derm-glossario';
export const DERM_DISEASES = [
  { id: 'penfigo', name: 'Pênfigo', icon: Droplets },
  { id: 'psoriase', name: 'Psoríase', icon: Layers },
];

const PARTS = Array.from(new Map(CHAPTERS.map((c) => [c.part, c.partName])).entries());

export default function DermatologiaMain({ initialTopic = CHAPTERS[0].id, onSelectTopic }: DermatologiaMainProps) {
  const topic = initialTopic;
  // Cada tópico remonta o módulo (key no App): volta ao topo ao trocar de capítulo.
  useEffect(() => window.scrollTo({ top: 0 }), []);
  const chapter = CHAPTERS.find((c) => c.id === topic);
  const group = chapter ? chapter.part : topic === DERM_GLOSSARIO_ID ? 'glossario' : 'doencas';
  const groupChapters = chapter ? CHAPTERS.filter((c) => c.part === chapter.part) : [];

  const pill = (active: boolean) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
      active ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/50' : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
    }`;

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto w-full">
      {/* Cabeçalho do módulo */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 mb-1">
              <span className="p-1 rounded-md bg-sky-950 border border-sky-800">
                <Sun size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">Dermatologia Clínica & Semiologia</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">Dermatologia</h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Manual completo em <strong>19 capítulos</strong>, dos fundamentos às aulas práticas, com as imagens clínicas principais e o glossário, mais os tópicos de <strong>Pênfigo</strong> e <strong>Psoríase</strong>.
            </p>
          </div>
        </div>

        {/* Partes do manual */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800 overflow-x-auto no-scrollbar pb-1">
          {PARTS.map(([part, name]) => (
            <button key={part} onClick={() => onSelectTopic(CHAPTERS.find((c) => c.part === part)!.id)} className={pill(group === part)} title={name}>
              <BookOpen size={14} />
              <span>Parte {part} · {name.split(',')[0]}</span>
            </button>
          ))}
          {DERM_DISEASES.map((d) => (
            <button key={d.id} onClick={() => onSelectTopic(d.id)} className={pill(topic === d.id)}>
              <d.icon size={14} />
              <span>{d.name}</span>
            </button>
          ))}
          <button onClick={() => onSelectTopic(DERM_GLOSSARIO_ID)} className={pill(group === 'glossario')}>
            <BookOpen size={14} />
            <span>Glossário</span>
          </button>
        </div>

        {/* Capítulos da parte atual */}
        {groupChapters.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {groupChapters.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectTopic(c.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap border cursor-pointer ${
                  c.id === topic ? 'border-sky-500/60 bg-sky-500/15 text-sky-200' : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {c.num}. {c.short}
              </button>
            ))}
          </div>
        )}
      </div>

      {chapter ? (
        <DermatologiaCapitulo chapterId={chapter.id} onSelectTopic={onSelectTopic} />
      ) : topic === DERM_GLOSSARIO_ID ? (
        <DermatologiaGlossario onSelectTopic={onSelectTopic} />
      ) : topic === 'penfigo' ? (
        <PenfigoMain onSelectTopic={onSelectTopic} />
      ) : topic === 'psoriase' ? (
        <PsoriaseMain onSelectTopic={onSelectTopic} />
      ) : (
        <DermatologiaCapitulo chapterId={CHAPTERS[0].id} onSelectTopic={onSelectTopic} />
      )}
    </div>
  );
}
