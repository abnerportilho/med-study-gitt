import React, { useState } from 'react';
import { 
  Sparkles, Pill, ShieldCheck, Zap, Heart, 
  AlertTriangle, CheckCircle2, Activity, Info, ChevronRight
} from 'lucide-react';

export default function UroIncontinenciaClinico() {
  const [activeTab, setActiveTab] = useState<'fisioterapia' | 'farmacos'>('fisioterapia');

  return (
    <div className="space-y-6">
      {/* HEADER DO SUBMÓDULO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <span className="p-1 rounded-md bg-cyan-950 border border-cyan-800">
                <Sparkles size={14} />
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                Tratamento Clínico da Incontinência
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white">
              TMAP, Fisioterapia Pélvica & Farmacoterapia
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Primeira linha obrigatória para incontinência de esforço e bexiga hiperativa: Treinamento muscular (Kegel), biofeedback, eletroestimulação, antimuscarínicos, agonistas beta-3 (Mirabegrona) e estrogenioterapia local.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300 self-start md:self-auto">
            1ª Linha Terapêutica
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('fisioterapia')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'fisioterapia'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            1. TMAP, Biofeedback & Fisioterapia Pélvica
          </button>
          <button
            onClick={() => setActiveTab('farmacos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'farmacos'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            2. Farmacoterapia: Anticolinérgicos & Beta-3 Adrenérgicos
          </button>
        </div>
      </div>

      {/* ABA 1: FISIOTERAPIA E TMAP */}
      {activeTab === 'fisioterapia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="text-cyan-400" size={20} />
              Reabilitação do Assoalho Pélvico
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* TMAP */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Activity size={16} />
                  TMAP (Kegel)
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  • <strong>Padrão-ouro conservador:</strong> Séries estruturadas de contrações rápidas (reforço do esfíncter estriado contra picos pressóricos de tosse) e contrações tônicas sustentadas (suporte contínuo dos levantadores do ânus).
                  <br />• Eficaz em até 70% dos casos de IUE leve a moderada.
                </p>
              </div>

              {/* BIOFEEDBACK */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Zap size={16} />
                  Biofeedback EMG
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  • Sensores eletromiográficos transvaginais traduzem a força muscular em gráficos na tela ou sinais sonoros em tempo real.
                  <br />• <strong>Alvo primordial:</strong> Previne a contração paradoxal dos glúteos e da parede abdominal (que agravaria a perda urinária).
                </p>
              </div>

              {/* ELETROESTIMULAÇÃO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Zap size={16} />
                  Eletroestimulação
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  • Correntes de baixa frequência que produzem contrações involuntárias da musculatura perineal.
                  <br />• <strong>Na Bexiga Hiperativa:</strong> A estimulação dos aferentes pudendos induz reflexo inibitório sacral contra as contrações involuntárias do detrusor.
                </p>
              </div>

              {/* CONES VAGINAIS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <Heart size={16} />
                  Cones Vaginais
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  • Dispositivos de peso calibrado progressivo (20g a 70g). A paciente insere o cone e caminha por 15 minutos tentando mantê-lo sem cair através de contrações reflexas contínuas.
                </p>
              </div>
            </div>

            {/* MUDANÇA DE ESTILO DE VIDA */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
                Medidas Comportamentais Sinérgicas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div>• <strong>Emagrecimento:</strong> Redução de 5-10% do peso reduz perdas pela metade.</div>
                <div>• <strong>Moderação de Cafeína:</strong> Café, chá preto e refrigerantes irritam o detrusor.</div>
                <div>• <strong>Treino Vesical:</strong> Micções programadas por horários para reeducar o ciclo de repleção.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: FARMACOTERAPIA */}
      {activeTab === 'farmacos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
              <Pill className="text-cyan-400" size={20} />
              Arsenal Farmacológico na Incontinência & Bexiga Hiperativa
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* ANTICOLINÉRGICOS / ANTIMUSCARÍNICOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">Antimuscarínicos (Anticolinérgicos)</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Receptores M2 / M3
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Mecanismo de ação:</strong> Bloqueiam os receptores muscarínicos M2 e M3 no músculo detrusor vesical, impedindo contrações parassimpáticas anormais disparadas pela acetilcolina.</p>
                  
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-white block">Principais Fármacos:</strong>
                    <p>• <strong>Oxibutinina:</strong> 5 mg VO 2 a 3x/dia (ou formulação de liberação lenta 10 mg/dia). Muito eficaz e disponível no SUS, porém com taxa elevada de boca seca e constipação.</p>
                    <p>• <strong>Tolterodina:</strong> 2 a 4 mg/dia. Maior seletividade vesical.</p>
                    <p>• <strong>Solifenacina:</strong> 5 a 10 mg/dia. Alta afinidade pelos receptores M3 detrusores, melhor perfil de tolerância.</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 font-semibold">
                    ⚠️ Contraindicação Absoluta de Prova: <strong>Glaucoma de Ângulo Fechado</strong> e retenção gástrica/obstrução infravesical!
                  </div>
                </div>
              </div>

              {/* AGONISTA BETA-3 ADRENÉRGICO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 text-sm">Agonista Beta-3 Adrenérgico</span>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800">
                    Mirabegrona (25-50 mg)
                  </span>
                </div>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>Mecanismo de ação:</strong> Estimula os receptores beta-3 adrenérgicos da parede vesical, promovendo o relaxamento ativo do detrusor durante a fase de enchimento, aumentando a capacidade vesical funcional.</p>
                  
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-white block">Vantagem Revolucionária:</strong>
                    <p>• <strong>NÃO causa boca seca, obstipação intestinal grave nem borramento visual</strong>, pois não bloqueia vias colinérgicas.</p>
                    <p>• Excelente opção para idosos com risco de declínio cognitivo associado aos anticolinérgicos.</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-amber-300 font-semibold">
                    ⚠️ Alerta Clínico: Monitorar a pressão arterial (contraindicada em Hipertensão Arterial Grave não controlada: PAS ≥ 180 ou PAD ≥ 110 mmHg).
                  </div>
                </div>
              </div>

              {/* ESTROGÊNIO TÓPICO */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="font-bold text-purple-300 text-sm block">Estrogênio Tópico Vaginal</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  • <strong>Promestrieno creme ou Estriol vaginal</strong> (2 a 3x por semana).
                  <br />• <strong>Mecanismo:</strong> Na pós-menopausa, a atrofia urogenital reduz a vascularização do plexo submucoso periuretral e fragiliza os receptores alfa-adrenérgicos do colo vesical. A estrogenização restaura o trofismo da mucosa, melhora a coaptação das paredes uretrais e diminui a urgência e as ITUs de repetição.
                </p>
              </div>

              {/* MODULADORES DO TÔNUS URETRAL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="font-bold text-blue-300 text-sm block">Moduladores Adrenérgicos / Serotoninérgicos</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  • <strong>Imipramina:</strong> Antidepressivo tricíclico com duplo efeito (bloqueio anticolinérgico no detrusor + estímulo alfa-adrenérgico no colo vesical). Útil na enurese noturna e incontinência mista.
                  <br />• <strong>Duloxetina:</strong> Inibidor da recaptação de serotonina e noradrenalina que reforça o tônus do esfíncter uretral estriado (núcleo de Onuf).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
