export interface ModeloConsultaItem {
  id: string;
  title: string;
  shortTitle: string;
  category: 'pediatria' | 'adolescentes' | 'clinica';
  categoryLabel: string;
  badge: string;
  description: string;
  tags: string[];
  templatePadrao: string;
  templateExemplo: string;
  snippets: { label: string; text: string }[];
}

export const MODELOS_CONSULTA: ModeloConsultaItem[] = [
  {
    id: 'pediatria',
    title: 'Puericultura / Pediatria Geral (0 a 10 anos)',
    shortTitle: 'Puericultura (0-10 anos)',
    category: 'pediatria',
    categoryLabel: 'Puericultura & Pediatria',
    badge: 'Rotina Pediátrica',
    description: 'Acompanhamento do crescimento, rotina com horários, DNPM, alimentação, sono, vacinação e exame físico minucioso com diagnósticos hexapartidos da SBP.',
    tags: ['Puericultura', 'Crescimento', 'DNPM', 'Vacinas', 'Alimentação', 'Telas', 'SBP'],
    templatePadrao: `paciente acompanhado por 

QP - 

HMA - 

AP -

AF -

ALIMENTAÇÃO / ROTINA - 
acorda -  
almoça -   
lanches -  
janta -   
doce - 
agua - 
dorme - local 

VITAMINAS - 

FEZES - 
URINA - 

VACINAÇÃO - 
DNPM - 

AMBIENTE - mora com 
 
COMPORTAMENTO - 

ESCOLA - 

TELA -

#ANTECEDENTES NEONATAIS E PATOLÓGICOS 


#ANTECEDENTES FAMILIARES



#EXAME FÍSICO 
BEG, corado, hidratado, ativo, reativo 
otoscopia sem alteração 
oroscopia sem lesões
AP MVFD S/ RA
ACV 2brnf s/ sopro
ABD flacido, indolor palpação, rha +, timpanico, sem vmg
Genitália tipica 
EXTREMIDADES: sem lesões

altura - 
peso - 
PC - 


#DIAGNÓSTICOS 
Crescimento - 
Estado nutricional - 
Vacinação - 
Alimentação - 
DNPM -
Ambiente - 
`,
    templateExemplo: `paciente acompanhado por Mãe (informante confiável).

QP - Consulta de puericultura de rotina. Mãe refere que a criança está bem, sem queixas ativas no momento.

HMA - Criança em seguimento ambulatorial regular de puericultura aos 2 anos de idade. Nega episódios de febre, tosse, vômitos, diarreia ou outras intercorrências desde a última consulta. Boa aceitação alimentar e ganho ponderoestatural progressivo.

AP - Nascido de parto vaginal a termo (39 sem), sem intercorrências neonatais. Nega internações ou cirurgias prévias. Nega alergias alimentares ou medicamentosas conhecidas.

AF - Pais hígidos, não consanguíneos. Nega histórico familiar de asma grave, cardiopatias congênitas ou nefropatias precoces.

ALIMENTAÇÃO / ROTINA - 
acorda - 07:30 (desjejum com leite integral e frutas)
almoça - 12:00 (arroz, feijão, proteína magra, legumes e verduras)
lanches - 15:30 (frutas da estação picadas + água)
janta - 19:30 (mesmo padrão do almoço)
doce - Sem consumo de doces, refrigerantes ou guloseimas
agua - Ingestão hídrica de cerca de 1.000 mL/dia
dorme - local: 21:00 às 07:00 em cama própria no quarto dos pais, sono contínuo e reparador

VITAMINAS - Vitamina D3 400 UI/dia em uso regular.

FEZES - Padrão Bristol 4, hábito diário (1x/dia), sem dor ou esforço evacuatório.
URINA - Diurese clara, sem odor forte, cerca de 5-6 fraldas úmidas/dia.

VACINAÇÃO - Em dia de acordo com o PNI para os 2 anos (revisada caderneta de vacinação física).
DNPM - Corre com desenvoltura, sobe e desce degraus, constrói torre de 6 cubos, forma frases de 2-3 palavras ("quero água", "dá bola"), aponta partes do corpo e expressa desejos. Adequado para a idade.

AMBIENTE - mora com mãe, pai e avó materna em casa de alvenaria, saneamento básico completo, sem animais intra-domicílio e sem tabagismo passivo no lar.
 
COMPORTAMENTO - Brincalhão, comunicativo, interage bem com pares e familiares, sem birras desproporcionais ou sinais de isolamento.

ESCOLA - Frequenta creche período matutino; boa adaptação social relatada pelos educadores.

TELA - Zero telas (orientada família sobre a diretriz da SBP que contraindica exposição a telas digitais antes dos 2 anos e restringe a máx 1h/dia após os 2 anos com supervisão).

#ANTECEDENTES NEONATAIS E PATOLÓGICOS 
Parto normal, PN: 3.250g, Comprimento: 49cm, PC: 35cm, Apgar 9/10, Triagem neonatal (teste do pezinho, orelhinha, olhinho, coraçãozinho e linguinha) todos normais.

#ANTECEDENTES FAMILIARES
Avô paterno hipertenso; demais familiares de primeiro grau hígidos.

#EXAME FÍSICO 
BEG, corado, hidratado, ativo, reativo, acianótico, anictérico.
otoscopia sem alteração (membranas timpânicas íntegras, translúcidas e brilhantes bilateralmente)
oroscopia sem lesões, dentição completa para idade sem cáries visíveis
AP MVFD S/ RA, eupneico em ar ambiente (FR: 24 irpm)
ACV 2brnf s/ sopro, bulhas rítmicas e normofonéticas (FC: 98 bpm)
ABD flacido, indolor palpação, rha +, timpanico, sem vmg
Genitália tipica masculina, testículos tópicos na bolsa escrotal bilateralmente sem hérnias
EXTREMIDADES: sem lesões, pulsos periféricos amplos e simétricos, boa perfusão periférica (< 2s)

altura - 88 cm (Escore-z entre 0 e +1)
peso - 12.8 kg (Escore-z entre 0 e +1)
PC - 48.5 cm (Escore-z 0)

#DIAGNÓSTICOS 
Crescimento - Adequado, canal de crescimento estável no percentil 50.
Estado nutricional - Eutrofia (IMC/Idade no percentil 50).
Vacinação - Em dia de acordo com o PNI.
Alimentação - Saudável e variada, sem ultraprocessados.
DNPM - Adequado para a faixa etária.
Ambiente - Favorável ao desenvolvimento biopsicossocial.
`,
    snippets: [
      { label: '+ Acomp: Mãe', text: 'paciente acompanhado por Mãe (informante confiável).' },
      { label: '+ Acomp: Pais', text: 'paciente acompanhado por Pai e Mãe.' },
      { label: '+ Exame BEG Padrão', text: 'BEG, corado, hidratado, ativo e reativo, acianótico, anictérico.\nOtoscopia: MTs íntegras e translúcidas bilateralmente.\nOroscopia: sem lesões, sem hiperemia de orofaringe.\nAP: MVFD sem ruídos adventícios, eupneico.\nACV: 2BRNF sem sopros.\nABD: flácido, indolor, RHA presentes, sem visceromegalias.\nGenitália típica, extremidades sem edemas ou lesões.' },
      { label: '+ Vacinas em Dia', text: 'VACINAÇÃO: Em dia conforme o Programa Nacional de Imunizações (PNI).' },
      { label: '+ DNPM Adequado', text: 'DNPM: Marcos do desenvolvimento neuropsicomotor adequados para a faixa etária.' },
      { label: '+ Zero Telas (<2a)', text: 'TELA: Zero exposição a telas (televisão, tablet ou smartphone), conforme recomendação da SBP.' },
      { label: '+ Telas < 1h/dia', text: 'TELA: Exposição a telas inferior a 1 hora/dia, sempre supervisionada por adultos.' },
      { label: '+ Sono Regular', text: 'Dorme cerca de 10-11 horas por noite em berço/cama própria, sono contínuo e reparador.' },
      { label: '+ D3 e Ferro Profl', text: 'VITAMINAS: Vitamina D 400 UI/dia e Sulfato Ferroso profilático 1 mg/kg/dia em uso regular.' }
    ]
  },
  {
    id: 'adolescentes',
    title: 'Adolescentes / Hebiatria (Método HEEADSSS)',
    shortTitle: 'Hebiatria (HEEADSSS)',
    category: 'adolescentes',
    categoryLabel: 'Hebiatria & Adolescente',
    badge: 'Rotina Hebiátrica',
    description: 'Avaliação psicossocial estruturada do adolescente: Casa, Alimentação, Escola, Drogas/Telas, Sexualidade, Segurança e Humor/Suicídio com garantia de sigilo médico.',
    tags: ['HEEADSSS', 'Sigilo', 'Tanner', 'Puberdade', 'Saúde Mental', 'Telas', 'SBP'],
    templatePadrao: `ADOLESCENTES (MÉTODO HEEADSSS)

HOME (CASA) 
Onde você mora? 
Quem reside na casa com você?
O ambiente é calmo ou “agitado”? 
Quem briga mais na tua casa?

EATING DISORDERS (DISTURBIOS ALIMENTARES) 
Já fez dieta? 
Gosta de seu corpo?
Esta contente com seu peso e altura?

EMPREGO/ESTUDO
Esta na escola? Qual série?
Trabalha? Com o que?

DROGAS / ATIVIDADES / TELAS
O que você faz além da escola? Pratica esporte?
Qual? Quantas vezes por semana? Utiliza celular?
Você joga videogame?
Quanto tempo passa entre celular, games, TV, computador,
telinhas em geral?
Uso de Substâncias (Álcool / Tabaco / Vape / SPA): 

SEXUALIDADE
Já ficou? Está apaixonado/a? Divide sua intimidade corporal com
alguém? Já teve relações sexuais?
Com pessoas de sexo oposto, mesmo sexo, ou tanto faz?
Orientações / Contracepção / Prevenção de ISTs: 

SEGURANÇA
Já sofreu algum tipo de violência? Onde? Por quem?
Assalto? Bullying? Já causou violência em alguém?
Consequências?

SUICÍDIO & SAÚDE MENTAL
O que você faz quando se sente triste: fica quieto?
Chora? Já pensou em desaparecer / se machucar? Já tentou?

#EXAME FÍSICO DO ADOLESCENTE
BEG, corado, hidratado, acianótico, anictérico.
Tireoide: 
ACV: 
AP: 
Abdome: 
Coluna (Teste de Adams): 
Pele: 
Estadiamento Puberal (Tanner): M__ P__ / G__ P__
Antropometria: Peso: __ kg | Estatura: __ cm | IMC: __ kg/m²
`,
    templateExemplo: `ADOLESCENTES (MÉTODO HEEADSSS)
(Consulta realizada em dois tempos: primeiro com a responsável, seguido de momento individual e privativo com o adolescente com pactuação expressa de sigilo médico, conforme resolução CFM nº 1.931/2009 e SBP).

HOME (CASA) 
Onde você mora? Reside em casa própria em bairro urbano pavimentado.
Quem reside na casa com você? Mora com a mãe e uma irmã mais nova de 10 anos.
O ambiente é calmo ou “agitado”? Refere ambiente geralmente calmo e acolhedor.
Quem briga mais na tua casa? Conflitos ocasionais com a irmã por brinquedos/espaço, sem episódios de violência física ou verbal grave.

EATING DISORDERS (DISTURBIOS ALIMENTARES) 
Já fez dieta? Nega dietas restritivas por conta própria ou uso de laxantes/diuréticos/inibidores de apetite.
Gosta de seu corpo? Satisfeito(a) no geral, expressa desejo pontual de ganhar massa muscular.
Esta contente com seu peso e altura? Sim, sem distorção da imagem corporal ou preocupação obsessiva com balança.

EMPREGO/ESTUDO
Esta na escola? Qual série? Cursa o 1º ano do Ensino Médio em escola pública estadual. Turno matutino. Bom desempenho escolar e frequência assídua.
Trabalha? Com o que? Não trabalha; dedica-se exclusivamente aos estudos no momento.

DROGAS / ATIVIDADES / TELAS
O que você faz além da escola? Pratica esporte? Joga futebol com amigos aos finais de semana e caminha até a escola.
Qual? Quantas vezes por semana? Futebol 2x por semana (cerca de 2h semanais).
Utiliza celular? Você joga videogame? Sim, utiliza smartphone e joga videogame ocasionalmente.
Quanto tempo passa entre celular, games, TV, computador, telinhas em geral? Cerca de 3 a 4 horas por dia (fora atividades escolares). Orientado sobre higiene do sono e desligar telas 1h antes de dormir.
Uso de Substâncias (Álcool / Tabaco / Vape / SPA): Nega uso de cigarro comum, vape/cigarro eletrônico, narguilé ou bebidas alcoólicas. Nega uso de maconha ou outras substâncias ilícitas.

SEXUALIDADE
Já ficou? Está apaixonado/a? Divide sua intimidade corporal com alguém? Refere que já ficou com pares da mesma faixa etária; no momento sem relacionamento fixo.
Já teve relações sexuais? Nega início de atividade sexual com penetração.
Com pessoas de sexo oposto, mesmo sexo, ou tanto faz? Refere atração por pessoas do sexo oposto.
Orientações / Contracepção / Prevenção de ISTs: Esclarecidas dúvidas sobre anatomia, métodos contraceptivos de barreira (preservativo interno e externo) e prevenção de ISTs, vacinação contra HPV e hepatite B revisadas.

SEGURANÇA
Já sofreu algum tipo de violência? Onde? Por quem? Nega violência física, psicológica ou sexual.
Assalto? Bullying? Já causou violência em alguém? Nega bullying escolar ou cyberbullying. Nega assaltos recentes ou envolvimento em brigas.
Consequências? Nega envolvimento em conflito com a lei. Utiliza capacete ao andar de bicicleta e cinto de segurança no carro.

SUICÍDIO & SAÚDE MENTAL
O que você faz quando se sente triste: fica quieto? Chora? Refere que quando fica triste costuma ouvir música no quarto e conversar com um amigo próximo; chora esporadicamente quando muito frustrado(a), sem perda do autocuidado.
Já pensou em desaparecer / se machucar? Já tentou? NEGA autolesão não suicida (cutting), NEGA ideação suicida, plano ou qualquer tentativa prévia de autoextermínio. Refere boa rede de apoio afetivo familiar e de amizades. Orientado sobre canais de escuta e acolhimento (CVV 188 e retorno imediato se sofrimento psíquico).

#EXAME FÍSICO DO ADOLESCENTE
BEG, corado, hidratado, acianótico, anictérico.
Tireoide: tópica, fibroelástica, indolor, sem nódulos ou bócio.
ACV: 2BRNF sem sopros, PA: 112/72 mmHg (Percentil < 90).
AP: MVFD sem ruídos adventícios, eupneico.
Abdome: flácido, indolor, sem visceromegalias.
Coluna (Teste de Adams): Negativo (sem assimetria de gibosidades ou desvio patológico).
Pele: acne vulgar comedoniana leve na zona T facial, sem cicatrizes profundas.
Estadiamento Puberal (Tanner): G4 P4 (compatível com a idade cronológica).
Antropometria: Peso: 58.0 kg | Estatura: 168.0 cm | IMC: 20.5 kg/m² (Escore-z entre -1 e +1, Eutrófico).
`,
    snippets: [
      { label: '+ Sigilo Pactuado', text: 'Consulta realizada com garantia de sigilo e confidencialidade médica garantida, conforme Código de Ética Médica e recomendações da SBP.' },
      { label: '+ Nega SPA / Vape', text: 'Nega tabagismo, uso de cigarros eletrônicos (vape/pod), bebidas alcoólicas ou substâncias psicoativas ilícitas.' },
      { label: '+ Nega Ideação Suicida', text: 'Nega autolesão, ideação suicida, planos ou tentativas prévias de autoextermínio. Boa rede de apoio afetivo familiar.' },
      { label: '+ Adams Negativo', text: 'Coluna vertebral: Teste de Adams negativo, sem evidência de gibosidade ou assimetria escoliótica.' },
      { label: '+ Tanner G4P4', text: 'Estadiamento Puberal (Tanner): Genitália G4, Pilosidade pubiana P4.' },
      { label: '+ Tanner M4P4', text: 'Estadiamento Puberal (Tanner): Desenvolvimento mamário M4, Pilosidade pubiana P4.' },
      { label: '+ Orientações ISTs', text: 'Orientado sobre educação em saúde sexual, uso sistemático de preservativo (dupla proteção) e vacinação contra HPV.' }
    ]
  },
  {
    id: 'clinica-medica',
    title: 'Clínica Médica (Modelo Padrão Ambulatorial)',
    shortTitle: 'Clínica Médica Padrão',
    category: 'clinica',
    categoryLabel: 'Clínica Médica',
    badge: 'Ambulatório Geral',
    description: 'Anamnese estruturada com ID, QP, HPMA, HP, HF, HV, Diário Alimentar, MUC, Exames Complementares, HD, Conduta e discussão de caso.',
    tags: ['Clínica Médica', 'Ambulatório', 'HPMA', 'MUC', 'Diário Alimentar', 'HD', 'Conduta'],
    templatePadrao: `ID: 

QP: 

HPMA:

HP: 

HF:
 
HV: 

DIARIO ALIMENTAR: 

MUC: 
(1) - 
(2) - 
(3) - 
(4) - 
(5) - 
(6) - 

EXAMES COMPLEMENTARES: 

AO EXAME FISICO 

BEG, CHAAAAE, LOTE 
ACV: BRNF 2T SRA
AP: MUV+ SRA, PERCUSSAO CLAROPULMONAR NORMODISTRIBUIDA 
ABDOME: RHA PRESENTE SRA, FLACIDO, SEM DOR A PALPAÇAÕ 
MMII: Bem perfundidos SEM EDEMA E LESOES, CACIFO NEGATIVO, PULSOS PALPAVEIS 

HD: 

CONDUTA: 

CASO DISCUTIDO COM _____ - ABNER PORTILHO MEDICINA UNIP 4 ANO
`,
    templateExemplo: `ID: J. S. O., 52 anos, masculino, pardo, casado, motorista de aplicativo, natural e procedente de São Paulo - SP.

QP: "Vim para consulta de rotina e acompanhamento de pressão alta e glicose."

HPMA: Paciente com diagnóstico prévio de Hipertensão Arterial Sistêmica há 6 anos e Diabetes Mellitus tipo 2 há 3 anos. Relata bom estado geral, assintomático no momento da consulta. Nega dor precordial, palpitações, dispneia aos esforços ou edema vespertino em membros inferiores. Nega sintomas de hipoglicemia (tremores, sudorese fria, tonturas) ou sintomas descompensatórios de diabetes (poliúria, polidipsia, perda de peso involuntária). Nega cefaleia ou alterações visuais.

HP: 
- Comorbidades: HAS estágio 1, DM2, sobrepeso (IMC 27.4 kg/m²). Nega histórico de IAM, AVC, DRC ou asma.
- Cirurgias: Apendicectomia aos 20 anos sem intercorrências.
- Alergias: Nega alergias medicamentosas conhecidas.
HF: Pai hipertenso faleceu aos 74 anos por complicações de AVC. Mãe viva, 76 anos, com DM2 e hipotireoidismo. Nega histórico familiar de neoplasias precoces.
HV: 
- Tabagismo: Não tabagista (nunca fumou).
- Etilismo: Nega consumo de bebidas alcoólicas.
- Atividade Física: Sedentário no momento devido à rotina de trabalho.
- Sono: 6 a 7 horas por noite, sem roncos intensos ou apneias referidas.
DIARIO ALIMENTAR: 
- Café da manhã (07:00): Café com açúcar + pão francês com margarina.
- Almoço (12:30): Arroz branco, feijão, frango grelhado ou carne moída, salada de alface e tomate esporádica. Suco industrializado ou refrigerante 2-3x/semana.
- Lanche da tarde (16:30): Bolacha recheada ou salgado de padaria na rua.
- Jantar (20:30): Similar ao almoço ou lanche rápido.
- Ingestão hídrica: Aproximadamente 1,5 L de água/dia.

MUC: 
1. Losartana Potássica 50 mg - 1 comprimido VO de 12/12h
2. Hidroclorotiazida 25 mg - 1 comprimido VO pela manhã
3. Metformina 850 mg - 1 comprimido VO após o almoço e 1 comprimido VO após o jantar
(Refere boa adesão e tolerabilidade gastrointestinal preservada, sem esquecimento de doses).

EXAMES COMPLEMENTARES: 
- Sinais Vitais na Consulta: PA: 126/78 mmHg | FC: 72 bpm | Peso: 82 kg | Altura: 1.73 m | IMC: 27.4 kg/m²
- Exame Físico Focado: BEG, corado, hidratado, acianótico, anictérico. ACV: 2BRNF sem sopros. AP: MVFD sem RA. Abdome: flácido, indolor, sem visceromegalias. MMII: pulsos pediosos e tibiais presentes e simétricos, sem edemas ou úlceras plantares.
- Laboratório recente (trazido pelo paciente):
  * Glicemia de jejum: 118 mg/dL | HbA1c: 6.9% (meta < 7.0%)
  * Creatinina: 0.92 mg/dL | TFG (CKD-EPI): 91 mL/min/1.73m²
  * Colesterol Total: 168 mg/dL | HDL: 44 mg/dL | LDL: 92 mg/dL | Triglicerídeos: 160 mg/dL
  * Urina tipo I: normal, sem proteinúria ou glicosúria.

HD: 
1. Hipertensão Arterial Sistêmica compensada sob terapia combinada (PA 126/78 mmHg).
2. Diabetes Mellitus tipo 2 com controle glicêmico satisfatório (HbA1c 6.9%).
3. Dislipidemia mista leve associada a sobrepeso e sedentarismo.

CONDUTA: 
1. Mantida farmacoterapia habitual: Losartana 50mg 12/12h, Hidroclorotiazida 25mg/dia, Metformina 850mg 2x/dia.
2. Orientações não farmacológicas:
   - Reeducação alimentar com nutricionista: substituir ultraprocessados e bolachas por frutas, castanhas e fibras integrais; reduzir açúcar refinado.
   - Prescrição de exercício físico: início progressivo de caminhada rápida (30 min, 3 a 5 vezes por semana).
3. Rastreamento e prevenção:
   - Solicitada relação albumina/creatinina urinária (RAC em amostra isolada) e novo perfil metabólico em 6 meses.
   - Encaminhado para exame anual de mapeamento de retina / fundo de olho.
   - Realizada inspeção detalhada dos pés (sensibilidade com monofilamento de 10g preservada bilateralmente).
4. Retorno agendado em 6 meses com novos exames ou antes se qualquer intercorrência.

CASO DISCUTIDO COM PRECEPTOR / DR(A). _____ - ABNER PORTILHO MEDICINA UNIP 4 ANO
`,
    snippets: [
      { label: '+ Caso Discutido', text: 'CASO DISCUTIDO COM _____ - ABNER PORTILHO MEDICINA UNIP 4 ANO' },
      { label: '+ EF Normal Clínico', text: 'Sinais Vitais: PA: __/__ mmHg | FC: __ bpm | Peso: __ kg | IMC: __ kg/m²\nExame Físico: BEG, LOTE, corado, hidratado, acianótico, anictérico.\nACV: 2BRNF sem sopros, ritmo regular.\nAP: MVFD sem ruídos adventícios, eupneico.\nABD: flácido, indolor, RHA presentes, sem VMG.\nMMII: sem edemas, pulsos distais palpáveis e simétricos.' },
      { label: '+ HAS e DM Estáveis', text: 'HD:\n1. Hipertensão Arterial Sistêmica controlada (PA na meta < 130/80 mmHg).\n2. Diabetes Mellitus tipo 2 compensado (HbA1c em alvo terapêutico).' },
      { label: '+ Exames Solicitados', text: 'EXAMES COMPLEMENTARES SOLICITADOS: Hemograma, Glicemia de jejum, HbA1c, Perfil lipídico completo, Creatinina, TFG estimada, RAC urinária, Urina tipo I.' },
      { label: '+ MUC Padrão', text: 'MUC: Nega esquecimento de doses ou efeitos adversos referidos.' },
      { label: '+ Estilo de Vida', text: 'CONDUTA: Orientadas mudanças de estilo de vida, estímulo a atividade física aeróbica 150 min/semana e reeducação alimentar.' }
    ]
  }
];
