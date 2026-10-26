import React, { useState } from 'react';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Flame, 
  Heart, 
  Info, 
  Layers, 
  Pill, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Syringe, 
  Zap,
  ArrowRight,
  HelpCircle,
  Filter,
  Check,
  X
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function CKDDialysis() {
  const [activeTab, setActiveTab] = useState<'indicacoes' | 'hemodialise' | 'peritoneal' | 'crrt' | 'comparativo' | 'simulador'>('indicacoes');
  const [selectedAEIOU, setSelectedAEIOU] = useState<'A' | 'E' | 'I' | 'O' | 'U'>('E');
  const [selectedVessel, setSelectedVessel] = useState<'fav' | 'ptfe' | 'shilley' | 'permcath'>('fav');
  const [selectedDPModal, setSelectedDPModal] = useState<'principios' | 'tenckhoff' | 'peritonite'>('principios');

  // Estado do simulador interativo
  const [simCaseId, setSimCaseId] = useState<number>(1);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const SIM_CASES = [
    {
      id: 1,
      title: "Caso 1: Paciente Jovem com DRC G5 Programada",
      desc: "Homem de 34 anos, nefropatia por IgA, TFG de 8 mL/min/1,73m², estável, trabalha em escritório, leito venoso de membros superiores preservado. Sem sinais de uremia franca imediata.",
      question: "Qual o acesso e modalidade de escolha para o planejamento a médio prazo?",
      options: [
        { id: 'fav', label: 'Confecção programada de Fístula Arteriovenosa (FAV) rádio-cefálica em braço não-dominante', correct: true, justification: 'Excelente! A FAV rádio-cefálica (Brescia-Cimino) é o padrão-ouro de acesso vascular por apresentar menor taxa de infecção e maior patência. Deve ser confeccionada com pelo menos 3 a 6 meses de antecedência.' },
        { id: 'shilley', label: 'Implante imediato de Cateter Duplo Lúmen temporário em veia subclávia', correct: false, justification: 'Incorreto e perigoso! Cateter em subclávia gera alta taxa de estenose venosa central (40-50%), inutilizando o membro para futuras FAVs. Além disso, o paciente está clinicamente estável, não necessitando de acesso de urgência.' },
        { id: 'ptfe', label: 'Implante de Prótese Arteriovenosa de PTFE braquial', correct: false, justification: 'Incorreto. Próteses são reservadas para quando o patrimônio venoso superficial do paciente foi exaurido ou é comprovadamente inadequado pelo eco-Doppler.' }
      ]
    },
    {
      id: 2,
      title: "Caso 2: Emergência com Hipercalemia Refratária",
      desc: "Mulher de 62 anos com DRC G4 agudizada após uso inadvertido de AINE, anúrica há 18h. K+ = 7,2 mEq/L, ECG com onda T apiculada em tenda e perda de onda P. Foi administrado Gluconato de Cálcio e Glicoinsulina, sem queda do potássio.",
      question: "Qual a conduta dialítica imediata mais adequada?",
      options: [
        { id: 'urg_hd', label: 'Hemodiálise de emergência via Cateter Duplo Lúmen temporário em Veia Jugular Interna Direita', correct: true, justification: 'Correto! Trata-se do "E" do mnemônico AEIOU (Hipercalemia grave refratária com repercussão eletrocardiográfica). A via preferencial é a VJI direita (trajeto reto até o átrio direito).' },
        { id: 'fav_urg', label: 'Chamar cirurgião vascular para confecção e punção imediata de FAV', correct: false, justification: 'Incorreto. Uma FAV precisa de no mínimo 6 a 8 semanas para maturação e não pode ser puncionada agudamente sem risco de hematoma expansivo e destruição do vaso.' },
        { id: 'dp_urg', label: 'Passagem de Tenckhoff e Diálise Peritoneal de urgência para lavagem rápida de K+', correct: false, justification: 'Incorreto. A Hemodiálise intermitente tem uma taxa de depuração de potássio e solutos muito superior à DP, sendo a escolha mandatória na hipercalemia com risco iminente de assistolia/FV.' }
      ]
    },
    {
      id: 3,
      title: "Caso 3: Cardiopata com Fração de Ejeção Reduzida e Hipotensão",
      desc: "Homem de 71 anos com Miocardiopatia Isquêmica grave (FEVE = 22%), hipotenso crônico (PA 90/60 mmHg), necessitando iniciar terapia renal substitutiva por sobrecarga crônica refratária.",
      question: "Qual modalidade apresenta menor impacto hemodinâmico e melhor adaptação?",
      options: [
        { id: 'dp_cardio', label: 'Diálise Peritoneal Domiciliar (DPAC ou DPA)', correct: true, justification: 'Excelente! A Diálise Peritoneal realiza trocas contínuas e lentas de fluidos, sem as oscilações hemodinâmicas bruscas ou ultrafiltração rápida da hemodiálise convencional, sendo ideal para cardiopatas graves com fração de ejeção severamente deprimida.' },
        { id: 'hd_alta_uf', label: 'Hemodiálise convencional com ultrafiltração acelerada de 4 litros em 3 horas', correct: false, justification: 'Incorreto. Ultrafiltração rápida em paciente com FEVE 22% provocará choque cardiogênico/hipotensão grave e miocárdio atordoado (myocardial stunning).' }
      ]
    }
  ];

  const currentCase = SIM_CASES.find(c => c.id === simCaseId) || SIM_CASES[0];

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-5xl mx-auto">
      {/* HEADER GERAL */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-br from-card via-card to-slate-50 dark:to-slate-900/40 p-6 md:p-8 rounded-3xl border border-line shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-blue">
            <Zap size={18} className="text-amber-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Terapia Renal Substitutiva (TRS)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Indicações e Vias de Acesso para Diálise
          </h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            Abordagem completa baseada nas diretrizes <strong>KDIGO 2024 / SBN / KDOQI</strong>: indicações de urgência (AEIOU), planejamento eletivo (Estudo IDEAL), anatomia e complicações dos acessos vasculares (FAV, Prótese, CVC) e Diálise Peritoneal.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0">
          <ShieldAlert size={24} />
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider block">Decisão Crítica</span>
            <span className="text-xs font-black">Salva-Vidas & Acesso</span>
          </div>
        </div>
      </header>

      {/* TABS DE NAVEGAÇÃO SUPERIOR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-line">
        {[
          { id: 'indicacoes', label: '1. Indicações (AEIOU)', icon: AlertCircle },
          { id: 'hemodialise', label: '2. Hemodiálise & FAV', icon: Activity },
          { id: 'peritoneal', label: '3. Diálise Peritoneal', icon: Layers },
          { id: 'crrt', label: '4. Métodos de UTI', icon: Flame },
          { id: 'comparativo', label: '5. HD vs DP', icon: Filter },
          { id: 'simulador', label: '6. Casos & Decisão', icon: HelpCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center",
              activeTab === tab.id
                ? "bg-card text-brand-navy shadow-sm border border-line"
                : "text-ink-muted hover:text-brand-navy hover:bg-white/40 dark:hover:bg-slate-700/40"
            )}
          >
            <tab.icon size={14} className={activeTab === tab.id ? "text-brand-blue" : ""} />
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. SEÇÃO DE INDICAÇÕES (AEIOU + ELETIVAS) */}
      {activeTab === 'indicacoes' && (
        <div className="space-y-6">
          {/* Card Inicial: Urgência vs Eletivo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloco de Urgência: AEIOU */}
            <div className="card p-6 md:p-7 border border-rose-500/30 bg-card rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider bg-rose-500/10 px-2.5 py-1 rounded-full">
                  Emergência Médica
                </span>
                <span className="text-xs font-mono font-bold text-rose-600">Tempo-Dependente</span>
              </div>
              <h2 className="text-lg font-black text-brand-navy flex items-center gap-2">
                <ShieldAlert className="text-rose-500" size={20} />
                Indicações de Urgência — Mnemônico AEIOU
              </h2>
              <p className="text-xs text-ink-muted leading-relaxed">
                Aplicável tanto na <strong>Injúria Renal Aguda (LRA)</strong> quanto na <strong>DRC Agudizada</strong> ou estágio G5 sem diálise prévia. Clique em cada letra abaixo para ver o limiar de corte:
              </p>

              {/* Botões do AEIOU */}
              <div className="grid grid-cols-5 gap-1.5 pt-2">
                {(['A', 'E', 'I', 'O', 'U'] as const).map((letra) => (
                  <button
                    key={letra}
                    type="button"
                    onClick={() => setSelectedAEIOU(letra)}
                    className={cn(
                      "py-3 rounded-2xl font-black text-base transition-all flex flex-col items-center justify-center border",
                      selectedAEIOU === letra
                        ? "bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-500/30 scale-105"
                        : "bg-bg text-brand-navy border-line hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    )}
                  >
                    <span>{letra}</span>
                    <span className="text-[9px] font-medium opacity-80 mt-0.5">
                      {letra === 'A' ? 'Acidose' : letra === 'E' ? 'Eletrólito' : letra === 'I' ? 'Intox.' : letra === 'O' ? 'Overload' : 'Uremia'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Painel de Conteúdo da Letra Selecionada */}
              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs space-y-2 mt-3">
                {selectedAEIOU === 'A' && (
                  <div>
                    <h4 className="font-bold text-rose-700 dark:text-rose-400 text-sm">A — Acidose Metabólica Refratária</h4>
                    <p className="text-ink leading-relaxed mt-1">
                      • <strong>Critério:</strong> pH &lt; 7,15 ou Bicarbonato sérico &lt; 10-12 mEq/L persistente.
                      <br />
                      • <strong>Refratariedade:</strong> Falha de resposta ao bicarbonato de sódio intravenoso ou contraindicação à sua administração devido à sobrecarga hídrica grave e hipernatremia.
                    </p>
                  </div>
                )}
                {selectedAEIOU === 'E' && (
                  <div>
                    <h4 className="font-bold text-rose-700 dark:text-rose-400 text-sm">E — Eletrólitos: Hipercalemia Grave Refratária</h4>
                    <p className="text-ink leading-relaxed mt-1">
                      • <strong>Critério:</strong> K⁺ &gt; 6,5 mEq/L ou elevação rápida progressiva.
                      <br />
                      • <strong>Repercussão ECG:</strong> Onda T simétrica pontiaguda, achatamento da onda P, alargamento de QRS ou ritmo sinoventricular.
                      <br />
                      • <strong>Ação:</strong> Diálise imediata se não houver normalização rápida após gluconato de cálcio 10% e solução polarizante (glicoinsulina).
                    </p>
                  </div>
                )}
                {selectedAEIOU === 'I' && (
                  <div>
                    <h4 className="font-bold text-rose-700 dark:text-rose-400 text-sm">I — Intoxicações Exógenas Dialisáveis (Mnemônico SLIME)</h4>
                    <p className="text-ink leading-relaxed mt-1">
                      Substâncias de baixo peso molecular, baixo volume de distribuição e baixa ligação proteica:
                      <br />
                      • <strong>S</strong>alicilatos (AAS em dose tóxica);
                      <br />
                      • <strong>L</strong>ítio (nível sérico &gt; 2,5 - 4,0 mEq/L ou neurotoxicidade);
                      <br />
                      • <strong>I</strong>sopropanol;
                      <br />
                      • <strong>M</strong>etanol (risco iminente de cegueira e acidose severa);
                      <br />
                      • <strong>E</strong>tilenoglicol (risco de LRA anúrica por cristais de oxalato). Outros: Teofilina, Barbitúricos.
                    </p>
                  </div>
                )}
                {selectedAEIOU === 'O' && (
                  <div>
                    <h4 className="font-bold text-rose-700 dark:text-rose-400 text-sm">O — Overload (Hipervolemia com Edema Agudo de Pulmão)</h4>
                    <p className="text-ink leading-relaxed mt-1">
                      • <strong>Critério:</strong> Congestão pulmonar com hipoxemia refratária a doses maciças de furosemida intravenosa (ex: bolus de 100-200 mg ou infusão contínua).
                      <br />
                      • <strong>Manejo:</strong> Ultrafiltração isolada ou associada à hemodiálise para alívio mecânico imediato da pré-carga.
                    </p>
                  </div>
                )}
                {selectedAEIOU === 'U' && (
                  <div>
                    <h4 className="font-bold text-rose-700 dark:text-rose-400 text-sm">U — Uremia Grave / Sintomática</h4>
                    <p className="text-ink leading-relaxed mt-1">
                      • <strong>Encefalopatia Urêmica:</strong> Rebaixamento do sensório, confusão mental, asterixis (flapping) e crises convulsivas.
                      <br />
                      • <strong>Pericardite Urêmica:</strong> Dor torácica pleurítica e atrito pericárdico. <span className="text-rose-600 font-bold">*ATENÇÃO: Diálise SEM heparina sistêmica</span> pelo alto risco de tamponamento cardíaco hemorrágico!
                      <br />
                      • <strong>Diátese Hemorrágica:</strong> Sangramento mucoso/gastrointestinal por disfunção plaquetária induzida por toxinas urêmicas.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bloco Eletivo: Estudo IDEAL e Quando Iniciar */}
            <div className="card p-6 md:p-7 border border-line bg-card rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider bg-brand-blue/10 px-2.5 py-1 rounded-full">
                    Planejamento Ambulatorial
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-blue">KDIGO 2024</span>
                </div>
                <h2 className="text-lg font-black text-brand-navy flex items-center gap-2">
                  <Clock className="text-brand-blue" size={20} />
                  Indicações Eletivas & O Estudo IDEAL
                </h2>
                <p className="text-xs text-ink-muted leading-relaxed mt-2">
                  O início programado da TRS deve ser individualizado com base no quadro clínico e sintomas do paciente, e <strong>NUNCA</strong> exclusivamente em um número isolado da Taxa de Filtração Glomerular (TFG).
                </p>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-bg border border-line space-y-1">
                    <strong className="text-brand-navy block">Quando Planejar o Início:</strong>
                    <p className="text-ink-muted">
                      • TFG &lt; 15 mL/min/1,73m² (Estágio G5): Iniciar preparo formal da via de acesso (FAV com 6 meses de antecedência ou Tenckhoff com 1 mês).
                      <br />
                      • TFG entre 5 e 10 mL/min: Início usual na presença de desnutrição, náuseas persistentes, hipervolemia refratária ou astenia progressiva.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-ink">
                    <strong className="text-amber-800 dark:text-amber-300 block mb-1">
                      Pérola de Prova: Ensaio Clínico IDEAL (NEJM):
                    </strong>
                    Comparou início precoce planejado (TFG 10-14 mL/min) versus início tardio com sintomas (TFG 5-7 mL/min). 
                    <strong>Resultado: Não houve diferença estatística na sobrevida ou qualidade de vida!</strong> O início precoce apenas aumentou o tempo exposto a complicações da diálise. Portanto: <em>Trate o paciente, não o valor isolado de TFG</em>.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-card border border-line text-xs flex items-center justify-between">
                <span className="text-ink-muted">Meta de vacinação pré-diálise:</span>
                <span className="font-bold text-brand-navy">Hepatite B (dose dobrada 40 mcg em 4 doses)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SEÇÃO DE HEMODIÁLISE & VIAS DE ACESSO */}
      {activeTab === 'hemodialise' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-card border border-line shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-brand-navy flex items-center gap-2">
                <Activity className="text-brand-blue" size={22} />
                Vias de Acesso Vascular para Hemodiálise (KDOQI / SBN)
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                A fístula arteriovenosa autóloga é a "linha da vida" do paciente renal crônico. Conheça as indicações, maturação e complicações de cada acesso.
              </p>
            </div>
            
            {/* Seletor de tipo de acesso */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl shrink-0">
              {[
                { id: 'fav', label: '1. FAV Nativa (Padrão-Ouro)' },
                { id: 'ptfe', label: '2. Prótese (PTFE)' },
                { id: 'shilley', label: '3. CVC Temporário' },
                { id: 'permcath', label: '4. CVC Longa (Permcath)' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVessel(v.id as any)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                    selectedVessel === v.id
                      ? "bg-card text-brand-navy shadow-sm"
                      : "text-ink-muted hover:text-brand-navy"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Aba 1: FÍSTULA ARTERIOVENOSA */}
          {selectedVessel === 'fav' && (
            <div className="card p-6 md:p-8 border border-emerald-500/30 bg-card rounded-3xl shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-line">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    Acesso Vascular Padrão-Ouro
                  </span>
                  <h3 className="text-xl font-black text-brand-navy mt-1">Fístula Arteriovenosa (FAV) Nativa</h3>
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-xl">
                  Maior Patência · Menor Infecção · Menor Mortalidade
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                {/* Sequência Anatômica Preferencial */}
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-3">
                  <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xs">1</span>
                    Ordem de Preferência Anatômica
                  </h4>
                  <p className="text-ink-muted leading-relaxed">
                    Sempre iniciar o mais distal possível no membro <strong>não-dominante</strong> para preservar o patrimônio vascular proximal:
                  </p>
                  <ol className="space-y-2 text-ink">
                    <li className="p-2 rounded-xl bg-card border border-line">
                      <strong>1ª Escolha:</strong> Radio-cefálica no punho (Fístula de Brescia-Cimino).
                    </li>
                    <li className="p-2 rounded-xl bg-card border border-line">
                      <strong>2ª Escolha:</strong> Braquio-cefálica na prega do cotovelo.
                    </li>
                    <li className="p-2 rounded-xl bg-card border border-line">
                      <strong>3ª Escolha:</strong> Braquio-basílica com superficialização/transposição cirúrgica.
                    </li>
                  </ol>
                </div>

                {/* Critérios de Maturação (Regra dos 6) */}
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-3">
                  <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-xs">2</span>
                    A Regra dos "6" da Maturação
                  </h4>
                  <p className="text-ink-muted leading-relaxed">
                    A FAV precisa arterializar a parede venosa para suportar duas agulhas de grande calibre (15-16G):
                  </p>
                  <ul className="space-y-1.5 text-ink font-mono text-[11px]">
                    <li className="p-2 rounded-xl bg-card border border-line">• <strong>≥ 6 semanas</strong> de confecção prévia antes da 1ª punção;</li>
                    <li className="p-2 rounded-xl bg-card border border-line">• Fluxo sanguíneo <strong>≥ 600 mL/min</strong> no Doppler;</li>
                    <li className="p-2 rounded-xl bg-card border border-line">• Diâmetro venoso <strong>≥ 6 mm</strong>;</li>
                    <li className="p-2 rounded-xl bg-card border border-line">• Profundidade <strong>≤ 6 mm</strong> da superfície cutânea.</li>
                  </ul>
                </div>

                {/* Complicações Clínicas da FAV */}
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-3">
                  <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center text-xs">3</span>
                    Complicações Principais
                  </h4>
                  <div className="space-y-2 text-[11px] text-ink">
                    <div className="p-2 rounded-xl bg-card border border-line">
                      <strong className="text-rose-600 block">Síndrome do Roubo Arterial (Steal):</strong>
                      Inversão de fluxo na artéria distal. Mão fria, pálida, cianótica e com dor durante a sessão de diálise.
                    </div>
                    <div className="p-2 rounded-xl bg-card border border-line">
                      <strong className="text-amber-600 block">Estenose e Trombose:</strong>
                      Perda progressiva de frêmito ("thrill") e sopro; aumento da pressão venosa na máquina.
                    </div>
                    <div className="p-2 rounded-xl bg-card border border-line">
                      <strong className="text-purple-600 block">IC de Alto Débito:</strong>
                      Se fluxo excessivo da FAV (&gt; 1,5 a 2,0 L/min), sobrecarregando o ventrículo direito.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Aba 2: PRÓTESE ARTERIOVENOSA */}
          {selectedVessel === 'ptfe' && (
            <div className="card p-6 md:p-8 border border-line bg-card rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="text-lg font-black text-brand-navy">Prótese Arteriovenosa (Enxerto de PTFE)</h3>
                <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-xl">2ª Opção de Acesso</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Tubo sintético de politetrafluoroetileno expandido (PTFE) interposto cirurgicamente entre uma artéria e uma veia profunda.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                  <h5 className="font-bold text-brand-navy">Indicações e Vantagens:</h5>
                  <ul className="space-y-1 text-ink-muted">
                    <li>• Indicada na falência ou ausência de veias superficiais viáveis;</li>
                    <li>• Maturação mais rápida: pode ser puncionada em <strong>2 a 3 semanas</strong> (ou alguns dias com próteses especiais de canulação precoce);</li>
                    <li>• Fácil canulação por possuir trajeto retilíneo e uniforme.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                  <h5 className="font-bold text-rose-700 dark:text-rose-300">Desvantagens e Riscos:</h5>
                  <ul className="space-y-1 text-ink">
                    <li>• <strong>Alta taxa de trombose:</strong> hiperplasia miointimal na anastomose com a veia de drenagem;</li>
                    <li>• Risco de infecção bacteriana significativamente maior que a FAV nativa;</li>
                    <li>• Vida útil mediana menor (geralmente 1 a 2 anos).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Aba 3: CVC TEMPORÁRIO (SHILLEY) */}
          {selectedVessel === 'shilley' && (
            <div className="card p-6 md:p-8 border border-line bg-card rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="text-lg font-black text-brand-navy">Cateter Venoso Central Temporário (Duplo Lúmen Não Tunelizado)</h3>
                <span className="text-xs font-bold text-rose-600 bg-rose-500/10 px-3 py-1 rounded-xl">Apenas Emergências</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Cateter semi-rígido de duplo lúmen inserido por punção guiada por ultrassonografia à beira-leito para uso imediato em indicações de urgência.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <h5 className="font-bold text-emerald-700 dark:text-emerald-400">1ª Escolha: VJI Direita</h5>
                  <p className="text-ink leading-relaxed">
                    Veia Jugular Interna Direita possui trajeto anatômico reto direto até a veia cava superior e átrio direito. Menor risco de trombose e melhor fluxo sanguíneo.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <h5 className="font-bold text-amber-700 dark:text-amber-400">2ª Escolha: Veia Femoral</h5>
                  <p className="text-ink leading-relaxed">
                    Excelente em parada cardiorrespiratória ou urgência extrema. <strong>Tempo máximo de permanência: 48 a 72 horas</strong> devido ao risco astronômico de infecção bacteriana e trombose venosa profunda (TVP).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 space-y-2">
                  <h5 className="font-bold text-rose-700 dark:text-rose-400">PROIBIDO: Veia Subclávia</h5>
                  <p className="text-ink leading-relaxed">
                    <strong>Regra de Ouro da Nefrologia:</strong> NUNCA puncionar veia subclávia para hemodiálise temporária. Causa estenose venosa central em 40 a 50% dos casos, inutilizando para sempre o membro ipsilateral para FAV!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Aba 4: PERMCATH */}
          {selectedVessel === 'permcath' && (
            <div className="card p-6 md:p-8 border border-line bg-card rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="text-lg font-black text-brand-navy">Cateter Tunelizado de Longa Permanência (Permcath)</h3>
                <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-xl">Ponte ou Definitivo</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Cateter de silicone flexível com túnel subcutâneo e um anel de poliéster/Dacron (cuff) que promove fibrose tecidual, fixando o cateter e criando uma barreira mecânica à migração bacteriana cutânea.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                  <h5 className="font-bold text-brand-navy">Principais Indicações:</h5>
                  <ul className="space-y-1.5 text-ink-muted">
                    <li>• <strong>Ponte de maturação:</strong> Pacientes que necessitam de diálise antes das 6-8 semanas de maturação da FAV;</li>
                    <li>• <strong>Acesso definitivo:</strong> Idosos frágeis, choque cardiogênico com ausência total de leito vascular periférico viável;</li>
                    <li>• Falência múltipla de acessos vasculares periféricos prévios.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                  <h5 className="font-bold text-brand-navy">Cuidados e Complicações:</h5>
                  <ul className="space-y-1.5 text-ink-muted">
                    <li>• Risco de <strong>bacteremia relacionada ao cateter (BRC)</strong>: patógenos comuns são *S. aureus* e *S. epidermidis*;</li>
                    <li>• Trombose intraluminal: tratada com selo de heparina ou instilação de fibrinolítico (Alteplase/rt-PA);</li>
                    <li>• Formação de bainha de fibrina na ponta do cateter.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. SEÇÃO DE DIÁLISE PERITONEAL */}
      {activeTab === 'peritoneal' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-card border border-line shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-line">
              <div>
                <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider bg-brand-blue/10 px-2.5 py-1 rounded-full">
                  Modalidade Domiciliar
                </span>
                <h2 className="text-xl font-black text-brand-navy mt-1">Diálise Peritoneal (DPAC & DPA)</h2>
              </div>
              
              <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                {[
                  { id: 'principios', label: 'Como Funciona' },
                  { id: 'tenckhoff', label: 'Cateter de Tenckhoff' },
                  { id: 'peritonite', label: 'Peritonite (Diagnóstico & Tto)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedDPModal(s.id as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                      selectedDPModal === s.id
                        ? "bg-card text-brand-navy shadow-sm"
                        : "text-ink-muted hover:text-brand-navy"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo da DP */}
            {selectedDPModal === 'principios' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                    <h4 className="font-bold text-brand-navy text-sm">Fisiologia do Peritônio como Filtro</h4>
                    <p className="text-ink-muted leading-relaxed">
                      O peritônio é uma membrana serosa natural altamente vascularizada (~1 a 2 m² de área de superfície). Ao infundir um dialisato na cavidade abdominal:
                    </p>
                    <ul className="space-y-1.5 text-ink">
                      <li>• <strong>Difusão:</strong> Ureia, creatinina e potássio passam do sangue capilar para o dialisato por gradiente de concentração;</li>
                      <li>• <strong>Ultrafiltração Osmótica:</strong> A presença de <strong>Glicose (1,5%, 2,5% ou 4,25%)</strong> ou <strong>Icodextrina</strong> atrai água livre dos capilares para o abdome por gradiente osmótico.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                    <h4 className="font-bold text-brand-navy text-sm">Modalidades Clínicas de DP</h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-card border border-line">
                        <strong className="text-brand-navy block">DPAC (Ambulatorial Contínua):</strong>
                        O próprio paciente realiza 3 a 4 trocas manuais diurnas de bolsa (~2 litros cada troca) por gravidade. Sem necessidade de máquina.
                      </div>
                      <div className="p-3 rounded-xl bg-card border border-line">
                        <strong className="text-brand-blue block">DPA (Automatizada):</strong>
                        Conexão noturna a uma cicladora automática enquanto o paciente dorme (8 a 10 horas). Liberdade diurna total. Preferida para trabalhadores e crianças.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">
                    Vantagem Clínica Central da Diálise Peritoneal:
                  </strong>
                  Excelente preservação da <strong>função renal residual (FRR)</strong> por muito mais tempo que a hemodiálise. A diurese residual facilita o controle hídrico, reduz restrição dietética e associa-se a menor mortalidade cardiovascular nos primeiros 2 a 3 anos de terapia.
                </div>
              </div>
            )}

            {selectedDPModal === 'tenckhoff' && (
              <div className="space-y-4 text-xs">
                <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                  <h4 className="font-bold text-brand-navy text-sm">Acesso: Cateter de Tenckhoff</h4>
                  <p className="text-ink-muted leading-relaxed">
                    Tubo flexível de silicone com orifícios laterais na ponta, implantado cirurgicamente ou por técnica percutânea na fossa ilíaca ou linha média infraumbilical, alojando-se no fundo de saco de Douglas.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-card border border-line">
                      <strong className="text-brand-navy block mb-1">Cuffs de Dacron:</strong>
                      Dois anéis (um profundo no reto abdominal e outro subcutâneo) que impedem vazamento de líquido e barram bactérias.
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-line">
                      <strong className="text-brand-navy block mb-1">Tempo de Espera ("Break-in"):</strong>
                      Aguardar idealmente <strong>10 a 14 dias</strong> após implante antes de iniciar trocas com volumes normais, para cicatrização e prevenção de hérnias/vazamentos.
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-line">
                      <strong className="text-brand-navy block mb-1">Contraindicações da DP:</strong>
                      Aderências abdominais extensas (cirurgias prévias múltiplas), ostomias ativas na parede, hérnias diafragmáticas ou doença inflamatória intestinal grave.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedDPModal === 'peritonite' && (
              <div className="space-y-5 text-xs">
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black text-sm uppercase">
                    <ShieldAlert size={18} />
                    <span>Peritonite na Diálise Peritoneal — Principal Causa de Falência da Técnica</span>
                  </div>
                  <p className="text-ink leading-relaxed">
                    O diagnóstico requer a presença de <strong>pelo menos 2 dos 3 critérios</strong> da ISPD (Sociedade Internacional de Diálise Peritoneal):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-card border border-rose-200">
                      <strong>1. Clínica:</strong> Dor abdominal difusa, náuseas e/ou febre.
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-rose-200">
                      <strong>2. Efluente Turvo:</strong> Leucócitos &gt; 100/μL com &gt; 50% de polimorfonucleares (PMN).
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-rose-200">
                      <strong>3. Microbiologia:</strong> Bacterioscopia (Gram) ou cultura positiva no efluente.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                    <h5 className="font-bold text-brand-navy">Agentes Etiológicos Mais Comuns:</h5>
                    <ul className="space-y-1.5 text-ink-muted">
                      <li>• <strong>Gram-positivos (~50-60%):</strong> *Staphylococcus epidermidis* (toque inadvertido/contaminação de conexões) e *Staphylococcus aureus* (associado a infecção de orifício de saída);</li>
                      <li>• <strong>Gram-negativos (~25%):</strong> *E. coli*, *Klebsiella*, *Pseudomonas*;</li>
                      <li>• <strong>Fúngica (&lt; 5%):</strong> *Candida albicans* (alta mortalidade, <em>remoção imediata do cateter mandatória!</em>).</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-bg border border-line space-y-2">
                    <h5 className="font-bold text-brand-navy">Tratamento Farmacológico Padrão:</h5>
                    <p className="text-ink-muted">
                      A via preferencial é <strong>Intraperitoneal (IP)</strong> infundida diretamente na bolsa dialítica:
                    </p>
                    <div className="p-3 rounded-xl bg-card border border-line font-mono text-[11px] space-y-1">
                      <div>• Cobertura Gram-positivo: <strong>Cefazolina ou Vancomicina</strong>;</div>
                      <div>• Cobertura Gram-negativo: <strong>Ceftazidima ou Amicacina</strong>;</div>
                      <div>• Duração usual: 14 a 21 dias.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. MÉTODOS DE UTI (CRRT / SLED) */}
      {activeTab === 'crrt' && (
        <div className="space-y-6">
          <div className="card p-6 md:p-8 border border-purple-500/30 bg-card rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider bg-purple-500/10 px-2.5 py-1 rounded-full">
                  Terapia Intensiva
                </span>
                <h2 className="text-xl font-black text-brand-navy mt-1">Métodos Contínuos (CRRT) e Híbridos (SLED)</h2>
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-500/10 px-3 py-1 rounded-xl">
                Instabilidade Hemodinâmica Grave
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                  <Flame size={16} className="text-purple-600" />
                  Por que usar métodos contínuos em UTI?
                </h4>
                <p className="text-ink-muted leading-relaxed">
                  A hemodiálise convencional dura 3 a 4 horas e retira grandes volumes de líquido em pouco tempo (alta taxa de ultrafiltração horária). Em pacientes em <strong>choque séptico ou cardiogênico com altas doses de noradrenalina</strong>, isso precipita colapso circulatório imediato.
                </p>
                <div className="p-3 rounded-xl bg-card border border-line space-y-1">
                  <strong>Indicação Maior:</strong>
                  <p className="text-ink-muted">
                    LRA / DRC dialítica com choque circulatório grave refratário ou Hipertensão Intracraniana (evita o edema cerebral por desequilíbrio osmótico agudo).
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
                <h4 className="font-bold text-brand-navy text-sm">Modalidades de CRRT</h4>
                <ul className="space-y-2 text-ink">
                  <li className="p-2.5 rounded-xl bg-card border border-line">
                    <strong>CVVH (Hemofiltração Contínua):</strong> Baseada puramente em <em>convecção</em>. Excelente para depuração de moléculas médias.
                  </li>
                  <li className="p-2.5 rounded-xl bg-card border border-line">
                    <strong>CVVHD (Hemodiálise Contínua):</strong> Baseada em <em>difusão</em> através de dialisato em contracorrente.
                  </li>
                  <li className="p-2.5 rounded-xl bg-card border border-line">
                    <strong>CVVHDF (Hemodiafiltração Contínua):</strong> Combinação simultânea de difusão e convecção. Máxima eficiência depurativa.
                  </li>
                  <li className="p-2.5 rounded-xl bg-card border border-line">
                    <strong>SLED (Diálise Lenta Estendida):</strong> Método híbrido usando máquinas convencionais em sessões de 6 a 12 horas com menor fluxo de sangue e dialisato.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TABELA COMPARATIVA: HD vs DP */}
      {activeTab === 'comparativo' && (
        <div className="space-y-6">
          <div className="card p-6 md:p-8 border border-line bg-card rounded-3xl shadow-sm space-y-6">
            <h2 className="text-xl font-black text-brand-navy">
              Comparativo Abrangente: Hemodiálise (HD) vs Diálise Peritoneal (DP)
            </h2>
            <p className="text-xs text-ink-muted">
              Não existe modalidade absoluta superior: a escolha deve priorizar a anatomia vascular, comorbidades cardíacas e o projeto de vida do paciente.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-line bg-bg">
                    <th className="p-3.5 font-bold text-brand-navy">Parâmetro</th>
                    <th className="p-3.5 font-bold text-brand-blue">Hemodiálise (HD)</th>
                    <th className="p-3.5 font-bold text-emerald-600">Diálise Peritoneal (DP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink">
                  <tr>
                    <td className="p-3.5 font-bold">Local de Realização</td>
                    <td className="p-3.5">Centro / Clínica de Diálise (3x/semana, 4h/sessão)</td>
                    <td className="p-3.5">Domiciliar (paciente ou cuidador realiza)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Via de Acesso</td>
                    <td className="p-3.5">Fístula Arteriovenosa (FAV), Prótese ou CVC</td>
                    <td className="p-3.5">Cateter Peritoneal (Tenckhoff) intra-abdominal</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Estabilidade Hemodinâmica</td>
                    <td className="p-3.5">Flutuações bruscas; risco de hipotensão intradialítica</td>
                    <td className="p-3.5">Estável e contínua (excelente para cardiopatas)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Preservação da Função Residual</td>
                    <td className="p-3.5">Perda mais precoce da diurese residual</td>
                    <td className="p-3.5 text-emerald-700 dark:text-emerald-400 font-bold">Maior preservação da urina residual por anos</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Restrição Hídrica e Dieta</td>
                    <td className="p-3.5">Rigorosa (ganho interdialítico máx 1,5 - 2,0 kg)</td>
                    <td className="p-3.5">Mais flexível devido à ultrafiltração diária</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Complicação Infecciosa Típica</td>
                    <td className="p-3.5">Bacteremia por Cateter / Infecção de FAV</td>
                    <td className="p-3.5">Peritonite infecciosa / Infecção de orifício de saída</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Indicação Preferencial</td>
                    <td className="p-3.5">Cirurgias abdominais prévias extensas, falta de suporte familiar</td>
                    <td className="p-3.5">Crianças, trabalhadores ativos, IC com FE reduzida, sem leito vascular</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. SIMULADOR CLÍNICO DE TOMADA DE DECISÃO */}
      {activeTab === 'simulador' && (
        <div className="space-y-6">
          <div className="card p-6 md:p-8 border border-brand-blue/30 bg-card rounded-3xl shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-line">
              <div>
                <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider bg-brand-blue/10 px-2.5 py-1 rounded-full">
                  Desafio Prático
                </span>
                <h2 className="text-xl font-black text-brand-navy mt-1">Simulador de Decisão Clínica em TRS</h2>
              </div>
              
              {/* Botões de troca de caso */}
              <div className="flex gap-2">
                {SIM_CASES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSimCaseId(c.id);
                      setUserChoice(null);
                      setShowFeedback(false);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                      simCaseId === c.id
                        ? "bg-brand-blue text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-ink-muted hover:text-brand-navy"
                    )}
                  >
                    Caso {c.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo do Caso Selecionado */}
            <div className="p-5 rounded-2xl bg-bg border border-line space-y-3">
              <h3 className="font-bold text-brand-navy text-base">{currentCase.title}</h3>
              <p className="text-xs text-ink leading-relaxed bg-card p-4 rounded-xl border border-line">
                {currentCase.desc}
              </p>
              <div className="font-bold text-brand-navy text-xs pt-2">
                {currentCase.question}
              </div>
            </div>

            {/* Opções de Resposta */}
            <div className="space-y-2.5">
              {currentCase.options.map((opt) => {
                const isSelected = userChoice === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setUserChoice(opt.id);
                      setShowFeedback(true);
                    }}
                    className={cn(
                      "w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-start justify-between gap-3",
                      isSelected
                        ? opt.correct
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/30 font-semibold"
                          : "bg-rose-500/10 border-rose-500 text-rose-950 dark:text-rose-200 ring-2 ring-rose-500/30 font-semibold"
                        : "bg-card border-line hover:border-brand-blue/40 text-ink"
                    )}
                  >
                    <span>{opt.label}</span>
                    {showFeedback && isSelected && (
                      opt.correct ? (
                        <Check className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                      ) : (
                        <X className="text-rose-500 shrink-0 mt-0.5" size={18} />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Fundamentado */}
            {showFeedback && userChoice && (
              <div className={cn(
                "p-4 rounded-2xl text-xs space-y-2 animate-fadeIn",
                currentCase.options.find(o => o.id === userChoice)?.correct
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200"
              )}>
                <div className="font-bold text-sm flex items-center gap-2">
                  {currentCase.options.find(o => o.id === userChoice)?.correct ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald-600" />
                      <span>Resposta Correta!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={18} className="text-rose-600" />
                      <span>Conduta Inadequada</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">
                  {currentCase.options.find(o => o.id === userChoice)?.justification}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
