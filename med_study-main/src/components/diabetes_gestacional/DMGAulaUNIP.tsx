import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Layers, CheckCircle2, ChevronRight,
  Flame, Sparkles, Scale, Pill, ShieldCheck, HeartPulse,
  Syringe, Apple, Activity, Award, Check, X, RotateCcw,
  Clock, AlertTriangle, Baby, Info, Zap, AlertCircle,
  Stethoscope, Eye, ShieldAlert, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DMGAulaUNIP() {
  const [selectedSection, setSelectedSection] = useState<number>(1);
  const [somogyiTest3am, setSomogyiTest3am] = useState<'low' | 'normal' | null>(null);

  const sections = [
    {
      num: '01',
      title: '1. Fatores de Risco',
      subtitle: 'Metabólicos, obstétricos e rastreio dirigido (SOP e perda inexplicada)',
      color: 'border-indigo-500 text-indigo-400 bg-indigo-950/40',
      badge: 'Fatores de Risco'
    },
    {
      num: '02',
      title: '2. Definição',
      subtitle: 'Terminologia guarda-chuva, prevalência mundial e controvérsia 1-step vs 2-step',
      color: 'border-cyan-500 text-cyan-400 bg-cyan-950/40',
      badge: 'Definição & Prevalência'
    },
    {
      num: '03',
      title: '3. Fisiopatologia',
      subtitle: 'GLUT1/GLUT3 placentários, Hipótese de Pedersen e Combustíveis Mistos de Freinkel',
      color: 'border-purple-500 text-purple-400 bg-purple-950/40',
      badge: 'Fisiopatologia Molecular'
    },
    {
      num: '04',
      title: '4. Quadro Clínico e Diagnóstico',
      subtitle: '3 caminhos da 1ª GJ, TOTG 75g (Estudo HAPO OR 1,75) e dumping pós-bariátrica',
      color: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
      badge: 'Diagnóstico & HAPO'
    },
    {
      num: '05',
      title: '5. Classificação e Peculiaridades',
      subtitle: 'Classes A1 vs A2 (White), DM prévio vs gestação e rastreio de órgão-alvo',
      color: 'border-amber-500 text-amber-400 bg-amber-950/40',
      badge: 'Classificação A1/A2'
    },
    {
      num: '06',
      title: '6. Tratamento',
      subtitle: 'Nutrição sem cetose (IOM), GLUT4 via AMPK, Insulinas e Controvérsia da Metformina',
      color: 'border-rose-500 text-rose-400 bg-rose-950/40',
      badge: 'MEV & Farmacologia'
    },
    {
      num: '07',
      title: '7. Acompanhamento e Intraparto',
      subtitle: 'Metas, Somogyi vs Alvorecer (03h), PFE Hadlock, Parto (ACOG/BR) e Puerpério',
      color: 'border-blue-500 text-blue-400 bg-blue-950/40',
      badge: 'Parto, Puerpério & Metas'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Banner de Apresentação Acadêmica Aprofundada */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800 flex items-center gap-1.5">
                <GraduationCap size={14} className="text-indigo-400" />
                Resumo Acadêmico Aprofundado • UNIP Medicina
              </span>
              <span className="text-xs text-slate-400 font-bold">
                Dra. Flávia Ximenes Coimbra Alcoléa
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                FEBRASGO · SBD · OMS/IADPSG · ADA · ACOG
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Diabetes na Gestação: Do Rastreamento ao Pós-Parto
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Compêndio estruturado e aprofundado cobrindo <strong>fatores de risco, definição, fisiopatologia molecular, diagnóstico, classificação, terapia nutricional/insulina e acompanhamento pré-natal, intraparto e puerperal</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center px-4">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Tópicos do Guia</span>
              <span className="text-base font-black text-indigo-400">7 Eixos</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center px-4">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Diretrizes</span>
              <span className="text-base font-black text-cyan-400">Consenso BR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação pelos 7 Tópicos do Documento */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {sections.map((sec, idx) => {
          const num = idx + 1;
          const isActive = selectedSection === num;
          return (
            <button
              key={sec.num}
              onClick={() => setSelectedSection(num)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[95px] ${
                isActive 
                  ? `${sec.color} shadow-lg scale-[1.02] ring-2 ring-indigo-500/50` 
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black font-mono">{sec.num}</span>
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-indigo-400' : 'bg-slate-700'}`} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white line-clamp-1 leading-tight mt-1">{sec.title}</p>
                <span className="text-[9px] text-slate-400 line-clamp-1">{sec.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* CONTEÚDO PRINCIPAL DOS 7 TÓPICOS */}
      <div className="space-y-6">

        {/* ========================================================================= */}
        {/* TÓPICO 1: FATORES DE RISCO */}
        {/* ========================================================================= */}
        {selectedSection === 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-2xl font-black text-indigo-400 font-mono">1.</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Fatores de Risco</h3>
                  <p className="text-xs text-slate-400">Identificação precoce e magnitude de vigilância ao longo do pré-natal</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                O risco de hiperglicemia na gestação não é uniforme na população obstétrica. A identificação de fatores de risco orienta a necessidade de rastreio precoce (antes de 24 a 28 semanas) e ajuda a interpretar a magnitude de vigilância que cada gestante precisa ao longo do pré-natal.
              </p>

              {/* 1.1 Fatores metabólicos e 1.2 Fatores obstétricos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Activity size={18} />
                    <h4 className="text-sm font-black uppercase tracking-wider">1.1 Fatores Metabólicos</h4>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>IMC pré-gestacional &ge; 25 kg/m²</strong> (sobrepeso) ou <strong>&ge; 30 kg/m²</strong> (obesidade)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>História familiar de diabetes mellitus</strong> em parente de primeiro grau</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Síndrome dos ovários policísticos (SOP)</strong>, pela resistência insulínica basal associada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>HbA1c &ge; 5,7%</strong> previamente à gestação (marcador de pré-diabetes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Hipertensão arterial crônica</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Hipertrigliceridemia</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Idade materna avançada</strong> (geralmente considerada &ge; 35 anos)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Baby size={18} />
                    <h4 className="text-sm font-black uppercase tracking-wider">1.2 Fatores Obstétricos</h4>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>DMG em gestação anterior</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Recém-nascido anterior com peso &ge; 4.000 g</strong> (macrossomia prévia)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Polidrâmnio</strong> em gestação atual ou prévia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span><strong>Perda fetal ou óbito perinatal sem causa definida</strong> em gestação anterior</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* NEVER MISS - SOP e Perda Fetal */}
              <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={18} className="fill-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚡ NEVER MISS — SOP e perda fetal inexplicada são itens frequentemente esquecidos na anamnese
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  SOP entra na lista de risco não pela síndrome reprodutiva em si, mas pela <strong>resistência insulínica basal</strong> que a acompanha. Óbito ou perda fetal sem causa definida como antecedente obstétrico é um item que muitos examinadores cobram e que costuma ser omitido se a anamnese não for dirigida especificamente para isso.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TÓPICO 2: DEFINIÇÃO */}
        {/* ========================================================================= */}
        {selectedSection === 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-2xl font-black text-cyan-400 font-mono">2.</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Definição</h3>
                  <p className="text-xs text-slate-400">Conceito, terminologia guarda-chuva e prevalência mundial</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  Diabetes é hiperglicemia decorrente de deficiência da ação insulínica, seja por <strong>produção pancreática insuficiente</strong>, <strong>liberação inadequada de insulina</strong>, <strong>resistência periférica ao hormônio</strong>, ou combinação desses mecanismos. Na gestação, a resistência insulínica fisiológica e progressiva imposta pela placenta pode revelar uma reserva pancreática limitada que, fora da gravidez, seria suficiente para manter a normoglicemia.
                </p>
              </div>

              {/* 2.1 Terminologia guarda-chuva */}
              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider">
                  2.1 Terminologia Guarda-Chuva: "Hiperglicemia na Gestação"
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800/60 space-y-2">
                    <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                      Pré-Gestacional
                    </span>
                    <strong className="text-white block text-sm">Diabetes Prévio</strong>
                    <p className="text-slate-300 leading-relaxed">
                      DM1 ou DM2 diagnosticado <strong>antes da concepção</strong>. Risco de malformações congênitas relacionado ao controle glicêmico periconcepcional.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/60 space-y-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      Gestacional
                    </span>
                    <strong className="text-white block text-sm">Diabetes Mellitus Gestacional (DMG)</strong>
                    <p className="text-slate-300 leading-relaxed">
                      Hiperglicemia de intensidade menor, tipicamente identificada ou instalada na <strong>segunda metade da gestação</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-800/60 space-y-2">
                    <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      Na Gravidez
                    </span>
                    <strong className="text-white block text-sm">Diabetes Manifesto (Overt)</strong>
                    <p className="text-slate-300 leading-relaxed">
                      A gestante já preenche, na gravidez, <strong>critérios diagnósticos de diabetes válidos fora dela</strong> (GJ &ge; 126 mg/dL, HbA1c &ge; 6,5%).
                    </p>
                  </div>
                </div>
              </div>

              {/* NEVER MISS - Diabetes manifesto não é sinônimo de DMG */}
              <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={18} className="fill-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚡ NEVER MISS — Diabetes manifesto não é sinônimo de DMG
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Diabetes manifesto representa diabetes que <strong>provavelmente já existia antes da concepção e foi descoberto no pré-natal</strong>. Isso muda a conduta: exige rastreio de complicação de órgão-alvo (retinopatia, nefropatia), carrega risco de embriopatia diabética (por possível hiperglicemia não detectada no período periconcepcional) e não se resolve nem reclassifica no puerpério como o DMG costuma fazer.
                </p>
              </div>

              {/* 2.2 Prevalência e por que ela varia tanto */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-white">2.2 Prevalência e por que ela varia tanto</h4>
                  <span className="text-xs font-mono text-cyan-400 font-bold">Média mundial: ~16,2% (faixa de 1% a 37,7%)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A prevalência mundial de DMG é estimada em média de 16,2%, com faixa descrita entre 1% e 37,7% dependendo do critério diagnóstico e da população estudada. Essa variação enorme não é ruído metodológico aleatório, tem uma causa estrutural conhecida:
                </p>
              </div>

              {/* CONTROVÉRSIA - One-step vs Two-step */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-600/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚠️ CONTROVÉRSIA — Critério diagnóstico one-step (OMS/IADPSG/Brasil) versus two-step (ACOG/EUA)
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A <strong>IADPSG, a OMS e o consenso brasileiro (FEBRASGO/SBD/Ministério da Saúde)</strong> adotam a abordagem em um passo: <strong>TOTG 75g, e um único valor alterado já diagnostica DMG</strong>. O <strong>ACOG, nos Estados Unidos</strong>, mantém a abordagem em dois passos: triagem com 50g (GCT) e, se positiva, TOTG 100g com 3 coletas, exigindo dois valores alterados (critério de Carpenter-Coustan). O critério one-step é mais sensível e gera mais diagnósticos; o two-step é mais específico e reduz o número de diagnósticos, mas há debate ativo sobre perda de sensibilidade para casos que se beneficiariam de tratamento. Essa divergência de sociedades é a explicação real por trás da grande variação de prevalência relatada entre estudos americanos e o restante do mundo.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TÓPICO 3: FISIOPATOLOGIA */}
        {/* ========================================================================= */}
        {selectedSection === 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-2xl font-black text-purple-400 font-mono">3.</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Fisiopatologia</h3>
                  <p className="text-xs text-slate-400">Mecanismos moleculares, transporte placentário e hipótese de Pedersen</p>
                </div>
              </div>

              {/* 3.1 Resistência insulínica fisiológica */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black uppercase text-purple-400 tracking-wider">
                  3.1 Resistência Insulínica Fisiológica da Gestação
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A placenta produz hormônios contrainsulínicos crescentes ao longo da gestação: <strong>lactogênio placentário humano (hPL), progesterona, cortisol e prolactina</strong>. Isso gera resistência periférica à insulina progressiva, mais acentuada no segundo e terceiro trimestres. Numa gestante com reserva pancreática beta normal, ocorre compensação por hipersecreção de insulina. Quando essa reserva é limitada, a compensação falha parcialmente e surge hiperglicemia materna. A gestação funciona, nesse sentido, como um <strong>teste de estresse metabólico</strong> que revela uma vulnerabilidade pancreática pré-existente.
                </p>
              </div>

              {/* 3.2 Transporte placentário de glicose */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black uppercase text-indigo-400 tracking-wider">
                  3.2 Transporte Placentário de Glicose: Por Que Não Depende de Insulina
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A glicose atravessa a placenta por <strong>difusão facilitada</strong>, através dos transportadores <strong>GLUT1 (sinciciotrofoblasto)</strong> e <strong>GLUT3 (endotélio fetal)</strong>. Esses transportadores são constitutivos, já presentes na membrana, e o fluxo depende do gradiente de concentração entre sangue materno e fetal, não de regulação aguda por insulina. Isso é diferente do GLUT4 muscular e adipocitário, que fica estocado em vesículas intracelulares e só é translocado para a membrana mediante ativação da via PI3K/Akt pela insulina.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200">
                  <strong>Barreira Placentária para Insulina:</strong> A insulina materna, por ser uma proteína de aproximadamente <strong>5,8 kDa</strong>, não atravessa a placenta em quantidade clinicamente relevante. O que determina quanta glicose chega ao feto é, portanto, a <strong>glicemia materna</strong>, não a insulinemia materna.
                </div>
              </div>

              {/* FRONTEIRA - Upregulation placentária de GLUT1 */}
              <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sparkles size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    🔬 FRONTEIRA — Upregulation placentária de GLUT1 na gestante diabética
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Placentas de gestantes diabéticas apresentam <strong>maior densidade de GLUT1 na membrana microvilositária do sinciciotrofoblasto</strong>, um achado consistente em estudos de placenta diabética. O gatilho descrito é a exposição crônica à hiperglicemia e ao ambiente metabólico alterado (possivelmente envolvendo <strong>sinalização via IGF-1 e mTOR</strong>), configurando uma adaptação placentária de médio prazo ao substrato disponível, e não um efeito hormonal agudo direto da insulina materna.
                </p>
              </div>

              {/* 3.3 Hipótese de Pedersen */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                    3.3 Hipótese de Pedersen (Jørgen Pedersen, 1952)
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">Modelo Central</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Formulada em 1952, é o modelo central que conecta hiperglicemia materna à morbidade fetal e neonatal do diabetes gestacional:
                </p>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs font-mono text-indigo-300 font-semibold space-y-1">
                  <div>Hiperglicemia Materna &rarr; Hiperglicemia Fetal (difusão livre)</div>
                  <div>&darr;</div>
                  <div>Hiperinsulinemia Fetal (Pâncreas maduro a partir de 10-14 semanas &rarr; hiperplasia de células &beta;)</div>
                  <div>&darr;</div>
                  <div>Ação cruzada em receptores IGF-1 (tirosina-quinase, cascata PI3K/Akt) &rarr; Anabolismo Generalizado</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <strong className="text-white block">Padrão de Macrossomia Assimétrica:</strong>
                  <p className="leading-relaxed">
                    Gera lipogênese no tecido adiposo (predominantemente em tronco), síntese proteica muscular, crescimento visceral (fígado, coração, adrenais) e inibição da lipólise. <strong>Poupa relativamente o perímetro cefálico e concentra o excesso em tecido adiposo e vísceras abdominais</strong> — por isso a <strong>circunferência abdominal fetal (CA)</strong> é o parâmetro ultrassonográfico mais sensível para esse tipo de crescimento excessivo.
                  </p>
                </div>

                {/* Desfecho pós-parto: Hipoglicemia neonatal */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <strong className="text-rose-400 block">Desfecho pós-parto: a lógica da hipoglicemia neonatal:</strong>
                  <p className="leading-relaxed">
                    Durante toda a gestação, o feto vive em ambiente hiperinsulinêmico compensando um influxo constante de glicose materna. No <strong>clampeamento do cordão</strong>, esse influxo cessa abruptamente, mas o pâncreas fetal não interrompe a produção de insulina de forma instantânea. O resultado é <strong>hiperinsulinemia relativa</strong> num recém-nascido que já não recebe mais glicose materna, gerando hipoglicemia neonatal, geralmente nas <strong>primeiras 1 a 2 horas de vida</strong>.
                  </p>
                </div>

                {/* Tabela de Complicações Neonatais */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase">Outras complicações neonatais explicadas pelo mesmo eixo:</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left bg-slate-900 rounded-xl border border-slate-800">
                      <thead className="text-slate-400 uppercase font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Complicação</th>
                          <th className="p-2.5">Mecanismo Fisiopatológico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        <tr>
                          <td className="p-2.5 font-bold text-rose-300">Policitemia</td>
                          <td className="p-2.5">Hiperinsulinemia aumenta o consumo de O2 fetal, gerando hipóxia relativa crônica que estimula eritropoetina fetal.</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-amber-300">Hiperbilirrubinemia</td>
                          <td className="p-2.5">Consequência da policitemia (maior taxa de hemólise) somada à imaturidade hepática funcional de conjugação.</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-cyan-300">Hipocalcemia</td>
                          <td className="p-2.5">Associada à hipomagnesemia materna e atraso na resposta do PTH fetal.</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-purple-300">Desconforto respiratório</td>
                          <td className="p-2.5">A insulina em excesso <strong>antagoniza o efeito do cortisol na maturação do surfactante pulmonar</strong>, retardando a maturidade pulmonar mesmo em idade gestacional a termo.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 3.4 Extensão de Freinkel */}
              <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sparkles size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    🔬 FRONTEIRA — Fuel-mediated teratogenesis (Freinkel, anos 1980)
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A hipótese de Pedersen é centrada exclusivamente em glicose. Freinkel propôs que não é só glicose que atravessa a placenta e estimula o pâncreas fetal, mas um conjunto de substratos (<strong>"combustíveis mistos"</strong>): ácidos graxos livres, triglicerídeos, aminoácidos e corpos cetônicos. Isso explica por que algumas gestantes obesas, mesmo com glicemias de jejum e pós-prandiais dentro da meta, ainda geram fetos grandes para a idade gestacional: a <strong>dislipidemia materna (hipertrigliceridemia, elevação de ácidos graxos livres) também atravessa a placenta</strong> e contribui para deposição de gordura fetal, de forma relativamente independente do controle glicêmico isolado. É a base racional para considerar IMC pré-gestacional e perfil lipídico materno como variáveis de risco somadas à glicemia, não substituídas por ela.
                </p>
              </div>

              {/* NEVER MISS - Pedersen vs Embriopatia */}
              <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={18} className="fill-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚡ NEVER MISS — Pedersen explica crescimento excessivo, não malformação congênita
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A hipótese de Pedersen explica um fenômeno de <strong>segundo e terceiro trimestre</strong>, quando o pâncreas fetal já responde. Ela <strong>não explica embriopatia diabética</strong> (cardiopatias congênitas, defeitos de tubo neural, síndrome de regressão caudal), cujo mecanismo envolve estresse oxidativo e disrupção de sinalização durante a <strong>organogênese (primeiras 8 semanas)</strong> — um risco quase exclusivo do <strong>diabetes prévio mal controlado no periconcepcional</strong>, não do DMG, que só se manifesta na segunda metade da gestação.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TÓPICO 4: QUADRO CLÍNICO E DIAGNÓSTICO */}
        {/* ========================================================================= */}
        {selectedSection === 4 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-2xl font-black text-emerald-400 font-mono">4.</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Quadro Clínico e Diagnóstico</h3>
                  <p className="text-xs text-slate-400">Rastreamento universal, 3 caminhos da 1ª GJ, TOTG 75g e Estudo HAPO</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                O DMG é <strong>predominantemente assintomático</strong>, identificado por rastreio laboratorial sistemático, não por queixa clínica espontânea. Isso reforça por que o <strong>rastreio é universal na gestação</strong>, independente de sintomas.
              </div>

              {/* 4.1 Rastreio: os três caminhos da glicemia de jejum na primeira consulta */}
              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase text-emerald-400 tracking-wider">
                  4.1 Rastreio: Os Três Caminhos da Glicemia de Jejum na 1ª Consulta
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
                    <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Glicemia de Jejum na 1ª Consulta</th>
                        <th className="p-3">Interpretação e Conduta Imediata</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-3 font-mono font-bold text-emerald-400">&lt; 92 mg/dL</td>
                        <td className="p-3">Sem diagnóstico agora; <strong>reavaliar com TOTG 75g entre 24 e 28 semanas</strong>.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-amber-400">92 a 125 mg/dL</td>
                        <td className="p-3"><strong>Diagnóstico de DMG</strong>, já na primeira metade da gestação! (NÃO solicitar TOTG).</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-rose-400">&ge; 126 mg/dL</td>
                        <td className="p-3"><strong>Suspeita de Diabetes Manifesto (Overt)</strong>; confirmar em nova amostra quando não houver hiperglicemia inequívoca.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4.2 TOTG com 75g (24 a 28 semanas) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider">
                    4.2 TOTG com 75g (24 a 28 Semanas) — Três Tempos, Três Cortes
                  </h4>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                    Basta 1 Ponto Alterado
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Momento</th>
                        <th className="p-3">Normal</th>
                        <th className="p-3">Ponto de Corte para DMG</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-medium text-slate-200">
                      <tr>
                        <td className="p-3 font-bold">Jejum</td>
                        <td className="p-3 text-emerald-400">&lt; 92 mg/dL</td>
                        <td className="p-3 text-amber-400 font-bold">&ge; 92 mg/dL</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">1 hora pós-sobrecarga</td>
                        <td className="p-3 text-emerald-400">&lt; 180 mg/dL</td>
                        <td className="p-3 text-amber-400 font-bold">&ge; 180 mg/dL</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">2 horas pós-sobrecarga</td>
                        <td className="p-3 text-emerald-400">&lt; 153 mg/dL</td>
                        <td className="p-3 text-amber-400 font-bold">&ge; 153 mg/dL</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 italic">
                  * Um único valor alterado, em qualquer um dos três tempos, já estabelece o diagnóstico definitivo de DMG.
                </p>

                {/* Origem dos pontos de corte: Estudo HAPO */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <strong className="text-indigo-300 block font-bold">Origem dos Pontos de Corte: O Estudo HAPO (2008)</strong>
                  <p className="text-slate-300 leading-relaxed">
                    O <strong>HAPO (Hyperglycemia and Adverse Pregnancy Outcomes, 2008)</strong> foi um estudo observacional multicêntrico com <strong>mais de 23 mil gestantes</strong>, cujo achado central foi que a relação entre glicemia materna e desfechos adversos (macrossomia, peso ao nascer acima do percentil 90, hipoglicemia neonatal, C-peptídeo elevado no cordão) é <strong>contínua</strong>, sem um limiar claro de &ldquo;normal versus anormal&rdquo;. Diante disso, o IADPSG (posteriormente adotado pela OMS e pelo Brasil) arbitrou os pontos de corte no valor de glicemia em que o <strong>odds ratio para os desfechos adversos atinge 1,75 em relação à média do estudo</strong>. Ou seja: 92, 180 e 153 mg/dL representam um consenso estatístico sobre onde o risco se torna clinicamente relevante, e cada um dos três pontos foi calibrado individualmente para representar esse mesmo nível de risco — por isso um único valor alterado já basta para o diagnóstico.
                  </p>
                </div>
              </div>

              {/* 4.3 Diabetes manifesto: critérios de fora da gestação */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black uppercase text-rose-400 tracking-wider">
                  4.3 Diabetes Manifesto: Critérios de Fora da Gestação
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">Glicemia de Jejum</strong>
                    <span className="text-rose-400 font-mono font-bold text-sm">&ge; 126 mg/dL</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">HbA1c Padronizada</strong>
                    <span className="text-rose-400 font-mono font-bold text-sm">&ge; 6,5%</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">Glicemia Casual</strong>
                    <span className="text-rose-400 font-mono font-bold text-sm">&ge; 200 mg/dL</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">com sintomas clássicos de DM</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">Confirmar em nova amostra quando não houver hiperglicemia inequívoca com sintomas agudos.</p>
              </div>

              {/* CONTROVÉRSIA - Limitação da HbA1c na gestação */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-600/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚠️ CONTROVÉRSIA — Limitação da HbA1c na gestação
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A HbA1c reflete uma média de 2 a 3 meses, mas a <strong>expansão do volume plasmático e o turnover mais acelerado de hemácias no segundo e terceiro trimestres tendem a subestimar o valor real</strong> em relação ao controle glicêmico verdadeiro. Por isso ela é útil para rastrear diabetes manifesto pré-existente no 1º trimestre, mas <strong>não substitui o TOTG para diagnóstico de DMG propriamente dito</strong>.
                </p>
              </div>

              {/* 4.4 Situações especiais de rastreio - CONTEXTO BRASIL */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-600/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    🇧🇷 CONTEXTO BRASIL — TOTG após cirurgia bariátrica
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A sobrecarga oral de glicose (75g) pode desencadear <strong>síndrome de dumping</strong> severa com hipoglicemia reativa e taquicardia. Deve-se individualizar conforme o tipo de cirurgia e o protocolo institucional, <strong>considerando perfil glicêmico capilar ambulatorial como alternativa ao TOTG</strong> quando houver esse risco. Sintomas de dumping não devem ser interpretados como diagnóstico de DMG.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TÓPICO 5: CLASSIFICAÇÃO E PECULIARIDADES */}
        {/* ========================================================================= */}
        {selectedSection === 5 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-2xl font-black text-amber-400 font-mono">5.</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Classificação e Peculiaridades</h3>
                  <p className="text-xs text-slate-400">Classes A1 vs A2 de White, DM prévio vs gestação e rastreio de órgão-alvo</p>
                </div>
              </div>

              {/* 5.1 Classes A1 e A2 (White modificada) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                  5.1 Classes A1 e A2 (Classificação de Priscilla White Modificada)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>A1 e A2 não classificam gravidade da doença, classificam resposta ao tratamento.</strong> Essa é a origem de um erro conceitual comum: uma gestante pode ter hiperglicemia relativamente discreta e ainda assim precisar de insulina (torna-se A2) por não responder à dieta, enquanto outra com glicemias mais alteradas ao diagnóstico pode responder bem só com terapia nutricional (permanece A1). <strong>A classificação é dinâmica</strong>, reavaliada ao longo do pré-natal, não fixada no dia do diagnóstico.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-700/60 space-y-2 text-xs">
                    <strong className="text-emerald-300 block text-sm">Classe A1</strong>
                    <p className="text-slate-300 leading-relaxed">
                      Controle obtido com <strong>alimentação e exercício (MEV)</strong>; automonitorização mantida; pode mudar de classe se metas não forem atingidas.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-indigo-700/60 space-y-2 text-xs">
                    <strong className="text-indigo-300 block text-sm">Classe A2</strong>
                    <p className="text-slate-300 leading-relaxed">
                      <strong>Necessita tratamento farmacológico (Insulina)</strong>; maior intensidade de vigilância; planejamento do parto considera controle e repercussões.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Origem histórica: classificação de Priscilla White (1949), que originalmente incluía subclasses B a T conforme idade de início do diabetes prévio, duração da doença e presença de vasculopatia. Na prática obstétrica atual, o que permanece em uso corrente e influencia diretamente a conduta é a distinção A1 versus A2 para o DMG.
                </p>
              </div>

              {/* NEVER MISS - A classe A2 por si só antecipa o parto */}
              <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={18} className="fill-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚡ NEVER MISS — A classe A2 por si só antecipa o parto
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A distinção A1/A2 influencia diretamente a intensidade da monitorização (perfil de 4 versus 6 pontos) e a janela recomendada para o parto: o consenso brasileiro diferencia claramente <strong>A1 (39 a 40+6 semanas)</strong> de <strong>A2 (39 a 39+6 semanas)</strong> mesmo com bom controle em ambos os casos, porque a necessidade farmacológica já sinaliza uma fisiopatologia menos controlável.
                </p>
              </div>

              {/* 5.2 Diabetes prévio versus hiperglicemia diagnosticada na gestação */}
              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase text-white tracking-wider">
                  5.2 Diabetes Prévio versus Hiperglicemia Diagnosticada na Gestação
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
                    <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Diabetes Prévio</th>
                        <th className="p-3">Hiperglicemia na Gestação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-3">DM1 ou DM2 antes da gestação; risco de malformação relacionado ao controle periconcepcional; <strong>pesquisar complicações de órgão-alvo</strong>.</td>
                        <td className="p-3">Diabetes manifesto diagnosticado na gravidez, ou DMG; <strong>reclassificar após o parto</strong> (exceto diabetes manifesto, que tende a persistir).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5.3 Peculiaridades da avaliação inicial por tipo */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider">
                  5.3 Peculiaridades da Avaliação Inicial por Tipo
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No <strong>diabetes prévio</strong>, a exposição crônica à hiperglicemia impõe risco real de complicação microvascular já instalada, por isso <strong>avaliação oftalmológica (fundoscopia) e função renal com proteinúria são obrigatórias</strong> no início do pré-natal, independentemente de sintomas — inclusive porque a <strong>retinopatia proliferativa pode progredir rapidamente</strong> durante a gestação pelas alterações hemodinâmicas e hormonais. No <strong>DMG</strong>, a exposição é recente (geralmente segunda metade da gestação), então esse rastreio de órgão-alvo não tem racional, salvo comorbidade concomitante (por exemplo, hipertensão arterial crônica).
                </p>
              </div>

              {/* CONTEXTO BRASIL - Equipe Multiprofissional */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-600/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    🇧🇷 CONTEXTO BRASIL — Equipe multiprofissional e realidade de serviço
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  O modelo ideal (obstetrícia, endocrinologia, nutrição, enfermagem) nem sempre está disponível na rede pública brasileira. O consenso nacional reconhece isso e <strong>permite ao obstetra conduzir isoladamente o ajuste de insulina em serviços sem endocrinologista</strong>, desde que siga protocolo, e permite orientação nutricional básica pelo próprio médico quando não há nutricionista disponível.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TÓPICO 6: TRATAMENTO */}
        {/* ========================================================================= */}
        {selectedSection === 6 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-2xl font-black text-rose-400 font-mono">6.</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Tratamento</h3>
                  <p className="text-xs text-slate-400">Terapia nutricional sem cetose, atividade física (AMPK), insulinas e metformina</p>
                </div>
              </div>

              {/* 6.1 Terapia nutricional */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-black uppercase text-emerald-400 tracking-wider">
                  6.1 Terapia Nutricional: As Quatro Metas
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block">1. Controle Sem Cetose</strong>
                    <span className="text-slate-400 text-[11px]">Evitar cetogênese e hipoglicemia</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block">2. Aporte de Nutrientes</strong>
                    <span className="text-slate-400 text-[11px]">Garantir para mãe e feto</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block">3. Ganho pelo IMC</strong>
                    <span className="text-slate-400 text-[11px]">Conforme IOM pré-gestacional</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block">4. Exequibilidade</strong>
                    <span className="text-slate-400 text-[11px]">Dentro da cultura e rotina</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                  <strong className="text-emerald-300 block font-bold">&ldquo;Sem Cetose&rdquo; é Literal:</strong>
                  <p className="leading-relaxed">
                    Restrição calórica agressiva gera lipólise compensatória e cetogênese, com evidência (estudos observacionais, ex. <strong>Rizzo et al., anos 1990</strong>) associando cetonemia/cetonúria materna a <strong>prejuízo no desenvolvimento neurocognitivo da criança</strong>.
                  </p>
                  <p className="leading-relaxed pt-1">
                    A gestação é, por si, um estado de <strong>&ldquo;jejum acelerado&rdquo; (accelerated starvation, termo de Freinkel)</strong>: o consumo contínuo de glicose pela unidade fetoplacentária faz a glicemia cair mais rápido em jejum do que fora da gestação. Na gestante com DMG, com menor reserva pancreática compensatória, esse fenômeno é mais acentuado — por isso a distribuição em <strong>três refeições principais e dois a três lanches, e a ceia antes de dormir</strong>, evitando jejum efetivo prolongado (10 a 12 horas) que isoladamente já poderia gerar cetose.
                  </p>
                </div>

                {/* Qualidade do carboidrato */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <strong className="text-white block">Qualidade do Carboidrato e Índice Glicêmico:</strong>
                  <p className="leading-relaxed">
                    Preferir alimentos in natura, fibras, leguminosas, grãos integrais, frutas inteiras, combinações com proteína e gordura saudável; reduzir bebidas açucaradas, açúcares adicionados, ultraprocessados e porções isoladas grandes. Índice glicêmico é ferramenta, não prescrição isolada: a resposta glicêmica real depende da combinação de macronutrientes na refeição, por isso a <strong>glicemia capilar medida deve orientar o ajuste individual</strong>, não uma tabela genérica.
                  </p>
                </div>

                {/* Tabela de Ganho de Peso Gestacional IOM */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    Ganho de Peso Gestacional por IMC Pré-Gestacional (IOM)
                  </span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left bg-slate-900 rounded-xl border border-slate-800">
                      <thead className="text-slate-400 uppercase font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">IMC Pré-Gestacional (kg/m²)</th>
                          <th className="p-2.5">Classificação</th>
                          <th className="p-2.5">Ganho Total Sugerido</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        <tr>
                          <td className="p-2.5 font-mono">&lt; 18,5</td>
                          <td className="p-2.5 text-cyan-300 font-medium">Baixo peso</td>
                          <td className="p-2.5 font-bold">12,5 a 18 kg</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-mono">18,5 a 24,9</td>
                          <td className="p-2.5 text-emerald-300 font-medium">Adequado (Eutrófica)</td>
                          <td className="p-2.5 font-bold text-emerald-400">11,5 a 16 kg</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-mono">25,0 a 29,9</td>
                          <td className="p-2.5 text-amber-300 font-medium">Sobrepeso</td>
                          <td className="p-2.5 font-bold text-amber-400">7 a 11,5 kg</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-mono">&ge; 30,0</td>
                          <td className="p-2.5 text-rose-300 font-medium">Obesidade</td>
                          <td className="p-2.5 font-bold text-rose-400">5 a 9 kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* CONTROVÉRSIA - Gestação Gemelar */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-600/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚠️ CONTROVÉRSIA — Essas faixas valem para gestação única
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Em <strong>gestação gemelar</strong>, as faixas de ganho recomendado pelo IOM são bem mais altas (por exemplo, <strong>17 a 25 kg para IMC adequado</strong>). É um erro comum generalizar a tabela de gestação única para múltiplas.
                </p>
              </div>

              {/* 6.2 Atividade física */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black uppercase text-indigo-400 tracking-wider">
                  6.2 Atividade Física e Recrutamento de GLUT4 por Via Independente
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A contração muscular <strong>recruta GLUT4 para a membrana por via independente de insulina (via AMPK, ativada pelo próprio exercício)</strong>, permitindo captação de glicose mesmo em vigência de resistência insulínica marcada. Exercício pós-prandial (por exemplo, <strong>caminhada de 15 a 20 minutos após refeições</strong>) é particularmente eficaz para reduzir picos pós-prandiais. Recomenda-se cerca de <strong>30 minutos na maioria dos dias</strong>, evitando longos períodos de inatividade.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-rose-300 block mb-1">Sinais de Alerta Obstétricos para Interromper:</strong>
                    <span className="text-slate-300">Sangramento vaginal, perda de líquido amniótico, contrações uterinas regulares ou redução de movimentos fetais.</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-amber-300 block mb-1">Sinais de Alerta Clínicos para Interromper:</strong>
                    <span className="text-slate-300">Dispneia antes do esforço, dor torácica, tontura/lipotimia ou hipoglicemia sintomática.</span>
                  </div>
                </div>
              </div>

              {/* 6.3 Insulina */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-rose-400 tracking-wider">
                    6.3 Insulina: Primeira Escolha Farmacológica Absoluta
                  </h4>
                  <span className="text-xs font-mono text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                    Peso ~5,8 kDa (Não atravessa placenta)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Insulina é primeira escolha farmacológica porque, sendo uma proteína de aproximadamente 5,8 kDa, <strong>não atravessa a placenta em quantidade clinicamente relevante</strong> — diferente de metformina (129 Da, atravessa livremente por difusão) e sulfonilureias como glibenclamida. É esse critério farmacocinético, não superioridade de eficácia isolada, que fundamenta a posição da insulina em praticamente todas as diretrizes (ADA, FEBRASGO, SBD, NICE).
                </p>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong>Indicação Formal:</strong> Quando <strong>20 a 30% das medidas em determinado horário, ao longo de uma a duas semanas</strong>, ultrapassam a meta apesar de terapia nutricional comprovadamente seguida. Antes de intensificar, é obrigatório checar registro alimentar e técnica de monitorização — padrão persistente, não exceção isolada.
                </div>

                {/* Tabela Farmacocinética das Insulinas */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Farmacocinética das Insulinas</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left bg-slate-900 rounded-xl border border-slate-800">
                      <thead className="text-slate-400 uppercase font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Tipo</th>
                          <th className="p-2.5">Exemplo</th>
                          <th className="p-2.5">Início</th>
                          <th className="p-2.5">Pico</th>
                          <th className="p-2.5">Duração</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        <tr>
                          <td className="p-2.5 text-cyan-300 font-bold">Intermediária</td>
                          <td className="p-2.5 font-mono text-white">NPH</td>
                          <td className="p-2.5">2 a 4 h</td>
                          <td className="p-2.5 text-amber-300 font-bold">4 a 10 h</td>
                          <td className="p-2.5">10 a 18 h</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-indigo-300 font-bold">Rápida</td>
                          <td className="p-2.5 font-mono text-white">Regular</td>
                          <td className="p-2.5">0,5 a 1 h</td>
                          <td className="p-2.5 text-amber-300 font-bold">2 a 3 h</td>
                          <td className="p-2.5">5 a 8 h</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-purple-300 font-bold">Ultrarrápida</td>
                          <td className="p-2.5 font-mono text-white">Aspart / Lispro</td>
                          <td className="p-2.5 text-emerald-300 font-bold">5 a 15 min</td>
                          <td className="p-2.5 text-amber-300 font-bold">0,5 a 2 h</td>
                          <td className="p-2.5">3 a 5 h</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-blue-300 font-bold">Longa</td>
                          <td className="p-2.5 font-mono text-white">Detemir</td>
                          <td className="p-2.5">1 a 3 h</td>
                          <td className="p-2.5 text-slate-400">Discreto</td>
                          <td className="p-2.5">18 a 22 h</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-cyan-300 block mb-1">Escolha por Padrão Alterado:</strong>
                    <span><strong>Jejum ou pré-prandial alterado</strong> indica insulina basal insuficiente (NPH ou basal longa); <strong>Pós-prandial isolado</strong> com jejum normal indica resposta prandial insuficiente (insulina rápida ou ultrarrápida antes da refeição responsável).</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-amber-300 block mb-1">Dose Inicial de Referência (SBD):</strong>
                    <span><strong>0,5 UI/kg/dia</strong>, distribuída conforme padrão glicêmico e rotina — ponto de partida, não receita fixa. A necessidade de dose sobe muito no 3º trimestre devido à resistência placentária máxima.</span>
                  </div>
                </div>
              </div>

              {/* FRONTEIRA - Regular antes da NPH */}
              <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sparkles size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    🔬 FRONTEIRA — Por que aspirar Regular antes da NPH na mesma seringa
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A NPH contém <strong>protamina em suspensão</strong>, que retarda a absorção da insulina. Aspirar NPH primeiro e depois Regular na mesma seringa gera <strong>risco de contaminação cruzada de protamina para dentro do frasco de Regular</strong>, alterando retroativamente sua farmacocinética em aplicações futuras daquele frasco. Aspirando a Regular primeiro (solução límpida, sem protamina), esse risco é eliminado.
                </p>
              </div>

              {/* 6.4 Metformina e CONTROVÉRSIA */}
              <div className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-600/70 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle size={18} />
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    6.4 Metformina: ⚠️ CONTROVÉRSIA — Eficácia aguda favorável, mas incerteza de longo prazo
                  </h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  O <strong>estudo MiG (Rowan et al., 2008)</strong> mostrou eficácia glicêmica comparável entre metformina e insulina, sem diferença em desfecho perinatal composto primário, levando diretrizes como o NICE a aceitá-la como opção de primeira linha em cenários específicos. Estudos de seguimento de longo prazo dos filhos expostos (coortes do próprio grupo do MiG e outros) sugerem, de forma ainda não conclusiva mas consistente, <strong>maior adiposidade e IMC em crianças e adolescentes expostos in utero</strong>, comparado a filhos de mães tratadas com insulina. É essa incerteza sobre <strong>programação metabólica fetal a longo prazo</strong> que fundamenta a posição mais conservadora do FEBRASGO/SBD.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <strong className="text-white block">Cenários Possíveis de Uso no Brasil:</strong>
                  <span>Acesso inviável à insulina, dificuldade grave de autoadministração, ou necessidade de doses extremamente altas; sempre com decisão compartilhada e documentada. <em>Limites:</em> Atravessa a placenta livremente e cerca de 30% a 50% das pacientes ainda precisarão de insulina complementar.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TÓPICO 7: ACOMPANHAMENTO PRÉ-NATAL E INTRAPARTO */}
        {/* ========================================================================= */}
        {selectedSection === 7 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-2xl font-black text-blue-400 font-mono">7.</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Acompanhamento Pré-Natal e Intraparto</h3>
                  <p className="text-xs text-slate-400">Metas, Somogyi vs Alvorecer, PFE Hadlock, momento e via de parto, intraparto e puerpério</p>
                </div>
              </div>

              {/* 7.1 Monitorização glicêmica */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider">
                  7.1 Monitorização Glicêmica Ambulatorial
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-4 bg-slate-900 rounded-xl border border-emerald-700/80">
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Jejum</span>
                    <strong className="text-2xl font-black text-emerald-400 font-mono">&lt; 95 mg/dL</strong>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl border border-indigo-700/80">
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">1h Pós-Prandial</span>
                    <strong className="text-2xl font-black text-indigo-400 font-mono">&lt; 140 mg/dL</strong>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl border border-cyan-700/80">
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">2h Pós-Prandial</span>
                    <strong className="text-2xl font-black text-cyan-400 font-mono">&lt; 120 mg/dL</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Essas metas são mais baixas que as metas usuais de diabetes fora da gestação (jejum até 130, pós-prandial até 180 em muitos protocolos), porque o alvo aqui não é só prevenir complicação crônica materna, é <strong>evitar o efeito agudo da hiperglicemia sobre o feto (hipótese de Pedersen)</strong>. A meta de 1h é mais alta que a de 2h por refletir o pico fisiológico normal de absorção de carboidrato (60 a 90 minutos), com retorno já em curso rumo à linha de base em 2h.
                </p>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong>Frequência Recomendada:</strong> Perfil de <strong>4 pontos diariamente</strong> em tratamento não farmacológico (jejum e pós-prandiais); perfil de <strong>6 pontos</strong> em tratamento farmacológico, incluindo pré-prandiais, acrescentando <strong>madrugada (03h)</strong> quando indicado.
                </div>
              </div>

              {/* NEVER MISS - Interpretar Sequência */}
              <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={18} className="fill-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚡ NEVER MISS — Interpretar sequência, não valor isolado
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Um valor pontual alterado pode refletir uma variável de confusão (erro de técnica, refeição atípica, estresse agudo, exercício recente). A decisão de intensificar ou trocar insulina deve se basear em <strong>padrão persistente ao longo de dias</strong>, não numa medida isolada.
                </p>
              </div>

              {/* Efeito Somogyi versus Fenômeno do Alvorecer */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                    Efeito Somogyi versus Fenômeno do Alvorecer
                  </h4>
                  <span className="text-xs text-slate-400">Diferenciação pela Glicemia às 03h</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ambos se apresentam com o mesmo achado — <strong>jejum matinal elevado</strong> — mas pedem condutas diametralmente opostas. A medida da glicemia às 3h da madrugada é a chave que diferencia as duas situações:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left bg-slate-900 rounded-xl border border-slate-800">
                    <thead className="text-slate-400 uppercase font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Aspecto</th>
                        <th className="p-2.5 text-rose-300">Efeito Somogyi</th>
                        <th className="p-2.5 text-indigo-300">Fenômeno do Alvorecer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-2.5 font-bold">Mecanismo</td>
                        <td className="p-2.5">Hipoglicemia noturna seguida de rebote contrarregulatório (glucagon, adrenalina, cortisol, GH).</td>
                        <td className="p-2.5">Aumento fisiológico de GH e cortisol nas primeiras horas da manhã, sem hipoglicemia prévia.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Glicemia às 03h</td>
                        <td className="p-2.5 font-bold text-rose-400 bg-rose-950/40">Baixa (&lt; 70 mg/dL) — Chave Diagnóstica!</td>
                        <td className="p-2.5 font-bold text-emerald-400 bg-emerald-950/40">Normal ou já em ascensão (&gt; 70-90 mg/dL)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Conduta</td>
                        <td className="p-2.5 text-rose-200 font-semibold">Reduzir insulina noturna ou ajustar ceia</td>
                        <td className="p-2.5 text-indigo-200 font-semibold">Aumentar insulina noturna ou usar ação mais prolongada</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Simulador Interativo Rápido Somogyi vs Alvorecer */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white uppercase block">Teste Rápido Interativo: Gestante com Jejum = 108 mg/dL</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSomogyiTest3am('low')}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        somogyiTest3am === 'low' 
                          ? 'bg-rose-600 text-white shadow-lg' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Glicemia às 03h = 56 mg/dL (Baixa)
                    </button>
                    <button
                      onClick={() => setSomogyiTest3am('normal')}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        somogyiTest3am === 'normal' 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Glicemia às 03h = 88 mg/dL (Normal)
                    </button>
                  </div>

                  {somogyiTest3am === 'low' && (
                    <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-700 text-xs text-rose-200">
                      <strong>Diagnóstico: Efeito Somogyi!</strong> A hiperglicemia matinal é rebote de hipoglicemia na madrugada. <em>Conduta:</em> REDUZIR a NPH noturna ou reforçar a ceia.
                    </div>
                  )}

                  {somogyiTest3am === 'normal' && (
                    <div className="p-3 rounded-lg bg-indigo-950/50 border border-indigo-700 text-xs text-indigo-200">
                      <strong>Diagnóstico: Fenômeno do Alvorecer!</strong> Falta cobertura basal matinal contra o pico de cortisol. <em>Conduta:</em> AUMENTAR a NPH ao deitar (bedtime) ou adiar para 22h-23h.
                    </div>
                  )}
                </div>
              </div>

              {/* FRONTEIRA - Robustez do conceito de Somogyi */}
              <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sparkles size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    🔬 FRONTEIRA — Nota sobre a robustez atual do conceito de efeito Somogyi
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Estudos com monitorização contínua de glicose mostram que a hiperglicemia matinal é mais frequentemente explicada pelo fenômeno do alvorecer isolado do que por rebote pós-hipoglicêmico verdadeiro, sugerindo que o efeito Somogyi como entidade clínica comum foi provavelmente superestimado antes da era do CGM. O mecanismo contrarregulatório é real, mas na prática atual a <strong>investigação direta (medir a madrugada às 03h)</strong> substitui a suposição diagnóstica baseada só no padrão do jejum matinal.
                </p>
              </div>

              {/* 7.2 Monitorização contínua versus glicemia capilar */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                  7.2 Monitorização Contínua versus Glicemia Capilar
                </h4>
                <p className="leading-relaxed">
                  O sensor de monitorização contínua (ex. Freestyle Libre) mede glicose intersticial, com <strong>atraso fisiológico (lag time) de 5 a 15 minutos</strong> em relação ao sangue, pelo tempo de equilíbrio por difusão entre capilar e interstício. Numa hipoglicemia de instalação rápida, o sensor pode mostrar valor ainda dentro da meta enquanto a glicemia sanguínea real já caiu mais — por isso <strong>sintomas de hipoglicemia sempre devem ser confirmados com ponta de dedo</strong>, nunca só com o sensor.
                </p>
              </div>

              {/* 7.3 Vigilância fetal: rotina versus intensificada */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-black uppercase text-purple-400 tracking-wider">
                  7.3 Vigilância Fetal: Rotina versus Intensificada
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O diabetes eleva a gestante de um acompanhamento de rotina para um protocolo de vigilância seriada e antecipada, porque o <strong>risco de óbito fetal súbito por hiperinsulinemia crônica</strong> não dá sinais de alerta graduais como outras complicações.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left bg-slate-900 rounded-xl border border-slate-800">
                    <thead className="text-slate-400 uppercase font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Item de Avaliação</th>
                        <th className="p-2.5 text-slate-400">Gestação de Baixo Risco</th>
                        <th className="p-2.5 text-indigo-300 font-bold">Diabetes (Vigilância Intensificada)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-2.5 font-bold">Ultrassom obstétrico</td>
                        <td className="p-2.5">1 exame no 3º trimestre, sem repetição seriada</td>
                        <td className="p-2.5 font-semibold text-indigo-200">Seriado a cada 3 a 4 semanas a partir do diagnóstico (curva de crescimento e CA)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Líquido amniótico</td>
                        <td className="p-2.5">Dentro do US de rotina</td>
                        <td className="p-2.5 font-semibold text-indigo-200">Reavaliado em cada ultrassom seriado (risco de polidrâmnio por poliúria fetal)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Cardiotocografia anteparto</td>
                        <td className="p-2.5">Não indicada rotineiramente</td>
                        <td className="p-2.5 font-semibold text-indigo-200">Semanal a 2x/semana, geralmente a partir de 32 a 34 semanas em A2 ou DM prévio</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Perfil biofísico fetal (PBF)</td>
                        <td className="p-2.5">Não indicado</td>
                        <td className="p-2.5 font-semibold text-indigo-200">Reservado para NST não tranquilizador ou casos de maior risco</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">Doppler de artéria umbilical</td>
                        <td className="p-2.5">Não indicado</td>
                        <td className="p-2.5 font-semibold text-indigo-200">Considerado se houver suspeita de repercussão placentária associada (HAS/CIUR)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 7.4 Estimativa de peso fetal: limitação conhecida */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                  7.4 Estimativa de Peso Fetal (PFE): Limitação Conhecida
                </h4>
                <p className="leading-relaxed">
                  As fórmulas de estimativa de peso fetal (Hadlock e variantes) foram validadas assumindo distribuição de gordura corporal proporcional. No <strong>feto macrossômico por hiperinsulinemia</strong>, a deposição de gordura é desproporcional (tronco e abdome), fazendo a <strong>fórmula sistematicamente superestimar o peso real acima de 4.000g, com margem de erro que pode superar 15 a 20%</strong>. Por isso a via de parto não deve ser decidida por um número isolado, sem contexto clínico.
                </p>
              </div>

              {/* 7.5 Momento do parto */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider">
                    7.5 Momento do Parto — Tabela do Consenso Brasileiro
                  </h4>
                  <span className="text-xs text-cyan-300 font-mono font-bold">FEBRASGO / SBD</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left bg-slate-900 rounded-xl border border-slate-800">
                    <thead className="text-slate-400 uppercase font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Situação Clínica</th>
                        <th className="p-2.5">Janela Sugerida (Consenso Brasileiro)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-2.5 font-bold text-emerald-300">DMG A1, bom controle (MEV)</td>
                        <td className="p-2.5 font-mono font-bold text-emerald-400">39+0 a 40+6 semanas</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-indigo-300">DMG A2, bom controle (Insulina)</td>
                        <td className="p-2.5 font-mono font-bold text-indigo-400">39+0 a 39+6 semanas</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-amber-300">DMG com controle ruim / CA &gt; p90</td>
                        <td className="p-2.5 font-mono font-bold text-amber-400">37+0 a 38+0 semanas; individualizar</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-purple-300">DM prévio, bom controle</td>
                        <td className="p-2.5 font-mono font-bold text-purple-400">38+0 a 39+6 semanas</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-rose-300">DM prévio com mau controle ou vasculopatia</td>
                        <td className="p-2.5 font-mono font-bold text-rose-400">Considerar até 37 semanas; individualizar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong>O Racional da Balança de Riscos:</strong> É o equilíbrio entre dois riscos que crescem em direções opostas com a idade gestacional: <em>risco de óbito fetal ou agravamento materno</em> (que não cai com o prolongamento em contexto de controle inadequado) versus <em>risco de morbidade neonatal da prematuridade tardia</em> (que cai progressivamente). Quando o controle é ruim, a balança se inclina para antecipar o parto mesmo aceitando algum risco residual de prematuridade tardia.
                </div>
              </div>

              {/* DIRETRIZ NOVA - Convergência com o ACOG */}
              <div className="p-5 rounded-2xl bg-cyan-950/40 border-2 border-cyan-500/70 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-cyan-400">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    🔄 DIRETRIZ NOVA — Convergência com o ACOG
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  A janela de <strong>39 a 39+6 semanas para DMG A2 bem controlado</strong> é praticamente idêntica à recomendação do <strong>ACOG (Practice Bulletin nº 190)</strong>, que também recomenda não antecipar o parto de DMG bem controlado com dieta antes de 39 semanas quando o controle glicêmico e o bem-estar fetal são tranquilizadores. Apesar da divergência sobre critério diagnóstico (one-step vs two-step), há <strong>convergência internacional forte</strong> assim que o diagnóstico já está feito.
                </p>
              </div>

              {/* NEVER MISS - Sinais que superpõem a tabela */}
              <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap size={18} className="fill-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    ⚡ NEVER MISS — Sinais que superpõem a tabela e antecipam a decisão
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Alteração aguda de vitalidade fetal, pré-eclâmpsia sobreposta, polidrâmnio sintomático, ou suspeita de macrossomia extrema com estagnação de crescimento (sinal indireto de possível insuficiência placentária associada) <strong>antecipam a decisão independentemente da classe</strong>.
                </p>
              </div>

              {/* 7.6 Via de parto */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black uppercase text-emerald-400 tracking-wider">
                  7.6 Via de Parto: Vaginal vs Cesariana Eletiva
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-900 rounded-xl border border-emerald-700/60 space-y-2">
                    <strong className="text-emerald-300 block text-sm">Favorece Parto Vaginal</strong>
                    <p className="text-slate-300 leading-relaxed">
                      Condições obstétricas adequadas; vitalidade fetal preservada; estimativa de peso compatível; equipe preparada. Diabetes por si só NÃO é indicação de cesárea!
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-rose-700/60 space-y-2">
                    <strong className="text-rose-300 block text-sm">Discutir Cesárea Eletiva</strong>
                    <p className="text-slate-300 leading-relaxed">
                      <strong>PFE &ge; 4.500 g</strong> (aconselhar riscos e benefícios); história de distócia de ombro prévia; outras indicações obstétricas; individualizar pela incerteza do PFE.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong>Por Que o Limiar é 4.500g e Não 4.000g?</strong> O limiar de 4.500g reflete que o risco de distócia de ombro sobe de forma mais acentuada acima desse patamar, e a análise de risco-benefício de cesárea eletiva só se justifica estatisticamente quando o risco absoluto é alto o suficiente. Mesmo nesse patamar, a maioria das distócias de ombro ocorre em fetos com peso estimado normal, porque a maioria dos partos, mesmo em diabetes, ocorre em fetos com peso normal — cesárea eletiva por EFW é redução de risco relativo num subgrupo pequeno, não prevenção da maioria dos casos, por isso a conduta correta é aconselhamento compartilhado, não indicação automática.
                </div>
              </div>

              {/* 7.7 Manejo intraparto */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider">
                    7.7 Manejo Intraparto: Meta de 70 a 120 mg/dL
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Glicemia Alvo no Parto</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Meta glicêmica intraparto: 70 a 120 mg/dL</strong>, faixa mais ampla que as metas ambulatoriais porque o objetivo muda: evitar hiperglicemia materna (que perpetua hiperinsulinemia fetal residual até o clampeamento, piorando a hipoglicemia neonatal) e evitar hipoglicemia materna (pelo esforço físico do trabalho de parto associado a jejum). Tipicamente envolve infusão de soro glicosado e insulina regular em bomba, ajustada por glicemia capilar horária.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">1. Monitorização</strong>
                    <span className="text-slate-300">Glicemia capilar seriada horária na parturiente.</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">2. Distócia de Ombro</strong>
                    <span className="text-slate-300">Equipe treinada para manobras imediatas (McRoberts, etc.).</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">3. Cuidado Neonatal</strong>
                    <span className="text-slate-300">Glicemia capilar do RN em 1-2h, pele a pele e amamentação precoce.</span>
                  </div>
                </div>
              </div>

              {/* 7.8 Puerpério */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                    7.8 Puerpério e Reclassificação Metabólica
                  </h4>
                  <span className="text-xs font-mono text-amber-300">Queda Abrupta da Placenta</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Os hormônios contrainsulínicos responsáveis pela resistência insulínica da gestação são de origem placentária; <strong>com a dequitação, a fonte é removida de forma abrupta</strong>, e a meia-vida curta desses hormônios faz a resistência regredir em horas a poucos dias. Por isso a insulina usada na gestação costuma ser <strong>suspensa já na maternidade</strong>, com reavaliação por glicemia capilar simples.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 block">Reclassificação em 6 a 8 Semanas:</strong>
                    <p className="text-slate-300">Solicitar <strong>TOTG com 75g de glicose entre 6 e 8 semanas pós-parto</strong> (não antes, para permitir dissipação completa do efeito hormonal gestacional residual).</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block">Risco Futuro Elevado de DM2:</strong>
                    <p className="text-slate-300">Estimular amamentação e estilo de vida saudável. O risco de desenvolver DM2 ao longo da vida é estimado em <strong>até 7 a 10 vezes maior que a população geral</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Rodapé Acadêmico Institucional */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
        Documento de estudo elaborado a partir da aula &ldquo;Diabetes na gestação&rdquo; (UNIP Medicina) com aprofundamento em literatura primária e diretrizes (FEBRASGO, SBD, OMS/IADPSG, ADA, ACOG).
      </div>
    </div>
  );
}
