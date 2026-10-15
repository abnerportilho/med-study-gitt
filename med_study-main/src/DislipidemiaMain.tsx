import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Activity, 
  Dna, 
  Layers, 
  TestTube, 
  ShieldAlert, 
  Pill, 
  Flame, 
  Calculator, 
  FileQuestion,
  Sparkles,
  Stethoscope
} from 'lucide-react';

import DislipFisiopatologia from './components/dislipidemia/DislipFisiopatologia';
import DislipClassificacao from './components/dislipidemia/DislipClassificacao';
import DislipDiagnostico from './components/dislipidemia/DislipDiagnostico';
import DislipRiscoCardiovascular from './components/dislipidemia/DislipRiscoCardiovascular';
import DislipTratamentoColesterol from './components/dislipidemia/DislipTratamentoColesterol';
import DislipTratamentoTriglicerideos from './components/dislipidemia/DislipTratamentoTriglicerideos';
import DislipCalculadoraMetas from './components/dislipidemia/DislipCalculadoraMetas';
import DislipCasosClinicos from './components/dislipidemia/DislipCasosClinicos';
import PreventCalculator from './PreventCalculator';

export default function DislipidemiaMain() {
  const [activeTab, setActiveTab] = useState<string>('fisiopatologia');

  const tabs = [
    {
      id: 'fisiopatologia',
      label: '1. Fisiopatologia Lipoproteica',
      shortLabel: '1. Fisiopatologia',
      icon: Dna,
      color: 'text-blue-500',
      activeColor: 'bg-blue-600'
    },
    {
      id: 'classificacao',
      label: '2. Classificação & Causas Secundárias',
      shortLabel: '2. Classificação',
      icon: Layers,
      color: 'text-indigo-500',
      activeColor: 'bg-indigo-600'
    },
    {
      id: 'diagnostico',
      label: '3. Diagnóstico & Jejum Laboratorial',
      shortLabel: '3. Diagnóstico',
      icon: TestTube,
      color: 'text-cyan-500',
      activeColor: 'bg-cyan-600'
    },
    {
      id: 'risco_cv',
      label: '4. Risco Cardiovascular & Metas',
      shortLabel: '4. Risco & Metas',
      icon: ShieldAlert,
      color: 'text-red-500',
      activeColor: 'bg-red-600'
    },
    {
      id: 'colesterol',
      label: '5. Hipercolesterolemia (LDL-c)',
      shortLabel: '5. Hipercolesterolemia',
      icon: Pill,
      color: 'text-rose-500',
      activeColor: 'bg-rose-600'
    },
    {
      id: 'triglicerideos',
      label: '6. Hipertrigliceridemia & Pancreatite',
      shortLabel: '6. Triglicerídeos',
      icon: Flame,
      color: 'text-amber-500',
      activeColor: 'bg-amber-600'
    },
    {
      id: 'prevent',
      label: '7. Calculadora PREVENT™ (AHA 2024)',
      shortLabel: '7. PREVENT™ AHA',
      icon: Activity,
      color: 'text-rose-500',
      activeColor: 'bg-rose-600'
    },
    {
      id: 'calculadora',
      label: '8. Calculadora de Metas & Risco SBC',
      shortLabel: '8. Metas SBC',
      icon: Calculator,
      color: 'text-purple-500',
      activeColor: 'bg-purple-600'
    },
    {
      id: 'casos_clinicos',
      label: '9. Casos Clínicos Interativos',
      shortLabel: '9. Casos Clínicos',
      icon: FileQuestion,
      color: 'text-emerald-500',
      activeColor: 'bg-emerald-600'
    }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12">
      {/* HEADER PRINCIPAL */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Heart size={220} />
        </div>
        <div className="relative z-10 w-full md:w-4/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-rose-500/20 rounded-xl border border-rose-500/30">
              <Heart className="text-rose-400" size={24} />
            </div>
            <span className="text-rose-400 font-bold tracking-widest uppercase text-xs">
              Cardiologia & Endocrinologia / SBC 2017-2024 • ESC/EAS 2019 • AHA/ACC
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
            Dislipidemias: Hipercolesterolemia & Hipertrigliceridemia
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Protocolo clínico completo unificado nos <strong>8 Módulos Temáticos</strong>: Vias Metabólicas das Lipoproteínas (ApoB, LDL e HDL), Classificação Fenotípica da SBC e Fredrickson (OMS), Diagnóstico Laboratorial com Flexibilização do Jejum e Friedewald, Estratificação de Risco Cardiovascular Global com Metas Estritas, Tratamento da Hipercolesterolemia (Estatinas de Alta Potência, Ezetimiba, PCSK9 e Bempedoico), Abordagem Bifurcada da Hipertrigliceridemia (Fibratos Seguros e Protocolo Hospitalar de Insulina IV na Pancreatite), Calculadora Interativa de Metas e Casos Clínicos de Tomada de Decisão.
          </p>

          {/* Destaques Epidemiológicos e Metas Chave */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Meta Muito Alto Risco</span>
              <span className="text-base sm:text-xl font-black text-rose-500">&lt; 50 mg/dL</span>
              <span className="text-[10px] text-slate-500">e redução &ge; 50%</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Alerta Pancreatite</span>
              <span className="text-base sm:text-xl font-black text-amber-500">&ge; 500 mg/dL</span>
              <span className="text-[10px] text-slate-500">Fibrato Imediato</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Jejum de 12 Horas</span>
              <span className="text-base sm:text-xl font-black text-cyan-400">Flexibilizado</span>
              <span className="text-[10px] text-slate-500">TG normal &lt; 175 s/ jejum</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Fórmula de Friedewald</span>
              <span className="text-base sm:text-xl font-black text-emerald-400">Inválida &gt; 400</span>
              <span className="text-[10px] text-slate-500">Usar Não-HDL ou direta</span>
            </div>
          </div>
        </div>
      </div>

      {/* SELETOR HORIZONTAL DE ABAS */}
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

      {/* ÁREA DO CONTEÚDO ATIVO */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'fisiopatologia' && (
            <motion.div
              key="fisiopatologia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DislipFisiopatologia />
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
              <DislipClassificacao />
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
              <DislipDiagnostico />
            </motion.div>
          )}

          {activeTab === 'risco_cv' && (
            <motion.div
              key="risco_cv"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DislipRiscoCardiovascular />
            </motion.div>
          )}

          {activeTab === 'colesterol' && (
            <motion.div
              key="colesterol"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DislipTratamentoColesterol />
            </motion.div>
          )}

          {activeTab === 'triglicerideos' && (
            <motion.div
              key="triglicerideos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DislipTratamentoTriglicerideos />
            </motion.div>
          )}

          {activeTab === 'prevent' && (
            <motion.div
              key="prevent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PreventCalculator />
            </motion.div>
          )}

          {activeTab === 'calculadora' && (
            <motion.div
              key="calculadora"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DislipCalculadoraMetas />
            </motion.div>
          )}

          {activeTab === 'casos_clinicos' && (
            <motion.div
              key="casos_clinicos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DislipCasosClinicos />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
