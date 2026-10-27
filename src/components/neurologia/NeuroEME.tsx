import React, { useState } from 'react';
import { 
  Zap, Clock, ShieldAlert, AlertTriangle, 
  Stethoscope, Pill, CheckCircle2, Info, Activity, ArrowRight
} from 'lucide-react';

export default function NeuroEME() {
  const [activeTab, setActiveTab] = useState<'tempos' | 'protocolo' | 'fisiopatologia' | 'refratario_norse'>('protocolo');

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'protocolo', label: '1. Protocolo por Tempo (Glauser & ESETT)', badge: '0 a 60 min' },
          { id: 'tempos', label: '2. Definição: Tempos t1 e t2 (ILAE 2015)', badge: 'Crise > 5 min' },
          { id: 'fisiopatologia', label: '3. Fisiopatologia: Tempo é Cérebro', badge: 'GABA vs NMDA' },
          { id: 'refratario_norse', label: '4. EME Refratário, UTI & NORSE', badge: 'Anestésicos & Autoimune' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{t.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeTab === t.id ? 'bg-rose-700/60 text-rose-100' : 'bg-slate-800 text-slate-400'}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. PROTOCOLO POR TEMPO */}
      {/* =================================================================== */}
      {activeTab === 'protocolo' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Diretrizes American Epilepsy Society (AES 2016) & Ensaio ESETT (NEJM 2019)
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Protocolo Cronometrado do Estado de Mal Epiléptico Convulsivo
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  O tempo dita o sucesso terapêutico. O escalonamento entre as fases de benzodiazepínico, segunda linha e anestésicos deve ser rápido e sem hesitações.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300">
                  t1 = 5 minutos
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs font-bold text-rose-300">
                  Mortalidade: 15% a 20%
                </div>
              </div>
            </div>

            {/* Stepped Timeline Boxes */}
            <div className="space-y-4">
              {/* Fase 0: 0 a 5 min */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                    <Clock size={15} /> 0 a 5 Minutos: Fase de Estabilização Inicial
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">ABC & Glicemia</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850">
                    <strong className="text-white block mb-0.5">Vias Aéreas & Oxigênio</strong>
                    <p className="text-[11px] text-slate-400">Posicionar em decúbito lateral para evitar broncoaspiração. O2 sob máscara. Monitorizar oximetria e ECG.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850">
                    <strong className="text-white block mb-0.5">Glicemia Capilar Imediata</strong>
                    <p className="text-[11px] text-slate-400">Se glicose &lt; 60 mg/dL: em etilistas ou desnutridos, <strong>administrar Tiamina 100 mg IV ANTES da glicose hipertônica 50%</strong> para evitar encefalopatia de Wernicke.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850">
                    <strong className="text-white block mb-0.5">Acesso Venoso & Coleta</strong>
                    <p className="text-[11px] text-slate-400">Eletrólitos (Na, Ca, Mg), hemograma, função renal/hepática, gasometria e nível de fármacos anticrise.</p>
                  </div>
                </div>
              </div>

              {/* Fase 1: 5 a 20 min */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                    <Zap size={15} /> 5 a 20 Minutos: 1ª Linha (Benzodiazepínico em Dose Plena)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-200">Nível A de Evidência</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Administrar benzodiazepínico imediatamente em <strong>dose cheia recomendada</strong>. Repetir <strong>uma única vez após 5 minutos</strong> se a crise persistir.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <strong className="text-amber-300 block">Midazolam IM (RAMPART 2012)</strong>
                    <p className="text-white font-mono font-bold text-sm">10 mg IM (&gt; 40 kg)</p>
                    <p className="text-[10px] text-slate-400">5 mg se 13 a 40 kg. Escolha preferencial no pré-hospitalar ou se sem acesso venoso imediato.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <strong className="text-rose-300 block">Diazepam IV (PHTSE 2001)</strong>
                    <p className="text-white font-mono font-bold text-sm">10 mg IV em bolus lento</p>
                    <p className="text-[10px] text-slate-400">Dose de 0,15 a 0,2 mg/kg. Fármaco mais disponível nos pronto-socorros brasileiros.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <strong className="text-cyan-300 block">Lorazepam IV (Se disponível)</strong>
                    <p className="text-white font-mono font-bold text-sm">4 mg IV (0,1 mg/kg)</p>
                    <p className="text-[10px] text-slate-400">Maior tempo de ação cerebral pelo menor volume de distribuição lipofílico.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-[11px] text-rose-300">
                  <strong>Alerta de Subdose:</strong> Não tenha medo de fazer 10 mg de diazepam no adulto! No estudo PHTSE, complicações respiratórias foram <em>mais frequentes no grupo placebo</em> do que no grupo que recebeu benzodiazepínico, porque o estado de mal em si causa hipóxia grave.
                </div>
              </div>

              {/* Fase 2: 20 a 40 min */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-cyan-400 flex items-center gap-1.5">
                    <Activity size={15} /> 20 a 40 Minutos: 2ª Linha (Fármaco IV de Ação Prolongada)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-200">Ensaio ESETT (NEJM 2019)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Se a crise persistir após 2 doses de benzodiazepínico, o paciente está em <strong>EME Estabelecido</strong>. No ensaio ESETT, Levetiracetam, Fosfenitoína e Valproato demonstraram eficácia praticamente idêntica (~46% de cessação em 60 min). Escolha pelo perfil do paciente:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <strong className="text-emerald-400 block text-xs">Levetiracetam IV (Keppra)</strong>
                    <span className="text-sm font-mono font-bold text-white block">60 mg/kg (máx 4.500 mg)</span>
                    <p className="text-[11px] text-slate-400">Infundir em 10 minutos. Perfil mais seguro: sem toxicidade hepática, sem hipotensão ou arritmias. Ajustar se ClCr baixo.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <strong className="text-cyan-400 block text-xs">Fenitoína IV (Hidantal)</strong>
                    <span className="text-sm font-mono font-bold text-white block">20 mg/kg (máx 1.500 mg)</span>
                    <p className="text-[11px] text-slate-400"><strong>Infusão lenta (máximo 50 mg/min)</strong> sob monitorização cardíaca contínua pelo risco de hipotensão e arritmias. Diluir exclusivamente em Soro Fisiológico (precipita com glicose). Ineficaz na abstinência alcoólica.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <strong className="text-purple-400 block text-xs">Valproato de Sódio IV</strong>
                    <span className="text-sm font-mono font-bold text-white block">40 mg/kg (máx 3.000 mg)</span>
                    <p className="text-[11px] text-slate-400">Infundir em 10 minutos. Contraindicado em hepatopatia, gestação ou suspeita de mitocondriopatia (mutação POLG).</p>
                  </div>
                </div>
              </div>

              {/* Fase 3: 40 a 60 min */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-purple-400 flex items-center gap-1.5">
                    <ShieldAlert size={15} /> 40 a 60 Minutos: 3ª Linha (EME Refratário & Coma Induzido)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-200">UTI + IOT + EEG</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Falha da segunda linha = <strong>Estado de Mal Epiléptico Refratário</strong> (ocorre em cerca de 1/3 dos pacientes).
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 space-y-2">
                  <p>• <strong>Conduta Imediata:</strong> Transferência para UTI, intubação orotraqueal e início de anestésicos gerais em infusão contínua.</p>
                  <p>• <strong>Anestésicos de Escolha:</strong> Midazolam (bolus 0,2 mg/kg + infusão 0,05 a 2 mg/kg/h) ou Propofol (bolus 1 a 2 mg/kg + 20 a 200 mcg/kg/min; vigiar acidose e rabdomiólise na Síndrome de Infusão do Propofol - PRIS).</p>
                  <p>• <strong>Alvo Terapêutico Eletroencefalográfico:</strong> Titular até atingir <strong>supressão de crises eletrográficas ou padrão de surto-supressão no EEG por 24 a 48 horas</strong>, seguido de desmame gradual.</p>
                  <p>• <strong>Ketamina:</strong> Antagonista NMDA com uso crescente no refratário para combater a excitotoxicidade glutamatérgica.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. DEFINIÇÃO: TEMPOS T1 E T2 */}
      {/* =================================================================== */}
      {activeTab === 'tempos' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Trinka et al., Epilepsia 2015 · Conceituação Operacional da ILAE
            </span>
            <h2 className="text-2xl font-black text-white">Os Tempos t1 e t2 no Estado de Mal</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              O estado de mal epiléptico resulta da <strong>falha dos mecanismos normais de término da crise</strong> ou da ativação de mecanismos que sustentam descargas anormais prolongadas.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-3">Tipo de EME</th>
                  <th className="p-3 text-rose-400 font-bold">Tempo t1 (Momento de Tratar)</th>
                  <th className="p-3 text-amber-400 font-bold">Tempo t2 (Risco de Dano Neuronal Irreversível)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                <tr>
                  <td className="p-3 font-bold text-white">Tônico-Clônico Convulsivo Generalizado</td>
                  <td className="p-3 font-bold text-rose-400 text-sm">5 minutos</td>
                  <td className="p-3 font-bold text-amber-400 text-sm">30 minutos</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Focal com Consciência Comprometida</td>
                  <td className="p-3 font-bold text-rose-400">10 minutos</td>
                  <td className="p-3 font-bold text-amber-400">&gt; 60 minutos</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Ausência</td>
                  <td className="p-3 font-bold text-rose-400">10 a 15 minutos</td>
                  <td className="p-3 text-slate-500">Desconhecido</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-white block">Regra de Ouro Prática:</strong>
            <p className="text-slate-400">
              A antiga definição de 30 minutos é puramente fisiopatológica para estimar lesão cerebral. <strong>Na prática clínica, qualquer crise convulsiva que dure mais de 5 minutos, ou duas ou mais crises consecutivas sem recuperação completa da consciência entre elas, É ESTADO DE MAL EPILÉPTICO</strong> e deve ser tratada imediatamente como tal.
            </p>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. FISIOPATOLOGIA: TEMPO É CÉREBRO */}
      {/* =================================================================== */}
      {activeTab === 'fisiopatologia' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Dinâmica de Receptores e Excitotoxicidade
            </span>
            <h2 className="text-2xl font-black text-white">Por Que o Tempo é Cérebro no EME?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">
                Internalização dos Receptores GABA-A e Perda de Potência dos BZD
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Durante uma crise prolongada, os <strong>receptores GABA-A sinápticos sofrem endocitose e são internalizados</strong> para o citoplasma, enquanto os receptores excitatórios <strong>NMDA e AMPA são translocados para a membrana sináptica</strong>.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 text-[11px] text-slate-300 space-y-1">
                <p>• Em modelos animais, <strong>a potência dos benzodiazepínicos cai cerca de 20 vezes aos 30 minutos de crise</strong>!</p>
                <p>• A cada minuto que passa, há menos alvo farmacológico para o diazepam/midazolam e mais hiperexcitabilidade glutamatérgica.</p>
                <p>• Isso explica por que doses baixas de BZD na fase tardia são ineficazes e por que a segunda linha deve entrar precocemente.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-rose-300 block">
                Excitotoxicidade Neuronal & O Fenômeno do EME Sutil
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                O influxo maciço de cálcio via receptores NMDA causa falência mitocondrial, geração de radicais livres e morte neuronal seletiva no hipocampo. Os experimentos clássicos de Meldrum em primatas comprovaram que <strong>a lesão hipocampal ocorre mesmo sob paralisia muscular e ventilação mecânica perfeita</strong>: a própria atividade elétrica anormal é citotóxica!
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 text-[11px] text-slate-300 space-y-1">
                <strong className="text-white block">EME Sutil (Dissociação Eletromecânica):</strong>
                <p>Com o passar das horas, a atividade motora diminui gradativamente pela fadiga muscular, restando apenas abalos discretos de pálpebras, nistagmo ou dedos, enquanto o paciente permanece em coma profundo com descargas contínuas e devastadoras no EEG.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. REFRATÁRIO & NORSE */}
      {/* =================================================================== */}
      {activeTab === 'refratario_norse' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Casos Complexos de UTI · Hirsh et al., Epilepsia 2018
            </span>
            <h2 className="text-2xl font-black text-white">EME Super-Refratário, NORSE e Síndrome FIRES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-rose-400 block">Conceito de EME Super-Refratário</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Estado de mal que persiste ou recorre após <strong>24 horas ou mais de infusão contínua de anestésicos em doses adequadas</strong>, ou que ressurge durante a tentativa de desmame do anestésico na UTI.
              </p>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• Requer associação de múltiplos fármacos anticrise (Levetiracetam + Valproato + Lacosamida / Topiramato).</li>
                <li>• <strong>Dieta Cetogênica</strong> via sonda enteral pode ser adjuvante eficaz.</li>
                <li>• Hipotermia terapêutica (32 a 34ºC) <strong>NÃO melhorou desfecho</strong> no ensaio randomizado HYBERNATUS (Legriel et al., NEJM 2016) [SEM EVIDÊNCIA DE ROTINA].</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">NORSE & FIRES (Encefalite Autoimune Latente)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>NORSE</strong> (<em>New-Onset Refractory Status Epilepticus</em>): EME refratário súbito em pessoa jovem previamente hígida, sem histórico de epilepsia e sem causa infecciosa, tóxica ou estrutural óbvia identificável na admissão.
              </p>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• <strong>FIRES:</strong> Subgrupo precedido por quadro febril inespecífico entre 2 semanas e 24 horas antes do início do estado de mal.</li>
                <li>• Mais de 1/3 dos casos são decorrentes de <strong>Encefalite Autoimune ou Paraneoplásica</strong> (anti-NMDAR, anti-LGI1, anti-GAD65).</li>
                <li>• <strong>Conduta:</strong> Não hesite em iniciar <strong>imunoterapia empírica precoce</strong> (pulsoterapia com Metilprednisolona 1 g/dia IV + Imunoglobulina IV) enquanto aguarda o painel de anticorpos neuronais!</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
