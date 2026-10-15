import React from 'react';
import { Stethoscope, Syringe, Activity, AlertOctagon } from 'lucide-react';

export default function UrgPedLaringite() {
  return (
    <div className="space-y-6">
      
      {/* Intro */}
      <div className="bg-slate-800 p-5 rounded-2xl border-l-4 border-amber-500 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="text-amber-400" size={24} />
          <h2 className="text-xl font-bold text-white">Laringite & Crupe Viral</h2>
        </div>
        <p className="text-slate-300">
          Inflamação viral da laringe/traqueia, geralmente desencadeada por parainfluenza, influenza, adenovírus ou rinovírus. Começa com sintomas de IVAS (12-48h) e evolui com obstrução de via aérea superior.
        </p>
      </div>

      {/* Sintomas Table Representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
          <h3 className="text-emerald-400 font-bold mb-2">Laringite</h3>
          <p className="text-slate-300 text-sm">Rouquidão e <br/><span className="text-emerald-300 font-bold">tosse ladrante</span> (metálica).</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
          <h3 className="text-amber-400 font-bold mb-2">Laringotraqueíte</h3>
          <p className="text-slate-300 text-sm">Rouquidão, tosse ladrante, <br/><span className="text-amber-300 font-bold">estridor</span> (predomínio inspiratório) e desconforto respiratório variável.</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
          <h3 className="text-red-400 font-bold mb-2">Laringotraqueobronquite</h3>
          <p className="text-slate-300 text-sm">Quadro acima + tempo expiratório prolongado e <br/><span className="text-red-300 font-bold">sibilos</span>.</p>
        </div>
      </div>

      {/* Conduta */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Syringe className="text-indigo-400" />
          Conduta por Gravidade (Escore Baseado em Estridor, Retração e Sat)
        </h3>
        
        <div className="flex flex-col gap-3">
          {/* Leve */}
          <div className="bg-emerald-950/40 p-4 border border-emerald-900 rounded-xl">
            <h4 className="text-emerald-400 font-bold">LEVE</h4>
            <div className="text-slate-300 text-sm mt-2">
              <span className="font-bold text-white">Dexametasona:</span> 0,15 a 0,3 mg/kg (VO/EV em dose única).<br/>Alta para casa.
            </div>
            {/* Outros corticoides */}
            <div className="text-slate-400 text-xs mt-2 border-t border-slate-800 pt-2">
              (Prednisona: 1-2mg/kg/dia ou Metilprednisolona: 1mg/kg 6/6h)
            </div>
          </div>

          {/* Moderado */}
          <div className="bg-amber-950/40 p-4 border border-amber-900 rounded-xl">
            <h4 className="text-amber-400 font-bold">MODERADO</h4>
            <ul className="text-slate-300 text-sm mt-2 space-y-1">
              <li><strong className="text-amber-200">Nebulização com Epinefrina:</strong> 0,5 ml/kg (máx 5ml - ampolas não diluídas). <span className="text-red-300">Efeito ultrarrápido, mas dura ~2 horas (risco de rebote).</span></li>
              <li><strong className="text-amber-200">Dexametasona:</strong> 0,3 a 0,6 mg/kg (ou Budesonida inalatória 2mg).</li>
              <li>Observação por 3-4 horas. Alta ou internação dependendo da resposta.</li>
            </ul>
          </div>

          {/* Grave */}
          <div className="bg-red-950/40 p-4 border border-red-900 rounded-xl">
            <h4 className="text-red-400 font-bold">SEVERO</h4>
            <ul className="text-slate-300 text-sm mt-2 space-y-1">
              <li><strong className="text-white">Nebulização com Epinefrina:</strong> 5,0 ml.</li>
              <li><strong className="text-white">Dexametasona:</strong> 0,6 mg/kg INTRAMUSCULAR.</li>
              <li><strong className="text-red-300">UTI:</strong> Admissão em Unidade de Terapia Intensiva.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
