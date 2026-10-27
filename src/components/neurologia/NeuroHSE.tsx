import React, { useState } from 'react';
import { 
  ShieldAlert, AlertTriangle, Stethoscope, Dna, 
  Pill, CheckCircle2, Info, Sparkles, Eye, ArrowRight, Activity
} from 'lucide-react';

export default function NeuroHSE() {
  const [activeSubTab, setActiveSubTab] = useState<'conceito' | 'clinica' | 'diagnostico' | 'tratamento' | 'diferencial'>('conceito');

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'conceito', label: '1. Conceito & Fisiopatologia Límbica', badge: 'TLR3 & Cowdry A' },
          { id: 'clinica', label: '2. Quadro Clínico & Illness Script', badge: 'Afasia & Crises' },
          { id: 'diagnostico', label: '3. Diagnóstico (LCR, PCR, RM & EEG)', badge: 'Falso-Negativo <72h' },
          { id: 'tratamento', label: '4. Tratamento & O que Mudou em 2026', badge: 'DexEnceph Negativo' },
          { id: 'diferencial', label: '5. Diagnóstico Diferencial & Anti-NMDAR', badge: 'Pós-Herpética' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeSubTab === tab.id ? 'bg-rose-700/60 text-rose-100' : 'bg-slate-800 text-slate-400'}`}>
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. CONCEITO & FISIOPATOLOGIA */}
      {/* =================================================================== */}
      {activeSubTab === 'conceito' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Encefalite Viral Esporádica Mais Frequente e Letal
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Encefalite Herpética (HSE): Da Biologia Molecular à Anatomia Límbica
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Inflamação aguda do parênquima cerebral causada pelo <strong>Herpes Simplex Vírus tipo 1 (HSV-1 em 90% dos adultos)</strong>. Sem tratamento, a mortalidade atinge cerca de <strong>70%</strong>; com introdução precoce de aciclovir, cai para 10% a 20%.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300">
                  Incidência: 2 a 4 / milhão / ano
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-xs font-bold text-rose-300">
                  Distribuição Bimodal (&lt;20 e &gt;50 anos)
                </div>
              </div>
            </div>

            {/* A Regra de Ouro Banner */}
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-600/60 space-y-2">
              <span className="text-xs font-black uppercase text-rose-300 flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-400" /> PÉROLA CLÍNICA: A Regra de Ouro do Atendimento
              </span>
              <p className="text-sm font-bold text-white leading-relaxed">
                Febre + alteração aguda de comportamento ou nível de consciência + crise epiléptica ou sinal neurológico focal = <span className="underline decoration-rose-400 decoration-2">ACICLOVIR IV IMEDIATAMENTE</span>.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Não se espera tomografia, punção lombar, PCR ou ressonância magnética para iniciar a primeira dose!</strong> O atraso de mais de 2 dias entre a admissão hospitalar e o início do aciclovir é fator preditor independente de pior desfecho neurológico e óbito (Raschilas et al., <em>Clin Infect Dis</em> 2002), sendo o <strong>único fator prognóstico modificável pelo médico assistente</strong>.
              </p>
            </div>

            {/* Anatomo-Physiology Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-black uppercase text-amber-300 block">Por que o Tropismo pelo Lobo Temporal e Límbico?</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  O tropismo pelo sistema límbico (lobo temporal mesial, ínsula, giro do cíngulo e córtex orbitofrontal) é a marca anatômica patognomônica da HSE:
                </p>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li>• <strong>Primoinfecção (1/3 dos casos):</strong> O vírus entra pela mucosa olfatória e ascende pelo bulbo olfatório até o córtex orbitofrontal e o uncus hipocampal.</li>
                  <li>• <strong>Reativação (2/3 dos casos):</strong> Vírus latente no gânglio trigeminal ascende pelos ramos meníngeos do nervo trigêmeo que inervam a base dos lobos frontal e temporal.</li>
                  <li>• <strong>Padrão de Lesão:</strong> Encefalite <strong>necrotizante, hemorrágica e assimétrica</strong> (embora frequentemente bilateral).</li>
                  <li>• <strong>Sinal de Valor na Imagem:</strong> <strong>POUPA OS NÚCLEOS DA BASE</strong> (putâmen, globo pálido e caudado). Esse detalhe anatômico é crucial para diferenciar HSE de infarto extenso da artéria cerebral média (ACM).</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-black uppercase text-cyan-300 block">Mecanismo Duplo de Lesão & Imunogenética (TLR3)</span>
                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>• <strong>1. Lise Viral Direta:</strong> Replicação em neurônios e glia gerando necrose e hemorragia, com <strong>inclusões intranucleares eosinofílicas (Corpúsculos de Cowdry tipo A)</strong>, neuronofagia e infiltrado perivascular.</p>
                  <p>• <strong>2. Dano Imunomediado:</strong> Microglia ativada e linfócitos T CD8+ liberam TNF-α, IL-1β, IL-6 e metaloproteinases (MMP-9), que rompem a barreira hematoencefálica e geram edema citotóxico e vasogênico grave.</p>
                  <p>• <strong>Genética da Imunidade Neural (Casrouge 2006; Zhang 2007):</strong> Embora a soropositividade populacional para HSV-1 passe de 80%, a encefalite ocorre em fração ínfima. Crianças com HSE apresentam defeitos monogênicos na <strong>via do TLR3 (TLR3, UNC93B1, TRIF, TRAF3, TBK1, IRF3)</strong>, que reduzem a produção de Interferons tipo I (IFN-α/β) pelos neurônios e oligodendrócitos. A imunidade contra o HSV no SNC é <strong>intrínseca à célula neural</strong>, e não sistêmica.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. QUADRO CLÍNICO & ILLNESS SCRIPT */}
      {/* =================================================================== */}
      {activeSubTab === 'clinica' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Semiologia Neurológica & Apresentação Típica
            </span>
            <h2 className="text-2xl font-black text-white">Quadro Clínico: A Assinatura Límbica da HSE</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Instalação aguda a subaguda (ao longo de 2 a 7 dias). Febre em &gt; 90% dos casos e cefaleia. Os sintomas refletem a disfunção temporal e do sistema límbico.
            </p>
          </div>

          {/* Illness Script Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-600/60 space-y-2">
            <span className="text-xs font-black uppercase text-amber-300 flex items-center gap-1.5">
              <Sparkles size={16} /> ILLNESS SCRIPT OFICIAL DA ENCEFALITE HERPÉTICA
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              Adulto previamente hígido + Febre há poucos dias + Mudança súbita de comportamento, confusão ou psicose + Afasia ou alucinação olfatória + Crise epiléptica focal. LCR linfocitário com hemácias. RM com hipersinal temporal mesial e insular assimétrico poupando núcleos da base. EEG com descargas periódicas lateralizadas (LPDs).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-rose-400 block uppercase text-[11px]">1. Alteração Comportamental & Psiquiátrica</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Desinibição sexual ou social, agitação psicomotora, hipomania, apatia, alucinações e comportamento bizarro. <strong>Frequentemente chegam à emergência com diagnóstico errôneo de "primeiro surto psicótico"</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-amber-400 block uppercase text-[11px]">2. Distúrbios de Linguagem & Memória</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Afasia fluente ou de condução (lesão temporal dominante) com anomia e parafasias verbais. Amnésia anterógrada severa (necrose hipocampal aguda com incapacidade de fixar novas memórias).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-cyan-400 block uppercase text-[11px]">3. Crises Uncinadas & Alucinações</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Crises focais com auras de alucinações olfatórias ou gustativas desagradáveis (cheiro de queimado, borracha, esgoto) decorrentes da irritação do giro para-hipocampal e uncus.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-emerald-400 block uppercase text-[11px]">4. Crises Epilépticas (40% a 60%)</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Crises focais motoras ou com comprometimento da consciência, frequentemente evoluindo para tônico-clônica bilateral e com alto risco de <strong>Estado de Mal Epiléptico (EME)</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-purple-400 block uppercase text-[11px]">5. Ausência Típica de Rigidez de Nuca</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Sinais meníngeos (rigidez de nuca, Kernig e Brudzinski) <strong>estão ausentes na maioria dos casos</strong>, pois a HSE é primariamente uma afecção parenquimatosa encefálica, e não meníngea. A ausência de meningismo NUNCA afasta encefalite!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-slate-400 block uppercase text-[11px]">6. Armadilha do Herpes Labial</strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                A presença ou ausência de vesículas de herpes labial <strong>não tem valor diagnóstico</strong>: está presente apenas em minoria dos casos e com frequência idêntica à da população geral sob estresse infeccioso qualquer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. DIAGNÓSTICO */}
      {/* =================================================================== */}
      {activeSubTab === 'diagnostico' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              PCR no LCR, Neuroimagem e Eletroencefalograma
            </span>
            <h2 className="text-2xl font-black text-white">Investigação Diagnóstica & Armadilhas Laboratoriais</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-3">Exame</th>
                  <th className="p-3">Achado Típico na HSE</th>
                  <th className="p-3 text-rose-300">Pegadinhas & Interpretação Prática</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                <tr>
                  <td className="p-3 font-bold text-white">Líquor (LCR)</td>
                  <td className="p-3">Pleocitose linfocitária moderada (10 a 500 cels/µL), hiperproteinorraquia (100–500 mg/dL), glicose normal. Hemácias e xantocromia comuns.</td>
                  <td className="p-3">LCR normal pode ocorrer nas primeiras 24–48h e em imunossuprimidos; <strong>LCR inicial normal não exclui HSE</strong>.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-400">PCR para HSV no LCR (Padrão-Ouro)</td>
                  <td className="p-3">Sensibilidade de ~96% e especificidade de ~99% comparada à biópsia cerebral (Lakeman & Whitley 1995).</td>
                  <td className="p-3 font-bold text-rose-300">
                    <strong>Falso-negativo ocorre em 2 situações:</strong> 1) Punção precoce (&lt; 72h de sintomas com carga viral baixa); 2) Amostra hemorrágica (o heme inibe a polimerase). Conduta: <strong>MANTER aciclovir e repetir punção em 3 a 7 dias!</strong>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyan-400">Ressonância Magnética (RM)</td>
                  <td className="p-3">Hipersinal em T2/FLAIR no lobo temporal mesial, ínsula e giro do cíngulo, assimétrico, poupando núcleos da base. <strong>Restrição à difusão (DWI) é a sequência mais precoce.</strong></td>
                  <td className="p-3">Alterada em &gt; 90% dos casos. A TC de crânio pode ser normal em até 1/3 dos casos na primeira semana (TC normal NÃO exclui!).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">Eletroencefalograma (EEG)</td>
                  <td className="p-3">Lentificação focal temporal e <strong>LPDs (Descargas Periódicas Lateralizadas / antigos PLEDs)</strong> de 1 a 3 Hz entre o 2º e 15º dia.</td>
                  <td className="p-3">Indispensável no paciente que não desperta para diagnosticar <strong>Estado de Mal Epiléptico Não-Convulsivo</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs text-slate-300">
            <strong className="text-white block">Regra para Punção Lombar e Tomografia Prévia:</strong>
            <p className="text-slate-400">
              A TC antes da punção é indicada se Glasgow &lt; 10, déficit focal novo, papiledema, crise convulsiva recente ou imunossupressão. No entanto, <strong>se a TC for demorar, coletar hemoculturas e aplicar a primeira dose de Aciclovir IV imediatamente</strong>. A punção pode ser feita depois, pois a PCR permanece positiva por cerca de uma semana após o início do antiviral.
            </p>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. TRATAMENTO & O QUE MUDOU EM 2026 */}
      {/* =================================================================== */}
      {activeSubTab === 'tratamento' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Terapêutica Antiviral & Novas Evidências
            </span>
            <h2 className="text-2xl font-black text-white">Aciclovir & O Ensaio DexEnceph (Lancet Neurol 2026)</h2>
          </div>

          {/* DexEnceph 2026 Breakthrough Box */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-600/60 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-amber-300 flex items-center gap-1.5">
                <AlertTriangle size={16} /> ATUALIZAÇÃO 2026: Corticoide Adjuvante na Encefalite Herpética?
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-800">
                Solomon et al., Lancet Neurol 2026
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              O primeiro ensaio clínico randomizado completo de corticoide na HSE, o <strong>ensaio DexEnceph (Lancet Neurol 2026)</strong>, randomizou 94 adultos com HSE confirmada por PCR para Dexametasona 10 mg IV de 6/6h por 4 dias + Aciclovir versus Aciclovir isolado.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <p>• <strong>Resultado:</strong> O desfecho primário de memória verbal aos 6 meses (Wechsler Memory Scale) <strong>NÃO teve diferença estatística</strong> (71 vs 69 pontos).</p>
              <p>• <strong>Conclusão da Metanálise de Zhang et al. (J Neurol 2026):</strong> <strong>NÃO SE RECOMENDA corticoide de rotina na encefalite herpética [SEM EVIDÊNCIA DE BENEFÍCIO].</strong></p>
              <p>• <strong>Exceção por Consenso (Nível C):</strong> Edema cerebral maciço com efeito de massa, herniação uncal iminente ou hipertensão intracraniana refratária.</p>
              <p>• <em>Nota prática:</em> Se o paciente tem encefalite indeterminada com forte suspeita autoimune e recebeu corticoide empírico precoce, o DexEnceph mostrou que isso é seguro e não aumenta a replicação do HSV.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-rose-300 block">Esquema Posológico do Aciclovir IV</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>Adultos e crianças &gt; 12 anos:</strong> <strong>10 mg/kg IV de 8 em 8 horas</strong> infundido em 1 hora, por <strong>14 a 21 dias</strong> (14 dias para imunocompetentes com PCR de controle negativa; 21 dias para imunossuprimidos ou formas graves).</li>
                <li>• <strong>Crianças (3 meses a 12 anos):</strong> 500 mg/m² IV de 8/8h por pelo menos 21 dias.</li>
                <li>• <strong>Neonatos:</strong> 20 mg/kg IV de 8/8h por 21 dias + 6 meses de terapia supressiva oral (Kimberlin et al., NEJM 2011).</li>
                <li>• <strong>Valaciclovir Oral:</strong> NÃO substitui aciclovir IV na fase aguda nem tem benefício após o tratamento venoso (ensaio Gnann et al., 2015).</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 block">Toxicidade & Resistência Viral</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>Nefrotoxicidade por Cristalúria:</strong> Ocorre por precipitação intratubular. Prevenção: hidratação venosa vigorosa contínua e tempo de infusão mínimo de 60 minutos.</li>
                <li>• <strong>Neurotoxicidade por Aciclovir:</strong> Ocorre se a dose não for ajustada na insuficiência renal: cursa com mioclonias, confusão e alucinações (pode ser confundida com piora da encefalite!).</li>
                <li>• <strong>Vírus Resistente (Mutação da Timidina Quinase):</strong> Ocorre quase exclusivamente em imunossuprimidos graves. Droga de resgate: <strong>Foscarnet IV</strong> (60 mg/kg 8/8h ou 90 mg/kg 12/12h).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. DIAGNÓSTICO DIFERENCIAL & ANTI-NMDAR */}
      {/* =================================================================== */}
      {activeSubTab === 'diferencial' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Encefalite Autoimune Pós-Herpética & Outras Causas
            </span>
            <h2 className="text-2xl font-black text-white">A Armadilha da Encefalite Autoimune Pós-HSE</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              A necrose neuronal causada pelo vírus expõe antígenos sinápticos cerebrais e quebra a tolerância imunológica. 
              No estudo de <strong>Armangue et al. (Lancet Neurol 2018), 27% dos pacientes com HSE desenvolveram encefalite autoimune secundária</strong> semanas após.
            </p>
          </div>

          {/* Post-HSE Autoimmune Box */}
          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800 space-y-2 text-xs text-slate-200">
            <span className="font-bold text-rose-400 uppercase text-[11px] block">
              Apresentação Clínica da Encefalite Pós-Herpética (PCR HSV NEGATIVA!):
            </span>
            <p className="leading-relaxed">
              O paciente completou o ciclo de aciclovir, teve melhora clínica inicial, mas <strong>2 a 8 semanas depois volta a piorar com novos sintomas neurológicos</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-[11px]">
              <li><strong>Crianças &lt; 4 anos:</strong> Coreoatetose (movimentos coreicos anormais rápidos) e rebaixamento de consciência cerca de 26 dias após a HSE.</li>
              <li><strong>Adultos e adolescentes:</strong> Psicose aguda, agitação, agressividade e distúrbios comportamentais cerca de 43 dias após a HSE.</li>
              <li><strong>Laboratório:</strong> PCR para HSV no LCR vem <strong>NEGATIVA</strong>, mas há anticorpos neuronais positivos (64% <strong>anti-NMDAR</strong>, anti-LGI1, anti-GABA-B).</li>
              <li><strong>CONDUTA CORRETA:</strong> <strong>IMUNOTERAPIA IMEDIATA</strong> (Metilprednisolona 1 g/dia IV por 5 dias + Imunoglobulina IV ou Plasmaférese; Rituximabe se refratário). <strong>NÃO É RECIDIVA VIRAL E NÃO ADIANTA REPETIR ACICLOVIR!</strong></li>
            </ul>
          </div>

          {/* Differential Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Outros Diagnósticos Diferenciais Chave</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-cyan-400 block">Encefalite Anti-LGI1</strong>
                <p className="text-slate-300 text-[11px]">Idosos com crises distônicas faciobraquiais (contrações súbitas da face e braço ipsilateral de segundos), amnésia e <strong>hiponatremia marcante</strong> sem febre.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-amber-400 block">Meningoencefalite por Listeria</strong>
                <p className="text-slate-300 text-[11px]">Idosos, gestantes e imunodeprimidos. Rombencefalite (acomete tronco cerebral e cerebelo). <strong>Ampicilina IV obrigatória no esquema empírico inicial</strong>.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-emerald-400 block">Tuberculose do SNC</strong>
                <p className="text-slate-300 text-[11px]">Evolução subaguda (semanas), paralisia de nervos cranianos (abducente, facial), hidrocefalia comunicante, LCR com glicose muito baixa e realce meníngeo basilar na RM.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
