import React from 'react';
import { 
  Award, ArrowRightLeft, Layers, ShieldCheck, 
  AlertTriangle, CheckCircle2, Ban, Pill, Clock, Stethoscope,
  Flame, ShieldAlert, Sparkles, Target, BookOpen
} from 'lucide-react';

export default function TPPAmniorrexeSintese() {
  const FIVE_MESSAGES = [
    {
      num: 1,
      title: 'Contrações sem mudança cervical não definem TPP',
      desc: 'Contrações uterinas dolorosas regulares só configuram trabalho de parto prematuro se associadas à modificação cervical progressiva (esvaecimento e dilatação). A maioria das queixas álgicas isoladas não evolui para parto verdadeiro em 7 dias.'
    },
    {
      num: 2,
      title: 'Tocólise compra tempo para intervenções úteis, não cura a causa',
      desc: 'O tocolítico tem por alvo a janela de 48 horas para permitir o efeito pleno do corticoide antenatal e a transferência para centro com UTI neonatal. Não se faz tocólise para tentar levar a gravidez até o termo.'
    },
    {
      num: 3,
      title: 'Corticoterapia e neuroproteção dependem do risco real de parto',
      desc: 'Não prescrever corticoide ou sulfato de magnésio apenas pela idade gestacional do calendário se o risco de parto iminente for improvável (como em colos longos > 30 mm ou fibronectina negativa).'
    },
    {
      num: 4,
      title: 'Bolsa rota exige exame especular estéril e abstenção de toques',
      desc: 'Cada toque digital empurra patógenos vaginais diretamente para o polo ovular inferior, multiplicando a taxa de corioamnionite materna e sepse neonatal sem agregar nenhum ganho diagnóstico que o espéculo não traga.'
    },
    {
      num: 5,
      title: 'Infecção ou sofrimento fetal encerram a conduta expectante em qualquer idade gestacional',
      desc: 'Surgindo corioamnionite clínica estabelecida, sangramento importante (DPP) ou perda de vitalidade fetal grave, a idade gestacional deixa de ser o critério orientador: a prioridade máxima torna-se o parto imediato.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* HEADER DE SÍNTESE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Award size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
              Síntese & Diretrizes Práticas
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Cinco Mensagens Fundamentais e Matriz Comparativa Rápida
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          Quadro comparativo lado a lado sintetizando as principais diferenças conceituais e terapêuticas entre <strong>Trabalho de Parto Prematuro com bolsa íntegra</strong> e <strong>Amniorrexe Prematura (RPMO)</strong>, fundamentado nas diretrizes FEBRASGO, ACOG e CDC.
        </p>
      </div>

      {/* QUADRO-RESUMO DE OURO PARA PROVAS: A REGRA DA INFECÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/80 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-amber-800/60 pb-3">
          <div className="flex items-center gap-2.5 text-amber-300 font-black text-base">
            <Target size={22} className="text-amber-400" />
            <span>Resumo de Ouro para Provas de Residência & Decisão Rápida</span>
          </div>
          <span className="text-[11px] font-mono font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-xl shadow-md">
            ALTO RENDIMENTO
          </span>
        </div>

        {/* A REGRA CENTRAL */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/50 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert size={16} />
            <span>A Regra Central:</span>
          </div>
          <p className="text-sm md:text-base font-black text-white leading-snug">
            "Infecção intra-amniótica é contraindicação ao prolongamento artificial da gestação. Na presença de corioamnionite, o objetivo deixa de ser ganhar tempo gestacional e passa a ser tratar a infecção e resolver a gestação com segurança."
          </p>
        </div>

        {/* OS 4 CENÁRIOS COMPARATIVOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          {/* 1. TPP SEM INFECÇÃO */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-emerald-400 font-bold text-sm">TPP sem infecção</strong>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">Bolsa Íntegra</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              &rarr; <strong>Pode-se considerar tocólise + corticoterapia</strong>, conforme a idade gestacional (objetivo: 48h para pulmão e transferência <em>in utero</em>).
            </p>
          </div>

          {/* 2. TPP COM SUSPEITA DE CORIOAMNIONITE */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-rose-400 font-bold text-sm">TPP com suspeita de corioamnionite</strong>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800 font-mono">Infecção</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              &rarr; <strong>NÃO realizar tocólise</strong>; iniciar <strong>antibiótico de amplo espectro</strong> e <strong>conduzir o parto</strong>.
            </p>
          </div>

          {/* 3. RPM SEM INFECÇÃO */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-cyan-400 font-bold text-sm">Amniorrexe pré-termo sem infecção</strong>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800 font-mono">Bolsa Rota</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              &rarr; Em determinadas idades gestacionais (&lt; 34-37 sem), <strong>manejo expectante + corticoide + antibiótico de latência + vigilância</strong> materna e fetal estrita.
            </p>
          </div>

          {/* 4. RPM COM CORIOAMNIONITE */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-rose-400 font-bold text-sm">Amniorrexe pré-termo com corioamnionite</strong>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800 font-mono">Infecção</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              &rarr; <strong>Interromper a gestação</strong> (sem expectativa) + <strong>antibioticoterapia</strong> venosa imediata.
            </p>
          </div>
        </div>

        {/* ALERTA DE PEGADINHA DE PROVA: VIA DE PARTO */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/80 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <BookOpen size={16} />
            <span>Ponto de Atenção em Concursos e Provas Práticas:</span>
          </div>
          <p className="leading-relaxed">
            <strong>Via de Parto na Corioamnionite:</strong> A via de parto é definida puramente por <strong>critérios obstétricos</strong>. A presença isolada de corioamnionite <u>NÃO</u> é indicação imediata de cesariana — a indução do parto vaginal é recomendada caso as condições obstétricas e a vitalidade fetal permitam.
          </p>
        </div>
      </div>

      {/* AS CINCO MENSAGENS PARA LEVAR */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-base border-b border-slate-800 pb-3">
          <Award size={20} />
          <span>Cinco Mensagens Cruciais para a Prática Médica (Dra. Flávia Ximenes)</span>
        </div>

        <div className="space-y-3">
          {FIVE_MESSAGES.map((msg) => (
            <div key={msg.num} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                {msg.num}
              </span>
              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm">{msg.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{msg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MATRIZ COMPARATIVA LADO A LADO: TPP VS RPMO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-500/70 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
            <ArrowRightLeft size={20} />
            <span>Matriz Comparativa Direta: TPP (Bolsa Íntegra) vs RPM Pré-Termo (Bolsa Rota)</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Divergências de Conduta</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="p-3 font-bold uppercase tracking-wider text-[11px]">Parâmetro Clínico</th>
                <th className="p-3 font-bold uppercase tracking-wider text-[11px] text-amber-400 bg-amber-950/20">Trabalho de Parto Prematuro (TPP)</th>
                <th className="p-3 font-bold uppercase tracking-wider text-[11px] text-cyan-400 bg-cyan-950/20">Amniorrexe Prematura (RPM Pré-Termo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-bold text-white">Status das Membranas</td>
                <td className="p-3 bg-amber-950/10">Bolsa das águas <strong>ÍNTEGRA</strong>.</td>
                <td className="p-3 bg-cyan-950/10">Bolsa das águas <strong>ROTA</strong> (perda líquida vaginal).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Exame Físico Inicial</td>
                <td className="p-3 bg-amber-950/10">Toque vaginal + USG-TV com cervicometria e fFN.</td>
                <td className="p-3 bg-cyan-950/10"><strong>Exame especular estéril obrigatório</strong>; toque digital PROIBIDO até TP ativo.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Papel da Tocólise</td>
                <td className="p-3 bg-amber-950/10"><strong>Indicada formalmente</strong> por 48 horas (Nifedipina ou Atosibana) para permitir corticoide.</td>
                <td className="p-3 bg-cyan-950/10"><strong>NÃO recomendada de rotina</strong>. Uso restrito e breve apenas para transporte; NUNCA se infecção.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Antibioticoterapia</td>
                <td className="p-3 bg-amber-950/10"><strong>NÃO indicada para prolongar gestação</strong>; apenas profilaxia para EGB se TP ativo ou ITU.</td>
                <td className="p-3 bg-cyan-950/10"><strong>Obrigatória de latência por 7 dias</strong> (Azitromicina + Ampicilina &rarr; Amoxicilina).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Corticoterapia Antenatal</td>
                <td className="p-3 bg-amber-950/10">Indicada entre 24 e 34 semanas (ou 34-36+6 ALPS) se risco real em 7 dias.</td>
                <td className="p-3 bg-cyan-950/10">Indicada entre 24 e 34 semanas na admissão para todas as gestantes sem corioamnionite.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Sulfato de Magnésio</td>
                <td className="p-3 bg-amber-950/10">Neuroproteção se parto iminente entre 24 e 31+6 sem (ataque 4g + 1g/h).</td>
                <td className="p-3 bg-cyan-950/10">Neuroproteção se parto iminente entre 24 e 31+6 sem (mesmo esquema).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Conduta &ge; 34 Semanas</td>
                <td className="p-3 bg-amber-950/10">Deixar o trabalho de parto evoluir; cessar tocolíticos.</td>
                <td className="p-3 bg-cyan-950/10">Conduta expectante até 36+6 (PPROMT) ou resolução ativa a termo (&ge; 37 sem com indução).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
