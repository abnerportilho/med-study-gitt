import React, { useState } from 'react';
import { 
  TrendingUp, Droplet, Layers, AlertTriangle, 
  CheckCircle2, Info, ShieldAlert, Sparkles, Scale, Gauge
} from 'lucide-react';

export default function USGTerceiroTriCrescimento() {
  const [fetalPercentile, setFetalPercentile] = useState<number>(7);
  const [dopplerStatus, setDopplerStatus] = useState<'normal' | 'alterado'>('normal');
  const [ilaValue, setIlaValue] = useState<number>(12);
  const [mbvValue, setMbvValue] = useState<number>(4.5);

  // Diagnóstico de PIG vs RCF
  const getGrowthDiagnosis = () => {
    if (fetalPercentile < 3) {
      return {
        type: 'RCF Severo',
        color: 'text-rose-400',
        bg: 'bg-rose-950/40 border-rose-800',
        badge: 'RCF DEFINIDO (Percentil < 3)',
        description: 'Critério independente e absoluto pelo Consenso Delphi: feto com peso abaixo do percentil 3 é considerado RCF patológico, independentemente dos índices do Doppler no momento do exame.'
      };
    } else if (fetalPercentile <= 10) {
      if (dopplerStatus === 'alterado') {
        return {
          type: 'RCF Moderado',
          color: 'text-rose-400',
          bg: 'bg-rose-950/40 border-rose-800',
          badge: 'RCF CONFIRMADO (Doppler Alterado)',
          description: 'Feto entre percentil 3 e 10 com insuficiência placentária ou redistribuição hemodinâmica documentada (IP Umbilical > p95 ou RCP < p5). Risco elevado de hipóxia e óbito fetal.'
        };
      }
      return {
        type: 'PIG Constitucional',
        color: 'text-cyan-400',
        bg: 'bg-cyan-950/40 border-cyan-800',
        badge: 'PIG CONSTITUCIONAL (Feto Saudável)',
        description: 'Feto entre percentil 3 e 10 com dopplerfluxometria rigorosamente normal, anatomia normal e curva de crescimento preservada. Trata-se de um concepto biologicamente pequeno, sem sofrimento hipóxico.'
      };
    } else if (fetalPercentile <= 90) {
      return {
        type: 'AIG (Adequado)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-800',
        badge: 'CRESCIMENTO ADEQUADO (AIG)',
        description: 'Desenvolvimento fetal e peso estimado perfeitamente adequados para a idade gestacional.'
      };
    } else {
      return {
        type: 'GIG / Macrossomia',
        color: 'text-amber-400',
        bg: 'bg-amber-950/40 border-amber-800',
        badge: 'MACROSSOMIA / GIG (Percentil > 90)',
        description: 'Feto grande para a idade gestacional. Investigar ativamente Diabetes Gestacional não controlado ou diabetes pré-existente. Risco de distócia de ombros no parto.'
      };
    }
  };

  const growthDiag = getGrowthDiagnosis();

  return (
    <div className="space-y-6">
      {/* INTRODUÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Eixo 5 · Crescimento Fetal, Líquido Amniótico & Placenta
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              5. 3º Trimestre: Biometria, RCF vs PIG e Volume Amniótico
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          A ultrassonografia no 3º trimestre (habitualmente entre 32 e 36 semanas) monitora o potencial de crescimento genético fetal, quantifica com precisão a homeostase do líquido amniótico e avalia a localização e características da placenta, diferenciando o feto constitucionalmente pequeno do feto em restrição de crescimento com hipóxia crônica.
        </p>
      </div>

      {/* SIMULADOR CLÍNICO: PIG VS RCF SEGUNDO O CONSENSO DELPHI */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/70 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Scale size={20} />
            <h4 className="text-base font-black text-white">
              Diferenciação Diagnóstica: PIG Constitucional vs RCF (Consenso Delphi)
            </h4>
          </div>
          <span className="text-xs font-mono text-amber-300 font-bold">FEBRASGO / ISUOG</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Controle do Percentil */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">
                Percentil de Peso Fetal Estimado (Hadlock):
              </label>
              <span className="text-sm font-mono font-black text-amber-400">Percentil {fetalPercentile}</span>
            </div>
            <input
              type="range"
              min={1}
              max={99}
              value={fetalPercentile}
              onChange={(e) => setFetalPercentile(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span className="text-rose-400 font-bold">&lt; p3 (RCF Absoluto)</span>
              <span>p10 (Ponto de Corte)</span>
              <span>p50 (Média)</span>
              <span className="text-amber-400 font-bold">&gt; p90 (GIG)</span>
            </div>
          </div>

          {/* Controle do Doppler */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 block">
              Status da Dopplervelocimetria (Umbilical / ACM / Relação CP):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDopplerStatus('normal')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  dopplerStatus === 'normal' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Doppler Normal
              </button>
              <button
                onClick={() => setDopplerStatus('alterado')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  dopplerStatus === 'alterado' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Doppler Alterado
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              IP da Artéria Umbilical &gt; p95 OU Relação Cérebro-Placentária (RCP) &lt; p5.
            </p>
          </div>
        </div>

        {/* Diagnóstico Resultante */}
        <div className={`p-4 md:p-5 rounded-2xl border text-xs leading-relaxed ${growthDiag.bg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-black uppercase tracking-wider ${growthDiag.color}`}>
              {growthDiag.badge}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-300">
              Conduta Clínica Imediata
            </span>
          </div>
          <p className="text-slate-200 text-xs md:text-sm font-medium leading-relaxed">
            {growthDiag.description}
          </p>
        </div>
      </div>

      {/* AVALIAÇÃO DO LÍQUIDO AMNIÓTICO: ILA VS MAIOR BOLSÃO VERTICAL (MBV) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
          <Droplet size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Avaliação do Volume de Líquido Amniótico: ILA vs Maior Bolsão Vertical (MBV)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ILA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Índice de Líquido Amniótico (ILA)</span>
              <span className="text-xs font-mono font-bold text-cyan-400">4 Quadrantes</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Soma vertical dos maiores bolsões livres de partes fetais e cordão umbilical em cada um dos quatro quadrantes uterinos:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="text-rose-400 font-bold">Oligodramnia: ILA &lt; 5,0 cm</div>
              <div className="text-emerald-400 font-bold">Volume Normal: ILA entre 5,0 e 24,0 cm</div>
              <div className="text-amber-400 font-bold">Polidramnia: ILA &gt; 24,0 cm</div>
            </div>
          </div>

          {/* MBV */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Maior Bolsão Vertical (MBV)</span>
              <span className="text-xs font-mono font-bold text-cyan-300">Padrão ISUOG</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Medida do maior bolsão vertical único livre de cordão e membros com largura horizontal mínima de 1 cm:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="text-rose-400 font-bold">Oligodramnia: MBV &lt; 2,0 cm</div>
              <div className="text-emerald-400 font-bold">Volume Normal: MBV entre 2,0 e 8,0 cm</div>
              <div className="text-amber-400 font-bold">Polidramnia: MBV &gt; 8,0 cm</div>
            </div>
          </div>
        </div>

        {/* Recomendação da Diretriz Cochrane & ISUOG */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/80 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <Info size={16} />
            <span>Por que a ISUOG e as Revisões Sistemáticas Recomendam o MBV?</span>
          </div>
          <p className="leading-relaxed">
            O uso do ILA superestima o diagnóstico de oligodramnia em comparação ao MBV, levando ao dobro de induções de parto desnecessárias e cesarianas iatrogênicas por sofrimento fetal presumido, sem qualquer redução na mortalidade perinatal. Em gestações gemelares, o <strong>MBV é obrigatório</strong> para avaliar cada feto individualmente.
          </p>
        </div>
      </div>

      {/* PLACENTA PRÉVIA & ESPECTRO DO ACRETISMO PLACENTÁRIO (PAS) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-900/80 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2.5 text-rose-400">
          <ShieldAlert size={22} />
          <h4 className="text-base md:text-lg font-black text-white">
            Placenta Prévia e Espectro do Acretismo Placentário (PAS - Placenta Accreta Spectrum)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-cyan-300 font-bold text-sm">Placenta Prévia vs Inserção Baixa</div>
            <p className="text-slate-300 leading-relaxed">
              O diagnóstico definitivo de <strong>Placenta Prévia</strong> só deve ser firmado após 28 a 32 semanas pela ultrassonografia transvaginal, devido ao fenômeno da migração placentária fisiológica:
            </p>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li><strong>Placenta Prévia:</strong> O tecido placentário recobre o orifício interno do colo (OIC). Indicação formal de cesariana eletiva.</li>
              <li><strong>Placenta de Inserção Baixa:</strong> A borda placentária está a menos de 20 mm do OIC, mas sem recobri-lo. Parto vaginal pode ser tentado se &gt; 10 mm com monitorização contínua.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800/70 space-y-2">
            <div className="text-rose-400 font-bold text-sm">Sinais Ultrassonográficos de Acretismo (PAS)</div>
            <p className="text-slate-300 leading-relaxed">
              Investigar ativamente em qualquer paciente com <strong>cesariana anterior + placenta prévia anterior</strong> (risco de até 50% de acretismo):
            </p>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li><strong>Perda da zona hipoecoica retroplacentária</strong> (clivagem miometrial).</li>
              <li><strong>Lacunas placentárias múltiplas</strong> com fluxo turbilhonar ao Doppler (aspecto de "queijo suíço").</li>
              <li>Afilamento acentuado do miométrio sobre a cicatriz (&lt; 1 mm).</li>
              <li>Hipervascularização na interface útero-bexiga e vasos em ponte invadindo a parede vesical.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
