import React, { useState } from 'react';
import { 
  HeartPulse, Activity, Zap, AlertTriangle, 
  ShieldAlert, ArrowRight, Gauge, CheckCircle2, SplitSquareVertical, Clock,
  HelpCircle, Eye, Sparkles, Award, Scale, Info
} from 'lucide-react';

export default function USGDopplerHemodinamica() {
  const [selectedVessel, setSelectedVessel] = useState<'uterina' | 'umbilical' | 'acm' | 'ducto'>('umbilical');
  const [rcfType, setRcfType] = useState<'precoce' | 'tardio'>('precoce');
  const [showCase32Resolution, setShowCase32Resolution] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* INTRODUÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <HeartPulse size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Pilar Clínico 3 · Hemodinâmica & Vitalidade Fetal
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Dopplervelocimetria Materno-Fetal (Doppler)
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          O Doppler não busca malformações anatômicas isoladas: ele <strong>traduz a resistência vascular em decisão clínica</strong>, avaliando o leito trofoblástico da placenta, o intercâmbio de oxigênio feto-placentário e os mecanismos fetais adaptativos à hipóxia.
        </p>

        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-xs text-rose-200 font-semibold flex items-center gap-2">
          <Info size={16} className="shrink-0" />
          <span><strong>Conceito Fundamental dos Slides:</strong> Doppler não é uma foto colorida: é uma <strong>curva espectral contínua</strong>. Devemos observar os índices (IP, IR, relação S/D), o fluxo diastólico e integrar rigorosamente à idade gestacional e ao contexto clínico materno. Não decidir por um número isolado!</span>
        </div>
      </div>

      {/* SELETOR DOS 4 VASOS CARDIAIS (SLIDE 38) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedVessel('uterina')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedVessel === 'uterina' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity size={16} />
          <span>1. Artéria Uterina (Placentação & Risco)</span>
        </button>
        <button
          onClick={() => setSelectedVessel('umbilical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedVessel === 'umbilical' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap size={16} />
          <span>2. Artéria Umbilical (Resistência Placentária)</span>
        </button>
        <button
          onClick={() => setSelectedVessel('acm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedVessel === 'acm' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Gauge size={16} />
          <span>3. Cerebral Média (Redistribuição / Anemia)</span>
        </button>
        <button
          onClick={() => setSelectedVessel('ducto')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedVessel === 'ducto' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HeartPulse size={16} />
          <span>4. Ducto Venoso (Comprometimento Avançado)</span>
        </button>
      </div>

      {/* DETALHAMENTO DO VASO SELECIONADO */}
      {selectedVessel === 'uterina' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <Activity size={20} />
              <span>Artérias Uterinas: Placentação e Risco de Doença Hipertensiva / RCF</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Compartimento Materno</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-300 font-bold">Fisiologia Normal da Invasão</div>
              <p className="text-slate-300 leading-relaxed">
                As artérias espiraladas são remodeladas pelo trofoblasto em vasos flácidos de <strong>baixa resistência</strong>. O Doppler normal no 2º trimestre apresenta velocidade diastólica ampla e contínua, sem incisura protodiastólica após 24 a 26 semanas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-amber-300 font-bold">Critérios de Anormalidade</div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Índice de Pulsatilidade Médio (IPm) &gt; Percentil 95</strong> após 24 semanas e/ou persistência de <strong>incisura protodiastólica bilateral</strong>.
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                Reflete falha na 2ª onda de migração trofoblástica e vasoespasmo crônico.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-rose-300 font-bold">Significado Clínico & Conduta</div>
              <p className="text-slate-300 leading-relaxed">
                Identifica risco elevado de <strong>Pré-Eclâmpsia com início precoce</strong> e RCF grave. <em>Nota crucial dos slides:</em> A artéria uterina prediz risco; ela <strong>não mede a vitalidade aguda imediata do feto</strong> (o feto pode estar hemodinamicamente compensado no momento).
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedVessel === 'umbilical' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-900/80 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <Zap size={20} />
              <span>Artéria Umbilical: O Termômetro da Resistência Placentária</span>
            </div>
            <span className="text-xs font-mono text-cyan-300 font-bold">Compartimento Feto-Placentário</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            A artéria umbilical reflete diretamente a integridade do leito vilositário da placenta. Em gestações normais, o leito tem baixa resistência e grande fluxo diastólico. Quando há infarto vilositário extenso (&gt; 50-60%), a resistência sobe até anular ou reverter a diástole:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Grau 1: Normal */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
              <span className="font-bold text-emerald-400 block">1. Normal (Baixa Resistência)</span>
              <p className="text-slate-300">
                IP &lt; p95 com amplo fluxo anterógrado em toda a sístole e diástole. Placenta hígida.
              </p>
              <div className="text-[10px] text-emerald-300 font-mono">Seguimento habitual</div>
            </div>

            {/* Grau 2: IP > p95 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
              <span className="font-bold text-amber-400 block">2. IP &gt; p95 (Resistência Aumentada)</span>
              <p className="text-slate-300">
                Redução da velocidade na diástole com IP aumentado. Lesão vascular de 30% a 50% dos vilos.
              </p>
              <div className="text-[10px] text-amber-300 font-mono">Doppler semanal</div>
            </div>

            {/* Grau 3: Diástole Zero */}
            <div className="p-4 rounded-2xl bg-slate-950 border-2 border-rose-600/80 space-y-2 bg-rose-950/20">
              <span className="font-bold text-rose-400 block">3. Diástole Zero (Ausente)</span>
              <p className="text-slate-200">
                Parada completa do fluxo sanguíneo na diástole ventricular. Mais de 60% da vasculatura placentária ocluída.
              </p>
              <div className="text-[10px] text-rose-300 font-mono font-bold">Interrupção &ge; 32-34 sem</div>
            </div>

            {/* Grau 4: Diástole Reversa */}
            <div className="p-4 rounded-2xl bg-slate-950 border-2 border-rose-500 space-y-2 bg-rose-950/40">
              <span className="font-bold text-rose-300 block">4. Diástole Reversa (Retrógrada)</span>
              <p className="text-slate-200">
                Refluxo de sangue na diástole em direção ao coração fetal. Mais de 75% dos vilos destruídos.
              </p>
              <div className="text-[10px] text-rose-200 font-mono font-bold">Interrupção &ge; 30-32 sem</div>
            </div>
          </div>
        </div>
      )}

      {selectedVessel === 'acm' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Gauge size={20} />
              <span>Artéria Cerebral Média: Redistribuição Hemodinâmica vs Anemia Fetal</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Dupla Aplicação Clínica</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Redistribuição / Centralização */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">1. Redistribuição Hemodinâmica (*Brain-Sparing*)</span>
              <p className="text-slate-300 leading-relaxed">
                Diante de hipóxia crônica, o feto poupa cérebro, miocárdio e adrenais dilatando a circulação encefálica:
              </p>
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/80 space-y-1.5 text-cyan-200">
                <div><strong>Marcador Ultrassonográfico:</strong> Queda do IP da ACM (&lt; p5) e vasodilatação cerebral.</div>
                <div className="text-white font-mono font-bold text-xs">Relação Cérebro-Placentária (RCP = IP ACM / IP Umbilical) &lt; 1,0 ou &lt; p5</div>
                <p className="text-slate-300 text-[11px]">
                  A RCP alterada é o marcador mais precoce e sensível de acidose no RCF de início tardio (&ge; 32 semanas).
                </p>
              </div>
            </div>

            {/* VPS-ACM e Anemia Fetal */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">2. Velocidade do Pico Sistólico (VPS-ACM) e Anemia Fetal</span>
              <p className="text-slate-300 leading-relaxed">
                Na anemia fetal (por aloimunização Rh ou Parvovírus B19), o sangue diluído tem menor viscosidade e maior velocidade circulatória:
              </p>
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/80 space-y-1.5 text-rose-200">
                <div><strong>Critério Diagnóstico Padrão-Ouro:</strong></div>
                <div className="text-white font-mono font-bold text-xs">VPS-ACM &gt; 1,5 MoM (Múltiplos da Mediana)</div>
                <p className="text-slate-300 text-[11px]">
                  Sensibilidade de 100% para anemia grave. Substitui completamente a amniocentese com curva de Liley. Indicação de <strong>cordocentese diagnóstica e transfusão intravascular intrauterina</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedVessel === 'ducto' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-purple-900/80 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
              <HeartPulse size={20} />
              <span>Ducto Venoso: Comprometimento Fetal Avançado & Acidemia Metabólica</span>
            </div>
            <span className="text-xs font-mono text-purple-300 font-bold">Onda 'a' Reversa</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            O ducto venoso conduz sangue altamente oxigenado da veia umbilical para o átrio esquerdo através do forame oval. Sua morfologia de onda reflete a pressão diastólica final do ventrículo direito:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-300 font-bold">Morfologia Trifásica</div>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong>Onda S:</strong> Sístole ventricular fetal.</li>
                <li><strong>Onda D:</strong> Diástole precoce (enchimento ventricular passivo).</li>
                <li><strong>Onda 'a':</strong> Sístole atrial (contração ativa).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold">Normal: Onda 'a' Positiva</div>
              <p className="text-slate-300 leading-relaxed">
                A onda 'a' é sempre positiva (anterógrada) no feto saudável, pois o miocárdio tem complacência preservada para receber a contração atrial.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800 space-y-2">
              <div className="text-rose-400 font-bold">Onda 'a' Reversa (Patológica)</div>
              <p className="text-purple-200 leading-relaxed font-semibold">
                Sob acidemia metabólica e falência miocárdica (pH &lt; 7,20), a pressão intracardíaca se eleva e o sangue reflui para as veias centrais durante a contração do átrio.
              </p>
              <div className="text-[11px] text-rose-300">
                Risco crítico de óbito intrauterino em 24 a 48h. Indicação formal de interrupção imediata da gestação.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASO CLÍNICO PRÁTICO DOS SLIDES (SLIDE 41): 32 SEMANAS COM PESO P6 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/70 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <HelpCircle size={20} />
            <span>Caso Clínico dos Slides: "O Laudo Só Ganha Sentido Quando Volta para a Paciente"</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Discussão de 4º Ano da UNIP</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300 leading-relaxed">
          <p className="font-bold text-white text-sm">Cenário Clínico:</p>
          <p>
            Gestante de 32 semanas de gestação, com altura uterina (AU) menor que a esperada na consulta pré-natal. Realiza USG que mostra: <strong>Peso Fetal Estimado no percentil 6, Líquido Amniótico normal e Doppler da Artéria Umbilical normal.</strong>
          </p>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-medium">
            <strong>Perguntas dos Slides:</strong> É RCF ou pequeno constitucional (PIG)? Que dados adicionais faltam no laudo? Quando repetir e como vigiar?
          </div>
        </div>

        <button
          onClick={() => setShowCase32Resolution(!showCase32Resolution)}
          className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-500 transition-all flex items-center gap-2"
        >
          {showCase32Resolution ? 'Ocultar Resolução Comentada' : 'Revelar Resolução Comentada da Aula'}
          <ArrowRight size={14} />
        </button>

        {showCase32Resolution && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-800/80 text-xs space-y-3 leading-relaxed">
            <span className="font-bold text-amber-300 text-sm block">Interpretação e Conduta Racional:</span>
            <ul className="space-y-2 list-disc list-inside text-slate-200">
              <li>
                <strong>PIG Constitucional vs RCF Tardio:</strong> Um feto com peso entre o percentil 3 e 10 pode ser apenas biologicamente pequeno (PIG constitucional hígido) ou portador de Restrição de Crescimento Fetal de início tardio (RCF tardio).
              </li>
              <li>
                <strong>Quais dados adicionais faltam?</strong> No RCF tardio (&ge; 32 semanas), a artéria umbilical é frequentemente normal! É mandatório avaliar a <strong>Artéria Cerebral Média (ACM)</strong> e calcular a <strong>Relação Cérebro-Placentária (RCP = IP ACM / IP Umbilical)</strong>. Se a RCP estiver abaixo do p5, há redistribuição de fluxo e o diagnóstico é <strong>RCF Tardio</strong>! Além disso, avaliar a história obstétrica, estatura dos pais e curva ponderal prévia.
              </li>
              <li>
                <strong>Quando repetir e como vigiar?</strong>
                <ul className="pl-6 pt-1 space-y-1 list-circle text-slate-300">
                  <li>Se PIG isolado (RCP normal, curva mantida, sem fatores maternos): vigilância a cada 10 a 14 dias com Doppler e biometria seriada em 2 a 3 semanas. Parto pode aguardar 39-40 semanas.</li>
                  <li>Se RCF tardio confirmado (RCP &lt; p5): vigilância intensificada (Doppler 1 a 2x/semana e CTG) com resolução programada entre <strong>37 e 38 semanas</strong>.</li>
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* ROTEIRO SEGURO DOS SLIDES: DO ACHADO À CONDUTA (SLIDE 42) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
            <SplitSquareVertical size={20} />
            <span>Do Achado à Conduta: Um Roteiro Seguro em 4 Etapas</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Raciocínio Clínico</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-2xl font-black text-indigo-400 font-mono">1</div>
            <div className="font-bold text-white text-sm">Confirmar</div>
            <p className="text-slate-400">Técnica empregada, plano de corte adequado, magnificação e idade gestacional definitiva.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-2xl font-black text-indigo-400 font-mono">2</div>
            <div className="font-bold text-white text-sm">Classificar</div>
            <p className="text-slate-400">Normal, variante anatômica sem significado, achado suspeito (*soft marker*) ou diagnóstico patológico.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-2xl font-black text-indigo-400 font-mono">3</div>
            <div className="font-bold text-white text-sm">Correlacionar</div>
            <p className="text-slate-400">Quadro clínico materno, sintomas, idade materna, fatores de risco e exames laboratoriais (&beta;-hCG, TOTG).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-2xl font-black text-indigo-400 font-mono">4</div>
            <div className="font-bold text-white text-sm">Agir</div>
            <p className="text-slate-400">Repetir no intervalo correto, solicitar método complementar, encaminhar ao pré-natal de alto risco ou intervir.</p>
          </div>
        </div>
      </div>

      {/* AS CINCO MENSAGENS PARA LEVAR (SLIDE 43) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
          <Award size={20} />
          <span>Cinco Mensagens Fundamentais para Levar para a Prática Médica</span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { num: 1, text: 'A idade gestacional define rigorosamente o que é esperado encontrar em cada exame.' },
            { num: 2, text: 'O ultrassom transvaginal é indispensável em situações selecionadas (dor/sangramento precoce, colo uterino e suspeita de placenta prévia).' },
            { num: 3, text: 'Achado isolado deve ser correlacionado com a clínica antes de rotular a gestação.' },
            { num: 4, text: 'Doppler e Ressonância Magnética são exames complementares que exigem indicação médica clara.' },
            { num: 5, text: 'O melhor exame é aquele que efetivamente muda uma decisão clínica.' }
          ].map(m => (
            <div key={m.num} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300">
              <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                {m.num}
              </span>
              <span className="font-medium text-white">{m.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
