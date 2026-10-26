import React from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Activity,
  Zap,
  ChevronRight,
  Info,
  ShieldAlert,
  Flame,
  Brain,
  Droplets,
  HeartCrack,
  Sparkles,
  AlertCircle
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function CKDClinical() {
  return (
    <div className="flex flex-col gap-10 pb-20 max-w-5xl mx-auto">
      {/* Header com síntese conceitual */}
      <header className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-900/20 via-brand-blue/10 to-transparent border border-line">
        <div className="flex items-center gap-2 text-brand-blue mb-2">
          <span className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
            <Stethoscope size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Semiótica Renal & Síndrome Urêmica</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
          Quadro Clínico e Manifestações da DRC
        </h1>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          A clínica da DRC é marcada pela dicotomia entre a <strong>fase assintomática prolongada</strong> (G1 a G3a) e a <strong>Síndrome Urêmica multissistêmica</strong> (G4 e G5), quando o acúmulo de toxinas nitrogenadas e a perda das funções endócrinas afetam praticamente todos os órgãos do corpo.
        </p>
      </header>

      {/* 1. APRESENTAÇÃO POR ESTÁGIO: A GRANDE TRANSIÇÃO */}
      <section id="clinical-presentation" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 border border-emerald-500/30 bg-emerald-500/5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 size={20} />
                <h3 className="font-bold text-base">Fase Inicial / Silenciosa (Estágios G1 - G3a)</h3>
              </div>
              <p className="text-xs text-ink leading-relaxed mb-3">
                Virtualmente <strong>assintomática</strong> na imensa maioria dos casos. Os néfrons remanescentes hiperfiltram para manter a homeostase corpórea.
              </p>
              <ul className="space-y-2 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Sinais sutis: hipertensão de início recente ou piora do controle pressórico.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Nictúria precoce (perda da capacidade de concentração medular da urina).</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Urina espumosa se houver albuminúria importante (RAC &gt; 300 mg/g).</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium">
              *Se esperar sintomas para diagnosticar, o paciente chegará com DRC irreversível.
            </div>
          </div>

          <div className="card p-6 border border-rose-500/30 bg-rose-500/5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-2">
                <AlertTriangle size={20} />
                <h3 className="font-bold text-base">Fase Avançada: Síndrome Urêmica (G3b - G5)</h3>
              </div>
              <p className="text-xs text-ink leading-relaxed mb-3">
                Surge quando a eTFG cai para &lt; 30-40 mL/min e se agrava intensamente com eTFG &lt; 15 mL/min.
              </p>
              <ul className="space-y-2 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Retenção de toxinas urêmicas (ureia, p-cresil sulfato, indoxil sulfato, guanidinas).</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Falência endócrina: deficiência de eritropoetina e calcitriol ativo (1,25-OH-D3).</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>Sobrecarga hidroeletrolítica grave e acidose metabólica crônica.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-rose-500/10 text-rose-800 dark:text-rose-300 text-[11px] font-bold">
              *Presença de sinais urêmicos francos (pericardite, encefalopatia) indica início de diálise de urgência!
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTAÇÕES POR SISTEMA ORGÂNICO */}
      <section id="systems" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
            <Activity size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Manifestações Clínicas por Aparelho</h2>
            <p className="text-xs text-ink-muted">Sintomas comuns e "Red Flags" de emergência clínica</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              system: "Gastrointestinal",
              icon: Flame,
              color: "text-amber-500",
              frequent: "Anorexia (frequentemente para carnes vermelhas), náuseas e vômitos matinais, disgeusia (gosto metálico na boca), hálito urêmico (odor amoniacal).",
              urgent: "Soluços intratáveis, gastrite/duodenite erosiva com hemorragia digestiva alta, pancreatite urêmica."
            },
            {
              system: "Neurológico",
              icon: Brain,
              color: "text-purple-500",
              frequent: "Fadiga crônica, lentidão cognitiva, insônia, sonolência diurna, pernas inquietas (síndrome das pernas inquietas frequente em dialíticos).",
              urgent: "Encefalopatia Urêmica (sonolência → estupor → coma), asterixis (flapping), mioclonias multifocais e convulsões urêmicas."
            },
            {
              system: "Cardiovascular",
              icon: HeartCrack,
              color: "text-rose-500",
              frequent: "Hipertensão resistente, edema de membros inferiores, dispneia de esforço, sobrecarga volêmica.",
              urgent: "Pericardite Urêmica (dor pleurítica com atrito pericárdico à ausculta; indicação clássica de diálise urgente sem heparina!)."
            },
            {
              system: "Hematológico",
              icon: Droplets,
              color: "text-red-500",
              frequent: "Anemia da DRC: normocítica e normocrômica (queda de produção de EPO renal), palidez mucocutânea e astenia profunda.",
              urgent: "Disfunção plaquetária urêmica (toxinas inibem agregação plaquetária) gerando sangramento espontâneo, equimoses e epistaxe."
            },
            {
              system: "Dermatológico",
              icon: Sparkles,
              color: "text-emerald-500",
              frequent: "Xerodermia intensa (pele seca e descamativa), prurido urêmico intratável, hiperpigmentação terrosa (acúmulo de urocromos).",
              urgent: "Frost urêmico (deposição de cristais esbranquiçados de ureia na pele pelo suor evaporado) e Calcifilaxia (arteriolopatia urêmica calcificante)."
            },
            {
              system: "Osteomineral (DMO-DRC)",
              icon: Activity,
              color: "text-blue-500",
              frequent: "Dores ósseas difusas, fraqueza muscular proximal, fraturas de baixo impacto por hiperparatireoidismo secundário.",
              urgent: "Ruptura tendínea espontânea, calcificações vasculares periféricas extensas e calcifilaxia necrosante."
            }
          ].map((item, idx) => (
            <div key={idx} className="card p-5 border border-line bg-card rounded-2xl hover:border-brand-blue/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex items-center gap-2.5 md:w-52 shrink-0">
                  <div className={cn("p-2 rounded-xl bg-slate-100 dark:bg-slate-800", item.color)}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm">{item.system}</h3>
                    <span className="text-[10px] text-ink-muted uppercase tracking-wider">Aparelho</span>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-bg border border-line">
                    <span className="text-[10px] font-bold text-brand-blue uppercase block mb-1">Manifestações Comuns</span>
                    <p className="text-ink leading-relaxed">{item.frequent}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20">
                    <span className="text-[10px] font-bold text-rose-600 uppercase block mb-1">Red Flags / Emergência</span>
                    <p className="text-ink leading-relaxed">{item.urgent}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DISTÚRBIOS ELETROLÍTICOS E ÁCIDO-BÁSICOS */}
      <section id="electrolytes" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Zap size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Distúrbios Hidroeletrolíticos e Ácido-Básicos</h2>
            <p className="text-xs text-ink-muted">Alterações laboratoriais que precipitam emergências médicas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5 border border-amber-500/25 bg-card rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-brand-navy text-sm">Hipercalemia (K⁺ &gt; 5,5 mEq/L)</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600">Risco Fatal</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Queda na excreção tubular distal. Risco de onda T apiculada, alargamento de QRS, assistolia e FV.
            </p>
            <div className="text-[11px] text-ink font-semibold pt-1 border-t border-line">
              Diuréticos de alça, quelantes intestinais (Patiromer, ZS-9) ou diálise de urgência.
            </div>
          </div>

          <div className="card p-5 border border-line bg-card rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-brand-navy text-sm">Acidose Metabólica</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-600">Anion Gap Elevado</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Retenção de sulfatos, fosfatos e perda da amoniogênese tubular. Acelera degradação proteica muscular e perda de massa óssea.
            </p>
            <div className="text-[11px] text-ink font-semibold pt-1 border-t border-line">
              Repor Bicarbonato de Sódio oral se HCO3 &lt; 22 mEq/L para retardar progressão da DRC.
            </div>
          </div>

          <div className="card p-5 border border-line bg-card rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-brand-navy text-sm">Hiperfosfatemia & Hipocalcemia</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-600">Gatilho do PTH</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Retenção de fósforo e menor síntese de 1,25-(OH)2-Vitamina D pelo túbulo proximal induzem hiperparatireoidismo secundário e osteíte fibrosa.
            </p>
            <div className="text-[11px] text-ink font-semibold pt-1 border-t border-line">
              Dieta hipofosfatêmica, quelantes (Sevelamer) e calcitriol guiados pelos níveis de PTH.
            </div>
          </div>
        </div>

        {/* Quadro Sinótico de Emergência */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-brand-navy border border-rose-500/40 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert size={20} />
              <h3 className="font-black text-sm uppercase tracking-wider">
                Indicações Clássicas de Diálise de Urgência (Mnemônico "AEIOU")
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              <strong>A:</strong> Acidose metabólica refratária (pH &lt; 7,15) • <strong>E:</strong> Eletrólitos (Hipercalemia grave com ECG alterado) • <strong>I:</strong> Intoxicação exógena dialisável • <strong>O:</strong> Overload (Edema agudo de pulmão refratário a furosemida) • <strong>U:</strong> Uremia sintomática (Pericardite, Encefalopatia, Hemorragia digestiva).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
