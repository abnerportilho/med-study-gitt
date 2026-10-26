import React, { useState } from 'react';
import CKDDialysis from './CKDDialysis';
import CKDPatientGuide from './CKDPatientGuide';
import { 
  Pill, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Zap,
  Heart,
  Activity,
  Droplets,
  Scale,
  Sparkles,
  Flame,
  ShieldAlert,
  ArrowUpRight,
  Stethoscope,
  Clock,
  Bone,
  ChevronRight,
  Layers,
  HelpCircle
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function CKDTreatment() {
  const [activeTab, setActiveTab] = useState<'dmo' | 'anemia' | 'acidose' | 'nutricao' | 'dialise'>('dmo');
  const [dmoSubTab, setDmoSubTab] = useState<'quelantes' | 'hpt' | 'fisiopatologia' | 'calcifilaxia'>('quelantes');
  return (
    <div className="flex flex-col gap-10 pb-20 max-w-5xl mx-auto">
      {/* Header com síntese conceitual */}
      <header className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-900/20 via-brand-blue/10 to-transparent border border-line">
        <div className="flex items-center gap-2 text-brand-blue mb-2">
          <span className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
            <ShieldCheck size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Diretrizes Terapêuticas • KDIGO 2024</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
          Manejo e Terapêutica da DRC: Os 4 Pilares da Nefroproteção
        </h1>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          A abordagem moderna da Doença Renal Crônica mudou de passiva para uma <strong>quadrupla terapia modificadora de desfechos renais e cardiovasculares</strong>, capaz de desacelerar drasticamente a perda da filtração glomerular e prevenir eventos fatais.
        </p>
      </header>

      {/* 1. OS 4 PILARES DA NEFROPROTEÇÃO ATUAL (KDIGO 2024) */}
      <section id="nephroprotection" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <Pill size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy">Os 4 Pilares Farmacológicos da Nefroproteção</h2>
              <p className="text-xs text-ink-muted">Evidências dos ensaios DAPA-CKD, EMPA-KIDNEY, FIDELIO/FIGARO e FLOW</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600">
            Classe IA de Evidência
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pilar 1: Bloqueio do SRAA */}
          <div className="card p-6 border border-brand-blue/30 bg-card rounded-2xl flex flex-col justify-between hover:border-brand-blue/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-base">IECA ou BRA em Dose Otimizada</h3>
                    <span className="text-[10px] font-bold text-brand-blue uppercase">Enalapril, Ramipril, Losartana, Olmesartana</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Vasodilatação preferencial da <strong>arteríola eferente</strong> glomerular, reduzindo a hipertensão intraglomerular, a hiperfiltração e a perda urinária de albumina.
              </p>
              <ul className="space-y-2 text-xs text-ink">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Indicação:</strong> Recomendado para todos com hipertensão e albuminúria A2 ou A3 (RAC ≥ 30 mg/g).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Titulação:</strong> Subir até a dose máxima tolerada aprovada. Nunca associar IECA + BRA concomitantemente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Manejo:</strong> Aumento de até 30% na creatinina nas primeiras semanas é hemodinâmico e esperado; não suspender sem motivo!</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-bg border border-line text-[11px] text-ink-muted font-medium">
              Meta de PA: <strong>Sistólica &lt; 120 mmHg</strong> (se tolerado e medido de forma padronizada).
            </div>
          </div>

          {/* Pilar 2: Inibidores de SGLT2 */}
          <div className="card p-6 border border-emerald-500/30 bg-card rounded-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-base">iSGLT2 (Gliflozinas)</h3>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Dapagliflozina 10mg / Empagliflozina 10mg</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Restauram o <strong>feedback tubuloglomerular</strong> (constrição da arteríola aferente por entrega de Na/Cl à mácula densa), aliviando o estresse glomerular e o consumo de O₂ tubular.
              </p>
              <ul className="space-y-2 text-xs text-ink">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Indicação:</strong> eTFG ≥ 20 mL/min com RAC ≥ 200 mg/g OU eTFG 20-45 mesmo sem albuminúria (com ou sem Diabetes!).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Desfechos:</strong> Redução de ~40% no risco de falência renal dialítica, morte CV e internação por IC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info size={15} className="text-brand-blue shrink-0 mt-0.5" />
                  <span><strong>Continuidade:</strong> Se iniciado com eTFG ≥ 20, pode ser <em>mantido até o início da diálise</em> mesmo se a eTFG cair abaixo de 20.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-bg border border-line text-[11px] text-ink-muted font-medium">
              Efeito aditivo de nefroproteção quando combinado ao bloqueador de SRAA.
            </div>
          </div>

          {/* Pilar 3: Finerenona (ARM não-esteroidal) */}
          <div className="card p-6 border border-purple-500/30 bg-card rounded-2xl flex flex-col justify-between hover:border-purple-500/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-base">Finerenona (ARM não-esteroidal)</h3>
                    <span className="text-[10px] font-bold text-purple-600 uppercase">10 mg a 20 mg/dia via oral</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Bloqueio seletivo do receptor mineralocorticoide sem efeito hormonal sexual. Reduz a inflamação e fibrose glomerular/intersticial desencadeada pela superexpressão de aldosterona.
              </p>
              <ul className="space-y-2 text-xs text-ink">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Indicação:</strong> Diabéticos tipo 2 com eTFG ≥ 25 mL/min, RAC ≥ 30 mg/g e K⁺ sérico ≤ 4,8-5,0 mEq/L.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Benefício:</strong> Redução significativa de eventos cardiovasculares maiores (MACE) e progressão renal (FIDELITY).</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Monitorização:</strong> Checar Potássio sérico em 4 semanas e periodicamente.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-bg border border-line text-[11px] text-ink-muted font-medium">
              Menor incidência de hipercalemia que espironolactona devido à meia-vida curta e distribuição balanceada.
            </div>
          </div>

          {/* Pilar 4: GLP-1 RA (Semaglutida) */}
          <div className="card p-6 border border-rose-500/30 bg-card rounded-2xl flex flex-col justify-between hover:border-rose-500/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-black text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-base">Agonistas do GLP-1 (Semaglutida)</h3>
                    <span className="text-[10px] font-bold text-rose-500 uppercase">Estudo FLOW (2024)</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Efeito multifatorial: melhora glicêmica potente, redução de peso corporal, propriedades anti-inflamatórias endoteliais e atenuação da natriurese e albuminúria.
              </p>
              <ul className="space-y-2 text-xs text-ink">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Evidência FLOW:</strong> Redução de 24% no desfecho composto renal (queda de eTFG, diálise ou morte renal/CV) em DM2 + DRC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Indicação KDIGO:</strong> DM2 com DRC quando o controle glicêmico não é atingido com metformina + iSGLT2 ou quando há obesidade/risco CV.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-bg border border-line text-[11px] text-ink-muted font-medium">
              Pode ser usado até eTFG de 15 mL/min sem necessidade de ajuste de dose por filtração renal.
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANEJO DAS COMPLICAÇÕES SISTÊMICAS */}
      <section id="complications" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <Activity size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy">Manejo Específico das Complicações Crônicas</h2>
              <p className="text-xs text-ink-muted">Selecione uma complicação para abrir o guia prático e as condutas aprofundadas</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue self-start sm:self-auto">
            Abordagem Interativa
          </span>
        </div>

        {/* BOTOES INTERATIVOS DE SELEÇÃO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {/* Botão 1: DMO-DRC */}
          <button
            type="button"
            onClick={() => setActiveTab('dmo')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group",
              activeTab === 'dmo'
                ? "bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/30"
                : "bg-card border-line hover:border-amber-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "p-2 rounded-xl text-xs",
                  activeTab === 'dmo' ? "bg-amber-500 text-white" : "bg-amber-500/10 text-amber-600"
                )}>
                  <Bone size={18} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Eixo P - Ca - PTH
                </span>
              </div>
              <h3 className="font-bold text-brand-navy text-sm">Distúrbio Mineral Ósseo</h3>
              <p className="text-[11px] text-ink-muted mt-1 line-clamp-2">
                Quelantes de fósforo, hiperparatireoidismo, calcitriol e calcifilaxia.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between text-[10px] font-semibold text-amber-600">
              <span>{activeTab === 'dmo' ? 'Visualizando Detalhes' : 'Clique para Explorar'}</span>
              <ChevronRight size={14} className={cn("transition-transform", activeTab === 'dmo' && "rotate-90")} />
            </div>
          </button>

          {/* Botão 2: Anemia Renal */}
          <button
            type="button"
            onClick={() => setActiveTab('anemia')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group",
              activeTab === 'anemia'
                ? "bg-rose-500/10 border-rose-500 shadow-md ring-2 ring-rose-500/30"
                : "bg-card border-line hover:border-rose-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "p-2 rounded-xl text-xs",
                  activeTab === 'anemia' ? "bg-rose-500 text-white" : "bg-rose-500/10 text-rose-500"
                )}>
                  <Droplets size={18} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Alvo Hb 10-11,5
                </span>
              </div>
              <h3 className="font-bold text-brand-navy text-sm">Anemia da DRC</h3>
              <p className="text-[11px] text-ink-muted mt-1 line-clamp-2">
                Deficiência de EPO, cinética do ferro (ISAT e Ferritina) e agentes ESA.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between text-[10px] font-semibold text-rose-600">
              <span>{activeTab === 'anemia' ? 'Visualizando Detalhes' : 'Clique para Explorar'}</span>
              <ChevronRight size={14} className={cn("transition-transform", activeTab === 'anemia' && "rotate-90")} />
            </div>
          </button>

          {/* Botão 3: Acidose Metabólica */}
          <button
            type="button"
            onClick={() => setActiveTab('acidose')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group",
              activeTab === 'acidose'
                ? "bg-purple-500/10 border-purple-500 shadow-md ring-2 ring-purple-500/30"
                : "bg-card border-line hover:border-purple-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "p-2 rounded-xl text-xs",
                  activeTab === 'acidose' ? "bg-purple-500 text-white" : "bg-purple-500/10 text-purple-600"
                )}>
                  <Sparkles size={18} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Alvo HCO3 22-26
                </span>
              </div>
              <h3 className="font-bold text-brand-navy text-sm">Acidose Metabólica</h3>
              <p className="text-[11px] text-ink-muted mt-1 line-clamp-2">
                Amoniogênese, catabolismo muscular proteico e reposição de NaHCO3.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between text-[10px] font-semibold text-purple-600">
              <span>{activeTab === 'acidose' ? 'Visualizando Detalhes' : 'Clique para Explorar'}</span>
              <ChevronRight size={14} className={cn("transition-transform", activeTab === 'acidose' && "rotate-90")} />
            </div>
          </button>

          {/* Botão 4: Terapia Nutricional */}
          <button
            type="button"
            onClick={() => setActiveTab('nutricao')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group",
              activeTab === 'nutricao'
                ? "bg-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/30"
                : "bg-card border-line hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "p-2 rounded-xl text-xs",
                  activeTab === 'nutricao' ? "bg-emerald-500 text-white" : "bg-emerald-500/10 text-emerald-600"
                )}>
                  <Scale size={18} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Dieta & Estilo
                </span>
              </div>
              <h3 className="font-bold text-brand-navy text-sm">Terapia Nutricional</h3>
              <p className="text-[11px] text-ink-muted mt-1 line-clamp-2">
                Ingestão de proteínas (dialítico vs conservador), restrição de sal e estatinas.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between text-[10px] font-semibold text-emerald-600">
              <span>{activeTab === 'nutricao' ? 'Visualizando Detalhes' : 'Clique para Explorar'}</span>
              <ChevronRight size={14} className={cn("transition-transform", activeTab === 'nutricao' && "rotate-90")} />
            </div>
          </button>

          {/* Botão 5: Indicações & Vias de Diálise */}
          <button
            type="button"
            onClick={() => setActiveTab('dialise')}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group sm:col-span-2 lg:col-span-1",
              activeTab === 'dialise'
                ? "bg-blue-600/10 border-brand-blue shadow-md ring-2 ring-brand-blue/30"
                : "bg-card border-line hover:border-brand-blue/40 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "p-2 rounded-xl text-xs",
                  activeTab === 'dialise' ? "bg-brand-blue text-white" : "bg-brand-blue/10 text-brand-blue"
                )}>
                  <Zap size={18} />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue dark:text-blue-400">
                  AEIOU & Acessos
                </span>
              </div>
              <h3 className="font-bold text-brand-navy text-sm">Indicações e Vias de Diálise</h3>
              <p className="text-[11px] text-ink-muted mt-1 line-clamp-2">
                Urgência (AEIOU), FAV, prótese PTFE, CVC Shilley/Permcath e Diálise Peritoneal.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between text-[10px] font-semibold text-brand-blue">
              <span>{activeTab === 'dialise' ? 'Visualizando Detalhes' : 'Clique para Explorar'}</span>
              <ChevronRight size={14} className={cn("transition-transform", activeTab === 'dialise' && "rotate-90")} />
            </div>
          </button>
        </div>

        {/* CONTEÚDO EXPANDIDO DINÂMICO CONFORME O BOTÃO SELECIONADO */}
        {activeTab === 'dmo' && (
          <div className="card p-6 md:p-8 border border-amber-500/30 bg-card rounded-3xl shadow-lg space-y-6">
            {/* Header do DMO */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-black">
                  <Bone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy">
                    Distúrbio Mineral e Ósseo da DRC (DMO-DRC / CKD-MBD)
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Tríade clássica do KDIGO: Alterações Laboratoriais + Doença Óssea + Calcificação Vascular e Tecidual
                  </p>
                </div>
              </div>
              
              {/* Sub-abas do DMO */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {[
                  { id: 'quelantes', label: 'Quelantes de Fósforo' },
                  { id: 'hpt', label: 'Diagnóstico & Tto do HPTS' },
                  { id: 'fisiopatologia', label: 'Fisiopatologia (FGF-23 / Klotho)' },
                  { id: 'calcifilaxia', label: 'Calcifilaxia & Calcificações' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setDmoSubTab(st.id as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      dmoSubTab === st.id
                        ? "bg-card text-brand-navy shadow-sm"
                        : "text-ink-muted hover:text-brand-navy"
                    )}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-aba 1: QUELANTES DE FÓSFORO (Aprofundado) */}
            {dmoSubTab === 'quelantes' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                  <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-ink leading-relaxed">
                    <strong className="text-amber-700 dark:text-amber-300 font-bold block mb-1">
                      Regra de Ouro dos Quelantes de Fósforo (KDIGO 2024):
                    </strong>
                    Os quelantes de fósforo atuam ligando-se ao fosfato inorgânico da dieta no lúmen gastrointestinal, formando compostos insolúveis eliminados nas fezes. <strong>Devem ser ingeridos obrigatoriamente DURANTE ou IMEDIATAMENTE APÓS as principais refeições</strong>. Tomá-los em jejum anula a eficácia quelante e apenas aumenta a absorção sistêmica de cálcio.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Quelantes Não Baseados em Cálcio */}
                  <div className="p-5 rounded-2xl bg-bg border border-emerald-500/30 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">
                          Primeira Escolha KDIGO
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                          Sem Risco de Sobrecarga de Cálcio
                        </span>
                      </div>
                      <h4 className="text-base font-black text-brand-navy">
                        Quelantes NÃO à Base de Cálcio
                      </h4>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        Preferidos em pacientes com hipercalcemia, PTH suprimido (doença óssea adinâmica) ou calcificações cardiovasculares conhecidas.
                      </p>

                      <div className="mt-4 space-y-3 text-xs">
                        <div className="p-3 rounded-xl bg-card border border-line space-y-1">
                          <div className="flex items-center justify-between font-bold text-brand-navy">
                            <span>Cloridrato / Carbonato de Sevelamer</span>
                            <span className="text-emerald-600 font-mono text-[11px]">800 - 1600 mg 3x/dia</span>
                          </div>
                          <p className="text-[11px] text-ink-muted">
                            Polímero não absorvível. Não eleva cálcio sérico. Efeito pleiotrópico benéfico: reduz LDL-colesterol e ácido úrico.
                          </p>
                          <div className="text-[10px] text-amber-600 font-medium pt-1">
                            *Efeitos adversos: plenitude gástrica, constipação e custo elevado no SUS.
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-card border border-line space-y-1">
                          <div className="flex items-center justify-between font-bold text-brand-navy">
                            <span>Carbonato de Lantânio</span>
                            <span className="text-emerald-600 font-mono text-[11px]">500 - 1000 mg 3x/dia</span>
                          </div>
                          <p className="text-[11px] text-ink-muted">
                            Comprimidos mastigáveis de alta potência quelante. Mínima absorção intestinal.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-card border border-line space-y-1">
                          <div className="flex items-center justify-between font-bold text-brand-navy">
                            <span>Quelantes à Base de Ferro (Oxihidróxido Sucroférico)</span>
                            <span className="text-emerald-600 font-mono text-[11px]">500 mg 3x/dia</span>
                          </div>
                          <p className="text-[11px] text-ink-muted">
                            Quadro quelante potente com benefício adicional de pequeno aporte de ferro para a anemia.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quelantes Baseados em Cálcio */}
                  <div className="p-5 rounded-2xl bg-bg border border-amber-500/30 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
                          Uso com Restrição de Dose
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600">
                          Monitorar Cálcio Rigorosamente
                        </span>
                      </div>
                      <h4 className="text-base font-black text-brand-navy">
                        Quelantes À Base de Cálcio
                      </h4>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        Altamente eficazes e de baixo custo, porém o excesso promove balanço positivo de cálcio, calcificação vascular e calcifilaxia.
                      </p>

                      <div className="mt-4 space-y-3 text-xs">
                        <div className="p-3 rounded-xl bg-card border border-line space-y-1">
                          <div className="flex items-center justify-between font-bold text-brand-navy">
                            <span>Carbonato de Cálcio (40% de cálcio elementar)</span>
                            <span className="text-amber-600 font-mono text-[11px]">500 - 1250 mg 3x/dia</span>
                          </div>
                          <p className="text-[11px] text-ink-muted">
                            Requer acidez gástrica para dissociação; menor eficácia em uso com IBP (Omeprazol).
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-card border border-line space-y-1">
                          <div className="flex items-center justify-between font-bold text-brand-navy">
                            <span>Acetato de Cálcio (25% de cálcio elementar)</span>
                            <span className="text-amber-600 font-mono text-[11px]">667 - 1334 mg 3x/dia</span>
                          </div>
                          <p className="text-[11px] text-ink-muted">
                            Mais solúvel em pH neutro e quela mais fósforo por grama de cálcio elementar ingerido, reduzindo o risco de hipercalcemia.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs">
                          <strong>Limite Seguro Máximo:</strong> Limitar a dose diária de cálcio elementar quelante a no máximo <strong>1.500 mg/dia</strong> (totalizando &lt; 2.000 mg/dia somando a dieta).
                          <br />
                          <strong>Contraindicação:</strong> Pacientes com hipercalcemia persistente (Ca &gt; 10,2 mg/dL), PTH &lt; 150 pg/mL ou calcificações vasculares graves.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumo da Estratégia Dietética de Fósforo */}
                <div className="p-4 rounded-2xl bg-card border border-line text-xs space-y-2">
                  <span className="font-bold text-brand-navy text-xs uppercase tracking-wider block">
                    Orientações Nutricionais sobre o Fósforo:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-ink-muted">
                    <div>
                      <strong className="text-brand-navy">Fosfato Orgânico (Carnes, Ovos, Laticínios):</strong> Absorção de 40 a 60%. Fontes vegetais (leguminosas, grãos) contêm fitatos, absorvendo apenas 20 a 40%.
                    </div>
                    <div>
                      <strong className="text-rose-600">Fosfato Inorgânico (Aditivos Alimentares, Embutidos, Refrigerantes cola):</strong> Absorção de <strong>90 a 100%</strong>! Restringir agressivamente estes ultraprocessados.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-aba 2: DIAGNÓSTICO E TRATAMENTO DO HPTS (Aprofundado) */}
            {dmoSubTab === 'hpt' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Critérios Diagnósticos */}
                  <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                    <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider">
                      Alvos Laboratoriais
                    </span>
                    <h4 className="font-bold text-brand-navy text-sm">Paratormônio Intacto (PTHi)</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Nos estágios <strong>G3a a G5 não-dialítico</strong>: manter os níveis de PTH dentro da faixa de normalidade ou ligeiramente acima, evitando aumentos progressivos.
                    </p>
                    <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-navy text-xs font-bold font-mono">
                      Em Hemodiálise (G5D): 2 a 9x o LSN (~130 a 600 pg/mL)
                    </div>
                    <p className="text-[11px] text-ink-muted">
                      PTH &lt; 100 pg/mL no dialítico sugere <em>Doença Óssea Adinâmica</em> (osso desvitalizado, risco aumentado de fratura e calcificação vascular).
                    </p>
                  </div>

                  {/* Fósforo Sérico */}
                  <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                    <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
                      Alvo do Fósforo
                    </span>
                    <h4 className="font-bold text-brand-navy text-sm">Fosfatemia (P)</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Nos estágios <strong>G3-G5</strong>: em direção ao intervalo normal (2,5 a 4,5 mg/dL).
                    </p>
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-brand-navy text-xs font-bold font-mono">
                      Alvo em Diálise: 3,5 a 5,5 mg/dL
                    </div>
                    <p className="text-[11px] text-ink-muted">
                      Hiperfosfatemia &gt; 5,5 mg/dL é o principal motor da hiperplasia das paratireoides e mortalidade cardiovascular.
                    </p>
                  </div>

                  {/* Cálcio Sérico */}
                  <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">
                      Alvo do Cálcio
                    </span>
                    <h4 className="font-bold text-brand-navy text-sm">Cálcio Total e Iônico</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Sempre corrigir pela albumina: Ca corrigido = Ca medido + 0,8 × (4,0 - Albuminemia).
                    </p>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-brand-navy text-xs font-bold font-mono">
                      Alvo: 8,5 a 10,0 mg/dL (evitar hipercalcemia)
                    </div>
                    <p className="text-[11px] text-ink-muted">
                      Produto Ca × P mantido rigorosamente &lt; 55 mg²/dL² para prevenir precipitação tecidual.
                    </p>
                  </div>
                </div>

                {/* Algoritmo de Tratamento do HPTS */}
                <div className="card p-5 border border-line bg-bg rounded-2xl space-y-4">
                  <h4 className="font-bold text-brand-navy text-sm uppercase tracking-wider flex items-center gap-2">
                    <Activity size={16} className="text-brand-blue" />
                    Tratamento Farmacológico do Hiperparatireoidismo Secundário (HPTS)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {/* Linha 1: Vitamina D Nativa */}
                    <div className="p-3.5 rounded-xl bg-card border border-line space-y-1.5">
                      <div className="font-bold text-brand-navy flex items-center justify-between">
                        <span>1. Colecalciferol (Vitamina D3)</span>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">G3 - G5</span>
                      </div>
                      <p className="text-ink-muted text-[11px] leading-relaxed">
                        Dosar 25-OH-vitamina D. Se &lt; 30 ng/mL, repor 50.000 UI/semana por 8 semanas, depois manutenção mensal. Reduz o drive inicial sobre a paratireoide.
                      </p>
                    </div>

                    {/* Linha 2: Ativadores do VDR */}
                    <div className="p-3.5 rounded-xl bg-card border border-line space-y-1.5">
                      <div className="font-bold text-brand-navy flex items-center justify-between">
                        <span>2. Calcitriol ou Paricalcitol</span>
                        <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded font-bold">Ativadores VDR</span>
                      </div>
                      <p className="text-ink-muted text-[11px] leading-relaxed">
                        Formas ativas da vitamina D. Supressão direta da transcrição de pré-pró-PTH. <strong>Usar somente se Cálcio e Fósforo estiverem controlados</strong> (risco de hipercalcemia e hiperfosfatemia por aumento da absorção intestinal).
                      </p>
                    </div>

                    {/* Linha 3: Calcimiméticos */}
                    <div className="p-3.5 rounded-xl bg-card border border-line space-y-1.5">
                      <div className="font-bold text-brand-navy flex items-center justify-between">
                        <span>3. Cinacalcete (Sensipar)</span>
                        <span className="text-[10px] bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded font-bold">Calcimimético</span>
                      </div>
                      <p className="text-ink-muted text-[11px] leading-relaxed">
                        Alomodulador positivo do receptor sensível ao cálcio (CaSR) na paratireoide. <strong>Reduz o PTH e simultaneamente abaixa o Cálcio e o Fósforo</strong>. Primeira escolha se Cálcio elevado ou limítrofe alto (dose inicial 30 mg/dia).
                      </p>
                    </div>
                  </div>

                  {/* Paratireoidectomia Cirúrgica */}
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold mb-1">
                      <AlertCircle size={16} />
                      <span>Indicações de Paratireoidectomia Cirúrgica (Total com Autoimplante ou Subtotal 7/8):</span>
                    </div>
                    <p className="text-ink leading-relaxed">
                      1) HPTS refratário ao tratamento clínico máximo com <strong>PTH persistente &gt; 800 - 1000 pg/mL</strong> associado a hipercalcemia e/ou hiperfosfatemia refratárias;
                      <br />
                      2) Calcifilaxia ativa;
                      <br />
                      3) Dores ósseas incapacitantes, fraturas patológicas recorrentes ou prurido intratável.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-aba 3: FISIOPATOLOGIA INTEGRADA (FGF-23 e Klotho) */}
            {dmoSubTab === 'fisiopatologia' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                  <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                    <Flame size={16} className="text-amber-500" />
                    A Cascata Fisiopatológica do DMO-DRC:
                  </h4>
                  <p className="text-ink leading-relaxed">
                    O distúrbio mineral ósseo inicia-se precocemente no estágio <strong>G2/G3a</strong>, muito antes de qualquer alteração visível no cálcio ou fósforo sérico:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    {
                      step: "1. Redução de Néfrons",
                      desc: "Diminuição sutil da filtração de fosfato. Para evitar retenção, os osteócitos aumentam a secreção do hormônio FGF-23.",
                      tag: "Gastro/Ósseo"
                    },
                    {
                      step: "2. Queda do Klotho",
                      desc: "O rim lesado perde a expressão do co-receptor Klotho. Níveis astronômicos de FGF-23 causam hipertrofia ventricular esquerda.",
                      tag: "Cardiotoxicidade"
                    },
                    {
                      step: "3. Queda da 1-alfa-hidroxilase",
                      desc: "O FGF-23 inibe a 1-alfa-hidroxilase renal, despencando os níveis de calcitriol (1,25-(OH)2-D3). Surge hipocalcemia e perda da supressão do PTH.",
                      tag: "Hipovitaminose D ativa"
                    },
                    {
                      step: "4. Hiperplasia de Paratireoide",
                      desc: "A hipocalcemia crônica, hiperfosfatemia e carência de calcitriol induzem proliferação clonal (adenoma) e perda de CaSR e VDR.",
                      tag: "HPTS Terciário autônomo"
                    }
                  ].map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-bg border border-line flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">Passo {idx + 1}</span>
                        <div className="font-bold text-brand-navy text-xs mb-1">{p.step}</div>
                        <p className="text-[11px] text-ink-muted leading-relaxed">{p.desc}</p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-line text-[10px] font-semibold text-brand-blue">
                        {p.tag}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Classificação Histológica do DMO (TMV) */}
                <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
                  <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">
                    Sistema TMV da Biópsia Óssea (KDIGO):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-ink">
                    <div className="p-2.5 rounded-lg bg-bg border border-line">
                      <strong className="text-amber-600 block">Alto Turnover (Osteíte Fibrosa Cística):</strong> PTH elevado (&gt; 600), reabsorção osteoclástica intensa, fibrose medular e risco de fraturas.
                    </div>
                    <div className="p-2.5 rounded-lg bg-bg border border-line">
                      <strong className="text-brand-blue block">Baixo Turnover (Doença Óssea Adinâmica):</strong> PTH baixo (&lt; 100), ausência de células ativas no osso, incapacidade de tamponar cálcio, calcificação vascular acelerada.
                    </div>
                    <div className="p-2.5 rounded-lg bg-bg border border-line">
                      <strong className="text-purple-600 block">Osteomalácia:</strong> Acúmulo de matriz osteoide não mineralizada (geralmente por deficiência extrema de vitamina D ou intoxicação prévia por alumínio).
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-aba 4: CALCIFILAXIA (Aprofundado) */}
            {dmoSubTab === 'calcifilaxia' && (
              <div className="space-y-4 text-xs">
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3 text-ink">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black text-sm uppercase tracking-wider">
                    <ShieldAlert size={20} />
                    <span>Calcifilaxia (Arteriolopatia Urêmica Calcificante) - Emergência Nefrológica</span>
                  </div>
                  <p className="leading-relaxed">
                    Condição rara e devastadora com <strong>mortalidade &gt; 50-80% em 1 ano</strong> (principalmente por sepse de foco cutâneo). Caracteriza-se por calcificação da camada média de pequenas arteríolas dérmicas e subcutâneas, proliferação intimal, trombose e necrose isquêmica tecidual.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
                    <h5 className="font-bold text-brand-navy text-xs uppercase">Quadro Clínico & Fatores de Risco</h5>
                    <ul className="space-y-1.5 text-[11px] text-ink-muted">
                      <li>• <strong>Lesões cutâneas:</strong> Placas violáceas intensamente dolorosas (livedo reticular que evolui para bolhas hemorrágicas, escaras necróticas centrais e úlceras profundas), em áreas de grande adiposidade (coxas, abdome, mamas).</li>
                      <li>• <strong>Fatores desencadeantes:</strong> Uso de Warfarina (inibe a proteína MGP dependente de vitamina K que previne calcificação vascular!), produto Ca × P elevado, sexo feminino, obesidade e hiperparatireoidismo grave.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
                    <h5 className="font-bold text-brand-navy text-xs uppercase">Tratamento Multimodal Imediato</h5>
                    <ul className="space-y-1.5 text-[11px] text-ink-muted">
                      <li>• <strong>Tiossulfato de Sódio IV:</strong> 25g administrados durante os últimos 30-60 min da sessão de hemodiálise 3x/semana (quelante de cálcio tecidual e potente antioxidante).</li>
                      <li>• <strong>Interromper Warfarina imediatamente</strong> (trocar por heparina se anticoagulação mandatória).</li>
                      <li>• <strong>Suspender quelantes de cálcio e vitamina D ativa</strong>; otimizar sessões de hemodiálise (aumentar frequência ou usar banho com cálcio baixo: 1,5 a 2,0 mEq/L).</li>
                      <li>• Desbridamento cirúrgico criterioso de tecido desvitalizado e curativos com prata/oxigenoterapia hiperbárica.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTEÚDO EXPANDIDO: ANEMIA DA DRC */}
        {activeTab === 'anemia' && (
          <div className="card p-6 md:p-8 border border-rose-500/30 bg-card rounded-3xl shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 flex items-center justify-center font-black">
                  <Droplets size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy">Protocolo Completo de Anemia da DRC</h3>
                  <p className="text-xs text-ink-muted">Diretrizes KDIGO para investigação e manejo com Ferro e ESA</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600">
                Alvo Terapêutico: Hb 10,0 - 11,5 g/dL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  1. Otimização Obrigatória do Ferro (Antes do ESA!)
                </h4>
                <p className="text-ink-muted leading-relaxed">
                  Sem substrato de ferro adequado na medula, o agente estimulador da eritropoiese não funciona (resistência ao ESA) e induz exaustão das reservas.
                </p>
                <div className="p-3 rounded-xl bg-card border border-line space-y-1 font-mono text-[11px]">
                  <div>• Saturação de Transferrina (ISAT): <strong className="text-brand-navy">&gt; 20%</strong> (ideal 20 - 30%)</div>
                  <div>• Ferritina Sérica: <strong className="text-brand-navy">&gt; 100 ng/mL</strong> em conservador (&gt; 200 ng/mL em hemodiálise)</div>
                </div>
                <p className="text-[11px] text-ink-muted">
                  Preferir <strong>Ferro Intravenoso (Sacarato de Hidróxido Férrico / Noripurum)</strong>: 100 mg por sessão de diálise até atingir 1.000 mg de reposição total cumulativa.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                  <Activity size={16} className="text-brand-blue" />
                  2. Agentes Estimuladores da Eritropoiese (ESA)
                </h4>
                <p className="text-ink-muted leading-relaxed">
                  Iniciar quando a Hb cair para <strong>&lt; 10,0 g/dL</strong> após correção de carências de ferro, B12 e folato.
                </p>
                <div className="p-3 rounded-xl bg-card border border-line space-y-1 text-[11px]">
                  <div>• <strong>Alfaepoetina:</strong> 50 - 100 UI/kg SC ou IV 1 a 3x por semana.</div>
                  <div>• <strong>Darbepoetina Alfa:</strong> Meia-vida longa, administrada a cada 2 ou 4 semanas.</div>
                  <div>• <strong>Inibidores da prolil-hidroxilase do HIF (Roxadustate):</strong> Nova classe oral aprovada que simula resposta à hipóxia.</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] font-medium">
                  <strong>Aviso de Segurança (Estudos CHOIR e CREATE):</strong> Nunca objetivar Hb &gt; 11,5 - 12 g/dL. Doses excessivas de ESA aumentam comprovadamente AVC isquêmico, trombose de acesso vascular e mortalidade geral!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO EXPANDIDO: ACIDOSE METABÓLICA */}
        {activeTab === 'acidose' && (
          <div className="card p-6 md:p-8 border border-purple-500/30 bg-card rounded-3xl shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-600 flex items-center justify-center font-black">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy">Manejo da Acidose Metabólica Crônica</h3>
                  <p className="text-xs text-ink-muted">Preservação muscular e desaceleração da perda de filtração glomerular</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600">
                Alvo: Bicarbonato Sérica 22 - 26 mEq/L
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                <h4 className="font-bold text-brand-navy text-sm">Por que a acidose crônica é prejudicial?</h4>
                <ul className="space-y-2 text-ink-muted leading-relaxed">
                  <li>• Ativa a via ubiquitina-proteassoma, causando <strong>proteólise muscular esquelética acentuada</strong>, sarcopenia e desnutrição energético-proteica.</li>
                  <li>• Acelera a reabsorção óssea para tamponamento com carbonato de cálcio, piorando a osteopenia.</li>
                  <li>• Estimula síntese intra-renal compensatória de amônia e endotelina-1, acelerando a fibrose tubulointersticial e progressão para diálise.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                <h4 className="font-bold text-brand-navy text-sm">Conduta & Prescrição Prática</h4>
                <div className="p-3.5 rounded-xl bg-card border border-line space-y-2">
                  <div className="font-mono text-brand-navy font-bold">Bicarbonato de Sódio oral (comprimidos de 500 mg ou 1 g)</div>
                  <p className="text-ink-muted text-[11px]">
                    Dose usual: <strong>0,5 a 1,0 mEq/kg/dia</strong> (ex: 2 a 4 g/dia divididos nas refeições).
                    <br />
                    <em>1 grama de NaHCO3 fornece ~12 mEq de bicarbonato e ~12 mEq de sódio.</em>
                  </p>
                </div>
                <div className="text-[11px] text-ink-muted">
                  <strong>Atenção ao Volume:</strong> Monitorar surgimento de edema ou descontrole pressórico pelo aporte adicional de sódio. Em dietas ricas em frutas e verduras com potencial alcalinizante, pode-se reduzir a dose necessária de comprimidos.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO EXPANDIDO: TERAPIA NUTRICIONAL */}
        {activeTab === 'nutricao' && (
          <div className="card p-6 md:p-8 border border-emerald-500/30 bg-card rounded-3xl shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-black">
                  <Scale size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-navy">Terapia Nutricional & Estilo de Vida na DRC</h3>
                  <p className="text-xs text-ink-muted">Orientações quantitativas do KDIGO para preservação funcional</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                <span className="text-[10px] font-black text-emerald-600 uppercase">Conservador (G3 - G5)</span>
                <h4 className="font-bold text-brand-navy text-sm">Restrição Proteica Moderada</h4>
                <p className="text-xs font-mono font-bold text-brand-navy">0,6 a 0,8 g/kg peso ideal/dia</p>
                <p className="text-ink-muted text-[11px] leading-relaxed">
                  Reduz a pressão intraglomerular, a geração de ureia e a carga de ácidos e fosfato, retardando o início da diálise.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                <span className="text-[10px] font-black text-rose-600 uppercase">Dialítico (G5D)</span>
                <h4 className="font-bold text-brand-navy text-sm">Aporte Proteico Elevado</h4>
                <p className="text-xs font-mono font-bold text-brand-navy">1,0 a 1,2 g/kg peso ideal/dia</p>
                <p className="text-ink-muted text-[11px] leading-relaxed">
                  Necessário compensar a perda de aminoácidos e peptídeos no dialisador e o estado inflamatório crônico de catabolismo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                <span className="text-[10px] font-black text-brand-blue uppercase">Metas Metabólicas</span>
                <h4 className="font-bold text-brand-navy text-sm">Sódio, Calorias e Lipídios</h4>
                <div className="space-y-1 text-[11px] text-ink-muted">
                  <div>• Sódio: &lt; 2g Na/dia (&lt; 5g de sal).</div>
                  <div>• Calorias: 30 a 35 kcal/kg/dia para evitar catabolismo.</div>
                  <div>• Estatina: indicada em todos com DRC &gt; 50 anos (SHARP).</div>
                </div>
              </div>
            </div>

            {/* Guia Visual Completo para o Paciente */}
            <div className="pt-4 border-t border-line">
              <CKDPatientGuide />
            </div>
          </div>
        )}

        {/* 5. ABA INTERATIVA DE DIÁLISE (INDICAÇÕES E VIAS) */}
        {activeTab === 'dialise' && (
          <div className="mt-2 animate-fadeIn">
            <CKDDialysis />
          </div>
        )}
      </section>

      {/* 3. CRITÉRIOS DE ENCAMINHAMENTO AO NEFROLOGISTA */}
      <section id="referral" className="space-y-4">
        <div className="card p-7 md:p-8 border border-brand-blue/30 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 text-white rounded-3xl relative overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 text-brand-blue mb-3">
            <Stethoscope size={22} />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Critérios de Encaminhamento Obrigatório ao Nefrologista (KDIGO 2024)
            </h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            O encaminhamento tardio (&lt; 1 ano antes do início da diálise) está fortemente associado a início não-programado por cateter venoso central, maior mortalidade e internações hospitalares.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              "eTFG < 30 mL/min/1,73m² (Estágios G4 e G5).",
              "Albuminúria maciça (RAC > 300 mg/g) ou proteinúria nefrótica.",
              "Declínio sustentado da eTFG > 5 mL/min/1,73m² por ano.",
              "Hematúria microscópica persistente de origem glomerular ou cilindros celulares.",
              "Hipertensão arterial refratária (não controlada com 4 classes de anti-hipertensivos).",
              "Potássio sérico persistente > 5,5 mEq/L apesar de medidas dietéticas e diuréticos.",
              "Suspeita de doença renal hereditária (ex: Rins Policísticos - DRPAD).",
              "Complicações metabólicas complexas de difícil manejo na atenção primária."
            ].map((crit, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                <CheckCircle2 size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <span>{crit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREPARAÇÃO PARA TERAPIA RENAL SUBSTITUTIVA (TRS) */}
      <section id="dialysis-prep" className="space-y-4">
        <div className="card p-6 md:p-7 border border-line bg-card rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-navy">
              <Clock size={20} className="text-brand-blue" />
              <h3 className="font-bold text-base">Preparação Estruturada para Diálise e Transplante (G4 e G5)</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue">
              Idealmente iniciada com eTFG &lt; 20 mL/min
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
              <span className="text-xs font-bold text-brand-blue uppercase">1. Confecção de Fístula (FAV)</span>
              <p className="text-xs text-ink-muted leading-relaxed">
                Confecção cirúrgica de fístula arteriovenosa de 3 a 6 meses antes da necessidade estimada de hemodiálise, preservando a rede venosa do membro superior não dominante.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase">2. Transplante Renal Preemptivo</span>
              <p className="text-xs text-ink-muted leading-relaxed">
                Avaliação e listagem para transplante de doador vivo ou falecido antes mesmo de iniciar diálise quando a eTFG estiver &lt; 15-20 mL/min (melhor sobrevida a longo prazo).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-line space-y-2">
              <span className="text-xs font-bold text-purple-600 uppercase">3. Vacinação Prévia</span>
              <p className="text-xs text-ink-muted leading-relaxed">
                Imunização contra Hepatite B com dose dobrada (40 mcg aos 0, 1, 2 e 6 meses), Pneumocócica conjugada/polissacarídica e Influenza anual.
              </p>
            </div>
          </div>

          {/* Banner de atalho para o módulo de diálise */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-brand-blue/10 to-transparent border border-brand-blue/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-blue text-white shadow-sm shrink-0">
                <Zap size={18} />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-xs sm:text-sm">Aprofundamento: Indicações e Vias de Diálise</h4>
                <p className="text-[11px] text-ink-muted">Consulte critérios de urgência (AEIOU), regra dos 6 da FAV, cateteres e diálise peritoneal.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveTab('dialise');
                document.getElementById('complications')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 rounded-xl bg-brand-blue hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <span>Abrir Módulo de Diálise</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
