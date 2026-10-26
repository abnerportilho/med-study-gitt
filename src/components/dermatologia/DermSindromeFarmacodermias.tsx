import React, { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, Calculator, Heart, 
  Stethoscope, Pill, CheckCircle2, Info, Eye
} from 'lucide-react';

export default function DermSindromeFarmacodermias() {
  const [activeTab, setActiveTab] = useState<'redflags' | 'ssj_net' | 'dress_pega' | 'scorten'>('redflags');

  // SCORTEN State
  const [scortenAge, setScortenAge] = useState<boolean>(false); // >= 40 anos
  const [scortenMalignancy, setScortenMalignancy] = useState<boolean>(false);
  const [scortenBSA, setScortenBSA] = useState<boolean>(false); // > 10% SC descolada
  const [scortenHR, setScortenHR] = useState<boolean>(false); // >= 120 bpm
  const [scortenBUN, setScortenBUN] = useState<boolean>(false); // Ureia > 28 mg/dL (10 mmol/L)
  const [scortenGlucose, setScortenGlucose] = useState<boolean>(false); // Glicose > 252 mg/dL (14 mmol/L)
  const [scortenBicarbonate, setScortenBicarbonate] = useState<boolean>(false); // Bicarbonato < 20 mEq/L

  const calcScorten = () => {
    let score = 0;
    if (scortenAge) score += 1;
    if (scortenMalignancy) score += 1;
    if (scortenBSA) score += 1;
    if (scortenHR) score += 1;
    if (scortenBUN) score += 1;
    if (scortenGlucose) score += 1;
    if (scortenBicarbonate) score += 1;
    return score;
  };

  const scortenTotal = calcScorten();

  const getScortenMortality = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return { rate: '3,2%', risk: 'Baixo Risco', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800' };
      case 2:
        return { rate: '12,1%', risk: 'Risco Moderado', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800' };
      case 3:
        return { rate: '35,3%', risk: 'Alto Risco', color: 'text-orange-400', bg: 'bg-orange-950/40 border-orange-800' };
      case 4:
        return { rate: '58,3%', risk: 'Risco Muito Alto', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800' };
      default:
        return { rate: '≈ 90,0%', risk: 'Risco Crítico / Extremo', color: 'text-red-400', bg: 'bg-red-950/60 border-red-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'redflags', label: 'Sinais de Alerta (Red Flags)', badge: 'Critérios de Emergência' },
          { id: 'ssj_net', label: 'SSJ & NET (Síndrome de Lyell)', badge: 'Descolamento Epidérmico' },
          { id: 'dress_pega', label: 'DRESS & PEGA', badge: 'Eosinofilia vs Pústulas' },
          { id: 'scorten', label: 'Calculadora SCORTEN', badge: 'Escore Prognóstico NET' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{t.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeTab === t.id ? 'bg-red-700/60 text-red-100' : 'bg-slate-800 text-slate-400'}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. SINAIS DE ALERTA (RED FLAGS) */}
      {/* =================================================================== */}
      {activeTab === 'redflags' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Emergências Dermatológicas · Reconhecimento Imediato
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Sinais de Gravidade nas Farmacodermias (Red Flags)
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              O exantema máculo-papular simples responde por mais de 90% das reações cutâneas a drogas. No entanto, a presença de qualquer um dos <strong>sinais de alarme</strong> abaixo indica uma <strong>Farmacodermia Grave (SCAR)</strong> com risco iminente de óbito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                <AlertTriangle size={15} /> 1. Dor Cutânea Espontânea Intensa
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Paciente refere que <strong>"a pele inteira queima e dói como brasa"</strong> ao menor toque de roupas ou lençóis. Precede o descolamento epidérmico e a necrose na SSJ/NET.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                <AlertTriangle size={15} /> 2. Acometimento de Mucosas (&ge; 2 sítios)
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Presença de erosões dolorosas, queilite hemorrágica na boca, hiperemia conjuntival (risco de cegueira e sinéquias) ou lesões urogenitais e retais.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                <AlertTriangle size={15} /> 3. Sinal de Nikolsky Positivo
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Descolamento tangencial da epiderme com deslizamento em "luva" ou "meia", deixando áreas cruentas exsudativas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                <AlertTriangle size={15} /> 4. Febre Alta (&gt; 38,5ºC) & Toxemia
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                A febre alta associada a prostração indica tempestade inflamatória sistêmica presente na NET, no DRESS e na PEGA.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                <AlertTriangle size={15} /> 5. Edema Facial & Linfadenopatia
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Edema facial exuberante associado a múltiplos linfonodos palpáveis e dolorosos é a marca registrada da síndrome DRESS.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                <AlertTriangle size={15} /> 6. Eosinofilia Severa & Disfunção Orgânica
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Eosinófilos &gt; 1.500/mm³, transaminases hepáticas elevadas (&gt; 3x o normal), creatinina elevada ou proteinúria.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. SSJ & NET */}
      {/* =================================================================== */}
      {activeTab === 'ssj_net' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                Necrólise Epidérmica · Espectro da Apoptose Maciça
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Síndrome de Stevens-Johnson (SSJ) e Necrólise Epidérmica Tóxica (NET)
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Apoptose fulminante mediada por linfócitos T citotóxicos antígeno-específicos, ligante Fas-FasL e <strong>Granulisina</strong>. Apresenta perda da barreira epidérmica análoga a uma <strong>queimadura de 2º grau extensa</strong>.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300">
                Droga Culpada: 1 a 3 semanas
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs font-bold text-rose-300">
                Nikolsky POSITIVO
              </div>
            </div>
          </div>

          {/* Classification Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300 uppercase text-[11px] block">1. Stevens-Johnson (SSJ)</span>
              <p className="text-slate-300 font-mono text-sm font-bold">&lt; 10% da Superfície Corporal Descolada</p>
              <p className="text-slate-400 text-[11px]">Acometimento de mucosas grave (&ge; 2 sítios) associado a máculas purpúricas atípicas em alvo.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-orange-400 uppercase text-[11px] block">2. Sobreposição SSJ / NET</span>
              <p className="text-slate-300 font-mono text-sm font-bold">10% a 30% da Superfície Corporal Descolada</p>
              <p className="text-slate-400 text-[11px]">Progressão rápida com descolamento confluente e formação de grandes lençóis de epiderme descolada.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-rose-400 uppercase text-[11px] block">3. Necrólise Epidérmica Tóxica (NET / Lyell)</span>
              <p className="text-slate-300 font-mono text-sm font-bold">&gt; 30% da Superfície Corporal Descolada</p>
              <p className="text-slate-400 text-[11px]">Grave risco de sepse bacteriana e choque. Mortalidade que pode ultrapassar 50%.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">Drogas Culpadas de Alto Risco</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>Alopurinol</strong> (especialmente em portadores do alelo HLA-B*58:01)</li>
                <li>• <strong>Anticonvulsivantes aromáticos</strong> (Carbamazepina [HLA-B*15:02], Fenitoína, Fenobarbital, Lamotrigina)</li>
                <li>• <strong>Sulfonamidas</strong> antibacterianas (Sulfametoxazol-Trimetoprima)</li>
                <li>• <strong>Anti-inflamatórios não-esteroidais oxicans</strong> (Piroxicam, Tenoxicam, Meloxicam)</li>
                <li>• <strong>Nevirapina</strong> (antirretroviral)</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-emerald-300 block">Manejo Hospitalar & Protocolo de Suporte</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>Transferência Imediata para UTI ou Unidade de Queimados</strong> com temperatura ambiente aquecida (30–32ºC) para evitar hipotermia.</li>
                <li>• <strong>Suspensão imediata de TODAS as medicações não-essenciais.</strong></li>
                <li>• Reposição volêmica guiada por débito urinário (&ge; 0,5 mL/kg/h).</li>
                <li>• <strong>Avaliação Oftalmológica Diária de Urgência:</strong> Limpeza mecânica suave de sinéquias conjuntivais para prevenir ceratinização e cegueira permanente.</li>
                <li>• <strong>Terapias Específicas:</strong> Ciclosporina (3 a 5 mg/kg/dia por 7 a 10 dias) ou Imunoglobulina Humana IV (IVIG 2 g/kg).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. DRESS & PEGA */}
      {/* =================================================================== */}
      {activeTab === 'dress_pega' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Reações Graves com Comprometimento Hematológico e Folicular
            </span>
            <h2 className="text-2xl font-black text-white">DRESS vs PEGA</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* DRESS */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-amber-300">Síndrome DRESS</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-800">
                  Latência Longa (2 a 8 semanas)
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <em>Drug Reaction with Eosinophilia and Systemic Symptoms</em> (ou DIHS). Caracterizada por reativação sequencial de herpesvírus humanos (especialmente <strong>HHV-6</strong>).
              </p>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li>• <strong>Tríade Clássica:</strong> Febre alta prolongada + Exantema morbiliforme confluente com <strong>edema facial marcado</strong> + Linfadenopatia em &ge; 2 cadeias.</li>
                <li>• <strong>Laboratório:</strong> Eosinofilia marcada (&gt; 1.500/mm³ ou &gt; 10%) e linfócitos atípicos.</li>
                <li>• <strong>Órgão mais acometido:</strong> <strong>Fígado (hepatite com elevação de transaminases em 80% dos casos)</strong>, nefrite intersticial e miocardite.</li>
                <li>• <strong>Tratamento:</strong> Corticoterapia sistêmica (Prednisona 1 mg/kg/dia) com <strong>desmame muito lento ao longo de 2 a 3 meses</strong> para prevenir recidiva das lesões.</li>
              </ul>
            </div>

            {/* PEGA */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-cyan-300">PEGA (Pustulose Exantemática Generalizada Aguda)</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-200 border border-cyan-800">
                  Latência Ultracurta (&lt; 48 horas)
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Erupção pustulosa aguda desencadeada tipicamente por <strong>antibióticos (Beta-lactâmicos, Macrolídeos e Quinolonas)</strong> menos de 48h após a primeira dose.
              </p>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li>• <strong>Clínica Típica:</strong> Febre súbita acompanhada de <strong>centenas de pústulas estéreis e não-foliculares</strong> (&lt; 5 mm) que surgem sobre base eritematosa viva, iniciando nas dobras (pescoço, axilas, virilhas) e tronco.</li>
                <li>• <strong>Laboratório:</strong> <strong>Leucocitose neutrofílica exuberante</strong> (neutrófilos &gt; 7.000/mm³).</li>
                <li>• <strong>Prognóstico:</strong> Benigno e autolimitado. As pústulas coalescem e descamam espontaneamente em 7 a 14 dias após a suspensão do antibiótico causal.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. SCORTEN CALCULATOR */}
      {/* =================================================================== */}
      {activeTab === 'scorten' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Calculator className="text-rose-400" size={22} />
                  Calculadora do Escore Prognóstico SCORTEN (para SSJ / NET)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Estratificação de mortalidade hospitalar validada internacionalmente para avaliação nas primeiras 24 a 48 horas de internação.
                </p>
              </div>

              {/* Mortality Result */}
              <div className={`p-4 rounded-2xl border ${getScortenMortality(scortenTotal).bg} flex items-center gap-4`}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Pontos SCORTEN</span>
                  <span className="text-3xl font-black text-white font-mono tabular-nums">{scortenTotal}</span>
                  <span className="text-xs text-slate-400 ml-1">/ 7</span>
                </div>
                <div className="border-l border-slate-700/60 pl-4">
                  <span className={`text-xs font-black uppercase ${getScortenMortality(scortenTotal).color}`}>
                    Mortalidade Estimada: {getScortenMortality(scortenTotal).rate}
                  </span>
                  <p className="text-[11px] text-slate-300 font-bold mt-0.5">
                    {getScortenMortality(scortenTotal).risk}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
              {[
                { label: '1. Idade &ge; 40 anos', state: scortenAge, set: setScortenAge, desc: 'Idosos e meia-idade apresentam menor reserva imunológica.' },
                { label: '2. Presença de Neoplasia Maligna Ativa', state: scortenMalignancy, set: setScortenMalignancy, desc: 'Histórico de câncer sólido ou hematológico ativo.' },
                { label: '3. Superfície Corporal Descolada &gt; 10%', state: scortenBSA, set: setScortenBSA, desc: 'Descolamento epidérmico ativo nas primeiras 24h.' },
                { label: '4. Frequência Cardíaca &ge; 120 bpm', state: scortenHR, set: setScortenHR, desc: 'Taquicardia reflete resposta inflamatória sistêmica ou hipovolemia.' },
                { label: '5. Ureia Sérica &gt; 28 mg/dL (BUN &gt; 10 mmol/L)', state: scortenBUN, set: setScortenBUN, desc: 'Indica azotemia prérrenal por desidratação ou lesão renal aguda.' },
                { label: '6. Glicemia Sérica &gt; 252 mg/dL (&gt; 14 mmol/L)', state: scortenGlucose, set: setScortenGlucose, desc: 'Estresse catabólico extremo e resistência insulínica.' },
                { label: '7. Bicarbonato Sérico &lt; 20 mEq/L', state: scortenBicarbonate, set: setScortenBicarbonate, desc: 'Acidose metabólica por hipoperfusão tecidual.' },
              ].map((item, idx) => (
                <label
                  key={idx}
                  className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    item.state
                      ? 'border-rose-500 bg-rose-950/40 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 pr-2">
                    <span className="font-bold text-xs block text-slate-200">{item.label}</span>
                    <span className="text-[11px] text-slate-500 block">{item.desc}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={(e) => item.set(e.target.checked)}
                    className="rounded accent-rose-500 mt-1 shrink-0"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
