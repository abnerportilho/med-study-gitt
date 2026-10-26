import React, { useState } from 'react';
import { 
  Layers, Dna, Stethoscope, Search, Pill, 
  ShieldCheck, AlertTriangle, CheckCircle2, Info, Sparkles, HelpCircle
} from 'lucide-react';

export default function DermSindromeEritemato() {
  const [activeDisease, setActiveDisease] = useState<'psoriase' | 'liquen' | 'gibert' | 'seborreica'>('psoriase');
  const [activePsoriaseTab, setActivePsoriaseTab] = useState<'clinica' | 'formas' | 'tratamento' | 'biologicos'>('clinica');

  return (
    <div className="space-y-6">
      {/* Disease Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'psoriase', label: 'Psoríase (Vulgar, Gutata, Invertida)', badge: 'Eixo IL-23/Th17' },
          { id: 'liquen', label: 'Líquen Plano (5 Ps & Estrias de Wickham)', badge: 'Interface Basal' },
          { id: 'gibert', label: 'Pitiríase Rósea de Gibert', badge: 'Árvore de Natal' },
          { id: 'seborreica', label: 'Dermatite Seborreica', badge: 'Malassezia' }
        ].map(d => (
          <button
            key={d.id}
            onClick={() => setActiveDisease(d.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeDisease === d.id
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{d.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeDisease === d.id ? 'bg-amber-700/60 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
              {d.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. PSORÍASE */}
      {/* =================================================================== */}
      {activeDisease === 'psoriase' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Síndromes Eritematodescamativas · Consenso SBD & AAD
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Psoríase: Diagnóstico, Formas Clínicas e Terapêutica Escalonada
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Doença inflamatória crônica sistêmica imunomediada com placas eritematoescamosas bem delimitadas, turnover celular acelerado (3 a 5 dias), risco de artrite psoriásica em 20–30% e comorbidades cardiometabólicas associadas.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  HLA-C*06:02 (Cw6)
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800 text-xs font-bold text-amber-300">
                  Regra dos 10 (PASI/BSA/DLQI)
                </div>
              </div>
            </div>

            {/* Psoriasis Internal Tabs */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-800 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'clinica', label: '1. Semiologia & Fisiopatologia' },
                { id: 'formas', label: '2. Formas Clínicas & Unhas' },
                { id: 'tratamento', label: '3. Tratamento Tópico & Sistêmico' },
                { id: 'biologicos', label: '4. Imunobiológicos (SBD/SUS)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePsoriaseTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border cursor-pointer ${
                    activePsoriaseTab === tab.id
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-tab 1: Semiologia & Fisiopato */}
          {activePsoriaseTab === 'clinica' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Stethoscope className="text-amber-400" size={18} />
                    Morfologia Típica e Manobras Semiológicas
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A lesão elementar clássica é a <strong>placa eritematosa bem delimitada</strong> recoberta por escamas espessas, secas e <strong>branco-prateadas</strong> (aspecto micáceo). Distribuição preferencial simétrica em superfícies extensoras (cotovelos, joelhos), região sacral e couro cabeludo.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-black text-amber-400 uppercase">Curetagem de Brocq (Sinal da Vela)</span>
                      <p className="text-xs text-slate-300">
                        Ao raspar a lesão com lâmina, soltam-se escamas brancas finamente estratificadas, lembrando raspas de vela de estearina.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-black text-rose-400 uppercase">Sinal de Auspitz (Orvalho Sangrante)</span>
                      <p className="text-xs text-slate-300">
                        Após destacar a última película translúcida (de Duncan-Dulck), surgem minúsculos pontos de sangramento pela ruptura dos capilares ectasiados das papilas dérmicas alongadas.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-black text-cyan-400 uppercase">Fenômeno de Koebner</span>
                      <p className="text-xs text-slate-300">
                        Surgimento de novas placas psoriásicas em áreas de trauma mecânico, cirúrgico, queimadura solar ou fricção de roupas após 7 a 14 dias.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-black text-emerald-400 uppercase">Halo Anêmico de Woronoff</span>
                      <p className="text-xs text-slate-300">
                        Anel claro e pálido de vasoconstrição ao redor de placas psoriásicas em fase de regressão ou pós-fototerapia.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Dna className="text-amber-400" size={18} />
                    Imunopatogênese: O Eixo Celular IL-23 / Th17
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Gatilhos ambientais (estresse, trauma, infecção estreptocócica, drogas como lítio e betabloqueadores) em indivíduos geneticamente suscetíveis ativam células dendríticas mieloides que produzem <strong>IL-12 e IL-23</strong>.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <p>• A <strong>IL-23</strong> promove diferenciação e sobrevida de linfócitos <strong>Th17 e Th22</strong>.</p>
                    <p>• Células Th17 liberam <strong>IL-17A, IL-17F e IL-22</strong>, que causam hiperproliferação de queratinócitos e recrutamento maciço de neutrófilos (microabscessos de Munro na camada córnea e pústulas espongiformes de Kogoj).</p>
                    <p>• O ciclo celular encurta de 28 para <strong>3 a 5 dias</strong>, gerando paraqueratose persistente e escamas espessas.</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/50 space-y-3">
                  <span className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle size={15} /> Alerta Máximo: Corticoide Sistêmico
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>NUNCA PRESCREVER CORTICOIDE VIA ORAL OU INJETÁVEL (PREDNISONA, DEXAMETASONA, BETAMETASONA IM) NA PSORÍASE!</strong>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Ao suspender ou reduzir a dose, ocorre efeito rebote fulminante, com risco de transformação em <strong>Psoríase Pustulosa Generalizada de von Zumbusch</strong> ou <strong>Psoríase Eritrodérmica</strong>, condições potencialmente fatais que exigem UTI.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-amber-300 block uppercase text-[11px]">Gatilhos & Drogas Desencadeantes</span>
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong>Lítio</strong> e <strong>Betabloqueadores</strong></li>
                    <li>• <strong>Antimaláricos</strong> (cloroquina / hidroxicloroquina)</li>
                    <li>• <strong>Retirada abrupta de corticoide</strong></li>
                    <li>• <strong>Infecção de orofaringe</strong> (estrepto causa psoríase gutata)</li>
                    <li>• <strong>Tabagismo e etilismo</strong> (refratariedade grave)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 2: Formas Clínicas */}
          {activePsoriaseTab === 'formas' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Psoríase Vulgar (em Placas)',
                    freq: '80–90% dos casos',
                    desc: 'Placas eritematoescamosas simétricas em cotovelos, joelhos, couro cabeludo e pré-sacral.',
                    conduct: 'Tópicos potentes (Clobetasol + Calcipotriol) nas formas leves; fototerapia ou sistêmicos se PASI > 10.'
                  },
                  {
                    name: 'Psoríase Gutata (em Gotas)',
                    freq: 'Crianças e Jovens',
                    desc: 'Pápulas eritematosas descamativas súbitas de 0,5 a 1 cm no tronco e raiz de membros, 1 a 3 semanas após faringite estreptocócica.',
                    conduct: 'Pesquisar e tratar foco bacteriano (Amoxicilina), dosar ASLO; excelente resposta a fototerapia UVB-NB.'
                  },
                  {
                    name: 'Psoríase Invertida (Flexural)',
                    freq: 'Áreas de Dobras',
                    desc: 'Placas eritematosas brilhantes com pouca ou nenhuma escama em axilas, inframamária, virilhas e região interglútea.',
                    conduct: 'Diferencial com candidíase. Evitar corticoide Classe I. Usar corticoide Classe V (Desonida) ou inibidor de calcineurina.'
                  },
                  {
                    name: 'Psoríase Ungueal',
                    freq: '50% dos pacientes',
                    desc: 'Pitting ungueal (depressões cupuliformes em dedal), manchas em gota de óleo (salmão), hiperqueratose subungueal e onicólise.',
                    conduct: 'Forte marcador de risco de Artrite Psoriásica. Resposta pobre a tópicos; requer metotrexato ou biológicos.'
                  },
                  {
                    name: 'Artrite Psoriásica (PsA)',
                    freq: '20–30% dos pacientes',
                    desc: 'Oligoartrite assimétrica, dactilite ("dedo em salsicha"), entesite (tendão de Aquiles) e acometimento axial/sacroileíte.',
                    conduct: 'Fator Reumatoide negativo (Espondiloartropatia soronegativa). Tratar com MTX, anti-TNF ou anti-IL-17.'
                  },
                  {
                    name: 'Psoríase Eritrodérmica & Pustulosa',
                    freq: 'Emergências Clínicas',
                    desc: 'Eritrodermia com > 90% da SC eritematosa e descamativa ou pústulas estéreis difusas com febre alta e calafrios.',
                    conduct: 'Internação hospitalar. Hidratação vigorosa, monitorar débito cardíaco e eletrólitos; Acitretina, Ciclosporina ou Infliximabe.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 shrink-0">
                          {item.freq}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-[11px] text-slate-400 mt-2">
                      <strong className="text-amber-400">Conduta:</strong> {item.conduct}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-tab 3: Tratamento */}
          {activePsoriaseTab === 'tratamento' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Pill className="text-amber-400" size={20} />
                Escalonamento Terapêutico da Psoríase (Consenso SBD)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1st Line */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-black uppercase text-emerald-400 block">1ª Linha: Terapia Tópica</span>
                  <p className="text-slate-300 leading-relaxed">
                    Indicada para doença leve (PASI &lt; 10, BSA &lt; 10% e DLQI &lt; 10 sem comprometimento de áreas nobres).
                  </p>
                  <div className="space-y-1.5 text-[11px] text-slate-400">
                    <p>• <strong>Corticoides de Alta/Ultra-alta Potência:</strong> Clobetasol 0,05% 1 a 2x/dia por até 3 semanas.</p>
                    <p>• <strong>Análogos da Vitamina D3:</strong> Calcipotriol 0,005% (age inibindo proliferação e induzindo diferenciação).</p>
                    <p>• <strong>Associação Fixa:</strong> Dipropionato de Betametasona + Calcipotriol (pomada ou gel) = máxima eficácia sinérgica com menor atrofia.</p>
                    <p>• <strong>Ceratolíticos:</strong> Ácido salicílico 3% a 5% em vaselina para retirar escamas espessas antes do corticoide.</p>
                  </div>
                </div>

                {/* 2nd Line */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-black uppercase text-amber-400 block">2ª Linha: Fototerapia</span>
                  <p className="text-slate-300 leading-relaxed">
                    Excelente perfil de segurança para lesões disseminadas, crianças e gestantes.
                  </p>
                  <div className="space-y-1.5 text-[11px] text-slate-400">
                    <p>• <strong>UVB de Banda Estreita (Narrowband - 311 nm):</strong> Escolha padrão. 2 a 3 sessões semanais em cabine.</p>
                    <p>• <strong>PUVA (Psoraleno oral + UVA):</strong> Reservado para casos refratários devido a maior risco de fotoenvelhecimento e neoplasia cutânea.</p>
                    <p>• <strong>Mecanismo:</strong> Induz apoptose de linfócitos T dérmicos e imunossupressão local fisiológica.</p>
                  </div>
                </div>

                {/* 3rd Line */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-black uppercase text-rose-400 block">3ª Linha: Sistêmicos Clássicos</span>
                  <p className="text-slate-300 leading-relaxed">
                    Para doença moderada a grave ou refratariedade à fototerapia.
                  </p>
                  <div className="space-y-1.5 text-[11px] text-slate-400">
                    <p>• <strong>Metotrexato (MTX):</strong> 7,5 a 25 mg/semana VO ou SC em dose única, associado a Ácido Fólico 5 mg 24h após. Monitorar hemograma, TGO/TGP e fibrose hepática.</p>
                    <p>• <strong>Acitretina (Retinoide oral):</strong> 0,3 a 0,5 mg/kg/dia. Excelente para forma pustulosa e palmo-plantar. <strong>Altamente teratogênica:</strong> contraindica gestação durante o uso e por <strong>3 ANOS</strong> após suspender.</p>
                    <p>• <strong>Ciclosporina:</strong> 2,5 a 5 mg/kg/dia. Ação ultrarrápida para resgate e eritrodermia. Limitar a 1 ano (nefrotoxicidade e hipertensão).</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 4: Biológicos */}
          {activePsoriaseTab === 'biologicos' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="text-amber-400" size={20} />
                  Arsenal de Imunobiológicos na Psoríase (PCDT Ministério da Saúde / SUS)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Indicados para psoríase moderada a grave com falha, contraindicação ou toxicidade a pelo menos um tratamento sistêmico clássico (MTX, Acitretina ou Fototerapia).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Anti-TNF */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-sky-400 uppercase block">Inibidores de TNF-alfa</span>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <p>• <strong>Adalimumabe:</strong> 80 mg SC indução, seguido de 40 mg SC quinzenal.</p>
                    <p>• <strong>Etanercepte:</strong> 50 mg SC 1x/semana.</p>
                    <p>• <strong>Infliximabe:</strong> 5 mg/kg IV nas semanas 0, 2, 6 e a cada 8 semanas.</p>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-850">
                    Primeira geração. Excelente para artrite psoriásica. Exige rastreio rigoroso de TB latente e hepatites.
                  </p>
                </div>

                {/* Anti-IL17 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase block">Inibidores de IL-17</span>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <p>• <strong>Secuquinumabe:</strong> 300 mg SC semanal semanas 0-4, após mensal.</p>
                    <p>• <strong>Ixequizumabe:</strong> 160 mg SC indução, seguido de 80 mg SC a cada 4 sem.</p>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-850">
                    Ação rápida com altas taxas de PASI 90 e PASI 100. Efeito adverso: risco de candidíase mucocutânea e exacerbação de Doença Inflamatória Intestinal (DII).
                  </p>
                </div>

                {/* Anti-IL23 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-purple-400 uppercase block">Inibidores de IL-23 (p19)</span>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <p>• <strong>Guselcumabe:</strong> 100 mg SC semanas 0, 4 e a cada 8 semanas.</p>
                    <p>• <strong>Risanquizumabe:</strong> 150 mg SC semanas 0, 4 e a cada 12 semanas (posologia trimestral!).</p>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-850">
                    Maior sustentabilidade de clareamento cutâneo completo a longo prazo com baixíssima frequência de aplicações.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. LÍQUEN PLANO */}
      {/* =================================================================== */}
      {activeDisease === 'liquen' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Dermatose Inflamatória Imunomediada Subaguda / Crônica
            </span>
            <h2 className="text-2xl font-black text-white">Líquen Plano: A Regra Mnemônica dos 5 Ps</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Dermatose inflamatória de etiologia autoimune mediada por linfócitos T citotóxicos CD8+ direcionados aos queratinócitos da camada basal epidérmica. Fortemente associado à infecção pelo <strong>Vírus da Hepatite C (HCV)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">Os 5 Ps Semiológicos do Líquen Plano</span>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>P</strong>ápulas e placas de contorno poligonal</li>
                <li>• <strong>P</strong>oligonais</li>
                <li>• <strong>P</strong>lanas no topo com superfície brilhante</li>
                <li>• <strong>P</strong>urpúricas / Violáceas</li>
                <li>• <strong>P</strong>ruriginosas intensamente (prurido paroxístico)</li>
              </ul>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <strong>Estrias de Wickham:</strong> Linhas brancas reticuladas patognomônicas visíveis à dermatoscopia sobre as pápulas e placas violáceas.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 block">Sítios Especiais & Histopatologia</span>
              <div className="space-y-2 text-slate-300 text-[11px]">
                <p>• <strong>Mucosa Oral (50% dos casos):</strong> Lesões esbranquiçadas rendilhadas na mucosa jugal bilateral. A forma erosiva oral tem potencial de malignização para CEC e exige biópsia.</p>
                <p>• <strong>Unhas (10%):</strong> Pterígio ungueal dorsal clássico (afinamento da lâmina com avanço da prega ungueal proximal dividindo a unha em duas metades).</p>
                <p>• <strong>Couro Cabeludo:</strong> Líquen plano pilar com alopecia cicatricial definitiva.</p>
                <p>• <strong>Histologia Clássica:</strong> Infiltrado linfocitário dérmico denso "em faixa", degeneração vacuolar da camada basal e corpos coloides (de Civatte).</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200">
                <strong>Conduta:</strong> Solicitar Sorologia para Hepatite C. 1ª linha com Corticoide tópico de alta potência (Clobetasol) sob oclusão; formas orais com Triancinolona em orabase; casos refratários com Prednisona oral curta ou Metotrexato.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. PITIRÍASE RÓSEA DE GIBERT */}
      {/* =================================================================== */}
      {activeDisease === 'gibert' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Erupção Exantemática Eritematodescamativa Benigna
            </span>
            <h2 className="text-2xl font-black text-white">Pitiríase Rósea de Gibert</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Doença inflamatória aguda e autolimitada que afeta principalmente adolescentes e adultos jovens (10 a 35 anos). Etiologia provável: reativação dos <strong>herpes-vírus humanos 6 e 7 (HHV-6 e HHV-7)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 block uppercase text-[11px]">1. Medalhão Inicial (Placa-Mãe)</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Placa ovalada eritematosa única de 2 a 5 cm no tronco, com fina descamação em colarete interno periférico voltado para o centro. Antecede a erupção generalizada em 1 a 2 semanas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 block uppercase text-[11px]">2. Distribuição em "Árvore de Natal"</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Erupção de múltiplas lesões menores semelhantes ao medalhão, distribuídas ao longo das linhas de clivagem cutânea de Langer no dorso e tronco, assumindo padrão de árvore de natal / abeto.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-300 block uppercase text-[11px]">3. O Grande Diferencial: Sífilis Secundária</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                <strong>Sempre solicitar VDRL / teste treponêmico!</strong> A sífilis secundária (roséola sifilítica) pode mimetizar Gibert, mas tipicamente acomete <strong>palmas e plantas</strong> (com colarete de Biett) e apresenta linfadenopatia epitroclear.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Tratamento & Conduta:</span>
              <span className="text-slate-400 text-[11px]">Doença benigna autolimitada (resolução espontânea em 4 a 8 semanas). Tranquilizar o paciente, prescrever anti-histamínicos se prurido e emolientes. Corticoide tópico leve apenas se sintomas exuberantes.</span>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. DERMATITE SEBORREICA */}
      {/* =================================================================== */}
      {activeDisease === 'seborreica' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Dermatose Inflamatória de Áreas Sebáceas
            </span>
            <h2 className="text-2xl font-black text-white">Dermatite Seborreica: Lactente vs Adulto</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Condição crônica e recidivante caracterizada por placas eritematosas com <strong>escamas gordurosas e amareladas</strong> em áreas de alta densidade de glândulas sebáceas (couro cabeludo, sobrancelhas, sulco nasogeniano, retroauricular e pré-esternal). Interação entre sebo, resposta imune inata e colonização por <em>Malassezia spp.</em>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">Forma do Lactente (Crosta Láctea)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Início precoce nas primeiras semanas de vida (pico 3 a 8 semanas) estimulada por andrógenos maternos residuais.
              </p>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• <strong>Localização:</strong> Vértice do couro cabeludo (escamas aderentes amareladas), face e área da fralda (poupa dobras).</li>
                <li>• <strong>Prognóstico:</strong> Autolimitada, resolve espontaneamente até 8-12 meses. Sem prurido relevante.</li>
                <li>• <strong>Manejo:</strong> Óleos vegetais mornos (óleo de amêndoas ou mineral) para amolecer escamas antes do banho com xampu suave neutro.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 block">Forma do Adulto & Marcadores de Risco</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Pico na puberdade e quarta década de vida. Curso crônico com exacerbação por estresse, privação de sono e clima frio.
              </p>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• <strong>Casos Graves / Atípicos:</strong> Dermatite seborreica grave, explosiva ou recalcitrante é marcador sentinela de <strong>infecção pelo HIV</strong> e <strong>Doença de Parkinson</strong> (pelo sebo excessivo por hipomimia).</li>
                <li>• <strong>Terapêutica do Couro Cabeludo:</strong> Xampus com Cetoconazol 2%, Ciclopirox olamina, Piritionato de zinco ou Ácido salicílico 2 a 3x/semana.</li>
                <li>• <strong>Face:</strong> Creme de Cetoconazol 2% 2x/dia ou Inibidores de Calcineurina (Tacrolimo 0,03% / Pimecrolimo 1%) para evitar atrofia por corticoide.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
