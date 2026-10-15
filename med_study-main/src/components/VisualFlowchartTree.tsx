import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldAlert, Pill, RefreshCw, 
  ChevronDown, ChevronUp, Info, Heart, ArrowDown, ArrowRight, 
  Sparkles, Stethoscope, Layers, FileText, Check, AlertCircle, Eye, Zap, Flame, ShieldCheck,
  Maximize2, Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Tipos para os nós do fluxograma
type NodeType = 'decision' | 'yes' | 'no' | 'route' | 'checklist' | 'start' | 'end';

interface FlowNode {
  id: string;
  type: NodeType;
  title: string;
  subtitle?: string;
  details?: string[];
  rationale?: string;
  prescription?: {
    drug: string;
    dose: string;
    route: string;
    note?: string;
  }[];
  childrenYes?: string;
  childrenNo?: string;
}

export function VisualFlowchartTree() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [currentStepId, setCurrentStepId] = useState<string>('q1');
  const [viewMode, setViewMode] = useState<'map' | 'simulator'>('map');

  // Estado de nós expandidos (retráteis) - Inicialmente expandimos os principais para facilidade
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    start: true,
    q1: true,
    q2: true,
    q3: true,
    q5: true,
  });

  const toggleNodeExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
    setSelectedNodeId(id);
  };

  const expandAllNodes = () => {
    const all: Record<string, boolean> = {};
    Object.keys(nodesMap).forEach(key => { all[key] = true; });
    setExpandedNodes(all);
  };

  const collapseAllNodes = () => {
    setExpandedNodes({});
  };

  // Preset cases
  const applyPreset = (preset: 'antonia' | 'hypertensive' | 'breast_cancer' | 'hysterectomy' | 'sgum_only') => {
    setActivePreset(preset);
    expandAllNodes();
    if (preset === 'antonia') {
      setActivePath(['start', 'q1', 'q2', 'q3', 'o1', 'q4', 'q5', 'g1', 'g2', 'q6a', 'b2b', 'q7', 'g3b', 'end_a']);
      setCurrentStepId('end_a');
      setSelectedNodeId('g3b');
    } else if (preset === 'hypertensive') {
      setActivePath(['start', 'q1', 'q2', 'q3', 'o1', 'q4', 'q5', 'g1', 'g2', 'q6a', 'b2a', 'q7', 'g3b', 'end_a']);
      setCurrentStepId('end_a');
      setSelectedNodeId('b2a');
    } else if (preset === 'breast_cancer') {
      setActivePath(['start', 'q1', 'q2', 'q2_1', 'r2']);
      setCurrentStepId('r2');
      setSelectedNodeId('r2');
    } else if (preset === 'hysterectomy') {
      setActivePath(['start', 'q1', 'q2', 'q3', 'o1', 'q4', 'q5', 'g1b', 'q6b', 'b3b', 'end_b']);
      setCurrentStepId('end_b');
      setSelectedNodeId('g1b');
    } else if (preset === 'sgum_only') {
      setActivePath(['start', 'q1', 'q2', 'q2_1', 'b1']);
      setCurrentStepId('b1');
      setSelectedNodeId('b1');
    }
  };

  const resetTree = () => {
    setActivePreset(null);
    setActivePath([]);
    setCurrentStepId('q1');
    setSelectedNodeId(null);
    setExpandedNodes({
      start: true,
      q1: true,
      q2: true,
      q3: true,
      q5: true,
    });
  };

  // Node definitions with detailed clinical information
  const nodesMap: Record<string, FlowNode> = {
    start: {
      id: 'start',
      type: 'start',
      title: 'Paciente climatérica avaliada para Terapia Hormonal (TH)',
      subtitle: 'Avaliação clínica inicial e estratificação de sintomas e riscos',
      details: [
        'Anamnese ginecológica completa e histórico pessoal e familiar de neoplasias ou TEV',
        'Exame físico completo: Pressão Arterial, IMC, exame das mamas e ginecológico',
        'Definição da intensidade dos sintomas vasomotores (escala de dor/sintomas)'
      ]
    },
    q1: {
      id: 'q1',
      type: 'decision',
      title: '1. Há indicação para TH sistêmica?',
      subtitle: 'VMS incômodos | SGUM refratário a tratamento local | IOP / menopausa precoce | prevenção óssea em candidata selecionada',
      rationale: 'A TH sistêmica só deve ser iniciada quando há indicação clínica clara com impacto na qualidade de vida ou prevenção de fraturas graves.',
      childrenYes: 'q2',
      childrenNo: 'r1'
    },
    r1: {
      id: 'r1',
      type: 'no',
      title: 'NÃO é candidata a TH sistêmica agora',
      subtitle: 'Reavaliar diagnóstico diferencial (tireoide, humor, fármacos) e tratar sintoma isolado se indicado.',
      details: [
        'Investigar disfunção tireoidiana (TSH), transtornos de ansiedade/depressão ou fogachos induzidos por medicações.',
        'Se a queixa for estritamente vaginite/secura, prescrever lubrificantes/hidratantes ou estrogênio vaginal em baixa dose.'
      ]
    },
    q2: {
      id: 'q2',
      type: 'decision',
      title: '2. Contraindicação ABSOLUTA à TH sistêmica?',
      subtitle: 'CA mama/endométrio ativo ou prévio | sangramento genital sem diagnóstico | doença hepática descompensada | TEV / AVC / DAC ativa ou prévia | alto risco trombofílico',
      rationale: 'Se houver qualquer contraindicação absoluta, o estrogênio sistêmico é PROIBIDO pela elevada morbimortalidade associada.',
      childrenYes: 'q2_1',
      childrenNo: 'q3'
    },
    q2_1: {
      id: 'q2_1',
      type: 'decision',
      title: 'Queixa é SOMENTE SGUM, sem sintoma vasomotor?',
      subtitle: 'Atrofia vulvovaginal isolada em paciente com contraindicação à TH sistêmica',
      rationale: 'O estrogênio vaginal em microdose possui absorção sistêmica negligenciável e pode ser seguro após avaliação criteriosa.',
      childrenYes: 'b1',
      childrenNo: 'r2'
    },
    b1: {
      id: 'b1',
      type: 'route',
      title: 'Considerar estrogênio VAGINAL em baixa dose',
      subtitle: 'Exposição sistêmica mínima. Se CA de mama/endométrio ATIVO: decisão multidisciplinar obrigatória com oncologia.',
      prescription: [
        {
          drug: 'Estriol Creme Vaginal 1 mg/g',
          dose: '1 aplicação vaginal (1,0 g de creme) à noite por 14 dias (indução), mantendo 2 a 3 aplicações/semana',
          route: 'Via Vaginal',
          note: 'Alternativa: Promestrieno 10 mg/g creme vaginal.'
        }
      ]
    },
    r2: {
      id: 'r2',
      type: 'no',
      title: 'TH sistêmica CONTRAINDICADA',
      subtitle: 'Oferecer tratamento não hormonal: ISRS/IRSN, gabapentina ou fezolinetant + estrogênio vaginal se houver SGUM associada.',
      prescription: [
        {
          drug: 'Fezolinetant (Antagonista NK3R)',
          dose: '45 mg/dia VO (1 comprimido/dia)',
          route: 'Via Oral',
          note: 'Tratamento inovador não hormonal do centro termorregulador hipotalâmico.'
        },
        {
          drug: 'Escitalopram / Desvenlafaxina',
          dose: 'Escitalopram 10 a 20 mg/dia VO OU Desvenlafaxina 50 mg/dia VO (1 comp/dia pela manhã)',
          route: 'Via Oral'
        },
        {
          drug: 'Gabapentina (Opção para insônia)',
          dose: '300 a 900 mg/dia VO em dose única ao deitar',
          route: 'Via Oral'
        }
      ]
    },
    q3: {
      id: 'q3',
      type: 'decision',
      title: '3. Está na janela de oportunidade?',
      subtitle: 'idade < 60 anos OU < 10 anos de menopausa',
      rationale: 'A teoria do timing demonstra que iniciar TH nos primeiros 10 anos pós-menopausa reduz mortalidade total e doença coronariana.',
      childrenYes: 'o1',
      childrenNo: 'r3'
    },
    r3: {
      id: 'r3',
      type: 'no',
      title: 'Fora da janela de oportunidade',
      subtitle: 'Risco cardiovascular de iniciar TH aumenta. Individualizar com especialista; priorizar tratamento não hormonal.',
      details: [
        'Iniciar TH após 60 anos de idade ou > 10 anos de menopausa aumenta risco de DAC, AVC e demência vascular por placas ateroscleróticas pré-existentes.',
        'Se os sintomas vasomotores forem intoleráveis, priorizar opções não hormonais (Fezolinetant, Desvenlafaxina).'
      ]
    },
    o1: {
      id: 'o1',
      type: 'checklist',
      title: 'Checklist de exames antes de iniciar TH',
      subtitle: 'mamografia ≤ 12 meses | β-hCG se dúvida | perfil lipídico + glicemia/HbA1c | PA e exame de mamas',
      details: [
        '✓ Mamografia bilateral normal realizada nos últimos 12 meses',
        '✓ Citologia oncótica cervical (Papanicolaou) atualizada se aplicável',
        '✓ Avaliação clínica de PA, IMC, perfil lipídico e glicemia de jejum',
        '✓ Exclusão de gravidez (< 12 meses de amenorreia em perimenopausa)'
      ]
    },
    q4: {
      id: 'q4',
      type: 'decision',
      title: '4. Risco Contraceptivo (< 12 meses amenorreia em perimenopausa)',
      subtitle: 'Ainda pode ovular? THM padrão não é contraceptiva!',
      rationale: 'A THM padrão utiliza doses hormonais fisiológicas e NÃO suprime a ovulação residual.',
      childrenYes: 'o2',
      childrenNo: 'q5'
    },
    o2: {
      id: 'o2',
      type: 'checklist',
      title: 'Manter método contraceptivo complementar',
      subtitle: 'Manter método (DIU-LNG 52mg, barreira ou ACO combinado) até confirmar 12 meses consecutivos de amenorreia.',
      details: [
        'Associar DIU de Levonorgestrel (DIU-LNG 52mg) que fornece proteção endometrial + contracepção eficaz.',
        'Ou utilizar preservativo/barreira até completar 12 meses consecutivos de amenorreia.'
      ]
    },
    q5: {
      id: 'q5',
      type: 'decision',
      title: '5. Anatomia Uterina: Útero presente?',
      subtitle: 'Avaliação da integridade anatômica uterina para definir necessidade de progestagênio',
      rationale: 'O estrogênio sistêmico isolado em mulheres com útero estimula proliferação endometrial descontrolada, elevando o risco de adenocarcinoma de endométrio.',
      childrenYes: 'g1',
      childrenNo: 'g1b'
    },
    g1: {
      id: 'g1',
      type: 'yes',
      title: 'Útero Presente -> Estrogênio + Progestagênio OBRIGATÓRIO',
      subtitle: 'Nunca estrogênio isolado sistêmico em mulher com útero intacto!',
      details: [
        'A oposição progestagênica é OBRIGATÓRIA para inibir a proliferação endometrial induzida pelo estrogênio.',
        'Exceção: Mulheres histerectomizadas por endometriose grave podem requerer progestagênio para evitar proliferação de focos residuais.'
      ]
    },
    g2: {
      id: 'g2',
      type: 'yes',
      title: 'Progestagênio de Escolha',
      subtitle: 'Progesterona micronizada oral à noite (neutro + ajuda no sono) ou Didrogesterona. Evitar MPA se possível.',
      prescription: [
        {
          drug: 'Progesterona Micronizada (1ª Escolha)',
          dose: '100 mg/dia VO contínua OR 200 mg/dia VO por 12 a 14 dias/mês (regime cíclico)',
          route: 'Via Oral à noite (ao deitar)',
          note: 'Possui metabólitos neuroesteroides (Alopregnanolona) que modulam receptores GABA-A e induzem sono fisiológico sem afetar lipídeos.'
        },
        {
          drug: 'Didrogesterona (Alternativa)',
          dose: '10 mg/dia VO contínua ou cíclica',
          route: 'Via Oral'
        }
      ]
    },
    q6a: {
      id: 'q6a',
      type: 'decision',
      title: '6a. Fator de risco CV / Trombótico? (Com Útero)',
      subtitle: 'obesidade, tabagismo, HAS, DM, dislipidemia, risco de TEV, enxaqueca com aura, hepatopatia',
      rationale: 'A via oral sofre primeira passagem hepática, aumentando síntese de fatores de coagulação, PCR e triglicerídeos. A via transdérmica é neutra nestes parâmetros.',
      childrenYes: 'b2a',
      childrenNo: 'b2b'
    },
    b2a: {
      id: 'b2a',
      type: 'route',
      title: 'Via TRANSDÉRMICA preferencial (gel ou adesivo)',
      subtitle: 'Menor impacto hepático e trombótico. Indicação estrita em presença de risco vascular.',
      prescription: [
        {
          drug: '17β-Estradiol Gel Transdérmico 0,75 mg/dose',
          dose: '1 a 2 pressões de dose (0,75 mg a 1,5 mg/dia) aplicadas na pele limpa/seca do braço, ombro ou coxa 1x/dia',
          route: 'Via Transdérmica',
          note: 'Não aplicar nas mamas ou área genital! Esperar 5 minutos antes de se vestir.'
        },
        {
          drug: '17β-Estradiol Adesivo Transdérmico',
          dose: '25 a 50 mcg/dia trocado 2 vezes por semana',
          route: 'Via Transdérmica'
        }
      ]
    },
    b2b: {
      id: 'b2b',
      type: 'route',
      title: 'Via ORAL ou Transdérmica aceitáveis',
      subtitle: 'Ambas aceitáveis em pacientes sem fatores de risco cardiovascular acrescidos.',
      prescription: [
        {
          drug: 'Estradiol Micronizado Oral',
          dose: '1,0 mg/dia VO (1 comprimido/dia pela manhã)',
          route: 'Via Oral',
          note: 'Alternativa: Valerato de Estradiol 1,0 a 2,0 mg/dia VO.'
        }
      ]
    },
    q7: {
      id: 'q7',
      type: 'decision',
      title: '7. Já completou 12 meses de amenorreia?',
      subtitle: 'Definição do estágio menopausado (Perimenopausa vs Pós-menopausa confirmada)',
      rationale: 'Se a paciente ainda sangra irregularmente (perimenopausa), o esquema contínuo provoca sangramento de escape imprevisível.',
      childrenYes: 'g3b',
      childrenNo: 'g3a'
    },
    g3a: {
      id: 'g3a',
      type: 'yes',
      title: 'Regime CÍCLICO (Perimenopausa)',
      subtitle: 'estrogênio contínuo + progestagênio 12-14 dias/mês (sangramento de privação previsível)',
      prescription: [
        {
          drug: 'Esquema Cíclico Recomendado',
          dose: 'Estrogênio diário (Gel ou VO) + Progesterona Micronizada 200 mg/dia VO do 1º ao 14º dia de cada mês, ao deitar',
          route: 'Via Oral + Transdérmica/Oral',
          note: 'A paciente apresentará sangramento vaginal previsível semelhante à menstruação após a pausa da progesterona.'
        }
      ]
    },
    g3b: {
      id: 'g3b',
      type: 'yes',
      title: 'Regime CONTÍNUO COMBINADO (Pós-Menopausa)',
      subtitle: 'estrogênio + progestagênio diário (objetivo: amenorreia definitiva)',
      prescription: [
        {
          drug: 'Esquema Contínuo Combinado Recomendado',
          dose: 'Estrogênio diário (Gel 0,75-1,5mg ou Oral 1mg) + Progesterona Micronizada 100 mg/dia VO contínua todas as noites',
          route: 'Via Oral + Transdérmica/Oral',
          note: 'Objetivo de induzir atrofia endometrial estável e amenorreia contínua após 3 a 6 meses de uso.'
        }
      ]
    },
    end_a: {
      id: 'end_a',
      type: 'end',
      title: 'Iniciar na MENOR DOSE EFETIVA',
      subtitle: 'Reavaliar em 8-12 semanas: benefício, efeitos adversos, adesão e ajuste posológico.',
      details: [
        'Ajustar dose conforme resposta aos sintomas vasomotores e tolerância.',
        'Reavaliação anual obrigatória da indicação, mamografia e perfil de risco.'
      ]
    },

    // RAMIFICAÇÃO HISTERECTOMIZADA
    g1b: {
      id: 'g1b',
      type: 'yes',
      title: 'Útero Ausente -> Estrogênio ISOLADO',
      subtitle: 'Exceto endometriose residual: manter progestagênio se houver dúvida de focos ovarianos/peritoneais.',
      details: [
        'Pacientes histerectomizadas não possuem endométrio para proteger, eliminando a necessidade de oposição progestagênica.',
        'O estrogênio isolado apresenta menor risco relativo de câncer de mama em comparação à associação com progestagênicos sintéticos.'
      ]
    },
    q6b: {
      id: 'q6b',
      type: 'decision',
      title: '6b. Fator de risco CV / Trombótico? (Sem Útero)',
      subtitle: 'obesidade, tabagismo, HAS, DM, dislipidemia, risco de TEV, enxaqueca com aura, hepatopatia',
      rationale: 'Mesmo no estrogênio isolado, pacientes com comorbidades vasculares exigem via transdérmica.',
      childrenYes: 'b3a',
      childrenNo: 'b3b'
    },
    b3a: {
      id: 'b3a',
      type: 'route',
      title: 'Via TRANSDÉRMICA preferencial (gel ou adesivo)',
      subtitle: 'Menor impacto hepático e trombótico.',
      prescription: [
        {
          drug: '17β-Estradiol Gel Transdérmico 0,75 mg/dose',
          dose: '1 a 2 pressões de dose (0,75 mg a 1,5 mg/dia) na pele 1x/dia',
          route: 'Via Transdérmica'
        }
      ]
    },
    b3b: {
      id: 'b3b',
      type: 'route',
      title: 'Via ORAL ou Transdérmica',
      subtitle: 'Ambas aceitáveis — decidir por custo, disponibilidade e preferência.',
      prescription: [
        {
          drug: 'Estradiol Micronizado Oral',
          dose: '1,0 mg/dia VO (1 comp/dia)',
          route: 'Via Oral'
        }
      ]
    },
    end_b: {
      id: 'end_b',
      type: 'end',
      title: 'Estrogênio isolado é sempre CONTÍNUO',
      subtitle: 'Iniciar na menor dose efetiva. Reavaliar em 8-12 semanas: benefício, efeitos adversos, adesão.',
      details: [
        'Não há ciclos ou pausas. O estrogênio isolado é tomado ou aplicado continuamente todos os dias do mês.'
      ]
    }
  };

  const selectedNode = selectedNodeId ? nodesMap[selectedNodeId] : null;

  // COMPONENTE CARD DE NÓ COM CONEXÕES
  const RenderNodeCard = ({ 
    id, 
    tagLabel,
    className = ""
  }: { 
    id: string; 
    tagLabel?: string;
    className?: string;
  }) => {
    const node = nodesMap[id];
    if (!node) return null;

    const isExpanded = !!expandedNodes[id];
    const isSelected = selectedNodeId === id;
    const isInPath = activePath.includes(id);

    let containerStyle = "p-4 md:p-5 rounded-2xl border-2 transition-all cursor-pointer relative shadow-xl text-left my-2 ";

    if (isSelected) {
      containerStyle += "ring-4 ring-white shadow-2xl z-20 ";
    } else if (isInPath) {
      containerStyle += "ring-2 ring-emerald-400 z-10 ";
    }

    switch (node.type) {
      case 'start':
      case 'end':
        containerStyle += "bg-slate-900 border-slate-600 text-slate-100 hover:border-slate-400";
        break;
      case 'decision':
        containerStyle += "bg-purple-950/95 border-purple-500 text-purple-100 hover:border-purple-300 shadow-purple-950/50";
        break;
      case 'yes':
        containerStyle += "bg-emerald-950/95 border-emerald-500 text-emerald-100 hover:border-emerald-300 shadow-emerald-950/50";
        break;
      case 'no':
        containerStyle += "bg-rose-950/95 border-rose-500 text-rose-100 hover:border-rose-300 shadow-rose-950/50";
        break;
      case 'route':
        containerStyle += "bg-sky-950/95 border-sky-500 text-sky-100 hover:border-sky-300 shadow-sky-950/50";
        break;
      case 'checklist':
        containerStyle += "bg-amber-950/95 border-amber-500 text-amber-100 hover:border-amber-300 shadow-amber-950/50";
        break;
      default:
        containerStyle += "bg-slate-900 border-slate-700 text-slate-200";
    }

    return (
      <div 
        onClick={() => toggleNodeExpand(id)}
        className={`${containerStyle} ${className}`}
      >
        {/* CABEÇALHO DO CARD */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 pr-1">
            {tagLabel && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-block bg-slate-950/90 border border-slate-700 text-slate-300 mb-1">
                {tagLabel}
              </span>
            )}
            <div className="flex items-center gap-2">
              {node.type === 'decision' && <div className="w-3.5 h-3.5 rotate-45 border-2 border-purple-400 bg-purple-800 shrink-0" />}
              <h3 className="font-black text-base md:text-lg leading-tight text-white">{node.title}</h3>
            </div>
            {node.subtitle && (
              <p className="text-xs md:text-sm text-slate-300 pt-0.5 font-medium">{node.subtitle}</p>
            )}
          </div>

          <button
            onClick={(e) => toggleNodeExpand(id, e)}
            className="p-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-slate-200 shrink-0 transition-all flex items-center gap-1 text-xs font-bold"
          >
            {isExpanded ? (
              <>
                <span className="hidden sm:inline text-[10px] text-purple-300">Recolher</span>
                <ChevronUp size={16} className="text-purple-400" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline text-[10px] text-emerald-300">Expandir</span>
                <ChevronDown size={16} className="text-emerald-400" />
              </>
            )}
          </button>
        </div>

        {/* CONTEÚDO EXPANSÍVEL */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pt-3 mt-3 border-t border-slate-700/80 space-y-3"
            >
              {/* RATIONALE CLÍNICO */}
              {node.rationale && (
                <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/70 text-xs text-amber-200 space-y-1">
                  <p className="font-black text-amber-400 flex items-center gap-1.5 uppercase text-[10px]">
                    💡 Por que esta decisão importa?
                  </p>
                  <p className="text-amber-100 font-medium leading-relaxed">{node.rationale}</p>
                </div>
              )}

              {/* PONTOS DE DETALHE */}
              {node.details && node.details.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-700 text-xs space-y-1.5">
                  <p className="font-extrabold text-slate-300 uppercase text-[10px]">Pontos Clínicos e Diretrizes:</p>
                  <ul className="space-y-1 pl-1 text-slate-200">
                    {node.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* PRESCRIÇÕES MÉDICAS */}
              {node.prescription && node.prescription.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-950/95 border-2 border-emerald-500/80 space-y-2">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill size={15} /> Prescrição e Posologia Recomendada:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {node.prescription.map((rx, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-emerald-800 space-y-1 text-xs">
                        <p className="font-black text-white text-xs">• {rx.drug}</p>
                        <p className="text-emerald-300 font-extrabold">Dose/Posologia: {rx.dose}</p>
                        <p className="text-slate-300">Via: <strong className="text-white">{rx.route}</strong></p>
                        {rx.note && <p className="text-[10px] text-amber-300 font-medium pt-1 border-t border-slate-800 mt-0.5">{rx.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CAMINHO SEGUINTE / DECISÃO */}
              {node.childrenYes && node.childrenNo && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Destinos desta pergunta:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-[11px] font-extrabold">
                    SIM ➔ {nodesMap[node.childrenYes]?.title || 'Próximo'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 text-[11px] font-extrabold">
                    NÃO ➔ {nodesMap[node.childrenNo]?.title || 'Próximo'}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-slate-950 border-2 border-slate-800 p-4 md:p-8 rounded-3xl shadow-2xl space-y-8">
      
      {/* CABEÇALHO DO FLUXOGRAMA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-purple-950 text-purple-300 border border-purple-700 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
              <Zap size={15} className="animate-pulse text-purple-400" /> Algoritmo Decisório Espaçado & Retrátil — Climatério
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2 uppercase tracking-tight">
            É CANDIDATA A TERAPIA HORMONAL (TH)? — QUAL O MELHOR MÉTODO?
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">
            Todos os balões e quadros decisórios são <strong>retráteis</strong>: clique sobre qualquer caixa para recolher ou expandir a fundamentação fisiopatológica, exames e receitas posológicas completas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={expandAllNodes}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-700 text-xs font-black transition-all flex items-center gap-1.5"
          >
            <Maximize2 size={14} /> Expandir Todos
          </button>
          <button
            onClick={collapseAllNodes}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-black transition-all flex items-center gap-1.5"
          >
            <Minimize2 size={14} /> Recolher Todos
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 ${
              viewMode === 'map' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Layers size={15} /> Mapa Árvore
          </button>
          <button
            onClick={() => setViewMode('simulator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 ${
              viewMode === 'simulator' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Stethoscope size={15} /> Passo a Passo
          </button>
          <button
            onClick={resetTree}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-black transition-all flex items-center gap-1.5"
          >
            <RefreshCw size={14} /> Limpar
          </button>
        </div>
      </div>

      {/* LEGENDA DE ELEMENTOS */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2.5">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
          LEGENDA DE ELEMENTOS DO FLUXOGRAMA (CLIQUE NOS BALÕES PARA EXPANDIR / RECOLHER):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs font-bold">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-950/90 border border-purple-600 text-purple-200">
            <div className="w-3.5 h-3.5 rotate-45 border-2 border-purple-400 bg-purple-900 shrink-0" />
            <span>Pergunta Decisória</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-600 text-emerald-200">
            <div className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
            <span>Conduta Favorável (SIM)</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-950/90 border border-rose-600 text-rose-200">
            <div className="w-3.5 h-3.5 rounded bg-rose-500 shrink-0" />
            <span>Contraindicação (NÃO)</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-950/90 border border-sky-600 text-sky-200">
            <div className="w-3.5 h-3.5 rounded bg-sky-500 shrink-0" />
            <span>Escolha da Via / Método</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-950/90 border border-amber-600 text-amber-200">
            <div className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0" />
            <span>Checklist & Exames</span>
          </div>
        </div>
      </div>

      {/* CASOS CLÍNICOS PRONTOS */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2.5">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={15} className="text-amber-400" /> SIMULAR TRILHA CLÍNICA PRONTA (EXPANDE AUTOMATICAMENTE OS PASSO):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-bold">
          <button
            onClick={() => applyPreset('antonia')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activePreset === 'antonia' ? 'bg-purple-900 text-purple-100 border-purple-400 ring-2 ring-purple-500' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <span className="font-black text-purple-300 block">🌸 Caso Antônia (50a)</span>
            <span className="text-[10px] text-slate-400">Hígida • Com Útero • Fogachos</span>
          </button>

          <button
            onClick={() => applyPreset('hypertensive')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activePreset === 'hypertensive' ? 'bg-amber-900 text-amber-100 border-amber-400 ring-2 ring-amber-500' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <span className="font-black text-amber-300 block">🫀 Caso B (52a)</span>
            <span className="text-[10px] text-slate-400">HAS + Obesidade • Transdérmica</span>
          </button>

          <button
            onClick={() => applyPreset('breast_cancer')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activePreset === 'breast_cancer' ? 'bg-rose-900 text-rose-100 border-rose-400 ring-2 ring-rose-500' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <span className="font-black text-rose-300 block">🛑 Caso C (54a)</span>
            <span className="text-[10px] text-slate-400">CA Mama Prévio • Fezolinetant</span>
          </button>

          <button
            onClick={() => applyPreset('hysterectomy')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activePreset === 'hysterectomy' ? 'bg-sky-900 text-sky-100 border-sky-400 ring-2 ring-sky-500' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <span className="font-black text-sky-300 block">🛡️ Caso D (56a)</span>
            <span className="text-[10px] text-slate-400">Histerectomizada • E Isolado</span>
          </button>

          <button
            onClick={() => applyPreset('sgum_only')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activePreset === 'sgum_only' ? 'bg-blue-900 text-blue-100 border-blue-400 ring-2 ring-blue-500' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <span className="font-black text-blue-300 block">💧 Caso E (48a)</span>
            <span className="text-[10px] text-slate-400">Somente SGUM • Estriol Vaginal</span>
          </button>
        </div>
      </div>

      {/* MAPA VISUAL ÁRVORE BEM ESPALHADO E COM BALÕES RETRÁTEIS */}
      {viewMode === 'map' && (
        <div className="space-y-12 py-4 max-w-6xl mx-auto">
          
          {/* NÓ INICIAL */}
          <div className="max-w-2xl mx-auto text-center">
            <RenderNodeCard id="start" tagLabel="PONTO DE PARTIDA DA AVALIAÇÃO" />
            <div className="flex justify-center my-3">
              <div className="p-2 rounded-full bg-slate-900 border-2 border-purple-500 text-purple-400 shadow-xl flex items-center gap-2 px-4 text-xs font-black">
                <ArrowDown size={18} className="animate-bounce" /> INICIAR DECISÃO CLÍNICA
              </div>
            </div>
          </div>

          {/* PERGUNTA 1: INDICAÇÃO */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-purple-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-purple-900 pb-3">
              <span className="w-7 h-7 rounded-full bg-purple-950 border border-purple-500 text-purple-200 flex items-center justify-center font-black text-xs">1</span>
              <h3 className="font-black text-lg text-white uppercase">Etapa 1: Triagem de Indicação Clínica</h3>
            </div>

            <RenderNodeCard id="q1" tagLabel="PERGUNTA DECISÓRIA 1" />

            {/* RAMIFICAÇÃO SIM vs NÃO DE Q1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* RAMO NÃO */}
              <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-800 space-y-3 relative">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-600 rounded-full text-xs font-black uppercase flex items-center gap-1.5 shadow-lg">
                    🛑 RESPOSTA: NÃO ➔ SEM INDICAÇÃO SISTÊMICA
                  </span>
                </div>
                <div className="text-center font-bold text-rose-400 text-xs py-1">⬇️ CONDUTA RECOMENDADA ⬇️</div>
                <RenderNodeCard id="r1" tagLabel="DESFECHO NÃO SISTÊMICO" />
              </div>

              {/* RAMO SIM */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-800 space-y-3 relative">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-600 rounded-full text-xs font-black uppercase flex items-center gap-1.5 shadow-lg">
                    ✓ RESPOSTA: SIM ➔ AVALIAR SEGURANÇA
                  </span>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-emerald-700/80 text-xs text-emerald-200 font-medium">
                  <p className="font-black text-emerald-300 mb-1">✅ Indicação Confirmada!</p>
                  <p>Avançar imediatamente para a Pergunta 2 para excluir contraindicações absolutas à terapia hormonal sistêmica.</p>
                </div>
                <div className="flex justify-center pt-2">
                  <div className="px-4 py-2 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-xl text-xs font-black flex items-center gap-2">
                    <ArrowDown size={16} /> AVANÇAR PARA ETAPA 2
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERGUNTA 2: CONTRAINDICAÇÕES */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-purple-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-purple-900 pb-3">
              <span className="w-7 h-7 rounded-full bg-purple-950 border border-purple-500 text-purple-200 flex items-center justify-center font-black text-xs">2</span>
              <h3 className="font-black text-lg text-white uppercase">Etapa 2: Triagem de Contraindicações Absolutas</h3>
            </div>

            <RenderNodeCard id="q2" tagLabel="PERGUNTA DECISÓRIA 2" />

            {/* RAMIFICAÇÃO SIM vs NÃO DE Q2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* RAMO SIM (POSSUI CONTRAINDICAÇÃO) */}
              <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-700 space-y-4">
                <span className="px-3 py-1 bg-rose-950 text-rose-200 border border-rose-500 rounded-full text-xs font-black uppercase inline-block shadow-lg">
                  ⚠️ RESPOSTA: SIM ➔ POSSUI CONTRAINDICAÇÃO ABSOLUTA
                </span>

                <div className="p-4 bg-slate-950/90 rounded-2xl border border-rose-800 space-y-3">
                  <p className="text-xs font-bold text-rose-300">
                    Estrogênio sistêmico está PROIBIDO. Avaliar se a queixa é isoladamente vulvovaginal:
                  </p>
                  
                  <RenderNodeCard id="q2_1" tagLabel="SUB-DECISÃO DE ATROFIA" />

                  {/* RAMIFICAÇÃO DE Q2_1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-rose-900">
                    <div>
                      <span className="text-[10px] font-black text-emerald-400 block mb-1">SIM (SÓ SGUM) ⬇️</span>
                      <RenderNodeCard id="b1" tagLabel="VIA LOCAL" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-rose-400 block mb-1">NÃO (SINTOMA SISTÊMICO) ⬇️</span>
                      <RenderNodeCard id="r2" tagLabel="NÃO HORMONAL" />
                    </div>
                  </div>
                </div>
              </div>

              {/* RAMO NÃO (SEM CONTRAINDICAÇÃO) */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-700 space-y-4">
                <span className="px-3 py-1 bg-emerald-950 text-emerald-200 border border-emerald-500 rounded-full text-xs font-black uppercase inline-block shadow-lg">
                  ✅ RESPOSTA: NÃO ➔ SEM CONTRAINDICAÇÃO (PACIENTE LIBERADA)
                </span>
                
                <div className="p-4 bg-slate-950 rounded-xl border border-emerald-700/80 text-xs text-emerald-200 font-medium space-y-2">
                  <p className="font-black text-emerald-300">✅ Segurança clínica confirmada para uso de estrogênio sistêmico.</p>
                  <p>Avançar para a avaliação da Janela de Oportunidade e exames prévios.</p>
                </div>

                <div className="flex justify-center pt-2">
                  <div className="px-4 py-2 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-xl text-xs font-black flex items-center gap-2">
                    <ArrowDown size={16} /> AVANÇAR PARA ETAPA 3
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERGUNTA 3 E 4: JANELA DE OPORTUNIDADE & RISCO CONTRACEPTIVO */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-purple-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-purple-900 pb-3">
              <span className="w-7 h-7 rounded-full bg-purple-950 border border-purple-500 text-purple-200 flex items-center justify-center font-black text-xs">3</span>
              <h3 className="font-black text-lg text-white uppercase">Etapa 3 & 4: Janela de Oportunidade e Risco Contraceptivo</h3>
            </div>

            <RenderNodeCard id="q3" tagLabel="PERGUNTA DECISÓRIA 3" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FORA DA JANELA */}
              <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-800 space-y-3">
                <span className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-700 rounded-full text-xs font-black uppercase inline-block">
                  🛑 FORA DA JANELA (&gt; 60 anos ou &gt; 10 anos de menopausa)
                </span>
                <RenderNodeCard id="r3" tagLabel="CONDUTA ALTO RISCO CV" />
              </div>

              {/* DENTRO DA JANELA */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-800 space-y-4">
                <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-full text-xs font-black uppercase inline-block">
                  ✓ DENTRO DA JANELA (&lt; 60 anos e &lt; 10 anos de menopausa)
                </span>
                <RenderNodeCard id="o1" tagLabel="CHECKLIST PRÉ-PRESCRIÇÃO" />

                <div className="pt-2 border-t border-emerald-900/80 space-y-3">
                  <RenderNodeCard id="q4" tagLabel="PERGUNTA DECISÓRIA 4 — CONTRACEPÇÃO" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-black text-amber-400 block mb-1">SIM (&lt; 12m amenorreia) ⬇️</span>
                      <RenderNodeCard id="o2" tagLabel="CONTRACEPÇÃO" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-emerald-400 block mb-1">NÃO (≥ 12m amenorreia) ⬇️</span>
                      <div className="p-3 bg-slate-950 rounded-xl border border-emerald-700 text-[11px] text-emerald-200 font-bold">
                        Sem risco gestacional. Apta a definir esquema conforme anatomia uterina.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <div className="px-4 py-2 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-xl text-xs font-black flex items-center gap-2">
                    <ArrowDown size={16} /> AVANÇAR PARA ETAPA 5
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERGUNTA 5: ANATOMIA UTERINA E BIFURCAÇÃO TERAPÊUTICA */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-purple-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-purple-900 pb-3">
              <span className="w-7 h-7 rounded-full bg-purple-950 border border-purple-500 text-purple-200 flex items-center justify-center font-black text-xs">5</span>
              <h3 className="font-black text-lg text-white uppercase">Etapa 5: Anatomia Uterina e Escolha do Regimem Terapêutico</h3>
            </div>

            <RenderNodeCard id="q5" tagLabel="PERGUNTA DECISÓRIA CRÍTICA 5" />

            {/* BIFURCAÇÃO COMPLETA: COM ÚTERO vs HISTERECTOMIZADA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
              
              {/* LADO A: ÚTERO PRESENTE */}
              <div className="p-6 rounded-3xl bg-purple-950/40 border-2 border-purple-600 space-y-6 shadow-2xl">
                <div className="px-4 py-2 bg-purple-900 text-purple-100 border border-purple-400 rounded-2xl text-xs font-black uppercase text-center shadow-lg">
                  🌸 RESPOSTA: SIM (ÚTERO PRESENTE) ➔ ESQUEMA COMBINADO
                </div>

                <div className="space-y-4">
                  <RenderNodeCard id="g1" tagLabel="REGRA DE PROTEÇÃO ENDOMETRIAL" />
                  <RenderNodeCard id="g2" tagLabel="PROGESTAGÊNIO RECOMENDADO" />
                  
                  {/* Q6A */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-purple-700 space-y-3">
                    <RenderNodeCard id="q6a" tagLabel="PERGUNTA 6A — RISCO VASCULAR" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-black text-amber-400 block mb-1">SIM (COM RISCO CV) ⬇️</span>
                        <RenderNodeCard id="b2a" tagLabel="VIA TRANSDÉRMICA" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-emerald-400 block mb-1">NÃO (SEM RISCO) ⬇️</span>
                        <RenderNodeCard id="b2b" tagLabel="VIA ORAL / TRANSD" />
                      </div>
                    </div>
                  </div>

                  {/* Q7 */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-purple-700 space-y-3">
                    <RenderNodeCard id="q7" tagLabel="PERGUNTA 7 — ESTÁGIO DE AMENORREIA" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-black text-purple-300 block mb-1">NÃO (&lt; 12 MESES) ⬇️</span>
                        <RenderNodeCard id="g3a" tagLabel="REGIME CÍCLICO" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-emerald-300 block mb-1">SIM (≥ 12 MESES) ⬇️</span>
                        <RenderNodeCard id="g3b" tagLabel="REGIME CONTÍNUO" />
                      </div>
                    </div>
                  </div>

                  <RenderNodeCard id="end_a" tagLabel="FINALIZAÇÃO & PRESCRIÇÃO COMBINADA" />
                </div>
              </div>

              {/* LADO B: HISTERECTOMIZADA */}
              <div className="p-6 rounded-3xl bg-sky-950/40 border-2 border-sky-600 space-y-6 shadow-2xl">
                <div className="px-4 py-2 bg-sky-900 text-sky-100 border border-sky-400 rounded-2xl text-xs font-black uppercase text-center shadow-lg">
                  🛡️ RESPOSTA: NÃO (HISTERECTOMIZADA) ➔ ESTROGÊNIO ISOLADO
                </div>

                <div className="space-y-4">
                  <RenderNodeCard id="g1b" tagLabel="REGRA DE ESTROGÊNIO ISOLADO" />
                  
                  {/* Q6B */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-sky-700 space-y-3">
                    <RenderNodeCard id="q6b" tagLabel="PERGUNTA 6B — RISCO VASCULAR" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-black text-amber-400 block mb-1">SIM (COM RISCO CV) ⬇️</span>
                        <RenderNodeCard id="b3a" tagLabel="VIA TRANSDÉRMICA" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-emerald-400 block mb-1">NÃO (SEM RISCO) ⬇️</span>
                        <RenderNodeCard id="b3b" tagLabel="VIA ORAL / TRANSD" />
                      </div>
                    </div>
                  </div>

                  <RenderNodeCard id="end_b" tagLabel="FINALIZAÇÃO & PRESCRIÇÃO ISOLADA" />
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* MODO SIMULADOR PASSO A PASSO */}
      {viewMode === 'simulator' && (
        <div className="bg-slate-900/90 p-6 md:p-8 rounded-3xl border-2 border-purple-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-black text-purple-300 bg-purple-950 px-3.5 py-1.5 rounded-full border border-purple-700 uppercase">
              SIMULADOR DE DECISÃO CLÍNICA GUIADO
            </span>
            <button
              onClick={() => setCurrentStepId('q1')}
              className="text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700"
            >
              <RefreshCw size={13} /> Reiniciar Passo a Passo
            </button>
          </div>

          {nodesMap[currentStepId] && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-950 border-2 border-purple-500/80 space-y-3">
                <span className="px-3 py-1 bg-purple-950 text-purple-300 border border-purple-700 rounded-full text-xs font-black uppercase inline-block">
                  PERGUNTA ATUAL
                </span>
                <h3 className="text-2xl font-black text-white">{nodesMap[currentStepId].title}</h3>
                <p className="text-sm text-slate-300">{nodesMap[currentStepId].subtitle}</p>

                {nodesMap[currentStepId].rationale && (
                  <div className="p-4 bg-slate-900 rounded-2xl border border-amber-800/80 text-xs text-amber-200 mt-2">
                    💡 <strong>Por que esta decisão importa?</strong> {nodesMap[currentStepId].rationale}
                  </div>
                )}
              </div>

              {nodesMap[currentStepId].childrenYes && nodesMap[currentStepId].childrenNo ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <button
                    onClick={() => {
                      const next = nodesMap[currentStepId].childrenYes!;
                      setCurrentStepId(next);
                      setSelectedNodeId(next);
                      setActivePath(prev => [...prev, currentStepId, next]);
                      setExpandedNodes(prev => ({ ...prev, [next]: true }));
                    }}
                    className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg shadow-2xl border-2 border-emerald-400 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                  >
                    <CheckCircle2 size={22} /> SIM (Avançar para Conduta Favorável)
                  </button>

                  <button
                    onClick={() => {
                      const next = nodesMap[currentStepId].childrenNo!;
                      setCurrentStepId(next);
                      setSelectedNodeId(next);
                      setActivePath(prev => [...prev, currentStepId, next]);
                      setExpandedNodes(prev => ({ ...prev, [next]: true }));
                    }}
                    className="p-5 rounded-2xl bg-rose-700 hover:bg-rose-600 text-white font-black text-lg shadow-2xl border-2 border-rose-400 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                  >
                    <ShieldAlert size={22} /> NÃO (Caminho de Restrição / Alternativa)
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-emerald-950/90 rounded-3xl border-2 border-emerald-500 text-emerald-100 text-sm space-y-3">
                  <p className="font-extrabold text-base flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-400" /> Ponto Final do Algoritmo Decisório Alcançado
                  </p>
                  <p>A prescrição posológica completa e a conduta clínica final foram geradas para este caso específico.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
