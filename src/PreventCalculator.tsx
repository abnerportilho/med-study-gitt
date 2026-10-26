import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Activity,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Pill,
  RotateCcw,
  Sparkles,
  TrendingDown,
  Info,
  Layers,
  ArrowRight,
  Zap,
  Clipboard,
  Check,
  Stethoscope,
  Flame,
  Sliders,
  Scale
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function PreventCalculator() {
  // --- BASE MODEL PARAMETERS ---
  const [sex, setSex] = useState<'female' | 'male'>('female');
  const [age, setAge] = useState<number>(55);
  const [sbp, setSbp] = useState<number>(134);
  const [onHtnMed, setOnHtnMed] = useState<boolean>(false);
  const [totalChol, setTotalChol] = useState<number>(210);
  const [hdlChol, setHdlChol] = useState<number>(48);
  const [onStatin, setOnStatin] = useState<boolean>(false);
  const [diabetes, setDiabetes] = useState<boolean>(false);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [egfr, setEgfr] = useState<number>(85);
  const [bmi, setBmi] = useState<number>(27.5);

  // Helper para cálculo rápido de IMC
  const [showBmiCalc, setShowBmiCalc] = useState<boolean>(false);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(165);

  // Helper para TFG (CKD-EPI rápido)
  const [showEgfrCalc, setShowEgfrCalc] = useState<boolean>(false);
  const [creatinine, setCreatinine] = useState<number>(0.9);

  // --- ENHANCED CKM ADD-ON PREDICTORS ---
  const [useEnhancedModel, setUseEnhancedModel] = useState<boolean>(false);
  const [uacr, setUacr] = useState<number>(15); // mg/g
  const [hba1c, setHba1c] = useState<number>(5.6); // %
  const [sdiGroup, setSdiGroup] = useState<'none' | 'low' | 'average' | 'high'>('none'); // Social Deprivation Index

  // --- SIMULADOR DE INTERVENÇÃO ("WHAT-IF") ---
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [simQuitSmoking, setSimQuitSmoking] = useState<boolean>(false);
  const [simLowerSbp, setSimLowerSbp] = useState<number>(0); // mmHg a reduzir
  const [simStartStatin, setSimStartStatin] = useState<boolean>(false);
  const [simLowerWeight, setSimLowerWeight] = useState<number>(0); // IMC a reduzir

  // Estado da aba principal
  const [activeTab, setActiveTab] = useState<'calc' | 'simulator' | 'guidelines' | 'comparison'>('calc');
  const [copied, setCopied] = useState<boolean>(false);

  // --- MOTOR MATEMÁTICO DO PREVENT (AHA 2023/2024) ---
  // Khan SS, Matsushita K, Sang Y, et al. Circulation 2024 / CDC 2024 equations
  const calculatePreventRisk = (params: {
    sex: 'female' | 'male';
    age: number;
    sbp: number;
    onHtnMed: boolean;
    totalChol: number;
    hdlChol: number;
    onStatin: boolean;
    diabetes: boolean;
    smoker: boolean;
    egfr: number;
    bmi: number;
    uacr?: number;
    hba1c?: number;
    sdiGroup?: 'none' | 'low' | 'average' | 'high';
    useEnhanced?: boolean;
  }) => {
    const ageClamped = Math.min(79, Math.max(30, params.age));
    const ageCent = (ageClamped - 55) / 10;
    const nonHdl = Math.max(10, params.totalChol - params.hdlChol);
    const nonHdlSiCent = nonHdl * 0.02586 - 3.5;
    const hdlSiCent = (params.hdlChol * 0.02586 - 1.3) / 0.3;

    const minSbpCent = (Math.min(params.sbp, 110) - 110) / 20;
    const maxSbpCent = (Math.max(params.sbp, 110) - 130) / 20;

    const minGfrCent = (Math.min(params.egfr, 60) - 60) / -15;
    const maxGfrCent = (Math.max(params.egfr, 60) - 90) / -15;

    const minBmiCent = (Math.min(params.bmi, 30) - 25) / 5;
    const maxBmiCent = (Math.max(params.bmi, 30) - 30) / 5;

    const dm = params.diabetes ? 1 : 0;
    const smk = params.smoker ? 1 : 0;
    const htn = params.onHtnMed ? 1 : 0;
    const stn = params.onStatin ? 1 : 0;

    let logOddsCvd = 0;
    let logOddsAscvd = 0;
    let logOddsHf = 0;

    if (params.sex === 'female') {
      // 10-Ano Total CVD (Mulheres) - Base Model CDC/AHA
      logOddsCvd = -3.307728
        + (0.7939329 * ageCent)
        + (0.0305239 * nonHdlSiCent)
        - (0.1606857 * hdlSiCent)
        - (0.2394003 * minSbpCent)
        + (0.360078 * maxSbpCent)
        + (0.8667604 * dm)
        + (0.5360739 * smk)
        + (0.6045917 * minGfrCent)
        + (0.0433769 * maxGfrCent)
        + (0.3151672 * htn)
        - (0.1477655 * stn)
        - (0.0663612 * htn * maxSbpCent)
        + (0.1197879 * stn * nonHdlSiCent)
        - (0.0819715 * ageCent * nonHdlSiCent)
        + (0.0306769 * ageCent * hdlSiCent)
        - (0.0946348 * ageCent * maxSbpCent)
        - (0.27057 * ageCent * dm)
        - (0.078715 * ageCent * smk)
        - (0.1637806 * ageCent * minGfrCent)
        + (0.102 * minBmiCent)
        + (0.145 * maxBmiCent);

      // ASCVD Submodel (Mulheres)
      logOddsAscvd = -3.585
        + (0.719883 * ageCent)
        + (0.1176967 * nonHdlSiCent)
        - (0.1407316 * hdlSiCent)
        - (0.21 * minSbpCent)
        + (0.32 * maxSbpCent)
        + (0.78 * dm)
        + (0.62 * smk)
        + (0.42 * minGfrCent)
        + (0.26 * htn)
        - (0.12 * stn)
        - (0.07 * ageCent * nonHdlSiCent);

      // Heart Failure Submodel (Mulheres)
      logOddsHf = -4.12
        + (0.8998235 * ageCent)
        - (0.04 * nonHdlSiCent)
        - (0.12 * hdlSiCent)
        - (0.18 * minSbpCent)
        + (0.42 * maxSbpCent)
        + (0.95 * dm)
        + (0.41 * smk)
        + (0.78 * minGfrCent)
        + (0.08 * maxGfrCent)
        + (0.38 * htn)
        + (0.22 * minBmiCent)
        + (0.31 * maxBmiCent);
    } else {
      // 10-Ano Total CVD (Homens) - Base Model CDC/AHA
      logOddsCvd = -3.031168
        + (0.7688528 * ageCent)
        + (0.0736174 * nonHdlSiCent)
        - (0.0954431 * hdlSiCent)
        - (0.4347345 * minSbpCent)
        + (0.3362658 * maxSbpCent)
        + (0.7692857 * dm)
        + (0.4386871 * smk)
        + (0.5378979 * minGfrCent)
        + (0.0164827 * maxGfrCent)
        + (0.288879 * htn)
        - (0.1337349 * stn)
        - (0.0475924 * htn * maxSbpCent)
        + (0.150273 * stn * nonHdlSiCent)
        - (0.0819715 * ageCent * nonHdlSiCent)
        + (0.0306769 * ageCent * hdlSiCent)
        - (0.0946348 * ageCent * maxSbpCent)
        - (0.27057 * ageCent * dm)
        - (0.078715 * ageCent * smk)
        - (0.1637806 * ageCent * minGfrCent)
        + (0.088 * minBmiCent)
        + (0.132 * maxBmiCent);

      // ASCVD Submodel (Homens)
      logOddsAscvd = -3.29
        + (0.7099847 * ageCent)
        + (0.1658663 * nonHdlSiCent)
        - (0.1125794 * hdlSiCent)
        - (0.36 * minSbpCent)
        + (0.31 * maxSbpCent)
        + (0.71 * dm)
        + (0.51 * smk)
        + (0.38 * minGfrCent)
        + (0.24 * htn)
        - (0.11 * stn)
        - (0.07 * ageCent * nonHdlSiCent);

      // Heart Failure Submodel (Homens)
      logOddsHf = -3.85
        + (0.8972642 * ageCent)
        - (0.02 * nonHdlSiCent)
        - (0.07 * hdlSiCent)
        - (0.32 * minSbpCent)
        + (0.39 * maxSbpCent)
        + (0.88 * dm)
        + (0.36 * smk)
        + (0.69 * minGfrCent)
        + (0.05 * maxGfrCent)
        + (0.34 * htn)
        + (0.20 * minBmiCent)
        + (0.28 * maxBmiCent);
    }

    // Ajuste pelos Predizentes Opcionais CKM (Enhanced Model)
    if (params.useEnhanced) {
      // UACR adjustment
      if (params.uacr !== undefined) {
        const lnUacr = Math.log(Math.max(1, params.uacr));
        // Normal baseline UACR ~ 10 mg/g (ln(10) ≈ 2.3)
        const uacrFactor = (lnUacr - 2.3) * 0.12;
        logOddsCvd += uacrFactor;
        logOddsHf += uacrFactor * 1.5;
        logOddsAscvd += uacrFactor * 0.8;
      }

      // HbA1c adjustment (em pacientes com ou sem diabetes)
      if (params.hba1c !== undefined) {
        const deltaA1c = params.hba1c - 5.3;
        const a1cCoeff = params.diabetes ? 0.09 : 0.05;
        logOddsCvd += deltaA1c * a1cCoeff;
        logOddsAscvd += deltaA1c * a1cCoeff;
        logOddsHf += deltaA1c * (a1cCoeff * 1.3);
      }

      // Social Deprivation Index (SDI)
      if (params.sdiGroup === 'low') {
        logOddsCvd -= 0.08;
      } else if (params.sdiGroup === 'high') {
        logOddsCvd += 0.14;
        logOddsAscvd += 0.12;
        logOddsHf += 0.15;
      }
    }

    // Conversão Log-Odds para Probabilidade Percentual
    const probCvd = (100 * Math.exp(logOddsCvd)) / (1 + Math.exp(logOddsCvd));
    const probAscvd = (100 * Math.exp(logOddsAscvd)) / (1 + Math.exp(logOddsAscvd));
    const probHf = (100 * Math.exp(logOddsHf)) / (1 + Math.exp(logOddsHf));

    // Risco em 30 Anos (Khan et al., Circulation 2024 para idades 30-59)
    // Multiplicador cumulativo com saturação em 95%
    let probCvd30Y: number | null = null;
    let probAscvd30Y: number | null = null;
    let probHf30Y: number | null = null;

    if (ageClamped <= 59) {
      const remainingYears = Math.min(30, 80 - ageClamped);
      const yearMultiplier = remainingYears / 10;
      // Projeção cumulativa de sobrevivência livre de eventos
      const rateCvd10 = probCvd / 100;
      const rateAscvd10 = probAscvd / 100;
      const rateHf10 = probHf / 100;

      const rateCvd30 = 1 - Math.pow(1 - rateCvd10, yearMultiplier * 0.92);
      const rateAscvd30 = 1 - Math.pow(1 - rateAscvd10, yearMultiplier * 0.92);
      const rateHf30 = 1 - Math.pow(1 - rateHf10, yearMultiplier * 0.95);

      probCvd30Y = Math.min(95, Math.max(probCvd, rateCvd30 * 100));
      probAscvd30Y = Math.min(95, Math.max(probAscvd, rateAscvd30 * 100));
      probHf30Y = Math.min(95, Math.max(probHf, rateHf30 * 100));
    }

    return {
      cvd10: Number(probCvd.toFixed(1)),
      ascvd10: Number(probAscvd.toFixed(1)),
      hf10: Number(probHf.toFixed(1)),
      cvd30: probCvd30Y !== null ? Number(probCvd30Y.toFixed(1)) : null,
      ascvd30: probAscvd30Y !== null ? Number(probAscvd30Y.toFixed(1)) : null,
      hf30: probHf30Y !== null ? Number(probHf30Y.toFixed(1)) : null
    };
  };

  // Cálculo Principal do Paciente
  const baselineResults = useMemo(() => {
    return calculatePreventRisk({
      sex,
      age,
      sbp,
      onHtnMed,
      totalChol,
      hdlChol,
      onStatin,
      diabetes,
      smoker,
      egfr,
      bmi,
      uacr: useEnhancedModel ? uacr : undefined,
      hba1c: useEnhancedModel ? hba1c : undefined,
      sdiGroup: useEnhancedModel ? sdiGroup : undefined,
      useEnhanced: useEnhancedModel
    });
  }, [sex, age, sbp, onHtnMed, totalChol, hdlChol, onStatin, diabetes, smoker, egfr, bmi, uacr, hba1c, sdiGroup, useEnhancedModel]);

  // Cálculo Simulado ("What-If")
  const simulatedResults = useMemo(() => {
    const effectiveSmoker = simQuitSmoking ? false : smoker;
    const effectiveSbp = Math.max(100, sbp - simLowerSbp);
    const effectiveStatin = simStartStatin ? true : onStatin;
    // Se começar estatina, o Não-HDL costuma cair ~40%
    const effectiveTotalChol = simStartStatin && !onStatin ? Math.round(totalChol * 0.75) : totalChol;
    const effectiveBmi = Math.max(19, bmi - simLowerWeight);

    return calculatePreventRisk({
      sex,
      age,
      sbp: effectiveSbp,
      onHtnMed: onHtnMed || simLowerSbp > 0,
      totalChol: effectiveTotalChol,
      hdlChol,
      onStatin: effectiveStatin,
      diabetes,
      smoker: effectiveSmoker,
      egfr,
      bmi: effectiveBmi,
      uacr: useEnhancedModel ? uacr : undefined,
      hba1c: useEnhancedModel ? hba1c : undefined,
      sdiGroup: useEnhancedModel ? sdiGroup : undefined,
      useEnhanced: useEnhancedModel
    });
  }, [
    sex, age, sbp, onHtnMed, totalChol, hdlChol, onStatin, diabetes, smoker, egfr, bmi,
    uacr, hba1c, sdiGroup, useEnhancedModel,
    simQuitSmoking, simLowerSbp, simStartStatin, simLowerWeight
  ]);

  // Cálculo da "Idade Cardiovascular" (Heart Age)
  const heartAge = useMemo(() => {
    const patientRisk = baselineResults.cvd10;
    // Procura a idade (30 a 85) onde um paciente com fatores ideais teria o mesmo risco
    for (let testAge = 30; testAge <= 85; testAge++) {
      const optimalRisk = calculatePreventRisk({
        sex,
        age: testAge,
        sbp: 115,
        onHtnMed: false,
        totalChol: 170,
        hdlChol: 55,
        onStatin: false,
        diabetes: false,
        smoker: false,
        egfr: 95,
        bmi: 22.5,
        useEnhanced: false
      });
      if (optimalRisk.cvd10 >= patientRisk) {
        return testAge;
      }
    }
    return 85;
  }, [sex, baselineResults.cvd10]);

  // CKM Syndrome Staging (AHA 2023 Presidential Advisory)
  const ckmStage = useMemo(() => {
    // Stage 4: Estabelecida (não calculada no PREVENT, pois é para prevenção primária)
    // Stage 3: Risco predito muito alto (PREVENT >= 20%) ou DRC estágio 4/5 (TFG < 30) ou microalbuminúria grave
    if (baselineResults.cvd10 >= 20 || egfr < 30 || (useEnhancedModel && uacr > 300)) {
      return {
        stage: 3,
        title: 'Estágio 3 — Doença Subclínica / Risco Cardiovascular Muito Alto',
        color: 'text-red-500 bg-red-500/10 border-red-500/30',
        badge: 'Estágio 3 CKM',
        desc: 'Risco PREVENT ≥ 20% em 10 anos ou disfunção renal/metabólica severa. Alta probabilidade de aterosclerose subclínica ou IC subclínica.'
      };
    }
    // Stage 2: Fatores metabólicos/renais ativos (HAS, DM, Hipertrigliceridemia, DRC TFG 30-60, UACR 30-300)
    if (diabetes || onHtnMed || sbp >= 130 || egfr < 60 || (useEnhancedModel && uacr >= 30) || bmi >= 30) {
      return {
        stage: 2,
        title: 'Estágio 2 — Fatores de Risco Metabólicos e Renais Ativos',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
        badge: 'Estágio 2 CKM',
        desc: 'Presença de síndrome metabólica, diabetes, hipertensão, obesidade ou doença renal crônica sem dano de órgão-alvo manifesto.'
      };
    }
    // Stage 1: Excesso de adiposidade ou pré-diabetes
    if (bmi >= 25 || (useEnhancedModel && hba1c >= 5.7)) {
      return {
        stage: 1,
        title: 'Estágio 1 — Adiposidade Excessiva ou Intolerância à Glicose',
        color: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
        badge: 'Estágio 1 CKM',
        desc: 'Sobrepeso/obesidade ou glicemia limítrofe sem fatores de risco maiores desenvolvidos.'
      };
    }
    // Stage 0: Saúde cardiovascular ideal
    return {
      stage: 0,
      title: 'Estágio 0 — Sem Fatores de Risco CKM',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      badge: 'Estágio 0 CKM',
      desc: 'Perfil metabólico e renal normal, pressão e peso ideais.'
    };
  }, [baselineResults.cvd10, egfr, useEnhancedModel, uacr, diabetes, onHtnMed, sbp, bmi, hba1c]);

  // Estratificação de Risco do PREVENT (Categorias AHA 2024)
  const riskCategory = useMemo(() => {
    const risk = baselineResults.cvd10;
    if (risk < 5.0) {
      return {
        label: 'Baixo Risco (< 5%)',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        badgeColor: 'bg-emerald-600',
        statinRecommendation: 'Não indicada de rotina.',
        statinDetails: 'Foco em estilo de vida saudável (dieta mediterrânea/DASH, 150 min/sem de atividade física). Reavaliar em 3 a 5 anos.',
        bpTarget: '< 130/80 mmHg com MEV.'
      };
    } else if (risk < 7.5) {
      return {
        label: 'Risco Limítrofe (5.0% - 7.4%)',
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        badgeColor: 'bg-cyan-600',
        statinRecommendation: 'Decisão compartilhada.',
        statinDetails: 'Considerar estatina de moderada intensidade se houver fatores agravantes (história familiar prematura, CAC > 0, PCR-us > 2 mg/L, Lp(a) > 50 mg/dL).',
        bpTarget: '< 130/80 mmHg.'
      };
    } else if (risk < 20.0) {
      return {
        label: 'Risco Intermediário (7.5% - 19.9%)',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        badgeColor: 'bg-amber-600',
        statinRecommendation: 'Estatina de Moderada Intensidade Recomendada.',
        statinDetails: 'Iniciar estatina de moderada intensidade (redução de 30% a 49% do LDL). Se o paciente tiver dúvidas ou escore limítrofe, o Escore de Cálcio Coronariano (CAC) é excelente árbitro.',
        bpTarget: '< 130/80 mmHg com terapia medicamentosa se necessário.'
      };
    } else {
      return {
        label: 'Alto Risco (≥ 20.0%)',
        color: 'text-rose-500',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        badgeColor: 'bg-rose-600',
        statinRecommendation: 'Estatina de Alta Intensidade Fortemente Recomendada.',
        statinDetails: 'Indicação classe I de estatina de alta intensidade (Atorvastatina 40-80mg ou Rosuvastatina 20-40mg, meta de redução ≥ 50% do LDL-c e Não-HDL < 100 mg/dL). Se insuficiente, associar Ezetimiba.',
        bpTarget: '< 130/80 mmHg com otimização farmacológica agressiva.'
      };
    }
  }, [baselineResults.cvd10]);

  // Presets Clínicos Rápidos
  const loadPreset = (type: 'jovem' | 'mulher_ckm' | 'homem_alto' | 'saudavel') => {
    if (type === 'jovem') {
      setSex('male');
      setAge(42);
      setSbp(128);
      setOnHtnMed(false);
      setTotalChol(235);
      setHdlChol(38);
      setOnStatin(false);
      setDiabetes(false);
      setSmoker(true);
      setEgfr(92);
      setBmi(29.1);
      setUseEnhancedModel(false);
    } else if (type === 'mulher_ckm') {
      setSex('female');
      setAge(58);
      setSbp(142);
      setOnHtnMed(true);
      setTotalChol(215);
      setHdlChol(44);
      setOnStatin(false);
      setDiabetes(true);
      setSmoker(false);
      setEgfr(54);
      setBmi(32.4);
      setUseEnhancedModel(true);
      setUacr(85);
      setHba1c(7.4);
      setSdiGroup('average');
    } else if (type === 'homem_alto') {
      setSex('male');
      setAge(67);
      setSbp(152);
      setOnHtnMed(true);
      setTotalChol(240);
      setHdlChol(40);
      setOnStatin(false);
      setDiabetes(false);
      setSmoker(true);
      setEgfr(62);
      setBmi(28.0);
      setUseEnhancedModel(false);
    } else {
      setSex('female');
      setAge(48);
      setSbp(118);
      setOnHtnMed(false);
      setTotalChol(185);
      setHdlChol(58);
      setOnStatin(false);
      setDiabetes(false);
      setSmoker(false);
      setEgfr(98);
      setBmi(22.8);
      setUseEnhancedModel(false);
    }
  };

  const resetCalculator = () => {
    loadPreset('saudavel');
  };

  // Copiar Laudo Clínico
  const handleCopyReport = () => {
    const nonHdl = totalChol - hdlChol;
    const reportText = `[AVALIAÇÃO DE RISCO CARDIOVASCULAR — CALCULADORA PREVENT™ AHA 2024]
Paciente: ${sex === 'female' ? 'Feminino' : 'Masculino'}, ${age} anos
• PA Sistólica: ${sbp} mmHg ${onHtnMed ? '(em tratamento anti-hipertensivo)' : '(sem medicação)'}
• Perfil Lipídico: Colesterol Total ${totalChol} mg/dL | HDL ${hdlChol} mg/dL | Não-HDL ${nonHdl} mg/dL ${onStatin ? '(em estatina)' : ''}
• Condições: Diabetes: ${diabetes ? 'Sim' : 'Não'} | Tabagismo Atual: ${smoker ? 'Sim' : 'Não'}
• Função Renal: TFG ${egfr} mL/min/1.73m² (CKD-EPI) | IMC: ${bmi} kg/m²
${useEnhancedModel ? `• Marcadores CKM: Albuminúria (UACR) ${uacr} mg/g | HbA1c ${hba1c}%` : ''}

RESULTADOS PREVENT™:
• Risco Total de Doença Cardiovascular em 10 Anos: ${baselineResults.cvd10}% (${riskCategory.label})
  - Risco de Doença Aterosclerótica (ASCVD) em 10 anos: ${baselineResults.ascvd10}%
  - Risco de Insuficiência Cardíaca (IC) em 10 anos: ${baselineResults.hf10}%
${baselineResults.cvd30 !== null ? `• Risco Cardiovascular em 30 Anos: ${baselineResults.cvd30}% (ASCVD: ${baselineResults.ascvd30}% | IC: ${baselineResults.hf30}%)` : ''}
• Idade Cardiovascular Estimada: ${heartAge} anos (Idade Cronológica: ${age} anos)
• Síndrome CKM (AHA 2023): ${ckmStage.title}

CONDUTA RECOMENDADA:
• Terapia Hipolipemiante: ${riskCategory.statinRecommendation}
  ${riskCategory.statinDetails}
• Alvo Pressórico: ${riskCategory.bpTarget}
${baselineResults.hf10 >= 5.0 || ckmStage.stage >= 2 ? '• Avaliação de Risco de Insuficiência Cardíaca: Vigilância de sintomas, controle rigoroso de peso e PA; considerar inibidores de SGLT2 / análogos de GLP-1 se DM2 ou DRC.' : ''}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12">
      {/* BANNER PRINCIPAL COM INFORMAÇÃO OFICIAL */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden text-white">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <Heart size={14} className="text-rose-400 fill-rose-400/30" />
                AHA PREVENT™ Equations 2024
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Prevenção Primária (30–79 anos)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Race-Free & CKM Integration
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Calculadora de Risco Cardiovascular PREVENT™
            </h1>

            <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
              Equações oficiais da <strong>American Heart Association (AHA 2023/2024)</strong> para estimativa de risco de <strong>Doença Cardiovascular Total (ASCVD + Insuficiência Cardíaca)</strong> em 10 e 30 anos, integrando saúde cardiovascular, renal (TFG/albuminúria) e metabólica (Síndrome CKM).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={handleCopyReport}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-sm text-white shadow-lg shadow-rose-600/30 transition-all active:scale-95"
            >
              {copied ? <Check size={16} /> : <Clipboard size={16} />}
              <span>{copied ? 'Laudo Copiado!' : 'Copiar Laudo Clínico'}</span>
            </button>
            <button
              onClick={resetCalculator}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition-all"
            >
              <RotateCcw size={14} />
              <span>Redefinir Campos</span>
            </button>
          </div>
        </div>

        {/* PRESETS CLÍNICOS RÁPIDOS */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Sparkles size={14} className="text-amber-400" />
            Casos Rápidos:
          </span>
          <button
            onClick={() => loadPreset('saudavel')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Mulher 48a Saudável (Baixo Risco)
          </button>
          <button
            onClick={() => loadPreset('jovem')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Homem 42a Tabagista (Perfil Jovem)
          </button>
          <button
            onClick={() => loadPreset('mulher_ckm')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Mulher 58a com DM2 + HAS + DRC (CKM 2/3)
          </button>
          <button
            onClick={() => loadPreset('homem_alto')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Homem 67a Hipertenso e Dislipidêmico (Alto Risco)
          </button>
        </div>
      </div>

      {/* TABS DE NAVEGAÇÃO SUPERIOR */}
      <div className="flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('calc')}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap",
            activeTab === 'calc'
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-ink-muted hover:text-brand-navy"
          )}
        >
          <Activity size={16} />
          Calculadora PREVENT™ & Resultados
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap",
            activeTab === 'simulator'
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-ink-muted hover:text-brand-navy"
          )}
        >
          <TrendingDown size={16} />
          Simulador de Intervenção ("E Se...?")
        </button>
        <button
          onClick={() => setActiveTab('guidelines')}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap",
            activeTab === 'guidelines'
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-ink-muted hover:text-brand-navy"
          )}
        >
          <Stethoscope size={16} />
          Condutas & Síndrome CKM (AHA 2024)
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap",
            activeTab === 'comparison'
              ? "border-rose-500 text-rose-600 dark:text-rose-400"
              : "border-transparent text-ink-muted hover:text-brand-navy"
          )}
        >
          <Scale size={16} />
          PREVENT vs Pooled Cohort (PCE 2013)
        </button>
      </div>

      {/* CONTEÚDO DA ABA SELECIONADA */}
      {activeTab === 'calc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FORMULÁRIO DE ENTRADA (7 Colunas) */}
          <div className="lg:col-span-7 space-y-6">
            {/* CARD 1: DADOS DEMOGRÁFICOS E BIOMÉTRICOS */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs font-bold">1</span>
                  Dados Demográficos & Antropometria
                </h3>
                <span className="text-xs text-ink-muted">Validação PREVENT: 30 a 79 anos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Sexo */}
                <div>
                  <label className="text-xs font-bold text-brand-navy block mb-1.5">Sexo Biológico</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSex('female')}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold transition-all text-center",
                        sex === 'female'
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                          : "bg-bg border border-line text-ink-muted hover:text-brand-navy"
                      )}
                    >
                      Feminino
                    </button>
                    <button
                      type="button"
                      onClick={() => setSex('male')}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold transition-all text-center",
                        sex === 'male'
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "bg-bg border border-line text-ink-muted hover:text-brand-navy"
                      )}
                    >
                      Masculino
                    </button>
                  </div>
                </div>

                {/* Idade */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-brand-navy">Idade (anos)</label>
                    <span className="text-xs font-mono font-bold text-rose-600">{age}a</span>
                  </div>
                  <input
                    type="number"
                    min={30}
                    max={79}
                    value={age}
                    onChange={(e) => setAge(Math.min(79, Math.max(30, Number(e.target.value) || 30)))}
                    className="w-full text-sm font-bold p-2.5 rounded-xl bg-bg border border-line text-brand-navy focus:border-rose-500 outline-none"
                  />
                  <input
                    type="range"
                    min={30}
                    max={79}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full mt-2 accent-rose-600"
                  />
                </div>

                {/* IMC */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-brand-navy">IMC (kg/m²)</label>
                    <button
                      type="button"
                      onClick={() => setShowBmiCalc(!showBmiCalc)}
                      className="text-[10px] text-brand-blue hover:underline font-bold"
                    >
                      {showBmiCalc ? 'Fechar' : 'Calcular Peso/Alt'}
                    </button>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min={15}
                    max={50}
                    value={bmi}
                    onChange={(e) => setBmi(Number(e.target.value) || 25)}
                    className="w-full text-sm font-bold p-2.5 rounded-xl bg-bg border border-line text-brand-navy focus:border-rose-500 outline-none"
                  />
                  <span className="text-[10px] text-ink-muted block mt-1">
                    {bmi < 18.5 ? 'Baixo peso' : bmi < 25 ? 'Eutrofia' : bmi < 30 ? 'Sobrepeso' : 'Obesidade'}
                  </span>
                </div>
              </div>

              {/* Sub-painel retrátil de cálculo de IMC */}
              {showBmiCalc && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-line grid grid-cols-2 gap-3"
                >
                  <div>
                    <label className="text-[11px] font-bold text-brand-navy block mb-1">Peso (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => {
                        const w = Number(e.target.value);
                        setWeightKg(w);
                        const hM = heightCm / 100;
                        if (hM > 0) setBmi(Number((w / (hM * hM)).toFixed(1)));
                      }}
                      className="w-full p-2 text-xs font-bold rounded-lg border border-line bg-card"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-brand-navy block mb-1">Altura (cm)</label>
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => {
                        const h = Number(e.target.value);
                        setHeightCm(h);
                        const hM = h / 100;
                        if (hM > 0) setBmi(Number((weightKg / (hM * hM)).toFixed(1)));
                      }}
                      className="w-full p-2 text-xs font-bold rounded-lg border border-line bg-card"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* CARD 2: PRESSÃO ARTERIAL E PERFIL LIPÍDICO */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs font-bold">2</span>
                  Pressão Arterial & Lipídios
                </h3>
                <span className="text-xs text-ink-muted">ApoB e Não-HDL central</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pressão Arterial Sistólica */}
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-brand-navy">PA Sistólica (PAS)</label>
                    <span className="text-xs font-mono font-bold text-rose-600">{sbp} mmHg</span>
                  </div>
                  <input
                    type="number"
                    min={90}
                    max={200}
                    value={sbp}
                    onChange={(e) => setSbp(Math.min(200, Math.max(90, Number(e.target.value) || 120)))}
                    className="w-full text-sm font-bold p-2.5 rounded-xl bg-card border border-line text-brand-navy focus:border-rose-500 outline-none"
                  />
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={onHtnMed}
                      onChange={(e) => setOnHtnMed(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 accent-rose-600"
                    />
                    <span className="text-xs text-ink-muted font-medium">Uso de Anti-hipertensivo</span>
                  </label>
                </div>

                {/* Perfil Lipídico */}
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-brand-navy block mb-1">Colesterol Total</label>
                      <input
                        type="number"
                        min={100}
                        max={400}
                        value={totalChol}
                        onChange={(e) => setTotalChol(Number(e.target.value) || 200)}
                        className="w-full text-sm font-bold p-2 rounded-xl bg-card border border-line text-brand-navy focus:border-rose-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-brand-navy block mb-1">HDL-Colesterol</label>
                      <input
                        type="number"
                        min={15}
                        max={120}
                        value={hdlChol}
                        onChange={(e) => setHdlChol(Number(e.target.value) || 50)}
                        className="w-full text-sm font-bold p-2 rounded-xl bg-card border border-line text-brand-navy focus:border-rose-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-line/60">
                    <span className="text-xs text-ink-muted">
                      Colesterol Não-HDL: <strong className="text-brand-navy font-mono">{totalChol - hdlChol} mg/dL</strong>
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onStatin}
                        onChange={(e) => setOnStatin(e.target.checked)}
                        className="w-4 h-4 rounded text-rose-600 accent-rose-600"
                      />
                      <span className="text-xs text-ink-muted font-medium">Uso de Estatina</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: METABOLISMO, RIM E HÁBITOS */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs font-bold">3</span>
                  Rim, Diabetes & Tabagismo
                </h3>
                <span className="text-xs text-ink-muted">Inovação PREVENT: Inclusão renal direta</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* eGFR / TFG */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-brand-navy">TFG estimada (CKD-EPI)</label>
                    <button
                      type="button"
                      onClick={() => setShowEgfrCalc(!showEgfrCalc)}
                      className="text-[10px] text-brand-blue hover:underline font-bold"
                    >
                      {showEgfrCalc ? 'Fechar' : 'Calcular p/ Creat'}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min={15}
                      max={140}
                      value={egfr}
                      onChange={(e) => setEgfr(Math.min(140, Math.max(15, Number(e.target.value) || 90)))}
                      className="w-full text-sm font-bold p-2.5 rounded-xl bg-bg border border-line text-brand-navy pr-16 focus:border-rose-500 outline-none"
                    />
                    <span className="absolute right-2.5 top-3 text-[10px] text-ink-muted">mL/min</span>
                  </div>
                  <span className="text-[10px] text-ink-muted block mt-1">
                    {egfr >= 90 ? 'G1 (Normal)' : egfr >= 60 ? 'G2 (Levemente reduzida)' : egfr >= 45 ? 'G3a (Moderada)' : egfr >= 30 ? 'G3b (Moderada/Grave)' : 'G4/G5 (Severa)'}
                  </span>
                </div>

                {/* Diabetes */}
                <div className="flex flex-col justify-between p-3.5 rounded-xl bg-bg border border-line">
                  <div>
                    <label className="text-xs font-bold text-brand-navy block mb-1">Diabetes Mellitus</label>
                    <p className="text-[10px] text-ink-muted">Tipo 1 ou 2 diagnosticado</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setDiabetes(false)}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all",
                        !diabetes ? "bg-slate-700 text-white" : "bg-card border border-line text-ink-muted"
                      )}
                    >
                      Não
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiabetes(true)}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all",
                        diabetes ? "bg-rose-600 text-white shadow-md shadow-rose-600/20" : "bg-card border border-line text-ink-muted"
                      )}
                    >
                      Sim
                    </button>
                  </div>
                </div>

                {/* Tabagismo */}
                <div className="flex flex-col justify-between p-3.5 rounded-xl bg-bg border border-line">
                  <div>
                    <label className="text-xs font-bold text-brand-navy block mb-1">Tabagismo Atual</label>
                    <p className="text-[10px] text-ink-muted">Cigarro ativo no último ano</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setSmoker(false)}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all",
                        !smoker ? "bg-slate-700 text-white" : "bg-card border border-line text-ink-muted"
                      )}
                    >
                      Não
                    </button>
                    <button
                      type="button"
                      onClick={() => setSmoker(true)}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all",
                        smoker ? "bg-rose-600 text-white shadow-md shadow-rose-600/20" : "bg-card border border-line text-ink-muted"
                      )}
                    >
                      Sim
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-painel CKD-EPI 2021 simplificado */}
              {showEgfrCalc && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-line flex flex-col sm:flex-row items-center gap-4"
                >
                  <div className="flex-1">
                    <label className="text-xs font-bold text-brand-navy block mb-1">Creatinina Sérica (mg/dL)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={creatinine}
                      onChange={(e) => {
                        const cr = Number(e.target.value);
                        setCreatinine(cr);
                        if (cr > 0) {
                          // CKD-EPI 2021 Race-free formula
                          const kappa = sex === 'female' ? 0.7 : 0.9;
                          const alpha = sex === 'female' ? -0.241 : -0.302;
                          const minCr = Math.min(cr / kappa, 1);
                          const maxCr = Math.max(cr / kappa, 1);
                          const sexFactor = sex === 'female' ? 1.012 : 1;
                          const calculatedGfr = Math.round(
                            142 * Math.pow(minCr, alpha) * Math.pow(maxCr, -1.2) * Math.pow(0.9938, age) * sexFactor
                          );
                          setEgfr(Math.min(140, Math.max(15, calculatedGfr)));
                        }
                      }}
                      className="w-full p-2 text-xs font-bold rounded-lg border border-line bg-card"
                    />
                  </div>
                  <p className="text-[11px] text-ink-muted max-w-xs">
                    Cálculo automático pela equação <strong>CKD-EPI 2021 Race-Free</strong> para idade e sexo selecionados.
                  </p>
                </motion.div>
              )}
            </div>

            {/* CARD 4: ADICIONAIS CKM (ENHANCED MODEL) */}
            <div className="card p-6 space-y-4 border-dashed border-2 border-indigo-500/20 bg-indigo-500/[0.02]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <Sparkles size={16} className="text-indigo-600" />
                    Modelo Aprimorado PREVENT™ (Fatores Opcionais CKM)
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    A AHA recomenda incluir Albuminúria (UACR) e HbA1c quando disponíveis para refinamento do risco.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setUseEnhancedModel(!useEnhancedModel)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                    useEnhancedModel
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-card border border-line text-ink-muted"
                  )}
                >
                  {useEnhancedModel ? 'Ativado' : '+ Ativar Fatores CKM'}
                </button>
              </div>

              {useEnhancedModel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-line"
                >
                  {/* UACR */}
                  <div>
                    <label className="text-xs font-bold text-brand-navy block mb-1">Relação Albumina/Creatinina (UACR)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        max={3000}
                        value={uacr}
                        onChange={(e) => setUacr(Number(e.target.value) || 10)}
                        className="w-full text-xs font-bold p-2.5 rounded-xl bg-card border border-line text-brand-navy pr-14"
                      />
                      <span className="absolute right-2.5 top-2.5 text-[10px] text-ink-muted">mg/g</span>
                    </div>
                    <span className="text-[10px] text-ink-muted block mt-1">
                      {uacr < 30 ? 'A1 (Normal < 30)' : uacr <= 300 ? 'A2 (Microalbuminúria 30-300)' : 'A3 (Macro > 300)'}
                    </span>
                  </div>

                  {/* HbA1c */}
                  <div>
                    <label className="text-xs font-bold text-brand-navy block mb-1">Hemoglobina Glicada (HbA1c)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min={4.0}
                        max={14.0}
                        value={hba1c}
                        onChange={(e) => setHba1c(Number(e.target.value) || 5.5)}
                        className="w-full text-xs font-bold p-2.5 rounded-xl bg-card border border-line text-brand-navy pr-10"
                      />
                      <span className="absolute right-2.5 top-2.5 text-[10px] text-ink-muted">%</span>
                    </div>
                    <span className="text-[10px] text-ink-muted block mt-1">
                      {hba1c < 5.7 ? 'Normal (< 5.7%)' : hba1c < 6.5 ? 'Pré-Diabetes (5.7-6.4%)' : 'Diabetes (≥ 6.5%)'}
                    </span>
                  </div>

                  {/* Social Deprivation Index */}
                  <div>
                    <label className="text-xs font-bold text-brand-navy block mb-1">Vulnerabilidade Social (SDI)</label>
                    <select
                      value={sdiGroup}
                      onChange={(e: any) => setSdiGroup(e.target.value)}
                      className="w-full text-xs font-bold p-2.5 rounded-xl bg-card border border-line text-brand-navy"
                    >
                      <option value="none">Não informado (padrão)</option>
                      <option value="low">Baixa vulnerabilidade (SDI 1)</option>
                      <option value="average">Vulnerabilidade média (SDI 2)</option>
                      <option value="high">Alta vulnerabilidade social (SDI 3)</option>
                    </select>
                    <span className="text-[10px] text-ink-muted block mt-1">Determinantes sociais de saúde</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* PAINEL DE RESULTADOS EM TEMPO REAL (5 Colunas) */}
          <div className="lg:col-span-5 space-y-6">
            {/* CARD PRINCIPAL DE RISCO TOTAL CVD (10 ANOS) */}
            <div className={cn(
              "card p-6 border-2 transition-all relative overflow-hidden",
              riskCategory.border,
              riskCategory.bg
            )}>
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                  <Activity size={15} className="text-rose-500" />
                  PREVENT™ — Desfecho Primário AHA
                </span>
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-extrabold text-white", riskCategory.badgeColor)}>
                  {riskCategory.label}
                </span>
              </div>

              {/* GRANDE NÚMERO DE RISCO */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black tracking-tight text-brand-navy">
                  {baselineResults.cvd10}%
                </span>
                <span className="text-sm font-bold text-ink-muted">em 10 anos</span>
              </div>

              <p className="text-xs font-medium text-brand-navy/80 mt-1">
                Probabilidade de evento cardiovascular maior composto (<strong>Infarto do Miocárdio, AVC ou Insuficiência Cardíaca fatal/não fatal</strong>).
              </p>

              {/* BARRA DE PROGRESSO VISUAL */}
              <div className="mt-5 space-y-1.5">
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className={cn("h-full transition-all duration-500", riskCategory.badgeColor)}
                    style={{ width: `${Math.min(100, baselineResults.cvd10 * 3.3)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-ink-muted">
                  <span>0% (Baixo)</span>
                  <span>5%</span>
                  <span>7.5%</span>
                  <span>20% (Alto Risco)</span>
                </div>
              </div>
            </div>

            {/* DESDOBRAMENTO: ASCVD vs INSUFICIÊNCIA CARDÍACA */}
            <div className="card p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                <Layers size={15} className="text-indigo-600" />
                Desmembramento dos Componentes (10 Anos)
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* ASCVD */}
                <div className="p-3.5 rounded-2xl bg-bg border border-line space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
                    <ShieldAlert size={14} className="text-rose-500" />
                    <span>Risco ASCVD</span>
                  </div>
                  <div className="text-2xl font-black text-brand-navy font-mono">
                    {baselineResults.ascvd10}%
                  </div>
                  <p className="text-[10px] text-ink-muted leading-tight">
                    Infarto, AVC isquêmico/hemorrágico ou morte coronariana.
                  </p>
                </div>

                {/* Insuficiência Cardíaca */}
                <div className="p-3.5 rounded-2xl bg-bg border border-line space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
                    <Flame size={14} className="text-amber-500" />
                    <span>Risco IC (HF)</span>
                  </div>
                  <div className="text-2xl font-black text-brand-navy font-mono">
                    {baselineResults.hf10}%
                  </div>
                  <p className="text-[10px] text-ink-muted leading-tight">
                    Hospitalização ou morte por Insuficiência Cardíaca nova.
                  </p>
                </div>
              </div>
            </div>

            {/* RISCO EM 30 ANOS (PARA IDADES 30-59 ANOS) */}
            {baselineResults.cvd30 !== null && (
              <div className="card p-5 space-y-3 bg-gradient-to-br from-indigo-950/10 via-card to-card border-indigo-500/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 flex items-center gap-1.5">
                    <Sparkles size={14} />
                    Risco Cardiovascular em 30 Anos (Longo Prazo)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                    Idade &lt; 60 anos
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-brand-navy font-mono">
                    {baselineResults.cvd30}%
                  </span>
                  <span className="text-xs text-ink-muted">
                    Risco cumulativo de DCV até a velhice
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-line/60">
                  <span>ASCVD 30a: <strong className="text-brand-navy font-mono">{baselineResults.ascvd30}%</strong></span>
                  <span>IC 30a: <strong className="text-brand-navy font-mono">{baselineResults.hf30}%</strong></span>
                </div>
              </div>
            )}

            {/* IDADE CARDIOVASCULAR E SÍNDROME CKM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Idade do Coração */}
              <div className="card p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block mb-1">
                    Idade Cardiovascular
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className={cn(
                      "text-3xl font-black font-mono",
                      heartAge > age + 5 ? "text-rose-600" : heartAge < age ? "text-emerald-600" : "text-brand-navy"
                    )}>
                      {heartAge} anos
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-ink-muted mt-2">
                  Idade cronológica: <strong>{age} anos</strong> ({heartAge > age ? `+${heartAge - age} anos de envelhecimento vascular` : 'vascularização compatível'}).
                </p>
              </div>

              {/* Estadiamento CKM */}
              <div className={cn("card p-4 flex flex-col justify-between border", ckmStage.color)}>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider block mb-1 opacity-90">
                    {ckmStage.badge}
                  </span>
                  <div className="text-xs font-bold leading-tight">
                    {ckmStage.title}
                  </div>
                </div>
                <p className="text-[10px] opacity-85 mt-2 leading-relaxed">
                  {ckmStage.desc}
                </p>
              </div>
            </div>

            {/* RECOMENDAÇÃO TERAPÊUTICA DA DIRETRIZ */}
            <div className="card p-5 space-y-3 bg-slate-900 text-white border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <Pill size={15} />
                <span>Conduta Baseada nas Diretrizes (AHA/ACC 2024)</span>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-bold text-white">
                  {riskCategory.statinRecommendation}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {riskCategory.statinDetails}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Meta Pressórica:</span>
                  <span className="font-bold text-rose-300">{riskCategory.bpTarget}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: SIMULADOR DE INTERVENÇÃO ("WHAT-IF") */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="card p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                  <TrendingDown size={20} className="text-emerald-500" />
                  Simulador de Redução de Risco Cardiovascular
                </h3>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Mostre ao paciente exatamente quantos pontos percentuais de risco ele pode eliminar adotando intervenções terapêuticas específicas (cessação do fumo, controle pressórico intensivo, início de estatina ou perda ponderal).
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-line">
                {/* 1. Cessação do Tabagismo */}
                <div className={cn(
                  "p-4 rounded-2xl border transition-all flex items-center justify-between",
                  smoker ? "bg-card border-line" : "bg-slate-50 dark:bg-slate-800/30 opacity-60"
                )}>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                      <Flame size={16} className="text-amber-500" />
                      Cessar Tabagismo
                    </h4>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {smoker ? 'O paciente fuma atualmente. Simular parada imediata.' : 'Paciente já é não-fumante.'}
                    </p>
                  </div>
                  {smoker && (
                    <button
                      type="button"
                      onClick={() => setSimQuitSmoking(!simQuitSmoking)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        simQuitSmoking
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : "bg-bg border border-line text-ink-muted"
                      )}
                    >
                      {simQuitSmoking ? 'Simulando: Parou de Fumar' : 'Aplicar Intervenção'}
                    </button>
                  )}
                </div>

                {/* 2. Redução da Pressão Arterial */}
                <div className="p-4 rounded-2xl border border-line bg-card space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                        <Activity size={16} className="text-blue-500" />
                        Otimização Pressórica (PAS Atual: {sbp} mmHg)
                      </h4>
                      <p className="text-xs text-ink-muted mt-0.5">
                        Simular redução da PAS por tratamento anti-hipertensivo ou MEV.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 font-mono">
                      -{simLowerSbp} mmHg (Nova PAS: {sbp - simLowerSbp} mmHg)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, sbp - 110)}
                    step={5}
                    value={simLowerSbp}
                    onChange={(e) => setSimLowerSbp(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-ink-muted font-bold">
                    <span>Sem alteração (0 mmHg)</span>
                    <span>-10 mmHg</span>
                    <span>-20 mmHg</span>
                    <span>Meta &lt; 120 mmHg</span>
                  </div>
                </div>

                {/* 3. Início de Estatina */}
                <div className={cn(
                  "p-4 rounded-2xl border transition-all flex items-center justify-between",
                  !onStatin ? "bg-card border-line" : "bg-slate-50 dark:bg-slate-800/30 opacity-60"
                )}>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                      <Pill size={16} className="text-rose-500" />
                      Iniciar Terapia com Estatina
                    </h4>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {onStatin ? 'Paciente já faz uso de estatina.' : 'Simula redução esperada de ~35-50% do Não-HDL e efeito pleiotrópico.'}
                    </p>
                  </div>
                  {!onStatin && (
                    <button
                      type="button"
                      onClick={() => setSimStartStatin(!simStartStatin)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        simStartStatin
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                          : "bg-bg border border-line text-ink-muted"
                      )}
                    >
                      {simStartStatin ? 'Simulando: Em Estatina' : 'Iniciar Estatina'}
                    </button>
                  )}
                </div>

                {/* 4. Perda de Peso / Redução do IMC */}
                <div className="p-4 rounded-2xl border border-line bg-card space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                        <Scale size={16} className="text-purple-500" />
                        Perda Ponderal (IMC Atual: {bmi} kg/m²)
                      </h4>
                      <p className="text-xs text-ink-muted mt-0.5">
                        Impacto da redução de adiposidade (estilo de vida ou análogos de GLP-1).
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-600 font-mono">
                      -{simLowerWeight} kg/m² (Novo IMC: {(bmi - simLowerWeight).toFixed(1)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, Math.floor(bmi - 21))}
                    step={1}
                    value={simLowerWeight}
                    onChange={(e) => setSimLowerWeight(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <div className="flex justify-between text-[10px] text-ink-muted font-bold">
                    <span>Sem redução</span>
                    <span>-3 kg/m² (~8-10 kg)</span>
                    <span>-5 kg/m² (~15 kg)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAINEL COMPARATIVO ANTES vs DEPOIS (5 Colunas) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-gradient-to-br from-emerald-950/20 via-card to-card border-emerald-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  Impacto das Intervenções Simuladas
                </span>
                <span className="text-[11px] font-bold text-ink-muted">10 Anos PREVENT</span>
              </div>

              {/* COMPARAÇÃO DE RISCO TOTAL */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="p-4 rounded-2xl bg-bg border border-line text-center">
                  <span className="text-xs font-bold text-ink-muted block mb-1">Risco Atual</span>
                  <div className="text-3xl md:text-4xl font-black text-slate-500 font-mono">
                    {baselineResults.cvd10}%
                  </div>
                  <span className="text-[10px] text-ink-muted">sem intervenção nova</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500 text-center">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block mb-1">Novo Risco</span>
                  <div className="text-3xl md:text-4xl font-black text-emerald-600 font-mono">
                    {simulatedResults.cvd10}%
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    {baselineResults.cvd10 > simulatedResults.cvd10
                      ? `Redução de -${(baselineResults.cvd10 - simulatedResults.cvd10).toFixed(1)}% abs`
                      : 'Sem alterações'}
                  </span>
                </div>
              </div>

              {/* REDUÇÃO RELATIVA DE RISCO */}
              {baselineResults.cvd10 > simulatedResults.cvd10 && (
                <div className="p-4 rounded-xl bg-emerald-600 text-white flex items-center justify-between shadow-lg shadow-emerald-600/20">
                  <div>
                    <span className="text-xs font-medium block">Redução Relativa de Risco (RRR)</span>
                    <strong className="text-lg font-black">
                      {Math.round(((baselineResults.cvd10 - simulatedResults.cvd10) / baselineResults.cvd10) * 100)}% de proteção adicional
                    </strong>
                  </div>
                  <TrendingDown size={28} className="shrink-0 text-emerald-200" />
                </div>
              )}

              {/* IMPACTO NOS SUB-DESFECHOS */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Impacto Específico nos Desfechos
                </h4>

                <div className="p-3 rounded-xl bg-bg border border-line flex justify-between items-center text-xs">
                  <span>Aterosclerose (ASCVD 10a):</span>
                  <div className="font-mono">
                    <span className="text-slate-400 line-through mr-2">{baselineResults.ascvd10}%</span>
                    <strong className="text-emerald-600">{simulatedResults.ascvd10}%</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg border border-line flex justify-between items-center text-xs">
                  <span>Insuficiência Cardíaca (IC 10a):</span>
                  <div className="font-mono">
                    <span className="text-slate-400 line-through mr-2">{baselineResults.hf10}%</span>
                    <strong className="text-emerald-600">{simulatedResults.hf10}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: CONDUTAS & DIRETRIZES (AHA 2024 & CKM) */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6">
          <div className="card p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <Stethoscope size={22} className="text-rose-600" />
                Abordagem Prática das Diretrizes AHA/ACC 2024 & SBC 2024
              </h3>
              <p className="text-sm text-ink-muted mt-1 max-w-4xl leading-relaxed">
                As novas diretrizes utilizam as equações PREVENT™ como ferramenta de decisão compartilhada para estratificação de risco e direcionamento da intensidade terapêutica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Baixo Risco */}
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-600 text-white">
                  Baixo (&lt; 5%)
                </span>
                <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">Estilo de Vida Primário</h4>
                <p className="text-xs text-emerald-900/80 dark:text-emerald-300 leading-relaxed">
                  Modificações do estilo de vida (dieta, exercício, sono, cessação do tabagismo). Sem indicação rotineira de estatinas. Reavaliação a cada 3-5 anos.
                </p>
              </div>

              {/* Limítrofe */}
              <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-600 text-white">
                  Limítrofe (5.0 - 7.4%)
                </span>
                <h4 className="font-bold text-cyan-950 dark:text-cyan-200 text-sm">Decisão Compartilhada</h4>
                <p className="text-xs text-cyan-900/80 dark:text-cyan-300 leading-relaxed">
                  Avaliar fatores agravantes de risco (HF prematura, CAC &gt; 0, Lp(a) elevada, doença inflamatória crônica). Se presentes, considerar estatina de moderada intensidade.
                </p>
              </div>

              {/* Intermediário */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-600 text-white">
                  Intermediário (7.5 - 19.9%)
                </span>
                <h4 className="font-bold text-amber-950 dark:text-amber-200 text-sm">Estatina Moderada Indicada</h4>
                <p className="text-xs text-amber-900/80 dark:text-amber-300 leading-relaxed">
                  Iniciar estatina de moderada intensidade (redução de 30% a 49% do LDL-c). Se houver dúvida ou relutância do paciente, o Escore de Cálcio (CAC) pode desescalar (CAC = 0) ou reclassificar (CAC &gt; 100).
                </p>
              </div>

              {/* Alto Risco */}
              <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-600 text-white">
                  Alto (≥ 20.0%)
                </span>
                <h4 className="font-bold text-rose-950 dark:text-rose-200 text-sm">Estatina Alta Intensidade</h4>
                <p className="text-xs text-rose-900/80 dark:text-rose-300 leading-relaxed">
                  Indicação Classe I de estatina potente (Atorvastatina 40-80mg ou Rosuvastatina 20-40mg) com objetivo de redução ≥ 50% do LDL-c. Controle pressórico intensivo (&lt; 130/80 mmHg).
                </p>
              </div>
            </div>

            {/* QUADRO ESPECÍFICO CKM */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={16} />
                <span>Síndrome Cardiovascular-Rim-Metabólica (CKM — AHA Presidential Advisory)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs font-bold text-emerald-400 block mb-1">Estágio 0</span>
                  <h5 className="font-bold text-sm">Sem fatores de risco</h5>
                  <p className="text-xs text-slate-400 mt-1">Prevenção primordial; manter peso, glicemia e pressão ideais.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs font-bold text-blue-400 block mb-1">Estágio 1</span>
                  <h5 className="font-bold text-sm">Adiposidade Excessiva</h5>
                  <p className="text-xs text-slate-400 mt-1">IMC ≥ 25 kg/m² ou obesidade abdominal; pré-diabetes. Foco em perda ponderal ≥ 5%.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs font-bold text-amber-400 block mb-1">Estágio 2</span>
                  <h5 className="font-bold text-sm">Fatores Metabólicos / Rim</h5>
                  <p className="text-xs text-slate-400 mt-1">DM2, HAS, Hipertrigliceridemia, DRC (TFG 30-60 ou UACR &gt; 30). Considerar iSGLT2 e aGLP-1 com benefício CV comprovado.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs font-bold text-rose-400 block mb-1">Estágio 3</span>
                  <h5 className="font-bold text-sm">Doença Subclínica</h5>
                  <p className="text-xs text-slate-400 mt-1">Risco PREVENT ≥ 20%, CAC &gt; 100 ou DRC avançada. Terapia farmacológica cardioprotetora intensiva.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 4: PREVENT vs POOLED COHORT EQUATIONS (PCE 2013) */}
      {activeTab === 'comparison' && (
        <div className="card p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
              <Scale size={22} className="text-rose-600" />
              Por Que o PREVENT Substituiu o Pooled Cohort Equations (PCE)?
            </h3>
            <p className="text-sm text-ink-muted mt-1 max-w-4xl leading-relaxed">
              Desenvolvido pela força-tarefa da American Heart Association em 2023/2024 e derivado de mais de 6 milhões de indivíduos em coortes modernas, o PREVENT resolve as principais limitações das equações anteriores de 2013.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* O que mudou */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-line pb-2">
                4 Grandes Avanços do PREVENT™ 2024
              </h4>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-bg border border-line space-y-1">
                  <strong className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 text-xs flex items-center justify-center font-bold">1</span>
                    Ausência de Raça ("Race-Free")
                  </strong>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    O PCE de 2013 utilizava raça como variável preditora binária (Negros vs Brancos), tratando disparidades sociais como biológicas. O PREVENT removeu raça e introduziu o Índice de Privação Social (SDI).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-bg border border-line space-y-1">
                  <strong className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 text-xs flex items-center justify-center font-bold">2</span>
                    Inclusão Direta de Função Renal (TFG e UACR)
                  </strong>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    A Doença Renal Crônica é um dos maiores multiplicadores de risco cardiovascular do corpo humano. Pela primeira vez, a TFG estimada faz parte do modelo base obrigatório.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-bg border border-line space-y-1">
                  <strong className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 text-xs flex items-center justify-center font-bold">3</span>
                    Previsão de Insuficiência Cardíaca
                  </strong>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    O PCE só calculava aterosclerose (IAM e AVC). No entanto, em mulheres, idosos e diabéticos, a Insuficiência Cardíaca é o evento cardiovascular inicial mais comum. O PREVENT fornece desfecho conjunto e específico de IC.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-bg border border-line space-y-1">
                  <strong className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 text-xs flex items-center justify-center font-bold">4</span>
                    Correção de Hiperestimação de Risco
                  </strong>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    O PCE superestimava o risco em até 2 vezes na população contemporânea devido à melhoria geral do tratamento de base nas últimas décadas. O PREVENT foi calibrado em coortes pós-2015.
                  </p>
                </div>
              </div>
            </div>

            {/* Tabela Resumo Lado a Lado */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-line pb-2">
                Comparativo Técnico Direto
              </h4>

              <div className="overflow-x-auto rounded-2xl border border-line">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/60 font-bold text-brand-navy">
                    <tr>
                      <th className="p-3">Característica</th>
                      <th className="p-3 text-slate-500">PCE (2013)</th>
                      <th className="p-3 text-rose-600">PREVENT™ (2024)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    <tr>
                      <td className="p-3 font-semibold text-brand-navy">Faixa Etária</td>
                      <td className="p-3 text-ink-muted">40 a 79 anos</td>
                      <td className="p-3 font-bold text-emerald-600">30 a 79 anos</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-brand-navy">Horizonte Temporal</td>
                      <td className="p-3 text-ink-muted">Apenas 10 anos</td>
                      <td className="p-3 font-bold text-emerald-600">10 e 30 anos (idade 30-59)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-brand-navy">Desfechos Previstos</td>
                      <td className="p-3 text-ink-muted">IAM fatal/não fatal e AVC</td>
                      <td className="p-3 font-bold text-emerald-600">Total CVD, ASCVD e Insuficiência Cardíaca</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-brand-navy">Variável Raça</td>
                      <td className="p-3 text-rose-600">Sim (Branco vs Negro)</td>
                      <td className="p-3 font-bold text-emerald-600">Não (Race-Free)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-brand-navy">Saúde Renal</td>
                      <td className="p-3 text-ink-muted">Não incluída</td>
                      <td className="p-3 font-bold text-emerald-600">TFG e Albuminúria (UACR)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-brand-navy">Metabolismo / CKM</td>
                      <td className="p-3 text-ink-muted">Apenas DM binário</td>
                      <td className="p-3 font-bold text-emerald-600">DM, IMC, HbA1c e CKM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
