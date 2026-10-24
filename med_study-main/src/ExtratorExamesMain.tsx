import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FileSearch, UploadCloud, Copy, Check, Trash2, ShieldCheck, AlertTriangle,
  Loader2, FileText, X, ChevronDown, ChevronUp, Info, ScanLine,
} from 'lucide-react';
import { readPdfFile } from './extrator/pdf/browser';
import {
  extractDocument, buildLine, buildImagingLine, formatValue, shortDate, DEFAULT_OPTIONS,
  type DocumentKind, type ImagingReport, type LineEntry, type LineOptions, type ParsedReport,
} from './extrator';

interface Laudo {
  id: string;
  fileName: string;
  status: 'lendo' | 'pronto' | 'erro';
  error?: string;
  report?: ParsedReport;
  kind?: DocumentKind;
  entries: LineEntry[];
  /** Laudos de imagem do PDF (um PDF pode trazer mais de um exame). */
  imaging: ImagingReport[];
  open: boolean;
}

let nextId = 0;

const isPdf = (f: File) => f.type === 'application/pdf' || /\.pdf$/i.test(f.name);

export default function ExtratorExamesMain() {
  const [laudos, setLaudos] = useState<Laudo[]>([]);
  const [options, setOptions] = useState<LineOptions>(DEFAULT_OPTIONS);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // Texto editado à mão na caixa final; volta a ser gerado quando algo muda nos laudos.
  const [editedText, setEditedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: File[]) => {
    const pdfs = files.filter(isPdf);
    const others = files.length - pdfs.length;
    setNotice(
      others > 0
        ? 'Por enquanto só PDF com texto (o PDF que o laboratório envia). Prints e fotos chegam numa próxima versão.'
        : null,
    );
    if (pdfs.length === 0) return;
    setEditedText(null);

    const novos: Laudo[] = pdfs.map((f) => ({ id: `laudo-${nextId++}`, fileName: f.name, status: 'lendo', entries: [], imaging: [], open: false }));
    setLaudos((prev) => [...prev, ...novos]);

    await Promise.all(
      pdfs.map(async (file, i) => {
        const id = novos[i].id;
        try {
          const pages = await readPdfFile(file);
          const textChars = pages.reduce((n, p) => n + p.lines.join('').length, 0);
          if (textChars < 40) throw new Error('Este PDF não tem texto (parece escaneado ou foto). Por enquanto só PDFs com texto.');
          const { report, entries, imaging, kind } = extractDocument(pages);
          if (!entries.some((e) => e.selected) && imaging.length === 0) throw new Error('Nenhum resultado reconhecido neste PDF.');
          setLaudos((prev) =>
            prev.map((l) => (l.id === id ? { ...l, status: 'pronto', report, entries, imaging, kind } : l)),
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Não foi possível ler este PDF.';
          setLaudos((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'erro', error: msg } : l)));
        }
      }),
    );
  }, []);

  // Colar (Ctrl+V) um PDF copiado do explorador de arquivos.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.length) {
        e.preventDefault();
        void addFiles(files);
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [addFiles]);

  const generatedText = useMemo(
    () =>
      laudos
        .filter((l) => l.status === 'pronto' && l.report)
        .flatMap((l) => [
          buildLine(l.entries, l.report!.collectedAt, options),
          ...l.imaging.filter((r) => r.selected).map((r) => buildImagingLine(r, options)),
        ])
        .filter(Boolean)
        .join('\n'),
    [laudos, options],
  );
  const finalText = editedText ?? generatedText;

  const toggleEntry = (laudoId: string, entryId: string) => {
    setEditedText(null);
    setLaudos((prev) =>
      prev.map((l) =>
        l.id !== laudoId ? l : { ...l, entries: l.entries.map((e) => (e.id === entryId ? { ...e, selected: !e.selected } : e)) },
      ),
    );
  };

  const toggleImaging = (laudoId: string, imagingId: string) => {
    setEditedText(null);
    setLaudos((prev) =>
      prev.map((l) =>
        l.id !== laudoId ? l : { ...l, imaging: l.imaging.map((r) => (r.id === imagingId ? { ...r, selected: !r.selected } : r)) },
      ),
    );
  };

  const toggleOpen = (laudoId: string) =>
    setLaudos((prev) => prev.map((l) => (l.id === laudoId ? { ...l, open: !l.open } : l)));

  const removeLaudo = (laudoId: string) => {
    setEditedText(null);
    setLaudos((prev) => prev.filter((l) => l.id !== laudoId));
  };

  const clearAll = () => {
    setLaudos([]);
    setEditedText(null);
    setNotice(null);
  };

  const copy = async () => {
    if (!finalText) return;
    try {
      await navigator.clipboard.writeText(finalText);
    } catch {
      // Sem permissão de área de transferência: seleciona o texto para Ctrl+C.
      const area = document.getElementById('extrator-saida') as HTMLTextAreaElement | null;
      area?.select();
      document.execCommand('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setOption = (key: keyof LineOptions) => {
    setEditedText(null);
    setOptions((o) => ({ ...o, [key]: !o[key] }));
  };

  const prontos = laudos.filter((l) => l.status === 'pronto');
  const lendo = laudos.some((l) => l.status === 'lendo');

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full gap-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <FileSearch size={22} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">Ferramenta de consulta</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Extrator de Exames</h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            Solte o PDF do laboratório ou o laudo de imagem (TC, RX, USG, mamografia, densitometria, eco, polissonografia) e receba uma linha pronta para colar no prontuário: siglas, unidades e data nos exames de sangue; conclusão e escores nos laudos de imagem.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2 max-w-sm">
          <ShieldCheck size={18} className="shrink-0" />
          <span>O PDF é lido no seu navegador. Nada é enviado para a internet.</span>
        </div>
      </div>

      {/* Área de soltar */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void addFiles(Array.from(e.dataTransfer.files));
        }}
        className={`card cursor-pointer border-2 border-dashed p-8 md:p-10 flex flex-col items-center justify-center text-center gap-3 transition-all ${
          dragging ? 'border-teal-400 bg-teal-500/10' : 'border-line hover:border-teal-500/60'
        }`}
      >
        <UploadCloud size={40} className={dragging ? 'text-teal-300' : 'text-teal-400'} />
        <div className="text-base font-bold text-brand-navy">Arraste os PDFs dos exames ou laudos aqui</div>
        <div className="text-xs text-ink-muted">
          ou clique para escolher · também dá para colar (Ctrl+V) · vários PDFs de uma vez viram uma linha por laudo
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            void addFiles(Array.from(e.target.files ?? []));
            e.target.value = '';
          }}
        />
      </div>

      {notice && (
        <div className="flex items-start gap-2 text-xs text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
          <Info size={16} className="shrink-0 mt-0.5" />
          <span className="flex-1">{notice}</span>
          <button onClick={() => setNotice(null)} className="text-amber-200/70 hover:text-amber-100 cursor-pointer" aria-label="Fechar aviso">
            <X size={14} />
          </button>
        </div>
      )}

      {laudos.length > 0 && (
        <>
          {/* Linha final */}
          <div className="card p-5 space-y-3 border-teal-500/30">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">Para colar no prontuário</span>
              <div className="flex flex-wrap items-center gap-2">
                <Toggle label="Unidades" on={options.units} onClick={() => setOption('units')} />
                <Toggle label="Data" on={options.date} onClick={() => setOption('date')} />
                <button
                  onClick={clearAll}
                  className="px-3 py-2 rounded-xl border border-line hover:border-red-400/60 text-xs font-bold text-ink-muted hover:text-red-300 flex items-center gap-1.5 cursor-pointer bg-card"
                >
                  <Trash2 size={14} /> Limpar
                </button>
                <button
                  onClick={copy}
                  disabled={!finalText}
                  className="px-4 py-2 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center gap-2 shadow-md cursor-pointer"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
            <textarea
              id="extrator-saida"
              value={lendo && !finalText ? 'Lendo o PDF…' : finalText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={Math.min(14, Math.max(3, Math.ceil(finalText.length / 110) + prontos.length))}
              spellCheck={false}
              className="w-full rounded-xl bg-bg border border-line p-3 font-mono text-sm text-ink leading-relaxed focus:outline-none focus:border-teal-500/60 resize-y"
            />
            <p className="text-[11px] text-ink-muted flex items-center gap-1.5">
              <AlertTriangle size={12} className="text-amber-400 shrink-0" />
              Confira com o laudo original antes de registrar. Você pode editar o texto acima ou desmarcar itens abaixo.
            </p>
          </div>

          {/* Laudos */}
          <div className="space-y-3">
            {laudos.map((l) => (
              <div key={l.id}>
                <LaudoCard
                  laudo={l}
                  options={options}
                  onToggleEntry={(entryId) => toggleEntry(l.id, entryId)}
                  onToggleImaging={(imagingId) => toggleImaging(l.id, imagingId)}
                  onToggleOpen={() => toggleOpen(l.id)}
                  onRemove={() => removeLaudo(l.id)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
        on ? 'border-teal-500/50 bg-teal-500/15 text-teal-200' : 'border-line bg-card text-ink-muted'
      }`}
    >
      <span className={`w-3 h-3 rounded-sm border ${on ? 'bg-teal-400 border-teal-400' : 'border-ink-muted'}`} />
      {label}
    </button>
  );
}

function LaudoCard({
  laudo, options, onToggleEntry, onToggleImaging, onToggleOpen, onRemove,
}: {
  laudo: Laudo;
  options: LineOptions;
  onToggleEntry: (entryId: string) => void;
  onToggleImaging: (imagingId: string) => void;
  onToggleOpen: () => void;
  onRemove: () => void;
}) {
  const { report, entries, imaging } = laudo;
  const hasLab = entries.length > 0;
  const chosen = entries.filter((e) => e.selected).length;
  const review = entries.filter((e) => !e.known && !e.duplicate).length;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <FileText size={20} className="text-teal-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-brand-navy truncate">{laudo.fileName}</div>
          <div className="text-[11px] text-ink-muted flex flex-wrap gap-x-3 gap-y-0.5">
            {laudo.status === 'lendo' && (
              <span className="flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" /> Lendo…
              </span>
            )}
            {laudo.status === 'erro' && <span className="text-red-300">{laudo.error}</span>}
            {laudo.status === 'pronto' && report && hasLab && (
              <>
                <span>Laboratório: {report.lab === 'Desconhecido' ? 'não identificado' : report.lab}</span>
                <span>Coleta: {report.collectedAt ? shortDate(report.collectedAt) : 'não encontrada'}</span>
                <span>
                  {chosen} na linha{review > 0 ? ` · ${review} para revisar` : ''}
                </span>
              </>
            )}
            {laudo.status === 'pronto' && imaging.length > 0 && (
              <span>
                Laudo de imagem · {imaging.length} exame{imaging.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        {laudo.status === 'pronto' && hasLab && (
          <button
            onClick={onToggleOpen}
            className="px-3 py-1.5 rounded-lg border border-line text-[11px] font-bold text-ink-muted hover:text-brand-navy flex items-center gap-1 cursor-pointer"
          >
            {laudo.open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {laudo.open ? 'Fechar' : 'Conferir itens'}
          </button>
        )}
        <button onClick={onRemove} aria-label="Remover laudo" className="p-1.5 rounded-lg text-ink-muted hover:text-red-300 cursor-pointer">
          <X size={16} />
        </button>
      </div>

      {laudo.status === 'pronto' && imaging.length > 0 && (
        <div className="px-4 pb-4 space-y-2">
          {imaging.map((r) => (
            <div key={r.id}>
              <ImagingCard report={r} options={options} onToggle={() => onToggleImaging(r.id)} />
            </div>
          ))}
        </div>
      )}

      {laudo.status === 'pronto' && hasLab && report?.warning && (
        <div className="mx-4 mb-3 flex items-center gap-2 text-[11px] text-amber-200 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
          <AlertTriangle size={13} className="shrink-0" />
          {report.warning}
        </div>
      )}

      {laudo.open && (
        <div className="border-t border-line overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-ink-muted bg-bg/40">
                <th className="px-4 py-2 w-10"></th>
                <th className="px-2 py-2">Sigla</th>
                <th className="px-2 py-2">Valor</th>
                <th className="px-2 py-2">Linha do laudo</th>
                <th className="px-2 py-2 w-12">Pág.</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className={`border-t border-line/60 ${e.selected ? '' : 'opacity-50'}`}>
                  <td className="px-4 py-1.5">
                    <input
                      type="checkbox"
                      checked={e.selected}
                      onChange={() => onToggleEntry(e.id)}
                      className="accent-teal-500 cursor-pointer"
                      aria-label={`Incluir ${e.abbr}`}
                    />
                  </td>
                  <td className="px-2 py-1.5 font-bold text-brand-navy whitespace-nowrap">
                    {e.group ? <span className="text-ink-muted font-normal">{e.group}: </span> : null}
                    {e.abbr}
                    {!e.known && !e.duplicate && (
                      <span className="ml-1.5 text-[10px] font-semibold text-amber-300 bg-amber-500/10 rounded px-1">revisar</span>
                    )}
                    {e.duplicate && <span className="ml-1.5 text-[10px] font-semibold text-ink-muted bg-line/50 rounded px-1">repetido</span>}
                  </td>
                  <td className="px-2 py-1.5 font-mono text-ink whitespace-nowrap">{formatValue(e, options)}</td>
                  <td className="px-2 py-1.5 font-mono text-ink-muted max-w-md truncate" title={e.item.source}>
                    {e.item.source}
                  </td>
                  <td className="px-2 py-1.5 text-ink-muted">{e.item.page}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ImagingCard({ report, options, onToggle }: { report: ImagingReport; options: LineOptions; onToggle: () => void }) {
  const missing = !report.conclusion;
  return (
    <div className={`rounded-xl border p-3 space-y-2 ${report.selected ? 'border-teal-500/30 bg-teal-500/5' : 'border-line opacity-60'}`}>
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={report.selected}
          onChange={onToggle}
          className="accent-teal-500 cursor-pointer mt-0.5"
          aria-label={`Incluir ${report.exam}`}
        />
        <ScanLine size={15} className="text-teal-400 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-brand-navy">
            {report.exam}
            {report.date && <span className="font-normal text-ink-muted"> · {shortDate(report.date)}</span>}
            <span className="font-normal text-ink-muted"> · pág. {report.page}</span>
          </div>
          {report.scores.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {report.scores.map((sc) => (
                <span key={sc} className="text-[10px] font-semibold text-teal-200 bg-teal-500/15 border border-teal-500/30 rounded px-1.5 py-0.5">
                  {sc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {report.conclusion ? (
        <p className="text-xs text-ink leading-relaxed pl-6">{report.conclusion}</p>
      ) : (
        <p className="text-[11px] text-amber-200 pl-6">
          Conclusão não encontrada neste laudo. Marque para incluir só o nome do exame e a data, ou edite o texto final.
        </p>
      )}
      {report.conclusionFromFindings && !missing && (
        <p className="text-[11px] text-amber-200 pl-6 flex items-center gap-1.5">
          <AlertTriangle size={12} className="shrink-0" />
          O laudo não tem seção de conclusão: foi usada a descrição.
        </p>
      )}
      <p className="text-[10px] font-mono text-ink-muted pl-6 truncate" title={buildImagingLine(report, options)}>
        {buildImagingLine(report, options)}
      </p>
    </div>
  );
}
