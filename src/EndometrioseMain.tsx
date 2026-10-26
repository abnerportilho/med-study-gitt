import React, { useState } from 'react';
import { 
  Heart, Layers, Dna, Stethoscope, Eye, 
  Scale, Baby, Pill, 
  Activity, ShieldAlert, Award, BookOpen, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EndoConceitoEpidemio from './components/endometriose/EndoConceitoEpidemio';
import EndoFisiopatologia from './components/endometriose/EndoFisiopatologia';
import EndoQuadroClinicoExame from './components/endometriose/EndoQuadroClinicoExame';
import EndoDiagnosticoImagem from './components/endometriose/EndoDiagnosticoImagem';
import EndoClassificacoes from './components/endometriose/EndoClassificacoes';
import EndoFertilidadeReserva from './components/endometriose/EndoFertilidadeReserva';
import EndoTratamentoClinicoCirurgico from './components/endometriose/EndoTratamentoClinicoCirurgico';

export default function EndometrioseMain() {
  const [activeTab, setActiveTab] = useState<string>('conceito');

  const TABS = [
    {
      id: 'conceito',
      label: '1. Conceito & Fenótipos',
      shortLabel: '1. Conceito',
      icon: Layers,
      color: 'text-rose-400',
      activeColor: 'bg-rose-600'
    },
    {
      id: 'fisiopatologia',
      label: '2. Fisiopatologia Molecular',
      shortLabel: '2. Fisiopatologia',
      icon: Dna,
      color: 'text-purple-400',
      activeColor: 'bg-purple-600'
    },
    {
      id: 'clinica_exame',
      label: '3. Quadro Clínico & 6 D\'s',
      shortLabel: '3. 6 D\'s & Exame',
      icon: Stethoscope,
      color: 'text-pink-400',
      activeColor: 'bg-pink-600'
    },
    {
      id: 'diagnostico_imagem',
      label: '4. Diagnóstico & Imagem',
      shortLabel: '4. USG / RM',
      icon: Eye,
      color: 'text-cyan-400',
      activeColor: 'bg-cyan-600'
    },
    {
      id: 'classificacoes',
      label: '5. Classificações & EFI',
      shortLabel: '5. Classificações',
      icon: Scale,
      color: 'text-amber-400',
      activeColor: 'bg-amber-600'
    },
    {
      id: 'fertilidade',
      label: '6. Fertilidade & AMH',
      shortLabel: '6. Fertilidade',
      icon: Baby,
      color: 'text-emerald-400',
      activeColor: 'bg-emerald-600'
    },
    {
      id: 'tratamento',
      label: '7. Tratamento por Objetivo',
      shortLabel: '7. Tratamento',
      icon: Pill,
      color: 'text-teal-400',
      activeColor: 'bg-teal-600'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 text-slate-100 min-h-screen">
      {/* HEADER PRINCIPAL */}
      <header className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={13} />
              Ginecologia & Obstetrícia · Protocolo Baseado em Evidências
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold font-mono">
              UNIP Medicina · Prof. Flávia Ximenes Coimbra Alcoléa
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            Endometriose: Da Suspeita Clínica ao Tratamento Individualizado
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Guia completo unificado nos <strong>7 Eixos Temáticos</strong>: Conceito e Fenótipos Clínicos (Peritoneal, Ovariana, Profunda), Fisiopatologia Molecular e Epigenética, Os 6 D's e Roteiro de Anamnese com Exame Físico Especializado, Investigação por Imagem (Fim da obrigatoriedade da laparoscopia, USG com preparo e <em>Sliding Sign</em>, RM), Sistemas de Classificação (rASRM, #Enzian e Calculadora Interativa do EFI), Fatores de Infertilidade e Preservação de Reserva Ovariana (AMH), e Tratamento Clínico e Cirúrgico Guiado por Objetivo.
          </p>

          {/* DESTAQUES CLÍNICOS RÁPIDOS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Prevalência</span>
              <span className="text-lg font-black text-rose-400 font-mono">Até 10%</span>
              <span className="text-[10px] text-slate-400 block">das mulheres em menacme</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Infertilidade</span>
              <span className="text-lg font-black text-amber-400 font-mono">30% a 50%</span>
              <span className="text-[10px] text-slate-400 block">apresentam subfertilidade</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Exame Inicial</span>
              <span className="text-lg font-black text-cyan-400 font-mono">USG com Preparo</span>
              <span className="text-[10px] text-slate-400 block">Sliding sign & mapeamento</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Regra de Ouro</span>
              <span className="text-lg font-black text-purple-400 font-mono">Tratar por Objetivo</span>
              <span className="text-[10px] text-slate-400 block">Dor vs Engravidar</span>
            </div>
          </div>
        </div>
      </header>

      {/* BARRA DE NAVEGAÇÃO DOS EIXOS */}
      <nav className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all shrink-0 ${
                isActive 
                  ? `${tab.activeColor} text-white shadow-lg shadow-rose-950/30 scale-[1.02]`
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-white' : tab.color} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* CONTEÚDO DOS EIXOS TEMÁTICOS */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'conceito' && (
            <motion.div
              key="conceito"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <EndoConceitoEpidemio />
            </motion.div>
          )}

          {activeTab === 'fisiopatologia' && (
            <motion.div
              key="fisiopatologia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <EndoFisiopatologia />
            </motion.div>
          )}

          {activeTab === 'clinica_exame' && (
            <motion.div
              key="clinica_exame"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <EndoQuadroClinicoExame />
            </motion.div>
          )}

          {activeTab === 'diagnostico_imagem' && (
            <motion.div
              key="diagnostico_imagem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <EndoDiagnosticoImagem />
            </motion.div>
          )}

          {activeTab === 'classificacoes' && (
            <motion.div
              key="classificacoes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <EndoClassificacoes />
            </motion.div>
          )}

          {activeTab === 'fertilidade' && (
            <motion.div
              key="fertilidade"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <EndoFertilidadeReserva />
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
              <EndoTratamentoClinicoCirurgico />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
