import React, { useState } from 'react';
import { 
  TestTube, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  HelpCircle, 
  FileText, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function DislipDiagnostico() {
  const [fastingSelected, setFastingSelected] = useState<'sem_jejum' | 'com_jejum'>('sem_jejum');

  // Mini-calculadora de Friedewald para demonstração
  const [demoCt, setDemoCt] = useState<number>(220);
  const [demoHdl, setDemoHdl] = useState<number>(45);
  const [demoTg, setDemoTg] = useState<number>(180);

  const demoVldl = demoTg / 5;
  const demoLdlFriedewald = demoCt - demoHdl - demoVldl;
  const demoNaoHdl = demoCt - demoHdl;
  const isFriedewaldInvalid = demoTg > 400;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-cyan-900/10 via-card to-card border-cyan-500/20">
        <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-widest mb-2">
          <TestTube size={16} />
          <span>Diretrizes Laboratoriais & Consenso Brasileiro</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Diagnóstico Laboratorial & Parâmetros Modernos
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          Desde a publicação do <strong>Consenso Brasileiro para a Normatização da Determinação Laboratorial do Perfil Lipídico (SBC/SBPC-ML)</strong>, o jejum estrito de 12 horas deixou de ser mandatório para a maior parte dos pacientes, refletindo o perfil fisiológico pós-prandial real e diminuindo riscos de hipoglicemia.
        </p>

        {/* Comparativo de Jejum */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-line">
          <button
            onClick={() => setFastingSelected('sem_jejum')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              fastingSelected === 'sem_jejum'
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Clock size={16} />
            <span>Perfil Lipídico Sem Jejum (Rotina Atual)</span>
          </button>
          <button
            onClick={() => setFastingSelected('com_jejum')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              fastingSelected === 'com_jejum'
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <AlertTriangle size={16} />
            <span>Quando o Jejum de 12h é Mandatório?</span>
          </button>
        </div>
      </div>

      {/* DETALHES DO JEJUM */}
      {fastingSelected === 'sem_jejum' ? (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Nova Prática Médica</span>
              <h3 className="text-xl font-bold text-brand-navy">Vantagens & Valores de Referência sem Jejum</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <h4 className="font-bold text-brand-navy text-sm mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Fisiologia Humana Real
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Passamos de 16 a 18 horas por dia no estado pós-prandial. Avaliar o perfil lipídico sem jejum reflete com maior precisão a carga aterogênica endotelial cotidiana à qual as artérias estão submetidas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <h4 className="font-bold text-brand-navy text-sm mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Segurança em Diabéticos
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Previne episódios graves de hipoglicemia matinal decorrentes do jejum prolongado combinado ao uso de insulina, sulfonilureias ou glinidas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <h4 className="font-bold text-brand-navy text-sm mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Adesão & Comodidade
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Elimina o absenteísmo na realização de exames complementares preventivos e reduz aglomerações matinais nos postos e laboratórios clínicos.
              </p>
            </div>
          </div>

          {/* Tabela de Valores de Referência */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-line bg-slate-50 dark:bg-slate-800/50 text-brand-navy">
                  <th className="p-3 font-bold">Parâmetro Lipídico</th>
                  <th className="p-3 font-bold">Com Jejum (12 horas)</th>
                  <th className="p-3 font-bold text-cyan-600">Sem Jejum (Rotina)</th>
                  <th className="p-3 font-bold">Significado Clínico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-ink-muted">
                <tr>
                  <td className="p-3 font-semibold text-brand-navy">Colesterol Total (CT)</td>
                  <td className="p-3">&lt; 190 mg/dL</td>
                  <td className="p-3 font-semibold text-cyan-600">&lt; 190 mg/dL</td>
                  <td className="p-3">Não sofre alteração significativa pós-prandial</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-brand-navy">HDL-Colesterol</td>
                  <td className="p-3">&gt; 40 (M) / &gt; 50 (F)</td>
                  <td className="p-3 font-semibold text-cyan-600">&gt; 40 (M) / &gt; 50 (F)</td>
                  <td className="p-3">Fração estável, sem oscilação alimentar</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-brand-navy">Triglicerídeos (TG)</td>
                  <td className="p-3 font-bold">&lt; 150 mg/dL</td>
                  <td className="p-3 font-bold text-cyan-600">&lt; 175 mg/dL</td>
                  <td className="p-3">Elevação pós-prandial fisiológica de ~25-30 mg/dL esperada</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-brand-navy">Colesterol Não-HDL</td>
                  <td className="p-3">Meta conforme Risco CV</td>
                  <td className="p-3 font-semibold text-cyan-600">Meta conforme Risco CV</td>
                  <td className="p-3">Meta de LDL-c + 30 mg/dL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Exceções Formais da Diretriz</span>
              <h3 className="text-xl font-bold text-brand-navy">Quando o Jejum de 12h Ainda Deve Ser Solicitado?</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong>Regra de Ouro da SBC/SBPC:</strong> Se a amostra colhida sem jejum apresentar <strong>Triglicerídeos &ge; 440 mg/dL</strong>, o laboratório deve inserir nota técnica recomendando uma nova coleta após jejum rigoroso de 12 horas pelo médico assistente.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-card border border-line">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Critério 1</span>
                <h4 className="font-bold text-brand-navy text-sm mt-1">Histórico de Pancreatite por TG</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Pacientes com episódio prévio de pancreatite aguda por hipertrigliceridemia necessitam de monitoramento basal sem interferência alimentar para titulação terapêutica segura.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-line">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Critério 2</span>
                <h4 className="font-bold text-brand-navy text-sm mt-1">Hipertrigliceridemia Grave Conhecida</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Pacientes em investigação de Síndrome de Quilomicronemia Familiar (SQF) ou em fase de ajuste posológico de fibratos/ômega-3 para avaliar resposta basal farmacológica.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-line">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Critério 3</span>
                <h4 className="font-bold text-brand-navy text-sm mt-1">Suspeita de Dislipidemia Mista Grave</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Quando se necessita avaliar o fenótipo de Fredrickson tipo I ou V ou quando dosagens associadas requerem jejum concomitante.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FÓRMULA DE FRIEDEWALD vs MARTIN-HOPKINS vs NÃO-HDL */}
      <div className="card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600">
            <Calculator size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Cálculos & Métodos</span>
            <h3 className="text-xl font-bold text-brand-navy">Fórmula de Friedewald & Colesterol Não-HDL</h3>
          </div>
        </div>

        {/* Explicação da Fórmula de Friedewald */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <h4 className="font-bold text-brand-navy text-sm mb-1">A Equação de Friedewald:</h4>
              <div className="p-3 my-2 rounded-xl bg-card border border-line font-mono text-center font-bold text-brand-navy text-sm">
                LDL-c = CT - HDL-c - (Triglicerídeos / 5)
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                O termo <code className="font-mono bg-bg px-1 py-0.5 rounded">TG / 5</code> estima o colesterol contido nas partículas de VLDL (VLDL-colesterol), assumindo uma proporção constante de 1:5 entre colesterol e triglicerídeos nas lipoproteínas de muito baixa densidade.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-900 dark:text-red-200 leading-relaxed space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-red-600">
                <AlertTriangle size={16} />
                <span>Limitação Crítica: Quando NÃO Usar Friedewald?</span>
              </div>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Triglicerídeos &gt; 400 mg/dL:</strong> A fórmula subestima dramaticamente o LDL-c e torna-se matematicamente inválida! Nesses casos, o laboratório deve usar a <em>dosagem direta de LDL</em> ou calcular o <em>Colesterol Não-HDL</em>.</li>
                <li><strong>Presença de Quilomícrons:</strong> A proporção colesterol/TG se desfaz completamente.</li>
                <li><strong>Disbetalipoproteinemia (Tipo III):</strong> O acúmulo de remanescentes ricos em colesterol falseia o cálculo.</li>
              </ul>
            </div>
          </div>

          {/* Mini-Simulador Interativo da Fórmula */}
          <div className="p-5 rounded-2xl bg-card border border-line space-y-4">
            <h4 className="font-bold text-brand-navy text-sm flex items-center justify-between">
              <span>Simulador Clínico da Fórmula</span>
              <span className="text-[10px] text-ink-muted font-normal">Ajuste os valores</span>
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold text-ink-muted block mb-1">Colesterol Total (CT)</label>
                <input
                  type="number"
                  value={demoCt}
                  onChange={(e) => setDemoCt(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg bg-bg border border-line text-brand-navy font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-ink-muted block mb-1">HDL-c</label>
                <input
                  type="number"
                  value={demoHdl}
                  onChange={(e) => setDemoHdl(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg bg-bg border border-line text-brand-navy font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-ink-muted block mb-1">Triglicerídeos (TG)</label>
                <input
                  type="number"
                  value={demoTg}
                  onChange={(e) => setDemoTg(Number(e.target.value))}
                  className={cn(
                    "w-full text-xs p-2 rounded-lg border font-bold",
                    demoTg > 400 ? "border-red-500 bg-red-500/10 text-red-600" : "bg-bg border-line text-brand-navy"
                  )}
                />
              </div>
            </div>

            {/* Resultados */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
                <span className="text-[10px] font-bold text-ink-muted block">LDL-c (Friedewald):</span>
                {isFriedewaldInvalid ? (
                  <span className="text-xs font-bold text-red-600 block mt-1">
                    INVÁLIDO (TG &gt; 400 mg/dL)
                  </span>
                ) : (
                  <span className="text-lg font-bold text-brand-navy block mt-0.5">
                    {Math.round(demoLdlFriedewald)} mg/dL
                  </span>
                )}
                <span className="text-[10px] text-ink-muted">Estimativa VLDL: {Math.round(demoVldl)} mg/dL</span>
              </div>

              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-[10px] font-bold text-indigo-600 block">Colesterol Não-HDL:</span>
                <span className="text-lg font-bold text-brand-navy block mt-0.5">
                  {Math.round(demoNaoHdl)} mg/dL
                </span>
                <span className="text-[10px] text-indigo-600/80">Sempre válido (independe dos TG!)</span>
              </div>
            </div>
          </div>
        </div>

        {/* O Valor Clínico do Colesterol Não-HDL e ApoB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
            <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-600"><CheckCircle2 size={14} /></span>
              Colesterol Não-HDL (CT &minus; HDL)
            </h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              Reflete todo o colesterol carreado nas partículas potencialmente aterogênicas: <strong>LDL + VLDL + IDL + Lp(a)</strong>.
            </p>
            <p className="text-xs text-ink-muted leading-relaxed">
              É superior ao LDL-c isolado em indivíduos com <strong>hipertrigliceridemia, diabetes mellitus, obesidade e síndrome metabólica</strong>, nos quais há excesso de partículas pequenas e densas e remanescentes ricos em colesterol.
            </p>
            <div className="p-2.5 rounded-xl bg-indigo-500/5 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              Meta de Não-HDL = Meta de LDL-c do paciente + 30 mg/dL
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
            <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
              <span className="p-1 rounded bg-rose-500/10 text-rose-600"><Activity size={14} /></span>
              Apolipoproteína B (ApoB) e Lipoproteína(a) [Lp(a)]
            </h4>
            <ul className="text-xs text-ink-muted space-y-2">
              <li>
                <strong>ApoB:</strong> Mede diretamente a contagem total de partículas aterogênicas. Meta &lt; 80 mg/dL (Alto Risco) e &lt; 65 mg/dL (Muito Alto Risco). Especialmente útil em dislipidemia mista.
              </li>
              <li>
                <strong>Lp(a):</strong> Partícula idêntica à LDL ligada covalentemente à apolipoproteína(a). Causa aterogênese e trombogênese. Determinada quase 90% geneticamente e <em>não responde a estatinas</em>. Dosar pelo menos 1 vez na vida em pacientes com DAC prematura ou história familiar de infarto jovem. Alerta: &gt; 50 mg/dL.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
