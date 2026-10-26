import React, { useState } from 'react';
import { 
  Dna, Eye, ShieldAlert, AlertTriangle, 
  CheckCircle2, Info, Sparkles, Filter, Scissors
} from 'lucide-react';

export default function DermSindromeNeoplasias() {
  const [activeTab, setActiveTab] = useState<'melanoma' | 'cbc' | 'cec' | 'ceratose'>('melanoma');

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'melanoma', label: 'Melanoma Cutâneo (ABCDE & Breslow)', badge: 'Margens & Sentinela' },
          { id: 'cbc', label: 'Carcinoma Basocelular (CBC)', badge: 'Perláceo & Telangiectasias' },
          { id: 'cec', label: 'Carcinoma Espinocelular (CEC)', badge: 'Queilite Actínica & Metástase' },
          { id: 'ceratose', label: 'Ceratose Actínica (Pré-Maligna)', badge: 'Pele em Lixa / 5-FU' }
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
      {/* 1. MELANOMA */}
      {/* =================================================================== */}
      {activeTab === 'melanoma' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Oncologia Cutânea · Protocolo SBD / NCCN / AJCC 8ª Edição
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Melanoma Maligno: Rastreio ABCDE, Breslow e Margens
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Embora represente menos de 5% dos tumores cutâneos, é responsável por mais de <strong>80% das mortes por câncer de pele</strong> devido à sua alta capacidade metastática linfática e hematogênica.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300">
                  Espessura de Breslow (mm)
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800 text-xs font-bold text-purple-200">
                  Sinal do Patinho Feio
                </div>
              </div>
            </div>

            {/* ABCDE Matrix */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-purple-300 block">Regra Semiológica do ABCDE do Melanoma</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-base font-black text-rose-400 block">A</span>
                  <strong className="text-white text-xs block mt-1">Assimetria</strong>
                  <p className="text-[11px] text-slate-400 mt-1">Dividindo a lesão ao meio em dois eixos, as metades não coincidem em formato.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-base font-black text-amber-400 block">B</span>
                  <strong className="text-white text-xs block mt-1">Bordas Irregulares</strong>
                  <p className="text-[11px] text-slate-400 mt-1">Contornos entalhados, denteados, geográficos ou imprecisos que esmaecem.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-base font-black text-cyan-400 block">C</span>
                  <strong className="text-white text-xs block mt-1">Cores Múltiplas</strong>
                  <p className="text-[11px] text-slate-400 mt-1">Variação de 3 ou mais tonalidades (preto, marrom escuro, azul, cinza, vermelho e branco).</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-base font-black text-emerald-400 block">D</span>
                  <strong className="text-white text-xs block mt-1">Diâmetro &gt; 6 mm</strong>
                  <p className="text-[11px] text-slate-400 mt-1">Dimensão maior que a borracha de um lápis convencional (6 mm).</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-base font-black text-purple-400 block">E</span>
                  <strong className="text-white text-xs block mt-1">Evolução Rápida</strong>
                  <p className="text-[11px] text-slate-400 mt-1">O critério mais sensível: alteração documentada de tamanho, forma, cor, elevação ou sangramento.</p>
                </div>
              </div>
            </div>

            {/* Breslow & Surgical Margins Table */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scissors className="text-purple-400" size={16} />
                  Espessura de Breslow e Margens Cirúrgicas Definitivas
                </h3>
                <span className="text-[11px] font-mono text-slate-400">AJCC / NCCN Guidelines</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                      <th className="p-3">Estádio T (Breslow)</th>
                      <th className="p-3">Espessura Histológica</th>
                      <th className="p-3 text-purple-300">Margem Cirúrgica Recomendada</th>
                      <th className="p-3 text-amber-300">Biópsia de Linfonodo Sentinela (BLS)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                    <tr>
                      <td className="p-3 font-mono font-bold text-white">Tis (In Situ)</td>
                      <td className="p-3">Restrito à epiderme (Breslow 0 mm)</td>
                      <td className="p-3 font-bold text-emerald-400">0,5 a 1,0 cm</td>
                      <td className="p-3 text-slate-500">Não indicada</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-white">T1a / T1b</td>
                      <td className="p-3">&le; 1,0 mm (fino)</td>
                      <td className="p-3 font-bold text-emerald-400">1,0 cm</td>
                      <td className="p-3">Indicada se <strong>Breslow &ge; 0,8 mm</strong> ou se houver <strong>ulceração</strong></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-white">T2</td>
                      <td className="p-3">1,01 a 2,0 mm (intermediário)</td>
                      <td className="p-3 font-bold text-amber-400">1,0 a 2,0 cm</td>
                      <td className="p-3 font-bold text-amber-300">SIM, sempre indicada</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-white">T3 / T4</td>
                      <td className="p-3">&gt; 2,0 mm (espesso)</td>
                      <td className="p-3 font-bold text-rose-400">2,0 cm</td>
                      <td className="p-3 font-bold text-amber-300">SIM, sempre indicada</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Golden Rule of Biopsy */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs text-slate-300 space-y-1">
              <strong className="text-amber-300 flex items-center gap-1.5">
                <AlertTriangle size={15} /> Regra de Ouro da Biópsia de Lesão Suspeita de Melanoma
              </strong>
              <p>
                <strong>SEMPRE REALIZAR BIÓPSIA EXCISIONAL</strong> com margem mínima de 1 a 2 mm de pele sã e tecido celular subcutâneo. <strong>NUNCA realizar shave (raspagem), curetagem ou cauterização</strong>, pois destroem a base tumoral e impedem a mensuração do Índice de Breslow, inviabilizando o estadiamento oncológico!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. CBC */}
      {/* =================================================================== */}
      {activeTab === 'cbc' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Neoplasia Maligna Mais Comum no Ser Humano (75–80%)
            </span>
            <h2 className="text-2xl font-black text-white">Carcinoma Basocelular (CBC)</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Origina-se das células da camada basal da epiderme e anexos pilosos. Crescimento lento, localmente invasivo e destrutivo ("ulcus rodens"), mas com <strong>taxa de metástase ínfima (&lt; 0,1%)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">Subtipos Clínico-Patológicos</span>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Nodular / Nódulo-Ulcerado (60%):</strong> Pápula ou nódulo translúcido de <strong>aspecto perláceo com telangiectasias arboriformes</strong> na superfície e bordas elevadas enroladas. Pode ulcerar no centro e sangrar aos traumas mínimos. Predomínio em face (nariz).</li>
                <li>• <strong>Superficial (15%):</strong> Placa eritematosa descamativa fina bem delimitada no tronco, simulando eczema ou psoríase, mas com fino bordo perláceo visível à dermatoscopia.</li>
                <li>• <strong>Pigmentado:</strong> Contém melanina (glóbulos castanhos/azulados à dermatoscopia). Diagnóstico diferencial com melanoma nodular.</li>
                <li>• <strong>Esclerodermiforme / Infiltrativo (Alto Risco):</strong> Placa endurecida amarelada que lembra cicatriz ("fibrose"). Limites microscópicos imprecisos com alta taxa de recidiva local.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 block">Conduta Cirúrgica & Tratamento</span>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Excisão Cirúrgica Convencional:</strong> Margem de segurança de <strong>4 mm de pele sã</strong> para lesões de baixo risco.</li>
                <li>• <strong>Cirurgia Micrográfica de Mohs (Padrão-Ouro):</strong> Indicada para CBCs em face/zona H (nariz, pálpebras, lábios, orelhas), lesões recidivadas ou subtipo esclerodermiforme. Permite 100% de controle histológico das margens no intraoperatório preservando tecido nobre.</li>
                <li>• <strong>Opções Não-Cirúrgicas (apenas para CBC superficial pequeno):</strong> Imiquimode 5% tópico ou Crioterapia.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. CEC */}
      {/* =================================================================== */}
      {activeTab === 'cec' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Segunda Neoplasia Cutânea Mais Comum (≈ 20%)
            </span>
            <h2 className="text-2xl font-black text-white">Carcinoma Espinocelular (CEC)</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Proliferação maligna de ceratinócitos da camada espinhosa. Relação direta com <strong>exposição solar cumulativa crônica ao longo da vida</strong>. Apresenta risco real de <strong>metástase linfonodal regional (5 a 10%)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-rose-300 block">Apresentação Clínica & Sítios de Alto Risco</span>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Lesão Típica:</strong> Nódulo ou placa ceratótica, hiperqueratosa, endurada, infiltrada, frequentemente ulcerada e recoberta por crostas hemáticas que sangra facilmente.</li>
                <li>• <strong>Lábio Inferior (Queilite Actínica):</strong> Alto risco metastático em homens tabagistas/trabalhadores rurais.</li>
                <li>• <strong>Orelhas, Dorso das Mãos e Couro Cabeludo Calvo:</strong> Sítios clássicos fotoexpostos.</li>
                <li>• <strong>Úlcera de Marjolin:</strong> CEC agressivo que surge sobre cicatrizes de queimaduras antigas ou fístulas de osteomielite crônica.</li>
                <li>• <strong>Ceratoacantoma:</strong> Variante de crescimento ultrarrápido (semanas) com cratera central preenchida por rolha córnea volumosa.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-emerald-300 block">Conduta e Estadiamento</span>
              <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Excisão Cirúrgica:</strong> Margens mínimas de <strong>4 a 6 mm</strong> para lesões de baixo risco (&lt; 2 cm) e <strong>&ge; 6 mm a 1 cm</strong> para alto risco (&gt; 2 cm, espessura &gt; 2 mm, imunodeprimidos, lábio/orelha).</li>
                <li>• <strong>Palpação Linfonodal Obrigatória:</strong> Sempre palpar cadeias cervicais, axilares e epitrocleares. Se linfonodomegalia: PAAF e esvaziamento ganglionar.</li>
                <li>• <strong>Pacientes Transplantados de Órgãos Sólidos:</strong> Risco até 65 a 100 vezes maior de desenvolver CECs múltiplos e agressivos devido à imunossupressão crônica.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. CERATOSE ACTÍNICA */}
      {/* =================================================================== */}
      {activeTab === 'ceratose' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Lesão Pré-Maligna mais Frequente
            </span>
            <h2 className="text-2xl font-black text-white">Ceratose Actínica: "Mais Palpável do que Visível"</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Proliferação intraepidérmica de queratinócitos atípicos induzida por radiação ultravioleta. Considerada por muitos autores como um <strong>CEC in situ incipiente</strong>. O conceito de "campo de cancerização" dita que toda a pele fotodanificada ao redor tem mutações latentes de p53.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 block uppercase text-[11px]">Semiologia Típica</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Máculas ou pápulas eritematosas recobertas por escama seca e áspera e aderente que confere sensação de <strong>"lixa de parede" à palpação</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-300 block uppercase text-[11px]">Sinais de Malignização para CEC</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Induração na base da lesão, aumento rápido de espessura, formação de corno cutâneo, dor, ulceração ou sangramento ao toque.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 block uppercase text-[11px]">Tratamento do Campo de Cancerização</span>
              <div className="space-y-1 text-slate-400 text-[10px]">
                <p>• <strong>Crioterapia com N2 líquido:</strong> Para lesões isoladas evidentes.</p>
                <p>• <strong>5-Fluorouracil (5-FU 5%) creme:</strong> Aplicação 1 a 2x/dia por 2 a 4 semanas. Causa eritema e erosão curativa no campo todo.</p>
                <p>• <strong>Imiquimode 5% creme:</strong> Imunomodulador 3x/semana por 4 a 8 semanas.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
