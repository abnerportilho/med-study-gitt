import React, { useState } from 'react';
import { 
  Eye, BookOpen, Layers, Search, AlertCircle, 
  CheckCircle2, HelpCircle, ArrowRight, Sparkles, Filter
} from 'lucide-react';

interface LesionItem {
  id: string;
  name: string;
  category: 'primaria_solida' | 'primaria_liquida' | 'primaria_cor' | 'secundaria' | 'especial';
  categoryLabel: string;
  definition: string;
  sizeLimit?: string;
  histologyMechanism: string;
  examples: string[];
  clinicalPearls: string;
  differentials: string;
}

const LESIONS: LesionItem[] = [
  {
    id: 'macula',
    name: 'Mácula e Mancha',
    category: 'primaria_cor',
    categoryLabel: 'Primária (Alteração de Cor)',
    definition: 'Alteração circunscrita na coloração da pele sem alteração de relevo ou textura à palpação. Mácula (< 1 cm) e Mancha (> 1 cm).',
    sizeLimit: 'Mácula: < 1 cm · Mancha: > 1 cm',
    histologyMechanism: 'Deposição de melanina, hemosiderina, proliferação vascular dérmica ou perda de pigmento.',
    examples: ['Vitiligo (acromia)', 'Melasma (hipercromia)', 'Petéquias e Equimoses (púrpura)', 'Pitiríase Versicolor (discromia)'],
    clinicalPearls: 'Teste da digitopressão: se desaparece, é vascular (eritema / telangiectasia); se NÃO desaparece, é extravasamento hemático (púrpura) ou pigmentar.',
    differentials: 'Eritema figurado, vasculites leucocitoclásticas, manchas café-com-leite da Neurofibromatose.'
  },
  {
    id: 'papula',
    name: 'Pápula',
    category: 'primaria_solida',
    categoryLabel: 'Primária (Conteúdo Sólido)',
    definition: 'Lesão sólida, circunscrita e elevada, menor que 1 cm de diâmetro. Palpável.',
    sizeLimit: '< 1 cm de diâmetro',
    histologyMechanism: 'Infiltrado inflamatório dérmico, hiperplasia epidérmica localizada ou depósito dérmico de substâncias.',
    examples: ['Acne pápulo-pustulosa', 'Molusco contagioso', 'Líquen plano', 'Ceratose actínica precoce'],
    clinicalPearls: 'Avaliar superfície (umbilicada no molusco, poligonal com estrias de Wickham no líquen plano, hiperceratótica na verruga vulgar).',
    differentials: 'Pápulas perláceas do CBC inicial, xantomas eruptivos, siringomas.'
  },
  {
    id: 'placa',
    name: 'Placa',
    category: 'primaria_solida',
    categoryLabel: 'Primária (Conteúdo Sólido)',
    definition: 'Lesão elevada em platô, cuja extensão horizontal supera em muito a sua espessura. Geralmente maior que 1 cm de diâmetro.',
    sizeLimit: '> 1 cm de diâmetro',
    histologyMechanism: 'Confluência de múltiplas pápulas ou proliferação epidérmica com acantose e hiperqueratose acentuadas.',
    examples: ['Psoríase em placas (vulgar)', 'Dermatite Seborreica', 'Líquen Simples Crônico', 'Micose Fungoide'],
    clinicalPearls: 'Na psoríase, a curetagem metódica de Brocq revela o Sinal da Vela (escamas prateadas) seguido pelo Orvalho Sangrante de Auspitz.',
    differentials: 'Carcinoma basocelular superficial, Doença de Bowen (CEC in situ), Eczema numular.'
  },
  {
    id: 'nodulo',
    name: 'Nódulo',
    category: 'primaria_solida',
    categoryLabel: 'Primária (Conteúdo Sólido)',
    definition: 'Formação sólida circunscrita localizada na derme profunda ou hipoderme, geralmente entre 1 e 3 cm. Mais palpável do que visível.',
    sizeLimit: '1 a 3 cm (se > 3 cm: Tumor ou Goma)',
    histologyMechanism: 'Infiltrado inflamatório granulomatoso profundo, proliferação celular neoplásica ou depósitos hipodérmicos.',
    examples: ['Eritema Nodoso (paniculite septal)', 'Hanseníase Virchowiana (hansenomas)', 'Cisto epidermoide', 'Carcinoma Basocelular Nodular'],
    clinicalPearls: 'Eritema nodoso: nódulos pré-tibiais dolorosos, avermelhados, sem ulceração, que involuem como hematomas (biligenia).',
    differentials: 'Vasculite nodular, eritema indurado de Bazin (paniculite lobular com vasculite), lipomas.'
  },
  {
    id: 'urtica',
    name: 'Urtica (Pápula Urticada)',
    category: 'primaria_solida',
    categoryLabel: 'Primária (Conteúdo Sólido / Edema)',
    definition: 'Elevação edematosa, eritematosa ou anêmica, de contorno irregular e efêmera (dura menos de 24 horas em uma mesma localização). Prurido intenso.',
    sizeLimit: 'Variável (milímetros a placas gigantes coalescentes)',
    histologyMechanism: 'Vasodilatação dérmica com extravasamento de plasma e degranulação mastocitária mediada por histamina.',
    examples: ['Urticária Aguda e Crônica', 'Picadas de inseto', 'Anafilaxia sistêmica'],
    clinicalPearls: 'Se a urtica dura mais de 24 horas no mesmo ponto e deixa hipercromia residual pós-inflamatória, pensar em Vasculite Urticariforme.',
    differentials: 'Eritema multiforme, penfigoide bolhoso prodrômico, dermatite herpetiforme.'
  },
  {
    id: 'vesicula_bolha',
    name: 'Vesícula e Bolha',
    category: 'primaria_liquida',
    categoryLabel: 'Primária (Conteúdo Líquido Claro)',
    definition: 'Elevações circunscritas de conteúdo líquido seroso ou hemorrágico. Vesícula (< 1 cm) e Bolha (> 1 cm).',
    sizeLimit: 'Vesícula: < 1 cm · Bolha: > 1 cm',
    histologyMechanism: 'Clivagem intraepidérmica (acantólise) ou subepidérmica (descolamento da membrana basal por autoanticorpos ou toxinas).',
    examples: ['Herpes Vírus e Varicela (vesículas)', 'Pênfigo Vulgar (bolhas flácidas)', 'Penfigoide Bolhoso (bolhas tensas)', 'Queimaduras de 2º grau'],
    clinicalPearls: 'Bolhas flácidas que se rompem com facilidade sugerem plano intraepidérmico (Pênfigo). Bolhas tensas e resistentes sugerem plano subepidérmico (Penfigoide).',
    differentials: 'Farmacodermia bolhosa (SSJ/NET), dermatite de contato aguda, impetigo bolhoso.'
  },
  {
    id: 'pustula',
    name: 'Pústula',
    category: 'primaria_liquida',
    categoryLabel: 'Primária (Conteúdo Purulento)',
    definition: 'Elevação circunscrita contendo exsudato purulento estéril ou infeccioso, menor que 1 cm.',
    sizeLimit: '< 1 cm',
    histologyMechanism: 'Acúmulo maciço de neutrófilos na epiderme ou no infundíbulo folicular piloso.',
    examples: ['Foliculite bacteriana', 'Acne vulgar inflamatória', 'Psoríase Pustulosa de von Zumbusch (pústulas estéreis)', 'PEGA'],
    clinicalPearls: 'Pústulas foliculares = foliculite / acne. Pústulas não-foliculares difusas com febre após droga = PEGA (Pustulose Exantemática Generalizada Aguda).',
    differentials: 'Candidíase cutânea em dobras, rosácea pápulo-pustulosa, farmacodermia pustulosa.'
  },
  {
    id: 'escama',
    name: 'Escama',
    category: 'secundaria',
    categoryLabel: 'Secundária (Massa Caduca)',
    definition: 'Lâminas córneas que se desprendem da superfície da pele devido a processo de queratinização acelerada ou defeituosa.',
    histologyMechanism: 'Paraqueratose (persistência de núcleos na camada córnea) e hiperqueratose por turnover celular acelerado.',
    examples: ['Psoríase vulgar (prateadas)', 'Ictiose vulgar (romboidais)', 'Pitiríase rósea (colarete descamativo interno)', 'Dermatite seborreica (gordurosas)'],
    clinicalPearls: 'O colarete descamativo periférico voltado para o centro da lesão é patognomônico da Pitiríase Rósea de Gibert.',
    differentials: 'Tinea corporis (descamação na borda ativa), sífilis secundária (colarete de Biett).'
  },
  {
    id: 'crosta',
    name: 'Crosta',
    category: 'secundaria',
    categoryLabel: 'Secundária (Massa Caduca)',
    definition: 'Concreção formada pelo dessecamento de exsudato (serosidade, sangue ou pus) na superfície cutânea.',
    histologyMechanism: 'Desidratação de fluidos extracelulares misturados a detritos celulares e fibrina.',
    examples: ['Impetigo não-bolhoso (crostas melicéricas cor de mel)', 'Eczema agudo exsudativo', 'Pênfigo foliáceo'],
    clinicalPearls: 'As crostas melicéricas periorificiais em crianças são a marca registrada do impetigo estrepto/estafilocócico.',
    differentials: 'Ectima (crosta espessa com úlcera subjacente), herpes labial ulcerado.'
  },
  {
    id: 'erosao_ulcera',
    name: 'Erosão e Úlcera',
    category: 'secundaria',
    categoryLabel: 'Secundária (Perda Tecidual)',
    definition: 'Erosão: perda superficial restrita à epiderme (cicatriza sem deixar marca). Úlcera: perda profunda que atinge derme ou hipoderme (deixa cicatriz).',
    histologyMechanism: 'Necrose epidérmica superficial vs destruição dermo-hipodérmica e do arcabouço vascular.',
    examples: ['Pênfigo vulgar (erosões dolorosas pós-bolha)', 'Úlcera venosa de perna', 'Úlcera por pressão', 'Cancro duro sifilítico'],
    clinicalPearls: 'Cancro duro (Sífilis primária): úlcera indolor, de base limpa e bordas endurecidas com linfonodomegalias satélites que não fistulizam.',
    differentials: 'Cancro mole (ducreyi - doloroso com fundo purulento), pioderma gangrenoso, CEC ulcerado.'
  },
  {
    id: 'liquenificacao',
    name: 'Liquenificação',
    category: 'secundaria',
    categoryLabel: 'Secundária (Modificação Crônica)',
    definition: 'Espessamento da pele com acentuação dos sulcos e do quadriculado normal, conferindo aspecto de couro ("pele de elefante").',
    histologyMechanism: 'Hiperqueratose e acantose induzidas mecanicamente pelo ato repetido de coçar ou friccionar cronicamente.',
    examples: ['Dermatite Atópica crônica (dobras)', 'Líquen Simples Crônico (neurodermite)'],
    clinicalPearls: 'É a marca do ciclo vicioso "prurido-coçadura". O tratamento exige quebrar o ato mecânico com corticoterapia e barreira oclusiva.',
    differentials: 'Ictioses, acantose nigricans, amiloidose macular/liquenoide.'
  }
];

const SPECIAL_SIGNS = [
  {
    name: 'Sinal de Nikolsky',
    howToPerform: 'Fricção tangencial e firme com o polegar sobre a pele aparentemente sã próxima a uma lesão.',
    positiveSign: 'Descolamento fácil da epiderme, deixando uma superfície erosiva exsudativa.',
    keyDiseases: 'Pênfigo Vulgar, Necrólise Epidérmica Tóxica (NET), Síndrome da Pele Escaldada Estafilocócica (SSSS).',
    note: 'Diferencial crítico: é NEGATIVO no Penfigoide Bolhoso (clivagem subepidérmica profunda).'
  },
  {
    name: 'Sinal de Auspitz (Orvalho Sangrante)',
    howToPerform: 'Curetagem metódica da placa psoriásica com espátula ou lâmina (Curetagem de Brocq).',
    positiveSign: '1º) Sinal da vela (escamas estratificadas destacam-se); 2º) Película descolável de Duncan-Dulck; 3º) Pontilhado hemorrágico decorrente da ruptura dos capilares ectasiados nas papilas dérmicas.',
    keyDiseases: 'Psoríase em placas (vulgar).',
    note: 'Resultado direto do encurtamento do ciclo celular queratinocítico e alongamento das papilas dérmicas.'
  },
  {
    name: 'Fenômeno de Koebner (Isomorfismo Reativo)',
    howToPerform: 'Ocorrência de trauma mecânico, cirúrgico, queimadura solar ou arranhão na pele saudável.',
    positiveSign: 'Surgimento de lesões típicas da doença exatamente ao longo da linha ou área do trauma após 7 a 14 dias.',
    keyDiseases: 'Psoríase, Líquen Plano, Vitiligo, Verrugas Virais.',
    note: 'Explica o aparecimento de placas psoriásicas em cotovelos/joelhos (áreas de atrito contínuo).'
  },
  {
    name: 'Sinal de Darier',
    howToPerform: 'Fricção mecânica leve sobre uma mácula ou placa pigmentada suspeita.',
    positiveSign: 'Aparecimento rápido (em minutos) de edema, eritema e urtica no local friccionado, acompanhado de prurido intenso.',
    keyDiseases: 'Mastocitose cutânea (Urticária Pigmentosa).',
    note: 'Causado pela desgranulação física dos mastócitos acumulados na derme com liberação maciça de histamina.'
  },
  {
    name: 'Sinal da Unha de Zileri & Sinal do Lençol',
    howToPerform: 'Distensão tangencial da pele ou raspagem suave com a unha sobre a mancha com fina descamação.',
    positiveSign: 'Descamação furfurácea sutil que se evidencia após a tração mecânica.',
    keyDiseases: 'Pitiríase Versicolor (infeção por leveduras do gênero Malassezia).',
    note: 'Muito útil para confirmar a atividade clínica do fungo antes de iniciar antifúngicos tópicos ou sistêmicos.'
  },
  {
    name: 'Sinal de Asboe-Hansen (Nikolsky II)',
    howToPerform: 'Pressão vertical suave exercida diretamente sobre o ápice de uma bolha intacta.',
    positiveSign: 'Dissecção lateral e extensão progressiva da bolha para a pele sã adjacente.',
    keyDiseases: 'Pênfigo Vulgar e Pênfigo Foliáceo.',
    note: 'Confirma a presença de acantólise com enfraquecimento dos desmossomos intercelulares.'
  }
];

export default function DermAtlasLesoes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'lesoes' | 'sinais' | 'diagnostico_diferencial'>('lesoes');
  const [selectedLesionId, setSelectedLesionId] = useState<string>('placa');

  const filteredLesions = LESIONS.filter(l => {
    const matchesCat = selectedCategory === 'all' || l.category === selectedCategory;
    const matchesQuery = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         l.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         l.examples.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const selectedLesion = LESIONS.find(l => l.id === selectedLesionId) || LESIONS[0];

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveTab('lesoes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'lesoes'
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen size={15} />
          <span>Atlas de Lesões Elementares</span>
        </button>

        <button
          onClick={() => setActiveTab('sinais')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'sinais'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles size={15} />
          <span>Sinais Dermatológicos Clássicos</span>
        </button>

        <button
          onClick={() => setActiveTab('diagnostico_diferencial')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'diagnostico_diferencial'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Eye size={15} />
          <span>Matriz de Diagnóstico Morfológico</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: ATLAS DE LESÕES */}
      {/* =================================================================== */}
      {activeTab === 'lesoes' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
              {[
                { id: 'all', label: 'Todas as Lesões' },
                { id: 'primaria_solida', label: 'Primárias Sólidas' },
                { id: 'primaria_liquida', label: 'Primárias Líquidas' },
                { id: 'primaria_cor', label: 'Alteração de Cor' },
                { id: 'secundaria', label: 'Secundárias' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'border-sky-500 bg-sky-500/20 text-sky-200'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar lesão ou exemplo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            </div>
          </div>

          {/* Lesions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLesions.map(lesion => (
              <div
                key={lesion.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-base font-black text-white">{lesion.name}</h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700 whitespace-nowrap">
                      {lesion.categoryLabel}
                    </span>
                  </div>

                  {lesion.sizeLimit && (
                    <span className="text-[11px] font-mono text-amber-400 font-bold block">
                      Dimensões: {lesion.sizeLimit}
                    </span>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lesion.definition}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Exemplos Clínicos Chave</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lesion.examples.map((ex, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-sky-950/20 border border-sky-800/30 text-[11px] text-slate-300">
                    <strong className="text-sky-300">Pérola Semiológica:</strong> {lesion.clinicalPearls}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: SINAIS DERMATOLÓGICOS CLÁSSICOS */}
      {/* =================================================================== */}
      {activeTab === 'sinais' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" size={22} />
                Sinais e Manobras Semiológicas da Dermatologia
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Manobras propedêuticas fundamentais para diagnóstico à beira do leito e questões de Residência Médica (R1/TED).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              {SPECIAL_SIGNS.map((sinal, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-black text-amber-300">{sinal.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                      Manobra de Prova
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">Como realizar a manobra:</span>
                      <p className="text-slate-300 mt-0.5">{sinal.howToPerform}</p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 block">Sinal Positivo / Achado:</span>
                      <p className="text-slate-300 mt-0.5 font-medium">{sinal.positiveSign}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-sky-400 block">Patologias Associadas:</span>
                      <p className="text-white font-bold text-xs mt-0.5">{sinal.keyDiseases}</p>
                    </div>

                    <p className="text-[11px] text-slate-400 italic">
                      Nota de atenção: {sinal.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: MATRIZ DE DIAGNÓSTICO MORFOLÓGICO */}
      {/* =================================================================== */}
      {activeTab === 'diagnostico_diferencial' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Eye className="text-purple-400" size={22} />
                Matriz Interativa de Diagnóstico Diferencial Morfológico
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Selecione a lesão elementar predominante no exame físico para navegar pelo raciocínio clínico e diagnósticos diferenciais imediatos.
              </p>
            </div>

            {/* Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800 pb-1">
              {LESIONS.map(l => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLesionId(l.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border cursor-pointer transition-all ${
                    selectedLesionId === l.id
                      ? 'border-purple-500 bg-purple-600 text-white shadow-lg shadow-purple-950/40'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>

            {/* Diagnostic Details Panel */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-purple-900/40 space-y-4 mt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">Raciocínio Clínico a Partir de:</span>
                  <h4 className="text-2xl font-black text-white">{selectedLesion.name}</h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono">
                  {selectedLesion.categoryLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-purple-300 block uppercase text-[11px]">1. Mecanismo Fisiopatológico</span>
                  <p className="text-slate-300 leading-relaxed">{selectedLesion.histologyMechanism}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-300 block uppercase text-[11px]">2. Pérola Semiológica</span>
                  <p className="text-slate-300 leading-relaxed">{selectedLesion.clinicalPearls}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                <span className="font-bold text-emerald-400 block uppercase text-[11px]">
                  3. Principais Diagnósticos Diferenciais
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedLesion.differentials}
                </p>

                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase text-slate-400 block mb-1">Patologias Protótipo:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLesion.examples.map((ex, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-200 font-medium">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
