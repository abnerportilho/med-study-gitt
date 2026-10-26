import React, { useState } from 'react';
import { 
  Baby, HeartPulse, ShieldCheck, CheckCircle2, 
  RotateCcw, AlertTriangle, Activity, Pill, Sparkles, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DMGPuerperioReclassificacao() {
  const [postFasting, setPostFasting] = useState<string>('');
  const [post2h, setPost2h] = useState<string>('');

  const analyzePostpartum = () => {
    const f = parseFloat(postFasting);
    const h2 = parseFloat(post2h);

    if (isNaN(f) && isNaN(h2)) return null;

    const isDM2 = (f >= 126 || h2 >= 200);
    const isPreDM = ((f >= 100 && f <= 125) || (h2 >= 140 && h2 <= 199));

    if (isDM2) {
      return {
        status: 'dm2',
        title: 'Diabetes Mellitus Tipo 2 Confirmado',
        badge: 'DM2 (Jejum ≥ 126 ou 2h ≥ 200)',
        badgeColor: 'bg-rose-950 text-rose-300 border-rose-700',
        borderColor: 'border-rose-600',
        bg: 'bg-rose-950/30',
        desc: 'A paciente mantém hiperglicemia persistente no puerpério, confirmando o diagnóstico de Diabetes Mellitus Tipo 2 (que provavelmente precedia ou se consolidou na gestação).',
        action: 'Iniciar acompanhamento endocrinológico regular, solicitar HbA1c, perfil lipídico e função renal. Iniciar antidiabéticos orais (ex: Metformina) seguros na amamentação.'
      };
    } else if (isPreDM) {
      return {
        status: 'prediabetes',
        title: 'Pré-Diabetes (Glicemia de Jejum Alterada / Tolerância Diminuída)',
        badge: 'Pré-Diabetes (Jejum 100-125 ou 2h 140-199)',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-700',
        borderColor: 'border-amber-600',
        bg: 'bg-amber-950/30',
        desc: 'A paciente apresenta alto risco cardiovascular e metabólico para progressão rápida para DM2 nos próximos 3 a 5 anos.',
        action: 'Intensificar Mudanças do Estilo de Vida (MEV com perda ponderal de 5-7% e atividade física regular). Considerar Metformina profilática se IMC elevado ou histórico de alto risco. Repetir glicemia/HbA1c anualmente.'
      };
    } else if (!isNaN(f) && !isNaN(h2)) {
      return {
        status: 'normal',
        title: 'Tolerância à Glicose Normalizada',
        badge: 'Normal (Jejum < 100 e 2h < 140)',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
        borderColor: 'border-emerald-600',
        bg: 'bg-emerald-950/30',
        desc: 'A resistência insulínica gestacional regrediu completamente e a tolerância glicêmica encontra-se normalizada.',
        action: 'Reforçar hábitos alimentares saudáveis, manutenção de peso adequado e estímulo ao aleitamento materno continuado. Repetir rastreamento para DM2 a cada 1 a 3 anos.'
      };
    }

    return null;
  };

  const res = analyzePostpartum();

  return (
    <div className="space-y-8">
      {/* 1. MANEJO DO PUERPÉRIO IMEDIATO & CONDUTA COM A INSULINA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Pós-Parto Imediato
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Dequitação Placentária e Queda da Resistência Insulínica
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Gestante com DMG</span>
              <span className="text-[10px] font-bold bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                Suspensão Imediata
              </span>
            </div>
            <p className="text-sm font-bold text-white">Suspender toda a Insulina!</p>
            <p className="text-slate-300 leading-relaxed">
              Com a saída da placenta, os níveis plasmáticos de hPL, cortisol e prolactina despencam bruscamente. A resistência insulínica é revertida nas primeiras horas. 
            </p>
            <p className="text-slate-300 leading-relaxed font-semibold text-emerald-400">
              • Dieta livre e monitorização de glicemia capilar apenas nas primeiras 24-48h.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">Diabetes Pré-Gestacional (DM1 ou DM2)</span>
              <span className="text-[10px] font-bold bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                Redução de Dose
              </span>
            </div>
            <p className="text-sm font-bold text-white">Reduzir Insulina para 50% da Dose Pré-Gestacional</p>
            <p className="text-slate-300 leading-relaxed">
              A sensibilidade insulínica volta a níveis iguais ou superiores ao período anterior à gravidez, especialmente com a lactação.
            </p>
            <p className="text-slate-300 leading-relaxed font-semibold text-cyan-400">
              • Titulação cautelosa para prevenir hipoglicemias maternas graves durante a amamentação.
            </p>
          </div>

        </div>
      </div>

      {/* 2. CUIDADOS NEONATAIS IMEDIATOS (PREVENÇÃO DE HIPOGLICEMIA) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Baby size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Neonatologia
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Rastreamento & Prevenção da Hipoglicemia Neonatal
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-emerald-400 text-sm">Amamentação na Golden Hour</h5>
            <p className="text-slate-300 leading-relaxed">
              Início imediato do aleitamento materno ou colostro na <strong>primeira hora de vida</strong> para todo recém-nascido de mãe com diabetes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-amber-400 text-sm">Glicemias Seriadas</h5>
            <p className="text-slate-300 leading-relaxed">
              Medir glicemia capilar com <strong>30 a 60 minutos de vida</strong> e antes de cada mamada nas primeiras 12 a 24 horas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-rose-400 text-sm">Alvo e Conduta na Hipoglicemia</h5>
            <p className="text-slate-300 leading-relaxed">
              <strong>Glicemia &lt; 40-45 mg/dL:</strong> Se assintomático, oferecer mamada/fórmula. Se sintomático ou refratário, infusão venosa de glicose a 10% (bolus 2 mL/kg + infusão de manutenção com TIG 6-8 mg/kg/min).
            </p>
          </div>
        </div>
      </div>

      {/* 3. RECLASSIFICAÇÃO METABÓLICA (TOTG 75G COM 6 A 12 SEMANAS PÓS-PARTO) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-600/80 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-300 border border-cyan-700">
              <RotateCcw size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-700">
                Obrigatório para Todas as Puérperas com DMG
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                Reclassificação Metabólica Pós-Parto
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Realizar entre 6 e 12 semanas pós-parto
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Toda mulher com diagnóstico de DMG deve realizar um novo <strong>TOTG com 75g de glicose (coletas em jejum e 2 horas)</strong> entre 6 e 12 semanas após o parto (ou após o término da amamentação exclusiva) para identificar Diabetes Mellitus tipo 2 manifesto ou Pré-Diabetes.
        </p>

        {/* Simulador Interativo de Reclassificação */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" /> Simulador de Reclassificação com TOTG 75g Pós-Parto:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Glicemia de Jejum Pós-Parto (mg/dL):
              </label>
              <input
                type="number"
                value={postFasting}
                onChange={(e) => setPostFasting(e.target.value)}
                placeholder="Ex: 92"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Normal: &lt; 100 | Pré-DM: 100-125 | DM2: ≥ 126</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Glicemia 2 Horas no TOTG 75g (mg/dL):
              </label>
              <input
                type="number"
                value={post2h}
                onChange={(e) => setPost2h(e.target.value)}
                placeholder="Ex: 128"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Normal: &lt; 140 | Pré-DM: 140-199 | DM2: ≥ 200</span>
            </div>
          </div>

          {/* Resultado do Simulador */}
          <AnimatePresence mode="wait">
            {res && (
              <motion.div
                key={`${postFasting}-${post2h}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-2xl border-2 space-y-3 ${res.bg} ${res.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${res.badgeColor}`}>
                    {res.badge}
                  </span>
                  <span className="text-xs font-bold text-white">{res.title}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{res.desc}</p>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200">
                  <strong className="text-indigo-300">Conduta Clínica:</strong> {res.action}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabela de Critérios de Reclassificação Fora da Gestação */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h5 className="text-xs font-bold text-slate-300 uppercase">Critérios ADA / SBD Fora da Gravidez</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3">Classificação</th>
                  <th className="py-2 px-3">Glicemia de Jejum</th>
                  <th className="py-2 px-3">TOTG 75g (2 horas)</th>
                  <th className="py-2 px-3">Seguimento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">Normoglicemia</td>
                  <td className="py-2.5 px-3 font-mono">&lt; 100 mg/dL</td>
                  <td className="py-2.5 px-3 font-mono">&lt; 140 mg/dL</td>
                  <td className="py-2.5 px-3 text-slate-300">Reavaliação a cada 1 a 3 anos</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-amber-400">Pré-Diabetes</td>
                  <td className="py-2.5 px-3 font-mono">100 a 125 mg/dL</td>
                  <td className="py-2.5 px-3 font-mono">140 a 199 mg/dL</td>
                  <td className="py-2.5 px-3 text-slate-300">MEV intensiva + controle anual</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-rose-400">Diabetes Mellitus Tipo 2</td>
                  <td className="py-2.5 px-3 font-mono">≥ 126 mg/dL</td>
                  <td className="py-2.5 px-3 font-mono">≥ 200 mg/dL</td>
                  <td className="py-2.5 px-3 text-slate-300">Tratamento medicamentoso para DM2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. ANTICONCEPÇÃO NO PÓS-PARTO */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Pill size={18} className="text-emerald-400" /> Anticoncepção Segura na Puérpera com Histórico de DMG
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-emerald-400 text-sm">DIU de Cobre ou de Levonorgestrel</h5>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Métodos de Primeira Escolha (LARC):</strong> Não interferem no metabolismo da glicose ou lipídios e podem ser inseridos no pós-parto imediato ou após 4 a 6 semanas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-cyan-400 text-sm">Implante de Etonogestrel ou Minipílula</h5>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Métodos de Progestagênio Isolado:</strong> Totalmente compatíveis com a lactação. Sem impacto desfavorável no risco de tromboembolismo ou metabolismo glicêmico.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-amber-400 text-sm">Anticoncepcionais Combinados (ACO)</h5>
            <p className="text-slate-300 leading-relaxed">
              • Podem ser considerados após 6 semanas pós-parto se a puérpera não estiver amamentando exclusivamente e não apresentar comorbidades vasculares ou hipertensivas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
