import React from 'react';
import { Wind, Syringe, ShieldAlert } from 'lucide-react';

export default function UrgPedAsma() {
  return (
    <div className="space-y-6">

      {/* Bronquiolite */}
      <div className="bg-sky-950/40 p-5 rounded-2xl border border-sky-900 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Wind className="text-sky-400" size={24} />
          <h2 className="text-xl font-bold text-white">Bronquiolite</h2>
        </div>
        <p className="text-sky-100 text-sm mb-3">
          Infecção do trato respiratório inferior (VRS é o principal), comum em menores de 2 anos. Causa impactação de muco e inflamação nos bronquíolos.
        </p>
        <div className="bg-red-900/50 p-3 rounded-lg border border-red-800 text-center mb-4">
          <p className="font-bold text-red-200 uppercase tracking-widest">Bronquiolite NÃO é a Asma do Bebê</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div>
            <h4 className="font-bold text-sky-300 mb-2">Clínica</h4>
            <ul className="space-y-1">
              <li>• Taquidispneia, tosse, chiado (sibilos).</li>
              <li>• Pródromos de coriza. Pode haver febre.</li>
              <li>• Diminuição de apetite / irritabilidade.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-emerald-300 mb-2">Conduta</h4>
            <p><strong>De Suporte.</strong> Não há medicação específica.</p>
            <ul className="space-y-1 mt-1">
              <li>• Hidratação oral ou EV.</li>
              <li>• Oxigênio se SatO2 baixa.</li>
              <li>• Fisioterapia respiratória / Lavagem nasal.</li>
              <li>• Teste terapêutico com broncodilatador é controverso, mas pode ser tentado caso haja componente de hiperreatividade.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 my-4" />

      {/* Asma Crise Grave */}
      <div className="bg-indigo-950/40 p-5 rounded-2xl border border-indigo-900 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <ShieldAlert className="text-indigo-400" size={24} />
          <h2 className="text-xl font-bold text-white">Crise de Asma (Manejo no PS)</h2>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-900 text-slate-400 text-xs uppercase">
               <tr>
                <th className="px-2 py-2">Parâmetro</th>
                <th className="px-2 py-2">Leve/Mod</th>
                <th className="px-2 py-2">Grave</th>
                <th className="px-2 py-2 text-red-400">Muito Grave</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-slate-800">
                <td className="px-2 py-1 font-bold">Fala</td>
                <td className="px-2 py-1">Frases completas</td>
                <td className="px-2 py-1">Frases parciais</td>
                <td className="px-2 py-1 text-red-300">Monossilábica / Pausa</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="px-2 py-1 font-bold">Retrações</td>
                <td className="px-2 py-1">Ausente / Leve</td>
                <td className="px-2 py-1">Acentuada</td>
                <td className="px-2 py-1 text-red-300">Exaustão (Tórax Silente)</td>
              </tr>
              <tr>
                <td className="px-2 py-1 font-bold">SatO2</td>
                <td className="px-2 py-1">&gt; 95%</td>
                <td className="px-2 py-1">91 - 95%</td>
                <td className="px-2 py-1 text-red-300">&lt; 90%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><Syringe size={16} /> Protocolo Escalonado</h3>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="bg-slate-900 p-3 rounded border-l-4 border-blue-500">
            <strong>Passo 1 (Hora 0):</strong> Oxigênio se &lt; 93%. Iniciar Corticoide sistêmico (Prednisolona 1-2mg/kg VO ou Hidrocortisona EV).
          </div>
          <div className="bg-slate-900 p-3 rounded border-l-4 border-yellow-500">
            <strong>Passo 2 (Hora 1):</strong> Salbutamol (Aerolin®): 1 jato para cada 2kg (Ex: 6kg = 3 jatos). Fazer 3 ciclos a cada 20 min (na 1ª hora). Reavaliar!
          </div>
          <div className="bg-slate-900 p-3 rounded border-l-4 border-orange-500">
            <strong>Passo 3/4 (Hora 2):</strong> Se não melhora, manter corticoide, adicionar <strong>Ipratrópio (Atrovent®)</strong> em nebulização (10 a 20 gotas).
          </div>
          <div className="bg-slate-900 p-3 rounded border-l-4 border-red-500">
            <strong>Passo 5 a 8 (Hora 3-5 - Grave/Refratária):</strong> Rx Tórax, considerar Sulfato de Magnésio EV (25-100mg/kg lenta). Aminofilina EV ataque. Considerar UTI.
          </div>
        </div>

        <div className="mt-4 p-3 bg-indigo-900/50 rounded-lg text-xs leading-relaxed text-indigo-200">
          <strong className="text-white block mb-1">Para Casa (Alta após estabilidade 3/3h sem O2):</strong>
          - Salbutamol: 1 jato a cada 2kg SN.<br/>
          - Prednisolona: 1-2mg/kg/dia por 3 a 5 dias.<br/>
          - Orientar espaçador com máscara adequada.
        </div>
      </div>

    </div>
  );
}
