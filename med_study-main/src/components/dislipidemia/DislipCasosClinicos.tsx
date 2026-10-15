import React, { useState } from 'react';
import { 
  FileQuestion, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  RotateCcw,
  Stethoscope,
  Heart,
  Flame,
  Dna,
  Pill
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  icon: any;
  vignette: string;
  examData: { [key: string]: string };
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  pearl: string;
}

const CASES: CaseStudy[] = [
  {
    id: 1,
    title: "Caso 1: Prevenção Secundária pós-IAM com Supra de ST",
    category: "Muito Alto Risco & Metas Estritas",
    icon: Heart,
    vignette: "Homem de 56 anos, hipertenso e ex-tabagista, sofreu Infarto Agudo do Miocárdio com supra de ST anterior há 3 semanas, sendo submetido a angioplastia primária com implante de stent farmacológico na artéria descendente anterior. Comparece à consulta ambulatorial de retorno em uso de AAS 100 mg, Ticagrelor 90 mg 2x/d, Enalapril 10 mg 2x/d e Metoprolol 50 mg/d. Seu perfil lipídico coletado sem jejum revela os dados ao lado.",
    examData: {
      "Colesterol Total": "218 mg/dL",
      "HDL-c": "38 mg/dL",
      "Triglicerídeos": "190 mg/dL",
      "LDL-c (Friedewald)": "142 mg/dL",
      "Colesterol Não-HDL": "180 mg/dL",
      "Função Renal": "Creatinina 0,9 mg/dL (TFG 88 mL/min)",
      "CPK": "95 U/L (Normal)"
    },
    question: "Considerando as Diretrizes da SBC e ESC para dislipidemias, qual a estratificação de risco, a meta de LDL-c e a conduta farmacológica mais adequada?",
    options: [
      {
        id: "A",
        text: "Alto Risco; Meta de LDL-c < 70 mg/dL; Prescrever Sinvastatina 40 mg à noite.",
        isCorrect: false,
        explanation: "Incorreto. Pacientes com DAC clínica manifesta (pós-IAM/stent) são classificados como de Muito Alto Risco, com meta de LDL-c < 50 mg/dL. Sinvastatina 40 mg é estatina de moderada potência, incapaz de reduzir 142 mg/dL para < 50 mg/dL."
      },
      {
        id: "B",
        text: "Muito Alto Risco; Meta de LDL-c < 50 mg/dL (e queda ≥ 50%); Iniciar Atorvastatina 80 mg/dia associada precocemente a Ezetimiba 10 mg/dia.",
        isCorrect: true,
        explanation: "Correto! Por ter DAC manifesta (IAM/angioplastia), o paciente é de Muito Alto Risco (Meta LDL-c < 50 mg/dL e redução ≥ 50%). Para sair de 142 para < 50 mg/dL é necessária uma redução de ~65%. Como a estatina de alta potência isolada reduz em média 50%, a associação precoce com Ezetimiba 10 mg (+15-20%) é o padrão-ouro mais eficaz para atingir a meta com segurança."
      },
      {
        id: "C",
        text: "Muito Alto Risco; Meta de LDL-c < 70 mg/dL; Iniciar Fenofibrato 200 mg/dia devido aos triglicerídeos de 190 mg/dL.",
        isCorrect: false,
        explanation: "Incorreto. A meta em muito alto risco é < 50 mg/dL (não 70). Além disso, TG de 190 mg/dL não tem indicação de fibrato de rotina; as estatinas já reduzem os TG em 15-30% e devem ser a prioridade primária."
      },
      {
        id: "D",
        text: "Risco Intermediário; Meta de LDL-c < 100 mg/dL; Recomendar apenas MEV por 3 meses antes de introduzir hipolipemiante.",
        isCorrect: false,
        explanation: "Incorreto e perigoso. Todo paciente pós-SCA deve sair do hospital já em uso de estatina de alta potência, sem adiar farmacoterapia."
      }
    ],
    pearl: "Pérola Clínica: Em prevenção secundária após infarto ou AVC, não perca tempo titulando estatinas lentamente. Se a redução percentual necessária de LDL for superior a 50-55%, prescrever a combinação de Estatina de Alta Potência + Ezetimiba 10 mg logo no início garante que mais de 80% dos pacientes atinjam a meta de < 50 mg/dL na primeira consulta de reavaliação (estudo RACING)."
  },
  {
    id: 2,
    title: "Caso 2: Dor Abdominal Intensa e Sangue Lactescente na UPA",
    category: "Hipertrigliceridemia Grave & Pancreatite",
    icon: Flame,
    vignette: "Homem de 41 anos, etilista diário de cerveja e sedentário, dá entrada na sala de emergência com dor abdominal epigástrica lancinante de início súbito após churrasco, em barra, irradiando para o dorso, acompanhada de vômitos incoercíveis. Ao colher exames, a enfermagem nota que o sangue no tubo apresenta uma camada superior esbranquiçada leitosa e espessa (lipemia intensa).",
    examData: {
      "Triglicerídeos": "1.920 mg/dL",
      "Colesterol Total": "390 mg/dL",
      "Amilase": "180 U/L (levemente elevada)",
      "Lipase": "820 U/L (elevada > 3x LSN)",
      "Glicemia": "210 mg/dL",
      "Tomografia Abdome": "Edema pancreático difuso com densificação da gordura peripancreática (Balthazar C)"
    },
    question: "Qual o diagnóstico definitivo e a conduta terapêutica imediata recomendada?",
    options: [
      {
        id: "A",
        text: "Pancreatite Aguda por Hipertrigliceridemia; Prescrever Sinvastatina 40 mg + Genfibrozila 600 mg 2x/dia imediatamente.",
        isCorrect: false,
        explanation: "Incorreto e gravíssimo. NUNCA associar Genfibrozila com Sinvastatina devido ao risco catastrófico de rabdomiólise. Além disso, em crise aguda com dor e vômitos, a via oral está suspensa e a estatina oral não clareará os TG agudamente."
      },
      {
        id: "B",
        text: "Pancreatite Aguda Hipertrigliceridêmica; Jejum oral absoluto, hidratação venosa vigorosa e infusão contínua de Insulina Regular IV com SG a 5% guiada por glicemia.",
        isCorrect: true,
        explanation: "Correto! Níveis de TG > 1.000 mg/dL geram hiperviscosidade e liberação tóxica de ácidos graxos livres. A conduta hospitalar imediata consiste em jejum total (interrompe síntese de quilomícrons), hidratação venosa e infusão contínua de Insulina Regular IV (0,1 a 0,3 U/kg/h) com SG 5% para manter glicemia 150-200 mg/dL. A insulina é o maior ativador da LPL endotelial, clareando quilomícrons em 24 a 48h."
      },
      {
        id: "C",
        text: "Pancreatite Alcoólica pura; O valor de triglicerídeos é apenas um epifenômeno reativo que não necessita de tratamento direcionado.",
        isCorrect: false,
        explanation: "Incorreto. Níveis de TG de 1.920 mg/dL são causa primária direta da pancreatite necrotizante e devem ser reduzidos com urgência para < 500 mg/dL para cessar a lesão acinar."
      },
      {
        id: "D",
        text: "Pancreatite Crônica Agudizada; Indicação imediata de cirurgia para desbridamento pancreático explorador.",
        isCorrect: false,
        explanation: "Incorreto. A pancreatite aguda na fase precoce tem manejo exclusivamente clínico em UTI/semi-intensiva."
      }
    ],
    pearl: "Pérola de Emergência: Em pacientes com hipertrigliceridemia extrema (> 1.000 mg/dL), a amilase sérica pode apresentar falso-negativo ou elevação discreta devido à interferência física dos quilomícrons na reação colorimétrica/espectrofotométrica do laboratório. Por isso, a dosagem de lipase e a tomografia com contraste são fundamentais para o diagnóstico."
  },
  {
    id: 3,
    title: "Caso 3: Jovem com Espessamento do Tendão de Aquiles",
    category: "Hipercolesterolemia Familiar (HF)",
    icon: Dna,
    vignette: "Mulher de 32 anos, assintomática, comparece para consulta de rotina. Ao exame físico, o médico observa arco corneano esbranquiçado bilateral completo e nódulos indolores endurecidos nos tendões de Aquiles bilateralmente (xantomas tendíneos). Relata que seu pai faleceu subitamente de infarto aos 42 anos e seu irmão de 35 anos colocou dois stents coronários no ano passado.",
    examData: {
      "Colesterol Total": "382 mg/dL",
      "LDL-c (Friedewald)": "310 mg/dL",
      "HDL-c": "44 mg/dL",
      "Triglicerídeos": "140 mg/dL",
      "TSH": "2,1 mUI/L (Normal)",
      "Creatinina": "0,7 mg/dL",
      "Glicemia de Jejum": "86 mg/dL"
    },
    question: "Qual o diagnóstico mais provável segundo o escore DLCN (Dutch Lipid Clinic Network) e qual o plano terapêutico inicial?",
    options: [
      {
        id: "A",
        text: "Dislipidemia Mista Secundária a Hipotireoidismo; Prescrever levotiroxina 50 mcg/dia.",
        isCorrect: false,
        explanation: "Incorreto. O TSH está normal (2,1), afastando hipotireoidismo secundário."
      },
      {
        id: "B",
        text: "Hipercolesterolemia Familiar (Diagnóstico Definitivo pelo DLCN > 8); Iniciar Estatina de Alta Potência + Ezetimiba e realizar rastreamento em cascata nos familiares de 1º grau.",
        isCorrect: true,
        explanation: "Correto! O escore DLCN desta paciente pontua: Parente 1º grau com DAC precoce (+1), xantoma tendíneo no exame físico (+6), arco corneano < 45 anos (+4), LDL-c entre 250 e 329 mg/dL (+5), totalizando 16 pontos (Definitivo se > 8 pts). O tratamento exige Estatina de alta intensidade + Ezetimiba e avaliação obrigatória em cascata de pais, irmãos e filhos."
      },
      {
        id: "C",
        text: "Hiperlipidemia Familiar Combinada; Prescrever apenas Fenofibrato e dieta pobre em carboidratos.",
        isCorrect: false,
        explanation: "Incorreto. Os triglicerídeos são normais (140) e a presença de xantoma tendíneo é patognomônica de Hipercolesterolemia Familiar (mutação no LDLR/ApoB/PCSK9)."
      },
      {
        id: "D",
        text: "Disbetalipoproteinemia Tipo III; Indicar plasmaférese imediata.",
        isCorrect: false,
        explanation: "Incorreto. O Tipo III apresenta xantomas palmares e proporção CT/TG de 1:1."
      }
    ],
    pearl: "Pérola Genética: A Hipercolesterolemia Familiar é comum (1:250 pessoas), mas menos de 10% dos portadores são diagnosticados no Brasil. O xantoma tendíneo (especialmente no tendão de Aquiles) é o achado físico mais específico. O rastreamento em cascata dos familiares de 1º grau (pais, irmãos e filhos) é custo-efetivo e salva vidas precocemente."
  },
  {
    id: 4,
    title: "Caso 4: Dor Muscular Bilateral após Início de Sinvastatina",
    category: "Manejo dos Sintomas Musculares (SAMS)",
    icon: Pill,
    vignette: "Mulher de 64 anos, diabética e hipertensa (Alto Risco Cardiovascular, meta LDL < 70 mg/dL), iniciou Sinvastatina 40 mg há 3 semanas. Retorna queixando-se de dor em peso, fadiga e queimação contínua nas coxas e panturrilhas, com piora ao subir escadas, sem alteração na cor da urina. A paciente está muito ansiosa e cogita abandonar definitivamente qualquer tratamento.",
    examData: {
      "CPK Sérico": "110 U/L (Normal de referência até 170 U/L)",
      "Creatinina": "0,8 mg/dL",
      "TGO / AST": "26 U/L",
      "TGP / ALT": "28 U/L",
      "LDL-c Inicial": "162 mg/dL",
      "LDL-c Atual": "114 mg/dL"
    },
    question: "Como conduzir adequadamente o caso desta paciente para manter a proteção cardiovascular?",
    options: [
      {
        id: "A",
        text: "Diagnosticar rabdomiólise iminente e contraindicar qualquer estatina pelo resto da vida.",
        isCorrect: false,
        explanation: "Incorreto. A CPK está absolutamente normal (110 U/L) e a urina é clara. Não há rabdomiólise nem miosite, apenas mialgia simples ou efeito nocebo."
      },
      {
        id: "B",
        text: "Ignorar a queixa da paciente e manter a Sinvastatina 40 mg na mesma dose, dizendo que o sintoma é psicológico.",
        isCorrect: false,
        explanation: "Incorreto. Ignorar a queixa destrói a relação médico-paciente e levará ao abandono do tratamento."
      },
      {
        id: "C",
        text: "Suspender a Sinvastatina por 2 a 4 semanas (washout); após alívio dos sintomas, prescrever estatina hidrofílica em baixa dose (Rosuvastatina 5 a 10 mg 2-3x/semana ou diária) associada a Ezetimiba 10 mg/dia.",
        isCorrect: true,
        explanation: "Correto! Trata-se de mialgia com CPK normal. A conduta preconizada pelas diretrizes é o 'washout' temporário para verificar o nexo causal. Em seguida, troca-se a estatina lipofílica (sinvastatina, que penetra no miócito) por uma estatina hidrofílica hepato-seletiva (Rosuvastatina ou Pravastatina). O uso de Rosuvastatina em dias alternados ou baixas doses combinada com Ezetimiba 10 mg atinge a meta de LDL < 70 mg/dL com excelente tolerabilidade muscular."
      },
      {
        id: "D",
        text: "Iniciar reposição empírica de Coenzima Q10 em altas doses e dobrar a Sinvastatina para 80 mg.",
        isCorrect: false,
        explanation: "Incorreto. Ensaios clínicos randomizados demonstraram que a Coenzima Q10 não tem eficácia superior ao placebo para SAMS, e a dose de Sinvastatina 80 mg é formalmente contraindicada por toxicidade muscular."
      }
    ],
    pearl: "Pérola de Adesão: A maioria dos pacientes que relatam dor muscular com uma estatina tolera perfeitamente outra molécula, especialmente estatinas hidrofílicas como Rosuvastatina ou Pravastatina. A Rosuvastatina possui meia-vida longa de 19h e pode ser prescrita em dias alternados (ex: segundas, quartas e sextas), mantendo grande redução de LDL e zero sintomas musculares."
  }
];

export default function DislipCasosClinicos() {
  const [selectedCaseId, setSelectedCaseId] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<{ [caseId: number]: string }>({});
  const [showExplanations, setShowExplanations] = useState<{ [caseId: number]: boolean }>({});

  const currentCase = CASES.find((c) => c.id === selectedCaseId) || CASES[0];
  const IconComponent = currentCase.icon;
  const currentAnswer = userAnswers[currentCase.id];
  const isAnswered = currentAnswer !== undefined;

  const handleSelectOption = (optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentCase.id]: optionId }));
    setShowExplanations((prev) => ({ ...prev, [currentCase.id]: true }));
  };

  const handleResetCurrent = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
    setShowExplanations((prev) => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-emerald-950/20 via-card to-card border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">
          <FileQuestion size={16} />
          <span>Simulação Clínica Baseada em Evidências</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Casos Clínicos Interativos & Tomada de Decisão
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          Resolva casos clínicos reais de dislipidemias, hipercolesterolemia, hipertrigliceridemia grave e intolerâncias medicamentosas. Teste seu raciocínio diagnóstico e terapêutico conforme as diretrizes da SBC e ESC.
        </p>

        {/* Navegador de Casos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-6 border-t border-line">
          {CASES.map((c) => {
            const hasAnswered = userAnswers[c.id] !== undefined;
            const chosenOption = c.options.find((opt) => opt.id === userAnswers[c.id]);
            const isCorrect = chosenOption?.isCorrect;

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all relative overflow-hidden",
                  selectedCaseId === c.id
                    ? "bg-emerald-600/10 border-emerald-600 shadow-md ring-2 ring-emerald-600/30"
                    : "bg-card border-line hover:border-emerald-500/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-ink-muted">Caso {c.id}</span>
                  {hasAnswered && (
                    <span className={cn("w-2 h-2 rounded-full", isCorrect ? "bg-emerald-500" : "bg-red-500")}></span>
                  )}
                </div>
                <h4 className="font-bold text-xs text-brand-navy mt-1 truncate">{c.title.split(':')[1]}</h4>
                <span className="text-[9px] text-ink-muted block truncate mt-0.5">{c.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Caso Clínico Ativo */}
      <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
              <IconComponent size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{currentCase.category}</span>
              <h3 className="text-xl font-bold text-brand-navy">{currentCase.title}</h3>
            </div>
          </div>
          {isAnswered && (
            <button
              onClick={handleResetCurrent}
              className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-brand-navy px-3 py-1.5 rounded-xl border border-line w-fit"
            >
              <RotateCcw size={14} />
              <span>Refazer Caso</span>
            </button>
          )}
        </div>

        {/* História e Exames */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-2">História Clínica & Exame Físico:</h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {currentCase.vignette}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">Dados Laboratoriais:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {Object.entries(currentCase.examData).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-line/60">
                    <span className="text-[10px] text-ink-muted block">{key}</span>
                    <span className="text-xs font-bold text-brand-navy mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pergunta e Alternativas */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-950 dark:text-indigo-200">
              {currentCase.question}
            </div>

            <div className="space-y-2.5">
              {currentCase.options.map((opt) => {
                const isSelected = currentAnswer === opt.id;
                const isCorrect = opt.isCorrect;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={cn(
                      "w-full p-3.5 rounded-2xl border text-left transition-all text-xs flex items-start gap-3",
                      !isAnswered && "bg-card border-line hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20",
                      isAnswered && isSelected && isCorrect && "bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/30",
                      isAnswered && isSelected && !isCorrect && "bg-red-500/10 border-red-500 text-red-950 dark:text-red-200 font-semibold ring-2 ring-red-500/30",
                      isAnswered && !isSelected && isCorrect && "bg-emerald-500/5 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-semibold",
                      isAnswered && !isSelected && !isCorrect && "bg-card border-line opacity-50"
                    )}
                  >
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
                      !isAnswered && "bg-slate-100 dark:bg-slate-800 text-brand-navy",
                      isAnswered && isCorrect && "bg-emerald-500 text-white",
                      isAnswered && isSelected && !isCorrect && "bg-red-500 text-white",
                      isAnswered && !isSelected && !isCorrect && "bg-slate-100 dark:bg-slate-800 text-ink-muted"
                    )}>
                      {opt.id}
                    </span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comentários e Pérola Clínica */}
        {isAnswered && (
          <div className="space-y-4 pt-4 border-t border-line animate-fadeIn">
            <div className={cn(
              "p-4 rounded-2xl border text-xs space-y-2",
              currentCase.options.find((o) => o.id === currentAnswer)?.isCorrect
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200"
                : "bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-200"
            )}>
              <div className="font-bold text-sm flex items-center gap-2">
                {currentCase.options.find((o) => o.id === currentAnswer)?.isCorrect ? (
                  <>
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>Resposta Correta!</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} className="text-red-600" />
                    <span>Resposta Incorreta</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed">
                {currentCase.options.find((o) => o.id === currentAnswer)?.explanation}
              </p>
            </div>

            {/* Pérola Clínica */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-3">
              <Sparkles className="shrink-0 mt-0.5 text-amber-600" size={18} />
              <div>
                <strong>{currentCase.pearl}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
