import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, ShieldAlert, Activity, TestTube, 
  Pill, ShieldCheck 
} from 'lucide-react';

import PreEclampsiaConceitosRisco from './components/preeclampsia/PreEclampsiaConceitosRisco';
import PreEclampsiaFisiopato from './components/preeclampsia/PreEclampsiaFisiopato';
import PreEclampsiaClinicaDiag from './components/preeclampsia/PreEclampsiaClinicaDiag';
import PreEclampsiaTratamento from './components/preeclampsia/PreEclampsiaTratamento';
import PreEclampsiaProfilaxia from './components/preeclampsia/PreEclampsiaProfilaxia';

export default function PreEclampsiaMain() {
  const [activeTab, setActiveTab] = useState<string>('conceitos_risco');

  const tabs = [
    { 
      id: 'conceitos_risco', 
      label: 'Conceitos & Fatores de Risco', 
      shortLabel: '1. Conceitos & Risco',
      icon: ShieldAlert, 
      color: 'text-sky-400', 
      bg: 'bg-sky-950/40', 
      border: 'border-sky-900/50', 
      activeBorder: 'border-sky-500' 
    },
    { 
      id: 'etiologia_fisiopato', 
      label: 'Etiologia & Fisiopatologia', 
      shortLabel: '2. Etiologia & Fisiopato',
      icon: Activity, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-950/40', 
      border: 'border-indigo-900/50', 
      activeBorder: 'border-indigo-500' 
    },
    { 
      id: 'clinica_diagnostico', 
      label: 'Quadro Clínico & Diagnóstico', 
      shortLabel: '3. Clínica & Diagnóstico',
      icon: TestTube, 
      color: 'text-rose-400', 
      bg: 'bg-rose-950/40', 
      border: 'border-rose-900/50', 
      activeBorder: 'border-rose-500' 
    },
    { 
      id: 'tratamento', 
      label: 'Tratamento & Manejo', 
      shortLabel: '4. Tratamento (Sulfato + PA + Parto)',
      icon: Pill, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-950/40', 
      border: 'border-emerald-900/50', 
      activeBorder: 'border-emerald-500' 
    },
    { 
      id: 'profilaxia', 
      label: 'Profilaxia (AAS / Cálcio)', 
      shortLabel: '5. Profilaxia',
      icon: ShieldCheck, 
      color: 'text-amber-400', 
      bg: 'bg-amber-950/40', 
      border: 'border-amber-900/50', 
      activeBorder: 'border-amber-500' 
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <HeartPulse size={220} />
        </div>
        <div className="relative z-10 w-full md:w-4/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-red-500/20 rounded-xl border border-red-500/30">
              <HeartPulse className="text-red-400" size={24} />
            </div>
            <span className="text-red-400 font-bold tracking-widest uppercase text-xs">
              Obstetrícia / Baseado na Apresentação Prof. Gustavo Moreira (UNIP) & Diretrizes FEBRASGO/ACOG
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
            Síndromes Hipertensivas Específicas da Gravidez (SHEG)
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Protocolo clínico estruturado em <strong>5 eixos centrais</strong>: Conceitos e Fatores de Risco, Fisiopatologia em 2 fases e as 7 Teorias Etiopatogênicas, Critérios Diagnósticos com Correção de Manguito, Tratamento Integral (Sulfato de Magnésio, Anti-hipertensivos e Resolução) e Profilaxia Primária com Evidência Atualizada.
          </p>

          {/* Destaques Epidemiológicos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Incidência Brasil</span>
              <span className="text-base sm:text-xl font-black text-white">7,5% PE / 0,8% Eclâmpsia</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Mortalidade Materna</span>
              <span className="text-base sm:text-xl font-black text-red-400">1ª Causa no Brasil (25%)</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Prematuridade</span>
              <span className="text-base sm:text-xl font-black text-amber-400">1ª Causa Terapêutica</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Regra Fundamental</span>
              <span className="text-xs sm:text-sm font-black text-emerald-400 uppercase">Diagnóstico = INTERNAR!</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 TABS NAV */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-300 ${tab.bg} ${
                isActive 
                  ? `${tab.activeBorder} ring-2 ring-white/20 shadow-lg scale-[1.02] bg-slate-900` 
                  : `${tab.border} hover:border-slate-600 hover:bg-slate-800/80 text-slate-400`
              }`}
            >
              <Icon className={`${tab.color} mb-2`} size={24} />
              <span className={`text-[11px] font-black uppercase tracking-wider text-center ${isActive ? 'text-white' : tab.color}`}>
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTENT AREA */}
      <AnimatePresence mode="wait">
        {activeTab === 'conceitos_risco' && (
          <motion.div key="conceitos_risco" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
            <PreEclampsiaConceitosRisco onSelectTab={(tabId) => setActiveTab(tabId)} />
          </motion.div>
        )}

        {activeTab === 'etiologia_fisiopato' && (
          <motion.div key="etiologia_fisiopato" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
            <PreEclampsiaFisiopato />
          </motion.div>
        )}

        {activeTab === 'clinica_diagnostico' && (
          <motion.div key="clinica_diagnostico" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
            <PreEclampsiaClinicaDiag />
          </motion.div>
        )}

        {activeTab === 'tratamento' && (
          <motion.div key="tratamento" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
            <PreEclampsiaTratamento />
          </motion.div>
        )}

        {activeTab === 'profilaxia' && (
          <motion.div key="profilaxia" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
            <PreEclampsiaProfilaxia />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
