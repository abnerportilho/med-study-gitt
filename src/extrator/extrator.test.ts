import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { extractLines, type PageLines } from './pdf/extract';
import { extractReport, buildLine, type LineEntry } from './index';

const FIXTURES = join(__dirname, '__fixtures__');
const fixture = (name: string) => join(FIXTURES, name);

// Os PDFs ficam em base64 (<nome>.pdf.b64): o import do Google AI Studio falha com arquivos binários.
async function readPdf(name: string): Promise<PageLines[]> {
  return extractLines(new Uint8Array(Buffer.from(readFileSync(fixture(`${name}.b64`), 'utf8'), 'base64')), pdfjs);
}

/** Laudo montado à mão, uma página, para os casos pontuais. */
const fromLines = (...lines: string[]): PageLines[] => [{ page: 1, lines }];

const selected = (entries: LineEntry[]) => entries.filter((e) => e.selected);
const find = (entries: LineEntry[], abbr: string) => selected(entries).find((e) => e.abbr === abbr);

describe('laudos reais anonimizados (Sabin e DASA, gabarito do exam-pdf-liner)', () => {
  // As siglas do gabarito original que mudaram aqui.
  const RENAMED: Record<string, string[]> = {
    Leuc: ['Leuco'],
    N: ['Seg', 'Neut'],
    'Vitamina B12': ['B12'],
    'Ácido fólico': ['Ác. fólico'],
    'Vitamina D': ['Vit D'],
    'Glicemia média estimada': ['Glicemia média est.'],
    R: ['R TTPA'],
    'relação PSA livre/total': ['PSA L/T'],
  };
  const files = readdirSync(FIXTURES).filter((f) => /^(sabin|dasa)-.*\.json$/.test(f));

  it.each(files)('%s: todo valor do gabarito aparece com a mesma sigla', (file) => {
    const fx = JSON.parse(readFileSync(fixture(file), 'utf8'));
    const { entries } = extractReport(fx.pages);
    const body: string = fx.expected.full.replace(/^.*?:\s/, '').replace(/\.$/, '');
    const pairs = [...body.matchAll(/(?:GS[AV] )?([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9\-/ .]*?) ([<>]?-?\d[\d.,]*%?)(?= |$)/g)];
    expect(pairs.length).toBeGreaterThan(20);
    const missing = pairs
      .map(([, abbr, value]) => ({ names: RENAMED[abbr] ?? [abbr], value: value.replace(/%$/, ''), abbr }))
      .filter(({ names, value }) =>
        !entries.some((e) => !e.duplicate && names.includes(e.abbr) && (e.value.replace(/%$/, '') === value || e.percent === value)),
      )
      .map(({ abbr, value }) => `${abbr} ${value}`);
    expect(missing).toEqual([]);
  });
});

describe('PDFs sintéticos do lab-report-fixtures (gabarito por campo)', () => {
  const num = (v: string) => Number(v.replace(/[<>\s]/g, '').replace(/\./g, '').replace(',', '.'));
  // "9,7 mil/µL" sai como "9.700/µL": mesma grandeza.
  const same = (got: string, want: string) => {
    const a = got.replace(/\s+/g, '').toLowerCase();
    const b = want.replace(/\s+/g, '').toLowerCase();
    return a === b || (num(a) === num(b) * 1000 && a[0] === b[0].replace(/\d/, a[0]));
  };
  const files = readdirSync(FIXTURES)
    .filter((f) => /^sintetico-precisa-.*\.pdf\.b64$/.test(f))
    .map((f) => f.replace(/\.b64$/, ''));

  it.each(files)('%s: extrai todos os campos e nada além deles', async (file) => {
    const expected: { label: string; display: string }[] = JSON.parse(
      readFileSync(fixture(file.replace(/\.pdf$/, '.expected.json')), 'utf8'),
    );
    const { entries } = extractReport(await readPdf(file));
    const chosen = selected(entries);
    const matches = (e: LineEntry, display: string) => same(e.value, display) || (!!e.percent && same(e.percent, display));
    const missing = expected.filter((x) => !chosen.some((e) => matches(e, x.display))).map((x) => `${x.label}=${x.display}`);
    const extra = chosen.filter((e) => !expected.some((x) => matches(e, x.display))).map((e) => `${e.abbr}=${e.value}`);
    expect(missing).toEqual([]);
    expect(extra).toEqual([]);
  });
});

describe('PDFs sintéticos do Exames-de-Sangue (linha completa conferida no PDF)', () => {
  const LINES: Record<string, string> = {
    'sintetico-laudo-tabela.pdf':
      '(14/03/26) Hm 4,50 milhões/mm³ | Hb 10,4 g/dL | Ht 32,6% | VCM 72,4 fL | HCM 23,1 pg | RDW 17,8% | Leuco 6.100/mm³ | Plaq 418.000/mm³ | Ferro 21 µg/dL | Ferritina 6,2 ng/mL | IST 8,0% | B12 412 pg/mL | TSH 2,14 µUI/mL | Glicemia 88 mg/dL | CT 176 mg/dL | TG 92 mg/dL | HDL 58 mg/dL | Ur 24 mg/dL | Cr 0,71 mg/dL | TGO 18 U/L | TGP 15 U/L | PCR 1,8 mg/L',
    'sintetico-laudo-blocos.pdf':
      '(22/05/26) Hm 4.980.000/mm³ | Hb 15,1 g/dL | Ht 45,0% | VCM 88,0 fL | RDW 13,1% | Leuco 7.200/mm³ | Seg 4.464/mm³ (62,0%) | Linf 2.016/mm³ (28,0%) | Mono 504/mm³ (7,0%) | Plaq 265.000/mm³ | TSH 6,80 µUI/mL | T4L 1,10 ng/dL | Vit D 18,0 ng/mL | Glicemia 118 mg/dL | HbA1c 6,0% | CT 232 mg/dL | TG 180 mg/dL | HDL 38 mg/dL | LDL 158 mg/dL | Cr 1,10 mg/dL | K 6,2 mEq/L | TGP 62 U/L | Apo B 118 mg/dL',
    'sintetico-laudo-bullets.pdf':
      '(14/08/24) CT 234 mg/dL | TG 256 mg/dL | HDL 32 mg/dL | LDL 161 mg/dL | não-HDL 203 mg/dL | VLDL 42 mg/dL',
    'sintetico-laudo-coagulacao.pdf':
      '(05/03/25) TSH 6,40 µUI/mL | T4L 0,82 ng/dL | FR 28,4 UI/mL | Anti-TPO 212,0 UI/mL | IgG 1840 mg/dL | IgA 210 mg/dL | IgM 96 mg/dL | IgE 340 UI/mL | C3 72 mg/dL | C4 8 mg/dL | TAP 12,5 s | AP 98% | INR 1,05 | TTPA 41,3 s | R TTPA 1,31 | Fibrinogênio 4,6 g/L',
  };

  it.each(Object.entries(LINES))('%s', async (file, line) => {
    const { report, entries } = extractReport(await readPdf(file));
    expect(buildLine(entries, report.collectedAt)).toBe(line);
  });
});

// Cada caso abaixo foi um erro real encontrado testando laudos de laboratórios diferentes.
describe('erros que não podem voltar', () => {
  it('data no cabeçalho não vira resultado ("Data Impressão: 20/08/24" não é colesterol 20)', () => {
    const { entries } = extractReport(
      fromLines('COLESTEROL TOTAL E FRAÇÕES Data Impressão: 20/08/24 09:00', 'RESULTADO: - COLESTEROL TOTAL : 234 mg/dL'),
    );
    expect(find(entries, 'CT')?.value).toBe('234');
  });

  it('título com número solto não deixa o resultado cair no exame anterior', () => {
    const { entries } = extractReport(
      fromLines(
        'Hepatite C, anticorpos anti (Anti-HCV)',
        'Material: Soro Coleta: 30/03/2026 - 07:58',
        'Resultado: AMOSTRA NÃO REAGENTE PARA ANTI-HCV',
        '_____________________________________',
        'Vitamina D3, 25 hidroxi vitamina D',
        'Material: Soro Coleta: 30/03/2026 - 07:58',
        'Resultado: 20,9 ng/mL',
      ),
    );
    expect(find(entries, 'Anti-HCV')?.value).toBe('Não reagente');
    expect(find(entries, 'Vit D')?.value).toBe('20,9');
  });

  it('sem título reconhecido, o resultado fica sem nome e desmarcado, nunca no exame anterior', () => {
    const { entries } = extractReport(
      fromLines('Glicose', 'Material: Soro', 'Resultado: 92 mg/dL', '___________________', 'Resultado: 7,7 mg/dL'),
    );
    expect(selected(entries).map((e) => `${e.abbr} ${e.value}`)).toEqual(['Glicemia 92']);
  });

  it('linha de cabeçalho não ganha o nome do exame de baixo ("Número: 5652905" / "TESTOSTERONA LIVRE")', () => {
    const { entries } = extractReport(
      fromLines('Número: 5652905 Nome: PACIENTE ANONIMO', 'TESTOSTERONA LIVRE', 'Resultado: 5,0 ng/dL'),
    );
    expect(selected(entries).map((e) => `${e.abbr} ${e.value}`)).toEqual(['Testosterona livre 5,0']);
  });

  it('itens da urina não viram hemograma nem glicemia', () => {
    const { entries } = extractReport(
      fromLines(
        'Urina tipo I',
        'Data/Hora da Coleta: 09/08/2024 - 07:26',
        'Glicose: 500 Ausente',
        'Hemácias: 8.4 μL Menor que 23/μL',
        'Leucócitos: 0.4 μL Menor que 25/μL',
        'Nitrito: Negativo Negativo',
      ),
    );
    expect(find(entries, 'Glicemia')).toBeUndefined();
    expect(find(entries, 'Hm')).toBeUndefined();
    expect(find(entries, 'Leuco')).toBeUndefined();
    expect(selected(entries).every((e) => e.group === 'Urina')).toBe(true);
    expect(buildLine(entries, undefined)).toBe('Urina: Glicose 500, Hemácias 8.4/µL, Leucócitos 0.4/µL, Nitrito Negativo');
  });

  it('fração de albumina da eletroforese não vira albumina sérica', () => {
    const { entries } = extractReport(
      fromLines('ELETROFORESE DE PROTEÍNAS', 'Material: Soro', 'Albumina: 62,8 %', 'Gama: 17,1 %'),
    );
    expect(find(entries, 'Alb')).toBeUndefined();
    expect(buildLine(entries, undefined)).toBe('Eletroforese: Albumina 62,8%, Gama 17,1%');
  });

  it('tabela de resultados anteriores não substitui o resultado atual', () => {
    const { entries } = extractReport(
      fromLines(
        'Plaquetas',
        'Valores de Referência:',
        'Resultado: 182.000/mm3 150.000 a 450.000/ mm3',
        'Resultado(s) Anterior(es):',
        '16/03/2024 18/02/2024',
        'Plaquetas: 181.000/mm3 176.000/mm3',
      ),
    );
    expect(find(entries, 'Plaq')?.value).toBe('182.000');
  });

  it('marcador de alterado entre valor e unidade ("0,80 H mg/dL")', () => {
    const { entries } = extractReport(fromLines('Creatinina 0,80 H mg/dL 0,30 a 0,70', 'Hemoglobina 10,9 L g/dL 12,0-15,5'));
    expect(find(entries, 'Cr')).toMatchObject({ value: '0,80', unit: 'mg/dl' });
    expect(find(entries, 'Hb')).toMatchObject({ value: '10,9', unit: 'g/dl' });
  });

  it('valor sem rótulo abaixo de "RESULTADO VALORES DE REFERÊNCIA" (Fleury)', () => {
    const { entries } = extractReport(
      fromLines('CREATININA, soro', 'Método: Cinético colorimétrico', 'RESULTADO VALORES DE REFERÊNCIA', '0,93 mg/dL Masc: mais de 12 anos: 0,70 a 1,30 mg/dL'),
    );
    expect(find(entries, 'Cr')).toMatchObject({ value: '0,93', unit: 'mg/dl' });
  });

  it('nome quebrado em duas linhas só junta quando o nome completo é reconhecido', () => {
    const { entries } = extractReport(
      fromLines('CONCENTRAÇÃO DE HEMOGLOBINA', 'CORPUSCULAR MÉDIA: 32,4 g/dL 32,4 a 36,0', 'Contagem de 148.000 /μL 150.000 a 450.000 /μL', 'Plaquetas'),
    );
    expect(find(entries, 'CHCM')?.value).toBe('32,4');
    expect(find(entries, 'Plaq')?.value).toBe('148.000');
  });

  it('linha de referência não vira resultado ("Mulher: 2,4 a 6,0", "Adolescentes >45")', () => {
    const { entries } = extractReport(
      fromLines('ÁCIDO ÚRICO Material: SORO', 'RESULTADO..............: 5,5 mg/dL Homem.: 3,4 a 7,0 mg/dL', 'Mulher: 2,4 a 6,0 mg/dL', 'Adolescentes >45 mg/dL'),
    );
    expect(selected(entries).map((e) => `${e.abbr} ${e.value}`)).toEqual(['AU 5,5']);
  });

  it('data da coleta em vários formatos', () => {
    const date = (line: string) => extractReport(fromLines(line, 'Glicose: 90 mg/dL')).report.collectedAt;
    expect(date('[DATA DA COLETA : 22/05/2026 07:40]')).toBe('22/05/2026');
    expect(date('RECEBIDO/COLETADO EM: 21/06/2023 LIBERADO EM: 21/06/2023 19:52')).toBe('21/06/2023');
    expect(date('Data/Hora da Coleta: 09/08/2024 - 07:26')).toBe('09/08/2024');
    expect(date('Número: 1 Data da Requisição: 01/08/2025 às 09:51')).toBe('01/08/2025');
  });
});

// Primeira testagem com gabaritos extras, auditoria de perdas e trechos de texto de outros projetos.
describe('erros da primeira testagem', () => {
  const line = (...lines: string[]) => selected(extractReport(fromLines(...lines)).entries).map((e) => `${e.abbr} ${e.value}`);

  it('histórico numa linha só não esconde os resultados seguintes', () => {
    expect(
      line(
        'Tempo de Atividade de Protrombina (TAP)',
        'Material: Plasma (citrato) Coleta: 03/08/2026 - 08:18',
        'Tempo de Protrombina: 32,5 segundos',
        'Resultados anteriores: 10/01/2026 - 34,8',
        'Atividade: 21,5 %',
        'INR: 3,10',
      ),
    ).toEqual(['TAP 32,5', 'AP 21,5', 'INR 3,10']);
  });

  it('tabela de histórico impressa antes do "Material:" do resultado atual (Belém)', () => {
    expect(
      line('SHBG', 'RESULTADOS ANTERIORES', 'DATA SHBG', '24/03/2025 08:19 11,2 nmol/L', 'Material: SORO', 'SHBG: 9,8 nmol/L'),
    ).toEqual(['SHBG 9,8']);
  });

  it('PSA livre não vira PSA total', () => {
    expect(
      line(
        'PSA LIVRE - ANTÍGENO PROSTÁTICO ESPECÍFICO',
        'Resultado: 0,09 ng/mL',
        'PSA TOTAL',
        'Material: Soro',
        'Resultado: 0,30 ng/mL',
      ),
    ).toEqual(['PSA livre 0,09', 'PSA total 0,30']);
  });

  it('título com "Resultado" ao lado e o valor na linha de baixo; título não reconhecido não herda o anterior', () => {
    expect(
      line(
        'COLESTEROL HDL Resultado',
        '40 mg/dL',
        'Valor(es) de referência',
        'TESTOSTERONA LIVRE Valor de Referência:',
        'Resultado: 8,04 ng/dL Menacme:',
        'XYZ QUALQUER: TEXTO',
        'Resultado: 5,5 mg/dL',
      ),
    ).toEqual(['Testosterona livre 8,04', 'HDL 40']);
  });

  it('resultado impresso com comparador mantém o sinal ("Inferior a 10,4" → <10,4)', () => {
    expect(line('Antiperoxidase Inferior a 10,4 U/mL Inferior a 13,8 U/mL', 'Tireoideana -')).toEqual(['Anti-TPO <10,4']);
  });

  it('título na mesma linha da coleta ("VITAMINA B12 coleta: ...")', () => {
    expect(line('VITAMINA B12 coleta: 18/08/2023 11:35', 'MÉTODO: QUIMIOLUMINESCÊNCIA MATERIAL: SANGUE', 'RESULTADO: 475 pg/mL')).toEqual([
      'B12 475',
    ]);
  });

  it('dígitos de largura dupla ("0,９") sem estragar "10³" nem "1ª hora"', () => {
    expect(line('Creatinina .......... 0,９ mg/dL', 'Plaquetas 85 x 10³/mm3 130 a 450')).toEqual(['Plaq 85.000', 'Cr 0,9']);
  });

  it('absoluto com milhar numa tabela evolutiva não vira percentual ("13.047")', () => {
    const { entries } = extractReport(fromLines('Segmentados 13.047 12.025 7.811 5.041 1.300 a 7.000 /mm³'));
    expect(find(entries, 'Seg')).toMatchObject({ value: '13.047', percent: undefined });
  });

  it('hífen entre percentual e absoluto ("54,9 % - 3184 /mm³") e nome quebrado em minúscula', () => {
    const { entries } = extractReport(
      fromLines('Segmentados..........: 54,9 % - 3184 /mm³ 50 - 70', 'Linfócitos típicos....: 36,9 % - 2140 /mm³', 'atípicos....: 0,0 % - 0 /mm³ 0'),
    );
    expect(find(entries, 'Seg')).toMatchObject({ value: '3184', percent: '54,9' });
    expect(find(entries, 'Linf atíp')).toMatchObject({ value: '0', percent: '0,0' });
  });

  it('referências e frases não viram resultado ("Até 10000/mL", "diabetes mellitus deve...", "valor padrão =")', () => {
    expect(
      line(
        'Glicose: 90 mg/dL',
        'Até 10000/mL',
        'diabetes mellitus deve inferior a 7% (< 154 mg/dL), conforme a ADA',
        '* valor padrão de albumina = 4,3 g/dL (1).',
        'Amarelo Citrino',
      ),
    ).toEqual(['Glicemia 90']);
  });
});
