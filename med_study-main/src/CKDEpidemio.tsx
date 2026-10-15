import React from 'react';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Zap, 
  Heart, 
  Search,
  Info, 
  CheckCircle2, 
  BarChart3,
  ShieldAlert,
  ArrowUpRight,
  Stethoscope,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

export default function CKDEpidemio() {
  return (
    <div className="flex flex-col gap-10 pb-20 max-w-5xl mx-auto">
      {/* Header com badge e síntese */}
      <header className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-900/20 via-brand-blue/10 to-transparent border border-line">
        <div className="flex items-center gap-2 text-brand-blue mb-2">
          <span className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
            <Globe size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Epidemiologia & Saúde Pública • KDIGO 2024 / SBN</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
          Doença Renal Crônica: O Impacto Global & Nacional
        </h1>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          A DRC deixou de ser uma complicação isolada para se tornar uma das principais causas mundiais de morbimortalidade cardiovascular e sobrecarga dos sistemas de saúde, com 9 em cada 10 portadores desconhecendo o próprio diagnóstico em fases iniciais.
        </p>
      </header>

      {/* 1. EPIDEMIOLOGIA: O IMPACTO SILENCIOSO */}
      <section id="epidemiology" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <BarChart3 size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy">Magnitude Epidemiológica e Tendências</h2>
              <p className="text-xs text-ink-muted">Estimativas mundiais do Global Burden of Disease e Censo Brasileiro de Diálise da SBN</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-ink-muted">
            GBD & SBN 2023-2024
          </span>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-5 border border-line bg-card rounded-2xl flex flex-col justify-between hover:border-brand-blue/40 transition-all">
            <div className="flex items-center justify-between text-brand-blue mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Prevalência Global</span>
              <Users size={18} />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-navy tracking-tight">~10-13%</p>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Mais de <strong>850 milhões</strong> de pessoas no mundo têm DRC (o dobro de portadores de DM).
              </p>
            </div>
          </div>

          <div className="card p-5 border border-line bg-card rounded-2xl flex flex-col justify-between hover:border-rose-500/40 transition-all">
            <div className="flex items-center justify-between text-rose-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Causa de Morte</span>
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-navy tracking-tight">#5 até 2040</p>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Projetada para ser a <strong>5ª principal causa de anos de vida perdidos</strong> no planeta.
              </p>
            </div>
          </div>

          <div className="card p-5 border border-line bg-card rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-emerald-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">No Brasil (SBN)</span>
              <Activity size={18} />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-navy tracking-tight">&gt; 13 milhões</p>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Brasileiros afetados. &gt;150.000 pacientes mantidos em programa crônico de hemodiálise/DP.
              </p>
            </div>
          </div>

          <div className="card p-5 border border-line bg-card rounded-2xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between text-amber-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Subdiagnóstico</span>
              <ShieldAlert size={18} />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-navy tracking-tight">~90%</p>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Dos indivíduos com DRC nos estágios G1 a G3 não têm ciência da sua condição renal.
              </p>
            </div>
          </div>
        </div>

        {/* Destaque do Fenômeno "Iceberg Renal" */}
        <div className="card p-6 md:p-7 border border-amber-500/30 bg-amber-500/5 rounded-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <AlertTriangle size={28} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-brand-navy">O Fenômeno do Iceberg Renal</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Armadilha Clínica
                </span>
              </div>
              <p className="text-xs md:text-sm text-ink leading-relaxed">
                A perda de função renal progride silenciosamente durante anos. Enquanto a filtração glomerular cai de 100 para 40 mL/min, os pacientes costumam ser completamente <strong>assintomáticos</strong>. Quando os sintomas clássicos de uremia surgem (fadiga incapacitante, anemia pronunciada, prurido, náuseas, edema), o paciente frequentemente já se encontra no estágio <strong>G4 ou G5</strong>, momento em que as intervenções nefroprotetoras têm menor capacidade de reverter o dano.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-card border border-line">
                  <strong className="text-brand-navy block mb-1">Ponto Cego Típico:</strong>
                  Dosar apenas Creatinina sérica sem calcular a <strong>eTFG (CKD-EPI)</strong> e sem solicitar <strong>Albuminúria (RAC)</strong>.
                </div>
                <div className="p-3 rounded-lg bg-card border border-line">
                  <strong className="text-brand-navy block mb-1">Impacto da Intervenção Precoce:</strong>
                  Iniciar iSGLT2 e bloqueio do SRAA em estágios G2-G3a atrasa a necessidade de hemodiálise em <strong>vários anos a décadas</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ETIOLOGIAS PRINCIPAIS: CENÁRIO EPIDEMIOLÓGICO */}
      <section id="risk-factors" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Layers size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Causas Primárias e Fatores Determinantes</h2>
            <p className="text-xs text-ink-muted">Distribuição das causas de Doença Renal Crônica terminal no Brasil e no mundo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Causa 1: Diabetes Mellitus */}
          <div className="card p-6 border border-line bg-card rounded-2xl hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm">1. Diabetes Mellitus (Nefropatia Diabética)</h3>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">35% a 45% dos casos terminais</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Principal causa de TRS no mundo ocidental. A hiperglicemia induz estresse oxidativo, ativação do SRAA intrarrenal, acúmulo de AGEs e hiperfiltração glomerular sustentada com apoptose podocitária.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-ink font-medium">
              <strong>Fator Crítico:</strong> 40% dos diabéticos tipo 2 desenvolvem DRC ao longo da vida; o rastreio deve ser iniciado no diagnóstico do DM2 e após 5 anos no DM1.
            </div>
          </div>

          {/* Causa 2: Hipertensão Arterial Sistêmica */}
          <div className="card p-6 border border-line bg-card rounded-2xl hover:border-brand-blue/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm">2. Hipertensão Arterial (Nefroesclerose)</h3>
                    <span className="text-[10px] font-bold text-brand-blue uppercase">30% a 35% dos casos no Brasil</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Segunda causa mundial e primeira em diversos censos brasileiros de diálise. A perda da autorregulação da arteríola aferente transmite o barotrauma sistêmico diretamente aos capilares glomerulares, gerando hialinose e esclerose focal.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/20 text-[11px] text-ink font-medium">
              <strong>Ciclo Vicioso:</strong> A HAS causa isquemia renal e a nefropatia resultante retém sal/água e hiperativa o SRAA, agravando a hipertensão.
            </div>
          </div>

          {/* Causa 3: Glomerulonefrites */}
          <div className="card p-6 border border-line bg-card rounded-2xl hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm">3. Glomerulopatias Primárias e Secundárias</h3>
                    <span className="text-[10px] font-bold text-purple-600 uppercase">~10% a 15% dos casos</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Destacam-se a <strong>Nefropatia por IgA (Doença de Berger)</strong> como a GN primária mais prevalente do mundo, e a <strong>GESF</strong> como causa frequente em jovens. Entre as secundárias, a <strong>Nefrite Lúpica</strong> exige imunossupressão precoce.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-[11px] text-ink font-medium">
              <strong>Peculiaridade:</strong> Causa primária mais frequente de DRC em adultos jovens sem comorbidades metabólicas prévias.
            </div>
          </div>

          {/* Causa 4: Rins Policísticos e Nefrites Tubulointersticiais */}
          <div className="card p-6 border border-line bg-card rounded-2xl hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm">4. Genéticas, Tubulointersticiais e Obstrutivas</h3>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">~10% a 15% dos casos</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                A <strong>Doença Renal Policística Autossômica Dominante (DRPAD)</strong> responde por ~8-10% dos dialíticos. Soma-se o uso crônico e indiscriminado de <strong>AINEs</strong>, nefropatia por analgésicos, litíase de repetição e uropatias obstrutivas (HPB).
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-[11px] text-ink font-medium">
              <strong>Prevenção Iatrogênica:</strong> Evitar prescrição crônica de AINEs em idosos e doentes com risco renal subclínico.
            </div>
          </div>
        </div>

        {/* Grupos Prioritários para Rastreio Ativo */}
        <div className="card p-6 border border-line bg-card rounded-2xl">
          <h3 className="text-base font-bold text-brand-navy mb-4 flex items-center gap-2">
            <Stethoscope size={18} className="text-brand-blue" />
            Populações com Indicação Obrigatória de Rastreio Periódico (KDIGO)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Diabéticos tipo 1 e 2", detail: "Rastreio anual com Creatinina e RAC" },
              { title: "Hipertensos", detail: "Obrigatório no diagnóstico e seguimento anual" },
              { title: "Idosos (≥ 60 anos)", detail: "Queda fisiológica da TFG acelerada por comorbidades" },
              { title: "Histórico Familiar de DRC", detail: "Parentes de 1º grau de dialíticos ou transplantados" },
              { title: "Doença Cardiovascular Prévia", detail: "DAC, AVC, DAOP ou Insuficiência Cardíaca" },
              { title: "Uso de Nefrotóxicos Crônicos", detail: "AINEs, Lítio, Inibidores de Calcineurina, Quimioterapia" },
              { title: "Episódio Prévio de LRA", detail: "Pacientes que tiveram Injúria Renal Aguda mantêm risco" },
              { title: "Obesidade (IMC ≥ 30)", detail: "Gera hiperfiltração glomerular e glomerulopatia da obesidade" },
              { title: "Doenças Autoimunes / Císticas", detail: "Lúpus (LES), vasculites e histórico familiar de cistos" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-line bg-bg hover:border-brand-blue/30 transition-all">
                <CheckCircle2 className="text-brand-blue shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="text-xs font-bold text-brand-navy">{item.title}</h4>
                  <p className="text-[11px] text-ink-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. A CONEXÃO CARDIO-RENAL-METABÓLICA */}
      <section id="cardio-renal" className="space-y-6">
        <div className="card p-7 md:p-8 border border-brand-blue/30 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 text-white rounded-3xl relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Heart size={160} />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <Heart size={20} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Eixo Cardio-Renal-Metabólico</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">
              O Paciente com DRC Morre do Coração Antes de Chegar à Diálise
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              O principal desfecho clínico do portador de Doença Renal Crônica não é a perda dialítica do rim, mas sim o <strong>evento cardiovascular fatal (Infarto Agudo do Miocárdio, Morte Súbita e Insuficiência Cardíaca)</strong>. A mortalidade cardiovascular em pacientes em diálise é 10 a 30 vezes maior que na população geral pareada por idade.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xs font-black text-rose-400 uppercase tracking-wider mb-1">Sobrecarga de Pressão e Volume</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Retenção de sódio e água + ativação do SRAA geram hipertrofia ventricular esquerda (HVE) precoce e fibrose miocárdica.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Calcificação Vascular Media</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hiperfosfatemia e aumento do FGF-23 induzem diferenciação osteogênica das células musculares lisas da artéria (rigidez arterial).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-1">Toxinas e Inflamação</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Toxinas urêmicas ligadas a proteínas (indoxil sulfato) causam disfunção endotelial, estresse oxidativo e aterosclerose acelerada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pérola Clínica Final */}
      <div className="p-5 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-start gap-4">
        <Info className="text-brand-blue shrink-0 mt-0.5" size={22} />
        <div className="text-xs text-brand-navy leading-relaxed">
          <strong className="font-bold text-sm block mb-1">Diretriz Prática para Prova e Consultório:</strong>
          Nunca classifique o risco cardiovascular de um paciente sem checar a função renal. A presença de <strong>eTFG &lt; 60</strong> ou <strong>RAC &gt; 30 mg/g</strong> classifica automaticamente o indivíduo em <strong>Alto ou Muito Alto Risco Cardiovascular</strong>, exigindo metas de LDL e pressão arterial substancialmente mais agressivas.
        </div>
      </div>
    </div>
  );
}

