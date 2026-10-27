import React, { useState } from 'react';
import { 
  Calculator, AlertTriangle, CheckCircle2, Info, 
  HelpCircle, RefreshCw, Flame, ShieldAlert, Sparkles, Droplets, Heart, Zap
} from 'lucide-react';

export default function NeuroCalculadoras() {
  const [activeCalc, setActiveCalc] = useState<'calgary' | 'stess' | 'doses_eme' | 'aciclovir'>('calgary');

  // =========================================================================
  // 1. ESCORE DE CALGARY (Sheldon et al., JACC 2002)
  // Separação de síncope vs crise epiléptica
  // Pontuação >= 1 sugere crise epiléptica (Sensibilidade ~94%, Especificidade ~94%)
  // =========================================================================
  const [calgaryAnswers, setCalgaryAnswers] = useState<{ [key: string]: boolean }>({
    corteLingua: false, // +2
    dejaVu: false, // +1
    estresseEmocional: false, // +1
    desvioCabeca: false, // +1
    irresponsividadeAbalos: false, // +1
    confusaoPosIctal: false, // +1
    preSincope: false, // -2
    sudoresePrevia: false, // -2
    posturaOrtostatica: false // -2
  });

  const calcCalgary = () => {
    let score = 0;
    if (calgaryAnswers.corteLingua) score += 2;
    if (calgaryAnswers.dejaVu) score += 1;
    if (calgaryAnswers.estresseEmocional) score += 1;
    if (calgaryAnswers.desvioCabeca) score += 1;
    if (calgaryAnswers.irresponsividadeAbalos) score += 1;
    if (calgaryAnswers.confusaoPosIctal) score += 1;
    if (calgaryAnswers.preSincope) score -= 2;
    if (calgaryAnswers.sudoresePrevia) score -= 2;
    if (calgaryAnswers.posturaOrtostatica) score -= 2;
    return score;
  };

  const calgaryScore = calcCalgary();

  // =========================================================================
  // 2. ESCORE STESS (Status Epilepticus Severity Score - Rossetti et al., 2008)
  // Predição de mortalidade hospitalar no EME
  // =========================================================================
  const [stessConsciousness, setStessConsciousness] = useState<number>(0); // 0: alerta/sonolento, 1: estupor/coma
  const [stessSeizureType, setStessSeizureType] = useState<number>(0); // 0: simples/ausência/mioclônica, 1: convulsivo generalizado, 2: mioclônico pós-anóxico ou sutil
  const [stessAge, setStessAge] = useState<number>(0); // 0: <65 anos, 2: >= 65 anos
  const [stessHistory, setStessHistory] = useState<number>(0); // 0: tem história prévia de crises, 1: sem história prévia

  const totalSTESS = stessConsciousness + stessSeizureType + stessAge + stessHistory;

  // =========================================================================
  // 3. CALCULADORA DE DOSES DO ESTADO DE MAL EPILÉPTICO (ESETT / Glauser 2016)
  // =========================================================================
  const [patientWeightEME, setPatientWeightEME] = useState<number>(70);

  // 1ª Linha: Benzodiazepínicos
  // Diazepam IV: 0,15 a 0,2 mg/kg (máx 10 mg por dose)
  const diazepamDose = Math.min(10, Number((patientWeightEME * 0.15).toFixed(1)));
  // Midazolam IM: 10 mg se > 40 kg, 5 mg se 13-40 kg (RAMPART)
  const midazolamIMDose = patientWeightEME >= 40 ? 10 : patientWeightEME >= 13 ? 5 : Number((patientWeightEME * 0.2).toFixed(1));

  // 2ª Linha: Fármacos IV de ação prolongada (ESETT Kapur 2019)
  // Levetiracetam IV: 60 mg/kg (máx 4.500 mg) infundido em 10 min
  const levetiracetamDose = Math.min(4500, Math.round(patientWeightEME * 60));
  // Fenitoína IV: 20 mg/kg (máx 1.500 mg) infusão máx 50 mg/min (com SF 0,9%)
  const fenitoinaDose = Math.min(1500, Math.round(patientWeightEME * 20));
  const fenitoinaMinInfusionTime = Math.ceil(fenitoinaDose / 50); // minutos mínimos
  // Valproato de Sódio IV: 40 mg/kg (máx 3.000 mg) infundido em 10 min
  const valproatoDose = Math.min(3000, Math.round(patientWeightEME * 40));

  // =========================================================================
  // 4. CALCULADORA DE ACICLOVIR NA ENCEFALITE HERPÉTICA (HSE)
  // 10 mg/kg IV a cada 8 horas com ajuste por Clearance de Creatinina
  // =========================================================================
  const [aciclovirWeight, setAciclovirWeight] = useState<number>(70);
  const [aciclovirCrCl, setAciclovirCrCl] = useState<number>(80); // mL/min

  const getAciclovirRegimen = (weight: number, crcl: number) => {
    const baseDose = Math.round(weight * 10);
    if (crcl > 50) {
      return { dose: baseDose, interval: '8 em 8 horas (3x/dia)', text: 'Dose plena padrão (infundir em 1 hora com hidratação venosa).' };
    } else if (crcl >= 25) {
      return { dose: baseDose, interval: '12 em 12 horas (2x/dia)', text: 'Ajuste renal moderado: mesmo valor em mg, espaçamento para 12/12h.' };
    } else if (crcl >= 10) {
      return { dose: baseDose, interval: '24 em 24 horas (1x/dia)', text: 'Ajuste renal grave: espaçamento para 24/24h pelo risco de neuro/nefrotoxicidade.' };
    } else {
      return { dose: Math.round(baseDose * 0.5), interval: '24 em 24 horas (pós-hemodiálise)', text: 'Falência renal / diálise: 5 mg/kg 1x/dia, administrada após a sessão de hemodiálise.' };
    }
  };

  const aciclovirResult = getAciclovirRegimen(aciclovirWeight, aciclovirCrCl);

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveCalc('calgary')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'calgary'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle size={15} />
          <span>Escore de Calgary (Síncope vs Crise)</span>
        </button>

        <button
          onClick={() => setActiveCalc('doses_eme')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'doses_eme'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Zap size={15} />
          <span>Doses de Emergência no EME (ESETT)</span>
        </button>

        <button
          onClick={() => setActiveCalc('stess')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'stess'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calculator size={15} />
          <span>Escore STESS (Gravidade no EME)</span>
        </button>

        <button
          onClick={() => setActiveCalc('aciclovir')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'aciclovir'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Droplets size={15} />
          <span>Dose de Aciclovir IV & Ajuste Renal</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* 1. ESCORE DE CALGARY */}
      {/* =================================================================== */}
      {activeCalc === 'calgary' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Sheldon et al., J Am Coll Cardiol 2002 · Validação Internacional
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                  <HelpCircle className="text-purple-400" size={22} />
                  Escore de Calgary: Síncope Convulsiva vs Crise Epiléptica
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Escore baseado estritamente em dados da história clínica e anamnese com testemunha. 
                  Pontuação <strong>&ge; 1 ponto sugere fortemente crise epiléptica</strong> (sensibilidade e especificidade de ~94%). Pontuação &le; 0 sugere síncope.
                </p>
              </div>

              {/* Result Pill */}
              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                calgaryScore >= 1 
                  ? 'bg-purple-950/40 border-purple-800 text-purple-200' 
                  : 'bg-cyan-950/40 border-cyan-800 text-cyan-200'
              }`}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Pontuação Calgary</span>
                  <span className="text-3xl font-black font-mono tabular-nums">{calgaryScore > 0 ? `+${calgaryScore}` : calgaryScore}</span>
                </div>
                <div className="border-l border-slate-700/60 pl-4">
                  <span className="text-xs font-black uppercase block">
                    {calgaryScore >= 1 ? 'PROVÁVEL CRISE EPILÉPTICA' : 'PROVÁVEL SÍNCOPE'}
                  </span>
                  <p className="text-[11px] text-slate-300 max-w-xs leading-tight mt-0.5">
                    {calgaryScore >= 1 
                      ? 'Investigar com EEG, RM e considerar risco de recorrência para início de fármaco anticrise.' 
                      : 'Investigar causas cardiovasculares e neuromediadas (ECG, Holter, Tilt-test). Não iniciar anticrise!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Questions Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
              {[
                { id: 'corteLingua', label: '1. Acorda com corte/mordedura na língua após o episódio?', pts: '+2 pontos', epil: true },
                { id: 'dejaVu', label: '2. Teve sensação de déjà vu ou jamais vu antes do episódio?', pts: '+1 ponto', epil: true },
                { id: 'estresseEmocional', label: '3. Houve estresse emocional associado à perda de consciência?', pts: '+1 ponto', epil: true },
                { id: 'desvioCabeca', label: '4. Alguém notou desvio da cabeça para um lado durante a crise?', pts: '+1 ponto', epil: true },
                { id: 'irresponsividadeAbalos', label: '5. Houve irresponsividade, postura anormal, abalos rítmicos ou amnésia?', pts: '+1 ponto', epil: true },
                { id: 'confusaoPosIctal', label: '6. Alguém notou confusão mental prolongada após o episódio?', pts: '+1 ponto', epil: true },
                { id: 'preSincope', label: '7. Já teve episódios de pré-síncope (tontura, sensação de desmaio)?', pts: '-2 pontos', epil: false },
                { id: 'sudoresePrevia', label: '8. Apresentou sudorese fria, palidez ou calor antes do episódio?', pts: '-2 pontos', epil: false },
                { id: 'posturaOrtostatica', label: '9. Ficar muito tempo em pé ou sentado desencadeou o episódio?', pts: '-2 pontos', epil: false },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    calgaryAnswers[item.id]
                      ? item.epil
                        ? 'border-purple-500 bg-purple-950/30 text-white'
                        : 'border-cyan-500 bg-cyan-950/30 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 pr-2">
                    <span className="font-medium text-xs block">{item.label}</span>
                    <span className={`text-[10px] font-mono font-bold ${item.epil ? 'text-purple-400' : 'text-cyan-400'}`}>
                      {item.pts}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={calgaryAnswers[item.id] || false}
                    onChange={(e) => setCalgaryAnswers({ ...calgaryAnswers, [item.id]: e.target.checked })}
                    className="rounded accent-purple-500 shrink-0"
                  />
                </label>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs text-slate-300 space-y-1">
              <strong className="text-amber-300 flex items-center gap-1.5">
                <AlertTriangle size={15} /> Alerta de Segurança Cardíaca
              </strong>
              <p>
                Qualquer perda transitória de consciência durante esforço físico ou em decúbito, precedida de palpitações ou em paciente com ECG alterado (QT longo, Brugada, bloqueios) deve ser considerada <strong>síncope cardíaca potencialmente letal</strong> até prova em contrário, mesmo que haja abalos mioclônicos observados ("síncope convulsiva").
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. DOSES DE EMERGÊNCIA NO EME */}
      {/* =================================================================== */}
      {activeCalc === 'doses_eme' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Protocolo Glauser (AES 2016) & Ensaio ESETT (Kapur et al., NEJM 2019)
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                  <Zap className="text-rose-400" size={22} />
                  Calculadora de Doses do Estado de Mal Epiléptico (Adulto & Pediátrico)
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Insira o peso do paciente para calcular as doses exatas de 1ª e 2ª linha recomendadas pelas diretrizes internacionais.
                </p>
              </div>

              {/* Weight Input Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <label className="text-xs font-bold text-slate-300">Peso do Paciente:</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={5}
                    max={150}
                    value={patientWeightEME}
                    onChange={(e) => setPatientWeightEME(Math.max(1, Number(e.target.value)))}
                    className="w-20 p-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-center text-lg font-bold"
                  />
                  <span className="text-xs font-mono text-slate-400">kg</span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              {/* 1ª Linha */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-black uppercase text-rose-400">1ª Linha: Benzodiazepínicos (5 a 20 min)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-200">Dose Plena</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-white text-xs">Diazepam IV</strong>
                      <span className="text-base font-mono font-bold text-rose-400">{diazepamDose} mg IV</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      0,15 a 0,2 mg/kg (máx 10 mg por dose). Fazer em bolus lento. Pode repetir 1x após 5 min se crise persistir.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-white text-xs">Midazolam IM (se sem acesso IV)</strong>
                      <span className="text-base font-mono font-bold text-amber-400">{midazolamIMDose} mg IM</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Estudo RAMPART: 10 mg IM se &gt; 40 kg (5 mg se 13–40 kg). Tão bom ou superior ao lorazepam IV pela rapidez de aplicação.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2ª Linha */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-black uppercase text-cyan-400">2ª Linha: Ação Prolongada (20 a 40 min)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-200">ESETT (Eficácia ~46%)</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-white text-xs">Levetiracetam IV (Keppra)</strong>
                      <span className="text-base font-mono font-bold text-emerald-400">{levetiracetamDose} mg IV</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      60 mg/kg (máx 4.500 mg). Diluir em 100 mL de SF e infundir em 10 minutos. Sem interações hepáticas.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-white text-xs">Fenitoína IV (Hidantal)</strong>
                      <span className="text-base font-mono font-bold text-cyan-400">{fenitoinaDose} mg IV</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      20 mg/kg (máx 1.500 mg). <strong>Tempo mínimo de infusão: {fenitoinaMinInfusionTime} min</strong> (máximo 50 mg/min, SEMPRE com soro fisiológico, risco de arritmia e hipotensão).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-white text-xs">Valproato de Sódio IV</strong>
                      <span className="text-base font-mono font-bold text-purple-400">{valproatoDose} mg IV</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      40 mg/kg (máx 3.000 mg) infundido em 10 minutos. Evitar se hepatopatia, gestação ou suspeita de mitocondriopatia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              <strong className="text-white block mb-1">Aviso sobre o Erro mais Comum no EME: Subdose de Benzodiazepínico</strong>
              No estudo ESETT, mais da metade dos pacientes recebeu doses insuficientes de diazepam (2 a 5 mg) por medo de depressão respiratória. O estado de mal não tratado deprime o centro respiratório muito mais do que a dose correta de benzodiazepínico. Administre a dose cheia precoce!
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. ESCORE STESS */}
      {/* =================================================================== */}
      {activeCalc === 'stess' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Status Epilepticus Severity Score · Rossetti et al., J Neurol 2008
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                  <Calculator className="text-amber-400" size={22} />
                  Escore STESS: Estratificação Prognóstica no EME
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Avalia consciência, tipo de crise, idade e história de epilepsia prévia. 
                  Pontuação <strong>&le; 2 tem valor preditivo negativo de 97% para óbito hospitalar</strong> (excelente prognóstico). Escores &ge; 3 indicam alto risco de desfecho desfavorável.
                </p>
              </div>

              {/* Result Pill */}
              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                totalSTESS <= 2 
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' 
                  : 'bg-rose-950/40 border-rose-800 text-rose-200'
              }`}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Pontuação STESS</span>
                  <span className="text-3xl font-black font-mono tabular-nums">{totalSTESS}</span>
                  <span className="text-xs text-slate-400 ml-1">/ 6</span>
                </div>
                <div className="border-l border-slate-700/60 pl-4">
                  <span className="text-xs font-black uppercase block">
                    {totalSTESS <= 2 ? 'FAVORÁVEL (STESS &le; 2)' : 'ALTO RISCO (STESS &ge; 3)'}
                  </span>
                  <p className="text-[11px] text-slate-300 max-w-xs leading-tight mt-0.5">
                    {totalSTESS <= 2 
                      ? 'Baixa mortalidade hospitalar (~3%). Provável boa resposta à 1ª e 2ª linha.' 
                      : 'Mortalidade elevada (>35%). Alto risco de refratariedade e necessidade de UTI/IOT.'}
                  </p>
                </div>
              </div>
            </div>

            {/* STESS Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 block uppercase text-[11px]">1. Nível de Consciência (Pior estado antes do tratamento)</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_c" checked={stessConsciousness === 0} onChange={() => setStessConsciousness(0)} className="accent-amber-500" />
                    <span>Alerta ou Sonolento (0 pontos)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_c" checked={stessConsciousness === 1} onChange={() => setStessConsciousness(1)} className="accent-amber-500" />
                    <span>Estupor ou Coma profundo (1 ponto)</span>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 block uppercase text-[11px]">2. Pior Tipo de Crise</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_s" checked={stessSeizureType === 0} onChange={() => setStessSeizureType(0)} className="accent-amber-500" />
                    <span>Focal motora / Ausência / Mioclônica (0 pontos)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_s" checked={stessSeizureType === 1} onChange={() => setStessSeizureType(1)} className="accent-amber-500" />
                    <span>Convulsiva Generalizada (1 ponto)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_s" checked={stessSeizureType === 2} onChange={() => setStessSeizureType(2)} className="accent-amber-500" />
                    <span>Não-convulsivo em coma / Mioclônico pós-anóxico (2 pontos)</span>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 block uppercase text-[11px]">3. Idade</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_a" checked={stessAge === 0} onChange={() => setStessAge(0)} className="accent-amber-500" />
                    <span>&lt; 65 anos (0 pontos)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_a" checked={stessAge === 2} onChange={() => setStessAge(2)} className="accent-amber-500" />
                    <span>&ge; 65 anos (2 pontos)</span>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 block uppercase text-[11px]">4. História Prévia de Crises</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_h" checked={stessHistory === 0} onChange={() => setStessHistory(0)} className="accent-amber-500" />
                    <span>Epilepsia conhecida prévia / crises anteriores (0 pontos)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stess_h" checked={stessHistory === 1} onChange={() => setStessHistory(1)} className="accent-amber-500" />
                    <span>Primeiro episódio / sem história prévia (1 ponto)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. DOSE DE ACICLOVIR NA HSE */}
      {/* =================================================================== */}
      {activeCalc === 'aciclovir' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                Diretrizes IDSA (Tunkel 2008) & Diretriz Britânica (Solomon 2012)
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                <Droplets className="text-cyan-400" size={22} />
                Calculadora de Dose de Aciclovir IV e Ajuste Renal
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                A dose padrão no adulto é de <strong>10 mg/kg IV de 8 em 8 horas</strong> por 14 a 21 dias. O aciclovir precipita nos túbulos renais; o ajuste pelo clearance de creatinina previne lesão renal aguda e neurotoxicidade por acúmulo da droga.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Peso do Paciente (kg)</label>
                <input
                  type="number"
                  min={30}
                  max={180}
                  value={aciclovirWeight}
                  onChange={(e) => setAciclovirWeight(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg font-bold"
                />
                <span className="text-[10px] text-slate-500">Em obesos, utilizar peso ideal ou ajustado para evitar nefrotoxicidade.</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Clearance de Creatinina Estimado (mL/min)</label>
                <input
                  type="number"
                  min={5}
                  max={150}
                  value={aciclovirCrCl}
                  onChange={(e) => setAciclovirCrCl(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg font-bold"
                />
                <div className="flex gap-2">
                  {[80, 40, 20, 8].map(cl => (
                    <button
                      key={cl}
                      onClick={() => setAciclovirCrCl(cl)}
                      className={`text-[10px] font-mono py-1 px-2 rounded border ${
                        aciclovirCrCl === cl ? 'border-cyan-500 bg-cyan-950 text-cyan-200' : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {cl > 50 ? '>50' : cl >= 25 ? '25-50' : cl >= 10 ? '10-25' : '<10'} mL/min
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Prescribed Regimen Output */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/50 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                Prescrição Recomendada de Aciclovir IV:
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span className="text-3xl font-black text-white font-mono">{aciclovirResult.dose} mg IV</span>
                <span className="text-lg font-bold text-cyan-300">{aciclovirResult.interval}</span>
              </div>
              <p className="text-xs text-slate-300">{aciclovirResult.text}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase text-[11px]">
                <AlertTriangle size={15} /> Cuidados Práticos de Infusão
              </span>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
                <li><strong>Tempo de Infusão:</strong> NUNCA fazer em bolus rápido! Infundir diluído em 100 a 250 mL de SF 0,9% ao longo de <strong>pelo menos 1 hora</strong>.</li>
                <li><strong>Hidratação Concomitante:</strong> Manter hidratação vigorosa com cristaloides para garantir alto fluxo urinário e evitar cristalização nos túbulos.</li>
                <li><strong>Monitoramento:</strong> Dosar creatinina e ureia a cada 48 a 72 horas. Se o paciente piorar da confusão com função renal em deterioração, suspeitar de neurotoxicidade por aciclovir.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
