import React, { useState, useMemo } from 'react';
import { 
  Stethoscope, 
  FileText, 
  BookOpen, 
  Search, 
  ArrowRight, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Apple, 
  Heart, 
  Syringe, 
  ShieldAlert, 
  Flame, 
  Scissors, 
  ShieldCheck, 
  Baby, 
  Calendar, 
  ChevronRight,
  Filter,
  Check,
  ExternalLink,
  Layers,
  Clock,
  Pill,
  Info,
  LayoutGrid,
  List,
  ChevronDown,
  Sun
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface HubPortalProps {
  onNavigateToDisease: (specialtyId: string, diseaseId: string) => void;
  onNavigateToSpecialty: (specialtyId: string) => void;
  initialMode?: 'hub' | 'orientacoes' | 'resumos';
}

interface FichaOrientacao {
  id: string;
  title: string;
  subtitle: string;
  specialtyId: string;
  specialtyName: string;
  diseaseId?: string;
  icon: React.ElementType;
  badge: string;
  status: 'disponivel' | 'em_breve';
  tags: string[];
  description: string;
  targetAudience: 'Paciente e Familiar' | 'Profissional e Paciente' | 'Ambulatório';
  features: string[];
  paperFormat: 'A4 Retrato' | 'A4 Paisagem ou Retrato';
}

export default function HubPortalMain({ 
  onNavigateToDisease, 
  onNavigateToSpecialty,
  initialMode = 'hub'
}: HubPortalProps) {
  const [currentMode, setCurrentMode] = useState<'hub' | 'orientacoes' | 'resumos'>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedFichaId, setExpandedFichaId] = useState<string | null>(null);

  // List of all Fichas de Orientações (Current & Future ones)
  const FICHAS_DE_ORIENTACOES: FichaOrientacao[] = useMemo(() => [
    {
      id: 'drc-patient-guide',
      title: 'Guia de Dieta & Orientações ao Paciente (DRC)',
      subtitle: 'Nutrição renal simplificada, manejo de minerais e restrição hídrica na Doença Renal Crônica.',
      specialtyId: 'nefrologia',
      specialtyName: 'Nefrologia',
      diseaseId: 'drc-patient-guide',
      icon: Apple,
      badge: 'Disponível Agora • Imprimível A4',
      status: 'disponivel',
      tags: ['Nutrição Renal', 'Potássio & Fósforo', 'Pirâmide Alimentar', 'Impressão A4'],
      description: 'Guia completo para entrega direta ao paciente com doença renal não dialítica ou dialítica, com linguagem clara, técnica de cozimento com dupla fervura e orientações de autocuidado.',
      targetAudience: 'Paciente e Familiar',
      paperFormat: 'A4 Retrato',
      features: [
        'Pirâmide alimentar adaptada para a função renal',
        'Tabela prática de alimentos proibidos e permitidos',
        'Controle de potássio, fósforo, sódio e volume hídrico',
        'Dicas de temperos naturais sem cloreto de sódio',
        'Diagramação em A4 de alta resolução para impressão imediata'
      ]
    },
    {
      id: 'mapa-glicemico',
      title: 'Mapa & Diário de Glicemia Capilar (Personalizável)',
      subtitle: 'Grade flexível de monitoramento domiciliar de glicemias com metas e conduta de hipoglicemia.',
      specialtyId: 'endocrinologia',
      specialtyName: 'Endocrinologia',
      diseaseId: 'mapa-glicemico',
      icon: Activity,
      badge: 'Disponível Agora • Imprimível A4',
      status: 'disponivel',
      tags: ['Diário Glicêmico', 'Insulina & Antidiabéticos', 'Regra 15x15', 'Coluna de Data Livre'],
      description: 'Ferramenta interativa de mapeamento de glicemias capilares com frequências de 1 a 6x ao dia, campo livre para o paciente anotar a caneta, regras clínicas de hipoglicemia e impressão em A4.',
      targetAudience: 'Paciente e Familiar',
      paperFormat: 'A4 Paisagem ou Retrato',
      features: [
        'Presets clínicos de 1 clique (Jejum, 2x/dia, 3x/dia, Perfil Completo)',
        'Coluna de data livre ("___/___") para preenchimento manual do paciente',
        'Metas glicêmicas ajustáveis pelo médico com color-coding inteligente',
        'Instruções da Regra dos 15g para correção rápida de hipoglicemia',
        'Impressão A4 limpa com cabeçalho médico e espaço de assinatura'
      ]
    },
    {
      id: 'mrpa-diario',
      title: 'Diário de Automonitorização da Pressão Arterial (MRPA 7 Dias)',
      subtitle: 'Protocolo de aferição domiciliar da pressão arterial pela manhã e noite com critérios diagnósticos.',
      specialtyId: 'cardiologia',
      specialtyName: 'Cardiologia',
      diseaseId: 'mrpa-diario',
      icon: Heart,
      badge: 'Disponível Agora • Imprimível A4',
      status: 'disponivel',
      tags: ['Hipertensão', 'MRPA', 'Técnica de Aferição', 'Registro 7 Dias'],
      description: 'Ficha editável para registro da pressão arterial domiciliar (7 dias com 2 medidas ou 5/7 dias com 3 medidas por período), cálculo automático das médias sem o 1º dia, interpretação com a PA do consultório e folha A4 limpa para o paciente preencher a caneta.',
      targetAudience: 'Paciente e Familiar',
      paperFormat: 'A4 Retrato',
      features: [
        'Protocolo de 7 dias com medidas matutinas e noturnas em duplicata',
        'Técnica padronizada de aferição (braço apoiado, bexiga vazia, 5 min repouso)',
        'Cálculo e registro das médias pressóricas para avaliação de jaleco branco',
        'Sinais de crise hipertensiva de alarme que exigem pronto-socorro imediato'
      ]
    },
    {
      id: 'inaladores-asma',
      title: 'Guia de Técnica Inalatória e Plano de Ação na Asma',
      subtitle: 'Passo a passo visual para uso correto de sprays com espaçador e inaladores de pó seco.',
      specialtyId: 'pneumologia',
      specialtyName: 'Pneumologia',
      diseaseId: 'asma-plano-acao',
      icon: Flame,
      badge: 'Disponível Agora • Imprimível A4',
      status: 'disponivel',
      tags: ['Asma & DPOC', 'Espaçador', 'Pó Seco', 'Plano Semafórico'],
      description: 'Guia visual e plano de ação semafórico (Zona Verde, Amarela e Vermelha) para controle da asma, uso do medicamento de alívio e manutenção, além de higiene oral pós-corticoide.',
      targetAudience: 'Paciente e Familiar',
      paperFormat: 'A4 Retrato',
      features: [
        'Técnica correta com espaçador valvulado passo a passo',
        'Diferenças entre Aerolizer, Diskus e Turbuhaler',
        'Importância do enxágue oral para prevenir candidíase',
        'Plano de ação semafórico para crises e exacerbações'
      ]
    },
    {
      id: 'pe-diabetico',
      title: 'Guia de Cuidados com os Pés no Diabetes (Pé Diabético)',
      subtitle: 'Checklist de inspeção diária, calçados adequados e prevenção de feridas e complicações neuropáticas.',
      specialtyId: 'endocrinologia',
      specialtyName: 'Endocrinologia',
      diseaseId: 'pe-diabetico',
      icon: Syringe,
      badge: 'Disponível Agora • Imprimível A4',
      status: 'disponivel',
      tags: ['Diabetes', 'Neuropatia', 'Prevenção de Úlceras', 'Autocuidado'],
      description: 'Orientações práticas para o paciente diabético inspecionar os pés diariamente com espelho, escolha de meias claras e calçados sem costuras, hidratação correta e corte reto das unhas.',
      targetAudience: 'Paciente e Familiar',
      paperFormat: 'A4 Retrato',
      features: [
        'Checklist ilustrado de autoinspeção plantar diária',
        'Cuidados com temperatura da água e corte de unhas',
        'Orientações sobre calçados adequados e meias de algodão',
        'Sinais de alarme: calos, bolhas, perda de sensibilidade ou fissuras'
      ]
    }
  ], []);

  // Filtered fichas
  const filteredFichas = useMemo(() => {
    return FICHAS_DE_ORIENTACOES.filter(ficha => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        ficha.title.toLowerCase().includes(q) ||
        ficha.subtitle.toLowerCase().includes(q) ||
        ficha.specialtyName.toLowerCase().includes(q) ||
        ficha.description.toLowerCase().includes(q) ||
        ficha.tags.some(t => t.toLowerCase().includes(q));

      const matchesCat = 
        selectedCategory === 'todas' ? true :
        selectedCategory === 'disponivel' ? ficha.status === 'disponivel' :
        selectedCategory === 'farmacos' ? (
          ficha.specialtyId === 'medicamentos' || 
          ficha.diseaseId === 'propiltiouracil' || 
          ficha.diseaseId === 'hidralazina' || 
          ficha.tags.some(t => t.toLowerCase().includes('fármaco') || t.toLowerCase().includes('medicamento') || t.toLowerCase().includes('lúpus') || t.toLowerCase().includes('vasculite'))
        ) :
        selectedCategory === ficha.specialtyId;

      return matchesSearch && matchesCat;
    });
  }, [FICHAS_DE_ORIENTACOES, searchQuery, selectedCategory]);

  const availableCount = useMemo(() => {
    return FICHAS_DE_ORIENTACOES.filter(f => f.status === 'disponivel').length;
  }, [FICHAS_DE_ORIENTACOES]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-12">
      {/* Top Header & Breadcrumb Nav */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 border",
            currentMode === 'orientacoes'
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : currentMode === 'resumos'
              ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
              : "bg-brand-blue/15 border-brand-blue/30 text-brand-blue"
          )}>
            {currentMode === 'orientacoes' ? <Printer size={24} /> : currentMode === 'resumos' ? <BookOpen size={24} /> : <Stethoscope size={24} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                {currentMode === 'orientacoes' ? 'Acervo Ambulatorial' : currentMode === 'resumos' ? 'Diretrizes Clínicas' : 'Central Médica'}
              </span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-semibold",
                currentMode === 'orientacoes'
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                  : "bg-brand-blue/10 text-brand-blue"
              )}>
                {currentMode === 'orientacoes' ? 'Formato A4 para Impressão' : 'Versão Integrada'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              {currentMode === 'orientacoes' ? 'Fichas de Orientações aos Pacientes' : currentMode === 'resumos' ? 'Resumos Clínicos & Diretrizes' : 'Portal Clínico & Central de Materiais'}
            </h1>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center p-1 bg-card border border-line rounded-xl shadow-inner self-stretch sm:self-auto">
          <button
            onClick={() => setCurrentMode('hub')}
            className={cn(
              "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2",
              currentMode === 'hub'
                ? "bg-brand-blue text-white shadow-sm"
                : "text-ink-muted hover:text-brand-navy"
            )}
          >
            <Layers size={14} />
            Visão Geral (Hub)
          </button>
          <button
            onClick={() => setCurrentMode('resumos')}
            className={cn(
              "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2",
              currentMode === 'resumos'
                ? "bg-brand-blue text-white shadow-sm"
                : "text-ink-muted hover:text-brand-navy"
            )}
          >
            <BookOpen size={14} />
            Resumos Clínicos
          </button>
          <button
            onClick={() => setCurrentMode('orientacoes')}
            className={cn(
              "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 relative",
              currentMode === 'orientacoes'
                ? "bg-brand-blue text-white shadow-sm"
                : "text-ink-muted hover:text-brand-navy"
            )}
          >
            <FileText size={14} />
            Fichas de Orientações (A4)
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-card animate-pulse" />
          </button>
          <button
            onClick={() => onNavigateToSpecialty('medicamentos')}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 text-ink-muted hover:text-purple-400"
          >
            <Pill size={14} />
            Medicamentos & Interações
          </button>
        </div>
      </div>

      {/* MODE 1: HUB LANDING VIEW (THREE MAJOR PATHS) */}
      {currentMode === 'hub' && (
        <div className="flex flex-col gap-10">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900/60 border border-blue-500/20 p-6 md:p-8">
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/30">
                <Sparkles size={13} />
                Navegação Inteligente & Central Médica Completa
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                O que você deseja acessar agora?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Escolha entre os <strong>Resumos Clínicos</strong> com diretrizes terapêuticas completas para consulta médica, as <strong>Fichas de Orientações</strong> diagramadas em folha A4 para entrega imediata ao paciente, ou o <strong>Guia Farmacológico & Rastreador de Interações</strong> para prevenção de eventos adversos e toxicologia.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />
          </div>

          {/* THREE PRIMARY PATHS: RESUMOS CLÍNICOS vs FICHAS A4 vs MEDICAMENTOS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* OPTION 1: RESUMOS CLÍNICOS */}
            <div 
              onClick={() => setCurrentMode('resumos')}
              className="group cursor-pointer rounded-2xl bg-card border border-line hover:border-brand-blue/50 p-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-brand-blue/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all" />
              
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-md">
                    <BookOpen size={26} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    35+ Protocolos
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                  Resumos Clínicos & Diretrizes
                </h3>
                <p className="text-ink-muted text-xs leading-relaxed mb-4">
                  Protocolos médicos aprofundados, fisiopatologia, diagnóstico passo a passo, condutas escalonadas e calculadoras organizadas por especialidade médica.
                </p>

                {/* Specialties preview pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 text-xs">
                  {['Pneumo', 'Cardio', 'Nefro', 'Emergência', 'Gineco', 'Endócrino', 'Cirurgia'].map(spec => (
                    <span 
                      key={spec}
                      className="px-2 py-0.5 rounded-md bg-bg text-ink-muted border border-line/60 font-medium text-[11px]"
                    >
                      {spec}
                    </span>
                  ))}
                  <span className="px-1.5 py-0.5 text-ink-muted font-bold text-[11px]">+ mais</span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-brand-blue font-bold text-xs group-hover:translate-x-1 transition-transform">
                <span>Abrir Resumos Clínicos</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* OPTION 2: FICHAS DE ORIENTAÇÕES */}
            <div 
              onClick={() => setCurrentMode('orientacoes')}
              className="group cursor-pointer rounded-2xl bg-card border border-line hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-emerald-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all" />
              
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-md">
                    <FileText size={26} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <Printer size={12} />
                    Imprimíveis em A4
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-emerald-400 transition-colors">
                  Fichas de Orientações (A4)
                </h3>
                <p className="text-ink-muted text-xs leading-relaxed mb-4">
                  Guias práticos para entrega ao paciente, diários de monitorização domiciliar, mapas glicêmicos, pirâmides alimentares e condutas com pautas nítidas de impressão em folha A4.
                </p>

                {/* Active materials preview */}
                <div className="space-y-1.5 mb-6 text-xs">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-bg border border-line/60 text-[11px]">
                    <Apple size={13} className="text-emerald-400 shrink-0" />
                    <span className="font-semibold text-brand-navy truncate">Dieta & Orientações DRC</span>
                    <span className="ml-auto text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0">Pronto</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-bg border border-line/60 text-[11px]">
                    <Activity size={13} className="text-blue-400 shrink-0" />
                    <span className="font-semibold text-brand-navy truncate">Mapa Glicêmico Capilar</span>
                    <span className="ml-auto text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0">Pronto</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-emerald-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                <span>Explorar Fichas A4</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* OPTION 3: GUIA FARMACOLÓGICO & INTERAÇÕES */}
            <div 
              onClick={() => onNavigateToSpecialty('medicamentos')}
              className="group cursor-pointer rounded-2xl bg-card border border-line hover:border-purple-500/50 p-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all" />
              
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-md">
                    <Pill size={26} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                    <Sparkles size={12} />
                    Rastreador Ativo
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-purple-400 transition-colors">
                  Medicamentos, Antídotos & Interações
                </h3>
                <p className="text-ink-muted text-xs leading-relaxed mb-4">
                  Catálogo farmacológico completo com ajustes de dose em comorbidades (DRC, Idosos, Gestação), tabela rápida de antídotos de emergência e rastreador de interações multidrogas em tempo real.
                </p>

                {/* Badges preview */}
                <div className="flex flex-wrap gap-1.5 mb-6 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-bg text-ink-muted border border-line/60 font-medium">Interações Multidrogas</span>
                  <span className="px-2 py-0.5 rounded-md bg-bg text-ink-muted border border-line/60 font-medium">Ajuste DRC / TFG</span>
                  <span className="px-2 py-0.5 rounded-md bg-bg text-ink-muted border border-line/60 font-medium">Antídotos Plantão</span>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between text-purple-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                <span>Acessar Guia de Medicamentos</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Quick Access to Available Sheets */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">Fichas com Impressão A4 Prontas para Uso</h3>
                <p className="text-xs text-ink-muted">Acesse diretamente com 1 clique</p>
              </div>
              <button 
                onClick={() => setCurrentMode('orientacoes')}
                className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
              >
                Ver galeria completa ({FICHAS_DE_ORIENTACOES.length} fichas)
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DRC Guide Quick Card */}
              <div className="p-4 rounded-xl bg-card border border-line hover:border-emerald-500/40 transition-all flex flex-col justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Apple size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Nefrologia</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">A4 Pronto</span>
                    </div>
                    <h4 className="font-bold text-brand-navy text-sm">Guia de Dieta & Orientações ao Paciente (DRC)</h4>
                    <p className="text-xs text-ink-muted mt-1">Manejo de potássio, fósforo, sódio, líquidos e tabela nutricional clara.</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToDisease('nefrologia', 'drc-patient-guide')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Printer size={14} />
                  Abrir Guia do Paciente & Imprimir A4
                </button>
              </div>

              {/* Mapa de Glicemia Quick Card */}
              <div className="p-4 rounded-xl bg-card border border-line hover:border-blue-500/40 transition-all flex flex-col justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Activity size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Endocrinologia</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">A4 Pronto</span>
                    </div>
                    <h4 className="font-bold text-brand-navy text-sm">Mapa & Diário de Glicemia Capilar</h4>
                    <p className="text-xs text-ink-muted mt-1">Grade flexível 1x a 6x/dia, data livre para anotar e regra 15x15.</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToDisease('endocrinologia', 'mapa-glicemico')}
                  className="w-full py-2 px-3 rounded-lg bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Printer size={14} />
                  Abrir Diário de Glicemia & Imprimir A4
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FICHAS DE ORIENTAÇÕES (MINIMALIST & FAST ACCESS) */}
      {currentMode === 'orientacoes' && (
        <div className="flex flex-col gap-6">
          {/* Minimalist Search & Controls Toolbar */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar ficha por título, doença, especialidade ou palavra-chave..."
                  className="w-full pl-9 pr-8 py-2.5 bg-card border border-line rounded-xl text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-emerald-500 shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted hover:text-ink font-bold px-1"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* View Switcher (Grid vs Lista) */}
              <div className="flex items-center p-1 bg-card border border-line rounded-xl shadow-sm shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  title="Visualização em Cards"
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === 'grid'
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-xs"
                      : "text-ink-muted hover:text-brand-navy"
                  )}
                >
                  <LayoutGrid size={14} />
                  <span>Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="Visualização em Lista Rápida"
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === 'list'
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-xs"
                      : "text-ink-muted hover:text-brand-navy"
                  )}
                >
                  <List size={14} />
                  <span>Lista</span>
                </button>
              </div>

              {/* Back to hub */}
              <button
                onClick={() => setCurrentMode('hub')}
                className="px-3 py-2 rounded-xl bg-card border border-line text-xs font-bold text-ink-muted hover:text-brand-navy hover:border-brand-blue flex items-center gap-1.5 transition-all shrink-0 cursor-pointer hidden md:flex"
              >
                <ArrowRight size={13} className="rotate-180" />
                <span>Hub</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'todas', label: `Todas (${FICHAS_DE_ORIENTACOES.length})` },
                { id: 'disponivel', label: `✓ Prontas para Impressão (${availableCount})`, highlight: true },
                { id: 'farmacos', label: 'Fármacos & Segurança' },
                { id: 'cardiologia', label: 'Cardiologia' },
                { id: 'endocrinologia', label: 'Endocrinologia' },
                { id: 'nefrologia', label: 'Nefrologia' },
                { id: 'pneumologia', label: 'Pneumologia' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer",
                    selectedCategory === cat.id
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm"
                      : cat.highlight
                      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/15"
                      : "bg-card border-line text-ink-muted hover:text-brand-navy hover:border-slate-400/40"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Subtle Count Bar */}
            <div className="flex items-center justify-between text-xs text-ink-muted px-1 pt-1">
              <span>
                Exibindo <strong className="text-brand-navy font-bold">{filteredFichas.length}</strong> {filteredFichas.length === 1 ? 'ficha' : 'fichas'}
                {selectedCategory === 'disponivel' && ' prontas para impressão A4'}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                {availableCount} fichas com impressão A4 interativa em 1 clique
              </span>
            </div>
          </div>

          {/* GRID VIEW: Minimalist, Scannable & Clean */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
              {filteredFichas.map(ficha => {
                const IconComp = ficha.icon;
                const isAvailable = ficha.status === 'disponivel';
                const isExpanded = expandedFichaId === ficha.id;

                return (
                  <div 
                    key={ficha.id}
                    onClick={() => {
                      if (isAvailable && ficha.diseaseId) {
                        onNavigateToDisease(ficha.specialtyId, ficha.diseaseId);
                      }
                    }}
                    className={cn(
                      "rounded-2xl bg-card border transition-all p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-sm",
                      isAvailable 
                        ? "border-line hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer" 
                        : "border-line/70 opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="space-y-3">
                      {/* Top status bar */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                            isAvailable
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-bg text-slate-400 border-line"
                          )}>
                            <IconComp size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                            {ficha.specialtyName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={cn(
                            "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md",
                            isAvailable
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : "bg-bg text-slate-400 border border-line"
                          )}>
                            {isAvailable && <CheckCircle2 size={10} className="text-emerald-400" />}
                            {isAvailable ? 'Pronta A4' : 'Em Breve'}
                          </span>
                          <span className="text-[10px] font-mono text-ink-muted px-1.5 py-0.5 rounded bg-bg border border-line shrink-0">
                            {ficha.paperFormat.split(' ')[0]} {ficha.paperFormat.split(' ')[1] || ''}
                          </span>
                        </div>
                      </div>

                      {/* Title & 1-line Subtitle */}
                      <div>
                        <h3 className="font-bold text-sm md:text-base text-brand-navy group-hover:text-emerald-400 transition-colors leading-snug">
                          {ficha.title}
                        </h3>
                        <p className="text-xs text-ink-muted mt-1 leading-relaxed line-clamp-2">
                          {ficha.subtitle || ficha.description}
                        </p>
                      </div>

                      {/* Compact Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {ficha.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-bg text-ink-muted border border-line/50">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Expandable details (optional dropdown) */}
                      <div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedFichaId(isExpanded ? null : ficha.id);
                          }}
                          className="text-[11px] text-ink-muted hover:text-emerald-400 flex items-center gap-1 transition-colors font-medium cursor-pointer"
                        >
                          <span>{isExpanded ? 'Ocultar recursos' : `Recursos da ficha (${ficha.features.length})`}</span>
                          <ChevronDown size={12} className={cn("transition-transform duration-200", isExpanded && "rotate-180")} />
                        </button>

                        {isExpanded && (
                          <ul className="mt-2.5 p-2.5 rounded-xl bg-bg border border-line space-y-1.5 text-[11px] text-ink leading-tight">
                            {ficha.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold shrink-0">•</span>
                                <span className="text-ink-muted">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-line/60">
                      {isAvailable && ficha.diseaseId ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToDisease(ficha.specialtyId, ficha.diseaseId!);
                          }}
                          className="w-full py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-sm transition-all group-hover:bg-emerald-500 cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <Printer size={14} />
                            Abrir & Imprimir A4
                          </span>
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ) : (
                        <div className="w-full py-1.5 px-3 rounded-xl bg-bg/80 border border-line/60 text-xs text-ink-muted flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[11px]">
                            <Clock size={12} className="text-amber-400" />
                            Em diagramação A4
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">Em expansão</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LIST VIEW: Ultra-Minimalist Single-Line Table */}
          {viewMode === 'list' && (
            <div className="flex flex-col gap-2">
              {filteredFichas.map(ficha => {
                const IconComp = ficha.icon;
                const isAvailable = ficha.status === 'disponivel';

                return (
                  <div
                    key={ficha.id}
                    onClick={() => {
                      if (isAvailable && ficha.diseaseId) {
                        onNavigateToDisease(ficha.specialtyId, ficha.diseaseId);
                      }
                    }}
                    className={cn(
                      "p-3 sm:p-4 rounded-xl bg-card border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group shadow-xs",
                      isAvailable
                        ? "border-line hover:border-emerald-500/50 hover:bg-emerald-950/10 cursor-pointer"
                        : "border-line/70 opacity-80"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border",
                        isAvailable ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-bg text-slate-400 border-line"
                      )}>
                        <IconComp size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-brand-navy group-hover:text-emerald-400 transition-colors truncate">
                            {ficha.title}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg text-ink-muted border border-line/60 font-mono hidden md:inline shrink-0">
                            {ficha.paperFormat}
                          </span>
                        </div>
                        <p className="text-[11px] text-ink-muted truncate max-w-2xl mt-0.5">
                          {ficha.subtitle || ficha.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-bg text-ink-muted border border-line hidden sm:inline">
                        {ficha.specialtyName}
                      </span>
                      {isAvailable && ficha.diseaseId ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToDisease(ficha.specialtyId, ficha.diseaseId!);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Printer size={13} />
                          <span>Abrir A4</span>
                          <ArrowRight size={12} />
                        </button>
                      ) : (
                        <span className="text-[10px] text-ink-muted px-2 py-1 rounded bg-bg border border-line flex items-center gap-1">
                          <Clock size={11} className="text-amber-400" />
                          Em breve
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty search results state */}
          {filteredFichas.length === 0 && (
            <div className="p-10 text-center bg-card rounded-2xl border border-line text-xs space-y-2">
              <p className="text-ink-muted">Nenhuma ficha de orientações encontrada com o filtro atual.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('todas');
                }}
                className="text-xs text-brand-blue font-bold hover:underline cursor-pointer"
              >
                Limpar filtros e ver todas as fichas
              </button>
            </div>
          )}

          {/* Discreet Minimalist Footer */}
          <div className="pt-4 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              💡 As fichas prontas contam com cabeçalho médico, campo de data e assinatura para entrega imediata ao paciente.
            </span>
            <button
              onClick={() => setCurrentMode('resumos')}
              className="text-brand-blue hover:underline font-bold shrink-0 cursor-pointer"
            >
              Consultar Resumos Clínicos →
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: RESUMOS CLÍNICOS DIRECTORY */}
      {currentMode === 'resumos' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-card p-6 rounded-2xl border border-line">
            <div>
              <div className="flex items-center gap-2 text-brand-blue mb-1.5">
                <BookOpen size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Diretório de Condutas</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-navy tracking-tight">
                Resumos Clínicos por Especialidade
              </h2>
              <p className="text-ink-muted text-sm mt-1">
                Acesse diretrizes clínicas, tabelas de dosagens, diagnósticos sindrômicos e condutas escalonadas.
              </p>
            </div>

            <button
              onClick={() => setCurrentMode('hub')}
              className="px-3.5 py-2 rounded-xl bg-bg border border-line text-xs font-bold text-ink-muted hover:text-brand-navy hover:border-brand-blue flex items-center gap-2 transition-all shrink-0 self-start md:self-auto"
            >
              <ArrowRight size={14} className="rotate-180" />
              Voltar ao Hub
            </button>
          </div>

          {/* Specialties Directory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                id: 'pneumologia',
                name: 'Pneumologia',
                icon: Flame,
                color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                diseases: ['Asma (GINA 2024)', 'DPOC (GOLD 2024)', 'Pneumonia Adquirida na Comunidade', 'Derrame Pleural', 'Doenças Intersticiais']
              },
              {
                id: 'cardiologia',
                name: 'Cardiologia',
                icon: Heart,
                color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
                diseases: ['Hipertensão Arterial Sistêmica', 'Insuficiência Cardíaca', 'Arritmias (FA e Flutter)', 'Doenças Valvares', 'Calculadora PREVENT™', 'Dislipidemias']
              },
              {
                id: 'nefrologia',
                name: 'Nefrologia',
                icon: Apple,
                color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                diseases: ['Doença Renal Crônica (KDIGO)', 'Calculadora CKD-EPI 2021', 'Guia de Dieta DRC (A4)', 'Glomerulopatias']
              },
              {
                id: 'emergencia',
                name: 'Emergência',
                icon: ShieldAlert,
                color: 'text-red-400 bg-red-500/10 border-red-500/20',
                diseases: ['Sepse e Choque Séptico', 'Síndrome Coronariana Aguda', 'Cetoacidose Diabética (CAD)', 'Distúrbios Hidroeletrolíticos', 'HDA', 'OVACE']
              },
              {
                id: 'endocrinologia',
                name: 'Endocrinologia',
                icon: Syringe,
                color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
                diseases: ['Mapa & Diário de Glicemia (A4)', 'Diabetes Gestacional (DMG)', 'Dislipidemias']
              },
              {
                id: 'ginecologia',
                name: 'Ginecologia & Obstetrícia',
                icon: Baby,
                color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
                diseases: ['Pré-Natal', 'Pré-Eclâmpsia & SHEG', 'Síndrome do Ovário Policístico', 'Climatério & TRH', 'Endometriose', 'TPP & RPM']
              },
              {
                id: 'cirurgia',
                name: 'Cirurgia Geral',
                icon: Scissors,
                color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
                diseases: ['Apendicite Aguda', 'Colecistite & Vias Biliares', 'Hérnias Abdominais', 'Trauma & ATLS 10ª', 'Queimaduras (Parkland)']
              },
              {
                id: 'preventiva',
                name: 'Medicina Preventiva',
                icon: ShieldCheck,
                color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
                diseases: ['Atenção Primária (ESF)', 'Declaração de Óbito', 'SUS & Legislação', 'Rastreamento & Prevenção', 'Estudos Epidemiológicos']
              },
              {
                id: 'dermatologia',
                name: 'Dermatologia',
                icon: Sun,
                color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                diseases: ['Módulo em Construção Colaborativa']
              }
            ].map(spec => {
              const IconComp = spec.icon;
              return (
                <div 
                  key={spec.id}
                  onClick={() => onNavigateToSpecialty(spec.id)}
                  className="rounded-2xl bg-card border border-line hover:border-brand-blue/50 p-5 flex flex-col justify-between gap-4 cursor-pointer transition-all hover:shadow-xl hover:shadow-brand-blue/5 group"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", spec.color)}>
                        <IconComp size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                          {spec.name}
                        </h4>
                        <span className="text-[11px] text-ink-muted">
                          {spec.diseases.length} protocolos
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1 text-xs text-ink-muted">
                      {spec.diseases.slice(0, 4).map((d, i) => (
                        <li key={i} className="truncate flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-brand-blue shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                      {spec.diseases.length > 4 && (
                        <li className="text-[11px] font-bold text-brand-blue pl-2.5">
                          + {spec.diseases.length - 4} outros tópicos
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs font-bold text-brand-blue group-hover:translate-x-1 transition-transform">
                    <span>Acessar Especialidade</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
