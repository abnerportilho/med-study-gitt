import React from 'react';
import { 
  ShieldCheck, Pill, ShieldAlert, CheckCircle2, XCircle,
  AlertTriangle, Sparkles, HeartPulse, HelpCircle, FileText,
  BookmarkCheck, Activity, Layers, ArrowRight
} from 'lucide-react';

export default function PreEclampsiaProfilaxia() {
  return (
    <div className="space-y-6">
      
      {/* 1. AAS & CÁLCIO - EVIDÊNCIA FORTE */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" /> Profilaxia Primária com Evidência Forte (Nível I)
            </h3>
            <p className="text-xs text-slate-400">
              Intervenções baseadas nos grandes ensaios randomizados: <strong>ASPRE (NEJM 2017)</strong> e <strong>Ensaios de Cálcio (NEJM 2024)</strong>.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-full text-xs font-black self-start">
            Padrão-Ouro
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* AAS */}
          <div className="p-6 bg-slate-950 rounded-3xl border-2 border-emerald-700 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900 pb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-600">
                1. ÁCIDO ACETILSALICÍLICO (AAS)
              </span>
              <span className="text-xs font-black text-white font-mono">100 a 150 mg/dia</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>Mecanismo de Ação:</strong> Inibe seletiva e irreversivelmente a COX-1 nas plaquetas, suprimindo o <strong>Tromboxano A2</strong> (potente vasoconstritor e pró-agregante) e preservando a síntese de <strong>Prostaciclina endotelial</strong> (vasodilatadora).
              </p>

              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>Janela Crítica de Início:</strong> Iniciar entre a <strong>12ª e a 16ª semana</strong> (obrigatoriamente antes de 16 semanas). Após a 16ª semana, a invasão trofoblástica já se encerrou e a redução de risco perde a significância estatística (RR 0,59; IC 0,29–1,19).
              </p>

              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-600 space-y-1 text-emerald-200">
                <strong className="block text-white">Controvérsia da Dose: 100 mg vs 150 mg</strong>
                <p>• <strong>ASPRE Trial (NEJM 2017):</strong> A dose de <strong>150 mg/dia à noite</strong> reduziu a pré-eclâmpsia pré-termo em <strong>62% (RR 0,38; NNT = 39)</strong>.</p>
                <p>• Meta-análise de dose-resposta: Doses &lt; 150 mg não mostraram redução expressiva em PE pré-termo. No Brasil, o protocolo do MS preconiza 100 mg, mas a evidência internacional favorece 150 mg (ou ajuste por peso da FIGO: 100mg se &lt; 40kg, 150mg se ≥ 40kg).</p>
              </div>

              <p className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                • <strong>Horário & Duração:</strong> Tomar preferencialmente <strong>à noite, ao deitar</strong> (maior inibição do pico matinal de tromboxano). Manter até a <strong>36ª semana</strong> (suspender antes do parto para segurança anestésica neuroaxial).
              </p>
            </div>
          </div>

          {/* CARBONATO DE CÁLCIO */}
          <div className="p-6 bg-slate-950 rounded-3xl border-2 border-sky-700 space-y-4">
            <div className="flex items-center justify-between border-b border-sky-900 pb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-950 text-sky-300 border border-sky-600">
                2. CARBONATO DE CÁLCIO ELEMENTAR
              </span>
              <span className="text-xs font-black text-white font-mono">1.000 a 1.500 mg/dia</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>Mecanismo de Ação:</strong> Em populações com baixa ingestão dietética de cálcio (&lt; 600-800 mg/dia, realidade comum no Brasil), a suplementação suprime o hormônio paratireóideo (PTH) e reduz o cálcio intracelular no músculo liso vascular, diminuindo a reatividade contrátil.
              </p>

              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <strong>Evidência Cochrane:</strong> Redução de <strong>55% no risco de PE (RR 0,45)</strong>, com redução de até 78% em pacientes de alto risco (RR 0,22).
              </p>

              <div className="p-3 bg-sky-950/40 rounded-xl border border-sky-600 space-y-1 text-sky-200">
                <strong className="block text-white">Atualização Recente: Doses Baixas vs Altas (NEJM 2024)</strong>
                <p>Dois grandes ensaios clínicos randomizados na Índia e Tanzânia (NEJM 2024) testaram <strong>500 mg/dia vs 1.500 mg/dia</strong> e comprovaram a <strong>não-inferioridade da dose baixa</strong> para prevenção de PE.</p>
                <p>• O esquema prático diário de <strong>Carbonato de Cálcio 500 mg 2x/dia (1 g/dia de cálcio)</strong> a partir da 12ª semana até o parto é altamente eficaz e com melhor adesão gastrointestinal.</p>
              </div>

              <p className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                • <em>Dica de Prescrição:</em> Não ingerir junto com suplementos de ferro para evitar competição na absorção entérica (ingerir cálcio no almoço/jantar e ferro em jejum/manhã).
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. O QUE NÃO FUNCIONA (SEM BENEFÍCIO / SINAL DE DANO) & ATIVIDADE FÍSICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SEM BENEFÍCIO COMPROVADO */}
        <div className="bg-slate-900 border-2 border-red-800/80 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-red-900/60 pb-3">
            <h3 className="text-base font-black text-red-300 uppercase flex items-center gap-2">
              <XCircle className="text-red-400" /> Sem Benefício Comprovado — Atenção em Provas!
            </h3>
            <span className="px-2 py-0.5 bg-red-950 text-red-200 rounded text-[10px] font-black">
              Não Prescrever
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-red-800/60 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-red-400 font-bold uppercase">Vitaminas C e E (Antioxidantes):</strong>
                <span className="text-[10px] bg-red-900 text-white px-2 py-0.5 rounded font-black">SINAL DE DANO</span>
              </div>
              <p className="text-slate-300">
                • Cochrane demonstrou ausência de redução de PE (RR 0,73).
              </p>
              <p className="text-red-200">
                • <strong>Estudo VIP (Lancet):</strong> Mostrou aumento de 30% em hipertensão gestacional (RR 1,3) e aumento no risco de baixo peso fetal ao nascer (RR 1,13)! <strong>NÃO UTILIZAR.</strong>
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-slate-300 font-bold uppercase block">Ômega-3 / Ácidos Graxos Poli-insaturados:</strong>
              <p className="text-slate-400">
                Ensaios clínicos robustos não demonstraram eficácia na prevenção primária ou secundária de pré-eclâmpsia.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-slate-300 font-bold uppercase block">Repouso no Leito & Restrição de Sal:</strong>
              <p className="text-slate-400">
                Não reduzem incidência de PE e aumentam o risco materno de trombose venosa profunda (TVP). A dieta deve ser normossódica.
              </p>
            </div>
          </div>
        </div>

        {/* ATIVIDADE FÍSICA & POPULAÇÕES ESPECIAIS */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-amber-300 uppercase flex items-center gap-2">
              <Activity className="text-amber-400" /> Populações Especiais & Estilo de Vida
            </h3>
            <span className="px-2 py-0.5 bg-amber-950 text-amber-200 rounded text-[10px] font-black">
              Contexto Específico
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <strong className="text-amber-400 font-bold uppercase block">Atividade Física Moderada (≥ 140 min/semana):</strong>
              <p className="text-slate-300">
                Reduz resistência insulínica e disfunção endotelial. Base predominantemente observacional; recomendada para saúde cardiovascular, mas com menor magnitude de efeito que AAS e Cálcio.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border-2 border-indigo-800/80 space-y-1.5">
              <div className="flex justify-between items-center">
                <strong className="text-indigo-300 font-bold uppercase">Síndrome Antifosfolípide (SAAF):</strong>
                <span className="text-[10px] bg-indigo-900 text-white px-2 py-0.5 rounded font-black">AAS + HBPM</span>
              </div>
              <p className="text-slate-300">
                Indicação formal de associação de <strong>AAS em baixa dose + Heparina de Baixo Peso Molecular (Enoxaparina 40 mg/dia SC)</strong>. Em gestantes de alto risco sem trombofilia, o uso de HBPM de rotina <strong>NÃO é recomendado</strong> pelos guidelines.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-purple-800/60 space-y-1.5">
              <strong className="text-purple-300 font-bold uppercase block">Prevenção Secundária (Próxima Gestação):</strong>
              <p className="text-slate-300">
                Pré-eclâmpsia em gravidez anterior confere <strong>RR de 8,4</strong> (o maior fator isolado). Na gravidez subsequente: iniciar <strong>AAS 150 mg + Cálcio</strong> precocemente (&lt; 16 semanas), otimizar peso e comorbidades antes de conceber e realizar vigilância especializada.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
