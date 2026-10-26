import React, { useState } from 'react';
import { 
  Dna, Eye, HeartPulse, AlertTriangle, ShieldCheck, 
  Activity, CheckCircle2, Info, Sparkles, Scale, Heart, ArrowRight
} from 'lucide-react';

export default function USGMorfologicoPrimeiroTri() {
  const [tnValue, setTnValue] = useState<number>(2.2);
  const [nasalBone, setNasalBone] = useState<'presente' | 'ausente'>('presente');
  const [ductoVenoso, setDuctoVenoso] = useState<'normal' | 'reverso'>('normal');
  const [tricuspide, setTricuspide] = useState<'normal' | 'regurgitacao'>('normal');

  // Risco estimado interativo
  const isHighRisk = tnValue >= 2.5 || nasalBone === 'ausente' || ductoVenoso === 'reverso' || tricuspide === 'regurgitacao';

  return (
    <div className="space-y-6">
      {/* INTRODUÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Eye size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Eixo 3 · Rastreio de Aneuploidias & Pré-Eclâmpsia
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              3. Morfológico de 1º Trimestre (11 a 13 semanas e 6 dias)
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          Realizado obrigatoriamente quando o <strong>CCN mede entre 45 mm e 84 mm</strong>. Combina a pesquisa de marcadores ultrassonográficos de cromossomopatias (especialmente Síndrome de Down / Trissomia 21) com a avaliação anatômica precoce e a predição hemodinâmica da pré-eclâmpsia precoce via Doppler das artérias uterinas.
        </p>
      </div>

      {/* SIMULADOR INTERATIVO DE MARCADORES DO 1º TRIMESTRE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/70 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles size={20} />
            <h4 className="text-base font-black text-white">
              Calculadora & Avaliador de Risco Fetal (11–13s6d)
            </h4>
          </div>
          <span className="text-xs font-mono text-cyan-300 font-bold">Protocolo FMF</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Marcador 1: Transluscência Nucal */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              Transluscência Nucal (TN): <span className="text-cyan-400 font-mono font-black">{tnValue.toFixed(1)} mm</span>
            </label>
            <input
              type="range"
              min={1.0}
              max={6.0}
              step={0.1}
              value={tnValue}
              onChange={(e) => setTnValue(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Normal (&lt;2,5mm)</span>
              <span>Corte P95 (2,5mm)</span>
              <span>Severa (&gt;3,5mm)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {tnValue < 2.5 ? (
                <span className="text-emerald-400 font-bold">✓ Abaixo do P95 (Normal)</span>
              ) : tnValue < 3.5 ? (
                <span className="text-amber-400 font-bold">⚠ TN Aumentada (P95 a P99)</span>
              ) : (
                <span className="text-rose-400 font-bold">⚡ TN Muito Aumentada (&ge; P99)</span>
              )}
            </div>
          </div>

          {/* Marcador 2: Osso Nasal */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Osso Nasal:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setNasalBone('presente')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  nasalBone === 'presente' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Presente
              </button>
              <button
                onClick={() => setNasalBone('ausente')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  nasalBone === 'ausente' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Ausente
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Ausente em ~60-70% dos fetos com T21 e em apenas 1-2% dos fetos euploides.
            </p>
          </div>

          {/* Marcador 3: Ducto Venoso */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Ducto Venoso (Onda 'a'):</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDuctoVenoso('normal')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  ductoVenoso === 'normal' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Positiva (Normal)
              </button>
              <button
                onClick={() => setDuctoVenoso('reverso')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  ductoVenoso === 'reverso' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Reversa / Negativa
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Onda 'a' reversa indica sobrecarga cardíaca direita e cromossomopatias.
            </p>
          </div>

          {/* Marcador 4: Valva Tricúspide */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Fluxo Tricúspide:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTricuspide('normal')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  tricuspide === 'normal' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Laminar Normal
              </button>
              <button
                onClick={() => setTricuspide('regurgitacao')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  tricuspide === 'regurgitacao' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Regurgitação
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Regurgitação tricúspide com velocidade &gt; 60 cm/s eleva o risco de T21 e cardiopatias congênitas.
            </p>
          </div>
        </div>

        {/* Painel de Interpretação e Conduta Imediata */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
          isHighRisk 
            ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
            : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
        }`}>
          <div className="p-2 rounded-xl bg-slate-950 shrink-0 mt-0.5">
            {isHighRisk ? <AlertTriangle size={20} className="text-rose-400" /> : <ShieldCheck size={20} className="text-emerald-400" />}
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-sm">
              {isHighRisk ? 'Feto em Faixa de Alto Risco para Cromossomopatias / Cardiopatia' : 'Rastreio de Baixo Risco para Cromossomopatias'}
            </div>
            {isHighRisk ? (
              <div>
                <strong>Conduta Obrigatória:</strong> Oferecer aconselhamento genético e teste diagnóstico invasivo (<strong>Biópsia de Vilo Corial entre 11–14 semanas</strong> ou Amniocentese após 15–16 semanas para cariótipo / Microarray / CGH-Array). Além disso, está formalmente indicado <strong>Ecocardiograma Fetal precoce com 16 semanas e de controle com 24 semanas</strong>, mesmo se o cariótipo for normal (risco acentuado de cardiopatias congênitas graves estruturais).
              </div>
            ) : (
              <div>
                <strong>Conduta:</strong> Manter acompanhamento pré-natal habitual e agendar Ultrassonografia Morfológica de 2º Trimestre com 20 a 24 semanas. O risco basal de aneuploidias é baixo.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CRITÉRIOS DE MEDIÇÃO RIGOROSA DA TN SEGUNDO A FETAL MEDICINE FOUNDATION (FMF) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
          <Scale size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Critérios Técnicos Obrigatórios para Medição da Transluscência Nucal (FMF)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 block">1. Corte Sagital Estrito da Linha Média</span>
            <p className="text-slate-400 leading-relaxed">
              Visualização simultânea da ponta ecogênica do nariz, do osso nasal, do palato anterior retangular, do diencéfalo translúcido e da membrana nucal. A coluna deve estar reta.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 block">2. Posição Neutra da Cabeça Fetal</span>
            <p className="text-slate-400 leading-relaxed">
              Deve haver espaço líquido anecoico entre o queixo e o tórax fetal. A <strong>hiperextensão aumenta falsamente a TN em até 0,6 mm</strong>; a hiperflexão reduz falsamente a medida.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 block">3. Magnificação Máxima da Imagem</span>
            <p className="text-slate-400 leading-relaxed">
              A cabeça e o tórax fetal devem ocupar pelo menos <strong>75% da tela do monitor</strong>. Cada movimento do cursor representa menos de 0,1 mm.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 block">4. Distinção Crucial entre Pele e Âmnio</span>
            <p className="text-slate-400 leading-relaxed">
              A membrana amniótica frequentemente se sobrepõe à pele nucal nessa idade gestacional. É obrigatório aguardar o feto se movimentar espontaneamente ou aplicar leve toque abdominal para afastar a pele do âmnio.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 block">5. Posicionamento dos Calipers (On-to-On)</span>
            <p className="text-slate-400 leading-relaxed">
              Os marcadores devem ser colocados estritamente nas <strong>bordas internas</strong> das linhas ecogênicas delimitadoras do espaço anecoico nucal (borda interna da pele e borda interna da fáscia pré-vertebral).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 block">6. Maior Espessura do Espaço Nucal</span>
            <p className="text-slate-400 leading-relaxed">
              Medir sempre no ponto de maior diâmetro visualizável. Quando houver cordão umbilical circular no pescoço, medir acima e abaixo do cordão e considerar a média ou a medida livre de compressão.
            </p>
          </div>
        </div>
      </div>

      {/* RASTREIO DE PRÉ-ECLÂMPSIA PRECOCE (ESTUDO ASPRE) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-purple-900/80 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2.5 text-purple-400">
          <HeartPulse size={22} />
          <h4 className="text-base md:text-lg font-black text-white">
            Rastreio Precoce de Pré-Eclâmpsia com Doppler de Artérias Uterinas (11–13s6d)
          </h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A identificação de gestantes com alto risco para <strong>Pré-Eclâmpsia pré-termo (&lt; 37 semanas)</strong> no 1º trimestre revolucionou a obstetrícia moderna, permitindo a prevenção farmacológica antes do término da placentação (16 semanas):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-purple-300 font-bold">1. Os Pilares do Cálculo de Risco</div>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li>História clínica e fatores maternos (nuliparidade, IMC, HAS crônica, DM).</li>
              <li><strong>Pressão Arterial Média (PAM)</strong> aferida em ambos os braços com aparelho validado.</li>
              <li><strong>Doppler de Artérias Uterinas:</strong> Índice de Pulsatilidade Médio (IPm) &gt; P95.</li>
              <li>Biomarcador sérico: <strong>PlGF (Placental Growth Factor)</strong> diminuído.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-cyan-300 font-bold">2. Sensibilidade do Teste Combinado</div>
            <p className="text-slate-300 leading-relaxed">
              O algoritmo da FMF detecta cerca de <strong>90% das pacientes que desenvolverão pré-eclâmpsia precoce (&lt; 34 sem)</strong> e 75% das que terão pré-eclâmpsia antes de 37 semanas, com taxa de falso-positivo de apenas 10%.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800 space-y-2">
            <div className="text-white font-bold">3. Intervenção Baseada no Estudo ASPRE</div>
            <p className="text-purple-200 leading-relaxed font-semibold">
              Se alto risco identificado (&gt; 1:100): prescrever <strong>Ácido Acetilsalicílico (AAS) 150 mg/dia via oral, à noite (ao deitar), iniciado OBRIGATORIAMENTE antes de 16 semanas</strong> (idealmente 11–14 sem) e mantido até 36 semanas.
            </p>
            <div className="text-[11px] text-purple-300">
              Redução comprovada de mais de <strong>70% a 80% na incidência de Pré-Eclâmpsia com parto prematuro</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
