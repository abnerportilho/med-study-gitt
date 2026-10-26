import React, { useState } from 'react';
import { 
  Pill, Clock, ShieldCheck, AlertTriangle, 
  CheckCircle2, Info, ArrowRight, Ban, Zap, Syringe, HeartPulse,
  Flame, ShieldAlert, Thermometer
} from 'lucide-react';

export default function TPPCondutaTratamento() {
  const [gestationalAgeCategory, setGestationalAgeCategory] = useState<'early' | 'late'>('early');
  const [selectedTocolytic, setSelectedTocolytic] = useState<'nifedipina' | 'atosibana' | 'indometacina'>('nifedipina');

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <Pill size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Trabalho de Parto Prematuro · Eixo 2
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Conduta Terapêutica Escalonada por Idade Gestacional
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          A pergunta central da tocólise <strong>não é "há contração?", mas sim "ganhar 48 horas vai mudar o desfecho fetal?"</strong>. O objetivo do tratamento tocolítico não é levar a gestação ao termo, mas sim permitir as duas intervenções comprovadamente eficazes: corticoterapia antenatal e transferência materna.
        </p>

        {/* SELETOR DE IDADE GESTACIONAL */}
        <div className="flex gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setGestationalAgeCategory('early')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              gestationalAgeCategory === 'early'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-900/30'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Clock size={16} />
            <span>Conduta Antes de 34 Semanas (24 a 33+6 sem)</span>
          </button>
          <button
            onClick={() => setGestationalAgeCategory('late')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              gestationalAgeCategory === 'late'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-900/30'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Conduta a Partir de 34 Semanas (34 a 36+6 sem)</span>
          </button>
        </div>
      </div>

      {/* O PRINCIPAL DIVISOR DE ÁGUAS: PRESENÇA VS AUSÊNCIA DE INFECÇÃO NO TPP */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/80 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <ShieldAlert size={22} className="text-amber-400 shrink-0" />
            <span>Presença vs. Ausência de Infecção: O Fator Decisivo da Conduta no TPP</span>
          </div>
          <span className="text-[11px] font-mono text-amber-300 font-bold bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-800">
            Regra Central
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          No trabalho de parto prematuro (TPP), <strong>a presença ou ausência de infecção é um dos principais fatores que definem a conduta</strong>. A abordagem divide-se em duas realidades completamente antagônicas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* TPP SEM INFECÇÃO */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} />
              <span>TPP SEM Sinais de Infecção</span>
            </div>
            <div className="space-y-2 text-slate-300 leading-relaxed">
              <p>
                Em gestantes com TPP sem sinais de infecção e com membranas íntegras, <strong>pode-se considerar tocólise por curto período (48 horas)</strong>, desde que não existam contraindicações maternas ou fetais.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <strong className="text-emerald-300 block">Objetivos Primordiais:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Permitir o ciclo completo de <strong>corticoterapia antenatal</strong> para maturação pulmonar fetal.</li>
                  <li>Viabilizar eventual <strong>transferência intrauterina</strong> segura para serviço terciário com suporte de UTI neonatal.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TPP COM SUSPEITA DE CORIOAMNIONITE */}
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-rose-800/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Flame size={18} />
              <span>TPP COM Suspeita de Corioamnionite</span>
            </div>
            <div className="space-y-2 text-slate-300 leading-relaxed">
              <p>
                Quando há suspeita de <strong>corioamnionite (infecção intra-amniótica)</strong>, a lógica muda completamente. A gestação <strong>NÃO deve ser prolongada com tocólise</strong>, porque manter o feto em ambiente infectado aumenta drasticamente o risco de <strong>sepse materna e neonatal grave</strong>.
              </p>
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-1 text-[11px]">
                <strong className="text-rose-200 flex items-center gap-1.5">
                  <Thermometer size={14} />
                  Sinais Clínicos de Alerta:
                </strong>
                <p className="text-slate-300">
                  <strong>Febre materna</strong> associada a achados como: <em>taquicardia materna (&gt; 100 bpm)</em>, <em>taquicardia fetal (&gt; 160 bpm)</em>, <em>dor ou sensibilidade uterina à palpação</em>, <em>secreção vaginal purulenta</em> ou <em>alterações de odor/aspecto do líquido amniótico</em>.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-rose-800/60 space-y-1 text-[11px]">
                <strong className="text-rose-300 block">Conduta Imediata Mandatória:</strong>
                <p className="text-slate-200">
                  <strong>NÃO realizar tocólise</strong> &rarr; iniciar <strong>antibioticoterapia de amplo espectro</strong> imediatamente e <strong>promover a resolução da gestação</strong>.
                </p>
                <p className="text-amber-300 font-semibold pt-1 border-t border-slate-800 mt-1">
                  ★ <strong>Via de Parto (Conceito de Prova):</strong> A via de parto é definida por <strong>critérios puramente obstétricos</strong>. Corioamnionite isoladamente <u>NÃO</u> é indicação de cesariana!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONDUTA ANTES DE 34 SEMANAS */}
      {gestationalAgeCategory === 'early' && (
        <div className="space-y-6">
          {/* OS 4 OBJETIVOS DO TRATAMENTO AGUDO */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
              Os Quatro Objetivos do Tratamento Agudo (&lt; 34 semanas)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-amber-400 font-mono">1</span>
                <p className="font-bold text-white text-sm">Maturar Pulmão Fetal</p>
                <p className="text-slate-400 text-[11px]">Induzir síntese de surfactante e diminuir hemorragia intraventricular e enterocolite.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-amber-400 font-mono">2</span>
                <p className="font-bold text-white text-sm">Ganhar 48 Horas</p>
                <p className="text-slate-400 text-[11px]">Tocólise breve para atingir o pico de eficácia da corticoterapia antenatal.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-amber-400 font-mono">3</span>
                <p className="font-bold text-white text-sm">Neuroproteção (&lt; 32 sem)</p>
                <p className="text-slate-400 text-[11px]">Sulfato de magnésio se parto iminente para prevenir paralisia cerebral fetal.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-amber-400 font-mono">4</span>
                <p className="font-bold text-white text-sm">Viabilizar Transferência</p>
                <p className="text-slate-400 text-[11px]">Remover a gestante <em>in utero</em> para centro terciário com suporte de UTI neonatal.</p>
              </div>
            </div>
          </div>

          {/* 1. CORTICOTERAPIA ANTENATAL */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Syringe size={20} className="text-amber-400" />
                <span>1. Corticoterapia Antenatal (Nível de Evidência A)</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">24 a 34 semanas</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Acelera a diferenciação de <strong>pneumócitos tipo II</strong> e a síntese de surfactante, além de maturar a barreira hematoencefálica e o epitélio intestinal fetal. Reduz mortalidade neonatal, <strong>síndrome do desconforto respiratório (SDR), hemorragia intraventricular (HIV) e enterocolite necrosante (ECN)</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
                <span className="font-bold text-emerald-400 block text-sm">Esquema Betametasona (Padrão)</span>
                <div className="text-base font-mono font-black text-white">12 mg IM a cada 24h</div>
                <p className="text-slate-300">Total de <strong>2 doses</strong> (ciclo único completo em 48 horas).</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
                <span className="font-bold text-emerald-400 block text-sm">Esquema Dexametasona (Alternativa)</span>
                <div className="text-base font-mono font-black text-white">6 mg IM a cada 12h</div>
                <p className="text-slate-300">Total de <strong>4 doses</strong> (ciclo único completo em 48 horas).</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
                <span className="font-bold text-amber-300 block text-sm">Ciclo de Resgate (Repetição)</span>
                <p className="text-slate-300 leading-relaxed">
                  Permitido <strong>apenas 1 ciclo de resgate</strong> se: gestação ainda &lt; 34 semanas, último ciclo há &ge; 7 dias e novo risco iminente de parto em 48h.
                </p>
                <span className="text-[10px] text-rose-300 font-bold block">Nunca repetir rotineiramente!</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <Info size={16} className="text-amber-400 shrink-0" />
              <span>O efeito biológico pleno inicia-se <strong>24 horas após a 1ª dose</strong> e dura aproximadamente <strong>7 dias</strong> — essa é a razão biológica direta do alvo de 48 horas da tocólise!</span>
            </div>
          </div>

          {/* 2. TOCÓLISE */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/70 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Pill size={20} />
                <span>2. Terapia Tocolítica: Fármacos, Doses e Cautelas</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Objetivo: Janela de 48 horas</span>
            </div>

            {/* SELETOR DE FÁRMACO */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTocolytic('nifedipina')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTocolytic === 'nifedipina' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Nifedipina (1ª Linha)
              </button>
              <button
                onClick={() => setSelectedTocolytic('atosibana')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTocolytic === 'atosibana' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Atosibana (1ª Linha)
              </button>
              <button
                onClick={() => setSelectedTocolytic('indometacina')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTocolytic === 'indometacina' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                Indometacina (2ª Linha)
              </button>
            </div>

            {/* DETALHAMENTO DO FÁRMACO */}
            {selectedTocolytic === 'nifedipina' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Nifedipina (Bloqueador de Canais de Cálcio tipo L)</span>
                  <span className="text-emerald-400 font-mono font-bold">1ª Linha no Brasil</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-cyan-300">Posologia:</strong>
                    <p>Dose de ataque: <strong>20 a 30 mg VO</strong>. Se contrações persistirem após 30 min, repetir 10-20 mg.</p>
                    <p>Manutenção: <strong>20 mg VO a cada 4 a 8 horas</strong> por no máximo 48 horas.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-amber-300">Efeitos Adversos & Cautelas:</strong>
                    <p>Hipotensão arterial materna e taquicardia reflexa, cefaleia e rubor facial.</p>
                    <p className="text-rose-300 font-medium"><strong>Potencializa o Sulfato de Magnésio:</strong> risco aumentado de hipotensão severa e bloqueio neuromuscular!</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTocolytic === 'atosibana' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Atosibana (Antagonista Competitivo do Receptor de Ocitocina)</span>
                  <span className="text-emerald-400 font-mono font-bold">1ª Linha / Maior Perfil de Segurança</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-cyan-300">Posologia (Esquema em 3 Fases IV):</strong>
                    <p>1. <em>Bolus:</em> 6,75 mg IV em 1 minuto.</p>
                    <p>2. <em>Ataque:</em> Infusão contínua de 300 mcg/min por 3 horas.</p>
                    <p>3. <em>Manutenção:</em> Infusão de 100 mcg/min até completar 48 horas.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-emerald-300">Vantagens & Limitações:</strong>
                    <p>Mínimos efeitos hemodinâmicos ou cardiovasculares (ideal em cardiopatas e gestantes hipertensas).</p>
                    <p className="text-amber-400">Principal barreira: custo muito elevado e disponibilidade restrita.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTocolytic === 'indometacina' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Indometacina (Inibidor Não-Seletivo da COX / AINE)</span>
                  <span className="text-amber-400 font-mono font-bold">2ª Linha</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-cyan-300">Posologia:</strong>
                    <p>Dose de ataque: <strong>50 a 100 mg VO ou via retal</strong>.</p>
                    <p>Manutenção: <strong>25 mg VO a cada 6 horas</strong> por 48 a 72 horas.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/60 space-y-1">
                    <strong className="text-rose-400">Contraindicações e Riscos Fetais Críticos:</strong>
                    <p>Usar <strong>EXCLUSIVAMENTE até 31-32 semanas</strong> de gestação!</p>
                    <p>Evitar rigorosamente em casos de <strong>oligoâmnio e RCF</strong> (promove fechamento precoce do ducto arterioso fetal, hipertensão pulmonar e reduz perfusão renal com oligúria fetal).</p>
                  </div>
                </div>
              </div>
            )}

            {/* CONTRAINDICAÇÕES FORMAIS À TOCÓLISE */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-xs space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <Ban size={16} />
                <span>Contraindicações Formais à Tocólise (Quando NÃO Usar)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 text-[11px]">
                <div>
                  <strong className="text-rose-200">Maternas:</strong> Corioamnionite clínica, hemorragia vaginal volumosa (DPP ou placenta prévia sangrante), pré-eclâmpsia grave/eclâmpsia, instabilidade hemodinâmica.
                </div>
                <div>
                  <strong className="text-rose-200">Fetais / Obstétricas:</strong> Óbito intrauterino, anomalia fetal incompatível com a vida, comprometimento grave da vitalidade fetal, dilatação cervical muito avançada (&gt; 4-5 cm ou fase ativa expulsa).
                </div>
              </div>
              <div className="text-[11px] text-amber-300 font-semibold pt-1">
                *Nesses cenários a conduta deixa de ser "ganhar tempo" e passa a ser "resolver a causa imediatamente".*
              </div>
            </div>
          </div>

          {/* 3. SULFATO DE MAGNÉSIO (NEUROPROTEÇÃO) */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-purple-900/80 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <HeartPulse size={20} />
                <span>3. Neuroproteção Fetal com Sulfato de Magnésio (MgSO4)</span>
              </div>
              <span className="text-xs font-mono text-purple-300 font-bold">Parto Iminente &lt; 32 Semanas</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Mecanismo: estabilização do fluxo sanguíneo cerebral fetal e bloqueio de neurotransmissão excitatória mediada por glutamato. <strong>Nível de evidência A para redução do risco de Paralisia Cerebral</strong> e disfunção motora grosseira na infância.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-cyan-300 block">Esquema Posológico</span>
                <p className="text-white"><strong>Ataque:</strong> 4 g IV lento em 20 a 30 minutos.</p>
                <p className="text-white"><strong>Manutenção:</strong> 1 g/hora em bomba de infusão contínua até o parto ou por no máximo 24 horas.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-300 block">Vigilância de Toxicidade</span>
                <ul className="space-y-1 text-slate-300">
                  <li><strong>Reflexo patelar presente:</strong> perde-se antes da depressão respiratória (1º sinal de intoxicação!).</li>
                  <li><strong>FR &ge; 12 irpm</strong> (afastar bradipneia).</li>
                  <li><strong>Diurese &ge; 25 mL/h</strong> (excreção renal).</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-1.5">
                <span className="font-bold text-rose-400 block">Antídoto Imediato</span>
                <p className="text-white font-mono font-bold">Gluconato de Cálcio a 10%</p>
                <p className="text-slate-300">1 g (1 ampola de 10 mL) IV lento em 5 a 10 minutos se arreflexia patelar ou depressão respiratória.</p>
                <span className="text-[10px] text-slate-400 block">Contraindicação relativa: Miastenia Gravis.</span>
              </div>
            </div>
          </div>

          {/* 4. ANTIBIÓTICO COM BOLSA ÍNTEGRA: A GRANDE REGRA */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Ban size={16} />
              <span>4. Antibioticoterapia com Bolsa Íntegra — Conceito de Prova e Prática</span>
            </div>
            <p className="leading-relaxed">
              <strong>NÃO existe indicação de antibioticoterapia apenas com o objetivo de prolongar a gestação em mulheres com membranas corioamnióticas íntegras.</strong>
            </p>
            <p className="text-slate-400 text-[11px]">
              A única indicação formal é a <strong>profilaxia intraparto para Estreptococo do Grupo B (EGB / <em>S. agalactiae</em>)</strong> quando a paciente entra em trabalho de parto ativo ou na presença de fatores de risco / urocultura positiva na gestação.
            </p>
          </div>
        </div>
      )}

      {/* CONDUTA A PARTIR DE 34 SEMANAS */}
      {gestationalAgeCategory === 'late' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <ShieldCheck size={20} />
              <span>Conduta a Partir de 34 Semanas (34 a 36 semanas + 6 dias)</span>
            </div>
            <span className="text-xs font-mono text-cyan-300 font-bold">Inversão de Risco-Benefício</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
            <p className="font-bold text-white text-sm">Mudança de Paradigma Clínico:</p>
            <p>
              A lógica se inverte completamente: o risco das complicações graves da prematuridade (morte, hemorragia intraventricular grave) já caiu o suficiente para que <strong>os riscos das intervenções tocolíticas superem o benefício</strong>.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-semibold text-xs">
              "Acima de 34 semanas, a conduta obstétrica deixa de ser 'proteger o feto do parto' para se tornar 'assistir o parto com segurança'."
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 text-sm block">Tocólise & Sulfato de Magnésio</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Tocólise:</strong> NÃO é rotina. Se utilizada, somente de forma breve para transporte materno inter-hospitalar muito rápido.</li>
                <li><strong>Sulfato de Magnésio:</strong> SEM indicação (o corte da neuroproteção encerra-se em 31+6 semanas).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 text-sm block">Corticoterapia & Profilaxia Infecciosa</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Corticoterapia (Trial ALPS):</strong> pode ser considerada entre 34 e 36+6 sem se risco real de parto em 7 dias E paciente sem nenhum ciclo prévio. Atenção: aumenta o risco de hipoglicemia neonatal; decisão individualizada.</li>
                <li><strong>Antibiótico:</strong> exclusivamente profilaxia para EGB se indicada.</li>
                <li><strong>Via de Parto:</strong> deixar o trabalho de parto evoluir por via vaginal; sem restrição a parto instrumentalizado com fórceps/vácuo se necessário.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
