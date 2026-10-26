import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, Activity, ShieldAlert, Flame, 
  HelpCircle, CheckCircle2, ChevronRight, Calculator,
  AlertTriangle, Stethoscope, Layers, FileText
} from 'lucide-react';

interface CirurgiaMainProps {
  initialTopic?: string;
  key?: React.Key;
}

export default function CirurgiaMain({ initialTopic = 'apendicite' }: CirurgiaMainProps) {
  const [activeTopic, setActiveTopic] = useState<string>(initialTopic);

  React.useEffect(() => {
    if (initialTopic) {
      setActiveTopic(initialTopic);
    }
  }, [initialTopic]);

  // Alvarado Score State
  const [alvaradoCriteria, setAlvaradoCriteria] = useState<{ [key: string]: boolean }>({
    migratoryPain: false,
    anorexia: false,
    nauseaVomiting: false,
    rlqTenderness: false, // 2 points
    reboundTenderness: false,
    elevatedTemp: false,
    leukocytosis: false, // 2 points
    shiftToLeft: false
  });

  // Parkland Calculator State
  const [patientWeight, setPatientWeight] = useState<number>(70);
  const [burnedBSAPercentage, setBurnedBSAPercentage] = useState<number>(25);

  const calculateAlvarado = () => {
    let score = 0;
    if (alvaradoCriteria.migratoryPain) score += 1;
    if (alvaradoCriteria.anorexia) score += 1;
    if (alvaradoCriteria.nauseaVomiting) score += 1;
    if (alvaradoCriteria.rlqTenderness) score += 2;
    if (alvaradoCriteria.reboundTenderness) score += 1;
    if (alvaradoCriteria.elevatedTemp) score += 1;
    if (alvaradoCriteria.leukocytosis) score += 2;
    if (alvaradoCriteria.shiftToLeft) score += 1;
    return score;
  };

  const alvaradoScore = calculateAlvarado();

  const TOPICS = [
    { id: 'apendicite', name: 'Apendicite Aguda', icon: Scissors, badge: 'Abdome Agudo Inflamatório' },
    { id: 'colecistite-vias-biliares', name: 'Colecistite e Vias Biliares', icon: Activity, badge: 'Tóquio 2018 / Charcot' },
    { id: 'doenca-diverticular', name: 'Doença Diverticular (Hinchey)', icon: Layers, badge: 'Cólon Esquerdo' },
    { id: 'hernias-abdominais', name: 'Hérnias da Parede Abdominal', icon: Stethoscope, badge: 'Inguinal / Femoral' },
    { id: 'obstrucao-intestinal', name: 'Obstrução Intestinal', icon: AlertTriangle, badge: 'Mecânica vs Funcional' },
    { id: 'pancreatite-aguda', name: 'Pancreatite Aguda', icon: Activity, badge: 'Critérios de Atlanta' },
    { id: 'pre-pos-operatorio', name: 'Pré e Pós-Operatório & Risco', icon: FileText, badge: 'ASA / Profilaxia' },
    { id: 'queimaduras', name: 'Queimaduras (Parkland)', icon: Flame, badge: 'Regra dos 9 / Parkland' },
    { id: 'trauma-atls', name: 'Trauma & ATLS 10ª Edição', icon: ShieldAlert, badge: 'ABCDE / FAST' }
  ].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <span className="p-1 rounded-md bg-rose-950 border border-rose-800">
                <Scissors size={14} />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                Cirurgia Geral · Colégio Brasileiro de Cirurgiões (CBC) & ATLS
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Cirurgia Geral
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Módulo de alta densidade para <strong>Residência Médica (R1) e Revalida</strong>: abdome agudo, patologias biliares, hérnias, trauma avançado no ATLS, queimaduras e avaliação perioperatória.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
              🔪 Cirurgia Geral
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs font-bold text-rose-300">
              9 Temas em Ordem Alfabética
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
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
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
          {/* APENDICITE AGUDA */}
          {activeTopic === 'apendicite' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Clinical Overview */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Scissors className="text-rose-400" size={20} />
                        Apendicite Aguda: Diagnóstico e Conduta
                      </h2>
                      <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Causa #1 de Abdome Agudo Não-Traumático
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      A causa mais frequente é a obstrução da luz apendicular por <strong>fecalito</strong> (em adultos) ou <strong>hiperplasia linfoide</strong> (em jovens e crianças, frequentemente pós-infecção viral).
                    </p>

                    {/* Sinais Clássicos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-black text-rose-400 uppercase">Sinal de Blumberg</span>
                        <p className="text-xs text-slate-300 mt-1">Descompressão brusca dolorosa no ponto de McBurney (1/3 distal da linha espinha ilíaca anterossuperior direita até cicatriz umbilical). Indica irritação peritoneal.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-black text-amber-400 uppercase">Sinal de Rovsing</span>
                        <p className="text-xs text-slate-300 mt-1">Palpação contínua e retrógrada da fossa ilíaca esquerda desloca gases pelo cólon gerando dor na fossa ilíaca direita.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-black text-cyan-400 uppercase">Sinal do Obturador</span>
                        <p className="text-xs text-slate-300 mt-1">Dor na fossa ilíaca direita ao realizar flexão e rotação interna passiva da coxa direita (apêndice em topografia pélvica).</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-black text-emerald-400 uppercase">Sinal do Psoas</span>
                        <p className="text-xs text-slate-300 mt-1">Dor à hiperextensão passiva da coxa direita em decúbito lateral esquerdo (apêndice retrocecal encostado no músculo psoas).</p>
                      </div>
                    </div>
                  </div>

                  {/* Diagnóstico por Imagem */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <h3 className="text-base font-bold text-white">Método Diagnóstico de Escolha</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-bold text-white block">Homem Adulto / Típico</span>
                        <p className="text-xs text-slate-400 mt-1">Quadro clássico: diagnóstico clínico direto para apendicectomia. Dúvida: <strong>Tomografia Computadorizada (TC)</strong> de abdome (padrão-ouro geral).</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-800/40 bg-amber-950/10">
                        <span className="text-xs font-bold text-amber-300 block">Gestantes e Crianças</span>
                        <p className="text-xs text-slate-400 mt-1">1ª Linha: <strong>Ultrassonografia (USG)</strong> para evitar radiação (apêndice incompressível &gt; 6 mm com halo). Se inconclusivo em gestante: <strong>Ressonância Magnética</strong>.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-xs font-bold text-white block">Mulher em Idade Fértil</span>
                        <p className="text-xs text-slate-400 mt-1">Fundamental descartar causas ginecológicas (prenhez ectópica via Beta-hCG, DIP, torção anexial). USG transvaginal/pélvico precoce.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Alvarado Calculator */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Calculator size={18} />
                    <h3 className="text-base font-black text-white">Calculadora Escore de Alvarado</h3>
                  </div>
                  <p className="text-xs text-slate-400">Estratificação objetiva da probabilidade de apendicite aguda (pontuação de 0 a 10):</p>

                  <div className="space-y-2 text-xs">
                    {[
                      { key: 'migratoryPain', label: 'Dor migratória para FID (+1)' },
                      { key: 'anorexia', label: 'Anorexia (+1)' },
                      { key: 'nauseaVomiting', label: 'Náuseas ou Vômitos (+1)' },
                      { key: 'rlqTenderness', label: 'Defesa / Dor à palpação na FID (+2)', high: true },
                      { key: 'reboundTenderness', label: 'Dor à descompressão brusca (+1)' },
                      { key: 'elevatedTemp', label: 'Febre / Temp &gt; 37,3°C (+1)' },
                      { key: 'leukocytosis', label: 'Leucocitose &gt; 10.000/mm³ (+2)', high: true },
                      { key: 'shiftToLeft', label: 'Desvio à esquerda &gt; 75% bastões (+1)' }
                    ].map(item => (
                      <label 
                        key={item.key} 
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-colors ${
                          alvaradoCriteria[item.key]
                            ? 'bg-rose-950/40 border-rose-600 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className={item.high ? 'font-bold text-rose-300' : ''}>{item.label}</span>
                        <input
                          type="checkbox"
                          checked={alvaradoCriteria[item.key]}
                          onChange={e => setAlvaradoCriteria(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          className="rounded border-slate-700 text-rose-600 focus:ring-0"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Pontuação Total</span>
                    <div className="text-3xl font-black text-rose-400">{alvaradoScore} / 10</div>
                    <p className="text-xs font-bold mt-2 text-slate-200">
                      {alvaradoScore <= 3 && 'Baixa probabilidade (0-3): Investigar outros diagnósticos, alta com orientação.'}
                      {alvaradoScore >= 4 && alvaradoScore <= 6 && 'Intermediário (4-6): Observação clínica + Tomografia Computadorizada (TC).'}
                      {alvaradoScore >= 7 && 'Alta probabilidade (7-10): Avaliação cirúrgica imediata para apendicectomia.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COLECISTITE E VIAS BILIARES */}
          {activeTopic === 'colecistite-vias-biliares' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="text-amber-400" size={20} />
                    Colecistite Aguda e Síndromes Biliares
                  </h2>
                  <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Critérios de Tóquio (TG18)
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  95% das colecistites são <strong>litiásicas</strong> (impactação de cálculo no infundíbulo ou ducto cístico com estase biliar, isquemia e proliferação bacteriana: <em>E. coli</em>, <em>Klebsiella</em>, <em>Enterococcus</em>).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-black text-amber-400 uppercase">1. Cólica Biliar Simples</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dor pós-prandial gordurosa em hipocôndrio direito, autolimitada (&lt; 6 horas). Não há febre, nem leucocitose, nem espessamento da parede vesicular. Tratamento: sintomáticos + colecistectomia eletiva.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/30 bg-amber-950/10 space-y-2">
                    <span className="text-xs font-black text-amber-300 uppercase">2. Colecistite Aguda</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Dor contínua &gt; 6 horas + <strong>Sinal de Murphy positivo</strong> (interrupção súbita da inspiração profunda durante palpação do ponto cístico) + febre + leucocitose. <strong>Conduta: Colecistectomia videolaparoscópica precoce (até 72h).</strong>
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-rose-800/40 bg-rose-950/10 space-y-2">
                    <span className="text-xs font-black text-rose-400 uppercase">3. Colangite Aguda</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Obstrução infectada do colédoco. <strong>Tríade de Charcot</strong>: Febre com calafrios + Icterícia + Dor abdominal. Se somar Choque e Confusão Mental = <strong>Pêntade de Reynolds</strong> (emergência: CPRE para descompressão biliar urgente).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HÉRNIAS */}
          {activeTopic === 'hernias-abdominais' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Stethoscope className="text-cyan-400" size={20} />
                Hérnias da Região Inguino-Crural
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-cyan-400 uppercase">Hérnia Inguinal Indireta</span>
                  <p className="text-xs text-slate-300">
                    Mais comum no geral e em jovens. Passa pelo <strong>anel inguinal interno</strong>, lateralmente aos vasos epigástricos inferiores, acompanhando o cordão espermático (defeito congênito do conduto peritônio-vaginal).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-amber-400 uppercase">Hérnia Inguinal Direta</span>
                  <p className="text-xs text-slate-300">
                    Fraqueza adquirida da fáscia transversalis no <strong>Triângulo de Hesselbach</strong> (medial aos vasos epigástricos inferiores, lateral ao músculo reto e superior ao ligamento inguinal). Toca a polpa do dedo no exame.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-rose-800/40 bg-rose-950/10 space-y-2">
                  <span className="text-xs font-black text-rose-400 uppercase">Hérnia Femoral (Crural)</span>
                  <p className="text-xs text-slate-300">
                    Abaixo do ligamento inguinal, pelo canal femoral. Mais frequente em mulheres multíparas idosas. <strong>Maior risco de encarceramento e estrangulamento</strong> entre todas as hérnias da parede.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-white block mb-1">Técnicas Cirúrgicas de Reparo:</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Técnica de Lichtenstein</strong>: Reparo livre de tensão com tela de polipropileno (padrão-ouro para a maioria dos adultos). <strong>Técnica de Shouldice</strong>: Reparo anatômico em planos de sutura imbricada sem tela (ótima opção em campo infectado ou cirurgia contaminada).
                </p>
              </div>
            </div>
          )}

          {/* DOENÇA DIVERTICULAR */}
          {activeTopic === 'doenca-diverticular' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="text-purple-400" size={20} />
                Diverticulite Aguda & Classificação de Hinchey
              </h2>
              <p className="text-xs text-slate-300">
                A "apendicite do lado esquerdo" afeta predominantemente o cólon sigmoide. O exame padrão-ouro é a <strong>Tomografia Computadorizada de Abdome com contraste</strong>. Colonoscopia e enema opaco são <strong>estritamente contraindicados</strong> na fase aguda devido ao risco de perfuração.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { stage: 'Hinchey I', title: 'Abscesso pericólico / mesentérico', tx: 'Iba: antibiótico oral. Ib: abscesso &gt; 3-4 cm drena por punção percutânea guiada por TC.' },
                  { stage: 'Hinchey II', title: 'Abscesso pélvico ou à distância', tx: 'Drenagem percutânea por TC + antibioticoterapia venosa hospitalar.' },
                  { stage: 'Hinchey III', title: 'Peritonite purulenta generalizada', tx: 'Cirurgia de urgência: Cirurgia de Hartmann (sigmoidectomia + colostomia terminal) ou lavagem laparoscópica.' },
                  { stage: 'Hinchey IV', title: 'Peritonite fecal generalizada', tx: 'Emergência cirúrgica com alta mortalidade: Procedimento de Hartmann com ressuscitação volêmica intensiva.' }
                ].map((h, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-black text-purple-400">{h.stage}</span>
                    <p className="text-xs font-bold text-white">{h.title}</p>
                    <p className="text-[11px] text-slate-400">{h.tx}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OBSTRUÇÃO INTESTINAL */}
          {activeTopic === 'obstrucao-intestinal' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="text-amber-400" size={20} />
                Obstrução Intestinal: Delgado vs Cólon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-amber-400 uppercase">Obstrução de Intestino Delgado</span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong>Etiologia #1:</strong> Bridas e aderências pós-operatórias prévias (60-70%).</li>
                    <li><strong>Etiologia #2:</strong> Hérnias estranguladas ou encarceradas.</li>
                    <li><strong>Clínica:</strong> Vômitos precoces e biliosos, dor em cólica periumbilical, distensão discreta a moderada.</li>
                    <li><strong>Radiografia simples:</strong> Pregas coniventes em "empilhamento de moedas", níveis hidroaéreos centrais.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-black text-rose-400 uppercase">Obstrução de Intestino Grosso (Cólon)</span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong>Etiologia #1:</strong> Neoplasia colorretal (adenocarcinoma de cólon e reto).</li>
                    <li><strong>Etiologia #2:</strong> Volvo de sigmoide (idosos acamados, Chagas; sinal do "grão de café").</li>
                    <li><strong>Clínica:</strong> Distensão abdominal maciça e precoce, vômitos tardios (fecaloides), parada de eliminação de fezes e flatos.</li>
                    <li><strong>Válvula íleo-cecal competente:</strong> Obstrução em alça fechada com risco iminente de rotura cecal quando diâmetro &gt; 10-12 cm.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PANCREATITE AGUDA */}
          {activeTopic === 'pancreatite-aguda' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="text-cyan-400" size={20} />
                Pancreatite Aguda: Critérios de Atlanta e Manejo
              </h2>
              <p className="text-xs text-slate-300">
                Diagnóstico firmado com pelo menos <strong>2 de 3 critérios</strong>: (1) Dor abdominal típica em barra no epigástrio que irradia para o dorso; (2) Amilase ou Lipase &gt; 3x o limite superior da normalidade (lipase mais específica e duradoura); (3) Achados característicos na imagem (TC ou USG).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-white block">Etiologia #1 e #2</span>
                  <p className="text-xs text-slate-400 mt-1">1º Biliar (microlitíase/cálculo no colédoco - 45%), 2º Alcoólica (35%), seguida de hipertrigliceridemia (&gt; 1000 mg/dL) e pós-CPRE.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-white block">Momento da TC</span>
                  <p className="text-xs text-slate-400 mt-1">TC com contraste não deve ser feita no momento da entrada se diagnóstico clínico evidente. Ideal: após 48 a 72h para avaliar necrose pancreática.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-white block">Pilares Terapêuticos</span>
                  <p className="text-xs text-slate-400 mt-1">Hidratação vigorosa com Ringer Lactato (manter débito urinário &gt; 0,5 mL/kg/h), analgesia precoce, dieta enteral tão logo tolerada (evita translocação bacteriana). Antibiótico profilático NÃO é indicado de rotina.</p>
                </div>
              </div>
            </div>
          )}

          {/* PRÉ E PÓS-OPERATÓRIO */}
          {activeTopic === 'pre-pos-operatorio' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-emerald-400" size={20} />
                Avaliação Pré-Operatória & Risco Cirúrgico (ASA)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { asa: 'ASA I', desc: 'Paciente hígido, saudável, não tabagista, sem consumo alcoólico mínimo.' },
                  { asa: 'ASA II', desc: 'Doença sistêmica leve sem limitação funcional (HAS controlada, DM controlado, tabagista ativo, obesidade IMC &lt; 40).' },
                  { asa: 'ASA III', desc: 'Doença sistêmica grave com limitação funcional (DM descompensado, DPOC moderado, IAM prévio &gt; 3 meses, DRC dialítica).' },
                  { asa: 'ASA IV', desc: 'Doença sistêmica grave com risco constante de morte (IAM &lt; 3 meses, choque, sepse, disfunção orgânica grave).' },
                  { asa: 'ASA V', desc: 'Paciente moribundo que não se espera sobreviver sem a cirurgia (ruptura de aneurisma de aorta, trauma massivo).' },
                  { asa: 'ASA VI', desc: 'Paciente com morte encefálica declarada, cirurgia para captação de órgãos para transplante.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-black text-emerald-400">{item.asa}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUEIMADURAS & PARKLAND */}
          {activeTopic === 'queimaduras' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="text-rose-400" size={20} />
                  Queimaduras: Regra dos Nove de Wallace e Conduta
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block">Cabeça e Pescoço</span>
                    <span className="text-base font-black text-white">9%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block">Tronco Anterior</span>
                    <span className="text-base font-black text-white">18%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block">Dorso Posterior</span>
                    <span className="text-base font-black text-white">18%</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block">Cada Membro Superior</span>
                    <span className="text-base font-black text-white">9% (x2 = 18%)</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block">Cada Membro Inferior</span>
                    <span className="text-base font-black text-white">18% (x2 = 36%)</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block">Genitália e Períneo</span>
                    <span className="text-base font-black text-white">1%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  *Obs: Queimaduras de 1º grau (apenas eritema sem flictenas) NÃO entram no cálculo de área de superfície corporal queimada (SCQ).
                </p>
              </div>

              {/* Interactive Parkland Calculator */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-rose-400">
                  <Calculator size={18} />
                  <h3 className="text-base font-black text-white">Fórmula de Parkland</h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Peso do Paciente (kg):</label>
                    <input
                      type="number"
                      value={patientWeight}
                      onChange={e => setPatientWeight(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">% Superfície Queimada 2º/3º Grau:</label>
                    <input
                      type="number"
                      value={burnedBSAPercentage}
                      onChange={e => setBurnedBSAPercentage(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mt-4 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ringer Lactato nas Primeiras 24h</span>
                    <div className="text-2xl font-black text-rose-400">
                      {(4 * patientWeight * burnedBSAPercentage).toLocaleString('pt-BR')} mL
                    </div>
                    <div className="text-xs text-slate-300 text-left pt-2 border-t border-slate-800 space-y-1">
                      <p>• <strong>Primeiras 8h:</strong> {((4 * patientWeight * burnedBSAPercentage) / 2).toLocaleString('pt-BR')} mL (50%)</p>
                      <p>• <strong>Próximas 16h:</strong> {((4 * patientWeight * burnedBSAPercentage) / 2).toLocaleString('pt-BR')} mL (restante)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRAUMA & ATLS */}
          {activeTopic === 'trauma-atls' && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="text-rose-400" size={20} />
                Trauma: Avaliação Primária ABCDE e Protocolo E-FAST
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { letter: 'A', title: 'Airway & Colar', desc: 'Vias aéreas com controle cervical. Aspiração de secreções, intubação orotraqueal se Glasgow &le; 8 ou via aérea instável.' },
                  { letter: 'B', title: 'Breathing', desc: 'Respiração e ventilação. Excluir Pneumotórax Hipertensivo (toracocentese de alívio no 4º/5º EIC anterior à linha axilar média), Pneumotórax Aberto e Tórax Instável.' },
                  { letter: 'C', title: 'Circulation', desc: 'Circulação com controle de hemorragias externas. 2 acessos venosos periféricos calibrosos (14-16G), reposição com Ringer Lactato aquecido ou protocolo de transfusão maciça (1:1:1).' },
                  { letter: 'D', title: 'Disability', desc: 'Exame neurológico imediato: Escala de Coma de Glasgow atualizada com reatividade pupilar (ECG-P) e sinais de lateralização motora.' },
                  { letter: 'E', title: 'Exposure', desc: 'Exposição completa com prevenção rigorosa de hipotermia (cobertores térmicos e fluidos intravenosos aquecidos a 39°C).' }
                ].map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-600 text-white font-black text-sm flex items-center justify-center">
                      {step.letter}
                    </div>
                    <span className="text-xs font-bold text-white block">{step.title}</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* FAST */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black text-rose-400 uppercase">E-FAST (Extended Focused Assessment with Sonography for Trauma):</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Avalia líquido livre na cavidade em 4 janelas tradicionais: (1) Espaço hepatorrenal (Recesso de Morrison); (2) Espaço esplenorrenal; (3) Pelve / Bolsa retrovesical ou de Douglas; (4) Janela subxifoide / pericárdica (tamponamento cardíaco). O E-FAST estende para os ápices pulmonares anteriores para detectar pneumotórax (ausência de deslizamento pleural) e hemo-tórax nas bases.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
