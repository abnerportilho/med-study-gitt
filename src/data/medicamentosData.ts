export interface ComorbidityFactors {
  renal: string;       // DRC: TFG/ClCr de corte, nefrotoxicidade e ajustes
  hepatic: string;     // Insuficiência hepática, Child-Pugh, metabolismo
  cardiac: string;     // ICC, arritmias, hipotensão, retenção volêmica
  elderly: string;     // Critérios de Beers, quedas, cognição, hipotensão
  pregnancy: string;   // Categoria de risco, teratogênese e lactação
}

export interface ToxicityInfo {
  signsSymptoms: string[];      // Sinais de alarme e intoxicação clínica
  antidote: string;             // Nome do antídoto específico
  antidoteDose: string;         // Dose, diluição e via do antídoto
  emergencyConduct: string[];   // Conduta passo a passo no pronto-socorro
  dialyzable: boolean;          // Se é removível por hemodiálise
  monitoringParams: string[];   // Exames laboratoriais e monitorização (ECG, K+, etc.)
}

export interface DoseFunctionProfile {
  title: string;
  doseRange: string;
  functionName: 'Indutora do Sono' | 'Antidepressiva' | 'Estabilizador de Humor' | string;
  targetReceptors: string;
  clinicalAction: string;
  description: string;
  indications: string[];
  receptorOccupancy: string;
  clinicalPearl: string;
  badgeColor: 'blue' | 'purple' | 'emerald' | 'amber' | 'indigo';
}

export interface AntibioticSpectrum {
  gramPositive: string[];     // Cocos e bacilos gram-positivos cobertos
  gramNegative: string[];     // Bacilos e cocos gram-negativos cobertos
  anaerobes: string[];        // Cobertura para anaeróbios estritos e facultativos
  atypicals?: string[];       // Patógenos atípicos e intracelulares
  criticalGaps: string[];     // Lacunas graves de cobertura (o que NÃO cobre)
  pkPdIndex: string;          // Parâmetro farmacodinâmico PK/PD (T>MIC, Cmax/MIC, AUC/MIC)
  clinicalPearls?: string[];  // Pérolas microbiológicas e regras de ouro
}

export interface DrugItem {
  id: string;
  name: string;
  brandNames: string[];
  classCategory: string;
  system: 'cardiovascular' | 'endocrinologia' | 'nefrologia' | 'snc_psiquiatria' | 'analgesia_inflamacao' | 'infecciosas' | 'gastrointestinal';
  systemLabel: string;
  commonDose: string;
  indications: string[];
  mechanismOfAction: string;
  doseFunctionProfiles?: DoseFunctionProfile[];
  antibioticSpectrum?: AntibioticSpectrum;
  comorbidities: ComorbidityFactors;
  toxicity: ToxicityInfo;
  warningAlert?: string;
}

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor';

export interface DrugInteraction {
  drugAId: string;
  drugBId: string;
  severity: InteractionSeverity;
  severityLabel: string;
  mechanism: string;
  clinicalRisk: string;
  management: string;
}

export interface AntidoteGuideItem {
  id: string;
  toxicAgent: string;
  drugClass: string;
  antidoteName: string;
  mechanism: string;
  standardDose: string;
  administrationRoute: string;
  pediatricDose?: string;
  keyPrecautions: string[];
  urgencyLevel: 'imediato' | 'prioritario' | 'suporte';
}

// ==========================================================================
// BANCO DE DADOS DE MEDICAMENTOS (30+ FÁRMACOS FUNDAMENTAIS)
// ==========================================================================
export const DRUGS_DATABASE: DrugItem[] = [
  // --- CARDIOVASCULAR & ANTICOAGULAÇÃO ---
  {
    id: 'varfarina',
    name: 'Varfarina Sódica',
    brandNames: ['Marevan', 'Coumadin', 'Varfine'],
    classCategory: 'Anticoagulante Cumarínico (Inibidor da VKORC1)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & Hemostasia',
    commonDose: '2,5 mg a 10 mg/dia via oral, ajustada pelo RNI (alvo 2,0-3,0 ou 2,5-3,5 em prótese metálica mecânica).',
    indications: [
      'Prevenção de tromboembolismo em Fibrilação Atrial com CHA2DS2-VASc elevado',
      'Próteses valvares cardíacas mecânicas (indicação mandatória)',
      'Tratamento e prevenção secundária de TVP e TEP'
    ],
    mechanismOfAction: 'Inibe a enzima epóxido redutase da vitamina K (VKORC1), impedindo a gama-carboxilação dos fatores dependentes de vitamina K (II, VII, IX, X e proteínas C e S).',
    comorbidities: {
      renal: 'Sem ajuste de dose direto por TFG, mas DRC aumenta risco de calcifilaxia e sangramento urêmico. Monitorar RNI com maior frequência.',
      hepatic: 'Insuficiência hepática reduz síntese basal de fatores de coagulação, potencializando efeito da varfarina. Risco grave de sangramento.',
      cardiac: 'Monitorar congestão hepática na IC descompensada, que altera a depuração e desestabiliza o RNI.',
      elderly: 'Critérios de Beers: Risco muito alto de quedas com hematoma subdural. Avaliar escore HAS-BLED criteriosamente.',
      pregnancy: 'CATEGORIA X (Altamente Teratogênica). Causa síndrome varfarínica fetal (hipoplasia nasal, condrodisplasia pontilhada). Substituir por Enoxaparina/HNF.'
    },
    toxicity: {
      signsSymptoms: [
        'Hemorragia ativa (gengivorragia, epistaxe, hematúria, melena, hematoma espontâneo)',
        'RNI > 4,5 sem sangramento (risco iminente)',
        'Cefaleia súbita e rebaixamento do nível de consciência (suspeita de AVC hemorrágico)'
      ],
      antidote: 'Fitomenadiona (Vitamina K1) e Complexo Protrombínico (CCP)',
      antidoteDose: 'Sem sangramento e RNI 4,5-10: suspender dose. Sangramento grave/RNI > 10: Vitamina K1 10 mg EV lento em 30 min + Complexo Protrombínico 4 fatores (25-50 UI/kg EV) ou Plasma Fresco Congelado (15 mL/kg).',
      emergencyConduct: [
        'Interromper imediatamente a varfarina e aferir RNI de urgência',
        'Se sangramento com risco de morte: infundir Complexo Protrombínico 4F imediatamente (reverte em minutos)',
        'Administrar Vitamina K1 10 mg diluída em SF 100 mL EV lento em 30 min (ação plena em 6 a 24 horas)',
        'Suporte volêmico, tipagem sanguínea e reserva de concentrado de hemácias'
      ],
      dialyzable: false,
      monitoringParams: ['RNI frequente (diário até estabilização)', 'Hemoglobina/Hematócrito', 'TC de Crânio em caso de trauma ou cefaleia']
    },
    warningAlert: 'Múltiplas interações via CYP2C9 e alimentos ricos em vitamina K (folhas verde-escuras alteram o RNI).'
  },
  {
    id: 'dabigatrana',
    name: 'Dabigatrana',
    brandNames: ['Pradaxa'],
    classCategory: 'Anticoagulante Oral Direto (Inibidor Direto da Trombina / DOAC)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & Hemostasia',
    commonDose: '150 mg 2x/dia (ou 110 mg 2x/dia se idade >= 80 anos ou alto risco hemorrágico).',
    indications: [
      'Prevenção de AVC e embolia sistêmica na Fibrilação Atrial Não-Valvar',
      'Tratamento e prevenção secundária de TVP e TEP'
    ],
    mechanismOfAction: 'Inibidor competitivo direto e reversível da trombina livre e ligada ao coágulo (Fator IIa).',
    comorbidities: {
      renal: '80% de excreção renal! Contraindicado formalmente se TFG < 30 mL/min/1,73m². Risco de acúmulo e hemorragia fatal.',
      hepatic: 'Contraindicado em hepatopatia grave (Child-Pugh C) ou coagulopatia associada.',
      cardiac: 'Contraindicado em pacientes com próteses valvares metálicas (estudo RE-ALIGN mostrou mais eventos trombóticos).',
      elderly: 'Reduzir dose para 110 mg 2x/dia se >= 80 anos. Risco de dispepsia gástrica (cápsula com núcleo de ácido tartárico).',
      pregnancy: 'Evitar no primeiro e terceiro trimestres (poucos dados de segurança). Preferir HBPM.'
    },
    toxicity: {
      signsSymptoms: ['Sangramento maior, melena, hematúria, hematomas expansivos'],
      antidote: 'Idarucizumabe (Praxbind)',
      antidoteDose: 'Idarucizumabe 5 g EV (administrado em duas doses consecutivas de 2,5 g em infusão rápida ou bolus).',
      emergencyConduct: [
        'Suspender a droga imediatamente',
        'Se sangramento com ameaça à vida: Idarucizumabe 5 g EV imediato (antídoto específico que neutraliza a dabigatrana em minutos)',
        'Se não houver antídoto: Complexo Protrombínico 50 UI/kg ou Carvão ativado se ingestão < 2 horas',
        'Dabigatrana tem baixa ligação a proteínas e É DIALISÁVEL em casos refratários'
      ],
      dialyzable: true,
      monitoringParams: ['Tempo de Trombina (TT)', 'Tempo de Coagulação de Ecarina (ECT)', 'Hemograma e Creatinina/TFG']
    }
  },
  {
    id: 'rivaroxabana',
    name: 'Rivaroxabana',
    brandNames: ['Xarelto', 'Runin', 'Rivaxa'],
    classCategory: 'Anticoagulante Oral Direto (Inibidor Direto do Fator Xa / DOAC)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & Hemostasia',
    commonDose: '20 mg 1x/dia junto à refeição principal (reduzir para 15 mg 1x/dia se TFG 15-49 mL/min).',
    indications: [
      'Fibrilação Atrial Não-Valvar para prevenção de AVC',
      'Tratamento de TVP e TEP (15 mg 2x/dia por 21 dias, seguido de 20 mg 1x/dia)',
      'Profilaxia de TVP em artroplastia de quadril/joelho'
    ],
    mechanismOfAction: 'Inibidor seletivo e reversível do sítio ativo do Fator Xa (livre e no complexo protrombinase).',
    comorbidities: {
      renal: 'Excreção 33% renal inalterada. Reduzir dose para 15 mg/dia se TFG 15-49 mL/min. Contraindicado se TFG < 15 mL/min.',
      hepatic: 'Contraindicado em Child-Pugh B e C com risco hemorrágico.',
      cardiac: 'Não usar em prótese valvar mecânica nem estenose mitral reumática moderada a grave.',
      elderly: 'Avaliar função renal periodicamente (pelo menos 1x ao ano ou a cada 6 meses se TFG limítrofe).',
      pregnancy: 'Contraindicado na gestação e lactação. Atravessa a placenta.'
    },
    toxicity: {
      signsSymptoms: ['Hemorragias ativas maiores, sangramento gastrointestinal, hipotensão inexplicada'],
      antidote: 'Andexanet alfa (Andexxa) ou Complexo Protrombínico 4F (não específico)',
      antidoteDose: 'Andexanet alfa bolus seguido de infusão contínua de 2h, OU Complexo Protrombínico 4F 50 UI/kg EV se indisponível.',
      emergencyConduct: [
        'Interromper rivaroxabana',
        'Carvão ativado 50g se ingestão há menos de 2 horas',
        'Complexo Protrombínico 4F 50 UI/kg EV se sangramento com risco à vida',
        'Ácido Tranexâmico 1g EV como adjuvante'
      ],
      dialyzable: false,
      monitoringParams: ['Atividade anti-Fator Xa calibrada', 'Hemoglobina', 'TFG/Creatinina']
    }
  },
  {
    id: 'amiodarona',
    name: 'Amiodarona',
    brandNames: ['Ancoron', 'Atlansil'],
    classCategory: 'Antiarrítmico Classe III de Vaughan-Williams (Bloqueador de Canais de K+)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & Arritmias',
    commonDose: 'Dose de ataque: 600-1200 mg/dia por 1-2 semanas; Manutenção: 100-200 mg/dia VO. Na PCR: 300 mg bolus EV.',
    indications: [
      'Taquiarritmias ventriculares com instabilidade (TV/FV) e PCR',
      'Controle de ritmo e frequência na Fibrilação Atrial em pacientes com disfunção de VE (FE reduzida)',
      'Prevenção de morte súbita em cardiopatias estruturais graves'
    ],
    mechanismOfAction: 'Prolonga o potencial de ação e o período refratário atrial e ventricular (Classe III), com ações adicionais Classes I, II e IV.',
    comorbidities: {
      renal: 'Sem ajuste na insuficiência renal. Não dialisável (alta ligação a tecidos e lipossolúvel).',
      hepatic: 'Hepatotoxicidade com elevação de transaminases em até 20%. Risco de hepatite medicamentosa crônica.',
      cardiac: 'Causa bradicardia sinusal, BAV de vários graus e prolongamento importante do intervalo QTc (risco de Torsades de Pointes).',
      elderly: 'Risco aumentado de bradiarritmias sintomáticas e hipotireoidismo induzido.',
      pregnancy: 'CATEGORIA D. Atravessa a placenta, alta concentração no leite; causa bócio e hipotireoidismo fetal.'
    },
    toxicity: {
      signsSymptoms: [
        'Bradicardia sinusal severa e BAV avançado',
        'Prolongamento extremo do QTc (> 500 ms) e Torsades de Pointes',
        'Toxicidade pulmonar subaguda (pneumonite intersticial com tosse seca e dispneia progressiva)',
        'Disfunção tireoidiana (hipo ou hipertireoidismo por excesso de iodo)',
        'Depósitos corneanos e coloração azulada/acinzentada da pele (fotossensibilidade)'
      ],
      antidote: 'Sem antídoto farmacológico específico. Suporte com Atropina / Marcapasso / Sulfato de Magnésio',
      antidoteDose: 'Para Torsades de Pointes: Sulfato de Magnésio 2 g EV em 2 minutos. Para bradicardia/choque: Atropina 1 mg EV ou Marcapasso Provisório.',
      emergencyConduct: [
        'Suspender o medicamento (lembrar da meia-vida longa de 40 a 60 dias!)',
        'Se Torsades de Pointes: Sulfato de Magnésio 2g EV + Isoproterenol ou pacing para acelerar FC',
        'Se bradicardia sintomática refratária à atropina: passar Marcapasso Transvenoso provisório',
        'Investigar toxicidade pulmonar com TC de tórax de alta resolução'
      ],
      dialyzable: false,
      monitoringParams: ['ECG periódico (monitorar QTc)', 'TSH e T4 livre a cada 6 meses', 'TGO/TGP', 'Raio-X / TC de Tórax']
    },
    warningAlert: 'Potente inibidor de CYP2C9, CYP3A4 e P-gp: dobra os níveis séricos de Digoxina e Varfarina.'
  },
  {
    id: 'digoxina',
    name: 'Digoxina',
    brandNames: ['Digoxina', 'Lanoxin'],
    classCategory: 'Glicosídeo Cardíaco (Inotrópico Positivo / Inibidor da Na+/K+ ATPase)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & ICC',
    commonDose: '0,125 mg a 0,25 mg/dia via oral (alvo sérico estrito: 0,5 a 0,9 ng/mL).',
    indications: [
      'Controle de frequência cardíaca na Fibrilação Atrial concomitante com IC com FE reduzida',
      'Insuficiência Cardíaca sintomática (NYHA II-IV) refratária ao tratamento padrão otimizado'
    ],
    mechanismOfAction: 'Inibe a bomba Na+/K+ ATPase miocárdica, aumentando o cálcio intracelular (inotropismo positivo) e estimulando o tônus vagal (cronotropismo negativo no nó AV).',
    comorbidities: {
      renal: '75% eliminada inalterada pelos rins. Ajuste mandatório por TFG! DRC é a principal causa de intoxicação digitálica fatal.',
      hepatic: 'Metabolismo hepático menor (~25%). Cuidado em idosos com massa magra reduzida.',
      cardiac: 'Risco de extrassístoles ventriculares, bigeminismo, TV bidirecional e bloqueios atrioventriculares.',
      elderly: 'Janela terapêutica estreitíssima! Dosagem em idosos geralmente não deve ultrapassar 0,125 mg/dia ou em dias alternados.',
      pregnancy: 'Categoria C. Monitorar digoxinemia materna estritamente durante o pré-natal.'
    },
    toxicity: {
      signsSymptoms: [
        'Sintomas gastrointestinais precoces: náuseas, vômitos, anorexia intensa, diarreia',
        'Sintomas neurológicos/visuais: xantopsia (visão amarelada/verde), escotomas, confusão mental',
        'Arritmias clássicas: extrassístoles ventriculares, bigeminismo, Taquicardia Atrial com BAV variável, TV bidirecional',
        'Hipercalemia grave na intoxicação aguda (por bloqueio sistêmico da bomba Na+/K+ ATPase)'
      ],
      antidote: 'Anticorpos antidigoxina Fragmentos Fab (DigiFab / Digibind)',
      antidoteDose: 'Dose calculada por frascos: Frascos = (Nível sérico de digoxina x peso em kg) / 100. Se dose desconhecida na emergência: 10 a 20 frascos EV em 30 min.',
      emergencyConduct: [
        'Interromper a digoxina imediatamente',
        'Coletar digoxinemia de urgência e painel de eletrólitos (K+, Mg++, Ca++)',
        'Corrigir Hipocalemia e Hipomagnesemia se presentes (potencializam a toxicidade)',
        'Se intoxicação com arritmia maligna ou K+ > 5,0 mEq/L: infundir Anticorpos Fab (DigiFab)',
        'EVITAR cardioversão elétrica se possível (risco de desencadear FV refratária assistolia)'
      ],
      dialyzable: false,
      monitoringParams: ['Digoxinemia (alvo 0,5 - 0,9 ng/mL)', 'Potássio e Magnésio séricos', 'ECG contínuo']
    }
  },
  {
    id: 'enalapril',
    name: 'Enalapril',
    brandNames: ['Renitec', 'Eupressin', 'Vasopril'],
    classCategory: 'Inibidor da Enzima Conversora de Angiotensina (IECA)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & Renal',
    commonDose: '5 mg a 20 mg 2x/dia (dose máxima 40 mg/dia).',
    indications: [
      'Hipertensão Arterial Sistêmica',
      'Insuficiência Cardíaca com Fração de Ejeção Reduzida (ICFER - pilar prognóstico)',
      'Nefroproteção no Diabetes Mellitus com albuminúria'
    ],
    mechanismOfAction: 'Inibe a conversão de angiotensina I em angiotensina II, reduzindo a vasoconstrição, secreção de aldosterona e a degradação da bradicinina.',
    comorbidities: {
      renal: 'Promove vasodilatação da arteríola eferente glomerular, reduzindo a pressão intraglomerular. Causa elevação inicial de até 30% da creatinina (aceitável). Monitorar K+ e creatinina em 7-14 dias.',
      hepatic: 'É uma pró-droga convertida no metabólito ativo enalaprilato pelo fígado.',
      cardiac: 'Excelente para remodelamento reverso no VE. Cuidado com hipotensão de primeira dose em hipovolêmicos.',
      elderly: 'Risco de hipotensão ortostática e hipercalemia com suplementos ou espironolactona.',
      pregnancy: 'CATEGORIA D/X (Contraindicação Absoluta na Gestação). Causa oligoâmnio, hipoplasia pulmonar e disgenesia renal fetal.'
    },
    toxicity: {
      signsSymptoms: [
        'Hipotensão postural e choque hemodinâmico por vasodilatação maciça',
        'Hipercalemia grave (> 6,0 mEq/L) com ondas T apiculadas no ECG',
        'Angioedema de laringe/língua mediado por bradicinina (risco de asfixia iminente)',
        'Tosse seca refratária mediada por acúmulo de bradicinina e substância P'
      ],
      antidote: 'Sem antídoto químico direto. Para Angioedema: Adrenalina + Icatibanto. Para Hipercalemia: Gluconato de Cálcio.',
      antidoteDose: 'Angioedema com estridor: Adrenalina 0,5 mg IM no vasto lateral da coxa. Hipercalemia: Gluconato de Cálcio 10% 10-20 mL EV em 3 min.',
      emergencyConduct: [
        'Garantir via aérea imediata se houver angioedema de língua/úvula',
        'Expansão volêmica com Cristaloides (SF 0,9%) para reversão de hipotensão',
        'Se hipercalemia com alteração de ECG: estabilizar membrana miocárdica com Gluconato de Cálcio 10% 10 mL EV',
        'Medidas de desvio de K+ (Glicoinsulina + Inalação com Fenoterol) e resinas trocadoras'
      ],
      dialyzable: true,
      monitoringParams: ['Creatinina e TFG', 'Potássio sérico (K+)', 'Pressão Arterial']
    }
  },
  {
    id: 'espironolactona',
    name: 'Espironolactona',
    brandNames: ['Aldactone', 'Diitad'],
    classCategory: 'Antagonista dos Receptores de Mineralocorticoides (ARM / Diurético Poupador de K+)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & ICC',
    commonDose: 'ICFER: 25 mg a 50 mg/dia. HAS resistente: 25-50 mg/dia. Ascite na cirrose: 100-400 mg/dia.',
    indications: [
      'Insuficiência Cardíaca com FE reduzida (reduz mortalidade)',
      'Hipertensão Arterial Resistente (4º fármaco de escolha)',
      'Hiperaldosteronismo primário e secundário (Ascite cirrótica)'
    ],
    mechanismOfAction: 'Antagonista competitivo do receptor de aldosterona no túbulo coletor renal, promovendo natriurese e retenção de potássio e hidrogênio.',
    comorbidities: {
      renal: 'Contraindicado se TFG < 30 mL/min/1,73m² ou K+ basal > 5,0 mEq/L pelo altíssimo risco de hipercalemia potencialmente fatal.',
      hepatic: 'Dose ajustada na cirrose mantendo relação 100mg Espironolactona : 40mg Furosemida.',
      cardiac: 'Bloqueia a fibrose miocárdica e vascular mediada pela aldosterona.',
      elderly: 'Alto risco de hipercalemia inadvertida quando associada a AINEs ou IECAs.',
      pregnancy: 'Evitar (efeitos antiandrogênicos no feto masculino - feminilização).'
    },
    toxicity: {
      signsSymptoms: [
        'Hipercalemia com fraqueza muscular ascendente, parestesias e arritmias ventriculares',
        'Ginecomastia dolorosa em homens (efeito antiandrogênico crônico - pode trocar por Eplerenona)',
        'Desidratação e hiponatremia'
      ],
      antidote: 'Tratamento de emergência da Hipercalemia: Gluconato de Cálcio 10%',
      antidoteDose: 'Gluconato de Cálcio 10% 10-20 mL EV em 3-5 minutos para estabilização de membrana miocárdica.',
      emergencyConduct: [
        'Suspender imediatamente a espironolactona',
        'Realizar ECG imediato: procurar ondas T apiculadas, alargamento de QRS ou ritmo sinoventricular',
        'Gluconato de cálcio 10% 10 mL EV se ECG alterado (repetir em 5 min se persistir)',
        'Glicoinsulina: 10 UI de Insulina Regular em 50 g de Glicose (100 mL de Glicose 50%) em 30 min',
        'Hemodiálise de emergência se hipercalemia refratária com anúria'
      ],
      dialyzable: false,
      monitoringParams: ['Potássio sérico (K+)', 'Creatinina/TFG', 'ECG']
    }
  },
  {
    id: 'clopidogrel',
    name: 'Clopidogrel',
    brandNames: ['Plavix', 'Iscover', 'Clopivax'],
    classCategory: 'Antiplaquetário Tienopiridínico (Inibidor do Receptor P2Y12)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & Hemostasia',
    commonDose: 'Dose de ataque: 300-600 mg VO na SCA; Manutenção: 75 mg/dia via oral.',
    indications: [
      'Síndrome Coronariana Aguda (SCA com e sem supra de ST)',
      'Pós-angioplastia com implante de stent coronário (Dupla Antiagregação Plaquetária - DAPT)',
      'Prevenção secundária de AVC isquêmico e Doença Arterial Obstrutiva Periférica (DAOP)'
    ],
    mechanismOfAction: 'Pró-fármaco ativado no fígado pela CYP2C19, cujo metabólito ativo bloqueia irreversivelmente o receptor plaquetário P2Y12 de ADP.',
    comorbidities: {
      renal: 'Sem necessidade de ajuste de dose na insuficiência renal.',
      hepatic: 'Hepatopatia grave pode comprometer a bioativação pela CYP2C19.',
      cardiac: 'Fundamental no pós-stent. A suspensão precoce causa trombose aguda intrastent com alta mortalidade.',
      elderly: 'Aumenta risco de sangramentos menores e maiores, especialmente se associado a AAS ou anticoagulantes.',
      pregnancy: 'Usar somente se estritamente necessário (dados limitados).'
    },
    toxicity: {
      signsSymptoms: ['Sangramento mucoso, hematomas, hemorragia digestiva, púrpura trombocitopênica trombótica (raro)'],
      antidote: 'Transfusão de Plaquetas (bloqueio é irreversível na plaqueta circulante)',
      antidoteDose: '1 unidade de concentrado de plaquetas para cada 10 kg de peso (ou 1 pool de aférese).',
      emergencyConduct: [
        'Suspender o clopidogrel (efeito residual dura 5 a 7 dias)',
        'Se sangramento grave ativo ou cirurgia de emergência: Transfusão de concentrado de plaquetas',
        'Ácido Tranexâmico 1g EV pode ser utilizado como adjuvante antifibrinolítico',
        'Compressão mecânica e hemostasia cirúrgica/endoscópica direta'
      ],
      dialyzable: false,
      monitoringParams: ['Hemograma e contagem de plaquetas', 'Pesquisa de sangramento oculto']
    },
    warningAlert: 'Interação crítica com Omeprazol (inibe CYP2C19 e reduz ativação do clopidogrel). Preferir Pantoprazol.'
  },
  {
    id: 'metoprolol',
    name: 'Succinato de Metoprolol',
    brandNames: ['Seloken', 'Selozok', 'Lopressor'],
    classCategory: 'Betabloqueador Cardiosseletivo (Beta-1 Antagonista)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & ICC',
    commonDose: '25 mg a 200 mg 1x/dia via oral (formulação de liberação controlada - Succinato).',
    indications: [
      'Insuficiência Cardíaca com Fração de Ejeção Reduzida (ICFER - reduz mortalidade)',
      'Síndrome Coronariana Crônica e pós-Infarto Agudo do Miocárdio',
      'Hipertensão Arterial e Taquiarritmias supraventriculares'
    ],
    mechanismOfAction: 'Bloqueio seletivo dos receptores adrenérgicos beta-1 cardíacos, reduzindo frequência cardíaca, contratilidade miocárdica e consumo de oxigênio.',
    comorbidities: {
      renal: 'Sem necessidade de ajuste de dose na insuficiência renal.',
      hepatic: 'Metabolizado extensamente pelo CYP2D6 hepático.',
      cardiac: 'Contraindicado em IC agudamente descompensada (perfil B ou C), choque cardiogênico e BAV de 2º ou 3º grau.',
      elderly: 'Risco de bradicardia acentuada e fadiga. Cuidado com associação com Verapamil ou Diltiazem.',
      pregnancy: 'Pode causar restrição de crescimento intrauterino e bradicardia fetal. Preferir Labetalol ou Metildopa na gestação.'
    },
    toxicity: {
      signsSymptoms: [
        'Bradicardia severa (< 40 bpm) e Bloqueio Atrioventricular (BAV)',
        'Choque cardiogênico com extremidades frias, hipotensão refratária e má perfusão',
        'Broncoespasmo (em doses elevadas perde a cardiosseletividade)',
        'Hipoglicemia mascarada (bloqueia taquicardia e tremores da hipoglicemia em diabéticos)'
      ],
      antidote: 'Glucagon e Terapia Hiperinsulinêmica Euglicêmica (HIET)',
      antidoteDose: 'Glucagon: 3 a 10 mg EV em bolus em 1-2 minutos, seguido de infusão de 2-5 mg/hora. Se refratário: Insulina Regular em alta dose (1 UI/kg bolus + 1 UI/kg/h) com infusão de Glicose.',
      emergencyConduct: [
        'Atropina 1 mg EV a cada 3-5 minutos (frequentemente ineficaz na intoxicação maciça por betabloqueador)',
        'Glucagon EV: ativa a adenilato ciclase por via independente dos receptores beta, restaurando o inotropismo e a FC',
        'Terapia Hiperinsulinêmica Euglicêmica (HIET) com Glicose 50% de suporte para choque refratário',
        'Emulsão lipídica intravenosa a 20% (Intralipid) para betabloqueadores lipofílicos'
      ],
      dialyzable: false,
      monitoringParams: ['Monitorização cardíaca contínua (ECG)', 'Glicemia capilar de horário', 'Pressão arterial invasiva']
    }
  },
  {
    id: 'hidralazina',
    name: 'Cloridrato de Hidralazina',
    brandNames: ['Apresolina', 'Nepresol', 'Hydralazine'],
    classCategory: 'Vasodilatador Direto Arteriolar Periférico (Anti-hipertensivo)',
    system: 'cardiovascular',
    systemLabel: 'Cardiovascular & Hipertensão',
    commonDose: 'Hipertensão crônica: 25 a 50 mg VO a cada 6 a 12 horas (máximo usual 200 mg/dia para prevenir lúpus induzido). Emergência Hipertensiva na Gestação (Pré-eclâmpsia grave): 5 a 10 mg EV lento a cada 20-30 min (máx 20 mg EV). Insuficiência Cardíaca (associação com Nitrato - A-HeFT): 37,5 mg VO 3x/dia, titulada até 75 mg 3x/dia.',
    indications: [
      'Emergências hipertensivas na gestação (Pré-eclâmpsia grave e Eclâmpsia - fármaco clássico de escolha)',
      'Insuficiência Cardíaca com Fração de Ejeção Reduzida (ICFER) em combinação sinérgica com Dinitrato de Isossorbida, especialmente em autodeclarados negros ou intolerantes a IECA/BRA (ensaio A-HeFT)',
      'Hipertensão arterial resistente ou refratária (obrigatoriamente combinada com betabloqueador e diurético)'
    ],
    mechanismOfAction: 'Vasodilatador periférico de ação direta altamente seletivo sobre a musculatura lisa das arteríolas de resistência (com efeito venoso desprezível). Inibe a liberação de cálcio mediada por IP3 do retículo sarcoplasmático e estimula a via óxido nítrico/GMPc. A queda abrupta da pós-carga arteriolar sem venodilatação deflagra potente taquicardia reflexa mediada por barorreceptores, aumento do débito cardíaco e ativação do SRAA com retenção hidrossalina, exigindo cotratamento com betabloqueador e diurético.',
    comorbidities: {
      renal: 'Excreção e depuração diminuídas na insuficiência renal avançada. Em ClCr < 30 mL/min, espaçar intervalo para cada 8 a 16 horas ou reduzir dose em 50%. A retenção de sódio e água pode precipitar sobrecarga volêmica em renais crônicos sem diurético de alça.',
      hepatic: 'Extenso metabolismo hepático de primeira passagem via enzima N-acetiltransferase 2 (NAT2). Pacientes ACETILADORES LENTOS têm níveis séricos muito mais altos e risco quadruplicado de desenvolver LÚPUS INDUZIDO POR DROGAS (DILE).',
      cardiac: 'CONTRAINDICADA em monoterapia na doença arterial coronariana (risco de roubo de fluxo coronariano, taquicardia reflexa com aumento do MVO2 e infarto agudo do miocárdio). Contraindicada na dissecção aórtica (aumenta força de cisalhamento dP/dt). Exige betabloqueador protetor concomitante.',
      elderly: 'Risco aumentado de hipotensão ortostática acentuada, quedas e isquemia miocárdica silenciosa pela taquicardia reflexa. Iniciar com doses baixas (10-25 mg/dia).',
      pregnancy: 'CATEGORIA C. Fármaco padrão-ouro para manejo endovenoso de crises hipertensivas na pré-eclâmpsia grave e eclâmpsia. Evitar quedas pressóricas abruptas para manter a perfusão útero-placentária.'
    },
    toxicity: {
      signsSymptoms: [
        'LÚPUS ERITEMATOSO INDUZIDO POR DROGAS (DILE): poliartralgia/artrite simétrica (mãos/joelhos), febre, astenia, serosite (pleurite e pericardite com dor torácica pleurítica), rash cutâneo e positividade para anticorpos FAN e ANTI-HISTONA (> 95%)',
        'Taquicardia reflexa severa, palpitações intensas, desencadeamento de angina de peito e risco de IAM',
        'Cefaleia pulsátil frontal intensa e rubor facial por vasodilatação meníngea e cutânea',
        'Hipotensão arterial sintomática grave e síncope ao levantar',
        'Retenção hidrossalina com edema maleolar exuberante e descompensação de insuficiência cardíaca',
        'Neuropatia periférica funcional por deficiência/antagonismo de Piridoxina (Vitamina B6)'
      ],
      antidote: 'Para Lúpus Induzido: Suspensão IMEDIATA da Hidralazina ± Prednisona. Para Hipotensão grave: Cristaloide EV + Vasopressor Alfa-1 puro (Noradrenalina/Fenilefrina). Para Taquicardia reflexa: Betabloqueador (Metoprolol/Esmolol). Para Neuropatia: Piridoxina (Vitamina B6).',
      antidoteDose: 'Lúpus: Suspensão imediata (cura clínica em semanas); Prednisona 0,5 a 1 mg/kg/dia se serosite importante. Choque vasodilatador: Noradrenalina 0,05 a 0,5 mcg/kg/min EV em bomba de infusão. Neuropatia: Piridoxina 50 a 100 mg/dia VO.',
      emergencyConduct: [
        'Se suspeita de Lúpus Induzido (dor articular, febre, dor pleurítica): SUSPENDER A HIDRALAZINA IMEDIATAMENTE e de forma permanente',
        'Solicitar painel autoimune confirmatório: FAN (padrão homogêneo habitual), Anticorpos ANTI-HISTONA (> 95% positivo), Anti-dsDNA (tipicamente NEGATIVO, diferenciando do LES) e frações C3/C4 do complemento (normais)',
        'Na hipotensão aguda: posicionamento em Trendelenburg, ressuscitação volêmica guiada com Cristaloide e suporte vasopressor com Noradrenalina se refratário (evitar agonistas beta puros para não agravar a taquicardia)',
        'Se taquicardia reflexa com isquemia miocárdica: administrar cautelosamente Betabloqueador de ação rápida (ex.: Esmolol ou Metoprolol EV)',
        'Pesquisar status de acetilador (NAT2) e orientar paciente sobre a irreversibilidade da contraindicação de reexposição'
      ],
      dialyzable: false,
      monitoringParams: [
        'Anticorpos Anti-Histona e FAN se uso prolongado (> 3 a 6 meses) com queixas articulares ou dor torácica',
        'Pressão arterial e Frequência cardíaca seriadas (vigilância de taquicardia reflexa)',
        'Eletrocardiograma (ECG) para afastar isquemia subendocárdica e taquiarritmias',
        'Hemograma e sedimento urinário para controle de serosite e afastar nefrite',
        'Vigilância de peso diário para detecção precoce de retenção hidrossalina'
      ]
    },
    warningAlert: 'ALERTA MÁXIMO DE FARMACOVIGILÂNCIA: O uso prolongado de Hidralazina (especialmente em doses > 200 mg/dia e em ACETILADORES LENTOS via NAT2) apresenta alto risco de deflagrar LÚPUS ERITEMATOSO INDUZIDO POR DROGAS (DILE). Manifesta-se classicamente por poliartralgia/artrite, febre, serosite (pleurite/pericardite) e positividade dos anticorpos ANTI-HISTONA em > 95% dos casos. Diferencia-se do LES idiopático por anti-dsDNA negativo, complemento C3/C4 normal e resolução após a SUSPENSÃO IMEDIATA do remédio. Nunca usar em monoterapia para hipertensão devido à taquicardia reflexa e retenção hídrica.'
  },

  // --- ENDOCRINOLOGIA & METABOLISMO ---
  {
    id: 'metformina',
    name: 'Cloridrato de Metformina',
    brandNames: ['Glifage', 'Glucoformin', 'Dimefor'],
    classCategory: 'Biguanida (Antidiabético Oral Sensibilizador de Insulina)',
    system: 'endocrinologia',
    systemLabel: 'Endocrinologia & Diabetes',
    commonDose: '500 mg a 2550 mg/dia via oral, fracionada junto às principais refeições.',
    indications: [
      'Diabetes Mellitus Tipo 2 (fármaco de primeira linha)',
      'Pré-diabetes com alto risco metabólico',
      'Síndrome dos Ovários Policísticos (SOP) com resistência insulínica'
    ],
    mechanismOfAction: 'Ativa a proteína quinase ativada por AMP (AMPK), reduzindo a gliconeogênese hepática e aumentando a captação periférica de glicose.',
    comorbidities: {
      renal: 'Ajuste estrito por TFG: TFG 45-59 mL/min = dose máx 1000 mg/dia; TFG 30-44 mL/min = dose máx 500 mg/dia. CONTRAINDICADA se TFG < 30 mL/min pelo risco de Acidose Lática fatal.',
      hepatic: 'Contraindicada em hepatopatia grave ou alcoolismo (reduz depuração de lactato).',
      cardiac: 'Suspender na insuficiência cardíaca aguda descompensada e no choque séptico/cardiogênico.',
      elderly: 'Monitorar TFG semestralmente. Risco de deficiência de Vitamina B12 no uso a longo prazo.',
      pregnancy: 'Pode ser utilizada em casos selecionados, mas Insulina continua sendo padrão-ouro no DMG.'
    },
    toxicity: {
      signsSymptoms: [
        'Acidose Lática associada à Metformina (MALA): náuseas, vômitos, dor abdominal, taquipneia de Kussmaul',
        'Lactato arterial > 5 mmol/L com Anion Gap elevado e pH < 7,20',
        'Colapso hemodinâmico, hipotermia e parada cardiorrespiratória'
      ],
      antidote: 'Sem antídoto químico. Hemodiálise Intermitente de Urgência (padrão-ouro)',
      antidoteDose: 'Hemodiálise de alto fluxo com banho de bicarbonato para depurar a metformina e corrigir a acidose metabólica grave.',
      emergencyConduct: [
        'Suspender imediatamente a metformina',
        'Indicação precoce de Hemodiálise de urgência (remove a metformina e o excesso de lactato)',
        'Ressuscitação volêmica guiada e infusão cautelosa de Bicarbonato de Sódio 8,4% se pH < 7,1',
        'Suporte ventilatório e correção hemodinâmica na UTI'
      ],
      dialyzable: true,
      monitoringParams: ['Gasometria arterial e Lactato sérico', 'Creatinina/Ureia e Anion Gap', 'Glicemia capilar']
    },
    warningAlert: 'Suspender 48 horas antes e depois de procedimentos com Contraste Iodado em pacientes com TFG < 60 mL/min.'
  },
  {
    id: 'dapagliflozina',
    name: 'Dapagliflozina',
    brandNames: ['Forxiga', 'Edistride'],
    classCategory: 'Inibidor de SGLT2 (Gliflozina)',
    system: 'endocrinologia',
    systemLabel: 'Endocrinologia, Cardio & Renal',
    commonDose: '10 mg 1x/dia pela manhã.',
    indications: [
      'Diabetes Mellitus Tipo 2 com benefício cardiorrenal',
      'Insuficiência Cardíaca (ICFER e ICFEP - reduz hospitalização e morte cardiovascular)',
      'Doença Renal Crônica com albuminúria (reduz progressão para diálise)'
    ],
    mechanismOfAction: 'Inibe o cotransportador sódio-glicose 2 (SGLT2) no túbulo contorcido proximal, promovendo glicosúria e natriurese.',
    comorbidities: {
      renal: 'Pode ser iniciada com TFG até 20-25 mL/min/1,73m² para proteção renal/cardíaca (o efeito glicosúrico diminui, mas o nefroprotetor persiste).',
      hepatic: 'Sem necessidade de ajuste em insuficiência hepática leve a moderada.',
      cardiac: 'Excelente redução de sobrecarga volêmica sem ativação simpática reflexa.',
      elderly: 'Atenção especial à depleção volêmica, hipotensão postural e infecções fúngicas genitais.',
      pregnancy: 'Contraindicada no 2º e 3º trimestres (risco ao desenvolvimento renal fetal).'
    },
    toxicity: {
      signsSymptoms: [
        'Cetoacidose Diabética Euglicêmica (CAD com glicemia < 200 mg/dL): náuseas, vômitos, hálito cetônico, dor abdominal',
        'Infecções geniturinárias micóticas de repetição (candidíase genital, balanite)',
        'Gangrena de Fournier (fasceíte necrotizante perineal - emergência cirúrgica rara)',
        'Desidratação e hipotensão ortostática'
      ],
      antidote: 'Para CAD Euglicêmica: Infusão de Glicose + Insulina EV concomitante',
      antidoteDose: 'Glicose 5% ou 10% EV contínua associada à bomba de Insulina Regular 0,05-0,1 UI/kg/h para estancar a cetogênese.',
      emergencyConduct: [
        'Suspender imediatamente o iSGLT2',
        'Se CAD Euglicêmica suspeita: dosar Cetonemia/Cetonúria e Gasometria mesmo com glicemia normal!',
        'Iniciar hidratação vigorosa com Soro Fisiológico 0,9%',
        'Administrar Glicose EV combinada com Insulina para desligar a produção de corpos cetônicos'
      ],
      dialyzable: false,
      monitoringParams: ['Gasometria e Cetonemia', 'Exame físico da genitália e períneo', 'Pressão arterial e TFG']
    },
    warningAlert: 'Suspender 3 dias antes de grandes cirurgias programadas ou procedimentos sob anestesia geral.'
  },
  {
    id: 'insulina-regular',
    name: 'Insulina Regular Humana',
    brandNames: ['Humulin R', 'Novolin R', 'Biohulin R'],
    classCategory: 'Insulina de Ação Rápida',
    system: 'endocrinologia',
    systemLabel: 'Endocrinologia & Emergência',
    commonDose: 'Variável conforme glicemia capilar e sensibilidade (0,1 UI/kg/h na CAD; bolus pré-prandiais).',
    indications: [
      'Tratamento intensivo do Diabetes Mellitus Tipo 1 e 2',
      'Cetoacidose Diabética (CAD) e Estado Hiperosmolar Hiperglicêmico (EHH)',
      'Manejo de Hipercalemia grave com alterações eletrocardiográficas'
    ],
    mechanismOfAction: 'Liga-se ao receptor tirosina quinase de insulina, promovendo translocação do transportador GLUT-4 e captação celular de glicose.',
    comorbidities: {
      renal: 'A depuração de insulina é renal. Em DRC avançada a meia-vida se prolonga, EXIGINDO REDUÇÃO de dose para evitar hipoglicemias graves.',
      hepatic: 'Disfunção hepática altera a gliconeogênese, predispondo a hipoglicemias prolongadas.',
      cardiac: 'A hipoglicemia severa pode deflagrar isquemia miocárdica e arritmias cardíacas.',
      elderly: 'Metas de HbA1c menos rígidas em idosos frágeis (7,5 a 8,5%) para prevenir quedas por hipoglicemia.',
      pregnancy: 'Padrão-ouro na gestação (DMG e DM prévio). Não atravessa a barreira placentária.'
    },
    toxicity: {
      signsSymptoms: [
        'Hipoglicemia leve a moderada (< 70 mg/dL): sudorese fria, tremores, taquicardia, palidez, fome intensa',
        'Hipoglicemia grave (< 54 mg/dL): confusão mental, sonolência, convulsões, coma hipoglicêmico',
        'Hipocalemia severa por influxo maciço de potássio para o meio intracelular'
      ],
      antidote: 'Glicose Hipertônica a 50% EV e Glucagon',
      antidoteDose: 'Glicose 50%: 40 a 50 mL EV em bolus imediato. Se sem acesso venoso: Glucagon 1 mg IM ou SC.',
      emergencyConduct: [
        'Se paciente consciente: Regra dos 15g de carboidrato rápido VO e reavaliar em 15 minutos',
        'Se paciente rebaixado/inconsciente: Glicose 50% 40-50 mL EV direto na veia',
        'Manter infusão contínua de Glicose 5% ou 10% se hipoglicemia induzida por insulina de ação prolongada ou sulfonilureia',
        'Monitorar potássio sérico (risco de hipocalemia concomitante)'
      ],
      dialyzable: false,
      monitoringParams: ['Glicemia capilar a cada 15-30 minutos', 'Potássio sérico (K+)', 'Nível de consciência']
    }
  },
  {
    id: 'propiltiouracil',
    name: 'Propiltiouracil (PTU)',
    brandNames: ['Propil', 'Propiltiouracil', 'PTU', 'Propycil'],
    classCategory: 'Tionamida / Antitireoidiano (Inibidor de TPO e da 5\'-Desiodase Periférica)',
    system: 'endocrinologia',
    systemLabel: 'Endocrinologia & Tireoide',
    commonDose: 'Hipertireoidismo (Graves): 100 a 150 mg VO a cada 8 horas (total 300 a 450 mg/dia); dose de manutenção de 50 a 150 mg/dia. Crise Tireotóxica: Ataque de 500 a 1.000 mg VO/SNG seguido de 200 a 250 mg a cada 4 horas.',
    indications: [
      'Hipertireoidismo clínico e Doença de Graves em adultos e adolescentes',
      'Crise Tireotóxica / Tempestade Tireoidiana (droga de escolha absoluta por bloquear a conversão periférica T4 -> T3 via 5\'-desiodase)',
      'Hipertireoidismo no 1º Trimestre da Gestação (droga de escolha; menor risco de aplasia cutis congênita e atresia coanal que o Metimazol)',
      'Preparo pré-operatório para tireoidectomia e pré-tratamento para radioiodoterapia (I-131)',
      'Alternativa em pacientes com intolerância ao Metimazol sem toxicidade hepática prévia'
    ],
    mechanismOfAction: 'Inibe a enzima tireoperoxidase (TPO), impedindo a oxidação do iodeto e a organificação na tireoglobulina, além de bloquear o acoplamento de iodotirosinas (MIT e DIT) para síntese de T3 e T4. Possui efeito exclusivo entre as tionamidas de inibir a enzima 5\'-desiodase tipo 1 nos tecidos periféricos, reduzindo rapidamente a conversão do pró-hormônio T4 no hormônio ativo T3 circulante.',
    comorbidities: {
      renal: 'Ajuste posológico obrigatório: em ClCr 10-50 mL/min administrar 75% da dose; em ClCr < 10 mL/min reduzir para 50%. CUIDADO MÁXIMO: o uso crônico pode deflagrar Glomerulonefrite Necrosante Crescêntica por Vasculite ANCA-positiva com hematúria dismórfica e proteinúria.',
      hepatic: 'BLACK BOX WARNING DA FDA: Alto risco de hepatite fulminante citotóxica imunomediada com necrose hepática maciça e necessidade de transplante hepático de urgência. Contraindicado em hepatopatia prévia ativa. Se TGO/TGP > 3x o LSN ou icterícia/colúria, descontinuar imediatamente.',
      cardiac: 'A normalização rápida dos níveis de hormônios tireoidianos reduz a sobrecarga adrenérgica cardíaca, controlando taquicardias supraventriculares, fibrilação atrial e insuficiência cardíaca de alto débito induzidas pela tireotoxicose.',
      elderly: 'Maior suscetibilidade à agranulocitose idiopática e manifestações insidiosas de vasculite ANCA (artralgias graves comumente confundidas com osteoartrite). Monitorar hemograma e função renal.',
      pregnancy: 'CATEGORIA D. Fármaco de primeira escolha no 1º TRIMESTRE gestacional pelo menor risco de teratogênese em relação ao Metimazol. Recomenda-se a transição para Metimazol no 2º e 3º trimestres devido ao risco de hepatite fulminante materna por PTU.'
    },
    toxicity: {
      signsSymptoms: [
        'VASCULITE SISTÊMICA ANCA-POSITIVA (p-ANCA / anti-MPO): lesões purpúricas em pele (púrpura palpável, livedo reticular, úlceras dolorosas), poliartralgia inflamatória incapacitante, febre inexplicada, fadiga extrema e, em casos graves, glomerulonefrite crescêntica rapidamente progressiva ou hemorragia alveolar difusa (síndrome pulmão-rim)',
        'HEPATOTOXICIDADE FULMINANTE: icterícia escleral súbita, colúria, fezes claras/acólicas, prurido cutâneo, dor no hipocôndrio direito, encefalopatia hepática e coagulopatia grave',
        'AGRANULOCITOSE IDIOPÁTICA (< 500 neutrófilos/µL): febre alta súbita, dor de garganta severa (faringite/amigdalite ulcerativa) e sepse bacteriana neutropênica de rápida evolução',
        'Hipoprotrombinemia e distúrbios da coagulação com sangramentos gengivais, epistaxe e hematomas espontâneos',
        'Hipotireoidismo iatrogênico e formação de bócio por superdosagem prolongada'
      ],
      antidote: 'Para Vasculite ANCA: Suspensão IMEDIATA e definitiva do PTU + Corticoterapia Imunossupressora (Prednisona ou Pulsoterapia com Metilprednisolona). Para Agranulocitose: Filgrastim (G-CSF).',
      antidoteDose: 'Pulsoterapia: Metilprednisolona 500 mg a 1.000 mg EV/dia por 3 dias para vasculite grave com acometimento renal ou pulmonar, seguida de Prednisona oral 1 mg/kg/dia. Para agranulocitose: Filgrastim (G-CSF) 300 mcg SC/dia + Cefepime 2g EV 8/8h empírico. Se hipoprotrombinemia: Fitomenadiona (Vitamina K1) 10 mg EV lenta.',
      emergencyConduct: [
        'Se suspeita de Vasculite ANCA: SUSPENDER O PROPILTIOURACIL IMEDIATAMENTE e de forma definitiva (nunca mais reintroduzir)',
        'Coletar triagem imunológica e orgânica urgente: p-ANCA (anti-mieloperoxidase), c-ANCA (anti-PR3), FAN, Urina 1 (sedimento com hematúria dismórfica/proteinúria) e Creatinina/Ureia',
        'Solicitar Raio-X ou TC de tórax se houver queixa de dispneia, tosse ou hemoptise (excluir hemorragia alveolar difusa grave)',
        'Iniciar corticoterapia imunossupressora conforme gravidade (Prednisona oral ou pulsoterapia com Metilprednisolona EV); se hemorragia pulmonar ou falência renal, internar em UTI e considerar plasmaférese / ciclofosfamida',
        'Se febre ou odinofagia: suspender a medicação na hora e realizar Hemograma Completo com urgência absoluta para descartar agranulocitose',
        'Se icterícia, colúria ou dor abdominal: dosar transaminases (TGO/TGP), bilirrubinas e coagulograma imediatamente'
      ],
      dialyzable: false,
      monitoringParams: [
        'Titulação de anticorpos ANCA (p-ANCA / anti-MPO e c-ANCA) se febre, artralgia ou lesões cutâneas',
        'Hemograma completo com contagem de neutrófilos antes do início e sempre que houver febre ou dor de garganta',
        'Função hepática (TGO, TGP, Bilirrubinas, Fosfatase Alcalina e INR) seriada',
        'Urina tipo 1 (sedimento urinário) e Creatinina sérica para detecção precoce de glomerulonefrite',
        'TSH e T4 livre a cada 4 a 6 semanas para titulação posológica'
      ]
    },
    warningAlert: 'ALERTA MÁXIMO DE FARMACOVIGILÂNCIA: O uso prolongado de Propiltiouracil (PTU) pode deflagrar Vasculite Autoimune mediada por anticorpos p-ANCA (anti-mieloperoxidase), manifestando-se com púrpura palpável, artralgias severas, glomerulonefrite e risco de hemorragia pulmonar (SciELO). Possui também Black Box Warning para Hepatite Fulminante e risco de Agranulocitose. Qualquer sinal de manchas na pele, dores nas juntas, febre ou dor de garganta exige SUSPENSÃO IMEDIATA do remédio e avaliação médica urgente.'
  },

  // --- ANALGESIA, INFLAMAÇÃO & TOXICOLOGIA ---
  {
    id: 'paracetamol',
    name: 'Paracetamol (Acetaminofeno)',
    brandNames: ['Tylenol', 'Parador', 'Dôrico'],
    classCategory: 'Analgésico e Antipirético Não-Opioide',
    system: 'analgesia_inflamacao',
    systemLabel: 'Analgesia & Toxicologia',
    commonDose: '500 mg a 1000 mg a cada 6 horas (dose máxima em adultos hígidos: 4g/dia; cirróticos: max 2g/dia).',
    indications: [
      'Dor leve a moderada (cefaleia, mialgia, dor musculoesquelética)',
      'Controle de febre em adultos e pediatria'
    ],
    mechanismOfAction: 'Inibe a síntese central de prostaglandinas e atua em vias serotoninérgicas descendentes da dor.',
    comorbidities: {
      renal: 'Pode ser usado em pacientes renais crônicos sem nefrotoxicidade significativa em doses terapêuticas.',
      hepatic: 'Dose máxima reduzida para 2 g/dia na cirrose hepática ou alcoolismo crônico. Sobredosagem gera o metabólito tóxico NAPQI.',
      cardiac: 'Seguro do ponto de vista cardiovascular (não aumenta risco isquêmico ao contrário dos AINEs).',
      elderly: 'Analgésico de primeira linha para osteoartrite em idosos devido à ausência de toxicidade gástrica ou renal dos AINEs.',
      pregnancy: 'CATEGORIA B. Analgésico e antipirético de escolha durante toda a gestação e amamentação.'
    },
    toxicity: {
      signsSymptoms: [
        'Fase 1 (0-24h): Assintomático ou náuseas, vômitos, palidez e mal-estar geral',
        'Fase 2 (24-72h): Melhora aparente dos sintomas digestivos, porém início de dor em hipocôndrio direito e elevação de transaminases',
        'Fase 3 (72-96h): Hepatite fulminante, icterícia, encefalopatia hepática, coagulopatia grave (aumento do RNI) e óbito por insuficiência hepática aguda'
      ],
      antidote: 'N-Acetilcisteína (NAC / Fluimucil)',
      antidoteDose: 'Protocolo EV de 21 horas: Ataque de 150 mg/kg em 200 mL SG 5% em 60 min; depois 50 mg/kg em 500 mL SG 5% em 4h; depois 100 mg/kg em 1000 mL SG 5% em 16h.',
      emergencyConduct: [
        'Avaliar nomograma de Rumack-Matthew com nível sérico de paracetamol coletado às 4 horas pós-ingestão',
        'Carvão ativado 50 g se ingestão há menos de 2 horas',
        'Iniciar N-Acetilcisteína (NAC) precocemente (ideal antes de 8 horas da ingestão, mas benéfico mesmo tardiamente)',
        'Monitorar RNI/TP, TGO/TGP, Bilirrubinas, Creatinina e Gasometria (critérios de King\'s College para transplante hepático)'
      ],
      dialyzable: true,
      monitoringParams: ['Nível sérico de Paracetamol', 'TGO/TGP e RNI', 'Lactato e pH']
    },
    warningAlert: 'Principal causa de insuficiência hepática aguda fulminante por overdose medicamentosa no mundo.'
  },
  {
    id: 'morfina',
    name: 'Sulfato de Morfina',
    brandNames: ['Dimorf', 'Dolo Moff'],
    classCategory: 'Analgésico Opioide Forte (Agonista dos Receptores Mu)',
    system: 'analgesia_inflamacao',
    systemLabel: 'Analgesia & Emergência',
    commonDose: 'Dor aguda: 2 a 5 mg EV a cada 4 horas titulado; Dor crônica oncológica: doses individualizadas.',
    indications: [
      'Dor aguda severa (politrauma, queimaduras, pós-operatório)',
      'Dor oncológica crônica refratária a degraus anteriores da OMS',
      'Alívio da dispneia em cuidados paliativos avançados'
    ],
    mechanismOfAction: 'Agonista potente dos receptores opioides mu centrais e periféricos, inibindo a liberação de neurotransmissores nociceptivos.',
    comorbidities: {
      renal: 'Gera metabólitos ativos (Morfina-6-glicuronídeo) excretados pelos rins. Na DRC acumulam e causam depressão respiratória e narcose grave!',
      hepatic: 'Metabolizada pelo fígado. Na insuficiência hepática a depuração diminui, prolongando a sedação.',
      cardiac: 'Causa vasodilatação e liberação de histamina (pode causar hipotensão transitória).',
      elderly: 'Altíssimo risco de delirium, obstipação intratável, retenção urinária e quedas.',
      pregnancy: 'Uso crônico causa síndrome de abstinência neonatal. Risco de depressão respiratória neonatal se usada no parto.'
    },
    toxicity: {
      signsSymptoms: [
        'Tríade clássica da Intoxicação por Opioides: 1. Miose puntiforme bilateral; 2. Depressão respiratória (< 8 a 10 irpm); 3. Rebaixamento do nível de consciência (coma)',
        'Cianose e hipoxemia progressiva',
        'Edema pulmonar não cardiogênico em overdoses maciças'
      ],
      antidote: 'Cloridrato de Naloxona (Narcan)',
      antidoteDose: 'Naloxona 0,04 a 0,4 mg EV a cada 2-3 minutos, titulada até retorno do drive ventilatório espontâneo (evitar acordar em abstinência aguda).',
      emergencyConduct: [
        'Manejo primário da via aérea e ventilação imediata com Bolsa-Válvula-Máscara (Ambu) + O2 a 100%',
        'Administrar Naloxona EV titulada (atenção: a meia-vida da naloxona é de 30 a 90 min, menor que a da morfina, necessitando de reavaliação ou bomba contínua)',
        'Se parada cardiorrespiratória associada a opioides: iniciar RCP padrão de alta qualidade com prioridade ventilatória'
      ],
      dialyzable: false,
      monitoringParams: ['Frequência respiratória e oximetria contínua', 'Capnografia', 'Escala de Glasgow']
    }
  },
  {
    id: 'ibuprofeno',
    name: 'Ibuprofeno',
    brandNames: ['Advil', 'Alivium', 'Ibumeto'],
    classCategory: 'Anti-inflamatório Não Esteroidal (AINE Não Seletivo COX-1 e COX-2)',
    system: 'analgesia_inflamacao',
    systemLabel: 'Analgesia & Reumatologia',
    commonDose: '400 mg a 600 mg a cada 6 a 8 horas (dose máxima 2400 mg/dia).',
    indications: [
      'Dor inflamatória musculoesquelética aguda e dismenorreia',
      'Febre e cefaleia tensional/enxaqueca'
    ],
    mechanismOfAction: 'Inibição reversível das enzimas ciclooxigenases 1 e 2 (COX-1 e COX-2), bloqueando a síntese de prostaglandinas e tromboxano A2.',
    comorbidities: {
      renal: 'Bloqueia a vasodilatação da arteríola aferente mediada por prostaglandinas. Causa Nefrite Intersticial Aguda, necrose de papila e IRA grave!',
      hepatic: 'Pode elevar transaminases e predispor a hemorragia digestiva em cirróticos.',
      cardiac: 'Retém sódio e água (descompensa ICC e eleva PA) e aumenta risco de IAM e AVC.',
      elderly: 'CRITÉRIOS DE BEERS: Evitar uso crônico. Alto risco de úlcera péptica perfurada e sangramento digestivo alto sem dor prévia.',
      pregnancy: 'CONTRAINDICADO no 3º trimestre: causa fechamento prematuro do canal arterial fetal e oligoâmnio.'
    },
    toxicity: {
      signsSymptoms: [
        'Epigastralgia intensa, náuseas, vômitos, hemorragia digestiva alta (hematêmese/melena)',
        'Insuficiência Renal Aguda anúrica ou oligúrica',
        'Zumbido no ouvido, vertigem e acidose metabólica em megadoses'
      ],
      antidote: 'Sem antídoto específico. Suporte com Inibidores de Bomba de Prótons e Hidratação',
      antidoteDose: 'Omeprazol/Pantoprazol 80 mg EV em bolus seguido de infusão para hemorragia digestiva.',
      emergencyConduct: [
        'Suspender o AINE imediatamente',
        'Carvão ativado se ingestão tóxica recente (< 2h)',
        'Hidratação venosa vigorosa com SF 0,9% para proteger perfusão renal',
        'Endoscopia Digestiva Alta de urgência se suspeita de úlcera sangrante'
      ],
      dialyzable: false,
      monitoringParams: ['Creatinina e Ureia', 'Hemograma (pesquisa de anemia aguda)', 'Pesquisa de sangue oculto nas fezes']
    }
  },

  // --- SNC & PSIQUIATRIA ---
  {
    id: 'diazepam',
    name: 'Diazepam',
    brandNames: ['Valium', 'Dienpax', 'Kiatrium'],
    classCategory: 'Benzodiazepínico de Longa Duração (Modulador Alostérico GABA-A)',
    system: 'snc_psiquiatria',
    systemLabel: 'SNC & Emergência Neurológica',
    commonDose: 'Crise convulsiva: 10 mg EV lento (2 mg/min); Ansiedade: 5 mg a 10 mg VO.',
    indications: [
      'Estado de Mal Epiléptico e convulsões agudas (primeira linha)',
      'Crise de ansiedade aguda e transtorno do pânico',
      'Síndrome de Abstinência Alcoólica e prevenção de delirium tremens'
    ],
    mechanismOfAction: 'Potencializa a ação inibitória do GABA ao se ligar ao sítio benzodiazepínico do receptor GABA-A, aumentando a frequência de abertura dos canais de cloro.',
    comorbidities: {
      renal: 'Metabólitos ativos podem ter depuração retardada na uremia.',
      hepatic: 'Extensamente metabolizado pelo fígado (CYP2C19 e CYP3A4) com metabólitos ativos (desmetildiazepam) com meia-vida de até 100 horas. Risco de encefalopatia.',
      cardiac: 'Injeção rápida pode causar hipotensão transitória e parada cardiorrespiratória por depressão miocárdica/veículo propilenoglicol.',
      elderly: 'CRITÉRIOS DE BEERS: Risco altíssimo de quedas, fraturas de fêmur, sedação residual diurna e declínio cognitivo.',
      pregnancy: 'Atravessa a placenta. Risco de síndrome do bebê hipotônico ("floppy infant syndrome") e hipotermia neonatal.'
    },
    toxicity: {
      signsSymptoms: [
        'Sedação profunda, sonolência, ataxia importante, disartria (fala arrastada)',
        'Depressão respiratória grave (especialmente quando associado a álcool ou opioides)',
        'Hipotensão e coma com reflexos preservados'
      ],
      antidote: 'Flumazenil (Lanexat)',
      antidoteDose: 'Flumazenil 0,2 mg EV em 15 segundos; se necessário, repetir 0,1 mg a cada 60 segundos até resposta (dose máxima 1 a 2 mg).',
      emergencyConduct: [
        'Suporte ventilatório e proteção de via aérea (decúbito lateral para evitar broncoaspiração)',
        'Uso criterioso do Flumazenil: CUIDADO em usuários crônicos de benzodiazepínicos ou ingestão concomitante de antidepressivos tricíclicos (PODE DESENCADEAR CONVULSÕES INTRATÁVEIS)',
        'Se intoxicação mista (BZD + álcool/opioide): priorizar ventilação e Naloxona'
      ],
      dialyzable: false,
      monitoringParams: ['Escala de Glasgow e padrão ventilatório', 'Oximetria contínua', 'Gasometria arterial']
    },
    warningAlert: 'Flumazenil pode desencadear estado de mal epiléptico fatal em pacientes com epilepsia ou dependência crônica.'
  },
  {
    id: 'litio',
    name: 'Carbonato de Lítio',
    brandNames: ['Carbolitium', 'Carlit'],
    classCategory: 'Estabilizador do Humor (Cátion Monovalente)',
    system: 'snc_psiquiatria',
    systemLabel: 'Psiquiatria & Nefrologia',
    commonDose: '300 mg a 1200 mg/dia via oral (litemia alvo terapêutica: 0,6 a 1,0 mEq/L).',
    indications: [
      'Transtorno Afetivo Bipolar (episódios de mania e manutenção)',
      'Depressão unipolar refratária como potencializador de antidepressivos',
      'Prevenção de suicídio em transtornos do humor'
    ],
    mechanismOfAction: 'Modula cascatas de segundos mensageiros (inibe a inositol monofosfatase e a GSK-3beta), estabilizando a excitabilidade neuronal.',
    comorbidities: {
      renal: '100% de excreção renal! Filtrado pelo glomérulo e reabsorvido no túbulo proximal competindo com o SÓDIO. Hipovolemia ou desidratação causam intoxicação rápida.',
      hepatic: 'Não sofre metabolismo hepático.',
      cardiac: 'Pode causar achatamento de onda T, disfunção sinusal e arritmias ventriculares.',
      elderly: 'Janela terapêutica ainda mais estreita (alvo em idosos: 0,4 a 0,8 mEq/L).',
      pregnancy: 'CATEGORIA D: Risco de anomalia de Ebstein (malformação da valva tricúspide) se exposto no 1º trimestre.'
    },
    toxicity: {
      signsSymptoms: [
        'Leve a moderada (litemia 1,5 - 2,5 mEq/L): tremor grosseiro de extremidades, náuseas, vômitos, diarreia, ataxia, hiperreflexia',
        'Grave (litemia > 2,5 mEq/L): confusão mental grave, mioclonias, convulsões, coma, colapso cardiovascular e disritmias',
        'Diabetes Insipidus Nefrogênico (poliúria e polidipsia) e hipotireoidismo crônico'
      ],
      antidote: 'Sem antídoto químico específico. Hemodiálise Intermitente de Urgência (padrão-ouro)',
      antidoteDose: 'Expansão com Soro Fisiológico 0,9% para induzir natriurese + Hemodiálise precoce se litemia > 4,0 mEq/L (ou > 2,5 com sintomas graves).',
      emergencyConduct: [
        'Suspender o carbonato de lítio imediatamente',
        'Coletar litemia de urgência, sódio, potássio, ureia e creatinina',
        'Hidratação volêmica com SF 0,9% para repor sódio e água (promove excreção renal)',
        'Hemodiálise de urgência indicada precocemente (lítio tem baixo volume de distribuição e é dialisável)'
      ],
      dialyzable: true,
      monitoringParams: ['Litemia de 12 horas pós-dose', 'Creatinina/Ureia e Eletrólitos', 'Função tireoidiana (TSH)']
    },
    warningAlert: 'Interação perigosa com Diuréticos Tiazídicos e AINEs: reduzem a depuração de lítio em 40%, causando toxicidade aguda.'
  },
  {
    id: 'quetiapina',
    name: 'Hemifumarato de Quetiapina',
    brandNames: ['Seroquel', 'Seroquel XRO', 'Quetros', 'Queropax', 'Quetipin'],
    classCategory: 'Antipsicótico Atípico de 2ª Geração (Modulador Multirreceptorial D2 / 5-HT2A / NET / H1)',
    system: 'snc_psiquiatria',
    systemLabel: 'SNC & Neuropsicofarmacologia',
    commonDose: 'Escalonada por indicação clínica: 25 a 50 mg (sono/sedativo); 150 a 300 mg (antidepressivo); 400 a 800 mg (estabilizador de humor e antipsicótico).',
    indications: [
      'Insônia primária refratária e distúrbios graves do sono (em doses baixas: 25-50 mg)',
      'Episódio Depressivo Maior no Transtorno Afetivo Bipolar I e II (em doses médias: 150-300 mg)',
      'Transtorno Depressivo Maior (TDM) unipolar refratário como adjuvante aos ISRS/IRSN (150-300 mg)',
      'Episódio de Mania ou Misto no Transtorno Afetivo Bipolar (em doses altas: 400-800 mg)',
      'Manutenção preventiva no Transtorno Bipolar para evitar novos episódios (400-800 mg)',
      'Tratamento e manutenção da Esquizofrenia e Psicoses (400-800 mg/dia)'
    ],
    mechanismOfAction: 'Antagonista multirreceptorial com perfil farmacodinâmico único escalonado por dose: em doses baixas bloqueia potentemente receptores H1 (sedação profunda); em doses intermediárias seu metabólito ativo Norquetiapina inibe o transportador de noradrenalina (NET) e atua em receptores 5-HT1A e 5-HT2A (efeito antidepressivo); em doses elevadas atinge bloqueio de >60-70% dos receptores dopaminérgicos D2 mesolímbicos com rápida dissociação "hit-and-run" (estabilização do humor e efeito antipsicótico com baixíssimo risco de sintomas extrapiramidais).',
    doseFunctionProfiles: [
      {
        title: 'Função 1: Indutora do Sono & Sedativo Hipnótico',
        doseRange: '25 mg a 50 mg / dia (Dose Baixa)',
        functionName: 'Indutora do Sono',
        targetReceptors: 'Antagonismo H1 Histaminérgico de Altíssima Afinidade (e alfa-1 adrenérgico leve)',
        clinicalAction: 'Sedação central rápida, redução da latência do sono e aumento da continuidade do sono sem bloquear D2 de forma significativa.',
        description: 'Em doses ultrabaixas (25 a 50 mg), a quetiapina atua quase puramente como um anti-histamínico central potente. Devido à sua afinidade muito superior por H1 em relação a D2, não há efeito antipsicótico nem antidepressivo pleno nessa faixa, apenas efeito hipnótico-sedativo marcado.',
        indications: ['Insônia de difícil controle', 'Insônia associada a ansiedade generalizada ou TEPT', 'Agitação noturna leve'],
        receptorOccupancy: 'Ocupação H1 > 90% | Ocupação D2 insignificante (< 15-20%)',
        clinicalPearl: 'Tomar 30 a 60 minutos antes de deitar. Não causa dependência química ao contrário dos benzodiazepínicos e drogas Z, mas pode causar ganho de peso e sonolência residual matutina.',
        badgeColor: 'blue'
      },
      {
        title: 'Função 2: Ação Antidepressiva (Depressão Bipolar & Unipolar)',
        doseRange: '150 mg a 300 mg / dia (Dose Moderada)',
        functionName: 'Antidepressiva',
        targetReceptors: 'Inibição do NET (Noradrenalina) via Norquetiapina + Antagonismo 5-HT2A/5-HT2C + Agonismo Parcial 5-HT1A',
        clinicalAction: 'Aumento da transmissão noradrenérgica e dopaminérgica no córtex pré-frontal, regulação do humor e redução da anedonia.',
        description: 'Em doses de 150 a 300 mg, os níveis plasmáticos do metabólito Norquetiapina atingem o limiar terapêutico capaz de inibir o transportador de noradrenalina (NET), gerando potente efeito antidepressivo. É aprovada mundialmente em monoterapia para depressão no Transtorno Bipolar (estudos BOLDER e EMBOLDEN).',
        indications: ['Depressão Bipolar tipo I e II (padrão-ouro em monoterapia)', 'Depressão Unipolar resistente a ISRS/IRSN (adjuvante)', 'Ansiedade generalizada refratária'],
        receptorOccupancy: 'Ocupação H1 100% | Inibição NET moderada a alta | Ocupação D2 moderada (~40-50%)',
        clinicalPearl: 'Diferencial clínico: Não induz viragem maníaca na depressão bipolar, sendo uma das drogas mais seguras para tratar o polo depressivo do TAB.',
        badgeColor: 'purple'
      },
      {
        title: 'Função 3: Estabilizador de Humor & Antipsicótico Pleno',
        doseRange: '400 mg a 800 mg / dia (Dose Alta)',
        functionName: 'Estabilizador de Humor',
        targetReceptors: 'Ocupação >60% a 70% dos Receptores Dopaminérgicos D2 + Antagonismo 5-HT2A Pleno',
        clinicalAction: 'Controle rápido de mania e hipomania aguda, prevenção de ciclagem maníaca e remissão de delírios e alucinações psicóticas.',
        description: 'Somente a partir de 400 mg a quetiapina alcança o limiar de ocupação dos receptores D2 mesolímbicos (>60-70%) exigido para controlar quadros maníacos e psicóticos. Apresenta cinética "hit-and-run" (dissocia-se rapidamente do receptor D2), resultando em baixíssima taxa de sintomas extrapiramidais e de hiperprolactinemia.',
        indications: ['Mania aguda no Transtorno Bipolar I', 'Manutenção a longo prazo do Transtorno Bipolar (prevenção de novos episódios)', 'Esquizofrenia e psicoses agudas'],
        receptorOccupancy: 'Ocupação D2 > 60-70% | Ocupação 5-HT2A > 80% | Ocupação H1 plena',
        clinicalPearl: 'Na mania aguda e na esquizofrenia, doses inferiores a 400 mg são subterapêuticas para controle dopaminérgico. Titular de 100 mg no D1 até 400-800 mg até o D4-D7.',
        badgeColor: 'emerald'
      }
    ],
    comorbidities: {
      renal: 'Apenas <5% é excretada de forma inalterada pelos rins. Não exige ajuste posológico na Doença Renal Crônica ou diálise, porém monitorar sedação em pacientes urêmicos.',
      hepatic: 'Extenso metabolismo hepático mediado pela CYP3A4. Em hepatopatias (Child-Pugh A-C), a depuração é reduzida em até 30 a 50%: iniciar com 25 mg/dia e titular com incrementos lentos de 25-50 mg.',
      cardiac: 'Pode causar hipotensão ortostática com taquicardia reflexa devido ao bloqueio alfa-1 adrenérgico (especialmente na titulação inicial). Prolonga discretamente o intervalo QTc (cuidado em cardiopatas e distúrbios eletrolíticos).',
      elderly: 'CRITÉRIOS DE BEERS: Risco aumentado de sedação, hipotensão postural com quedas e fraturas. Contudo, é o antipsicótico atípico mais seguro na Doença de Parkinson e Demência por Corpos de Lewy por não piorar o parkinsonismo motor.',
      pregnancy: 'CATEGORIA C. Atravessa a placenta. Risco de sintomas extrapiramidais e de abstinência transitória no neonato se exposto no 3º trimestre. Usar apenas se benefício superar riscos.'
    },
    toxicity: {
      signsSymptoms: [
        'Sedação profunda, sonolência excessiva e letargia grave',
        'Hipotensão arterial severa e taquicardia sinusal reflexa (bloqueio alfa-1)',
        'Prolongamento do intervalo QTc e risco de arritmias ventriculares',
        'Síndrome Neuroléptica Maligna (rara, mas potencialmente fatal: hipertermia, rigidez muscular em cano de chumbo, CPK elevada, alteração do sensório e labilidade autonômica)',
        'Efeitos metabólicos a longo prazo: ganho ponderal substancial, dislipidemia e aumento da glicemia de jejum'
      ],
      antidote: 'Sem antídoto farmacológico específico. Suporte hemodinâmico intensivo com Cristaloides e Norepinefrina.',
      antidoteDose: 'Hipotensão refratária: Expansão volêmica vigorosa com SF 0,9% + Norepinefrina EV titulada (NUNCA usar Adrenalina/Epinefrina). Se Síndrome Neuroléptica Maligna: Dantroleno 1 a 2,5 mg/kg EV + Bromocriptina 2,5 a 5 mg VO 3x/dia.',
      emergencyConduct: [
        'Manutenção e proteção das vias aéreas (intubação orotraqueal se Glasgow < 8)',
        'Lavagem gástrica e carvão ativado (50g) se ingestão recente há menos de 1 a 2 horas (lembrar do esvaziamento gástrico lentificado em formulações XR)',
        'Para hipotensão: Cristaloides EV. Se choque refratário, usar vasopressores alfa-agonistas (Norepinefrina). CONTRAINDICADO o uso de Adrenalina ou Dopamina (risco de vasodilatação beta-2 e piora paradoxal da hipotensão por bloqueio alfa-1)',
        'Monitorização eletrocardiográfica contínua (monitorar QTc e ritmo cardíaco)',
        'Pesquisa de CPK sérica para descartar Síndrome Neuroléptica Maligna e Rabdomiólise'
      ],
      dialyzable: false,
      monitoringParams: ['Monitorização cardíaca contínua e ECG (intervalo QTc)', 'Pressão arterial e frequência cardíaca', 'Glicemia de jejum, Perfil lipídico e Peso/IMC', 'CPK sérica se febre ou rigidez muscular']
    },
    warningAlert: 'Atenção aos inibidores da CYP3A4 (cetoconazol, claritromicina) que quadruplicam os níveis de quetiapina. Cuidado com o risco de hipotensão e síndrome metabólica.'
  },

  // --- ANTIMICROBIANOS & INFECTOLOGIA (ESPECTRO MICROBIOLÓGICO COMPLETO) ---
  {
    id: 'vancomicina',
    name: 'Cloridrato de Vancomicina',
    brandNames: ['Vancocina', 'Vancocid', 'Vancomax', 'Celovan'],
    classCategory: 'Glicopeptídeo Bactericida (Inibidor da Síntese de Parede Celular D-Ala-D-Ala)',
    system: 'infecciosas',
    systemLabel: 'Infectologia & Terapia Intensiva',
    commonDose: 'Adultos normofunção renal: Dose de ataque de 25 a 30 mg/kg EV (máx. 2g na 1ª dose) seguida de 15 a 20 mg/kg EV a cada 8 a 12 horas. Na Colite por C. difficile: 125 a 500 mg VO a cada 6 horas (via oral exclusiva!).',
    indications: [
      'Infecções graves por Staphylococcus aureus resistente à meticilina (MRSA): pneumonia nosocomial, bacteremia, osteomielite e endocardite',
      'Infecções de corrente sanguínea associadas a cateter venoso central (Staphylococcus epidermidis e coagulase-negativos)',
      'Infecções de próteses articulares e próteses valvares cardíacas em associação com Rifampicina e Gentamicina',
      'Meningite bacteriana hospitalar ou comunitária por Pneumococo resistente (associada à Ceftriaxona)',
      'Colite Pseudomembranosa grave / fulminante por Clostridioides difficile (somente por VIA ORAL, pois via EV não tem secreção luminal intestinal)'
    ],
    mechanismOfAction: 'Inibe a síntese do peptideoglicano da parede celular bacteriana ligando-se com alta afinidade à terminação D-alanil-D-alanina dos precursores da parede, bloqueando a transpeptidação e a polimerização da cadeia de peptideoglicano. Ação bactericida tempo-dependente com efeito pós-antibiótico.',
    antibioticSpectrum: {
      gramPositive: [
        'Staphylococcus aureus (padrão-ouro em cepas MSSA e resistentes à oxacilina / MRSA)',
        'Staphylococcus epidermidis e estafilococos coagulase-negativos produtores de biofilme',
        'Streptococcus pneumoniae (inclusive cepas resistentes a penicilinas e cefalosporinas)',
        'Streptococcus pyogenes (Grupo A), Streptococcus agalactiae (Grupo B), S. viridans',
        'Enterococcus faecalis (cepas sensíveis a glicopeptídeos; não cobre VRE)',
        'Corynebacterium jeikeium, Listeria monocytogenes e Bacillus cereus'
      ],
      gramNegative: [
        'ZERO COBERTURA (Resistência Intrínseca Bacteriana):',
        'Molécula volumosa (1.449 Da) incapaz de transpor a membrana lipopolissacarídica externa',
        'NÃO cobre Pseudomonas aeruginosa, Acinetobacter baumannii e Stenotrophomonas',
        'NÃO cobre Enterobactérias (E. coli, Klebsiella, Proteus, Enterobacter, Serratia)',
        'NÃO cobre cocos Gram-negativos (Neisseria meningitidis, Neisseria gonorrhoeae)'
      ],
      anaerobes: [
        'Clostridioides difficile: Ação intraluminal potente (administração EXCLUSIVA por VIA ORAL)',
        'Peptostreptococcus spp. e Actinomyces spp. (anaeróbios Gram-positivos da microbiota)',
        'Clostridium perfringens e espécies Gram-positivas de Clostridium',
        'NÃO cobre bacilos anaeróbios Gram-negativos (zero ação em Bacteroides fragilis)'
      ],
      atypicals: [
        'Zero cobertura para germes atípicos (Mycoplasma pneumoniae, Chlamydophila, Legionella)',
        'Incapaz de penetrar a membrana eucariótica para atingir patógenos intracelulares'
      ],
      criticalGaps: [
        'Enterococos Resistentes à Vancomicina (VRE - fenótipos vanA/vanB via mutação D-Ala-D-Lac; exige Daptomicina ou Linezolida)',
        'Staphylococcus aureus com sensibilidade intermediária ou resistente (VISA / VRSA)',
        'Todos os bacilos e cocos Gram-negativos (zero cobertura empírica para BGN hospitalares)',
        'Vancomicina intravenosa (EV) NÃO trata colite por C. difficile (não atinge concentração na luz do cólon)'
      ],
      pkPdIndex: 'AUC24/MIC ≥ 400-600. Tempo-dependente. Alvo de vale sérico (trough): 15-20 mcg/mL.',
      clinicalPearls: [
        'Infusão lenta obrigatória: Infundir sempre em pelo menos 60 a 120 minutos (≤ 10 mg/min ou ≤ 1 g/hora) para prevenir a Síndrome do Homem Vermelho (reação anafilactoide histamínica por degranulação de mastócitos).',
        'Nefrotoxicidade sinérgica: O risco de Injúria Renal Aguda duplica quando associada a Piperacilina-Tazobactam (Tazocin) ou Aminoglicosídeos (Amicacina/Gentamicina). Se possível, preferir Cefepime + Vancomicina em infecções graves.',
        'Dose de Ataque Obrigatória: Em sepse e choque séptico, calcular dose de ataque inicial de 25-30 mg/kg de peso real (máx. 2 g) para atingir rápido o alvo farmacodinâmico.'
      ]
    },
    comorbidities: {
      renal: 'Ajuste estrito mandatório por clearance de creatinina (ClCr)! 80-90% é eliminada inalterada pelos rins. Em ClCr < 50 mL/min espaçar o intervalo para 24h ou 48h guiado por vancocinemia sérica (coletar 30 min antes da próxima dose).',
      hepatic: 'Sem necessidade de ajuste de dose na disfunção hepática pura isolada.',
      cardiac: 'Infusão rápida pode precipitar hipotensão arterial sistêmica profunda, choque vasodilatador histamínico e parada cardíaca.',
      elderly: 'Monitorar clearance calculado e hidratação; alto risco de nefrotoxicidade e ototoxicidade (zumbido, perda auditiva coclear irreversível de altas frequências).',
      pregnancy: 'CATEGORIA C. Atravessa a placenta; monitorar rigorosamente níveis séricos para evitar ototoxicidade e nefrotoxicidade no feto.'
    },
    toxicity: {
      signsSymptoms: [
        'Síndrome do Homem Vermelho (Red Man Syndrome): prurido súbito, eritema confluente na face, pescoço e tórax superior, calafrios, taquicardia e hipotensão durante ou logo após a infusão rápida',
        'Nefrotoxicidade: elevação de creatinina sérica, proteinúria, oligúria por necrose tubular aguda (NTA) ou nefrite intersticial aguda',
        'Ototoxicidade: zumbido contínuo, vertigem, perda auditiva neurossensorial de altas frequências',
        'Tromboflebite química em veias periféricas (usar acesso venoso central se possível)',
        'Neutropenia reversível e trombocitopenia imune em tratamentos prolongados (> 14 dias)'
      ],
      antidote: 'Para Síndrome do Homem Vermelho: Interromper a infusão imediatamente + Anti-histamínicos (Difenidramina/Prometazina EV) + Corticoide e ressuscitação volêmica.',
      antidoteDose: 'Difenidramina 50 mg EV ou Prometazina 25-50 mg IM/EV + SF 0,9% 500-1000 mL. Reiniciar em taxa lenta (mínimo de 2 horas de infusão) após resolução dos sintomas.',
      emergencyConduct: [
        'Se eritema e hipotensão durante a infusão: interromper a bomba de infusão imediatamente',
        'Diferenciar Síndrome do Homem Vermelho (anafilactoide, mediada por histamina não-IgE) de Anafilaxia verdadeira com broncoespasmo e estridor',
        'Administrar anti-histamínico H1 EV e expansão volêmica se PA sistólica < 90 mmHg',
        'Para nefrotoxicidade aguda: suspender a vancomicina ou espaçar a dose, hidratar vigorosamente com cristaloides e dosar vancocinemia sérica de urgência',
        'Se vancocinemia tóxica (> 30-40 mcg/mL): descontinuar e aguardar clearance decair'
      ],
      dialyzable: false,
      monitoringParams: ['Vancocinemia sérica (coleta de vale 30 min antes da 4ª dose; alvo 15-20 mcg/mL)', 'Creatinina sérica e Ureia diárias', 'Débito urinário horário', 'Audiometria se uso > 14 dias']
    },
    warningAlert: 'NUNCA administrar em bolo ou infusão rápida (< 60 min) pelo risco iminente de colapso circulatório por Síndrome do Homem Vermelho.'
  },
  {
    id: 'ceftriaxona',
    name: 'Ceftriaxona Dissódica',
    brandNames: ['Rocefin', 'Triaxin', 'Amplopec', 'Cefradrox'],
    classCategory: 'Cefalosporina de 3ª Geração Parenteral (Betalactâmico Bactericida)',
    system: 'infecciosas',
    systemLabel: 'Infectologia & Emergência Hospitalar',
    commonDose: 'Adultos: 1g a 2g EV ou IM a cada 24 horas (dose única diária). Na Meningite Bacteriana e Neuroinfecções: 2g EV a cada 12 horas (total 4g/dia). Na Gonorreia não complicada: 500 mg IM dose única.',
    indications: [
      'Pneumonia Adquirida na Comunidade (PAC) grave e moderada internada (associada a Azitromicina para cobrir atípicos)',
      'Meningite Bacteriana aguda comunitária em adultos e pediatria (Neisseria meningitidis, Streptococcus pneumoniae e Haemophilus influenzae)',
      'Infecções do trato urinário complicadas e Pielonefrite aguda hospitalar',
      'Infecções intra-abdominais e peritonite bacteriana espontânea (PBE na cirrose hepática), associada ao Metronidazol se cirúrgica',
      'Infecções Sexualmente Transmissíveis (IST): uretrite e cervicite por Neisseria gonorrhoeae e Doença Inflamatória Pélvica (DIP)',
      'Febre Tifoide (Salmonella typhi) e bacteremias por enterobactérias comunitárias'
    ],
    mechanismOfAction: 'Inibe a síntese da parede celular bacteriana ligando-se covalentemente às Proteínas Ligadoras de Penicilina (PBPs 1a, 1b, 2 e 3), impedindo a reação de transpeptidação final da síntese de peptideoglicano. Provoca lise celular bacteriana tempo-dependente.',
    antibioticSpectrum: {
      gramPositive: [
        'Streptococcus pneumoniae (Pneumococo - excelente sensibilidade e penetração liquórica sob inflamação)',
        'Streptococcus pyogenes (Grupo A), Streptococcus agalactiae (Grupo B), Streptococcus viridans',
        'Staphylococcus aureus MSSA (sensível à oxacilina - cobertura razoável, porém inferior a Cefazolina/Oxacilina)',
        'NÃO cobre MRSA nem Enterococcus!'
      ],
      gramNegative: [
        'Neisseria meningitidis (Meningococo - potente atividade bactericida no líquor)',
        'Neisseria gonorrhoeae (Gonococo - primeira linha mundial)',
        'Haemophilus influenzae e Moraxella catarrhalis (produtores de betalactamase)',
        'Enterobactérias comunitárias: Escherichia coli, Klebsiella pneumoniae, Proteus mirabilis, Salmonella spp., Shigella spp., Morganella morganii',
        'NÃO COBRE Pseudomonas aeruginosa nem Acinetobacter baumannii!'
      ],
      anaerobes: [
        'Cobertura muito fraca / clinicamente insignificante. NÃO cobre Bacteroides fragilis (em infecções intra-abdominais e pélvicas a associação com Metronidazol é mandatória).'
      ],
      atypicals: [
        'Zero cobertura para germes atípicos / intracelulares (Mycoplasma pneumoniae, Chlamydophila pneumoniae, Legionella pneumophila)'
      ],
      criticalGaps: [
        'Mnemônico clássico LAME: Listeria monocytogenes, Atípicos, MRSA, Enterococcus spp.',
        'Pseudomonas aeruginosa (não tem afinidade com PBPs de Pseudomonas; exige Ceftazidima, Cefepime ou Piperacilina-Tazobactam)',
        'Enterobactérias produtoras de Betalactamase de Espectro Estendido (ESBL) ou AmpC induzível (exigem Carbapenêmicos)',
        'Bacteroides fragilis e anaeróbios estritos'
      ],
      pkPdIndex: 'Tempo acima da Concentração Inibitória Mínima (%T > MIC ≥ 50-70% do intervalo). Ação bactericida tempo-dependente.',
      clinicalPearls: [
        'Vantagem Farmacocinética Única: Eliminação dupla (50% renal e 50% biliar). NÃO exige ajuste posológico em pacientes com DRC isolada ou cirrose isolada!',
        'Meia-vida biológica longa (~8 horas) que permite comodidade posológica de aplicação 1x ao dia (2g 24/24h) na maioria dos quadros graves, facilitando terapia ambulatorial (OPAT).',
        'CONTRAINDICAÇÃO FATAL EM NEONATOS: Jamais infundir concomitantemente com soluções contendo CÁLCIO (Ringer Lactato, gluconato de cálcio, nutrição parenteral) pelo risco de precipitação microcristalina letal nos pulmões e rins de recém-nascidos.'
      ]
    },
    comorbidities: {
      renal: 'Sem necessidade de ajuste de dose na insuficiência renal crônica isolada (excreção biliar compensatória). Apenas se houver insuficiência renal E hepática graves concomitantes, limitar a dose a 2g/dia.',
      hepatic: 'Pode precipitar pseudolitíase biliar ("lama biliar" reversível por complexo cálcio-ceftriaxona insolúvel na vesícula biliar) em tratamentos prolongados (> 14 dias).',
      cardiac: 'Geralmente segura do ponto de vista cardiovascular. Formulação parenteral contém cerca de 3,6 mEq de sódio por grama (cuidado em IC descompensada com restrição de sódio severa).',
      elderly: 'Excelente perfil de segurança em idosos e pacientes frágeis por não exigir cálculo de clearance renal frequente.',
      pregnancy: 'CATEGORIA B. Segura na gestação e amamentação. Padrão para pielonefrite em gestantes.'
    },
    toxicity: {
      signsSymptoms: [
        'Pseudolitíase biliar ("lama biliar"): dor em hipocôndrio direito, náuseas e elevação de fosfatase alcalina por precipitação de sais de ceftriaxona na vesícula biliar (reversível após suspensão)',
        'Diarreia associada a antibióticos e Colite Pseudomembranosa por supercrescimento de Clostridioides difficile',
        'Reações alérgicas cutâneas (rash maculopapular, urticária, prurido)',
        'Encefalopatia e mioclonias em pacientes renais em megadoses',
        'Kernicterus em neonatos prematuros por deslocamento da bilirrubina ligada à albumina'
      ],
      antidote: 'Sem antídoto químico específico. Suspender o fármaco e manejo de suporte sintomático.',
      antidoteDose: 'Para choque anafilático: Epinefrina 0,5 mg IM no vasto lateral + Hidrocortisona 200 mg EV + Difenidramina 50 mg EV. Para colite por C. difficile: Vancomicina 125 mg VO 6/6h.',
      emergencyConduct: [
        'Se reação anafilática aguda: interromper a infusão imediatamente e aplicar Epinefrina IM',
        'Se diarreia aquosa profusa pós-tratamento: pesquisar toxina A/B de Clostridioides difficile nas fezes e iniciar Vancomicina oral',
        'Se cólica biliar durante o tratamento: realizar ultrassom de abdome superior (lama biliar desaparece espontaneamente semanas após cessar a droga)',
        'Nunca misturar com soluções de cálcio na mesma via'
      ],
      dialyzable: false,
      monitoringParams: ['Hemograma completo e plaquetas', 'Ultrassonografia de vesícula se dor abdominal em uso prolongado', 'Pesquisa de sangue e toxina de C. difficile se diarreia']
    },
    warningAlert: 'Contraindicado em neonatos com hiperbilirrubinemia (risco de encefalopatia bilirrubínica) e incompatibilidade absoluta com infusões contendo Cálcio.'
  },
  {
    id: 'cefazolina',
    name: 'Cefazolina Sódica',
    brandNames: ['Kefazol', 'Fazolina', 'Cefamezin'],
    classCategory: 'Cefalosporina de 1ª Geração Parenteral (Anti-Estafilocócica Padrão-Ouro)',
    system: 'infecciosas',
    systemLabel: 'Infectologia, Cirurgia & Ortopedia',
    commonDose: 'Profilaxia Cirúrgica: 2g EV (3g se peso > 120 kg) nos 30 a 60 minutos antes da incisão cirúrgica, repicando a cada 4 horas intraoperatórias. Tratamento de Infecções por MSSA: 1g a 2g EV a cada 8 horas.',
    indications: [
      'Profilaxia antibiótica cirúrgica pré-operatória (padrão-ouro mundial em cirurgias limpas e potencialmente contaminadas: ortopédicas, cardíacas, vasculares, gastrointestinais e ginecológicas)',
      'Infecções de pele e partes moles moderadas a graves (celulite não purulenta, erisipela bolhosa, fasciíte estreptocócica)',
      'Bacteremia e Endocardite infecciosa por Staphylococcus aureus sensível à meticilina (MSSA), sendo tão eficaz e muito melhor tolerada que a Oxacilina',
      'Infecções osteoarticulares por MSSA (osteomielite aguda, artrite séptica) e infecções de sítio cirúrgico'
    ],
    mechanismOfAction: 'Inibe a síntese de peptideoglicano da parede celular bacteriana por ligação às PBPs 1 e 3. Exerce potente atividade bactericida tempo-dependente com excelente estabilidade contra as penicilinases estafilocócicas.',
    antibioticSpectrum: {
      gramPositive: [
        'Staphylococcus aureus sensível à meticilina (MSSA) - PADRÃO-OURO cirúrgico e de bacteremias! Menos nefrotóxica e menos flebítica que oxacilina.',
        'Streptococcus pyogenes (Estreptococo do Grupo A - erisipela e celulite)',
        'Streptococcus agalactiae (Grupo B - profilaxia de sepse neonatal periparto em alérgicas à penicilina sem anafilaxia)',
        'Streptococcus pneumoniae (cepas sensíveis a betalactâmicos)'
      ],
      gramNegative: [
        'Espectro restrito comunitário (grupo PEK):',
        'Proteus mirabilis',
        'Escherichia coli (cepas comunitárias sensíveis de ITU)',
        'Klebsiella pneumoniae sensível',
        'Sem cobertura para Haemophilus, Enterobacter, Serratia, Pseudomonas.'
      ],
      anaerobes: [
        'Praticamente nula para anaeróbios estritos da cavidade intra-abdominal ou ginecológica profunda.'
      ],
      atypicals: [
        'Sem cobertura para germes atípicos ou intracelulares'
      ],
      criticalGaps: [
        'Staphylococcus aureus resistente à meticilina (MRSA)',
        'Enterococos (Enterococcus faecalis e faecium são intrinsecamente resistentes a todas as cefalosporinas)',
        'Pseudomonas aeruginosa, Acinetobacter e bacilos Gram-negativos hospitalares',
        'Listeria monocytogenes'
      ],
      pkPdIndex: 'Tempo acima da MIC (%T > MIC ≥ 50-70% do intervalo). Tempo-dependente.',
      clinicalPearls: [
        'Padrão-ouro em Profilaxia Cirúrgica: Administrar 2g EV (3g se peso > 120 kg) nos 30 a 60 minutos antes da incisão da pele; repicar 1g a 2g a cada 4 horas de tempo operatório para manter níveis teciduais protetores.',
        'Substituta segura e preferível à Oxacilina em bacteremias por MSSA: Apresenta eficácia clínica idêntica com taxas significativamente menores de nefrite intersticial, flebite de veia periférica e hepatotoxicidade.',
        'Não ultrapassa a barreira hematoencefálica com eficácia: Contraindicada para tratamento de meningites ou abscessos do SNC.'
      ]
    },
    comorbidities: {
      renal: 'Eliminação predominantemente renal (80% inalterada). EXIGE AJUSTE em DRC: ClCr 35-54 mL/min (administrar dose habitual a cada 8-12h); ClCr 11-34 mL/min (dose reduzida em 50% a cada 12h); ClCr < 10 mL/min (dose reduzida em 50% a cada 18-24h).',
      hepatic: 'Segura em hepatopatas, sem metabolismo hepático significativo.',
      cardiac: 'Monitorar sobrecarga volêmica em cardiopatas graves em tratamentos prolongados.',
      elderly: 'Calcular clearance de creatinina antes de definir o intervalo posológico.',
      pregnancy: 'CATEGORIA B. Amplamente utilizada na gestação e cesariana programada com excelente histórico de segurança materno-fetal.'
    },
    toxicity: {
      signsSymptoms: [
        'Reações de hipersensibilidade cutânea: rash eritematoso, prurido, urticária (alergia cruzada com penicilinas em apenas 1-3%)',
        'Tromboflebite no sítio de infusão venosa periférica',
        'Nefrite Intersticial Aguda e elevação transitória de creatinina',
        'Encefalopatia e convulsões se administrada em megadoses na insuficiência renal sem ajuste posológico',
        'Diarreia leve ou colite por Clostridioides difficile'
      ],
      antidote: 'Sem antídoto químico específico. Suspender o antibiótico e instituir suporte clínico.',
      antidoteDose: 'Em anafilaxia: Epinefrina 0,5 mg IM + Anti-histamínicos e Corticoides EV.',
      emergencyConduct: [
        'Interromper a infusão se rash cutâneo progressivo ou broncoespasmo',
        'Se convulsões por acúmulo neurotóxico na DRC: Diazepam 10 mg EV lento + Hemodiálise para depuração rápida da cefalosporina',
        'Trocar sítio de punção se sinais inflamatórios de flebite'
      ],
      dialyzable: true,
      monitoringParams: ['Função renal (Creatinina e Ureia) para ajuste periódico', 'Hemograma', 'Inspeção do sítio de punção venosa']
    }
  },
  {
    id: 'cefalexina',
    name: 'Cefalexina Monoidratada',
    brandNames: ['Keflex', 'Cefagel', 'Cefalexin', 'Keforal'],
    classCategory: 'Cefalosporina de 1ª Geração Oral (Anti-Estafilocócica Ambulatorial)',
    system: 'infecciosas',
    systemLabel: 'Infectologia, Dermatologia & APS',
    commonDose: '500 mg via oral a cada 6 horas (ou 1g VO a cada 12 horas em infecções selecionadas). Dose máxima 4g/dia.',
    indications: [
      'Infecções de pele e partes moles comunitárias não purulentas (erisipela, celulite estreptocócica, impetigo, foliculite)',
      'Infecções do trato urinário não complicadas (cistite aguda em gestantes)',
      'Faringoamigdalite estreptocócica bacteriana em alérgicos não anafiláticos à penicilina',
      'Desospitalização e terapia sequencial oral de infecções osteoarticulares por MSSA pós-Cefazolina'
    ],
    mechanismOfAction: 'Inibe a síntese da parede celular bacteriana por ligação às PBPs. Absorção oral rápida e quase completa (biodisponibilidade de ~90-100%). Ação bactericida tempo-dependente.',
    antibioticSpectrum: {
      gramPositive: [
        'Staphylococcus aureus MSSA (sensível à oxacilina)',
        'Streptococcus pyogenes (Estreptococo do Grupo A - excelente erradicação em pele e orofaringe)',
        'Streptococcus agalactiae (Grupo B - ITU e profilaxia em gestantes)',
        'Streptococcus pneumoniae sensível'
      ],
      gramNegative: [
        'Escherichia coli comunitária sensível (cistite aguda não complicada)',
        'Proteus mirabilis comunitário sensível',
        'Klebsiella pneumoniae sensível'
      ],
      anaerobes: [
        'Sem cobertura para anaeróbios estritos'
      ],
      atypicals: [
        'Sem cobertura'
      ],
      criticalGaps: [
        'Staphylococcus aureus resistente à meticilina (MRSA)',
        'Enterococos, Pseudomonas aeruginosa e anaeróbios',
        'Bacilos Gram-negativos produtores de betalactamases hospitalares'
      ],
      pkPdIndex: '%T > MIC. Excelente absorção gástrica não afetada significativamente pela ingestão de alimentos.',
      clinicalPearls: [
        'Primeira linha para desospitalização precoce (transição EV para VO) após melhora clínica de celulite tratada inicialmente com Cefazolina.',
        'Antimicrobiano de eleição para bacteriúria assintomática e cistite no pré-natal (Categoria B da FDA com perfil de segurança materno-fetal consolidado há décadas).'
      ]
    },
    comorbidities: {
      renal: 'Excreção renal tubular e glomerular inalterada. Em ClCr < 50 mL/min espaçar dose para 500 mg a cada 8h ou 12h.',
      hepatic: 'Sem necessidade de ajuste na disfunção hepática.',
      cardiac: 'Segura do ponto de vista cardiovascular.',
      elderly: 'Boa tolerabilidade gastrointestinal; orientar ingerir com água para evitar desconforto esofágico.',
      pregnancy: 'CATEGORIA B. Antibiótico clássico e seguro durante todos os trimestres gestacionais.'
    },
    toxicity: {
      signsSymptoms: [
        'Náuseas, dispepsia, epigastralgia e vômitos leves',
        'Diarreia e candidíase vaginal secundária por alteração da flora fisiológica',
        'Exantema alérgico maculopapular e urticária',
        'Nefrite intersticial aguda rara'
      ],
      antidote: 'Sem antídoto específico. Suspender medicação e suporte sintomático.',
      antidoteDose: 'Suporte clínico e anti-histamínicos se rash alérgico leve.',
      emergencyConduct: [
        'Suspender o medicamento se surgimento de lesões bolhosas ou urticária',
        'Tomar junto às refeições se intolerância gastrointestinal leve'
      ],
      dialyzable: true,
      monitoringParams: ['Função renal em tratamentos prolongados', 'Avaliação clínica de resolução infecciosa']
    }
  },
  {
    id: 'azitromicina',
    name: 'Azitromicina Di-hidratada',
    brandNames: ['Zitromax', 'Astro', 'Azitrolab', 'Clindal AZ'],
    classCategory: 'Macrolídeo Azalídeo (Inibidor da Subunidade Ribossômica 50S Bacteriana)',
    system: 'infecciosas',
    systemLabel: 'Infectologia, Pneumologia & IST',
    commonDose: 'Pneumonia Adquirida na Comunidade (PAC) / Exacerbação de DPOC: 500 mg VO ou EV 1x ao dia por 3 a 5 dias. Uretrite / Cervicite por Chlamydia: 1g VO em dose única. Profilaxia de MAC no HIV (CD4 < 50): 1200 mg VO 1x por semana.',
    indications: [
      'Pneumonia Adquirida na Comunidade (PAC): cobertura obrigatória de patógenos atípicos (Mycoplasma, Chlamydia, Legionella) em monoterapia ambulatorial leve ou combinada a Betalactâmico (Ceftriaxona) em pacientes internados',
      'Exacerbações infecciosas da Doença Pulmonar Obstrutiva Crônica (DPOC) e bronquiectasias',
      'Infecções Sexualmente Transmissíveis (IST): Uretrite não gonocócica e cervicite por Chlamydia trachomatis (dose única de 1g)',
      'Tratamento e quimioprofilaxia de contactantes da Coqueluche (Bordetella pertussis - droga de primeira linha)',
      'Gastroenterite bacteriana do viajante por Campylobacter jejuni, Shigella e Salmonella multirresistente',
      'Profilaxia primária da infecção disseminada pelo Complexo Mycobacterium avium (MAC) em imunodeprimidos com HIV e CD4 < 50 céls/µL'
    ],
    mechanismOfAction: 'Liga-se reversivelmente à subunidade ribossômica 50S bacteriana (especificamente ao RNA ribossômico 23S), inibindo a transpeptidação e bloqueando a translocação do RNA transportador nascente, estancando a síntese de proteínas bacterianas. Exerce atividade bacteriostática com acúmulo intracelular maciço em fagócitos e tecidos.',
    antibioticSpectrum: {
      gramPositive: [
        'Streptococcus pneumoniae (Pneumococo - agente clássico da PAC comunitária; atenção a taxas crescentes de resistência ermB/mefA)',
        'Streptococcus pyogenes (Grupo A - alternativa para faringite em alérgicos à penicilina)',
        'Staphylococcus aureus MSSA (sensibilidade intermediária a baixa; não indicada para estafilococcias puras)'
      ],
      gramNegative: [
        'Haemophilus influenzae e Moraxella catarrhalis (patógenos respiratórios chaves na DPOC)',
        'Bordetella pertussis (agente etiológico da Coqueluche - droga de escolha em todas as faixas etárias)',
        'Campylobacter jejuni (gastroenterite bacteriana invasiva)',
        'Shigella spp. e Salmonella spp. resistentes a quinolonas',
        'Neisseria gonorrhoeae (atividade coadjuvante; usada em associação para retardar resistência)'
      ],
      anaerobes: [
        'Fraca a nula cobertura para anaeróbios entéricos (não cobre Bacteroides fragilis).'
      ],
      atypicals: [
        'PATÓGENOS ATÍPICOS INTRACELULARES (Grande Ponto Forte Clínico):',
        'Mycoplasma pneumoniae (causa clássica de pneumonia atípica em jovens com tosse arrastada e infiltrado intersticial)',
        'Chlamydophila pneumoniae e Chlamydia trachomatis (PAC atípica e uretrite/cervicite)',
        'Legionella pneumophila (Pneumonia dos Legionários grave com hiponatremia e diarreia - macrolídeo é mandatória)',
        'Complexo Mycobacterium avium (MAC no HIV avançado)'
      ],
      criticalGaps: [
        'Pseudomonas aeruginosa e Acinetobacter baumannii',
        'Enterobactérias produtoras de ESBL (Klebsiella, E. coli multirresistentes)',
        'MRSA e Enterococcus faecium'
      ],
      pkPdIndex: 'AUC24/MIC. Notável farmacocinética: concentração tecidual e celular (nos macrófagos alveolares e leucócitos) até 50 a 100 vezes superior aos níveis séricos. Meia-vida prolongada de 68 horas.',
      clinicalPearls: [
        'Comodidade Posológica Única: O regime de 500 mg 1x ao dia por 3 a 5 dias possui eficácia clínica equivalente a 7 a 10 dias de tratamentos convencionais devido à liberação tecidual prolongada.',
        'Ação Anti-inflamatória & Imunomoduladora: Reduz a produção de interleucina-8 (IL-8) e a quimiotaxia neutrofílica nas vias aéreas. Prescrita em uso profilático crônico (500 mg 3x/semana) na DPOC grave e bronquiectasias para reduzir exacerbações anuais.',
        'ALERTA CARDIOVASCULAR (Intervalo QTc): Pode provocar prolongamento do intervalo QTc e deflagrar arritmias ventriculares potencialmente letais (Torsades de Pointes). Evitar associar com outros fármacos pró-arritmogênicos (Amiodarona, Quetiapina, Ondansetrona, Citalopram) ou em pacientes com hipocalemia/hipomagnesemia.'
      ]
    },
    comorbidities: {
      renal: 'Apenas < 10% é excretada pelos rins; a depuração primária é hepática e biliar. Não requer ajuste posológico na insuficiência renal crônica leve a moderada (usar com cautela em ClCr < 10 mL/min).',
      hepatic: 'Metabolismo e excreção predominantemente hepatobiliar. Usar com cautela em cirrose hepática descompensada; pode causar colestase e elevação transitória de transaminases.',
      cardiac: 'Risco de prolongamento do intervalo QTc e morte súbita cardíaca em cardiopatas portadores de síndrome do QT longo congênito ou bradiarritmias graves.',
      elderly: 'Especial atenção ao risco de arritmias por interação medicamentosa em idosos polimedicados.',
      pregnancy: 'CATEGORIA B. Segura na gestação (droga de escolha para Chlamydia na gravidez).'
    },
    toxicity: {
      signsSymptoms: [
        'Gastrointestinais: náuseas, vômitos, cólicas abdominais e diarreia (atua como agonista de receptores de motilina no trato digestivo)',
        'Cardíacos: palpitações, prolongamento de intervalo QTc no eletrocardiograma e arritmias ventriculares (Torsades de Pointes)',
        'Hepáticos: icterícia colestática, prurido e hepatite medicamentosa aguda rara',
        'Auditivos: zumbido e perda auditiva reversível em doses muito elevadas ou tratamentos crônicos',
        'Reações cutâneas graves raras (Síndrome de Stevens-Johnson / DRESS)'
      ],
      antidote: 'Para Torsades de Pointes por QTc longo: Sulfato de Magnésio 2 g EV em 2 minutos. Sem antídoto químico específico.',
      antidoteDose: 'Sulfato de Magnésio 2g EV diluído em 100 mL de SG 5% em 2 a 5 minutos, podendo repetir após 10-15 minutos.',
      emergencyConduct: [
        'Se arritmia ventricular ou taquicardia polimórfica: suspender imediatamente a azitromicina e infundir Sulfato de Magnésio EV',
        'Realizar ECG de 12 derivações para mensurar QTc corrigido (se QTc > 500 ms, descontinuar a droga)',
        'Corrigir imediatamente distúrbios eletrolíticos predisponentes (repor K+ e Mg++)',
        'Tomar com alimentos para minimizar cólicas gastrointestinais'
      ],
      dialyzable: false,
      monitoringParams: ['Eletrocardiograma (medir QTc se cardiopata ou polifarmácia)', 'Eletrólitos séricos (Potássio e Magnésio)', 'Enzimas hepáticas (TGO, TGP, FA e Bilirrubinas) se uso prolongado']
    },
    warningAlert: 'Risco de arritmia fatal por Torsades de Pointes. Evitar associação com Amiodarona, Quetiapina e outros depressores de repolarização ventricular.'
  }
];

// ==========================================================================
// MATRIZ DE INTERAÇÕES MEDICAMENTOSAS GRAVES E MODERADAS
// ==========================================================================
export const DRUG_INTERACTIONS_DATABASE: DrugInteraction[] = [
  // --- TRÍPLICE DESGRAÇA RENAL ---
  {
    drugAId: 'enalapril',
    drugBId: 'ibuprofeno',
    severity: 'contraindicated',
    severityLabel: 'Grave / Evitar Associação',
    mechanism: 'O AINE bloqueia a vasodilatação da arteríola aferente por inibir prostaglandinas, enquanto o IECA vasodilata a arteríola eferente. Resultado: queda crítica e abrupta da pressão de filtração glomerular intraglomerular.',
    clinicalRisk: 'Insuficiência Renal Aguda hemodinâmica grave, necrose tubular e hipercalemia ameaçadora à vida.',
    management: 'Evitar o uso de AINEs em pacientes sob uso de IECA/BRA. Para analgesia, prescrever Paracetamol ou Dipirona. Se o uso for inevitável, limitar a no máximo 48 horas monitorando creatinina e K+.'
  },
  {
    drugAId: 'espironolactona',
    drugBId: 'ibuprofeno',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Risco Renal',
    mechanism: 'O AINE bloqueia a síntese de prostaglandinas renais, reduzindo a excreção de potássio, que já está bloqueada pela espironolactona.',
    clinicalRisk: 'Hipercalemia grave refratária com risco de parada cardíaca em assistolia ou FV, além de retenção hidrossalina com descompensação de ICC.',
    management: 'Suspender o AINE. Monitorar potássio sérico e ECG de urgência se fraqueza ou palpitações.'
  },
  {
    drugAId: 'enalapril',
    drugBId: 'espironolactona',
    severity: 'moderate',
    severityLabel: 'Moderada / Exige Monitorização Estrita',
    mechanism: 'Duplo bloqueio do eixo renina-angiotensina-aldosterona (bloqueio da formação de angiotensina II + bloqueio do receptor de aldosterona).',
    clinicalRisk: 'Hipercalemia (> 5,5 mEq/L) e piora da função renal, embora a combinação seja benéfica e padrão na ICFER com fração de ejeção reduzida.',
    management: 'Monitorar K+ sérico e Creatinina aos 7 e 14 dias após iniciar ou titular a dose. Orientar o paciente a não consumir substitutos de sal ricos em cloreto de potássio.'
  },

  // --- ANTICOAGULAÇÃO & SANGRAMENTO ---
  {
    drugAId: 'varfarina',
    drugBId: 'ibuprofeno',
    severity: 'contraindicated',
    severityLabel: 'Contraindicada / Risco Hemorrágico Fatal',
    mechanism: 'O AINE causa toxicidade gástrica direta com erosão mucosal e inibe a agregação plaquetária via COX-1, enquanto a varfarina inibe os fatores dependentes de vitamina K.',
    clinicalRisk: 'Hemorragia digestiva alta maciça e hemoperitônio. Aumento drástico do risco de sangramento fatal.',
    management: 'Contraindicação formal. Substituir o AINE por Paracetamol (até 2 g/dia) ou Dipirona para alívio de dor em pacientes anticoagulados.'
  },
  {
    drugAId: 'varfarina',
    drugBId: 'amiodarona',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Titulação Obrigatória',
    mechanism: 'A amiodarona inibe fortemente o citocromo CYP2C9, via primária de metabolização da S-varfarina (isômero mais potente).',
    clinicalRisk: 'Aumento acentuado e imprevisível do RNI (frequentemente > 5 a 10) com risco iminente de hemorragia grave e AVC hemorrágico.',
    management: 'Ao introduzir Amiodarona, reduzir a dose da Varfarina preventiva em 30% a 50% e monitorar o RNI semanalmente até estabilização.'
  },
  {
    drugAId: 'clopidogrel',
    drugBId: 'varfarina',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Dupla Tromboprofilaxia',
    mechanism: 'Bloqueio conjunto da hemostasia primária (inibição irreversível do receptor P2Y12 de plaquetas) e secundária (cascata de coagulação da varfarina).',
    clinicalRisk: 'Aumento exponencial do risco de sangramento maior gastrointestinal e intracraniano.',
    management: 'Uso reservado a cenários específicos (ex: Stent coronário recente em paciente com Fibrilação Atrial). Manter pelo menor tempo possível, associar Inibidor de Bomba de Prótons gastroprotetor e manter RNI estritamente entre 2,0 e 2,5.'
  },
  {
    drugAId: 'amiodarona',
    drugBId: 'digoxina',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Reduzir Dose em 50%',
    mechanism: 'A amiodarona inibe a glicoproteína-P (P-gp) nos rins e intestino, diminuindo drasticamente a excreção renal e tubular da digoxina.',
    clinicalRisk: 'Dobramento da concentração sérica de digoxina com intoxicação digitálica grave: arritmias ventriculares fatais, bloqueios AV e náuseas/vômitos.',
    management: 'Reduzir obrigatoriamente a dose de Digoxina em 50% ao prescrever Amiodarona e dosar a digoxinemia em 7 a 14 dias.'
  },
  {
    drugAId: 'amiodarona',
    drugBId: 'metoprolol',
    severity: 'moderate',
    severityLabel: 'Moderada / Risco de Bloqueio AV',
    mechanism: 'Efeito cronotrópico e dromotrópico negativo aditivo no nó sinusal e no nó atrioventricular.',
    clinicalRisk: 'Bradicardia sinusal sintomática grave, BAV de 2º ou 3º grau e síncope.',
    management: 'Monitoração eletrocardiográfica periódica. Reduzir dose do betabloqueador se FC de repouso < 50 bpm ou intervalo PR > 240 ms.'
  },

  // --- DROGAS METABÓLICAS ---
  {
    drugAId: 'metformina',
    drugBId: 'dapagliflozina',
    severity: 'minor',
    severityLabel: 'Associação Recomendada / Sinergismo Seguro',
    mechanism: 'Mecanismos complementares: a metformina reduz a gliconeogênese hepática e a gliflozina promove glicosúria renal.',
    clinicalRisk: 'Risco muito baixo de hipoglicemia isolada. Atentar para hidratação e higiene íntima.',
    management: 'Combinação padrão-ouro no tratamento do DM2 com alto risco cardiovascular ou DRC.'
  },
  {
    drugAId: 'insulina-regular',
    drugBId: 'metoprolol',
    severity: 'moderate',
    severityLabel: 'Moderada / Alerta de Hipoglicemia Mascarada',
    mechanism: 'O betabloqueador atenua os sintomas adrenérgicos de alerta da hipoglicemia mediada por adrenalina (taquicardia, tremores e palpitações).',
    clinicalRisk: 'O paciente não percebe a descida glicêmica inicial, progredindo diretamente para neuroglicopenia grave (confusão, convulsão e coma). A sudorese fria é o único sintoma preservado.',
    management: 'Orientar o paciente diabético sobre a sudorese fria como sinal de alerta de hipoglicemia e reforçar a automonitorização com mapa de glicemia capilar.'
  },

  // --- SNC & TOXICOLOGIA ---
  {
    drugAId: 'diazepam',
    drugBId: 'morfina',
    severity: 'contraindicated',
    severityLabel: 'Grave / Depressão Respiratória Fatal',
    mechanism: 'Sinergismo farmacodinâmico depressor do sistema nervoso central e do centro respiratório bulbar.',
    clinicalRisk: 'Depressão respiratória profunda, apneia, hipoxemia grave, parada cardiorrespiratória e óbito por asfixia.',
    management: 'Evitar a coadministração ambulatorial. Se necessária em ambiente hospitalar/UTI, manter oximetria de pulso contínua, capnografia e Naloxona/Flumazenil de prontidão.'
  },
  {
    drugAId: 'litio',
    drugBId: 'ibuprofeno',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Intoxicação por Lítio',
    mechanism: 'O AINE inibe as prostaglandinas vasodilatadoras renais, reduzindo a taxa de filtração glomerular e aumentando a reabsorção tubular de lítio.',
    clinicalRisk: 'Aumento de 30% a 60% nos níveis séricos de lítio, provocando ataxia, tremores grosseiros, convulsões e coma tóxico.',
    management: 'Evitar AINEs em usuários de Lítio. Preferir Paracetamol ou Dipirona. Se AINE for estritamente necessário, monitorar litemia a cada 48h e reduzir a dose do lítio.'
  },
  {
    drugAId: 'litio',
    drugBId: 'enalapril',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Redução da Excreção de Lítio',
    mechanism: 'Os IECAs reduzem os níveis de angiotensina II e aldosterona, induzindo natriurese que compensatoriamente eleva a reabsorção de lítio no túbulo contorcido proximal.',
    clinicalRisk: 'Toxicidade crônica ou subaguda por acúmulo de lítio.',
    management: 'Reduzir a dose de Lítio e monitorar a litemia semanalmente nas primeiras 4 semanas de introdução do IECA.'
  },
  {
    drugAId: 'quetiapina',
    drugBId: 'amiodarona',
    severity: 'contraindicated',
    severityLabel: 'Grave / Prolongamento Sinérgico do QTc',
    mechanism: 'Efeito aditivo de bloqueio dos canais de potássio IKr cardíacos, prolongando significativamente a repolarização ventricular.',
    clinicalRisk: 'Prolongamento crítico do intervalo QTc (> 500 ms) com risco iminente de Torsades de Pointes, fibrilação ventricular e morte súbita.',
    management: 'Evitar a coadministração. Se indispensável, realizar ECG seriado e manter níveis séricos de Potássio (> 4,0 mEq/L) e Magnésio (> 2,0 mg/dL) rigorosamente normais.'
  },
  {
    drugAId: 'quetiapina',
    drugBId: 'diazepam',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Depressão Acentuada do SNC',
    mechanism: 'Sinergismo farmacodinâmico depressor central entre a potenciação GABAérgica do benzodiazepínico e o bloqueio H1 histaminérgico/alfa-1 da quetiapina.',
    clinicalRisk: 'Sedação profunda, hipotensão ortostática grave, ataxia severa com quedas em idosos e risco de depressão respiratória.',
    management: 'Reavaliar necessidade da associação. Reduzir a dose inicial de ambos os fármacos e orientar o paciente a não dirigir veículos ou operar máquinas.'
  },

  // --- ANTIMICROBIANOS ---
  {
    drugAId: 'vancomicina',
    drugBId: 'furosemida',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Risco Nefro e Ototóxico',
    mechanism: 'Potencialização sinérgica de toxicidade sobre a estria vascular coclear e necrose tubular renal.',
    clinicalRisk: 'Injúria Renal Aguda grave e perda auditiva neurossensorial irreversível de altas frequências.',
    management: 'Monitorar rigorosamente a diurese horária, creatinina diária e vancocinemia sérica (alvo 15-20 mcg/mL). Se possível, trocar o diurético de alça.'
  },
  {
    drugAId: 'ceftriaxona',
    drugBId: 'varfarina',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Risco Hemorrágico Severo',
    mechanism: 'Erradicação da microbiota intestinal sintetizadora de Vitamina K e inibição competitiva do metabolismo da varfarina.',
    clinicalRisk: 'Elevação descontrolada e imprevisível do RNI (> 5,0 a 10,0) com risco de sangramento intracraniano e digestivo fatal.',
    management: 'Checar RNI no 3º dia de introdução da Ceftriaxona e reduzir a dose de manutenção da Varfarina profilaticamente em 20% a 30%.'
  },
  {
    drugAId: 'azitromicina',
    drugBId: 'amiodarona',
    severity: 'contraindicated',
    severityLabel: 'Grave / Torsades de Pointes Fatal',
    mechanism: 'Bloqueio sinérgico massivo dos canais de potássio IKr cardíacos, prolongando a fase 3 do potencial de ação.',
    clinicalRisk: 'Alargamento extremo do intervalo QTc (> 500 ms) e disparo de Torsades de Pointes com degeneração para Fibrilação Ventricular e Parada Cardíaca.',
    management: 'Contraindicada a associação. Para tratar PAC em usuários de amiodarona, preferir Doxiciclina ou Betalactâmico isolado, ou monitorar em UTI com ECG contínuo.'
  },
  {
    drugAId: 'azitromicina',
    drugBId: 'quetiapina',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Prolongamento do Intervalo QTc',
    mechanism: 'Efeito aditivo na repolarização ventricular entre o macrolídeo e o antipsicótico atípico.',
    clinicalRisk: 'Arritmias ventriculares polimórficas e síncope arrítmica.',
    management: 'Realizar ECG basal antes de iniciar o macrolídeo. Manter potássio e magnésio séricos rigorosamente normais.'
  },
  {
    drugAId: 'azitromicina',
    drugBId: 'varfarina',
    severity: 'moderate',
    severityLabel: 'Moderada / Potencialização da Anticoagulação',
    mechanism: 'Alteração da flora bacteriana intestinal e inibição discreta da depuração do enantiômero R-varfarina.',
    clinicalRisk: 'Aumento moderado do RNI e risco de hematomas e gengivorragia.',
    management: 'Monitorar RNI 48 a 72 horas após o início da Azitromicina.'
  },

  // --- ENDOCRINOLOGIA: PROPILTIOURACIL (PTU) ---
  {
    drugAId: 'propiltiouracil',
    drugBId: 'varfarina',
    severity: 'major',
    severityLabel: 'Alta Gravidade / Alteração Imprevisível do RNI',
    mechanism: 'O PTU inibe a síntese de protrombina dependente de vitamina K. Além disso, a transição do estado tireotóxico para o eutireoidiano reduz a velocidade de degradação dos fatores de coagulação.',
    clinicalRisk: 'Instabilidade crítica do RNI com risco aumentado de hemorragia no início ou sangramento se a dose de varfarina não for reajustada com a melhora da tireotoxicose.',
    management: 'Monitorar o RNI com frequência aumentada (semanalmente) durante o início do PTU e a cada mudança na função tireoidiana, ajustando a dose de Varfarina.'
  },
  {
    drugAId: 'propiltiouracil',
    drugBId: 'metoprolol',
    severity: 'moderate',
    severityLabel: 'Moderada / Aumento dos Níveis do Betabloqueador',
    mechanism: 'No hipertireoidismo, a depuração hepática e renal do metoprolol é acelerada. Conforme o PTU normaliza os hormônios tireoidianos, o clearance do betabloqueador diminui.',
    clinicalRisk: 'Acúmulo de Metoprolol com bradicardia acentuada, hipotensão ortostática e bloqueio atrioventricular se a dose original não for reduzida.',
    management: 'Reduzir gradualmente a dose do betabloqueador à medida que o paciente atinge o eutireoidismo laboratorial.'
  },

  // --- CARDIOVASCULAR: HIDRALAZINA ---
  {
    drugAId: 'hidralazina',
    drugBId: 'metoprolol',
    severity: 'major',
    severityLabel: 'Sinergismo Farmacodinâmico Benéfico & Aumento Mútuo de Concentração',
    mechanism: 'O betabloqueador suprime a taquicardia reflexa e o aumento de renina deflagrados pela hidralazina (associação clínica mandante). Por outro lado, a hidralazina inibe a extração hepática pré-sistêmica do metoprolol, elevando seus níveis plasmáticos.',
    clinicalRisk: 'Embora a associação seja clinicamente indicada e protetora, pode ocorrer hipotensão ortostática acentuada e bradicardia excessiva no ajuste inicial.',
    management: 'Titular ambos os fármacos gradualmente e orientar o paciente sobre sintomas posturais.'
  },
  {
    drugAId: 'hidralazina',
    drugBId: 'furosemida',
    severity: 'moderate',
    severityLabel: 'Interação Protetora / Controle de Retenção Hidrossalina',
    mechanism: 'A vasodilatação arteriolar potente da hidralazina ativa o sistema renina-angiotensina-aldosterona (SRAA), causando retenção de sódio e água. A furosemida bloqueia essa retenção volêmica reflexa.',
    clinicalRisk: 'Hipotensão se hipovolemia prévia; sem diurético, há risco de edema e perda da eficácia anti-hipertensiva da hidralazina.',
    management: 'Monitorar peso, edema de membros inferiores e pressão arterial.'
  }
];

// ==========================================================================
// BANCO DE DADOS DE ANTÍDOTOS PARA EMERGÊNCIAS MÉDICAS
// ==========================================================================
export const ANTIDOTES_DATABASE: AntidoteGuideItem[] = [
  {
    id: 'ant-naloxona',
    toxicAgent: 'Opioides (Morfina, Fentanil, Metadona, Tramadol, Oxicodona)',
    drugClass: 'Depressores do SNC / Analgésicos Narcóticos',
    antidoteName: 'Cloridrato de Naloxona (Narcan)',
    mechanism: 'Antagonista puro e competitivo dos receptores opioides mu, kappa e delta no SNC.',
    standardDose: '0,04 mg a 0,4 mg EV a cada 2 a 3 minutos até restabelecer a ventilação espontânea (> 10-12 irpm). Em parada cardíaca ou suspeita de overdose maciça por fentanil: 2 mg EV/IM/Intranasal.',
    administrationRoute: 'EV, IM, Subcutânea ou Intranasal',
    pediatricDose: '0,01 a 0,1 mg/kg EV (máximo 2 mg/dose).',
    keyPrecautions: [
      'A meia-vida da Naloxona (30-90 min) é muito menor que a da maioria dos opioides (risco de ressedação e nova apneia)',
      'Monitorar o paciente por no mínimo 4 a 6 horas após a última dose de naloxona',
      'Evitar doses excessivas em usuários crônicos para não precipitar síndrome de abstinência aguda violenta com edema pulmonar'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-flumazenil',
    toxicAgent: 'Benzodiazepínicos (Diazepam, Clonazepam, Midazolam, Alprazolam)',
    drugClass: 'Hipnóticos e Sedativos Moduladores GABA-A',
    antidoteName: 'Flumazenil (Lanexat)',
    mechanism: 'Antagonista competitivo específico do sítio de ligação benzodiazepínico no complexo receptor GABA-A.',
    standardDose: '0,2 mg EV administrado em 15 segundos. Se não houver despertar em 60 segundos, injetar 0,1 mg adicional a cada 1 minuto (dose habitual total de 0,3 a 1,0 mg; máximo 2 mg).',
    administrationRoute: 'Exclusivamente Intravenosa (EV)',
    pediatricDose: '0,01 mg/kg EV em 15 segundos (máximo 0,2 mg/dose).',
    keyPrecautions: [
      'CONTRAINDICADO em pacientes com histórico de epilepsia ou convulsões (pode deflagrar status epilepticus refratário)',
      'CONTRAINDICADO na coingestão de antidepressivos tricíclicos (risco de arritmias ventriculares e convulsões)',
      'Meia-vida curta (~60 min): monitorar retorno da sonolência'
    ],
    urgencyLevel: 'prioritario'
  },
  {
    id: 'ant-nac',
    toxicAgent: 'Paracetamol (Acetaminofeno)',
    drugClass: 'Analgésicos Não-Opioides',
    antidoteName: 'N-Acetilcisteína (NAC / Fluimucil)',
    mechanism: 'Restaura os estoques hepáticos de glutationa e conjuga-se diretamente ao metabólito reativo hepatotóxico NAPQI, neutralizando-o.',
    standardDose: 'Protocolo EV de 21 horas: Ataque de 150 mg/kg em 200 mL SG 5% em 60 min; 2ª bolsa: 50 mg/kg em 500 mL SG 5% em 4h; 3ª bolsa: 100 mg/kg em 1000 mL SG 5% em 16h.',
    administrationRoute: 'Intravenosa (preferencial no Brasil) ou Oral',
    keyPrecautions: [
      'Maior eficácia quando iniciado nas primeiras 8 horas pós-ingestão, mas benéfico mesmo após 24 horas',
      'Reações anafilactoides (rubor, rash, broncoespasmo) podem ocorrer na infusão rápida do bolus inicial (tratar com anti-histamínicos)',
      'Continuar a infusão se transaminases continuarem subindo ou paracetamol ainda detectável'
    ],
    urgencyLevel: 'prioritario'
  },
  {
    id: 'ant-vitamina-k',
    toxicAgent: 'Varfarina e Raticidas Cumarínicos (Supervarfarinas)',
    drugClass: 'Anticoagulantes Orais Cumarínicos',
    antidoteName: 'Fitomenadiona (Vitamina K1) + Complexo Protrombínico (CCP)',
    mechanism: 'Fornece substrato direto para a síntese hepática dos fatores II, VII, IX e X de coagulação.',
    standardDose: 'Sangramento grave: Fitomenadiona 10 mg EV diluída em 100 mL de SF 0,9% em 30 min + Complexo Protrombínico 4F 25 a 50 UI/kg EV imediato.',
    administrationRoute: 'EV lento ou Oral (EV rápido pode causar anafilaxia)',
    keyPrecautions: [
      'Vitamina K1 demora de 6 a 24 horas para reverter o RNI; em sangramento ativo com risco de morte, o Complexo Protrombínico reverte em 10 minutos',
      'Evitar via intramuscular devido ao risco de grandes hematomas profundos em pacientes anticoagulados'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-protamina',
    toxicAgent: 'Heparina Não Fracionada (HNF) e Enoxaparina (HBPM)',
    drugClass: 'Anticoagulantes Parenterais Heparínicos',
    antidoteName: 'Sulfato de Protamina',
    mechanism: 'Proteína fortemente básica que se combina com a heparina (ácida), formando um sal estável sem atividade anticoagulante.',
    standardDose: '1 mg de protamina neutraliza aproximadamente 100 UI de heparina não fracionada infundida nas últimas 2 horas. Dose máxima: 50 mg.',
    administrationRoute: 'EV lento em no mínimo 10 minutos',
    keyPrecautions: [
      'Injeção rápida causa hipotensão grave, bradicardia súbita e broncoespasmo',
      'Reverte apenas parcialmente (cerca de 60%) a atividade anti-Xa das heparinas de baixo peso molecular (Enoxaparina)',
      'Risco de anafilaxia em pacientes alérgicos a peixe ou que usaram insulina NPH previamente'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-idarucizumabe',
    toxicAgent: 'Dabigatrana (Pradaxa)',
    drugClass: 'Inibidores Diretos da Trombina (DOAC)',
    antidoteName: 'Idarucizumabe (Praxbind)',
    mechanism: 'Fragmento de anticorpo monoclonal humanizado (Fab) que se liga à dabigatrana livre com afinidade 350 vezes superior à da trombina.',
    standardDose: '5 g EV administrado em dois frascos consecutivos de 2,5 g em infusão rápida ou bolus de 5 a 10 minutos cada.',
    administrationRoute: 'Intravenosa direta ou infusão rápida',
    keyPrecautions: [
      'Neutralização completa e imediata do efeito anticoagulante em minutos',
      'Não neutraliza outros anticoagulantes (como Rivaroxabana ou Apixabana)'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-digifab',
    toxicAgent: 'Digoxina e Digitoxina',
    drugClass: 'Glicosídeos Cardíacos Digitálicos',
    antidoteName: 'Anticorpos Antidigoxina Fragmentos Fab (DigiFab)',
    mechanism: 'Fragmentos de imunoglobulina que se ligam à digoxina livre intravascular, facilitando sua excreção renal.',
    standardDose: 'Se concentração conhecida: Frascos = (Nível de Digoxina ng/mL x Peso em kg) / 100. Se dose ingerida desconhecida em parada/choque: 10 a 20 frascos EV em 30 min.',
    administrationRoute: 'Intravenosa (diluída em SF 0,9%)',
    keyPrecautions: [
      'A digoxinemia pós-Fab dosará tanto o fármaco livre quanto o ligado ao anticorpo, falseando valores altos (não dosar pós-antídoto)',
      'Pode ocorrer hipocalemia de rebote após reversão da toxicidade digitálica'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-glucagon',
    toxicAgent: 'Betabloqueadores (Propranolol, Atenolol, Metoprolol, Carvedilol)',
    drugClass: 'Antagonistas Adrenérgicos Beta',
    antidoteName: 'Glucagon',
    mechanism: 'Estimula a adenilato ciclase miocárdica por uma via de receptores independente dos receptores beta, aumentando o AMPc intracelular e restaurando contratilidade e FC.',
    standardDose: 'Ataque: 3 a 10 mg EV lento em 2 minutos. Se houver resposta favorável em PA e FC, manter infusão contínua de 2 a 5 mg/hora.',
    administrationRoute: 'Intravenosa',
    keyPrecautions: [
      'Causa vômitos intensos: proteger via aérea precocemente para evitar broncoaspiração',
      'Associar Terapia Hiperinsulinêmica Euglicêmica (HIET) se choque persistente'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-gluconato-calcio',
    toxicAgent: 'Bloqueadores dos Canais de Cálcio (Verapamil, Diltiazem, Anlodipino) e Hipercalemia',
    drugClass: 'Anti-hipertensivos e Antiarrítmicos',
    antidoteName: 'Gluconato de Cálcio 10%',
    mechanism: 'Aumenta o gradiente transmembrana de cálcio, estabilizando a membrana dos miócitos e melhorando o inotropismo e a condução AV.',
    standardDose: '10 a 20 mL de Gluconato de Cálcio a 10% EV em 5 a 10 minutos (pode repetir a cada 10-15 minutos até 3 doses).',
    administrationRoute: 'Intravenosa (veia de bom calibre)',
    keyPrecautions: [
      'Preferir Gluconato em vez de Cloreto de Cálcio em veia periférica (menor risco de necrose tecidual se houver extravasamento)',
      'Monitorar ECG contínuo durante a infusão'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-atropina',
    toxicAgent: 'Organofosforados e Carbamatos (Chumbinho / Inseticidas)',
    drugClass: 'Inibidores da Acetilcolinesterase (Síndrome Colinérgica)',
    antidoteName: 'Sulfato de Atropina + Pralidoxima',
    mechanism: 'Antagonista muscarínico competitivo que bloqueia o excesso de acetilcolina nos receptores periféricos e centrais.',
    standardDose: 'Atropina 1 a 3 mg EV em bolus a cada 3 a 5 minutos, dobrando a dose se necessário até obter sinais de atropinização (secreções pulmonares secas).',
    administrationRoute: 'Intravenosa direta',
    keyPrecautions: [
      'O alvo terapêutico da Atropina é a SECURA DAS SECREÇÕES PULMONARES (ausência de estertores e broncorreia), e NÃO a midríase ou taquicardia isolada!',
      'Garantir oxigenação antes da atropinização para reduzir risco de fibrilação ventricular'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-corticoide-ptu',
    toxicAgent: 'Propiltiouracil (PTU) - Vasculite ANCA-positiva & Reações Imunomediadas Graves',
    drugClass: 'Tionamidas / Antitireoidianos (Toxicidade Autoimune & Hematológica)',
    antidoteName: 'Pulsoterapia com Corticoide (Metilprednisolona / Prednisona) + Filgrastim',
    mechanism: 'Corticoterapia em megadose suprime a produção de autoanticorpos p-ANCA (anti-mieloperoxidase / MPO), inibe a cascata inflamatória endotelial e estanca a necrose vascular nos órgãos vitais (rins/pulmão).',
    standardDose: 'Pulsoterapia: Metilprednisolona 500 a 1.000 mg EV/dia por 3 dias (em glomerulonefrite ou hemorragia alveolar), seguida de Prednisona oral 1 mg/kg/dia com desmame lento.',
    administrationRoute: 'Intravenosa (pulsoterapia) ou Oral',
    pediatricDose: 'Metilprednisolona 10 a 30 mg/kg/dia EV por 3 dias (máximo 1.000 mg/dia).',
    keyPrecautions: [
      'SUSPENSÃO IMEDIATA E DEFINITIVA DO PROPILTIOURACIL: É a medida mais crucial para interromper a produção de anticorpos ANCA; nunca mais reexpor o paciente!',
      'Pesquisar manifestações graves de alarme: manchas na pele (púrpura), dor articular severa, febre inexplicada, hematúria e tosse com sangue',
      'Avaliar suporte intensivo e plasmaférese se houver hemorragia alveolar difusa (síndrome pulmão-rim) com hipoxemia grave',
      'Se neutropenia profunda / agranulocitose (< 500 neutrófilos): associar Filgrastim (G-CSF) 300 mcg SC/dia e antibiótico empírico de amplo espectro imediato'
    ],
    urgencyLevel: 'imediato'
  },
  {
    id: 'ant-hidralazina-dile',
    toxicAgent: 'Hidralazina - Lúpus Induzido por Drogas (DILE) & Choque Vasodilatador Reflexo',
    drugClass: 'Vasodilatador Arteriolar Direto (Reação Autoimune & Toxicidade Hemodinâmica)',
    antidoteName: 'Suspensão da Droga + Corticoterapia (Prednisona) + Vasopressor Alfa-1 (Noradrenalina)',
    mechanism: 'A suspensão do fármaco extingue o estímulo antigênico causador dos anticorpos anti-histona. Corticosteroides suprimem a serosite lúpica (pleurite/pericardite) e artrite. Noradrenalina ou Fenilefrina restabelecem o tônus arteriolar no choque por sobredose.',
    standardDose: 'No Lúpus Induzido: Interrupção imediata da hidralazina; se serosite ou artrite grave, Prednisona 0,5 a 1 mg/kg/dia VO com desmame em poucas semanas. No choque: Noradrenalina 0,05-0,5 mcg/kg/min EV em infusão contínua. Para neuropatia: Piridoxina (Vit B6) 50-100 mg/dia VO.',
    administrationRoute: 'Oral (corticoides e piridoxina) ou Intravenosa (vasopressores em UTI)',
    pediatricDose: 'Prednisona 1 a 2 mg/kg/dia (máx 60 mg/dia). Noradrenalina 0,05 a 0,1 mcg/kg/min sob titulação hemodinâmica.',
    keyPrecautions: [
      'SUSPENSÃO IMEDIATA E DEFINITIVA: É a intervenção mandatória no Lúpus Induzido (DILE); a quase totalidade dos pacientes obtém remissão clínica completa sem imunossupressão crônica',
      'Pesquisar os anticorpos ANTI-HISTONA (> 95% de sensibilidade no DILE por hidralazina) e contrastar com anti-dsDNA (negativo no DILE)',
      'No choque hipotensivo por hidralazina, NUNCA usar agonistas beta puros (como isoproterenol), pois pioram drasticamente a taquicardia reflexa e a hipotensão',
      'Cuidado com taquicardia reflexa em coronariopatas: administrar betabloqueador cautelosamente para evitar infarto por roubo de fluxo coronariano'
    ],
    urgencyLevel: 'imediato'
  }
];
