import React, { useState, useMemo, useEffect } from 'react';
import { 
  Pill, 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Activity, 
  Sliders, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Info, 
  Heart, 
  Sparkles, 
  Zap, 
  AlertOctagon, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Stethoscope,
  Filter,
  RefreshCw,
  Printer,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Moon,
  Sun,
  Brain,
  Target,
  Layers,
  Microscope,
  ShieldCheck
} from 'lucide-react';
import { 
  DRUGS_DATABASE, 
  DRUG_INTERACTIONS_DATABASE, 
  ANTIDOTES_DATABASE, 
  DrugItem, 
  DrugInteraction, 
  InteractionSeverity 
} from './data/medicamentosData';

export interface MedicamentosMainProps {
  selectedDrugId?: string | null;
  onSelectDrug?: (drugId: string | null) => void;
  externalActiveTab?: 'resumo-droga' | 'interacoes' | 'antidotos' | 'resumo';
  onExternalTabChange?: (tab: 'resumo-droga' | 'interacoes' | 'antidotos' | 'resumo') => void;
}

export default function MedicamentosMain({
  selectedDrugId,
  onSelectDrug,
  externalActiveTab,
  onExternalTabChange
}: MedicamentosMainProps) {
  const [activeTab, setActiveTab] = useState<'resumo-droga' | 'interacoes' | 'antidotos' | 'resumo'>('resumo-droga');
  
  // Drug Interaction Checker State
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>(['enalapril', 'ibuprofeno']);
  const [copied, setCopied] = useState(false);
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>(null);
  const [selectedDoseProfileIndex, setSelectedDoseProfileIndex] = useState<number>(0);

  // Sync external tab
  useEffect(() => {
    if (externalActiveTab) {
      setActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  // When selectedDrugId changes from sidebar, switch to drug summary
  useEffect(() => {
    if (selectedDrugId) {
      setActiveTab('resumo-droga');
      setSelectedDoseProfileIndex(0);
    }
  }, [selectedDrugId]);

  // Current drug selected for study
  const currentDrug: DrugItem = useMemo(() => {
    if (selectedDrugId) {
      const found = DRUGS_DATABASE.find(d => d.id === selectedDrugId);
      if (found) return found;
    }
    return DRUGS_DATABASE[0];
  }, [selectedDrugId]);

  // Next and previous drug in the database
  const currentDrugIndex = useMemo(() => {
    return DRUGS_DATABASE.findIndex(d => d.id === currentDrug.id);
  }, [currentDrug]);

  const handleNextDrug = () => {
    const nextIdx = (currentDrugIndex + 1) % DRUGS_DATABASE.length;
    onSelectDrug?.(DRUGS_DATABASE[nextIdx].id);
  };

  const handlePrevDrug = () => {
    const prevIdx = (currentDrugIndex - 1 + DRUGS_DATABASE.length) % DRUGS_DATABASE.length;
    onSelectDrug?.(DRUGS_DATABASE[prevIdx].id);
  };

  // Interactions involving the current drug
  const currentDrugInteractions = useMemo(() => {
    return DRUG_INTERACTIONS_DATABASE.filter(i => 
      i.drugAId === currentDrug.id || i.drugBId === currentDrug.id
    );
  }, [currentDrug]);

  // Selected drug objects for checker
  const selectedDrugs = useMemo(() => {
    return DRUGS_DATABASE.filter(d => selectedDrugIds.includes(d.id));
  }, [selectedDrugIds]);

  // Detected interactions among selected drugs
  const detectedInteractions = useMemo(() => {
    const results: DrugInteraction[] = [];
    if (selectedDrugIds.length < 2) return results;

    for (let i = 0; i < selectedDrugIds.length; i++) {
      for (let j = i + 1; j < selectedDrugIds.length; j++) {
        const idA = selectedDrugIds[i];
        const idB = selectedDrugIds[j];

        const match = DRUG_INTERACTIONS_DATABASE.find(inter => 
          (inter.drugAId === idA && inter.drugBId === idB) ||
          (inter.drugAId === idB && inter.drugBId === idA)
        );

        if (match) {
          results.push(match);
        }
      }
    }
    return results;
  }, [selectedDrugIds]);

  // Severity count
  const severityStats = useMemo(() => {
    let contraindicated = 0;
    let major = 0;
    let moderate = 0;
    let minor = 0;

    detectedInteractions.forEach(i => {
      if (i.severity === 'contraindicated') contraindicated++;
      else if (i.severity === 'major') major++;
      else if (i.severity === 'moderate') moderate++;
      else if (i.severity === 'minor') minor++;
    });

    return { contraindicated, major, moderate, minor, total: detectedInteractions.length };
  }, [detectedInteractions]);

  // Toggle drug in checker
  const toggleDrugInChecker = (drugId: string) => {
    setSelectedDrugIds(prev => 
      prev.includes(drugId) ? prev.filter(id => id !== drugId) : [...prev, drugId]
    );
  };

  // Preset clinical scenarios
  const applyPresetScenario = (scenario: 'triplice' | 'cardiopata' | 'psiquiatria' | 'sedacao') => {
    if (scenario === 'triplice') {
      setSelectedDrugIds(['enalapril', 'espironolactona', 'ibuprofeno']);
    } else if (scenario === 'cardiopata') {
      setSelectedDrugIds(['varfarina', 'amiodarona', 'digoxina', 'clopidogrel']);
    } else if (scenario === 'psiquiatria') {
      setSelectedDrugIds(['litio', 'enalapril', 'ibuprofeno']);
    } else if (scenario === 'sedacao') {
      setSelectedDrugIds(['diazepam', 'morfina']);
    }
    setActiveTab('interacoes');
    onExternalTabChange?.('interacoes');
  };

  // Copy prescription report to clipboard
  const copyInteractionReport = () => {
    let report = `RELATÓRIO DE SEGURANÇA FARMACOLÓGICA & INTERAÇÕES MEDICAMENTOSAS\n`;
    report += `Data da Análise: ${new Date().toLocaleDateString('pt-BR')}\n`;
    report += `Medicamentos Avaliados (${selectedDrugs.length}): ${selectedDrugs.map(d => d.name).join(', ')}\n\n`;

    report += `RESUMO DE RISCO:\n`;
    report += `• Interações Contraindicadas / Graves: ${severityStats.contraindicated}\n`;
    report += `• Interações de Alta Gravidade (Monitorar): ${severityStats.major}\n`;
    report += `• Interações Moderadas: ${severityStats.moderate}\n`;
    report += `• Total de Interações Mapeadas: ${severityStats.total}\n\n`;

    if (detectedInteractions.length === 0) {
      report += `Nenhuma interação grave ou contraindicada foi identificada entre os fármacos selecionados na base de dados.\n`;
    } else {
      report += `DETALHAMENTO DAS INTERAÇÕES:\n`;
      detectedInteractions.forEach((inter, idx) => {
        const drugA = DRUGS_DATABASE.find(d => d.id === inter.drugAId)?.name || inter.drugAId;
        const drugB = DRUGS_DATABASE.find(d => d.id === inter.drugBId)?.name || inter.drugBId;
        report += `\n[${idx + 1}] ${drugA} + ${drugB} (${inter.severityLabel})\n`;
        report += `Mecanismo: ${inter.mechanism}\n`;
        report += `Risco Clínico: ${inter.clinicalRisk}\n`;
        report += `Conduta Recomendada: ${inter.management}\n`;
      });
    }

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTabClick = (tab: 'resumo-droga' | 'interacoes' | 'antidotos' | 'resumo') => {
    setActiveTab(tab);
    onExternalTabChange?.(tab);
  };

  const isCurrentDrugInChecker = selectedDrugIds.includes(currentDrug.id);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-20">
      
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-gradient-to-r from-blue-950/40 via-card to-purple-950/30 border border-purple-500/20 rounded-2xl shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-purple-400">
            <span className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Pill size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
              {activeTab === 'resumo-droga' ? 'Ficha Clínica Farmacológica' : activeTab === 'interacoes' ? 'Rastreador de Interações' : activeTab === 'antidotos' ? 'Tabela de Antídotos' : 'Parecer Farmacológico'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight flex items-center gap-3">
            {activeTab === 'resumo-droga' ? (
              <>
                <span>{currentDrug.name}</span>
                <span className="text-sm font-normal text-ink-muted">({currentDrug.brandNames.join(', ')})</span>
              </>
            ) : activeTab === 'interacoes' ? (
              'Rastreador de Interações Medicamentosas'
            ) : activeTab === 'antidotos' ? (
              'Guia Rápido de Antídotos & Toxicologia'
            ) : (
              'Parecer de Segurança Farmacológica'
            )}
          </h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            {activeTab === 'resumo-droga' ? (
              'Ficha clínica completa: indicações formais, posologia usual, fatores de comorbidade (DRC, idosos, gestação), toxicidade com antídoto e interações diretas.'
            ) : (
              'Ferramenta complementar de análise farmacológica e segurança clínica.'
            )}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {activeTab !== 'resumo-droga' ? (
            <button
              onClick={() => handleTabClick('resumo-droga')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
              Voltar à Ficha da Droga ({currentDrug.name})
            </button>
          ) : (
            <>
              <button
                onClick={() => handleTabClick('antidotos')}
                className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-card border border-line hover:border-red-500/40 text-brand-navy flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShieldAlert size={16} className="text-red-400" />
                Guia de Antídotos
              </button>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-brand-blue hover:bg-blue-600 text-white flex items-center gap-2 transition-all cursor-pointer shadow-md"
                title="Imprimir Ficha Clínica"
              >
                <Printer size={16} />
                Imprimir Ficha
              </button>
            </>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: RESUMO CLÍNICO DA DROGA SELECIONADA (FOCO INDIVIDUAL) */}
      {/* ==================================================================== */}
      {activeTab === 'resumo-droga' && (
        <div className="flex flex-col gap-6">
          
          {/* Drug Header & Navigation Card */}
          <div className="card p-6 border border-purple-500/30 bg-gradient-to-r from-purple-950/20 via-card to-blue-950/15 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  {currentDrug.systemLabel}
                </span>
                <span className="text-xs text-ink-muted font-mono">
                  • {currentDrug.classCategory}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight flex items-center gap-3">
                {currentDrug.name}
              </h2>

              <div className="text-xs text-ink-muted flex items-center gap-2">
                <span className="font-bold text-slate-400">Nomes comerciais mais comuns:</span>
                <span className="text-brand-navy font-semibold">{currentDrug.brandNames.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* CRITICAL WARNING ALERT (FARMACOVIGILÂNCIA & ALERTA MÁXIMO) */}
          {currentDrug.warningAlert && (
            <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-card to-amber-950/20 border-2 border-red-500/40 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert size={18} className="text-red-500 shrink-0" />
                <span>Alerta Crítico de Farmacovigilância & Segurança Clínica</span>
              </div>
              <p className="text-xs md:text-sm text-red-200/90 leading-relaxed font-medium">
                {currentDrug.warningAlert}
              </p>
            </div>
          )}

          {/* SPECIAL CLINICAL MODULE: VASCULITE ANCA-POSITIVA POR PROPILTIOURACIL (ESTUDOS SCIELO) */}
          {currentDrug.id === 'propiltiouracil' && (
            <div className="card p-6 border-2 border-red-500/40 bg-gradient-to-br from-red-950/30 via-card to-amber-950/20 rounded-2xl shadow-xl space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-red-500/30 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30">
                      <ShieldAlert size={18} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-300 font-mono">
                      Farmacovigilância Endócrina • Estudos SciELO & Diretrizes SBEM/ATA
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy tracking-tight flex items-center gap-2">
                    <span>Vasculite ANCA-Positiva Induzida por Propiltiouracil (PTU)</span>
                  </h3>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    O uso prolongado do PTU está associado à produção anômala de anticorpos anticitoplasma de neutrófilos (p-ANCA / anti-mieloperoxidase), desencadeando ataque autoimune à parede de pequenos vasos sanguíneos com dano tecidual multissistêmico.
                  </p>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/35 shrink-0 self-start md:self-auto shadow-sm">
                  ⚠️ p-ANCA / anti-MPO Positivo
                </span>
              </div>

              {/* 4 Pillars Grid: O que é, Mecanismo, Sintomas, Conduta */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs items-stretch">
                {/* Pilar 1: O que é o PTU */}
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-blue-300 px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30">
                        1. Fármaco & Uso
                      </span>
                      <span className="text-[10px] text-blue-300 font-mono">Tionamida</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span>Remédio para tratar <strong>hipertireoidismo</strong> (Graves e tempestade tireoidiana).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span>Bloqueia síntese hormonal e inibe conversão periférica T4 → T3.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span>Geralmente seguro inicialmente, mas o <strong>uso por muito tempo traz riscos imunológicos cumulativos</strong>.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-blue-500/20 text-[10px] font-mono text-blue-300/80">
                    Tempo de uso é fator de risco
                  </div>
                </div>

                {/* Pilar 2: Como a Vasculite Acontece */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-purple-300 px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                        2. Fisiopatologia
                      </span>
                      <span className="text-[10px] text-purple-300 font-mono">Anticorpo ANCA</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold shrink-0">•</span>
                        <span>O corpo produz anticorpos anormais chamados <strong>p-ANCA (anti-mieloperoxidase)</strong>.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold shrink-0">•</span>
                        <span>Esse anticorpo estimula neutrófilos a atacar o endotélio dos vasos sanguíneos por engano.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold shrink-0">•</span>
                        <span>Gera inflamação destrutiva, necrose vascular e isquemia nos tecidos corporais.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-purple-500/20 text-[10px] font-mono text-purple-300/80">
                    Autoimunidade induzida por droga
                  </div>
                </div>

                {/* Pilar 3: Sintomas Comuns */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                        3. Sintomas Clínicos
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono">Sinais de Alarme</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span><strong>Pele:</strong> manchas vermelhas, feridas dolorosas ou roxos (púrpura palpável e livedo).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span><strong>Articulações:</strong> dor forte nas juntas (poliartralgia intensa e artrite).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span><strong>Geral:</strong> febre inexplicada e cansaço extremo (astenia).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span><strong>Casos graves:</strong> lesão renal (hematúria/proteinúria) ou sangramento nos pulmões (hemoptise).</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-500/20 text-[10px] font-mono text-amber-300/80">
                    Tríade: Pele + Juntas + Febre
                  </div>
                </div>

                {/* Pilar 4: O que Fazer (Conduta) */}
                <div className="p-4 rounded-xl bg-red-950/25 border border-red-500/35 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-red-300 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30">
                        4. Conduta Médica
                      </span>
                      <span className="text-[10px] text-red-300 font-mono">Ação Imediata</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-red-400 font-bold shrink-0">•</span>
                        <span><strong>Parar o remédio:</strong> suspender o propiltiouracil imediatamente e nunca reexpor.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-red-400 font-bold shrink-0">•</span>
                        <span><strong>Corticosteroides:</strong> Prednisona 1 mg/kg/dia ou pulsoterapia com Metilprednisolona em casos graves.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-red-400 font-bold shrink-0">•</span>
                        <span><strong>Acompanhamento:</strong> dosar p-ANCA, urina 1, creatinina e Rx de tórax para vigiar órgãos vitais.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-red-500/20 text-[10px] font-mono text-red-300/80">
                    Interrupção é mandatória
                  </div>
                </div>
              </div>

              {/* Critical Patient Guidance Banner */}
              <div className="p-3.5 rounded-xl bg-bg/90 border border-red-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <span className="text-base">📢</span>
                  <span><strong>Orientação ao Paciente:</strong> Se estiver em uso de Propiltiouracil e notar manchas vermelhas na pele, febre inexplicada ou dor forte nas juntas, <strong>procure atendimento médico de urgência</strong> para investigação de vasculite ANCA.</span>
                </div>
                <span className="text-[10px] font-mono text-red-400 font-bold px-2 py-1 rounded bg-red-500/10 border border-red-500/20 shrink-0 hidden sm:inline">
                  Diretriz SciELO
                </span>
              </div>
            </div>
          )}

          {/* SPECIAL CLINICAL MODULE: LÚPUS INDUZIDO POR FÁRMACOS (DILE) & FARMACOLOGIA DA HIDRALAZINA */}
          {currentDrug.id === 'hidralazina' && (
            <div className="card p-6 border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-card to-rose-950/20 rounded-2xl shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-500/30 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <ShieldAlert size={18} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                      Farmacovigilância Cardiovascular • Lúpus Induzido por Drogas (DILE)
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy tracking-tight flex items-center gap-2">
                    <span>Hidralazina: Efeitos Vasculares & Lúpus Farmaco-Induzido (DILE)</span>
                  </h3>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    A Hidralazina é um vasodilatador arteriolar potente. O uso contínuo (especialmente &gt; 200 mg/dia e em indivíduos acetiladores lentos via NAT2) está intimamente associado ao desenvolvimento de Lúpus Induzido por Medicamentos, mediado por anticorpos anti-histona.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/35 shadow-sm">
                    🧬 Acetilador Lento (NAT2)
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/35 shadow-sm">
                    ⚠️ Anti-Histona (+) &gt; 95%
                  </span>
                </div>
              </div>

              {/* 4 Pillars Grid: Farmacologia, Fisiopatologia DILE, Sintomas, Conduta */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs items-stretch">
                {/* Pilar 1: Farmacodinâmica & Efeitos Vasculares */}
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-blue-300 px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30">
                        1. Ação Vascular
                      </span>
                      <span className="text-[10px] text-blue-300 font-mono">Arteríolas</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span><strong>Vasodilatação direta:</strong> relaxa musculatura lisa das arteríolas de resistência, com ação venosa quase nula.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span><strong>Taquicardia reflexa:</strong> a queda súbita da pós-carga dispara barorreceptores, elevando FC, DC e consumo miocárdico de O₂.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span><strong>Retenção hidrossalina:</strong> ativa o SRAA. Exige <strong>associação com betabloqueador + diurético</strong>.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-blue-500/20 text-[10px] font-mono text-blue-300/80">
                    Nunca usar em monoterapia
                  </div>
                </div>

                {/* Pilar 2: Como o Lúpus Acontece (Fisiopatologia & Genética) */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-purple-300 px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                        2. Fisiopatologia DILE
                      </span>
                      <span className="text-[10px] text-purple-300 font-mono">NAT2 & Histonas</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold shrink-0">•</span>
                        <span><strong>Acetiladores Lentos (NAT2):</strong> metabolizam a hidralazina mais devagar, acumulando intermediários reativos citotóxicos.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold shrink-0">•</span>
                        <span><strong>Neoantígenos nucleares:</strong> o fármaco liga-se a histonas cromatínicas em neutrófilos ativados.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold shrink-0">•</span>
                        <span><strong>Autoanticorpos Anti-Histona:</strong> gerados em <strong>&gt; 95% dos casos de DILE</strong> por hidralazina.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-purple-500/20 text-[10px] font-mono text-purple-300/80">
                    Risco sobe com doses &gt; 200 mg/dia
                  </div>
                </div>

                {/* Pilar 3: Sintomas Clínicos do Lúpus por Medicamento */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                        3. Sintomas Clínicos
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono">Tríade Clássica</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span><strong>Articulações (90%):</strong> poliartralgia e artrite simétrica não erosiva (mãos, punhos, joelhos).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span><strong>Serosite:</strong> pleurite e pericardite com dor torácica pleurítica e atrito audível.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span><strong>Constitucionais & Pele:</strong> febre inexplicada, astenia, mialgia difusa e rash máculo-papular eritematoso.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-amber-500/20 text-[10px] font-mono text-amber-300/80">
                    Rins e SNC são tipicamente poupados
                  </div>
                </div>

                {/* Pilar 4: Conduta Médica & Manejo */}
                <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-500/35 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-rose-300 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
                        4. Conduta Médica
                      </span>
                      <span className="text-[10px] text-rose-300 font-mono">Resolução Rápida</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px] leading-snug">
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold shrink-0">•</span>
                        <span><strong>Parar a hidralazina imediatamente:</strong> suspensão mandatória; os sintomas regridem espontaneamente em semanas.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold shrink-0">•</span>
                        <span><strong>Corticosteroides breves:</strong> Prednisona 0,5 a 1 mg/kg/dia se dor articular severa ou serosite/pericardite.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold shrink-0">•</span>
                        <span><strong>Confirmação diagnóstica:</strong> solicitar FAN, Anti-Histona (+) e comprovar Anti-dsDNA negativo e C3/C4 normais.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-2 border-t border-rose-500/20 text-[10px] font-mono text-rose-300/80">
                    Contraindicação formal de reexposição
                  </div>
                </div>
              </div>

              {/* Tabela Comparativa: Lúpus Induzido por Hidralazina (DILE) vs. LES Clássico */}
              <div className="rounded-xl border border-amber-500/30 bg-bg/80 p-4 md:p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2.5">
                  <span className="p-1 rounded bg-amber-500/20 text-amber-300">
                    <Sliders size={15} />
                  </span>
                  <h4 className="text-xs md:text-sm font-bold text-brand-navy tracking-tight">
                    Quadro Comparativo de Diferenciação: Lúpus Induzido (DILE) vs. Lúpus Sistêmico Clássico (LES)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* DILE */}
                  <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/20 space-y-2">
                    <div className="flex items-center justify-between text-amber-300 font-bold text-xs pb-1 border-b border-amber-500/20">
                      <span>Lúpus Farmaco-Induzido (DILE - Hidralazina)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20">Reversível</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px]">
                      <li>• <strong>Sexo &amp; Faixa Etária:</strong> Relação H:M equilibrada (~1:1); mais comum em adultos de meia-idade e idosos hipertensos.</li>
                      <li>• <strong>Anticorpos Marcadores:</strong> <strong>Anti-Histona positivo em &gt; 95%</strong> dos casos; <strong>Anti-dsDNA quase invariavelmente NEGATIVO</strong>.</li>
                      <li>• <strong>Complemento Sérico:</strong> Níveis normais de C3 e C4 (sem hipocomplementemia de consumo).</li>
                      <li>• <strong>Acometimento de Órgãos Vitais:</strong> Nefrite lúpica e psicose/convulsão do SNC são <strong>raríssimos</strong>.</li>
                      <li>• <strong>Evolução Clínica:</strong> Resolução completa em semanas a meses após <strong>suspender a hidralazina</strong>.</li>
                    </ul>
                  </div>

                  {/* LES */}
                  <div className="p-3.5 rounded-lg bg-blue-950/20 border border-blue-500/20 space-y-2">
                    <div className="flex items-center justify-between text-blue-300 font-bold text-xs pb-1 border-b border-blue-500/20">
                      <span>Lúpus Eritematoso Sistêmico Idiopático (LES)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20">Crônico</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-200 text-[11px]">
                      <li>• <strong>Sexo &amp; Faixa Etária:</strong> Forte predomínio feminino (mulheres em idade fértil, ~9:1).</li>
                      <li>• <strong>Anticorpos Marcadores:</strong> <strong>Anti-dsDNA e Anti-Sm positivos e específicos</strong>; Anti-Histona presente em apenas ~50%.</li>
                      <li>• <strong>Complemento Sérico:</strong> Consumo ativo de C3 e C4 durante as crises lúpicas inflamatórias.</li>
                      <li>• <strong>Acometimento de Órgãos Vitais:</strong> Glomerulonefrite proliferativa e comprometimento do SNC são comuns e graves.</li>
                      <li>• <strong>Evolução Clínica:</strong> Doença crônica autoimune progressiva que necessita de imunossupressão contínua.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Critical Patient Guidance Banner */}
              <div className="p-3.5 rounded-xl bg-bg/90 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <span className="text-base">📢</span>
                  <span><strong>Orientação ao Paciente &amp; Prescritor:</strong> Pacientes em uso de Hidralazina que apresentarem dores articulares persistentes, dor no peito ventilatório-dependente ou febre inexplicada devem <strong>interromper o fármaco e procurar avaliação médica imediata</strong> para dosagem de Anti-Histona e FAN.</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 shrink-0 hidden sm:inline">
                  Farmacovigilância
                </span>
              </div>
            </div>
          )}

          {/* SPECIAL CLINICAL MODULE: 3 DOSE-DEPENDENT FUNCTIONS (Conceito de Stephen Stahl) */}
          {currentDrug.doseFunctionProfiles && currentDrug.doseFunctionProfiles.length > 0 && (
            <div className="card p-6 border-2 border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-card to-blue-950/20 rounded-2xl shadow-xl space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-purple-500/30 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <Brain size={18} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                      Neuropsicofarmacologia • Conceito de Stephen Stahl
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy tracking-tight flex items-center gap-2">
                    <span>As 3 Funções Farmacológicas da Quetiapina Conforme a Dose</span>
                  </h3>
                  <p className="text-xs text-ink-muted max-w-2xl leading-relaxed">
                    A ocupação de receptores cerebrais e o perfil de ação terapêutica mudam de forma dose-dependente: indutora de sono em dose baixa, antidepressiva em dose moderada, e estabilizador de humor / antipsicótico em dose alta.
                  </p>
                </div>

                {/* Quick Dose Filter Switcher */}
                <div className="flex items-center gap-1.5 bg-bg/80 p-1.5 rounded-xl border border-line shrink-0">
                  {currentDrug.doseFunctionProfiles.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDoseProfileIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedDoseProfileIndex === idx
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-ink-muted hover:text-brand-navy hover:bg-card'
                      }`}
                    >
                      {idx === 0 ? <Moon size={13} /> : idx === 1 ? <Sun size={13} /> : <Brain size={13} />}
                      <span>{p.functionName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Columns Grid: Side-by-Side Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {currentDrug.doseFunctionProfiles.map((profile, idx) => {
                  const isActive = selectedDoseProfileIndex === idx;
                  const isBlue = profile.badgeColor === 'blue';
                  const isPurple = profile.badgeColor === 'purple';

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDoseProfileIndex(idx)}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 cursor-pointer relative ${
                        isActive
                          ? isBlue 
                            ? 'border-blue-500 bg-blue-950/20 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10'
                            : isPurple
                            ? 'border-purple-500 bg-purple-950/25 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/10'
                            : 'border-emerald-500 bg-emerald-950/20 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10'
                          : 'border-line bg-card/60 hover:bg-bg/80 hover:border-slate-400'
                      }`}
                    >
                      {/* Top Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                            isBlue ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            isPurple ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {idx === 0 ? <Moon size={11} /> : idx === 1 ? <Sun size={11} /> : <Brain size={11} />}
                            {profile.functionName}
                          </span>
                          <span className="text-xs font-mono font-black text-brand-navy">
                            {profile.doseRange.split('(')[0]}
                          </span>
                        </div>

                        <h4 className="text-base font-extrabold text-brand-navy tracking-tight leading-snug">
                          {profile.title}
                        </h4>

                        <div className="p-2.5 rounded-xl bg-bg border border-line/60 text-[11px] font-mono leading-relaxed space-y-1">
                          <div className="text-ink-muted">
                            <strong className="text-slate-300">Receptores-Alvo:</strong> {profile.targetReceptors}
                          </div>
                          <div className="text-ink-muted">
                            <strong className="text-slate-300">Ocupação:</strong> {profile.receptorOccupancy}
                          </div>
                        </div>

                        <p className="text-xs text-ink leading-relaxed pt-1">
                          {profile.description}
                        </p>
                      </div>

                      {/* Clinical Pearl Box */}
                      <div className={`p-3 rounded-xl border text-[11px] space-y-1 ${
                        isBlue ? 'bg-blue-950/30 border-blue-500/20 text-blue-200' :
                        isPurple ? 'bg-purple-950/30 border-purple-500/20 text-purple-200' :
                        'bg-emerald-950/30 border-emerald-500/20 text-emerald-200'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                          <Sparkles size={12} />
                          <span>Pérola Clínica & Dica Prática</span>
                        </div>
                        <p className="leading-relaxed">
                          {profile.clinicalPearl}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Prescription Takeaway */}
              <div className="p-4 rounded-xl bg-bg border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  <span className="text-ink-muted">
                    <strong className="text-brand-navy">Regra Prática de Prescrição:</strong> Não use doses baixas (25-50 mg) esperando tratar mania ou depressão bipolar; e ao prescrever para insônia, evite doses elevadas para não induzir bloqueio dopaminérgico e ganho de peso desnecessário.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SPECIAL CLINICAL MODULE: ESPECTRO ANTIMICROBIANO & COBERTURA MICROBIOLÓGICA */}
          {/* SPECIAL CLINICAL MODULE: ESPECTRO ANTIMICROBIANO & COBERTURA MICROBIOLÓGICA */}
          {currentDrug.antibioticSpectrum && (
            <div className="card p-5 md:p-6 border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950/25 via-card to-blue-950/20 rounded-2xl shadow-xl space-y-6 overflow-hidden">
              
              {/* Module Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-500/30 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Microscope size={18} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                      Infectologia & Microbiologia Clínica Aplicada
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy tracking-tight flex items-center gap-2">
                    <span>Espectro Antimicrobiano & Cobertura Bacteriana Detalhada</span>
                  </h3>
                  <p className="text-xs text-ink-muted max-w-3xl leading-relaxed">
                    Mapeamento minucioso de suscetibilidade bacteriana: Gram-positivos, Gram-negativos, anaeróbios, germes atípicos e lacunas críticas de cobertura.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-bg/95 border border-emerald-500/35 text-xs text-left lg:text-right shadow-sm shrink-0 w-full lg:w-auto lg:max-w-xs">
                  <div className="flex items-center gap-1.5 lg:justify-end text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                    <Sliders size={13} />
                    <span>Índice PK/PD Chave</span>
                  </div>
                  <div className="font-mono font-bold text-sm text-brand-navy mt-0.5">
                    {currentDrug.id === 'vancomicina' 
                      ? 'AUC24/MIC ≥ 400 - 600'
                      : currentDrug.antibioticSpectrum.pkPdIndex.split('.')[0]}
                  </div>
                  <div className="text-[10px] text-ink-muted leading-tight mt-0.5">
                    {currentDrug.id === 'vancomicina'
                      ? 'Alvo de vale sérico (trough): 15-20 mcg/mL • Tempo-dependente'
                      : (currentDrug.antibioticSpectrum.pkPdIndex.split('.')[1] || 'Eficácia clínica com alvo farmacodinâmico estrito')}
                  </div>
                </div>
              </div>

              {/* 4 Columns Grid: Gram+, Gram-, Anaeróbios, Atípicos (Perfeitamente no Esquadro) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch text-xs">
                
                {/* Gram-Positivos */}
                <div className="min-w-0 h-full p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col justify-between shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <span className="font-mono text-[10px] font-black uppercase text-purple-300 px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                        Gram-Positivos (+)
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded font-mono bg-purple-500/20 text-purple-200 border border-purple-500/30">
                        {currentDrug.id === 'vancomicina' ? 'MRSA Padrão-Ouro' : 'Ativo / Sensível'}
                      </span>
                    </div>
                    <div className="text-[10px] text-purple-300/80 font-mono">Cocos & Bacilos Gram(+)</div>
                    <ul className="space-y-1.5 pt-0.5">
                      {currentDrug.antibioticSpectrum.gramPositive.map((bact, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-slate-200 text-[11px] leading-snug">
                          <span className="text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                          <span>{bact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-purple-500/20 text-[10px] font-mono text-purple-300/80 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    <span>{currentDrug.id === 'vancomicina' ? 'Alvo: MRSA, S. epidermidis, E. faecalis' : 'Perfil bactericida Gram(+)'}</span>
                  </div>
                </div>

                {/* Gram-Negativos */}
                {(() => {
                  const isVancomicina = currentDrug.id === 'vancomicina';
                  return (
                    <div className={`min-w-0 h-full p-4 rounded-xl flex flex-col justify-between shadow-sm ${
                      isVancomicina 
                        ? 'bg-rose-950/20 border border-rose-500/35' 
                        : 'bg-blue-950/20 border border-blue-500/30'
                    }`}>
                      <div className="space-y-3">
                        <div className={`flex items-center justify-between border-b pb-2 ${
                          isVancomicina ? 'border-rose-500/20' : 'border-blue-500/20'
                        }`}>
                          <span className={`font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            isVancomicina 
                              ? 'text-rose-300 bg-rose-500/20 border border-rose-500/30' 
                              : 'text-blue-300 bg-blue-500/20 border border-blue-500/30'
                          }`}>
                            Gram-Negativos (-)
                          </span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            isVancomicina 
                              ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30' 
                              : 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                          }`}>
                            {isVancomicina ? '🚫 Zero Ação' : 'Enterobactérias / BGN'}
                          </span>
                        </div>
                        <div className={`text-[10px] font-mono ${isVancomicina ? 'text-rose-300/80' : 'text-blue-300/80'}`}>
                          {isVancomicina ? 'Resistência Intrínseca Natural' : 'Enterobactérias & Bacilos Gram(-)'}
                        </div>
                        <ul className="space-y-1.5 pt-0.5">
                          {currentDrug.antibioticSpectrum.gramNegative.map((bact, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-slate-200 text-[11px] leading-snug">
                              <span className={`${isVancomicina ? 'text-rose-400' : 'text-blue-400'} font-bold shrink-0 mt-0.5`}>
                                {isVancomicina && idx === 0 ? '⚠️' : '•'}
                              </span>
                              <span className={isVancomicina && idx === 0 ? 'font-bold text-rose-200' : ''}>{bact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`mt-4 pt-2.5 border-t text-[10px] font-mono flex items-center gap-1.5 ${
                        isVancomicina 
                          ? 'border-rose-500/20 text-rose-300/80' 
                          : 'border-blue-500/20 text-blue-300/80'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isVancomicina ? 'bg-rose-400' : 'bg-blue-400'}`}></span>
                        <span>{isVancomicina ? 'Barreira de membrana externa impermeável' : 'Cobertura de bacilos Gram-negativos'}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Anaeróbios */}
                {(() => {
                  const isVancomicina = currentDrug.id === 'vancomicina';
                  return (
                    <div className="min-w-0 h-full p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                          <span className="font-mono text-[10px] font-black uppercase text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                            Anaeróbios
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
                            {isVancomicina ? '💊 Seletivo (VO)' : 'Intestinais & Orais'}
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-300/80 font-mono">Microbiota Anaeróbia</div>
                        <ul className="space-y-1.5 pt-0.5">
                          {currentDrug.antibioticSpectrum.anaerobes.map((bact, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-slate-200 text-[11px] leading-snug">
                              <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                              <span>{bact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-2.5 border-t border-emerald-500/20 text-[10px] font-mono text-emerald-300/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{isVancomicina ? 'Exclusivo VO para C. difficile (Zero ação B. fragilis)' : 'Perfil de suscetibilidade anaeróbia'}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Atípicos & Intracelulares */}
                {(() => {
                  const hasAtypicals = currentDrug.id === 'azitromicina';
                  return (
                    <div className="min-w-0 h-full p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                          <span className="font-mono text-[10px] font-black uppercase text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                            Atípicos & Outros
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded font-mono bg-amber-500/20 text-amber-200 border border-amber-500/30">
                            {hasAtypicals ? '✅ Padrão-Ouro' : '🚫 Sem Ação'}
                          </span>
                        </div>
                        <div className="text-[10px] text-amber-300/80 font-mono">Intracelulares & Especiais</div>
                        <ul className="space-y-1.5 pt-0.5">
                          {(currentDrug.antibioticSpectrum.atypicals || ['Sem ação relevante']).map((bact, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-slate-200 text-[11px] leading-snug">
                              <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                              <span>{bact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-2.5 border-t border-amber-500/20 text-[10px] font-mono text-amber-300/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{hasAtypicals ? 'Mycoplasma, Chlamydia, Legionella' : 'Sem penetração celular eucariótica'}</span>
                      </div>
                    </div>
                  );
                })()}

              </div>

              {/* Critical Gaps & Clinical Pearls Box (Alinhamento Simétrico no Esquadro) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1 items-stretch">
                
                {/* Gaps de Cobertura */}
                <div className="min-w-0 h-full p-4 md:p-5 rounded-xl bg-red-950/30 border border-red-500/35 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-300 font-bold text-xs uppercase tracking-wider">
                      <ShieldAlert size={16} className="text-red-400 shrink-0" />
                      <span>Lacunas Críticas de Espectro (O que NÃO cobre):</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-200 leading-relaxed list-disc pl-4">
                      {currentDrug.antibioticSpectrum.criticalGaps.map((gap, idx) => (
                        <li key={idx} className="text-red-200/90 font-medium">
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-red-500/20 text-[10px] font-mono text-red-300/70">
                    ⚠️ Atenção às falhas terapêuticas: exigir fármacos complementares se suspeita desses germes.
                  </div>
                </div>

                {/* Pérolas Clínicas & Regras de Ouro */}
                <div className="min-w-0 h-full p-4 md:p-5 rounded-xl bg-bg border border-line flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-brand-navy font-bold text-xs uppercase tracking-wider">
                      <Sparkles size={16} className="text-amber-400 shrink-0" />
                      <span>Pérolas de Prescrição & Alertas PK/PD:</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-ink-muted leading-relaxed">
                      {(currentDrug.antibioticSpectrum.clinicalPearls || []).map((pearl, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold shrink-0">💡</span>
                          <span>{pearl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-line/60 text-[10px] font-mono text-emerald-400/80">
                    📌 Regras fundamentais de monitorização e segurança de infusão.
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Posology & Mechanism Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-5 border border-line flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Activity size={14} className="text-blue-400" />
                  Posologia Usual & Vias de Administração:
                </span>
                <p className="text-sm font-mono text-brand-navy font-bold bg-bg/80 p-3 rounded-xl border border-line/60 leading-relaxed">
                  {currentDrug.commonDose}
                </p>
              </div>
            </div>

            <div className="card p-5 border border-line flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Sliders size={14} className="text-purple-400" />
                  Mecanismo Farmacológico & Fisiopatologia:
                </span>
                <p className="text-xs text-ink leading-relaxed bg-bg/80 p-3 rounded-xl border border-line/60">
                  {currentDrug.mechanismOfAction}
                </p>
              </div>
            </div>
          </div>

          {/* Patologias Associadas & Aplicação Clínica */}
          <div className="card p-6 border border-line space-y-3">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <Stethoscope size={16} className="text-brand-blue" />
              Patologias Associadas & Indicações Clínicas Formais
            </h3>
            <p className="text-xs text-ink-muted">
              Cenários clínicos onde o uso deste fármaco é preconizado pelas diretrizes médicas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              {currentDrug.indications.map((ind, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-bg border border-line/70 flex items-start gap-2.5 text-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-blue/15 text-brand-blue font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-brand-navy leading-snug">
                    {ind}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FATORES DE COMORBIDADE & AJUSTES DE DOSE */}
          <div className="card p-6 border border-line space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-3">
              <div>
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <Sliders size={18} className="text-blue-400" />
                  Fatores de Comorbidade & Ajustes Clínicos
                </h3>
                <p className="text-xs text-ink-muted">
                  Critérios de segurança para uso na DRC, hepatopatias, idosos frágeis e gestação.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-bg border border-line text-slate-300">
                Guia de Segurança
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* DRC / Renal */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-blue-400">
                  <span>🫘</span>
                  <span>Doença Renal Crônica (DRC)</span>
                </div>
                <p className="text-ink leading-relaxed text-[11px]">
                  {currentDrug.comorbidities.renal}
                </p>
              </div>

              {/* Insuficiência Hepática */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span>🫁</span>
                  <span>Insuficiência Hepática</span>
                </div>
                <p className="text-ink leading-relaxed text-[11px]">
                  {currentDrug.comorbidities.hepatic}
                </p>
              </div>

              {/* Insuficiência Cardíaca & Arritmias */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-red-400">
                  <span>🫀</span>
                  <span>Cardiovascular & Arritmias</span>
                </div>
                <p className="text-ink leading-relaxed text-[11px]">
                  {currentDrug.comorbidities.cardiac}
                </p>
              </div>

              {/* Idosos & Beers */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-purple-400">
                  <span>👴</span>
                  <span>Idosos & Critérios de Beers</span>
                </div>
                <p className="text-ink leading-relaxed text-[11px]">
                  {currentDrug.comorbidities.elderly}
                </p>
              </div>

              {/* Gestação & Lactação */}
              <div className="p-4 rounded-xl bg-bg border border-line space-y-1.5 col-span-1 md:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <span>🤰</span>
                  <span>Gestação & Lactação</span>
                </div>
                <p className="text-ink leading-relaxed text-[11px]">
                  {currentDrug.comorbidities.pregnancy}
                </p>
              </div>
            </div>
          </div>

          {/* TOXICIDADE, SUPERDOSAGEM & CONDUTA COM ANTÍDOTO */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/25 via-card to-amber-950/20 border border-red-500/40 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-500/25 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-red-300">
                    Toxicidade, Superdosagem & Antídoto de Emergência
                  </h3>
                  <p className="text-xs text-red-200/80">
                    Sinais de alarme no pronto-socorro e conduta toxicológica imediata.
                  </p>
                </div>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                currentDrug.toxicity.dialyzable ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {currentDrug.toxicity.dialyzable ? 'Dialisável em Emergência (HD)' : 'Não Dialisável por Hemodiálise'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Signs */}
              <div className="space-y-2">
                <span className="font-bold text-red-300 block">Sinais Clínicos de Intoxicação:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-200 leading-relaxed">
                  {currentDrug.toxicity.signsSymptoms.map((sign, idx) => (
                    <li key={idx}>{sign}</li>
                  ))}
                </ul>
              </div>

              {/* Antidote Box */}
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-200 uppercase tracking-wider">Antídoto Específico:</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-500 text-white font-bold">EMERGÊNCIA</span>
                </div>
                <p className="text-base font-black text-white">{currentDrug.toxicity.antidote}</p>
                <div className="p-2.5 rounded bg-black/30 border border-red-500/20 font-mono text-[11px] text-slate-200 leading-relaxed">
                  <strong>Dose & Diluição:</strong> {currentDrug.toxicity.antidoteDose}
                </div>
              </div>
            </div>

            {/* Emergency Steps */}
            <div className="pt-3 border-t border-red-500/20 text-xs">
              <span className="font-bold text-slate-200 block mb-2">Conduta Imediata no Plantão / Pronto-Socorro:</span>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-300 leading-relaxed">
                {currentDrug.toxicity.emergencyConduct.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* INTERAÇÕES CONHECIDAS DESTE MEDICAMENTO */}
          <div className="card p-6 border border-line space-y-4">
            <div className="border-b border-line/60 pb-3">
              <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <Zap size={18} className="text-amber-400" />
                Interações Medicamentosas Conhecidas com {currentDrug.name} ({currentDrugInteractions.length})
              </h3>
              <p className="text-xs text-ink-muted">
                Cruzamento e riscos clínicos com outros fármacos frequentes da rotina médica hospitalar e ambulatorial.
              </p>
            </div>

            {currentDrugInteractions.length === 0 ? (
              <div className="p-6 text-center text-xs text-ink-muted italic">
                Nenhuma interação grave catalogada para esta droga com os outros fármacos da base.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {currentDrugInteractions.map((inter, idx) => {
                  const partnerId = inter.drugAId === currentDrug.id ? inter.drugBId : inter.drugAId;
                  const partner = DRUGS_DATABASE.find(d => d.id === partnerId);
                  const isContraindicated = inter.severity === 'contraindicated';

                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border text-xs flex flex-col gap-2 ${
                        isContraindicated 
                          ? 'border-red-500/50 bg-red-950/15' 
                          : inter.severity === 'major'
                          ? 'border-amber-500/40 bg-amber-950/10'
                          : 'border-blue-500/30 bg-bg'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <span className="text-brand-navy">{currentDrug.name}</span>
                          <span className="text-ink-muted">+</span>
                          <span className="text-purple-400">{partner?.name || partnerId}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider w-fit ${
                          isContraindicated ? 'bg-red-500 text-white' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {inter.severityLabel}
                        </span>
                      </div>

                      <p className="text-ink leading-relaxed">
                        <strong>Risco Clínico:</strong> {inter.clinicalRisk}
                      </p>
                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-emerald-400">Conduta:</strong> {inter.management}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}



      {/* ==================================================================== */}
      {/* TAB 3: RASTREADOR DE INTERAÇÕES MEDICAMENTOSAS */}
      {/* ==================================================================== */}
      {activeTab === 'interacoes' && (
        <div className="flex flex-col gap-6">
          
          {/* Top Presets & Selector Bar */}
          <div className="card p-5 border border-line bg-card/80 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                  <Zap size={20} className="text-brand-blue" />
                  Prescrição do Paciente & Análise Multidrogas
                </h2>
                <p className="text-xs text-ink-muted">
                  Selecione 2 ou mais medicamentos para cruzar automaticamente todas as interações farmacocinéticas e farmacodinâmicas.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={copyInteractionReport}
                  className="px-3.5 py-2 rounded-xl border border-line hover:border-brand-blue text-xs font-bold text-brand-navy flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copied ? 'Copiado!' : 'Copiar Parecer Clínico'}
                </button>
                <button
                  onClick={() => setSelectedDrugIds([])}
                  className="px-3 py-2 rounded-xl border border-line hover:border-red-500/40 text-xs font-bold text-ink-muted hover:text-red-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={14} />
                  Limpar Todos
                </button>
              </div>
            </div>

            {/* Clinical Preset Buttons */}
            <div>
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-2">
                Carregar Cenários Clínicos Frequentes de Polifarmácia (1 Clique):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <button
                  onClick={() => applyPresetScenario('triplice')}
                  className="p-2.5 rounded-xl border border-line bg-bg hover:border-red-500 hover:bg-red-500/10 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-xs text-red-400 block">⚠️ Tríplice Desgraça Renal</span>
                  <span className="text-[10px] text-ink-muted">Enalapril + Espironolactona + Ibuprofeno</span>
                </button>

                <button
                  onClick={() => applyPresetScenario('cardiopata')}
                  className="p-2.5 rounded-xl border border-line bg-bg hover:border-blue-500 hover:bg-blue-500/10 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-xs text-blue-400 block">🫀 Cardiopata Polimedicado</span>
                  <span className="text-[10px] text-ink-muted">Varfarina + Amiodarona + Digoxina + Clopidogrel</span>
                </button>

                <button
                  onClick={() => applyPresetScenario('psiquiatria')}
                  className="p-2.5 rounded-xl border border-line bg-bg hover:border-purple-500 hover:bg-purple-500/10 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-xs text-purple-400 block">🧠 Psiquiatria & AINE</span>
                  <span className="text-[10px] text-ink-muted">Lítio + Enalapril + Ibuprofeno</span>
                </button>

                <button
                  onClick={() => applyPresetScenario('sedacao')}
                  className="p-2.5 rounded-xl border border-line bg-bg hover:border-amber-500 hover:bg-amber-500/10 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-xs text-amber-400 block">🚨 Depressão Respiratória</span>
                  <span className="text-[10px] text-ink-muted">Diazepam + Morfina</span>
                </button>
              </div>
            </div>

            {/* Selected Drugs Chips */}
            <div className="pt-3 border-t border-line/60">
              <span className="text-xs font-bold text-slate-300 block mb-2">
                Fármacos na Prescrição ({selectedDrugs.length}):
              </span>
              
              {selectedDrugs.length === 0 ? (
                <p className="text-xs text-ink-muted italic">
                  Nenhum fármaco adicionado. Selecione fármacos abaixo ou na aba "Catálogo".
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedDrugs.map(d => (
                    <div 
                      key={d.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue/15 border border-brand-blue/40 text-brand-navy font-bold text-xs"
                    >
                      <span>{d.name}</span>
                      <button
                        onClick={() => toggleDrugInChecker(d.id)}
                        className="hover:text-red-400 transition-colors ml-1 cursor-pointer"
                        title="Remover da análise"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add More Drugs Quick Selector */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-ink-muted font-medium whitespace-nowrap">Adicionar outro fármaco:</span>
              <select
                onChange={e => {
                  if (e.target.value) {
                    toggleDrugInChecker(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="px-3 py-1.5 text-xs bg-bg border border-line rounded-lg text-brand-navy font-medium focus:outline-none focus:border-brand-blue cursor-pointer"
              >
                <option value="">Selecione um medicamento para incluir...</option>
                {DRUGS_DATABASE.filter(d => !selectedDrugIds.includes(d.id)).map(d => (
                  <option key={d.id} value={d.id}>+ {d.name} ({d.classCategory})</option>
                ))}
              </select>
            </div>
          </div>

          {/* RISK SUMMARY BAR */}
          {selectedDrugIds.length >= 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`card p-4 flex flex-col justify-center border ${
                severityStats.contraindicated > 0 ? 'border-red-500/50 bg-red-500/10' : 'border-line'
              }`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Contraindicada / Grave</span>
                <span className="text-3xl font-black text-red-400 mt-1">{severityStats.contraindicated}</span>
                <span className="text-[10px] text-ink-muted">Ameaça à vida / Evitar</span>
              </div>

              <div className={`card p-4 flex flex-col justify-center border ${
                severityStats.major > 0 ? 'border-amber-500/50 bg-amber-500/10' : 'border-line'
              }`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Alta Gravidade</span>
                <span className="text-3xl font-black text-amber-400 mt-1">{severityStats.major}</span>
                <span className="text-[10px] text-ink-muted">Monitoramento estrito</span>
              </div>

              <div className="card p-4 flex flex-col justify-center border border-line">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Moderada</span>
                <span className="text-3xl font-black text-blue-400 mt-1">{severityStats.moderate}</span>
                <span className="text-[10px] text-ink-muted">Ajuste de dose ou horário</span>
              </div>

              <div className="card p-4 flex flex-col justify-center border border-line">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Pares Analisados</span>
                <span className="text-3xl font-black text-emerald-400 mt-1">{detectedInteractions.length}</span>
                <span className="text-[10px] text-ink-muted">Interações catalogadas</span>
              </div>
            </div>
          )}

          {/* DETECTED INTERACTIONS LIST */}
          {selectedDrugIds.length < 2 ? (
            <div className="card p-10 text-center flex flex-col items-center gap-3 border border-line">
              <Zap size={36} className="text-slate-600" />
              <h3 className="font-bold text-base text-brand-navy">Selecione pelo menos 2 medicamentos</h3>
              <p className="text-xs text-ink-muted max-w-md">
                Adicione múltiplos medicamentos à prescrição para que o algoritmo cruze pares farmacológicos e alerte sobre toxicidade, nefrotoxicidade e sangramento.
              </p>
            </div>
          ) : detectedInteractions.length === 0 ? (
            <div className="card p-8 border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-300">Nenhuma interação grave catalogada entre os fármacos selecionados</h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  Os {selectedDrugs.length} medicamentos selecionados não possuem alertas de contraindicação cruzada na base clínica. Mantenha a vigilância habitual de função renal e hepática.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
                Interações Detectadas ({detectedInteractions.length}):
              </h3>

              {detectedInteractions.map((inter, idx) => {
                const drugA = DRUGS_DATABASE.find(d => d.id === inter.drugAId);
                const drugB = DRUGS_DATABASE.find(d => d.id === inter.drugBId);
                const isContraindicated = inter.severity === 'contraindicated';
                const isMajor = inter.severity === 'major';

                return (
                  <div
                    key={idx}
                    className={`card p-5 border rounded-2xl flex flex-col gap-3 transition-all ${
                      isContraindicated 
                        ? 'border-red-500/60 bg-gradient-to-r from-red-950/20 via-card to-red-950/10 shadow-lg' 
                        : isMajor
                        ? 'border-amber-500/50 bg-gradient-to-r from-amber-950/20 via-card to-card'
                        : 'border-blue-500/40 bg-card'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-extrabold text-brand-navy">
                          {drugA?.name} + {drugB?.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isContraindicated 
                            ? 'bg-red-500 text-white' 
                            : isMajor 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}>
                          {inter.severityLabel}
                        </span>
                      </div>

                      <span className="text-xs text-ink-muted font-mono">
                        {drugA?.classCategory} × {drugB?.classCategory}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-bg border border-line">
                        <span className="font-bold text-slate-400 block mb-1">Mecanismo Farmacológico:</span>
                        <p className="text-ink leading-relaxed">{inter.mechanism}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-bg border border-line">
                        <span className="font-bold text-red-400 block mb-1">Impacto Clínico no Paciente:</span>
                        <p className="text-ink leading-relaxed font-semibold">{inter.clinicalRisk}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                        <span className="font-bold text-emerald-400 block mb-1">Conduta Médica Recomendada:</span>
                        <p className="text-slate-200 leading-relaxed">{inter.management}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: GUIA RÁPIDO DE ANTÍDOTOS & TOXICOLOGIA DE EMERGÊNCIA */}
      {/* ==================================================================== */}
      {activeTab === 'antidotos' && (
        <div className="flex flex-col gap-6">
          
          <div className="card p-6 border border-red-500/30 bg-gradient-to-r from-red-950/30 via-card to-amber-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-red-300">
                  Tabela Rápida de Antídotos para o Plantão de Emergência
                </h2>
                <p className="text-xs text-red-200/80">
                  Doses de ataque, vias de administração imediatas e armadilhas clínicas de cada reversor toxicológico.
                </p>
              </div>
            </div>

            <div className="text-xs text-ink-muted bg-card px-4 py-2.5 rounded-xl border border-line shrink-0">
              📞 <strong>CIATox Brasil (Plantão Toxicológico):</strong> 0800 722 6001
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ANTIDOTES_DATABASE.map(item => (
              <div 
                key={item.id}
                className="card p-5 border border-line hover:border-brand-blue/50 flex flex-col justify-between gap-3 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 border-b border-line/60 pb-2.5 mb-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                        Tóxico / Superdosagem:
                      </span>
                      <h3 className="text-base font-bold text-brand-navy">
                        {item.toxicAgent}
                      </h3>
                      <span className="text-xs text-ink-muted">({item.drugClass})</span>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 uppercase tracking-wider shrink-0">
                      {item.urgencyLevel}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1.5 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-300">Antídoto:</span>
                      <span className="text-[10px] font-mono text-slate-400">{item.administrationRoute}</span>
                    </div>
                    <p className="text-sm font-extrabold text-white">{item.antidoteName}</p>
                    <p className="text-xs font-mono text-slate-200 leading-relaxed">
                      <strong>Dose Adulto:</strong> {item.standardDose}
                    </p>
                    {item.pediatricDose && (
                      <p className="text-xs font-mono text-blue-300 leading-relaxed">
                        <strong>Dose Pediátrica:</strong> {item.pediatricDose}
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-ink-muted mb-2">
                    <strong className="text-slate-400">Mecanismo:</strong> {item.mechanism}
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <strong className="text-amber-400 block text-[11px]">Atenção no Plantão:</strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-ink-muted">
                      {item.keyPrecautions.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: RESUMO DE PRESCRIÇÃO & IMPRESSÃO A4 */}
      {/* ==================================================================== */}
      {activeTab === 'resumo' && (
        <div className="flex flex-col gap-6">
          <div className="card p-6 border border-line flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="text-lg font-bold text-brand-navy">Ficha de Segurança Farmacológica & Interações</h2>
                <p className="text-xs text-ink-muted">Documento para registro em prontuário ou impressão para o médico assistente.</p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Printer size={15} /> Imprimir / Salvar PDF
              </button>
            </div>

            <div className="p-6 rounded-xl bg-white text-slate-900 border border-slate-300 space-y-4">
              <div className="border-b-2 border-blue-600 pb-3">
                <h1 className="text-xl font-black text-slate-900">PARECER DE SEGURANÇA FARMACOLÓGICA E INTERAÇÕES</h1>
                <p className="text-xs text-slate-600">Protocolo de Prevenção de Eventos Adversos a Medicamentos (EAM)</p>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                  <span>Data: {new Date().toLocaleDateString('pt-BR')}</span>
                  <span>Total de Fármacos Analisados: {selectedDrugs.length}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1">Medicamentos na Prescrição:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedDrugs.map(d => (
                    <div key={d.id} className="p-2 rounded bg-slate-100 border border-slate-200">
                      <strong className="text-slate-900">{d.name}</strong> ({d.classCategory})
                      <div className="text-[10px] text-slate-600">Dose: {d.commonDose}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1">Interações e Alertas Identificados:</h3>
                {detectedInteractions.length === 0 ? (
                  <p className="text-xs text-slate-600 italic">Nenhuma interação grave encontrada entre os fármacos selecionados.</p>
                ) : (
                  <div className="space-y-2">
                    {detectedInteractions.map((inter, idx) => {
                      const drugA = DRUGS_DATABASE.find(d => d.id === inter.drugAId)?.name;
                      const drugB = DRUGS_DATABASE.find(d => d.id === inter.drugBId)?.name;
                      return (
                        <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-300 text-xs">
                          <div className="font-bold text-slate-900 flex justify-between">
                            <span>{drugA} + {drugB}</span>
                            <span className="text-red-700 uppercase font-mono">{inter.severityLabel}</span>
                          </div>
                          <div className="text-[11px] text-slate-700 mt-1"><strong>Risco:</strong> {inter.clinicalRisk}</div>
                          <div className="text-[11px] text-blue-900 mt-0.5"><strong>Conduta:</strong> {inter.management}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 flex justify-between">
                <span>Responsável Técnico: Equipe Médica de Farmacologia Clínica</span>
                <span>Assinatura/Carimbo: _________________________________</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
