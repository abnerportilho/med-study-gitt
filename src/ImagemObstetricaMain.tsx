import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, Droplet, HeartPulse, Stethoscope, Sparkles, CheckCircle2,
  Calendar, Layers, Activity
} from 'lucide-react';

import USGGeralTrimesters from './components/imagem_obstetrica/USGGeralTrimesters';
import USGAvaliacaoLiquido from './components/imagem_obstetrica/USGAvaliacaoLiquido';
import USGDopplerHemodinamica from './components/imagem_obstetrica/USGDopplerHemodinamica';

export default function ImagemObstetricaMain() {
  const [mainTab, setMainTab] = useState<'ultrassom' | 'liquido' | 'doppler'>('ultrassom');

  const MAIN_TABS = [
    { 
      id: 'ultrassom', 
      label: '1. Ultrassonografia Obstétrica', 
      desc: 'Princípios, 1º Tri (Datação, Ectópica, Mola), 2º Tri (Morfológico, Colo) e 3º Tri (Acretismo)',
      icon: Eye, 
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-600'
    },
    { 
      id: 'liquido', 
      label: '2. Avaliação de Líquido Amniótico', 
      desc: 'Maior Bolsão Vertical (MBV) vs ILA, Oligoâmnio e Polidrâmnio com Simulador',
      icon: Droplet, 
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-600'
    },
    { 
      id: 'doppler', 
      label: '3. Dopplervelocimetria (Doppler)', 
      desc: 'Artérias Uterinas, Umbilical, Cerebral Média, Ducto Venoso e Casos de Decisão',
      icon: HeartPulse, 
      color: 'text-rose-400',
      activeBg: 'bg-rose-600'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER PRINCIPAL */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <span className="p-1 rounded-md bg-cyan-950 border border-cyan-800">
                <Stethoscope size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                Ginecologia & Obstetrícia · Medicina Fetal & Diagnóstico por Imagem
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Diagnóstico por Imagem em Obstetrícia
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              "Quando solicitar, como interpretar e quando o achado muda a conduta" — Protocolo estruturado em 3 grandes eixos clínicos: <strong>Ultrassom</strong>, <strong>Avaliação do Líquido Amniótico</strong> e <strong>Doppler</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
              UNIP Medicina 4º Ano
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300">
              3 Eixos Integrados
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DOS 3 GRANDES EIXOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
          {MAIN_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = mainTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMainTab(tab.id as any)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'bg-slate-800 border-cyan-500 shadow-xl shadow-cyan-950/50 scale-[1.01]'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className={`p-2 rounded-xl border ${isActive ? `${tab.activeBg} text-white border-white/20` : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-sm font-black ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {tab.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pl-1">
                  {tab.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTEÚDO DINÂMICO COM TRANSIÇÃO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mainTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {mainTab === 'ultrassom' && <USGGeralTrimesters />}
          {mainTab === 'liquido' && <USGAvaliacaoLiquido />}
          {mainTab === 'doppler' && <USGDopplerHemodinamica />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
