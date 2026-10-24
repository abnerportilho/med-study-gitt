# CLAUDE.md — Instruções para todo chat que mexer no My Study

> Este arquivo é carregado automaticamente pelo Claude Code no início de cada sessão.
> Ele, junto com o `HISTORICO.md`, é a **memória compartilhada entre todos os chats** do projeto.
> Vários chats trabalham em paralelo neste repositório: nenhum deles lembra o que o outro fez,
> a não ser pelo que está escrito aqui e no Git.

## 1. Antes de começar qualquer tarefa

1. **Leia o `HISTORICO.md`** (pelo menos as 5 entradas mais recentes) para saber o que já foi feito,
   o que está em andamento em outras branches e quais pendências existem.
2. **Leia o `README.md`** — especificações, catálogo de módulos e o **Entendimento de Pronto** (seção 10).
3. **Atualize a sua branch com a `main`** antes de editar, para não trabalhar em cima de código velho:
   ```bash
   git fetch origin main
   git merge origin/main        # nunca rebase/force-push em branch de outra pessoa
   ```
4. Se o pedido conflitar com algo registrado no histórico (ex.: algo que foi removido de propósito),
   pergunte ao usuário antes de desfazer.

## 2. Ao terminar cada tarefa (obrigatório)

Antes do commit final da tarefa, **adicione uma entrada no topo do `HISTORICO.md`**, seguindo o modelo
que está nele. A entrada vai **no mesmo commit/PR** da mudança. Ela deve dizer:

- data, branch e PR (se houver);
- o que foi feito, em linguagem simples (o usuário lê);
- arquivos/pastas principais tocados;
- decisões tomadas e o porquê (principalmente remoções e pedidos do usuário);
- pendências ou próximos passos deixados em aberto.

Se a mudança alterar o catálogo, a estrutura ou as pendências, **atualize também o `README.md`**
(seções 4, 6, 7 e 12).

## 3. Regras do projeto

- Idioma do conteúdo e da interface: **português do Brasil**.
- O app roda **a partir da raiz** (`index.html` → `med_study-main/src/main.tsx`); a pasta pública é
  `med_study-main/public` (configurada em `vite.config.ts`). Instale dependências na **raiz**.
- Dependência nova: atualizar `package.json` **e** `package-lock.json` da raiz juntos.
- Antes de cada push, rode na raiz:
  ```bash
  npm run lint   # tsc --noEmit
  npm test       # vitest
  npm run build
  ```
- Siga o **Entendimento de Pronto** do `README.md` (seção 10) para dar algo como concluído.
- Não abra PR sem o usuário pedir. Não faça push em branch diferente da designada para o chat.

## 4. Mapa rápido

| Onde | O quê |
|---|---|
| `med_study-main/src/App.tsx` | Shell, catálogo `SPECIALTIES`, roteamento por estado, `DISEASE_CONFIGS` |
| `med_study-main/src/SearchMain.tsx` | Índice da Pesquisa Global (`SEARCH_DATA`) |
| `med_study-main/src/HubPortalMain.tsx` | Hub e Fichas de Orientação (A4) |
| `med_study-main/src/extrator/` | Motor do Extrator de Exames (com testes vitest) |
| `med_study-main/src/dermatologia/` + `public/derm/` | Manual de Dermatologia (JSON por capítulo + imagens) |
| `tools/` | Scripts auxiliares (conversor da dermatologia, minerador de laudos) |
| `HISTORICO.md` | Diário de atualizações — **memória compartilhada** |
