import React, { useState } from 'react';
import { 
  Pill, Activity, Scale, Sparkles, AlertTriangle, 
  CheckCircle2, Info, ChevronRight, Calculator, Flame, HeartPulse, Zap
} from 'lucide-react';

export default function DMGTratamentoInsulina() {
  const [weight, setWeight] = useState<string>('75');
  const [dosePerKg, setDosePerKg] = useState<string>('0.5');
  const [imcCategory, setImcCategory] = useState<'baixo' | 'eutrofica' | 'sobrepeso' | 'obesidade'>('sobrepeso');

  const parsedWeight = parseFloat(weight) || 75;
  const parsedDosePerKg = parseFloat(dosePerKg) || 0.5;
  const totalDailyDose = Math.round(parsedWeight * parsedDosePerKg);

  // Esquema Basal-Bolus (50% NPH / 50% Rápida)
  const nphDose = Math.round(totalDailyDose * 0.5);
  const nphMorning = Math.round(nphDose * 0.67);
  const nphNight = Math.round(nphDose * 0.33);

  const bolusDose = Math.round(totalDailyDose * 0.5);
  const bolusBreakfast = Math.round(bolusDose * 0.33);
  const bolusLunch = Math.round(bolusDose * 0.34);
  const bolusDinner = Math.round(bolusDose * 0.33);

  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO TEMA 6 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Pill size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Eixo 6 · Manejo Terapêutico e Farmacologia
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              6. Tratamento: Nutrição, Exercício e Insulinoterapia
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O manejo terapêutico do DMG é escalonado: inicia-se obrigatoriamente com <strong>Terapia Nutricional sem cetose</strong> e <strong>Atividade Física aeróbica</strong>. Se as metas glicêmicas não forem atingidas em 1 a 2 semanas, a <strong>Insulina</strong> é o fármaco de primeira escolha indiscutível por não atravessar a barreira placentária.
        </p>
      </div>

      {/* 6.1 TERAPIA NUTRICIONAL & METAS */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-3">
          <Scale size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            6.1 Terapia Nutricional: As 4 Metas Clínicas Fundamentais
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block text-sm">1. Normoglicemia</span>
            <p className="text-slate-300">Evitar picos pós-prandiais e hipoglicemias sem restrição calórica exagerada.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block text-sm">2. Ganho Ponderal IOM</span>
            <p className="text-slate-300">Adequar o ganho de peso total de acordo com a faixa de IMC pré-gestacional.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/60 space-y-1.5">
            <span className="text-rose-400 font-bold block text-sm">3. Sem Cetose Materna</span>
            <p className="text-slate-300">Evitar jejum prolongado que gere corpos cetônicos neurotóxicos ao concepto.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block text-sm">4. Bem-Estar Fetal</span>
            <p className="text-slate-300">Garantir aporte energético e nutricional adequado para o crescimento fetal simétrico.</p>
          </div>
        </div>

        {/* Conceito de Sem Cetose e Jejum Acelerado de Freinkel */}
        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-3 text-xs">
          <h5 className="text-sm font-black text-rose-300">
            A Importância Crítica do &ldquo;Sem Cetose&rdquo; & O Fenômeno do &ldquo;Jejum Acelerado&rdquo;
          </h5>
          <p className="text-slate-200 leading-relaxed">
            Estudos clássicos de <strong>Rizzo et al.</strong> e acompanhamentos neurocomportamentais demonstraram que a exposição fetal a <strong>corpos cetônicos maternos</strong> (acetoacetato e beta-hidroxibutirato, que atravessam livremente a placenta) correlaciona-se com <strong>menor quociente de inteligência (QI) e prejuízo no neurodesenvolvimento infantil</strong>.
          </p>
          <p className="text-slate-200 leading-relaxed">
            Na gestação, o feto drena glicose continuamente, acelerando a depleção do glicogênio hepático materno — fenômeno chamado por Norbert Freinkel de <strong>&ldquo;Jejum Acelerado&rdquo;</strong>. Por isso, a gestante não deve realizar jejum prolongado (&gt; 8–10 horas) e <strong>deve fracionar a alimentação em 5 a 6 refeições ao dia, com ênfase na CEIA noturna protetora rica em carboidrato complexo e proteína</strong>.
          </p>
        </div>

        {/* TABELA DE GANHO PONDERAL DO IOM & CONTROVÉRSIA GEMELAR */}
        <div className="space-y-4">
          <h5 className="text-xs font-black uppercase text-slate-300 tracking-wider">
            Recomendações do Institute of Medicine (IOM) para Ganho Ponderal na Gestação
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
              <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Classificação do IMC Pré-Gestacional</th>
                  <th className="p-3">Faixa de IMC (kg/m²)</th>
                  <th className="p-3">Ganho de Peso Total Recomendado (Gestação Única)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
                <tr>
                  <td className="p-3 text-cyan-400 font-bold">Baixo Peso</td>
                  <td className="p-3 font-mono">&lt; 18,5</td>
                  <td className="p-3 font-mono font-bold text-white">12,5 a 18,0 kg</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-400 font-bold">Eutrófica (Peso Normal)</td>
                  <td className="p-3 font-mono">18,5 a 24,9</td>
                  <td className="p-3 font-mono font-bold text-white">11,5 a 16,0 kg</td>
                </tr>
                <tr>
                  <td className="p-3 text-amber-400 font-bold">Sobrepeso</td>
                  <td className="p-3 font-mono">25,0 a 29,9</td>
                  <td className="p-3 font-mono font-bold text-white">7,0 a 11,5 kg</td>
                </tr>
                <tr>
                  <td className="p-3 text-rose-400 font-bold">Obesidade (Graus I, II e III)</td>
                  <td className="p-3 font-mono">&ge; 30,0</td>
                  <td className="p-3 font-mono font-bold text-white">5,0 a 9,0 kg</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/80 text-xs text-amber-200 leading-relaxed flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>⚠️ CONTROVÉRSIA — As faixas do IOM foram desenvolvidas para gestação única:</strong> Em gestações gemelares, as metas de ganho de peso são substancialmente mais elevadas (eutrófica: 17 a 25 kg; sobrepeso: 14 a 23 kg; obesidade: 11 a 19 kg) para proteger contra prematuridade e restrição de crescimento.
            </div>
          </div>
        </div>
      </div>

      {/* 6.2 ATIVIDADE FÍSICA & RECRUTAMENTO DE GLUT4 VIA AMPK */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
          <Activity size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            6.2 Atividade Física: Recrutamento de GLUT4 por Via AMPK Independente de Insulina
          </h4>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          A contração da musculatura esquelética durante o exercício aeróbico ativa a <strong>AMPK (proteína quinase ativada por AMP)</strong>, que promove a translocação direta de vesículas com <strong>GLUT4 para a membrana plasmática celular SEM necessitar de estímulo insulínico</strong>. 
        </p>

        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/60 text-xs text-indigo-200 leading-relaxed">
          <strong>Prescrição Prática:</strong> Caminhada leve a moderada de <strong>15 a 20 minutos imediatamente após as principais refeições</strong> (café, almoço e jantar) atua como um potente modulador do pico hiperglicêmico pós-prandial, reduzindo a necessidade de insulina prandial de resgate.
        </div>
      </div>

      {/* 6.3 INSULINOTERAPIA & FARMACOCINÉTICA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-emerald-700/60 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Pill size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              6.3 Insulinas: Primeira Escolha Absoluta (Não Ultrapassa a Placenta ~5,8 kDa)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
            Indicação: &gt; 20-30% fora do alvo em 1-2 semanas
          </span>
        </div>

        {/* Tabela Farmacocinética */}
        <div className="space-y-3">
          <h5 className="text-xs font-black uppercase text-slate-300 tracking-wider">
            Farmacocinética das Insulinas Utilizadas na Gestação
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
              <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Tipo de Insulina</th>
                  <th className="p-3">Início de Ação</th>
                  <th className="p-3">Pico de Ação</th>
                  <th className="p-3">Duração Efetiva</th>
                  <th className="p-3">Indicação Preferencial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
                <tr>
                  <td className="p-3 font-bold text-cyan-400">NPH (Humana Intermediária)</td>
                  <td className="p-3">1 a 2 horas</td>
                  <td className="p-3 font-bold text-amber-400">4 a 8 horas</td>
                  <td className="p-3">12 a 18 horas</td>
                  <td className="p-3">Basal (jejum alterado ou controle diurno de fundo)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-400">Regular (Humana Rápida)</td>
                  <td className="p-3">30 a 60 min</td>
                  <td className="p-3 font-bold text-amber-400">2 a 4 horas</td>
                  <td className="p-3">6 a 8 horas</td>
                  <td className="p-3">Prandial (30 min antes das refeições com pico alterado)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-400">Aspart / Lispro (Análogos Ultrarrápidos)</td>
                  <td className="p-3">10 a 15 min</td>
                  <td className="p-3 font-bold text-amber-400">1 a 2 horas</td>
                  <td className="p-3">3 a 5 horas</td>
                  <td className="p-3">Prandial imediato (menor risco de hipoglicemia tardia)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-400">Detemir (Análogo Basal Longa)</td>
                  <td className="p-3">1 a 2 horas</td>
                  <td className="p-3 text-slate-400">Sem pico pronunciado</td>
                  <td className="p-3">Até 20 a 24 horas</td>
                  <td className="p-3">Basal noturna estável em gestantes com hipoglicemias noturnas c/ NPH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FRONTEIRA — Ordem de aspiração */}
        <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/70 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles size={18} />
            <span className="text-xs font-black uppercase tracking-wider">
              🔬 FRONTEIRA PRÁTICA — Ordem de Aspiração na Mesma Seringa
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Quando for prescrita a combinação de Insulina Regular com Insulina NPH na mesma seringa para aplicação simultânea matinal, <strong>deve-se aspirar SEMPRE a Regular primeiro (límpida) e a NPH por último (turva)</strong>. Essa regra estrita impede que a protamina em excesso presente no frasco de NPH contamine o frasco de insulina Regular, o que modificaria irreversivelmente a velocidade e o pico de ação da insulina rápida nos usos futuros.
          </p>
        </div>

        {/* 6.4 CONTROVÉRSIA METFORMINA & ESTUDO MIG */}
        <div className="p-6 rounded-2xl bg-slate-950 border-2 border-amber-600/70 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              ⚠️ CONTROVÉRSIA — Metformina na Gestação: Eficácia Aguda vs Incerteza de Longo Prazo
            </h4>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            O ensaio clínico <strong>MiG (Metformin in Gestational Diabetes, Rowan et al., NEJM 2008)</strong> comprovou que a metformina é eficaz no controle glicêmico agudo com desfechos perinatais imediatos similares aos da insulina. 
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Entretanto, a metformina é uma molécula pequena (<strong>129 Da</strong>) que <strong>atravessa livremente a placenta</strong>, atingindo concentrações no sangue fetal iguais ou superiores às maternas. Estudos de seguimento pediátrico de longo prazo (<strong>MiG TOFU aos 7 a 9 anos</strong>) demonstraram que crianças expostas à metformina in utero apresentaram <strong>maior adiposidade visceral, maior IMC e tendência à resistência insulínica</strong> por programação metabólica fetal.
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 font-semibold">
            Por esse motivo, as diretrizes SBD e FEBRASGO recomendam a <strong>Insulina como primeira escolha absoluta</strong>, reservando a Metformina apenas para casos de recusa formal à insulina, fobia severa de agulhas ou indisponibilidade de insumos.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CALCULADORA DE DOSE DE INSULINA */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Calculator size={20} />
              <h5 className="text-sm font-black uppercase tracking-wider">
                Calculadora Interativa de Dose Inicial de Insulina (SBD / FEBRASGO)
              </h5>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
              Dose Inicial Padrão: 0,5 UI / kg / dia
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Peso Materno Atual (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-base font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Dose por kg de Peso (UI/kg)
              </label>
              <select
                value={dosePerKg}
                onChange={(e) => setDosePerKg(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="0.3">0,3 UI/kg (Casos leves / Início 1º trimestre)</option>
                <option value="0.5">0,5 UI/kg (Padrão SBD / 2º e 3º trimestre)</option>
                <option value="0.7">0,7 UI/kg (Resistência grave / Obesidade IMC &ge; 35)</option>
                <option value="0.9">0,9 UI/kg (Casos refratários 3º trimestre tardio)</option>
              </select>
            </div>
          </div>

          {/* Resultado dos Cálculos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-800 text-center">
              <span className="text-[11px] text-slate-400 font-bold uppercase block">Dose Diária Total (DDT)</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{totalDailyDose} UI / dia</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-800 space-y-1">
              <span className="text-[11px] text-cyan-400 font-bold uppercase block">Fração Basal (50% NPH = {nphDose} UI)</span>
              <div className="text-xs text-slate-200 font-mono space-y-0.5">
                <div>• Manhã (antes do café): <strong>{nphMorning} UI</strong></div>
                <div>• Ao deitar (22h): <strong>{nphNight} UI</strong></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-purple-800 space-y-1">
              <span className="text-[11px] text-purple-400 font-bold uppercase block">Fração Prandial (50% Rápida = {bolusDose} UI)</span>
              <div className="text-xs text-slate-200 font-mono space-y-0.5">
                <div>• Café da manhã: <strong>{bolusBreakfast} UI</strong></div>
                <div>• Almoço: <strong>{bolusLunch} UI</strong></div>
                <div>• Jantar: <strong>{bolusDinner} UI</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
