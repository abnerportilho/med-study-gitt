import React from 'react';
import { Layers, Dna, Stethoscope, Search, Pill, ShieldCheck } from 'lucide-react';
import { DermatologiaDoenca, type DoencaContent } from './DermatologiaDoenca';
import type { Block } from './DermatologiaCapitulo';

// ==========================================================================
// Psoríase — Consenso Brasileiro de Psoríase (SBD, 2020), PCDT do Ministério da Saúde
// e diretrizes AAD-NPF; integra os casos de psoríase das aulas práticas do manual.
// ==========================================================================

const p = (h: string): Block => ({ t: 'p', h });
const ul = (...items: string[]): Block => ({ t: 'ul', items });
const table = (head: string[], rows: string[][], caption?: string): Block => ({ t: 'table', head, rows, caption });
const box = (kind: string, label: string, ...blocks: Block[]): Block => ({ t: 'box', kind, label, blocks });
const kv = (...pairs: [string, string][]): Block => ({ t: 'kv', pairs });
const flow = (...steps: [string, string][]): Block => ({ t: 'flow', steps });

const CONTENT: DoencaContent = {
  icon: Layers,
  eyebrow: 'Dermatologia • Consenso Brasileiro de Psoríase (SBD 2020) • AAD-NPF • PCDT/MS',
  title: 'Psoríase',
  description:
    'Doença inflamatória crônica, imunomediada e sistêmica, com placas eritematoescamosas bem delimitadas, acometimento ungueal e articular e comorbidades cardiometabólicas. Da fisiopatologia (eixo IL-23/Th17) à escolha entre tópicos, fototerapia, sistêmicos clássicos e imunobiológicos.',
  highlights: [
    { label: 'Prevalência no Brasil', value: '≈ 1,3%', note: '1–3% no mundo', tone: 'text-sky-400' },
    { label: 'Artrite psoriásica', value: '20–30%', note: 'dos pacientes', tone: 'text-amber-400' },
    { label: 'Moderada a grave', value: 'Regra dos 10', note: 'BSA, PASI ou DLQI > 10', tone: 'text-rose-400' },
    { label: 'Corticoide sistêmico', value: 'Evitar', note: 'rebote e forma pustulosa', tone: 'text-red-400' },
  ],
  tabs: [
    {
      id: 'fisio',
      label: 'Fisiopatologia & Gatilhos',
      icon: Dna,
      sections: [
        {
          title: 'O que é a psoríase',
          blocks: [
            p('Doença <strong>inflamatória crônica, imunomediada, não contagiosa</strong>, de curso recidivante, que acomete pele, unhas e articulações. Afeta igualmente homens e mulheres, com dois picos de início: <strong>20–30 anos</strong> (tipo I: história familiar, associação com <strong>HLA-C*06:02 / HLA-Cw6</strong>, quadro mais extenso) e <strong>50–60 anos</strong> (tipo II).'),
            p('Hoje é entendida como <strong>doença sistêmica</strong>: a inflamação crônica se associa a síndrome metabólica, aterosclerose, esteatose hepática, doença inflamatória intestinal e depressão.'),
          ],
        },
        {
          title: 'Imunopatogênese: o eixo IL-23/Th17',
          blocks: [
            flow(
              ['Gatilho', 'Trauma, infecção, estresse ou droga em indivíduo geneticamente predisposto.'],
              ['Célula dendrítica', 'Peptídeos antimicrobianos (LL-37) ativam células dendríticas plasmocitoides (IFN-α) e mieloides, que liberam <strong>TNF-α, IL-12 e IL-23</strong>.'],
              ['Linfócito Th17 / Th1', 'A IL-23 mantém os linfócitos <strong>Th17</strong>, que produzem <strong>IL-17A, IL-17F e IL-22</strong>; os Th1 produzem IFN-γ e TNF-α.'],
              ['Queratinócito', 'Hiperproliferação e diferenciação anormal; produz mais quimiocinas e peptídeos: o ciclo inflamatório se autoperpetua.'],
            ),
            box(
              'fisio',
              'Por que a placa descama',
              p('O trânsito do queratinócito da camada basal à córnea, que normalmente leva cerca de 28 dias, cai para <strong>3 a 5 dias</strong>. As células chegam à superfície sem completar a maturação e ainda com núcleo (<dfn title="Persistência de núcleos nas células da camada córnea, sinal histológico de queratinização acelerada ou incompleta.">paraqueratose</dfn>), formando as escamas prateadas. Os capilares dérmicos dilatados e tortuosos explicam o eritema e o orvalho sangrante.'),
            ),
            p('Cada alvo dessa cascata virou tratamento: <strong>anti-TNF</strong>, <strong>anti-IL-12/23</strong> (p40), <strong>anti-IL-23</strong> (p19), <strong>anti-IL-17</strong> e inibidores de PDE4 e TYK2.'),
          ],
        },
        {
          title: 'Fatores desencadeantes e agravantes',
          blocks: [
            table(
              ['Grupo', 'Exemplos'],
              [
                ['Trauma', '<dfn title="Aparecimento de lesões da doença em áreas de trauma da pele (arranhão, cirurgia, tatuagem, queimadura solar).">Fenômeno de Koebner</dfn>: lesões surgem 7–14 dias após arranhões, cirurgias, tatuagens, queimadura solar.'],
                ['Infecções', 'Faringite estreptocócica (desencadeia a forma <strong>gutata</strong>); HIV (formas graves e refratárias).'],
                ['Medicamentos', 'Lítio, betabloqueadores, antimaláricos (cloroquina, hidroxicloroquina), interferon, imiquimode, inibidores de checkpoint; <strong>retirada de corticoide sistêmico</strong> (rebote, forma pustulosa); anti-TNF (psoríase paradoxal).'],
                ['Hábitos e metabolismo', 'Tabagismo, álcool, obesidade, estresse emocional.'],
                ['Outros', 'Hipocalcemia e gravidez (forma pustulosa generalizada); clima frio e seco.'],
              ],
            ),
          ],
        },
      ],
    },
    {
      id: 'clinica',
      label: 'Formas Clínicas & Comorbidades',
      icon: Stethoscope,
      sections: [
        {
          title: 'Psoríase em placas (vulgar): 80–90% dos casos',
          blocks: [
            p('<strong>Placas eritematosas, bem delimitadas, com escamas branco-prateadas</strong>, simétricas, em <strong>superfícies extensoras</strong> (cotovelos, joelhos), <strong>região sacral</strong>, <strong>couro cabeludo</strong> (frequentemente ultrapassando a linha de implantação) e região retroauricular. Prurido em até 70% dos pacientes.'),
            box(
              'caso',
              'Exemplo de descrição (aula prática)',
              p('“Placa eritematosa, de bordas bem definidas, superfície recoberta por escamas branco-prateadas, medindo 40 × 30 mm, localizada na face extensora do cotovelo direito.”'),
            ),
          ],
        },
        {
          title: 'Outras formas',
          blocks: [
            table(
              ['Forma', 'Quadro', 'Pontos de atenção'],
              [
                ['<strong>Gutata</strong>', 'Pápulas e pequenas placas em “gotas” (0,5–1 cm), de início súbito no tronco e raiz dos membros, em crianças e adultos jovens.', '1–3 semanas após <strong>faringite estreptocócica</strong>; boa evolução, mas pode evoluir para placas. Pedir ASLO/cultura de orofaringe.'],
                ['<strong>Invertida (flexural)</strong>', 'Placas eritematosas, brilhantes, com pouca escama, em dobras (axilas, inframamária, inguinal, interglútea).', 'Diferencial com candidíase, intertrigo, tinea cruris; usar tópicos de baixa potência ou inibidores de calcineurina.'],
                ['<strong>Eritrodérmica</strong>', 'Eritema e descamação em <strong>> 90% da superfície corporal</strong>.', '<strong>Internar</strong>: hipotermia, desidratação, distúrbios eletrolíticos, insuficiência cardíaca de alto débito, sepse.'],
                ['<strong>Pustulosa generalizada (von Zumbusch)</strong>', 'Febre, mal-estar, pústulas estéreis que confluem em “lagos de pus” sobre pele eritematosa; leucocitose.', '<strong>Urgência</strong>. Gatilhos: retirada de corticoide, gravidez (impetigo herpetiforme), hipocalcemia, infecções. Associada a mutações do <em>IL36RN</em>.'],
                ['<strong>Pustulosa localizada</strong>', 'Pustulose palmoplantar; acrodermatite contínua de Hallopeau (pontas dos dedos e unhas).', 'Forte associação com tabagismo; muito refratária.'],
                ['<strong>Couro cabeludo</strong>', 'Placas espessas e bem delimitadas, que ultrapassam a linha de implantação.', 'Diferencial com dermatite seborreica (escama fina, amarelada, mal delimitada). Pode causar queda reversível de cabelo.'],
              ],
            ),
          ],
        },
        {
          title: 'Psoríase ungueal',
          blocks: [
            p('Acomete até <strong>50%</strong> dos pacientes com psoríase e <strong>80–90%</strong> dos que têm artrite psoriásica: a unha alterada é <strong>marcador de risco de artrite</strong>.'),
            table(
              ['Local acometido', 'Achados'],
              [
                ['Matriz ungueal', '<dfn title="Pequenas depressões puntiformes na lâmina ungueal, por focos de paraqueratose na matriz proximal.">Pitting</dfn> (depressões puntiformes), leuconíquia, linhas de Beau, manchas vermelhas na lúnula, esfarelamento da lâmina.'],
                ['Leito ungueal', '<strong>Onicólise</strong> (descolamento distal) com borda eritematosa, <strong>mancha de óleo / mancha salmão</strong>, hemorragias em estilha, <strong>hiperqueratose subungueal</strong>.'],
              ],
            ),
            box('alerta', 'Diferencial obrigatório', p('Onicomicose: ambas causam onicólise e hiperqueratose subungueal. Pitting e mancha de óleo favorecem psoríase; na dúvida, faça micológico direto e cultura antes de tratar (e lembre que as duas podem coexistir).')),
          ],
        },
        {
          title: 'Artrite psoriásica e comorbidades',
          blocks: [
            p('A <strong>artrite psoriásica</strong> ocorre em 20–30% dos pacientes; em geral surge cerca de 10 anos após a pele, mas pode precedê-la em ~15%. Padrões: oligoartrite assimétrica, poliartrite simétrica, acometimento de <strong>interfalangeanas distais</strong>, <strong>dactilite</strong> (“dedo em salsicha”), <strong>entesite</strong> (calcâneo), espondilite e a forma mutilante. Classificação pelos critérios <strong>CASPAR</strong>. Pergunte sempre sobre dor e rigidez matinal articular e encaminhe ao reumatologista.'),
            table(
              ['Comorbidade', 'O que rastrear'],
              [
                ['Síndrome metabólica e obesidade', 'Peso, circunferência abdominal, PA, glicemia, perfil lipídico.'],
                ['Doença cardiovascular', 'Risco aumentado na psoríase grave (inflamação sistêmica): controlar fatores de risco.'],
                ['Esteatose hepática (DHGNA)', 'Enzimas hepáticas; relevante na escolha do metotrexato.'],
                ['Doença inflamatória intestinal', 'Diarreia crônica, sangue nas fezes; contraindica anti-IL-17.'],
                ['Saúde mental', 'Depressão, ansiedade, etilismo; impacto em qualidade de vida (DLQI).'],
              ],
            ),
          ],
        },
      ],
    },
    {
      id: 'diagnostico',
      label: 'Diagnóstico & Gravidade',
      icon: Search,
      sections: [
        {
          title: 'O diagnóstico é clínico',
          blocks: [
            p('Baseia-se na morfologia e na distribuição das lesões, no exame das unhas e do couro cabeludo e nos sinais semiológicos. A biópsia fica para casos atípicos ou dúvida diagnóstica.'),
            kv(
              ['Curetagem metódica de Brocq', 'Raspagem progressiva da placa: <strong>sinal da vela</strong> (escamas se soltam como raspas de vela) → <strong>membrana derradeira</strong> (película fina, úmida) → <strong>orvalho sangrante</strong> (sinal de Auspitz: pontos de sangramento dos capilares das papilas dérmicas).'],
              ['Fenômeno de Koebner', 'Lesões novas em áreas de trauma.'],
              ['Dermatoscopia', '<strong>Vasos puntiformes (pontilhados) distribuídos de forma regular</strong> sobre fundo vermelho e escamas brancas.'],
              ['Histopatologia', 'Paraqueratose, hipogranulose, acantose regular com alongamento das cristas, papilas dérmicas com capilares dilatados e adelgaçamento suprapapilar, <strong>microabscessos de Munro</strong> (córnea) e <strong>pústulas espongiformes de Kogoj</strong> (espinhosa).'],
            ),
          ],
        },
        {
          title: 'Diagnóstico diferencial',
          blocks: [
            table(
              ['Doença', 'Como diferenciar'],
              [
                ['Dermatite seborreica', 'Escamas finas, amareladas e oleosas, mal delimitadas; sulco nasogeniano, sobrancelhas. A sobreposição é chamada de “seborríase”.'],
                ['Eczema (numular, crônico)', 'Prurido intenso, bordas menos nítidas, vesiculação, liquenificação.'],
                ['Tinea corporis', 'Placa anular com borda ativa descamativa e centro mais claro; exame micológico positivo.'],
                ['Pitiríase rósea', 'Medalhão inicial e lesões ovais em “árvore de Natal”; diferencial da gutata.'],
                ['Líquen plano', 'Pápulas violáceas, poligonais, com estrias de Wickham; mucosa oral.'],
                ['Sífilis secundária', 'Lesões palmoplantares, colarete de Biett; VDRL/teste treponêmico.'],
                ['Lúpus cutâneo subagudo / micose fungoide', 'Placas anulares ou psoriasiformes refratárias: biópsia.'],
              ],
            ),
          ],
        },
        {
          title: 'Classificação de gravidade',
          blocks: [
            kv(
              ['BSA', '<em>Body Surface Area</em>: porcentagem da superfície corporal acometida (a palma da mão do paciente, com os dedos, ≈ 1%).'],
              ['PASI', '<em>Psoriasis Area and Severity Index</em>: soma eritema, infiltração e descamação ponderados pela área em 4 regiões (0 a 72). Usado também como meta: PASI 75, 90 e 100 = redução de 75%, 90% e 100%.'],
              ['DLQI', '<em>Dermatology Life Quality Index</em>: questionário de impacto na qualidade de vida (0 a 30).'],
            ),
            table(
              ['Gravidade', 'Critério (Consenso Brasileiro de Psoríase 2020)'],
              [
                ['<strong>Leve</strong>', 'BSA ≤ 10, PASI ≤ 10 e DLQI ≤ 10.'],
                ['<strong>Moderada a grave</strong>', '<strong>BSA, PASI ou DLQI > 10</strong> (“regra dos 10”).'],
              ],
            ),
            box('alerta', 'Áreas especiais elevam a gravidade', p('Mesmo com pouca área, acometimento de <strong>face, couro cabeludo, unhas, palmas e plantas ou genitais</strong>, prurido intenso, falha do tratamento tópico ou artrite psoriásica justificam tratamento sistêmico.')),
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
          title: 'Princípios',
          blocks: [
            ul(
              'Explique que é doença crônica, controlável e não contagiosa; combine metas (PASI 75–90, DLQI 0–1).',
              'Hidratação diária da pele, controle de peso, cessação do tabagismo e do álcool, manejo do estresse.',
              'Rastreie artrite e comorbidades em todas as consultas.',
              '<strong>Não use corticoide sistêmico</strong>: a retirada provoca rebote e pode desencadear psoríase pustulosa ou eritrodérmica.',
            ),
            flow(
              ['Leve', 'Tratamento tópico (± fototerapia localizada).'],
              ['Moderada a grave', 'Fototerapia ou sistêmico clássico (metotrexato, acitretina, ciclosporina) ou apremilaste.'],
              ['Falha, contraindicação ou artrite', 'Imunobiológico (anti-TNF, anti-IL-12/23, anti-IL-17, anti-IL-23).'],
            ),
          ],
        },
        {
          title: 'Psoríase leve: tratamento tópico',
          blocks: [
            table(
              ['Classe', 'Uso', 'Cuidados'],
              [
                ['Corticoides tópicos', 'Base do tratamento. <strong>Baixa potência</strong> em face e dobras; média a alta no corpo; <strong>alta/muito alta</strong> (clobetasol) em placas espessas, palmas e plantas; loção ou xampu no couro cabeludo.', 'Atrofia, estrias, telangiectasias, taquifilaxia; reduzir para uso intermitente após controle.'],
                ['Análogos da vitamina D (calcipotriol)', 'Placas do corpo e couro cabeludo; poupador de corticoide.', 'Irritação; evitar > 100 g/semana (hipercalcemia).'],
                ['Combinação calcipotriol + betametasona', '1x/dia por até 4 semanas e depois 2x/semana como manutenção (gel, pomada ou espuma).', 'Mais eficaz que cada um isolado.'],
                ['Inibidores de calcineurina (tacrolimo 0,1%, pimecrolimo)', 'Face, dobras e genitais (uso <em>off-label</em>).', 'Ardor nos primeiros dias; não atrofiam a pele.'],
                ['Ceratolíticos (ácido salicílico 3–10%, ureia)', 'Remover escamas espessas antes dos outros tópicos.', 'Evitar grandes áreas em crianças (salicilismo).'],
                ['Coaltar e antralina', 'Alternativas clássicas.', 'Odor, manchas, irritação.'],
              ],
            ),
          ],
        },
        {
          title: 'Psoríase moderada a grave',
          blocks: [
            p('<strong>Fototerapia:</strong> UVB de banda estreita (311 nm) 2–3x/semana é a primeira escolha; PUVA (psoraleno + UVA) em placas espessas, com maior risco de carcinoma espinocelular cumulativo. Opção segura na gestação (UVB).'),
            p('<strong>Sistêmicos clássicos e pequenas moléculas</strong> (doses e monitorização na aba Medicamentos): metotrexato (também trata a artrite), acitretina (não imunossupressora; boa na forma pustulosa e associada à fototerapia), ciclosporina (resposta rápida, uso por tempo limitado), apremilaste e deucravacitinibe.'),
            p('<strong>Imunobiológicos:</strong> indicados na psoríase moderada a grave com falha, intolerância ou contraindicação aos sistêmicos clássicos, ou quando há artrite psoriásica. Antes de iniciar: <strong>tuberculose latente</strong> (PPD ou IGRA + radiografia de tórax), <strong>hepatites B e C, HIV</strong>, hemograma, função hepática e renal, atualização vacinal (vacinas vivas antes).'),
            table(
              ['Situação', 'Preferência'],
              [
                ['Artrite psoriásica', 'Metotrexato, anti-TNF, anti-IL-17, anti-IL-23, anti-IL-12/23.'],
                ['Doença inflamatória intestinal', 'Anti-TNF (adalimumabe, infliximabe) ou ustequinumabe/anti-IL-23; <strong>evitar anti-IL-17</strong>.'],
                ['Gestação ou desejo de engravidar', 'Tópicos, UVB; ciclosporina se necessário; <strong>certolizumabe</strong> (não atravessa a placenta). Metotrexato e acitretina são <strong>contraindicados</strong>.'],
                ['Insuficiência cardíaca avançada / esclerose múltipla', 'Evitar anti-TNF.'],
                ['HIV ou neoplasia recente', 'Acitretina e fototerapia UVB (não imunossupressoras).'],
                ['Tuberculose latente', 'Tratar antes (iniciar o biológico após ao menos 1 mês); anti-IL-17 e anti-IL-23 têm menor risco de reativação que anti-TNF.'],
              ],
            ),
          ],
        },
        {
          title: 'Formas graves: conduta hospitalar',
          blocks: [
            box(
              'alerta',
              'Eritrodérmica e pustulosa generalizada',
              ul(
                '<strong>Internar</strong>: hidratação, controle de temperatura, eletrólitos (cálcio na pustulosa), cuidados de pele com emolientes e curativos, atenção a sepse.',
                'Opções de resposta rápida: <strong>ciclosporina</strong> ou <strong>infliximabe</strong>; acitretina na pustulosa; outros biológicos conforme o caso.',
                'Pustulosa generalizada: <strong>spesolimabe</strong> (anti-receptor de IL-36) para crises.',
                'Nunca usar corticoide sistêmico como tratamento de base.',
              ),
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
          title: 'Sistêmicos clássicos e pequenas moléculas',
          blocks: [
            table(
              ['Fármaco', 'Dose habitual (adulto)', 'Mecanismo', 'Monitorização e cuidados'],
              [
                ['<strong>Metotrexato</strong>', '7,5–25 mg <strong>1x por semana</strong> (VO ou SC) + ácido fólico 5 mg/semana (24–48 h depois) ou 1 mg/dia nos outros dias.', 'Antagonista do folato; anti-inflamatório e antiproliferativo.', 'Hemograma, enzimas hepáticas, creatinina. Hepatotóxico (cuidado com etilismo e esteatose), mielotóxico. <strong>Teratogênico</strong>: suspender ≥ 3 meses antes de engravidar. Interação grave com sulfametoxazol-trimetoprima.'],
                ['<strong>Acitretina</strong>', '25–50 mg/dia (0,3–0,5 mg/kg/dia).', 'Retinoide: normaliza a diferenciação do queratinócito.', '<strong>Teratogênica</strong>: contracepção durante e por <strong>3 anos</strong> após (mulheres em idade fértil, preferir outra opção). Lipídios, enzimas hepáticas; queilite, ressecamento, queda de cabelo. Não imunossupressora.'],
                ['<strong>Ciclosporina</strong>', '2,5–5 mg/kg/dia, em 2 tomadas; idealmente por até 1 ano.', 'Inibidor de calcineurina (bloqueia IL-2 e linfócitos T).', '<strong>PA e creatinina</strong> (reduzir a dose se a creatinina subir > 25% do basal); hipertricose, hiperplasia gengival; muitas interações (citocromo P450). Resposta rápida.'],
                ['<strong>Apremilaste</strong>', '30 mg 12/12 h (titulação nos primeiros 5 dias).', 'Inibidor da fosfodiesterase 4.', 'Diarreia, náuseas, cefaleia, perda de peso, depressão. Sem exames laboratoriais de rotina.'],
                ['<strong>Deucravacitinibe</strong>', '6 mg 1x/dia.', 'Inibidor seletivo de TYK2 (via IL-23/IL-12).', 'Infecções de vias aéreas superiores, acne; triagem de infecções antes.'],
              ],
            ),
          ],
        },
        {
          title: 'Imunobiológicos',
          blocks: [
            table(
              ['Classe', 'Fármaco e esquema', 'Particularidades'],
              [
                ['<strong>Anti-TNF-α</strong>', 'Adalimumabe 80 mg SC na semana 0, 40 mg na semana 1 e depois a cada 2 semanas • Etanercepte 50 mg SC 2x/semana por 12 semanas e depois 1x/semana • Infliximabe 5 mg/kg IV nas semanas 0, 2 e 6 e depois a cada 8 semanas • Certolizumabe pegol 400 mg SC nas semanas 0, 2 e 4 e depois 200 mg a cada 2 semanas.', 'Tratam também artrite e DII (exceto etanercepte na DII). Maior risco de reativar tuberculose; evitar em IC avançada e doença desmielinizante. Certolizumabe é a opção na gestação. Pode haver psoríase paradoxal.'],
                ['<strong>Anti-IL-12/23 (p40)</strong>', 'Ustequinumabe 45 mg SC (90 mg se > 100 kg) nas semanas 0 e 4 e depois a cada 12 semanas.', 'Posologia espaçada; útil na DII.'],
                ['<strong>Anti-IL-17</strong>', 'Secuquinumabe 300 mg SC nas semanas 0, 1, 2, 3 e 4 e depois mensal • Ixequizumabe 160 mg na semana 0, 80 mg a cada 2 semanas até a 12ª e depois a cada 4 semanas • Brodalumabe (anti-receptor IL-17) 210 mg nas semanas 0, 1 e 2 e depois a cada 2 semanas.', 'Início de ação muito rápido; eficazes em artrite e unhas. <strong>Candidíase mucocutânea</strong>; <strong>evitar na DII</strong>. Brodalumabe: alerta para ideação suicida.'],
                ['<strong>Anti-IL-23 (p19)</strong>', 'Guselcumabe 100 mg SC nas semanas 0 e 4 e depois a cada 8 semanas • Risanquizumabe 150 mg SC nas semanas 0 e 4 e depois a cada 12 semanas • Tildraquizumabe 100 mg SC nas semanas 0 e 4 e depois a cada 12 semanas.', 'Alta eficácia e resposta duradoura com doses espaçadas; bom perfil de segurança.'],
                ['<strong>Anti-receptor de IL-36</strong>', 'Spesolimabe 900 mg IV (dose única, podendo repetir em 1 semana) nas crises de psoríase pustulosa generalizada.', 'Uso hospitalar, específico da forma pustulosa generalizada.'],
              ],
              'Doses de referência das bulas e diretrizes; confirme a apresentação disponível e o protocolo (PCDT/SUS ou convênio).',
            ),
            box('resumo', 'Revisão rápida', p('Psoríase = eixo IL-23/Th17 + hiperproliferação epidérmica. Placas eritematoescamosas em extensoras, couro cabeludo e sacro; unhas com pitting e mancha de óleo; 20–30% com artrite. Diagnóstico clínico (Brocq: vela → membrana derradeira → orvalho sangrante). Leve: corticoide tópico ± calcipotriol. Moderada a grave (regra dos 10 ou áreas especiais): fototerapia, metotrexato, acitretina, ciclosporina, apremilaste ou biológicos, após triagem de tuberculose e hepatites. Nunca corticoide sistêmico.')),
          ],
        },
      ],
    },
  ],
  seeAlso: [
    { chapterId: 'derm-cap-16', note: 'caso clínico 3, psoríase em placas, com descrição da lesão e conduta da aula prática.' },
    { chapterId: 'derm-cap-19', note: 'caso clínico 2, psoríase de pele e unha, e as alterações ungueais (pitting, onicólise).' },
    { chapterId: 'derm-cap-01', note: 'renovação da epiderme e paraqueratose: por que a placa descama.' },
    { chapterId: 'derm-cap-08', note: 'onicomicose e dermatofitoses, os principais diferenciais.' },
  ],
  references: [
    'Sociedade Brasileira de Dermatologia. Consenso Brasileiro de Psoríase 2020: algoritmo de tratamento da psoríase.',
    'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas da Psoríase (PCDT).',
    'Menter A, et al. Joint AAD-NPF guidelines of care for the management and treatment of psoriasis with biologics (J Am Acad Dermatol, 2019) e with systemic nonbiologic therapies (2020).',
    'Romiti R, et al. Prevalence of psoriasis in Brazil: a geographical survey. Int J Dermatol, 2017.',
    'Manual de Dermatologia, Módulo 24 (aulas práticas 1 e 4).',
  ],
};

export default function PsoriaseMain({ onSelectTopic }: { onSelectTopic: (id: string) => void }) {
  return <DermatologiaDoenca content={CONTENT} onSelectTopic={onSelectTopic} />;
}
