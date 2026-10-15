import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Baby, Syringe, Calendar, TestTube, AlertCircle, 
  Droplet, Activity, Info, CheckCircle2, Search, HeartPulse,
  ShieldCheck, ArrowRight, Clock
} from 'lucide-react';

const prenatalTabs = [
  { id: 'rotina', label: 'Rotina e Consultas', icon: Calendar, color: 'text-rose-400', bg: 'bg-rose-950/40', border: 'border-rose-900/50', activeBorder: 'border-rose-500', shadow: 'shadow-[0_0_15px_rgba(251,113,133,0.2)]' },
  { id: 'suplementacao', label: 'Suplementação', icon: Droplet, color: 'text-amber-400', bg: 'bg-amber-950/40', border: 'border-amber-900/50', activeBorder: 'border-amber-500', shadow: 'shadow-[0_0_15px_rgba(251,191,36,0.2)]' },
  { id: 'exames', label: 'Exames', icon: TestTube, color: 'text-blue-400', bg: 'bg-blue-950/40', border: 'border-blue-900/50', activeBorder: 'border-blue-500', shadow: 'shadow-[0_0_15px_rgba(96,165,250,0.2)]' },
  { id: 'vacinas', label: 'Vacinas', icon: Syringe, color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-900/50', activeBorder: 'border-emerald-500', shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.2)]' },
  { id: 'alertas', label: 'Sinais de Alerta', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-950/40', border: 'border-red-900/50', activeBorder: 'border-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.2)]' }
];

export default function PrenatalMain() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(prev => prev === tabId ? null : tabId);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Baby size={200} />
        </div>
        <div className="relative z-10 w-full md:w-3/4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-rose-500/20 rounded-lg">
              <Baby className="text-rose-400" size={24} />
            </div>
            <span className="text-rose-400 font-bold tracking-widest uppercase text-sm">Ginecologia e Obstetrícia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Pré-Natal de Baixo Risco</h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-bold">
            Roteiro estruturado e progressivo focado na condução clínica prática. Entenda a periodicidade das consultas, imunizações essenciais, exames por trimestre e as condutas para suplementação vitamínica.
          </p>
        </div>
      </div>

      {/* TABS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {prenatalTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-3xl border transition-all duration-300 ${tab.bg} ${isActive ? `${tab.activeBorder} ${tab.shadow} scale-[1.02]` : `${tab.border} hover:border-slate-500 hover:bg-slate-800/80`}`}
            >
              <Icon className={`${tab.color} mb-3`} size={28} />
              <span className={`text-xs md:text-sm font-black uppercase tracking-widest text-center ${tab.color}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTENT AREA */}
      <AnimatePresence mode="wait">
        {activeTab === 'rotina' && (
          <motion.div key="rotina" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-lg">
               <h3 className="text-xl font-black text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                 <Calendar className="text-rose-400" /> Linha do Tempo: Mês a Mês
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {[
                    { month: '1º Mês', weeks: '0 - 4 sem', info: 'Início Ácido Fólico. Confirmação Beta-hCG. Datar gestação (DUM).', col: 'border-l-indigo-500' },
                    { month: '2º Mês', weeks: '5 - 8 sem', info: '1ª Consulta. Avaliar fatores de risco e solicitar Exames do 1º Trimestre. USG USG Transvaginal precoce.', col: 'border-l-indigo-500' },
                    { month: '3º Mês', weeks: '9 - 13 sem', info: 'USG Morfológica do 1º Trimestre (TN - 11 a 13 sem). Fim do Ácido Fólico profilático.', col: 'border-l-indigo-500' },
                    
                    { month: '4º Mês', weeks: '14 - 17 sem', info: 'Acompanhar Altura Uterina (AU) e Ausculta do BCF. Pressão Arterial em cada visita.', col: 'border-l-rose-500' },
                    { month: '5º Mês', weeks: '18 - 22 sem', info: 'USG Morfológica 2º Tri. Introdução formal de Sulfato Ferroso (20 sem). Vacina dTpa (após 20 sem).', col: 'border-l-rose-500' },
                    { month: '6º Mês', weeks: '23 - 27 sem', info: 'Rastreio de Diabetes Gestacional (Teste de Tolerância Oral à Glicose - TOTG 75g entre 24-28 sem).', col: 'border-l-rose-500' },
                    
                    { month: '7º Mês', weeks: '28 - 31 sem', info: 'Se mãe Rh negativo: Coombs Indireto (28 sem) e avaliar Ig Anti-D. Consultas quinzenais.', col: 'border-l-amber-500' },
                    { month: '8º Mês', weeks: '32 - 35 sem', info: 'Repetir exames laboratoriais (VDRL, HIV). Coletar Swab Vaginal/Retal para EGB (35 a 37 sem).', col: 'border-l-amber-500' },
                    { month: '9º Mês', weeks: '36 - 40+ sem', info: 'Consultas Semanais. Checar vitalidade fetal e Apresentação (cefálica/pélvica). Decidir via de parto.', col: 'border-l-amber-500' }
                  ].map((item, idx) => (
                    <div key={idx} className={`bg-slate-950 border border-slate-800 p-4 rounded-xl border-l-4 ${item.col} flex flex-col justify-between hover:bg-slate-900 transition-colors`}>
                       <div>
                          <div className="flex items-center justify-between mb-2">
                             <strong className="text-white text-xs uppercase tracking-widest">{item.month}</strong>
                             <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800 flex items-center gap-1">
                               <Clock size={10} /> {item.weeks}
                             </span>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed font-medium">{item.info}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-center">
                  <div className="flex-1">
                     <strong className="text-white text-sm block mb-4 uppercase tracking-widest border-b border-slate-800 pb-2">3 Pilares de Toda Consulta</strong>
                     <ul className="flex flex-col md:flex-row gap-4">
                        <li className="flex items-start gap-3 flex-1">
                           <Activity className="text-rose-400 shrink-0" size={16} />
                           <div>
                             <span className="text-slate-300 text-xs font-bold block">PA + Peso</span>
                             <span className="text-[10px] text-slate-500 uppercase mt-1 block">Rastreio de Pré-Eclâmpsia e estado nutricional.</span>
                           </div>
                        </li>
                        <li className="flex items-start gap-3 flex-1">
                          <HeartPulse className="text-rose-400 shrink-0" size={16} />
                          <div>
                             <span className="text-slate-300 text-xs font-bold block">BCF / Batimentos</span>
                             <span className="text-[10px] text-slate-500 uppercase mt-1 block">Sonar (10s) ou Pinard (20s). 110-160 bpm.</span>
                           </div>
                        </li>
                        <li className="flex items-start gap-3 flex-1">
                          <Search className="text-rose-400 shrink-0" size={16} />
                          <div>
                             <span className="text-slate-300 text-xs font-bold block">Altura Uterina</span>
                             <span className="text-[10px] text-slate-500 uppercase mt-1 block">Avaliar fundo uterino, crescimento e liq. amniótico (após 20s).</span>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'suplementacao' && (
          <motion.div key="suplementacao" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-lg">
               <h3 className="text-xl font-black text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                 <Droplet className="text-amber-400" /> Suplementação Obrigatória
               </h3>
               
               <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-amber-950/20 border border-amber-900/40 p-5 rounded-xl">
                    <strong className="text-amber-400 text-sm block mb-2 uppercase tracking-widest border-b border-amber-900/50 pb-2">
                       Ácido Fólico (Prevenção de DTN)
                    </strong>
                    <div className="space-y-3 mt-4">
                       <div className="bg-slate-950 p-3 rounded border border-slate-800">
                          <strong className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Período Ideal</strong>
                          <p className="text-xs text-slate-200 font-bold">1 Mês AC antes da gravidez até o fim do 1º Trimestre.</p>
                       </div>
                       <div className="bg-slate-950 p-3 rounded border border-slate-800">
                          <strong className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Dose Rotina (Baixo Risco)</strong>
                          <p className="text-xs text-amber-300 font-bold bg-amber-950/30 p-2 rounded inline-block text-[14px]">0,4 mg / dia (400 mcg)</p>
                       </div>
                       <div className="bg-slate-950 p-3 rounded border border-red-900/30 border-l-2 border-l-red-500">
                          <strong className="text-[10px] text-red-400 uppercase tracking-widest block mb-1">Dose Alto Risco*</strong>
                          <p className="text-xs text-slate-200 font-bold">4 a 5 mg / dia</p>
                          <p className="text-[9px] text-slate-400 mt-1 uppercase">*Uso de anticonvulsivantes, DM prévia, filho anterior com Defeito do Tubo Neural (DTN).</p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-xl">
                    <strong className="text-white text-sm block mb-2 uppercase tracking-widest border-b border-slate-700 pb-2 flex items-center gap-2">
                       <img src="https://api.iconify.design/mdi:molecule.svg?color=%2394a3b8" alt="Ferro" className="w-5 h-5 opacity-80"/> Sulfato Ferroso (Fe)
                    </strong>
                    <div className="space-y-3 mt-4">
                       <div className="bg-slate-950 p-3 rounded border border-slate-800">
                          <strong className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Período Ideal (Profilaxia)</strong>
                          <p className="text-xs text-slate-200 font-bold">A partir da 20ª semana até 3 meses pós-parto.</p>
                       </div>
                       <div className="bg-slate-950 p-3 rounded border border-slate-800">
                          <strong className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Dose Profilática (Hb &gt; 11 g/dL)</strong>
                          <p className="text-xs text-slate-300 font-bold">
                             <span className="text-white bg-slate-800 px-2 py-1 rounded">40 a 60 mg/dia</span> de Fe elementar.
                          </p>
                       </div>
                       <div className="bg-slate-950 p-3 rounded border border-rose-900/30 border-l-2 border-l-rose-500">
                          <strong className="text-[10px] text-rose-400 uppercase tracking-widest block mb-1">Dose Tratamento Anemia (Hb &lt; 11 g/dL)</strong>
                          <p className="text-xs text-slate-200 font-bold">
                             <span className="text-rose-300">120 a 200 mg/dia</span> de Fe elementar.
                          </p>
                          <p className="text-[9px] text-slate-400 mt-1 uppercase">Repetir hemograma em 30-60 dias.</p>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'exames' && (
          <motion.div key="exames" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-lg">
               <h3 className="text-xl font-black text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                 <TestTube className="text-blue-400" /> Pacote de Exames (Por Trimestre)
               </h3>
               
               <div className="space-y-3">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-hidden relative group">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                     <strong className="text-blue-400 text-sm block mb-2 uppercase tracking-widest">1º Trimestre (Rotina Inicial)</strong>
                     <div className="flex flex-wrap gap-2 text-xs font-bold font-mono">
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Hemograma</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Tipagem ABO/Rh (Coombs Indireto se Rh-)</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Glicemia Jejum</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">VDRL</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Rastreio HIV (TR ou ELISA)</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">HBsAg</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Toxoplasmose (IgG/IgM)</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Urina I + Urocultura</span>
                     </div>
                     <div className="mt-3 text-[11px] text-slate-400 uppercase tracking-widest border-t border-slate-800/80 pt-2 flex items-center gap-2">
                        <Info size={14} className="text-blue-500"/> USG Obstétrica precoce preferencial para datar gestação (CCN 7-12 semanas).
                     </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-hidden relative group">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                     <strong className="text-amber-400 text-sm block mb-2 uppercase tracking-widest flex items-center justify-between">
                        2º Trimestre (24 a 28 semanas)
                     </strong>
                     <div className="flex flex-wrap gap-2 text-xs font-bold font-mono">
                        <span className="bg-amber-950/20 px-2 py-1 rounded border border-amber-900/40 text-amber-300">TOTG 75g (Jejum, 1h, 2h)</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Repetir VDRL</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Repetir HIV</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Urina I + Urocultura</span>
                     </div>
                     <p className="text-[10px] text-amber-500 font-bold uppercase mt-2">Dica: O TOTG é o exame chave aqui para pesquisa universal de DMG.</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-hidden relative group">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                     <strong className="text-emerald-400 text-sm block mb-2 uppercase tracking-widest">3º Trimestre (35 a 37 semanas)</strong>
                     <div className="flex flex-wrap gap-2 text-xs font-bold font-mono">
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Repetir Hemograma</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Repetir VDRL, HIV, Hep B/C</span>
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">Urina I + Urocultura</span>
                        <span className="bg-emerald-950/20 px-2 py-1 rounded border border-emerald-900/40 text-emerald-300">Swab Vaginal/Retal (Estreptococo GB)</span>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'vacinas' && (
          <motion.div key="vacinas" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-lg">
               <h3 className="text-xl font-black text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                 <Syringe className="text-emerald-400" /> Imunização Na Gestação
               </h3>
               
               <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                     <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex items-start gap-4">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                        <div>
                           <strong className="text-emerald-400 text-sm block uppercase tracking-widest">dTpa (Tríplice Bacteriana Acelular)</strong>
                           <p className="text-xs text-slate-300 mt-1">
                              <strong>Obrigatória em TODA gestação</strong>, a partir da 20ª semana.<br/>
                              Objetivo: Transferir anticorpos contra Coqueluche para o feto.
                           </p>
                        </div>
                     </div>
                     <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex items-start gap-4">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                        <div>
                           <strong className="text-emerald-400 text-sm block uppercase tracking-widest">Influenza (Gripe)</strong>
                           <p className="text-xs text-slate-300 mt-1">
                              Em qualquer período gestacional durante a campanha (vírus inativado).
                           </p>
                        </div>
                     </div>
                     <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex items-start gap-4">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                        <div>
                           <strong className="text-emerald-400 text-sm block uppercase tracking-widest">Hepatite B</strong>
                           <p className="text-xs text-slate-300 mt-1">
                              Se histórico vacinal incerto ou incompleto. São 3 doses (0, 1 e 6 meses).
                           </p>
                        </div>
                     </div>
                     <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex items-start gap-4">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                        <div>
                           <strong className="text-emerald-400 text-sm block uppercase tracking-widest">COVID-19</strong>
                           <p className="text-xs text-slate-300 mt-1">
                              Segundo calendário vigente (evitar vacinas de vetor viral no Brasil).
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-red-950/10 border border-red-900/30 p-5 rounded-xl h-full flex flex-col justify-center gap-4">
                     <span className="bg-red-500/20 text-red-400 font-black text-[11px] uppercase tracking-widest px-3 py-1 rounded inline-flex self-start items-center gap-2">
                        <AlertCircle size={14}/> Cuidado - Evitar!
                     </span>
                     <p className="text-xs text-slate-300 font-bold leading-relaxed mb-2">
                        Vacinas de MICOORGANISMOS VIVOS ATENUADOS são **CONTRAINDICADAS** na gravidez habitual:
                     </p>
                     <ul className="text-xs text-slate-400 space-y-2 uppercase tracking-wide font-mono">
                        <li>• Tríplice Viral (Sarampo, Caxumba, Rubéola)</li>
                        <li>• Varicela</li>
                        <li>• Febre Amarela <span className="text-[9px] text-slate-500 ml-1 block lowercase tracking-normal">(salvo situações excepcionais de altíssimo risco epidemiológico/surto, risco &gt; benefício)</span></li>
                        <li>• HPV</li>
                     </ul>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'alertas' && (
          <motion.div key="alertas" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-lg">
               <h3 className="text-xl font-black text-slate-200 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                 <ShieldCheck className="text-red-500" /> Red Flags na UBS (Encaminhamento / PS)
               </h3>
               
               <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl border-l-4 border-l-red-500 flex flex-col justify-between">
                     <div>
                        <strong className="text-red-400 text-xs block mb-1 uppercase tracking-widest">Pressão Arterial Elevada</strong>
                        <p className="text-sm text-slate-300 leading-tight">PA ≥ 140/90 mmHg</p>
                     </div>
                     <p className="text-[10px] text-slate-500 uppercase mt-2 border-t border-slate-800 pt-2">Suspeita de Pré-Eclâmpsia ou Hipertensão Gestacional.</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl border-l-4 border-l-red-500 flex flex-col justify-between">
                     <div>
                        <strong className="text-red-400 text-xs block mb-1 uppercase tracking-widest">Sangramento Vaginal</strong>
                        <p className="text-sm text-slate-300 leading-tight">Em qualquer etapa da gestação.</p>
                     </div>
                     <p className="text-[10px] text-slate-500 uppercase mt-2 border-t border-slate-800 pt-2">1º Tri: Ameaça de aborto / Ectópica. 3º Tri: DPP / Placenta Prévia.</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl border-l-4 border-l-red-500 flex flex-col justify-between">
                     <div>
                        <strong className="text-red-400 text-xs block mb-1 uppercase tracking-widest">Perda de Líquido</strong>
                        <p className="text-sm text-slate-300 leading-tight">Rotura Prematura de Membranas Ovulares (RPMO).</p>
                     </div>
                     <p className="text-[10px] text-slate-500 uppercase mt-2 border-t border-slate-800 pt-2">Risco de corioamnionite ou parto prematuro.</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl border-l-4 border-l-red-500 flex flex-col justify-between">
                     <div>
                        <strong className="text-red-400 text-xs block mb-1 uppercase tracking-widest">Redução de BCF ou Movimentação</strong>
                        <p className="text-sm text-slate-300 leading-tight">Sinal cardinal de sofrimento fetal.</p>
                     </div>
                     <p className="text-[10px] text-slate-500 uppercase mt-2 border-t border-slate-800 pt-2">Exige cardiotocografia ou USG Doppler de emergência.</p>
                  </div>
               </div>

               <div className="mt-4 bg-red-950/20 border border-red-900/50 p-4 rounded-xl flex items-center justify-between text-xs text-red-200">
                  <span className="uppercase tracking-widest font-black">Qualquer red flag detectado na consulta:</span>
                  <span className="bg-red-500 text-white font-bold px-3 py-1 rounded flex items-center gap-1">ENCAMINHAR AO PRONTO SOCORRO OBSTÉTRICO <ArrowRight size={14}/></span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
