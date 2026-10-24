# Histórico de Atualizações — My Study

> **Memória compartilhada entre todos os chats.** Cada chat que fizer uma mudança no projeto
> adiciona uma entrada **no topo** desta lista, no mesmo commit da mudança (ver `CLAUDE.md`).
> Entradas mais recentes primeiro.

## Modelo de entrada

```markdown
### AAAA-MM-DD — Título curto da mudança
- **Branch / PR:** `nome-da-branch` · PR #N (ou "sem PR ainda")
- **O que mudou:** resumo em linguagem simples.
- **Arquivos principais:** `caminho/arquivo.tsx`, `pasta/`
- **Decisões:** o que foi decidido e por quê (pedidos do usuário, remoções).
- **Pendências:** o que ficou em aberto / próximos passos.
```

---

### 2026-10-24 — Memória compartilhada entre chats + README atualizado
- **Branch / PR:** `claude/zealous-hypatia-j3llbu` · sem PR ainda
- **O que mudou:** criado o `CLAUDE.md` (lido automaticamente por todo chat) e este `HISTORICO.md`,
  para que vários chats trabalhem no mesmo projeto sabendo o que os outros fizeram. O histórico foi
  reconstruído desde o início a partir do Git. O `README.md` foi atualizado com o que entrou na `main`
  (Extrator de Exames, MRPA, novas fichas A4, Dermatologia completa, testes).
- **Arquivos principais:** `CLAUDE.md`, `HISTORICO.md`, `README.md`
- **Decisões:** usar `CLAUDE.md` porque o Claude Code o carrega sozinho em toda sessão; o histórico fica
  em arquivo separado para não inflar as instruções.
- **Pendências:** ver seção 12 do `README.md`.

### 2026-10-22 — README com especificações e Entendimento de Pronto
- **Branch / PR:** `claude/zealous-hypatia-j3llbu` · sem PR ainda
- **O que mudou:** o README padrão do Google AI Studio foi trocado por um documento com todas as
  especificações do My Study (stack, arquitetura, navegação, ferramentas, catálogo por especialidade
  com status ✅/🚧, padrões de UI, dados) e o **Entendimento de Pronto** (checklist de conclusão).
- **Arquivos principais:** `README.md`
- **Pendências:** —

### 2026-10-22 — Tela de erro em vez de app em branco (PR #4)
- **Branch / PR:** `claude/eloquent-cori-sg8iww` · PR #4 (mesclado)
- **O que mudou:** um erro em qualquer tela deixava o app todo em branco. Agora um `ErrorBoundary`
  mostra a mensagem com botões de recarregar/tentar de novo; uma aba aberta antes de um deploy recarrega
  sozinha uma vez quando um pedaço do build antigo some; falhas ao carregar capítulo/glossário da
  Dermatologia oferecem recarregar.
- **Arquivos principais:** `med_study-main/src/ErrorBoundary.tsx`, `main.tsx`, `DermatologiaCapitulo.tsx`

### 2026-10-22 — Dermatologia completa: manual por capítulo + Pênfigo e Psoríase (PR #3)
- **Branch / PR:** `claude/eloquent-cori-sg8iww` · PR #3 (mesclado)
- **O que mudou:** o Manual de Dermatologia (19 capítulos + glossário) virou um tópico por capítulo,
  carregado sob demanda (JSON), com 237 imagens, tabelas, destaques, zoom de figuras, glossário ao toque
  e navegação anterior/próximo. Novos módulos Pênfigo e Psoríase no formato de abas (EADV/JAAD, consenso
  brasileiro de psoríase). A busca indexa os títulos das seções dos capítulos.
- **Arquivos principais:** `DermatologiaMain.tsx`, `DermatologiaCapitulo.tsx`, `DermatologiaDoenca.tsx`,
  `PenfigoMain.tsx`, `PsoriaseMain.tsx`, `src/dermatologia/`, `med_study-main/public/derm/`, `tools/dermatologia/`
- **Decisões:** quizzes e simulados do manual ficaram de fora. O build da raiz passou a usar
  `med_study-main/public` como pasta pública (a cópia `public/` da raiz foi removida).

### 2026-10-22 — Fichas A4: Plano de Ação na Asma e Pé Diabético (PR #2)
- **Branch / PR:** `claude/eloquent-cori-sg8iww` · PR #2 (mesclado)
- **O que mudou:** duas fichas imprimíveis no mesmo layout do Guia da DRC: plano de ação verde/amarelo/
  vermelho na asma (MART ou SABA, zonas de pico de fluxo, técnica inalatória) e cuidados com o pé
  diabético (9 seções, sinais de alerta, checklist semanal, risco IWGDF 2023).
- **Arquivos principais:** `AsmaPlanoAcaoMain.tsx`, `PeDiabeticoMain.tsx`, `HubPortalMain.tsx`
- **Decisões:** removidos os cards placeholder de dieta DASH, TRO pediátrica e fotoproteção, e os
  filtros Pediatria/Dermatologia do Hub, que ficaram vazios.

### 2026-10-20 a 22 — Extrator de Exames, Minerador de Laudos e Diário de MRPA (PR #1)
- **Branch / PR:** `claude/eloquent-cori-sg8iww` · PR #1 (mesclado)
- **O que mudou:**
  - **Correção:** `fuse.js` adicionado ao `package.json` (o app não subia numa instalação limpa).
  - **Extrator de Exames** (nova aba no menu principal): lê PDFs de laudos **no navegador** (pdf.js, nada é
    enviado) e monta uma linha pronta para o prontuário, ex.: `(22/05/26) Hb 15,1 g/dL | Ht 45,0% | …`.
    Também lê laudos de imagem/métodos gráficos (TC, RX, USG, mamografia, densitometria, RM, eco,
    polissonografia), copiando a conclusão literal + escores (BI-RADS, TI-RADS, FEVE, IAH etc.).
    O médico confere, desmarca ou edita cada item antes de copiar. Testes com vitest (52 testes).
  - **Minerador de laudos** (`tools/minerador-laudos/`): missão e script para coletar, anonimizar e
    catalogar amostras de laudos usadas como casos de teste do Extrator (amostras brutas fora do Git).
  - **Diário de MRPA** (Cardiologia, A4 editável): protocolos rápidos, dias (até 31) e leituras por
    período livres; médias excluindo o dia de adaptação; alerta ≥ 180/110; interpretação contra a PA do
    consultório (avental branco, mascarada, sustentada).
  - `pdfjs-dist` adicionado ao `package.json` da raiz e lockfile sincronizado (o deploy builda da raiz).
- **Arquivos principais:** `ExtratorExamesMain.tsx`, `med_study-main/src/extrator/`, `MrpaDiarioMain.tsx`,
  `tools/minerador-laudos/`, `package.json`, `package-lock.json`
- **Decisões (pedidos do usuário na revisão):** removidos do Hub os cards de PTU/vasculite e
  Hidralazina/DILE; retirados da ficha de MRPA os campos de médico, clínica, instruções e assinatura.
  Motor do Extrator derivado do `exam-pdf-liner` (Apache-2.0, ver `med_study-main/src/extrator/NOTICE.md`).

### 2026-10-20 — Estrutura inicial do projeto
- **Branch / PR:** `main` (commits iniciais)
- **O que mudou:** importação do projeto vindo do Google AI Studio ("ESTUDO GERAL"), com o app em
  `med_study-main/` e configuração de build na raiz.
