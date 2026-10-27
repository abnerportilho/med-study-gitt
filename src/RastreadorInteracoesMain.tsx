import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Trash2, 
  Copy, 
  Check, 
  Plus, 
  X, 
  Search, 
  Activity, 
  ArrowRight, 
  RefreshCw,
  HelpCircle,
  Pill
} from 'lucide-react';
import { 
  DRUGS_DATABASE, 
  DRUG_INTERACTIONS_DATABASE, 
  DrugItem, 
  DrugInteraction 
} from './data/medicamentosData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  drugs: string[];
  interactions: DrugInteraction[];
  text?: string;
  isInitial?: boolean;
}

export default function RastreadorInteracoesMain() {
  // Selected drugs state for active query
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([
    'enalapril',
    'espironolactona',
    'ibuprofeno'
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Chat message thread
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Initial analysis for the default drugs
    const idA = 'enalapril';
    const idB = 'espironolactona';
    const idC = 'ibuprofeno';
    const initialDrugs = [idA, idB, idC];

    const detected: DrugInteraction[] = [];
    for (let i = 0; i < initialDrugs.length; i++) {
      for (let j = i + 1; j < initialDrugs.length; j++) {
        const match = DRUG_INTERACTIONS_DATABASE.find(inter => 
          (inter.drugAId === initialDrugs[i] && inter.drugBId === initialDrugs[j]) ||
          (inter.drugAId === initialDrugs[j] && inter.drugBId === initialDrugs[i])
        );
        if (match) detected.push(match);
      }
    }

    return [
      {
        id: 'msg-welcome',
        sender: 'bot',
        timestamp: 'Agora',
        drugs: [],
        interactions: [],
        isInitial: true,
        text: 'Olá, Dr(a)! Sou seu assistente farmacológico para análise de polifarmácia e segurança da prescrição. Selecione 2 ou mais medicamentos abaixo para eu avaliar se há interações medicamentosas, contraindicações ou se a associação é segura.'
      },
      {
        id: 'msg-initial-user',
        sender: 'user',
        timestamp: 'Agora',
        drugs: initialDrugs,
        interactions: []
      },
      {
        id: 'msg-initial-bot',
        sender: 'bot',
        timestamp: 'Agora',
        drugs: initialDrugs,
        interactions: detected
      }
    ];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Drug resolution helper
  const getDrug = (id: string): DrugItem | undefined => {
    return DRUGS_DATABASE.find(d => d.id === id);
  };

  // Filtered drug options for autocomplete search
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return DRUGS_DATABASE.filter(drug => 
      !selectedDrugIds.includes(drug.id) && (
        drug.name.toLowerCase().includes(q) ||
        drug.brandNames.some(b => b.toLowerCase().includes(q)) ||
        drug.classCategory.toLowerCase().includes(q)
      )
    ).slice(0, 8);
  }, [searchQuery, selectedDrugIds]);

  // Evaluate interactions for an arbitrary list of drug IDs
  const evaluateInteractions = (drugIds: string[]): DrugInteraction[] => {
    const results: DrugInteraction[] = [];
    if (drugIds.length < 2) return results;

    for (let i = 0; i < drugIds.length; i++) {
      for (let j = i + 1; j < drugIds.length; j++) {
        const idA = drugIds[i];
        const idB = drugIds[j];

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
  };

  // Trigger analysis for current or provided selection
  const handleAnalyze = (drugsToTest: string[] = selectedDrugIds) => {
    if (drugsToTest.length < 2) return;

    const detected = evaluateInteractions(drugsToTest);
    const nowTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: nowTime,
      drugs: [...drugsToTest],
      interactions: []
    };

    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      timestamp: nowTime,
      drugs: [...drugsToTest],
      interactions: detected
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  // Add drug
  const handleAddDrug = (drugId: string) => {
    if (!selectedDrugIds.includes(drugId)) {
      const next = [...selectedDrugIds, drugId];
      setSelectedDrugIds(next);
      setSearchQuery('');
      setIsSearchOpen(false);
      handleAnalyze(next);
    }
  };

  // Remove drug
  const handleRemoveDrug = (drugId: string) => {
    const next = selectedDrugIds.filter(id => id !== drugId);
    setSelectedDrugIds(next);
    if (next.length >= 2) {
      handleAnalyze(next);
    }
  };

  // Quick preset button click
  const handleQuickPreset = (presetDrugs: string[]) => {
    setSelectedDrugIds(presetDrugs);
    handleAnalyze(presetDrugs);
  };

  // Clear everything
  const handleClear = () => {
    setSelectedDrugIds([]);
    const nowTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      {
        id: `clear-${Date.now()}`,
        sender: 'bot',
        timestamp: nowTime,
        drugs: [],
        interactions: [],
        text: 'Prescrição limpa. Selecione ou digite novos medicamentos para iniciar uma nova análise.'
      }
    ]);
  };

  // Copy clinical text report
  const handleCopyReport = (drugs: string[], interactions: DrugInteraction[]) => {
    const drugNames = drugs.map(id => getDrug(id)?.name || id).join(' + ');
    let text = `=== AVALIAÇÃO DE INTERAÇÃO MEDICAMENTOSA ===\nAssociação: ${drugNames}\n`;
    if (interactions.length === 0) {
      text += `Status: Nenhuma interação farmacológica grave identificada entre essas drogas.\n`;
    } else {
      text += `Status: ${interactions.length} interação(ões) detectada(s):\n\n`;
      interactions.forEach((inter, idx) => {
        const drugA = getDrug(inter.drugAId)?.name || inter.drugAId;
        const drugB = getDrug(inter.drugBId)?.name || inter.drugBId;
        text += `${idx + 1}. [${inter.severityLabel.toUpperCase()}] ${drugA} + ${drugB}\n`;
        text += `   - Risco: ${inter.clinicalRisk}\n`;
        text += `   - Mecanismo: ${inter.mechanism}\n`;
        text += `   - Conduta: ${inter.management}\n\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopiedId(drugs.join('-'));
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[calc(100vh-5rem)] p-2 sm:p-4 gap-3">
      
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                PharmBot: Assistente de Interações Medicamentosas
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Verificador conversacional em tempo real para polifarmácia e segurança da prescrição
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
            title="Limpar conversa"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Quick Scenario Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Cenários Rápidos:
        </span>
        <button
          onClick={() => handleQuickPreset(['enalapril', 'espironolactona', 'ibuprofeno'])}
          className="px-2.5 py-1 rounded-lg text-xs bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-900/50 whitespace-nowrap transition-all cursor-pointer"
        >
          🚨 Tríplice Whammy (Enalapril + Espironolactona + AINE)
        </button>
        <button
          onClick={() => handleQuickPreset(['varfarina', 'amiodarona'])}
          className="px-2.5 py-1 rounded-lg text-xs bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 border border-amber-900/50 whitespace-nowrap transition-all cursor-pointer"
        >
          ⚠️ Varfarina + Amiodarona
        </button>
        <button
          onClick={() => handleQuickPreset(['litio', 'ibuprofeno'])}
          className="px-2.5 py-1 rounded-lg text-xs bg-purple-950/30 hover:bg-purple-900/40 text-purple-300 border border-purple-900/50 whitespace-nowrap transition-all cursor-pointer"
        >
          ⚡ Lítio + Ibuprofeno (Toxicidade)
        </button>
        <button
          onClick={() => handleQuickPreset(['rivaroxabana', 'clopidogrel'])}
          className="px-2.5 py-1 rounded-lg text-xs bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-900/50 whitespace-nowrap transition-all cursor-pointer"
        >
          🩸 Sangramento (Rivaroxabana + Antiplaquetário)
        </button>
        <button
          onClick={() => handleQuickPreset(['diazepam', 'morfina'])}
          className="px-2.5 py-1 rounded-lg text-xs bg-blue-950/30 hover:bg-blue-900/40 text-blue-300 border border-blue-900/50 whitespace-nowrap transition-all cursor-pointer"
        >
          💤 Depressão Respiratória (BZD + Opioide)
        </button>
        <button
          onClick={() => handleQuickPreset(['amoxicilina_clavulanato', 'paracetamol'])}
          className="px-2.5 py-1 rounded-lg text-xs bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-900/50 whitespace-nowrap transition-all cursor-pointer"
        >
          ✅ Sem Interação (Amoxi/Clav + Paracetamol)
        </button>
      </div>

      {/* Main Chat Stream Container */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3 sm:p-5 space-y-4">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end items-start gap-2.5">
                <div className="max-w-2xl bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3.5 shadow-md space-y-2">
                  <div className="flex items-center justify-between gap-3 text-indigo-200 text-[11px]">
                    <span className="font-semibold">Prescrição Selecionada</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="text-xs font-medium">
                    Por favor, analise as possíveis interações entre:
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.drugs.map(id => {
                      const drug = getDrug(id);
                      return (
                        <span 
                          key={id}
                          className="px-2 py-0.5 rounded-lg bg-indigo-800/80 text-white font-bold text-xs border border-indigo-400/30 flex items-center gap-1"
                        >
                          <Pill className="w-3 h-3 text-indigo-300" />
                          {drug?.name || id}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>
            );
          }

          // Initial greeting message
          if (msg.isInitial) {
            return (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="max-w-2xl bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-indigo-400">PharmBot</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          }

          // Text-only bot message
          if (msg.text && msg.interactions.length === 0 && msg.drugs.length === 0) {
            return (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="max-w-2xl bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl rounded-tl-none p-3.5 shadow-sm text-xs">
                  {msg.text}
                </div>
              </div>
            );
          }

          // Bot analysis response
          const hasInteractions = msg.interactions.length > 0;
          const hasContraindicated = msg.interactions.some(i => i.severity === 'contraindicated');
          const hasMajor = msg.interactions.some(i => i.severity === 'major');

          return (
            <div key={msg.id} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-400 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>

              <div className="flex-1 max-w-3xl space-y-3">
                {/* Bot Summary Bubble */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 shadow-md space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-400">PharmBot Análise Clínica</span>
                      <span>·</span>
                      <span>{msg.drugs.length} drogas avaliadas</span>
                    </div>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Verdict Banner */}
                  {hasInteractions ? (
                    <div className={`p-3 rounded-xl border flex items-start gap-3 ${
                      hasContraindicated 
                        ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
                        : hasMajor 
                          ? 'bg-amber-950/40 border-amber-800 text-amber-200' 
                          : 'bg-yellow-950/30 border-yellow-800/80 text-yellow-200'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                        hasContraindicated ? 'text-rose-400' : 'text-amber-400'
                      }`} />
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs sm:text-sm">
                          {hasContraindicated 
                            ? '🚨 ATENÇÃO: Interação Contraindicada Detectada!' 
                            : hasMajor 
                              ? '⚠️ ALERTA: Interação Farmacológica Grave / Maior Encontrada' 
                              : '⚠️ Interação Moderada Detectada (Requer Monitorização)'}
                        </div>
                        <p className="text-[11px] opacity-90">
                          Foram identificadas <strong>{msg.interactions.length} interação(ões)</strong> entre os medicamentos selecionados. Veja a conduta e os mecanismos recomendados abaixo:
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs sm:text-sm text-emerald-300">
                          ✅ Nenhuma Interação Farmacológica Maior Encontrada
                        </div>
                        <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                          A combinação entre os medicamentos analisados ({msg.drugs.map(id => getDrug(id)?.name).join(', ')}) não possui interações diretas graves ou contraindicações formais registradas em nossa base de farmacovigilância.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* List of Interaction Cards inside the Bot Bubble */}
                  {hasInteractions && (
                    <div className="space-y-3 pt-1">
                      {msg.interactions.map((inter, idx) => {
                        const drugA = getDrug(inter.drugAId);
                        const drugB = getDrug(inter.drugBId);
                        const isSevere = inter.severity === 'contraindicated' || inter.severity === 'major';

                        return (
                          <div 
                            key={`${inter.drugAId}-${inter.drugBId}-${idx}`}
                            className={`p-3.5 rounded-xl border text-xs space-y-2.5 transition-all ${
                              inter.severity === 'contraindicated'
                                ? 'bg-rose-950/20 border-rose-900/60'
                                : inter.severity === 'major'
                                  ? 'bg-amber-950/20 border-amber-900/60'
                                  : 'bg-slate-950/60 border-slate-800'
                            }`}
                          >
                            {/* Pair Title & Badge */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-white text-sm">
                                  {drugA?.name || inter.drugAId}
                                </span>
                                <span className="text-slate-400 font-bold">+</span>
                                <span className="font-black text-white text-sm">
                                  {drugB?.name || inter.drugBId}
                                </span>
                              </div>

                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                inter.severity === 'contraindicated'
                                  ? 'bg-rose-600 text-white'
                                  : inter.severity === 'major'
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/30'
                              }`}>
                                {inter.severityLabel}
                              </span>
                            </div>

                            {/* Clinical Risk */}
                            <div className="space-y-1">
                              <div className="text-[11px] font-semibold text-rose-300 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                                Risco Clínico ao Paciente:
                              </div>
                              <p className="text-slate-300 leading-relaxed text-xs pl-4 border-l-2 border-rose-500/40">
                                {inter.clinicalRisk}
                              </p>
                            </div>

                            {/* Mechanism */}
                            <div className="space-y-1">
                              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                                Mecanismo Farmacológico:
                              </div>
                              <p className="text-slate-400 text-[11px] leading-relaxed pl-4 border-l-2 border-slate-700">
                                {inter.mechanism}
                              </p>
                            </div>

                            {/* Management / Conduta */}
                            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                              <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                                Conduta Prática Recomendada:
                              </div>
                              <p className="text-slate-200 text-xs leading-relaxed">
                                {inter.management}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Bottom Action Footer for this analysis */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-500 font-mono">
                      Fonte: Base de Farmacologia Clínica & Diretrizes Brasileiras
                    </span>
                    <button
                      onClick={() => handleCopyReport(msg.drugs, msg.interactions)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                    >
                      {copiedId === msg.drugs.join('-') ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copiar Laudo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>

      {/* Interactive Bottom Control: Drug Selection & Input Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl space-y-3">
        {/* Selected Drugs Active Chips */}
        <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Pill className="w-3.5 h-3.5 text-indigo-400" />
            Drogas na consulta:
          </span>

          {selectedDrugIds.length === 0 ? (
            <span className="text-xs text-slate-400 italic">
              Nenhuma droga selecionada. Adicione drogas no campo abaixo.
            </span>
          ) : (
            selectedDrugIds.map(id => {
              const drug = getDrug(id);
              return (
                <span 
                  key={id}
                  className="px-2.5 py-1 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs font-medium flex items-center gap-1.5 shadow-sm"
                >
                  <span className="font-bold text-white">{drug?.name || id}</span>
                  <button 
                    onClick={() => handleRemoveDrug(id)}
                    className="text-slate-400 hover:text-rose-400 transition-colors p-0.5 rounded cursor-pointer"
                    title="Remover droga"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>

        {/* Input & Autocomplete Search */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Digite o nome de um medicamento (ex: Enalapril, Amiodarona, Varfarina, Paracetamol, Metformina)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={selectedDrugIds.length < 2}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer ${
                selectedDrugIds.length >= 2
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Avaliar Prescrição</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Autocomplete Dropdown List */}
          {isSearchOpen && filteredSuggestions.length > 0 && (
            <div className="absolute bottom-full mb-2 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto">
              <div className="p-2 text-[11px] font-semibold text-slate-400 border-b border-slate-800 bg-slate-950/80 flex justify-between items-center">
                <span>Clique para adicionar à consulta:</span>
                <span className="text-[10px] text-slate-400">Pressione ESC para fechar</span>
              </div>
              {filteredSuggestions.map(drug => (
                <div
                  key={drug.id}
                  onClick={() => handleAddDrug(drug.id)}
                  className="p-2.5 hover:bg-slate-800 text-xs flex items-center justify-between cursor-pointer border-b border-slate-800/40 last:border-none transition-colors"
                >
                  <div>
                    <span className="font-bold text-white mr-2">{drug.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      ({drug.classCategory})
                    </span>
                    <div className="text-[10px] text-slate-400">
                      Nomes comerciais: {drug.brandNames.join(', ')}
                    </div>
                  </div>
                  <span className="text-[11px] text-indigo-400 font-semibold flex items-center gap-1 shrink-0">
                    <Plus className="w-3.5 h-3.5" /> Adicionar
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
