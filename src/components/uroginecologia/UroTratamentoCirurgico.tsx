import React, { useState } from 'react';
import { 
  Scissors, CheckCircle2, AlertTriangle, ShieldCheck, 
  Layers, Stethoscope, ChevronRight, Info
} from 'lucide-react';

export default function UroTratamentoCirurgico() {
  const [selectedTopic, setSelectedTopic] = useState<'iue_slings' | 'prolapsos_cirurgia' | 'tabela_comparativa'>('iue_slings');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
              Eixo 5 • Princípios Cirúrgicos
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Tratamento Cirúrgico: Slings & Correção Anatômica
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Técnicas cirúrgicas de padrão-ouro: Slings de uretra média (TVT, TOT, Mini-Slings e Autólogo), Colpofixações (Burch, MMK) e reparo reconstrutivo compartimental das distopias (Sacrocolpopexia, Richter, Colpoplastia Sítio-Específica e Perineoplastia).
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300 self-start md:self-auto">
            Padrão-Ouro Reconstrutivo
          </div>
        </div>

        {/* NAVEGAÇÃO DE SUBTÓPICOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setSelectedTopic('iue_slings')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'iue_slings'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>1. Cirurgias de IUE: Slings & Burch</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setSelectedTopic('prolapsos_cirurgia')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'prolapsos_cirurgia'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>2. Correção de Prolapsos Genitais</span>
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
            <span>3. Comparativo TVT vs. TOT</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 1. CIRURGIAS DE IUE */}
      {selectedTopic === 'iue_slings' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Scissors className="text-cyan-400" size={20} />
              Cirurgias Anti-Incontinência de Esforço
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              O princípio fundamental é prover um leito suburetral firme e estável para a uretra média sem causar obstrução urinária nem compressão excessiva:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* SLING RETROPÚBICO (TVT) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">Sling Retropúbico (TVT)</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Ulmsten (1995)
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Trajeto anatômico:</strong> A fita de polipropileno passa da vagina pelo espaço retopúbico (espaço de Retzius) e emerge na pele suprapúbica.</p>
                  <p>• <strong>Indicação primordial:</strong> Padrão-ouro incontestável para <strong>Deficiência Esfincteriana Intrínseca (VLPP &lt; 60 cmH2O)</strong> e uretra fixa com baixa complacência.</p>
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-amber-300">
                    <strong>Regra Mandatória:</strong> <em>Cistoscopia intraoperatória obrigatória</em> para checar integridade da parede vesical (risco de perfuração em 3 a 5%).
                  </div>
                </div>
              </div>

              {/* SLING TRANSOBTURATÓRIO (TOT) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Sling Transobturatório (TOT)</span>
                  <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800">
                    Delorme (2001)
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Trajeto anatômico:</strong> Passa pelo forame obturador através da membrana obturatória, de fora para dentro ou de dentro para fora (TVT-O).</p>
                  <p>• <strong>Indicação primordial:</strong> <strong>Hipermobilidade do colo vesical (VLPP &gt; 90 cmH2O)</strong> com uretra bem vascularizada e bom suporte intrínseco.</p>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                    <strong>Vantagem:</strong> Procedimento mais rápido, sem penetração no abdômen nem espaço retopúbico, eliminando risco de lesão vesical ou intestinal maior. Não necessita cistoscopia de rotina.
                  </div>
                </div>
              </div>

              {/* SLING APONEURÓTICO AUTÓLOGO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Sling Aponeurótico Autólogo</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Caso Prof. André Bernardo
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Técnica:</strong> Coleta-se uma fita da fáscia do músculo reto abdominal (ou fáscia lata) da própria paciente.</p>
                  <p>• <strong>Vantagem Biológica:</strong> Risco ZERO de extrusão ou rejeição a corpo estranho sintético!</p>
                  <p>• Utilizado com sucesso no caso clínico apresentado na aula magna do Prof. Dr. André Bernardo!</p>
                </div>
              </div>

              {/* CIRURGIAS DE BURCH E MMK */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Colpofixação Retropúbica (Burch / MMK)</span>
                  <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800">
                    Via Abdominal / Laparoscópica
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Cirurgia de Burch (1961):</strong> Fixação da fáscia vaginal anterolateral ao ligamento de Cooper (pectíneo). Excelente taxa de cura, hoje indicada principalmente quando a paciente já realizará cirurgia abdominal associada.</p>
                  <p>• <strong>Cirurgia de MMK (1949):</strong> Fixação ao periósteo da sínfise púbica (em desuso pela ocorrência de osteíte púbica incapacitante).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROLAPSOS CIRURGIA */}
      {selectedTopic === 'prolapsos_cirurgia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Layers className="text-cyan-400" size={20} />
              Reconstrução Anatômica dos Prolapsos Genitais
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              O reparo das distopias exige restaurar os 3 níveis de DeLancey sem estreitar ou encurtar a cavidade vaginal funcional:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* COMPARTIMENTO APICAL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Nível I: Apical</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Cúpula & Útero
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Sacrocolpopexia (Padrão-Ouro):</strong>
                    Suspensão da cúpula ao promontório sacral com tela por laparoscopia ou laparotomia. Maior taxa de cura a longo prazo.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Fixação Sacroespinhosa (Richter):</strong>
                    Sutura vaginal da cúpula ao ligamento sacroespinhoso. Ideal para pacientes idosas que não toleram cirurgia abdominal.
                  </div>
                </div>
              </div>

              {/* COMPARTIMENTO ANTERIOR */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">Nível II: Anterior</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Cistocele
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Colpoplastia Sítio-Específica:</strong>
                    Identificação do defeito:
                    <br />• <em>Defeito Central:</em> Plicatura na linha média da fáscia pubocervical.
                    <br />• <em>Defeito Paravaginal:</em> Reinserção da fáscia no Arco Tendíneo da Fáscia Pélvica (ATFP).
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Histerectomia Vaginal:</strong>
                    Realizada quando há prolapso uterino avançado associado (Nível I + II).
                  </div>
                </div>
              </div>

              {/* COMPARTIMENTO POSTERIOR & PERÍNEO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">Nível III: Posterior</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Retocele & Períneo
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Colpoperineoplastia Posterior:</strong>
                    Plicatura do septo retovaginal na borda do iliococcígeo e miorrafia do elevador do ânus.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Reconstituição Perineal:</strong>
                    Aproximação dos músculos bulboesponjoso e transverso superficial para fechar o hiato genital (HG) alargado e reconstruir o corpo perineal (CP).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TABELA COMPARATIVA TVT VS TOT */}
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
                    <th className="p-3.5">Parâmetro de Comparação</th>
                    <th className="p-3.5 text-cyan-400">TVT (Retropúbico)</th>
                    <th className="p-3.5 text-amber-400">TOT (Transobturatório)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3.5 font-bold text-white">Trajeto Anatômico</td>
                    <td className="p-3.5 text-slate-300">Vagina → Espaço de Retzius → Suprapúbico em "U"</td>
                    <td className="p-3.5 text-slate-300">Vagina → Forame Obturador em "V" aberto horizontal</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Melhor Indicação Urodinâmica</td>
                    <td className="p-3.5 font-bold text-cyan-300">Deficiência Esfincteriana Intrínseca (VLPP &lt; 60 cmH2O)</td>
                    <td className="p-3.5 font-bold text-amber-300">Hipermobilidade do Colo Vesical (VLPP &gt; 90 cmH2O)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Necessidade de Cistoscopia</td>
                    <td className="p-3.5 font-bold text-rose-400">SIM, Obrigatória (Risco de perfuração 3-5%)</td>
                    <td className="p-3.5 text-emerald-400 font-semibold">NÃO necessária de rotina (&lt; 0,5%)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Complicações Específicas</td>
                    <td className="p-3.5 text-slate-300">Perfuração de bexiga, hematoma retropúbico, retenção urinária</td>
                    <td className="p-3.5 text-slate-300">Dor na face interna da coxa (raiz da coxa), lesão do nervo obturador</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Eficácia na DEI grave</td>
                    <td className="p-3.5 font-bold text-cyan-300">Superior (maior suporte vetorial vertical)</td>
                    <td className="p-3.5 text-slate-400">Inferior na DEI pura (vetor de tração mais horizontal)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
