# Deploy: Google AI Studio → GitHub → Vercel

Como uma mudança sai do AI Studio e chega ao site usado no consultório.

```
Google AI Studio  ──Save to GitHub──▶  GitHub (main)  ──deploy──▶  Vercel  ──▶  med-study-murex.vercel.app
   (cria/edita)                      abnerportilho/med-study-gitt    projeto med-study     (site em uso)
```

## Endereços

| O quê | Onde |
|---|---|
| App no AI Studio | https://aistudio.google.com/apps/b17ce8a7-8f91-40ba-bef1-499f113737b5 |
| Repositório | https://github.com/abnerportilho/med-study-gitt (branch `main`) |
| Projeto na Vercel | https://vercel.com/abnerportilhos-projects/med-study (time `abnerportilhos-projects`) |
| Site em produção | https://med-study-murex.vercel.app |

## 1. Criar ou editar no AI Studio

1. Abra o app no AI Studio e peça a mudança no chat do Gemini.
2. Confira o resultado no **Preview**.
3. Envie para o GitHub: botão **GitHub** (no topo à direita) → **Push / Save to GitHub**.
   A tela deve mostrar *"GitHub & Google AI Studio are currently in sync"*.

O AI Studio grava direto no `main`, num commit com o seu nome (ex.: `feat: expand clinical modules…`).

## 2. GitHub (`main`)

- O `main` é a versão oficial: é ele que vai para a Vercel.
- O que o Claude faz (correções, módulos novos) entra por pull request e merge no `main`.
- Antes de publicar, a versão é verificada com:

  ```bash
  npm install
  npx tsc --noEmit   # typecheck
  npx vitest run     # testes
  npm run build      # build de produção (gera dist/)
  ```

## 3. Deploy na Vercel

Configuração do projeto `med-study`: framework **Vite**, Node **24.x**, build `npm run build`, saída `dist/`.

### Situação atual: deploy pelo Claude

O projeto da Vercel **ainda não está ligado ao GitHub**, então um push no `main` não publica sozinho.
Depois de cada envio do AI Studio ou merge, o Claude:

1. testa o `main` (comandos acima);
2. cria o deploy de produção pelo conector da Vercel, a partir do commit do `main`;
3. confere o site no ar: abre todos os itens do menu e procura a tela "Esta tela não abriu" e erros no console.

Basta avisar no chat: *"mandei pelo AI Studio, publica"*.

### Para publicar sozinho (recomendado, feito uma vez)

1. Abra https://vercel.com/abnerportilhos-projects/med-study/settings/git
2. **Connect Git Repository** → **GitHub** → `abnerportilho/med-study-gitt`
   (se o repositório não aparecer: **Adjust GitHub App Permissions** e libere o acesso).
3. **Production Branch** = `main`.

A partir daí, todo push no `main` (AI Studio ou merge) vira deploy de produção em 1 a 2 minutos.

## 4. Conferir se publicou

- Na Vercel, aba **Deployments**: o último deve mostrar o commit novo com status **Ready**.
- No site, recarregue sem cache (**Ctrl+Shift+R**; no celular, feche e reabra a aba).
- Abra o módulo novo e mais alguns do menu.

## Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Site continua com a versão antiga | Deploy não foi disparado (projeto sem Git ligado) ou cache do navegador | Ver o último deploy na Vercel; pedir o deploy ao Claude; Ctrl+Shift+R |
| Tela "Esta tela não abriu" logo depois de um deploy | Aba aberta antes da atualização tentando carregar arquivos da versão anterior | Clicar em **Recarregar página** |
| Tela "Esta tela não abriu" sempre no mesmo módulo | Erro no código desse módulo | Mandar um print com a mensagem para o Claude |
| Deploy com status **Error** na Vercel | Build quebrou (erro de TypeScript, import faltando) | Mandar o log ao Claude; o site fica na última versão boa |
| Imagens da Dermatologia não aparecem | Elas vêm do jsDelivr (commit fixo `2eddaa3`), não do deploy | Ver `tools/dermatologia/README.md` |

## Cuidados

- Não versionar `package-lock.json`: o AI Studio o removeu do repositório de propósito.
- Não versionar `dist/` nem `node_modules/` (estão no `.gitignore`).
- Tokens e chaves (Vercel, Gemini) nunca entram no repositório nem no chat; ficam nas configurações da Vercel ou do ambiente.
- Para voltar a uma versão anterior: na Vercel, **Deployments** → deploy antigo → **Promote to Production** (ou peça ao Claude um rollback).
