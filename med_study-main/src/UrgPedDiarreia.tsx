import React from 'react';
import { ShieldAlert, Droplets, Syringe } from 'lucide-react';

export default function UrgPedDiarreia() {
  return (
    <div className="space-y-6">
      
      <div className="bg-sky-950/40 border border-sky-900 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Droplets className="text-sky-400"/> Diarreia Aguda e Desidratação
        </h2>
        <p className="text-sky-100 text-sm">
          Três ou mais evacuações amolecidas/líquidas por dia. Origem viral (Rotavírus, norovírus) ou bacteriana (E. coli, Shigella, Salmonella). Associado com frequência à desidratação (a principal morbidade).
        </p>
      </div>

      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2"><ShieldAlert className="text-red-400" size={18}/> Avaliação do Grau de Desidratação</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-900 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-2 py-2">Sinal Clínico</th>
                <th className="px-2 py-2 text-emerald-400 border-l border-slate-700">Hidratado (Plano A)</th>
                <th className="px-2 py-2 text-amber-400 border-l border-slate-700">Algum Grau (Plano B)</th>
                <th className="px-2 py-2 text-red-400 border-l border-slate-700">Grave (Plano C)</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-slate-700/50">
                <td className="px-2 py-2 font-bold">Estado Geral</td>
                <td className="px-2 py-2 border-l border-slate-700">Alerta e ativo</td>
                <td className="px-2 py-2 border-l border-slate-700 text-amber-200">Irritado ou sedento</td>
                <td className="px-2 py-2 border-l border-slate-700 text-red-300 font-bold">Letárgico / Coma</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="px-2 py-2 font-bold">Olhos & Lágrimas</td>
                <td className="px-2 py-2 border-l border-slate-700">Normais, lágrima +</td>
                <td className="px-2 py-2 border-l border-slate-700">Fundos, sem lágrimas</td>
                <td className="px-2 py-2 border-l border-slate-700 text-red-300">Muito fundos, sem lágrima</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="px-2 py-2 font-bold">Boca e Língua</td>
                <td className="px-2 py-2 border-l border-slate-700">Úmidas</td>
                <td className="px-2 py-2 border-l border-slate-700">Secas</td>
                <td className="px-2 py-2 border-l border-slate-700">Muito secas</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="px-2 py-2 font-bold">Sinal da Prega</td>
                <td className="px-2 py-2 border-l border-slate-700">Desaparece rápido</td>
                <td className="px-2 py-2 border-l border-slate-700 text-amber-200">Lento (&lt; 2s)</td>
                <td className="px-2 py-2 border-l border-slate-700 text-red-300 font-bold">Mto lento (&gt; 2s)</td>
              </tr>
              <tr>
                <td className="px-2 py-2 font-bold">Pulso / Ench. Capilar</td>
                <td className="px-2 py-2 border-l border-slate-700">Cheio / &lt;3s</td>
                <td className="px-2 py-2 border-l border-slate-700">Fino / 3-10s</td>
                <td className="px-2 py-2 border-l border-slate-700 text-red-300 font-bold">Fino ou Impalpável / &gt;10s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Terapia Hidratação */}
        <div className="bg-sky-900/30 p-5 rounded-2xl border border-sky-800">
          <h3 className="text-sky-300 font-bold mb-3">Terapia de Reidratação</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-900 p-3 rounded-lg border-l-2 border-emerald-500">
              <strong className="text-emerald-400 text-sm">Plano A (Domiciliar)</strong>
              <p className="text-xs text-slate-300 mt-1">Soro de reidratação oral após cada evacuação. &lt;1 ano: 50-100ml. 1-10 anos: 100-200ml.</p>
            </div>
            
            <div className="bg-slate-900 p-3 rounded-lg border-l-2 border-red-500">
              <strong className="text-red-400 text-sm">Plano C (Soroterapia EV Rápida - Choque)</strong>
              <div className="text-xs text-slate-300 mt-1 space-y-1">
                <p>Volume: Soro Fisiológico 0,9% EV. E avaliar a fase de manutenção (Holiday Segar).</p>
                <ul className="pl-3 mt-1">
                  <li>• &lt; 1 ano: 10ml/kg (reavaliar/repetir até 3x em 30 min)</li>
                  <li>• 1 - 5 a: 20ml/kg (reavaliar/repetir até hidratação)</li>
                  <li>• &gt; 5 anos: 30ml/kg (reavaliar/repetir até hidratação)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Medicações Sintomáticas */}
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
          <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2"><Syringe size={18}/> Manejo do Vômito / Adjuvantes</h3>
          
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded-lg">
              <strong className="text-white text-sm">Antieméticos</strong>
              <ul className="text-xs text-slate-300 space-y-1 mt-1">
                <li>• <strong>Ondansetrona (Vonau®):</strong> VO Sublingual (2-11 anos: 4mg 3x/dia). EV: 0,15 mg/kg.</li>
                <li>• <strong>Dimenidrinato (Dramin®):</strong> VO 1 gt/kg 6/6h. EV: 1,25 mg/kg.</li>
                <li>• <strong>Bromoprida (Digesan®):</strong> VO 1-2 gt/kg 8/8h (&gt;1 ano).</li>
              </ul>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg">
              <strong className="text-white text-sm">Zinco & Probióticos</strong>
              <ul className="text-xs text-slate-300 space-y-1 mt-1">
                <li>• <strong>Zinco (Biozinc):</strong> 20mg/dia por 10-14 dias. Ajuda na recuperação epitelial.</li>
                <li>• <strong>Probióticos:</strong> (Saccharomyces boulardii) 1-2x ao dia.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
