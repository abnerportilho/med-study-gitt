import React, { useState } from 'react';
import { 
  Table, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Pill,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { TOXIDROMES_DATABASE } from './toxisindromesData';

export default function ToxidromeMatrixComparator() {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedSyndromeA, setSelectedSyndromeA] = useState('serotoninergica');
  const [selectedSyndromeB, setSelectedSyndromeB] = useState('neuroleptica');

  const toxList = Object.values(TOXIDROMES_DATABASE);

  const toxA = TOXIDROMES_DATABASE[selectedSyndromeA];
  const toxB = TOXIDROMES_DATABASE[selectedSyndromeB];

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-400 mb-1">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Diagnóstico Diferencial Cruzado</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Matriz Comparativa das Toxidromes
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Compare os discriminantes físicos essenciais (Pupilas, Sudorese, Tônus, Reflexos, Início e Antídotos) para resolução imediata de dúvidas no plantão.
        </p>
      </div>

      {/* QUICK COMPARISON DUEL (A vs B) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Duelo Clínico Direto (Diferenciação Crítica)</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedSyndromeA}
              onChange={e => setSelectedSyndromeA(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
            >
              {toxList.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <span className="text-xs font-black text-slate-500">VS</span>

            <select
              value={selectedSyndromeB}
              onChange={e => setSelectedSyndromeB(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
            >
              {toxList.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Duel Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card Síndrome A */}
          <div className={`p-4 rounded-xl border ${toxA.badgeBg} ${toxA.badgeBorder} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-black ${toxA.accentColor}`}>{toxA.name}</span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{toxA.categoryBadge}</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Pupilas:</span>
                <span className="font-bold text-white text-right">{toxA.pupil.label}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Pele & Suor:</span>
                <span className="font-bold text-white text-right">{toxA.hotspots.skin.status}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Tônus & Reflexos:</span>
                <span className="font-bold text-white text-right">{toxA.hotspots.neuromuscular.status}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Peristalse / TGI:</span>
                <span className="font-bold text-white text-right">{toxA.hotspots.abdomen.status.split(',')[0]}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Antídoto:</span>
                <span className="font-bold text-emerald-400 text-right">{toxA.antidoteProtocol.drug}</span>
              </div>
            </div>
          </div>

          {/* Card Síndrome B */}
          <div className={`p-4 rounded-xl border ${toxB.badgeBg} ${toxB.badgeBorder} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-black ${toxB.accentColor}`}>{toxB.name}</span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{toxB.categoryBadge}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Pupilas:</span>
                <span className="font-bold text-white text-right">{toxB.pupil.label}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Pele & Suor:</span>
                <span className="font-bold text-white text-right">{toxB.hotspots.skin.status}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Tônus & Reflexos:</span>
                <span className="font-bold text-white text-right">{toxB.hotspots.neuromuscular.status}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Peristalse / TGI:</span>
                <span className="font-bold text-white text-right">{toxB.hotspots.abdomen.status.split(',')[0]}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-slate-400 font-semibold">Antídoto:</span>
                <span className="font-bold text-emerald-400 text-right">{toxB.antidoteProtocol.drug}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FULL MATRIX TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-slate-300 font-mono uppercase text-[10px] border-b border-slate-800">
            <tr>
              <th className="p-3.5">Toxidrome</th>
              <th className="p-3.5">Pupilas</th>
              <th className="p-3.5">Pele / Sudorese</th>
              <th className="p-3.5">FC / PA</th>
              <th className="p-3.5">Neuromuscular</th>
              <th className="p-3.5">Antídoto Específico</th>
              <th className="p-3.5">Armadilha Fatal Proibida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-950 font-medium">
            {toxList.map(tox => (
              <tr key={tox.id} className="hover:bg-slate-900/60 transition-colors">
                
                {/* Name */}
                <td className="p-3.5">
                  <div className="font-black text-white text-xs">{tox.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{tox.categoryBadge}</div>
                </td>

                {/* Pupils */}
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    tox.pupil.sizeMm < 2.5 
                      ? 'bg-blue-950 text-blue-300 border border-blue-800' 
                      : tox.pupil.sizeMm > 5.5 
                        ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                        : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tox.pupil.sizeMm} mm ({tox.pupil.sizeMm < 2.5 ? 'Miose' : tox.pupil.sizeMm > 5.5 ? 'Midríase' : 'Normal'})
                  </span>
                </td>

                {/* Skin / Sweat */}
                <td className="p-3.5 text-slate-300 text-[11px]">
                  {tox.hotspots.skin.status.includes('Seca') || tox.hotspots.skin.status.includes('ÁRIDA') ? (
                    <span className="text-rose-400 font-bold">Seca / Anidrose ("Dry")</span>
                  ) : tox.hotspots.skin.status.includes('Diaforese') || tox.hotspots.skin.status.includes('encharcada') ? (
                    <span className="text-emerald-400 font-bold">Molhada / Diaforese Profusa</span>
                  ) : (
                    <span>Normal</span>
                  )}
                </td>

                {/* Vitals */}
                <td className="p-3.5 text-[11px] font-mono">
                  <div className={tox.vitals.heartRate > 100 ? 'text-rose-300 font-bold' : tox.vitals.heartRate < 60 ? 'text-blue-300 font-bold' : 'text-slate-300'}>
                    FC: {tox.vitals.heartRate} bpm
                  </div>
                  <div className="text-[10px] text-slate-400">
                    PA: {tox.vitals.bloodPressure.split(' ')[0]}
                  </div>
                </td>

                {/* Neuromuscular */}
                <td className="p-3.5 text-[11px] text-slate-300">
                  {tox.hotspots.neuromuscular.status.includes('CLÔNUS') ? (
                    <span className="text-indigo-400 font-bold">CLÔNUS + Hiperreflexia</span>
                  ) : tox.hotspots.neuromuscular.status.includes('CANO DE CHUMBO') ? (
                    <span className="text-orange-400 font-bold">Rigidez Cano de Chumbo + CPK</span>
                  ) : tox.hotspots.neuromuscular.status.includes('DISTONIA') ? (
                    <span className="text-lime-400 font-bold">Distonia (Trismo/Torcicolo)</span>
                  ) : tox.hotspots.neuromuscular.status.includes('Flacidez') || tox.hotspots.neuromuscular.status.includes('Hipotonia') ? (
                    <span className="text-blue-400 font-bold">Flacidez / Hiporreflexia</span>
                  ) : (
                    <span>Tremores / Convulsões</span>
                  )}
                </td>

                {/* Antidote */}
                <td className="p-3.5">
                  <div className="font-bold text-white text-xs">
                    {tox.antidoteProtocol.drug.split('+')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {tox.antidoteProtocol.class.split('/')[0]}
                  </div>
                </td>

                {/* Prohibited trap */}
                <td className="p-3.5 max-w-xs">
                  <div className="text-[10px] text-rose-300 font-bold line-clamp-2">
                    {tox.prohibitedTraps[0]?.trapTitle}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
