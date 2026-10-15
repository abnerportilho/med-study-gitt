import React, { useState } from 'react';
import { 
  Activity, Droplet, Stethoscope, AlertTriangle, 
  CheckCircle2, Gauge, FileText, ChevronRight, HelpCircle
} from 'lucide-react';

export default function UroIncontinenciaDiagnostico() {
  const [activeTab, setActiveTab] = useState<'tipos' | 'gravidade' | 'propedêutica' | 'urodinâmica'>('tipos');

  // Simulador Urodinâmico
  const [vlppInput, setVlppInput] = useState<number>(55);
  const [hasDetrusorOveractivity, setHasDetrusorOveractivity] = useState<boolean>(false);
  const [bladderCapacity, setBladderCapacity] = useState<number>(400);

  const getUrodynamicAnalysis = () => {
    let result = {
      title: '',
      color: '',
      vlppDiagnosis: '',
      detrusorDiagnosis: '',
      surgicalRecommendation: ''
    };

    if (vlppInput < 60) {
      result.vlppDiagnosis = 'Deficiência Esfincteriana Intrínseca (DEI)';
      result.color = 'text-rose-400 bg-rose-950 border-rose-800';
      result.surgicalRecommendation = 'Sling Retropúbico (TVT) ou Sling Aponeurótico Autólogo. Evitar sling transobturatório isolado devido à menor compressão no colo fixo.';
    } else if (vlppInput > 90) {
      result.vlppDiagnosis = 'Hipermobilidade do Colo Vesical (Defeito de Suporte Anatômico)';
      result.color = 'text-cyan-400 bg-cyan-950 border-cyan-800';
      result.surgicalRecommendation = 'Excelente resposta tanto a Sling Transobturatório (TOT) quanto Retropúbico (TVT) ou colpofixação retropúbica (Burch).';
    } else {
      result.vlppDiagnosis = 'Zona de Transição / Mista (60 a 90 cmH2O)';
      result.color = 'text-amber-400 bg-amber-950 border-amber-800';
      result.surgicalRecommendation = 'Defeito combinado. Preferência para abordagem retropúbica (TVT) com tensão ajustada.';
    }

    if (hasDetrusorOveractivity) {
      result.detrusorDiagnosis = 'Hiperatividade do Detrusor Detectada (Contrações Não Inibidas durante o enchimento)';
    } else {
      result.detrusorDiagnosis = 'Detrusor Estável (Sem contrações involuntárias)';
    }

    return result;
  };

  const uroAnalysis = getUrodynamicAnalysis();

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
              Eixo 3 • Diagnóstico & Urodinâmica
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Incontinência Urinária & Estudo Urodinâmico
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Definição ICS, espectro clínico (esforço, urgência, mista e transbordamento), estratificação por nível de esforço, exame físico ginecológico e interpretação do teste urodinâmico (VLPP, cistometria e hiperatividade detrusora).
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300 self-start md:self-auto">
            Critérios ICS & Urodinâmica
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('tipos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'tipos'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tipos de Incontinência (ICS)
          </button>
          <button
            onClick={() => setActiveTab('gravidade')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'gravidade'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gravidade da IUE por Esforço
          </button>
          <button
            onClick={() => setActiveTab('propedêutica')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'propedêutica'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Exame Físico & Urina I
          </button>
          <button
            onClick={() => setActiveTab('urodinâmica')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'urodinâmica'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Teste Urodinâmico & Simulador VLPP
          </button>
        </div>
      </div>

      {/* 1. TIPOS DE INCONTINÊNCIA */}
      {activeTab === 'tipos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Droplet className="text-cyan-400" size={20} />
                Definição e Espectro Clínico da Incontinência Urinária
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                ICS: Perda Involuntária de Urina
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Segundo a International Continence Society (ICS), incontinência urinária é a queixa de qualquer <strong>perda involuntária de urina</strong>. Afeta de 12 a 42% das mulheres jovens e até 55% na pós-menopausa, representando cerca de 10% das queixas ginecológicas primárias no Brasil.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* IUE */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">1. Incontinência Urinária aos Esforços (IUE)</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Mais Comum (50%)
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Perda involuntária sincrônica com esforço físico, tosse, espirro, riso ou levantamento de peso, <strong>sem contração do músculo detrusor</strong>.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <p>• <strong>Causa 1:</strong> Hipermobilidade do colo vesical por perda do suporte fascial/ligamentar anterior (Ligamento pubouretral e fáscia pubocervical).</p>
                  <p>• <strong>Causa 2:</strong> Deficiência Esfincteriana Intrínseca (DEI) com fraqueza da coaptação mucosa uretral.</p>
                </div>
              </div>

              {/* URGÊNCIA / BEXIGA HIPERATIVA */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">2. Incontinência por Urgência / Bexiga Hiperativa</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Sem Esforço
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Perda involuntária acompanhada ou precedida imediatamente por <strong>urgência miccional súbita e incontrolável</strong>, com polaciúria diurna (&gt; 8 micções) e noctúria (≥ 2 micções).
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <p>• <strong>Fisiopatologia:</strong> Contrações involuntárias não inibidas do detrusor durante o enchimento vesical (hiperatividade detrusora neurogênica ou idiopática).</p>
                  <p>• Responde primariamente a anticolinérgicos e beta-3 agonistas, <strong>não sendo de indicação cirúrgica</strong>!</p>
                </div>
              </div>

              {/* INCONTINÊNCIA MISTA */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">3. Incontinência Urinária Mista (IUM)</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Esforço + Urgência
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Associação concomitante de perdas aos esforços e episódios de urgência miccional.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <p>• <strong>Conduta clínica fundamental:</strong> Identificar qual sintoma é o mais incômodo para a paciente!</p>
                  <p>• Sempre iniciar pelo tratamento conservador/medicamentoso do componente de urgência antes de propor cirurgia de sling.</p>
                </div>
              </div>

              {/* TRANSBORDAMENTO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-300 text-sm">4. Incontinência por Transbordamento</span>
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800">
                    Retenção Crônica
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Perda involuntária por gotejamento crônico decorrente de uma bexiga permanentemente repleta e hiperdistendida.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <p>• <strong>Causas:</strong> Bexiga acontrátil/hipotônica (neuropatia diabética grave) ou grande obstrução infravesical (cistocele volumosa Grau 4 acotovelando a uretra).</p>
                  <p>• Apresenta bexigoma palpável no exame físico e resíduo pós-miccional elevado (&gt; 200 ml).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. GRAVIDADE DA IUE POR ESFORÇO */}
      {activeTab === 'gravidade' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Gauge className="text-cyan-400" size={20} />
                Estratificação de Gravidade da IUE pelo Nível de Esforço
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Slides Prof. André Bernardo
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              A intensidade do esforço físico necessário para desencadear o escape urinário correlaciona-se diretamente com a magnitude da lesão biomecânica do suporte uretral:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* GRANDES ESFORÇOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-300 text-sm">Grande Esforço</span>
                  <span className="text-[10px] font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                    Leve / Inicial
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-slate-200">
                  <p className="font-semibold text-white">Gatilhos Típicos:</p>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• Tosse vigorosa</li>
                    <li>• Espirro forte</li>
                    <li>• Gargalhadas intensas</li>
                    <li>• Prática de esportes de alto impacto (corrida, salto)</li>
                  </ul>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <strong>Mecanismo:</strong> Aumento abrupto da pressão intra-abdominal que supera temporariamente o tônus uretral ainda parcialmente preservado.
                </div>
              </div>

              {/* MÉDIOS ESFORÇOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">Médio Esforço</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Moderada
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-slate-200">
                  <p className="font-semibold text-white">Gatilhos Típicos:</p>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• Carregar um vaso ou compras</li>
                    <li>• Levantar da cama ou da cadeira</li>
                    <li>• Subir escadas com pressa</li>
                    <li>• Manobras de Valsalva cotidianas</li>
                  </ul>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
                  <strong>Mecanismo:</strong> Indica uma lesão anatômica maior com perda significativa da ancoragem ligamentar pubouretral e fáscia pubocervical.
                </div>
              </div>

              {/* MÍNIMOS ESFORÇOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-300 text-sm">Pequenos ou Mínimos Esforços</span>
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800">
                    Grave / Caso Real
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-slate-200">
                  <p className="font-semibold text-white">Gatilhos Típicos:</p>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>• Falar simplesmente</li>
                    <li>• Andar com calma no plano</li>
                    <li>• Escovar os dentes</li>
                    <li>• Mudar de posição no leito</li>
                  </ul>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-[11px] text-rose-300">
                  <strong>Mecanismo:</strong> Indica <strong>grande lesão com provável perda completa do suporte uretral</strong> associada à deficiência esfincteriana intrínseca.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROPEDÊUTICA & URINA I */}
      {activeTab === 'propedêutica' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Stethoscope className="text-cyan-400" size={20} />
                Roteiro Propedêutico: Queixa, Exame Físico & Exclusão de ITU
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Abordagem Prática
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Apenas <strong>10 a 20% das mulheres relatam queixa espontânea</strong> na consulta devido à vergonha, embora 40% informem que a perda é involuntária quando questionadas ativamente pelo ginecologista.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-cyan-300 text-sm block">Exame Físico Ginecológico com Bexiga Cheia:</span>
                <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Manobras de Esforço Solicitado:</strong> Solicitar manobra de Valsalva mantida e tosse repetida vigorosa com a paciente em posição ginecológica.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Sincronia da Perda:</strong> Se a perda for <strong>sincrônica ao pico do esforço</strong>, confirma-se clinicamente a IUE! Se a perda ocorrer segundos após o esforço com contração vesical, sugere hiperatividade detrusora induzida pelo esforço.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Avaliação em Posição Ortostática:</strong> Se o teste em decúbito for negativo mas a história for muito evidente, repetir as manobras com a paciente de pé.
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-amber-300 text-sm block">Urina I (EAS) e Urocultura Obrigatórios:</span>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/60 text-amber-300 font-semibold">
                    Toda paciente com queixa recente de perda urinária ou urgência DEVE colher Urina Tipo I e Urocultura com antibiograma!
                  </p>
                  <p>
                    A infecção do trato urinário (ITU) causa inflamação da mucosa vesical, gerando urgência miccional aguda e urge-incontinência transitória ("falsa bexiga hiperativa").
                  </p>
                  <p className="text-slate-400">
                    Nenhum estudo urodinâmico ou procedimento cirúrgico pode ser realizado na presença de bacteriúria ou infecção ativa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TESTE URODINÂMICO & SIMULADOR VLPP */}
      {activeTab === 'urodinâmica' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Activity className="text-cyan-400" size={20} />
                Estudo Urodinâmico: Cistometria & Pressão de Perda (VLPP)
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Padrão Diagnóstico
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O teste urodinâmico reproduz os sintomas sob monitorização de pressão intravesical, abdominal e detrusora (Pdet = Pves - Pabd). Avalia o comportamento do detrusor e mensura a <strong>Pressão de Perda sob Valsalva (VLPP)</strong>:
            </p>

            {/* SIMULADOR INTERATIVO DE URODINÂMICA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-2">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  Simulador de Cistometria & VLPP
                </span>

                {/* SLIDER DE VLPP */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">Pressão de Perda ao Esforço (VLPP):</span>
                    <span className="font-mono font-bold text-cyan-400 text-sm">{vlppInput} cmH2O</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="140"
                    value={vlppInput}
                    onChange={e => setVlppInput(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>&lt; 60 (DEI grave)</span>
                    <span>60 a 90 (Zona cinzenta)</span>
                    <span>&gt; 90 (Hipermobilidade)</span>
                  </div>
                </div>

                {/* TOGGLE HIPERATIVIDADE DO DETRUSOR */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">Contrações Não Inibidas do Detrusor</span>
                    <span className="text-[11px] text-slate-400">Picos de pressão detrusora sem esforço</span>
                  </div>
                  <button
                    onClick={() => setHasDetrusorOveractivity(!hasDetrusorOveractivity)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      hasDetrusorOveractivity
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {hasDetrusorOveractivity ? 'PRESENTE (+)' : 'AUSENTE (-)'}
                  </button>
                </div>

                {/* CAPACIDADE CISTOMÉTRICA MÁXIMA */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">Capacidade Cistométrica Máxima (CCM)</span>
                    <span className="text-[11px] text-slate-400">Normal: 350 a 500 ml</span>
                  </div>
                  <span className="font-mono font-bold text-cyan-300 text-sm">420 ml (Normal)</span>
                </div>
              </div>

              {/* LAUDO E CONDUTA EM TEMPO REAL */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Interpretação Diagnóstica & Conduta Urodinâmica
                </span>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Diagnóstico do Mecanismo Esfincteriano:</span>
                    <strong className={`block text-sm font-bold ${uroAnalysis.color.split(' ')[0]}`}>
                      {uroAnalysis.vlppDiagnosis}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Comportamento do Detrusor:</span>
                    <strong className={`block text-sm font-bold ${hasDetrusorOveractivity ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {uroAnalysis.detrusorDiagnosis}
                    </strong>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-900/60 space-y-1.5">
                    <strong className="text-cyan-300 block text-xs">Impacto na Escolha Cirúrgica:</strong>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {uroAnalysis.surgicalRecommendation}
                    </p>
                    {hasDetrusorOveractivity && (
                      <p className="text-amber-300 text-[11px] mt-1 pt-1 border-t border-slate-800">
                        ⚠️ Atenção: A presença de hiperatividade associada contraindica cirurgia de sling isolada até controle clínico prévio da urgência com anticolinérgico ou beta-3 agonista!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
