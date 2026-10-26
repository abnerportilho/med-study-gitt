import React from 'react';
import { ShieldAlert, Activity, Info } from 'lucide-react';

export default function UrgPedTCE() {
  return (
    <div className="space-y-6">
      
      <div className="bg-orange-950/40 border border-orange-900 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Activity className="text-orange-400"/> Traumatismo Cranioencefálico (TCE)
        </h2>
        <p className="text-orange-100 text-sm">
          A principal causa de atendimento por trauma na pediatria. Em &lt; 2 anos, os maus tratos são importantes (lesões graves em aprox. 20%). Escore de gravidade: Glasgow. <strong>Leve: 14-15 | Mod: 9-13 | Grave: &lt;= 8</strong>.
        </p>
        <div className="mt-3 bg-orange-900/50 p-2 rounded text-xs text-white flex items-start gap-2">
          <Info size={16} className="shrink-0 mt-0.5" />
          <p>O <strong>Raio-X de Crânio não tem utilidade</strong> para excluir lesão intracraniana. Muitas lesões graves não apresentam fratura óssea no RX, e suturas abertas causam confusão. A indicação de radiografia é nula neste cenário; usamos Critérios PECARN para indicar TC.</p>
        </div>
      </div>

      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2"><ShieldAlert size={18}/> Critérios PECARN para Indicação de TC (TCE LEVE)</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Menor de 2 anos */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-slate-800 px-4 py-2 font-bold text-slate-200">
              Idade &lt; 2 Anos
            </div>
            <div className="p-4 space-y-3 flex-1">
              <div>
                <p className="text-red-400 text-xs font-bold mb-1 uppercase tracking-wider">Alta Risco (TC Obrigatória se 1+)</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Glasgow &lt; 15 ou Alteração de Mente/Consciência</li>
                  <li>• Suspeita de fratura de crânio palpável</li>
                </ul>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <p className="text-amber-400 text-xs font-bold mb-1 uppercase tracking-wider">Risco Intermediário (Observar 4-6h ou TC)</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Hematoma não frontal (occipital/parietal/temporal)</li>
                  <li>• Perda de Consciência &ge; 5 seg</li>
                  <li>• Mecanismo Grave (Ejeção, atropelamento sem capacete, queda &gt; 1m, objeto de alto impacto)</li>
                  <li>• Comportamento Anormal com os Pais</li>
                </ul>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <p className="text-emerald-400 text-xs font-bold mb-1 uppercase tracking-wider">Baixo Risco (Sem itens acima)</p>
                <p className="text-sm text-slate-300">Não realizar TC. Observação clínica.</p>
              </div>
            </div>
          </div>

          {/* Maior que 2 anos */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-slate-800 px-4 py-2 font-bold text-slate-200">
              Idade &ge; 2 Anos
            </div>
            <div className="p-4 space-y-3 flex-1">
              <div>
                <p className="text-red-400 text-xs font-bold mb-1 uppercase tracking-wider">Alta Risco (TC Obrigatória se 1+)</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Glasgow &lt; 15 ou Alteração de Mente/Consciência</li>
                  <li>• Susinais de fratura de BASE de crânio</li>
                </ul>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <p className="text-amber-400 text-xs font-bold mb-1 uppercase tracking-wider">Risco Intermediário (Observar 4-6h ou TC)</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• História de Vômitos Importantes</li>
                  <li>• Perda de Consciência</li>
                  <li>• Cefaleia Intensa</li>
                  <li>• Mecanismo Grave (Queda &gt; 1,5m, etc)</li>
                </ul>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <p className="text-emerald-400 text-xs font-bold mb-1 uppercase tracking-wider">Baixo Risco (Sem itens acima)</p>
                <p className="text-sm text-slate-300">Não realizar TC. Observação clínica curtas e alta.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
