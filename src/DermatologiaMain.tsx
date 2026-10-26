import React, { useState, useEffect } from 'react';
import { 
  Sun, BookOpen, Layers, Droplets, Stethoscope, 
  Calculator, ShieldCheck, Sparkles, AlertTriangle, 
  Eye, Bug, Dna, Pill, ShieldAlert, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DermSindromeEritemato from './components/dermatologia/DermSindromeEritemato';
import DermSindromeEczemas from './components/dermatologia/DermSindromeEczemas';
import DermSindromeBolhosas from './components/dermatologia/DermSindromeBolhosas';
import DermSindromeInfecciosas from './components/dermatologia/DermSindromeInfecciosas';
import DermSindromeNeoplasias from './components/dermatologia/DermSindromeNeoplasias';
import DermSindromeAcneAlopecias from './components/dermatologia/DermSindromeAcneAlopecias';
import DermSindromeFarmacodermias from './components/dermatologia/DermSindromeFarmacodermias';
import DermCalculadoras from './components/dermatologia/DermCalculadoras';
import DermAtlasLesoes from './components/dermatologia/DermAtlasLesoes';
import DermGuiaCorticoides from './components/dermatologia/DermGuiaCorticoides';

interface DermatologiaMainProps {
  key?: React.Key;
  initialTopic?: string;
  onSelectTopic: (topicId: string) => void;
}

export type DermMainView = 
  | 'eritematodescamativas'
  | 'eczemas'
  | 'bolhosas'
  | 'infecciosas'
  | 'neoplasias'
  | 'acne_anexos'
  | 'farmacodermias'
  | 'calculadoras'
  | 'atlas_semiologia'
  | 'guia_prescricao';

export default function DermatologiaMain({ initialTopic = 'eritematodescamativas', onSelectTopic }: DermatologiaMainProps) {
  // Map legacy IDs or direct deep-links to the proper syndromic view
  const mapTopicToView = (t?: string): DermMainView => {
    if (!t) return 'eritematodescamativas';
    if (t === 'psoriase' || t === 'eritematodescamativas' || t.includes('cap-06') || t.includes('cap-07')) return 'eritematodescamativas';
    if (t === 'eczemas' || t.includes('atopica') || t.includes('cap-05')) return 'eczemas';
    if (t === 'penfigo' || t === 'bolhosas' || t.includes('cap-08')) return 'bolhosas';
    if (t === 'infecciosas' || t.includes('cap-02') || t.includes('cap-03') || t.includes('cap-04')) return 'infecciosas';
    if (t === 'neoplasias' || t === 'neo-pele' || t.includes('melanoma') || t.includes('cap-11') || t.includes('cap-12') || t.includes('cap-13')) return 'neoplasias';
    if (t === 'acne_anexos' || t.includes('acne') || t.includes('cap-09') || t.includes('cap-10')) return 'acne_anexos';
    if (t === 'farmacodermias' || t.includes('cap-14')) return 'farmacodermias';
    if (t === 'calculadoras' || t === 'pasi' || t === 'scorad') return 'calculadoras';
    if (t === 'atlas_semiologia' || t === 'derm-glossario' || t.includes('cap-01') || t.includes('semiologia')) return 'atlas_semiologia';
    if (t === 'guia_prescricao' || t.includes('corticoide')) return 'guia_prescricao';
    return 'eritematodescamativas';
  };

  const [activeView, setActiveView] = useState<DermMainView>(mapTopicToView(initialTopic));

  useEffect(() => {
    if (initialTopic) {
      setActiveView(mapTopicToView(initialTopic));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialTopic]);

  const handleSelectView = (view: DermMainView) => {
    setActiveView(view);
    onSelectTopic(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SYNDROMES = [
    {
      id: 'eritematodescamativas' as DermMainView,
      name: 'Eritematodescamativas',
      shortName: 'Psoríase & Líquen',
      icon: Layers,
      color: 'text-amber-400',
      activeColor: 'bg-amber-600',
      badge: 'Th17 & Auspitz'
    },
    {
      id: 'eczemas' as DermMainView,
      name: 'Eczemas & Alergias',
      shortName: 'Atópica & Contato',
      icon: Sparkles,
      color: 'text-cyan-400',
      activeColor: 'bg-cyan-600',
      badge: 'Th2 & Filagrina'
    },
    {
      id: 'bolhosas' as DermMainView,
      name: 'Doenças Bolhosas',
      shortName: 'Pênfigos & Penfigoide',
      icon: Droplets,
      color: 'text-rose-400',
      activeColor: 'bg-rose-600',
      badge: 'Nikolsky & IFD'
    },
    {
      id: 'infecciosas' as DermMainView,
      name: 'Infecciosas & Zoonoses',
      shortName: 'Erisipela, Tineas, Zoster',
      icon: Bug,
      color: 'text-emerald-400',
      activeColor: 'bg-emerald-600',
      badge: 'Bact / Mico / Vir'
    },
    {
      id: 'neoplasias' as DermMainView,
      name: 'Neoplasias Cutâneas',
      shortName: 'Melanoma, CBC & CEC',
      icon: Dna,
      color: 'text-purple-400',
      activeColor: 'bg-purple-600',
      badge: 'Breslow & Mohs'
    },
    {
      id: 'acne_anexos' as DermMainView,
      name: 'Anexos, Acne & Alopecias',
      shortName: 'Acne, Rosácea, Cabelos',
      icon: Stethoscope,
      color: 'text-blue-400',
      activeColor: 'bg-blue-600',
      badge: 'Roacutan & Hurley'
    },
    {
      id: 'farmacodermias' as DermMainView,
      name: 'Farmacodermias & Urgências',
      shortName: 'SSJ/NET, DRESS & PEGA',
      icon: ShieldAlert,
      color: 'text-red-400',
      activeColor: 'bg-red-600',
      badge: 'SCORTEN & UTI'
    }
  ];

  const CLINICAL_TOOLS = [
    {
      id: 'calculadoras' as DermMainView,
      name: 'Calculadoras Clínicas',
      shortName: 'PASI, SCORAD, BSA, FTU',
      icon: Calculator,
      color: 'text-amber-300'
    },
    {
      id: 'atlas_semiologia' as DermMainView,
      name: 'Atlas de Lesões & Sinais',
      shortName: 'Semiologia Elementar',
      icon: Eye,
      color: 'text-sky-300'
    },
    {
      id: 'guia_prescricao' as DermMainView,
      name: 'Guia de Prescrição',
      shortName: 'Corticoides I a VII & Biológicos',
      icon: Pill,
      color: 'text-rose-300'
    }
  ];

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto w-full">
      {/* =================================================================== */}
      {/* 1. CABEÇALHO DO MÓDULO (Padrão de Excelência da Plataforma) */}
      {/* =================================================================== */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <span className="p-1 rounded-md bg-amber-950 border border-amber-800">
                <Sun size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest font-mono">
                Dermatologia Clínica & Cirúrgica · Consensos SBD & Diretrizes Internacionais
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Dermatologia Baseada em Evidências
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Módulo clínico unificado nas <strong>7 Grandes Síndromes Dermatológicas</strong>, incorporando calculadoras de gravidade validadas (PASI, SCORAD, BSA, dose de Isotretinoína e SCORTEN), atlas semiológico interativo com sinais clássicos (Auspitz, Nikolsky, Koebner) e guia posológico completo de corticoides tópicos e imunobiológicos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              7 Síndromes Clínicas
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800 text-xs font-bold text-amber-300">
              Calculadoras Integradas
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* NAVEGAÇÃO PRINCIPAL: AS 7 SÍNDROMES CLÍNICAS */}
        {/* ================================================================= */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Grandes Síndromes Dermatológicas:
            </span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              Clique para alternar o protocolo
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {SYNDROMES.map(s => {
              const Icon = s.icon;
              const isActive = activeView === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectView(s.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? `${s.activeColor} text-white shadow-lg`
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : s.color} />
                  <span>{s.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-black/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                    {s.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* FERRAMENTAS CLÍNICAS RÁPIDAS (Calculadoras, Atlas, Prescrição) */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold shrink-0 mr-1">
            Ferramentas:
          </span>
          {CLINICAL_TOOLS.map(tool => {
            const Icon = tool.icon;
            const isActive = activeView === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleSelectView(tool.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border cursor-pointer transition-all ${
                  isActive
                    ? 'border-sky-500 bg-sky-500/20 text-sky-200'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                <Icon size={13} className={tool.color} />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. CONTEÚDO ATIVO DINÂMICO */}
      {/* =================================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full"
        >
          {activeView === 'eritematodescamativas' && <DermSindromeEritemato />}
          {activeView === 'eczemas' && <DermSindromeEczemas />}
          {activeView === 'bolhosas' && <DermSindromeBolhosas />}
          {activeView === 'infecciosas' && <DermSindromeInfecciosas />}
          {activeView === 'neoplasias' && <DermSindromeNeoplasias />}
          {activeView === 'acne_anexos' && <DermSindromeAcneAlopecias />}
          {activeView === 'farmacodermias' && <DermSindromeFarmacodermias />}
          {activeView === 'calculadoras' && <DermCalculadoras />}
          {activeView === 'atlas_semiologia' && <DermAtlasLesoes />}
          {activeView === 'guia_prescricao' && <DermGuiaCorticoides />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
