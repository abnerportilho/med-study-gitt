import React from 'react';
import { 
  Heart, Baby, AlertTriangle, ShieldAlert, 
  Activity, Zap, Dna, Sparkles, CheckCircle2, ShieldCheck
} from 'lucide-react';

export default function EndoFertilidadeReserva() {
  return (
    <div className="space-y-8">
      {/* HEADER DO EIXO 6 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Baby size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 6 · Fertilidade & Reserva Ovariana
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              6. Endometriose Reduz a Chance — Não Define Esterilidade
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A endometriose é uma das principais causas de <strong>subfertilidade</strong> feminina. No entanto, ter endometriose <em>não significa ser estéril</em>. A fecundidade mensal média cai de 15–20% para 2–10%, mas a <strong>idade da mulher e a reserva ovariana basal</strong> continuam sendo os principais determinantes do prognóstico reprodutivo.
        </p>
      </div>

      {/* NÚMEROS DA FECUNDIDADE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-lg">
          <span className="text-xs font-bold uppercase text-slate-400 block">Prevalência de Infertilidade</span>
          <span className="text-3xl font-black text-rose-400 font-mono">30% a 50%</span>
          <span className="text-xs text-slate-400 block">das mulheres com endometriose enfrentam dificuldade para conceber</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-lg">
          <span className="text-xs font-bold uppercase text-slate-400 block">Fecundidade Mensal na Doença</span>
          <span className="text-3xl font-black text-amber-400 font-mono">2% a 10%</span>
          <span className="text-xs text-slate-400 block">taxa mensal de concepção na endometriose não tratada</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-lg">
          <span className="text-xs font-bold uppercase text-slate-400 block">Fecundidade Normal Populacional</span>
          <span className="text-3xl font-black text-emerald-400 font-mono">15% a 20%</span>
          <span className="text-xs text-slate-400 block">taxa de gravidez por ciclo em casais sem fatores de infertilidade</span>
        </div>
      </div>

      {/* OS 4 MECANISMOS PRINCIPAIS DE INFERTILIDADE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400">
            <Activity size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Os Quatro Mecanismos Principais que Prejudicam a Concepção
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-800">
            Fisiopatologia Reprodutiva
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. ANATOMIA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                1. ANATOMIA
              </span>
              <h5 className="text-sm font-bold text-white">Aderências & Distorção Tubo-Ovariana</h5>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Brigas fibróticas bloqueiam a motilidade fimbrial, englobam o ovário e causam aprisionamento/oclusão tubária mecânica, impedindo a captação do oócito.
              </p>
            </div>
            <div className="text-[10px] text-rose-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
              Barreira mecânica de transporte
            </div>
          </div>

          {/* 2. PERITÔNIO */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                2. PERITÔNIO
              </span>
              <h5 className="text-sm font-bold text-white">Inflamação & Estresse Oxidativo</h5>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                O líquido peritoneal de pacientes com endometriose é rico em citocinas tóxicas (IL-1, TNF-$\alpha$), radicais livres de oxigênio e ferro livre, prejudicando a motilidade espermática e a fertilização.
              </p>
            </div>
            <div className="text-[10px] text-amber-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
              Microambiente peritoneal hostil
            </div>
          </div>

          {/* 3. OVULAÇÃO */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                3. OVULAÇÃO
              </span>
              <h5 className="text-sm font-bold text-white">Foliculogênese & Qualidade Oocitária</h5>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                A inflamação cortical ovariana reduz a qualidade citoplasmática e cromossômica dos óvulos, alterando a esteroidogênese folicular e cursando com disfunção da fase lútea.
              </p>
            </div>
            <div className="text-[10px] text-cyan-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
              Menor taxa de embriões euploides
            </div>
          </div>

          {/* 4. IMPLANTAÇÃO */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                4. IMPLANTAÇÃO
              </span>
              <h5 className="text-sm font-bold text-white">Receptividade Endometrial Alterada</h5>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Devido à resistência à progesterona, o endométrio eutópico falha na decidualização e fecha prematuramente a "janela de implantação", reduzindo a expressão de integrinas (αvβ3) e HOXA10.
              </p>
            </div>
            <div className="text-[10px] text-purple-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
              Falha na fixação do blastocisto
            </div>
          </div>
        </div>
      </div>

      {/* ENDOMETRIOMA E RESERVA OVARIANA: OS DOIS LADOS DO RISCO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Endometrioma e Reserva Ovariana: Dois Lados do Risco
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
            Dilema Clínico
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* LADO 1: A PRÓPRIA DOENÇA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm">Lado A: O Dano da Própria Doença</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Inflamação</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Estresse oxidativo e ferro livre:</strong> O sangramento cíclico degradado dentro do pseudocisto libera hemoglobina e íons de ferro livre, tóxicos aos folículos primordiais.</li>
              <li>• <strong>Fibrose cortical progressiva:</strong> Ocorre estiramento mecânico do parênquima ovariano e esclerose do tecido cortical saudável.</li>
              <li>• <strong>Menor densidade folicular:</strong> Pacientes com endometrioma apresentam contagem de folículos antrais (CFA) e AMH naturalmente reduzidos em relação a controles saudáveis.</li>
            </ul>
          </div>

          {/* LADO 2: A CIRURGIA INTEMPESTIVA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Lado B: O Dano da Cirurgia (Cistectomia)</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Iatrogenia</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Remoção involuntária de parênquima são:</strong> A cápsula do endometrioma é um pseudocisto (endométrio aderido ao córtex invaginado); a tração para cistectomia inevitavelmente arranca folículos primordiais sadios.</li>
              <li>• <strong>Dano térmico por eletrocirurgia:</strong> O uso excessivo de eletrocautério bipolar na hemostasia queima o leito hiliano e destrói o suprimento vascular do ovário.</li>
              <li>• <strong>Queda abrupta do AMH pós-operatório:</strong> A cistectomia de endometriomas bilaterais pode reduzir o AMH em mais de 50%, com risco de falência ovariana prematura precoce.</li>
            </ul>
          </div>
        </div>

        {/* ESTRATÉGIA DE PRESERVAÇÃO DE FERTILIDADE */}
        <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/80 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck size={18} />
            <span className="text-xs font-black uppercase tracking-wider">
              Conduta Recomendada: Avaliar Reserva (AMH) e Discutir Criopreservação de Óvulos
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Antes de qualquer cirurgia ovariana em mulheres com desejo reprodutivo futuro (especialmente endometriomas volumosos ou bilaterais), é <strong>mandatório dosar o Hormônio Anti-Mülleriano (AMH)</strong> e a Contagem de Folículos Antrais (CFA). Em pacientes jovens com reserva limítrofe, deve-se sempre oferecer e considerar a <strong>criopreservação prévia de oócitos (congelamento de óvulos)</strong> antes de intervir no ovário.
          </p>
        </div>
      </div>
    </div>
  );
}
