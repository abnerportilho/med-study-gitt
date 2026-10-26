import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Zap,
  Microscope,
  HelpCircle,
  FileCheck,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function CKDDiagnosis() {
  const [activeDdxTab, setActiveDdxTab] = useState<'lra' | 'akd' | 'drc'>('drc');

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-5xl mx-auto">
      {/* Header com síntese conceitual */}
      <header className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-900/20 via-brand-blue/10 to-transparent border border-line">
        <div className="flex items-center gap-2 text-brand-blue mb-2">
          <span className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
            <ClipboardCheck size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Critérios Diagnósticos • KDIGO 2024</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
          Diagnóstico e Investigação da Doença Renal Crônica
        </h1>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          O diagnóstico da DRC exige o binômio <strong>Filtração Glomerular + Marcadores Estruturais</strong> associado à persistência comprovada por <strong>pelo menos 3 meses</strong> para diferenciar de Injúria Renal Aguda (LRA) e Doença Renal Aguda (AKD).
        </p>
      </header>

      {/* 1. CRITÉRIOS FORMAIS DE DEFINIÇÃO (KDIGO 2024) */}
      <section id="definition" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
            <FileCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Definição Operacional da DRC</h2>
            <p className="text-xs text-ink-muted">Presença de pelo menos 1 critério por período ≥ 3 meses</p>
          </div>
        </div>

        {/* Card Conceitual Central */}
        <div className="card p-6 md:p-7 border border-brand-blue/30 bg-card rounded-2xl shadow-sm">
          <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20 mb-6">
            <p className="text-base md:text-lg font-medium text-brand-navy leading-relaxed italic text-center">
              "Anormalidades da estrutura ou função renal, presentes por <span className="text-brand-blue font-black underline decoration-2">≥ 3 meses</span>, com implicações para a saúde do indivíduo."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bloco 1: Filtração Reduzida */}
            <div className="p-5 rounded-2xl bg-bg border border-line flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-brand-blue tracking-wider">Critério Funcional</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue">Independe de proteinúria</span>
                </div>
                <h3 className="text-base font-black text-brand-navy mb-2">
                  eTFG &lt; 60 mL/min/1,73m²
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Reflete a perda de mais de 50% da massa de néfrons funcionais. Qualquer paciente com eTFG &lt; 60 por ≥ 3 meses <strong>tem DRC</strong>, mesmo que o EAS e a dosagem de albumina urinária sejam perfeitamente normais.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-mono text-ink bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                Calculado preferencialmente por CKD-EPI 2021 (Creatinina ou Creatinina + Cistatina C).
              </div>
            </div>

            {/* Bloco 2: Marcadores de Lesão Renal */}
            <div className="p-5 rounded-2xl bg-bg border border-line flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-rose-500 tracking-wider">Critérios Estruturais</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-500">Mesmo com eTFG ≥ 60</span>
                </div>
                <h3 className="text-base font-black text-brand-navy mb-2">
                  Marcadores de Dano Renal (≥ 1 deles)
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Permitem diagnosticar DRC nos estágios iniciais (G1 e G2), quando a filtração ainda parece preservada:
                </p>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-ink">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span><strong>Albuminúria:</strong> RAC ≥ 30 mg/g (ou &gt;30 mg/24h).</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span><strong>Sedimento Urinário:</strong> Hematúria glomerular, cilindros hemáticos/leucocitários.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span><strong>Distúrbios Tubulares:</strong> Cistinúria, Fanconi, perda renal de K+/Mg++.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span><strong>Anormalidade Histológica:</strong> Biópsia renal com esclerose/fibrose.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span><strong>Imagem Estrutural:</strong> Rins atróficos, perda de diferenciação, cistos bilaterais.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span><strong>Transplante Renal:</strong> Todo receptor de rim é classificado como DRC.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alerta Temporal: A Armadilha dos 3 Meses */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="text-xs text-ink leading-relaxed">
            <strong className="text-amber-600 dark:text-amber-400 font-bold block mb-0.5">Aviso Crítico de Prova e Residência:</strong>
            Nunca feche o diagnóstico de Doença Renal Crônica baseado em uma única dosagem de creatinina ou exame de urina. Elevações agudas podem refletir <strong>desidratação, necrose tubular aguda (LRA) ou infecção urinária</strong> transitória. O critério de persistência temporal (≥ 3 meses) é estritamente obrigatório.
          </div>
        </div>
      </section>

      {/* 2. DIAGNÓSTICO DIFERENCIAL: LRA vs AKD vs DRC */}
      <section id="differential" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Layers size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy">Diagnóstico Diferencial Temporal: LRA × AKD × DRC</h2>
              <p className="text-xs text-ink-muted">A linha contínua do tempo estabelecida pelo KDIGO</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => setActiveDdxTab('lra')}
            className={cn(
              "card p-5 border rounded-2xl cursor-pointer transition-all flex flex-col justify-between",
              activeDdxTab === 'lra' ? "border-amber-500 bg-amber-500/10 shadow-sm" : "border-line bg-card hover:border-slate-400"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">Agudo Imediato</span>
                <span className="text-xs font-mono font-bold text-ink">&le; 7 dias</span>
              </div>
              <h3 className="text-base font-black text-brand-navy mb-2">1. LRA (Injúria Renal Aguda)</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Elevação rápida de Cr sérica em 48h (≥ 0,3 mg/dL) ou em até 7 dias (≥ 50%), ou oligúria por ≥ 6h. Geralmente potencialmente reversível.
              </p>
            </div>
          </div>

          <div 
            onClick={() => setActiveDdxTab('akd')}
            className={cn(
              "card p-5 border rounded-2xl cursor-pointer transition-all flex flex-col justify-between",
              activeDdxTab === 'akd' ? "border-brand-blue bg-brand-blue/10 shadow-sm" : "border-line bg-card hover:border-slate-400"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider">Subagudo / Intermediário</span>
                <span className="text-xs font-mono font-bold text-ink">7 dias a 3 meses</span>
              </div>
              <h3 className="text-base font-black text-brand-navy mb-2">2. AKD (Doença Renal Aguda)</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Disfunção ou dano renal persistente além de 7 dias, mas que ainda não completou 3 meses. Zona cinzenta crucial onde ainda há potencial de recuperação.
              </p>
            </div>
          </div>

          <div 
            onClick={() => setActiveDdxTab('drc')}
            className={cn(
              "card p-5 border rounded-2xl cursor-pointer transition-all flex flex-col justify-between",
              activeDdxTab === 'drc' ? "border-emerald-500 bg-emerald-500/10 shadow-sm" : "border-line bg-card hover:border-slate-400"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Crônico Estabelecido</span>
                <span className="text-xs font-mono font-bold text-ink">&ge; 3 meses</span>
              </div>
              <h3 className="text-base font-black text-brand-navy mb-2">3. DRC (Doença Renal Crônica)</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Disfunção ou lesão renal documentada por mais de 90 dias. Processo com componente fibrótico estrutural irreversível e hiperfiltração compensatória.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXAMES COMPLEMENTARES: PAINEL COMPLETO */}
      <section id="exams" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
            <Search size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Painel de Exames Diagnósticos e Complementares</h2>
            <p className="text-xs text-ink-muted">Vantagens, limitações e indicações precisas de cada biomarcador</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Função Renal / Filtração */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-brand-blue" />
              Avaliação da Taxa de Filtração Glomerular
            </h3>

            <div className="card p-4 border border-line bg-card rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-sm">Creatinina Sérica</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue">Acesso Universal</span>
              </div>
              <p className="text-xs text-ink-muted">
                Produzida pelos músculos. É filtrada e tem 10-15% de secreção tubular.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-line">
                <span className="text-emerald-600 dark:text-emerald-400">✓ Baixo custo, amplamente padronizada (IDMS)</span>
                <span className="text-rose-600 dark:text-rose-400">✗ Varia com dieta, amputação, desnutrição e sarcopenia</span>
              </div>
            </div>

            <div className="card p-4 border border-brand-blue/30 bg-card rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-sm">CKD-EPI 2021 (Creatinina)</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">Padrão Ouro Atual</span>
              </div>
              <p className="text-xs text-ink-muted">
                Equação recomendada mundialmente pelo KDIGO. Eliminou o coeficiente de raça/cor das equações prévias.
              </p>
              <div className="text-[11px] text-ink bg-bg p-2 rounded-lg border border-line">
                Disponível na aba <strong>Calculadora CKD-EPI 2021</strong> desta plataforma para cálculo automatizado.
              </div>
            </div>

            <div className="card p-4 border border-line bg-card rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-sm">Cistatina C Sérica</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600">Confirmação de Dúvida</span>
              </div>
              <p className="text-xs text-ink-muted">
                Proteína produzida por todas as células nucleadas. Livremente filtrada e reabsorvida/metabolizada nos túbulos.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-line">
                <span className="text-emerald-600 dark:text-emerald-400">✓ Independe de massa muscular, peso e dieta</span>
                <span className="text-rose-600 dark:text-rose-400">✗ Custo elevado; alterada em tireoidopatias e corticoide</span>
              </div>
            </div>
          </div>

          {/* Marcadores de Lesão Estrutural */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <Microscope size={16} className="text-purple-600 dark:text-purple-400" />
              Marcadores Estruturais e de Imagem
            </h3>

            <div className="card p-4 border border-line bg-card rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-sm">RAC Urinária (Albumina/Creatinina)</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-500">Obrigatório em todo rastreio</span>
              </div>
              <p className="text-xs text-ink-muted">
                Dosada em amostra isolada matinal de urina (mg/g). Substitui a urina de 24 horas para triagem com alta precisão e comodidade.
              </p>
              <div className="text-[11px] text-ink font-medium bg-bg p-2 rounded-lg border border-line">
                Normal: &lt; 30 mg/g | Moderada: 30-300 mg/g | Grave: &gt; 300 mg/g.
              </div>
            </div>

            <div className="card p-4 border border-line bg-card rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-sm">Ultrassonografia Renal e Vias Urinárias</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600">Exame de Imagem Inicial</span>
              </div>
              <p className="text-xs text-ink-muted">
                Avalia tamanho renal, espessura e ecogenicidade cortical, presença de cistos e descarta uropatia obstrutiva (hidronefrose).
              </p>
              <div className="text-[11px] text-ink bg-bg p-2 rounded-lg border border-line">
                <strong>Achado típico de DRC:</strong> Rins diminuídos (&lt; 9 cm) com perda da diferenciação corticomedular.
                <br />
                <em>Exceções de rins normais/aumentados na DRC:</em> Diabetes precoce, Amiloidose, Policistose e HIV.
              </div>
            </div>

            <div className="card p-4 border border-line bg-card rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-brand-navy text-sm">Biópsia Renal Percutânea</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-ink-muted">Indicação Específica</span>
              </div>
              <p className="text-xs text-ink-muted">
                Indicada em DRC de causa incerta com proteinúria nefrótica, sedimento urinário ativo (suspeita de glomerulite) ou declínio rápido inexplicado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLUXOGRAMA DE CONDUTA DIAGNÓSTICA */}
      <section id="algorithm" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
            <Zap size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Algoritmo Diagnóstico Integrado (KDIGO 2024)</h2>
            <p className="text-xs text-ink-muted">Passo a passo desde o rastreio na atenção primária até a confirmação</p>
          </div>
        </div>

        <div className="card p-6 md:p-8 border border-line bg-card rounded-3xl space-y-6">
          <div className="flex flex-col items-center">
            {/* Passo 1 */}
            <div className="w-full max-w-lg p-4 rounded-2xl bg-brand-navy text-white text-center shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue block mb-1">Passo 1: População de Risco</span>
              <p className="text-sm font-bold">Adulto com DM, HAS, Idade &gt; 60 anos, DCV prévia ou HF de DRC</p>
            </div>

            <ArrowRight className="rotate-90 text-brand-blue my-2" size={24} />

            {/* Passo 2 */}
            <div className="w-full max-w-lg p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue block mb-1">Passo 2: Solicitação Inicial</span>
              <p className="text-sm font-bold text-brand-navy">
                Creatinina Sérica (com eTFG CKD-EPI) + Amostra Isolada de Urina para RAC (Albumina/Creatinina)
              </p>
            </div>

            <ArrowRight className="rotate-90 text-brand-blue my-2" size={24} />

            {/* Passo 3: Bifurcação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-2">
              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-emerald-600 uppercase">Resultado Normal</span>
                  <p className="text-sm font-bold text-brand-navy mt-1">eTFG ≥ 60 mL/min E RAC &lt; 30 mg/g</p>
                  <p className="text-xs text-ink-muted mt-2">
                    Não há evidência atual de DRC funcional ou lesão glomerular.
                  </p>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  Repetir anualmente para rastreamento contínuo
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/30 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-rose-600 uppercase">Resultado Alterado</span>
                  <p className="text-sm font-bold text-brand-navy mt-1">eTFG &lt; 60 mL/min OU RAC ≥ 30 mg/g</p>
                  <p className="text-xs text-ink-muted mt-2">
                    Descartar fatores agudos reversíveis (febre, infecção urinária, AINE, exercício intenso).
                  </p>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  Repetir exames em até 3 meses para confirmar cronicidade
                </div>
              </div>
            </div>

            <ArrowRight className="rotate-90 text-brand-blue my-2" size={24} />

            {/* Confirmação */}
            <div className="w-full max-w-xl p-5 rounded-2xl bg-gradient-to-r from-brand-navy to-slate-900 text-white text-center shadow-lg border border-brand-blue/40">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">Passo 4: Confirmação e Conduta</span>
              <p className="text-base font-black">
                Confirmada alteração por ≥ 3 meses: Diagnóstico de DRC Estabelecido
              </p>
              <p className="text-xs text-slate-300 mt-2">
                1) Classificar estadiamento CGA • 2) Iniciar nefroproteção padrão (IECA/BRA + iSGLT2) • 3) Ultrassonografia renal • 4) Avaliar indicação de Nefrologista
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
