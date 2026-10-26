import React, { useState } from 'react';
import { 
  Activity, HeartPulse, Sparkles, AlertTriangle, 
  CheckCircle2, Info, ShieldAlert, Award, ArrowRight, Brain, Clock
} from 'lucide-react';

export default function USGPerfilBiofisicoCasos() {
  // Estados para o cálculo interativo de PBF
  const [fcfScore, setFcfScore] = useState<number>(2);
  const [respScore, setRespScore] = useState<number>(2);
  const [movScore, setMovScore] = useState<number>(2);
  const [tonusScore, setTonusScore] = useState<number>(2);
  const [liquidoScore, setLiquidoScore] = useState<number>(2);

  // Estados para os casos clínicos
  const [selectedCase, setSelectedCase] = useState<number>(1);
  const [showCaseAnswer, setShowCaseAnswer] = useState<boolean>(false);

  const totalPBF = fcfScore + respScore + movScore + tonusScore + liquidoScore;

  const getPBFAdvice = () => {
    if (totalPBF === 10) {
      return {
        badge: '10/10 · Normal (Feto Hígido)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-800',
        text: 'Ausência de hipóxia ou asfixia aguda/crônica. Risco de óbito intrauterino em 7 dias é inferior a 1 em 1.000. Manter conduta pré-natal habitual.'
      };
    } else if (totalPBF === 8) {
      if (liquidoScore === 0) {
        return {
          badge: '8/10 com Oligodramnia (Asfixia Crônica)',
          color: 'text-amber-400',
          bg: 'bg-amber-950/40 border-amber-800',
          text: 'Feto sem acidemia aguda iminente, mas com comprometimento renal crônico (oligúria fetal por redistribuição de fluxo). Indicação de resolução se gestação a termo (≥ 37 semanas) ou vigilância diária intensiva com Doppler se pré-termo.'
        };
      }
      return {
        badge: '8/10 com Líquido Normal (Normal)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-800',
        text: 'Feto hígido e com oxigenação preservada. A ausência de um parâmetro motor transitório pode decorrer apenas de ciclo de sono fetal normal (repetir após estímulo acústico se necessário).'
      };
    } else if (totalPBF === 6) {
      return {
        badge: '6/10 · Escore Equívoco / Suspeita de Asfixia',
        color: 'text-amber-400',
        bg: 'bg-amber-950/40 border-amber-800',
        text: 'Possível acidemia fetal em desenvolvimento. Se gestação a termo (≥ 37 semanas), indicar indução de parto / resolução. Se pré-termo, repetir exame em 12 a 24 horas e associar com dopplerfluxometria fetal e materna.'
      };
    } else {
      return {
        badge: `${totalPBF}/10 · Asfixia Fetal Aguda Grave`,
        color: 'text-rose-400',
        bg: 'bg-rose-950/40 border-rose-800',
        text: 'Altíssimo risco de acidemia metabólica grave e óbito fetal intrauterino iminente. Indicação formal de resolução obstétrica imediata (geralmente por via alta/cesariana, salvo se trabalho de parto avançado).'
      };
    }
  };

  const pbfAdvice = getPBFAdvice();

  return (
    <div className="space-y-6">
      {/* INTRODUÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950 text-purple-400 border border-purple-800">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">
              Eixo 7 & 8 · Avaliação Biofísica & Tomada de Decisão
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              7. Perfil Biofísico Fetal (PBF) e Casos Clínicos Estruturantes
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          O Perfil Biofísico Fetal (escore de Manning) integra marcadores ultrassonográficos dinâmicos em tempo real com a cardiotocografia para estimar o funcionamento dos centros neurológicos fetais sob estresse hipóxico. Compreender a fisiologia e a ordem sequencial de perda é essencial para a conduta obstétrica segura.
        </p>
      </div>

      {/* CALCULADORA INTERATIVA DE PBF (MANNING) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-purple-500/70 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Sparkles size={20} />
            <h4 className="text-base font-black text-white">
              Calculadora Dinâmica do Perfil Biofísico Fetal (0 a 10 Pontos)
            </h4>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-bold block">Escore Total:</span>
            <span className="text-2xl font-mono font-black text-purple-300">{totalPBF} / 10</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Parâmetro 1: Cardiotocografia */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">1. Reatividade Cardíaca (CTG)</span>
              <span className="font-mono text-xs text-purple-400">{fcfScore} pts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              &ge; 2 acelerações transitórias de &ge; 15 bpm por &ge; 15 segundos em até 30 minutos.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setFcfScore(2)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  fcfScore === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Reativo (+2)
              </button>
              <button
                onClick={() => setFcfScore(0)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  fcfScore === 0 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Hipoativo (0)
              </button>
            </div>
          </div>

          {/* Parâmetro 2: Movimentos Respiratórios */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">2. Movimentos Respiratórios</span>
              <span className="font-mono text-xs text-purple-400">{respScore} pts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              &ge; 1 episódio contínuo de movimentos respiratórios de &ge; 30 segundos em 30 min.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setRespScore(2)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  respScore === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Presente (+2)
              </button>
              <button
                onClick={() => setRespScore(0)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  respScore === 0 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Ausente (0)
              </button>
            </div>
          </div>

          {/* Parâmetro 3: Movimentos Corporais */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">3. Movimentos Corporais</span>
              <span className="font-mono text-xs text-purple-400">{movScore} pts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              &ge; 3 movimentos amplos distintos de tronco ou membros em 30 minutos de observação.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setMovScore(2)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  movScore === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                &ge; 3 Movs (+2)
              </button>
              <button
                onClick={() => setMovScore(0)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  movScore === 0 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                &lt; 3 Movs (0)
              </button>
            </div>
          </div>

          {/* Parâmetro 4: Tônus Fetal */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">4. Tônus Fetal</span>
              <span className="font-mono text-xs text-purple-400">{tonusScore} pts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              &ge; 1 episódio de extensão ativa de membro ou coluna com retorno rápido à flexão.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setTonusScore(2)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  tonusScore === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Flexão Ativa (+2)
              </button>
              <button
                onClick={() => setTonusScore(0)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  tonusScore === 0 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Hipotonia (0)
              </button>
            </div>
          </div>

          {/* Parâmetro 5: Volume de Líquido Amniótico */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">5. Volume de Líquido (MBV)</span>
              <span className="font-mono text-xs text-purple-400">{liquidoScore} pts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pelo menos um bolsão vertical único medindo &ge; 2,0 cm livre de cordão ou membros.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setLiquidoScore(2)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  liquidoScore === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                MBV &ge; 2 cm (+2)
              </button>
              <button
                onClick={() => setLiquidoScore(0)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  liquidoScore === 0 ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                MBV &lt; 2 cm (0)
              </button>
            </div>
          </div>

          {/* Cartão de Síntese e Conduta Imediata */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between text-xs ${pbfAdvice.bg}`}>
            <div>
              <span className={`font-black text-xs uppercase tracking-wider block mb-1 ${pbfAdvice.color}`}>
                {pbfAdvice.badge}
              </span>
              <p className="text-slate-200 leading-relaxed font-medium">
                {pbfAdvice.text}
              </p>
            </div>
            <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
              Decisão Médica Baseada em Evidências
            </div>
          </div>
        </div>
      </div>

      {/* A CASCATA NEUROFISIOLÓGICA DA HIPÓXIA (POR QUE SE PERDEM NESTA ORDEM?) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
          <Brain size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Fisiologia: A Cascata Sequencial de Perda dos Parâmetros pela Hipóxia
          </h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A perda dos parâmetros do PBF obedece estritamente à <strong>ordem cronológica inversa do desenvolvimento embriológico dos centros nervosos</strong>: os centros que se desenvolvem por último na vida fetal requerem mais oxigênio e são os primeiros a ser suprimidos pela acidemia:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400">1º a Desaparecer</span>
              <span className="text-[10px] text-slate-500 font-mono">Hipotálamo/Bulbo</span>
            </div>
            <div className="font-bold text-white text-sm">Reatividade Cardíaca (CTG)</div>
            <p className="text-slate-400 leading-relaxed">
              O sistema autonômico simpático/parassimpático sofre disfunção imediata com níveis mínimos de hipóxia (pH &lt; 7,25).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">2º a Desaparecer</span>
              <span className="text-[10px] text-slate-500 font-mono">Centro Respiratório</span>
            </div>
            <div className="font-bold text-white text-sm">Movimentos Respiratórios</div>
            <p className="text-slate-400 leading-relaxed">
              O centro respiratório no 4º ventrículo deprime-se logo após a perda da reatividade, cessando a respiração fetal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400">3º a Desaparecer</span>
              <span className="text-[10px] text-slate-500 font-mono">Núcleos Vermelhos</span>
            </div>
            <div className="font-bold text-white text-sm">Movimentos Corporais</div>
            <p className="text-slate-400 leading-relaxed">
              O córtex motor cessa os movimentos amplos de membros e tronco para poupar consumo calórico e glicose.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border-2 border-purple-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300">Último a Desaparecer</span>
              <span className="text-[10px] text-slate-500 font-mono">Córtex Subcortical</span>
            </div>
            <div className="font-bold text-white text-sm">Tônus Fetal</div>
            <p className="text-slate-300 leading-relaxed">
              O centro do tônus é o mais resistente à hipóxia. Se o feto está flácido/sem tônus, a acidemia é extrema (pH &lt; 7,10).
            </p>
          </div>
        </div>
      </div>

      {/* CASOS CLÍNICOS ESTRUTURANTES DE TOMADA DE DECISÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <Award size={20} />
            <span>Casos Clínicos Estruturantes: Decisões Obstétricas Reais</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Prática Baseada em Evidências</span>
        </div>

        {/* Botoes de Seleção dos Casos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 1, title: 'Caso 1: Dúvida de Datação', tag: 'Datação & DUM' },
            { id: 2, title: 'Caso 2: TN 3,6 mm Alterada', tag: 'Rastreio 1º Tri' },
            { id: 3, title: 'Caso 3: Diástole Zero às 29s', tag: 'RCF Precoce' },
            { id: 4, title: 'Caso 4: VPS-ACM Elevada', tag: 'Anemia Fetal' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCase(c.id);
                setShowCaseAnswer(false);
              }}
              className={`p-3 rounded-2xl text-left border transition-all ${
                selectedCase === c.id
                  ? 'bg-rose-950/60 border-rose-600 text-white shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">{c.tag}</span>
              <span className="text-xs font-bold">{c.title}</span>
            </button>
          ))}
        </div>

        {/* Detalhamento do Caso Selecionado */}
        {selectedCase === 1 && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs leading-relaxed">
            <div className="space-y-1">
              <span className="text-rose-400 font-bold uppercase text-[10px]">Cenário Clínico</span>
              <h5 className="text-white font-bold text-sm">Primigesta com DUM Incerta e Ultrassom de 1º Trimestre</h5>
              <p className="text-slate-300">
                Gestante de 24 anos, primigesta, comparece à primeira consulta de pré-natal trazendo USG realizado há 3 semanas que descreve: <em>"Saco gestacional único intrauterino com embrião vivo, CCN medindo 61 mm (compatível com 12 semanas e 4 dias na ocasião)".</em> A paciente relata que sua última menstruação foi "no início de maio", mas seus ciclos eram irregulares (35 a 50 dias).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <strong>Pergunta Clínica:</strong> Qual datação deve ser estabelecida no Cartão de Pré-Natal e qual a conduta para agendamento dos próximos exames?
            </div>

            <button
              onClick={() => setShowCaseAnswer(!showCaseAnswer)}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-all flex items-center gap-2"
            >
              {showCaseAnswer ? 'Ocultar Resolução e Conduta' : 'Revelar Resolução e Conduta'}
              <ArrowRight size={14} />
            </button>

            {showCaseAnswer && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-200 space-y-2">
                <div className="font-bold text-sm text-emerald-300">Resolução e Conduta Padrão-Ouro:</div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                  <li><strong>Datação Definitiva pelo CCN:</strong> O CCN de 61 mm está exatamente na janela de ouro (45 a 84 mm). A idade gestacional é fixada estritamente pelo exame de ultrassom (margem de erro de apenas ± 5 dias). A DUM incerta e com ciclos anovulatórios deve ser abandonada.</li>
                  <li><strong>Data Provável do Parto (DPP):</strong> Calculada a partir da idade do USG. Essa data NUNCA mais poderá ser alterada por exames de 2º ou 3º trimestre, mesmo que haja discordância biométrica futura.</li>
                  <li><strong>Próximo Passo:</strong> Agendar a <strong>Ultrassonografia Morfológica de 2º Trimestre entre 20 e 24 semanas</strong> calculadas rigorosamente por essa datação.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedCase === 2 && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs leading-relaxed">
            <div className="space-y-1">
              <span className="text-rose-400 font-bold uppercase text-[10px]">Cenário Clínico</span>
              <h5 className="text-white font-bold text-sm">Rastreio de 1º Trimestre com Transluscência Nucal Alterada</h5>
              <p className="text-slate-300">
                Multigesta de 36 anos realiza ultrassonografia com 12 semanas e 2 dias (CCN 58 mm). O laudo revela: <strong>Transluscência Nucal de 3,6 mm (&gt; P99)</strong>, <strong>osso nasal não visualizado (ausente)</strong> e presença de <strong>regurgitação na valva tricúspide com velocidade de 75 cm/s</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <strong>Pergunta Clínica:</strong> Qual o risco fetal estimado, qual o procedimento diagnóstico indicado e que exame complementar é mandatório mesmo se o cariótipo for normal?
            </div>

            <button
              onClick={() => setShowCaseAnswer(!showCaseAnswer)}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-all flex items-center gap-2"
            >
              {showCaseAnswer ? 'Ocultar Resolução e Conduta' : 'Revelar Resolução e Conduta'}
              <ArrowRight size={14} />
            </button>

            {showCaseAnswer && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 space-y-2">
                <div className="font-bold text-sm text-rose-300">Resolução e Conduta Padrão-Ouro:</div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                  <li><strong>Risco Genético Elevadíssimo:</strong> A combinação de TN &gt; 3,5 mm (P99), osso nasal ausente e regurgitação tricúspide eleva o risco para Síndrome de Down (Trissomia 21) para mais de 1:5 a 1:10.</li>
                  <li><strong>Procedimento Diagnóstico Invasivo:</strong> Indicar <strong>Biópsia de Vilo Corial (BVC)</strong> imediata (até 13s6d) ou Amniocentese com 16 semanas para estudo citogenético completo (Cariótipo com banda G e Microarray / CGH-Array). O NIPT não é o método ideal nesta situação, pois a paciente já possui indicação de teste diagnóstico definitivo invasivo.</li>
                  <li><strong>Ecocardiograma Fetal Obrigatório:</strong> Mesmo se o cariótipo for euploide (46,XX ou 46,XY), uma TN &ge; 3,5 mm confere risco de 5% a 10% de <strong>cardiopatia congênita estrutural maior</strong> (defeito do septo atrioventricular, Tetralogia de Fallot, coarctação). O ecocardiograma fetal é mandatório com 20–24 semanas.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedCase === 3 && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs leading-relaxed">
            <div className="space-y-1">
              <span className="text-rose-400 font-bold uppercase text-[10px]">Cenário Clínico</span>
              <h5 className="text-white font-bold text-sm">RCF Precoce Extremo com Diástole Zero na Artéria Umbilical</h5>
              <p className="text-slate-300">
                Primigesta com 29 semanas e Pré-Eclâmpsia controlada com anti-hipertensivo realiza Doppler de vigilância. Achados: Peso Fetal Estimado no percentil 2 (RCF grave); <strong>Artéria Umbilical com Diástole Zero persistente</strong>; Artéria Cerebral Média centralizada (IP &lt; p5); <strong>Ducto Venoso com onda 'a' positiva e IP normal</strong>; PBF 8/10 (com ILA 6,0 cm).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <strong>Pergunta Clínica:</strong> Indicar cesariana de urgência imediata com 29 semanas ou manter conduta expectante sob vigilância? Qual o parâmetro guia?
            </div>

            <button
              onClick={() => setShowCaseAnswer(!showCaseAnswer)}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-all flex items-center gap-2"
            >
              {showCaseAnswer ? 'Ocultar Resolução e Conduta' : 'Revelar Resolução e Conduta'}
              <ArrowRight size={14} />
            </button>

            {showCaseAnswer && (
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800 text-indigo-200 space-y-2">
                <div className="font-bold text-sm text-indigo-300">Resolução e Conduta Padrão-Ouro (Estudo TRUFFLE):</div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                  <li><strong>Internação Hospitalar Imediata:</strong> Gestação pré-termo extrema com diástole zero requer monitorização internada em centro terciário com UTI Neonatal de ponta.</li>
                  <li><strong>Corticoterapiapara Maturação Pulmonar:</strong> Administrar imediatamente <strong>Betametasona 12 mg IM em 2 doses com intervalo de 24 horas</strong>.</li>
                  <li><strong>Conduta Expectante Guiada pelo Ducto Venoso:</strong> O estudo europeu multicêntrico TRUFFLE demonstrou que a interrupção prematura às 29 semanas apenas pela diástole zero com Ducto Venoso normal aumenta a mortalidade neonatal e sequelas neurológicas. <strong>Enquanto o Ducto Venoso mantiver onda 'a' positiva e a cardiotocografia for reativa, a gestação deve ser mantida sob monitorização a cada 24-48h até 32–34 semanas.</strong></li>
                  <li><strong>Critérios de Interrupção Imediata:</strong> Onda 'a' do Ducto Venoso ausente ou reversa, perda de variabilidade na CTG, ou ao atingir 32 a 34 semanas (fazendo Neuroproteção com Sulfato de Magnésio antes do parto).</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedCase === 4 && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs leading-relaxed">
            <div className="space-y-1">
              <span className="text-rose-400 font-bold uppercase text-[10px]">Cenário Clínico</span>
              <h5 className="text-white font-bold text-sm">Aloimunização Rh Materna e Suspeita de Anemia Fetal Grave</h5>
              <p className="text-slate-300">
                Secundigesta de 30 semanas, tipagem sanguínea O negativo com parceiro A positivo homozigoto (Rh positivo). Traz titulação de Teste de Coombs Indireto de <strong>1:64 (valor crítico &ge; 1:16)</strong>. Realiza Doppler da Artéria Cerebral Média que revela: <strong>Velocidade do Pico Sistólico (VPS-ACM) de 68 cm/s (correspondente a 1,65 MoM)</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <strong>Pergunta Clínica:</strong> Qual o diagnóstico hemodinâmico e qual a conduta terapêutica intervencionista salvadora indicada?
            </div>

            <button
              onClick={() => setShowCaseAnswer(!showCaseAnswer)}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-all flex items-center gap-2"
            >
              {showCaseAnswer ? 'Ocultar Resolução e Conduta' : 'Revelar Resolução e Conduta'}
              <ArrowRight size={14} />
            </button>

            {showCaseAnswer && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 space-y-2">
                <div className="font-bold text-sm text-rose-300">Resolução e Conduta Padrão-Ouro:</div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                  <li><strong>Diagnóstico: Anemia Fetal Moderada a Grave</strong>. O corte de VPS-ACM &gt; 1,5 MoM identifica com 100% de sensibilidade hemoglobina fetal abaixo de 4 a 5 desvios-padrão (risco de hidropisia fetal iminente por insuficiência cardíaca de alto débito).</li>
                  <li><strong>Contraindicação de Amniocentese:</strong> A amniocentese com curva de Liley está em desuso histórico, sendo substituída pelo Doppler não invasivo da ACM.</li>
                  <li><strong>Conduta Imediata: Cordocentese Diagnóstica e Terapêutica</strong> em centro cirúrgico com suporte de hemoterapia. Punção percutânea da veia umbilical guiada por USG, coleta de gasometria/hematócrito fetal e realização imediata de <strong>Transfusão Intrauterina (TIU) de concentrado de hemácias lavadas, leucodepletadas, irradiadas e O negativo</strong> para elevar o hematócrito fetal para cerca de 40–45%.</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
