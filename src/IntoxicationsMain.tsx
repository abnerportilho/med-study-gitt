import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, Activity, Skull, TestTube,
  HeartPulse, Pill, Brain,
  Droplet, Zap, Flame, AlertCircle, 
  Crosshair, Ear, User, ArrowRight, ArrowLeft, Eye, Wind, ClipboardList, Thermometer
} from 'lucide-react';

const toxidromesList = [
  { id: 'medidas', label: 'Medidas Gerais', icon: ClipboardList, color: 'text-slate-200', bg: 'bg-slate-800', border: 'border-slate-700', activeBorder: 'border-slate-400', shadow: 'shadow-[0_0_15px_rgba(255,255,255,0.2)]' },
  { id: 'serotoninergica', label: 'Serotoninérgica', icon: Brain, color: 'text-indigo-400', bg: 'bg-indigo-950/40', border: 'border-indigo-900/50', activeBorder: 'border-indigo-500', shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.2)]' },
  { id: 'neuroleptica', label: 'Neuroléptica', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-950/40', border: 'border-orange-900/50', activeBorder: 'border-orange-500', shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]' },
  { id: 'extrapiramidal', label: 'Extrapirami...', icon: Activity, color: 'text-lime-400', bg: 'bg-lime-950/40', border: 'border-lime-900/50', activeBorder: 'border-lime-500', shadow: 'shadow-[0_0_15px_rgba(163,230,53,0.2)]' },
  { id: 'anticolinergica', label: 'Anticolinérgica', icon: Flame, color: 'text-rose-500', bg: 'bg-rose-950/40', border: 'border-rose-900/50', activeBorder: 'border-rose-500', shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]' },
  { id: 'colinergica', label: 'Colinérgica', icon: Droplet, color: 'text-emerald-500', bg: 'bg-emerald-950/40', border: 'border-emerald-900/50', activeBorder: 'border-emerald-500', shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
  { id: 'opioide', label: 'Opioide', icon: Pill, color: 'text-blue-400', bg: 'bg-blue-950/40', border: 'border-blue-900/50', activeBorder: 'border-blue-500', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' },
  { id: 'simpatomimetica', label: 'Simpatomimética', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-950/40', border: 'border-amber-900/50', activeBorder: 'border-amber-500', shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]' },
  { id: 'sedativo', label: 'Sedativo', icon: Skull, color: 'text-slate-300', bg: 'bg-slate-800/60', border: 'border-slate-700', activeBorder: 'border-slate-400', shadow: 'shadow-[0_0_15px_rgba(148,163,184,0.2)]' },
  { id: 'triciclicos', label: 'Tricíclicos/QT', icon: HeartPulse, color: 'text-fuchsia-500', bg: 'bg-fuchsia-950/40', border: 'border-fuchsia-900/50', activeBorder: 'border-fuchsia-500', shadow: 'shadow-[0_0_15px_rgba(217,70,239,0.2)]' }
];

const differentialDiagnosesData: Record<string, { disease: string; firstLine: string; secondLine: string;}[]> = {
  serotoninergica: [
    { disease: 'Sepse', firstLine: 'Hemoculturas e Lactato Arterial', secondLine: 'Procalcitonina / PCR' },
    { disease: 'Abstinência alcoólica ou BZD', firstLine: 'Anamnese focada (Tempo do último uso)', secondLine: 'Exame Toxicológico de Urina' },
    { disease: 'Tireotoxicose', firstLine: 'TSH (suprimido) e T4L/T3 (elevados)', secondLine: 'USG de Tireoide com Doppler' }
  ],
  neuroleptica: [
    { disease: 'Catatonia Maligna', firstLine: 'Prova Terapêutica (Lorazepam EV)', secondLine: 'Eletroencefalograma (EEG)' },
    { disease: 'Encefalite (Viral/Autoimune)', firstLine: 'Punção Lombar (Celularidade/Painel Viral)', secondLine: 'Ressonância Magnética de Crânio' },
    { disease: 'Status Epilepticus Não-Convulsivo', firstLine: 'Eletroencefalograma (EEG) Contínuo', secondLine: 'TC/RNM de Crânio' },
    { disease: 'Insolação (Heat Stroke)', firstLine: 'Temperatura Central (>40°C) + Anamnese', secondLine: 'Gasometria Arterial completa' }
  ],
  anticolinergica: [
    { disease: 'Psicose Aguda Primária', firstLine: 'Avaliação Psiquiátrica (ausência de sinais sistêmicos)', secondLine: 'Exame Toxicológico de Urina' },
    { disease: 'Botulismo', firstLine: 'Eletroneuromiografia (ENMG)', secondLine: 'Pesquisa de Toxina Botulínica' },
    { disease: 'Infarto de Tronco Cerebral', firstLine: 'Ressonância Magnética (Difusão)', secondLine: 'Angio-TC de Vasos Cervicais' }
  ],
  extrapiramidal: [
    { disease: 'Tétano', firstLine: 'Clínica (Trismo profundo com lucidez preservada)', secondLine: 'Teste do Abaixador de Língua' },
    { disease: 'Meningite', firstLine: 'Punção Lombar (LCR e Cultura)', secondLine: 'Hemoculturas imediatas' },
    { disease: 'Hipocalcemia', firstLine: 'Cálcio Iônico Sérico', secondLine: 'ECG (procurar QT longo)' }
  ],
  medidas: [],
  disautonomia: [
    { disease: 'Feocromocitoma', firstLine: 'Metanefrinas Plasmáticas Livres / Urinárias', secondLine: 'Tomografia/RNM de Abdome' },
    { disease: 'Síndrome de Guillain-Barré', firstLine: 'Eletroneuromiografia (ENMG)', secondLine: 'Punção Lombar (Dissociação proteíno-citológica)' },
    { disease: 'Porfiria Aguda Intermitente', firstLine: 'Porfobilinogênio (PBG) e ALA na urina 24h', secondLine: 'Testes Genéticos' },
    { disease: 'Lesão Medular Aguda', firstLine: 'Ressonância Magnética de Coluna', secondLine: 'Tomografia de Coluna' }
  ],
  colinergica: [
    { disease: 'Edema Agudo de Pulmão', firstLine: 'Ecocardiograma e Raio-X de Tórax', secondLine: 'BNP Sérico' },
    { disease: 'Asthma/DPOC Exacerbado', firstLine: 'Avaliação Clínica e Espirometria', secondLine: 'Gasometria Arterial' }
  ],
  opioide: [
    { disease: 'Hemorragia Subaracnoide (HSA)', firstLine: 'TC de Crânio sem contraste', secondLine: 'Punção Lombar (Xantocromia)' },
    { disease: 'Intoxicação por Clonidina', firstLine: 'Prova parcial com Naloxona (baixa resposta)', secondLine: 'Eletrocardiograma (bradicardia)' }
  ],
  simpatomimetica: [
    { disease: 'Tempestade Tireoidiana', firstLine: 'TSH suprimido / T4L alto', secondLine: 'Score de Burch-Wartofsky' },
    { disease: 'Abstinência (Álcool/Opioide)', firstLine: 'Anamnese de privação química / CIWA-Ar', secondLine: 'Eletrocardiograma' }
  ],
  sedativo: [
    { disease: 'Acidente Vascular Cerebral (AVC)', firstLine: 'TC de Crânio Imediata', secondLine: 'RNM de Crânio' },
    { disease: 'Hipoglicemia Severa', firstLine: 'Glicemia Capilar Imediata (Dextro)', secondLine: 'Glicemia Plasmática' },
    { disease: 'Encefalopatia (Hepática/Urêmica)', firstLine: 'Amônia, Ureia e Creatinina', secondLine: 'USG de Abdome' }
  ],
  triciclicos: [
    { disease: 'Infarto Agudo do Miocárdio', firstLine: 'ECG seriado 12 derivações + Troponina', secondLine: 'Cateterismo Cardíaco' },
    { disease: 'Síndrome do QT Longo Congênito', firstLine: 'ECG + Histórico Familiar (Morte Súbita)', secondLine: 'Painel Genético (KCNQ1, etc)' },
    { disease: 'Hipercalemia Grave', firstLine: 'Potássio Sérico Imediato', secondLine: 'Gasometria Arterial' }
  ]
};

const diffDiagTheme: Record<string, { text: string; bg: string; border: string; borderSide: string }> = {
  serotoninergica: { text: 'text-indigo-400', bg: 'bg-indigo-950/20', border: 'border-indigo-900/40', borderSide: 'border-indigo-500' },
  neuroleptica: { text: 'text-orange-400', bg: 'bg-orange-950/20', border: 'border-orange-900/40', borderSide: 'border-orange-500' },
  anticolinergica: { text: 'text-rose-400', bg: 'bg-rose-950/20', border: 'border-rose-900/40', borderSide: 'border-rose-500' },
  extrapiramidal: { text: 'text-lime-400', bg: 'bg-lime-950/20', border: 'border-lime-900/40', borderSide: 'border-lime-500' },
  disautonomia: { text: 'text-orange-400', bg: 'bg-orange-950/20', border: 'border-orange-900/40', borderSide: 'border-orange-500' },
  colinergica: { text: 'text-emerald-400', bg: 'bg-emerald-950/20', border: 'border-emerald-900/40', borderSide: 'border-emerald-500' },
  opioide: { text: 'text-blue-400', bg: 'bg-blue-950/20', border: 'border-blue-900/40', borderSide: 'border-blue-500' },
  simpatomimetica: { text: 'text-amber-400', bg: 'bg-amber-950/20', border: 'border-amber-900/40', borderSide: 'border-amber-500' },
  sedativo: { text: 'text-slate-300', bg: 'bg-slate-800/20', border: 'border-slate-700/40', borderSide: 'border-slate-500' },
  triciclicos: { text: 'text-fuchsia-400', bg: 'bg-fuchsia-950/20', border: 'border-fuchsia-900/40', borderSide: 'border-fuchsia-500' }
};

const DiffDiagBlock = ({ toxId }: { toxId: string }) => {
  const items = differentialDiagnosesData[toxId];
  const theme = diffDiagTheme[toxId];
  if (!items || items.length === 0 || !theme) return null;

  return (
    <div className={`mt-6 p-6 rounded-[2rem] border ${theme.bg} ${theme.border}`}>
      <h3 className={`text-sm md:text-base font-black ${theme.text} uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-2`}>
         <TestTube size={20} /> Diagnóstico Diferencial
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-full">
             <strong className="text-white text-[11px] md:text-xs uppercase tracking-widest block mb-4 border-b border-slate-800 pb-2">{item.disease}</strong>
             <div className="space-y-3 mt-auto">
                <div className={`bg-slate-950 p-3 rounded border border-slate-800 border-l-4 ${theme.borderSide}`}>
                  <strong className={`text-[9px] ${theme.text} uppercase font-black tracking-widest block mb-1 opacity-90`}>Ouro (1ª Linha)</strong>
                  <p className="text-xs text-slate-200 font-bold leading-tight">{item.firstLine}</p>
                </div>
                <div className={`bg-slate-950 p-3 rounded border border-slate-800 border-l-4 border-slate-600`}>
                  <strong className={`text-[9px] text-slate-400 uppercase font-black tracking-widest block mb-1`}>Confirmação (2ª Linha)</strong>
                  <p className="text-xs text-slate-300 leading-tight">{item.secondLine}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function IntoxicationsMain() {
  const [activeTox, setActiveTox] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Tópico Unificado Base - Referência e Seleção */}
      <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem]">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
          <Skull className="text-slate-500" size={28} /> Toxidromes: Mapa Clínico Integrado
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
           {/* Resumo de Antídotos */}
           <div className="bg-slate-900 border border-slate-800 p-5 md:p-6 rounded-2xl shadow-lg">
              <strong className="text-slate-300 text-sm block mb-5 uppercase tracking-widest flex items-center gap-2">
                 <Crosshair size={16} className="text-slate-500" /> Resumo Rápido de Antídotos
              </strong>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-[10px]">
                <div className="flex flex-col p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl">
                  <span className="text-indigo-400 uppercase tracking-widest mb-1">Serotoninérgica</span> 
                  <strong className="text-white text-xs">Ciproeptadina</strong>
                </div>
                <div className="flex flex-col p-3 bg-rose-950/20 border border-rose-900/30 rounded-xl">
                  <span className="text-rose-400 uppercase tracking-widest mb-1">Anticolinérgica</span> 
                  <strong className="text-white text-xs">Fisostigmina</strong>
                </div>
                <div className="flex flex-col p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
                  <span className="text-emerald-400 uppercase tracking-widest mb-1">Colinérgica</span> 
                  <strong className="text-white text-xs">Atropina + PAM</strong>
                </div>
                <div className="flex flex-col p-3 bg-blue-950/20 border border-blue-900/30 rounded-xl">
                  <span className="text-blue-400 uppercase tracking-widest mb-1">Opioide</span> 
                  <strong className="text-white text-xs">Naloxona</strong>
                </div>
                <div className="flex flex-col p-3 bg-lime-950/20 border border-lime-900/30 rounded-xl">
                  <span className="text-lime-400 uppercase tracking-widest mb-1">Extrapiramidal</span> 
                  <strong className="text-white text-xs">Biperideno + BZD</strong>
                </div>
                <div className="flex flex-col p-3 bg-fuchsia-950/20 border border-fuchsia-900/30 rounded-xl">
                  <span className="text-fuchsia-400 uppercase tracking-widest mb-1">Tricíclicos</span> 
                  <strong className="text-white text-xs">Bicarbonato Na 8.4%</strong>
                </div>
              </div>
           </div>

           {/* Alertas Críticos */}
           <div className="bg-red-950/10 border border-red-900/30 p-5 md:p-6 rounded-2xl flex flex-col justify-center shadow-lg">
              <strong className="text-rose-500 text-sm block mb-5 uppercase tracking-widest flex items-center gap-2">
                 <AlertCircle size={18}/> Sinais Clínicos Proibitivos
              </strong>
              <ul className="space-y-5 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <div><strong className="text-red-400 block uppercase tracking-widest text-[10px] mb-1">Usuário crônico de BZD:</strong> Flumazenil é absolutamente contraindicado pelo risco de convulsão irresponsiva aguda.</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <div><strong className="text-red-400 block uppercase tracking-widest text-[10px] mb-1">QRS Alargado (&gt; 100ms):</strong> Fisostigmina é letal pro coração bloqueado. Sugere intoxicação por tricíclicos (Indicação de Bicarbonato).</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <div><strong className="text-red-400 block uppercase tracking-widest text-[10px] mb-1">Simpatomiméticos + Betabloqueador:</strong> Gera crise isquêmica/hipertensiva fatal por estímulo alfa sem oposição vaso dilatadora.</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <div><strong className="text-red-400 block uppercase tracking-widest text-[10px] mb-1">Trio Fatal (Mental + Rigidez + Febre):</strong> Sem medicamentos = prioridade é descartar meningocefalite e sepse central.</div>
                </li>
              </ul>
           </div>
        </div>

        {/* Unified Selector Subtopic */}
        <h4 className="text-sm md:text-base font-black text-slate-200 uppercase tracking-widest mb-6 flex items-center justify-center gap-3 border-t border-slate-800 pt-8">
          Explorar Decisão Clínica por Síndrome
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 md:gap-4">
          {toxidromesList.map(tox => {
            const Icon = tox.icon;
            const isActive = activeTox === tox.id;
            return (
              <button
                key={tox.id}
                onClick={() => setActiveTox(isActive ? null : tox.id)}
                className={`flex flex-col items-center justify-center gap-3 p-4 md:p-5 rounded-[1.5rem] border-2 transition-all transform hover:-translate-y-1 ${
                  isActive 
                    ? `${tox.bg} ${tox.activeBorder} ${tox.shadow} ${tox.color}` 
                    : `bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800/80 hover:${tox.activeBorder}`
                }`}
              >
                <Icon size={28} className={isActive ? '' : 'opacity-70'} />
                <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-center leading-tight">
                  {tox.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!activeTox && <ToxidromeHumanSummary key="summary" />}
        
        {/* TAB 2: SEROTONINERGICA */}
        {activeTox === 'serotoninergica' && (
          <motion.div key="serotoninergica" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            
            <SpecificToxidromeHuman
              title="Síndrome Serotoninérgica"
              colorText="text-indigo-400"
              glowColor="bg-indigo-500"
              brain="Agitação, Ansiedade, Confusão"
              eye="Midríase, Clônus Ocular"
              skin="Diaforese profunda, Hipertermia extrema"
              heart="Taquicardia, Hipertensão"
              muscle="CLÔNUS (Patognomônico), Hiperreflexia, Tremores"
            />
            
            <div className="grid md:grid-cols-[1fr_minmax(300px,380px)] gap-6 items-start">
              <div className="bg-indigo-950/20 border border-indigo-900/40 p-6 rounded-[2rem] h-full">
                <h3 className="text-xl font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Brain /> Fisiopatologia & Causas
                </h3>
                <p className="text-xs text-indigo-200/80 leading-relaxed mb-6">
                  Excesso de serotonina na fenda sináptica por inibição de recaptação, aumento de liberação ou inibição do metabolismo. Inicia-se de <strong>forma aguda (em até 24h)</strong> após introdução ou aumento de dose.
                </p>
                
                <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-3">Agentes Ofensores</h4>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-300">
                  <span className="bg-indigo-950 border border-indigo-900/60 px-3 py-1.5 rounded-xl">ISRS e IRSN</span>
                  <span className="bg-indigo-950 border border-indigo-900/60 px-3 py-1.5 rounded-xl">IMAOs (Linezolida)</span>
                  <span className="bg-indigo-950 border border-indigo-900/60 px-3 py-1.5 rounded-xl">Triptanos</span>
                  <span className="bg-indigo-950 border border-indigo-900/60 px-3 py-1.5 rounded-xl">Tramadol</span>
                  <span className="bg-indigo-950 border border-indigo-900/60 px-3 py-1.5 rounded-xl">MDMA / Cocaína</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity className="text-indigo-500" /> ATríade Diagnóstica
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-900/40">
                    <strong className="text-indigo-400 text-xs block mb-1">1. Alt. Neurológicas</strong>
                    <p className="text-xs text-slate-400 leading-relaxed">Agitação, confusão, delírio.</p>
                  </div>
                  <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-900/40">
                    <strong className="text-indigo-400 text-xs block mb-1">2. Alt. Autonômicas</strong>
                    <p className="text-xs text-slate-400 leading-relaxed">Hipertermia severa, diaforese (suor profuso), taquicardia, diarreia.</p>
                  </div>
                  <div className="p-4 bg-indigo-600/20 rounded-xl border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] relative overflow-hidden">
                    <strong className="text-indigo-300 text-xs block mb-1">3. Alt. Neuromusculares</strong>
                    <p className="text-xs text-white font-bold leading-relaxed relative z-10">
                      CLÔNUS (sinal cardinal patognomônico, freq. ocular ou nos membros inferiores), hiperreflexia, tremores e rigidez nas formas graves.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldAlert className="text-slate-500" /> Abordagem e Conduta
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 block border-b border-slate-800 pb-2">Passo 1</span>
                  <strong className="text-white text-sm block mb-2">Suporte & Suspensão</strong>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Suspender drogas serotoninérgicas imediatamente. Controle inicial de agitação com Benzodiazepínicos (Diazepam 10mg EV). <span className="text-indigo-400 font-bold">Evitar contenção física</span>, pois o combate contra as travas quebra o músculo e piora hipertermia isotérmica mortal.
                  </p>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3"><Pill className="text-indigo-900" size={32} /></div>
                  <span className="text-[10px] text-indigo-500 uppercase font-black tracking-widest mb-2 block border-b border-indigo-900/30 pb-2 flex justify-between">Passo 2 <span className="text-white rounded bg-indigo-600 px-1.5">Antídoto</span></span>
                  <strong className="text-white text-sm block mb-2">Ciproeptadina</strong>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">Antagonista 5-HT2A. Reservada para não respondedores.</p>
                  <div className="bg-slate-950 p-2 rounded text-[10px] font-mono text-indigo-300">Dose VO/SNG: 12mg inicial.<br/>Seguido de 2mg/2h PRN.</div>
                </div>

                <div className="bg-red-950/20 border border-red-900/40 p-5 rounded-2xl">
                  <span className="text-[10px] text-rose-500 uppercase font-black tracking-widest mb-2 block border-b border-red-900/40 pb-2">Passo 3 (Pacientes Graves)</span>
                  <strong className="text-white text-sm block mb-2">Hipertermia + Rigidez</strong>
                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    Temperatura &gt; 41°C com rigidez em tábua indica altíssima letalidade (CIVD / Rabdomiólise).
                  </p>
                  <p className="text-[10px] bg-red-900/50 text-white font-bold p-2 mt-2 rounded">Conduta: IOT Rápida + Bloqueador Neuromuscular não-despolarizante (Vecurônio) + Resfriamento externo agressivo.</p>
                </div>
              </div>
            </div>
            <DiffDiagBlock toxId="serotoninergica" />
          </motion.div>
        )}

        {/* TAB 3: ANTICOLINERGICA */}
        {activeTox === 'anticolinergica' && (
          <motion.div key="anticolinergica" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            
            <SpecificToxidromeHuman
              title="Síndrome Anticolinérgica"
              colorText="text-rose-500"
              glowColor="bg-rose-500"
              brain="Delirium (Catar insetos), Alucinações, Agitação"
              eye="Midríase máxima (BLIND)"
              skin="Pele Seca, Vermelha e Quente (NÃO transpira)"
              heart="Taquicardia Sinusal (FAST)"
              muscle="Retenção Urinária e Íleo Paralítico (FULL)"
            />

            <div className="grid md:grid-cols-[1fr_minmax(300px,400px)] gap-6 items-start">
              
              <div className="bg-rose-950/10 border border-rose-900/20 p-6 rounded-[2rem] h-full">
                <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Flame /> Anticolinérgica: The "Dry" Crisis
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex bg-rose-950/30 p-3 rounded-xl border border-rose-900/40 gap-3">
                     <span className="w-16 text-xs font-black text-rose-400 shrink-0">HOT</span>
                     <span className="text-xs text-rose-200">Hipertermia central extrema (a pele é incapaz de suar para dissipar calor).</span>
                  </div>
                  <div className="flex bg-rose-950/30 p-3 rounded-xl border border-rose-900/40 gap-3 shadow-[inset_4px_0_0_rgba(244,63,94,1)]">
                     <span className="w-16 text-xs font-black text-rose-400 shrink-0">DRY</span>
                     <span className="text-xs text-white font-bold">O Discriminante Ouro! Mucosas trincadas, saliva ausente. A pele é seca, ao invés do paciente suado da simpatomimética.</span>
                  </div>
                  <div className="flex bg-rose-950/30 p-3 rounded-xl border border-rose-900/40 gap-3">
                     <span className="w-16 text-xs font-black text-rose-400 shrink-0">RED</span>
                     <span className="text-xs text-rose-200">Flushing facial por vasodilatação compensatória periférica.</span>
                  </div>
                  <div className="flex bg-rose-950/30 p-3 rounded-xl border border-rose-900/40 gap-3">
                     <span className="w-16 text-xs font-black text-rose-400 shrink-0">MAD</span>
                     <span className="text-xs text-rose-200">Agitação psicomotora violenta, Delirium florido (ex: catar insetos invisíveis).</span>
                  </div>
                  <div className="flex bg-rose-950/30 p-3 rounded-xl border border-rose-900/40 gap-3">
                     <span className="w-16 text-xs font-black text-rose-400 shrink-0">BLIND</span>
                     <span className="text-xs text-rose-200">Pupilas em Midríase máxima. Dificuldade de acomodação.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                    <strong className="text-slate-300 text-[10px] font-black uppercase tracking-widest block mb-3">Agentes Comuns</strong>
                    <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-400">
                      <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded">Anti-histamínicos</span>
                      <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded">Antipsicóticos</span>
                      <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded">Trombeteiro/Beladona</span>
                      <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded">Tricíclicos</span>
                      <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded">Biperideno</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex-1">
                    <strong className="text-white text-sm block mb-3 items-center flex gap-2"><TestTube size={16} className="text-rose-500" /> Conduta Clínica</strong>
                    <ul className="space-y-3 text-xs text-slate-400 leading-relaxed">
                      <li><strong className="text-white block">1. Suporte e Agitação</strong> Cama grau 30, ambiente calmo, sonda vesical (retenção de urina é regra). Para controlar a agitação: <strong>Diazepam EV isolado.</strong> (Evitar Haloperidol, pois abaixa limiar convulsivo).</li>
                      <li><strong className="text-white block mt-3 text-rose-400 flex items-center gap-1"><Pill size={12}/>Fisostigmina (Antídoto)</strong> Inibidor da Acetilcolinesterase central. Útil para reverter Delirium refratário grave.</li>
                    </ul>
                    <div className="bg-red-950/40 border border-red-900/50 text-red-200 p-3 mt-4 rounded-xl text-[10px] font-bold">
                       CRÍTICO: Um QRS &gt; 100ms no ECG proíbe o uso de Fisostigmina (leva a assistolia). Na dúvida ou intoxicações por tricíclicos, não use!
                    </div>
                  </div>
              </div>
            </div>
            <DiffDiagBlock toxId="anticolinergica" />
          </motion.div>
        )}

        {/* TAB 4: COLINERGICA */}
        {activeTox === 'colinergica' && (
          <motion.div key="colinergica" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
             
             <SpecificToxidromeHuman
                title="Síndrome Colinérgica"
                colorText="text-emerald-500"
                glowColor="bg-emerald-500"
                brain="Ansiedade, Convulsões, Coma"
                eye="Miose, Lacrimejamento massivo"
                skin="Salivação e Sudorese (O paciente 'escorre')"
                heart="Bradicardia"
                lung="Broncoespasmo, Broncorreia fatal (Asfixia)"
                muscle="Fasciculações, Emese, Paralisia Flácida"
             />

             <div className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-[2rem]">
                <h3 className="text-xl font-black text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Droplet /> A Tempestade Colinérgica (Organofosforados)
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                     <p className="text-[10px] text-emerald-500 font-black tracking-widest uppercase mb-4 border-b border-emerald-900/30 pb-2">
                       Sintomas Muscarínicos (SLUDGE / DUMBELS)
                     </p>
                     <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                       O paciente está se "afogando" em suas próprias secreções. Todos os esfíncteres relaxam e glândulas esguicham.
                     </p>
                     <div className="space-y-2 text-xs text-slate-400 font-medium">
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span><strong className="text-slate-200">S</strong>alivação & Sudorese profusa</span></div>
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span><strong className="text-slate-200">L</strong>acrimejamento massivo</span></div>
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span><strong className="text-slate-200">U</strong>rina (incontinência)</span></div>
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span><strong className="text-slate-200">D</strong>iarreia e Defecação</span></div>
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span><strong className="text-slate-200">E</strong>mese (vômitos agressivos)</span></div>
                        <div className="flex justify-between mt-2"><span className="text-emerald-300 font-bold">+ Miose e Broncoespasmo Fatal</span></div>
                     </div>
                   </div>

                   <div className="flex flex-col gap-4">
                     <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex-1 relative overflow-hidden">
                       <span className="absolute bottom-0 right-0 text-7xl font-black text-slate-800/30 leading-none">N</span>
                       <p className="text-[10px] text-teal-500 font-black tracking-widest uppercase mb-2">Sintomas Nicotínicos</p>
                       <p className="text-xs text-white leading-relaxed">
                         Receptores musculares superestimulados inicialmente <strong>(Fasciculações e câibras)</strong> que terminam fadigando o diafragma de forma irreversível: <strong>Paralisia Flácida e Apneia.</strong>
                       </p>
                     </div>
                     <div className="bg-emerald-900 p-5 rounded-2xl flex-1 border border-emerald-700">
                       <p className="text-sm font-black text-white uppercase flex items-center gap-2 mb-2"><ShieldAlert size={16}/> Segurança Ocupacional</p>
                       <p className="text-[11px] text-emerald-100 font-medium leading-relaxed">
                         Contato com organofosforados na pele ou roupas contamina médicos no PS. Remover roupas, lavar corpo do doente com sabão e EPI completo para a equipe é <span className="underline">passo zero</span>.
                       </p>
                     </div>
                   </div>
                </div>
             </div>

             <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                  <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">Protocolo de Antídotos</h3>
                  <div className="space-y-4">
                     <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl relative">
                       <strong className="text-emerald-400 block text-sm mb-1 uppercase tracking-widest font-black">1. Atropina (Ao infinito)</strong>
                       <p className="text-xs text-slate-400 leading-relaxed mb-3">Reverte os efeitos muscarínicos que matam o doente asfixiado pela broncorreia. Não reverte paralisia muscular nicotínica.</p>
                       <div className="bg-slate-950 p-2 rounded text-[10px] text-emerald-200 font-mono border border-emerald-900/30">
                         Dose Inicial: 2-4 mg EV bolus.<br/>
                         Ajuste: Dobrar a dose a cada 5-10 min.<br/>
                         Meta Terapêutica (Atropinização): <strong className="text-amber-400 font-sans tracking-widest uppercase">Via Aérea Limpa de Secreções</strong>. <span className="text-slate-500">(Nunca parar baseado em tamanho da pupila ou taquicardia)</span>
                       </div>
                     </div>
                     <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl relative">
                       <strong className="text-teal-400 block text-sm mb-1 uppercase tracking-widest font-black">2. Pralidoxima (2-PAM)</strong>
                       <p className="text-xs text-slate-400 leading-relaxed mb-3">Reativador da colinesterase irreversivelmente ligada. Tem que ser feito nas primeiras horas (antes da enzima 'envelhecer'). Funciona para recuperar o músculo diafragmático nicotínico.</p>
                     </div>
                  </div>
                </div>

                <div className="bg-red-950/10 border border-red-900/30 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
                  <Flame className="text-rose-500 mb-4" size={48} />
                  <strong className="text-rose-500 uppercase tracking-widest font-black text-sm mb-2">Succinilcolina CUIDADO!</strong>
                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    Se for intubar, <strong>EVITE SUCCINILCOLINA</strong>. Ela é degradada pela pseudocolinesterase circulante, que está aniquilada pelo organofosforado. A paralisia que duraria 5 minutos vai durar 5 horas! Use Rocurônio.
                  </p>
                </div>
             </div>
             <DiffDiagBlock toxId="colinergica" />
          </motion.div>
        )}

        {/* TAB 5: OPIOIDE */}
        {activeTox === 'opioide' && (
          <motion.div key="opioide" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            
            <SpecificToxidromeHuman
              title="Intoxicação por Opioide"
              colorText="text-blue-400"
              glowColor="bg-blue-500"
              brain="Sonolência, Estupor, Coma profundo"
              eye="Miose punctiforme (Pupilas de alfinete)"
              skin="Pele fria e úmida, Hipotermia"
              heart="Bradicardia, Hipotensão"
              lung="Depressão Respiratória (FR < 12, apneia)"
              muscle="Hiporreflexia e relaxamento"
            />

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
               <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                     <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Pill /> Intoxicação por Opioides
                     </h3>
                     <p className="text-[10px] tracking-widest uppercase font-black text-amber-500 mb-6">Morfina, Fentanil, Metadona, Heroína</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-900 border-l-2 border-slate-500 p-4 rounded-r-xl">
                          <strong className="text-white block text-sm">1. Miose Punctata</strong>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">Pupilas Miótica Fixo</p>
                        </div>
                        <div className="bg-slate-900 border-l-2 border-blue-500 p-4 rounded-r-xl shadow-[inset_4px_0_0_rgba(59,130,246,0.1)]">
                          <strong className="text-blue-400 block text-sm">2. Depressão Respiratória</strong>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">FR &lt; 12 / Apneia Típica</p>
                        </div>
                        <div className="bg-slate-900 border-l-2 border-slate-500 p-4 rounded-r-xl">
                          <strong className="text-white block text-sm">3. Depressão SNC</strong>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">Sonolência e Coma</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-blue-950/10 border border-blue-900/30 p-6 rounded-[2rem]">
                 <strong className="text-blue-400 text-sm block mb-4 uppercase tracking-widest flex items-center gap-2"><Ear size={18}/> Manejo de Vias Aéreas</strong>
                 <p className="text-xs text-slate-400 leading-relaxed mb-4">
                   Em pacientes bradipneicos ou apneicos, O oxigênio isolado e a estimulação física são os primeiros passos enquanto a medicação é preparada. Comece com ventilação bolsa-válvula-máscara.
                 </p>
                 <div className="bg-blue-950/40 border border-blue-800/40 p-4 rounded-xl">
                   <strong className="text-white text-xs block mb-2 uppercase tracking-wide">Naloxona (Antagonista Puro)</strong>
                   <ul className="text-[11px] text-slate-300 space-y-2 list-disc pl-4 marker:text-blue-500">
                     <li>Dose IV: 0.4mg a 2.0mg. Titular lenta.</li>
                     <li>IN: 2-4mg spray (muito usado no pré-hospitalar).</li>
                     <li><strong>Regra de Ouro:</strong> O objetivo da Naloxona é <u>recuperar padrão respiratório livre</u>, e não despertar o paciente. Se você acorda o paciente de supetão, instala síndrome de abstinência agressiva, o paciente se remove do ventilador, agride a equipe e foge do PS.</li>
                   </ul>
                 </div>
               </div>

               <div className="bg-amber-950/10 border border-amber-900/30 p-6 rounded-[2rem]">
                 <strong className="text-amber-500 text-sm block mb-4 uppercase tracking-widest flex items-center gap-2"><HeartPulse size={18}/> Armadilhas Farmacocinéticas</strong>
                 
                 <div className="space-y-4">
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                      <strong className="text-amber-400 block text-[11px] uppercase tracking-widest mb-1">Ressedação Letal</strong>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        A meia-vida da naloxona é de apenas ~60 minutos, que é <strong>muito menor</strong> que a meia vida da heroína ou metadona. O paciente acorda, respira bem e uma hora depois no leito, quando o efeito da naloxona cai, a droga que ainda está circulante volta a deprimi-lo na cama e ele apnéia despercebido. <strong>Precisa de bomba contínua pós-reversão para opioides longos.</strong>
                      </p>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex gap-3 items-center">
                      <TestTube className="text-slate-500 shrink-0" />
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        O Metadona alonga bizarramente o intervalo QTc, promovendo arritmia Torsades de Pointes independentemente do coma.
                      </p>
                    </div>
                 </div>
               </div>
            </div>
            <DiffDiagBlock toxId="opioide" />
          </motion.div>
        )}

        {/* TAB 6: SIMPATOMIMETICA */}
        {activeTox === 'simpatomimetica' && (
          <motion.div key="simpatomimetica" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
             
             <SpecificToxidromeHuman
                title="Síndrome Simpatomimética"
                colorText="text-amber-500"
                glowColor="bg-amber-500"
                brain="Agitação severa, Psicose, Paranoia"
                eye="Midríase (Pupilas dilatadas)"
                skin="Diaforese profusa e Hipertermia (Pele MOLHADA)"
                heart="HAS Severa, Taquicardia, Coronarioespasmo"
                muscle="Tremores e Convulsões secundárias"
             />

             <div className="grid md:grid-cols-[1fr_minmax(250px,300px)] gap-6">
                <div className="bg-amber-950/20 border border-amber-900/40 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Zap /> Tempestade Adrenérgica
                   </h3>
                   <p className="text-xs text-amber-200/80 leading-relaxed mb-6">
                     Excesso absurdo de catecolaminas gerando atividade cardiovascular destrutiva e agitação letal. Difere da anticolinérgica pela <strong>Pele úmida e encharcada de suor (diaforese profusa)</strong>, bem como ruídos hidroaéreos intestinais aumentados.
                   </p>
                   
                   <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                      <strong className="text-white text-sm block mb-3 border-b border-slate-800 pb-2">Destruição Cardiovasular</strong>
                      <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                        <li><strong className="text-amber-400">Cocaína:</strong> Bloqueia recaptação de noradrenalina + vasospasmo coronariano grave induzido diretamente (leva jovem sem placas de gordura a ter IAM por fechamento liso da placa). Tem ação anestésica local abrindo as portas do canal de sódio.</li>
                        <li><strong className="text-amber-400">Anfetaminas / Ecstasy (MDMA):</strong> Fortíssimo apelo hipertérmico e euforia motora. No MDMA existe risco endêmico de Hiponatremia (por perda excessiva de calor diluída e muita bebida de boate = intoxicação por água).</li>
                      </ul>
                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] flex flex-col">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Risco de Morte Direta</h3>
                  <div className="space-y-3 flex-1 flex flex-col justify-center">
                    <div className="bg-red-950/20 text-rose-400 p-3 rounded-lg border border-red-900/40 text-xs font-bold font-mono">1. IAM com Supra ou Sub.</div>
                    <div className="bg-red-950/20 text-rose-400 p-3 rounded-lg border border-red-900/40 text-xs font-bold font-mono">2. AVE Hemorrágico (HAS).</div>
                    <div className="bg-red-950/20 text-rose-400 p-3 rounded-lg border border-red-900/40 text-xs font-bold font-mono">3. Rabdomiólise Severa.</div>
                    <div className="bg-red-950/20 text-rose-400 p-3 rounded-lg border border-red-900/40 text-xs font-bold font-mono">4. Dissecção de Aorta.</div>
                  </div>
                </div>
             </div>

             <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
               <strong className="text-white text-sm block mb-4 uppercase tracking-widest">Tratamento Baseado em SEDAÇÃO TÁTICA</strong>
               
               <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <strong className="text-emerald-400 text-xs uppercase tracking-widest mb-2 block font-black">A Arma Principal: BZD Generoso</strong>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                       Diazepam 10mg EV, seguido de repetições. Benzodiazepínicos rebaixam diretamente o drive central reduzindo: Agitação, Frequência Cardíaca, Pressão Arterial e Hipertermia simultaneamente (pois para de mover).
                    </p>
                  </div>
                  <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-xl">
                    <strong className="text-rose-500 text-xs uppercase tracking-widest mb-2 block font-black flex items-center gap-2"><ShieldAlert size={14}/>A Proibição dos Betabloqueadores</strong>
                    <p className="text-xs text-rose-200/80 leading-relaxed font-bold">
                       Se usar betabloqueador (ex: Metoprolol/Atenolol) para baixar a taquicardia da cocaína, você bloqueia as portas Beta (vasodilatadoras) e o excesso de adrenalina irá apenas para as portas Alfa (Muros potentes e impenetráveis). O vaso coronariano fecha brutalmente a pressão dispara (Alpha Unopposed = Vasoespasmo paradoxal). Use Nitroglicerina se isquemico.
                    </p>
                  </div>
               </div>
             </div>

             <div className="bg-orange-950/20 border border-orange-900/40 p-6 rounded-[2rem]">
                <h4 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Wind /> Disautonomia Secundária (Tempestade Simpática)
                </h4>
                <div className="grid md:grid-cols-[1fr_minmax(250px,300px)] gap-4">
                  <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl">
                     <p className="text-xs text-slate-300 leading-relaxed font-bold mb-3">
                        Diferente da intoxicação exógena pura, um paciente pode deflagrar choque/tempestade adrenérgica devido a falhas severas nas vias autonômicas.
                     </p>
                     <ul className="text-[11px] text-slate-400 space-y-2 list-disc pl-4 marker:text-orange-500">
                        <li><strong className="text-orange-400">Gatilhos Críticos:</strong> Lesão Medular Alta, Guillain-Barré Crossover, Pesticidas/Herbicidas.</li>
                        <li><strong className="text-orange-400">A Clínica:</strong> Súbita. Flutuação bizarra ou Hipotensão sustentada combinada a Hipertermia e Hipersecreção grave.</li>
                     </ul>
                  </div>
                  <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl flex flex-col justify-center text-center">
                     <strong className="text-white block text-[10px] mb-2 uppercase font-black tracking-widest text-slate-400 border-b border-slate-800 pb-2">Suporte & Reversão</strong>
                     <span className="text-sm font-black text-orange-400 uppercase tracking-widest mb-1 mt-2">Atropina</span>
                     <span className="text-[10px] text-slate-400 font-bold block mb-1">(para as lesões secratórias/bradicardicas de base colinérgica)</span>
                     <strong className="text-orange-400 block mt-2">Reposição Volêmica</strong>
                  </div>
                </div>
             </div>
             <DiffDiagBlock toxId="simpatomimetica" />
             <DiffDiagBlock toxId="disautonomia" />
          </motion.div>
        )}

        {/* TAB 7: SEDATIVO-HIPNOTICA */}
        {activeTox === 'sedativo' && (
          <motion.div key="sedativo" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
             
             <SpecificToxidromeHuman
                title="Sedativo-Hipnótica"
                colorText="text-slate-300"
                glowColor="bg-slate-500"
                brain="Sedação progressiva, Disartria, Coma"
                eye="Pupilas Normais (Discriminante Chave)"
                skin="Hipotermia leve, Imobilidade"
                heart="Hipotensão, Bradicardia leve"
                lung="Depressão respiratória (Barbitúricos)"
                muscle="Hipotonia, Hiporreflexia"
             />

             <div className="bg-blue-950/20 border border-blue-900/40 p-6 rounded-[2rem]">
                <h3 className="text-xl font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Skull /> Intoxicação Sedativo-Hipnótica
                </h3>
                <p className="text-[10px] text-blue-300 uppercase tracking-widest font-black mb-4">Benzodiazepínicos (Diazepam), Álcool, Zolpidem, Barbitúricos</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                   <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                     <strong className="text-white text-xs block mb-1">Queda Escalonada SNC</strong>
                     <p className="text-xs text-slate-400 leading-relaxed">O paciente afunda linearmente: Sonolência - Disartria - Estupor - Coma arrefléxico.</p>
                   </div>
                   <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/40 shadow-[inset_4px_0_0_rgba(96,165,250,1)]">
                     <strong className="text-blue-400 text-xs block mb-1 font-black uppercase">Pupilas NORMAIS</strong>
                     <p className="text-xs text-white leading-relaxed">Em contraste gritante à miose do opioide e a midríase da anticolinérgica, a pupila não sofre nas quedas de GABA.</p>
                   </div>
                   <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                     <strong className="text-white text-xs block mb-1">Mínima Comprometimento Vital (BZD Isolado)</strong>
                     <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Ao contrário dos barbitúricos (Morte por Apneia grave), o BZD isolado não aniquila centros respiratórios com facilidade. Vias aéreas boas mantém a vida.</p>
                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl relative">
                  <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-slate-800 pb-2">
                     <AlertCircle size={14}/> O Perigo do Flumazenil
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    O Flumazenil é um antagonista competitivo do GABA-A BZD. Porém, se o paciente é adulto, possivelmente usuário cônico recrescente, psiquiátrico ansioso de longa data... a remoção abrupta do BZD na sinapse deflagra instantaneamente o receptor que ficou dependente em "Status Convulsivo Refratário".
                  </p>
                  <p className="text-xs font-bold text-amber-500 mt-2 bg-amber-950/20 p-2 rounded inline-block">Você reverte alguém que estava "dormindo bem" e ele passa a ter crise convulsiva que não desliga, e agora você não tem medicacção para tratá-lo.</p>
                  <br/><span className="text-[10px] uppercase font-black text-indigo-400 mt-2 block">Dica de prova: Evite flumazenil em 99% das vezes no PS. Intube ou dê suporte de O2, ele acordará bem. Flumazenil é bom pra criança que achou diazepam.</span>
                </div>
             </div>
             <DiffDiagBlock toxId="sedativo" />
          </motion.div>
        )}

        {/* TAB 8: TRICICLICOS */}
        {activeTox === 'triciclicos' && (
          <motion.div key="triciclicos" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
             
             <SpecificToxidromeHuman
                title="Intoxicação por Tricíclicos"
                colorText="text-fuchsia-400"
                glowColor="bg-fuchsia-500"
                brain="Rebaixamento rápido da consciência"
                eye="Midríase (Ação anticolinérgica cruzada)"
                skin="Pele seca, Xerostomia"
                heart="QRS Largo > 100ms, Hipotensão refratária, TV/FV"
                muscle="Convulsões, Mioclonias, Retenção urinária"
             />

             <div className="bg-fuchsia-950/20 border border-fuchsia-900/40 p-6 rounded-[2rem]">
                <h3 className="text-xl font-black text-fuchsia-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity /> Antidepressivos Tricíclicos (ADTs)
                </h3>
                <p className="text-xs text-fuchsia-300 font-bold mb-6">Amitriptilina, Imipramina, Clomipramina. Uma janela terapêutica extremamente estreita (3-5x a dose vira tóxica severa).</p>
                
                <div className="grid md:grid-cols-2 gap-6 items-center">
                   <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                     <span className="text-[10px] text-fuchsia-400 font-black tracking-widest mb-2 block uppercase border-b border-slate-800 pb-2">Múltiplos Bloqueios (O Sujo)</span>
                     <ul className="text-xs text-slate-400 space-y-3">
                       <li><strong>1. Bloqueio Muscarínico (Anticolinérgico):</strong> Paciente chega seco vermelho miado.</li>
                       <li><strong>2. Bloqueio Alfa-1:</strong> Hipotensão fortíssima profunda refrataria a fluidos.</li>
                       <li><strong>3. Bloqueio Gabaérgico:</strong> Causa principal de Crises Convulsivas associadas.</li>
                       <li className="bg-fuchsia-950/40 mt-2 p-2 border border-fuchsia-900 text-white font-bold rounded">
                         <strong>4. Bloqueio Canal de Sódio Rápido Cardíaco (O ASSASSINO):</strong> Provoca QRS bizarramente largo na frente dos seus olhos precedendo arritmia TV/FV fatal.
                       </li>
                     </ul>
                   </div>

                   <div className="flex flex-col gap-4">
                     <div className="bg-slate-950 border border-fuchsia-900/30 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-center items-center text-center">
                       <HeartPulse className="text-fuchsia-500/20 absolute -right-2 top-0" size={100} />
                       <strong className="text-sm font-black text-white uppercase relative z-10 mb-1">Marcador Eletrocardiográfico de Risco</strong>
                       <span className="bg-fuchsia-500 text-white font-black text-xl px-4 py-1 rounded relative z-10">QRS &gt; 100 ms</span>
                       <p className="text-[10px] text-slate-400 mt-2 relative z-10 font-bold">Risco direto e inemudável de Arritmia Severa no leito.</p>
                     </div>
                   </div>
                </div>
             </div>

             <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
               <h4 className="text-sm font-black text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                 Protocolo do Bicarbonato de Sódio a 8.4%
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                 Para o bloqueio assassino de canais de sódio rápidos o corpo precisa de duas coisas: <strong>Maciça carga hiperosmolar de moléculas de Sódio</strong> para empurrar as trancas com saturação, aliada ao <strong>pH Sangúineo Alcalino extremo</strong> para desacoplar e escorregar a molécula do triciclico pra fora da fechadura.
               </p>
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-sky-950/20 p-4 border border-sky-900/40 rounded-xl">
                    <strong className="text-white block text-sm mb-1 uppercase font-black tracking-widest">Ataque e Manutenção</strong>
                    <ul className="text-[10px] font-mono text-sky-200 mt-2 space-y-1">
                      <li>Bolus: 1 a 2 mEq/Kg rápido EV. Repetir e atentar para o ECG de 5-5 min.</li>
                      <li>Alvo: Quando QRS despencar para &lt; 100ms, pendurar em BIC bomba de infusão contínua para estragar o pH.</li>
                      <li>Alvo Hemogasométrico de segurança: fechar e enxertar o pH entre <strong className="text-white bg-sky-900 px-1 py-0.5 ml-1">7.45 - 7.55</strong> (nunca maior que isso).</li>
                    </ul>
                 </div>
                 <div className="bg-red-950/20 p-4 border border-red-900/40 rounded-xl">
                    <strong className="text-white block text-sm mb-1 uppercase font-black tracking-widest text-rose-500">Manejo das Convulsões e TV</strong>
                    <ul className="text-[10px] font-sans text-rose-200 mt-2 space-y-2">
                      <li>Use <strong>Exclusivamente Diazepam EV</strong> (ou Propofol em UTI) para convulsões intratáveis.</li>
                      <li><strong className="text-white uppercase px-1 font-black bg-rose-900">PROIBIDO FENITOINA:</strong> Se você der fenitoina pra convulsão aqui, você bloqueia ainda mais os canais de sódio piorando tudo (mesmo se doente parar).</li>
                      <li>Para Taquicardia Ventricular usar Lidocaína EV associado ao BIC.</li>
                    </ul>
                 </div>
               </div>
             </div>

             <div className="bg-red-950/20 border border-red-900/40 p-6 rounded-[2rem]">
                <h4 className="text-sm font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <HeartPulse /> Síndrome do QT Longo Adquirido (Alerta)
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl">
                     <strong className="text-white block text-[10px] mb-2 uppercase font-black tracking-widest text-slate-400">Gatilhos Primários</strong>
                     <p className="text-xs text-slate-300 leading-relaxed font-bold">
                        <strong className="text-red-400">Queda Eletrolítica:</strong> Potássio (K), Cálcio (Ca) e Magnésio (Mg). <br/>
                        <strong className="text-red-400 mt-1 block">Drogas Culpadas:</strong> Fluconazol, Cetoconazol, Macrolídeos, Quinolonas, Escitalopram, Metadona, Hidroclorotiazida, Lítio.
                     </p>
                  </div>
                  <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl">
                     <strong className="text-white block text-[10px] mb-2 uppercase font-black tracking-widest text-slate-400">Risco e Resgate (Súbito)</strong>
                     <p className="text-xs text-slate-300 leading-relaxed">
                        A complicação central é a <strong className="text-rose-400">Torsades de Pointes</strong> evoluindo pra Fibrilação Ventricular (FV) e síncope.
                     </p>
                     <p className="text-[10px] uppercase font-black text-red-400 mt-2 bg-red-950/40 p-2 rounded">
                        Conduta Imediata: Sulfato de Magnésio (MgSO4) 2g IV em 15min. <br/>
                        Desfibrilação se instável. Reposição Volemica.
                     </p>
                  </div>
                </div>
             </div>
             <DiffDiagBlock toxId="triciclicos" />
          </motion.div>
        )}

        {/* TAB: MEDIDAS GERAIS */}
        {activeTox === 'medidas' && (
          <motion.div key="medidas" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
             <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-lg">
                <h3 className="text-xl font-black text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                  <ClipboardList className="text-slate-400" /> Paciente Suspeito: 11 Medidas Universais
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-3">
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                         <strong className="text-white text-xs block mb-1 uppercase tracking-widest">1-3. Abordagem Inicial e Exposição</strong>
                         <ul className="text-xs text-slate-300 space-y-2">
                            <li><strong className="text-slate-400">Tempo:</strong> Observar assintomáticos por 4 a 6h.</li>
                            <li><strong className="text-slate-400">História:</strong> Buscar informações sobre drogas e antígenos.</li>
                            <li><strong className="text-slate-400">Proteção:</strong> EPI - especialmente vital em pesticidas/herbicidas.</li>
                         </ul>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                         <strong className="text-rose-400 text-xs block mb-1 uppercase tracking-widest">4-6. Triagem Crítica (ABCDE toxicológico)</strong>
                         <ul className="text-xs text-slate-300 space-y-2">
                            <li><strong className="text-rose-300">VIA AÉREA:</strong> IOT se sat &lt; 90%. Previnir broncoaspiração!</li>
                            <li><strong className="text-rose-300">CONSCIÊNCIA:</strong> Glasgow &lt; 10 = O2 e Tiamina 100mg pra evitar Wernicke.</li>
                            <li><strong className="text-rose-300">CARDIO:</strong> ECG imediato (Ver QT Longo, QRS Largo, BR, isquemia).</li>
                         </ul>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                         <strong className="text-emerald-400 text-xs block mb-1 uppercase tracking-widest">8-10. Descontaminação Rápida</strong>
                         <ul className="text-[11px] text-slate-300 space-y-2">
                            <li><strong className="text-emerald-300">LAVAGEM GÁSTRICA:</strong> Até 2h, se comprimidos de liberação lenta visualizados.</li>
                            <li><strong className="text-emerald-300">CARVÃO ATIVADO:</strong> Se vígil pra evitar pneumonia química (ou pós-IOT).</li>
                            <li><strong className="text-emerald-300">CUTÂNEA:</strong> Lavar pele, unhas, trás da orelha (sem raspar). Olhos com água contínua por 20min.</li>
                         </ul>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                         <strong className="text-blue-400 text-xs block mb-1 uppercase tracking-widest">11. Investigação Refinada & Condutas Específicas</strong>
                         <p className="text-[11px] text-slate-300 leading-relaxed">
                            Avaliar doenças prévias; Laboratório: Uréia, Cr, Na, K, Mg, P, Ca e Gasometria. <br/>
                            <strong className="mt-1 block text-blue-300">Indicações de Hemodiálise Grave:</strong> Lítio (especialmente), arritmias graves, Cr &gt; 2.26, Glasgow &lt; 10. <br/>
                            <strong className="mt-1 block text-blue-300">Hipotensão Simples:</strong> Volume, noradrenalina ou vasopressina.
                         </p>
                      </div>
                   </div>
                </div>

                <div className="mt-4 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                   <strong className="text-teal-400 text-xs block mb-2 uppercase tracking-widest flex items-center gap-2">
                     <TestTube size={16} /> Fórmula de Adrogué-Madias (Correção de Sódio)
                   </strong>
                   <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                     Estima a variação do Na+ sérico após a infusão de 1L de solução.
                   </p>
                   <div className="bg-slate-900 border border-slate-800/80 p-3 rounded font-mono text-xs text-center text-slate-200">
                      <span className="text-teal-300 font-bold">ΔNa+</span> = ( [Na+ infusão] + [K+ infusão] - [Na+ sérico] ) / ( ACT + 1 )
                   </div>
                   <p className="text-[10px] text-slate-400 mt-2 text-center uppercase tracking-widest">
                     ACT (Água Corporal Total) = Peso × 0.6 (Homens) ou 0.5 (Mulheres)
                   </p>
                </div>
             </div>
          </motion.div>
        )}

        {/* TAB: SINDROME NEUROLEPTICA */}
        {activeTox === 'neuroleptica' && (
          <motion.div key="neuroleptica" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
             
             <SpecificToxidromeHuman
                title="Síndrome Neuroléptica Maligna"
                colorText="text-orange-500"
                glowColor="bg-orange-500"
                brain="Estupor, Coma e Mutismo (Gradual)"
                eye="Pupilas Normais (Resposta preservada)"
                skin="Diaforese Profusa (Úmida/Suada)"
                heart="Instabilidade Autonômica (Taquicardia, flutuação PA)"
                muscle="Rigidez em CANO DE CHUMBO, Hiporreflexia"
             />

             <div className="grid md:grid-cols-[1fr_minmax(300px,380px)] gap-6 items-start">
               <div className="bg-orange-950/20 border border-orange-900/40 p-6 rounded-[2rem]">
                 <h3 className="text-xl font-black text-orange-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Thermometer /> Colapso Antipsicótico
                 </h3>
                 <p className="text-[10px] text-orange-200 uppercase tracking-widest font-black mb-4 bg-orange-900/30 p-2 inline-block rounded">Gatilhos: Haloperidol, Metoclopramida, Clorpromazina</p>
                 <div className="space-y-4">
                   <div className="bg-slate-900 border-l-2 border-orange-500 p-4 rounded-r-xl">
                      <strong className="text-white text-xs block mb-1 uppercase tracking-widest text-orange-400">1. A Rigidez Central Extrema</strong>
                      <p className="text-xs text-slate-300 leading-relaxed font-bold">Instaura-se o bloqueio de receptores D2 massivo no corpo estriado. Causa uma extrema resistência uniforme passiva em TODA musculatura: o temido "Cano de Chumbo". O doente "endurece".</p>
                   </div>
                   <div className="bg-slate-900 border-l-2 border-orange-500 p-4 rounded-r-xl">
                      <strong className="text-white text-xs block mb-1 uppercase tracking-widest text-orange-400">2. Morte por Caloria Retida</strong>
                      <p className="text-xs text-slate-300 leading-relaxed">Esse excesso de atrito gera termogênese severa (&gt; 38ºC ou até 41ºC). A pele fica encharcada tentando liberar o calor. CPK explode na estratosfera (&gt; 100.000). Risco letal de insuficiência renal e CID.</p>
                   </div>
                 </div>
               </div>

               <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex flex-col justify-center">
                 <strong className="text-orange-500 text-sm block mb-4 uppercase tracking-widest">Resgate Direcionado</strong>
                 <div className="space-y-4 font-bold text-xs text-slate-300">
                    <div className="p-3 bg-slate-950 rounded border border-slate-800">
                       <span className="text-white uppercase tracking-widest block text-[10px] mb-1">1º Passo Crítico</span>
                       Descontinuar os agentes culpados (Tirar Imediatamente dopaminérgico / antipsicóticos).
                    </div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800 border-l-2 border-l-orange-500">
                       <span className="text-white uppercase tracking-widest block text-[10px] mb-1">Drogas Especiticas</span>
                       <strong className="text-orange-400 uppercase">Dantrolene</strong> (Relaxante Muscular Periferico Direto) <br/>+ Suporte massivo / UTI.
                    </div>
                 </div>
               </div>
             </div>
             <DiffDiagBlock toxId="neuroleptica" />
          </motion.div>
        )}

        {/* TAB: SINDROME EXTRAPIRAMIDAL */}
        {activeTox === 'extrapiramidal' && (
          <motion.div key="extrapiramidal" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
             
             <SpecificToxidromeHuman
                title="Síndrome Extrapiramidal"
                colorText="text-lime-400"
                glowColor="bg-lime-500"
                brain="Estado mental geralmente preservado (N)"
                eye="Crises Oculógiras, Pupilas Normais"
                skin="Pele Normal"
                heart="Sinais vitais normais"
                muscle="Distonia (Torcicolo), Acatisia, Roda Dentada"
             />

             <div className="grid md:grid-cols-2 gap-6 items-start">
               <div className="bg-lime-950/20 border border-lime-900/40 p-6 rounded-[2rem] h-full flex flex-col justify-center">
                 <h3 className="text-xl font-black text-lime-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Activity /> Distonia de Urgência
                 </h3>
                 <p className="text-[10px] text-lime-200 uppercase tracking-widest font-black mb-4 bg-lime-900/30 p-2 inline-block rounded">Gatilhos: Plasil, Bromoprida, Haldol (Agudo/Crônico)</p>
                 <div className="space-y-3 text-xs text-slate-300">
                    <p className="leading-relaxed">Ocorre devido a um bloqueio reversível abrupto das vias nigroestriatais. Diferente da neuroléptica, não é sistêmica letal ou hipertermica - o paciente "trava" localizado e fica aflito, mas consciente e eupneico.</p>
                    <ul className="list-disc ml-5 space-y-1 font-bold text-lime-100">
                       <li><strong>Distonia Aguda:</strong> Trismo grosseiro, torcicolo espasmódico, olho virado pro teto.</li>
                       <li><strong>Parkinsonismo Secundário:</strong> Rigidez em catraca "Roda dentada", tremor de repouso.</li>
                       <li><strong>Acatisia:</strong> Impossibilidade motora de ficar parado no leito.</li>
                    </ul>
                 </div>
               </div>

               <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] h-full">
                 <strong className="text-white text-sm block mb-4 uppercase tracking-widest">Reversão Mágica</strong>
                 <p className="text-xs text-slate-400 mb-4 leading-relaxed font-bold">O tratamento traz um alívio cinemático quase instantâneo. Ao bloquear a via excessiva colinérgica, a dopamina relativa ganha espaço e solta a musculatura do paciente.</p>
                 
                 <div className="bg-lime-900/10 border border-lime-800/30 p-4 rounded-xl text-center shadow-[inset_0_0_20px_rgba(132,204,22,0.1)]">
                   <Activity className="text-lime-500 mx-auto mb-2" size={32} />
                   <strong className="text-lime-400 text-lg uppercase tracking-widest block font-black">Biperideno EV/IM</strong>
                   <span className="text-[10px] text-slate-300 font-bold tracking-widest">(Akineton - Anticolinérgico de ação central)</span>
                   <p className="text-slate-200 mt-3 text-xs font-bold leading-relaxed border-t border-lime-900/50 pt-2">Se não houver, ou para somatório calmativo, a segunda linha vital é o <strong className="text-lime-300">Benzodiazepínico</strong> de rápida ação.</p>
                 </div>
               </div>
             </div>
             <DiffDiagBlock toxId="extrapiramidal" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SpecificToxidromeHuman({
  title, colorText, glowColor,
  brain, eye, heart, lung, skin, muscle
}: {
  title: string;
  colorText: string;
  glowColor: string;
  brain: string;
  eye: string;
  heart: string;
  lung?: string;
  skin: string;
  muscle: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-4 md:p-6 shadow-lg relative overflow-hidden flex flex-col items-center">
       <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[350px] h-[250px] md:h-[350px] ${glowColor} opacity-5 blur-[80px] pointer-events-none rounded-full`}></div>
       
       <h4 className={`text-sm md:text-base font-black uppercase tracking-widest w-full text-center mb-6 pb-4 border-b border-slate-800/50 flex items-center justify-center gap-2 ${colorText}`}>
         <User size={20} /> Bioma: {title}
       </h4>
       
       <div className="flex flex-col md:flex-row w-full items-center justify-between gap-6 md:gap-2 relative z-10 px-2 lg:px-8">
          
          {/* Left Column */}
          <div className="flex flex-col gap-5 w-full md:w-1/3 md:text-right">
             <div className="p-3 md:pr-4">
                <strong className={`flex items-center md:justify-end text-[10px] uppercase tracking-widest mb-1 font-black ${colorText}`}>
                   <Brain size={14} className="mr-2 md:hidden" /> SNC & Mente <Brain size={14} className="ml-2 hidden md:block" />
                </strong>
                <span className="text-xs text-slate-300 font-bold leading-relaxed block">{brain}</span>
             </div>
             
             <div className="p-3 md:pr-4">
                <strong className={`flex items-center md:justify-end text-[10px] uppercase tracking-widest mb-1 font-black ${colorText}`}>
                   <Eye size={14} className="mr-2 md:hidden" /> Pupilas <Eye size={14} className="ml-2 hidden md:block" />
                </strong>
                <span className="text-xs text-slate-300 font-bold leading-relaxed block">{eye}</span>
             </div>
             
             <div className="p-3 md:pr-4">
                <strong className={`flex items-center md:justify-end text-[10px] uppercase tracking-widest mb-1 font-black ${colorText}`}>
                   <Flame size={14} className="mr-2 md:hidden" /> Pele / Mucosas <Flame size={14} className="ml-2 hidden md:block" />
                </strong>
                <span className="text-xs text-slate-300 font-bold leading-relaxed block">{skin}</span>
             </div>
          </div>
          
          {/* Center Human */}
          <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-full border border-slate-700/50 bg-slate-950 flex justify-center items-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20">
             <div className={`absolute inset-0 rounded-full ${glowColor} opacity-10 blur-xl animate-pulse`}></div>
             <User size={80} className="text-slate-600 stroke-[1]" />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 w-full md:w-1/3 text-left">
             <div className="p-3 md:pl-4">
                <strong className={`flex items-center text-[10px] uppercase tracking-widest mb-1 font-black ${colorText}`}>
                   <HeartPulse size={14} className="mr-2" /> Cardiovascular 
                </strong>
                <span className="text-xs text-slate-300 font-bold leading-relaxed block">{heart}</span>
             </div>

             {lung && (
               <div className="p-3 md:pl-4">
                  <strong className={`flex items-center text-[10px] uppercase tracking-widest mb-1 font-black ${colorText}`}>
                     <Wind size={14} className="mr-2" /> Respiratório 
                  </strong>
                  <span className="text-xs text-slate-300 font-bold leading-relaxed block">{lung}</span>
               </div>
             )}

             <div className="p-3 md:pl-4">
                <strong className={`flex items-center text-[10px] uppercase tracking-widest mb-1 font-black ${colorText}`}>
                   <Activity size={14} className="mr-2" /> Neuromuscular & TGI 
                </strong>
                <span className="text-xs text-slate-300 font-bold leading-relaxed block">{muscle}</span>
             </div>
          </div>

       </div>
    </div>
  )
}

function ToxidromeHumanSummary() {
  return (
    <motion.div key="humano" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem] mt-6">
      <h3 className="text-xl md:text-2xl font-black text-slate-200 uppercase tracking-widest mb-10 text-center flex justify-center items-center gap-3">
        <User size={28} className="text-slate-500" /> O Bioma Intoxicado: Mapa Fisiológico
      </h3>
      
      <div className="flex flex-col lg:flex-row items-stretch gap-6 justify-center">
        {/* Esquerda */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3 justify-center">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative shadow-lg">
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">
              <ArrowRight size={24} />
            </div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
              <Brain className="text-indigo-400" size={20} />
              <strong className="text-white text-sm uppercase tracking-widest font-black">SNC & Mente</strong>
            </div>
            <div className="space-y-3">
              <div className="bg-rose-950/20 border-l-2 border-rose-500 p-2 rounded-r">
                <span className="font-black uppercase text-[10px] text-rose-400 block">Agitação / Delirium / Psicose</span>
                <span className="text-slate-300 text-xs">Anticolinérgica, Simpatomimética, Serotoninérgica</span>
              </div>
              <div className="bg-blue-950/20 border-l-2 border-blue-500 p-2 rounded-r">
                <span className="font-black uppercase text-[10px] text-blue-400 block">Coma / Depressão Severa</span>
                <span className="text-slate-300 text-xs">Opioide, Sedativo-Hipnótica, Colinérgica</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative shadow-lg">
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">
              <ArrowRight size={24} />
            </div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
              <Eye className="text-sky-400" size={20} />
              <strong className="text-white text-sm uppercase tracking-widest font-black">Pupilas</strong>
            </div>
            <div className="space-y-3">
              <div className="bg-rose-950/20 border-l-2 border-rose-500 p-2 rounded-r">
                <span className="font-black uppercase text-[10px] text-rose-400 block">Midríase (Dilatadas)</span>
                <span className="text-slate-300 text-xs">Anticolinérgica, Simpatomimética, Abstinências</span>
              </div>
              <div className="bg-blue-950/20 border-l-2 border-blue-500 p-2 rounded-r">
                <span className="font-black uppercase text-[10px] text-blue-400 block">Miose (Puntiformes)</span>
                <span className="text-slate-300 text-xs font-bold">Opioide, Colinérgica</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centro: O Humano */}
        <div className="relative flex justify-center items-center w-full py-12 lg:py-0 lg:w-1/4">
           <div className="absolute inset-0 bg-slate-900/30 rounded-full blur-3xl animate-pulse"></div>
           <div className="relative z-10 flex flex-col items-center justify-center p-8 border-2 border-slate-800 rounded-full bg-slate-950/50 shadow-[0_0_40px_rgba(30,41,59,1)]">
             <User size={140} className="text-slate-600 stroke-[1]" />
             <div className="absolute top-[20%] w-4 h-4 bg-indigo-500 rounded-full blur-sm animate-pulse"></div>
             <div className="absolute top-[35%] w-4 h-4 bg-sky-500 rounded-full blur-sm animate-pulse"></div>
             <div className="absolute top-[55%] w-4 h-4 bg-rose-500 rounded-full blur-sm animate-pulse"></div>
             <div className="absolute top-[75%] w-4 h-4 bg-amber-500 rounded-full blur-sm animate-pulse"></div>
           </div>
        </div>

        {/* Direita */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3 justify-center">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative shadow-lg">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">
              <ArrowLeft size={24} />
            </div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
              <HeartPulse className="text-rose-400" size={20} />
              <strong className="text-white text-sm uppercase tracking-widest font-black">Coração & Vasos</strong>
            </div>
            <div className="space-y-3">
              <div className="bg-rose-950/20 border-r-2 border-rose-500 p-2 rounded-l text-right">
                <span className="font-black uppercase text-[10px] text-rose-400 block">Taquicardia / Hipertensão</span>
                <span className="text-slate-300 text-xs">Simpatomimética, Anticolinérgica, Serotoninérgica</span>
              </div>
              <div className="bg-blue-950/20 border-r-2 border-blue-500 p-2 rounded-l text-right">
                <span className="font-black uppercase text-[10px] text-blue-400 block">Bradicardia / Hipotensão</span>
                <span className="text-slate-300 text-xs text-right block">Opioide, Colinérgica, Tricíclicos (Choque)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative shadow-lg">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">
              <ArrowLeft size={24} />
            </div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800 justify-end">
              <strong className="text-white text-sm uppercase tracking-widest font-black">Pele & Secreção</strong>
              <Flame className="text-amber-400" size={20} />
            </div>
            <div className="space-y-3">
               <div className="bg-amber-950/20 border-r-2 border-amber-500 p-2 rounded-l text-right">
                <span className="font-black uppercase text-[10px] text-amber-400 block">Grelhando / Seco (Hot & Dry)</span>
                <span className="text-slate-300 text-xs font-bold block text-right">Anticolinérgica</span>
              </div>
              <div className="bg-emerald-950/20 border-r-2 border-emerald-500 p-2 rounded-l text-right">
                <span className="font-black uppercase text-[10px] text-emerald-400 block">Encharcado / Molhado (Suor)</span>
                <span className="text-slate-300 text-xs block text-right">Colinérgica, Simpatomimética, Serotoninérgica</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="mt-8 flex justify-center w-full">
         <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl w-full max-w-4xl text-center shadow-lg relative">
            <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 pb-3 border-b border-slate-800 pt-2">
              <Activity className="text-emerald-400" size={20} />
              <strong className="text-white text-sm uppercase tracking-widest font-black">Tônus Neuromuscular</strong>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex-1 bg-rose-950/20 border-t-2 border-rose-500 p-3 rounded-b">
                <span className="font-black uppercase text-[10px] text-rose-400 block mb-1">Hiperreflexia / Clônus / Rigidez</span>
                <span className="text-slate-300 text-xs">Serotoninérgica, Anticolinérgica, Tricíclicos</span>
              </div>
              <div className="flex-1 bg-blue-950/20 border-t-2 border-blue-500 p-3 rounded-b">
                <span className="font-black uppercase text-[10px] text-blue-400 block mb-1">Hiporreflexia / Flacidez</span>
                <span className="text-slate-300 text-xs">Sedativo-Hipnótica, Opioide</span>
              </div>
              <div className="flex-1 bg-emerald-950/20 border-t-2 border-emerald-500 p-3 rounded-b">
                <span className="font-black uppercase text-[10px] text-emerald-400 block mb-1">Fasciculações e Câibras</span>
                <span className="text-slate-300 text-xs font-bold">Colinérgica (Nicotínico)</span>
              </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
