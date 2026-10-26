import React from 'react';
import { Stethoscope, Syringe, Activity, AlertOctagon } from 'lucide-react';

export default function UrgPedPneumonia() {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-900 border border-indigo-700 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Activity className="text-indigo-400"/> Pneumonia Adquirida na Comunidade (PAC)
        </h2>
        <p className="text-indigo-100 text-sm">
          A maior parte tem origem viral (66% - VSR em &lt;5 anos; Adenovírus). Bacteriana isolada corresponde a 8%, mista 7%. Em etiologia bacteriana: <strong>S. pneumoniae 91%</strong>, <strong>H. influenzae 23%</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clinica */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="text-emerald-400 font-bold mb-2">Diferenciação Clínica</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-slate-900 p-3 rounded">
              <strong className="text-white block mb-1">Bacteriana:</strong>
              <p className="text-slate-300">Febre alta, tosse produtiva, dor abdominal e torácica, prostração, toxemia gravidade progressiva, dificuldade alimentar, taquipneia.</p>
            </div>
            <div className="bg-slate-900 p-3 rounded">
              <strong className="text-white block mb-1">Viral:</strong>
              <p className="text-slate-300">Febre baixa, tosse seca ou catarral, cefaleia, sibilância e hipoxemia frequentes.</p>
            </div>
          </div>
        </div>

        {/* Gravidade */}
        <div className="bg-red-950/30 p-4 rounded-xl border border-red-900/50">
          <h3 className="text-red-400 font-bold mb-2">Critérios de Gravidade / Internação</h3>
          <ul className="text-slate-300 text-sm space-y-1 list-disc pl-4">
            <li>Toxemia ou quadro séptico.</li>
            <li>Idade &lt; 6 meses.</li>
            <li>SatO2 &lt; 90% (ar ambiente).</li>
            <li>Incapacidade de aceitar medicação via oral / vômitos.</li>
            <li>Complicações: derrame pleural, abscesso, pneumatocele.</li>
            <li>Fatores de risco social ou comorbidades descompensadas.</li>
          </ul>
          <div className="mt-2 bg-red-900/60 p-2 rounded text-xs text-white">
            <strong>Admissão UTI se:</strong> Intubação, instabilidade HD, Alt. consciência, ou SatO2 &lt; 92% com FiO2 &gt;50%.
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Syringe size={18} className="text-indigo-400"/> Tratamento Ambulatorial (Empírico)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-indigo-900/30 text-indigo-200 uppercase text-xs">
              <tr>
                <th className="px-3 py-2">Idade</th>
                <th className="px-3 py-2">PAC não grave</th>
                <th className="px-3 py-2">Falha Terapêutica / Alternativa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700/50">
                <td className="px-3 py-2 font-bold text-white">&lt; 2 meses</td>
                <td className="px-3 py-2 text-red-300 font-bold" colSpan={2}>Sempre Internar. (Ampicilina + Amicacina)</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="px-3 py-2 font-bold text-white">2m a 5 anos</td>
                <td className="px-3 py-2"><strong>Amoxicilina</strong> 50mg/kg/d 12/12h</td>
                <td className="px-3 py-2">Amoxc+Clav (50mg/kg base) ou Cefuroxima (30mg/kg) 12/12h</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-white">&gt; 5 anos</td>
                <td className="px-3 py-2"><strong>Amoxicilina</strong> 50mg/kg/d <br/><span className="text-xs text-slate-400">Se suspeita atípica: Azitromicina (10mg/kg/1xd por 5d) ou Claritromicina (15mg/kg 12/12h)</span></td>
                <td className="px-3 py-2">Amoxc+Clav ou Cefuroxima. (Adicionar macrolídeo).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-950/30 p-5 rounded-2xl border border-amber-900/50">
        <h3 className="text-amber-400 font-bold mb-2">Derrame Parapneumônico</h3>
        <p className="text-slate-300 text-sm mb-2">Suspeitar se febre houver febre diária persistente, dor torácica e toxemia após 48h de ATB.</p>
        <div className="flex gap-4 text-xs font-mono bg-slate-900 p-3 rounded text-slate-300 overflow-hidden">
          <div className="flex-1">
            <strong className="text-emerald-400">Derrame Benigno</strong><br/>
            pH &gt; 7.1<br/>
            Glicose &gt; 60<br/>
            DHL &lt; 1000 UI<br/>
            <i>Cd: Punções seriadas</i>
          </div>
          <div className="flex-1 border-l border-slate-700 pl-4">
            <strong className="text-red-400">Empiema</strong><br/>
            pH &lt; 7.1<br/>
            Glicose &lt; 40<br/>
            DHL &gt; 1000 UI<br/>
            <i>Cd: Drenagem fechada em selo d'água</i>
          </div>
        </div>
      </div>

    </div>
  );
}
