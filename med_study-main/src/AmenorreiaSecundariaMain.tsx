import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, ShieldAlert, TestTube, Pill, ArrowRight, 
  Brain, Dna, ChevronRight, Zap, Layers, AlertTriangle, 
  RotateCcw, Fingerprint, Eye, Scale, CheckCircle2,
  BookOpen, HelpCircle, HeartPulse, Stethoscope, Sparkles,
  Info, FileText, Check, ChevronDown, Flame, Scale as BalanceIcon,
  Crosshair, ShieldCheck, RefreshCw, AlertCircle
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

// --- ALGORITHM STATE MACHINE FOR AMENORRHEA SECUNDÁRIA WORKUP ---
type StepNode = 
  | 'BHCG' 
  | 'PREGNANCY' 
  | 'TSH_PRL' 
  | 'HYPOTHYROID' | 'HYPERPROLACTIN' 
  | 'FSH_EVAL' 
  | 'FSH_HIGH_IOP' | 'PROGESTERONE_TEST' 
  | 'PROG_POSITIVE_SOP' | 'ESTROGEN_PROGEST_TEST' 
  | 'ESTRO_PROG_POSITIVE_AHF' | 'ESTRO_PROG_NEGATIVE_ASHERMAN';

const InteractiveWorkupAlgorithm = () => {
  const [currentNode, setCurrentNode] = useState<StepNode>('BHCG');
  const [history, setHistory] = useState<StepNode[]>([]);

  const navigate = (node: StepNode) => {
    setHistory([...history, currentNode]);
    setCurrentNode(node);
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const prev = newHistory.pop();
      setHistory(newHistory);
      setCurrentNode(prev!);
    }
  };

  const reset = () => {
    setHistory([]);
    setCurrentNode('BHCG');
  };

  const renderNode = () => {
    switch (currentNode) {
      case 'BHCG':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
            <Balloon 
              color="purple" 
              icon={TestTube} 
              title="Passo 1: Regra Inegociável da Ginecologia — Dosagem de β-hCG SÉRICO" 
              subtitle="Primeiro Exame em QUALQUER Idade Reprodutiva"
              text="Antes de solicitar painel hormonal complexo ou exames de imagem avançados, é OBRIGATÓRIO afastar a causa número 1 de amenorreia secundária na prática clínica mundial: GESTAÇÃO." 
              badge="Passo Universal"
            />
            <div className="p-4 rounded-2xl flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Qual o resultado da dosagem de β-hCG SÉRICO?
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('PREGNANCY')} 
                  className="flex-1 md:w-56 bg-amber-600 hover:bg-amber-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  POSITIVO (β-hCG &gt; 5 mIU/mL)
                </button>
                <button 
                  onClick={() => navigate('TSH_PRL')} 
                  className="flex-1 md:w-56 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  NEGATIVO (Gestação Excluída)
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'PREGNANCY':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="amber" 
              icon={AlertTriangle} 
              title="Diagnóstico Final: GESTAÇÃO EM CURSO" 
              subtitle="Causa Fisiológica Mais Frequente"
              text="Confirmada gravidez! Interromper imediatamente qualquer medicação potencialmente teratogênica e iniciar assistência pré-natal de rotina." 
              badge="Encaminhar Pré-Natal"
            />
            <div className="bg-[#1e1b4b] border-2 border-[#4338ca] rounded-2xl p-6 text-slate-100 space-y-3">
              <h3 className="font-bold text-lg text-indigo-300">Conduta Inicial Pré-Natal:</h3>
              <p>• Ultrassonografia Obstétrica Transvaginal para datação gestacional (Comprimento Cabeça-Nábega - CCN).</p>
              <p>• Iniciar Ácido Fólico 0,4 mg/dia VO (ou 5 mg/dia se alto risco de defeito do tubo neural).</p>
              <p>• Solicitar exames de rotina de 1º trimestre (Tipagem sanguínea/Rh, Sorologias, Urina I e Urocultura, Hemograma, Glicemia jejum).</p>
            </div>
          </motion.div>
        );

      case 'TSH_PRL':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="blue" 
              icon={Brain} 
              title="Passo 2: Triagem Endocrinológica Universal — TSH & Prolactina" 
              subtitle="Afastar Endocrinopatias com Impacto Direto no Eixo HPO"
              text="O TSH avalia disfunção tireoidiana (hipo/hipertireoidismo). O TRH elevado no hipotireoidismo estimula diretamente os lactotrofos hipofisários a secretarem prolactina. Prolactina elevada inibe a pulsatilidade do GnRH." 
              badge="Rastreio Universal"
            />
            <div className="p-4 rounded-2xl flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Qual o perfil de TSH e Prolactina Sérica?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <button 
                  onClick={() => navigate('HYPOTHYROID')} 
                  className="bg-amber-700 hover:bg-amber-600 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm"
                >
                  TSH Elevado (Hipotireoidismo)
                </button>
                <button 
                  onClick={() => navigate('HYPERPROLACTIN')} 
                  className="bg-purple-700 hover:bg-purple-600 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm"
                >
                  Prolactina Elevada (PRL &gt; 25 ng/mL)
                </button>
                <button 
                  onClick={() => navigate('FSH_EVAL')} 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm"
                >
                  Ambos NORMAIS
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'HYPOTHYROID':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="amber" 
              icon={Pill} 
              title="Diagnóstico: HIPOTIREOIDISMO PRIMÁRIO" 
              subtitle="Causa Endocrinológica Corrigível"
              text="A queda de T4 livre eleva o TRH hipotalâmico, estimulando TSH e Prolactina (hiperprolactinemia secundária). Isso desorganiza os pulsos de GnRH." 
              badge="Conduta Específica"
            />
            <div className="bg-[#451a03] border-2 border-[#d97706] rounded-2xl p-6 text-amber-100 space-y-3">
              <h3 className="font-bold text-lg text-amber-300">Tratamento Farmacológico Prescrito:</h3>
              <p>• <strong>Levotiroxina Sódica (T4 sintético):</strong> 1,6 mcg/kg/dia VO em jejum (30-60 min antes do desjejum com água pura).</p>
              <p>• <strong>Reavaliação:</strong> Dosar TSH e T4L em 6 a 8 semanas para ajuste de dose (meta TSH entre 0,5 e 2,5 mIU/L).</p>
              <p>• <strong>Atenção:</strong> Com a normalização do TSH, a Prolactina e o ciclo menstrual se restabelecem sem necessidade de dopaminérgicos.</p>
            </div>
          </motion.div>
        );

      case 'HYPERPROLACTIN':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="purple" 
              icon={Brain} 
              title="Diagnóstico: HIPERPROLACTINEMIA" 
              subtitle="Investigação Etiológica & Imagem Hipofisária"
              text="A prolactina hipersecretada atua nos receptores hipotalâmicos bloqueando a liberação pulsátil de GnRH. Exige rastreio medicamentoso e RM de Sela Túrcica." 
              badge="RM Obrigatória se PRL &gt; 100"
            />
            <div className="bg-[#2e1065] border-2 border-[#7c3aed] rounded-2xl p-6 text-purple-100 space-y-3">
              <h3 className="font-bold text-lg text-purple-300">Etiologias & Conduta Terapêutica:</h3>
              <p>• <strong>Excluir Causas Farmacológicas:</strong> Antipsicóticos (risperidona, haloperidol), metoclopramida, antidepressivos (ISRS, tricíclicos).</p>
              <p>• <strong>RM de Sela Túrcica:</strong> Se PRL &gt; 50-100 ng/mL ou galactorreia/sintomas visuais (afastar Micro/Macroprolactinoma).</p>
              <p>• <strong>Tratamento Medicamentoso de Escolha:</strong> <strong>Cabergolina 0,5 mg VO por semana</strong> (dividido em 0,25 mg 2x/semana nas refeições). Reavaliar PRL em 4 semanas. (Bromocriptina 2,5 mg/dia é opção de 2ª linha pela menor tolerabilidade/efeitos GI).</p>
            </div>
          </motion.div>
        );

      case 'FSH_EVAL':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="blue" 
              icon={Activity} 
              title="Passo 3: Dosagem de FSH SÉRICO — Localização do Nível de Lesão" 
              subtitle="Diferenciar Causa Ovariana Primária de Central/Uterina"
              text="Com gestação, hipotireoidismo e prolactinoma excluídos, o FSH determina se o ovário está esgotado (FSH alto) ou se a falha é hipotalâmico-hipofisária/uterina (FSH normal ou baixo)." 
              badge="Divisor de Águas"
            />
            <div className="p-4 rounded-2xl flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Qual o valor do FSH Sérico (dosado em 2 ocasiões)?
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('FSH_HIGH_IOP')} 
                  className="flex-1 md:w-64 bg-rose-700 hover:bg-rose-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  FSH ELEVADO (&gt; 25 - 40 UI/L)
                </button>
                <button 
                  onClick={() => navigate('PROGESTERONE_TEST')} 
                  className="flex-1 md:w-64 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  FSH BAIXO OU NORMAL (&lt; 10 UI/L)
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'FSH_HIGH_IOP':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="wine" 
              icon={ShieldAlert} 
              title="Diagnóstico: INSUFICIÊNCIA OVARIANA PREMATURA (IOP)" 
              subtitle="Falência Ovariana Primária em Mulher &lt; 40 Anos"
              text="FSH cronicamente elevado com estradiol indetectável em 2 dosagens colhidas com intervalo de 4 semanas. A hipófise está 'gritando' por resposta de um ovário desprovido de folículos funcionais." 
              badge="Hipergonadotrófico"
            />
            <div className="bg-[#3f0f1c] border-2 border-[#9f1239] rounded-2xl p-6 text-rose-100 space-y-3">
              <h3 className="font-bold text-lg text-rose-300">Investigação Etiológica & Terapia de Reposição Hormonal (TRH):</h3>
              <p>• <strong>Workup Obrigatório:</strong> Cariótipo Banda G (afastar Mosaico Turner/Cromossomo Y), Pesquisa da Pré-mutação do Gene FMR1 (Síndrome do X Frágil) + Autoanticorpos Anti-adrenal e Anti-tireoperoxidase (TPO).</p>
              <p>• <strong>TRH Reposição Obrigatória até a Idade da Menopausa Fisiológica (50-51 anos):</strong> Proteção óssea (evitar osteoporose) e cardiovascular.
                <br />- <strong>Esquema:</strong> 17-β Estradiol Transdérmico 50-100 mcg/dia patch (ou Valerato de Estradiol 2 mg/dia VO) + Progesterona Micronizada 200 mg/dia VO por 12-14 dias/mês (se útero presente).</p>
            </div>
          </motion.div>
        );

      case 'PROGESTERONE_TEST':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="blue" 
              icon={Pill} 
              title="Passo 4: TESTE DA PROGESTERONA (Desafio do Progestágeno)" 
              subtitle="Avaliação da Presença de Estrogênio Endógeno e Perviedade Anatômica"
              text="Administrar Acetato de Medroxiprogesterona 10 mg/dia VO por 7 a 10 dias OU Progesterona Micronizada 200 mg/dia VO por 10 dias. Observar sangramento por privação até 7 dias após o término." 
              badge="Prova Funcional"
            />
            <div className="p-4 rounded-2xl flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Houve SANGRAMENTO POR PRIVAÇÃO (Teste Positivo)?
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('PROG_POSITIVE_SOP')} 
                  className="flex-1 md:w-64 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  SIM (Sangrou / Teste +)
                </button>
                <button 
                  onClick={() => navigate('ESTROGEN_PROGEST_TEST')} 
                  className="flex-1 md:w-64 bg-amber-600 hover:bg-amber-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  NÃO (Não Sangrou / Teste -)
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'PROG_POSITIVE_SOP':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="green" 
              icon={CheckCircle2} 
              title="Diagnóstico: ANOVULAÇÃO CRÔNICA COM ESTROGÊNIO PRESERVADO (SOP / Anovulação)" 
              subtitle="Eixo Hormonal produz Estrogênio, mas não ocorre Ovulação/Luteinização"
              text="O sangramento confirma que o endométrio estava 'proliferado' por estrogênio circulante e que o trato genital é perfeitamente pérvio. A causa mais comum é a Síndrome dos Ovários Policísticos (SOP)." 
              badge="Normogonadotrófico"
            />
            <div className="bg-[#062c1e] border-2 border-[#059669] rounded-2xl p-6 text-emerald-100 space-y-3">
              <h3 className="font-bold text-lg text-emerald-300">Conduta Terapêutica & Próximos Passos:</h3>
              <p>• Avaliar Critérios de Rotterdam para SOP (Oligo/anovulação + Hiperandrogenismo + PCOM ao USG).</p>
              <p>• <strong>Proteção Endometrial:</strong> Prescrever Contraceptivo Hormonal Combinado (CHC) com Etinilestradiol 20-30 mcg + Progestágeno antiandrogênico OR Progestógeno Cíclico isolado (Dydrogesterona 10 mg/dia por 14 dias/mês) para prevenir Hiperplasia/Câncer de Endométrio.</p>
              <p>• Rastrear comorbidades metabólicas com TOTG 75g (2h) e perfil lipídico.</p>
            </div>
          </motion.div>
        );

      case 'ESTROGEN_PROGEST_TEST':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="amber" 
              icon={Layers} 
              title="Passo 5: TESTE COMBINADO DE ESTROGÊNIO + PROGESTERONA" 
              subtitle="Diferenciar Hipoestrogenismo Severo de Defeito Endometrial/Anatômico"
              text="Administrar Estradiol 2 mg/dia VO por 21 dias + Medroxiprogesterona 10 mg/dia nos últimos 10 dias. O estrogênio 'prepara' o endométrio artificialmente e a progesterona induz a descamação." 
              badge="Teste Combinado"
            />
            <div className="p-4 rounded-2xl flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Houve SANGRAMENTO após a combinação de Estrogênio + Progesterona?
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('ESTRO_PROG_POSITIVE_AHF')} 
                  className="flex-1 md:w-64 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  SIM (Sangrou com Hormônio)
                </button>
                <button 
                  onClick={() => navigate('ESTRO_PROG_NEGATIVE_ASHERMAN')} 
                  className="flex-1 md:w-64 bg-rose-700 hover:bg-rose-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  NÃO (Não Sangrou / Bloqueio Uterino)
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'ESTRO_PROG_POSITIVE_AHF':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="blue" 
              icon={Brain} 
              title="Diagnóstico: AMENORREIA HIPOTALÂMICA FUNCIONAL (AHF) / CAUSA CENTRAL" 
              subtitle="Hipoestrogenismo Severo por Inibição do Pulsador de GnRH"
              text="O endométrio respondeu perfeitamente ao hormônio exógeno. A falha é a falta de estímulo central (GnRH/FSH/LH baixos). Causa #2 mais comum de amenorreia secundária!" 
              badge="Hipogonadotrófico"
            />
            <div className="bg-[#0f172a] border-2 border-[#2563eb] rounded-2xl p-6 text-slate-100 space-y-3">
              <h3 className="font-bold text-lg text-blue-300">Etiologias & Conduta Multidisciplinar:</h3>
              <p>• <strong>Tríade da Atleta / RED-S:</strong> Restrição calórica, déficit energético relativo, atividade física extenuante, perda ponderal grave ou estresse psicogênico.</p>
              <p>• <strong>RM de Crânio/Sela Túrcica:</strong> Descartar lesões expansivas do SNC (Craniofaringiomas, germinomas) se sem fator estressante evidente.</p>
              <p>• <strong>Manejo Estrutural:</strong> Recuperação nutricional (+300-500 kcal/dia) + Adaptação do treino + Apoio psicológico.</p>
              <p>• <strong>Proteção Óssea (Prevenção de Osteoporose):</strong> 17-β Estradiol Transdérmico (50-100 mcg patch) + Progesterona Micronizada (200 mg/dia 12d/mês). <strong>EVITAR ACO ORAIS COM ETINILESTRADIOL PARA TRATAR OSTEOPOROSE NA AHF!</strong> (O etinilestradiol oral reduz IGF-1 hepático e piora o osso).</p>
            </div>
          </motion.div>
        );

      case 'ESTRO_PROG_NEGATIVE_ASHERMAN':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="red" 
              icon={ShieldAlert} 
              title="Diagnóstico: SÍNDROME DE ASHERMAN / OBSTRUÇÃO DO TRATO DE SAÍDA" 
              subtitle="Destruição Endometrial (Sinéquias Intrauterinas) ou Estenose Cervical"
              text="A ausência de sangramento mesmo após receber estrogênio e progesterona confirma que a cavidade uterina está obliterada por cicatrizes/sinéquias ou o canal do colo está estenosado." 
              badge="Causa Uterina"
            />
            <div className="bg-[#450a0a] border-2 border-[#dc2626] rounded-2xl p-6 text-red-100 space-y-3">
              <h3 className="font-bold text-lg text-red-300">Fatores de Risco, Confirmação & Cirurgia:</h3>
              <p>• <strong>Fatores de Risco Clássicos:</strong> Curetagem uterina prévia (especialmente em útero gravídico pós-parto ou pós-aborto), cirurgias uterinas (miomectomia), endometrite grave (Ex: Tuberculose genital).</p>
              <p>• <strong>Exame Diagnóstico Padrão-Ouro:</strong> <strong>Histeroscopia Diagnóstica</strong> (visualização direta das traves fibróticas intrauterinas).</p>
              <p>• <strong>Tratamento Cirúrgico:</strong> Lise cirúrgica histeroscópica das sinéquias + Colocação de Balão/DIU intrauterino temporário + Terapia com Estradiol em dose alta (4-8 mg/dia VO) por 30-60 dias para re-epitelização endometrial.</p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderNode()}
      {history.length > 0 && (
        <div className="flex gap-4 pt-2">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
          >
            <RotateCcw size={14} /> Voltar Etapa
          </button>
          <button 
            onClick={reset}
            className="flex items-center gap-2 bg-[#18181b] hover:bg-[#27272a] text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-[#3f3f46]"
          >
            Reiniciar Algoritmo
          </button>
        </div>
      )}
    </div>
  );
};

export default function AmenorreiaSecundariaMain() {
  const [activeTab, setActiveTab] = useState<'flow' | 'compartments' | 'sop_vs_ahf' | 'matrix' | 'protocols'>('flow');

  return (
    <div className="min-h-screen text-slate-100 p-2 sm:p-4 md:p-6 space-y-6 font-sans">
      {/* HEADER PRINCIPAL */}
      <div className="py-2 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-800/80">
                Residência Médica GO • Especialista
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800/80">
                ASRM & FEBRASGO 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              AMENORREIA SECUNDÁRIA
            </h1>
            <p className="text-sm text-slate-300 font-medium max-w-3xl leading-relaxed">
              Epidemiologia, Fatores de Risco, Raciocínio Anatômico por Compartimento, Algoritmo Laboratorial de 5 Passos e Diferenciação Crítica de Prova (SOP D vs. AHF-PCOM).
            </p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-4 shrink-0">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
              <Stethoscope size={28} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Prevalência Global</p>
              <p className="text-lg font-black text-white">3 – 4% Idade Reprodutiva</p>
              <p className="text-[10px] text-blue-300 font-medium">Pettersson et al. / ASRM Practice</p>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO ENTRE VISÕES */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-5 mt-5 overflow-x-auto no-scrollbar">
          {[
            { id: 'flow', label: '1. Algoritmo de 5 Passos', icon: Activity },
            { id: 'compartments', label: '2. Framework por Compartimento', icon: Layers },
            { id: 'sop_vs_ahf', label: '3. Desafio: SOP D vs. AHF-PCOM', icon: BalanceIcon },
            { id: 'matrix', label: '4. Matriz de Diagnóstico Diferencial', icon: FileText },
            { id: 'protocols', label: '5. Protocolos Terapêuticos & Doses', icon: Pill },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap border",
                activeTab === tab.id
                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20"
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
        {activeTab === 'flow' && (
          <motion.div key="flow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="py-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/60">
                  Fluxograma Vivo • Workup Laboratorial
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  Algoritmo Investigativo Sequencial Passo a Passo
                </h2>
                <p className="text-sm text-slate-300 font-medium max-w-2xl mt-1">
                  Clique nas opções abaixo em cada tomada de decisão para avançar pela cascata hormonal e revelar a conduta e dose exata de tratamento.
                </p>
              </div>
            </div>

            <InteractiveWorkupAlgorithm />
          </motion.div>
        )}

        {activeTab === 'compartments' && (
          <motion.div key="compartments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="blue" 
              icon={Layers} 
              title="Framework Anatômico — Raciocínio por Compartimentos" 
              subtitle="Via Menstrual: Hipotálamo → Hipófise → Ovário → Útero/Endométrio → Trato de Saída"
              text="Pensar por compartimento anatômico, e não por lista solta de diagnósticos, é a abordagem médica recomendada para não omitir etiologias na investigação." 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* COMPARTIMENTO IV */}
              <div className="bg-slate-900/60 border border-blue-600/40 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-blue-600/30 pb-3">
                  <span className="text-xs font-black text-blue-400 uppercase">Compartimento IV</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-700">Hipotálamo</span>
                </div>
                <h3 className="text-lg font-black text-white">Causas Hipotalâmicas</h3>
                <div className="space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-blue-200">• Amenorreia Hipotalâmica Funcional (AHF):</p>
                  <p className="pl-2">• Restrição calórica / Anorexia / Bulimia.</p>
                  <p className="pl-2">• Atividade física extrema (Tríade da Atleta / RED-S).</p>
                  <p className="pl-2">• Estresse psicológico grave (Cortisol elevado suprime GnRH).</p>
                  <p className="font-bold text-blue-200 mt-2">• Síndromes Genéticas Tardias / Infiltrativas:</p>
                  <p className="pl-2">• Sarcoidose, Histiocitose, Hemocromatose.</p>
                </div>
              </div>

              {/* COMPARTIMENTO III */}
              <div className="bg-slate-900/60 border border-purple-600/40 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-purple-600/30 pb-3">
                  <span className="text-xs font-black text-purple-400 uppercase">Compartimento III</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-700">Hipófise</span>
                </div>
                <h3 className="text-lg font-black text-white">Causas Hipofisárias</h3>
                <div className="space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-purple-200">• Hiperprolactinemia & Tumor:</p>
                  <p className="pl-2">• Prolactinoma (Micro & Macroprolactinoma).</p>
                  <p className="pl-2">• Craniofaringioma / Adenomas nulos.</p>
                  <p className="font-bold text-purple-200 mt-2">• Lesões Isquêmicas & Estruturais:</p>
                  <p className="pl-2">• Síndrome de Sheehan (necrose pós-parto por choque hemorrágico).</p>
                  <p className="pl-2">• Síndrome da Sela Vazia / Apoplexia Hipofisária.</p>
                </div>
              </div>

              {/* COMPARTIMENTO II */}
              <div className="bg-slate-900/60 border border-rose-600/40 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-rose-600/30 pb-3">
                  <span className="text-xs font-black text-rose-400 uppercase">Compartimento II</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-700">Ovários</span>
                </div>
                <h3 className="text-lg font-black text-white">Causas Ovarianas</h3>
                <div className="space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-rose-200">• Síndrome dos Ovários Policísticos (SOP):</p>
                  <p className="pl-2">• Causa #1 de amenorreia secundária na população geral.</p>
                  <p className="font-bold text-rose-200 mt-2">• Insuficiência Ovariana Prematura (IOP):</p>
                  <p className="pl-2">• Falência ovariana antes dos 40 anos (FSH &gt; 25-40 UI/L).</p>
                  <p className="pl-2">• Causa autoimune, genética (X frágil) ou iatrogênica (QT/RT).</p>
                  <p className="font-bold text-rose-200 mt-2">• Tumores Virilizantes:</p>
                  <p className="pl-2">• Tumor de Células de Sertoli-Leydig.</p>
                </div>
              </div>

              {/* COMPARTIMENTO I */}
              <div className="bg-slate-900/60 border border-emerald-600/40 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-emerald-600/30 pb-3">
                  <span className="text-xs font-black text-emerald-400 uppercase">Compartimento I</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-700">Útero / Vagina</span>
                </div>
                <h3 className="text-lg font-black text-white">Causas Uterinas & Trato</h3>
                <div className="space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-emerald-200">• Síndrome de Asherman:</p>
                  <p className="pl-2">• Sinéquias intrauterinas pós-curetagem / infecção.</p>
                  <p className="pl-2">• Eixo hormonal totalmente intacto, mas sem endométrio.</p>
                  <p className="font-bold text-emerald-200 mt-2">• Estenose Cervical Adquirida:</p>
                  <p className="pl-2">• Pós-procedimentos de colo (LEEP, conização, cauterização).</p>
                  <p className="pl-2">• Pode cursar com hematometra / dor cíclica.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'sop_vs_ahf' && (
          <motion.div key="sop_vs_ahf" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="amber" 
              icon={BalanceIcon} 
              title="PONTO DE PROVA CRÍTICO: SOP Fenótipo D vs. AHF com Morfologia Policística (AHF-PCOM)" 
              subtitle="O Diferencial Mais Desafiador da Ginecologia Endócrina"
              text="As duas causas mais frequentes de amenorreia secundária — SOP e AHF — podem apresentar aspecto ultrassonográfico EXATAMENTE IDÊNTICO. A distinção exige avaliação hormonal e do estado energético." 
              badge="Pegadinha de Prova"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CARD SOP FENÓTIPO D */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-purple-800/60 rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
                  <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Perfil Endócrino 1</span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-950 text-purple-200 border border-purple-700">SOP Fenótipo D (Não-Androgênico)</span>
                </div>
                <h3 className="text-xl font-black text-white">SOP Fenótipo D</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Apresenta Oligo/Anovulação + Morfologia Policística ao USG (PCOM), mas SEM hiperandrogenismo clínico ou laboratorial proeminente.
                </p>
                <div className="bg-[#2e1065] p-4 rounded-2xl border border-purple-700/60 text-xs space-y-2 text-purple-100">
                  <strong className="text-purple-300 block">Marcadores Hormonais Característicos:</strong>
                  <p>• <strong>LH Sérico:</strong> ELEVADO (Relação LH/FSH &gt; 2,0).</p>
                  <p>• <strong>Estradiol (E2):</strong> Preservado / Normal (estrogênio presente).</p>
                  <p>• <strong>Testosterona Sérica:</strong> No limite superior do normal ou discretamente elevada.</p>
                  <p>• <strong>SHBG Hepática:</strong> Baixa ou Normal (Resistência insulínica).</p>
                  <p>• <strong>Teste da Progesterona:</strong> POSITIVO (Sangra!).</p>
                </div>
                <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/60 text-xs text-emerald-200">
                  <strong>Conduta:</strong> Controle metabólico, proteção endometrial (CHC/progestágeno) e reeducação alimentar.
                </div>
              </div>

              {/* CARD AHF-PCOM */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-blue-800/60 rounded-3xl p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-blue-800/40 pb-3">
                  <span className="text-xs font-black text-blue-400 uppercase tracking-wider">Perfil Endócrino 2</span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-950 text-blue-200 border border-blue-700">AHF com Aspecto Policístico (AHF-PCOM)</span>
                </div>
                <h3 className="text-xl font-black text-white">AHF-PCOM (Amenorreia Hipotalâmica)</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  O hipoestrogenismo prolongado impede a maturação folicular, acumulando folículos antrais pequenos e mimetizando PCOM ao USG em mulheres magras/atletas.
                </p>
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-blue-700/60 text-xs space-y-2 text-blue-100">
                  <strong className="text-blue-300 block">Marcadores Hormonais Característicos:</strong>
                  <p>• <strong>LH Sérico:</strong> MUITO BAIXO (&lt; 2,0 UI/L) ou inapropriadamente normal.</p>
                  <p>• <strong>Estradiol (E2):</strong> INDETECTÁVEL / MUITO BAIXO (&lt; 20 pg/mL).</p>
                  <p>• <strong>Testosterona Sérica:</strong> Baixa ou Normal baixa.</p>
                  <p>• <strong>SHBG Hepática:</strong> Elevada (por restrição calórica/baixo peso).</p>
                  <p>• <strong>Teste da Progesterona:</strong> NEGATIVO (Não sangra!).</p>
                </div>
                <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-800/60 text-xs text-amber-200">
                  <strong>Conduta (Oposta!):</strong> Reabilitação calórica (+300-500 kcal/dia), redução do exercício e TRH transdérmica. <strong>PROIBIDO restringir calorias!</strong>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'matrix' && (
          <motion.div key="matrix" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 overflow-x-auto shadow-2xl">
              <h4 className="font-black text-blue-300 text-base mb-4 uppercase tracking-wider flex items-center gap-2">
                <FileText size={18} /> Matriz Comparativa Completa das 10 Etiologias Principais de Amenorreia Secundária
              </h4>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#27272a] text-slate-200 uppercase text-[10px] tracking-wider">
                    <th className="p-3 font-extrabold">Etiologia Nosológica</th>
                    <th className="p-3 font-extrabold">FSH / LH</th>
                    <th className="p-3 font-extrabold">Estradiol (E2)</th>
                    <th className="p-3 font-extrabold">Teste Progesterona</th>
                    <th className="p-3 font-extrabold">Exame Definidor Chave</th>
                    <th className="p-3 font-extrabold">Tratamento Inegociável</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-slate-200">
                  <tr>
                    <td className="p-3 font-black text-white">1. SOP (#1 Causa)</td>
                    <td className="p-3 text-purple-300 font-bold">LH Elevado (LH/FSH &gt; 2)</td>
                    <td className="p-3 text-emerald-400">Normal / Preservado</td>
                    <td className="p-3 text-emerald-400 font-black">POSITIVO (+)</td>
                    <td className="p-3">Critérios Rotterdam (2/3)</td>
                    <td className="p-3 text-blue-300">Estilo de Vida + CHC antiandrogênico / Letrozole</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">2. AHF (#2 Causa)</td>
                    <td className="p-3 text-blue-300 font-bold">FSH e LH Baixos (&lt;2 UI/L)</td>
                    <td className="p-3 text-rose-400 font-bold">MUITO BAIXO (&lt;20 pg/mL)</td>
                    <td className="p-3 text-rose-400 font-black">NEGATIVO (-)</td>
                    <td className="p-3">Anamnese Nutricional + RM Crânio</td>
                    <td className="p-3 text-emerald-300">Recuperação Calórica + Estradiol Transdérmico 50-100mcg</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">3. Hiperprolactinemia</td>
                    <td className="p-3 text-blue-300">LH/FSH Baixos-Normais</td>
                    <td className="p-3 text-rose-300">Baixo / Moderado</td>
                    <td className="p-3 text-amber-300 font-bold">Geralmente Negativo</td>
                    <td className="p-3 text-purple-300 font-bold">Prolactina Sérica + RM Sela</td>
                    <td className="p-3 text-purple-300 font-bold">Cabergolina 0,5 mg/semana VO</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">4. IOP (Falência Ovariana)</td>
                    <td className="p-3 text-rose-400 font-black">FSH ELEVADO (&gt; 25-40 UI/L)</td>
                    <td className="p-3 text-rose-400 font-bold">Indetectável</td>
                    <td className="p-3 text-rose-400 font-black">NEGATIVO (-)</td>
                    <td className="p-3 text-rose-300 font-bold">FSH em 2 amostras + Cariótipo</td>
                    <td className="p-3 text-rose-300 font-bold">TRH Hormonal completa até os 50 anos</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">5. Hipotireoidismo Primário</td>
                    <td className="p-3">Normais</td>
                    <td className="p-3">Normal</td>
                    <td className="p-3 text-emerald-400">Pode ser Positivo</td>
                    <td className="p-3 text-amber-300 font-bold">TSH Elevado + T4L Baixo</td>
                    <td className="p-3 text-amber-300 font-bold">Levotiroxina 1,6 mcg/kg/dia VO em jejum</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">6. Amenorreia Pós-Pílula</td>
                    <td className="p-3">Eixo em recuperação</td>
                    <td className="p-3">Variável</td>
                    <td className="p-3">Variável</td>
                    <td className="p-3">Desmistificar! Não há causalidade</td>
                    <td className="p-3">Aguardar 90 dias. Se persistir, investigar AHF ou SOP de base</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">7. Síndrome de Asherman</td>
                    <td className="p-3 text-emerald-400 font-bold">FSH / LH Normais</td>
                    <td className="p-3 text-emerald-400 font-bold">Normal (Ovários ovulam!)</td>
                    <td className="p-3 text-rose-400 font-black">NEGATIVO (-) [Mesmo c/ E+P!]</td>
                    <td className="p-3 text-red-400 font-bold">Histeroscopia Diagnóstica</td>
                    <td className="p-3 text-red-300 font-bold">Lise histeroscópica + Balão + Estradiol dose alta</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">8. Estenose Cervical</td>
                    <td className="p-3 text-emerald-400">Normais</td>
                    <td className="p-3 text-emerald-400">Normal</td>
                    <td className="p-3 text-rose-400">NEGATIVO (-)</td>
                    <td className="p-3">Exame Especular / USG (Hematometra)</td>
                    <td className="p-3">Dilatação cervical instrumental</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">9. HAC Não Clássica</td>
                    <td className="p-3">Normais</td>
                    <td className="p-3">Normal</td>
                    <td className="p-3 text-emerald-400">Positivo (+)</td>
                    <td className="p-3 text-purple-300 font-bold">17-OH-Progesterona &gt; 200 ng/dL</td>
                    <td className="p-3">Glucocorticoide / CHC antiandrogênico</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-white">10. Tumor Virilizante / Cushing</td>
                    <td className="p-3 text-rose-300">LH/FSH suprimidos por androgenio</td>
                    <td className="p-3">Variável</td>
                    <td className="p-3">Variável</td>
                    <td className="p-3 text-rose-400 font-bold">Testosterona &gt;150-200 ou DHEA-S &gt;700</td>
                    <td className="p-3 text-rose-400 font-bold">Mapeamento por Imagem + Cirurgia de ressecção</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'protocols' && (
          <motion.div key="protocols" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <Balloon 
              color="green" 
              icon={Pill} 
              title="Guia Completo de Prescrição Farmacológica — Doses, Vias e Monitoramento" 
              subtitle="Diretrizes FEBRASGO & ASRM com Raciocínio de Prova"
              text="Todas as prescrições devem acompanhar a dose exata, via de administração, tempo de titulação e exames de segurança." 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* HIPOTIREOIDISMO */}
              <div className="bg-slate-900/60 border border-amber-600/50 rounded-3xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-amber-600/30 pb-2">
                  <h4 className="font-extrabold text-amber-300 text-base">Hipotireoidismo Primário</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-950 text-amber-200">Repositor Hormonal</span>
                </div>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>Medicação:</strong> Levotiroxina Sódica (T4 sintético).</p>
                  <p>• <strong>Dose de Início:</strong> 1,6 mcg/kg/dia VO (em jejum, 30-60 min antes do café da manhã).</p>
                  <p>• <strong>Ajuste & Monitoramento:</strong> Dosar TSH e T4L em 6 a 8 semanas. Meta TSH entre 0,5 e 2,5 mIU/L.</p>
                </div>
              </div>

              {/* CABERGOLINA */}
              <div className="bg-slate-900/60 border border-purple-600/50 rounded-3xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-purple-600/30 pb-2">
                  <h4 className="font-extrabold text-purple-300 text-base">Hiperprolactinemia / Prolactinoma</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-950 text-purple-200">Agonista Dopaminérgico</span>
                </div>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>1ª Linha:</strong> Cabergolina 0,5 mg VO por semana (pode ser administrada 0,25 mg 2x/semana nas refeições para reduzir náuseas).</p>
                  <p>• <strong>Titulação:</strong> Escalar até 1,0-2,0 mg/semana se prolactina persistir elevada após 4 semanas.</p>
                  <p>• <strong>2ª Linha:</strong> Bromocriptina 2,5 mg/dia VO (fracionado em 1,25 mg 2x/dia com alimento).</p>
                </div>
              </div>

              {/* IOP TRH */}
              <div className="bg-slate-900/60 border border-rose-600/50 rounded-3xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-rose-600/30 pb-2">
                  <h4 className="font-extrabold text-rose-300 text-base">TRH na IOP (Falência Ovariana)</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-950 text-rose-200">Esquema Combinado</span>
                </div>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>Estrogênio Transdérmico (Preferido):</strong> 17-β Estradiol Patch 50 - 100 mcg/dia trocado 2x/semana OU Estradiol Gel 1,5 mg/dia.</p>
                  <p>• <strong>Estrogênio Oral (Opção):</strong> Valerato de Estradiol 2,0 mg/dia VO contínuo.</p>
                  <p>• <strong>Progesterona Proteção Endometrial:</strong> Progesterona Micronizada 200 mg/dia VO ao deitar por 12-14 dias/mês.</p>
                  <p>• <strong>Duração:</strong> Manter obrigatoriamente até a idade média da menopausa (~50 anos).</p>
                </div>
              </div>

              {/* AHF TRH */}
              <div className="bg-slate-900/60 border border-blue-600/50 rounded-3xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-blue-600/30 pb-2">
                  <h4 className="font-extrabold text-blue-300 text-base">Proteção Óssea na AHF (RED-S)</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-950 text-blue-200">Proteção de Massa Óssea</span>
                </div>
                <div className="text-xs space-y-2 text-slate-200">
                  <p>• <strong>Estrogênio Fisiológico:</strong> 17-β Estradiol Transdérmico Patch 50-100 mcg/dia.</p>
                  <p>• <strong>Progestágeno:</strong> Progesterona Micronizada 100-200 mg/dia VO por 12 a 14 dias no mês.</p>
                  <p>• <strong>Contraindicação Crítica:</strong> NÃO usar pílula anticoncepcional oral combinada (CHC) contendo Etinilestradiol para tratar baixa densidade mineral óssea na AHF! (Etinilestradiol oral suprime IGF-1 e prejudica a formação óssea).</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
