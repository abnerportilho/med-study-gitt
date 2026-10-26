import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ArrowRight, HelpCircle, 
  Sparkles, Stethoscope, ChevronDown, ChevronUp, ShieldAlert, Award
} from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  badge: string;
  badgeColor: string;
  scenario: string;
  findings: {
    idade: string;
    clinica: string;
    imagem: string;
    patologia: string;
  };
  question: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: {
    racional: string;
    pontosChave: string[];
  };
}

const CASES: CaseStudy[] = [
  {
    id: 1,
    title: 'Caso 1: Mulher Assintomática com Mamas Densas',
    badge: 'Rastreamento & Mamas Densas',
    badgeColor: 'text-cyan-400 bg-cyan-950 border-cyan-800',
    scenario: 'Paciente de 42 anos, assintomática, comparece para consulta ginecológica de rotina trazendo mamografia bilateral que mostra ausência de lesões suspeitas (BI-RADS 1), porém laudo descreve padrão de alta densidade fibroglandular (BI-RADS tipo C). Sem histórico familiar de câncer de mama.',
    findings: {
      idade: '42 anos, nuligesta, sem sintomas',
      clinica: 'Exame físico das mamas e axilas rigorosamente normal',
      imagem: 'Mamografia BI-RADS 1, composição padrão C (mamas densas)',
      patologia: 'Não se aplica (sem lesões)'
    },
    question: 'Qual é a conduta mais adequada para essa paciente de acordo com as sociedades especializadas (FEBRASGO/SBM/CBR)?',
    options: [
      {
        letter: 'A',
        text: 'Substituir a mamografia por ultrassom mamário anual exclusivo, suspendendo a mamografia até os 50 anos.',
        isCorrect: false,
        feedback: 'Incorreto. O ultrassom isolado NÃO substitui a mamografia, pois não detecta microcalcificações suspeitas agrupadas.'
      },
      {
        letter: 'B',
        text: 'Orientar continuidade do rastreamento mamográfico anual e discutir a adição de ultrassom suplementar de forma individualizada.',
        isCorrect: true,
        feedback: 'Correto! Aos 42 anos no Brasil, FEBRASGO/SBM recomendam MMG anual. Em mamas densas, o US pode ser adicionado após esclarecer risco de falso-positivos.'
      },
      {
        letter: 'C',
        text: 'Solicitar Ressonância Magnética anual imediata, pois padrão C é indicação formal de rastreamento com RM.',
        isCorrect: false,
        feedback: 'Incorreto. RM para rastreamento é indicada para alto risco genético (>20% ao longo da vida ou mutação BRCA), não para mamas densas de risco habitual isoladas.'
      }
    ],
    explanation: {
      racional: 'A mamografia permanece como o único exame que comprovadamente reduz mortalidade no rastreamento populacional. Em mamas densas (C e D), a sensibilidade mamográfica cai para 50-60%. O ultrassom pode encontrar 2 a 4 cânceres adicionais por 1.000 mulheres, porém à custa de elevada taxa de falso-positivos e biópsias benignas.',
      pontosChave: [
        'A mamografia anual dos 40 aos 74 anos é a diretriz da FEBRASGO, SBM e CBR.',
        'O ultrassom é um método complementar, nunca um substituto isolado da mamografia.',
        'A decisão de adicionar ultrassom em mamas densas deve ser compartilhada e informada.'
      ]
    }
  },
  {
    id: 2,
    title: 'Caso 2: A Armadilha da Concordância Tripla',
    badge: 'Discordância Diagnóstica',
    badgeColor: 'text-rose-400 bg-rose-950 border-rose-800',
    scenario: 'Mulher de 54 anos procura o ambulatório com nódulo palpável pétreo de 2,2 cm em quadrante superior lateral de mama direita, fixo e indolor. A mamografia revela lesão espiculada hiperdensa altamente suspeita (BI-RADS 5). A core biopsy guiada por ultrassom retorna com o laudo: "Fragmentos de parênquima mamário com alterações fibrocísticas sem atipias e fibrose estromal".',
    findings: {
      idade: '54 anos, pós-menopausa',
      clinica: 'Nódulo duro, mal delimitado, fixo de 2,2 cm em QSL',
      imagem: 'Nódulo espiculado hiperdenso com distorção arquitetural (BI-RADS 5)',
      patologia: 'Core Biopsy: Tecido fibroglandular sem atipias'
    },
    question: 'Diante do resultado patológico benigno em uma lesão BI-RADS 5, qual deve ser a conduta médica?',
    options: [
      {
        letter: 'A',
        text: 'Tranquilizar a paciente informando que a lesão é benigna e agendar controle em 6 meses com novo ultrassom.',
        isCorrect: false,
        feedback: 'Erro gravíssimo! A clínica e a imagem são altamente suspeitas. O laudo benigno não explica a espiculação; a biópsia falhou em amostrar o tumor.'
      },
      {
        letter: 'B',
        text: 'Reconhecer a discordância radio-patológica e indicar biópsia excisional cirúrgica com marcação pré-operatória ou repetição da core biopsy.',
        isCorrect: true,
        feedback: 'Excelente! A regra de ouro da concordância tripla afirma que um laudo benigno não encerra um caso discordante. Houve erro de amostragem.'
      },
      {
        letter: 'C',
        text: 'Prescrever tamoxifeno profilático e repetir mamografia em 1 ano.',
        isCorrect: false,
        feedback: 'Incorreto. Tamoxifeno não é conduta para nódulo suspeito não diagnosticado.'
      }
    ],
    explanation: {
      racional: 'A probabilidade de malignidade de uma lesão BI-RADS 5 é superior a 95%. Um laudo histológico de "tecido normal" ou "alterações fibrocísticas" é totalmente discordante da morfologia espiculada descrita. A agulha certamente colheu tecido vizinho normal. A conduta mandatória é nova amostragem ou biópsia cirúrgica excisional.',
      pontosChave: [
        'A tríade diagnóstica exige harmonia entre exame físico, imagem e anatomopatológico.',
        'Discordância exige investigação ativa: revisão de lâmina, nova biópsia percutânea ou excisão cirúrgica com fio metálico/agulhamento.',
        'Nunca tranquilizar ou dispensar a paciente diante de um laudo benigno que não justifica o achado radiológico.'
      ]
    }
  },
  {
    id: 3,
    title: 'Caso 3: Tumor HER2-Positivo Localmente Avançado',
    badge: 'Neoadjuvância & Terapia-Alvo',
    badgeColor: 'text-amber-400 bg-amber-950 border-amber-800',
    scenario: 'Paciente de 38 anos apresenta nódulo palpável de 3,5 cm em mama esquerda e dois linfonodos axilares ipsilaterais endurecidos e móveis (cT2 cN1 cM0). Core biopsy confirma Carcinoma Ductal Invasivo, Grau Histológico 3 de Nottingham. Painel imunohistoquímico: RE negativo (0%), RP negativo (0%), HER2 3+ (fortemente positivo e superexpresso), Ki-67 60%.',
    findings: {
      idade: '38 anos, pré-menopausa',
      clinica: 'Nódulo de 3,5 cm com axila palpável móvel (cT2 cN1)',
      imagem: 'Lesão nodular de 35 mm com linfonodos axilares com perda do hilo adiposo',
      patologia: 'Carcinoma Ductal Invasor G3, RE 0%, RP 0%, HER2 3+, Ki-67 60%'
    },
    question: 'Qual é a melhor estratégia terapêutica inicial para esta paciente?',
    options: [
      {
        letter: 'A',
        text: 'Mastectomia radical imediata com esvaziamento axilar completo de urgência.',
        isCorrect: false,
        feedback: 'Incorreto. A cirurgia imediata perde a janela de ouro da avaliação de resposta in vivo e submete a paciente a maior morbidade cirúrgica.'
      },
      {
        letter: 'B',
        text: 'Quimioterapia Neoadjuvante associada a duplo bloqueio anti-HER2 (Trastuzumabe + Pertuzumabe).',
        isCorrect: true,
        feedback: 'Correto! Em tumores HER2-positivos ≥ 2 cm ou com axila positiva, o tratamento sistêmico pré-operatório é a abordagem padrão-ouro.'
      },
      {
        letter: 'C',
        text: 'Terapia endócrina com Tamoxifeno e Gosserrelina por 6 meses para redução tumoral.',
        isCorrect: false,
        feedback: 'Incorreto. O tumor é RE negativo (0%) e RP negativo (0%), portanto é totalmente insensível à terapia endócrina.'
      }
    ],
    explanation: {
      racional: 'A quimioterapia neoadjuvante associada a Trastuzumabe e Pertuzumabe alcança taxas de resposta patológica completa (pCR) superiores a 60% em tumores HER2-positivos. Isso permite descalonar a cirurgia mamária e axilar (possibilitando cirurgia conservadora) e, crucialmente, orienta a terapia adjuvante pós-operatória: se houver resíduo (não-pCR), troca-se para T-DM1.',
      pontosChave: [
        'Tumores HER2+ ou triplo-negativos ≥ 2 cm ou com linfonodo axilar positivo devem receber tratamento neoadjuvante.',
        'A resposta patológica completa (pCR) é um forte preditor de sobrevida global prolongada.',
        'O resíduo patológico pós-neoadjuvância dita a troca para terapias de resgate adjuvantes (T-DM1 ou Capecitabina).'
      ]
    }
  },
  {
    id: 4,
    title: 'Caso 4: Carcinoma Inicial Luminal A em Idosa',
    badge: 'Adjuvância & Descalonamento',
    badgeColor: 'text-purple-400 bg-purple-950 border-purple-800',
    scenario: 'Mulher de 62 anos é submetida a cirurgia conservadora da mama (quadrantectomia) e biópsia do linfonodo sentinela por lesão detectada no rastreamento. Laudo patológico definitivo: Carcinoma Invasivo de Tipo Não Especial (NST), 1,3 cm, Grau 1 de Nottingham, margens livres de 5 mm, 0 de 3 linfonodos sentinelas acometidos (pT1c pN0 cM0). Imunohistoquímica: RE 95%, RP 90%, HER2 escore 1+ (negativo), Ki-67 6%.',
    findings: {
      idade: '62 anos, menopausa aos 51 anos',
      clinica: 'Assintomática, tumor de 1,3 cm ressecado com margens amplas livres',
      imagem: 'Mamografia prévia com nódulo espiculado de 13 mm sem outras lesões',
      patologia: 'pT1c pN0, Grau 1, RE 95%, RP 90%, HER2 1+, Ki-67 6% (Luminal A clássico)'
    },
    question: 'Qual é o plano terapêutico adjuvante correto para esta paciente?',
    options: [
      {
        letter: 'A',
        text: 'Radioterapia adjuvante da mama tratada + Terapia endócrina adjuvante com Inibidor da Aromatase (ex: Anastrozol) por 5 anos.',
        isCorrect: true,
        feedback: 'Perfeito! A cirurgia conservadora exige radioterapia da mama para controle local. Sendo Luminal A pT1cN0, o inibidor da aromatase é altamente eficaz, dispensando quimioterapia citotóxica.'
      },
      {
        letter: 'B',
        text: 'Quimioterapia adjuvante com 4 ciclos de Doxorrubicina e Ciclofosfamida seguidos de Paclitaxel.',
        isCorrect: false,
        feedback: 'Incorreto. O perfil Luminal A Grau 1 com Ki-67 de 6% e axila negativa tem excelente prognóstico e não obtém benefício clínico de quimioterapia.'
      },
      {
        letter: 'C',
        text: 'Apenas observação clínica, sem necessidade de radioterapia ou medicamentos hormonais.',
        isCorrect: false,
        feedback: 'Incorreto. A cirurgia conservadora exige radioterapia, e o bloqueio hormonal reduz pela metade o risco de recidiva e novo tumor contralateral.'
      }
    ],
    explanation: {
      racional: 'A cirurgia conservadora exige radioterapia para igualar a sobrevida à mastectomia. Em mulheres na pós-menopausa com tumores luminais fortemente responsivos e de baixa proliferação celular (Luminal A), os inibidores de aromatase por 5 anos reduzem drasticamente o risco de recidiva à distância e locorregional.',
      pontosChave: [
        'A radioterapia é componente mandatório do tratamento conservador da mama.',
        'Em mulheres na pós-menopausa, os inibidores da aromatase são superiores ao tamoxifeno.',
        'Tumores Luminais A pT1cN0 não necessitam de quimioterapia citotóxica.'
      ]
    }
  },
  {
    id: 5,
    title: 'Caso 5: A Rotina de Seguimento da Sobrevivente',
    badge: 'Seguimento Racional',
    badgeColor: 'text-emerald-400 bg-emerald-950 border-emerald-800',
    scenario: 'Paciente de 47 anos completou tratamento de carcinoma mamário estádio I há 3 anos (cirurgia conservadora, radioterapia e em uso de tamoxifeno). Encontra-se completamente assintomática, praticando caminhadas diárias e com exame físico normal. Ela comparece à consulta com um pedido de check-up contendo: Marcadores tumorais (CA 15-3 e CEA), Tomografia de Tórax, Tomografia de Abdome e Cintilografia Óssea, que solicitou em outro serviço.',
    findings: {
      idade: '47 anos, pré-menopausa em uso de Tamoxifeno',
      clinica: 'Assintomática, sem queixas, exame físico normal',
      imagem: 'Mamografia anual sem alterações suspeitas',
      patologia: 'Histórico prévio de CA inicial; sem lesões atuais'
    },
    question: 'Qual é a orientação médica baseada nas melhores evidências clínicas internacionais (ASCO/ESMO/SBOC)?',
    options: [
      {
        letter: 'A',
        text: 'Realizar todas as tomografias e marcadores semestrais para detectar metástases o mais precocemente possível.',
        isCorrect: false,
        feedback: 'Incorreto. Ensaios randomizados comprovaram que a "varredura" periódica em assintomáticas não prolonga a sobrevida global.'
      },
      {
        letter: 'B',
        text: 'Desaconselhar a realização da rotina de tomografias e marcadores tumorais em pacientes assintomáticas, mantendo anamnese, exame físico periódico e mamografia anual.',
        isCorrect: true,
        feedback: 'Exato! A prática de solicitar exames de imagem sistêmica e marcadores tumorais de rotina não traz ganho de sobrevida e expõe a paciente a radiação, falso-positivos e ansiedade desnecessária.'
      },
      {
        letter: 'C',
        text: 'Substituir as tomografias por PET-CT anual completo com 18F-FDG.',
        isCorrect: false,
        feedback: 'Incorreto. O PET-CT de rotina em sobreviventes assintomáticas é formalmente contraindicado pelo risco de biópsias desnecessárias e custos desproporcionais.'
      }
    ],
    explanation: {
      racional: 'Estudos clássicos como o GIVIO demonstraram que rastrear metástases em pacientes assintomáticas com exames de imagem e marcadores tumorais não melhora a sobrevida global nem a qualidade de vida. O objetivo do seguimento é detectar recidivas locais na mama operada e segundos tumores mamários primários precoces.',
      pontosChave: [
        'O acompanhamento baseia-se em exame físico periódico minucioso e mamografia anual.',
        'Marcadores séricos (CA 15-3 e CEA) e exames de imagem sistêmica NÃO devem ser solicitados de rotina em pacientes assintomáticas.',
        'Exames avançados devem ser reservados para a elucidação de sintomas novos e específicos.'
      ]
    }
  }
];

export default function MalignasCasosClinicosDecisoes() {
  const [selectedCaseId, setSelectedCaseId] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const currentCase = CASES.find(c => c.id === selectedCaseId) || CASES[0];

  const handleSelectOption = (caseId: number, letter: string) => {
    setSelectedAnswers(prev => ({ ...prev, [caseId]: letter }));
    setShowExplanation(prev => ({ ...prev, [caseId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 7 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Award size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 7 · Simulação de Casos Reais
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Casos Clínicos & Tomada de Decisão Interativa
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          Teste seus conhecimentos nos cenários mais frequentes e desafiadores do consultório, da atenção primária e das provas de residência médica em ginecologia, mastologia e oncologia clínica.
        </p>

        {/* NAVEGAÇÃO DOS CASOS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {CASES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedCaseId === c.id
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>Caso {c.id}</span>
              {selectedAnswers[c.id] && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DETALHE DO CASO ATUAL */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${currentCase.badgeColor}`}>
              {currentCase.badge}
            </span>
            <h4 className="text-lg md:text-xl font-black text-white mt-2">
              {currentCase.title}
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Questão {currentCase.id} de {CASES.length}
          </span>
        </div>

        {/* HISTÓRIA CLÍNICA */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed">
          <p className="font-serif italic text-slate-200 text-sm md:text-base border-l-2 border-rose-500 pl-4 py-1">
            "{currentCase.scenario}"
          </p>
        </div>

        {/* SUMÁRIO DOS DADOS CLÍNICOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Perfil da Paciente</span>
            <p className="text-slate-200 font-medium">{currentCase.findings.idade}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Exame Físico</span>
            <p className="text-slate-200 font-medium">{currentCase.findings.clinica}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Achados de Imagem</span>
            <p className="text-slate-200 font-medium">{currentCase.findings.imagem}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Patologia / IHQ</span>
            <p className="text-slate-200 font-medium">{currentCase.findings.patologia}</p>
          </div>
        </div>

        {/* PERGUNTA & OPÇÕES */}
        <div className="space-y-4 pt-2">
          <div className="text-sm md:text-base font-bold text-white flex items-center gap-2">
            <HelpCircle size={20} className="text-rose-400" />
            <span>{currentCase.question}</span>
          </div>

          <div className="space-y-3">
            {currentCase.options.map(option => {
              const isSelected = selectedAnswers[currentCase.id] === option.letter;
              const hasAnswered = !!selectedAnswers[currentCase.id];

              return (
                <button
                  key={option.letter}
                  onClick={() => handleSelectOption(currentCase.id, option.letter)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs md:text-sm flex items-start gap-3.5 ${
                    isSelected
                      ? option.isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-white'
                        : 'bg-rose-950/70 border-rose-500 text-white'
                      : hasAnswered && option.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-600/80 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 font-mono ${
                    isSelected
                      ? option.isCorrect
                        ? 'bg-emerald-500 text-black'
                        : 'bg-rose-500 text-white'
                      : hasAnswered && option.isCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}>
                    {option.letter}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <p className="leading-relaxed font-medium">{option.text}</p>
                    {isSelected && (
                      <p className={`text-xs font-semibold ${option.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {option.feedback}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* JUSTIFICATIVA CLÍNICA EXPANDIDA */}
        {showExplanation[currentCase.id] && (
          <div className="p-5 md:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Sparkles size={18} />
              <span>Discussão Clínica do Especialista</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentCase.explanation.racional}
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <strong className="text-white block font-bold">Pontos Cardinais para Memorizar:</strong>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                {currentCase.explanation.pontosChave.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
