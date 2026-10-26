import React, { useState } from 'react';
import { 
  Pill, Clock, AlertTriangle, ShieldAlert, CheckCircle2, 
  Layers, Stethoscope, Ban, ArrowRight, Info, Syringe, HeartPulse,
  Flame, Target, BookOpen
} from 'lucide-react';

export default function RPMCondutaEsquemas() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<'previabilidade' | 'expectante' | 'tardio' | 'termo'>('expectante');

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Pill size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Rotura Prematura de Membranas (RPMO) · Eixo 2
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Conduta por Idade Gestacional e os Três Esquemas Antimicrobianos
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          O manejo da RPM pré-termo equilibra a preservação do tempo gestacional para ganho de maturidade pulmonar com a prevenção sistemática de infecção materna e fetal. O uso de antimicrobianos exige discernimento absoluto entre <strong>latência, profilaxia intraparto e tratamento de infecção instalada</strong>.
        </p>

        {/* NAVEGAÇÃO DE IDADES GESTACIONAIS */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {[
            { id: 'previabilidade', label: '1. Pré-Viabilidade (< 24 semanas)' },
            { id: 'expectante', label: '2. 24 a 33+6 semanas (Conduta Expectante)' },
            { id: 'tardio', label: '3. 34 a 36+6 semanas (PPROMT Trial)' },
            { id: 'termo', label: '4. ≥ 37 semanas (Conduta Ativa / Indução)' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSelectedAgeGroup(btn.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAgeGroup === btn.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-900/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-900'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* O DIVISOR DE ÁGUAS NA AMNIORREXE: CONDUTA EXPECTANTE VS RESOLUÇÃO IMEDIATA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/80 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <ShieldAlert size={22} className="text-cyan-400 shrink-0" />
            <span>Amniorrexe Prematura Pré-Termo (&lt; 37 sem): O Papel Decisivo da Infecção</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-300 font-bold bg-cyan-950 px-2.5 py-1 rounded-xl border border-cyan-800">
            Diretriz Clínica
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Na <strong>amniorrexe prematura pré-termo</strong> (ruptura prematura das membranas antes de 37 semanas), a conduta depende principalmente da <strong>idade gestacional</strong> e da <strong>presença de infecção, sofrimento fetal ou trabalho de parto estabelecido</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* SEM CORIOAMNIONITE: EXPECTANTE */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 size={18} />
                Sem Sinais de Corioamnionite
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">
                Manejo Expectante
              </span>
            </div>
            <div className="space-y-2 text-slate-300 leading-relaxed">
              <p>
                Quando a idade gestacional ainda permite benefício com o prolongamento da gestação (notadamente &lt; 34 semanas), adota-se o <strong>manejo expectante hospitalar</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                <li><strong>Vigilância materno-fetal contínua</strong> (curva térmica de 4/4h, BCF, hemograma, PBF).</li>
                <li><strong>Corticoterapia antenatal</strong> para maturação pulmonar.</li>
                <li><strong>Antibioticoterapia de latência por 7 dias</strong> (Ampicilina + Azitromicina &rarr; Amoxicilina).</li>
              </ul>
              <p className="text-emerald-300 text-[11px] font-semibold pt-1 border-t border-slate-800">
                Finalidade: Reduzir complicações da prematuridade e ganhar tempo gestacional com segurança.
              </p>
            </div>
          </div>

          {/* COM CORIOAMNIONITE / SOFRIMENTO: INTERRUPÇÃO */}
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-rose-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-2">
                <Flame size={18} />
                Com Corioamnionite, Sofrimento ou DPP
              </span>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800 font-mono">
                Parto Imediato
              </span>
            </div>
            <div className="space-y-2 text-slate-300 leading-relaxed">
              <p>
                Por outro lado, se a paciente com amniorrexe apresentar <strong>corioamnionite, sofrimento fetal agudo, descolamento prematuro de placenta (DPP)</strong> ou outra indicação de interrupção:
              </p>
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-1 text-[11px]">
                <strong className="text-rose-200 block">Proibições Mandatórias:</strong>
                <p className="text-slate-300">
                  <strong>NÃO se deve realizar manejo expectante NEM tocólise.</strong>
                </p>
              </div>
              <p className="text-slate-200 text-[11px]">
                A conduta imediata passa a ser <strong>interrupção da gestação associada à antibioticoterapia venosa de amplo espectro</strong>.
              </p>
              <p className="text-amber-300 text-[11px] font-semibold pt-1 border-t border-slate-800">
                ★ <strong>Via de Parto:</strong> Definida por critérios obstétricos; corioamnionite isoladamente <u>NÃO</u> obriga cesariana.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. PRÉ-VIABILIDADE (< 24 SEMANAS) */}
      {selectedAgeGroup === 'previabilidade' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <AlertTriangle size={20} />
              <span>Gestação Pré-Viável (&lt; 24 Semanas de Gestação)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Prognóstico Perinatal Reservado</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <p>
              A rotura espontânea de membranas antes de 24 semanas impõe um prognóstico fetal extremamente reservado. A ausência crônica de líquido amniótico durante a fase canalicular do desenvolvimento respiratório compromete a proliferação dos bronquíolos e alvéolos.
            </p>
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200">
              <strong>Sequência de Potter Induzida por Oligoidrâmnio Prolongado:</strong> Hipoplasia pulmonar grave (causa predominante de letalidade neonatal precoce), deformidades posturais de membros, contraturas articulares e fácies típica de compressão.
            </div>
            <p>
              <strong>Conduta Clínica:</strong> Decisão individualizada e compartilhada com o casal. Esclarecer com transparência as altas taxas de corioamnionite materna, sepse puerperal e sobrevida fetal mínima com graves sequelas neurológicas. A paciente participa ativamente da decisão entre conduta expectante ambulatorial restrita ou interrupção consentida da gestação conforme a legislação vigente.
            </p>
          </div>
        </div>
      )}

      {/* 2. 24 A 33+6 SEMANAS: CONDUTA EXPECTANTE PADRÃO */}
      {selectedAgeGroup === 'expectante' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/70 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <CheckCircle2 size={20} />
              <span>24 a 33 semanas + 6 dias (Sem Infecção ou Comprometimento)</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">Conduta Expectante é o Padrão</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Nesta faixa gestacional, <strong>o ganho biológico de maturidade supera o risco infeccioso</strong> desde que a vigilância clínica materno-fetal seja contínua e hospitalar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 text-sm block">1. Internação Hospitalar Imediata</span>
              <p className="text-slate-300">
                Obrigatória para toda gestante, independente da paridade ou dilatação inicial. Repouso leito-poltrona, hidratação adequada.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 text-sm block">2. Corticoterapia Antenatal</span>
              <p className="text-slate-300">
                <strong>Ciclo único</strong> idêntico ao TPP: Betametasona 12 mg IM a cada 24h (2 doses) OU Dexametasona 6 mg IM a cada 12h (4 doses).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
              <span className="font-bold text-emerald-400 text-sm block">3. Antibioticoterapia de Latência</span>
              <p className="text-slate-300">
                <strong>Azitromicina 1 g VO (dose única) + Ampicilina 2 g IV 6/6h por 48h</strong>, seguido de <strong>Amoxicilina 500 mg VO 8/8h por mais 5 dias</strong> (total de 7 dias).
              </p>
              <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800 text-[11px] text-rose-300 font-bold">
                PROIBIDO: Amoxicilina + Clavulanato (aumenta risco de Enterocolite Necrosante neonatal!).
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 text-sm block">4. Neuroproteção & Tocólise</span>
              <p className="text-slate-300">
                <strong>Sulfato de Magnésio:</strong> indicado se o parto se tornar iminente entre 24 e 31+6 semanas (ataque 4g IV + manutenção 1g/h).
              </p>
              <p className="text-slate-400 text-[11px]">
                <strong>Tocólise: NÃO é recomendada de rotina.</strong> Uso breve excepcional apenas para permitir transporte ou completar as 48h de corticoide, NUNCA na presença de infecção!
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-white text-sm block">Rotina de Vigilância Diária na Enfermaria:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong>Curva Térmica:</strong> temperatura axilar de 4/4h (alerta &ge; 37,8°C).
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong>Ausculta Fetal:</strong> BCF de 6/6h ou CTG diária (alerta &gt; 160 bpm).
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong>Hemograma Seriado:</strong> leucograma a cada 48 a 72h.
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <strong>Ultrassonografia:</strong> vigilância de PBF e líquido amniótico a cada 1-2 semanas.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 34 A 36+6 SEMANAS: CONTROVÉRSIA E PPROMT */}
      {selectedAgeGroup === 'tardio' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <Clock size={20} />
              <span>34 a 36 semanas + 6 dias: O Impacto do Trial PPROMT (2016)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Controvérsia de Conduta</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <p className="font-bold text-white text-sm">Evolução da Evidência Científica:</p>
            <p>
              Durante muitos anos, a conduta padrão ao atingir 34 semanas completas era a resolução imediata (indução do parto), temendo o risco infeccioso materno.
            </p>
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800 text-cyan-200">
              <strong>O Estudo PPROMT (2016):</strong> Demonstrou em ensaio clínico randomizado que a <strong>conduta expectante nessa faixa não aumenta a incidência de sepse neonatal</strong> e reduz significativamente o desconforto respiratório respiratório fetal comparado à indução imediata do parto.
            </div>
            <p>
              <strong>Recomendação Atual:</strong> A recomendação predominante (ACOG e maioria dos protocolos brasileiros) apoia a conduta expectante com antibioticoterapia de latência também entre 34 e 36+6 semanas, desde que não haja sinais de infecção ou sofrimento fetal e o serviço disponha de retaguarda neonatal adequada. A corticoterapia pode ser considerada caso não tenha sido realizada anteriormente.
            </p>
          </div>
        </div>
      )}

      {/* 4. ≥ 37 SEMANAS: CONDUTA ATIVA */}
      {selectedAgeGroup === 'termo' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <CheckCircle2 size={20} />
              <span>RPM a Termo (&ge; 37 Semanas de Gestação)</span>
            </div>
            <span className="text-xs font-mono text-emerald-300 font-bold">Conduta Ativa: Indução do Parto</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <p>
              No feto a termo com pulmões maduros, não há nenhum benefício em postergar o parto diante de bolsa rota.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <strong className="text-white text-xs block">Estratégia de Resolução Ativa:</strong>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Se não houver entrada espontânea em trabalho de parto nas primeiras horas após a rotura (ou imediatamente conforme rotina institucional), indicar <strong>indução do parto</strong>.</li>
                <li><strong>Colo favorável (Índice de Bishop &ge; 6):</strong> indução direta com infusão intravenosa de <strong>Ocitocina</strong>.</li>
                <li><strong>Colo desfavorável (Índice de Bishop &lt; 6):</strong> preparo cervical com <strong>Misoprostol 25 mcg vaginal</strong> a cada 4-6h ou método mecânico (balão de Foley intracervical se ausência de sangramento ou infecção).</li>
                <li>Iniciar profilaxia intraparto para EGB se houver indicação (urocultura positiva, swab positivo ou fatores de risco).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 7. TABELA COMPARATIVA DOS TRÊS ESQUEMAS ANTIBIÓTICOS (NÃO CONFUNDIR!) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/80 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Pill size={20} />
            <span>Os Três Esquemas Antibióticos na RPM — NÃO CONFUNDIR</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Ponto Clássico de Confusão em Residência</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          São <strong>três indicações distintas</strong>, empregadas em <strong>três momentos clínicos diferentes</strong>, com <strong>três esquemas posológicos completamente específicos</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* ESQUEMA 1: LATÊNCIA */}
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-cyan-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400 text-sm">1. Antibiótico de Latência</span>
              <span className="text-[10px] font-mono text-cyan-300">RPM Pré-Termo</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <p><strong className="text-white">Momento:</strong> Na admissão hospitalar, fora de trabalho de parto ativo, com feto pré-termo (&lt; 34-37 sem).</p>
              <p><strong className="text-white">Objetivo:</strong> Prolongar o período de latência até o parto e diminuir morbidades infecciosas neonatais.</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-200 font-mono text-[11px] leading-relaxed">
                Azitromicina 1 g VO (dose única)<br />
                + Ampicilina 2 g IV 6/6h por 48h<br />
                &rarr; Amoxicilina 500 mg VO 8/8h por 5 dias
              </div>
            </div>
          </div>

          {/* ESQUEMA 2: PROFILAXIA EGB */}
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-emerald-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">2. Profilaxia EGB Intraparto</span>
              <span className="text-[10px] font-mono text-emerald-300">Fase Ativa</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <p><strong className="text-white">Momento:</strong> Exclusivamente durante o trabalho de parto ativo ou na indução/rotura &ge; 18h com indicação.</p>
              <p><strong className="text-white">Objetivo:</strong> Prevenir sepse neonatal precoce por <em>Streptococcus agalactiae</em>.</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-200 font-mono text-[11px] leading-relaxed">
                Penicilina G Cristalina 5 milhões UI IV ataque, depois 2,5-3 milhões UI IV a cada 4h até o nascimento.<br />
                (Alternativa: Ampicilina 2 g IV ataque + 1 g 4/4h).
              </div>
            </div>
          </div>

          {/* ESQUEMA 3: CORIOAMNIONITE */}
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-rose-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm">3. Tratamento de Corioamnionite</span>
              <span className="text-[10px] font-mono text-rose-300">Infecção Clínica</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <p><strong className="text-white">Momento:</strong> Ao diagnóstico clínico de corioamnionite materna (febre + taquicardia/dor/odor).</p>
              <p><strong className="text-white">Objetivo:</strong> Tratar infecção polimicrobiana invasiva e preparar parto imediato.</p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-rose-200 font-mono text-[11px] leading-relaxed">
                Clindamicina 900 mg IV 8/8h + Gentamicina 1,5 mg/kg IV 8/8h<br />
                OU<br />
                Ampicilina 2 g IV 6/6h + Gentamicina + Metronidazol 500 mg IV 8/8h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. QUANDO INTERROMPER A CONDUTA EXPECTANTE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-700/80 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-base border-b border-slate-800 pb-3">
          <ShieldAlert size={20} />
          <span>Critérios de Interrupção Imediata da Conduta Expectante (Em Qualquer IG)</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Sempre que surgir qualquer uma das seguintes complicações, <strong>a idade gestacional deixa de ser o critério orientador</strong> e a conduta passa a ser o parto imediato:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-1">
            <strong className="text-rose-300 block">1. Corioamnionite</strong>
            <p className="text-slate-300 text-[11px]">Infecção ovular instalada impõe o esvaziamento uterino imediato sob antibioticoterapia venosa.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-1">
            <strong className="text-rose-300 block">2. Comprometimento Fetal</strong>
            <p className="text-slate-300 text-[11px]">Sofrimento fetal agudo com desacelerações variáveis graves recorrentes ou desacelerações tardias.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-1">
            <strong className="text-rose-300 block">3. DPP ou Sangramento</strong>
            <p className="text-slate-300 text-[11px]">Descolamento prematuro de placenta, hipertonia ou hemorragia genital materna de vulto.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-1">
            <strong className="text-rose-300 block">4. Trabalho de Parto Ativo</strong>
            <p className="text-slate-300 text-[11px]">Trabalho de parto já francamente estabelecido e avançado (não realizar tocólise com bolsa rota!).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
