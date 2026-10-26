import React, { useState } from 'react';
import { 
  Dna, Sparkles, Layers, ShieldCheck, CheckCircle2, 
  AlertTriangle, ArrowRight, Activity, Microscope, SplitSquareVertical
} from 'lucide-react';

export default function MalignasPatologiaBiomarcadores() {
  const [activeTab, setActiveTab] = useState<'espectro' | 'cdis_membrana' | 'histologia' | 'nottingham' | 'biomarcadores' | 'prognostico'>('espectro');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 4 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950 text-purple-400 border border-purple-800">
            <Microscope size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">
              Eixo 4 · Anatomia Patológica & Biologia Tumoral
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              O Que a Patologia Precisa Responder
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O laudo patológico responde a quatro perguntas cardinais: <em>In situ</em> ou invasivo? Qual o tipo histológico? Qual o grau de Nottingham? E qual o perfil biológico imunohistoquímico? É essa conversa entre patologia e oncologia que define a predição e o tratamento sistêmico.
        </p>

        {/* NAVEGAÇÃO DE SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'espectro', label: '1. Espectro & Lesões de Alto Risco (B3)' },
            { id: 'cdis_membrana', label: '2. CDIS & A Membrana Basal' },
            { id: 'histologia', label: '3. Tipos Histológicos Invasivos' },
            { id: 'nottingham', label: '4. Grau de Nottingham (1 a 3)' },
            { id: 'biomarcadores', label: '5. Painel de Biomarcadores & Subtipos' },
            { id: 'prognostico', label: '6. Prognóstico vs Predição' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. ESPECTRO & LESÕES DE ALTO RISCO (B3) */}
      {activeTab === 'espectro' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Layers className="text-purple-400" size={20} />
              Existe um Espectro Contínuo de Alterações Epiteliais
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O câncer de mama raramente surge de forma súbita: na maioria das vezes, desenvolve-se através de um contínuo biológico que vai desde a proliferação benigna sem atipia até o carcinoma invasor metastático.
            </p>

            {/* FLUXOGRAMA DE ETAPAS */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 font-bold">FASE 1</span>
                <strong className="text-white block">Proliferação sem atipia</strong>
                <p className="text-slate-400 text-[11px]">Ex: Hiperplasia ductal usual. Risco muito baixo.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 font-bold">FASE 2</span>
                <strong className="text-amber-300 block">Atipia celular (B3)</strong>
                <p className="text-slate-400 text-[11px]">HDA, HLA, AEP. Lesões limítrofes marcadoras de risco.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-900/80 space-y-1.5">
                <span className="text-[10px] font-mono text-purple-400 font-bold">FASE 3</span>
                <strong className="text-purple-300 block">Carcinoma in situ</strong>
                <p className="text-slate-400 text-[11px]">CDIS / CLIS. Maligno, mas confinado à membrana basal.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/80 space-y-1.5">
                <span className="text-[10px] font-mono text-rose-400 font-bold">FASE 4</span>
                <strong className="text-rose-300 block">Microinvasão</strong>
                <p className="text-slate-400 text-[11px]">Rompimento focal ≤ 1 mm além da membrana basal.</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-700 space-y-1.5">
                <span className="text-[10px] font-mono text-rose-300 font-bold">FASE 5</span>
                <strong className="text-rose-200 block">Carcinoma invasivo</strong>
                <p className="text-slate-300 text-[11px]">Infiltração estromal franca e potencial de metástase.</p>
              </div>
            </div>
          </div>

          {/* TABELA DE LESÕES B3 */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <AlertTriangle className="text-amber-400" size={18} />
              Lesões de Alto Risco / B3: O Nome Não Define Sozinho a Conduta
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Lesão Histológica</th>
                    <th className="p-3">Mensagem Prática & Conduta Clínica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-amber-300">AEP (Atipia Epitelial Plana)</td>
                    <td className="p-3 text-slate-300">Observar se pura, concordante e sem resíduo suspeito na imagem pós-biópsia.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-rose-300">HDA (Hiperplasia Ductal Atípica)</td>
                    <td className="p-3 text-slate-300"><strong>Risco de subestimação diagnóstica de 10% a 30%</strong> em relação a CDIS/invasor adjacente; frequentemente exige <strong>excisão cirúrgica</strong>.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">HLA (Hiperplasia Lobular Atípica)</td>
                    <td className="p-3 text-slate-300">Marcador de risco bilateral; selecionar observação rigorosa ou excisão conforme a extensão.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-purple-300">CLIS Clássico (Carcinoma Lobular In Situ)</td>
                    <td className="p-3 text-slate-300">Marcador de risco bilateral para ambas as mamas; discutir vigilância intensiva e redução de risco com quimioprevenção.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-red-400">CLIS Pleomórfico ou Florido</td>
                    <td className="p-3 text-slate-300">Maior preocupação oncológica e comportamento biológico agressivo; exige <strong>abordagem cirúrgica com margens livres</strong>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. CDIS & A MEMBRANA BASAL */}
      {activeTab === 'cdis_membrana' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-purple-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-purple-300 text-base">
                CDIS é Maligno, Mas Ainda Não é Invasivo
              </span>
              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-xl border border-purple-800">
                Carcinoma Ductal In Situ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-purple-300 text-sm block">O Que Define o CDIS:</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Proliferação epitelial citologicamente maligna.</li>
                  <li>• <strong>Membrana basal 100% preservada e intacta.</strong></li>
                  <li>• Ausência completa de invasão do estroma ou dos canais linfáticos.</li>
                  <li>• Apresenta-se tipicamente como <strong>microcalcificações agrupadas</strong> na mamografia.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 text-sm block">O Que Importa no Laudo de CDIS:</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Grau nuclear:</strong> Baixo, intermediário ou alto grau.</li>
                  <li>• Presença de <strong>necrose</strong> (comedonecrose confere maior risco de recorrência).</li>
                  <li>• Extensão do acometimento em milímetros.</li>
                  <li>• <strong>Margens cirúrgicas:</strong> Margem mínima livre de ≥ 2 mm é o padrão áureo de segurança!</li>
                  <li>• Pesquisa de Receptores Hormonais (RE/RP) se indicada terapia endócrina.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* A MEMBRANA BASAL SEPARA DOIS MUNDOS */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <SplitSquareVertical className="text-cyan-400" size={20} />
              A Membrana Basal Separa Dois Mundos
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-2">
                <span className="font-bold text-purple-300 text-sm">Carcinoma In Situ</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Confinado estritamente ao lúmen do ducto ou lóbulo.</li>
                  <li>• <strong>Sem acesso estromal direto</strong>, portanto não toca vasos sanguíneos ou linfáticos.</li>
                  <li>• <strong>Sem potencial metastático</strong> enquanto não for invasivo!</li>
                  <li>• O tratamento cirúrgico e radioterápico visa evitar recorrência local e progressão invasiva.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/80 space-y-2">
                <span className="font-bold text-rose-300 text-sm">Carcinoma Invasivo</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Ultrapassa e rompe a membrana basal.</strong></li>
                  <li>• Infiltra o estroma interlobular e a matriz de colágeno.</li>
                  <li>• <strong>Pode atingir canais linfáticos e vasos sanguíneos.</strong></li>
                  <li>• Adquire potencial biológico de disseminação sistêmica e exige estadiamento TNM e perfil de biomarcadores.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TIPOS HISTOLÓGICOS INVASIVOS */}
      {activeTab === 'histologia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Microscope className="text-purple-400" size={20} />
              Tipos Histológicos Não São Subtipos Moleculares
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O tipo histológico descreve a morfologia das células ao microscópio óptico sob coloração de hematoxilina-eosina, enquanto os subtipos moleculares traduzem o perfil genômico e proteico tumoral.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Tipo Histológico</th>
                    <th className="p-3">Frequência</th>
                    <th className="p-3">Ponto Clínico & Comportamento Biológico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-white">Invasivo de Tipo Não Especial (NST / Ductal)</td>
                    <td className="p-3 font-mono text-slate-400">~75%</td>
                    <td className="p-3 text-slate-300"><strong>Mais frequente.</strong> Apresenta-se tipicamente como massa espiculada densa. Ampla diversidade molecular.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">Carcinoma Lobular Invasivo (CLI)</td>
                    <td className="p-3 font-mono text-slate-400">~10-15%</td>
                    <td className="p-3 text-slate-300">Perda da molécula de adesão E-caderina (células em "fila indiana"). Pode ser <strong>multifocal, multicêntrico ou bilateral</strong>; padrão metastático atípico (peritônio, TGI, ovários).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-300">Tubular / Mucinoso</td>
                    <td className="p-3 font-mono text-slate-400">~2-5%</td>
                    <td className="p-3 text-slate-300">Em geral, comportamento <strong>muito mais favorável</strong>, com baixa taxa de metástase axilar e forte expressão hormonal (Luminal A).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Carcinoma Micropapilar Invasivo</td>
                    <td className="p-3 font-mono text-slate-400">~1-2%</td>
                    <td className="p-3 text-slate-300">Marcada e precoce tendência à <strong>invasão linfovascular</strong> e alta carga linfonodal axilar.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-rose-400">Carcinoma Metaplásico</td>
                    <td className="p-3 font-mono text-slate-400">&lt; 1%</td>
                    <td className="p-3 text-slate-300">Raro, volumoso e heterogêneo; frequentemente triplo-negativo e com menor sensibilidade aos esquemas quimioterápicos habituais.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. GRAU HISTOLÓGICO DE NOTTINGHAM */}
      {activeTab === 'nottingham' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Activity className="text-rose-400" size={20} />
              Três Critérios Formam o Grau de Nottingham (Sistema Elston-Ellis)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O grau histológico quantifica o nível de desdiferenciação celular e agressividade replicativa tumoral através da soma de 1 a 3 pontos em três critérios morfológicos:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-300 text-sm block">1. Formação Tubular</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Avalia a capacidade do tumor de produzir arranjos tubulares/glandulares organizados (1 pt: &gt; 75%; 2 pts: 10-75%; 3 pts: &lt; 10%).
                </p>
                <div className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded-lg border border-cyan-800 inline-block">
                  1 a 3 Pontos
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-300 text-sm block">2. Pleomorfismo Nuclear</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Avalia a variação no tamanho, forma, cromatina e proeminência dos nucléolos das células tumorais em relação aos núcleos normais.
                </p>
                <div className="text-[10px] font-mono text-rose-400 font-bold bg-rose-950 px-2 py-0.5 rounded-lg border border-rose-800 inline-block">
                  1 a 3 Pontos
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-300 text-sm block">3. Índice Mitótico</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Contagem de figuras de divisão mitótica ativa por campo de grande aumento ao microscópio calibrado (1 pt: baixo; 2 pts: moderado; 3 pts: alto).
                </p>
                <div className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950 px-2 py-0.5 rounded-lg border border-purple-800 inline-block">
                  1 a 3 Pontos
                </div>
              </div>
            </div>

            {/* SOMA E GRAU */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-800 space-y-1">
                <div className="text-emerald-400 font-mono font-bold text-sm">Grau 1 (Soma 3 a 5)</div>
                <strong className="text-white block">Bem Diferenciado</strong>
                <p className="text-slate-400 text-[11px]">Menor agressividade biológica e proliferação mais lenta.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800 space-y-1">
                <div className="text-amber-400 font-mono font-bold text-sm">Grau 2 (Soma 6 a 7)</div>
                <strong className="text-white block">Moderadamente Diferenciado</strong>
                <p className="text-slate-400 text-[11px]">Agressividade biológica intermediária.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800 space-y-1">
                <div className="text-rose-400 font-mono font-bold text-sm">Grau 3 (Soma 8 a 9)</div>
                <strong className="text-white block">Pouco Diferenciado</strong>
                <p className="text-slate-400 text-[11px]">Alta agressividade, alta taxa mitótica e replicação acelerada.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PAINEL DE BIOMARCADORES & SUBTIPOS */}
      {activeTab === 'biomarcadores' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Dna className="text-cyan-400" size={20} />
              O Painel Mínimo Conecta a Patologia ao Tratamento
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              A imunohistoquímica é obrigatória em todo carcinoma invasor de mama para definir o perfil biológico e guiar a terapia-alvo e hormonal.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Marcador Imunohistoquímico</th>
                    <th className="p-3">O Que Informa na Prática</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-purple-300">RE / RP (Receptores de Estrogênio e Progesterona)</td>
                    <td className="p-3 text-slate-300">Indica sensibilidade aos hormônios esteroides e a <strong>alta probabilidade de benefício da terapia endócrina</strong> (tamoxifeno, inibidores da aromatase). Positivo se ≥ 1%.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-rose-400">HER2 (*Human Epidermal Growth Factor Receptor 2*)</td>
                    <td className="p-3 text-slate-300">Informa biologia tumoral agressiva e a <strong>indicação formal de terapia anti-HER2</strong> (trastuzumabe, pertuzumabe). Escore 3+ ou 2+ com FISH amplificado.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Ki-67</td>
                    <td className="p-3 text-slate-300">Estimativa do <strong>índice de proliferação celular</strong> ativo; valores elevados (&gt; 20-30%) sugerem maior benefício potencial com quimioterapia citotóxica.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">Grau Histológico</td>
                    <td className="p-3 text-slate-300">Nível de diferenciação morfológica e prognóstico independente.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-red-400">Invasão Linfovascular (ILV)</td>
                    <td className="p-3 text-slate-300">Êmbolos tumorais em vasos capilares e linfáticos; prediz <strong>maior risco de disseminação axilar e recidiva</strong> locorregional.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SUBTIPOS CLÍNICOS E HER2-LOW */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="text-amber-400" size={18} />
              Subtipos Clínicos e a Lógica Terapêutica Sistêmica
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-300 text-sm">Perfil Luminal (A e B)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Receptores hormonais positivos (RE+ e/ou RP+).</strong> Base de tratamento é a <strong>terapia endócrina</strong>. O acréscimo de quimioterapia depende do grau, Ki-67, axila ou testes genômicos (Oncotype/MammaPrint).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-300 text-sm">HER2-Positivo</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Amplificação ou superexpressão do HER2.</strong> Indicação mandatória de <strong>terapia anti-HER2</strong> associada a quimioterapia (frequentemente no cenário neoadjuvante).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-red-400 text-sm">Triplo-Negativo</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>RE-, RP- e HER2 negativo.</strong> Não responde a hormonioterapia nem anti-HER2. Base: <strong>quimioterapia intensiva $\pm$ imunoterapia</strong> (pembrolizumabe em cenários de risco).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/80 space-y-2">
                <span className="font-bold text-amber-300 text-sm">Conceito Moderno: HER2-Low</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Tumores com IHQ 1+ ou 2+ com FISH negativo. <strong>Categoria terapêutica na doença avançada</strong> que permite o uso de conjugados anticorpo-droga (*ADCs* como Trastuzumabe Deruxtecana - T-DXd); não é novo subtipo intrínseco.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. PROGNÓSTICO VS PREDIÇÃO */}
      {activeTab === 'prognostico' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-cyan-300 text-base">
                Prognóstico e Predição Não São Sinônimos
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-xl border border-cyan-800">
                Conceito de Prova & Prática
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 text-sm block">Fator Prognóstico:</strong>
                <p className="text-slate-400 text-[11px] italic mb-2">
                  "Informa sobre a evolução biológica e a história natural da doença, independentemente de um tratamento específico."
                </p>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Estágio clínico e carga tumoral</strong> (tamanho T, número de linfonodos N acometidos).</li>
                  <li>• Grau histológico de Nottingham (G1 vs G3).</li>
                  <li>• Presença de invasão linfovascular (ILV).</li>
                  <li>• Resposta anatomopatológica ao tratamento sistêmico.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-emerald-300 text-sm block">Fator Preditivo:</strong>
                <p className="text-slate-400 text-[11px] italic mb-2">
                  "Estima a sensibilidade e a probabilidade de benefício clínico de uma terapia oncológica específica."
                </p>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Receptor de Estrogênio (RE):</strong> Prediz benefício com terapia endócrina.</li>
                  <li>• <strong>HER2:</strong> Prediz benefício acentuado com terapia anti-HER2.</li>
                  <li>• <strong>Testes genômicos (ex: Oncotype DX):</strong> Predizem ganho absoluto com quimioterapia adjuvante em tumores luminais.</li>
                  <li>• <strong>PD-L1:</strong> Orienta a adição de imunoterapia em cenários definidos.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
