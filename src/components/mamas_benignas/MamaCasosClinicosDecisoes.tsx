import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertCircle, HelpCircle, 
  Stethoscope, RotateCcw, User, ArrowRight, ShieldAlert, Award
} from 'lucide-react';

export default function MamaCasosClinicosDecisoes() {
  // Estado dos Casos
  const [casoAtivo, setCasoAtivo] = useState<number>(1);

  // Caso 1
  const [ans1, setAns1] = useState<string | null>(null);
  // Caso 2
  const [ans2, setAns2] = useState<string | null>(null);
  // Caso 3
  const [ans3, setAns3] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 7 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Sparkles size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 7 · Aplicação Prática & Síntese
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Casos Clínicos da Aula & As 5 Decisões que Organizam a Consulta
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          Casos clínicos para decidir a próxima etapa terapêutica e propedêutica — <em>não apenas para nomear a doença</em>. Aplique os conceitos com os 3 casos reais da aula da UNIP.
        </p>
      </div>

      {/* SELETOR DE CASOS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 1, title: 'Caso 1: Nódulo Móvel aos 22 anos' },
          { id: 2, title: 'Caso 2: Mastalgia Bilateral no Climatério' },
          { id: 3, title: 'Caso 3: Descarga Sanguinolenta Espontânea' }
        ].map(c => (
          <button
            key={c.id}
            onClick={() => setCasoAtivo(c.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              casoAtivo === c.id
                ? 'bg-rose-600 text-white shadow-lg scale-105'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* CASO 1: MULHER DE 22 ANOS COM NÓDULO MÓVEL */}
      {casoAtivo === 1 && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400">
              <User size={20} />
              <h4 className="text-sm font-black uppercase tracking-wider">
                Caso 1: Mulher de 22 anos com Nódulo Móvel
              </h4>
            </div>
            <button
              onClick={() => setAns1(null)}
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all"
            >
              <RotateCcw size={13} /> Reiniciar
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <strong className="text-amber-400 block text-sm">Vinheta Clínica:</strong>
            <p className="text-slate-200 leading-relaxed">
              Paciente feminina de 22 anos, previamente hígida, refere ter percebido <strong>nódulo indolor de 2 cm em mama direita</strong> há 4 meses. Ao exame físico: nódulo bem delimitado, consistência elástica, altamente móvel, sem retrações ou linfonodos axilares palpáveis. Ultrassonografia mamária: nódulo sólido, oval, circunscrito, hipoecoico homogêneo, orientado paralelamente à pele. Sem histórico familiar de câncer de mama.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <span className="font-bold text-white block text-sm">
              Qual é a categoria BI-RADS provável e a conduta clínica mais adequada?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'a', text: 'BI-RADS 4: Indicação imediata de Core Biopsy e agendamento de cirurgia para acalmar a paciente.', correct: false },
                { id: 'b', text: 'BI-RADS 3 (típico de fibroadenoma): Seguimento clínico e ultrassonográfico de curto intervalo em 6 meses, acolhendo a ansiedade sem cirurgia intempestiva.', correct: true },
                { id: 'c', text: 'BI-RADS 0: Solicitar mamografia e ressonância magnética de mamas imediatamente.', correct: false },
                { id: 'd', text: 'BI-RADS 2: Dar alta definitiva sem necessidade de nenhum seguimento ou orientação.', correct: false }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAns1(opt.id)}
                  className={`p-3.5 rounded-xl border text-left font-medium transition-all ${
                    ans1 === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-rose-950/80 border-rose-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {ans1 && (
              <div className="p-4 rounded-xl border leading-relaxed space-y-2 mt-3">
                {ans1 === 'b' ? (
                  <div className="bg-emerald-950/40 border-emerald-700 text-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                      <CheckCircle2 size={18} />
                      <span>Conduta Correta e Equilibrada!</span>
                    </div>
                    <p>
                      <strong>Raciocínio Clínico:</strong> O quadro clínico (jovem de 22 anos, nódulo elástico e móvel) coincide perfeitamente com a imagem ultrassonográfica clássica de <strong>Fibroadenoma (BI-RADS 3)</strong>. A conduta padrão é o <strong>controle de curto intervalo em 6, 12 e 24 meses</strong>. A ansiedade da paciente deve ser acolhida com empatia e método científico, sem transformá-la automaticamente em indicação cirúrgica desnecessária.
                    </p>
                  </div>
                ) : (
                  <div className="bg-rose-950/40 border-rose-700 text-rose-200">
                    ❌ <strong>Atenção:</strong> Em mulheres &lt;30 anos com nódulo móvel e USG circunscrito típico, a probabilidade de malignidade é menor que 2% (BI-RADS 3). Não há indicação de biópsia ou cirurgia imediata na ausência de sinais de alerta.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASO 2: MASTALGIA BILATERAL NO CLIMATÉRIO */}
      {casoAtivo === 2 && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400">
              <User size={20} />
              <h4 className="text-sm font-black uppercase tracking-wider">
                Caso 2: Mastalgia Bilateral Difusa no Climatério
              </h4>
            </div>
            <button
              onClick={() => setAns2(null)}
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all"
            >
              <RotateCcw size={13} /> Reiniciar
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <strong className="text-amber-400 block text-sm">Vinheta Clínica:</strong>
            <p className="text-slate-200 leading-relaxed">
              Mulher de 52 anos em transição menopausal relata <strong>dor mamária difusa e bilateral</strong>, com episódios de piora intermitente. Refere muito medo de ter câncer de mama. Exame físico: mamas simétricas, nodularidade difusa habitual sem massas dominantes palpáveis, sem retrações ou secreção papilar. <strong>Mamografia de rastreamento realizada há 2 meses com laudo BI-RADS 1</strong>.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <span className="font-bold text-white block text-sm">
              Há indicação de novos exames de imagem e qual é o tratamento inicial de escolha?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'a', text: 'Solicitar nova ultrassonografia e ressonância magnética para "acalmar" o medo da paciente e prescrever Danazol.', correct: false },
                { id: 'b', text: 'Prescrever dieta rigorosa isenta de café e chocolate + altas doses de óleo de prímula e vitamina E.', correct: false },
                { id: 'c', text: 'Não solicitar nova imagem; explicar a baixíssima relação entre dor isolada e câncer, orientar sutiã com boa sustentação e prescrever AINE tópico em gel.', correct: true },
                { id: 'd', text: 'Indicar punção biópsia de parênquima mamário bilateral.', correct: false }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAns2(opt.id)}
                  className={`p-3.5 rounded-xl border text-left font-medium transition-all ${
                    ans2 === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-rose-950/80 border-rose-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {ans2 && (
              <div className="p-4 rounded-xl border leading-relaxed space-y-2 mt-3">
                {ans2 === 'c' ? (
                  <div className="bg-emerald-950/40 border-emerald-700 text-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                      <CheckCircle2 size={18} />
                      <span>Conduta Baseada em Evidências!</span>
                    </div>
                    <p>
                      <strong>Raciocínio Clínico:</strong> Dor difusa e bilateral com exame físico normal e mamografia recente negativa NÃO justifica novos exames de imagem apenas para "acalmar". O médico deve explicar que <strong>dor isolada raramente é câncer (&lt;1%)</strong>, prescrever sutiã confortável de suporte e AINE tópico em gel. Não prometer cura com restrições dietéticas milagrosas sem evidência.
                    </p>
                  </div>
                ) : (
                  <div className="bg-rose-950/40 border-rose-700 text-rose-200">
                    ❌ <strong>Incorreto:</strong> Solicitar exames repetitivos em exame físico normal alimenta a ansiedade e gera falso-positivos. Cafeína e vitaminas não têm benefício comprovado em ensaios clínicos.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASO 3: DESCARGA SANGUINOLENTA ESPONTÂNEA */}
      {casoAtivo === 3 && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <User size={20} />
              <h4 className="text-sm font-black uppercase tracking-wider">
                Caso 3: Descarga Sanguinolenta Espontânea aos 46 anos
              </h4>
            </div>
            <button
              onClick={() => setAns3(null)}
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all"
            >
              <RotateCcw size={13} /> Reiniciar
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <strong className="text-cyan-400 block text-sm">Vinheta Clínica:</strong>
            <p className="text-slate-200 leading-relaxed">
              Mulher de 46 anos relata <strong>descarga papilar sanguinolenta ("em água de carne") que mancha o sutiã espontaneamente</strong> há 3 semanas na mama esquerda. Ao exame: sem massas dominantes palpáveis, mas a compressão suave às 2 horas periareolar deflagra a saída de secreção sanguinolenta por um <strong>único poro ductal</strong>.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <span className="font-bold text-white block text-sm">
              Qual a propedêutica armada e a conduta definitiva indicada?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'a', text: 'Realizar apenas citologia do líquido; se der negativa, tranquilizar e dar alta sem novos exames.', correct: false },
                { id: 'b', text: 'Caracterizar como descarga patológica; solicitar Mamografia + USG direcionado; indicar exérese do ducto terminal acometido (microdochectomia) com análise histopatológica para papiloma intraductal/neoplasia.', correct: true },
                { id: 'c', text: 'Iniciar antibioticoterapia prolongada por 30 dias para mastite ductal crônica.', correct: false },
                { id: 'd', text: 'Prescrever cabergolina para suprimir a produção de prolactina.', correct: false }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAns3(opt.id)}
                  className={`p-3.5 rounded-xl border text-left font-medium transition-all ${
                    ans3 === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-rose-950/80 border-rose-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {ans3 && (
              <div className="p-4 rounded-xl border leading-relaxed space-y-2 mt-3">
                {ans3 === 'b' ? (
                  <div className="bg-emerald-950/40 border-emerald-700 text-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                      <CheckCircle2 size={18} />
                      <span>Conduta Perfeita e Segura!</span>
                    </div>
                    <p>
                      <strong>Raciocínio Clínico:</strong> A descarga espontânea, unilateral, uniductal e sanguinolenta é a definição clássica de <strong>Descarga Papilar Patológica</strong>. A causa benigna mais frequente é o <strong>Papiloma Intraductal (~50%)</strong>, mas pode representar carcinoma <em>in situ</em> ou invasor (10-15%). A citologia isolada não resolve (alto índice de falso-negativo); é mandatório realizar Mamografia + USG e <strong>ressecção cirúrgica do ducto (microdochectomia)</strong>.
                    </p>
                  </div>
                ) : (
                  <div className="bg-rose-950/40 border-rose-700 text-rose-200">
                    ❌ <strong>Atenção ao Risco:</strong> A citologia do derrame papilar tem alta taxa de falsos negativos. Uma citologia negativa NÃO encerra a investigação de descarga espontânea unilateral uniductal.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SÍNTESE: AS 5 DECISÕES DA CONSULTA MASTOLÓGICA */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400 border-b border-slate-800 pb-3">
          <Award size={22} />
          <h4 className="text-base font-black uppercase tracking-wider text-white">
            Síntese da Aula: Cinco Decisões que Organizam a Consulta Mastológica
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-rose-400 block font-mono">Decisão 1</span>
            <h5 className="text-xs font-bold text-white">Definir o Sintoma Dominante</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dor, nódulo, descarga ou inflamação. A queixa principal dita a linha de raciocínio.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-amber-400 block font-mono">Decisão 2</span>
            <h5 className="text-xs font-bold text-white">Procurar Sinais de Alerta</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Massa fixa, retração de pele/mamilo, eczema persistente, descarga espontânea unilateral ou mastite refratária.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-cyan-400 block font-mono">Decisão 3</span>
            <h5 className="text-xs font-bold text-white">Escolher Imagem por Idade</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              &lt;30 anos: USG inicial. ≥30 anos: Mamografia + USG complementar conforme indicação.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-purple-400 block font-mono">Decisão 4</span>
            <h5 className="text-xs font-bold text-white">Relacionar BI-RADS à Conduta</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cat 0 (complementar), 1/2 (rotina), 3 (controle 6/12/24m), 4/5 (biópsia histológica).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-emerald-400 block font-mono">Decisão 5</span>
            <h5 className="text-xs font-bold text-white">Exigir Concordância Tríplice</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Clínica + Imagem + Patologia devem fechar harmonicamente antes de encerrar o caso.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-900/40 text-center text-xs text-rose-300 font-bold">
          "A melhor conduta é aquela que explica todos os achados." — Profa. Dra. Flávia Ximenes
        </div>
      </div>
    </div>
  );
}
