import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, Pill, CheckCircle2, 
  HelpCircle, Info, Sparkles, Filter, ChevronRight
} from 'lucide-react';

interface CorticoidItem {
  classe: string;
  potencyLabel: string;
  potencyBadgeColor: string;
  drugs: string[];
  indications: string;
  restrictedAreas: string;
  maxRecommendedDuration: string;
  typicalVehicles: string;
}

const CORTICOID_CLASSES: CorticoidItem[] = [
  {
    classe: 'Classe I',
    potencyLabel: 'Superpotente (Ultra-alta potência)',
    potencyBadgeColor: 'bg-red-950 text-red-300 border-red-800',
    drugs: [
      'Propionato de Clobetasol 0,05% (creme / pomada / solução capilar)',
      'Dipropionato de Betametasona 0,05% (fórmula otimizada em veículo glicol)'
    ],
    indications: 'Psoríase em placas espessas recalcitrantes (cotovelos, joelhos, couro cabeludo), líquen plano hipertrófico, líquen escleroso vulvar/peniano, dermatoses palmo-plantares.',
    restrictedAreas: 'ESTRITAMENTE CONTRAINDICADO na face, pálpebras, axilas, virilhas e sob oclusão prolongada.',
    maxRecommendedDuration: 'Máximo 2 a 3 semanas contínuas. Realizar desmame para dias alternados ou transição para classe média.',
    typicalVehicles: 'Pomada (placas hiperqueratóticas e fissuradas), Solução capilar ou Shampoo (couro cabeludo).'
  },
  {
    classe: 'Classe II',
    potencyLabel: 'Alta Potência',
    potencyBadgeColor: 'bg-orange-950 text-orange-300 border-orange-800',
    drugs: [
      'Dipropionato de Betametasona 0,05% (pomada convencional)',
      'Furoato de Mometasona 0,1% (pomada)',
      'Desoximetasona 0,25%',
      'Fluocinonida 0,05%'
    ],
    indications: 'Eczemas graves em tronco e membros, líquen simples crônico, psoríase moderada fora de dobras.',
    restrictedAreas: 'Evitar na face e dobras cutâneas.',
    maxRecommendedDuration: '2 a 4 semanas. Reavaliar resposta e reduzir frequência.',
    typicalVehicles: 'Pomada e creme.'
  },
  {
    classe: 'Classe III / IV',
    potencyLabel: 'Média-Alta e Média Potência',
    potencyBadgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    drugs: [
      'Furoato de Mometasona 0,1% (creme ou loção)',
      'Valerato de Betametasona 0,1% (creme ou pomada)',
      'Acetonido de Triancinolona 0,1%',
      'Propionato de Fluticasona 0,05% (creme)'
    ],
    indications: 'Dermatite atópica moderada em tronco e extremidades, dermatite de contato alérgica subaguda, eczema numular, pitiríase rósea pruriginosa.',
    restrictedAreas: 'Usar com cautela em dobras; evitar face prolongada.',
    maxRecommendedDuration: '3 a 6 semanas com redução gradual.',
    typicalVehicles: 'Creme (lesões subagudas), Loção (áreas extensas).'
  },
  {
    classe: 'Classe V / VI',
    potencyLabel: 'Baixa-Média e Baixa Potência',
    potencyBadgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    drugs: [
      'Desonida 0,05% (creme, loção ou pomada)',
      'Butirato de Hidrocortisona 0,1%',
      'Dipropionato de Alclometasona 0,05%'
    ],
    indications: 'Dermatite atópica em face, pálpebras e pescoço em crianças e adultos; intertrigo e áreas de dobras (axilas, virilhas, inframamária); dermatite seborreica facial.',
    restrictedAreas: 'Seguro para áreas sensíveis e uso pediátrico com monitoramento.',
    maxRecommendedDuration: '1 a 3 semanas na fase aguda; transição para emolientes ou inibidores de calcineurina.',
    typicalVehicles: 'Creme, loção cremosa e pomada suave.'
  },
  {
    classe: 'Classe VII',
    potencyLabel: 'Muito Baixa Potência',
    potencyBadgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
    drugs: [
      'Acetato de Hidrocortisona 1% ou 2,5% (creme ou pomada)',
      'Dexametasona 0,1% tópica'
    ],
    indications: 'Dermatoses leves em lactentes e recém-nascidos, dermatite da área das fraldas inflamatória refratária (curto prazo), dermatite de contato leve em face.',
    restrictedAreas: 'Baixo risco de efeitos adversos sistêmicos ou atrofia cutânea grave.',
    maxRecommendedDuration: 'Conforme necessidade clínica.',
    typicalVehicles: 'Creme suave.'
  }
];

export default function DermGuiaCorticoides() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'potencia' | 'veiculos' | 'seguranca_biologicos'>('potencia');

  const filteredClasses = selectedClass === 'all' 
    ? CORTICOID_CLASSES 
    : CORTICOID_CLASSES.filter(c => c.classe.toLowerCase().includes(selectedClass.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Sub-bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveTab('potencia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'potencia'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Pill size={15} />
          <span>Classes de Potência (SBD / AAD)</span>
        </button>

        <button
          onClick={() => setActiveTab('veiculos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'veiculos'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles size={15} />
          <span>Escolha do Veículo & Efeitos Adversos</span>
        </button>

        <button
          onClick={() => setActiveTab('seguranca_biologicos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'seguranca_biologicos'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck size={15} />
          <span>Checklist Pré-Imunobiológicos (SBD)</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: POTÊNCIA */}
      {/* =================================================================== */}
      {activeTab === 'potencia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Pill className="text-rose-400" size={22} />
                  Guia Prático de Corticoides Tópicos por Classes de Potência
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Classificação oficial em 7 grupos segundo a Sociedade Brasileira de Dermatologia (SBD) e a Academia Americana de Dermatologia (AAD).
                </p>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['all', 'Classe I', 'Classe II', 'Classe III', 'Classe V', 'Classe VII'].map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedClass(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap border cursor-pointer ${
                      selectedClass === c
                        ? 'border-rose-500 bg-rose-950 text-rose-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c === 'all' ? 'Todas as Classes' : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Corticoid Class Cards */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              {filteredClasses.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-black uppercase border ${item.potencyBadgeColor}`}>
                        {item.classe}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.potencyLabel}</h4>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      Duração máx: <strong className="text-slate-200">{item.maxRecommendedDuration.split('.')[0]}</strong>
                    </span>
                  </div>

                  {/* Drugs list */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Principais Moléculas e Apresentações:</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-200">
                      {item.drugs.map((drug, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-850">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                          <span>{drug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block">Indicações Típicas:</span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{item.indications}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/40 bg-rose-950/10 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-rose-400 block">Áreas Restritas / Cuidados:</span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{item.restrictedAreas}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-sky-400 block">Veículos Recomendados:</span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{item.typicalVehicles}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: VEÍCULOS & EFEITOS ADVERSOS */}
      {/* =================================================================== */}
      {activeTab === 'veiculos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" size={22} />
                Regras de Ouro para Escolha do Veículo Dermatológico
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                A mesma molécula ativa tem potência e penetração drasticamente diferentes dependendo do veículo farmacêutico escolhido.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase block">1. Pomada (Unguento)</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Base oclusiva oleosa (vaselina). Máxima hidratação e máxima penetração da droga.
                </p>
                <div className="p-2 rounded-lg bg-slate-900 text-[10px] text-slate-400">
                  <strong>Indicação:</strong> Lesões muito secas, hiperqueratóticas, liquenificadas e palmo-plantares.
                  <br /><strong>Evitar:</strong> Lesões exsudativas (úmidas) e áreas pilosas.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black text-cyan-400 uppercase block">2. Creme (Emulsão O/A)</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Emulsão de óleo em água. Fácil espalhabilidade e boa aceitação cosmética.
                </p>
                <div className="p-2 rounded-lg bg-slate-900 text-[10px] text-slate-400">
                  <strong>Indicação:</strong> Lesões subagudas, áreas de atrito, dobras e face.
                  <br /><strong>Vantagem:</strong> Não engordura a roupa e é bem tolerado pelo paciente.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black text-sky-400 uppercase block">3. Loção / Solução</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Base aquosa ou hidroalcoólica de baixa viscosidade que seca rapidamente.
                </p>
                <div className="p-2 rounded-lg bg-slate-900 text-[10px] text-slate-400">
                  <strong>Indicação:</strong> Áreas com pelos (couro cabeludo, barba, tórax) e lesões exsudativas.
                  <br /><strong>Cuidado:</strong> Soluções alcoólicas ardem em pele escoriada ou fissurada.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black text-purple-400 uppercase block">4. Espuma / Gel</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Veículos modernos de absorção imediata sem resíduo gorduroso.
                </p>
                <div className="p-2 rounded-lg bg-slate-900 text-[10px] text-slate-400">
                  <strong>Indicação:</strong> Psoríase e dermatite seborreica do couro cabeludo, acne e pele oleosa.
                  <br /><strong>Excelente adesão:</strong> Não deixa o cabelo ensebado.
                </div>
              </div>
            </div>

            {/* Adverse Effects Box */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3 text-xs">
              <span className="text-rose-400 font-bold uppercase flex items-center gap-1.5">
                <AlertTriangle size={16} /> Efeitos Adversos Locais e Sistêmicos da Corticoterapia Tópica
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 text-[11px]">
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Atrofia Epidérmica e Dérmica:</strong> Afinamento cutâneo progressivo com perda de colágeno, deixando a pele frágil como "papel de cigarro".</li>
                  <li><strong>Telangiectasias e Púrpura Senil Precoce:</strong> Ectasia vascular dérmica visível e fragilidade capilar aos mínimos traumas.</li>
                  <li><strong>Estrias Rubras Irreversíveis:</strong> Comuns quando corticoides potentes são usados indevidamente em axilas, mamas ou virilhas de jovens.</li>
                </ul>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Dermatite Perioral e Erupção Acneiforme:</strong> Rebote inflamatório e pústulas após uso continuado em face.</li>
                  <li><strong>Taquifilaxia:</strong> Perda progressiva da eficácia clínica pelo uso crônico diário sem pausas.</li>
                  <li><strong>Supressão do Eixo HHA & Síndrome de Cushing:</strong> Absorção sistêmica significante ao tratar grandes superfícies corporais com Classe I sob oclusão, especialmente em crianças.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: CHECKLIST PRÉ-IMUNOBIOLÓGICOS */}
      {/* =================================================================== */}
      {activeTab === 'seguranca_biologicos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" size={22} />
                Protocolo de Rastreio e Segurança Pré-Imunobiológicos (SBD / PCDT)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Rotina mandatória de exames laboratoriais e radiológicos antes de iniciar agentes anti-TNF (Adalimumabe, Infliximabe), anti-IL-17 (Secuquinumabe, Ixequizumabe) ou anti-IL-23 (Guselcumabe, Risanquizumabe).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 uppercase block text-[11px]">
                  1. Rastreio de Tuberculose Latente (ILTB)
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  O risco de reativação de TB é especialmente crítico com <strong>anti-TNF</strong>.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] space-y-1 text-slate-300">
                  <p>• <strong>PPD (teste tuberculínico)</strong> ou <strong>IGRA</strong> (Quantiferon-TB).</p>
                  <p>• <strong>Raio-X de tórax (PA e Perfil):</strong> descartar TB ativa ou sequela fibrocicatrizante.</p>
                  <p>• Se PPD &ge; 5 mm ou IGRA positivo sem TB ativa: <strong>iniciar Isoniazida (300 mg/dia por 9 meses ou Rifampicina por 4 meses)</strong> e aguardar pelo menos 30 dias de profilaxia antes de iniciar o imunobiológico.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-300 uppercase block text-[11px]">
                  2. Sorologias Virais Completas
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Risco de replicação e fulminação hepática sob imunossupressão.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] space-y-1 text-slate-300">
                  <p>• <strong>Hepatite B:</strong> HBsAg, Anti-HBc total e Anti-HBs. Se HBsAg (+) ou Anti-HBc (+) isolado, avaliar carga viral (HBV-DNA) e profilaxia com Entecavir antes do biológico.</p>
                  <p>• <strong>Hepatite C:</strong> Anti-HCV e HCV-RNA.</p>
                  <p>• <strong>HIV 1 e 2:</strong> Teste sorológico obrigatório.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-300 uppercase block text-[11px]">
                  3. Avaliação Clínica, Vacinas & Neoplasias
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Adequação vacinal e histórico de malignidade recente.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] space-y-1 text-slate-300">
                  <p>• <strong>Vacinas:</strong> Atualizar vacinas inativadas (Gripe, Pneumocócica, COVID-19). <strong>Vacinas de vírus vivo atenuado</strong> (Febre Amarela, Tríplice Viral, Varicela) são <strong>CONTRAINDICADAS</strong> durante o uso e devem ser feitas até 4 semanas antes.</p>
                  <p>• <strong>Insuficiência Cardíaca:</strong> Anti-TNF são contraindicados em IC classe funcional III e IV (NYHA).</p>
                  <p>• <strong>Doenças Desmielinizantes:</strong> Esclerose múltipla contraindica anti-TNF.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
