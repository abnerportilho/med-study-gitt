import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wind, ShieldAlert, AlertTriangle, Activity, Flame, ArrowDown, 
  Stethoscope, Target, Search, Zap, UserCheck, Baby, HeartPulse, Clock, Sparkles, CheckCircle
} from 'lucide-react';

const TABS = [
  { id: 'conceitos', label: '1. Conceitos & Fisiologia' },
  { id: 'causas', label: '2. Diagnóstico Diferencial' },
  { id: 'corpo-estranho', label: '3. Imagem & Corpo Estranho' },
  { id: 'conduta', label: '4. Avaliação & Algoritmo' },
  { id: 'resumo', label: '5. Resumo Ouro' }
];

export default function AirwayObstructionMain() {
  const [activeTab, setActiveTab] = useState('conceitos');
  const [activeAlgoStep, setActiveAlgoStep] = useState<number>(1);
  const [activeFisioNode, setActiveFisioNode] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Wind size={160} />
        </div>
        <div className="flex items-center gap-3 text-cyan-500 mb-2">
          <ShieldAlert size={28} className="animate-pulse" />
          <span className="text-sm font-black uppercase tracking-[0.25em]">Urgência Respiratória</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Obstrução de Vias Aéreas</h1>
        <p className="text-slate-400 mt-1 max-w-3xl leading-relaxed text-sm">
          Abordagem clínica, imagem diagnóstica e conduta direcionada para manejo de <strong className="text-cyan-400">OVACE</strong>, edema e infecções agudas.
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max border-b border-slate-800 pb-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all ${
                  isActive 
                    ? 'bg-cyan-700 text-white shadow-lg shadow-cyan-900/30 font-extrabold translate-y-[-2px]' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CONCEITOS E FISIOLOGIA */}
          {activeTab === 'conceitos' && (
            <motion.div
              key="conceitos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              {/* Classificação Básica */}
              <div className="bg-cyan-950/20 p-6 rounded-2xl border border-cyan-900/40">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="text-cyan-500" size={20} />
                  Classificações Essenciais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">Quanto ao Tempo</span>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li><strong className="text-white">Aguda (minutos/horas):</strong> Corpo estranho, anafilaxia, epiglotite, trauma, fumaça.</li>
                      <li><strong className="text-white">Crônica (semanas/meses):</strong> Tumor, estenose secundária, laringomalácia, compressão extrínseca.</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">Quanto ao Nível Anatômico</span>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li><strong className="text-white">Supraglótica:</strong> Epiglote, base da língua, orofaringe.</li>
                      <li><strong className="text-white">Glótica/Subglótica:</strong> Cordas vocais e tecidos adjacentes.</li>
                      <li><strong className="text-white">Traqueal/Brônquica:</strong> Vias intratorácicas principais e lobares.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">Mecanismo do Fluxo</span>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li><strong className="text-white">Obstrução Fixa:</strong> Fluxo limitado tanto na inspiração quanto na expiração.</li>
                      <li><strong className="text-white">Obstrução Dinâmica (Valvular):</strong> Ar entra na inspiração, mas aprisiona na expiração.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">Grau de Obstrução</span>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li><strong className="text-white">Parcial:</strong> Passagem de ar mantida (preserva tosse).</li>
                      <li><strong className="text-white">Total:</strong> Fluxo interrompido (risco iminente de parada).</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fisiopatologia: Estridor vs Sibilância */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Stethoscope className="text-amber-500" size={20} />
                  Estetoscopia: Estridor versus Sibilância
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-amber-900/30 rounded-xl bg-amber-950/10">
                    <h4 className="text-base font-black text-amber-400 mb-2">Estridor</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      Ruído alto, áspero, geralmente audível sem estetoscópio. Sugere <strong className="text-white">obstrução alta</strong> (laringe, subglote, traqueia extratorácica).
                    </p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li><strong className="text-amber-200">Inspiração:</strong> Pressão negativa favorece o colapso do estreitamento supraglótico (Ex: Epiglotite).</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-emerald-900/30 rounded-xl bg-emerald-950/10">
                    <h4 className="text-base font-black text-emerald-400 mb-2">Sibilância</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      Ruído musical, expiratório. Sugere <strong className="text-white">obstrução baixa/intratorácica</strong> (brônquios). Quando unilateral, sugere corpo estranho.
                    </p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li><strong className="text-emerald-200">Expiração:</strong> Pressão positiva comprime vias intratorácicas estreitadas (Ex: CE no brônquio direito).</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Epidemiologia */}
              <div className="flex gap-4 p-5 bg-indigo-950/20 border border-indigo-900/30 rounded-2xl items-center">
                <UserCheck className="text-indigo-400 shrink-0" size={32} />
                <div>
                  <h4 className="text-sm font-black text-indigo-300 uppercase tracking-widest mb-1">Epidemiologia Crítica</h4>
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Crianças:</strong> Pico de 1 a 3 anos (fase oral, motores imaturos, alimentos como amendoim). <br/>
                    <strong className="text-white">Adultos/Idosos:</strong> Alimentos (carne) exacerbados por demência, sedação, AVC ou próteses mal adaptadas.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DIAGNÓSTICO DIFERENCIAL */}
          {activeTab === 'causas' && (
            <motion.div
              key="causas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-slate-500" /> Diagnóstico Diferencial de Causas Agudas
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Corpo Estranho */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'corpo-estranho' ? null : 'corpo-estranho')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'corpo-estranho' ? 'bg-amber-950/50 border-amber-500 shadow-md ring-1 ring-amber-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Corpo Estranho</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">1-3 anos ou adultos</p>
                    {activeFisioNode === 'corpo-estranho' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-amber-900/50 text-xs text-amber-200 space-y-2">
                        <p><strong>Instalação:</strong> Súbita, engasgo.</p>
                        <p><strong>Estridor/Sibilância:</strong> Sibilo Unilateral comum.</p>
                        <p><strong>Raio-X:</strong> Hiperinsuflação / Atelectasia (Pode ser normal se radiotransparente).</p>
                      </motion.div>
                    )}
                  </button>
                  
                  {/* Crupe Viral */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'crupe' ? null : 'crupe')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'crupe' ? 'bg-indigo-950/50 border-indigo-500 shadow-md ring-1 ring-indigo-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Crupe Viral</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">6 meses – 3 anos</p>
                    {activeFisioNode === 'crupe' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-indigo-900/50 text-xs text-indigo-200 space-y-2">
                        <p><strong>Instalação:</strong> Gradual, após IVAS.</p>
                        <p><strong>Febre/Tosse:</strong> Baixa / Ladrante, metálica.</p>
                        <p><strong>Estridor:</strong> Inspiratório (piora choro).</p>
                        <p><strong>Raio-X:</strong> Steeple sign (torre do sino).</p>
                      </motion.div>
                    )}
                  </button>

                  {/* Epiglotite */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'epiglotite' ? null : 'epiglotite')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'epiglotite' ? 'bg-rose-950/50 border-rose-500 shadow-md ring-1 ring-rose-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Epiglotite</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">2-7 anos / adultos</p>
                    {activeFisioNode === 'epiglotite' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-rose-900/50 text-xs text-rose-200 space-y-2">
                        <p><strong>Instalação:</strong> Abrupta, febre alta, toxemia.</p>
                        <p><strong>Voz/Estridor:</strong> Batata quente / Inspiratório.</p>
                        <p><strong>Posição/Sialorreia:</strong> Tripé / Sim.</p>
                        <p><strong>Raio-X:</strong> Thumb sign (polegar de perfil).</p>
                      </motion.div>
                    )}
                  </button>

                  {/* Anafilaxia */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'anafilaxia' ? null : 'anafilaxia')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'anafilaxia' ? 'bg-fuchsia-950/50 border-fuchsia-500 shadow-md ring-1 ring-fuchsia-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Anafilaxia</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">Qualquer idade</p>
                    {activeFisioNode === 'anafilaxia' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-fuchsia-900/50 text-xs text-fuchsia-200 space-y-2">
                        <p><strong>Instalação:</strong> Minutos após alérgeno.</p>
                        <p><strong>Estridor:</strong> Edema de glote inspiratório.</p>
                        <p><strong>Sinais:</strong> Urticária, hipotensão, sibilos.</p>
                        <p><strong>Raio-X:</strong> Geralmente normal.</p>
                      </motion.div>
                    )}
                  </button>

                  {/* Trauma laringo-traqueal */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'trauma' ? null : 'trauma')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'trauma' ? 'bg-red-950/50 border-red-500 shadow-md ring-1 ring-red-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Trauma Cervical</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">Qualquer idade</p>
                    {activeFisioNode === 'trauma' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-red-900/50 text-xs text-red-200 space-y-2">
                        <p><strong>Instalação:</strong> Súbita pós-trauma.</p>
                        <p><strong>Sinais:</strong> Hemoptise, enfisema subcutâneo, equimose.</p>
                        <p><strong>TC:</strong> Fratura de cartilagem, pneumomediastino.</p>
                      </motion.div>
                    )}
                  </button>

                  {/* Inalação de fumaça/queimadura */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'inalacao' ? null : 'inalacao')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'inalacao' ? 'bg-orange-950/50 border-orange-500 shadow-md ring-1 ring-orange-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Inalação Fumaça</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">Qualquer idade</p>
                    {activeFisioNode === 'inalacao' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-orange-900/50 text-xs text-orange-200 space-y-2">
                        <p><strong>Instalação:</strong> Progressiva (Edema nas 1ªs 24h).</p>
                        <p><strong>Clínica:</strong> Escarro carbonáceo, hiperemia orofacial.</p>
                        <p><strong>Raio-X:</strong> Normal inicialmente. IOT precoce!</p>
                      </motion.div>
                    )}
                  </button>

                  {/* Abscesso periamigdaliano */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'abscesso' ? null : 'abscesso')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'abscesso' ? 'bg-lime-950/50 border-lime-500 shadow-md ring-1 ring-lime-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Abscesso Peritonsilar</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">Jovens / Adultos</p>
                    {activeFisioNode === 'abscesso' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-lime-900/50 text-xs text-lime-200 space-y-2">
                        <p><strong>Instalação:</strong> Gradual, dias de odinofagia.</p>
                        <p><strong>Achados:</strong> Desvio de úvula, trismo, voz abafada.</p>
                        <p><strong>TC:</strong> Espessamento de partes moles.</p>
                      </motion.div>
                    )}
                  </button>

                  {/* Laringomalácia */}
                  <button onClick={() => setActiveFisioNode(activeFisioNode === 'laringomalacia' ? null : 'laringomalacia')} className={`p-5 rounded-xl border text-left transition-all ${activeFisioNode === 'laringomalacia' ? 'bg-cyan-950/50 border-cyan-500 shadow-md ring-1 ring-cyan-500/50 scale-[1.02]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}>
                    <h5 className="font-extrabold text-white text-base leading-tight">Laringomalácia</h5>
                    <p className="text-xs text-slate-400 mt-1 mb-2">&lt; 6 meses</p>
                    {activeFisioNode === 'laringomalacia' && (
                      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-3 border-t border-cyan-900/50 text-xs text-cyan-200 space-y-2">
                        <p><strong>Instalação:</strong> Desde o nascimento.</p>
                        <p><strong>Clínica:</strong> Piora deitada. Melhora em prona.</p>
                        <p><strong>Evolução:</strong> Melhora espontânea até 18m.</p>
                      </motion.div>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Obstrução Crônica</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  Limitação persistente com evolução arrastada. <strong>Pistas clínicas:</strong> estridor recorrente, rouquidão crônica, pneumonias sempre no mesmo lobo, bronquiectasias de repetição.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['Laringomalácia', 'Estenose pós-IOT', 'Paralisia cordas vocais', 'Papilomatose', 'Neoplasias', 'Corpo estranho esquecido'].map((causa, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold">{causa}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CORPO ESTRANHO & IMAGEM */}
          {activeTab === 'corpo-estranho' && (
            <motion.div
              key="corpo-estranho"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-6">
                  <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
                    <Search className="text-amber-500" size={20} /> Aspiração de Corpo Estranho
                  </h3>
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 my-4 text-center">
                    <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">Tríade Clássica</span>
                    <p className="text-sm font-bold text-white">Engasgo testemunhado + Sibilância unilateral + MV reduzido unilateral</p>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-2 mt-4 list-disc list-inside marker:text-amber-500">
                    <li><strong className="text-white">Assimetria Brônquica:</strong> Brônquio direito é mais acometido (mais verticalizado e calibroso).</li>
                    <li><strong className="text-white">Engasgo testemunhado:</strong> Tem peso imenso. Não espere a tríade completa para intervir.</li>
                    <li><strong className="text-white">Fases:</strong> Aguda (Cianose/Estridor) &rarr; Assintomática (Atraso diag) &rarr; Complicações (Atelectasia/Abscesso).</li>
                  </ul>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                    <Search className="text-cyan-500" size={20} /> Indicações de Broncoscopia
                  </h3>
                  <p className="text-sm text-slate-300 mb-3 bg-cyan-950/30 p-3 rounded-lg border border-cyan-900/50">
                    <strong className="text-cyan-400">Broncoscopia Rígida:</strong> Padrão clássico em crianças para remoção. Permite ventilação mecânica cruzada.<br/><br/>
                    <strong className="text-cyan-400">Indicações FORTES:</strong>
                  </p>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> História de engasgo testemunhado.</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Sibilância unilateral persistente.</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Pneumonia recorrente no mesmo lobo.</li>
                    <li className="flex items-center gap-2 text-amber-300 font-bold"><AlertTriangle size={14} /> Suspeita clínica forte mesmo com Raio-X normal!</li>
                  </ul>
                </div>
              </div>

              {/* Radiologia */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-lg font-black text-white mb-4">Padrões Radiológicos (Corpo Estranho)</h3>
                <p className="text-xs text-rose-400 mb-4 bg-rose-950/30 p-2 rounded-lg inline-block uppercase font-bold tracking-wider border border-rose-900/50">
                  Muitos corpos estranhos são radiotransparentes. RAIO-X NORMAL NÃO EXCLUI DIAGNÓSTICO.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-700 bg-slate-950 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-cyan-500"></div>
                    <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest mb-1">Check-Valve</h4>
                    <p className="text-xs text-slate-300 mb-2">Ar entra inspirando, mas a saída fica travada.</p>
                    <div className="pt-2 border-t border-slate-800 text-xs text-white bg-slate-900 p-2 rounded">
                      <strong className="text-cyan-300">Raio-X:</strong> Hiperinsuflação unilateral, pulmão mais escuro, diafragma ipsi rebaixado, mediastino desvia (na expiração).
                    </div>
                  </div>

                  <div className="p-4 border border-slate-700 bg-slate-950 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500"></div>
                    <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest mb-1">Stop-Valve</h4>
                    <p className="text-xs text-slate-300 mb-2">Ar simplesmente não entra no segmento.</p>
                    <div className="pt-2 border-t border-slate-800 text-xs text-white bg-slate-900 p-2 rounded">
                      <strong className="text-rose-300">Raio-X:</strong> Atelectasia localizada, opacidade, elevação do diafragma, desvio traqueal ipsilateral.
                    </div>
                  </div>

                  <div className="p-4 border border-slate-700 bg-slate-950 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-slate-500"></div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Bypass-Valve</h4>
                    <p className="text-xs text-slate-300 mb-2">Ar entra e sai, apenas diminuindo o lúmen.</p>
                    <div className="pt-2 border-t border-slate-800 text-xs text-white bg-slate-900 p-2 rounded">
                      <strong className="text-slate-300">Raio-X:</strong> Pode ser completamente normal. Depende 100% da avaliação clínica.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: AVALIAÇÃO E ALGORITMO */}
          {activeTab === 'conduta' && (
            <motion.div
              key="conduta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-teal-950/20 border border-teal-900/50 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><HeartPulse size={80}/></div>
                  <h4 className="text-lg font-black text-teal-400 mb-3">Obstrução Parcial</h4>
                  <ul className="text-sm text-slate-300 space-y-2 mb-4">
                    <li>&bull; <strong className="text-white">Tosse Eficaz.</strong></li>
                    <li>&bull; Paciente fala ou chora vocalizando.</li>
                    <li>&bull; Entrada de ar e roncos/sibilos.</li>
                  </ul>
                  <div className="bg-slate-950 border border-teal-900/30 p-3 rounded-xl">
                    <strong className="text-teal-400 text-xs uppercase block">Conduta</strong>
                    <p className="text-xs text-slate-300 font-bold mt-1">Estimular tosse e observar clinicamente. NÃO dar tapas ou fazer Heimlich. Acionar emergência se agravar.</p>
                  </div>
                </div>

                <div className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={80}/></div>
                  <h4 className="text-lg font-black text-rose-400 mb-3">Obstrução Total / Grave</h4>
                  <ul className="text-sm text-slate-300 space-y-2 mb-4">
                    <li>&bull; Tosse INEFICAZ ou ausente.</li>
                    <li>&bull; <strong className="text-white">Sinal universal de asfixia</strong>.</li>
                    <li>&bull; Cianose e incapacidade de falar.</li>
                  </ul>
                  <div className="bg-slate-950 border border-rose-900/30 p-3 rounded-xl">
                    <strong className="text-rose-400 text-xs uppercase block">Conduta</strong>
                    <p className="text-xs text-slate-300 font-bold mt-1">Protocolo imediato de desobstrução de via aérea (AHA). Risco de PCR iminente.</p>
                  </div>
                </div>
              </div>

              {/* Fluxograma AHA */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-base font-black text-white uppercase tracking-widest mb-4 text-center">
                  Algoritmo Executivo de Desobstrução (AHA)
                </h4>
                
                <div className="flex flex-col gap-3 relative z-10 w-full max-w-3xl mx-auto">
                  <div className="p-4 rounded-xl border bg-cyan-950/50 border-cyan-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-black">1</div>
                      <h5 className="font-extrabold text-sm text-cyan-300">Paciente Consciente (Adultos e Crianças {'>'} 1 ano)</h5>
                    </div>
                    <div className="pl-11 text-xs text-cyan-100/80">
                      Aplique <strong className="text-white">Compressões Abdominais Rápidas (Manobra de Heimlich)</strong> até a desobstrução ou a perda de consciência. <br/>
                      <em>*Tendência atual em algumas provas é aceitar a transição de 5 golpes dorsais alternados com 5 compressões abdominais.</em>
                    </div>
                  </div>

                  <div className="flex justify-center -my-2 text-slate-700 z-0"><ArrowDown size={20} /></div>

                  <div className="p-4 rounded-xl border bg-rose-950/50 border-rose-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-black">2</div>
                      <h5 className="font-extrabold text-sm text-rose-300">Paciente Torna-se Irresponsivo</h5>
                    </div>
                    <div className="pl-11 text-xs text-rose-100/80">
                      <strong className="text-white block mb-1">Mudança de Protocolo! Pare o Heimlich abdominais.</strong>
                      Ampare até o chão &rarr; Acione SME &rarr; <strong className="text-rose-200">Inicie RCP imediatamente, pelas compressões torácicas</strong>. 
                      Sempre que ventilar, abra a boca. Remova apenas se o corpo estranho estiver altamente visível e for de fácil extração (<strong className="text-rose-400">sem varredura às cegas</strong>).
                    </div>
                  </div>

                  <div className="flex justify-center -my-2 text-slate-700 z-0"><ArrowDown size={20} /></div>

                  <div className="p-4 rounded-xl border bg-indigo-950/50 border-indigo-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">3</div>
                      <h5 className="font-extrabold text-sm text-indigo-300">Suporte Avançado ("CICO - Cannot Intubate, Cannot Oxygenate")</h5>
                    </div>
                    <div className="pl-11 text-xs text-indigo-100/80">
                      Caso insucesso com Laringoscopia Direta com Pinça de Magill: <strong className="text-indigo-200">Via Aérea Cirúrgica!</strong> <br/>
                      Realizar <strong>Cricotireoidostomia</strong> (de urgência, salva vida). A traqueostomia eletiva fica para ambiente de bloco cirúrgico.
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3">
                    <Baby className="text-rose-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-rose-400 text-xs block uppercase">Lactentes (&lt; 1 ano)</strong>
                      <p className="text-xs text-slate-300 mt-1">Compressão abdominal é contraindicada. Fazer ciclos de <strong>5 golpes dorsais + 5 compressões torácicas</strong> mantendo a cabeça mais baixa que o corpo.</p>
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3">
                    <UserCheck className="text-cyan-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-cyan-400 text-xs block uppercase">Gestantes e Obesos</strong>
                      <p className="text-xs text-slate-300 mt-1">Não abraçar o abdome. Realizar <strong>compressões torácicas constritivas</strong> (no esterno, base do manúbrio), puxando firme para trás.</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 5: RESUMO E PROVAS */}
          {activeTab === 'resumo' && (
            <motion.div
              key="resumo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              
              <div className="bg-amber-950/20 p-6 rounded-2xl border border-amber-900/50">
                 <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldAlert size={18} /> Pontos Clássicos para Prova
                </h4>
                <div className="space-y-4">
                  <button className="w-full text-left bg-slate-950 border border-slate-800 p-4 rounded-xl flex gap-4 hover:bg-slate-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-900/40 text-amber-500 flex items-center justify-center shrink-0 border border-amber-800/50"><Sparkles size={20} /></div>
                    <div>
                      <strong className="text-amber-400 font-bold block mb-1">1. Rx Normal vs História</strong>
                      <span className="text-sm text-slate-300">
                        Corpo estranho com Rx normal NÃO descarta diagnóstico! História clínica de engasgo testemunhado indica Broncoscopia diagnóstica/terapêutica.
                      </span>
                    </div>
                  </button>
                  <button className="w-full text-left bg-slate-950 border border-slate-800 p-4 rounded-xl flex gap-4 hover:bg-slate-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-rose-900/40 text-rose-500 flex items-center justify-center shrink-0 border border-rose-800/50"><AlertTriangle size={20} /></div>
                    <div>
                      <strong className="text-rose-400 font-bold block mb-1">2. O tabu da Epiglotite</strong>
                      <span className="text-sm text-slate-300">
                        NUNCA examinar a orofaringe, NUNCA deitar o paciente e NUNCA tentar acesso venoso agitado antes de garantir via aérea hiper-segura em ambiente cirúrgico.
                      </span>
                    </div>
                  </button>
                  <button className="w-full text-left bg-slate-950 border border-slate-800 p-4 rounded-xl flex gap-4 hover:bg-slate-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-orange-900/40 text-orange-500 flex items-center justify-center shrink-0 border border-orange-800/50"><Flame size={20} /></div>
                    <div>
                      <strong className="text-orange-400 font-bold block mb-1">3. Inalação de Fumaça Subtrai Tempo</strong>
                      <span className="text-sm text-slate-300">
                        O estridor pode aparecer apenas horas depois (edema progressivo). <strong>IOT precoce</strong> é a conduta. Perder a viabilidade de intubar em laringe edemaciada é letal.
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                  <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest mb-4">Apresentação Oral (Pitch)</h4>
                  <ul className="text-sm text-slate-300 space-y-4 font-mono">
                    <li className="pl-3 border-l-2 border-slate-700 italic">"Meu primeiro passo é distinguir asfixia parcial da irresponsiva, mudando Heimlich para RCP."</li>
                    <li className="pl-3 border-l-2 border-slate-700 italic">"Estridor inspiratório rastreia a obstrução para vias altas; sibilo unilateral me arrasta pro brônquio (corpo estranho)."</li>
                    <li className="pl-3 border-l-2 border-slate-700 italic">"Atelectasia confirma 'stop-valve', aprisionamento e desvio expiratório confirma 'check-valve'."</li>
                  </ul>
                </div>

                <div className="bg-indigo-950/20 border border-indigo-900/40 p-6 rounded-2xl">
                  <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-4">Versão Ultracondensada</h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex justify-between items-center bg-slate-900 p-2 rounded"><span>Criança + Engasgo súbito</span> <strong className="text-indigo-300 text-right">Corpo Estranho</strong></li>
                    <li className="flex justify-between items-center bg-slate-900 p-2 rounded"><span>Tosle ladrante + Febre baixa</span> <strong className="text-indigo-300 text-right">Crupe Viral</strong></li>
                    <li className="flex justify-between items-center bg-slate-900 p-2 rounded"><span>Febre alta + Tripé + Sialorreia</span> <strong className="text-indigo-300 text-right">Epiglotite</strong></li>
                    <li className="flex justify-between items-center bg-slate-900 p-2 rounded"><span>Urticária + Hipotensão + Estridor</span> <strong className="text-indigo-300 text-right">Anafilaxia</strong></li>
                    <li className="flex justify-between items-center bg-slate-900 p-2 rounded"><span>Hiperinsuflação unilateral no Rx</span> <strong className="text-indigo-300 text-right">Mec. Check-Valve</strong></li>
                    <li className="flex justify-between items-center bg-slate-900 p-2 rounded"><span>Sibilo Unilateral persistente</span> <strong className="text-indigo-300 text-right">Corpo Estranho</strong></li>
                  </ul>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
