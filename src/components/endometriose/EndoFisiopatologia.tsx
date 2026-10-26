import React from 'react';
import { 
  Dna, Activity, Zap, Flame, ShieldAlert, 
  ArrowRight, Sparkles, AlertTriangle, ShieldCheck, Microscope
} from 'lucide-react';

export default function EndoFisiopatologia() {
  return (
    <div className="space-y-8">
      {/* HEADER DO EIXO 2 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-950 text-purple-400 border border-purple-800">
            <Dna size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">
              Eixo 2 · Fisiopatologia Molecular & Imunologia
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              2. Fisiopatologia: Nenhuma Teoria Explica Todos os Casos
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A patogênese da endometriose é <strong>multifatorial e poligênica</strong>. Envolve a interação entre implantação de tecido endometrial ectópico, predisposição genética e epigenética, escape da depuração imunológica peritoneal, produção estrogênica local autônoma e uma cascata autoperpetuada de inflamação e neuroangiogênese.
        </p>
      </div>

      {/* AS 4 TEORIAS HISTÓRICAS & INTEGRAÇÃO MODERNA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Microscope size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              As Quatro Teorias Fisiopatológicas Clássicas
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
            Origem dos Focos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* SAMPSON */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm">1. Menstruação Retrógrada (Sampson, 1927)</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">Mais aceita</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Durante a menstruação, fragmentos de tecido endometrial viáveis refluem pelas tubas uterinas para dentro da cavidade peritoneal, aderindo e invadindo o mesotélio.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
              ⚡ <em>Paradoxo:</em> O refluxo tubário ocorre em até <strong>90% das mulheres</strong> férteis, mas apenas <strong>10% desenvolvem a doença</strong>, comprovando que o refluxo é necessário, mas não suficiente (exige escape imunológico e adesividade anormal).
            </div>
          </div>

          {/* MEYER */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400 text-sm">2. Metaplasia Celômica (Meyer)</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">Diferenciação</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Células do epitélio celômico peritoneal e ovariano (que possuem a mesma origem embriológica do epitélio mülleriano) sofrem transformação/metaplasia em epitélio endometrial sob estímulos hormonais e inflamatórios locais.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              💡 <em>Explica casos raros em mulheres com agenesia mülleriana (Rokitansky) ou em homens sob altas doses de estrogênio para câncer de próstata.</em>
            </div>
          </div>

          {/* HALBAN */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">3. Disseminação Linfática e Vascular (Halban)</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">Embolização</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Microêmbolos de células endometriais adentram os canais linfáticos e vasculares pélvicos, transportando-se para sítios distantes através da circulação sistêmica.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              🫁 <em>Explica a presença de endometriose em sítios extrapélvicos remotos, como pleura pulmonar, diafragma, cérebro e linfonodos pélvicos.</em>
            </div>
          </div>

          {/* SUSCEPTIBILIDADE / EPIGENÉTICA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">4. Genética, Imunidade e Epigenética</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">Molecular</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Falha na imunovigilância mediada por células Natural Killer (NK) e macrófagos peritoneais, permitindo a sobrevivência celular. Modificações epigenéticas (metilação aberrante do DNA e histonas) desregulam receptores hormonais e vias apoptóticas.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-purple-300">
              🧬 <em>Risco familiar 6 a 7 vezes maior em parentes de 1º grau (herança poligênica).</em>
            </div>
          </div>
        </div>
      </div>

      {/* EPIGENÉTICA E AS ALTERAÇÕES MOLECULARES CENTRAIS */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Dna size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Mecanismos Moleculares: Epigenética, Resistência à Progesterona & Hiperestrogenismo Local
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-800">
            Alvos Farmacológicos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          {/* AROMATASE & COX-2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Flame size={16} />
              <span>1. Autossuficiência de Estrogênio</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              O endométrio ectópico expressa anormalmente a enzima <strong>Aromatase</strong> e a <strong>COX-2</strong>. A COX-2 eleva os níveis de prostaglandina E2 (PGE2), que por sua vez estimula a Aromatase a converter androgênios em estradiol localmente.
            </p>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-rose-300 font-mono">
              Feedback Positivo: PGE2 ⇄ Aromatase ⇄ Estradiol local
            </div>
          </div>

          {/* RESISTÊNCIA À PROGESTERONA */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <ShieldAlert size={16} />
              <span>2. Resistência à Progesterona</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Hipermetilação do promotor do receptor de progesterona B (PR-B) leva ao seu silenciamento, predominando isoformas PR-A truncadas. O implante perde a capacidade de metabolizar o estradiol (via 17β-HSD tipo 2) para estrona menos potente.
            </p>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
              Explica por que alguns implantes respondem menos a doses usuais de progestagênios.
            </div>
          </div>

          {/* NEUROANGIOGÊNESE */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-900/40 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Zap size={16} />
              <span>3. Neuroangiogênese & Dor</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              O estroma produz fatores angiogênicos (<strong>VEGF</strong>) e neurotróficos (<strong>NGF - Nerve Growth Factor</strong>). Ocorre brotamento vascular e invasão de fibras nervosas não mielinizadas sensitivas (fibras C) no interior das lesões, gerando sensibilização periférica e central.
            </p>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-purple-300">
              Origem da dor neuropática e dor crônica não cíclica.
            </div>
          </div>
        </div>
      </div>

      {/* CASCATA DA DISTORÇÃO ANATÔMICA — DO IMPLANTE À ADERÊNCIA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
          <Activity size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Cascata Progressiva: Inflamação Persistente Distorcendo a Anatomia Pélvica
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-center">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono font-bold text-xs inline-flex items-center justify-center">1</span>
            <strong className="text-white block">Implante Ectópico</strong>
            <p className="text-slate-400 text-[11px]">Adesão ao mesotélio peritoneal e sobrevivência celular.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-center">
            <span className="w-6 h-6 rounded-full bg-rose-950 text-rose-400 font-mono font-bold text-xs inline-flex items-center justify-center">2</span>
            <strong className="text-rose-400 block">Inflamação</strong>
            <p className="text-slate-400 text-[11px]">Recrutamento maciço de macrófagos e liberação de citocinas (IL-1, IL-6, TNF-$\alpha$).</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-center">
            <span className="w-6 h-6 rounded-full bg-amber-950 text-amber-400 font-mono font-bold text-xs inline-flex items-center justify-center">3</span>
            <strong className="text-amber-400 block">Citocinas & Angiogênese</strong>
            <p className="text-slate-400 text-[11px]">VEGF, IL-8 e estresse oxidativo por degradação hemática (ferro livre).</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-center">
            <span className="w-6 h-6 rounded-full bg-purple-950 text-purple-400 font-mono font-bold text-xs inline-flex items-center justify-center">4</span>
            <strong className="text-purple-400 block">Fibrose & Aderências</strong>
            <p className="text-slate-400 text-[11px]">Deposição de matriz extracelular densa mediada por TGF-$\beta$.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-center">
            <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 font-mono font-bold text-xs inline-flex items-center justify-center">5</span>
            <strong className="text-indigo-400 block">Distorção Pélvica</strong>
            <p className="text-slate-400 text-[11px]">Bloqueio da mobilidade tubária, ovariana e falha na captação oocitária.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800 text-xs text-indigo-200 leading-relaxed">
          <strong>Consequência Funcional:</strong> As aderências densas "congelam" a pelve (<em>frozen pelvis</em>), obliteram a fossa retouterina de Douglas e fixam o útero em retroversão, impedindo o movimento fimbrial fisiológico e gerando dor contínua à tração ligamentar durante a evacuação e relação sexual.
        </div>
      </div>
    </div>
  );
}
