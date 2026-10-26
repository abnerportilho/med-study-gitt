import React from 'react';
import { ShieldAlert, Syringe, Biohazard } from 'lucide-react';

export default function UrgPedSinusite() {
  return (
    <div className="space-y-6">
      
      <div className="bg-sky-900 border border-sky-700 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Biohazard className="text-sky-300" size={24} />
          <h2 className="text-xl font-bold text-white">Sinusite (Rinossinusite Bacteriana Aguda)</h2>
        </div>
        <p className="text-sky-100 text-sm leading-relaxed mb-4">
          Infecção secundária a um quadro viral prévio (resfriado comum) que não melhora no tempo habitual ou apresenta piora (dupla piora). É atípica em menores de 1 ano, pois os seios paranasais ainda estão em desenvolvimento.
        </p>
        <div className="bg-sky-950 p-3 rounded-lg text-xs flex items-center gap-2">
          <ShieldAlert className="text-sky-400 shrink-0" size={16} />
          <span><strong className="text-white">Não solicitar Raio-X!</strong> O diagnóstico é clínico. RX não tem boa sensibilidade ou especificidade e leva à radiação desnecessária.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clinica */}
        <div className="bg-slate-800 p-5 rounded-2xl border-l-4 border-sky-500">
          <h3 className="text-lg font-bold text-sky-200 mb-3">Sintomas (Diagnóstico Clínico)</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• Quadro persistente de IVAS (&gt; 10 dias) com piora.</li>
            <li>• Obstrução e secreção nasal anterior ou posterior (clara ou purulenta).</li>
            <li>• Dor ou pressão facial (região maxilar/frontal). Cefaleia ao abaixar a cabeça.</li>
            <li>• Tosse (muito comum em crianças, especialmente noturna).</li>
            <li>• Hiposmia/Anosmia, febre (se etiologia bacteriana) e halitose.</li>
          </ul>
        </div>
        
        {/* Agentes */}
        <div className="bg-slate-800 p-5 rounded-2xl border-l-4 border-slate-600">
          <h3 className="text-lg font-bold text-slate-200 mb-3">Etiologia & Formação dos Seios</h3>
          <p className="text-slate-300 text-sm mb-3">
            Principalmente <i>S. pneumoniae</i>, <i>H. influenzae</i> e <i>M. catarrhalis</i>.
          </p>
          <div className="text-xs space-y-1 bg-slate-900 p-3 rounded-xl border border-slate-700">
            <p><strong className="text-sky-300">Maxilar / Etmoidal:</strong> Origem vida intra-uterina (pres. no RX ao nascimento).</p>
            <p><strong className="text-sky-300">Esfenoidal:</strong> Forma aos 1-2 anos. RX aos 3 anos.</p>
            <p><strong className="text-sky-300">Frontal:</strong> Acima de 6 meses-1 ano. RX só após 3-7 anos.</p>
          </div>
        </div>
      </div>

      {/* Conduta */}
      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2"><Syringe size={18}/> Conduta: Antimicrobianos</h3>
        <p className="text-sm text-slate-300 mb-4">Tratar os sintomas de base com lavagem nasal e analgesia.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-emerald-900/30 text-emerald-200">
              <tr>
                <th className="px-3 py-2">Medicamento</th>
                <th className="px-3 py-2">Posologia / Observação</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700/50">
                <td className="px-3 py-2 font-bold text-white">Amoxicilina</td>
                <td className="px-3 py-2">45-50 mg/kg/dia <span className="text-emerald-400 font-bold ml-2">1ª Linha</span></td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="px-3 py-2 font-bold text-white">Amoxc-Clavulanato</td>
                <td className="px-3 py-2">Amoxc (45-90 mg/kg/d) + Clavulanato (6,4 mg/kg/d)</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="px-3 py-2 font-bold text-white whitespace-nowrap">Alt: Cefuroxima</td>
                <td className="px-3 py-2">30 mg/kg/dia 12/12h. (Uso em alérgicos leves à penicilina)</td>
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="px-3 py-2 font-bold text-white whitespace-nowrap">Alt: Claritromicina</td>
                <td className="px-3 py-2">15 mg/kg/dia 12/12h.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-white whitespace-nowrap">Alt: Ceftriaxona</td>
                <td className="px-3 py-2">50 mg/kg/dia IM ou IV 1x dia por 3 dias (casos refratários ou graves).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
