import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Skull, 
  Brain, 
  Thermometer, 
  Activity, 
  Flame, 
  Droplet, 
  Pill, 
  Zap, 
  HeartPulse, 
  ClipboardList, 
  Table, 
  Calculator, 
  AlertTriangle, 
  ShieldAlert, 
  TestTube, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Info,
  User,
  Crosshair,
  Stethoscope
} from 'lucide-react';

import { TOXIDROMES_DATABASE } from './components/toxisindromes/toxisindromesData';
import PatientVisualAvatar from './components/toxisindromes/PatientVisualAvatar';
import ToxidromeMatrixComparator from './components/toxisindromes/ToxidromeMatrixComparator';
import ToxicologyCalculators from './components/toxisindromes/ToxicologyCalculators';

// Navigation tabs
const TOX_NAV_ITEMS = [
  { id: 'colinergica', label: 'Colinérgica', icon: Droplet, color: 'text-emerald-400', border: 'border-emerald-500/40', badge: 'Chumbinho / Organofosforados' },
  { id: 'anticolinergica', label: 'Anticolinérgica', icon: Flame, color: 'text-rose-400', border: 'border-rose-500/40', badge: 'Beladona / Anti-histamínicos' },
  { id: 'opioide', label: 'Opioide', icon: Pill, color: 'text-blue-400', border: 'border-blue-500/40', badge: 'Morfina / Fentanil / Metadona' },
  { id: 'simpatomimetica', label: 'Simpatomimética', icon: Zap, color: 'text-amber-400', border: 'border-amber-500/40', badge: 'Cocaína / Anfetaminas' },
  { id: 'sedativo', label: 'Sedativo-Hipnótica', icon: Skull, color: 'text-slate-300', border: 'border-slate-500/40', badge: 'Benzodiazepínicos / Álcool' },
  { id: 'serotoninergica', label: 'Serotoninérgica', icon: Brain, color: 'text-indigo-400', border: 'border-indigo-500/40', badge: 'ISRS / Tramadol / Linezolida' },
  { id: 'neuroleptica', label: 'Neuroléptica Maligna', icon: Thermometer, color: 'text-orange-400', border: 'border-orange-500/40', badge: 'Haloperidol / Antipsicóticos' },
  { id: 'extrapiramidal', label: 'Distonia Aguda', icon: Activity, color: 'text-lime-400', border: 'border-lime-500/40', badge: 'Plasil / Metoclopramida' },
  { id: 'triciclicos', label: 'Tricíclicos / QRS', icon: HeartPulse, color: 'text-fuchsia-400', border: 'border-fuchsia-500/40', badge: 'Amitriptilina / Nav1.5' },
  { id: 'medidas', label: 'Medidas Gerais', icon: ClipboardList, color: 'text-teal-400', border: 'border-teal-500/40', badge: 'ABCDE & Descontaminação' },
  { id: 'matriz', label: 'Matriz Comparativa', icon: Table, color: 'text-sky-400', border: 'border-sky-500/40', badge: 'Duelo Clínico & Diagnóstico Diferencial' },
  { id: 'calculadoras', label: 'Calculadoras & Decisores', icon: Calculator, color: 'text-purple-400', border: 'border-purple-500/40', badge: 'Hiato Osmolar, QTc, SLIME, ABCD' },
];

export default function IntoxicationsMain() {
  const [activeTab, setActiveTab] = useState<string>('colinergica');

  const activeToxidrome = TOXIDROMES_DATABASE[activeTab];

  return (
    <div className="w-full flex flex-col gap-6 font-sans max-w-7xl mx-auto">
      
      {/* TOP HEADER & MODULE OVERVIEW CARD */}
      <div className="bg-slate-950 border border-slate-800 p-5 sm:p-7 rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 blur-[90px] pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Skull className="w-4 h-4" />
              <span>Toxicologia Clínica & Emergências Exógenas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Atlas Clínico Profundo das Toxidromes
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Modelos visuais interativos de exame físico de cada paciente intoxicado, pupilometria em tempo real, telemetria de leito de UTI com ECG patognomônico, fisiopatologia celular, protocolos de antídotos e armadilhas proibitivas.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-2xl self-start md:self-auto shrink-0 shadow-md">
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <div className="text-[11px] font-mono">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Base de Dados</span>
              <span className="text-white font-bold">9 Toxidromes + Decisores</span>
            </div>
          </div>
        </div>

        {/* TOXIDROME SELECTOR HORIZONTAL SCROLLER */}
        <div className="pt-4 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            <span>Selecione a Toxidrome ou Ferramenta Interativa:</span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">Navegação Clínica Rápida</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {TOX_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? `bg-slate-900 text-white ${item.border} shadow-lg scale-[1.02] ring-1 ring-white/10`
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? item.color : 'opacity-70'}`} />
                  <span className="text-xs font-bold tracking-tight leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[9px] text-slate-400 line-clamp-1 opacity-80 font-mono">
                    {item.badge.split('/')[0]}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: SPECIFIC TOXIDROME (With Interactive Visual Patient Avatar, Vitals, Patho, Antidote, Traps & Differentials) */}
        {activeToxidrome && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* 1. VISUAL PATIENT AVATAR & BEDSIDE TELEMETRY MONITOR */}
            <PatientVisualAvatar toxidrome={activeToxidrome} />

            {/* 2. DEEP PATHOPHYSIOLOGY & DIAGNOSTIC CRITERIA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Cellular Pathophysiology */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Activity className={`w-5 h-5 ${activeToxidrome.accentColor}`} />
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Fisiopatologia Celular & Receptores Envolvidos
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {activeToxidrome.pathophysiology.molecularMechanism}
                </p>

                {/* Offenders Chips */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Principais Agentes Ofensores Cadastrados:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeToxidrome.offenders.map((agent, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 font-semibold">
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Physiological Points */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Mecanismos Moleculares & Farmacocinética Chave:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {activeToxidrome.pathophysiology.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeToxidrome.accentColor}`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  <strong className="text-slate-300">Metabolismo & Meia-Vida:</strong> {activeToxidrome.pathophysiology.metabolismAndHalfLife}
                </div>
              </div>

              {/* Right Column: Formal Diagnostic Criteria Score */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Critérios Diagnósticos Formais
                  </h3>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-indigo-300 tracking-wider">
                    {activeToxidrome.diagnosticCriteria.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {activeToxidrome.diagnosticCriteria.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {activeToxidrome.diagnosticCriteria.items.map((crit, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium flex items-start gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>

                {activeToxidrome.summaryMnemonicDescription && (
                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/50 text-xs text-indigo-200 space-y-1">
                    <span className="font-black uppercase tracking-wider text-[10px] text-indigo-400 block">
                      Regra de Ouro Mnemônica:
                    </span>
                    <p className="leading-relaxed">{activeToxidrome.summaryMnemonicDescription}</p>
                  </div>
                )}
              </div>

            </div>

            {/* 3. ANTIDOTE PROTOCOL & CLINICAL CONDUCT */}
            <div className="bg-slate-950 border-2 border-emerald-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Protocolo de Reversão Farmacológica</span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Antídoto de Escolha: {activeToxidrome.antidoteProtocol.drug}
                    </h3>
                  </div>
                </div>

                {activeToxidrome.antidoteProtocol.brandName && (
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                    {activeToxidrome.antidoteProtocol.brandName}
                  </span>
                )}
              </div>

              {/* Protocol Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Dose de Ataque */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block border-b border-slate-800 pb-1.5">
                    1. Posologia de Ataque (Bolus Inicial)
                  </span>
                  <p className="text-white font-bold leading-relaxed">
                    {activeToxidrome.antidoteProtocol.attackDose}
                  </p>
                </div>

                {/* Manutenção / Titulação */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block border-b border-slate-800 pb-1.5">
                    2. Manutenção / Titulação Contínua
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activeToxidrome.antidoteProtocol.maintenanceDose}
                  </p>
                </div>

                {/* Meta Terapêutica / Endpoint */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block border-b border-emerald-900/60 pb-1.5">
                    3. Meta Terapêutica de Parada (Endpoint)
                  </span>
                  <p className="text-emerald-100 font-medium leading-relaxed">
                    {activeToxidrome.antidoteProtocol.therapeuticEndpoint}
                  </p>
                </div>

              </div>

              {/* Mecanismo de Ação do Antídoto */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Mecanismo Farmacodinâmico do Antídoto:
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {activeToxidrome.antidoteProtocol.mechanism}
                </p>
                <p className="text-[11px] text-amber-300/90 pt-1">
                  <strong>Atenção aos efeitos adversos do antídoto:</strong> {activeToxidrome.antidoteProtocol.adverseEffectsAlert}
                </p>
              </div>
            </div>

            {/* 4. BLACK-BOX PROHIBITED ACTIONS & EMERGENCY TRAPS */}
            <div className="bg-slate-950 border border-rose-900/50 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-rose-950/80 pb-3">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-rose-300">
                    Armadilhas Clínicas Fatais & Condutas Proibidas
                  </h3>
                  <p className="text-xs text-rose-200/70">
                    Erros diagnósticos e iatrogenias de alto risco que custam vidas no pronto-socorro.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeToxidrome.prohibitedTraps.map((trap, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2 text-xs flex flex-col justify-between">
                    <div>
                      <span className="font-black text-rose-400 block text-xs uppercase leading-tight mb-1">
                        🚨 {trap.trapTitle}
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {trap.explanation}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-900/60 text-[10px] text-rose-200 font-semibold leading-relaxed mt-2">
                      <strong>Consequência Fatal:</strong> {trap.consequence}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. DIFFERENTIAL DIAGNOSES */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                <TestTube className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  Diagnósticos Diferenciais Estruturados
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeToxidrome.differentials.map((diff, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2.5 flex flex-col justify-between">
                    <div>
                      <span className="font-black text-white text-xs uppercase tracking-wider block border-b border-slate-800 pb-1.5 mb-2">
                        {diff.condition}
                      </span>
                      <div className="space-y-1.5 text-[11px]">
                        <div>
                          <strong className="text-indigo-400 uppercase text-[9px] block">1ª Linha (Ouro):</strong>
                          <span className="text-slate-300">{diff.firstLineGold}</span>
                        </div>
                        <div>
                          <strong className="text-slate-400 uppercase text-[9px] block">2ª Linha (Confirmação):</strong>
                          <span className="text-slate-400">{diff.secondLineConfirm}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[10px] text-amber-200/90 leading-tight">
                      <strong>Discriminante Chave:</strong> {diff.keyDiscriminator}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* VIEW 2: MEDIDAS GERAIS & DESCONTAMINAÇÃO */}
        {activeTab === 'medidas' && (
          <motion.div
            key="medidas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-teal-400 mb-1">
                  <ClipboardList className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Protocolo de Entrada na Sala Vermelha</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Manejo Inicial & Medidas Gerais no Paciente Intoxicado
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Abordagem sistemática pelo ABCDE toxicológico, indicações estritas e contraindicações de descontaminação gástrica.
                </p>
              </div>

              {/* ABCDE Toxicológico */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-950 text-teal-300 border border-teal-800 font-mono font-black flex items-center justify-center text-xs">A</span>
                  <span className="font-bold text-white block">Via Aérea</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    IOT precoce se Glasgow &lt; 9 ou perda dos reflexos de proteção. LEMBRAR: Evitar succinilcolina em organofosforados e SNM!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-950 text-teal-300 border border-teal-800 font-mono font-black flex items-center justify-center text-xs">B</span>
                  <span className="font-bold text-white block">Ventilação</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Oxigenoterapia se SatO2 &lt; 92%. Atenção à bradipneia por opioides e broncorreia asfixiante por colinérgicos.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-950 text-teal-300 border border-teal-800 font-mono font-black flex items-center justify-center text-xs">C</span>
                  <span className="font-bold text-white block">Circulação & ECG</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    ECG de 12 derivações IMEDIATO à admissão. Avaliar alargamento do QRS (&gt; 100 ms) e prolongamento do QTc (&gt; 500 ms).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-950 text-teal-300 border border-teal-800 font-mono font-black flex items-center justify-center text-xs">D</span>
                  <span className="font-bold text-white block">Disfunção & Pupilas</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Glicemia capilar imediata (Dextro). Avaliar simetria e tamanho pupilar (miose puntiforme vs midríase reativa/paralítica).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-950 text-teal-300 border border-teal-800 font-mono font-black flex items-center justify-center text-xs">E</span>
                  <span className="font-bold text-white block">Exposição & EPI</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Despir completamente o paciente. Checar marcas de picadas/punções (track marks), transpiracão e usar EPI se suspeita de pesticida.
                  </p>
                </div>
              </div>

              {/* Descontaminação Gástrica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                
                {/* Lavagem Gástrica */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <h3 className="font-black text-white text-sm flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-sky-400" />
                    Lavagem Gástrica (Critérios Estritos)
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Janela Terapêutica:</strong> Apenas se realizada em <strong>até 1 HORA da ingestão</strong> de substância potencialmente fatal com comprimidos visíveis no estômago.
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Técnica: Sonda orogástrica de grosso calibre (36 a 40 French no adulto), decúbito lateral esquerdo com Trendelenburg. Infusão de alíquotas de 200 a 250 mL de SF morno até retorno límpido.
                  </p>
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50 text-rose-200 text-[11px] font-bold">
                    CONTRAINDICAÇÕES FORMAIS: Substâncias cáusticas (ácidos/álcalis), hidrocarbonetos voláteis, paciente sonolento sem intubação orotraqueal prévia.
                  </div>
                </div>

                {/* Carvão Ativado */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <h3 className="font-black text-white text-sm flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    Carvão Ativado (Dose Única & Doses Múltiplas)
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Dose Única:</strong> 1 g/kg (adulto: 50 a 100 g) diluído em água na proporção de 1:4 a 1:8, administrado em até 1 a 2 horas da ingestão (ou até 4h para fármacos anticolinérgicos com retardo do esvaziamento gástrico).
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    <strong>Doses Múltiplas:</strong> 25 a 50 g a cada 4 horas nas intoxicações pelo mnemônico "ABCD" (Aminofilina, Barbitúricos, Carbamazepina, Dapsona) para acelerar a depuração intestinal.
                  </p>
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/50 text-amber-200 text-[11px] font-bold">
                    NÃO ADSORVE: Metais pesados (Ferro, Chumbo), Lítio, Potássio, Álcoois (Etanol, Metanol, Etilenoglicol) e substâncias cáusticas.
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* VIEW 3: MATRIZ COMPARATIVA (DUELO & TABELA DE DIFERENCIAÇÃO) */}
        {activeTab === 'matriz' && (
          <motion.div
            key="matriz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            <ToxidromeMatrixComparator />
          </motion.div>
        )}

        {/* VIEW 4: CALCULADORAS & DECISORES */}
        {activeTab === 'calculadoras' && (
          <motion.div
            key="calculadoras"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            <ToxicologyCalculators />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
