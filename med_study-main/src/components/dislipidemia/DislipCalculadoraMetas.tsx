import React, { useState } from 'react';
import { 
  Calculator, 
  Heart, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Pill, 
  Activity, 
  Flame, 
  RotateCcw,
  Info,
  Sparkles
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function DislipCalculadoraMetas() {
  // Dados do Perfil Lipídico
  const [ct, setCt] = useState<number>(240);
  const [hdl, setHdl] = useState<number>(42);
  const [tg, setTg] = useState<number>(220);
  const [fasting, setFasting] = useState<boolean>(false); // Sem jejum como padrão

  // Fatores de Risco Clínico
  const [hasManifestCvd, setHasManifestCvd] = useState<boolean>(false); // DAC, IAM, AVC, DAP, estenose >=50%
  const [hasSubclinicalAthero, setHasSubclinicalAthero] = useState<boolean>(false); // CAC > 100, placa > 50%
  const [hasAaa, setHasAaa] = useState<boolean>(false); // Aneurisma aorta
  const [hasCkd, setHasCkd] = useState<boolean>(false); // DRC TFG < 60
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(false);
  const [hasDmAgravantes, setHasDmAgravantes] = useState<boolean>(false); // >10 anos, tabagismo, HAS, microalb
  const [hasFhSuspect, setHasFhSuspect] = useState<boolean>(false); // LDL basal >= 190
  const [hasAgravantesRisco, setHasAgravantesRisco] = useState<boolean>(false); // Família prematura, PCR>2, Lp(a)>50
  const [framinghamTier, setFraminghamTier] = useState<'baixo' | 'intermediario'>('intermediario');

  // Cálculos do Perfil
  const vldl = tg / 5;
  const isFriedewaldInvalid = tg > 400;
  const calculatedLdl = isFriedewaldInvalid ? null : ct - hdl - vldl;
  const nonHdl = ct - hdl;
  const ctHdlRatio = hdl > 0 ? (ct / hdl).toFixed(1) : '0';
  const tgHdlRatio = hdl > 0 ? (tg / hdl).toFixed(1) : '0';

  // Determinação do Risco Cardiovascular
  let riskTier: 'muito_alto' | 'alto' | 'intermediario' | 'baixo' = 'baixo';
  let riskReason: string[] = [];

  if (hasManifestCvd) {
    riskTier = 'muito_alto';
    riskReason.push('Doença Aterosclerótica Clínica Manifesta (DAC/SCA, AVC, DAP ou obstrução ≥ 50%)');
  } else if (hasSubclinicalAthero || hasAaa || hasCkd || hasFhSuspect || (hasDiabetes && hasDmAgravantes) || (calculatedLdl !== null && calculatedLdl >= 190)) {
    riskTier = 'alto';
    if (hasSubclinicalAthero) riskReason.push('Aterosclerose subclínica (CAC > 100 UA ou placa carotídea > 50%)');
    if (hasAaa) riskReason.push('Aneurisma de Aorta Abdominal');
    if (hasCkd) riskReason.push('Doença Renal Crônica (TFG < 60 mL/min)');
    if (hasFhSuspect || (calculatedLdl !== null && calculatedLdl >= 190)) riskReason.push('Hipercolesterolemia grave (LDL basal ≥ 190 mg/dL - suspeita de HF)');
    if (hasDiabetes && hasDmAgravantes) riskReason.push('Diabetes Mellitus com fatores agravantes de risco ou > 10 anos de evolução');
  } else if (hasDiabetes || framinghamTier === 'intermediario' || hasAgravantesRisco) {
    if (hasAgravantesRisco) {
      riskTier = 'alto';
      riskReason.push('Reclassificado de Intermediário para ALTO RISCO devido a fatores agravantes (história familiar prematura / CAC / PCR-us / Lp(a))');
    } else {
      riskTier = 'intermediario';
      if (hasDiabetes) riskReason.push('Diabetes Mellitus sem fatores agravantes associados');
      else riskReason.push('Escore de Risco Global Intermediário (5-20% em homens ou 5-10% em mulheres)');
    }
  } else {
    riskTier = 'baixo';
    riskReason.push('Escore de Risco Global baixo (< 5% em 10 anos)');
  }

  // Metas Lipídicas conforme Risco
  let targetLdl = 130;
  let targetNonHdl = 160;

  if (riskTier === 'muito_alto') {
    targetLdl = 50;
    targetNonHdl = 80;
  } else if (riskTier === 'alto') {
    targetLdl = 70;
    targetNonHdl = 100;
  } else if (riskTier === 'intermediario') {
    targetLdl = 100;
    targetNonHdl = 130;
  } else {
    targetLdl = 130;
    targetNonHdl = 160;
  }

  // Porcentagem de redução necessária de LDL
  const effectiveLdl = calculatedLdl !== null ? calculatedLdl : (ct - hdl - 80); // estimativa se Friedewald inválido
  const ldlDelta = effectiveLdl - targetLdl;
  const ldlReductionPercent = effectiveLdl > 0 ? Math.round((ldlDelta / effectiveLdl) * 100) : 0;

  // Análise dos Triglicerídeos
  const isTgEmergency = tg >= 500;
  const isTgSevere = tg >= 1000;
  const isTgElevated = tg >= (fasting ? 150 : 175);

  const resetAll = () => {
    setCt(240);
    setHdl(42);
    setTg(220);
    setFasting(false);
    setHasManifestCvd(false);
    setHasSubclinicalAthero(false);
    setHasAaa(false);
    setHasCkd(false);
    setHasDiabetes(false);
    setHasDmAgravantes(false);
    setHasFhSuspect(false);
    setHasAgravantesRisco(false);
    setFraminghamTier('intermediario');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-indigo-950/20 via-card to-card border-indigo-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-500 text-xs font-bold uppercase tracking-widest">
            <Calculator size={16} />
            <span>Ferramenta Interativa de Decisão Médica</span>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-brand-navy p-1.5 rounded-lg border border-line"
          >
            <RotateCcw size={14} />
            <span>Redefinir</span>
          </button>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mt-1">
          Calculadora de Risco Cardiovascular, Metas & Conduta
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          Insira os parâmetros laboratoriais e os antecedentes clínicos do paciente para receber instantaneamente a <strong>estratificação de risco cardiovascular (SBC/ESC)</strong>, o cálculo de <strong>Friedewald e Não-HDL</strong>, as metas individualizadas de LDL-c e o plano terapêutico otimizado para colesterol e triglicerídeos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUNA ESQUERDA: INPUTS (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Perfil Lipídico */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                <Activity size={16} className="text-indigo-600" />
                <span>1. Dados Laboratoriais do Perfil Lipídico</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFasting(false)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                    !fasting ? "bg-indigo-600 text-white" : "bg-card border border-line text-ink-muted"
                  )}
                >
                  Sem Jejum
                </button>
                <button
                  onClick={() => setFasting(true)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                    fasting ? "bg-indigo-600 text-white" : "bg-card border border-line text-ink-muted"
                  )}
                >
                  Jejum 12h
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">Colesterol Total (CT)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={ct}
                    onChange={(e) => setCt(Math.max(0, Number(e.target.value)))}
                    className="w-full text-sm font-bold p-2.5 rounded-xl bg-bg border border-line text-brand-navy pr-12"
                  />
                  <span className="absolute right-3 top-3 text-[10px] text-ink-muted">mg/dL</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">HDL-Colesterol</label>
                <div className="relative">
                  <input
                    type="number"
                    value={hdl}
                    onChange={(e) => setHdl(Math.max(0, Number(e.target.value)))}
                    className="w-full text-sm font-bold p-2.5 rounded-xl bg-bg border border-line text-brand-navy pr-12"
                  />
                  <span className="absolute right-3 top-3 text-[10px] text-ink-muted">mg/dL</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">Triglicerídeos (TG)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={tg}
                    onChange={(e) => setTg(Math.max(0, Number(e.target.value)))}
                    className={cn(
                      "w-full text-sm font-bold p-2.5 rounded-xl border pr-12",
                      tg >= 500 ? "bg-red-500/10 border-red-500 text-red-600" : "bg-bg border-line text-brand-navy"
                    )}
                  />
                  <span className="absolute right-3 top-3 text-[10px] text-ink-muted">mg/dL</span>
                </div>
              </div>
            </div>

            {/* Aviso sobre Jejum ou TG > 400 */}
            {isFriedewaldInvalid && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle size={16} className="shrink-0 text-amber-600 mt-0.5" />
                <span>
                  <strong>Triglicerídeos &gt; 400 mg/dL:</strong> A fórmula de Friedewald é matematicamente inválida! O laboratório deve relatar <strong>LDL-c dosado diretamente</strong> ou utilizar o <strong>Colesterol Não-HDL</strong> como alvo primário.
                </span>
              </div>
            )}
            {tg >= 440 && !fasting && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-900 dark:text-blue-200 text-xs flex items-start gap-2">
                <Info size={16} className="shrink-0 text-blue-600 mt-0.5" />
                <span>
                  <strong>TG &ge; 440 mg/dL sem jejum:</strong> Segundo o Consenso Brasileiro de Perfil Lipídico, recomenda-se nova coleta confirmatória após <strong>jejum rigoroso de 12 horas</strong>.
                </span>
              </div>
            )}
          </div>

          {/* Card 2: Histórico Clínico & Comorbidades */}
          <div className="card p-5 space-y-4">
            <h3 className="font-bold text-brand-navy text-sm flex items-center gap-2 border-b border-line pb-3">
              <Heart size={16} className="text-red-500" />
              <span>2. Antecedentes & Condições Clínicas de Risco</span>
            </h3>

            <div className="space-y-3">
              {/* Muito Alto Risco */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line cursor-pointer hover:border-red-500/40 transition-colors">
                <input
                  type="checkbox"
                  checked={hasManifestCvd}
                  onChange={(e) => setHasManifestCvd(e.target.checked)}
                  className="mt-0.5 rounded text-red-600"
                />
                <div>
                  <span className="font-bold text-xs text-brand-navy block">Doença Aterosclerótica Clínica Manifesta</span>
                  <span className="text-[11px] text-ink-muted block leading-snug">
                    História de IAM, angina estável/instável com obstrução &ge; 50%, angioplastia coronária (stent), cirurgia de CRM, AVC isquêmico, AIT ou Doença Arterial Periférica (DAP/ITB &lt; 0,90).
                  </span>
                </div>
              </label>

              {/* Alto Risco: Subclínica, Aneurisma, DRC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSubclinicalAthero}
                    onChange={(e) => setHasSubclinicalAthero(e.target.checked)}
                    className="mt-0.5 rounded text-amber-600"
                  />
                  <div>
                    <span className="font-bold text-xs text-brand-navy block">Aterosclerose Subclínica</span>
                    <span className="text-[10px] text-ink-muted">CAC &gt; 100 UA ou placa carotídea &gt; 50%</span>
                  </div>
                </label>

                <label className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCkd}
                    onChange={(e) => setHasCkd(e.target.checked)}
                    className="mt-0.5 rounded text-amber-600"
                  />
                  <div>
                    <span className="font-bold text-xs text-brand-navy block">Doença Renal Crônica</span>
                    <span className="text-[10px] text-ink-muted">TFG &lt; 60 mL/min (Estágios G3 a G4)</span>
                  </div>
                </label>

                <label className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAaa}
                    onChange={(e) => setHasAaa(e.target.checked)}
                    className="mt-0.5 rounded text-amber-600"
                  />
                  <div>
                    <span className="font-bold text-xs text-brand-navy block">Aneurisma de Aorta</span>
                    <span className="text-[10px] text-ink-muted">Aorta abdominal &ge; 3,0 cm</span>
                  </div>
                </label>

                <label className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasFhSuspect}
                    onChange={(e) => setHasFhSuspect(e.target.checked)}
                    className="mt-0.5 rounded text-amber-600"
                  />
                  <div>
                    <span className="font-bold text-xs text-brand-navy block">LDL Basal &ge; 190 mg/dL</span>
                    <span className="text-[10px] text-ink-muted">Suspeita de Hipercolesterolemia Familiar</span>
                  </div>
                </label>
              </div>

              {/* Diabetes Mellitus */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDiabetes}
                    onChange={(e) => {
                      setHasDiabetes(e.target.checked);
                      if (!e.target.checked) setHasDmAgravantes(false);
                    }}
                    className="rounded text-indigo-600"
                  />
                  <span className="font-bold text-xs text-brand-navy">Paciente é Portador de Diabetes Mellitus (DM1 ou DM2)</span>
                </label>

                {hasDiabetes && (
                  <div className="pl-6 pt-1 space-y-1">
                    <label className="flex items-center gap-2 text-xs text-ink-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasDmAgravantes}
                        onChange={(e) => setHasDmAgravantes(e.target.checked)}
                        className="rounded text-amber-600"
                      />
                      <span>Apresenta fatores agravantes: &ge; 10 anos de DM, tabagismo, HAS, microalbuminúria ou retinopatia?</span>
                    </label>
                    <span className="text-[10px] text-amber-600 block pl-6">
                      (Com agravantes: enquadra-se diretamente em <strong>Alto Risco</strong>)
                    </span>
                  </div>
                )}
              </div>

              {/* Risco Intermediário e Fatores Agravantes de Reclassificação */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line space-y-2">
                <span className="text-[11px] font-bold text-brand-navy block">Escore de Framingham / Risco Global (se sem critérios acima):</span>
                <div className="flex gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="framingham"
                      checked={framinghamTier === 'baixo'}
                      onChange={() => setFraminghamTier('baixo')}
                      className="text-emerald-600"
                    />
                    <span>Baixo Risco (&lt; 5% em 10 anos)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="framingham"
                      checked={framinghamTier === 'intermediario'}
                      onChange={() => setFraminghamTier('intermediario')}
                      className="text-blue-600"
                    />
                    <span>Risco Intermediário (5-20% M / 5-10% F)</span>
                  </label>
                </div>

                <div className="pt-2 border-t border-line/60">
                  <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAgravantesRisco}
                      onChange={(e) => setHasAgravantesRisco(e.target.checked)}
                      className="mt-0.5 rounded text-purple-600"
                    />
                    <span>
                      <strong>Possui Fatores Agravantes de Risco:</strong> História familiar de DCV precoce, PCR-us &gt; 2 mg/L, CAC &gt; 100 UA, Lp(a) &gt; 50 mg/dL ou Síndrome Metabólica.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: RESULTADOS & CONDUTA MÉDICA (5 colunas) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card de Estratificação & Metas */}
          <div className="card p-5 space-y-4 border-2 border-indigo-500/30">
            {/* Banner do Risco Cardiovascular */}
            <div className={cn(
              "p-4 rounded-2xl border text-left",
              riskTier === 'muito_alto' && "bg-red-600/10 border-red-600/40 text-red-600",
              riskTier === 'alto' && "bg-amber-500/10 border-amber-500/40 text-amber-600",
              riskTier === 'intermediario' && "bg-blue-500/10 border-blue-500/40 text-blue-600",
              riskTier === 'baixo' && "bg-emerald-500/10 border-emerald-500/40 text-emerald-600"
            )}>
              <span className="text-[10px] font-bold uppercase tracking-widest block">Estratificação SBC / ESC</span>
              <h3 className="text-xl font-bold mt-0.5">
                {riskTier === 'muito_alto' && 'Muito Alto Risco Cardiovascular'}
                {riskTier === 'alto' && 'Alto Risco Cardiovascular'}
                {riskTier === 'intermediario' && 'Risco Cardiovascular Intermediário'}
                {riskTier === 'baixo' && 'Baixo Risco Cardiovascular'}
              </h3>
              <div className="text-[11px] text-ink-muted mt-1 leading-snug">
                {riskReason.join('; ')}
              </div>
            </div>

            {/* Metas Primárias */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-card border border-line text-center">
                <span className="text-[10px] font-bold uppercase text-ink-muted block">Meta de LDL-c</span>
                <span className="text-2xl font-black text-brand-navy block mt-0.5">
                  &lt; {targetLdl} <span className="text-xs font-normal text-ink-muted">mg/dL</span>
                </span>
                {(riskTier === 'muito_alto' || riskTier === 'alto') && (
                  <span className="text-[10px] font-semibold text-rose-500 block mt-0.5">e redução &ge; 50%</span>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-line text-center">
                <span className="text-[10px] font-bold uppercase text-ink-muted block">Meta de Não-HDL</span>
                <span className="text-2xl font-black text-brand-navy block mt-0.5">
                  &lt; {targetNonHdl} <span className="text-xs font-normal text-ink-muted">mg/dL</span>
                </span>
                <span className="text-[10px] text-ink-muted block mt-0.5">LDL + 30 mg/dL</span>
              </div>
            </div>

            {/* Valores Calculados do Paciente */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-ink-muted">LDL-c Atual (Friedewald):</span>
                {isFriedewaldInvalid ? (
                  <span className="font-bold text-amber-600">Inválido (TG &gt; 400)</span>
                ) : (
                  <span className={cn("font-bold", effectiveLdl > targetLdl ? "text-red-500" : "text-emerald-600")}>
                    {Math.round(calculatedLdl!)} mg/dL {effectiveLdl > targetLdl ? `(Acima da meta!)` : `(Na meta)`}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-ink-muted">Colesterol Não-HDL Atual:</span>
                <span className={cn("font-bold", nonHdl > targetNonHdl ? "text-red-500" : "text-emerald-600")}>
                  {nonHdl} mg/dL {nonHdl > targetNonHdl ? `(Acima da meta)` : `(Na meta)`}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-ink-muted">Redução de LDL Necessária:</span>
                <span className="font-bold text-brand-navy">
                  {ldlReductionPercent > 0 ? `${ldlReductionPercent}% de queda` : 'Nenhuma (Já na meta)'}
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-line/60 pt-1.5">
                <span className="text-ink-muted">Relação TG / HDL:</span>
                <span className="font-bold text-brand-navy">
                  {tgHdlRatio} {Number(tgHdlRatio) > 3.0 && <span className="text-amber-500 text-[10px]">(LDL pequenas e densas)</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Card de Alerta Especial de Triglicerídeos se >= 500 */}
          {isTgEmergency && (
            <div className="card p-5 border-2 border-red-600 bg-red-600/10 space-y-3 animate-pulse">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <Flame size={20} />
                <span>ALERTA DE PANCREATITE AGUDA (TG &ge; 500 mg/dL)</span>
              </div>
              <p className="text-xs text-red-900 dark:text-red-200 leading-relaxed">
                Nível de triglicerídeos em <strong>{tg} mg/dL</strong> confere risco iminente de pancreatite necrotizante!
              </p>
              <div className="p-3 rounded-xl bg-card border border-red-500/30 text-xs space-y-1.5">
                <div className="font-bold text-red-600">Prescrição Imediata Obrigatória:</div>
                <div>&bull; <strong>Fenofibrato 160 a 200 mg/dia</strong> VO junto com almoço.</div>
                <div>&bull; <strong>Dieta Hipogordurosa Severa:</strong> Gorduras totais &lt; 10-15% das calorias diárias.</div>
                <div>&bull; <strong>Abstinência total de álcool</strong>.</div>
                <div className="text-[11px] text-red-600 font-bold pt-1">
                  ATENÇÃO: NÃO prescrever Genfibrozila se o paciente usar estatinas (risco de rabdomiólise fatal).
                </div>
              </div>
            </div>
          )}

          {/* Card de Prescrição & Conduta Hipolipemiante Sugerida */}
          <div className="card p-5 space-y-3">
            <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
              <Pill size={16} className="text-indigo-600" />
              <span>Conduta Médica & Prescrição Recomendada</span>
            </h4>

            <div className="space-y-2 text-xs text-ink-muted leading-relaxed">
              {/* Sugestão de Estatina */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
                <div className="font-bold text-brand-navy mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-indigo-600" />
                  <span>Escolha da Estatina:</span>
                </div>
                {riskTier === 'muito_alto' || riskTier === 'alto' || ldlReductionPercent >= 50 ? (
                  <p>
                    Indicação formal de <strong>Estatina de Alta Potência</strong> (redução &ge; 50% de LDL):
                    <br />&bull; <strong>Atorvastatina 40 a 80 mg/dia</strong> VO (qualquer horário) OU
                    <br />&bull; <strong>Rosuvastatina 20 a 40 mg/dia</strong> VO (dose única diária).
                  </p>
                ) : riskTier === 'intermediario' || ldlReductionPercent >= 30 ? (
                  <p>
                    Indicação de <strong>Estatina de Moderada Potência</strong> (redução 30-49%):
                    <br />&bull; <strong>Atorvastatina 10 a 20 mg/dia</strong> OU
                    <br />&bull; <strong>Rosuvastatina 5 a 10 mg/dia</strong> OU
                    <br />&bull; <strong>Sinvastatina 20 a 40 mg/dia</strong> (à noite).
                  </p>
                ) : (
                  <p>
                    Iniciar com <strong>Mudanças no Estilo de Vida (MEV)</strong> por 3 a 6 meses. Se persistir LDL &ge; 130 mg/dL com outros fatores, considerar estatina de moderada ou baixa potência (Pravastatina 40 mg ou Sinvastatina 20 mg).
                  </p>
                )}
              </div>

              {/* Sugestão de Ezetimiba */}
              {(riskTier === 'muito_alto' && effectiveLdl > 80) || ldlReductionPercent > 55 ? (
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-950 dark:text-indigo-200">
                  <strong>Associação Precoce com Ezetimiba 10 mg/dia:</strong>
                  <p className="mt-0.5">
                    Como a redução necessária de LDL-c é superior a 50-55%, a estatina isolada raramente atingirá a meta de &lt; 50 mg/dL. Recomenda-se iniciar precocemente a combinação <strong>Estatina + Ezetimiba 10 mg/dia</strong>.
                  </p>
                </div>
              ) : null}

              {/* Conduta de Triglicerídeos se 150-499 */}
              {!isTgEmergency && isTgElevated && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200">
                  <strong>Triglicerídeos Elevados ({tg} mg/dL - Risco Aterogênico):</strong>
                  <p className="mt-0.5">
                    Priorizar a dose de estatina (já reduz TG em 15-30%) + MEV intensiva (cortar açúcares simples e álcool). Se TG persistirem entre 150-499 mg/dL após atingir meta de LDL em alto risco, considerar EPA purificado (Icosapente de etila 4g/dia) ou Fenofibrato se TG &gt; 200 com HDL baixo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
