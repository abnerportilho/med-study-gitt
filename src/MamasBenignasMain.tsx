import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Stethoscope, Eye, Heart, CircleDot, 
  Droplet, Sparkles, ShieldAlert, Award, ArrowRight
} from 'lucide-react';

import MamaAnatomiaFisio from './components/mamas_benignas/MamaAnatomiaFisio';
import MamaConsultaExame from './components/mamas_benignas/MamaConsultaExame';
import MamaImagemBIRADS from './components/mamas_benignas/MamaImagemBIRADS';
import MamaMastalgia from './components/mamas_benignas/MamaMastalgia';
import MamaNodulosCistos from './components/mamas_benignas/MamaNodulosCistos';
import MamaDescargaInflamacao from './components/mamas_benignas/MamaDescargaInflamacao';
import MamaCasosClinicosDecisoes from './components/mamas_benignas/MamaCasosClinicosDecisoes';

export default function MamasBenignasMain() {
  const [activeTab, setActiveTab] = useState<
    'anatomia' | 'consulta' | 'imagem' | 'mastalgia' | 'nodulos' | 'descarga' | 'casos'
  >('anatomia');

  const TABS = [
    { id: 'anatomia', label: '1. Anatomia & Fisiologia', icon: Layers, color: 'text-rose-400' },
    { id: 'consulta', label: '2. Consulta & Exame Clínico', icon: Stethoscope, color: 'text-pink-400' },
    { id: 'imagem', label: '3. Imagem & BI-RADS', icon: Eye, color: 'text-cyan-400' },
    { id: 'mastalgia', label: '4. Mastalgia', icon: Heart, color: 'text-amber-400' },
    { id: 'nodulos', label: '5. Nódulos & Cistos', icon: CircleDot, color: 'text-purple-400' },
    { id: 'descarga', label: '6. Descarga & Inflamação', icon: Droplet, color: 'text-cyan-400' },
    { id: 'casos', label: '7. Casos & 5 Decisões', icon: Sparkles, color: 'text-rose-400' }
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
                Ginecologia & Mastologia Clínica
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Alterações Benignas das Mamas
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Morfologia, Anamnese dos 4 Eixos, Roteiro de Exame Físico, BI-RADS & Avaliação Tríplice, Manejo da Mastalgia, Nódulos, Cistos, Descargas Papilares, Mastites e Casos Clínicos Estruturantes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
              🎓 Aula Profa. Dra. Flávia Ximenes
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs font-bold text-rose-300">
              7 Eixos de Decisão
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
          {activeTab === 'anatomia' && <MamaAnatomiaFisio />}
          {activeTab === 'consulta' && <MamaConsultaExame />}
          {activeTab === 'imagem' && <MamaImagemBIRADS />}
          {activeTab === 'mastalgia' && <MamaMastalgia />}
          {activeTab === 'nodulos' && <MamaNodulosCistos />}
          {activeTab === 'descarga' && <MamaDescargaInflamacao />}
          {activeTab === 'casos' && <MamaCasosClinicosDecisoes />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
