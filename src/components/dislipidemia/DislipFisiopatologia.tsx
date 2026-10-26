import React, { useState } from 'react';
import { 
  Dna, 
  Activity, 
  Flame, 
  Layers, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  HelpCircle,
  Zap,
  Microscope,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function DislipFisiopatologia() {
  const [selectedPathway, setSelectedPathway] = useState<'exogena' | 'endogena' | 'reverso' | 'pancreatite'>('exogena');

  return (
    <div className="flex flex-col gap-8">
      {/* Header do Módulo */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-blue-900/10 via-card to-card border-brand-blue/20">
        <div className="flex items-center gap-2 text-brand-blue text-xs font-bold uppercase tracking-widest mb-2">
          <Microscope size={16} />
          <span>Fisiopatologia & Metabolismo Lipoproteico</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Metabolismo das Lipoproteínas e Vias Aterogênicas
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          O colesterol e os triglicerídeos são lipídios hidrofóbicos insolúveis no plasma, necessitando de veículos lipoproteicos compostos por um cerne apolar (ésteres de colesterol e triglicerídeos) envolto por uma monocamada anfipática de fosfolipídios, colesterol livre e <strong>apolipoproteínas</strong> funcionais.
        </p>

        {/* Resumo das 4 Lipoproteínas Chave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-line">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Origem Intestinal</span>
            <h4 className="font-bold text-brand-navy text-base mt-0.5">Quilomícrons</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">90% Triglicerídeos da dieta. Contêm <strong>ApoB-48</strong> e ativam a Lipoproteína Lipase (LPL).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">Origem Hepática</span>
            <h4 className="font-bold text-brand-navy text-base mt-0.5">VLDL / IDL</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">60% Triglicerídeos endógenos. Contêm <strong>ApoB-100</strong> e originam as partículas de LDL.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Principal Aterogênica</span>
            <h4 className="font-bold text-brand-navy text-base mt-0.5">LDL</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">50% Colesterol. Uma única molécula de <strong>ApoB-100</strong>. Penetra e retém no subendotélio.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Ateroprotetora</span>
            <h4 className="font-bold text-brand-navy text-base mt-0.5">HDL</h4>
            <p className="text-[11px] text-ink-muted mt-1 leading-snug">Rica em fosfolipídios e <strong>ApoA-I</strong>. Realiza o transporte reverso do colesterol periférico ao fígado.</p>
          </div>
        </div>
      </div>

      {/* Navegação Interativa das Vias */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-2">
        <button
          onClick={() => setSelectedPathway('exogena')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
            selectedPathway === 'exogena'
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-card border border-line text-ink-muted hover:text-brand-navy"
          )}
        >
          <Layers size={16} />
          <span>1. Via Exógena (Quilomícrons & LPL)</span>
        </button>
        <button
          onClick={() => setSelectedPathway('endogena')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
            selectedPathway === 'endogena'
              ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
              : "bg-card border border-line text-ink-muted hover:text-brand-navy"
          )}
        >
          <Dna size={16} />
          <span>2. Via Endógena & Aterogênese (VLDL $\rightarrow$ LDL)</span>
        </button>
        <button
          onClick={() => setSelectedPathway('reverso')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
            selectedPathway === 'reverso'
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-card border border-line text-ink-muted hover:text-brand-navy"
          )}
        >
          <Sparkles size={16} />
          <span>3. Transporte Reverso de Colesterol (HDL)</span>
        </button>
        <button
          onClick={() => setSelectedPathway('pancreatite')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
            selectedPathway === 'pancreatite'
              ? "bg-red-600 text-white shadow-md shadow-red-600/20"
              : "bg-card border border-line text-ink-muted hover:text-brand-navy"
          )}
        >
          <Flame size={16} />
          <span>4. Fisiopatologia da Pancreatite por TG</span>
        </button>
      </div>

      {/* Conteúdo Detalhado por Via */}
      {selectedPathway === 'exogena' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
              <Layers size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Absorção Intestinal & Hidrólise</span>
              <h3 className="text-xl font-bold text-brand-navy">A Via Exógena do Metabolismo Lipídico</h3>
            </div>
          </div>

          <p className="text-ink-muted text-sm leading-relaxed">
            Responsável pelo processamento e transporte das gorduras ingeridas na dieta alimentar. Os triglicerídeos da dieta são hidrolisados pelas lipases no lúmen intestinal, absorvidos pelos enterócitos via carreadores de colesterol como o <strong>NPC1L1</strong> (alvo farmacológico da <em>ezetimiba</em>) e reesterificados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-card border border-line">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-xs">1</span>
                Síntese do Quilomícron
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Nos enterócitos, os lipídios são associados à apolipoproteína truncada <strong>ApoB-48</strong> (específica do intestino). Os quilomícrons nascentes são secretados na linfa mesentérica e caem na circulação sistêmica via ducto torácico, sem passar imediatamente pelo fígado.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-xs">2</span>
                Ação da LPL & ApoC-II
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                No endotélio capilar dos tecidos adiposo e muscular, a <strong>Lipoproteína Lipase (LPL)</strong>, ativada pela <strong>ApoC-II</strong> (doada pela HDL), hidrolisa os triglicerídeos em ácidos graxos livres (FFA) para geração de energia ou armazenamento.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-xs">3</span>
                Remanescentes de Quilomícron
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Após perder até 90% dos seus triglicerídeos, sobra o remanescente de quilomícron, rico em ésteres de colesterol e <strong>ApoE</strong>, que é rapidamente captado e degradado pelos hepatócitos via receptores LRP e LDLR.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <AlertTriangle className="shrink-0 mt-0.5 text-amber-600" size={18} />
            <div>
              <strong>Ponto Prático de Alta Relevância:</strong> Pacientes com mutações genéticas inativadoras na LPL ou na ApoC-II não conseguem clarear quilomícrons (<em>Síndrome de Quilomicronemia Familiar / Fredrickson Tipo I</em>). Apresentam soro leitoso em repouso e triglicerídeos comumente acima de <strong>1.500 – 3.000 mg/dL</strong>, com crises recorrentes de pancreatite aguda desde a infância.
            </div>
          </div>
        </div>
      )}

      {selectedPathway === 'endogena' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600">
              <Dna size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Síntese Hepática & Aterogênese</span>
              <h3 className="text-xl font-bold text-brand-navy">A Via Endógena e a Cascata da Placa Aterosclerótica</h3>
            </div>
          </div>

          <p className="text-ink-muted text-sm leading-relaxed">
            O fígado sintetiza e secreta partículas de <strong>VLDL</strong> contendo <strong>ApoB-100</strong> completa. Sob ação contínua da LPL capilar, o VLDL perde triglicerídeos tornando-se <strong>IDL</strong> (densidade intermediária) e subsequentemente <strong>LDL</strong> (lipoproteína de baixa densidade).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <h4 className="font-bold text-brand-navy text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-rose-500" />
                O Ciclo do Receptor de LDL (LDLR) e a PCSK9
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Aproximadamente 70% da depuração plasmática de LDL ocorre no fígado pelo <strong>LDLR</strong>, que reconhece a ApoB-100.
              </p>
              <ul className="text-xs text-ink-muted space-y-1.5 list-disc pl-4">
                <li>O complexo LDL-LDLR é internalizado por endocitose. O LDL vai ao lisossomo para degradação e o <strong>LDLR é reciclado</strong> à superfície celular até 100 vezes.</li>
                <li>A enzima <strong>PCSK9</strong> se liga ao receptor de LDL na membrana e o direciona para degradação lisossômica, impedindo sua reciclagem.</li>
                <li><em>Alvo terapêutico:</em> Os inibidores de PCSK9 (Evolocumabe, Alirocumabe) impedem a destruição do LDLR, multiplicando os receptores na membrana hepática e reduzindo o LDL-c em até 60%.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line">
              <h4 className="font-bold text-brand-navy text-sm mb-2 flex items-center gap-2">
                <Flame size={16} className="text-rose-500" />
                Retenção Subendotelial & Células Espumosas (Foam Cells)
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Quanto maior a concentração de partículas contendo ApoB, maior a probabilidade de penetração pela monocamada endotelial arterial.
              </p>
              <ul className="text-xs text-ink-muted space-y-1.5 list-disc pl-4">
                <li>No espaço subendotelial, a LDL fica presa a proteoglicanos da matriz extracelular e sofre <strong>oxidação (ox-LDL)</strong>.</li>
                <li>Monócitos atraídos se diferenciam em macrófagos, que fagocitam avidamente a ox-LDL via receptores <em>scavenger</em> desprovidos de feedback negativo.</li>
                <li>A sobrecarga lipídica converte macrófagos em <strong>células espumosas</strong> (estrias lipídicas), cuja apoptose forma o núcleo necrótico lipídico da placa aterosclerótica.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-brand-navy leading-relaxed">
            <strong>Conceito Fundamental de Apolipoproteína B (ApoB):</strong> Cada partícula aterogênica (VLDL, IDL, LDL e Lp(a)) contém exatamente <strong>1 molécula de ApoB-100</strong>. Portanto, a dosagem de ApoB quantifica o número absoluto de partículas aterogênicas circulantes, sendo biologicamente superior ao LDL-c (que mede apenas a massa de colesterol carregada).
          </div>
        </div>
      )}

      {selectedPathway === 'reverso' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Proteção Endotelial & Efluxo de Colesterol</span>
              <h3 className="text-xl font-bold text-brand-navy">Transporte Reverso de Colesterol pela HDL</h3>
            </div>
          </div>

          <p className="text-ink-muted text-sm leading-relaxed">
            O <strong>Transporte Reverso de Colesterol (TRC)</strong> é a via pela qual o colesterol em excesso nos tecidos periféricos (especialmente nos macrófagos da parede vascular) é transportado de volta ao fígado para excreção biliar direta ou conversão em ácidos biliares.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-card border border-line">
              <div className="font-bold text-brand-navy text-sm mb-1.5 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600"><CheckCircle2 size={14} /></span>
                1. Efluxo via ABCA1 / ABCG1
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                A <strong>ApoA-I</strong> nascente pobre em lipídios liga-se aos transportadores <strong>ABCA1</strong> nos macrófagos, captando colesterol livre e fosfolipídios e gerando a pré-beta HDL discoide.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line">
              <div className="font-bold text-brand-navy text-sm mb-1.5 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600"><CheckCircle2 size={14} /></span>
                2. Esterificação pela LCAT
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                A enzima <strong>LCAT</strong> (lecitina-colesterol aciltransferase) esterifica o colesterol livre na superfície da partícula, movendo-o para o cerne hidrofóbico e transformando a HDL em sua forma esférica madura (HDL3 e HDL2).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line">
              <div className="font-bold text-brand-navy text-sm mb-1.5 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600"><CheckCircle2 size={14} /></span>
                3. Captação Hepática via SR-B1
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                No fígado, o receptor <strong>SR-B1</strong> capta seletivamente os ésteres de colesterol da HDL sem degradar a partícula. Alternativamente, a proteína <strong>CETP</strong> transfere colesterol da HDL para VLDL/LDL em troca de triglicerídeos.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-line text-xs text-ink-muted leading-relaxed">
            <strong className="text-brand-navy block mb-1">Por que aumentar farmacologicamente o HDL-c não reduziu desfechos clínicos?</strong>
            Grandes ensaios clínicos (como os inibidores de CETP: torcetrapib, dalcetrapib) elevaram dramaticamente o HDL-c numérico no sangue sem reduzir infartos ou mortes. A ciência moderna comprovou que a <strong>qualidade funcional da partícula HDL</strong> (capacidade de efluxo de colesterol e ação antioxidante) é crucial, e não apenas sua concentração estática sérica.
          </div>
        </div>
      )}

      {selectedPathway === 'pancreatite' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-600/10 text-red-600">
              <Flame size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Emergência Metabólica</span>
              <h3 className="text-xl font-bold text-brand-navy">Fisiopatologia da Pancreatite por Hipertrigliceridemia</h3>
            </div>
          </div>

          <p className="text-ink-muted text-sm leading-relaxed">
            A hipertrigliceridemia é a <strong>3ª causa mais frequente de pancreatite aguda</strong> (atrás apenas de cálculos biliares e álcool), sendo responsável por até 10% de todos os episódios e associada a maior taxa de complicações locais (necrose, coleções) e falência orgânica.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h4 className="font-bold text-brand-navy text-sm mb-2 flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-500" />
                1. Saturação da LPL & Quilomicronemia Extrema
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Quando os níveis de triglicerídeos ultrapassam <strong>500 a 1.000 mg/dL</strong>, a capacidade depuradora da LPL satura por completo. Quilomícrons gigantes circulam em concentrações astronômicas, elevando a viscosidade sanguínea na microcirculação capilar do leito pancreático.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h4 className="font-bold text-brand-navy text-sm mb-2 flex items-center gap-2">
                <Flame size={16} className="text-red-500" />
                2. Lipólise Pancreática & Ácidos Graxos Livres Tóxicos
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Ao passarem pelos capilares pancreáticos, esses quilomícrons entram em contato com a <strong>lipase pancreática</strong> extravasada, sofrendo lipólise rápida. Isso gera uma concentração cavalar de <strong>ácidos graxos livres (FFA)</strong> não esterificados, que superam a capacidade ligadora da albumina plasmática.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h4 className="font-bold text-brand-navy text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-red-500" />
                3. Lesão Endotelial, Isquemia & Ativação de Tripsina
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Os FFA livres exercem efeito detergente direto sobre as membranas das células acinares e endoteliais pancreáticas, gerando trombose microvascular, edema, isquemia focal e acidose local. Esse ambiente ácido ativa o tripsinogênio precocemente em tripsina, deflagrando autodigestão pancreática necrotizante.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h4 className="font-bold text-brand-navy text-sm mb-2 flex items-center gap-2">
                <Activity size={16} className="text-red-500" />
                4. O Racional Terapêutico da Insulina Intravenosa
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                A <strong>insulina é o ativador mais potente da Lipoproteína Lipase (LPL)</strong> no organismo humano. A infusão contínua de insulina regular intravenosa acelera o clareamento dos quilomícrons circulantes, reduzindo os triglicerídeos para níveis seguros (&lt; 500 mg/dL) habitualmente em 24 a 48 horas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm text-rose-900 dark:text-rose-200">
            <strong>Limiar de Risco Clínico:</strong> O risco de pancreatite torna-se clinicamente relevante a partir de <strong>TG &ge; 500 mg/dL</strong>, mas aumenta exponencialmente com <strong>TG &ge; 1.000 mg/dL</strong>. Em pacientes admitidos com abdome agudo, a lipemia marcante no tubo de sangue pode interferir na dosagem automatizada de amilase (falsa normoamilasemia por interferência espectrofotométrica).
          </div>
        </div>
      )}
    </div>
  );
}
