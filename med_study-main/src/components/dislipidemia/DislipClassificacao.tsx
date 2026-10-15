import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Stethoscope, 
  Eye, 
  UserCheck, 
  Pill, 
  Dna,
  Calculator,
  Flame,
  ArrowRight
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function DislipClassificacao() {
  const [activeTab, setActiveTab] = useState<'sbc' | 'fredrickson' | 'secundarias' | 'hf'>('sbc');

  // Estado para calculadora DLCN (Dutch Lipid Clinic Network)
  const [dlcnParentPrecocious, setDlcnParentPrecocious] = useState(false); // +1
  const [dlcnParentXantoma, setDlcnParentXantoma] = useState(false); // +2
  const [dlcnParentLdl95, setDlcnParentLdl95] = useState(false); // +1
  const [dlcnOwnCadPrecocious, setDlcnOwnCadPrecocious] = useState(false); // +2
  const [dlcnOwnCerebroPrecocious, setDlcnOwnCerebroPrecocious] = useState(false); // +1
  const [dlcnTendonXanthoma, setDlcnTendonXanthoma] = useState(false); // +6
  const [dlcnArcusCornealis, setDlcnArcusCornealis] = useState(false); // +4 (<45y)
  const [dlcnLdlBracket, setDlcnLdlBracket] = useState<number>(0); // 0, 1, 3, 5, 8
  const [dlcnGeneticMutation, setDlcnGeneticMutation] = useState(false); // +8

  // Cálculo do DLCN
  const calculateDlcn = () => {
    let score = 0;
    // História Familiar (máx 2)
    const famScore = Math.min(2, (dlcnParentPrecocious ? 1 : 0) + (dlcnParentXantoma ? 2 : 0) + (dlcnParentLdl95 ? 1 : 0));
    score += famScore;

    // História Clínica Pessoal (máx 2)
    const personalScore = Math.min(2, (dlcnOwnCadPrecocious ? 2 : 0) + (dlcnOwnCerebroPrecocious ? 1 : 0));
    score += personalScore;

    // Exame Físico
    if (dlcnTendonXanthoma) score += 6;
    else if (dlcnArcusCornealis) score += 4;

    // LDL-c basal
    score += dlcnLdlBracket;

    // Teste Genético
    if (dlcnGeneticMutation) score += 8;

    return score;
  };

  const dlcnScore = calculateDlcn();
  const getDlcnClassification = (sc: number) => {
    if (sc > 8) return { label: 'Diagnóstico Definitivo de HF', color: 'text-red-600 bg-red-500/10 border-red-500/30' };
    if (sc >= 6) return { label: 'Diagnóstico Provável de HF', color: 'text-amber-600 bg-amber-500/10 border-amber-500/30' };
    if (sc >= 3) return { label: 'Diagnóstico Possível de HF', color: 'text-blue-600 bg-blue-500/10 border-blue-500/30' };
    return { label: 'Diagnóstico Improvável', color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30' };
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-indigo-900/10 via-card to-card border-indigo-500/20">
        <div className="flex items-center gap-2 text-indigo-500 text-xs font-bold uppercase tracking-widest mb-2">
          <Layers size={16} />
          <span>Sistemas de Classificação Clínica e Etiológica</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Classificação das Dislipidemias
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          A abordagem clínica moderna divide as dislipidemias conforme o <strong>perfil laboratorial fenotípico</strong> (Diretriz SBC), a clássica <strong>classificação eletroforética de Fredrickson</strong> (OMS), a exclusão mandatória de <strong>causas secundárias</strong> e o rastreamento genético da <strong>Hipercolesterolemia Familiar</strong>.
        </p>

        {/* Abas */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-line">
          <button
            onClick={() => setActiveTab('sbc')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'sbc'
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Stethoscope size={16} />
            <span>Fenotípica Laboratorial (SBC)</span>
          </button>
          <button
            onClick={() => setActiveTab('fredrickson')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'fredrickson'
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Layers size={16} />
            <span>Classificação de Fredrickson (OMS)</span>
          </button>
          <button
            onClick={() => setActiveTab('secundarias')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'secundarias'
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <AlertCircle size={16} />
            <span>Causas Secundárias (Rastreio)</span>
          </button>
          <button
            onClick={() => setActiveTab('hf')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'hf'
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Dna size={16} />
            <span>Hipercolesterolemia Familiar & Escore DLCN</span>
          </button>
        </div>
      </div>

      {/* ABA 1: DIRETRIZ SBC */}
      {activeTab === 'sbc' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Hipercolesterolemia Isolada */}
            <div className="card p-5 border-l-4 border-l-rose-500 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-base">1. Hipercolesterolemia Isolada</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/10 text-rose-600">LDL-c Elevado</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Elevação isolada do <strong>LDL-c &ge; 160 mg/dL</strong> (ou acima da meta para a respectiva faixa de risco cardiovascular do paciente).
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-ink-muted space-y-1">
                <div><strong>Lipoproteína alterada:</strong> LDL (ApoB-100).</div>
                <div><strong>Risco predominante:</strong> Aterosclerose coronariana e cerebrovascular acelerada.</div>
                <div><strong>Base terapêutica:</strong> Estatina de moderada ou alta intensidade &plusmn; Ezetimiba.</div>
              </div>
            </div>

            {/* 2. Hipertrigliceridemia Isolada */}
            <div className="card p-5 border-l-4 border-l-amber-500 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-base">2. Hipertrigliceridemia Isolada</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-600">TG Elevados</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Elevação isolada dos triglicerídeos: <strong>TG &ge; 150 mg/dL</strong> (com jejum de 12h) ou <strong>&ge; 175 mg/dL</strong> (sem jejum).
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-ink-muted space-y-1">
                <div><strong>Lipoproteína alterada:</strong> VLDL e/ou Quilomícrons.</div>
                <div><strong>Risco:</strong> Aterogênico (se 150-499 mg/dL) ou <strong>Pancreatite Aguda</strong> (se &ge; 500 mg/dL).</div>
                <div><strong>Base terapêutica:</strong> MEV severa, controle de DM, corte de álcool e Fibratos (se TG &ge; 500).</div>
              </div>
            </div>

            {/* 3. Dislipidemia Mista */}
            <div className="card p-5 border-l-4 border-l-purple-500 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-base">3. Dislipidemia Mista</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/10 text-purple-600">LDL-c + TG Elevados</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Aumento concomitante do <strong>LDL-c</strong> e dos <strong>Triglicerídeos</strong>. Se TG &ge; 400 mg/dL (invalida Friedewald), define-se por CT &ge; 190 mg/dL e TG &ge; 150 mg/dL.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-ink-muted space-y-1">
                <div><strong>Lipoproteínas alteradas:</strong> LDL e VLDL.</div>
                <div><strong>Risco:</strong> Risco aterosclerótico sinérgico e muito elevado.</div>
                <div><strong>Base terapêutica:</strong> Estatina primeiro; atingida a meta de LDL, avaliar Não-HDL e adicionar fenofibrato se TG &ge; 200.</div>
              </div>
            </div>

            {/* 4. HDL-c Baixo */}
            <div className="card p-5 border-l-4 border-l-blue-500 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-base">4. HDL-c Baixo</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/10 text-blue-600">Ateroproteção Reduzida</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Redução do <strong>HDL-c &lt; 40 mg/dL em homens</strong> e <strong>&lt; 50 mg/dL em mulheres</strong>, de forma isolada ou associada ao aumento de LDL ou TG.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-ink-muted space-y-1">
                <div><strong>Fisiopatologia:</strong> Comum na Síndrome Metabólica, resistência insulínica e sedentarismo.</div>
                <div><strong>Conduta:</strong> Cessação do tabagismo, exercício físico aeróbico regular e perda ponderal (sem drogas específicas indicadas).</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: FREDRICKSON */}
      {activeTab === 'fredrickson' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn overflow-x-auto">
          <div>
            <h3 className="text-lg font-bold text-brand-navy">Classificação Fenotípica de Fredrickson (OMS)</h3>
            <p className="text-xs text-ink-muted mt-1">Classificação baseada no padrão eletroforético e ultracentrifugação das lipoproteínas.</p>
          </div>

          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-line bg-slate-50 dark:bg-slate-800/50 text-brand-navy">
                <th className="p-3 font-bold">Tipo</th>
                <th className="p-3 font-bold">Lipoproteína Elevada</th>
                <th className="p-3 font-bold">Lipídio Predominante</th>
                <th className="p-3 font-bold">Defeito Molecular Primário</th>
                <th className="p-3 font-bold">Achados Físicos Patognomônicos</th>
                <th className="p-3 font-bold">Risco Clínico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink-muted">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="p-3 font-bold text-amber-600">Tipo I</td>
                <td className="p-3 font-semibold text-brand-navy">Quilomícrons</td>
                <td className="p-3">Triglicerídeos (&gt;&gt; 1.000)</td>
                <td className="p-3">Deficiência de LPL ou ApoC-II</td>
                <td className="p-3">Xantomas eruptivos, hepatoesplenomegalia, lipemia retinalis</td>
                <td className="p-3 font-bold text-red-600">Pancreatite Aguda</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="p-3 font-bold text-rose-600">Tipo IIa</td>
                <td className="p-3 font-semibold text-brand-navy">LDL</td>
                <td className="p-3">Colesterol Total (LDL-c)</td>
                <td className="p-3">Mutação no LDLR, ApoB-100 ou ganho de função da PCSK9 (HF)</td>
                <td className="p-3">Xantomas tendíneos (tendão calcâneo), arco corneano precoce, xantelasmas</td>
                <td className="p-3 font-bold text-rose-600">DAC / Aterosclerose Acelerada</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="p-3 font-bold text-purple-600">Tipo IIb</td>
                <td className="p-3 font-semibold text-brand-navy">LDL e VLDL</td>
                <td className="p-3">Colesterol e Triglicerídeos</td>
                <td className="p-3">Hiperprodução hepática de ApoB (Dislipidemia Combinada Familiar)</td>
                <td className="p-3">Xantelasmas, estigmas de aterosclerose precoce</td>
                <td className="p-3 font-bold text-rose-600">DAC Precoce & Aterosclerose</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="p-3 font-bold text-indigo-600">Tipo III</td>
                <td className="p-3 font-semibold text-brand-navy">IDL / Remanescentes (Disbetalipoproteinemia)</td>
                <td className="p-3">Colesterol e Triglicerídeos em proporção ~ 1:1</td>
                <td className="p-3">Homozigose para isoforma ApoE-2 (ApoE2/E2) com falha no clearance hepático</td>
                <td className="p-3 font-semibold text-brand-navy">Xantomas estriados palmares (patognomônicos) e tuberoeruptivos</td>
                <td className="p-3 font-bold text-rose-600">DAC Precoce & Doença Arterial Periférica (DAP)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="p-3 font-bold text-amber-600">Tipo IV</td>
                <td className="p-3 font-semibold text-brand-navy">VLDL</td>
                <td className="p-3">Triglicerídeos (200 - 800)</td>
                <td className="p-3">Hipertrigliceridemia Familiar, sobrecarga hepática de carboidratos/etanol</td>
                <td className="p-3">Comum em obesos e diabéticos, sem xantomas clássicos</td>
                <td className="p-3">Cardiovascular & Risco de Pancreatite se descompensar</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                <td className="p-3 font-bold text-red-600">Tipo V</td>
                <td className="p-3 font-semibold text-brand-navy">Quilomícrons + VLDL</td>
                <td className="p-3">Triglicerídeos (&gt;&gt; 1.000) e Colesterol</td>
                <td className="p-3">Hiperprodução de VLDL associada a defeito parcial de LPL</td>
                <td className="p-3">Xantomas eruptivos, lipemia retinalis, dor abdominal pós-prandial</td>
                <td className="p-3 font-bold text-red-600">Altíssimo Risco de Pancreatite Aguda</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ABA 3: CAUSAS SECUNDÁRIAS */}
      {activeTab === 'secundarias' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-brand-navy">Exclusão Mandatória de Causas Secundárias</h3>
            <p className="text-xs text-ink-muted mt-1">
              Antes de atribuir a dislipidemia a causa primária ou iniciar farmacoterapia definitiva, deve-se investigar e corrigir causas metabólicas, endócrinas, renais e medicamentosas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Endocrinopatias</span>
              <h4 className="font-bold text-brand-navy text-sm">Hipotireoidismo (TSH Elevado)</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                O hormônio tireoidiano regula a transcrição dos receptores de LDL (LDLR) no fígado. No hipotireoidismo, a queda dos LDLR leva ao acúmulo de LDL-c sérico, gerando hipercolesterolemia grave.
              </p>
              <div className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-500/10 p-2 rounded-lg">
                &rarr; Conduta: Dosar TSH em todo paciente com hipercolesterolemia nova. Repor levotiroxina antes de definir dose final de estatina.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Nefrologia</span>
              <h4 className="font-bold text-brand-navy text-sm">Síndrome Nefrótica & DRC</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Na síndrome nefrótica, a hipoalbuminemia estimula a síntese hepática descontrolada de lipoproteínas (VLDL e LDL), gerando colesterol total frequentemente &gt; 400-500 mg/dL e lipidúria (corpos graxos ovalados). Na DRC, há redução da LPL e acúmulo de triglicerídeos.
              </p>
              <div className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold bg-blue-500/10 p-2 rounded-lg">
                &rarr; Conduta: Avaliar creatinina, TFG e relação albuminúria/creatininúria.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">Metabolismo & Fígado</span>
              <h4 className="font-bold text-brand-navy text-sm">Diabetes Mellitus Descompensado & Etilismo</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                A deficiência insulínica e a resistência periférica ativam a lipase hormônio-sensível no tecido adiposo, gerando influxo maciço de ácidos graxos livres ao fígado e hiperprodução de VLDL rica em triglicerídeos. O álcool estimula a síntese de ácidos graxos e inibe a beta-oxidação hepática.
              </p>
              <div className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold bg-purple-500/10 p-2 rounded-lg">
                &rarr; Conduta: Otimização glicêmica com iSGLT2/GLP-1RA e abstinência alcoólica total.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Farmacologia</span>
              <h4 className="font-bold text-brand-navy text-sm">Dislipidemias Medicamentosas</h4>
              <ul className="text-xs text-ink-muted space-y-1 list-disc pl-4">
                <li><strong>Corticosteroides:</strong> Elevam VLDL e LDL por resistência insulínica.</li>
                <li><strong>Inibidores de Protease (TARV):</strong> Ritonavir e atazanavir geram hipertrigliceridemia acentuada.</li>
                <li><strong>Retinoides (Isotretinoína/Roacutan):</strong> Elevação dose-dependente de TG e LDL.</li>
                <li><strong>Ciclosporina & Sirolimo:</strong> Inibição do clearance de LDL.</li>
                <li><strong>Tiazídicos (altas doses) e Propranolol:</strong> Elevação leve de TG e redução de HDL.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ABA 4: HIPERCOLESTEROLEMIA FAMILIAR & ESCORE DLCN */}
      {activeTab === 'hf' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-1">
              <Dna size={16} />
              <span>Condição Genética Monogênica</span>
            </div>
            <h3 className="text-xl font-bold text-brand-navy">Hipercolesterolemia Familiar (HF)</h3>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
              Doença autossômica codominante de alta prevalência (1 em cada 250 a 300 indivíduos na forma heterozigótica). Caracterizada por <strong>LDL-c &ge; 190 mg/dL</strong> em adultos (&ge; 160 mg/dL em crianças), estigmas físicos extravasculares e risco de DAC prematura até <strong>20 vezes maior</strong>.
            </p>
          </div>

          {/* Sinais Físicos Patognomônicos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <div className="flex items-center gap-2 text-brand-navy font-bold text-xs mb-1">
                <UserCheck size={16} className="text-rose-500" />
                Xantomas Tendíneos
              </div>
              <p className="text-[11px] text-ink-muted">
                Espessamento e nódulos endurecidos indolores no <strong>tendão calcâneo (de Aquiles)</strong> e tendões extensores dos dedos das mãos. Patognomônico de HF.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <div className="flex items-center gap-2 text-brand-navy font-bold text-xs mb-1">
                <Eye size={16} className="text-rose-500" />
                Arco Corneano Precoce
              </div>
              <p className="text-[11px] text-ink-muted">
                Halo esbranquiçado pericorneano por depósito lipídico. Tem valor patológico e diagnóstico quando surge em pacientes com <strong>idade &lt; 45 anos</strong>.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <div className="flex items-center gap-2 text-brand-navy font-bold text-xs mb-1">
                <AlertCircle size={16} className="text-rose-500" />
                Xantelasmas Palpebrais
              </div>
              <p className="text-[11px] text-ink-muted">
                Placas amareladas nas pálpebras superiores/inferiores. Frequentes, mas não específicos (50% ocorrem em indivíduos com lipídios normais).
              </p>
            </div>
          </div>

          {/* Calculadora do Escore DLCN */}
          <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Calculator size={18} />
                <span>Critérios Holandeses (Dutch Lipid Clinic Network - DLCN)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-muted">Pontuação Total:</span>
                <span className="text-lg font-bold text-brand-navy px-3 py-1 rounded-xl bg-card border border-line">
                  {dlcnScore} pts
                </span>
              </div>
            </div>

            {/* Classificação resultante */}
            <div className={cn("p-3 rounded-xl border text-xs font-bold flex items-center justify-between", getDlcnClassification(dlcnScore).color)}>
              <span>Interpretação Clínica: {getDlcnClassification(dlcnScore).label}</span>
              <span className="text-[10px] font-normal">
                {dlcnScore > 8 ? 'Iniciar Estatina de Alta Potência + Ezetimiba imediata e rastreamento em cascata' : 'Avaliar história familiar e repetir dosagens'}
              </span>
            </div>

            {/* Formulário Interativo do DLCN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Grupo 1: História Familiar */}
              <div className="p-3.5 rounded-xl bg-card border border-line space-y-2">
                <span className="text-[11px] font-bold text-brand-navy block">1. História Familiar (máx 2 pts)</span>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dlcnParentPrecocious}
                    onChange={(e) => setDlcnParentPrecocious(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600"
                  />
                  <span>Parente de 1º grau com DCV prematura (&lt;55a masc, &lt;65a fem) (+1)</span>
                </label>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dlcnParentXantoma}
                    onChange={(e) => setDlcnParentXantoma(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600"
                  />
                  <span>Parente de 1º grau com xantoma tendíneo ou arco corneano precoce (+2)</span>
                </label>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dlcnParentLdl95}
                    onChange={(e) => setDlcnParentLdl95(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600"
                  />
                  <span>Parente de 1º grau com LDL &gt; percentil 95 (+1)</span>
                </label>
              </div>

              {/* Grupo 2: História Clínica Pessoal */}
              <div className="p-3.5 rounded-xl bg-card border border-line space-y-2">
                <span className="text-[11px] font-bold text-brand-navy block">2. História Clínica Pessoal (máx 2 pts)</span>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dlcnOwnCadPrecocious}
                    onChange={(e) => setDlcnOwnCadPrecocious(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600"
                  />
                  <span>Paciente com DAC prematura (&lt;55a masc, &lt;65a fem) (+2)</span>
                </label>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dlcnOwnCerebroPrecocious}
                    onChange={(e) => setDlcnOwnCerebroPrecocious(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600"
                  />
                  <span>Paciente com Doença Vascular Periférica ou Cerebral prematura (+1)</span>
                </label>
              </div>

              {/* Grupo 3: Exame Físico */}
              <div className="p-3.5 rounded-xl bg-card border border-line space-y-2">
                <span className="text-[11px] font-bold text-brand-navy block">3. Exame Físico</span>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dlcnTendonXanthoma}
                    onChange={(e) => {
                      setDlcnTendonXanthoma(e.target.checked);
                      if (e.target.checked) setDlcnArcusCornealis(false);
                    }}
                    className="mt-0.5 rounded text-indigo-600"
                  />
                  <span>Xantomas Tendíneos presentes no paciente (+6)</span>
                </label>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dlcnArcusCornealis}
                    disabled={dlcnTendonXanthoma}
                    onChange={(e) => setDlcnArcusCornealis(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600 disabled:opacity-50"
                  />
                  <span>Arco Corneano em paciente com idade &lt; 45 anos (+4)</span>
                </label>
              </div>

              {/* Grupo 4: LDL-c e Genética */}
              <div className="p-3.5 rounded-xl bg-card border border-line space-y-2">
                <span className="text-[11px] font-bold text-brand-navy block">4. Níveis de LDL-c e Genética</span>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Faixa basal de LDL-c (sem tratamento):</label>
                  <select
                    value={dlcnLdlBracket}
                    onChange={(e) => setDlcnLdlBracket(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-lg bg-bg border border-line text-brand-navy"
                  >
                    <option value={0}>LDL-c &lt; 155 mg/dL (0 pts)</option>
                    <option value={1}>LDL-c 155 – 189 mg/dL (+1 pt)</option>
                    <option value={3}>LDL-c 190 – 249 mg/dL (+3 pts)</option>
                    <option value={5}>LDL-c 250 – 329 mg/dL (+5 pts)</option>
                    <option value={8}>LDL-c &ge; 330 mg/dL (+8 pts)</option>
                  </select>
                </div>
                <label className="flex items-start gap-2 text-xs text-ink-muted cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={dlcnGeneticMutation}
                    onChange={(e) => setDlcnGeneticMutation(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600"
                  />
                  <span>Mutação funcional identificada (LDLR, APOB ou PCSK9) (+8)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
