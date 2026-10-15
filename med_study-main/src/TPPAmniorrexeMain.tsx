import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Droplet, Award, Stethoscope, Sparkles,
  Layers, Pill, Clock, ArrowRightLeft, ShieldAlert
} from 'lucide-react';

import TPPFisiopatologiaDiagnostico from './components/tpp_amniorrexe/TPPFisiopatologiaDiagnostico';
import TPPCondutaTratamento from './components/tpp_amniorrexe/TPPCondutaTratamento';
import RPMAvaliacaoDiagnostico from './components/tpp_amniorrexe/RPMAvaliacaoDiagnostico';
import RPMCondutaEsquemas from './components/tpp_amniorrexe/RPMCondutaEsquemas';
import TPPAmniorrexeSintese from './components/tpp_amniorrexe/TPPAmniorrexeSintese';

export default function TPPAmniorrexeMain() {
  const [mainSection, setMainSection] = useState<'tpp' | 'rpm' | 'sintese'>('tpp');
  const [tppSubTab, setTppSubTab] = useState<'diagnostico' | 'conduta'>('diagnostico');
  const [rpmSubTab, setRpmSubTab] = useState<'diagnostico' | 'conduta'>('diagnostico');

  const SECTIONS = [
    {
      id: 'tpp',
      label: '1. Trabalho de Parto Prematuro (TPP)',
      desc: 'Bolsa íntegra, as 4 vias, fatores de risco, sludge, contrações vs colo, USG-TV, fFN e tocólise',
      icon: Activity,
      color: 'text-amber-400',
      activeBg: 'bg-amber-600'
    },
    {
      id: 'rpm',
      label: '2. Amniorrexe Prematura (RPM / RPMO)',
      desc: 'Bolsa rota, exame especular (sem toque!), nitrazina, samambaia, corioamnionite e os 3 esquemas de ATB',
      icon: Droplet,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-600'
    },
    {
      id: 'sintese',
      label: '3. Síntese & Matriz Comparativa',
      desc: 'Cinco mensagens para levar da Dra. Flávia Ximenes e tabela comparativa rápida lado a lado',
      icon: Award,
      color: 'text-indigo-400',
      activeBg: 'bg-indigo-600'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER PRINCIPAL */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <span className="p-1 rounded-md bg-amber-950 border border-amber-800">
                <Stethoscope size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                Ginecologia & Obstetrícia · Protocolos FEBRASGO & ACOG
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Trabalho de Parto Prematuro e Amniorrexe (RPM)
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Fisiopatologia, diagnóstico estruturado, condutas terapêuticas escalonadas por idade gestacional e esquemas antimicrobianos baseados nas diretrizes da <strong>Dra. Flávia Ximenes (UNIP Medicina)</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
              UNIP Medicina 4º Ano
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800 text-xs font-bold text-amber-300">
              FEBRASGO 29/2018 & 45/2021
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DOS GRANDES EIXOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
          {SECTIONS.map(tab => {
            const Icon = tab.icon;
            const isActive = mainSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMainSection(tab.id as any)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'bg-slate-800 border-amber-500 shadow-xl shadow-amber-950/40 scale-[1.01]'
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

      {/* SUB-NAVEGAÇÃO ESPECÍFICA QUANDO TPP SELECIONADO */}
      {mainSection === 'tpp' && (
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setTppSubTab('diagnostico')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tppSubTab === 'diagnostico' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity size={16} />
            <span>Fisiopatologia, Sludge & Diagnóstico</span>
          </button>
          <button
            onClick={() => setTppSubTab('conduta')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tppSubTab === 'conduta' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Pill size={16} />
            <span>Conduta, Tocólise, Corticoide & MgSO4</span>
          </button>
        </div>
      )}

      {/* SUB-NAVEGAÇÃO ESPECÍFICA QUANDO RPM SELECIONADO */}
      {mainSection === 'rpm' && (
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setRpmSubTab('diagnostico')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              rpmSubTab === 'diagnostico' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Droplet size={16} />
            <span>Definições, Especular & Corioamnionite</span>
          </button>
          <button
            onClick={() => setRpmSubTab('conduta')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              rpmSubTab === 'conduta' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Pill size={16} />
            <span>Conduta por IG & Os 3 Esquemas de ATB</span>
          </button>
        </div>
      )}

      {/* CONTEÚDO ATIVO COM TRANSIÇÃO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mainSection}-${mainSection === 'tpp' ? tppSubTab : mainSection === 'rpm' ? rpmSubTab : 'sintese'}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16 }}
        >
          {mainSection === 'tpp' && (
            tppSubTab === 'diagnostico' ? <TPPFisiopatologiaDiagnostico /> : <TPPCondutaTratamento />
          )}

          {mainSection === 'rpm' && (
            rpmSubTab === 'diagnostico' ? <RPMAvaliacaoDiagnostico /> : <RPMCondutaEsquemas />
          )}

          {mainSection === 'sintese' && (
            <TPPAmniorrexeSintese />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
