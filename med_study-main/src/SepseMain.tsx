import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Activity, Brain, Clock, ShieldAlert, Award, AlertTriangle, 
  Syringe, Droplets, ChevronRight, HelpCircle, CheckCircle, Flame, 
  BookOpen, Plus, Sparkles, Filter, RefreshCw, Globe, Users, TrendingUp, Skull, ShieldCheck, Thermometer, ArrowDown
} from 'lucide-react';

// Custom Star of Life Icon
const StarOfLife = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 2h2v5.3l4.6-2.6 1 1.7-4.6 2.6L18.6 12l-4.6 2.6 4.6 2.6-1 1.7-4.6-2.6V22h-2v-5.3l-4.6 2.6-1-1.7 4.6-2.6L5.4 12l4.6-2.6-4.6-2.6 1-1.7 4.6 2.6V2z" />
  </svg>
);

const TABS = [
  { id: 'definicao-epidemiologia', label: '1. Definição & Populações de Risco' },
  { id: 'fisiopatologia', label: '2. Fisiopatologia' },
  { id: 'triagem', label: '3. Triagem & Scores' },
  { id: 'caso-clinico', label: '4. Caso Clínico (Levi)' },
  { id: 'tratamento', label: '5. Tratamento' }
];

export default function SepseMain() {
  const [activeTab, setActiveTab] = useState('definicao-epidemiologia');

  // Tab 1 interactive state
  const [activeDefPanel, setActiveDefPanel] = useState<'oquee' | 'choque' | 'oque-nao-e'>('oquee');
  const [selectedRiskPop, setSelectedRiskPop] = useState<string | null>(null);

  // Caso Clínico quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  // Fisiopatologia click state
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [activeFisioStep, setActiveFisioStep] = useState<number>(1);

  // Tratamento tab state
  const [activeTrataTab, setActiveTrataTab] = useState<'exames' | 'volemia' | 'antibiotico' | 'vasoativo'>('exames');

  const organs = [
    {
      id: 'snc',
      name: 'Sistema Nervoso Central',
      icon: Brain,
      color: 'border-purple-500 bg-purple-950/60 text-purple-200',
      tagColor: 'bg-purple-900/60 text-purple-200 border-purple-800',
      description: 'A encefalopatia associada à sepse é comum.',
      symptoms: '• Glasgow rebaixado\n• Confusão mental e delírio\n• Reação pupilar lenta\n• Psicose decorrente de hipoperfusão sistêmica.'
    },
    {
      id: 'cardio',
      name: 'Sistema Cardiovascular',
      icon: Heart,
      color: 'border-red-500 bg-red-950/60 text-red-200',
      tagColor: 'bg-red-900/60 text-red-200 border-red-800',
      description: 'Vasodilatação sistêmica severa e hipovolemia por vazamento endotelial.',
      symptoms: '• Hipotensão refratária (PAS < 90 ou PAM < 65)\n• Taquicardia compensatória (> 90 bpm)\n• Hiperlactatemia tecidual celular\n• Disfunção miocárdica reversível.'
    },
    {
      id: 'renal',
      name: 'Sistema Renal (Urinário)',
      icon: Droplets,
      color: 'border-blue-500 bg-blue-950/60 text-blue-200',
      tagColor: 'bg-blue-900/60 text-blue-200 border-blue-800',
      description: 'Agressão renal aguda induzida por isquemia/sepse.',
      symptoms: '• Oligúria (débito urinário < 0.5 mL/kg/h) ou Anúria\n• Elevação rápida de Creatinina e Ureia\n• Retenção hídrica prejudicial.'
    },
    {
      id: 'respiratorio',
      name: 'Sistema Respiratório',
      icon: Activity,
      color: 'border-teal-500 bg-teal-950/60 text-teal-200',
      tagColor: 'bg-teal-900/60 text-teal-200 border-teal-800',
      description: 'Síndrome do Desconforto Respiratório Agudo (SDRA) secundária.',
      symptoms: '• Taquipneia severa (FR > 20 ou > 25 irpm)\n• Hipoxemia tecidual e esforço intercostal\n• Diminuição crítica da relação PaO2/FiO2.'
    },
    {
      id: 'hepatico',
      name: 'Sistema Hepático',
      icon: Filter,
      color: 'border-amber-500 bg-amber-950/60 text-amber-200',
      tagColor: 'bg-amber-900/50 text-amber-200 border-amber-800',
      description: 'Disfunção hepática crônica ou aguda por hipoperfusão.',
      symptoms: '• Icterícia clínica evidente\n• Bilirrubina total elevada (> 2 mg/dL)\n• Aumento de transaminases hepáticas (TGO/TGP)\n• Hipoalbuminemia.'
    },
    {
      id: 'hematologico',
      name: 'Sistema Hematológico',
      icon: Flame,
      color: 'border-wine bg-rose-950/60 text-rose-200',
      tagColor: 'bg-rose-900/60 text-rose-200 border-rose-800',
      description: 'Coagulação Intravascular Disseminada (CIVD) e consumo de plaquetas.',
      symptoms: '• Plaquetopenia profunda (< 100.000/mm³)\n• Sangramento espontâneo ou petéquias\n• Alargamento de TAP / TTPA e aumento do D-Dímero.'
    }
  ];

  const quizQuestions = [
    {
      question: 'Caso Clínico Parte 1: Ao receber Levi na UPA com erisipela e DM2 descompensado, afebril, mas com leve taquicardia (FC 100), qual o principal risco de prescrever apenas Cefalexina de forma oral para casa e dar alta com pressa?',
      options: [
        'Nenhum risco. Cefalexina oral é o padrão-ouro soberano para qualquer erisipela independentemente de outras doenças.',
        'Subestimar fatores de risco (DM2 e Idade 70a). Paciente idoso diabético tem alto potencial de progressão rápida para sepse e imunossupressão funcional. Ele merecia triagem glicêmica detalhada e observação/vigilância estrita.'
      ],
      correct: 1,
      explanation: 'O primeiro atendimento falhou em prever a gravidade sistêmica oculta de Levi. Pacientes geriátricos (>65 anos) com DM2 descompensado têm resposta imune prejudicada e barreira cutânea sofrida, evoluindo silenciosamente para infecção grave antes que a febre alta apareça.'
    },
    {
      question: 'Caso Clínico Parte 2: Levi retorna 48h depois com SAMU apresentando Glasgow 9, anúria, hipotensão severa (PA 60x40 mmHg) e febre (T 38.5°C). Qual o diagnóstico clínico correto segundo o Consenso Sepsis-3?',
      options: [
        'Erisipela bacteriana simples em vias de cura tópica.',
        'Choque Séptico. Levi apresenta hipotensão refratária persistente dadas as profundas alterações circulatórias e metabólicas celulares e evidente disfunção de múltiplos órgãos (anúria, coma).'
      ],
      correct: 1,
      explanation: 'Levi se enquadra em Choque Séptico devido à necessidade extrema de drogas vasoativas para manter a pressão arterial periférica e perfusão, associado a disfunção orgânica de múltiplos sistemas (neurológico e urinário).'
    },
    {
      question: 'Caso Clínico Parte 3: Estabelecido o choque séptico de Levi na sala de emergência, qual a ordem EXATA das condutas prioritárias sem atrasar a Hora Ouro?',
      options: [
        'Iniciar antibiótico imediatamente apenas após saírem todos os resultados de imagem e creatinina em cerca de 4 a 6 horas.',
        'Coleta de exames ultra-rápidos de sangue (Hemoculturas - 2 pares e Lactato arterial na gasometria) e início imediato de Antibioticoterapia empírica de Amplo Espectro com Ressuscitação volêmica (30 mL/Kg).'
      ],
      correct: 1,
      explanation: 'A coleta de hemoculturas e lactato deve ser feita em minutos e nunca deve atrasar o início do antibiótico. O antibiótico empírico direcionado DEVE ser infundido na 1ª hora (Hora Ouro). Ressuscitação com 30 mL/kg de cristalóide deve começar concomitantemente nas primeiras 3h.'
    },
    {
      question: 'Caso Clínico Parte 4: Após infundir 30 mL/Kg de Ringer Lactato (cristalóide balanceado), a PAM do Levi continua em 52 mmHg (abaixo da meta de 60-65 mmHg). Qual a conduta urgente recomendada?',
      options: [
        'Fazer mais 2 litros de soro fisiológico rapidamente, ignorando os riscos de congestão pulmonar aguda.',
        'Iniciar infusão de Norepinefrina (Noradrenalina) de forma periférica imediata para restabelecer a PAM e perfusão, programando acesso central posterior para segurança e infusão de vasopressor.'
      ],
      correct: 1,
      explanation: 'Se a meta hemodinâmica não for atingida após a reposição inicial, deve-se iniciar a Norepinefrina periférica sem demora. Prot误lamar o início de vasopressores para conseguir acesso central de emergência é um erro catastrófico que custa vidas.'
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [quizStep]: optionIndex }));
    setShowExplanation(true);
  };

  const nextQuiz = () => {
    setShowExplanation(false);
    setQuizStep(prev => prev + 1);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <StarOfLife size={160} className="text-red-500" />
        </div>
        <div className="flex items-center gap-3 text-red-500 mb-2">
          <StarOfLife size={28} className="animate-spin-slow text-red-500" />
          <span className="text-sm font-black uppercase tracking-[0.25em]">Medicina de Urgência</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Sepse & Choque Séptico</h1>
        <p className="text-slate-400 mt-1 max-w-3xl leading-relaxed text-sm">
          Protocolo de conduta baseado na <strong className="text-red-400">Surviving Sepsis Campaign (SSC) 2021</strong> e dados do <strong className="text-indigo-400">ILAS (Instituto Latino-Americano da Sepse) 2025</strong>. Profa. Fernanda Saad Rodrigues.
        </p>
      </div>

      {/* Horizontal Tabs Menu */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max border-b border-slate-800 pb-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 font-extrabold translate-y-[-2px]' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Panel Display */}
      <div className="bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DEFINIÇÃO E EPIDEMIOLOGIA */}
          {activeTab === 'definicao-epidemiologia' && (
            <motion.div
              key="definicao-epidemiologia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-8"
            >
              {/* Definições Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveDefPanel('oquee')}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    activeDefPanel === 'oquee' 
                      ? 'bg-rose-950/60 border-rose-500 ring-1 ring-rose-500/50 shadow-lg' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <h4 className={`font-extrabold text-base mb-1 ${activeDefPanel === 'oquee' ? 'text-white' : ''}`}>O que é a Sepse?</h4>
                  <p className="text-xs">Definição central</p>
                  
                  {activeDefPanel === 'oquee' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-4 pt-4 border-t border-rose-900/50 text-sm leading-relaxed text-rose-100 font-medium">
                      É uma <strong className="text-white">disfunção orgânica ameaçadora à vida</strong>, secundária a uma resposta desregulada do organismo à infecção. 
                    </motion.div>
                  )}
                </button>

                <button
                  onClick={() => setActiveDefPanel('choque')}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    activeDefPanel === 'choque' 
                      ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <h4 className={`font-extrabold text-base mb-1 ${activeDefPanel === 'choque' ? 'text-white' : ''}`}>E o Choque Séptico?</h4>
                  <p className="text-xs">Subgrupo grave</p>
                  
                  {activeDefPanel === 'choque' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-4 pt-4 border-t border-indigo-900/50 text-sm leading-relaxed text-indigo-100 font-medium">
                      Subgrupo dos pacientes com sepse contendo <strong className="text-white">anormalidades circulatórias, celulares e metabólicas</strong> profundas, apresentando maior risco de mortalidade. Exige vasopressores para manter PAM &ge; 65 mmHg.
                    </motion.div>
                  )}
                </button>

                <button
                  onClick={() => setActiveDefPanel('oque-nao-e')}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    activeDefPanel === 'oque-nao-e' 
                      ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <h4 className={`font-extrabold text-base mb-1 ${activeDefPanel === 'oque-nao-e' ? 'text-white' : ''}`}>O que a Sepse NÃO é?</h4>
                  <p className="text-xs">Erros conceituais</p>
                  
                  {activeDefPanel === 'oque-nao-e' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-4 pt-4 border-t border-emerald-900/50 text-sm leading-relaxed text-emerald-100 font-medium">
                      Sepse <strong className="text-white">não significa a presença de microrganismo na corrente sanguínea</strong>! Infecção do sangue (bacteremia) pode ocorrer sem sepse, e a sepse ocorre sem bacteremia em muitos casos.
                    </motion.div>
                  )}
                </button>
              </div>

              {/* Informative Stats */}
              <div>
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Globe size={18} className="text-slate-500" /> Aspectos Epidemiológicos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center">
                    <span className="block text-3xl font-black text-red-500">166 Mi</span>
                    <span className="text-xs text-slate-400 block mt-1 uppercase tracking-wider font-extrabold">Casos Globais Anuais</span>
                  </div>
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center">
                    <span className="block text-3xl font-black text-red-500">21.4 Mi</span>
                    <span className="text-xs text-slate-400 block mt-1 uppercase tracking-wider font-extrabold">Óbitos Anuais</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">~1/3 de todas as mortes no mundo</span>
                  </div>
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center">
                    <span className="block text-3xl font-black text-indigo-400">+230%</span>
                    <span className="text-xs text-slate-400 block mt-1 uppercase tracking-wider font-extrabold">Aumento de Incidência</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Observado pós-pandemia global</span>
                  </div>
                </div>
              </div>

              {/* Risk Populations */}
              <div>
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Users size={18} className="text-slate-500" /> Populações de Risco (<span className="text-rose-400">Alto Risco de Piora Clínica</span>)
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setSelectedRiskPop(selectedRiskPop === 'idosos' ? null : 'idosos')}
                    className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${selectedRiskPop === 'idosos' ? 'bg-slate-900 border-white/20 ring-1 ring-white/10' : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300">
                      <Users size={24} />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">Idosos</strong>
                      <span className="text-xs text-slate-400">&gt; 65 anos de idade</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setSelectedRiskPop(selectedRiskPop === 'neonatos' ? null : 'neonatos')}
                    className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${selectedRiskPop === 'neonatos' ? 'bg-slate-900 border-white/20 ring-1 ring-white/10' : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">Neonatos / Lactentes</strong>
                      <span className="text-xs text-slate-400">&lt; 1 ano de idade</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setSelectedRiskPop(selectedRiskPop === 'cronicos' ? null : 'cronicos')}
                    className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${selectedRiskPop === 'cronicos' ? 'bg-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/50' : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-950/50 border border-indigo-800 flex items-center justify-center text-indigo-400">
                      <Activity size={24} />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">Doentes Crônicos</strong>
                      <span className="text-xs text-slate-400">DM2, IC, DRC, Cirrose</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setSelectedRiskPop(selectedRiskPop === 'imuno' ? null : 'imuno')}
                    className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${selectedRiskPop === 'imuno' ? 'bg-rose-950/40 border-rose-500/50 ring-1 ring-rose-500/50' : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-rose-950/50 border border-rose-800 flex items-center justify-center text-rose-400">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">Imunossuprimidos</strong>
                      <span className="text-xs text-slate-400">HIV, Quimio, Transplante</span>
                    </div>
                  </button>
                </div>
                
                <AnimatePresence>
                  {selectedRiskPop && (
                    <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed">
                      {selectedRiskPop === 'idosos' && 'No envelhecimento, há imunossenescência e múltiplas comorbidades. Os idosos frequentemente não apresentam febre, o que mascara a disfunção até fases avançadas.'}
                      {selectedRiskPop === 'neonatos' && 'As crianças menores de 1 ano de idade contam com a imaturidade do sistema imunológico (especialmente a deficiência em localizar inflamações), favorecendo contágios e disseminação rápida das infecções.'}
                      {selectedRiskPop === 'cronicos' && 'Doenças como diabetes, insuficiência renal crônica e cirrose prejudicam gravemente a quimiotaxia e a fagocitose de macrófagos e a depuração de patógenos.'}
                      {selectedRiskPop === 'imuno' && 'Pacientes fazendo uso de drogas imunossupressoras têm falhas graves na apresentação de antígenos e predispõem-se a translocações bacterianas invasivas (ex: Neutropenia febril).'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FISIOPATOLOGIA */}
          {activeTab === 'fisiopatologia' && (
            <motion.div
              key="fisiopatologia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              <div className="bg-gradient-to-r from-red-950/40 to-slate-900 p-6 rounded-2xl border border-red-900/40 relative">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Flame className="text-red-500 animate-pulse" size={20} />
                  A cascata inflamatória desregulada
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
                  A sepse não é simplesmente uma infecção localizada. É um colapso sistêmico decorrente de uma <strong className="text-red-400">resposta imune desregulada e mal adaptada</strong>. Essa resposta maciça desencadeia vasodilatação massiva mediada por óxido nítrico, aumento patológico da permeabilidade vascular resultando em perda de fluidos (fuga de terceiro espaço), e ativação de eventos pró-coagulantes microvasculares que resultam em isquemia celular difusa.
                </p>
                
                {/* Rule of Gold Alert Banner */}
                <div className="mt-4 p-3 bg-red-900/40 border border-red-700/60 rounded-xl flex items-center gap-3">
                  <AlertTriangle className="text-red-400 shrink-0 animate-bounce" size={20} />
                  <span className="text-xs font-black text-red-200 uppercase tracking-wider">
                    REGRA DE OURO DA DIRETRIZ: Desde 2016 e reafirmado em 2021, NÃO se utiliza o termo "SEPSE GRAVE". Toda sepse já constitui disfunção orgânica de alto risco.
                  </span>
                </div>
              </div>

              {/* Flowchart: Resposta Inflamatória */}
              <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">
                  Fluxograma da Fisiopatologia
                </h4>
                
                <div className="flex flex-col gap-2 relative z-10 w-full max-w-2xl mx-auto">
                  {/* Step 1 */}
                  <button 
                    onClick={() => setActiveFisioStep(1)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeFisioStep === 1 ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500/50 scale-[1.01]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${activeFisioStep === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</div>
                      <h5 className={`font-extrabold text-sm ${activeFisioStep === 1 ? 'text-indigo-300' : 'text-slate-300'}`}>Infecção Inicial (Foco)</h5>
                    </div>
                    {activeFisioStep === 1 && (
                      <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mt-3 pl-11 text-xs text-indigo-100/80 leading-relaxed">
                        Invasão do patógeno e liberação de padrões moleculares (PAMPs/DAMPs). Ativação dos macrófagos teciduais.
                      </motion.div>
                    )}
                  </button>

                  <div className="flex justify-center -my-1 text-slate-700 z-0"><ArrowDown size={20} /></div>

                  {/* Step 2 */}
                  <button 
                    onClick={() => setActiveFisioStep(2)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeFisioStep === 2 ? 'bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-500/50 scale-[1.01]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${activeFisioStep === 2 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</div>
                      <h5 className={`font-extrabold text-sm ${activeFisioStep === 2 ? 'text-amber-300' : 'text-slate-300'}`}>Tempestade de Citocinas & Ativação Endotelial</h5>
                    </div>
                    {activeFisioStep === 2 && (
                      <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mt-3 pl-11 text-xs text-amber-100/80 leading-relaxed">
                        Liberação maciça de IL-1, IL-6 e TNF-alfa. O endotélio perde a capacidade de regulação e torna-se um ambiente pró-coagulante e permeável.
                      </motion.div>
                    )}
                  </button>

                  <div className="flex justify-center -my-1 text-slate-700 z-0"><ArrowDown size={20} /></div>

                  {/* Step 3 */}
                  <button 
                    onClick={() => setActiveFisioStep(3)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeFisioStep === 3 ? 'bg-red-950/60 border-red-500 shadow-md ring-1 ring-red-500/50 scale-[1.01]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${activeFisioStep === 3 ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</div>
                      <h5 className={`font-extrabold text-sm ${activeFisioStep === 3 ? 'text-red-300' : 'text-slate-300'}`}>Choque Microvascular</h5>
                    </div>
                    {activeFisioStep === 3 && (
                      <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mt-3 pl-11 text-xs text-red-100/80 leading-relaxed">
                        <strong className="text-white block mb-1">A Tríade Letal:</strong>
                        <span className="text-red-300 font-bold block">1. Vasodilatação intensa:</span> Queda brutal da RVP devido ao Óxido Nítrico. <br/>
                        <span className="text-red-300 font-bold block mt-1">2. Fuga Capilar:</span> Hipovolemia relativa por extravasamento de líquidos (Edema). <br/>
                        <span className="text-red-300 font-bold block mt-1">3. Coagulação:</span> Microtrombos (CIVD) entopem o fluxo sanguíneo local.
                      </motion.div>
                    )}
                  </button>

                  <div className="flex justify-center -my-1 text-slate-700 z-0"><ArrowDown size={20} /></div>

                  {/* Step 4 */}
                  <button 
                    onClick={() => setActiveFisioStep(4)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeFisioStep === 4 ? 'bg-rose-950/60 border-rose-500 shadow-md ring-1 ring-rose-500/50 scale-[1.01]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${activeFisioStep === 4 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}>4</div>
                      <h5 className={`font-extrabold text-sm ${activeFisioStep === 4 ? 'text-rose-300' : 'text-slate-300'}`}>Hipóxia Tecidual (Raiz dos Sintomas)</h5>
                    </div>
                    {activeFisioStep === 4 && (
                      <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mt-3 pl-11 text-xs text-rose-100/80 leading-relaxed">
                        Células deixam de receber fluxo e oxigênio. Inicia-se o metabolismo anaeróbico (hiperlactatemia). Depleção celular de ATP e acúmulo de radicais livres, gerando necrose e isquemia.
                      </motion.div>
                    )}
                  </button>
                  
                  <div className="flex justify-center -my-1 text-slate-700 z-0"><ArrowDown size={20} /></div>

                  {/* Step 5 */}
                  <button 
                    onClick={() => setActiveFisioStep(5)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeFisioStep === 5 ? 'bg-purple-950/60 border-purple-500 shadow-md ring-1 ring-purple-500/50 scale-[1.01]' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${activeFisioStep === 5 ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>5</div>
                      <h5 className={`font-extrabold text-sm ${activeFisioStep === 5 ? 'text-purple-300' : 'text-slate-300'}`}>Disfunção Manifesta de Órgãos</h5>
                    </div>
                    {activeFisioStep === 5 && (
                      <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mt-3 pl-11 text-xs text-purple-100/80 leading-relaxed">
                        Apoptose profunda deflagra falências macroscópicas. Explore a caixa abaixo para ver os sintomas específicos de cada sistema nervoso, cárdico, pulmonar e renal.
                      </motion.div>
                    )}
                  </button>
                </div>
              </div>

              {/* Organ Systems Selector Grid */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">
                    Disfunções Orgânicas (Sistemas Críticos do SOFA)
                  </h4>
                  <p className="text-xs text-slate-400">Clique nas caixas de decisão para revelar os sinais clínicos e critérios diagnósticos de queda por sistema:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {organs.map((organ) => {
                    const StateIcon = organ.icon;
                    const isSelected = selectedOrgan === organ.id;
                    return (
                      <button
                        key={organ.id}
                        id={`organ-selector-${organ.id}`}
                        onClick={() => setSelectedOrgan(isSelected ? null : organ.id)}
                        className={`p-5 rounded-2xl border text-left transition-all flex flex-col gap-4 relative overflow-hidden group hover:scale-[1.02] ${
                          isSelected ? `${organ.color} ring-2 ring-white/20 scale-[1.03] shadow-lg` : 'border-slate-800 bg-slate-950/40 hover:bg-slate-900 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/10' : 'bg-slate-900 border border-slate-800'}`}>
                            <StateIcon size={24} className={isSelected ? 'text-white' : 'text-red-400'} />
                          </div>
                          {isSelected && <span className="text-[10px] text-white font-black bg-white/15 px-2 py-0.5 rounded-full uppercase">Ativo</span>}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-base">{organ.name}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-1">{organ.description}</p>
                        </div>
                        
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-white/10 pt-4 mt-2 overflow-hidden"
                            >
                              <p className="text-xs font-black text-white tracking-widest uppercase mb-2">Manifestações Clínicas:</p>
                              <pre className="text-xs font-sans text-slate-200 leading-relaxed whitespace-pre-line">
                                {organ.symptoms}
                              </pre>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>
              </div>


            </motion.div>
          )}

          {/* TAB 2: TRIAGEM & SCORES */}
          {activeTab === 'triagem' && (
            <motion.div
              key="triagem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              <div className="bg-amber-950/20 border border-amber-900/40 p-5 rounded-2xl text-amber-200 flex items-start gap-4">
                <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={24} />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-base">Mudança Importante: Triagem de Sepse</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    As diretrizes internacionais recomendam <strong className="text-white">NÃO usar o qSOFA como ferramenta única ou principal</strong> de triagem diagnóstica por sua baixa sensibilidade inicial. Em vez do qSOFA, recomenda-se rastreio precoce cruzando scores fisiológicos estruturados como <strong className="text-amber-400">NEWS, NEWS2, MEWS</strong> ou critérios de <strong className="text-yellow-400">SIRS</strong> dadas as suas robustas sensibilidades.
                  </p>
                </div>
              </div>

              {/* Rastreio early detection options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* SIRS */}
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <span className="px-3 py-1 bg-red-900/50 text-red-200 border border-red-800 text-xs font-black rounded-lg uppercase tracking-wide">
                      Mapeamento
                    </span>
                    <h4 className="text-lg font-extrabold text-white">Critérios SIRS</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    SIRS (Síndrome da Resposta Inflamatória Sistêmica) exige pelo menos <strong className="text-white">dois ou mais</strong> dos seguintes achados:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-red-400 font-bold block mb-1">Temperatura</span>
                      <span className="text-white font-extrabold">&gt; 38°C ou &lt; 36°C</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-red-400 font-bold block mb-1">Frequência Cardíaca</span>
                      <span className="text-white font-extrabold">&gt; 90 bpm</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-red-400 font-bold block mb-1">Frequência Resp.</span>
                      <span className="text-white font-extrabold">&gt; 20 irpm ou pCO2 &lt; 32 mmHg</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-red-400 font-bold block mb-1">Leucócitos</span>
                      <span className="text-white font-extrabold">&gt; 12.000, &lt; 4.000 ou &gt; 10% bastões</span>
                    </div>
                  </div>
                </div>

                {/* SOFA Score */}
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <span className="px-3 py-1 bg-indigo-900/50 text-indigo-200 border border-indigo-800 text-xs font-black rounded-lg uppercase tracking-wide">
                      Definição Sepsis-3
                    </span>
                    <h4 className="text-lg font-extrabold text-white">Score SOFA (Disfunção)</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    A sepse é confirmada quando há suspeita de infecção associada a uma <strong className="text-white">variação aguda de &ge; 2 pontos no score SOFA</strong> (Sequential Organ Failure Assessment).
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 flex justify-between items-center text-slate-300">
                      <span>Relação PaO2 / FiO2</span>
                      <span className="text-slate-400">Pontua de 0 a 4 conforme hipoxemia</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 flex justify-between items-center text-slate-300">
                      <span>Plaquetopenia</span>
                      <span className="text-slate-400">&lt; 150k (1 pto) até &lt; 20k (4 ptos)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 flex justify-between items-center text-slate-300">
                      <span>Bilirrubinas</span>
                      <span className="text-slate-400">Elevações progressivas de bilirrubina</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 flex justify-between items-center text-slate-300">
                      <span>Pressão Arterial Média (PAM)</span>
                      <span className="text-slate-400">Hipotensão ou necessidade de vasopressores</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Foco Infeccioso Stats */}
              <div className="bg-slate-950/30 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Principais Focos Infecciosos (ILAS 2025 - Brasil)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mt-3">
                  <div className="p-3 bg-red-950/20 border-l-4 border-red-500 rounded-lg text-slate-300">
                    <strong className="block text-white mb-1">Pneumonia</strong>
                    44.3% dos casos gerais
                  </div>
                  <div className="p-3 bg-blue-950/20 border-l-4 border-blue-500 rounded-lg text-slate-300">
                    <strong className="block text-white mb-1">Trato Urinário</strong>
                    14.7% (11.4% público, 19.5% privado)
                  </div>
                  <div className="p-3 bg-amber-950/20 border-l-4 border-amber-500 rounded-lg text-slate-300">
                    <strong className="block text-white mb-1">Foco Abdominal</strong>
                    13.0% (11.6% público, 14.9% privado)
                  </div>
                  <div className="p-3 bg-slate-900 border-l-4 border-slate-500 rounded-lg text-slate-300">
                    <strong className="block text-white mb-1">Outros Focos</strong>
                    28.0% dos registros
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CASO CLÍNICO LEVI */}
          {activeTab === 'caso-clinico' && (
            <motion.div
              key="caso-clinico"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              {/* Clinical Case Patient Identity Card */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-indigo-500/5 rotate-12 select-none">
                  <BookOpen size={160} />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 bg-indigo-900/50 text-indigo-300 border border-indigo-800 text-[10px] font-black rounded-lg uppercase tracking-wider block w-max mb-2">
                    Estudo de Caso Prático
                  </span>
                  <h3 className="text-2xl font-black text-white">Paciente Levi, 70 anos</h3>
                  <p className="text-slate-400 text-sm mt-1">Aposentado, portador de Diabetes Mellitus tipo 2 (DM2) gravemente descompensado.</p>
                </div>
                <button 
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold rounded-lg flex items-center gap-2"
                >
                  <RefreshCw size={14} /> Reiniciar Simulação
                </button>
              </div>

              {/* Active Quiz steps */}
              {quizStep < quizQuestions.length ? (
                <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/30 flex flex-col gap-5">
                  <div className="flex justify-between items-center text-xs font-mono text-indigo-400 uppercase tracking-wider">
                    <span>Quiz de Conduta Prática</span>
                    <span>Etapa {quizStep + 1} de {quizQuestions.length}</span>
                  </div>
                  
                  <h4 className="text-lg font-extrabold text-white leading-relaxed">
                    {quizQuestions[quizStep].question}
                  </h4>

                  <div className="flex flex-col gap-3">
                    {quizQuestions[quizStep].options.map((option, idx) => {
                      const isAnswered = quizAnswers[quizStep] !== undefined;
                      const isSelected = quizAnswers[quizStep] === idx;
                      const isCorrect = quizQuestions[quizStep].correct === idx;
                      
                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          id={`quiz-option-${quizStep}-${idx}`}
                          onClick={() => handleAnswerSelect(idx)}
                          className={`p-4 rounded-xl text-left text-sm font-bold border transition-all ${
                            isAnswered 
                              ? isCorrect 
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' 
                                : isSelected 
                                  ? 'bg-red-950/60 border-red-500 text-red-200' 
                                  : 'bg-slate-900/30 border-slate-800 text-slate-600'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-850 flex items-center justify-center font-black border text-xs shrink-0">
                              {idx === 0 ? 'A' : 'B'}
                            </span>
                            <span className="leading-relaxed">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-sm overflow-hidden"
                      >
                        <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                          <CheckCircle size={16} className="text-emerald-400" />
                          Justificativa e Raciocínio Clínico
                        </div>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {quizQuestions[quizStep].explanation}
                        </p>
                        
                        <button
                          onClick={nextQuiz}
                          className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-lg flex items-center gap-1 uppercase tracking-wider ml-auto"
                        >
                          Avançar <ChevronRight size={14} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Completed Quiz view */
                <div className="bg-emerald-950/20 p-8 rounded-2xl border border-emerald-900/40 text-center flex flex-col items-center gap-4 max-w-2xl mx-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 border border-emerald-800 shadow-md">
                    <Award size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wider">Simulação do Caso Resolvida!</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Você conduziu o paciente Levi de forma impecável, corrigindo a conduta da alta precoce na UPA, iniciando exames e condutas adequadas na 1ª hora (Hora Ouro) e titulando vasopressores periféricos sem atrasos.
                  </p>
                  <button 
                    onClick={resetQuiz}
                    className="mt-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 font-extrabold text-xs text-white rounded-lg uppercase tracking-wider"
                  >
                    Simular Novamente
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: TRATAMENTO */}
          {activeTab === 'tratamento' && (
            <motion.div
              key="tratamento"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 space-y-6"
            >
              {/* Topicos Menu */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: 'exames', label: '1. Exames Iniciais' },
                  { id: 'volemia', label: '2. Ressuscitação Volêmica' },
                  { id: 'antibiotico', label: '3. Antibiótico (Hora Ouro)' },
                  { id: 'vasoativo', label: '4. Agentes Vasoativos' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTrataTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
                      activeTrataTab === tab.id 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30 font-extrabold translate-y-[-2px]' 
                        : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                
                {/* 1. Exames Iniciais */}
                {activeTrataTab === 'exames' && (
                  <motion.div key="exames" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                      <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity size={24} /> O que pedir na Hora Zero?
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        A avaliação laboratorial não deve gerar falsas esperanças de confirmação na emergência. Os sintomas da sepse são inespecíficos, e a síndrome é profundamente heterogênea. O laboratório serve primordialmente para <strong className="text-white">definir base de disfunção (SOFA)</strong> e guiar o tratamento guiado por metas.
                      </p>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                          <strong className="text-white text-sm uppercase tracking-widest font-black block mb-2 border-b border-slate-800 pb-2">Hemoculturas</strong>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Devem ser coletadas idealmente <strong className="text-rose-400">ANTES do início do antimicrobiano</strong> (dois pares anaeróbio e aeróbio de sítios distintos). Contudo, a diretriz é rigorosa: a coleta das culturas em <strong className="text-white">HIPÓTESE ALGUMA PODE ATRASAR o início do antibiótico empírico</strong> para além do tempo de janela (45 minutos). Se acesso for difícil, administre o antibiótico.
                          </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                          <strong className="text-white text-sm uppercase tracking-widest font-black block mb-2 border-b border-slate-800 pb-2">Lactato Sérico</strong>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Biomarcador central de isquemia global e metabolismo anaeróbico. Níveis elevados (&gt; 2 mmol/L) predizem intensa mortalidade sistêmica e hipoperfusão oculta. É obrigação <strong className="text-rose-400">remedir este lactato em 2 a 4 horas</strong> para avaliar o "Clareamento de Lactato" provocado pela reposição volêmica adequada.
                          </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                          <strong className="text-white text-sm uppercase tracking-widest font-black block mb-2 border-b border-slate-800 pb-2">Gasometria (Perfil Ácido-Base)</strong>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Essencial para documentar a gravidade circulatória. A perfusão inadequada tecidual se manifesta frequentemente como uma <strong className="text-amber-400">Acidose Metabólica com Anion Gap alto</strong> (acidose lática). A gasometria arterial avalia ainda a oxigenação (PaO2) nas insuficiências respiratórias da sepse.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex bg-rose-950/20 text-rose-300 p-4 border border-rose-900/40 rounded-xl items-center gap-3">
                         <ShieldAlert size={24} className="shrink-0" />
                         <span className="text-xs font-medium">Os exames nunca devem atrasar as condutas ativas de tratamento! Colete urina, Rx de Tórax e enzimas enquanto o resgate hemodinâmico acontece.</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Ressuscitação Volêmica */}
                {activeTrataTab === 'volemia' && (
                  <motion.div key="volemia" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                      <h3 className="text-xl font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Droplets size={24} /> Resgate Circulatório
                      </h3>

                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="bg-indigo-950/20 p-4 rounded-xl border border-indigo-900/40">
                            <span className="text-[10px] uppercase font-black text-indigo-400 block mb-1">A Regra Ouro do Volume</span>
                            <div className="text-2xl font-black text-white uppercase font-mono tracking-tighter">
                              30 mL / Kg <span className="text-sm font-medium text-slate-400 ml-2">de Cristaloides</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                              A serem totalmente infundidos <strong className="text-white">nas primeiras 3 horas</strong>. Baseado no peso real do paciente. Início imediato ao reconhecer a hipotensão orgânica da sepse.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                              <span className="text-[10px] uppercase font-black text-slate-500 block mb-1">Fluido de Escolha</span>
                              <strong className="text-sm text-white">Ringer Lactato <span className="text-slate-500">(Balanceado)</span></strong> 
                              <p className="text-[10px] mt-1 text-slate-400">Preferencial para evitar acidose hiperclorêmica causada por grandes volumes de SG 0.9%.</p>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                              <span className="text-[10px] uppercase font-black text-slate-500 block mb-1">Alvo Hemodinâmico</span>
                              <strong className="text-sm text-white">PAM = 65 mmHg</strong>
                              <p className="text-[10px] mt-1 text-slate-400">Se idoso (&gt; 65 anos), uma PAM relaxada perto de 60 mmHg pode ser bem tolerada.</p>
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-1/3 bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col justify-center relative overflow-hidden">
                          <div className="absolute top-2 right-2 opacity-5"><TrendingUp size={80} /></div>
                          <span className="block text-white font-black text-sm uppercase tracking-widest mb-2 z-10">Qual o sentido disso?</span>
                          <p className="text-xs text-slate-400 z-10 leading-relaxed mb-4">
                            Cerca de 60% do fluido do compartimento vascular extravasa com a inflamação absurda (fuga capilar). Essa hidratação não é sobre "encher a bexiga", é sobre criar <strong>pressão de fechamento venosa</strong>, aumentar o débito cardíaco pela Lei de Frank-Starling e resgatar perfusão num corpo que perdeu seu volume relativo na dilatação total.
                          </p>
                          <div className="bg-emerald-950/20 text-emerald-400 p-3 rounded-xl border border-emerald-900/40 text-[10px] font-bold z-10 mt-auto uppercase">
                            Aumento PAM → Aumento de Fluxo Sanguíneo → Melhora da Perfusão.
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl mt-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500"><Droplets size={100} /></div>
                        <span className="text-[10px] uppercase font-black text-emerald-500 tracking-widest block mb-2">Conceito Chave de Transição</span>
                        <h4 className="text-white font-black text-base mb-2">Sepse vs Choque Séptico: A Linha do Volume</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          A grande métrica clínica para dividir as duas gravidades durante a ressuscitação inicial é a <strong className="text-white">Responsividade ao Volume</strong>. Se a pressão arterial (PAM) do paciente estabiliza (&ge; 65 mmHg) isoladamente após receber os 30 mL/kg de cristaloide, o diagnóstico final obedece apenas a "Sepse". Porém, se a hipotensão arterial grave persistir <strong className="text-emerald-400">MESMO APÓS toda a ressuscitação volêmica adequada</strong> (e aliar-se à necessidade de Vasopressores e Hiperlactatemia), o paciente diagnosticamente decaiu para o "Choque Séptico", com altíssima mortalidade associada.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. Antibiótico */}
                {activeTrataTab === 'antibiotico' && (
                  <motion.div key="antibiotico" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12"><Clock size={200} /></div>
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                        <h3 className="text-xl font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                          <Clock size={24} /> O Conceito da "Hora Ouro"
                        </h3>
                        <span className="px-3 py-1.5 bg-amber-600 font-extrabold text-white text-xs uppercase rounded-lg">
                          Administração &lt; 60 Minutos
                        </span>
                      </div>

                      <div className="space-y-4 mb-6">
                        <p className="text-sm text-slate-300 leading-relaxed relative border-l-2 border-amber-500 pl-4">
                          Em pacientes cujo choque séptico (hipotensão e hiperlactatemia severa) esteja claramente estabelecido, os <strong className="text-white">antimicrobianos empíricos venosos de amplo espectro devem infundir o mais rigorosamente depressa possível</strong> (na primeira hora após reconhecimento da síndrome).
                        </p>
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                           <div className="w-12 h-12 bg-amber-950/50 rounded-full flex items-center justify-center border border-amber-900 text-amber-400 text-xl font-black shrink-0">1h</div>
                           <p className="text-xs text-slate-400">
                             <strong>Porquê a urgência mortal?</strong> Cada hora individual de atraso de início da medicação correta (após chegada na emergência) está ligada a um aumento estatístico dramático na probabilidade de mortalidade (OR ≈ 1.04 p&lt;0.001) para doentes que precisam de vasopressor.
                           </p>
                        </div>
                      </div>

                      <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">O Grau de Certeza vs Tempo (Timing da Sepse)</h4>
                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex-1 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                          <strong className="text-rose-400 text-sm font-black uppercase tracking-wider block mb-2">Confirmada | Alta Suspeição (Provável)</strong>
                          <p className="text-xs text-slate-300 leading-relaxed mb-2">
                            Diagnóstico provável baseado na história e clínica. O diagnóstico alternativo é improvável.
                          </p>
                          <div className="bg-rose-950/30 p-2 rounded-lg border border-rose-900/50 mt-auto">
                            <span className="text-[10px] text-rose-300 font-bold block uppercase">Sem choque ou Com choque:</span>
                            <strong className="text-white text-xs">Administração IMEDIATA (&lt;1 hora)</strong>
                          </div>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex-1 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
                          <strong className="text-amber-400 text-sm font-black uppercase tracking-wider block mb-2">Baixa Suspeição (Possível)</strong>
                          <p className="text-xs text-slate-300 leading-relaxed mb-2">
                            Sepse é até possível, mas um diagnóstico alternativo (agudo, não-infeccioso) parece igualmente provável.
                          </p>
                          <div className="flex flex-col gap-2 mt-auto">
                            <div className="bg-rose-950/30 p-2 rounded-lg border border-rose-900/50">
                              <span className="text-[10px] text-rose-300 font-bold block uppercase">Presença de Choque:</span>
                              <strong className="text-white text-xs">IMEDIATA (&lt;1 hora)</strong>
                            </div>
                            <div className="bg-amber-950/30 p-2 rounded-lg border border-amber-900/50">
                              <span className="text-[10px] text-amber-300 font-bold block uppercase">Ausência de Choque:</span>
                              <strong className="text-white text-xs">Reavaliação Rápida. Em até 3 horas.</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Pacote de Recomendações das Diretrizes de Antibioticoterapia</h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                         
                         <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 space-y-2 relative overflow-hidden">
                           <strong className="text-amber-400 block mb-1 uppercase text-[10px] border-b border-slate-800 pb-1">1. Reavaliação &amp; Suspensão</strong>
                           <ul className="list-disc pl-3 space-y-1">
                             <li>Para pacientes sem infecção confirmada, instituir curso restrito e <strong className="text-white">procurar continuamente diagnósticos não infecciosos</strong> (1/3 não possui infecção no final).</li>
                             <li>Se uma etiologia alternativa for comprovada, <strong className="text-white">interromper os antimicrobianos empíricos</strong> imediatamente.</li>
                             <li>Sugerida avaliação <strong className="text-white">diária</strong> para descalonamento ao invés de utilizar duração fixa de terapia cega.</li>
                           </ul>
                         </div>

                         <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 space-y-2 relative overflow-hidden">
                           <strong className="text-amber-400 block mb-1 uppercase text-[10px] border-b border-slate-800 pb-1">2. Farmacocinética (Pk/Pd) &amp; Função Renal</strong>
                           <ul className="list-disc pl-3 space-y-1">
                             <li>Para Beta-lactâmicos, recomenda-se <strong className="text-white">infusão contínua</strong> (<strong className="text-amber-400 text-[10px] uppercase">exceto na 1ª dose</strong>, que deve ser rápida para atingir alvo sérico imediato).</li>
                             <li>A função renal varia abruptamente na admissão. Fazer ajustes posológicos renais <strong className="text-white">somente após as primeiras 24 horas</strong> de fluidos e estabilização.</li>
                           </ul>
                         </div>

                         <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 space-y-2 relative overflow-hidden">
                           <strong className="text-amber-400 block mb-1 uppercase text-[10px] border-b border-slate-800 pb-1">3. MRSA, Antifúngicos e Virais</strong>
                           <ul className="list-disc pl-3 space-y-1">
                             <li>Uso de antimicrobiano para <strong className="text-white">MRSA</strong> (ex. Vancomicina) ou profilaxia Antifúngica só recomendada em pacientes com <strong className="text-white">Alto Risco</strong> de ter as infecções. O uso cego em doentes de baixo risco é <strong className="text-white">contra-indicado</strong>.</li>
                             <li>Não se faz recomendação de agentes antivirais rotineiros na sepse comunitária padrão.</li>
                           </ul>
                         </div>

                         <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 space-y-2 relative overflow-hidden">
                           <strong className="text-amber-400 block mb-1 uppercase text-[10px] border-b border-slate-800 pb-1">4. Dupla Cobertura Gram-Negativa &amp; Tempo Terapêutico</strong>
                           <ul className="list-disc pl-3 space-y-1">
                             <li>Cobertura dupla para Gram-Negativos (<strong className="text-white">apenas recomendada se há alto risco de MDR</strong> - Multi-Drug Resistance). Retirar a dupla cobertura assim que as sensibilidades chegarem.</li>
                             <li>Duração da Terapia: Cursos da terapia <strong className="text-white">curtos (5 a 8 dias)</strong> demonstraram <strong className="text-amber-400">ausência de diferença em sobrevida</strong> quando comparados com terapias duradouras (10 a 15 dias) em grandes trials clínicos de pneumonias e infecções intra-abdominais.</li>
                           </ul>
                         </div>

                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. Vasoativos */}
                {activeTrataTab === 'vasoativo' && (
                  <motion.div key="vasoativo" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                      <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Syringe size={24} /> Drogas Vasoativas
                      </h3>

                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                        Se após administrar a cota volêmica pesada, o paciente permanecer chocado (PAM &lt; 65 mmHg ou hiperlactatemia severa persistente), os recetores alfa e os endotélios devem ser estimulados quimicamente pelo uso de constritores exógenos. Não necessita aguardar o término do 1º Litro se o doente apresentar franca vasoplegia (diastólicas perigosamente baixas).
                      </p>

                      <div className="space-y-6">
                        
                        {/* 1 linha: Nora */}
                        <div className="bg-rose-950/20 border border-rose-900/40 p-5 rounded-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                           <span className="text-[10px] font-black uppercase text-rose-400 tracking-widest block mb-2">A Primeira Linha de Choque</span>
                           <h4 className="text-lg font-black text-white flex items-center gap-2 mb-2">Norepinefrina (Noradrenalina)</h4>
                           <p className="text-xs text-slate-300 mb-4">
                             Ação Alfa-1 brutal com inotropismo menor (Beta-1). Endovenosa contínua preferencialmente em CVC (Central), mas via periférica forte pode ser tolerada nas emergências por horas.<br/>
                             <strong className="text-rose-300 mt-2 block">Dose:</strong> 0.05 a 0.15 mcg/kg/min (pode titular até alvos de PAM &gt; 65mmHg).
                           </p>
                        </div>

                        {/* 2 linha: Vasopressina */}
                        <div className="bg-indigo-950/20 border border-indigo-900/40 p-5 rounded-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
                           <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block mb-2">Adjuvante (Segunda Linha)</span>
                           <h4 className="text-lg font-black text-white flex items-center gap-2 mb-2">Vasopressina</h4>
                           <p className="text-xs text-slate-300 mb-4">
                             Adicionar no momento exato em que a Noradrenalina está muito alta e as catecolaminas endógenas sofrem downregulation dos receptores (<strong className="text-white">Quando dose da nora exceder 0.25 a 0.5 mcg/kg/min</strong>).<br/>
                             <strong className="text-indigo-300 mt-2 block">Dose Não Titulável Constante:</strong> 0.03 U/min (raro 0.04).
                           </p>
                        </div>

                        {/* Corticoides e Epinefrina */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                             <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Corticosteroide Sistêmico</span>
                             <strong className="text-slate-200 text-sm block mb-2">Hidrocortisona (Dose Estresse)</strong>
                             <p className="text-xs text-slate-400 leading-relaxed">
                               O eixo HPA do paciente se esgota na sepse (Insuficiência suprarrenal relativa). Se vasopressores não atingem alvos &gt; 4 horas (<strong className="text-white">Nora &gt; 0.25 mcg/kg/min &gt; 4h</strong>), inicie: 200mg/dia (50mg EV de 6/6h).
                             </p>
                          </div>
                          
                          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                             <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Terceira Linha & Disfunção CARDÍACA</span>
                             <strong className="text-slate-200 text-sm block mb-2">Epinefrina / Dobutamina</strong>
                             <p className="text-xs text-slate-400 leading-relaxed">
                               Epinefrina entra caso vasopressina e nora maximal falhem. Se ecoscopia e clínica revelarem clara deficiência de bomba associada ao choque com perfusão morta: Inserir a inotrópica (<strong className="text-white">Dobutamina</strong>).
                             </p>
                          </div>
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
