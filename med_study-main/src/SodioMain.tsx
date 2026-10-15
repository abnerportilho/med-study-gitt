import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Workflow, Target, ArrowRight, Brain, AlertTriangle, ChevronLeft, Droplet } from 'lucide-react';

export default function SodioMain() {
  const [activeDisturbio, setActiveDisturbio] = useState<'hipo' | 'hiper' | null>(null);
  const [activeNodeHipo, setActiveNodeHipo] = useState<string | null>(null);
  const [activeNodeHiper, setActiveNodeHiper] = useState<string | null>(null);
  const [hipoTab, setHipoTab] = useState<'definicao' | 'fisiopato' | 'clinica' | 'fluxograma' | 'tratamento'>('definicao');
  const [hiperTab, setHiperTab] = useState<'definicao' | 'fisiopato' | 'diabetes' | 'fluxograma' | 'tratamento'>('definicao');

  const [pesoAdrogue, setPesoAdrogue] = useState<number | ''>(70);
  const [sexoAdrogue, setSexoAdrogue] = useState<'homem' | 'mulher' | 'idoso' | 'idosa'>('homem');
  const [naPacienteAdrogue, setNaPacienteAdrogue] = useState<number | ''>(120);
  const [solucaoAdrogue, setSolucaoAdrogue] = useState<number>(513);
  const [metaAdrogue, setMetaAdrogue] = useState<number | ''>(8);
  const [horasAdrogue, setHorasAdrogue] = useState<number | ''>(24);

  let act = 0;
  const pesoVal = typeof pesoAdrogue === 'number' ? pesoAdrogue : 0;
  if (sexoAdrogue === 'homem') act = pesoVal * 0.6;
  if (sexoAdrogue === 'mulher') act = pesoVal * 0.5;
  if (sexoAdrogue === 'idoso') act = pesoVal * 0.5;
  if (sexoAdrogue === 'idosa') act = pesoVal * 0.45;

  const naPacVal = typeof naPacienteAdrogue === 'number' ? naPacienteAdrogue : 120;
  const deltaNaAdrogue = act > 0 ? (solucaoAdrogue - naPacVal) / (act + 1) : 0;
  
  const metaVal = typeof metaAdrogue === 'number' ? metaAdrogue : 8;
  const horasVal = typeof horasAdrogue === 'number' ? horasAdrogue : 24;
  const volumeNecessarioL = Math.abs(deltaNaAdrogue) > 0 ? (metaVal / Math.abs(deltaNaAdrogue)) : 0;
  const volumeNecessarioML = volumeNecessarioL * 1000;
  const velocidadeInfusaoMLh = horasVal > 0 ? volumeNecessarioML / horasVal : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] z-0">
          <Waves size={200} />
        </div>
        <div className="relative z-10 w-full flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 text-indigo-500 mb-3">
              <Waves size={28} className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.25em]">Medicina Intensiva</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight uppercase">Distúrbios do Sódio</h1>
            <p className="text-slate-400 mt-2 max-w-3xl leading-relaxed text-sm md:text-base">
              O sódio (Na+) é o principal determinante da osmolaridade sérica. Distúrbios de sódio são essencialmente distúrbios de <strong>água livre</strong> no corpo.
            </p>
          </div>
          {activeDisturbio && (
             <button 
             onClick={() => setActiveDisturbio(null)}
             className="px-4 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white rounded-xl flex items-center gap-2 font-bold text-sm transition-all shadow-md"
           >
             <ChevronLeft size={16} /> Voltar
           </button>
          )}
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-[2rem] border border-slate-800 p-6 md:p-8 shadow-xl">
        <AnimatePresence mode="wait">
          {!activeDisturbio ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
               {/* Fisiologia BÃ¡sica Overview */}
              <div className="col-span-1 md:col-span-2 bg-indigo-950/20 border border-indigo-900/40 p-6 rounded-2xl mb-4">
                <h3 className="text-lg font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Brain size={20} /> Fisiologia Essencial
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                  A <strong>Vasopressina (ADH)</strong> atua no ducto coletor reabsorvendo água livre, controlada por osmorreceptores no hipotálamo. <br/>
                  Valor normal do Na+: <strong>135 a 145 mEq/L</strong>. <br/>
                  Osmolaridade Efetiva Normal: <strong>285 a 290 mOsm/L</strong>. Formada por: (2 x Na+) + (Glicose / 18) + (Ureia / 6).
                </p>
              </div>

              {/* Hiponatremia Button */}
              <button
                onClick={() => setActiveDisturbio('hipo')}
                className="bg-blue-950/30 border border-blue-900/50 p-8 rounded-3xl text-left relative overflow-hidden group hover:bg-blue-950/50 transition-all shadow-lg hover:shadow-blue-900/20"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-900/40 text-blue-400 flex items-center justify-center mb-6 border border-blue-800/50">
                    <Droplet size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-blue-300 tracking-tight uppercase mb-2">Hiponatremia</h3>
                  <div className="text-xs font-bold text-white bg-blue-600/30 px-3 py-1 rounded-full inline-block mb-4 border border-blue-500/30">Na+ &lt; 135 mEq/L</div>
                  <p className="text-sm text-blue-200/70 font-medium leading-relaxed mb-6">
                    Classificação isotônica, hipotônica e hipertônica. Avaliação da volemia, SIADH e risco de mielinólise pontina central.
                  </p>
                  <div className="flex items-center text-blue-400 font-bold text-sm tracking-wide">
                    Estudar Hiponatremia <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* Hipernatremia Button */}
              <button
                onClick={() => setActiveDisturbio('hiper')}
                className="bg-rose-950/30 border border-rose-900/50 p-8 rounded-3xl text-left relative overflow-hidden group hover:bg-rose-950/50 transition-all shadow-lg hover:shadow-rose-900/20"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-rose-900/40 text-rose-400 flex items-center justify-center mb-6 border border-rose-800/50">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-rose-300 tracking-tight uppercase mb-2">Hipernatremia</h3>
                  <div className="text-xs font-bold text-white bg-rose-600/30 px-3 py-1 rounded-full inline-block mb-4 border border-rose-500/30">Na+ &gt; 145 mEq/L</div>
                  <p className="text-sm text-rose-200/70 font-medium leading-relaxed mb-6">
                    Déficit de água livre, Diabetes Insipidus, estados de desidratação e risco de edema cerebral no tratamento.
                  </p>
                  <div className="flex items-center text-rose-400 font-bold text-sm tracking-wide">
                    Estudar Hipernatremia <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            </motion.div>
          ) : activeDisturbio === 'hipo' ? (
             <motion.div 
               key="hipo"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="space-y-8"
             >
               <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                 <div className="w-10 h-10 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center">
                   <Droplet size={20} />
                 </div>
                 <h2 className="text-2xl font-black text-white uppercase tracking-tight">Hiponatremia (&lt; 135)</h2>
               </div>

               {/* Navigation Tabs */}
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 {[
                   { id: 'definicao', label: 'Definição' },
                   { id: 'fisiopato', label: 'Fisiopatologia' },
                   { id: 'clinica', label: 'Quadro Clínico' },
                   { id: 'fluxograma', label: 'Fluxograma' },
                   { id: 'tratamento', label: 'Tratamento' }
                 ].map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setHipoTab(tab.id as any)}
                     className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
                       hipoTab === tab.id 
                         ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 font-extrabold translate-y-[-2px]' 
                         : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                     }`}
                   >
                     {tab.label}
                   </button>
                 ))}
               </div>

               <AnimatePresence mode="wait">
                 {hipoTab === 'definicao' && (
                   <motion.div key="definicao" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-slate-950 border border-blue-900/40 p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
                       <h3 className="text-xl font-black text-blue-400 uppercase tracking-widest mb-4">O que é a Hiponatremia?</h3>
                       <p className="text-sm text-slate-300 leading-relaxed mb-4">
                         A hiponatremia é definida pela concentração plasmática de sódio <strong>&lt; 135 mEq/L</strong>. Representa o distúrbio eletrolítico mais comum na prática médica, especialmente em pacientes hospitalizados.
                       </p>
                       <p className="text-sm text-slate-300 leading-relaxed">
                         <strong className="text-blue-300">Atenção:</strong> Na imensa maioria das vezes, a hiponatremia não traduz "falta de sódio" no corpo, mas sim um <strong>excesso de água livre</strong> relativo à quantidade de sódio. É um distúrbio da regulação da água, não necessariamente do balanço de sódio.
                       </p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                         <strong className="text-rose-500 text-xs uppercase font-black tracking-wider block mb-2">Classificação de Gravidade</strong>
                         <ul className="text-sm text-slate-400 space-y-2">
                           <li><strong className="text-white">Leve:</strong> 130 a 134 mEq/L</li>
                           <li><strong className="text-white">Moderada:</strong> 125 a 129 mEq/L</li>
                           <li><strong className="text-white">Grave (Profunda):</strong> &lt; 125 mEq/L</li>
                         </ul>
                       </div>
                       <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                         <strong className="text-emerald-500 text-xs uppercase font-black tracking-wider block mb-2">Pelo Tempo de Instalação</strong>
                         <ul className="text-sm text-slate-400 space-y-2">
                           <li><strong className="text-white">Aguda:</strong> &lt; 48 horas (Alto risco de edema cerebral).</li>
                           <li><strong className="text-white">Crônica:</strong> &ge; 48 horas (Alto risco de desmielinização osmótica se corrigida rapidamente). O cérebro se adaptou.</li>
                         </ul>
                       </div>
                     </div>

                     <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] shadow-xl">
                       <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Classificação pela Osmolaridade Sérica</h3>
                       <p className="text-sm text-slate-400 mb-6 font-medium">Os valores da osmolalidade normal giram em torno de 275–295 mOsm/kg. Essa classificação inicial é fundamental.</p>
                       
                       <div className="space-y-4">
                         <div className="bg-blue-950/20 border border-blue-900/40 p-5 rounded-2xl">
                           <strong className="text-blue-400 text-sm uppercase tracking-widest font-black block mb-2">Hipertônica / Translocacional</strong>
                           <div className="flex items-center gap-2 mb-2">
                             <div className="text-xs bg-blue-600/30 text-blue-200 border border-blue-500/30 px-2 py-1 rounded-full font-bold">&gt; 295 mOsm/L</div>
                           </div>
                           <p className="text-sm text-slate-300 mb-3">
                             O osmol efetivo extracelular puxa água da célula para o plasma e dilui o Na (Ex: Hiperglicemia grave, CAD).<br/>
                             <strong className="text-white">Conduta:</strong> Tratar o osmol causador, não "repor sódio" cegamente.
                           </p>
                           <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                             <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Cálculo Prático - Sódio Corrigido (Hiperglicemia)</span>
                             <div className="text-xs text-blue-300 font-mono">
                               Na+ Corrigido ≈ Na+ Medido + 1,6 mEq/L (a cada 100mg/dL de glicose acima de 100)
                             </div>
                           </div>
                         </div>

                         <div className="bg-indigo-950/20 border border-indigo-900/40 p-5 rounded-2xl">
                           <strong className="text-indigo-400 text-sm uppercase tracking-widest font-black block mb-2">Isotônica / Pseudo-hiponatremia</strong>
                           <div className="flex items-center gap-2 mb-2">
                             <div className="text-xs bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 px-2 py-1 rounded-full font-bold">275 - 295 mOsm/L</div>
                           </div>
                           <p className="text-sm text-slate-300">
                             Artefato laboratorial derivado da fração aquosa plasmática reduzida (Ex: Hipertrigliceridemia grave, hiperproteinemia grave no Mieloma Múltiplo).<br/>
                             <strong className="text-white">Conduta:</strong> Não corrigir Na. Confirmar o método laboratorial/osmolalidade.
                           </p>
                         </div>

                         <div className="bg-rose-950/20 border border-rose-900/40 p-5 rounded-2xl">
                           <strong className="text-rose-400 text-sm uppercase tracking-widest font-black block mb-2">Hipotônica Verdadeira</strong>
                           <div className="flex items-center gap-2 mb-2">
                             <div className="text-xs bg-rose-600/30 text-rose-200 border border-rose-500/30 px-2 py-1 rounded-full font-bold">&lt; 275 mOsm/L</div>
                           </div>
                           <p className="text-sm text-slate-300">
                             <strong>Excesso real de água livre</strong> em relação aos solutos. É a hiponatremia clínica mais importante (Ex: Hipovolemia, SIADH, IC, Cirrose, Tiazídicos).<br/>
                             <strong className="text-white">Conduta:</strong> Classificar a partir da Volemia + Urina para tratar a causa referida.
                           </p>
                           
                           <div className="mt-4 bg-slate-900/60 border border-rose-900/30 p-4 rounded-xl space-y-4">
                             <strong className="text-rose-300 text-[10px] uppercase font-black tracking-widest block border-b border-rose-900/30 pb-2">Eixos de Investigação (Urina)</strong>
                             
                             <div>
                               <strong className="text-white text-xs block mb-1">1. Osmolaridade Urinária (Avalia ADH)</strong>
                               <p className="text-xs text-slate-300">
                                 <strong className="text-rose-300">&lt; 100 mOsm/kg:</strong> ADH suprimido. O rim está tentando eliminar água ativamente (Ex: Polidipsia primária, baixa ingesta).<br/>
                                 <strong className="text-rose-300">&gt; 100 mOsm/kg:</strong> ADH ativo. O rim está retendo água sob comando hormonal, apropriado ou inapropriado.
                               </p>
                             </div>

                             <div>
                               <strong className="text-white text-xs block mb-1">2. Sódio Urinário (Avalia SRAA)</strong>
                               <p className="text-xs text-slate-300">
                                 <strong className="text-rose-300">&lt; 20 a 30 mEq/L:</strong> SRAA ativado (Rim retendo Na+ para salvar Volemia). Causado por perdas extrarrenais (Vômitos, diarreia, IC, Cirrose).<br/>
                                 <strong className="text-rose-300">&gt; 20 a 30 mEq/L:</strong> SRAA não ativado adequadamente ou perda renal obrigatória. Causado por perdas renais (Diuréticos, SIADH).
                               </p>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 )}

                 {hipoTab === 'fisiopato' && (
                   <motion.div key="fisiopato" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-indigo-950/20 border border-indigo-900/40 p-6 rounded-[2rem]">
                       <h3 className="text-xl font-black text-indigo-400 uppercase tracking-widest mb-4">Eixo ADH e Osmolaridade</h3>
                       <p className="text-sm text-slate-300 leading-relaxed mb-4">
                         A regulação da osmolalidade, de maneira simplificada, se dá pelo ADH (Hormônio Antidiurético / Vasopressina). Quando a osmolalidade sobe (ex: privação de água), o hipotálamo secreta ADH, que age nos receptores V2 do ducto coletor abrindo aquaporinas para reter água livre.
                       </p>
                       <p className="text-sm text-slate-300 leading-relaxed">
                         Na hiponatremia verdadeira, na maioria das vezes, o <strong className="text-white">ADH está falsamente ou inadequadamente ativado</strong> (exemplo: por depleção de volume efetivo — como na insuficiência cardíaca e cirrose — ou secreção inapropriada na SIADH). O ADH retém a água, diluindo o sódio corporal.
                       </p>
                     </div>
                     <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-[2rem]">
                       <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         Adaptação Cerebral
                       </h4>
                       <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-indigo-500 pl-4 mb-4">
                         Na hiponatremia Aguda, a água entra nos neurônios (por serem hiperosmolares em relação ao sangue diluído), causando <strong className="text-red-400">Edema Cerebral</strong> rápido. É por isso que ela gera quadros neurológicos tão graves.
                       </p>
                       <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-emerald-500 pl-4">
                         Após 48h, as células cerebrais expulsam solutos (potássio, osmolitos orgânicos) para igualar a osmolaridade e voltar ao tamanho normal. Se o médico repõe sódio rápido demais nesse momento, a água sai abruptamente da célula desidratando os axônios: <strong className="text-rose-500 text-bold">Mielinólise Pontina Central</strong>.
                       </p>
                     </div>
                   </motion.div>
                 )}

                 {hipoTab === 'clinica' && (
                   <motion.div key="clinica" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                       <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Sinais Neurológicos</h3>
                       <p className="text-sm text-slate-400 leading-relaxed mb-6">
                         Os sintomas da hiponatremia dependem fundamentalmente de duas coisas: <strong>a velocidade de instalação e a gravidade da queda do sódio</strong>. A maioria dos pacientes com hiponatremia leve a moderada (&gt; 125) ou de longa data são assintomáticos.
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="bg-blue-950/20 border border-blue-900/30 p-5 rounded-2xl">
                           <strong className="text-blue-400 text-xs font-black uppercase block mb-2">Sintomas Leves / Inespecíficos</strong>
                           <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                             <li>Náuseas frequentes</li>
                             <li>Astenia crônica / Mal-estar</li>
                             <li>Cefaleia leve</li>
                             <li>Distúrbios de marcha e quedas em idosos</li>
                             <li>Alterações cognitivas sutis</li>
                           </ul>
                         </div>
                         <div className="bg-rose-950/20 border border-rose-900/30 p-5 rounded-2xl relative overflow-hidden">
                           <div className="absolute top-2 right-2 text-rose-500/20"><AlertTriangle size={60} /></div>
                           <strong className="text-rose-400 text-xs font-black uppercase block mb-2 relative z-10">Sintomas Graves (Emergência)</strong>
                           <ul className="text-sm text-white space-y-2 list-disc list-inside relative z-10">
                             <li>Vômitos incoercíveis</li>
                             <li>Confusão mental aguda / Delirium</li>
                             <li>Rebaixamento do nível de consciência</li>
                             <li><strong>Convulsões refratárias</strong></li>
                             <li>Coma / Parada respiratória (herniação)</li>
                           </ul>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 )}

                 {hipoTab === 'fluxograma' && (
                   <motion.div key="fluxograma" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                     <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] shadow-xl">
                       <h3 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                         <Workflow size={24} className="text-indigo-500" /> Investigação Diagnóstica Passo a Passo
                       </h3>
                       
                       {/* Pergunta 1 */}
                       <div className="bg-blue-950/20 border border-blue-900/50 p-5 rounded-2xl mb-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5"><Workflow size={60} /></div>
                          <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black">1</div>
                            <div className="text-blue-400 font-black uppercase tracking-wide">Primeira Pergunta</div>
                          </div>
                          <p className="text-slate-300 text-sm mb-4 relative z-10">
                            <strong className="text-white">Excluir hiponatremias não verdadeiras.</strong> Tem Osmolaridade Hipotônica?
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2">
                              <span className="text-rose-400 font-bold">&gt; 295 mOsm/L</span>
                              <span className="text-xs text-slate-400">Hipertônicas (Tratar causa, ex: Glicose)</span>
                            </div>
                            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2">
                              <span className="text-amber-400 font-bold">275-295 mOsm/L</span>
                              <span className="text-xs text-slate-400">Isotônicas (Pseudo, ex: Lipídios)</span>
                            </div>
                          </div>
                       </div>

                       {/* Pergunta 2 */}
                       <div className="bg-emerald-950/20 border border-emerald-900/50 p-5 rounded-2xl mb-4 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5"><Workflow size={60} /></div>
                          <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black">2</div>
                            <div className="text-emerald-400 font-black uppercase tracking-wide">Segunda Pergunta</div>
                          </div>
                          <p className="text-slate-300 text-sm mb-4 relative z-10">
                            <strong className="text-white">Exclusões Clínicas Frequentes.</strong> Avalie rapidamente três cenários comuns:
                          </p>
                          <ul className="text-sm text-slate-300 space-y-3 relative z-10">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                              <span><strong className="text-white">Tem disfunção renal?</strong> (Incapacidade de excretar água)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                              <span><strong className="text-white">Tem derrame, ascite ou edema?</strong> (Lembrar de IC, Cirrose, Síndrome Nefrótica)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                              <span><strong className="text-white">Usa diurético tiazídico?</strong> (Suspender! Causa clássica, especialmente em idosos)</span>
                            </li>
                          </ul>
                       </div>

                       {/* Pergunta 3 */}
                       <div className="bg-amber-950/20 border border-amber-900/50 p-5 rounded-2xl relative overflow-hidden">
                          <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black">3</div>
                            <div className="text-amber-400 font-black uppercase tracking-wide">Terceira Pergunta</div>
                          </div>
                          <p className="text-slate-300 text-sm mb-5 relative z-10">
                            <strong className="text-white block mb-1">Como está a volemia do paciente?</strong>
                            A partir da avaliação do estado volêmico, as opções se dividem:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                             {/* Hipovolemia */}
                             <div className="bg-slate-900/80 border border-slate-700/50 p-5 rounded-xl flex flex-col h-full">
                                <div className="text-rose-400 font-black tracking-widest text-sm mb-1 uppercase text-center border-b border-slate-800 pb-2">Hipovolemia</div>
                                <p className="text-[10px] text-slate-400 uppercase font-black text-center mb-4 mt-2 tracking-widest">Avaliar Na+ Urinário</p>
                                
                                <div className="space-y-3 flex-1">
                                   <div>
                                      <div className="bg-rose-950/50 text-rose-300 text-xs font-black px-2 py-1 rounded inline-block mb-1">&lt; 20 mEq/L</div>
                                      <p className="text-xs text-slate-300"><strong className="text-white">Perdas Extrarrenais:</strong> Diarreia, vômitos, hemorragias, queimaduras.</p>
                                   </div>
                                   <div>
                                      <div className="bg-rose-950/50 text-rose-300 text-xs font-black px-2 py-1 rounded inline-block mb-1">&gt; 20 mEq/L</div>
                                      <p className="text-xs text-slate-300"><strong className="text-white">Perdas Renais:</strong> Uso de diuréticos, Síndrome cerebral perdedora de sal, acidose tubular tipo II.</p>
                                   </div>
                                </div>
                             </div>

                             {/* Normovolemia */}
                             <div className="bg-slate-900/80 border border-slate-700/50 p-5 rounded-xl flex flex-col h-full">
                                <div className="text-emerald-400 font-black tracking-widest text-sm mb-1 uppercase text-center border-b border-slate-800 pb-2">Normovolemia</div>
                                <p className="text-[10px] text-slate-400 uppercase font-black text-center mb-4 mt-2 tracking-widest">Avaliar Osm Urinária</p>
                                
                                <div className="space-y-3 flex-1">
                                   <div>
                                      <div className="bg-emerald-950/50 text-emerald-300 text-xs font-black px-2 py-1 rounded inline-block mb-1">&lt; 100 mOsm/L</div>
                                      <p className="text-xs text-slate-300">Polidipsia primária, RTU, baixa ingestão de soluto.</p>
                                   </div>
                                   <div>
                                      <div className="bg-emerald-950/50 text-emerald-300 text-xs font-black px-2 py-1 rounded inline-block mb-1">&gt; 100 mOsm/L</div>
                                      <p className="text-xs text-slate-300">Hipotireoidismo, Insuficiência adrenal secundária, SIADH.</p>
                                   </div>
                                   
                                   <div className="mt-3 pt-3 border-t border-slate-800">
                                      <strong className="text-[10px] text-indigo-400 uppercase font-black block mb-1">Causas de SIADH:</strong>
                                      <ul className="text-[10px] text-slate-400 list-disc list-inside">
                                         <li>SNC: TCE, HSA, tumores</li>
                                         <li>Pulmão: Legionella, TB, Pnx</li>
                                         <li>Ca: Pequenas células pul., Próstata</li>
                                         <li>Drogas: Anticonvulsivantes, ISRS</li>
                                      </ul>
                                   </div>
                                </div>
                             </div>

                             {/* Hipervolemia */}
                             <div className="bg-slate-900/80 border border-slate-700/50 p-5 rounded-xl flex flex-col h-full">
                                <div className="text-blue-400 font-black tracking-widest text-sm mb-1 uppercase text-center border-b border-slate-800 pb-2">Hipervolemia</div>
                                <p className="text-[10px] text-slate-400 uppercase font-black text-center mb-4 mt-2 tracking-widest">Edema Clínico</p>
                                
                                <div className="flex-1">
                                   <p className="text-xs text-slate-300 mb-3">Incapacidade de excreção de água com sobrecarga de volume:</p>
                                   <ul className="text-xs text-slate-300 space-y-2">
                                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full"></div> Insuficiência Cardíaca</li>
                                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full"></div> Cirrose</li>
                                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full"></div> Síndrome Nefrótica</li>
                                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500 rounded-full"></div> Injúria/Doença Renal</li>
                                   </ul>
                                </div>
                             </div>
                          </div>
                       </div>
                     </div>

                     {/* Alerta de Conduta */}
                     <div className="bg-rose-950/30 border border-rose-900/50 rounded-[2rem] p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-6 opacity-10"><AlertTriangle size={120} /></div>
                       <div className="relative z-10">
                         <h4 className="text-2xl font-black text-rose-500 mb-2 uppercase tracking-tight flex items-center gap-2">
                           <AlertTriangle size={24} /> Desmielinização Osmótica
                         </h4>
                         <p className="text-sm text-rose-200/90 font-medium mb-4 max-w-3xl leading-relaxed">
                           O cérebro adapta-se à hiponatremia crônica eliminando osmolitos. Se você repuser sódio rápido demais, a água sai rápido do cérebro para o sangue, desidratando os neurônios (Mielinólise Pontina Central).
                         </p>
                         
                         <div className="bg-slate-950/80 border border-rose-900/30 p-4 rounded-xl max-w-2xl">
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <span className="text-[10px] uppercase font-black text-slate-500 block mb-1">Velocidade Máxima</span>
                               <span className="text-lg font-black text-white block">8 a 10 mEq/L <span className="text-xs text-rose-400 font-normal">/24h</span></span>
                             </div>
                             <div>
                               <span className="text-[10px] uppercase font-black text-slate-500 block mb-1">Crise Severa (Coma)</span>
                               <span className="text-white text-sm font-bold block">Salina 3% <span className="font-normal text-rose-300">(até sintoma cessar)</span></span>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 )}

                 {hipoTab === 'tratamento' && (
                   <motion.div key="tratamento" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                     
                     {/* Princípios de Conduta em Etapas */}
                     <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl">
                       <h3 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                         <Target size={24} className="text-rose-500" /> Fluxo de Tratamento
                       </h3>

                       <div className="grid md:grid-cols-2 gap-6 space-y-4 md:space-y-0">
                         {/* Grave / Emergência */}
                         <div className="bg-rose-950/20 border border-rose-900/50 p-5 rounded-2xl relative overflow-hidden flex flex-col items-start justify-start">
                           <div className="absolute top-2 right-2 p-4 opacity-5"><AlertTriangle size={80} /></div>
                           <strong className="text-rose-400 text-sm uppercase tracking-widest font-black block mb-2 z-10 flex items-center gap-2">
                             1. Sintomática Grave (Emergência)
                           </strong>
                           <p className="text-sm text-slate-300 leading-relaxed mb-4 z-10">
                             <strong>Critérios:</strong> Convulsões, coma, PCR, vômitos persistentes, sinais de herniação.<br/>
                             <span className="text-rose-300 font-medium">Conduta iminente, não espere exames completos para tratar o cérebro.</span>
                           </p>
                           
                           <div className="w-full bg-slate-900/80 border border-rose-900/40 p-4 rounded-xl z-10 mt-auto">
                             <span className="text-[10px] text-slate-400 font-black block uppercase mb-1">Prescrição Imediata:</span>
                             <p className="text-sm text-white font-black">NaCl 3% — 150 mL IV em 20 min</p>
                             <div className="mt-2 text-xs text-slate-300">
                               Reavaliar os sintomas. Repetir se sintomatologia ameaçadora não cessar, até melhora clínica ou meta (Δ de 5 mEq/L).
                               <div className="mt-2 flex items-center gap-2 bg-rose-950/40 text-rose-300 p-2 rounded-lg">
                                 <Target size={14} /> Meta inicial: ↑ 4 a 6 mEq/L
                               </div>
                             </div>
                           </div>
                         </div>

                         <div className="space-y-6">
                           {/* Moderados */}
                           <div className="bg-amber-950/20 border border-amber-900/50 p-5 rounded-2xl relative overflow-hidden">
                             <div className="absolute top-2 right-2 p-4 opacity-5"><AlertTriangle size={60} /></div>
                             <strong className="text-amber-400 text-sm uppercase tracking-widest font-black block mb-2 z-10">
                               2. Sintomas Moderados
                             </strong>
                             <p className="text-sm text-slate-300 leading-relaxed z-10 mb-2">
                               Confusão, cefaleia grave, vômitos infrequentes.
                             </p>
                             <div className="bg-slate-900/80 border border-amber-900/40 p-3 rounded-xl z-10">
                               <p className="text-xs text-white">
                                 Considere: <strong>NaCl 3% — 150 mL IV (20 min)</strong>. Suspenção guiada de medicações associadas, investigar causa ativamente. Alvo seguro também focado em melhora sintomática sem excessos.
                               </p>
                             </div>
                           </div>
                           
                           {/* Crônica / Leve / Assintomática */}
                           <div className="bg-emerald-950/20 border border-emerald-900/50 p-5 rounded-2xl relative overflow-hidden">
                             <strong className="text-emerald-400 text-sm uppercase tracking-widest font-black block mb-2 z-10">
                               3. Crônica / Leve (Assintomática)
                             </strong>
                             <p className="text-sm text-slate-300 leading-relaxed z-10 mb-3">
                               O tratamento é etiológico. Sem pressa (cuidado com mielinólise).
                             </p>
                             <ul className="text-xs text-slate-300 space-y-2 z-10">
                               <li className="flex gap-2">
                                 <div className="text-emerald-400 font-bold w-20 flex-shrink-0">Hipovolêmica:</div>
                                 <div className="text-white">SF 0,9% para restaurar volemia, reavaliações seriadas para evitar autocorreção abrupta.</div>
                               </li>
                               <li className="flex gap-2">
                                 <div className="text-emerald-400 font-bold w-20 flex-shrink-0">Euvolêmica:</div>
                                 <div className="text-white">SIADH: Restrição Hídrica + Retirar Causa + (às vezes aumentar soluto/ureia).</div>
                               </li>
                               <li className="flex gap-2">
                                 <div className="text-emerald-400 font-bold w-20 flex-shrink-0">Hipervolêmica:</div>
                                 <div className="text-white">Restrição Hídrica e Sódica + Diurético de Alça. Tratar Insuficiência Cardíaca/Cirrose.</div>
                               </li>
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Limites de Segurança & Risco */}
                     <div className="bg-slate-900/50 border border-rose-900/30 p-6 md:p-8 rounded-[2rem]">
                       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-slate-800 pb-4 gap-4 md:gap-0">
                         <h3 className="text-lg font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                           <AlertTriangle size={20} /> Limites de Segurança & Desmielinização Osmótica
                         </h3>
                       </div>

                       <div className="grid md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                           <p className="text-sm text-slate-300">
                             <strong>Risco Principal:</strong> Ao estabilizar-se à hiponatremia crônica, o cérebro elimina osmolitos intracelulares para prevenir edema. Corrigir o sódio excessivamente rápido re-hipertoniza o plasma bruscamente, atraindo a água e <strong>desidratando agressivamente os neurônios e axônios</strong>.
                           </p>
                           <div className="bg-rose-950/20 border-l-4 border-rose-500 p-4">
                             <strong className="text-white uppercase text-[10px] tracking-widest mb-1 block">Limites de Elevação do Sódio (Regra Prática)</strong>
                             <ul className="text-sm text-rose-200 mt-2 space-y-2">
                               <li>Não mais que <strong>8 a 10 mEq/L</strong> nas primeiras 24h. <span className="text-xs text-rose-400 block ml-4">(E 8 mEq/L nas próximas 24h)</span></li>
                               <li>Não tentar "normalizar" aos 140 na urgência!</li>
                             </ul>
                           </div>
                         </div>

                         <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-center">
                           <span className="text-[10px] text-rose-300 font-black uppercase tracking-widest mb-3 border-b border-slate-800/50 pb-2 inline-block">Grupos de Alto Risco para Desmielinização</span>
                           <ul className="text-xs text-slate-300 space-y-2 font-medium">
                             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div> Sódio inicial muito baixo (&le; 105 mEq/L)</li>
                             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div> Pacientes etilistas severos</li>
                             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div> Desnutrição grave</li>
                             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div> Hepatopatia avançada</li>
                             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div> Hipocalemia associada</li>
                           </ul>
                         </div>
                       </div>
                     </div>

                     {/* Componentes da Terapia */}
                     <div className="grid md:grid-cols-2 gap-4">
                       <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                         <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Soluções e Impacto no Sódio</h4>
                         <div className="space-y-2">
                           <div className="flex justify-between items-center text-sm p-3 bg-slate-900 border border-slate-800 rounded-xl">
                             <span className="text-slate-300 font-medium">NaCl 3%</span>
                             <span className="text-rose-400 font-black tracking-widest">513 mEq/L</span>
                           </div>
                           <div className="flex justify-between items-center text-sm p-3 bg-slate-900 border border-slate-800 rounded-xl">
                             <span className="text-slate-300 font-medium">SF 0,9%</span>
                             <span className="text-emerald-400 font-black tracking-widest">154 mEq/L</span>
                           </div>
                           <div className="flex justify-between items-center text-sm p-3 bg-slate-900 border border-slate-800 rounded-xl">
                             <span className="text-slate-300 font-medium">Ringer Lactato</span>
                             <span className="text-amber-400 font-black tracking-widest">130 mEq/L</span>
                           </div>
                           <div className="flex justify-between items-center text-sm p-3 bg-slate-900 border border-slate-800 rounded-xl">
                             <span className="text-slate-300 font-medium">SF 0,45%</span>
                             <span className="text-slate-400 font-black tracking-widest">77 mEq/L</span>
                           </div>
                         </div>
                       </div>

                       <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] flex flex-col">
                         <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 opacity-90">Calculadora de Adrogué-Madias</h4>
                         <p className="text-[10px] text-slate-400 mb-4 tracking-widest font-bold uppercase">Estima a variação de Sódio por Litro de Solução:</p>
                         
                         <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-4 space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="text-[10px] mb-1 font-black text-slate-500 uppercase tracking-widest block">Peso (kg)</label>
                               <input 
                                 type="number" 
                                 value={pesoAdrogue} 
                                 onChange={(e) => setPesoAdrogue(e.target.value === '' ? '' : Number(e.target.value))}
                                 className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                               />
                             </div>
                             <div>
                               <label className="text-[10px] mb-1 font-black text-slate-500 uppercase tracking-widest block">Grupo</label>
                               <select 
                                 value={sexoAdrogue}
                                 onChange={(e) => setSexoAdrogue(e.target.value as any)}
                                 className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                               >
                                 <option value="homem">Homem Jovem (0.6)</option>
                                 <option value="mulher">Mulher Jovem (0.5)</option>
                                 <option value="idoso">Homem Idoso (0.5)</option>
                                 <option value="idosa">Mulher Idosa (0.45)</option>
                               </select>
                             </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="text-[10px] mb-1 font-black text-slate-500 uppercase tracking-widest block">Na+ Paciente</label>
                               <input 
                                 type="number" 
                                 value={naPacienteAdrogue} 
                                 onChange={(e) => setNaPacienteAdrogue(e.target.value === '' ? '' : Number(e.target.value))}
                                 className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                               />
                             </div>
                             <div>
                               <label className="text-[10px] mb-1 font-black text-slate-500 uppercase tracking-widest block">Na+ da Solução</label>
                               <select 
                                 value={solucaoAdrogue}
                                 onChange={(e) => setSolucaoAdrogue(Number(e.target.value))}
                                 className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                               >
                                 <option value={513}>NaCl 3% (513)</option>
                                 <option value={154}>SF 0.9% (154)</option>
                                 <option value={130}>Ringer (130)</option>
                                 <option value={77}>SF 0.45% (77)</option>
                                 <option value={0}>SG 5% (0)</option>
                               </select>
                             </div>
                           </div>
                         </div>
                         
                         <div className="mt-auto space-y-4">
                           <div className="bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-xl flex items-center justify-between">
                             <div>
                               <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest block">Efeito de 1L da Solução</span>
                               <span className="text-xs text-slate-400">Variação Esperada (ΔNa)</span>
                             </div>
                             <div className="text-2xl font-black text-white">
                               {deltaNaAdrogue > 0 ? '+' : ''}{deltaNaAdrogue.toFixed(1)} <span className="text-sm font-medium text-slate-400">mEq/L</span>
                             </div>
                           </div>

                           <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                               <div>
                                 <label className="text-[10px] mb-1 font-black text-slate-500 uppercase tracking-widest block">Meta de ΔNa (mEq/L)</label>
                                 <input 
                                   type="number" 
                                   value={metaAdrogue} 
                                   onChange={(e) => setMetaAdrogue(e.target.value === '' ? '' : Number(e.target.value))}
                                   className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                 />
                               </div>
                               <div>
                                 <label className="text-[10px] mb-1 font-black text-slate-500 uppercase tracking-widest block">Tempo Alvo (h)</label>
                                 <input 
                                   type="number" 
                                   value={horasAdrogue} 
                                   onChange={(e) => setHorasAdrogue(e.target.value === '' ? '' : Number(e.target.value))}
                                   className="w-full bg-slate-950 border border-slate-800 text-white p-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                 />
                               </div>
                             </div>

                             <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex items-center justify-between">
                               <div>
                                 <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">Passo a Passo: Infusão</span>
                                 <span className="text-[10px] text-slate-400 block mt-1">1. Vol (L) = {metaVal} / {Math.abs(deltaNaAdrogue).toFixed(2)} = {volumeNecessarioL.toFixed(2)}L</span>
                                 <span className="text-[10px] text-slate-400 block">2. Vel = {volumeNecessarioML.toFixed(0)}mL / {horasVal}h</span>
                               </div>
                               <div className="text-right flex flex-col justify-end items-end">
                                 <div className="text-sm font-black text-white">{volumeNecessarioML.toFixed(0)} <span className="text-[10px] font-medium text-slate-400">mL no total</span></div>
                                 <div className="text-xl font-black text-emerald-400 mt-1 bg-emerald-950/40 px-2 py-0.5 rounded">{velocidadeInfusaoMLh.toFixed(1)} <span className="text-xs font-medium text-emerald-500">mL/h</span></div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>

                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
          ) : (
            <motion.div 
               key="hiper"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="space-y-8"
             >
               <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                 <div className="w-10 h-10 rounded-full bg-rose-900/40 text-rose-400 flex items-center justify-center">
                   <AlertTriangle size={20} />
                 </div>
                 <h2 className="text-2xl font-black text-white uppercase tracking-tight">Hipernatremia (&gt; 145)</h2>
               </div>

               {/* Navigation Tabs */}
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 {[
                   { id: 'definicao', label: 'Definição & Clínica' },
                   { id: 'fisiopato', label: 'Fisiopatologia' },
                   { id: 'diabetes', label: 'Diabetes Insipidus (DI)' },
                   { id: 'fluxograma', label: 'Investigação' },
                   { id: 'tratamento', label: 'Tratamento' }
                 ].map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setHiperTab(tab.id as any)}
                     className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
                       hiperTab === tab.id 
                         ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30 font-extrabold translate-y-[-2px]' 
                         : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                     }`}
                   >
                     {tab.label}
                   </button>
                 ))}
               </div>

               <AnimatePresence mode="wait">
                 {hiperTab === 'definicao' && (
                   <motion.div key="definicao" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-slate-950 border border-slate-700/50 p-6 rounded-[2rem]">
                       <h4 className="text-xl font-black text-rose-400 uppercase tracking-widest mb-3">Conceito Chave</h4>
                       <p className="text-sm text-slate-300 leading-relaxed mb-4">
                         A Hipernatremia (Na+ &gt; 145 mEq/L) é um distúrbio da regulação de água, significando invariavelmente: <strong>perda de água superior à perda de sódio</strong>, ou um estado de deficiência severa de água livre.
                       </p>
                       <p className="text-sm text-slate-300 leading-relaxed">
                         <strong className="text-white">Perfil clássico:</strong> Como o corpo tem o mecanismo da sede para proteger contra a hiperpolaridade, a hipernatremia quase sempre ocorre em pacientes que <strong>não conseguem beber água</strong> (idosos demenciados, pacientes intubados, coma, lactentes) ou têm falta de acesso à água.
                       </p>
                     </div>

                     <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
                       <strong className="text-rose-500 text-sm block uppercase mb-4 font-black tracking-widest border-b border-rose-500/30 pb-2">Quadros Clínicos e Sintomas Próprios</strong>
                       <p className="text-sm text-slate-300 mb-4">
                         O aumento de sódio atrai água do espaço intracelular (intracelular → extracelular), resultando em <strong>desidratação celular generalizada</strong>. Os sintomas primários são neurológicos:
                       </p>
                       <ul className="text-sm text-white space-y-3 list-disc list-inside">
                         <li>Cefaleia marcante e agitação.</li>
                         <li>Irritabilidade, letargia e confusão mental aguda.</li>
                         <li>Fraqueza muscular severa e hiperreflexia.</li>
                         <li>Em casos graves (Na &gt; 155 mEq/L): <strong>Convulsões, hemorragia subaracnóidea/parenquimatosa (por retração cerebral estirando veias pontes) e Coma.</strong></li>
                       </ul>
                     </div>
                   </motion.div>
                 )}

                 {hiperTab === 'fisiopato' && (
                   <motion.div key="fisiopato" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-indigo-950/20 border border-indigo-900/40 p-6 rounded-[2rem]">
                       <h3 className="text-xl font-black text-indigo-400 uppercase tracking-widest mb-4">Defesa Fisiológica e Adaptação</h3>
                       <p className="text-sm text-slate-300 leading-relaxed mb-4">
                         <strong>1. Mecanismo de Defesa Inicial:</strong><br/>
                         Frente à hipertonicidade, as respostas agudas são a estimulação da via da <strong>SEDE</strong> e também a liberação máxima de <strong>ADH</strong> (para reter água renal). Assim, urina intensamente concentrada é a resposta normal frente a uma hipernatremia severa.
                       </p>
                       <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-indigo-500 pl-4">
                         <strong>2. Adaptação Cerebral (Os Osmólitos Idiogênicos):</strong><br/>
                         A desidratação (encolhimento) do cérebro estimula as células gliais e neurônios a produzirem ativamente substâncias osmoticamente ativas em 24-48 horas, como inositol, glutamina e taurina (<strong>Osmólitos Idiogênicos</strong>). Estes atraem água de volta para a célula, restaurando o volume intracerebral normal, mesmo no ambiente hiperosmolar.
                       </p>
                     </div>

                     <div className="bg-rose-950/20 border border-rose-900/40 p-6 rounded-[2rem] relative overflow-hidden">
                       <div className="absolute top-0 right-0 opacity-10 p-4"><AlertTriangle size={80} /></div>
                       <strong className="text-rose-400 text-sm uppercase tracking-widest font-black block mb-2 relative z-10">O Perigo do Tratamento Rápido (Edema Cerebral)</strong>
                       <p className="text-sm text-white relative z-10">
                         Porque o cérebro se encheu de osmólitos idiogênicos para se defender, uma correção abrupta com grande aporte de água livre fará com que a água retorne massiva e agressivamente ao interior dos neurônios (já que agora são mais hiperosmolares que o sangue). Resultado pavoroso: <strong>Edema Cerebral Severo, herniação e morte</strong>.
                       </p>
                     </div>
                   </motion.div>
                 )}

                 {hiperTab === 'diabetes' && (
                   <motion.div key="diabetes" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] shadow-xl">
                       <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                         Diabetes Insipidus (DI)
                       </h3>
                       <p className="text-sm text-slate-400 mb-6 font-medium">Condição caracterizada por poliúria maciça (água livre pura) e polidipsia intensa, resultando em hipernatremia progressiva caso não haja hidratação correspondente. É um grave distúrbio envolvendo o ADH.</p>
                       
                       <div className="space-y-4">
                         <div className="bg-blue-950/20 border border-blue-900/40 p-5 rounded-2xl">
                           <strong className="text-blue-400 text-sm uppercase tracking-widest font-black block mb-2">DI Central (Neurogênico)</strong>
                           <p className="text-sm text-slate-300 mb-3">
                             <strong className="text-white">Problema:</strong> Falha na produção ou secreção do ADH pela neuro-hipófise.<br/>
                             <strong className="text-white">Causas:</strong> Traumas cranianos graves (TCE), cirurgias hipofisárias, tumores selares, encefalopatia anóxica, patologias infiltrativas (histiocitose, sarcoidose).
                           </p>
                           <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                             <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Ação / Tratamento</span>
                             <div className="text-sm text-blue-300">
                               Teste da Desmopressina (DDAVP exogenous): Há resposta contundente da concentração da urina.<br/> Tratamento: Administração de <strong>dDAVP</strong> (Desmopressina).
                             </div>
                           </div>
                         </div>

                         <div className="bg-amber-950/20 border border-amber-900/40 p-5 rounded-2xl">
                           <strong className="text-amber-400 text-sm uppercase tracking-widest font-black block mb-2">DI Nefrogênico</strong>
                           <p className="text-sm text-slate-300 mb-3">
                             <strong className="text-white">Problema:</strong> Secreção fisiológica de ADH está normo/aumentada, contudo os ductos coletores renais <strong>não respondem</strong> ao ADH (resistência do receptor V2).<br/>
                             <strong className="text-white">Causas:</strong> Medicamentos clássicos (<strong>Lítio</strong>, Demeclociclina, Anfotericina B), Hipocalemia grave crônica, Hipercalcemia crônica, doenças túbulo-intersticiais.
                           </p>
                           <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                             <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Ação / Tratamento</span>
                             <div className="text-sm text-amber-300">
                               Teste de Desmopressina: Sem reposta de concentração (&lt;10% na osm urinária).<br/> Tratamento: O paradoxal! <strong>Restrição de sódio + Tiazídicos</strong> (causam leve hipovolemia, forçando túbulo proximal a reabsorver tudo e reduzindo carga de água no túbulo coletor). Se induzido por Lítio: <strong>Amilorida</strong>.
                             </div>
                           </div>
                         </div>

                       </div>
                     </div>
                   </motion.div>
                 )}

                 {hiperTab === 'fluxograma' && (
                   <motion.div key="fluxograma" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-slate-950 border border-slate-700/50 p-6 rounded-[2rem]">
                       <h3 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                         <Workflow size={24} className="text-indigo-500" /> Investigação pelo Estado Volêmico
                       </h3>
                       <div className="grid grid-cols-1 gap-4">
                         {/* Hipovolemia */}
                         <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                           <strong className="text-orange-400 text-sm uppercase block border-b border-slate-800 pb-2 mb-3 tracking-widest font-black">Hipovolêmica <span className="text-xs text-slate-500 font-normal ml-2">(A mais comum)</span></strong>
                           <p className="text-sm text-white mb-2">Desidratação clínica franca + hipernatremia. O paciente perdeu tudo, mas perdeu mais água do que sódio.</p>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                             <div className="bg-orange-950/20 p-3 rounded-xl border border-orange-900/30">
                               <span className="text-[10px] uppercase font-black text-orange-400 block mb-1">Extrarrenal (Sódio na Urina &lt; 20)</span>
                               <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                                 <li>Perda Insensível (Sudorese, Febre Alta).</li>
                                 <li>Queimaduras graves, taquipneia contínua.</li>
                                 <li>Gastrointestinal (Diarreia osmótica, fístulas).</li>
                               </ul>
                             </div>
                             <div className="bg-orange-950/20 p-3 rounded-xl border border-orange-900/30">
                               <span className="text-[10px] uppercase font-black text-orange-400 block mb-1">Renal (Sódio na Urina &gt; 20)</span>
                               <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                                 <li>Uso de Diurético Osmótico (Manitol, glicose alta urina).</li>
                                 <li>Diuréticos de Alça.</li>
                                 <li>Poliúria pós-obstrutiva.</li>
                               </ul>
                             </div>
                           </div>
                         </div>

                         {/* Euvolêmica */}
                         <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                           <strong className="text-emerald-400 text-sm uppercase block border-b border-slate-800 pb-2 mb-3 tracking-widest font-black">Euvolêmica <span className="text-xs text-slate-500 font-normal ml-2">(Repor Água Pura)</span></strong>
                           <p className="text-sm text-slate-300">Paciente tem perda de água puramente (sem sódio) isolada, sem quadro clássico de choque desidratado, ou teve diminuição enorme de ingesta.</p>
                           <div className="mt-2 text-sm text-white bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/30">
                             Disfunção do ADH: <strong>Diabetes Insipidus (Central ou Nefrogênica)</strong>, Hipodipsia Adquirida, Perda Hídrica Insensível Prolongada com reposição sub-ótima de líquidos em intubados.
                           </div>
                         </div>

                         {/* Hipervolêmica */}
                         <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                           <strong className="text-blue-400 text-sm uppercase block border-b border-slate-800 pb-2 mb-3 tracking-widest font-black">Hipervolêmica <span className="text-xs text-slate-500 font-normal ml-2">(Rara)</span></strong>
                           <p className="text-sm text-slate-300">Quadro de excesso clínico de sódio e volume (sobrecarga salina).</p>
                           <div className="mt-2 text-sm text-white bg-blue-950/20 p-3 rounded-xl border border-blue-900/30">
                             <strong>Iatrogênica:</strong> Reposições exageradas com Bicarbonato de Sódio IV, Ampolas de NaCl 20% ou NaCL 3% errados, afogamento em água do mar. <strong>Endócrina:</strong> Hiperaldosteronismo primário ou Síndrome de Cushing extensa.
                           </div>
                         </div>

                       </div>
                     </div>
                   </motion.div>
                 )}

                 {hiperTab === 'tratamento' && (
                   <motion.div key="tratamento" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                     <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] shadow-xl">
                       <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                         <Target size={24} /> Resgate Hídrico: Tratamento Estratégico
                       </h3>

                       <div className="space-y-6 border-l-2 border-slate-800 pl-4 py-2">
                         <div className="relative">
                           <div className="absolute -left-[24px] top-1 bg-rose-600 text-white font-black w-6 h-6 rounded-full flex items-center justify-center text-xs">1</div>
                           <strong className="text-white block uppercase tracking-widest mb-1 text-sm">Passo 1: Corrigir a Hipovolemia Grave</strong>
                           <p className="text-sm text-slate-400">Se o paciente estiver chocado, taquicárdico ou com instabilidade hemodinâmica severa (Perda Global). O primeiro fluido salva vidas com Na+ alto <strong className="text-emerald-400">é o SF 0,9% (Solução Fisiológica)</strong> e não água. Salva a macro-hemodinâmica antes de baixar o sódio.</p>
                         </div>

                         <div className="relative">
                           <div className="absolute -left-[24px] top-1 bg-amber-600 text-white font-black w-6 h-6 rounded-full flex items-center justify-center text-xs">2</div>
                           <strong className="text-white block uppercase tracking-widest mb-1 text-sm">Passo 2: Calcular Déficit de Água Livre</strong>
                           <p className="text-sm text-slate-400 mb-3">Após resgatar Volemia (ou caso o paciente esteja Euvolêmico), calculamos os litros faltantes da fórmula padrão:</p>
                           <div className="bg-slate-900 border border-slate-700/50 p-4 rounded-xl text-center inline-block">
                             <div className="text-lg font-mono text-amber-300 font-bold tracking-widest">
                               Déficit H₂O = ACT × [ (Na Paciente / 140) - 1 ]
                             </div>
                             <span className="text-[10px] tracking-wide mt-2 block text-slate-500 uppercase font-black">Homem (0.6xPeso) • Mulher (0.5xPeso)</span>
                           </div>
                         </div>

                         <div className="relative">
                           <div className="absolute -left-[24px] top-1 bg-blue-600 text-white font-black w-6 h-6 rounded-full flex items-center justify-center text-xs">3</div>
                           <strong className="text-white block uppercase tracking-widest mb-1 text-sm">Passo 3: Prescrever a Reposição</strong>
                           <p className="text-sm text-slate-400 mb-3">Via e solução de escolha. Qual a melhor rota de água? Preferencialmente <strong>Oral (TGI / SNE)</strong>.</p>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="bg-blue-950/20 border border-blue-900/40 p-4 rounded-xl">
                               <strong className="text-blue-400 text-xs block mb-1 uppercase tracking-widest">Opção Oral Preferencial</strong>
                               <p className="text-xs text-white">Água livre via Sonda Enteral / Via oral natural (A mais fisiológica e curativa, com menos oscilação plasmática).</p>
                             </div>
                             <div className="bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-xl">
                               <strong className="text-indigo-400 text-xs block mb-1 uppercase tracking-widest">Opções Intravenosas Estritas</strong>
                               <p className="text-xs text-white"><strong>Soro Glicosado 5% (SG5%)</strong> ou Soro ao Meio <strong>NaCl 0,45%</strong>. Se houver uso de Soro 0.45%, necessitará de volumes maiores pois também carrega sais.</p>
                             </div>
                           </div>
                         </div>
                         
                         <div className="relative">
                           <div className="absolute -left-[24px] top-1 bg-rose-900 text-rose-300 font-black w-6 h-6 rounded-full flex items-center justify-center text-xs border border-rose-500">!</div>
                           <strong className="text-rose-400 block uppercase tracking-widest mb-1 text-sm">Passo 4: Monitorar o Limite (Edema Cerebral)</strong>
                           <p className="text-sm text-slate-400">
                             <strong>Régua Diária:</strong> Jamais abaixar a hipernatremia mais do que <strong>10 mEq/L a cada 24 horas</strong>. Para isso, o Déficit de água livre deve ser infundido metade(50%) em longas 12h às 24h e a outra metade nas próximas 24h-48h, rechecando laboratórios diariamente!
                           </p>
                         </div>

                       </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
