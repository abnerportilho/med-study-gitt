import React, { useState } from 'react';
import { 
  Baby, Clock, AlertTriangle, ShieldAlert, CheckCircle2, 
  ArrowRight, Activity, HelpCircle, Layers, Eye, Brain, Heart,
  SplitSquareVertical, Sparkles, Scale, Info
} from 'lucide-react';

export default function USGGeralTrimesters() {
  const [subTab, setSubTab] = useState<'geral' | 'tri1' | 'tri2' | 'tri3'>('geral');
  const [ectopicaStep, setEctopicaStep] = useState<number>(1);
  const [dumDiffDays, setDumDiffDays] = useState<number>(6);

  return (
    <div className="space-y-6">
      {/* SELETOR DE SUB-SEÇÃO DENTRO DE ULTRASSONOGRAFIA */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('geral')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'geral' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Princípios Gerais & As 4 Perguntas
        </button>
        <button
          onClick={() => setSubTab('tri1')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'tri1' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          2. 1º Trimestre (Datação, Inviabilidade, Ectópica & Mola)
        </button>
        <button
          onClick={() => setSubTab('tri2')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'tri2' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          3. 2º Trimestre (Morfológico, Biometria & Colo Uterino)
        </button>
        <button
          onClick={() => setSubTab('tri3')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'tri3' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          4. 3º Trimestre (Crescimento, Placenta & Acretismo)
        </button>
      </div>

      {/* 1. PRINCÍPIOS GERAIS */}
      {subTab === 'geral' && (
        <div className="space-y-6">
          {/* Card Conceito: Imagem não substitui o raciocínio */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
                <Eye size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
                  Fundamento Clínico
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                  Imagem Não Substitui o Raciocínio — Ela o Direciona
                </h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              A ultrassonografia obstétrica não é um procedimento meramente contemplativo; cada solicitação deve responder a uma <strong>pergunta clínica clara</strong>. A idade gestacional modifica profundamente o que é esperado ver. Um achado isolado raramente responde tudo: sintomas, exame físico e &beta;-hCG transformam a interpretação.
            </p>
            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/80 text-xs text-cyan-200 font-semibold">
              <strong>Pergunta-chave à beira do leito:</strong> Este achado confirma, sugere ou apenas não exclui a hipótese diagnóstica?
            </div>
          </div>

          {/* Comparação: Transabdominal vs Transvaginal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="font-bold text-cyan-400 text-sm block border-b border-slate-800 pb-2">
                Ultrassom Transabdominal
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Campo de visão amplo:</strong> Permite avaliar o útero como um todo, estática fetal e localização placentária no 2º e 3º trimestres.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Janela Acústica:</strong> Bexiga confortavelmente cheia é essencial quando realizado no início da gestação para empurrar as alças intestinais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Limitação:</strong> Menor resolução de alta frequência para detalhes milimétricos no início (&lt; 7-8 semanas).</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="font-bold text-rose-400 text-sm block border-b border-slate-800 pb-2">
                Ultrassom Transvaginal (USTV)
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Maior resolução no início:</strong> Proximidade das estruturas com transdutores de 5 a 9 MHz permite identificar o saco com 4,5-5 semanas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Avaliação de anexos e colo:</strong> Padrão-ouro para suspeita de gravidez ectópica e cervicometria (colo uterino).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Preparo:</strong> Exige bexiga rigorosamente <strong>vazia</strong> para não alongar artificialmente o canal cervical.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* O Roteiro das 4 Perguntas Iniciais */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <h4 className="text-sm font-black uppercase text-indigo-400 tracking-wider">
              O Raciocínio Clínico Estruturante: Toda Interpretação Começa com 4 Perguntas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-2xl font-black text-cyan-400 font-mono">1</div>
                <div className="font-bold text-white text-sm">Onde?</div>
                <p className="text-slate-400">Localização anatômica da gestação (tópica vs ectópica) e inserção placentária.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-2xl font-black text-cyan-400 font-mono">2</div>
                <div className="font-bold text-white text-sm">Quando?</div>
                <p className="text-slate-400">Idade gestacional definitiva e datação cronológica fidedigna (CCN/DUM).</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-2xl font-black text-cyan-400 font-mono">3</div>
                <div className="font-bold text-white text-sm">Está bem?</div>
                <p className="text-slate-400">Vitalidade embrionária/fetal, anatomia de sistemas e velocidade de crescimento.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-2xl font-black text-cyan-400 font-mono">4</div>
                <div className="font-bold text-white text-sm">O que muda?</div>
                <p className="text-slate-400">Definição do plano de ação: seguimento rotineiro, complementação diagnóstica ou urgência.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRIMEIRO TRIMESTRE */}
      {subTab === 'tri1' && (
        <div className="space-y-6">
          {/* Cronologia Previsível das Estruturas */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
              <Clock size={20} />
              <h4 className="text-sm font-black uppercase tracking-wider">
                Sequência Cronológica Previsível das Estruturas no 1º Trimestre (USTV)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">4,5 a 5 semanas</span>
                <div className="font-bold text-white text-sm">1. Saco Gestacional</div>
                <p className="text-slate-400">Primeiro marcador de localização intrauterina. Halo ecogênico trofoblástico (sinal da dupla decídua).</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 font-bold">5 a 5,5 semanas</span>
                <div className="font-bold text-white text-sm">2. Saco Vitelino (VV)</div>
                <p className="text-slate-400">Confirma sem dúvidas a gravidez intrauterina verdadeira (afasta pseudossaco de ectópica). Diâmetro normal: 3 a 6 mm.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-indigo-400 font-bold">6 semanas</span>
                <div className="font-bold text-white text-sm">3. Embrião</div>
                <p className="text-slate-400">Visualizado adjacente ao saco vitelino. Medir o Comprimento Cabeça-Nádega (CCN) para datação exata.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-rose-400 font-bold">6 a 6,5 semanas</span>
                <div className="font-bold text-white text-sm">4. Atividade Cardíaca</div>
                <p className="text-slate-400">Documenta a viabilidade. Batimentos visíveis em tempo real (Modo M ou Doppler espectral breve).</p>
              </div>
            </div>
          </div>

          {/* Inviabilidade Exige Critérios Conservadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900 border-2 border-rose-900/80 space-y-3">
              <span className="font-bold text-rose-400 text-sm block border-b border-slate-800 pb-2">
                Critérios Definitivos de Inviabilidade (Abortamento)
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-2.5 rounded-xl bg-slate-950 border border-rose-800/40">
                  <strong>CCN &ge; 7 mm sem atividade cardíaca:</strong> Diagnóstico definitivo de óbito embrionário.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-950 border border-rose-800/40">
                  <strong>Diâmetro Médio do Saco (DMS) &ge; 25 mm sem embrião:</strong> Diagnóstico definitivo de gestação anembrionada.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-amber-800/70 space-y-3">
              <span className="font-bold text-amber-400 text-sm block border-b border-slate-800 pb-2">
                Quando Há Dúvida: Exame Precoce Não é Sinônimo de Patológico
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gestante com 5 semanas pela DUM apresentando saco gestacional sem embrião ou CCN &lt; 7 mm sem BCF: <strong>não concluir por inviabilidade em exame limítrofe!</strong>
              </p>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800 text-xs text-amber-200 space-y-1">
                <div><strong>Conduta:</strong> Repetir o ultrassom em <strong>7 a 10-14 dias</strong> e correlacionar com a evolução clínica e curvas de &beta;-hCG quantitativo.</div>
              </div>
            </div>
          </div>

          {/* Datação pelo CCN */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Scale size={18} />
              <span>O Comprimento Cabeça-Nádega (CCN) é a Melhor Medida para Datar</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deve ser medido em plano sagital estrito, com o embrião em posição neutra (sem hiperextensão ou flexão forçada). Se houver discrepância &gt; 5 dias em relação à DUM no 1º trimestre precoce, <strong>redata-se a gestação pelo USG</strong>. Uma vez estabelecida a datação confiável no 1º trimestre, os exames posteriores avaliam apenas o crescimento — <strong>NUNCA mais redatar no 2º ou 3º trimestre!</strong>
            </p>
          </div>

          {/* GRAVIDEZ ECTÓPICA & FLUXOGRAMA COMPLETO DOS SLIDES */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-900/80 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <AlertTriangle size={20} />
                <span>Gravidez Ectópica: Associação entre Imagem, Quadro Clínico e &beta;-hCG</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Fluxograma dos Slides</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block">Sinais que Aumentam a Probabilidade</span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li>Útero com cavidade vazia e endométrio espessado (reação decidual).</li>
                  <li>Massa anexial complexa separada do ovário.</li>
                  <li>Líquido livre no fundo de saco de Douglas com ecos internos (hemoperitônio).</li>
                  <li>&beta;-hCG sérico com elevação subótima (subindo &lt; 49-50% em 48 horas).</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 block">Achados que Confirmam a Ectópica</span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li><strong>Presença de vesícula vitelínica ou embrião extrauterino.</strong></li>
                  <li><strong>Atividade cardíaca embrionária fora do útero</strong> (em trompa, corno ou anexo).</li>
                  <li>Anel tubário espesso (*bagel sign*) com fluxo periférico em "anel de fogo".</li>
                  <li>Cavidade uterina vazia com <strong>&beta;-hCG &ge; 3.500 mUI/mL</strong> (zona de discriminação).</li>
                </ul>
              </div>
            </div>

            {/* Conduta Clínica e Farmacológica */}
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 text-xs text-slate-200 space-y-2">
              <div className="font-bold text-rose-300">Tratamento Medicamentoso com Metotrexato (MTX 50 mg/m² IM):</div>
              <p className="leading-relaxed">
                Indicado em gravidez tubária íntegra, paciente hemodinamicamente estável, com <strong>massa anexial &le; 3,5 cm</strong>, <strong>&beta;-hCG &le; 5.000 mUI/mL</strong> e <strong>ausência de embrião com batimento cardíaco</strong>. Se massa &gt; 3,5-5 cm, embrião vivo ou dor intensa &rarr; tratamento cirúrgico (laparoscopia / salpingectomia).
              </p>
            </div>
          </div>

          {/* MOLA HIDATIFORME (DOENÇA TROFOBLÁSTICA GESTACIONAL) */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Sparkles size={18} />
              <span>Mola Completa: A Placenta Substitui a Gestação Normal</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Caracterizada por <strong>massa intrauterina heterogênea com múltiplos pequenos espaços císticos anecoicos</strong> (aspecto clássico em <em>"flocos de neve"</em> ou <em>"cachos de uva"</em>), com <strong>ausência completa de embrião</strong> na mola completa. Valores de &beta;-hCG frequentemente astronômicos (&gt; 100.000 mUI/mL).
            </p>
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800 text-[11px] text-purple-200">
              <strong>Mensagem dos slides:</strong> Na doença trofoblástica, a imagem inicia — mas não encerra — a investigação. Exige seguimento semanal com &beta;-hCG quantitativo até negativação e rastreio de neoplasia trofoblástica.
            </div>
          </div>
        </div>
      )}

      {/* 3. SEGUNDO TRIMESTRE */}
      {subTab === 'tri2' && (
        <div className="space-y-6">
          {/* As 4 Perguntas do Morfológico do 2º Trimestre */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h4 className="text-sm font-black uppercase text-indigo-400 tracking-wider">
              O Morfológico do 2º Trimestre (20 a 24 Semanas) Responde Quatro Perguntas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-300">1. Anatomia Fetal</span>
                <p className="text-slate-400">Todos os órgãos e segmentos estão adequadamente visualizados e íntegros?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-300">2. Biometria Fetal</span>
                <p className="text-slate-400">DBP, CC, CA e CF estão harmoniosos e compatíveis com a idade gestacional?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-300">3. Anexos Fetais</span>
                <p className="text-slate-400">Placenta, cordão umbilical (3 vasos) e volume de líquido amniótico estão normais?</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-300">4. Colo Uterino</span>
                <p className="text-slate-400">A cervicometria transvaginal sugere risco iminente de parto prematuro espontâneo?</p>
              </div>
            </div>
          </div>

          {/* Biometria Fetal Padronizada */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="font-bold text-white text-sm block border-b border-slate-800 pb-2">
              Biometria Fetal só é Útil Quando o Plano de Medida Está Rigorosamente Correto
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">DBP e CC (Craniano)</div>
                <p className="text-slate-400">Plano axial transtalâmico simétrico exibindo cavo do septo pelúcido e tálamos, sem cerebelo visível.</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400">CA (Circunferência Abdominal)</div>
                <p className="text-slate-400">Corte perfeitamente circular no nível da veia umbilical em "J" no fígado e bolha gástrica, sem rins visíveis.</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-400">CF (Comprimento do Fêmur)</div>
                <p className="text-slate-400">Diáfise óssea femoral em plano horizontal perpendicular ao feixe, excluindo as epífises cartilaginosas.</p>
              </div>
            </div>
          </div>

          {/* Marcador vs Malformação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 block text-sm">Marcador Isolado (*Soft Marker*)</span>
              <p className="text-slate-300 leading-relaxed">
                Exemplos: foco hiperecogênico intracardíaco (*golf ball*), cisto de plexo coroide, ectasia piélica leve (4-5 mm).
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <strong>Conduta dos slides:</strong> Modifica probabilidade matemática, <strong>não confirma diagnóstico</strong>. Reavaliar o rastreamento prévio de 1º tri e <strong>evitar alarmismo</strong> desnecessário na paciente.
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-rose-800/80 space-y-2">
              <span className="font-bold text-rose-400 block text-sm">Anomalia Estrutural Maior</span>
              <p className="text-slate-300 leading-relaxed">
                Exemplos: defeito septal atrioventricular, holoprosencefalia, espinha bífida aberta (sinal do limão e da banana), gastrosquise.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-rose-800/60 text-slate-200">
                <strong>Conduta dos slides:</strong> Exige avaliação dirigida com especialista em medicina fetal, ecocardiograma fetal e cariótipo/genética, além de <strong>planejamento do local e momento oportuno do parto</strong>.
              </div>
            </div>
          </div>

          {/* Cervicometria Transvaginal */}
          <div className="p-5 rounded-3xl bg-slate-900 border-2 border-indigo-500/70 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <ShieldAlert size={18} />
              <span>O Colo Uterino Deve ser Medido por Via Transvaginal (20 a 24 semanas)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A via transvaginal é obrigatória. Condições técnicas cruciais: <strong>bexiga vazia</strong> (a bexiga cheia simula um colo longo falso), transdutor sem pressão excessiva sobre o colo (evitar mascarar afunilamento) e caliper medindo o canal endocervical fechado.
            </p>
            <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-800 text-xs text-indigo-200">
              <strong>Definição de Colo Curto:</strong> Comprimento <strong>&le; 25 mm antes de 24 semanas</strong> &rarr; indicação imediata de <strong>Progesterona Micronizada 200 mg/dia via vaginal ao deitar</strong> para prevenção de prematuridade espontânea.
            </div>
          </div>
        </div>
      )}

      {/* 4. TERCEIRO TRIMESTRE */}
      {subTab === 'tri3' && (
        <div className="space-y-6">
          {/* Introdução do 3º Trimestre */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
              No 3º Trimestre, a Pergunta Clínica Define a Profundidade do Exame
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Objetivos estruturados: confirmar apresentação e situação fetal, avaliar o ganho ponderal (PFE), verificar a localização da placenta em relação ao colo, quantificar o volume do líquido amniótico e <strong>acrescentar o Doppler quando houver suspeita clínica de hipóxia ou insuficiência placentária</strong>.
            </p>
          </div>

          {/* Peso Estimado é Aproximação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 block text-sm">Um Único Exame</span>
              <p className="text-slate-300 leading-relaxed">
                Possui margem de erro biológica intrínseca de até &plusmn; 10 a 15% em relação ao peso de nascimento real. O percentil isolado depende da curva de crescimento utilizada (Hadlock vs Intergrowth).
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 block text-sm">Exames Seriados (A Tendência Importa Mais)</span>
              <p className="text-slate-300 leading-relaxed">
                Avaliam a real <strong>velocidade de crescimento fetal</strong>. Exigem intervalo mínimo de 2 a 3 semanas entre as biometrias. Acompanham a curva longitudinal e ajudam a diferenciar o <strong>pequeno constitucional do feto em Restrição de Crescimento (RCF)</strong>.
              </p>
            </div>
          </div>

          {/* Placenta Baixa e Acretismo dos Slides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 block text-sm">Placenta Baixa Deve ser Confirmada por Via Transvaginal</span>
              <p className="text-slate-300 leading-relaxed">
                Medir com precisão milimétrica a distância da borda inferior da placenta até o orifício interno do colo (OIC). Evitar diagnóstico definitivo de placenta prévia baseado apenas no exame transabdominal antes do 3º trimestre devido ao fenômeno da migração placentária. Sangramento vaginal exige avaliação clínica imediata.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border-2 border-rose-900/70 space-y-2">
              <span className="font-bold text-rose-400 block text-sm">Acretismo: Reconhecer Sinais Permite Planejar Antes da Hemorragia</span>
              <p className="text-slate-300 leading-relaxed">
                Sinais ecográficos fundamentais:
              </p>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong>Lacunas placentárias irregulares</strong> com fluxo turbilhonar.</li>
                <li><strong>Perda da zona clara retroplacentária</strong>.</li>
                <li>Interrupção da interface bexiga-miométrio.</li>
                <li>Vasos em ponte e hipervascularização ao Doppler na parede anterior.</li>
                <li>A Ressonância Magnética é método complementar em casos selecionados (sem gadolínio).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
