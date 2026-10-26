# Reestruturação do Módulo de Dermatologia Clínica & Interativa

Reestruturação completa da seção de Dermatologia da plataforma médica, substituindo a visualização anterior de capítulos brutos de texto por uma suíte clínica interativa baseada em grandes síndromes dermatológicas, com calculadoras de gravidade (PASI, BSA, SCORAD), atlas de lesões elementares, fluxogramas terapêuticos baseados nas diretrizes da SBD e guia prático de prescrição.

---

## Decisões Confirmadas pelo Usuário (Fase 1)

> [!IMPORTANT]
> As decisões abaixo foram confirmadas diretamente pelo usuário na etapa de alinhamento e orientam a arquitetura desta implementação:

- **Estrutura de Navegação**: Navegação centrada em **Grandes Síndromes Dermatológicas** (Eritematodescamativas, Eczemas & Alergias, Doenças Bolhosas, Infecciosas & Parasitárias, Neoplasias Cutâneas & Lesões Pigmentadas, Anexos & Acne/Rosácea, Farmacodermias & Urgências).
- **Tratamento do Conteúdo Prévio**: O conteúdo dos 19 capítulos e tópicos dispersos será sintetizado e reestruturado em **tópicos clínicos objetivos**, com foco em condutas práticas de alta densidade para pronto-atendimento, ambulatório e provas de Residência Médica (R1/Revalida/TED).
- **Ferramentas Interativas Priorizadas**:
  1. **Calculadoras de Gravidade**: PASI (Psoriasis Area Severity Index), BSA (Body Surface Area) e SCORAD (Scoring Atopic Dermatitis), além de calculadora de dose acumulada de Isotretinoína (120–150 mg/kg).
  2. **Algoritmos & Fluxogramas Terapêuticos da SBD**: Escalonamento passo a passo (tópicos, fototerapia, imunossupressores orais, imunobiológicos anti-TNF, anti-IL-17, anti-IL-23).
  3. **Atlas Semiologia & Lesões Elementares**: Máculas, pápulas, placas, bolhas, pústulas, escamas, liquenificação, atrofia com matriz de diagnóstico diferencial imediato.
  4. **Guia Prático de Prescrição**: Tabela de classes de potência de corticoides tópicos (Classe I superpotente a Classe VII baixa potência), equivalência em gramas (FTU - Fingertip Unit), regras de desmame e protocolos de segurança pré-imunobiológicos (rastreio de TB latente, hepatites).

---

## 1. Visão Geral & Conceito

### O Que a Aplicação Fará
O módulo de Dermatologia passará do modelo de leitor passivo de manual para o **padrão de protocolo clínico interativo** presente nos módulos de referência da plataforma (`EndometrioseMain`, `CirurgiaMain`, `PreEclampsiaMain`, `DislipidemiaMain`). O médico ou estudante poderá alternar rapidamente entre as 7 grandes síndromes dermatológicas ou acessar ferramentas interativas de suporte à decisão clínica em tempo real.

### Público-Alvo
- Médicos generalistas, residentes (R1 Clínica Médica, MFC, Cirurgia, Dermatologia) e estudantes de Medicina que precisam de condutas rápidas, critérios diagnósticos e regras de prescrição seguras.
- Profissionais em ambulatório que necessitam quantificar índices de gravidade para preenchimento de LME (Laudo de Solicitação de Medicamentos Especializados / SUS) de imunobiológicos e retinoides.

### Valor Agregado
- Fim da navegação desordenada por capítulos numéricos extensos no menu principal.
- Automatização imediata de cálculos clínicos complexos (PASI, SCORAD, BSA, FTU).
- Clareza visual e condutas farmacológicas prescritivas com posologias, apresentações e efeitos adversos.

---

## 2. Experiência do Usuário & Design Visual

### Identidade Visual & Tema
- **Paleta de Cores**: Base no tema escuro premium da plataforma (`#0f172a` slate-950/slate-900), com realces de calibração clínica:
  - Síndromes Eritematodescamativas / Psoríase: Realce Âmbar / Coral (`amber-500` / `orange-400`).
  - Eczemas e Alergias: Realce Ciano / Celeste (`cyan-400` / `sky-400`).
  - Farmacodermias & Urgências: Realce Vermelho / Rosa Alerta (`rose-500` / `red-400`).
  - Infecciosas & Parasitárias: Realce Esmeralda (`emerald-400`).
  - Neoplasias & Melanoma: Realce Roxo / Índigo (`purple-400` / `indigo-400`).
  - Acne, Rosácea & Alopecias: Realce Azul Real (`blue-400`).
- **Disciplina Anti-Slop**:
  - Metadados sem cápsulas decorativas repetitivas; uso de tipografia limpa com separadores sutis (`·`, `/`).
  - Ausência de pontinhos verdes pulsantes ou números arbitrários sem fundamento clínico.
  - Alinhamento de valores com números tabulares (`font-mono tabular-nums`).
  - Tabelas de doses e condutas com contraste adequado e tipografia legível.

### Fluxos Principais do Usuário
1. **Navegação Superior por Síndromes**: Barra horizontal no topo com ícones distintos e badges com número de patologias para alternar instantaneamente entre as 7 síndromes clínicas e as ferramentas globais.
2. **Abas Internas por Patologia**: Dentro de cada síndrome, abas de trabalho organizadas de forma uniforme:
   - *1. Fisiopatologia & Definição*: Imunologia celular, gatilhos e histopatologia chave.
   - *2. Semiologia & Lesões Típicas*: Morfologia elementar, sinal de Nikolsky, Auspitz, Koebner, distribuição corporal.
   - *3. Diagnóstico & Critérios*: Critérios da SBD, biópsia, dermatoscopia e diagnósticos diferenciais.
   - *4. Calculadora / Escore Clínico*: Ferramenta dinâmica no local (ex: PASI na psoríase, SCORAD na DA, escore de gravidade SCORTEN na NET).
   - *5. Tratamento & Prescrição*: Protocolo de 1ª, 2ª e 3ª linhas, doses por kg, corticoides tópicos por FTU, imunobiológicos e critérios SUS.
   - *6. Casos Clínicos & Pérolas de Prova*: Casos interativos com conduta justificada.
3. **Hub de Ferramentas Rápidas**: Acesso direto via aba fixa ou atalho no cabeçalho:
   - Calculadora de PASI com mapa corporal interativo (cabeça 10%, membros sup. 20%, tronco 30%, membros inf. 40%).
   - Calculadora de SCORAD (intensidade + extensão + prurido/sono).
   - Guia de Corticoides Tópicos com filtro por classe de potência e veículo (pomada, creme, loção).
   - Calculadora de Fingertip Unit (FTU) para saber quantos gramas de pomada prescrever para o tempo de tratamento.

---

## 3. Decisões de Produto & Arquitetura

### Decisão 1: Simplificação do Menu Lateral no `App.tsx`
- **Abordagem**: Em vez de injetar dezenas de itens no menu (19 capítulos + 20 doenças soltas), o `App.tsx` registrará a especialidade de Dermatologia de forma limpa, com as principais síndromes e calculadoras como tópicos selecionáveis, além de redirecionamento transparente caso algum link legado seja acessado.
- **Vantagem**: Reduz o ruído visual de navegação em mais de 70%, mantendo a compatibilidade e permitindo busca rápida no `SearchMain`.

### Decisão 2: Arquitetura Modular de Componentes
- **Abordagem**: Separar o código em componentes específicos em `src/components/dermatologia/`:
  - `DermSindromeEritemato.tsx` (Psoríase, Líquen Plano, Pitiríase Rósea, Dermatite Seborreica).
  - `DermSindromeEczemas.tsx` (Dermatite Atópica, Dermatite de Contato por Irritante e Alérgica, Eczema Numular, Estase).
  - `DermSindromeBolhosas.tsx` (Pênfigo Vulgar, Pênfigo Foliáceo, Penfigoide Bolhoso, Dermatite Herpetiforme).
  - `DermSindromeInfecciosas.tsx` (Bacterianas [Impetigo, Erisipela, Celulite], Micóticas [Tineas, Ptiríase Versicolor], Virais [Herpes, HPV, Zoster], Parasitárias [Escabiose, Larva Migrans]).
  - `DermSindromeNeoplasias.tsx` (CBC, CEC, Melanoma [Regra ABCDE, Breslow/Clark], Ceratoses Actínicas).
  - `DermSindromeAcneAlopecias.tsx` (Acne vulgar graus I a V, Rosácea, Hidradenite Supurativa, Alopecia Androgenética e Areata).
  - `DermSindromeFarmacodermias.tsx` (Exantema maculopapular, DRESS, PEGA, Stevens-Johnson e NET com escore SCORTEN).
  - `DermCalculadoras.tsx` (PASI, SCORAD, BSA, Dose Acumulada de Isotretinoína, FTU).
  - `DermAtlasLesoes.tsx` (Semiologia morfológica e lesões primárias/secundárias).
  - `DermGuiaCorticoides.tsx` (Classificação de potências, regras de segurança, cálculo de gramas por FTU).

---

## 4. Diagrama de Arquitetura Técnica

```
┌───────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                     │
│     Especialidade: Dermatologia (Navegação & Deep-Links Integrados)       │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         DermatologiaMain.tsx                              │
│   • Cabeçalho Clínico (Diretrizes SBD / Sociedade Brasileira de Dermato)   │
│   • Barra de Síndromes & Ferramentas (7 Grandes Síndromes + Calculadoras) │
└───────┬───────────────────────────────────────────────────────────┬───────┘
        │                                                           │
        ▼                                                           ▼
┌──────────────────────────────────────────┐    ┌──────────────────────────────────────────┐
│         Síndromes Clínicas               │    │         Ferramentas Interativas          │
├──────────────────────────────────────────┤    ├──────────────────────────────────────────┤
│ • DermSindromeEritemato (Psoríase/Líquen)│    │ • DermCalculadoras (PASI, SCORAD, BSA,   │
│ • DermSindromeEczemas (Atópica/Contato)  │    │   Isotretinoína acumulada 120-150 mg/kg) │
│ • DermSindromeBolhosas (Pênfigos/PB)     │    │ • DermAtlasLesoes (Semiologia Elementar, │
│ • DermSindromeInfecciosas (Bact/Mico/Vir)│    │   Sinais de Nikolsky, Auspitz, Koebner)  │
│ • DermSindromeNeoplasias (CBC, CEC, Mel) │    │ • DermGuiaCorticoides (Potências I a VII,│
│ • DermSindromeAcneAlopecias (Acne/Rosác) │    │   Veículos, Calculadora FTU em gramas)   │
│ • DermSindromeFarmacodermias (NET/DRESS) │    │ • Algoritmos SBD de Imunobiológicos      │
└──────────────────────────────────────────┘    └──────────────────────────────────────────┘
```

---

## 5. Plano de Execução em Etapas

1. **Etapa 1 - Criação dos Módulos Especializados de Síndromes & Ferramentas**:
   - Desenvolver `src/components/dermatologia/DermCalculadoras.tsx` com lógica precisa para PASI, SCORAD, BSA e Isotretinoína.
   - Desenvolver `src/components/dermatologia/DermAtlasLesoes.tsx` com catálogo semiológico interativo das lesões elementares.
   - Desenvolver `src/components/dermatologia/DermGuiaCorticoides.tsx` com tabela de classes de potência e calculadora de FTU.
   - Desenvolver os componentes de síndromes clínicas (`DermSindromeEritemato.tsx`, `DermSindromeEczemas.tsx`, `DermSindromeBolhosas.tsx`, `DermSindromeNeoplasias.tsx`, `DermSindromeInfecciosas.tsx`, `DermSindromeAcneAlopecias.tsx`, `DermSindromeFarmacodermias.tsx`), integrando os dados clínicos ricos e mantendo o material didático já validado.
2. **Etapa 2 - Criação do Novo `DermatologiaMain.tsx`**:
   - Implementar a página principal com abas de grandes síndromes e ferramentas no mesmo padrão de excelência de `EndometrioseMain.tsx` e `CirurgiaMain.tsx`.
3. **Etapa 3 - Atualização do Catálogo de Tópicos em `App.tsx` & `SearchMain.tsx`**:
   - Ajustar o array de `diseases` de Dermatologia em `App.tsx` para apresentar as grandes síndromes e calculadoras, preservando retrocompatibilidade para que qualquer busca ou link direto para "psoriase", "penfigo", etc. abra perfeitamente a síndrome correta.
4. **Etapa 4 - Verificação & Compilação**:
   - Executar `lint_applet` e `compile_applet` para garantir ausência de erros de tipagem e integridade da compilação.
