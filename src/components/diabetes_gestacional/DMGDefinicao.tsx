import React from 'react';
import { 
  BookOpen, Layers, Zap, AlertTriangle, Globe, 
  HelpCircle, CheckCircle2, ShieldAlert, Sparkles, Scale
} from 'lucide-react';

export default function DMGDefinicao() {
  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO TEMA 2 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <BookOpen size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Eixo 2 · Conceitos e Epidemiologia
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              2. Definição, Terminologia e Prevalência
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-xs font-black uppercase text-cyan-400 tracking-wider">Definição Conceitual</h4>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
            Diabetes é hiperglicemia decorrente de <strong>deficiência da ação insulínica</strong>, seja por produção pancreática insuficiente, liberação inadequada de insulina, resistência periférica ao hormônio, ou combinação desses mecanismos. Na gestação, a <strong>resistência insulínica fisiológica e progressiva imposta pela placenta</strong> pode revelar uma reserva pancreática limitada que, fora da gravidez, seria suficiente para manter a normoglicemia. A gestação atua, assim, como um <strong>verdadeiro teste de estresse metabólico</strong>.
          </p>
        </div>
      </div>

      {/* 2.1 TERMINOLOGIA GUARDA-CHUVA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
          <Layers size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            2.1 Terminologia Guarda-Chuva: "Hiperglicemia na Gestação"
          </h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          O termo &ldquo;Hiperglicemia na gestação&rdquo; engloba três situações clínicas distintas, com prognósticos fetais e condutas obstétricas específicas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Diabetes Prévio */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-3 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded border border-rose-800 inline-block">
                Pré-Gestacional
              </span>
              <h5 className="text-sm font-black text-white">Diabetes Prévio (DM1 ou DM2)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Diagnosticado <strong>antes da concepção</strong>. Carrega alto risco de <strong>malformações congênitas</strong> (cardiopatias, tubo neural, regressão caudal) pelo ambiente hiperglicêmico durante a organogênese embrionária.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-rose-300 font-medium">
              Conduta: Exige rastreio sistemático de complicações microvasculares de órgãos-alvo maternos no início do pré-natal.
            </div>
          </div>

          {/* DMG */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800 inline-block">
                Gestacional
              </span>
              <h5 className="text-sm font-black text-white">Diabetes Gestacional (DMG)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hiperglicemia de intensidade menor, tipicamente diagnosticada ou instalada na <strong>segunda metade da gestação (24–28 semanas)</strong> ou com GJ 92–125 no 1º trimestre.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-medium">
              Conduta: Não causa embriopatia periconcepcional; manejo visa conter macrossomia e hipoglicemia neonatal.
            </div>
          </div>

          {/* Diabetes Manifesto */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-900/60 space-y-3 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800 inline-block">
                Na Gravidez
              </span>
              <h5 className="text-sm font-black text-white">Diabetes Manifesto (Overt)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                A gestante preenche, durante a gestação, <strong>critérios diagnósticos formais de DM válidos fora dela</strong> (GJ &ge; 126 mg/dL, HbA1c &ge; 6,5% ou glicemia &ge; 200 mg/dL com sintomas).
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-indigo-300 font-medium">
              Conduta: Provável DM2 prévio não diagnosticado antes; rastrear órgãos-alvo e não suspender no pós-parto.
            </div>
          </div>
        </div>
      </div>

      {/* NEVER MISS — Diabetes Manifesto não é DMG */}
      <div className="p-6 md:p-8 rounded-3xl bg-amber-950/40 border-2 border-amber-500/80 space-y-3 shadow-xl">
        <div className="flex items-center gap-2.5 text-amber-400">
          <Zap size={22} className="fill-amber-400" />
          <h4 className="text-sm md:text-base font-black uppercase tracking-wider">
            ⚡ NEVER MISS — Diabetes Manifesto NÃO é Sinônimo de DMG
          </h4>
        </div>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
          Diabetes manifesto representa <strong>diabetes que provavelmente já existia antes da concepção e foi descoberto no pré-natal</strong>. Isso altera integralmente a conduta clínica:
        </p>
        <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
          <li><strong>Exige rastreio imediato de complicação de órgão-alvo</strong> (retinopatia, nefropatia/proteinúria, ecocardiograma fetal).</li>
          <li><strong>Carrega risco real de embriopatia diabética</strong> por possível hiperglicemia não detectada durante o período periconcepcional da organogênese.</li>
          <li><strong>Não se resolve nem se reclassifica no puerpério</strong> como o DMG costuma fazer, persistindo como DM crônico pré-existente.</li>
        </ul>
      </div>

      {/* 2.2 PREVALÊNCIA E CONTROVÉRSIA ONE-STEP VS TWO-STEP */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Globe size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              2.2 Prevalência Mundial e por que ela varia tanto
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800">
            Média mundial: 16,2% (faixa de 1% a 37,7%)
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A prevalência mundial de DMG é estimada em média de 16,2%, com faixa descrita entre 1% e 37,7% dependendo do critério diagnóstico e da população estudada. Essa variação enorme <strong>não é ruído metodológico aleatório</strong>, tem uma causa estrutural conhecida: a divergência de critérios entre sociedades internacionais.
        </p>

        {/* CONTROVÉRSIA — ONE-STEP VS TWO-STEP */}
        <div className="p-6 rounded-2xl bg-slate-950 border-2 border-amber-600/70 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              ⚠️ CONTROVÉRSIA — Critério Diagnóstico One-Step (OMS/IADPSG/Brasil) versus Two-Step (ACOG/EUA)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-800 space-y-2">
              <strong className="text-emerald-300 block text-sm">One-Step (IADPSG / OMS / Consenso Brasileiro)</strong>
              <ul className="text-slate-300 space-y-1.5 leading-relaxed list-disc pl-4">
                <li>Adota <strong>TOTG 75g direto</strong> entre 24 e 28 semanas.</li>
                <li><strong>Um único valor alterado</strong> (Jejum &ge; 92, 1h &ge; 180 ou 2h &ge; 153 mg/dL) já diagnostica DMG.</li>
                <li><strong>Mais sensível:</strong> detecta precocemente gestantes com risco aumentado para intervenção oportuna.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-indigo-800 space-y-2">
              <strong className="text-indigo-300 block text-sm">Two-Step (ACOG / Estados Unidos)</strong>
              <ul className="text-slate-300 space-y-1.5 leading-relaxed list-disc pl-4">
                <li><strong>Passo 1:</strong> Teste de triagem simplificado com sobrecarga de 50g (GCT) sem jejum.</li>
                <li><strong>Passo 2:</strong> Se positivo (&ge; 130-140 mg/dL), realiza TOTG com 100g (3 coletas), exigindo <strong>dois valores alterados</strong> (critério de Carpenter-Coustan).</li>
                <li><strong>Mais específico:</strong> reduz falso-positivos, mas gera debate ativo sobre perda de sensibilidade para casos limítrofes.</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Essa divergência de diretrizes é a explicação real por trás da grande variação de prevalência relatada na literatura médica internacional. No Brasil (FEBRASGO/SBD/Ministério da Saúde), adota-se rigorosamente a abordagem em <strong>um passo (One-Step)</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
