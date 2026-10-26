import React from 'react';
import { 
  Activity, 
  Droplet, 
  Zap, 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  ClipboardList, 
  Search, 
  AlertCircle, 
  Pill, 
  Heart, 
  Globe,
  Layers,
  Sparkles,
  Flame,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

const CAUSES = [
  {
    id: 'diabetes',
    title: 'Diabetes Mellitus',
    subtitle: 'Nefropatia Diabética (Causa #1 no Mundo)',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/30',
    badge: '40% dos casos de TRS',
    mechanism: [
      'Hiperglicemia crônica gera produtos finais de glicação avançada (AGEs) e estresse oxidativo.',
      'Hipertensão intraglomerular inicial por vasodilatação da arteríola aferente (aumento de SGLT2 tubular).',
      'Espessamento difuso da membrana basal glomerular e expansão mesangial acentuada (nódulos de Kimmelstiel-Wilson).'
    ],
    progression: [
      'Podocitopatia e perda de carga negativa levam a albuminúria progressiva (A1 → A2 → A3).',
      'A albuminúria maciça induz toxicidade tubular direta, infiltração macrofágica e transição epitélio-mesênquima.',
      'Fibrose tubulointersticial progressiva correlaciona-se mais com a perda de eTFG do que a lesão glomerular.'
    ],
    treatment: [
      'iSGLT2 (Dapagliflozina / Empagliflozina): restaura o feedback tubuloglomerular e despressuriza o glomérulo.',
      'IECA ou BRA em dose máxima tolerada: dilata arteríola eferente e reduz proteinúria.',
      'Finerenona (ARM não-esteroide): bloqueia inflamação e fibrose mediadas por aldosterona.',
      'Agonista de GLP-1 (Semaglutida): proteção cardio-renal e metabólica integrada (estudo FLOW).'
    ]
  },
  {
    id: 'has',
    title: 'Hipertensão Arterial Sistêmica',
    subtitle: 'Nefroesclerose Hipertensiva (Causa #2)',
    icon: Activity,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/5',
    border: 'border-brand-blue/30',
    badge: '30% dos casos de TRS',
    mechanism: [
      'Perda da autorregulação miogênica da arteríola pré-glomerular transmite o regime de alta pressão sistêmica ao capilar.',
      'Barotrauma mecânico crônico provoca lesão endotelial, extravasamento de plasma e hialinose arteriolar.',
      'Isquemia glomerular crônica leva ao colapso de alças capilares e glomeruloesclerose focal/global.'
    ],
    progression: [
      'A isquemia persistente priva a rede capilar peritubular de oxigênio (hipóxia crônica medular).',
      'Fibrose intersticial progressiva com atrofia tubular correspondente.',
      'Proteinúria habitualmente leve a moderada (A1 ou A2); se A3, suspeitar de HAS maligna ou doença associada.'
    ],
    treatment: [
      'Meta pressórica rigorosa: PA Sistólica < 120 mmHg (KDIGO 2024 / SPRINT se tolerado).',
      'IECA ou BRA como primeira linha quando há albuminúria (RAC ≥ 30 mg/g).',
      'Associação com Bloqueador de Canal de Cálcio (Anlodipino) e Diurético Tiazídico-símile (Clortalidona/Indapamida).',
      'Restrição dietética estrita de sódio (< 2g Na/dia ou < 5g sal de cozinha).'
    ]
  },
  {
    id: 'glom',
    title: 'Glomerulopatias Crônicas',
    subtitle: 'Nefropatia por IgA, GEFS, Membranosa',
    icon: ShieldCheck,
    color: 'text-purple-500',
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/30',
    badge: 'Principal causa em jovens',
    mechanism: [
      'Deposição de imunocomplexos circulantes, autoanticorpos dirigidos a antígenos glomerulares (ex: anti-PLA2R) ou ativação do complemento.',
      'Ruptura arquitetural da barreira de filtração (podócitos, membrana basal e endotélio fenestrado).',
      'Apresentação clínica variando de hematúria microscópica isolada a Síndrome Nefrótica / Nefrítica.'
    ],
    progression: [
      'Carga maciça de proteinúria ativa vias pró-inflamatórias tubulares (NF-κB, MCP-1) e cascata do complemento urinário.',
      'Fibrose glomerular irreversível (esclerose) e atrofia tubular precoce.',
      'Risco acelerado de falência renal se proteinúria não for mantida abaixo de 0,5 a 1,0 g/dia.'
    ],
    treatment: [
      'Terapia de suporte máxima: IECA/BRA + iSGLT2 em todos os pacientes proteinúricos.',
      'Imunossupressão etiologia-específica: Corticosteroides, Inibidores de Calcineurina, Micofenolato ou Rituximabe.',
      'Biópsia renal percutânea mandatória para direcionamento histopatológico e índice de cronicidade.',
      'Controle agressivo de dislipidemia e profilaxia anticoagulante em casos selecionados.'
    ]
  },
  {
    id: 'cystic',
    title: 'Doença Renal Policística (DRPAD)',
    subtitle: 'Nefropatia Hereditária Mais Comum',
    icon: Globe,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/30',
    badge: 'Autossômica Dominante (PKD1/2)',
    mechanism: [
      'Mutações nos genes da Policistina 1 ou 2 desregulam o influxo de cálcio ciliar nos túbulos.',
      'Hiperativação da via do AMPc estimula proliferação epitelial desordenada e hipersecreção de fluido cístico.',
      'Cistos múltiplos bilaterais crescem progressivamente comprimindo o parênquima renal funcionante vizinho.'
    ],
    progression: [
      'Isquemia mecânica tecidual induz síntese local de renina (hipertensão arterial precoce e grave).',
      'Ativação de fibroblastos intersticiais resultando em fibrose densa periquística.',
      'Queda acelerada da eTFG em pacientes com Volume Renal Total (TKV) elevado ajustado pela altura.'
    ],
    treatment: [
      'Tolvaptan (Antagonista do receptor V2 da Vasopressina): desacelera taxa de crescimento cístico e perda da eTFG.',
      'Hiper-hidratação orientada (suprimir secreção hipofisária de vasopressina endógena).',
      'Controle rigoroso da PA (< 110/75 mmHg em jovens selecionados sem doença CV avançada).',
      'Restrição estrita de sal e cafeína (reduzir estímulo adrenérgico ao AMPc intracelular).'
    ]
  }
];

export default function CKDPatho() {
  return (
    <div className="flex flex-col gap-10 pb-20 max-w-5xl mx-auto">
      {/* Header com síntese conceitual */}
      <header className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-900/20 via-brand-blue/10 to-transparent border border-line">
        <div className="flex items-center gap-2 text-brand-blue mb-2">
          <span className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
            <Activity size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Fisiopatologia Integrada • Mecanismos & Alvos</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
          Fisiopatologia da Doença Renal Crônica
        </h1>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          Enquanto a <strong>causa inicial</strong> define o mecanismo primário de agressão e as terapias específicas, a <strong>progressão da DRC converge para uma via final comum</strong> de hiperfiltração compensatória, estresse parietal e fibrose tubulointersticial irreversível.
        </p>
      </header>

      {/* 1. VIA FINAL COMUM DE PROGRESSÃO (HIPÓTESE DE BRENNER) */}
      <section id="common-pathway" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Flame size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">A Via Final Comum de Degeneração Renal</h2>
            <p className="text-xs text-ink-muted">A clássica teoria hemodinâmica de Barry Brenner e os motores moleculares da perda renal</p>
          </div>
        </div>

        <div className="card p-6 md:p-8 border border-line bg-card rounded-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "1. Perda Inicial de Néfrons",
                desc: "Agressão primária (DM, HAS, Glomerulopatia) destrói uma fração da população de néfrons funcionais.",
                highlight: "Redução de massa filtrante"
              },
              {
                step: "2. Hiperfiltração Compensatória",
                desc: "Os néfrons remanescentes aumentam o diâmetro da arteríola aferente e elevam a pressão intraglomerular.",
                highlight: "Adaptação a curto prazo prejudicial a longo prazo"
              },
              {
                step: "3. Barotrauma & Proteinúria",
                desc: "O cisalhamento mecânico lesiona podócitos, abrindo os poros da barreira e extravasando albumina aos túbulos.",
                highlight: "Albuminúria é nefrotóxica direta"
              },
              {
                step: "4. Fibrose Tubulointersticial",
                desc: "O epitélio tubular ativa citocinas pró-fibróticas (TGF-β, PDGF, Endotelina-1), gerando tecido cicatricial permanente.",
                highlight: "Destruição do parênquima renal"
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-bg border border-line flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-brand-blue tracking-wider block mb-1">
                    Etapa {i + 1}
                  </span>
                  <h3 className="font-bold text-brand-navy text-sm">{item.step}</h3>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-2 border-t border-line text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 flex items-center gap-3 text-xs text-ink">
            <Info size={20} className="text-brand-blue shrink-0" />
            <span>
              <strong>Implicação Farmacológica Central:</strong> É por isso que <strong>IECA/BRA e iSGLT2</strong> retardam a progressão de <em>qualquer</em> etiologia de DRC: eles diminuem a pressão e o hiperfluxo intraglomerular, quebrando o ciclo vicioso de Brenner.
            </span>
          </div>
        </div>
      </section>

      {/* 2. CAUSAS ESPECÍFICAS: MECANISMOS, PROGRESSÃO E TRATAMENTOS */}
      <section id="specific-causes" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
            <Search size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Etiologias Principais: Patogenia Detalhada</h2>
            <p className="text-xs text-ink-muted">Mecanismos histopatológicos, gatilhos de piora e abordagem direcionada</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAUSES.map((cause) => (
            <div key={cause.id} className={cn("card p-6 border rounded-3xl flex flex-col justify-between space-y-5", cause.bg, cause.border)}>
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center bg-card border border-line shadow-sm", cause.color)}>
                      <cause.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-brand-navy">{cause.title}</h3>
                      <p className="text-xs text-ink-muted">{cause.subtitle}</p>
                    </div>
                  </div>
                  <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full bg-card border border-line", cause.color)}>
                    {cause.badge}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* Mecanismo Primário */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block mb-1.5">
                      Mecanismo Fisiopatológico Inicial
                    </span>
                    <ul className="space-y-1.5 text-ink leading-relaxed">
                      {cause.mechanism.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ArrowRight size={13} className={cn("mt-0.5 shrink-0", cause.color)} />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vias de Progressão */}
                  <div className="pt-2 border-t border-line/60">
                    <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block mb-1.5">
                      Padrão de Progressão & Danos
                    </span>
                    <ul className="space-y-1.5 text-ink-muted leading-relaxed">
                      {cause.progression.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-current", cause.color)} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tratamento Específico */}
                  <div className="pt-2 border-t border-line/60">
                    <span className="text-[10px] font-black uppercase tracking-wider text-ink-muted block mb-1.5">
                      Tratamento Específico Direcionado
                    </span>
                    <div className="space-y-1.5">
                      {cause.treatment.map((t, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-card border border-line text-[11px] font-medium text-brand-navy flex items-center gap-2">
                          <Pill size={14} className={cn("shrink-0", cause.color)} />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RESUMO CONCEITUAL: VISÃO DO ESPECIALISTA */}
      <section className="p-7 md:p-8 rounded-3xl bg-brand-navy text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5 text-amber-400">
          <ShieldCheck size={24} />
          <h3 className="text-lg font-black tracking-tight text-white">
            Pérola Fisiopatológica: A Conexão Cápsula de Bowman × Túbulo
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Durante muito tempo acreditou-se que a DRC era puramente uma doença glomerular. Hoje sabemos que a <strong>fibrose tubulointersticial</strong> e a <strong>rarefação dos capilares peritubulares</strong> são os determinantes diretos da evolução para o estágio G5. A nefroproteção com iSGLT2 age exatamente protegendo o consumo metabólico de oxigênio das células do túbulo contorcido proximal.
        </p>
      </section>
    </div>
  );
}
