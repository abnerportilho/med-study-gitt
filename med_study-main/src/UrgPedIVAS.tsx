import React from 'react';
import { AlertCircle, Stethoscope, Syringe, Biohazard, Activity } from 'lucide-react';

export default function UrgPedIVAS() {
  return (
    <div className="space-y-6">
      
      <div className="bg-indigo-900 border border-indigo-700 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Biohazard className="text-indigo-400" size={24} />
          <h2 className="text-xl font-bold text-white">IVAS e Resfriado Comum</h2>
        </div>
        <p className="text-indigo-100 leading-relaxed mb-4">
          Infecção viral autolimitada (7 a 10 dias, podendo durar mais em crianças) das vias aéreas superiores, altamente contagiosa (gotículas e contato). Agentes principais: <strong>Rinovírus</strong>, adenovírus, vírus sinciciais, influenza e coronavírus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clinica */}
        <div className="bg-slate-800 p-5 rounded-2xl border-l-4 border-emerald-500">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="text-emerald-400" />
            <h3 className="text-lg font-bold text-emerald-100">Clínica</h3>
          </div>
          <ul className="space-y-2 text-slate-300">
            <li>• Coriza (clara evoluindo para espessa) e Congestão nasal</li>
            <li>• Espirros e Tosse (principalmente ao deitar)</li>
            <li>• Dor de garganta leve</li>
            <li>• Febre baixa e mal-estar</li>
            <li><span className="text-amber-400 font-bold">Importante:</span> Catarro verde <strong>não é sinônimo</strong> de uso de antibióticos.</li>
          </ul>
        </div>

        {/* Conduta */}
        <div className="bg-slate-800 p-5 rounded-2xl border-l-4 border-violet-500">
          <div className="flex items-center gap-2 mb-3">
            <Syringe className="text-violet-400" />
            <h3 className="text-lg font-bold text-violet-100">Conduta: Sintomáticos</h3>
          </div>
          <p className="text-slate-300 mb-2">Tratamento de suporte. Antibióticos <strong>NÃO</strong> indicados.</p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li><strong className="text-violet-300">Lavagem Nasal:</strong> Soro 0,9%. <br/>(Bebês 3-6m: 0,5 a 1ml; &gt;6m: 1ml/kg até 20ml por narina).</li>
            <li><strong className="text-violet-300">Dipirona (500mg/ml):</strong> 0,7 gota/kg 6/6h se dor/febre (Máx 35 gotas).</li>
            <li><strong className="text-violet-300">Paracetamol (200mg/ml):</strong> 1 gota/kg 6/6h (Máx 35 gotas).</li>
            <li><strong className="text-violet-300">Ibuprofeno (50mg/ml):</strong> 1 gota/kg 6/6h (Máx 40 gotas).</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
