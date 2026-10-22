# Manual de Dermatologia → app

`convert.py` transforma o manual em HTML (um arquivo único, com as imagens em base64) no conteúdo do
tópico de Dermatologia:

- `med_study-main/src/dermatologia/capitulos/derm-cap-NN.json`: um arquivo por capítulo, com o texto
  integral em blocos (parágrafos, listas, tabelas, quadros, fluxos, figuras). Questões e simulado ficam de fora.
- `med_study-main/src/dermatologia/capitulos/glossario.json`: termos, definições e capítulo de origem.
- `med_study-main/src/dermatologia/manifest.json`: lista de capítulos (menu e busca).
- `med_study-main/public/derm/`: as imagens principais (1 por seção, ou 2 em seções com 4 ou mais imagens).

Para regenerar, na pasta `med_study-main`:

```bash
pip install beautifulsoup4
python3 ../tools/dermatologia/convert.py caminho/manual-dermatologia.html src/dermatologia public/derm
```

O app lê esses arquivos em `src/DermatologiaCapitulo.tsx`. Pênfigo e Psoríase são escritos à mão em
`src/PenfigoMain.tsx` e `src/PsoriaseMain.tsx`.
