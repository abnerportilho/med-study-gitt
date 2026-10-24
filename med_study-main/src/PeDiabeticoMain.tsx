import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Footprints, Printer, Copy, Check, Eye, FileText, Sparkles, ShieldAlert, SlidersHorizontal, User } from 'lucide-react';

// ==========================================================================
// Guia de Cuidados com os Pés no Diabetes
// Mesmo modelo do Guia do Paciente de DRC: orientações numeradas, sinais de alarme,
// "as regras" e folha A4 colorida de 1 página. Risco e intervalo de exame: IWGDF 2023.
// ==========================================================================

interface Section {
  n: number;
  title: string;
  intro?: string;
  bullets: string[];
  footer: string;
  c: { border: string; bg: string; line: string; dot: string; title: string; footer: string; screen: string };
}

const SECTIONS: Section[] = [
  {
    n: 1,
    title: 'Olhe os seus pés todos os dias',
    intro: 'O diabetes pode tirar a sensibilidade dos pés: uma ferida pode aparecer sem doer.',
    bullets: [
      'olhe a sola, o calcanhar e entre os dedos, com a ajuda de um espelho;',
      'se não enxergar bem, peça para um familiar olhar;',
      'procure bolhas, cortes, calos, rachaduras, vermelhidão, inchaço ou mudança de cor.',
    ],
    footer: '✓ Os seus olhos fazem o papel da dor que você pode não sentir.',
    c: { border: 'border-blue-400', bg: 'bg-blue-50/80', line: 'border-blue-200', dot: 'bg-blue-600', title: 'text-blue-950', footer: 'text-blue-900', screen: 'border-blue-500/40 text-blue-300' },
  },
  {
    n: 2,
    title: 'Lave e seque com cuidado',
    bullets: [
      'lave os pés todo dia com água morna e sabonete neutro;',
      'teste a temperatura da água com o cotovelo ou a mão, nunca com o pé;',
      'não deixe os pés de molho (escalda-pés amolece e machuca a pele);',
      'seque bem, principalmente entre os dedos, com toalha macia e sem esfregar.',
    ],
    footer: '✓ Umidade entre os dedos favorece micose e feridas.',
    c: { border: 'border-cyan-400', bg: 'bg-cyan-50/80', line: 'border-cyan-200', dot: 'bg-cyan-600', title: 'text-cyan-950', footer: 'text-cyan-900', screen: 'border-cyan-500/40 text-cyan-300' },
  },
  {
    n: 3,
    title: 'Hidrate a pele',
    bullets: [
      'passe creme hidratante na sola, no calcanhar e no peito do pé todos os dias;',
      'nunca passe creme entre os dedos;',
      'calcanhar rachado é porta de entrada para infecção: hidrate e mostre na consulta.',
    ],
    footer: '✓ Pele hidratada não racha.',
    c: { border: 'border-emerald-500', bg: 'bg-emerald-50/85', line: 'border-emerald-200', dot: 'bg-emerald-600', title: 'text-emerald-950', footer: 'text-emerald-900', screen: 'border-emerald-500/40 text-emerald-300' },
  },
  {
    n: 4,
    title: 'Corte as unhas do jeito certo',
    bullets: [
      'corte reto, sem arredondar nem cavar os cantos, e lixe as pontas;',
      'não corte nem empurre as cutículas;',
      'unha grossa, encravada ou se você não enxerga bem: peça ajuda a um profissional de saúde.',
    ],
    footer: '✓ Canto cavado vira unha encravada e infecção.',
    c: { border: 'border-purple-400', bg: 'bg-purple-50/80', line: 'border-purple-200', dot: 'bg-purple-600', title: 'text-purple-950', footer: 'text-purple-900', screen: 'border-purple-500/40 text-purple-300' },
  },
  {
    n: 5,
    title: 'Não mexa em calos sozinho',
    bullets: [
      'não corte calos, não use lâmina, alicate ou lixa de metal;',
      'não use calicida ou produtos com ácido;',
      'calo é sinal de pressão do calçado: mostre na consulta.',
    ],
    footer: '✓ Um corte pequeno no pé diabético pode virar uma ferida grande.',
    c: { border: 'border-amber-400', bg: 'bg-amber-50/80', line: 'border-amber-200', dot: 'bg-amber-600', title: 'text-amber-950', footer: 'text-amber-900', screen: 'border-amber-500/40 text-amber-300' },
  },
  {
    n: 6,
    title: 'Meias',
    bullets: [
      'prefira meias claras, para ver se há sangue ou secreção;',
      'sem costuras grossas e sem elástico apertado, de preferência de algodão;',
      'troque todos os dias e não use meia furada ou remendada.',
    ],
    footer: '✓ Meia certa protege a pele do atrito.',
    c: { border: 'border-teal-400', bg: 'bg-teal-50/80', line: 'border-teal-200', dot: 'bg-teal-600', title: 'text-teal-950', footer: 'text-teal-900', screen: 'border-teal-500/40 text-teal-300' },
  },
  {
    n: 7,
    title: 'Calçados: nunca ande descalço',
    bullets: [
      'nem em casa, na areia ou na beira da piscina;',
      'use sapato fechado, macio, largo e fundo na frente, sem costura por dentro, com cadarço ou velcro;',
      'evite chinelo de dedo, salto alto e bico fino;',
      'compre no fim do dia e use o sapato novo aos poucos (cerca de 1 hora por dia no começo);',
      'antes de calçar, olhe e passe a mão por dentro do sapato.',
    ],
    footer: '✓ Pedrinha ou costura dentro do sapato machuca sem você sentir.',
    c: { border: 'border-indigo-400', bg: 'bg-indigo-50/80', line: 'border-indigo-200', dot: 'bg-indigo-600', title: 'text-indigo-950', footer: 'text-indigo-900', screen: 'border-indigo-500/40 text-indigo-300' },
  },
  {
    n: 8,
    title: 'Cuidado com o calor',
    bullets: [
      'não use bolsa de água quente, aquecedor ou cobertor elétrico nos pés;',
      'cuidado com areia, piso e asfalto quentes;',
      'pés frios à noite: use meias.',
    ],
    footer: '✓ Sem sensibilidade, a queimadura acontece sem aviso.',
    c: { border: 'border-orange-400', bg: 'bg-orange-50/80', line: 'border-orange-200', dot: 'bg-orange-600', title: 'text-orange-950', footer: 'text-orange-900', screen: 'border-orange-500/40 text-orange-300' },
  },
  {
    n: 9,
    title: 'Controle o diabetes e não fume',
    bullets: [
      'glicemia controlada protege os nervos e a circulação e ajuda a cicatrizar;',
      'o cigarro fecha os vasos que levam sangue aos pés;',
      'em toda consulta, tire os sapatos e as meias para examinar os pés.',
    ],
    footer: '✓ Cuidar do diabetes também é cuidar dos pés.',
    c: { border: 'border-slate-400', bg: 'bg-slate-50', line: 'border-slate-200', dot: 'bg-slate-600', title: 'text-slate-950', footer: 'text-slate-800', screen: 'border-slate-500/40 text-slate-300' },
  },
];

const ALARM_SAME_DAY = [
  'ferida, bolha, corte ou rachadura, mesmo sem dor;',
  'vermelhidão, calor ou inchaço no pé;',
  'pele roxa ou preta;',
  'pus, secreção ou mau cheiro;',
  'unha encravada inflamada;',
  'dor, formigamento ou dormência que começou agora.',
];
const ALARM_URGENT = 'Ferida com febre, área preta ou vermelhidão que se espalha rápido: vá ao pronto-socorro.';

const FOOT_RULES: { text: string; cls: string }[] = [
  { text: '1. OLHE OS PÉS TODO DIA.', cls: 'bg-blue-100/80 border-blue-300 text-blue-950' },
  { text: '2. SEQUE BEM ENTRE OS DEDOS.', cls: 'bg-cyan-100/80 border-cyan-300 text-cyan-950' },
  { text: '3. CREME SIM, MAS NÃO ENTRE OS DEDOS.', cls: 'bg-emerald-100/80 border-emerald-300 text-emerald-950' },
  { text: '4. UNHA CORTADA RETA.', cls: 'bg-purple-100/80 border-purple-300 text-purple-950' },
  { text: '5. NUNCA ANDE DESCALÇO.', cls: 'bg-indigo-100/80 border-indigo-300 text-indigo-950' },
  { text: '6. OLHE DENTRO DO SAPATO ANTES DE CALÇAR.', cls: 'bg-amber-100/80 border-amber-300 text-amber-950' },
  { text: '7. NADA DE BOLSA QUENTE OU ESCALDA-PÉS.', cls: 'bg-orange-100/80 border-orange-300 text-orange-950' },
  { text: '8. FERIDA NO PÉ: PROCURE A UNIDADE NO MESMO DIA.', cls: 'bg-red-600 border-red-700 text-white' },
];

// Estratificação de risco IWGDF 2023 e intervalo de exame dos pés pela equipe.
const RISKS = [
  { value: '', label: 'Não informar', interval: '' },
  { value: '0', label: 'Risco 0 (muito baixo)', interval: '1 vez por ano' },
  { value: '1', label: 'Risco 1 (baixo)', interval: 'a cada 6 a 12 meses' },
  { value: '2', label: 'Risco 2 (moderado)', interval: 'a cada 3 a 6 meses' },
  { value: '3', label: 'Risco 3 (alto)', interval: 'a cada 1 a 3 meses' },
];
const RISK_HINT =
  '0: sensibilidade e pulsos normais • 1: perda de sensibilidade OU doença arterial • 2: as duas, ou uma delas com deformidade • 3: perda de sensibilidade ou doença arterial com úlcera ou amputação prévia, ou DRC estágio 5.';

const WEEK = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const CHECKLIST = ['Olhei os pés (sola, calcanhar e entre os dedos)', 'Lavei e sequei entre os dedos', 'Passei creme (fora dos dedos)', 'Olhei dentro do sapato antes de calçar'];

export default function PeDiabeticoMain() {
  const [patientName, setPatientName] = useState('');
  const [risk, setRisk] = useState('');
  const [activeTab, setActiveTab] = useState<'orientacoes' | 'alarme' | 'a4_print'>('orientacoes');
  const [viewMode, setViewMode] = useState<'app' | 'a4'>('app');
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const riskInfo = RISKS.find((r) => r.value === risk) ?? RISKS[0];

  useEffect(() => {
    setIsMounted(true);
    const before = () => document.body.classList.add('pe-print-active');
    const after = () => document.body.classList.remove('pe-print-active');
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
      document.body.classList.remove('pe-print-active');
    };
  }, []);

  const handlePrint = () => {
    document.body.classList.add('pe-print-active');
    const origTitle = document.title;
    document.title = `Cuidados_Pes_Diabetes_${(patientName || 'Paciente').trim().replace(/[^a-zA-Z0-9]/g, '_')}`;
    requestAnimationFrame(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('pe-print-active');
        document.title = origTitle;
      }, 1000);
    });
  };

  const copyText = () => {
    let t = `CUIDANDO DOS SEUS PÉS NO DIABETES\nPaciente: ${patientName || '_________________________________'}\n`;
    if (riskInfo.value) t += `${riskInfo.label}: exame dos pés pela equipe ${riskInfo.interval}.\n`;
    SECTIONS.forEach((s) => {
      t += `\n${s.n}. ${s.title.toUpperCase()}\n${s.intro ? `${s.intro}\n` : ''}${s.bullets.map((b) => `• ${b}`).join('\n')}\n${s.footer.replace('✓ ', '')}\n`;
    });
    t += `\nPROCURE A UNIDADE DE SAÚDE NO MESMO DIA SE TIVER:\n${ALARM_SAME_DAY.map((b) => `• ${b}`).join('\n')}\n${ALARM_URGENT}\n`;
    t += `\nAS REGRAS DOS PÉS\n${FOOT_RULES.map((r) => r.text.replace(/^\d+\. /, '')).join('\n')}\n`;
    navigator.clipboard.writeText(t);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const docProps = { patientName, riskLabel: riskInfo.value ? riskInfo.label : '', riskInterval: riskInfo.interval };

  const preview = (
    <div className="flex justify-center p-3 sm:p-8 bg-slate-950/60 rounded-3xl border border-line overflow-x-auto">
      <A4PeDiabeticoDocument {...docProps} isPrintPortal={false} />
    </div>
  );

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16 w-full">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { size: A4 portrait; margin: 6mm 7mm; }
          *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { background: #ffffff !important; color: #0f172a !important; margin: 0 !important; padding: 0 !important; }
          body.pe-print-active #root { display: none !important; }
          #print-portal-pe {
            display: block !important; position: relative !important; width: 100% !important; max-width: 196mm !important;
            margin: 0 auto !important; padding: 0 !important; background: #ffffff !important; color: #0f172a !important;
          }
          #print-portal-pe * { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
        @media screen { #print-portal-pe { display: none; } }
      `,
        }}
      />

      {/* Banner (tela) */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-950/40 via-card to-emerald-950/30 border border-blue-500/20 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-400">
            <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Footprints size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">Endocrinologia • Orientações ao Paciente</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Cuidando dos Seus Pés no Diabetes</h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-2xl leading-relaxed">
            Nove orientações de autocuidado, sinais de alarme e o checklist da semana, numa folha A4 para entregar ao paciente.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setViewMode(viewMode === 'app' ? 'a4' : 'app')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all cursor-pointer ${
              viewMode === 'a4' ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-card border-line text-brand-navy hover:bg-slate-800'
            }`}
          >
            <Eye size={15} />
            {viewMode === 'a4' ? 'Modo Aplicativo' : 'Ver Folha A4'}
          </button>
          <button onClick={copyText} className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 bg-card border border-line text-brand-navy hover:border-emerald-500/40 hover:text-emerald-400 transition-all shadow-sm cursor-pointer">
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>
          <button onClick={handlePrint} className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all active:scale-95 cursor-pointer">
            <Printer size={16} /> Imprimir / Salvar PDF A4
          </button>
        </div>
      </div>

      {/* Personalização */}
      <div className="no-print bg-card/60 backdrop-blur-md p-5 rounded-2xl border border-line flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
            <SlidersHorizontal size={15} className="text-brand-blue" />
            <span>Personalizar Dados do Paciente:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
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
            <div className="flex items-center gap-2 bg-bg px-3 py-1.5 rounded-xl border border-line text-xs">
              <span className="text-ink-muted text-[11px] font-bold">Risco (IWGDF):</span>
              <select value={risk} onChange={(e) => setRisk(e.target.value)} className="bg-transparent text-emerald-400 font-bold focus:outline-none text-xs cursor-pointer">
                {RISKS.map((r) => (
                  <option key={r.value} value={r.value} className="bg-slate-900 text-white">{r.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-ink-muted leading-relaxed">{RISK_HINT}{riskInfo.value && <strong className="text-emerald-300"> Exame dos pés pela equipe: {riskInfo.interval}.</strong>}</p>
      </div>

      {viewMode === 'app' ? (
        <div className="space-y-6">
          <div className="no-print flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
            {[
              { id: 'orientacoes', label: '1. As 9 Orientações', icon: Sparkles },
              { id: 'alarme', label: '2. Sinais de Alarme & Regras', icon: ShieldAlert },
              { id: 'a4_print', label: '3. Prévia da Folha A4', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5 rounded-t-xl' : 'border-transparent text-ink-muted hover:text-brand-navy hover:border-slate-400'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'orientacoes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTIONS.map((s) => (
                <div key={s.n} className={`card p-4 space-y-2 border ${s.c.screen.split(' ')[0]}`}>
                  <h3 className={`text-sm font-bold flex items-center gap-2 ${s.c.screen.split(' ')[1]}`}>
                    <span className="w-6 h-6 rounded-full bg-bg border border-line flex items-center justify-center text-xs font-black">{s.n}</span>
                    {s.title}
                  </h3>
                  {s.intro && <p className="text-xs text-ink-muted leading-relaxed">{s.intro}</p>}
                  <ul className="text-xs text-ink space-y-1 leading-relaxed">
                    {s.bullets.map((b) => <li key={b}>• {b}</li>)}
                  </ul>
                  <p className="text-[11px] font-bold text-ink-muted">{s.footer}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'alarme' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="card p-5 space-y-3 border-red-500/40">
                <h3 className="text-xl font-black text-rose-200">Procure a unidade de saúde no mesmo dia</h3>
                <ul className="text-sm text-ink space-y-1.5 leading-relaxed">
                  {ALARM_SAME_DAY.map((b) => <li key={b}>• {b}</li>)}
                </ul>
                <p className="text-sm font-bold text-red-300">{ALARM_URGENT}</p>
              </div>
              <div className="card p-5 space-y-3 border-emerald-500/30">
                <h3 className="text-xl font-black text-emerald-200">As regras dos pés</h3>
                <ol className="text-sm text-ink space-y-1.5 leading-relaxed">
                  {FOOT_RULES.map((r) => <li key={r.text}>{r.text}</li>)}
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'a4_print' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <span className="text-xs text-emerald-400"><strong>Folha A4 (210 × 297 mm):</strong> orientações, alarme, checklist e regras em 1 página.</span>
                <button onClick={handlePrint} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer">
                  <Printer size={15} /> Imprimir / Salvar PDF A4
                </button>
              </div>
              {preview}
            </div>
          )}
        </div>
      ) : (
        preview
      )}

      {isMounted && typeof document !== 'undefined' &&
        createPortal(
          <div id="print-portal-pe">
            <A4PeDiabeticoDocument {...docProps} isPrintPortal />
          </div>,
          document.body,
        )}
    </div>
  );
}

// ==========================================================================
// FOLHA A4 (retrato, 1 página) — mesmo padrão visual do Guia do Paciente de DRC
// ==========================================================================
function A4PeDiabeticoDocument({
  patientName, riskLabel, riskInterval, isPrintPortal = false,
}: {
  patientName: string;
  riskLabel: string;
  riskInterval: string;
  isPrintPortal?: boolean;
}) {
  return (
    <div
      className={`bg-white text-slate-950 font-sans w-full ${isPrintPortal ? 'max-w-[200mm] p-1 m-0' : 'max-w-[210mm] min-h-[297mm] p-6 sm:p-7 shadow-2xl rounded-sm border border-slate-300'}`}
      style={{ boxSizing: 'border-box', color: '#0f172a', backgroundColor: '#ffffff' }}
    >
      <div className="flex flex-col space-y-2">
        <header className="rounded-xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 text-white p-3 shadow-sm flex items-center justify-center text-center">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="p-1 rounded-md bg-white/20 text-white inline-flex shadow-inner">
                <Footprints size={18} />
              </span>
              <h1 className="text-base sm:text-lg font-black tracking-wide uppercase text-white drop-shadow-sm">Cuidando dos Seus Pés no Diabetes</h1>
            </div>
            <p className="text-[11.5px] text-blue-50 font-medium leading-snug">
              Pequenos cuidados todos os dias evitam feridas, infecções e amputações.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-2 text-[10.5px] px-1">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9.5px]">Paciente: </span>
            <span className="font-bold text-slate-900 text-[11.5px]">{patientName || '______________________________________'}</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9.5px]">Exame dos pés pela equipe: </span>
            <span className="font-bold">{riskInterval ? `${riskInterval} (${riskLabel})` : '______________________'}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-[10px] leading-[1.25]">
          {SECTIONS.map((s) => (
            <div key={s.n} className={`p-2 rounded-xl border-2 ${s.c.border} ${s.c.bg} shadow-xs flex flex-col justify-between`}>
              <div>
                <div className={`flex items-center gap-1.5 border-b ${s.c.line} pb-0.5 mb-1`}>
                  <span className={`w-4 h-4 rounded-full ${s.c.dot} text-white font-black text-[10.5px] flex items-center justify-center shrink-0 shadow-xs`}>{s.n}</span>
                  <h2 className={`font-black text-[10.5px] ${s.c.title} uppercase tracking-tight`}>{s.title}</h2>
                </div>
                {s.intro && <p className="text-slate-800 text-[9.5px] text-justify mb-0.5">{s.intro}</p>}
                <ul className="text-slate-800 space-y-0.5 pl-1 text-[9.5px]">
                  {s.bullets.map((b) => <li key={b}>• {b}</li>)}
                </ul>
              </div>
              <div className={`mt-1 pt-0.5 border-t ${s.c.line} font-bold ${s.c.footer} text-[9px]`}>{s.footer}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[55%_45%] gap-1.5">
          <div className="p-2 rounded-xl border-2 border-rose-500 bg-rose-50/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-rose-200 pb-0.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[10.5px] flex items-center justify-center shrink-0">!</span>
                <h2 className="font-black text-[10.5px] text-rose-950 uppercase tracking-tight">Procure a unidade de saúde no mesmo dia se tiver</h2>
              </div>
              <ul className="text-slate-800 grid grid-cols-2 gap-x-2 gap-y-0.5 pl-1 text-[9.5px]">
                {ALARM_SAME_DAY.map((b) => <li key={b}>• {b}</li>)}
              </ul>
            </div>
            <div className="mt-1 font-black text-white bg-rose-600 p-0.5 rounded text-center text-[9.5px] shadow-xs">⚠️ {ALARM_URGENT}</div>
          </div>

          <div className="p-2 rounded-xl border-2 border-sky-400 bg-sky-50/80 shadow-xs">
            <div className="flex items-center gap-1.5 border-b border-sky-200 pb-0.5 mb-1">
              <span className="w-4 h-4 rounded-full bg-sky-600 text-white font-black text-[10.5px] flex items-center justify-center shrink-0">✓</span>
              <h2 className="font-black text-[10.5px] text-sky-950 uppercase tracking-tight">Minha semana: marque com um X</h2>
            </div>
            <table className="w-full border-collapse text-[9px]">
              <thead>
                <tr>
                  <th className="text-left font-bold text-sky-950 pb-0.5" />
                  {WEEK.map((d) => <th key={d} className="font-bold text-sky-950 pb-0.5 w-[9%]">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {CHECKLIST.map((item) => (
                  <tr key={item} className="border-t border-sky-200">
                    <td className="py-1 pr-1 text-slate-800 leading-tight">{item}</td>
                    {WEEK.map((d) => (
                      <td key={d} className="py-1 text-center">
                        <span className="inline-block w-3 h-3 border border-slate-400 rounded-sm bg-white" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 p-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-1 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[11.5px]">★</span>
              <span className="font-black text-[11.5px] text-emerald-950 uppercase tracking-wider">As regras dos pés</span>
            </div>
            <span className="text-[10px] text-emerald-800 font-semibold italic">Se for difícil lembrar de tudo, lembre destas 8 regras:</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-[10px] text-center font-black">
            {FOOT_RULES.map((r) => (
              <div key={r.text} className={`${r.cls} p-1.5 rounded-lg border shadow-xs flex items-center justify-center`}>{r.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
