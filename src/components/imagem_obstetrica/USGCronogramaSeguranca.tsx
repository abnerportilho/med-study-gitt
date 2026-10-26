import React, { useState } from 'react';
import { 
  Calendar, ShieldAlert, Sparkles, AlertTriangle, 
  CheckCircle2, Info, Eye, Layers, Zap, Clock, ShieldCheck, HeartPulse
} from 'lucide-react';

export default function USGCronogramaSeguranca() {
  const [selectedSetting, setSelectedSetting] = useState<'rotina' | 'alto_risco'>('rotina');

  return (
    <div className="space-y-6">
      {/* INTRODUÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Calendar size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Eixo 1 · Diretrizes e Segurança Física
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              1. Cronograma Racional de Exames e Princípios de Segurança
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          A ultrassonografia obstétrica é o método de imagem primordial do ciclo gravídico-puerperal. Sua realização deve obedecer a indicações cronológicas embasadas em evidências científicas (FEBRASGO, ISUOG, ACOG e Ministério da Saúde), garantindo máxima sensibilidade na detecção de cromossomopatias, malformações anatômicas e distúrbios de crescimento fetal com estrito respeito aos limites biofísicos de segurança.
        </p>
      </div>

      {/* SELETOR DE CENÁRIO: ROTINA VS ALTO RISCO */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-md">
        <button
          onClick={() => setSelectedSetting('rotina')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all ${
            selectedSetting === 'rotina'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gestação de Baixo Risco (Rotina)
        </button>
        <button
          onClick={() => setSelectedSetting('alto_risco')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all ${
            selectedSetting === 'alto_risco'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gestações de Alto Risco / Especiais
        </button>
      </div>

      {/* CRONOGRAMA DAS 3 A 4 ULTRASSONOGRAFIAS ESTRUTURANTES */}
      {selectedSetting === 'rotina' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* USG 1 */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative flex flex-col justify-between hover:border-cyan-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                  1º Exame (Opcional/Inicial)
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">7 a 9 sem</span>
              </div>
              <h4 className="text-base font-black text-white">US Obstétrico Inicial (Transvaginal)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Confirmação de implantação intrauterina tópica (excluir prenhez ectópica), confirmação de vitalidade embrionária (BCF presente), número de sacos gestacionais e <strong>datação fidedigna pelo CCN</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="text-cyan-300 font-bold">Objetivo Principal:</div>
                <div>Determinar a Idade Gestacional definitiva antes que alterações biológicas de crescimento ocorram.</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-cyan-400 pt-2 border-t border-slate-800">
              Padrão-Ouro: CCN inicial
            </div>
          </div>

          {/* USG 2 */}
          <div className="p-5 rounded-3xl bg-slate-900 border-2 border-cyan-500/80 space-y-3 relative flex flex-col justify-between shadow-lg shadow-cyan-950/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-white bg-cyan-600 px-2.5 py-0.5 rounded shadow">
                  2º Exame (Indispensável)
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">11 a 13s6d</span>
              </div>
              <h4 className="text-base font-black text-white">US Morfológico de 1º Trimestre</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rastreio de aneuploidias (Trissomia 21, 18 e 13) pela <strong>Transluscência Nucal (TN)</strong>, osso nasal e ducto venoso. Rastreio precoce de pré-eclâmpsia com Doppler de artérias uterinas.
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/80 text-[11px] text-cyan-200 space-y-1">
                <div className="text-white font-bold">Janela Estrita:</div>
                <div>CCN entre <strong>45 mm e 84 mm</strong>. Fora dessa faixa a medida da TN perde a validação epidemiológica.</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-cyan-300 pt-2 border-t border-cyan-900">
              Taxa Detecção Aneuploidias: até 90%
            </div>
          </div>

          {/* USG 3 */}
          <div className="p-5 rounded-3xl bg-slate-900 border-2 border-indigo-500/80 space-y-3 relative flex flex-col justify-between shadow-lg shadow-indigo-950/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-white bg-indigo-600 px-2.5 py-0.5 rounded shadow">
                  3º Exame (Obrigatório)
                </span>
                <span className="text-xs font-mono font-bold text-indigo-300">20 a 24 sem</span>
              </div>
              <h4 className="text-base font-black text-white">US Morfológico de 2º Trimestre</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Avaliação anatômica estruturada sistemática de todos os órgãos fetais (crânio, neuroeixo, face, coração em 4 câmaras e vias de saída, abdome, rins, membros e coluna) + <strong>Cervicometria transvaginal</strong> para rastreio de parto prematuro.
              </p>
              <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/80 text-[11px] text-indigo-200 space-y-1">
                <div className="text-white font-bold">Sensibilidade:</div>
                <div>Detecta mais de 80-85% das malformações estruturais maiores.</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-indigo-300 pt-2 border-t border-indigo-900">
              Inclui Colo Uterino (cut-off 25mm)
            </div>
          </div>

          {/* USG 4 */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative flex flex-col justify-between hover:border-cyan-500/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded">
                  4º Exame (3º Trimestre)
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">32 a 36 sem</span>
              </div>
              <h4 className="text-base font-black text-white">US Obstétrico de Crescimento</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Avaliação da curva ponderal e ganho ponderal (PFE), cálculo do percentil de crescimento fetal, quantificação do volume de líquido amniótico (ILA e Maior Bolsão Vertical), grau de maturidade placentária e apresentação fetal.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="text-cyan-300 font-bold">Foco Clínico:</div>
                <div>Identificação de RCF de início tardio, macrossomia fetal e distúrbios do líquido amniótico.</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
              PFE (Hadlock) + ILA/MBV
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-8 rounded-3xl bg-purple-950/30 border border-purple-800/60 space-y-4">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-base">
            <AlertTriangle size={20} />
            <span>Indicações Formais de Ultrassonografia Frequente e Seriadas</span>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Em gestações de alto risco, a periodicidade é individualizada e pode exigir exames quinzenais, semanais ou a cada 48-72h:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-800/40 space-y-1.5">
              <div className="font-bold text-purple-300">Gemelaridade Monocoriônica</div>
              <p className="text-slate-400">
                USG a cada 2 semanas a partir de 16 semanas para vigilância estrita de Síndrome de Transfusão Feto-Fetal (STTF) e RCF seletivo.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-800/40 space-y-1.5">
              <div className="font-bold text-purple-300">RCF e Pré-Eclâmpsia</div>
              <p className="text-slate-400">
                Dopplerfluxometria materna e fetal seriada para vigilância hemodinâmica e tomada de decisão sobre momento oportuno do parto.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-800/40 space-y-1.5">
              <div className="font-bold text-purple-300">Diabetes Gestacional / DM Prévio</div>
              <p className="text-slate-400">
                Vigilância de macrossomia fetal e polidramnia com US a cada 3-4 semanas; ecocardiograma fetal formal se DM pré-gestacional.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SEGURANÇA BIOFÍSICA: ALARA, TI, MI E RESSONÂNCIA MAGNÉTICA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
          <ShieldCheck size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Princípios de Segurança Biofísica, Efeitos Térmicos/Mecânicos e Métodos Avançados
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Cartão ALARA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Zap size={16} />
              <span>Princípio ALARA</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <em>"As Low As Reasonably Achievable"</em> (Tão baixo quanto razoavelmente exequível). A energia acústica deve ser restrita ao mínimo de potência e tempo de varredura estritamente necessários para obter imagens diagnósticas adequadas.
            </p>
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/60 text-[11px] text-amber-200">
              <strong>Regra Prática:</strong> Evitar ultrassom puramente recreativo ("sessões de fotos 3D/4D prolongadas") sem indicação clínica.
            </div>
          </div>

          {/* Cartão TI e MI */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Eye size={16} />
              <span>Índice Térmico (TI) e Mecânico (MI)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Índice Térmico (TI):</strong> Mede o potencial de aquecimento tecidual. No 1º trimestre, deve manter-se <strong>TI &lt; 0,7 a 1,0</strong>. O Doppler espectral e colorido entrega muito mais energia que o modo B 2D, devendo ser usado de forma breve.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Índice Mecânico (MI):</strong> Avalia o risco de cavitação acústica. Deve manter-se <strong>MI &lt; 1,9</strong>.
            </p>
          </div>

          {/* Cartão RM Fetal */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Layers size={16} />
              <span>Ressonância Magnética Fetal (RM)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Método seguro na gestação (sem radiação ionizante), de preferência realizada <strong>a partir da 18ª–20ª semana</strong> (devido ao menor movimento fetal e órgãos maiores).
            </p>
            <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/60 text-[11px] text-purple-200 space-y-1">
              <div><strong>Indicações de Ouro:</strong> Malformações do SNC fetal (agenesia de corpo caloso, holoprosencefalia) e <strong>Acretismo Placentário (PAS) invasivo</strong>.</div>
              <div className="text-rose-400 font-bold">Atenção: Gadolínio é CONTRAINDICADO na gestação (cruza a placenta e pode acumular no líquido amniótico).</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
