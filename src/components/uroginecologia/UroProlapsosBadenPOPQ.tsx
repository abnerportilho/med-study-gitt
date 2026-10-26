import React, { useState } from 'react';
import { 
  Compass, Eye, ArrowRight, CheckCircle2, 
  HelpCircle, AlertCircle, RefreshCw, Layers
} from 'lucide-react';

export default function UroProlapsosBadenPOPQ() {
  const [activeTab, setActiveTab] = useState<'clinica' | 'baden' | 'popq_teoria' | 'calculadora'>('popq_teoria');

  // Estado da Calculadora POP-Q
  const [aa, setAa] = useState<number>(0);
  const [ba, setBa] = useState<number>(0);
  const [c, setC] = useState<number>(-5);
  const [hg, setHg] = useState<number>(6);
  const [cp, setCp] = useState<number>(2);
  const [cvt, setCvt] = useState<number>(8);
  const [ap, setAp] = useState<number>(0);
  const [bp, setBp] = useState<number>(-3);
  const [d, setD] = useState<number>(-7);

  // Calcula o estágio POP-Q dinamicamente
  const calculatePopqStage = () => {
    const points = [aa, ba, c, ap, bp];
    if (d !== null && d !== undefined) points.push(d);
    const maxVal = Math.max(...points);

    // Checagem de estágio 0
    const isStage0 = 
      aa === -3 && 
      ba === -3 && 
      ap === -3 && 
      bp === -3 && 
      c <= -(cvt - 2) &&
      (d === null || d <= -(cvt - 2));

    if (isStage0) {
      return {
        stage: 'Estágio 0',
        maxPoint: maxVal,
        color: 'text-emerald-400 bg-emerald-950 border-emerald-800',
        desc: 'Nenhum prolapso é demonstrado durante o esforço máximo de Valsalva. Todos os pontos estão em suas posições anatômicas normais.'
      };
    }

    if (maxVal < -1) {
      return {
        stage: 'Estágio I',
        maxPoint: maxVal,
        color: 'text-blue-400 bg-blue-950 border-blue-800',
        desc: 'O ponto de maior prolapso está localizado a mais de 1 cm acima do anel himenal (ponto mais distal < -1 cm).'
      };
    }

    if (maxVal >= -1 && maxVal <= 1) {
      return {
        stage: 'Estágio II',
        maxPoint: maxVal,
        color: 'text-amber-400 bg-amber-950 border-amber-800',
        desc: 'O ponto de maior prolapso está entre 1 cm acima e 1 cm abaixo do anel himenal (-1 cm ≤ ponto mais distal ≤ +1 cm). Este é o estágio do caso clínico do Prof. André Bernardo!'
      };
    }

    if (maxVal > 1 && maxVal < cvt - 2) {
      return {
        stage: 'Estágio III',
        maxPoint: maxVal,
        color: 'text-orange-400 bg-orange-950 border-orange-800',
        desc: `O ponto de maior prolapso está a mais de 1 cm abaixo do anel himenal (> +1 cm), porém não além de CVT - 2 cm (< +${cvt - 2} cm). Prolapso avançado exteriorizado.`
      };
    }

    return {
      stage: 'Estágio IV',
      maxPoint: maxVal,
      color: 'text-rose-400 bg-rose-950 border-rose-800',
      desc: `Eversão completa da vagina / procidência genital total. O ponto mais avançado está em ≥ CVT - 2 cm (≥ +${cvt - 2} cm).`
    };
  };

  const loadPreset = (type: 'normal' | 'caso_bernardo' | 'estagio3' | 'estagio4') => {
    if (type === 'normal') {
      setAa(-3); setBa(-3); setC(-5);
      setHg(4); setCp(3); setCvt(8);
      setAp(-3); setBp(-3); setD(-7);
    } else if (type === 'caso_bernardo') {
      setAa(0); setBa(0); setC(-5);
      setHg(6); setCp(2); setCvt(8);
      setAp(0); setBp(-3); setD(-7);
    } else if (type === 'estagio3') {
      setAa(2); setBa(3); setC(2);
      setHg(5); setCp(2); setCvt(8);
      setAp(-1); setBp(-1); setD(-6);
    } else if (type === 'estagio4') {
      setAa(3); setBa(6); setC(6);
      setHg(6); setCp(1.5); setCvt(8);
      setAp(3); setBp(5); setD(5);
    }
  };

  const result = calculatePopqStage();

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
              Eixo 2 • Diagnóstico e Quantificação
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Prolapsos Genitais: Baden-Walker & Sistema POP-Q
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Quadro clínico por compartimento, o sistema tradicional de Baden-Walker e a padronização internacional milimétrica do POP-Q (ICS) com Grade 3x3 e Calculadora Interativa de Estadiamento.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('calculadora')}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-950 flex items-center gap-1.5"
            >
              <Compass size={14} />
              <span>Calculadora POP-Q</span>
            </button>
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('clinica')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'clinica'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Quadro Clínico por Compartimento
          </button>
          <button
            onClick={() => setActiveTab('baden')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'baden'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Classificação Baden-Walker
          </button>
          <button
            onClick={() => setActiveTab('popq_teoria')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'popq_teoria'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            POP-Q: Anatomia & Grade 3x3
          </button>
          <button
            onClick={() => setActiveTab('calculadora')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'calculadora'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Calculadora & Simulador POP-Q
          </button>
        </div>
      </div>

      {/* 1. QUADRO CLÍNICO POR COMPARTIMENTO */}
      {activeTab === 'clinica' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Eye className="text-cyan-400" size={20} />
              Quadro Clínico e Sintomas por Compartimento
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              O sintoma mais específico e prevalente do prolapso genital é a <strong>sensação de peso pélvico e "bola na vagina"</strong> que piora ao final do dia ou aos esforços. Cada compartimento anatômico acarreta repercussões funcionais próprias:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* COMPARTIMENTO ANTERIOR */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">Prolapso Anterior</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Cistocele & Uretrocele
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Sensação de bola/peso:</strong> Abaulamento palpável ou visível no introito vaginal.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Sintomas miccionais de esforço:</strong> Perda urinária durante tosse, riso ou esforço físico (IUE associada).
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Sintomas obstrutivos:</strong> Dificuldade para iniciar a micção, jato fraco e sensação de esvaziamento incompleto (a cistocele acotovela a uretra).
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>IUE Mascarada:</strong> Em prolapsos volumosos, o acotovelamento uretral oculta a perda urinária; ao reduzir o prolapso no exame, a urina extravasa!
                  </li>
                </ul>
              </div>

              {/* COMPARTIMENTO APICAL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Prolapso Apical</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Útero ou Cúpula Vaginal
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Dor em baixo ventre:</strong> Dor surda tipo tração ligamentar nos ligamentos uterossacrais e cardinais.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Sensação de bola contínua:</strong> O colo uterino ou a cicatriz da cúpula se exteriorizam através do hímen.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Úlceras de decúbito:</strong> O atrito do colo exteriorizado contra as roupas gera lesões tróficas e sangramento vaginal.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Lombalgia e peso:</strong> Piora no ortostatismo prolongado com alívio imediato no repouso em decúbito dorsal.
                  </li>
                </ul>
              </div>

              {/* COMPARTIMENTO POSTERIOR */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">Prolapso Posterior</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Retocele & Enterocele
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Sintomas evacuatórios:</strong> Dificuldade severa para eliminar fezes, que ficam retidas na "bolsa" anterior do reto.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Manobra de digitação vaginal:</strong> A paciente necessita pressionar a parede posterior da vagina com os dedos para conseguir evacuar!
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Sensação de resíduo fecal & perda de flatos:</strong> Incontinência anal para gases por fraqueza do corpo perineal.
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong>Problemas na relação sexual:</strong> Dispareunia de profundidade, alargamento do intróito e constrangimento.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BADEN-WALKER */}
      {activeTab === 'baden' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Layers className="text-cyan-400" size={20} />
                Classificação Tradicional de Baden-Walker (Halfway System)
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Critério Himenal
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O sistema de Baden-Walker avalia 6 sítios anatômicos atribuindo notas de <strong>Grau 0 a Grau 4</strong>, tendo como ponto de referência zero o <strong>anel himenal</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TABELA DE GRAUS */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-3">Grau</th>
                      <th className="p-3">Descrição Anatômica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                    <tr>
                      <td className="p-3 font-mono font-bold text-emerald-400">Grau 0</td>
                      <td className="p-3 text-slate-300">Posição anatômica normal (sem prolapso).</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-blue-400">Grau 1</td>
                      <td className="p-3 text-slate-300">Protrusão parcial até a metade da distância até o hímen (sem atingir o anel himenal).</td>
                    </tr>
                    <tr className="bg-amber-950/20">
                      <td className="p-3 font-mono font-bold text-amber-400">Grau 2</td>
                      <td className="p-3 text-slate-200 font-semibold">Protrusão que <strong>atinge o hímen</strong> sem ultrapassá-lo.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-orange-400">Grau 3</td>
                      <td className="p-3 text-slate-300">Protrusão parcial que <strong>ultrapassa o hímen</strong>, exteriorizando-se.</td>
                    </tr>
                    <tr className="bg-rose-950/20">
                      <td className="p-3 font-mono font-bold text-rose-400">Grau 4</td>
                      <td className="p-3 text-rose-300 font-semibold">Protrusão completa / procidência máxima (eversão total do órgão).</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* OS 6 SÍTIOS AVALIADOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                <span className="font-bold text-cyan-300 text-sm block">Os 6 Sítios Anatômicos Avaliados:</span>
                <ol className="space-y-1.5 text-slate-300 text-[11px] list-decimal pl-4">
                  <li><strong>Uretrocele:</strong> Prolapso da parede vaginal anterior suburetral.</li>
                  <li><strong>Cistocele:</strong> Descenso da parede vaginal anterior contendo a bexiga.</li>
                  <li><strong>Prolapso Uterino:</strong> Descida do colo uterino e corpo em direção ao introito.</li>
                  <li><strong>Enterocele:</strong> Hérnia do fundo de saco de Douglas contendo alças de delgado.</li>
                  <li><strong>Retocele:</strong> Prolapso da parede vaginal posterior contendo o reto.</li>
                  <li><strong>Laceração Perineal:</strong> Perda da integridade do corpo perineal e hiato alargado.</li>
                </ol>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-[10px] mt-2">
                  *Nota: Embora prático no consultório, Baden-Walker é subjetivo. Por isso, a International Continence Society (ICS) criou o sistema POP-Q em 1996.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. POP-Q TEORIA & GRADE 3X3 */}
      {activeTab === 'popq_teoria' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Compass className="text-cyan-400" size={20} />
                Sistema POP-Q (Pelvic Organ Prolapse Quantification)
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Padrão-Ouro ICS
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O POP-Q mede <strong>9 parâmetros em centímetros</strong> durante o esforço máximo (manobra de Valsalva) utilizando uma régua ou abaixador de língua graduado. O <strong>anel himenal é a linha zero</strong>: pontos acima do hímen têm sinal negativo (-) e pontos além do hímen têm sinal positivo (+).
            </p>

            {/* A GRADE 3X3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">A Grade 3x3 do POP-Q:</span>
                <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-800">
                    <span className="text-[10px] text-cyan-400 block font-bold">Aa</span>
                    <span className="text-xs text-slate-200">Ant. 3cm</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-800">
                    <span className="text-[10px] text-cyan-400 block font-bold">Ba</span>
                    <span className="text-xs text-slate-200">Ant. Maior</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-purple-800">
                    <span className="text-[10px] text-purple-400 block font-bold">C</span>
                    <span className="text-xs text-slate-200">Colo/Cúpula</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                    <span className="text-[10px] text-amber-400 block font-bold">HG</span>
                    <span className="text-xs text-slate-200">Hiato Genital</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                    <span className="text-[10px] text-amber-400 block font-bold">CP</span>
                    <span className="text-xs text-slate-200">Corpo Perineal</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                    <span className="text-[10px] text-amber-400 block font-bold">CVT</span>
                    <span className="text-xs text-slate-200">Comp. Vaginal</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-rose-800">
                    <span className="text-[10px] text-rose-400 block font-bold">Ap</span>
                    <span className="text-xs text-slate-200">Post. 3cm</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-rose-800">
                    <span className="text-[10px] text-rose-400 block font-bold">Bp</span>
                    <span className="text-xs text-slate-200">Post. Maior</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-purple-800">
                    <span className="text-[10px] text-purple-400 block font-bold">D</span>
                    <span className="text-xs text-slate-200">Fundo Saco</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  Linha superior = Parede anterior | Linha média = Medidas estáticas | Linha inferior = Parede posterior
                </p>
              </div>

              {/* DEFINIÇÕES EXATAS DOS PONTOS */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block">Aa & Ba (Parede Anterior):</strong>
                  <p className="text-[11px]"><strong>Aa:</strong> Linha média a 3 cm acima do hímen (-3 a +3 cm). <strong>Ba:</strong> Ponto mais prolapsado da parede anterior entre Aa e fundo de saco anterior C.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-purple-300 block">C & D (Ápice Vaginal):</strong>
                  <p className="text-[11px]"><strong>C:</strong> Borda mais distal do colo uterino ou cicatriz da cúpula. <strong>D:</strong> Fundo de saco posterior (reflete ligamentos uterossacrais; omitido se histerectomizada).</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block">HG, CP & CVT (Medidas Estáticas em repouso):</strong>
                  <p className="text-[11px]"><strong>HG:</strong> Meio do meato uretral à carúncula himenal posterior. <strong>CP:</strong> Carúncula posterior ao centro do ânus. <strong>CVT:</strong> Profundidade total da vagina.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-rose-300 block">Ap & Bp (Parede Posterior):</strong>
                  <p className="text-[11px]"><strong>Ap:</strong> Linha média a 3 cm acima do hímen (-3 a +3 cm). <strong>Bp:</strong> Ponto mais prolapsado da parede posterior entre Ap e fundo de saco D.</p>
                </div>
              </div>
            </div>

            {/* TABELA DE ESTADIAMENTO POP-Q (0 a IV) */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-300 block mb-2">Critérios Oficiais de Estadiamento POP-Q:</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-3">Estádio</th>
                      <th className="p-3">Critério Milimétrico</th>
                      <th className="p-3">Significado Clínico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                    <tr>
                      <td className="p-3 font-mono font-bold text-emerald-400">Estádio 0</td>
                      <td className="p-3 font-mono text-slate-300">Aa, Ba, Ap, Bp = -3 cm; C/D ≤ -(CVT - 2)</td>
                      <td className="p-3 text-slate-400 text-[11px]">Sem prolapso em esforço máximo.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-blue-400">Estádio I</td>
                      <td className="p-3 font-mono text-slate-300">Ponto mais distal &lt; -1 cm</td>
                      <td className="p-3 text-slate-400 text-[11px]">Prolapso situado a mais de 1 cm acima do hímen.</td>
                    </tr>
                    <tr className="bg-amber-950/20">
                      <td className="p-3 font-mono font-bold text-amber-400">Estádio II</td>
                      <td className="p-3 font-mono text-amber-300 font-bold">-1 cm ≤ Ponto mais distal ≤ +1 cm</td>
                      <td className="p-3 text-slate-300 text-[11px]">Prolapso no anel himenal (entre 1 cm acima e 1 cm abaixo).</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-orange-400">Estádio III</td>
                      <td className="p-3 font-mono text-slate-300">&gt; +1 cm até &lt; (CVT - 2 cm)</td>
                      <td className="p-3 text-slate-400 text-[11px]">Ultrapassa o hímen amplamente, sem eversão total.</td>
                    </tr>
                    <tr className="bg-rose-950/20">
                      <td className="p-3 font-mono font-bold text-rose-400">Estádio IV</td>
                      <td className="p-3 font-mono text-rose-400 font-bold">Ponto mais distal ≥ (CVT - 2 cm)</td>
                      <td className="p-3 text-rose-300 text-[11px]">Eversão completa da vagina / procidência total.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CALCULADORA & SIMULADOR POP-Q */}
      {activeTab === 'calculadora' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                  <Compass className="text-cyan-400" size={20} />
                  Calculadora Interativa de Estadiamento POP-Q
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Altere os valores ou selecione um caso predefinido para calcular instantaneamente o estágio e a interpretação anatômica.
                </p>
              </div>

              {/* BOTÕES DE PRESETS */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => loadPreset('normal')}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-slate-300"
                >
                  Normal (Estádio 0)
                </button>
                <button
                  onClick={() => loadPreset('caso_bernardo')}
                  className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-[11px] font-bold text-amber-300"
                >
                  ⭐ Caso Prof. André (Estádio II)
                </button>
                <button
                  onClick={() => loadPreset('estagio3')}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-slate-300"
                >
                  Estádio III
                </button>
                <button
                  onClick={() => loadPreset('estagio4')}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-slate-300"
                >
                  Estádio IV
                </button>
              </div>
            </div>

            {/* GRADE DE INPUTS INTERATIVOS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-2">
              <div className="space-y-3">
                <span className="text-xs font-bold text-cyan-300 block">Edite a Grade POP-Q (em cm):</span>
                <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  {/* LINHA 1: ANTERIOR */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-cyan-400 font-bold block">Aa (-3 a +3)</label>
                    <input
                      type="number"
                      value={aa}
                      onChange={e => setAa(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-cyan-400 font-bold block">Ba (-3 a +CVT)</label>
                    <input
                      type="number"
                      value={ba}
                      onChange={e => setBa(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-purple-400 font-bold block">C (Colo/Cúpula)</label>
                    <input
                      type="number"
                      value={c}
                      onChange={e => setC(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* LINHA 2: ESTÁTICAS */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-amber-400 font-bold block">HG (Hiato)</label>
                    <input
                      type="number"
                      value={hg}
                      onChange={e => setHg(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-amber-400 font-bold block">CP (Períneo)</label>
                    <input
                      type="number"
                      value={cp}
                      onChange={e => setCp(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-amber-400 font-bold block">CVT (Vagina)</label>
                    <input
                      type="number"
                      value={cvt}
                      onChange={e => setCvt(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* LINHA 3: POSTERIOR */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-rose-400 font-bold block">Ap (-3 a +3)</label>
                    <input
                      type="number"
                      value={ap}
                      onChange={e => setAp(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-rose-400 font-bold block">Bp (-3 a +CVT)</label>
                    <input
                      type="number"
                      value={bp}
                      onChange={e => setBp(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-purple-400 font-bold block">D (Fundo Saco)</label>
                    <input
                      type="number"
                      value={d}
                      onChange={e => setD(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-center text-white font-mono font-bold text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* CARD DE RESULTADO EM TEMPO REAL */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Resultado Calculado
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-black border ${result.color}`}>
                    {result.stage}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Ponto Mais Distal (Maior Prolapso):</span>
                    <span className="font-mono font-bold text-cyan-300 text-sm">
                      {result.maxPoint > 0 ? `+${result.maxPoint}` : result.maxPoint} cm
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Comprimento Vaginal Total (CVT):</span>
                    <span className="font-mono font-bold text-slate-200">{cvt} cm</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Limite de Estádio IV (CVT - 2):</span>
                    <span className="font-mono font-bold text-slate-200">+{cvt - 2} cm</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                  <strong className="text-white block">Interpretação Clínica:</strong>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {result.desc}
                  </p>
                </div>

                {/* NOTA SOBRE O HIATO E PERÍNEO */}
                {(hg > 4 || cp < 3) && (
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-[11px] text-amber-300 space-y-1">
                    <strong>Alerta de Suporte Perineal:</strong>
                    <p>
                      Hiato genital alargado (HG = {hg} cm &gt; 4 cm) e/ou Corpo perineal encurtado (CP = {cp} cm &lt; 3 cm) evidenciam <strong>rotura perineal com perda do corpo perineal</strong>, necessitando de reconstrução cirúrgica (perineoplastia).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
