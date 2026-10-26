import React, { useState } from 'react';
import { 
  Stethoscope, AlertCircle, Heart, CheckCircle2, 
  HelpCircle, Eye, ShieldAlert, Sparkles, UserCheck, Activity, Zap
} from 'lucide-react';

export default function EndoQuadroClinicoExame() {
  const [selectedSymptom, setSelectedSymptom] = useState<string>('dismenorreia');

  const SYMPTOMS_6D = [
    {
      id: 'dismenorreia',
      title: '1. Dismenorreia Secundária Progressiva',
      subtitle: 'Dor menstrual que piora ao longo dos anos',
      description: 'Diferente da dismenorreia primária (que melhora com a idade e responde prontamente a AINEs), a dismenorreia da endometriose é progressiva, inicia dias antes do fluxo, intensifica-se com os anos e frequentemente torna-se refratária a analgésicos usuais.',
      impact: 'Principal motivo de absenteísmo escolar e laboral em mulheres jovens.',
      tag: 'Mais Frequente'
    },
    {
      id: 'dor_cronica',
      title: '2. Dor Pélvica Crônica',
      subtitle: 'Dor contínua com duração ≥ 6 meses',
      description: 'Dor em baixo ventre não restrita ao período menstrual. Decorre da sensibilização neural central e periférica, inflamação contínua e aprisionamento de fibras nervosas em placas fibróticas.',
      impact: 'Associa-se a fadiga crônica, distúrbios do sono, ansiedade e depressão.',
      tag: 'Sensibilização Central'
    },
    {
      id: 'dispareunia',
      title: '3. Dispareunia de Profundidade',
      subtitle: 'Dor durante ou após a relação sexual com penetração profunda',
      description: 'Dor sentida no "fundo da vagina" ou na pelve profunda durante o coito, provocada pelo choque do pênis contra os ligamentos uterossacros espessados, toro uterino ou fundo de saco de Douglas acometido.',
      impact: 'Gera evitação do ato sexual, disfunção sexual secundária e sofrimento conjugal.',
      tag: 'Compartimento Posterior'
    },
    {
      id: 'disquezia',
      title: '4. Disquezia Cíclica',
      subtitle: 'Dor, tenesmo ou esforço doloroso ao evacuar no período menstrual',
      description: 'Dor intensa à passagem das fezes pelo reto durante o período menstrual (perimenstrual), podendo acompanhar-se de constipação cíclica, diarreia catamenial ou enterorragia cíclica em casos de infiltração transmural da mucosa retal.',
      impact: 'Forte marcador de endometriose profunda acometendo o septo retovaginal e retossigmoide.',
      tag: 'Acometimento Intestinal'
    },
    {
      id: 'disuria',
      title: '5. Disúria / Hematúria Cíclica',
      subtitle: 'Sintomas urinários baixos que pioram na menstruação',
      description: 'Polaciúria, urgência miccional e dor retro-púbica ao encher ou esvaziar a bexiga no período menstrual. A hematúria macroscópica cíclica é rara, ocorrendo apenas quando a lesão ultrapassa o músculo detrusor e atinge o urotélio.',
      impact: 'Alerta clínico para endometriose de bexiga ou compressão ureteral silenciosa.',
      tag: 'Trato Urinário'
    },
    {
      id: 'infertilidade',
      title: '6. Dificuldade para Engravidar (Infertilidade)',
      subtitle: 'Incapacidade de conceber após 12 meses de relações desprotegidas',
      description: 'Acomete 30% a 50% das mulheres com endometriose. Resulta da combinação de distorção anatômica das tubas, líquido peritoneal tóxico, estresse oxidativo, menor qualidade dos óvulos e alteração na receptividade endometrial.',
      impact: 'Muitas pacientes são assintomáticas para dor e descobrem a doença apenas na avaliação da infertilidade.',
      tag: 'Reprodutivo'
    }
  ];

  return (
    <div className="space-y-8">
      {/* HEADER DO EIXO 3 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Stethoscope size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 3 · Semiologia, Quadro Clínico & Exame Físico
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              3. Da Anamnese Estruturada ao Exame Físico Especializado
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A suspeita clínica é a <strong>chave mestre</strong> para quebrar o atraso diagnóstico de uma década. <em>"A dor cíclica é uma pista clássica — não uma regra universal."</em> Muitas pacientes evoluem para dor contínua diária por sensibilização do sistema nervoso central.
        </p>
      </div>

      {/* OS 6 D's DA ENDOMETRIOSE — INTERATIVO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400">
            <Activity size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Os "6 D's" da Endometriose (Sintomas Cardinais)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-800">
            Clique no Sintoma
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {SYMPTOMS_6D.map(s => {
            const isSelected = selectedSymptom === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSymptom(s.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-rose-950/80 border-rose-500 text-white shadow-lg ring-2 ring-rose-500/20' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-rose-900 text-rose-200' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {s.tag}
                  </span>
                  <div className="font-black text-xs leading-tight line-clamp-2 mt-1">
                    {s.title.split('. ')[1]}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">
                  {isSelected ? '● Selecionado' : '○ Ver detalhes'}
                </div>
              </button>
            );
          })}
        </div>

        {/* DETALHE DO SINTOMA SELECIONADO */}
        {(() => {
          const item = SYMPTOMS_6D.find(s => s.id === selectedSymptom) || SYMPTOMS_6D[0];
          return (
            <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h5 className="text-base font-black text-white">{item.title}</h5>
                  <p className="text-xs text-rose-300 font-medium">{item.subtitle}</p>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 self-start sm:self-auto">
                  {item.tag}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <strong className="text-slate-200 block font-bold">Fisiopatologia & Mecanismo Clínico:</strong>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <strong className="text-amber-400 block font-bold">Impacto Clínico & Qualidade de Vida:</strong>
                  <p className="text-slate-300 text-xs leading-relaxed">{item.impact}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* AS 5 PERGUNTAS MANDATÓRIAS DA ANAMNESE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
          <UserCheck size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Roteiro da Consulta: A Anamnese Deve Seguir a Dor ao Longo do Ciclo
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider block bg-rose-950 px-2 py-0.5 rounded w-fit">
              1. QUANDO?
            </span>
            <strong className="text-white block font-bold">Cronologia & Ciclicidade</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Idade na menarca, início da dor (adolescência?), duração dos episódios e relação temporal com a fase pré, peri ou pós-menstrual.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider block bg-cyan-950 px-2 py-0.5 rounded w-fit">
              2. ONDE?
            </span>
            <strong className="text-white block font-bold">Topografia da Dor</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Fossa ilíaca/baixo ventre, fundo da vagina na penetração profunda, dor ao evacuar (reto) ou ao urinar (bexiga), irradiação para região lombar/coxa.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block bg-amber-950 px-2 py-0.5 rounded w-fit">
              3. QUANTO?
            </span>
            <strong className="text-white block font-bold">Intensidade & Limitação</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Escala Visual Analógica (EVA 0 a 10), necessidade de atendimento em pronto-socorro, uso crônico de opioides e absenteísmo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider block bg-purple-950 px-2 py-0.5 rounded w-fit">
              4. O QUE MUDA?
            </span>
            <strong className="text-white block font-bold">Impacto Biopsicossocial</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Prejuízo no trabalho e estudos, restrição do sono, humor, vida afetiva conjugal e sexualidade.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block bg-emerald-950 px-2 py-0.5 rounded w-fit">
              5. REPRODUÇÃO
            </span>
            <strong className="text-white block font-bold">Desejo Gestacional</strong>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Desejo de gestação imediata vs futuro, tempo de tentativas desprotegidas, perdas prévias e reserva ovariana basal.
            </p>
          </div>
        </div>
      </div>

      {/* EXAME FÍSICO DIRECIONADO & SINAIS SEMIOLÓGICOS */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Stethoscope size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Exame Físico Ginecológico: Procurar Dor, Nódulos e Perda de Mobilidade
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
            Toque Retovaginal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">Manobras Semiológicas Essenciais:</h5>
            <ul className="space-y-2.5 text-slate-300">
              <li className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-rose-400 block">• Exame Especular Cuidadoso:</strong>
                <span>Inspeção do fundo de saco vaginal posterior à procura de lesões nodulares violáceas, azuladas ou hemorrágicas que sangram ao toque.</span>
              </li>
              <li className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-amber-400 block">• Toque Vaginal Bimanual:</strong>
                <span>Avaliação do colo uterino (dor intensa à lateralização/mobilização), posição do corpo uterino (útero fixo e doloroso em retroversoflexão) e palpação de massas anexiais (endometriomas aderidos).</span>
              </li>
              <li className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-purple-400 block">• Toque Retovaginal (Mandatório na Suspeita Profunda):</strong>
                <span>Com o dedo indicador na vagina e o dedo médio no reto, pinça-se o septo retovaginal e os ligamentos uterossacros para palpar nodularidades em "grão de feijão", espessamentos rígidos e invasão retal.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 block border-b border-slate-800 pb-2">
                Achados Típicos no Exame Físico
              </span>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Dor à mobilização e lateralização do colo uterino</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Útero retrovertido e com mobilidade restrita ou imóvel ("congelado")</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Espessamento doloroso ou nodular dos ligamentos uterossacros</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Nódulo palpável no fundo de saco posterior / septo retovaginal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Massa anexial cística dolorosa e pouco móvel (Endometrioma)</span>
                </div>
              </div>
            </div>

            {/* AXIOMA DE OURO */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-500 space-y-1.5 shadow-lg">
              <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase">
                <ShieldAlert size={18} className="fill-rose-400 text-slate-950" />
                <span>AXIOMA FUNDAMENTAL</span>
              </div>
              <p className="text-xs text-white font-bold leading-relaxed">
                "O exame físico ginecológico completamente NORMAL NÃO exclui endometriose."
              </p>
              <p className="text-[11px] text-slate-300">
                Lesões peritoneais superficiais iniciais e endometriomas iniciais não geram nodularidade palpável, exigindo continuidade da investigação se houver suspeita clínica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
