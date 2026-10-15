import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { 
  HeartHandshake, 
  Printer, 
  FileText, 
  Copy, 
  Check, 
  ShieldAlert, 
  Droplets, 
  CheckCircle2, 
  XCircle, 
  Info, 
  ChefHat, 
  Salad, 
  User, 
  Pill, 
  Eye, 
  SlidersHorizontal,
  Search,
  Ban,
  Activity,
  Sparkles,
  CigaretteOff
} from 'lucide-react';
import { 
  CKD_HEADER_TEXT, 
  CKD_GUIDE_SECTIONS, 
  CKD_RULES_OF_KIDNEYS, 
  FOOD_DATABASE 
} from './ckdGuideData';

export default function CKDPatientGuide() {
  const [activeTab, setActiveTab] = useState<'manual' | 'regras' | 'alertas' | 'semaforo' | 'a4_print'>('manual');
  const [stage, setStage] = useState<string>('G3b');
  const [patientName, setPatientName] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('Equipe de Nefrologia / Nutrição');
  const [waterLimit, setWaterLimit] = useState<string>('1500');
  const [customNote, setCustomNote] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'app' | 'a4'>('app');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const handleBeforePrint = () => {
      document.body.classList.add('ckd-print-active');
    };
    const handleAfterPrint = () => {
      document.body.classList.remove('ckd-print-active');
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('ckd-print-active');
    };
  }, []);

  // Filtered food list
  const filteredFoods = useMemo(() => {
    return FOOD_DATABASE.filter(item => {
      const matchCat = selectedCategory === 'todas' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.reason.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handlePrint = () => {
    document.body.classList.add('ckd-print-active');
    const originalTitle = document.title;
    const cleanPatient = (patientName || 'Paciente').trim().replace(/[^a-zA-Z0-9]/g, '_');
    document.title = `Manual_DRC_A4_${cleanPatient}`;
    
    requestAnimationFrame(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('ckd-print-active');
        document.title = originalTitle;
      }, 1000);
    });
  };

  const stageOptions = [
    { value: 'G1', label: 'Estágio 1 (G1)' },
    { value: 'G2', label: 'Estágio 2 (G2)' },
    { value: 'G3a', label: 'Estágio 3a (G3a)' },
    { value: 'G3b', label: 'Estágio 3b (G3b)' },
    { value: 'G4', label: 'Estágio 4 (G4)' },
    { value: 'G5', label: 'Estágio 5 Não-Dialítico (G5)' },
    { value: 'G5D', label: 'Estágio 5 em Diálise (G5D)' },
  ];

  const copyPrescriptionText = () => {
    const text = `
CUIDANDO DOS SEUS RINS
Ter Doença Renal Crônica (DRC) significa que seus rins precisam de mais cuidado.
Algumas mudanças simples no dia a dia podem ajudar a proteger seus rins e evitar que a doença avance mais rápido.

Paciente: ${patientName || '_________________________________'}
Estágio da DRC: ${stage || '_____'}
Orientador: ${doctorName}
Data: ${new Date().toLocaleDateString('pt-BR')}

1. USE MENOS SAL
O excesso de sal pode aumentar a pressão arterial e aumentar a sobrecarga sobre os rins.
Por isso:
• use menos sal no preparo dos alimentos;
• evite acrescentar sal depois que a comida estiver pronta;
• dê preferência a temperos naturais;
• reduza alimentos industrializados e embutidos, que costumam ter muito sódio.
Lembre: menos sal ajuda a proteger a pressão e os rins.

2. EVITE EMBUTIDOS E ULTRAPROCESSADOS
Presunto, mortadela, salame, salsicha, linguiça, bacon, macarrão instantâneo, salgadinhos e temperos prontos costumam ter muito sódio e fósforo.
• O consumo frequente desses alimentos pode dificultar o controle da pressão e aumentar a retenção de líquidos.
Prefira comida preparada em casa sempre que possível.

3. NÃO EXAGERE NA CARNE
Seu corpo precisa de proteína, mas o excesso pode aumentar o trabalho dos rins.
Uma forma simples de lembrar:
• a porção de carne da refeição pode ter aproximadamente o tamanho da palma da sua mão.
Prefira mais vezes:
• peixe e frango.
Carne vermelha pode fazer parte da alimentação, mas deve ser consumida com moderação.
A quantidade ideal de proteína pode mudar de pessoa para pessoa.

4. SEMPRE AVISE QUE VOCÊ TEM DOENÇA RENAL
Toda vez que passar por um médico, dentista, pronto-socorro ou receber uma receita nova, lembre de dizer:
“EU TENHO DOENÇA RENAL CRÔNICA ESTÁGIO ${stage || '_____'}”
Isso é importante porque alguns medicamentos precisam ser evitados ou ter suas doses ajustadas.

5. CUIDADO COM ANTI-INFLAMATÓRIOS
Alguns medicamentos usados para dor e inflamação podem diminuir o fluxo de sangue para os rins e piorar seu funcionamento, principalmente em quem já tem Doença Renal Crônica.
Alguns exemplos comuns são:
• Diclofenaco — Voltaren®, Cataflam®;
• Ibuprofeno — Advil®, Alivium®;
• Naproxeno — Flanax®;
• Nimesulida — Nisulid®, Scaflam®;
• Cetoprofeno — Profenid®.
Existem outras marcas com esses mesmos medicamentos. Por isso, não se guie apenas pelo nome da caixa.
Não tome anti-inflamatório por conta própria apenas sobre supervisão medica.

6. CUIDADO COM CHÁS, SUPLEMENTOS E “PRODUTOS NATURAIS”
Natural não significa que seja seguro para os rins.
Algumas ervas e chás podem prejudicar os rins, alterar a pressão, aumentar ou diminuir o potássio ou interagir com seus medicamentos.
Alguns exemplos que devem ser evitados sem orientação médica incluem:
• chá de cavalinha;
• chá ou produtos com alcaçuz;
• uva-ursi / uva-de-urso;
• chá de sene, principalmente quando usado frequentemente como laxante;
• misturas de ervas vendidas como “chá para os rins”, “chá detox”, “chá para desinchar” ou “chá para emagrecer”.
Também tenha cuidado com garrafadas, ervas medicinais, suplementos, vitaminas e produtos de academia. Não inicie suplementos alimentares sem antes conversar com um médico.
Não existe “chá para limpar os rins”

7. MEXA O CORPO
A atividade física ajuda no controle da pressão, do peso, da glicemia e da saúde cardiovascular.
Caminhadas e outras atividades simples já podem ajudar.
O importante é evitar ficar parado por longos períodos e respeitar seus limites.

8. REDUZA AO MÁXIMO O FUMO
O cigarro prejudica os vasos sanguíneos e pode aumentar o risco de doenças do coração e dos rins.
Parar de fumar também faz parte do tratamento da doença renal.
Se estiver difícil parar sozinho, peça ajuda à equipe de saúde.

9. CONTROLE A PRESSÃO E O DIABETES
Pressão alta e diabetes podem piorar a função dos rins ao longo do tempo.
Por isso:
• tome os medicamentos corretamente;
• Não pare, troque ou diminua a dose sem orientação médica;
• acompanhe sua pressão;
• controle a glicemia, se tiver diabetes;
• compareça às consultas e faça os exames solicitados.
Cuidar da pressão e do diabetes também é cuidar dos rins.

10. ÁGUA: CADA PACIENTE É DIFERENTE
A quantidade de agua ideal para você é: ${waterLimit ? `${waterLimit} mL/dia` : '__________________'}
Não há necessidade de aumentar ou diminuir o consumo de agua, atinja a nossa meta.

11. DAPAGLIFLOZINA, EMPAGLIFLOZINA E CUIDADOS DE HIGIENE ÍNTIMA
Medicamentos como Dapagliflozina (Forxiga®) e Empagliflozina (Jardiance®) protegem os rins eliminando açúcar pela urina. Por isso:
• lave ou seque muito bem a região genital após urinar, sem deixar umidade;
• evite roupas íntimas sintéticas e muito apertadas; dê preferência ao algodão;
• ao notar coceira, ardor, vermelhidão ou secreção, avise a equipe médica. O tratamento é simples e rápido!
Manter a região limpa e seca previne micoses e infecções.

AS REGRAS DOS RINS
Se for difícil lembrar de tudo, lembre destas:
MENOS SAL.
MENOS EMBUTIDOS E INDUSTRIALIZADOS.
CARNE SEM EXAGERO.
NÃO TOME ANTI-INFLAMATÓRIO POR CONTA PRÓPRIA.
NÃO FUME.
CONTROLE A PRESSÃO E O DIABETES.
TOME SEUS REMÉDIOS CORRETAMENTE.
E SEMPRE DIGA: “EU TENHO DOENÇA RENAL CRÔNICA.”

${customNote ? `Orientações Específicas:\n${customNote}\n` : ''}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16">
      
      {/* Top Banner & Control Bar (No Print) */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-emerald-950/40 via-card to-brand-blue/10 border border-emerald-500/20 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <HeartHandshake size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">
              Manual Oficial de Orientações ao Paciente
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight flex items-center gap-3">
            {CKD_HEADER_TEXT.title}
          </h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-2xl leading-relaxed">
            {CKD_HEADER_TEXT.p1} {CKD_HEADER_TEXT.p2}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setViewMode(viewMode === 'app' ? 'a4' : 'app')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${
              viewMode === 'a4' 
                ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' 
                : 'bg-card border-line text-brand-navy hover:bg-slate-800'
            }`}
            title="Alternar entre visualização do aplicativo e a folha A4 real"
          >
            <Eye size={15} />
            {viewMode === 'a4' ? 'Modo Aplicativo' : 'Ver Folha A4'}
          </button>

          <button
            onClick={copyPrescriptionText}
            className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 bg-card border border-line text-brand-navy hover:border-emerald-500/40 hover:text-emerald-400 transition-all shadow-sm"
            title="Copiar texto oficial formatado"
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
            title="Imprimir ou salvar diretamente como PDF em 1 folha A4"
          >
            <Printer size={16} />
            Imprimir / Salvar PDF A4
          </button>
        </div>
      </div>

      {/* Personalization Drawer / Config Bar (No Print) */}
      <div className="no-print bg-card/60 backdrop-blur-md p-5 rounded-2xl border border-line flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
          <SlidersHorizontal size={15} className="text-brand-blue" />
          <span>Personalizar Dados do Paciente:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Patient Name Input */}
          <div className="flex items-center gap-2 bg-bg px-3 py-1.5 rounded-xl border border-line text-xs">
            <User size={13} className="text-ink-muted" />
            <input
              type="text"
              placeholder="Nome do Paciente..."
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="bg-transparent text-white focus:outline-none placeholder:text-slate-500 w-36 sm:w-48 text-xs font-medium"
            />
          </div>

          {/* Stage Selector */}
          <div className="flex items-center gap-2 bg-bg px-3 py-1.5 rounded-xl border border-line text-xs">
            <span className="text-ink-muted text-[11px] font-bold">Estágio DRC:</span>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="bg-transparent text-emerald-400 font-bold focus:outline-none text-xs cursor-pointer"
            >
              {stageOptions.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Water intake input */}
          <div className="flex items-center gap-2 bg-bg px-3 py-1.5 rounded-xl border border-line text-xs">
            <Droplets size={13} className="text-cyan-400" />
            <span className="text-ink-muted text-[11px]">Meta de Água:</span>
            <input
              type="text"
              value={waterLimit}
              onChange={(e) => setWaterLimit(e.target.value)}
              placeholder="ex: 1500"
              className="bg-transparent text-white focus:outline-none w-14 text-center font-bold text-xs"
            />
            <span className="text-ink-muted text-[11px]">mL/dia</span>
          </div>

          {/* Doctor / Team input */}
          <div className="flex items-center gap-2 bg-bg px-3 py-1.5 rounded-xl border border-line text-xs">
            <span className="text-ink-muted text-[11px]">Profissional:</span>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="bg-transparent text-white focus:outline-none w-32 sm:w-40 text-xs font-medium"
            />
          </div>
        </div>
      </div>

      {/* MAIN VIEW SWITCHER */}
      {viewMode === 'app' ? (
        <div className="space-y-6">
          {/* Navigation Sub-Tabs */}
          <div className="no-print flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
            {[
              { id: 'manual', label: '1. As 10 Orientações Oficiais', icon: Sparkles },
              { id: 'regras', label: '2. As Regras dos Rins (8 Mandamentos)', icon: CheckCircle2 },
              { id: 'alertas', label: '3. Medicamentos & Chás Proibidos', icon: ShieldAlert },
              { id: 'semaforo', label: '4. Semáforo dos Alimentos', icon: Salad },
              { id: 'a4_print', label: '5. Prévia da Folha A4', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5 rounded-t-xl'
                    : 'border-transparent text-ink-muted hover:text-brand-navy hover:border-slate-400'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: AS 10 ORIENTAÇÕES OFICIAIS DO PDF */}
          {activeTab === 'manual' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Introduction Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-card border border-emerald-500/30 flex items-start gap-3">
                <Info size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-emerald-300">
                    Cuidando dos Seus Rins no Dia a Dia
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {CKD_HEADER_TEXT.p1} {CKD_HEADER_TEXT.p2}
                  </p>
                </div>
              </div>

              {/* Grid of Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {CKD_GUIDE_SECTIONS.map((sec) => (
                  <div
                    key={sec.id}
                    className="card p-5 rounded-2xl border border-line hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-black text-xs">
                          {sec.number}
                        </span>
                        <h3 className="text-sm font-bold text-brand-navy flex-1 ml-2">
                          {sec.number}. {sec.title}
                        </h3>
                      </div>

                      {sec.subtitle && (
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {sec.subtitle}
                        </p>
                      )}

                      {sec.intro && (
                        <p className="text-xs font-semibold text-brand-navy">
                          {sec.intro}
                        </p>
                      )}

                      {sec.bullets && sec.bullets.length > 0 && (
                        <ul className="space-y-1.5 text-xs text-ink-muted">
                          {sec.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-1">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {sec.prefer && (
                        <p className="text-xs font-bold text-emerald-400">
                          {sec.prefer}
                        </p>
                      )}

                      {sec.statement && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center font-bold text-emerald-300 text-xs">
                          {sec.statement.replace('_____', stage || '_____')}
                        </div>
                      )}

                      {sec.medications && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5 text-xs">
                          {sec.medications.map((m, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[11px]">
                              <span className="font-bold text-rose-300">• {m.generic}:</span>
                              <span className="text-ink-muted font-mono">{m.brands}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.note && (
                        <p className="text-[11px] text-ink-muted italic">
                          {sec.note}
                        </p>
                      )}

                      {sec.care && (
                        <p className="text-[11px] text-amber-300/90 font-medium">
                          {sec.care}
                        </p>
                      )}

                      {sec.warning && (
                        <div className="p-2.5 rounded-lg bg-rose-900/30 border border-rose-500/30 text-rose-200 text-xs font-bold">
                          ⚠️ {sec.warning}
                        </div>
                      )}
                    </div>

                    {sec.footer && (
                      <div className="pt-2 border-t border-line/50 text-[11px] font-medium text-emerald-400">
                        {sec.footer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: AS REGRAS DOS RINS */}
          {activeTab === 'regras' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-card to-brand-blue/10 border border-emerald-500/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    <CheckCircle2 size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                      Resumo Prático de Alta Relevância
                    </span>
                    <h3 className="text-2xl font-black text-brand-navy">
                      AS REGRAS DOS RINS
                    </h3>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                  Se for difícil lembrar de tudo no seu dia a dia, lembre destas 8 orientações fundamentais:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {CKD_RULES_OF_KIDNEYS.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-bg/80 border border-line flex items-center gap-3 hover:border-emerald-500/40 transition-all"
                    >
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-sm shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-black text-white">
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MEDICAMENTOS & CHÁS PROIBIDOS */}
          {activeTab === 'alertas' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Alerta Anti-inflamatórios */}
              <div className="p-6 rounded-3xl bg-rose-950/40 border-2 border-rose-500/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-rose-500/30">
                    <Ban size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-400 tracking-widest">
                      Item 5 do Manual Oficial
                    </span>
                    <h3 className="text-xl font-black text-rose-200">
                      Cuidado com Anti-inflamatórios
                    </h3>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-rose-100/90 leading-relaxed">
                  Alguns medicamentos usados para dor e inflamação podem <strong>diminuir o fluxo de sangue para os rins e piorar seu funcionamento</strong>, principalmente em quem já tem Doença Renal Crônica.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-900/40 border border-rose-500/30">
                    <strong className="text-rose-200 block">• Diclofenaco:</strong>
                    <span className="text-rose-300">Voltaren®, Cataflam®</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-900/40 border border-rose-500/30">
                    <strong className="text-rose-200 block">• Ibuprofeno:</strong>
                    <span className="text-rose-300">Advil®, Alivium®</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-900/40 border border-rose-500/30">
                    <strong className="text-rose-200 block">• Naproxeno:</strong>
                    <span className="text-rose-300">Flanax®</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-900/40 border border-rose-500/30">
                    <strong className="text-rose-200 block">• Nimesulida:</strong>
                    <span className="text-rose-300">Nisulid®, Scaflam®</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-900/40 border border-rose-500/30">
                    <strong className="text-rose-200 block">• Cetoprofeno:</strong>
                    <span className="text-rose-300">Profenid®</span>
                  </div>
                </div>
                <p className="text-xs text-rose-300 font-bold pt-1">
                  Existem outras marcas com esses mesmos medicamentos. Por isso, não se guie apenas pelo nome da caixa. Não tome anti-inflamatório por conta própria apenas sobre supervisão médica.
                </p>
              </div>

              {/* Alerta Chás e Produtos Naturais */}
              <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-500/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <ShieldAlert size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest">
                      Item 6 do Manual Oficial
                    </span>
                    <h3 className="text-xl font-black text-amber-200">
                      Cuidado com Chás, Suplementos e “Produtos Naturais”
                    </h3>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                  Natural não significa que seja seguro para os rins. Algumas ervas e chás podem prejudicar os rins, alterar a pressão, aumentar ou diminuir o potássio ou interagir com seus medicamentos.
                </p>
                <div className="p-4 rounded-xl bg-bg border border-line space-y-2 text-xs">
                  <strong className="text-amber-300 block">Exemplos que devem ser evitados sem orientação médica:</strong>
                  <ul className="space-y-1 text-ink-muted">
                    <li>• Chá de cavalinha;</li>
                    <li>• Chá ou produtos com alcaçuz;</li>
                    <li>• Uva-ursi / uva-de-urso;</li>
                    <li>• Chá de sene, principalmente quando usado frequentemente como laxante;</li>
                    <li>• Misturas de ervas vendidas como “chá para os rins”, “chá detox”, “chá para desinchar” ou “chá para emagrecer”.</li>
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-bold text-center">
                  Não existe “chá para limpar os rins”
                </div>
              </div>

              {/* Alerta Dapagliflozina e Higiene Íntima */}
              <div className="p-6 rounded-3xl bg-indigo-950/30 border border-indigo-500/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black">
                    <Droplets size={26} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">
                      Item 11 do Manual Oficial
                    </span>
                    <h3 className="text-xl font-black text-indigo-200">
                      Dapagliflozina, Empagliflozina e Higiene Íntima
                    </h3>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                  Medicamentos da classe dos inibidores de SGLT2 (como Dapagliflozina / Forxiga® e Empagliflozina / Jardiance®) são excelentes para proteger a função renal eliminando glicose na urina. Para evitar micoses ou infecções genitais, siga sempre:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-indigo-900/30 border border-indigo-500/30">
                    <strong className="text-indigo-200 block mb-1">💧 Higiene & Secagem:</strong>
                    <span className="text-indigo-300">Lave ou seque com cuidado a região genital após cada micção, mantendo-a sempre limpa e seca.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-900/30 border border-indigo-500/30">
                    <strong className="text-indigo-200 block mb-1">🩲 Roupas Íntimas:</strong>
                    <span className="text-indigo-300">Dê preferência para peças íntimas de algodão. Evite tecidos sintéticos abafados ou muito justos.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-900/30 border border-indigo-500/30">
                    <strong className="text-indigo-200 block mb-1">🩺 Ao menor sintoma:</strong>
                    <span className="text-indigo-300">Em caso de coceira, vermelhidão, ardor ou corrimento, avise o médico: o tratamento é simples e rápido!</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SEMÁFORO DOS ALIMENTOS */}
          {activeTab === 'semaforo' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Category Filter and Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: 'todas', label: 'Todos os Alimentos' },
                    { id: 'frutas', label: '🍎 Frutas' },
                    { id: 'vegetais', label: '🥦 Vegetais & Legumes' },
                    { id: 'temperos', label: '🌿 Temperos & Sal' },
                    { id: 'proteinas', label: '🍗 Proteínas' },
                    { id: 'bebidas', label: '🥤 Bebidas' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-card border border-line text-ink-muted hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar alimento (ex: frango, sal, banana)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-9 pr-3 py-1.5 rounded-xl bg-card border border-line text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Food List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredFoods.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      item.status === 'verde'
                        ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/60'
                        : item.status === 'amarelo'
                        ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60'
                        : 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-sm text-brand-navy flex items-center gap-2">
                        {item.status === 'verde' && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                        {item.status === 'amarelo' && <Info size={16} className="text-amber-400 shrink-0" />}
                        {item.status === 'vermelho' && <XCircle size={16} className="text-rose-400 shrink-0" />}
                        <span>{item.name}</span>
                      </h4>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.status === 'verde' ? 'bg-emerald-500/20 text-emerald-300' :
                        item.status === 'amarelo' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-rose-500/20 text-rose-300'
                      }`}>
                        {item.status === 'verde' ? 'Preferir' : item.status === 'amarelo' ? 'Moderar' : 'Evitar'}
                      </span>
                    </div>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      {item.reason}
                    </p>

                    {item.tip && (
                      <div className="mt-2 pt-2 border-t border-line/40 text-[11px] text-brand-navy flex items-start gap-1.5">
                        <Sparkles size={12} className="text-amber-400 shrink-0 mt-0.5" />
                        <span><em>Dica:</em> {item.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: PRÉVIA DA FOLHA A4 */}
          {activeTab === 'a4_print' && (
            <div className="space-y-4 screen-only-preview">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="flex items-center gap-2.5 text-xs text-emerald-400">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                  <span>
                    <strong>Folha A4 Padronizada (Padrão 210 × 297 mm):</strong> Todas as informações do documento oficial ajustadas com perfeição e contraste máximo para impressão em 1 página.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copyPrescriptionText}
                    className="px-3.5 py-2 bg-card border border-line text-xs font-bold rounded-xl flex items-center gap-1.5 hover:text-white transition-all shadow-sm"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <Printer size={15} />
                    <span>Imprimir / Salvar PDF A4</span>
                  </button>
                </div>
              </div>

              {/* A4 Sheet Container Preview */}
              <div className="flex justify-center p-3 sm:p-8 bg-slate-950/60 rounded-3xl border border-line overflow-x-auto">
                <A4PrintableDocument
                  patientName={patientName}
                  stage={stage}
                  doctorName={doctorName}
                  waterLimit={waterLimit}
                  customNote={customNote}
                  isPrintMode={false}
                />
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Full A4 View Mode */
        <div className="space-y-4 screen-only-preview">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl">
            <span className="text-xs font-bold text-brand-navy flex items-center gap-2">
              <FileText size={16} className="text-brand-blue" />
              <span>Pré-visualização da Folha A4 Oficial</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('app')}
                className="px-3 py-1.5 bg-card border border-line text-xs font-bold rounded-lg hover:text-white"
              >
                Voltar ao App
              </button>
              <button
                onClick={copyPrescriptionText}
                className="px-3 py-1.5 bg-card border border-line text-xs font-bold rounded-lg flex items-center gap-1.5 hover:text-white"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
              >
                <Printer size={14} />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center p-3 sm:p-8 bg-slate-950/80 rounded-3xl border border-line overflow-x-auto">
            <A4PrintableDocument
              patientName={patientName}
              stage={stage}
              doctorName={doctorName}
              waterLimit={waterLimit}
              customNote={customNote}
              isPrintMode={false}
            />
          </div>
        </div>
      )}

      {/* Portal rendered directly in document.body for the browser print engine */}
      {isMounted && typeof document !== 'undefined' && createPortal(
        <div id="print-portal-root">
          <A4PrintableDocument
            patientName={patientName}
            stage={stage}
            doctorName={doctorName}
            waterLimit={waterLimit}
            customNote={customNote}
            isPrintMode={true}
          />
        </div>,
        document.body
      )}

    </div>
  );
}

// ==========================================================================
// A4 PRINTABLE DOCUMENT COMPONENT
// Estilizado, colorido e utilizando toda a folha A4 (Padrão 210 × 297 mm)
// ==========================================================================
interface A4Props {
  patientName?: string;
  stage?: string;
  doctorName?: string;
  waterLimit?: string;
  customNote?: string;
  isPrintMode?: boolean;
}

function A4PrintableDocument({
  waterLimit = '1500',
  isPrintMode = false
}: A4Props) {
  return (
    <div 
      id={isPrintMode ? "ckd-printable-guide" : undefined}
      className={
        isPrintMode
          ? "printable-a4-sheet w-full max-w-[200mm] min-h-[285mm] bg-white text-slate-950 font-sans p-1 m-0 flex flex-col justify-between"
          : "w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-950 p-6 sm:p-7 font-sans shadow-2xl rounded-sm border border-slate-300 flex flex-col justify-between"
      }
      style={{ boxSizing: 'border-box' }}
    >
      <div className="flex-1 flex flex-col justify-between space-y-2">
        
        {/* Banner de Título Colorido e Estilizado */}
        <header className="rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white p-3 shadow-sm flex items-center justify-center text-center print-avoid-break">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="p-1 rounded-md bg-white/20 text-white inline-flex shadow-inner">
                <HeartHandshake size={18} />
              </span>
              <h1 className="text-base sm:text-lg font-black tracking-wide uppercase text-white drop-shadow-sm">
                {CKD_HEADER_TEXT.title}
              </h1>
            </div>
            <p className="text-[10px] text-emerald-50 font-medium leading-snug">
              {CKD_HEADER_TEXT.p2}
            </p>
          </div>
        </header>

        {/* Grade Direta de 2 Colunas com Linhas Pareadas e Faixa Horizontal - Justificação Total e Zero Espaço em Branco */}
        <div className="grid grid-cols-2 gap-1.5 text-[8.5px] leading-[1.25] flex-1">
          
          {/* LINHA 1 - PAR DE ALIMENTAÇÃO E SÓDIO */}
          {/* 1. USE MENOS SAL */}
          <div className="p-2 rounded-xl border-2 border-blue-400 bg-blue-50/80 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-blue-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  1
                </span>
                <h2 className="font-black text-[9px] text-blue-950 uppercase tracking-tight">
                  USE MENOS SAL
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                O excesso de sal aumenta a pressão arterial e a sobrecarga de trabalho sobre os rins.
              </p>
              <p className="font-bold text-blue-900 mt-0.5 text-[8px]">Por isso:</p>
              <ul className="text-slate-800 space-y-0.5 pl-1 text-[8px]">
                <li>• use menos sal no preparo; evite adicionar sal à comida pronta;</li>
                <li>• priorize temperos naturais (alho, cebola, ervas) e evite caldos prontos;</li>
                <li>• reduza alimentos processados e enlatados ricos em sódio.</li>
              </ul>
            </div>
            <div className="mt-1 pt-0.5 border-t border-blue-200 font-bold text-blue-900 text-[8px]">
              ✓ Menos sal ajuda a controlar a pressão e protege os rins.
            </div>
          </div>

          {/* 2. EVITE EMBUTIDOS E ULTRAPROCESSADOS */}
          <div className="p-2 rounded-xl border-2 border-amber-400 bg-amber-50/80 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-amber-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  2
                </span>
                <h2 className="font-black text-[9px] text-amber-950 uppercase tracking-tight">
                  EVITE EMBUTIDOS E ULTRAPROCESSADOS
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                Presunto, salame, mortadela, salsicha, linguiça, bacon, macarrão instantâneo e salgadinhos contêm excesso de sódio e conservantes à base de fósforo artificial.
              </p>
              <p className="text-slate-800 mt-0.5 text-[8px] text-justify">
                • O consumo frequente retém líquidos, eleva a pressão e acelera a perda de função renal.
              </p>
            </div>
            <div className="mt-1 font-black text-amber-950 bg-amber-100/90 px-1.5 py-0.5 rounded text-[8px] border border-amber-200 text-center">
              Prefira comida caseira preparada com ingredientes frescos.
            </div>
          </div>

          {/* LINHA 2 - PAR DE PROTEÍNAS E COMUNICAÇÃO MÉDICA */}
          {/* 3. NÃO EXAGERE NA CARNE */}
          <div className="p-2 rounded-xl border-2 border-purple-400 bg-purple-50/80 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-purple-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-purple-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  3
                </span>
                <h2 className="font-black text-[9px] text-purple-950 uppercase tracking-tight">
                  NÃO EXAGERE NA CARNE
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                Seu corpo precisa de proteínas diárias, mas o excesso gera toxinas que sobrecarregam os filtros dos rins.
              </p>
              <div className="text-purple-900 bg-purple-100/90 px-1.5 py-1 rounded text-[8px] font-semibold border border-purple-200 my-1 text-center">
                ✋ <strong>Regra prática:</strong> a porção de carne da refeição deve ter aproximadamente o tamanho da <strong>palma da sua mão</strong>.
              </div>
              <p className="text-slate-700 text-[8px] text-justify">
                Dê preferência a peixes e aves grelhados. Modere carnes vermelhas gordurosas.
              </p>
            </div>
            <div className="mt-1 pt-0.5 border-t border-purple-200 font-bold text-purple-900 text-[8px]">
              ✓ Proteína no ponto certo protege os rins e preserva a massa muscular.
            </div>
          </div>

          {/* 4. SEMPRE AVISE QUE VOCÊ TEM DOENÇA RENAL */}
          <div className="p-2 rounded-xl border-2 border-emerald-500 bg-emerald-50/85 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-emerald-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  4
                </span>
                <h2 className="font-black text-[9px] text-emerald-950 uppercase tracking-tight">
                  SEMPRE AVISE QUE TEM DOENÇA RENAL
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                Ao consultar qualquer médico, cirurgião-dentista, pronto-socorro ou ao receber receita nova, sempre informe:
              </p>
              <div className="font-black text-emerald-950 bg-emerald-100/90 p-1.5 rounded-lg my-1 text-center text-[8.5px] border-2 border-emerald-300 shadow-xs">
                “EU TENHO DOENÇA RENAL CRÔNICA ESTÁGIO _____ ”
              </div>
              <p className="text-slate-700 text-[7.5px] text-justify">
                Muitos antibióticos, calmantes e analgésicos precisam de doses adaptadas à sua função renal para não intoxicar o organismo.
              </p>
            </div>
            <div className="mt-1 pt-0.5 border-t border-emerald-200 font-bold text-emerald-900 text-[8px]">
              ✓ Comunicar seu estágio evita intoxicações e tratamentos incompatíveis.
            </div>
          </div>

          {/* LINHA 3 - PAR DE GRANDES ALERTAS FARMACOLÓGICOS (ANTI-INFLAMATÓRIOS E FITOTERÁPICOS) */}
          {/* 5. CUIDADO COM ANTI-INFLAMATÓRIOS */}
          <div className="p-2 rounded-xl border-2 border-rose-500 bg-rose-50/90 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-rose-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  5
                </span>
                <h2 className="font-black text-[9px] text-rose-950 uppercase tracking-tight">
                  CUIDADO COM ANTI-INFLAMATÓRIOS
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify leading-tight">
                Medicamentos para dor e inflamação podem <strong>reduzir a circulação sanguínea renal e agravar a DRC</strong>.
              </p>
              <div className="grid grid-cols-2 gap-1 text-[7.5px] my-1">
                <div className="bg-white/90 p-1 rounded border border-rose-200 text-rose-950 font-bold">
                  • Diclofenaco: <span className="font-normal text-slate-700">Voltaren®, Cataflam®</span>
                </div>
                <div className="bg-white/90 p-1 rounded border border-rose-200 text-rose-950 font-bold">
                  • Ibuprofeno: <span className="font-normal text-slate-700">Advil®, Alivium®</span>
                </div>
                <div className="bg-white/90 p-1 rounded border border-rose-200 text-rose-950 font-bold">
                  • Naproxeno: <span className="font-normal text-slate-700">Flanax®</span>
                </div>
                <div className="bg-white/90 p-1 rounded border border-rose-200 text-rose-950 font-bold">
                  • Nimesulida: <span className="font-normal text-slate-700">Nisulid®, Scaflam®</span>
                </div>
                <div className="col-span-2 bg-white/90 p-0.5 rounded border border-rose-200 text-rose-950 font-bold text-center">
                  • Cetoprofeno: <span className="font-normal text-slate-700">Profenid®</span>
                </div>
              </div>
            </div>
            <div className="font-black text-white bg-rose-600 p-0.5 rounded text-center text-[8px] shadow-xs">
              ⚠️ Nunca tome anti-inflamatórios sem receita e supervisão médica!
            </div>
          </div>

          {/* 6. CUIDADO COM CHÁS, SUPLEMENTOS E “PRODUTOS NATURAIS” */}
          <div className="p-2 rounded-xl border-2 border-amber-500 bg-amber-50/90 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-amber-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  6
                </span>
                <h2 className="font-black text-[9px] text-amber-950 uppercase tracking-tight">
                  CUIDADO COM CHÁS E “PRODUTOS NATURAIS”
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify leading-tight">
                O rótulo “natural” não é sinônimo de seguro. Diversas ervas possuem nefrotoxinas e excesso de potássio:
              </p>
              <p className="font-bold text-amber-950 text-[7.5px] mt-0.5">Evite expressamente sem liberação médica:</p>
              <ul className="text-slate-800 text-[7.5px] space-y-0.5 pl-1 my-0.5">
                <li>• cavalinha, alcaçuz, sene (laxante), carambola;</li>
                <li>• chás vendidos como “limpa rins”, “detox”, para emagrecer ou garrafadas;</li>
                <li>• suplementos proteicos de academia e polivitamínicos sem indicação.</li>
              </ul>
            </div>
            <div className="mt-0.5 font-black text-amber-950 bg-amber-200/90 p-0.5 rounded text-center text-[8px] border border-amber-300">
              ⚠️ Não existe “chá para desintoxicar ou limpar os rins”!
            </div>
          </div>

          {/* LINHA 4 - PAR DE HÁBITOS DE VIDA E SAÚDE VASCULAR */}
          {/* 7. MEXA O CORPO */}
          <div className="p-2 rounded-xl border-2 border-teal-400 bg-teal-50/80 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-teal-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-teal-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  7
                </span>
                <h2 className="font-black text-[9px] text-teal-950 uppercase tracking-tight">
                  MEXA O CORPO
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                A atividade física regular ajuda a regular a pressão, controlar o peso, diminuir a glicemia e fortalecer o coração.
              </p>
              <p className="text-slate-700 text-[8px] text-justify mt-0.5">
                Caminhadas de 20 a 30 minutos em ritmo confortável já trazem benefícios imediatos para a sua circulação e disposição.
              </p>
            </div>
            <div className="mt-1 pt-0.5 border-t border-teal-200 font-bold text-teal-900 text-[8px]">
              🏃 O segredo é evitar o sedentarismo e sempre respeitar seus limites.
            </div>
          </div>

          {/* 8. REDUZA AO MÁXIMO O FUMO */}
          <div className="p-2 rounded-xl border-2 border-slate-400 bg-slate-50/85 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-slate-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-slate-700 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  8
                </span>
                <h2 className="font-black text-[9px] text-slate-950 uppercase tracking-tight">
                  REDUZA AO MÁXIMO O FUMO
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                As substâncias do cigarro danificam diretamente a parede dos vasos sanguíneos, endurecendo as artérias e acelerando a falência dos rins e o risco de infarto.
              </p>
              <p className="text-slate-700 text-[7.5px] mt-0.5 text-justify">
                Se sentir dificuldade para cessar o tabagismo por conta própria, converse com nossa equipe de saúde para suporte e opções de tratamento.
              </p>
            </div>
            <div className="mt-1 pt-0.5 border-t border-slate-300 font-bold text-slate-900 text-[8px]">
              🚭 Parar de fumar é um dos passos mais protetores para a vida dos seus rins.
            </div>
          </div>

          {/* LINHA 5 - PAR DE CONTROLE CLÍNICO E HIDRATAÇÃO */}
          {/* 9. CONTROLE A PRESSÃO E O DIABETES */}
          <div className="p-2 rounded-xl border-2 border-sky-400 bg-sky-50/80 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-sky-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-sky-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  9
                </span>
                <h2 className="font-black text-[9px] text-sky-950 uppercase tracking-tight">
                  CONTROLE A PRESSÃO E O DIABETES
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                Hipertensão e diabetes descompensados são as duas principais causas de lesão progressiva nos filtros renais.
              </p>
              <ul className="text-slate-800 space-y-0.5 pl-1 text-[7.5px] mt-0.5">
                <li>• tome todos os medicamentos prescritos nas doses e horários corretos;</li>
                <li>• nunca interrompa ou reduza a dosagem por conta própria;</li>
                <li>• meça a pressão arterial e acompanhe sua glicemia com frequência;</li>
                <li>• realize as consultas e exames laboratoriais de rotina solicitados.</li>
              </ul>
            </div>
            <div className="mt-1 pt-0.5 border-t border-sky-200 font-bold text-sky-900 text-[8px]">
              ✓ Cuidar da pressão e da glicemia é blindar a longevidade dos rins.
            </div>
          </div>

          {/* 10. ÁGUA: CADA PACIENTE É DIFERENTE */}
          <div className="p-2 rounded-xl border-2 border-cyan-500 bg-cyan-50/85 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-cyan-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-cyan-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                  10
                </span>
                <h2 className="font-black text-[9px] text-cyan-950 uppercase tracking-tight">
                  ÁGUA: CADA PACIENTE É DIFERENTE
                </h2>
              </div>
              <p className="text-slate-800 text-[8px] text-justify">
                Ao contrário do mito popular, nem todo paciente com DRC deve beber água em excesso ou de forma desmedida.
              </p>
              <div className="p-1.5 rounded-lg bg-cyan-100/90 border border-cyan-300 text-center my-1">
                <span className="text-[8px] text-cyan-950 block font-semibold">A quantidade de líquidos ideal para você por dia é:</span>
                <span className="font-black text-[11px] text-cyan-950 underline decoration-cyan-700 block mt-0.5">
                  {waterLimit ? `${waterLimit} mL/dia` : '__________________'}
                </span>
              </div>
            </div>
            <div className="mt-0.5 pt-0.5 border-t border-cyan-200 text-center font-bold text-cyan-900 text-[7.5px]">
              Não aumente nem reduza sem recomendação médica: atinja a sua meta diária prescrita.
            </div>
          </div>

          {/* LINHA 6 - FAIXA HORIZONTAL COMPLETA (COL-SPAN-2): 11. DAPAGLIFLOZINA E HIGIENE ÍNTIMA */}
          <div className="col-span-2 p-2 rounded-xl border-2 border-indigo-400 bg-indigo-50/85 shadow-xs print-avoid-break flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-indigo-200 pb-0.5 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-xs">
                    11
                  </span>
                  <h2 className="font-black text-[9px] text-indigo-950 uppercase tracking-tight">
                    DAPAGLIFLOZINA, EMPAGLIFLOZINA E CUIDADOS DE HIGIENE ÍNTIMA
                  </h2>
                </div>
                <span className="text-[7.5px] bg-indigo-200/80 text-indigo-950 px-1.5 py-0.5 rounded font-bold border border-indigo-300">
                  Classe SGLT2 (Forxiga®, Jardiance®)
                </span>
              </div>
              
              <p className="text-slate-800 text-[8px] text-justify mb-1">
                Essas medicações modernas oferecem <strong>forte proteção para o coração e retardam o avanço da DRC</strong> eliminando glicose (açúcar) pela urina. Para evitar micoses ou infecções genitais, adote três cuidados diários essenciais:
              </p>

              <div className="grid grid-cols-3 gap-1.5 text-[7.5px]">
                <div className="bg-white/90 p-1.5 rounded-lg border border-indigo-200 flex flex-col justify-between">
                  <div className="font-bold text-indigo-950 flex items-center gap-1 mb-0.5">
                    <span>💧</span> 1. Lavar e Secar Muito Bem
                  </div>
                  <p className="text-slate-700 text-justify">
                    Após urinar, lave ou seque a região genital com água e papel delicadamente. <strong>Não deixe umidade acumulada</strong>.
                  </p>
                </div>

                <div className="bg-white/90 p-1.5 rounded-lg border border-indigo-200 flex flex-col justify-between">
                  <div className="font-bold text-indigo-950 flex items-center gap-1 mb-0.5">
                    <span>🩲</span> 2. Roupas Íntimas de Algodão
                  </div>
                  <p className="text-slate-700 text-justify">
                    Dê preferência a peças de algodão que permitam a transpiração. Evite roupas sintéticas e tecidos muito apertados/abafados.
                  </p>
                </div>

                <div className="bg-white/90 p-1.5 rounded-lg border border-indigo-200 flex flex-col justify-between">
                  <div className="font-bold text-indigo-950 flex items-center gap-1 mb-0.5">
                    <span>⚠️</span> 3. Atenção aos Sintomas
                  </div>
                  <p className="text-slate-700 text-justify">
                    Ao notar coceira, ardência, vermelhidão ou secreção, avise nossa equipe de saúde imediatamente. O tratamento é simples e rápido.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-1 pt-0.5 border-t border-indigo-200 font-bold text-indigo-900 text-[7.5px] text-center">
              ✓ Manter a região íntima limpa e seca garante a proteção dos seus rins sem desconfortos.
            </div>
          </div>

        </div>

        {/* BLOCO DE DESTAQUE: AS REGRAS DOS RINS (Colorido e de alto impacto visual) */}
        <div className="rounded-xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 p-2 shadow-xs print-avoid-break">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-1 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                ★
              </span>
              <span className="font-black text-[10px] text-emerald-950 uppercase tracking-wider">
                AS REGRAS DOS RINS
              </span>
            </div>
            <span className="text-[8.5px] text-emerald-800 font-semibold italic">
              Se for difícil lembrar de tudo, lembre destas 8 regras:
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-1.5 text-[8.5px] text-center font-black">
            <div className="bg-blue-100/80 p-1.5 rounded-lg border border-blue-300 text-blue-950 shadow-xs flex items-center justify-center">
              1. MENOS SAL.
            </div>
            <div className="bg-amber-100/80 p-1.5 rounded-lg border border-amber-300 text-amber-950 shadow-xs flex items-center justify-center">
              2. MENOS EMBUTIDOS E INDUSTRIALIZADOS.
            </div>
            <div className="bg-purple-100/80 p-1.5 rounded-lg border border-purple-300 text-purple-950 shadow-xs flex items-center justify-center">
              3. CARNE SEM EXAGERO.
            </div>
            <div className="bg-rose-100/90 p-1.5 rounded-lg border-2 border-rose-400 text-rose-950 shadow-xs flex items-center justify-center">
              4. NÃO TOME ANTI-INFLAMATÓRIO POR CONTA PRÓPRIA.
            </div>
            <div className="bg-slate-200/80 p-1.5 rounded-lg border border-slate-300 text-slate-900 shadow-xs flex items-center justify-center">
              5. NÃO FUME.
            </div>
            <div className="bg-sky-100/80 p-1.5 rounded-lg border border-sky-300 text-sky-950 shadow-xs flex items-center justify-center">
              6. CONTROLE A PRESSÃO E O DIABETES.
            </div>
            <div className="bg-teal-100/80 p-1.5 rounded-lg border border-teal-300 text-teal-950 shadow-xs flex items-center justify-center">
              7. TOME SEUS REMÉDIOS CORRETAMENTE.
            </div>
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg border border-emerald-700 shadow-xs flex items-center justify-center">
              8. E SEMPRE DIGA: “EU TENHO DOENÇA RENAL CRÔNICA.”
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
