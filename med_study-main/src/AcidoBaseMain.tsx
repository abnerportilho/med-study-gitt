import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, ArrowRight, Brain, AlertCircle, RefreshCw, 
  Droplets, FlaskConical, Scale, HeartPulse, Stethoscope, Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const chartData = [
  { id: 'normal', name: 'Normal', ph: 7.40, pco2: 40, hco3: 24 },
  { id: 'acid-met', name: 'Ac. Met.', ph: 7.25, pco2: 28, hco3: 12 },
  { id: 'alc-met', name: 'Alc. Met.', ph: 7.52, pco2: 48, hco3: 36 },
  { id: 'acid-resp', name: 'Ac. Resp.', ph: 7.28, pco2: 60, hco3: 28 },
  { id: 'alc-resp', name: 'Alc. Resp.', ph: 7.54, pco2: 25, hco3: 18 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-white font-bold text-sm mb-2">{label}</p>
        <p className="text-rose-400 text-xs font-mono font-bold">pH: {payload[0]?.value}</p>
        <p className="text-amber-400 text-xs font-mono font-bold">pCO₂: {payload[1]?.value} mmHg</p>
        <p className="text-sky-400 text-xs font-mono font-bold">HCO₃⁻: {payload[2]?.value} mmol/L</p>
      </div>
    );
  }
  return null;
};

const tabs = [
  { id: 'homeostase', label: '1. Homeostase & Valores' },
  { id: 'passo-a-passo', label: '2. Algoritmo Rápido' },
  { id: 'anion-gap', label: '3. Ânion-Gap & Delta' },
  { id: 'casos', label: '4. Casos Clínicos' }
];

export default function AcidoBaseMain() {
  const [activeTab, setActiveTab] = useState('homeostase');
  const [activeCase, setActiveCase] = useState<number | null>(null);

  // Tab 2 interaction state
  const [stepAg, setStepAg] = useState(1);
  const [chartActive, setChartActive] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-3xl shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500">
          <Scale size={140} />
        </div>
        <div className="z-10">
          <div className="flex items-center gap-3 text-emerald-500 mb-2">
            <Scale size={24} />
            <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500">
              Emergência • Medicina Interna
            </h2>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Distúrbios Ácido-Base
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Gasometria, mecanismos compensatórios, cálculo de Ânion-Gap, Delta-Delta e raciocínio clínico para os diagnósticos integrados e distúrbios mistos.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 font-extrabold translate-y-[-2px]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 pb-20">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Homeostase */}
          {activeTab === 'homeostase' && (
             <motion.div key="homeostase" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                     <Activity className="text-emerald-500" /> Valores de Referência 
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden flex flex-col items-center text-center">
                         <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">pH Sanguíneo</span>
                         <span className="text-3xl font-black text-white mb-1">7.40</span>
                         <span className="text-xs text-slate-400 font-medium">Faixa: 7.38 - 7.42</span>
                         <div className="mt-4 w-full flex justify-between text-[10px] font-bold">
                            <span className="text-rose-400">&lt; 7.38 Acidemia</span>
                            <span className="text-indigo-400">&gt; 7.42 Alcalemia</span>
                         </div>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden flex flex-col items-center text-center">
                         <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">pCO₂ (Respiratório)</span>
                         <span className="text-3xl font-black text-amber-400 mb-1">40 </span>
                         <span className="text-xs text-slate-400 font-medium">± 2 mmHg</span>
                         <div className="mt-4 w-full flex justify-between text-[10px] font-bold">
                            <span className="text-indigo-400 text-left">Baixo = Alcalose Resp.</span>
                            <span className="text-rose-400 text-right">Alto = Acidose Resp.</span>
                         </div>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden flex flex-col items-center text-center">
                         <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">HCO₃⁻ (Metabólico)</span>
                         <span className="text-3xl font-black text-sky-400 mb-1">24</span>
                         <span className="text-xs text-slate-400 font-medium">± 2 mmol/L</span>
                         <div className="mt-4 w-full flex justify-between text-[10px] font-bold">
                            <span className="text-rose-400 text-left">Baixo = Acidose Met.</span>
                            <span className="text-indigo-400 text-right">Alto = Alcalose Met.</span>
                         </div>
                      </div>

                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-rose-400 mb-6 flex items-center gap-2">
                     <FlaskConical className="text-rose-500" /> O Princípio de Le Chatelier (Fórmula do Tampão)
                   </h3>
                   <div className="bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl flex flex-col xl:flex-row items-center justify-between text-center xl:text-left gap-4">
                     <div>
                       <p className="text-xs text-rose-300 font-bold uppercase tracking-widest mb-2">Equação do Equilíbrio Ácido-Base</p>
                       <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-black text-white px-2">
                         CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻
                       </div>
                     </div>
                     <div className="max-w-md text-xs text-slate-400 bg-slate-900/50 p-4 rounded-xl border border-rose-900/20">
                       Se o corpo acumula <strong className="text-white">CO₂</strong> (hipoventilação), a equação desloca para a direita, gerando mais <strong className="text-white">H⁺</strong> (Acidose). Se o corpo perde <strong className="text-white">HCO₃⁻</strong> (diarreia), mais H⁺ fica livre para compensar a falta da base, acelerando a acidose!
                     </div>
                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                     <RefreshCw className="text-indigo-400" /> Distúrbios Primários da Gasometria
                   </h3>
                   <p className="text-sm text-slate-400 mb-6">Passe o mouse (ou toque) sobre cada quadrante no gráfico ou nos cards abaixo para focar no mecanismo correspondente.</p>
                   
                   <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 h-[250px] sm:h-[350px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} onMouseLeave={() => setChartActive(null)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 11}} />
                          <YAxis yAxisId="left" orientation="left" stroke="#64748b" domain={[0, 70]} tick={{fontSize: 11}} />
                          <YAxis yAxisId="right" orientation="right" stroke="#64748b" domain={[7.0, 7.8]} tick={{fontSize: 11}} />
                          <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b', opacity: 0.4}} />
                          <Legend wrapperStyle={{ fontSize: '12px' }} />
                          <Bar yAxisId="right" dataKey="ph" name="pH" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-ph-${index}`} 
                                fill="#f43f5e" 
                                opacity={chartActive && chartActive !== entry.id ? 0.3 : 1}
                                onMouseEnter={() => setChartActive(entry.id)}
                                className="transition-all duration-300 cursor-pointer"
                              />
                            ))}
                          </Bar>
                          <Bar yAxisId="left" dataKey="pco2" name="pCO₂" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-pco2-${index}`} 
                                fill="#fbbf24" 
                                opacity={chartActive && chartActive !== entry.id ? 0.3 : 1}
                                onMouseEnter={() => setChartActive(entry.id)}
                                className="transition-all duration-300 cursor-pointer"
                              />
                            ))}
                          </Bar>
                          <Bar yAxisId="left" dataKey="hco3" name="HCO₃⁻" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-hco3-${index}`} 
                                fill="#38bdf8" 
                                opacity={chartActive && chartActive !== entry.id ? 0.3 : 1}
                                onMouseEnter={() => setChartActive(entry.id)}
                                className="transition-all duration-300 cursor-pointer"
                              />
                            ))}
                          </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                        { id: 'acid-met', title: 'Acidose Metabólica', ph: '↓ Baixo', arrow: '↓ HCO₃⁻', desc: 'Perda de bicarbonato (ex: diarreia, fístula) ou hiperprodução de ácidos fixos (ex: ácido lático no choque, cetoácidos na CAD). O pulmão compensa hiperventilando rapidamente para expulsar CO₂ (hálito cetônico / respiração de Kussmaul).', styles: { bgAct: 'bg-rose-950/20', borderAct: 'border-rose-900/40', text: 'text-rose-400', badgeBg: 'bg-rose-900/50', badgeText: 'text-rose-200' } },
                        { id: 'alc-met', title: 'Alcalose Metabólica', ph: '↑ Alto', arrow: '↑ HCO₃⁻', desc: 'Acúmulo de base ou eliminação brutal de ácido e cloro (ex: vômitos incoercíveis - perde HCl, ou uso indiscriminado de diurético de alça). O pulmão compensa hipoventilando para reter CO₂ e tentar manter o pH baixo.', styles: { bgAct: 'bg-indigo-950/20', borderAct: 'border-indigo-900/40', text: 'text-indigo-400', badgeBg: 'bg-indigo-900/50', badgeText: 'text-indigo-200' } },
                        { id: 'acid-resp', title: 'Acidose Respiratória', ph: '↓ Baixo', arrow: '↑ pCO₂', desc: 'Retenção grave de CO₂ por falha na ventilação global (ex: exacerbação de DPOC, apneia/depressão respiratória por opioides, doença neuromuscular). O rim, com extrema lentidão (dias), retém bicarbonato na corrente para compensar.', styles: { bgAct: 'bg-amber-950/20', borderAct: 'border-amber-900/40', text: 'text-amber-400', badgeBg: 'bg-amber-900/50', badgeText: 'text-amber-200' } },
                        { id: 'alc-resp', title: 'Alcalose Respiratória', ph: '↑ Alto', arrow: '↓ pCO₂', desc: 'Lavagem exagerada de CO₂ por hiperventilação primária (ex: crise de ansiedade, dor severa, sepse gram-negativa fase precoce ou hipoxemia). O rim irá compensar perdendo avidamente bicarbonato na urina.', styles: { bgAct: 'bg-sky-950/20', borderAct: 'border-sky-900/40', text: 'text-sky-400', badgeBg: 'bg-sky-900/50', badgeText: 'text-sky-200' } }
                     ].map((d) => (
                        <div 
                          key={d.id} 
                          onMouseEnter={() => setChartActive(d.id)}
                          onMouseLeave={() => setChartActive(null)}
                          onClick={() => setChartActive(chartActive === d.id ? null : d.id)}
                          className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            chartActive === d.id || chartActive === null 
                              ? `${d.styles.bgAct} ${d.styles.borderAct} transform sm:scale-[1.02] shadow-lg` 
                              : `bg-slate-900/50 border-slate-800 opacity-40 scale-95`
                          }`}
                        >
                          <div className={`${d.styles.text} font-black text-lg mb-3 uppercase tracking-widest`}>{d.title}</div>
                          <div className="flex gap-3 mb-4">
                            <span className={`${d.styles.badgeBg} ${d.styles.badgeText} px-2 py-1 rounded text-[10px] font-bold uppercase`}>pH {d.ph}</span>
                            <span className={`${d.styles.badgeBg} ${d.styles.badgeText} px-2 py-1 rounded text-[10px] font-bold uppercase`}>Primário: {d.arrow}</span>
                          </div>
                          <AnimatePresence>
                            {(chartActive === d.id || chartActive === null) && (
                              <motion.p 
                                 initial={{opacity:0, height: 0}} 
                                 animate={{opacity:1, height: 'auto'}} 
                                 exit={{opacity:0, height: 0}} 
                                 className="text-xs text-slate-300 leading-relaxed overflow-hidden"
                              >
                                {d.desc}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                     ))}
                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                     <Clock className="text-amber-500" /> Os Tempos da Regulação
                   </h3>
                   <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                         <strong className="text-sm text-white uppercase block mb-2 border-b border-slate-800 pb-2">1. Sistema Tampão</strong>
                         <p className="text-xs text-emerald-400 font-bold mb-1">Instantâneo (Rápido)</p>
                         <p className="text-xs text-slate-400 leading-relaxed">
                            Principal: Bicarbonato. Outros: Albumina, Fosfato, Hemoglobina. Reage quase instantaneamente para evitar variações extremas e imediatas no pH.
                         </p>
                      </div>
                      <div className="flex-1 bg-amber-950/20 p-5 rounded-2xl border border-amber-900/40">
                         <strong className="text-sm text-white uppercase block mb-2 border-b border-amber-900/50 pb-2">2. Respiratório (Pulmão)</strong>
                         <p className="text-xs text-amber-400 font-bold mb-1">Minutos a Horas</p>
                         <p className="text-xs text-slate-400 leading-relaxed">
                            Ajusta o pCO₂ pela respiração. Em acidose (pH baixo), o corpo começa a hiperventilar rapidamente (minutos) para eliminar CO₂ (ácido volátil).
                         </p>
                      </div>
                      <div className="flex-1 bg-sky-950/20 p-5 rounded-2xl border border-sky-900/40">
                         <strong className="text-sm text-white uppercase block mb-2 border-b border-sky-900/50 pb-2">3. Renal (Rins)</strong>
                         <p className="text-xs text-sky-400 font-bold mb-1">Horas a Dias (2-5 dias)</p>
                         <p className="text-xs text-slate-400 leading-relaxed">
                            Responde a alterações respiratórias persistentes excretando H⁺ e reabsorvendo/gerando HCO₃⁻. Lento. Só atinge seu pico de compensação em até 5 dias.
                         </p>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}

          {/* TAB 2: Algoritmo */}
          {activeTab === 'passo-a-passo' && (
             <motion.div key="passo-a-passo" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
               <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                  <h3 className="text-xl font-black text-rose-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Brain /> Raciocínio Diagnóstico na Gasometria
                  </h3>
                  
                  <div className="flex flex-col gap-6">
                    {/* Passo 1 */}
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 shrink-0 bg-slate-900 border-2 border-rose-500 rounded-full flex items-center justify-center font-black text-white text-lg">1</div>
                       <div className="flex-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                          <span className="text-[10px] text-slate-500 uppercase font-black block mb-2">Avalie o pH Primário</span>
                          <p className="text-sm text-slate-300 leading-relaxed mb-3">O pH diz qual o sentido primário da doença, a menos que haja grandes distúrbios mistos.</p>
                          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                             <div className="bg-rose-950/30 p-2 rounded border border-rose-900 text-rose-300">pH &lt; 7.38 → Tendência a ACIDOSE</div>
                             <div className="bg-indigo-950/30 p-2 rounded border border-indigo-900 text-indigo-300">pH &gt; 7.42 → Tendência a ALCALOSE</div>
                          </div>
                          <p className="text-[10px] mt-2 text-slate-500">*Nota: Acidose é o processo (ex: H+ aumentado). Acidemia é o pH final &lt; 7.38.</p>
                       </div>
                    </div>

                    {/* Passo 2 */}
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 shrink-0 bg-slate-900 border-2 border-amber-500 rounded-full flex items-center justify-center font-black text-white text-lg">2</div>
                       <div className="flex-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                          <span className="text-[10px] text-slate-500 uppercase font-black block mb-2">Identifique o culpado (O que justifica o pH?)</span>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            Se existe ACIDOSE, quem é o culpado principal? <br/>
                            - Bicarbonato baixo? Então é <strong>Acidose Metabólica</strong>.<br/>
                            - pCO₂ alto? Então é <strong>Acidose Respiratória</strong>.
                          </p>
                       </div>
                    </div>

                    {/* Passo 3 */}
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 shrink-0 bg-slate-900 border-2 border-emerald-500 rounded-full flex items-center justify-center font-black text-white text-lg">3</div>
                       <div className="flex-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                          <span className="text-[10px] text-slate-500 uppercase font-black block mb-2">Avalie a Resposta Compensatória (As Fórmulas)</span>
                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            Sempre calcule! Se o PCO₂ ou HCO₃ medido não bater com o esperado pela fórmula = <strong>Distúrbio Misto</strong>.
                          </p>

                          <div className="space-y-3">
                             {/* Formulas de Acidose Met. */}
                             <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                               <strong className="text-white text-xs block mb-1">Se Acidose Metabólica: Qual o pCO₂ Esperado?</strong>
                               <div className="text-emerald-400 font-mono text-sm font-black bg-emerald-950/20 px-2 py-1 inline-block rounded">
                                 Fórmula de Winter: pCO2 = (1.5 × HCO3) + 8 (±2)
                               </div>
                               <p className="text-[10px] mt-1 text-slate-400">Ou mais prático: pCO₂ = HCO₃ + 15</p>
                             </div>

                             {/* Formulas de Alcalose Met. */}
                             <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                               <strong className="text-white text-xs block mb-1">Se Alcalose Metabólica: Qual o pCO₂ Esperado?</strong>
                               <div className="text-emerald-400 font-mono text-sm font-black bg-emerald-950/20 px-2 py-1 inline-block rounded">
                                 pCO2 = HCO3 + 15
                               </div>
                             </div>

                             {/* Ac Resp */}
                             <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                               <strong className="text-white text-xs block mb-1">Se Acidose Respiratória: Qual o HCO₃ Esperado?</strong>
                               <p className="text-[10px] text-slate-400 mb-1">Para cada 10 mmHg acima de 40 de pCO₂:</p>
                               <div className="flex gap-2">
                                  <div className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-xs text-rose-300 font-bold">Fase Aguda: HCO3 ↑ 1 mmol/L</div>
                                  <div className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-xs text-amber-300 font-bold">Fase Crônica: HCO3 ↑ 4 a 5 mmol/L</div>
                               </div>
                             </div>

                             {/* Alc Resp */}
                             <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                               <strong className="text-white text-xs block mb-1">Se Alcalose Respiratória: Qual o HCO₃ Esperado?</strong>
                               <p className="text-[10px] text-slate-400 mb-1">Para cada 10 mmHg abaixo de 40 de pCO₂:</p>
                               <div className="flex gap-2">
                                  <div className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-xs text-rose-300 font-bold">Fase Aguda: HCO3 ↓ 2 mmol/L</div>
                                  <div className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-xs text-amber-300 font-bold">Fase Crônica: HCO3 ↓ 4 a 5 mmol/L</div>
                               </div>
                             </div>
                          </div>

                       </div>
                    </div>
                  </div>
               </div>
             </motion.div>
          )}

          {/* TAB 3: Anion Gap */}
          {activeTab === 'anion-gap' && (
             <motion.div key="anion-gap" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column: AG */}
                  <div className="flex-1 space-y-6">
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                      <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        Como calcular o Ânion-Gap?
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        A soma das cargas de íons no plasma in vivo são iguais. O Ânion-Gap estima a quantidade de "ânions não medidos" (como lactato, cetoácidos). Cátions Medidos - Ânions Medidos.
                      </p>
                      
                      <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl text-center">
                         <span className="text-2xl font-mono font-black text-rose-400">
                           AG = Na⁺ - (Cl⁻ + HCO₃⁻)
                         </span>
                         <p className="text-xs text-rose-300 mt-2 font-bold uppercase">Valor de Referência: 10 ± 2 mmol/L</p>
                      </div>

                      <div className="mt-6 border-t border-slate-800 pt-4">
                         <strong className="text-white text-sm">Se o AG está ALTO (&gt; 12):</strong>
                         <p className="text-xs text-slate-400 mt-1 mb-3">Temos uma Acidose Metabólica com acúmulo de novos ácidos.</p>
                         <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                              <span className="text-rose-400 font-black relative px-1">L</span>actoacidose (Choque)<br/>
                              <span className="text-rose-400 font-black relative px-1">C</span>etoacidose (Diabética, Alcoólica)<br/>
                              <span className="text-rose-400 font-black relative px-1">A</span>vançada Insuf. Renal (Uremia)<br/>
                            </div>
                            <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                              <span className="text-rose-400 font-black relative px-1">I</span>ntoxicação (Salicilato, Etilenoglicol, Metanol)<br/>
                              Lise Tumoral/Rabdomiólise intensa.
                            </div>
                         </div>
                      </div>

                      <div className="mt-4 border-t border-slate-800 pt-4">
                         <strong className="text-white text-sm">Se o AG for NORMAL (Acidose Hiperclorêmica):</strong>
                         <p className="text-xs text-slate-400 mt-1 mb-3">O corpo perde HCO₃ e retém Cl⁻ para manter eletroneutralidade.</p>
                         <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300 text-xs">
                           - <strong>Perda TGI:</strong> Diarreias intensas, fístulas.<br/>
                           - <strong>Renais:</strong> Acidose Tubular Renal (ATR).<br/>
                           - <strong>Iatrogênica:</strong> Soros ricos em Cloreto (Soro Fisiológico 0.9%).
                         </div>
                      </div>
                    </div>

                    {/* Albumina */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
                       <span className="absolute top-2 right-2 text-amber-500 opacity-20"><AlertCircle size={60}/></span>
                       <strong className="text-amber-400 uppercase text-[10px] font-black tracking-widest block mb-2">Correção pela Albumina (Pegadinha)</strong>
                       <p className="text-xs text-slate-300 relative z-10 leading-relaxed mb-2">
                         A Albumina é um ácido fraco e compõe boa parte do Ânion-Gap basal normal. Se a albumina cai, o AG cai "falsamente". Um AG que parece normal num doente hipoalbuminêmico talvez esteja na verdade elevadíssimo!
                       </p>
                       <div className="font-mono text-[10px] text-amber-200 bg-amber-950/20 p-2 rounded border border-amber-900/40 relative z-10 font-bold">
                         Para cada redução de 1g/dL na Albumina basal (normal 4.0), some 2.5 no AG achado.
                       </div>
                    </div>
                  </div>

                  {/* Right Column: Delta Delta */}
                  <div className="flex-1">
                    <div className="bg-indigo-950/20 border border-indigo-900/40 p-6 rounded-[2rem] h-full">
                      <h3 className="text-xl font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        O Delta-Delta (Relação ΔAG / ΔHCO₃)
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        É usado <strong>apenas em Acidoses com AG Elevado</strong>. Ele responde à pergunta: <em>"Será que TODO o bicarbonato que caiu foi apenas tamponando esses novos ácidos (AG) crescentes, ou existia outro vilão oculto (outra acidose consumindo ou outra alcalose segurando o HCO3)?"</em>
                      </p>
                      
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center mb-6">
                        <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Fórmula Delta Δ</span>
                        <div className="font-mono text-indigo-400 font-extrabold text-lg">
                           (AG Calculado - 10) / (24 - HCO₃ Medido)
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">Diferença do AG / Diferença da Queda do HCO3.</p>
                      </div>

                      <div className="space-y-4">
                         <div className="bg-slate-900 border-l-4 border-emerald-500 p-4 rounded text-sm text-slate-300">
                           <strong className="text-white block mb-1">1 a 2 (Normal)</strong>
                           Para cada ácido fabricado, um bicarbonato foi lá tamponar. Distúrbio puro: <strong>Só existe Acidose Metabólica de Elevado AG.</strong>
                         </div>
                         <div className="bg-slate-900 border-l-4 border-amber-500 p-4 rounded text-sm text-slate-300">
                           <strong className="text-white block mb-1">Maior que 2 (&gt;2)</strong>
                           O AG subiu muito (temos ácido), mas o bicarbonato caiu muito pouco (Δ baixo em baixo). Quem segurou o HCO3 de cair? Uma <strong>Alcalose Metabólica Associada</strong> (ex: Paciente vomitando, usando diurético).
                         </div>
                         <div className="bg-slate-900 border-l-4 border-rose-500 p-4 rounded text-sm text-slate-300">
                           <strong className="text-white block mb-1">Menor que 1 (&lt;1)</strong>
                           O bicarbonato caiu bizarramente mais do que o AG exigia (Δ alto em baixo). Quem roubou os bic? Tem uma <strong>Acidose Metabólica de AG Normal associada</strong> junto (ex: CAD + Diarreia intensa).
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

             </motion.div>
          )}

          {/* TAB 4: Casos Clinicos */}
          {activeTab === 'casos' && (
             <motion.div key="casos" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                
                <h3 className="text-xl font-black text-white uppercase tracking-widest px-2">Aplicações Reais</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   
                   {/* Caso 1 */}
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                      <div className="bg-indigo-900/30 p-4 border-b border-indigo-900/50">
                        <strong className="text-indigo-400 text-sm uppercase">1. Jovem, Pielonefrite + Rebaixamento</strong>
                        <p className="text-xs text-slate-300 mt-1">Gaso: pH 7.31 | PCO2 30 | HCO3 12 | BE -12 <br/> Na 140 / Cl 104 (dados supostos).</p>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="space-y-3 text-xs text-slate-400">
                           <div><strong className="text-white">Diagnóstico Inicial:</strong> Acidose Metabólica (pH &lt;7.4 e HCO3 &lt;24).</div>
                           <div><strong className="text-white">Fórmula PCO2 Esperado:</strong> (1.5 x 12) + 8 = 18 + 8 = 26 ± 2. (Gama: 24 a 28).</div>
                           <div><strong className="text-white">Interpretação PCO2:</strong> O PCO2 medido foi 30! Maior do que o esperado (o pulmão não hiperventilou como devia). </div>
                           <div className="p-2 border border-rose-900/40 bg-rose-950/20 rounded mt-2 text-rose-300 font-bold uppercase tracking-wider text-center">
                              Acidose Metabólica + Acidose Respiratória
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Caso 2 */}
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                      <div className="bg-amber-900/30 p-4 border-b border-amber-900/50">
                        <strong className="text-amber-400 text-sm uppercase">2. DPOC Exacerbado</strong>
                        <p className="text-xs text-slate-300 mt-1">Gaso Admissão: pH 7.28 | PCO2 73 | HCO3 33 <br/> Gaso Basal (30d atrás): pH 7.41 | PCO2 50 | HCO3 31</p>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="space-y-3 text-xs text-slate-400">
                           <div><strong className="text-white">Diagnóstico Inicial:</strong> Acidose Respiratória (pH &lt;7.4, PCO2 &gt;45).</div>
                           <div><strong className="text-white">Temos um baseline prévio:</strong> PCO2 dele era 50, subiu para 73 (Δ PCO2 = ~23).</div>
                           <div><strong className="text-white">Resposta Estimada (Aguda):</strong> Para cada 10 PCO2, o HCO3 sobe 1. Se subiu ~20 de PCO2, HCO3 deve subir em 2. Sairia de 31 e iria para 33.</div>
                           <div className="p-2 border border-emerald-900/40 bg-emerald-950/20 rounded mt-2 text-emerald-300 font-bold uppercase tracking-wider text-center">
                              Acidose Respiratória Aguda sobre Crônica
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Caso 3 */}
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                      <div className="bg-sky-900/30 p-4 border-b border-sky-900/50">
                        <strong className="text-sky-400 text-sm uppercase">3. DRGE + Vômitos Incoercíveis + Milanta</strong>
                        <p className="text-xs text-slate-300 mt-1">Gaso: pH 7.48 | PCO2 47 | HCO3 32</p>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="space-y-3 text-xs text-slate-400">
                           <div><strong className="text-white">Diagnóstico Inicial:</strong> Alcalose Metabólica (pH &gt;7.45, HCO3 alto). Ocorre pela perda brutal de ácido H+ e cloro no vômito, somada à antiascidas básicos ingeridos.</div>
                           <div><strong className="text-white">PCO2 Esperado:</strong> HCO3 + 15 = 32 + 15 = 47.</div>
                           <div><strong className="text-white">Interpretação PCO2:</strong> O PCO2 medido é exatamente 47. Pulmão está segurando ar (hipoventilando) perfeitamente pra reter ácido CO2 e tamponar a base exagerada no sangue.</div>
                           <div className="p-2 border border-sky-900/40 bg-sky-950/20 rounded mt-2 text-sky-300 font-bold uppercase tracking-wider text-center">
                              Alcalose Metabólica Pura
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Caso 4 */}
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                      <div className="bg-teal-900/30 p-4 border-b border-teal-900/50 relative">
                        <strong className="text-teal-400 text-sm uppercase">4. CAD de Longa Data + Confusão</strong>
                        <p className="text-xs text-slate-300 mt-1">Gaso: pH 7.38 | PCO2 24 | HCO3 12 | Na 145 | Cl 88</p>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="space-y-3 text-xs text-slate-400">
                           <div><strong className="text-white">Fórmulas:</strong> PCO2 Esperado: 24. PCO2 Medido: 24. A compensação respiratória está correta (Acidose Metabólica Pura).</div>
                           <div><strong className="text-white">Calculo AG:</strong> 145 - (88 + 12) = 145 - 100 = 45! (AG Extremo).</div>
                           <div><strong className="text-white">Mas o Hco3 é 12?</strong> ΔAG = 45 - 10 = 35. E o ΔHco3 = 24 - 12 = 12. </div>
                           <div>O Delta-Delta é absurdo, o AG subiu +35, mas só caiu -12 de HCO3. Alguém ta falsamente segurando alcalose no sangue do cara! Os infinitos vômitos da CAD do paciente!</div>
                           <div className="p-2 border border-teal-900/40 bg-teal-950/20 rounded mt-2 text-teal-300 font-bold uppercase tracking-wider text-center">
                              Acidose Met AG Alto + Alcalose Metabólica
                           </div>
                        </div>
                      </div>
                   </div>

                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
