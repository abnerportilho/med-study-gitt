import React, { useState } from 'react';
import { 
  Target, Activity, Layers, ShieldAlert, CheckCircle2, 
  AlertTriangle, ArrowRight, Stethoscope, Compass, FileText
} from 'lucide-react';

export default function MalignasEstadiamentoTNM() {
  const [activeTab, setActiveTab] = useState<'tnm_base' | 'classificacao_t' | 'nm_disseminacao' | 'prognostico_moderno' | 'varredura'>('tnm_base');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 5 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Compass size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
              Eixo 5 · Estadiamento & Extensão da Doença
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Quanto a Doença se Espalhou: Do TNM ao Estágio Prognóstico
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O sistema TNM organiza a extensão anatômica locorregional e a distância em três perguntas cruciais. Na oncologia moderna, o estadiamento anatômico é refinado pelos biomarcadores e grau histológico, determinando quais pacientes realmente precisam de exames de rastreio de metástases.
        </p>

        {/* NAVEGAÇÃO DE SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'tnm_base', label: '1. As Três Perguntas do TNM' },
            { id: 'classificacao_t', label: '2. Classificação T: Tamanho & Extensão' },
            { id: 'nm_disseminacao', label: '3. N & M: Linfonodos & Metástases' },
            { id: 'prognostico_moderno', label: '4. Estágio Anatômico vs Prognóstico' },
            { id: 'varredura', label: '5. Racionalidade da "Varredura" Sistêmica' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. AS TRÊS PERGUNTAS DO TNM */}
      {activeTab === 'tnm_base' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Target className="text-indigo-400" size={20} />
              O Sistema TNM Responde a Três Perguntas Cardinais
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Desenvolvido pela AJCC (*American Joint Committee on Cancer*) e UICC, o estadiamento TNM é a linguagem universal que padroniza o risco e a abordagem terapêutica.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-indigo-400 font-mono">T</span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-800 font-mono">Tumor</span>
                </div>
                <strong className="text-white block text-sm">Tamanho & Extensão Local</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Qual é o maior diâmetro do tumor invasivo primário na mama e se há invasão direta da pele ou da parede torácica.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-rose-400 font-mono">N</span>
                  <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800 font-mono">Linfonodos</span>
                </div>
                <strong className="text-white block text-sm">Comprometimento Regional</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Quais linfonodos regionais (axilares, cadeia mamária interna ou claviculares) estão infiltrados por células tumorais.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-amber-400 font-mono">M</span>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800 font-mono">Metástase</span>
                </div>
                <strong className="text-white block text-sm">Disseminação a Distância</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Se há evidência clínica ou radiológica de metástase em órgãos a distância (ossos, fígado, pulmão, encéfalo).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CLASSIFICAÇÃO T */}
      {activeTab === 'classificacao_t' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Layers className="text-indigo-400" size={20} />
              Classificação T: Tamanho — Exceto Quando Não É
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O estadiamento T baseia-se primordialmente na medida métrica do maior diâmetro do componente invasor, exceto na categoria T4, em que a <strong>invasão anatômica de estruturas vizinhas ou aspecto inflamatório</strong> sobrepõe-se a qualquer dimensão.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Categoria T</th>
                    <th className="p-3">Definição Essencial</th>
                    <th className="p-3">Detalhamento Clínico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3 font-mono font-bold text-amber-300">Tis</td>
                    <td className="p-3 font-semibold text-white">Carcinoma In Situ</td>
                    <td className="p-3 text-slate-400">Carcinoma ductal in situ (CDIS) ou Doença de Paget isolada da papila sem tumor invasor.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-cyan-300">T1mi</td>
                    <td className="p-3 font-semibold text-white">Microinvasão ≤ 1 mm</td>
                    <td className="p-3 text-slate-400">Foco invasivo diminuto rompendo a membrana basal com ≤ 0,1 cm.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-cyan-300">T1</td>
                    <td className="p-3 font-semibold text-white">Tumor ≤ 2 cm</td>
                    <td className="p-3 text-slate-400">Subdividido em T1a (&gt;1 a 5 mm), T1b (&gt;5 a 10 mm) e T1c (&gt;10 a 20 mm).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-300">T2</td>
                    <td className="p-3 font-semibold text-white">&gt; 2 até 5 cm</td>
                    <td className="p-3 text-slate-400">Maior diâmetro do tumor invasivo entre 20 mm e 50 mm.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-purple-300">T3</td>
                    <td className="p-3 font-semibold text-white">&gt; 5 cm</td>
                    <td className="p-3 text-slate-400">Tumor volumoso ultrapassando 50 mm na mama.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-rose-400">T4</td>
                    <td className="p-3 font-semibold text-rose-300">Parede torácica, pele ou inflamatório</td>
                    <td className="p-3 text-slate-400">
                      <strong>T4a:</strong> Parede torácica (costelas, intercostais, serrátil; NÃO apenas peitoral).<br />
                      <strong>T4b:</strong> Ulceração cutânea, nódulos satélites ou casca de laranja restrita.<br />
                      <strong>T4c:</strong> T4a + T4b combinados.<br />
                      <strong>T4d:</strong> <strong>Carcinoma Inflamatório</strong> (&gt;1/3 da mama com eritema/edema).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. N E M: DISSEMINAÇÃO */}
      {activeTab === 'nm_disseminacao' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Activity className="text-rose-400" size={20} />
              N e M Organizam Disseminação Regional e Distante
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* N: LINFONODOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-rose-300 text-sm block">N — Linfonodos Regionais</span>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-300">N0:</strong> Sem comprometimento linfonodal regional histológico ou clínico.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-blue-300">N1:</strong> Menor carga regional: metástases em 1 a 3 linfonodos axilares móveis ipsilaterais (níveis I/II).
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-amber-300">N2:</strong> Maior carga axilar (4 a 9 linfonodos positivos, ou linfonodos fixos/coalescentes) ou cadeia mamária interna clinicamente detectada.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-rose-400">N3:</strong> Doença extensa: ≥ 10 linfonodos axilares, linfonodo infraclavicular (nível III), ou supraclavicular ipsilateral.
                  </li>
                </ul>
              </div>

              {/* M: METÁSTASE */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-amber-300 text-sm block">M — Metástase a Distância</span>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-300">M0:</strong> Ausência de metástase a distância demonstrada pelos exames clínicos e de imagem.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-rose-400">M1:</strong> Doença metastática a distância confirmada. <strong>Define automaticamente o Estágio IV!</strong>
                  </li>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-900/60 space-y-1 mt-2">
                    <strong className="text-amber-300 block">Sítios Mais Frequentes de Disseminação:</strong>
                    <p className="text-slate-300">
                      <strong>1º Ossos</strong> (~70% das pacientes metastáticas, principalmente esqueleto axial), <strong>2º Pulmão e Pleura</strong>, <strong>3º Fígado</strong> e <strong>4º Sistema Nervoso Central (Cérebro)</strong>.
                    </p>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ESTÁGIO PROGNÓSTICO MODERNO */}
      {activeTab === 'prognostico_moderno' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-indigo-300 text-base">
                O Mesmo TNM Pode Esconder Biologias Diferentes
              </span>
              <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-xl border border-indigo-800">
                AJCC 8ª Edição
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 space-y-2">
              <div className="text-sm font-black text-white italic font-serif border-l-4 border-indigo-500 pl-3 py-0.5">
                "Grau histológico, RE, RP e HER2 participam do estágio prognóstico."
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Antes de 2018, o estadiamento era exclusivamente anatômico (T, N, M). A partir do AJCC 8ª edição, dois tumores com o exato mesmo tamanho e acometimento axilar (ex: T2N1) possuem estadiamentos prognósticos radicalmente diferentes: se for Luminal A Grau 1, o estadiamento prognóstico migra para Estágio I; se for Triplo-Negativo Grau 3, mantém-se ou sobe de categoria.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold text-xs block">cTNM</span>
                <strong className="text-white block">Estadiamento Clínico</strong>
                <p className="text-slate-400 text-[11px]">Baseado no exame físico, exames de imagem iniciais e biópsia primária pré-tratamento.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold text-xs block">pTNM</span>
                <strong className="text-white block">Estadiamento Patológico</strong>
                <p className="text-slate-400 text-[11px]">Obtido após cirurgia primária e exame histológico da peça operatória e linfonodos.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-mono text-amber-400 font-bold text-xs block">ypTNM</span>
                <strong className="text-white block">Pós-Tratamento Neoadjuvante</strong>
                <p className="text-slate-400 text-[11px]">Estadiamento patológico residual na peça cirúrgica após quimioterapia neoadjuvante.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. RACIONALIDADE DA VARREDURA SISTÊMICA */}
      {activeTab === 'varredura' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <ShieldAlert className="text-rose-400" size={20} />
              Nem Toda Paciente Precisa de "Varredura" Sistêmica
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Solicitar exames tomográficos e cintilográficos indiscriminadamente para qualquer paciente recém-diagnosticada com câncer inicial é uma prática condenada pelas diretrizes internacionais (*Choosing Wisely*).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
                <span className="font-bold text-emerald-400 text-sm">Doença Inicial Assintomática (T1N0)</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Exames sistêmicos de rotina NÃO são indicados.</strong></li>
                  <li>• Baixíssima probabilidade pré-teste de metástase a distância (&lt; 1%).</li>
                  <li>• <strong>Evita resultados falso-positivos</strong> (ex: nódulo pulmonar inespecífico ou cisto hepático incidental).</li>
                  <li>• Evita atrasos no tratamento cirúrgico curativo e estresse desnecessário.</li>
                  <li>• Investigar imagem sistêmica apenas se surgirem sintomas específicos (ex: dor óssea persistente).</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
                <span className="font-bold text-amber-400 text-sm">Maior Carga Tumoral ou Sintomas (T3, T4, N+)</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Exames dirigidos indicados:</strong> TC de tórax + abdome/pelve e Cintilografia óssea, ou PET-CT.</li>
                  <li>• Indicados em tumores volumosos (&gt; 5 cm), carcinoma inflamatório (T4d) ou axila palpável/positiva (N+).</li>
                  <li>• Exames dirigidos ao sítio sintomático suspeito.</li>
                  <li>• <strong>Regra de Ouro:</strong> Confirmar por biópsia a presença de metástase suspeita solitária sempre que factível antes de mudar o plano de curativo para paliativo!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
