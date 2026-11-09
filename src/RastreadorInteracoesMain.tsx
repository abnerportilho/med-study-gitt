import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  X, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Activity, 
  Sparkles, 
  ArrowRight,
  Info,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { 
  DRUGS_DATABASE, 
  DRUG_INTERACTIONS_DATABASE, 
  DrugItem, 
  DrugInteraction 
} from './data/medicamentosData';

export default function RastreadorInteracoesMain() {
  // Selected drugs in active prescription
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([
    'enalapril',
    'espironolactona',
    'ibuprofeno'
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Drug resolution helper
  const getDrug = (id: string): DrugItem | undefined => {
    return DRUGS_DATABASE.find(d => d.id === id);
  };

  // Filtered suggestions for autocomplete
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

  // Evaluate interactions among selected drugs
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

  // Severity flags
  const hasContraindicated = detectedInteractions.some(i => i.severity === 'contraindicated');
  const hasMajor = detectedInteractions.some(i => i.severity === 'major');
  const hasModerate = detectedInteractions.some(i => i.severity === 'moderate');

  // Add drug to prescription
  const handleAddDrug = (drugId: string) => {
    if (!selectedDrugIds.includes(drugId)) {
      setSelectedDrugIds(prev => [...prev, drugId]);
      setSearchQuery('');
      setIsSearchOpen(false);
      searchInputRef.current?.focus();
    }
  };

  // Remove drug from prescription
  const handleRemoveDrug = (drugId: string) => {
    setSelectedDrugIds(prev => prev.filter(id => id !== drugId));
  };

  // Clear all drugs
  const handleClearAll = () => {
    setSelectedDrugIds([]);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  // Quick preset button click
  const handleApplyPreset = (presetDrugs: string[]) => {
    setSelectedDrugIds(presetDrugs);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  // Copy clinical text report
  const handleCopyReport = () => {
    const drugNames = selectedDrugIds.map(id => getDrug(id)?.name || id).join(', ');
    let text = `=== RELATÓRIO DE INTERAÇÃO MEDICAMENTOSA ===\nData/Hora: ${new Date().toLocaleString('pt-BR')}\nMedicamentos Prescritos (${selectedDrugIds.length}): ${drugNames}\n\n`;

    if (detectedInteractions.length === 0) {
      text += `STATUS: ✅ NENHUMA INTERAÇÃO FARMACOLÓGICA SIGNIFICATIVA IDENTIFICADA.\n`;
      text += `A combinação entre as drogas prescritas não possui contraindicações formais ou interações de alta gravidade registradas na base de farmacovigilância.\n`;
    } else {
      text += `STATUS: ⚠️ ${detectedInteractions.length} INTERAÇÃO(ÕES) DETECTADA(S):\n\n`;
      detectedInteractions.forEach((inter, idx) => {
        const drugA = getDrug(inter.drugAId)?.name || inter.drugAId;
        const drugB = getDrug(inter.drugBId)?.name || inter.drugBId;
        text += `${idx + 1}. [${inter.severityLabel.toUpperCase()}] ${drugA} + ${drugB}\n`;
        text += `   - Risco Clínico: ${inter.clinicalRisk}\n`;
        text += `   - Mecanismo Farmacológico: ${inter.mechanism}\n`;
        text += `   - Conduta Recomendada: ${inter.management}\n\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-3 sm:p-6 gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Pill className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Farmacovigilância & Segurança da Prescrição</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rastreador de Interações Medicamentosas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Adicione os fármacos na caixa de prescrição abaixo para verificar instantaneamente interações clínicas, mecanismos e condutas práticas.
          </p>
        </div>

        {selectedDrugIds.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer shadow-sm"
              title="Copiar relatório clínico para prontuário"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Relatório Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copiar Laudo</span>
                </>
              )}
            </button>

            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-900/50 transition-all cursor-pointer shadow-sm"
              title="Limpar todos os medicamentos"
            >
              <Trash2 className="w-4 h-4" />
              <span>Limpar Tudo</span>
            </button>
          </div>
        )}
      </div>

      {/* QUICK PRESETS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Cenários Clínicos Frequentes:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => handleApplyPreset(['enalapril', 'espironolactona', 'ibuprofeno'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 whitespace-nowrap transition-all cursor-pointer"
          >
            🚨 Tríplice Whammy (Enalapril + Espironolactona + AINE)
          </button>
          <button
            onClick={() => handleApplyPreset(['varfarina', 'amiodarona'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 whitespace-nowrap transition-all cursor-pointer"
          >
            ⚠️ Varfarina + Amiodarona (Risco RNI)
          </button>
          <button
            onClick={() => handleApplyPreset(['litio', 'ibuprofeno'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-800/60 whitespace-nowrap transition-all cursor-pointer"
          >
            ⚡ Lítio + Ibuprofeno (Toxicidade)
          </button>
          <button
            onClick={() => handleApplyPreset(['rivaroxabana', 'clopidogrel'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 whitespace-nowrap transition-all cursor-pointer"
          >
            🩸 Rivaroxabana + Antiplaquetário
          </button>
          <button
            onClick={() => handleApplyPreset(['diazepam', 'morfina'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border border-blue-800/60 whitespace-nowrap transition-all cursor-pointer"
          >
            💤 Diazepam + Morfina (Depressão SNC)
          </button>
          <button
            onClick={() => handleApplyPreset(['amiodarona', 'digoxina'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-950/40 hover:bg-orange-900/50 text-orange-300 border border-orange-800/60 whitespace-nowrap transition-all cursor-pointer"
          >
            🫀 Amiodarona + Digoxina
          </button>
          <button
            onClick={() => handleApplyPreset(['amoxicilina_clavulanato', 'paracetamol'])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/60 whitespace-nowrap transition-all cursor-pointer"
          >
            ✅ Amoxicilina + Paracetamol (Seguro)
          </button>
        </div>
      </div>

      {/* CAIXA DE TEXTO / SELETOR DE PRESCRIÇÃO */}
      <div className="bg-slate-900 border-2 border-indigo-500/30 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 shadow-xl transition-all space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-indigo-400" />
            Caixa de Prescrição (Adicionar Fármacos)
          </label>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
            {selectedDrugIds.length} {selectedDrugIds.length === 1 ? 'medicamento adicionado' : 'medicamentos adicionados'}
          </span>
        </div>

        {/* Selected Drugs Chips Area */}
        <div className="min-h-[48px] p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center gap-2">
          {selectedDrugIds.length === 0 ? (
            <span className="text-xs text-slate-400 italic px-2">
              Nenhum medicamento na caixa. Digite abaixo para adicionar...
            </span>
          ) : (
            selectedDrugIds.map(id => {
              const drug = getDrug(id);
              return (
                <div 
                  key={id}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-100 border border-indigo-700/60 text-xs font-semibold shadow-sm transition-all"
                >
                  <Pill className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{drug?.name || id}</span>
                  {drug?.classCategory && (
                    <span className="text-[10px] text-indigo-300 font-normal">
                      · {drug.classCategory}
                    </span>
                  )}
                  <button 
                    onClick={() => handleRemoveDrug(id)}
                    className="ml-1 text-indigo-300 hover:text-rose-400 hover:bg-rose-950/50 p-0.5 rounded-md transition-colors cursor-pointer"
                    title={`Remover ${drug?.name || id}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Text Input with Autocomplete Dropdown */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Digite o nome de um medicamento para adicionar (ex: Enalapril, Varfarina, Espironolactona, Ibuprofeno, Metformina, Lítio...)"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3.5 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {isSearchOpen && filteredSuggestions.length > 0 && (
            <div 
              ref={dropdownRef}
              className="absolute top-full mt-2 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-72 overflow-y-auto"
            >
              <div className="p-2.5 text-[11px] font-semibold text-slate-400 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <span>Medicamentos encontrados (clique para adicionar à prescrição):</span>
                <span className="text-[10px] text-slate-400">Esc para fechar</span>
              </div>
              {filteredSuggestions.map(drug => (
                <div
                  key={drug.id}
                  onClick={() => handleAddDrug(drug.id)}
                  className="p-3 hover:bg-slate-800 text-xs flex items-center justify-between cursor-pointer border-b border-slate-800/40 last:border-none transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{drug.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">
                        {drug.classCategory}
                      </span>
                    </div>
                    {drug.brandNames.length > 0 && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Nomes comerciais: {drug.brandNames.join(', ')}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-indigo-400 font-bold flex items-center gap-1 shrink-0 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/50">
                    <Plus className="w-3.5 h-3.5" /> Adicionar
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ABAIXO: RESULTADOS DA ANÁLISE DE INTERAÇÃO */}
      <div className="flex flex-col gap-4">
        
        {/* ESTADO 1: MENOS DE 2 DROGAS */}
        {selectedDrugIds.length < 2 && (
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 flex items-center justify-center">
              <Pill className="w-6 h-6" />
            </div>
            <div className="max-w-md">
              <h3 className="text-base font-bold text-white mb-1">
                Aguardando Medicamentos
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adicione pelo menos <strong>2 medicamentos</strong> na caixa de prescrição acima para o sistema analisar as potenciais interações farmacológicas, riscos clínicos e condutas recomendadas.
              </p>
            </div>
            {selectedDrugIds.length === 1 && (
              <div className="text-xs text-indigo-300 bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-indigo-900/60">
                Droga atual na caixa: <strong>{getDrug(selectedDrugIds[0])?.name || selectedDrugIds[0]}</strong>. Adicione outra para cruzar dados.
              </div>
            )}
          </div>
        )}

        {/* ESTADO 2: 2+ DROGAS E NENHUMA INTERAÇÃO ENCONTRADA */}
        {selectedDrugIds.length >= 2 && detectedInteractions.length === 0 && (
          <div className="p-6 rounded-2xl bg-emerald-950/30 border-2 border-emerald-600/50 text-emerald-200 shadow-xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Segurança Farmacológica Verificada
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-emerald-300">
                  Nenhuma Interação Farmacológica Relevante Identificada
                </h3>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  A combinação entre os medicamentos analisados (<strong>{selectedDrugIds.map(id => getDrug(id)?.name || id).join(', ')}</strong>) não possui interações diretas graves, bloqueios competitivos de CYP450 ou contraindicações formais registradas em nossa base de dados clínicos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-emerald-900/60 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sem sobreposição de toxicidade primária</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mecanismos farmacodinâmicos compatíveis</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manter monitoração clínica habitual</span>
              </div>
            </div>
          </div>
        )}

        {/* ESTADO 3: 2+ DROGAS E INTERAÇÕES DETECTADAS */}
        {selectedDrugIds.length >= 2 && detectedInteractions.length > 0 && (
          <div className="space-y-4">
            
            {/* Banner de Severidade Geral */}
            <div className={`p-4 sm:p-5 rounded-2xl border-2 shadow-xl flex items-start gap-4 ${
              hasContraindicated 
                ? 'bg-rose-950/40 border-rose-600 text-rose-200' 
                : hasMajor 
                  ? 'bg-amber-950/40 border-amber-600 text-amber-200' 
                  : 'bg-yellow-950/40 border-yellow-600 text-yellow-200'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                hasContraindicated 
                  ? 'bg-rose-600/20 border-rose-500/40 text-rose-400' 
                  : 'bg-amber-600/20 border-amber-500/40 text-amber-400'
              }`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    hasContraindicated 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-amber-600 text-white'
                  }`}>
                    {hasContraindicated ? '🚨 CONTRAINDICAÇÃO DETECTADA' : '⚠️ ALERTA DE INTERAÇÃO GRAVE'}
                  </span>
                  <span className="text-xs font-semibold opacity-80">
                    {detectedInteractions.length} {detectedInteractions.length === 1 ? 'par de interação identificado' : 'pares de interação identificados'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {hasContraindicated 
                    ? 'Atenção Crítica: Associação Farmacológica de Alto Risco / Contraindicada' 
                    : 'Atenção: Associação Requer Ajuste Posológico ou Monitorização Estrita'}
                </h3>
                <p className="text-xs opacity-90 leading-relaxed">
                  Avalie individualmente os riscos de cada interação abaixo e aplique as condutas recomendadas antes de liberar a prescrição.
                </p>
              </div>
            </div>

            {/* Lista dos Pares em Interação */}
            <div className="space-y-4">
              {detectedInteractions.map((inter, idx) => {
                const drugA = getDrug(inter.drugAId);
                const drugB = getDrug(inter.drugBId);
                const isContraindicated = inter.severity === 'contraindicated';
                const isMajor = inter.severity === 'major';

                return (
                  <div 
                    key={`${inter.drugAId}-${inter.drugBId}-${idx}`}
                    className={`rounded-2xl border p-4 sm:p-5 shadow-lg space-y-4 transition-all ${
                      isContraindicated 
                        ? 'bg-slate-900 border-rose-800/80 hover:border-rose-700' 
                        : isMajor 
                          ? 'bg-slate-900 border-amber-800/80 hover:border-amber-700' 
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Header do Par */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base sm:text-lg font-black text-white">
                          {drugA?.name || inter.drugAId}
                        </span>
                        <span className="text-slate-400 font-bold text-base">+</span>
                        <span className="text-base sm:text-lg font-black text-white">
                          {drugB?.name || inter.drugBId}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          isContraindicated 
                            ? 'bg-rose-600 text-white shadow-sm shadow-rose-900' 
                            : isMajor 
                              ? 'bg-amber-600 text-white shadow-sm shadow-amber-900' 
                              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                        }`}>
                          {inter.severityLabel}
                        </span>
                      </div>
                    </div>

                    {/* Blocos de Detalhes Clínicos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                      
                      {/* Risco Clínico ao Paciente */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-950/60 space-y-1.5">
                        <div className="font-bold text-rose-300 flex items-center gap-1.5 text-xs">
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Risco Clínico ao Paciente:</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed text-xs">
                          {inter.clinicalRisk}
                        </p>
                      </div>

                      {/* Mecanismo Farmacológico */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="font-bold text-indigo-300 flex items-center gap-1.5 text-xs">
                          <Activity className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>Mecanismo Farmacológico:</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-xs">
                          {inter.mechanism}
                        </p>
                      </div>
                    </div>

                    {/* Conduta Prática Recomendada */}
                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/60 space-y-1.5">
                      <div className="font-extrabold text-amber-300 flex items-center gap-2 text-xs uppercase tracking-wide">
                        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Conduta Médica Recomendada:</span>
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
                        {inter.management}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Matriz Resumo das Drogas Analisadas */}
            {selectedDrugIds.length >= 3 && (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-indigo-400" />
                    Resumo de Polifarmácia (Cruzamento Par a Par):
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Total: {selectedDrugIds.length * (selectedDrugIds.length - 1) / 2} pares avaliados
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedDrugIds.map(id => {
                    const drug = getDrug(id);
                    const pairInteractions = detectedInteractions.filter(i => i.drugAId === id || i.drugBId === id);
                    const hasSevere = pairInteractions.some(i => i.severity === 'contraindicated');
                    const hasHigh = pairInteractions.some(i => i.severity === 'major');

                    return (
                      <div 
                        key={id}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                          hasSevere 
                            ? 'bg-rose-950/40 text-rose-200 border-rose-800' 
                            : hasHigh 
                              ? 'bg-amber-950/40 text-amber-200 border-amber-800' 
                              : pairInteractions.length > 0 
                                ? 'bg-yellow-950/30 text-yellow-200 border-yellow-800' 
                                : 'bg-emerald-950/30 text-emerald-200 border-emerald-800'
                        }`}
                      >
                        <span>{drug?.name || id}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950 font-mono">
                          {pairInteractions.length} {pairInteractions.length === 1 ? 'interação' : 'interações'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
