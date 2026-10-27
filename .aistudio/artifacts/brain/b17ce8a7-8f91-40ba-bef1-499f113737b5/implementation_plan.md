# Implementação do Módulo de Neurologia Clínica & Urgências

## Visão Geral
Construção do módulo completo de Neurologia baseado no documento clínico `Capitulo_HSE_Epilepsia_EME_Eventos_Nao_Epilepticos_ae03f41b.pdf` (22 páginas).

## Componentes Desenvolvidos

1. **`NeuroHSE.tsx` (Encefalite Herpética)**
   - Fisiopatologia límbica (amígdala, hipocampo, ínsula) poupando estritamente núcleos da base.
   - Predisposição genética da via TLR3 (UNC-93B1, TRIF, TRAF3).
   - Achados anatomopatológicos: corpúsculos de inclusão intranucleares eosinofílicos de Cowdry A.
   - Regra de ouro: início empírico imediato de Aciclovir 10 mg/kg IV 8/8h antes de qualquer exame.
   - Falso-negativo de PCR em líquor (< 72h de início ou líquor hemorrágico).
   - **Atualização 2026**: Ensaio DexEnceph (*Lancet Neurol*, 2026) e metanálise Zhang et al. (2026) demonstrando ausência de benefício clínico de rotina para dexametasona adjuvante.
   - Encefalite autoimune pós-herpética anti-NMDAR (2 a 8 semanas pós-HSE, Armangue et al., 2018).

2. **`NeuroEpilepsia.tsx` (Epilepsia & Classificação ILAE 2025)**
   - Definições conceituais e operacionais (Fisher et al., 2014; ILAE 2025).
   - Crise provocada vs não-provocada (critérios cronológicos e metabólicos de Beghi et al., 2010).
   - **Nova Classificação ILAE 2025 (Beniczky et al., *Epilepsia* 2025)**: Estado de consciência como classificador primordial (percepção e responsividade), inclusão da mioclonia negativa e flexibilidade de descritores motores.
   - Semiologia de localização lobar (Temporal, Frontal, Parietal, Occipital, Insular).
   - Síndromes eletroclínicas fundamentais: Ausência da Infância, EMJ (Janz), Síndrome de Dravet (SCN1A), Síndrome de West (ACTH/Vigabatrina).
   - Tratamento baseado em ensaios: SANAD I e SANAD II (Lamotrigina vs Levetiracetam vs Valproato), critérios de farmacorresistência (Kwan & Brodie, 2010).

3. **`NeuroEME.tsx` (Estado de Mal Epiléptico)**
   - Definição operacional por tempos da ILAE (Trinka et al., 2015): $t_1 = 5$ min (início da morte neuronal/abertura do protocolo) e $t_2 = 30$ min (dano neuronal permanente).
   - Fisiopatologia da falha sináptica: internalização e fosforilação de receptores GABA-A via clatrina e superexpressão de receptores NMDA/AMPA.
   - Protocolo cronológico Glauser / ESETT:
     - 0–5 min: ABCDE, glicemia, monitorização, oxigênio.
     - 5–20 min: 1ª linha (Midazolam IM 10 mg ou Diazepam IV 10 mg ou Lorazepam IV 4 mg).
     - 20–40 min: 2ª linha (Levetiracetam 60 mg/kg até 4500 mg, Fosfenitoína/Fenitoína 20 mg/kg até 1500 mg, Valproato 40 mg/kg até 3000 mg).
     - > 40 min: 3ª linha (IOT, UTI, sedação anestésica contínua: Propofol, Midazolam, Ketamina com alvo em supressão de surtos).
   - NORSE e FIRES.

4. **`NeuroDiagnosticoDiferencial.tsx` (Crise vs Síncope & CNEP)**
   - O mito das mioclonias: estudo de Lempert et al. (*Lancet* 1994), onde 90% dos voluntários saudáveis em síncope apresentaram abalos motores.
   - Tabela comparativa minuciosa: Crise epiléptica vs Síncope Vasovagal vs Síncope Cardíaca.
   - Crises Funcionais / Dissociativas / CNEP: sinais discriminativos de Avbersek & Sisodiya (*Lancet Neurol* 2010) (olhos fechados com resistência ativa, empuxo pélvico, duração flutuante > 2 min, choro ictal), critérios da ILAE 2013 e ensaio CODES (*Lancet Psychiatry* 2020).
   - Cinética e critérios da Prolactina sérica (10–20 min pós-evento) e CK (24–48h).
   - Matriz diagnóstica para AIT, Enxaqueca com aura, Amnésia Global Transitória, Parassonias NREM, Discinesia Cinesiogênica Paroxística (PRRT2) e Cataplexia.

5. **`NeuroCalculadoras.tsx` (Suíte de Ferramentas Interativas)**
   - Escore de Calgary para diferenciação Síncope vs Crise (Sheldon et al., 2002).
   - Escore STESS para prognóstico e risco de mortalidade no Estado de Mal Epiléptico (Rossetti et al.).
   - Calculadora de Doses do EME por Peso Corporal (Glauser 2016 / ESETT).
   - Calculadora de Infusão de Aciclovir IV com ajuste fino por Clearance de Creatinina (Cockcroft-Gault).

6. **Integração no Sistema**
   - Registrado na barra de especialidades sob `Neurologia` (`src/App.tsx`).
   - Acesso a tópicos diretos e deep-linking.
   - Indexado para busca global com termos e sinônimos no Fuse.js (`src/SearchMain.tsx`).
   - Botão para visualização e consulta do arquivo PDF fonte anexado.
