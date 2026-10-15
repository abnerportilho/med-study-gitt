import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, ShieldAlert, TestTube, Pill, ArrowRight, 
  Brain, Dna, ChevronRight, Zap, Layers, AlertTriangle, 
  RotateCcw, Fingerprint, Eye, Scale, CheckCircle2,
  BookOpen, HelpCircle, HeartPulse, Stethoscope, Sparkles,
  Info, FileText, Check, ChevronDown, Flame, Scale as BalanceIcon,
  Crosshair, ShieldCheck, RefreshCw, AlertCircle, TrendingUp, Users,
  Heart, Droplet
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom High-Contrast Medical Balloon Component
interface BalloonProps {
  color?: 'blue' | 'wine' | 'green' | 'purple' | 'amber' | 'red' | 'graphite';
  icon?: React.ElementType;
  title: string;
  subtitle?: string;
  text?: string | React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
  className?: string;
  badge?: string;
}

const Balloon: React.FC<BalloonProps> = ({ 
  color = 'blue', 
  icon: Icon, 
  title, 
  subtitle,
  text, 
  onClick, 
  clickable = false, 
  className,
  badge
}) => {
  const colors = {
    blue: 'bg-[#0f172a] border-[#2563eb] text-slate-100 hover:border-[#3b82f6]',
    wine: 'bg-[#3f0f1c] border-[#9f1239] text-rose-100 hover:border-[#f43f5e]',
    green: 'bg-[#062c1e] border-[#059669] text-emerald-100 hover:border-[#10b981]',
    purple: 'bg-[#2e1065] border-[#7c3aed] text-purple-100 hover:border-[#a855f7]',
    amber: 'bg-[#451a03] border-[#d97706] text-amber-100 hover:border-[#f59e0b]',
    red: 'bg-[#450a0a] border-[#dc2626] text-red-100 hover:border-[#ef4444]',
    graphite: 'bg-[#18181b] border-[#3f3f46] text-zinc-100 hover:border-[#71717a]'
  };

  const selectedColor = colors[color] || colors.blue;

  return (
    <div 
      onClick={clickable ? onClick : undefined}
      className={cn(
        "border-2 rounded-2xl p-5 shadow-xl transition-all duration-300 relative overflow-hidden",
        selectedColor,
        clickable && "cursor-pointer hover:shadow-2xl hover:-translate-y-1 active:translate-y-0",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shrink-0">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-extrabold text-lg leading-snug tracking-tight text-white">{title}</h3>
            {subtitle && <p className="text-xs font-semibold opacity-80 uppercase tracking-wider text-indigo-200 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20 whitespace-nowrap">
            {badge}
          </span>
        )}
      </div>
      {text && (
        <div className="text-sm opacity-95 leading-relaxed font-medium mt-3 text-slate-100 border-t border-white/10 pt-3">
          {text}
        </div>
      )}
    </div>
  );
};

export default function SOPMain() {
  const [activeTab, setActiveTab] = useState<'epidemio' | 'patho' | 'clinical' | 'diagnosis' | 'oncology' | 'treatment' | 'experimental'>('patho');
  const [selectedAxis, setSelectedAxis] = useState<'central' | 'ovarian' | 'metabolic'>('central');
  const [selectedGoal, setSelectedGoal] = useState<'cycle' | 'hirsutism' | 'metabolism' | 'fertility'>('cycle');

  return (
    <div className="min-h-screen text-slate-100 p-2 sm:p-4 md:p-6 space-y-6 font-sans">
      {/* HEADER PRINCIPAL SOP */}
      <div className="py-2 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800/80">
                Ginecologia Endócrina • Nível Especialista
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                Rotterdam 2003 & International Guideline 2023
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              SÍNDROME DOS OVÁRIOS POLICÍSTICOS (SOP)
            </h1>
            <p className="text-sm text-slate-300 font-medium max-w-3xl leading-relaxed">
              Síndrome endócrino-metabólica sistêmica com malha fechada de 3 eixos retroalimentados (Central, Ovariano e Metabólico). Conduta individualizada por objetivo terapêutico.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-4 shrink-0">
            <div className="p-3 bg-purple-600/20 rounded-xl text-purple-400">
              <Activity size={28} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Prevalência Global (2026)</p>
              <p className="text-lg font-black text-white">12,1% (IC95%: 9,8–14,8)</p>
              <p className="text-[10px] text-purple-300 font-medium">Meta-análise 92 estudos / Rotterdam</p>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO ENTRE TABS */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-5 mt-5 overflow-x-auto no-scrollbar">
          {[
            { id: 'patho', label: '1. Fisiopatologia (3 Eixos)', icon: Layers },
            { id: 'epidemio', label: '2. Epidemiologia & Genética', icon: GlobeIcon },
            { id: 'clinical', label: '3. Quadro Clínico & Fenótipos', icon: SearchIcon },
            { id: 'diagnosis', label: '4. Diagnóstico (Rotterdam)', icon: FileText },
            { id: 'oncology', label: '5. Abordagem Oncológica', icon: ShieldAlert },
            { id: 'treatment', label: '6. Tratamento & Doses', icon: Pill },
            { id: 'experimental', label: '7. Tratamentos Experimentais', icon: Zap },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap border",
                activeTab === tab.id
                  ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/20"
                  : "bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTEÚDO DAS TABS */}
      <AnimatePresence mode="wait">
        {/* TAB 1: FISIOPATOLOGIA (3 EIXOS INTEGRADOS) */}
        {activeTab === 'patho' && (
          <motion.div key="patho" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="purple" 
              icon={Layers} 
              title="Fisiopatologia da SOP: Malha Fechada de 3 Eixos Interligados (Ciclo Vicioso)" 
              subtitle="Eixo 1: Central (Hipotálamo-Hipófise) • Eixo 2: Ovariano • Eixo 3: Metabólico (Resistência Insulínica)"
              text="A SOP não é uma doença isolada do ovário. É uma síndrome multifatorial alimentada por um circuito fechado de retroalimentações cruzadas entre o centro GnRH, a teca ovariana hiperativa e a resistência insulínica metabólica." 
              badge="Conceito Unificador"
            />

            {/* SELETOR INTERATIVO DOS EIXOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setSelectedAxis('central')}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all space-y-2",
                  selectedAxis === 'central'
                    ? "bg-[#2e1065] border-[#7c3aed] text-white shadow-xl scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-purple-600/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-purple-300">Eixo 1</span>
                  <Brain className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="font-extrabold text-lg text-white">Central (GnRH / KNDy)</h3>
                <p className="text-xs opacity-80">Aceleração dos pulsos de GnRH → Secreção aumentada de LH sobre FSH.</p>
              </button>

              <button 
                onClick={() => setSelectedAxis('ovarian')}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all space-y-2",
                  selectedAxis === 'ovarian'
                    ? "bg-[#3f0f1c] border-[#9f1239] text-white shadow-xl scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-rose-600/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-rose-300">Eixo 2</span>
                  <Activity className="w-5 h-5 text-rose-300" />
                </div>
                <h3 className="font-extrabold text-lg text-white">Ovariano (Teca / AMH)</h3>
                <p className="text-xs opacity-80">Hyperandrogenismo tecal + bloqueio da aromatase e parada folicular.</p>
              </button>

              <button 
                onClick={() => setSelectedAxis('metabolic')}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all space-y-2",
                  selectedAxis === 'metabolic'
                    ? "bg-[#062c1e] border-[#059669] text-white shadow-xl scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-emerald-600/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-emerald-300">Eixo 3</span>
                  <Zap className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="font-extrabold text-lg text-white">Metabólico (Insulina)</h3>
                <p className="text-xs opacity-80">Defeito PI3K-Akt seletivo + Insulina como co-gonadotrofina + Queda de SHBG.</p>
              </button>
            </div>

            {/* DETALHAMENTO DO EIXO SELECIONADO */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              {selectedAxis === 'central' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-900/40 rounded-2xl border border-purple-700/60 text-purple-300">
                      <Brain size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Eixo 1: CENTRAL (Hipotálamo-Hipófise & Neurônios KNDy)</h3>
                      <p className="text-xs text-purple-300 font-bold uppercase">Mecanismo Neuroendócrino de Aceleração Pulsátil</p>
                    </div>
                  </div>
                  <div className="bg-[#2e1065] border border-[#7c3aed] rounded-2xl p-5 text-purple-100 text-xs leading-relaxed space-y-3">
                    <p>• <strong>Neurônios KNDy:</strong> Localizados no núcleo infundibular/arqueado, expressam Kisspeptina, Neurokinina B (que aceleram o pulso) e Dinorfina (que desacelera).</p>
                    <p>• <strong>O Perda do Freio Progestagênico:</strong> A hiperandrogenemia crônica atua nos receptores androgênicos desses neurônios, diminuindo os receptores de progesterona e dinorfina. O "freio" é enfraquecido.</p>
                    <p>• <strong>Resultado Hipofisário:</strong> Pulso de GnRH cronicamente acelerado (&gt; 1 pulso a cada 60 min) estimula preferencialmente a síntese da subunidade β do <strong>LH</strong>, enquanto inibe a síntese de <strong>FSH</strong>.</p>
                    <div className="bg-amber-950/80 border border-amber-800/80 p-3 rounded-xl text-amber-200 mt-2 font-medium">
                      ⚠️ <strong>Ressalva Acadêmica (Ponto de Prova):</strong> Mecanismo demonstrado conclusivamente em modelo animal (camundongo PNA com exposição androgênica pré-natal). Extrapolação humana sustentada por evidência observacional, validada pelo ensaio do antagonista NK3R (Fezolinetanto).
                    </div>
                  </div>
                </div>
              )}

              {selectedAxis === 'ovarian' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-900/40 rounded-2xl border border-rose-700/60 text-rose-300">
                      <Activity size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Eixo 2: OVARIANO (Célula da Teca, Granulosa & AMH)</h3>
                      <p className="text-xs text-rose-300 font-bold uppercase">Hiperandrogenismo Tecal & Parada Folicular Antral</p>
                    </div>
                  </div>
                  <div className="bg-[#3f0f1c] border border-[#9f1239] rounded-2xl p-5 text-rose-100 text-xs leading-relaxed space-y-3">
                    <p>• <strong>Teca Hiperativa:</strong> O LH elevado em sinergia com a Insulina (que atua como co-gonadotrofina) hiperestimula as enzimas CYP17A1 da teca, gerando produção massiva de androstenediona e testosterona.</p>
                    <p>• <strong>Bloqueio da Aromatase:</strong> O FSH relativamente baixo + os níveis 2 a 3x elevados de Hormônio Anti-Mülleriano (AMH) bloqueiam a enzima Aromatase na célula da Granulosa, impedindo a conversão de andrógenos em estrógenos.</p>
                    <p>• <strong>Parada de Maturação Folicular:</strong> Os folículos antrais pequenos (2 a 9 mm) ficam retidos sem atingir a dominância ovulatória, acumulando-se no estroma ovariano espessado.</p>
                    <p>• <strong>Alça de Retroalimentação do AMH:</strong> O AMH elevado aciona o receptor AMHR2 em neurônios GnRH centrais, estimulando ainda mais a secreção de LH!</p>
                  </div>
                </div>
              )}

              {selectedAxis === 'metabolic' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-900/40 rounded-2xl border border-emerald-700/60 text-emerald-300">
                      <Zap size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Eixo 3: METABÓLICO (Resistência Insulínica & Defeito Seletivo)</h3>
                      <p className="text-xs text-emerald-300 font-bold uppercase">Hiperinsulinemia Compensatória & Supressão de SHBG</p>
                    </div>
                  </div>
                  <div className="bg-[#062c1e] border border-[#059669] rounded-2xl p-5 text-emerald-100 text-xs leading-relaxed space-y-3">
                    <p>• <strong>Defeito Seletivo Pós-Receptor de Insulina:</strong> Ocorre bloqueio na via PI3K-AKT (responsável pelo transporte de glicose GLUT4 nos músculos/gordura), enquanto a via MAPK-ERK (mitogênica e esteroidogênica) permanece INTACTA.</p>
                    <p>• <strong>Insulina como Co-Gonadotrofina:</strong> A hiperinsulinemia compensatória estimula diretamente a esteroidogênese na teca ovariana e nas supra-renais.</p>
                    <p>• <strong>Inibição Hepática de SHBG:</strong> A insulina suprime a síntese de SHBG (Globulina Ligadora de Hormônios Sexuais) no fígado. Sem SHBG, a fração da <strong>Testosterona Livre e Biodisponível</strong> dispara no sangue periférico!</p>
                    <p>• <strong>Adipócito Disfuncional:</strong> O adipócito hipertrofiado emite citocinas inflamatórias (TNF-α, IL-6), agravando a resistência insulínica global.</p>
                  </div>
                </div>
              )}

              {/* CARD RESUMO: POR QUE A PERDA DE PESO FUNCIONA? */}
              <div className="bg-[#18181b] border border-amber-600/60 rounded-2xl p-5 text-xs text-amber-100 space-y-2">
                <strong className="text-amber-300 text-sm block font-extrabold">🔥 PONTO DE PROVA: Por que a perda de peso modesta (5–10%) tem efeito desproporcional?</strong>
                <p>
                  Porque ela ataca diretamente a base do Eixo Metabólico! Ao diminuir a gordura visceral e restaurar a sensibilidade à insulina, o fígado volta a produzir SHBG, a insulina deixa de hiperestimular a teca ovariana e o combustível que alimentava os outros dois eixos é cortado, permitindo o retorno dos ciclos ovulatórios espontâneos.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: EPIDEMIOLOGIA & GENÉTICA */}
        {activeTab === 'epidemio' && (
          <motion.div key="epidemio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="blue" 
              icon={GlobeIcon} 
              title="Epidemiologia Mundial, Variabilidade Regional & Genética Complexa" 
              subtitle="Dados do Consenso Internacional 2023 & Meta-análise 2026 (157 mil participantes)"
              text="A SOP é a endocrinopatia mais frequente em mulheres em idade reprodutiva no planeta, com forte agregação familiar e arquitetura genética poligênica." 
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="font-extrabold text-white text-base">Prevalência Global</h4>
                <p className="text-3xl font-black text-purple-400">12,1%</p>
                <p className="text-xs text-slate-300">
                  Pelos critérios de Rotterdam. Distribuição regional:
                  <br />• Mediterrâneo Oriental: 15,1%
                  <br />• Sudeste Asiático: 14,3%
                  <br />• Europa: 11,7%
                  <br />• Américas: 10,5%
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="font-extrabold text-white text-base">Adolescentes (&lt; 8 Anos Menarca)</h4>
                <p className="text-3xl font-black text-emerald-400">6,3%</p>
                <p className="text-xs text-slate-300">
                  Pelo Guideline 2023 (contra 9,8% em Rotterdam original). A redução reflete a <strong>exclusão do critério ultrassonográfico (PCOM)</strong> nessa faixa etária para evitar sobrediagnóstico.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="font-extrabold text-white text-base">Genética & Agragação</h4>
                <p className="text-3xl font-black text-rose-400">38% – 79%</p>
                <p className="text-xs text-slate-300">
                  Herdabilidade estimada. Filhas de mães com SOP apresentam <strong>risco 5 vezes maior</strong> de desenvolver a síndrome. Estudo GWAS identifica 30 loci genômicos envolvidos.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: QUADRO CLÍNICO & FENÓTIPOS */}
        {activeTab === 'clinical' && (
          <motion.div key="clinical" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="green" 
              icon={SearchIcon} 
              title="Manifestações Clínicas Multi-Sistêmicas da SOP" 
              subtitle="Eixo Reprodutivo • Cutâneo • Metabólico • Psicológico"
              text="A apresentação da SOP varia desde a mulher magra anovulatória com acne até a paciente com obesidade andróide, hirsutismo grave e síndrome metabólica." 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EIXO REPRODUTIVO */}
              <div className="bg-slate-900/60 border border-purple-800/60 rounded-3xl p-5 space-y-3 shadow-xl">
                <h4 className="font-extrabold text-purple-300 text-lg flex items-center gap-2">
                  <Activity size={20} /> Eixo Reprodutivo / Menstrual
                </h4>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>Oligomenorreia / Amenorreia:</strong> Ciclos &gt; 35 dias ou &lt; 8 menses/ano.</p>
                  <p>• <strong>Sangramento Uterino Disfuncional (SUD):</strong> Ocorre por estimulação estrogênica contínua sem oposição de progesterona.</p>
                  <p>• <strong>Infertilitade Anovulatória:</strong> SOP é a causa número 1 de anovulação crônica no mundo.</p>
                  <p>• <strong>Menarca Irregular:</strong> Irregularidade pode estar presente desde o início da vida fértil.</p>
                </div>
              </div>

              {/* EIXO CUTÂNEO */}
              <div className="bg-slate-900/60 border border-rose-800/60 rounded-3xl p-5 space-y-3 shadow-xl">
                <h4 className="font-extrabold text-rose-300 text-lg flex items-center gap-2">
                  <Flame size={20} /> Eixo Cutâneo / Hiperandrogênico
                </h4>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>Hirsutismo:</strong> Padrão masculino de pelos em áreas androgenossensíveis (face, tórax, linha alba, dorso). Avaliar por Escala de Ferriman-Gallwey Modificada.</p>
                  <p>• <strong>Acne Refratária:</strong> Lesões inflamatórias em terço inferior da face e pescoço, refratárias ao tratamento dermatológico tópico.</p>
                  <p>• <strong>Alopecia Androgênica:</strong> Rarefação capilar em coroa do couro cabeludo.</p>
                  <p>• <strong>Acantose Nigricans:</strong> Hiperpigmentação aveludada em dobras (cervical, axilar) — marcador de resistência insulínica grave.</p>
                </div>
              </div>

              {/* EIXO METABÓLICO */}
              <div className="bg-slate-900/60 border border-emerald-800/60 rounded-3xl p-5 space-y-3 shadow-xl">
                <h4 className="font-extrabold text-emerald-300 text-lg flex items-center gap-2">
                  <Zap size={20} /> Eixo Metabólico & Antropométrico
                </h4>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>Obesidade Central / Andróide:</strong> Deposição de gordura visceral, importante fonte de aromatização e citocinas inflamatórias.</p>
                  <p>• <strong>Resistência Insulínica Subclínica:</strong> Presente em até 75% das pacientes eutróficas e 95% das pacientes com obesidade.</p>
                  <p>• <strong>Síndrome Metabólica:</strong> Dislipidemia (HDL baixo, Triglicerídeos altos), Hipertensão e Intolerância à Glicose.</p>
                </div>
              </div>

              {/* EIXO PSICOLÓGICO */}
              <div className="bg-slate-900/60 border border-blue-800/60 rounded-3xl p-5 space-y-3 shadow-xl">
                <h4 className="font-extrabold text-blue-300 text-lg flex items-center gap-2">
                  <HeartPulse size={20} /> Eixo Psicológico & Sono
                </h4>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>Ansiedade e Depressão:</strong> Prevalência até 3x maior em pacientes com SOP; rastreio com escalas validadas é recomendado pelo guideline 2023.</p>
                  <p>• <strong>Distúrbios de Imagem Corporal:</strong> Impacto severo na autoestima relacionado ao hirsutismo e ganho ponderal.</p>
                  <p>• <strong>Apneia Obstrutiva do Sono (SAOS):</strong> Risco aumentado independente do IMC por alteração metabólica e androgênica.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: DIAGNÓSTICO (ROTTTERDAM vs ADOLESCENTES) */}
        {activeTab === 'diagnosis' && (
          <motion.div key="diagnosis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="purple" 
              icon={FileText} 
              title="Critérios Diagnósticos de Rotterdam (2 de 3) & Regra de Ouro em Adolescentes" 
              subtitle="Consenso Internacional 2023 • Diagnóstico por Exclusão"
              text="O diagnóstico de SOP exige obrigatoriamente a exclusão de outras endocrinopatias que mimetizam a síndrome (HAC não clássica, hiperprolactinemia, hipotireoidismo)." 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CRITÉRIOS EM ADULTAS */}
              <div className="bg-slate-900/60 border border-purple-600/60 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-purple-600/30 pb-3">
                  <h3 className="text-lg font-black text-white">Mulheres Adultas</h3>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-950 text-purple-200 border border-purple-700">Preencher 2 de 3 Critérios</span>
                </div>
                <div className="text-xs space-y-3 text-slate-200">
                  <p><strong>1. Oligo / Anovulação:</strong> Ciclos &gt; 35 dias ou &lt; 8 ciclos por ano.</p>
                  <p><strong>2. Hiperandrogenismo:</strong> Clínico (Hirsutismo Ferriman-Gallwey ≥ 4-6, acne severa) e/ou Laboratorial (Testosterona total/livre elevada).</p>
                  <p><strong>3. PCOM / AMH:</strong> Ultrassom transvaginal com ≥ 20 folículos de 2-9 mm por ovário OU volume ovariano ≥ 10 mL OU níveis de AMH elevados.</p>
                </div>
              </div>

              {/* CRITÉRIOS EM ADOLESCENTES */}
              <div className="bg-slate-900/60 border border-amber-600/60 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-amber-600/30 pb-3">
                  <h3 className="text-lg font-black text-white">Adolescentes (&lt; 8 Anos Pós-Menarca)</h3>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-950 text-amber-200 border border-amber-700">USG / AMH PROIBIDOS!</span>
                </div>
                <div className="text-xs space-y-3 text-slate-200">
                  <div className="bg-amber-950/80 border border-amber-800 p-3 rounded-xl text-amber-200 font-bold">
                    ⚠️ CRITÉRIO ULTRASSONOGRÁFICO / AMH NÃO DEVE SER USADO!
                  </div>
                  <p>O aparecimento de ovários de aspecto policístico ao USG na adolescência é achado fisiológico normal da puberdade.</p>
                  <p><strong>Diagnóstico Exige OBRIGATORIAMENTE OS DOIS CRITÉRIOS CLÍNICOS:</strong>
                    <br />1. Irregularidade menstrual persistente.
                    <br />2. Hiperandrogenismo clínico ou laboratorial comprovado.
                  </p>
                  <p className="text-amber-300">Se preencher apenas 1 critério: classificar como "At Risk" e reavaliar periodicamente.</p>
                </div>
              </div>
            </div>

            {/* PAINEL MÍNIMO & RASTREIO */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <TestTube className="text-blue-400" size={20} /> Painel Laboratorial Mínimo Obligatório & Rastreio Metabólico
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                  <strong className="text-blue-300 block">Investigação Diagnóstica Mínima:</strong>
                  <p>• <strong>β-hCG:</strong> Excluir gestação em todas.</p>
                  <p>• <strong>TSH & Prolactina:</strong> Excluir hipotireoidismo e prolactinoma.</p>
                  <p>• <strong>17-OH-Progesterona (Fase Folicular Precoce):</strong> Excluir Hiperplasia Adrenal Congênita Não Clássica (&lt; 200 ng/dL afasta).</p>
                  <p>• <strong>Testosterona Total + Livre + SHBG:</strong> Calcular FAI (Free Androgen Index = T_total / SHBG x 100).</p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                  <strong className="text-emerald-300 block">Rastreio de Comorbidades (Pós-Diagnóstico):</strong>
                  <p>• <strong>TOTG 75g de 2 Horas:</strong> OBRIGATÓRIO! Glicemia de jejum isolada perde até 50% das pacientes com intolerância à glicose.</p>
                  <p>• <strong>Perfil Lipídico Completo:</strong> Colesterol total, HDL, LDL e Triglicerídeos.</p>
                  <p>• <strong>Aferição de Pressão Arterial & IMC:</strong> Em todas as consultas.</p>
                  <p>• <strong>Avaliação Psiquiátrica:</strong> Escala validada de ansiedade/depressão.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: ABORDAGEM ONCOLÓGICA (CÂNCER DE ENDOMÉTRIO) */}
        {activeTab === 'oncology' && (
          <motion.div key="oncology" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="red" 
              icon={ShieldAlert} 
              title="Abordagem Oncológica na SOP — Risco Central: Câncer de Endométrio" 
              subtitle="Mecanismo Fisiopatológico & Estratégias Preventivas Recomendadas pelo Guideline 2023"
              text="A anovulação crônica mantém o endométrio sob estímulo estrogênico contínuo sem a oposição protetora da progesterona, elevando em até 4 vezes o risco de adenocarcinoma endometrial a longo prazo." 
              badge="Prevenção Obrigatória"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#450a0a] border-2 border-[#dc2626] rounded-3xl p-6 text-red-100 space-y-3 shadow-xl">
                <h3 className="font-extrabold text-red-300 text-lg">Cascade Causal da Neoplasia Endometrial</h3>
                <p className="text-xs leading-relaxed">
                  <strong>Anovulação Crônica</strong> → Ausência de Corpo Lúteo → <strong>Ausência de Progesterona</strong> → Estímulo Estrogênico Não Contraposto → Proliferação e Hiperplasia Endometrial sem Descamação → <strong>Risco de Câncer de Endométrio 4x Maior (9% vs 3% na população geral)</strong>.
                </p>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-red-800 text-xs text-slate-200 font-bold">
                  ⚠️ Guideline 2023: Rastreio de rotina com ultrassom ou biópsia NÃO é recomendado em pacientes ASSINTOMÁTICAS. Mas a vigilância ativa de sangramento vaginal anormal e a proteção endometrial medicamentosa SÃO MANDATÓRIAS!
                </div>
              </div>

              <div className="bg-slate-900/80 border-2 border-emerald-600/80 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="font-extrabold text-emerald-300 text-lg">Estratégias de Proteção Endometrial</h3>
                <div className="text-xs space-y-3 text-slate-200">
                  <p>• <strong>1ª Linha: Contraceptivo Hormonal Combinado (CHC):</strong> Regulariza o ciclo e fornece progestágeno protetor contínuo.</p>
                  <p>• <strong>2ª Linha (Se CHC Contraindicado): Progestogênio Cíclico Isolado:</strong>
                    <br />- Dydrogesterona 10 mg/dia VO OU Medroxiprogesterona 10 mg/dia VO durante 12 a 14 dias por mês.
                  </p>
                  <p>• <strong>SIU-LNG (DIU Levonorgestrel - Mirena/Kyleena):</strong> Excelente proteção endometrial local por 5 a 8 anos sem efeitos sistêmicos metabólicos.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: TRATAMENTO & DOSES */}
        {activeTab === 'treatment' && (
          <motion.div key="treatment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="green" 
              icon={Pill} 
              title="Protocolo Terapêutico de Precisão — Individualizado por Objetivo Clínico" 
              subtitle="Diretriz Internacional 2023 & FEBRASGO 2026 com Doses Exatas, Vias e Monitoração"
              text="O tratamento da SOP é direcionado para a queixa e objetivo prioritário da paciente: regularização menstrual/proteção endometrial, hirsutismo cosmético, controle metabólico ou fertilidade." 
            />

            {/* SELETOR DE OBJETIVO TERAPÊUTICO */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'cycle', label: '1. Ciclo & Proteção', icon: Activity },
                { id: 'hirsutism', label: '2. Hirsutismo & Acne', icon: Flame },
                { id: 'metabolism', label: '3. Componente Metabólico', icon: Zap },
                { id: 'fertility', label: '4. Indução de Ovulação', icon: Heart },
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id as any)}
                  className={cn(
                    "p-3.5 rounded-2xl border-2 text-xs font-black transition-all flex items-center justify-center gap-2",
                    selectedGoal === g.id
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-lg"
                      : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                  )}
                >
                  <g.icon size={16} />
                  {g.label}
                </button>
              ))}
            </div>

            {/* CONTEÚDO DO OBJETIVO */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              {selectedGoal === 'cycle' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white">Objetivo 1: Irregularidade Menstrual & Proteção Endometrial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#0f172a] border border-[#2563eb] p-5 rounded-2xl space-y-3">
                      <strong className="text-blue-300 text-sm block">1ª Linha: Contraceptivo Hormonal Combinado (CHC)</strong>
                      <p>• <strong>Dose Exata:</strong> Etinilestradiol em dose baixa (20 a 30 mcg) associado a progestágeno antiandrogênico (Ciproterona 2 mg, Drospirenona 3 mg ou Dienogeste 2 mg).</p>
                      <p>• <strong>Mecanismo Dual:</strong> Aumenta a síntese de SHBG pelo fígado (reduzindo a testosterona livre) + regulariza a menstruação + previne proliferação endometrial.</p>
                      <p className="text-rose-300"><strong>Contraindicações:</strong> Tabagismo ≥ 35 anos, antecedentes de TVP/TEP, Enxaqueca com aura, HAS não controlada.</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl space-y-3">
                      <strong className="text-purple-300 text-sm block">2ª Linha: Progestogênio Cíclico Isolado (Se CHC Contraindicado)</strong>
                      <p>• <strong>Opção 1:</strong> Dydrogesterona 10 mg/dia VO durante 14 dias por mês.</p>
                      <p>• <strong>Opção 2:</strong> Acetato de Medroxiprogesterona 10 mg/dia VO durante 12-14 dias por mês.</p>
                      <p>• <strong>Opção 3:</strong> SIU-LNG (DIU Levonorgestrel) para proteção endógena contínua.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedGoal === 'hirsutism' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white">Objetivo 2: Hiperandrogenismo Cosmético (Hirsutismo & Acne)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#3f0f1c] border border-[#9f1239] p-5 rounded-2xl space-y-3">
                      <strong className="text-rose-300 text-sm block">Espironolactona (Antiandrógeno de Escolha)</strong>
                      <p>• <strong>Dose & Titulação:</strong> Iniciar com 50–100 mg/dia VO. Escalar se necessário até 100–200 mg/dia VO.</p>
                      <p className="text-amber-200 font-bold">⚠️ OBRIGATÓRIO: Associar SEMPRE a método contraceptivo eficaz (CHC/DIU)! (Medicação Categoria X por risco de feminização de feto masculino).</p>
                      <p>• <strong>Monitoramento:</strong> Dosar Potássio sérico e Função Renal basal, em 1 e 4 semanas e a cada 3-6 meses.</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl space-y-3">
                      <strong className="text-blue-300 text-sm block">Tratamento Físico / Laser & Tempo de Resposta</strong>
                      <p>• <strong>Laser Mecânico / Fototermólise:</strong> Primeira linha para remoção de pelos já instalados.</p>
                      <p>• <strong>Tempo Médio de Resposta Medicamentosa:</strong> O tratamento farmacológico exige no mínimo <strong>3 a 6 meses</strong> para evidenciar redução do crescimento folicular devido ao ciclo de vida do pelo.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedGoal === 'metabolism' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white">Objetivo 3: Componente Metabólico & Sensibilidade à Insulina</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#062c1e] border border-[#059669] p-5 rounded-2xl space-y-3">
                      <strong className="text-emerald-300 text-sm block">Metformina (Sensibilizador Insulínico)</strong>
                      <p>• <strong>Indicações:</strong> Resistência insulínica comprovada, pré-diabetes/TOTG alterado ou coadjuvante na indução de ovulação.</p>
                      <p>• <strong>Dose Exata & Titulação:</strong> Iniciar 500 mg 1x/dia com a maior refeição. Escalar gradualmente a cada 1-2 semanas até a dose de manutenção de <strong>1500 a 2000 mg/dia VO</strong> (para evitar diarreia/náuseas em 20-30% das pacientes).</p>
                      <p>• <strong>Monitoração:</strong> TFG anualmente (contraindicado se TFG &lt; 30) + Dosagem de Vitamina B12 anualmente (risco de deficiência prolongada em 5-52%).</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/60 p-5 rounded-2xl space-y-3">
                      <strong className="text-amber-300 text-sm block">Agonistas GLP-1 & Cirurgia Bariatrica</strong>
                      <p>• <strong>Análogos de GLP-1 (Semaglutida / Tirzepatida):</strong> Considerar conforme critérios de IMC e comorbidades gerais.</p>
                      <p>• <strong>Cirurgia Bariátrica:</strong> Conforme indicações padrão da população geral em obesidade grau II/III refratária.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedGoal === 'fertility' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white">Objetivo 4: Indução de Ovulação quando Desejo de Gestação</h3>
                  <div className="bg-[#2e1065] border-2 border-[#7c3aed] p-5 rounded-2xl text-xs text-purple-100 space-y-3">
                    <strong className="text-purple-300 text-sm block font-black">1ª LINHA INEGOCIÁVEL (Guideline 2023): LETROZOLE (Inibidor de Aromatase)</strong>
                    <p>• <strong>Dose & Posologia:</strong> <strong>Letrozole 2,5 mg/dia VO</strong> administrado do 3º ao 7º dia do ciclo (ou do 5º ao 9º dia). Pode ser escalado para 5,0 mg/dia até no máximo 7,5 mg/dia se anovulação persistir.</p>
                    <p>• <strong>SUPERIORIDADE AO CLOMIFENO (Estudo Estrela):</strong> O Letrozole supera o Clomifeno em taxa de nascidos vivos (27,5% vs 19,1%, NNT ≈ 12).</p>
                    <p>• <strong>Vantagens Clínicas:</strong> Não possui efeito antiestrogênico periférico (mantém espessura endometrial adequada e muco cervical favorável) e apresenta menor taxa de gestação múltipla.</p>
                    <p>• <strong>2ª Linha:</strong> Clomifeno (50–150 mg/dia VO por 5 dias) ± Metformina OR Gonadotrofinas exógenas (FSHr low-dose) OR Drilling ovariano laparoscópico.</p>
                    <p>• <strong>3ª Linha:</strong> Fertilização in Vitro (FIV) com preferência por transferência de embrião único.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 7: TRATAMENTOS EXPERIMENTAIS */}
        {activeTab === 'experimental' && (
          <motion.div key="experimental" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="amber" 
              icon={Zap} 
              title="Fronteiras da Terapêutica na SOP: Bloqueio do Circuito Hipotalâmico KNDy" 
              subtitle="Ensaios Clínicos de Prova de Conceito Fase 2a"
              text="O avanço no entendimento dos neurônios KNDy permitiu o desenvolvimento de alvos farmacológicos centrais para desacelerar diretamente o gerador de pulsos de GnRH." 
            />

            <div className="bg-slate-900/60 border border-amber-600/60 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-black text-amber-300">Antagonistas do Receptor NK3R — Fezolinetanto</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Estudo randomizado duplo-cego fase 2a com 73 mulheres com SOP avaliou o Fezolinetanto (60–180 mg/dia VO). Demonstrou <strong>redução robusta de testosterona total e LH</strong> de forma dose-dependente, sem alterar progesterona/estradiolo. Prova de conceito de que intervir no circuito hipotalâmico tem efeito clínico direto na SOP.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const GlobeIcon = (props: any) => <Users {...props} />;
const SearchIcon = (props: any) => <Activity {...props} />;
