import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Wind, Printer, Copy, Check, SlidersHorizontal, FileText, Info, Sparkles } from 'lucide-react';

// ==========================================================================
// Plano de Ação na Asma + Técnica Inalatória
// Mesmo modelo do MRPA: editável na tela e folha A4 de 1 página para o paciente.
// Zonas e doses seguem GINA 2024 e as recomendações da SBPT; os textos são editáveis.
// ==========================================================================

type Strategy = 'mart' | 'saba';

interface PlanTexts {
  controller: string;
  reliever: string;
  yellow: string;
  red: string;
}

const PRESETS: Record<Strategy, { label: string; hint: string; texts: PlanTexts }> = {
  mart: {
    label: 'Mesmo inalador para manutenção e alívio (budesonida + formoterol)',
    hint: 'Estratégia preferida pela GINA a partir dos 12 anos: o corticoide inalatório + formoterol é usado todo dia e também na hora da falta de ar.',
    texts: {
      controller: 'Budesonida + formoterol 200/6 mcg (pó seco): 1 inalação de manhã e 1 à noite, todos os dias.',
      reliever: 'O mesmo inalador: 1 inalação sempre que tiver falta de ar, chiado ou tosse.',
      yellow:
        'Use 1 inalação extra de budesonida + formoterol a cada vez que tiver sintomas; pode repetir depois de alguns minutos. Não passe de 12 inalações no dia, somando todas. Continue as doses de manhã e à noite.',
      red: 'Use 1 inalação de budesonida + formoterol a cada poucos minutos, até 6 inalações seguidas, enquanto vai ao pronto-socorro ou espera o SAMU.',
    },
  },
  saba: {
    label: 'Corticoide inalatório + salbutamol para alívio',
    hint: 'Controle com corticoide inalatório (sozinho ou com broncodilatador de longa ação) e salbutamol spray com espaçador na crise.',
    texts: {
      controller: 'Beclometasona 250 mcg spray com espaçador: 1 jato de 12 em 12 horas, todos os dias.',
      reliever: 'Salbutamol 100 mcg spray com espaçador: 2 a 4 jatos se tiver falta de ar, chiado ou tosse.',
      yellow:
        'Salbutamol 100 mcg com espaçador: 2 a 4 jatos a cada 20 minutos na primeira hora (até 3 vezes). Se melhorar, continue 2 a 4 jatos a cada 4 a 6 horas por 1 a 2 dias. Não pare a medicação de controle.',
      red: 'Salbutamol 100 mcg com espaçador: 4 a 10 jatos, repetindo a cada 20 minutos, enquanto vai ao pronto-socorro ou espera o SAMU.',
    },
  },
};

const GREEN_SIGNS = 'Sem falta de ar, chiado ou tosse no dia a dia. Dorme a noite toda. Faz as atividades e exercícios normalmente.';
const YELLOW_SIGNS = 'Tosse, chiado, aperto no peito ou falta de ar. Acorda à noite por causa da asma. Precisa do remédio de alívio mais que o habitual. Resfriado ou gripe.';
const RED_SIGNS =
  'Falta de ar forte, dificuldade para falar ou andar. Lábios ou unhas arroxeados. Sonolência ou confusão. O remédio de alívio não melhora ou o efeito dura menos de 3 horas.';
const YELLOW_DOCTOR = 'Procure a sua unidade de saúde se não melhorar em 2 a 3 dias ou se precisar do alívio muitas vezes por dia.';

type DeviceId = 'espacador' | 'spray' | 'turbuhaler' | 'diskus' | 'capsula' | 'respimat';

const DEVICES: { id: DeviceId; name: string; steps: string[] }[] = [
  {
    id: 'espacador',
    name: 'Spray com espaçador',
    steps: [
      'Tire a tampa e agite o spray.',
      'Encaixe o spray no espaçador.',
      'Solte o ar dos pulmões, longe do bocal.',
      'Bocal entre os dentes e lábios bem fechados (criança: máscara bem ajustada no nariz e na boca).',
      'Aperte o spray 1 vez só.',
      'Puxe o ar devagar e fundo e segure 10 segundos. Se não conseguir, respire normalmente 5 a 6 vezes no espaçador.',
      'Para outro jato, espere 30 segundos, agite e repita.',
      'Lave o espaçador 1 vez por semana com água e detergente neutro e deixe secar sem enxugar.',
    ],
  },
  {
    id: 'spray',
    name: 'Spray sem espaçador',
    steps: [
      'Tire a tampa e agite o spray.',
      'Solte o ar dos pulmões, longe do bocal.',
      'Lábios bem fechados no bocal.',
      'Comece a puxar o ar devagar e, no mesmo momento, aperte o spray 1 vez.',
      'Continue puxando fundo e segure 10 segundos.',
      'Para outro jato, espere 30 segundos e repita. Com espaçador o remédio chega melhor ao pulmão.',
    ],
  },
  {
    id: 'turbuhaler',
    name: 'Turbuhaler',
    steps: [
      'Desrosqueie e tire a tampa.',
      'Segure em pé, com o bocal para cima.',
      'Gire a base até o fim para um lado e volte até ouvir o clique: a dose está pronta.',
      'Solte o ar longe do bocal. Nunca sopre dentro.',
      'Lábios bem fechados no bocal: puxe o ar com força, rápido e fundo.',
      'Segure a respiração 10 segundos e tampe. Troque quando o contador chegar ao zero.',
    ],
  },
  {
    id: 'diskus',
    name: 'Diskus',
    steps: [
      'Abra empurrando o apoio do polegar até o clique.',
      'Empurre a alavanca até o fim (clique): a dose está pronta. Mantenha deitado.',
      'Solte o ar longe do bocal. Nunca sopre dentro.',
      'Lábios no bocal: puxe o ar rápido e fundo.',
      'Segure a respiração 10 segundos.',
      'Feche puxando o apoio do polegar de volta. O contador mostra as doses que restam.',
    ],
  },
  {
    id: 'capsula',
    name: 'Cápsula (Aerolizer e similares)',
    steps: [
      'Abra o inalador e coloque 1 cápsula na hora de usar. Nunca engula a cápsula.',
      'Feche até o clique e aperte os botões laterais 1 vez para furar a cápsula.',
      'Solte o ar longe do bocal.',
      'Lábios no bocal: puxe o ar rápido e fundo. Você deve ouvir a cápsula vibrar.',
      'Segure a respiração 10 segundos.',
      'Abra e veja a cápsula: se sobrou pó, inale de novo. Depois jogue a cápsula fora.',
    ],
  },
  {
    id: 'respimat',
    name: 'Respimat',
    steps: [
      'Com a tampa fechada, gire a base meia-volta no sentido das setas até o clique.',
      'Abra a tampa.',
      'Solte o ar longe do bocal.',
      'Lábios no bocal sem tapar as saídas de ar: puxe o ar devagar e aperte o botão.',
      'Continue puxando fundo e segure 10 segundos.',
      'Feche a tampa.',
    ],
  },
];

const ORAL_RINSE = 'Depois do corticoide inalatório, enxágue a boca com água e cuspa: evita sapinho (candidíase) e rouquidão.';

const pct = (best: number, f: number) => Math.round(best * f);

export default function AsmaPlanoAcaoMain() {
  const [patientName, setPatientName] = useState('');
  const [strategy, setStrategy] = useState<Strategy>('mart');
  const [texts, setTexts] = useState<PlanTexts>(PRESETS.mart.texts);
  const [oralSteroid, setOralSteroid] = useState('');
  const [bestPef, setBestPef] = useState('');
  const [devices, setDevices] = useState<DeviceId[]>(['turbuhaler', 'espacador']);
  const [activeTab, setActiveTab] = useState<'editor' | 'tecnica' | 'preview'>('editor');
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const chooseStrategy = (s: Strategy) => {
    setStrategy(s);
    setTexts(PRESETS[s].texts);
    setDevices(s === 'mart' ? ['turbuhaler', 'espacador'] : ['espacador']);
  };

  const toggleDevice = (id: DeviceId) =>
    setDevices((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  const best = Number(bestPef.replace(',', '.'));
  const pef = best > 0 ? { green: pct(best, 0.8), yellowLow: pct(best, 0.5) } : null;

  useEffect(() => {
    const before = () => document.body.classList.add('asma-print-active');
    const after = () => document.body.classList.remove('asma-print-active');
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
      document.body.classList.remove('asma-print-active');
    };
  }, []);

  const handlePrint = () => {
    document.body.classList.add('asma-print-active');
    const origTitle = document.title;
    document.title = `Plano_Asma_${(patientName || 'Paciente').trim().replace(/[^a-zA-Z0-9]/g, '_')}`;
    requestAnimationFrame(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('asma-print-active');
        document.title = origTitle;
      }, 1000);
    });
  };

  const copyText = () => {
    let t = `PLANO DE AÇÃO NA ASMA\nPaciente: ${patientName || '______________________'}\n`;
    t += `Controle (todo dia): ${texts.controller}\nAlívio: ${texts.reliever}\n`;
    if (pef) t += `Pico de fluxo: melhor ${best} L/min | verde ≥ ${pef.green} | amarela ${pef.yellowLow}–${pef.green - 1} | vermelha < ${pef.yellowLow}\n`;
    t += `Zona amarela: ${texts.yellow}${oralSteroid ? ` Corticoide oral: ${oralSteroid}.` : ''} ${YELLOW_DOCTOR}\n`;
    t += `Zona vermelha: ${texts.red} Ligue 192.\n`;
    t += `Dispositivos orientados: ${DEVICES.filter((d) => devices.includes(d.id)).map((d) => d.name).join(', ') || '-'}\n`;
    navigator.clipboard.writeText(t);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const docProps = { patientName, texts, oralSteroid, best, pef, devices };

  const inputCls =
    'w-full rounded-lg bg-bg border border-line px-3 py-2 text-xs text-ink focus:outline-none focus:border-sky-400/60';
  const areaCls = `${inputCls} min-h-[64px] leading-relaxed`;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { size: A4 portrait; margin: 6mm 7mm; }
          *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { background: #ffffff !important; color: #0f172a !important; margin: 0 !important; padding: 0 !important; }
          body.asma-print-active #root { display: none !important; }
          #print-portal-asma {
            display: block !important; position: relative !important; width: 100% !important; max-width: 196mm !important;
            margin: 0 auto !important; padding: 0 !important; background: #ffffff !important; color: #0f172a !important;
          }
          #print-portal-asma * { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
        @media screen { #print-portal-asma { display: none; } }
      `,
        }}
      />

      {/* Banner (tela) */}
      <div className="no-print flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-gradient-to-r from-sky-950/40 via-card to-emerald-950/30 border border-sky-500/20 rounded-3xl shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sky-400">
            <span className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
              <Wind size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">Pneumologia • Ficha do Paciente</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Plano de Ação na Asma & Técnica Inalatória</h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            Escolha a estratégia, ajuste as doses e marque os inaladores que o paciente usa. A folha A4 sai com as zonas verde, amarela e vermelha e o passo a passo de cada dispositivo.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={handlePrint} className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer">
            <Printer size={16} /> Imprimir / Salvar PDF (A4)
          </button>
          <button onClick={copyText} className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-card border border-line hover:border-brand-blue text-brand-navy flex items-center gap-2 cursor-pointer">
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>
        </div>
      </div>

      {/* Abas */}
      <div className="no-print flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
        {[
          { id: 'editor', label: '1. Plano de Ação', icon: SlidersHorizontal },
          { id: 'tecnica', label: `2. Inaladores (${devices.length})`, icon: Wind },
          { id: 'preview', label: '3. Visualizar Folha Impressa (A4)', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
              activeTab === tab.id ? 'border-sky-400 text-sky-300 bg-sky-500/5 rounded-t-xl' : 'border-transparent text-ink-muted hover:text-brand-navy'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'editor' && (
        <div className="no-print flex flex-col gap-5">
          <div className="card p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="space-y-1 md:col-span-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Paciente</span>
              <input className={inputCls} value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Deixe em branco para escrever à mão" />
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Melhor pico de fluxo (L/min, opcional)</span>
              <input inputMode="numeric" className={inputCls} value={bestPef} onChange={(e) => setBestPef(e.target.value.replace(/[^\d]/g, ''))} placeholder="ex.: 450" />
            </label>
            <div className="space-y-2 md:col-span-3">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">Estratégia (preenche os textos abaixo)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(Object.keys(PRESETS) as Strategy[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => chooseStrategy(s)}
                    className={`text-left p-3 rounded-xl border cursor-pointer ${strategy === s ? 'border-sky-400/60 bg-sky-500/10' : 'border-line bg-bg hover:border-sky-400/30'}`}
                  >
                    <div className="text-xs font-bold text-brand-navy">{PRESETS[s].label}</div>
                    <div className="text-[11px] text-ink-muted leading-relaxed mt-0.5">{PRESETS[s].hint}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="card p-4 space-y-3 border-emerald-500/40">
              <h2 className="text-xs font-black uppercase tracking-wider text-emerald-300">Zona verde: estou bem</h2>
              <p className="text-[11px] text-ink-muted leading-relaxed">{GREEN_SIGNS}</p>
              <label className="space-y-1 block">
                <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Controle (todo dia)</span>
                <textarea className={areaCls} value={texts.controller} onChange={(e) => setTexts({ ...texts, controller: e.target.value })} />
              </label>
              <label className="space-y-1 block">
                <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Alívio (se precisar)</span>
                <textarea className={areaCls} value={texts.reliever} onChange={(e) => setTexts({ ...texts, reliever: e.target.value })} />
              </label>
            </div>
            <div className="card p-4 space-y-3 border-amber-500/40">
              <h2 className="text-xs font-black uppercase tracking-wider text-amber-300">Zona amarela: piorando</h2>
              <p className="text-[11px] text-ink-muted leading-relaxed">{YELLOW_SIGNS}</p>
              <label className="space-y-1 block">
                <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">O que fazer</span>
                <textarea className={`${areaCls} min-h-[110px]`} value={texts.yellow} onChange={(e) => setTexts({ ...texts, yellow: e.target.value })} />
              </label>
              <label className="space-y-1 block">
                <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Corticoide oral (só se prescrito)</span>
                <input className={inputCls} value={oralSteroid} onChange={(e) => setOralSteroid(e.target.value)} placeholder="ex.: Prednisolona 40 mg 1x ao dia por 5 dias" />
              </label>
            </div>
            <div className="card p-4 space-y-3 border-red-500/40">
              <h2 className="text-xs font-black uppercase tracking-wider text-red-300">Zona vermelha: emergência</h2>
              <p className="text-[11px] text-ink-muted leading-relaxed">{RED_SIGNS}</p>
              <label className="space-y-1 block">
                <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">O que fazer</span>
                <textarea className={`${areaCls} min-h-[110px]`} value={texts.red} onChange={(e) => setTexts({ ...texts, red: e.target.value })} />
              </label>
              <p className="text-[11px] text-red-200 font-bold">A folha sempre inclui: ligue 192 (SAMU) ou vá ao pronto-socorro.</p>
            </div>
          </div>
          {pef && (
            <p className="text-[11px] text-ink-muted flex items-center gap-1.5">
              <Info size={12} className="shrink-0" /> Pico de fluxo: verde ≥ {pef.green} • amarela {pef.yellowLow} a {pef.green - 1} • vermelha &lt; {pef.yellowLow} L/min (80% e 50% do melhor valor).
            </p>
          )}
        </div>
      )}

      {activeTab === 'tecnica' && (
        <div className="no-print flex flex-col gap-4">
          <p className="text-xs text-ink-muted flex items-center gap-1.5">
            <Sparkles size={13} className="text-sky-400 shrink-0" /> Marque os inaladores que o paciente usa: só eles vão para a folha (até 3 cabem com folga).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEVICES.map((d) => {
              const on = devices.includes(d.id);
              return (
                <div key={d.id} className={`card p-4 space-y-2 ${on ? 'border-sky-400/50' : 'opacity-70'}`}>
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-navy cursor-pointer">
                    <input type="checkbox" className="accent-sky-500" checked={on} onChange={() => toggleDevice(d.id)} /> {d.name}
                  </label>
                  <ol className="text-xs text-ink space-y-1 list-decimal pl-4 leading-relaxed">
                    {d.steps.map((s) => <li key={s}>{s}</li>)}
                  </ol>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-ink-muted">{ORAL_RINSE}</p>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="flex flex-col gap-4">
          <div className="no-print flex items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Printer size={16} className="text-emerald-400" /> Folha A4 Retrato • Prévia de Impressão
            </div>
            <button onClick={handlePrint} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
              <Printer size={15} /> Imprimir Agora
            </button>
          </div>
          <div className="flex justify-center p-3 sm:p-8 bg-slate-950/60 rounded-3xl border border-line overflow-x-auto">
            <A4AsmaPrintDocument {...docProps} isPrintPortal={false} />
          </div>
        </div>
      )}

      {isMounted && typeof document !== 'undefined' &&
        createPortal(
          <div id="print-portal-asma">
            <A4AsmaPrintDocument {...docProps} isPrintPortal />
          </div>,
          document.body,
        )}
    </div>
  );
}

// ==========================================================================
// FOLHA A4 (retrato, 1 página) — mesmo padrão visual do Guia do Paciente de DRC:
// faixa de título em degradê, cartões numerados coloridos e o bloco "As regras".
// ==========================================================================
const DEVICE_COLORS = [
  { border: 'border-sky-400', bg: 'bg-sky-50/80', line: 'border-sky-200', dot: 'bg-sky-600', title: 'text-sky-950' },
  { border: 'border-indigo-400', bg: 'bg-indigo-50/80', line: 'border-indigo-200', dot: 'bg-indigo-600', title: 'text-indigo-950' },
  { border: 'border-purple-400', bg: 'bg-purple-50/80', line: 'border-purple-200', dot: 'bg-purple-600', title: 'text-purple-950' },
  { border: 'border-cyan-400', bg: 'bg-cyan-50/80', line: 'border-cyan-200', dot: 'bg-cyan-600', title: 'text-cyan-950' },
  { border: 'border-blue-400', bg: 'bg-blue-50/80', line: 'border-blue-200', dot: 'bg-blue-600', title: 'text-blue-950' },
  { border: 'border-violet-400', bg: 'bg-violet-50/80', line: 'border-violet-200', dot: 'bg-violet-600', title: 'text-violet-950' },
];

const ASTHMA_RULES: { text: string; cls: string }[] = [
  { text: '1. REMÉDIO DE CONTROLE TODO DIA, MESMO SEM SINTOMAS.', cls: 'bg-emerald-100/80 border-emerald-300 text-emerald-950' },
  { text: '2. ANDE SEMPRE COM O REMÉDIO DE ALÍVIO.', cls: 'bg-sky-100/80 border-sky-300 text-sky-950' },
  { text: '3. ENXÁGUE A BOCA DEPOIS DO CORTICOIDE.', cls: 'bg-teal-100/80 border-teal-300 text-teal-950' },
  { text: '4. MOSTRE COMO USA O INALADOR EM TODA CONSULTA.', cls: 'bg-indigo-100/80 border-indigo-300 text-indigo-950' },
  { text: '5. NÃO FUME E FIQUE LONGE DE FUMAÇA.', cls: 'bg-slate-200/80 border-slate-300 text-slate-900' },
  { text: '6. VACINA DA GRIPE TODO ANO.', cls: 'bg-purple-100/80 border-purple-300 text-purple-950' },
  { text: '7. NÃO PARE O REMÉDIO SEM FALAR COM O MÉDICO.', cls: 'bg-amber-100/80 border-amber-300 text-amber-950' },
  { text: '8. ZONA VERMELHA: LIGUE 192.', cls: 'bg-red-600 border-red-700 text-white' },
];

function NumberDot({ n, cls }: { n: number; cls: string }) {
  return (
    <span className={`w-4 h-4 rounded-full ${cls} text-white font-black text-[10.5px] flex items-center justify-center shrink-0 shadow-xs`}>
      {n}
    </span>
  );
}

function A4AsmaPrintDocument({
  patientName, texts, oralSteroid, best, pef, devices, isPrintPortal = false,
}: {
  patientName: string;
  texts: PlanTexts;
  oralSteroid: string;
  best: number;
  pef: { green: number; yellowLow: number } | null;
  devices: DeviceId[];
  isPrintPortal?: boolean;
}) {
  const chosen = DEVICES.filter((d) => devices.includes(d.id));
  // Cartões de técnica + o cartão do enxágue fecham a grade de 2 colunas.
  const techCards = chosen.length;
  const rinseSpan = (techCards + 1) % 2 === 1 ? 'col-span-2' : '';

  const zone = (
    n: number,
    title: string,
    signs: string,
    pefTxt: string | null,
    body: React.ReactNode,
    footer: string,
    c: { border: string; bg: string; line: string; dot: string; title: string; footer: string },
  ) => (
    <div className={`col-span-2 p-2 rounded-xl border-2 ${c.border} ${c.bg} shadow-xs flex flex-col justify-between`}>
      <div>
        <div className={`flex items-center justify-between border-b ${c.line} pb-0.5 mb-1`}>
          <div className="flex items-center gap-1.5">
            <NumberDot n={n} cls={c.dot} />
            <h2 className={`font-black text-[11px] ${c.title} uppercase tracking-tight`}>{title}</h2>
          </div>
          {pefTxt && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${c.line} bg-white/80 ${c.title} font-mono`}>{pefTxt}</span>}
        </div>
        <div className="grid grid-cols-[36%_64%] gap-2">
          <div className="text-[9.5px] text-slate-800 text-justify">
            <span className={`font-bold ${c.title} block`}>Como você está:</span>
            {signs}
          </div>
          <div className="text-[9.5px] text-slate-800 space-y-0.5">
            <span className={`font-bold ${c.title} block`}>O que fazer:</span>
            {body}
          </div>
        </div>
      </div>
      <div className={`mt-1 pt-0.5 border-t ${c.line} font-bold ${c.footer} text-[9.5px]`}>{footer}</div>
    </div>
  );

  return (
    <div
      className={`bg-white text-slate-950 font-sans w-full ${isPrintPortal ? 'max-w-[200mm] p-1 m-0' : 'max-w-[210mm] min-h-[297mm] p-6 sm:p-7 shadow-2xl rounded-sm border border-slate-300'}`}
      style={{ boxSizing: 'border-box', color: '#0f172a', backgroundColor: '#ffffff' }}
    >
      <div className="flex flex-col space-y-2">
        <header className="rounded-xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white p-3 shadow-sm flex items-center justify-center text-center">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="p-1 rounded-md bg-white/20 text-white inline-flex shadow-inner">
                <Wind size={18} />
              </span>
              <h1 className="text-base sm:text-lg font-black tracking-wide uppercase text-white drop-shadow-sm">Plano de Ação na Asma</h1>
            </div>
            <p className="text-[11.5px] text-sky-50 font-medium leading-snug">
              Veja em qual cor você está e siga o que está escrito nela. Leve esta folha e os seus inaladores a todas as consultas.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-2 text-[10.5px] px-1">
          <div className="col-span-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9.5px]">Paciente: </span>
            <span className="font-bold text-slate-900 text-[11.5px]">{patientName || '______________________________________________'}</span>
          </div>
          <div className="text-right whitespace-nowrap">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9.5px]">Melhor pico de fluxo: </span>
            <span className="font-bold font-mono">{best > 0 ? `${best} L/min` : '______ L/min'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px] leading-[1.25]">
          {zone(1, '🟢 Zona verde: estou bem', GREEN_SIGNS, pef ? `Pico de fluxo ≥ ${pef.green} L/min` : null, (
            <>
              <div><strong>Controle, todo dia:</strong> {texts.controller}</div>
              <div><strong>Alívio, se precisar:</strong> {texts.reliever}</div>
            </>
          ), '✓ Asma controlada: continue o remédio de controle mesmo se estiver se sentindo bem.', {
            border: 'border-emerald-500', bg: 'bg-emerald-50/85', line: 'border-emerald-200', dot: 'bg-emerald-600', title: 'text-emerald-950', footer: 'text-emerald-900',
          })}

          {zone(2, '🟡 Zona amarela: piorando', YELLOW_SIGNS, pef ? `Pico de fluxo ${pef.yellowLow} a ${pef.green - 1} L/min` : null, (
            <>
              <div>{texts.yellow}</div>
              <div><strong>Corticoide oral:</strong> {oralSteroid || <span className="text-slate-400">só se o médico prescrever: ______________________________</span>}</div>
            </>
          ), `⚠️ ${YELLOW_DOCTOR}`, {
            border: 'border-amber-500', bg: 'bg-amber-50/90', line: 'border-amber-200', dot: 'bg-amber-600', title: 'text-amber-950', footer: 'text-amber-900',
          })}

          {zone(3, '🔴 Zona vermelha: emergência', RED_SIGNS, pef ? `Pico de fluxo < ${pef.yellowLow} L/min` : null, (
            <div>{texts.red}</div>
          ), '', {
            border: 'border-red-500', bg: 'bg-red-50/90', line: 'border-red-200', dot: 'bg-red-600', title: 'text-red-950', footer: 'hidden',
          })}

          <div className="col-span-2 -mt-1 font-black text-white bg-red-600 p-1 rounded text-center text-[11px] shadow-xs">
            🚑 LIGUE 192 (SAMU) OU VÁ AO PRONTO-SOCORRO AGORA. NÃO ESPERE MELHORAR SOZINHO.
          </div>

          {chosen.map((d, i) => {
            const c = DEVICE_COLORS[i % DEVICE_COLORS.length];
            return (
              <div key={d.id} className={`p-2 rounded-xl border-2 ${c.border} ${c.bg} shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className={`flex items-center gap-1.5 border-b ${c.line} pb-0.5 mb-1`}>
                    <NumberDot n={4 + i} cls={c.dot} />
                    <h2 className={`font-black text-[10.5px] ${c.title} uppercase tracking-tight`}>Como usar: {d.name}</h2>
                  </div>
                  <ol className="text-slate-800 space-y-0.5 pl-3 text-[9.5px] list-decimal">
                    {d.steps.map((s) => <li key={s}>{s}</li>)}
                  </ol>
                </div>
              </div>
            );
          })}

          <div className={`${rinseSpan} p-2 rounded-xl border-2 border-teal-400 bg-teal-50/80 shadow-xs flex flex-col justify-between`}>
            <div>
              <div className="flex items-center gap-1.5 border-b border-teal-200 pb-0.5 mb-1">
                <NumberDot n={4 + techCards} cls="bg-teal-600" />
                <h2 className="font-black text-[10.5px] text-teal-950 uppercase tracking-tight">Enxágue a boca e cuide do inalador</h2>
              </div>
              <ul className="text-slate-800 space-y-0.5 pl-1 text-[9.5px]">
                <li>• {ORAL_RINSE}</li>
                <li>• Pó seco (Turbuhaler, Diskus, cápsula): puxe o ar com força e rápido. Spray: puxe devagar e fundo.</li>
                <li>• Nunca sopre dentro do inalador de pó e guarde-o tampado, em lugar seco.</li>
                <li>• Confira o contador de doses e não deixe o remédio acabar.</li>
              </ul>
            </div>
            <div className="mt-1 pt-0.5 border-t border-teal-200 font-bold text-teal-900 text-[9.5px]">
              ✓ A técnica certa faz o remédio chegar ao pulmão.
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-sky-600 bg-gradient-to-br from-sky-50 via-teal-50 to-emerald-50 p-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-sky-200 pb-1 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-sky-600 text-white flex items-center justify-center text-[11.5px]">★</span>
              <span className="font-black text-[11.5px] text-sky-950 uppercase tracking-wider">As regras da asma</span>
            </div>
            <span className="text-[10px] text-sky-800 font-semibold italic">Se for difícil lembrar de tudo, lembre destas 8 regras:</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-[10px] text-center font-black">
            {ASTHMA_RULES.map((r) => (
              <div key={r.text} className={`${r.cls} p-1.5 rounded-lg border shadow-xs flex items-center justify-center`}>{r.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
