import React from 'react';
import { Stethoscope, Biohazard, Syringe } from 'lucide-react';

export default function UrgPedFaringite() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Viral */}
        <div className="bg-slate-800 p-5 rounded-2xl border-t-4 border-indigo-500 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Biohazard className="text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Faringite Viral</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Causa mais comum de odinofagia. (Adenovírus, EBV, Rinovírus).
          </p>
          <div className="bg-slate-900 p-3 rounded-lg flex-1 mb-4">
            <h4 className="text-indigo-300 font-bold text-sm mb-2">Quadro Clínico</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Dor de garganta, febre baixa.</li>
              <li>• Tosse, coriza, rouquidão (Sinais de IVAS).</li>
              <li>• <span className="text-amber-400">Exame Físico:</span> Hiperemia difusa, sem exsudato purulento na maioria (adenovírus/EBV podem ter exsudato). Vesículas/úlceras (Coxsackie/Herpes).</li>
            </ul>
          </div>
          <div className="border-t border-slate-700 pt-3">
            <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2"><Syringe size={14}/> Sintomáticos</h4>
            <ul className="text-slate-400 text-xs space-y-1">
              <li>Cetoprofeno (20mg/ml): 1 gota/kg 8/8h (Máx 25 gotas)</li>
              <li>Ibuprofeno (100mg/ml): 1 gota/kg 8/8h (Máx 20 gotas)</li>
            </ul>
          </div>
        </div>

        {/* Bacteriana */}
        <div className="bg-slate-800 p-5 rounded-2xl border-t-4 border-red-500 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="text-red-400" />
            <h3 className="text-xl font-bold text-white">Amigdalite Bacteriana</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Agente freq: <span className="text-red-300 font-bold">Streptococcus Grupo A</span>. Muito infrequente em &lt; 2 anos (comum entre 5-15 anos).
          </p>
          <div className="bg-slate-900 p-3 rounded-lg flex-1 mb-4">
            <h4 className="text-red-300 font-bold text-sm mb-2">Quadro Clínico</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• <span className="text-white font-bold">Início súbito:</span> Dor intensa, febre alta, hálito cetônico.</li>
              <li>• <span className="text-white font-bold">Ausência</span> de sinais de IVAS (sem tosse, espirros).</li>
              <li>• <span className="text-amber-400">Exame Físico:</span> Exsudato purulento nas amígdalas, adenomegalia cervical dolorosa, petéquias no palato.</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="bg-red-950/30 p-5 rounded-xl border border-red-900 mt-4">
        <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2"><Syringe /> Antibioticoterapia para S. pyogenes</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-red-200 uppercase bg-red-900/50">
              <tr>
                <th className="px-4 py-2">Antibiótico</th>
                <th className="px-4 py-2">Dose / Posologia</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-red-900/50">
                <td className="px-4 py-2 font-bold text-white">Amoxicilina</td>
                <td className="px-4 py-2">50mg/kg/dia 12/12h (Max 500mg/dose) por 10 dias. <strong className="text-emerald-400">1ª Escolha</strong></td>
              </tr>
              <tr className="border-b border-red-900/50">
                <td className="px-4 py-2 font-bold text-white">Penicilina Benzatina</td>
                <td className="px-4 py-2">&lt;27kg: 600.000UI | &gt;27kg: 1.200.000UI (Dose Única IM)</td>
              </tr>
              <tr className="border-b border-red-900/50">
                <td className="px-4 py-2 font-bold text-white">Cefalexina</td>
                <td className="px-4 py-2">40mg/kg/dia 12/12h (Max 500mg/dose) por 10 dias</td>
              </tr>
              <tr className="border-b border-red-900/50">
                <td className="px-4 py-2 font-bold text-white">Azitromicina</td>
                <td className="px-4 py-2">12mg/kg/dia 24/24h (Max 500mg/dose) por 5 dias</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
