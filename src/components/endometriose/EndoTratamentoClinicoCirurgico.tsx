import React, { useState } from 'react';
import { 
  Pill, Scissors, AlertCircle, CheckCircle2, 
  Sparkles, Activity, ShieldAlert, Heart, ShieldCheck, Zap, ArrowRight
} from 'lucide-react';

export default function EndoTratamentoClinicoCirurgico() {
  const [treatmentGoal, setTreatmentGoal] = useState<'dor' | 'gestar' | 'orgaos' | 'reserva'>('dor');

  return (
    <div className="space-y-8">
      {/* HEADER DO EIXO 7 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Pill size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Eixo 7 · Manejo Clínico & Cirúrgico Individualizado
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              7. A Pergunta Não É "Qual Remédio?", Mas "Qual Objetivo?"
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O tratamento da endometriose deve ser rigorosamente <strong>personalizado e centrado na paciente</strong>. Não existe uma receita única: a escolha terapêutica depende primordialmente de a paciente desejar engravidar imediatamente ou controlar a dor, além da presença de risco de perda de função de órgãos nobres.
        </p>
      </div>

      {/* OS 4 OBJETIVOS CLÍNICOS ESTRATÉGICOS — INTERATIVO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Activity size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Definindo o Objetivo Terapêutico Central
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
            Clique no Objetivo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <button
            onClick={() => setTreatmentGoal('dor')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              treatmentGoal === 'dor'
                ? 'bg-rose-950/80 border-rose-500 text-white shadow-lg ring-2 ring-rose-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block mb-1">Objetivo 1</span>
            <strong className="text-sm font-bold block text-white">Controlar a Dor</strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Sem desejo gestacional imediato $\to$ Foco em anovulação, amenorreia e supressão estrogênica.
            </p>
          </button>

          <button
            onClick={() => setTreatmentGoal('gestar')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              treatmentGoal === 'gestar'
                ? 'bg-purple-950/80 border-purple-500 text-white shadow-lg ring-2 ring-purple-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block mb-1">Objetivo 2</span>
            <strong className="text-sm font-bold block text-white">Engravidar</strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Desejo gestacional ativo $\to$ Suspender contraceptivos; avaliar reserva e indicar FIV vs cirurgia.
            </p>
          </button>

          <button
            onClick={() => setTreatmentGoal('orgaos')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              treatmentGoal === 'orgaos'
                ? 'bg-amber-950/80 border-amber-500 text-white shadow-lg ring-2 ring-amber-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">Objetivo 3</span>
            <strong className="text-sm font-bold block text-white">Proteger Órgãos</strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Acometimento de ureteres com hidronefrose ou estenose crítica do retossigmoide $\to$ Cirurgia mandatória.
            </p>
          </button>

          <button
            onClick={() => setTreatmentGoal('reserva')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              treatmentGoal === 'reserva'
                ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg ring-2 ring-emerald-500/20'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">Objetivo 4</span>
            <strong className="text-sm font-bold block text-white">Preservar Função</strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Minimizar dano cirúrgico ovariano repetitivo e preservar folículos antes de operar.
            </p>
          </button>
        </div>

        {/* DETALHAMENTO DO OBJETIVO */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          {treatmentGoal === 'dor' && (
            <div className="space-y-2">
              <span className="font-bold text-rose-400 text-sm block">Conduta no Controle da Dor (Sem Desejo Gestacional Imediato):</span>
              <p className="text-slate-300 leading-relaxed">
                A terapia hormonal é a base de primeira linha. Induz amenorreia, atrofia do endométrio ectópico e interrupção dos ciclos inflamatórios e sangramentos microscópicos nos implantes. A cirurgia fica reservada para dor refratária ou intolerância às medicações.
              </p>
            </div>
          )}

          {treatmentGoal === 'gestar' && (
            <div className="space-y-2">
              <span className="font-bold text-purple-400 text-sm block">Conduta no Desejo Gestacional Imediato:</span>
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-purple-200">
                ⚡ <strong>REGRA DE OURO:</strong> <em>Tratamento hormonal NÃO aumenta a fertilidade espontânea pós-suspensão e atua como contraceptivo durante o uso.</em>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Portanto, <strong>não se prescreve progestagênio ou pílula combinada para mulher que quer engravidar agora</strong>. Avalia-se idade, tempo de infertilidade, permeabilidade tubária e reserva ovariana (AMH). Se EFI alto e tubas pérvias $\to$ coito programado; se fator masculino associado, endometriose grave ou idade avançada $\to$ <strong>Fertilização in Vitro (FIV)</strong> direta.
              </p>
            </div>
          )}

          {treatmentGoal === 'orgaos' && (
            <div className="space-y-2">
              <span className="font-bold text-amber-400 text-sm block">Conduta na Proteção de Órgãos Vitais:</span>
              <p className="text-slate-300 leading-relaxed">
                Endometriose ureteral pode causar hidronefrose e perda silenciosa da função renal sem dor exuberante. Estenoses intestinais &gt; 50% com risco de suboclusão exigem abordagem cirúrgica especializada (laparoscópica ou robótica) com urologista e coloproctologista, independentemente do controle da dor.
              </p>
            </div>
          )}

          {treatmentGoal === 'reserva' && (
            <div className="space-y-2">
              <span className="font-bold text-emerald-400 text-sm block">Conduta na Preservação da Reserva Ovariana:</span>
              <p className="text-slate-300 leading-relaxed">
                Evitar reoperações ovarianas sucessivas por recidiva de endometrioma. Se houver indicação de cistectomia em mulher jovem nuligesta, realizar estimulação ovariana controlada e criopreservação de oócitos previamente à cirurgia.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* TRATAMENTO MEDICAMENTOSO: 1ª LINHA VS 2ª LINHA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Pill size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Arsenal Farmacológico: 1ª Linha e 2ª Linha de Tratamento Clínico
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
            Bloqueio Hormonal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* 1ª LINHA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-emerald-400 text-sm">Opções de Primeira Linha (Alta Eficácia & Tolerabilidade)</span>
              <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">1ª Linha</span>
            </div>

            <div className="space-y-2.5 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <strong className="text-white block">• Progestagênios Isolados (Dienogeste 2 mg/dia contínuo):</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Padrão-ouro farmacológico específico. Potente ação anti-inflamatória, antiangiogênica e antiproliferativa no endométrio ectópico, induzindo decidualização e atrofia dos focos. Outras opções: Desogestrel 75 mcg ou Acetato de Medroxiprogesterona depot trimestral.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <strong className="text-white block">• SIU de Levonorgestrel 52 mg (Mirena):</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Excelente controle da dismenorreia e de sintomas de adenomiose associada, com mínima absorção sistêmica e duração de até 8 anos.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <strong className="text-white block">• Contraceptivos Hormonais Combinados (CHC):</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Uso em regime contínuo ou estendido para suprimir a menstruação e a flutuação estrogênica folicular.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <strong className="text-white block">• Anti-inflamatórios Não Esteroidais (AINEs):</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Uso pontual para alívio de dor aguda/dismenorreia (inibição de COX-2). Não evitam a progressão da doença.
                </p>
              </div>
            </div>
          </div>

          {/* 2ª LINHA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-purple-400 text-sm">Opções de Segunda Linha (Modulação do GnRH)</span>
              <span className="text-[10px] text-purple-300 bg-purple-950 px-2 py-0.5 rounded">2ª Linha</span>
            </div>

            <div className="space-y-2.5 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <strong className="text-white block">• Análogos Agonistas do GnRH (Gosserrelina 3,6 mg / Leuprorrelina depot):</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Induzem hipoestrogenismo profundo ("menopausa medicamentosa"). <em>Atenção ao efeito flare inicial (piora transitória de 7 a 10 dias).</em>
                </p>
                <div className="p-2 rounded-lg bg-slate-950 border border-amber-800/60 text-[10px] text-amber-300">
                  ⚠️ <strong>Add-Back Therapy Mandatória:</strong> Associar doses baixas de estrogênio + progestagênio (ex: 17b-estradiol 1mg + noretisterona 0,5mg) se uso &gt; 3 a 6 meses para prevenir perda de massa óssea e fogachos.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <strong className="text-white block">• Antagonistas Orais do GnRH (Relugolix / Elagolix):</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Bloqueio competitivo direto dos receptores hipofisários sem efeito <em>flare</em> inicial. Apresentação em comprimidos orais com rápida reversibilidade pós-interrupção.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INDICAÇÕES CIRÚRGICAS: OPERAR APENAS COM OBJETIVO DEFINIDO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400">
            <Scissors size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Cirurgia: Operar Apenas com Objetivo Clínico Bem Definido
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-800">
            Laparoscopia / Robótica
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider block bg-rose-950 px-2 py-0.5 rounded w-fit">
              1. Dor Refratária
            </span>
            <strong className="text-white block font-bold">Falha Clínica</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Dor persistente e incapacitante a despeito de bloqueio hormonal adequado de 1ª e 2ª linha ou efeitos adversos intoleráveis.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block bg-amber-950 px-2 py-0.5 rounded w-fit">
              2. Risco de Órgãos
            </span>
            <strong className="text-white block font-bold">Obstrução Ureteral / Intestinal</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Hidronefrose por estenose ureteral extrínseca ou estenose intestinal sintomática &gt; 50% com risco de oclusão.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider block bg-cyan-950 px-2 py-0.5 rounded w-fit">
              3. Endometrioma Grande
            </span>
            <strong className="text-white block font-bold">Massa Anexial Suspeita</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Endometriomas &ge; 4 cm sintomáticos, com crescimento rápido ou achados atípicos que geram dúvida de malignidade.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider block bg-purple-950 px-2 py-0.5 rounded w-fit">
              4. Reprodução
            </span>
            <strong className="text-white block font-bold">Infertilidade Selecionada</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Mulheres jovens com dor associada e distorção anatômica pélvica, visando restaurar a anatomia e calcular o escore EFI.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block bg-emerald-950 px-2 py-0.5 rounded w-fit">
              5. Intolerância
            </span>
            <strong className="text-white block font-bold">Contraindicação Hormonal</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Pacientes com contraindicações formais aos hormônios (trombose prévia grave, câncer estrogênio-dependente, etc.).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
          <strong className="text-white block">Requisitos da Cirurgia Moderna de Endometriose:</strong>
          <span>Planejamento multidisciplinar pré-operatório rigoroso (Ginecologia, Coloproctologia, Urologia), via minimamente invasiva (videolaparoscopia ou cirurgia robótica), ressecção completa em tempo único e consentimento informado detalhado.</span>
        </div>
      </div>
    </div>
  );
}
