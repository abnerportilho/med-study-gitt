import React, { useState } from 'react';
import { 
  Layers, Dna, Activity, Eye, AlertCircle, 
  Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Heart
} from 'lucide-react';

export default function MamaAnatomiaFisio() {
  const [activeSubTab, setActiveSubTab] = useState<'unidade' | 'topografia' | 'linfatica' | 'fisiologia' | 'congenitas'>('unidade');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 1 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Layers size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 1 · Morfologia & Desenvolvimento
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Base Anatômica, Fisiologia Mamária & Alterações Congênitas
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A compreensão das afecções benignas exige o domínio da unidade ductolobular terminal, da topografia descritiva, das cadeias de drenagem linfática e das modificações hormonais ao longo dos ciclos de vida da mulher.
        </p>

        {/* SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'unidade', label: '1. Unidade Ductolobular' },
            { id: 'topografia', label: '2. Topografia & Descrição' },
            { id: 'linfatica', label: '3. Drenagem Linfática' },
            { id: 'fisiologia', label: '4. Fisiologia ao Longo da Vida' },
            { id: 'congenitas', label: '5. Alterações Congênitas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. UNIDADE DUCTOLOBULAR */}
      {activeSubTab === 'unidade' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Dna className="text-rose-400" size={20} />
              A Mama é uma Unidade Ductolobular Dinâmica
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              O parênquima mamário é constituído por <strong>15 a 20 lobos glandulares independentes</strong> dispostos radialmente em torno do complexo areolopapilar (CAP). Cada lobo drena individualmente por um ducto lactífero com dilatação ampular (seio lactífero) antes do mamilo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                  <Activity size={15} /> Unidade Terminal Ductolobular (TDLU)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  É a unidade funcional e morfogenética da mama. É composta pelo ducto terminal extralobular e pelos ácinos/alvéolos intralobulares envoltos por estroma frouxo especializado altamente responsivo a estrogênios e progesterona.
                </p>
                <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-900 text-[11px] text-rose-200 font-medium">
                  💡 <strong>Ponto-chave:</strong> É na TDLU que se originam a grande maioria dos cistos, fibroadenomas, hiperplasias e adenocarcinomas mamários.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-cyan-400 flex items-center gap-1.5">
                  <Layers size={15} /> Estroma & Ligamentos de Cooper
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O tecido conjuntivo interlobular fibroso emite feixes resistentes que fixam o parênquima glandular à derme da pele sobrejacente e à fáscia peitoral profunda — os <strong>Ligamentos Suspensores de Cooper</strong>.
                </p>
                <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-900 text-[11px] text-cyan-200 font-medium">
                  ⚠️ <strong>Relevância Clínica:</strong> A tração ou infiltração desses ligamentos por processos inflamatórios densos ou neoplasias causa a clássica retração cutânea (<em>dimpling</em>).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOPOGRAFIA & DESCRIÇÃO */}
      {activeSubTab === 'topografia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Eye className="text-cyan-400" size={20} />
              Padronização Topográfica: Descrição Rigorosa e Correlação
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Toda lesão mamária palpável ou identificada em exames de imagem deve ser documentada de forma reproduzível para permitir o seguimento longitudinal e a correlação exata entre o exame clínico, USG, mamografia e eventuais biópsias.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">1. Divisão em Quadrantes</span>
                <h5 className="text-sm font-bold text-white">QSE, QSI, QIE, QII</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Quadrante Súpero-Externo (QSE) concentra a maior proporção de tecido fibroglandular e de patologias benignas/malignas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">2. Posição Horária</span>
                <h5 className="text-sm font-bold text-white">Mostrador de Relógio</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Ex: "Nódulo em mama direita às 10 horas" ou "mama esquerda às 2 horas". Oferece precisão milimétrica em relatórios de imagem.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block">3. Distância do Mamilo</span>
                <h5 className="text-sm font-bold text-white">Distância em Centímetros</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Medida do centro do CAP até a lesão (ex: "a 3 cm do mamilo"), além da profundidade (terço anterior, médio ou posterior).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">4. Zonas Especiais</span>
                <h5 className="text-sm font-bold text-white">Spence & Retroareolar</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Prolongamento axilar (cauda de Spence) e região retroareolar subjacente aos ductos principais e seios lactíferos.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/50 flex items-start gap-3">
              <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                <strong className="text-white">Regra de Ouro da Propedêutica:</strong>
                <span> Sempre compare a área avaliada com a <strong>mama contralateral na mesma topografia</strong>. A simetria glandular ajuda a diferenciar uma variação anatômica/nodularidade fisiológica de uma massa dominante real.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DRENAGEM LINFÁTICA */}
      {activeSubTab === 'linfatica' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Activity className="text-purple-400" size={20} />
              Drenagem Linfática Mamária & Avaliação Regional
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Cerca de <strong>75% a 85% de toda a drenagem linfática</strong> da mama é direcionada para as cadeias linfonodais axilares ipsilaterais, enquanto o restante drena para a cadeia mamária interna (paraesternal) e vasos intercostais.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-purple-400 block">Nível I de Berg (Lateral)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Linfonodos situados lateralmente e inferiormente à borda lateral do músculo peitoral menor (grupos peitoral anterior, subescapular e lateral).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-pink-400 block">Nível II de Berg (Central)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Linfonodos situados posteriormente ao músculo peitoral menor, incluindo o grupo central e os linfonodos interpeitorais (nódulos de Rotter).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-rose-400 block">Nível III de Berg (Apical)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Linfonodos situados medialmente e superiormente à borda medial do peitoral menor, na transição para os linfonodos infraclaviculares e supraclaviculares.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h5 className="text-xs font-black uppercase text-white tracking-wider">Palpação Linfonodal Obrigatória na Rotina:</h5>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>Palpar a cavidade axilar com o braço da paciente relaxado e apoiado pelo examinador.</li>
                <li>Palpar as fossas supraclaviculares e infraclaviculares (linfonodo de Virchow / Troissier à esquerda).</li>
                <li><strong>Linfonodo inflamatório:</strong> móvel, elástico, doloroso e de centro radiotransparente (hilo lipídico preservado).</li>
                <li><strong>Linfonodo suspeito:</strong> endurecido, indolor, aderido a planos profundos, agrupado em bloco ou com perda de hilo gorduroso ao USG.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. FISIOLOGIA AO LONGO DA VIDA */}
      {activeSubTab === 'fisiologia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Heart className="text-pink-400" size={20} />
              As Mamas Mudam ao Longo da Vida
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              O tecido mamário está sob permanente modulação endócrina (estrogênio, progesterona, prolactina, GH, cortisol e insulina), sofrendo variações fisiológicas marcantes em cada etapa do ciclo biológico.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-rose-400 block">1. Puberdade & Telarca (Tanner M1–M5)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O broto mamário (M2) surge por ação estrogênica. É comum a <strong>assimetria fisiológica puberal</strong>, que costuma regredir espontaneamente até a maturidade. Crescimento rápido e massas volumosas exigem descartar fibroadenoma juvenil/gigante.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-amber-400 block">2. Ciclo Menstrual na Menacme</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Na fase lútea (pós-ovulatória), o pico de progesterona associado ao estrogênio provoca hiperemia, edema do estroma e proliferação ducto-alveolar. Isso se traduz clinicamente em <strong>turgor, nodularidade difusa e mastalgia cíclica fisiológica</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-emerald-400 block">3. Gestação & Lactação</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Intensa hipertrofia lobular com diferenciação secretora secretando colostro/leite. Há maior risco de <strong>estase láctea, galactoceles, fissuras mamilares, mastite bacteriana e abscesso</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-indigo-400 block">4. Climatério & Pós-Menopausa</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Com a falência ovariana e queda estrogênica, ocorre <strong>involução lobular e substituição fibroglandular por tecido adiposo</strong>. A mama torna-se mais radiotransparente à mamografia, facilitando a visualização de pequenas lesões.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. ALTERAÇÕES CONGÊNITAS */}
      {activeSubTab === 'congenitas' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="text-amber-400" size={20} />
              Alterações Congênitas Seguem a Linha Láctea Embrionária
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Durante a 5ª a 7ª semana de gestação, a crista ectodérmica espessa-se formando a <strong>linha láctea</strong> (que vai da axila até a região inguinal). A falha na regressão normal origina tecido e complexos areolomamilares acessórios ao longo desse trajeto.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-400 uppercase">Politelia</span>
                  <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded font-mono">Mais Comum</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Presença de <strong>mamilo acessório</strong> sem tecido glandular mamário subjacente funcional. Frequentemente confundido com nevo melanocítico (pinta).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-400 uppercase">Polimastia</span>
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono">Axilar Típica</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Presença de <strong>glândula mamária acessória verdadeira</strong> (com ou sem mamilo). Acomete predominantemente a região axilar e pode engurgitar, doer ou secretar leite na gestação/lactação.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black text-cyan-400 uppercase block">Amastia / Amazia</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Amastia:</strong> Ausência congênita completa da mama e do mamilo.<br />
                  <strong>Amazia:</strong> Ausência do tecido glandular com presença do complexo areolopapilar (comum na Síndrome de Poland).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase block">Atelia / Microtelia</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Atelia:</strong> Ausência congênita do complexo areolopapilar com presença da glândula mamária.<br />
                  <strong>Microtelia:</strong> Mamilo hipoplásico de dimensões diminutas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 sm:col-span-2">
                <span className="text-xs font-black text-emerald-400 uppercase block">Diagnóstico Diferencial da Polimastia Axilar</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Deve ser diferenciada de <strong>prolongamento axilar exuberante (cauda de Spence)</strong>, lipomas subcutâneos e linfonodomegalias axilares reacionais ou neoplásicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
