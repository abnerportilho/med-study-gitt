import React, { useState } from 'react';
import { 
  Droplet, AlertTriangle, ShieldAlert, CheckCircle2, 
  Search, Eye, Ban, Thermometer, Heart, Activity, Info
} from 'lucide-react';

export default function RPMAvaliacaoDiagnostico() {
  const [activeTab, setActiveTab] = useState<'definicao' | 'diagnostico' | 'armadilhas' | 'corioamnionite'>('diagnostico');

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Droplet size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Rotura Prematura de Membranas (RPMO) · Eixo 1
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Definições, Diagnóstico e Vigilância de Corioamnionite
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          Na RPM pré-termo (&lt; 37 semanas), <strong>prematuridade e infecção competem diretamente</strong>. O diagnóstico seguro exige exame especular rigoroso e a abstenção deliberada do toque digital, acompanhado da vigilância contínua para corioamnionite clínica.
        </p>

        {/* NAVEGAÇÃO */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {[
            { id: 'definicao', label: '1. Definições & Fisiopatologia' },
            { id: 'diagnostico', label: '2. Sequência Diagnóstica & Testes' },
            { id: 'armadilhas', label: '3. Armadilhas & Falso-Positivos' },
            { id: 'corioamnionite', label: '4. Vigilância de Corioamnionite' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-900/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. DEFINIÇÕES & FISIOPATOLOGIA */}
      {activeTab === 'definicao' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Droplet size={20} />
              <span>Conceitos e Fisiopatologia da Amniorrexe</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Degradação do Colágeno Corioamniótico</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm block">RPM a Termo (&ge; 37 semanas)</span>
              <p className="text-slate-300 leading-relaxed">
                Rotura espontânea das membranas antes do início efetivo das contrações de trabalho de parto em feto já maduro.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-semibold">
                Decisão principal: induzir o parto ativamente ou aguardar algumas horas por início espontâneo com vigilância.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
              <span className="font-bold text-amber-400 text-sm block">RPM Pré-Termo (&lt; 37 semanas)</span>
              <p className="text-slate-300 leading-relaxed">
                Rotura ocorrida em fase de imaturidade fetal, onde os riscos da prematuridade competem contra o risco progressivo de infecção ovular ascendente.
              </p>
              <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800 text-amber-200 font-semibold">
                A idade gestacional e a ausência de infecção orientam a manutenção da conduta expectante.
              </div>
            </div>
          </div>

          {/* FISIOPATOLOGIA */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <span className="font-bold text-cyan-300 text-sm block">Mecanismo Molecular Subjacente:</span>
            <p>
              Segue o mesmo eixo inflamatório do TPP: bactérias ascendentes liberam citocinas que estimulam <strong>metaloproteinases de matriz (MMPs)</strong>. A diferença crucial reside no alvo anatômico: em vez de agirem principalmente sobre a matriz cervical, a degradação recai sobre as <strong>fibras de colágeno das membranas corioamnióticas</strong>, enfraquecendo-as até a rotura espontânea.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
              <strong>Ciclo de Retroalimentação:</strong> Após a rotura, a perda da barreira mecânica das membranas facilita exponencialmente a invasão bacteriana maciça, criando um ciclo que tanto perpetua o processo inflamatório quanto acelera a contratilidade uterina reflexa.
            </div>
          </div>
        </div>
      )}

      {/* 2. SEQUÊNCIA DIAGNÓSTICA & TESTES */}
      {activeTab === 'diagnostico' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-500/70 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Eye size={20} />
              <span>Sequência Diagnóstica Obrigatória: Especular Antes de Toque!</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">Padrão-Ouro Visual</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-cyan-600 text-slate-950 flex items-center justify-center font-black text-xs">!</span>
              <span>Sequência Lógica de Atendimento:</span>
            </div>
            <p>
              <strong>1. História Clínica</strong> (perda súbita de líquido transparente morno em grande quantidade) &rarr; <strong>2. Exame Especular Estéril</strong> (visualização direta da saída de líquido pelo orifício externo do colo à manobra de Valsalva ou compressão do fundo uterino de Tarnier) &rarr; <strong>3. Testes Complementares</strong> (se a visualização não for imediata) &rarr; <strong>4. Ultrassonografia Obstétrica</strong>.
            </p>
          </div>

          {/* TABELA DE TESTES COMPLEMENTARES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 block text-sm">1. Teste da Nitrazina (pH Vaginal)</span>
              <p className="text-slate-300 leading-relaxed">
                A secreção vaginal normal é ácida (pH 3,8 a 4,5). O líquido amniótico é alcalino (<strong>pH 7,0 a 7,5</strong>).
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-200">
                <strong>Viragem do papel:</strong> de amarelo para <span className="text-blue-400 font-bold">AZUL escuro</span>.
              </div>
              <p className="text-[11px] text-slate-400">
                <em>Limitações:</em> Sangue, sêmen recente, vaginose bacteriana e urina alcalina provocam falso-positivos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 block text-sm">2. Teste da Cristalização (Samambaia)</span>
              <p className="text-slate-300 leading-relaxed">
                Coleta do fundo de saco vaginal com swab estéril, espalha-se em lâmina de vidro e deixa-se secar ao ar ambiente por 5 a 10 minutos.
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-200">
                <strong>Microscopia:</strong> cristalização do cloreto de sódio (NaCl) com mucina formando padrão clássico de <strong>folha de samambaia</strong>.
              </div>
              <p className="text-[11px] text-slate-400">
                <em>Limitações:</em> Sêmen e muco cervical denso podem alterar o padrão; sangue reduz sensibilidade.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 block text-sm">3. Testes Rápidos (IGFBP-1 / PAMG-1)</span>
              <p className="text-slate-300 leading-relaxed">
                Imunoensaios de microproteínas (Actim PROM para IGFBP-1; AmniSure para PAMG-1).
              </p>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-200">
                <strong>Princípio:</strong> proteínas presentes em concentração milhares de vezes superior no líquido amniótico comparado ao sangue e sêmen.
              </div>
              <p className="text-[11px] text-slate-400">
                Altíssima acurácia (&gt; 97%); reservado para casos com dúvida diagnóstica real devido ao custo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ARMADILHAS DIAGNÓSTICAS */}
      {activeTab === 'armadilhas' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <Ban size={20} />
              <span>Armadilhas Diagnósticas e Regra de Ouro do Toque Digital</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Prevenção de Iatrogenias</span>
          </div>

          {/* O TOQUE DIGITAL É PROIBIDO */}
          <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-800 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <ShieldAlert size={18} />
              <span>REGRA CAPITAL DOS SLIDES: NÃO REALIZAR TOQUE DIGITAL!</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              <strong>Evitar completamente o toque vaginal digital</strong> se a paciente não estiver em franco trabalho de parto ativo. Cada toque digital introduz bactérias do introito vaginal diretamente no colo amolecido e no pólo inferior da cavidade amniótica, encurtando o período de latência e <strong>multiplicando o risco de corioamnionite materna e sepse neonatal</strong> sem agregar nenhum ganho diagnóstico que o exame especular não forneça.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 text-sm block">O que Simula Perda de Líquido Amniótico:</span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Incontinência urinária de esforço:</strong> comum no 3º trimestre devido à compressão vesical pelo pólo cefálico fetal.</li>
                <li><strong>Sêmen recente:</strong> líquido fluido esbranquiçado que pode ser relatado após coito.</li>
                <li><strong>Corrimento fisiológico ou leucorreia infecciosa aumentada:</strong> secreção vaginal profusa associada a monilíase ou vaginose.</li>
                <li><strong>Perda do tampão mucoso:</strong> eliminação de substância mucoide espessa com estrias sanguinolentas.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 text-sm block">Papel Real da Ultrassonografia:</span>
              <p className="text-slate-300 leading-relaxed">
                A presença de <strong>oligoidrâmnio (MBV &lt; 2 cm / ILA &lt; 5 cm)</strong> apoia fortemente a suspeita de RPM, mas <strong>não confirma o diagnóstico sozinho</strong>, pois pode decorrer de insuficiência placentária crônica com restrição de crescimento (RCF) ou malformações renais fetais.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                Por outro lado, um volume de líquido amniótico estritamente normal também não exclui microperfurações altas ou roturas com drenagem intermitente.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. VIGILÂNCIA DE CORIOAMNIONITE */}
      {activeTab === 'corioamnionite' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-rose-900/80 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <Thermometer size={20} />
              <span>Vigilância Rigorosa de Corioamnionite Clínica</span>
            </div>
            <span className="text-xs font-mono text-rose-300 font-bold">Critérios de Gibbs</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <Info size={16} className="text-amber-400 shrink-0" />
            <span><strong>Conceito Clínico Fundamental:</strong> A evolução clínica pesa mais do que qualquer exame laboratorial isolado — <strong>corioamnionite é um diagnóstico predominantemente clínico</strong>!</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* SINAIS MATERNOS */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400 text-sm">Sinais Clínicos Maternos</span>
                <span className="text-[10px] font-mono text-rose-300">Critérios Maiores</span>
              </div>
              <ul className="space-y-2 text-slate-200">
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold">Febre Materna:</span>
                  <span className="text-rose-400 font-mono font-bold">&ge; 37,8°C (ou &ge; 38,0°C)</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold">Taquicardia Materna:</span>
                  <span className="text-rose-400 font-mono font-bold">&gt; 100 bpm</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block">Dor à Palpação Uterina:</strong>
                  <span className="text-slate-400 text-[11px]">Hipersensibilidade e irritabilidade miometrial involuntária.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block">Secreção com Odor Fétido:</strong>
                  <span className="text-slate-400 text-[11px]">Saída de líquido amniótico purulento e fétido pelo orifício externo.</span>
                </li>
              </ul>
            </div>

            {/* SINAIS FETAIS E LABORATORIAIS */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400 text-sm">Sinais Fetais e Laboratoriais</span>
                <span className="text-[10px] font-mono text-slate-400">Suporte Complementar</span>
              </div>
              <ul className="space-y-2 text-slate-200">
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold">Taquicardia Fetal Sustentada:</span>
                  <span className="text-amber-400 font-mono font-bold">&gt; 160 bpm por &gt; 10 min</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block">Alteração de Vitalidade:</strong>
                  <span className="text-slate-400 text-[11px]">Desacelerações variáveis recorrentes, perda de variabilidade na CTG ou PBF &le; 6/10.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold">Leucocitose Materna:</span>
                  <span className="text-slate-300 font-mono">&gt; 15.000 com desvio &agrave; esquerda</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block">Proteína C Reativa (PCR):</strong>
                  <span className="text-slate-400 text-[11px]">Pode reforçar a suspeita em dosagens seriadas; não define conduta isolada.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
