import React from 'react';
import { Target, Activity, AlertCircle, ArrowRight } from 'lucide-react';

export default function CalcioMain() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] z-0">
          <Activity size={200} />
        </div>
        <div className="relative z-10 w-full">
          <div className="flex items-center gap-3 text-emerald-500 mb-3">
            <Activity size={28} className="animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.25em]">Medicina Intensiva</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Distúrbios do Cálcio</h1>
          <p className="text-slate-400 mt-2 max-w-3xl leading-relaxed text-sm md:text-base">
            O Cálcio (Ca++) é fundamental para a contração muscular, coagulação e sinalização neural. Aproximadamente 50% circula ionizado e 45% ligado à albumina sérica.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-900/50 rounded-[2rem] border border-slate-800 p-6 md:p-8 shadow-xl">
        
        {/* Avaliação Inicial - Correção pela Albumina */}
        <div className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-black text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Target size={20} /> A Regra da Albumina
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              O valor do cálcio total sofre interferência direta dos níveis de proteínas. Se a albumina cai, o cálcio total aponta hipocalcemia, mas a fração livre e ativa (Cálcio Iônico) pode estar perfeitamente normal! 
              Sempre pedir o laboratório de Cálcio Iônico, ou corrigir o total.
            </p>
          </div>
          <div className="w-full md:w-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-left shrink-0 min-w-[300px]">
             <span className="text-[10px] text-slate-500 uppercase font-black block mb-2">Fórmula Funcional de Enfermaria</span>
             <div className="text-lg text-white font-mono whitespace-nowrap mb-1">Ca Corrigido</div>
             <div className="text-sm text-emerald-400 font-mono">Ca Total + [ 0.8 x (4.0 - Albumina) ]</div>
          </div>
        </div>

        {/* Hipocalcemia Vs Hipercalcemia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Hipocalcemia */}
          <div className="bg-indigo-950/20 border border-indigo-900/30 p-6 rounded-[2rem]">
            <h4 className="text-2xl font-black text-indigo-400 mb-4 flex items-center gap-2">
               Hipocalcemia (&lt; 8.5)
            </h4>
            
            <div className="space-y-5">
              <div>
                <strong className="text-xs uppercase text-indigo-400 font-black block mb-2">Clínica & Sinais Clássicos</strong>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  Aumento da excitabilidade: Parestesia perioral (formigamento ao redor da boca), cãibras, tetania e convulsões. Sintoma fatal: <strong>Laringoespasmo</strong>.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2 text-center">
                  <div className="bg-slate-950 border border-indigo-900/50 p-3 rounded-xl">
                    <p className="text-xs text-indigo-300 uppercase font-bold tracking-wider mb-1">Chvostek</p>
                    <p className="text-[11px] text-slate-400 font-medium">Contração facial à percussão do n. facial (pré-auricular).</p>
                  </div>
                  <div className="bg-slate-950 border border-indigo-900/50 p-3 rounded-xl">
                    <p className="text-xs text-indigo-300 uppercase font-bold tracking-wider mb-1">Trousseau</p>
                    <p className="text-[11px] text-slate-400 font-medium">Espasmo carpopedal após inflar manguito de PA acima da PAS por 3 min.</p>
                  </div>
                </div>
              </div>

              <div>
                <strong className="text-xs uppercase text-indigo-400 font-black block mb-2">Etiologia & Tratamento</strong>
                <ul className="text-sm text-slate-300 space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>Principal causa:</strong> Hipoparatireoidismo (comum pós tireoidectomia extensa, lesando as paratireoides inadvertidamente).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Na Crise Severa (Sintomática):</strong> Repor Cálcio intravenoso lento na veia periférica, sempre acompanhado de monitorização cardíaca. Use o <strong>Gluconato de Cálcio 10%</strong>. Preferencialmente diluído em SG5% ou Dextrose para evitar precipitação.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hipercalcemia */}
          <div className="bg-orange-950/20 border border-orange-900/40 p-6 rounded-[2rem] shadow-[0_0_30px_rgba(249,115,22,0.05)]">
            <h4 className="text-2xl font-black text-orange-500 mb-4 flex items-center gap-2">
              <AlertCircle size={24} /> Crise Hipercalcêmica (&gt; 10.5)
            </h4>
            
            <div className="space-y-5">
              <div>
                <strong className="text-xs uppercase text-orange-400 font-black block mb-2">Clínica & ECG</strong>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  Depressão do sistema: Confusão mental, rebaixamento de nível de consciência (coma hipercalcêmico), constipação intestinal severa, e <strong>Poliúria grave</strong> (O cálcio no túbulo bloqueia o ADH, gerando um Diabetes Insipidus nefrogênico secundário, desidratando profusamente o paciente).
                </p>
              </div>

              <div>
                <strong className="text-xs uppercase text-orange-400 font-black block mb-2">Conduta Escalada (Múltiplas Frentes)</strong>
                <div className="space-y-3">
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex gap-3">
                    <div className="w-6 h-6 rounded-md bg-orange-500/20 text-orange-400 font-black flex items-center justify-center shrink-0">1</div>
                    <div>
                      <strong className="text-white text-sm block leading-tight">Hidratação Vigorosa Rápida</strong>
                      <span className="text-xs text-slate-400">Ponto chave! Uso agressivo de <strong className="text-orange-300">Soro Fisiológico (2 a 4 Litros no 1º dia)</strong>. Isso dilui o sangue e força o rim a excretar o excesso de cálcio via taxa de filtração glomerular.</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex gap-3">
                    <div className="w-6 h-6 rounded-md bg-orange-500/20 text-orange-400 font-black flex items-center justify-center shrink-0">2</div>
                    <div>
                      <strong className="text-white text-sm block leading-tight">Diurético de Alça (Furosemida)</strong>
                      <span className="text-xs text-slate-400">Após hidratar bem (nunca faça furosemida em paciente seco pela hipercalcemia). O diurético de alça forçadamente "lava" e elimina o cálcio pelo cotransportador. <strong className="text-orange-300">Jamais usar tiazídicos</strong> (eles RETÊM cálcio renal).</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 border border-orange-900/30 p-3 rounded-xl flex gap-3">
                    <div className="w-6 h-6 rounded-md bg-orange-500 font-black text-slate-900 flex items-center justify-center shrink-0">3</div>
                    <div>
                      <strong className="text-white text-sm block leading-tight">Inibir o Osso: Bifosfonatos</strong>
                      <span className="text-xs text-slate-400">Nos casos malignos, prescrever <strong className="text-white">Ácido Zoledrônico IV</strong> ou Pamidronato. Bloqueiam os osteoclastos. O efeito demora de 48 a 72 horas para inciar e atuar profundamente.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
