import React, { useState } from 'react';
import { 
  Activity, CheckCircle2, AlertCircle, HelpCircle, 
  ArrowRight, Sparkles, Scale, Info, FileText, ChevronRight, RotateCcw,
  Zap, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DMGDiagnosticSimulator() {
  const [stage, setStage] = useState<'1tri' | '2tri'>('1tri');
  const [fasting1st, setFasting1st] = useState<string>('');
  
  // 2º trimestre TOTG 75g
  const [totg0, setTotg0] = useState<string>('');
  const [totg60, setTotg60] = useState<string>('');
  const [totg120, setTotg120] = useState<string>('');

  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Helper para analisar 1º trimestre
  const analyze1st = () => {
    const val = parseFloat(fasting1st);
    if (isNaN(val)) return null;
    if (val < 92) {
      return {
        status: 'normal',
        title: 'Glicemia de Jejum Normal (< 92 mg/dL)',
        badge: 'Normal (< 92 mg/dL)',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
        borderColor: 'border-emerald-600',
        bg: 'bg-emerald-950/30',
        summary: 'A glicemia de jejum está dentro dos limites fisiológicos normais para o início da gestação.',
        action: 'Solicitar o Teste Oral de Tolerância à Glicose com 75g (TOTG 75g) entre 24 e 28 semanas de idade gestacional.',
        alert: 'Atenção: Um valor normal no 1º trimestre NÃO descarta DMG tardio, pois os hormônios contrainsulínicos têm pico entre 24 e 28 semanas.'
      };
    } else if (val >= 92 && val <= 125) {
      return {
        status: 'dmg',
        title: 'Diagnóstico Definitivo de DMG (92 a 125 mg/dL)',
        badge: 'DMG Confirmado',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-700',
        borderColor: 'border-amber-600',
        bg: 'bg-amber-950/30',
        summary: 'Pelo consenso IADPSG / OMS / SBD / FEBRASGO / Ministério da Saúde, qualquer glicemia de jejum entre 92 e 125 mg/dL no 1º trimestre firma o diagnóstico de DMG.',
        action: 'NÃO solicitar TOTG 75g (contraindicado e desnecessário). Iniciar imediatamente Terapia Nutricional fracionada sem cetose + Atividade física + Automonitorização Glicêmica Capilar (AMG). Se > 20-30% fora do alvo em 1-2 semanas, iniciar Insulina.',
        alert: 'Pegadinha Clássica: Não se deve solicitar TOTG 75g para quem já teve GJ ≥ 92 mg/dL no 1º trimestre! O diagnóstico já está estabelecido.'
      };
    } else {
      return {
        status: 'overt',
        title: 'Diabetes Mellitus Manifesto / Overt Diabetes (≥ 126 mg/dL)',
        badge: 'Diabetes Manifesto (≥ 126 mg/dL)',
        badgeColor: 'bg-rose-950 text-rose-300 border-rose-700',
        borderColor: 'border-rose-600',
        bg: 'bg-rose-950/30',
        summary: 'Glicemia de jejum ≥ 126 mg/dL no 1º trimestre indica Diabetes Mellitus pré-existente à gestação que não havia sido diagnosticado previamente.',
        action: 'Iniciar imediatamente acompanhamento em pré-natal de alto risco, solicitar avaliação de órgãos-alvo (fundo de olho, função renal com proteinúria, ecocardiograma fetal com 24-28 sem) e iniciar insulinoterapia imediata.',
        alert: 'Risco aumentado de embriopatia diabética (malformações congênitas cardíacas e do tubo neural) pelo período da organogênese.'
      };
    }
  };

  // Helper para analisar TOTG 75g (24 a 28 semanas)
  const analyze2nd = () => {
    const v0 = parseFloat(totg0);
    const v60 = parseFloat(totg60);
    const v120 = parseFloat(totg120);

    if (isNaN(v0) && isNaN(v60) && isNaN(v120)) return null;

    const isOvert = (v0 >= 126);
    const isDMG_v0 = (v0 >= 92 && v0 <= 125);
    const isDMG_v60 = (v60 >= 180);
    const isDMG_v120 = (v120 >= 153);

    if (isOvert) {
      return {
        status: 'overt',
        title: 'Diabetes Manifesto no TOTG (Jejum ≥ 126 mg/dL)',
        badge: 'Overt Diabetes',
        badgeColor: 'bg-rose-950 text-rose-300 border-rose-700',
        borderColor: 'border-rose-600',
        bg: 'bg-rose-950/30',
        summary: 'Glicemia de jejum no TOTG atingiu critério diagnóstico formal de diabetes fora da gravidez.',
        action: 'Pré-natal de alto risco, rastreio imediato de lesões de órgãos-alvo maternas e prescrição de insulinoterapia.',
        alert: 'Vigilância redobrada para pré-eclâmpsia sobreposta e restrição de crescimento com insuficiência placentária.'
      };
    }

    const alteredCount = [isDMG_v0, isDMG_v60, isDMG_v120].filter(Boolean).length;

    if (alteredCount >= 1) {
      return {
        status: 'dmg',
        title: `Diagnóstico Confirmado de DMG (${alteredCount} ponto(s) alterado(s))`,
        badge: 'DMG (Critério One-Step IADPSG/SBD)',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-700',
        borderColor: 'border-amber-600',
        bg: 'bg-amber-950/30',
        summary: `Basta APENAS 1 valor igual ou superior aos limites de referência do HAPO para selar o diagnóstico de DMG: Jejum ≥ 92 (${v0 || '-'}), 1h ≥ 180 (${v60 || '-'}), 2h ≥ 153 (${v120 || '-'}).`,
        action: 'Orientação Nutricional + Exercício Físico + Automonitorização glicêmica com perfil de 4 pontos (jejum e 1h ou 2h pós-refeições). Se > 20-30% descompensada após 1-2 semanas, iniciar Insulina.',
        alert: 'Consenso One-Step: Não são necessárias duas dosagens alteradas. Um único ponto já estabelece o diagnóstico e indica conduta terapêutica.'
      };
    }

    if (!isNaN(v0) && !isNaN(v60) && !isNaN(v120) && v0 < 92 && v60 < 180 && v120 < 153) {
      return {
        status: 'normal',
        title: 'TOTG 75g Normal (Todos os 3 tempos dentro dos limites)',
        badge: 'Normoglicemia Gestacional',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
        borderColor: 'border-emerald-600',
        bg: 'bg-emerald-950/30',
        summary: 'Todos os três tempos (Jejum < 92, 1h < 180, 2h < 153 mg/dL) estão perfeitamente normais.',
        action: 'Manter acompanhamento pré-natal habitual de baixo risco, com orientações gerais de hábitos saudáveis e acompanhamento do ganho ponderal materno.',
        alert: 'Reavaliar clinicamente caso surjam sinais indiretos de hiperglicemia mais tardiamente (ex.: polidrâmnio agudo ou CA fetal > p90).'
      };
    }

    return null;
  };

  const res1st = analyze1st();
  const res2nd = analyze2nd();

  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO TEMA 4 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Eixo 4 · Diagnóstico e Rastreamento Universal
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              4. Quadro Clínico, Diagnóstico & Simulador Interativo
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O DMG é <strong>predominantemente assintomático</strong>, sendo detectado exclusivamente por rastreio laboratorial sistemático universal no pré-natal. A conduta é guiada pelos três caminhos da 1ª Glicemia de Jejum e pelos pontos de corte do <strong>TOTG 75g (Estudo HAPO 2008)</strong>.
        </p>
      </div>

      {/* 4.1 OS TRÊS CAMINHOS DA 1ª GLICEMIA DE JEJUM */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h4 className="text-sm font-black uppercase text-emerald-400 tracking-wider">
          4.1 Rastreio: Os Três Caminhos da Glicemia de Jejum na 1ª Consulta Pré-Natal
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3.5">Glicemia de Jejum na 1ª Consulta</th>
                <th className="p-3.5">Interpretação Diagnóstica</th>
                <th className="p-3.5">Conduta Obstétrica Imediata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr>
                <td className="p-3.5 font-mono font-bold text-emerald-400">&lt; 92 mg/dL</td>
                <td className="p-3.5">Sem diagnóstico no momento</td>
                <td className="p-3.5">Agendar e reavaliar com <strong>TOTG 75g entre 24 e 28 semanas</strong>.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-amber-400">92 a 125 mg/dL</td>
                <td className="p-3.5 font-bold text-amber-300">Diagnóstico de DMG</td>
                <td className="p-3.5"><strong>NÃO solicitar TOTG</strong>. Iniciar MEV (dieta + exercício) e automonitorização.</td>
              </tr>
              <tr>
                <td className="p-3.5 font-mono font-bold text-rose-400">&ge; 126 mg/dL</td>
                <td className="p-3.5 font-bold text-rose-300">Suspeita de Diabetes Manifesto</td>
                <td className="p-3.5">Confirmar em nova amostra (salvo sintomas francos). Iniciar rastreio de órgãos-alvo.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4.2 TOTG 75g (24 A 28 SEMANAS) & ESTUDO HAPO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider">
            4.2 TOTG com 75g de Glicose Anidra (24 a 28 Semanas) — 3 Tempos, 3 Cortes
          </h4>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800">
            1 Valor Alterado = Diagnóstico
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3.5">Momento da Coleta</th>
                <th className="p-3.5">Valor Normal</th>
                <th className="p-3.5">Ponto de Corte para DMG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr>
                <td className="p-3.5 font-bold">Jejum</td>
                <td className="p-3.5 text-emerald-400">&lt; 92 mg/dL</td>
                <td className="p-3.5 text-amber-400 font-bold">&ge; 92 mg/dL</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">1 hora pós-sobrecarga (75g)</td>
                <td className="p-3.5 text-emerald-400">&lt; 180 mg/dL</td>
                <td className="p-3.5 text-amber-400 font-bold">&ge; 180 mg/dL</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">2 horas pós-sobrecarga (75g)</td>
                <td className="p-3.5 text-emerald-400">&lt; 153 mg/dL</td>
                <td className="p-3.5 text-amber-400 font-bold">&ge; 153 mg/dL</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* NOTA SOBRE O ESTUDO HAPO */}
        <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-800/80 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-indigo-400 font-bold">
            <Sparkles size={16} />
            <span>Origem dos Pontos de Corte: O Estudo HAPO (2008)</span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            O <strong>HAPO (Hyperglycemia and Adverse Pregnancy Outcomes, 2008)</strong> avaliou mais de <strong>23 mil gestantes</strong> e demonstrou que a relação entre glicemia materna e desfechos adversos perinatais (macrossomia, peso &gt; p90, hipoglicemia neonatal e peptídeo-C de cordão aumentado) é <strong>linear e contínua</strong>. Os cortes de <strong>92, 180 e 153 mg/dL</strong> foram calibrados no limiar em que o <strong>Odds Ratio (OR) para esses desfechos atinge 1,75</strong> em relação à média geral. Por isso, <strong>apenas um valor alterado</strong> é suficiente para firmar o diagnóstico.
          </p>
        </div>
      </div>

      {/* 4.3 DIABETES MANIFESTO & 4.4 CONTROVÉRSIAS E BARIÁTRICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Diabetes Manifesto */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <h4 className="text-sm font-black uppercase text-rose-400 tracking-wider">
            4.3 Critérios de Diabetes Manifesto
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Diagnóstico de DM pré-gestacional não diagnosticado previamente, preenchendo critérios fora da gravidez:
          </p>
          <ul className="text-xs text-slate-200 space-y-2">
            <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>Glicemia de Jejum</span>
              <strong className="text-rose-400 font-mono font-bold">&ge; 126 mg/dL</strong>
            </li>
            <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>HbA1c Padronizada</span>
              <strong className="text-rose-400 font-mono font-bold">&ge; 6,5%</strong>
            </li>
            <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>Glicemia Casual com Sintomas</span>
              <strong className="text-rose-400 font-mono font-bold">&ge; 200 mg/dL</strong>
            </li>
          </ul>
        </div>

        {/* CONTROVÉRSIA HBA1C & CONTEXTO BARIÁTRICA */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-600/70 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={18} />
              <span className="text-xs font-black uppercase tracking-wider">
                ⚠️ CONTROVÉRSIA — Limitação da HbA1c na Gestação
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              A expansão fisiológica do volume plasmático materno e o turnover eritrocitário mais acelerado no 2º e 3º trimestres <strong>subestimam os valores reais da HbA1c</strong>. Por isso, ela é útil no 1º trimestre para rastrear diabetes manifesto, mas <strong>NÃO substitui o TOTG para diagnosticar DMG</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-600/80 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={18} />
              <span className="text-xs font-black uppercase tracking-wider">
                🇧🇷 CONTEXTO BRASIL — TOTG pós-Cirurgia Bariátrica
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              A sobrecarga de 75g de glicose pode deflagrar <strong>Síndrome de Dumping</strong> severa. Em gestantes pós-bariátrica com derivação gástrica, recomenda-se <strong>perfil glicêmico capilar seriado ambulatorial</strong> como alternativa ao TOTG.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIMULADOR DIAGNÓSTICO INTERATIVO */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Ferramenta Prática
            </span>
            <h4 className="text-lg md:text-xl font-black text-white mt-1">
              Simulador Diagnóstico Interativo de DMG
            </h4>
          </div>

          {/* Seletor de Estágio */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => { setStage('1tri'); setActivePreset(null); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                stage === '1tri' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              1º Trimestre (GJ)
            </button>
            <button
              onClick={() => { setStage('2tri'); setActivePreset(null); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                stage === '2tri' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              24-28 Semanas (TOTG 75g)
            </button>
          </div>
        </div>

        {/* INPUTS E RESULTADOS DINÂMICOS */}
        {stage === '1tri' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-300 uppercase">
                Glicemia de Jejum da 1ª Consulta (mg/dL)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Ex: 94"
                  value={fasting1st}
                  onChange={(e) => setFasting1st(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-mono">mg/dL</span>
              </div>

              {/* Botões Rápidos de Teste */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFasting1st('86')}
                  className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 hover:bg-slate-800"
                >
                  86 (Normal)
                </button>
                <button
                  onClick={() => setFasting1st('98')}
                  className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 hover:bg-slate-800"
                >
                  98 (DMG)
                </button>
                <button
                  onClick={() => setFasting1st('132')}
                  className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-rose-400 hover:bg-slate-800"
                >
                  132 (Overt)
                </button>
              </div>
            </div>

            {/* Cartão de Resposta */}
            <div>
              {res1st ? (
                <div className={`p-5 rounded-2xl border-2 ${res1st.borderColor} ${res1st.bg} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${res1st.badgeColor}`}>
                      {res1st.badge}
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-white">{res1st.title}</h5>
                  <p className="text-xs text-slate-200 leading-relaxed">{res1st.summary}</p>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong>Conduta:</strong> {res1st.action}
                  </div>
                  <p className="text-[11px] text-amber-300/90 font-medium">{res1st.alert}</p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6 border border-dashed border-slate-800 rounded-2xl text-xs text-slate-500 text-center">
                  Insira o valor da glicemia de jejum para obter a conduta diagnóstica automatizada.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Jejum</label>
                  <input
                    type="number"
                    placeholder="< 92"
                    value={totg0}
                    onChange={(e) => setTotg0(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">1 hora</label>
                  <input
                    type="number"
                    placeholder="< 180"
                    value={totg60}
                    onChange={(e) => setTotg60(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">2 horas</label>
                  <input
                    type="number"
                    placeholder="< 153"
                    value={totg120}
                    onChange={(e) => setTotg120(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Presets de Teste Rápido */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setTotg0('88'); setTotg60('155'); setTotg120('128'); }}
                  className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 hover:bg-slate-800"
                >
                  Perfil Normal
                </button>
                <button
                  onClick={() => { setTotg0('90'); setTotg60('188'); setTotg120('142'); }}
                  className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 hover:bg-slate-800"
                >
                  1h Alterado (DMG)
                </button>
                <button
                  onClick={() => { setTotg0('95'); setTotg60('185'); setTotg120('160'); }}
                  className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-rose-400 hover:bg-slate-800"
                >
                  3 Alterados (DMG)
                </button>
              </div>
            </div>

            {/* Cartão de Resposta TOTG */}
            <div>
              {res2nd ? (
                <div className={`p-5 rounded-2xl border-2 ${res2nd.borderColor} ${res2nd.bg} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${res2nd.badgeColor}`}>
                      {res2nd.badge}
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-white">{res2nd.title}</h5>
                  <p className="text-xs text-slate-200 leading-relaxed">{res2nd.summary}</p>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong>Conduta:</strong> {res2nd.action}
                  </div>
                  <p className="text-[11px] text-amber-300/90 font-medium">{res2nd.alert}</p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6 border border-dashed border-slate-800 rounded-2xl text-xs text-slate-500 text-center">
                  Preencha os valores do TOTG 75g (ou clique em um preset) para visualizar a classificação imediata.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
