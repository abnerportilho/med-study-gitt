import React, { useState } from 'react';
import { 
  Stethoscope, AlertTriangle, CheckCircle2, ShieldAlert, 
  HelpCircle, Sparkles, Eye, User, Search, Flame
} from 'lucide-react';

export default function MamaConsultaExame() {
  const [selectedRedFlag, setSelectedRedFlag] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 2 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-pink-950 text-pink-400 border border-pink-800">
            <Stethoscope size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 bg-pink-950 px-2.5 py-0.5 rounded-full border border-pink-800">
              Eixo 2 · Propedêutica Clínica
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Consulta Clínica, Exame Físico & Sinais de Alerta (Red Flags)
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          Uma boa anamnese reduz a solicitação aleatória de exames e organiza hipóteses. A regra da propedêutica mamária é: <em>"Tranquilizar com método, não por mera impressão clínica."</em>
        </p>
      </div>

      {/* 1. OS 4 EIXOS DA ANAMNESE */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Search className="text-pink-400" size={20} />
          Anamnese Estruturada: A Queixa e sua Cronologia
        </h4>
        <p className="text-xs text-slate-300">
          As manifestações clínicas mamárias concentram-se em 4 eixos principais: <strong>Dor, Nódulo, Descarga e Inflamação</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-2">
            <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
              1. Dor (Mastalgia)
            </span>
            <ul className="text-xs text-slate-300 space-y-1">
              <li><strong>Padrão:</strong> Cíclica ou acíclica?</li>
              <li><strong>Topografia:</strong> Focal ou difusa?</li>
              <li><strong>Severidade:</strong> Escala EVA e duração.</li>
              <li><strong>Irradiação:</strong> Parede torácica, ombro, dorso?</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-2">
            <span className="text-xs font-black uppercase text-purple-400 flex items-center gap-1.5">
              2. Nódulo (Massa)
            </span>
            <ul className="text-xs text-slate-300 space-y-1">
              <li><strong>Tempo de percepção:</strong> Dias, meses ou anos?</li>
              <li><strong>Evolução:</strong> Estável ou crescimento rápido?</li>
              <li><strong>Mobilidade:</strong> Livre ou fixo?</li>
              <li><strong>Oscilação:</strong> Varia com o ciclo menstrual?</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-2">
            <span className="text-xs font-black uppercase text-cyan-400 flex items-center gap-1.5">
              3. Descarga Papilar
            </span>
            <ul className="text-xs text-slate-300 space-y-1">
              <li><strong>Mecanismo:</strong> Espontânea ou provocada?</li>
              <li><strong>Lateridade:</strong> Unilateral ou bilateral?</li>
              <li><strong>Origem:</strong> Uniductal ou multiductal?</li>
              <li><strong>Aspecto:</strong> Serosa, água de rocha, sanguinolenta, leitosa?</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/50 space-y-2">
            <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
              4. Inflamação / Pele
            </span>
            <ul className="text-xs text-slate-300 space-y-1">
              <li><strong>Gatilhos:</strong> Lactação, trauma, tabagismo?</li>
              <li><strong>Sinais flogísticos:</strong> Calor, rubor, dor, edema?</li>
              <li><strong>Febre:</strong> Sintomas sistêmicos associados?</li>
              <li><strong>Pele:</strong> Casca de laranja, eczema, ulceração?</li>
            </ul>
          </div>
        </div>

        {/* CONTEXTO DA PACIENTE */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Contexto Clínico e Fatores Modificadores:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block">Idade:</strong>
              &lt;30a (fibroadenoma), 35-50a (cistos/alteração fibrocística), &gt;50a (câncer).
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block">Hormônios & Medicamentos:</strong>
              TH, ACO, antidepressivos, neurolépticos, anti-hipertensivos.
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block">História Obstétrica:</strong>
              Paridade, idade do primeiro parto, história de amamentação.
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block">História Familiar:</strong>
              Câncer de mama e ovário em parentes de 1º grau (&lt;50 anos ou bilateral).
            </div>
          </div>
        </div>
      </div>

      {/* 2. EXAME FÍSICO SISTEMÁTICO */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Eye className="text-cyan-400" size={20} />
          Exame Clínico das Mamas: Sistemático e Reproduzível
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase text-cyan-400 block">1. Inspeção Estática</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Paciente sentada com os braços relaxados ao lado do corpo. Avaliar:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Simetria e contorno global das mamas.</li>
              <li>Alterações na coloração cutânea ou abaulamentos visíveis.</li>
              <li>Complexo areolomamilar: nivelamento, simetria e inversão mamilar congênita vs adquirida.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase text-purple-400 block">2. Inspeção Dinâmica</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Realizar 3 manobras para evidenciar retrações ocultas por tração dos ligamentos de Cooper:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li><strong>Braços elevados:</strong> estira o parênquima mamário superior e axila.</li>
              <li><strong>Mãos na cintura com compressão:</strong> contrai os músculos peitorais maiores.</li>
              <li><strong>Inclinação anterior do tronco:</strong> evidencia assimetrias em mamas pêndulas.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase text-emerald-400 block">3. Palpação Sistemática</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Realizada com a paciente em decúbito dorsal (mão homolateral sob a nuca):
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Polpas digitais dos 2º, 3º e 4º dedos contra a parede torácica.</li>
              <li>Movimentos em raios de roda (centrífugos) ou faixas verticais paralelas.</li>
              <li>Cobrir toda a glândula, cauda axilar e região retroareolar.</li>
              <li><strong>Expressão papilar:</strong> suave e delicada, apenas quando há queixa de descarga.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. SINAIS DE ALERTA (RED FLAGS) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-rose-900/60 space-y-4">
        <div className="flex items-center gap-2 text-rose-400">
          <ShieldAlert size={22} />
          <h4 className="text-base font-black uppercase tracking-wider text-white">
            Sinais de Alerta que Interrompem a Hipótese de "Apenas Benigno"
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          A presença de qualquer um dos achados abaixo exige investigação histológica ou de imagem de alta complexidade imediata:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              id: 'massa_dura',
              title: 'Massa Dura, Irregular ou Fixa',
              desc: 'Nódulo de consistência pétrea, margens indistintas/espiculadas ou aderido ao peitoral ou à pele.',
              color: 'border-rose-700 bg-rose-950/40 text-rose-300'
            },
            {
              id: 'retracao',
              title: 'Retração Cutânea ou do Mamilo',
              desc: 'Covinha na pele (dimpling) ou inversão/retração mamilar recente e unilateral.',
              color: 'border-rose-700 bg-rose-950/40 text-rose-300'
            },
            {
              id: 'eczema',
              title: 'Eczema / Crosta no Mamilo',
              desc: 'Lesão descamativa, eritematosa ou ulcerada no mamilo que não responde a corticoide tópico (Doença de Paget).',
              color: 'border-rose-700 bg-rose-950/40 text-rose-300'
            },
            {
              id: 'descarga_suspeita',
              title: 'Descarga Papilar Suspeita',
              desc: 'Secreção espontânea, unilateral, uniductal, sanguinolenta (em água de carne) ou serosa pura (água de rocha).',
              color: 'border-rose-700 bg-rose-950/40 text-rose-300'
            },
            {
              id: 'linfonodo',
              title: 'Linfonodo Axilar Suspeito',
              desc: 'Linfonodo endurecido, indolor, volumoso, fixo ou fusionado em conglomerado na axila ou supraclavicular.',
              color: 'border-rose-700 bg-rose-950/40 text-rose-300'
            },
            {
              id: 'inflamacao_refrataria',
              title: 'Inflamação sem Resposta',
              desc: 'Mastite com eritema difuso e aspecto em casca de laranja que não melhora após 7 a 10 dias de antibiótico (Carcinoma Inflamatório).',
              color: 'border-rose-700 bg-rose-950/40 text-rose-300'
            }
          ].map(flag => (
            <div
              key={flag.id}
              className={`p-4 rounded-2xl border space-y-1.5 ${flag.color}`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <AlertTriangle size={15} />
                <span>{flag.title}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {flag.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-xs text-rose-200 leading-relaxed font-medium">
          🚨 <strong>Regra Fundamental da Aula:</strong> <em>"A suspeita clínica persiste mesmo diante de exame de imagem inicialmente negativo."</em> Se o exame físico palpa uma massa endurecida e fixa, mas a mamografia é densa e normal, a investigação NÃO pode ser encerrada — deve-se prosseguir com USG, RM ou biópsia!
        </div>
      </div>
    </div>
  );
}
