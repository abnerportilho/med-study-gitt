# Créditos

O motor do Extrator de Exames (`pdf/extract.ts`, `parser/` e `format/rules.ts`) é
derivado do **Exam Liner** (https://github.com/igordrnobrega/exam-pdf-liner),
Copyright 2026 Igor Nóbrega, licenciado sob a Apache License 2.0
(cópia em `LICENSE-exam-pdf-liner.txt`).

Alterações feitas aqui: layout genérico para laboratórios não reconhecidos,
resultados qualitativos, mais unidades, data da coleta em vários formatos,
exames de urina separados do hemograma, unidades na saída e o formato da linha.

As fixtures `__fixtures__/sabin-*.json` e `__fixtures__/dasa-*.json` vêm do mesmo
projeto (laudos reais já anonimizados pelo autor). Os PDFs `__fixtures__/sintetico-*.pdf`
são fictícios: os `laudo-*` vêm do projeto Exames-de-Sangue
(https://github.com/psrs2000/Exames-de-Sangue, MIT) e os `precisa-*` foram gerados
com lab-report-fixtures (https://github.com/Precisa-Saude/lab-report-fixtures, MIT).

Inclui o pdf.js (Mozilla, Apache License 2.0) como dependência.
