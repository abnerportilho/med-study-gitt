import React, { useState } from 'react';
import { 
  Activity, Baby, Zap, AlertTriangle, CheckCircle2, 
  Sparkles, Scale, Info, ShieldAlert, HeartPulse, UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DMGFatoresDeRisco() {
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const metabolicFactors = [
    { id: 'imc', label: 'IMC pré-gestacional ≥ 25 kg/m² (sobrepeso) ou ≥ 30 kg/m² (obesidade)', note: 'Fator clássico de resistência insulínica tecidual' },
    { id: 'familiar', label: 'História familiar de diabetes mellitus em parente de 1º grau', note: 'Predisposição genética à disfunção de células beta' },
    { id: 'sop', label: 'Síndrome dos ovários policísticos (SOP)', note: 'Resistência insulínica basal e hiperandrogenismo' },
    { id: 'hba1c_pre', label: 'HbA1c ≥ 5,7% previamente à gestação', note: 'Marcador laboratorial inequívoco de pré-diabetes' },
    { id: 'has', label: 'Hipertensão arterial crônica (HAC)', note: 'Componente da síndrome metabólica e risco vascular' },
    { id: 'triglic', label: 'Hipertrigliceridemia prévia ou no início da gestação', note: 'Dislipidemia aterogênica e sobrecarga de substratos' },
    { id: 'idade', label: 'Idade materna avançada (≥ 35 anos)', note: 'Redução fisiológica progressiva da reserva secretora pancreática' }
  ];

  const obstetricFactors = [
    { id: 'dmg_previo', label: 'DMG em gestação anterior', note: 'Risco de recorrência em até 40% a 70% nas gestações subsequentes' },
    { id: 'macrossomia_previa', label: 'Recém-nascido anterior com peso ≥ 4.000 g (Macrossomia prévia)', note: 'Forte marcador indireto de hiperglicemia fetal prévia' },
    { id: 'polidramnio', label: 'Polidrâmnio em gestação atual ou prévia', note: 'Causado por poliúria fetal secundária à sobrecarga de glicose' },
    { id: 'obito_inexplicado', label: 'Perda fetal ou óbito perinatal sem causa definida em gestação anterior', note: 'Possível desfecho de acidose e hiperinsulinemia fetal crônica oculta' }
  ];

  const toggleRisk = (id: string) => {
    setSelectedRisks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO TEMA 1 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
              Eixo 1 · Rastreamento e Estratificação
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              1. Fatores de Risco para Hiperglicemia na Gestação
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          O risco de hiperglicemia na gestação <strong>não é uniforme na população obstétrica</strong>. A identificação rigorosa dos fatores de risco metabólicos e antecedentes obstétricos orienta a necessidade de <strong>rastreio precoce (antes de 24 a 28 semanas)</strong> e ajuda a interpretar a magnitude de vigilância e intensidade do acompanhamento ao longo de todo o pré-natal.
        </p>
      </div>

      {/* 1.1 FATORES METABÓLICOS E 1.2 FATORES OBSTÉTRICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fatores Metabólicos */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
            <HeartPulse size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">1.1 Fatores Metabólicos</h4>
          </div>

          <div className="space-y-3">
            {metabolicFactors.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleRisk(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  selectedRisks.includes(item.id)
                    ? 'bg-indigo-950/50 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                  selectedRisks.includes(item.id) ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900'
                }`}>
                  {selectedRisks.includes(item.id) && <CheckCircle2 size={12} />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold leading-snug">{item.label}</p>
                  <span className="text-[11px] text-slate-400 block">{item.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fatores Obstétricos */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-purple-400 border-b border-slate-800 pb-3">
            <Baby size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">1.2 Fatores Obstétricos</h4>
          </div>

          <div className="space-y-3">
            {obstetricFactors.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleRisk(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  selectedRisks.includes(item.id)
                    ? 'bg-purple-950/50 border-purple-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                  selectedRisks.includes(item.id) ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-700 bg-slate-900'
                }`}>
                  {selectedRisks.includes(item.id) && <CheckCircle2 size={12} />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold leading-snug">{item.label}</p>
                  <span className="text-[11px] text-slate-400 block">{item.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback dinâmico do checklist */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">Fatores Selecionados:</span>
              <span className="font-mono font-black text-indigo-400">{selectedRisks.length} / 11</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {selectedRisks.length > 0
                ? '⚠️ A presença de qualquer um desses fatores reforça a vigilância contínua e a solicitação rigorosa da Glicemia de Jejum na primeira consulta pré-natal e TOTG 75g com 24-28 semanas.'
                : 'Clique nos fatores acima para simular a identificação do perfil de risco na anamnese.'}
            </p>
          </div>
        </div>
      </div>

      {/* NEVER MISS — SOP e Perda Fetal Inexplicada */}
      <div className="p-6 md:p-8 rounded-3xl bg-amber-950/40 border-2 border-amber-500/80 space-y-3 shadow-xl">
        <div className="flex items-center gap-2.5 text-amber-400">
          <Zap size={22} className="fill-amber-400" />
          <h4 className="text-sm md:text-base font-black uppercase tracking-wider">
            ⚡ NEVER MISS — SOP e Perda Fetal Inexplicada: Itens Frequentemente Esquecidos na Anamnese
          </h4>
        </div>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
          A <strong>Síndrome dos Ovários Policísticos (SOP)</strong> entra na lista de risco não pela síndrome reprodutiva em si, mas pela <strong>resistência insulínica basal</strong> que a acompanha intrinsecamente. 
        </p>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
          O <strong>óbito ou perda fetal sem causa definida</strong> como antecedente obstétrico é um item que muitos examinadores cobram e que costuma ser omitido se a anamnese não for dirigida especificamente para isso, sinalizando potenciais episódios não diagnosticados de DMG grave com desfecho perinatal adverso prévio.
        </p>
      </div>
    </div>
  );
}
