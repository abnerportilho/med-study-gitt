import React, { useState } from 'react';
import { 
  Dna, Stethoscope, Pill, AlertTriangle, 
  CheckCircle2, Info, Sparkles, Eye, ShieldAlert, Layers
} from 'lucide-react';

export default function NeuroEpilepsia() {
  const [activeTab, setActiveTab] = useState<'definicoes' | 'classificacao_2025' | 'semiologia_lobos' | 'sindromes' | 'tratamento_sanad'>('definicoes');

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'definicoes', label: '1. Definições ILAE & Provocada vs Não', badge: 'Limiares Beghi' },
          { id: 'classificacao_2025', label: '2. Nova Classificação ILAE 2025', badge: 'Consciência vs Descritores' },
          { id: 'semiologia_lobos', label: '3. Semiologia Anatômica por Lobos', badge: 'Temporal, Frontal, etc.' },
          { id: 'sindromes', label: '4. Síndromes Epilépticas Chave', badge: 'Ausência, EMJ, Dravet' },
          { id: 'tratamento_sanad', label: '5. Tratamento & Ensaios SANAD I/II', badge: 'Lamotrigina & Valproato' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{t.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeTab === t.id ? 'bg-purple-700/60 text-purple-100' : 'bg-slate-800 text-slate-400'}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. DEFINIÇÕES OPERACIONAIS */}
      {/* =================================================================== */}
      {activeTab === 'definicoes' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Diretrizes ILAE (Fisher et al., Epilepsia 2014 & Scheffer 2017)
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Definições Operacionais de Crise Epiléptica e Epilepsia
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  <strong>Crise epiléptica</strong> é a ocorrência <em>transitória</em> de sinais ou sintomas causados por atividade neuronal anormal, excessiva ou hipersincrônica no cérebro. <strong>Epilepsia</strong> é a doença caracterizada por <em>predisposição duradoura</em> a gerar crises espontâneas.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300">
                  Prevalência: 7,6 / 1.000 hab
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800 text-xs font-bold text-purple-200">
                  50 Milhões no Mundo
                </div>
              </div>
            </div>

            {/* Criteria Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-3">
              <span className="text-xs font-black uppercase text-purple-300 block">
                A Definição Prática da ILAE: Considera-se Epilepsia em Qualquer uma das 3 Situações:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-850 space-y-1.5">
                  <span className="font-bold text-white block">Critério 1</span>
                  <p className="text-purple-300 font-bold text-xs">Pelo menos 2 crises não provocadas</p>
                  <p className="text-slate-400 text-[11px]">Ocorridas com intervalo maior que 24 horas entre elas.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-850 space-y-1.5">
                  <span className="font-bold text-white block">Critério 2</span>
                  <p className="text-purple-300 font-bold text-xs">1 crise não provocada com risco &ge; 60%</p>
                  <p className="text-slate-400 text-[11px]">Probabilidade de novas crises de pelo menos 60% nos 10 anos seguintes (ex: lesão estrutural remota como AVC antigo, sequela de encefalite herpética, RM com esclerose hipocampal ou EEG com descargas epileptiformes inequívocas).</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-850 space-y-1.5">
                  <span className="font-bold text-white block">Critério 3</span>
                  <p className="text-purple-300 font-bold text-xs">Diagnóstico de Síndrome Epiléptica</p>
                  <p className="text-slate-400 text-[11px]">Quadro eletroclínico fechado de síndrome específica (ex: Epilepsia Ausência Infantil, Epilepsia Mioclônica Juvenil, West, Dravet).</p>
                </div>
              </div>
            </div>

            {/* Provocada vs Não-Provocada */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-black uppercase text-amber-400 block">Crise Sintomática Aguda (Provocada)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Ocorre em associação temporal estreita com insulto cerebral agudo (&le; 7 dias após AVC, trauma, anóxia pós-PCR, neurocirurgia ou infecção ativa do SNC como HSE) ou com distúrbio metabólico sistêmico grave.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 text-[11px] text-slate-300 space-y-1">
                  <strong className="text-white block">Limiares Metabólicos da ILAE (Beghi et al., 2010):</strong>
                  <p>• Glicemia &lt; 36 mg/dL ou &gt; 450 mg/dL com acidose</p>
                  <p>• Sódio sérico &lt; 115 mEq/L</p>
                  <p>• Cálcio sérico &lt; 5,0 mg/dL | Magnésio &lt; 0,8 mg/dL</p>
                  <p>• Ureia &gt; 100 mg/dL ou Creatinina &gt; 10 mg/dL | Abstinência alcoólica</p>
                  <p className="text-amber-400 font-bold pt-1">CONDUTA: Tratar a causa de base! NÃO É EPILEPSIA e não exige anticonvulsivante para o resto da vida.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-black uppercase text-rose-400 block">SUDEP: Morte Súbita Inesperada em Epilepsia</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Principal causa de morte relacionada à epilepsia em adultos jovens (1,2 por 1.000 pacientes-ano).
                </p>
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-[11px] text-slate-300 space-y-1.5">
                  <strong className="text-rose-300 block">Fator de Risco Maior Independente (Harden et al., 2017):</strong>
                  <p>A presença de <strong>&ge; 3 crises tônico-clônicas generalizadas por ano aumenta o risco de SUDEP em cerca de 15 vezes</strong>!</p>
                  <p>Por isso, o controle rigoroso das crises tônico-clônicas com adesão estrita ao tratamento não é apenas qualidade de vida, mas <strong>meta de sobrevida</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. NOVA CLASSIFICAÇÃO ILAE 2025 */}
      {/* =================================================================== */}
      {activeTab === 'classificacao_2025' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Beniczky et al., Epilepsia 2025 · Atualização Oficial que Substitui a ILAE 2017
            </span>
            <h2 className="text-2xl font-black text-white">Classificação de Crises Epilépticas ILAE 2025</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              A atualização de 2025 introduz uma separação conceitual fundamental entre <strong>Classificadores</strong> (que refletem classes biológicas e mudam a conduta médica) e <strong>Descritores</strong> (que caracterizam a crise sem defini-la).
            </p>
          </div>

          {/* Key Change Box */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-800 space-y-2 text-xs">
            <span className="font-bold text-purple-300 uppercase text-[11px] block">
              Mudança Conceitual: Consciência como Classificador Central
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              O termo <em>"awareness"</em> de 2017 foi substituído por <strong>Consciência</strong>, avaliada operacionalmente pela capacidade de percepção e responsividade do paciente durante o evento. 
              As manifestações motoras/não-motoras deixam de ser classificadoras primárias e passam a descritores semiológicos cronológicos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-400 block">1. Crises Focais</span>
              <ul className="space-y-2 text-slate-300 text-[11px]">
                <li>• <strong>Focal com consciência preservada</strong> (a antiga aura ou crise parcial simples).</li>
                <li>• <strong>Focal com consciência comprometida</strong> (antiga crise parcial complexa).</li>
                <li>• <strong>Focal evoluindo para tônico-clônica bilateral</strong> (antiga secundariamente generalizada).</li>
              </ul>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-850">
                Descritores: motores (automatismos, atônica, clônica, espasmos, hipercinética, mioclônica, tônica) e não-motores (autonômica, parada comportamental, cognitiva, emocional, sensorial).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-400 block">2. Crises Generalizadas</span>
              <ul className="space-y-2 text-slate-300 text-[11px]">
                <li>• <strong>Ausências:</strong> Típica (espícula-onda 3 Hz), atípica (&lt; 2,5 Hz), mioclônica, com mioclonia palpebral.</li>
                <li>• <strong>Tônico-clônica generalizada:</strong> Forma clássica primária.</li>
                <li>• <strong>Outras Generalizadas:</strong> Mioclônica, <strong>mioclônica negativa (novo reconhecimento ILAE 2025!)</strong>, mioclono-atônica, tônica, atônica, espasmos epilépticos.</li>
              </ul>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-850">
                Total de 21 tipos de crise reconhecidos na taxonomia completa de 2025.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-slate-400 block">3. Início Desconhecido & Não Classificada</span>
              <ul className="space-y-2 text-slate-300 text-[11px]">
                <li>• <strong>Início desconhecido:</strong> Com consciência preservada ou comprometida; tônico-clônica bilateral de início desconhecido.</li>
                <li>• <strong>Não classificada:</strong> Quando a informação fornecida por testemunhas é insuficiente ou inadequada para categorização.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. SEMIOLOGIA ANATÔMICA POR LOBOS */}
      {/* =================================================================== */}
      {activeTab === 'semiologia_lobos' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Topodiagnóstico Ictal e Valor Localizatório das Auras
            </span>
            <h2 className="text-2xl font-black text-white">Semiologia Focal: O Mapa Cerebral da Crise</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              A aura é a própria crise epiléptica focal com consciência preservada e tem alto valor localizatório para o planejamento cirúrgico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Lobo Temporal Mesial */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-purple-300">Lobo Temporal Mesial (Hipocampo / Amígdala)</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-200">Mais Frequente</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Aura Epigástrica Ascendente:</strong> Sensação de frio ou calor no estômago que sobe em direção à garganta (aura mais comum).</li>
                <li>• <strong>Aura Psíquica:</strong> Medo súbito injustificado, pânico inexplicável, sensação vívida de <strong>déjà vu</strong> ou jamais vu.</li>
                <li>• <strong>Crises Uncinadas:</strong> Alucinações olfatórias ou gustativas desagradáveis (queimado, podre).</li>
                <li>• <strong>Parada Comportamental com Olhar Fixo:</strong> Dura 1 a 2 minutos.</li>
                <li>• <strong>Automatismos Oroalimentares:</strong> Movimentos de mastigação, estalar de lábios, deglutição involuntária.</li>
                <li>• <strong>Automatismos Manuais Ipsilaterais:</strong> Mexer na roupa, abotoar com a mão do mesmo lado do foco.</li>
                <li>• <strong>Postura Distônica do Membro Contralateral:</strong> Tensão e rotação anormal do braço oposto ao foco epiléptico.</li>
                <li>• <strong>Confusão Pós-Ictal Prolongada:</strong> Se afasia pós-crise: indica comprometimento do <strong>hemisfério dominante (esquerdo)</strong>.</li>
              </ul>
            </div>

            {/* Lobo Frontal */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-amber-300">Lobo Frontal (Área Motora Suplementar)</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200">Hipermotora</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Crises Breves (&lt; 30 segundos)</strong> e com recuperação imediata sem confusão pós-ictal.</li>
                <li>• <strong>Predominantemente Noturnas</strong> e que ocorrem em salvas frequentes (várias por noite).</li>
                <li>• <strong>Automatismos Hipermotores Bizarros:</strong> Movimentos de pedalar vigorosamente, contorções pélvicas, agitação e vocalizações altas (gemidos, gritos).</li>
                <li>• <strong>Postura de Esgrimista:</strong> Extensão tônica de um braço com cabeça desviada e flexão do braço oposto (Área Motora Suplementar).</li>
                <li>• <strong>Armadilha:</strong> Pela bizarria motora e EEG de escalpo frequentemente normal, <strong>são as crises mais confundidas com crise funcional dissociativa</strong>!</li>
              </ul>
            </div>

            {/* Lobo Parietal & Occipital */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-cyan-300">Lobo Parietal</h3>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Sintomas Somatossensoriais:</strong> Parestesias (formigamento, choque, queimação unilateral) que podem marchar no córtex sensitivo.</li>
                <li>• <strong>Distorção da Imagem Corporal:</strong> Sensação de que um membro está encolhendo, flutuando ou ausente.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-300">Lobo Occipital</h3>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Alucinações Visuais Elementares:</strong> Luzes brilhantes, pontos coloridos circulares, círculos piscantes (diferencial com enxaqueca: na crise occipital duram segundos a 2 min e são coloridos; na enxaqueca com aura duram 5 a 60 min e são linhas em zigue-zague).</li>
                <li>• <strong>Amaurose Ictal Súbita</strong> e nistagmo epiléptico.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. SÍNDROMES EPILÉPTICAS CHAVE */}
      {/* =================================================================== */}
      {activeTab === 'sindromes' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <h2 className="text-2xl font-black text-white">Síndromes Epilépticas que o Clínico Deve Dominar</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-3">Síndrome</th>
                  <th className="p-3">Faixa Etária & Apresentação</th>
                  <th className="p-3">Padrão no EEG</th>
                  <th className="p-3 text-emerald-400">Tratamento de Escolha</th>
                  <th className="p-3 text-rose-400">Drogas Proibidas (Pioram!)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                <tr>
                  <td className="p-3 font-bold text-white">Epilepsia Ausência Infantil</td>
                  <td className="p-3">4 a 10 anos. Dezenas de pausas breves de 5 a 10s ao dia com olhar vago. Desencadeada por hiperventilação.</td>
                  <td className="p-3 font-mono">Espícula-onda generalizada de <strong>3 Hz</strong></td>
                  <td className="p-3 font-bold text-emerald-400"><strong>Etossuximida</strong> (Glauser et al., NEJM 2010) ou Valproato</td>
                  <td className="p-3 font-bold text-rose-400">Carbamazepina, Fenitoína, Vigabatrina</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Epilepsia Mioclônica Juvenil (EMJ)</td>
                  <td className="p-3">Adolescentes. Abalos mioclônicos matinais ("deixa cair a xícara de café") após privação de sono/álcool + CTCG.</td>
                  <td className="p-3 font-mono">Polispícula-onda generalizada de 4 a 6 Hz</td>
                  <td className="p-3 font-bold text-emerald-400">Homens: <strong>Valproato</strong>. Mulheres: <strong>Levetiracetam ou Lamotrigina</strong></td>
                  <td className="p-3 font-bold text-rose-400">Carbamazepina e Fenitoína (pioram mioclonias!)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Esclerose Hipocampal (ELTM)</td>
                  <td className="p-3">Adultos jovens com antecedente de crise febril na infância. Crises temporais mesiais com auras de déjà vu.</td>
                  <td className="p-3 font-mono">Espículas temporais anteriores</td>
                  <td className="p-3 font-bold text-cyan-400">Frequentemente farmacorresistente: <strong>Cirurgia de Lobectomia Temporal (Wiebe 2001)</strong></td>
                  <td className="p-3 text-slate-400">Não há proibição formal, mas não responderá a múltiplos fármacos</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Síndrome de Dravet</td>
                  <td className="p-3">Lactente &lt; 1 ano. Crises febris prolongadas, hemiclônicas e estado de mal recorrente. Mutação <strong>SCN1A</strong>.</td>
                  <td className="p-3 font-mono">Lentificação e espículas multifocais</td>
                  <td className="p-3 font-bold text-emerald-400">Valproato, Clobazam, Estiripentol, Canabidiol, Fenfluramina</td>
                  <td className="p-3 font-bold text-rose-400"><strong>Bloqueadores de Canal de Sódio (Carbamazepina, Fenitoína, Lamotrigina)</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Síndrome de West (Espasmos Infantis)</td>
                  <td className="p-3">3 a 12 meses. Tríade: espasmos em flexão/extensão em salvas ao despertar + atraso neuropsicomotor + hipsarritmia.</td>
                  <td className="p-3 font-mono"><strong>Hipsarritmia</strong> (caos elétrico caótico de alta voltagem)</td>
                  <td className="p-3 font-bold text-emerald-400"><strong>ACTH ou Prednisolona</strong> oral. Se Esclerose Tuberosa: <strong>Vigabatrina</strong></td>
                  <td className="p-3 text-slate-400">Urgência neurológica pediátrica</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. TRATAMENTO & GRANDES ENSAIOS SANAD */}
      {/* =================================================================== */}
      {activeTab === 'tratamento_sanad' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Ensaios Clínicos SANAD I & II (Lancet 2007, 2021) · Medicina Baseada em Evidências
            </span>
            <h2 className="text-2xl font-black text-white">Escolha do Primeiro Fármaco Anticrise</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              O objetivo primário é o controle completo de crises com monoterapia na menor dose eficaz e com mínimos efeitos adversos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-emerald-400 block">Epilepsia Focal (Adultos & Idosos)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Nos ensaios <strong>SANAD e SANAD II</strong>, a <strong>Lamotrigina</strong> demonstrou superioridade em relação a levetiracetam, zonisamida e carbamazepina para remissão sustentada em 12 meses, com menor taxa de abandono por eventos adversos e melhor perfil custo-efetividade.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 text-[11px] space-y-1 text-slate-300">
                <p>• <strong>1ª Escolha:</strong> <strong>Lamotrigina</strong> (iniciar 25 mg/dia e titular lentamente pelo risco de rash/Stevens-Johnson).</p>
                <p>• <strong>Alternativas de Alta Eficácia:</strong> Levetiracetam, Carbamazepina, Oxcarbazepina, Lacosamida.</p>
                <p>• <strong>Idosos:</strong> Preferir Lamotrigina ou Levetiracetam (evitar indutores enzimáticos como fenitoína/carbamazepina por interações com anticoagulantes e estatinas).</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-400 block">Epilepsia Generalizada / Não Classificada</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                O <strong>Valproato de Sódio</strong> permanece como o fármaco mais eficaz em todas as análises para controle de crises tônico-clônicas generalizadas, mioclonias e ausências associadas.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 text-[11px] space-y-1 text-slate-300">
                <p>• <strong>Homens:</strong> <strong>Valproato de Sódio</strong> (primeira escolha indiscutível).</p>
                <p>• <strong>Mulheres em Idade Fértil:</strong> <strong>CONTRAINDICAR VALPROATO!</strong> Usar <strong>Levetiracetam</strong> ou <strong>Lamotrigina</strong>.</p>
                <p>• <em>Alerta Teratogênico (Registro EURAP & Estudo NEAD):</em> Exposição intrauterina ao valproato causa malformações maiores em ~10% (defeitos de tubo neural, fenda palatina, cardiopatias) e redução mensurável de QI com risco de transtorno do espectro autista.</p>
              </div>
            </div>
          </div>

          {/* Farmacorresistência Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-2 text-xs">
            <span className="font-bold text-purple-300 uppercase text-[11px] block">
              Conceito de Epilepsia Farmacorresistente (ILAE / Kwan et al., 2010):
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Definida como a <strong>falha de 2 esquemas terapêuticos tolerados, bem escolhidos e usados em dose adequada</strong>, seja em monoterapia ou combinação.
            </p>
            <p className="text-slate-400 text-[11px]">
              Na coorte de Chen et al. (<em>JAMA Neurol</em> 2018), 45,7% dos pacientes controlam com o 1º fármaco, o 2º acrescenta 11,6% e o 3º apenas 4,1%. <strong>Não insista em um 4º ou 5º medicamento sem encaminhar o paciente a um Centro Especializado de Epilepsia para avaliação cirúrgica</strong> (Lobectomia Temporal com NNT de 2 no ensaio de Wiebe 2001).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
