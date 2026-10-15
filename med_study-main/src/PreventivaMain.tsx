import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Users, Activity, FileText, 
  BarChart3, CheckCircle2, ChevronRight, Calculator,
  Building, AlertCircle, Sparkles, BookOpen
} from 'lucide-react';

interface PreventivaMainProps {
  initialTopic?: string;
  key?: React.Key;
}

export default function PreventivaMain({ initialTopic = 'atencao-primaria' }: PreventivaMainProps) {
  const [activeTopic, setActiveTopic] = useState<string>(initialTopic);

  React.useEffect(() => {
    if (initialTopic) {
      setActiveTopic(initialTopic);
    }
  }, [initialTopic]);

  // 2x2 Epidemiological Calculator State
  const [cellA, setCellA] = useState<number>(40); // Exposto + Doente
  const [cellB, setCellB] = useState<number>(60); // Exposto + Sadio
  const [cellC, setCellC] = useState<number>(10); // Não-exposto + Doente
  const [cellD, setCellD] = useState<number>(90); // Não-exposto + Sadio

  // Risk Calculations
  const expTotal = cellA + cellB;
  const nonExpTotal = cellC + cellD;
  const incExp = expTotal > 0 ? cellA / expTotal : 0;
  const incNonExp = nonExpTotal > 0 ? cellC / nonExpTotal : 0;

  // Relative Risk (RR)
  const relativeRisk = incNonExp > 0 ? incExp / incNonExp : 0;
  // Odds Ratio (OR)
  const oddsRatio = cellB * cellC > 0 ? (cellA * cellD) / (cellB * cellC) : 0;
  // Risk Difference (Risco Atribuível - RA)
  const riskDifference = (incExp - incNonExp) * 100;
  // NNT / NNH
  const nnt = Math.abs(incExp - incNonExp) > 0 ? Math.ceil(1 / Math.abs(incExp - incNonExp)) : 0;

  const TOPICS = [
    { id: 'atencao-primaria', name: 'Atenção Primária e Saúde da Família (ESF)', icon: Users, badge: 'Starfield / APS' },
    { id: 'declaracao-obito', name: 'Declaração de Óbito e Atestados Médicos', icon: FileText, badge: 'Causa Básica / IML' },
    { id: 'epidemiologia-indicadores', name: 'Epidemiologia e Indicadores de Saúde', icon: BarChart3, badge: 'Nelson Moraes / Mortalidade' },
    { id: 'estudos-epidemiologicos', name: 'Estudos Epidemiológicos e Bioestatística', icon: Calculator, badge: 'RR / OR / Coorte / RCT' },
    { id: 'medicina-trabalho', name: 'Medicina do Trabalho e Saúde do Trabalhador', icon: Activity, badge: 'PAIR / Silicose / CAT' },
    { id: 'niveis-prevencao', name: 'Níveis de Prevenção e Rastreamento', icon: ShieldCheck, badge: 'Leavell & Clark' },
    { id: 'sus-legislacao', name: 'Sistema Único de Saúde (SUS: Leis 8.080 e 8.142)', icon: Building, badge: 'Princípios e Diretrizes' },
    { id: 'vigilancia-notificacao', name: 'Vigilância em Saúde e Notificação Compulsória', icon: AlertCircle, badge: 'Sinan / Notificação' }
  ].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <span className="p-1 rounded-md bg-emerald-950 border border-emerald-800">
                <ShieldCheck size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                Saúde Coletiva & Medicina Preventiva e Social
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Medicina Preventiva e Social
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Módulo indispensável para provas de <strong>Residência Médica (ENARE, USP, SES-SP, Revalida)</strong>: SUS, Atenção Básica, Bioestatística, Estudos Clínicos, Indicadores de Saúde e Declaração de Óbito.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
              🛡️ Preventiva e Social
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs font-bold text-emerald-300">
              8 Temas em Ordem Alfabética
            </div>
          </div>
        </div>

        {/* Quick horizontal topic pills in alphabetical order */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800 overflow-x-auto no-scrollbar pb-1">
          {TOPICS.map(t => {
            const Icon = t.icon;
            const isActive = activeTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon size={14} />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content based on activeTopic */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTopic}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="space-y-6"
        >
          {/* ATENÇÃO PRIMÁRIA E ESF */}
          {activeTopic === 'atencao-primaria' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="text-emerald-400" size={20} />
                  Atenção Primária à Saúde (APS) e Atributos de Starfield
                </h2>
                <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Barbara Starfield
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                A APS é a porta de entrada preferencial e ordenadora das Redes de Atenção à Saúde (RAS). Barbara Starfield define a excelência da APS através de <strong>4 Atributos Essenciais</strong> e <strong>3 Atributos Derivados</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-800/40 bg-emerald-950/10 space-y-3">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">4 Atributos Essenciais</span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p><strong>1. Acesso de Primeiro Contato:</strong> A unidade de saúde deve ser facilmente acessível física e temporalmente para novas queixas.</p>
                    <p><strong>2. Longitudinalidade:</strong> Relação terapêutica contínua e duradoura entre o profissional/equipe e o usuário ao longo da vida, independentemente da doença.</p>
                    <p><strong>3. Integralidade:</strong> Reconhecimento de todas as necessidades de saúde do indivíduo (promoção, prevenção, cura e reabilitação).</p>
                    <p><strong>4. Coordenação do Cuidado:</strong> A equipe de APS integra e sincroniza as informações e os cuidados prestados em outros pontos da rede (especialidades, internações).</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block">3 Atributos Derivados</span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p><strong>1. Orientação Familiar:</strong> Avaliação do contexto familiar e dinâmica de apoio (uso do Genograma / Familiograma e Ecomapa).</p>
                    <p><strong>2. Orientação Comunitária:</strong> Conhecimento das necessidades epidemiológicas e recursos da comunidade do território adscrito.</p>
                    <p><strong>3. Competência Cultural:</strong> Compreensão e respeito às crenças, valores e diversidade cultural da população atendida.</p>
                  </div>
                </div>
              </div>

              {/* Equipe ESF */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-white block mb-1">Composição Mínima da Equipe de Saúde da Família (eSF - PNAB):</span>
                <p className="text-xs text-slate-400">
                  1 Médico (preferencialmente de Família e Comunidade), 1 Enfermeiro, 1 Auxiliar ou Técnico de Enfermagem e Agentes Comunitários de Saúde (ACS). População adscrita recomendada: <strong>2.000 a 3.500 pessoas por equipe</strong>.
                </p>
              </div>
            </div>
          )}

          {/* DECLARAÇÃO DE ÓBITO */}
          {activeTopic === 'declaracao-obito' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-amber-400" size={20} />
                  Declaração de Óbito (DO): Normas e Preenchimento Correto
                </h2>
                <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Resolução CFM 1.779/2005
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-rose-400 uppercase">Morte por Causa Externa / Violenta / Suspeita</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Homicídio, suicídio, acidente de trânsito, queda da própria altura que levou à complicação fatal. <strong>Quem atesta: EXCLUSIVAMENTE O MÉDICO LEGISTA DO IML</strong> (Instituto Médico Legal). O médico assistente do hospital NUNCA deve atestar óbito por causa externa, mesmo que o óbito ocorra dias após a internação.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-emerald-400 uppercase">Morte Natural sem Assistência Médica</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ocorre em domicílio ou via pública sem violência: quem atesta é o <strong>Serviço de Verificação de Óbito (SVO)</strong>. Se na localidade não existir SVO nem IML: médico do serviço público mais próximo ou qualquer médico da localidade.
                  </p>
                </div>
              </div>

              {/* Regra da Cadeia Causal */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-black text-white uppercase block">Estrutura da Parte I da DO (Ordem Causal Inversa):</span>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <span className="font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-slate-950">Linha A:</span>
                    <span className="text-slate-200"><strong>Causa Terminal / Imediata</strong> (Ex: Choque Séptico) devido a ou como consequência de:</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-950">Linha B:</span>
                    <span className="text-slate-200"><strong>Causa Intermediária</strong> (Ex: Broncopneumonia) devido a ou como consequência de:</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-emerald-800/40 bg-emerald-950/20 flex items-center gap-3">
                    <span className="font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-slate-950">Linha C:</span>
                    <span className="text-slate-100 font-bold"><strong>Causa Básica da Morte</strong> (Ex: Acidente Vascular Cerebral Isquêmico) — Doença inicial que desencadeou todo o processo!</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  *Atenção de prova: <strong>Parada cardiorrespiratória (PCR)</strong> ou "falência de múltiplos órgãos" NÃO deve ser colocada como causa básica, pois são mecanismos finais de morte.
                </p>
              </div>
            </div>
          )}

          {/* ESTUDOS EPIDEMIOLÓGICOS COM CALCULADORA INTERATIVA */}
          {activeTopic === 'estudos-epidemiologicos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calculator className="text-cyan-400" size={20} />
                    Delineamento dos Estudos Epidemiológicos
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-cyan-400 font-bold block">1. Estudo de Coorte (Prospectivo)</span>
                      <p className="text-slate-300">Parte da <strong>exposição</strong> rumo ao desfecho. Mede Incidência. Calcula <strong>Risco Relativo (RR)</strong>. Excelente para exposições raras. Alto custo e risco de perdas de seguimento.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">2. Estudo Caso-Controle (Retrospectivo)</span>
                      <p className="text-slate-300">Parte do <strong>desfecho (doentes vs sadios)</strong> rumo ao passado buscando a exposição. Não mede incidência! Estima associação via <strong>Odds Ratio (OR)</strong>. Ideal para doenças raras e longos períodos de latência.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-emerald-400 font-bold block">3. Ensaio Clínico Randomizado (ECR)</span>
                      <p className="text-slate-300">Intervencionista, experimental. Randomização reduz viés de confusão; mascaramento (duplo-cego) reduz viés de aferição. Padrão-ouro para eficácia de intervenções e cálculo de <strong>NNT</strong>.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-purple-400 font-bold block">4. Estudo Transversal (Seccional)</span>
                      <p className="text-slate-300">Exposição e desfecho avaliados simultaneamente no mesmo instante no tempo. Mede <strong>Prevalência</strong>. Não estabelece relação causal de temporalidade (viés de causalidade reversa).</p>
                    </div>
                  </div>
                </div>

                {/* Calculadora Tabela 2x2 Interativa */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block">Calculadora Tabela 2x2</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400">Exp (+) / Doente (A):</label>
                      <input 
                        type="number" 
                        value={cellA} 
                        onChange={e => setCellA(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white font-bold" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Exp (+) / Sadio (B):</label>
                      <input 
                        type="number" 
                        value={cellB} 
                        onChange={e => setCellB(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white font-bold" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Exp (-) / Doente (C):</label>
                      <input 
                        type="number" 
                        value={cellC} 
                        onChange={e => setCellC(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white font-bold" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Exp (-) / Sadio (D):</label>
                      <input 
                        type="number" 
                        value={cellD} 
                        onChange={e => setCellD(Number(e.target.value))} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white font-bold" 
                      />
                    </div>
                  </div>

                  {/* Resultados Calculados */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Risco Relativo (RR):</span>
                      <span className="font-black text-cyan-400 text-sm">{relativeRisk.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Odds Ratio (OR):</span>
                      <span className="font-black text-amber-400 text-sm">{oddsRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Risco Atribuível (RA):</span>
                      <span className="font-black text-emerald-400 text-sm">{riskDifference.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                      <span className="text-slate-400">NNT / NNH:</span>
                      <span className="font-black text-rose-400 text-sm">{nnt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUS E LEGISLAÇÃO */}
          {activeTopic === 'sus-legislacao' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building className="text-cyan-400" size={20} />
                Sistema Único de Saúde (SUS): Princípios Doutrinários e Organizativos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/40 bg-cyan-950/10 space-y-2">
                  <span className="text-xs font-black text-cyan-300 uppercase block">Princípios Doutrinários (Éticos)</span>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li><strong>• Universalidade:</strong> A saúde é direito de todos e dever do Estado, sem qualquer tipo de discriminação ou exigência contributiva.</li>
                    <li><strong>• Integralidade:</strong> Visão do indivíduo como um todo biopsicossocial, articulando ações preventivas, curativas e reabilitadoras em todos os níveis de complexidade.</li>
                    <li><strong>• Equidade:</strong> "Tratar desigualmente os desiguais", priorizando recursos para populações e indivíduos em maior vulnerabilidade.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/40 bg-purple-950/10 space-y-2">
                  <span className="text-xs font-black text-purple-300 uppercase block">Princípios Organizativos (Operacionais)</span>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li><strong>• Descentralização com Direção Única:</strong> Repasse de responsabilidades e recursos para os municípios (municipalização da saúde).</li>
                    <li><strong>• Regionalização e Hierarquização:</strong> Organização dos serviços em níveis crescentes de densidade tecnológica integrados em rede.</li>
                    <li><strong>• Participação Social (Controle Social):</strong> Conselhos de Saúde (permanentes e deliberativos) e Conferências de Saúde (a cada 4 anos), com composição <strong>50% de Usuários (Paritária)</strong>.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white block">Legislação Estruturante Básica:</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Lei 8.080/1990:</strong> Dispõe sobre as condições para promoção, proteção e recuperação da saúde, organização e funcionamento dos serviços do SUS. <strong>Lei 8.142/1990:</strong> Dispõe sobre a participação da comunidade na gestão do SUS e as transferências intergovernamentais de recursos financeiros.
                </p>
              </div>
            </div>
          )}

          {/* NÍVEIS DE PREVENÇÃO */}
          {activeTopic === 'niveis-prevencao' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" size={20} />
                História Natural da Doença & Níveis de Prevenção (Leavell & Clark)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { level: 'Primordial', desc: 'Evitar o surgimento de padrões de vida sociais/econômicos que aumentam risco (Ex: leis antitabagismo em ambientes fechados, ciclovias urbanas).' },
                  { level: 'Primária', desc: 'Indivíduo saudável sem a doença. Reduz a incidência através de vacinação, uso de preservativos, saneamento básico e cessação do tabagismo.' },
                  { level: 'Secundária', desc: 'Indivíduo assintomático com doença em fase inicial subclínica. Rastreamento (screening): mamografia, citologia oncótica (Papanicolau), colonoscopia.' },
                  { level: 'Terciária', desc: 'Doença clinicamente manifesta. Reduz incapacidades e complicações (fisioterapia pós-AVC, controle de pé diabético, reabilitação cardíaca pós-IAM).' },
                  { level: 'Quaternária', desc: 'Evitar a iatrogenia e a sobrediagnose/sobretratamento médico (overdiagnosis / overtreatment). "Primum non nocere".' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-black text-emerald-400 uppercase">Prev. {item.level}</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INDICADORES DE SAÚDE */}
          {activeTopic === 'epidemiologia-indicadores' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="text-amber-400" size={20} />
                Indicadores de Saúde e Transição Demográfico-Epidemiológica
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-amber-400 uppercase">Taxa de Mortalidade Infantil (TMI)</span>
                  <p className="text-xs text-slate-300">
                    Óbitos em menores de 1 ano / Nascidos vivos x 1.000. O componente <strong>neonatal precoce (0 a 6 dias)</strong> é o maior responsável pelos óbitos infantis no Brasil moderno, associado à assistência pré-natal e ao parto.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-rose-400 uppercase">Razão de Mortalidade Materna (RMM)</span>
                  <p className="text-xs text-slate-300">
                    Óbitos maternos durante gravidez, parto ou puerpério até 42 dias / Nascidos vivos x 100.000. Principais causas no Brasil: <strong>1º Síndromes Hipertensivas (SHEG)</strong>, 2º Hemorragias pós-parto, 3º Infecções puerperais.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-cyan-400 uppercase">Curvas de Nelson Moraes</span>
                  <p className="text-xs text-slate-300">
                    Distribuição percentual de óbitos por faixas etárias. Nível 1 (muito baixo - curva em N): muitos óbitos infantis. Nível 4 (muito elevado - curva em J invertido): mais de 75% dos óbitos ocorrem em maiores de 50 anos (padrão de países desenvolvidos).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VIGILÂNCIA E NOTIFICAÇÃO COMPULSÓRIA */}
          {activeTopic === 'vigilancia-notificacao' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertCircle className="text-rose-400" size={20} />
                Vigilância Epidemiológica & Doenças de Notificação Compulsória
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-rose-800/40 bg-rose-950/10 space-y-2">
                  <span className="text-xs font-black text-rose-400 uppercase">Notificação Imediata (até 24 horas)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Eventos de potencial de disseminação rápida, alta gravidade ou ameaça de emergência de saúde pública internacional. Ex: Raiva humana, Botulismo, Cólera, Febre Amarela, Peste, Sarampo, Varíola, Síndrome Respiratória Aguda Grave (SRAG), Óbito materno e infantil, Acidente por animal peçonhento, Violência sexual.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-emerald-400 uppercase">Notificação Semanal (ordinária)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Doenças crônicas ou transmissíveis endêmicas consolidadas no território. Ex: Tuberculose, Hanseníase, Sífilis adquirida/congênita/em gestante, Dengue (casos sem sinais de alarme), Chikungunya, Hepatites virais, Tétano acidental, Leishmaniose tegumentar e visceral.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MEDICINA DO TRABALHO */}
          {activeTopic === 'medicina-trabalho' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="text-purple-400" size={20} />
                Saúde do Trabalhador & Comunicação de Acidente de Trabalho (CAT)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-purple-400 uppercase">Emissão da CAT</span>
                  <p className="text-xs text-slate-300">
                    Obrigatória até o <strong>1º dia útil seguinte</strong> ao acidente ou imediatamente em caso de morte. Se a empresa não emitir, o próprio trabalhador, sindicato ou médico assistente pode emiti-la.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-amber-400 uppercase">Silicose & Asbestose</span>
                  <p className="text-xs text-slate-300">
                    Silicose: mineração e pedreiras; predomínio em lobos superiores com calcificações em casca de ovo ("egg-shell"); risco de tuberculose. Asbestose: amianto e telhas; predomínio em lobos inferiores e risco de mesotelioma de pleura.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-cyan-400 uppercase">PAIR (Perda Auditiva por Ruído)</span>
                  <p className="text-xs text-slate-300">
                    Neurossensorial, bilateral, simétrica e irreversível. Audiometria típica com queda precoce na frequência de <strong>4.000 Hz a 6.000 Hz</strong> em gota ("entalhe acústico").
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
