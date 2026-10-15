import React, { useState } from 'react';
import { 
  Baby, Calendar, Clock, AlertTriangle, ShieldAlert, 
  CheckCircle2, ArrowRight, Activity, HelpCircle, Layers, SplitSquareVertical
} from 'lucide-react';

export default function USGPrimeiroTriDatacao() {
  const [dumDiffDays, setDumDiffDays] = useState<number>(6);
  const [gestationalTrim, setGestationalTrim] = useState<'1' | '2' | '3'>('1');

  // Cálculo da decisão de redatação
  const getRedatingAdvice = () => {
    if (gestationalTrim === '1') {
      if (dumDiffDays > 5) {
        return {
          redate: true,
          limit: 5,
          text: 'Redatar a Idade Gestacional pelo Ultrassom (Diferença > 5 dias no 1º trimestre). O USG precoce pelo CCN torna-se a Data Provável do Parto (DPP) definitiva.'
        };
      }
      return {
        redate: false,
        limit: 5,
        text: 'Manter a Datação pela DUM (Diferença ≤ 5 dias). Pequenas variações decorrem de flutuações biométricas biológicas normais.'
      };
    } else if (gestationalTrim === '2') {
      const limit = 10;
      if (dumDiffDays > limit) {
        return {
          redate: true,
          limit: limit,
          text: 'Redatar a Idade Gestacional pelo Ultrassom (Diferença > 10 dias entre 16 e 22 semanas).'
        };
      }
      return {
        redate: false,
        limit: limit,
        text: 'Manter a Datação pela DUM (Diferença ≤ 10 dias no 2º trimestre precoce).'
      };
    } else {
      const limit = 21;
      if (dumDiffDays > limit) {
        return {
          redate: true,
          limit: limit,
          text: 'Redatar com cautela extrema (Diferença > 21 dias no 3º trimestre). Alto risco de erro biométrico e confusão com Restrição de Crescimento Fetal (RCF).'
        };
      }
      return {
        redate: false,
        limit: limit,
        text: 'Manter a Datação pela DUM (Diferença ≤ 21 dias no 3º trimestre).'
      };
    }
  };

  const advice = getRedatingAdvice();

  return (
    <div className="space-y-6">
      {/* INTRODUÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Baby size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 2 · Ultrassonografia Precoce & Datação
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              2. 1º Trimestre Precoce, Critérios de Inviabilidade e a Regra de Ouro da Datação
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          A correta datação gestacional no primeiro trimestre é a decisão clínica isolada com maior impacto em todo o pré-natal: define o momento de rastreios bioquímicos/genéticos, o diagnóstico real de Restrição de Crescimento Fetal (RCF) e a conduta exata diante de pós-datismo ou prematuridade.
        </p>
      </div>

      {/* MARCOS CRONOLÓGICOS DO 1º TRIMESTRE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
          <Clock size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Marcos Ultrassonográficos Normais (Via Transvaginal)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Saco Gestacional */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">1. Saco Gestacional (SG)</span>
              <span className="text-xs font-mono text-cyan-400 font-bold">4,5 a 5 semanas</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Primeira estrutura ecográfica identificável. Pequena imagem anecoica arredondada, excêntrica no endométrio, circundada pelo halo hiperecogênico trofoblástico (<strong>sinal da dupla decídua</strong>).
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
              Visível habitualmente com <strong>β-hCG &gt; 1.000 a 2.000 mUI/mL</strong> (zona de discriminação). Se β-hCG &gt; 2.000 sem SG intraútero &rarr; alta suspeita de gestação ectópica!
            </div>
          </div>

          {/* Vesícula Vitelínica */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">2. Vesícula Vitelínica (VV)</span>
              <span className="text-xs font-mono text-amber-400 font-bold">5 a 5,5 semanas</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Estrutura circular de paredes finas ecogênicas e centro anecoico dentro do saco gestacional. <strong>Confirma com 100% de certeza que o saco é intrauterino verdadeiro</strong> (afasta pseudossaco de ectópica).
            </p>
            <div className="text-[11px] text-amber-300/90 bg-amber-950/30 p-2 rounded-lg border border-amber-900/50">
              Diâmetro normal: <strong>3 mm a 6 mm</strong>. VV &gt; 6 mm ou irregular/calcificada é preditor de prognóstico reprodutivo reservado e abortamento.
            </div>
          </div>

          {/* Embrião e BCF */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">3. Embrião e BCF</span>
              <span className="text-xs font-mono text-rose-400 font-bold">6 a 6,5 semanas</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Estrutura linear aderida à vesícula vitelínica. O batimento cardíaco fetal (BCF) torna-se visível quando o Comprimento Cabeça-Nádega (CCN) atinge &ge; 2-3 mm.
            </p>
            <div className="text-[11px] text-rose-300/90 bg-rose-950/30 p-2 rounded-lg border border-rose-900/50">
              Frequência Cardíaca Fetal inicial: 100-115 bpm (6 sem), acelerando para 140-170 bpm (9 sem). Bradicardia embrionária (&lt; 90-100 bpm) indica risco de perda gestacional.
            </div>
          </div>
        </div>
      </div>

      {/* CRITÉRIOS DE GESTAÇÃO NÃO VIÁVEL / ABORTAMENTO (ISUOG/ACOG) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-900/70 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2.5 text-rose-400">
          <ShieldAlert size={22} />
          <h4 className="text-base md:text-lg font-black text-white">
            Critérios Rigorosos para Diagnóstico de Gestação Não Viável (Abortamento Precoce)
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Para evitar a interrupção inadvertida de gestações viáveis muito precoces, as diretrizes internacionais (ISUOG, ACOG, Royal College) estabeleceram <strong>limiares conservadores de segurança</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800/60 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>1. Critérios Imediatos de Inviabilidade</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>CCN &ge; 7 mm sem Batimento Cardíaco Fetal (BCF)</strong> identificável.</li>
              <li><strong>Diâmetro Médio do Saco Gestacional (DMS) &ge; 25 mm sem embrião</strong> presente.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>2. Critérios de Seguimento Cronológico</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Ausência de embrião com BCF <strong>&ge; 14 dias</strong> após ultrassom que demonstrou saco gestacional sem vesícula vitelínica.</li>
              <li>Ausência de embrião com BCF <strong>&ge; 11 dias</strong> após ultrassom que demonstrou saco gestacional com vesícula vitelínica.</li>
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-xs text-rose-200">
          <strong>Conduta Perante Dúvida:</strong> Na presença de CCN &lt; 7 mm sem BCF ou DMS &lt; 25 mm sem embrião, o diagnóstico é de <strong>Gestação de Viabilidade Incerta</strong>. NUNCA realizar esvaziamento uterino imediato; solicitar novo exame em 7 a 10 dias.
        </div>
      </div>

      {/* A REGRA DE OURO DA DATAÇÃO GESTACIONAL (CCN E REDATAÇÃO) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
          <Calendar size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            A Regra de Ouro da Datação Gestacional Confiável
          </h4>
        </div>

        <div className="p-4 md:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            O <strong>Comprimento Cabeça-Nádega (CCN)</strong> medido entre <strong>10 e 13 semanas e 6 dias (CCN 45 a 84 mm)</strong> possui margem de erro biológica de apenas <strong>± 3 a 5 dias</strong>, sendo o método mais exato em toda a medicina obstétrica.
          </p>
        </div>

        {/* Simulador Interativo de Redatação */}
        <div className="p-5 rounded-2xl bg-slate-950 border-2 border-indigo-900/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">
              Simulador de Redatação DUM vs USG
            </span>
            <span className="text-[10px] font-mono text-slate-400">Consenso ACOG / FEBRASGO</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">
                Trimestre do Primeiro Ultrassom:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setGestationalTrim('1')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                    gestationalTrim === '1' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  1º Tri (&le;13s6d)
                </button>
                <button
                  onClick={() => setGestationalTrim('2')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                    gestationalTrim === '2' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  2º Tri (14 a 22s)
                </button>
                <button
                  onClick={() => setGestationalTrim('3')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                    gestationalTrim === '3' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  3º Tri (&gt;28s)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">
                Diferença entre DUM e Ultrassom: <span className="text-indigo-300 font-mono font-black">{dumDiffDays} dias</span>
              </label>
              <input
                type="range"
                min={0}
                max={30}
                value={dumDiffDays}
                onChange={(e) => setDumDiffDays(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer mt-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0 dias</span>
                <span>Limite corte ({gestationalTrim === '1' ? '5d' : gestationalTrim === '2' ? '10d' : '21d'})</span>
                <span>30 dias</span>
              </div>
            </div>
          </div>

          {/* Resultado do Simulador */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
            advice.redate 
              ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
              : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
          }`}>
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            <div>
              <strong>Decisão Obstétrica:</strong> {advice.text}
            </div>
          </div>
        </div>

        {/* Tabela de Prazos de Redatação */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3">Idade Gestacional no 1º Exame</th>
                <th className="p-3">Parâmetro Biométrico Utilizado</th>
                <th className="p-3">Discrepância Limite para Redatar</th>
                <th className="p-3">Margem de Erro Esperada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr>
                <td className="p-3 font-bold text-white">&le; 8 semanas e 6 dias</td>
                <td className="p-3 text-slate-300">CCN inicial</td>
                <td className="p-3 font-mono text-cyan-300">&gt; 5 dias</td>
                <td className="p-3 text-slate-400">± 3 a 5 dias</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">9 a 13 semanas e 6 dias</td>
                <td className="p-3 text-slate-300">CCN (45 a 84 mm) — Padrão-Ouro</td>
                <td className="p-3 font-mono text-cyan-300">&gt; 7 dias</td>
                <td className="p-3 text-slate-400">± 5 a 7 dias</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">14 a 15 semanas e 6 dias</td>
                <td className="p-3 text-slate-300">DBP, CC, CA, CF</td>
                <td className="p-3 font-mono text-amber-300">&gt; 7 dias</td>
                <td className="p-3 text-slate-400">± 7 dias</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">16 a 21 semanas e 6 dias</td>
                <td className="p-3 text-slate-300">Biometria Média (CC, DBP, CA, CF)</td>
                <td className="p-3 font-mono text-amber-300">&gt; 10 dias</td>
                <td className="p-3 text-slate-400">± 7 a 10 dias</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">22 a 27 semanas e 6 dias</td>
                <td className="p-3 text-slate-300">Biometria Média fetal</td>
                <td className="p-3 font-mono text-rose-300">&gt; 14 dias</td>
                <td className="p-3 text-slate-400">± 14 dias</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">&ge; 28 semanas em diante</td>
                <td className="p-3 text-slate-300">Biometria 3º trimestre</td>
                <td className="p-3 font-mono text-rose-300">&gt; 21 dias</td>
                <td className="p-3 text-slate-400">± 21 a 30 dias (baixa precisão)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* GESTAÇÃO MÚLTIPLA E DIAGNÓSTICO DE CORIONICIDADE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
          <SplitSquareVertical size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Gestação Múltipla: Determinação Vital da Corionicidade no 1º Trimestre
          </h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Na gestação gemelar, a determinação da <strong>corionicidade</strong> (número de placentas) é o fator prognóstico mais determinante para morbimortalidade perinatal. A janela entre <strong>11 e 13s6d é a mais precisa de toda a gravidez</strong> para este diagnóstico:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-800/80 space-y-2">
            <span className="font-bold text-purple-300 text-sm block">1. Dicoriônica e Diamniótica (Dici/Diami)</span>
            <p className="text-slate-300 leading-relaxed">
              Duas massas placentárias distintas ou fusão placentária com septo intergemelar espesso (&gt; 2 mm, composto por 4 camadas: 2 córions e 2 âmnios).
            </p>
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800 text-purple-200">
              <strong>Sinal Ultrassonográfico:</strong> <strong>Sinal do Lambda (&lambda;) ou Sinal do Twin-Peak</strong> (triângulo de tecido trofoblástico infiltrando a base da membrana divisória).
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800/80 space-y-2">
            <span className="font-bold text-rose-300 text-sm block">2. Monocoriônica e Diamniótica (Monoci/Diami)</span>
            <p className="text-slate-300 leading-relaxed">
              Placenta única compartilhada com septo intergemelar muito fino (&lt; 2 mm, formado apenas por 2 camadas de âmnios, sem tecido coriônico interposto).
            </p>
            <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200">
              <strong>Sinal Ultrassonográfico:</strong> <strong>Sinal do "T"</strong> (inserção perpendicular fina da membrana sem tecido trofoblástico na base). Risco de Síndrome de Transfusão Feto-Fetal (STTF).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
