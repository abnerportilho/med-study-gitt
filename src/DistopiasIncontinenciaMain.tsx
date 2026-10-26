import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Droplet, Award, ShieldCheck, Stethoscope, 
  Layers, Scissors, Sparkles, Activity, HelpCircle, FileText
} from 'lucide-react';

import UroAnatomiaFisiopato from './components/uroginecologia/UroAnatomiaFisiopato';
import UroProlapsosBadenPOPQ from './components/uroginecologia/UroProlapsosBadenPOPQ';
import UroProlapsoTratamento from './components/uroginecologia/UroProlapsoTratamento';
import UroIncontinenciaDiagnostico from './components/uroginecologia/UroIncontinenciaDiagnostico';
import UroIncontinenciaClinico from './components/uroginecologia/UroIncontinenciaClinico';
import UroIncontinenciaCirurgico from './components/uroginecologia/UroIncontinenciaCirurgico';
import UroCasoClinicoInterativo from './components/uroginecologia/UroCasoClinicoInterativo';

export default function DistopiasIncontinenciaMain() {
  const [mainSection, setMainSection] = useState<'prolapso' | 'incontinencia' | 'casos'>('prolapso');
  
  // Sub-abas específicas de cada grande assunto (igual padrão TPP vs Amniorrexe)
  const [prolapsoSubTab, setProlapsoSubTab] = useState<'anatomia' | 'popq' | 'tratamento'>('anatomia');
  const [incontinenciaSubTab, setIncontinenciaSubTab] = useState<'diagnostico' | 'clinico' | 'cirurgico'>('diagnostico');

  const SECTIONS = [
    {
      id: 'prolapso',
      label: '1. Distopias Genitais (Prolapso Genital)',
      desc: 'Níveis de DeLancey, Teoria Integral de Petros, Denervação Pudenda, Baden-Walker, POP-Q Interativo, Pessários e Cirurgia Sítio-Específica',
      icon: Compass,
      color: 'text-amber-400',
      activeBg: 'bg-amber-600',
      activeBorder: 'border-amber-500',
      shadowColor: 'shadow-amber-950/40'
    },
    {
      id: 'incontinencia',
      label: '2. Incontinência Urinária Feminina',
      desc: 'IUE vs Urgência vs Mista, Avaliação, Urodinâmica com Simulador de VLPP, TMAP (Kegel), Biofeedback, Antimuscarínicos, Mirabegrona e Slings (TVT/TOT)',
      icon: Droplet,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-600',
      activeBorder: 'border-cyan-500',
      shadowColor: 'shadow-cyan-950/40'
    },
    {
      id: 'casos',
      label: '3. Caso Clínico & Questões de Prova',
      desc: 'Caso MHT da aula magna do Prof. Dr. André Bernardo passo a passo, conduta integrada e questões de Residência Médica (TEGO) comentadas',
      icon: Award,
      color: 'text-rose-400',
      activeBg: 'bg-rose-600',
      activeBorder: 'border-rose-500',
      shadowColor: 'shadow-rose-950/40'
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
                <ShieldCheck size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                Ginecologia & Uroginecologia · Protocolos FEBRASGO & ICS
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Distopias Genitais e Incontinência Urinária
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Módulo integrado e bifurcado em dois grandes eixos clínicos (<strong>Prolapso de Órgãos Pélvicos</strong> e <strong>Incontinência Urinária</strong>) baseado na aula magna do <strong>Prof. Dr. André Bernardo</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
              🎓 Prof. Dr. André Bernardo
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300">
              2 Eixos Clínicos + Casos
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DOS GRANDES EIXOS (3 CARDS LADO A LADO - PADRÃO TPP/AMNIORREXE) */}
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
                    ? `bg-slate-800 ${tab.activeBorder} shadow-xl ${tab.shadowColor} scale-[1.01]`
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

      {/* SUB-NAVEGAÇÃO ESPECÍFICA QUANDO PROLAPSO GENITAL SELECIONADO */}
      {mainSection === 'prolapso' && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setProlapsoSubTab('anatomia')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              prolapsoSubTab === 'anatomia'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={15} />
            <span>1. Anatomia, DeLancey & Fisiopatologia</span>
          </button>

          <button
            onClick={() => setProlapsoSubTab('popq')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              prolapsoSubTab === 'popq'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass size={15} />
            <span>2. Baden-Walker & POP-Q Interativo</span>
          </button>

          <button
            onClick={() => setProlapsoSubTab('tratamento')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              prolapsoSubTab === 'tratamento'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scissors size={15} />
            <span>3. Tratamento: Pessários & Cirurgias Sítio-Específicas</span>
          </button>
        </div>
      )}

      {/* SUB-NAVEGAÇÃO ESPECÍFICA QUANDO INCONTINÊNCIA URINÁRIA SELECIONADA */}
      {mainSection === 'incontinencia' && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setIncontinenciaSubTab('diagnostico')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              incontinenciaSubTab === 'diagnostico'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Droplet size={15} />
            <span>1. Tipos, Avaliação & Diagnóstico Urodinâmico (VLPP)</span>
          </button>

          <button
            onClick={() => setIncontinenciaSubTab('clinico')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              incontinenciaSubTab === 'clinico'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={15} />
            <span>2. Tratamento Clínico: TMAP, Fisioterapia & Drogas</span>
          </button>

          <button
            onClick={() => setIncontinenciaSubTab('cirurgico')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              incontinenciaSubTab === 'cirurgico'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scissors size={15} />
            <span>3. Tratamento Cirúrgico: Slings (TVT/TOT) & Burch</span>
          </button>
        </div>
      )}

      {/* CONTEÚDO ATIVO COM TRANSIÇÃO ANIMADA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mainSection}-${mainSection === 'prolapso' ? prolapsoSubTab : mainSection === 'incontinencia' ? incontinenciaSubTab : 'casos'}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {/* EIXO 1: PROLAPSO GENITAL */}
          {mainSection === 'prolapso' && (
            <>
              {prolapsoSubTab === 'anatomia' && <UroAnatomiaFisiopato />}
              {prolapsoSubTab === 'popq' && <UroProlapsosBadenPOPQ />}
              {prolapsoSubTab === 'tratamento' && <UroProlapsoTratamento />}
            </>
          )}

          {/* EIXO 2: INCONTINÊNCIA URINÁRIA */}
          {mainSection === 'incontinencia' && (
            <>
              {incontinenciaSubTab === 'diagnostico' && <UroIncontinenciaDiagnostico />}
              {incontinenciaSubTab === 'clinico' && <UroIncontinenciaClinico />}
              {incontinenciaSubTab === 'cirurgico' && <UroIncontinenciaCirurgico />}
            </>
          )}

          {/* EIXO 3: CASO CLÍNICO & QUESTÕES */}
          {mainSection === 'casos' && (
            <UroCasoClinicoInterativo />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
