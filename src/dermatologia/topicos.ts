// ==========================================================================
// Tópicos por doença da Dermatologia. Cada tópico reúne, em abas, as seções do manual
// (capítulos em ./capitulos) que tratam da mesma doença: a aula teórica, o caso da aula
// prática e as aulas complementares. O texto não é duplicado: o tópico aponta para as seções.
//
// Referência de seção: "cap:id-da-seção" (seção inteira), "cap:id#Subtítulo" (só o trecho
// do subtítulo h3 que começa com esse texto) ou "cap:id#" (só o trecho antes do primeiro h3).
// ==========================================================================

export interface TopicoTab {
  label: string;
  refs: string[];
}

export interface Topico {
  id: string;
  name: string;
  group: string;
  // Termos para a busca do app (sinônimos, agentes, tratamentos).
  kw: string;
  tabs: TopicoTab[];
}

export const TOPICO_GROUPS = [
  'Piodermites',
  'Viroses',
  'Micoses',
  'Hanseníase',
  'Eczemas',
  'Inflamatórias e pigmentares',
  'Acne',
  'Cabelos',
  'Unhas',
  'Úlceras e feridas',
  'Farmacodermias e fotoproteção',
  'Doenças sistêmicas',
  'Semiologia armada',
] as const;

const tab = (label: string, ...refs: string[]): TopicoTab => ({ label, refs });

export const TOPICOS: Topico[] = [
  // ---------------------------------------------------------------- Piodermites
  {
    id: 'derm-impetigo', name: 'Impetigo', group: 'Piodermites',
    kw: 'impetigo crostoso, não bolhoso, bolhoso, crosta melicérica, S. aureus, S. pyogenes, mupirocina, ácido fusídico, cefalexina, GNDA',
    tabs: [tab('Agentes', '6:c06-s1'), tab('Impetigo', '6:c06-s2'), tab('Síntese', '6:c06-s9')],
  },
  {
    id: 'derm-ectima', name: 'Ectima', group: 'Piodermites',
    kw: 'ectima, úlcera em saca-bocado, crosta, estreptococo, impetigo profundo',
    tabs: [tab('Ectima', '6:c06-s3'), tab('Síntese', '6:c06-s9')],
  },
  {
    id: 'derm-ssss', name: 'Síndrome da Pele Escaldada Estafilocócica', group: 'Piodermites',
    kw: 'SSSS, pele escaldada, Ritter, toxina esfoliativa, desmogleína 1, Nikolsky, oxacilina',
    tabs: [tab('SSSS', '6:c06-s4'), tab('Síntese', '6:c06-s9')],
  },
  {
    id: 'derm-foliculites', name: 'Foliculites', group: 'Piodermites',
    kw: 'foliculite, sicose da barba, pseudofoliculite, pústula folicular, mupirocina, clindamicina, cefalexina',
    tabs: [tab('Teoria', '6:c06-s5'), tab('Caso clínico', '16:c14-s5'), tab('Síntese', '6:c06-s9')],
  },
  {
    id: 'derm-furunculo', name: 'Furúnculo e Carbúnculo', group: 'Piodermites',
    kw: 'furúnculo, carbúnculo, antraz, furunculose, abscesso, drenagem, S. aureus',
    tabs: [tab('Furúnculo e carbúnculo', '6:c06-s6'), tab('Síntese', '6:c06-s9')],
  },
  {
    id: 'derm-erisipela', name: 'Erisipela e Celulite', group: 'Piodermites',
    kw: 'erisipela, celulite, placa eritematosa, borda nítida, porta de entrada, penicilina, cefalexina, amoxicilina',
    tabs: [tab('Erisipela e celulite', '6:c06-s7'), tab('Síntese', '6:c06-s9')],
  },
  {
    id: 'derm-paroniquia', name: 'Paroníquia', group: 'Piodermites',
    kw: 'paroníquia aguda, crônica, perioníquia, prega ungueal, Candida',
    tabs: [tab('Paroníquia', '6:c06-s8'), tab('Infecções ungueais', '19:c19-s10')],
  },

  // ---------------------------------------------------------------- Viroses
  {
    id: 'derm-sarampo', name: 'Sarampo', group: 'Viroses',
    kw: 'sarampo, Morbillivirus, manchas de Koplik, exantema morbiliforme, vitamina A, doença exantemática',
    tabs: [tab('Sarampo', '7:c07-s2#Sarampo'), tab('Comparativo', '7:c07-s2#Quadro comparativo')],
  },
  {
    id: 'derm-rubeola', name: 'Rubéola', group: 'Viroses',
    kw: 'rubéola, rubéola congênita, linfonodos retroauriculares, exantema rubeoliforme, doença exantemática',
    tabs: [tab('Rubéola', '7:c07-s2#Rubéola'), tab('Comparativo', '7:c07-s2#Quadro comparativo')],
  },
  {
    id: 'derm-eritema-infeccioso', name: 'Eritema Infeccioso', group: 'Viroses',
    kw: 'eritema infeccioso, quinta doença, parvovírus B19, face esbofeteada, exantema rendilhado',
    tabs: [tab('Eritema infeccioso', '7:c07-s2#Eritema infeccioso'), tab('Comparativo', '7:c07-s2#Quadro comparativo')],
  },
  {
    id: 'derm-roseola', name: 'Exantema Súbito (Roséola)', group: 'Viroses',
    kw: 'eritema súbito, exantema súbito, roséola infantil, sexta doença, herpesvírus 6, HHV-6, febre alta',
    tabs: [tab('Exantema súbito', '7:c07-s2#Eritema súbito'), tab('Comparativo', '7:c07-s2#Quadro comparativo')],
  },
  {
    id: 'derm-mao-pe-boca', name: 'Doença Mão-Pé-Boca', group: 'Viroses',
    kw: 'mão-pé-boca, coxsackie, enterovírus, vesículas palmoplantares, aftas',
    tabs: [tab('Mão-pé-boca', '7:c07-s2#Doença mão-pé-boca'), tab('Comparativo', '7:c07-s2#Quadro comparativo')],
  },
  {
    id: 'derm-varicela', name: 'Varicela (Catapora)', group: 'Viroses',
    kw: 'varicela, catapora, vírus varicela-zóster, polimorfismo regional, céu estrelado, aciclovir, vacina',
    tabs: [tab('Varicela', '7:c07-s2#Varicela'), tab('Comparativo', '7:c07-s2#Quadro comparativo')],
  },
  {
    id: 'derm-herpes-simples', name: 'Herpes Simples', group: 'Viroses',
    kw: 'herpes simples, HSV-1, HSV-2, herpes labial, herpes genital, Tzanck, aciclovir, valaciclovir, fanciclovir, lisina',
    tabs: [tab('Teoria', '7:c07-s3'), tab('Doses da aula prática', '16:c14-s2#Herpes simples')],
  },
  {
    id: 'derm-herpes-zoster', name: 'Herpes-Zóster', group: 'Viroses',
    kw: 'herpes-zóster, cobreiro, dermátomo, neuralgia pós-herpética, varicela-zóster, aciclovir, valaciclovir, fanciclovir, vacina',
    tabs: [tab('Teoria', '7:c07-s4'), tab('Caso clínico', '16:c14-s2#')],
  },
  {
    id: 'derm-mpox', name: 'Mpox (Monkeypox)', group: 'Viroses',
    kw: 'mpox, monkeypox, varíola dos macacos, poxvírus, pústula umbilicada, linfadenopatia',
    tabs: [tab('Mpox', '7:c07-s5#', '7:c07-s5#Monkeypox')],
  },
  {
    id: 'derm-molusco', name: 'Molusco Contagioso', group: 'Viroses',
    kw: 'molusco contagioso, poxvírus, pápula umbilicada, curetagem, crianças, atópicos',
    tabs: [tab('Molusco contagioso', '7:c07-s5#', '7:c07-s5#Molusco')],
  },
  {
    id: 'derm-verrugas', name: 'Verrugas Virais (HPV)', group: 'Viroses',
    kw: 'verruga vulgar, plantar, plana, condiloma acuminado, HPV, papilomavírus, crioterapia, ácido salicílico, imiquimode',
    tabs: [tab('Verrugas', '7:c07-s6'), tab('Quadro-resumo das viroses', '7:c07-s7')],
  },

  // ---------------------------------------------------------------- Micoses
  {
    id: 'derm-pitiriase-versicolor', name: 'Pitiríase Versicolor', group: 'Micoses',
    kw: 'pitiríase versicolor, Malassezia, sinal de Zileri, Wood amarelo-dourado, cetoconazol, sulfeto de selênio',
    tabs: [tab('Pitiríase versicolor', '8:c08-s1'), tab('× Dermatite seborreica', '8:c08-s2'), tab('Síntese', '8:c08-s6')],
  },
  {
    id: 'derm-dermatite-seborreica', name: 'Dermatite Seborreica', group: 'Micoses',
    kw: 'dermatite seborreica, caspa, crosta láctea, Malassezia, cetoconazol, xampu',
    tabs: [tab('Dermatite seborreica', '8:c08-s2')],
  },
  {
    id: 'derm-dermatofitoses', name: 'Dermatofitoses (Tinhas)', group: 'Micoses',
    kw: 'dermatofitose, tinha, tinea corporis, cruris, pedis, manuum, unguium, Trichophyton, Microsporum, terbinafina, micológico direto',
    tabs: [
      tab('Tinhas', '8:c08-s3'),
      tab('Caso: tinea pedis', '16:c14-s6'),
      tab('Síntese', '8:c08-s6'),
    ],
  },
  {
    id: 'derm-tinea-capitis', name: 'Tinea Capitis', group: 'Micoses',
    kw: 'tinea capitis, tinha do couro cabeludo, tonsurante, kerion, favo, Microsporum canis, griseofulvina, terbinafina',
    tabs: [tab('Micoses', '8:c08-s3#Tinha do couro cabeludo'), tab('Alopecias', '12:c12-s11')],
  },
  {
    id: 'derm-candidiase', name: 'Candidíase', group: 'Micoses',
    kw: 'candidíase, Candida albicans, intertrigo, monilíase, sapinho, lesões satélites, nistatina, fluconazol',
    tabs: [tab('Candidíase', '8:c08-s4'), tab('Síntese', '8:c08-s6')],
  },
  {
    id: 'derm-onicomicose', name: 'Onicomicose', group: 'Micoses',
    kw: 'onicomicose, tinea unguium, subungueal distal, esmalte antifúngico, amorolfina, ciclopirox, terbinafina, itraconazol',
    tabs: [
      tab('Onicomicose', '8:c08-s5'),
      tab('Tinha da unha', '8:c08-s3#Tinha da unha'),
      tab('Infecções ungueais', '19:c19-s10'),
    ],
  },

  // ---------------------------------------------------------------- Hanseníase
  {
    id: 'derm-hanseniase', name: 'Hanseníase', group: 'Hanseníase',
    kw: 'hanseníase, lepra, Mycobacterium leprae, paucibacilar, multibacilar, Madri, PQT-U, rifampicina, clofazimina, dapsona, reação reversa, eritema nodoso hansênico, talidomida, GIF, ANS',
    tabs: [
      tab('Etiologia e transmissão', '9:c09-s1', '9:c09-s2', '9:c09-s3'),
      tab('Exame e ANS', '9:c09-s4', '9:c09-s5'),
      tab('Exames de apoio', '9:c09-s6'),
      tab('Classificação e formas', '9:c09-s7', '9:c09-s8'),
      tab('Tratamento', '9:c09-s9', '9:c09-s10'),
      tab('Reações e neuropatias', '9:c09-s11', '9:c09-s12'),
      tab('Contatos e epidemiologia', '9:c09-s13', '9:c09-s14'),
    ],
  },

  // ---------------------------------------------------------------- Eczemas
  {
    id: 'derm-dermatite-atopica', name: 'Dermatite Atópica', group: 'Eczemas',
    kw: 'dermatite atópica, eczema atópico, Hanifin e Rajka, prurido, xerose, emolientes, corticoide tópico, tacrolimo, dupilumabe',
    tabs: [tab('O que é eczema', '10:c10-s1'), tab('Dermatite atópica', '10:c10-s6')],
  },
  {
    id: 'derm-dermatite-contato', name: 'Dermatite de Contato', group: 'Eczemas',
    kw: 'dermatite de contato, irritativa, alérgica, fototóxica, fotoalérgica, níquel, teste de contato, patch test, dispositivo médico',
    tabs: [tab('Teoria', '10:c10-s7'), tab('Caso: dispositivo médico', '17:c15-s1')],
  },
  {
    id: 'derm-eczema-estase', name: 'Eczema de Estase (Dermatite Ocre)', group: 'Eczemas',
    kw: 'eczema de estase, dermatite ocre, hemossiderina, insuficiência venosa, lipodermatosclerose',
    tabs: [tab('Teoria', '10:c10-s2'), tab('Caso clínico', '18:c16-s14')],
  },
  {
    id: 'derm-eczema-asteatosico', name: 'Eczema Asteatósico', group: 'Eczemas',
    kw: 'eczema asteatósico, eczema craquelê, eczema senil, xerose, idoso, hidratação',
    tabs: [tab('Eczema asteatósico', '10:c10-s3')],
  },
  {
    id: 'derm-eczema-numular', name: 'Eczema Numular', group: 'Eczemas',
    kw: 'eczema numular, placas em moeda, numular, corticoide tópico',
    tabs: [tab('Eczema numular', '10:c10-s4')],
  },
  {
    id: 'derm-disidrose', name: 'Disidrose (Eczema Disidrótico)', group: 'Eczemas',
    kw: 'disidrose, eczema disidrótico, vesículas palmoplantares, pompholyx',
    tabs: [tab('Disidrose', '10:c10-s5')],
  },

  // ---------------------------------------------------------------- Inflamatórias e pigmentares
  {
    id: 'derm-vitiligo', name: 'Vitiligo', group: 'Inflamatórias e pigmentares',
    kw: 'vitiligo, mancha acrômica, melanócitos, piebaldismo, Wood, tacrolimo, fototerapia, excimer',
    tabs: [tab('Caso clínico', '16:c14-s3')],
  },

  // ---------------------------------------------------------------- Acne
  {
    id: 'derm-acne', name: 'Acne', group: 'Acne',
    kw: 'acne vulgar, comedão, unidade pilossebácea, Cutibacterium acnes, GLADA, peróxido de benzoíla, adapaleno, tretinoína, doxiciclina, isotretinoína, anticoncepcional, espironolactona',
    tabs: [
      tab('Patogênese', '11:c11-s1', '11:c11-s2'),
      tab('Clínica e formas', '11:c11-s3', '11:c11-s4'),
      tab('Tratamento tópico', '11:c11-s5', '11:c11-s6'),
      tab('Oral e hormonal', '11:c11-s7', '11:c11-s8'),
      tab('Isotretinoína', '11:c11-s9'),
      tab('Resumo do tratamento', '11:c11-s10'),
    ],
  },
  {
    id: 'derm-cicatrizes-acne', name: 'Cicatrizes de Acne e Queloides', group: 'Acne',
    kw: 'cicatriz de acne, atrófica, ice pick, boxcar, rolling, queloide, cicatriz hipertrófica, CROSS, subcisão, microagulhamento, peeling, triancinolona',
    tabs: [
      tab('Classificação', '11:c11-s11'),
      tab('Cicatrizes atróficas', '11:c11-s12'),
      tab('Hipertróficas e queloides', '11:c11-s13'),
      tab('Engenharia dérmica', '11:c11-s14'),
    ],
  },

  // ---------------------------------------------------------------- Cabelos
  {
    id: 'derm-alopecia-androgenetica', name: 'Alopecia Androgenética', group: 'Cabelos',
    kw: 'alopecia androgenética, calvície, miniaturização, Hamilton-Norwood, Ludwig, minoxidil, finasterida, dutasterida, transplante capilar',
    tabs: [
      tab('Clínica', '12:c12-s5'),
      tab('Tratamento', '12:c12-s6'),
      tab('Procedimentos', '12:c12-s7'),
    ],
  },
  {
    id: 'derm-alopecia-areata', name: 'Alopecia Areata', group: 'Cabelos',
    kw: 'alopecia areata, pelada, cabelos em ponto de exclamação, SALT, corticoide intralesional, triancinolona, inibidor de JAK, baricitinibe',
    tabs: [
      tab('Clínica e diagnóstico', '12:c12-s9'),
      tab('Tratamento', '12:c12-s10'),
      tab('Caso clínico', '19:c19-s1'),
    ],
  },
  {
    id: 'derm-efluvio-telogeno', name: 'Eflúvio Telógeno', group: 'Cabelos',
    kw: 'eflúvio telógeno, queda de cabelo, pós-parto, pós-febre, teste de tração, ferritina',
    tabs: [tab('Eflúvio telógeno', '12:c12-s8'), tab('Ciclo folicular', '12:c12-s1')],
  },
  {
    id: 'derm-alopecia-sifilitica', name: 'Alopecia Sifilítica', group: 'Cabelos',
    kw: 'alopecia sifilítica, roída de traça, sífilis secundária, VDRL, penicilina benzatina',
    tabs: [tab('Alopecia sifilítica', '12:c12-s12')],
  },
  {
    id: 'derm-alopecia-tracao', name: 'Alopecia de Tração', group: 'Cabelos',
    kw: 'alopecia de tração, penteados, tranças, sinal da franja',
    tabs: [tab('Alopecia de tração', '12:c12-s13')],
  },
  {
    id: 'derm-tricotilomania', name: 'Tricotilomania', group: 'Cabelos',
    kw: 'tricotilomania, arrancar cabelos, transtorno obsessivo-compulsivo, tricofagia',
    tabs: [tab('Tricotilomania', '12:c12-s14')],
  },
  {
    id: 'derm-haste-capilar', name: 'Distúrbios da Haste Capilar', group: 'Cabelos',
    kw: 'haste capilar, tricorrexe nodosa, monilétrix, pili torti, fragilidade capilar',
    tabs: [tab('Haste capilar', '19:c19-s2')],
  },

  // ---------------------------------------------------------------- Unhas
  {
    id: 'derm-melanoniquia', name: 'Melanoníquia e Melanoma Ungueal', group: 'Unhas',
    kw: 'melanoníquia longitudinal, melanoma ungueal, sinal de Hutchinson, ABCDEF, biópsia de matriz',
    tabs: [tab('Caso: melanoma ungueal', '19:c19-s4'), tab('Melanoníquia', '19:c19-s5')],
  },
  {
    id: 'derm-alteracoes-ungueais', name: 'Alterações das Unhas', group: 'Unhas',
    kw: 'unhas quebradiças, linhas de Beau, pitting, onicólise, leuconíquia, coiloníquia, baqueteamento, unha de Terry, tumores ungueais',
    tabs: [
      tab('Anatomia', '19:c19-s6'),
      tab('Superfície', '19:c19-s7'),
      tab('Cor', '19:c19-s8'),
      tab('Fixação e espessura', '19:c19-s9'),
      tab('Infecções e tumores', '19:c19-s10'),
    ],
  },

  // ---------------------------------------------------------------- Úlceras e feridas
  {
    id: 'derm-ulcera-venosa', name: 'Úlcera Venosa', group: 'Úlceras e feridas',
    kw: 'úlcera venosa, hipertensão venosa, CEAP, dermatite ocre, terapia compressiva, bota de Unna, varizes, maléolo medial',
    tabs: [
      tab('Visão geral', '13:c17-s4'),
      tab('Fisiopatologia', '14:c13-s10'),
      tab('Clínica e CEAP', '14:c13-s11'),
      tab('Tratamento', '14:c13-s12'),
      tab('Caso clínico', '18:c16-s14'),
    ],
  },
  {
    id: 'derm-ulcera-arterial', name: 'Úlcera Arterial', group: 'Úlceras e feridas',
    kw: 'úlcera arterial, isquêmica, DAOP, claudicação, ITB, índice tornozelo-braço, revascularização, Fontaine, Rutherford',
    tabs: [
      tab('Visão geral', '13:c17-s5'),
      tab('ITB', '14:c13-s7'),
      tab('Clínica', '14:c13-s13'),
      tab('Classificação e tratamento', '14:c13-s14'),
    ],
  },
  {
    id: 'derm-pe-diabetico', name: 'Pé Diabético e Úlcera Neuropática', group: 'Úlceras e feridas',
    kw: 'pé diabético, úlcera neuropática, mal perfurante plantar, monofilamento, Wagner, Texas, offloading, amputação',
    tabs: [
      tab('Visão geral', '13:c17-s6'),
      tab('Pé diabético', '14:c13-s15'),
      tab('Pele do diabético', '18:c16-s13#Angiopatia'),
    ],
  },
  {
    id: 'derm-lesao-pressao', name: 'Lesão por Pressão', group: 'Úlceras e feridas',
    kw: 'lesão por pressão, úlcera de decúbito, escara, estadiamento, NPIAP, mudança de decúbito',
    tabs: [tab('Lesão por pressão', '13:c17-s8'), tab('Estadiamento', '5:c05-s2#Estadiamento')],
  },
  {
    id: 'derm-ulceras-atipicas', name: 'Úlceras Atípicas e Inflamatórias', group: 'Úlceras e feridas',
    kw: 'úlcera de Martorell, pioderma gangrenoso, vasculite, Chapel Hill, úlcera de Marjolin, calcifilaxia, úlceras infecciosas, leishmaniose',
    tabs: [
      tab('Úlceras inflamatórias', '13:c17-s7'),
      tab('Martorell, pioderma e vasculites', '14:c13-s16'),
      tab('Marjolin, infecciosas e calcifilaxia', '14:c13-s17'),
    ],
  },
  {
    id: 'derm-feridas-curativos', name: 'Feridas Crônicas e Curativos (TIME)', group: 'Úlceras e feridas',
    kw: 'ferida crônica, cicatrização, TIME, desbridamento, biofilme, curativo, coberturas, pressão negativa, VAC',
    tabs: [
      tab('Conceito e cicatrização', '13:c17-s1', '13:c17-s2', '13:c17-s3'),
      tab('Investigação', '14:c13-s5', '14:c13-s6', '14:c13-s8', '14:c13-s9'),
      tab('TIME e curativos', '13:c17-s9', '13:c17-s10'),
      tab('Preparo do leito e coberturas', '14:c13-s18'),
      tab('Checklist do plantão', '14:c13-s19'),
    ],
  },

  // ---------------------------------------------------------------- Farmacodermias e fotoproteção
  {
    id: 'derm-exantema-urticaria-medicamentosa', name: 'Exantema e Urticária Medicamentosos', group: 'Farmacodermias e fotoproteção',
    kw: 'farmacodermia, reação adversa a medicamento, exantema morbiliforme, urticária, angioedema, prurido',
    tabs: [
      tab('Definição e fisiopatologia', '15:c18-s1', '15:c18-s2'),
      tab('Prurido, exantema e urticária', '15:c18-s3'),
    ],
  },
  {
    id: 'derm-eritema-multiforme', name: 'Eritema Multiforme', group: 'Farmacodermias e fotoproteção',
    kw: 'eritema multiforme, lesão em alvo, íris, herpes simples, erupção eczematosa medicamentosa',
    tabs: [tab('Eritema multiforme', '15:c18-s4')],
  },
  {
    id: 'derm-eritema-pigmentar-fixo', name: 'Eritema Pigmentar Fixo', group: 'Farmacodermias e fotoproteção',
    kw: 'eritema pigmentar fixo, erupção fixa, dipirona, sulfa, AINE, erupção liquenoide, vasculite medicamentosa',
    tabs: [tab('Teoria', '15:c18-s6'), tab('Caso clínico', '17:c15-s2')],
  },
  {
    id: 'derm-fotossensibilidade', name: 'Fotossensibilidade', group: 'Farmacodermias e fotoproteção',
    kw: 'fotossensibilidade, fototoxicidade, fotoalergia, erupção polimorfa à luz, medicamentos fotossensibilizantes',
    tabs: [
      tab('Teoria', '15:c18-s5'),
      tab('Caso clínico', '17:c15-s3'),
      tab('Erupção polimorfa à luz', '17:c15-s4'),
      tab('Dermatite de contato foto', '10:c10-s7#Dermatite de contato fototóxica', '10:c10-s7#Dermatite de contato fotoalérgica'),
    ],
  },
  {
    id: 'derm-fotoprotecao', name: 'Fotoproteção', group: 'Farmacodermias e fotoproteção',
    kw: 'fotoproteção, protetor solar, FPS, UVA, UVB, filtro físico, filtro químico, vitamina D',
    tabs: [tab('Fotoproteção', '17:c15-s5')],
  },
  {
    id: 'derm-acneiforme-sdrife', name: 'Erupção Acneiforme e SDRIFE', group: 'Farmacodermias e fotoproteção',
    kw: 'erupção acneiforme medicamentosa, corticoide, SDRIFE, síndrome do babuíno, exantema intertriginoso',
    tabs: [tab('Acneiforme e SDRIFE', '15:c18-s7'), tab('Acne induzida por drogas', '11:c11-s4#Acne induzida')],
  },
  {
    id: 'derm-anafilaxia-eritrodermia', name: 'Anafilaxia e Eritrodermia', group: 'Farmacodermias e fotoproteção',
    kw: 'anafilaxia, adrenalina, eritrodermia, dermatite esfoliativa, farmacodermia grave',
    tabs: [tab('Anafilaxia e eritrodermia', '15:c18-s8'), tab('Conduta', '15:c18-s13')],
  },
  {
    id: 'derm-ssj-net', name: 'Stevens-Johnson e NET', group: 'Farmacodermias e fotoproteção',
    kw: 'síndrome de Stevens-Johnson, SSJ, necrólise epidérmica tóxica, NET, Lyell, SCORTEN, alopurinol, carbamazepina, lamotrigina, sulfa',
    tabs: [
      tab('Stevens-Johnson', '15:c18-s9'),
      tab('NET (Lyell)', '15:c18-s10'),
      tab('Espectro SSJ–NET', '15:c18-s11'),
      tab('Conduta', '15:c18-s13'),
    ],
  },
  {
    id: 'derm-dress-pega', name: 'DRESS e PEGA', group: 'Farmacodermias e fotoproteção',
    kw: 'DRESS, eosinofilia, sintomas sistêmicos, RegiSCAR, PEGA, AGEP, pustulose exantemática generalizada aguda',
    tabs: [tab('DRESS e PEGA', '15:c18-s12'), tab('Conduta', '15:c18-s13')],
  },

  // ---------------------------------------------------------------- Doenças sistêmicas
  {
    id: 'derm-lupus-cutaneo', name: 'Lúpus Eritematoso Cutâneo', group: 'Doenças sistêmicas',
    kw: 'lúpus cutâneo, LECA, LECS, lúpus discoide, túmido, profundo, asa de borboleta, CLASI, hidroxicloroquina',
    tabs: [
      tab('Lesões específicas', '18:c16-s1'),
      tab('Agudo (LECA)', '18:c16-s2'),
      tab('Subagudo (LECS)', '18:c16-s3'),
      tab('Crônico', '18:c16-s4'),
      tab('Diagnóstico e tratamento', '18:c16-s5'),
    ],
  },
  {
    id: 'derm-dermatomiosite', name: 'Dermatomiosite', group: 'Doenças sistêmicas',
    kw: 'dermatomiosite, heliótropo, pápulas de Gottron, sinal do xale, fraqueza proximal, neoplasia',
    tabs: [tab('Dermatomiosite', '18:c16-s6'), tab('Quadro-resumo', '18:c16-s11')],
  },
  {
    id: 'derm-artrite-reumatoide', name: 'Artrite Reumatoide (Pele)', group: 'Doenças sistêmicas',
    kw: 'artrite reumatoide, nódulos reumatoides, vasculite reumatoide',
    tabs: [tab('Artrite reumatoide', '18:c16-s7'), tab('Quadro-resumo', '18:c16-s11')],
  },
  {
    id: 'derm-sjogren', name: 'Síndrome de Sjögren', group: 'Doenças sistêmicas',
    kw: 'Sjögren, xerostomia, xeroftalmia, síndrome seca, anti-Ro, anti-La',
    tabs: [tab('Sjögren', '18:c16-s8'), tab('Quadro-resumo', '18:c16-s11')],
  },
  {
    id: 'derm-esclerodermia', name: 'Esclerodermia (Esclerose Sistêmica)', group: 'Doenças sistêmicas',
    kw: 'esclerodermia, esclerose sistêmica, Raynaud, esclerodactilia, CREST, morfeia, anti-Scl-70, anticentrômero',
    tabs: [tab('Esclerodermia', '18:c16-s9'), tab('Quadro-resumo', '18:c16-s11')],
  },
  {
    id: 'derm-behcet', name: 'Doença de Behçet', group: 'Doenças sistêmicas',
    kw: 'Behçet, aftas orais recorrentes, úlceras genitais, uveíte, patergia',
    tabs: [tab('Behçet', '18:c16-s10'), tab('Quadro-resumo', '18:c16-s11')],
  },
  {
    id: 'derm-diabetes-pele', name: 'Pele no Diabetes e Acantose Nigricans', group: 'Doenças sistêmicas',
    kw: 'acantose nigricans, resistência insulínica, necrobiose lipoídica, granuloma anular, dermopatia diabética, diabetes',
    tabs: [tab('Caso: acantose nigricans', '18:c16-s12'), tab('Espectro cutâneo do diabetes', '18:c16-s13')],
  },
  {
    id: 'derm-tireoide-pele', name: 'Pele nas Tireopatias', group: 'Doenças sistêmicas',
    kw: 'hipotireoidismo, mixedema, hipertireoidismo, mixedema pré-tibial, Graves, madarose',
    tabs: [tab('Tireopatias', '18:c16-s15')],
  },
  {
    id: 'derm-xantomas', name: 'Xantomas (Dislipidemias)', group: 'Doenças sistêmicas',
    kw: 'xantoma, xantelasma, xantoma eruptivo, tendíneo, tuberoso, dislipidemia, hipertrigliceridemia',
    tabs: [tab('Xantomas', '18:c16-s16')],
  },
  {
    id: 'derm-adrenal-renal', name: 'Pele nas Doenças Adrenais e Renais', group: 'Doenças sistêmicas',
    kw: 'Cushing, estrias violáceas, Addison, hiperpigmentação, doença renal crônica, prurido urêmico, unha meio a meio, calcifilaxia',
    tabs: [tab('Adrenal', '18:c16-s17'), tab('Doenças renais', '18:c16-s18')],
  },
  {
    id: 'derm-digestivas-hepaticas', name: 'Pele nas Doenças Intestinais e Hepáticas', group: 'Doenças sistêmicas',
    kw: 'doença inflamatória intestinal, eritema nodoso, pioderma gangrenoso, dermatite herpetiforme, doença celíaca, cirrose, aranha vascular, icterícia, eritema palmar',
    tabs: [tab('Intestino e doença celíaca', '18:c16-s19'), tab('Doenças hepáticas', '18:c16-s20')],
  },
  {
    id: 'derm-paraneoplasicas', name: 'Dermatoses Paraneoplásicas', group: 'Doenças sistêmicas',
    kw: 'paraneoplásica, acantose nigricans maligna, sinal de Leser-Trélat, eritema gyratum repens, hipertricose lanuginosa, Sweet',
    tabs: [tab('Paraneoplásicas', '18:c16-s21')],
  },
  {
    id: 'derm-prurido', name: 'Prurido', group: 'Doenças sistêmicas',
    kw: 'prurido, coceira, prurido sistêmico, colestase, uremia, linfoma, prurido do idoso',
    tabs: [tab('Prurido', '18:c16-s22'), tab('Regras de ouro', '18:c16-s23')],
  },

  // ---------------------------------------------------------------- Semiologia armada
  {
    id: 'derm-dermatoscopia-wood', name: 'Dermatoscopia e Lâmpada de Wood', group: 'Semiologia armada',
    kw: 'dermatoscopia, dermatoscópio, regra ABCD, rede pigmentar, lâmpada de Wood, fluorescência, exames complementares',
    tabs: [
      tab('Dermatoscopia', '3:c03-s4', '3:c03-s5'),
      tab('Diagnósticos dermatoscópicos', '3:c03-s6'),
      tab('Lâmpada de Wood', '3:c03-s7'),
      tab('Aula prática', '16:c14-s7'),
      tab('Outros exames', '3:c03-s8'),
    ],
  },
];
