import React, { useState } from 'react';
import { 
  Layers, Heart, Brain, Activity, AlertTriangle, 
  CheckCircle2, Info, Eye, ShieldAlert, Sparkles, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function USGMorfologicoSegundoTri() {
  const [selectedOrgan, setSelectedOrgan] = useState<'neuro' | 'cardio' | 'abdome' | 'cervix'>('neuro');
  const [cervixLength, setCervixLength] = useState<number>(28);

  return (
    <div className="space-y-6">
      {/* INTRODUÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Layers size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
              Eixo 4 · Anatomia Sistemática & Colo Uterino
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              4. Ultrassonografia Morfológica de 2º Trimestre (20 a 24 semanas)
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          Considerado o exame mais detalhado de toda a propedêutica obstétrica. Nessa idade gestacional, todos os órgãos fetais completaram sua embriogênese e o volume de líquido amniótico proporcional propicia uma excelente janela acústica para detecção de anomalias anatômicas maiores e predição de prematuridade via cervicometria transvaginal.
        </p>
      </div>

      {/* SELETOR DE SISTEMAS ORGÂNICOS */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedOrgan('neuro')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedOrgan === 'neuro' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Brain size={16} />
          <span>1. Neuroeixo & Fossa Posterior</span>
        </button>
        <button
          onClick={() => setSelectedOrgan('cardio')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedOrgan === 'cardio' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart size={16} />
          <span>2. Coração & Grandes Vasos</span>
        </button>
        <button
          onClick={() => setSelectedOrgan('abdome')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedOrgan === 'abdome' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity size={16} />
          <span>3. Abdome & Trato Urinário</span>
        </button>
        <button
          onClick={() => setSelectedOrgan('cervix')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedOrgan === 'cervix' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert size={16} />
          <span>4. Cervicometria (Colo Uterino)</span>
        </button>
      </div>

      {/* CONTEÚDO ESPECÍFICO DO SISTEMA SELECIONADO */}
      {selectedOrgan === 'neuro' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ventrículos Laterais */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Ventrículos Laterais (Átrio)</span>
                <span className="text-xs font-mono font-bold text-cyan-400">&lt; 10 mm</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Medido no nível do átrio ventricular posterior, na altura do glomo do plexo coroide. A medida normal deve ser estritamente <strong>inferior a 10 mm</strong> durante toda a gestação.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div><strong>Ventriculomegalia Leve:</strong> 10 a 12 mm</div>
                <div><strong>Moderada:</strong> 12 a 15 mm</div>
                <div className="text-rose-400 font-bold">Grave (Hidrocefalia): &gt; 15 mm</div>
              </div>
            </div>

            {/* Cavo do Septo Pelúcido */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Cavo do Septo Pelúcido (CSP)</span>
                <span className="text-xs font-mono font-bold text-emerald-400">Presente</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pequena caixa anecoica retangular anterior na linha média, entre os cornos anteriores dos ventrículos laterais. Sua identificação é obrigatória no plano transtalâmico.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-amber-300 space-y-1">
                <strong>Significado de Ausência:</strong> A não visualização do CSP indica <strong>Agenesia de Corpo Caloso</strong> ou <strong>Holoprosencefalia lobar/semilobar</strong>. Requer neuroimagem fetal e Ressonância Magnética.
              </div>
            </div>

            {/* Fossa Posterior e Cisterna Magna */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Cerebelo & Cisterna Magna</span>
                <span className="text-xs font-mono font-bold text-indigo-400">2 a 10 mm</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Diâmetro cerebelar transverso em milímetros coincide aproximadamente com a idade gestacional em semanas entre 14 e 22 sem. A profundidade da <strong>Cisterna Magna deve medir entre 2 e 10 mm</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div><strong>Cisterna Magna &gt; 10 mm:</strong> Mega cisterna magna ou Cisto de Dandy-Walker.</div>
                <div className="text-rose-400 font-bold">Cisterna Magna Obliterada (&lt; 2 mm):</div>
                <p className="text-slate-400">Indica herniação cerebelar na Espinha Bífida Aberta.</p>
              </div>
            </div>
          </div>

          {/* SINAIS PATOGNOMÔNICOS DE ESPINHA BÍFIDA (ARNOLD-CHIARI II) */}
          <div className="p-5 rounded-3xl bg-slate-900 border-2 border-rose-900/60 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} />
              <span>Sinais Cranianos Patognomônicos de Espinha Bífida / Mielomeningocele</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-800/40 space-y-1">
                <div className="font-bold text-rose-300">Sinal da Banana (Banana Sign)</div>
                <p className="text-slate-300 leading-relaxed">
                  O cerebelo perde seu formato bilobulado típico de altere e adquire aspecto curvo e afilado em forma de banana, tracionado em direção ao forame magno devido ao escape de líquor pelo defeito espinhal aberto.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-800/40 space-y-1">
                <div className="font-bold text-rose-300">Sinal do Limão (Lemon Sign)</div>
                <p className="text-slate-300 leading-relaxed">
                  Colapso ou concavidade das paredes ósseas bifrontais do crânio resultante da hipotensão intracraniana crônica pela perda liquórica espinhal, lembrando o formato de um limão no corte axial.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOrgan === 'cardio' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <Heart size={20} />
                <span>Os Três Cortes Cardíacos Obrigatórios na Morfologia Fetal</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Diretriz ISUOG</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* 1. Corte de 4 Câmaras */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="font-bold text-white text-sm block">1. Corte de 4 Câmaras (4C)</span>
                <p className="text-slate-300 leading-relaxed">
                  Eixo cardíaco orientado a <strong>45° ± 20° para a esquerda</strong>. O coração deve ocupar aproximadamente um terço da área torácica total.
                </p>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  <li>Simetria ventricular e atrial (átrio e ventrículo direito ligeiramente maiores no 3º tri).</li>
                  <li>Septo interventricular íntegro desde o ápice até a cruz do coração.</li>
                  <li>Inserção diferencial das valvas AV: a <strong>valva tricúspide insere-se mais apicalmente</strong> que a valva mitral.</li>
                </ul>
              </div>

              {/* 2. Tratos de Saída dos Ventrículos */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="font-bold text-white text-sm block">2. Tratos de Saída (VSVE e VSVD)</span>
                <p className="text-slate-300 leading-relaxed">
                  Os grandes vasos da base <strong>cruzam-se obrigatoriamente em ângulo de quase 90°</strong> ao emergirem dos ventrículos:
                </p>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  <li><strong>Aorta (VSVE):</strong> Emerge do ventrículo esquerdo em direção ao ombro direito. Continuidade septo-aórtica preservada.</li>
                  <li><strong>Artéria Pulmonar (VSVD):</strong> Emerge anteriormente do ventrículo direito e cruza ventralmente sobre a aorta.</li>
                  <li className="text-rose-400">Vasos paralelos indicam <strong>Transposição das Grandes Artérias (TGA)</strong>!</li>
                </ul>
              </div>

              {/* 3. Corte de 3 Vasos e Traqueia (3VT) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="font-bold text-white text-sm block">3. Corte dos 3 Vasos e Traqueia (3VT)</span>
                <p className="text-slate-300 leading-relaxed">
                  Plano axial superior no mediastino alto. Mostra da esquerda para a direita em tamanho decrescente:
                </p>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  <li><strong>Artéria Pulmonar / Canal Arterial</strong> (maior calibre).</li>
                  <li><strong>Arco Aórtico Transverso</strong> (calibre intermediário).</li>
                  <li><strong>Veia Cava Superior</strong> (menor calibre).</li>
                </ul>
                <div className="text-[11px] text-cyan-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  Os arcos aórtico e ductal unem-se em formato de "V" convergente à esquerda da traqueia ecogênica.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOrgan === 'abdome' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parede Abdominal: Gastrosquise vs Onfalocele */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block border-b border-slate-800 pb-2">
                Defeitos da Parede Abdominal: Diagnóstico Diferencial Crucial
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-cyan-400">Gastrosquise</div>
                  <p className="text-slate-400 leading-relaxed">
                    Defeito de fechamento <strong>paraumbilical à direita</strong> do cordão umbilical inserido normalmente.
                  </p>
                  <ul className="space-y-0.5 text-slate-300 list-disc list-inside">
                    <li><strong>Sem membrana de cobertura</strong> (alças intestinais livres no líquido amniótico).</li>
                    <li>Alças espessadas e com fibrina.</li>
                    <li>Rara associação com cromossomopatias; mães jovens.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-amber-400">Onfalocele</div>
                  <p className="text-slate-400 leading-relaxed">
                    Defeito central na <strong>linha média do anel umbilical</strong>, com herniação do conteúdo abdominal.
                  </p>
                  <ul className="space-y-0.5 text-slate-300 list-disc list-inside">
                    <li><strong>Coberto por membrana</strong> peritoneal e amniótica íntegra.</li>
                    <li>Cordão umbilical insere-se no ápice do saco herniário.</li>
                    <li className="text-rose-300">Frequente associação com aneuploidias (T18, T13) e Beckwith-Wiedemann (&gt;50%).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trato Urinário e Pelve Renal */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block border-b border-slate-800 pb-2">
                Trato Urinário e Dilatação da Pelve Renal (Ectasia / Hidronefrose)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                A bexiga fetal deve ser visualizada em todos os exames de 2º trimestre e esvaziar/encher a cada 30-45 minutos. O diâmetro anteroposterior (DAP) da pelve renal é o parâmetro padrão:
              </p>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div><strong>No 2º Trimestre (16 a 27 semanas):</strong></div>
                <div className="text-slate-400 font-mono">DAP normal: &lt; 4 mm</div>
                <div className="text-amber-400 font-mono">Dilatação leve: 4 a 7 mm (marcador menor/seguimento)</div>
                <div className="text-rose-400 font-mono">Hidronefrose moderada/grave: &gt; 7 mm</div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800 text-[11px] text-purple-200">
                <strong>Sinal da Fechadura (Keyhole sign):</strong> Megabexiga fetal associada à dilatação da uretra posterior proximal em feto masculino &rarr; patognomônico de <strong>Valva de Uretra Posterior (VUP)</strong>. Alto risco de oligodramnia grave e hipoplasia pulmonar.
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOrgan === 'cervix' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border-2 border-indigo-500/70 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
                <ShieldCheck size={20} />
                <span>Cervicometria Transvaginal e Predição de Parto Prematuro Espontâneo</span>
              </div>
              <span className="text-xs font-mono text-cyan-300 font-bold">20 a 24 semanas</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O rastreio universal do comprimento do colo uterino por via transvaginal entre 20 e 24 semanas identifica precocemente o encurtamento cervical assintomático, permitindo intervenções profiláticas que reduzem drasticamente a prematuridade espontânea.
            </p>

            {/* Simulador Interativo de Comprimento do Colo */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Comprimento do Canal Endocervical Fechado: <span className="text-indigo-400 font-mono font-black text-sm">{cervixLength} mm</span>
                </label>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  cervixLength <= 25 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {cervixLength <= 25 ? '⚠ COLO CURTO (Alto Risco)' : '✓ COLO NORMAL'}
                </span>
              </div>

              <input
                type="range"
                min={5}
                max={45}
                value={cervixLength}
                onChange={(e) => setCervixLength(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>5 mm (Incompetência grave)</span>
                <span className="text-rose-400 font-bold">Ponto de Corte: 25 mm</span>
                <span>45 mm (Colo longo)</span>
              </div>

              {/* Conduta Recomendada pelo Simulador */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                cervixLength <= 25 
                  ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
                  : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
              }`}>
                {cervixLength <= 25 ? (
                  <div className="space-y-1.5">
                    <div className="font-bold text-sm text-rose-300">Conduta Imediata para Colo Curto (&le; 25 mm):</div>
                    <ul className="space-y-1 list-disc list-inside text-slate-200">
                      <li>Iniciar imediatamente <strong>Progesterona Natural Micronizada 200 mg/dia via vaginal ao deitar</strong>, mantendo até 36 semanas. Reduz em até 45% a taxa de parto prematuro antes de 34 semanas.</li>
                      <li>Se a paciente tiver <strong>história prévia de parto prematuro espontâneo</strong>: avaliar indicação de <strong>Cerclagem Uterina (técnica de McDonald ou Shirodkar)</strong>.</li>
                      <li>Orientar repouso relativo, evitar esforços intensos e sinais de alerta para trabalho de parto prematuro ou rotura de membranas.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="font-bold text-sm text-emerald-300">Colo Normal (&gt; 25 mm):</div>
                    <p className="text-slate-200">
                      Risco basal baixo para parto prematuro espontâneo. Não há indicação de progesterona profilática se a paciente não apresentar histórico de prematuridade anterior. Manter pré-natal de rotina.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Critérios Técnicos de Medição do Colo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-300">1. Bexiga Vazia</div>
                <p className="text-slate-400">
                  A bexiga cheia comprime o segmento uterino inferior e alonga artificialmente o colo em até 5 a 10 mm (falso negativo).
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-300">2. Pressão Neutra da Sonda</div>
                <p className="text-slate-400">
                  Evitar pressão excessiva do transdutor sobre o lábio anterior do colo, que pode mascarar afunilamento e elongar o canal.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-300">3. Pesquisa de Afunilamento</div>
                <p className="text-slate-400">
                  Avaliar presença de afunilamento (funneling) no orifício interno (colo em "Y", "V" ou "U") e sinal do sludge amniótico.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
