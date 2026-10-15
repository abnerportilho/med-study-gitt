import React from 'react';
import { Target, Zap, Activity, AlertCircle, ArrowRight } from 'lucide-react';

export default function PotassioMain() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] z-0">
          <Zap size={200} />
        </div>
        <div className="relative z-10 w-full">
          <div className="flex items-center gap-3 text-amber-500 mb-3">
            <Zap size={28} className="animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.25em]">Medicina Intensiva</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Distúrbios do Potássio</h1>
          <p className="text-slate-400 mt-2 max-w-3xl leading-relaxed text-sm md:text-base">
            O Potássio (K+) é primariamente intracelular e dita a excitabilidade da membrana celular, especialmente no coração. A hipercalemia é a arritmia de origem metabólica mais fatal na emergência.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-900/50 rounded-[2rem] border border-slate-800 p-6 md:p-8 shadow-xl">
        
        {/* Normal Values */}
        <div className="bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Activity size={20} /> Faixa Normal
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              O valor normal em adultos é de <strong className="text-white">3,5 a 5,5 mEq/L</strong>. <br/>
              98% do K+ está DENTRO da célula. Alterações mínimas no sangue (2%) causam desastres elétricos miocárdicos. <strong className="text-amber-400">Mudanças de pH: acidemia empurra o K+ para fora, a alcalemia joga para dentro.</strong>
            </p>
          </div>
          <div className="w-full md:w-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Reposição Extrema K &lt; 3.0 IV</span>
            <div className="text-white text-sm font-mono whitespace-nowrap">Velocidade Máx Periférica: <strong className="text-amber-400">10 mEq/h</strong></div>
            <div className="text-white text-sm font-mono whitespace-nowrap">Velocidade Máx Central: <strong className="text-amber-400">20 mEq/h</strong></div>
          </div>
        </div>

        {/* Hipocalemia Vs Hipercalemia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Hipocalemia */}
          <div className="bg-slate-950/60 border border-slate-700/50 p-6 rounded-[2rem]">
            <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
              <Target className="text-cyan-500" size={24} /> Hipocalemia (&lt; 3.5)
            </h4>
            
            <div className="space-y-5">
              <div>
                <strong className="text-xs uppercase text-cyan-500 font-black block mb-2">Clínica & ECG</strong>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Fraqueza muscular ascendente, cãibras, íleo paralítico e falência respiratória (casos severos).
                </p>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl mt-2">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Evolução no ECG</p>
                  <p className="text-sm text-white font-medium">Achatamento de onda T &rarr; Aparece Onda U &rarr; Depressão ST &rarr; Prolonga QT.</p>
                </div>
              </div>

              <div>
                <strong className="text-xs uppercase text-cyan-500 font-black block mb-2">Abordagem & Reposição</strong>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                    <span><strong>Nunca repor com Soro Glicosado!</strong> A liberação de insulina endógena empurrará o potássio recém-reposto de volta para a célula, piorando a hipocalemia inicial. Use Soro Fisiológico (salina 0.9%).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                    <span>Se K+ &gt; 3.0 e paciente que tolera dieta oral: Prefira reposição via VO (xarope KCl 6% - 1ml = 0.8 mEq).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                    <span><strong className="text-white bg-red-500/20 px-1 rounded">Refratário?</strong> Cheque o <strong className="text-white">Magnésio</strong>. A hipomagnesemia causa aumento das perdas renais de potássio, tornando a hipocalemia impossível de corrigir sem antes repor Mg.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hipercalemia */}
          <div className="bg-rose-950/20 border border-rose-900/50 p-6 rounded-[2rem] shadow-[0_0_30px_rgba(244,63,94,0.05)]">
            <h4 className="text-2xl font-black text-rose-500 mb-4 flex items-center gap-2">
              <AlertCircle size={24} /> Hipercalemia (&gt; 5.5)
            </h4>
            
            <div className="space-y-5">
              <div>
                <strong className="text-xs uppercase text-rose-400 font-black block mb-2">Clínica & ECG (Emergência Médica)</strong>
                <p className="text-sm text-slate-300 leading-relaxed mb-3">
                  Causada por insuficiência renal severa, rabdomiólise traumática (extravasamento celular), ou iECA/Espironolactona.
                </p>
                <div className="bg-rose-950/40 border border-rose-900/50 p-3 rounded-xl mt-2">
                  <p className="text-xs text-rose-400 uppercase font-bold tracking-widest mb-1">Evolução no ECG</p>
                  <p className="text-sm text-white font-medium mb-1">
                    1. Onda T apiculada (em tenda)<br/>
                    2. Achatamento P e Prolonga QRS<br/>
                    3. Ritmo Idioventricular (Padrão Sinusoidal) &rarr; PCR.
                  </p>
                </div>
              </div>

              <div>
                <strong className="text-xs uppercase text-rose-400 font-black block mb-2">Conduta Sistematizada (A Escadinha)</strong>
                <div className="space-y-3">
                  <div className="bg-slate-950 border border-rose-900/30 p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-black text-rose-400 mb-1 block">Passo 1: Estabilizar Membrana</span>
                    <strong className="text-white text-sm block leading-tight">Gluconato de Cálcio 10% (1 ampola IV lenta)</strong>
                    <span className="text-xs text-slate-400">Obrigatório ANTES de tudo se houver alteração de ECG (T apiculada). Não baixa o K, apenas protege o ventrículo por ~30min.</span>
                  </div>
                  <div className="bg-slate-950 border border-orange-900/30 p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-black text-orange-400 mb-1 block">Passo 2: "Shift" Intracelular (Esconder o K+)</span>
                    <strong className="text-white text-sm block leading-tight">Solução Polarizante (Glicoinsulina) &amp; B2 Inalatório</strong>
                    <span className="text-xs text-slate-400">Insulina empurra rápido o K para a célula. O Soro Glicosado (SG50%) evita hipoglicemia. O Beta-2 Agonista auxilia no influxo de K+.</span>
                  </div>
                  <div className="bg-slate-950 border border-emerald-900/30 p-3 rounded-xl">
                    <span className="text-[10px] uppercase font-black text-emerald-400 mb-1 block">Passo 3: Eliminação (Tirar do corpo)</span>
                    <strong className="text-white text-sm block leading-tight">Furosemida, Sorcal ou Hemodiálise</strong>
                    <span className="text-xs text-slate-400">Os passos 1 e 2 são "paliativos urgentes". O potássio ainda está no corpo! Você precisa forçar a diurese, ou diálise de urgência (em caso de anúria grave).</span>
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
