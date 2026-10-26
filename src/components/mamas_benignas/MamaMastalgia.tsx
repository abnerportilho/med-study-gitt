import React, { useState } from 'react';
import { 
  Heart, AlertCircle, CheckCircle2, ShieldAlert, 
  HelpCircle, Sparkles, Activity, Pill, Flame, ArrowRight
} from 'lucide-react';

export default function MamaMastalgia() {
  const [selectedType, setSelectedType] = useState<'ciclica' | 'aciclica' | 'extramamaria'>('ciclica');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 4 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <Heart size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Eixo 4 · Mastalgia Clínica
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Mastalgia: Classificação, Raciocínio Propedêutico & Manejo Racional
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A dor mamária é o motivo mais frequente de consulta em mastologia. O desafio clínico primordial é <strong>classificar a dor antes de solicitar exames</strong> e não medicalizar em excesso queixas fisiológicas.
        </p>
      </div>

      {/* 1. CLASSIFICAÇÃO DA DOR */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Activity className="text-amber-400" size={20} />
          Classifique a Dor Antes de Pedir Exames
        </h4>

        {/* TABS DE TIPO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedType('ciclica')}
            className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
              selectedType === 'ciclica'
                ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-rose-400">1. Mastalgia Cíclica</span>
              <span className="text-[10px] font-mono bg-rose-950 px-2 py-0.5 rounded text-rose-300">~65% dos casos</span>
            </div>
            <p className="text-xs leading-relaxed">
              Bilateral, difusa, predomínio em quadrantes súpero-externos, agravada na fase lútea tardia (pré-menstrual) e que alivia com o fluxo menstrual.
            </p>
          </button>

          <button
            onClick={() => setSelectedType('aciclica')}
            className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
              selectedType === 'aciclica'
                ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400">2. Mastalgia Acíclica</span>
              <span className="text-[10px] font-mono bg-cyan-950 px-2 py-0.5 rounded text-cyan-300">~25% dos casos</span>
            </div>
            <p className="text-xs leading-relaxed">
              Focal ou unilateral, constante ou intermitente, sem correlação com o ciclo menstrual. Comum em cistos, ectasia, trauma ou pós-cirurgia.
            </p>
          </button>

          <button
            onClick={() => setSelectedType('extramamaria')}
            className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
              selectedType === 'extramamaria'
                ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-400">3. Dor Extramamária</span>
              <span className="text-[10px] font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300">~10% dos casos</span>
            </div>
            <p className="text-xs leading-relaxed">
              Dor originada na parede torácica reproduzida à palpação das articulações condrocostais (Síndrome de Tietze), músculo peitoral ou coluna.
            </p>
          </button>
        </div>

        {/* DETALHAMENTO DO TIPO SELECIONADO */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs leading-relaxed">
          {selectedType === 'ciclica' && (
            <div className="space-y-2">
              <strong className="text-rose-400 block text-sm">Fisiopatologia & Pistas Clínicas da Mastalgia Cíclica:</strong>
              <p className="text-slate-300">
                Decorre da resposta exagerada do tecido mamário ao estímulo fisiológico de estrogênios e progesterona, associada à retenção hídrica no estroma interlobular. É mais comum em mulheres de 20 a 40 anos. O exame físico revela mamas densas e nodularidade difusa bilateral ("saco de chumbo").
              </p>
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900 text-rose-200">
                ✅ <strong>Conduta:</strong> Não requer exames de imagem se o exame físico for normal e a paciente tiver idade &lt;30 anos. Tranquilizar e orientar medidas comportamentais.
              </div>
            </div>
          )}

          {selectedType === 'aciclica' && (
            <div className="space-y-2">
              <strong className="text-cyan-400 block text-sm">Causas & Pistas Clínicas da Mastalgia Acíclica:</strong>
              <p className="text-slate-300">
                Frequentemente associada a patologias anatômicas benignas identificáveis: <strong>cistos inflamatórios ou sob tensão</strong>, ectasia ductal com mastite periductal, necrose gordurosa pós-trauma, mastite puerperal ou fibroadenoma doloroso. Também causada por fármacos (TRH, ACOs, antidepressivos, espironolactona, digoxina).
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-900 text-cyan-200">
                ⚠️ <strong>Conduta:</strong> Exige exame físico cuidadoso da topografia dolorosa e solicitação de <strong>Ultrassonografia e/ou Mamografia direcionada</strong> para excluir lesões estruturais subjacentes.
              </div>
            </div>
          )}

          {selectedType === 'extramamaria' && (
            <div className="space-y-2">
              <strong className="text-purple-400 block text-sm">Características da Dor na Parede Torácica:</strong>
              <p className="text-slate-300">
                O exame diferencial é feito comprimindo a glândula contra a parede torácica com a paciente em decúbito lateral ou tracionando a mama e comprimindo diretamente as cartilagens costais (junções condrocostais) e o músculo peitoral maior. Se a dor for reproduzida pontualmente na junção com edema local, diagnostica-se <strong>Síndrome de Tietze / Costocondrite</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900 text-purple-200">
                🩺 <strong>Conduta:</strong> AINE tópico/oral, correção postural, calor local e alongamentos torácicos. A glândula mamária em si é normal.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. DOR FOCAL PERSISTENTE VS DOR DIFUSA */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <ShieldAlert className="text-rose-400" size={20} />
          Dor Focal Persistente Merece Investigação Direcionada
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase text-emerald-400 block">Dor Difusa Cíclica + Exame Normal</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dor mamária isolada <strong>raramente é sintoma de câncer de mama (&lt;1% dos casos)</strong>. Em mulheres jovens sem nódulos e sem histórico familiar grave, não é necessário solicitar exames de imagem "apenas para tranquilizar a paciente". Deve-se explicar o mecanismo fisiológico com autoridade científica.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
            <span className="text-xs font-black uppercase text-rose-400 block">Dor Focal Persistente ou com Massa</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dor em um ponto específico da mama que não varia com o ciclo menstrual ou que é acompanhada de espessamento, retração ou massa palpável requer <strong>investigação por imagem imediata (USG + Mamografia conforme idade)</strong> para afastar cistos sob tensão, lesões inflamatórias ou processos malignos com invasão de fáscia.
            </p>
          </div>
        </div>
      </div>

      {/* 3. ESCADA TERAPÊUTICA DA MASTALGIA */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Pill className="text-emerald-400" size={20} />
          Tratamento da Mastalgia: Começar pelo Menos Invasivo
        </h4>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-800/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-400 uppercase">1ª Linha: Tranquilização & Suporte Mecânico</span>
              <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">Eficácia em 75-80%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Explicação da benignidade:</strong> Acolher a angústia da paciente e assegurar que mastalgia isolada não é câncer resolve a maior parte dos sintomas.<br />
              <strong>Sutiã adequado:</strong> Orientar o uso de sutiã esportivo com alças largas e boa sustentação sem aros rígidos, inclusive durante o sono nas fases de maior dor.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-800/60 space-y-1.5">
            <span className="text-xs font-black text-cyan-400 uppercase block">2ª Linha: Analgesia & AINE Tópico</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analgésicos simples (Paracetamol / Dipirona) ou anti-inflamatório não esteroide em gel tópico (ex: <strong>Gel de Diclofenaco ou Piroxicam</strong> aplicado 2 a 3 vezes ao dia no quadrante doloroso). Apresenta excelente alívio com mínimos efeitos adversos sistêmicos.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/60 space-y-1.5">
            <span className="text-xs font-black text-amber-400 uppercase block">3ª Linha (Casos Refratários Graves e Incapacitantes)</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Uso excepcional de moduladores hormonais sob supervisão especialista:<br />
              • <strong>Tamoxifeno:</strong> 10 mg/dia por 3 a 6 meses (bloqueador estrogênico mamário).<br />
              • <strong>Danazol:</strong> 100-200 mg/dia (antigonadotrófico com efeitos androgênicos importantes).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs text-slate-400">
            <strong className="text-slate-200 block">⚠️ Mitos & Terapias sem Evidência Consistente:</strong>
            <p>
              Restrição rígida de cafeína/chocolate, Óleo de Prímula (Evening Primrose Oil) e altas doses de Vitamina E mostraram <strong>benefício inconsistente e equivalente ao placebo</strong> em ensaios clínicos randomizados. Não devem ser prometidos como cura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
