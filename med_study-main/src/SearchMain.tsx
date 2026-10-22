import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, BookOpen, Stethoscope, Activity, Heart, Wind, Dna, Droplet, Sun, Brain } from 'lucide-react';
import Fuse from 'fuse.js';
import DERM_MANIFEST from './dermatologia/manifest.json';

// Define the searchable index
// Ideally this would be generated from the content, but we'll create a robust map here.
const SEARCH_DATA = [
  { id: 'asma', name: 'Asma', specialtyId: 'pneumologia', specialtyName: 'Pneumologia', content: 'Broncoespasmo, sibilância, GINA, corticoide inalatório, formoterol, crise asmática, falta de ar' },
  { id: 'dpoc', name: 'DPOC', specialtyId: 'pneumologia', specialtyName: 'Pneumologia', content: 'Doença pulmonar obstrutiva crônica, tabagismo, enfisema, bronquite, GOLD, exacerbação, VEF1' },
  { id: 'pneumonia', name: 'Pneumonia', specialtyId: 'pneumologia', specialtyName: 'Pneumologia', content: 'PAC, infecção respiratória, consolidação, raio-x, antibióticos, amoxicilina, azitromicina, CURB-65, tosse, febre' },
  { id: 'derrame-pleural', name: 'Derrame Pleural', specialtyId: 'pneumologia', specialtyName: 'Pneumologia', content: 'Líquido na pleura, toracocentese, transudato, exsudato, critérios de Light' },
  { id: 'intersticiais', name: 'Doenças Intersticiais', specialtyId: 'pneumologia', specialtyName: 'Pneumologia', content: 'Fibrose pulmonar, pneumoconiose, vidro fosco, TCAR' },

  { id: 'valvopatias', name: 'Valvopatias', specialtyId: 'cardiologia', specialtyName: 'Cardiologia', content: 'Estenose aórtica, insuficiência mitral, prolapso de válvula mitral, sopro cardíaco, troca valvar, TAVI' },
  { id: 'arritmias', name: 'Arritmias', specialtyId: 'cardiologia', specialtyName: 'Cardiologia', content: 'Fibrilação atrial, FA, extrassístoles, bradicardia, taquicardia supraventricular, TV, cardioversão, amiodarona, ECG' },
  { id: 'has', name: 'Hipertensão Arterial (HAS)', specialtyId: 'cardiologia', specialtyName: 'Cardiologia', content: 'Pressão alta, anti-hipertensivos, losartana, hidroclorotiazida, IECA, BRA, crise hipertensiva, urgência, emergência' },
  { id: 'icc', name: 'Insuficiência Cardíaca (IC)', specialtyId: 'cardiologia', specialtyName: 'Cardiologia', content: 'Fração de ejeção, ICFER, ICFEP, NYHA, dispneia, edema, diuréticos, furosemida, betabloqueador' },
  { id: 'dislipidemias', name: 'Dislipidemias (Colesterol & Triglicerídeos)', specialtyId: 'cardiologia', specialtyName: 'Cardiologia & Endocrinologia', content: 'Dislipidemia, hipercolesterolemia, hipertrigliceridemia, LDL-c, HDL, triglicerídeos, quilomícrons, VLDL, ApoB, PCSK9, estatinas, atorvastatina, rosuvastatina, sinvastatina, ezetimiba, fibratos, fenofibrato, ciprofibrato, genfibrozila, pancreatite aguda por triglicerídeos, risco cardiovascular, SBC, ESC, escore de Framingham, Friedewald, jejum flexibilizado, hipercolesterolemia familiar, HF, xantomas tendíneos, DLCN, SAMS, mialgia por estatina, bempedoico, inclisirana, icosapente de etila, EPA' },
  { id: 'mapa-glicemico', name: 'Mapa & Diário de Glicemia Capilar (Personalizável & A4)', specialtyId: 'endocrinologia', specialtyName: 'Endocrinologia', content: 'Mapa de glicemia, diário glicêmico, diabetes mellitus, DM1, DM2, DMG, glicemia capilar, ponta de dedo, pré-refeição, pós-refeição, pré-almoço, pós-almoço, pré-jantar, pós-jantar, madrugada, ao deitar, hipoglicemia, regra dos 15g, insulina, dose, dapagliflozina, empagliflozina, tempo no alvo, TIR, impressão A4' },
  { id: 'prevent-calculator', name: 'Calculadora PREVENT™ (AHA 2024 Risco Cardiovascular)', specialtyId: 'cardiologia', specialtyName: 'Cardiologia', content: 'Calculadora PREVENT AHA 2024, risco cardiovascular total, ASCVD, insuficiência cardíaca, IC, 10 anos, 30 anos, idade cardiovascular, vascular age, CKD-EPI, TFG, microalbuminúria, UACR, HbA1c, CKM estágios, síndrome cardiovascular rim metabólica, colesterol total, HDL, não-HDL, pressão sistólica, estatinas de alta intensidade, atorvastatina, rosuvastatina, pooled cohort equations PCE, race-free' },

  { id: 'ckd-epi', name: 'Calculadora CKD-EPI 2021 (TFG estimada)', specialtyId: 'nefrologia', specialtyName: 'Nefrologia', content: 'Calculadora CKD-EPI 2021, TFG estimada, taxa de filtração glomerular, creatinina sérica, KDIGO, estágios G1 G2 G3a G3b G4 G5, BSA, DuBois, TFG absoluta, depuração de creatinina, função renal, clearance' },
  { id: 'drc-patient-guide', name: 'Guia de Dieta & Orientações ao Paciente (DRC - A4)', specialtyId: 'nefrologia', specialtyName: 'Nefrologia & Nutrição', content: 'Guia do paciente, dieta renal, nutrição DRC, doença renal crônica, potássio, fósforo, sódio, restrição hídrica, pirâmide alimentar, alimentos proibidos e permitidos, cozimento dupla fervura, sal de ervas, folha A4, impressão' },
  { id: 'drc', name: 'Doença Renal Crônica (DRC)', specialtyId: 'nefrologia', specialtyName: 'Nefrologia', content: 'Doença renal crônica, KDIGO, TFG, albuminúria, nefroproteção, iSGLT2, IECA, BRA, fístula arteriovenosa, diálise, hemodiálise, transplante' },
  { id: 'glomerulopatias', name: 'Glomerulopatias', specialtyId: 'nefrologia', specialtyName: 'Nefrologia', content: 'Síndrome nefrótica, síndrome nefrítica, GNPE, nefropatia por IgA, Berger, membranosa, glomeruloesclerose focal e segmentar, GESF' },
  { id: 'sodio', name: 'Sódio (Na)', specialtyId: 'eletrolitos', specialtyName: 'Nefro / Eletrólitos', content: 'Hiponatremia, hipernatremia, reposição de sódio, salina hipertônica 3%, mielinólise pontina, SIADH' },
  { id: 'potassio', name: 'Potássio (K)', specialtyId: 'eletrolitos', specialtyName: 'Nefro / Eletrólitos', content: 'Hipocalemia, hipercalemia, reposição de potássio, onda T apiculada, gluconato de cálcio, insulina polarizante' },
  { id: 'calcio', name: 'Cálcio (Ca)', specialtyId: 'eletrolitos', specialtyName: 'Nefro / Eletrólitos', content: 'Hipocalcemia, hipercalcemia, PTH, vitamina D, sinal de Chvostek, Trousseau' },
  { id: 'acidobase', name: 'Gasometria (Ácido-Base)', specialtyId: 'eletrolitos', specialtyName: 'Nefro / Eletrólitos', content: 'Acidose metabólica, alcalose, pCO2, HCO3, ânion gap, gasometria arterial' },
  { id: 'ira', name: 'Lesão Renal Aguda (LRA)', specialtyId: 'eletrolitos', specialtyName: 'Nefro / Eletrólitos', content: 'IRA, creatinina, ureia, pré-renal, NTA, pós-renal, diálise, KDIGO' },

  { id: 'prenatal', name: 'Pré-Natal', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Gestação, gravidez, ultrassom, ácido fólico, vacinas na gestação, trimestre, idade gestacional' },
  { id: 'diabetes-gestacional', name: 'Diabetes Gestacional (DMG)', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'DMG, HAPO, glicemia de jejum, TOTG 75g, insulina, NPH, análogos, metas glicêmicas, macrossomia, PFE' },
  { id: 'endometriose', name: 'Endometriose', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Endometriose, dismenorreia, dispareunia de profundidade, disquezia, endometrioma, dor pélvica crônica, infertilidade, AMH, dienogeste, USG com preparo intestinal, sliding sign, ressonância, rASRM, Enzian, EFI' },
  { id: 'imagem-obstetrica', name: 'Exame de Imagem na Obstetrícia', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Ultrassonografia obstétrica, USG obstétrico, imagem na gravidez, datação gestacional, CCN, DUM, saco gestacional, vesícula vitelínica, embrião, BCF, transluscência nucal, TN, osso nasal, ducto venoso, onda a reversa, morfológico de primeiro trimestre, morfológico de segundo trimestre, ventriculomegalia, cavo do septo pelúcido, cisterna magna, espinha bífida, sinal da banana, sinal do limão, coração fetal, 4 câmaras, vias de saída, 3 vasos e traqueia, gastrosquise, onfalocele, pelve renal, hidronefrose, valva de uretra posterior, sinal da fechadura, cervicometria, colo curto, progesterona vaginal, cerclagem, PIG, RCF, restrição de crescimento fetal, macrossomia, líquido amniótico, ILA, maior bolsão vertical, MBV, oligodramnia, polidramnia, placenta prévia, acretismo placentário, PAS, doppler obstétrico, dopplervelocimetria, artéria uterina, artéria umbilical, diástole zero, diástole reversa, artéria cerebral média, ACM, centralização fetal, VPS-ACM, anemia fetal, perfil biofísico fetal, PBF, Manning, ALARA, índice térmico TI, índice mecânico MI, ressonância magnética fetal' },
  { id: 'alteracoes-benignas-mamas', name: 'Alterações Benignas das Mamas', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Alterações benignas da mama, mastalgia cíclica e acíclica, fibroadenoma, cistos mamários, cisto simples, cisto complexo, BI-RADS, descarga papilar patológica, papiloma intraductal, ectasia ductal, galactorreia, mastite puerperal, abscesso mamário, mastite granulomatosa, avaliação tríplice, PAAF, core biopsy' },
  { id: 'distopias-incontinencia', name: 'Distopias Genitais e Incontinência Urinária', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Distopias genitais, prolapso de órgãos pélvicos, POP, incontinência urinária, IUE, incontinência de esforço, urgência, bexiga hiperativa, DeLancey, níveis de DeLancey, teoria integral, Petros e Ulmsten, nervo pudendo, lesão neuromuscular no parto, estudo EPICONT, Baden-Walker, POP-Q, estadiamento POP-Q, hiato genital, corpo perineal, CVT, cistocele, retocele, histerocele, enterocele, rotura perineal, estudo urodinâmico, VLPP, pressão de perda ao esforço, cistometria, hiperatividade detrusora, TMAP, exercícios de Kegel, biofeedback, eletroestimulação, cones vaginais, estrogênio tópico, promestrieno, estriol, anticolinérgicos, oxibutinina, tolterodina, solifenacina, mirabegrona, imipramina, duloxetina, sling retropúbico, TVT, sling transobturatório, TOT, mini-sling, sling autólogo, colpofixação retropúbica, cirurgia de Burch, MMK, sacrocolpopexia, fixação sacroespinhosa, Richter, colpoplastia sítio-específica, colpoperineoplastia, André Bernardo' },
  { id: 'pre-eclampsia', name: 'Pré-Eclâmpsia', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'DHEG, hipertensão na gestação, proteinúria, eclâmpsia, sulfato de magnésio, síndrome HELLP' },
  { id: 'tpp-amniorrexe', name: 'Trabalho de Parto Prematuro e Amniorrexe (RPM)', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'TPP, trabalho de parto prematuro, prematuridade, parto pré-termo, amniorrexe prematura, RPM, RPMO, rotura prematura de membranas, bolsa rota, tocólise, tocolítico, nifedipina, atosibana, indometacina, corticoterapia antenatal, betametasona, dexametasona, sulfato de magnésio, neuroproteção fetal, paralisia cerebral, sludge amniótico, colo curto, cervicometria, fibronectina fetal, corioamnionite, critérios de Gibbs, antibiótico de latência, ampicilina, azitromicina, amoxicilina, profilaxia EGB, estreptococo do grupo B, penicilina cristalina, PPROMT, ALPS, conduta expectante, indução de parto' },
  { id: 'anticoncepcao', name: 'Anticoncepção', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Pílula anticoncepcional, DIU, implanon, contraceptivo, critérios de elegibilidade da OMS, métodos de barreira' },
  { id: 'vaginose', name: 'Vaginose', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Corrimento vaginal, candidíase, vaginose bacteriana, tricomoníase, gardnerella, metronidazol' },
  { id: 'saude-sexual', name: 'Saúde Sexual', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'IST, DST, sífilis, HIV, gonorreia, clamídia, herpes genital, preservativo' },
  { id: 'perimenopausa', name: 'Perimenopausa e Climatério', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Menopausa, fogachos, terapia de reposição hormonal, TRH, ondas de calor, atrofia vaginal, osteoporose' },
  { id: 'amenorreia-primaria', name: 'Amenorreia Primária', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Ausência de menstruação, puberdade, desenvolvimento sexual, Turner, hímen imperfurado' },
  { id: 'amenorreia-secundaria', name: 'Amenorreia Secundária', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'Ausência de menstruação, prolactina, hipotireoidismo, SOP, falência ovariana, menopausa precoce, Asherman' },
  { id: 'sop', name: 'Síndrome do Ovário Policístico', specialtyId: 'go', specialtyName: 'Ginecologia e Obstetrícia', content: 'SOP, hiperandrogenismo, hirsutismo, anovulação, cistos ovarianos, resistência à insulina, Rotterdam' },

  { id: 'hda', name: 'Hemorragia Digestiva Alta', specialtyId: 'emergencia', specialtyName: 'Emergência', content: 'HDA, sangramento gastrointestinal, melena, hematêmese, varizes esofágicas, úlcera péptica, IBP, endoscopia, terlipressina' },
  { id: 'urgencias-pediatricas', name: 'Urgências Pediátricas', specialtyId: 'emergencia', specialtyName: 'Emergência', content: 'Criança, pediatria, febre, convulsão febril, bronquiolite, asma na infância, desidratação infantil' },

  { id: 'ca-mama', name: 'Câncer de Mama', specialtyId: 'oncologia', specialtyName: 'Oncologia', content: 'Câncer de mama, neoplasia mamária maligna, carcinoma ductal invasivo, carcinoma lobular, CDIS, carcinoma in situ, Paget do mamilo, câncer inflamatório, T4d, peau d orange, BRCA1, BRCA2, Gail, Tyrer-Cuzick, BI-RADS, mamografia, tomossíntese, ressonância mamária, mamas densas, core biopsy, mamotomia, concordância tripla, Nottingham, receptores hormonais, RE, RP, HER2, Ki-67, Luminal, triplo-negativo, TNM, linfonodo sentinela, quadrantectomia, mastectomia, radioterapia, tamoxifeno, inibidor de aromatase, anastrozol, trastuzumabe, pertuzumabe, T-DM1, neoadjuvância, seguimento' },
  { id: 'ca-pulmao', name: 'Câncer de Pulmão', specialtyId: 'oncologia', specialtyName: 'Oncologia', content: 'Neoplasia pulmonar, tabagismo, nódulo pulmonar, pequenas células, não-pequenas células' },
  { id: 'ca-colon', name: 'Câncer de Cólon', specialtyId: 'oncologia', specialtyName: 'Oncologia', content: 'Câncer colorretal, colonoscopia, pólipos, sangue oculto, CEA' },
  { id: 'ca-prostata', name: 'Câncer de Próstata', specialtyId: 'oncologia', specialtyName: 'Oncologia', content: 'Neoplasia prostática, PSA, toque retal, Gleason, prostatectomia' },
  { id: 'neo-pele', name: 'Neoplasia de Pele', specialtyId: 'oncologia', specialtyName: 'Oncologia', content: 'Melanoma, carcinoma basocelular, CBC, carcinoma espinocelular, CEC, ABCD, protetor solar' },

  { id: 'apendicite', name: 'Apendicite Aguda', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'Apendicite, abdome agudo, Blumberg, McBurney, Alvarado, fecalito, apendicectomia, Rovsing, psoas, obturador' },
  { id: 'colecistite-vias-biliares', name: 'Colecistite e Vias Biliares', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'Colelitíase, Murphy, Tóquio, colangite, Charcot, Reynolds, CPRE, coledocolitíase, vesícula, ducto cístico' },
  { id: 'doenca-diverticular', name: 'Doença Diverticular (Hinchey)', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'Diverticulite, sigmoide, Hinchey, abscesso pericólico, Hartmann, peritonite purulenta, peritonite fecal' },
  { id: 'hernias-abdominais', name: 'Hérnias da Parede Abdominal', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'Hérnia inguinal, direta, indireta, femoral, crural, Lichtenstein, Shouldice, canal inguinal, anel interno, encarceramento' },
  { id: 'obstrucao-intestinal', name: 'Obstrução Intestinal', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'Bridas, aderências, volvo de sigmoide, íleo biliar, empilhamento de moedas, vômitos, distensão abdominal' },
  { id: 'pancreatite-aguda', name: 'Pancreatite Aguda', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'Amilase, lipase, Atlanta, biliar, álcool, necrose pancreática, dor em barra, Ringer Lactato' },
  { id: 'pre-pos-operatorio', name: 'Pré e Pós-Operatório & Risco', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'ASA, risco cirúrgico, jejum pré-operatório, profilaxia TVP, anticoagulação, tempo cirúrgico' },
  { id: 'queimaduras', name: 'Queimaduras (Parkland)', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'Regra dos 9, Wallace, fórmula de Parkland, hidratação venosa, Ringer Lactato, SCQ, enxerto, queimadura elétrica' },
  { id: 'trauma-atls', name: 'Trauma & ATLS 10ª Edição', specialtyId: 'cirurgia', specialtyName: 'Cirurgia Geral', content: 'ATLS, ABCDE, via aérea, colar cervical, pneumotórax hipertensivo, choque hemorrágico, FAST, E-FAST, laparotomia' },

  { id: 'atencao-primaria', name: 'Atenção Primária e Saúde da Família (ESF)', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'APS, Starfield, longitudinalidade, integralidade, coordenação, primeiro contato, eSF, PNAB, genograma, ecomapa' },
  { id: 'declaracao-obito', name: 'Declaração de Óbito e Atestados Médicos', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'DO, causa básica, causa imediata, causa intermediária, IML, morte violenta, SVO, morte natural, atestado médico' },
  { id: 'epidemiologia-indicadores', name: 'Epidemiologia e Indicadores de Saúde', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'Mortalidade infantil, mortalidade materna, letalidade, prevalência, incidência, curvas de Nelson Moraes, transição demográfica' },
  { id: 'estudos-epidemiologicos', name: 'Estudos Epidemiológicos e Bioestatística', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'Coorte, caso-controle, ensaio clínico, transversal, risco relativo, odds ratio, NNT, viés de seleção, confusão' },
  { id: 'medicina-trabalho', name: 'Medicina do Trabalho e Saúde do Trabalhador', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'CAT, acidente de trabalho, silicose, asbestose, PAIR, LER/DORT, benzenismo, chumbo' },
  { id: 'niveis-prevencao', name: 'Níveis de Prevenção e Rastreamento', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'Leavell e Clark, prevenção primordial, primária, secundária, terciária, quaternária, rastreamento, screening' },
  { id: 'sus-legislacao', name: 'Sistema Único de Saúde (SUS: Leis 8.080 e 8.142)', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'SUS, Lei 8080, Lei 8142, universalidade, integralidade, equidade, descentralização, conselho de saúde, conferência de saúde' },
  { id: 'vigilancia-notificacao', name: 'Vigilância em Saúde e Notificação Compulsória', specialtyId: 'preventiva', specialtyName: 'Medicina Preventiva', content: 'Sinan, notificação compulsória, imediata, semanal, vigilância epidemiológica, sanitária, ambiental' },

  ...DERM_MANIFEST.map(c => ({ id: c.id, name: `Dermatologia ${c.num}. ${c.short}`, specialtyId: 'dermatologia', specialtyName: 'Dermatologia', content: `${c.title}; ${c.topics}` })),
  { id: 'derm-glossario', name: 'Glossário de Dermatologia', specialtyId: 'dermatologia', specialtyName: 'Dermatologia', content: 'Glossário, termos, definições, dermatologia' },
  { id: 'penfigo', name: 'Pênfigo', specialtyId: 'dermatologia', specialtyName: 'Dermatologia', content: 'Pênfigo vulgar, pênfigo foliáceo, fogo selvagem, paraneoplásico, desmogleína, acantólise, Nikolsky, bolha flácida, imunofluorescência, rituximabe, penfigoide bolhoso' },
  { id: 'psoriase', name: 'Psoríase', specialtyId: 'dermatologia', specialtyName: 'Dermatologia', content: 'Psoríase em placas, gutata, invertida, eritrodérmica, pustulosa, ungueal, artrite psoriásica, PASI, BSA, DLQI, Auspitz, Koebner, metotrexato, acitretina, ciclosporina, imunobiológicos, anti-TNF, anti-IL-17, anti-IL-23' },
  { id: 'neuro_placeholder', name: 'Neurologia (Em Breve...)', specialtyId: 'neurologia', specialtyName: 'Neurologia', content: 'Cérebro, AVC, epilepsia, cefaleia, enxaqueca, Alzheimer' },
  { id: 'endo_placeholder', name: 'Endocrinologia (Em Breve...)', specialtyId: 'endocrinologia', specialtyName: 'Endocrinologia', content: 'Hormônios, tireoide, diabetes, obesidade' },
];

interface SearchMainProps {
  onNavigate: (specialtyId: string, diseaseId: string) => void;
}

export default function SearchMain({ onNavigate }: SearchMainProps) {
  const [query, setQuery] = useState('');

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(SEARCH_DATA, {
      keys: ['name', 'content', 'specialtyName'],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
      useExtendedSearch: true
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_DATA; // Show all or empty? Let's show all when empty
    return fuse.search(query).map(result => result.item);
  }, [query, fuse]);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="bg-card border border-line p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Search size={200} />
        </div>
        
        <div className="relative z-10 w-full md:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">Pesquisa Global</h1>
          <p className="text-ink-muted text-sm md:text-base mb-8">
            Busque por doenças, especialidades, sintomas, medicações ou termos clínicos em todo o aplicativo.
          </p>

          <div className="relative flex items-center">
            <Search className="absolute left-4 text-brand-blue" size={24} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Câncer de Mama, Losartana, Dispneia..."
              className="w-full bg-bg border border-line rounded-2xl py-4 pl-12 pr-4 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all shadow-sm font-medium"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1">
        <h2 className="text-sm font-bold text-ink-muted uppercase tracking-widest mb-4">
          {query.trim() ? `Resultados da busca (${results.length})` : 'Todos os tópicos'}
        </h2>
        
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-card border border-line rounded-2xl">
            <Search size={48} className="text-brand-navy/20 mb-4" />
            <p className="text-brand-navy font-bold text-lg">Nenhum resultado encontrado.</p>
            <p className="text-ink-muted text-sm">Tente buscar usando termos mais gerais ou sinônimos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map(item => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={item.id}
                onClick={() => onNavigate(item.specialtyId, item.id)}
                className="group flex flex-col items-start p-5 bg-card border border-line rounded-2xl hover:border-brand-blue hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-2 mb-2 w-full">
                  <span className="bg-brand-blue/10 text-brand-blue text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded">
                    {item.specialtyName}
                  </span>
                  <ChevronRight size={14} className="text-ink-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-xs text-ink-muted line-clamp-2">
                  <span className="font-medium text-brand-navy/60">Relacionado:</span> {item.content}
                </p>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
