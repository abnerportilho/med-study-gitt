import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  Stethoscope, 
  Pill, 
  CheckCircle2, 
  Info, 
  Activity, 
  ArrowRight,
  Dna,
  Layers,
  Flame,
  Sparkles,
  Eye
} from 'lucide-react';
import NeuroEpilepsia from './NeuroEpilepsia';
import NeuroEME from './NeuroEME';

export default function NeuroEpilepsiaEME() {
  const [activeView, setActiveView] = useState<'epilepsia' | 'eme'>('epilepsia');

  return (
    <div className="space-y-6">
      {/* Top Toggle Switch between Epilepsia and EME */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3 px-3 py-1 text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-indigo-400" />
            Tópico Unificado:
          </span>
          <span className="text-slate-400">
            Da Classificação ILAE 2025 ao Manejo do Estado de Mal Epiléptico
          </span>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setActiveView('epilepsia')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeView === 'epilepsia'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Epilepsia & Classificação ILAE 2025
          </button>
          <button
            onClick={() => setActiveView('eme')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeView === 'eme'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Estado de Mal Epiléptico (Protocolo ESETT)
          </button>
        </div>
      </div>

      {/* Render active segment */}
      {activeView === 'epilepsia' ? <NeuroEpilepsia /> : <NeuroEME />}
    </div>
  );
}
