import React, { useState, useMemo } from 'react';
import { 
  Zap, ShieldAlert, AlertCircle, CheckCircle2, Copy, Trash2, 
  Printer, Check, Search, Plus, Sparkles, Filter, AlertTriangle,
  Stethoscope, Info, ArrowRight, ShieldCheck, X
} from 'lucide-react';
import { 
  DRUGS_DATABASE, 
  DRUG_INTERACTIONS_DATABASE, 
  DrugItem, 
  DrugInteraction 
} from './data/medicamentosData';

export default function RastreadorInteracoesMain() {
  // Prescription drug IDs
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([
    'enalapril',
    'espironolactona',
    'ibuprofeno'
  ]);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSystemFilter, setSelectedSystemFilter] = useState('todos');

  // Selected drug items
  const selectedDrugs = useMemo(() => {
    return DRUGS_DATABASE.filter(d => selectedDrugIds.includes(d.id));
  }, [selectedDrugIds]);

  // Detected interactions among the selected drugs
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

  // Severity stats
  const severityStats = useMemo(() => {
    return {
      contraindicated: detectedInteractions.filter(i => i.severity === 'contraindicated').length,
      major: detectedInteractions.filter(i => i.severity === 'major').length,
      moderate: detectedInteractions.filter(i => i.severity === 'moderate').length,
    };
  }, [detectedInteractions]);

  // Toggle drug in tracker
  const toggleDrug = (drugId: string) => {
    setSelectedDrugIds(prev => 
      prev.includes(drugId) 
        ? prev.filter(id => id !== drugId)
        : [...prev, drugId]
    );
  };

  // Preset clinical scenarios
  const applyPresetScenario = (scenario: 'triplice' | 'cardiopata' | 'psiquiatria' | 'sedacao' | 'anticoagulacao') => {
    switch (scenario) {
      case 'triplice':
        setSelectedDrugIds(['enalapril', 'espironolactona', 'ibuprofeno']);
        break;
      case 'cardiopata':
        setSelectedDrugIds(['varfarina', 'amiodarona', 'digoxina', 'clopidogrel']);
        break;
      case 'psiquiatria':
        setSelectedDrugIds(['litio', 'enalapril', 'ibuprofeno']);
        break;
      case 'sedacao':
        setSelectedDrugIds(['diazepam', 'morfina']);
        break;
      case 'anticoagulacao':
        setSelectedDrugIds(['rivaroxabana', 'ibuprofeno', 'clopidogrel']);
        break;
    }
  };

  // Copy clinical report
  const copyInteractionReport = () => {
    const reportText = `=== LAUDO DE SEGURANÇA FARMACOLÓGICA & INTERAÇÕES ===
Data da Avaliação: ${new Date().toLocaleDateString('pt-BR')}

FÁRMACOS ANALISADOS (${selectedDrugs.length}):
${selectedDrugs.map(d => `- ${d.name} (${d.classCategory}) | Posologia: ${d.commonDose}`).join('\n')}

ALERTAS IDENTIFICADOS (${detectedInteractions.length}):
${detectedInteractions.length === 0 ? 'Nenhuma interação catalogada de alto risco identificada.' : 
  detectedInteractions.map(i => {
    const a = DRUGS_DATABASE.find(d => d.id === i.drugAId)?.name;
    const b = DRUGS_DATABASE.find(d => d.id === i.drugBId)?.name;
    return `[${i.severityLabel.toUpperCase()}] ${a} + ${b}
Risco: ${i.clinicalRisk}
Conduta Recomendada: ${i.management}
---`;
  }).join('\n')}
`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Available drugs to add (filtered by search and category)
  const availableDrugs = useMemo(() => {
    return DRUGS_DATABASE.filter(drug => {
      const matchesSearch = 
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.brandNames.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
        drug.classCategory.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSystem = selectedSystemFilter === 'todos' || drug.system === selectedSystemFilter;
      return matchesSearch && matchesSystem;
    });
  }, [searchTerm, selectedSystemFilter]);

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full gap-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Zap size={22} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Módulo Separado & Autônomo
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Rastreador de Interações Medicamentosas Multidrogas
          </h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            Ferramenta clínica autônoma para cruzamento de prescrições completas e polifarmácia. Monte a lista de fármacos do paciente e analise riscos de nefrotoxicidade, prolongamento de QTc, sangramento e superdosagem.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={copyInteractionReport}
            className="px-3.5 py-2.5 rounded-xl border border-line hover:border-brand-blue text-xs font-bold text-brand-navy flex items-center gap-1.5 transition-all cursor-pointer bg-card"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Copiado para o Prontuário!' : 'Copiar Parecer Clínico'}
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-brand-blue hover:bg-blue-600 text-white flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Printer size={16} />
            Imprimir Laudo
          </button>
        </div>
      </div>

      {/* Preset Scenarios Strip */}
      <div className="card p-5 border border-line bg-card/70 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={15} className="text-amber-400" />
            Cenários de Risco em 1 Clique (Polifarmácia Hospitalar & Ambulatorial):
          </span>
          <button
            onClick={() => setSelectedDrugIds([])}
            className="text-xs font-bold text-ink-muted hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Trash2 size={13} /> Limpar Seleção
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          <button
            onClick={() => applyPresetScenario('triplice')}
            className="p-3 rounded-xl border border-red-500/40 bg-red-950/15 hover:bg-red-950/30 text-left transition-all cursor-pointer group"
          >
            <span className="font-bold text-xs text-red-400 block flex items-center gap-1">
              ⚠️ Tríplice Renal
            </span>
            <span className="text-[10px] text-ink-muted line-clamp-1">Enalapril + Espironolactona + Ibuprofeno</span>
          </button>

          <button
            onClick={() => applyPresetScenario('cardiopata')}
            className="p-3 rounded-xl border border-blue-500/40 bg-blue-950/15 hover:bg-blue-950/30 text-left transition-all cursor-pointer group"
          >
            <span className="font-bold text-xs text-blue-400 block flex items-center gap-1">
              🫀 Cardiopata Complexo
            </span>
            <span className="text-[10px] text-ink-muted line-clamp-1">Varfarina + Amiodarona + Digoxina</span>
          </button>

          <button
            onClick={() => applyPresetScenario('psiquiatria')}
            className="p-3 rounded-xl border border-purple-500/40 bg-purple-950/15 hover:bg-purple-950/30 text-left transition-all cursor-pointer group"
          >
            <span className="font-bold text-xs text-purple-400 block flex items-center gap-1">
              🧠 Psiquiatria & AINE
            </span>
            <span className="text-[10px] text-ink-muted line-clamp-1">Lítio + Enalapril + Ibuprofeno</span>
          </button>

          <button
            onClick={() => applyPresetScenario('sedacao')}
            className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/15 hover:bg-amber-950/30 text-left transition-all cursor-pointer group"
          >
            <span className="font-bold text-xs text-amber-400 block flex items-center gap-1">
              🚨 Sedação Excessiva
            </span>
            <span className="text-[10px] text-ink-muted line-clamp-1">Diazepam + Morfina</span>
          </button>

          <button
            onClick={() => applyPresetScenario('anticoagulacao')}
            className="p-3 rounded-xl border border-rose-500/40 bg-rose-950/15 hover:bg-rose-950/30 text-left transition-all cursor-pointer group"
          >
            <span className="font-bold text-xs text-rose-400 block flex items-center gap-1">
              🩸 Hemorragia & DOAC
            </span>
            <span className="text-[10px] text-ink-muted line-clamp-1">Rivaroxabana + Ibuprofeno + Clopidogrel</span>
          </button>
        </div>
      </div>

      {/* Selected Drugs Active Prescription Chips */}
      <div className="card p-5 border border-line bg-gradient-to-r from-card via-card to-blue-950/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-brand-navy">
              Fármacos Atuais na Prescrição:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-black">
              {selectedDrugs.length} selecionados
            </span>
          </div>

          <span className="text-xs text-ink-muted">
            {selectedDrugs.length < 2 ? 'Adicione pelo menos 2 fármacos para rastrear interações' : 'Algoritmo ativo cruzando todos os pares'}
          </span>
        </div>

        {selectedDrugs.length === 0 ? (
          <div className="p-6 text-center text-xs text-ink-muted border border-dashed border-line rounded-xl">
            Nenhum fármaco adicionado à prescrição. Selecione os medicamentos no catálogo abaixo para iniciar o rastreamento.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {selectedDrugs.map(drug => (
              <div 
                key={drug.id}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-bg border border-line hover:border-brand-blue/60 text-brand-navy text-xs font-bold transition-all shadow-sm group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{drug.name}</span>
                <span className="text-[10px] text-ink-muted font-normal">({drug.brandNames[0]})</span>
                <button
                  onClick={() => toggleDrug(drug.id)}
                  className="w-5 h-5 rounded-md hover:bg-red-500/20 hover:text-red-400 text-ink-muted flex items-center justify-center transition-colors cursor-pointer"
                  title="Remover fármaco da análise"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Risk Metrics Cards */}
      {selectedDrugIds.length >= 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className={`card p-4 flex flex-col justify-center border transition-all ${
            severityStats.contraindicated > 0 ? 'border-red-500/50 bg-red-500/10' : 'border-line'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Contraindicada / Grave</span>
            <span className="text-3xl font-black text-red-400 mt-1">{severityStats.contraindicated}</span>
            <span className="text-[10px] text-ink-muted">Risco crítico / Evitar associação</span>
          </div>

          <div className={`card p-4 flex flex-col justify-center border transition-all ${
            severityStats.major > 0 ? 'border-amber-500/50 bg-amber-500/10' : 'border-line'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Alta Gravidade</span>
            <span className="text-3xl font-black text-amber-400 mt-1">{severityStats.major}</span>
            <span className="text-[10px] text-ink-muted">Monitoramento estrito de parâmetros</span>
          </div>

          <div className="card p-4 flex flex-col justify-center border border-line">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Moderada</span>
            <span className="text-3xl font-black text-blue-400 mt-1">{severityStats.moderate}</span>
            <span className="text-[10px] text-ink-muted">Ajuste de dose ou intervalo</span>
          </div>

          <div className="card p-4 flex flex-col justify-center border border-line">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Cruzamentos Analisados</span>
            <span className="text-3xl font-black text-emerald-400 mt-1">{detectedInteractions.length}</span>
            <span className="text-[10px] text-ink-muted">Pares catalogados na base</span>
          </div>
        </div>
      )}

      {/* Interactions Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-brand-navy flex items-center gap-2">
            <ShieldCheck size={20} className="text-brand-blue" />
            Resultado da Análise Farmacológica Cruzada
          </h2>
          {selectedDrugIds.length >= 2 && (
            <span className="text-xs font-mono text-ink-muted">
              {detectedInteractions.length} {detectedInteractions.length === 1 ? 'interação identificada' : 'interações identificadas'}
            </span>
          )}
        </div>

        {selectedDrugIds.length < 2 ? (
          <div className="card p-10 text-center flex flex-col items-center gap-3 border border-line">
            <Zap size={36} className="text-slate-600" />
            <h3 className="font-bold text-base text-brand-navy">Prescrição Mínima: Selecione pelo menos 2 medicamentos</h3>
            <p className="text-xs text-ink-muted max-w-md">
              Adicione medicamentos abaixo para verificar sinergismo tóxico, bloqueio metabólico de CYP450, indução ou antagonismo farmacológico.
            </p>
          </div>
        ) : detectedInteractions.length === 0 ? (
          <div className="card p-6 border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-4 rounded-2xl">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <h3 className="font-bold text-base text-emerald-300">Nenhuma interação grave catalogada entre os fármacos selecionados</h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Os {selectedDrugs.length} medicamentos selecionados não possuem alertas de contraindicação direta cruzada. Mantenha a vigilância habitual de função renal, hepática e eletrólitos.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {detectedInteractions.map((inter, idx) => {
              const drugA = DRUGS_DATABASE.find(d => d.id === inter.drugAId);
              const drugB = DRUGS_DATABASE.find(d => d.id === inter.drugBId);
              const isContraindicated = inter.severity === 'contraindicated';
              const isMajor = inter.severity === 'major';

              return (
                <div
                  key={idx}
                  className={`card p-6 border rounded-2xl flex flex-col gap-4 transition-all shadow-lg ${
                    isContraindicated 
                      ? 'border-red-500/60 bg-gradient-to-r from-red-950/25 via-card to-card' 
                      : isMajor
                      ? 'border-amber-500/50 bg-gradient-to-r from-amber-950/20 via-card to-card'
                      : 'border-blue-500/40 bg-card'
                  }`}
                >
                  {/* Pair Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/60 pb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-black text-brand-navy">
                        {drugA?.name} <span className="text-ink-muted font-normal">+</span> {drugB?.name}
                      </span>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        isContraindicated 
                          ? 'bg-red-500 text-white' 
                          : isMajor 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}>
                        {inter.severityLabel}
                      </span>
                    </div>

                    <div className="text-xs text-ink-muted font-mono">
                      {drugA?.classCategory} × {drugB?.classCategory}
                    </div>
                  </div>

                  {/* 3 Detail Blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-bg border border-line space-y-1">
                      <span className="font-bold text-slate-400 block flex items-center gap-1.5">
                        <Info size={13} className="text-blue-400" />
                        Mecanismo Farmacológico:
                      </span>
                      <p className="text-ink leading-relaxed text-[11px]">{inter.mechanism}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg border border-line space-y-1">
                      <span className="font-bold text-red-400 block flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-red-400" />
                        Risco Clínico no Paciente:
                      </span>
                      <p className="text-ink leading-relaxed text-[11px] font-semibold">{inter.clinicalRisk}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                      <span className="font-bold text-emerald-400 block flex items-center gap-1.5">
                        <Stethoscope size={13} className="text-emerald-400" />
                        Conduta Médica Recomendada:
                      </span>
                      <p className="text-slate-200 leading-relaxed text-[11px]">{inter.management}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Drug Selection Catalog Table (For adding to tracker) */}
      <div className="card p-6 border border-line space-y-4 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
              <Search size={18} className="text-brand-blue" />
              Catálogo de Fármacos Disponíveis para Cruzamento
            </h3>
            <p className="text-xs text-ink-muted">
              Clique em qualquer medicamento para adicioná-lo ou removê-lo da prescrição em tempo real.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar droga ou classe..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-bg border border-line text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'todos', label: 'Todos os Sistemas' },
            { id: 'cardiovascular', label: 'Cardiovascular' },
            { id: 'nefrologia', label: 'Nefrologia' },
            { id: 'endocrinologia', label: 'Endócrino' },
            { id: 'snc_psiquiatria', label: 'SNC & Psiquiatria' },
            { id: 'analgesia_inflamacao', label: 'Analgesia' },
            { id: 'infecciosas', label: 'Antimicrobianos' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedSystemFilter(f.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl shrink-0 transition-all cursor-pointer ${
                selectedSystemFilter === f.id
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-bg text-ink-muted hover:text-brand-navy border border-line'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid of Drug Cards for 1-Click Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {availableDrugs.map(drug => {
            const isSelected = selectedDrugIds.includes(drug.id);
            return (
              <div
                key={drug.id}
                onClick={() => toggleDrug(drug.id)}
                className={`p-3.5 rounded-xl border text-xs flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-blue bg-blue-950/25 ring-1 ring-brand-blue/50 shadow-md'
                    : 'border-line bg-bg/80 hover:bg-card hover:border-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-extrabold text-brand-navy text-sm">
                      {drug.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-brand-blue text-white' : 'bg-card border border-line text-ink-muted'
                    }`}>
                      {isSelected ? '✓ Na Prescrição' : '+ Adicionar'}
                    </span>
                  </div>

                  <p className="text-[11px] text-ink-muted line-clamp-1">
                    {drug.brandNames.join(', ')}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono line-clamp-1">
                    {drug.classCategory}
                  </p>
                </div>

                <div className="text-[10px] text-ink-muted border-t border-line/60 pt-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Dose Usual:</span>
                  <span className="font-mono text-brand-navy truncate max-w-[180px]">{drug.commonDose}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
