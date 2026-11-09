import React, { useState, useRef, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Trash2, 
  ClipboardList, 
  CheckCircle2, 
  Plus,
  Edit3,
  Save,
  X,
  Undo2
} from 'lucide-react';
import { MODELOS_CONSULTA } from './data/modelosConsultaData';

interface ModelosConsultaMainProps {
  selectedModelId?: string;
  onSelectModel?: (id: string) => void;
}

const LOCAL_STORAGE_KEY = 'pep_custom_modelos_templates';

const loadSavedTemplates = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load custom templates from localStorage', e);
  }
  return {};
};

export default function ModelosConsultaMain({ 
  selectedModelId = 'clinica-medica',
  onSelectModel 
}: ModelosConsultaMainProps) {
  const [internalActiveId, setInternalActiveId] = useState<string>(selectedModelId);

  // Sync with prop when selected from sidebar
  useEffect(() => {
    if (selectedModelId) {
      setInternalActiveId(selectedModelId);
    }
  }, [selectedModelId]);

  const activeModelId = selectedModelId || internalActiveId;
  const activeModel = MODELOS_CONSULTA.find(m => m.id === activeModelId) || MODELOS_CONSULTA[0];

  // Custom templates persisted in browser localStorage
  const [customTemplates, setCustomTemplates] = useState<Record<string, string>>(loadSavedTemplates);

  // Helper to get active template for a model (custom if saved, otherwise default)
  const getActiveTemplate = (id: string) => {
    return customTemplates[id] ?? MODELOS_CONSULTA.find(m => m.id === id)?.templatePadrao ?? '';
  };

  // In-memory text scratchpad per model
  const [modelTexts, setModelTexts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    const saved = loadSavedTemplates();
    MODELOS_CONSULTA.forEach(m => {
      initial[m.id] = saved[m.id] ?? m.templatePadrao;
    });
    return initial;
  });

  // Template Editing Mode State
  const [isEditingTemplate, setIsEditingTemplate] = useState<boolean>(false);
  const [templateDraft, setTemplateDraft] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const [copied, setCopied] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentText = modelTexts[activeModel.id] ?? getActiveTemplate(activeModel.id);

  // When changing model, close edit mode
  useEffect(() => {
    setIsEditingTemplate(false);
  }, [activeModelId]);

  const handleTextChange = (val: string) => {
    if (isEditingTemplate) {
      setTemplateDraft(val);
    } else {
      setModelTexts(prev => ({
        ...prev,
        [activeModel.id]: val
      }));
    }
  };

  // Start editing the base template
  const handleStartEditTemplate = () => {
    setTemplateDraft(getActiveTemplate(activeModel.id));
    setIsEditingTemplate(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  // Save modified template as the new default
  const handleSaveTemplate = () => {
    const updated = {
      ...customTemplates,
      [activeModel.id]: templateDraft
    };
    setCustomTemplates(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom template to localStorage', e);
    }
    // Update live text to the new template
    setModelTexts(prev => ({
      ...prev,
      [activeModel.id]: templateDraft
    }));
    setIsEditingTemplate(false);
    setSaveSuccessMsg('Modelo padrão salvo com sucesso para este tópico!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Reset template back to factory default
  const handleResetToFactory = () => {
    if (window.confirm('Deseja restaurar o modelo original de fábrica deste tópico?')) {
      const updated = { ...customTemplates };
      delete updated[activeModel.id];
      setCustomTemplates(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update localStorage', e);
      }
      setTemplateDraft(activeModel.templatePadrao);
      setModelTexts(prev => ({
        ...prev,
        [activeModel.id]: activeModel.templatePadrao
      }));
      setIsEditingTemplate(false);
      setSaveSuccessMsg('Modelo restaurado para o padrão original de fábrica!');
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    }
  };

  // Cancel template editing
  const handleCancelEdit = () => {
    setIsEditingTemplate(false);
    setTemplateDraft('');
  };

  // Copy whole current text to clipboard
  const handleCopy = () => {
    const textToCopy = isEditingTemplate ? templateDraft : currentText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Restore active model template in scratchpad
  const handleResetToDefault = () => {
    const target = getActiveTemplate(activeModel.id);
    setModelTexts(prev => ({
      ...prev,
      [activeModel.id]: target
    }));
  };

  // Populate realistic clinical example
  const handleLoadExample = () => {
    setModelTexts(prev => ({
      ...prev,
      [activeModel.id]: activeModel.templateExemplo
    }));
  };

  // Clear text
  const handleClear = () => {
    setModelTexts(prev => ({
      ...prev,
      [activeModel.id]: ''
    }));
  };

  // Quick insert snippet at end of text
  const handleInsertSnippet = (snippet: string) => {
    if (isEditingTemplate) {
      setTemplateDraft(prev => prev ? `${prev}\n${snippet}` : snippet);
    } else {
      setModelTexts(prev => {
        const existing = prev[activeModel.id] ?? '';
        if (!existing.trim()) return { ...prev, [activeModel.id]: snippet };
        return { ...prev, [activeModel.id]: `${existing}\n${snippet}` };
      });
    }
  };

  const hasCustomTemplate = !!customTemplates[activeModel.id];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 p-2 sm:p-4 md:p-6 font-sans">
      
      {/* Top Banner Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-3xl border border-line shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1">
            <ClipboardList size={16} />
            <span>Prontuário Eletrônico · Rascunho Ágil (Copia & Cola PEP)</span>
            {hasCustomTemplate && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-500 text-[10px] font-bold border border-cyan-500/30">
                Modelo Customizado
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight flex items-center gap-2">
            <span>{activeModel.title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-2xl leading-relaxed">
            {activeModel.description}
          </p>
        </div>

        {/* Global Action Buttons in Top Right */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
          {/* Edit Template Option in Top Right */}
          {!isEditingTemplate ? (
            <button
              onClick={handleStartEditTemplate}
              title="Editar o modelo padrão deste tópico"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs bg-bg border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer shadow-sm hover:border-cyan-500"
            >
              <Edit3 size={15} />
              <span>EDITAR MODELO</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveTemplate}
                title="Salvar alterações como modelo padrão permanente deste tópico"
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer ring-2 ring-emerald-500/30"
              >
                <Save size={15} />
                <span>SALVAR MODELO</span>
              </button>
              <button
                onClick={handleCancelEdit}
                title="Cancelar edição e voltar ao rascunho"
                className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl font-bold text-xs bg-bg border border-line text-ink-muted hover:text-brand-navy hover:bg-card transition-all cursor-pointer"
              >
                <X size={15} />
                <span className="hidden sm:inline">CANCELAR</span>
              </button>
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-xl transition-all cursor-pointer ${
              copied 
                ? 'bg-emerald-600 ring-4 ring-emerald-500/30 scale-102' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:scale-98 shadow-cyan-600/20'
            }`}
          >
            {copied ? (
              <>
                <Check size={18} className="animate-bounce" />
                <span>COPIADO COM SUCESSO!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>COPIAR PARA O PRONTUÁRIO</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Save Success Banner Notification */}
      {saveSuccessMsg && (
        <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-400 font-semibold animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
          <button
            onClick={() => setSaveSuccessMsg(null)}
            className="text-emerald-400 hover:text-emerald-200 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Editor Card */}
      <div className={`bg-card rounded-3xl border shadow-lg overflow-hidden flex flex-col flex-1 transition-all ${
        isEditingTemplate ? 'border-amber-500/50 ring-2 ring-amber-500/20' : 'border-line'
      }`}>
        {/* Editor Controls Bar */}
        <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
          isEditingTemplate ? 'bg-amber-500/10 border-amber-500/30' : 'bg-bg/60 border-line'
        }`}>
          <div className="flex items-center gap-2 text-xs font-semibold">
            {isEditingTemplate ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="font-extrabold text-amber-500 flex items-center gap-1.5">
                  <Edit3 size={14} />
                  Modo de Edição do Modelo Base:
                </span>
                <span className="text-[11px] text-ink-muted hidden md:inline">
                  Edite a estrutura padrão abaixo. Ao clicar em "Salvar Modelo", este passará a ser o seu modelo padrão permanente.
                </span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-brand-navy">Editor de Rascunho Clínico</span>
                <span className="text-[11px] text-ink-muted hidden sm:inline">
                  (Edite livremente antes de copiar — Nada é salvo no prontuário)
                </span>
              </>
            )}
          </div>

          {/* Right Action Buttons in Topic Bar */}
          <div className="flex items-center gap-2">
            {isEditingTemplate ? (
              <>
                <button
                  onClick={handleSaveTemplate}
                  title="Salvar alterações no modelo permanente"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <Save size={14} />
                  <span>Salvar Modelo</span>
                </button>

                {hasCustomTemplate && (
                  <button
                    onClick={handleResetToFactory}
                    title="Restaurar o modelo padrão original de fábrica"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-line text-xs font-bold text-amber-500 hover:bg-amber-500/10 transition-all cursor-pointer shadow-sm"
                  >
                    <Undo2 size={14} />
                    <span className="hidden sm:inline">Padrão Original</span>
                  </button>
                )}

                <button
                  onClick={handleCancelEdit}
                  title="Cancelar e descartar edições do modelo"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-line text-xs font-bold text-ink-muted hover:text-brand-navy hover:bg-bg transition-all cursor-pointer shadow-sm"
                >
                  <X size={14} />
                  <span>Cancelar</span>
                </button>
              </>
            ) : (
              <>
                {/* Option in the Top Right of the topic to edit the model */}
                <button
                  onClick={handleStartEditTemplate}
                  title="Editar o modelo padrão deste tópico no canto superior"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-cyan-500/40 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer shadow-sm"
                >
                  <Edit3 size={14} />
                  <span>Editar Modelo</span>
                </button>

                <button
                  onClick={handleLoadExample}
                  title="Preencher com anamnese e exame físico de exemplo realista"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-line text-xs font-bold text-brand-navy hover:bg-bg hover:text-cyan-600 transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span className="hidden sm:inline">Preencher Exemplo</span>
                </button>

                <button
                  onClick={handleResetToDefault}
                  title="Restaurar o modelo padrão deste tópico"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-line text-xs font-bold text-ink-muted hover:text-brand-navy hover:bg-bg transition-all cursor-pointer shadow-sm"
                >
                  <RotateCcw size={14} />
                  <span>Restaurar</span>
                </button>

                <button
                  onClick={handleClear}
                  title="Limpar o editor para iniciar do zero"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-card border border-line text-xs font-semibold text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer shadow-sm"
                >
                  <Trash2 size={13} />
                  <span className="hidden sm:inline">Limpar</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick Insertion Chips (Snippets) */}
        {activeModel.snippets && activeModel.snippets.length > 0 && (
          <div className="px-4 py-2.5 bg-bg/30 border-b border-line/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-ink-muted shrink-0 flex items-center gap-1">
              <Plus size={12} className="text-cyan-600 dark:text-cyan-400" />
              Atalhos rápidos:
            </span>
            <div className="flex items-center gap-1.5">
              {activeModel.snippets.map((snip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleInsertSnippet(snip.text)}
                  className="px-2.5 py-1 rounded-lg bg-card hover:bg-cyan-500/10 border border-line hover:border-cyan-500/30 text-ink-muted hover:text-cyan-600 dark:hover:text-cyan-300 text-[11px] font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>{snip.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Area (Monospace Clinical Scratchpad - Expanded 3x) */}
        <div className="p-4 sm:p-6 bg-card flex-1 flex flex-col">
          <textarea
            ref={textareaRef}
            value={isEditingTemplate ? templateDraft : currentText}
            onChange={(e) => handleTextChange(e.target.value)}
            rows={50}
            spellCheck={false}
            placeholder={isEditingTemplate ? "Edite o esqueleto do modelo padrão deste tópico aqui..." : "Escreva sua consulta médica aqui..."}
            className={`w-full min-h-[750px] sm:min-h-[850px] lg:min-h-[920px] p-6 sm:p-8 rounded-2xl bg-bg/90 border focus:outline-none focus:ring-2 font-mono text-sm sm:text-base leading-relaxed resize-y shadow-inner text-brand-navy ${
              isEditingTemplate 
                ? 'border-amber-500/60 focus:ring-amber-500/40 ring-1 ring-amber-500/30' 
                : 'border-line focus:ring-cyan-500/40 selection:bg-cyan-500/20'
            }`}
          />
        </div>

        {/* Editor Bottom Bar */}
        <div className="p-4 bg-bg/60 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
          <div className="flex items-center gap-3">
            <span>{(isEditingTemplate ? templateDraft : currentText).length} caracteres</span>
            <span>•</span>
            <span>{(isEditingTemplate ? templateDraft : currentText).split(/\r\n|\r|\n/).length} linhas</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} />
              Pronto para Prontuário Eletrônico (PEP)
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-md cursor-pointer ${
                copied 
                  ? 'bg-emerald-600 ring-2 ring-emerald-500/40' 
                  : 'bg-cyan-600 hover:bg-cyan-500 active:scale-98'
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copiar Modelo Atual</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
