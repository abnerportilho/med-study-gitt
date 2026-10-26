import React from 'react';
import { Droplets, Dna, Stethoscope, Search, Pill, ShieldCheck } from 'lucide-react';
import { DermatologiaDoenca, type DoencaContent } from './DermatologiaDoenca';
import type { Block } from './DermatologiaCapitulo';

// ==========================================================================
// Pênfigo — diretriz S2k EADV (2020), painel internacional de especialistas (JAAD 2020)
// e literatura brasileira sobre o pênfigo foliáceo endêmico (fogo selvagem).
// ==========================================================================

const p = (h: string): Block => ({ t: 'p', h });
const ul = (...items: string[]): Block => ({ t: 'ul', items });
const table = (head: string[], rows: string[][], caption?: string): Block => ({ t: 'table', head, rows, caption });
const box = (kind: string, label: string, ...blocks: Block[]): Block => ({ t: 'box', kind, label, blocks });
const kv = (...pairs: [string, string][]): Block => ({ t: 'kv', pairs });
const flow = (...steps: [string, string][]): Block => ({ t: 'flow', steps });

const CONTENT: DoencaContent = {
  icon: Droplets,
  eyebrow: 'Dermatologia • Doenças bolhosas autoimunes • S2k EADV 2020 • Painel internacional (JAAD 2020)',
  title: 'Pênfigo',
  description:
    'Grupo de doenças bolhosas autoimunes intraepidérmicas, causadas por autoanticorpos IgG contra as desmogleínas dos desmossomos, que provocam acantólise. Pênfigo vulgar, pênfigo foliáceo (incluindo o fogo selvagem, endêmico no Brasil) e formas especiais, com o penfigoide bolhoso como principal diferencial.',
  highlights: [
    { label: 'Alvo', value: 'Desmogleínas', note: 'Dsg3 (mucosa) e Dsg1 (pele)', tone: 'text-sky-400' },
    { label: 'Sinal clássico', value: 'Nikolsky +', note: 'bolhas flácidas e erosões', tone: 'text-amber-400' },
    { label: 'Padrão-ouro', value: 'IFD', note: 'IgG/C3 intercelular', tone: 'text-emerald-400' },
    { label: '1ª linha mod./grave', value: 'Rituximabe', note: '+ prednisona', tone: 'text-rose-400' },
  ],
  tabs: [
    {
      id: 'fisio',
      label: 'Fisiopatologia',
      icon: Dna,
      sections: [
        {
          title: 'Acantólise: quando os desmossomos se soltam',
          blocks: [
            p('Os queratinócitos ficam unidos por <dfn title="Estruturas de adesão entre queratinócitos, formadas por caderinas (desmogleínas e desmocolinas) ligadas ao citoesqueleto de queratina.">desmossomos</dfn>, cujas caderinas principais são as <strong>desmogleínas 1 e 3</strong>. No pênfigo, autoanticorpos <strong>IgG</strong> (sobretudo IgG4) se ligam a elas, as células perdem a adesão e se separam (<dfn title="Perda da adesão entre os queratinócitos, que se soltam uns dos outros e ficam arredondados dentro da bolha.">acantólise</dfn>), formando <strong>bolhas intraepidérmicas</strong>. Como o teto é fino, as bolhas são <strong>flácidas</strong> e se rompem facilmente, deixando erosões.'),
          ],
        },
        {
          title: 'Teoria da compensação das desmogleínas',
          blocks: [
            p('A distribuição das desmogleínas explica onde cada pênfigo forma bolha: a <strong>Dsg3</strong> predomina nas mucosas e nas camadas profundas da epiderme; a <strong>Dsg1</strong> predomina nas camadas superficiais da pele e é escassa na mucosa. Onde uma desmogleína é atacada, a outra compensa, se estiver presente.'),
            table(
              ['Autoanticorpos', 'Onde há bolha', 'Forma clínica'],
              [
                ['Anti-Dsg3', 'Mucosa (a Dsg1 da pele compensa)', '<strong>Pênfigo vulgar mucoso</strong>'],
                ['Anti-Dsg3 + anti-Dsg1', 'Mucosa e pele, com clivagem <strong>suprabasal</strong>', '<strong>Pênfigo vulgar mucocutâneo</strong>'],
                ['Anti-Dsg1', 'Pele, com clivagem <strong>subcórnea</strong>; mucosa poupada (a Dsg3 compensa)', '<strong>Pênfigo foliáceo</strong>'],
              ],
            ),
            box(
              'fisio',
              'A mesma proteína, outro agressor',
              p('A desmogleína-1 também é cortada pelas toxinas esfoliativas do <em>S. aureus</em>: por isso o impetigo bolhoso e a síndrome da pele escaldada estafilocócica produzem bolha superficial, no mesmo nível do pênfigo foliáceo (ver capítulo de piodermites).'),
            ),
          ],
        },
      ],
    },
    {
      id: 'clinica',
      label: 'Formas Clínicas',
      icon: Stethoscope,
      sections: [
        {
          title: 'Pênfigo vulgar',
          blocks: [
            p('Forma mais comum no mundo, entre <strong>40 e 60 anos</strong>. Começa na <strong>mucosa oral</strong> na maioria dos casos (às vezes isolada por meses): erosões dolorosas e persistentes em gengiva, palato e mucosa jugal, com odinofagia e perda de peso. Depois surgem <strong>bolhas flácidas</strong> sobre pele normal ou eritematosa, que se rompem e deixam <strong>erosões extensas que não cicatrizam</strong>, em couro cabeludo, face, axilas, virilha e tronco. Outras mucosas: conjuntiva, laringe, esôfago, genital.'),
            ul(
              'Cicatriza sem deixar cicatriz, mas com hiperpigmentação residual.',
              'Variante <strong>vegetante</strong>: placas vegetantes em dobras (axilas, virilhas).',
              'Antes dos corticoides era quase sempre fatal; hoje a mortalidade está ligada sobretudo às infecções e aos efeitos do tratamento.',
            ),
          ],
        },
        {
          title: 'Pênfigo foliáceo e fogo selvagem',
          blocks: [
            p('Bolha muito superficial (subcórnea), que raramente é vista íntegra: predominam <strong>erosões rasas, escamas e crostas</strong> em áreas seborreicas (face, couro cabeludo, tronco superior), às vezes com aspecto em “massa folhada”. <strong>Não acomete mucosas.</strong> Ardor e queimação são frequentes. Pode evoluir para eritrodermia esfoliativa.'),
            kv(
              ['Pênfigo foliáceo clássico', 'Esporádico, em adultos de meia-idade, distribuição mundial.'],
              ['Fogo selvagem (pênfigo foliáceo endêmico)', 'Endêmico no <strong>Brasil</strong> (Centro-Oeste, Minas Gerais, São Paulo, Paraná) e em outros países da América do Sul; atinge <strong>crianças e adultos jovens de áreas rurais</strong>, com casos familiares. Associado à exposição ambiental (picada de insetos hematófagos, como o borrachudo, <em>Simulium</em>) em indivíduos com predisposição genética (HLA-DRB1). O nome vem da sensação de queimação.'],
              ['Pênfigo eritematoso (Senear-Usher)', 'Forma localizada do foliáceo em face (distribuição malar) e áreas seborreicas, com sobreposição de achados de lúpus.'],
            ),
          ],
        },
        {
          title: 'Formas especiais',
          blocks: [
            table(
              ['Forma', 'Características'],
              [
                ['<strong>Paraneoplásico</strong>', 'Associado a linfoma não Hodgkin, leucemia linfocítica crônica, doença de Castleman, timoma. <strong>Estomatite grave e intratável</strong>, lesões polimorfas (bolhas, eritema multiforme-símile, liquenoides), risco de <strong>bronquiolite obliterante</strong>. Anticorpos contra plaquinas (envoplaquina, periplaquina) além das desmogleínas.'],
                ['<strong>Induzido por drogas</strong>', 'Principalmente fármacos com <strong>grupo tiol</strong> (D-penicilamina, captopril); também penicilinas, cefalosporinas, rifampicina. Costuma regredir com a suspensão.'],
                ['<strong>Pênfigo por IgA</strong>', 'Pústulas e vesículas anulares, IgA intercelular na imunofluorescência; responde à dapsona.'],
                ['<strong>Pênfigo herpetiforme</strong>', 'Vesículas agrupadas e pruriginosas, semelhantes à dermatite herpetiforme, com imunologia de pênfigo.'],
              ],
            ),
          ],
        },
      ],
    },
    {
      id: 'diagnostico',
      label: 'Diagnóstico & Diferenciais',
      icon: Search,
      sections: [
        {
          title: 'Sinais clínicos e exames',
          blocks: [
            kv(
              ['Sinal de Nikolsky', 'Pressão ou fricção tangencial na pele perilesional ou aparentemente normal provoca descolamento da epiderme. <strong>Positivo nos pênfigos</strong> (também na SSSS e na NET).'],
              ['Sinal de Asboe-Hansen', 'Pressão vertical sobre a bolha faz o líquido se espalhar lateralmente sob a pele vizinha.'],
              ['Citodiagnóstico de Tzanck', 'Raspado do assoalho da bolha: <strong>células acantolíticas</strong> (arredondadas, soltas). Triagem rápida, mas inespecífica.'],
              ['Histopatologia', 'Biópsia de bolha recente ou da borda da erosão: <strong>acantólise suprabasal</strong> com células basais presas à derme em “fileira de lápides” (vulgar) ou <strong>acantólise subcórnea/granulosa</strong> (foliáceo).'],
              ['Imunofluorescência direta (IFD)', '<strong>Padrão-ouro.</strong> Biópsia de pele <strong>perilesional</strong> (não da bolha): depósito de <strong>IgG e/ou C3 intercelular</strong> na epiderme, em “rede” ou “favo de mel”.'],
              ['Sorologia', '<strong>ELISA anti-Dsg1 e anti-Dsg3</strong>: define o subtipo e acompanha a atividade (títulos se correlacionam com a doença). Imunofluorescência indireta (substrato esôfago de macaco; bexiga de rato no paraneoplásico).'],
            ),
            flow(
              ['Suspeita', 'Erosões orais persistentes ou bolhas flácidas e erosões cutâneas; Nikolsky.'],
              ['Biópsias', 'Uma da lesão (histopatologia) e uma perilesional (IFD).'],
              ['Sorologia', 'ELISA anti-Dsg1/Dsg3 (± IFI).'],
              ['Classificação', 'Subtipo e gravidade (extensão, mucosas, PDAI) antes de tratar.'],
            ),
          ],
        },
        {
          title: 'Pênfigo × penfigoide bolhoso',
          blocks: [
            table(
              ['', 'Pênfigo vulgar', 'Penfigoide bolhoso'],
              [
                ['Idade', '40–60 anos', '<strong>Idosos (> 70 anos)</strong>'],
                ['Nível da bolha', 'Intraepidérmica (acantólise)', '<strong>Subepidérmica</strong>'],
                ['Bolha', '<strong>Flácida</strong>, rompe fácil, erosões', '<strong>Tensa</strong>, íntegra, sobre pele eritematosa ou urticariforme'],
                ['Prurido', 'Pouco; dor nas erosões', '<strong>Intenso</strong>, com fase pré-bolhosa urticariforme'],
                ['Mucosa', 'Quase sempre (oral)', 'Pouco frequente (10–30%)'],
                ['Nikolsky', 'Positivo', 'Negativo'],
                ['IFD', 'IgG/C3 <strong>intercelular</strong>', 'IgG/C3 <strong>linear na zona da membrana basal</strong>'],
                ['Antígeno', 'Desmogleínas 1 e 3', 'BP180 (colágeno XVII) e BP230'],
                ['Fármacos associados', 'Grupo tiol (captopril, penicilamina)', 'Gliptinas (inibidores da DPP-4), diuréticos'],
                ['Tratamento inicial', 'Prednisona + rituximabe', 'Clobetasol tópico em todo o corpo; doxiciclina; corticoide sistêmico em dose menor'],
              ],
            ),
          ],
        },
        {
          title: 'Outros diferenciais',
          blocks: [
            table(
              ['Doença', 'Pista'],
              [
                ['Impetigo bolhoso / SSSS', 'Crianças, quadro agudo, febre; toxina estafilocócica contra Dsg1; bacterioscopia e cultura.'],
                ['Síndrome de Stevens-Johnson / NET', 'Início agudo após medicamento, lesões em alvo atípicas, necrose epidérmica, mucosas; Nikolsky positivo; IFD negativa.'],
                ['Eritema multiforme', 'Lesões em alvo típicas, acrais, geralmente após herpes simples.'],
                ['Dermatite herpetiforme', 'Vesículas agrupadas, muito pruriginosas, em superfícies extensoras; doença celíaca; IgA granular nas papilas.'],
                ['Estomatites (aftas, herpes, líquen plano oral)', 'No pênfigo vulgar de início oral, as erosões não cicatrizam em semanas: biopsiar.'],
                ['Dermatite seborreica / lúpus cutâneo', 'Diferenciais do pênfigo foliáceo e do eritematoso.'],
              ],
            ),
          ],
        },
      ],
    },
    {
      id: 'tratamento',
      label: 'Tratamento',
      icon: ShieldCheck,
      sections: [
        {
          title: 'Objetivos e fases',
          blocks: [
            kv(
              ['Controle da doença', 'Parar de surgir lesões novas e as antigas começarem a cicatrizar (em geral em semanas).'],
              ['Consolidação', 'Cicatrização de ~80% das lesões; início da redução do corticoide.'],
              ['Remissão completa', 'Ausência de lesões sem tratamento (ou com terapia mínima: prednisona ≤ 10 mg/dia e/ou imunossupressor em dose mínima).'],
            ),
            p('A gravidade é medida pelo <strong>PDAI</strong> (<em>Pemphigus Disease Area Index</em>), que pontua pele, couro cabeludo e mucosas.'),
          ],
        },
        {
          title: 'Esquema de primeira linha',
          blocks: [
            table(
              ['Gravidade', 'Tratamento (S2k EADV 2020 / painel internacional)'],
              [
                ['<strong>Leve</strong>', 'Prednisona 0,5–1 mg/kg/dia; associar rituximabe ou um poupador de corticoide (azatioprina ou micofenolato) se não houver controle ou para permitir a redução. No foliáceo localizado: corticoide tópico de alta potência ± dapsona.'],
                ['<strong>Moderada a grave</strong>', '<strong>Rituximabe</strong> 1 g IV nos dias 0 e 14 <strong>+ prednisona 1 mg/kg/dia</strong>, com redução progressiva do corticoide até suspender em 3 a 6 meses. Manutenção com rituximabe 500 mg nos meses 12 e 18 conforme atividade e sorologia (ou 1 g na recidiva).'],
                ['<strong>Refratária</strong>', 'Imunoglobulina humana IV 2 g/kg por ciclo (dividida em 2 a 5 dias), mensal; imunoadsorção ou plasmaférese; ciclofosfamida em casos selecionados.'],
              ],
            ),
            box(
              'alerta',
              'Antes de começar o rituximabe e o corticoide em dose alta',
              ul(
                'Sorologias para <strong>hepatite B</strong> (HBsAg, anti-HBc), hepatite C e HIV; rastreio de <strong>tuberculose latente</strong>.',
                '<strong>Ivermectina</strong> empírica para <em>Strongyloides</em> em pacientes de áreas endêmicas (como o Brasil), pelo risco de hiperinfecção com corticoide.',
                'Atualizar vacinas (as vivas antes da imunossupressão); vacinas inativadas, como influenza e pneumococo.',
                'Profilaxia de <em>Pneumocystis</em> (sulfametoxazol-trimetoprima) a considerar na associação de rituximabe com corticoide em dose alta.',
                'Proteção óssea (cálcio, vitamina D e bisfosfonato se uso prolongado), proteção gástrica quando indicada, controle de glicemia e PA.',
              ),
            ),
          ],
        },
        {
          title: 'Cuidados gerais',
          blocks: [
            ul(
              'Curativos não aderentes nas erosões; banhos com antissépticos suaves; drenar bolhas grandes mantendo o teto.',
              'Higiene oral cuidadosa, analgesia e anestésicos tópicos antes das refeições; dieta pastosa; tratar candidíase oral.',
              'Acompanhamento conjunto com oftalmologia, otorrinolaringologia ou ginecologia quando houver acometimento dessas mucosas.',
              'Vigilância de infecção secundária (principal causa de óbito) e dos efeitos adversos do corticoide.',
              'No pênfigo paraneoplásico, tratar a neoplasia de base; no induzido por drogas, suspender o fármaco.',
            ),
          ],
        },
      ],
    },
    {
      id: 'medicamentos',
      label: 'Medicamentos por Classe',
      icon: Pill,
      sections: [
        {
          title: 'Fármacos usados no pênfigo',
          blocks: [
            table(
              ['Fármaco', 'Dose habitual (adulto)', 'Mecanismo', 'Cuidados'],
              [
                ['<strong>Prednisona</strong>', '0,5–1,5 mg/kg/dia (VO), com redução lenta após o controle.', 'Corticoide: imunossupressão ampla e rápida.', 'Hiperglicemia, HAS, osteoporose, infecções, catarata, miopatia, alterações de humor; estrongiloidíase disseminada.'],
                ['<strong>Rituximabe</strong>', '1 g IV nos dias 0 e 14; manutenção 500 mg (meses 12 e 18) ou 1 g na recidiva.', 'Anti-CD20: depleta linfócitos B produtores de autoanticorpos.', 'Reação infusional (pré-medicar), reativação de hepatite B, infecções, hipogamaglobulinemia; resposta pior a vacinas.'],
                ['<strong>Azatioprina</strong>', '1–2,5 mg/kg/dia, ajustada pela atividade da TPMT.', 'Antimetabólito das purinas; poupador de corticoide.', 'Mielotoxicidade (dosar TPMT antes), hepatotoxicidade, pancreatite; interação com alopurinol.'],
                ['<strong>Micofenolato de mofetila</strong>', '2–3 g/dia, em 2 tomadas.', 'Inibe a síntese de purinas em linfócitos; poupador de corticoide.', 'Sintomas gastrointestinais, citopenias, infecções; teratogênico.'],
                ['<strong>Imunoglobulina humana IV</strong>', '2 g/kg por ciclo, dividida em 2 a 5 dias, a cada 4 semanas.', 'Acelera a eliminação de IgG patogênica e modula a imunidade.', 'Cefaleia, trombose, insuficiência renal; dosar IgA antes (anafilaxia na deficiência de IgA). Não aumenta o risco de infecção.'],
                ['<strong>Dapsona</strong>', '50–200 mg/dia.', 'Anti-inflamatória (inibe neutrófilos).', 'Hemólise e metemoglobinemia (dosar G6PD antes); agranulocitose; síndrome de hipersensibilidade. Útil no foliáceo leve e no pênfigo por IgA.'],
                ['<strong>Ciclofosfamida</strong>', 'Pulsos IV ou VO em casos refratários selecionados.', 'Alquilante.', 'Cistite hemorrágica, infertilidade, neoplasias, mielotoxicidade.'],
                ['<strong>Corticoide tópico de alta potência</strong>', 'Clobetasol 0,05% em lesões localizadas; elixires ou géis de corticoide na mucosa oral.', 'Anti-inflamatório local.', 'Adjuvante; atrofia com uso prolongado.'],
              ],
              'Doses de referência das diretrizes; individualize conforme peso, função renal e hepática e comorbidades.',
            ),
            box('resumo', 'Revisão rápida', p('Pênfigo = IgG contra desmogleínas → acantólise → bolha intraepidérmica flácida, Nikolsky positivo. Vulgar: anti-Dsg3 (± Dsg1), começa na boca, clivagem suprabasal. Foliáceo: anti-Dsg1, sem mucosa, crostas em áreas seborreicas; fogo selvagem endêmico no Brasil. Diagnóstico: histopatologia + IFD perilesional (IgG/C3 intercelular) + ELISA. Tratamento moderado/grave: rituximabe + prednisona, com triagem de hepatite B, tuberculose e estrongiloidíase. Penfigoide bolhoso: idoso, bolha tensa, prurido, IgG linear na zona da membrana basal.')),
          ],
        },
      ],
    },
  ],
  seeAlso: [
    { chapterId: 'derm-cap-04', note: 'vesícula e bolha: bolhas flácidas costumam ser intraepidérmicas e tensas, subepidérmicas.' },
    { chapterId: 'derm-cap-06', note: 'impetigo bolhoso e síndrome da pele escaldada: toxina contra a desmogleína-1.' },
    { chapterId: 'derm-cap-15', note: 'Stevens-Johnson, NET e penfigoide bolhoso fármaco-induzido, os principais diferenciais agudos.' },
    { chapterId: 'derm-cap-03', note: 'propedêutica: como descrever a lesão e quando pedir biópsia e outros exames complementares.' },
  ],
  references: [
    'Joly P, et al. Updated S2K guidelines on the management of pemphigus vulgaris and foliaceus initiated by the European Academy of Dermatology and Venereology (EADV). J Eur Acad Dermatol Venereol, 2020.',
    'Murrell DF, et al. Diagnosis and management of pemphigus: recommendations of an international panel of experts. J Am Acad Dermatol, 2020.',
    'Joly P, et al. First-line rituximab combined with short-term prednisone versus prednisone alone for the treatment of pemphigus (Ritux 3). Lancet, 2017.',
    'Aoki V, Rivitti EA, Diaz LA. Update on fogo selvagem, an endemic form of pemphigus foliaceus. J Dermatol, 2015.',
    'Manual de Dermatologia, Módulo 24 (lesões elementares, piodermites e farmacodermias).',
  ],
};

export default function PenfigoMain({ onSelectTopic }: { onSelectTopic: (id: string) => void }) {
  return <DermatologiaDoenca content={CONTENT} onSelectTopic={onSelectTopic} />;
}
