import React, { useState } from 'react';
import { 
  Activity, AlertTriangle, ShieldAlert, CheckCircle2, 
  Layers, Stethoscope, Search, Info, ArrowRight, Dna, Flame
} from 'lucide-react';

export default function TPPFisiopatologiaDiagnostico() {
  const [activeTab, setActiveTab] = useState<'fisiopatologia' | 'fatores' | 'sludge' | 'clinica' | 'diagnostico'>('fisiopatologia');

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <Activity size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Trabalho de Parto Prematuro · Eixo 1
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Fisiopatologia, Quadro Clínico e Diagnóstico
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          O parto pré-termo <strong>não é uma doença única</strong>, mas sim uma <strong>via comum final</strong> ativada por múltiplos insultos biológicos. O diagnóstico correto exige diferenciar contrações fisiológicas de modificação cervical ativa.
        </p>

        {/* NAVEGAÇÃO INTERNA */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {[
            { id: 'fisiopatologia', label: '1. As 4 Vias Fisiopatológicas' },
            { id: 'fatores', label: '2. Fatores de Risco' },
            { id: 'sludge', label: '3. Sludge Amniótico' },
            { id: 'clinica', label: '4. Clínica & Diagnóstico Diferencial' },
            { id: 'diagnostico', label: '5. Diagnóstico Objetivo (USG & fFN)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-900/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. AS 4 VIAS FISIOPATOLÓGICAS */}
      {activeTab === 'fisiopatologia' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <Dna size={20} />
              <span>As Quatro Vias que Convergem no Mesmo Evento Molecular</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Degradação de Matriz & Contrações</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Todos os quatro mecanismos convergem para a ativação de <strong>prostaglandinas (PGE2 e PGF2&alpha;)</strong> e <strong>metaloproteinases de matriz (MMPs)</strong>, que degradam a matriz extracelular do colo e sensibilizam o miométrio à contração uterina.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Flame size={16} />
                <span>1. Inflamação / Infecção (Via Dominante Precoce)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Via mais frequente nos partos pré-termo muito precoces (&lt; 30-32 semanas). Bactérias ascendem a partir da vagina/colo, ativando citocinas pró-inflamatórias (<strong>IL-6, IL-8, TNF-&alpha;</strong>) que estimulam massivamente prostaglandinas e MMPs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Activity size={16} />
                <span>2. Hemorragia Decidual</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Descolamento coriodéciduo oculto ou sangramentos de repetição expõem <strong>trombina</strong> tecidual. A trombina exerce potente ação uterotônica direta sobre os miócitos e ativa as mesmas MMPs de degradação cervical.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Layers size={16} />
                <span>3. Distensão Uterina Excessiva</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Presente na gemelaridade e no polidrâmnio. O estiramento mecânico das fibras miometriais promove regulação positiva de <strong>receptores de ocitocina</strong> e formação de <em>gap junctions</em> (conexinas) entre os miócitos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <ShieldAlert size={16} />
                <span>4. Estresse Materno-Fetal-Placentário</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Condições de isquemia placentária ou estresse materno ativam precocemente o eixo hipotálamo-hipófise-adrenal (HHA) fetal e materno, aumentando a síntese de <strong>CRH placentário</strong>, cortisol fetal e cascata de prostaglandinas.
              </p>
            </div>
          </div>

          {/* PONTO-CHAVE */}
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 text-xs text-amber-200 space-y-1.5">
            <span className="font-black uppercase tracking-wider text-[11px] text-amber-300 block">
              Ponto-Chave da Aula:
            </span>
            <p className="leading-relaxed">
              As quatro vias convergem no mesmo evento final (contração + esvaecimento do colo), mas o <strong>gatilho inicial muda radicalmente a conduta</strong>. Tratar uma infecção urinária, por exemplo, não resolve prematuridade desencadeada por sobredistensão uterina em gêmeos.
            </p>
          </div>
        </div>
      )}

      {/* 2. FATORES DE RISCO */}
      {activeTab === 'fatores' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <AlertTriangle size={20} className="text-amber-400" />
              <span>Estratificação de Fatores de Risco</span>
            </div>
            <span className="text-xs font-mono text-slate-400">História Prévia vs Gestação Atual</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-amber-400 text-sm block">História Obstétrica Pregressa</span>
              <ul className="space-y-2 text-slate-300">
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Parto prematuro prévio:</strong> é o maior preditor isolado de recorrência (risco relativo de 2 a 4 vezes).
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Perda gestacional tardia (2º trimestre):</strong> sugestivo de insuficiência istmocervical ou incompetência cervical.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Cirurgia cervical prévia:</strong> conização a frio, CAF (cirurgia de alta frequência) ou traquelectomia.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Malformações uterinas:</strong> útero bicorno, septado ou unicorno.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-cyan-400 text-sm block">Fatores da Gestação Atual</span>
              <ul className="space-y-2 text-slate-300">
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Colo curto ao USG transvaginal:</strong> comprimento &le; 25 mm entre 18 e 24 semanas.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Gestação múltipla:</strong> sobredistensão miometrial com ativação precoce de receptores.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Sangramento vaginal de repetição:</strong> exposição tecidual à trombina.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Infecção genital ou urinária ativa:</strong> vaginose bacteriana, ITU, pielonefrite, corioamnionite subclínica.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. SLUDGE AMNIÓTICO */}
      {activeTab === 'sludge' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <Search size={20} />
              <span>Sludge Amniótico e Invasão Microbiana Subclínica</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Achado Ultrassonográfico</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              O <strong>sludge amniótico</strong> (barro amniótico) é a tradução ultrassonográfica de um processo inflamatório/infeccioso subclínico: bactérias ascendem pela vagina, cruzam o colo uterino (processo facilitado se o colo já estiver encurtado) e colonizam a região próxima ao orifício interno.
            </p>
            <p>
              Isso gera um <strong>exsudato inflamatório</strong> rico em neutrófilos, citocinas e biofilme microbiano, visível ao USG como material ecogênico particulado flutuando ou decantado junto ao orifício interno do colo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
              <span className="font-bold text-amber-300 text-sm block">Sludge como Marcador Substituto (*Proxy*)</span>
              <p className="text-slate-300 leading-relaxed">
                O sludge é um <em>proxy</em> de invasão microbiana da cavidade amniótica, e <strong>não um diagnóstico etiológico isolado</strong>. O diagnóstico definitivo com identificação bacteriana exige amniocentese (cultura, glicose &lt; 14 mg/dL, gram e IL-6).
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <strong>Sludge denso (*dense sludge*)</strong> associa-se de forma muito mais forte à invasão microbiana do que sludge discreto (*light sludge*).
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
              <span className="font-bold text-rose-300 text-sm block">Impacto Prognóstico e Resposta à Tocólise</span>
              <p className="text-slate-300 leading-relaxed">
                A associação de <strong>colo curto + sludge</strong> confere risco de parto prematuro substancialmente maior do que colo curto isolado.
              </p>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/80 text-[11px] text-rose-200 font-medium">
                <strong>Atenção Clínica:</strong> A resposta à tocólise tende a ser significativamente pior nesse subgrupo, pois a tocólise inibe temporariamente a contração, mas não trata a causa infecciosa de base que continua destruindo o colágeno cervical.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CLÍNICA & DIAGNÓSTICO DIFERENCIAL */}
      {activeTab === 'clinica' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Stethoscope size={20} className="text-amber-400" />
              <span>Quadro Clínico e Diagnóstico Diferencial</span>
            </div>
            <span className="text-xs font-mono text-slate-400">20 a 36 semanas + 6 dias</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Info size={16} />
              <span>Critério Operacional das Contrações:</span>
            </div>
            <p>
              Presença de contrações uterinas dolorosas e regulares: <strong>pelo menos 4 contrações em 20 minutos OU 8 em 60 minutos</strong> entre 20 e 37 semanas.
            </p>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-amber-200 font-semibold">
              Regra de Ouro da Aula: A maioria das gestantes sintomáticas com essas contrações <em>não evolui para parto verdadeiro em 7 dias</em>. Contração isolada não define TPP — quem define é a associação obrigatória com <strong>modificação cervical progressiva</strong> (dilatação e apagamento).
            </div>
          </div>

          {/* TABELA: PODE SIMULAR VS NÃO PODE PERDER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-slate-300 text-sm block">Pode Simular TPP (Benignos/Outros)</span>
              <ul className="space-y-2 text-slate-400">
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Contrações de Braxton Hicks:</strong> irregulares, arrítmicas, indolores ou pouco dolorosas, sem qualquer alteração no colo.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Infecção do Trato Urinário (ITU):</strong> cistite com disúria e irritabilidade vesical provocando cólicas reflexas.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Dor ligamentar (ligamento redondo):</strong> dor aguda em fisgada em fossas ilíacas desencadeada por mudanças posturais.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white">Desidratação / Gastroenterite:</strong> liberação fisiológica reflexa de ADH e ocitocina com aumento da contratilidade.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-3">
              <span className="font-bold text-rose-400 text-sm block">NÃO PODE PERDER (Emergências Graves)</span>
              <ul className="space-y-2 text-slate-300">
                <li className="p-2.5 rounded-xl bg-slate-900 border border-rose-900/40">
                  <strong className="text-rose-300">Descolamento Prematuro de Placenta (DPP):</strong> dor súbita intensa, hipertonia uterina ("útero em tábua"), sangramento escuro e sofrimento fetal agudo.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-rose-900/40">
                  <strong className="text-rose-300">Corioamnionite clínica:</strong> febre materna (&ge; 37,8°C), dor uterina, secreção purulenta fétida e taquicardia materno-fetal.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-rose-900/40">
                  <strong className="text-rose-300">Rotura Prematura de Membranas (RPM):</strong> perda líquida franca; exige especuloscopia antes de toque digital.
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-rose-900/40">
                  <strong className="text-rose-300">Sofrimento Fetal Agudo:</strong> desacelerações variáveis ou tardias recorrentes e perda de variabilidade na CTG.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 5. DIAGNÓSTICO OBJETIVO */}
      {activeTab === 'diagnostico' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Search size={20} />
              <span>Ferramentas Diagnósticas e Sequência Lógica</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Alto Valor Preditivo Negativo (VPN)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-white text-sm">Sequência Lógica de Abordagem na Emergência:</span>
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <span>1. Estabilidade Materna</span>
              <ArrowRight size={14} />
              <span>2. Bem-Estar Fetal (BCF / CTG)</span>
              <ArrowRight size={14} />
              <span>3. Probabilidade Real de Parto em 7 dias</span>
            </div>
            <p className="text-[11px] text-amber-300 font-medium pt-1">
              *Nota crucial dos slides:* <strong>Exame especular vem sempre antes de toque digital</strong> quando há qualquer suspeita de bolsa rota!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 text-sm block">1. Comprimento Cervical (USG-TV)</span>
              <p className="text-slate-300 leading-relaxed">
                Maior valor prático pelo seu <strong>altíssimo Valor Preditivo Negativo (&gt; 95%)</strong>: um colo longo (&gt; 30 mm) e fechado exclui trabalho de parto iminente nos próximos 7 a 14 dias com excelente confiança.
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                Colo &le; 25 mm antes de 24 sem aumenta risco populacional, mas não fecha diagnóstico agudo isolado sem contração ativa.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 text-sm block">2. Fibronectina Fetal (fFN)</span>
              <p className="text-slate-300 leading-relaxed">
                Glicoproteína da matriz extracelular entre a decídua e o córion. Teste extremamente útil na <strong>"zona cinzenta" (colo entre 20 e 30 mm)</strong>.
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                Mesma lógica de alto VPN: <strong>fFN negativa (&lt; 50 ng/mL)</strong> afasta parto em 7-14 dias (&gt; 99% de chance de não parir), permitindo alta segura e evitando internações e tocolíticos desnecessários.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">3. Exames de Exclusão</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Urina tipo 1 e urocultura com TSA:</strong> pesquisa de infecção urinária oculta.</li>
                <li><strong>Hemograma e PCR:</strong> triagem de processo infeccioso sistêmico.</li>
                <li><strong>Rastreio para EGB:</strong> swab vaginal/retal se idade gestacional &ge; 35 sem ou antes se alto risco.</li>
                <li><strong>USG obstétrico:</strong> estimativa de peso fetal, líquido amniótico, placenta e apresentação fetal.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
