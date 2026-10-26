import React, { useState } from 'react';
import { 
  TestTube, AlertTriangle, Calculator, ShieldAlert, HeartPulse,
  Droplet, Eye, Brain, Stethoscope, CheckCircle2, BookmarkCheck,
  HelpCircle, Layers, FileText, ChevronRight
} from 'lucide-react';

export default function PreEclampsiaClinicaDiag() {
  // Calculadora de Manguito
  const [armCircumference, setArmCircumference] = useState<number>(30);
  const [systolicInput, setSystolicInput] = useState<number>(140);
  const [diastolicInput, setDiastolicInput] = useState<number>(90);

  const getCorrectionValues = (circ: number) => {
    if (circ <= 20) return { sys: 11, dia: 7, cuff: 'Infantil / Pequeno (10-19 cm)' };
    if (circ <= 22) return { sys: 9, dia: 6, cuff: 'Infantil / Pequeno (18-26 cm)' };
    if (circ <= 24) return { sys: 7, dia: 4, cuff: 'Adulto Pequeno (18-26 cm)' };
    if (circ <= 26) return { sys: 5, dia: 3, cuff: 'Adulto Médio Padrão (25-35 cm)' };
    if (circ <= 28) return { sys: 3, dia: 2, cuff: 'Adulto Médio Padrão (25-35 cm)' };
    if (circ <= 30) return { sys: 0, dia: 0, cuff: 'Adulto Médio Padrão (25-35 cm)' };
    if (circ <= 32) return { sys: -2, dia: -1, cuff: 'Adulto Médio Padrão (25-35 cm)' };
    if (circ <= 34) return { sys: -4, dia: -3, cuff: 'Adulto Grande / Coxa (33-47 cm)' };
    if (circ <= 36) return { sys: -6, dia: -4, cuff: 'Adulto Grande (33-47 cm)' };
    if (circ <= 38) return { sys: -8, dia: -6, cuff: 'Adulto Grande (33-47 cm)' };
    if (circ <= 40) return { sys: -10, dia: -7, cuff: 'Adulto Grande (33-47 cm)' };
    if (circ <= 42) return { sys: -12, dia: -9, cuff: 'Manguito de Coxa (46-66 cm)' };
    if (circ <= 44) return { sys: -14, dia: -10, cuff: 'Manguito de Coxa (46-66 cm)' };
    if (circ <= 46) return { sys: -16, dia: -11, cuff: 'Manguito de Coxa (46-66 cm)' };
    if (circ <= 48) return { sys: -18, dia: -13, cuff: 'Manguito de Coxa (46-66 cm)' };
    return { sys: -21, dia: -14, cuff: 'Manguito de Coxa Extralargo (46-66 cm)' };
  };

  const correction = getCorrectionValues(armCircumference);
  const correctedSys = Math.max(40, systolicInput + correction.sys);
  const correctedDia = Math.max(20, diastolicInput + correction.dia);

  return (
    <div className="space-y-6">

      {/* 1. CRITÉRIOS DIAGNÓSTICOS DE PRÉ-ECLÂMPSIA (QUADRO ATUALIZADO) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
              <TestTube className="text-rose-400" /> Critérios Diagnósticos Formais de Pré-Eclâmpsia
            </h3>
            <p className="text-xs text-slate-400">
              Diagnóstico = PAS ≥ 140 ou PAD ≥ 90 mmHg (2 medidas com intervalo ≥ 4h após 20 sem) + Proteinúria OU Lesão de Órgão-Alvo.
            </p>
          </div>
          <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-700 rounded-full text-xs font-black self-start">
            Toda PE Interna
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* DIAGNÓSTICO CLÁSSICO COM PROTEINÚRIA */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-black text-blue-400 uppercase tracking-wider block">1. Diagnóstico Clássico (Com Proteinúria)</span>
            <div className="space-y-2 text-xs">
              <p className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
                <strong>Hipertensão:</strong> PAS ≥ 140 ou PAD ≥ 90 mmHg. Se crise (PAS ≥ 160 ou PAD ≥ 110), pode ser confirmada em minutos, sem esperar 4h.
              </p>
              <p className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
                <strong>+ Proteinúria Significativa (Basta 1 método):</strong>
                <br/>• Relação Proteinúria/Creatinúria (P/C spot) ≥ 0,3 (mg/mg)
                <br/>• Proteinúria de 24 horas ≥ 300 mg/24h (Padrão-ouro)
                <br/>• Fita reagente (dipstick) ≥ 2+ (se outros métodos indisponíveis)
              </p>
              <div className="p-2.5 bg-amber-950/40 rounded-xl border border-amber-800/60 text-[11px] text-amber-200">
                ★ <strong>Proteinúria é critério DIAGNÓSTICO, não prognóstico!</strong> Uma vez fechado o diagnóstico de PE, <strong>NÃO</strong> se repete a proteinúria para seguimento. A vigilância é clínica e laboratorial (plaquetas, enzimas hepáticas, creatinina, sintomas).
              </div>
            </div>
          </div>

          {/* DIAGNÓSTICO SEM PROTEINÚRIA (DISFUNÇÃO DE ÓRGÃOS-ALVO) */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-black text-rose-400 uppercase tracking-wider block">2. Diagnóstico Sem Proteinúria (Disfunção de Órgãos-Alvo)</span>
            <div className="space-y-1.5 text-xs">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Hematológico:</span>
                <span className="text-white font-mono text-[11px]">Plaquetas ≤ 150.000 / mm³, CIVD, Hemólise</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Hepático:</span>
                <span className="text-white font-mono text-[11px]">TGO ou TGP ≥ 40 UI/L (ou epigastralgia/dor em HCD)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Renal:</span>
                <span className="text-white font-mono text-[11px]">Creatinina Sérica ≥ 1,0 mg/dL</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Neurológico:</span>
                <span className="text-white font-mono text-[11px]">Cefaleia refratária, escotomas, clônus, hiperreflexia</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Pulmonar:</span>
                <span className="text-white font-mono text-[11px]">Edema Agudo de Pulmão (dispneia, estertores)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Fetoplacentário:</span>
                <span className="text-white font-mono text-[11px]">RCF, alteração de Doppler de artéria umbilical, DPP</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. TABELA COMPLETA POR ÓRGÃO-ALVO & PROGRESSÃO */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
            <Layers className="text-indigo-400" /> Quadro Clínico por Órgão-Alvo & Gravidade Extrema
          </h3>
          <span className="text-xs text-slate-400">PBL USP / Residência Médica</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                <th className="p-2.5">Órgão-Alvo</th>
                <th className="p-2.5">Mecanismo Fisiopatológico</th>
                <th className="p-2.5">Sinal / Sintoma Clínico</th>
                <th className="p-2.5">Achado Complementar / Propedêutica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Cardiovascular</td>
                <td className="p-2.5">Vasoespasmo arteriolar sistêmico</td>
                <td className="p-2.5">HAS, ganho ponderal rápido, edema facial/mãos de início rápido</td>
                <td className="p-2.5 font-mono">PA seriada &gt; 140/90</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-red-950/20">
                <td className="p-2.5 font-bold text-red-400">Cardiovascular (Extremo)</td>
                <td className="p-2.5">Disfunção diastólica + hiperpermeabilidade capilar alveolar</td>
                <td className="p-2.5 font-bold text-red-300">Dispneia súbita, ortopneia, estertoração crepitante difusa</td>
                <td className="p-2.5 font-mono text-red-200">Edema Agudo de Pulmão (RX tórax / USG pulmão)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Renal</td>
                <td className="p-2.5">Endoteliose capilar glomerular e edema podocitário</td>
                <td className="p-2.5">Assintomático na maioria; oligúria em fases avançadas</td>
                <td className="p-2.5 font-mono">Proteinúria, Creatinina ≥ 1,0 mg/dL, Ácido Úrico elevado</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Hepático</td>
                <td className="p-2.5">Edema periportal e microtrombose sinusoidal</td>
                <td className="p-2.5">Epigastralgia, dor no hipocôndrio direito (HCD), náuseas/vômitos</td>
                <td className="p-2.5 font-mono">TGO/TGP ≥ 40 UI/L (PE) ou ≥ 70 UI/L (HELLP)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-red-950/20">
                <td className="p-2.5 font-bold text-red-400">Hepático (Extremo)</td>
                <td className="p-2.5">Necrose periportal confluente e infarto parenquimatoso</td>
                <td className="p-2.5 font-bold text-red-300">Dor abdominal súbita lancinante, choque hipovolêmico</td>
                <td className="p-2.5 font-mono text-red-200">Hematoma subcapsular hepático / Ruptura hepática</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Hematológico</td>
                <td className="p-2.5">Ativação endotelial, hemólise microangiopática mecânica</td>
                <td className="p-2.5">Geralmente assintomático; subicterícia</td>
                <td className="p-2.5 font-mono">Plaquetas ≤ 150k (PE) / ≤ 100k (HELLP), DHL ≥ 600, esquizócitos</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-red-950/20">
                <td className="p-2.5 font-bold text-red-400">Hematológico (Extremo)</td>
                <td className="p-2.5">Consumo maciço e descontrolado de fatores de coagulação</td>
                <td className="p-2.5 font-bold text-red-300">Sangramento em sítios de punção, hematúria, sangramento puerperal</td>
                <td className="p-2.5 font-mono text-red-200">CIVD (Fibrinogênio &lt; 200 mg/dL, TP/TTPa alargados)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Neurológico</td>
                <td className="p-2.5">Vasoespasmo e edema vasogênico parieto-occipital (PRES)</td>
                <td className="p-2.5">Cefaleia refratária em capacete, escotomas cintilantes, hiperreflexia patelar, clônus</td>
                <td className="p-2.5 font-mono">Exame neurológico / RM mostra PRES em T2/FLAIR</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-red-950/20">
                <td className="p-2.5 font-bold text-red-400">Neurológico (Extremo)</td>
                <td className="p-2.5">Quebra da autorregulação com hiperperfusão encefálica difusa</td>
                <td className="p-2.5 font-bold text-red-300">Convulsão tônico-clônica generalizada, coma pós-ictal</td>
                <td className="p-2.5 font-mono text-red-200">Eclâmpsia / Sineclâmpsia</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-red-950/30">
                <td className="p-2.5 font-bold text-red-400">Neurológico (Catastrófico)</td>
                <td className="p-2.5">Ruptura de vaso intracraniano por pico pressórico descontrolado</td>
                <td className="p-2.5 font-bold text-red-300">Déficit motor focal súbito, cefaleia em trovoada</td>
                <td className="p-2.5 font-mono text-red-200">AVC Hemorrágico (Principal causa de morte na Eclâmpsia!)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Fetoplacentário</td>
                <td className="p-2.5">Hipóxia placentária crônica por leito de alta resistência</td>
                <td className="p-2.5">Redução de movimentação fetal, desacelerações na CTG</td>
                <td className="p-2.5 font-mono">Restrição de Crescimento Fetal (RCF), oligoidrâmnio, Doppler UtA/Umb alterados</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-red-950/20">
                <td className="p-2.5 font-bold text-red-400">Fetoplacentário (Extremo)</td>
                <td className="p-2.5">Necrose isquêmica e hematoma retroplacentário</td>
                <td className="p-2.5 font-bold text-red-300">Sangramento genital escuro, hipertonia uterina ("abdome em tábua"), dor intensa</td>
                <td className="p-2.5 font-mono text-red-200">Descolamento Prematuro de Placenta (DPP) / Sofrimento Fetal Agudo</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ALERTA DE PROVA */}
        <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-2xl text-xs space-y-1.5">
          <span className="text-red-300 font-black uppercase flex items-center gap-1.5">
            <AlertTriangle size={16} /> Alerta Clínico Crítico: Nem toda Eclâmpsia avisa!
          </span>
          <p className="text-slate-200">
            <strong>17% a 20% dos casos de Eclâmpsia acontecem SEM nenhum sintoma neurológico prodrômico prévio!</strong> Além disso, até 25% ocorrem em mulheres cuja PA ainda não havia atingido critérios de deterioração. Portanto, a ausência de sintomas prévios nunca afasta o risco de convulsão iminente.
          </p>
        </div>
      </div>

      {/* 3. DIAGNÓSTICO DIFERENCIAL: HELLP VS PTT VS SHU VS EAGG & CONVULSÃO */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-amber-300 uppercase flex items-center gap-2">
            <ShieldAlert className="text-amber-400" /> Diagnóstico Diferencial de Microangiopatias Trombóticas na Gestação
          </h3>
          <span className="px-2.5 py-0.5 bg-amber-950 text-amber-200 border border-amber-700 rounded text-[10px] font-black">
            Alta Complexidade
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                <th className="p-2.5">Critério Comparativo</th>
                <th className="p-2.5 text-fuchsia-300">Síndrome HELLP</th>
                <th className="p-2.5 text-sky-300">PTT (Púrpura Trombocitopênica)</th>
                <th className="p-2.5 text-emerald-300">SHU (Sínd. Hemolítico-Urêmica)</th>
                <th className="p-2.5 text-amber-300">EAGG (Esteatose Aguda Gravídica)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Trimestre Típico</td>
                <td className="p-2.5">3º trimestre / Pós-parto imediato</td>
                <td className="p-2.5">Qualquer trimestre</td>
                <td className="p-2.5">Predomínio no Pós-parto</td>
                <td className="p-2.5">3º trimestre</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">HAS / Proteinúria</td>
                <td className="p-2.5 font-bold text-white">Presente em 85%–90%</td>
                <td className="p-2.5">Ausente ou leve</td>
                <td className="p-2.5">Ausente ou leve</td>
                <td className="p-2.5">Variável (pode ter HAS leve)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Plaquetopenia</td>
                <td className="p-2.5">Moderada (&lt; 100.000)</td>
                <td className="p-2.5 font-bold text-red-400">Grave (&lt; 20.000 é muito comum)</td>
                <td className="p-2.5">Grave</td>
                <td className="p-2.5">Variável</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Função Renal</td>
                <td className="p-2.5">Alteração leve a moderada</td>
                <td className="p-2.5">Alteração leve</td>
                <td className="p-2.5 font-bold text-red-400">Insuficiência Renal Aguda franca</td>
                <td className="p-2.5">Progressiva</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Enzimas Hepáticas & Outros</td>
                <td className="p-2.5 font-bold text-white">Muito elevadas (TGO/TGP ≥ 70)</td>
                <td className="p-2.5">Normais ou pouco alteradas</td>
                <td className="p-2.5">Normais</td>
                <td className="p-2.5 font-bold text-amber-300">Muito elevadas + HIPOGLICEMIA GRAVE + Coagulopatia precoce</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-white">Atividade ADAMTS13</td>
                <td className="p-2.5">Normal (&gt; 10%)</td>
                <td className="p-2.5 font-bold text-red-400">Muito reduzida (&lt; 10%)</td>
                <td className="p-2.5">Normal</td>
                <td className="p-2.5">Normal</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-slate-950">
                <td className="p-2.5 font-bold text-white">Resposta ao Parto</td>
                <td className="p-2.5 font-black text-emerald-400">Rápida melhora após o parto</td>
                <td className="p-2.5 text-red-400 font-bold">NÃO resolve com parto (Plasmapheresis)</td>
                <td className="p-2.5 text-red-400 font-bold">NÃO resolve com parto (Eculizumabe)</td>
                <td className="p-2.5 font-black text-emerald-400">Resolve após o parto</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-700/60 text-xs text-amber-200">
          ⚠️ <strong>EAGG (Esteatose Hepática Aguda da Gravidez)</strong> é o diagnóstico diferencial mais traiçoeiro por sobrepor náuseas, dor abdominal e transaminases altas. Presença de <strong>hipoglicemia severa e coagulopatia precoce/CIVD</strong> apontam fortemente para EAGG!
        </div>
      </div>

      {/* 4. RASTREIO DE 1º TRIMESTRE & CLASSIFICAÇÃO DE HELLP (MISSISSIPPI vs TENNESSEE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RASTREIO DE 1º TRIMESTRE */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
              <Eye className="text-teal-400" /> Rastreio de 1º Trimestre — Controvérsia Ativa
            </h3>
            <span className="text-[10px] font-black px-2 py-0.5 bg-teal-950 text-teal-300 border border-teal-700 rounded">
              11ª a 13ª+6 sem
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Modelo ACOG (Checklist clínico simples):</span>
                <span className="text-red-400 font-mono">5% detecção PE pré-termo</span>
              </div>
              <p className="text-[11px] text-slate-400">Baseado puramente em fatores de risco da anamnese. Taxa de falso-positivo de 0,2%.</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Modelo NICE (Checklist pontuado):</span>
                <span className="text-amber-400 font-mono">41% detecção PE pré-termo</span>
              </div>
              <p className="text-[11px] text-slate-400">Classificação em alto e moderado risco por checklist de anamnese.</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border-2 border-emerald-700 space-y-1 bg-emerald-950/20">
              <div className="flex justify-between font-bold">
                <span className="text-emerald-300 font-black">Modelo FMF (Fetal Medicine Foundation):</span>
                <span className="text-emerald-400 font-mono font-black text-sm">90% detecção PE precoce</span>
              </div>
              <p className="text-[11px] text-slate-200">
                Modelo de risco competitivo combinando: <strong>História clínica + PAM média materna + Doppler de Artérias Uterinas (IP médio) + Biomarcador PlGF sérico</strong>.
              </p>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] text-slate-400 italic">
              *Nota de Prática no Brasil:* Pelo SUS e custo de insumos, a maioria dos serviços ainda utiliza o checklist simples, mesmo sabendo que o modelo FMF possui acurácia infinitamente superior.
            </div>
          </div>
        </div>

        {/* CLASSIFICAÇÕES DE HELLP (TENNESSEE vs MISSISSIPPI) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
              <Droplet className="text-fuchsia-400" /> Classificações da Síndrome HELLP
            </h3>
            <span className="text-[10px] font-black px-2 py-0.5 bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-700 rounded">
              Tennessee & Mississippi
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-black text-fuchsia-300 uppercase block">1. Critérios de Tennessee (Sibai):</span>
              <p className="text-slate-300">
                • <strong>HELLP Completo:</strong> Presença obrigatória dos 3 critérios (Hemólise + TGO/TGP ≥ 70 + Plaquetas &lt; 100.000).
                <br/>• <strong>HELLP Incompleto / Parcial:</strong> Presença de 1 ou 2 critérios (ex: EL isolado, LP isolado, ELLP).
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-black text-fuchsia-300 uppercase block">2. Classificação de Mississippi (Martin):</span>
              <div className="space-y-1 text-[11px]">
                <div className="p-1.5 bg-slate-900 rounded border border-red-800/80 flex justify-between">
                  <strong className="text-red-400">Classe 1 (Mais grave):</strong>
                  <span className="font-mono text-white">Plaquetas ≤ 50.000 / mm³</span>
                </div>
                <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <strong className="text-amber-400">Classe 2 (Gravidade intermediária):</strong>
                  <span className="font-mono text-white">Plaquetas 50.000 – 100.000 / mm³</span>
                </div>
                <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <strong className="text-sky-400">Classe 3 (Mais leve):</strong>
                  <span className="font-mono text-white">Plaquetas 100.000 – 150.000 / mm³</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. CALCULADORA DE CORREÇÃO DE MANGUITO (LANCET 1982) */}
      <div className="bg-slate-900 border-2 border-indigo-700/80 p-6 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-indigo-900/60 pb-3">
          <div>
            <h3 className="text-lg font-black text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <Calculator className="text-indigo-400" /> Correção de PA pela Circunferência Braquial (Maxwell et al., Lancet 1982)
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              O manguito padrão adulto (25-35 cm) em braço de obesa gera falsa elevação de até 21 mmHg na sistólica!
            </p>
          </div>
          <span className="px-3 py-1 bg-indigo-950 text-indigo-200 border border-indigo-600 rounded-full text-xs font-black self-start">
            Ajuste Obrigatório
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-black text-slate-300 uppercase block mb-1">
                Circunferência do Braço: <strong className="text-indigo-400 text-sm">{armCircumference} cm</strong>
              </label>
              <input 
                type="range" 
                min="20" 
                max="50" 
                step="2"
                value={armCircumference} 
                onChange={(e) => setArmCircumference(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20 cm</span>
                <span>30 cm (Padrão)</span>
                <span>50 cm</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">PAS Aferida</label>
                <input 
                  type="number" 
                  value={systolicInput} 
                  onChange={(e) => setSystolicInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-center font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">PAD Aferida</label>
                <input 
                  type="number" 
                  value={diastolicInput} 
                  onChange={(e) => setDiastolicInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-center font-bold"
                />
              </div>
            </div>
          </div>

          {/* RESULTADO */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-800/80 text-center space-y-2">
            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest block">Fator de Correção</span>
            <div className="flex justify-center gap-4 text-xs font-mono font-bold text-slate-300">
              <span>Sistólica: <strong className="text-white">{correction.sys >= 0 ? `+${correction.sys}` : correction.sys} mmHg</strong></span>
              <span>Diastólica: <strong className="text-white">{correction.dia >= 0 ? `+${correction.dia}` : correction.dia} mmHg</strong></span>
            </div>
            
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-black block">PA Real Corrigida</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {correctedSys} x {correctedDia} <span className="text-xs text-slate-400">mmHg</span>
              </span>
            </div>
          </div>

          {/* MANGUITO INDICADO */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
            <span className="text-[10px] font-black text-slate-400 uppercase block">Manguito Ideal Recomendado</span>
            <p className="font-black text-white text-sm text-indigo-300">{correction.cuff}</p>
            <p className="text-[11px] text-slate-400">
              O manguito deve cobrir de 75% a 100% da circunferência e 40% do comprimento do braço. Braço apoiado na altura do coração e pés apoiados no chão.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
