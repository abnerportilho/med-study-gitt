import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, AlertTriangle, Eye, Microscope, Compass, 
  Sparkles, Award, Heart, ShieldAlert
} from 'lucide-react';

import MalignasCarcinogeneseRisco from './components/mamas_malignas/MalignasCarcinogeneseRisco';
import MalignasSuspeitaSinaisAlerta from './components/mamas_malignas/MalignasSuspeitaSinaisAlerta';
import MalignasPropedêuticaImagemBIRADS from './components/mamas_malignas/MalignasPropedêuticaImagemBIRADS';
import MalignasPatologiaBiomarcadores from './components/mamas_malignas/MalignasPatologiaBiomarcadores';
import MalignasEstadiamentoTNM from './components/mamas_malignas/MalignasEstadiamentoTNM';
import MalignasTratamentoSeguimento from './components/mamas_malignas/MalignasTratamentoSeguimento';
import MalignasCasosClinicosDecisoes from './components/mamas_malignas/MalignasCasosClinicosDecisoes';

export default function MamasMalignasMain() {
  const [activeTab, setActiveTab] = useState<
    'carcinogenese' | 'suspeita' | 'imagem' | 'patologia' | 'estadiamento' | 'tratamento' | 'casos'
  >('carcinogenese');

  const TABS = [
    { id: 'carcinogenese', label: '1. Carcinogênese & Risco', icon: Dna, color: 'text-rose-400' },
    { id: 'suspeita', label: '2. Sinais de Alerta & Formas Especiais', icon: AlertTriangle, color: 'text-amber-400' },
    { id: 'imagem', label: '3. Rastreamento & BI-RADS', icon: Eye, color: 'text-cyan-400' },
    { id: 'patologia', label: '4. Patologia & Biomarcadores', icon: Microscope, color: 'text-purple-400' },
    { id: 'estadiamento', label: '5. Estadiamento TNM', icon: Compass, color: 'text-indigo-400' },
    { id: 'tratamento', label: '6. Tratamento & Seguimento', icon: Sparkles, color: 'text-emerald-400' },
    { id: 'casos', label: '7. Casos Clínicos & Decisões', icon: Award, color: 'text-rose-400' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER PRINCIPAL */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <span className="p-1 rounded-md bg-rose-950 border border-rose-800">
                <Heart size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                Mastologia & Oncologia Clínica
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Câncer de Mama
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Carcinogênese e Estratificação de Risco, Sinais de Alerta, Formas Especiais (Paget, Inflamatório T4d e Masculino), Rastreamento e Imagem, O Papel Divisor da Membrana Basal, Biomarcadores, Estadiamento TNM/Prognóstico, Condutas Cirúrgicas e Sistêmicas e Casos Práticos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
              🎓 Aula Profa. Dra. Flávia Ximenes
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs font-bold text-rose-300">
              7 Eixos Estruturantes
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO ENTRE ABAS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar border-t border-slate-800">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30 scale-105'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : tab.color} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTEÚDO DINÂMICO COM ANIMAÇÃO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === 'carcinogenese' && <MalignasCarcinogeneseRisco />}
          {activeTab === 'suspeita' && <MalignasSuspeitaSinaisAlerta />}
          {activeTab === 'imagem' && <MalignasPropedêuticaImagemBIRADS />}
          {activeTab === 'patologia' && <MalignasPatologiaBiomarcadores />}
          {activeTab === 'estadiamento' && <MalignasEstadiamentoTNM />}
          {activeTab === 'tratamento' && <MalignasTratamentoSeguimento />}
          {activeTab === 'casos' && <MalignasCasosClinicosDecisoes />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
