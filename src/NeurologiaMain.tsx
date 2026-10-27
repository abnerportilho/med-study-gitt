import React from 'react';
import { 
  Brain, 
  Flame, 
  Zap, 
  Clock, 
  GitFork, 
  Calculator
} from 'lucide-react';
import NeuroHSE from './components/neurologia/NeuroHSE';
import NeuroEpilepsiaEME from './components/neurologia/NeuroEpilepsiaEME';
import { NeuroDiagnosticoDiferencial } from './components/neurologia/NeuroDiagnosticoDiferencial';
import NeuroCalculadoras from './components/neurologia/NeuroCalculadoras';

export interface NeurologiaMainProps {
  key?: React.Key;
  initialTopic?: string;
  onSelectTopic?: (topicId: string) => void;
}

const TOPIC_CONFIG: Record<string, {
  title: string;
  subtitle: string;
  badge: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}> = {
  'hse': {
    title: 'Encefalite Herpética (HSE)',
    subtitle: 'Fisiopatologia límbica poupando núcleos da base, genética TLR3, falso-negativo de PCR < 72h, regra de ouro do aciclovir e atualização do ensaio DexEnceph (Lancet Neurol 2026).',
    badge: 'Urgência Infecciosa & Límbica',
    tag: 'HSV-1 · TLR3 · DexEnceph 2026',
    icon: Flame,
    accentColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  },
  'epilepsia-eme': {
    title: 'Epilepsia & Estado de Mal Epiléptico (EME)',
    subtitle: 'Classificação ILAE 2025 (estado de consciência e mioclonia negativa), semiologia lobar, síndromes, ensaios SANAD I/II e protocolo cronometrado do EME (t1 5 min e t2 30 min, ESETT/Glauser).',
    badge: 'Crônica & Emergência Crítica',
    tag: 'ILAE 2025 · ESETT · Tempos t1 e t2',
    icon: Zap,
    accentColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
  },
  'crise-vs-sincope': {
    title: 'Diagnóstico Diferencial: Crise vs Síncope & CNEP',
    subtitle: 'Diferenciação clínica pelo escore de Calgary, desmistificação dos abalos da síncope convulsiva (Lempert 1994), sinais semiológicos de CNEP (Avbersek & Sisodiya) e biomarcadores.',
    badge: 'Semiologia & Neurofisiologia',
    tag: 'Calgary · Lempert 1994 · CNEP / CODES',
    icon: GitFork,
    accentColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  },
  'calculadoras-neuro': {
    title: 'Calculadoras Clínicas Neurológicas',
    subtitle: 'Suíte prática com cálculo automático do Escore de Calgary (Síncope vs Crise), Escore STESS (prognóstico no EME), doses do EME por kg (ESETT) e ajuste renal de Aciclovir IV.',
    badge: 'Ferramentas de Decisão Rápida',
    tag: 'Calgary · STESS · Doses EME · Cockcroft-Gault',
    icon: Calculator,
    accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  }
};

export const NeurologiaMain: React.FC<NeurologiaMainProps> = ({ 
  initialTopic = 'hse'
}) => {
  // Normalize topic ID
  const activeTopicKey = React.useMemo(() => {
    if (initialTopic === 'epilepsia' || initialTopic === 'estado-de-mal' || initialTopic === 'eme' || initialTopic === 'epilepsia-eme') {
      return 'epilepsia-eme';
    }
    if (initialTopic === 'crise-vs-sincope' || initialTopic === 'diferencial') {
      return 'crise-vs-sincope';
    }
    if (initialTopic === 'calculadoras-neuro' || initialTopic === 'calculadoras') {
      return 'calculadoras-neuro';
    }
    return 'hse';
  }, [initialTopic]);

  const currentTopic = TOPIC_CONFIG[activeTopicKey] || TOPIC_CONFIG['hse'];
  const IconComponent = currentTopic.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header Banner - Focused specifically on the current active topic, without horizontal menu buttons */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-indigo-400" />
                  Neurologia Clínica & Urgências
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${currentTopic.accentColor}`}>
                  <IconComponent className="w-3 h-3" />
                  {currentTopic.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {currentTopic.tag}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <IconComponent className="w-7 h-7 text-indigo-400 shrink-0" />
                <span>{currentTopic.title}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {currentTopic.subtitle}
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Area: Renders ONLY the chosen standalone topic */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
        {activeTopicKey === 'hse' && <NeuroHSE />}
        {activeTopicKey === 'epilepsia-eme' && <NeuroEpilepsiaEME />}
        {activeTopicKey === 'crise-vs-sincope' && <NeuroDiagnosticoDiferencial />}
        {activeTopicKey === 'calculadoras-neuro' && <NeuroCalculadoras />}
      </main>

      {/* Footer References */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Capítulo: <em>Encefalite Herpética, Epilepsia, Estado de Mal Epiléptico e Diagnósticos Diferenciais</em> (2026).</span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            Diretrizes ILAE 2025 · Ensaio DexEnceph (Lancet Neurol 2026) · ESETT (NEJM) · Escore de Calgary
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeurologiaMain;
