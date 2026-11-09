import React, { useState } from 'react';
import { 
  Stethoscope, 
  Brain, 
  Activity, 
  Compass, 
  Eye, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Info, 
  ShieldAlert, 
  Search, 
  BookOpen, 
  Zap, 
  Move, 
  Volume2, 
  Layers, 
  Scale, 
  AlertTriangle,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TABS: TabItem[] = [
  {
    id: 'topografia-forca',
    label: '1. Raciocínio & Força Motora',
    shortLabel: 'Topografia & Força',
    icon: Activity,
    description: 'Tríade diagnóstica, NMS vs NMI, Escala MRC 0-5, miótomos e pesquisa do Déficit Motor Sutil (DMS).'
  },
  {
    id: 'marcha-tonus',
    label: '2. Tônus, Equilíbrio & Marcha',
    shortLabel: 'Tônus & Marcha',
    icon: Move,
    description: 'Canivete vs Roda Denteada, Froment, Romberg verdadeiro vs falso, Fukuda e 8 padrões de marcha.'
  },
  {
    id: 'taxia-cerebelo',
    label: '3. Coordenação & Cerebelo',
    shortLabel: 'Taxia & Cerebelo',
    icon: Compass,
    description: 'Arqui, Paleo e Neocerebelo, Stewart-Holmes, disdiadococinesia, assinergia de Babinski e disartria.'
  },
  {
    id: 'reflexos-sensibilidade',
    label: '4. Reflexos & Sensibilidade',
    shortLabel: 'Reflexos & Dermátomos',
    icon: Zap,
    description: 'Reflexos profundos (0-4+), Babinski e sucedâneos, dermátomos-chave e Brown-Séquard.'
  },
  {
    id: 'nervos-cranianos',
    label: '5. Nervos Cranianos (I ao XII)',
    shortLabel: 'Pares Cranianos',
    icon: Eye,
    description: 'Campimetria (9 lesões), pupilas (Marcus Gunn, Horner, Adie), Rinne/Weber, Paralisia Facial e Síndromes de Tronco.'
  },
  {
    id: 'cognicao-afasias',
    label: '6. Cognição & Afasias',
    shortLabel: 'Cognição & Afasias',
    icon: Brain,
    description: 'MEEM, MoCA, Bateria Frontal (FAB) e algoritmo rápido de diagnóstico diferencial das afasias.'
  },
  {
    id: 'checklist-beira-leito',
    label: '7. Checklist Prático Sistematizado',
    shortLabel: 'Checklist Prático',
    icon: CheckCircle2,
    description: 'Roteiro sequencial guiado para a realização do exame neurológico completo à beira do leito.'
  }
];

export const NeuroSemiologia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('topografia-forca');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'nms-nmi': true,
    'mrc-miotomos': true,
    'dms-manobras': true,
    'tonus-diferenca': true,
    'marchas-tipos': true,
    'cerebelo-anatomia': true,
    'reflexos-tabela': true,
    'babinski-sucedaneos': true,
    'dermatomo-mapa': true,
    'campimetria-mapa': true,
    'pupilas-tabela': true,
    'facial-diferencial': true,
    'rinne-weber': true,
    'tronco-sindromes': true,
    'afasias-tabela': true
  });

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChecklist = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Notice - UNIP Sorocaba & Tratado da ABN */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>4º Ano Medicina · UNIP Sorocaba · Profa. Dra. Caroline De Pietro Franco Zorzenon</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Semiologia Neurológica Sistematizada</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-mono bg-indigo-900/60 text-indigo-200 border border-indigo-700/50">
                10 Capítulos Completos
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Guia prático e teórico completo baseado no <em>Tratado de Neurologia da Academia Brasileira de Neurologia (ABN)</em>. 
              Do raciocínio anátomo-clínico e exame dos 12 pares cranianos à marcha, reflexos, déficits motores sutis e cognição.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Buscar manobra, reflexo ou par..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center sm:items-start p-3 rounded-xl border transition-all text-left group ${
                isActive 
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-950/50' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className="font-semibold text-xs sm:text-sm truncate">
                  {tab.shortLabel}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 line-clamp-2 hidden sm:block leading-tight">
                {tab.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: TOPOGRAFIA & FORÇA MOTORA (Capítulos 1, 4 e 5)
         ======================================================== */}
      {activeTab === 'topografia-forca' && (
        <div className="space-y-6">
          {/* Card: Raciocínio Diagnóstico Anátomo-Clínico */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Compass className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Capítulo 1 · A Tríade Diagnóstica do Exame Neurológico
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              O diagnóstico neurológico não começa pedindo neuroimagem, mas respondendo a três perguntas cardeais em ordem lógica obrigatória:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 inline-flex items-center justify-center text-[11px]">1</span>
                  <span>Quando começou? (Tempo)</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p><strong className="text-rose-400">Hiperagudo</strong> (seg/min): Vascular (AVE), trauma, crise epiléptica.</p>
                  <p><strong className="text-amber-400">Agudo</strong> (horas/dias): Infeccioso (meningite, HSE), inflamatório (desmielinizante).</p>
                  <p><strong className="text-sky-400">Subagudo</strong> (semanas): Neoplásico, infeccioso subagudo (TBC, cripto), autoimune.</p>
                  <p><strong className="text-emerald-400">Crônico</strong> (meses/anos): Doenças degenerativas (ELA, demências, neuropatias hereditárias).</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 inline-flex items-center justify-center text-[11px]">2</span>
                  <span>Onde está a lesão? (Topografia)</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p><strong className="text-slate-200">Encefálica:</strong> Córtex (afasia, crise focal), cápsula interna (hemiplegia pura desproporcional).</p>
                  <p><strong className="text-slate-200">Tronco cerebral:</strong> Síndromes alternas (nervo craniano ipsilateral + via longa contralateral).</p>
                  <p><strong className="text-slate-200">Medular:</strong> Nível sensitivo definido, paraparesia/tetraparesia, disfunção esfincteriana.</p>
                  <p><strong className="text-slate-200">Periférica:</strong> Raiz (radiculopatia), plexo, nervo periférico (luva/bota), junção neuromuscular ou músculo.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 inline-flex items-center justify-center text-[11px]">3</span>
                  <span>O que causou? (Etiologia)</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>Cruzamento entre a linha temporal e o sítio topográfico.</p>
                  <p className="italic text-slate-400 mt-2 bg-indigo-950/30 p-2 rounded border border-indigo-500/20">
                    "O exame neurológico não se propõe a diagnosticar a doença em si, mas sim o local do dano neural." (Tratado ABN)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparativo Central: NMS (1º Neurônio) vs NMI (2º Neurônio) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <button 
              onClick={() => toggleSection('nms-nmi')}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Scale className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    Síndrome do Primeiro Neurônio Motor (NMS) × Segundo Neurônio Motor (NMI)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Diferenciação basilar entre lesão central (piramidal/corticoespinhal) e lesão periférica (corno anterior / raiz / nervo).
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections['nms-nmi'] ? 'rotate-180' : ''}`} />
            </button>

            {expandedSections['nms-nmi'] && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/60">
                      <th className="py-2.5 px-3 font-semibold text-slate-400">Achado Semiológico</th>
                      <th className="py-2.5 px-3 font-semibold text-indigo-300">1º Neurônio Motor (NMS / Central)</th>
                      <th className="py-2.5 px-3 font-semibold text-amber-300">2º Neurônio Motor (NMI / Periférico)</th>
                      <th className="py-2.5 px-3 font-semibold text-slate-400">Mecanismo Fisiopatológico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">Força Muscular</td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-indigo-300">Paresia / Plegia espástica</strong>. Acomete grandes grupos antigravitários (flexores nos MMSS, extensores nos MMII).
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-amber-300">Paresia / Plegia flácida</strong>. Distribuição radicular, troncular ou miotômica precisa.
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        Perda do comando superior voluntário vs interrupção da via final comum da contração.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">Tônus Muscular</td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-indigo-300">Hipertonia Elástica (Espasticidade)</strong>. Sinal do canivete (cede abruptamente no final do movimento); velocidade-dependente.
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-amber-300">Hipotonia / Atonia</strong>. Membro flácido, sem resistência à movimentação passiva.
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        Desinibição do fuso muscular por perda de controle inibitório reticuloespinhal vs ruptura do arco reflexo gama.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">Reflexos Profundos</td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-indigo-300">Hiperreflexia (3+/4+ ou 4+/4+)</strong>. Difusão reflexógena, policinesia e clônus patológico (esgotável ou inesgotável).
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-amber-300">Hiporreflexia ou Arreflexia (0 a 1+/4+)</strong>. Abolição do reflexo daquele nível radicular.
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        Liberação do arco reflexo espinal da inibição cortical vs destruição do próprio arco reflexo efetor.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">Reflexos Cutâneos</td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-indigo-300">Abolidos precocemente</strong>: Cutâneo-abdominais (T7 a T12) e cremastérico (L1-L2).
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        Preservados (a menos que a raiz lesada participe do nível sensitivo/motor do arco).
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        São reflexos polissinápticos que necessitam da integridade da via piramidal para se manifestar.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">Sinais Patológicos</td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-rose-400">Sinal de Babinski presente</strong> e sucedâneos (Chaddock, Oppenheim, Gordon). Hoffmann/Trömner nas mãos.
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-emerald-400">Ausentes</strong> (resposta plantar flexora normal ou muda).
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        Sinal patognomônico de lesão do trato corticoespinhal.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">Troﬁsmo (Atrofia)</td>
                      <td className="py-2.5 px-3 text-slate-300">
                        Normal inicialmente; se ocorrer, é <span className="underline">tardia e discreta</span> (atrofia por desuso).
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-amber-300">Atrofia precoce, rápida e acentuada</strong> (denervação motora).
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        O NMI fornece fatores tróficos essenciais para a fibra muscular esquelética.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">Fasciculações</td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-slate-400">Ausentes</strong>.
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <strong className="text-amber-300">Frequentes e características</strong> de lesão do corno anterior da medula (ex.: ELA, atrofia muscular espinhal).
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        Disparo espontâneo e desregulado da unidade motora denervada antes de sua morte definitiva.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Escala MRC de Força Muscular & Tabela de Miótomos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Escala MRC */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Activity className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-white">
                  Escala de Força Muscular MRC (0 a 5)
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                    Grau 0
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200">Plegia total:</span> Nenhuma contração muscular palpável ou visível.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                    Grau 1
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200">Traço / Esboço:</span> Contração muscular visível ou palpável, mas sem produzir deslocamento articular.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                    Grau 2
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200">Movimento no plano:</span> Consegue mover a articulação eliminando a força da gravidade (ex.: deslizar o braço na maca).
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    Grau 3
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200">Vence a gravidade:</span> Move e sustenta contra a gravidade, mas <span className="underline">não vence nenhuma resistência</span> manual imposta pelo examinador.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                    Grau 4
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200">Vence resistência parcial:</span> Vence a gravidade e resistência moderada (subdividido em 4- leve, 4 moderada e 4+ quase normal).
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    Grau 5
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200">Força normal:</span> Vence resistência máxima esperada para a idade e compleição física do paciente.
                  </div>
                </div>
              </div>
            </div>

            {/* Miótomos Principais */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Layers className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-white">
                  Miótomos Radiculares & Movimentos-Chave
                </h4>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">C5</span>
                  <span className="text-slate-300">Deltoide / Bíceps</span>
                  <span className="text-slate-400">Abdução ombro / Flexão cotovelo</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">C6</span>
                  <span className="text-slate-300">Extensores punho / Braquiorradial</span>
                  <span className="text-slate-400">Extensão do punho</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">C7</span>
                  <span className="text-slate-300">Tríceps / Flexores punho</span>
                  <span className="text-slate-400">Extensão do cotovelo</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">C8</span>
                  <span className="text-slate-300">Flexor profundo dos dedos</span>
                  <span className="text-slate-400">Aperto de mão (preensão)</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">T1</span>
                  <span className="text-slate-300">Músculos interósseos</span>
                  <span className="text-slate-400">Abdução dos dedos (afastamento)</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">L2 - L3</span>
                  <span className="text-slate-300">Iliopsoas & Quadríceps</span>
                  <span className="text-slate-400">Flexão da coxa & Extensão do joelho</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">L4</span>
                  <span className="text-slate-300">Tibial anterior</span>
                  <span className="text-slate-400">Dorsiflexão e inversão do pé</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">L5</span>
                  <span className="text-slate-300">Extensor longo do hálux / Fibulares</span>
                  <span className="text-slate-400">Extensão do hálux (andar nos calcanhares)</span>
                </div>
                <div className="grid grid-cols-3 p-2 bg-slate-950/50 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-indigo-300">S1</span>
                  <span className="text-slate-300">Gastrocnêmio & Sóleo</span>
                  <span className="text-slate-400">Flexão plantar (andar na ponta dos pés)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Capítulo 5: Manobras Deficitárias e Pesquisa do Déficit Motor Sutil (DMS) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">
                  Capítulo 5 · Manobras Deficitárias & Pesquisa do Déficit Motor Sutil (DMS)
                </h3>
                <p className="text-xs text-slate-400">
                  Quando o paciente tem força grau 5 no leito, mas refere perda de destreza ou desconfia-se de um AIT/AVE inicial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Pronator Drift (Strümpell)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Ouro no DMS</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Braços estendidos para frente, palmas para cima (supinadas), olhos fechados por 20–30s. 
                  <strong className="text-amber-300"> Positivo:</strong> o braço acometido realiza <span className="underline">pronação lenta</span> (músculos pronadores dominam os supinadores fracos) seguida de queda discreta.
                </p>
                <div className="mt-2 text-[11px] text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800">
                  💡 <em>Pérola UNIP:</em> Se o braço subir ou oscilar sem pronar, pensar em déficit proprioceptivo ("braço pseudoatetóide").
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Manobra de Mingazzini</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Membros Inferiores</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Decúbito dorsal; quadris e joelhos flexionados em ângulo de 90° no ar por 30 segundos.
                  <strong className="text-amber-300"> Positivo:</strong> queda gradual da perna ou coxa parética, ou oscilações de fadiga precoce.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Manobra de Barré (MMII)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Decúbito Ventral</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Decúbito ventral com pernas dobradas nos joelhos em ângulo de 45° mantidas por 30s.
                  <strong className="text-amber-300"> Positivo:</strong> queda da perna parética ou abalos de hesitação muscular.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Barré para as Mãos</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Déficit Intrínseco</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mãos espalmadas à frente com dedos amplamente abertos e separados.
                  <strong className="text-amber-300"> Positivo:</strong> adução involuntária e aproximação rápida dos dedos da mão parética (fraqueza dos interósseos).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Sinal do 5º Dedo (Digiti Quinti)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Sensibilidade Extrema</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Braços estendidos com palmas voltadas para baixo. 
                  <strong className="text-amber-300"> Positivo:</strong> o dedo mínimo (5º dedo) do lado acometido sofre abdução espontânea e se afasta dos demais.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Queda em Abdução do MI</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">Útil no Coma</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No paciente comatoso ou não colaborativo: fletem-se passivamente ambos os membros inferiores pelos joelhos e soltam-se.
                  <strong className="text-rose-400"> Positivo:</strong> a perna parética desaba em <span className="underline">rotação externa flácida</span> e abdução.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Rolamento de Dedos & Antebraços</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Coordenação & Piramidal</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pede-se para girar rapidamente os dois indicadores um ao redor do outro.
                  <strong className="text-amber-300"> Positivo:</strong> o membro parético fica fixo no espaço e o membro normal orbita sozinho em torno dele.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Manobra de Raimiste</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Punhos & Mãos</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cotovelos apoiados na maca, antebraços erguidos verticalmente a 90° com mãos abertas.
                  <strong className="text-amber-300"> Positivo:</strong> flexão rápida do punho e aproximação dos dedos do lado acometido.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-indigo-300 text-xs">Fenômeno de Souques</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Sincinesia</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ao solicitar que o paciente levante vigorosamente os dois braços acima da cabeça, os dedos do lado parético permanecem fletidos ou não se estendem completamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: TÔNUS, EQUILÍBRIO & MARCHA (Capítulos 2, 3 e 4)
         ======================================================== */}
      {activeTab === 'marcha-tonus' && (
        <div className="space-y-6">
          {/* Card: Tipos de Hipertonia: Canivete vs Roda Denteada */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Scale className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Avaliação do Tônus Muscular: Espasticidade × Rigidez Plástica
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Espasticidade */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">Hipertonia Elástica (Espasticidade)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Via Piramidal</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li>
                    <strong className="text-white">Velocidade-dependente:</strong> quanto mais rápido o examinador move a articulação passivamente, maior a resistência encontrada.
                  </li>
                  <li>
                    <strong className="text-white">Sinal do Canivete (Mola):</strong> resistência máxima inicial que cede abruptamente no final do arco de movimento.
                  </li>
                  <li>
                    <strong className="text-white">Distribuição assimétrica e eletiva:</strong> predomina nos músculos flexores dos membros superiores e extensores dos membros inferiores (músculos antigravitários).
                  </li>
                  <li>
                    <strong className="text-indigo-300">Etiologias típicas:</strong> AVE isquêmico/hemorrágico, traumatismo raquimedular crônico, esclerose múltipla.
                  </li>
                </ul>
              </div>

              {/* Rigidez */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-amber-400 text-sm">Hipertonia Plástica (Rigidez)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Via Extrapiramidal</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li>
                    <strong className="text-white">Velocidade-independente:</strong> a resistência é contínua e homogênea ao longo de toda a amplitude articular ("sinal do cano de chumbo").
                  </li>
                  <li>
                    <strong className="text-white">Sinal da Roda Denteada (Fenômeno de Negro):</strong> quando a rigidez plástica se sobrepõe ao tremor de repouso extrapiramidal, gerando ressaltos rítmicos.
                  </li>
                  <li>
                    <strong className="text-white">Distribuição global:</strong> afeta agonistas e antagonistas igualmente em flexores e extensores (axial e apendicular).
                  </li>
                  <li>
                    <strong className="text-amber-300">Manobra de Froment:</strong> sensibiliza a rigidez pedindo para o paciente abrir e fechar a mão contralateral repetidamente enquanto se avalia o punho.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Paratonia / Gegenhalten:</strong> resistência motora ativa e proporcional à força exercida pelo examinador ("quanto mais você empurra, mais o paciente resiste"). Típica de lesão bifrontal, encefalopatias metabólicas ou demências avançadas.
              </div>
            </div>
          </div>

          {/* Equilíbrio Estático: Romberg & Fukuda */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">
                  Capítulo 3 · Equilíbrio Estático: Teste de Romberg & Fukuda
                </h3>
                <p className="text-xs text-slate-400">
                  Desfazendo o mito do "Romberg cerebelar": o equilíbrio corporal necessita de 3 pilares (visão, propriocepção cordonal posterior e labirinto vestibular).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <div className="font-bold text-indigo-300 mb-1">
                  1. Romberg Sensitivo (Verdadeiro)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  O paciente fica estável com olhos abertos (a visão compensa a propriocepção perdida). Ao fechar os olhos, oscila em <span className="underline">qualquer direção</span> e cai após breve latência.
                </p>
                <div className="mt-2 text-[11px] text-slate-400">
                  <strong>Causa:</strong> lesão de cordão posterior (Tabes dorsalis, deficiência de B12, neuropatias sensitivas periféricas).
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <div className="font-bold text-amber-300 mb-1">
                  2. Romberg Vestibular (Labiríntico)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Com olhos abertos consegue compensar. Ao fechar os olhos, apresenta queda consistente direcionada <span className="underline">sempre para o lado do labirinto hipofuncionante</span> (látero-pulsão harmônica).
                </p>
                <div className="mt-2 text-[11px] text-slate-400">
                  <strong>Causa:</strong> labirintopatia periférica unilateral (neurite vestibular, labirintite).
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/30">
                <div className="font-bold text-rose-300 mb-1">
                  3. O "Falso Romberg" Cerebelar
                </div>
                <p className="text-slate-300 leading-relaxed">
                  O paciente com lesão cerebelar (verme) oscila com <span className="underline">olhos abertos E fechados</span>, mantendo base alargada contínua. Fechar os olhos não altera significativamente o padrão!
                </p>
                <div className="mt-2 text-[11px] text-rose-400 font-mono">
                  ⚠️ Erro comum: nunca laudar "Romberg positivo cerebelar". É ataxia estática!
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5" />
                <span>Manobra de Fukuda (Marcha Estacionária no Lugar) & Marcha em Estrela de Babinski-Weil</span>
              </div>
              <p className="text-slate-300">
                Paciente com braços estendidos à frente, olhos fechados, marcha elevando os joelhos por 50 a 100 passos no mesmo ponto. 
                Se houver <strong className="text-amber-300">desvio rotacional &gt; 30° a 45°</strong> em relação ao ponto inicial, indica disfunção vestibular periférica ipsilateral ao lado da rotação. 
                Ao andar para frente e para trás de olhos fechados, traça a figura clássica da <em>Marcha em Estrela de Babinski-Weil</em>.
              </p>
            </div>
          </div>

          {/* 8 Padrões Semióticos Clássicos de Marcha */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Activity className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Os 8 Padrões Semióticos Clássicos de Marcha
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">1. Ceifante (Helicópode)</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Postura de Wernicke-Mann</div>
                <p className="text-slate-300">
                  Membro superior fletido e aduzido; membro inferior em extensão espástica descrevendo um semicírculo para o lado durante a passada (ceifar). Pós-AVE.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">2. Tesoura (Espástica)</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Paraparesia Espástica</div>
                <p className="text-slate-300">
                  Hipertonia adutora bilateral dos quadris; joelhos e coxas se entrecruzam como uma tesoura ao caminhar. Típico de paralisia cerebral e mielopatia.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">3. Talonante (Tabética)</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Perda da Propriocepção</div>
                <p className="text-slate-300">
                  Sem feedback sensorial nos pés, o paciente lança a perna alto para frente e atinge o solo bruscamente com o calcanhar, olhando fixamente para o chão.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">4. Ebriosa (Cerebelar)</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Polígono Alargado</div>
                <p className="text-slate-300">
                  Base alargada, tronco titubeante, marcha instável em ziguezague ("andar de bêbado"). Incapacidade total de realizar a marcha em linha (Tandem).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">5. Anserina (Miopática)</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Fraqueza de Glúteo Médio</div>
                <p className="text-slate-300">
                  Báscula lateral acentuada da pelve para cada lado ("andar de pato" ou Trendelenburg bilateral). Típica de distrofias musculares e miopatias proximais.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">6. Escarvante (Pé Caído)</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Lesão Fibular Comum / L5</div>
                <p className="text-slate-300">
                  Paresia da dorsiflexão do pé. Para não arrastar a ponta do pé no chão, flete o joelho exageradamente para o alto; a ponta bate primeiro no chão.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">7. Parkinsoniana</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Festinante & Camptocormia</div>
                <p className="text-slate-300">
                  Passos curtos arrastados, tronco inclinado para a frente, ausência de balanço fisiológico dos braços, hesitação de início e giro em bloco.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">8. Conversiva (Funcional)</div>
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Incongruência Anátomo-Clínica</div>
                <p className="text-slate-300">
                  Movimentos acrobáticos bizarros, flutuações e quase-quedas espetaculares sem nunca se machucar (astasia-abasia funcional; Maranhão-Filho 2014).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: COORDENAÇÃO & CEREBELO (Capítulo 6)
         ======================================================== */}
      {activeTab === 'taxia-cerebelo' && (
        <div className="space-y-6">
          {/* Divisão Anátomo-Funcional do Cerebelo */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Compass className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Capítulo 6 · As 3 Unidades Funcionais do Cerebelo
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300 text-sm">Arquicerebelo</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Vestibulocerebelo</span>
                </div>
                <p className="text-slate-400">
                  <strong className="text-white">Anatomia:</strong> Lobo floculonodular. Conexão primária com os núcleos vestibulares no tronco.
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Função:</strong> Manutenção do equilíbrio estático e coordenação dos movimentos conjugados dos olhos.
                </p>
                <div className="p-2 rounded bg-indigo-950/40 border border-indigo-500/20 text-slate-200">
                  <strong className="text-indigo-300">Sinais de lesão:</strong> Ataxia axial pura (troncular), nistagmo vestibular, vertigem e incapacidade de ficar em pé, <span className="underline">sem dismetria apendicular</span>.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-300 text-sm">Paleocerebelo</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">Espinocerebelo</span>
                </div>
                <p className="text-slate-400">
                  <strong className="text-white">Anatomia:</strong> Verme e lobo anterior. Recebe aferências dos tratos espinocerebelares.
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Função:</strong> Tônus muscular postural, locomoção e coordenação da marcha.
                </p>
                <div className="p-2 rounded bg-sky-950/40 border border-sky-500/20 text-slate-200">
                  <strong className="text-sky-300">Sinais de lesão:</strong> Ataxia da marcha com base alargada, titubeação cefálica e do tronco (comum no etilismo crônico por degeneração vermiana anterior).
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Neocerebelo</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Pontocerebelo</span>
                </div>
                <p className="text-slate-400">
                  <strong className="text-white">Anatomia:</strong> Hemisférios cerebelares laterais. Conexão córtico-ponto-cerebelar maciça.
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Função:</strong> Coordenação fina e sincronização temporal de movimentos apendiculares voluntários.
                </p>
                <div className="p-2 rounded bg-purple-950/40 border border-purple-500/20 text-slate-200">
                  <strong className="text-purple-300">Sinais de lesão:</strong> Dismetria, disdiadococinesia, tremor intencional apendicular e hipotonia <span className="underline">IPSILATERAIS</span> à lesão!
                </div>
              </div>
            </div>
          </div>

          {/* Manobras Semióticas de Coordenação & Sinais Clássicos */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold text-white mb-3">
              Provas Semióticas de Taxia Apendicular & Troncular
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Index-Nariz e Dedo-Dedo</div>
                <p className="text-slate-300 leading-relaxed">
                  Avalia a eumetria (precisão de mira espacial). 
                  Se passar do nariz: <strong className="text-amber-300">hipermetria</strong>; se parar antes: <strong className="text-amber-300">hipometria</strong>. 
                  Na aproximação final ao alvo, surge a exacerbação de oscilações irregulares: o clássico <em>tremor de intenção apendicular</em>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Calcanhar-Joelho-Tíbia</div>
                <p className="text-slate-300 leading-relaxed">
                  Em decúbito dorsal, o paciente eleva uma perna, toca o joelho contralateral com o calcanhar e desliza-o retilineamente sobre a crista tibial até o hálux.
                  Na ataxia neocerebelar: o calcanhar ziguezagueia e escorrega lateralmente para fora da tíbia.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Disdiadococinesia (Marionetes)</div>
                <p className="text-slate-300 leading-relaxed">
                  Pronação e supinação rápidas e alternadas dos antebraços (bater as palmas e os dorsos das mãos sobre as coxas). 
                  A incapacidade de manter o ritmo harmônico ou a decomposição desajeitada indica disfunção neocerebelar ipsilateral.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Rebote de Stewart-Holmes</div>
                <p className="text-slate-300 leading-relaxed">
                  O paciente flete o antebraço contra a máxima resistência do examinador. Ao soltar a mão subitamente, 
                  a falha de frenagem fisiológica dos antagonistas (tríceps) faz com que o paciente golpee violentamente o próprio tórax/ombro.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Assinergia de Babinski</div>
                <p className="text-slate-300 leading-relaxed">
                  Ao tentar sentar-se a partir do decúbito dorsal sem utilizar os braços, a falta de sinergia entre os flexores do tronco e da pelve faz com que o paciente eleve os membros inferiores da maca em vez de mantê-los ancorados.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Disartria Escandida & Copinho</div>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">Fala escandida:</strong> lenta, silabada de forma monótona com explosões fonéticas irregulares.
                  <br />
                  <strong className="text-white">Prova do Copinho (André-Thomas):</strong> abertura exagerada e desajeitada dos dedos ao tentar pegar um copo na mesa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: REFLEXOS & SENSIBILIDADE (Capítulos 7 e 8)
         ======================================================== */}
      {activeTab === 'reflexos-sensibilidade' && (
        <div className="space-y-6">
          {/* Graduação Internacional dos Reflexos Profundos */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Zap className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Capítulo 7 · Reflexos Miotáticos Profundos: Escala 0 a 4+
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs mb-4">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="text-base font-bold text-slate-400 font-mono">0 / 4+</div>
                <div className="font-semibold text-slate-200">Arreflexia</div>
                <div className="text-[10px] text-slate-400">Ausência total; lesão de arco reflexo (NMI)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="text-base font-bold text-amber-300 font-mono">1+ / 4+</div>
                <div className="font-semibold text-slate-200">Hiporreflexia</div>
                <div className="text-[10px] text-slate-400">Discreto; pode necessitar de Jendrassik</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center">
                <div className="text-base font-bold text-emerald-400 font-mono">2+ / 4+</div>
                <div className="font-semibold text-emerald-300">Normorreflexia</div>
                <div className="text-[10px] text-slate-400">Resposta viva normal esperada</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="text-base font-bold text-indigo-300 font-mono">3+ / 4+</div>
                <div className="font-semibold text-slate-200">Hiperreflexia Viva</div>
                <div className="text-[10px] text-slate-400">Difusão reflexógena; pode ser constitucional</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-500/40 text-center">
                <div className="text-base font-bold text-rose-400 font-mono">4+ / 4+</div>
                <div className="font-semibold text-rose-300">Hiperreflexia Franca</div>
                <div className="text-[10px] text-slate-400">Com clônus inesgotável e área ampliada (NMS)</div>
              </div>
            </div>

            {/* Tabela dos Principais Reflexos */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60">
                    <th className="py-2 px-3 font-semibold text-slate-400">Reflexo</th>
                    <th className="py-2 px-3 font-semibold text-indigo-300">Nível Radicular</th>
                    <th className="py-2 px-3 font-semibold text-slate-300">Nervo Periférico</th>
                    <th className="py-2 px-3 font-semibold text-slate-300">Resposta Motora Fisiológica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-medium text-white">Bicipital</td>
                    <td className="py-2 px-3 font-bold text-indigo-400 font-mono">C5 – C6</td>
                    <td className="py-2 px-3 text-slate-400">Musculocutâneo</td>
                    <td className="py-2 px-3 text-slate-300">Flexão do cotovelo</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-medium text-white">Braquiorradial (Estilorradial)</td>
                    <td className="py-2 px-3 font-bold text-indigo-400 font-mono">C5 – C6</td>
                    <td className="py-2 px-3 text-slate-400">Radial</td>
                    <td className="py-2 px-3 text-slate-300">Flexão e leve supinação do antebraço</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-medium text-white">Tricipital</td>
                    <td className="py-2 px-3 font-bold text-indigo-400 font-mono">C6 – C8 (máx C7)</td>
                    <td className="py-2 px-3 text-slate-400">Radial</td>
                    <td className="py-2 px-3 text-slate-300">Extensão do cotovelo</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-medium text-white">Patelar</td>
                    <td className="py-2 px-3 font-bold text-indigo-400 font-mono">L3 – L4</td>
                    <td className="py-2 px-3 text-slate-400">Femoral</td>
                    <td className="py-2 px-3 text-slate-300">Extensão do joelho (quadríceps)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-medium text-white">Aquileu</td>
                    <td className="py-2 px-3 font-bold text-indigo-400 font-mono">S1 – S2</td>
                    <td className="py-2 px-3 text-slate-400">Tibial (Ciático)</td>
                    <td className="py-2 px-3 text-slate-300">Flexão plantar do pé (tríceps sural)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-medium text-white">Mandibular (Masseterino)</td>
                    <td className="py-2 px-3 font-bold text-indigo-400 font-mono">Ponte (V3)</td>
                    <td className="py-2 px-3 text-slate-400">Trigêmeo motor</td>
                    <td className="py-2 px-3 text-slate-300">Elevação da mandíbula (hiperativo na síndrome pseudobulbar)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p>
                💡 <strong className="text-indigo-300">Manobra de Jendrassik:</strong> Facilita reflexos fracos pedindo para o paciente enganchar os dedos das mãos e puxar com força antes da percussão tendinosa.
              </p>
              <p>
                ⚠️ <strong className="text-amber-300">Inversão de Reflexo:</strong> Percussão do tendão do braquiorradial (C5-C6) que gera contração paradoxal dos flexores dos dedos (C8) indica lesão radicular local em C5 associada a mielopatia compressiva cervical!
              </p>
            </div>
          </div>

          {/* Babinski & Sucedâneos Piramidais */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Sinal de Babinski & Manobras Sucedâneas
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              A resposta patológica clássica consiste na <strong className="text-rose-400">extensão (dorsiflexão) lenta e tônica do hálux</strong> acompanhada de abertura em leque dos demais artelhos (sinal do leque de Dupré), demonstrando lesão do trato corticoespinhal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Babinski Clássico</div>
                <p className="text-slate-300">
                  Estímulo com objeto rombo na borda lateral da região plantar, subindo do calcanhar e encurvando-se medialmente sobre as cabeças dos metatarsos até o hálux.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Sinal de Chaddock</div>
                <p className="text-slate-300">
                  Estímulo semicircular na face lateral do dorso do pé, contornando a borda inferior do maléolo lateral em direção à base dos artelhos.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Sinal de Oppenheim</div>
                <p className="text-slate-300">
                  Fricção vigorosa de cima para baixo com as polpas dos dedos polegar e indicador ao longo da crista anterior da tíbia.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Sinal de Gordon</div>
                <p className="text-slate-300">
                  Compressão firme e súbita da massa muscular da panturrilha (ventre do gastrocnêmio).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Sinal de Schaeffer</div>
                <p className="text-slate-300">
                  Pinçamento / compressão firme do tendão de Aquiles.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="font-bold text-indigo-300 mb-1">Hoffmann & Trömner (MMSS)</div>
                <p className="text-slate-300">
                  Pinçamento rápido ou percussão palmar da falange distal do 3º dedo da mão. <strong className="text-rose-400">Positivo:</strong> flexão reflexa adutora involuntária do polegar e indicador.
                </p>
              </div>
            </div>
          </div>

          {/* Capítulo 8: Sensibilidade Somática, Dermátomos & Brown-Séquard */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Layers className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Capítulo 8 · Vias da Sensibilidade, Dermátomos-Chave & Nível Medular
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-300 text-sm">Via Espinotalâmica (Exteroceptiva)</span>
                <p className="text-slate-300">
                  Conduz dor, temperatura e tato grosseiro (protopático).
                </p>
                <p className="text-slate-400">
                  <strong className="text-slate-200">Decussação:</strong> Cruzam a comissura branca anterior medular <span className="text-amber-300 font-semibold">1 a 2 segmentos acima da raiz de entrada</span> e sobem pelo funículo anterolateral oposto até o tálamo.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-300 text-sm">Cordão Posterior (Grácil & Cuneiforme)</span>
                <p className="text-slate-300">
                  Propriocepção consciente (batiestesia), sensibilidade vibratória (palestesia com diapasão 128 Hz) e tato epicrítico.
                </p>
                <p className="text-slate-400">
                  <strong className="text-slate-200">Decussação:</strong> Sobe <span className="text-sky-300 font-semibold">ipsilateralmente na medula</span> e cruza apenas no bulbo (fibras arqueadas internas / lemnisco medial).
                </p>
              </div>
            </div>

            {/* Dermátomos-Chave */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 mb-4">
              <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dermátomos de Referência Anatômica Rápida</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 text-xs">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">C2:</span> Occipício
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">C5:</span> Face lat. braço
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">C6:</span> Polegar
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">C7:</span> 3º dedo (médio)
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">C8:</span> 5º dedo (mínimo)
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">T4:</span> Linha dos mamilos
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">T10:</span> Cicatriz umbilical
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">L1:</span> Região inguinal
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">L4:</span> Maléolo medial
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">L5:</span> Dorso pé / Hálux
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">S1:</span> Borda lat. calcanhar
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400">S3:</span> Tuberosidade isquiát.
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="font-bold text-rose-400">S4–S5:</span> Área perianal (sela)
                </div>
              </div>
            </div>

            {/* Síndrome de Brown-Séquard */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-950 to-indigo-950/30 border border-indigo-500/20 text-xs">
              <div className="font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Síndrome de Brown-Séquard (Hemissecção Medular Típica)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-slate-300">
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <strong className="text-indigo-400">Ipsilateral à lesão:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-slate-300">
                    <li>Paresia / Plegia piramidal (NMS) abaixo do nível</li>
                    <li>Perda da propriocepção consciente e sensibilidade vibratória (cordão posterior)</li>
                  </ul>
                </div>
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <strong className="text-amber-400">Contralateral à lesão:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-slate-300">
                    <li>Perda da sensibilidade térmica e dolorosa (espinotalâmica), iniciando 1 a 2 níveis abaixo da lesão medular!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: NERVOS CRANIANOS (I AO XII) (Capítulo 9)
         ======================================================== */}
      {activeTab === 'nervos-cranianos' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Eye className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Capítulo 9 · Exame Sistematizado dos 12 Pares Cranianos
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Resumo semiológico passo a passo de cada par, correlações fisiopatológicas e síndromes clássicas.
            </p>

            <div className="space-y-4 text-xs">
              {/* I Par: Olfatório */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">I · Nervo Olfatório</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Telencéfalo</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-2">
                  Testar cada narina separadamente com olhos fechados usando substâncias não irritantes aromáticas (café, baunilha, cravo).
                  <strong className="text-amber-300"> Evitar amônia ou álcool</strong>, pois ativam os nociceptores do nervo trigêmeo (V par), simulando olfação normal.
                </p>
                <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-500/20 text-slate-300">
                  <strong className="text-indigo-300">Síndrome de Foster Kennedy:</strong> Meningioma do sulco olfatório comprimindo o nervo olfatório e o nervo óptico homolaterais + hipertensão intracraniana.
                  Tríade: <span className="text-white font-medium">anosmia ipsilateral + atrofia óptica ipsilateral + papiledema contralateral</span>.
                </div>
              </div>

              {/* II Par: Óptico */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">II · Nervo Óptico (Visão, Campo & Pupila)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Diencéfalo</span>
                </div>
                <p className="text-slate-300 mb-3">
                  Avalia-se a <strong>acuidade visual</strong> (tabela de Snellen a 6 m ou Rosenbaum a 35 cm), <strong>visão de cores</strong> (tabelas de Ishihara - teste do vermelho é muito sensível para neurite óptica), <strong>campimetria de confrontação</strong> e <strong>fundoscopia</strong>.
                </p>

                {/* Mapa dos Defeitos de Campo Visual */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 mb-3">
                  <div className="font-bold text-white mb-2 flex items-center gap-1.5 text-xs">
                    <Compass className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Topografia das Lesões Campimétricas</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <strong className="text-indigo-300">Nervo óptico unilateral:</strong> Amaurose monocular completa no olho afetado.
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <strong className="text-indigo-300">Quiasma óptico medial:</strong> Hemianopsia bitemporal heterônima (adenoma hipofisário / craniofaringioma).
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <strong className="text-indigo-300">Trato óptico contralateral:</strong> Hemianopsia homônima contralateral congruente.
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <strong className="text-indigo-300">Alça de Meyer (Lobo temporal):</strong> Quadranopsia homônima superior contralateral ("torta no céu").
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <strong className="text-indigo-300">Radiações parietais (Lobo parietal):</strong> Quadranopsia homônima inferior contralateral ("torta no chão").
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <strong className="text-indigo-300">Córtex calcarino occipital (ACP):</strong> Hemianopsia homônima contralateral com poupança macular (colaterais da ACM).
                    </div>
                  </div>
                </div>

                {/* Síndromes Pupilares */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <div className="font-bold text-rose-300">Marcus Gunn (DPAR)</div>
                    <p className="text-slate-400 mt-1">
                      Defeito pupilar aferente relativo: no teste da luz oscilante, ao iluminar o olho afetado ambas as pupilas se dilatam paradoxalmente (neurite óptica).
                    </p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <div className="font-bold text-amber-300">Síndrome de Horner</div>
                    <p className="text-slate-400 mt-1">
                      Lesão simpática. Tríade: ptose parcial (m. Müller), miose ipsilateral e anidrose hemifacial. Investigar tumor de Pancoast no pulmão ou dissecção carotídea!
                    </p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <div className="font-bold text-sky-300">Pupila de Adie</div>
                    <p className="text-slate-400 mt-1">
                      Midríase tônica unilateral, resposta lentificada à luz com dissociação luz-perto, hipersensibilidade à pilocarpina 0,125%.
                    </p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <div className="font-bold text-purple-300">Argyll-Robertson</div>
                    <p className="text-slate-400 mt-1">
                      Pupilas pequenas e bilaterais que acomodam para perto mas NÃO reagem à luz direta (neurossífilis / tabes dorsalis).
                    </p>
                  </div>
                </div>
              </div>

              {/* III, IV e VI Pares: Motricidade Ocular */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">III, IV e VI · Oculomotor, Troclear & Abducente</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Mesencéfalo & Ponte</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-indigo-300">III Par (Oculomotor):</strong> Inerva reto medial, superior, inferior, oblíquo inferior, elevador da pálpebra e constritor pupilar.
                    <p className="text-[11px] text-slate-400 mt-1">
                      Lesão completa: ptose severa + olho desviado "para baixo e para fora" (down-and-out).
                    </p>
                    <p className="text-[11px] text-rose-300 mt-1">
                      ⚠️ <em>Alerta:</em> Com midríase = compressão extrínseca por aneurisma de artéria comunicante posterior! Sem midríase = microangiopatia diabética isquêmica.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-indigo-300">IV Par (Troclear):</strong> Inerva o músculo oblíquo superior ("olhar para baixo e para dentro", descer escadas).
                    <p className="text-[11px] text-slate-400 mt-1">
                      Diplopia vertical. <strong className="text-amber-300">Manobra de Bielschowsky:</strong> o paciente inclina a cabeça para o ombro oposto para compensar e alinhar a visão.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-indigo-300">VI Par (Abducente):</strong> Inerva o reto lateral (abdução do globo ocular).
                    <p className="text-[11px] text-slate-400 mt-1">
                      Estrabismo convergente com diplopia horizontal no olhar lateral. Nervo de trajeto intracraniano mais longo; falseador topográfico na hipertensão intracraniana!
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-indigo-300">Síndrome de Parinaud (Mesencéfalo dorsal / Pinealoma):</strong> Paralisia do olhar conjugado para cima, retração palpebral (Sinal de Collier), nistagmo de retração-convergência e dissociação luz-perto.
                </div>
              </div>

              {/* V Par: Trigêmeo */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">V · Nervo Trigêmeo (Sensitivo & Mastigação)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Ponte</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-2">
                  Ramos sensitivos: <strong>V1 (oftálmico)</strong>, <strong>V2 (maxilar)</strong> e <strong>V3 (mandibular)</strong>. 
                  Ramo motor (V3): palpação da contração dos músculos masseteres e temporais ao morder com força e desvio mandibular ao abrir a boca (desvia para o lado da lesão motora).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-indigo-300">Reflexo Corneano:</strong> Aferência pelo V1 e eferência pelo VII (orbicular dos olhos fecha ambas as pálpebras bilateralmente).
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-amber-300">Neuralgia do Trigêmeo:</strong> Dor paroxística em choque elétrico (segundos), lancinante em V2/V3 com zonas de gatilho. Responde à carbamazepina.
                  </div>
                </div>
              </div>

              {/* VII Par: Facial (Central vs Periférica) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">VII · Nervo Facial: Paralisia Central × Periférica</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Diferencial Crítico</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-indigo-300 text-xs mb-1">Paralisia Facial Central (Supranuclear / AVC)</div>
                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                      <li>Acomete apenas os <strong className="text-white">dois terços inferiores</strong> da hemiface contralateral.</li>
                      <li><strong className="text-emerald-400">Poupa a musculatura da fronte</strong> (o paciente enruga a testa e levanta as sobrancelhas normalmente).</li>
                      <li><em>Motivo:</em> O núcleo motor facial superior recebe projeções corticais bilaterais de ambos os hemisférios.</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-amber-300 text-xs mb-1">Paralisia Facial Periférica (Bell / NMI)</div>
                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                      <li>Acomete <strong className="text-white">toda a hemiface homolateral</strong> (fronte, olho e boca).</li>
                      <li><strong className="text-rose-400">Não enruga a fronte</strong>, não fecha o olho (lagoftalmia).</li>
                      <li><strong className="text-amber-300">Sinal de Bell:</strong> ao tentar fechar os olhos, o globo ocular desvia para cima e para fora.</li>
                      <li>Pode cursar com hiperacusia (músculo estapédio) e ageusia nos 2/3 anteriores da língua.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* VIII Par: Vestíbulococlear (Rinne & Weber) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">VIII · Nervo Vestíbulococlear: Rinne & Weber</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Audiometria Clínica</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950">
                        <th className="py-2 px-3 text-slate-400">Condição</th>
                        <th className="py-2 px-3 text-indigo-300">Teste de Rinne (Mastóide vs Ouvido)</th>
                        <th className="py-2 px-3 text-indigo-300">Teste de Weber (Vértice Craniano)</th>
                        <th className="py-2 px-3 text-slate-400">Interpretação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      <tr className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-semibold text-white">Audição Normal</td>
                        <td className="py-2 px-3 text-emerald-300">Positivo bilateral (Condução Aérea &gt; Óssea)</td>
                        <td className="py-2 px-3 text-slate-300">Sem lateralização (ouvido no centro)</td>
                        <td className="py-2 px-3 text-slate-400">Vias aéreas e neurais íntegras</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-semibold text-amber-300">Perda Condutiva à Direita</td>
                        <td className="py-2 px-3 text-rose-400">Negativo à direita (Condução Óssea &gt; Aérea)</td>
                        <td className="py-2 px-3 text-amber-300">Lateraliza para a DIREITA (ouvido doente)</td>
                        <td className="py-2 px-3 text-slate-400">Rolha de cera, otite média ou otosclerose</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-semibold text-sky-300">Perda Neurossensorial à Direita</td>
                        <td className="py-2 px-3 text-emerald-300">Positivo bilateral (CA &gt; CO, limiares baixos)</td>
                        <td className="py-2 px-3 text-sky-300">Lateraliza para a ESQUERDA (ouvido são)</td>
                        <td className="py-2 px-3 text-slate-400">Lesão coclear ou do VIII par craniano direito</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* IX, X, XI e XII Pares */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 text-sm">IX, X, XI e XII · Pares Bulbares & Acessório</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Bulbo</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-300">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-indigo-300">IX (Glossofaríngeo) & X (Vago):</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400">
                      <li>Ao falar "Ah", a úvula e o palato desviam para o <strong className="text-white">lado são</strong> na lesão do vago.</li>
                      <li>Reflexo do vômito: aferência pelo IX e eferência pelo X par.</li>
                      <li>Reflexo oculocardíaco (V → X): bradicardia à compressão do globo ocular.</li>
                    </ul>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-indigo-300">XI (Acessório) & XII (Hipoglosso):</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400">
                      <li>XI: Elevação dos ombros contra resistência (trapézio) e rotação da cabeça contra a mão (contrai o ECM oposto!).</li>
                      <li>XII: Na protrusão da língua, ela <strong className="text-white">desvia para o lado da lesão</strong> (ação do genioglosso contralateral). Dentro da boca em repouso, desvia para o lado oposto.</li>
                      <li>Na ELA: atrofia grave e fasciculações no leito bucal em repouso.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Síndromes Alternas de Tronco Encefálico */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-indigo-500/30">
                <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-indigo-400" />
                  <span>Síndromes Alternas Clássicas do Tronco Encefálico</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <strong className="text-indigo-300">Weber (Mesencéfalo):</strong>
                    <p className="text-slate-400 mt-0.5">Paralisia do III par ipsilateral + hemiplegia braquiocrural contralateral.</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <strong className="text-indigo-300">Millard-Gubler (Ponte):</strong>
                    <p className="text-slate-400 mt-0.5">Paralisia facial periférica (VII) + paralisia do VI ipsilaterais + hemiplegia contralateral.</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <strong className="text-indigo-300">Wallenberg (Bulbo Dorsolateral):</strong>
                    <p className="text-slate-400 mt-0.5">Ataxia cerebelar ipsilateral, Horner ipsilateral, disfagia (IX/X), perda sensitiva facial ipsilateral (V) + analgesia corporal CONTRALATERAL. Poupa força motora!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: COGNIÇÃO & AFASIAS (Capítulo 10)
         ======================================================== */}
      {activeTab === 'cognicao-afasias' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Brain className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">
                Capítulo 10 · Baterias Cognitivas de Rastreio à Beira do Leito
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-6">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300">MEEM (Mini-Mental)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">Máx 30 pts</span>
                </div>
                <p className="text-slate-300">
                  Avalia orientação temporal/espacial, registro, cálculo/atenção, evocação tardia, linguagem e cópia de pentágonos sobrepostos.
                </p>
                <div className="text-[11px] text-slate-400">
                  ⚠️ Altamente influenciado pela escolaridade (pontos de corte ajustados: analfabetos 20, 1-4 anos 25, 5-8 anos 26, &gt;9 anos 28).
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-300">MoCA (Montreal)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">Máx 30 pts</span>
                </div>
                <p className="text-slate-300">
                  Mais sensível para <strong>Comprometimento Cognitivo Leve (CCL)</strong>. Inclui teste do relógio, trilhas versão B, memória episódica com pistas e funções executivas complexas.
                </p>
                <div className="text-[11px] text-slate-400">
                  Adiciona 1 ponto se o paciente tiver ≤ 12 anos de escolaridade formal.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300">FAB (Bateria Frontal)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">Máx 18 pts</span>
                </div>
                <p className="text-slate-300">
                  Específico para o lobo frontal: semelhanças conceituais, fluência verbal fonêmica (letra F em 1 min), séries motoras de Luria (punho-borda-palma), controle inibitório go / no-go e preensão palmar.
                </p>
              </div>
            </div>

            {/* Diagnóstico Diferencial Clínico das Afasias */}
            <div className="border-t border-slate-800 pt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Activity className="w-4 h-4" />
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Diagnóstico Diferencial Clínico das Afasias: Algoritmo de Decisão Rápida
                  </h4>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Fluência · Compreensão · Repetição
                </span>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950">
                      <th className="py-2.5 px-3 text-slate-400">Tipo de Afasia</th>
                      <th className="py-2.5 px-3 text-indigo-300">Fluência do Discurso</th>
                      <th className="py-2.5 px-3 text-indigo-300">Compreensão Auditiva</th>
                      <th className="py-2.5 px-3 text-indigo-300">Repetição de Frases</th>
                      <th className="py-2.5 px-3 text-slate-400">Localização Anatômica da Lesão</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-[11px]">
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-white">Broca (Motora / Expressiva)</td>
                      <td className="py-2.5 px-3 text-rose-400 font-medium">NÃO fluente (esforço, disartria, fala telegráfica)</td>
                      <td className="py-2.5 px-3 text-emerald-300">Preservada (o paciente compreende e tem frustração)</td>
                      <td className="py-2.5 px-3 text-rose-400">Comprometida</td>
                      <td className="py-2.5 px-3 text-slate-300">Área de Broca (giro frontal inferior esquerdo, áreas 44/45)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-white">Wernicke (Sensitiva / Receptiva)</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-medium">Fluente (logorreia, parafasias, neologismos, jargão)</td>
                      <td className="py-2.5 px-3 text-rose-400">Gravemente Comprometida (anosognosia)</td>
                      <td className="py-2.5 px-3 text-rose-400">Comprometida</td>
                      <td className="py-2.5 px-3 text-slate-300">Área de Wernicke (giro temporal superior esquerdo, área 22)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-indigo-300">Afasia de Condução</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-medium">Fluente (pequenas pausas para autocorreção)</td>
                      <td className="py-2.5 px-3 text-emerald-300">Preservada</td>
                      <td className="py-2.5 px-3 text-rose-400 font-bold">Gravemente Comprometida</td>
                      <td className="py-2.5 px-3 text-slate-300">Fascículo arqueado / Ínsula posterior esquerda</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-rose-400">Afasia Global</td>
                      <td className="py-2.5 px-3 text-rose-400 font-medium">NÃO fluente (mutismo ou estereotipias)</td>
                      <td className="py-2.5 px-3 text-rose-400">Comprometida</td>
                      <td className="py-2.5 px-3 text-rose-400">Comprometida</td>
                      <td className="py-2.5 px-3 text-slate-300">Extensa lesão perisilviana esquerda (tronco da ACM)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-amber-300">Transcorticais (Motora/Sensitiva/Mista)</td>
                      <td className="py-2.5 px-3 text-slate-300">Variável (conforme o subtipo)</td>
                      <td className="py-2.5 px-3 text-slate-300">Variável</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">EXCEPCIONALMENTE PRESERVADA</td>
                      <td className="py-2.5 px-3 text-slate-300">Zonas limítrofes / watershed (bacias vasculares de fronteira)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Raciocínio Rápido em 3 Passos */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/20 text-xs">
                <div className="font-bold text-indigo-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>A Regra de Ouro em 3 Perguntas à Beira do Leito (Tratado ABN)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed">
                  <li>
                    <strong className="text-white">A fala é fluente?</strong> Se NÃO fluente → Broca ou Global. Se FLUENTE → Wernicke ou Condução.
                  </li>
                  <li>
                    <strong className="text-white">O paciente compreende ordens simples e complexas?</strong> Separa Broca (compreensão preservada) de Global (compreensão nula), e Wernicke (compreensão perdida) de Condução (compreensão preservada).
                  </li>
                  <li>
                    <strong className="text-white">Como está a repetição ("Nem aqui, nem ali, nem lá")?</strong> Se o paciente fala fluentemente e compreende perfeitamente, mas NÃO consegue repetir o que você diz → Lesão isolada do <strong className="text-indigo-400">Fascículo Arqueado (Afasia de Condução)</strong>!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 7: CHECKLIST PRÁTICO SISTEMATIZADO
         ======================================================== */}
      {activeTab === 'checklist-beira-leito' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Roteiro Sequencial Sistematizado de Exame Neurológico
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Siga esta sequência lógica em 7 etapas para nunca omitir nenhum território neural durante o plantão ou enfermaria.
                </p>
              </div>

              <button
                onClick={resetChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar Checklist
              </button>
            </div>

            {/* Checklist Items Grouped */}
            <div className="space-y-3">
              {[
                {
                  id: 'step-1',
                  category: '1. Nível de Consciência & Cognição',
                  items: [
                    { id: 'c1', label: 'Escala de Coma de Glasgow-P (abertura ocular, resposta verbal, resposta motora e reatividade pupilar).' },
                    { id: 'c2', label: 'Orientação têmporo-espacial (dia, mês, ano, hospital, cidade).' },
                    { id: 'c3', label: 'Avaliação sucinta da linguagem: fluência, compreensão de comandos axiais/apendiculares e repetição de sentenças.' }
                  ]
                },
                {
                  id: 'step-2',
                  category: '2. Nervos Cranianos (I ao XII)',
                  items: [
                    { id: 'c4', label: 'Pupilas: simetria (isocoria), reflexo fotomotor direto e consensual, e acomodação.' },
                    { id: 'c5', label: 'Motricidade ocular extrínseca (III, IV e VI): movimentos em H, pesquisa de diplopia e nistagmo.' },
                    { id: 'c6', label: 'Campimetria por confrontação nos 4 quadrantes visuais de cada olho.' },
                    { id: 'c7', label: 'Mímica facial: franzir a testa, fechar olhos com força, sorrir e inflar bochechas (central vs periférica).' },
                    { id: 'c8', label: 'Sensibilidade facial (V) e reflexo corneano se paciente com rebaixamento do nível de consciência.' },
                    { id: 'c9', label: 'Exame da úvula/palato ao falar "Ah" (IX e X) e protrusão da língua em repouso e movimento (XII).' },
                    { id: 'c10', label: 'Elevação dos ombros (trapézio) e rotação da cabeça contra a mão (ECM) (XI par).' }
                  ]
                },
                {
                  id: 'step-3',
                  category: '3. Motricidade & Força (MRC 0-5)',
                  items: [
                    { id: 'c11', label: 'Inspeção: trofismo muscular, fasciculações (leito da língua e deltoides) e posturas anormais.' },
                    { id: 'c12', label: 'Tônus passivo: flexão/extensão rápida e lenta dos punhos, cotovelos e joelhos (canivete vs roda denteada).' },
                    { id: 'c13', label: 'Força muscular segmentar por miótomos: C5 (ombro), C6 (punho), C7 (cotovelo), L2/L3 (coxa), L4/L5 (dorso do pé) e S1 (ponta do pé).' },
                    { id: 'c14', label: 'Pesquisa de Déficit Motor Sutil: Manobra de Pronator Drift (Strümpell) por 20–30s e Mingazzini nos MMII.' }
                  ]
                },
                {
                  id: 'step-4',
                  category: '4. Reflexos Profundos & Superficiais',
                  items: [
                    { id: 'c15', label: 'Miotáticos dos MMSS: bicipital (C5-C6), braquiorradial (C5-C6) e tricipital (C7).' },
                    { id: 'c16', label: 'Miotáticos dos MMII: patelar (L3-L4) e aquileu (S1-S2).' },
                    { id: 'c17', label: 'Reflexo cutâneo-plantar: pesquisa rigorosa do sinal de Babinski e sucedâneo de Chaddock.' },
                    { id: 'c18', label: 'Pesquisa de clônus patológico de patela e tornozelo se houver hiperreflexia 3+ ou 4+.' }
                  ]
                },
                {
                  id: 'step-5',
                  category: '5. Coordenação Motora (Taxia)',
                  items: [
                    { id: 'c19', label: 'Prova Dedo-Nariz (Index-Nariz) bilateral: avaliar eumetria e tremor de intenção na chegada.' },
                    { id: 'c20', label: 'Prova Calcanhar-Joelho bilateral deslizando pela crista da tíbia.' },
                    { id: 'c21', label: 'Diadococinesia: prova das marionetes (pronação/supinação rápida).' },
                    { id: 'c22', label: 'Pesquisa do sinal do rebote de Stewart-Holmes.' }
                  ]
                },
                {
                  id: 'step-6',
                  category: '6. Sensibilidade Somática',
                  items: [
                    { id: 'c23', label: 'Sensibilidade térmica e dolorosa nos dermátomos-chave (C6, C8, T4, T10, L4, L5, S1).' },
                    { id: 'c24', label: 'Sensibilidade proprioceptiva (artrestesia do hálux / "dedo para cima ou para baixo").' },
                    { id: 'c25', label: 'Sensibilidade vibratória (palestesia) com diapasão de 128 Hz nos maléolos e interfalângicas.' }
                  ]
                },
                {
                  id: 'step-7',
                  category: '7. Equilíbrio Estático & Padrão de Marcha',
                  items: [
                    { id: 'c26', label: 'Teste de Romberg estático: olhos abertos 30s e olhos fechados 30s (sensitivo vs vestibular).' },
                    { id: 'c27', label: 'Marcha livre no corredor: postura, amplitude do passo, balanço fisiológico dos braços e curvas.' },
                    { id: 'c28', label: 'Marcha em linha reta pé ante pé (Tandem / calcanhar-dedo) para desmascarar ataxia discreta.' },
                    { id: 'c29', label: 'Marcha na ponta dos pés (S1) e marcha sobre os calcanhares (L5).' }
                  ]
                }
              ].map(section => (
                <div key={section.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-bold text-indigo-300 mb-2">{section.category}</h4>
                  <div className="space-y-1.5">
                    {section.items.map(item => {
                      const isDone = !!checkedItems[item.id];
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleChecklist(item.id)}
                          className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                            isDone 
                              ? 'bg-emerald-950/20 text-slate-400 line-through' 
                              : 'hover:bg-slate-900 text-slate-200'
                          }`}
                        >
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <span className="leading-relaxed">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuroSemiologia;
