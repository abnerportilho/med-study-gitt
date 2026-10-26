// Manual Oficial de Orientações para o Paciente com Doença Renal Crônica (DRC)
// Conteúdo idêntico ao documento clínico oficial "CUIDANDO DOS SEUS RINS"

export interface CKDMedication {
  generic: string;
  brands: string;
}

export interface CKDSection {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  intro?: string;
  bullets?: string[];
  medications?: CKDMedication[];
  statement?: string;
  prefer?: string;
  note?: string;
  care?: string;
  warning?: string;
  highlight?: string;
  footer?: string;
}

export const CKD_HEADER_TEXT = {
  title: "CUIDANDO DOS SEUS RINS",
  p1: "Ter Doença Renal Crônica (DRC) significa que seus rins precisam de mais cuidado.",
  p2: "Algumas mudanças simples no dia a dia podem ajudar a proteger seus rins e evitar que a doença avance mais rápido."
};

export const CKD_GUIDE_SECTIONS: CKDSection[] = [
  {
    id: "sal",
    number: "1",
    title: "USE MENOS SAL",
    subtitle: "O excesso de sal pode aumentar a pressão arterial e aumentar a sobrecarga sobre os rins.",
    intro: "Por isso:",
    bullets: [
      "use menos sal no preparo dos alimentos;",
      "evite acrescentar sal depois que a comida estiver pronta;",
      "dê preferência a temperos naturais;",
      "reduza alimentos industrializados e embutidos, que costumam ter muito sódio."
    ],
    footer: "Lembre: menos sal ajuda a proteger a pressão e os rins."
  },
  {
    id: "embutidos",
    number: "2",
    title: "EVITE EMBUTIDOS E ULTRAPROCESSADOS",
    subtitle: "Presunto, mortadela, salame, salsicha, linguiça, bacon, macarrão instantâneo, salgadinhos e temperos prontos costumam ter muito sódio e fósforo.",
    bullets: [
      "O consumo frequente desses alimentos pode dificultar o controle da pressão e aumentar a retenção de líquidos."
    ],
    footer: "Prefira comida preparada em casa sempre que possível."
  },
  {
    id: "carne",
    number: "3",
    title: "NÃO EXAGERE NA CARNE",
    subtitle: "Seu corpo precisa de proteína, mas o excesso pode aumentar o trabalho dos rins.",
    intro: "Uma forma simples de lembrar:",
    bullets: [
      "a porção de carne da refeição pode ter aproximadamente o tamanho da palma da sua mão."
    ],
    prefer: "Prefira mais vezes: peixe e frango.",
    note: "Carne vermelha pode fazer parte da alimentação, mas deve ser consumida com moderação.",
    footer: "A quantidade ideal de proteína pode mudar de pessoa para pessoa."
  },
  {
    id: "avise",
    number: "4",
    title: "SEMPRE AVISE QUE VOCÊ TEM DOENÇA RENAL",
    subtitle: "Toda vez que passar por um médico, dentista, pronto-socorro ou receber uma receita nova, lembre de dizer:",
    statement: "“EU TENHO DOENÇA RENAL CRÔNICA ESTÁGIO _____ ”",
    footer: "Isso é importante porque alguns medicamentos precisam ser evitados ou ter suas doses ajustadas."
  },
  {
    id: "antiinflamatorios",
    number: "5",
    title: "CUIDADO COM ANTI-INFLAMATÓRIOS",
    subtitle: "Alguns medicamentos usados para dor e inflamação podem diminuir o fluxo de sangue para os rins e piorar seu funcionamento, principalmente em quem já tem Doença Renal Crônica.",
    intro: "Alguns exemplos comuns são:",
    medications: [
      { generic: "Diclofenaco", brands: "Voltaren®, Cataflam®" },
      { generic: "Ibuprofeno", brands: "Advil®, Alivium®" },
      { generic: "Naproxeno", brands: "Flanax®" },
      { generic: "Nimesulida", brands: "Nisulid®, Scaflam®" },
      { generic: "Cetoprofeno", brands: "Profenid®" }
    ],
    note: "Existem outras marcas com esses mesmos medicamentos. Por isso, não se guie apenas pelo nome da caixa.",
    warning: "Não tome anti-inflamatório por conta própria apenas sobre supervisão medica."
  },
  {
    id: "chas",
    number: "6",
    title: "CUIDADO COM CHÁS, SUPLEMENTOS E “PRODUTOS NATURAIS”",
    subtitle: "Natural não significa que seja seguro para os rins. Algumas ervas e chás podem prejudicar os rins, alterar a pressão, aumentar ou diminuir o potássio ou interagir com seus medicamentos.",
    intro: "Alguns exemplos que devem ser evitados sem orientação médica incluem:",
    bullets: [
      "chá de cavalinha;",
      "chá ou produtos com alcaçuz;",
      "uva-ursi / uva-de-urso;",
      "chá de sene, principalmente quando usado frequentemente como laxante;",
      "misturas de ervas vendidas como “chá para os rins”, “chá detox”, “chá para desinchar” ou “chá para emagrecer”."
    ],
    care: "Também tenha cuidado com garrafadas, ervas medicinais, suplementos, vitaminas e produtos de academia. Não inicie suplementos alimentares sem antes conversar com um médico.",
    warning: "Não existe “chá para limpar os rins”"
  },
  {
    id: "corpo",
    number: "7",
    title: "MEXA O CORPO",
    subtitle: "A atividade física ajuda no controle da pressão, do peso, da glicemia e da saúde cardiovascular.",
    intro: "Caminhadas e outras atividades simples já podem ajudar.",
    footer: "O importante é evitar ficar parado por longos períodos e respeitar seus limites."
  },
  {
    id: "fumo",
    number: "8",
    title: "REDUZA AO MAXIMO O FUMO",
    subtitle: "O cigarro prejudica os vasos sanguíneos e pode aumentar o risco de doenças do coração e dos rins.",
    footer: "Parar de fumar também faz parte do tratamento da doença renal. Se estiver difícil parar sozinho, peça ajuda à equipe de saúde."
  },
  {
    id: "pressao_diabetes",
    number: "9",
    title: "CONTROLE A PRESSÃO E O DIABETES",
    subtitle: "Pressão alta e diabetes podem piorar a função dos rins ao longo do tempo.",
    intro: "Por isso:",
    bullets: [
      "tome os medicamentos corretamente;",
      "Não pare, troque ou diminua a dose sem orientação médica;",
      "acompanhe sua pressão;",
      "controle a glicemia, se tiver diabetes;",
      "compareça às consultas e faça os exames solicitados."
    ],
    footer: "Cuidar da pressão e do diabetes também é cuidar dos rins."
  },
  {
    id: "agua",
    number: "10",
    title: "ÁGUA: CADA PACIENTE É DIFERENTE",
    subtitle: "A quantidade de agua ideal para você é: __________________",
    footer: "Não há necessidade de aumentar ou diminuir o consumo de agua, atinja a nossa meta."
  },
  {
    id: "dapagliflozina_higiene",
    number: "11",
    title: "DAPAGLIFLOZINA, EMPAGLIFLOZINA E CUIDADOS DE HIGIENE ÍNTIMA",
    subtitle: "Medicamentos como Dapagliflozina (Forxiga®) e Empagliflozina (Jardiance®) protegem os rins eliminando glicose (açúcar) pela urina. Por isso, a higiene íntima exige atenção especial para prevenir micoses e infecções.",
    intro: "Recomendações essenciais para quem usa essas medicações:",
    bullets: [
      "lave ou seque muito bem a região genital com água e papel após urinar, sem deixar umidade;",
      "evite roupas íntimas sintéticas e muito justas; dê preferência a peças de algodão que permitam ventilação;",
      "ao notar coceira, ardor, vermelhidão ou secreção, avise sua equipe de saúde imediatamente (o tratamento é simples e rápido)."
    ],
    footer: "Manter a região íntima limpa e seca garante a proteção dos seus rins sem desconfortos."
  }
];

export const CKD_RULES_OF_KIDNEYS = [
  "MENOS SAL.",
  "MENOS EMBUTIDOS E INDUSTRIALIZADOS.",
  "CARNE SEM EXAGERO.",
  "NÃO TOME ANTI-INFLAMATÓRIO POR CONTA PRÓPRIA.",
  "NÃO FUME.",
  "CONTROLE A PRESSÃO E O DIABETES.",
  "TOME SEUS REMÉDIOS CORRETAMENTE.",
  'E SEMPRE DIGA: “EU TENHO DOENÇA RENAL CRÔNICA.”'
];

export interface FoodItem {
  name: string;
  category: 'frutas' | 'vegetais' | 'proteinas' | 'temperos' | 'bebidas' | 'industrializados';
  status: 'verde' | 'amarelo' | 'vermelho';
  reason: string;
  tip?: string;
}

export const FOOD_DATABASE: FoodItem[] = [
  // Frutas
  { name: 'Maçã (com ou sem casca)', category: 'frutas', status: 'verde', reason: 'Baixo potássio, rica em fibras solúveis', tip: 'Excelente para lanches diários' },
  { name: 'Pera', category: 'frutas', status: 'verde', reason: 'Baixo potássio e baixo índice glicêmico', tip: 'Consumir crua ou assada com canela' },
  { name: 'Melancia', category: 'frutas', status: 'verde', reason: 'Baixo potássio por porção', tip: 'Atenção ao volume de líquido se estiver em restrição hídrica' },
  { name: 'Abacaxi fresco', category: 'frutas', status: 'verde', reason: 'Baixo potássio, digestivo', tip: 'Prefira natural; evite em calda açucarada' },
  { name: 'Morango e Frutas Vermelhas', category: 'frutas', status: 'verde', reason: 'Baixo potássio, antioxidantes potentes', tip: 'Ótima opção refrescante' },
  { name: 'Goiaba branca ou vermelha', category: 'frutas', status: 'verde', reason: 'Baixo a moderado potássio, rica em vitamina C' },
  { name: 'Uva (verde ou roxa)', category: 'frutas', status: 'verde', reason: 'Baixo potássio por porção usual (10 a 15 bagos)' },
  
  { name: 'Laranja-pera ou suco de laranja', category: 'frutas', status: 'amarelo', reason: 'Potássio moderado a alto no suco concentrado', tip: 'Prefira comer 1 fruta inteira com bagaço; evite suco coado puro' },
  { name: 'Mamão papaia ou formosa', category: 'frutas', status: 'amarelo', reason: 'Moderado em potássio', tip: 'Consumir no máximo 1 fatia fina por vez' },
  { name: 'Manga', category: 'frutas', status: 'amarelo', reason: 'Moderado em potássio', tip: 'Consumir em pequenas porções' },
  
  { name: 'Banana-nanica ou prata', category: 'frutas', status: 'vermelho', reason: 'Muito rica em potássio (~400 mg por unidade)', tip: 'Se potássio alto, limite a meia unidade ou substitua por maçã/pera' },
  { name: 'Abacate', category: 'frutas', status: 'vermelho', reason: 'Altíssimo teor de potássio', tip: 'Evitar nos estágios avançados com tendência a hipercalemia' },
  { name: 'Água de Coco', category: 'frutas', status: 'vermelho', reason: 'Verdadeira "bomba" de potássio concentrado', tip: 'Pode elevar o potássio no sangue rapidamente' },
  { name: 'Frutas secas (uva-passa, ameixa, damasco)', category: 'frutas', status: 'vermelho', reason: 'Potássio desidratado e concentrado', tip: 'Evitar em estágios G3b a G5' },
  { name: 'CARAMBOLA (Fruta ou Suco)', category: 'frutas', status: 'vermelho', reason: 'PROIBIÇÃO ABSOLUTA: Neurotoxina Caramboxina', tip: 'Causa soluço incoercível, convulsões e risco de morte!' },

  // Vegetais e Legumes
  { name: 'Chuchu', category: 'vegetais', status: 'verde', reason: 'Baixíssimo potássio, leve e versátil' },
  { name: 'Abobrinha', category: 'vegetais', status: 'verde', reason: 'Baixo potássio' },
  { name: 'Pepino', category: 'vegetais', status: 'verde', reason: 'Baixo potássio e refrescante' },
  { name: 'Cenoura cozida (duplo cozimento)', category: 'vegetais', status: 'verde', reason: 'Após fervura e descarte da água, fica segura' },
  { name: 'Alface e Rúcula', category: 'vegetais', status: 'verde', reason: 'Baixo potássio por porção de folhas' },
  { name: 'Berinjela', category: 'vegetais', status: 'verde', reason: 'Baixo potássio quando cozida' },

  { name: 'Tomate cru (salada)', category: 'vegetais', status: 'amarelo', reason: 'Moderado potássio', tip: 'Coma 1 a 2 rodelas finas, sem sementes se desejar' },
  { name: 'Beterraba cozida', category: 'vegetais', status: 'amarelo', reason: 'Moderado potássio e oxalato', tip: 'Cozinhar com bastante água e escorrer' },
  { name: 'Feijão (1 concha média do caldo ralo)', category: 'vegetais', status: 'amarelo', reason: 'Aporte de potássio e fósforo vegetal', tip: 'Deixar de molho por 12h, desprezar a água e cozinhar em água nova' },

  { name: 'Batata-inglesa ou baroa crua/frita', category: 'vegetais', status: 'vermelho', reason: 'Altíssimo potássio se não cozida duas vezes', tip: 'Obrigatório descascar, cortar, ferver, jogar a água fora e cozinhar de novo!' },
  { name: 'Mandioca / Macaxeira frita', category: 'vegetais', status: 'vermelho', reason: 'Alto potássio concentrado', tip: 'Ferver e trocar a água se for consumir moderadamente' },
  { name: 'Extrato ou Molho de Tomate concentrado', category: 'vegetais', status: 'vermelho', reason: 'Potássio e sódio maciços em latas e sachês', tip: 'Faça molho caseiro com tomate fresco cozido e escorrido' },
  { name: 'Espinafre e Couve crua', category: 'vegetais', status: 'vermelho', reason: 'Muito ricos em potássio e oxalato', tip: 'Se for consumir, cozinhe brevemente e descarte a água' },

  // Temperos e Sal
  { name: 'Ervas frescas (Alecrim, Orégano, Manjericão, Tomilho)', category: 'temperos', status: 'verde', reason: 'Dão sabor rico sem sódio', tip: 'Use à vontade para aromatizar carnes, legumes e azeite' },
  { name: 'Alho e Cebola frescos', category: 'temperos', status: 'verde', reason: 'Anti-inflamatórios naturais com sabor marcante', tip: 'Refogue com um fio de azeite extravirgem' },
  { name: 'Gotas de Limão e Vinagre de Maçã', category: 'temperos', status: 'verde', reason: 'Realçam o paladar das papilas sem necessidade de sódio' },
  { name: 'Cúrcuma / Açafrão-da-terra e Gengibre', category: 'temperos', status: 'verde', reason: 'Potentes compostos protetores naturais' },

  { name: 'Sal de cozinha comum (com moderação extrema)', category: 'temperos', status: 'amarelo', reason: 'Limite máximo: 1 colher de café rasa por dia (2g de sal)', tip: 'Adicione no final do prato para sentir mais o sabor' },

  { name: 'SAL DIET OU SAL LIGHT (Cloreto de Potássio)', category: 'temperos', status: 'vermelho', reason: 'PERIGO MORTAL! Substitui sódio por potássio puro', tip: 'Pode causar arritmia cardíaca fatal em poucas horas na DRC!' },
  { name: 'Caldos em cubos e temperos prontos em pó', category: 'temperos', status: 'vermelho', reason: 'Sódio puro, glutamato e fósforo inorgânico químico', tip: 'Banir da despensa da família' },
  { name: 'Molho de soja (Shoyu), Inglês ou Catchup', category: 'temperos', status: 'vermelho', reason: 'Concentração altíssima de sódio e conservantes' },

  // Proteínas & Laticínios
  { name: 'Clara de Ovo cozida', category: 'proteinas', status: 'verde', reason: 'Proteína pura de alto valor biológico com baixíssimo fósforo', tip: 'Excelente fonte proteica limpa para pacientes renais' },
  { name: 'Peixe fresco grelhado (tilápia, pescada)', category: 'proteinas', status: 'verde', reason: 'Fácil digestão, fósforo orgânico de absorção controlada' },
  { name: 'Peito de frango sem pele cozido ou grelhado', category: 'proteinas', status: 'verde', reason: 'Proteína magra', tip: 'Porção do tamanho da palma da sua mão' },

  { name: 'Gema de Ovo', category: 'proteinas', status: 'amarelo', reason: 'Concentra o fósforo do ovo', tip: 'Consumir até 2 a 3 gemas por semana se fósforo controlado' },
  { name: 'Carne bovina magra (patinho, alcatra)', category: 'proteinas', status: 'amarelo', reason: 'Rica em proteína e fósforo orgânico', tip: 'Consumir porções controladas conforme seu estágio' },
  { name: 'Leite e Iogurte natural', category: 'proteinas', status: 'amarelo', reason: 'Fontes de cálcio, mas também de fósforo e potássio', tip: 'Limite a 1 copo pequeno (150 mL) ao dia' },

  { name: 'Embutidos (Presunto, Mortadela, Salame, Linguiça, Salsicha)', category: 'proteinas', status: 'vermelho', reason: 'Aditivos químicos de fósforo inorgânico (absorção 100%) + sódio', tip: 'Destroem os vasos sanguíneos e aceleram a diálise' },
  { name: 'Queijos amarelos e fundidos (Cheddar, Prato, Polenguinho)', category: 'proteinas', status: 'vermelho', reason: 'Maciço em fósforo químico e sódio', tip: 'Se for comer queijo, prefira pequenas lascas de queijo branco fresco' },

  // Bebidas & Industrializados
  { name: 'Água pura filtrada', category: 'bebidas', status: 'verde', reason: 'O melhor hidratante celular', tip: 'Adequar a quantidade à meta estipulada pelo seu médico' },
  { name: 'Chá de Erva-Cidreira, Camomila ou Erva-Doce', category: 'bebidas', status: 'verde', reason: 'Chás claros e calmantes sem cafeína excessiva' },

  { name: 'Café coado fraco', category: 'bebidas', status: 'amarelo', reason: 'Pequena quantidade de potássio', tip: 'Até 2 xícaras pequenas ao dia' },

  { name: 'Refrigerantes escuros (tipo Cola)', category: 'industrializados', status: 'vermelho', reason: 'Ácido Fosfórico puro adicionado industrialmente', tip: 'Fósforo inorgânico 100% absorvido; acelera calcificação arterial' },
  { name: 'Bebidas isotônicas e energéticos', category: 'industrializados', status: 'vermelho', reason: 'Sobrecarregados de sais minerais, sódio e potássio' },
  { name: 'Comidas congeladas prontas (lasanha, pizza)', category: 'industrializados', status: 'vermelho', reason: 'Bombas de sódio e conservantes fosfatados' }
];
