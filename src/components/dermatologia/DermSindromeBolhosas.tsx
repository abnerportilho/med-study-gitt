import React, { useState } from 'react';
import { 
  Droplets, Stethoscope, Dna, ShieldAlert, 
  AlertTriangle, CheckCircle2, Info, Layers
} from 'lucide-react';

export default function DermSindromeBolhosas() {
  const [activeTab, setActiveTab] = useState<'vulgar' | 'foliaceo' | 'penfigoide' | 'herpetiforme' | 'tabela'>('vulgar');

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'vulgar', label: 'Pênfigo Vulgar', badge: 'Anti-Dsg3 / Suprabasal' },
          { id: 'foliaceo', label: 'Pênfigo Foliáceo (Fogo Selvagem)', badge: 'Anti-Dsg1 / Subcórneo' },
          { id: 'penfigoide', label: 'Penfigoide Bolhoso (Idoso)', badge: 'Anti-BP180 / Subepidérmico' },
          { id: 'herpetiforme', label: 'Dermatite Herpetiforme', badge: 'Doença Celíaca / IgA' },
          { id: 'tabela', label: 'Tabela Diferencial & IFD', badge: 'Resumo de Prova' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{t.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeTab === t.id ? 'bg-rose-700/60 text-rose-100' : 'bg-slate-800 text-slate-400'}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. PÊNFIGO VULGAR */}
      {/* =================================================================== */}
      {activeTab === 'vulgar' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                Dermatose Bolhosa Autoimune Suprabasal
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Pênfigo Vulgar: Gravidade, Erosões e Acantólise
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Doença bolhosa autoimune grave com autoanticorpos IgG dirigidos contra as <strong>desmogleínas 3 e 1</strong> (componentes dos desmossomos). Causa perda de adesão intercelular intraepidérmica (<strong>acantólise</strong>) no estrato espinhoso logo acima da camada basal.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300">
                Nikolsky POSITIVO
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs font-bold text-rose-300">
                Acometimento Oral em 90%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-rose-400 block">Quadro Clínico & Semiológico</span>
              <ul className="space-y-2 text-slate-300 leading-relaxed text-[11px]">
                <li>• <strong>Lesões Orais Precoces (90% dos casos):</strong> Erosões dolorosas extensas na mucosa jugal, gengivas e palato que precedem as lesões cutâneas em semanas a meses. Disfagia intensa e perda de peso.</li>
                <li>• <strong>Bolhas Flácidas Cutâneas:</strong> De paredes extremamente finas que se rompem muito facilmente. O paciente quase sempre se apresenta com <strong>erosões dolorosas exsudativas</strong> e crostas sangrantes, e raramente com bolhas intactas.</li>
                <li>• <strong>Sinal de Nikolsky I (+):</strong> Fricção tangencial da pele sã adjacente provoca descolamento epidérmico imediato.</li>
                <li>• <strong>Sinal de Asboe-Hansen (+):</strong> Pressão vertical sobre o teto de uma bolha intacta espalha o líquido lateralmente.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 block">Diagnóstico Laboratorial & Terapêutica</span>
              <ul className="space-y-2 text-slate-300 leading-relaxed text-[11px]">
                <li>• <strong>Citodiagnóstico de Tzanck:</strong> Células acantolíticas gigantes, arredondadas, com núcleos volumosos e hipercromáticos.</li>
                <li>• <strong>Biópsia com H&E:</strong> Clivagem intraepidérmica <strong>suprabasal</strong> com fileira de células basais intactas ("aspecto em lápides de cemitério").</li>
                <li>• <strong>Imunofluorescência Direta (IFD):</strong> Depósito de IgG e C3 intercelular na epiderme com <strong>padrão em "rede", "malha" ou "teia de aranha"</strong>.</li>
                <li>• <strong>Tratamento Padrão:</strong> Prednisona em altas doses (1 a 1,5 mg/kg/dia) associada a <strong>Rituximabe (anti-CD20)</strong> como 1ª linha moderna, ou imunossupressores poupadores (Azatioprina, Micofenolato de Mofetila).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. PÊNFIGO FOLIÁCEO */}
      {/* =================================================================== */}
      {activeTab === 'foliaceo' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                Dermatose Bolhosa Subcórnea · Fogo Selvagem
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Pênfigo Foliáceo (Fogo Selvagem)
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Forma endêmica comum no Brasil (Centro-Oeste, SP, MG e bacias hidrográficas), associada a picadas do mosquito borrachudo (<em>Simulium nigrimanum</em>). Autoanticorpos IgG4 exclusivamente contra <strong>Desmogleína 1 (Dsg1)</strong>.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-xs font-bold text-emerald-300">
                MUCOSA ORAL TOTALMENTE POUPADA!
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">Diferenças Semiológicas Críticas</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Como a desmogleína 1 está concentrada nas camadas mais superficiais da epiderme, a clivagem é <strong>subcórnea (muito superficial)</strong>.
              </p>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li>• As bolhas se rompem antes mesmo de serem vistas. O quadro se manifesta por <strong>lesões eritematodescamativas e crostosas</strong> ("foliáceas" / escamas com aspecto de folhas secas ou flocos de milho) em couro cabeludo, face ("asa de borboleta") e tronco superior.</li>
                <li>• <strong>Ausência Total de Lesões Orais:</strong> A mucosa oral expressa primariamente Desmogleína 3, que compensa a perda de Dsg1. Se houver úlcera oral, NÃO É FOLIÁCEO!</li>
                <li>• <strong>Sinal de Nikolsky:</strong> POSITIVO.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 block">Histologia, IFD e Terapêutica</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>Histopatologia:</strong> Acantólise na camada subcórnea ou granulosa.</li>
                <li>• <strong>Imunofluorescência Direta (IFD):</strong> Depósitos intercelulares de IgG restritos à porção alta da epiderme.</li>
                <li>• <strong>Tratamento:</strong> Corticoterapia sistêmica (Prednisona 0,5 a 1 mg/kg/dia). Formas localizadas podem responder a corticoides tópicos de alta potência. Casos graves: Rituximabe, Azatioprina ou Dapsona.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. PENFIGOIDE BOLHOSO */}
      {/* =================================================================== */}
      {activeTab === 'penfigoide' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                Dermatose Bolhosa Subepidérmica do Idoso
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Penfigoide Bolhoso: Bolhas Tensas e Nikolsky Negativo
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                A doença bolhosa autoimune mais prevalente. Acomete quase que exclusivamente <strong>idosos acima de 60–70 anos</strong>. Autoanticorpos IgG contra os antígenos do hemidesmossomo na zona da membrana basal: <strong>BP180 (colágeno XVII)</strong> e <strong>BP230</strong>.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                Nikolsky NEGATIVO
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-200">
                Bolhas TENSAS e Resistentes
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">Apresentação Clínica</span>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Fase Prodrômica Pruriginosa:</strong> Semanas a meses antes do aparecimento das bolhas, o paciente apresenta <strong>prurido intratável</strong> e placas urticadas ou eczematosas sem bolha.</li>
                <li>• <strong>Fase Bolhosa Clássica:</strong> Múltiplas <strong>bolhas grandes, TENSAS e resistentes</strong> sobre base eritematosa ou pele sã, com conteúdo seroso límpido ou hemorrágico. Como o teto é formado pela epiderme inteira, as bolhas não estouram facilmente e permanecem por dias.</li>
                <li>• <strong>Distribuição:</strong> Abdome inferior, virilhas, axilas e superfícies flexoras dos membros. Acometimento oral é RARO (menos de 10–20%).</li>
                <li>• <strong>Sinal de Nikolsky: NEGATIVO!</strong></li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-emerald-300 block">Diagnóstico & Terapêutica de Escolha</span>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Biópsia:</strong> Clivagem <strong>subepidérmica</strong> com infiltrado dérmico rico em <strong>eosinófilos</strong>.</li>
                <li>• <strong>Imunofluorescência Direta (IFD):</strong> Depósito <strong>linear contínuo de IgG e C3 na Zona da Membrana Basal (ZMB)</strong>.</li>
                <li>• <strong>Tratamento de Escolha (Estudo Francês Lancet):</strong> Corticoterapia tópica de ultra-alta potência em corpo inteiro (<strong>Clobetasol 0,05% pomada 20 a 30 g/dia</strong>) tem eficácia idêntica à prednisona oral, porém com <strong>mortalidade e infecções 50% menores no idoso frágil</strong>.</li>
                <li>• Casos refratários: Prednisona oral baixa (0,5 mg/kg/dia), Metotrexato ou Doxiciclina + Nicotinamida.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. DERMATITE HERPETIFORME */}
      {/* =================================================================== */}
      {activeTab === 'herpetiforme' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Doença Celíaca Cutânea · Doença de Duhring-Brocq
            </span>
            <h2 className="text-2xl font-black text-white">Dermatite Herpetiforme (Duhring-Brocq)</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Manifestação cutânea autoimune da sensibilidade ao glúten. Praticamente <strong>100% dos pacientes têm enteropatia ao glúten (Doença Celíaca)</strong> na biópsia intestinal, mesmo sem queixas gastrointestinais francas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 block uppercase text-[11px]">1. Quadro Clínico Típico</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Pápulas e <strong>pequenas vesículas agrupadas</strong> (aspecto em buquê "herpetiforme") sobre base eritematosa, com <strong>prurido e queimação excruciantes</strong>.
              </p>
              <p className="text-[10px] text-slate-400">
                Pelo prurido violento, as vesículas são rompidas pelo próprio paciente, restando apenas escoriações e crostas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 block uppercase text-[11px]">2. Distribuição Simétrica</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Acomete rigorosamente superfícies extensoras de forma bilateral e simétrica: <strong>cotovelos, joelhos, nádegas/região sacral, escápulas e couro cabeludo</strong>.
              </p>
              <p className="text-[10px] text-slate-400">
                Associação genética universal com <strong>HLA-DQ2 e HLA-DQ8</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 block uppercase text-[11px]">3. IFD & Tratamento Específico</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>IFD (Padrão-Ouro):</strong> Depósito <strong>granular de IgA nos ápices das papilas dérmicas</strong>.
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] space-y-1">
                <p>• <strong>Dapsona (Diaminodifenilsulfona):</strong> 50 a 100 mg/dia. Alívio dramático do prurido em 24 a 48 horas (teste terapêutico). Atenção: dosar G6PD antes pelo risco de hemólise.</p>
                <p>• <strong>Dieta 100% sem glúten por toda a vida:</strong> Única medida que previne o Linfoma Intestinal (EATL) a longo prazo.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. TABELA COMPARATIVA COMPLETA */}
      {/* =================================================================== */}
      {activeTab === 'tabela' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <h3 className="text-xl font-black text-white">Tabela Comparativa Oficial das Doenças Bolhosas</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-3">Doença</th>
                  <th className="p-3">Clivagem / Histologia</th>
                  <th className="p-3">Antígeno Alvo</th>
                  <th className="p-3">Aspecto da Bolha</th>
                  <th className="p-3">Mucosa Oral</th>
                  <th className="p-3">Nikolsky</th>
                  <th className="p-3">Imunofluorescência Direta (IFD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                <tr>
                  <td className="p-3 font-bold text-rose-400">Pênfigo Vulgar</td>
                  <td className="p-3">Intraepidérmica <strong>Suprabasal</strong> (acantólise)</td>
                  <td className="p-3 font-mono">Desmogleína 3 e 1</td>
                  <td className="p-3"><strong>Flácida</strong> (erosões dolorosas)</td>
                  <td className="p-3 font-bold text-rose-400">SIM (90% dos casos)</td>
                  <td className="p-3 font-bold text-rose-400">POSITIVO</td>
                  <td className="p-3">IgG intercelular em <strong>rede / malha</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">Pênfigo Foliáceo</td>
                  <td className="p-3">Intraepidérmica <strong>Subcórnea</strong></td>
                  <td className="p-3 font-mono">Desmogleína 1 (Dsg1)</td>
                  <td className="p-3">Crostas foliáceas descamativas</td>
                  <td className="p-3 font-bold text-emerald-400">NÃO (Poupada)</td>
                  <td className="p-3 font-bold text-rose-400">POSITIVO</td>
                  <td className="p-3">IgG na epiderme alta subcórnea</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyan-400">Penfigoide Bolhoso</td>
                  <td className="p-3"><strong>Subepidérmica</strong> com eosinófilos</td>
                  <td className="p-3 font-mono">BP180 e BP230</td>
                  <td className="p-3"><strong>TENSA</strong> e resistente</td>
                  <td className="p-3">Raro (&lt; 15%)</td>
                  <td className="p-3 font-bold text-emerald-400">NEGATIVO</td>
                  <td className="p-3">IgG e C3 <strong>linear na ZMB</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-400">Dermatite Herpetiforme</td>
                  <td className="p-3"><strong>Subepidérmica</strong> nos ápices papilares</td>
                  <td className="p-3 font-mono">Transglutaminase epidérmica</td>
                  <td className="p-3">Microvesículas agrupadas simétricas</td>
                  <td className="p-3">Ausente</td>
                  <td className="p-3 font-bold text-emerald-400">NEGATIVO</td>
                  <td className="p-3"><strong>IgA granular</strong> nas papilas dérmicas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
