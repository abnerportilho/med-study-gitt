import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, AlertTriangle, Info, CheckCircle2, 
  RotateCcw, Scale, Ruler, User, Activity, Sparkles,
  ShieldCheck, FileText, ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SexType = 'F' | 'M' | null;
export type CreatinineUnit = 'mgdl' | 'umol';

export interface StageDetails {
  stage: 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
  title: string;
  range: string;
  description: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  badgeBg: string;
  conduct: string;
}

export const STAGE_CONFIG: Record<string, StageDetails> = {
  G1: {
    stage: 'G1',
    title: 'G1 — Normal ou Alta',
    range: '≥ 90 mL/min/1,73m²',
    description: 'Função renal normal ou elevada. Diagnóstico de DRC requer marcadores de lesão renal (ex: albuminúria ≥30 mg/g) persistentes por >3 meses.',
    colorBg: 'bg-emerald-500/10 dark:bg-emerald-950/20',
    colorBorder: 'border-emerald-500/30',
    colorText: 'text-emerald-700 dark:text-emerald-300',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700',
    conduct: 'Tratar causas de base (HAS, DM), rastrear albuminúria anual e manter metas pressóricas/glicêmicas.'
  },
  G2: {
    stage: 'G2',
    title: 'G2 — Levemente Reduzida',
    range: '60–89 mL/min/1,73m²',
    description: 'Perda leve da função glomerular. Frequente em idosos pelo envelhecimento fisiológico. Requer lesão renal documentada para definir DRC.',
    colorBg: 'bg-emerald-500/10 dark:bg-emerald-950/20',
    colorBorder: 'border-emerald-500/30',
    colorText: 'text-emerald-700 dark:text-emerald-300',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700',
    conduct: 'Avaliar progressão, estimar perda anual da TFG, controle de fatores de risco cardiovascular e nefroproteção (iSGLT2 / IECA / BRA).'
  },
  G3a: {
    stage: 'G3a',
    title: 'G3a — Leve a Moderada',
    range: '45–59 mL/min/1,73m²',
    description: 'Redução funcional clinicamente significativa. Configura DRC mesmo na ausência de albuminúria se confirmada por mais de 3 meses.',
    colorBg: 'bg-amber-500/10 dark:bg-amber-950/20',
    colorBorder: 'border-amber-500/30',
    colorText: 'text-amber-700 dark:text-amber-300',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700',
    conduct: 'Monitorar TFG e albuminúria a cada 6 meses. Iniciar rastreamento de complicações (anemia, DMO-DRC) e ajustar doses de medicações renais.'
  },
  G3b: {
    stage: 'G3b',
    title: 'G3b — Moderada a Grave',
    range: '30–44 mL/min/1,73m²',
    description: 'Risco cardiovascular e de progressão substancialmente aumentado. Complicações metabólicas (anemia, acidose, hiperparatireoidismo) tornam-se frequentes.',
    colorBg: 'bg-orange-500/10 dark:bg-orange-950/20',
    colorBorder: 'border-orange-500/30',
    colorText: 'text-orange-700 dark:text-orange-300',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700',
    conduct: 'Acompanhamento conjunto ou referenciamento com Nefrologia. Vacinação completa (Hepatite B, pneumococo). Atenção redobrada a contraste iodado e AINEs.'
  },
  G4: {
    stage: 'G4',
    title: 'G4 — Grave',
    range: '15–29 mL/min/1,73m²',
    description: 'Disfunção renal avançada. Alto risco de transição para necessidade de terapia renal substitutiva (TRS) nos próximos meses a anos.',
    colorBg: 'bg-rose-500/10 dark:bg-rose-950/20',
    colorBorder: 'border-rose-500/30',
    colorText: 'text-rose-700 dark:text-rose-300',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-200 dark:border-rose-700',
    conduct: 'Seguimento nefrológico estrito a cada 1–3 meses. Planejamento de acesso vascular definitivo (fístula arteriovenosa - FAV) ou diálise peritoneal; preparo para transplante pré-emptivo.'
  },
  G5: {
    stage: 'G5',
    title: 'G5 — Falência Renal',
    range: '< 15 mL/min/1,73m²',
    description: 'Fase terminal da doença renal crônica. Risco iminente de síndrome urêmica, hipercalemia refratária, acidose metabólica grave e hipervolemia com edema pulmonar.',
    colorBg: 'bg-red-500/15 dark:bg-red-950/30',
    colorBorder: 'border-red-500/40',
    colorText: 'text-red-700 dark:text-red-300',
    badgeBg: 'bg-red-200 text-red-900 border-red-400 dark:bg-red-900/60 dark:text-red-100 dark:border-red-600',
    conduct: 'Indicação de início de Terapia Renal Substitutiva (Hemodiálise / Diálise Peritoneal) ou Transplante Renal se sintomas urêmicos ou complicações metabólicas incontroláveis.'
  }
};

export function calculateCKDEpi2021(age: number, sex: 'F' | 'M', scrMgDl: number): number {
  const isFemale = sex === 'F';
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const sexFactor = isFemale ? 1.012 : 1.0;

  const ratio = scrMgDl / kappa;
  const minTerm = Math.pow(Math.min(ratio, 1), alpha);
  const maxTerm = Math.pow(Math.max(ratio, 1), -1.2);
  const ageTerm = Math.pow(0.9938, age);

  return 142 * minTerm * maxTerm * ageTerm * sexFactor;
}

export function calculateBSA(heightCm: number, weightKg: number): number {
  return 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);
}

export function getKDIGOStage(gfrNormalized: number): StageDetails {
  if (gfrNormalized >= 90) return STAGE_CONFIG.G1;
  if (gfrNormalized >= 60) return STAGE_CONFIG.G2;
  if (gfrNormalized >= 45) return STAGE_CONFIG.G3a;
  if (gfrNormalized >= 30) return STAGE_CONFIG.G3b;
  if (gfrNormalized >= 15) return STAGE_CONFIG.G4;
  return STAGE_CONFIG.G5;
}

export default function CKDEPICalculator() {
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<SexType>(null);
  const [creatinine, setCreatinine] = useState<string>('');
  const [unit, setUnit] = useState<CreatinineUnit>('mgdl');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const ageInputId = useId();
  const creatInputId = useId();
  const unitSelectId = useId();
  const heightInputId = useId();
  const weightInputId = useId();

  // Parsing values
  const ageNum = parseFloat(age);
  const creatNum = parseFloat(creatinine.replace(',', '.'));
  const heightNum = parseFloat(height.replace(',', '.'));
  const weightNum = parseFloat(weight.replace(',', '.'));

  // Validation rules
  const hasEnteredAge = !isNaN(ageNum) && age !== '';
  const isPediatric = hasEnteredAge && ageNum < 18;
  const isAgeValid = hasEnteredAge && ageNum >= 18;
  const isCreatValid = !isNaN(creatNum) && creatNum > 0;
  const hasRequiredFields = isAgeValid && sex !== null && isCreatValid;

  // Computations
  let scrMgDl = 0;
  let gfrNormalized = 0;
  let gfrNormalizedRounded = 0;
  let stage: StageDetails | null = null;
  let bsa: number | null = null;
  let gfrAbsolute: number | null = null;
  let gfrAbsoluteRounded: number | null = null;

  if (hasRequiredFields && sex) {
    scrMgDl = unit === 'umol' ? creatNum / 88.4 : creatNum;
    gfrNormalized = calculateCKDEpi2021(ageNum, sex, scrMgDl);
    gfrNormalizedRounded = Math.round(gfrNormalized);
    stage = getKDIGOStage(gfrNormalizedRounded);

    if (!isNaN(heightNum) && heightNum > 0 && !isNaN(weightNum) && weightNum > 0) {
      bsa = calculateBSA(heightNum, weightNum);
      gfrAbsolute = gfrNormalized * (bsa / 1.73);
      gfrAbsoluteRounded = Math.round(gfrAbsolute);
    }
  }

  const handleReset = () => {
    setAge('');
    setSex(null);
    setCreatinine('');
    setUnit('mgdl');
    setHeight('');
    setWeight('');
  };

  const handleLoadTestCase = (creatVal: string) => {
    setAge('55');
    setSex('M');
    setCreatinine(creatVal);
    setUnit('mgdl');
    setHeight('150');
    setWeight('60');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-900/10 via-brand-blue/5 to-transparent p-6 md:p-8 rounded-3xl border border-line">
        <div>
          <div className="flex items-center gap-2 text-brand-blue mb-1">
            <span className="p-1 rounded-md bg-brand-blue/10 border border-brand-blue/20">
              <Calculator size={16} />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Nefrologia Clínica & Diretrizes KDIGO / SBN</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
            Calculadora CKD-EPI 2021 (TFG estimada)
          </h1>
          <p className="text-sm text-ink-muted mt-1 max-w-2xl">
            Equação oficial recomendada pelo <strong>KDIGO 2021/2024</strong> e pela <strong>Sociedade Brasileira de Nefrologia (SBN)</strong>, sem coeficiente de ajuste racial, com cálculo opcional de BSA e TFG absoluta para ajuste farmacológico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-ink-muted hover:text-brand-navy bg-card hover:bg-bg border border-line rounded-xl transition-all shadow-sm"
            title="Limpar formulário"
          >
            <RotateCcw size={14} />
            <span>Limpar</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Form + Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="card p-6 md:p-7 border border-line bg-card shadow-sm rounded-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h2 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <User size={18} className="text-brand-blue" />
                Parâmetros do Paciente
              </h2>
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                * Campos obrigatórios
              </span>
            </div>

            {/* Error / Warning Alert for Pediatrics */}
            <AnimatePresence>
              {isPediatric && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
                    <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block mb-0.5">Aviso de Faixa Etária:</strong>
                      CKD-EPI validada para adultos (≥18 anos). Para pediatria, usar Schwartz.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {/* Idade */}
              <div>
                <label htmlFor={ageInputId} className="block text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wider">
                  Idade (anos) *
                </label>
                <div className="relative">
                  <input
                    id={ageInputId}
                    type="number"
                    min="1"
                    max="125"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Ex: 55"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-bg text-brand-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-muted pointer-events-none">
                    anos
                  </span>
                </div>
              </div>

              {/* Sexo Biológico */}
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wider">
                  Sexo Biológico *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSex('F')}
                    className={cn(
                      "py-2.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2",
                      sex === 'F'
                        ? "bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20"
                        : "bg-bg text-ink-muted border-line hover:border-brand-blue/40 hover:text-brand-navy"
                    )}
                  >
                    <span>Feminino</span>
                    {sex === 'F' && <CheckCircle2 size={16} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSex('M')}
                    className={cn(
                      "py-2.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2",
                      sex === 'M'
                        ? "bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20"
                        : "bg-bg text-ink-muted border-line hover:border-brand-blue/40 hover:text-brand-navy"
                    )}
                  >
                    <span>Masculino</span>
                    {sex === 'M' && <CheckCircle2 size={16} />}
                  </button>
                </div>
              </div>

              {/* Creatinina Sérica */}
              <div>
                <label htmlFor={creatInputId} className="block text-xs font-bold text-brand-navy mb-1.5 uppercase tracking-wider">
                  Creatinina Sérica *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      id={creatInputId}
                      type="number"
                      step="0.01"
                      min="0.1"
                      value={creatinine}
                      onChange={(e) => setCreatinine(e.target.value)}
                      placeholder="Ex: 1.2"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-bg text-brand-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                    />
                  </div>
                  <select
                    id={unitSelectId}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as CreatinineUnit)}
                    className="px-3 py-2.5 rounded-xl border border-line bg-bg text-brand-navy text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer"
                  >
                    <option value="mgdl">mg/dL</option>
                    <option value="umol">µmol/L</option>
                  </select>
                </div>
                {unit === 'umol' && creatNum > 0 && (
                  <p className="text-[11px] text-ink-muted mt-1">
                    Convertido: {(creatNum / 88.4).toFixed(2)} mg/dL
                  </p>
                )}
              </div>

              {/* Seção Opcional: Altura e Peso */}
              <div className="pt-3 border-t border-line">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy mb-2">
                  <Ruler size={14} className="text-brand-blue" />
                  <span>Antropometria (Opcional — para Superfície Corporal e TFG Absoluta)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={heightInputId} className="block text-[11px] font-semibold text-ink-muted mb-1">
                      Altura (cm)
                    </label>
                    <div className="relative">
                      <input
                        id={heightInputId}
                        type="number"
                        step="0.5"
                        min="50"
                        max="250"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Ex: 170"
                        className="w-full px-3.5 py-2 rounded-xl border border-line bg-bg text-brand-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted pointer-events-none">
                        cm
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={weightInputId} className="block text-[11px] font-semibold text-ink-muted mb-1">
                      Peso (kg)
                    </label>
                    <div className="relative">
                      <input
                        id={weightInputId}
                        type="number"
                        step="0.5"
                        min="20"
                        max="300"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Ex: 70"
                        className="w-full px-3.5 py-2 rounded-xl border border-line bg-bg text-brand-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted pointer-events-none">
                        kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Test Case Buttons */}
            <div className="pt-3 border-t border-line">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block mb-2">
                Casos Rápidos de Validação (Paciente 55 anos, Masc, 150cm, 60kg):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadTestCase('2.5')}
                  className="px-2.5 py-1.5 rounded-lg bg-bg hover:bg-brand-blue/10 border border-line text-[11px] font-bold text-ink-muted hover:text-brand-blue transition-colors"
                >
                  Cr 2,5 mg/dL → TFG 30
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadTestCase('2.0')}
                  className="px-2.5 py-1.5 rounded-lg bg-bg hover:bg-brand-blue/10 border border-line text-[11px] font-bold text-ink-muted hover:text-brand-blue transition-colors"
                >
                  Cr 2,0 mg/dL → TFG 39
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadTestCase('1.6')}
                  className="px-2.5 py-1.5 rounded-lg bg-bg hover:bg-brand-blue/10 border border-line text-[11px] font-bold text-ink-muted hover:text-brand-blue transition-colors"
                >
                  Cr 1,6 mg/dL → TFG 51
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results Display */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="card p-6 md:p-7 border border-line bg-card shadow-sm rounded-2xl flex flex-col gap-5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h2 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <Activity size={18} className="text-brand-blue" />
                Resultado da Taxa de Filtração Glomerular
              </h2>
              {stage && (
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border", stage.badgeBg)}>
                  Estágio {stage.stage}
                </span>
              )}
            </div>

            {hasRequiredFields && stage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-6"
              >
                {/* Main Card Result */}
                <div className={cn(
                  "p-6 rounded-2xl border flex flex-col items-center justify-center text-center relative overflow-hidden transition-all",
                  stage.colorBg,
                  stage.colorBorder
                )}>
                  <span className="text-[11px] font-black uppercase tracking-widest text-ink-muted mb-1">
                    TFG Estimada (Normalizada)
                  </span>

                  <div className="flex items-baseline justify-center gap-2">
                    <span className={cn("text-5xl md:text-6xl font-black tracking-tight", stage.colorText)}>
                      {gfrNormalizedRounded}
                    </span>
                    <span className="text-sm font-bold text-ink-muted">
                      mL/min/1,73m²
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider", stage.badgeBg)}>
                      <ShieldCheck size={14} />
                      {stage.title}
                    </span>
                  </div>

                  <p className="text-xs text-brand-navy mt-3 max-w-md font-medium leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* TFG Absoluta e BSA (quando preenchidos) */}
                {bsa !== null && gfrAbsoluteRounded !== null ? (
                  <div className="p-5 rounded-xl border border-line bg-bg/80 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Scale size={16} className="text-brand-blue" />
                        <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                          TFG Absoluta (Ajustada à BSA do Paciente)
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-brand-blue border border-blue-500/20">
                        Para Doses Farmacológicas
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 rounded-xl bg-card border border-line flex flex-col">
                        <span className="text-[11px] text-ink-muted font-semibold">TFG Absoluta:</span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-2xl font-black text-brand-navy">{gfrAbsoluteRounded}</span>
                          <span className="text-xs font-bold text-ink-muted">mL/min</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-card border border-line flex flex-col">
                        <span className="text-[11px] text-ink-muted font-semibold">Superfície Corporal (DuBois):</span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-2xl font-black text-brand-navy">{bsa.toFixed(2)}</span>
                          <span className="text-xs font-bold text-ink-muted">m²</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      * A <strong>TFG absoluta</strong> (desindexada de 1,73m²) é recomendada pelas diretrizes internacionais para ajuste de dose de fármacos de estreita margem terapêutica (como quimioterápicos, antibióticos e anticoagulantes) em pacientes com peso ou estatura distantes da média populacional.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-line bg-bg/40 flex items-start gap-3">
                    <Info size={16} className="text-brand-blue shrink-0 mt-0.5" />
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Preencha a <strong>altura</strong> e o <strong>peso</strong> no formulário para calcular a <strong>Superfície Corporal (BSA - fórmula de DuBois &amp; DuBois)</strong> e obter a <strong>TFG Absoluta (em mL/min)</strong>.
                    </p>
                  </div>
                )}

                {/* Conduta Recomendada KDIGO */}
                <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20 flex flex-col gap-1.5">
                  <span className="text-xs font-black text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} />
                    Conduta e Manejo Recomendados ({stage.stage}):
                  </span>
                  <p className="text-xs text-brand-navy leading-relaxed">
                    {stage.conduct}
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Empty Placeholder State */
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                  <Calculator size={32} />
                </div>
                <h3 className="font-bold text-base text-brand-navy">
                  Aguardando dados obrigatórios
                </h3>
                <p className="text-xs text-ink-muted max-w-xs leading-relaxed">
                  Informe a <strong>idade (≥18 anos)</strong>, o <strong>sexo biológico</strong> e a <strong>creatinina sérica</strong> ao lado para calcular a TFG estimada instantaneamente.
                </p>
              </div>
            )}

            {/* Footnote / Disclaimer */}
            <div className="pt-4 border-t border-line text-[11px] text-ink-muted leading-relaxed flex items-start gap-2">
              <Info size={14} className="shrink-0 text-ink-muted mt-0.5" />
              <div>
                <strong>Nota de rodapé:</strong> Uso restrito a apoio educacional/clínico. Não substitui julgamento médico. A fórmula CKD-EPI 2021 assume função renal estável (não válida em lesão renal aguda).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KDIGO Staging Reference Table */}
      <div className="card p-6 md:p-8 border border-line bg-card shadow-sm rounded-2xl flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-line">
          <div>
            <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2">
              <FileText size={18} className="text-brand-blue" />
              Estadiamento Prognóstico da DRC (KDIGO / KDOQI)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Classificação por categorias de TFG (Estágios G1 a G5). A confirmação diagnóstica requer persistência &gt; 3 meses.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-ink-muted self-start sm:self-auto">
            KDIGO 2024 / SBN
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-line text-ink-muted font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Estágio</th>
                <th className="py-2.5 px-3">TFG (mL/min/1,73m²)</th>
                <th className="py-2.5 px-3">Classificação Clínica</th>
                <th className="py-2.5 px-3">Frequência Mínima de Monitoramento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                { stage: 'G1', range: '≥ 90', label: 'Normal ou alta', monitor: '1x ao ano (se marcadores de lesão renal presentes)', badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
                { stage: 'G2', range: '60–89', label: 'Levemente reduzida', monitor: '1x ao ano (avaliar progressão anual da TFG)', badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
                { stage: 'G3a', range: '45–59', label: 'Leve a moderada', monitor: '1 a 2x ao ano (iniciar triagem de complicações)', badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
                { stage: 'G3b', range: '30–44', label: 'Moderada a grave', monitor: '2 a 3x ao ano (referenciamento conjunto com nefrologista)', badge: 'bg-orange-500/15 text-orange-700 dark:text-orange-300' },
                { stage: 'G4', range: '15–29', label: 'Grave', monitor: '3 a 4x ao ano (planejamento de FAV e TRS)', badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300' },
                { stage: 'G5', range: '< 15', label: 'Falência renal', monitor: 'Mensal ou bimestral (início oportuno de hemodiálise/DP/transplante)', badge: 'bg-red-500/15 text-red-700 dark:text-red-300' }
              ].map((row) => (
                <tr 
                  key={row.stage} 
                  className={cn(
                    "hover:bg-bg/60 transition-colors",
                    stage?.stage === row.stage ? "bg-brand-blue/10 font-bold" : ""
                  )}
                >
                  <td className="py-3 px-3">
                    <span className={cn("px-2.5 py-1 rounded-md text-[11px] font-black", row.badge)}>
                      {row.stage}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-brand-navy">{row.range}</td>
                  <td className="py-3 px-3 text-brand-navy">{row.label}</td>
                  <td className="py-3 px-3 text-ink-muted">{row.monitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
