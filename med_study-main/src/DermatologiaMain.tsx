import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sun, Sparkles, PlusCircle, BookOpen, Layers, 
  Stethoscope, FileText, CheckCircle2, 
  ArrowRight, HeartHandshake, Lightbulb, MessageSquarePlus, Trash2
} from 'lucide-react';

interface DermatologiaMainProps {
  key?: React.Key;
  initialTopic?: string;
  onNavigateToDrug?: (drugId: string) => void;
  onNavigateToFicha?: (fichaId: string) => void;
}

interface PlannedTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'ideia' | 'pronto_para_construir' | 'em_construcao';
  suggestedBy: 'usuário' | 'sugestão';
}

export default function DermatologiaMain({ 
  initialTopic = 'dermato-construcao',
  onNavigateToDrug: _onNavigateToDrug,
  onNavigateToFicha: _onNavigateToFicha 
}: DermatologiaMainProps) {
  // Topics list that user and assistant can build together
  const [plannedTopics, setPlannedTopics] = useState<PlannedTopic[]>([
    {
      id: 'hidralazina-farmacodermia',
      title: 'Hidralazina & Lúpus Farmacoinduzido (DILE) e Farmacodermias',
      category: 'Farmacodermia / Reumatodermatologia',
      description: 'Mecanismo da hidralazina (acetiladores lentos, anticorpo anti-histona), manifestações cutâneas eritematosas, artralgia e diagnóstico diferencial.',
      status: 'pronto_para_construir',
      suggestedBy: 'usuário'
    },
    {
      id: 'semiologia-lesoes',
      title: 'Semiologia: Lesões Elementares da Pele',
      category: 'Semiologia Dermatológica',
      description: 'Classificação de máculas, pápulas, placas, bolhas, púrpuras, além de manobras semiológicas (sinal de Nikolsky, diascopia, Auspitz).',
      status: 'ideia',
      suggestedBy: 'sugestão'
    },
    {
      id: 'urgencias-cutaneas',
      title: 'Urgências Cutâneas Graves (SJS / NET / DRESS)',
      category: 'Emergências Clínicas',
      description: 'Critérios de descolamento epidérmico, escore prognóstico SCORTEN e conduta em UTI/CTQ.',
      status: 'ideia',
      suggestedBy: 'sugestão'
    }
  ]);

  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const newTopic: PlannedTopic = {
      id: `topic-${Date.now()}`,
      title: newTopicTitle.trim(),
      category: newTopicCategory.trim() || 'Dermatologia Geral',
      description: newTopicDesc.trim() || 'Tópico adicionado para ser construído em conjunto.',
      status: 'pronto_para_construir',
      suggestedBy: 'usuário'
    };

    setPlannedTopics(prev => [newTopic, ...prev]);
    setNewTopicTitle('');
    setNewTopicCategory('');
    setNewTopicDesc('');
    setShowAddForm(false);
  };

  const handleRemoveTopic = (id: string) => {
    setPlannedTopics(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-card to-slate-900/60 border border-amber-500/20 p-6 md:p-8 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
              <Sparkles size={14} />
              <span>Espaço Zerado · Construção Colaborativa</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Sun className="text-amber-400 shrink-0" size={36} />
              <span>Dermatologia Clínica</span>
            </h1>
            
            <p className="text-sm md:text-base text-ink-muted max-w-2xl">
              Os 7 tópicos prévios foram apagados conforme solicitado. O módulo está totalmente limpo para definirmos e construirmos cada conduta clínica, caso e fisiopatologia juntos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <PlusCircle size={16} />
              <span>{showAddForm ? 'Fechar Formulário' : 'Propor Novo Tópico'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Status Notice Card */}
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
          <HeartHandshake size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-brand-navy dark:text-amber-200">
            Painel limpo & pronto para construirmos juntos
          </h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Nenhuma informação antiga foi imposta. Você pode me dizer exatamente no chat qual o primeiro tópico que quer detalhar (por exemplo, <strong className="text-amber-300">Hidralazina & Lúpus Farmacoinduzido</strong>, que você mencionou antes, ou qualquer outro tema de Dermatologia), e eu vou gerar a tela e o conteúdo sob medida para você!
          </p>
        </div>
      </div>

      {/* Add Topic Form Modal/Collapsible */}
      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border border-amber-500/30 p-6 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4 text-brand-navy dark:text-slate-100 font-bold text-sm">
            <MessageSquarePlus className="text-amber-400" size={18} />
            <span>Adicionar ideia de tópico ao roteiro de estudo</span>
          </div>

          <form onSubmit={handleAddTopic} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-muted mb-1">
                  Nome do Tópico / Doença
                </label>
                <input 
                  type="text" 
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Ex: Hidralazina & Lúpus Medicamentoso..." 
                  className="w-full px-3 py-2 rounded-xl text-xs bg-bg border border-line focus:border-amber-500 focus:outline-none text-brand-navy dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-muted mb-1">
                  Categoria / Eixo
                </label>
                <input 
                  type="text" 
                  value={newTopicCategory}
                  onChange={(e) => setNewTopicCategory(e.target.value)}
                  placeholder="Ex: Farmacodermia, Infecção, Bolhosa..." 
                  className="w-full px-3 py-2 rounded-xl text-xs bg-bg border border-line focus:border-amber-500 focus:outline-none text-brand-navy dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-muted mb-1">
                Foco clínico / O que devemos abordar
              </label>
              <textarea 
                rows={2}
                value={newTopicDesc}
                onChange={(e) => setNewTopicDesc(e.target.value)}
                placeholder="Ex: Anti-histona, suspensão do fármaco, sintomas cutâneos, tempo de resolução..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-bg border border-line focus:border-amber-500 focus:outline-none text-brand-navy dark:text-slate-100 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl border border-line text-xs font-semibold text-ink-muted hover:text-brand-navy"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Salvar no Roteiro
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Topics Road Map / List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="text-amber-400" size={18} />
            <h2 className="text-base font-bold text-brand-navy dark:text-slate-100">
              Roteiro de Tópicos para Construção ({plannedTopics.length})
            </h2>
          </div>
          <span className="text-[11px] text-ink-muted">
            Vamos desenvolvendo um a um
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plannedTopics.map((topic) => (
            <div 
              key={topic.id}
              className="rounded-2xl bg-card border border-line hover:border-amber-500/40 p-5 flex flex-col justify-between gap-4 transition-all shadow-sm group hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 uppercase tracking-wider">
                    {topic.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {topic.suggestedBy === 'usuário' && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                        Prioritário
                      </span>
                    )}
                    <button
                      onClick={() => handleRemoveTopic(topic.id)}
                      className="p-1 rounded text-ink-muted hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Remover ideia"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-brand-navy dark:text-slate-100 group-hover:text-amber-400 transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                  {topic.description}
                </p>
              </div>

              <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
                  <Lightbulb size={13} />
                  <span>Pronto para criar</span>
                </span>
                <span className="text-[10px] text-ink-muted font-mono">
                  Diga no chat para começar
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Next Step Callout */}
      <div className="rounded-2xl border border-line bg-card/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
            <Stethoscope size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-brand-navy dark:text-slate-100">
              Quer começar por Hidralazina & Farmacodermias ou por Lesões Elementares?
            </h4>
            <p className="text-xs text-ink-muted">
              Basta me enviar uma mensagem no chat com o tópico desejado ou como gostaria de estruturá-lo!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-brand-blue shrink-0">
          <span>Aguardando sua escolha</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
