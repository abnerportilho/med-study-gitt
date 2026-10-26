import React, { useState } from 'react';
import { 
  Activity, Stethoscope, AlertTriangle, ShieldAlert, CheckCircle2, 
  HelpCircle, ChevronRight, ArrowRight, Pill, HeartPulse, Brain, 
  Sparkles, Layers, Info, Flame, Moon, Eye, FileText, Zap, 
  AlertCircle, Scale, ShieldCheck, Thermometer, UserCheck, RefreshCw, 
  Dna, Heart, Sun, ArrowRightLeft, BookOpen, Clock, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { VisualFlowchartTree } from './components/VisualFlowchartTree';
import { HormoneTherapyFlowchart } from './components/HormoneTherapyFlowchart';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Card informativo com alto contraste
function InteractiveBalloon({
  title,
  subtitle,
  text,
  badge,
  badgeColor = "bg-blue-900/80 text-blue-200 border-blue-700",
  borderColor = "border-blue-800/80",
  bgColor = "bg-slate-900/90",
  icon: Icon = Info,
  children
}: {
  title: string;
  subtitle?: string;
  text?: string;
  badge?: string;
  badgeColor?: string;
  borderColor?: string;
  bgColor?: string;
  icon?: any;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("p-5 rounded-2xl border-2 shadow-xl backdrop-blur-md space-y-3 transition-all", bgColor, borderColor)}>
      <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-800/80 text-white shrink-0">
            <Icon size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-base md:text-lg leading-tight">{title}</h4>
            {subtitle && <p className="text-xs font-semibold text-slate-300 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <span className={cn("text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full border tracking-wide uppercase shrink-0", badgeColor)}>
            {badge}
          </span>
        )}
      </div>
      {text && <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{text}</p>}
      {children}
    </div>
  );
}

// Componente de Fluxograma Decisório Interativo SIM / NÃO para Esquema Terapêutico
function TherapeuticFlowchart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    symptoms?: boolean;
    window?: boolean;
    contraindication?: boolean;
    vascularRisk?: boolean;
    hasUterus?: boolean;
  }>({});
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const applyPreset = (presetKey: 'antonia' | 'hypertensive' | 'breast_cancer' | 'hysterectomy') => {
    setActiveScenario(presetKey);
    if (presetKey === 'antonia') {
      setAnswers({ symptoms: true, window: true, contraindication: false, vascularRisk: false, hasUterus: true });
      setCurrentStep(5);
    } else if (presetKey === 'hypertensive') {
      setAnswers({ symptoms: true, window: true, contraindication: false, vascularRisk: true, hasUterus: true });
      setCurrentStep(5);
    } else if (presetKey === 'breast_cancer') {
      setAnswers({ symptoms: true, window: true, contraindication: true });
      setCurrentStep(5);
    } else if (presetKey === 'hysterectomy') {
      setAnswers({ symptoms: true, window: true, contraindication: false, vascularRisk: false, hasUterus: false });
      setCurrentStep(5);
    }
  };

  const handleAnswer = (val: boolean) => {
    setActiveScenario(null);
    if (currentStep === 0) {
      setAnswers(prev => ({ ...prev, symptoms: val }));
      if (!val) setCurrentStep(5);
      else setCurrentStep(1);
    } else if (currentStep === 1) {
      setAnswers(prev => ({ ...prev, window: val }));
      if (!val) setCurrentStep(5);
      else setCurrentStep(2);
    } else if (currentStep === 2) {
      setAnswers(prev => ({ ...prev, contraindication: val }));
      if (val) setCurrentStep(5);
      else setCurrentStep(3);
    } else if (currentStep === 3) {
      setAnswers(prev => ({ ...prev, vascularRisk: val }));
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setAnswers(prev => ({ ...prev, hasUterus: val }));
      setCurrentStep(5);
    }
  };

  const resetFlowchart = () => {
    setAnswers({});
    setCurrentStep(0);
    setActiveScenario(null);
  };

  const questions = [
    {
      id: 'symptoms',
      stepNum: 1,
      badge: 'PASSO 1: INDICAÇÃO CLÍNICA',
      title: 'A paciente apresenta Sintomas Vasomotores Moderados/Intensos (Fogachos, Sudorese) com prejuízo da qualidade de vida OU Indicação de Prevenção/Tratamento de Osteoporose?',
      desc: 'Sintomas vasomotores significativos e perda de densidade óssea acelerada são as duas indicações clássicas validadas de nível 1A para Terapia Hormonal Sistêmica.',
      rationale: 'Por que avaliar? Sem queixa vasomotora ou risco ósseo, a TH sistêmica não deve ser indicada de rotina.',
    },
    {
      id: 'window',
      stepNum: 2,
      badge: 'PASSO 2: JANELA DE OPORTUNIDADE',
      title: 'A paciente encontra-se na JANELA DE OPORTUNIDADE? (Idade < 60 anos E tempo de pós-menopausa < 10 anos)',
      desc: 'Início da TH dentro dos 10 primeiros anos pós-menopausa (< 60 anos) reduz risco cardiovascular total e fraturas, com excelente perfil de segurança (Timing Hypothesis / WHI).',
      rationale: 'Por que avaliar? Iniciar TH após os 60 anos ou >10 anos de menopausa eleva o risco de eventos tromboembólicos e coronarianos.',
    },
    {
      id: 'contraindication',
      stepNum: 3,
      badge: 'PASSO 3: SEGURANÇA & ALERTA ABSOLUTO',
      title: 'A paciente possui alguma CONTRAINDICAÇÃO ABSOLUTA à Terapia Hormonal Sistêmica?',
      desc: 'Histórico ativo/prévio de Câncer de Mama ou Endométrio, TEV/TVP/TEP pregresso ou ativo, AVC/IAM/DAC, Doença Hepática Aguda ou Sangramento Vaginal Indeterminado.',
      rationale: 'Por que avaliar? A presença de contraindicação proíbe o uso de hormônios sistêmicos e obriga a migração imediata para tratamento NÃO HORMONAL.',
    },
    {
      id: 'vascularRisk',
      stepNum: 4,
      badge: 'PASSO 4: DEFINIÇÃO DA VIA (ORAL vs TRANSDÉRMICA)',
      title: 'A paciente apresenta Fatores de Risco Vascular, Trombótico ou Metabólico Aumentados?',
      desc: 'Hipertensão Arterial, Diabetes Mellitus, Obesidade (IMC ≥ 30), Tabagismo, Hipertrigliceridemia (>200-400 mg/dL), Enxaqueca com Aura ou Risco Elevado de TEV.',
      rationale: 'Por que avaliar? O estrogênio oral passa pelo fígado e altera fatores de coagulação e triglicerídeos. A VIA TRANSDÉRMICA evita a 1ª passagem hepática e é totalmente neutra nesses parâmetros.',
    },
    {
      id: 'hasUterus',
      stepNum: 5,
      badge: 'PASSO 5: ANATOMIA UTERINA & PROTEÇÃO ENDOMETRIAL',
      title: 'A paciente possui ÚTERO (Útero Presente)?',
      desc: 'Avaliação anatômica fundamental para decidir a necessidade de oposição progestagênica contra hiperplasia e adenocarcinoma de endométrio.',
      rationale: 'Por que avaliar? Estrogênio isolado em mulher com útero induz proliferação endometrial descontrolada! Se tiver útero, Progestagênio é OBRIGATÓRIO.',
    }
  ];

  const currentQ = questions[currentStep] || null;

  return (
    <div className="bg-slate-900/95 border-2 border-slate-700/80 p-5 md:p-7 rounded-3xl shadow-2xl space-y-6">
      
      {/* HEADER DO FLUXOGRAMA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 w-fit">
            <Zap size={14} className="animate-pulse" /> Algoritmo Decisório Sequencial • FEBRASGO / SBEM 2025
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white mt-1">
            Fluxograma Interativo da Conduta Terapêutica
          </h3>
          <p className="text-xs md:text-sm text-slate-300">
            Responda às perguntas decisivas (<strong>SIM</strong> ou <strong>NÃO</strong>) para percorrer o mapa clínico e gerar a prescrição exata com Dose, Via e Frequência.
          </p>
        </div>

        <button
          onClick={resetFlowchart}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-black transition-all shrink-0 w-fit"
        >
          <RefreshCw size={14} /> Reiniciar Fluxograma
        </button>
      </div>

      {/* BARRA DE SIMULAÇÃO RÁPIDA DE CASOS CLÍNICOS */}
      <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wide flex items-center gap-1">
          <Stethoscope size={14} className="text-rose-400" /> Testar Cenários Clínicos Prontos (Clique para simular o caminho):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            onClick={() => applyPreset('antonia')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex flex-col gap-1",
              activeScenario === 'antonia'
                ? "bg-purple-900/80 border-purple-500 text-purple-100 shadow-md"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
            )}
          >
            <span className="font-extrabold text-purple-300 flex items-center gap-1">
              🌸 Caso Antônia (50a)
            </span>
            <span className="text-[10px] text-slate-400">Fogachos • Com Útero • Hígida</span>
          </button>

          <button
            onClick={() => applyPreset('hypertensive')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex flex-col gap-1",
              activeScenario === 'hypertensive'
                ? "bg-amber-900/80 border-amber-500 text-amber-100 shadow-md"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
            )}
          >
            <span className="font-extrabold text-amber-300 flex items-center gap-1">
              🫀 Caso B (52a)
            </span>
            <span className="text-[10px] text-slate-400">Hipertensa + Obesa • Transdérmica</span>
          </button>

          <button
            onClick={() => applyPreset('breast_cancer')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex flex-col gap-1",
              activeScenario === 'breast_cancer'
                ? "bg-rose-900/80 border-rose-500 text-rose-100 shadow-md"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
            )}
          >
            <span className="font-extrabold text-rose-300 flex items-center gap-1">
              🛑 Caso C (54a)
            </span>
            <span className="text-[10px] text-slate-400">Pós-Câncer Mama • Não Hormonal</span>
          </button>

          <button
            onClick={() => applyPreset('hysterectomy')}
            className={cn(
              "p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex flex-col gap-1",
              activeScenario === 'hysterectomy'
                ? "bg-blue-900/80 border-blue-500 text-blue-100 shadow-md"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
            )}
          >
            <span className="font-extrabold text-blue-300 flex items-center gap-1">
              🛡️ Caso D (56a)
            </span>
            <span className="text-[10px] text-slate-400">Histerectomizada • Estrogênio Isolado</span>
          </button>
        </div>
      </div>

      {/* BREADCRUMB DO CAMINHO PERCORRIDO */}
      {Object.keys(answers).length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-y border-slate-800 text-xs">
          <span className="font-bold text-slate-400 shrink-0">Trilha de Decisão:</span>
          {answers.symptoms !== undefined && (
            <span className={cn("px-2.5 py-1 rounded-lg font-black shrink-0 border", answers.symptoms ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-rose-950 text-rose-300 border-rose-800")}>
              1. Sintomas: {answers.symptoms ? 'SIM' : 'NÃO'}
            </span>
          )}
          {answers.window !== undefined && (
            <span className={cn("px-2.5 py-1 rounded-lg font-black shrink-0 border", answers.window ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-rose-950 text-rose-300 border-rose-800")}>
              2. Janela &lt;60a: {answers.window ? 'SIM' : 'NÃO'}
            </span>
          )}
          {answers.contraindication !== undefined && (
            <span className={cn("px-2.5 py-1 rounded-lg font-black shrink-0 border", answers.contraindication ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-emerald-950 text-emerald-300 border-emerald-800")}>
              3. Contraindicação: {answers.contraindication ? 'SIM (Proibido)' : 'NÃO (Liberado)'}
            </span>
          )}
          {answers.vascularRisk !== undefined && (
            <span className={cn("px-2.5 py-1 rounded-lg font-black shrink-0 border", answers.vascularRisk ? "bg-amber-950 text-amber-300 border-amber-800" : "bg-blue-950 text-blue-300 border-blue-800")}>
              4. Risco Vascular: {answers.vascularRisk ? 'SIM (Transdérmica)' : 'NÃO (Oral/Transd)'}
            </span>
          )}
          {answers.hasUterus !== undefined && (
            <span className={cn("px-2.5 py-1 rounded-lg font-black shrink-0 border", answers.hasUterus ? "bg-purple-950 text-purple-300 border-purple-800" : "bg-blue-950 text-blue-300 border-blue-800")}>
              5. Útero: {answers.hasUterus ? 'Presente (E+P)' : 'Ausente (E isolado)'}
            </span>
          )}
        </div>
      )}

      {/* ÁREA INTERATIVA DO PASSO ATUAL DA PERGUNTA */}
      {currentStep < 5 && currentQ && (
        <div className="bg-slate-950 p-6 rounded-3xl border-2 border-purple-800/80 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
            <span className="text-xs font-black text-purple-300 bg-purple-950 px-3 py-1 rounded-full border border-purple-700 uppercase tracking-widest">
              {currentQ.badge}
            </span>
            <span className="text-xs font-black text-slate-400">
              {currentStep + 1} / 5
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl md:text-2xl font-black text-white leading-tight">
              {currentQ.title}
            </h4>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              {currentQ.desc}
            </p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-amber-300 font-medium">
              💡 <strong>Raciocínio Clínico:</strong> {currentQ.rationale}
            </div>
          </div>

          {/* BOTÕES DECISÓRIOS SIM / NÃO */}
          <div className="pt-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-3 text-center">
              Selecione a Resposta da Paciente:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg md:text-xl shadow-xl shadow-emerald-950/50 border-2 border-emerald-400 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                <div className="p-2 rounded-full bg-emerald-800 text-emerald-100 group-hover:bg-emerald-700">
                  <CheckCircle2 size={24} />
                </div>
                SIM
              </button>

              <button
                onClick={() => handleAnswer(false)}
                className="p-5 rounded-2xl bg-rose-700 hover:bg-rose-600 text-white font-black text-lg md:text-xl shadow-xl shadow-rose-950/50 border-2 border-rose-400 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                <div className="p-2 rounded-full bg-rose-900 text-rose-100 group-hover:bg-rose-800">
                  <ShieldAlert size={24} />
                </div>
                NÃO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISUALIZAÇÃO DO ESQUEMA FINAL / RECEITA PRESCRITA (TERMINAL NODE) */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* RESULTADO DA CONDUTA */}
          <div className="bg-slate-950 border-2 border-emerald-500/80 p-6 rounded-3xl shadow-2xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-emerald-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-900/80 rounded-2xl text-emerald-300 border border-emerald-600">
                  <Pill size={28} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800 uppercase tracking-widest">
                    Esquema Terapêutico Gerado pelo Fluxograma
                  </span>
                  <h4 className="text-xl md:text-2xl font-black text-white mt-0.5">
                    {answers.symptoms === false
                      ? "Acompanhamento Preventivo sem TH Sistêmica"
                      : answers.window === false
                      ? "Conduta Não Hormonal (Início Tardio >60a/>10a)"
                      : answers.contraindication === true
                      ? "Tratamento Não Hormonal (TH Sistêmica Contraindicada)"
                      : answers.hasUterus === true
                      ? `TH Combinada (Estrogênio + Progestagênio) • Via ${answers.vascularRisk ? "Transdérmica Obrigatória" : "Oral / Transdérmica Liberada"}`
                      : `TH Estrogênica Isolada (Sem Útero) • Via ${answers.vascularRisk ? "Transdérmica Obrigatória" : "Oral / Transdérmica"}`}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 w-fit"
              >
                <FileText size={14} /> Imprimir / Salvar Conduta
              </button>
            </div>

            {/* CONTEÚDO DETALHADO DA RECEITA MEDICA */}
            {answers.symptoms === false ? (
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-200 space-y-2">
                <p className="font-extrabold text-amber-300 text-sm">Orientações Gerais:</p>
                <p>• Sem indicação de THM sistêmica por ausência de sintomas vasomotores significativos ou risco osteoporótico.</p>
                <p>• <strong>Se houver queixas de Atrofia Vaginal / SGUM:</strong> Prescrever Estriol 1 mg/g creme vaginal (1 aplicação/dia por 2 sem, depois 2x/semana).</p>
                <p>• Estimular exercícios de impacto, aporte de Cálcio (1.000-1.200 mg/dia via dieta/suplemento) e Vitamina D (800-2.000 UI/dia).</p>
              </div>
            ) : answers.window === false || answers.contraindication === true ? (
              <div className="space-y-4 text-xs text-slate-200">
                <div className="p-4 bg-rose-950/80 rounded-2xl border border-rose-700 space-y-2">
                  <p className="font-black text-rose-200 text-sm flex items-center gap-2">
                    <ShieldAlert size={18} /> TH Sistêmica CONTRAINDICADA ou Fora da Janela
                  </p>
                  <p>
                    {answers.contraindication === true
                      ? "Presença de contraindicação absoluta (Câncer de mama/endométrio, TEV, evento vascular prévio ou doença hepática)."
                      : "Início tardio de TH (>60 anos ou >10 anos de pós-menopausa) eleva risco cardiovascular e trombótico."}
                  </p>
                </div>

                <div className="p-5 bg-slate-900 rounded-2xl border-2 border-cyan-800 space-y-3">
                  <p className="font-extrabold text-cyan-300 text-base flex items-center gap-2">
                    <Pill /> Opções Não Hormonais de 1ª Linha (Prescrição Prática):
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 bg-slate-950 rounded-xl border border-rose-800 space-y-1">
                      <p className="font-black text-rose-300">1. Fezolinetant (Inovador)</p>
                      <p className="text-white font-bold">45 mg/dia VO</p>
                      <p className="text-[11px] text-slate-300">1 comprimido/dia. Bloqueador NK3R sem ação hormonal.</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-blue-800 space-y-1">
                      <p className="font-black text-blue-300">2. Escitalopram / Desvenlafaxina</p>
                      <p className="text-white font-bold">Escitalopram 10–20 mg/dia VO</p>
                      <p className="text-[11px] text-slate-300">OU Desvenlafaxina 50 mg/dia VO (1 comp pela manhã).</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-purple-800 space-y-1">
                      <p className="font-black text-purple-300">3. Gabapentina (Insônia)</p>
                      <p className="text-white font-bold">300 a 900 mg/dia VO</p>
                      <p className="text-[11px] text-slate-300">Tomar à noite ao deitar. Excelente se houver despertar noturno.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* PRESCRIÇÃO DA TH LIBERADA */
              <div className="space-y-4 text-xs md:text-sm text-slate-200">
                
                {/* BLOCo ESTROGÊNICO */}
                <div className="p-4 bg-slate-900 rounded-2xl border-2 border-amber-600/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-amber-300 text-base">
                      1. COMPONENTE ESTROGÊNICO (Tratamento dos Fogachos & Massa Óssea)
                    </p>
                    <span className={cn("text-[10px] font-black px-2.5 py-0.5 rounded border uppercase", answers.vascularRisk ? "bg-amber-950 text-amber-300 border-amber-700" : "bg-emerald-950 text-emerald-300 border-emerald-700")}>
                      {answers.vascularRisk ? "Via Transdérmica Obrigatória" : "Via Oral ou Transdérmica"}
                    </span>
                  </div>

                  {answers.vascularRisk ? (
                    <div className="p-3 bg-slate-950 rounded-xl border border-amber-700/80 text-xs space-y-1">
                      <p className="font-bold text-white">
                        • 17β-Estradiol Gel Transdérmico 0,75 mg/dose:
                      </p>
                      <p className="text-slate-300">
                        <strong>Posologia:</strong> Aplicar 1 a 2 pressões de dose (0,75 a 1,5 mg/dia) sobre a pele limpa e seca dos braços ou coxas, 1 vez ao dia.
                      </p>
                      <p className="text-[11px] text-amber-300 pt-1">
                        *Justificativa:* Paciente com risco vascular/metabólico. A via transdérmica desvia do fígado, sem elevar fatores de coagulação nem triglicerídeos.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 space-y-1">
                        <p className="font-bold text-emerald-300">• Opção Oral: Estradiol Micronizado</p>
                        <p className="text-white font-bold">Dose: 1,0 mg/dia VO (1 comp/dia)</p>
                        <p className="text-slate-300 text-[11px]">Alternativa: Valerato de Estradiol 1 a 2 mg/dia VO.</p>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 space-y-1">
                        <p className="font-bold text-emerald-300">• Opção Transdérmica: 17β-Estradiol Gel</p>
                        <p className="text-white font-bold">Dose: 0,75 a 1,5 mg/dia Transdérmico</p>
                        <p className="text-slate-300 text-[11px]">Aplicar 1 a 2 pressões de dose na pele 1x/dia.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* BLOCO PROGESTAGÊNICO (SE TIVER ÚTERO) */}
                {answers.hasUterus ? (
                  <div className="p-4 bg-slate-900 rounded-2xl border-2 border-purple-600/80 space-y-2">
                    <p className="font-black text-purple-300 text-base">
                      2. COMPONENTE PROGESTAGÊNICO OBRIGATÓRIO (Proteção Endometrial)
                    </p>
                    <div className="p-3 bg-slate-950 rounded-xl border border-purple-800 space-y-2 text-xs">
                      <p className="font-black text-white text-sm">
                        • 1ª Escolha Mundial: Progesterona Micronizada 100 mg a 200 mg/dia VO
                      </p>
                      <p className="text-slate-300">
                        <strong>Posologia & Via:</strong> Progesterona Micronizada 100 mg/dia VO contínua OR 200 mg/dia VO por 12 a 14 dias/mês (regime cíclico), <strong>tomar à noite ao deitar</strong>.
                      </p>
                      <p className="text-[11px] text-purple-300">
                        *Por que Micronizada?* Perfil metabólico neutro + metabólitos moduladores do receptor GABA-A que induzem sono profundo e fisiológico.
                      </p>
                      <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-1">
                        *Alternativa:* Didrogesterona 10 mg/dia VO (1 comp/dia).
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-blue-950/60 rounded-2xl border border-blue-800 text-xs text-blue-200">
                    <strong>Proteção Endometrial Desnecessária:</strong> Paciente histerectomizada recebe exclusivamente Estrogênio Isolado.
                  </div>
                )}

                {/* ALTERNATIVA ÚNICA TIBOLONA */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong>Alternativa Monodose (Tibolona):</strong> Tibolona 2,5 mg/dia VO (1 comp/dia). Esteroide sintético com ação tecidual seletiva E + P + A. Não exige progestagênio adicional mesmo em mulheres com útero!
                </div>

              </div>
            )}
          </div>

          {/* VISUALIZAÇÃO COMPLETA DO MAPA EM ÁRVORE DO FLUXOGRAMA (BOXES + SETAS + BADGES) */}
          <div className="bg-slate-950 p-6 rounded-3xl border-2 border-slate-800 space-y-4">
            <h4 className="font-black text-white text-base flex items-center gap-2">
              <Layers className="text-purple-400" /> Mapa Visual Completo do Fluxograma Decisório:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              
              {/* NODE 1 */}
              <div className={cn("p-3 rounded-2xl border-2 space-y-1 transition-all", answers.symptoms === true ? "bg-emerald-950/90 border-emerald-500 text-emerald-100" : answers.symptoms === false ? "bg-rose-950/90 border-rose-500 text-rose-100" : "bg-slate-900 border-slate-800 text-slate-400")}>
                <span className="text-[10px] font-black uppercase tracking-wider block">1. Indicação</span>
                <p className="font-extrabold text-white text-xs">Fogachos / Perda Óssea?</p>
                <span className="text-[10px] font-bold block pt-1">
                  {answers.symptoms === true ? "✓ SIM (Avança)" : answers.symptoms === false ? "✗ NÃO (Sem TH)" : "Pendente"}
                </span>
              </div>

              {/* NODE 2 */}
              <div className={cn("p-3 rounded-2xl border-2 space-y-1 transition-all", answers.window === true ? "bg-emerald-950/90 border-emerald-500 text-emerald-100" : answers.window === false ? "bg-rose-950/90 border-rose-500 text-rose-100" : "bg-slate-900 border-slate-800 text-slate-400")}>
                <span className="text-[10px] font-black uppercase tracking-wider block">2. Janela</span>
                <p className="font-extrabold text-white text-xs">&lt;60a e &lt;10a Menopausa?</p>
                <span className="text-[10px] font-bold block pt-1">
                  {answers.window === true ? "✓ SIM (Seguro)" : answers.window === false ? "✗ NÃO (Início Tardio)" : "Pendente"}
                </span>
              </div>

              {/* NODE 3 */}
              <div className={cn("p-3 rounded-2xl border-2 space-y-1 transition-all", answers.contraindication === false ? "bg-emerald-950/90 border-emerald-500 text-emerald-100" : answers.contraindication === true ? "bg-rose-950/90 border-rose-500 text-rose-100" : "bg-slate-900 border-slate-800 text-slate-400")}>
                <span className="text-[10px] font-black uppercase tracking-wider block">3. Alerta Absoluto</span>
                <p className="font-extrabold text-white text-xs">Câncer / TEV / AVC?</p>
                <span className="text-[10px] font-bold block pt-1">
                  {answers.contraindication === false ? "✓ NÃO (Liberado)" : answers.contraindication === true ? "✗ SIM (Proibido)" : "Pendente"}
                </span>
              </div>

              {/* NODE 4 */}
              <div className={cn("p-3 rounded-2xl border-2 space-y-1 transition-all", answers.vascularRisk === true ? "bg-amber-950/90 border-amber-500 text-amber-100" : answers.vascularRisk === false ? "bg-blue-950/90 border-blue-500 text-blue-100" : "bg-slate-900 border-slate-800 text-slate-400")}>
                <span className="text-[10px] font-black uppercase tracking-wider block">4. Via Escolhida</span>
                <p className="font-extrabold text-white text-xs">Risco Vascular / HAS?</p>
                <span className="text-[10px] font-bold block pt-1">
                  {answers.vascularRisk === true ? "⚠ SIM (Transdérmica)" : answers.vascularRisk === false ? "✓ NÃO (Oral / Transd)" : "Pendente"}
                </span>
              </div>

              {/* NODE 5 */}
              <div className={cn("p-3 rounded-2xl border-2 space-y-1 transition-all", answers.hasUterus === true ? "bg-purple-950/90 border-purple-500 text-purple-100" : answers.hasUterus === false ? "bg-blue-950/90 border-blue-500 text-blue-100" : "bg-slate-900 border-slate-800 text-slate-400")}>
                <span className="text-[10px] font-black uppercase tracking-wider block">5. Anatomia</span>
                <p className="font-extrabold text-white text-xs">Útero Presente?</p>
                <span className="text-[10px] font-bold block pt-1">
                  {answers.hasUterus === true ? "Útero (E + P)" : answers.hasUterus === false ? "Sem Útero (E Isolado)" : "Pendente"}
                </span>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default function ClimaterioMain() {
  const [activeTab, setActiveTab] = useState<'straw' | 'patho' | 'domains' | 'exams' | 'th' | 'non_hormonal'>('straw');

  // Estado para estadiamento STRAW+10 interativo
  const [selectedStraw, setSelectedStraw] = useState<'-3' | '-2' | '-1' | '0' | '+1' | '+2'>('-1');

  // Estado para simulação de Caso Clínico "Antônia"
  const [showAntoniaAnalysis, setShowAntoniaAnalysis] = useState(true);

  // Estado para simulação de conduta TH com/sem útero
  const [hasUterus, setHasUterus] = useState<boolean>(true);
  const [riskProfile, setRiskProfile] = useState<'low' | 'high_tev' | 'high_cv' | 'cancer_contraindication'>('low');

  // Estado para revelar o "Mito da Testosterona"
  const [showTestosteroneTruth, setShowTestosteroneTruth] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 p-2 sm:p-4 md:p-6 space-y-6 font-sans">
      {/* HEADER PRINCIPAL */}
      <div className="py-2 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-950/90 text-rose-300 border border-rose-700/80 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <Flame size={14} className="animate-pulse" /> Ginecologia Endócrina & PBL
              </span>
              <span className="px-3 py-1 bg-blue-950/90 text-blue-300 border border-blue-700/80 rounded-full text-xs font-black tracking-wider uppercase">
                Diretrize FEBRASGO / SBEM 2025
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Climatério, Perimenopausa & Terapia Hormonal
            </h1>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Mapa de decisão médica contínua: Estadiamento STRAW+10, Mecanismo do Fogacho KNDy/NK3R, Algoritmo de 5 Passos, Esquemas Terapêuticos com Dose/Via e Mitigação de Riscos.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shrink-0">
            <div className="p-3 bg-rose-600/20 rounded-xl text-rose-400">
              <Stethoscope size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Caso Clínico Antônia</p>
              <p className="text-sm font-black text-white">50a • Amenorreia 11m • Fogachos 8-10x/dia</p>
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded mt-1 inline-block">
                Estágio STRAW −1 (Transição Tardia)
              </span>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO ENTRE TABS */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-5 mt-5 overflow-x-auto no-scrollbar">
          {[
            { id: 'straw', label: '1. STRAW+10 & Conceitos', icon: Layers, color: 'text-rose-400' },
            { id: 'patho', label: '2. Fisiopatologia (KNDy / Osso / CV)', icon: Activity, color: 'text-amber-400' },
            { id: 'domains', label: '3. Clínica & Diagnóstico', icon: Brain, color: 'text-purple-400' },
            { id: 'exams', label: '4. Anamnese & Exames (O que NÃO pedir)', icon: FileText, color: 'text-blue-400' },
            { id: 'th', label: '5. Terapia Hormonal (Prescrição / Doses)', icon: Pill, color: 'text-emerald-400' },
            { id: 'non_hormonal', label: '6. Não Hormonal & Testosterona', icon: ShieldCheck, color: 'text-cyan-400' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-3 rounded-2xl font-black text-xs md:text-sm transition-all border shrink-0",
                  isActive
                    ? "bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-900/50 scale-[1.02]"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                )}
              >
                <Icon size={18} className={cn(isActive ? "text-white" : tab.color)} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTEÚDO DAS TABS */}
      <AnimatePresence mode="wait">
        {/* TAB 1: TERMINOLOGIA & STRAW+10 */}
        {activeTab === 'straw' && (
          <motion.div key="straw" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            
            {/* CARD ALERTA CONCEITUAL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InteractiveBalloon
                title="Climatério"
                subtitle="Fase de Transição Endocrinológica"
                text="Período biológico que se estende por anos, marcando a transição da fase reprodutiva para a não reprodutiva. Mudanças biológicas, endócrinas e clínicas graduais."
                badge="Conceito Fisiológico"
                badgeColor="bg-slate-800 text-slate-200 border-slate-700"
                borderColor="border-slate-700"
                bgColor="bg-slate-900/90"
                icon={Clock}
              />
              <InteractiveBalloon
                title="Menopausa (UPM)"
                subtitle="Marco Zero Retrospectivo"
                text="Evento único: a ÚLTIMA Menstruação Espontânea. Diagnóstico estritamente retrospectivo após 12 meses consecutivos de amenorreia sem causa secundária."
                badge="Ponto de Prova"
                badgeColor="bg-rose-900 text-rose-200 border-rose-700"
                borderColor="border-rose-800/80"
                bgColor="bg-slate-900/90"
                icon={Flame}
              />
              <InteractiveBalloon
                title="Perimenopausa"
                subtitle="Transição + 1º Ano Pós-UPM"
                text="Engloba a Transição Menopausal (estágios STRAW −2 e −1) MAIS o primeiro ano completo após a UPM (estágio +1a). Perimenopausa é MAIOR que transição menopausal!"
                badge="Diferença Crítica"
                badgeColor="bg-purple-900 text-purple-200 border-purple-700"
                borderColor="border-purple-800/80"
                bgColor="bg-slate-900/90"
                icon={Sparkles}
              />
            </div>

            {/* ESTADIAMENTO STRAW+10 INTERATIVO */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-black text-rose-400 uppercase tracking-widest bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
                    Estadiamento Internacional STRAW+10
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">Mapa Temporal da Vida Reprodutiva Feminina</h3>
                  <p className="text-xs text-slate-300">Critério central = Padrão do ciclo menstrual (não biomarcador!). Clique no estágio para ver os detalhes:</p>
                </div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {[
                    { id: '-3', label: '-3 Reprodutivo Tardio', color: 'bg-blue-900/60 border-blue-700 text-blue-200' },
                    { id: '-2', label: '-2 Transição Inicial', color: 'bg-amber-900/60 border-amber-700 text-amber-200' },
                    { id: '-1', label: '-1 Transição Tardia', color: 'bg-rose-900/60 border-rose-700 text-rose-200' },
                    { id: '0', label: '0 Menopausa (UPM)', color: 'bg-purple-900/60 border-purple-700 text-purple-200' },
                    { id: '+1', label: '+1 Pós-Menopausa Inicial', color: 'bg-emerald-900/60 border-emerald-700 text-emerald-200' },
                    { id: '+2', label: '+2 Pós-Menopausa Tardia', color: 'bg-slate-800 border-slate-600 text-slate-300' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedStraw(btn.id as any)}
                      className={cn(
                        "px-3 py-2 rounded-xl text-xs font-black border transition-all shrink-0",
                        selectedStraw === btn.id ? "ring-2 ring-white scale-105 shadow-lg " + btn.color : "opacity-60 hover:opacity-100 bg-slate-800 border-slate-700 text-slate-300"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DETALHAMENTO DO ESTÁGIO SELECIONADO */}
              {selectedStraw === '-3' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div className="bg-blue-950/60 border-2 border-blue-800 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-blue-300 bg-blue-900/80 px-2.5 py-1 rounded-full border border-blue-700">Estágio −3 • Reprodutivo Tardio</span>
                    <h4 className="font-extrabold text-white text-lg">Mudanças Sutis Endócrinas</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      • <strong>Ciclos:</strong> Aparente regularidade mantida, mas fase folicular pode encurtar sutilmente.<br/>
                      • <strong>Inibina B:</strong> Começa a cair de forma discreta pela granulosa.<br/>
                      • <strong>FSH:</strong> Leve elevação na fase folicular precoce devido à menor inibição.<br/>
                      • <strong>AMH:</strong> Em queda progressiva, mas é achado laboratorial, não critério de estadiamento.
                    </p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-2">
                    <h5 className="font-bold text-amber-300 text-sm">Ponto Clínico Fundamental</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      A atresia folicular é contínua desde a vida fetal e irreversível. O número de folículos primordiais só cai, nunca se recompõe. Não há um "gatilho único", mas sim o cruzamento de um limiar crítico.
                    </p>
                  </div>
                </div>
              )}

              {selectedStraw === '-2' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div className="bg-amber-950/60 border-2 border-amber-800 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-amber-300 bg-amber-900/80 px-2.5 py-1 rounded-full border border-amber-700">Estágio −2 • Transição Menopausal Inicial</span>
                    <h4 className="font-extrabold text-white text-lg">Variação Persistente de Ciclo (≥ 7 dias)</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      • <strong>Ciclos:</strong> Variação de ≥ 7 dias entre ciclos consecutivos (ex: ciclo de 25 dias seguido de 35 dias).<br/>
                      • <strong>Foliculogênese:</strong> Dessincronizada! O recrutamento folicular torna-se imprevisível.<br/>
                      • <strong>Hiper-resposta Paradoxal:</strong> O FSH elevado pode causar picos de estradiol mais ALTO que o normal, gerando mastalgia e sangramento mais abundante!
                    </p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-2">
                    <h5 className="font-bold text-rose-300 text-sm">Armadilha Frequente</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Sintomas de EXCESSO relativo de estrogênio (mastalgia, sangramento intenso) aparecem no estágio −2. Não confundir com deficiência estrogênica isolada!
                    </p>
                  </div>
                </div>
              )}

              {selectedStraw === '-1' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div className="bg-rose-950/60 border-2 border-rose-800 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-rose-300 bg-rose-900/80 px-2.5 py-1 rounded-full border border-rose-700">Estágio −1 • Transição Menopausal Tardia</span>
                      <span className="text-xs font-black text-amber-300 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded">Caso Antônia</span>
                    </div>
                    <h4 className="font-extrabold text-white text-lg">Intervalos de Amenorreia ≥ 60 dias</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      • <strong>Ciclos:</strong> Anovulação predominante. Intervalos de amenorreia ≥ 60 dias.<br/>
                      • <strong>Progesterona:</strong> Queda consistente sem corpo lúteo (perda do efeito neuroesteroide sedativo via GABA-A → gera insônia e alteração do humor).<br/>
                      • <strong>Estradiol:</strong> Oscilação imprevisível em picos e vales. É a INSTABILIDADE do estradiol que ativa a via KNDy e gera os FOGACHOS INTENSOS!
                    </p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-2">
                    <h5 className="font-bold text-amber-300 text-sm">Aplicação Prática no Caso Antônia (50a)</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Antônia tem 50 anos e está em amenorreia há 11 meses. Ela NÃO está na menopausa ainda — está no fim da perimenopausa (estágio −1). Só completará o diagnóstico de menopausa quando fechar 12 meses consecutivos!
                    </p>
                  </div>
                </div>
              )}

              {selectedStraw === '0' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div className="bg-purple-950/60 border-2 border-purple-800 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-purple-300 bg-purple-900/80 px-2.5 py-1 rounded-full border border-purple-700">Estágio 0 • Menopausa (UPM)</span>
                    <h4 className="font-extrabold text-white text-lg">Última Menstruação Espontânea</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      • <strong>Marco Zero:</strong> Ponto em que a reserva folicular cruza o limiar abaixo do qual não há mais resposta ovariana suficiente.<br/>
                      • <strong>Diagnóstico:</strong> Somente confirmado 12 meses após sua ocorrência.
                    </p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-2">
                    <h5 className="font-bold text-purple-300 text-sm">Atenção ao Sangramento</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Qualquer sangramento uterino ocorrido após os 12 meses de amenorreia é Sangramento Pós-Menopausa e exige investigação endometrial imediata (USGTV / Biópsia).
                    </p>
                  </div>
                </div>
              )}

              {selectedStraw === '+1' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div className="bg-emerald-950/60 border-2 border-emerald-800 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-full border border-emerald-700">Estágio +1 • Pós-Menopausa Inicial (1º ao 6º ano)</span>
                    <h4 className="font-extrabold text-white text-lg">Hipogonadismo Hipergonadotrófico Estabilizado</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      • <strong>Perfil Hormonal:</strong> FSH e LH cronicamente elevados. Estradiol ovariano sustentado baixo.<br/>
                      • <strong>Estrona (E1):</strong> Torna-se o estrogênio circulante predominante, vindo da aromatização periférica de androgênios adrenais (androstenediona) no tecido adiposo.<br/>
                      • <strong>Perda Óssea Acelerada:</strong> Perda de até 2-3% de massa trabecular por ano nos primeiros 5-7 anos!
                    </p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-2">
                    <h5 className="font-bold text-emerald-300 text-sm">Atenção na Obesidade</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Maior massa gorda gera maior aromatização periférica (maior nível de E1). Isso eleva o risco de Hiperplasia e Câncer de Endométrio em mulheres obesas na pós-menopausa!
                    </p>
                  </div>
                </div>
              )}

              {selectedStraw === '+2' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  <div className="bg-slate-800 border-2 border-slate-600 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-black text-slate-300 bg-slate-700 px-2.5 py-1 rounded-full border border-slate-500">Estágio +2 • Pós-Menopausa Tardia</span>
                    <h4 className="font-extrabold text-white text-lg">Eixo Estabilizado e SGUM Progressiva</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      • <strong>Sintomas Vasomotores:</strong> Tendem a regredir devido à recalibração termorreguladora.<br/>
                      • <strong>SGUM (Síndrome Geniturinária):</strong> Não regride espontaneamente! Tende a piorar sem tratamento (atrofia, secura, dispareunia, ITU recorrente).
                    </p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-2">
                    <h5 className="font-bold text-blue-300 text-sm">Efeito Cumulativo</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Nesta fase, sobressaem os desfechos cumulativos do hipoestrogenismo crônico: remodelamento ósseo com fragilidade e perfil lipídico aterogênico.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* TABELA IDADES-CHAVE & CONDUTA */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-4">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Clock className="text-amber-400" /> Estratificação por Idade de Ocorrência da Menopausa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border-2 border-rose-800/80 bg-rose-950/40 space-y-2">
                  <span className="text-xs font-black text-rose-300 uppercase tracking-wide bg-rose-900/80 px-2 py-0.5 rounded border border-rose-700">
                    &lt; 40 Anos • Patológico!
                  </span>
                  <h4 className="font-extrabold text-white text-base">Insuficiência Ovariana Prematura (IOP)</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • Amenorreia ≥ 4m + FSH &gt; 25-40 UI/L (2 dosagens com intervalo ≥ 4 sem).<br/>
                    • Exige investigação etiológica (Cariótipo Turner/mosaicismo, pré-mutação FMR1, anticorpos antiadrenal/antiovário).<br/>
                    • <strong>TH OBRIGATÓRIA</strong> até a idade média da menopausa (~50a) para proteção óssea e CV!
                  </p>
                </div>

                <div className="p-4 rounded-2xl border-2 border-amber-800/80 bg-amber-950/40 space-y-2">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wide bg-amber-900/80 px-2 py-0.5 rounded border border-amber-700">
                    40 – 44 Anos
                  </span>
                  <h4 className="font-extrabold text-white text-base">Menopausa Precoce</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • Associada a maior tempo exposto ao hipoestrogenismo precoce, elevando risco CV e fraturas.<br/>
                    • <strong>TH Recomenda-se</strong> estender até a idade habitual (~50a), salvo contraindicações absolutas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border-2 border-emerald-800/80 bg-emerald-950/40 space-y-2">
                  <span className="text-xs font-black text-emerald-300 uppercase tracking-wide bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
                    45 – 55 Anos
                  </span>
                  <h4 className="font-extrabold text-white text-base">Menopausa Fisiológica Natural</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • Média aos 51 anos no Ocidente.<br/>
                    • Caso de Antônia (50a) está perfeitamente dentro da faixa esperada.<br/>
                    • Tabagismo antecipa a menopausa em 1 a 2 anos!
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 2: FISIOPATOLOGIA INTEGRADA */}
        {activeTab === 'patho' && (
          <motion.div key="patho" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            
            {/* CASCATA HHO */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-4">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                Fisiopatologia Central do Eixo Hipotálamo-Hipófise-Ovário
              </span>
              <h3 className="text-2xl font-black text-white">A Cascata da Exaustão Folicular</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2 pt-2">
                {[
                  { step: '1', title: '↓ Folículos', desc: 'Depleção atrésica contínua' },
                  { step: '2', title: '↓ Inibina B', desc: 'Perda do feedback negativo' },
                  { step: '3', title: '↑ FSH Variável', desc: 'Estímulo compensatório' },
                  { step: '4', title: 'Picos de E2', desc: 'Hiper-resposta folicular' },
                  { step: '5', title: 'Anovulação', desc: 'Queda de Progesterona' },
                  { step: '6', title: '↓ Estradiol', desc: 'Hipogonadismo final' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-800/90 border border-slate-700 p-3 rounded-2xl flex flex-col justify-between space-y-1 text-center">
                    <span className="w-6 h-6 mx-auto bg-amber-500 text-slate-950 font-black text-xs rounded-full flex items-center justify-center">
                      {item.step}
                    </span>
                    <p className="font-extrabold text-white text-xs">{item.title}</p>
                    <p className="text-[10px] text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MECANISMO DO FOGACHO - NEURÔNIOS KNDy E RECEPTORES NK3R */}
            <div className="bg-slate-900/90 border-2 border-rose-800/80 p-6 rounded-3xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-rose-800/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-600/30 rounded-xl text-rose-300">
                    <Flame size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Mecanismo Neuroendócrino do Fogacho (Neurônios KNDy)</h3>
                    <p className="text-xs text-rose-300">Target do Fezolinetant (Antagonista do Receptor NK3R)</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-rose-950 text-rose-200 border border-rose-700 rounded-full">
                  Área Pré-Óptica Hipotalâmica
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    No núcleo infundibular (arqueado) do hipotálamo, os <strong>neurônios KNDy</strong> coexpressam Kisspeptina, Neurocinina B e Dinorfina. Em condições fisiológicas eugonádicas, o estradiol exerce modulação INIBITÓRIA contínua sobre essa população.
                  </p>
                  <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-2xl space-y-2 text-xs text-slate-200">
                    <p className="font-bold text-amber-300">Sequência de Ativação do Fogacho:</p>
                    <p>1. Queda/flutuação brusca do Estradiol → Perda da inibição sobre o centro KNDy.</p>
                    <p>2. Hipertrofia dos neurônios KNDy e secreção aumentada de <strong>Neurocinina B</strong>.</p>
                    <p>3. Hiperativação dos <strong>receptores NK3R</strong> no centro termorregulador da área pré-óptica.</p>
                    <p>4. <strong>Estreitamento da Zona Termoneutra:</strong> Mínimas variações da temperatura central disparam episódios paroxísticos de vasodilatação cutânea e sudorese profusa!</p>
                  </div>
                </div>

                <div className="bg-rose-950/40 border border-rose-800/80 p-5 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-rose-200 text-sm flex items-center gap-2">
                    <Zap size={18} className="text-rose-400" /> Racional Farmacológico Inovador
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    O <strong>Fezolinetant (45 mg/dia VO)</strong> é um antagonista seletivo do receptor NK3. Ao bloquear diretamente esse receptor hipotalâmico, ele interrompe o sinal de sobreativação termorreguladora, reduzindo os fogachos de forma equivalente à estrogenioterapia sem exercer qualquer ação hormonal sistêmica!
                  </p>
                  <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/60 text-[11px] text-slate-300">
                    <strong>Aplicação em Antônia:</strong> Antônia apresenta 8 a 10 fogachos/dia com predomínio noturno. O mecanismo chave é a flutuação aguda estrogênica típica do estágio −1.
                  </div>
                </div>
              </div>
            </div>

            {/* APROFUNDAMENTO: OSSO, CARDIOVASCULAR E ANDROGÊNIOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* OSSO - RANKL/OPG */}
              <div className="bg-slate-900/90 border-2 border-emerald-800/80 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-black text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700">
                  Tecido Ósseo • Via RANKL / OPG
                </span>
                <h4 className="font-extrabold text-white text-base">Mecanismo do Remodelamento Ósseo</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  O estradiol estimula a síntese de <strong>Osteoprotegerina (OPG)</strong> pelos osteoblastos, que sequestra o RANKL e impede a diferenciação de osteoclastos. Na deficiência estrogênica:
                </p>
                <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-800 text-xs text-emerald-200 font-medium">
                  ↓ Estradiol → ↓ OPG → ↑ RANKL Livre → ↑ Ativação Osteoclástica → Balanço ósseo negativo (perda acelerada no osso trabecular).
                </div>
                <p className="text-[11px] text-slate-300">
                  *Racional direto para indicação do Denosumabe (anti-RANKL) ou TH para prevenção de fraturas.
                </p>
              </div>

              {/* CARDIOVASCULAR */}
              <div className="bg-slate-900/90 border-2 border-blue-800/80 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-black text-blue-300 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-700">
                  Cardiovascular • Função Endotelial
                </span>
                <h4 className="font-extrabold text-white text-base">Efeito Protetor Vascular Perdido</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  O estradiol atua no receptor ERα do endotélio estimulando a <strong>eNOS</strong> (óxido nítrico vasodilatador) e upping a depuração hepática do LDL. Com a menopausa:
                </p>
                <div className="p-3 bg-blue-950/50 rounded-xl border border-blue-800 text-xs text-blue-200 font-medium">
                  Perda de vasodilatação + Perfil lipídico aterogênico (↑ LDL, ↓ HDL) + Redirecionamento da gordura para o compartimento visceral.
                </div>
                <p className="text-[11px] text-slate-300">
                  *O risco cardiovascular feminino equipara-se ao masculino ~10 anos após a menopausa.
                </p>
              </div>

              {/* ANDROGÊNIOS */}
              <div className="bg-slate-900/90 border-2 border-purple-800/80 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-black text-purple-300 bg-purple-950 px-2.5 py-1 rounded-full border border-purple-700">
                  Androgênios • A "Adrenopausa"
                </span>
                <h4 className="font-extrabold text-white text-base">Declínio Linear Silencioso</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A queda da testosterona NÃO ocorre na menopausa! É um declínio linear iniciado aos 20-30 anos. Aos 40a, a mulher tem metade da testosterona circulante que tinha aos 20a.
                </p>
                <div className="p-3 bg-purple-950/50 rounded-xl border border-purple-800 text-xs text-purple-200 font-medium">
                  O ovário pós-menopáusico continua secretando 40-50% da testosterona via células do estroma/hilo por estímulo do LH alto.
                </div>
                <p className="text-[11px] text-slate-300">
                  *Ao contrário da ooforectomia bilateral, a menopausa natural NÃO gera queda abrupta de androgênios.
                </p>
              </div>

            </div>

          </motion.div>
        )}

        {/* TAB 3: CLÍNICA & DIAGNÓSTICO */}
        {activeTab === 'domains' && (
          <motion.div key="domains" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            
            {/* QUADRO DE DOMÍNIOS CLÍNICOS */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-4">
              <span className="text-xs font-black text-purple-400 uppercase tracking-widest bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
                Os 9 Domínios Sintomáticos da Menopausa
              </span>
              <h3 className="text-xl font-extrabold text-white">Mapeamento Clínico e Mecanismo Dominante</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { domain: '1. Vasomotor (Fogachos)', phase: 'Pico em −1 até +1', mech: 'Instabilidade estrogênica → via KNDy/NK3' },
                  { domain: '2. Alterações do Sono', phase: '−1 em diante', mech: 'Fogacho noturno + queda de Progesterona (perda de efeito neuroesteroide GABA-A)' },
                  { domain: '3. Humor / Labilidade', phase: '−2 até +1 (Janela de Vulnerabilidade)', mech: 'Desregulação aguda de receptores serotonina/GABA' },
                  { domain: '4. Cognitivo ("Névoa Mental")', phase: '−1 e +1 (Transitório)', mech: 'Lentidão de processamento e memória verbal por queda aguda de E2' },
                  { domain: '5. SGUM (Geniturinário)', phase: 'Tardio (+1/+2), Progressivo', mech: 'Hipoestrogenismo crônico → atrofia epitelial, perda de colágeno, pH básico' },
                  { domain: '6. Sexualidade / Libido', phase: 'Progressivo em +1/+2', mech: 'Multifatorial: dor (SGUM), estresse, relacionamento, baixa de E2' },
                  { domain: '7. Menstrual', phase: '−2 e −1', mech: 'Anovulação intermitente, instabilidade folicular' },
                  { domain: '8. Somático (Artralgias)', phase: 'Transição e início pós-menopausa', mech: 'Ação do estrogênio em receptores articulares/vasculares' },
                  { domain: '9. Metabólico / Ósseo', phase: '+1 em diante (Cumulativo)', mech: 'Perda do efeito protetor vascular e ósseo crônico' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-700 bg-slate-800/80 space-y-1.5">
                    <h4 className="font-bold text-white text-sm">{item.domain}</h4>
                    <span className="text-[10px] font-black text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800 inline-block">
                      {item.phase}
                    </span>
                    <p className="text-xs text-slate-300 leading-snug">{item.mech}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUANDO (NÃO) DOSAR FSH */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-xl font-extrabold text-white">Regra de Ouro Diagnóstica: Quando Dosar FSH?</h3>
                  <p className="text-xs text-slate-300">Na mulher típica ≥ 45 anos, o diagnóstico da síndrome do climatério é puramente CLÍNICO.</p>
                </div>
                <span className="text-xs font-black px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-full">
                  Sem Exame "Confirmatório"
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-rose-950/40 border-2 border-rose-800/80 p-5 rounded-2xl space-y-2">
                  <h4 className="font-black text-rose-300 text-sm flex items-center gap-2">
                    <ShieldAlert size={18} /> Quando NUNCA Dosar FSH / Estradiol
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • Mulher ≥ 45 anos com quadro clínico típico (sintomas vasomotores + alteração menstrual).<br/>
                    • Amenorreia espontânea de 12 meses na faixa etária habitual.<br/>
                    • <strong>Por que não pedir?</strong> Na perimenopausa, o estradiol oscila em picos e vales. Uma coleta isolada de FSH pode vir "normal" no dia do pico estrogênico e gerar falsa tranquilidade em quem está sintomática!
                  </p>
                </div>

                <div className="bg-emerald-950/40 border-2 border-emerald-800/80 p-5 rounded-2xl space-y-2">
                  <h4 className="font-black text-emerald-300 text-sm flex items-center gap-2">
                    <CheckCircle2 size={18} /> Quando PODE Auxiliar Solicitando FSH
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • Suspeita de Insuficiência Ovariana Prematura (&lt; 40 anos).<br/>
                    • Pacientes histerectomizadas (sem sangramento menstrual como parâmetro).<br/>
                    • Uso prévio de DIU com progestagênio ou ablação endometrial.<br/>
                    • Casos atípicos com dúvida diagnóstica expressiva.
                  </p>
                </div>
              </div>
            </div>

            {/* DIAGNÓSTICO DIFERENCIAL */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-4">
              <h3 className="text-xl font-extrabold text-white">Diagnóstico Diferencial por Bloco Etiológico</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InteractiveBalloon
                  title="Disfunção Tireoidiana"
                  subtitle="Hipotireoidismo vs Hipertireoidismo"
                  text="Hipotireoidismo causa fadiga, ganho de peso, desânimo e alteração menstrual. Hipertireoidismo gera intolerância ao calor e sudorese. Solicitar TSH para afastar!"
                  badge="TSH Justificado"
                  badgeColor="bg-blue-900 text-blue-200 border-blue-700"
                  borderColor="border-blue-800"
                  icon={Activity}
                />

                <InteractiveBalloon
                  title="Transtorno Depressivo Maior"
                  subtitle="Entidade Própria vs Sintoma Climatérico"
                  text="Labilidade de humor no climatério é diferente de Depressão Maior (anedonia, ideação suicida, afeto lentificado). Se depressão maior estiver instalada, a primeira linha NÃO é TH!"
                  badge="Raciocínio Crítico"
                  badgeColor="bg-purple-900 text-purple-200 border-purple-700"
                  borderColor="border-purple-800"
                  icon={Brain}
                />

                <InteractiveBalloon
                  title="Gestação"
                  subtitle="Possibilidade Residual em -1"
                  text="Mulheres no estágio −1 mantêm ovulações esporádicas. Antes de iniciar TH ou descartar gestação, sempre considerar β-hCG se houver dúvida de contracepção!"
                  badge="Segurança"
                  badgeColor="bg-amber-900 text-amber-200 border-amber-700"
                  borderColor="border-amber-800"
                  icon={AlertTriangle}
                />

                <InteractiveBalloon
                  title="Causas Farmacológicas"
                  subtitle="Antidepressivos & Tamoxifeno"
                  text="Antidepressivos (ISRS/IRSN) podem causar sudorese profusa e anorgasmia. Tamoxifeno gera fogachos por bloqueio estrogênico central."
                  badge="Anamnese Cautelosa"
                  badgeColor="bg-rose-900 text-rose-200 border-rose-700"
                  borderColor="border-rose-800"
                  icon={Pill}
                />
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 4: ANAMNESE & EXAMES */}
        {activeTab === 'exams' && (
          <motion.div key="exams" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            
            {/* ANAMNESE DIRIGIDA & ESTRATIFICAÇÃO DE RISCO */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-4">
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                Anamnese Estruturada & Segurança Pré-TH
              </span>
              <h3 className="text-xl font-extrabold text-white">Estratificação de Risco Obrigatória</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-rose-800/80 bg-rose-950/30 space-y-2">
                  <h4 className="font-extrabold text-rose-300 text-sm flex items-center gap-2">
                    <ShieldAlert size={16} /> Risco Vascular
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Pesquisar antecedentes pessoais ou familiares de TEV, TVP, TEP, AVC, DAC prévia, HAS não controlada, Diabetes e Enxaqueca com Aura.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-purple-800/80 bg-purple-950/30 space-y-2">
                  <h4 className="font-extrabold text-purple-300 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} /> Risco Oncológico
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Pesquisar histórico de Câncer de Mama ou Endométrio ativo/prévio, sangramento vaginal não esclarecido e mutações genéticas familiares.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-amber-800/80 bg-amber-950/30 space-y-2">
                  <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                    <HelpCircle size={16} /> A Pergunta Esquecida
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    <strong>"Você ainda precisa de contracepção?"</strong> A THM NÃO é anticonceptiva! Até completar 12m de amenorreia, existe chance residual de gravidez.
                  </p>
                </div>
              </div>
            </div>

            {/* EXAMES COMPLEMENTARES INDICADOS VS CONTRAINDICADOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* O QUE PEDIR */}
              <div className="bg-slate-900/90 border-2 border-emerald-800/80 p-6 rounded-3xl shadow-xl space-y-4">
                <h3 className="text-lg font-black text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 /> Exames Racionais com Indicação Terapêutica
                </h3>
                <div className="space-y-3 text-xs text-slate-200">
                  <p>• <strong>TSH:</strong> Indicado se houver sintomas constitucionais (fadiga, labilidade) ou em &gt; 60 anos.</p>
                  <p>• <strong>Glicemia de Jejum / HbA1c & Perfil Lipídico:</strong> Rastreio metabólico de rotina na faixa etária e definidor da via de administração da TH (oral vs transdérmica).</p>
                  <p>• <strong>Mamografia Rastreio:</strong> Anual a partir dos 40a (FEBRASGO) ou bienal 50-69a (MS). Obrigatória atualização recente (&lt; 1 ano) antes de iniciar THM!</p>
                  <p>• <strong>Densitometria Óssea (DXA):</strong> Para todas ≥ 65a OR &lt; 65a com fator de risco (corticoide, baixo peso, fratura prévia, menopausa &lt; 45a).</p>
                  <p>• <strong>USG Transvaginal:</strong> NÃO é exame de rastreamento assintomático! Indicado APENAS se houver sangramento uterino anormal.</p>
                </div>
              </div>

              {/* O QUE NÃO PEDIR */}
              <div className="bg-slate-900/90 border-2 border-rose-800/80 p-6 rounded-3xl shadow-xl space-y-4">
                <h3 className="text-lg font-black text-rose-300 flex items-center gap-2">
                  <ShieldAlert /> O QUE NÃO PEDIR (Prática Não Amparada)
                </h3>
                <div className="space-y-3 text-xs text-slate-200">
                  <div className="p-3 bg-rose-950/60 rounded-xl border border-rose-800 space-y-1">
                    <p className="font-bold text-rose-200">1. Painel Hormonal Completo de Rotina</p>
                    <p className="text-[11px] text-slate-300">Dosagem cega de FSH, LH e Estradiol em mulher sintomática de 50 anos não muda conduta e gera falsa interpretação pelas flutuações.</p>
                  </div>
                  <div className="p-3 bg-rose-950/60 rounded-xl border border-rose-800 space-y-1">
                    <p className="font-bold text-rose-200">2. Dosagem de Testosterona para "Deficiência Androgênica"</p>
                    <p className="text-[11px] text-slate-300">NÃO existe valor de corte laboratorial validado para definir deficiência androgênica na mulher (Nota Conjunta SBEM/FEBRASGO/SBC 2025).</p>
                  </div>
                  <div className="p-3 bg-rose-950/60 rounded-xl border border-rose-800 space-y-1">
                    <p className="font-bold text-rose-200">3. USG TV para "Mapeamento Endometrial Assintomático"</p>
                    <p className="text-[11px] text-slate-300">Sem evidência de custo-benefício em assintomáticas; eleva taxa de falsos positivos e intervenções desnecessárias.</p>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* TAB 5: TERAPIA HORMONAL - PRESCRIÇÃO PRÁTICA */}
        {activeTab === 'th' && (
           <motion.div key="th" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
             <HormoneTherapyFlowchart />
           </motion.div>
         )}

        {/* TAB 6: NÃO HORMONAL & TESTOSTERONA */}
        {activeTab === 'non_hormonal' && (
          <motion.div key="non_hormonal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            
            {/* TRATAMENTO NÃO HORMONAL - FÁRMACOS E DOSES */}
            <div className="bg-slate-900/90 border-2 border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-4">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                Opções Não Hormonais Evidenciadas
              </span>
              <h3 className="text-2xl font-black text-white">Fármacos para Pacientes com Contraindicação à TH</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* FEZOLINETANT */}
                <div className="p-4 rounded-2xl border-2 border-rose-800 bg-rose-950/30 space-y-3">
                  <span className="text-[10px] font-black text-rose-300 bg-rose-900 px-2 py-0.5 rounded uppercase border border-rose-700">
                    Inovação • Antagonista NK3R
                  </span>
                  <h4 className="font-black text-white text-base">Fezolinetant</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • <strong>Dose & Via:</strong> <strong>45 mg/dia VO (1 comprimido/dia)</strong>.<br/>
                    • <strong>Mecanismo:</strong> Bloqueia seletivamente os receptores NK3 nos neurônios KNDy hipotalâmicos, restaurando o centro termorregulador sem efeito hormonal.
                  </p>
                </div>

                {/* ISRS / IRSN */}
                <div className="p-4 rounded-2xl border-2 border-blue-800 bg-blue-950/30 space-y-3">
                  <span className="text-[10px] font-black text-blue-300 bg-blue-900 px-2 py-0.5 rounded uppercase border border-blue-700">
                    ISRS / IRSN
                  </span>
                  <h4 className="font-black text-white text-base">Escitalopram / Venlafaxina</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • <strong>Escitalopram:</strong> 10 a 20 mg/dia VO.<br/>
                    • <strong>Venlafaxina:</strong> 37,5 a 75 mg/dia VO.<br/>
                    • <strong>Desvenlafaxina:</strong> 50 mg/dia VO.<br/>
                    • <strong>Atenção Tamoxifeno:</strong> Evitar Paroxetina e Fluoxetina (inibem CYP2D6 e reduzem o endoxifeno ativado!).
                  </p>
                </div>

                {/* GABAPENTINA */}
                <div className="p-4 rounded-2xl border-2 border-purple-800 bg-purple-950/30 space-y-3">
                  <span className="text-[10px] font-black text-purple-300 bg-purple-900 px-2 py-0.5 rounded uppercase border border-purple-700">
                    Modulador de Canais Ca²⁺
                  </span>
                  <h4 className="font-black text-white text-base">Gabapentina</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    • <strong>Dose & Via:</strong> <strong>300 a 900 mg/dia VO divididos ou dose única à noite</strong>.<br/>
                    • <strong>Efeito Sedativo Beneficioso:</strong> Excelente indicação quando os fogachos acompanham insônia grave e despertares noturnos.
                  </p>
                </div>

              </div>
            </div>

            {/* APROFUNDAMENTO: TESTOSTERONA NA MENOPAUSA (O MITO x A REALIDADE) */}
            <div className="bg-slate-900/90 border-2 border-amber-800/80 p-6 rounded-3xl shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-800/60 pb-4">
                <div>
                  <span className="text-xs font-black text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                    Posição Conjunta SBEM / FEBRASGO / SBC 2025
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">Testosterona na Menopausa: Ciência vs Mídia</h3>
                </div>
                <button
                  onClick={() => setShowTestosteroneTruth(!showTestosteroneTruth)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shrink-0"
                >
                  {showTestosteroneTruth ? 'Ocultar Detalhes da Diretriz' : 'Revelar Consenso das Sociedades'}
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 text-xs text-slate-200 leading-relaxed space-y-2">
                  <p className="font-extrabold text-amber-300 text-sm">
                    "A 'deficiência de testosterona' NÃO é causa reconhecida de fadiga, perda de massa muscular ou indisposição na mulher."
                  </p>
                  <p>
                    A menopausa fisiológica natural NÃO causa queda abrupta de testosterona. A produção androgênica ovariana permanece ativa (40-50% mantidos).
                  </p>
                </div>

                {showTestosteroneTruth && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn pt-2">
                    <div className="bg-slate-950 p-5 rounded-2xl border border-amber-800 space-y-3">
                      <h4 className="font-black text-amber-300 text-sm">Única Indicação Aprovada por Consenso</h4>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        • <strong>Indicação Única:</strong> Transtorno do Interesse/Excitação Sexual Feminino (<strong>HSDD / FSIAD</strong>) na pós-menopausa, APÓS excluir causas reversíveis (secura/SGUM, depressão, estresse conjugal ou uso de ISRS).<br/>
                        • <strong>Posologia (Off-label em gel):</strong> Testosterona gel 1% transdérmico em dose ajustada para ~5 mg/dia (1/10 da dose masculina, ex: 1/8 de sachê aplicado na coxa/braço).<br/>
                        • <strong>Monitoramento:</strong> Manter a testosterona total dentro da faixa fisiológica pré-menopausa.
                      </p>
                    </div>

                    <div className="bg-rose-950/60 p-5 rounded-2xl border border-rose-800 space-y-3">
                      <h4 className="font-black text-rose-300 text-sm">O Que É VEDADO e Sem Evidência</h4>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        • <strong>PROIBIDO PELO CFM:</strong> Implantes/Pellets de hormônios e manipulações sem controle de liberação!<br/>
                        • <strong>Sem Evidência:</strong> Testosterona NÃO tem indicação para ganho de massa magra, melhora de cognição, energia, fadiga ou emagrecimento.<br/>
                        • <strong>Riscos de Doses Suprafisiológicas:</strong> Hirsutismo, acne, virilização irreversível, alteração de voz e clitoromegalia.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TRATAMENTO ESPECÍFICO DA SGUM */}
            <div className="bg-slate-900/90 border-2 border-purple-800/80 p-6 rounded-3xl shadow-xl space-y-4">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <HeartPulse className="text-purple-400" /> Abordagem Específica da SGUM (Síndrome Geniturinária)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs text-slate-200 space-y-2">
                  <span className="font-black text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                    1ª Linha para Quadros Leves
                  </span>
                  <p className="font-extrabold text-white text-sm">Lubrificantes + Hidratantes Vaginais</p>
                  <p>• Lubrificantes no ato sexual (à base de água ou silicone).</p>
                  <p>• Hidratantes vaginais de uso contínuo (2 a 3x/semana, ex: ácido hialurônico / policarbofila) para reter água na mucosa.</p>
                </div>

                <div className="p-4 bg-slate-800/90 rounded-2xl border border-purple-700 text-xs text-slate-200 space-y-2">
                  <span className="font-black text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Tratamento Específico de Escolha
                  </span>
                  <p className="font-extrabold text-white text-sm">Estrogênio Vaginal em Baixa Dose</p>
                  <p>• <strong>Estriol creme 1 mg/g OU Promestrieno creme 10 mg/g:</strong> 1 aplicação vaginal/dia por 2 semanas (indução), seguida de 2 a 3 aplicações/semana de manutenção.</p>
                  <p>• Absorção sistêmica MÍNIMA. Não exige associação com progestagênio!</p>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* CHECKLIST FINAL VISUAL DE CONTRASTE */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-center text-xs text-slate-400">
        Template Clínico de Ensino Médico • Todos os fármacos contêm Dose, Via e Frequência • Alto Contraste Garantido.
      </div>
    </div>
  );
}
