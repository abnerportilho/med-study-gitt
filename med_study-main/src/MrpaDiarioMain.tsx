import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  HeartPulse, Printer, Copy, Check, Trash2, Sparkles, SlidersHorizontal, ShieldAlert, Activity, FileText,
  Sun, Moon, Info, AlertTriangle, CheckCircle2,
} from 'lucide-react';

// ==========================================================================
// Diário de Automonitorização da Pressão Arterial (MRPA)
// Mesmo modelo do Mapa de Glicemia: editável na tela e folha A4 limpa para caneta.
// ==========================================================================

interface Reading {
  sys: string;
  dia: string;
  hr: string;
}

interface DayRecord {
  dayNumber: number;
  dateStr: string;
  dayOfWeek: string;
  morning: Reading[];
  evening: Reading[];
  notes: string;
}

const emptyReading = (): Reading => ({ sys: '', dia: '', hr: '' });

// Protocolos de MRPA mais usados (Diretrizes Brasileiras de MAPA e MRPA, SBC). São atalhos:
// dias e medidas por período também podem ser escolhidos livremente.
const PROTOCOLS = [
  { id: '7x2', label: '7 dias • 2 medidas manhã + 2 noite', days: 7, perSession: 2 },
  { id: '5x3', label: '5 dias • 3 medidas manhã + 3 noite', days: 5, perSession: 3 },
  { id: '7x3', label: '7 dias • 3 medidas manhã + 3 noite', days: 7, perSession: 3 },
];

const DAY_OPTIONS = [3, 5, 7, 10, 14, 21, 28, 30];
const MAX_DAYS = 31;

const protocolLabelFor = (days: number, perSession: number) =>
  `${days} dia${days > 1 ? 's' : ''} • ${perSession} medida${perSession > 1 ? 's' : ''} manhã + ${perSession} noite`;

const toNum = (v: string) => {
  const n = Number(v.replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
};

const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);

export default function MrpaDiarioMain() {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('Dr(a). Médico(a) / Cardiologia');
  const [clinicName, setClinicName] = useState('Ambulatório de Cardiologia & Hipertensão');
  const [currentMeds, setCurrentMeds] = useState('Losartana 50mg 12/12h + Hidroclorotiazida 25mg pela manhã');
  const [arm, setArm] = useState('Esquerdo');
  const [device, setDevice] = useState('Automático de braço, validado');
  const [customInstructions, setCustomInstructions] = useState(
    'Meça pela manhã ANTES de tomar os remédios e do café, e à noite ANTES do jantar. Traga esta folha e o aparelho na próxima consulta.',
  );

  const [numDays, setNumDays] = useState(7);
  const [perSession, setPerSession] = useState(2);
  const protocol = { days: numDays, perSession, label: protocolLabelFor(numDays, perSession) };
  const presetId = PROTOCOLS.find((p) => p.days === numDays && p.perSession === perSession)?.id ?? 'custom';
  const [includeHr, setIncludeHr] = useState(false);
  const [discardFirstDay, setDiscardFirstDay] = useState(true);
  const [autoFillDates, setAutoFillDates] = useState(false);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);

  // PA do consultório, para interpretar avental branco / hipertensão mascarada.
  const [officeSys, setOfficeSys] = useState('');
  const [officeDia, setOfficeDia] = useState('');

  const [records, setRecords] = useState<DayRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'orientacoes' | 'stats' | 'preview'>('editor');
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  // Monta (ou ajusta) a grade quando muda o protocolo ou as datas, preservando o que já foi digitado.
  useEffect(() => {
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const start = new Date(startDate + 'T00:00:00');
    setRecords((prev) =>
      Array.from({ length: protocol.days }, (_, i) => {
        const existing = prev[i];
        let dateStr = '';
        let dayOfWeek = '';
        if (autoFillDates) {
          const d = new Date(start);
          d.setDate(start.getDate() + i);
          dateStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
          dayOfWeek = dayNames[d.getDay()];
        }
        const sized = (rs: Reading[] | undefined) =>
          Array.from({ length: protocol.perSession }, (_, k) => rs?.[k] ?? emptyReading());
        return {
          dayNumber: i + 1,
          dateStr: autoFillDates ? dateStr : existing?.dateStr ?? '',
          dayOfWeek: autoFillDates ? dayOfWeek : existing?.dayOfWeek ?? '',
          morning: sized(existing?.morning),
          evening: sized(existing?.evening),
          notes: existing?.notes ?? '',
        };
      }),
    );
  }, [protocol.days, protocol.perSession, startDate, autoFillDates]);

  const setReading = (day: number, session: 'morning' | 'evening', k: number, field: keyof Reading, value: string) => {
    setRecords((prev) =>
      prev.map((r, i) =>
        i !== day ? r : { ...r, [session]: r[session].map((x, j) => (j === k ? { ...x, [field]: value.replace(/[^\d]/g, '').slice(0, 3) } : x)) },
      ),
    );
  };

  const setDayField = (day: number, field: 'dateStr' | 'notes', value: string) =>
    setRecords((prev) => prev.map((r, i) => (i === day ? { ...r, [field]: value } : r)));

  // Médias conforme o protocolo: o 1º dia é de adaptação e costuma ser descartado.
  const stats = useMemo(() => {
    const days = records.filter((r) => !(discardFirstDay && r.dayNumber === 1));
    const collect = (session: 'morning' | 'evening' | 'both') => {
      const rs = days.flatMap((d) => (session === 'both' ? [...d.morning, ...d.evening] : d[session]));
      const valid = rs.map((r) => ({ s: toNum(r.sys), d: toNum(r.dia), h: toNum(r.hr) })).filter((r) => r.s && r.d);
      return {
        n: valid.length,
        sys: avg(valid.map((r) => r.s!)),
        dia: avg(valid.map((r) => r.d!)),
        hr: avg(valid.filter((r) => r.h).map((r) => r.h!)),
      };
    };
    const all = collect('both');
    const morning = collect('morning');
    const evening = collect('evening');
    const expected = days.length * protocol.perSession * 2;
    const allRaw = records.flatMap((d) => [...d.morning, ...d.evening]).map((r) => ({ s: toNum(r.sys), d: toNum(r.dia) }));
    const crisis = allRaw.filter((r) => (r.s ?? 0) >= 180 || (r.d ?? 0) >= 110).length;
    const abnormal = all.sys !== null && all.dia !== null ? all.sys >= 130 || all.dia >= 80 : null;
    const oS = toNum(officeSys);
    const oD = toNum(officeDia);
    const officeHigh = oS && oD ? oS >= 140 || oD >= 90 : null;
    let interpretation: string | null = null;
    if (abnormal !== null) {
      if (officeHigh === null) interpretation = abnormal ? 'Média da MRPA elevada (≥ 130/80 mmHg).' : 'Média da MRPA normal (< 130/80 mmHg).';
      else if (officeHigh && !abnormal) interpretation = 'PA alta no consultório e normal em casa: sugere efeito / hipertensão do avental branco.';
      else if (!officeHigh && abnormal) interpretation = 'PA normal no consultório e elevada em casa: sugere hipertensão mascarada (ou não controle mascarado).';
      else if (officeHigh && abnormal) interpretation = 'PA elevada no consultório e em casa: hipertensão sustentada (ou não controlada).';
      else interpretation = 'PA normal no consultório e em casa: normotensão (ou hipertensão controlada).';
    }
    return { all, morning, evening, expected, crisis, abnormal, interpretation };
  }, [records, discardFirstDay, protocol.perSession, officeSys, officeDia]);

  const fillSample = () => {
    const base = [
      [142, 92], [138, 88], [135, 86], [131, 84], [134, 85], [129, 83], [132, 84],
    ];
    setRecords((prev) =>
      prev.map((r, i) => {
        const [s, d] = base[i % base.length];
        const mk = (off: number) => ({ sys: String(s + off), dia: String(d + (off % 3)), hr: String(70 + (off % 5)) });
        return {
          ...r,
          morning: r.morning.map((_, k) => mk(k * 2 + 3)),
          evening: r.evening.map((_, k) => mk(-k * 2 - 2)),
        };
      }),
    );
  };

  const clearReadings = () =>
    setRecords((prev) =>
      prev.map((r) => ({ ...r, morning: r.morning.map(emptyReading), evening: r.evening.map(emptyReading), notes: '' })),
    );

  useEffect(() => {
    const before = () => document.body.classList.add('mrpa-print-active');
    const after = () => document.body.classList.remove('mrpa-print-active');
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
      document.body.classList.remove('mrpa-print-active');
    };
  }, []);

  const handlePrint = () => {
    document.body.classList.add('mrpa-print-active');
    const origTitle = document.title;
    document.title = `Diario_MRPA_${(patientName || 'Paciente').trim().replace(/[^a-zA-Z0-9]/g, '_')}`;
    requestAnimationFrame(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('mrpa-print-active');
        document.title = origTitle;
      }, 1000);
    });
  };

  const fmt = (r: Reading) => (r.sys && r.dia ? `${r.sys}/${r.dia}${includeHr && r.hr ? ` FC ${r.hr}` : ''}` : '-');

  const copyReportText = () => {
    let text = `DIÁRIO DE AUTOMONITORIZAÇÃO DA PRESSÃO ARTERIAL (MRPA)\n`;
    text += `Paciente: ${patientName || '______________________'}\n`;
    text += `Protocolo: ${protocol.label} | Braço: ${arm} | Aparelho: ${device}\n`;
    text += `Medicamentos: ${currentMeds}\n\nREGISTROS (manhã | noite):\n`;
    records.forEach((d) => {
      const tag = discardFirstDay && d.dayNumber === 1 ? ' [adaptação, fora da média]' : '';
      text += `Dia ${d.dayNumber} ${d.dateStr || '__/__'}${tag}: ${d.morning.map(fmt).join(', ')} | ${d.evening.map(fmt).join(', ')}${d.notes ? ` | Obs: ${d.notes}` : ''}\n`;
    });
    if (stats.all.n) {
      text += `\nMÉDIAS (${stats.all.n} medidas): Geral ${stats.all.sys}/${stats.all.dia} mmHg`;
      text += ` | Manhã ${stats.morning.sys ?? '-'}/${stats.morning.dia ?? '-'} | Noite ${stats.evening.sys ?? '-'}/${stats.evening.dia ?? '-'}\n`;
      if (stats.interpretation) text += `Interpretação: ${stats.interpretation}\n`;
    }
    text += `\nORIENTAÇÕES: ${customInstructions}\n`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const docProps = {
    patientName, doctorName, clinicName, currentMeds, arm, device, customInstructions,
    protocolLabel: protocol.label, perSession: protocol.perSession, includeHr, discardFirstDay, records, stats,
  };

  const inputCls =
    'w-full rounded-lg bg-bg border border-line px-3 py-2 text-xs text-ink focus:outline-none focus:border-rose-400/60';

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { size: A4 portrait; margin: 6mm 7mm; }
          *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { background: #ffffff !important; color: #0f172a !important; margin: 0 !important; padding: 0 !important; }
          body.mrpa-print-active #root { display: none !important; }
          #print-portal-mrpa {
            display: block !important; position: relative !important; width: 100% !important; max-width: 196mm !important;
            margin: 0 auto !important; padding: 0 !important; background: #ffffff !important; color: #0f172a !important;
            page-break-inside: avoid !important; break-inside: avoid !important;
          }
          #print-portal-mrpa * { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
        @media screen { #print-portal-mrpa { display: none; } }
      `,
        }}
      />

      {/* Banner (tela) */}
      <div className="no-print flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-gradient-to-r from-rose-950/40 via-card to-red-950/30 border border-rose-500/20 rounded-3xl shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400">
            <span className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <HeartPulse size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">Cardiologia & Hipertensão • Ferramenta Clínica</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Diário de Automonitorização da Pressão Arterial (MRPA)</h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            Escolha o protocolo (dias e medidas por período), preencha na tela ou imprima a folha A4 em branco para o paciente anotar a caneta. Calcula as médias descartando o 1º dia e interpreta junto com a PA do consultório.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={handlePrint} className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer">
            <Printer size={16} /> Imprimir / Salvar PDF (A4)
          </button>
          <button onClick={copyReportText} className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-card border border-line hover:border-brand-blue text-brand-navy flex items-center gap-2 cursor-pointer">
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>
          <button onClick={fillSample} className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-rose-600/10 border border-rose-500/30 text-rose-300 hover:bg-rose-600/20 flex items-center gap-2 cursor-pointer" title="Preencher com um exemplo para ver as médias">
            <Sparkles size={16} /> Exemplo
          </button>
          <button onClick={clearReadings} className="px-3 py-2.5 rounded-xl font-bold text-xs bg-card border border-line hover:border-red-500/40 text-ink-muted hover:text-red-400 flex items-center gap-1.5 cursor-pointer">
            <Trash2 size={15} /> Limpar
          </button>
        </div>
      </div>

      {/* Abas */}
      <div className="no-print flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
        {[
          { id: 'editor', label: '1. Tabela & Preenchimento', icon: SlidersHorizontal },
          { id: 'orientacoes', label: '2. Técnica & Sinais de Alarme', icon: ShieldAlert },
          { id: 'stats', label: `3. Médias & Interpretação (${stats.all.n} medidas)`, icon: Activity },
          { id: 'preview', label: '4. Visualizar Folha Impressa (A4)', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
              activeTab === tab.id ? 'border-rose-400 text-rose-300 bg-rose-500/5 rounded-t-xl' : 'border-transparent text-ink-muted hover:text-brand-navy'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'editor' && (
        <div className="no-print flex flex-col gap-5">
          {/* Configuração */}
          <div className="card p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Paciente</span>
              <input className={inputCls} value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Deixe em branco para escrever à mão" />
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Médico(a)</span>
              <input className={inputCls} value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Serviço / Ambulatório</span>
              <input className={inputCls} value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Medicação anti-hipertensiva em uso</span>
              <input className={inputCls} value={currentMeds} onChange={(e) => setCurrentMeds(e.target.value)} />
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Protocolo (atalho)</span>
              <select
                className={inputCls}
                value={presetId}
                onChange={(e) => {
                  const p = PROTOCOLS.find((x) => x.id === e.target.value);
                  if (p) {
                    setNumDays(p.days);
                    setPerSession(p.perSession);
                  }
                }}
              >
                {PROTOCOLS.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
                <option value="custom" disabled>Personalizado ({protocol.label})</option>
              </select>
            </label>
            <div className="space-y-1 md:col-span-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Número de dias (até {MAX_DAYS})</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {DAY_OPTIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setNumDays(d)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold cursor-pointer ${numDays === d ? 'border-rose-400/60 bg-rose-500/15 text-rose-200' : 'border-line bg-bg text-ink-muted hover:text-brand-navy'}`}
                  >
                    {d}
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={MAX_DAYS}
                  aria-label="Número de dias"
                  className="w-16 rounded-lg bg-bg border border-line px-2 py-1.5 text-xs font-mono"
                  value={numDays}
                  onChange={(e) => setNumDays(Math.min(MAX_DAYS, Math.max(1, Number(e.target.value) || 1)))}
                />
                <span className="text-[11px] text-ink-muted">dias</span>
              </div>
            </div>
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Medidas por período</span>
              <select className={inputCls} value={perSession} onChange={(e) => setPerSession(Number(e.target.value))}>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} pela manhã + {n} à noite</option>
                ))}
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Braço</span>
              <select className={inputCls} value={arm} onChange={(e) => setArm(e.target.value)}>
                <option>Esquerdo</option>
                <option>Direito</option>
                <option>O de maior PA na 1ª consulta</option>
              </select>
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Aparelho</span>
              <input className={inputCls} value={device} onChange={(e) => setDevice(e.target.value)} />
            </label>
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">Opções</span>
              <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
                <input type="checkbox" className="accent-rose-500" checked={includeHr} onChange={() => setIncludeHr((v) => !v)} /> Coluna de frequência cardíaca (FC)
              </label>
              <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
                <input type="checkbox" className="accent-rose-500" checked={discardFirstDay} onChange={() => setDiscardFirstDay((v) => !v)} /> Descartar o 1º dia nas médias (adaptação)
              </label>
              <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
                <input type="checkbox" className="accent-rose-500" checked={autoFillDates} onChange={() => setAutoFillDates((v) => !v)} /> Datas preenchidas a partir de
                <input type="date" className="rounded bg-bg border border-line px-1.5 py-0.5 text-[11px]" value={startDate} onChange={(e) => setStartDate(e.target.value)} disabled={!autoFillDates} />
              </label>
            </div>
            <label className="space-y-1 md:col-span-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">Orientações do médico (saem na folha)</span>
              <textarea className={`${inputCls} resize-y`} rows={2} value={customInstructions} onChange={(e) => setCustomInstructions(e.target.value)} />
            </label>
          </div>

          {/* Tabela editável */}
          <div className="card overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-ink-muted bg-bg/40 text-[11px]">
                  <th className="px-2 py-2 text-left w-10">Dia</th>
                  <th className="px-2 py-2 text-left w-24">Data</th>
                  {Array.from({ length: protocol.perSession }, (_, k) => (
                    <th key={`m${k}`} className="px-2 py-2 text-center">
                      <span className="inline-flex items-center gap-1 text-amber-300"><Sun size={12} /> Manhã {k + 1}</span>
                    </th>
                  ))}
                  {Array.from({ length: protocol.perSession }, (_, k) => (
                    <th key={`n${k}`} className="px-2 py-2 text-center">
                      <span className="inline-flex items-center gap-1 text-indigo-300"><Moon size={12} /> Noite {k + 1}</span>
                    </th>
                  ))}
                  <th className="px-2 py-2 text-left">Observações</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={r.dayNumber} className={`border-t border-line/60 ${discardFirstDay && r.dayNumber === 1 ? 'bg-slate-800/30' : ''}`}>
                    <td className="px-2 py-1.5 font-bold text-brand-navy">
                      {r.dayNumber}
                      {discardFirstDay && r.dayNumber === 1 && <div className="text-[9px] font-normal text-ink-muted">adaptação</div>}
                    </td>
                    <td className="px-2 py-1.5">
                      <input className="w-20 rounded bg-bg border border-line px-1.5 py-1 text-[11px]" value={r.dateStr} placeholder="__/__" onChange={(e) => setDayField(i, 'dateStr', e.target.value)} />
                    </td>
                    {(['morning', 'evening'] as const).map((session) =>
                      r[session].map((rd, k) => {
                        const s = toNum(rd.sys);
                        const d = toNum(rd.dia);
                        const tone = s && d ? (s >= 180 || d >= 110 ? 'border-red-500/60 bg-red-500/10' : s >= 130 || d >= 80 ? 'border-amber-500/50 bg-amber-500/10' : 'border-emerald-500/40 bg-emerald-500/10') : 'border-line';
                        return (
                          <td key={`${session}${k}`} className="px-1.5 py-1.5">
                            <div className={`flex items-center gap-0.5 justify-center rounded-lg border px-1 py-0.5 ${tone}`}>
                              <input aria-label="Sistólica" inputMode="numeric" className="w-9 bg-transparent text-center font-mono focus:outline-none" placeholder="PAS" value={rd.sys} onChange={(e) => setReading(i, session, k, 'sys', e.target.value)} />
                              <span className="text-ink-muted">/</span>
                              <input aria-label="Diastólica" inputMode="numeric" className="w-8 bg-transparent text-center font-mono focus:outline-none" placeholder="PAD" value={rd.dia} onChange={(e) => setReading(i, session, k, 'dia', e.target.value)} />
                              {includeHr && (
                                <input aria-label="Frequência cardíaca" inputMode="numeric" className="w-8 bg-transparent text-center font-mono text-ink-muted focus:outline-none border-l border-line/60 ml-0.5" placeholder="FC" value={rd.hr} onChange={(e) => setReading(i, session, k, 'hr', e.target.value)} />
                              )}
                            </div>
                          </td>
                        );
                      }),
                    )}
                    <td className="px-2 py-1.5">
                      <input className="w-full min-w-28 rounded bg-bg border border-line px-1.5 py-1 text-[11px]" value={r.notes} placeholder="sintomas, esqueceu remédio..." onChange={(e) => setDayField(i, 'notes', e.target.value)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-ink-muted flex items-center gap-1.5">
            <Info size={12} className="shrink-0" /> Verde: &lt; 130/80 • Amarelo: ≥ 130/80 • Vermelho: ≥ 180/110 (ver sinais de alarme).
          </p>
        </div>
      )}

      {activeTab === 'orientacoes' && (
        <div className="no-print grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Técnica correta de medida em casa</h2>
            <ul className="text-xs text-ink space-y-1.5 list-disc pl-4 leading-relaxed">
              {TECHNIQUE.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="card p-5 space-y-3 border-red-500/30">
            <h2 className="text-sm font-bold uppercase tracking-wider text-red-300 flex items-center gap-2"><AlertTriangle size={16} /> Sinais de alarme</h2>
            <p className="text-xs text-ink leading-relaxed">{ALARM}</p>
            <p className="text-xs text-ink-muted leading-relaxed">{ALARM_NO_SYMPTOMS}</p>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="no-print flex flex-col gap-5">
          <div className="card p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatBox label="Média geral" value={stats.all} highlight={stats.abnormal} />
            <StatBox label="Média da manhã" value={stats.morning} />
            <StatBox label="Média da noite" value={stats.evening} />
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">PA no consultório (mmHg)</span>
              <div className="flex items-center gap-1">
                <input inputMode="numeric" className="w-16 rounded-lg bg-bg border border-line px-2 py-1.5 text-xs font-mono" placeholder="PAS" value={officeSys} onChange={(e) => setOfficeSys(e.target.value.replace(/[^\d]/g, ''))} />
                <span className="text-ink-muted">/</span>
                <input inputMode="numeric" className="w-16 rounded-lg bg-bg border border-line px-2 py-1.5 text-xs font-mono" placeholder="PAD" value={officeDia} onChange={(e) => setOfficeDia(e.target.value.replace(/[^\d]/g, ''))} />
              </div>
            </div>
          </div>
          <div className="card p-5 space-y-2 text-xs text-ink leading-relaxed">
            <div>
              <strong>Medidas válidas:</strong> {stats.all.n} de {stats.expected} esperadas{discardFirstDay ? ' (1º dia fora da média)' : ''}.
            </div>
            {stats.interpretation ? (
              <div className={`p-3 rounded-lg border ${stats.abnormal ? 'border-amber-500/40 bg-amber-500/10 text-amber-100' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'}`}>
                <strong>Interpretação:</strong> {stats.interpretation}
              </div>
            ) : (
              <div className="text-ink-muted">Preencha as medidas para calcular as médias.</div>
            )}
            {stats.crisis > 0 && (
              <div className="p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-200">
                {stats.crisis} medida(s) ≥ 180/110 mmHg: revisar sintomas e conduta.
              </div>
            )}
            <p className="text-[11px] text-ink-muted">
              Referência: média da MRPA ≥ 130/80 mmHg é considerada elevada; PA de consultório ≥ 140/90 mmHg. A interpretação é apoio à decisão e não substitui a avaliação clínica.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="flex flex-col gap-4">
          <div className="no-print flex items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Printer size={16} className="text-emerald-400" /> Folha A4 Retrato • Prévia de Impressão
            </div>
            <button onClick={handlePrint} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
              <Printer size={15} /> Imprimir Agora (1 Página)
            </button>
          </div>
          <div className="overflow-x-auto pb-6">
            <div className="mx-auto max-w-[210mm]">
              <A4MrpaPrintDocument {...docProps} isPrintPortal={false} />
            </div>
          </div>
        </div>
      )}

      {isMounted && typeof document !== 'undefined' &&
        createPortal(
          <div id="print-portal-mrpa">
            <A4MrpaPrintDocument {...docProps} isPrintPortal />
          </div>,
          document.body,
        )}
    </div>
  );
}

const TECHNIQUE = [
  'Use aparelho automático de braço, validado, com manguito do tamanho do seu braço.',
  'Não fume, não tome café ou bebida alcoólica e não faça exercício nos 30 minutos antes.',
  'Esvazie a bexiga e fique 5 minutos sentado em repouso antes de medir.',
  'Costas apoiadas, pernas descruzadas, pés no chão e braço apoiado na altura do coração.',
  'Não converse nem mexa no celular durante a medida.',
  'Faça as medidas com 1 minuto de intervalo, sempre no mesmo braço, e anote TODOS os valores.',
  'Manhã: antes do café e dos remédios. Noite: antes do jantar.',
];

const ALARM =
  'PROCURE O PRONTO-SOCORRO OU LIGUE 192 (SAMU) se a pressão estiver 180/110 ou mais E houver dor no peito, falta de ar, fraqueza ou formigamento de um lado do corpo, dificuldade para falar, alteração da visão, confusão ou dor de cabeça muito forte.';

const ALARM_NO_SYMPTOMS =
  'Se a pressão estiver 180/110 ou mais SEM esses sintomas: fique 30 minutos em repouso e meça de novo. Se continuar alta, entre em contato com seu médico. Não tome remédio extra por conta própria.';

function StatBox({ label, value, highlight }: { label: string; value: { n: number; sys: number | null; dia: number | null; hr: number | null }; highlight?: boolean | null }) {
  return (
    <div className={`rounded-xl border p-3 ${highlight ? 'border-amber-500/40 bg-amber-500/10' : 'border-line bg-bg/40'}`}>
      <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-black text-brand-navy font-mono">{value.sys !== null ? `${value.sys}/${value.dia}` : '—'}</div>
      <div className="text-[11px] text-ink-muted">
        mmHg · {value.n} medidas{value.hr ? ` · FC ${value.hr}` : ''}
      </div>
    </div>
  );
}

// ==========================================================================
// FOLHA A4 (retrato, 1 página) — também usada na prévia da tela
// ==========================================================================
function A4MrpaPrintDocument({
  patientName, doctorName, clinicName, currentMeds, arm, device, customInstructions, protocolLabel, perSession,
  includeHr, discardFirstDay, records, stats, isPrintPortal = false,
}: {
  patientName: string;
  doctorName: string;
  clinicName: string;
  currentMeds: string;
  arm: string;
  device: string;
  customInstructions: string;
  protocolLabel: string;
  perSession: number;
  includeHr: boolean;
  discardFirstDay: boolean;
  records: DayRecord[];
  stats: {
    all: { n: number; sys: number | null; dia: number | null };
    morning: { sys: number | null; dia: number | null };
    evening: { sys: number | null; dia: number | null };
  };
  isPrintPortal?: boolean;
}) {
  // Linhas altas para escrever à mão; com muitos dias a grade fica compacta para caber em 1 folha.
  const n = records.length;
  const rowPad = n <= 5 ? 'py-6' : n <= 7 ? 'py-4' : n <= 10 ? 'py-2.5' : n <= 14 ? 'py-1.5' : n <= 21 ? 'py-1' : 'py-[2px]';
  const dense = n > 14;
  const cell = (r: Reading) =>
    r.sys && r.dia ? (
      <span className="font-mono font-bold">
        {r.sys}/{r.dia}
        {includeHr && r.hr ? <span className="block text-[8px] font-normal text-slate-500">FC {r.hr}</span> : null}
      </span>
    ) : (
      <span className="text-slate-300 font-mono text-[10px] tracking-wider">
        ____/____{includeHr ? <span className="block text-[8px]">FC ____</span> : null}
      </span>
    );

  return (
    <div
      className={`bg-white text-slate-900 w-full ${isPrintPortal ? 'p-0 m-0' : 'p-6 md:p-8 rounded-xl shadow-2xl border border-slate-300'}`}
      style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
    >
      <div className="border-b-2 border-rose-600 pb-2 mb-2.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tight uppercase">Diário de Automonitorização da Pressão Arterial (MRPA)</h1>
            <p className="text-[10px] text-slate-500 font-semibold">{clinicName}</p>
          </div>
          <div className="text-right text-[10.5px] font-bold text-slate-700 shrink-0">{doctorName}</div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-200">
          <div className="col-span-2">
            <span className="font-bold text-slate-500 block text-[9px] uppercase tracking-wider">Paciente:</span>
            <span className="font-bold text-slate-900 text-xs">{patientName || '______________________________________________'}</span>
          </div>
          <div>
            <span className="font-bold text-slate-500 block text-[9px] uppercase tracking-wider">Protocolo:</span>
            <span className="font-semibold text-slate-800 text-[10.5px]">{protocolLabel}</span>
          </div>
          <div>
            <span className="font-bold text-slate-500 block text-[9px] uppercase tracking-wider">Braço / Aparelho:</span>
            <span className="font-semibold text-slate-800 text-[10.5px]">{arm} · {device}</span>
          </div>
        </div>
        {currentMeds && (
          <div className="mt-1.5 text-[9.5px] text-slate-800 bg-slate-100 p-1.5 rounded border border-slate-200">
            <strong>Medicação em uso:</strong> {currentMeds}
          </div>
        )}
      </div>

      <div className="overflow-hidden border border-slate-400 rounded-md mb-2.5">
        <table className={`w-full border-collapse ${dense ? 'text-[9px] leading-tight' : 'text-[10.5px]'}`}>
          <thead>
            <tr className="bg-slate-100 text-slate-800 border-b border-slate-400 text-[9.5px]">
              <th rowSpan={2} className="py-1 px-1 w-8 border-r border-slate-300">Dia</th>
              <th rowSpan={2} className="py-1 px-1 w-16 border-r border-slate-300">Data</th>
              <th colSpan={perSession} className="py-1 px-1 border-r border-slate-300 bg-amber-50">MANHÃ — antes do café e dos remédios</th>
              <th colSpan={perSession} className="py-1 px-1 border-r border-slate-300 bg-indigo-50">NOITE — antes do jantar</th>
              <th rowSpan={2} className="py-1 px-1">Observações</th>
            </tr>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-400 text-[8.5px]">
              {Array.from({ length: perSession * 2 }, (_, k) => (
                <th key={k} className="py-0.5 px-1 border-r border-slate-300 font-semibold">
                  {k % perSession + 1}ª medida
                  <span className="block font-normal text-slate-400">PAS/PAD{includeHr ? ' · FC' : ''}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.dayNumber} className="border-b border-slate-300">
                <td className={`${rowPad} px-1 text-center font-bold text-slate-700 border-r border-slate-300 bg-slate-50`}>
                  {r.dayNumber}
                  {discardFirstDay && r.dayNumber === 1 && (dense ? '*' : <span className="block text-[7.5px] font-normal text-slate-500">adaptação</span>)}
                </td>
                <td className={`${rowPad} px-1 text-center border-r border-slate-300 font-mono`}>
                  {r.dateStr ? <span className="font-bold">{r.dateStr}</span> : <span className="text-slate-400 text-[10px]">___/___</span>}
                </td>
                {[...r.morning, ...r.evening].map((rd, k) => (
                  <td key={k} className={`${rowPad} px-1 text-center border-r border-slate-300 ${k < perSession ? '' : 'bg-slate-50/50'}`}>
                    {cell(rd)}
                  </td>
                ))}
                <td className={`${rowPad} px-1 text-[9px] text-slate-700`}>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2 text-[9.5px]">
        {[
          ['Média geral', stats.all],
          ['Média manhã', stats.morning],
          ['Média noite', stats.evening],
        ].map(([label, v]) => {
          const val = v as { sys: number | null; dia: number | null };
          return (
            <div key={label as string} className="border border-slate-300 rounded p-1.5 text-center">
              <span className="font-bold text-slate-500 uppercase text-[8.5px] block">{label as string} {discardFirstDay ? '(sem o 1º dia*)' : ''}</span>
              <span className="font-mono font-black text-slate-900 text-sm">{val.sys !== null ? `${val.sys}/${val.dia}` : '_____/_____'}</span>
              <span className="text-slate-500"> mmHg</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-700 bg-slate-50 p-2 rounded border border-slate-300 mb-2">
        <div className="border-r border-slate-200 pr-2">
          <span className="font-bold text-slate-900 block mb-0.5 uppercase tracking-wide">Como medir corretamente</span>
          <ul className={`leading-tight list-disc pl-3 ${dense ? 'text-[8px]' : 'space-y-0.5'}`}>
            {TECHNIQUE.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div>
          <span className="font-bold text-red-700 block mb-0.5 uppercase tracking-wide">⚠️ Sinais de alarme</span>
          <p className="leading-tight mb-1">{ALARM}</p>
          <p className="leading-tight text-slate-600">{ALARM_NO_SYMPTOMS}</p>
          <span className="font-bold text-rose-900 block mt-1.5 mb-0.5 uppercase tracking-wide">Orientações do seu médico</span>
          <p className="leading-tight">{customInstructions || 'Trazer esta folha preenchida na próxima consulta.'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-slate-300 text-[9px] text-slate-600">
        <div>
          Assinatura / Carimbo Médico: <span className="font-mono text-slate-400">__________________________________________</span>
        </div>
        <div>
          Data da Consulta: <span className="font-mono text-slate-700 font-bold">{new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </div>
  );
}
