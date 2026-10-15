import React from 'react';
import { 
  Activity, ArrowRight, Dna, AlertTriangle, 
  Baby, Heart, ShieldAlert, Zap, Flame, Wind, Scale, Sparkles, Info,
  Layers, CheckCircle2, ShieldX, Binary, Target, Eye
} from 'lucide-react';

export default function DMGFisiopatologia() {
  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO TEMA 3 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950 text-purple-400 border border-purple-800">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">
              Eixo 3 · Fisiopatologia Molecular & Embriopatia
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              3. Fisiopatologia Molecular, Eixo Feto-Placentário & Embriopatia Diabética
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          Compreensão integrada da cinética dos hormônios contrainsulínicos, da dinâmica dos transportadores placentários (GLUT1/GLUT3 vs GLUT4), da <strong>Hipótese de Pedersen (1952)</strong> no DMG e, fundamentalmente, dos <strong>mecanismos moleculares da Embriopatia Diabética no Diabetes Pré-Gestacional</strong> versus as repercussões funcionais tardias do DMG.
        </p>
      </div>

      {/* 3.1 DISTINÇÃO CRUCIAL: DIABETES PRÉ-GESTACIONAL VS DMG CLÁSSICO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-900/70 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2 rounded-xl bg-rose-950 text-rose-400 border border-rose-800">
            <ShieldAlert size={22} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Conceito Fundamental de Prova & Prática Clínica
            </span>
            <h4 className="text-base md:text-lg font-black text-white mt-0.5">
              3.1 A Distinção Temporal da Teratogenia: Pré-Gestacional vs DMG
            </h4>
          </div>
        </div>

        <div className="p-4 md:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            <strong className="text-rose-400">Ponto Crucial:</strong> Malformações congênitas estruturais <strong>NÃO</strong> são uma característica esperada do <strong>Diabetes Gestacional (DMG) clássico</strong>. Tratar o diabetes na gestação como uma entidade única é um dos erros conceituais mais frequentes na prática médica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Coluna 1: Pré-Gestacional */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-800/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded border border-rose-800">
                  Período Crítico: Concepção até 8ª–10ª semana
                </span>
                <span className="text-xs font-mono font-bold text-rose-300">1º Trimestre</span>
              </div>
              <h5 className="text-sm md:text-base font-black text-white">Diabetes Pré-Gestacional (DM1, DM2 ou Overt)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                A hiperglicemia materna está presente <strong>durante a organogênese embrionária</strong> (dias 20 a 70 pós-concepção). O excesso de glicose induz estresse oxidativo mitocondrial grave no concepto, deflagrando <strong>embriopatia diabética com malformações congênitas maiores</strong>.
              </p>
              <div className="space-y-1 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-rose-300 font-bold mb-1">Impacto Clínico:</div>
                <div>• Risco de malformação maior: <strong>6% a 10%</strong> (vs 2-3% na população geral), podendo superar <strong>20-25% se HbA1c &gt; 10%</strong>.</div>
                <div>• Rastreio obrigatório: <strong>Ecocardiograma fetal (24-28 sem)</strong> e US morfológico precoce.</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-[11px] text-rose-200 font-semibold">
              Alvo de Prevenção: Planejamento pré-concepcional com HbA1c &lt; 6,5% antes de conceber.
            </div>
          </div>

          {/* Coluna 2: DMG Clássico */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-800/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                  Período Crítico: 24ª a 28ª semana em diante
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">2º e 3º Trimestres</span>
              </div>
              <h5 className="text-sm md:text-base font-black text-white">Diabetes Mellitus Gestacional (DMG Clássico)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instala-se na segunda metade da gestação, quando o pico dos hormônios placentários (hPL, cortisol, progesterona) atinge o ápice contrainsulínico. Nesse momento, a <strong>organogênese já foi concluída há meses</strong>.
              </p>
              <div className="space-y-1 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-amber-300 font-bold mb-1">Impacto Clínico:</div>
                <div>• Não gera teratogênese anatômica estrutural precoce.</div>
                <div>• Repercussão <strong>metabólica e de crescimento tardio</strong>: macrossomia assimétrica, hipertrofia septal cardíaca transitória, hipoglicemia neonatal e policitemia.</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-[11px] text-amber-200 font-semibold">
              Alvo de Prevenção: Controle glicêmico materno e vigilância da Circunferência Abdominal fetal (CA).
            </div>
          </div>
        </div>
      </div>

      {/* 3.2 MECANISMOS MOLECULARES DA EMBRIOPATIA DIABÉTICA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400 border-b border-slate-800 pb-3">
          <Dna size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            3.2 Mecanismos Moleculares da Embriopatia Diabética (DM Pré-Gestacional)
          </h4>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          A hiperglicemia no período de organogênese (dias 20 a 70 pós-concepção) atua por <strong>múltiplas vias moleculares convergentes</strong>, e não por um evento teratogênico isolado:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Via 1: Estresse Oxidativo */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Zap size={16} />
              <span>1. Estresse Oxidativo Mitocondrial</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              O influxo excessivo de glicose satura a cadeia transportadora de elétrons mitocondrial embrionária, gerando <strong>superprodução de Espécies Reativas de Oxigênio (ROS)</strong>. O embrião em fase inicial possui defesas antioxidantes enzimáticas imaturas (baixos níveis de SOD, catalase e glutationa peroxidase), resultando em dano oxidativo celular maciço.
            </p>
          </div>

          {/* Via 2: Apoptose */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldX size={16} />
              <span>2. Ativação de Vias Apoptóticas</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              O acúmulo de ROS deflagra estresse do retículo endoplasmático e ativa as caspases executoras (<strong>caspase-8 e caspase-3</strong>). Ocorre morte celular programada aberrante em populações essenciais de células da <strong>crista neural</strong> e da goteira do tubo neural em fechamento.
            </p>
          </div>

          {/* Via 3: Mio-inositol e Ácido Araquidônico */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Flame size={16} />
              <span>3. Bloqueio de Mio-Inositol e Prostaglandinas</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              A hiperglicemia compete diretamente com a captação de <strong>mio-inositol</strong>, depletando a sinalização de fosfoinositídeos (PIP2/PIP3) necessária à divisão celular embrionária, e inibe a via do <strong>ácido araquidônico</strong>, reduzindo prostaglandinas cruciais para a fusão das pregas neurais.
            </p>
          </div>

          {/* Via 4: Genes Homeobox / Pax3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Binary size={16} />
              <span>4. Supressão do Gene Homeobox Pax3</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              A hiperglicemia suprime a expressão do gene <strong>Pax3</strong>, regulador maestro do fechamento do tubo neural e da <strong>migração das células da crista neural cardíaca</strong>. Isso explica a frequente coexistência de defeitos neurais e anomalias conotruncais cardíacas no mesmo concepto.
            </p>
          </div>

          {/* Via 5: Glicação Não Enzimática */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Sparkles size={16} />
              <span>5. Glicação da Matriz Extracelular</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Glicação não enzimática de proteínas da matriz extracelular embrionária (AGEs), alterando as propriedades biomecânicas e a adesão tecidual necessária para os movimentos morfogenéticos da gastrulação e segmentação somítica.
            </p>
          </div>

          {/* Via 6: Disrupção do Eixo D-E & Cílios */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Target size={16} />
              <span>6. Disfunção Ciliar & Eixo D-E</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Disfunção dos microcílios rotatórios do nó primitivo (nodal cilia) mediada por alterações metabólicas, prejudicando a sinalização assimétrica da cascata Nodal/Lefty/Pitx2, o que deflagra defeitos de lateralidade (situs inversus e heterotaxias).
            </p>
          </div>
        </div>
      </div>

      {/* 3.3 HIERARQUIA DAS MALFORMAÇÕES NO DIABETES PRÉ-GESTACIONAL */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
          <Heart size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            3.3 Espectro e Hierarquia de Malformações Específicas
          </h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Estratificação das malformações congênitas associadas ao diabetes pré-gestacional por <strong>especificidade diagnóstica</strong> e <strong>frequência absoluta</strong>:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3.5">Malformação / Síndrome</th>
                <th className="p-3.5">Magnitude de Risco (Odds Ratio / Risco Relativo)</th>
                <th className="p-3.5">Mecanismo Embriológico Envolvido</th>
                <th className="p-3.5">Comentário Prático / Relevância</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr className="bg-rose-950/20">
                <td className="p-3.5 font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span>
                  Síndrome de Regressão Caudal (Agenesia Sacral)
                </td>
                <td className="p-3.5 text-rose-300 font-mono font-bold">OR 200 a 400x (Altíssima especificidade)</td>
                <td className="p-3.5 text-slate-300">Lesão do mesoderma caudal no início da gastrulação precoce.</td>
                <td className="p-3.5 text-slate-300">Embora rara em termos absolutos, é a anomalia <strong>mais patognomônica</strong> do diabetes periconcepcional.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                  Cardiopatias Congênitas Conotruncais
                </td>
                <td className="p-3.5 text-indigo-300 font-mono font-bold">Até 5x o risco basal (Mais frequente em números absolutos)</td>
                <td className="p-3.5 text-slate-300">Falha de migração e septação das células da crista neural cardíaca (supressão de Pax3).</td>
                <td className="p-3.5 text-slate-300">Transposição de grandes artérias (TGA), tronco arterioso, CIV ampla, dupla via de saída do VD e coarctação de aorta. <strong>Indica ecocardiograma fetal</strong>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                  Defeitos de Fechamento do Tubo Neural (DTN)
                </td>
                <td className="p-3.5 text-amber-300 font-mono font-bold">2 a 10x o risco basal</td>
                <td className="p-3.5 text-slate-300">Apoptose celular na neurulação precoce por esgotamento de mio-inositol e excesso de ROS.</td>
                <td className="p-3.5 text-slate-300">Anencefalia, encefalocele e espinha bífida. Justifica dose otimizada de <strong>ácido fólico periconcepcional (4 a 5 mg/dia)</strong> em DM prévio.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                  Malformações Renais e Geniturinárias
                </td>
                <td className="p-3.5 text-cyan-300 font-mono font-bold">4 a 5x o risco basal</td>
                <td className="p-3.5 text-slate-300">Lesão do mesoderma intermediário na mesma janela temporal da gastrulação.</td>
                <td className="p-3.5 text-slate-300">Agenesia renal unilateral/bilateral, rim em ferradura, duplicidade ureteral e displasia renal cística.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-purple-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
                  Holoprosencefalia
                </td>
                <td className="p-3.5 text-purple-300 font-mono font-bold">Risco significativamente elevado</td>
                <td className="p-3.5 text-slate-300">Disrupção da via <em>Sonic Hedgehog (Shh)</em> por estresse oxidativo no prosencéfalo.</td>
                <td className="p-3.5 text-slate-300">Falha de clivagem do cérebro anterior em dois hemisférios cerebrais simétricos.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                  Situs Inversus & Heterotaxias
                </td>
                <td className="p-3.5 text-emerald-300 font-mono font-bold">Risco moderadamente elevado</td>
                <td className="p-3.5 text-slate-300">Disfunção ciliar no nó primitivo durante a quebra da simetria corporal.</td>
                <td className="p-3.5 text-slate-300">Inversão total ou parcial da disposição dos órgãos torácicos e abdominais.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3.4 DETERMINANTE QUANTITATIVO: HbA1c PERICONCEPCIONAL (CONTINUUM DOSE-RESPOSTA) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-900/60 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
          <Scale size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            3.4 Determinante Quantitativo: HbA1c Periconcepcional e Continuum Dose-Resposta
          </h4>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Não existe um limiar binário de tudo-ou-nada para o risco de malformação congênita no diabetes pré-gestacional. Estudos clássicos (como os de Kitzmiller et al.) demonstram uma <strong>relação contínua dose-resposta entre os níveis de Hemoglobina Glicada (HbA1c) periconcepcionais e a taxa de malformações fetais maiores</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-center">
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-2">
            <span className="text-[11px] font-black uppercase text-emerald-400 block">HbA1c &lt; 6,5%</span>
            <div className="text-xl font-black text-white">2% a 3%</div>
            <p className="text-[11px] text-slate-300">
              Risco semelhante ao <strong>basal da população geral</strong> sem diabetes. Meta periconcepcional preconizada pela ADA/SBD.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-black uppercase text-amber-400 block">HbA1c 7,0% a 7,9%</span>
            <div className="text-xl font-black text-amber-400">~5% a 6%</div>
            <p className="text-[11px] text-slate-300">
              Elevação discreta a moderada no risco relativo de cardiopatias e defeitos de tubo neural.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/80 space-y-2">
            <span className="text-[11px] font-black uppercase text-rose-400 block">HbA1c 8,0% a 9,9%</span>
            <div className="text-xl font-black text-rose-400">~10% a 15%</div>
            <p className="text-[11px] text-slate-300">
              Risco substancialmente aumentado (3 a 5x acima da população geral). Exige rastreio ecográfico morfológico e ecocardiograma rigorosos.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-700 space-y-2">
            <span className="text-[11px] font-black uppercase text-rose-300 block">HbA1c &ge; 10,0%</span>
            <div className="text-xl font-black text-rose-200">&gt; 20% a 25%</div>
            <p className="text-[11px] text-slate-200 font-semibold">
              Taxa alarmante de embriopatia grave e abortamento espontâneo precoce.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/60 text-xs text-indigo-200 leading-relaxed flex items-start gap-3">
          <Info size={20} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong>Mensagem Prática:</strong> A intervenção isolada de maior eficácia para prevenir malformações no diabetes é a <strong>consulta pré-concepcional com otimização glicêmica rigorosa (HbA1c &lt; 6,5%)</strong> antes da suspensão da contracepção, superando em benefício qualquer rastreio diagnóstico pós-concepção.
          </div>
        </div>
      </div>

      {/* 3.5 RESISTÊNCIA INSULÍNICA FISIOLÓGICA DA GESTAÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
          <Dna size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            3.5 Resistência Insulínica Fisiológica da Gestação (Fase Anabólica vs Diabetogênica)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              1ª Metade da Gestação (&lt; 20 semanas) · Fase Anabólica
            </span>
            <h5 className="text-sm font-bold text-white">Sensibilidade Insulínica Mantida/Aumentada</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ocorre hiperplasia inicial de células beta induzida por estrogênio e progesterona, acúmulo de reservas lipídicas maternas e <strong>glicemia de jejum fisiologicamente mais baixa</strong> devido à captação contínua pelo concepto e aumento da taxa de filtração glomerular.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
              2ª Metade da Gestação (&gt; 20–24 semanas) · Fase Diabetogênica
            </span>
            <h5 className="text-sm font-bold text-white">Pico dos Hormônios Contrainsulínicos</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              A placenta produz concentrações crescentes de hormônios contrainsulínicos: <strong>lactogênio placentário humano (hPL), progesterona, cortisol e prolactina</strong>. Isso eleva a resistência periférica à insulina em 50-60%. Em gestantes normais, o pâncreas compensa com hipersecreção. Havendo reserva limitada, a compensação falha parcialmente e surge a hiperglicemia materna (DMG).
            </p>
          </div>
        </div>
      </div>

      {/* 3.6 TRANSPORTE PLACENTÁRIO DE GLICOSE & GLUT1/GLUT3 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
          <Flame size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            3.6 Transporte Placentário de Glicose: Por Que Não Depende de Insulina
          </h4>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          A glicose materna atravessa a membrana sinciciotrofoblástica por <strong>difusão facilitada</strong>, mediada pelos transportadores constitutivos <strong>GLUT1 (na membrana do sinciciotrofoblasto)</strong> e <strong>GLUT3 (no endotélio vascular fetal)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <strong className="text-cyan-300 block text-sm">GLUT1 e GLUT3 Placentários (Constitutivos)</strong>
            <p className="text-slate-300 leading-relaxed">
              Já estão permanentemente expressos na membrana celular. O fluxo de glicose depende <strong>estritamente do gradiente de concentração</strong> entre o sangue materno e o sangue fetal, sem necessidade de ativação aguda por insulina materna.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <strong className="text-amber-300 block text-sm">GLUT4 Muscular e Adipocitário Materno/Fetal</strong>
            <p className="text-slate-300 leading-relaxed">
              Fica armazenado em vesículas intracelulares e só é translocado para a membrana mediante ligação da insulina e ativação da cascata <strong>PI3K/Akt</strong>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/60 text-xs text-indigo-200 leading-relaxed flex items-start gap-3">
          <Info size={20} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong>Barreira Placentária para a Insulina:</strong> A molécula de insulina materna é um polipeptídeo de aproximadamente <strong>5,8 kDa</strong>, sendo incapaz de atravessar a barreira placentária em quantidades clinicamente relevantes. O que determina a quantidade de glicose que chega ao feto é a <strong>glicemia materna</strong>, e não a insulinemia da mãe.
          </div>
        </div>

        {/* FRONTEIRA — Upregulation placentária de GLUT1 */}
        <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/70 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles size={18} />
            <span className="text-xs font-black uppercase tracking-wider">
              🔬 FRONTEIRA — Upregulation placentária de GLUT1 na gestante diabética
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Placentas de gestantes diabéticas apresentam <strong>maior densidade de GLUT1 na membrana microvilositária do sinciciotrofoblasto</strong>, achado consistente em biópsias placentárias. O gatilho fisiológico é a exposição crônica à hiperglicemia materna e ambiente metabólico alterado (possivelmente envolvendo <strong>sinalização via IGF-1 e mTOR</strong>), configurando uma adaptação placentária de médio/longo prazo que acelera a transferência de glicose para o feto.
          </p>
        </div>
      </div>

      {/* 3.7 HIPÓTESE DE PEDERSEN (1952) E EIXO DE COMPLICAÇÕES METABÓLICAS */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-amber-900/60 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <Baby size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Modelo Central da Morbidade Perinatal no DMG (2º e 3º Trimestres)
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              3.7 Hipótese de Pedersen & Complicações Funcionais Fetais e Neonatais
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          Formulada pelo obstetra dinamarquês <strong>Jørgen Pedersen em 1952</strong>, é a pedra fundamental que explica por que a hiperglicemia materna no segundo/terceiro trimestre gera morbidade fetal:
        </p>

        {/* Fluxo Esquematizado */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Passo 1</span>
              <strong className="text-rose-400">Hiperglicemia Materna</strong>
              <p className="text-[11px] text-slate-300 mt-1">Glicose livre atravessa a placenta por GLUT1/GLUT3.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Passo 2</span>
              <strong className="text-amber-400">Hiperglicemia Fetal</strong>
              <p className="text-[11px] text-slate-300 mt-1">Estimula o pâncreas fetal (maduro desde 10-14 semanas).</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Passo 3</span>
              <strong className="text-indigo-400">Hiperinsulinemia Fetal</strong>
              <p className="text-[11px] text-slate-300 mt-1">Hiperplasia de células beta e hipersecreção crônica.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">Passo 4</span>
              <strong className="text-emerald-400">Anabolismo & Receptores IGF-1</strong>
              <p className="text-[11px] text-slate-300 mt-1">Lipogênese, visceromegalia e macrossomia assimétrica.</p>
            </div>
          </div>
        </div>

        {/* Macrossomia Assimétrica e Circunferência Abdominal */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h5 className="text-sm font-black text-white">Padrão de Macrossomia Assimétrica</h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Concentrações suprafisiológicas de insulina fetal têm <strong>ação cruzada com receptores de IGF-1</strong> (receptores tirosina-quinase, via PI3K/Akt), gerando lipogênese acentuada no tronco/ombros, organomegalia (fígado, coração, adrenais) e hipertrofia muscular, enquanto o perímetro cefálico é relativamente poupado. 
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-indigo-300 font-semibold">
            Por esse motivo, a <strong>Circunferência Abdominal (CA) fetal</strong> é o parâmetro ultrassonográfico isolado mais sensível para detectar crescimento excessivo e risco de distócia de ombro.
          </div>
        </div>

        {/* Desfecho pós-parto: Hipoglicemia neonatal */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h5 className="text-sm font-black text-rose-400">Desfecho Pós-Parto: A Lógica da Hipoglicemia Neonatal</h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Durante toda a gestação, o feto vive sob ambiente hiperinsulinêmico contínuo. No momento do <strong>clampeamento do cordão umbilical</strong>, o influxo de glicose materna é subitamente interrompido, mas o pâncreas fetal hipertrofiado não cessa sua secreção de imediato. A hiperinsulinemia persistente consome os estoques circulantes de glicose, deflagrando <strong>hipoglicemia neonatal precoce (nas primeiras 1 a 2 horas de vida)</strong>.
          </p>
        </div>

        {/* Tabela de Complicações Neonatais */}
        <div className="space-y-3">
          <h5 className="text-xs font-black uppercase text-slate-300 tracking-wider">
            Outras Complicações Neonatais Explicadas Pelo Mesmo Eixo
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
              <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Complicação Neonatal</th>
                  <th className="p-3">Mecanismo Fisiopatológico Molecular</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
                <tr>
                  <td className="p-3 font-bold text-rose-400">Policitemia</td>
                  <td className="p-3">Hiperinsulinemia acelera o metabolismo e o consumo fetal de O2, gerando hipóxia tecidual relativa crônica que hiperestimula a secreção de eritropoetina fetal.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">Hiperbilirrubinemia</td>
                  <td className="p-3">Consequência direta da hemólise da massa eritrocitária excessiva gerada pela policitemia somada à imaturidade fisiológica da enzima hepática glicuroniltransferase.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyan-400">Cardiomiopatia Hipertrófica Septal</td>
                  <td className="p-3">Hipertrofia do septo interventricular e miocárdio fetal induzida pelo efeito anabólico da hiperinsulinemia fetal crônica; habitualmente é transitória e regride nos primeiros meses de vida após normalização da glicemia.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-400">Hipocalcemia / Hipomagnesemia</td>
                  <td className="p-3">Associada a perdas e hipomagnesemia materna associadas a atraso na maturação e resposta funcional do paratormônio (PTH) fetal após o parto.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-400">Desconforto Respiratório (DMH)</td>
                  <td className="p-3">A hiperinsulinemia fetal <strong>antagoniza diretamente o efeito indutor do cortisol fetal sobre os pneumócitos tipo II</strong>, retardando a síntese de dipalmitoilfosfatidilcolina (surfactante), podendo causar desconforto mesmo em fetos a termo.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3.8 EXTENSÃO DE FREINKEL — HIPÓTESE DOS COMBUSTÍVEIS MISTOS */}
      <div className="p-6 md:p-8 rounded-3xl bg-indigo-950/40 border-2 border-indigo-500/70 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles size={20} />
          <h4 className="text-sm md:text-base font-black uppercase tracking-wider">
            🔬 FRONTEIRA — Fuel-Mediated Teratogenesis (Freinkel, anos 1980)
          </h4>
        </div>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
          A hipótese de Pedersen focou exclusivamente na glicose. <strong>Norbert Freinkel</strong> propôs que a placenta transfere uma mistura complexa de substratos metabólicos (<strong>&ldquo;combustíveis mistos&rdquo;</strong>): ácidos graxos livres (AGL), triglicerídeos, aminoácidos e corpos cetônicos.
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">
          Isso elucida por que algumas gestantes obesas, <strong>mesmo com glicemias de jejum e pós-prandiais rigorosamente dentro da meta</strong>, ainda geram conceptos grandes para a idade gestacional (GIG): a dislipidemia materna (hipertrigliceridemia e elevação de AGL) cruza a placenta e estimula a adipogênese fetal de maneira independente da glicemia pura. Por isso o IMC materno e o perfil lipídico são fatores determinantes integrados.
        </p>
      </div>

      {/* QUADRO SÍNTESE COMPARATIVO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-purple-800/80 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2.5 text-purple-400">
          <Layers size={22} />
          <h4 className="text-base md:text-lg font-black text-white">
            Quadro Comparativo: Embriopatia no DM Pré-Gestacional vs Repercussões do DMG
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3.5">Critério Comparativo</th>
                <th className="p-3.5 text-rose-400">Diabetes Pré-Gestacional (DM1 / DM2 / Overt)</th>
                <th className="p-3.5 text-amber-400">Diabetes Gestacional Clássico (DMG)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr>
                <td className="p-3.5 font-bold text-white">Janela de Exposição Crítica</td>
                <td className="p-3.5 text-rose-300">Concepção e 1º Trimestre (Semanas 3 a 8-10)</td>
                <td className="p-3.5 text-amber-300">2º e 3º Trimestres (Semanas 24 a 28 em diante)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Status da Organogênese</td>
                <td className="p-3.5 text-rose-300">Em andamento ativo (extremamente vulnerável)</td>
                <td className="p-3.5 text-amber-300">Já completamente encerrada</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Mecanismo Patogênico Central</td>
                <td className="p-3.5 text-slate-300">Estresse oxidativo mitocondrial, apoptose, inibição de Pax3 e depleção de mio-inositol</td>
                <td className="p-3.5 text-slate-300">Hipótese de Pedersen: hiperglicemia fetal e hiperinsulinemia anabólica reativa (IGF-1)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Risco de Malformações Maiores</td>
                <td className="p-3.5 text-rose-400 font-bold">Elevado (6-10% basal, &gt;20% se HbA1c &gt;10%)</td>
                <td className="p-3.5 text-emerald-400 font-bold">Não aumentado (equivalente à população geral)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Lesões Típicas</td>
                <td className="p-3.5 text-slate-300">Regressão caudal, transposição de grandes artérias, DTN, agenesia renal, holoprosencefalia</td>
                <td className="p-3.5 text-slate-300">Macrossomia assimétrica, cardiomiopatia hipertrófica transitória, hipoglicemia neonatal, policitemia</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Vigilância Pré-Natal Específica</td>
                <td className="p-3.5 text-slate-300">Ecocardiograma fetal (24-28 sem), USG morfológico 1º/2º tri, rastreio de retinopatia e nefropatia</td>
                <td className="p-3.5 text-slate-300">Acompanhamento de curva de crescimento fetal por USG (CA fetal), controle glicêmico estrito</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

