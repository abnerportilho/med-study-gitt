import React, { useState } from 'react';
import { 
  CircleDot, HelpCircle, CheckCircle2, AlertCircle, 
  ShieldAlert, Sparkles, Activity, Eye, Dna, ArrowRight
} from 'lucide-react';

export default function MamaNodulosCistos() {
  const [selectedSubTab, setSelectedSubTab] = useState<'cistos' | 'fibrocisticas' | 'fibroadenoma' | 'filoide' | 'outros'>('cistos');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 5 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950 text-purple-400 border border-purple-800">
            <CircleDot size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">
              Eixo 5 · Nódulos & Cistos
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Nódulos Sólidos, Cistos Mamários & Risco Histopatológico
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A pergunta central diante de um nódulo palpável ou incidental é: <strong>é sólido, cístico ou discordante?</strong> Conheça os critérios ultrassonográficos, indicações de amostragem e estratificação de risco futuro.
        </p>

        {/* SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'cistos', label: '1. Cistos Mamários' },
            { id: 'fibrocisticas', label: '2. Alterações Fibrocísticas & Risco' },
            { id: 'fibroadenoma', label: '3. Fibroadenoma' },
            { id: 'filoide', label: '4. Tumor Filoide' },
            { id: 'outros', label: '5. Outros Nódulos Benignos' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. CISTOS MAMÁRIOS */}
      {selectedSubTab === 'cistos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <CircleDot className="text-cyan-400" size={20} />
              Lesões Císticas: Nem Todos os Cistos São Iguais
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Os cistos mamários decorrem da dilatação e obstrução do ducto terminal com acúmulo de secreção. São a causa mais comum de massa mamária súbita e dolorosa em mulheres de 35 a 50 anos (perimenopausa).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 uppercase">1. Cisto Simples</span>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">BI-RADS 2</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li><strong>USG:</strong> Conteúdo anecoico, margens circunscritas, reforço acústico posterior límpido e ausência de ecos internos.</li>
                  <li><strong>Conduta:</strong> Não requer biópsia nem punção se assintomático.</li>
                  <li><strong>Punção (PAAF):</strong> Indicada apenas se for doloroso/tenso ou palpável desconfortável.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase">2. Cisto Complicado</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded">BI-RADS 3</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li><strong>USG:</strong> Ecos internos homogêneos em suspensão (débris celulares ou líquido espesso), sem polo sólido, septos espessos ou vascularização ao Doppler.</li>
                  <li><strong>Conduta:</strong> Controle radiológico em curto intervalo (6 meses) ou PAAF se sintomático.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-400 uppercase">3. Cisto Complexo (Cístico-Sólido)</span>
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded">BI-RADS 4</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li><strong>USG:</strong> Presença de projeção sólida intra-cística (vegetação), septos espessos (&gt;0,5 mm) ou paredes espessadas e irregulares.</li>
                  <li><strong>Conduta:</strong> <strong>Biópsia histológica obrigatória (Core Biopsy)</strong> do componente sólido para afastar papiloma com atipia ou carcinoma papilar.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h5 className="text-xs font-black uppercase text-white tracking-wider">Regras de Decisão na Punção de Cisto Simples:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Líquido Típico (Amarelo / Esverdeado):</strong>
                  Esvaziamento completo e descarte do líquido (citologia dispensável). Alta com seguimento habitual.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-rose-400 block mb-1">Líquido Sanguinolento ("Água de Carne"):</strong>
                  Enviar imediatamente para análise citológica e realizar USG de controle pós-punção.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Massa Residual Palpável:</strong>
                  Se após o esvaziamento persistir nódulo sólido subjacente → Core Biopsy imediata.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ALTERAÇÕES FIBROCÍSTICAS & RISCO */}
      {selectedSubTab === 'fibrocisticas' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Dna className="text-purple-400" size={20} />
              Alterações Fibrocísticas: Espectro Histológico & Estratificação de Risco Futuro
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              As antigas "displasias mamárias" são hoje entendidas como <strong>Alterações Funcionais Benignas da Mama (AFBM)</strong>. A classificação de Dupont & Page estratifica o risco de desenvolvimento futuro de carcinoma mamário:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 uppercase">1. Não Proliferativas</span>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">RR = 1.0</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Entidades:</strong> Cistos simples, fibrose estromal, adenose simples, ectasia ductal e metaplasia apócrina.
                </p>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-300">
                  Risco de câncer igual ao da população geral.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase">2. Proliferativas Sem Atipia</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded">RR = 1.5 a 2.0x</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Entidades:</strong> Hiperplasia ductal usual moderada/florida, adenose esclerosante, papiloma intraductal e fibroadenoma complexo.
                </p>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
                  Aumento discreto do risco futuro; manter seguimento de rotina.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-400 uppercase">3. Proliferativas Com Atipia</span>
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded">RR = 4.0 a 5.0x</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Entidades:</strong> Hiperplasia Ductal Atípica (HDA) e Hiperplasia Lobular Atípica (HLA).
                </p>
                <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-800 text-[11px] text-rose-200">
                  <strong>Lesões Precursoras/Marcadoras:</strong> Exige discussão multidisciplinar, rastreamento intensificado e quimioprevenção.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FIBROADENOMA */}
      {selectedSubTab === 'fibroadenoma' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="text-pink-400" size={20} />
              Fibroadenoma: Clínica e Imagem Costumam Convergir
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              É a neoplasia benigna mais comum da mama, com pico de incidência em mulheres jovens (20 aos 35 anos). É um tumor fibroepitelial bifásico composto pela proliferação mista de elementos estromais e epiteliais glandulares.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-pink-400 block">Apresentação Clínica Típica</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Nódulo palpável indolor, de consistência firme-elástica ("borrachoide").</li>
                  <li>Limites nítidos, superfície lisa ou suavemente lobulada.</li>
                  <li><strong>Alta mobilidade à palpação</strong> ("escorrega sob os dedos").</li>
                  <li>Ausência de retrações cutâneas ou aderência a planos profundos.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-cyan-400 block">Achados Ultrassonográficos Clássicos</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Forma <strong>oval ou elíptica</strong>, margens circunscritas.</li>
                  <li><strong>Orientação paralela à pele</strong> (diâmetro horizontal &gt; vertical).</li>
                  <li>Hipoecogenicidade homogênea em relação ao parênquima adjacente.</li>
                  <li>Pseudo-cápsula ecogênica fina bem delimitada.</li>
                </ul>
              </div>
            </div>

            {/* CONDUTA: OBSERVAR VS REMOVER */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3 text-xs">
              <h5 className="text-xs font-black uppercase text-purple-300 tracking-wider">Fibroadenoma: Observar ou Remover?</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-emerald-400 block">Conduta Preferencial: Observação Segura</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Em pacientes jovens (&lt;35 anos) com quadro clínico e ultrassonográfico típico concordante (BI-RADS 3), a <strong>vigilância com controle clínico e ultrassonográfico a cada 6 meses por 2 anos</strong> é a conduta padrão. A maioria estabiliza ou até regride após a menopausa.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-rose-400 block">Indicações de Biópsia ou Excisão Cirúrgica</strong>
                  <p className="text-slate-300 leading-relaxed">
                    • Crescimento rápido documentado (&gt;20% de diâmetro em 6 meses).<br />
                    • Dimensões volumosas (&gt;3 cm ou fibroadenoma juvenil/gigante).<br />
                    • Perda de contornos típicos (BI-RADS 4) ou idade &gt;35-40 anos.<br />
                    • Sintomas dolorosos intensos, deformidade estética ou ansiedade refratária da paciente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TUMOR FILOIDE */}
      {selectedSubTab === 'filoide' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <AlertCircle className="text-rose-400" size={20} />
              Tumor Filoide (Phyllodes Tumor): Atenção ao Crescimento Rápido
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Neoplasia fibroepitelial rara caracterizada por hipercelularidade estromal proeminente com projeções arquiteturais "em folhas" (*phyllos*).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-amber-400 block">Comportamento & Espectro Histológico</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O tumor filoide pode ser classificado em <strong>Benigno, Borderline ou Maligno</strong> com base na atipia estromal, número de mitoses por campo e invasão de margens. Apresenta risco de recidiva local se a excisão for incompleta e potencial de metástase hematogênica (principalmente pulmonar) na forma maligna.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-rose-400 block">Sinais de Suspeita & Manejo Cirúrgico</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Apresentação:</strong> Nódulo de crescimento rápido e exuberante, atingindo frequentemente 5 a 10 cm, em mulheres entre 40 e 50 anos.<br />
                  • <strong>Desafio Diagnóstico:</strong> A Core Biopsy pode subestimar a heterogeneidade e confundi-lo com fibroadenoma celular.<br />
                  • <strong>Tratamento Padrão-Ouro:</strong> <strong>Excisão cirúrgica ampla com margem livre de segurança (≥1 cm)</strong>. Não requer esvaziamento axilar de rotina (disseminação hematogênica).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. OUTROS NÓDULOS BENIGNOS */}
      {selectedSubTab === 'outros' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Activity className="text-emerald-400" size={20} />
              Outros Nódulos e Massas Benignas na Prática Clínica
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-black uppercase text-amber-400 block">1. Hamartoma (Fibroadenolipoma)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Mama dentro da mama". Combinação encapsulada e desorganizada de tecido adiposo, fibroso e glandular. Aspecto mamográfico clássico em "fatia de salame" delimitado por pseudocápsula fina radiotransparente (BI-RADS 2).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-black uppercase text-cyan-400 block">2. Lipoma Mamário</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Massa tumoral constituída exclusivamente por adipócitos maduros. Palpação macia e indolor. À mamografia, apresenta radiotransparência homogênea característica (BI-RADS 2).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-black uppercase text-purple-400 block">3. Galactocele</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cisto de retenção com conteúdo lácteo espessado decorrente da oclusão de ducto lactífero durante a lactação ou desmame. Ao USG/MMG pode exibir nível líquido-gordura. A punção evacuadora é diagnóstica e terapêutica.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-black uppercase text-rose-400 block">4. Necrose Gordurosa (Esteatonecrose)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Consequência de trauma mamário prévio, biópsias, punções ou cirurgias plásticas/redutoras. Pode simular malignidade com nódulo espiculado denso ou evoluir para cisto oleoso com calcificação periférica "em casca de ovo".
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 sm:col-span-2">
                <span className="text-xs font-black uppercase text-emerald-400 block">5. Linfonodo Intramamário</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Linfonodo normal encapsulado no interior do parênquima mamário (predomínio no QSE). Caracteriza-se por forma reniforme/oval, centro radiotransparente (hilo gorduroso) e dimensões &lt;1 cm (BI-RADS 2). Não necessita intervenção.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
