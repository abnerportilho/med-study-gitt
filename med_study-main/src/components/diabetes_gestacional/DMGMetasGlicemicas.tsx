import React, { useState } from 'react';
import { 
  Activity, Clock, Zap, CheckCircle2, AlertTriangle, 
  Sparkles, Target, Eye, RotateCcw, HelpCircle 
} from 'lucide-react';

export default function DMGMetasGlicemicas() {
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
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Target size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Eixo 7 · Monitorização & Metas Glicêmicas
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              7. Metas Glicêmicas e Automonitorização
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O controle metabólico estrito na gestação previne o hiperinsulinismo fetal e complicações perinatais. Requer <strong>alvos capilares pré e pós-prandiais rígidos</strong>, análise criteriosa do <strong>mapa glicêmico semanal</strong> e diagnóstico diferencial preciso da hiperglicemia matinal através do <strong>teste das 03:00h (Efeito Somogyi vs Fenômeno do Alvorecer)</strong>.
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
            <span className="text-[10px] text-slate-500 block">(Algumas diretrizes &lt; 90 mg/dL)</span>
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
          <strong className="text-white block">Estratificação da Frequência de Automonitorização:</strong>
          <p>
            • <strong>DMG Classe A1 (Dieta/MEV):</strong> Perfil de 4 pontos (jejum + 3 pós-prandiais de 1h ou 2h) realizado 1 a 2 vezes por semana.<br/>
            • <strong>DMG Classe A2 (Insulina) ou DM Prévio:</strong> Perfil de 6 a 7 pontos diariamente (jejum, pré e pós-café, almoço e jantar + antes de dormir/madrugada).
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
            Uma medida isolada de 145 mg/dL após uma refeição atípica não indica aumento de dose de insulina. O ajuste farmacológico exige a avaliação do <strong>mapa glicêmico semanal</strong>: se mais de <strong>20% a 30% das dosagens</strong> naquele mesmo horário (ex: sempre no pós-almoço) estiverem consistentemente acima do alvo, ajusta-se a conduta direcionada àquela refeição.
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
            Quando a gestante em uso de insulina NPH noturna apresenta <strong>hiperglicemia inexplicada no jejum matinal</strong>, a conduta correta depende exclusivamente da <strong>glicemia capilar medida às 03:00 da madrugada</strong>:
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
              className="text-xs px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-rose-400 hover:bg-slate-800 transition-colors"
            >
              Simular Somogyi (03h = 56 mg/dL)
            </button>
            <button
              onClick={() => { setNightFasting('130'); setThreeAmValue('112'); }}
              className="text-xs px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-amber-400 hover:bg-slate-800 transition-colors"
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
    </div>
  );
}
