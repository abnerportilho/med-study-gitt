import React, { useState } from 'react';
import { 
  Droplet, AlertTriangle, CheckCircle2, Info, 
  HelpCircle, Sparkles, Scale, ShieldAlert, ArrowRight
} from 'lucide-react';

export default function USGAvaliacaoLiquido() {
  const [measurementMode, setMeasurementMode] = useState<'mbv' | 'ila'>('mbv');
  const [mbvValue, setMbvValue] = useState<number>(4.5);
  const [ilaValue, setIlaValue] = useState<number>(14.0);
  const [etiologyFilter, setEtiologyFilter] = useState<'todos' | 'oligo' | 'poli'>('todos');

  // Diagnóstico do Líquido baseado na medição
  const getFluidDiagnosis = () => {
    if (measurementMode === 'mbv') {
      if (mbvValue < 2.0) {
        return {
          status: 'Oligoidrâmnio / Oligoâmnio',
          color: 'text-rose-400',
          bg: 'bg-rose-950/40 border-rose-800',
          badge: 'MBV < 2,0 cm (Oligoidrâmnio)',
          conduct: 'Investigar rotura prematura de membranas ovulares (RPMO), insuficiência placentária crônica (redistribuição com oligúria fetal), malformações do trato urinário fetal (agenesia renal, válvula de uretra posterior) e uso materno de inibidores da síntese de prostaglandinas / IECA.'
        };
      } else if (mbvValue <= 8.0) {
        return {
          status: 'Volume Amniótico Normal',
          color: 'text-emerald-400',
          bg: 'bg-emerald-950/40 border-emerald-800',
          badge: 'MBV entre 2,0 e 8,0 cm (Normal)',
          conduct: 'Volume hígido e fisiológico de líquido amniótico. Manter vigilância pré-natal habitual.'
        };
      } else if (mbvValue <= 11.0) {
        return {
          status: 'Polidrâmnio Leve',
          color: 'text-amber-400',
          bg: 'bg-amber-950/40 border-amber-800',
          badge: 'MBV entre 8,1 e 11,0 cm (Poli Leve)',
          conduct: 'Investigar ativamente Diabetes Gestacional (TOTG 75g), anomalias da deglutição fetal e pesquisar aloimunização Rh / infecções congênitas. Frequentemente idiopático.'
        };
      } else {
        return {
          status: 'Polidrâmnio Moderado a Grave',
          color: 'text-rose-400',
          bg: 'bg-rose-950/40 border-rose-800',
          badge: 'MBV > 11,0 cm (Poli Severo)',
          conduct: 'Alto risco de atresia esofágica/duodenal, defeitos do tubo neural (anencefalia sem deglutição), hidropisia fetal e descolamento prematuro de placenta na descompressão súbita. Avaliar amnioredução se desconforto materno respiratório importante.'
        };
      }
    } else {
      if (ilaValue < 5.0) {
        return {
          status: 'Oligoidrâmnio / Oligoâmnio',
          color: 'text-rose-400',
          bg: 'bg-rose-950/40 border-rose-800',
          badge: 'ILA < 5,0 cm (Oligoidrâmnio)',
          conduct: 'Investigar rotura prematura de membranas ovulares (RPMO), insuficiência placentária crônica com hipóxia, anomalias do aparelho urinário fetal e desidratação materna severa.'
        };
      } else if (ilaValue <= 24.0) {
        return {
          status: 'Volume Amniótico Normal',
          color: 'text-emerald-400',
          bg: 'bg-emerald-950/40 border-emerald-800',
          badge: 'ILA entre 5,0 e 24,0 cm (Normal)',
          conduct: 'Volume hígido e fisiológico de líquido amniótico. Manter vigilância de rotina.'
        };
      } else {
        return {
          status: 'Polidrâmnio (ILA > 24,0 cm)',
          color: 'text-amber-400',
          bg: 'bg-amber-950/40 border-amber-800',
          badge: 'ILA > 24,0 cm (Polidrâmnio)',
          conduct: 'Rastrear diabetes materno mal controlado, atresia de trato gastrointestinal fetal, anomalias do sistema nervoso central e infecções congênitas (sífilis, toxoplasmose, CMV).'
        };
      }
    }
  };

  const fluidDiag = getFluidDiagnosis();

  return (
    <div className="space-y-6">
      {/* HEADER DA SEÇÃO DE LÍQUIDO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Droplet size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Pilar Clínico 2 · Homeostase & Vitalidade
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Avaliação do Volume de Líquido Amniótico
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          O volume de líquido amniótico reflete o equilíbrio dinâmico entre a produção fetal (urina fetal e secreções pulmonares) e a reabsorção (deglutição fetal e transferência intramembranosa). Alterações extremas sinalizam patologias fetais ou insuficiência placentária crônica.
        </p>
      </div>

      {/* SIMULADOR CLÍNICO: ILA VS MAIOR BOLSÃO VERTICAL (MBV) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/70 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Scale size={20} />
            <h4 className="text-base font-black text-white">
              Técnicas de Mensuração: ILA vs Maior Bolsão Vertical (MBV)
            </h4>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setMeasurementMode('mbv')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                measurementMode === 'mbv' ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Maior Bolsão Vertical (MBV)
            </button>
            <button
              onClick={() => setMeasurementMode('ila')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                measurementMode === 'ila' ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Índice de Líquido Amniótico (ILA)
            </button>
          </div>
        </div>

        {/* Detalhes Técnicos da Medição dos Slides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-300 block text-sm">
              {measurementMode === 'mbv' ? 'Técnica do Maior Bolsão Vertical (MBV)' : 'Técnica do ILA (4 Quadrantes)'}
            </span>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>Evitar cordão umbilical e partes fetais</strong>: a área medida deve ser exclusivamente anecoica.</li>
              <li><strong>Caliper perpendicular ao leito da gestante</strong>: transdutor alinhado ao plano sagital longitudinal, perpendicular ao solo.</li>
              <li>Não exercer pressão excessiva com o transdutor para não espremer o bolsão.</li>
              {measurementMode === 'mbv' && (
                <li>Bolsão único com largura horizontal mínima de 1 cm. Recomendado pela <strong>ISUOG e Cochrane</strong> para evitar sobrediagnóstico.</li>
              )}
              {measurementMode === 'ila' && (
                <li>Soma matemática da medida vertical do maior bolsão de cada um dos 4 quadrantes uterinos (divididos pela linha nigra e cicatriz umbilical).</li>
              )}
            </ul>
          </div>

          {/* Controle Interativo */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-slate-300 text-xs">
                  {measurementMode === 'mbv' ? 'Valor do MBV medido (cm):' : 'Valor do ILA somado (cm):'}
                </label>
                <span className="text-base font-mono font-black text-cyan-400">
                  {measurementMode === 'mbv' ? `${mbvValue.toFixed(1)} cm` : `${ilaValue.toFixed(1)} cm`}
                </span>
              </div>

              {measurementMode === 'mbv' ? (
                <input
                  type="range"
                  min={0.5}
                  max={16.0}
                  step={0.1}
                  value={mbvValue}
                  onChange={(e) => setMbvValue(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              ) : (
                <input
                  type="range"
                  min={1.0}
                  max={35.0}
                  step={0.5}
                  value={ilaValue}
                  onChange={(e) => setIlaValue(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              )}

              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span className="text-rose-400 font-bold">Oligoâmnio</span>
                <span className="text-emerald-400 font-bold">Normal</span>
                <span className="text-amber-400 font-bold">Polidrâmnio</span>
              </div>
            </div>

            {/* Resultado do Laudo */}
            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${fluidDiag.bg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-black uppercase tracking-wider text-xs ${fluidDiag.color}`}>
                  {fluidDiag.badge}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Conduta Clínica</span>
              </div>
              <p className="text-slate-200 text-xs">
                {fluidDiag.conduct}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARAÇÃO CLÍNICA: OLIGOÂMNIO VS POLIDRÂMNIO (SLIDE 36) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <AlertTriangle size={20} className="text-amber-400" />
            <span>Oligoâmnio e Polidrâmnio Pedem Investigação Dirigida</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Etiologias & Diagnósticos Diferenciais</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* OLIGOÂMNIO */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm">1. Oligoâmnio (Redução do Volume)</span>
              <span className="text-[10px] font-mono text-rose-300">MBV &lt; 2 cm | ILA &lt; 5 cm</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Causas principais e roteiro etiológico:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Rotura Prematura de Membranas (RPMO):</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Causa mais comum. Realizar teste de cristalização, teste com papel de nitrazina ou amnisure.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Insuficiência Placentária Crônica:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Hipóxia fetal provoca centralização de fluxo com vasoconstrição renal e oligúria.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Anomalias Urinárias Fetais:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Agenesia renal bilateral (Síndrome de Potter), rim policístico infantil, válvula de uretra posterior (sinal da fechadura).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Fármacos & Pós-Datismo:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Uso materno de AINEs (fechamento ductal precoce e redução de fluxo renal), IECA/BRA e senescência placentária após 41-42 semanas.</p>
              </div>
            </div>
          </div>

          {/* POLIDRÂMNIO */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">2. Polidrâmnio (Medir Antes de Nomear)</span>
              <span className="text-[10px] font-mono text-amber-300">MBV &gt; 8 cm | ILA &gt; 24 cm</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Causas principais e roteiro etiológico:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Diabetes Mellitus Gestacional ou Pré-Gesta:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Hiperglicemia fetal promove diurese osmótica fetal maciça e aumento da poliúria.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Anomalias Fetais com Falha de Deglutição:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Atresia esofágica (estômago ausente/pequeno), atresia duodenal (sinal da dupla bolha), anencefalia e distrofia miotônica.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Infecções Congênitas ou Aloimunização:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Estados de alto débito cardíaco fetal e hidropisia (Parvovírus B19, Toxoplasmose, CMV, Sífilis, Doença Hemolítica Perinatal).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white">Idiopático (50-60% dos casos leves):</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Diagnóstico de exclusão após investigação completa materna e fetal detalhada.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Relevância da Mudança de Conduta */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Info size={16} />
            <span>O Achado Altera a Investigação e a Vigilância Obstétrica</span>
          </div>
          <p className="leading-relaxed">
            A presença de oligoidrâmnio isolado em gestação a termo (&ge; 37 semanas) é <strong>indicação formal de indução do parto</strong> devido ao risco de compressão funicular aguda, desacelerações variáveis graves e sofrimento intraparto. No pré-termo, impõe internação, investigação de RPMO e estudo hemodinâmico com <strong>Doppler fetal completo</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
