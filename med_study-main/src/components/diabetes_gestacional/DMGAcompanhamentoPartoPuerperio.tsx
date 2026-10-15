import React, { useState } from 'react';
import { 
  Baby, HeartPulse, RotateCcw, AlertTriangle, CheckCircle2, 
  Sparkles, Zap, ShieldAlert, Clock, Scale, HelpCircle, Activity, Stethoscope
} from 'lucide-react';

export default function DMGAcompanhamentoPartoPuerperio() {
  // Teste interativo Somogyi vs Alvorecer
  const [nightFasting, setNightFasting] = useState<string>('');
  const [threeAmValue, setThreeAmValue] = useState<string>('');

  const analyzeThreeAm = () => {
    const val3am = parseFloat(threeAmValue);
    if (isNaN(val3am)) return null;

    if (val3am < 70) {
      return {
        type: 'somogyi',
        title: 'Efeito Somogyi Confirmado (Hiperglicemia Reacional Pós-Hipoglicemia)',
        color: 'text-rose-400',
        bg: 'bg-rose-950/40 border-rose-600',
        explanation: 'A glicemia baixa na madrugada (< 70 mg/dL) disparou a liberação compensatória maciça de hormônios contrarreguladores (glucagon, adrenalina, cortisol e GH), resultando na hiperglicemia matinal de rebote.',
        conduct: 'CONDUTA: REDUZIR a dose de insulina NPH noturna (ou transferir para as 22h se tomada no jantar) e reforçar a CEIA noturna protetora com proteína e carboidrato complexo.'
      };
    } else {
      return {
        type: 'dawn',
        title: 'Fenômeno do Alvorecer (Dawn Phenomenon)',
        color: 'text-amber-400',
        bg: 'bg-amber-950/40 border-amber-600',
        explanation: 'A glicemia às 03h está normal ou alta (≥ 70–90 mg/dL), comprovando que a elevação matinal decorre do pico circadiano fisiológico de cortisol e GH no início da manhã, associado ao clareamento precoce da insulina basal.',
        conduct: 'CONDUTA: AUMENTAR a dose da insulina NPH noturna ao deitar (22h) para cobrir o escape glicêmico do amanhecer.'
      };
    }
  };

  const somogyiResult = analyzeThreeAm();

  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO TEMA 7 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-950 text-blue-400 border border-blue-800">
            <Baby size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded-full border border-blue-800">
              Eixo 7 · Pré-Natal Avançado, Parto e Pós-Parto
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              7. Acompanhamento Pré-Natal, Momento do Parto e Puerpério
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A vigilância feto-materna no DMG envolve <strong>metas estritas de automonitorização</strong>, diferenciação diagnóstica entre <strong>Efeito Somogyi e Fenômeno do Alvorecer</strong>, precisão no <strong>momento do parto (ACOG PB 190 / SBD)</strong>, controle glicêmico intraparto rigoroso e <strong>reclassificação obrigatória com TOTG 75g no puerpério</strong>.
        </p>
      </div>

      {/* 7.1 METAS GLICÊMICAS & AUTOMONITORIZAÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              7.1 Metas Glicêmicas Capilares Ambulatoriais (SBD / FEBRASGO / ADA)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800">
            Alvo: &gt; 70-80% das medidas na meta
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase block">Jejum e Pré-Prandial</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">&lt; 95 mg/dL</span>
            <span className="text-[10px] text-slate-500 block">(Algumas diretrizes &lt; 90)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase block">1 Hora Pós-Prandial</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">&lt; 140 mg/dL</span>
            <span className="text-[10px] text-slate-500 block">Pico máximo tolerado</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase block">2 Horas Pós-Prandial</span>
            <span className="text-2xl font-black text-indigo-400 font-mono">&lt; 120 mg/dL</span>
            <span className="text-[10px] text-slate-500 block">Retorno pós-refeição</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
          <strong className="text-white block">Perfil Glicêmico Ambulatorial:</strong>
          <p>
            • <strong>DMG Classe A1 (Dieta):</strong> Perfil de 4 pontos (jejum + 3 pós-prandiais de 1h ou 2h) realizado 1 a 2 vezes por semana.<br/>
            • <strong>DMG Classe A2 (Insulina) ou DM Prévio:</strong> Perfil de 6 a 7 pontos diariamente (jejum, pré e pós-café, almoço e jantar + antes de dormir).
          </p>
        </div>

        {/* NEVER MISS — INTERPRETAR PADRÃO */}
        <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap size={18} className="fill-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider">
              ⚡ NEVER MISS — Interpretar Padrão e Sequência, Nunca Valores Isolados
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Uma medida isolada de 145 mg/dL após um almoço festivo não indica aumento de dose de insulina. O ajuste exige a avaliação do <strong>mapa glicêmico semanal</strong>: se mais de <strong>20% a 30% das dosagens</strong> naquele mesmo horário (ex: sempre no pós-almoço) estiverem consistentemente acima do alvo, ajusta-se a conduta direcionada àquela refeição.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* EFEITO SOMOGYI VS FENÔMENO DO ALVORECER (INTERATIVO) */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-3xl bg-slate-950 border-2 border-purple-800/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-purple-400">
              <Clock size={20} />
              <h5 className="text-sm font-black uppercase tracking-wider">
                Efeito Somogyi vs Fenômeno do Alvorecer (O Teste da Glicemia às 03:00h)
              </h5>
            </div>
            <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950 px-2.5 py-0.5 rounded border border-purple-800">
              Mecanismos Opostos
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Quando a gestante apresenta <strong>hiperglicemia inexplicada no jejum matinal</strong>, a conduta correta depende exclusivamente da <strong>glicemia capilar medida às 03:00 da madrugada</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Glicemia de Jejum Matinal (Ex: 135 mg/dL)
              </label>
              <input
                type="number"
                placeholder="Ex: 135"
                value={nightFasting}
                onChange={(e) => setNightFasting(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-purple-400 uppercase mb-1">
                Glicemia Medida às 03:00 da Madrugada (mg/dL)
              </label>
              <input
                type="number"
                placeholder="Insira o valor das 03h (ex: 58 ou 110)"
                value={threeAmValue}
                onChange={(e) => setThreeAmValue(e.target.value)}
                className="w-full bg-slate-900 border border-purple-500 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Botões Rápidos */}
          <div className="flex gap-2">
            <button
              onClick={() => { setNightFasting('130'); setThreeAmValue('56'); }}
              className="text-xs px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-rose-400 hover:bg-slate-800"
            >
              Simular Somogyi (03h = 56 mg/dL)
            </button>
            <button
              onClick={() => { setNightFasting('130'); setThreeAmValue('112'); }}
              className="text-xs px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-amber-400 hover:bg-slate-800"
            >
              Simular Alvorecer (03h = 112 mg/dL)
            </button>
          </div>

          {/* Resultado do Teste de 03h */}
          {somogyiResult && (
            <div className={`p-5 rounded-2xl border-2 ${somogyiResult.bg} space-y-3`}>
              <h6 className={`text-sm font-black ${somogyiResult.color}`}>{somogyiResult.title}</h6>
              <p className="text-xs text-slate-200 leading-relaxed">{somogyiResult.explanation}</p>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-bold text-white">
                {somogyiResult.conduct}
              </div>
            </div>
          )}
        </div>

        {/* FRONTEIRA — Somogyi vs CGM & Atraso de 5-15 min */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800 space-y-1.5">
            <strong className="text-indigo-400 block text-sm">🔬 FRONTEIRA — Somogyi na Era do CGM</strong>
            <p className="text-slate-300 leading-relaxed">
              Com o advento dos sensores de monitorização contínua (CGM), demonstrou-se que a maioria dos episódios de hiperglicemia matinal decorre puramente de insuficiência de insulina basal noturna (Alvorecer) e não de hipoglicemia de rebote. Ainda assim, a dosagem às 03h permanece o teste clínico de ouro na prática ambulatorial tradicional.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-cyan-400 block text-sm">🔬 Sensor Contínuo vs Capilar (Lag Time)</strong>
            <p className="text-slate-300 leading-relaxed">
              O sensor intersticial apresenta um <strong>atraso fisiológico (lag-time) de 5 a 15 minutos</strong> em relação à glicemia plasmática capilar durante variações rápidas pós-prandiais ou quedas agudas, devendo a gestante confirmar com ponta de dedo em caso de sintomas de hipoglicemia.
            </p>
          </div>
        </div>
      </div>

      {/* 7.3 VIGILÂNCIA FETAL & 7.4 ESTIMATIVA DE PESO FETAL (HADLOCK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-blue-400 border-b border-slate-800 pb-3">
            <HeartPulse size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">7.3 Vigilância da Vitalidade Fetal</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            • <strong>DMG A1 compensado:</strong> US obstétrico a cada 3 a 4 semanas para avaliar curva de crescimento e ILA (Índice de Líquido Amniótico). CTG de rotina apenas a partir de 38 semanas.<br/>
            • <strong>DMG A2, DM prévio ou mau controle:</strong> Avaliação biofísica intensificada com <strong>Cardiotocografia (CTG) basal semanal ou bi-semanal a partir de 32 a 34 semanas</strong> + Perfil Biofísico Fetal (PBF) e Doppler se suspeita de insuficiência placentária ou restrição de crescimento.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
            <Scale size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">7.4 Limitações do PFE (Fórmula de Hadlock)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            As fórmulas ultrassonográficas convencionais de Hadlock (que usam DBP, CC, CA e Fêmur) tendem a <strong>superestimar o peso fetal acima de 4.000 g em mais de 15% a 20%</strong> na gestante diabética.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-medium">
            Isso ocorre porque a deposição de gordura é desproporcionalmente concentrada no abdome e cintura escapular, inflando a fórmula matemática. A avaliação clínica por palpação e altura uterina deve ser sempre correlacionada.
          </div>
        </div>
      </div>

      {/* 7.5 MOMENTO DO PARTO & CONVERGÊNCIA ACOG PB 190 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Calendar size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              7.5 Momento do Parto — Diretrizes Consensuais (SBD / FEBRASGO / ACOG PB 190)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
            Resolução Programada
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3.5">Categoria Clínica</th>
                <th className="p-3.5">Controle Glicêmico</th>
                <th className="p-3.5">Idade Gestacional Ideal para o Parto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr>
                <td className="p-3.5 font-bold text-emerald-400">DMG Classe A1 (Dieta/MEV)</td>
                <td className="p-3.5">Bom controle glicêmico</td>
                <td className="p-3.5 font-mono font-bold text-white">39 semanas a 40 semanas + 6 dias (pode aguardar termo)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-amber-400">DMG Classe A2 (Insulina)</td>
                <td className="p-3.5">Bom controle glicêmico</td>
                <td className="p-3.5 font-mono font-bold text-white">39 semanas a 39 semanas + 6 dias (não passar de 40s)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-rose-400">DMG ou DM Prévio</td>
                <td className="p-3.5 text-rose-300 font-bold">Mau controle / Descompensado</td>
                <td className="p-3.5 font-mono font-bold text-white">37 semanas a 38 semanas + 6 dias</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-indigo-400">Diabetes Prévio (DM1 / DM2)</td>
                <td className="p-3.5">Bom controle, sem vasculopatia</td>
                <td className="p-3.5 font-mono font-bold text-white">38 semanas a 39 semanas + 6 dias</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-rose-400">Diabetes Prévio com Vasculopatia</td>
                <td className="p-3.5 text-rose-300">Nefropatia, Retinopatia, RCF</td>
                <td className="p-3.5 font-mono font-bold text-white">Até 37 semanas (individualizar conforme vitalidade)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SINAIS QUE ANTECIPAM PARTO */}
        <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap size={18} className="fill-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider">
              ⚡ NEVER MISS — Intercorrências Agudas Sobrepõem-se à Idade Gestacional Teórica
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Alteração na prova de vitalidade fetal (ex: CTG categoria III ou PBF &le; 6/10), pré-eclâmpsia com sinais de gravidade, polidrâmnio sintomático grave ou interrupção do crescimento fetal <strong>antecipam o parto imediatamente</strong>, independentemente da idade gestacional planejada ou da classe White.
          </p>
        </div>
      </div>

      {/* 7.6 VIA DE PARTO & 7.7 MANEJO INTRAPARTO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Via de Parto */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
            <Baby size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">7.6 Via de Parto e Distócia de Ombro</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            A via de parto preferencial é a <strong>VIA VAGINAL</strong>. O DMG isolado não é indicação mandatória de cesariana.
          </p>
          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-900/60 text-xs text-slate-200 space-y-2">
            <strong className="text-purple-300 block">Indicação de Cesariana Eletiva Específica:</strong>
            <p>
              Recomenda-se discutir cesariana eletiva quando o <strong>Peso Fetal Estimado (PFE) for &ge; 4.500 g</strong> (ou &ge; 4.000 g em DM prévio com suspeita de desproporção céfalo-pélvica) para reduzir o risco de <strong>Distócia de Ombro e lesão de plexo braquial</strong> decorrente da macrossomia assimétrica.
            </p>
          </div>
        </div>

        {/* Manejo Intraparto */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-3">
            <Activity size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">7.7 Manejo Intraparto (Meta: 70 a 120 mg/dL)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Durante o trabalho de parto, a meta estrita é manter a glicemia capilar materna entre <strong>70 e 120 mg/dL</strong> (aferição horária).
          </p>
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 text-xs text-slate-200 space-y-2">
            <strong className="text-emerald-300 block">Racional Fisiopatológico:</strong>
            <p>
              Picos de hiperglicemia materna no período expulsivo estimulam o pâncreas fetal a secretar um pulso agudo de insulina que, após o clampeamento do cordão, deflagra <strong>hipoglicemia neonatal grave nas primeiras 1 a 2 horas de vida</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 7.8 PUERPÉRIO E RECLASSIFICAÇÃO COM TOTG 75G */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/70 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400">
            <RotateCcw size={22} />
            <h4 className="text-sm md:text-base font-black uppercase tracking-wider">
              7.8 Puerpério: Suspensão da Insulina & Reclassificação Obrigatória com TOTG 75g
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
            6 a 8 Semanas Pós-Parto
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <strong className="text-cyan-300 block text-sm">1. Conduta Imediata Pós-Dequitação</strong>
            <p className="text-slate-300 leading-relaxed">
              No DMG, com a expulsão da placenta, os níveis de hPL e hormônios contrainsulínicos despencam imediatamente. A <strong>insulinoterapia deve ser suspensa imediatamente</strong> no pós-parto imediato, mantendo-se apenas glicemia capilar pontual na enfermaria para confirmar a volta à normoglicemia.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-amber-800 space-y-2">
            <strong className="text-amber-300 block text-sm">2. Reclassificação com TOTG 75g (6–8 Semanas)</strong>
            <p className="text-slate-300 leading-relaxed">
              Toda puérpera com diagnóstico de DMG deve realizar um <strong>TOTG 75g entre 6 e 8 semanas pós-parto</strong> (ou após o término da amamentação exclusiva), aplicando os <strong>critérios de normalidade de diabetes fora da gravidez</strong>:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 font-mono text-[11px]">
              <div>• <strong>Normal:</strong> Jejum &lt; 100 mg/dL e 2h &lt; 140 mg/dL</div>
              <div>• <strong>Pré-Diabetes:</strong> Jejum 100–125 mg/dL ou 2h 140–199 mg/dL</div>
              <div>• <strong>Diabetes Mellitus Tipo 2:</strong> Jejum &ge; 126 mg/dL ou 2h &ge; 200 mg/dL</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/80 text-xs text-amber-200 leading-relaxed">
          <strong>Risco Cardiovascular e Metabólico de Longo Prazo:</strong> Mulheres que tiveram DMG possuem risco <strong>7 a 10 vezes maior de desenvolver DM2 ao longo da vida</strong> (até 50% em 10 anos) e maior incidência de síndrome metabólica precoce. Recomenda-se rastreio anual ou bienal com glicemia de jejum ou HbA1c e estímulo permanente a hábitos saudáveis e aleitamento materno prolongado.
        </div>
      </div>
    </div>
  );
}

function Calendar(props: { size?: number; className?: string }) {
  return <Clock {...props} />;
}
