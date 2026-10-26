import React, { useState } from 'react';
import { 
  BookOpen, Wind, Stethoscope, AlertCircle, CheckCircle2, 
  Activity, Users, ShieldAlert, Sparkles, Sliders, ChevronRight, 
  HelpCircle, Zap, ShieldCheck, Microscope, Thermometer,
  Layers, ArrowRight, Check, X, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AsmaClinicaDiagnostico() {
  const [activeTopic, setActiveTopic] = useState<'variabilidade' | 'espirometria' | 'controle' | 'exame' | 'gatilhos' | 'fenotipos' | 'perolas'>('variabilidade');
  
  // Interactive GINA 4-Week Control Assessment state
  const [ginaAnswers, setGinaAnswers] = useState<{
    daytime: boolean | null;
    nighttime: boolean | null;
    reliever: boolean | null;
    limitation: boolean | null;
  }>({
    daytime: null,
    nighttime: null,
    reliever: null,
    limitation: null
  });

  const toggleGinaAnswer = (key: 'daytime' | 'nighttime' | 'reliever' | 'limitation', value: boolean) => {
    setGinaAnswers(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }));
  };

  const ginaYesCount = Object.values(ginaAnswers).filter(v => v === true).length;
  const isGinaComplete = Object.values(ginaAnswers).every(v => v !== null);

  const topicsList = [
    {
      id: 'variabilidade',
      title: 'Variabilidade & Quadro Clínico',
      subtitle: 'O core patognomônico da asma',
      badge: 'Definição GINA',
      icon: Wind,
      color: 'blue'
    },
    {
      id: 'espirometria',
      title: 'Diagnóstico & Espirometria',
      subtitle: 'Critérios objetivos e alternativas',
      badge: 'Padrão-Ouro',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      id: 'controle',
      title: 'Calculadora de Controle GINA',
      subtitle: 'Avaliação das últimas 4 semanas',
      badge: 'Interativo',
      icon: ShieldCheck,
      color: 'indigo'
    },
    {
      id: 'exame',
      title: 'Exame Físico & Sinais de Alarme',
      subtitle: 'Tórax silencioso e pulso paradoxal',
      badge: 'Emergência',
      icon: Stethoscope,
      color: 'rose'
    },
    {
      id: 'fenotipos',
      title: 'Fenotipagem & Biomarcadores',
      subtitle: 'T2-Alta vs T2-Baixa e biológicos',
      badge: 'Medicina de Precisão',
      icon: Microscope,
      color: 'purple'
    },
    {
      id: 'gatilhos',
      title: 'Gatilhos & Comorbidades',
      subtitle: 'AERD (Tríade Samter), DRGE e atopia',
      badge: 'Precipitantes',
      icon: AlertCircle,
      color: 'amber'
    },
    {
      id: 'perolas',
      title: 'Pérolas & Armadilhas Práticas',
      subtitle: 'Dicas de consultório e plantão',
      badge: 'Alta Relevância',
      icon: Sparkles,
      color: 'cyan'
    }
  ] as const;

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      
      {/* Header Banner - Aligned with App Visual Identity */}
      <div className="card p-6 md:p-8 border border-brand-blue/30 bg-gradient-to-r from-brand-blue/15 via-card to-purple-950/15 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue border border-brand-blue/30 flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen size={14} />
              Pneumologia Clínica & Diagnóstica
            </span>
            <span className="text-xs font-mono text-ink-muted">
              • Diretrizes GINA 2024 / SBPT
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
            Clínica e Diagnóstico da Asma
          </h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            Abordagem moderna fundamentada na <strong className="text-brand-navy">variabilidade temporal e de intensidade dos sintomas</strong>, confirmação espirométrica de limitação expiratória reversível e fenotipagem de vias inflamatórias.
          </p>
        </div>

        {/* Quick Highlights Counters */}
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <div className="p-3.5 rounded-2xl bg-bg/80 border border-line flex flex-col items-center min-w-[90px] shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted font-bold">Critério VEF1</span>
            <span className="text-lg font-black text-emerald-400">≥12% e 200mL</span>
            <span className="text-[10px] text-ink-muted">Reversibilidade</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-bg/80 border border-line flex flex-col items-center min-w-[90px] shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted font-bold">Piora Clássica</span>
            <span className="text-lg font-black text-purple-400">03h - 04h</span>
            <span className="text-[10px] text-ink-muted">Queda de Cortisol</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Strip (Conceito Fisiopatológico Estrutural) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4 border border-line bg-card/60 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 font-bold">
            1
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-brand-navy uppercase tracking-wide">Variabilidade dos Sintomas</h4>
            <p className="text-[11px] text-ink-muted leading-relaxed mt-0.5">
              Flutuação ao longo do tempo e em intensidade. Sintomas ausentes entre crises não descartam asma.
            </p>
          </div>
        </div>

        <div className="card p-4 border border-line bg-card/60 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 font-bold">
            2
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-brand-navy uppercase tracking-wide">Limitação Expiratória Reversível</h4>
            <p className="text-[11px] text-ink-muted leading-relaxed mt-0.5">
              Broncoespasmo documentado que melhora espontaneamente ou em resposta imediata a broncodilatadores.
            </p>
          </div>
        </div>

        <div className="card p-4 border border-line bg-card/60 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20 font-bold">
            3
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-brand-navy uppercase tracking-wide">Inflamação Crônica da Via Aérea</h4>
            <p className="text-[11px] text-ink-muted leading-relaxed mt-0.5">
              Infiltração de eosinófilos, mastócitos e linfócitos Th2 (IL-4, IL-5, IL-13) na mucosa brônquica.
            </p>
          </div>
        </div>

        <div className="card p-4 border border-line bg-card/60 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 font-bold">
            4
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-brand-navy uppercase tracking-wide">Hiper-responsividade (HRB)</h4>
            <p className="text-[11px] text-ink-muted leading-relaxed mt-0.5">
              Estreitamento excessivo da árvore traqueobrônquica frente a estímulos inócuos (frio, riso, exercício, cheiros).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Topics Navigator Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders size={14} className="text-brand-blue" />
            Navegue pelos Módulos Clínicos & Diagnósticos:
          </span>
          <span className="text-xs text-ink-muted hidden sm:inline font-mono">
            Selecione para explorar em detalhes
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {topicsList.map(t => {
            const Icon = t.icon;
            const isActive = activeTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 relative group ${
                  isActive
                    ? 'bg-brand-blue/15 border-brand-blue shadow-lg shadow-blue-500/10 ring-1 ring-brand-blue/50'
                    : 'bg-card hover:bg-bg/90 border-line hover:border-slate-400 text-ink'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-3 right-3 h-1 bg-brand-blue rounded-full" />
                )}

                <div className="flex items-center justify-between gap-1">
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    isActive ? 'bg-brand-blue text-white' : 'bg-bg text-ink-muted group-hover:text-brand-navy'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                    isActive ? 'bg-brand-blue/20 text-brand-blue' : 'bg-bg text-ink-muted'
                  }`}>
                    {t.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`text-xs font-bold leading-snug line-clamp-1 ${
                    isActive ? 'text-brand-navy font-extrabold' : 'text-slate-300'
                  }`}>
                    {t.title}
                  </h3>
                  <p className="text-[10px] text-ink-muted line-clamp-1 mt-0.5">
                    {t.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTopic}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >

          {/* ================================================================= */}
          {/* 1. VARIABILIDADE & QUADRO CLÍNICO */}
          {/* ================================================================= */}
          {activeTopic === 'variabilidade' && (
            <div className="flex flex-col gap-6">
              
              {/* Concept Banner */}
              <div className="card p-6 border border-blue-500/30 bg-gradient-to-r from-blue-950/25 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">
                    Princípio Fundamental do GINA
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy">
                    A Variabilidade Não é um Detalhe: Ela é a Própria Asma
                  </h2>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    Um paciente com sintomas fixos, estáticos e sem flutuação ao longo dos dias <strong className="text-slate-200">dificilmente tem asma pura</strong> (pensar em DPOC, bronquiectasias ou insuficiência cardíaca). O exame físico pode estar completamente normal no consultório sem desabonar o diagnóstico.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300 shrink-0">
                  <div className="font-bold">Tempo Expiratório Prolongado</div>
                  <div className="text-[10px] text-ink-muted">Marca cardinal de obstrução</div>
                </div>
              </div>

              {/* 4 Cardinal Symptoms Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">💨</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Expiratória</span>
                  </div>
                  <h3 className="font-bold text-base text-brand-navy">Dispneia Sibilante</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Sensação de "ar preso" e dificuldade para soltar o ar. Ocorre aos esforços ou espontaneamente em repouso durante a noite e primeiras horas da manhã.
                  </p>
                </div>

                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🎵</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Polifônica</span>
                  </div>
                  <h3 className="font-bold text-base text-brand-navy">Sibilância Difusa</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Sons musicais expiratórios difusos bilaterais gerados pela vibração de vias aéreas estreitadas. Sibilo unilateral exige descartar corpo estranho ou neoplasia!
                  </p>
                </div>

                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🔔</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Variante Tosse</span>
                  </div>
                  <h3 className="font-bold text-base text-brand-navy">Tosse Seca Noturna</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Frequentemente o único sintoma na "asma variante tosse". Piora ao rir, ao chorar, com ar gelado e ao deitar. Frequentemente subdiagnosticada como sinusite ou refluxo.
                  </p>
                </div>

                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🫁</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">Opressão</span>
                  </div>
                  <h3 className="font-bold text-base text-brand-navy">Aperto no Peito</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Sensação de constrição torácica difusa anterior, bilateral, sem irradiação clássica, que alivia rapidamente (em 3-5 minutos) após uso de broncodilatador inalatório.
                  </p>
                </div>
              </div>

              {/* Por que piora de madrugada? & Anamnese Direcionada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card p-6 border border-purple-500/30 bg-purple-950/15 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <span className="text-lg">🌙</span>
                    <span>Fisiopatologia da Piora Noturna (03:00 às 04:00 da manhã)</span>
                  </div>
                  <p className="text-xs text-ink leading-relaxed">
                    A asma é uma doença com fortíssimo componente circadiano. A piora na madrugada deve-se a uma tempestade biológica perfeita:
                  </p>
                  <ul className="text-xs space-y-2 text-ink-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Nadir do Cortisol Sérico:</strong> O cortisol endógeno atinge seu nível mais baixo entre 02h e 04h, reduzindo a supressão anti-inflamatória basal.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Hipertonia Vagal Noturna:</strong> Aumento parassimpático com liberação de acetilcolina em receptores M3 brônquicos, induzindo broncoconstrição.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Posição Supina & Refluxo (DRGE):</strong> Aumento do retorno venoso, queda da Capacidade Residual Funcional (CRF) e microaspiração ácida esofágica.</span>
                    </li>
                  </ul>
                  <div className="p-3 rounded-xl bg-bg border border-purple-500/20 text-[11px] font-mono text-purple-300 font-bold">
                    💡 Regra de Ouro GINA: Acordar à noite por tosse ou falta de ar sequer 1x no mês indica asma NÃO controlada!
                  </div>
                </div>

                <div className="card p-6 border border-line space-y-3">
                  <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                    <HelpCircle size={18} />
                    <span>Perguntas de Alto Rendimento na Consulta de Asma</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Muitos asmáticos normalizam as limitações físicas diárias e respondem "não sinto nada". Use perguntas indiretas:
                  </p>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-bg border border-line">
                      <strong className="text-brand-navy block mb-0.5">1. Pergunta Funcional Comparativa:</strong>
                      <span className="text-ink-muted italic">"O que você conseguia fazer há 1 ou 2 anos (subir ladeira, caminhar com netos) que hoje você evita fazer?"</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-bg border border-line">
                      <strong className="text-brand-navy block mb-0.5">2. Consumo de Resgate (SABA):</strong>
                      <span className="text-ink-muted italic">"Quantos frascos de 'bombinha azul' (Salbutamol) você compra por ano? Quantas vezes por semana você precisa usá-la?"</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-bg border border-line">
                      <strong className="text-brand-navy block mb-0.5">3. Gatilhos do Dia a Dia:</strong>
                      <span className="text-ink-muted italic">"Quando você dá risada alta, corre ou sai no ar gelado da manhã, você tosse ou sente o peito chiar?"</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 2. DIAGNÓSTICO & ESPIROMETRIA */}
          {/* ================================================================= */}
          {activeTopic === 'espirometria' && (
            <div className="flex flex-col gap-6">
              
              {/* Gold Standard Header */}
              <div className="card p-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/25 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Critérios Oficiais GINA & Diretrizes Brasileiras SBPT
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy">
                    Espirometria com Prova Broncodilatadora: O Padrão-Ouro
                  </h2>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    O diagnóstico requer a demonstração de <strong className="text-slate-200">limitação expiratória variável ao fluxo aéreo</strong>. Jamais firme diagnóstico de asma em adultos sem documentação funcional prévia antes de iniciar corticoterapia crônica!
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 shrink-0 text-center">
                  <div className="font-bold text-sm">Δ VEF1 ≥ 12% E ≥ 200 mL</div>
                  <div className="text-[10px] text-ink-muted">Pós-400 mcg de Salbutamol</div>
                </div>
              </div>

              {/* The 2 Espirometry Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card p-6 border border-line space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase">Critério 1: Presença de Obstrução</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Basal</span>
                  </div>
                  <h3 className="text-lg font-black text-brand-navy">Relação VEF1 / CVF Reduzida (Índice de Tiffeneau)</h3>
                  <p className="text-xs text-ink leading-relaxed">
                    Caracteriza o <strong>Distúrbio Ventilatório Obstrutivo (DVO)</strong>. A relação VEF1/CVF no exame basal deve estar abaixo do Limite Inferior da Normalidade (LIN) calculado pela equação teórica ou:
                  </p>
                  <ul className="text-xs space-y-1.5 text-ink-muted font-mono bg-bg p-3 rounded-xl border border-line">
                    <li>• Em Adultos: VEF1/CVF &lt; 0,75 a 0,80 (ou &lt; LIN)</li>
                    <li>• Em Crianças e Jovens (&lt; 18 anos): VEF1/CVF &lt; 0,90</li>
                  </ul>
                  <p className="text-[11px] text-slate-400 italic">
                    Nota: Se a relação VEF1/CVF for normal, o paciente NÃO tem obstrução naquele momento (mas pode ainda ser asma pela variabilidade!).
                  </p>
                </div>

                <div className="card p-6 border border-line space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Critério 2: Reversibilidade Significativa</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Pós-BD</span>
                  </div>
                  <h3 className="text-lg font-black text-brand-navy">Prova Broncodilatadora Positiva (Resposta ao BD)</h3>
                  <p className="text-xs text-ink leading-relaxed">
                    Realizada com 4 jatos de Salbutamol 100 mcg (total 400 mcg) via espaçador valvulado, repetindo a espirometria 15 minutos após. A prova é positiva se houver:
                  </p>
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-200 space-y-1">
                    <div className="font-extrabold text-sm text-emerald-300">Aumento do VEF1 ≥ 12% E ≥ 200 mL</div>
                    <div className="text-[11px] text-ink-muted">Ambos os critérios são obrigatórios em adultos! Em crianças, apenas ≥ 12% do previsto.</div>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    Reversibilidade completa (normalização do VEF1/CVF) favorece asma em relação à DPOC.
                  </p>
                </div>
              </div>

              {/* E se a espirometria vier NORMAL? (Fluxo Diagnóstico Alternativo) */}
              <div className="card p-6 border border-line space-y-4">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-base border-b border-line pb-3">
                  <HelpCircle className="text-brand-blue" size={20} />
                  <span>"A Espirometria Veio Normal, mas o Paciente Tem História Típica de Asma. E Agora?"</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  A espirometria entre crises pode ser <strong className="text-slate-200">absolutamente normal em até 40-50% dos asmáticos leves ou moderados</strong>. Um exame normal JAMAIS descarta asma. Nesses casos, o GINA recomenda lançar mão dos seguintes testes alternativos confirmatórios:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">1. Peak Flow Diário</span>
                    <h4 className="font-bold text-xs text-brand-navy">Variabilidade do PFE</h4>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      Medir Pico de Fluxo Expiratório (PFE) 2x/dia por 2 semanas. Variabilidade diurna média &gt; 10% em adultos (&gt; 13% em crianças) confirma o diagnóstico.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">2. Broncoprovocação</span>
                    <h4 className="font-bold text-xs text-brand-navy">Teste de Metacolina / Histamina</h4>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      Avalia Hiper-responsividade Brônquica (HRB). Queda do VEF1 ≥ 20% com dose de metacolina (PC20 ≤ 8 mg/mL). Alto valor preditivo negativo.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">3. Teste de Exercício</span>
                    <h4 className="font-bold text-xs text-brand-navy">Broncoespasmo por Exercício (BIE)</h4>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      Protocolo em esteira ou cicloergômetro. Queda do VEF1 ≥ 10% e &gt; 200 mL pós-esforço em relação ao basal documenta a hiper-reatividade.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">4. Prova Terapêutica</span>
                    <h4 className="font-bold text-xs text-brand-navy">Teste com Corticoide (ICS)</h4>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      Iniciar corticoide inalatório dose média por 4 semanas. Se houver ganho de VEF1 &gt; 12% e 200 mL comparado ao pré-tratamento, sela o diagnóstico.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 3. CALCULADORA DE CONTROLE GINA (4 SEMANAS) */}
          {/* ================================================================= */}
          {activeTopic === 'controle' && (
            <div className="flex flex-col gap-6">
              
              <div className="card p-6 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/25 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
                    Avaliação Baseada em Evidências GINA 2024
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy">
                    Classificação do Controle Clínico da Asma
                  </h2>
                  <p className="text-xs text-ink-muted max-w-2xl leading-relaxed">
                    Responda às 4 perguntas do questionário de controle clínico baseado nos sintomas vivenciados pelo paciente nas <strong className="text-slate-200">últimas 4 semanas</strong>.
                  </p>
                </div>

                <button
                  onClick={() => setGinaAnswers({ daytime: null, nighttime: null, reliever: null, limitation: null })}
                  className="px-3.5 py-2 rounded-xl border border-line hover:border-indigo-400 text-xs font-bold text-ink-muted hover:text-brand-navy flex items-center gap-1.5 transition-all cursor-pointer bg-card shrink-0"
                >
                  <RefreshCw size={14} />
                  Reiniciar Teste
                </button>
              </div>

              {/* The 4 Questions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Q1 */}
                <div className={`card p-5 border transition-all flex flex-col justify-between gap-3 ${
                  ginaAnswers.daytime === true ? 'border-amber-500/50 bg-amber-950/15' :
                  ginaAnswers.daytime === false ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-line'
                }`}>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Pergunta 1</span>
                    <h3 className="text-sm font-bold text-brand-navy mt-1">
                      Sintomas diurnos mais de 2 vezes por semana?
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      Dispneia, tosse, aperto torácico ou chiado diurno ocorrendo &gt; 2 dias/semana nas últimas 4 semanas.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toggleGinaAnswer('daytime', false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.daytime === false ? 'bg-emerald-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <Check size={14} /> Não (0 ou ≤2x)
                    </button>
                    <button
                      onClick={() => toggleGinaAnswer('daytime', true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.daytime === true ? 'bg-amber-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <X size={14} /> Sim (&gt;2x/sem)
                    </button>
                  </div>
                </div>

                {/* Q2 */}
                <div className={`card p-5 border transition-all flex flex-col justify-between gap-3 ${
                  ginaAnswers.nighttime === true ? 'border-amber-500/50 bg-amber-950/15' :
                  ginaAnswers.nighttime === false ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-line'
                }`}>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Pergunta 2</span>
                    <h3 className="text-sm font-bold text-brand-navy mt-1">
                      Algum despertar noturno devido à asma?
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      Acordar no meio da noite ou pela manhã com tosse, falta de ar ou chiado no peito em qualquer momento do último mês.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toggleGinaAnswer('nighttime', false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.nighttime === false ? 'bg-emerald-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <Check size={14} /> Não (Nenhum)
                    </button>
                    <button
                      onClick={() => toggleGinaAnswer('nighttime', true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.nighttime === true ? 'bg-amber-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <X size={14} /> Sim (Acordou)
                    </button>
                  </div>
                </div>

                {/* Q3 */}
                <div className={`card p-5 border transition-all flex flex-col justify-between gap-3 ${
                  ginaAnswers.reliever === true ? 'border-amber-500/50 bg-amber-950/15' :
                  ginaAnswers.reliever === false ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-line'
                }`}>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Pergunta 3</span>
                    <h3 className="text-sm font-bold text-brand-navy mt-1">
                      Uso de medicação de resgate (alívio) mais de 2 vezes por semana?
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      Necessidade de usar Salbutamol ou ICS-Formoterol como resgate &gt; 2x/semana (não conta dose profilática antes de esporte).
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toggleGinaAnswer('reliever', false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.reliever === false ? 'bg-emerald-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <Check size={14} /> Não (≤2x/sem)
                    </button>
                    <button
                      onClick={() => toggleGinaAnswer('reliever', true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.reliever === true ? 'bg-amber-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <X size={14} /> Sim (&gt;2x/sem)
                    </button>
                  </div>
                </div>

                {/* Q4 */}
                <div className={`card p-5 border transition-all flex flex-col justify-between gap-3 ${
                  ginaAnswers.limitation === true ? 'border-amber-500/50 bg-amber-950/15' :
                  ginaAnswers.limitation === false ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-line'
                }`}>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Pergunta 4</span>
                    <h3 className="text-sm font-bold text-brand-navy mt-1">
                      Alguma limitação de atividades diárias devido à asma?
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      Falta ao trabalho/escola, incapacidade de subir escadas, praticar lazer ou esportes por causa do chiado ou fôlego curto.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toggleGinaAnswer('limitation', false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.limitation === false ? 'bg-emerald-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <Check size={14} /> Não (Vida Normal)
                    </button>
                    <button
                      onClick={() => toggleGinaAnswer('limitation', true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        ginaAnswers.limitation === true ? 'bg-amber-600 text-white shadow-md' : 'bg-bg border border-line text-ink-muted hover:text-brand-navy'
                      }`}
                    >
                      <X size={14} /> Sim (Limitado)
                    </button>
                  </div>
                </div>

              </div>

              {/* Automatic Result Banner */}
              <div className="card p-6 border rounded-2xl transition-all shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ${
                      !isGinaComplete ? 'bg-slate-700' :
                      ginaYesCount === 0 ? 'bg-emerald-600 shadow-emerald-500/20' :
                      ginaYesCount <= 2 ? 'bg-amber-600 shadow-amber-500/20' : 'bg-rose-600 shadow-rose-500/20'
                    }`}>
                      {ginaYesCount}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted font-bold">
                        Resultado do Questionário ({Object.values(ginaAnswers).filter(v => v !== null).length}/4 Respondidas)
                      </span>
                      <h3 className="text-xl font-black text-brand-navy">
                        {!isGinaComplete ? 'Responda às 4 perguntas acima' :
                         ginaYesCount === 0 ? 'ASMA BEM CONTROLADA' :
                         ginaYesCount <= 2 ? 'ASMA PARCIALMENTE CONTROLADA' : 'ASMA NÃO CONTROLADA'}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border uppercase tracking-wider ${
                    !isGinaComplete ? 'bg-slate-800 text-slate-400 border-slate-700' :
                    ginaYesCount === 0 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                    ginaYesCount <= 2 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {!isGinaComplete ? 'Pendente' : ginaYesCount === 0 ? 'Nenhum "Sim"' : ginaYesCount <= 2 ? '1 ou 2 "Sim"' : '3 ou 4 "Sim"'}
                  </span>
                </div>

                <div className="pt-4 text-xs space-y-2">
                  <strong className="text-brand-navy block">Conduta Médica Estratificada (Diretriz GINA 2024):</strong>
                  {!isGinaComplete ? (
                    <p className="text-ink-muted italic">
                      Selecione "Sim" ou "Não" para cada uma das 4 variáveis para calcular a conduta terapêutica exata (manutenção, step-up ou step-down).
                    </p>
                  ) : ginaYesCount === 0 ? (
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 space-y-1">
                      <p className="font-bold text-sm text-emerald-300">✓ Manter a medicação atual de controle.</p>
                      <p className="text-[11px] text-slate-300">
                        Se o paciente mantiver asma bem controlada por <strong>3 meses consecutivos</strong> com boa função pulmonar estável, considerar <strong className="text-emerald-300">Step-Down</strong> (redução cautelosa de 25-50% da dose do ICS para encontrar a menor dose efetiva).
                      </p>
                    </div>
                  ) : ginaYesCount <= 2 ? (
                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 space-y-1">
                      <p className="font-bold text-sm text-amber-300">⚠️ Considerar Step-Up no tratamento.</p>
                      <p className="text-[11px] text-slate-300">
                        Antes de aumentar a medicação: <strong>1)</strong> Checar adesão ao tratamento; <strong>2)</strong> Revisar técnica inalatória na consulta; <strong>3)</strong> Tratar rinite alérgica / DRGE. Se tudo correto, subir 1 degrau (ex: Track 1 Step 2 para Step 3).
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-1">
                      <p className="font-bold text-sm text-rose-300">🚨 Step-Up Imediato Obrigatório.</p>
                      <p className="text-[11px] text-slate-300">
                        Alto risco de exacerbação grave e hospitalização. Escalonar o tratamento imediatamente (subir de degrau no Track 1 ou Track 2), considerar curso curto de corticoide oral se exacerbação em curso e reavaliar em 2 a 4 semanas.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 4. EXAME FÍSICO & SINAIS DE ALARME */}
          {/* ================================================================= */}
          {activeTopic === 'exame' && (
            <div className="flex flex-col gap-6">
              
              <div className="card p-6 border border-rose-500/30 bg-gradient-to-r from-rose-950/25 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider font-mono">
                    Semiologia Respiratória Avançada & Emergência
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy">
                    Exame Físico: Da Estabilidade ao Tórax Silencioso
                  </h2>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    Identificação de sinais sutis de hiperinsuflação dinâmica e reconhecimento imediato de falência respiratória catastrófica na crise aguda.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-300 shrink-0 text-center font-bold">
                  Sinal de Iminência de Parada: Tórax Silencioso
                </div>
              </div>

              {/* 3 Semiologic Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Silent Chest */}
                <div className="card p-6 border border-rose-500/40 bg-gradient-to-br from-rose-950/30 to-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-rose-500 text-white font-black uppercase">
                      Alarme Crítico
                    </span>
                    <ShieldAlert size={18} className="text-rose-400" />
                  </div>
                  <h3 className="text-lg font-black text-white">Tórax Silencioso ("Silent Chest")</h3>
                  <p className="text-xs text-rose-100/90 leading-relaxed">
                    <strong>A maior armadilha do plantão:</strong> O paciente chega sibilando muito e, de repente, a ausculta fica "limpa". Se ele mantém tiragem, taquipneia ou sonolência, ele <strong>NÃO melhorou: ele está em exaustão mecânica extrema</strong>.
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-rose-500/30 text-[11px] font-mono text-rose-200">
                    Mecanismo: O fluxo aéreo expiratório caiu abaixo do limiar turbilhonar necessário para emitir som. Intubação em sequência rápida na UTI pode ser iminente.
                  </div>
                </div>

                {/* Pulsus Paradoxus */}
                <div className="card p-6 border border-amber-500/40 bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                      Sinal Hemodinâmico
                    </span>
                    <Activity size={18} className="text-amber-400" />
                  </div>
                  <h3 className="text-lg font-black text-brand-navy">Pulso Paradoxal (&gt; 10 a 12 mmHg)</h3>
                  <p className="text-xs text-ink leading-relaxed">
                    Exagero da queda fisiológica da pressão arterial sistólica durante a inspiração espontânea.
                  </p>
                  <div className="p-3 rounded-xl bg-bg border border-line text-[11px] text-ink-muted leading-relaxed">
                    <strong>Fisiopatologia:</strong> A pressão pleural profundamente negativa necessária para vencer a resistência brônquica aprisiona sangue na vasculatura pulmonar e abaula o septo interventricular para o VE, cortando o volume sistólico na sístole seguinte.
                  </div>
                </div>

                {/* Hyperinflation & Mechanics */}
                <div className="card p-6 border border-line bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">
                      Mecânica Ventilatória
                    </span>
                    <Wind size={18} className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-black text-brand-navy">Tiragem & Musculatura Acessória</h3>
                  <p className="text-xs text-ink leading-relaxed">
                    Sinal precoce de sobrecarga resistiva grave:
                  </p>
                  <ul className="text-xs space-y-1.5 text-ink-muted">
                    <li>• Tiragem de fúrcula e batimento de asa nasal</li>
                    <li>• Contração ativa do esternocleidomastóideo (ECM)</li>
                    <li>• Fala entrecortada (incapacidade de completar frases sem respirar)</li>
                    <li>• Posição em tripé (inclinado para a frente para otimizar mecânica do diafragma)</li>
                  </ul>
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 5. FENOTIPAGEM & BIOMARCADORES */}
          {/* ================================================================= */}
          {activeTopic === 'fenotipos' && (
            <div className="flex flex-col gap-6">
              
              <div className="card p-6 border border-purple-500/30 bg-gradient-to-r from-purple-950/25 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider font-mono">
                    Medicina de Precisão & Inflamação das Vias Aéreas
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy">
                    Fenotipagem da Asma: Endótipo T2-Alto vs. T2-Baixo
                  </h2>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    A asma grave não é homogênea. A identificação da via imunopatológica subjacente é o pilar mandatário para indicação de anticorpos monoclonais biológicos (anti-IgE, anti-IL5, anti-IL4R, anti-TSLP).
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 shrink-0 font-bold text-center">
                  Biomarcadores: Eosinófilos, IgE e FeNO
                </div>
              </div>

              {/* T2-High vs T2-Low Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* T2-High */}
                <div className="card p-6 border border-purple-500/40 bg-purple-950/15 space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                    <span className="text-xs font-mono font-bold text-purple-300 uppercase">Endótipo 1</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-bold">~70% dos Casos</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-brand-navy">Asma T2-Alta (Eosinofílica & Alérgica)</h3>
                    <p className="text-xs text-ink leading-relaxed mt-1">
                      Mediada por citocinas Th2 e ILC2 (IL-4, IL-5, IL-13) orquestradas pelo epitélio.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg border border-purple-500/20 space-y-2 text-xs">
                    <strong className="text-purple-300 block font-mono">Biomarcadores Diagnósticos:</strong>
                    <ul className="space-y-1.5 text-ink-muted">
                      <li>• <strong>Eosinófilos no Sangue:</strong> ≥ 150 a 300 céls/µL</li>
                      <li>• <strong>FeNO (Óxido Nítrico Exalado):</strong> ≥ 20 a 25 ppb (indica inflamação eosinofílica ativa)</li>
                      <li>• <strong>IgE Total e Específica Elevadas:</strong> Atopia / Prick Test positivo</li>
                    </ul>
                  </div>

                  <div className="text-xs space-y-1">
                    <strong className="text-slate-300">Resposta Terapêutica:</strong>
                    <p className="text-ink-muted leading-relaxed">
                      Excelente resposta a Corticoides Inalatórios (ICS). Na asma grave refratária (Step 5), é o alvo para <strong>Biológicos</strong>: Omalizumabe (anti-IgE), Mepolizumabe/Benralizumabe (anti-IL5/R), Dupilumabe (anti-IL4R/IL13) e Tezepelumabe (anti-TSLP).
                    </p>
                  </div>
                </div>

                {/* T2-Low */}
                <div className="card p-6 border border-line bg-card space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Endótipo 2</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-200 font-bold">~30% dos Casos</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-brand-navy">Asma T2-Baixa (Neutrofílica ou Paucigranulocítica)</h3>
                    <p className="text-xs text-ink leading-relaxed mt-1">
                      Inflamação não eosinofílica mediada por Th1 e Th17 (IL-8, IL-17, TNF-alfa).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg border border-line space-y-2 text-xs">
                    <strong className="text-slate-300 block font-mono">Características Clínicas:</strong>
                    <ul className="space-y-1.5 text-ink-muted">
                      <li>• Eosinófilos baixos (&lt; 150 céls/µL) e FeNO normal (&lt; 20 ppb)</li>
                      <li>• Fortemente associada a tabagismo, obesidade e idade avançada</li>
                      <li>• Remodelamento brônquico com aumento de músculo liso</li>
                    </ul>
                  </div>

                  <div className="text-xs space-y-1">
                    <strong className="text-slate-300">Resposta Terapêutica:</strong>
                    <p className="text-ink-muted leading-relaxed">
                      Menor resposta aos corticoides. Benefício marcado com acréscimo de <strong>LAMA (Tiotrópio)</strong>, Macrolídeos em dose imunomoduladora (Azitromicina crônica), controle de peso e cessação tabágica. Tezepelumabe (anti-TSLP) tem benefício mesmo em T2-low.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 6. GATILHOS & COMORBIDADES */}
          {/* ================================================================= */}
          {activeTopic === 'gatilhos' && (
            <div className="flex flex-col gap-6">
              
              <div className="card p-6 border border-amber-500/30 bg-gradient-to-r from-amber-950/25 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                    Desestabilizadores do Controle & Gatilhos Imunológicos
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy">
                    Precipitantes Clínicos, Comorbidades & AERD
                  </h2>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    Antes de considerar um paciente como "portador de asma refratária", é mandatório investigar comorbidades e gatilhos que impedem a eficácia farmacológica.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* AERD / Samter */}
                <div className="card p-5 border border-red-500/40 bg-red-950/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-red-400 uppercase">AERD / Tríade de Samter</span>
                    <span className="text-base">💊</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-brand-navy">Intolerância a Aspirina e AINEs</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    <strong>Tríade Clássica:</strong> Asma Grave + Rinossinusite Crônica com Polipose Nasal + Broncoespasmo agudo grave minutos após ingerir AAS ou AINEs (desvio do ácido araquidônico para via da 5-lipoxigenase e superprodução de leucotrienos C4/D4).
                  </p>
                  <div className="p-2.5 rounded-lg bg-black/30 border border-red-500/20 text-[11px] text-red-200">
                    Conduta: Contraindicação absoluta a AINEs. Excelente resposta a antileucotrienos (Montelucaste).
                  </div>
                </div>

                {/* Infecções Virais */}
                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Principal Causa de Crise</span>
                    <span className="text-base">🦠</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-brand-navy">Infecções Respiratórias Virais</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    O <strong>Rinovírus</strong> humano é responsável por até 80% das exacerbações asmáticas graves em crianças e adultos. Lesa o epitélio ciliar e induz resistência transitória aos corticoides inalatórios.
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    GINA Track 1: Usar doses adicionais de ICS-Formoterol aos primeiros sinais de resfriado previne hospitalizações.
                  </p>
                </div>

                {/* DRGE & Microaspiração */}
                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase">Comorbidade Digestiva</span>
                    <span className="text-base">🫀</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-brand-navy">Refluxo Gastroesofágico (DRGE)</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Presente em até 50% dos asmáticos graves. O ácido estimula o reflexo vagal esôfago-brônquico e gera microaspiração ácida noturna com broncoconstrição reflexa intratável.
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    Tratar com IBP (Omeprazol) e medidas comportamentais melhora o controle respiratório.
                  </p>
                </div>

                {/* Rinite Alérgica & Via Aérea Única */}
                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase">Conceito "One Airway"</span>
                    <span className="text-base">👃</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-brand-navy">Rinite Alérgica Não Controlada</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    "Uma via aérea, uma doença". A respiração bucal crônica impede o aquecimento e filtragem do ar, sobrecarregando os brônquios. Rinite não tratada é causa clássica de falha no tratamento da asma.
                  </p>
                </div>

                {/* Alérgenos & Ocupação */}
                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Alérgenos Inaláveis</span>
                    <span className="text-base">🏠</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-brand-navy">Ácaros, Fungos & Ocupação</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Ácaros da poeira (Dermatophagoides), pelos de animais e mofo domiciliar mantêm a via Th2 ativada. Na asma ocupacional (padeiros, pintores), a melhora no fim de semana e piora no trabalho é a pista chave.
                  </p>
                </div>

                {/* Obesidade & Mecânica */}
                <div className="card p-5 border border-line bg-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Metabolismo</span>
                    <span className="text-base">⚖️</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-brand-navy">Obesidade & Apneia do Sono (SAOS)</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    A compressão torácica reduz a Capacidade Residual Funcional, promovendo fechamento precoce das pequenas vias aéreas, além do estado inflamatório sistêmico por adipocinas (IL-6, TNF).
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 7. PÉROLAS & ARMADILHAS PRÁTICAS */}
          {/* ================================================================= */}
          {activeTopic === 'perolas' && (
            <div className="flex flex-col gap-6">
              
              <div className="card p-6 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/25 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
                    Pérolas Clínicas de Especialistas & Prevenção de Erros
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-brand-navy">
                    O Que Todo Médico Precisa Saber na Prática
                  </h2>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    Consolidação dos maiores erros conceituais na abordagem da asma e pontos de alto rendimento para a tomada de decisão clínica.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Armadilha 1: SABA isolado */}
                <div className="card p-6 border border-red-500/40 bg-red-950/15 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <ShieldAlert size={18} />
                    <span>Armadilha 1: Prescrever SABA Isolado Sem Corticoide Inalatório</span>
                  </div>
                  <p className="text-xs text-ink leading-relaxed">
                    <strong>Proibido pelo GINA desde 2019:</strong> O uso de beta-2 agonista de curta duração (Salbutamol) em monoterapia mascara a inflamação subjacente, causa dessensibilização dos receptores beta-2 adrenérgicos e aumenta dramaticamente o risco de exacerbação grave fatal.
                  </p>
                  <p className="text-[11px] text-red-200/90 font-mono bg-black/30 p-2.5 rounded-lg border border-red-500/20">
                    O paciente que consome ≥ 3 frascos de bombinha azul/ano tem risco elevado de procurar o pronto-socorro; ≥ 12 frascos/ano associa-se a alto risco de óbito!
                  </p>
                </div>

                {/* Armadilha 2: Normalidade espirométrica */}
                <div className="card p-6 border border-line bg-card space-y-3">
                  <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                    <CheckCircle2 size={18} />
                    <span>Armadilha 2: Excluir Asma Diante de Espirometria Normal</span>
                  </div>
                  <p className="text-xs text-ink leading-relaxed">
                    Lembre-se sempre: <strong>A espirometria mede a função ventilatória no minuto do teste</strong>. Se o paciente estiver assintomático e sem gatilhos recentes, a relação VEF1/CVF pode ser normalíssima. Diante de suspeita clínica sólida, prossiga para Peak Flow, Broncoprovocação ou Teste Terapêutico.
                  </p>
                </div>

                {/* Armadilha 3: Diferencial Asma vs DPOC */}
                <div className="card p-6 border border-line bg-card space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <Microscope size={18} />
                    <span>Diferenciação Prática: Asma vs. DPOC</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-ink-muted">
                    <li>• <strong>Idade de Início:</strong> Asma geralmente na infância/juventude; DPOC tipicamente &gt; 40 anos.</li>
                    <li>• <strong>História Tabágica:</strong> DPOC quase sempre associada a carga tabágica &gt; 10 a 20 maços-ano.</li>
                    <li>• <strong>Pós-Broncodilatador:</strong> Na asma, o VEF1/CVF frequentemente normaliza; na DPOC, a obstrução (VEF1/CVF &lt; 0.70) é fixa e persistente pós-BD.</li>
                    <li>• <strong>Sintomas:</strong> Asma é variável dia a dia; DPOC é progressiva e contínua.</li>
                  </ul>
                </div>

                {/* Armadilha 4: Técnica Inalatória */}
                <div className="card p-6 border border-line bg-card space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Sparkles size={18} />
                    <span>A Maior Causa de "Asma Refratária": Técnica Inalatória Incorreta</span>
                  </div>
                  <p className="text-xs text-ink leading-relaxed">
                    Até <strong>70% a 80% dos pacientes</strong> não utilizam seu dispositivo inalatório corretamente (não soltam o ar antes, não usam espaçador com spray, inspiram devagar demais em pós-secos ou não fazem apneia pós-inalação). Peça para o paciente demonstrar a técnica em TODA consulta antes de aumentar a dose do medicamento!
                  </p>
                </div>

              </div>

            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
