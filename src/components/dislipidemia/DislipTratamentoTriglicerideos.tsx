import React, { useState } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Pill, 
  Zap, 
  Heart, 
  UtensilsCrossed, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default function DislipTratamentoTriglicerideos() {
  const [activeTab, setActiveTab] = useState<'faixas' | 'fibratos' | 'protocolo_pancreatite' | 'omega3'>('faixas');

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-amber-950/20 via-card to-card border-amber-500/20">
        <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
          <Flame size={16} />
          <span>Manejo Clínico & Prevenção de Pancreatite</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
          Tratamento das Hipertrigliceridemias
        </h2>
        <p className="text-sm md:text-base text-ink-muted mt-2 max-w-3xl leading-relaxed">
          A abordagem dos triglicerídeos é <strong>bifurcada</strong>: em níveis moderados (150-499 mg/dL), o objetivo primordial é a <strong>prevenção do risco aterosclerótico</strong>; em níveis graves (&ge; 500 mg/dL), a prioridade absoluta passa a ser a <strong>prevenção e reversão de Pancreatite Aguda Necrosante</strong>.
        </p>

        {/* Abas */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-line">
          <button
            onClick={() => setActiveTab('faixas')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'faixas'
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Activity size={16} />
            <span>Classificação em 2 Faixas de Gravidade</span>
          </button>
          <button
            onClick={() => setActiveTab('fibratos')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'fibratos'
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Pill size={16} />
            <span>Fibratos (Fenofibrato vs Genfibrozila)</span>
          </button>
          <button
            onClick={() => setActiveTab('protocolo_pancreatite')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'protocolo_pancreatite'
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <ShieldAlert size={16} />
            <span>Protocolo de Pancreatite por TG (Insulina IV)</span>
          </button>
          <button
            onClick={() => setActiveTab('omega3')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'omega3'
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-card border border-line text-ink-muted hover:text-brand-navy"
            )}
          >
            <Sparkles size={16} />
            <span>Ômega-3 Purificado (REDUCE-IT)</span>
          </button>
        </div>
      </div>

      {/* ABA 1: AS 2 FAIXAS DE CONDUTA */}
      {activeTab === 'faixas' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-brand-navy">A Regra Prática dos 500 mg/dL: Risco CV vs Risco de Pancreatite</h3>
            <p className="text-xs text-ink-muted mt-1">
              O ponto de corte de 500 mg/dL divide categoricamente a estratégia terapêutica e a urgência médica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Faixa 1 */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-700 dark:text-amber-300">Faixa 1 (150 a 499 mg/dL)</span>
                <span className="text-xs font-bold text-amber-600">Risco Aterogênico</span>
              </div>
              <h4 className="font-bold text-brand-navy text-base">Hipertrigliceridemia Leve a Moderada</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Nesta faixa, o principal perigo é o <strong>aceleração da doença aterosclerótica</strong> (DAC e AVC), decorrente do excesso de partículas remanescentes ricas em colesterol e ApoB.
              </p>

              <div className="p-3 rounded-xl bg-card border border-line space-y-2 text-xs">
                <div className="font-bold text-brand-navy">Estratégia Terapêutica Obrigatória:</div>
                <ul className="list-disc pl-4 text-ink-muted space-y-1">
                  <li><strong>MEV Severa:</strong> Corte de carboidratos simples (açúcar, doces, refrigerantes, farinhas refinadas), perda de peso de 5% a 10% e corte absoluto de bebidas alcoólicas.</li>
                  <li><strong>Otimização do Risco CV:</strong> O fármaco inicial de escolha é a <strong>Estatina</strong> (que reduz triglicerídeos em 15-30% além de baixar o LDL).</li>
                  <li><strong>Controle de Comorbidades:</strong> Otimização do controle glicêmico no diabetes (preferir agonistas de GLP-1 ou iSGLT2 que auxiliam na redução ponderal).</li>
                  <li>Se LDL na meta e TG persistir entre 150-499 em alto risco: avaliar <strong>Icosapente de etila (EPA purificado) 4g/dia</strong>.</li>
                </ul>
              </div>
            </div>

            {/* Faixa 2 */}
            <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/20 text-red-600">Faixa 2 (&ge; 500 mg/dL)</span>
                <span className="text-xs font-bold text-red-600">Emergência de Pancreatite</span>
              </div>
              <h4 className="font-bold text-brand-navy text-base">Hipertrigliceridemia Grave a Muito Grave</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Nesta faixa, a LPL satura e há acúmulo de quilomícrons. O risco iminente que ameaça a vida é a <strong>Pancreatite Aguda</strong>, que sobrepuja temporariamente o foco no LDL-c.
              </p>

              <div className="p-3 rounded-xl bg-card border border-line space-y-2 text-xs">
                <div className="font-bold text-brand-navy">Estratégia Terapêutica Imediata:</div>
                <ul className="list-disc pl-4 text-ink-muted space-y-1">
                  <li><strong>Fármaco de 1ª Linha Obrigatório:</strong> Iniciar imediatamente <strong>Fibrato</strong> (Fenofibrato 160-200 mg/dia ou Ciprofibrato 100 mg/dia) para forçar a depuração de triglicerídeos em até 50%.</li>
                  <li><strong>Dieta Ultra-Restrita em Gorduras:</strong> Reduzir o teor lipídico da dieta para menos de 10% a 15% das calorias diárias imediatas, secando o aporte de quilomícrons exógenos.</li>
                  <li><strong>Corte Imediato de Álcool:</strong> O álcool pode deflagrar crise imediata de pancreatite necrotizante nesse substrato.</li>
                  <li>Uma vez que os TG baixem de 500 mg/dL, reavalia-se a introdução/titulação de estatinas para controle do LDL.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: FIBRATOS */}
      {activeTab === 'fibratos' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-brand-navy">Fibratos: Mecanismo & A Regra de Segurança da Genfibrozila</h3>
            <p className="text-xs text-ink-muted mt-1">
              Agonistas dos receptores nucleares <strong>PPAR-&alpha;</strong>. Induzem a expressão gênica de LPL e ApoA-I, e reduzem a secreção hepática de VLDL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fenofibrato */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/20 px-2 py-0.5 rounded">Fibrato de Escolha</span>
                <span className="text-xs font-bold text-emerald-600">SEGURO COM ESTATINA</span>
              </div>
              <h4 className="font-bold text-brand-navy text-base">Fenofibrato (160 a 200 mg/dia)</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                É o único fibrato com segurança amplamente comprovada para uso concomitante com estatinas (estudo ACCORD Lipid).
              </p>
              <div className="text-xs text-ink-muted space-y-1.5 pt-1">
                <div><strong>Dose habitual:</strong> 160 mg (padrão) ou 200 mg (micronizado) 1x ao dia junto à refeição.</div>
                <div><strong>Mecanismo de segurança:</strong> É metabolizado por glicuronidação via UGT2B7 (diferente da via de degradação das estatinas), não interferindo no nível plasmático das estatinas.</div>
              </div>
            </div>

            {/* Genfibrozila */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-500/20 px-2 py-0.5 rounded">Interação Perigosa</span>
                <span className="text-xs font-bold text-red-600">CONTRAINDICADO COM ESTATINA</span>
              </div>
              <h4 className="font-bold text-brand-navy text-base">Genfibrozila (600 mg 2x/dia)</h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                <strong>NUNCA ASSOCIAR GENFIBROZILA COM NENHUMA ESTATINA!</strong>
              </p>
              <div className="text-xs text-ink-muted space-y-1.5 pt-1">
                <div><strong>Motivo Farmacocinético:</strong> A genfibrozila inibe fortemente a enzima <strong>UGT1A1</strong> e o transportador hepático <strong>OATP1B1</strong>.</div>
                <div className="text-red-600 font-bold">
                  &rarr; Multiplica a concentração sérica das estatinas em até 15 vezes, elevando em mais de 15 a 30 vezes o risco de rabdomiólise fatal e insuficiência renal aguda.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line text-xs text-ink-muted space-y-2">
            <strong className="text-brand-navy block">Outros Fibratos Utilizados na Prática:</strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-card border border-line">
                <strong>Ciprofibrato (100 mg 1x/dia):</strong> Muito prescrito no Brasil. Boa eficácia hipolipemiante, porém também deve ser associado com estatinas com extrema cautela e monitoramento clínico.
              </div>
              <div className="p-2.5 rounded-xl bg-card border border-line">
                <strong>Bezafibrato (200 mg 2-3x/dia ou LP 400 mg 1x/dia):</strong> Agonista pan-PPAR (&alpha;, &gamma;, &delta;), útil em pacientes com síndrome metabólica.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: PROTOCOLO DE PANCREATITE POR TG */}
      {activeTab === 'protocolo_pancreatite' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn border-l-4 border-l-red-600">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-600/10 text-red-600">
              <Flame size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Conduta Hospitalar & Terapia Intensiva</span>
              <h3 className="text-xl font-bold text-brand-navy">Protocolo de Insulina IV na Pancreatite Aguda por TG</h3>
            </div>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            Indicado para pacientes internados com pancreatite aguda e <strong>TG &gt; 1.000 mg/dL</strong> (ou &gt; 500 mg/dL com dor refratária e piora laboratorial). A insulina ativa a Lipoproteína Lipase (LPL) endotelial e inibe a lipase hormônio-sensível nos adipócitos, depurando rapidamente os quilomícrons.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">1</span>
                Medidas Gerais Imediatas
              </h4>
              <ul className="text-xs text-ink-muted list-disc pl-4 space-y-1">
                <li><strong>Jejum oral absoluto (NPO):</strong> Zera a entrada de novos quilomícrons intestinais.</li>
                <li><strong>Ressuscitação volêmica vigorosa:</strong> Ringer Lactato venoso (meta de diurese &ge; 0,5 - 1 mL/kg/h).</li>
                <li><strong>Analgesia multimodal eficaz:</strong> Opioides conforme necessidade.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-3">
              <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">2</span>
                Protocolo de Infusão de Insulina Regular Contínua
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink-muted">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <strong>Preparo & Dose da Insulina:</strong>
                  <p className="mt-1">
                    Insulina Regular na dose de <strong>0,1 a 0,3 U/kg/hora</strong> em bomba de infusão contínua contínua (ex: 100 UI em 100 mL de SF 0,9%).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <strong>Aporte Concomitante de Glicose:</strong>
                  <p className="mt-1">
                    Infusão paralela contínua de <strong>Soro Glicosado a 5% ou 10%</strong> para manter rigorosamente a glicemia capilar entre <strong>150 e 200 mg/dL</strong> e prevenir hipoglicemias.
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 text-red-900 dark:text-red-200 text-xs font-semibold">
                Meta Terapêutica: Manter a infusão contínua até os níveis séricos de triglicerídeos caírem para <strong>abaixo de 500 mg/dL</strong> (habitualmente em 24 a 48 horas).
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-line space-y-2">
              <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">3</span>
                Quando Indicar Plasmaférese (Aférese Lipídica)?
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Reservada para pacientes refratários à insulinoterapia com <strong>sinais de disfunção orgânica progressiva</strong> (choque, falência respiratória/SDRA, acidose láctica severa) ou em centros com disponibilidade imediata. Consegue clarear até 70% dos triglicerídeos em uma única sessão de 2 a 4 horas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ABA 4: OMEGA 3 (REDUCE-IT) */}
      {activeTab === 'omega3' && (
        <div className="card p-6 md:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Ácidos Graxos Poli-insaturados</span>
              <h3 className="text-xl font-bold text-brand-navy">Ômega-3 & O Estudo REDUCE-IT (Icosapente de Etila)</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-xs text-ink-muted leading-relaxed">
              <h4 className="font-bold text-brand-navy text-sm">O Conceito do EPA Purificado:</h4>
              <p>
                Nem todo suplemento de ômega-3 é igual. O ensaio clínico internacional <strong>REDUCE-IT (NEJM)</strong> utilizou uma molécula farmacológica altamente purificada: o <strong>Icosapente de etila (IPE - éster etílico do ácido eicosapentaenoico / EPA puro) na dose de 4 g/dia</strong> (2g 2x/dia com alimentos).
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Pacientes com doença cardiovascular estabelecida ou diabéticos com fatores de risco em uso de estatina com LDL controlado e <strong>TG entre 135 e 499 mg/dL</strong>.</li>
                <li><strong>Resultado Impactante:</strong> Redução relativa de <strong>25% em eventos cardiovasculares maiores (MACE)</strong> e redução de 20% na mortalidade cardiovascular.</li>
                <li><em>Efeito adverso documentado:</em> Discreto aumento na incidência de fibrilação atrial / flutter atrial (3,1% vs 2,1%).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-line space-y-3">
              <h4 className="font-bold text-brand-navy text-sm flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Por que cápsulas de balcão (EPA + DHA) falharam?
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Estudos com formulações convencionais contendo mistura de EPA e <strong>DHA</strong> (como o estudo <em>STRENGTH</em>) foram interrompidos precocemente por futilidade.
              </p>
              <div className="p-3 rounded-xl bg-card border border-line text-xs space-y-1">
                <div>&bull; O DHA, ao contrário do EPA purificado, pode elevar os níveis de LDL-c e não possui os mesmos efeitos estabilizadores de membrana endotelial e antioxidantes.</div>
                <div>&bull; Além disso, as cápsulas comerciais livres de balcão costumam conter apenas 300 a 500 mg de ômega-3 por cápsula (dose muito inferior à dose terapêutica de 4g/dia).</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
