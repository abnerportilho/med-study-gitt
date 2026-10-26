import React, { useState } from 'react';
import { 
  Calculator, AlertTriangle, CheckCircle2, Info, 
  HelpCircle, RefreshCw, Flame, ShieldAlert, Sparkles, Droplets
} from 'lucide-react';

export default function DermCalculadoras() {
  const [activeCalc, setActiveCalc] = useState<'pasi' | 'scorad' | 'bsa' | 'isotretinoina' | 'ftu'>('pasi');

  // =========================================================================
  // 1. PASI (Psoriasis Area and Severity Index)
  // Cabeça (10%), Membros Superiores (20%), Tronco (30%), Membros Inferiores (40%)
  // =========================================================================
  const [pasiHead, setPasiHead] = useState({ erythema: 2, induration: 2, desquamation: 2, area: 2 });
  const [pasiUpper, setPasiUpper] = useState({ erythema: 2, induration: 2, desquamation: 2, area: 2 });
  const [pasiTrunk, setPasiTrunk] = useState({ erythema: 2, induration: 2, desquamation: 2, area: 2 });
  const [pasiLower, setPasiLower] = useState({ erythema: 2, induration: 2, desquamation: 2, area: 2 });

  const calcRegionScore = (r: { erythema: number; induration: number; desquamation: number; area: number }, weight: number) => {
    return (r.erythema + r.induration + r.desquamation) * r.area * weight;
  };

  const totalPASI = Number((
    calcRegionScore(pasiHead, 0.1) +
    calcRegionScore(pasiUpper, 0.2) +
    calcRegionScore(pasiTrunk, 0.3) +
    calcRegionScore(pasiLower, 0.4)
  ).toFixed(1));

  const getPasiInterpretation = (val: number) => {
    if (val < 5) return { level: 'Leve', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', desc: 'Geralmente manejável com tratamento tópico exclusivo e hidratação.' };
    if (val <= 10) return { level: 'Moderada', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60', desc: 'Candidato a fototerapia ou terapia sistêmica convencional caso falha tópica ou impacto no DLQI.' };
    return { level: 'Grave', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800/60', desc: 'Indicação formal de terapia sistêmica (Metotrexato, Acitretina) ou Imunobiológico (PCDT/SBD).' };
  };

  // =========================================================================
  // 2. SCORAD (Scoring Atopic Dermatitis)
  // A/5 + 7B/2 + C (Extensão / 5 + 7*Intensidade / 2 + Sintomas Subjetivos)
  // =========================================================================
  const [scoradA, setScoradA] = useState<number>(25); // % BSA (0-100)
  const [scoradB, setScoradB] = useState({
    eritema: 2, // 0-3
    edema: 1,
    escoriacao: 2,
    crostas: 1,
    liquenificacao: 2,
    xerose: 2
  });
  const [scoradPrurido, setScoradPrurido] = useState<number>(6); // 0-10
  const [scoradSono, setScoradSono] = useState<number>(4); // 0-10

  const sumIntensity = scoradB.eritema + scoradB.edema + scoradB.escoriacao + scoradB.crostas + scoradB.liquenificacao + scoradB.xerose;
  const totalSCORAD = Number(((scoradA / 5) + (7 * sumIntensity / 2) + scoradPrurido + scoradSono).toFixed(1));

  const getScoradInterpretation = (val: number) => {
    if (val < 25) return { level: 'Dermatite Atópica Leve', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', desc: 'Controle com emolientes e corticoides tópicos de baixa/média potência ou inibidores de calcineurina.' };
    if (val <= 50) return { level: 'Dermatite Atópica Moderada', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60', desc: 'Fototerapia, imunomoduladores tópicos contínuos e considerar terapia sistêmica inicial.' };
    return { level: 'Dermatite Atópica Grave', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800/60', desc: 'Indicação de imunobiológico (Dupilumabe / anti-IL4Rα) ou Inibidores de JAK (Upadacitinibe / Baricitinibe).' };
  };

  // =========================================================================
  // 3. BSA (Body Surface Area) - Regra dos 9 e Regra das Palmas
  // =========================================================================
  const [bsaHead, setBsaHead] = useState<number>(0);
  const [bsaChest, setBsaChest] = useState<number>(0);
  const [bsaAbdomen, setBsaAbdomen] = useState<number>(0);
  const [bsaUpperBack, setBsaUpperBack] = useState<number>(0);
  const [bsaLowerBack, setBsaLowerBack] = useState<number>(0);
  const [bsaLeftArm, setBsaLeftArm] = useState<number>(0);
  const [bsaRightArm, setBsaRightArm] = useState<number>(0);
  const [bsaLeftLeg, setBsaLeftLeg] = useState<number>(0);
  const [bsaRightLeg, setBsaRightLeg] = useState<number>(0);
  const [bsaGenitalia, setBsaGenitalia] = useState<number>(0);

  const totalBSA = bsaHead + bsaChest + bsaAbdomen + bsaUpperBack + bsaLowerBack + bsaLeftArm + bsaRightArm + bsaLeftLeg + bsaRightLeg + bsaGenitalia;

  // =========================================================================
  // 4. Isotretinoína Oral - Dose Acumulada
  // Meta: 120 a 150 mg/kg
  // =========================================================================
  const [isoWeight, setIsoWeight] = useState<number>(65);
  const [isoTargetDose, setIsoTargetDose] = useState<number>(135); // 120 a 150 mg/kg
  const [isoDailyDose, setIsoDailyDose] = useState<number>(30); // mg/dia

  const totalIsoAccumulatedNeeded = isoWeight * isoTargetDose;
  const daysToComplete = isoDailyDose > 0 ? Math.ceil(totalIsoAccumulatedNeeded / isoDailyDose) : 0;
  const monthsToComplete = Number((daysToComplete / 30).toFixed(1));

  // =========================================================================
  // 5. FTU (Fingertip Unit) e Consumo de Tópicos
  // 1 FTU = 0.5 g de creme/pomada (cobre 2 palmas da mão de um adulto)
  // =========================================================================
  const [ftuAreas, setFtuAreas] = useState<{ [key: string]: boolean }>({
    facePescoco: true, // 2.5 FTU
    maoUnilateral: false, // 1 FTU
    bracoAntebraco: false, // 4 FTU
    troncoAnterior: false, // 7 FTU
    troncoPosterior: false, // 7 FTU
    pernaCoxa: false, // 8 FTU
    peUnilateral: false // 2 FTU
  });
  const [ftuTimesPerDay, setFtuTimesPerDay] = useState<number>(2);
  const [ftuDaysDuration, setFtuDaysDuration] = useState<number>(14);

  const calcDailyFTU = () => {
    let sum = 0;
    if (ftuAreas.facePescoco) sum += 2.5;
    if (ftuAreas.maoUnilateral) sum += 1.0;
    if (ftuAreas.bracoAntebraco) sum += 4.0;
    if (ftuAreas.troncoAnterior) sum += 7.0;
    if (ftuAreas.troncoPosterior) sum += 7.0;
    if (ftuAreas.pernaCoxa) sum += 8.0;
    if (ftuAreas.peUnilateral) sum += 2.0;
    return sum;
  };

  const dailyFTU = calcDailyFTU();
  const dailyGrams = dailyFTU * 0.5 * ftuTimesPerDay;
  const totalGramsNeeded = Math.ceil(dailyGrams * ftuDaysDuration);

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveCalc('pasi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'pasi'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calculator size={15} />
          <span>PASI (Psoríase)</span>
        </button>

        <button
          onClick={() => setActiveCalc('scorad')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'scorad'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles size={15} />
          <span>SCORAD (Dermatite Atópica)</span>
        </button>

        <button
          onClick={() => setActiveCalc('bsa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'bsa'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Flame size={15} />
          <span>BSA (Área de Superfície Corporal)</span>
        </button>

        <button
          onClick={() => setActiveCalc('isotretinoina')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'isotretinoina'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldAlert size={15} />
          <span>Dose Acumulada de Isotretinoína</span>
        </button>

        <button
          onClick={() => setActiveCalc('ftu')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCalc === 'ftu'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Droplets size={15} />
          <span>FTU & Gramas de Pomada</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* PASI CALCULATOR */}
      {/* =================================================================== */}
      {activeCalc === 'pasi' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Calculator className="text-amber-400" size={22} />
                  Calculadora do Escore PASI (Psoriasis Area Severity Index)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Padrão-ouro da SBD e diretrizes internacionais para avaliação de gravidade e resposta terapêutica (PASI 75 / PASI 90 / PASI 100).
                </p>
              </div>

              {/* Result Pill */}
              <div className={`p-4 rounded-2xl border ${getPasiInterpretation(totalPASI).bg} flex items-center gap-4`}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Escore PASI</span>
                  <span className="text-3xl font-black text-white font-mono tabular-nums">{totalPASI}</span>
                  <span className="text-xs text-slate-400 ml-1">/ 72</span>
                </div>
                <div className="border-l border-slate-700/60 pl-4">
                  <span className={`text-xs font-black uppercase ${getPasiInterpretation(totalPASI).color}`}>
                    {getPasiInterpretation(totalPASI).level}
                  </span>
                  <p className="text-[11px] text-slate-300 max-w-xs leading-tight mt-0.5">
                    {getPasiInterpretation(totalPASI).desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Regions Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              {/* Head */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-400 uppercase">1. Cabeça & Pescoço (10%)</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    Subtotal: {calcRegionScore(pasiHead, 0.1).toFixed(1)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Eritema: <span className="text-white font-mono">{pasiHead.erythema} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiHead.erythema}
                      onChange={(e) => setPasiHead({ ...pasiHead, erythema: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Induração / Espessura: <span className="text-white font-mono">{pasiHead.induration} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiHead.induration}
                      onChange={(e) => setPasiHead({ ...pasiHead, induration: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Descamação: <span className="text-white font-mono">{pasiHead.desquamation} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiHead.desquamation}
                      onChange={(e) => setPasiHead({ ...pasiHead, desquamation: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Área Acometida: <span className="text-white font-mono">Grau {pasiHead.area} (0-6)</span>
                    </label>
                    <select
                      value={pasiHead.area}
                      onChange={(e) => setPasiHead({ ...pasiHead, area: Number(e.target.value) })}
                      className="w-full p-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
                    >
                      <option value={0}>0 (0%)</option>
                      <option value={1}>1 (&lt; 10%)</option>
                      <option value={2}>2 (10 - 29%)</option>
                      <option value={3}>3 (30 - 49%)</option>
                      <option value={4}>4 (50 - 69%)</option>
                      <option value={5}>5 (70 - 89%)</option>
                      <option value={6}>6 (90 - 100%)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Upper Extremities */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-400 uppercase">2. Membros Superiores (20%)</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    Subtotal: {calcRegionScore(pasiUpper, 0.2).toFixed(1)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Eritema: <span className="text-white font-mono">{pasiUpper.erythema} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiUpper.erythema}
                      onChange={(e) => setPasiUpper({ ...pasiUpper, erythema: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Induração / Espessura: <span className="text-white font-mono">{pasiUpper.induration} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiUpper.induration}
                      onChange={(e) => setPasiUpper({ ...pasiUpper, induration: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Descamação: <span className="text-white font-mono">{pasiUpper.desquamation} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiUpper.desquamation}
                      onChange={(e) => setPasiUpper({ ...pasiUpper, desquamation: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Área Acometida: <span className="text-white font-mono">Grau {pasiUpper.area} (0-6)</span>
                    </label>
                    <select
                      value={pasiUpper.area}
                      onChange={(e) => setPasiUpper({ ...pasiUpper, area: Number(e.target.value) })}
                      className="w-full p-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
                    >
                      <option value={0}>0 (0%)</option>
                      <option value={1}>1 (&lt; 10%)</option>
                      <option value={2}>2 (10 - 29%)</option>
                      <option value={3}>3 (30 - 49%)</option>
                      <option value={4}>4 (50 - 69%)</option>
                      <option value={5}>5 (70 - 89%)</option>
                      <option value={6}>6 (90 - 100%)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Trunk */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-400 uppercase">3. Tronco (30%)</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    Subtotal: {calcRegionScore(pasiTrunk, 0.3).toFixed(1)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Eritema: <span className="text-white font-mono">{pasiTrunk.erythema} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiTrunk.erythema}
                      onChange={(e) => setPasiTrunk({ ...pasiTrunk, erythema: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Induração / Espessura: <span className="text-white font-mono">{pasiTrunk.induration} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiTrunk.induration}
                      onChange={(e) => setPasiTrunk({ ...pasiTrunk, induration: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Descamação: <span className="text-white font-mono">{pasiTrunk.desquamation} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiTrunk.desquamation}
                      onChange={(e) => setPasiTrunk({ ...pasiTrunk, desquamation: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Área Acometida: <span className="text-white font-mono">Grau {pasiTrunk.area} (0-6)</span>
                    </label>
                    <select
                      value={pasiTrunk.area}
                      onChange={(e) => setPasiTrunk({ ...pasiTrunk, area: Number(e.target.value) })}
                      className="w-full p-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
                    >
                      <option value={0}>0 (0%)</option>
                      <option value={1}>1 (&lt; 10%)</option>
                      <option value={2}>2 (10 - 29%)</option>
                      <option value={3}>3 (30 - 49%)</option>
                      <option value={4}>4 (50 - 69%)</option>
                      <option value={5}>5 (70 - 89%)</option>
                      <option value={6}>6 (90 - 100%)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lower Extremities */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-400 uppercase">4. Membros Inferiores (40%)</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    Subtotal: {calcRegionScore(pasiLower, 0.4).toFixed(1)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Eritema: <span className="text-white font-mono">{pasiLower.erythema} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiLower.erythema}
                      onChange={(e) => setPasiLower({ ...pasiLower, erythema: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Induração / Espessura: <span className="text-white font-mono">{pasiLower.induration} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiLower.induration}
                      onChange={(e) => setPasiLower({ ...pasiLower, induration: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Descamação: <span className="text-white font-mono">{pasiLower.desquamation} (0-4)</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={4}
                      value={pasiLower.desquamation}
                      onChange={(e) => setPasiLower({ ...pasiLower, desquamation: Number(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Área Acometida: <span className="text-white font-mono">Grau {pasiLower.area} (0-6)</span>
                    </label>
                    <select
                      value={pasiLower.area}
                      onChange={(e) => setPasiLower({ ...pasiLower, area: Number(e.target.value) })}
                      className="w-full p-1.5 mt-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
                    >
                      <option value={0}>0 (0%)</option>
                      <option value={1}>1 (&lt; 10%)</option>
                      <option value={2}>2 (10 - 29%)</option>
                      <option value={3}>3 (30 - 49%)</option>
                      <option value={4}>4 (50 - 69%)</option>
                      <option value={5}>5 (70 - 89%)</option>
                      <option value={6}>6 (90 - 100%)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Pearl Box */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs text-slate-300 space-y-1.5">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Info size={14} /> Regra dos 10 da SBD / Consenso Brasileiro
              </span>
              <p>
                A psoríase é classificada como <strong>Moderada a Grave</strong> quando <strong>PASI &gt; 10</strong>, <strong>BSA &gt; 10%</strong> ou <strong>DLQI &gt; 10</strong>. Também se considera grave qualquer acometimento de áreas especiais e incapacitantes (face, couro cabeludo refratário, palmas, plantas, unhas e genitália), mesmo com PASI numérico baixo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCORAD CALCULATOR */}
      {/* =================================================================== */}
      {activeCalc === 'scorad' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Sparkles className="text-cyan-400" size={22} />
                  Calculadora SCORAD (Scoring Atopic Dermatitis)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Avalia extensão corporal (A), intensidade dos 6 sinais clínicos (B) e sintomas subjetivos (C: prurido e insônia).
                </p>
              </div>

              {/* Result Pill */}
              <div className={`p-4 rounded-2xl border ${getScoradInterpretation(totalSCORAD).bg} flex items-center gap-4`}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">SCORAD Total</span>
                  <span className="text-3xl font-black text-white font-mono tabular-nums">{totalSCORAD}</span>
                  <span className="text-xs text-slate-400 ml-1">/ 103</span>
                </div>
                <div className="border-l border-slate-700/60 pl-4">
                  <span className={`text-xs font-black uppercase ${getScoradInterpretation(totalSCORAD).color}`}>
                    {getScoradInterpretation(totalSCORAD).level}
                  </span>
                  <p className="text-[11px] text-slate-300 max-w-xs leading-tight mt-0.5">
                    {getScoradInterpretation(totalSCORAD).desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
              {/* Part A: Extent */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-black text-cyan-400 uppercase block">Parte A: Extensão (% SC)</span>
                <p className="text-[11px] text-slate-400">Porcentagem total de superfície corporal acometida:</p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={scoradA}
                    onChange={(e) => setScoradA(Number(e.target.value))}
                    className="flex-1 accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-lg font-mono font-bold text-white tabular-nums w-14 text-right">
                    {scoradA}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono block">Subtotal (A / 5) = {(scoradA / 5).toFixed(1)}</span>
              </div>

              {/* Part B: Intensity (6 items) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-cyan-400 uppercase">Parte B: Intensidade (0 a 3)</span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    Subtotal: {(7 * sumIntensity / 2).toFixed(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block">Eritema: {scoradB.eritema}</label>
                    <input type="range" min={0} max={3} value={scoradB.eritema} onChange={(e) => setScoradB({ ...scoradB, eritema: Number(e.target.value) })} className="w-full accent-cyan-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Edema/Pápula: {scoradB.edema}</label>
                    <input type="range" min={0} max={3} value={scoradB.edema} onChange={(e) => setScoradB({ ...scoradB, edema: Number(e.target.value) })} className="w-full accent-cyan-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Escoriações: {scoradB.escoriacao}</label>
                    <input type="range" min={0} max={3} value={scoradB.escoriacao} onChange={(e) => setScoradB({ ...scoradB, escoriacao: Number(e.target.value) })} className="w-full accent-cyan-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Crostas/Exsudato: {scoradB.crostas}</label>
                    <input type="range" min={0} max={3} value={scoradB.crostas} onChange={(e) => setScoradB({ ...scoradB, crostas: Number(e.target.value) })} className="w-full accent-cyan-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Liquenificação: {scoradB.liquenificacao}</label>
                    <input type="range" min={0} max={3} value={scoradB.liquenificacao} onChange={(e) => setScoradB({ ...scoradB, liquenificacao: Number(e.target.value) })} className="w-full accent-cyan-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block">Xerose (pele sã): {scoradB.xerose}</label>
                    <input type="range" min={0} max={3} value={scoradB.xerose} onChange={(e) => setScoradB({ ...scoradB, xerose: Number(e.target.value) })} className="w-full accent-cyan-500" />
                  </div>
                </div>
              </div>

              {/* Part C: Subjective Symptoms */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-cyan-400 uppercase">Parte C: Sintomas (0 a 10)</span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    Subtotal: {scoradPrurido + scoradSono}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Prurido (últimos 3 dias): <span className="text-white font-mono">{scoradPrurido}/10</span>
                    </label>
                    <input type="range" min={0} max={10} value={scoradPrurido} onChange={(e) => setScoradPrurido(Number(e.target.value))} className="w-full accent-cyan-500" />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 flex justify-between">
                      Perda de Sono / Insônia: <span className="text-white font-mono">{scoradSono}/10</span>
                    </label>
                    <input type="range" min={0} max={10} value={scoradSono} onChange={(e) => setScoradSono(Number(e.target.value))} className="w-full accent-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* BSA CALCULATOR */}
      {/* =================================================================== */}
      {activeCalc === 'bsa' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Flame className="text-rose-400" size={22} />
                  Calculadora BSA (Body Surface Area - Regra dos 9 & Regra das Palmas)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Quantificação anatômica da superfície corporal acometida para Psoríase, Farmacodermias (SSJ/NET/SCORTEN) e Queimaduras.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Total Acometido</span>
                  <span className="text-3xl font-black text-rose-400 font-mono tabular-nums">{totalBSA}%</span>
                </div>
                <div className="border-l border-slate-800 pl-4 text-xs text-slate-300">
                  <span className="font-bold text-white block">
                    {totalBSA < 3 ? 'Acometimento Leve (< 3%)' : totalBSA <= 10 ? 'Acometimento Moderado (3 a 10%)' : 'Acometimento Extenso (> 10%)'}
                  </span>
                  <span className="text-[11px] text-slate-400">1 palma da mão do paciente com dedos unidos = ~1% da SC</span>
                </div>
              </div>
            </div>

            {/* Segments Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t border-slate-800 text-xs">
              {[
                { label: 'Cabeça & Pescoço', max: 9, val: bsaHead, set: setBsaHead },
                { label: 'Tórax Anterior', max: 9, val: bsaChest, set: setBsaChest },
                { label: 'Abdome Anterior', max: 9, val: bsaAbdomen, set: setBsaAbdomen },
                { label: 'Dorso Superior', max: 9, val: bsaUpperBack, set: setBsaUpperBack },
                { label: 'Dorso Inferior / Lombar', max: 9, val: bsaLowerBack, set: setBsaLowerBack },
                { label: 'Membro Sup. Esquerdo', max: 9, val: bsaLeftArm, set: setBsaLeftArm },
                { label: 'Membro Sup. Direito', max: 9, val: bsaRightArm, set: setBsaRightArm },
                { label: 'Membro Inf. Esquerdo', max: 18, val: bsaLeftLeg, set: setBsaLeftLeg },
                { label: 'Membro Inf. Direito', max: 18, val: bsaRightLeg, set: setBsaRightLeg },
                { label: 'Genitália / Períneo', max: 1, val: bsaGenitalia, set: setBsaGenitalia },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-300 block text-[11px] truncate">{item.label}</span>
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Máx: {item.max}%</span>
                    <span className="text-white font-bold">{item.val}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={item.max}
                    value={item.val}
                    onChange={(e) => item.set(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ISOTRETINOIN ACCUMULATED DOSE CALCULATOR */}
      {/* =================================================================== */}
      {activeCalc === 'isotretinoina' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldAlert className="text-emerald-400" size={22} />
                Calculadora de Dose Acumulada de Isotretinoína Oral (Roacutan)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Para remissão a longo prazo da acne grave/refratária, a dose acumulada total recomendada é de <strong>120 a 150 mg/kg</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Peso do Paciente (kg)</label>
                <input
                  type="number"
                  value={isoWeight}
                  onChange={(e) => setIsoWeight(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg font-bold"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Meta Cumulativa (mg/kg)</label>
                <div className="flex items-center gap-2">
                  {[120, 135, 150].map((dose) => (
                    <button
                      key={dose}
                      onClick={() => setIsoTargetDose(dose)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        isoTargetDose === dose
                          ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {dose} mg/kg
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Dose Diária Prescrita (mg/dia)</label>
                <input
                  type="number"
                  value={isoDailyDose}
                  onChange={(e) => setIsoDailyDose(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-lg font-bold"
                />
                <span className="text-[10px] text-slate-500">Cápsulas comuns: 10 mg e 20 mg</span>
              </div>
            </div>

            {/* Results Output */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Dose Total Alvo</span>
                <span className="text-2xl font-black text-white font-mono tabular-nums">{totalIsoAccumulatedNeeded} mg</span>
                <span className="text-xs text-slate-400 block mt-0.5">({isoWeight} kg × {isoTargetDose} mg/kg)</span>
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Duração em Dias</span>
                <span className="text-2xl font-black text-white font-mono tabular-nums">{daysToComplete} dias</span>
                <span className="text-xs text-slate-400 block mt-0.5">com {isoDailyDose} mg ao dia</span>
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Duração Estimada</span>
                <span className="text-2xl font-black text-emerald-300 font-mono tabular-nums">{monthsToComplete} meses</span>
                <span className="text-xs text-slate-400 block mt-0.5">≈ {Math.round(daysToComplete / 7)} semanas de tratamento</span>
              </div>
            </div>

            {/* Mandatory Safety Protocol */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-rose-400 uppercase flex items-center gap-1.5">
                <AlertTriangle size={15} /> Protocolo de Segurança e Exames Obrigatórios (SBD / ANVISA)
              </span>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li><strong>Mulheres em idade fértil:</strong> Teratogenicidade gravíssima. Exigir 2 métodos contraceptivos eficazes (1 de barreira + 1 hormonal/DIU) iniciados 30 dias antes, durante todo o uso e por 30 dias após término. <strong>Beta-hCG sérico negativo mensal</strong> antes de cada renovação de receita.</li>
                <li><strong>Exames Laboratoriais Basais e de Controle:</strong> Perfil lipídico (colesterol e triglicerídeos), TGO, TGP, fosfatase alcalina e hemograma. Repetir com 30 dias e a cada 2-3 meses.</li>
                <li><strong>Recomendações ao Paciente:</strong> Protetor solar diário FPS 50+, hidratante labial e corporal (queilite ocorre em 100% dos pacientes), evitar depilação a cera e procedimentos a laser durante o tratamento e por 6 meses após.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* FTU (FINGERTIP UNIT) CALCULATOR */}
      {/* =================================================================== */}
      {activeCalc === 'ftu' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Droplets className="text-blue-400" size={22} />
                  Calculadora FTU (Fingertip Unit) & Prescrição em Gramas
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  1 FTU (unidade ponta do dedo) ≈ <strong>0,5 g</strong> de pomada/creme e cobre a área equivalente a <strong>2 palmas de mão de um adulto</strong>.
                </p>
              </div>

              {/* Result Pill */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-blue-900/60 flex items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Total a Prescrever</span>
                  <span className="text-3xl font-black text-blue-400 font-mono tabular-nums">{totalGramsNeeded} g</span>
                </div>
                <div className="border-l border-slate-800 pl-4 text-xs text-slate-300">
                  <span className="font-bold text-white block">
                    Sugestão: {totalGramsNeeded <= 30 ? '1 tubo de 30g' : totalGramsNeeded <= 60 ? '2 tubos de 30g ou 1 de 60g' : `${Math.ceil(totalGramsNeeded / 50)} tubos de 50g`}
                  </span>
                  <span className="text-[11px] text-slate-400">Consumo: {dailyGrams.toFixed(1)} g/dia ({dailyFTU} FTU/aplicação)</span>
                </div>
              </div>
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
              <div className="md:col-span-2 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">Selecione as Áreas Anatômicas Afetadas:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'facePescoco', label: 'Face e Pescoço (2,5 FTU)', ftu: 2.5 },
                    { id: 'maoUnilateral', label: 'Uma Mão inteira (1,0 FTU)', ftu: 1.0 },
                    { id: 'bracoAntebraco', label: 'Um Braço + Antebraço (4,0 FTU)', ftu: 4.0 },
                    { id: 'troncoAnterior', label: 'Tórax e Abdome anterior (7,0 FTU)', ftu: 7.0 },
                    { id: 'troncoPosterior', label: 'Dorso e Nádegas (7,0 FTU)', ftu: 7.0 },
                    { id: 'pernaCoxa', label: 'Uma Perna inteira + Coxa (8,0 FTU)', ftu: 8.0 },
                    { id: 'peUnilateral', label: 'Um Pé inteiro (2,0 FTU)', ftu: 2.0 },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        ftuAreas[item.id]
                          ? 'border-blue-500 bg-blue-950/30 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{item.label}</span>
                      <input
                        type="checkbox"
                        checked={ftuAreas[item.id] || false}
                        onChange={(e) => setFtuAreas({ ...ftuAreas, [item.id]: e.target.checked })}
                        className="rounded accent-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Posology settings */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Frequência Diária</label>
                  <select
                    value={ftuTimesPerDay}
                    onChange={(e) => setFtuTimesPerDay(Number(e.target.value))}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    <option value={1}>1 vez ao dia (ex: à noite)</option>
                    <option value={2}>2 vezes ao dia (12 em 12 horas)</option>
                    <option value={3}>3 vezes ao dia</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Duração do Tratamento</label>
                  <div className="flex items-center gap-2">
                    {[7, 14, 21, 30].map((days) => (
                      <button
                        key={days}
                        onClick={() => setFtuDaysDuration(days)}
                        className={`flex-1 py-1.5 rounded-lg border font-bold text-xs ${
                          ftuDaysDuration === days
                            ? 'border-blue-500 bg-blue-950/60 text-blue-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                        }`}
                      >
                        {days} d
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <span className="font-bold text-white block">Regra Prática de Prescrição</span>
                  <p>Prescrever tubos insuficientes leva à interrupção precoce; prescrever em excesso gera desperdício ou abuso de corticoide potente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
