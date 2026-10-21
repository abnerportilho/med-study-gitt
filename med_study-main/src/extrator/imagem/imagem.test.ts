import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { PageLines } from '../pdf/extract';
import { extractDocument } from '../index';
import { buildImagingLine, parseImaging, shortExamName } from './index';

const page = (n: number, ...lines: string[]): PageLines => ({ page: n, lines });
const lines = (...l: string[]) => parseImaging([page(1, ...l)]);
const oneLine = (...l: string[]) => lines(...l).filter((r) => r.selected).map((r) => buildImagingLine(r));

describe('laudos de imagem: conclusão palavra por palavra', () => {
  it('modelo com seções separadas (TC de tórax normal)', () => {
    expect(
      oneLine(
        'TOMOGRAFIA COMPUTADORIZADA DE TÓRAX S/C',
        'Técnica:',
        'Imagens obtidas por aquisição volumétrica multislice sem a administração intravenosa de contraste iodado.',
        'Descrição:',
        'Parênquima pulmonar com coeficientes de atenuação preservados.',
        'Espaço pleural livre.',
        'Conclusão:',
        'Exame dentro dos padrões da normalidade.',
      ),
    ).toEqual(['TC de tórax S/C: Exame dentro dos padrões da normalidade.']);
  });

  it('laudo inteiro numa linha só, com texto tokenizado ("normal ." → "normal.")', () => {
    expect(
      oneLine(
        'TOMOGRAFIA COMPUTADORIZADA DO TÓRAX SEM CONTRASTE Técnica : Imagens obtidas por aquisição volumétrica multislice . ' +
          'Análise : Pequeno nódulo sólido de 0,6 cm no segmento apical do lobo superior direito . Espaços pleurais livres . ' +
          'Impressão diagnóstica : - Nódulo pulmonar sólido de 0,6 cm no lobo superior direito . - Ateromatose aórtica discreta .',
      ),
    ).toEqual([
      'TC do tórax sem contraste: Nódulo pulmonar sólido de 0,6 cm no lobo superior direito. - Ateromatose aórtica discreta.',
    ]);
  });

  it('mamografia: BI-RADS por mama e conduta', () => {
    expect(
      oneLine(
        'MAMOGRAFIA BILATERAL',
        'TÉCNICA: Exame realizado nas incidências craniocaudal e médio-lateral-oblíqua.',
        'EXAME ANTERIOR: Mamografia de 10/03/2025. Estudo comparativo realizado.',
        'ACHADOS:',
        'Nódulo irregular, com margem microlobulada, medindo 1,2 cm, na mama direita às 10 horas.',
        'CONCLUSÃO:',
        'Mama Direita: BI-RADS 4A — Baixa Suspeição de Malignidade',
        'Mama Esquerda: BI-RADS 2 — Benigno',
        'CONDUTA:',
        'Biópsia tecidual guiada por imagem.',
      ),
    ).toEqual([
      'Mamografia: Mama Direita: BI-RADS 4A — Baixa Suspeição de Malignidade Mama Esquerda: BI-RADS 2 — Benigno. Conduta: Biópsia tecidual guiada por imagem.',
    ]);
  });

  it('dois exames no mesmo PDF ("OPINIÃO" como cabeçalho da conclusão)', () => {
    expect(
      oneLine(
        'ULTRASSONOGRAFIA DA TIREOIDE COM DOPPLER',
        'ANÁLISE:',
        'Lobo direito da tireoide: 4,9 x 1,8 x 1,9 cm (volume = 8,8 cm³).',
        'OPINIÃO:',
        'Estudo ultrassonográfico dentro dos padrões da normalidade.',
        'ULTRASSONOGRAFIA DE ABDOME TOTAL',
        'ANÁLISE:',
        'Fígado com ecogenicidade aumentada.',
        'OPINIÃO:',
        'Esteatose hepática moderada (grau II).',
      ),
    ).toEqual([
      'USG da tireoide com doppler: Estudo ultrassonográfico dentro dos padrões da normalidade.',
      'USG de abdome total: Esteatose hepática moderada (grau II).',
    ]);
  });

  it('eco: conclusão vira a página, cabeçalho/rodapé repetidos saem, Doppler é seção e FEVE vira escore', () => {
    const reps = parseImaging([
      page(
        1,
        'GRUPO EXEMPLO R. Um, 100 - Centro',
        'LAUDO DE ECOCARDIOGRAMA TRANSTORÁCICO',
        'Data do Exame: 23/06/2025',
        'Fração de Ejeção 55.9 % ≥55',
        'DOPPLER CONVENCIONAL',
        'Fluxo transmitral com padrão normal de enchimento ventricular.',
        'CONCLUSÃO',
        'Gerado em: 24/06/2025 às 17:12 Página 1',
      ),
      page(
        2,
        'GRUPO EXEMPLO R. Um, 100 - Centro',
        'Ecocardiograma transtorácico dentro dos limites da normalidade.',
        'Átrio esquerdo com aumento discreto.',
        '________________________________________',
        'Dr(a). Fulano de Tal',
        'Gerado em: 24/06/2025 às 17:12 Página 2',
      ),
    ]);
    expect(reps.map((r) => buildImagingLine(r))).toEqual([
      'Ecocardiograma (23/06/25): Ecocardiograma transtorácico dentro dos limites da normalidade. Átrio esquerdo com aumento discreto. FEVE 55,9%',
    ]);
  });

  it('densitometria: T-score por região', () => {
    const [r] = lines(
      'DENSITOMETRIA ÓSSEA POR DXA',
      'Coluna lombar (L1-L4): T-score -2,8',
      'Colo do fêmur: T-score -2,6',
      'Conclusão:',
      'Osteoporose em coluna lombar e colo do fêmur.',
    );
    expect(buildImagingLine(r)).toBe(
      'Densitometria óssea por dxa: Osteoporose em coluna lombar e colo do fêmur. Coluna lombar (L1-L4) T -2,8 | Colo do fêmur T -2,6',
    );
  });

  it('RX sem seção de conclusão: usa a descrição curta e avisa', () => {
    const [r] = lines('RADIOGRAFIA DE TÓRAX', 'Seios costofrênicos livres.', 'Silhueta cardíaca com área normal.');
    expect(r.conclusionFromFindings).toBe(true);
    expect(buildImagingLine(r)).toBe('RX de tórax: Seios costofrênicos livres. Silhueta cardíaca com área normal.');
  });

  it('sem conclusão e com descrição longa: o exame aparece, mas fica desmarcado', () => {
    const [r] = lines('TOMOGRAFIA COMPUTADORIZADA DO TÓRAX', 'Análise:', ...Array(12).fill('Achado descrito em uma frase razoavelmente longa do laudo.'));
    expect(r.conclusion).toBeUndefined();
    expect(r.selected).toBe(false);
  });

  it('assinatura na mesma linha ou logo abaixo não entra na conclusão', () => {
    expect(
      oneLine(
        'RESSONANCIA MAGNETICA, JOELHO, DIREITO',
        'RESSONÂNCIA MAGNÉTICA DO JOELHO DIREITO',
        'Análise:',
        'Rotura completa do ligamento cruzado anterior.',
        'Opinião:',
        'Rotura completa do ligamento cruzado anterior. Laudado por: CRM 0000/SP - DR. FULANO',
        'LIBERADO EM: 08/05/2023 20:16',
      ),
    ).toEqual(['RM joelho direito (08/05/23): Rotura completa do ligamento cruzado anterior.']);
  });

  it('escore já citado na conclusão não se repete; "ID:" vale como impressão diagnóstica', () => {
    expect(
      oneLine('ULTRASSONOGRAFIA DE MAMAS', 'Não se observam imagens nodulares.', 'ID: Exame sem anormalidades detectáveis pelo método.', 'Classificação ACR BI-RADS: 1.'),
    ).toEqual(['USG de mamas: Exame sem anormalidades detectáveis pelo método. Classificação ACR BI-RADS: 1.']);
  });

  it('polissonografia: conclusões numeradas e IAH', () => {
    expect(
      oneLine(
        'POLISSONOGRAFIA',
        'O índice de apneia e hipopneia foi de 7,1 eventos/hora (IAH= 7.1).',
        'Conclusões',
        '1. Índice de apneia-hipopneia levemente aumentado (IAH= 7.1).',
        '2. Ronco leve e intermitente.',
      ),
    ).toEqual(['Polissonografia: 1. Índice de apneia-hipopneia levemente aumentado (IAH= 7.1). 2. Ronco leve e intermitente.']);
  });

  it('frase com data ou cabeçalho com ":" não abre exame novo', () => {
    const reps = lines(
      'ULTRASSONOGRAFIA OBSTÉTRICA COM DOPPLER',
      'Ultrassonografia de 10/03/2025 para comparação.',
      'Doppler obstétrico:',
      'Estudo Doppler-sonográfico normal.',
      'Conclusão:',
      'Gestação tópica, única, com Doppler normal.',
    );
    expect(reps.map((r) => r.exam)).toEqual(['USG obstétrica com doppler']);
  });

  it('nome curto do exame', () => {
    expect(shortExamName('TOMOGRAFIA COMPUTADORIZADA DE ALTA RESOLUÇÃO (TCAR) DE TÓRAX')).toBe('TCAR de tórax');
    expect(shortExamName('ULTRA-SONOGRAFIA DE ABDOME TOTAL')).toBe('USG de abdome total');
    expect(shortExamName('Radiografia de tórax PA e perfil')).toBe('RX de tórax PA e perfil');
  });
});

describe('laboratório × imagem', () => {
  it('laudos de laboratório nunca viram imagem', () => {
    for (const f of ['sabin-ambulatorial.json', 'dasa-sp.json']) {
      const fx = JSON.parse(readFileSync(join(__dirname, '..', '__fixtures__', f), 'utf8'));
      const doc = extractDocument(fx.pages);
      expect(doc.kind).toBe('laboratorio');
      expect(doc.imaging).toEqual([]);
    }
  });

  it('num laudo de imagem, números do texto não viram "exames de sangue"', () => {
    const doc = extractDocument([
      page(1, 'ULTRASSONOGRAFIA DA TIREOIDE', 'Volume total da glândula tireoide: 16,1 cm³.', 'Átrio esquerdo 42 mm', 'OPINIÃO:', 'Tireoide normal.'),
    ]);
    expect(doc.kind).toBe('imagem');
    expect(doc.entries).toEqual([]);
  });
});
