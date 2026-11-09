import React, { useState } from 'react';
import { 
  Calculator, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  HeartPulse, 
  TestTube,
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';

export default function ToxicologyCalculators() {
  // Osmolar Gap State
  const [measuredOsm, setMeasuredOsm] = useState<number>(310);
  const [na, setNa] = useState<number>(140);
  const [glucose, setGlucose] = useState<number>(100);
  const [urea, setUrea] = useState<number>(30);
  const [ethanol, setEthanol] = useState<number>(0);

  // Calculated Osmolality = 2*Na + Gli/18 + Ureia/6 + Etanol/4.6
  const calculatedOsm = Math.round((2 * na) + (glucose / 18) + (urea / 6) + (ethanol / 4.6));
  const osmolarGap = Math.round(measuredOsm - calculatedOsm);
  const isHighOsmolarGap = osmolarGap > 10;

  // QTc State
  const [qtInterval, setQtInterval] = useState<number>(440); // ms
  const [heartRate, setHeartRate] = useState<number>(75); // bpm
  const rrIntervalSec = 60 / (heartRate || 60);
  const qtcBazett = Math.round(qtInterval / Math.sqrt(rrIntervalSec));
  const qtcFridericia = Math.round(qtInterval / Math.cbrt(rrIntervalSec));
  const isProlongedQtc = qtcBazett > 500;

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-400 mb-1">
          <Calculator className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Calculadoras & Decisores Toxicológicos</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Ferramentas Clínicas de Emergência Toxicológica
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Hiato Osmolar para álcoois tóxicos, intervalo QTc de risco para arritmias e critérios mnemônicos internacionais de intervenção (SLIME & ABCD).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. CALCULADORA DO HIATO OSMOLAR (OSMOLAR GAP) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-black text-white flex items-center gap-1.5 uppercase">
                <TestTube className="w-4 h-4 text-sky-400" />
                Hiato Osmolar (Osmolar Gap)
              </span>
              <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                Metanol / Etilenoglicol
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Diferença entre a osmolalidade sérica medida em laboratório (crioscopia) e a calculada. Valores &gt; 10 mOsm/kg indicam presença de solutos exógenos osmoticamente ativos não mensurados.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Osmolalidade Medida</label>
                <input
                  type="number"
                  value={measuredOsm}
                  onChange={e => setMeasuredOsm(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Sódio (Na+) mEq/L</label>
                <input
                  type="number"
                  value={na}
                  onChange={e => setNa(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Glicemia mg/dL</label>
                <input
                  type="number"
                  value={glucose}
                  onChange={e => setGlucose(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Ureia mg/dL</label>
                <input
                  type="number"
                  value={urea}
                  onChange={e => setUrea(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Etanolemia mg/dL (se dosada)</label>
                <input
                  type="number"
                  value={ethanol}
                  onChange={e => setEthanol(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                  placeholder="0 se não disponível"
                />
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className={`p-4 rounded-xl border ${
            isHighOsmolarGap 
              ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
              : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
          }`}>
            <div className="flex items-center justify-between font-mono mb-1">
              <span className="text-xs font-bold">Hiato Osmolar Calculado:</span>
              <span className="text-lg font-black">{osmolarGap} mOsm/kg</span>
            </div>
            <div className="text-[11px] leading-tight opacity-90">
              {isHighOsmolarGap ? (
                <span>
                  🚨 <strong>HIATO ELEVADO (&gt; 10 mOsm/kg)</strong>: Altamente sugestivo de ingestão de <strong>Metanol</strong> (adulterantes de cachaça/solvente) ou <strong>Etilenoglicol</strong> (aditivo de radiador). Investigar acidose metabólica com ânion-gap aumentado e iniciar Fomepizol ou Etanol EV + Hemodiálise de urgência!
                </span>
              ) : (
                <span>
                  ✅ <strong>HIATO NORMAL (≤ 10 mOsm/kg)</strong>: Sem evidência de álcoois tóxicos voláteis de alto peso molecular não mensurados no momento.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2. INTERVALO QTc & RISCO DE TORSADES */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-black text-white flex items-center gap-1.5 uppercase">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                Intervalo QTc (Bazett & Fridericia)
              </span>
              <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                Cardiotoxicidade
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Correção do intervalo QT pela frequência cardíaca. Essencial em intoxicações por Tricíclicos, Metadona, Escitalopram, Quetiapina, Fluconazol e Lítio.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Intervalo QT Medido (ms)</label>
                <input
                  type="number"
                  value={qtInterval}
                  onChange={e => setQtInterval(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Frequência Cardíaca (bpm)</label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={e => setHeartRate(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className={`p-4 rounded-xl border ${
            isProlongedQtc 
              ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
              : qtcBazett > 460 
                ? 'bg-amber-950/40 border-amber-800 text-amber-200' 
                : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
          }`}>
            <div className="flex items-center justify-between font-mono mb-1">
              <span className="text-xs font-bold">Bazett: {qtcBazett} ms</span>
              <span className="text-xs text-slate-400">Fridericia: {qtcFridericia} ms</span>
            </div>
            <div className="text-[11px] leading-tight opacity-90">
              {isProlongedQtc ? (
                <span>
                  🚨 <strong>QTc &gt; 500 ms (RISCO CRÍTICO DE TORSADES DE POINTES)</strong>: Risco iminente de taquicardia ventricular polimórfica e parada cardiorrespiratória. Conduta: <strong>Sulfato de Magnésio 2g EV em 15 minutos</strong>, suspender todos os fármacos que alargam QT e repor Potássio para &gt; 4.5 mEq/L!
                </span>
              ) : qtcBazett > 460 ? (
                <span>
                  ⚠️ <strong>QTc LIMÍTROFE / PROLONGADO</strong>: Monitorização contínua com telemetria no leito e correção agressiva de K+, Mg2+ e Ca2+.
                </span>
              ) : (
                <span>
                  ✅ <strong>QTc NORMAL (&lt; 440-460 ms)</strong>: Baixo risco eletrocardiográfico de arritmias ventriculares dependentes de repolarização.
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* PROTOCOL DECISION MNEMONICS (SLIME & ABCD) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* MNEMÔNICO SLIME (HEMODIÁLISE) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-black text-rose-400 flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4" />
              Mnemônico "SLIME" (Indicações de Hemodiálise de Emergência)
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Drogas com baixo peso molecular, baixo volume de distribuição (&lt; 1 L/kg) e baixa ligação a proteínas que são efetivamente dialisáveis:
          </p>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-rose-300">S - Salicilatos (AAS)</span>
              <span className="text-[10px] text-slate-400 font-sans">Nível &gt; 90-100 mg/dL ou acidose grave</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-rose-300">L - Lítio (Carbonato de Lítio)</span>
              <span className="text-[10px] text-slate-400 font-sans">Litemia &gt; 4 mEq/L ou &gt; 2.5 com IRA/coma</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-rose-300">I - Isopropanol</span>
              <span className="text-[10px] text-slate-400 font-sans">Álcool de limpeza com cetose sem acidose</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-rose-300">M - Metanol</span>
              <span className="text-[10px] text-slate-400 font-sans">Acidose metabólica severa ou neurite óptica</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-rose-300">E - Etilenoglicol</span>
              <span className="text-[10px] text-slate-400 font-sans">Cristais de oxalato de cálcio na urina e IRA</span>
            </div>
          </div>
        </div>

        {/* MNEMÔNICO ABCD (CARVÃO EM DOSES MÚLTIPLAS) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4" />
              Mnemônico "ABCD" (Carvão Ativado em Doses Múltiplas)
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Drogas com recirculação entero-hepática ou entero-gástrica onde a diálise gastrointestinal com doses repetidas de carvão (50g 4/4h) acelera a depuração:
          </p>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-emerald-300">A - Aminofilina / Teofilina</span>
              <span className="text-[10px] text-slate-400 font-sans">Intoxicação broncodilatadora grave</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-emerald-300">B - Barbitúricos (Fenobarbital)</span>
              <span className="text-[10px] text-slate-400 font-sans">Reduz a meia-vida do fenobarbital em 50%</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-emerald-300">C - Carbamazepina</span>
              <span className="text-[10px] text-slate-400 font-sans">Farmacocinética imprevisível com bezoar</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-emerald-300">D - Dapsona</span>
              <span className="text-[10px] text-slate-400 font-sans">Previne metemoglobinemia refratária</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-emerald-300">+ Digoxina / Quinidina</span>
              <span className="text-[10px] text-slate-400 font-sans">Glicosídeos com circulação entero-biliar</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
