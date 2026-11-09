export interface VitalSignsProfile {
  heartRate: number;
  heartRateText: string;
  bloodPressure: string;
  respiratoryRate: number;
  respiratoryRateText: string;
  temperature: number;
  temperatureText: string;
  oxygenSat: number;
  oxygenSatText: string;
  glucose: string;
  ecgPattern: 'normal' | 'sinus_tachycardia' | 'sinus_bradycardia' | 'wide_qrs' | 'long_qt' | 'ventricular_tachycardia' | 'bav';
  ecgDescription: string;
}

export interface PatientHotspot {
  id: 'brain' | 'eyes' | 'skin' | 'heart' | 'lungs' | 'abdomen' | 'neuromuscular';
  label: string;
  status: string;
  shortDesc: string;
  detailedMechanisms: string;
  clinicalPearls: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface ToxidromeData {
  id: string;
  name: string;
  subtitle: string;
  categoryBadge: string;
  accentColor: string;
  glowColor: string;
  badgeBg: string;
  badgeBorder: string;
  offenders: string[];
  receptorsInvolved: string[];
  summaryMnemonic?: string;
  summaryMnemonicDescription?: string;
  vitals: VitalSignsProfile;
  pupil: {
    sizeMm: number; // 1 to 9
    type: 'miose_puntiforme' | 'miose_reativa' | 'normal' | 'midriase_reativa' | 'midriase_paralitica' | 'oculogiro';
    label: string;
    description: string;
    lightReflex: string;
  };
  hotspots: Record<'brain' | 'eyes' | 'skin' | 'heart' | 'lungs' | 'abdomen' | 'neuromuscular', PatientHotspot>;
  pathophysiology: {
    molecularMechanism: string;
    keyPoints: string[];
    metabolismAndHalfLife: string;
  };
  diagnosticCriteria: {
    name: string;
    description: string;
    items: string[];
  };
  antidoteProtocol: {
    drug: string;
    brandName?: string;
    class: string;
    mechanism: string;
    attackDose: string;
    maintenanceDose: string;
    therapeuticEndpoint: string; // Meta de parada
    adverseEffectsAlert: string;
  };
  prohibitedTraps: {
    trapTitle: string;
    explanation: string;
    consequence: string;
  }[];
  differentials: {
    condition: string;
    firstLineGold: string;
    secondLineConfirm: string;
    keyDiscriminator: string;
  }[];
}

export const TOXIDROMES_DATABASE: Record<string, ToxidromeData> = {
  // 1. SÍNDROME COLINÉRGICA
  colinergica: {
    id: 'colinergica',
    name: 'Síndrome Colinérgica',
    subtitle: 'Crise Muscarínica e Nicotínica por Inibição da Acetilcolinesterase',
    categoryBadge: 'Inibidores da AChE / Pesticidas',
    accentColor: 'text-emerald-400',
    glowColor: 'bg-emerald-500',
    badgeBg: 'bg-emerald-950/40',
    badgeBorder: 'border-emerald-600/50',
    offenders: [
      'Organofosforados (Malation, Paration, Clorpirifós)',
      'Carbamatos (Aldicarb / "Chumbinho")',
      'Agentes de Guerra Química (Sarin, VX, Soman)',
      'Fármacos Parassimpatomiméticos (Neostigmina, Piridostigmina, Fisostigmina)'
    ],
    receptorsInvolved: [
      'Receptores Muscarínicos (M1 a M5) pós-ganglionares parassimpáticos',
      'Receptores Nicotínicos (Nn autonômicos e Nm da junção neuromuscular)',
      'Receptores colinérgicos no córtex cerebral e tronco encefálico'
    ],
    summaryMnemonic: 'DUMBELS / SLUDGE & Os 3 "B"s Letais',
    summaryMnemonicDescription: 'Diarreia, Urina, Miose, Broncorreia/Broncoespasmo/Bradicardia, Êmese, Lacrimejamento, Salivação/Sudorese. O paciente está literalmente se "afogando" em suas próprias secreções.',
    vitals: {
      heartRate: 42,
      heartRateText: 'Bradicardia Sinusal Severa (35-50 bpm) ou BAV',
      bloodPressure: '85/50 mmHg (Hipotensão com vasodilatação)',
      respiratoryRate: 28,
      respiratoryRateText: 'Taquipneia por insuficiência ventilatória e asfixia secretiva',
      temperature: 36.2,
      temperatureText: 'Normotermia ou hipotermia leve por diaforese profusa',
      oxygenSat: 84,
      oxygenSatText: 'Hipoxemia crítica (< 88%) por colapso alveolar e broncorreia',
      glucose: '95 mg/dL',
      ecgPattern: 'sinus_bradycardia',
      ecgDescription: 'Bradicardia sinusal extrema com prolongamento de PR e ondas T apiculadas; risco de BAVT e assistolia por tônus vagal desmedido.'
    },
    pupil: {
      sizeMm: 1.5,
      type: 'miose_puntiforme',
      label: 'Miose Puntiforme Bilateral',
      description: 'Pupilas menores que 2 mm por espasmo do músculo esfíncter da íris mediado por receptores M3.',
      lightReflex: 'Diminuído ou indistinguível pelo tamanho diminuto'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Nível de Consciência',
        status: 'Ansiedade inicial evoluindo para confusão mental, convulsões e coma',
        shortDesc: 'Sobrecarga colinérgica central provoca convulsões e depressão do centro respiratório bulbar.',
        detailedMechanisms: 'A acetilcolina em excesso nas sinapses corticais despolariza neurônios piramidais provocando status convulsivo não responsivo a anticonvulsivantes comuns que dependam exclusivamente de Na+.',
        clinicalPearls: 'Convulsões colinérgicas devem ser tratadas agressivamente com Benzodiazepínicos em altas doses para prevenir lesão neuronal isquêmica.',
        severity: 'critical'
      },
      eyes: {
        id: 'eyes',
        label: 'Pupilas & Aparelho Lacrimal',
        status: 'Miose em ponta de alfinete (< 2 mm) e lacrimejamento contínuo profuso',
        shortDesc: 'Estimulação contínua do esfíncter pupilar e das glândulas lacrimais via receptores M3.',
        detailedMechanisms: 'A estimulação colinérgica no gânglio ciliar causa contração sustentada do esfíncter pupilar e espasmo da acomodação (visão borrada / miopia aguda induzida).',
        clinicalPearls: 'ATENÇÃO: A ausência de miose NÃO exclui a intoxicação! Na fase inicial, a estimulação nicotínica dos gânglios simpáticos pode mascarar a miose e gerar midríase transitória em até 15% dos casos.',
        severity: 'warning'
      },
      skin: {
        id: 'skin',
        label: 'Pele, Mucosas & Sudorese',
        status: 'Diaforese profusa, pele fria e encharcada ("O paciente escorre")',
        shortDesc: 'Hiperativação das glândulas sudoríparas écrinas (inervadas por fibras colinérgicas simpáticas).',
        detailedMechanisms: 'Glândulas sudoríparas expressam receptores muscarínicos M3; a perda hídrica por suor e salivação pode causar choque hipovolêmico funcional somado à vasodilatação.',
        clinicalPearls: 'O paciente organofosforado pode ser absorvido por via dérmica. O contato com a pele do doente sem EPI contamina a equipe do pronto-socorro.',
        severity: 'critical'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular & Ritmo',
        status: 'Bradicardia extrema, bloqueio atrioventricular, hipotensão severa',
        shortDesc: 'Estimulação vagal maciça no nó sinoatrial e atrioventricular via receptores M2.',
        detailedMechanisms: 'Receptores M2 cardíacos inibem a adenilato ciclase e ativam correntes retificadoras de potássio (IK,ACh), hiperpolarizando as células nodais e deprimindo a condução cardíaca.',
        clinicalPearls: 'Se houver predomínio nicotínico inicial nos gânglios autonômicos simpáticos, pode ocorrer taquicardia paradoxal, mas a bradicardia predomina na fase avançada.',
        severity: 'critical'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório (Causa de Morte)',
        status: 'Broncorreia torrencial, broncoespasmo severo e estertores úmidos difusos',
        shortDesc: 'Os 3 "B"s letais: Broncorreia + Broncoespasmo + Bradicardia produzem asfixia por inundação alveolar.',
        detailedMechanisms: 'Receptores M3 no epitélio brônquico e glândulas submucosas induzem secreção mucosa maciça; concomitantemente, causam broncoconstrição da musculatura lisa traqueobrônquica.',
        clinicalPearls: 'A atropina deve ser titulada até SECAR A VIA AÉREA (ausência de estertores e roncos). Pupilas e taquicardia NÃO são parâmetros de interrupção da atropinização.',
        severity: 'critical'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal & Esfíncteres',
        status: 'Hiperperistaltismo, cólicas intensas, diarreia explosiva, vômitos e incontinência urinária',
        shortDesc: 'Relaxamento dos esfíncteres gastrointestinais e urinários associado a hipercontratilidade da parede muscular lisa.',
        detailedMechanisms: 'Estimulação M2/M3 no músculo detrusor vesical (esvaziamento involuntário) e relaxamento do trígono vesical; espasmos gastrointestinais com perda eletrolítica grave de K+ e bicarbonato.',
        clinicalPearls: 'Perda de controle esfincteriano simultâneo (fezes e urina) com vômitos frequentes é uma das marcas registradas da crise colinérgica.',
        severity: 'warning'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Junção Neuromuscular (Efeito Nicotínico)',
        status: 'Fasciculações involuntárias iniciais progredindo para fraqueza e paralisia flácida diafragmática',
        shortDesc: 'Despolarização persistente dos receptores Nm da placa motora levando a bloqueio despolarizante duradouro.',
        detailedMechanisms: 'O excesso de acetilcolina na fenda neuromuscular mantém os canais iônicos abertos até que haja fadiga e inativação dos canais de sódio dependentes de voltagem (bloqueio de despolarização).',
        clinicalPearls: 'A Atropina NÃO reverte as fasciculações nem a paralisia muscular diafragmática (pois a atropina é antagonista muscarínico puro). Apenas a Pralidoxima (2-PAM) atua na reversão nicotínica!',
        severity: 'critical'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Os organofosforados fosforilam irreversivelmente a serina no sítio ativo da enzima Acetilcolinesterase (AChE). Com a AChE inibida, a acetilcolina se acumula em níveis tóxicos em todas as sinapses muscarínicas, nicotínicas e centrais.',
      keyPoints: [
        'Envelhecimento da Enzima (Aging): A ligação covalente organofosfato-AChE sofre desaquilação gradual ao longo de 24-48h, tornando a inibição irreversível. Por isso, a Pralidoxima deve ser administrada precocemente.',
        'Carbamatos realizam inibição reversível (carbamilação), com dissociação espontânea em 24-48h sem aging, mas ainda assim podem ser letais pelo quadro respiratório agudo.',
        'A causa primária de óbito é a insuficiência respiratória mista: broncorreia maciça + broncoespasmo + fadiga da musculatura respiratória + depressão central respiratória.'
      ],
      metabolismAndHalfLife: 'Compostos lipofílicos podem se depositar no tecido adiposo e provocar síndrome intermediária ou recaída tardia até 1 a 4 dias após a aparente estabilização.'
    },
    diagnosticCriteria: {
      name: 'Critérios Clínicos da Crise Colinérgica (Síndrome DUMBELS)',
      description: 'Presença de manifestações muscarínicas floridas somadas a sinais nicotínicos e história de exposição:',
      items: [
        'D - Diarreia / Hiperperistaltismo com cólicas abdominais',
        'U - Urina involuntária (incontinência por contração do detrusor)',
        'M - Miose puntiforme e espasmo de acomodação visual',
        'B - Broncorreia torrencial + Broncoespasmo + Bradicardia (Tríade Letal)',
        'E - Êmese incontrolável com náuseas',
        'L - Lacrimejamento profuso contínuo',
        'S - Salivação abundante ("baba em espelho") e Sudorese profusa'
      ]
    },
    antidoteProtocol: {
      drug: 'Sulfato de Atropina + Pralidoxima (PAM)',
      brandName: 'Atropina 0.5 mg/mL ou 1 mg/mL | Contrathion (Pralidoxima)',
      class: 'Antagonista Muscarínico Competitivo + Reativador da Colinesterase',
      mechanism: 'A Atropina bloqueia competitivamente os receptores muscarínicos M1-M5, secando secreções e normalizando a condução AV. A Pralidoxima quebra a ligação fosfórica com a AChE antes do envelhecimento enzimático, reativando a enzima na placa motora nicotínica.',
      attackDose: 'Atropina: 2 a 4 mg EV em bolus imediato (em crianças: 0.05 mg/kg). Se em 5 minutos não houver melhora das secreções brônquicas, DOBRAR a dose (4 mg, depois 8 mg, 16 mg...). Não há dose máxima!',
      maintenanceDose: 'Pós-atropinização: infusão contínua com 10% a 20% da dose total necessária para atingir a meta, por hora. Pralidoxima: 1 a 2 g EV diluída em SF 100 mL infundida em 30 min, seguida de 500 mg/h por 24-48h.',
      therapeuticEndpoint: 'ATROPINIZAÇÃO PLENA = Vias aéreas secas à ausculta (sem estertores crepitantes), pressão arterial sistólica estável e frequência cardíaca > 80 bpm. NUNCA interromper por midríase!',
      adverseEffectsAlert: 'Risco de toxicidade atropínica tardia se a via aérea já estiver seca: hipertermia, alucinações e bexigoma. Reduzir a velocidade de infusão gradualmente sob vigilância estrita.'
    },
    prohibitedTraps: [
      {
        trapTitle: 'PROIBIÇÃO DE SUCCINILCOLINA NA INTUBAÇÃO (IOT)',
        explanation: 'A succinilcolina é metabolizada pela butirilcolinesterase (pseudocolinesterase plasmática), que é destruída pelo organofosforado.',
        consequence: 'Se você usar succinilcolina na sequência rápida de intubação, o bloqueio neuromuscular que duraria 5 minutos durará mais de 4 a 6 horas em apneia paralisada total. Utilize ROCURÔNIO!'
      },
      {
        trapTitle: 'ATENDIMENTO SEM EPI COMPLETO (PERIGO DE CONTAMINAÇÃO DA EQUIPE)',
        explanation: 'Organofosforados volatilizam das roupas e são absorvidos intactos através da pele do médico e da equipe de enfermagem.',
        consequence: 'Médicos e enfermeiros desmaiam ou entram em broncoespasmo durante o atendimento. Despir completamente o paciente, ensacar pertences e lavar a pele com água morna e sabão em área isolada é o PASSO ZERO!'
      },
      {
        trapTitle: 'PARAR ATROPINA PORQUE O PACIENTE FICOU TAQUICÁRDICO OU COM MIDRÍASE',
        explanation: 'A taquicardia e a midríase podem ser causadas por estímulo nicotínico ou hipoxemia grave.',
        consequence: 'Se você suspender a atropina antes da via aérea estar completamente seca de secreções, o paciente morrerá asfixiado pelo próprio muco brônquico.'
      }
    ],
    differentials: [
      {
        condition: 'Edema Agudo de Pulmão Cardiogênico (EAP)',
        firstLineGold: 'Ecocardiograma à beira-leito (POCUS) + BNP + RX de tórax',
        secondLineConfirm: 'Gasometria arterial e resposta a furosemida/nitrato',
        keyDiscriminator: 'No EAP não há miose puntiforme, nem fasciculações musculares, nem salivação/diarreia massiva.'
      },
      {
        condition: 'Crise Asmática Grave / Broncoespasmo Refratário',
        firstLineGold: 'Exame físico dinâmico + Espirometria / Peak Flow',
        secondLineConfirm: 'Gasometria arterial e hemograma com eosinófilos',
        keyDiscriminator: 'A asma gera sibilos expiratórios com tórax hiperinsuflado seco, sem a hipersecreção glandular difusa do organofosforado.'
      },
      {
        condition: 'Intoxicação por Opioides',
        firstLineGold: 'Prova terapêutica com Naloxona EV (0.4 mg)',
        secondLineConfirm: 'Gasometria arterial + Triagem toxicológica urinária',
        keyDiscriminator: 'Ambos causam miose e bradipneia, mas o paciente opioide tem pele seca e ausência de broncorreia torrencial.'
      }
    ]
  },

  // 2. SÍNDROME ANTICOLINÉRGICA
  anticolinergica: {
    id: 'anticolinergica',
    name: 'Síndrome Anticolinérgica',
    subtitle: 'Bloqueio Competitivo Central e Periférico dos Receptores Muscarínicos',
    categoryBadge: 'Bloqueadores Muscarínicos / Atropínicos',
    accentColor: 'text-rose-400',
    glowColor: 'bg-rose-500',
    badgeBg: 'bg-rose-950/40',
    badgeBorder: 'border-rose-600/50',
    offenders: [
      'Alcaloides da Beladona e Datura suaveolens (Trombeteira / Lírio / Zabumba)',
      'Anti-histamínicos de 1ª geração (Difenidramina, Dimenidrinato, Dexclorfeniramina, Hidroxizina)',
      'Antidepressivos Tricíclicos (Amitriptilina, Nortriptilina)',
      'Antiparkinsonianos centrais (Biperideno, Triexifenidil)',
      'Antiespasmódicos e Midriáticos (Escopolamina, Atropina, Ciclopentolato, Tropicamida)',
      'Relaxantes musculares (Ciclobenzaprina)'
    ],
    receptorsInvolved: [
      'Bloqueio competitivo de receptores muscarínicos M1, M2, M3, M4 e M5',
      'Ausência de transmissão colinérgica nos gânglios parassimpáticos terminais',
      'Bloqueio colinérgico nas vias do prosencéfalo basal (delirium colinérgico)'
    ],
    summaryMnemonic: 'The Famous "Mnemonic of the 6" (Inglês / Português)',
    summaryMnemonicDescription: '"Cego como uma coruja (Blind as a bat), Louco como um chapeleiro (Mad as a hatter), Vermelho como uma beterraba (Red as a beet), Quente como uma lebre (Hot as a hare), Seco como um osso (Dry as a bone), Cheio como um frasco (Full as a flask)".',
    vitals: {
      heartRate: 135,
      heartRateText: 'Taquicardia Sinusal Acentuada (110 - 150 bpm)',
      bloodPressure: '150/95 mmHg (Hipertensão moderada por desinibição simpática)',
      respiratoryRate: 22,
      respiratoryRateText: 'Taquipneia compensatória pela hipertermia',
      temperature: 39.4,
      temperatureText: 'Hipertermia Severa (38.5 - 40.5 °C) por incapacidade de sudorese',
      oxygenSat: 97,
      oxygenSatText: 'Normosaturação (pulmão seco e limpo de secreções)',
      glucose: '110 mg/dL',
      ecgPattern: 'sinus_tachycardia',
      ecgDescription: 'Taquicardia sinusal regular; se houver tricíclico envolvido, atentar para QRS alargado (> 100 ms) e onda R proeminente em aVR.'
    },
    pupil: {
      sizeMm: 8.5,
      type: 'midriase_paralitica',
      label: 'Midríase Máxima e Arreativa',
      description: 'Pupilas amplamente dilatadas (8 a 9 mm), sem resposta reflexa ao feixe de luz direta ou consensual.',
      lightReflex: 'Ausente (Paralítica) por bloqueio colinérgico completo no esfíncter pupilar'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Estado Mental ("Mad as a hatter")',
        status: 'Delirium hiperativo ocupacional, agitação psicomotora, alucinações visuais ("catando insetos")',
        shortDesc: 'Bloqueio colinérgico nos circuitos córtico-estriatais deflagra alucinações vívidas e disartria ("fala arrastada e incompreensível").',
        detailedMechanisms: 'A deficiência aguda de acetilcolina no hipocampo e neocórtex rompe a integração sensorial; o paciente tenta catar objetos imaginários no ar (carfologia/flocilação).',
        clinicalPearls: 'O delirium anticolinérgico é tipicamente ocupacional (o paciente finge costurar, dirigir ou escrever papéis imaginários).',
        severity: 'critical'
      },
      eyes: {
        id: 'eyes',
        label: 'Olhos & Pupilas ("Blind as a bat")',
        status: 'Midríase máxima fixa e cicloplegia (paralisia da musculatura ciliar)',
        shortDesc: 'Visão borrada severa para objetos próximos e intolerância dolorosa à luz ambiente (fotofobia).',
        detailedMechanisms: 'Bloqueio dos receptores M3 no esfíncter da íris (prevalece a musculatura radial dilatadora adrenérgica) e no músculo ciliar de acomodação do cristalino.',
        clinicalPearls: 'A midríase anticolinérgica NÃO reage à luz e pode levar dias para regredir se causada por colírios cicloplégicos ou plantas ricas em beladona.',
        severity: 'warning'
      },
      skin: {
        id: 'skin',
        label: 'Pele & Sudorese ("Dry as a bone & Red as a beet")',
        status: 'Pele eritematosa (flushing facial), quente como brasa e completamente ÁRIDA (sem suor)',
        shortDesc: 'A PELE SECA é o principal discriminador entre a síndrome anticolinérgica e a simpatomimética.',
        detailedMechanisms: 'Bloqueio de M3 nas glândulas sudoríparas impede a transpiração; o calor corporal acumulado provoca vasodilatação cutânea periférica compensatória (rubor eritematoso).',
        clinicalPearls: 'Toque as axilas e as virilhas do paciente. Se estiverem secas e quentes com taquicardia e midríase, é ANTICOLINÉRGICO. Se estiverem encharcadas de suor, é SIMPATOMIMÉTICO.',
        severity: 'critical'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular & Ritmo',
        status: 'Taquicardia sinusal rápida sustentada, palpitações intensas',
        shortDesc: 'Perda do tônus vagal fisiológico inibitório sobre o nó sinusal via bloqueio M2.',
        detailedMechanisms: 'O freio parassimpático cardíaco mediado pelo nervo vago é retirado; a frequência cardíaca intrínseca sinusal sobe para > 120-140 bpm.',
        clinicalPearls: 'Em idosos com coronariopatia prévia, a taquicardia prolongada e a hipertermia podem precipitar infarto agudo do miocárdio tipo 2 por desbalanço de oferta/demanda.',
        severity: 'warning'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório',
        status: 'Vias aéreas esturricadas, murmúrio vesicular limpo sem secreções, taquipneia',
        shortDesc: 'Secura completa das mucosas nasal, oral e traqueobrônquica; rouquidão e tosse seca irritativa.',
        detailedMechanisms: 'Inibição de glândulas submucosas do trato respiratório superior e inferior.',
        clinicalPearls: 'Ausência total de estertores à ausculta; a xerostomia extrema dificulta a fala e a deglutição.',
        severity: 'info'
      },
      abdomen: {
        id: 'abdomen',
        label: 'TGI & Bexiga ("Full as a flask")',
        status: 'Íleo paralítico com silêncio abdominal absoluto e retenção urinária aguda com BEXIGOMA palpável',
        shortDesc: 'Paralisia da peristalse intestinal e retenção de urina maciça que pode romper a bexiga se não sondada.',
        detailedMechanisms: 'Bloqueio de M2/M3 inibe o tônus do detrusor vesical e mantém a contração do esfíncter interno, além de relaxar o músculo liso do cólon.',
        clinicalPearls: 'Palpar o hipogástrio é OBRIGATÓRIO: você encontrará um bexigoma doloroso que pode reter 1 a 2 litros de urina. A sondagem vesical alivia imediatamente parte da agitação!',
        severity: 'critical'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Tônus Muscular & Reflexos',
        status: 'Tremores finos de extremidades, reflexos preservados ou hiper-reativos, mioclonias',
        shortDesc: 'Diferente da síndrome serotoninérgica, NÃO HÁ CLÔNUS clássico espontâneo.',
        detailedMechanisms: 'Fasciculações e clônus estão ausentes; tremores decorrem do estado hiperadrenérgico secundário e da agitação motora.',
        clinicalPearls: 'Ausência de clônus ocular ou patelar ajuda a afastar síndrome serotoninérgica.',
        severity: 'info'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Antagonismo competitivo puro nos receptores muscarínicos periféricos e centrais. Como a acetilcolina não consegue se ligar aos receptores M1-M5, todos os efeitos basais do parassimpático são desligados instantaneamente.',
      keyPoints: [
        'A hipertermia decorre da anidrose (incapacidade de suar) combinada com a agitação motora contínua.',
        'Muitos medicamentos de venda livre (anti-histamínicos, xaropes, antigripais) contêm aminas terciárias com penetração na barreira hematoencefálica.',
        'A absorção de fármacos anticolinérgicos ingeridos pode ser muito prolongada no estômago devido à atonia gástrica induzida pela própria droga (esvaziamento gástrico lentificado).'
      ],
      metabolismAndHalfLife: 'Drogas como a amitriptilina e difenidramina possuem grande volume de distribuição e recirculação entero-hepática.'
    },
    diagnosticCriteria: {
      name: 'Regra dos Seis Cardeais da Síndrome Anticolinérgica',
      description: 'Conjunto sindrômico característico de hipofunção parassimpática generalizada:',
      items: [
        '1. Pele seca e quente com flushing facial eritematoso',
        '2. Midríase paralítica máxima com visão borrada',
        '3. Retenção urinária aguda (bexigoma palpável no hipogástrio)',
        '4. Íleo paralítico com ruídos hidroaéreos abolidos',
        '5. Taquicardia sinusal sustentada (> 110 bpm)',
        '6. Delirium hiperativo agitado com alucinações visuais e carfologia'
      ]
    },
    antidoteProtocol: {
      drug: 'Salicilato de Fisostigmina',
      brandName: 'Antilirium / Fisostigmina 1 mg/mL',
      class: 'Inibidor Reversível da Acetilcolinesterase com Ação Central',
      mechanism: 'Por ser uma amina terciária, a Fisostigmina cruza livremente a barreira hematoencefálica (ao contrário da neostigmina que é quaternária). Ela inibe a AChE e inunda as sinapses centrais e periféricas com acetilcolina, desalojando o bloqueador anticolinérgico.',
      attackDose: 'Adultos: 1 a 2 mg EV administrados LENTAMENTE em pelo menos 5 a 10 minutos (NUNCA em bolus rápido!). Em crianças: 0.02 mg/kg.',
      maintenanceDose: 'Pode-se repetir a dose de 1 a 2 mg após 20 a 30 minutos se o delirium refratário persistir e o ECG permanecer estritamente normal.',
      therapeuticEndpoint: 'Reversão do delirium agitado ameaçador à vida e restauração do contato verbal consciente, sem provocar sinais colinérgicos de toxicidade.',
      adverseEffectsAlert: 'Risco de crise colinérica iatrogênica (broncorreia, vômitos, convulsão) se administrada rapidamente. Ter ATROPINA à beira do leito ao administrar fisostigmina!'
    },
    prohibitedTraps: [
      {
        trapTitle: 'NUNCA FAZER FISOSTIGMINA SE HOUVER QRS ALARGADO (> 100 ms) OU SUSPEITA DE TRICÍCLICOS',
        explanation: 'A fisostigmina associada ao bloqueio de canais de sódio por antidepressivos tricíclicos precipita assistolia ventricular imediata e irresponsiva.',
        consequence: 'Parada cardiorrespiratória em assistolia fatal. Se houver dúvida diagnóstica ou QRS > 100 ms no ECG, a Fisostigmina é FORMALMENTE CONTRAINDICADA!'
      },
      {
        trapTitle: 'NÃO USAR HALOPERIDOL PARA CONTER A AGITAÇÃO PSICOMOTORA',
        explanation: 'O haloperidol possui efeito anticolinérgico residual próprio, bloqueia canais de potássio alargando o intervalo QTc e reduz o limiar convulsivo.',
        consequence: 'Piora catastrófica do delirium, hipertermia agravada e risco iminente de Torsades de Pointes. Para contenção, use EXCLUSIVAMENTE BENZODIAZEPÍNICOS (Diazepam 5-10 mg EV)!'
      },
      {
        trapTitle: 'ESQUECER DE PASSAR SONDA VESICAL DE DEMORA',
        explanation: 'O paciente retém urina silenciosamente enquanto se agita no delirium.',
        consequence: 'Ruptura vesical, insuficiência renal pós-renal aguda e intensificação da dor visceral que piora a agressividade motora do doente.'
      }
    ],
    differentials: [
      {
        condition: 'Síndrome Simpatomimética (Cocaína / Anfetaminas)',
        firstLineGold: 'Inspeção física das axilas/pele (Sudorese vs Secura)',
        secondLineConfirm: 'Ausculta abdominal (RHA aumentados vs abolidos)',
        keyDiscriminator: 'Pele ENCHARCADA de suor e RHA hiperativos na Simpatomimética; Pele SECA como pergaminho e bexigoma na Anticolinérgica.'
      },
      {
        condition: 'Meningite / Encefalite Aguda',
        firstLineGold: 'Punção lombar (LCR celularidade e glicorraquia) + TC de crânio',
        secondLineConfirm: 'Hemoculturas + PCR para vírus herpético',
        keyDiscriminator: 'A infecção do SNC apresenta rigidez de nuca, sinais meníngeos (Brudzinski/Kernig) e ausência de bexigoma ou íleo paralítico estrito.'
      },
      {
        condition: 'Psicose Aguda Primária / Mania Bipolar',
        firstLineGold: 'Avaliação dos sinais vitais (ausência de alterações autonômicas)',
        secondLineConfirm: 'Triagem toxicológica urinária ampla',
        keyDiscriminator: 'Na psicose psiquiátrica pura, as pupilas têm tamanho e reatividade normais, a pele não é hiperadrenérgica nem anidrótica e os sinais vitais são estáveis.'
      }
    ]
  },

  // 3. SÍNDROME OPIOIDE
  opioide: {
    id: 'opioide',
    name: 'Intoxicação por Opioides',
    subtitle: 'Depressão do Sistema Nervoso Central e do Centro Respiratório Bulbar',
    categoryBadge: 'Agonistas dos Receptores Mu-Opioides',
    accentColor: 'text-blue-400',
    glowColor: 'bg-blue-500',
    badgeBg: 'bg-blue-950/40',
    badgeBorder: 'border-blue-600/50',
    offenders: [
      'Opioides naturais (Morfina, Codeína)',
      'Opioides semi-sintéticos (Oxicodona, Hidromorfona, Heroína)',
      'Opioides sintéticos potentes (Fentanil, Sufentanil, Carfentanil, Metadona)',
      'Opioides atípicos (Tramadol, Buprenorfina, Loperamida em megadoses)'
    ],
    receptorsInvolved: [
      'Agonismo nos receptores Mu (MOR) - analgesia, depressão respiratória e euforia',
      'Agonismo nos receptores Kappa (KOR) - sedação e disforia',
      'Agonismo nos receptores Delta (DOR) - analgesia espinhal'
    ],
    summaryMnemonic: 'A Tríade Clássica do Coma Opioide',
    summaryMnemonicDescription: '1. Coma / Rebaixamento grave do sensório + 2. Miose Puntiforme em cabeça de alfinete + 3. Depressão Respiratória crítica (FR < 8-10 irpm ou apneia).',
    vitals: {
      heartRate: 50,
      heartRateText: 'Bradicardia Leve a Moderada (45-55 bpm)',
      bloodPressure: '90/60 mmHg (Hipotensão leve por vasodilatação histamínica)',
      respiratoryRate: 6,
      respiratoryRateText: 'Depressão Respiratória Grave (4 a 8 irpm com pausas apneicas)',
      temperature: 35.4,
      temperatureText: 'Hipotermia leve por perda da termorregulação e imobilidade',
      oxygenSat: 81,
      oxygenSatText: 'Hipoxemia Crítica com acidose respiratória (PaCO2 > 65 mmHg)',
      glucose: '85 mg/dL',
      ecgPattern: 'sinus_bradycardia',
      ecgDescription: 'Bradicardia sinusal regular; na intoxicação por Metadona, atenção máxima para prolongamento extremo do QTc e Torsades de Pointes.'
    },
    pupil: {
      sizeMm: 1.0,
      type: 'miose_puntiforme',
      label: 'Miose Puntiforme em "Ponta de Alfinete" (Pinpoint)',
      description: 'Pupilas simétricas de 1 a 1.5 mm causadas por desinibição do núcleo de Edinger-Westphal do nervo oculomotor.',
      lightReflex: 'Preservado porém praticamente imperceptível devido ao tamanho puntiforme'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Nível de Consciência',
        status: 'Estupor profundo a coma arreativo (Glasgow 3 a 5), fala arrastada prévia',
        shortDesc: 'Depressão global do sistema reticular ativador ascendente e córtex.',
        detailedMechanisms: 'A hiperpolarização neuronal por abertura de canais de potássio retificadores internos acoplados a proteína G (GIRK) e inibição da entrada de Ca2+ pré-sináptico deprime a neurotransmissão.',
        clinicalPearls: 'O paciente parece estar dormindo tranquilamente enquanto hipoventila até a parada cardiorrespiratória por asfixia silenciosa.',
        severity: 'critical'
      },
      eyes: {
        id: 'eyes',
        label: 'Pupilas (Sinal Cardinal)',
        status: 'Pupilas puntiformes bilaterais simétricas (1 mm)',
        shortDesc: 'Estimulação parassimpática central do complexo nuclear do III par craniano.',
        detailedMechanisms: 'Os opioides inibem o tônus gabaérgico inibitório sobre o núcleo de Edinger-Westphal, resultando em descarga parassimpática descontrolada para o esfíncter da íris.',
        clinicalPearls: 'EXCEÇÕES CLÍNICAS: Meperidina, Propoxifeno e Tramadol podem cursar com pupilas normais ou midriáticas! Na hipóxia cerebral terminal grave, a pupila pode sofrer midríase paralítica.',
        severity: 'critical'
      },
      skin: {
        id: 'skin',
        label: 'Pele, Mucosas & Temperatura',
        status: 'Pele fria, pegajosa, cianose de extremidades e lábios, marcas de punção venosa (track marks)',
        shortDesc: 'Hipotermia por vasodilatação periférica e perda da termogênese motora.',
        detailedMechanisms: 'Liberação de histamina por mastócitos periféricos (especialmente morfina) causa vasodilatação e prurido facial/nasal.',
        clinicalPearls: 'Sempre inspecione antebraços, dorso das mãos, virilhas e entre os dedos procurando estigmas de punções venosas repetidas.',
        severity: 'warning'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular',
        status: 'Bradicardia leve, pulsos cheios ou filiformes na hipóxia avançada, hipotensão',
        shortDesc: 'Efeito cronotrópico negativo central e perda do tônus simpático vascular.',
        detailedMechanisms: 'Inibição simpática central no tronco somada à vasodilatação periférica histamínico-dependente.',
        clinicalPearls: 'A parada cardíaca no paciente opioide quase nunca é primária do coração: ela é hipóxica e secundária à apneia prolongada.',
        severity: 'warning'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório (Causa Mortis)',
        status: 'Bradipneia extrema (< 6 irpm), respiração rasa, apneias de 30-40 segundos, roncos',
        shortDesc: 'Perda da sensibilidade dos quimiorreceptores bulbares ao dióxido de carbono (CO2).',
        detailedMechanisms: 'Os receptores Mu no complexo pré-Bötzinger do bulbo são inibidos diretamente; o cérebro deixa de enviar impulsos ventilatórios mesmo com PaCO2 atingindo 70-80 mmHg.',
        clinicalPearls: 'Complicação temida: EDEMA PULMONAR NÃO CARDIOGÊNICO pode ocorrer subitamente após overdose de heroína, metadona ou após infusão muito rápida de naloxona.',
        severity: 'critical'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal',
        status: 'Constipação obstinada, peristalse lentificada ou ausente, náuseas na fase inicial',
        shortDesc: 'Aumento do tônus dos esfíncteres e inibição das contrações peristálticas propulsivas no plexo mioentérico.',
        detailedMechanisms: 'Receptores Mu no plexo de Auerbach inibem a liberação de acetilcolina intestinal, paralisando o trânsito e ressecando o bolo fecal.',
        clinicalPearls: 'O reflexo de vômito pode estar presente na indução, com alto risco de broncoaspiração pelo rebaixamento concomitante da consciência.',
        severity: 'info'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Tônus Muscular & Reflexos',
        status: 'Flacidez muscular generalizada, hiporreflexia profunda, língua em retroversão',
        shortDesc: 'Queda do tônus muscular basal com perda do reflexo de proteção da via aérea (queda da base da língua).',
        detailedMechanisms: 'Inibição descendente dos motoneurônios espinhais.',
        clinicalPearls: 'EXCEÇÃO CRÍTICA: O FENTANIL e seus análogos em doses rápidas podem provocar a temida SÍNDROME DO TÓRAX RÍGIDO (Wooden Chest Syndrome), impedindo a ventilação até com bolsa-válvula-máscara!',
        severity: 'critical'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Agonismo nos receptores acoplados à proteína Gi/Go. A ativação inibe a adenilato ciclase intracelular, reduzindo o AMPc, bloqueando os canais de cálcio dependentes de voltagem e abrindo os canais de K+ (GIRK), causando hiperpolarização sináptica maciça.',
      keyPoints: [
        'A causa da morte é a hipoxemia progressiva por apneia central silenciosa com acidose respiratória extrema.',
        'Fentanil e derivados ilícitos modernos possuem potência 50 a 100 vezes maior que a morfina, exigindo doses múltiplas ou mais elevadas de antídoto.',
        'A meia-vida da naloxona é de 30 a 90 minutos, enquanto a meia-vida da metadona ou oxicodona de liberação prolongada pode passar de 24 a 36 horas!'
      ],
      metabolismAndHalfLife: 'Metabolismo hepático via glicuronidação; metabólitos como Morfina-6-glicuronídeo acumulam-se na insuficiência renal com toxicidade exacerbada.'
    },
    diagnosticCriteria: {
      name: 'Tríade Diagnóstica do Coma Opioide',
      description: 'Presença concomitante dos três elementos cardinais na avaliação imediata do paciente inconsciente:',
      items: [
        '1. Depressão do nível de consciência (Glasgow < 8, estupor ou coma)',
        '2. Miose puntiforme simétrica (pupilas de alfinete < 1.5 mm)',
        '3. Depressão respiratória acentuada (FR < 10 irpm, bradipneia e pausas de apneia)'
      ]
    },
    antidoteProtocol: {
      drug: 'Cloridrato de Naloxona',
      brandName: 'Narcan / Naloxona 0.4 mg/mL',
      class: 'Antagonista Puro dos Receptores Opioides (Mu, Kappa e Delta)',
      mechanism: 'Apresenta afinidade extremamente alta pelos receptores opioides Mu, deslocando competitivamente o agonista em questão de 1 a 2 minutos.',
      attackDose: 'Inicial: 0.04 mg a 0.4 mg EV (titulação fracionada). Em parada respiratória iminente: 0.4 mg a 2 mg EV ou IM/Intranasal. Se não houver resposta em 2-3 minutos, repetir 2 mg até dose máxima cumulativa de 10 mg.',
      maintenanceDose: 'Se o paciente foi intoxicado por opioide de ação longa (Metadona) ou comprimidos de liberação prolongada, iniciar BIC contínua: calcular 2/3 da dose de ataque que funcionou e infundir essa quantidade por hora.',
      therapeuticEndpoint: 'OBJETIVO DA NALOXONA: Restaurar a VENTILAÇÃO ESPONTÂNEA ADEQUADA (FR > 12 irpm e SatO2 > 92%), e NÃO acordar o paciente completamente!',
      adverseEffectsAlert: 'Despertar o paciente bruscamente desencadeia SÍNDROME DE ABSTINÊNCIA AGUDA VIOLENTA (vômitos com risco de aspiração, agressividade física violenta, agitação incoercível, hipertensão e edema pulmonar).'
    },
    prohibitedTraps: [
      {
        trapTitle: 'O PERIGO DA RESSEDAÇÃO TARDIA (LIBERAR O PACIENTE DO PS CEDO DEMAIS)',
        explanation: 'A meia-vida da Naloxona é de apenas ~45 a 60 minutos, enquanto os opioides (metadona, fentanil, morfina oral) duram 4 a 24 horas.',
        consequence: 'O paciente acorda, parece ótimo, mas quando o efeito da naloxona cessa no leito da enfermaria, o opioide residual volta a ocupar os receptores e o paciente para de respirar e morre sem ser notado. Observação mínima de 4 a 6 horas para heroína e 24h para opioides longos!'
      },
      {
        trapTitle: 'DESPEJAR 2 MG DE NALOXONA EM BOLUS RÁPIDO NO DEPENDENTE QUÍMICO',
        explanation: 'A reversão instantânea em usuário crônico deflagra tempestade adrenérgica por abstinência maciça.',
        consequence: 'O paciente acorda agredindo a equipe, arranca acessos vasculares, vomita e aspira o conteúdo gástrico para os pulmões ou desenvolve edema pulmonar agudo por estresse catecolaminérgico.'
      },
      {
        trapTitle: 'ESQUECER DE VENTILAR COM BOLSA-VÁLVULA-MÁSCARA ENQUANTO PREPARA O ANTÍDOTO',
        explanation: 'A hipoxemia é o que mata as células cardíacas e cerebrais.',
        consequence: 'Esperar a diluição da naloxona sem pré-oxigenar o paciente em apneia pode culminar em parada cardíaca por assistolia antes do medicamento ser infundido.'
      }
    ],
    differentials: [
      {
        condition: 'Intoxicação por Sedativo-Hipnóticos (Benzodiazepínicos)',
        firstLineGold: 'Inspeção do tamanho pupilar + padrão respiratório',
        secondLineConfirm: 'Triagem toxicológica urinária',
        keyDiscriminator: 'No BZD isolado as pupilas são de tamanho NORMAL e a depressão respiratória é muito mais discreta que no opioide.'
      },
      {
        condition: 'Hemorragia Pontina (Acidente Vascular Cerebral do Tronco)',
        firstLineGold: 'Tomografia de Crânio imediata sem contraste',
        secondLineConfirm: 'Ressonância Magnética com difusão',
        keyDiscriminator: 'A lesão de ponte cursa com coma e pupilas puntiformes, mas não responde à prova com Naloxona e frequentemente tem febre central e hiperreflexia bilateral.'
      },
      {
        condition: 'Intoxicação por Clonidina (Agonista Alfa-2 Central)',
        firstLineGold: 'Anamnese com familiares sobre anti-hipertensivos',
        secondLineConfirm: 'ECG e resposta parcial a doses muito elevadas de naloxona',
        keyDiscriminator: 'A clonidina mimetiza o opioide (miose, bradicardia e sonolência), porém a hipotensão é marcante e a bradipneia é menos grave.'
      }
    ]
  },

  // 4. SÍNDROME SIMPATOMIMÉTICA
  simpatomimetica: {
    id: 'simpatomimetica',
    name: 'Síndrome Simpatomimética',
    subtitle: 'Hiperativação Adrenérgica Maciça por Estímulo de Receptores Alfa e Beta',
    categoryBadge: 'Agonistas Adrenérgicos / Cocaína & Anfetaminas',
    accentColor: 'text-amber-400',
    glowColor: 'bg-amber-500',
    badgeBg: 'bg-amber-950/40',
    badgeBorder: 'border-amber-600/50',
    offenders: [
      'Cocaína (cloridrato, pasta-base, crack)',
      'Anfetaminas e Metanfetaminas (Crystal Meth)',
      'Derivados anfetamínicos e designer drugs (MDMA / Ecstasy, Mephedrona, Catinonas)',
      'Descongestionantes e simpatomiméticos (Efedrina, Pseudoefedrina, Fenilefrina)',
      'Estimulantes para TDAH em superdosagem (Metilfenidato, Lisdexanfetamina)',
      'Cafeína em megadoses e termogênicos ilícitos'
    ],
    receptorsInvolved: [
      'Bloqueio da recaptação de Dopamina, Noradrenalina e Serotonina (NET, DAT, SERT)',
      'Estímulo maciço de receptores Alfa-1 e Alfa-2 periféricos e centrais',
      'Estímulo de receptores Beta-1 cardíacos e Beta-2 musculares'
    ],
    summaryMnemonic: 'The "FIGHT OR FLIGHT" Storm (Tempestade de Luta ou Fuga)',
    summaryMnemonicDescription: 'Pele ENCHARCADA de suor (diaforese profusa), Midríase reativa, Hipertensão grave, Taquicardia extrema, Agitação psicomotora violenta e Hipertermia maligna.',
    vitals: {
      heartRate: 145,
      heartRateText: 'Taquicardia Severa (130 - 180 bpm) com extrassistolia frequente',
      bloodPressure: '210/125 mmHg (Crise Hipertensiva de Emergência)',
      respiratoryRate: 26,
      respiratoryRateText: 'Taquipneia por estímulo catecolaminérgico e acidose láctica',
      temperature: 39.8,
      temperatureText: 'Hipertermia Maligna (> 39.0 °C) por hiperatividade muscular contínua',
      oxygenSat: 96,
      oxygenSatText: 'Normosaturação ou queda se houver edema pulmonar/vasoespasmo',
      glucose: '160 mg/dL',
      ecgPattern: 'sinus_tachycardia',
      ecgDescription: 'Taquicardia sinusal intensa, taquiarritmias supraventriculares ou ventriculares; infradesnivelamento de ST ou supra de ST por vasoespasmo coronariano agudo.'
    },
    pupil: {
      sizeMm: 7.0,
      type: 'midriase_reativa',
      label: 'Midríase Reativa com Nistagmo Ocasional',
      description: 'Pupilas dilatadas (6 a 7.5 mm) por contração do músculo radial da íris estimulado por receptores Alfa-1, mantendo reflexo fotomotor presente.',
      lightReflex: 'Preservado (contrai discretamente com a luz, diferindo do anticolinérgico)'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Estado Mental',
        status: 'Agitação violenta, paranoia persecutória, psicose tóxica, hiperalerta, convulsões',
        shortDesc: 'Aumento maciço de dopamina e noradrenalina no sistema límbico e córtex pré-frontal.',
        detailedMechanisms: 'A hiperestimulação dopaminérgica D2 induz paranoia e alucinações auditivas/táteis; o excesso de noradrenalina baixa o limiar convulsivo.',
        clinicalPearls: 'Risco extremo de agressão física contra a equipe de saúde. A sedação farmacológica rápida com Diazepam EV é conduta de proteção da vida.',
        severity: 'critical'
      },
      eyes: {
        id: 'eyes',
        label: 'Pupilas & Olhar',
        status: 'Midríase evidente, hiperemia conjuntival, olhar fixo vigilante',
        shortDesc: 'Contração alfa-adrenérgica da musculatura radial da íris com reflexo à luz preservado.',
        detailedMechanisms: 'Diferente da anticolinérgica, a via parassimpática está anatomicamente intacta, logo a pupila ainda reage parcialmente ao feixe luminoso.',
        clinicalPearls: 'Pupilas dilatadas em paciente jovem com dor torácica aguda é sinônimo de investigar cocaína ou anfetaminas imediatamente.',
        severity: 'warning'
      },
      skin: {
        id: 'skin',
        label: 'Pele & Sudorese (O Discriminador Ouro)',
        status: 'Diaforese profusa, pele fria e pegajosa ou hiperemiada, piloereção (pele de galinha)',
        shortDesc: 'A PELE SUADA E MOLHADA diferencia a simpatomimética da anticolinérgica (que é seca).',
        detailedMechanisms: 'A hiperestimulação adrenérgica simpática aciona as glândulas sudoríparas enquanto a vasoconstrição alfa-1 cutânea causa palidez e piloereção simultânea.',
        clinicalPearls: 'Lembre-se sempre: "Anticolinérgico é Seco como um Osso; Simpatomimético é Encharcado de Suor".',
        severity: 'critical'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular (Alvo Principal de Mortalidade)',
        status: 'Crise hipertensiva extrema, taquicardia sinusal, angina vasoespástica, IAM, arritmias ventriculares',
        shortDesc: 'Estímulo Beta-1 cardíaco inotrópico/cronotrópico positivo + estímulo Alfa-1 de vasoconstrição coronariana e sistêmica.',
        detailedMechanisms: 'A cocaína inibe a recaptação de catecolaminas, promove vasoespasmo direto da artéria coronária, ativa a agregação plaquetária e bloqueia os canais de sódio cardíacos (efeito anestésico local tipo I).',
        clinicalPearls: 'Jovem de 25 anos com supradesnivelamento de ST no ECG: SEMPRE pensar em vasoespasmo induzido por cocaína antes de aterotrombose comum.',
        severity: 'critical'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório',
        status: 'Taquipneia, dor pleurítica intensa se houver pneumotórax ou "Crack Lung"',
        shortDesc: 'Efeitos broncodilatadores beta-2, mas com risco de barotrauma por inalação forçada (Valsalva).',
        detailedMechanisms: 'Usuários de crack podem sofrer pneumotórax espontâneo, pneumomediastino ou hemorragia alveolar difusa aguda ("Pulmão de Crack").',
        clinicalPearls: 'Escarro hemoptoico ou dor torácica ventilatório-dependente após fumar crack exige Tomografia de Tórax para descartar hemorragia alveolar.',
        severity: 'warning'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal & Renal',
        status: 'RHA normais ou discretamente aumentados, risco de isquemia mesentérica aguda',
        shortDesc: 'Vasoconstrição esplâncnica severa mediada por receptores Alfa-1.',
        detailedMechanisms: 'A vasoconstrição visceral pode necrosar segmentos intestinais e desencadear insuficiência renal aguda por rabdomiólise isquêmica.',
        clinicalPearls: 'Dor abdominal difusa desproporcional ao exame físico no usuário de cocaína sugere isquemia mesentérica vasoespástica.',
        severity: 'warning'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Tônus Muscular & Metabolismo',
        status: 'Hiperatividade motora, tremores grosseiros, convulsões e RABDOMIÓLISE com mioglobinúria',
        shortDesc: 'A hipertermia associada à contração muscular ininterrupta quebra as fibras do músculo esquelético.',
        detailedMechanisms: 'A lise de miócitos libera mioglobina tóxica nos túbulos renais, provocando necrose tubular aguda (urina cor de refrigerante de cola) e hipercalemia letal.',
        clinicalPearls: 'Dosar CPK e eletrólitos imediatamente em todo paciente agitado por simpatomiméticos.',
        severity: 'critical'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Inibição dos transportadores pré-sinápticos de recaptação de monoaminas (NET, DAT, SERT), somada ao aumento da liberação vesicular de catecolaminas e estimulação direta dos receptores adrenérgicos Alfa e Beta.',
      keyPoints: [
        'A cocaína tem efeito triplo: inibição de monoaminas + anestésico local tipo 1 (bloqueio de canais de sódio Nav1.5 no miocárdio) + ativação endotelial protrombótica.',
        'O MDMA (Ecstasy) induz secreção maciça do hormônio antidiurético (ADH/vasopressina), provocando intoxicação por água e HIPONATREMIA DILUCIONAL GRAVE com convulsões e edema cerebral em frequentadores de festas rave.',
        'A hipertermia acima de 40.5 °C na simpatomimética é uma emergência catastrófica: deflagra coagulação intravascular disseminada (CIVD), falência hepática fulminante e morte.'
      ],
      metabolismAndHalfLife: 'Cocaína tem meia-vida curta (1h), mas o metabólito benzoilecgonina persiste por dias. Se associada ao álcool, forma no fígado o metabólito COCAETILENO, 18 vezes mais cardiotóxico e letal.'
    },
    diagnosticCriteria: {
      name: 'Perfil Clínico da Tempestade Adrenérgica',
      description: 'Presença de pelo menos 4 dos seguintes critérios associados a história ou rastreio compatível:',
      items: [
        '1. Taquicardia importante (> 110 bpm) com palpitações ou arritmias',
        '2. Hipertensão arterial sistêmica em níveis de urgência/emergência',
        '3. Diaforese profusa evidente (pele suada e molhada)',
        '4. Midríase fotorreativa bilateral',
        '5. Agitação psicomotora, paranoia ou delírio persecutório',
        '6. Hipertermia corporal sustentada (> 38.0 °C)'
      ]
    },
    antidoteProtocol: {
      drug: 'Benzodiazepínicos EV (Diazepam / Midazolam) + Nitroglicerina',
      brandName: 'Diazepam 10 mg/2 mL | Tridil (Nitroglicerina)',
      class: 'Moduladores Alostéricos Positivos de GABA-A + Vasodilatadores Diretos',
      mechanism: 'Os benzodiazepínicos aumentam a condutância ao cloro nos receptores GABA-A centrais, desligando o drive simpático eferente do tronco encefálico. Isso reduz a FC, a PA, a agitação e a hipertermia de forma sinérgica.',
      attackDose: 'Diazepam: 5 a 10 mg EV lento a cada 5 a 10 minutos até atingir sedação consciente calma. Midazolam: 2.5 a 5 mg EV. Em agitação refratária extrema, doses de até 40-50 mg de diazepam podem ser necessárias.',
      maintenanceDose: 'Para angina vasoespástica por cocaína: associar Nitroglicerina EV em BIC (5 a 100 mcg/min) ou Diltiazem/Verapamil EV se a dor torácica persistir após a sedação com BZD.',
      therapeuticEndpoint: 'Controle da frequência cardíaca (< 100 bpm), normalização da pressão arterial diastólica (< 90 mmHg), cessação do espasmo muscular e resfriamento da temperatura central para < 38.0 °C.',
      adverseEffectsAlert: 'Monitorar depressão respiratória se doses maciças de BZD forem administradas, com capnografia e via aérea assegurada.'
    },
    prohibitedTraps: [
      {
        trapTitle: 'PROIBIÇÃO ABSOLUTA DE BETABLOQUEADORES PUROS (METOPROLOL / ATENOLOL / PROPRANOLOL)',
        explanation: 'Ao administrar um betabloqueador puro na intoxicação por cocaína, você bloqueia os receptores Beta-2 (que promoviam vasodilatação coronariana e muscular).',
        consequence: 'O excesso de adrenalina circulante passa a agir exclusivamente e sem oposição nos receptores Alfa-1 ("UNOPPOSED ALPHA STIMULATION"). O resultado é vasoespasmo coronariano fulminante, pico hipertensivo catastrófico, infarto transmural imediato ou dissecção de aorta no leito!'
      },
      {
        trapTitle: 'NÃO RECONHECER A HIPONATREMIA DILUCIONAL POR MDMA / ECSTASY',
        explanation: 'Em festas, o jovem com ecstasy ingere litros de água para resfriar o corpo enquanto o MDMA estimula secreção maciça de ADH.',
        consequence: 'Se o paciente convulsionar e você infundir soro hipotônico ou glicosado, provocará herniação cerebral uncal e morte por edema cerebral agudo. O tratamento da convulsão por hiponatremia no ecstasy é NACL 3% EM BOLUS (100 a 150 mL)!'
      },
      {
        trapTitle: 'USAR CONTENÇÃO FÍSICA NO LEITO SEM SEDAÇÃO FARMACOLÓGICA IMEDIATA',
        explanation: 'O paciente agitado por simpatomiméticos luta com força descomunal contra as amarras mecânicas.',
        consequence: 'Essa contração isométrica violenta destrói a musculatura em poucos minutos, causando hipertermia fulminante de 42 °C, hipercalemia aguda e rabdomiólise com parada cardíaca súbita. SEDE PRIMEIRO COM DIAZEPAM!'
      }
    ],
    differentials: [
      {
        condition: 'Síndrome Anticolinérgica',
        firstLineGold: 'Teste clínico da sudorese (Toque nas axilas e palmas)',
        secondLineConfirm: 'Palpação do hipogástrio (presença de bexigoma)',
        keyDiscriminator: 'O paciente simpatomimético está encharcado de suor; o anticolinérgico é totalmente anidrótico com pele seca.'
      },
      {
        condition: 'Crise de Tireotoxicose / Tempestade Tireoidiana',
        firstLineGold: 'Dosagem de TSH (suprimido) e T4 Livre / T3 totais',
        secondLineConfirm: 'Escore de Burch-Wartofsky',
        keyDiscriminator: 'A crise tireotoxica cursa com bócio ou histórico de Graves, enquanto a simpatomimética responde quase que instantaneamente a doses generosas de Benzodiazepínicos.'
      },
      {
        condition: 'Feocromocitoma em Crise Paroxística',
        firstLineGold: 'Metanefrinas livres plasmáticas ou fracionadas na urina 24h',
        secondLineConfirm: 'TC ou Ressonância de adrenais',
        keyDiscriminator: 'Paroxismos de cefaleia pulsátil, sudorese e palpitações sem história de uso de substâncias ilícitas.'
      }
    ]
  },

  // 5. SÍNDROME SEDATIVO-HIPNÓTICA
  sedativo: {
    id: 'sedativo',
    name: 'Síndrome Sedativo-Hipnótica',
    subtitle: 'Depressão Progressiva e Linear do SNC por Modulação Positiva Gabaérgica',
    categoryBadge: 'Agonistas e Moduladores GABA-A',
    accentColor: 'text-slate-300',
    glowColor: 'bg-slate-400',
    badgeBg: 'bg-slate-800/40',
    badgeBorder: 'border-slate-600/50',
    offenders: [
      'Benzodiazepínicos (Diazepam, Clonazepam, Alprazolam, Midazolam, Lorazepam)',
      'Barbitúricos (Fenobarbital, Tiopental)',
      'Hipnóticos não-benzodiazepínicos / Drogas Z (Zolpidem, Zopiclona, Eszopiclona)',
      'Etanol (Álcool Etílico em intoxicação aguda grave)',
      'Ácido Gama-Hidroxibutírico (GHB) e Baclofeno'
    ],
    receptorsInvolved: [
      'Receptor GABA-A (Abertura de canais de cloreto e hiperpolarização)',
      'Inibição de receptores excitatórios NMDA / Glutamato (Etanol e Barbitúricos)',
      'Receptores GABAB (Baclofeno e GHB)'
    ],
    summaryMnemonic: 'The "Everything Down" Syndrome com Pupilas Normais',
    summaryMnemonicDescription: 'Queda progressiva do nível de consciência, fala empastada (disartria), ataxia de marcha, bradipsiquismo e reflexos hipoativos com PUPILAS DE TAMANHO NORMAL.',
    vitals: {
      heartRate: 62,
      heartRateText: 'Frequência Cardíaca Normal a Levemente Bradicárdica (55 - 65 bpm)',
      bloodPressure: '105/65 mmHg (Hipotensão leve por relaxamento vascular central)',
      respiratoryRate: 12,
      respiratoryRateText: 'Frequência Respiratória normal ou levemente deprimida (10-14 irpm)',
      temperature: 36.0,
      temperatureText: 'Normotermia ou hipotermia leve por imobilidade prolongada',
      oxygenSat: 95,
      oxygenSatText: 'SpO2 preservada no BZD isolado (cai se houver coingestão com álcool/opioide)',
      glucose: '92 mg/dL',
      ecgPattern: 'normal',
      ecgDescription: 'Ritmo sinusal estável sem alterações de condução ou repolarização.'
    },
    pupil: {
      sizeMm: 3.5,
      type: 'normal',
      label: 'Pupilas Médias e Fotorreativas (Tamanho Normal)',
      description: 'Pupilas de 3 a 4 mm, simétricas, com reflexo fotomotor e consensual perfeitamente preservados.',
      lightReflex: 'Normal e perfeitamente reativo à luz (Discriminador chave frente ao opioide)'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Nível de Consciência',
        status: 'Sonolência progressiva, disartria ("fala arrastada"), ataxia, estupor ou coma',
        shortDesc: 'O paciente afunda linearmente: sedação leve -> sono profundo -> coma arreflexo.',
        detailedMechanisms: 'Aumento da frequência de abertura (BZD) ou do tempo de abertura (Barbitúricos) dos canais de Cloreto ativados por GABA.',
        clinicalPearls: 'O paciente com overdose isolada de Benzodiazepínico raramente morre se a via aérea estiver posicionada e protegida contra broncoaspiração.',
        severity: 'warning'
      },
      eyes: {
        id: 'eyes',
        label: 'Pupilas (O Grande Discriminador)',
        status: 'Pupilas de tamanho médio e fotorreativas (sem miose extrema nem midríase)',
        shortDesc: 'A via pupilar autônoma é preservada na modulação gabaérgica moderada.',
        detailedMechanisms: 'Diferente dos opioides (que ativam o núcleo de Edinger-Westphal) e anticolinérgicos (que paralisam o esfíncter), o BZD não altera os núcleos pupilares.',
        clinicalPearls: 'Se o paciente está em coma com pupila puntiforme: pense em OPIOIDE. Se está em coma com pupila normal: pense em BENZODIAZEPÍNICO.',
        severity: 'info'
      },
      skin: {
        id: 'skin',
        label: 'Pele & Temperatura',
        status: 'Pele quente ou discretamente fria, normoidratada, sem diaforese profusa nem anidrose',
        shortDesc: 'Ausência de distúrbios da sudorese; risco de úlceras de pressão e rabdomiólise postural.',
        detailedMechanisms: 'Imobilidade prolongada no mesmo decúbito por horas comprime grupos musculares.',
        clinicalPearls: 'Em idosos caídos por horas após tomar zolpidem ou clonazepam, sempre dosar CPK para afastar rabdomiólise por decúbito.',
        severity: 'info'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular',
        status: 'Estabilidade hemodinâmica na imensa maioria das vezes; hipotensão leve se desidratado',
        shortDesc: 'Mínimo efeito inotrópico negativo direto dos benzodiazepínicos isolados.',
        detailedMechanisms: 'Leve diminuição do tônus vasomotor simpático central com vasodilatação modesta.',
        clinicalPearls: 'Se houver choque circulatório profundo com BZD, procure COINGESTÃO (ex: Anti-hipertensivos, betabloqueadores, tricíclicos ou sepse associada).',
        severity: 'info'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório',
        status: 'Eupneia ou bradipneia discreta; vias aéreas limpas de secreções patológicas',
        shortDesc: 'BZD isolado raramente causa apneia fatal em adultos hígidos.',
        detailedMechanisms: 'A depressão do drive ventilatório se torna crítica quando o BZD é combinado com ÁLCOOL ou OPIOIDES (efeito sinérgico multiplicador).',
        clinicalPearls: 'O maior risco no BZD isolado não é a parada respiratória primária, mas a BRONCOASPIRAÇÃO do vômito por perda dos reflexos da via aérea.',
        severity: 'warning'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal',
        status: 'Peristalse normal a discretamente lentificada, sem bexigoma palpável',
        shortDesc: 'Função entérica preservada sem espasmos ou diarreias.',
        detailedMechanisms: 'A modulação GABA-A central tem pouco impacto sobre os plexos de Meissner e Auerbach periféricos.',
        clinicalPearls: 'Não causa retenção urinária aguda exuberante como na síndrome anticolinérgica.',
        severity: 'info'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Tônus Muscular & Reflexos',
        status: 'Hipotonia muscular generalizada, reflexos osteotendíneos diminuídos (hiporreflexia)',
        shortDesc: 'Relaxamento muscular central por ação gabaérgica nos circuitos motores espinhais.',
        detailedMechanisms: 'Diminuição dos reflexos miotáticos sem rigidez, sem clônus e sem fasciculações.',
        clinicalPearls: 'A hipotonia associada ao relaxamento da musculatura faríngea causa roncos e oclusão mecânica da glote pela base da língua.',
        severity: 'warning'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Os benzodiazepínicos se ligam a sítios alostéricos específicos na interface alfa/gama do receptor GABA-A pentamérico, aumentando a frequência de abertura do canal de cloro em resposta ao GABA endógeno.',
      keyPoints: [
        'Os Barbitúricos são muito mais perigosos: eles aumentam o tempo de abertura do canal e, em altas doses, abrem o canal de cloro DIRETAMENTE mesmo sem a presença de GABA (efeito gaba-mimético puro com parada respiratória fatal).',
        'O Zolpidem atua seletivamente na subunidade alfa-1 do GABA-A (efeito hipnótico puro com menor ação miorrelaxante e anticonvulsivante).',
        'A coingestão com etanol potencia drasticamente a condutância gabaérgica e inibe o receptor excitatório NMDA, precipitando coma profundo.'
      ],
      metabolismAndHalfLife: 'Drogas de meia-vida longa (Diazepam e Clonazepam) possuem metabólitos ativos que podem manter idosos sonolentos por vários dias.'
    },
    diagnosticCriteria: {
      name: 'Perfil Clínico Sedativo-Hipnótico',
      description: 'Presença de depressão escalonada do sensório sem sinais autonômicos agressivos:',
      items: [
        '1. Depressão progressiva da consciência (sonolência -> torpor -> coma)',
        '2. Pupilas de diâmetro normal (3-4 mm) e fotorreativas à luz',
        '3. Sinais vitais com estabilidade hemodinâmica (sem taqui ou bradicardia extrema)',
        '4. Fala arrastada (disartria) e ataxia de marcha se acordado',
        '5. Hipotonia e hiporreflexia global sem rigidez ou fasciculações'
      ]
    },
    antidoteProtocol: {
      drug: 'Flumazenil (USO ALTAMENTE RESTRITO E EXCEPCIONAL)',
      brandName: 'Lanexat / Flumazenil 0.1 mg/mL',
      class: 'Antagonista Competitivo Puro do Sítio Benzodiazepínico no GABA-A',
      mechanism: 'Desaloja os benzodiazepínicos e drogas Z do sítio alostérico do receptor GABA-A em 1 a 2 minutos.',
      attackDose: 'Adultos: 0.2 mg EV administrados em 30 segundos. Se não houver despertar após 1 minuto, administrar 0.3 mg, depois 0.5 mg a cada minuto até dose cumulativa de 3 mg.',
      maintenanceDose: 'Geralmente não recomendada. A meia-vida do flumazenil é extremamente curta (~40 a 60 minutos), causando ressedação rápida.',
      therapeuticEndpoint: 'Restauração do drive respiratório em paciente sem uso crônico e sem risco de convulsão.',
      adverseEffectsAlert: 'CRÍTICO: Precipitação imediata de STATUS CONVULSIVO REFRATÁRIO E MORTE em usuários crônicos de BZD ou epilépticos!'
    },
    prohibitedTraps: [
      {
        trapTitle: 'O PERIGO MORTAL DO FLUMAZENIL EM ADULTOS NO PRONTO-SOCORRO',
        explanation: 'A grande maioria dos adultos com overdose de BZD são usuários crônicos para ansiedade, insônia ou têm coingestão de antidepressivos/antipsicóticos.',
        consequence: 'Ao infundir Flumazenil, você remove o freio gabaérgico protetor de um cérebro dependente. O paciente deflagra ESTADO DE MAL CONVULSIVO IRRESPONSIVO a outros BZDs. Como os receptores estão ocupados pelo flumazenil, você não consegue abortar a crise com diazepam e o paciente pode falecer ou ter dano cerebral permanente. NA DÚVIDA, SUPORTE CLÍNICO E NÃO USE FLUMAZENIL!'
      },
      {
        trapTitle: 'ESQUECER DE PROTEGER A VIA AÉREA DE UM PACIENTE EM DECÚBITO DORSAL HORIZONTAL',
        explanation: 'A hipotonia muscular e a perda dos reflexos da deglutição favorecem a regurgitação gástrica passiva.',
        consequence: 'Broncoaspiração maciça de conteúdo gástrico com pneumonia aspirativa química grave e óbito tardio por SDRA na UTI. Manter cabeceira elevada a 30° ou decúbito lateral de segurança se não intubado!'
      }
    ],
    differentials: [
      {
        condition: 'Intoxicação por Opioides',
        firstLineGold: 'Avaliação das pupilas com lanterna clínica',
        secondLineConfirm: 'Prova terapêutica com Naloxona',
        keyDiscriminator: 'No opioide há MIOSE PUNTIFORME (< 1.5 mm) e bradipneia crítica (< 8 irpm); no BZD a pupila tem tamanho normal (3-4 mm).'
      },
      {
        condition: 'Acidente Vascular Cerebral (AVC) Isquêmico de Tronco ou Hemisférico',
        firstLineGold: 'Tomografia de Crânio imediata sem contraste',
        secondLineConfirm: 'Angio-TC de vasos cerebrais e difusão por RM',
        keyDiscriminator: 'O AVC cursa com déficits neurológicos focais assimétricos (hemiparesia, desvio de rima, afasia), enquanto a intoxicação é global e simétrica.'
      },
      {
        condition: 'Hipoglicemia Severa (Neuroglicopenia)',
        firstLineGold: 'Glicemia capilar imediata à beira-leito (Dextro)',
        secondLineConfirm: 'Glicemia plasmática laboratorial',
        keyDiscriminator: 'Glicemia capilar < 50 mg/dL reverte instantaneamente com glicose a 50% EV.'
      }
    ]
  },

  // 6. SÍNDROME SEROTONINÉRGICA
  serotoninergica: {
    id: 'serotoninergica',
    name: 'Síndrome Serotoninérgica',
    subtitle: 'Hiperestimulação Central e Periférica de Receptores 5-HT1A e 5-HT2A',
    categoryBadge: 'Agonistas Serotoninérgicos / ISRS & IMAO',
    accentColor: 'text-indigo-400',
    glowColor: 'bg-indigo-500',
    badgeBg: 'bg-indigo-950/40',
    badgeBorder: 'border-indigo-600/50',
    offenders: [
      'ISRS (Fluoxetina, Sertralina, Escitalopram, Paroxetina, Citalopram)',
      'IRSN (Venlafaxina, Duloxetina, Desvenlafaxina)',
      'IMAOs (Tranilcipromina, Moclobemida, Selegilina, Linezolida, Azul de Metileno)',
      'Antidepressivos Tricíclicos (Clomipramina)',
      'Opioides com ação serotoninérgica (Tramadol, Meperidina, Fentanil, Metadona)',
      'Drogas ilícitas estimulantes (MDMA / Ecstasy, LSD, Cocaína)',
      'Triptanos e fitoterápicos (Erva de São João / Hypericum perforatum)'
    ],
    receptorsInvolved: [
      'Hiperativação de receptores 5-HT2A (termorregulação, tônus vascular e neuromuscular)',
      'Receptores 5-HT1A (ansiedade, motilidade gastrointestinal e resposta autonômica)',
      'Receptores 5-HT3 no TGI e tronco (náuseas e diarreia profusa)'
    ],
    summaryMnemonic: 'Critérios de Hunter & A Tríade de Sternbach',
    summaryMnemonicDescription: 'Tríade: 1. Alteração do Estado Mental + 2. Instabilidade Autonômica + 3. Hiperatividade Neuromuscular com CLÔNUS (Patognomônico espontâneo, induzido ou ocular) e hiperreflexia.',
    vitals: {
      heartRate: 130,
      heartRateText: 'Taquicardia Sinusal Rápida (115 - 150 bpm)',
      bloodPressure: '165/100 mmHg (Hipertensão lábil e oscilante)',
      respiratoryRate: 24,
      respiratoryRateText: 'Taquipneia por calor retido e acidose láctica metabólica',
      temperature: 39.5,
      temperatureText: 'Hipertermia Marcada (> 38.5 °C a > 41 °C nas formas letais)',
      oxygenSat: 95,
      oxygenSatText: 'Normosaturação ou queda se houver rigidez torácica / espasmo',
      glucose: '120 mg/dL',
      ecgPattern: 'sinus_tachycardia',
      ecgDescription: 'Taquicardia sinusal; atentar para prolongamento de QTc se associado a escitalopram ou citalopram.'
    },
    pupil: {
      sizeMm: 6.5,
      type: 'midriase_reativa',
      label: 'Midríase Bilateral Moderada a Acentuada',
      description: 'Pupilas dilatadas associadas frequentemente a CLÔNUS OCULAR (movimentos sacádicos rítmicos conjugados dos olhos).',
      lightReflex: 'Preservado com resposta parcial'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Estado Mental',
        status: 'Agitação psicomotora, ansiedade súbita, desorientação, euforia e confusão mental',
        shortDesc: 'Início tipicamente AGUDO e súbito (< 12 a 24 horas após introdução ou aumento de dose).',
        detailedMechanisms: 'A hiperativação de receptores 5-HT nos núcleos da rafe e córtex frontal desencadeia inquietude motora (acatisia intensa) e delírio febril.',
        clinicalPearls: 'O paciente fica agitado e trêmulo poucas horas após tomar a medicação, diferindo da SNM que demora dias ou semanas para se instalar.',
        severity: 'critical'
      },
      eyes: {
        id: 'eyes',
        label: 'Olhos & Clônus Ocular (Sinal Chave)',
        status: 'Midríase fotorreativa + Clônus Ocular espontâneo ou induzido',
        shortDesc: 'Oscilações oculares rápidas e involuntárias ao acompanhar o dedo do examinador.',
        detailedMechanisms: 'O desbalanço 5-HT nos núcleos oculomotores do mesencéfalo desregula o controle sacádico da fixação visual.',
        clinicalPearls: 'Pesquise ativamente o CLÔNUS OCULAR pedindo para o paciente olhar para o lado. Movimentos espasmódicos rítmicos dos olhos fecham o diagnóstico!',
        severity: 'critical'
      },
      skin: {
        id: 'skin',
        label: 'Pele & Sudorese',
        status: 'Diaforese profusa intensa ("suor escorrendo"), pele quente e hiperemiada',
        shortDesc: 'Termogênese excessiva combinada a sudorese abundante mediada por receptores 5-HT2A.',
        detailedMechanisms: 'Diferente da anticolinérgica (que é seca), na serotoninérgica a pele é francamente ENCHARCADA e quente.',
        clinicalPearls: 'A hipertermia acima de 40 °C associada à rigidez muscular em membros inferiores indica risco iminente de óbito por rabdomiólise e CIVD.',
        severity: 'critical'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular',
        status: 'Taquicardia sinusal, pressão arterial lábil com picos hipertensivos rápidos',
        shortDesc: 'Flutuação autonômica central com ativação simpática adrenérgica secundária.',
        detailedMechanisms: 'A serotonina modula o tônus vascular periférico e a contratilidade miocárdica de forma dinâmica.',
        clinicalPearls: 'Arritmias supraventriculares e taquicardia sinusal respondem muito bem ao controle da agitação com Benzodiazepínicos.',
        severity: 'warning'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório',
        status: 'Taquipneia, respiração rápida e superficial; risco de rigidez torácica em casos graves',
        shortDesc: 'Hiperventilação para tentar dissipar calor e compensar a acidose metabólica muscular.',
        detailedMechanisms: 'A rigidez muscular grave nas formas fulminantes pode comprometer a expansão da caixa torácica e exigir IOT imediata.',
        clinicalPearls: 'Sempre auscultar os pulmões para descartar broncoaspiração se houver rebaixamento da consciência.',
        severity: 'warning'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal',
        status: 'Hiperperistaltismo com RHA em tempestade, diarreia aquosa profusa e náuseas',
        shortDesc: 'O trato gastrointestinal contém 90% da serotonina do organismo humano.',
        detailedMechanisms: 'A hiperestimulação de receptores 5-HT3 e 5-HT4 no plexo submucoso acelera drasticamente o trânsito intestinal e a secreção eletrolítica.',
        clinicalPearls: 'A presença de DIARREIA AQUOSA é um discriminador valiosíssimo para afastar a Síndrome Neuroléptica Maligna (que cursa sem diarreia).',
        severity: 'warning'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Tônus Neuromuscular (A Marca Registrada da Doença)',
        status: 'CLÔNUS (espontâneo, induzido ou ocular), Hiperreflexia patelar, Rigidez de MMII > MMSS',
        shortDesc: 'CLÔNUS INDUZIDO OU ESPONTÂNEO É O ACHADO MAIS IMPORTANTE DE TODO O EXAME FÍSICO!',
        detailedMechanisms: 'Diferente da rigidez uniforme em "cano de chumbo" da SNM, a serotoninérgica causa HIPERREFLEXIA e clônus marcados com predomínio nítido nos membros inferiores.',
        clinicalPearls: 'Teste a dorsiflexão rápida do pé do paciente: se o pé oscilar repetidamente em clônus inesgotável (> 4-5 batimentos), o diagnóstico de Síndrome Serotoninérgica está praticamente firmado pelos Critérios de Hunter!',
        severity: 'critical'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Superativação dos receptores pós-sinápticos 5-HT1A e 5-HT2A nos núcleos da base e na medula espinhal, geralmente desencadeada por combinação sinérgica de dois ou mais fármacos com mecanismos diferentes (ex: ISRS + Tramadol, ou ISRS + Linezolida).',
      keyPoints: [
        'A Linezolida (antibiótico para MRSA) e o Azul de Metileno são potentes inibidores da Monoaminoxidase (IMAO) não reconhecidos e provocam desastres quando prescritos com antidepressivos.',
        'Instalação hiperaguda (< 24h) em 75% dos casos, contrastando com a instalação subaguda de dias da Síndrome Neuroléptica Maligna.',
        'O Clônus é o achado com maior sensibilidade e especificidade nos Critérios de Hunter.'
      ],
      metabolismAndHalfLife: 'Drogas como a Fluoxetina e seu metabólito Norfluoxetina têm meia-vida de eliminação de até 1 a 2 semanas, mantendo risco de síndrome se associadas precocemente a IMAOs sem intervalo de washout (período de limpeza).'
    },
    diagnosticCriteria: {
      name: 'Critérios de Toxicidade de Hunter (Padrão-Ouro)',
      description: 'Na presença de um agente serotoninérgico, o paciente tem Síndrome Serotoninérgica se apresentar QUALQUER um dos seguintes:',
      items: [
        '1. Clônus espontâneo presente',
        '2. Clônus induzível + Agitação psicomotora OU Diaforese profusa',
        '3. Clônus ocular + Agitação psicomotora OU Diaforese profusa',
        '4. Tremor generalizado + Hiperreflexia tendinosa',
        '5. Hipertonia muscular + Temperatura > 38.0 °C + Clônus ocular OU Clônus induzível'
      ]
    },
    antidoteProtocol: {
      drug: 'Cloridrato de Ciproeptadina + Benzodiazepínicos EV',
      brandName: 'Periactin / Ciproeptadina 4 mg comprimidos',
      class: 'Antagonista Não-Seletivo dos Receptores de Serotonina (5-HT1A e 5-HT2A)',
      mechanism: 'Bloqueia diretamente os receptores serotoninérgicos centrais e periféricos hiperativados.',
      attackDose: 'Inicial: 12 mg VO ou por Sonda Nasogástrica triturado (em crianças: 0.25 mg/kg). Se não houver melhora clínica, administrar mais 2 mg a cada 2 horas.',
      maintenanceDose: 'Manutenção: 8 mg a cada 6 horas por 24 a 48 horas até cessação completa dos sintomas e do clônus.',
      therapeuticEndpoint: 'Desaparecimento do clônus, normalização da temperatura corporal (< 37.5 °C) e resolução do delirium e da hiperreflexia.',
      adverseEffectsAlert: 'Efeito sedativo e anticolinérgico leve da ciproeptadina; só existe disponível em formulação oral/enteral.'
    },
    prohibitedTraps: [
      {
        trapTitle: 'USAR CONTENÇÃO FÍSICA NO PACIENTE COM CLÔNUS E AGITAÇÃO',
        explanation: 'A musculatura com clônus contínuo lutando contra faixas mecânicas no leito gera atrito térmico celular violento.',
        consequence: 'Elevação fulminante da temperatura corporal para > 41 °C, rabdomiólise hiperaguda e parada cardiorrespiratória. CONTER SEMPRE COM BENZODIAZEPÍNICOS (Diazepam 10 mg EV)!'
      },
      {
        trapTitle: 'NÃO RECONHECER O EFEITO IMAO DA LINEZOLIDA OU DO AZUL DE METILENO',
        explanation: 'Prescrever linezolida para paciente internado que já usa escitalopram ou sertralina sem suspender o antidepressivo.',
        consequence: 'Síndrome serotoninérgica fulminante em enfermaria cirúrgica ou UTI em menos de 12 horas da primeira dose do antimicrobiano!'
      },
      {
        trapTitle: 'USAR ANTIPIRÉTICOS COMUNS (DIPIRONA / PARACETAMOL) ACHANDO QUE É FEBRE COMUM',
        explanation: 'A hipertermia serotoninérgica NÃO é mediada pelo centro termorregulador hipotalâmico via prostaglandinas (não é febre infecciosa).',
        consequence: 'Dipirona e Paracetamol são 100% ineficazes. O resfriamento DEVE ser físico ativo (gelo em axilas/virilhas, infusão de SF gelado a 4 °C e relaxamento muscular com Diazepam ou IOT + Vecurônio nos casos extremos)!'
      }
    ],
    differentials: [
      {
        condition: 'Síndrome Neuroléptica Maligna (SNM)',
        firstLineGold: 'Pesquisa de Clônus e Hiperreflexia vs Rigidez em Cano de Chumbo',
        secondLineConfirm: 'Tempo de instalação (horas na 5-HT vs dias na SNM) + CPK sérica',
        keyDiscriminator: 'A Serotoninérgica cursa com CLÔNUS, hiperreflexia, diarreia e início agudo; a SNM cursa com rigidez em cano de chumbo, hiporreflexia e CPK extrema (> 10.000).'
      },
      {
        condition: 'Malignant Hyperthermia (Hipertermia Maligna Anestésica)',
        firstLineGold: 'História recente de exposição a Halotano/Isoflurano ou Succinilcolina em centro cirúrgico',
        secondLineConfirm: 'Gasometria arterial com acidose mista fulminante',
        keyDiscriminator: 'Ocorre no intraoperatório imediato, com espasmo massivo do masseter e sem uso prévio de psicofármacos.'
      },
      {
        condition: 'Sepse Grave / Choque Séptico com Encefalopatia',
        firstLineGold: 'Hemoculturas + Procalcitonina / PCR + Lactato',
        secondLineConfirm: 'Urina I, RX de tórax e busca de foco infeccioso',
        keyDiscriminator: 'Na sepse há foco infeccioso evidente, ausência de clônus ocular ou reflexo e ausência de história de drogas serotoninérgicas.'
      }
    ]
  },

  // 7. SÍNDROME NEUROLÉPTICA MALIGNA (SNM)
  neuroleptica: {
    id: 'neuroleptica',
    name: 'Síndrome Neuroléptica Maligna',
    subtitle: 'Bloqueio Dopaminérgico Central Maciço em Vias Nigroestriatais e Hipotalâmicas',
    categoryBadge: 'Bloqueadores Dopaminérgicos D2 / Antipsicóticos',
    accentColor: 'text-orange-400',
    glowColor: 'bg-orange-500',
    badgeBg: 'bg-orange-950/40',
    badgeBorder: 'border-orange-600/50',
    offenders: [
      'Antipsicóticos Típicos de Alta Potência (Haloperidol, Flufenazina, Zuclopentixol)',
      'Antipsicóticos Típicos de Baixa Potência (Clorpromazina, Levomepromazina)',
      'Antipsicóticos Atípicos (Olanzapina, Risperidona, Quetiapina, Clozapina, Aripiprazol)',
      'Antieméticos e Procinéticos com bloqueio D2 (Metoclopramida / Plasil, Bromoprida)',
      'Retirada ABRUPTA de agonistas dopaminérgicos em pacientes com Parkinson (Levodopa, Pramipexol, Amantadina)'
    ],
    receptorsInvolved: [
      'Bloqueio agudo/subagudo dos receptores de Dopamina D2 no corpo estriado',
      'Desregulação dos receptores D2 nos núcleos pré-ópticos do hipotálamo anterior',
      'Desinibição simpática periférica e desacoplamento do retículo sarcoplasmático muscular'
    ],
    summaryMnemonic: 'Os 4 Pilares da SNM (Critérios de Levenson)',
    summaryMnemonicDescription: '1. Rigidez em "Cano de Chumbo" (Lead-pipe) generalizada + 2. Hipertermia Maligna (> 38.5 a > 40 °C) + 3. Alteração do Estado Mental (Estupor/Mutismo) + 4. Instabilidade Autonômica com CPK estratosférica (> 10.000 a 100.000 U/L).',
    vitals: {
      heartRate: 125,
      heartRateText: 'Taquicardia Sinusal Marcada (110 - 140 bpm)',
      bloodPressure: '170/105 mmHg (PA extremamente lábil com picos e vales bruscos)',
      respiratoryRate: 26,
      respiratoryRateText: 'Taquipneia e respiração restritiva pela rigidez da parede torácica',
      temperature: 40.2,
      temperatureText: 'Hipertermia Extrema (frequentemente > 40 °C por termogênese rígida)',
      oxygenSat: 92,
      oxygenSatText: 'Hipoxemia por restrição ventilatória e atelectasias de base',
      glucose: '135 mg/dL',
      ecgPattern: 'sinus_tachycardia',
      ecgDescription: 'Taquicardia sinusal intensa; atenção para hipercalemia associada a rabdomiólise com ondas T apiculadas em tenda.'
    },
    pupil: {
      sizeMm: 3.5,
      type: 'normal',
      label: 'Pupilas Normais a Levemente Preguiçosas',
      description: 'Pupilas simétricas sem midríase extrema nem miose puntiforme, com reflexo fotomotor preservado.',
      lightReflex: 'Preservado (sem clônus ocular nem paralisia pupilar)'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Nível de Consciência',
        status: 'Instalação INSIDIOSA (dias a semanas), evoluindo de letargia para estupor, mutismo e coma',
        shortDesc: 'O paciente fica catatônico, imóvel e não responde a estímulos verbais ("mutismo acinético").',
        detailedMechanisms: 'O bloqueio dopaminérgico mesocortical e estriatal aniquila a iniciativa motora e cognitiva voluntária.',
        clinicalPearls: 'DIFERENÇA CRÍTICA: A SNM se instala lentamente em 3 a 7 dias após o antipsicótico; a Serotoninérgica instala-se subitamente em menos de 24 horas.',
        severity: 'critical'
      },
      eyes: {
        id: 'eyes',
        label: 'Pupilas & Movimentação Ocular',
        status: 'Pupilas de tamanho normal ou discretamente dilatadas, reflexo à luz preservado, SEM clônus ocular',
        shortDesc: 'Ausência dos movimentos sacádicos rítmicos vistos na síndrome serotoninérgica.',
        detailedMechanisms: 'O sistema autonômico pupilar direto sofre pouca interferência pelo bloqueio dopaminérgico D2 puro.',
        clinicalPearls: 'A ausência de clônus ocular ajuda a afastar síndrome serotoninérgica.',
        severity: 'info'
      },
      skin: {
        id: 'skin',
        label: 'Pele, Mucosas & Sudorese',
        status: 'Diaforese intensa encharcada, palidez cutânea e calor extremo ao toque',
        shortDesc: 'Pele transpirando abundantemente na tentativa ineficaz de dissipar o calor extremo.',
        detailedMechanisms: 'A hipertermia decorre do descalibramento do termostato hipotalâmico (bloqueio D2) somado ao atrito da contração muscular ininterrupta.',
        clinicalPearls: 'A hipertermia é resistente a antitérmicos comuns. O resfriamento físico imediato é obrigatório.',
        severity: 'critical'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular & Estabilidade Hemodinâmica',
        status: 'Instabilidade autonômica extrema: PA lábil (oscilação de 190/110 para 80/50 em horas) e taquicardia',
        shortDesc: 'Desregulação do controle cardiovascular central do tronco cerebral.',
        detailedMechanisms: 'Flutuação intensa das catecolaminas plasmáticas secundária à perda da inibição dopaminérgica central.',
        clinicalPearls: 'Monitorização contínua invasiva de pressão arterial (PAI) em leito de UTI é altamente recomendada.',
        severity: 'critical'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório',
        status: 'Respiração restritiva superficial, hipoventilação por rigidez dos músculos intercostais',
        shortDesc: 'A rigidez em cano de chumbo endurece o tórax, dificultando a mecânica ventilatória.',
        detailedMechanisms: 'Risco altíssimo de atelectasias pulmonares, hipoxemia e pneumonia aspirativa associada ao mutismo e coma.',
        clinicalPearls: 'Indicação precoce de Intubação Orotraqueal (IOT) para controle ventilatório e proteção de via aérea.',
        severity: 'critical'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal & Renal',
        status: 'Peristalse lentificada, sem diarreia; falência renal aguda mioglobinúrica (urina escura cor de coca-cola)',
        shortDesc: 'DIFERENÇA: Ausência de diarreia (presente na serotoninérgica); risco iminente de necrose tubular renal.',
        detailedMechanisms: 'A mioglobina maciça liberada pelos músculos rígidos precipita nos túbulos renais na presença de urina ácida.',
        clinicalPearls: 'Urina marrom-escura + fita reagente positiva para sangue com sedimento urinário sem hemácias = MIOGLOBINÚRIA POR RABDOMIÓLISE.',
        severity: 'critical'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Tônus Muscular & Exames Laboratoriais (O Sinal Cardinal)',
        status: 'RIGIDEZ GENERALIZADA EM "CANO DE CHUMBO" (Lead-pipe), Hiporreflexia tendinosa e CPK > 10.000 - 100.000',
        shortDesc: 'Resistência plástica firme e uniforme durante toda a movimentação passiva das articulações.',
        detailedMechanisms: 'Bloqueio estriatal de D2 libera vias colinérgicas motoras espinhais gerando contração tetânica contínua de agonistas e antagonistas simultaneamente.',
        clinicalPearls: 'DIFERENÇA CHAVE: Na SNM os reflexos são HIPORREATIVOS (diminuídos) e a rigidez é uniforme em cano de chumbo. Na Serotoninérgica há HIPERREFLEXIA e CLÔNUS com rigidez em membros inferiores.',
        severity: 'critical'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Antagonismo maciço dos receptores dopaminérgicos D2 nos núcleos da base (via nigroestriatal) provocando rigidez extrema, e no hipotálamo anterior provocando hipertermia e disautonomia.',
      keyPoints: [
        'Acontece tanto com antipsicóticos típicos (Haldol) quanto com atípicos (Olanzapina, Risperidona) e antieméticos (Plasil).',
        'Pode ocorrer de forma idêntica pela SUSPENSÃO BRUSCA de Levodopa em pacientes parkinsonianos (Síndrome Semelhante à SNM por privação de dopamina).',
        'A elevação de CPK (frequentemente > 10.000 a 100.000 U/L) associada à leucocitose neutrofílica importante (15.000 a 30.000 /mm³) é a marca laboratorial típica.'
      ],
      metabolismAndHalfLife: 'Formas causadas por antipsicóticos de depósito (depot) como Decanoato de Haloperidol podem demorar semanas para resolução completa.'
    },
    diagnosticCriteria: {
      name: 'Critérios Diagnósticos de Levenson para SNM',
      description: 'Presença de 3 critérios maiores OU 2 maiores + 4 menores:',
      items: [
        'Critérios MAIORES: 1. Hipertermia central (> 38.5 °C) | 2. Rigidez muscular severa em "cano de chumbo" | 3. Elevação maciça de CPK sérica',
        'Critérios MENORES: 1. Taquicardia | 2. Pressão arterial anormal / lábil | 3. Taquipneia | 4. Alteração do sensório (estupor/coma) | 5. Diaforese profusa | 6. Leucocitose importante'
      ]
    },
    antidoteProtocol: {
      drug: 'Dantrolene Sódico + Agonistas Dopaminérgicos (Bromocriptina / Amantadina)',
      brandName: 'Dantrisan / Dantrolene 20 mg frasco-ampola | Parlodel (Bromocriptina)',
      class: 'Relaxante Muscular Periférico de Ação Direta + Agonista Dopaminérgico Central',
      mechanism: 'O Dantrolene bloqueia os canais de rianodina (RyR1) no retículo sarcoplasmático do músculo esquelético, inibindo a liberação de cálcio e cessando a contração rígida e a termogênese. A Bromocriptina reativa os receptores D2 centrais no hipotálamo e corpo estriado.',
      attackDose: 'Dantrolene: 1 a 2.5 mg/kg EV em bolus rápido imediato (em paciente de 70 kg: cerca de 70 a 175 mg). Repetir se necessário até dose máxima cumulativa de 10 mg/kg.',
      maintenanceDose: 'Bromocriptina: 2.5 a 5 mg via sonda nasogástrica a cada 8 horas, podendo ser titulada até 20-30 mg/dia. Associar Diazepam EV para controle do estresse autonômico.',
      therapeuticEndpoint: 'Relaxamento muscular evidente, queda da temperatura corporal para < 38.0 °C e estabilização da pressão arterial.',
      adverseEffectsAlert: 'Dantrolene em altas doses pode causar hepatotoxicidade aguda (monitorar transaminases hepáticas) e fraqueza da musculatura respiratória ventilatória.'
    },
    prohibitedTraps: [
      {
        trapTitle: 'NUNCA USAR SUCCINILCOLINA SE FOR INTUBAR O PACIENTE',
        explanation: 'O músculo esquelético está em estado hipermetabólico com rabdomiólise ativa.',
        consequence: 'A succinilcolina despolarizante causará liberação fulminante maciça de Potássio celular para o sangue, gerando HIPERCALEMIA AGUDA COM PARADA CARDÍACA EM FIBRILAÇÃO VENTRICULAR NA INDUÇÃO ANESTÉSICA. Utilize ROCURÔNIO!'
      },
      {
        trapTitle: 'REINTRODUZIR O ANTIPSICÓTICO PRECOCEMENTE APÓS A MELHORA',
        explanation: 'Os receptores D2 continuam hipersensíveis e o fármaco residual pode ainda estar presente nos tecidos.',
        consequence: 'Recidiva imediata fatal da síndrome. Aguardar no mínimo 2 a 3 semanas após a resolução completa da febre e normalização da CPK antes de considerar reintrodução cautelosa com agente atípico de baixa potência (Quetiapina) em microdoses.'
      },
      {
        trapTitle: 'NÃO HIDRATAR AGRESSIVAMENTE O PACIENTE COM MEDO DE HIPERVOLEMIA',
        explanation: 'A mioglobina liberada em urina ácida obstrui e destrói os néfrons renais.',
        consequence: 'Insuficiência renal aguda anúrica com necessidade de hemodiálise de urgência. Hidratar com cristaloides para manter débito urinário > 2 mL/kg/h e alcalinizar a urina com bicarbonato de sódio se pH urinário < 6.5!'
      }
    ],
    differentials: [
      {
        condition: 'Síndrome Serotoninérgica',
        firstLineGold: 'Pesquisa de Clônus (Hunter) vs Rigidez em Cano de Chumbo (Levenson)',
        secondLineConfirm: 'Tempo de evolução (horas vs dias) + Presença de Diarreia',
        keyDiscriminator: 'Serotoninérgica tem início agudo (< 24h), hiperreflexia, clônus e diarreia; a SNM tem início insidioso (dias), hiporreflexia, rigidez em cano de chumbo e sem diarreia.'
      },
      {
        condition: 'Catatonia Maligna Psiquiátrica',
        firstLineGold: 'Prova terapêutica com Lorazepam EV (1 a 2 mg)',
        secondLineConfirm: 'Eletroencefalograma (EEG)',
        keyDiscriminator: 'A catatonia maligna pura melhora dramaticamente com Lorazepam EV (teste do Lorazepam positivo) e geralmente não tem a elevação brutal de CPK da SNM.'
      },
      {
        condition: 'Insolação Grave (Heat Stroke)',
        firstLineGold: 'História ambiental de esforço extenuante sob sol/calor extremo',
        secondLineConfirm: 'Gasometria arterial e ausência de uso de neurolépticos',
        keyDiscriminator: 'Sem história de exposição ou privação de psicofármacos dopaminérgicos.'
      }
    ]
  },

  // 8. SÍNDROME EXTRAPIRAMIDAL / DISTONIA AGUDA
  extrapiramidal: {
    id: 'extrapiramidal',
    name: 'Síndrome Extrapiramidal (Distonia Aguda)',
    subtitle: 'Desbalanço Dopamina-Acetilcolina na Via Nigroestriatal por Bloqueio D2 Agudo',
    categoryBadge: 'Bloqueio Dopaminérgico Agudo / Reversível',
    accentColor: 'text-lime-400',
    glowColor: 'bg-lime-500',
    badgeBg: 'bg-lime-950/40',
    badgeBorder: 'border-lime-600/50',
    offenders: [
      'Metoclopramida (Plasil) e Bromoprida (muito comum em pronto-socorro após náuseas)',
      'Haloperidol (Haldol) parenteral agudo em dose de ataque',
      'Clorpromazina e levomepromazina',
      'Flufenazina e droperidol',
      'Risperidona em doses elevadas'
    ],
    receptorsInvolved: [
      'Bloqueio agudo transitório de receptores D2 nigroestriatais',
      'Hiperatividade relativa das vias colinérgicas intrínsecas nos gânglios da base',
      'Ausência de disfunção hipotalâmica sistêmica'
    ],
    summaryMnemonic: 'O Paciente "Travado", Lúcido e Desesperado',
    summaryMnemonicDescription: 'Distonia aguda focal ou segmentar (trismo, crise oculógira, torcicolo espasmódico, opistótono) com nível de consciência 100% PRESERVADO e sinais vitais normais.',
    vitals: {
      heartRate: 85,
      heartRateText: 'Normocárdico ou leve taquicardia decorrente da ansiedade aguda',
      bloodPressure: '130/80 mmHg (Normal ou levemente elevada pelo estresse emocional)',
      respiratoryRate: 16,
      respiratoryRateText: 'Eupneico (exceto se houver laringoespasmo grave associado)',
      temperature: 36.8,
      temperatureText: 'NORMOTERMIA rigorosa (ausência total de hipertermia sistêmica)',
      oxygenSat: 98,
      oxygenSatText: 'SpO2 normal',
      glucose: '95 mg/dL',
      ecgPattern: 'normal',
      ecgDescription: 'ECG rigorosamente normal sem alterações eletrolíticas ou arritmias.'
    },
    pupil: {
      sizeMm: 3.5,
      type: 'oculogiro',
      label: 'Pupilas Normais com CRISE OCULÓGIRA',
      description: 'Pupilas fotorreativas, mas com desvio forçado conjugado dos olhos para cima e lateralmente que o paciente não consegue controlar voluntariamente.',
      lightReflex: 'Preservado com reflexo fotomotor normal'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Nível de Consciência',
        status: 'CONSCIÊNCIA TOTALMENTE PRESERVADA, paciente lúcido, angustiado e assustado',
        shortDesc: 'O paciente percebe perfeitamente o espasmo muscular involuntário e fica em pânico.',
        detailedMechanisms: 'O bloqueio dopaminérgico é restrito aos circuitos motores estriatais sem comprometer as vias reticulares ascendentes da consciência.',
        clinicalPearls: 'Nunca assuma que é crise histérica ou conversiva. Trata-se de uma emergência neurológica dolorosa causada pela medicação.',
        severity: 'warning'
      },
      eyes: {
        id: 'eyes',
        label: 'Olhos & Olhar (Crise Oculógira)',
        status: 'Crise Oculógira: Desvio tônico forçado involuntário dos globos oculares para cima',
        shortDesc: 'O paciente fica com o olhar travado no teto sem conseguir olhar para frente.',
        detailedMechanisms: 'Espasmo involuntário dos músculos retos superiores e oblíquos inferiores inervados pelo III e IV pares cranianos.',
        clinicalPearls: 'A crise oculógira associada a trismo após tomar plasil é o quadro clássico de livro mais frequente no plantão de pronto-socorro.',
        severity: 'critical'
      },
      skin: {
        id: 'skin',
        label: 'Pele & Sudorese',
        status: 'Pele normal, normotérmica, sem hiperidrose nem anidrose',
        shortDesc: 'Ausência de qualquer alteração autonômica na pele.',
        detailedMechanisms: 'As vias simpáticas cutâneas não são afetadas.',
        clinicalPearls: 'A ausência de febre e sudorese profusa afasta imediatamente a Síndrome Neuroléptica Maligna.',
        severity: 'info'
      },
      heart: {
        id: 'heart',
        label: 'Cardiovascular',
        status: 'Sinais vitais normais e estáveis; sem oscilações autonômicas lábeis',
        shortDesc: 'O sistema cardiovascular permanece completamente poupado.',
        detailedMechanisms: 'Não há toxicidade autonômica simpática central.',
        clinicalPearls: 'Discreta taquicardia pode ocorrer secundária ao pânico do paciente.',
        severity: 'info'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório',
        status: 'Eupneico, MAS com risco de LARINGOESPASMO DISTÔNICO agudo em casos raros',
        shortDesc: 'Se houver acometimento da musculatura laringofaríngea, pode haver estridor inspiratório.',
        detailedMechanisms: 'Espasmo dos músculos adutores da laringe induzido pelo bloqueio D2 agudo.',
        clinicalPearls: 'A reversão imediata com anticolinérgico previne a necessidade de via aérea cirúrgica.',
        severity: 'critical'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal',
        status: 'Abdome inocente, RHA normais, sem retenção urinária nem diarreia',
        shortDesc: 'Trato gastrointestinal normal.',
        detailedMechanisms: 'Não há alteração na motilidade visceral ou esfincteriana.',
        clinicalPearls: 'Frequentemente o paciente tomou o medicamento (plasil) justamente por sintomas gástricos prévios.',
        severity: 'info'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Musculatura Esquelética (O Foco da Patologia)',
        status: 'DISTONIA AGUDA: Trismo mandibular travado, Torcicolo espasmódico, Protrusão de língua, Opistótono',
        shortDesc: 'Contração tônica involuntária dolorosa de grupos musculares da cabeça, pescoço e coluna.',
        detailedMechanisms: 'A queda súbita do freio inibitório da dopamina sobre as células colinérgicas do estriado deflagra hiperatividade colinérgica motora focal desmedida.',
        clinicalPearls: 'A resposta ao BIPERIDENO EV é dramática e cinematográfica: em menos de 2 a 3 minutos o paciente relaxa completamente o queixo e o pescoço!',
        severity: 'critical'
      }
    },
    pathophysiology: {
      molecularMechanism: 'O bloqueio agudo dos receptores D2 estriatais rompe o equilíbrio homeostático entre Dopamina (inibitória) e Acetilcolina (excitatória) nos gânglios da base, provocando uma crise colinérgica motora localizada.',
      keyPoints: [
        'É uma reação idiossincrática e aguda que pode ocorrer logo na primeira dose de Metoclopramida (Plasil) ou Haloperidol.',
        'Mais frequente em pacientes jovens, do sexo masculino ou com predisposição genética.',
        'Não há lesão neuronal permanente e a reversão farmacológica é 100% curativa se tratada prontamente.'
      ],
      metabolismAndHalfLife: 'Dura o tempo de ocupação do receptor pelo fármaco ofensor, podendo recidivar nas primeiras 24h se o antídoto não for mantido por via oral.'
    },
    diagnosticCriteria: {
      name: 'Padrão Clínico da Distonia Extrapiramidal Aguda',
      description: 'Instalação súbita de contrações musculares espasmódicas após exposição recente a bloqueadores D2:',
      items: [
        '1. Trismo (dificuldade dolorosa de abrir a boca)',
        '2. Torcicolo espasmódico lateral da cabeça com desvio cervical',
        '3. Crise oculógira (olhos virados fixamente para cima)',
        '4. Protrusão involuntária ou enrolamento espasmódico da língua',
        '5. Consciência 100% lúcida e orientada',
        '6. Ausência de febre, sudorese profusa ou rigidez em cano de chumbo generalizada'
      ]
    },
    antidoteProtocol: {
      drug: 'Cloridrato de Biperideno (Akineton) EV ou IM',
      brandName: 'Akineton 5 mg/mL ampola | Prometazina (Fenergan) como alternativa',
      class: 'Anticolinérgico Central Específico / Antagonista Muscarínico dos Gânglios da Base',
      mechanism: 'Bloqueia os receptores colinérgicos muscarínicos hiperativados no corpo estriado, restaurando o equilíbrio Dopamina/Acetilcolina instantaneamente.',
      attackDose: 'Biperideno: 2.5 mg a 5 mg EV administrado lentamente em 2 a 3 minutos (ou IM se não tiver acesso venoso imediato). Alternativa: Prometazina 25 a 50 mg IM profunda.',
      maintenanceDose: 'Após reversão da crise aguda: prescrever Biperideno 2 mg VO de 12/12h por 24 a 48 horas para prevenir recidiva do espasmo quando o nível do antídoto cair.',
      therapeuticEndpoint: 'Relaxamento muscular total imediato, abertura normal da mandíbula e alívio completo da angústia do paciente.',
      adverseEffectsAlert: 'Boca seca transitória e sonolência leve secundárias ao efeito anticolinérgico terapêutico.'
    },
    prohibitedTraps: [
      {
        trapTitle: 'CONFUNDIR COM CRISE HISTÉRICA OU TRANSTORNO CONVERSIVO E NÃO TRATAR',
        explanation: 'O paciente lúcido chorando de dor com a mandíbula travada é frequentemente julgado de forma errônea como "ataque de nervos".',
        consequence: 'Sofrimento desumano prolongado e risco de luxação da articulação temporomandibular (ATM) ou laringoespasmo asfixiante!'
      },
      {
        trapTitle: 'ADMINISTRAR MAIS ANTIPSICÓTICO OU PLASIL PARA "ACALMAR"',
        explanation: 'Achar que a agitação motora decorre de psicose e aplicar haloperidol adicional.',
        consequence: 'Piora catastrófica da distonia e risco real de deflagrar Síndrome Neuroléptica Maligna!'
      }
    ],
    differentials: [
      {
        condition: 'Tétano Acidental',
        firstLineGold: 'Anamnese vacinal e pesquisa de porta de entrada (ferimentos contaminados)',
        secondLineConfirm: 'Teste da espátula / abaixador de língua (reflexo de mordida espasmódica)',
        keyDiscriminator: 'No tétano os espasmos são precipitados por estímulos sonoros/luminosos, há riso sardônico contínuo e a história vacinal é incompleta, sem uso recente de plasil.'
      },
      {
        condition: 'Crise Convulsiva Parcial Focal / Epilepsia',
        firstLineGold: 'Eletroencefalograma (EEG) de urgência',
        secondLineConfirm: 'Ressonância Magnética de Crânio',
        keyDiscriminator: 'A distonia extrapiramidal reverte em 2 minutos após Biperideno EV; a convulsão não responde a anticolinérgicos.'
      },
      {
        condition: 'Hipocalcemia Severa com Espasmo Carpopedal (Sinal de Trousseau)',
        firstLineGold: 'Dosagem de Cálcio Iônico Sérico à beira-leito',
        secondLineConfirm: 'ECG com prolongamento de intervalo QT',
        keyDiscriminator: 'A hipocalcemia cursa com parestesias periorais e espasmo carpal (mão de parteiro) ao insuflar o manguito de pressão arterial.'
      }
    ]
  },

  // 9. INTOXICAÇÃO POR ANTIDEPRESSIVOS TRICÍCLICOS (ADTs)
  triciclicos: {
    id: 'triciclicos',
    name: 'Intoxicação por Antidepressivos Tricíclicos (ADTs)',
    subtitle: 'Bloqueio de Canais de Sódio Rápidos Cardíacos (Nav1.5) e Receptores Muscarínicos/Alfa-1',
    categoryBadge: 'Bloqueadores dos Canais de Sódio Rápidos / Classe Ia-like',
    accentColor: 'text-fuchsia-400',
    glowColor: 'bg-fuchsia-500',
    badgeBg: 'bg-fuchsia-950/40',
    badgeBorder: 'border-fuchsia-600/50',
    offenders: [
      'Amitriptilina (o tricíclico mais comum em tentativas de autolesão)',
      'Nortriptilina',
      'Clomipramina',
      'Imipramina',
      'Doxepina'
    ],
    receptorsInvolved: [
      'Bloqueio dos canais de sódio dependentes de voltagem cardíacos (Nav1.5 na fase 0)',
      'Bloqueio competitivo dos receptores muscarínicos M1 e M2',
      'Bloqueio dos receptores Alfa-1 adrenérgicos vasculares',
      'Inibição da recaptação de Serotonina e Noradrenalina',
      'Antagonismo gabaérgico central no receptor GABA-A'
    ],
    summaryMnemonic: 'Os Três "C"s Letais dos Tricíclicos',
    summaryMnemonicDescription: '1. Coma (rebaixamento rápido do sensório) + 2. Convulsões (crises tônico-clônicas precoces) + 3. Cardiotoxicidade letal (QRS > 100 ms, arritmias ventriculares e choque refratário).',
    vitals: {
      heartRate: 130,
      heartRateText: 'Taquicardia Sinusal com condução intraventricular alargada',
      bloodPressure: '75/40 mmHg (Hipotensão Severa Refratária por bloqueio Alfa-1)',
      respiratoryRate: 12,
      respiratoryRateText: 'Depressão respiratória rápida no coma pós-ictal',
      temperature: 38.2,
      temperatureText: 'Febre ou hipertermia leve por ação anticolinérgica periférica',
      oxygenSat: 91,
      oxygenSatText: 'Queda na saturação por hipoventilação no coma',
      glucose: '105 mg/dL',
      ecgPattern: 'wide_qrs',
      ecgDescription: 'ALARGAMENTO SEVERO DO QRS (> 100 a > 160 ms), onda R proeminente em aVR (> 3 mm ou relação R/S > 0.7) e prolongamento do intervalo QTc.'
    },
    pupil: {
      sizeMm: 7.5,
      type: 'midriase_paralitica',
      label: 'Midríase Acentuada com Reação Preguiçosa',
      description: 'Pupilas amplamente dilatadas pela forte propriedade anticolinérgica intrínseca dos anéis tricíclicos.',
      lightReflex: 'Diminuído a ausente'
    },
    hotspots: {
      brain: {
        id: 'brain',
        label: 'SNC & Nível de Consciência',
        status: 'Rebaixamento abrupto da consciência, delírio inicial, CONVULSÕES precoces e coma',
        shortDesc: 'A intoxicação por tricíclico evolui rapidamente de confusão mental para crises convulsivas de difícil controle.',
        detailedMechanisms: 'Bloqueio de receptores GABA-A e inibição da recaptação monoaminérgica deflagram descargas elétricas epilépticas corticais.',
        clinicalPearls: 'A acidose láctica induzida pelas convulsões dissocia o tricíclico para sua forma ionizada mais tóxica, piorando drasticamente o bloqueio do coração!',
        severity: 'critical'
      },
      eyes: {
        id: 'eyes',
        label: 'Pupilas & Visão',
        status: 'Midríase bilateral e visão borrada por bloqueio muscarínico',
        shortDesc: 'Efeito anticolinérgico cruzado clássico da amitriptilina.',
        detailedMechanisms: 'Antagonismo M3 no esfíncter pupilar.',
        clinicalPearls: 'Nunca deixe que a presença de midríase induza você a usar fisostigmina aqui: ELA É LETAL nos tricíclicos!',
        severity: 'warning'
      },
      skin: {
        id: 'skin',
        label: 'Pele & Mucosas',
        status: 'Pele seca e quente, mucosas orais ressecadas (xerostomia intensa)',
        shortDesc: 'Ausência de secreções salivares e sudoríparas.',
        detailedMechanisms: 'Bloqueio parassimpático periférico.',
        clinicalPearls: 'O paciente pode apresentar retenção urinária concomitante com bexigoma.',
        severity: 'info'
      },
      heart: {
        id: 'heart',
        label: 'Cardiotoxicidade (A Causa Principal de Morte)',
        status: 'QRS ALARGADO (> 100 ms), Onda R em aVR > 3 mm, Hipotensão grave, TV Monomórfica e Polimórfica',
        shortDesc: 'O veneno cardiovascular por excelência: bloqueio dos canais rápidos de sódio Nav1.5.',
        detailedMechanisms: 'O tricíclico desacelera a velocidade de subida da fase 0 do potencial de ação miocárdico nas fibras de Purkinje, alargando o QRS e gerando circuitos de reentrada letais (TV e FV).',
        clinicalPearls: 'RELAÇÃO DIRETA NO ECG: QRS > 100 ms = 34% de risco de convulsão. QRS > 160 ms = 50% de risco de Taquicardia Ventricular letal!',
        severity: 'critical'
      },
      lungs: {
        id: 'lungs',
        label: 'Aparelho Respiratório',
        status: 'Hipoventilação e acidose respiratória que desestabiliza o coração',
        shortDesc: 'A acidemia sanguínea descola mais fármaco livre que se fixa nos canais de sódio.',
        detailedMechanisms: 'A hipercapnia acidifica o sangue, potencializando o bloqueio cardíaco.',
        clinicalPearls: 'A hiperventilação mecânica leve pós-IOT auxilia na alcalinização sérica terapêutica.',
        severity: 'critical'
      },
      abdomen: {
        id: 'abdomen',
        label: 'Gastrointestinal & Esfíncteres',
        status: 'Íleo paralítico, atonia gástrica com retenção de comprimidos e bexigoma',
        shortDesc: 'Esvaziamento gástrico lentificado por horas devido ao efeito anticolinérgico.',
        detailedMechanisms: 'Por retardar o esvaziamento gástrico, a absorção dos comprimidos no intestino continua ocorrendo por até 12 a 24 horas após a ingestão.',
        clinicalPearls: 'Indicação de CARVÃO ATIVADO em dose única mesmo após 2 a 4 horas da ingestão devido ao retardo da motilidade gástrica.',
        severity: 'warning'
      },
      neuromuscular: {
        id: 'neuromuscular',
        label: 'Tônus Muscular & Reflexos',
        status: 'Mioclonias involuntárias, hipertonia transitória e convulsões tônico-clônicas generalizadas',
        shortDesc: 'Crises epilépticas generalizadas que exigem controle imediato com Diazepam EV.',
        detailedMechanisms: 'Antagonismo de receptores gabaérgicos centrais.',
        clinicalPearls: 'PROIBIDO FENITOÍNA para tratar convulsões por tricíclicos! A fenitoína também bloqueia canais de sódio e precipita assistolia instantânea.',
        severity: 'critical'
      }
    },
    pathophysiology: {
      molecularMechanism: 'Bloqueio dependente de voltagem e frequência dos canais de sódio Nav1.5 no miocárdio ventricular. Em pH fisiológico ou ácido, a molécula do tricíclico se liga com alta afinidade à conformação inativada do canal de sódio, impedindo a propagação do estímulo elétrico.',
      keyPoints: [
        'A alcalinização sérica com Bicarbonato de Sódio altera a ionização do fármaco para sua forma neutra não ionizada, diminuindo drasticamente sua afinidade pelo canal de sódio.',
        'A sobrecarga molar de Sódio (Na+) oferecida pelo Bicarbonato a 8.4% supera competitivamente o bloqueio iônico no poro do canal.',
        'O bloqueio alfa-1 periférico gera vasodilatação sistêmica refratária que exige Noradrenalina precoce se a hipotensão não responder ao bicarbonato e fluidos.'
      ],
      metabolismAndHalfLife: 'Grande volume de distribuição (> 15 a 40 L/kg) e ligação a proteínas plasmáticas superior a 90%; por essa razão, a HEMODIÁLISE É COMPLETAMENTE INÚTIL para remover tricíclicos do organismo!'
    },
    diagnosticCriteria: {
      name: 'Padrão Eletrocardiográfico Cardinal dos Tricíclicos',
      description: 'A avaliação do traçado eletrocardiográfico de 12 derivações é a bússola de sobrevida:',
      items: [
        '1. Duração do complexo QRS > 100 ms em DII ou V1 (indicação formal de Bicarbonato)',
        '2. Onda R proeminente na derivação aVR (> 3 mm de amplitude)',
        '3. Relação R/S na derivação aVR > 0.7',
        '4. Prolongamento do intervalo QTc (> 460 ms em homens, > 480 ms em mulheres)',
        '5. Taquicardia sinusal associada'
      ]
    },
    antidoteProtocol: {
      drug: 'Bicarbonato de Sódio 8.4% EV (1 mEq/mL)',
      brandName: 'Bicarbonato de Sódio 8.4% ampola de 250 mL',
      class: 'Alcalinizante Sanguíneo e Fonte Hiperosmolar de Sódio',
      mechanism: '1. Fornece uma carga massiva de Na+ para superar competitivamente o bloqueio do canal Nav1.5; 2. Alcaliniza o plasma (meta pH 7.45 - 7.55), induzindo descolamento da molécula de amitriptilina do receptor cardíaco.',
      attackDose: '1 a 2 mEq/kg EV em bolus rápido imediato (em adulto: 100 a 150 mL de Bicarbonato 8.4% em 2 a 5 minutos). Repetir o bolus a cada 3 a 5 minutos até que o QRS ESTREITE para < 100 ms!',
      maintenanceDose: 'Após estreitamento do QRS no ECG: diluir 150 mL de Bicarbonato 8.4% em 850 mL de SG 5% e infundir em BIC contínua na taxa de 150 a 250 mL/h, monitorando hemogasometria a cada 2 horas.',
      therapeuticEndpoint: 'ESTREITAMENTO DO COMPLEXO QRS PARA < 100 MS e reversão das arritmias ventriculares e da hipotensão, mantendo o pH arterial estritamente entre 7.45 e 7.55.',
      adverseEffectsAlert: 'Risco de alcalose metabólica extrema (NUNCA permitir pH > 7.55), hipernatremia severa e HIPOCALEMIA CRÍTICA induzida pelo desvio de K+ para dentro da célula. Repor cloreto de potássio profilático!'
    },
    prohibitedTraps: [
      {
        trapTitle: 'NUNCA USAR FENITOÍNA PARA CONVULSÕES POR TRICÍCLICOS',
        explanation: 'A fenitoína é um anticonvulsivante que age exatamente bloqueando os mesmos canais de sódio rápidos Nav1.5 cardíacos.',
        consequence: 'Se você infundir fenitoína na intoxicação por amitriptilina, haverá bloqueio duplo irreversível do nó AV e feixe de His, provocando ASSISTOLIA IMEDIATA E PARADA CARDÍACA IRRESPONSIVA. Convulsão aqui trata-se exclusivamente com DIAZEPAM EV!'
      },
      {
        trapTitle: 'NUNCA USAR FISOSTIGMINA (MESMO QUE HAJA SINAIS ANTICOLINÉRGICOS NÍTIDOS)',
        explanation: 'A fisostigmina em coração com condução intraventricular deprimida causa bradiarritmia extrema e assistolia.',
        consequence: 'Parada cardiorrespiratória irreversível. A fisostigmina é FORMALMENTE CONTRAINDICADA se houver qualquer suspeita de tricíclico ou QRS > 100 ms!'
      },
      {
        trapTitle: 'NÃO INDICAR HEMODIÁLISE (É COMPLETAMENTE INEFICAZ)',
        explanation: 'Os tricíclicos possuem volume de distribuição gigantesco (> 20 L/kg) e fixação tecidual maciça.',
        consequence: 'Menos de 1% do fármaco está livre no plasma. Submeter o paciente em choque a hemodiálise desestabiliza a hemodinâmica sem remover a toxina. O tratamento é BICARBONATO e SUPORTE!'
      }
    ],
    differentials: [
      {
        condition: 'Infarto Agudo do Miocárdio com Bloqueio de Ramo Esquerdo Novo',
        firstLineGold: 'ECG seriado 12 derivações + Troponina ultrassensível + Ecocardiograma',
        secondLineConfirm: 'Cateterismo Cardíaco de Urgência',
        keyDiscriminator: 'No IAM não há a onda R gigante (> 3 mm) em aVR nem os sinais anticolinérgicos com midríase e xerostomia.'
      },
      {
        condition: 'Hipercalemia Grave (K+ > 7.0 mEq/L)',
        firstLineGold: 'Gasometria arterial imediata com dosagem de K+ sérico à beira-leito',
        secondLineConfirm: 'ECG com ondas T apiculadas em tenda com base estreita e perda de onda P',
        keyDiscriminator: 'Ambos alargam o QRS e causam choque, mas a hipercalemia tem potássio alto e perda de ondas P, sem midríase anticolinérgica.'
      },
      {
        condition: 'Intoxicação por Bloqueadores de Canais de Cálcio ou Betabloqueadores',
        firstLineGold: 'ECG (pesquisa de bradicardia e BAV) + Glicemia capilar',
        secondLineConfirm: 'Prova terapêutica com Cálcio EV / Glucagon / Insulina em alta dose (HIET)',
        keyDiscriminator: 'Bloqueadores de cálcio cursam com bradicardia sinusal e hiperglicemia, enquanto tricíclicos causam taquicardia sinusal com QRS largo.'
      }
    ]
  }
};
