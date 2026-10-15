import React, { useState } from 'react';
import { 
  Scissors, ShieldCheck, AlertTriangle, CheckCircle2, 
  Layers, Stethoscope, ChevronRight, Info
} from 'lucide-react';

export default function UroIncontinenciaCirurgico() {
  const [selectedTopic, setSelectedTopic] = useState<'slings' | 'tabela_comparativa' | 'burch_outras'>('slings');

  return (
    <div className="space-y-6">
      {/* HEADER DO SUBMÓDULO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <span className="p-1 rounded-md bg-cyan-950 border border-cyan-800">
                <Scissors size={14} />
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                Tratamento Cirúrgico da Incontinência
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Slings de Uretra Média (TVT & TOT) & Burch
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Padrão-ouro para Incontinência Urinária de Esforço: Princípio do suporte uretral médio sem compressão, indicação urodinâmica pela VLPP (&lt; 60 vs &gt; 90 cmH2O), slings autólogos e cirurgia de Burch.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300 self-start md:self-auto">
            Padrão-Ouro IUE
          </div>
        </div>

        {/* NAVEGAÇÃO DE SUBTÓPICOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setSelectedTopic('slings')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'slings'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>1. Slings de Uretra Média (TVT, TOT, Autólogo)</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setSelectedTopic('tabela_comparativa')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'tabela_comparativa'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>2. Tabela Comparativa TVT vs. TOT</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setSelectedTopic('burch_outras')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'burch_outras'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>3. Colpofixações (Burch & MMK)</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 1. SLINGS DE URETRA MÉDIA */}
      {selectedTopic === 'slings' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Scissors className="text-cyan-400" size={20} />
              Técnicas de Slings Suburetrais
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Ao contrário das cirurgias clássicas que elevavam o colo vesical acima da sínfise, os <strong>slings de uretra média</strong> fornecem uma rede suburetral dinâmica e sem tensão onde a uretra se comprime ativamente apenas no momento do aumento da pressão intra-abdominal:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* TVT */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">TVT (Retropúbico)</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Ulmsten (1995)
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Trajeto:</strong> Vagina → Espaço Retopúbico (Retzius) → Pele Suprapúbica em formato de "U".</p>
                  <p>• <strong>Eleição Absoluta:</strong> Deficiência Esfincteriana Intrínseca (<strong>VLPP &lt; 60 cmH2O</strong>) e uretra pouco complacente.</p>
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-amber-300 font-semibold">
                    ⚠️ Mandatório: Cistoscopia intraoperatória obrigatória para afastar perfuração da bexiga (risco de 3 a 5%).
                  </div>
                </div>
              </div>

              {/* TOT */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">TOT (Transobturatório)</span>
                  <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800">
                    Delorme (2001)
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Trajeto:</strong> Vagina → Forame Obturador em "V" horizontal aberto.</p>
                  <p>• <strong>Eleição:</strong> Hipermobilidade do colo vesical pura (<strong>VLPP &gt; 90 cmH2O</strong>).</p>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                    <strong>Vantagem:</strong> Não acessa o espaço de Retzius, eliminando risco de perfuração visceral abdominal. Não exige cistoscopia rotineira. Dor transitória na raiz da coxa em 10%.
                  </div>
                </div>
              </div>

              {/* SLING AUTÓLOGO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Sling Aponeurótico Autólogo</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Fáscia do Reto
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Origem Biológica:</strong> Coleta de fita de 1,5 x 8 cm da aponeurose do músculo reto abdominal (ou fáscia lata).</p>
                  <p>• <strong>Indicação de Ouro:</strong> Pacientes com extrusão prévia de tela sintética, radioterapia prévia ou que recusam próteses inorgânicas.</p>
                  <p>• Utilizado com sucesso no caso clínico do Prof. Dr. André Bernardo!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TABELA COMPARATIVA TVT VS TOT */}
      {selectedTopic === 'tabela_comparativa' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="text-cyan-400" size={20} />
              Quadro Comparativo: Sling Retropúbico (TVT) vs. Transobturatório (TOT)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3.5">Critério de Análise</th>
                    <th className="p-3.5 text-cyan-400">TVT (Retropúbico)</th>
                    <th className="p-3.5 text-amber-400">TOT (Transobturatório)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3.5 font-bold text-white">Trajeto Anatômico</td>
                    <td className="p-3.5 text-slate-300">Vagina → Espaço de Retzius → Pele Suprapúbica em "U"</td>
                    <td className="p-3.5 text-slate-300">Vagina → Forame Obturador em "V" horizontal</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Indicação Urodinâmica Padrão</td>
                    <td className="p-3.5 font-bold text-cyan-300">Deficiência Esfincteriana Intrínseca (VLPP &lt; 60 cmH2O)</td>
                    <td className="p-3.5 font-bold text-amber-300">Hipermobilidade do Colo Vesical (VLPP &gt; 90 cmH2O)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Cistoscopia Intraoperatória</td>
                    <td className="p-3.5 font-bold text-rose-400">SIM, Obrigatória (Risco perfuração 3-5%)</td>
                    <td className="p-3.5 text-emerald-400 font-semibold">NÃO necessária de rotina (&lt; 0,5%)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Complicações Específicas</td>
                    <td className="p-3.5 text-slate-300">Perfuração de bexiga, retenção urinária obstrutiva, hematoma de Retzius</td>
                    <td className="p-3.5 text-slate-300">Dor na raiz da coxa (face interna), risco de lesão do nervo obturador</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Eficácia na Uretra Rígida</td>
                    <td className="p-3.5 font-bold text-cyan-300">Superior (vetor de força mais vertical)</td>
                    <td className="p-3.5 text-slate-400">Inferior na DEI pura (vetor de força horizontal)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. BURCH E MMK */}
      {selectedTopic === 'burch_outras' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Layers className="text-cyan-400" size={20} />
              Colpofixações Retropúbicas (Cirurgia de Burch & MMK)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <span className="font-bold text-cyan-300 text-sm block">Cirurgia de Burch (1961)</span>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Fixação:</strong> Suturas bilaterais ancorando a fáscia vaginal anterolateral ao <strong>ligamento pectíneo (ligamento de Cooper)</strong>.</p>
                  <p>• <strong>Indicação Atual:</strong> Excelente cirurgia clássica, hoje realizada preferencialmente quando a paciente já tem indicação de procedimento laparotômico ou laparoscópico abdominal associado (ex: sacrocolpopexia concomitante).</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-white text-sm block">Cirurgia de Marshall-Marchetti-Krantz (MMK)</span>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Fixação:</strong> Sutura ao periósteo da sínfise púbica.</p>
                  <p>• <strong>Status Atual:</strong> Em <strong>desuso</strong> devido à ocorrência de osteíte púbica incapacitante e de difícil tratamento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
