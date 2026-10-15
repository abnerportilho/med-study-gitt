import React, { useState } from 'react';
import { 
  Sparkles, Pill, Activity, ShieldCheck, Heart, 
  CheckCircle2, AlertTriangle, ChevronRight, Zap
} from 'lucide-react';

export default function UroTratamentoConservadorFarmaco() {
  const [activeTab, setActiveTab] = useState<'conservador' | 'farmacologico'>('conservador');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
              Eixo 4 • Abordagem Não Cirúrgica
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Tratamento Conservador & Farmacológico
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Primeira linha obrigatória para distopias e incontinência: Terapia Comportamental, Fisioterapia Pélvica (TMAP), Biofeedback, Eletroestimulação, Cones Vaginais, Estrogênio Tópico e Terapêutica Farmacológica Específica.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300 self-start md:self-auto">
            1ª Linha Terapêutica
          </div>
        </div>

        {/* NAVEGAÇÃO ENTRE ABAS */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('conservador')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'conservador'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            1. Tratamento Conservador & Fisioterapia (TMAP)
          </button>
          <button
            onClick={() => setActiveTab('farmacologico')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'farmacologico'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            2. Tratamento Farmacológico (Estrogênios, Anticolinérgicos & Beta-3)
          </button>
        </div>
      </div>

      {/* 1. TRATAMENTO CONSERVADOR */}
      {activeTab === 'conservador' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="text-cyan-400" size={20} />
              Arsenal Conservador: Do Estilo de Vida à Reabilitação Pélvica
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              O manejo conservador deve ser sempre oferecido antes ou em conjunto com abordagens cirúrgicas. Apresenta excelente taxa de sucesso clínico em graus leves a moderados sem nenhum risco operatório:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* TERAPIA COMPORTAMENTAL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Activity size={16} />
                  Terapia Comportamental
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong>Perda Ponderal:</strong> Em pacientes obesas (como no caso com IMC 38), a redução de 5 a 10% do peso corporal reduz os episódios de perda urinária em até 50%!</li>
                  <li>• <strong>Modificação Dietética:</strong> Redução drástica de cafeína, álcool, refrigerantes e adoçantes artificiais (irritantes do detrusor).</li>
                  <li>• <strong>Cessação do Tabagismo:</strong> Elimina a tosse crônica que agride os ligamentos pélvicos.</li>
                  <li>• <strong>Combate à Constipação:</strong> Aumento de fibras e água para evitar esforço evacuatório crônico.</li>
                </ul>
              </div>

              {/* TMAP / KEGEL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck size={16} />
                  Fisioterapia Pélvica (TMAP / Kegel)
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong>Padrão-Ouro não invasivo:</strong> Treinamento dos Músculos do Assoalho Pélvico supervisionado por fisioterapeuta pélvica.</li>
                  <li>• <strong>Protocolo:</strong> Séries diárias de contrações sustentadas (fibras tipo I de tônus) e contrações rápidas (fibras tipo II para tosse).</li>
                  <li>• Melhora a sustentação da fáscia pubocervical e a continência em até 70% das pacientes comprometidas com os exercícios.</li>
                </ul>
              </div>

              {/* BIOFEEDBACK */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Zap size={16} />
                  Biofeedback Eletromiográfico
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• Monitorização visual em tela ou auditiva da contração dos músculos levantadores do ânus.</li>
                  <li>• <strong>Objetivo essencial:</strong> Ensinar a paciente a isolar a musculatura perineal, evitando o erro comum de contrair glúteos ou realizar Valsalva paradoxal que piora o prolapso.</li>
                </ul>
              </div>

              {/* ELETROESTIMULAÇÃO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Zap size={16} />
                  Eletroestimulação Perineal
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• Eletrodo intracavitário vaginal que emite impulsos elétricos de baixa frequência (10 a 50 Hz).</li>
                  <li>• <strong>Na IUE:</strong> Estimula a contração passiva dos músculos estriados periuretrais.</li>
                  <li>• <strong>Na Urgência:</strong> Estimula os aferentes do nervo pudendo, inibindo reflexamente as contrações do detrusor mediadas pelo parassimpático sacral.</li>
                </ul>
              </div>

              {/* CONES VAGINAIS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <Heart size={16} />
                  Cones Vaginais
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• Conjunto de pesos anatômicos crescentes (ex: 20g, 35g, 50g, 70g) inseridos na vagina.</li>
                  <li>• A paciente deambula por 15 minutos retendo o cone por contração proprioceptiva reflexa do assoalho pélvico.</li>
                  <li>• Excelente ferramenta para treino domiciliar progressivo.</li>
                </ul>
              </div>

              {/* PESSÁRIOS GINECOLÓGICOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                  <ShieldCheck size={16} />
                  Pessários Vaginais
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• Dispositivos de silicone (anel, cubo, Gellhorn) que reduzem mecanicamente o prolapso.</li>
                  <li>• <strong>Indicações:</strong> Pacientes com risco cirúrgico proibitivo, idosas frágeis, desejo de gravidez futura ou alívio temporário enquanto aguardam cirurgia.</li>
                  <li>• Exigem acompanhamento regular e uso concomitante de estrogênio tópico para prevenir erosão mucosa.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TRATAMENTO FARMACOLÓGICO */}
      {activeTab === 'farmacologico' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Pill className="text-cyan-400" size={20} />
              Tratamento Farmacológico (Apresentação Prof. André Bernardo)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              O tratamento medicamentoso atua no epitélio, na vascularização submucosa uretral e na inervação autônoma da bexiga (receptores muscarínicos e adrenérgicos):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* ESTROGÊNIOS TÓPICOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">Estrogênios Vaginais Tópicos</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Estriol / Promestrieno
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    O hipoestrogenismo na menopausa reduz o colágeno e a espessura da mucosa uretral.
                  </p>
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Mecanismo:</strong> Aumenta a espessura do epitélio uretral, eleva a vascularização do coxim submucoso periuretral e restaura o pH e a flora de lactobacilos.
                  </p>
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Efeito clínico:</strong> Melhora a pressão de fechamento uretral, reduz a atrofia genital e diminui ITUs de repetição. Não tem ação sobre grandes prolapsos estruturais.
                  </p>
                </div>
              </div>

              {/* ANTICOLINÉRGICOS / ANTIMUSCARÍNICOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">Anticolinérgicos (Antimuscarínicos)</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Padrão Bexiga Hiperativa
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    <strong>Fármacos:</strong> Oxibutinina (5 a 15 mg/dia), Tolterodina (4 mg/dia), Solifenacina (5 a 10 mg/dia).
                  </p>
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Mecanismo:</strong> Bloqueiam receptores M2 e M3 no detrusor, abolindo as contrações involuntárias não inibidas durante a fase de enchimento vesical.
                  </p>
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-300">
                    • <strong>Efeitos Colaterais:</strong> Boca seca, constipação intestinal, visão turva e risco de declínio cognitivo em idosas frágeis.
                  </p>
                </div>
              </div>

              {/* AGONISTAS BETA-3 ADRENÉRGICOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300 text-sm">Agonistas Beta-3 (Mirabegrona)</span>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800">
                    Mirabegrona 50 mg/dia
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Mecanismo Inovador:</strong> Estimula seletivamente os receptores beta-3 adrenérgicos do detrusor, promovendo relaxamento ativo e aumento da capacidade vesical durante o enchimento.
                  </p>
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300">
                    • <strong>Grande Vantagem:</strong> Eficácia idêntica aos anticolinérgicos SEM causar boca seca ou constipação!
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    *Cautela: monitorar PA (evitar em hipertensão estágio 3 não controlada).
                  </p>
                </div>
              </div>

              {/* ANTIDEPRESSIVOS TRICÍCLICOS & DULOXETINA */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Tricíclicos & Inibidores de Recaptação</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Imipramina 75 mg/dia
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Imipramina (25 a 75 mg/dia):</strong> Efeito duplo fascinante: ação anticolinérgica central relaxando o detrusor + estímulo alfa-adrenérgico contraindo o colo vesical. Muito útil na incontinência mista ou noctúria.
                  </p>
                  <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Duloxetina (Inibidor de recaptação de Serotonina e Noradrenalina):</strong> Aumenta a estimulação do núcleo de Onuf no corno anterior sacral, elevando o tônus do esfíncter estriado uretral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
