import React, { useState } from 'react';
import { 
  GitFork, 
  AlertTriangle, 
  Eye, 
  Activity, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Brain, 
  Sparkles,
  ShieldAlert,
  FileText
} from 'lucide-react';

export const NeuroDiagnosticoDiferencial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sincope' | 'cnep' | 'outros' | 'prolactina'>('sincope');
  const [selectedCase, setSelectedCase] = useState<'caso1' | 'caso2' | null>(null);

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('sincope')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'sincope'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          Crise vs Síncope (Lempert & Calgary)
        </button>
        <button
          onClick={() => setActiveTab('cnep')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'cnep'
              ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Brain className="w-4 h-4" />
          Crises Funcionais / CNEP (Avbersek & CODES)
        </button>
        <button
          onClick={() => setActiveTab('prolactina')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'prolactina'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Biomarcadores: Prolactina & CK
        </button>
        <button
          onClick={() => setActiveTab('outros')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'outros'
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <GitFork className="w-4 h-4" />
          Matriz de Outros Mímicos (AIT, Aura, Parassonias)
        </button>
      </div>

      {/* TAB 1: SÍNCOPE VS CRISE */}
      {activeTab === 'sincope' && (
        <div className="space-y-6">
          {/* Alerta inicial: Lempert et al. 1994 */}
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-amber-200">
                  O Mito Clínico: "Se Teve Mioclonias/Abalos, É Crise Epiléptica"
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  No clássico estudo de <strong>Lempert et al. (Lancet, 1994)</strong>, induziu-se síncope fisiológica por hiperventilação + manobra de Valsalva em 42 voluntários saudáveis:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-amber-900/30">
                    <div className="text-xl font-bold text-amber-400">90%</div>
                    <div className="text-xs text-slate-300 font-medium">Apresentaram Mioclonias</div>
                    <div className="text-[11px] text-slate-400 mt-1">Abalos multifocais, arrítmicos, breves (&lt; 15 seg), sem sincronia clônica.</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-amber-900/30">
                    <div className="text-xl font-bold text-amber-400">79%</div>
                    <div className="text-xs text-slate-300 font-medium">Outros Movimentos Motores</div>
                    <div className="text-[11px] text-slate-400 mt-1">Automatismos oroalimentares, desvio cefálico, extensão tônica breve.</div>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-amber-900/30">
                    <div className="text-xl font-bold text-amber-400">60%</div>
                    <div className="text-xs text-slate-300 font-medium">Alucinações / Experiências Ictais-símiles</div>
                    <div className="text-[11px] text-slate-400 mt-1">Sonhos vívidos, visão em túnel, ruídos e sensação de descorporificação.</div>
                  </div>
                </div>
                <p className="text-xs text-amber-300/80 font-mono mt-2">
                  Regra Prática: A presença de abalos motores isolada NÃO diferencia crise de síncope ("síncope convulsiva" é fenômeno benigno frequente). A distinção reside no timing, sincronia, mordedura lingual lateral e confusão pós-ictal.
                </p>
              </div>
            </div>
          </div>

          {/* Tabela Comparativa Detalhada */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Quadro Comparativo: Crise Epiléptica vs Síncope Vasovagal vs Síncope Cardíaca
              </h4>
              <span className="text-xs text-slate-400">Evidência: Sheldon et al., 2002; Lempert, 1994</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3 w-1/4">Característica Semiologia</th>
                    <th className="p-3 w-1/4 text-indigo-300">Crise Epiléptica TCG</th>
                    <th className="p-3 w-1/4 text-emerald-300">Síncope Reflexa (Vasovagal)</th>
                    <th className="p-3 w-1/4 text-rose-300">Síncope Cardíaca</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-200">Gatilhos Típicos</td>
                    <td className="p-3">Privação de sono, fotoestimulação, estresse, álcool ou nenhum</td>
                    <td className="p-3">Ortostase prolongada, calor, dor, punção venosa, medo</td>
                    <td className="p-3">Esforço físico, palpitações prévias, decúbito, susto sonoro (LQTS)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-200">Pródromos / Aura</td>
                    <td className="p-3">Sensação epigástrica ascendente, déjá-vu, alucinações (segundos)</td>
                    <td className="p-3">Turvação visual em túnel, náusea, sudorese fria, palidez, calor (&gt; 10-30 seg)</td>
                    <td className="p-3">Subitâneo, sem aviso ou palpitações prévias súbitas</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-200">Coloração Cutânea</td>
                    <td className="p-3">Cianose perioral precoce, rubor facial inicial</td>
                    <td className="p-3">Palidez cutânea intensa e sudorese fria pré e per-evento</td>
                    <td className="p-3">Palidez acentuada ou cianose se parada prolongada</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-200">Padrão Motor</td>
                    <td className="p-3 font-medium text-indigo-200">Fase tônica sustentada seguida de clonos simétricos, síncronos e desacelerados</td>
                    <td className="p-3 text-emerald-200">Mioclonias arrítmicas, assíncronas, curtas (&lt; 15 seg), ocorrem após queda</td>
                    <td className="p-3 text-rose-200">Flacidez usual; abalos breves se hipofluxo cerebral &gt; 10 seg</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-200">Mordedura de Língua</td>
                    <td className="p-3 font-bold text-amber-300">Borda lateral da língua (alta especificidade 99%)</td>
                    <td className="p-3">Ausente ou raramente ponta lingual por impacto</td>
                    <td className="p-3">Ausente</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-200">Período Pós-Ictal</td>
                    <td className="p-3 font-bold text-indigo-300">Confusão mental, desorientação, sonolência &gt; 10-30 min, mialgia difusa</td>
                    <td className="p-3 text-emerald-300">Recuperação rápida da orientação (&lt; 1-2 min), pode manter astenia/náusea</td>
                    <td className="p-3 text-rose-300">Recuperação imediata e lúcida assim que perfusão é restabelecida</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-200">ECG Inicial</td>
                    <td className="p-3">Normal ou taquicardia sinusal reativa</td>
                    <td className="p-3">Normal (pode haver bradicardia/pausa durante manobra de Tilt)</td>
                    <td className="p-3 font-bold text-rose-400">Alterado: QT longo/curto, Brugada, BRD/BRE, WPW, bloqueios AV, necrose</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calgary Score Quick Reference Box */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              Escore de Calgary (Sheldon et al., JACC 2002) - Síntese Rápida
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Instrumento validado de 7 pontos com sensibilidade e especificidade de ~90% para diferenciar síncope vasovagal de crise epiléptica em pacientes com episódios de perda transitória da consciência.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-2">Pontos Positivos (+1 ou +2: Sugerem Crise Epiléptica)</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Mordedura de língua lateral: <strong className="text-rose-300">+2</strong></li>
                  <li>• Dejavu ou sensação prévia no estômago (aura): <strong className="text-rose-300">+1</strong></li>
                  <li>• Confusão mental pós-ictal prolongada: <strong className="text-rose-300">+1</strong></li>
                  <li>• Movimentos espasmódicos/clônicos observados: <strong className="text-rose-300">+1</strong></li>
                  <li>• Desvio da cabeça ou postura não natural: <strong className="text-rose-300">+1</strong></li>
                </ul>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">Pontos Negativos (-2: Sugerem Síncope)</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Sintomas vasovagais prévios (suor frio, tontura, calor, náusea): <strong className="text-emerald-300">-2</strong></li>
                  <li>• Desmaio após ficar em pé ou em ambiente abafado por muito tempo: <strong className="text-emerald-300">-2</strong></li>
                </ul>
                <div className="mt-3 p-2 bg-slate-900 rounded border border-slate-700/60 text-xs">
                  <span className="text-slate-200 font-medium">Interpretação:</span>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-rose-400 font-mono font-bold">Escore &ge; 1: Crise (94% VPP)</span>
                    <span className="text-emerald-400 font-mono font-bold">Escore &le; 0: Síncope (92% VPN)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-400 italic">
              * Você pode executar a pontuação interativa completa com cálculo automático na aba "Calculadoras Clínicas".
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CNEP & CRISES FUNCIONAIS DISSOCIATIVAS */}
      {activeTab === 'cnep' && (
        <div className="space-y-6">
          {/* Header conceitual */}
          <div className="bg-purple-950/20 border border-purple-900/40 rounded-xl p-5">
            <h3 className="font-semibold text-purple-200 mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Crises Não Epilépticas Psicogênicas (CNEP) / Crises Dissociativas Funcionais
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              As crises dissociativas funcionais (transtorno neurológico funcional / CID-11) respondem por <strong>20 a 30%</strong> dos atendimentos em centros terciários de epilepsia e até <strong>50%</strong> dos casos admitidos em UTIs com suspeita de "estado de mal refratário".
            </p>
            <div className="mt-3 p-3 bg-purple-900/30 border border-purple-800/40 rounded-lg text-xs text-purple-200">
              <strong>Impacto Iatrogênico Crítico:</strong> Até 80% dos pacientes com CNEP já receberam benzodiazepínicos intravenosos inapropriados e 30-40% chegam a ser intubados por falso status epilepticus antes do diagnóstico correto.
            </div>
          </div>

          {/* Sinais Semiológicos de Avbersek & Sisodiya 2010 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                Sinais Semiológicos Discriminativos (Avbersek & Sisodiya, Lancet Neurol 2010)
              </h4>
              <span className="text-xs text-slate-400">Sensibilidade &gt; 80% e Especificidade &gt; 95%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-purple-950">
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Sinais que Fortemente Favorecem CNEP / Funcional
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Olhos fechados voluntariamente:</strong> Olhos fechados com forte resistência à abertura passiva (sinal mais específico de todos: esp. &gt; 97%).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Duração prolongada e flutuante:</strong> Crise motora com duração superior a 2 a 5 minutos, parando e reiniciando (waxing and waning).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Movimentos pélvicos ativos:</strong> Empuxo pélvico (pelvic thrusting) ou opistótono forçado ("arc de cercle").</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Movimentos da cabeça de lado a lado:</strong> Sinal do "não-não" (head nodding side-to-side).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Choro ictal ou vocalizações emocionais:</strong> Gemidos modulados, soluços, choro per-ictal ou fala durante o evento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Assincronia motora periférica:</strong> Membros superiores e inferiores fora de fase, movimentos descompassados ou bizarros.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  Sinais que Fortemente Favorecem Crise Epiléptica
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Olhos abertos e olhar desviado:</strong> Olhar fixo ou versão ocular forçada conjugada contralateral durante todo o evento tônico-clônico.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Sequência estereotipada temporal:</strong> Tônico sustentado (~20 seg) &rarr; clônico sincronizado progressivamente mais lento &rarr; período atônico/estértor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Mordedura de borda lateral da língua:</strong> Provocada pela contração masseterina sustentada com relaxamento tardio.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Despertar do sono profundo:</strong> Ocorrência ictal comprovada despertando o paciente durante a madrugada (raro em CNEP).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Respiração estertorosa pós-ictal:</strong> Estertores respiratórios audíveis com acidose respiratória transitória imediata.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Critérios de Certeza Diagnóstica ILAE (LaFrance et al. 2013) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              Níveis de Certeza Diagnóstica para CNEP (ILAE Task Force, Epilepsia 2013)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 font-medium block mb-1">1. Possível</span>
                <p className="text-slate-300">História clínica sugestiva obtida por médico treinado, mas sem observação direta do evento por especialista.</p>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 font-medium block mb-1">2. Provável</span>
                <p className="text-slate-300">Avaliação do evento pessoalmente ou por vídeo por epileptologista, mostrando características típicas de CNEP.</p>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-purple-900/40">
                <span className="text-purple-300 font-medium block mb-1">3. Clinicamente Estabelecido</span>
                <p className="text-slate-300">Vídeo-EEG ambulatorial ou internado capturando evento sem atividade epileptiforme antes, durante ou pós, sem perda de ritmo de base.</p>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-purple-600/40 bg-purple-950/20">
                <span className="text-purple-400 font-bold block mb-1">4. Documentado (Padrão-Ouro)</span>
                <p className="text-slate-200">Vídeo-EEG capturando evento habitual idêntico com eletroencefalografia livre de padrão ictal e sem desaceleração pós-ictal compatível.</p>
              </div>
            </div>
          </div>

          {/* Comunicação Diagnóstica & Ensaio CODES */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              Como Comunicar o Diagnóstico & Evidência do Ensaio CODES (Goldstein et al., Lancet Psychiatry 2020)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              O maior ensaio clínico randomizado em crises funcionais (ensaio <strong>CODES</strong>) demonstrou que a <strong>Terapia Cognitivo-Comportamental (TCC)</strong> associada a uma comunicação empática estruturada do diagnóstico reduz significativamente a gravidade dos eventos e melhora a qualidade de vida.
            </p>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-blue-900/30 space-y-2 text-xs">
              <div className="font-semibold text-blue-300">Passo a Passo da Comunicação Clínica:</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 font-medium block">1. Validação</span>
                  <span className="text-slate-300 text-[11px]">"Seus episódios são reais e involuntários, não são fingimento ou frescura."</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 font-medium block">2. Nomear a Condição</span>
                  <span className="text-slate-300 text-[11px]">"Você tem crises dissociativas funcionais. O hardware (cérebro) está íntegro, mas o software trava temporariamente."</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 font-medium block">3. Plano Terapêutico</span>
                  <span className="text-slate-300 text-[11px]">"O tratamento não envolve remédios de epilepsia, mas sim psicoterapia focada em TCC e controle dos gatilhos corporais."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROLACTINA & BIOMARCADORES */}
      {activeTab === 'prolactina' && (
        <div className="space-y-6">
          <div className="bg-blue-950/20 border border-blue-900/40 rounded-xl p-5">
            <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Papel da Prolactina Sérica e CK no Diagnóstico Diferencial
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A elevação sérica da prolactina é resultado da propagação da descarga epiléptica pelo circuito límbico até o <strong>hipotálamo ventromedial</strong>, desinibindo a liberação do peptídeo PRH ou inibindo dopamina tuberoinfundibular.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                Regras Estritas para Dosagem de Prolactina (AAN Guideline)
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Janela Temporal Rígida:</strong> A amostra de sangue DEVE ser colhida entre <strong>10 a 20 minutos</strong> (máximo 30 min) após a cessação do evento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Critério de Positividade:</strong> Elevação de pelo menos <strong>2x a 3x o valor basal</strong> do paciente (ou 2x acima do limite superior da normalidade).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span><strong>Descarte Basal Obrigatório:</strong> Se elevada, deve-se recoletar um valor basal após 24 a 48 horas no mesmo horário para excluir prolactinoma ou hiperprolactinemia farmacológica (antipsicóticos, metoclopramida).</span>
                </li>
              </ul>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs">
                <span className="text-amber-400 font-semibold block mb-1">Limitações Cruciais:</span>
                <span className="text-slate-400">
                  - Apenas 60-80% das crises tônico-clônicas bilaterais elevam prolactina.<br />
                  - Crises focais extratemporais ou crises de ausência NÃO costumam elevar prolactina.<br />
                  - Síncope severa pode provocar elevação discreta por estresse hipóxico/adrenérgico.<br />
                  - Um valor normal <strong>NUNCA</strong> exclui crise epiléptica!
                </span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Creatinoquinase (CK) e Outros Biomarcadores
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Cinética da CK:</strong> Eleva-se tardiamente (pico entre <strong>24 a 48 horas</strong> pós-crise) decorrente da rabdomiólise ictal por contrações mantidas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Utilidade na Prática:</strong> Paciente encontrado inconsciente ou confuso muitas horas após o suposto evento, onde a prolactina já retornou ao normal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Lactato Sérico / Gasometria:</strong> Hiperlactatemia transitória (&gt; 2.5 - 5.0 mmol/L) e acidose metabólica imediata são comuns após crises TCG e normalizam em 1 a 2 horas (metabolismo hepático de lactato). Na síncope, lactato é quase sempre normal.</span>
                </li>
              </ul>
              <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/30 text-xs text-emerald-300">
                <strong>Resumo Prático:</strong> Lactato imediato (&lt; 2h) + Prolactina precoce (15-20 min) + CK tardia (24-48h) formam o tripé laboratorial complementar quando a história clínica é duvidosa.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MATRIZ DE OUTROS MÍMICOS */}
      {activeTab === 'outros' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-950/60 border-b border-slate-800">
              <h4 className="font-semibold text-slate-100 flex items-center gap-2">
                <GitFork className="w-4 h-4 text-emerald-400" />
                Matriz Diagnóstica Diferencial: Mímicos Não Epilépticos Frequentes
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3 w-1/5">Condição Clínica</th>
                    <th className="p-3 w-1/4">Quadro Semiológico</th>
                    <th className="p-3 w-1/4">Pistas de Diferenciação da Epilepsia</th>
                    <th className="p-3 w-1/4">Exame Chave / Conduta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-amber-300">AIT (Ataque Isquêmico Transitório)</td>
                    <td className="p-3">Déficits neurológicos focais negativos súbitos (fraqueza, afasia, amaurose, dormência).</td>
                    <td className="p-3">
                      <strong>Sintomas "Negativos" vs "Positivos":</strong> AIT causa perda funcional imediata; crise causa sintomas positivos que "marcham" (marcha jacksoniana) ou se espalham em segundos.
                    </td>
                    <td className="p-3">Angio-TC/RM crânio + vasos cervicais, ecocardiograma, antiagregação.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-purple-300">Enxaqueca com Aura</td>
                    <td className="p-3">Escotoma cintilante, fortificação visual, parestesias cheiro-orais, cefaleia hemicraniana pulsátil subsequente.</td>
                    <td className="p-3">
                      <strong>Velocidade de Evolução:</strong> Aura enxaquecosa evolui lentamente ao longo de <strong>5 a 20 minutos</strong> (depressão alastrada de Leão). Crise visual occipital dura &lt; 2-3 min e apresenta fosfenos circulares coloridos.
                    </td>
                    <td className="p-3">História clínica compatível; triptanos, anti-inflamatórios ou profilaxia com topiramato/flunarizina/CGRP.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-blue-300">Amnésia Global Transitória (AGT)</td>
                    <td className="p-3">Perda súbita da memória anterógrada com perguntas perseverativas repetitivas ("onde estamos?", "que dia é hoje?").</td>
                    <td className="p-3">
                      <strong>Preservação da Atenção:</strong> Paciente mantém identidade pessoal, fala fluente e habilidades motoras. Não há movimentos anormais ou pós-ictal de torpor. Duração de 4 a 12 horas.
                    </td>
                    <td className="p-3">RM crânio em difusão (DWI) pode revelar pontos hiperintensos hipocampais puntiformes em 48h. Conduta expectante benigna.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-emerald-300">Parassonias NREM (Terror Noturno / Sonambulismo)</td>
                    <td className="p-3">Despertar confusional súbito no terço inicial da noite com taquicardia, sudorese, gritos e deambulação.</td>
                    <td className="p-3">
                      Ocorre em sono N3 (não-REM), ausência de postura distônica assimétrica e sem padrão estereotipado breve repetitivo como na <strong>Epilepsia do Lobo Frontal Noturna (SHE)</strong>.
                    </td>
                    <td className="p-3">Polissonografia com montagem de EEG expandida; higiene do sono, segurança ambiental.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-rose-300">Discinesia Cinesiogênica Paroxística (PKD)</td>
                    <td className="p-3">Posturas distônicas ou coreicas desencadeadas imediatamente por movimentos voluntários repentinos (ex: levantar-se rápido).</td>
                    <td className="p-3">
                      Duração ultracurta (&lt; 1 minuto), consciência totalmente preservada, sem sonolência pós-evento, mutação no gene <em>PRRT2</em>.
                    </td>
                    <td className="p-3">Excelente resposta a doses muito baixas de Carbamazepina (50-100 mg/dia).</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-indigo-300">Cataplexia (Narcolepsia Tipo 1)</td>
                    <td className="p-3">Queda súbita do tônus muscular (fraqueza nos joelhos, queda mandibular) desencadeada por riso intenso ou emoções.</td>
                    <td className="p-3">
                      Consciência perfeitamente intacta durante todo o episódio; dura segundos; associada a sonolência diurna excessiva e hipnagogia.
                    </td>
                    <td className="p-3">Teste das Latências Múltiplas do Sono (TLMS) e dosagem de hipocretina/orexina no LCR.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dicas Clínicas Práticas */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="font-semibold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              Checklist de Avaliação na Sala de Emergência: 4 Perguntas Cruciais
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">1. Qual foi a posição inicial do paciente?</span>
                <span>Se estava em pé por muito tempo em fila ou ambiente quente &rarr; alta probabilidade de síncope vasovagal. Se ocorreu sentado, deitado ou dormindo &rarr; suspeitar de arritmia cardíaca ou crise epiléptica.</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">2. Como estavam os olhos durante o evento?</span>
                <span>Olhos abertos e fixos/desviados &rarr; crise epiléptica. Olhos cerrados com força ou piscando rápido &rarr; crise funcional/CNEP.</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">3. Há relato de mordedura de língua?</span>
                <span>Examinar ativamente a borda LATERAL da língua. Mordedura na ponta lingual pode ocorrer em quedas e traumas comuns.</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-semibold block mb-1">4. Quanto tempo levou para responder seu nome?</span>
                <span>Se acordou orientando-se em segundos &rarr; síncope. Se permaneceu sonolento, confuso ou repetitivo por &gt; 10-15 min &rarr; crise epiléptica.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
