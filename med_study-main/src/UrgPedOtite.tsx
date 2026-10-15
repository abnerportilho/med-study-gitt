import React from 'react';
import { Activity, Syringe, AlertCircle } from 'lucide-react';

export default function UrgPedOtite() {
  return (
    <div className="space-y-8">
      
      {/* Otite Externa */}
      <div>
        <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
          <Activity /> Otite Externa (Otite do Nadador)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
          <div className="bg-slate-800 p-4 rounded-xl border border-teal-900 border-l-4">
            <h4 className="font-bold text-white mb-2">Clínica & Diagnóstico</h4>
            <ul className="space-y-1 text-sm">
              <li>• Comum no verão (piscinas e praias). Ocorre pela umidade excessiva ou traumas locais.</li>
              <li>• Etiologia: <i>P. aeruginosa</i> e <i>S. aureus</i> ou fungos.</li>
              <li>• <span className="text-teal-300 font-bold">Dor à palpação/tração do pavilhão ou tragus.</span></li>
              <li>• Sensação de ouvido obstruído, diminuição da audição.</li>
              <li>• Otoscopia: Edema do conduto, redução do calibre e pus escasso e espesso.</li>
            </ul>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-teal-900 border-l-4">
            <h4 className="font-bold text-white mb-2">Conduta</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong className="text-teal-300">Otociriax® (Ciprofloxacino + Hidrocortisona):</strong> 3 gotas 12/12h por 7 dias.</li>
              <li>• <strong className="text-teal-300">Oto-Xilodase® (Lidocaína + Neomicina):</strong> 5 gotas 12/12h por 7 dias.</li>
              <li>• Analgesia via oral.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 my-2"></div>

      {/* Otite Média Aguda */}
      <div>
        <h3 className="text-xl font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
          <AlertCircle /> Otite Média Aguda (OMA)
        </h3>
        
        <div className="mb-4 bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-slate-300 mb-2">
            Inflamação do ouvido médio, extremamente comum até 5 anos. Etiologia 75% bacteriana (<i>S. pneumoniae</i>, <i>H. influenzae</i>, <i>M. catarrhalis</i>) e 25% viral.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-900 p-3 rounded-lg border border-fuchsia-900/50">
              <h4 className="text-fuchsia-300 font-bold mb-1">Clínica</h4>
              <p className="text-xs">Otalgia (puxar/esfregar a orelha), febre, irritabilidade, anorexia, vômito/diarreia, otorreia purulenta (se perfuração).</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-fuchsia-900/50">
              <h4 className="text-fuchsia-300 font-bold mb-1">Diagnóstico (Otoscopia)</h4>
              <p className="text-xs">Leve abaulamento da Membrana Timpânica (início &lt;48h), efusão da orelha média. Pode haver eritema.</p>
            </div>
          </div>
        </div>

        <div className="bg-fuchsia-950/20 p-5 rounded-xl border border-fuchsia-900/50">
          <h4 className="text-fuchsia-300 font-bold mb-3 flex items-center gap-2"><Syringe size={18}/> Conduta & Tratamento</h4>
          
          <div className="mb-4 bg-slate-900 p-3 rounded-lg text-sm">
            <p><strong className="text-white">&lt; 6 meses:</strong> Tratar SEMPRE com antibiótico.</p>
            <p><strong className="text-white">&gt; 6 meses:</strong> Tratar se sinais de gravidade (otalgia mod/grave, otalgia &gt;48h, Temp &gt;39°C) E/OU OMA bilateral.</p>
            <p className="text-xs text-slate-400 mt-1">Ausência de gravidade: Decisão com os pais. Observar e reavaliar 48-72h.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs text-fuchsia-200 uppercase bg-fuchsia-900/50 border-b border-fuchsia-800">
                <tr>
                  <th className="px-3 py-2">Medicamento</th>
                  <th className="px-3 py-2">Dose / Detalhes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-fuchsia-900/30">
                  <td className="px-3 py-2 font-bold text-white">Amoxicilina (Primeira Escolha)</td>
                  <td className="px-3 py-2">50mg/kg/dia 12/12h. (Usa-se 90mg/kg/dia se uso &lt;90 dias, frequenta creche ou &lt;2 anos).</td>
                </tr>
                <tr className="border-b border-fuchsia-900/30">
                  <td className="px-3 py-2 font-bold text-white">Amoxicilina + Clavulanato</td>
                  <td className="px-3 py-2">Amoxc 90mg/kg/d + Clav 6,4mg/kg/d 12/12h. <span className="text-slate-400 block text-xs">(OMA &lt;30 dias da última ou conjuntivite purulenta associada)</span></td>
                </tr>
                <tr className="border-b border-fuchsia-900/30">
                  <td className="px-3 py-2 font-bold text-white">Azitromicina (Alternativa)</td>
                  <td className="px-3 py-2">10mg/kg/dia 24/24h por 5 dias.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
