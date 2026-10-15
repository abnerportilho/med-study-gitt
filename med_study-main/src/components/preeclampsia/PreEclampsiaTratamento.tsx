import React, { useState } from 'react';
import { 
  Pill, Zap, Baby, ShieldAlert, AlertTriangle, CheckCircle2,
  HeartPulse, Activity, AlertCircle, Clock, Stethoscope, Droplet,
  FileText, BookmarkCheck, ArrowRight, Shield, Sparkles
} from 'lucide-react';

export default function PreEclampsiaTratamento() {
  const [subTab, setSubTab] = useState<'sulfato' | 'antihipertensivo' | 'proibidos_complicacoes' | 'resolucao_pos'>('sulfato');

  // Estado da Calculadora de MgSO4
  const [mgScheme, setMgScheme] = useState<'zuspan' | 'pritchard'>('zuspan');
  const [creatinineLevel, setCreatinineLevel] = useState<number>(0.8);
  const [diuresisLevel, setDiuresisLevel] = useState<number>(35);
  const [patellarReflex, setPatellarReflex] = useState<'presente' | 'ausente'>('presente');
  const [respRate, setRespRate] = useState<number>(18);

  const hasToxicity = 
    diuresisLevel < 25 || 
    patellarReflex === 'ausente' || 
    respRate < 16 || 
    creatinineLevel >= 1.2;

  return (
    <div className="space-y-6">
      
      {/* NAVEGAÇÃO DE SUB-ABAS DE TRATAMENTO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setSubTab('sulfato')}
          className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'sulfato'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Zap size={15} /> 1. MgSO4 (Sulfato)
        </button>

        <button
          onClick={() => setSubTab('antihipertensivo')}
          className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'antihipertensivo'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Pill size={15} /> 2. Anti-hipertensivos & Crise
        </button>

        <button
          onClick={() => setSubTab('proibidos_complicacoes')}
          className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'proibidos_complicacoes'
              ? 'bg-red-700 text-white shadow-lg shadow-red-950/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShieldAlert size={15} /> 3. Proibidos & Complicações
        </button>

        <button
          onClick={() => setSubTab('resolucao_pos')}
          className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'resolucao_pos'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Baby size={15} /> 4. Resolução & Pós-Parto
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. SULFATO DE MAGNÉSIO (MGSO4) */}
      {/* ========================================================================= */}
      {subTab === 'sulfato' && (
        <div className="space-y-6">
          
          {/* INDICAÇÕES CENTRAIS & PRINCÍPIO DE OURO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border-2 border-amber-600/80 p-5 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase">
                <Zap size={18} /> 1. Prevenção e Tratamento da Eclâmpsia
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Indicado em <strong>Iminência de Eclâmpsia, Eclâmpsia franca e Síndrome HELLP</strong>. Estabiliza a barreira neuronal e restaura o tônus arteriolar cerebral.
              </p>
              <div className="p-2.5 bg-amber-950/60 rounded-xl border border-amber-700/60 text-xs text-amber-200 font-bold">
                🚨 REGRA DE OURO: MgSO4 é a PRIMEIRA MEDIDA! A estabilização materna precede até a verificação do bem-estar fetal.
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-sky-600/80 p-5 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-black text-sm uppercase">
                <Baby size={18} /> 2. Neuroproteção Fetal Pré-Termo
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Indicado quando o parto for iminente em gestações <strong>&lt; 32 semanas</strong> (BEAM Trial). Reduz em mais de 50% o risco de paralisia cerebral e hemorragia intraventricular grave no prematuro.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                • Evidência de nível I: <strong>MAGPIE Trial (Lancet 2002)</strong> mostrou que MgSO4 reduz pela metade o risco de eclâmpsia vs placebo.
              </div>
            </div>
          </div>

          {/* PRESCRIÇÃO PRÁTICA INTERATIVA ZUSPAN vs PRITCHARD */}
          <div className="bg-slate-900 border-2 border-slate-700 p-6 rounded-3xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-wider">
                  Prescrição Prática e Diluições de MgSO4
                </h3>
                <p className="text-xs text-slate-400 font-medium">Selecione o esquema institucional (Zuspan ou Pritchard)</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setMgScheme('zuspan')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    mgScheme === 'zuspan' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' 
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  Zuspan (EV Exclusivo)
                </button>
                <button
                  onClick={() => setMgScheme('pritchard')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    mgScheme === 'pritchard' 
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50' 
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  Pritchard (EV + IM)
                </button>
              </div>
            </div>

            {/* ESQUEMA DETALHADO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* ATAQUE */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-emerald-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-600 rounded-full text-xs font-black uppercase">
                    1. Dose de Ataque
                  </span>
                  <span className="text-xs font-black text-white">4 g EV em 20 min</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block font-bold mb-1">Com MgSO4 50% (Ampola 10 mL = 5 g):</strong>
                    <p className="font-mono text-emerald-300 font-bold">
                      MgSO4 50% 8 mL (4 g) + SF 0,9% 242 mL (Total 250 mL) ➔ Infundir EV a 750 mL/h em BIC (em 20 min).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block font-bold mb-1">Com MgSO4 10% (Ampola 10 mL = 1 g):</strong>
                    <p className="font-mono text-emerald-300 font-bold">
                      MgSO4 10% 4 ampolas (4 g / 40 mL) + SF 0,9% 210 mL (Total 250 mL) ➔ Infundir EV a 750 mL/h em BIC.
                    </p>
                  </div>

                  {mgScheme === 'pritchard' && (
                    <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600 text-amber-200">
                      <strong className="text-white block font-bold mb-1">+ Componente IM de Ataque (Pritchard):</strong>
                      <p className="font-mono font-bold">
                        MgSO4 50% 10 mL (5 g) IM profundo em cada nádega (Total: 10 g IM no ataque).
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* MANUTENÇÃO */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-indigo-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-600 rounded-full text-xs font-black uppercase">
                    2. Dose de Manutenção
                  </span>
                  <span className="text-xs font-black text-white">
                    {mgScheme === 'zuspan' ? '1 a 2 g/hora EV contínuo' : '5 g IM a cada 4 horas'}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  {mgScheme === 'zuspan' ? (
                    <>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <strong className="text-white block font-bold mb-1">Com MgSO4 50% (Opção Padrão Zuspan):</strong>
                        <p className="font-mono text-indigo-300 font-bold">
                          MgSO4 50% 1 ampola (5 g / 10 mL) + SF 0,9% 490 mL (Total 500 mL) ➔ Infundir em BIC a 100 mL/h (1 g/h) ou 200 mL/h (2 g/h).
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <strong className="text-white block font-bold mb-1">Com MgSO4 10%:</strong>
                        <p className="font-mono text-indigo-300 font-bold">
                          MgSO4 10% 5 ampolas (5 g / 50 mL) + SF 0,9% 450 mL (Total 500 mL) ➔ Infundir em BIC a 100 mL/h (1 g/h).
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-white block font-bold mb-1">Manutenção de Pritchard (IM):</strong>
                      <p className="font-mono text-amber-300 font-bold">
                        MgSO4 50% 1 ampola (5 g / 10 mL) IM profundo em nádegas alternadas a cada 4 horas.
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <p>• <strong>Tempo de Manutenção:</strong> Manter por <strong>≥ 24 horas após o início</strong>; se o parto ocorrer dentro desse período, <strong>reinicia-se a contagem de 24 horas pós-parto</strong>.</p>
                    <p>• <strong>Se nova convulsão em vigência de MgSO4:</strong> Administrar novo bolus de ataque de <strong>2 g EV</strong> (MgSO4 50% 4 mL + SF 0,9% 96 mL em 10 min).</p>
                  </div>
                </div>
              </div>

            </div>

            {/* SIMULADOR DE MONITORIZAÇÃO E TOXICIDADE */}
            <div className="p-5 bg-slate-950 rounded-2xl border-2 border-amber-900/60 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-black text-amber-300 uppercase flex items-center gap-2">
                    <ShieldAlert size={18} /> Vigilância Clínica de Intoxicação por Magnésio
                  </h4>
                  <p className="text-xs text-slate-400">Ajuste os parâmetros clínicos para testar a segurança da infusão</p>
                </div>
                {hasToxicity ? (
                  <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-600 rounded-full text-xs font-black animate-pulse self-start">
                    🚨 SINAL DE TOXICIDADE DETECTADO!
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-600 rounded-full text-xs font-black self-start">
                    ✓ PARÂMETROS SEGUROS
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {/* DIURESE */}
                <div className={`p-3 rounded-xl border ${diuresisLevel < 25 ? 'bg-red-950/40 border-red-600' : 'bg-slate-900 border-slate-800'}`}>
                  <label className="font-bold text-slate-400 block mb-1">
                    Diurese Horária: <strong className={diuresisLevel < 25 ? 'text-red-400' : 'text-emerald-400'}>{diuresisLevel} mL/h</strong>
                  </label>
                  <input 
                    type="range" min="5" max="60" value={diuresisLevel} 
                    onChange={(e) => setDiuresisLevel(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1 font-bold">Meta: ≥ 25 mL/h (Melhor parâmetro!)</span>
                </div>

                {/* REFLEXO PATELAR */}
                <div className={`p-3 rounded-xl border ${patellarReflex === 'ausente' ? 'bg-red-950/40 border-red-600' : 'bg-slate-900 border-slate-800'}`}>
                  <label className="font-bold text-slate-400 block mb-1">Reflexo Patelar</label>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setPatellarReflex('presente')}
                      className={`flex-1 py-1 rounded text-xs font-bold ${patellarReflex === 'presente' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400'}`}
                    >
                      Presente
                    </button>
                    <button
                      onClick={() => setPatellarReflex('ausente')}
                      className={`flex-1 py-1 rounded text-xs font-bold ${patellarReflex === 'ausente' ? 'bg-red-600 text-white' : 'bg-slate-950 text-slate-400'}`}
                    >
                      Abolido
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1 font-bold">1º sinal de intoxicação!</span>
                </div>

                {/* FR */}
                <div className={`p-3 rounded-xl border ${respRate < 16 ? 'bg-red-950/40 border-red-600' : 'bg-slate-900 border-slate-800'}`}>
                  <label className="font-bold text-slate-400 block mb-1">
                    Frequência Resp.: <strong className={respRate < 16 ? 'text-red-400' : 'text-emerald-400'}>{respRate} irpm</strong>
                  </label>
                  <input 
                    type="range" min="8" max="24" value={respRate} 
                    onChange={(e) => setRespRate(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1 font-bold">Meta: ≥ 16 irpm</span>
                </div>

                {/* CREATININA */}
                <div className={`p-3 rounded-xl border ${creatinineLevel >= 1.2 ? 'bg-red-950/40 border-red-600' : 'bg-slate-900 border-slate-800'}`}>
                  <label className="font-bold text-slate-400 block mb-1">
                    Creatinina: <strong className={creatinineLevel >= 1.2 ? 'text-red-400' : 'text-emerald-400'}>{creatinineLevel} mg/dL</strong>
                  </label>
                  <input 
                    type="range" min="0.5" max="3.0" step="0.1" value={creatinineLevel} 
                    onChange={(e) => setCreatinineLevel(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1 font-bold">Se ≥ 1,2: reduzir dose pela metade!</span>
                </div>
              </div>

              {/* ANTÍDOTO */}
              <div className="p-3 bg-red-950/30 rounded-xl border border-red-800 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                <div>
                  <strong className="text-red-300 block font-black uppercase">Antídoto Específico de Resgate:</strong>
                  <span className="text-slate-200">
                    Suspender MgSO4 imediatamente + <strong>Gluconato de Cálcio 10% 1 ampola (10 mL / 1 g) EV lento em 3 a 5 minutos</strong> + suporte ventilatório com O2 sob máscara.
                  </span>
                </div>
                <span className="px-3 py-1 bg-red-900 text-white rounded font-mono font-bold text-xs whitespace-nowrap self-start">
                  Gluconato Ca 10% 1 amp EV
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ANTI-HIPERTENSIVOS & CRISE HIPERTENSIVA */}
      {/* ========================================================================= */}
      {subTab === 'antihipertensivo' && (
        <div className="space-y-6">
          
          {/* CRISE HIPERTENSIVA AGUDA */}
          <div className="bg-slate-900 border-2 border-red-800/80 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-red-900/60 pb-3">
              <h3 className="text-base sm:text-lg font-black text-red-300 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="text-red-400" /> Manejo da Crise Hipertensiva Aguda (PAS ≥ 160 ou PAD ≥ 110 mmHg)
              </h3>
              <span className="px-3 py-1 bg-red-950 text-red-200 border border-red-700 rounded-full text-xs font-black">
                Meta: PAS 140–150 / PAD 90–100
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Tratar em <strong>30 a 60 minutos</strong> para prevenir AVE hemorrágico (principal causa de óbito). <em>Atenção:</em> Evitar queda abrupta da PA para não gerar hipoperfusão placentária e sofrimento fetal agudo!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* NIFEDIPINO */}
              <div className="p-4 bg-slate-950 rounded-2xl border-2 border-emerald-600 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-400 font-black uppercase">1ª Opção: Nifedipino Oral</strong>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-200 rounded text-[10px] font-black">Melhor Evidência</span>
                </div>
                <p className="text-slate-300">
                  <strong>Dose:</strong> 10 mg VO (comprimido simples deglutido, NÃO sublingual!).
                </p>
                <p className="text-slate-300">
                  • Repetir a cada 20 a 30 minutos se a PA permanecer ≥ 160/110 mmHg (Dose máxima de ataque: 30 a 40 mg).
                </p>
                <p className="text-[11px] text-emerald-300 font-semibold">
                  ★ Meta-análise em rede (17-21 RCTs): Nifedipino é superior à Hidralazina com menos efeitos colaterais e controle mais rápido.
                </p>
              </div>

              {/* HIDRALAZINA */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sky-400 font-black uppercase">Alternativa: Hidralazina EV</strong>
                  <span className="px-2 py-0.5 bg-sky-950 text-sky-200 rounded text-[10px] font-black">Opção IV</span>
                </div>
                <p className="text-slate-300">
                  <strong>Dose:</strong> 5 mg EV lento (em 2 minutos).
                </p>
                <p className="text-slate-300">
                  • Reavaliar em 20 minutos. Se persistir, repetir 5 a 10 mg EV a cada 20 min (Dose máxima: 20 a 30 mg).
                </p>
                <p className="text-[11px] text-slate-400">
                  Pode causar taquicardia reflexa e hipotensão se infundido rápido demais.
                </p>
              </div>

              {/* NITROPRUSSIATO */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-red-800 space-y-2 bg-red-950/20">
                <div className="flex items-center justify-between">
                  <strong className="text-red-400 font-black uppercase">Resgate: Nitroprussiato de Sódio</strong>
                  <span className="px-2 py-0.5 bg-red-950 text-red-200 rounded text-[10px] font-black">UTI / Refratária</span>
                </div>
                <p className="text-slate-300">
                  <strong>Dose:</strong> 0,25 a 5,0 mcg/kg/min em BIC contínua com monitorização invasiva.
                </p>
                <p className="text-red-300 font-bold">
                  ⚠️ Exclusivo para refratariedade extrema pelo risco de intoxicação fetal por cianeto/tiocianato se usado por &gt; 4 horas.
                </p>
              </div>

            </div>
          </div>

          {/* MUDANÇA DE PARADIGMA: CHAP TRIAL (NEJM 2022) */}
          <div className="p-5 bg-indigo-950/40 rounded-3xl border-2 border-indigo-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-indigo-300 uppercase flex items-center gap-2">
                <Sparkles size={18} /> Mudança de Paradigma: O Estudo CHAP (NEJM 2022)
              </h4>
              <span className="px-2.5 py-0.5 bg-indigo-900 text-indigo-200 rounded-full text-xs font-black">
                Nível de Evidência I
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              O <strong>CHAP Trial</strong> (2.408 gestantes com HAC leve) comparou tratar com meta <strong>PA &lt; 140/90 mmHg</strong> versus a conduta antiga de tratar somente se PA ≥ 160/105 mmHg.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-indigo-800 text-center">
                <span className="text-[10px] text-slate-400 block font-bold">Desfecho Primário Composto</span>
                <span className="text-sm font-black text-emerald-400">Redução de 18% (RR 0,82)</span>
                <span className="text-[10px] text-slate-400 block">30,2% no tratado vs 37,0% controle</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-indigo-800 text-center">
                <span className="text-[10px] text-slate-400 block font-bold">Pré-Eclâmpsia Sobreposta</span>
                <span className="text-sm font-black text-emerald-400">Redução Significativa</span>
                <span className="text-[10px] text-slate-400 block">Menos DPP e parto pré-termo &lt; 35 sem</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-indigo-800 text-center">
                <span className="text-[10px] text-slate-400 block font-bold">Segurança Fetal</span>
                <span className="text-sm font-black text-white">Sem aumento de PIG / RCF</span>
                <span className="text-[10px] text-slate-400 block">Derrubou o dogma histórico!</span>
              </div>
            </div>
            <p className="text-[11px] text-indigo-300 font-semibold">
              ★ Impacto Clínico: Hoje ACOG, FEBRASGO e NICE recomendam manter o alvo pressórico em gestantes hipertensas crônicas em <strong>PA &lt; 140/90 mmHg</strong> (geralmente entre 120-135 / 80-85 mmHg).
            </p>
          </div>

          {/* TABELA DE ANTI-HIPERTENSIVOS DE MANUTENÇÃO */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h4 className="text-sm font-black text-white uppercase flex items-center gap-2">
              <Pill className="text-emerald-400" /> Tabela de Anti-hipertensivos Orais de Manutenção
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                    <th className="p-2.5">Classe / Opção</th>
                    <th className="p-2.5">Medicamento</th>
                    <th className="p-2.5">Posologia Habitual</th>
                    <th className="p-2.5">Dose Máxima Diária</th>
                    <th className="p-2.5">Observações Clínicas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-800/40 bg-emerald-950/15">
                    <td className="p-2.5 font-bold text-emerald-400">1ª Linha (Agonista Alfa-2)</td>
                    <td className="p-2.5 font-bold text-white">Metildopa</td>
                    <td className="p-2.5 font-mono">250 a 500 mg VO 2 a 4x/dia</td>
                    <td className="p-2.5 font-mono font-bold text-white">2.000 mg/dia (2 g/dia)</td>
                    <td className="p-2.5 text-[11px]">Maior segurança histórica. Causa sonolência, sedação e boca seca.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-bold text-emerald-400">1ª Linha (Alternativa)</td>
                    <td className="p-2.5 font-bold text-white">Clonidina</td>
                    <td className="p-2.5 font-mono">0,1 a 0,2 mg VO 2 a 3x/dia</td>
                    <td className="p-2.5 font-mono font-bold text-white">0,6 mg/dia</td>
                    <td className="p-2.5 text-[11px]">Risco de hipertensão rebote se suspensão abrupta.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 bg-sky-950/15">
                    <td className="p-2.5 font-bold text-sky-400">2ª Linha (BCC)</td>
                    <td className="p-2.5 font-bold text-white">Nifedipino Retard</td>
                    <td className="p-2.5 font-mono">20 a 40 mg VO 1 a 2x/dia</td>
                    <td className="p-2.5 font-mono font-bold text-white">60 a 80 mg/dia</td>
                    <td className="p-2.5 text-[11px]">Excelente eficácia e tolerabilidade. Não mastigar o comprimido retard.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-bold text-sky-400">2ª Linha (BCC)</td>
                    <td className="p-2.5 font-bold text-white">Anlodipino</td>
                    <td className="p-2.5 font-mono">5 a 10 mg VO 1x/dia</td>
                    <td className="p-2.5 font-mono font-bold text-white">20 mg/dia</td>
                    <td className="p-2.5 text-[11px]">Meia-vida longa; muito útil na adesão em dose única diária.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-bold text-amber-400">3ª Linha (Vasodilatador)</td>
                    <td className="p-2.5 font-bold text-white">Hidralazina Oral</td>
                    <td className="p-2.5 font-mono">25 a 50 mg VO 2 a 3x/dia</td>
                    <td className="p-2.5 font-mono font-bold text-white">150 a 200 mg/dia</td>
                    <td className="p-2.5 text-[11px]">Geralmente associada à Metildopa em esquemas combinados.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-bold text-amber-400">3ª Linha (Betabloqueador)</td>
                    <td className="p-2.5 font-bold text-white">Metoprolol / Carvedilol</td>
                    <td className="p-2.5 font-mono">Conforme apresentação</td>
                    <td className="p-2.5 font-mono text-slate-400">—</td>
                    <td className="p-2.5 text-[11px]">Opção se cardiopatia ou taquiarritmia associada.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MEDICAMENTOS PROIBIDOS & MANEJO DE COMPLICAÇÕES */}
      {/* ========================================================================= */}
      {subTab === 'proibidos_complicacoes' && (
        <div className="space-y-6">
          
          {/* MEDICAMENTOS QUE NÃO USAR */}
          <div className="bg-slate-900 border-2 border-red-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-red-900 pb-3">
              <h3 className="text-base sm:text-lg font-black text-red-300 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="text-red-400" /> Medicamentos Contraindicados / Que NÃO Usar na Gestação
              </h3>
              <span className="px-3 py-1 bg-red-950 text-red-200 border border-red-700 rounded-full text-xs font-black">
                Proibidos
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                    <th className="p-2.5">Medicamento</th>
                    <th className="p-2.5 text-red-400">Por Que Evitar / Risco Fetal e Materno</th>
                    <th className="p-2.5 text-emerald-400">Exceção / Quando Pode Ser Usado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-800/40 bg-red-950/20">
                    <td className="p-2.5 font-black text-red-300">IECA e BRA (Enalapril, Losartana, Captopril)</td>
                    <td className="p-2.5"><strong>Teratogênicos clássicos:</strong> Disgenesia/anúria renal fetal, oligoidrâmnio grave (sequência de Potter), hipoplasia pulmonar e óbito.</td>
                    <td className="p-2.5 font-bold text-emerald-400">LIBERADOS no pós-parto e na amamentação, substituindo a metildopa.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-black text-red-300">Atenolol</td>
                    <td className="p-2.5">Associado a <strong>Restrição de Crescimento Fetal (RCF) grave e prematuridade</strong>.</td>
                    <td className="p-2.5 text-slate-400">Preferir metoprolol ou carvedilol se betabloqueador for essencial.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-black text-red-300">Diuréticos de Rotina (Furosemida, Hidroclorotiazida)</td>
                    <td className="p-2.5">Depletam ainda mais a <strong>volemia intravascular materna que já se encontra reduzida</strong> na PE, piorando a perfusão útero-placentária.</td>
                    <td className="p-2.5 font-bold text-emerald-400">Reservados estritamente para EDEMA AGUDO DE PULMÃO (EAP) e congestão franca.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 bg-red-950/25">
                    <td className="p-2.5 font-black text-red-300">Metilergonovina / Ergometrina (Ergotrate)</td>
                    <td className="p-2.5"><strong>Vasoconstritor potente:</strong> pode precipitar crise hipertensiva severa, vasoespasmo coronariano e AVE materno.</td>
                    <td className="p-2.5 font-bold text-red-200">CONTRAINDICADO em HAS/PE/Eclâmpsia. Na atonia uterina, usar <strong>Ocitocina, Misoprostol, Ácido Tranexâmico</strong> ou Carboprost com cautela.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-black text-red-300">Nitroprussiato de Sódio</td>
                    <td className="p-2.5">Risco de <strong>intoxicação fetal por cianeto e acidose metabólica grave</strong>.</td>
                    <td className="p-2.5 text-slate-300">Apenas emergência refratária com risco iminente de AVE, pelo menor tempo possível antes do parto.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-black text-red-300">Fenitoína / Diazepam como 1ª Linha</td>
                    <td className="p-2.5">Comprovadamente <strong>inferiores ao MgSO4</strong> na prevenção de recorrência da convulsão eclâmptica.</td>
                    <td className="p-2.5 text-slate-300">Apenas como resgate secundário se convulsão persistir refratária após MgSO4 adequado.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-black text-red-300">AINEs Antenatais (Antes do Parto)</td>
                    <td className="p-2.5">Risco de <strong>fechamento precoce do ducto arterioso fetal</strong> e oligoidrâmnio.</td>
                    <td className="p-2.5 font-bold text-emerald-400">LIBERADOS na analgesia pós-parto (ibuprofeno é seguro e padrão).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DESTAQUE METILERGONOVINA */}
            <div className="p-4 bg-red-950/60 rounded-2xl border border-red-700 text-xs space-y-1">
              <span className="text-red-300 font-black uppercase flex items-center gap-1.5">
                <AlertCircle size={16} /> Pérola Prática Crítica: Metilergonovina na Hemorragia Pós-Parto (HPP)
              </span>
              <p className="text-slate-200">
                Se uma paciente com Pré-eclâmpsia ou Síndrome HELLP apresentar atonia uterina e hemorragia pós-parto (risco elevado pela plaquetopenia/coagulopatia), <strong>NUNCA PRESCREVA METILERGONOVINA!</strong> Pule direto para <strong>Ocitocina em infusão contínua + Misoprostol retal (800 mcg) + Ácido Tranexâmico 1g EV</strong> e manobras mecânicas (balão de tamponamento/Bakri).
              </p>
            </div>
          </div>

          {/* CONDUTA IMEDIATA EM COMPLICAÇÕES MAIORES */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h4 className="text-sm font-black text-white uppercase flex items-center gap-2">
              <Activity className="text-purple-400" /> Conduta Imediata nas Complicações da SHEG
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-red-400 block font-bold uppercase">Convulsão Recorrente sob MgSO4:</strong>
                <p className="text-slate-300">• Nova dose de ataque: <strong>2 g EV</strong> em 10 minutos.</p>
                <p className="text-slate-300">• Se persistir: solicitar neuroimagem de urgência (excluir AVE / trombose venosa) e associar Benzodiazepínico / Fenitoína.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-red-400 block font-bold uppercase">Edema Agudo de Pulmão (EAP):</strong>
                <p className="text-slate-300">• O2 suplementar sob máscara / VNI + <strong>Furosemida 20 a 40 mg EV</strong>.</p>
                <p className="text-slate-300">• Restrição hídrica estrita e antecipação imediata da resolução da gestação.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-red-400 block font-bold uppercase">CIVD / Coagulopatia Consumptiva:</strong>
                <p className="text-slate-300">• Hemoderivados guiados pelo coagulograma: Plasma Fresco Congelado, Crioprecipitado (se fibrinogênio &lt; 150 mg/dL) e Plaquetas.</p>
                <p className="text-slate-300">• Resolução definitiva: <strong>PARTO IMEDIATO</strong>.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-red-400 block font-bold uppercase">Hematoma Subcapsular / Ruptura Hepática:</strong>
                <p className="text-slate-300">• Estabilização hemodinâmica agressiva com hemoderivados.</p>
                <p className="text-slate-300">• Acionar cirurgia geral/hepatobiliar para laparotomia exploradora ou embolização angiográfica percutânea. <em>Evitar palpação abdominal intempestiva!</em></p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RESOLUÇÃO GESTACIONAL & PÓS-PARTO */}
      {/* ========================================================================= */}
      {subTab === 'resolucao_pos' && (
        <div className="space-y-6">
          
          {/* TIMING DE PARTO POR IDADE GESTACIONAL */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
                <Baby className="text-purple-400" /> Timing de Resolução da Gestação por Condição Clínica
              </h3>
              <span className="text-xs text-purple-300 font-bold">Diretrizes FEBRASCO / ACOG</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase block">1. Hipertensão Gestacional (HAG) Estável</span>
                <p className="text-slate-300 leading-relaxed">
                  Interrupção programada a partir de <strong>38 a 39 semanas</strong>. Se termo precoce assintomático, pode-se aguardar sob vigilância estrita.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-sky-400 uppercase block">2. Pré-Eclâmpsia Sem Sinais de Deterioração</span>
                <p className="text-slate-300 leading-relaxed">
                  Interrupção indicada ao atingir <strong>37 semanas completas</strong>. Conduta conservadora antes de 37 semanas somente com internação e vigilância feto-materna intensiva.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border-2 border-red-800 space-y-2 bg-red-950/20">
                <span className="font-bold text-red-400 uppercase block">3. Pré-Eclâmpsia com Deterioração / Iminência</span>
                <p className="text-slate-300 leading-relaxed">
                  • <strong>≥ 34 semanas:</strong> Resolução da gestação após estabilização materna com MgSO4 e controle da PA.
                  <br/>• <strong>&lt; 34 semanas:</strong> Avaliar viabilidade de ciclo de Corticoterapia (Betametasona 12 mg IM 2 doses com 24h de intervalo) por até 48h <em>apenas se estabilidade materna absoluta</em>. Se deterioração materna grave: <strong>NÃO atrasar o parto esperando completar 48h de corticoide!</strong>
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border-2 border-red-800 space-y-2 bg-red-950/20">
                <span className="font-bold text-red-400 uppercase block">4. Eclâmpsia, Síndrome HELLP ou DPP</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>RESOLUÇÃO IMEDIATA</strong> da gestação após estabilização clínica inicial, <strong>INDEPENDENTE DA IDADE GESTACIONAL</strong>. O parto é a única cura definitiva da toxicidade placentária.
                </p>
              </div>
            </div>

            {/* VIA DE PARTO & ANESTESIA */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="font-black text-slate-300 uppercase block">Via de Parto e Escolha Anestésica</span>
              <p className="text-slate-300">
                • <strong>Via de Parto é de Indicação Obstétrica:</strong> A pré-eclâmpsia ou a iminência de eclâmpsia <strong>NÃO</strong> são indicações obrigatórias de cesariana. O parto vaginal é perfeitamente viável e preferível se o colo for favorável e a vitalidade fetal estiver preservada.
              </p>
              <p className="text-slate-300">
                • <strong>Contagem Plaquetária & Anestesia Neuroaxial (Raqui/Peri):</strong> Sempre checar contagem recente de plaquetas antes do bloqueio neuroaxial. Abaixo de <strong>70.000 a 80.000 / mm³</strong>, o risco de hematoma peridural/raquidiano contraindica a anestesia regional (optar por anestesia geral).
              </p>
            </div>
          </div>

          {/* CONTROVÉRSIA DA DEXAMETASONA EM HELLP */}
          <div className="p-5 bg-fuchsia-950/30 rounded-3xl border border-fuchsia-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-fuchsia-300 font-black uppercase flex items-center gap-1.5">
                <AlertCircle size={16} /> Dexametasona na Síndrome HELLP — O Que Diz a Evidência?
              </strong>
              <span className="px-2 py-0.5 bg-fuchsia-900 text-fuchsia-100 rounded text-[10px] font-bold">
                Revisão Cochrane
              </span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              A <strong>Revisão Sistemática Cochrane</strong> (11 RCTs, 550 mulheres) demonstrou que o uso de altas doses de corticosteroides (Dexametasona 10 mg EV a cada 12h) <strong>NÃO REDUZ MORTALIDADE MATERNA</strong> (RR 0,95) nem morbidade grave combinada ou mortalidade perinatal.
            </p>
            <p className="text-fuchsia-300 font-semibold">
              ⚠️ O único benefício claro é o aumento temporário na contagem de plaquetas no sangue materno. Por isso, é utilizada clinicamente apenas como <em>"bridge"</em> (ponte) para viabilizar anestesia regional ou estabilização pré-parto, e <strong>não como tratamento curativo</strong>.
            </p>
          </div>

          {/* CUIDADOS PÓS-PARTO, AINES & MANEJO VOLÊMICO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* AINES PÓS-PARTO */}
            <div className="p-5 bg-slate-950 rounded-2xl border-2 border-emerald-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-emerald-300 uppercase font-black">Analgesia Pós-Parto: AINEs são Seguros!</strong>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] font-bold">RCTs Recentes</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Estudos recentes (Blue et al. e meta-análise de 6 RCTs) <strong>derrubaram o receio antigo da ACOG 2013</strong>: o uso de <strong>Ibuprofeno</strong> no puerpério não aumenta a pressão arterial nem o consumo de anti-hipertensivos em relação ao paracetamol, mesmo em PE com sinais de deterioração. Proporciona analgesia superior e menor uso de opioides.
              </p>
            </div>

            {/* RESTRIÇÃO HÍDRICA */}
            <div className="p-5 bg-slate-950 rounded-2xl border-2 border-amber-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-amber-300 uppercase font-black">Manejo Volêmico Restritivo</strong>
                <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded text-[10px] font-bold">Prevenção de EAP</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                O manejo de fluidos deve ser <strong>RESTRITIVO (máximo 60 a 80 mL/h de fluidos totais)</strong>. A reposição volêmica vigorosa/expansão de rotina é um erro clássico que desencadeia Edema Agudo de Pulmão no puerpério, quando o líquido do terceiro espaço retorna à circulação central (3º ao 5º dia).
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
