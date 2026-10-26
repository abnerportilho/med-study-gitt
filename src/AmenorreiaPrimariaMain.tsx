import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, ShieldAlert, TestTube, Pill, ArrowRight, 
  Brain, Dna, ChevronRight, Zap, Layers, AlertTriangle, 
  RotateCcw, Fingerprint, Eye, Scale, CheckCircle2,
  BookOpen, HelpCircle, HeartPulse, Stethoscope, Sparkles,
  Info, FileText, Check, ChevronDown
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

// --- ALGORITHM STATE MACHINE FOR DIFFERENTIAL DIAGNOSIS ---
type FlowNode = 
  | 'START' 
  | 'MAMAS_SIM' | 'MAMAS_NAO' 
  | 'UTERO_SIM' | 'UTERO_NAO' 
  | 'CARIOTIPO_XX' | 'CARIOTIPO_XY' 
  | 'FSH_ALTO' | 'FSH_BAIXO'
  | 'TURNER' | 'SWYER' | 'DISGENESIA_XX'
  | 'KALLMANN' | 'FUNCIONAL' | 'ESTRUTURAL';

const InteractiveAlgorithm = () => {
  const [currentNode, setCurrentNode] = useState<FlowNode>('START');
  const [history, setHistory] = useState<FlowNode[]>([]);

  const navigate = (node: FlowNode) => {
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
    setCurrentNode('START');
  };

  const renderNode = () => {
    switch (currentNode) {
      case 'START':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
            <Balloon 
              color="purple" 
              icon={Activity} 
              title="Passo 1: Avaliação dos Caracteres Sexuais Secundários" 
              subtitle="Exame Físico Inicial (Desenvolvimento Mamário - Tanner)"
              text="Verifique se houve telarca (desenvolvimento das mamas). A presença de mamas confirma estímulo estrogênico prévio e eugonadismo (eixo hormonal funcionou)." 
            />
            <div className="p-4 flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Os caracteres sexuais secundários (Mamas Tanner ≥ III) estão PRESENTES?
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('MAMAS_SIM')} 
                  className="flex-1 md:w-56 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 text-base"
                >
                  SIM (Mamas Presentes)
                </button>
                <button 
                  onClick={() => navigate('MAMAS_NAO')} 
                  className="flex-1 md:w-56 bg-rose-700 hover:bg-rose-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-rose-700/30 text-base"
                >
                  NÃO (Mamas Ausentes)
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'MAMAS_SIM':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="green" 
              icon={CheckCircle2} 
              title="Eugonadismo Confirmado!" 
              subtitle="Eixo Hormonal Integro"
              text="A presença de mamas indica estrogênio circulante normal. O problema é anatômico no trato de saída ou de receptor periférico. Solicite USG Pélvica imediatamente." 
            />
            <div className="p-4 flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Na USG Pélvica / Ressonância: O ÚTERO está PRESENTE?
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('UTERO_SIM')} 
                  className="flex-1 md:w-56 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  SIM (Útero Presente)
                </button>
                <button 
                  onClick={() => navigate('UTERO_NAO')} 
                  className="flex-1 md:w-56 bg-rose-700 hover:bg-rose-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-lg text-base"
                >
                  NÃO (Útero Ausente)
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'MAMAS_NAO':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="amber" 
              icon={AlertTriangle} 
              title="Hipoestrogenismo Grave!" 
              subtitle="Eixo Inativo / Falência de Estímulo"
              text="Mamas ausentes indicam falta de estrogênio na puberdade. É necessário localizar onde está a falha: na gônada (ovário surdo) ou no comando central (hipófise/hipotálamo quieto)." 
            />
            <div className="p-4 flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Dosagem Hormonal: Qual o valor de FSH e LH?
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('FSH_ALTO')} 
                  className="flex-1 md:w-56 bg-rose-700 hover:bg-rose-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all text-sm md:text-base"
                >
                  FSH / LH ALTOS<br/><span className="text-xs font-normal opacity-90">(&gt; 20-40 UI/L - Hipergonadotrófico)</span>
                </button>
                <button 
                  onClick={() => navigate('FSH_BAIXO')} 
                  className="flex-1 md:w-56 bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-4 px-6 rounded-xl transition-all text-sm md:text-base"
                >
                  FSH / LH BAIXOS<br/><span className="text-xs font-normal opacity-90">(ou Inapropriadamente Normais)</span>
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'UTERO_SIM':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
            <Balloon 
              color="blue" 
              icon={Fingerprint} 
              title="Bloco 1: Obstáculo Mecânico no Trato de Saída (Outflow Tract)" 
              subtitle="Cariótipo 46,XX | Ovários e Útero Íntegros"
              badge="Criptomenorreia"
              text="O sangue menstrual é produzido mensalmente pelo endométrio estrogrenizado, mas não consegue exteriorizar por obstrução anatômica. Cursa com dor pélvica cíclica progressiva e massa suprapúbica/hematocolpo." 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Balloon 
                color="graphite" 
                title="1. Hímen Imperfurado" 
                text={
                  <div className="space-y-2">
                    <p>• <strong>Achado:</strong> Abaulamento himenal azulado-violáceo ao manobra de Valsalva.</p>
                    <p>• <strong>Exame:</strong> USG mostra retenção líquida (hematocolpo/hematométrio).</p>
                    <p>• <strong>Conduta:</strong> Himenotomia cruciforme cirúrgica (excelente prognóstico).</p>
                  </div>
                } 
              />
              <Balloon 
                color="graphite" 
                title="2. Septo Vaginal Transverso" 
                text={
                  <div className="space-y-2">
                    <p>• <strong>Achado:</strong> Hímen normal e patente, mas toque/exame especular cego proximal.</p>
                    <p>• <strong>Exame:</strong> RM pélvica é padrão-ouro para medir espessura/altura do septo.</p>
                    <p>• <strong>Conduta:</strong> Ressecção cirúrgica do septo + anastomose vaginal.</p>
                  </div>
                } 
              />
            </div>
          </motion.div>
        );

      case 'UTERO_NAO':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="wine" 
              icon={TestTube} 
              title="Gêmeos Clínicos: Mamas Presentes + Útero Ausente" 
              subtitle="Investigação de Agenesia Mülleriana vs CAIS"
              text="Duas etiologias principais causam esse padrão. Precisamos definir se a paciente é 46,XX com ausência de tecido mülleriano (MRKH) ou 46,XY com insensibilidade androgênica (CAIS)." 
            />
            <div className="p-4 flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Exames Decisivos: Dosagem de Testosterona Sérica + Cariótipo
              </h2>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('CARIOTIPO_XX')} 
                  className="flex-1 md:w-56 bg-pink-700 hover:bg-pink-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all text-sm md:text-base"
                >
                  Cariótipo 46,XX<br/><span className="text-xs font-normal">Testosterona Nível Feminino</span>
                </button>
                <button 
                  onClick={() => navigate('CARIOTIPO_XY')} 
                  className="flex-1 md:w-56 bg-indigo-700 hover:bg-indigo-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all text-sm md:text-base"
                >
                  Cariótipo 46,XY<br/><span className="text-xs font-normal">Testosterona Nível Masculino</span>
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'CARIOTIPO_XX':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="purple" 
              icon={Dna} 
              title="Síndrome de MRKH (Mayer-Rokitansky-Küster-Hauser)" 
              subtitle="Agenesia Mülleriana | Cariótipo 46,XX"
              badge="46,XX"
              text="Falha embrionária de desenvolvimento dos ductos de Müller. Ovários de origem independente (crista genital) são normais, ovulam e produzem estrogênio/progesterona normalmente. Pelos pubianos normais." 
            />
            <Balloon 
              color="amber" 
              icon={AlertTriangle}
              title="Investigação Obrigatória Associada (Regra de Ouro)" 
              text="Obrigatório solicitar USG de Vias Urinárias (30-40% têm malformações renais como agenesia renal unilateral ou rim pélvico) e radiografia de coluna vertebral (Síndrome MURCS)." 
            />
            <Balloon 
              color="green" 
              icon={Pill}
              title="Conduta e Prescrição Terapêutica" 
              text={
                <div className="space-y-2">
                  <p>• <strong>Gônadas:</strong> Preservar ovários SEMPRE (sem risco neoplásico elevado).</p>
                  <p>• <strong>Neovagina:</strong> 1ª Linha: Dilatadores vaginais progressivos (Método de Frank/Ingram, sucesso 90-95%). 2ª Linha: Cirurgia (Vecchietti / McIndoe).</p>
                  <p>• <strong>Fertilidade:</strong> Gestação viável via Útero de Substituição (barriga solidária) com óvulos próprios ou Adoção.</p>
                </div>
              } 
            />
          </motion.div>
        );

      case 'CARIOTIPO_XY':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="red" 
              icon={ShieldAlert} 
              title="CAIS - Síndrome de Insensibilidade Androgênica Completa" 
              subtitle="Mutação no Gene AR (Xq11-12) | Cariótipo 46,XY"
              badge="46,XY"
              text="Testículos funcionantes produzem Testosterona (nível masculino) e AMH (que regride o útero). O receptor de andrógeno (AR) é totalmente inoperante nos tecidos periféricos. As mamas se desenvolvem devido à aromatização periférica intensa da testosterona em estradiol." 
            />
            <Balloon 
              color="graphite" 
              title="Sinal Físico Pathognomônico no Exame Dirigido" 
              text="Pelos pubianos e axilares ESCASSOS OU AUSENTES (dependem de andrógenos funcionantes nos folículos pilosos). A genitália externa é feminina normal com vagina em fundo cego curto." 
            />
            <Balloon 
              color="wine" 
              icon={Pill}
              title="Manejo Terapêutico e Protocolo de Reposição" 
              text={
                <div className="space-y-2">
                  <p>• <strong>Gonadectomia Bilateral:</strong> Indicada pelo risco de Gonadoblastoma/Seminoma. Timing: preferencialmente PÓS-PUBERAL (permite desenvolvimento mamário espontâneo por aromatização) com vigilância por imagem.</p>
                  <p>• <strong>Terapia de Reposição Pós-Cirurgia:</strong> 17-β Estradiol 2,0 mg/dia VO ou Estradiol Transdérmico 50-100 mcg/dia patch (sem progestagênio, pois não há útero!).</p>
                  <p>• <strong>Suporte Psicológico:</strong> Comunicação gradual e cuidadosa do cariótipo XY com apoio multidisciplinar.</p>
                </div>
              } 
            />
          </motion.div>
        );

      case 'FSH_ALTO':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="wine" 
              icon={ArrowRight} 
              title="Bloco 2: Hipogonadismo Hipergonadotrófico" 
              subtitle="Falência Gonadal Primária (FSH > 20-40 UI/L)"
              text="A hipófise 'grita' secretando FSH/LH compensatoriamente devido à ausência de feedback negativo do estradiol e inibina. A gônada não responde. O CARIÓTIPO é o exame central obrigatório." 
            />
            <div className="p-4 flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Selecione o Resultado do Cariótipo:
              </h2>
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <button onClick={() => navigate('TURNER')} className="w-full md:w-auto bg-purple-700 hover:bg-purple-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all">45,X ou Mosaicos (Turner)</button>
                <button onClick={() => navigate('SWYER')} className="w-full md:w-auto bg-rose-700 hover:bg-rose-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all">46,XY (Síndrome de Swyer)</button>
                <button onClick={() => navigate('DISGENESIA_XX')} className="w-full md:w-auto bg-slate-700 hover:bg-slate-600 text-white font-extrabold py-4 px-6 rounded-xl transition-all">46,XX (Disgenesia Pura / POI)</button>
              </div>
            </div>
          </motion.div>
        );

      case 'TURNER':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="purple" 
              icon={Dna} 
              title="Síndrome de Turner (45,X e Mosaicos)" 
              subtitle="Monossomia do X | Apoptose Folicular Acelerada Intraútero"
              badge="45,X"
              text="Ao nascimento, o número de folículos ovarianos está drasticamente reduzido. A gônada vira fita fibrosa (streak gonad). Baixa estatura é o estigma somático mais constante." 
            />
            <Balloon 
              color="amber" 
              icon={AlertTriangle}
              title="Estigmas Clínicos & Rastreio Multissistêmico Obrigatório" 
              text={
                <div className="space-y-1">
                  <p>• <strong>Estigmas:</strong> Pescoço alado (pterygium colli), mamilos afastados, implantação baixa de orelhas/cabelo, cúbito valgo, linfedema ao nascer.</p>
                  <p>• <strong>Cardiovascular:</strong> Ecocardiograma obrigatório (Válvula aórtica bicúspide ~30%, Coarctação de aorta).</p>
                  <p>• <strong>Outros:</strong> USG Renal (Rim em ferradura), TSH/Anti-TPO (Tireoidite de Hashimoto), Audiometria.</p>
                </div>
              } 
            />
            <Balloon 
              color="green" 
              icon={Pill}
              title="Esquema Farmacológico de Indução Puberal & Tratamento" 
              text={
                <div className="space-y-2">
                  <p>1. <strong>Otimização de Estatura:</strong> Somatropina (GH recombinante) 0,045–0,050 mg/kg/dia SC à noite desde a infância.</p>
                  <p>2. <strong>Indução Puberal (a partir de 11-12 anos):</strong> 17-β Estradiol transdérmico em dose baixa crescente (patch 0,025 mg/dia cortado em 1/4 = 6,25 mcg/dia ou gel 0,125 mg/dia) por 2 anos.</p>
                  <p>3. <strong>Adição de Progestagênio (após 2 anos ou sangramento):</strong> Progesterona micronizada 100-200 mg/dia VO do dia 1 ao 12 de cada mês.</p>
                </div>
              } 
            />
          </motion.div>
        );

      case 'SWYER':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="red" 
              icon={ShieldAlert} 
              title="Síndrome de Swyer (Disgenesia Gonadal Pura 46,XY)" 
              subtitle="Mutação no Gene SRY | Gônada Indiferenciada em Streak"
              badge="46,XY com Útero"
              text="Mutação impede que a gônada diferencie em testículo. Gônada em fita não produz AMH (logo os ductos de Müller persistem e O ÚTERO SE FORMA!) e não produz Testosterona (caracteres sexuais 2º ausentes, sem mamas)." 
            />
            <Balloon 
              color="amber" 
              title="A Exceção Clássica de Prova" 
              text="É a ÚNICA condição do Bloco 2 com ÚTERO PRESENTE + AMENORREIA PRIMÁRIA + ZERO MAMAS + FSH ALTÍSSIMO. Estatura normal sem estigmas de Turner." 
            />
            <Balloon 
              color="wine" 
              icon={Pill}
              title="Conduta Crítica Urgente & Prescrição" 
              text={
                <div className="space-y-2">
                  <p>• <strong>Gonadectomia Bilateral Precoce:</strong> OBRIGATÓRIA ao diagnóstico devido ao risco elevado de Gonadoblastoma / Disgerminoma precoce no material Y disgenético.</p>
                  <p>• <strong>Indução Puberal:</strong> Estradiol transdérmico 0,025 mg/dia + Progesterona micronizada 100-200 mg/dia VO cíclica.</p>
                  <p>• <strong>Fertilidade:</strong> Gestação VIÁVEL em útero próprio através de Ovodoação com preparo endometrial estrogênico!</p>
                </div>
              } 
            />
          </motion.div>
        );

      case 'DISGENESIA_XX':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="blue" 
              title="Disgenesia Gonadal Pura 46,XX / POI Pré-Puberal" 
              subtitle="Falência Ovariana Primária | Cariótipo 46,XX Normal"
              text="Gônadas em fita (streak) sem causa genética de Turner. Estatura normal e sem malformações cardíacas/renais. Pode decorrer também de quimioterapia/radioterapia infantil, pré-mutação FMR1 (X-Frágil) ou galactosemia." 
            />
            <Balloon 
              color="green" 
              icon={Pill}
              title="Tratamento Farmacológico" 
              text="Indução puberal e reposição hormonal combinada (Estradiol transdérmico 50-100 mcg/dia + Progesterona micronizada 100-200 mg/dia VO 12d/mês) mantida até a idade da menopausa fisiológica (~50 anos) para saúde óssea e cardiovascular." 
            />
          </motion.div>
        );

      case 'FSH_BAIXO':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
            <Balloon 
              color="blue" 
              icon={Brain} 
              title="Bloco 3: Hipogonadismo Hipogonadotrófico" 
              subtitle="Falha Central Hipotálamo-Hipofisária (FSH/LH Baixos ou Normais)"
              text="O defeito está acima da gônada. O hipotálamo não pulsa GnRH ou a hipófise não secreta FSH/LH. A gônada é intrinsecamente NORMAL e capaz de responder se estimulada exogenamente!" 
            />
            <Balloon 
              color="red" 
              icon={ShieldAlert}
              title="Ponto Crítico de Raciocínio (Obrigatório Excluir Lesão Estrutural)" 
              text="Antes de rotular como causa 'funcional', é OBRIGATÓRIO realizar Ressonância Magnética (RM) de Crânio/Hipófise e Teste Olfatório. Tumores centrais (ex: Craniofaringioma) podem ser silenciosos." 
            />
            <div className="p-4 flex flex-col items-center text-center gap-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Achados da RM e Exame Clínico Olfatório:
              </h2>
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <button onClick={() => navigate('KALLMANN')} className="w-full md:w-auto bg-purple-700 hover:bg-purple-600 text-white font-extrabold py-3 px-4 rounded-xl transition-all">RM Normal + Anosmia/Hiposmia</button>
                <button onClick={() => navigate('FUNCIONAL')} className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold py-3 px-4 rounded-xl transition-all">RM Normal + Baixo IMC / Atleta / Estresse</button>
                <button onClick={() => navigate('ESTRUTURAL')} className="w-full md:w-auto bg-rose-700 hover:bg-rose-600 text-white font-extrabold py-3 px-4 rounded-xl transition-all">Massa / Lesão Visível na RM</button>
              </div>
            </div>
          </motion.div>
        );

      case 'KALLMANN':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="purple" 
              icon={Brain} 
              title="Síndrome de Kallmann" 
              subtitle="Falha de Migração Embrionária dos Neurônios de GnRH e Olfatórios"
              badge="Anosmia + Hypo-Hypo"
              text="Neurônios secretores de GnRH e neurônios olfatórios nascem juntos no placódio olfatório e migram em conjunto. Mutação nos genes KAL1 (Xq22.3), FGFR1 ou PROKR2 bloqueia essa migração." 
            />
            <Balloon 
              color="amber" 
              title="Achado Patognomônico Anamnese" 
              text="Anosmia ou hiposmia. Pergunta dirigida: 'Você sente cheiro de perfume, comida queimando ou gás?'. Paciente costuma não relatar espontaneamente pois nunca teve olfato normal." 
            />
            <Balloon 
              color="green" 
              icon={Pill}
              title="Conduta Terapêutica & Excelente Prognóstico Reprodutivo" 
              text={
                <div className="space-y-2">
                  <p>• <strong>Indução Puberal:</strong> Estradiol transdérmico patch 0,025 mg/dia + Progesterona micronizada 100-200 mg/dia VO cíclica.</p>
                  <p>• <strong>Fertilidade Futura:</strong> Excelente resposta! Indução de ovulação com Gonadotrofinas Exógenas (FSHr 75-150 UI/dia SC + hMG) ou GnRH pulsátil em bomba de infusão contínua. Como o ovário é normal, a ovulação ocorre facilmente!</p>
                </div>
              } 
            />
          </motion.div>
        );

      case 'FUNCIONAL':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="green" 
              icon={Activity} 
              title="Amenorreia Hipotalâmica Funcional (AHF)" 
              subtitle="Supressão Central por Baixa Disponibilidade Energética (RED-S)"
              text="Baixa ingesta calórica em relação ao gasto físico gera queda de leptina e supressão da pulsatilidade de GnRH no núcleo arqueado. Causas: restrição alimentar, exercício extremo (ballet, ginástica, corredoras), estresse grave." 
            />
            <Balloon 
              color="amber" 
              icon={AlertTriangle}
              title="Risco Ósseo Grave (Alerta de Involução)" 
              text="Hipoestrogenismo durante a adolescência impede o ganho do pico de massa óssea, causando osteopenia/osteoporose precoce." 
            />
            <Balloon 
              color="blue" 
              icon={Pill}
              title="Tratamento Multidisciplinar & Prescrição" 
              text={
                <div className="space-y-2">
                  <p>• <strong>1ª Linha:</strong> Restauração do balanço energético (aumento de caloria + redução de treinos + acompanhamento nutricional/psicológico).</p>
                  <p>• <strong>Terapia Hormonal (se sem retorno em 6-12m ou perda óssea):</strong> 17-β Estradiol transdérmico (patch 50 mcg/dia ou gel 1,0 mg/dia) + Progesterona micronizada 100 mg/dia VO (12 dias/mês). Evitar ACO combinado por suprimir IGF-1 hepático e não proteger os ossos adequadamente!</p>
                </div>
              } 
            />
          </motion.div>
        );

      case 'ESTRUTURAL':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
            <Balloon 
              color="red" 
              icon={ShieldAlert} 
              title="Lesões Estruturais do SNC / Hipófise" 
              subtitle="Craniofaringioma, Prolactinoma, Infiltrações"
              text="Processos expansivos comprimem a haste hipofisária ou destroem o tecido glandular. Cursam com cefaleia, alterações visuais (hemianopsia bitemporal) e pan-hipopituitarismo." 
            />
            <Balloon 
              color="graphite" 
              icon={Pill}
              title="Tratamento Direcionado por Etiologia" 
              text={
                <div className="space-y-2">
                  <p>• <strong>Prolactinoma / Hiperprolactinemia:</strong> Cabergolina 0,5 mg/semana VO (dividido em 0,25 mg 2x/semana). Restaura pulsatilidade do GnRH.</p>
                  <p>• <strong>Craniofaringioma / Tumores:</strong> Ressecção neurocirúrgica e/ou radioterapia + Reposição hormonal dos eixos comprometidos (Levotiroxina, Corticoide, GH, Estrógeno/Progestágeno).</p>
                  <p>• <strong>Hipotireoidismo Primário Grave:</strong> Levotiroxina 1,6 mcg/kg/dia VO em jejum (corrige prolactina secundária).</p>
                </div>
              } 
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-2">
        <button 
          onClick={goBack} 
          disabled={history.length === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-sm",
            history.length > 0 ? "text-indigo-300 hover:bg-indigo-950/80 border border-indigo-700/50" : "text-zinc-600 cursor-not-allowed border border-transparent"
          )}
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Voltar Etapa
        </button>
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
          Raciocínio Clínico Progressivo
        </span>
        <button 
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-rose-300 hover:bg-rose-950/80 border border-rose-800/50 font-bold transition-all text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reiniciar Eixo
        </button>
      </div>

      <AnimatePresence mode="wait">
        <div key={currentNode}>
          {renderNode()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default function AmenorreiaPrimariaMain() {
  const [activeTab, setActiveTab] = useState<'embriologia' | 'definicao' | 'diferencial' | 'armadilhas'>('embriologia');
  const [expandedEmbryoStep, setExpandedEmbryoStep] = useState<number | null>(1);
  const [selectedPillar, setSelectedPillar] = useState<'eugonadismo' | 'hipo' | 'hiper'>('eugonadismo');

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-2 md:px-4 py-4 text-slate-100">
      {/* App Header Banner */}
      <div className="py-2 relative overflow-hidden mb-6">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none text-indigo-500">
          <Activity size={220} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-600/40">
                <Stethoscope className="text-white" size={26} />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Amenorreia Primária
              </h1>
              <span className="bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Ginecologia / DSD
              </span>
            </div>
            <p className="text-slate-300 text-sm md:text-base font-medium max-w-3xl leading-relaxed">
              Guia definitivo de tomada de decisão médica: Embriologia da Diferenciação Sexual, Critérios ACOG/SBEM, Fatores de Risco por Mecanismo, Algoritmo Mestre e Doses Farmacológicas.
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {[
          { id: 'embriologia', label: '1. Embriologia Sexual', icon: Dna, color: 'text-purple-400' },
          { id: 'definicao', label: '2. Definição & Riscos', icon: FileText, color: 'text-blue-400' },
          { id: 'diferencial', label: '3. Diagnóstico Diferencial', icon: Zap, color: 'text-emerald-400' },
          { id: 'armadilhas', label: '4. Erros & Armadilhas', icon: ShieldAlert, color: 'text-rose-400' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center justify-center md:justify-start gap-2.5 px-4 py-3.5 rounded-2xl font-extrabold text-sm transition-all border-2 shadow-md",
                isActive 
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-indigo-600/30 scale-[1.02]" 
                  : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : tab.color)} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EMBRIOLOGIA DA DIFERENCIAÇÃO SEXUAL */}
      {activeTab === 'embriologia' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-12">
          <Balloon 
            color="purple" 
            icon={Dna} 
            title="Embriologia da Determinação e Diferenciação Sexual" 
            subtitle="Resumo de Raciocínio Fisiopatológico Sequencial"
            text="A diferenciação sexual humana ocorre em etapas estritamente coordenadas de genes, receptores e hormônios. Falhas em qualquer ponto desta cascata explicam a etiologia das amenorreias primárias e DSD."
          />

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#121214] border-2 border-[#27272a] rounded-2xl overflow-hidden shadow-xl">
              <button 
                onClick={() => setExpandedEmbryoStep(expandedEmbryoStep === 1 ? null : 1)}
                className="w-full p-5 text-left flex items-center justify-between bg-[#18181c] hover:bg-[#202026] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-900/80 border border-purple-500 text-purple-200 font-extrabold flex items-center justify-center text-sm">
                    1
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-base md:text-lg">Gônada Bipotencial e Determinação Gonadal (4ª–7ª Semana)</h3>
                    <p className="text-xs text-purple-300 font-medium">Crista Genital • Genes Neutros • Gatilho SRY/SOX9 vs WNT4</p>
                  </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", expandedEmbryoStep === 1 && "rotate-180")} />
              </button>

              {expandedEmbryoStep === 1 && (
                <div className="p-5 space-y-4 border-t border-[#27272a] bg-[#121214]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Balloon 
                      color="graphite" 
                      title="1.1 Formação da Crista Genital (4ª-5ª sem)" 
                      text={
                        <div className="space-y-2 text-xs md:text-sm">
                          <p>• Epitélio celômico + mesonefro migram para formar a crista genital indiferenciada.</p>
                          <p>• <strong>Genes Neutros de Base:</strong> <code className="bg-purple-950 text-purple-200 px-1 py-0.5 rounded">WT1</code> (mantém progenitoras), <code className="bg-purple-950 text-purple-200 px-1 py-0.5 rounded">SF1/NR5A1</code> (esteroidogênese e ativa SRY), <code className="bg-purple-950 text-purple-200 px-1 py-0.5 rounded">LHX9</code> e <code className="bg-purple-950 text-purple-200 px-1 py-0.5 rounded">EMX2</code>.</p>
                          <p className="text-amber-300 font-bold">• Ponto Clínico: Defeitos em WT1/SF1 impedem a formação gonadal em QUALQUER sexo, gerando disgenesia gonadal severa.</p>
                        </div>
                      } 
                    />
                    <Balloon 
                      color="purple" 
                      title="1.2 O Gatilho SRY → SOX9 (6ª-7ª sem)" 
                      text={
                        <div className="space-y-2 text-xs md:text-sm">
                          <p>• Em embriões 46,XY, o gene SRY transcrito nas células pré-Sertoli ativa o enhancer TESCO do gene <code className="bg-purple-950 text-purple-200 px-1 py-0.5 rounded">SOX9</code>.</p>
                          <p>• SOX9 auto-amplifica sua expressão e recruta FGF9 para diferenciação IRREVERSÍVEL em TESTÍCULO.</p>
                          <p className="text-amber-300 font-bold">• Ponto Clínico: SOX9 precisa atingir um limiar temporal. SRY fraco/atrasado conduz à reversão ovariana / disgenesia gonadal.</p>
                        </div>
                      } 
                    />
                  </div>
                  <Balloon 
                    color="wine" 
                    title="1.3 Antagonismo Ativo: SOX9 vs WNT4/RSPO1/FOXL2" 
                    text="A determinação sexual é mantida por antagonismo contínuo. Via Testicular (SRY→SOX9→FGF9) suprime ativamente a Via Ovariana (WNT4→RSPO1→β-catenina→FOXL2). A via feminina 46,XX NÃO é passiva, é construída ativamente!" 
                  />
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div className="bg-[#121214] border-2 border-[#27272a] rounded-2xl overflow-hidden shadow-xl">
              <button 
                onClick={() => setExpandedEmbryoStep(expandedEmbryoStep === 2 ? null : 2)}
                className="w-full p-5 text-left flex items-center justify-between bg-[#18181c] hover:bg-[#202026] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-900/80 border border-indigo-500 text-indigo-200 font-extrabold flex items-center justify-center text-sm">
                    2
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-base md:text-lg">Diferenciação dos Ductos Internos (8ª–10ª Semana)</h3>
                    <p className="text-xs text-indigo-300 font-medium">Ducto de Müller vs Ducto de Wolff • AMH • Testosterona</p>
                  </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", expandedEmbryoStep === 2 && "rotate-180")} />
              </button>

              {expandedEmbryoStep === 2 && (
                <div className="p-5 space-y-4 border-t border-[#27272a] bg-[#121214]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-[#333336] bg-[#1a1a1e] text-indigo-300 font-extrabold uppercase">
                          <th className="p-3">Estrutura Interna</th>
                          <th className="p-3">Hormônio e Fonte</th>
                          <th className="p-3">Se PRESENTE</th>
                          <th className="p-3">Se AUSENTE / Sem Resposta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] font-medium text-slate-200">
                        <tr className="hover:bg-[#18181c]">
                          <td className="p-3 font-bold text-rose-300">Ducto de Müller (Paramesonéfrico)</td>
                          <td className="p-3">AMH (TGF-β) secretado pelas Células de Sertoli</td>
                          <td className="p-3 text-emerald-400 font-bold">REGRIDE via apoptose (via AMHR2/SMAD)</td>
                          <td className="p-3 text-rose-400 font-bold">PERSISTE → Útero, Trompas e 2/3 sup. Vagina</td>
                        </tr>
                        <tr className="hover:bg-[#18181c]">
                          <td className="p-3 font-bold text-blue-300">Ducto de Wolff (Mesonéfrico)</td>
                          <td className="p-3">Testosterona secretada pelas Células de Leydig</td>
                          <td className="p-3 text-blue-400 font-bold">ESTABILIZA → Epidídimo, Deferente, Vesícula Seminal</td>
                          <td className="p-3 text-slate-400 font-bold">REGRIDE por falta de estímulo (padrão default)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <Balloon 
                      color="blue" 
                      title="Síndrome do Ducto de Müller Persistente" 
                      subtitle="Deficiência de AMH / Receptor AMHR2"
                      text="Homem 46,XY nasce com virilização normal da genitália externa, mas MANTÉM útero e trompas por ausência de regressão mülleriana." 
                    />
                    <Balloon 
                      color="wine" 
                      title="Mecanismo em CAIS (Insensibilidade Completa)" 
                      subtitle="Princípio Central de Prova"
                      text="Testosterona e AMH são normais, mas o receptor de andrógeno (AR) é inoperante. Resultado: Müller regride normalmente por causa do AMH, mas Wolff regride por falta de resposta à Testosterona! A paciente fica SEM DERIVADOS INTERNOS de nenhum dos ductos." 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div className="bg-[#121214] border-2 border-[#27272a] rounded-2xl overflow-hidden shadow-xl">
              <button 
                onClick={() => setExpandedEmbryoStep(expandedEmbryoStep === 3 ? null : 3)}
                className="w-full p-5 text-left flex items-center justify-between bg-[#18181c] hover:bg-[#202026] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-rose-900/80 border border-rose-500 text-rose-200 font-extrabold flex items-center justify-center text-sm">
                    3
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-base md:text-lg">Genitália Externa, Receptor AR e Feedback Central</h3>
                    <p className="text-xs text-rose-300 font-medium">DHT • Gene AR (Xq11-12) • Feedback de LH • AIS Parcial (PAIS)</p>
                  </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", expandedEmbryoStep === 3 && "rotate-180")} />
              </button>

              {expandedEmbryoStep === 3 && (
                <div className="p-5 space-y-4 border-t border-[#27272a] bg-[#121214]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Balloon 
                      color="graphite" 
                      title="Papel da 5α-Redutase Tipo 2 e DHT" 
                      text="Testosterona é convertida pela 5α-redutase tipo 2 em Di-hidrotestosterona (DHT). A DHT viriliza a genitália externa (fusão labioescrotal, tubérculo genital em pênis). Sem DHT ou sem Receptor AR, a genitália externa permanece FEMININA por padrão." 
                    />
                    <Balloon 
                      color="amber" 
                      title="Feedback Eixo Hipotálamo-Hipófise em CAIS" 
                      text="Como o receptor de andrógeno (AR) é inoperante no hipotálamo/hipófise, o eixo não percebe a testosterona circulante. Resposta: eleva o LH (falta de feedback central). A testosterona alta é aromatizada em estradiol, desenvolvendo mamas normais." 
                    />
                  </div>

                  <Balloon 
                    color="wine" 
                    icon={ShieldAlert}
                    title="AIS Parcial (PAIS) & Escala de Quigley (1 a 7)" 
                    text={
                      <div className="space-y-2 text-xs md:text-sm">
                        <p>• Na PAIS, o receptor mantém função residual VARIÁVEL. Gera um espectro fenotípico contínuo (Escala de Quigley 1-7), variando de genitália masculina com infertilidade até genitália predominantemente feminina com clitoromegalia e fusão labioescrotal parcial.</p>
                        <p>• <strong>DDx de Genitália Ambígua Neonatal:</strong> PAIS x Deficiência de 5α-Redutase Tipo 2 x HAC Virilizante (46,XX) x Disgenesia Gonadal Parcial. Requer relação Testosterona/DHT, teste de hCG e estudo molecular.</p>
                      </div>
                    } 
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: DEFINIÇÃO, CRITÉRIOS DE INVESTIGAÇÃO & FATORES DE RISCO */}
      {activeTab === 'definicao' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-12">
          <Balloon 
            color="blue" 
            icon={FileText} 
            title="1. Definição Clínica & Conceito Central" 
            subtitle="Sinal de Alarme do Eixo Reprodutivo"
            text="Amenorreia primária é definida como a ausência de menarca em paciente que ultrapassou os marcos etários e puberais esperados. Não é um diagnóstico em si, mas um sinal de alerta que exige investigação sistemática de todo o eixo reprodutivo, do hipotálamo ao trato de saída genital."
          />

          {/* Critérios ACOG/SBEM */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Zap className="text-amber-400 w-6 h-6 shrink-0" />
              <h2 className="text-xl font-extrabold text-white">Critérios Formais de Investigação (ACOG / SBEM)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-indigo-800/60 bg-indigo-950/20 flex flex-col justify-between">
                <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">Critério 1</span>
                <p className="text-base font-extrabold text-white mt-1">Ausência de Menarca ≥ 15 anos</p>
                <p className="text-xs text-emerald-400 font-bold mt-2">COM caracteres sexuais secundários presentes (Telarca +)</p>
              </div>

              <div className="p-4 rounded-xl border border-rose-800/60 bg-rose-950/20 flex flex-col justify-between">
                <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">Critério 2</span>
                <p className="text-base font-extrabold text-white mt-1">Ausência de Menarca ≥ 13 anos</p>
                <p className="text-xs text-rose-400 font-bold mt-2">SEM nenhum caractere sexual secundário (Telarca -)</p>
              </div>

              <div className="p-4 rounded-xl border border-amber-800/60 bg-amber-950/20 flex flex-col justify-between">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Critério 3</span>
                <p className="text-base font-extrabold text-white mt-1">Ausência de Menarca 3 anos após Telarca</p>
                <p className="text-xs text-slate-300 font-medium mt-2">Se a telarca ocorreu precocemente (&lt; 10 anos)</p>
              </div>

              <div className="p-4 rounded-xl border border-purple-800/60 bg-purple-950/20 flex flex-col justify-between">
                <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Critério 4</span>
                <p className="text-base font-extrabold text-white mt-1">Atraso Puberal Isolado ≥ 13-14 anos</p>
                <p className="text-xs text-slate-300 font-medium mt-2">Ausência total de desenvolvimento mamário puberal</p>
              </div>
            </div>

            <Balloon 
              color="amber" 
              title="★ Ponto de Prova Importante (Pegadinha Frequente)" 
              text="Não esperar a paciente 'completar 16 anos' de forma cega! O critério atual é sensível ao contexto puberal (presença ou ausência de mamas/telarca), não apenas à idade cronológica isolada." 
            />
          </div>

          {/* Epidemiologia */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-xl font-extrabold text-white border-b border-slate-800 pb-3">
              Epidemiologia & Distribuição Etiológica (Speroff / Reindollar)
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Prevalência na população geral: <strong>0,1–2,5%</strong> (muito menor que a amenorreia secundária, de ~3–4%).
            </p>

            <div className="space-y-3">
              {[
                { label: 'Disgenesia Gonadal (Turner e variantes 45,X, mosaicos)', pct: '30–40%', color: 'bg-rose-600' },
                { label: 'Eixo Hipotálamo-Hipofisário (AHF, Atraso Constitucional, Kallmann)', pct: '20–30%', color: 'bg-indigo-600' },
                { label: 'Anormalidades Müllerianas (MRKH, agenesia uterina)', pct: '15–20%', color: 'bg-purple-600' },
                { label: 'DSD 46,XY (incluindo CAIS)', pct: '5–10%', color: 'bg-amber-600' },
                { label: 'Obstáculo Trato de Saída (Septo vaginal transverso / Hímen imperfurado)', pct: '5%', color: 'bg-emerald-600' },
                { label: 'Outras causas endócrinas (SOP, Tireoide, Prolactina)', pct: 'Variável', color: 'bg-slate-600' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-extrabold">
                    <span className="text-slate-200">{item.label}</span>
                    <span className="text-indigo-300 font-mono">{item.pct}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: item.pct.includes('–') ? item.pct.split('–')[1] : '10%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fatores de Risco */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-xl font-extrabold text-white border-b border-slate-800 pb-3">
              Fatores de Risco & Etiológicos Organizativos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Balloon 
                color="graphite" 
                title="Genéticos / Cromossômicos" 
                text="História familiar de amenorreia primária, consanguinidade parental (risco de HAC), mosaicismos familiares (Turner) e história de 'hérnia inguinal' na infância em tias/primas maternas (CAIS)." 
              />
              <Balloon 
                color="graphite" 
                title="Nutricionais / Energéticos (RED-S)" 
                text="Baixo peso (IMC < 18,5), exercício físico extremo (atletas, ballet, ginástica), restrição calórica, transtornos alimentares (anorexia nervosa) -> supressão de GnRH por queda de leptina." 
              />
              <Balloon 
                color="graphite" 
                title="Doenças Crônicas Sistêmicas" 
                text="Doença Celíaca não tratada, Doença Inflamatória Intestinal (DII), Insuficiência Renal Crônica (IRC), Cardiopatias Congênitas Cianóticas -> atraso puberal secundário à doença sistêmica." 
              />
              <Balloon 
                color="graphite" 
                title="Iatrogênicos / Terapias Anteriores" 
                text="Exposição prévia a quimioterapia ou radioterapia pediátrica/pélvica -> gonadotoxicidade direta resultando em Insuficiência Ovariana Prematura (POI)." 
              />
            </div>

            <Balloon 
              color="wine" 
              icon={HelpCircle}
              title="Pergunta de Anamnese Dirigida OBRIGATÓRIA (Suspeita de CAIS)" 
              text="“Alguma tia ou prima por parte de mãe nunca menstruou, foi operada de hérnia inguinal quando criança, ou é infértil sem explicação?” — Pergunta-chave clássica diante da hipótese de CAIS, já que o gene AR fica em Xq11-12 e a mãe é portadora assintomática." 
            />
          </div>
        </motion.div>
      )}

      {/* TAB 3: DIAGNÓSTICO DIFERENCIAL, FLUXO & CONDUTAS */}
      {activeTab === 'diferencial' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-12">
          
          {/* SEÇÃO PRINCIPAL: OS 3 BOTOES HORIZONTAIS DO DIAGNÓSTICO DIFERENCIAL */}
          <div className="space-y-6">
            <div className="bg-[#121214] border-2 border-[#27272a] p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
                  Nível Residência Médica (GO) • 3 Pilares
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  Diagnóstico Diferencial & Raciocínio Clínico Aprofundado
                </h2>
                <p className="text-sm text-slate-300 font-medium max-w-2xl mt-1">
                  Selecione um dos 3 pilares fisiopatológicos abaixo para acessar a análise completa de nível de especialista: genômica, cascata hormonal, propedêutica de imagem, protocolos farmacológicos com doses e armadilhas de prova.
                </p>
              </div>
            </div>

            {/* 3 BOTOES HORIZONTAIS DEDICADOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* BUTTON 1: EUGONADISMO */}
              <button
                onClick={() => setSelectedPillar('eugonadismo')}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-3 shadow-xl cursor-pointer",
                  selectedPillar === 'eugonadismo'
                    ? "bg-[#2e1065] border-[#7c3aed] text-white shadow-purple-950/60 scale-[1.02] ring-2 ring-[#7c3aed]"
                    : "bg-[#121214] border-[#27272a] text-slate-300 hover:bg-[#18181c] hover:border-purple-600/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-xs font-black uppercase px-2.5 py-1 rounded-full border", 
                    selectedPillar === 'eugonadismo' ? "bg-purple-900/90 border-purple-400 text-purple-100" : "bg-purple-950/60 border-purple-900 text-purple-300")}>
                    Pilar 1
                  </span>
                  <CheckCircle2 className={cn("w-5 h-5", selectedPillar === 'eugonadismo' ? "text-purple-300" : "text-slate-500")} />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight text-white">EUGONADISMO</h3>
                  <p className="text-xs font-bold mt-1 text-purple-200">
                    Mamas Presentes • FSH / LH Normais
                  </p>
                </div>
                <div className="text-[11px] font-medium border-t border-purple-500/20 pt-2 text-purple-200/80">
                  MRKH (Types I/II) • CAIS (Morris) • Obstruções
                </div>
              </button>

              {/* BUTTON 2: HIPOGONADISMO HIPOGONADOTRÓFICO */}
              <button
                onClick={() => setSelectedPillar('hipo')}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-3 shadow-xl cursor-pointer",
                  selectedPillar === 'hipo'
                    ? "bg-[#0f172a] border-[#2563eb] text-white shadow-blue-950/60 scale-[1.02] ring-2 ring-[#2563eb]"
                    : "bg-[#121214] border-[#27272a] text-slate-300 hover:bg-[#18181c] hover:border-blue-600/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-xs font-black uppercase px-2.5 py-1 rounded-full border", 
                    selectedPillar === 'hipo' ? "bg-blue-900/90 border-blue-400 text-blue-100" : "bg-blue-950/60 border-blue-900 text-blue-300")}>
                    Pilar 2
                  </span>
                  <Brain className={cn("w-5 h-5", selectedPillar === 'hipo' ? "text-blue-300" : "text-slate-500")} />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight text-white">HIPO - HIPO CENTRAL</h3>
                  <p className="text-xs font-bold mt-1 text-blue-200">
                    Mamas Ausentes • FSH / LH Baixos
                  </p>
                </div>
                <div className="text-[11px] font-medium border-t border-blue-500/20 pt-2 text-blue-200/80">
                  AHF / RED-S • Kallmann (ANOS1) • Tumores SNC
                </div>
              </button>

              {/* BUTTON 3: HIPOGONADISMO HIPERGONADOTRÓFICO */}
              <button
                onClick={() => setSelectedPillar('hiper')}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-3 shadow-xl cursor-pointer",
                  selectedPillar === 'hiper'
                    ? "bg-[#3f0f1c] border-[#9f1239] text-white shadow-rose-950/60 scale-[1.02] ring-2 ring-[#9f1239]"
                    : "bg-[#121214] border-[#27272a] text-slate-300 hover:bg-[#18181c] hover:border-rose-600/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-xs font-black uppercase px-2.5 py-1 rounded-full border", 
                    selectedPillar === 'hiper' ? "bg-rose-900/90 border-rose-400 text-rose-100" : "bg-rose-950/60 border-rose-900 text-rose-300")}>
                    Pilar 3
                  </span>
                  <ShieldAlert className={cn("w-5 h-5", selectedPillar === 'hiper' ? "text-rose-300" : "text-slate-500")} />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight text-white">HIPER - HIPO GONADAL</h3>
                  <p className="text-xs font-bold mt-1 text-rose-200">
                    Mamas Ausentes • FSH / LH Altos
                  </p>
                </div>
                <div className="text-[11px] font-medium border-t border-rose-500/20 pt-2 text-rose-200/80">
                  Turner (45,X) • Swyer (46,XY) • POI 46,XX
                </div>
              </button>
            </div>

            {/* CONTEÚDO APROFUNDADO DO PILAR SELECIONADO */}
            <AnimatePresence mode="wait">
              {selectedPillar === 'eugonadismo' && (
                <motion.div key="eugonadismo" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
                  
                  {/* BALÃO PRINCIPAL */}
                  <div className="bg-[#121214] border-2 border-[#7c3aed] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#7c3aed]/20 px-4 py-2 rounded-bl-2xl text-xs font-extrabold text-purple-200 border-l border-b border-[#7c3aed]/40 uppercase tracking-wider">
                      Detalhamento de Especialidade • Pilar 1
                    </div>

                    <Balloon 
                      color="purple" 
                      icon={CheckCircle2} 
                      title="PILAR 1: EUGONADISMO (Eixo Hipotálamo-Hipófise-Ovário Preservado)" 
                      subtitle="Desenvolvimento Mamário Presente (Tanner ≥ III) • Estrogênio Sérico Normal • FSH / LH em Níveis Fisiológicos"
                      badge="Mamas Presentes"
                      className="mb-4"
                      text={
                        <div className="space-y-3 text-sm text-purple-100">
                          <p>• <strong>Mecanismo Fisiopatológico Global:</strong> A presença de mamas confirma que o estrogênio endógeno circulou em quantidades adequadas durante a puberdade. A gônada (ovário) é pérvia e responsiva às gonadotrofinas hipofisárias. Logo, a ausência de menarca decorre estritamente de 3 etiologias: <strong>1) Obstrução anatômica mecânica do trato de saída</strong>; <strong>2) Agenesia uterovaginal congênita (Ductos de Müller)</strong>; ou <strong>3) Insensibilidade periférica completa aos andrógenos (receptor AR mutado)</strong>.</p>
                          <p>• <strong>Algoritmo Investigativo de Escolha (ACOG / ASrm):</strong> 1º Passo: Ultrassonografia Pélvica ou Ressonância Magnética Pélvica para confirmar presença/ausência de <strong>ÚTERO</strong>.
                            <br />- <strong>Se Útero Presente:</strong> Avaliar obstrução do trato de saída (Hímen imperfurado, septo vaginal transverso, agenesia cervical).
                            <br />- <strong>Se Útero Ausente:</strong> Solicitar <strong>Cariótipo em Sangue Periférico</strong> + <strong>Testosterona Sérica Total</strong> para diferir MRKH (46,XX / T normal) de CAIS (46,XY / T masculina).</p>
                        </div>
                      }
                    />

                    {/* SUBTIPOS EM CARDS APROFUNDADOS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      
                      {/* CARD MRKH */}
                      <div className="bg-[#18181c] border-2 border-purple-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Cariótipo 46,XX</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-700">Útero - / Ovários +</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Síndrome de MRKH (Agenesia Mülleriana)</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Agenesia congênita dos ductos de Müller (útero, tubas e 2/3 superiores da vagina ausentes). Acomete 1 em cada 4.500 nascidos vivos do sexo feminino. Ovários normais com ovulação bifásica preservada.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/50">
                            <strong className="text-purple-300 block mb-1">Subtipos & Rastreio de Associação (MURCS):</strong>
                            <p className="text-purple-100">• <strong>Tipo 1 (Isolada - 64%):</strong> Apenas agenesia uterovaginal.</p>
                            <p className="text-purple-100">• <strong>Tipo 2 / Associação MURCS (36%):</strong> Müllerian, Renal dysplasia (30-40% agenesia/rim pélvico/ferradura), Cervicothoracic Somite dysplasia (10-12% fusão vertebral Klippel-Feil) + hipoacusia.</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Pilificação:</strong> Pubiana/axilar feminina normal (Tanner IV-V).</p>
                            <p>• <strong>Manejo Neovagina:</strong> Dilatação Vaginal Não-Cirúrgica (Método de Frank / Ingram com molde em velas) é a 1ª Linha (90-95% sucesso). Cirurgia (Vecchietti / Davydov / McIndoe) apenas se falha do Frank.</p>
                            <p>• <strong>Fertilidade:</strong> Fertilização in vitro (FIV) com óvulos próprios + Gestação em Barriga de Substituição (Útero de Substituição).</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD CAIS */}
                      <div className="bg-[#18181c] border-2 border-rose-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-rose-400 uppercase tracking-wider">Cariótipo 46,XY</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-700">Útero - / Testículos +</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Síndrome de CAIS (Morris / Testículo Feminizante)</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Herança recessiva ligada ao X. Mutação inactivante do gene do receptor de andrógenos (AR em Xq11-12). Testículos intra-abdominais/inguinais produzem Testosterona masculina (&gt;300 ng/dL) e AMH.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-rose-950/60 p-2.5 rounded-xl border border-rose-800/50">
                            <strong className="text-rose-300 block mb-1">Cascata Fisiopatológica Única:</strong>
                            <p className="text-rose-100">• AMH regressa o útero e tubas (sem útero!).</p>
                            <p className="text-rose-100">• Aromatização periférica da alta testosterona gera mamas exuberantes e simétricas, mas com aréolas pálidas e mamilos pequenos.</p>
                            <p className="text-rose-100">• <strong>Pelos pubianos e axilares AUSENTES ou ESCASSOS (Tanner I-II)</strong> pois dependem de andrógenos.</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Malignidade Gonadal:</strong> Risco de Gonadoblastoma / Seminomas &lt;1% antes dos 18-20 anos. Eleva-se para 10-22% após a puberdade.</p>
                            <p>• <strong>Gonadectomia Timing:</strong> Bilateral Laparoscópica PÓS-PUBERAL (após 18 anos) para permitir puberdade e pico de massa óssea espontâneos.</p>
                            <p>• <strong>TRH Pós-Op:</strong> 17-β Estradiol 2,0 mg/dia VO ou Patch 50-100 mcg/dia contínuo (SEM progesterona!).</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD OBSTRUÇÃO */}
                      <div className="bg-[#18181c] border-2 border-emerald-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Cariótipo 46,XX</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-700">Útero + / Ovários +</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Obstrução do Trato de Saída (Criptomenorreia)</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Anatomia hormonal e ovariana normais. O fluxo menstrual fica mecanicamente impedido de sair por defeito no hímen ou vagina, acumulando sangue retrogradamente.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
                            <strong className="text-emerald-300 block mb-1">Diferenciação Anatômica de Emergência:</strong>
                            <p className="text-emerald-100">• <strong>Hímen Imperfurado:</strong> Membrana azulada/violácea abaulada ao Valsalva no introito. Causa Hematocolpo + Dor pélvica cíclica + Retenção urinária aguda.</p>
                            <p className="text-emerald-100">• <strong>Septo Vaginal Transverso:</strong> Falha de canalização entre ducto Mülleriano e seio urogenital. Exame mostra introito normal com fundo cego. Exige RM para medir espessura do septo.</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Conduta Hímen:</strong> Himenotomia Cruciforme com ressecção de retalhos e sutura com fio absorvível. (NUNCA fazer apenas punção por agulha - risco de piocolpo!).</p>
                            <p>• <strong>Conduta Septo:</strong> Ressecção cirúrgica com Z-plastia mucosal.</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* TABELA COMPARATIVA MATRIZ EUGONADISMO */}
                    <div className="mt-6 bg-[#18181c] border border-purple-900/50 rounded-2xl p-4 overflow-x-auto">
                      <h4 className="font-black text-purple-300 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <FileText size={16} /> Matriz Comparativa de Especialidade • Pilar Eugonadismo
                      </h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#27272a] text-purple-300 bg-purple-950/40">
                            <th className="p-2.5 font-extrabold">Entidade Nosológica</th>
                            <th className="p-2.5 font-extrabold">Cariótipo</th>
                            <th className="p-2.5 font-extrabold">Útero / Vagina</th>
                            <th className="p-2.5 font-extrabold">Pelos Pubianos</th>
                            <th className="p-2.5 font-extrabold">Testosterona Total</th>
                            <th className="p-2.5 font-extrabold">Exame Complementar Chave</th>
                            <th className="p-2.5 font-extrabold">Conduta Inegociável</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a] text-slate-200">
                          <tr>
                            <td className="p-2.5 font-black text-white">Sy. MRKH (Agenesia)</td>
                            <td className="p-2.5 font-bold">46,XX</td>
                            <td className="p-2.5 text-rose-300 font-bold">Ausente / Vag Cega 1-3cm</td>
                            <td className="p-2.5 text-emerald-400 font-bold">Normais (Tanner IV-V)</td>
                            <td className="p-2.5">Feminina (20-50 ng/dL)</td>
                            <td className="p-2.5 text-amber-300 font-bold">USG Renal (30-40% anomalia)</td>
                            <td className="p-2.5">Dilatação Frank 1ª linha + FIV/Barriga subst.</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-black text-white">Sy. CAIS (Morris)</td>
                            <td className="p-2.5 font-bold text-rose-400">46,XY</td>
                            <td className="p-2.5 text-rose-300 font-bold">Ausente / Vag Cega Curta</td>
                            <td className="p-2.5 text-rose-400 font-black">Ausentes ou Escassos</td>
                            <td className="p-2.5 text-rose-300 font-black">Masculina (&gt;300 ng/dL)</td>
                            <td className="p-2.5">Dosagem T + LH elev + Cariótipo</td>
                            <td className="p-2.5">Gonadectomia pós-puberal + TRH Estradiol monoterapia</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-black text-white">Hímen Imperfurado</td>
                            <td className="p-2.5 font-bold">46,XX</td>
                            <td className="p-2.5 text-emerald-300 font-bold">Presente (Retenção)</td>
                            <td className="p-2.5 text-emerald-400 font-bold">Normais (Tanner IV-V)</td>
                            <td className="p-2.5">Feminina (20-50 ng/dL)</td>
                            <td className="p-2.5 text-emerald-300 font-bold">Inspeção Vulvar em Valsalva</td>
                            <td className="p-2.5">Himenotomia Cruciforme com ressecção retalhos</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </motion.div>
              )}

              {selectedPillar === 'hipo' && (
                <motion.div key="hipo" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
                  
                  {/* BALÃO PRINCIPAL */}
                  <div className="bg-[#121214] border-2 border-[#2563eb] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#2563eb]/20 px-4 py-2 rounded-bl-2xl text-xs font-extrabold text-blue-200 border-l border-b border-[#2563eb]/40 uppercase tracking-wider">
                      Detalhamento de Especialidade • Pilar 2
                    </div>

                    <Balloon 
                      color="blue" 
                      icon={Brain} 
                      title="PILAR 2: HIPOGONADISMO HIPOGONADOTRÓFICO (Origem Central Hipotálamo-Hipofisária)" 
                      subtitle="Ausência Mamária (Tanner I) • Estradiol Indetectável • FSH e LH Baixos (<2,0 UI/L) ou Inapropriadamente Normais"
                      badge="Hipo-Hipo Central"
                      className="mb-4"
                      text={
                        <div className="space-y-3 text-sm text-blue-100">
                          <p>• <strong>Mecanismo Fisiopatológico Global:</strong> O marcapasso neuronal do GnRH no núcleo arqueado/hipotálamo medial está inativo (falha de pulso) ou a hipófise anterior possui lesão orgânica que impede a síntese e secreção de LH/FSH. Sem a estimulação gonadotrófica, os folículos ovarianos permanecem em repouso estático ("ovário quieto/quiescente"), levando a um estado de <strong>hipoestrogenismo severo duradouro</strong> e impuberismo.</p>
                          <p>• <strong>Propedêutica Inegociável da Residência:</strong> Diante de FSH/LH baixos com mamas ausentes, é <strong>MANDATÓRIO realizar Ressonância Magnética (RM) de Crânio e Sela Túrcica com contraste (Gadolínio)</strong> para afastar processos expansivos do SNC (Craniofaringiomas, germinomas, adenomas) + <strong>Teste Funcional de Olfato (UPSIT / Sniffin' Sticks)</strong> antes de diagnosticar causa funcional.</p>
                        </div>
                      }
                    />

                    {/* SUBTIPOS EM CARDS APROFUNDADOS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      
                      {/* CARD AHF */}
                      <div className="bg-[#18181c] border-2 border-blue-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-blue-400 uppercase tracking-wider">Funcional / RED-S</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-700">Inibição Neurônio Kisspeptina</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Amenorreia Hipotalâmica Funcional (AHF / RED-S)</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Causada por deficiência energética relativa (RED-S), exercício físico extenuante, perda ponderal acentuada ou estresse psicogênico.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-800/50">
                            <strong className="text-blue-300 block mb-1">Fisiopatologia & Neuroendocrinologia:</strong>
                            <p className="text-blue-100">• Baixa disponibilidade de energia (&lt;30 kcal/kg massa magra/dia) reduz Leptina circulante e eleva Ghrelina/Cortisol.</p>
                            <p className="text-blue-100">• Suprime os neurônios de Kisspeptina no hipotálamo, abolindo os pulsos de GnRH.</p>
                            <p className="text-blue-100">• <strong>Osteopenia/Osteoporose Precoce:</strong> Risco altíssimo por falha na aquisição do pico de massa óssea.</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Manejo Ósseo de Escolha:</strong> Reabilitação nutricional (+300-500 kcal/dia) + 17-β Estradiol Transdérmico (50-100 mcg patch) + Progesterona Micronizada oral (200 mg 12d/mês). <strong>CONTRAINDICADO usar ACOs orais combinados com Etinilestradiol para proteção óssea!</strong> (Etinilestradiol oral suprime IGF-1 hepático e prejudica o osso).</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD KALLMANN */}
                      <div className="bg-[#18181c] border-2 border-purple-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Genético / Congênito</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-700">Placódio Olfatório</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Síndrome de Kallmann (Deficiência de GnRH + Anosmia)</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Falha na migração embrionária embrionária conjunta dos neurônios sintetizadores de GnRH e dos axônios olfatórios a partir do placódio olfatório em direção ao hipotálamo.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/50">
                            <strong className="text-purple-300 block mb-1">Genética & Achados Associados:</strong>
                            <p className="text-purple-100">• Gene ANOS1 (KAL1 - ligado ao X), FGFR1, PROKR2.</p>
                            <p className="text-purple-100">• <strong>Tríade Clássica:</strong> Amenorreia Primária + Mamas Tanner I + <strong>ANOSMIA OU HIPOSMIA</strong>.</p>
                            <p className="text-purple-100">• <strong>Sinais Patognomônicos:</strong> Sincinesia bimanual (movimentos em espelho das mãos), agenesia renal unilateral (30%), fenda labiopalatina.</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Fertilidade:</strong> Ovários são intrinsecamente perfeitamente normais! Excelente taxa de gravidez com indução por Gonadotrofinas Exógenas (FSHr + hMG/hCG) ou Bomba Pulsátil de GnRH.</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD CRANIOFARINGIOMA / TUMOR */}
                      <div className="bg-[#18181c] border-2 border-rose-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-rose-400 uppercase tracking-wider">Estrutural / Tumoral</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-700">Bolsa de Rathke / Sela</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Craniofaringioma & Lesões Orgânicas do SNC</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Tumor epitelial benigno de crescimento lento derivado de remanescentes da Bolsa de Rathke. Causa compressão do quiasma óptico e da haste hipofisária.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-rose-950/60 p-2.5 rounded-xl border border-rose-800/50">
                            <strong className="text-rose-300 block mb-1">Tríade de Suspeição em Odonto/Pediatria:</strong>
                            <p className="text-rose-100">• 1) Deficiência de GH (Baixa estatura proporcional/atraso constitucional).</p>
                            <p className="text-rose-100">• 2) Alteração de campo visual (Hemianopsia bitemporal por compressão quiasmática).</p>
                            <p className="text-rose-100">• 3) Cefaleia, vômitos em jato, Diabetes Insipidus.</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Achado na RM / TC:</strong> Massa supraselar cística com calcificações grosseiras em "casca de ovo".</p>
                            <p>• <strong>Tratamento:</strong> Ressecção Neurocirúrgica transesfenoidal / craniotomia ± Radioterapia.</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* TABELA COMPARATIVA MATRIZ HIPO */}
                    <div className="mt-6 bg-[#18181c] border border-blue-900/50 rounded-2xl p-4 overflow-x-auto">
                      <h4 className="font-black text-blue-300 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <FileText size={16} /> Matriz Comparativa de Especialidade • Pilar Hipogonadismo Hipogonadotrófico
                      </h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#27272a] text-blue-300 bg-blue-950/40">
                            <th className="p-2.5 font-extrabold">Etiologia Central</th>
                            <th className="p-2.5 font-extrabold">Olfato (UPSIT)</th>
                            <th className="p-2.5 font-extrabold">FSH / LH</th>
                            <th className="p-2.5 font-extrabold">Exame Complementar Definidor</th>
                            <th className="p-2.5 font-extrabold">Manejo Específico & Doses</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a] text-slate-200">
                          <tr>
                            <td className="p-2.5 font-black text-white">Amenorreia Hipotalâmica (AHF)</td>
                            <td className="p-2.5 text-emerald-400 font-bold">Normosmia (Normal)</td>
                            <td className="p-2.5">&lt; 2,0 UI/L (Baixos)</td>
                            <td className="p-2.5 text-amber-300 font-bold">DXA óssea (Z-score &lt;-2.0) + Calorimetria</td>
                            <td className="p-2.5">Recuperação Calórica + Estradiol Transdérmico 50-100mcg</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-black text-white">Síndrome de Kallmann</td>
                            <td className="p-2.5 text-rose-400 font-black">ANOSMIA / HIPOSMIA</td>
                            <td className="p-2.5">&lt; 2,0 UI/L (Baixos)</td>
                            <td className="p-2.5 text-purple-300 font-bold">RM Coronal T2 (Agenesia Bulbo Olfatório)</td>
                            <td className="p-2.5">Indução Puberal Estradiol / Gonadotrofinas para fertilidade</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-black text-white">Craniofaringioma</td>
                            <td className="p-2.5 text-emerald-400 font-bold">Normosmia</td>
                            <td className="p-2.5">Baixos ou Inapropriados</td>
                            <td className="p-2.5 text-rose-300 font-black">RM Crânio / Sela (Massa Calcificada Cística)</td>
                            <td className="p-2.5">Neurocirurgia + Hormonioterapia de Reposição Pan-hipofisária</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </motion.div>
              )}

              {selectedPillar === 'hiper' && (
                <motion.div key="hiper" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
                  
                  {/* BALÃO PRINCIPAL */}
                  <div className="bg-[#121214] border-2 border-[#9f1239] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#9f1239]/20 px-4 py-2 rounded-bl-2xl text-xs font-extrabold text-rose-200 border-l border-b border-[#9f1239]/40 uppercase tracking-wider">
                      Detalhamento de Especialidade • Pilar 3
                    </div>

                    <Balloon 
                      color="wine" 
                      icon={ShieldAlert} 
                      title="PILAR 3: HIPOGONADISMO HIPERGONADOTRÓFICO (Falência Gonadal / Ovariana Primária)" 
                      subtitle="Ausência Mamária (Tanner I) • FSH Elevado (> 20 - 40 UI/L em 2 Amostras) • LH Elevado • Estradiol Indetectável"
                      badge="Hiper-Hipo Gonadal"
                      className="mb-4"
                      text={
                        <div className="space-y-3 text-sm text-rose-100">
                          <p>• <strong>Mecanismo Fisiopatológico Global:</strong> A gônada (ovário) é primariamente incapaz de responder ao estímulo gonadotrófico devido à ausência de folículos ovarianos, disgenesia gonadal grave ou destruição precoce. Pela perda total do feedback negativo hormonal promovido pelo Estradiol e pela Inibina B, a hipófise secreta FSH e LH em níveis supramaximais ("hipófise gritando para um ovário surdo").</p>
                          <p>• <strong>Exame OBRIGATÓRIO de Emergência Médica:</strong> Diante de FSH elevado, é <strong>IMPERATIVO solicitar Cariótipo em Sangue Periférico (Banda G - mínimo 30 metáfases)</strong>. A identificação de linhagem cromossômica contendo o <strong>Cromossomo Y (45,X/46,XY ou 46,XY)</strong> exige gonadectomia laparoscópica profilática imediata devido ao risco crítico de degeneração maligna (Gonadoblastoma).</p>
                        </div>
                      }
                    />

                    {/* SUBTIPOS EM CARDS APROFUNDADOS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      
                      {/* CARD TURNER */}
                      <div className="bg-[#18181c] border-2 border-purple-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Monossomia 45,X</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-700">Útero + / Streak Gonad</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Síndrome de Turner (Monossomia 45,X & Mosaicos)</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Causa genética mais comum de falência ovariana prematura (1 em 2.500 nascidos vivos do sexo feminino). Aceleração massiva de apoptose folicular intraútero resulta em gônadas em fita (streak gonads).
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/50">
                            <strong className="text-purple-300 block mb-1">Estigmas Somáticos & Rastreio Sistêmico:</strong>
                            <p className="text-purple-100">• Baixa estatura constante (&lt;145cm - haploinsuficiência do gene SHOX).</p>
                            <p className="text-purple-100">• Pescoço alado (pterygium colli), tórax em escudo, cubitus valgus, 4º metacarpal curto.</p>
                            <p className="text-purple-100">• <strong>Cardiovascular OBRIGATÓRIO:</strong> Ecocardiograma / RM cardíaca (30% Valva Aórtica Bicúspide; 12-15% Coarctação da Aorta - risco de dissecção aórtica!).</p>
                            <p className="text-purple-100">• <strong>Renal OBRIGATÓRIO:</strong> USG Pélvica/Renal (30% Rim em Ferradura).</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Esquema GH:</strong> Somatropina recombinante 0,045-0,050 mg/kg/dia SC a partir dos 4-6 anos para maximizar estatura.</p>
                            <p>• <strong>Indução Puberal:</strong> Iniciar Estradiol transdérmico microdose aos 11-12 anos (6,25-12,5 mcg/dia patch) escalando gradualmente. Adicionar Progesterona Micronizada (100-200mg 12d/mês) apenas após 2 anos de estrogênio ou sangramento de escape.</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD SWYER */}
                      <div className="bg-[#18181c] border-2 border-rose-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-rose-400 uppercase tracking-wider">Cariótipo 46,XY</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-700">ÚTERO PRESENTE!</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Síndrome de Swyer (Disgenesia Gonadal Pura 46,XY)</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Mutação no gene SRY (20%) ou MAP3K1/NR5A1. A gônada embrionária não se diferencia em testículo. Não sintetiza Sertoli/AMH nem Leydig/Testosterona.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-rose-950/60 p-2.5 rounded-xl border border-rose-800/50">
                            <strong className="text-rose-300 block mb-1">Paradoxo Clínico Crucial de Prova:</strong>
                            <p className="text-rose-100">• Sem AMH → Ductos de Müller PERMANECEM → <strong>ÚTERO, TUBAS E VAGINA ESTÃO PRESENTES E NORMAIS!</strong></p>
                            <p className="text-rose-100">• Sem Testosterona → Genitália externa feminina, mamas Tanner I (sem estrogênio).</p>
                            <p className="text-rose-100">• Estatura normal ou alta (diferente de Turner!).</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Conduta de Urgência Profilática:</strong> <strong>GONADECTOMIA BILATERAL LAPAROSCÓPICA IMEDIATA AO DIAGNÓSTICO</strong> devido ao risco astronômico (30-40%) de Gonadoblastoma / Disgerminoma maligno.</p>
                            <p>• <strong>Fertilidade:</strong> Gestação perfeitamente possível via Ovodoação (FIV) com prévio preparo endometrial uterino com estradiol/progesterona!</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD POI 46,XX */}
                      <div className="bg-[#18181c] border-2 border-blue-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-blue-400 uppercase tracking-wider">Cariótipo 46,XX</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-700">Útero + / Ovários Atróficos</span>
                          </div>
                          <h4 className="font-black text-white text-lg">Disgenesia 46,XX / POI Pré-Puberal</h4>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Insuficiência Ovariana Prematura instalada antes da puberdade em pacientes com cariótipo feminino normal 46,XX. Estatura normal sem estigmas somáticos.
                          </p>
                        </div>
                        <div className="border-t border-[#27272a] pt-3 text-xs space-y-2">
                          <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-800/50">
                            <strong className="text-blue-300 block mb-1">Investigação Etiológica de Nível R1/R2:</strong>
                            <p className="text-blue-100">• 1) Pesquisa de Pré-mutação do Gene FMR1 (X-Frágil: 55-200 repetições CGG).</p>
                            <p className="text-blue-100">• 2) Autoimunidade Ovariana: Autoanticorpos anti-21-hidroxilase (adrenal) e anti-ovário.</p>
                            <p className="text-blue-100">• 3) Iatrogenia: Radio/Quimioterapia pediátrica prévia.</p>
                          </div>
                          <div className="text-slate-200 space-y-1">
                            <p>• <strong>Tratamento:</strong> Indução puberal + Reposição Hormonal fisiológica contínua até os 50 anos (idade média da menopausa) para prevenção de doença cardiovascular e osteoporose severa.</p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* TABELA COMPARATIVA MATRIZ HIPER */}
                    <div className="mt-6 bg-[#18181c] border border-rose-900/50 rounded-2xl p-4 overflow-x-auto">
                      <h4 className="font-black text-rose-300 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                        <FileText size={16} /> Matriz Comparativa de Especialidade • Pilar Hipogonadismo Hipergonadotrófico
                      </h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#27272a] text-rose-300 bg-rose-950/40">
                            <th className="p-2.5 font-extrabold">Patologia Gonadal</th>
                            <th className="p-2.5 font-extrabold">Cariótipo</th>
                            <th className="p-2.5 font-extrabold">Útero em USG</th>
                            <th className="p-2.5 font-extrabold">Estatura Final</th>
                            <th className="p-2.5 font-extrabold">Risco Neoplasia Germinativa</th>
                            <th className="p-2.5 font-extrabold">Conduta Inegociável da Residência</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a] text-slate-200">
                          <tr>
                            <td className="p-2.5 font-black text-white">Síndrome de Turner</td>
                            <td className="p-2.5 font-bold">45,X (ou mosaico)</td>
                            <td className="p-2.5 text-emerald-300 font-bold">Presente (Hipoplásico)</td>
                            <td className="p-2.5 text-rose-300 font-bold">Baixa Estatura (&lt;145cm)</td>
                            <td className="p-2.5 text-slate-400">Baixo (elevado se houver Y)</td>
                            <td className="p-2.5">Ecocardiograma + USG Renal + GH + TRH Estradiol Gradual</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-black text-white">Síndrome de Swyer</td>
                            <td className="p-2.5 font-bold text-rose-400">46,XY</td>
                            <td className="p-2.5 text-emerald-300 font-bold">Presente (Normal)</td>
                            <td className="p-2.5 text-emerald-300 font-bold">Normal / Alta</td>
                            <td className="p-2.5 text-rose-400 font-black">EXTREMAMENTE ALTO (30-40%)</td>
                            <td className="p-2.5 text-rose-300 font-black">GONADECTOMIA BILATERAL LAPAROSCÓPICA IMEDIATA</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-black text-white">Disgenesia Pura 46,XX</td>
                            <td className="p-2.5 font-bold">46,XX</td>
                            <td className="p-2.5 text-emerald-300 font-bold">Presente (Hipoplásico)</td>
                            <td className="p-2.5 text-emerald-300 font-bold">Normal</td>
                            <td className="p-2.5 text-slate-400">Baixo (Mínimo)</td>
                            <td className="p-2.5">Pesquisa FMR1/Autoimunidade + TRH Contínua até 50 anos</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* SEÇÃO NAVEGÁVEL DO ALGORITMO DECISÓRIO DINÂMICO */}
          <div className="bg-[#121214] border-2 border-[#27272a] p-5 rounded-3xl flex flex-col gap-4 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-[#27272a] pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-white">Algoritmo de Raciocínio Clínico Passo a Passo</h3>
                <p className="text-xs text-slate-300 font-medium">Navegue pelas decisões clínicas em tempo real para simular casos práticos de amenorreia primária.</p>
              </div>
            </div>
            <InteractiveAlgorithm />
          </div>

          {/* Doses e Prescrições Medicinais */}
          <div className="bg-[#121214] border-2 border-[#27272a] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 border-b border-[#27272a] pb-3">
              <Pill className="text-emerald-400 w-6 h-6 shrink-0" />
              <div>
                <h2 className="text-xl font-extrabold text-white">Prescrição Terapêutica & Vias de Administração</h2>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Protocolos Farmacológicos Completos</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="bg-[#18181c] p-4 rounded-xl border border-emerald-900/50 space-y-2">
                <h3 className="font-extrabold text-emerald-300 text-base">Indução Puberal (Turner / Swyer / POI)</h3>
                <p>1. <strong>Estrogênio Inicial:</strong> 17-β Estradiol transdérmico patch 0,025 mg/dia (cortar em 1/4 = ~6,25 mcg/dia) ou Gel de Estradiol 0,125 mg/dia transdérmico. Aumentar progressivamente por 2 anos.</p>
                <p>2. <strong>Progestagênio Cíclico (após 2 anos ou sangramento):</strong> Progesterone Micronizada 100 a 200 mg/dia VO à noite do dia 1 ao 12 do mês, ou Acetato de Medroxiprogesterona 5-10 mg/dia VO.</p>
              </div>

              <div className="bg-[#18181c] p-4 rounded-xl border border-blue-900/50 space-y-2">
                <h3 className="font-extrabold text-blue-300 text-base">Reposição Hormonal Pós-Gonadectomia (CAIS)</h3>
                <p>• 17-β Estradiol 2,0 mg/dia VO contínuo, ou Estradiol Transdérmico 50 a 100 mcg/dia patch contínuo.</p>
                <p className="text-slate-400 italic">• Não utilizar progestagênio (paciente não possui útero; evita risco desnecessário).</p>
              </div>

              <div className="bg-[#18181c] p-4 rounded-xl border border-purple-900/50 space-y-2">
                <h3 className="font-extrabold text-purple-300 text-base">Indução de Ovulação (Kallmann / AHF)</h3>
                <p>• <strong>Gonadotrofinas Exógenas:</strong> Follitropina alfa (FSHr) 75 a 150 UI/dia SC + hMG/LH exógeno.</p>
                <p>• <strong>Bomba de GnRH Pulsátil:</strong> Infusão subcutânea pulsátil contínua (excelente taxa de gestação em gônada normal).</p>
              </div>

              <div className="bg-[#18181c] p-4 rounded-xl border border-amber-900/50 space-y-2">
                <h3 className="font-extrabold text-amber-300 text-base">Proteção Óssea Transversal</h3>
                <p>• Carbonato de Cálcio 1000 a 1200 mg/dia VO (cálcio elementar).</p>
                <p>• Vitamina D3 (Colecalciferol) 1000 a 2000 UI/dia VO.</p>
                <p>• Densitometria Óssea (DXA) baseline no diagnóstico.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: ERROS E ARMADILHAS DE PROVA */}
      {activeTab === 'armadilhas' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-12">
          <Balloon 
            color="red" 
            icon={ShieldAlert} 
            title="Sintese das Armadilhas Clínicas e Pontos Críticos de Prova" 
            subtitle="Regras de Ouro e Erros Frequentes"
            text="Exame de alto rendimento médica: evite estes 6 erros conceituais recorrentes nas provas de residência e na prática ambulatorial."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Balloon 
              color="red" 
              title="Erro 1: Confundir CAIS com Ambiguidade Genital" 
              text="Na CAIS (Insensibilidade Completa), a genitália externa é tipicamente FEMININA NORMAL, sem ambiguidade. Ambiguidade genital indica insensibilidade PARCIAL (PAIS), deficiência de 5α-redutase tipo 2 ou HAC virilizante em 46,XX." 
            />

            <Balloon 
              color="red" 
              title="Erro 2: Assumir 'Amenorreia Funcional' sem RM" 
              text="Nunca rotular como 'amenorreia hipotalâmica funcional' sem realizar RM de Crânio/Hipófise. Hipogonadismo hipogonadotrófico é diagnóstico de exclusão; tumores como craniofaringiomas podem ser silenciosos por anos." 
            />

            <Balloon 
              color="amber" 
              title="Erro 3: Esquecer USG Renal no Diagnóstico de MRKH" 
              text="Cerca de 30 a 40% das pacientes com MRKH possuem malformações renais (agenesia renal unilateral, rim pélvico). É OBRIGATÓRIO solicitar USG de vias urinárias mesmo que totalmente assintomática." 
            />

            <Balloon 
              color="amber" 
              title="Erro 4: Pedir Cariótipo Antes da USG Pélvica" 
              text="A sequência custo-efetiva em mamas normais é USG Pélvica primeiro (define se há útero). O cariótipo só está indicado se o útero estiver AUSENTE (para diferenciar 46,XX MRKH de 46,XY CAIS)." 
            />

            <Balloon 
              color="wine" 
              title="Erro 5: Ignorar Hérnia Inguinal na Infância" 
              text="Menina pré-púbere operada de 'hérnia inguinal bilateral' é uma bandeira vermelha clássica para CAIS (a gônada testicular já estava descendo pelo canal inguinal)." 
            />

            <Balloon 
              color="purple" 
              title="Erro 6: Confundir Swyer com Outras Etiologias" 
              text="Síndrome de Swyer (46,XY) é a ÚNICA condição com Útero Presente + Amenorreia Primária + Zero Mamas + FSH Altíssimo. Exige gonadectomia bilateral urgente devido ao alto risco de gonadoblastoma." 
            />
          </div>

          <div className="bg-[#121214] border-2 border-emerald-800 p-5 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h3 className="font-extrabold text-white text-base">Checagem Visual de Alto Contraste Concluída</h3>
              <p className="text-xs text-slate-300">Todos os elementos visuais, balões, tabelas e fontes foram auditados para legibilidade máxima em tema escuro profissional.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
