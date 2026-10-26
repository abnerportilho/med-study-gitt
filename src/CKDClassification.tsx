import React, { useState } from 'react';
import { 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  ClipboardCheck,
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowRight,
  Activity,
  Compass
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

interface RiskCell {
  level: 'baixo' | 'moderado' | 'alto' | 'muito-alto';
  label: string;
  visits: string;
  referral: string;
  cvRisk: string;
}

const RISK_MATRIX: Record<string, Record<string, RiskCell>> = {
  G1: {
    A1: { level: 'baixo', label: 'Baixo Risco', visits: '1x ao ano se comorbidade', referral: 'Atenção Primária', cvRisk: 'Basal / Leve' },
    A2: { level: 'moderado', label: 'Risco Moderado', visits: '1x ao ano', referral: 'Atenção Primária c/ nefroproteção', cvRisk: 'Aumentado' },
    A3: { level: 'alto', label: 'Alto Risco', visits: '2x ao ano', referral: 'Considerar Nefrologista se persistente', cvRisk: 'Alto' },
  },
  G2: {
    A1: { level: 'baixo', label: 'Baixo Risco', visits: '1x ao ano se fator de risco', referral: 'Atenção Primária', cvRisk: 'Basal / Leve' },
    A2: { level: 'moderado', label: 'Risco Moderado', visits: '1x ao ano', referral: 'Atenção Primária c/ otimização', cvRisk: 'Aumentado' },
    A3: { level: 'alto', label: 'Alto Risco', visits: '2x ao ano', referral: 'Avaliação c/ Nefrologista', cvRisk: 'Alto' },
  },
  G3a: {
    A1: { level: 'moderado', label: 'Risco Moderado', visits: '1x ao ano', referral: 'Atenção Primária + monitorização', cvRisk: 'Aumentado' },
    A2: { level: 'alto', label: 'Alto Risco', visits: '2x ao ano', referral: 'Nefrologista se declínio rápido', cvRisk: 'Alto' },
    A3: { level: 'muito-alto', label: 'Muito Alto Risco', visits: '≥ 3x ao ano', referral: 'Encaminhar ao Nefrologista', cvRisk: 'Muito Alto' },
  },
  G3b: {
    A1: { level: 'alto', label: 'Alto Risco', visits: '2x ao ano', referral: 'Acompanhamento conjunto Nefro/Clínica', cvRisk: 'Alto' },
    A2: { level: 'muito-alto', label: 'Muito Alto Risco', visits: '≥ 3x ao ano', referral: 'Encaminhar ao Nefrologista', cvRisk: 'Muito Alto' },
    A3: { level: 'muito-alto', label: 'Muito Alto Risco', visits: '≥ 3x ao ano', referral: 'Encaminhar ao Nefrologista', cvRisk: 'Muito Alto' },
  },
  G4: {
    A1: { level: 'muito-alto', label: 'Muito Alto Risco', visits: '≥ 3-4x ao ano', referral: 'Acompanhamento com Nefrologista', cvRisk: 'Muito Alto' },
    A2: { level: 'muito-alto', label: 'Muito Alto Risco', visits: '≥ 3-4x ao ano', referral: 'Acompanhamento com Nefrologista', cvRisk: 'Muito Alto' },
    A3: { level: 'muito-alto', label: 'Muito Alto Risco', visits: '≥ 4x ao ano (planejar FAV)', referral: 'Preparação para Diálise/Transplante', cvRisk: 'Extremo' },
  },
  G5: {
    A1: { level: 'muito-alto', label: 'Falência Renal', visits: 'Mensal ou a cada 2 meses', referral: 'Nefrologia (TRS imediata/conservador)', cvRisk: 'Extremo' },
    A2: { level: 'muito-alto', label: 'Falência Renal', visits: 'Mensal ou a cada 2 meses', referral: 'Nefrologia (TRS imediata/conservador)', cvRisk: 'Extremo' },
    A3: { level: 'muito-alto', label: 'Falência Renal', visits: 'Mensal ou a cada 2 meses', referral: 'Nefrologia (TRS imediata/conservador)', cvRisk: 'Extremo' },
  },
};

export default function CKDClassification() {
  const [selectedG, setSelectedG] = useState<string>('G3a');
  const [selectedA, setSelectedA] = useState<string>('A2');

  const activeRisk = RISK_MATRIX[selectedG]?.[selectedA] || RISK_MATRIX.G3a.A2;

  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'baixo':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'moderado':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'alto':
        return 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30';
      case 'muito-alto':
      default:
        return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40';
    }
  };

  const getTableBg = (level: string) => {
    switch (level) {
      case 'baixo':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold';
      case 'moderado':
        return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold';
      case 'alto':
        return 'bg-orange-500/20 text-orange-800 dark:text-orange-300 font-bold';
      case 'muito-alto':
      default:
        return 'bg-rose-500/25 text-rose-900 dark:text-rose-200 font-black';
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-5xl mx-auto">
      {/* Header com síntese conceitual */}
      <header className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-900/20 via-brand-blue/10 to-transparent border border-line">
        <div className="flex items-center gap-2 text-brand-blue mb-2">
          <span className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
            <Layers size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">SISTEMA PROGNÓSTICO • KDIGO 2024</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
          Classificação CGA da Doença Renal Crônica
        </h1>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          O sistema <strong>CGA (Causa, GFR/TFG e Albuminúria)</strong> é o alicerce diagnóstico e prognóstico mundial. O risco de progressão para falência renal, morte cardiovascular e mortalidade geral é <strong className="text-brand-navy">multiplicativo</strong> entre a filtração e o grau de albuminúria.
        </p>
      </header>

      {/* 1. OS 3 PILARES: C - G - A */}
      <section id="cga-pillars" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
            <ClipboardCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Os 3 Componentes da Classificação CGA</h2>
            <p className="text-xs text-ink-muted">Nunca registre apenas o estágio G; a causa e a albuminúria definem a conduta</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* C - Causa */}
          <div className="card p-6 border border-line bg-card rounded-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-3 -right-2 text-7xl font-black text-brand-blue opacity-5 pointer-events-none">C</div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-brand-blue/10 text-brand-blue font-black flex items-center justify-center text-sm">
                  C
                </span>
                <h3 className="font-bold text-brand-navy text-base">Causa (Etiologia)</h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Define o tratamento primário modificador de doença e a necessidade de biópsia ou imunossupressão.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-bg border border-line flex items-center justify-between">
                  <span className="font-bold text-brand-navy">Diabetes</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">iSGLT2 + Finerenona</span>
                </div>
                <div className="p-2.5 rounded-xl bg-bg border border-line flex items-center justify-between">
                  <span className="font-bold text-brand-navy">Hipertensão</span>
                  <span className="text-[10px] text-brand-blue font-semibold">Alvo PA &lt; 120/80 + IECA/BRA</span>
                </div>
                <div className="p-2.5 rounded-xl bg-bg border border-line flex items-center justify-between">
                  <span className="font-bold text-brand-navy">Glomerulopatia</span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">Imunossupressão</span>
                </div>
                <div className="p-2.5 rounded-xl bg-bg border border-line flex items-center justify-between">
                  <span className="font-bold text-brand-navy">DRPAD (Cística)</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Tolvaptan + Hidratação</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-line text-[11px] text-ink-muted italic">
              *A etiologia orienta a intervenção antes que a fibrose se torne irreversível.
            </div>
          </div>

          {/* G - GFR */}
          <div className="card p-6 border border-line bg-card rounded-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-3 -right-2 text-7xl font-black text-brand-blue opacity-5 pointer-events-none">G</div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-brand-blue/10 text-brand-blue font-black flex items-center justify-center text-sm">
                  G
                </span>
                <h3 className="font-bold text-brand-navy text-base">GFR / TFG (Filtração)</h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Calculada pela equação <strong>CKD-EPI 2021</strong> em mL/min/1,73m². Divide-se em 6 estratos prognósticos.
              </p>
              <div className="space-y-1.5 text-xs">
                {[
                  { g: 'G1', val: '≥ 90', label: 'Normal ou Elevada', note: 'Requer marcador de lesão' },
                  { g: 'G2', val: '60 - 89', label: 'Levemente Reduzida', note: 'Requer marcador de lesão' },
                  { g: 'G3a', val: '45 - 59', label: 'Leve a Moderada', note: 'Já fecha DRC sem proteinúria' },
                  { g: 'G3b', val: '30 - 44', label: 'Moderada a Grave', note: 'Complicações metabólicas' },
                  { g: 'G4', val: '15 - 29', label: 'Gravemente Reduzida', note: 'Planejar FAV e diálise' },
                  { g: 'G5', val: '< 15', label: 'Falência Renal', note: 'Indicação de TRS / uremia' },
                ].map(item => (
                  <div key={item.g} className="flex items-center justify-between p-1.5 rounded-lg bg-bg border border-line text-[11px]">
                    <span className="font-black text-brand-blue w-7">{item.g}</span>
                    <span className="font-mono text-ink font-bold">{item.val}</span>
                    <span className="text-ink-muted truncate max-w-[120px] text-right">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-line text-[11px] text-ink-muted">
              Subdivisão do G3 em <strong>G3a e G3b</strong> é crucial pelo risco cardiovascular disparar no G3b.
            </div>
          </div>

          {/* A - Albuminúria */}
          <div className="card p-6 border border-line bg-card rounded-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-3 -right-2 text-7xl font-black text-brand-blue opacity-5 pointer-events-none">A</div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-brand-blue/10 text-brand-blue font-black flex items-center justify-center text-sm">
                  A
                </span>
                <h3 className="font-bold text-brand-navy text-base">Albuminúria (RAC)</h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Razão Albumina/Creatinina em amostra isolada matinal de urina (RAC em mg/g).
              </p>
              <div className="space-y-3">
                {[
                  { a: 'A1', val: '< 30 mg/g', label: 'Normal a leve', badge: 'Baixo Risco', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' },
                  { a: 'A2', val: '30 - 300 mg/g', label: 'Moderadamente Aumentada', badge: 'Risco Moderado', color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10' },
                  { a: 'A3', val: '> 300 mg/g', label: 'Gravemente Aumentada', badge: 'Alto Risco', color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10' },
                ].map(item => (
                  <div key={item.a} className="p-3 rounded-xl bg-bg border border-line space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-brand-navy text-xs">{item.a}: {item.val}</span>
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', item.color)}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-line text-[11px] text-ink-muted">
              O antigo termo "microalbuminúria" foi abolido pelo KDIGO. Usar apenas <strong>A1, A2 e A3</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* 2. MATRIZ KDIGO INTERATIVA: MAPA DE RISCO COMBINADO */}
      <section id="interactive-matrix" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <Compass size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy">Matriz KDIGO de Risco Prognóstico Combinado</h2>
              <p className="text-xs text-ink-muted">Clique em qualquer célula para simular o plano de seguimento e conduta clínica</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue">
            Interativa (G × A)
          </span>
        </div>

        {/* Tabela Matricial */}
        <div className="card overflow-hidden border border-line rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-line">
                  <th className="p-3.5 text-left font-black text-brand-navy w-40 border-r border-line">
                    Estágios TFG \ RAC
                  </th>
                  <th className="p-3.5 border-r border-line">
                    <div className="font-black text-emerald-600 dark:text-emerald-400">A1</div>
                    <div className="text-[10px] text-ink-muted font-normal">&lt; 30 mg/g (Normal)</div>
                  </th>
                  <th className="p-3.5 border-r border-line">
                    <div className="font-black text-amber-600 dark:text-amber-400">A2</div>
                    <div className="text-[10px] text-ink-muted font-normal">30-300 mg/g (Moderada)</div>
                  </th>
                  <th className="p-3.5">
                    <div className="font-black text-rose-600 dark:text-rose-400">A3</div>
                    <div className="text-[10px] text-ink-muted font-normal">&gt; 300 mg/g (Grave)</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { g: 'G1', label: 'G1 (≥ 90)', desc: 'Normal ou alta' },
                  { g: 'G2', label: 'G2 (60-89)', desc: 'Leve redução' },
                  { g: 'G3a', label: 'G3a (45-59)', desc: 'Leve a moderada' },
                  { g: 'G3b', label: 'G3b (30-44)', desc: 'Moderada a grave' },
                  { g: 'G4', label: 'G4 (15-29)', desc: 'Grave redução' },
                  { g: 'G5', label: 'G5 (< 15)', desc: 'Falência renal' },
                ].map(row => (
                  <tr key={row.g} className="border-b border-line/60 hover:bg-slate-500/5 transition-colors">
                    <td className="p-3 text-left font-bold bg-slate-50 dark:bg-slate-800/40 text-brand-navy border-r border-line">
                      <div className="font-mono text-xs font-black">{row.label}</div>
                      <div className="text-[10px] text-ink-muted font-normal">{row.desc}</div>
                    </td>

                    {['A1', 'A2', 'A3'].map(colA => {
                      const cell = RISK_MATRIX[row.g][colA];
                      const isSelected = selectedG === row.g && selectedA === colA;

                      return (
                        <td 
                          key={colA}
                          onClick={() => { setSelectedG(row.g); setSelectedA(colA); }}
                          className={cn(
                            "p-3 border-r border-line last:border-r-0 cursor-pointer transition-all select-none relative",
                            getTableBg(cell.level),
                            isSelected ? "ring-2 ring-brand-blue ring-inset shadow-inner scale-[0.98]" : "hover:opacity-85"
                          )}
                        >
                          <div className="text-[11px] uppercase tracking-wider">{cell.label}</div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-blue" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painel do Estágio Selecionado */}
        <div className="card p-6 md:p-7 border border-brand-blue/30 bg-card rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-line">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-lg">
                {selectedG}{selectedA}
              </div>
              <div>
                <h3 className="text-lg font-black text-brand-navy">
                  Diagnóstico Estruturado: DRC Estágio {selectedG}{selectedA}
                </h3>
                <p className="text-xs text-ink-muted">
                  Simulação clínica com base nas recomendações KDIGO 2024
                </p>
              </div>
            </div>
            <span className={cn('text-xs font-black px-3.5 py-1.5 rounded-full border', getBadgeStyle(activeRisk.level))}>
              {activeRisk.label.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
            <div className="p-4 rounded-xl bg-bg border border-line">
              <span className="text-[10px] font-bold text-ink-muted uppercase block mb-1">Periodicidade de Consulta</span>
              <p className="text-xs font-bold text-brand-navy">{activeRisk.visits}</p>
            </div>
            <div className="p-4 rounded-xl bg-bg border border-line">
              <span className="text-[10px] font-bold text-ink-muted uppercase block mb-1">Nível de Cuidado / Encaminhamento</span>
              <p className="text-xs font-bold text-brand-blue">{activeRisk.referral}</p>
            </div>
            <div className="p-4 rounded-xl bg-bg border border-line">
              <span className="text-[10px] font-bold text-ink-muted uppercase block mb-1">Risco Cardiovascular Global</span>
              <p className="text-xs font-bold text-rose-500">{activeRisk.cvRisk}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXEMPLO DE REGISTRO EM PRONTUÁRIO */}
      <section className="p-6 rounded-2xl bg-brand-navy text-white space-y-3">
        <div className="flex items-center gap-2 text-brand-blue">
          <Info size={18} />
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">Como Registrar no Prontuário Médico</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          A descrição correta do diagnóstico de DRC deve conter <strong>todos os componentes do CGA</strong>:
        </p>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-emerald-400">
          "Doença Renal Crônica estágio G3aA2 secundária a Nefropatia Diabética e Hipertensiva (eTFG CKD-EPI: 48 mL/min/1,73m²; RAC: 140 mg/g; confirmada há 4 meses)."
        </div>
        <p className="text-[11px] text-slate-400">
          Isso estabelece instantaneamente a gravidade, a velocidade provável de progressão e a elegibilidade para <strong>iSGLT2 + IECA/BRA + Finerenona</strong>.
        </p>
      </section>

      {/* 4. RESUMO PARA A PRÁTICA (DECORE) */}
      <section id="decore">
        <div className="card p-7 md:p-8 border border-brand-blue/30 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 text-white rounded-3xl relative overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 mb-4">
            <CheckCircle2 size={22} />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Regras de Ouro da Classificação (Pérolas de Prova e Prática)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Critério Temporal: Qualquer alteração deve persistir por ≥ 3 meses para fechar DRC.",
              "eTFG < 60 isolada fecha DRC mesmo com RAC normal (A1).",
              "eTFG ≥ 60 (G1 e G2) só é DRC se houver lesão renal (RAC ≥ 30, USG alterada ou biópsia).",
              "O termo 'microalbuminúria' está formalmente banido das diretrizes KDIGO atuais.",
              "Albuminúria A2 (30-300 mg/g) ou A3 (> 300 mg/g) é indicação formal de IECA/BRA e iSGLT2.",
              "Encaminhe ao Nefrologista se eTFG < 30 (G4), A3 persistente ou queda > 5 mL/min/ano.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {i + 1}
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
