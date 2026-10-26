import React from 'react';
import { 
  Heart, Baby, Clock, AlertTriangle, 
  CheckCircle2, Activity, Scale, ShieldAlert, Sparkles, Stethoscope
} from 'lucide-react';

export default function DMGVitalidadeParto() {
  return (
    <div className="space-y-8">
      {/* 1. MONITORAMENTO DA VITALIDADE FETAL */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Heart size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Vigilância Pré-Natal no DMG
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Avaliação do Crescimento e Vitalidade Fetal
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Baby size={16} /> Ultrassonografia Seriada
            </div>
            <p className="text-slate-300 leading-relaxed">
              • Realizar biometria a cada <strong>3 a 4 semanas</strong> a partir do diagnóstico.
            </p>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Circunferência Abdominal (CA) fetal:</strong> Parâmetro mais sensível para hiperinsulinismo fetal e macrossomia precoce. CA &gt; p75-p90 sinaliza necessidade de intensificar insulinoterapia.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Activity size={16} /> Líquido Amniótico (ILA)
            </div>
            <p className="text-slate-300 leading-relaxed">
              • Medição do Índice de Líquido Amniótico (ILA) ou Maior Bolsão Vertical (MBV).
            </p>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Polidrâmnio (ILA &gt; 18-24 cm ou MBV &gt; 8 cm):</strong> Reflexo da diurese osmótica fetal decorrente de hiperglicemia e mau controle metabólico materno.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Stethoscope size={16} /> Testes de Vitalidade Anteparto
            </div>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Cardiotocografia (CTG) basal e Perfil Biofísico Fetal (PBF):</strong> Iniciar semanalmente a partir de <strong>32 a 36 semanas</strong> em gestantes em uso de insulina ou com controle inadequado.
            </p>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Dopplerfluxometria:</strong> Indicada quando houver suspeita de Restrição de Crescimento Intrauterino (RCIU) ou Pré-Eclâmpsia sobreposta (comum no diabetes pré-existente com vasculopatia).
            </p>
          </div>

        </div>
      </div>

      {/* 2. MOMENTO DA RESOLUÇÃO DA GESTAÇÃO (QUANDO INTERROMPER?) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-700/80 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 text-indigo-300 border border-indigo-800">
            <Clock size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
              Planejamento Obstétrico
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Idade Gestacional Ideal para o Parto
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* DMG em MEV */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">DMG em MEV</span>
              <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Baixo Risco
              </span>
            </div>
            <p className="text-base font-black text-white font-mono">39 a 40+6 semanas</p>
            <p className="text-slate-300 leading-relaxed">
              Gestantes com DMG bem controladas apenas com dieta e atividade física podem aguardar o início espontâneo do trabalho de parto até <strong>40+6 semanas</strong>, desde que a vitalidade fetal esteja assegurada.
            </p>
          </div>

          {/* DMG com Insulina Bem Controlada */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase">DMG c/ Insulina Compensada</span>
              <span className="text-[10px] font-bold bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                Compensada
              </span>
            </div>
            <p className="text-base font-black text-white font-mono">39 semanas a 39+6 semanas</p>
            <p className="text-slate-300 leading-relaxed">
              Não ultrapassar 39+6 semanas devido ao risco aumentado de insuficiência placentária e óbito fetal intraútero no final da gestação.
            </p>
          </div>

          {/* DMG Descompensada / Vasculopatia / Macrossomia */}
          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300 uppercase">DMG Descompensada / Risco</span>
              <span className="text-[10px] font-bold bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                Alto Risco
              </span>
            </div>
            <p className="text-base font-black text-rose-300 font-mono">37 semanas a 38+6 semanas</p>
            <p className="text-slate-300 leading-relaxed">
              Mau controle glicêmico com altas doses de insulina, polidrâmnio grave, RCIU, vasculopatia materna ou hipertensão associada exigem antecipação do parto a partir de 37 semanas.
            </p>
          </div>

        </div>
      </div>

      {/* 3. VIA DE PARTO & PREVENÇÃO DE DISTÓCIA DE OMBRO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Scale size={18} className="text-amber-400" /> Via de Parto & Indicação de Cesariana
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-white text-sm">Parto Vaginal (Indicação Preferencial)</h5>
            <p className="text-slate-300 leading-relaxed">
              • O diagnóstico de <strong>DMG por si só NÃO é indicação de cesárea</strong>. O parto vaginal é incentivado para a maioria das gestantes com peso fetal estimado normal.
            </p>
            <p className="text-slate-300 leading-relaxed">
              • É permitida a indução do parto com ocitocina ou preparo de colo com método mecânico/misoprostol conforme a maturidade cervical (Score de Bishop).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/80 space-y-2">
            <h5 className="font-bold text-amber-300 text-sm">Cesariana Eletiva Profilática (PFE ≥ 4.500g)</h5>
            <p className="text-slate-200 leading-relaxed">
              • Recomendada pela FEBRASGO, ACOG e ADA quando o <strong>Peso Fetal Estimado (PFE) for ≥ 4.500g</strong> (ou ≥ 4.000g em centros com histórico obstétrico adverso de distócia).
            </p>
            <p className="text-amber-200 leading-relaxed font-bold">
              • Objetivo principal: Prevenir a <strong>distócia de espáduas</strong>, fratura de clavícula/úmero, asfixia perinatal e lesão permanente do plexo braquial (Paralisia de Erb-Duchenne).
            </p>
          </div>
        </div>
      </div>

      {/* 4. CONTROLE GLICÊMICO INTRAPARTO */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Activity size={18} className="text-emerald-400" /> Protocolo de Manejo Glicêmico Intraparto
        </h4>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center border-b border-slate-800 pb-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Alvo Glicêmico no Parto</span>
              <span className="text-base font-black text-emerald-400 font-mono">70 a 110-120 mg/dL</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Frequência da Monitorização</span>
              <span className="text-base font-black text-cyan-400 font-mono">A cada 1 a 2 horas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Meta Fisiológica</span>
              <span className="text-base font-black text-indigo-400 font-mono">Evitar Hipoglicemia Neonatal</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed">
            • <strong>No início do trabalho de parto ativo:</strong> Suspender a dose usual de insulina de ação intermediária/longa (NPH).
          </p>
          <p className="text-slate-300 leading-relaxed">
            • <strong>Hidratação:</strong> Iniciar infusão venosa de Soro Glicosado a 5% (100 a 125 mL/h) para garantir substrato calórico para o miométrio.
          </p>
          <p className="text-slate-300 leading-relaxed">
            • <strong>Se Glicemia &gt; 120-140 mg/dL:</strong> Iniciar infusão venosa contínua de Insulina Regular em bomba (1 a 2 UI/h), titulando conforme glicemias horárias.
          </p>
        </div>
      </div>
    </div>
  );
}
