import React, { useState } from 'react';
import { 
  Pill, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Heart, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function DislipTratamentoColesterol() {
  const [selectedSubTab, setSelectedSubTab] = useState<'estatinas' | 'ezetimiba' | 'pcsk9' | 'sams' | 'algoritmo'>('estatinas');

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-rose-950/20 via-card to-card border-rose-500/20">
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest mb-2">
          <Pill size={16} />
          <span>Farmacoterapia Hipolipemiante do Colesterol</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Manejo Terapêutico da Hipercolesterolemia
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          O pilar central da prevenção aterosclerótica baseia-se no princípio universal: <strong>"Quanto mais baixo o LDL-c, e por quanto mais tempo, melhor"</strong> (<em>The Lower, The Longer, The Better</em>). O tratamento escalona-se de acordo com a potência necessária para atingir a meta individualizada.
        </p>

        {/* Sub-abas */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-line">
          <button
            onClick={() => setSelectedSubTab('estatinas')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              selectedSubTab === 'estatinas'
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Pill size={16} />
            <span>Estatinas (Potências & Doses)</span>
          </button>
          <button
            onClick={() => setSelectedSubTab('ezetimiba')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              selectedSubTab === 'ezetimiba'
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <ShieldCheck size={16} />
            <span>Ezetimiba & Terapia Combinada</span>
          </button>
          <button
            onClick={() => setSelectedSubTab('pcsk9')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              selectedSubTab === 'pcsk9'
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Sparkles size={16} />
            <span>Inibidores de PCSK9 & Bempedoico</span>
          </button>
          <button
            onClick={() => setSelectedSubTab('sams')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              selectedSubTab === 'sams'
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <AlertTriangle size={16} />
            <span>Manejo de Sintomas Musculares (SAMS)</span>
          </button>
          <button
            onClick={() => setSelectedSubTab('algoritmo')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              selectedSubTab === 'algoritmo'
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Activity size={16} />
            <span>Algoritmo Prático de Escalonamento</span>
          </button>
        </div>
      </div>

      {/* ABA 1: ESTATINAS */}
      {selectedSubTab === 'estatinas' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-brand-navy">Classificação das Estatinas por Potência de Redução de LDL-c</h3>
            <p className="text-xs text-ink-muted mt-1">
              Inibidores da HMG-CoA redutase. Aumentam os receptores hepáticos de LDLR e diminuem a síntese de VLDL. Possuem efeitos pleiotrópicos de estabilização de placas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Alta Potência */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-500/20 px-2 py-0.5 rounded">Queda &ge; 50%</span>
                <span className="text-xs font-bold text-rose-600">1ª Linha em Alto/Mto Alto</span>
              </div>
              <h4 className="font-bold text-brand-navy text-base">Alta Potência</h4>
              <p className="text-xs text-ink-muted">Indicadas para <strong>Muito Alto Risco</strong> e <strong>Alto Risco</strong>:</p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Atorvastatina</div>
                  <div className="text-rose-600 font-bold">40 mg a 80 mg / dia</div>
                  <div className="text-[10px] text-ink-muted">Tomada em qualquer horário (meia-vida longa de 14h)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Rosuvastatina</div>
                  <div className="text-rose-600 font-bold">20 mg a 40 mg / dia</div>
                  <div className="text-[10px] text-ink-muted">Hidrofílica, menor interação com CYP3A4</div>
                </div>
              </div>
            </div>

            {/* Moderada Potência */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-500/20 px-2 py-0.5 rounded">Queda 30% a 49%</span>
                <span className="text-xs font-bold text-amber-600">Risco Intermediário</span>
              </div>
              <h4 className="font-bold text-brand-navy text-base">Moderada Potência</h4>
              <p className="text-xs text-ink-muted">Indicadas para <strong>Risco Intermediário</strong> ou pacientes idosos frágeis:</p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Atorvastatina</div>
                  <div className="text-amber-600 font-bold">10 mg a 20 mg / dia</div>
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Rosuvastatina</div>
                  <div className="text-amber-600 font-bold">5 mg a 10 mg / dia</div>
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Sinvastatina</div>
                  <div className="text-amber-600 font-bold">20 mg a 40 mg / dia (à noite)</div>
                  <div className="text-[10px] text-ink-muted">Meia-vida curta (2-3h) — tomar à noite</div>
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Pravastatina</div>
                  <div className="text-amber-600 font-bold">40 mg / dia</div>
                </div>
              </div>
            </div>

            {/* Baixa Potência */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Queda &lt; 30%</span>
                <span className="text-xs text-ink-muted">Uso Restrito</span>
              </div>
              <h4 className="font-bold text-brand-navy text-base">Baixa Potência</h4>
              <p className="text-xs text-ink-muted">Reservada para intolerâncias parciais em desescalonamento:</p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Sinvastatina</div>
                  <div className="text-brand-navy font-bold">10 mg / dia</div>
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line">
                  <div className="font-bold text-brand-navy">Pravastatina</div>
                  <div className="text-brand-navy font-bold">10 mg a 20 mg / dia</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-200 text-[11px] leading-relaxed">
                <strong>Alerta Sinvastatina 80 mg:</strong> Contraindicada formalmente pela FDA e ANVISA devido a risco inaceitável de miopatia e rabdomiólise. A dose máxima de sinvastatina é 40 mg/dia.
              </div>
            </div>
          </div>

          {/* Regra dos 6% */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-brand-navy leading-relaxed flex items-start gap-3">
            <Zap className="shrink-0 mt-0.5 text-blue-600" size={18} />
            <div>
              <strong>Regra dos 6% de Roberts:</strong> A maior parte da redução do LDL ocorre com a dose inicial da estatina. Cada duplicação subsequente da dose de qualquer estatina (ex: Atorvastatina 10mg para 20mg, ou 20mg para 40mg) proporciona apenas <strong>cerca de 6% adicionais de redução no LDL-c</strong>, enquanto dobra o risco potencial de efeitos adversos. Por essa razão, a <strong>associação com Ezetimiba</strong> (+15% a 20%) é muito mais eficaz e tolerável do que forçar doses extremas.
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: EZETIMIBA */}
      {selectedSubTab === 'ezetimiba' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Segunda Linha de Escolha</span>
              <h3 className="text-xl font-bold text-brand-navy">Ezetimiba (10 mg/dia)</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-xs text-ink-muted leading-relaxed">
              <h4 className="font-bold text-brand-navy text-sm">Mecanismo & Eficácia Clínica:</h4>
              <p>
                Inibe seletivamente o transportador de esterol <strong>NPC1L1 (Niemann-Pick C1-Like 1)</strong> presente na borda em escova do epitélio intestinal. Bloqueia a absorção tanto do colesterol alimentar quanto do colesterol biliar reabsorvido na circulação entero-hepática.
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Proporciona <strong>redução adicional de 15% a 20% no LDL-c</strong> quando associada a uma estatina.</li>
                <li>Dose única diária fixa de <strong>10 mg/dia</strong>, com ou sem alimentos.</li>
                <li>Excelente perfil de tolerabilidade clínica, virtualmente sem toxicidade muscular.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line space-y-3">
              <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                <Heart size={16} className="text-rose-500" />
                Evidência Científica — Estudo IMPROVE-IT
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                O ensaio clínico randomizado <strong>IMPROVE-IT (NEJM)</strong> incluiu 18.144 pacientes após Síndrome Coronariana Aguda.
              </p>
              <div className="p-3 rounded-xl bg-card border border-line text-xs space-y-1">
                <div>&bull; Braço Sinvastatina 40 mg: LDL médio 69 mg/dL</div>
                <div>&bull; Braço Sinvastatina 40 mg + <strong>Ezetimiba 10 mg</strong>: LDL médio 53 mg/dL</div>
                <div className="text-emerald-600 font-bold mt-1">&rarr; Redução significativa de 6,4% no desfecho cardiovascular composto (MACE: morte CV, IAM, AVC).</div>
              </div>
              <p className="text-[11px] text-ink-muted">
                Provou definitivamente que a redução do LDL-c por vias não dependentes de estatina também confere proteção cardiovascular real proporcional.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: PCSK9 & BEMPEDOICO */}
      {selectedSubTab === 'pcsk9' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Inovações Terapêuticas</span>
            <h3 className="text-xl font-bold text-brand-navy">Inibidores de PCSK9, siRNA & Ácido Bempedoico</h3>
            <p className="text-xs text-ink-muted mt-1">Armas de alta potência biológica para pacientes refratários ou com intolerância severa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Anticorpos Monoclonais Anti-PCSK9 */}
            <div className="p-4 rounded-2xl bg-card border border-line space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded">Anticorpos Injetáveis</span>
              <h4 className="font-bold text-brand-navy text-sm">Evolocumabe & Alirocumabe</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Anticorpos monoclonais totalmente humanos que neutralizam a PCSK9 circulante.
              </p>
              <div className="text-xs text-ink-muted space-y-1.5 pt-1">
                <div><strong>Evolocumabe (Repatha):</strong> 140 mg SC a cada 2 semanas ou 420 mg SC 1x/mês. (Estudo FOURIER: queda de 59% no LDL).</div>
                <div><strong>Alirocumabe (Praluent):</strong> 75 mg a 150 mg SC a cada 2 semanas. (Estudo ODYSSEY OUTCOMES).</div>
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10 text-[11px] text-purple-800 dark:text-purple-200 font-semibold">
                Redução adicional de 50% a 60% no LDL-c mesmo em pacientes já usando dose máxima de estatina + ezetimiba.
              </div>
            </div>

            {/* Inclisiran (siRNA) */}
            <div className="p-4 rounded-2xl bg-card border border-line space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">Silenciamento Gênico</span>
              <h4 className="font-bold text-brand-navy text-sm">Inclisiran (Leqvio)</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Pequeno RNA de interferência (siRNA) conjugado a GalNAc que entra nos hepatócitos e degrada especificamente o mRNA da PCSK9.
              </p>
              <div className="text-xs text-ink-muted space-y-1.5 pt-1">
                <div><strong>Posologia semestral:</strong> Dose inicial de 300 mg SC, repetida aos 3 meses e depois <strong>a cada 6 meses</strong>.</div>
                <div><strong>Eficácia:</strong> Redução sustentada de ~50% no LDL-c ao longo de todo o ano.</div>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/10 text-[11px] text-blue-800 dark:text-blue-200 font-semibold">
                Excelente para pacientes com problemas graves de adesão posológica diária.
              </div>
            </div>

            {/* Ácido Bempedoico */}
            <div className="p-4 rounded-2xl bg-card border border-line space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Oral sem Miotoxicidade</span>
              <h4 className="font-bold text-brand-navy text-sm">Ácido Bempedoico (Nexletol)</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Inibidor da ATP-citrato liase (ACL), agindo na mesma via da estatina, mas duas etapas acima da HMG-CoA redutase.
              </p>
              <div className="text-xs text-ink-muted space-y-1.5 pt-1">
                <div><strong>Dose:</strong> 180 mg VO 1x/dia.</div>
                <div><strong>Grande vantagem:</strong> É um pró-fármaco ativado apenas no fígado pela ACSVL1, enzima <em>ausente no músculo</em>. Não causa mialgia!</div>
                <div><strong>Estudo CLEAR Outcomes:</strong> Reduz MACE em intolerantes a estatina.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 4: SAMS (SINTOMAS MUSCULARES) */}
      {selectedSubTab === 'sams' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Segurança & Condução Prática</span>
              <h3 className="text-xl font-bold text-brand-navy">Sintomas Musculares Associados a Estatinas (SAMS)</h3>
            </div>
          </div>

          {/* O Efeito Nocebo */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-brand-navy leading-relaxed">
            <strong>O Efeito Nocebo (Estudo SAMSON / Statin WISE):</strong> Mais de 90% dos sintomas musculares que os pacientes atribuem à estatina são causados pelo efeito nocebo (expectativa negativa decorrente de bulas, internet ou mídia). Em estudos duplo-cegos com placebo, as queixas musculares foram idênticas entre estatina e placebo. A verdadeira intolerância farmacológica a estatinas afeta <strong>menos de 5% a 7%</strong> dos usuários.
          </div>

          {/* Espectro Clínico */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Forma Mais Comum</span>
              <h4 className="font-bold text-brand-navy text-sm">1. Mialgia Isolada</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Dor muscular difusa, fraqueza, cansaço ou rigidez, simétrica, acometendo grandes grupos proximais (coxas, glúteos, ombros), <strong>com CPK normal</strong>.
              </p>
              <div className="text-[11px] text-ink-muted bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                &rarr; Conduta: Reavaliar após 2 semanas de interrupção temporária. Trocar molécula ou reduzir dose.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Moderada Gravidade</span>
              <h4 className="font-bold text-brand-navy text-sm">2. Miosite</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Dor e fraqueza muscular acompanhada de <strong>CPK elevada entre 4x e 10x o Limite Superior da Normalidade (LSN)</strong>.
              </p>
              <div className="text-[11px] text-ink-muted bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                &rarr; Conduta: Suspender estatina imediatamente. Monitorar CPK até normalização. Não reintroduzir a mesma dose.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Emergência Rara (&lt; 1 / 100.000)</span>
              <h4 className="font-bold text-brand-navy text-sm">3. Rabdomiólise</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Necrose muscular aguda maciça com <strong>CPK &gt; 10x a 40x LSN</strong>, mioglobinúria (urina escura cor de coca-cola) e Lesão Renal Aguda (LRA).
              </p>
              <div className="text-[11px] text-red-600 bg-red-500/10 p-2 rounded-lg font-bold">
                &rarr; Conduta: Internação hospitalar, hidratação venosa vigorosa e suspensão definitiva de estatinas.
              </div>
            </div>
          </div>

          {/* Estratégias Práticas de Manejo */}
          <div className="p-4 rounded-2xl bg-card border border-line space-y-3">
            <h4 className="font-bold text-brand-navy text-sm">Estratégias para Manter o Paciente Protegido:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-muted">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <strong>1. Washout & Confirmação:</strong> Suspenda a estatina por 2 a 4 semanas. Se os sintomas melhorarem, reintroduza a mesma estatina em menor dose para confirmar se a dor era de fato medicamentosa.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <strong>2. Troca de Lipofílica por Hidrofílica:</strong> Troque Sinvastatina ou Atorvastatina (lipofílicas, penetram mais facilmente nos miócitos) por <strong>Rosuvastatina ou Pravastatina</strong> (hidrofílicas, hepatoespecíficas).
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <strong>3. Posologia em Dias Alternados:</strong> A Rosuvastatina tem meia-vida longa (~19h). Prescrever 5 mg a 10 mg <strong>2 a 3 vezes por semana</strong> reduz LDL em até 30-38% sem desencadear dores musculares.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <strong>4. Associação Ezetimiba / Bempedoico:</strong> Se tolerar apenas dose baixa de estatina, associe Ezetimiba 10 mg/dia ou Ácido Bempedoico 180 mg/dia para alcançar a meta sem mialgias.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 5: ALGORITMO PRÁTICO */}
      {selectedSubTab === 'algoritmo' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-brand-navy">Algoritmo de Escalonamento Terapêutico (SBC / ESC)</h3>
            <p className="text-xs text-ink-muted mt-1">Passo a passo padronizado para atingir a meta estrita de LDL-c.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-line">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">1</div>
              <div>
                <h4 className="font-bold text-brand-navy text-sm">Passo 1: Estatina em Dose Adequada ao Risco</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Para Muito Alto e Alto Risco: Iniciar <strong>Estatina de Alta Potência</strong> (Atorvastatina 40-80 mg ou Rosuvastatina 20-40 mg). Para Risco Intermediário: Estatina de Moderada Potência. Repetir perfil lipídico em <strong>4 a 6 semanas</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-line">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">2</div>
              <div>
                <h4 className="font-bold text-brand-navy text-sm">Passo 2: Meta não atingida &rarr; Adicionar Ezetimiba</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Se o LDL-c persistir acima da meta (&ge; 50 em muito alto ou &ge; 70 em alto risco), manter a estatina e associar imediatamente <strong>Ezetimiba 10 mg/dia</strong> (+15-20% de redução). Reavaliar em 4 a 6 semanas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-line">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">3</div>
              <div>
                <h4 className="font-bold text-brand-navy text-sm">Passo 3: Persistência fora da meta &rarr; Inibidor de PCSK9</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Em pacientes de Muito Alto Risco mantendo LDL-c &ge; 50 mg/dL sob estatina máxima + ezetimiba, indicar <strong>Evolocumabe 140 mg SC q2w</strong> ou <strong>Alirocumabe 75-150 mg SC q2w</strong>. Alternativa oral: Ácido Bempedoico.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
