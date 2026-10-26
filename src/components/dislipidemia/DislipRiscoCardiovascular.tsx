import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Heart, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  HelpCircle,
  FileCheck,
  Zap,
  Target
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function DislipRiscoCardiovascular() {
  const [selectedRiskTier, setSelectedRiskTier] = useState<'muito_alto' | 'alto' | 'intermediario' | 'baixo'>('muito_alto');

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-red-950/20 via-card to-card border-red-500/20">
        <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
          <ShieldAlert size={16} />
          <span>Diretriz SBC / ESC / AHA</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Estratificação de Risco Cardiovascular & Metas Lipídicas
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          O tratamento da dislipidemia não é determinado pelo valor isolado do colesterol, mas sim pelo <strong>risco cardiovascular absoluto global</strong> do paciente. Quanto maior o risco de infarto, AVC ou morte cardiovascular em 10 anos, mais estrita e agressiva deve ser a meta de redução do LDL-c e Não-HDL.
        </p>

        {/* 4 Caixas de Categorias de Risco */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-line">
          {/* Muito Alto */}
          <button
            onClick={() => setSelectedRiskTier('muito_alto')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between",
              selectedRiskTier === 'muito_alto'
                ? "bg-red-600/10 border-red-600 shadow-md ring-2 ring-red-600/30"
                : "bg-card border-line hover:border-red-500/30"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">Risco Máximo</span>
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
              </div>
              <h3 className="font-bold text-brand-navy text-base">Muito Alto Risco</h3>
              <p className="text-[11px] text-ink-muted mt-1">Doença aterosclerótica clínica manifesta ou obstrução arterial &ge; 50%.</p>
            </div>
            <div className="mt-4 pt-2 border-t border-line text-xs font-bold text-red-600">
              Meta LDL: &lt; 50 mg/dL
            </div>
          </button>

          {/* Alto */}
          <button
            onClick={() => setSelectedRiskTier('alto')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between",
              selectedRiskTier === 'alto'
                ? "bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/30"
                : "bg-card border-line hover:border-amber-500/30"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Aterosclerose Subclínica</span>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              </div>
              <h3 className="font-bold text-brand-navy text-base">Alto Risco</h3>
              <p className="text-[11px] text-ink-muted mt-1">CAC &gt; 100, Aneurisma de Aorta, DRC G3-G4, LDL &ge; 190 ou DM com agravantes.</p>
            </div>
            <div className="mt-4 pt-2 border-t border-line text-xs font-bold text-amber-600">
              Meta LDL: &lt; 70 mg/dL
            </div>
          </button>

          {/* Intermediário */}
          <button
            onClick={() => setSelectedRiskTier('intermediario')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between",
              selectedRiskTier === 'intermediario'
                ? "bg-blue-500/10 border-blue-500 shadow-md ring-2 ring-blue-500/30"
                : "bg-card border-line hover:border-blue-500/30"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">ERG 5-20%</span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <h3 className="font-bold text-brand-navy text-base">Risco Intermediário</h3>
              <p className="text-[11px] text-ink-muted mt-1">ERG 5-20% em homens, 5-10% em mulheres ou DM sem fatores agravantes.</p>
            </div>
            <div className="mt-4 pt-2 border-t border-line text-xs font-bold text-blue-600">
              Meta LDL: &lt; 100 mg/dL
            </div>
          </button>

          {/* Baixo */}
          <button
            onClick={() => setSelectedRiskTier('baixo')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between",
              selectedRiskTier === 'baixo'
                ? "bg-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/30"
                : "bg-card border-line hover:border-emerald-500/30"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">ERG &lt; 5%</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <h3 className="font-bold text-brand-navy text-base">Baixo Risco</h3>
              <p className="text-[11px] text-ink-muted mt-1">Escore de Framingham em 10 anos inferior a 5%.</p>
            </div>
            <div className="mt-4 pt-2 border-t border-line text-xs font-bold text-emerald-600">
              Meta LDL: &lt; 130 mg/dL
            </div>
          </button>
        </div>
      </div>

      {/* Detalhe da Faixa Selecionada */}
      {selectedRiskTier === 'muito_alto' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn border-l-4 border-l-red-600">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">Categoria 1</span>
              <h3 className="text-2xl font-bold text-brand-navy">Muito Alto Risco Cardiovascular</h3>
              <p className="text-xs text-ink-muted mt-1">Prevenção Secundária com metas rigorosas baseadas em grandes ensaios clínicos.</p>
            </div>
            <div className="flex items-center gap-3 bg-red-600/10 p-3 rounded-2xl border border-red-600/30">
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-red-600 block">Meta LDL-c</span>
                <span className="text-xl font-black text-red-600">&lt; 50 mg/dL</span>
                <span className="text-[9px] text-ink-muted block">e queda &ge; 50%</span>
              </div>
              <div className="h-8 w-px bg-red-600/30"></div>
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-red-600 block">Meta Não-HDL</span>
                <span className="text-xl font-black text-red-600">&lt; 80 mg/dL</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-brand-navy text-sm">Critérios Diagnósticos Obrigatórios (Basta 1 critério):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-ink-muted">
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-red-600 shrink-0 mt-0.5" />
                <span><strong>Doença Arterial Coronariana (DAC):</strong> Síndrome Coronariana Aguda prévia (IAM com ou sem supra de ST, angina instável), angina estável com estenose anatômica &ge; 50%, ou revascularização miocárdica (ICP / Stent ou CRM prévia).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-red-600 shrink-0 mt-0.5" />
                <span><strong>Doença Cerebrovascular Aterosclerótica:</strong> AVC isquêmico aterotrombótico prévio ou Ataque Isquêmico Transitório (AIT).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-red-600 shrink-0 mt-0.5" />
                <span><strong>Doença Arterial Periférica (DAP):</strong> Claudicação intermitente com ITB &lt; 0,90, revascularização periférica cirúrgica/endovascular ou amputação por isquemia periférica.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-red-600 shrink-0 mt-0.5" />
                <span><strong>Estenose Arterial Severa:</strong> Obstrução aterosclerótica documentada em qualquer leito arterial &ge; 50% (ex: estenose carotídea &ge; 50%).</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line text-xs text-ink-muted space-y-2">
            <strong className="text-brand-navy block">Conduta Terapêutica de 1ª Linha:</strong>
            <p>
              Iniciar imediatamente <strong>Estatina de Alta Potência</strong> (Atorvastatina 40-80 mg ou Rosuvastatina 20-40 mg). Se não atingir a meta de LDL-c &lt; 50 mg/dL após 4 a 6 semanas, associar <strong>Ezetimiba 10 mg/dia</strong>. Caso permaneça fora da meta, associar <strong>Inibidor de PCSK9</strong> (Evolocumabe ou Alirocumabe).
            </p>
            <p className="text-[11px] text-red-600 font-semibold">
              *Nota ESC 2019/SBC: Para pacientes que apresentam um segundo evento vascular aterosclerótico em menos de 2 anos sob dose máxima tolerada de estatina, a meta opcional pode ser ainda mais estrita: <strong>LDL-c &lt; 40 mg/dL</strong>.
            </p>
          </div>
        </div>
      )}

      {selectedRiskTier === 'alto' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn border-l-4 border-l-amber-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Categoria 2</span>
              <h3 className="text-2xl font-bold text-brand-navy">Alto Risco Cardiovascular</h3>
              <p className="text-xs text-ink-muted mt-1">Aterosclerose subclínica significativa, DM com agravantes, DRC ou HF.</p>
            </div>
            <div className="flex items-center gap-3 bg-amber-500/10 p-3 rounded-2xl border border-amber-500/30">
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-amber-600 block">Meta LDL-c</span>
                <span className="text-xl font-black text-amber-600">&lt; 70 mg/dL</span>
                <span className="text-[9px] text-ink-muted block">e queda &ge; 50%</span>
              </div>
              <div className="h-8 w-px bg-amber-500/30"></div>
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-amber-600 block">Meta Não-HDL</span>
                <span className="text-xl font-black text-amber-600">&lt; 100 mg/dL</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-brand-navy text-sm">Critérios de Enquadramento em Alto Risco:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-ink-muted">
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Aterosclerose Subclínica Documentada:</strong> Escore de Cálcio Coronário (CAC) &gt; 100 unidades Agatston ou &gt; percentil 75 para idade e sexo; placa ateromatosa carotídea &gt; 50%; ou ITB &lt; 0,90.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Aneurisma de Aorta Abdominal (AAA):</strong> Dilatação documentada &ge; 3,0 cm.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Doença Renal Crônica (DRC):</strong> Estágio 3 ou 4 (TFG &lt; 60 mL/min/1,73 m² e/ou albuminúria &ge; 30 mg/g).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Hipercolesterolemia Severa:</strong> LDL-c basal &ge; 190 mg/dL (forte suspeita ou confirmação de HF).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-line flex items-start gap-2.5 md:col-span-2">
                <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Diabetes Mellitus (DM1 ou DM2) com Estratificadores de Risco Adicionais:</strong> Idade &ge; 40 anos com &ge; 10 anos de diagnóstico, tabagismo, HAS associada, síndrome metabólica, microalbuminúria ou retinopatia.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedRiskTier === 'intermediario' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn border-l-4 border-l-blue-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Categoria 3</span>
              <h3 className="text-2xl font-bold text-brand-navy">Risco Cardiovascular Intermediário</h3>
              <p className="text-xs text-ink-muted mt-1">Escore de Framingham intermediário ou Diabéticos jovens sem agravantes.</p>
            </div>
            <div className="flex items-center gap-3 bg-blue-500/10 p-3 rounded-2xl border border-blue-500/30">
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Meta LDL-c</span>
                <span className="text-xl font-black text-blue-600">&lt; 100 mg/dL</span>
              </div>
              <div className="h-8 w-px bg-blue-500/30"></div>
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Meta Não-HDL</span>
                <span className="text-xl font-black text-blue-600">&lt; 130 mg/dL</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-line text-xs text-ink-muted leading-relaxed space-y-2">
            <h4 className="font-bold text-brand-navy text-sm">Critérios de Definição:</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Escore de Risco Global (ERG):</strong> Risco em 10 anos entre <strong>5% e 20% em homens</strong>, ou entre <strong>5% e 10% em mulheres</strong>.</li>
              <li><strong>Diabetes Mellitus:</strong> Pacientes diabéticos sem nenhum fator agravante de risco ou evidência de aterosclerose subclínica.</li>
            </ul>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-900 dark:text-blue-200 mt-2 font-semibold">
              Reclassificação: Se o paciente de Risco Intermediário tiver fatores agravantes (história familiar prematura, PCR-us &gt; 2, CAC &gt; 100 ou Lp(a) &gt; 50), ele é <strong>reclassificado para ALTO RISCO</strong> (Meta LDL &lt; 70).
            </div>
          </div>
        </div>
      )}

      {selectedRiskTier === 'baixo' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn border-l-4 border-l-emerald-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Categoria 4</span>
              <h3 className="text-2xl font-bold text-brand-navy">Baixo Risco Cardiovascular</h3>
              <p className="text-xs text-ink-muted mt-1">Indivíduos jovens ou sem comorbidades significativas.</p>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/30">
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">Meta LDL-c</span>
                <span className="text-xl font-black text-emerald-600">&lt; 130 mg/dL</span>
              </div>
              <div className="h-8 w-px bg-emerald-500/30"></div>
              <div className="text-center px-2">
                <span className="text-[10px] uppercase font-bold text-emerald-600 block">Meta Não-HDL</span>
                <span className="text-xl font-black text-emerald-600">&lt; 160 mg/dL</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-line text-xs text-ink-muted leading-relaxed">
            <h4 className="font-bold text-brand-navy text-sm mb-1">Critérios & Conduta:</h4>
            <p>
              Indivíduos com <strong>ERG em 10 anos &lt; 5%</strong>. A abordagem inicial consiste fundamentalmente em <strong>Mudanças no Estilo de Vida (MEV)</strong> por 3 a 6 meses. Caso o LDL-c permaneça &ge; 160 mg/dL ou acima de 130 mg/dL com outros fatores de risco adicionais, pode-se considerar estatina de moderada ou baixa potência.
            </p>
          </div>
        </div>
      )}

      {/* FATORES AGRAVANTES DE RISCO (RECLASSIFICADORES) */}
      <div className="card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Ferramentas de Refinamento</span>
            <h3 className="text-xl font-bold text-brand-navy">Fatores Agravantes de Risco Cardiovascular</h3>
          </div>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          Pacientes inicialmente classificados como de <strong>Risco Intermediário</strong> pelo escore clínico devem ser <strong>reclassificados para ALTO RISCO</strong> (Meta LDL-c &lt; 70 mg/dL) se apresentarem pelo menos 1 dos seguintes agravantes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
            <span className="text-[10px] font-bold uppercase text-purple-600">Genética Familiar</span>
            <h5 className="font-bold text-brand-navy text-xs mt-0.5">História Familiar Prematura</h5>
            <p className="text-[11px] text-ink-muted mt-1">Parente de 1º grau com evento aterosclerótico (IAM/AVC/revascularização) &lt; 55 anos (masculino) ou &lt; 65 anos (feminino).</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
            <span className="text-[10px] font-bold uppercase text-purple-600">Imagem Cardiovascular</span>
            <h5 className="font-bold text-brand-navy text-xs mt-0.5">Escore de Cálcio Coronário (CAC)</h5>
            <p className="text-[11px] text-ink-muted mt-1">CAC &gt; 100 Agatston ou &gt; percentil 75 para idade e sexo. Revela calcificação ateromatosa coronariana subclínica.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
            <span className="text-[10px] font-bold uppercase text-purple-600">Inflamação Endotelial</span>
            <h5 className="font-bold text-brand-navy text-xs mt-0.5">PCR ultrassensível &gt; 2,0 mg/L</h5>
            <p className="text-[11px] text-ink-muted mt-1">Dosada na ausência de processos infecciosos agudos, reflete inflamação crônica de baixo grau na parede vascular.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
            <span className="text-[10px] font-bold uppercase text-purple-600">Biomarcador Genético</span>
            <h5 className="font-bold text-brand-navy text-xs mt-0.5">Lipoproteína(a) &gt; 50 mg/dL</h5>
            <p className="text-[11px] text-ink-muted mt-1">Níveis de Lp(a) &gt; 50 mg/dL (ou &gt; 125 nmol/L) conferem risco aterotrombótico adicional independente.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
            <span className="text-[10px] font-bold uppercase text-purple-600">Lesão Renal Incipiente</span>
            <h5 className="font-bold text-brand-navy text-xs mt-0.5">Microalbuminúria Persistente</h5>
            <p className="text-[11px] text-ink-muted mt-1">Relação albuminúria/creatininúria entre 30 e 300 mg/g em duas amostras, denotando disfunção endotelial sistêmica.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-line">
            <span className="text-[10px] font-bold uppercase text-purple-600">Metabolismo</span>
            <h5 className="font-bold text-brand-navy text-xs mt-0.5">Síndrome Metabólica</h5>
            <p className="text-[11px] text-ink-muted mt-1">Presença de &ge; 3 critérios IDF/ATP-III: obesidade abdominal, TG &ge; 150, HDL baixo, PA elevada, glicemia de jejum alterada.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
