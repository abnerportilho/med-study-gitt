import React, { useState } from 'react';
import { 
  Layers, Scale, CheckCircle2, HelpCircle, 
  Sparkles, Activity, ShieldAlert, Award, Calculator, Info
} from 'lucide-react';

export default function EndoClassificacoes() {
  // Calculadora interativa do EFI (Endometriosis Fertility Index)
  const [ageScore, setAgeScore] = useState<number>(2); // 0 (≥40), 1 (36-39), 2 (≤35)
  const [infertilityYears, setInfertilityYears] = useState<number>(2); // 0 (>3 anos), 2 (≤3 anos)
  const [pregnancyHistory, setPregnancyHistory] = useState<number>(1); // 0 (nunca engravidou), 1 (já engravidou prévia)
  const [leastFunctionScore, setLeastFunctionScore] = useState<number>(3); // LF score pós-operatório (0 a 3)
  const [asrmEndoScore, setAsrmEndoScore] = useState<number>(1); // 0 se rASRM endo score > 71, 1 se ≤ 71
  const [asrmTotalScore, setAsrmTotalScore] = useState<number>(1); // 0 se total ASRM score > 71, 1 se ≤ 71

  const efiTotal = ageScore + infertilityYears + pregnancyHistory + leastFunctionScore + asrmEndoScore + asrmTotalScore;

  const getEfiPregnancyRate = (score: number) => {
    if (score >= 9) return { rate: '75% a 85%', desc: 'Excelente prognóstico para gestação espontânea (tentar coito programado por 6 a 12 meses)' };
    if (score >= 7) return { rate: '55% a 70%', desc: 'Bom prognóstico de gestação espontânea' };
    if (score >= 5) return { rate: '40% a 50%', desc: 'Prognóstico intermediário (considerar reprodução assistida precoce / IIU / FIV)' };
    return { rate: '10% a 25%', desc: 'Baixo prognóstico para concepção espontânea (indicação formal de Fertilização in Vitro - FIV)' };
  };

  const efiResult = getEfiPregnancyRate(efiTotal);

  return (
    <div className="space-y-8">
      {/* HEADER DO EIXO 5 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <Scale size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Eixo 5 · Sistemas de Classificação & Estadiamento
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              5. Cada Sistema de Classificação Responde a uma Pergunta Clínica
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          Não existe um sistema único universal. A classificação <strong>rASRM</strong> quantifica a extensão cirúrgica; a <strong>Fenotípica</strong> categoriza a profundidade; o <strong>#Enzian</strong> mapeia a anatomia compartimental para a cirurgia profunda; e o <strong>EFI</strong> estima a probabilidade de gravidez espontânea.
        </p>
      </div>

      {/* TABELA COMPARATIVA DOS 4 SISTEMAS */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Layers size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Visão Geral dos 4 Sistemas de Classificação
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
            Comparativo Clínico
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Sistema</th>
                <th className="py-3 px-3">O que avalia? (A Pergunta)</th>
                <th className="py-3 px-3">Escala / Categorias</th>
                <th className="py-3 px-3">Principal Utilidade</th>
                <th className="py-3 px-3">Limitação Crítica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-bold text-rose-400">rASRM (Revisado)</td>
                <td className="py-3 px-3">Extensão anatômica de implantes e aderências pélvicas</td>
                <td className="py-3 px-3 font-mono text-white">Estágios I a IV (Pontuação 1 a &gt;40)</td>
                <td className="py-3 px-3">Linguagem cirúrgica padronizada histórica</td>
                <td className="py-3 px-3 text-rose-300"><strong>Não se correlaciona com a dor</strong> nem prevê infertilidade</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-bold text-cyan-400">Fenotípica</td>
                <td className="py-3 px-3">Tipo biológico e profundidade anatômica das lesões</td>
                <td className="py-3 px-3 text-white">Peritoneal, Ovariana e Profunda</td>
                <td className="py-3 px-3">Compreensão clínica e decisão do método de imagem</td>
                <td className="py-3 px-3 text-slate-400">Diferentes fenótipos frequentemente coexistem</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-bold text-purple-400">#Enzian / rEnzian</td>
                <td className="py-3 px-3">Mapa compartimental da endometriose profunda infiltrativa</td>
                <td className="py-3 px-3 font-mono text-white">Comp. A (vagina/septo), B (uterossacros), C (reto), F (extra)</td>
                <td className="py-3 px-3">Planejamento cirúrgico multidisciplinar e laudos de USG/RM</td>
                <td className="py-3 px-3 text-slate-400">Complexidade na aplicação ambulatorial não especializada</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-bold text-emerald-400">EFI (Endometriosis Fertility Index)</td>
                <td className="py-3 px-3">Chance de gestação espontânea após cirurgia em inférteis</td>
                <td className="py-3 px-3 font-mono text-white">Pontuação de 0 a 10</td>
                <td className="py-3 px-3">Decisão de conduta reprodutiva (Coito programado vs FIV)</td>
                <td className="py-3 px-3 text-slate-400">Requer avaliação cirúrgica prévia da função tubo-ovariana</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ALERTA DE OURO SOBRE rASRM E DOR */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600 text-xs text-amber-200 leading-relaxed">
          ⚡ <strong>ESTÁGIO rASRM NÃO PREDIZ DOR:</strong> Uma paciente em Estágio I (mínimo, com poucos implantes peritoneais) pode ter dor pélvica refratária de nota 10/10, enquanto uma paciente em Estágio IV (grave, com aderências extensas e endometriomas) pode ser completamente assintomática para dor.
        </div>
      </div>

      {/* SISTEMA #ENZIAN / rENZIAN EM DETALHES */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Scale size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Sistema #Enzian: O Mapa da Doença Profunda por Compartimentos
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
            Cirurgia & Imagem
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
              Compartimento A
            </span>
            <strong className="text-white block font-bold">Vagina & Septo Retovaginal</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Nódulos infiltrando o fundo de saco vaginal posterior e o tecido conjuntivo entre a vagina e a parede retal anterior.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              Compartimento B
            </span>
            <strong className="text-white block font-bold">Uterossacros & Paramétrios</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Ligamentos uterossacros, toro uterino e estruturas parametriais laterais (com risco de proximidade ao trajeto do ureter).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              Compartimento C
            </span>
            <strong className="text-white block font-bold">Reto & Sigmoide</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Infiltração da parede muscular do reto (até 16 cm da margem anal) e cólon sigmoide (guia a necessidade de shaving, discóide ou ressecção segmentar).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
              Sítios F (Extragenitais)
            </span>
            <strong className="text-white block font-bold">Bexiga, Ureter e Outros</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              FB (bexiga), FU (ureter), FI (intestino delgado/apêndice), FD (diafragma) e FN (nervos pélvicos).
            </p>
          </div>
        </div>
      </div>

      {/* CALCULADORA INTERATIVA DO EFI (ENDOMETRIOSIS FERTILITY INDEX) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Calculator size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Calculadora Interativa do EFI (Endometriosis Fertility Index)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
            Escore Prognóstico 0 a 10
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PARÂMETROS HISTÓRICOS & CIRÚRGICOS */}
          <div className="lg:col-span-2 space-y-4 text-xs">
            {/* IDADE */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-200 block">1. Idade da Paciente:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '≤ 35 anos (+2 pts)', value: 2 },
                  { label: '36 a 39 anos (+1 pt)', value: 1 },
                  { label: '≥ 40 anos (+0 pts)', value: 0 }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setAgeScore(opt.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      ageScore === opt.value
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TEMPO DE INFERTILIDADE */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-200 block">2. Tempo de Infertilidade:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '≤ 3 anos (+2 pts)', value: 2 },
                  { label: '> 3 anos (+0 pts)', value: 0 }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setInfertilityYears(opt.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      infertilityYears === opt.value
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ANTECEDENTE GESTACIONAL */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-200 block">3. Gestação Prévia (Qualquer desfecho):</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Sim, já engravidou (+1 pt)', value: 1 },
                  { label: 'Não, nuligesta (+0 pts)', value: 0 }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setPregnancyHistory(opt.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      pregnancyHistory === opt.value
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* LEAST FUNCTION SCORE */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-200 block">4. Least Function Score Cirúrgico (Função Tubária/Fímbria pós-cirurgia):</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Excelente / Normal (+3 pts)', value: 3 },
                  { label: 'Levemente comprometida (+2 pts)', value: 2 },
                  { label: 'Gravemente danificada (+1 pt)', value: 1 },
                  { label: 'Não funcionante bilateral (+0 pts)', value: 0 }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setLeastFunctionScore(opt.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      leastFunctionScore === opt.value
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTADO DO EFI */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Resultado do Escore EFI
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white font-mono">{efiTotal}</span>
                <span className="text-sm font-bold text-slate-400">/ 10 pontos</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Taxa Estimada de Gravidez Espontânea (36m):</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{efiResult.rate}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {efiResult.desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-[11px] text-slate-400 border border-slate-800">
              💡 <em>O EFI é uma das ferramentas com maior nível de evidência (Grau A) para evitar perda de tempo em casais que precisam de Fertilização in Vitro imediata versus aqueles que podem tentar gestação natural.</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
