# My Study — Plataforma Interativa de Estudo Médico

> Também publicado como **"ESTUDO GERAL"** (título em `index.html` / `metadata.json`).

O **My Study** é uma aplicação web (SPA) de estudo e consulta rápida para medicina. Reúne, em uma única interface, **protocolos clínicos resumidos**, **fluxogramas**, **calculadoras clínicas**, **fichas de fármacos**, **rastreador de interações**, **fichas de orientação ao paciente para impressão (A4)** e um **gerador de receitas** (Prescrevo), organizados por especialidade.

Este documento descreve **todas as especificações** do projeto (stack, arquitetura, módulos, conteúdo) e o **Entendimento de Pronto** (_Definition of Done_) que vale para qualquer novo módulo ou alteração.

> **Vários chats trabalham neste projeto.** A memória compartilhada entre eles fica em dois arquivos:
> - [`CLAUDE.md`](CLAUDE.md): regras que todo chat lê automaticamente ao começar;
> - [`HISTORICO.md`](HISTORICO.md): resumo de cada atualização (o que mudou, por quê e o que ficou pendente).
>
> Toda mudança deve registrar uma entrada no `HISTORICO.md` no mesmo commit.

---

## Sumário

1. [Visão geral do produto](#1-visão-geral-do-produto)
2. [Stack e requisitos](#2-stack-e-requisitos)
3. [Como rodar](#3-como-rodar)
4. [Estrutura do repositório](#4-estrutura-do-repositório)
5. [Arquitetura e navegação](#5-arquitetura-e-navegação)
6. [Ferramentas transversais](#6-ferramentas-transversais)
7. [Catálogo de conteúdo por especialidade](#7-catálogo-de-conteúdo-por-especialidade)
8. [Padrões de UI e design](#8-padrões-de-ui-e-design)
9. [Dados e persistência](#9-dados-e-persistência)
10. [Entendimento de Pronto (Definition of Done)](#10-entendimento-de-pronto-definition-of-done)
11. [Como adicionar um novo módulo](#11-como-adicionar-um-novo-módulo)
12. [Estado atual e pendências conhecidas](#12-estado-atual-e-pendências-conhecidas)
13. [Aviso legal](#13-aviso-legal)

---

## 1. Visão geral do produto

| Item | Descrição |
|---|---|
| **Público-alvo** | Estudantes de medicina, internos e residentes (preparação para provas e consulta à beira-leito). |
| **Idioma** | Português do Brasil (`lang="pt-BR"`). |
| **Proposta** | Resumos baseados em diretrizes (GINA, GOLD, SBC, KDIGO, ATLS, FEBRASGO etc.), com navegação por especialidade → doença → aba temática. |
| **Formato** | SPA estática, 100% client-side. Não há backend nem login. |
| **Tema** | Modo escuro forçado ao carregar (`document.documentElement.classList.add('dark')`). |

Principais capacidades:

- **Protocolos por doença**, divididos em abas: Fisiopatologia/Definição → Achados Clínicos → Diagnóstico/Exames → Classificação → Tratamento (com abas extras quando o tema exige).
- **Calculadoras clínicas** interativas (PREVENT™ AHA 2024, CKD-EPI 2021, metas de dislipidemia, simulador diagnóstico de DMG, gasometria/delta-ratio etc.).
- **Pesquisa global** com busca aproximada (fuzzy) por doença, sinônimo ou palavra-chave.
- **Fichas de fármacos** e **rastreador de interações multidrogas**, ambos imprimíveis.
- **Fichas de orientação ao paciente** em formato A4 para impressão.
- **Extrator de Exames**: lê PDFs de laudos laboratoriais e de imagem no navegador e monta uma linha pronta para o prontuário.
- **Manual de Dermatologia** completo, um tópico por capítulo, com imagens e glossário.
- **Prescrevo**: gerador de receitas standalone com base própria de esquemas.

---

## 2. Stack e requisitos

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript ~5.8 (TSX) |
| UI | React 19 (`StrictMode`) |
| Build / dev server | Vite 6 + `@vitejs/plugin-react` |
| Estilo | Tailwind CSS 4 (`@tailwindcss/vite`) + tokens em `@theme` (`src/index.css`) |
| Utilitários de classe | `clsx` + `tailwind-merge` (helper `cn()`) |
| Ícones | `lucide-react` + ícones SVG próprios (pulmão, ovário, rim) |
| Animações | `motion` (`motion/react`) |
| Gráficos | `recharts` |
| Busca | `fuse.js` (busca fuzzy) |
| Leitura de PDF | `pdfjs-dist` (Extrator de Exames, roda no navegador) |
| Testes | `vitest` (motor do Extrator) |
| Tipografia | Google Fonts: Syne, DM Sans, Space Mono |

**Requisitos:** Node.js 20+ (testado com Node 22) e npm.

> `@google/genai`, `express` e `dotenv` estão no `package.json` (herança do template do Google AI Studio), mas **não são usados** pelo código-fonte atual.

---

## 3. Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. (Opcional) variáveis de ambiente
cp .env.example .env.local   # GEMINI_API_KEY / APP_URL – não usadas hoje pelo app

# 3. Ambiente de desenvolvimento (http://localhost:3000)
npm run dev
```

| Script | O que faz |
|---|---|
| `npm run dev` | Sobe o Vite na porta 3000 (`--host=0.0.0.0`). |
| `npm run build` | Gera o build de produção em `dist/`. |
| `npm run preview` | Serve o build localmente. |
| `npm run lint` | Checagem de tipos com `tsc --noEmit`. |
| `npm test` | Testes automatizados (`vitest run`). |
| `npm run clean` | Remove `dist/`. |

O **Prescrevo** fica disponível em `/prescrevo.html` (servido a partir de `med_study-main/public/`).

---

## 4. Estrutura do repositório

```
med-study-gitt/
├── CLAUDE.md               # Regras para todos os chats (lido automaticamente)
├── HISTORICO.md            # Resumo de cada atualização — memória compartilhada
├── index.html              # Entrada do app → carrega /med_study-main/src/main.tsx
├── vite.config.ts          # Vite + React + Tailwind, alias "@", publicDir = med_study-main/public
├── tsconfig.json
├── package.json            # Projeto que efetivamente roda (dependências na raiz)
├── metadata.json           # Metadados do AI Studio (nome/descrição)
├── .env.example
├── tools/
│   ├── dermatologia/       # Conversor do manual de dermatologia → JSON por capítulo
│   └── minerador-laudos/   # Coleta/anonimização de laudos para testes do Extrator
└── med_study-main/         # Código-fonte da aplicação
    ├── src/
    │   ├── main.tsx        # Bootstrap React + ErrorBoundary + recarga após deploy
    │   ├── App.tsx         # Shell: sidebars, catálogo SPECIALTIES, roteamento por estado
    │   ├── index.css       # Tailwind + tokens de tema
    │   ├── *Main.tsx       # Módulos completos (um por tema)
    │   ├── <Doença><Aba>.tsx  # Abas dos módulos padrão (ex.: ICPatho, ICTreatment)
    │   ├── components/<tema>/ # Subcomponentes de módulos grandes
    │   ├── dermatologia/   # manifest.json + capítulos em JSON (carregados sob demanda)
    │   ├── extrator/       # Motor do Extrator de Exames (parser, formatação, imagem, testes)
    │   └── data/medicamentosData.ts
    ├── public/             # Pasta pública única do build
    │   ├── prescrevo.html, prescrevo-app.js, prescrevo-data.js  # Gerador de receitas (344 esquemas)
    │   └── derm/           # 237 imagens do manual de dermatologia
    └── package.json, vite.config.ts, index.html  # Configuração própria (legado, não usada)
```

O app é servido **a partir da raiz** do repositório: o `index.html` raiz aponta para `med_study-main/src/main.tsx` e o `vite.config.ts` raiz usa `med_study-main/public` como pasta pública. Os arquivos de configuração dentro de `med_study-main/` são uma cópia anterior e não são usados pelo build raiz.

---

## 5. Arquitetura e navegação

### 5.1 Layout

1. **Barra primária (esquerda, fixa, 80 px):** logo/Início (Hub), Pesquisa Global, Fichas de Orientação (A4), Fichas de Fármacos, Rastreador de Interações, Extrator de Exames e, abaixo, um ícone por especialidade.
2. **Barra secundária (recolhível):** lista de doenças/temas da especialidade selecionada (ordenada alfabeticamente em pt-BR).
3. **Área principal:** cabeçalho do tema, abas temáticas e conteúdo.

### 5.2 Roteamento

Não há React Router. A navegação é controlada por estado em `App.tsx`:

| Estado | Função |
|---|---|
| `selectedSpecialty` | Especialidade ou ferramenta ativa (`hub`, `search`, `orientacoes`, `medicamentos`, `rastreador`, `extrator`, `pneumologia`, …). |
| `selectedDisease` | Doença/tema ativo (ids do catálogo `SPECIALTIES`). |
| `activeTab` | Aba ativa dentro de um módulo padrão (`<id>-patho`, `<id>-clinical`, …). |
| `isSidebarCollapsed` | Recolhe/expande a barra secundária. |

A renderização segue esta ordem de prioridade:

1. Ferramentas transversais (`hub`, `orientacoes`, `rastreador`, `extrator`, `medicamentos`, `search`).
2. Especialidades com módulo próprio (`cirurgia`, `preventiva`, `dermatologia`), que recebem `initialTopic`.
3. Doenças com componente `*Main` dedicado (ex.: `prenatal`, `dislipidemias`, `ca-mama`…).
4. Doenças em `DISEASE_CONFIGS` → **layout padrão de abas**.
5. Qualquer outro id → tela **"protocolo em desenvolvimento"**.

### 5.3 Layout padrão de abas (módulos `DISEASE_CONFIGS`)

| Aba | Id | Componente típico |
|---|---|---|
| Fisiopatologia/Definição | `<id>-patho` | `XxxPatho.tsx` |
| Achados Clínicos | `<id>-clinical` | `XxxClinical.tsx` |
| Diagnóstico / Exames | `<id>-diagnosis` | `XxxDiagnosis.tsx` |
| Classificação | `<id>-classification` | `XxxClassification.tsx` |
| Tratamento | `<id>-treatment` | `XxxTreatment.tsx` |

Abas extras: DRC (Guia do Paciente A4, Epidemiologia, Calculadora CKD-EPI, Diálise), DPOC (Epidemiologia; Classificação e Tratamento unificados), IC (IC Descompensada), Arritmias (FA, Extrassístoles, Bradicardias, Taquicardias).

---

## 6. Ferramentas transversais

| Ferramenta | Arquivo | Especificação |
|---|---|---|
| **Início / Hub** | `HubPortalMain.tsx` | Portal de entrada com resumos e atalhos. |
| **Fichas de Orientação (A4)** | `HubPortalMain.tsx` | 5 fichas para pacientes, todas prontas para impressão: Guia de Dieta na DRC (`CKDPatientGuide`), Mapa & Diário de Glicemia (`MapaGlicemicoMain`), Diário de MRPA (`MrpaDiarioMain`), Plano de Ação e Técnica Inalatória na Asma (`AsmaPlanoAcaoMain`) e Cuidados com o Pé Diabético (`PeDiabeticoMain`). |
| **Pesquisa Global** | `SearchMain.tsx` | Busca fuzzy (Fuse.js) sobre o índice `SEARCH_DATA` (nome, especialidade e palavras-chave/sinônimos) mais os títulos de seção dos capítulos de Dermatologia; o resultado abre o módulo correspondente. |
| **Fichas de Fármacos** | `MedicamentosMain.tsx` + `data/medicamentosData.ts` | 26 fármacos (cardiovascular, infecciosas, endocrinologia, SNC/psiquiatria, analgesia/inflamação) com classe, nomes comerciais, indicações, ajustes renal/hepático, toxicidade/antídoto e alertas. Busca e filtros (sistema, "com antídoto", "ajuste renal"). Imprimível. |
| **Rastreador de Interações** | `RastreadorInteracoesMain.tsx` | Verificação de interações entre múltiplos fármacos. Imprimível. |
| **Extrator de Exames** | `ExtratorExamesMain.tsx` + `src/extrator/` | Lê PDFs de laudos **no navegador** (pdf.js; nada é enviado). Laboratório → uma linha com abreviações, unidades e data de coleta, ex.: `(22/05/26) Hb 15,1 g/dL \| Ht 45,0% \| …`. Imagem/métodos gráficos (TC, RX, USG, mamografia, densitometria, RM, eco, polissonografia) → `<exame> (<data>): <conclusão literal> <escores>` (BI-RADS, TI-RADS, FEVE, IAH, T-score…). Cada item aparece ao lado da linha original para o médico conferir, desmarcar ou editar antes de copiar. Coberto por testes vitest. |
| **Prescrevo** | `med_study-main/public/prescrevo.html` | Gerador de receitas standalone: busca → esquema → receita pronta. Base com 344 esquemas (272 Clínica, 28 Gineco, 24 Pediatria, 20 Injetáveis), abas *Receita*, *Minha base* (esquemas próprios) e *Cabeçalho* (dados do médico). Tema claro/escuro. Salva no `localStorage`. |

---

## 7. Catálogo de conteúdo por especialidade

Legenda: ✅ módulo disponível · 🚧 em desenvolvimento (tela placeholder)

### Pneumologia
| Tema | Status | Implementação |
|---|---|---|
| Asma (GINA 2024 – etapas, tracks AIR/SMART) | ✅ | Página dedicada em `App.tsx` + `AsmaClinicaDiagnostico.tsx` |
| Derrame Pleural | ✅ | Abas padrão (`Pleural*`) |
| Doenças Intersticiais | ✅ | `InterstitialMain.tsx` |
| DPOC (GOLD 2024) | ✅ | Abas padrão (`COPD*`) + Epidemiologia |
| Pneumonia (PAC, nosocomial, PAV) | ✅ | Abas padrão (`Pneumonia*`) |

### Cardiologia
| Tema | Status | Implementação |
|---|---|---|
| Arritmias (FA, extrassístoles, bradi, taqui) | ✅ | `Arritmias*.tsx` |
| Calculadora PREVENT™ (AHA 2024) | ✅ | `PreventCalculator.tsx` |
| Dislipidemias | ✅ | `DislipidemiaMain.tsx` + `components/dislipidemia/` (inclui calculadora de metas e casos clínicos) |
| Doenças Valvares | ✅ | Seletor de valvopatia, resumo e comparação (`Valvular*`) + fonocardiograma |
| Febre Reumática | ✅ | Abas padrão (`Rheumatic*`) |
| Hipertensão Arterial Sistêmica | ✅ | Abas padrão (`HAS*`) |
| Insuficiência Cardíaca | ✅ | Abas padrão (`IC*`) + IC Descompensada |
| Diário de MRPA (A4 editável) | ✅ | `MrpaDiarioMain.tsx` — dias (até 31) e leituras por período livres, médias sem o dia de adaptação, alerta ≥ 180/110, interpretação vs. PA de consultório |
| Síndrome Coronariana Crônica | ✅ | Abas padrão (`SCC*`) |

### Nefrologia
| Tema | Status | Implementação |
|---|---|---|
| Calculadora CKD-EPI 2021 | ✅ | `CKDEPICalculator.tsx` |
| Doença Renal Crônica (KDIGO) | ✅ | Abas padrão (`CKD*`) + Diálise + Epidemiologia |
| Guia de Dieta e Orientações (A4) | ✅ | `CKDPatientGuide.tsx` (imprimível) |
| Glomerulopatias | ✅ | `GlomerulopatiasMain.tsx` |

### Emergência
| Tema | Status | Implementação |
|---|---|---|
| Cetoacidose Diabética | ✅ | `EmergencyMain` → `DKAMain.tsx` (gasometria, delta-ratio) |
| Distúrbios Ácido-Base | ✅ | `AcidoBaseMain.tsx` |
| Distúrbios do Cálcio / Potássio / Sódio | ✅ | `CalcioMain`, `PotassioMain`, `SodioMain` |
| Hemorragia Digestiva Alta | ✅ | `HDAMain.tsx` |
| Hipoglicemia | ✅ | `EmergencyMain` → `HypoglycemiaMain.tsx` |
| Intoxicações Exógenas | ✅ | `EmergencyMain` → `IntoxicationsMain.tsx` |
| OVACE | ✅ | `EmergencyMain` → `AirwayObstructionMain.tsx` |
| Sepse e Choque Séptico | ✅ | `EmergencyMain` → `SepseMain.tsx` |
| Síndrome Coronariana Aguda | ✅ | `EmergencyMain` → `SCAMain.tsx` |
| Urgências Pediátricas (IVAS, laringite, faringite, otite, sinusite, pneumonia, asma/bronquiolite, cefaleia, TCE, diarreia, pele) | ✅ | `UrgenciasPediatricasMain.tsx` + `UrgPed*.tsx` |

### Ginecologia e Obstetrícia
| Tema | Status | Implementação |
|---|---|---|
| Alterações Benignas das Mamas | ✅ | `MamasBenignasMain.tsx` + `components/mamas_benignas/` |
| Amenorreia Primária / Secundária | ✅ | `AmenorreiaPrimariaMain`, `AmenorreiaSecundariaMain` |
| Câncer de Mama | ✅ | `MamasMalignasMain.tsx` + `components/mamas_malignas/` |
| Diabetes Gestacional (DMG) | ✅ | `DiabetesGestacionalMain.tsx` + `components/diabetes_gestacional/` |
| Distopias Genitais e Incontinência Urinária | ✅ | `DistopiasIncontinenciaMain.tsx` + `components/uroginecologia/` (Baden-Walker/POP-Q, caso interativo) |
| Endometriose | ✅ | `EndometrioseMain.tsx` + `components/endometriose/` |
| Exame de Imagem na Obstetrícia | ✅ | `ImagemObstetricaMain.tsx` + `components/imagem_obstetrica/` |
| Perimenopausa e Climatério | ✅ | `ClimaterioMain.tsx` (fluxograma de terapia hormonal) |
| Pré-Natal | ✅ | `PrenatalMain.tsx` |
| SHEG / Pré-eclâmpsia | ✅ | `PreEclampsiaMain.tsx` + `components/preeclampsia/` |
| Síndrome do Ovário Policístico | ✅ | `SOPMain.tsx` |
| TPP e Amniorrexe (RPM) | ✅ | `TPPAmniorrexeMain.tsx` + `components/tpp_amniorrexe/` |
| Anticoncepção | 🚧 | — |
| Saúde Sexual | 🚧 | — |
| Vaginose | 🚧 | — |

### Cirurgia Geral (`CirurgiaMain.tsx`)
✅ Apendicite Aguda · Colecistite e Vias Biliares (Tóquio 2018) · Doença Diverticular (Hinchey) · Hérnias da Parede Abdominal · Obstrução Intestinal · Pancreatite Aguda (Atlanta) · Pré e Pós-Operatório & Risco (ASA) · Queimaduras (Parkland / Regra dos 9) · Trauma & ATLS 10ª ed.

### Medicina Preventiva (`PreventivaMain.tsx`)
✅ Atenção Primária e ESF · Declaração de Óbito e Atestados · Epidemiologia e Indicadores · Estudos Epidemiológicos e Bioestatística · Medicina do Trabalho · Níveis de Prevenção e Rastreamento · SUS (Leis 8.080 e 8.142) · Vigilância e Notificação Compulsória

### Endocrinologia
✅ Mapa & Diário de Glicemia (A4, personalizável — `MapaGlicemicoMain.tsx`) · Diabetes Gestacional · Dislipidemias (atalhos para os módulos acima)

### Oncologia
| Tema | Status |
|---|---|
| Câncer de Mama | ✅ (mesmo módulo de GO) |
| Câncer de Cólon, Próstata, Pulmão; Neoplasia de Pele | 🚧 |

### Dermatologia (`DermatologiaMain.tsx`)
| Tema | Status | Implementação |
|---|---|---|
| Manual de Dermatologia — 19 capítulos (um item de menu por capítulo, numerado) | ✅ | `DermatologiaCapitulo.tsx` + `src/dermatologia/capitulos/*.json` (sob demanda) + imagens em `public/derm/` — tabelas, destaques, fluxos, zoom de figuras, termos do glossário ao toque, capítulo anterior/próximo |
| Glossário de Dermatologia | ✅ | `src/dermatologia/` |
| Pênfigo | ✅ | `PenfigoMain.tsx` (formato de abas; EADV/JAAD) |
| Psoríase | ✅ | `PsoriaseMain.tsx` (formato de abas; consenso brasileiro) |

Quizzes e simulados do manual original ficaram de fora de propósito. Conversor em `tools/dermatologia/`.

### Neurologia
🚧 Em breve.

---

## 8. Padrões de UI e design

- **Tokens de cor** definidos em `@theme` no `src/index.css` (`bg`, `card`, `ink`, `ink-muted`, `line`, `brand-*`, `bg-*`). Use sempre os tokens, nunca cores soltas para fundo/texto principal.
- **Componentes base:** classe `card` para blocos de conteúdo; badges e abas com ícones `lucide-react`.
- **Classes condicionais** com o helper `cn()` (`clsx` + `tailwind-merge`).
- **Animações** discretas com `motion/react` (`AnimatePresence` em trocas de aba).
- **Fontes:** Syne (títulos), DM Sans (texto), Space Mono (números/dados).
- **Impressão:** telas A4 usam `window.print()` e devem ter layout próprio para impressão (sem sidebars).
- **Responsividade:** layouts com `flex-col` em telas pequenas e `md:` / `lg:` para colunas.

---

## 9. Dados e persistência

- O conteúdo clínico é **estático**, escrito diretamente nos componentes `.tsx` ou em arquivos de dados (`data/medicamentosData.ts`, `ckdGuideData.ts`, `dermatologia/capitulos/*.json`).
- Os capítulos de Dermatologia e partes pesadas são carregados **sob demanda** (chunks separados). Se uma aba aberta antes de um deploy não encontrar um chunk antigo, o app recarrega uma vez; erros de renderização mostram uma tela de erro (`ErrorBoundary`) em vez de deixar o app em branco.
- O **Extrator de Exames** processa os PDFs apenas no navegador; nada é enviado a servidores.
- O app React **não persiste estado** (recarregar a página volta à tela inicial).
- O **Prescrevo** salva a base pessoal e o cabeçalho no `localStorage` (chave `rx:v2`) — os dados ficam apenas no navegador do usuário.
- Nenhum dado de paciente é enviado a servidores.

---

## 10. Entendimento de Pronto (Definition of Done)

Um módulo, tema ou alteração só é considerado **PRONTO** quando **todos** os critérios abaixo forem atendidos.

### 10.1 Conteúdo clínico
- [ ] Baseado em diretriz/fonte reconhecida e **atualizada**, com a referência citada no módulo (ex.: "GINA 2024", "KDIGO 2024", "ATLS 10ª ed.").
- [ ] Cobre, no mínimo: **definição/fisiopatologia**, **quadro clínico**, **diagnóstico/exames**, **classificação** (quando aplicável) e **tratamento/conduta**.
- [ ] Doses, unidades, valores de referência e pontos de corte revisados (nada de "a confirmar" ou texto de exemplo).
- [ ] Sem texto placeholder ("em desenvolvimento", "lorem ipsum", "Em breve") nas abas entregues.
- [ ] Escrito em português do Brasil, com terminologia médica padronizada.

### 10.2 Navegação e integração
- [ ] Tema cadastrado no catálogo `SPECIALTIES` (`App.tsx`) na especialidade correta (e nas demais especialidades relacionadas, se fizer sentido).
- [ ] Renderização ligada em `App.tsx` (componente `*Main` dedicado **ou** entrada em `DISEASE_CONFIGS` + componentes das abas). O tema **não** cai na tela "protocolo em desenvolvimento".
- [ ] Todas as abas abrem conteúdo real; nenhuma mostra "Conteúdo … em desenvolvimento".
- [ ] Entrada adicionada em `SEARCH_DATA` (`SearchMain.tsx`) com nome, especialidade e palavras-chave/sinônimos — o tema aparece na Pesquisa Global e o clique abre o módulo.
- [ ] Se houver material para paciente, a ficha está no Hub de Fichas de Orientação com `status: 'disponivel'`.

### 10.3 Interatividade (quando houver calculadora/simulador)
- [ ] Fórmula conferida com a fonte original e testada manualmente com pelo menos 2 casos de referência.
- [ ] Validação de entradas (campos vazios, valores fora da faixa fisiológica, unidades).
- [ ] Resultado exibido com unidade, interpretação e conduta sugerida.

### 10.4 Qualidade técnica
- [ ] `npm run lint` (`tsc --noEmit`) passa sem erros.
- [ ] `npm test` (vitest) passa — e lógica nova de cálculo/extração ganha testes.
- [ ] `npm run build` conclui sem erros.
- [ ] Sem erros ou warnings novos no console do navegador ao abrir e navegar pelo módulo.
- [ ] Código segue os padrões do projeto: TSX + Tailwind com tokens do tema, `cn()`, ícones `lucide-react`; módulos grandes divididos em `components/<tema>/`.
- [ ] Nenhuma dependência nova sem necessidade; se houver, `package.json` **e** `package-lock.json` atualizados juntos.

### 10.5 Experiência do usuário
- [ ] Legível no **modo escuro** (padrão do app), com contraste adequado.
- [ ] Funciona em desktop e em telas estreitas (celular/tablet) sem rolagem horizontal da página.
- [ ] Telas imprimíveis (A4) geram impressão limpa, em uma página quando previsto, sem barras laterais.
- [ ] Tabelas, fluxogramas e gráficos têm títulos e legendas claros.

### 10.6 Entrega
- [ ] Branch atualizada com a `main` antes do push (vários chats trabalham em paralelo).
- [ ] Revisado por outra pessoa (conteúdo médico e código).
- [ ] Commit com mensagem descritiva e push na branch de trabalho; PR aberto com descrição do que foi incluído.
- [ ] **Entrada adicionada no topo do [`HISTORICO.md`](HISTORICO.md)** no mesmo commit (o que mudou, decisões, pendências).
- [ ] Este README atualizado (catálogo da seção 7, status ✅/🚧 e pendências da seção 12).

---

## 11. Como adicionar um novo módulo

1. **Crie o componente** em `med_study-main/src/`:
   - Tema grande → `NomeTemaMain.tsx` + subcomponentes em `components/nome_tema/`.
   - Tema no formato padrão de abas → `XxxPatho.tsx`, `XxxClinical.tsx`, `XxxDiagnosis.tsx`, `XxxClassification.tsx`, `XxxTreatment.tsx`.
2. **Cadastre no catálogo** `SPECIALTIES` em `App.tsx` (`{ id: 'meu-tema', name: 'Meu Tema' }`).
3. **Ligue a renderização** em `App.tsx`:
   - `*Main`: adicione um ramo `selectedDisease === 'meu-tema' ? <MeuTemaMain /> : …`.
   - Abas padrão: adicione a entrada em `DISEASE_CONFIGS` e os ramos correspondentes em cada aba.
4. **Indexe na busca**: adicione o tema em `SEARCH_DATA` (`SearchMain.tsx`).
5. **Valide**: `npm run lint && npm test && npm run build` e navegue pelo módulo no `npm run dev`.
6. **Confira o [Entendimento de Pronto](#10-entendimento-de-pronto-definition-of-done)**, registre a mudança no `HISTORICO.md` e atualize este README.

---

## 12. Estado atual e pendências conhecidas

| # | Pendência | Impacto |
|---|---|---|
| 1 | Bundle principal ainda com ~4,6 MB (Vite alerta chunks > 500 kB). Dermatologia e o worker do pdf.js já são separados; avaliar `React.lazy`/`import()` para os demais módulos. | Desempenho no carregamento |
| 2 | Temas placeholder: Anticoncepção, Saúde Sexual, Vaginose, Câncer de Cólon/Próstata/Pulmão, Neoplasia de Pele e Neurologia. | Conteúdo |
| 3 | Configuração duplicada em `med_study-main/` (package.json, vite.config.ts, index.html) que não é usada pelo build raiz. | Manutenção |
| 4 | Rodapé ainda exibe "PneumoDash · GINA 2024" (herança da primeira versão focada em asma). | Identidade visual |
| 5 | Dependências e variáveis do template AI Studio não usadas (`@google/genai`, `express`, `dotenv`, `GEMINI_API_KEY`). | Limpeza |
| 6 | Testes automatizados só cobrem o Extrator; calculadoras (PREVENT, CKD-EPI, MRPA etc.) ainda sem testes. | Qualidade |
| 7 | Navegação sem URL (sem rotas): não é possível compartilhar link direto para um tema. | UX |

**Verificação no estado atual (2026-10-24):** `npm run lint` ✅ · `npm test` ✅ (52 testes) · `npm run build` ✅ (com aviso de tamanho de chunk) · `npm ci` ✅.

---

## 13. Aviso legal

O My Study é um material **educacional** de apoio ao estudo. Ele **não substitui** o julgamento clínico, a consulta às diretrizes oficiais completas nem a bula dos medicamentos. Doses e condutas devem sempre ser conferidas antes de qualquer uso na prática assistencial.
