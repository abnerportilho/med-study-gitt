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

6. **`NeuroSemiologia.tsx` (Semiologia Neurológica Sistematizada - UNIP / Tratado ABN)**
   - **Raciocínio Anátomo-Clínico & Síndromes Motoras:** Tríade diagnóstica fundamental (*Quando? Onde? O que?*); Comparativo exaustivo NMS (1º neurônio / central) vs NMI (2º neurônio / periférico); Escala MRC de força muscular (0 a 5 com degraus de gravidade e resistência); Tabela de miótomos radiculares de C5 a S1.
   - **Déficit Motor Sutil (DMS):** Pronator Drift (Strümpell), Mingazzini, Barré (MMII e mãos), Manobra de Raimiste, Sinal do 5º dedo (Digiti Quinti), Rolamento de antebraços/dedos, Manobra de Souques e Queda em abdução do MI (essencial no paciente em coma).
   - **Tônus Muscular & Padrões Semióticos de Marcha:** Hipertonia elástica / espástica (canivete, velocidade-dependente) vs plástica / rigidez (cano de chumbo / roda denteada, velocidade-independente, manobra de Froment); Paratonia (*Gegenhalten*); Teste de Romberg (sensitivo verdadeiro vs vestibular vs "falso Romberg cerebelar"), Fukuda e Babinski-Weil em estrela; 8 padrões de marcha (ceifante, tesoura, talonante, ebriosa, anserina, escarvante, parkinsoniana e funcional/conversiva).
   - **Coordenação (Taxia) & Cerebelo:** Divisão em Arquicerebelo (vestibulocerebelo), Paleocerebelo (espinocerebelo) e Neocerebelo (pontocerebelo); Testes dedo-nariz, calcanhar-joelho, disdiadococinesia (marionetes), rebote de Stewart-Holmes, assinergia de Babinski, copinho de André-Thomas e disartria escandida.
   - **Reflexos & Sensibilidade:** Graduação miotática 0 a 4+ e manobra de Jendrassik; Mapeamento radicular bicipital (C5-C6), braquiorradial (C5-C6), tricipital (C7), patelar (L3-L4), aquileu (S1-S2) e mandibular (V3); Sinal de Babinski clássico e manobras sucedâneas (Chaddock, Oppenheim, Gordon, Schaeffer, Hoffmann, Trömner); Sensibilidade espinotalâmica vs cordonal posterior; Mapa de dermátomos-chave e Síndrome de Brown-Séquard.
   - **Pares Cranianos (I ao XII) & Síndromes de Tronco:** Exame sistematizado dos 12 pares; Mapa dos 9 defeitos de campo visual por confrontação; Síndromes pupilares (Marcus Gunn, Horner, Adie, Argyll-Robertson); Diferenciação clínica paralisia facial central vs periférica; Rinne e Weber; Pares bulbares e desvio de língua/úvula; Síndromes alternas de Weber, Millard-Gubler e Wallenberg.
   - **Cognição & Afasias:** Baterias de cabeceira (MEEM, MoCA e FAB); Algoritmo rápido de 3 perguntas para diagnóstico diferencial de afasias (Fluência, Compreensão, Repetição: Broca, Wernicke, Condução, Global e Transcorticais).
   - **Checklist Prático:** Roteiro sequencial guiado em 7 etapas para o exame neurológico de cabeceira.

7. **Integração no Sistema**
   - Registrado na barra de especialidades sob `Neurologia` (`src/App.tsx`).
   - Acesso a tópicos diretos e deep-linking.
   - Indexado para navegação e renderização direta com design refinado em tema escuro.
