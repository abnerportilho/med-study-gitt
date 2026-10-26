import React, { useState } from 'react';
import { 
  Layers, ShieldCheck, Activity, Dna, ArrowRight, 
  Baby, AlertTriangle, CheckCircle2, ChevronRight, Info
} from 'lucide-react';

export default function UroAnatomiaFisiopato() {
  const [selectedTopic, setSelectedTopic] = useState<'delancey' | 'petros' | 'parto' | 'epidemiologia'>('delancey');

  return (
    <div className="space-y-6">
      {/* CARD INTRODUTÓRIO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
              Eixo 1 • Fundamentos Anatômicos e Fisiopatologia
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Anatomia do Assoalho Pélvico & Mecanismos de Lesão
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Base biomecânica das distopias urogenitais e da incontinência urinária: os 3 Níveis de DeLancey, a Teoria Integral de Petros & Ulmsten, a denervação neuromuscular no parto vaginal e a epidemiologia baseada em evidências.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-300 self-start md:self-auto">
            Aula Prof. Dr. André Bernardo
          </div>
        </div>

        {/* NAVEGAÇÃO DE SUB-TÓPICOS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setSelectedTopic('delancey')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'delancey'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>1. Níveis de DeLancey</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setSelectedTopic('petros')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'petros'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>2. Teoria de Petros</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setSelectedTopic('parto')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'parto'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>3. Lesão no Parto</span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setSelectedTopic('epidemiologia')}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between ${
              selectedTopic === 'epidemiologia'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>4. Risco & Epidemiologia</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 1. NÍVEIS DE DELANCEY (1994) */}
      {selectedTopic === 'delancey' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Layers className="text-cyan-400" size={20} />
                Os Três Níveis de Sustentação Vaginal de DeLancey (1994)
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Padrão Anatômico Mundial
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              John O. DeLancey descreveu a ancoragem vaginal em 3 níveis integrados. A perda de integridade em cada nível determina sítios específicos de prolapso e sintomas clínicos distintos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* NÍVEL I */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-mono font-bold text-sm">NÍVEL I</span>
                  <span className="text-[10px] font-semibold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Suspensão Apical
                  </span>
                </div>
                <h4 className="text-white font-bold text-sm">Ápice Vaginal e Colo Uterino</h4>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p><strong>Estruturas-chave:</strong> Ligamentos uterossacrais (USL) e ligamentos cardinais (paramétrios e paracolpos superiores).</p>
                  <p><strong>Função:</strong> Suspensão vertical do ápice vaginal em direção à fáscia pré-sacral e espinha isquiática.</p>
                  <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 mt-2">
                    <strong>Defeito Clínico:</strong> Prolapso uterino (histerocele), prolapso de cúpula pós-histerectomia e enterocele de cúpula.
                  </div>
                </div>
              </div>

              {/* NÍVEL II */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-mono font-bold text-sm">NÍVEL II</span>
                  <span className="text-[10px] font-semibold bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">
                    Fixação Lateral
                  </span>
                </div>
                <h4 className="text-white font-bold text-sm">Terço Médio da Vagina</h4>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p><strong>Estruturas-chave:</strong> Fáscia pubocervical (anterior) e septo retovaginal (posterior), ancorados lateralmente ao Arco Tendíneo da Fáscia Pélvica (ATFP).</p>
                  <p><strong>Função:</strong> Sustentação em "rede" das paredes vaginais anterior e posterior contra a bexiga e o reto.</p>
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-amber-300 mt-2">
                    <strong>Defeito Clínico:</strong> Defeito anterior gera <strong>cistocele</strong> (central ou paravaginal); defeito posterior gera <strong>retocele</strong> média.
                  </div>
                </div>
              </div>

              {/* NÍVEL III */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-mono font-bold text-sm">NÍVEL III</span>
                  <span className="text-[10px] font-semibold bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Fusão Distal
                  </span>
                </div>
                <h4 className="text-white font-bold text-sm">Terço Inferior & Períneo</h4>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p><strong>Estruturas-chave:</strong> Fusão da uretra distal e vagina ao Corpo Perineal e músculos perineais (bulboesponjoso, isquiocavernoso e transverso superficial).</p>
                  <p><strong>Função:</strong> Fechamento do hiato urogenital e suporte da uretra distal.</p>
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/60 text-purple-300 mt-2">
                    <strong>Defeito Clínico:</strong> Uretrocele, hiato genital alargado (falha perineal), rotura perineal de 2º/3º grau e enteroceles distais.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TEORIA INTEGRAL DE PETROS & ULMSTEN (1990) */}
      {selectedTopic === 'petros' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="text-cyan-400" size={20} />
                Teoria Integral de Petros e Ulmsten (1990)
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Complexo de Forças
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Petros e Ulmsten revolucionaram o entendimento da continência urinária e dos prolapsos: a uretra e a bexiga funcionam como uma ponte pênsil. A continência depende do equilíbrio entre três eixos de forças ligamentares e fascias:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Complexo de Força Anterior
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Ligamento Pubouretral (PUL):</strong> Conecta a porção média da uretra à face posterior da sínfise púbica.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <p>• Ponto de apoio para o fechamento uretral durante o esforço súbito.</p>
                  <p>• Sua fraqueza causa <strong>hipermobilidade do colo vesical e IUE</strong>.</p>
                  <p>• É exatamente onde os <em>slings</em> de uretra média (TVT/TOT) são ancorados para restaurar o suporte.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Complexo Superior / Lateral
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Arco Tendíneo da Fáscia Endopélvica (ATFP):</strong> Condensação fibrosa estendendo-se do púbis à espinha isquiática.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <p>• Onde a fáscia pubocervical se apoia lateralmente.</p>
                  <p>• O descolamento lateral da fáscia do ATFP gera a <em>cistocele paravaginal</em>.</p>
                  <p>• Restaurado na colpoplastia anterior sítio-específica com reinserção da fáscia.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Complexo de Força Posterior
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Ligamentos Uterossacrais (USL):</strong> Ancoram o colo e a vagina posterior ao sacro.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <p>• Mantêm o eixo vaginal horizontalizado sobre a placa do elevador.</p>
                  <p>• A ruptura dos USL permite a descida do ápice e abertura do fundo de saco posterior.</p>
                  <p>• Alvo cirúrgico na colpopexia sacroespinhosa e sacrocolpopexia.</p>
                </div>
              </div>
            </div>

            {/* A ANALOGIA DA PONTE PÊNSIL */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800 flex items-start gap-3">
              <Info className="text-cyan-400 mt-0.5 shrink-0" size={18} />
              <div className="text-xs text-slate-300 space-y-1">
                <strong className="text-cyan-300 block">A Uretra como Ponte Pênsil (Hammock Hypothesis):</strong>
                <p>
                  A uretra não possui sustentação rígida intrínseca suficiente para resistir a aumentos súbitos de pressão intra-abdominal (tosse ou espirro). Ela repousa sobre a parede vaginal anterior e a fáscia pubocervical como um leito em rede (*hammock*). Quando a pressão aumenta, a uretra é comprimida contra esse leito firme, ocluindo sua luz. Se o leito cede ou os ligamentos afrouxam, a uretra desliza e ocorre perda urinária de esforço (IUE).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FISIOPATOLOGIA DA LESÃO NO PARTO */}
      {selectedTopic === 'parto' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Baby className="text-cyan-400" size={20} />
                Mecanismos de Lesão Neuromuscular no Parto Vaginal
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                Evidências Histopatológicas
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O parto vaginal com passagem do polo cefálico estira as fibras musculares do elevador do ânus além de 200% do seu comprimento basal, gerando neuropatia por estiramento e compressão direta:
            </p>

            {/* CASCATA DE LESÃO NEUROMUSCULAR */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-mono text-[10px] font-bold">ETAPA 1</span>
                <strong className="text-white block">Compressão Fetal</strong>
                <p className="text-slate-400 text-[11px]">Passagem do feto (especialmente &gt; 4.000g) comprimindo assoalho e canal de parto.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-mono text-[10px] font-bold">ETAPA 2</span>
                <strong className="text-white block">Tração do Nervo</strong>
                <p className="text-slate-400 text-[11px]">Estiramento grave do <strong>nervo pudendo</strong> nos ramos motores periféricos.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-mono text-[10px] font-bold">ETAPA 3</span>
                <strong className="text-white block">Dano Neuromuscular</strong>
                <p className="text-slate-400 text-[11px]">Perda de axônios motores e degeneração waleriana das fibras musculares inervadas.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-mono text-[10px] font-bold">ETAPA 4</span>
                <strong className="text-white block">Reinervação Anômala</strong>
                <p className="text-slate-400 text-[11px]">Axônios remanescentes assumem múltiplas fibras, gerando unidades motoras gigantes ineficientes.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-1.5">
                <span className="text-rose-400 font-mono text-[10px] font-bold">DESFECHO</span>
                <strong className="text-rose-300 block">Falha de Contração</strong>
                <p className="text-slate-300 text-[11px]">Contrações menos rápidas e menos eficazes para responder a aumentos bruscos de pressão.</p>
              </div>
            </div>

            {/* ESTUDO DE GILPIN ET AL & TESTE DO NERVO PUDENDO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Activity size={16} />
                  Biópsia Muscular do Puborretal (Gilpin et al.)
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    A biópsia do músculo puborretal após parto vaginal comprovou:
                  </p>
                  <p className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Fibras tipo I (lentas):</strong> Densidade preservada ou normal.
                  </p>
                  <p className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Fibras tipo II (rápidas):</strong> <strong>Diminuição acentuada</strong>, principalmente na porção posterior comprimida pelo polo cefálico no parto.
                  </p>
                  <p className="text-slate-400">
                    São justamente as fibras tipo II que realizam o reflexo de fechamento uretral instantâneo durante a tosse ou risada!
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Dna size={16} />
                  Testes de Condução do Nervo Pudendo
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    A latência motora terminal do nervo pudendo (PMLT) avalia a condução elétrica. No pós-parto, observam-se lesões parciais com denervação nos seguintes grupamentos:
                  </p>
                  <ul className="space-y-1 text-slate-300 pl-2">
                    <li>• <strong>Músculo Pubococcígeo</strong> (apoio visceral)</li>
                    <li>• <strong>Músculo Esfíncter Anal Externo</strong> (incontinência anal e de flatos)</li>
                    <li>• <strong>Músculo Estriado Periuretral</strong> (esfíncter uretral externo rhabdosphincter)</li>
                  </ul>
                  <p className="text-amber-400/90 text-[10px] mt-1">
                    Isso explica a coexistência frequente de IUE e incontinência para flatos em multíparas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EPIDEMIOLOGIA & ODDS RATIO */}
      {selectedTopic === 'epidemiologia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <Activity className="text-cyan-400" size={20} />
                Epidemiologia e Fatores de Risco (Prof. Dr. André Bernardo)
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                11 a 19% Risco Cirúrgico
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Cerca de <strong>11 a 19% das mulheres necessitarão de cirurgia para prolapso ou incontinência</strong> ao longo da vida, sendo um dado cronicamente subestimado pelo pudor e constrangimento das pacientes.
            </p>

            {/* TABELA DE ODDS RATIO DOS SLIDES */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3.5">Variável Clínica / Obstétrica</th>
                    <th className="p-3.5 text-center">Valor de p</th>
                    <th className="p-3.5 text-center">Odds Ratio (IC 95%)</th>
                    <th className="p-3.5">Significado Prático</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr className="bg-rose-950/20">
                    <td className="p-3.5 font-bold text-rose-300">Pelo menos um parto normal</td>
                    <td className="p-3.5 text-center font-mono font-bold text-cyan-400">0,005</td>
                    <td className="p-3.5 text-center font-mono font-bold text-rose-400">7,22 (1,84 – 28,27)</td>
                    <td className="p-3.5 text-slate-300 text-[11px]">Principal fator de risco isolado para prolapso genital e defeito fascial.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Peso do RN &gt; 4.000g (Macrossomia)</td>
                    <td className="p-3.5 text-center font-mono text-cyan-400">0,014</td>
                    <td className="p-3.5 text-center font-mono text-amber-400">2,90 (1,24 – 6,79)</td>
                    <td className="p-3.5 text-slate-300 text-[11px]">Hiperdistensão e compressão prolongada do canal de parto.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">História familiar positiva</td>
                    <td className="p-3.5 text-center font-mono text-cyan-400">0,038</td>
                    <td className="p-3.5 text-center font-mono text-amber-400">2,27 (1,04 – 4,90)</td>
                    <td className="p-3.5 text-slate-300 text-[11px]">Predisposição genética à composição do colágeno pélvico.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Índice de Massa Corpórea (IMC)</td>
                    <td className="p-3.5 text-center font-mono text-cyan-400">0,025</td>
                    <td className="p-3.5 text-center font-mono text-slate-300">1,08 (1,00 – 1,10)</td>
                    <td className="p-3.5 text-slate-300 text-[11px]">Aumento crônico permanente da pressão intra-abdominal.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Idade avançada</td>
                    <td className="p-3.5 text-center font-mono text-cyan-400">0,020</td>
                    <td className="p-3.5 text-center font-mono text-slate-300">1,05 (1,00 – 1,10)</td>
                    <td className="p-3.5 text-slate-300 text-[11px]">Envelhecimento tecidual e hipoestrogenismo na menopausa.</td>
                  </tr>
                  <tr className="bg-emerald-950/20">
                    <td className="p-3.5 font-bold text-emerald-300">Partos Cesarianos exclusivos</td>
                    <td className="p-3.5 text-center font-mono font-bold text-cyan-400">0,006</td>
                    <td className="p-3.5 text-center font-mono font-bold text-emerald-400">0,43 (0,24 – 0,78)</td>
                    <td className="p-3.5 text-slate-300 text-[11px]">Efeito protetor relativo frente ao estiramento e avulsão do assoalho.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-400">Partos com fórceps</td>
                    <td className="p-3.5 text-center font-mono text-slate-400">0,820</td>
                    <td className="p-3.5 text-center font-mono text-slate-400">1,00 (0,59 – 1,91)</td>
                    <td className="p-3.5 text-slate-400 text-[11px]">Variável sem significância estatística isolada neste modelo multivariado.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DEMAIS FATORES E ESTUDO EPICONT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 text-sm block">Alterações do Colágeno & Condições Sistêmicas:</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Síndromes de Ehlers-Danlos e Marfan:</strong> Colágeno III frouxo com altíssimo risco de prolapso mesmo em nuligestas.</li>
                  <li>• <strong>Deficiência de estrogênio (Menopausa):</strong> Diminui a síntese e altera a razão colágeno tipo I / tipo III, afinando a mucosa vaginal.</li>
                  <li>• <strong>Grupos Étnicos:</strong> Mulheres brancas têm maior prevalência; asiáticas e negras apresentam menor risco basal.</li>
                  <li>• <strong>Aumento de pressão abdominal:</strong> Constipação crônica, DPOC/tosse crônica e trabalho braçal pesado.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 text-sm block">O Marco do Estudo EPICONT (15.307 Mulheres):</strong>
                <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    Após homogeneização quanto à idade:
                  </p>
                  <p className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    • Frequência de IUE em parto vaginal vs nuligestas: <strong>OR 3,0 (IC 2,5 – 3,5)</strong>.
                  </p>
                  <p className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    • Parto cesáreo vs nuligestas: <strong>OR 1,4 (IC 1,0 – 2,0)</strong>.
                  </p>
                  <p className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    • <strong>Após 5 anos do primeiro parto:</strong> Risco de IUE aumentou com <strong>OR 3,8 (IC 1,9 – 7,5)</strong>.
                  </p>
                  <p className="text-slate-400">
                    Conclusão do estudo: a incidência de IUE após parto vaginal é expressivamente superior à de nuligestas, independente do número subsequente de partos.
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
