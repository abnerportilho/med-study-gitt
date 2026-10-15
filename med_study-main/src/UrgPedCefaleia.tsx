import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';

export default function UrgPedCefaleia() {
  return (
    <div className="space-y-6">
      <div className="bg-fuchsia-950/40 border border-fuchsia-900 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Activity className="text-fuchsia-400"/> Cefaleias na Infância
        </h2>
        <p className="text-fuchsia-100 text-sm">
          A causa mais comum de cefaleia em crianças são as <strong>Infecções de Vias Aéreas Superiores (IVAS)</strong>. No entanto, é fundamental triar sinais de alarme e diferenciar outras causas primárias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tipos Primarios */}
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <h3 className="text-emerald-400 font-bold mb-3">Cefaleias Primárias</h3>
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded-lg border-l-2 border-emerald-500">
              <h4 className="text-white font-bold text-sm">Migrânea (Enxaqueca)</h4>
              <p className="text-xs text-slate-300 mt-1">
                Episódios de 1 a 72h. Localizada, pulsátil, piora com esforço. Pode ter náuseas, vômitos, foto/fonofobia. Na infância, <strong>geralmente é bilateral e frontal</strong>. Cerca de 10% tem aura.
              </p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border-l-2 border-slate-500">
              <h4 className="text-white font-bold text-sm">Tensional</h4>
              <p className="text-xs text-slate-300 mt-1">
                Dor contínua, aperto, intensidade leve a moderada, bilateral. <strong>Sem prior com esforço</strong> físico rotineiro. Sem foto/fonofobias marcantes. Dura 30 min a 7 dias.
              </p>
            </div>
          </div>
        </div>

        {/* Sinais de Alarme */}
        <div className="bg-red-950/30 p-5 rounded-xl border border-red-900/50">
          <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2">
            <ShieldAlert size={18} /> Red Flags (Indicação Imagem)
          </h3>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• Idade inferior a 3 anos.</li>
            <li>• Piora progressiva na frequência/intensidade.</li>
            <li>• Alteração de coordenação motora ou <strong>Sinais Focais</strong>.</li>
            <li>• Cefaleia que desperta a criança do sono.</li>
            <li>• Pior cefaleia da vida / Súbita ("Thunderclap").</li>
            <li>• Associada a trauma craniano importante.</li>
          </ul>
          <p className="text-xs text-slate-400 mt-3 italic">
            Obs: Tomografia sem contraste para trauma; Com contraste se suspeita de LOE (tumor).
          </p>
        </div>
      </div>

      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-bold text-indigo-400 mb-3">Manejo das Crises</h3>
        <p className="text-sm text-slate-300 mb-4">
          O <strong>Ibuprofeno</strong> é considerado o fármaco de primeira linha para crise (inibe a produção de prostaglandinas).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-indigo-950 p-3 rounded-xl border border-indigo-900">
            <p className="font-bold text-white mb-1">Ibuprofeno</p>
            <p className="text-sm text-indigo-300">5 a 15 mg/kg/dose</p>
          </div>
          <div className="bg-indigo-950 p-3 rounded-xl border border-indigo-900">
            <p className="font-bold text-white mb-1">Paracetamol</p>
            <p className="text-sm text-indigo-300">10 a 15 mg/kg/dose</p>
          </div>
          <div className="bg-indigo-950 p-3 rounded-xl border border-indigo-900">
            <p className="font-bold text-white mb-1">Dipirona</p>
            <p className="text-sm text-indigo-300">10 a 20 mg/kg/dose</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4">
          Fora da crise: evitar privação de sono, estresse, odores, jejum prolongado, queijos, chocolate. Estimular atividade física.
        </p>
      </div>

    </div>
  );
}
