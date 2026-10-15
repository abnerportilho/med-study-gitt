import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Flame, 
  Droplet, 
  Bone, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  Sparkles,
  ArrowDown,
  ShieldAlert,
  Info,
  Activity,
  Pill,
  HeartPulse,
  Sparkle,
  FileText,
  Scale,
  Layers
} from 'lucide-react';

interface Props {
  onSelectOption?: (stepId: string, value: string) => void;
}

export function HormoneTherapyFlowchart({ onSelectOption }: Props) {
  // Estado para controlar expansão de detalhes de cada balão
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    'step1': false,
    'step2': false,
    'step3': false,
    'step4': false
  });

  // Decisões do usuário no fluxograma
  const [hasIndication, setHasIndication] = useState<boolean | null>(null);
  const [hasUterus, setHasUterus] = useState<boolean | null>(null);
  const [hasContraindication, setHasContraindication] = useState<boolean | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<'transdermica' | 'oral' | 'vaginal' | null>(null);

  const toggleDetails = (stepId: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-2 sm:px-4 space-y-6">
      
      {/* Cabeçalho do Fluxograma */}
      <div className="text-center space-y-2 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/80">
          <Sparkles size={14} className="text-emerald-400" /> Fluxograma Decisório Vertical
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Algoritmo de Terapia Hormonal (TH)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Passo a passo sequencial estruturado na fisiologia e na estratificação de risco clínica baseada em diretrizes atuais.
        </p>
      </div>

      {/* ÁRVORE VERTICAL DESCENDENTE */}
      <div className="flex flex-col items-center space-y-4">
        
        {/* ============================================================ */}
        {/* PASSO 1: BALÃO PRINCIPAL DA PRIMEIRA PERGUNTA */}
        {/* ============================================================ */}
        <div className="w-full max-w-2xl">
          <div 
            id="th-step-1-balloon"
            onClick={() => toggleDetails('step1')}
            className={`cursor-pointer transition-all duration-200 rounded-3xl p-5 sm:p-6 border-2 shadow-xl backdrop-blur-md select-none ${
              expandedDetails['step1'] 
                ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/30' 
                : 'bg-slate-900/95 border-emerald-600/80 hover:border-emerald-400 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black text-lg shrink-0">
                  1
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Ponto de Partida</span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    A paciente tem indicação para Terapia Hormonal (TH)?
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-300/80 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                  {expandedDetails['step1'] ? 'Ocultar indicações' : 'Ver indicações'}
                </span>
                <div className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-transform duration-200 ${expandedDetails['step1'] ? 'rotate-180 text-emerald-400' : ''}`}>
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* EXPANSÃO AO CLICAR NO BALÃO */}
            <AnimatePresence>
              {expandedDetails['step1'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                  onClick={(e) => e.stopPropagation()} // Permite interagir com os detalhes sem fechar acidentalmente
                >
                  <div className="pt-5 mt-4 border-t border-slate-700/80 space-y-4">
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Para ser elegível à Terapia Hormonal, a paciente deve apresentar pelo menos uma das seguintes indicações clínicas formais e estar preferencialmente dentro da janela de oportunidade:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      
                      {/* Indicação 1: Fogachos / Vasomotores */}
                      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/60 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-amber-900/50 text-amber-300 shrink-0 mt-0.5">
                          <Flame size={18} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-amber-200">1. Fogachos e Sudorese Noturna</h4>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            Sintomas vasomotores moderados a graves com impacto negativo no sono, humor e qualidade de vida.
                          </p>
                        </div>
                      </div>

                      {/* Indicação 2: SGUM */}
                      <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/60 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-cyan-900/50 text-cyan-300 shrink-0 mt-0.5">
                          <Droplet size={18} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-cyan-200">2. Síndrome Geniturinária (SGUM)</h4>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            Secura vaginal, dispareunia e disúria/urgência. <em>(Se queixa exclusivamente isolada, preferir terapia tópica vaginal local).</em>
                          </p>
                        </div>
                      </div>

                      {/* Indicação 3: Perda Óssea */}
                      <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/60 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-indigo-900/50 text-indigo-300 shrink-0 mt-0.5">
                          <Bone size={18} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-indigo-200">3. Prevenção de Perda Óssea / Osteoporose</h4>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            Prevenção de perda de densidade mineral óssea e fraturas em mulheres na pós-menopausa com fatores de risco.
                          </p>
                        </div>
                      </div>

                      {/* Indicação 4: IOP / Menopausa Precoce */}
                      <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/60 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-purple-900/50 text-purple-300 shrink-0 mt-0.5">
                          <Clock size={18} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-purple-200">4. IOP (&lt; 40 anos) ou Precoce (40–44 anos)</h4>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            Reposição hormonal indicada para proteção óssea, cardiovascular e cognitiva até a idade habitual de menopausa (~50 anos).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Janela de Oportunidade Terapêutica */}
                    <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-emerald-900/50 text-emerald-300 shrink-0 mt-0.5">
                        <CheckCircle2 size={18} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-bold text-emerald-200">Janela Terapêutica Favorável:</h4>
                          <span className="text-[10px] font-black bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
                            &lt; 60 anos de idade OU &lt; 10 anos de menopausa
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          Momento ideal em que a relação benefício/risco é máxima para o tratamento hormonal sistêmico.
                        </p>
                      </div>
                    </div>

                    {/* Alerta de Não Indicação */}
                    <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-900/50 flex items-center gap-2 text-[11px] text-rose-300 font-medium">
                      <AlertTriangle size={14} className="shrink-0 text-rose-400" />
                      <span><strong>Atenção:</strong> Não iniciar TH apenas para prevenção primária isolada de doença cardiovascular ou demência!</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOTÕES DE DECISÃO DESCENDENTE DO PASSO 1 */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
              <span className="text-xs font-semibold text-slate-400 mr-auto">A paciente preenche os critérios?</span>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasIndication(false);
                  onSelectOption?.('step1', 'nao');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  hasIndication === false
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40 ring-2 ring-rose-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-rose-950/60 hover:text-rose-200 border border-slate-700 hover:border-rose-800'
                }`}
              >
                NÃO (Sem indicação)
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasIndication(true);
                  onSelectOption?.('step1', 'sim');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  hasIndication === true
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400'
                    : 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-800/60 hover:text-white border border-emerald-700/80'
                }`}
              >
                SIM (Tem indicação) ⬇
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RAMIFICAÇÃO PASSO 1: SE "NÃO" -> ORIENTAÇÃO / NÃO HORMONAL */}
        {/* ============================================================ */}
        {hasIndication === false && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            {/* Linha vertical conectora */}
            <div className="w-0.5 h-6 bg-rose-600/80 my-1 flex items-center justify-center">
              <ArrowDown size={14} className="text-rose-400 mt-6" />
            </div>

            <div className="w-full mt-4 bg-slate-900/95 border-2 border-rose-800/80 p-5 rounded-3xl shadow-xl text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-rose-950 text-rose-400 border border-rose-700 flex items-center justify-center mx-auto">
                <AlertTriangle size={20} />
              </div>
              <h4 className="text-base font-bold text-white">Não há indicação de Terapia Hormonal Sistêmica</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Manter foco em estilo de vida saudável (atividade física, dieta cardioprotetora, cessação do tabagismo) e rastreamentos preventivos por idade (mamografia, preventivo, lipidograma, densitometria óssea).
              </p>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* PASSO 2: SE TEM INDICAÇÃO -> "ELA TEM ÚTERO?" */}
        {/* ============================================================ */}
        {hasIndication === true && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl flex flex-col items-center"
          >
            {/* Linha vertical conectora de fluxo */}
            <div className="w-0.5 h-8 bg-emerald-500 my-1 flex items-center justify-center">
              <ArrowDown size={16} className="text-emerald-400 mt-8" />
            </div>

            {/* BALÃO PASSO 2 */}
            <div className="w-full mt-4">
              <div 
                id="th-step-2-balloon"
                onClick={() => toggleDetails('step2')}
                className={`cursor-pointer transition-all duration-200 rounded-3xl p-5 sm:p-6 border-2 shadow-xl backdrop-blur-md select-none ${
                  expandedDetails['step2'] 
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30' 
                    : 'bg-slate-900/95 border-indigo-600/80 hover:border-indigo-400 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-black text-lg shrink-0">
                      2
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Proteção Endometrial</span>
                      <h3 className="text-base sm:text-lg font-black text-white">
                        Ela tem útero?
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-indigo-300/80 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/50">
                      {expandedDetails['step2'] ? 'Ocultar por quê' : 'Por que isso importa?'}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-transform duration-200 ${expandedDetails['step2'] ? 'rotate-180 text-indigo-400' : ''}`}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* EXPANSÃO DO PASSO 2 */}
                <AnimatePresence>
                  {expandedDetails['step2'] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="pt-5 mt-4 border-t border-slate-700/80 space-y-3">
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          A presença ou ausência do útero é o fator determinante para a inclusão do <strong>progestagênio</strong> no esquema terapêutico:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/60 space-y-1.5">
                            <h4 className="text-xs font-bold text-purple-200 flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-purple-400" /> Sem Útero (Histerectomizada)
                            </h4>
                            <p className="text-[11px] text-slate-300 leading-snug">
                              Não há risco de hiperplasia ou câncer de endométrio. A terapia deve ser feita com <strong>estrogênio isolado</strong>, sem necessidade de progestagênio associado.
                            </p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/60 space-y-1.5">
                            <h4 className="text-xs font-bold text-indigo-200 flex items-center gap-2">
                              <ShieldAlert size={14} className="text-indigo-400" /> Com Útero Presente
                            </h4>
                            <p className="text-[11px] text-slate-300 leading-snug">
                              O estrogênio isolado sem oposição causa proliferação endometrial e risco de câncer de endométrio. É <strong>obrigatório associar progesterona/progestagênio</strong> para proteção endometrial.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOTÕES DE DECISÃO DO PASSO 2 */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
                  <span className="text-xs font-semibold text-slate-400 mr-auto">Situação uterina da paciente:</span>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHasUterus(false);
                      onSelectOption?.('step2', 'nao');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      hasUterus === false
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 ring-2 ring-purple-400'
                        : 'bg-slate-800 text-slate-300 hover:bg-purple-950/60 hover:text-purple-200 border border-slate-700 hover:border-purple-800'
                    }`}
                  >
                    NÃO (Histerectomizada)
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHasUterus(true);
                      onSelectOption?.('step2', 'sim');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      hasUterus === true
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 ring-2 ring-indigo-400'
                        : 'bg-indigo-950/80 text-indigo-300 hover:bg-indigo-800/60 hover:text-white border border-indigo-700/80'
                    }`}
                  >
                    SIM (Com útero) ⬇
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RAMIFICAÇÃO PASSO 2: SE "NÃO" (SEM ÚTERO) -> CONDUTA FINAL */}
            {/* ============================================================ */}
            {hasUterus === false && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl flex flex-col items-center mt-2"
              >
                {/* Linha vertical conectora */}
                <div className="w-0.5 h-6 bg-purple-500 my-1 flex items-center justify-center">
                  <ArrowDown size={14} className="text-purple-400 mt-6" />
                </div>

                <div className="w-full mt-4 bg-slate-900/95 border-2 border-purple-600/80 p-6 rounded-3xl shadow-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-950 text-purple-300 border border-purple-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                        Conduta Estabelecida
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-white">
                        Terapia com Estrogênio Isolado
                      </h4>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 leading-relaxed space-y-2">
                    <p>
                      ✨ <strong>Prescrição:</strong> Indicada a terapia com <strong>Estrogênio Sistêmico Isolado</strong> (via oral ou transdérmica, conforme perfil de risco clínico da paciente).
                    </p>
                    <p className="text-slate-300">
                      🛡️ <strong>Regra de Ouro:</strong> Paciente sem útero <strong>NÃO precisa fazer progesterona associada</strong>, pois não há endométrio para ser protegido.
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 flex items-center gap-2">
                    <Info size={14} className="shrink-0 text-slate-400" />
                    <span><em>Exceção rara:</em> Histórico de endometriose residual grave pós-cirúrgica, onde pequena oposição pode ser considerada por especialista.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* PASSO 3: AFIRMAÇÃO + PERGUNTA DE CONTRAINDICAÇÕES */}
            {/* ============================================================ */}
            {hasUterus === true && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl flex flex-col items-center mt-2"
              >
                {/* Linha vertical conectora */}
                <div className="w-0.5 h-8 bg-indigo-500 my-1 flex items-center justify-center">
                  <ArrowDown size={16} className="text-indigo-400 mt-8" />
                </div>

                {/* AFIRMAÇÃO DE REGIME COMBINADO */}
                <div className="w-full mt-4 p-4 rounded-2xl bg-indigo-950/80 border border-indigo-700/80 shadow-lg text-center space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-900/90 px-2.5 py-0.5 rounded-full border border-indigo-600">
                    Definição de Regime
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    Ela precisa fazer terapia combinada (estrogênio + progesterona)
                  </h4>
                  <p className="text-xs text-indigo-200">
                    O progestagênio é mandatório para proteção endometrial contra hiperplasia e adenocarcinoma.
                  </p>
                </div>

                {/* Linha vertical conectora curta */}
                <div className="w-0.5 h-6 bg-amber-500/80 my-2 flex items-center justify-center">
                  <ArrowDown size={14} className="text-amber-400 mt-6" />
                </div>

                {/* BALÃO PASSO 3: ELA TEM ALGUMA CONTRAINDICAÇÃO? */}
                <div className="w-full">
                  <div 
                    id="th-step-3-balloon"
                    onClick={() => toggleDetails('step3')}
                    className={`cursor-pointer transition-all duration-200 rounded-3xl p-5 sm:p-6 border-2 shadow-xl backdrop-blur-md select-none ${
                      expandedDetails['step3'] 
                        ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/30' 
                        : 'bg-slate-900/95 border-amber-600/80 hover:border-amber-400 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black text-lg shrink-0">
                          3
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Segurança Terapêutica</span>
                          <h3 className="text-base sm:text-lg font-black text-white">
                            Ela tem alguma contraindicação?
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline-block text-[11px] font-semibold text-amber-300/80 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/50">
                          {expandedDetails['step3'] ? 'Ocultar quadro' : 'Ver todas as contraindicações'}
                        </span>
                        <div className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-transform duration-200 ${expandedDetails['step3'] ? 'rotate-180 text-amber-400' : ''}`}>
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>

                    {/* QUADRO COMPLETO DE CONTRAINDICAÇÕES (EXPANSÃO) */}
                    <AnimatePresence>
                      {expandedDetails['step3'] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="pt-5 mt-4 border-t border-slate-700/80 space-y-4">
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              Avalie criteriosamente o histórico pessoal, vascular, oncológico e fatores de risco antes de prescrever a Terapia Hormonal Sistêmica:
                            </p>

                            {/* 1. CONTRAINDICAÇÕES ABSOLUTAS */}
                            <div className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-800/80 space-y-2.5">
                              <div className="flex items-center gap-2">
                                <ShieldAlert size={18} className="text-rose-400 shrink-0" />
                                <h4 className="text-xs sm:text-sm font-black text-rose-200">
                                  Contraindicações Absolutas (Evitar Terapia Sistêmica)
                                </h4>
                              </div>
                              <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-5 leading-relaxed">
                                <li><strong>Sangramento uterino de causa não esclarecida</strong> (exige investigação endometrial imediata)</li>
                                <li><strong>Câncer de mama atual ou história prévia</strong></li>
                                <li><strong>Neoplasia estrogênio-dependente conhecida ou suspeita</strong> (inclui câncer de endométrio e lesões precursoras ativas)</li>
                                <li><strong>TEV atual ou história pessoal de TVP / TEP</strong></li>
                                <li><strong>Trombofilia hereditária ou adquirida conhecida</strong> (Fator V Leiden, mutação da protrombina G20210A, deficiência de proteína C, proteína S ou antitrombina, SAF)</li>
                                <li><strong>Doença arterial ativa ou prévia</strong> (IAM recente, AVC, AIT, doença coronariana/DAC estabelecida)</li>
                                <li><strong>Doença hepática ativa grave ou descompensada</strong> (até normalização comprovada das provas de função hepática)</li>
                                <li><strong>Porfiria cutânea tardia</strong></li>
                                <li><strong>Gravidez confirmada ou suspeita</strong></li>
                              </ul>
                            </div>

                            {/* 2. CONTRAINDICAÇÕES RELATIVAS */}
                            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-700/70 space-y-2">
                              <div className="flex items-center gap-2">
                                <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                                <h4 className="text-xs sm:text-sm font-bold text-amber-200">
                                  Contraindicações Relativas / Cautela Clínica
                                </h4>
                              </div>
                              <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-5 leading-relaxed">
                                <li><strong>Hipertrigliceridemia importante</strong> (risco de pancreatite; se indicada, preferir via transdérmica)</li>
                                <li><strong>Colelitíase sintomática</strong> (estrogênio oral aumenta litogênese biliar)</li>
                                <li><strong>Enxaqueca com aura</strong> (risco vascular aumentado; preferir via transdérmica em baixas doses)</li>
                                <li><strong>Hipertensão Arterial Sistêmica não controlada</strong></li>
                                <li><strong>Tabagismo pesado</strong>, principalmente associado à idade mais avançada (&gt; 50 anos)</li>
                                <li><strong>Obesidade grave (IMC ≥ 35)</strong> (dar preferência absoluta à via transdérmica)</li>
                                <li><strong>Miomas volumosos ou endometriose</strong> (risco potencial de reativação ou crescimento estrogênio-dependente)</li>
                              </ul>
                            </div>

                            {/* 3. SITUAÇÕES QUE EXIGEM INVESTIGAÇÃO ANTES DE DECIDIR */}
                            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/70 space-y-2">
                              <div className="flex items-center gap-2">
                                <Info size={16} className="text-cyan-400 shrink-0" />
                                <h4 className="text-xs sm:text-sm font-bold text-cyan-200">
                                  Situações que Exigem Investigação Prévia
                                </h4>
                              </div>
                              <ul className="text-xs text-slate-200 space-y-2 list-disc pl-5 leading-relaxed">
                                <li>
                                  <strong>História pessoal de TEV provocado com fator de risco já resolvido:</strong> Reavaliar caso a caso individualizado com hematologista/vascular; se indicada, preferência estrita por via transdérmica em menor dose.
                                </li>
                                <li>
                                  <strong>História familiar de TEV não provocado em parente de 1º grau &lt; 50 anos (ou múltiplos parentes):</strong> Rastrear trombofilias hereditárias antes de iniciar. Rastreio negativo libera a TH normalmente; rastreio positivo enquadra-se em contraindicação absoluta.
                                </li>
                              </ul>
                            </div>

                            {/* 4. NÃO SÃO CONTRAINDICAÇÕES AUTOMÁTICAS */}
                            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                <h4 className="text-xs sm:text-sm font-bold text-emerald-200">
                                  NÃO São Contraindicações Automáticas
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                                  • <strong>HAS controlada:</strong> Elegível (preferir via transdérmica)
                                </div>
                                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                                  • <strong>Diabetes controlado:</strong> Elegível (preferir transdérmica)
                                </div>
                                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                                  • <strong>Obesidade:</strong> Elegível (via transdérmica preferível)
                                </div>
                                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                                  • <strong>História familiar isolada de CA de mama em idade tardia:</strong> Elegível
                                </div>
                                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 sm:col-span-2">
                                  • <strong>Miomas uterinos assintomáticos pequenos:</strong> Elegível com seguimento clínico
                                </div>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* BOTÕES DE DECISÃO DO PASSO 3 */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
                      <span className="text-xs font-semibold text-slate-400 mr-auto">Resultado da avaliação de contraindicações:</span>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHasContraindication(true);
                          onSelectOption?.('step3', 'sim');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          hasContraindication === true
                            ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40 ring-2 ring-rose-400'
                            : 'bg-slate-800 text-slate-300 hover:bg-rose-950/60 hover:text-rose-200 border border-slate-700 hover:border-rose-800'
                        }`}
                      >
                        SIM (Tem contraindicação)
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHasContraindication(false);
                          onSelectOption?.('step3', 'nao');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          hasContraindication === false
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400'
                            : 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-800/60 hover:text-white border border-emerald-700/80'
                        }`}
                      >
                        NÃO (Sem contraindicação) ⬇
                      </button>
                    </div>
                  </div>
                </div>

                {/* ============================================================ */}
                {/* RAMIFICAÇÃO PASSO 3: SE "SIM" (TEM CONTRAINDICAÇÃO) */}
                {/* ============================================================ */}
                {hasContraindication === true && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-xl flex flex-col items-center mt-2"
                  >
                    {/* Linha vertical conectora */}
                    <div className="w-0.5 h-6 bg-rose-500 my-1 flex items-center justify-center">
                      <ArrowDown size={14} className="text-rose-400 mt-6" />
                    </div>

                    <div className="w-full mt-4 bg-slate-900/95 border-2 border-rose-600/80 p-6 rounded-3xl shadow-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-rose-950 text-rose-300 border border-rose-700 flex items-center justify-center shrink-0">
                          <ShieldAlert size={22} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                            Conduta Segura
                          </span>
                          <h4 className="text-base sm:text-lg font-black text-white">
                            TH Sistêmica Contraindicada • Opções Não Hormonais
                          </h4>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/50 text-xs text-slate-200 leading-relaxed space-y-2">
                        <p>
                          🚫 <strong>Evitar Terapia Hormonal Sistêmica.</strong> Direcionar o tratamento conforme o sintoma dominante:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-slate-300">
                          <li><strong>Para Fogachos:</strong> ISRS/IRSN (Venlafaxina, Desvenlafaxina, Escitalopram), Gabapentina, Fezolinetante (antagonista NK3) ou Terapia Cognitivo-Comportamental (TCC).</li>
                          <li><strong>Para SGUM / Secura Vaginal:</strong> Hidratantes e lubrificantes não hormonais de primeira linha; estrogênio vaginal em ultrabaixa dose pode ser discutido com especialista conforme a contraindicação.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ============================================================ */}
                {/* RAMIFICAÇÃO PASSO 3: SE "NÃO" (SEM CONTRAINDICAÇÃO) -> AVALIAÇÃO DE COMORBIDADES + PASSO 4 */}
                {/* ============================================================ */}
                {hasContraindication === false && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl flex flex-col items-center mt-2"
                  >
                    {/* Linha vertical conectora */}
                    <div className="w-0.5 h-8 bg-emerald-500 my-1 flex items-center justify-center">
                      <ArrowDown size={16} className="text-emerald-400 mt-8" />
                    </div>

                    {/* QUADRO INTERMEDIÁRIO DE AFIRMAÇÃO: AVALIAR COMORBIDADES E CONTROLE DE DOENÇAS CRÔNICAS */}
                    <div className="w-full mt-4 p-5 rounded-3xl bg-slate-900/95 border-2 border-emerald-600/80 shadow-xl space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center justify-center shrink-0">
                          <Activity size={22} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                            Avaliação Clínica Pré-Prescrição
                          </span>
                          <h4 className="text-sm sm:text-base font-black text-white">
                            Avaliar Comorbidades e Controle de Doenças Crônicas
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        Na ausência de contraindicações absolutas, a presença de doenças crônicas <strong>NÃO impede a Terapia Hormonal</strong> se estiverem controladas, mas é o elemento chave que <strong>determina a escolha da via de administração</strong>:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                          <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                            <HeartPulse size={14} /> Hipertensão Arterial (HAS)
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Se controlada: Elegível à TH. Dar <strong>preferência à via transdérmica</strong> (não altera a pressão arterial nem estimula o SRAA hepático).
                          </p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                          <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                            <Activity size={14} /> Diabetes Mellitus (DM2) / Resistência
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Se compensado: Elegível à TH. Preferência absoluta por <strong>via transdérmica</strong> (neutra sobre a sensibilidade insulínica).
                          </p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                          <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                            <Info size={14} /> Obesidade (IMC ≥ 30)
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Risco pró-trombótico de base aumentado. Indicação formal de <strong>via transdérmica</strong> (não eleva risco de TEV).
                          </p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                          <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                            <Info size={14} /> Dislipidemia / Triglicerídeos
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Se TG elevados: <strong>Evitar via oral</strong> (aumenta TG e litogênese biliar); a via transdérmica é neutra/segura.
                          </p>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 sm:col-span-2 space-y-1">
                          <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                            <Info size={14} /> Miomas Assintomáticos / Enxaqueca / Tabagismo Leve
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Miomas estáveis não contraindicam (monitorar); enxaqueca e tabagismo leve exigem <strong>via transdérmica</strong> em menores doses.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Linha vertical conectora */}
                    <div className="w-0.5 h-8 bg-cyan-500 my-1 flex items-center justify-center">
                      <ArrowDown size={16} className="text-cyan-400 mt-8" />
                    </div>

                    {/* ============================================================ */}
                    {/* BALÃO PASSO 4: QUAL VIA ESCOLHER? */}
                    {/* ============================================================ */}
                    <div className="w-full mt-4">
                      <div 
                        id="th-step-4-balloon"
                        onClick={() => toggleDetails('step4')}
                        className={`cursor-pointer transition-all duration-200 rounded-3xl p-5 sm:p-6 border-2 shadow-xl backdrop-blur-md select-none ${
                          expandedDetails['step4'] 
                            ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/30' 
                            : 'bg-slate-900/95 border-cyan-600/80 hover:border-cyan-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-black text-lg shrink-0">
                              4
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Seleção da Rota Terapêutica</span>
                              <h3 className="text-base sm:text-lg font-black text-white">
                                Qual via escolher?
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="hidden sm:inline-block text-[11px] font-semibold text-cyan-300/80 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/50">
                              {expandedDetails['step4'] ? 'Ocultar comparação' : 'Comparar Vias & Indicações'}
                            </span>
                            <div className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 transition-transform duration-200 ${expandedDetails['step4'] ? 'rotate-180 text-cyan-400' : ''}`}>
                              <ChevronDown size={18} />
                            </div>
                          </div>
                        </div>

                        {/* QUADRO DETALHADO DAS VIAS DE ADMINISTRAÇÃO (EXPANSÃO) */}
                        <AnimatePresence>
                          {expandedDetails['step4'] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="pt-5 mt-4 border-t border-slate-700/80 space-y-4">
                                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                  A via de administração do estrogênio deve ser escolhida de forma individualizada com base no perfil de risco metabólico, vascular e nas queixas da paciente:
                                </p>

                                <div className="space-y-3">
                                  
                                  {/* 1. VIA TRANSDÉRMICA */}
                                  <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-700/80 space-y-2">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                      <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                                        <h4 className="text-xs sm:text-sm font-black text-emerald-200">
                                          1. Via Transdérmica (Gel ou Adesivo/Patch de 17β-Estradiol)
                                        </h4>
                                      </div>
                                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
                                        Menor Risco Hepático e Trombótico
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-200 leading-relaxed">
                                      • <strong>Características:</strong> Absorção percutânea direta, sem primeira passagem pelo fígado. Não estimula a síntese hepática de fatores de coagulação nem proteína C reativa (PCR).
                                    </p>
                                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-800/60 text-[11px] text-emerald-200">
                                      <strong>Quando é a PRIMEIRA ESCOLHA:</strong> Mulheres com Hipertensão controlada, Obesidade (IMC ≥ 30), Diabetes Mellitus, Dislipidemia/Hipertrigliceridemia, Tabagismo leve, Enxaqueca, Doença biliar/colelitíase ou risco trombótico moderado.
                                    </div>
                                  </div>

                                  {/* 2. VIA ORAL */}
                                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-700/80 space-y-2">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                      <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                                        <h4 className="text-xs sm:text-sm font-black text-indigo-200">
                                          2. Via Oral (Comprimidos de 17β-Estradiol ou Valerato)
                                        </h4>
                                      </div>
                                      <span className="text-[10px] font-bold text-indigo-300 bg-indigo-900/80 px-2 py-0.5 rounded border border-indigo-700">
                                        Prática e Conveniente
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-200 leading-relaxed">
                                      • <strong>Características:</strong> Sofre efeito de primeira passagem hepática. Proporciona discreta elevação benéfica do HDL e redução do LDL, mas pode aumentar triglicerídeos e fatores pró-trombóticos.
                                    </p>
                                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-800/60 text-[11px] text-indigo-200">
                                      <strong>Quando considerar:</strong> Mulheres jovens, hígidas, sem fatores de risco cardiometabólicos, sem dislipidemia importante e sem histórico de enxaqueca ou trombose.
                                    </div>
                                  </div>

                                  {/* 3. VIA VAGINAL / LOCAL */}
                                  <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-700/80 space-y-2">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                      <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                                        <h4 className="text-xs sm:text-sm font-black text-cyan-200">
                                          3. Via Vaginal / Tópica Local (Creme, Óvulo ou Anel)
                                        </h4>
                                      </div>
                                      <span className="text-[10px] font-bold text-cyan-300 bg-cyan-900/80 px-2 py-0.5 rounded border border-cyan-700">
                                        Ação Estritamente Local
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-200 leading-relaxed">
                                      • <strong>Características:</strong> Absorção sistêmica insignificante em doses usuais. Restaura o trofismo do epitélio vaginal e urogenital.
                                    </p>
                                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-800/60 text-[11px] text-cyan-200">
                                      <strong>Primeira escolha:</strong> Quando a queixa for <strong>exclusivamente a Síndrome Geniturinária da Menopausa (SGUM)</strong>. Geralmente NÃO necessita de progesterona para proteção endometrial.
                                    </div>
                                  </div>

                                </div>

                                {/* REGRA DE OURO */}
                                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                                  <Sparkles size={14} className="text-emerald-400 shrink-0" />
                                  <span><strong>Regra de Ouro:</strong> Preferir 17β-estradiol bioidêntico e utilizar a <strong>menor dose efetiva</strong> com reavaliação clínica periódica.</span>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* BOTÕES DE SELEÇÃO DA VIA NO PASSO 4 */}
                        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-end gap-2.5">
                          <span className="text-xs font-semibold text-slate-400 mr-auto">Selecione a via para ver detalhes completos:</span>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoute('transdermica');
                              onSelectOption?.('step4', 'transdermica');
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                              selectedRoute === 'transdermica'
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400'
                                : 'bg-slate-800 text-slate-300 hover:bg-emerald-950/60 hover:text-emerald-200 border border-slate-700 hover:border-emerald-800 hover:scale-[1.02]'
                            }`}
                          >
                            🌿 Adesivo Transdérmico (Evra / Gel)
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoute('oral');
                              onSelectOption?.('step4', 'oral');
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                              selectedRoute === 'oral'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 ring-2 ring-indigo-400'
                                : 'bg-slate-800 text-slate-300 hover:bg-indigo-950/60 hover:text-indigo-200 border border-slate-700 hover:border-indigo-800 hover:scale-[1.02]'
                            }`}
                          >
                            💊 Via Oral (Pílula / Comprimidos)
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoute('vaginal');
                              onSelectOption?.('step4', 'vaginal');
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                              selectedRoute === 'vaginal'
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 ring-2 ring-cyan-400'
                                : 'bg-slate-800 text-slate-300 hover:bg-cyan-950/60 hover:text-cyan-200 border border-slate-700 hover:border-cyan-800 hover:scale-[1.02]'
                            }`}
                          >
                            💧 Anel Vaginal (NuvaRing / Tópico)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ============================================================ */}
                    {/* RAMIFICAÇÃO PASSO 4: SELEÇÃO DA VIA -> DETALHAMENTO EXCLUSIVO */}
                    {/* ============================================================ */}
                    {selectedRoute && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl flex flex-col items-center mt-2 space-y-4"
                      >
                        {/* Linha vertical conectora */}
                        <div className="w-0.5 h-6 bg-cyan-500 my-1 flex items-center justify-center">
                          <ArrowDown size={14} className="text-cyan-400 mt-6" />
                        </div>

                        {/* CARD COMPLETO DA ROTA SELECIONADA */}
                        <div className="w-full p-5 sm:p-6 rounded-3xl bg-slate-900/95 border-2 border-cyan-600/80 shadow-2xl space-y-5">
                          
                          {/* Cabeçalho do Card */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                                selectedRoute === 'transdermica' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                                selectedRoute === 'oral' ? 'bg-indigo-950 text-indigo-300 border-indigo-700' :
                                'bg-cyan-950 text-cyan-300 border-cyan-700'
                              }`}>
                                {selectedRoute === 'transdermica' && <Layers size={24} />}
                                {selectedRoute === 'oral' && <Pill size={24} />}
                                {selectedRoute === 'vaginal' && <Droplet size={24} />}
                              </div>
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-950/90 px-2.5 py-0.5 rounded-full border border-cyan-700">
                                  Análise Completa da Rota Clínica
                                </span>
                                <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                                  {selectedRoute === 'transdermica' && 'Adesivo Transdérmico / Via Transdérmica'}
                                  {selectedRoute === 'oral' && 'Via Oral (Pílula / Comprimidos)'}
                                  {selectedRoute === 'vaginal' && 'Anel Vaginal / Via Tópica Vaginal'}
                                </h4>
                              </div>
                            </div>

                            <span className="text-xs font-bold text-slate-400 hidden sm:inline-block">
                              FEBRASGO • ASRM • US MEC/CDC 2024
                            </span>
                          </div>

                          {/* ============================================================ */}
                          {/* SEÇÃO 1: ADESIVO TRANSDÉRMICO */}
                          {/* ============================================================ */}
                          {selectedRoute === 'transdermica' && (
                            <div className="space-y-4 text-xs">
                              
                              {/* 1. Farmacocinética e Exposição Hormonal */}
                              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/70 space-y-2">
                                <h5 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                                  <Activity size={16} /> 1. Farmacocinética & Exposição Hormonal
                                </h5>
                                <ul className="space-y-1.5 text-slate-200 pl-4 list-disc">
                                  <li><strong>Absorção:</strong> Transcutânea contínua. Evita o trato gastrointestinal, mas o etinilestradiol (EE) ainda atinge o fígado por via sistêmica após ser absorvido pela pele.</li>
                                  <li><strong>Padrão Sérico:</strong> Liberação constante com picos mais baixos e níveis séricos estáveis.</li>
                                  <li><strong>Exposição Total:</strong> Pico estrogênico 25% a 35% menor que produtos orais com 30 a 35 mcg de EE, <strong>mas exposição total (AUC) ao longo do tempo cerca de 60% MAIOR</strong> que um produto oral com 35 mcg de EE.</li>
                                </ul>
                              </div>

                              {/* 2. Risco de TEV e Pegadinha de Prova */}
                              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/70 space-y-2">
                                <h5 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                                  <ShieldAlert size={16} /> 2. Risco de Tromboembolismo Venoso (TEV) — Nível de Evidência B
                                </h5>
                                <div className="space-y-2 text-slate-200 leading-relaxed">
                                  <p>
                                    ⚠️ <strong>Pegadinha Clássica de Prova:</strong> A ideia de que <em>"via não oral evita passagem hepática e por isso tem menor risco cardiovascular/trombótico"</em> é <strong>VERDADEIRA para o 17β-estradiol da TH da menopausa</strong> (RR 1,0 transdérmico vs 1,9 oral), mas <strong>NÃO SE CONFIRMA para o etinilestradiol dos contraceptivos combinados!</strong>
                                  </p>
                                  <p>
                                    • <strong>Diretriz ASRM & CDC:</strong> Apesar de sugerir benefício com estradiol na menopausa, isso <em>não foi observado</em> com preparações contraceptivas não orais com EE, havendo relatos de risco aumentado.
                                  </p>
                                  <p>
                                    • <strong>Estudos de TEV:</strong> Estudos antigos (Jick) mostraram equivalência (RR 1,1 com norgestimato). Banco de dados recente (ASH 2024) apontou <strong>RR ajustado de 7,9 em relação a não usuárias e 2,5 em relação ao oral com levonorgestrel</strong> (incidência de TEV de 9,7 por 10.000 mulheres-ano).
                                  </p>
                                  <p>
                                    • <strong>Elegibilidade Clínica (US MEC/CDC & FEBRASGO):</strong> O adesivo tem as <strong>mesmas categorias de contraindicação que os orais combinados</strong>. Não existe uma via "mais segura" que justifique trocar de via por risco vascular isolado.
                                  </p>
                                </div>
                              </div>

                              {/* 3. Eficácia e Adesão */}
                              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <h5 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                                  <CheckCircle2 size={16} /> 3. Eficácia, Adesão & Periodicidade Detalhada
                                </h5>
                                <ul className="space-y-1.5 text-slate-200 pl-4 list-disc">
                                  <li><strong>Periodicidade do Adesivo:</strong> Ciclo de 28 dias — <strong>3 trocas semanais consecutivas + 1 semana sem adesivo</strong> (pausa com sangramento de escape).</li>
                                  <li><strong>Adesão:</strong> Reduz a dependência da memória diária, sendo excelente para quem tem dificuldade de adesão com comprimidos.</li>
                                  <li><strong>Limitações:</strong> <strong>Menor eficácia relatada em mulheres com peso acima de 90 kg</strong> e possibilidade de descolamento acidental da pele.</li>
                                </ul>
                              </div>

                              {/* 4. Aspectos Regulatórios e Modelo de Receita */}
                              <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-600/80 space-y-3 font-mono">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-emerald-300 font-sans flex items-center gap-1.5">
                                    <FileText size={14} /> Modelo de Receituário Oficial (Adesivo Transdérmico)
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-sans bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    Tarja Vermelha • Validade até 6 meses
                                  </span>
                                </div>
                                
                                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-800/80 text-emerald-200 space-y-2 text-[11px] leading-relaxed">
                                  <p className="font-bold text-white font-sans text-xs">
                                    Norelgestromina 6mg + Etinilestradiol 0,6mg, adesivo transdérmico (Evra, Gedeon Richter), caixa com 3 unidades
                                  </p>
                                  <p className="text-slate-300">Quantidade: 3 caixas</p>
                                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-sans">
                                    <strong>Posologia & Modo de Uso:</strong> Aplicar 1 adesivo sobre pele limpa, seca e íntegra, em abdome, região glútea, face externa do braço ou parte superior do tronco, <strong>evitando mamas</strong>. Trocar 1 vez por semana, sempre no mesmo dia, por 3 semanas consecutivas, seguido de 1 semana sem adesivo.
                                  </div>
                                </div>
                              </div>

                              {/* 5. Orientações Mandatórias na Receita/Consulta */}
                              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <Info size={14} className="text-amber-400" /> O que mais vale constar na receita ou orientação escrita:
                                </div>
                                <p>• <strong>Dia de início:</strong> Se começar depois do 1º dia do ciclo, orientar método de barreira complementar (preservativo) por 7 dias.</p>
                                <p>• <strong>Conduta em esquecimento/atraso:</strong> No adesivo a tolerância a atrasos na troca é maior do que na pílula oral (até 48h de margem de segurança).</p>
                                <p>• <strong>Ausência de proteção contra IST:</strong> Vale reforçar por escrito na consulta que não protege contra infecções sexualmente transmissíveis.</p>
                              </div>
                            </div>
                          )}

                          {/* ============================================================ */}
                          {/* SEÇÃO 2: VIA ORAL */}
                          {/* ============================================================ */}
                          {selectedRoute === 'oral' && (
                            <div className="space-y-4 text-xs">
                              
                              {/* 1. Farmacocinética e Exposição Hormonal */}
                              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/70 space-y-2">
                                <h5 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
                                  <Activity size={16} /> 1. Farmacocinética & Exposição Hormonal
                                </h5>
                                <ul className="space-y-1.5 text-slate-200 pl-4 list-disc">
                                  <li><strong>Absorção:</strong> Trato gastrointestinal, com metabolismo intenso de primeira passagem hepática.</li>
                                  <li><strong>Padrão Sérico:</strong> Picos e vales acentuados a cada dose diária.</li>
                                  <li><strong>Exposição Total:</strong> Padrão de referência para comparação com outras vias.</li>
                                </ul>
                              </div>

                              {/* 2. Risco de TEV e Segurança Clínica */}
                              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/70 space-y-2">
                                <h5 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                                  <ShieldAlert size={16} /> 2. Risco de Tromboembolismo Venoso (TEV) — Nível de Evidência B
                                </h5>
                                <div className="space-y-2 text-slate-200 leading-relaxed">
                                  <p>
                                    • <strong>Padrão de Risco:</strong> O risco de TEV em usuárias de contraceptivo oral combinado com Levonorgestrel é o padrão de referência mais baixo entre os combinados (cerca de 5 a 7 por 10.000 mulheres-ano).
                                  </p>
                                  <p>
                                    • <strong>Equivalência de Contraindicação:</strong> Segundo o CDC (US MEC 2024) e FEBRASGO, tabagismo ≥ 35 anos, enxaqueca com aura, HAS grave ou TEV prévio são contraindicações absolutas comuns a todas as vias combinadas com EE.
                                  </p>
                                </div>
                              </div>

                              {/* 3. Eficácia, Adesão e Periodicidade Detalhada */}
                              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <h5 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
                                  <CheckCircle2 size={16} /> 3. Periodicidade Detalhada & Esquemas Posológicos
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                    <span className="font-bold text-indigo-300">Oral 21+7:</span>
                                    <p className="text-slate-300">21 dias de uso + 7 de pausa. Sangramento de escape ocorre no intervalo da pausa.</p>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                    <span className="font-bold text-indigo-300">Oral 24+4 (ex: Yaz / Elani 28):</span>
                                    <p className="text-slate-300">24 ativos + 4 de placebo. Pausa hormonal mais curta, menos sintomas de privação.</p>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                                    <span className="font-bold text-indigo-300">Oral 28 contínuo:</span>
                                    <p className="text-slate-300">Sem pausa real. Placebo substitui os dias sem hormônio; facilita adesão diária.</p>
                                  </div>
                                </div>
                                <p className="text-[11px] text-amber-200 mt-2">
                                  ⚠️ <strong>Atenção de Prescrição:</strong> Sempre confira a bula do produto específico e escreva o esquema exato dele, nunca um esquema genérico de COC (ex: escrever "pausa de 7 dias" para um 24+4 fará a paciente tomar errado).
                                </p>
                              </div>

                              {/* 4. Aspectos Regulatórios e Modelo de Receita */}
                              <div className="p-4 rounded-2xl bg-indigo-950/40 border-2 border-indigo-600/80 space-y-3 font-mono">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-indigo-300 font-sans flex items-center gap-1.5">
                                    <FileText size={14} /> Modelo de Receituário Oficial (Via Oral)
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-sans bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    Tarja Vermelha • Validade até 6 meses
                                  </span>
                                </div>
                                
                                <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-800/80 text-indigo-200 space-y-2 text-[11px] leading-relaxed">
                                  <p className="font-bold text-white font-sans text-xs">
                                    Etinilestradiol 0,03mg + Levonorgestrel 0,15mg (ex: Microvlar), cartela com 21 comprimidos
                                  </p>
                                  <p className="text-slate-300">Quantidade: 3 cartelas</p>
                                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-sans">
                                    <strong>Posologia & Modo de Uso:</strong> Tomar 1 comprimido via oral, uma vez ao dia, sempre no mesmo horário, iniciando no 1º dia do ciclo menstrual, por 21 dias consecutivos, seguido de pausa de 7 dias antes de iniciar nova cartela.
                                  </div>
                                </div>
                              </div>

                              {/* 5. Orientações Mandatórias na Receita/Consulta */}
                              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <Info size={14} className="text-amber-400" /> O que mais vale constar na receita ou orientação escrita:
                                </div>
                                <p>• <strong>Dia de início:</strong> Se começar depois do 1º dia do ciclo, orientar método de barreira complementar por 7 dias.</p>
                                <p>• <strong>Conduta em esquecimento ou atraso:</strong> Se esquecimento &gt; 12 horas, tomar o comprimido esquecido imediatamente e manter os próximos no horário habitual, associando barreira se indicado.</p>
                                <p>• <strong>Ausência de proteção contra IST:</strong> Reforçar que a pílula não protege contra infecções sexualmente transmissíveis.</p>
                              </div>
                            </div>
                          )}

                          {/* ============================================================ */}
                          {/* SEÇÃO 3: ANEL VAGINAL */}
                          {/* ============================================================ */}
                          {selectedRoute === 'vaginal' && (
                            <div className="space-y-4 text-xs">
                              
                              {/* 1. Farmacocinética e Exposição Hormonal */}
                              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/70 space-y-2">
                                <h5 className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                                  <Activity size={16} /> 1. Farmacocinética & Exposição Hormonal
                                </h5>
                                <ul className="space-y-1.5 text-slate-200 pl-4 list-disc">
                                  <li><strong>Absorção:</strong> Transmucosa vaginal, evitando o trato gastrointestinal e a primeira passagem hepática inicial.</li>
                                  <li><strong>Padrão Sérico:</strong> Liberação constante com níveis plasmáticos baixos e estáveis ao longo de 21 dias.</li>
                                  <li><strong>Exposição Total:</strong> Etinilestradiol em dose diária baixa (cerca de 15 mcg/dia), conferindo exposição sistêmica reduzida em comparação às doses orais usuais.</li>
                                </ul>
                              </div>

                              {/* 2. Risco de TEV e Segurança Clínica */}
                              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/70 space-y-2">
                                <h5 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                                  <ShieldAlert size={16} /> 2. Risco de Tromboembolismo Venoso (TEV) — Nível de Evidência B
                                </h5>
                                <div className="space-y-2 text-slate-200 leading-relaxed">
                                  <p>
                                    • <strong>Estudos Populacionais (ASH 2024):</strong> Mostrou <strong>RR ajustado de 6,5 para o anel em relação a não usuárias</strong> e <strong>2,0 em relação ao oral com levonorgestrel</strong> (incidência de TEV de 7,8 por 10.000 mulheres-ano).
                                  </p>
                                  <p>
                                    • <strong>Equivalência de Contraindicação:</strong> Segundo o US MEC/CDC 2024 e FEBRASGO, o anel combinado com EE tem o mesmo perfil e contraindicações dos contraceptivos orais com EE. Não é isento de risco trombótico!
                                  </p>
                                </div>
                              </div>

                              {/* 3. Eficácia, Adesão e Uso Estendido */}
                              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <h5 className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                                  <CheckCircle2 size={16} /> 3. Eficácia, Adesão & Periodicidade Detalhada
                                </h5>
                                <ul className="space-y-1.5 text-slate-200 pl-4 list-disc">
                                  <li><strong>Periodicidade do Anel:</strong> Ciclo de 28 dias — <strong>3 semanas de uso contínuo + 1 semana de pausa</strong>.</li>
                                  <li><strong>Opção de Uso Estendido (FEBRASGO):</strong> Troca do anel a cada 3 semanas sem intervalo de pausa. Cada vez mais indicada pela FEBRASGO para reduzir sintomas de privação hormonal e dismenorreia.</li>
                                  <li><strong>Adesão & Efeitos Locais:</strong> Troca mensal reduz dependência da memória diária; pode causar leucorreia e desconforto vaginal transitório.</li>
                                </ul>
                              </div>

                              {/* 4. Aspectos Regulatórios e Modelo de Receita */}
                              <div className="p-4 rounded-2xl bg-cyan-950/40 border-2 border-cyan-600/80 space-y-3 font-mono">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-cyan-300 font-sans flex items-center gap-1.5">
                                    <FileText size={14} /> Modelo de Receituário Oficial (Anel Vaginal)
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-sans bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    Tarja Vermelha • Validade até 6 meses
                                  </span>
                                </div>
                                
                                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-800/80 text-cyan-200 space-y-2 text-[11px] leading-relaxed">
                                  <p className="font-bold text-white font-sans text-xs">
                                    Etonogestrel 11,7mg + Etinilestradiol 2,7mg, anel vaginal (NuvaRing, Organon), caixa com 1 unidade
                                  </p>
                                  <p className="text-slate-300">Quantidade: 3 caixas</p>
                                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-sans">
                                    <strong>Posologia & Modo de Uso:</strong> Inserir 1 anel profundamente na vagina e manter por 3 semanas consecutivas. Remover na 4ª semana para pausa de 7 dias, ou substituir imediatamente por anel novo se optar por esquema contínuo sem pausa.
                                  </div>
                                </div>
                              </div>

                              {/* 5. Orientações Mandatórias na Receita/Consulta */}
                              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <Info size={14} className="text-amber-400" /> O que mais vale constar na receita ou orientação escrita:
                                </div>
                                <p>• <strong>Dia de início:</strong> Se começar depois do 1º dia do ciclo menstrual, orientar método de barreira complementar (preservativo) por 7 dias.</p>
                                <p>• <strong>Conduta em esquecimento ou atraso:</strong> No anel vaginal a tolerância a atraso é maior que na pílula oral (até 3 horas fora da vagina sem perda de eficácia).</p>
                                <p>• <strong>Opção de uso estendido:</strong> Oferecer como alternativa já na receita se a paciente tiver interesse em evitar sintomas de privação.</p>
                                <p>• <strong>Ausência de proteção contra IST:</strong> Reforçar por escrito que não protege contra infecções sexualmente transmissíveis.</p>
                              </div>
                            </div>
                          )}

                        </div>

                      </motion.div>
                    )}

                  </motion.div>
                )}

              </motion.div>
            )}

          </motion.div>
        )}

      </div>
    </div>
  );
}

