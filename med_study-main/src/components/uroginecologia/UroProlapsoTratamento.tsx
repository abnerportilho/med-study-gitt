import React, { useState } from 'react';
import { 
  Layers, ShieldCheck, Heart, AlertTriangle, CheckCircle2, 
  HelpCircle, Sparkles, Scissors, Info, ChevronRight, Activity
} from 'lucide-react';

export default function UroProlapsoTratamento() {
  const [activeTab, setActiveTab] = useState<'conservador' | 'cirurgico' | 'telas_seguranca'>('conservador');

  return (
    <div className="space-y-6">
      {/* HEADER DO SUBMÓDULO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <span className="p-1 rounded-md bg-amber-950 border border-amber-800">
                <Layers size={14} />
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                Tratamento das Distopias Genitais
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Pessários Vaginais & Cirurgia Sítio-Específica
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Manejo das distopias pélvicas baseado no estadiamento POP-Q, desejo reprodutivo e comorbidades: Terapia não invasiva com pessários vaginais e reconstruções anatômicas sítio-específicas de DeLancey I, II e III.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800 text-xs font-bold text-amber-300 self-start md:self-auto">
            Abordagem por Compartimentos
          </div>
        </div>

        {/* NAVEGAÇÃO INTERNA */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('conservador')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'conservador'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            1. Pessários Vaginais & Medidas Conservadoras
          </button>
          <button
            onClick={() => setActiveTab('cirurgico')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'cirurgico'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            2. Cirurgias Sítio-Específicas (Níveis I, II e III)
          </button>
          <button
            onClick={() => setActiveTab('telas_seguranca')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'telas_seguranca'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            3. Telas Vaginais: Alerta FDA & Erosões
          </button>
        </div>
      </div>

      {/* ABA 1: PESSÁRIOS E CONSERVADOR */}
      {activeTab === 'conservador' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="text-amber-400" size={20} />
              Tratamento Conservador com Pessários Vaginais
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Os pessários são dispositivos de silicone flexível inseridos na vagina para reposicionar os órgãos prolapsados. São considerados <strong>primeira linha para pacientes que recusam cirurgia</strong>, com alto risco cirúrgico cardiovascular, ou que ainda planejam gestação futura.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* PESSÁRIO DE ANEL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">Pessário de Anel (Ring)</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Suporte
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Mecanismo:</strong> Apoia-se na sínfise púbica e no fundo de saco posterior da vagina.</p>
                  <p>• <strong>Indicação:</strong> Prolapsos estádio I e II, com hiato genital e tônus perineal razoavelmente preservados.</p>
                  <p>• <strong>Vantagem máxima:</strong> Permite manter <strong>vida sexual ativa</strong> sem necessidade de remoção a cada relação (embora possa ser retirado e colocado pela própria paciente).</p>
                </div>
              </div>

              {/* PESSÁRIO DE GELLHORN */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">Pessário de Gellhorn</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Preenchimento Espacial
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Mecanismo:</strong> Formato de "cogumelo" com haste que cria sucção negativa no fundo vaginal.</p>
                  <p>• <strong>Indicação:</strong> Prolapsos graves (Estádios III e IV / Procidência genital completa) com rotura perineal acentuada.</p>
                  <p>• <strong>Característica:</strong> <strong>Impede o coito</strong> enquanto posicionado; exige remoção periódica pelo ginecologista ou paciente treinada.</p>
                </div>
              </div>

              {/* PESSÁRIO CÚBICO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Pessário Cúbico (Cube)</span>
                  <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800">
                    Sucção Vácuo
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Mecanismo:</strong> 6 faces côncavas que aderem às paredes vaginais por sucção de vácuo.</p>
                  <p>• <strong>Indicação:</strong> Pacientes sem tônus muscular algum onde o anel é expulso espontaneamente.</p>
                  <p>• <strong>Atenção:</strong> Deve ser retirado <em>todas as noites</em> pela paciente para lavar, sob risco severo de ulceração se mantido continuamente.</p>
                </div>
              </div>
            </div>

            {/* PROTOCOLO DE SEGUIMENTO E ESTROGÊNIO */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-3 text-xs">
              <h4 className="font-bold text-amber-300 flex items-center gap-2 text-sm">
                <Sparkles size={16} />
                Regras Fundamentais de Manejo dos Pessários
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block mb-1">1. Teste de Ajuste e Expulsão:</strong>
                  Após colocar o pessário, pede-se para a paciente tossir vigorosamente, andar e sentar-se no vaso sanitário. Se o pessário cair ou gerar dor aguda, o tamanho está inadequado.
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block mb-1">2. Estrogenização Tópica Obrigatória:</strong>
                  Em pacientes na pós-menopausa, prescrever <strong>Promestrieno creme ou Estriol vaginal</strong> 2 a 3x por semana para espessar o epitélio vaginal e prevenir úlceras de pressão e infecções.
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-white block mb-1">3. Calendário de Revisão:</strong>
                  Retorno em 2 semanas para inspecionar a mucosa vaginal à procura de erosões. Após estabilizado, revisões clínicas a cada 3 a 6 meses.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: CIRURGIAS SÍTIO-ESPECÍFICAS */}
      {activeTab === 'cirurgico' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Scissors className="text-amber-400" size={20} />
              Cirurgias Reconstrutivas Sítio-Específicas (DeLancey)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              O princípio moderno da uroginecologia cirúrgica é <strong>reconstruir a anatomia funcional sítio-específica</strong> sem reduzir o comprimento vaginal nem criar estenoses:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* NÍVEL I - APICAL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Nível I: Compartimento Apical</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Cúpula / Colo
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Sacrocolpopexia (Padrão-Ouro):</strong>
                    Fixação da cúpula vaginal ao promontório sacral (S1) com tela sintética tipo I de polipropileno macroporoso, preferencialmente por via laparoscópica. É o procedimento com <strong>maior taxa de cura duradoura</strong> e menor recidiva apical.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Fixação Sacroespinhosa de Richter:</strong>
                    Acesso vaginal, fixando a cúpula vaginal (ou ligamento cardeal) ao ligamento sacroespinhoso direito. Ideal em idosas ou quando o abdômen hostil contraindica a via laparotômica.
                  </div>
                </div>
              </div>

              {/* NÍVEL II - ANTERIOR */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">Nível II: Compartimento Anterior</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Cistocele
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Colpoplastia Anterior Sítio-Específica:</strong>
                    Exige diferenciar o defeito:
                    <br />• <strong>Defeito Central:</strong> Fáscia pubocervical rompida na linha média → Plicatura fascial longitudinal na linha média.
                    <br />• <strong>Defeito Paravaginal:</strong> Desinserção lateral do Arco Tendíneo da Fáscia Pélvica (ATFP) → Reinserção da fáscia na parede pélvica lateral.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Histerectomia Vaginal Associada:</strong>
                    Reservada para casos com procidência uterina avançada coexistente ou doença uterina concomitante.
                  </div>
                </div>
              </div>

              {/* NÍVEL III - POSTERIOR & PERÍNEO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">Nível III: Posterior & Períneo</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    Retocele & Rotura
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Colpoperineoplastia Posterior:</strong>
                    Dissecção e plicatura do septo retovaginal sobre a parede anterior do reto, corrigindo a retocele.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block">Reconstituição do Corpo Perineal:</strong>
                    Miorrafia dos músculos bulbocavernosos e transversos superficiais do períneo. Restaura a espessura do corpo perineal (pb) e fecha o hiato genital alargado (gh).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: TELAS VAGINAIS E SEGURANÇA */}
      {activeTab === 'telas_seguranca' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-rose-400 flex items-center gap-2">
              <AlertTriangle className="text-rose-400" size={20} />
              Segurança das Telas Vaginais (FDA Alert) vs. Slings
            </h3>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/80 text-xs space-y-2 text-rose-200 leading-relaxed">
              <p>
                <strong>Diferença Crítica que Cai em Provas:</strong>
                Em 2019, o <strong>FDA suspendeu a venda de kits de telas sintéticas transvaginais para reparo de prolapso de órgãos pélvicos (POP)</strong> devido ao risco inaceitável de erosão vaginal, extrusão, dor pélvica crônica e dispareunia incapacitante.
              </p>
              <p>
                <strong>Contudo:</strong> Essa proibição <em>NÃO SE APLICA</em> aos <strong>Slings de uretra média (TVT e TOT)</strong> para incontinência urinária de esforço nem à <strong>Sacrocolpopexia por via abdominal/laparoscópica</strong>! Slings e Sacrocolpopexias continuam sendo procedimentos seguros e aprovados internacionalmente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-300 block">Telas Vaginais para Prolapso (POP transvaginal)</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  • <strong>Status:</strong> Proscritas/restritas pela maioria das sociedades internacionais.
                  <br />• <strong>Mecanismo de dano:</strong> Grande área de superfície de polipropileno em contato com a mucosa vaginal delgada colonizada por bactérias → contração da tela, extrusão e fístula.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
                <span className="font-bold text-emerald-400 block">Slings de Uretra Média e Sacrocolpopexia</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  • <strong>Status:</strong> Padrão-ouro absoluto mantido.
                  <br />• <strong>Mecanismo:</strong> Fita estreita (1,1 cm) sem tensão suburetral no caso do sling; ou tela fixada no peritônio retroperitoneal longe da luz vaginal no caso da sacrocolpopexia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
