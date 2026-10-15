import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, TestTube, Pill, Baby, RotateCcw, 
  Sparkles, HeartPulse, FileText, CheckCircle2, ShieldAlert, BookOpen, Scale, Dna, UserCheck
} from 'lucide-react';

import DMGFatoresDeRisco from './components/diabetes_gestacional/DMGFatoresDeRisco';
import DMGDefinicao from './components/diabetes_gestacional/DMGDefinicao';
import DMGFisiopatologia from './components/diabetes_gestacional/DMGFisiopatologia';
import DMGDiagnosticSimulator from './components/diabetes_gestacional/DMGDiagnosticSimulator';
import DMGClassificacao from './components/diabetes_gestacional/DMGClassificacao';
import DMGTratamentoInsulina from './components/diabetes_gestacional/DMGTratamentoInsulina';
import DMGMetasGlicemicas from './components/diabetes_gestacional/DMGMetasGlicemicas';
import DMGAcompanhamentoParto from './components/diabetes_gestacional/DMGAcompanhamentoParto';

export default function DiabetesGestacionalMain() {
  const [activeTab, setActiveTab] = useState<string>('fatores_risco');

  const tabs = [
    {
      id: 'fatores_risco',
      label: '1. Fatores de Risco',
      shortLabel: '1. Risco',
      icon: UserCheck,
      color: 'text-indigo-400',
      activeColor: 'bg-indigo-600'
    },
    {
      id: 'definicao',
      label: '2. Definição & Prevalência',
      shortLabel: '2. Definição',
      icon: BookOpen,
      color: 'text-cyan-400',
      activeColor: 'bg-cyan-600'
    },
    {
      id: 'fisiopato',
      label: '3. Fisiopatologia Molecular',
      shortLabel: '3. Fisiopatologia',
      icon: Dna,
      color: 'text-purple-400',
      activeColor: 'bg-purple-600'
    },
    {
      id: 'diagnostico',
      label: '4. Diagnóstico & HAPO',
      shortLabel: '4. Diagnóstico',
      icon: TestTube,
      color: 'text-emerald-400',
      activeColor: 'bg-emerald-600'
    },
    {
      id: 'classificacao',
      label: '5. Classificação A1/A2',
      shortLabel: '5. Classificação',
      icon: Scale,
      color: 'text-amber-400',
      activeColor: 'bg-amber-600'
    },
    {
      id: 'tratamento',
      label: '6. Tratamento',
      shortLabel: '6. Tratamento',
      icon: Pill,
      color: 'text-emerald-400',
      activeColor: 'bg-emerald-600'
    },
    {
      id: 'metas_glicemicas',
      label: '7. Metas Glicêmicas',
      shortLabel: '7. Metas',
      icon: Activity,
      color: 'text-cyan-400',
      activeColor: 'bg-cyan-600'
    },
    {
      id: 'parto_puerperio',
      label: '8. Acompanhamento Pré-Natal e Intraparto',
      shortLabel: '8. Acompanhamento & Parto',
      icon: Baby,
      color: 'text-blue-400',
      activeColor: 'bg-blue-600'
    }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Activity size={220} />
        </div>
        <div className="relative z-10 w-full md:w-4/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
              <HeartPulse className="text-indigo-400" size={24} />
            </div>
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs">
              Obstetrícia & Endocrinologia / SBD • FEBRASGO 2024-2025 • ADA 2024 • ACOG PB 190 • OMS
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
            Diabetes Mellitus Gestacional (DMG) & Overt Diabetes
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Guia completo unificado nos <strong>8 Eixos Temáticos</strong>: Fatores de Risco Metabólicos e Obstétricos, Definição e Terminologia Guarda-Chuva, Fisiopatologia Molecular e Hipótese de Pedersen (1952), Diagnóstico e Rastreamento pelo HAPO com Simulador, Classificação de Priscilla White Modificada, Manejo Terapêutico com Nutrição Sem Cetose e Insulinoterapia, Metas Glicêmicas com Teste de Somogyi/Alvorecer, e Acompanhamento Pré-Natal, Momento do Parto e Reclassificação Pós-Parto por TOTG 75g.
          </p>

          {/* Destaques Epidemiológicos e Clínicos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Prevalência Brasil</span>
              <span className="text-base sm:text-xl font-black text-indigo-400">~18% das gestações</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Risco Futuro de DM2</span>
              <span className="text-base sm:text-xl font-black text-amber-400">Até 50% em 10 anos</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Associação c/ PE</span>
              <span className="text-base sm:text-xl font-black text-rose-400">Risco 3 a 4x Maior</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Critério Diagnóstico</span>
              <span className="text-base sm:text-xl font-black text-emerald-400">1 Valor Alterado</span>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL TABS SELECTOR — 7 UNIFIED THEMATIC HUBS */}
      <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-2xl shadow-lg sticky top-4 z-30 backdrop-blur-md overflow-x-auto no-scrollbar flex items-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? `${tab.activeColor} text-white shadow-lg scale-[1.02]`
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-white' : tab.color} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREA */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'fatores_risco' && (
            <motion.div
              key="fatores_risco"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGFatoresDeRisco />
            </motion.div>
          )}

          {activeTab === 'definicao' && (
            <motion.div
              key="definicao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGDefinicao />
            </motion.div>
          )}

          {activeTab === 'fisiopato' && (
            <motion.div
              key="fisiopato"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGFisiopatologia />
            </motion.div>
          )}

          {activeTab === 'diagnostico' && (
            <motion.div
              key="diagnostico"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGDiagnosticSimulator />
            </motion.div>
          )}

          {activeTab === 'classificacao' && (
            <motion.div
              key="classificacao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGClassificacao />
            </motion.div>
          )}

          {activeTab === 'tratamento' && (
            <motion.div
              key="tratamento"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGTratamentoInsulina />
            </motion.div>
          )}

          {activeTab === 'metas_glicemicas' && (
            <motion.div
              key="metas_glicemicas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGMetasGlicemicas />
            </motion.div>
          )}

          {activeTab === 'parto_puerperio' && (
            <motion.div
              key="parto_puerperio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DMGAcompanhamentoParto />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
