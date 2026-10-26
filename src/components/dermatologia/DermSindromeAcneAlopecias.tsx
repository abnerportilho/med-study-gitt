import React, { useState } from 'react';
import { 
  Sparkles, Stethoscope, Dna, ShieldAlert, 
  AlertTriangle, CheckCircle2, Info, Pill, Scissors
} from 'lucide-react';

export default function DermSindromeAcneAlopecias() {
  const [activeTab, setActiveTab] = useState<'acne' | 'rosacea' | 'hidradenite' | 'alopecias'>('acne');

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'acne', label: 'Acne Vulgar (Graus I a V & Isotretinoína)', badge: 'C. acnes / Graus' },
          { id: 'rosacea', label: 'Rosácea (Sem Comedões & Flushing)', badge: 'Demodex & Vasos' },
          { id: 'hidradenite', label: 'Hidradenite Supurativa (Hurley I a III)', badge: 'Fístulas & Anti-TNF' },
          { id: 'alopecias', label: 'Alopecias: Androgenética vs Areata', badge: 'DHT vs Autoimune' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{t.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeTab === t.id ? 'bg-blue-700/60 text-blue-100' : 'bg-slate-800 text-slate-400'}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. ACNE VULGAR */}
      {/* =================================================================== */}
      {activeTab === 'acne' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Afecção da Unidade Pilossebácea · Diretrizes SBD & GADEL
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Acne Vulgar: Fisiopatologia, Graus I a V e Terapêutica
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Doença multifatorial que acomete mais de 80% dos adolescentes. Depende da interação entre 4 pilares: <strong>1) Hiperqueratinização infundibular</strong> com retenção de sebo; <strong>2) Hipersecreção sebácea</strong> mediada por andrógenos; <strong>3) Colonização por <em>Cutibacterium acnes</em></strong>; e <strong>4) Inflamação</strong> imune inata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            {[
              {
                grau: 'Grau I',
                nome: 'Comedoniana',
                lesoes: 'Apenas comedões abertos (pontos pretos por oxidação de melanina/lipídios) e fechados (pontos brancos). Não inflamatória.',
                tratamento: 'Tópico exclusivo: Retinoide (Adapaleno 0,1% ou Tretinoína) à noite + Ácido Salicílico.',
                cor: 'text-emerald-400',
                border: 'border-emerald-800/60'
              },
              {
                grau: 'Grau II',
                nome: 'Pápulo-Pustulosa',
                lesoes: 'Comedões associados a pápulas eritematosas dolorosas e pústulas com conteúdo purulento.',
                tratamento: 'Peróxido de Benzoíla 2,5 a 5% + Clindamicina tópica 1%. Se moderada/extensa: Doxiciclina 100 mg/dia VO (máx 12 semanas, nunca isolada!).',
                cor: 'text-amber-400',
                border: 'border-amber-800/60'
              },
              {
                grau: 'Grau III',
                nome: 'Nódulo-Cística',
                lesoes: 'Nódulos inflamatórios profundos, cistos dolorosos e início de cicatrizes deprimidas.',
                tratamento: 'Indicação formal de <strong>Isotretinoína Oral (Roacutan)</strong> 0,5 a 1,0 mg/kg/dia até dose cumulativa de 120–150 mg/kg.',
                cor: 'text-orange-400',
                border: 'border-orange-800/60'
              },
              {
                grau: 'Grau IV',
                nome: 'Conglobata',
                lesoes: 'Nódulos confluentes volumosos, fístulas comunicantes que drenam pus fétido e cicatrizes queloidianas em tórax e dorso.',
                tratamento: 'Isotretinoína oral em dose plena associada a corticoide oral curto para desinflamar antes.',
                cor: 'text-rose-400',
                border: 'border-rose-800/60'
              },
              {
                grau: 'Grau V',
                nome: 'Fulminans',
                lesoes: 'Forma rara e gravíssima com necrose hemorrágica das lesões de acne, febre alta, artrite/artralgias e leucocitose.',
                tratamento: '<strong>Emergência:</strong> Prednisona oral 0,5 a 1,0 mg/kg/dia primeiro. NUNCA iniciar isotretinoína na fase aguda sem corticoide!',
                cor: 'text-red-400',
                border: 'border-red-800/60'
              }
            ].map((g, idx) => (
              <div key={idx} className={`p-4 rounded-2xl bg-slate-950 border ${g.border} flex flex-col justify-between space-y-2`}>
                <div>
                  <span className={`text-base font-black ${g.cor} block`}>{g.grau}</span>
                  <strong className="text-white text-xs block">{g.nome}</strong>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">{g.lesoes}</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-[10px] text-slate-400 mt-2">
                  <strong className="text-white block mb-0.5">Manejo Clínico:</strong>
                  <span dangerouslySetInnerHTML={{ __html: g.tratamento }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. ROSÁCEA */}
      {/* =================================================================== */}
      {activeTab === 'rosacea' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Dermatose Inflamatória Vascular Crônica Centrofacial
            </span>
            <h2 className="text-2xl font-black text-white">Rosácea: Sem Comedões & Gatilhos Vasomotores</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Doença inflamatória centrofacial em adultos de pele clara (30 a 50 anos). Hipersensibilidade vascular com flushing transitório, eritema persistente, telangiectasias e pústulas estéreis com superpopulação de ácaros <em>Demodex folliculorum</em>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-xs text-slate-300 space-y-1">
            <strong className="text-rose-300 flex items-center gap-1.5 uppercase font-bold text-[11px]">
              <AlertTriangle size={15} /> O Diferencial Chave de Prova e de Consultório:
            </strong>
            <p>
              <strong>A ROSÁCEA NÃO APRESENTA COMEDÕES!</strong> A presença de comedões (cravos abertos ou fechados) confirma Acne Vulgar. Se o paciente adulto tem eritema, pápulas e pústulas em bochechas e nariz <strong>SEM COMEDÕES</strong>, o diagnóstico é <strong>Rosácea</strong>. Corticoides tópicos na face PIORAM drasticamente a rosácea ("rosácea esteroide")!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-rose-400 uppercase text-[11px] block">1. Eritematotelangiectásica</span>
              <p className="text-slate-300 text-[11px]">Flushing reativo e eritema permanente centrofacial com finas telangiectasias visíveis.</p>
              <p className="text-[10px] text-slate-500">Manejo: Evitar gatilhos térmicos/álcool/pimenta; Tartarato de Brimonidina 0,33% gel (vasoconstritor alfa-2) e Luz Pulsada.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-amber-400 uppercase text-[11px] block">2. Pápulo-Pustulosa</span>
              <p className="text-slate-300 text-[11px]">Pápulas e pústulas sobre base eritematosa na fronte, nariz e queixo, sem comedões.</p>
              <p className="text-[10px] text-slate-500">Manejo: Metronidazol 0,75% gel ou Ivermectina 1% creme (combate o ácaro Demodex); Doxiciclina 40 mg/dia oral (dose anti-inflamatória pura).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-purple-400 uppercase text-[11px] block">3. Fimatosa (Rinofima)</span>
              <p className="text-slate-300 text-[11px]">Hipertrofia de glândulas sebáceas e fibrose dérmica, causando deformidade bulbosa do nariz.</p>
              <p className="text-[10px] text-slate-500">Manejo: Isotretinoína oral na fase inflamatória precoce; cirurgia redutora, shaving ou laser CO2 na fase fibrótica avançada.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-cyan-400 uppercase text-[11px] block">4. Ocular</span>
              <p className="text-slate-300 text-[11px]">Presente em até 50% dos pacientes: blefarite crônica, telangiectasias na borda palpebral, sensação de areia e calázios de repetição.</p>
              <p className="text-[10px] text-slate-500">Manejo: Higiene palpebral diária com xampu neutro, lágrimas artificiais e Doxiciclina oral.</p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. HIDRADENITE SUPURATIVA */}
      {/* =================================================================== */}
      {activeTab === 'hidradenite' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Doença Inflamatória Folicular Oclusiva · Estágios de Hurley
            </span>
            <h2 className="text-2xl font-black text-white">Hidradenite Supurativa (Acne Inversa)</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Oclusão folicular primária crônica com subsequente ruptura infundibular e inflamação exuberante em áreas intertriginosas ricas em glândulas apócrinas (axilas, virilhas, região anogenital e inframamária). Associação íntima com <strong>tabagismo e obesidade</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 uppercase text-xs block">Hurley Estágio I</span>
              <strong className="text-white text-xs block">Nódulos e Abscessos Isolados</strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Formação de abscessos dolorosos recorrentes sem fístulas ou trajetos sinusais comunicantes e sem cicatrizes retráteis.
              </p>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                <strong>Conduta:</strong> Clindamicina tópica 1% 2x/dia ou Doxiciclina 100 mg 12/12h VO por 10 a 12 semanas. Cessar tabagismo e perda ponderal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 uppercase text-xs block">Hurley Estágio II</span>
              <strong className="text-white text-xs block">Abscessos Recorrentes com Fístulas</strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Abscessos volumosos que formam trajetos fistulosos com drenagem purulenta contínua e cicatrizes lineares separadas entre si.
              </p>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                <strong>Conduta:</strong> Associação antibiótica: <strong>Clindamicina 300 mg 12/12h + Rifampicina 300 mg 12/12h VO por 10 a 12 semanas</strong>. Destelhamento cirúrgico de fístulas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 uppercase text-xs block">Hurley Estágio III</span>
              <strong className="text-white text-xs block">Acometimento Difuso em Placa Cicatricial</strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Envolvimento contínuo de toda a região anatômica com múltiplos túneis interligados, drenagem constante e fibrose em bloco incapacitante.
              </p>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                <strong>Conduta:</strong> <strong>Adalimumabe (anti-TNF)</strong> 160 mg semana 0, 80 mg semana 2 e 40 mg semanal + cirurgia de ressecção ampla em bloco com cicatrização por segunda intenção.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. ALOPECIAS */}
      {/* =================================================================== */}
      {activeTab === 'alopecias' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Desordens do Ciclo Capilar e Queda de Cabelo
            </span>
            <h2 className="text-2xl font-black text-white">Alopecia Androgenética (AAG) vs Alopecia Areata (AA)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* AAG */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-amber-300">Alopecia Androgenética (Calvície)</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-800">
                  Dependente de DHT
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Mecanismo:</strong> Miniaturização folicular progressiva dos fios sob ação da <strong>Dihidrotestosterona (DHT)</strong> convertida pela enzima 5-alfa-redutase tipo II. Fios terminais grossos viram pelos finos ("vellus").</li>
                <li>• <strong>Padrões Clínicos:</strong>
                  <br />• <em>Masculino (Norwood-Hamilton):</em> Recessão frontotemporal ("entradas") e perda no vértex (coroa), poupando a região occipital.
                  <br />• <em>Feminino (Ludwig):</em> Rarefação difusa no topo do couro cabeludo ("árvore de natal"), <strong>preservando a linha de implantação frontal anterior</strong>.
                </li>
                <li>• <strong>Arsenal Terapêutico:</strong>
                  <br />1) <strong>Minoxidil tópico 5%</strong> (ou oral 1 a 2,5 mg/dia): Vasodilatador e estimulador da fase anágena.
                  <br />2) <strong>Inibidores da 5-alfa-redutase:</strong> Finasterida 1 mg/dia ou Dutasterida 0,5 mg/dia (bloqueia conversão de testosterona em DHT).
                  <br />3) Mulheres: Espironolactona oral ou Acetato de Ciproterona.
                </li>
              </ul>
            </div>

            {/* Alopecia Areata */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-cyan-300">Alopecia Areata (Doença Autoimune)</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-200 border border-cyan-800">
                  Perda de Privilégio Imune
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Mecanismo:</strong> Ataque inflamatório autoimune mediado por Linfócitos T CD8+ ao bulbo capilar em anágeno. <strong>Não é cicatricial</strong> (o folículo permanece vivo e pode voltar a produzir cabelo!).</li>
                <li>• <strong>Semiologia Patognomônica:</strong>
                  <br />• Placas circulares ou ovais de alopecia lisa e brilhante, sem eritema, descamação ou atrofia.
                  <br />• <strong>Pelos em ponto de exclamação:</strong> Cabelos curtos quebradiços na borda ativa que afilam em direção à raiz.
                  <br />• <strong>Pitting ungueal em dedal:</strong> Acometimento de unhas em até 20%.
                </li>
                <li>• <strong>Formas Clínicas Extensas:</strong> Ofiásica (em faixa occipital), Total (todo o couro cabeludo) e Universal (todos os pelos do corpo).</li>
                <li>• <strong>Tratamento:</strong>
                  <br />• Placas localizadas: <strong>Infiltração intralesional de Triancinolona 5 mg/mL</strong> mensal ou Corticoide tópico Classe I.
                  <br />• Formas graves/universais: <strong>Inibidores de JAK orais</strong> (Baricitinibe / Ritlecitinibe).
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
