import React, { useState } from 'react';
import { 
  Brain, 
  Eye, 
  HeartPulse, 
  Wind, 
  Flame, 
  Activity, 
  Droplet, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Thermometer, 
  Crosshair,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ToxidromeData, PatientHotspot } from './toxisindromesData';

interface PatientVisualAvatarProps {
  toxidrome: ToxidromeData;
}

export default function PatientVisualAvatar({ toxidrome }: PatientVisualAvatarProps) {
  const [selectedHotspotId, setSelectedHotspotId] = useState<keyof typeof toxidrome.hotspots>('eyes');
  const activeHotspot: PatientHotspot = toxidrome.hotspots[selectedHotspotId];

  // Helper for pupil rendering
  const pupil = toxidrome.pupil;
  const vitals = toxidrome.vitals;

  // Render SVG ECG Waveform path based on pattern
  const renderEcgWave = () => {
    switch (vitals.ecgPattern) {
      case 'wide_qrs':
        // Tricyclic: Broad QRS complex, prolonged QTc, giant R in aVR
        return "M 0,25 L 20,25 L 25,23 L 30,25 L 35,27 L 45,-5 L 60,48 L 75,25 L 90,15 L 115,25 L 140,25 L 145,23 L 150,25 L 155,27 L 165,-5 L 180,48 L 195,25 L 210,15 L 235,25 L 260,25 L 265,23 L 270,25 L 275,27 L 285,-5 L 300,48 L 315,25 L 330,15 L 360,25";
      case 'sinus_bradycardia':
        // Opioid / Cholinergic: Slow spaced beats
        return "M 0,25 L 40,25 L 45,20 L 50,25 L 55,28 L 60,0 L 68,45 L 75,25 L 90,18 L 110,25 L 190,25 L 195,20 L 200,25 L 205,28 L 210,0 L 218,45 L 225,25 L 240,18 L 260,25 L 360,25";
      case 'sinus_tachycardia':
        // Sympathomimetic / Anticholinergic: Rapid tight beats
        return "M 0,25 L 10,25 L 15,22 L 20,25 L 23,28 L 28,-2 L 35,42 L 40,25 L 48,18 L 60,25 L 70,25 L 75,22 L 80,25 L 83,28 L 88,-2 L 95,42 L 100,25 L 108,18 L 120,25 L 130,25 L 135,22 L 140,25 L 143,28 L 148,-2 L 155,42 L 160,25 L 168,18 L 180,25 L 190,25 L 195,22 L 200,25 L 203,28 L 208,-2 L 215,42 L 220,25 L 228,18 L 240,25 L 250,25 L 255,22 L 260,25 L 263,28 L 268,-2 L 275,42 L 280,25 L 288,18 L 300,25 L 310,25 L 315,22 L 320,25 L 323,28 L 328,-2 L 335,42 L 340,25 L 348,18 L 360,25";
      default:
        // Normal sinus
        return "M 0,25 L 25,25 L 30,22 L 35,25 L 38,28 L 45,2 L 52,42 L 58,25 L 70,18 L 85,25 L 130,25 L 135,22 L 140,25 L 143,28 L 150,2 L 157,42 L 163,25 L 175,18 L 190,25 L 235,25 L 240,22 L 245,25 L 248,28 L 255,2 L 262,42 L 268,25 L 280,18 L 295,25 L 360,25";
    }
  };

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6">
      
      {/* Background radial glow tailored to toxidrome */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 ${toxidrome.glowColor} opacity-5 blur-[100px] pointer-events-none rounded-full`} />

      {/* Header bar of the visual model */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${toxidrome.badgeBg} ${toxidrome.accentColor} border ${toxidrome.badgeBorder}`}>
              {toxidrome.categoryBadge}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Modelo Visual de Exame Físico & Telemetria
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>Paciente com {toxidrome.name}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Clique nos órgãos e pontos de inspeção (hotspots) no avatar para examinar os achados anatômicos patognomônicos.
          </p>
        </div>

        {/* Rapid summary chip */}
        {toxidrome.summaryMnemonic && (
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 self-start sm:self-auto max-w-sm">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-[11px]">
              <span className="font-bold text-white block">{toxidrome.summaryMnemonic}</span>
              <span className="text-slate-400 line-clamp-1">{toxidrome.summaryMnemonicDescription}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Body Silhouette + Pupilometer + ICU Telemetry Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* LEFT & CENTER (Cols 1-7): Visual Avatar Body with Interactive Hotspots */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-inner relative">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800/80 pb-2 mb-3">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Crosshair className="w-3.5 h-3.5 text-indigo-400" />
              Inspeção Anatômica do Paciente
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Hotspot Ativo: <strong className="text-white uppercase">{activeHotspot.label}</strong>
            </span>
          </div>

          {/* SVG Human Figure with Positioned Interactive Hotspots */}
          <div className="relative w-full h-[380px] sm:h-[420px] flex items-center justify-center py-2">
            
            {/* SVG Anatomical Human Silhouette */}
            <svg 
              viewBox="0 0 200 420" 
              className="h-full w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Human Silhouette Path */}
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <filter id="glowEffect">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Head & Neck */}
              <circle cx="100" cy="45" r="28" fill="url(#bodyGradient)" stroke="#334155" strokeWidth="2" />
              <path d="M92,72 L92,85 L108,85 L108,72 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* Torso & Pelvis */}
              <path 
                d="M60,95 Q100,88 140,95 L135,215 Q100,225 65,215 Z" 
                fill="url(#bodyGradient)" 
                stroke="#334155" 
                strokeWidth="2" 
              />

              {/* Left Arm (Observer's Left) */}
              <path 
                d="M60,95 Q40,140 35,200 Q32,230 30,260 L40,260 Q44,230 48,200 Q52,140 65,105 Z" 
                fill="url(#bodyGradient)" 
                stroke="#334155" 
                strokeWidth="1.5" 
              />

              {/* Right Arm (Observer's Right) */}
              <path 
                d="M140,95 Q160,140 165,200 Q168,230 170,260 L160,260 Q156,230 152,200 Q148,140 135,105 Z" 
                fill="url(#bodyGradient)" 
                stroke="#334155" 
                strokeWidth="1.5" 
              />

              {/* Legs */}
              <path 
                d="M68,220 L62,310 Q60,360 58,400 L76,400 Q78,360 84,310 L94,225 Z" 
                fill="url(#bodyGradient)" 
                stroke="#334155" 
                strokeWidth="1.8" 
              />
              <path 
                d="M132,220 L138,310 Q140,360 142,400 L124,400 Q122,360 116,310 L106,225 Z" 
                fill="url(#bodyGradient)" 
                stroke="#334155" 
                strokeWidth="1.8" 
              />

              {/* Ribcage & Sternum Subtle Overlay */}
              <path d="M100,100 L100,175" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <path d="M80,120 Q100,130 120,120 M75,140 Q100,150 125,140 M78,160 Q100,170 122,160" stroke="#334155" strokeWidth="1" opacity="0.5" />
            </svg>

            {/* HOTSPOT 1: SNC / CÉREBRO (Top of Head) */}
            <button
              onClick={() => setSelectedHotspotId('brain')}
              className={`absolute top-[6%] left-[48%] -translate-x-1/2 p-2 rounded-full border-2 transition-all cursor-pointer z-30 group ${
                selectedHotspotId === 'brain' 
                  ? 'bg-indigo-600 border-white shadow-[0_0_20px_rgba(99,102,241,1)] scale-125' 
                  : 'bg-slate-900 border-indigo-400/80 hover:bg-indigo-950/80 hover:scale-110'
              }`}
              title="Examinar SNC & Consciência"
            >
              <Brain className={`w-4 h-4 ${selectedHotspotId === 'brain' ? 'text-white' : 'text-indigo-400'}`} />
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none">
                SNC & Mente
              </span>
            </button>

            {/* HOTSPOT 2: OLHOS & PUPILAS (Face / Eyes) */}
            <button
              onClick={() => setSelectedHotspotId('eyes')}
              className={`absolute top-[13%] left-[48%] -translate-x-1/2 p-2 rounded-full border-2 transition-all cursor-pointer z-30 group ${
                selectedHotspotId === 'eyes' 
                  ? 'bg-sky-600 border-white shadow-[0_0_20px_rgba(56,189,248,1)] scale-125' 
                  : 'bg-slate-900 border-sky-400/80 hover:bg-sky-950/80 hover:scale-110'
              }`}
              title="Examinar Pupilas & Olhos"
            >
              <Eye className={`w-4 h-4 ${selectedHotspotId === 'eyes' ? 'text-white' : 'text-sky-400'}`} />
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none">
                Pupilômetro
              </span>
            </button>

            {/* HOTSPOT 3: PELE & SUDORESE (Right Shoulder / Neck) */}
            <button
              onClick={() => setSelectedHotspotId('skin')}
              className={`absolute top-[23%] left-[28%] p-2 rounded-full border-2 transition-all cursor-pointer z-30 group ${
                selectedHotspotId === 'skin' 
                  ? 'bg-amber-600 border-white shadow-[0_0_20px_rgba(245,158,11,1)] scale-125' 
                  : 'bg-slate-900 border-amber-400/80 hover:bg-amber-950/80 hover:scale-110'
              }`}
              title="Examinar Pele, Mucosas & Sudorese"
            >
              <Flame className={`w-4 h-4 ${selectedHotspotId === 'skin' ? 'text-white' : 'text-amber-400'}`} />
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none">
                Pele & Sudorese
              </span>
            </button>

            {/* HOTSPOT 4: CORAÇÃO & RITMO (Precordium) */}
            <button
              onClick={() => setSelectedHotspotId('heart')}
              className={`absolute top-[32%] left-[53%] p-2 rounded-full border-2 transition-all cursor-pointer z-30 group ${
                selectedHotspotId === 'heart' 
                  ? 'bg-rose-600 border-white shadow-[0_0_20px_rgba(244,63,94,1)] scale-125' 
                  : 'bg-slate-900 border-rose-400/80 hover:bg-rose-950/80 hover:scale-110'
              }`}
              title="Examinar Cardiovascular & Ritmo"
            >
              <HeartPulse className={`w-4 h-4 ${selectedHotspotId === 'heart' ? 'text-white' : 'text-rose-400'}`} />
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none">
                Coração & PA
              </span>
            </button>

            {/* HOTSPOT 5: PULMÕES & VIA AÉREA (Right Thorax) */}
            <button
              onClick={() => setSelectedHotspotId('lungs')}
              className={`absolute top-[32%] left-[38%] p-2 rounded-full border-2 transition-all cursor-pointer z-30 group ${
                selectedHotspotId === 'lungs' 
                  ? 'bg-teal-600 border-white shadow-[0_0_20px_rgba(20,184,166,1)] scale-125' 
                  : 'bg-slate-900 border-teal-400/80 hover:bg-teal-950/80 hover:scale-110'
              }`}
              title="Examinar Pulmão & Broncorreia"
            >
              <Wind className={`w-4 h-4 ${selectedHotspotId === 'lungs' ? 'text-white' : 'text-teal-400'}`} />
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none">
                Pulmão & Secreções
              </span>
            </button>

            {/* HOTSPOT 6: TGI & BEXIGA (Abdomen / Pelvis) */}
            <button
              onClick={() => setSelectedHotspotId('abdomen')}
              className={`absolute top-[48%] left-[48%] -translate-x-1/2 p-2 rounded-full border-2 transition-all cursor-pointer z-30 group ${
                selectedHotspotId === 'abdomen' 
                  ? 'bg-emerald-600 border-white shadow-[0_0_20px_rgba(16,185,129,1)] scale-125' 
                  : 'bg-slate-900 border-emerald-400/80 hover:bg-emerald-950/80 hover:scale-110'
              }`}
              title="Examinar TGI, Diarreia & Bexigoma"
            >
              <Droplet className={`w-4 h-4 ${selectedHotspotId === 'abdomen' ? 'text-white' : 'text-emerald-400'}`} />
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none">
                TGI & Bexigoma
              </span>
            </button>

            {/* HOTSPOT 7: NEUROMUSCULAR (Extremities / Reflexes) */}
            <button
              onClick={() => setSelectedHotspotId('neuromuscular')}
              className={`absolute top-[72%] left-[48%] -translate-x-1/2 p-2 rounded-full border-2 transition-all cursor-pointer z-30 group ${
                selectedHotspotId === 'neuromuscular' 
                  ? 'bg-purple-600 border-white shadow-[0_0_20px_rgba(168,85,247,1)] scale-125' 
                  : 'bg-slate-900 border-purple-400/80 hover:bg-purple-950/80 hover:scale-110'
              }`}
              title="Examinar Tônus, Clônus & Reflexos"
            >
              <Activity className={`w-4 h-4 ${selectedHotspotId === 'neuromuscular' ? 'text-white' : 'text-purple-400'}`} />
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none">
                Clônus / Rigidez / Tônus
              </span>
            </button>

          </div>

          {/* Bottom Hotspot Quick Selector Buttons */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-3 border-t border-slate-800/80 text-[11px]">
            {(['eyes', 'skin', 'heart', 'lungs', 'abdomen', 'neuromuscular', 'brain'] as const).map(id => {
              const hs = toxidrome.hotspots[id];
              const isSelected = selectedHotspotId === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedHotspotId(id)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                    isSelected 
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm' 
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span>{hs.label.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN (Cols 8-12): PUPILOMETER & ICU TELEMETRY MONITOR */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* 1. DYNAMIC ANATOMICAL PUPILOMETER */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                <Eye className="w-4 h-4 text-sky-400" />
                Pupilômetro Clínico
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                {pupil.sizeMm} mm ({pupil.sizeMm < 2.5 ? 'Miose' : pupil.sizeMm > 5.5 ? 'Midríase' : 'Média'})
              </span>
            </div>

            {/* Interactive Anatomical Eye Display */}
            <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
              
              {/* SVG Eye Graphic with dynamic pupil radius */}
              <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner">
                {/* Sclera */}
                <div className="w-20 h-14 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full flex items-center justify-center relative shadow-sm">
                  {/* Subtle blood vessels on sclera */}
                  <div className="absolute left-1 top-3 w-3 h-0.5 bg-rose-400/40 rounded-full rotate-12" />
                  <div className="absolute right-1 top-4 w-4 h-0.5 bg-rose-400/40 rounded-full -rotate-12" />
                  
                  {/* Iris */}
                  <div 
                    className={`w-11 h-11 rounded-full bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 border-2 border-amber-950 flex items-center justify-center relative shadow-md transition-all ${
                      pupil.type === 'oculogiro' ? '-translate-y-2' : ''
                    }`}
                  >
                    {/* The Pupil with dynamic pixel size based on sizeMm */}
                    <div 
                      style={{ 
                        width: `${Math.max(6, pupil.sizeMm * 4.2)}px`, 
                        height: `${Math.max(6, pupil.sizeMm * 4.2)}px` 
                      }}
                      className="bg-black rounded-full transition-all duration-300 shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] flex items-center justify-center"
                    >
                      {/* Cornea reflection glint */}
                      <div className="w-1 h-1 bg-white/80 rounded-full self-start ml-0.5 mt-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Textual Description of Pupil State */}
              <div className="flex-1 text-xs space-y-1">
                <span className="font-extrabold text-white text-xs block">
                  {pupil.label}
                </span>
                <p className="text-[11px] text-slate-300 leading-tight">
                  {pupil.description}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">Reflexo Fotomotor:</span>
                  <span className={`font-mono font-bold ${
                    pupil.lightReflex.includes('Ausente') ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {pupil.lightReflex}
                  </span>
                </div>
              </div>

            </div>

            {/* Millimeter Gauge Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-mono text-slate-400 px-1">
                <span>1 mm (Puntiforme)</span>
                <span>4 mm (Normal)</span>
                <span>9 mm (Máxima)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800 flex items-center">
                <div 
                  style={{ width: `${(pupil.sizeMm / 9) * 100}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    pupil.sizeMm < 2.5 
                      ? 'bg-blue-500' 
                      : pupil.sizeMm > 5.5 
                        ? 'bg-rose-500' 
                        : 'bg-emerald-500'
                  }`}
                />
              </div>
            </div>

          </div>

          {/* 2. REALISTIC ICU BEDSIDE TELEMETRY MONITOR */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Monitor Multiparamétrico
                </span>
              </div>
              <span className="text-[10px] text-slate-400">LEITO TOX-01</span>
            </div>

            {/* ECG Strip Screen */}
            <div className="bg-black/90 p-2.5 rounded-xl border border-slate-800/80 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 mb-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <HeartPulse className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>DII ECG (1.0 mV/cm)</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-300">
                  {vitals.heartRate} bpm
                </span>
              </div>

              {/* Dynamic Animated ECG Wave SVG */}
              <div className="h-14 w-full relative flex items-center">
                {/* Background ECG Grid lines */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:10px_10px]" />
                <svg viewBox="0 0 360 50" className="w-full h-full stroke-emerald-400 fill-none stroke-[2]">
                  <path d={renderEcgWave()} />
                </svg>
              </div>

              <div className="text-[10px] text-emerald-300/80 truncate mt-1">
                {vitals.ecgDescription}
              </div>
            </div>

            {/* Numeric Vital Sign Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              
              {/* Pressão Arterial */}
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-rose-900/40">
                <span className="text-[9px] text-rose-400 block font-bold">PA NÃO INVASIVA</span>
                <span className="text-sm font-black text-rose-300 block">{vitals.bloodPressure.split(' ')[0]}</span>
                <span className="text-[9px] text-slate-400 leading-tight">mmHg</span>
              </div>

              {/* Respiração */}
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-teal-900/40">
                <span className="text-[9px] text-teal-400 block font-bold">FR RESPIRAÇÃO</span>
                <span className="text-sm font-black text-teal-300 block">{vitals.respiratoryRate}</span>
                <span className="text-[9px] text-slate-400 leading-tight">irpm</span>
              </div>

              {/* Oximetria SpO2 */}
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-sky-900/40">
                <span className="text-[9px] text-sky-400 block font-bold">SpO2 PULSO</span>
                <span className="text-sm font-black text-sky-300 block">{vitals.oxygenSat}%</span>
                <span className="text-[9px] text-slate-400 leading-tight">Plethysmografia</span>
              </div>

              {/* Temperatura Central */}
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-amber-900/40 col-span-2 sm:col-span-1">
                <span className="text-[9px] text-amber-400 block font-bold">TEMP CENTRAL</span>
                <span className="text-sm font-black text-amber-300 block">{vitals.temperature} °C</span>
                <span className="text-[9px] text-slate-400 leading-tight">Termômetro</span>
              </div>

              {/* Glicemia Capilar */}
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-purple-900/40 col-span-2">
                <span className="text-[9px] text-purple-400 block font-bold">GLICEMIA CAPILAR (DEXTRO)</span>
                <span className="text-sm font-black text-purple-300 block">{vitals.glucose}</span>
                <span className="text-[9px] text-slate-400 leading-tight">Descartar hipoglicemia de imediato</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* HOTSPOT DETAIL INSPECTOR CARD (Bottom Section) */}
      <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-4 sm:p-5 shadow-xl relative z-10 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Achado Físico em Foco</span>
              <h3 className="text-sm sm:text-base font-black text-white">
                {activeHotspot.label}
              </h3>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider self-start sm:self-auto ${
            activeHotspot.severity === 'critical' 
              ? 'bg-rose-950 text-rose-300 border border-rose-800' 
              : activeHotspot.severity === 'warning' 
                ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                : 'bg-blue-950 text-blue-300 border border-blue-800'
          }`}>
            Gravidade Clínica: {activeHotspot.severity.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Status Clínico Observado */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              Manifestação no Paciente:
            </span>
            <p className="text-white font-bold text-xs leading-relaxed">
              {activeHotspot.status}
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
              {activeHotspot.shortDesc}
            </p>
          </div>

          {/* Fisiopatologia Molecular do Órgão */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              Mecanismo Fisiopatológico Local:
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              {activeHotspot.detailedMechanisms}
            </p>
          </div>

          {/* Pérola Clínica do Plantão */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/50 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Pérola Prática de Pronto-Socorro:
            </span>
            <p className="text-amber-100 font-medium text-xs leading-relaxed">
              {activeHotspot.clinicalPearls}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
