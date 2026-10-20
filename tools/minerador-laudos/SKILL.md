---
name: minerador-laudos
description: Minera na internet exemplos de laudos brasileiros (PDF e imagem) — exames laboratoriais, espirometria/PFP, laudos de imagem (TC, RX, USG, mamografia, densitometria), ecocardiograma e polissonografia — cataloga cada layout e gera versões anonimizadas para servirem de teste ao Extrator de Exames do med-study. Use quando pedirem para buscar, minerar ou coletar modelos de laudo/exame.
---

# Minerador de modelos de laudos laboratoriais

## Objetivo

Reunir o **maior número possível de layouts diferentes** de laudos de exames
laboratoriais brasileiros (hemograma, bioquímica, urina, coagulação, hormônios,
sorologias, gasometria) para testar o Extrator de Exames. O que importa é a
**variedade de layouts**, não a quantidade de laudos do mesmo laboratório:
no máximo 3 por laboratório/layout.

Prioridade de laboratórios (os que ainda faltam vêm primeiro):
1. Fleury, a+ Medicina Diagnóstica, Weinmann, Labs a+
2. Alliança, DB Diagnósticos, Hermes Pardini (laudo próprio)
3. Delboni, Lavoisier, Sérgio Franco, Alta, Exame (Dasa)
4. Sabin, Tommasi, Unimed (laboratórios próprios), Santa Casa
5. Laboratórios públicos: LACEN, GAL/SUS, hospitais universitários (HC, Ebserh)
6. Laboratórios regionais pequenos de qualquer estado

Já temos (não precisa buscar de novo): Sabin, Dasa/Lavoisier, Fleury, Unimed Araraquara/Unilab,
IPC Araraquara, Biosul (RS), Prosangue (PB), Laboratório Beneficente de Belém e Hermes
Pardini como laboratório de apoio.

## Fase 2: imagem, função pulmonar e métodos gráficos

Além dos exames de sangue, colete laudos destes tipos (PDF com texto, PDF escaneado,
foto ou print, todos servem; o OCR também será testado):

| Tipo | O que o laudo precisa ter | Termos de busca |
|---|---|---|
| **Espirometria / PFP** | CVF, VEF1, VEF1/CVF, FEF25-75, % do previsto, pré e pós-broncodilatador; DLCO e volumes quando houver | "laudo espirometria", "prova de função pulmonar resultado", "espirometria com broncodilatador pdf", "pletismografia laudo", "DLCO laudo" |
| **TC de tórax** | Técnica, achados e **impressão diagnóstica/conclusão**; nódulos com medida, Lung-RADS ou Fleischner | "laudo tomografia de tórax", "TC tórax nódulo laudo", "modelo laudo TC tórax", "Lung-RADS laudo" |
| **RX de tórax** | Achados e conclusão | "laudo radiografia de tórax", "raio x tórax laudo modelo" |
| **Ultrassonografia** | Abdome, tireoide (TI-RADS), mamas, pélvica/transvaginal (O-RADS), Doppler; conclusão | "laudo ultrassonografia abdome total", "laudo USG tireoide TI-RADS", "modelo laudo ultrassom" |
| **Mamografia** | Achados, **BI-RADS**, recomendação | "laudo mamografia BI-RADS", "mamografia resultado pdf" |
| **Densitometria óssea** | T-score e Z-score por região (coluna, colo do fêmur, fêmur total), conclusão | "laudo densitometria óssea", "densitometria T-score laudo" |
| **Ecocardiograma** | FEVE (Teichholz/Simpson), AE, VE, VD, PSAP, conclusão | "laudo ecocardiograma transtorácico", "ecocardiograma fração de ejeção laudo" |
| **Polissonografia** | IAH, IDO, SpO2 mínima, tempo com SpO2 < 90%, eficiência do sono, conclusão (SAOS leve/moderada/grave) | "laudo polissonografia", "polissonografia IAH resultado", "laudo poligrafia respiratória" |

Fontes que costumam render para imagem: **sites de clínicas de radiologia** (páginas
"modelo de laudo"), Colégio Brasileiro de Radiologia (CBR), livros e apostilas de
radiologia com "frases e máscaras de laudo", editais (anexam modelo de laudo),
relatos de caso em revistas (SciELO, Radiologia Brasileira), Scribd/Passei Direto
("modelo de laudo ultrassom"), e projetos de "editor de laudos" no GitHub, que trazem
bibliotecas inteiras de máscaras. Para espirometria e polissonografia, além disso,
sites de clínicas de pneumologia e do sono e materiais da SBPT.

Meta: pelo menos 5 laudos de cada tipo, de serviços diferentes. Laudo preenchido vale
mais que máscara em branco, mas máscaras também ajudam (mostram como as seções se chamam).

## Onde procurar

Varie MUITO o vocabulário. Combine um termo de cada coluna de `vocabulario.md`
e tente também cada laboratório pelo nome. Fontes em ordem de rendimento:

1. **Google Imagens / Bing Imagens**: "laudo hemograma", "resultado exame de sangue",
   "exame laboratorial resultado" + nome do laboratório.
2. **Google com `filetype:pdf`**: `"valores de referência" hemoglobina filetype:pdf`,
   `"data da coleta" creatinina filetype:pdf site:gov.br`, `site:edu.br laudo hemograma`.
3. **Documentos públicos**: editais e termos de referência de prefeituras e hospitais
   (costumam anexar "modelo de laudo"), apostilas de universidades, TCCs e relatos
   de caso com laudo em anexo (SciELO, repositórios .edu.br), manuais de laboratório.
4. **Scribd, SlideShare, Passei Direto, Studocu**: buscar "laudo hemograma", "resultado de exames".
5. **Fóruns e redes**: Reclame Aqui (prints de laudo), fóruns de saúde, Reddit r/brasil,
   grupos de medicina, posts de "meu exame deu...".
6. **GitHub**: projetos que leem laudos guardam exemplos em pastas `fixtures`, `samples`, `tests`.

Para cada achado, registre a URL de origem em `urls.txt` (uma por linha, com um
comentário `# laboratório - observação` na linha de cima).

## Regras obrigatórias

- **Dados pessoais (LGPD):** quase todo laudo real tem nome, CPF, data de nascimento e
  médico. Pode baixar para análise local, mas **nunca** publique, envie para outro
  serviço nem coloque no Git o arquivo original. O que pode ir para o repositório
  é só a versão anonimizada gerada por `python minerar.py anonimizar`.
- Prefira laudos já anonimizados, fictícios ou de material didático.
- Não faça login, não burle paywall nem captcha, não use contas de terceiros.
- Anote a licença quando houver (repositórios do GitHub). Sem licença = só uso local.

## Passo a passo

```bash
cd tools/minerador-laudos
pip install pypdf pillow          # uma vez
# 1. junte as URLs achadas em urls.txt e baixe tudo (dedup por hash)
python minerar.py baixar urls.txt
# 2. cataloga: laboratório, formato (pdf-texto / pdf-escaneado / imagem), exames, dados pessoais
python minerar.py catalogar amostras/
# 3. gera fixtures anonimizadas (texto linha a linha, sem nome/CPF/médico)
python minerar.py anonimizar amostras/
# 4. resumo: quantos layouts por laboratório e o que ainda falta
python minerar.py resumo
```

Imagens (prints e fotos) não têm texto extraível: ficam catalogadas como `imagem` e a
anonimização delas é manual (cobrir nome e documento antes de compartilhar).

## Entrega

Ao terminar, devolva:
1. A tabela do `python minerar.py resumo` (laboratório, formato, quantidade, tem dados pessoais).
2. A pasta `anonimizados/`, que é o que pode ser compartilhado e versionado.
3. A lista de laboratórios que continuam sem nenhum exemplo e, na Fase 2, quantos
   laudos de cada tipo foram encontrados (o `resumo` mostra essa contagem).

Nunca coloque nomes de pacientes no relatório.
