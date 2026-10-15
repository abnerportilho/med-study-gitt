import React from 'react';
import { 
  Activity, Zap, ShieldAlert, HeartPulse, Sparkles, CheckCircle2,
  FileText, BookmarkCheck, ArrowRight, Brain, AlertTriangle
} from 'lucide-react';

export default function PreEclampsiaFisiopato() {
  return (
    <div className="space-y-6">
      
      {/* 1. MODELO EM DUAS FASES */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <Activity className="text-indigo-400" /> Fisiopatologia em 2 Fases: Pré-Clínica e Clínica
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            A SHEG resulta da invasão trofoblástica incompleta na decídua e miométrio (falha na remodelação das artérias espiraladas), culminando em isquemia placentária e lesão endotelial sistêmica.
          </p>
        </div>

        {/* AS DUAS FASES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* FASE PRÉ-CLÍNICA */}
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-indigo-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-indigo-900 pb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-950 text-indigo-300 border border-indigo-600">FASE 1</span>
              <strong className="text-sm font-black text-white uppercase">Pré-Clínica (Até 16–20 semanas)</strong>
            </div>
            
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>1. Falha na 2ª Onda de Invasão Trofoblástica:</strong> Os citotrofoblastos extravilosos invadem o segmento decidual, mas falham em invadir e desmuscularizar o segmento miometrial das artérias espiraladas.
              </p>
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>2. Vasos de Alta Resistência:</strong> As artérias espiraladas mantêm músculo liso e elastina, permanecendo estreitas, rígidas, tortuosas e reativas a vasoconstritores.
              </p>
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-amber-200">
                <strong>3. Hipóxia & Isquemia-Reperfusão:</strong> O fluxo pulsátil intermitente gera estresse oxidativo tecidual placentário e liberação massiva de debris e fatores antiangiogênicos na circulação materna.
              </p>
            </div>
          </div>

          {/* FASE CLÍNICA */}
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-red-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-red-900 pb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-950 text-red-300 border border-red-600">FASE 2</span>
              <strong className="text-sm font-black text-white uppercase">Clínica (Após a 20ª semana)</strong>
            </div>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>1. Lesão Endotelial Sistêmica Materna:</strong> Destruição difusa da camada de células endoteliais em rins, fígado, cérebro, pulmões e vasculatura periférica.
              </p>
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>2. Desbalanço Vasoativo:</strong> Queda drástica de vasodilatadores (Óxido Nítrico, Prostaciclina PGI2) e aumento de vasoconstritores (Tromboxano A2, Endotelina-1) ➔ Hipertensão Arterial.
              </p>
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>3. Hiperpermeabilidade & Microangiopatia:</strong> Extravasamento capilar (Edema cerebral, Edema Pulmonar, Glomeruloendoteliose com Proteinúria) + ativação e consumo plaquetário com depósito de fibrina.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. AS 7 TEORIAS FISIOPATOLÓGICAS PRINCIPAIS (DOCUMENTO DE ESTUDO PBL) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
              <Sparkles className="text-indigo-400" /> As 7 Teorias Etiopatogênicas Integradas
            </h3>
            <p className="text-xs text-slate-400">Nenhuma teoria isolada explica 100% dos casos; interagem de forma sinérgica.</p>
          </div>
          <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700 rounded-full text-xs font-black">
            PBL Ginecologia & Obstetrícia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          {/* TEORIA 1 */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 bg-indigo-900 text-indigo-200 rounded font-black text-[10px] uppercase">1. Placentação Deficiente</span>
            <p className="text-slate-300 leading-relaxed">
              Invasão trofoblástica incompleta restrita ao segmento decidual, sem remodelar o segmento miometrial. Gera hipóxia intermitente e fluxo turbilhonar de alta resistência no leito interviloso.
            </p>
          </div>

          {/* TEORIA 2 */}
          <div className="p-4 bg-slate-950 rounded-2xl border-2 border-indigo-700 space-y-2 bg-indigo-950/20">
            <span className="px-2 py-0.5 bg-indigo-600 text-white rounded font-black text-[10px] uppercase">2. Desequilíbrio Angiogênico</span>
            <p className="text-slate-200 leading-relaxed">
              A placenta hipóxica secreta excesso de <strong>sFlt-1</strong> (que sequestra VEGF e PlGF) e <strong>Endoglina Solúvel (sEng)</strong> que antagoniza TGF-β.
            </p>
            <p className="text-[11px] text-indigo-300 font-bold">
              ★ Estudo PROGNOSIS (NEJM): Razão sFlt-1/PlGF ≤ 38 tem VPN de 99,3% para afastar PE em 1 semana! O parto remove a fonte do desequilíbrio.
            </p>
          </div>

          {/* TEORIA 3 */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 bg-indigo-900 text-indigo-200 rounded font-black text-[10px] uppercase">3. Predisposição Genética</span>
            <p className="text-slate-300 leading-relaxed">
              Agregação familiar poligênica com contribuição materna e fetal/paterna. Genes candidatos: sistema renina-angiotensina, VEGF e gene STOX1.
            </p>
          </div>

          {/* TEORIA 4 */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 bg-indigo-900 text-indigo-200 rounded font-black text-[10px] uppercase">4. Falha de Tolerância Imunológica</span>
            <p className="text-slate-300 leading-relaxed">
              Incompatibilidade entre receptores <strong>KIR</strong> de células NK uterinas maternas e <strong>HLA-C</strong> trofoblástico fetal (do pai). Explica por que <strong>primipaternidade</strong> é fator de risco mesmo em multíparas com novo parceiro.
            </p>
          </div>

          {/* TEORIA 5 */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 bg-indigo-900 text-indigo-200 rounded font-black text-[10px] uppercase">5. Exacerbação Inflamatória Sistêmica</span>
            <p className="text-slate-300 leading-relaxed">
              Debris sinciciotrofoblásticos (micropartículas, DNA fetal livre, citocinas TNF-α e IL-6) funcionam como DAMPs, ativando monócitos e neutrófilos maternos.
            </p>
          </div>

          {/* TEORIA 6 */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="px-2 py-0.5 bg-indigo-900 text-indigo-200 rounded font-black text-[10px] uppercase">6. Deficiência Nutricional (Cálcio)</span>
            <p className="text-slate-300 leading-relaxed">
              Baixa ingestão de cálcio estimula a secreção de PTH e ativação do SRAA intracelular vascular, aumentando a reatividade e o tônus contrátil arteriolar. Sustenta a profilaxia com Carbonato de Cálcio.
            </p>
          </div>

          {/* TEORIA 7 */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-purple-800 space-y-2 lg:col-span-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-purple-900 text-purple-200 rounded font-black text-[10px] uppercase">7. Autoanticorpos Agonistas do Receptor AT1 (AT1-AA)</span>
              <span className="text-[10px] text-purple-300 font-mono">Loop Imunológico-Angiogênico</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Autoanticorpos ligam-se ao receptor AT1 da angiotensina de forma constitutivamente ativada e sustentada, independente dos níveis de Angiotensina II, perpetuando vasoconstrição crônica e estimulando produção adicional de sFlt-1.
            </p>
          </div>

        </div>
      </div>

      {/* 3. PE PRECOCE VS. TARDIA & MECANISMOS DE ÓRGÃOS-ALVO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PRECOCE VS TARDIA */}
        <div className="bg-slate-900 border-2 border-indigo-900/60 p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-black text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <Activity size={18} /> PE Precoce (&lt; 34 sem) vs. PE Tardia (≥ 34 sem)
          </h3>
          
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-rose-400 block font-black uppercase">PE Precoce (&lt; 34 semanas) — Fenótipo Placentário Clássico:</strong>
              <p className="text-slate-300 leading-relaxed">
                Invasão trofoblástica deficiente severa, resistência uteroplacentária altíssima, sFlt-1 extremamente elevado. Fortemente associada a <strong>Restrição de Crescimento Fetal (RCF), oligoidrâmnio e Doppler alterado</strong>. Pior prognóstico materno-fetal.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-sky-400 block font-black uppercase">PE Tardia (≥ 34 semanas) — Fenótipo Materno/Metabólico:</strong>
              <p className="text-slate-300 leading-relaxed">
                Placentação praticamente normal ou com lesões mínimas. Motor etiológico predominantemente materno (obesidade, inflamação crônica, endoteliopatia prévia) descompensando sob a sobrecarga circulatória do termo. Feto geralmente com peso preservado.
              </p>
            </div>

            <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-700/60 text-amber-200">
              <p className="text-[11px] font-bold">
                ⚠️ É um espectro contínuo, não uma divisão binária absoluta. Casos a termo ou com 35 semanas podem se comportar com gravidade extrema (como o caso da Sandra).
              </p>
            </div>
          </div>
        </div>

        {/* FISIOPATOLOGIA DE ECLÂMPSIA (PRES) E SÍNDROME HELLP */}
        <div className="bg-slate-900 border-2 border-red-900/60 p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-black text-red-300 uppercase tracking-wider flex items-center gap-2">
            <Brain size={18} /> Eclâmpsia (PRES) & Síndrome HELLP
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-red-400 font-black uppercase">Eclâmpsia & PRES Cerebral:</strong>
                <span className="text-[10px] text-slate-400 font-bold">MAGPIE Trial</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Hipertensão somada à quebra da integridade da barreira hematoencefálica (BHE) sensibilizada por sFlt-1 ultrapassa a autorregulação cerebral, gerando <strong>hiperperfusão parieto-occipital, edema vasogênico (PRES) e convulsões</strong>.
              </p>
              <p className="text-[11px] text-amber-300 font-semibold">
                🚩 A correlação com a PA não é perfeita: até gestantes normotensas podem ter PRES/eclâmpsia porque o limiar pressórico é reduzido pela endoteliopatia.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-fuchsia-800 space-y-1.5 bg-fuchsia-950/20">
              <div className="flex items-center justify-between">
                <strong className="text-fuchsia-300 font-black uppercase">HELLP & Ativação do Complemento:</strong>
                <span className="text-[10px] text-fuchsia-200 font-bold">Microtrombose Hepática</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Lesão endotelial nos sinusoides hepáticos com depósito de fibrina ➔ necrose periportal (transaminases), hemólise microangiopática com esquizócitos (DHL) e consumo plaquetário periférico.
              </p>
              <p className="text-[11px] text-fuchsia-300">
                Evidências recentes mostram ativação anormal da <strong>via alternativa do complemento</strong> em um subgrupo de HELLP, aproximando-o mecanisticamente da Síndrome Hemolítico-Urêmica Atípica (SHUa).
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
