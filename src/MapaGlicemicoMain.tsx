import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Printer, 
  Copy, 
  Check, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  Sun, 
  Moon, 
  Coffee, 
  Utensils, 
  Bed, 
  ShieldAlert, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Sliders, 
  User, 
  Sparkles, 
  HeartPulse, 
  Syringe, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Percent,
  SlidersHorizontal,
  Flame,
  Droplet
} from 'lucide-react';

export interface ColumnConfig {
  id: string;
  label: string;
  shortLabel: string;
  timeHint: string;
  category: 'jejum' | 'pos_cafe' | 'pre_almoco' | 'pos_almoco' | 'pre_jantar' | 'pos_jantar' | 'ao_deitar' | 'madrugada' | 'custom';
  icon: any;
  targetRange?: { min: number; max: number };
  enabled: boolean;
}

export interface DayRecord {
  dayNumber: number;
  dateStr: string;
  dayOfWeek: string;
  readings: Record<string, string>; // columnId -> glucose value or note
  insulinDose: string;
  notes: string;
}

const DEFAULT_COLUMNS: ColumnConfig[] = [
  {
    id: 'jejum',
    label: 'Jejum (Pré-Café)',
    shortLabel: 'Jejum',
    timeHint: '07:00 / acordar',
    category: 'jejum',
    icon: Coffee,
    targetRange: { min: 70, max: 130 },
    enabled: true
  },
  {
    id: 'pos_cafe',
    label: 'Pós-Café (2h)',
    shortLabel: 'Pós-Café',
    timeHint: '~09:00',
    category: 'pos_cafe',
    icon: Sun,
    targetRange: { min: 70, max: 180 },
    enabled: false
  },
  {
    id: 'pre_almoco',
    label: 'Pré-Almoço',
    shortLabel: 'Pré-Almoço',
    timeHint: '~12:00',
    category: 'pre_almoco',
    icon: Utensils,
    targetRange: { min: 70, max: 130 },
    enabled: true
  },
  {
    id: 'pos_almoco',
    label: 'Pós-Almoço (2h)',
    shortLabel: 'Pós-Almoço',
    timeHint: '~14:00',
    category: 'pos_almoco',
    icon: Utensils,
    targetRange: { min: 70, max: 180 },
    enabled: true
  },
  {
    id: 'pre_jantar',
    label: 'Pré-Jantar',
    shortLabel: 'Pré-Jantar',
    timeHint: '~19:00',
    category: 'pre_jantar',
    icon: Sun,
    targetRange: { min: 70, max: 130 },
    enabled: false
  },
  {
    id: 'pos_jantar',
    label: 'Pós-Jantar (2h)',
    shortLabel: 'Pós-Jantar',
    timeHint: '~21:00',
    category: 'pos_jantar',
    icon: Utensils,
    targetRange: { min: 70, max: 180 },
    enabled: true
  },
  {
    id: 'ao_deitar',
    label: 'Ao Deitar / Noite',
    shortLabel: 'Ao Deitar',
    timeHint: '~23:00',
    category: 'ao_deitar',
    icon: Bed,
    targetRange: { min: 90, max: 150 },
    enabled: true
  },
  {
    id: 'madrugada',
    label: 'Madrugada (03h)',
    shortLabel: 'Madrugada',
    timeHint: '03:00 (Alvorecer/Somogyi)',
    category: 'madrugada',
    icon: Moon,
    targetRange: { min: 70, max: 120 },
    enabled: false
  }
];

const PRESETS = [
  {
    id: '1x_jejum',
    name: '1x ao dia (Básico em Jejum)',
    desc: 'Triagem e controle básico para DM2 estável com antidiabéticos orais.',
    activeCols: ['jejum']
  },
  {
    id: '2x_dia',
    name: '2x ao dia (Jejum + Pós-Jantar)',
    desc: 'Avaliação da produção hepática basal e pico glicêmico noturno.',
    activeCols: ['jejum', 'pos_jantar']
  },
  {
    id: '3x_dia',
    name: '3x ao dia (Padrão Clínico DM2)',
    desc: 'Jejum, Pós-Almoço e Pós-Jantar. Equilíbrio ideal entre adesão e controle.',
    activeCols: ['jejum', 'pos_almoco', 'pos_jantar']
  },
  {
    id: '4x_dia',
    name: '4x ao dia (Basal-Bolus / Pré-Refeições)',
    desc: 'Jejum, Pré-Almoço, Pré-Jantar e Ao Deitar. Ideal para titulação de insulina.',
    activeCols: ['jejum', 'pre_almoco', 'pre_jantar', 'ao_deitar']
  },
  {
    id: '6x_dia',
    name: '6x ao dia (Perfil Completo DM1 / Intensivo)',
    desc: 'Pré e Pós-prandiais de todas as 3 refeições principais.',
    activeCols: ['jejum', 'pos_cafe', 'pre_almoco', 'pos_almoco', 'pre_jantar', 'pos_jantar']
  },
  {
    id: '7x_madrugada',
    name: '7x ao dia + Madrugada (Investigação Total)',
    desc: 'Inclui aferição às 03h00 para diferenciar Fenômeno do Alvorecer vs Efeito Somogyi.',
    activeCols: ['jejum', 'pos_cafe', 'pre_almoco', 'pos_almoco', 'pre_jantar', 'pos_jantar', 'madrugada']
  },
  {
    id: 'dmg_gestacional',
    name: 'Diabetes Gestacional (DMG)',
    desc: 'Metas rígidas: Jejum e 3 pós-prandiais imediatos (1h ou 2h).',
    activeCols: ['jejum', 'pos_cafe', 'pos_almoco', 'pos_jantar']
  }
];

export default function MapaGlicemicoMain() {
  // General configs
  const [patientName, setPatientName] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('Dr(a). Médico(a) / Endocrinologia');
  const [clinicName, setClinicName] = useState<string>('Ambulatório de Endocrinologia & Metabologia');
  const [diabetesType, setDiabetesType] = useState<string>('DM2');
  const [currentMeds, setCurrentMeds] = useState<string>('Metformina 850mg 2x/dia + Dapagliflozina 10mg 1x/dia');
  const [customInstructions, setCustomInstructions] = useState<string>(
    'Trazer esta folha preenchida na próxima consulta. Em caso de glicemia < 70 mg/dL, siga imediatamente a Regra dos 15g de carboidrato rápido.'
  );

  // Targets
  const [targetFastingMin, setTargetFastingMin] = useState<number>(70);
  const [targetFastingMax, setTargetFastingMax] = useState<number>(130);
  const [targetPostMax, setTargetPostMax] = useState<number>(180);
  const [targetHypo, setTargetHypo] = useState<number>(70);

  // Columns & layout
  const [columns, setColumns] = useState<ColumnConfig[]>(DEFAULT_COLUMNS);
  const [includeInsulinCol, setIncludeInsulinCol] = useState<boolean>(false);
  const [includeNotesCol, setIncludeNotesCol] = useState<boolean>(false);

  // Days configuration
  const [numDays, setNumDays] = useState<number>(14);
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Date mode: false = free blank for patient to write, true = pre-filled calendar dates
  const [autoFillDates, setAutoFillDates] = useState<boolean>(false);

  // Table records
  const [records, setRecords] = useState<DayRecord[]>([]);

  // UI state
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'stats' | 'orientacoes'>('editor');
  const [paperOrientation, setPaperOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [copied, setCopied] = useState<boolean>(false);
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate / adjust records when numDays, startDate or autoFillDates change
  useEffect(() => {
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const start = new Date(startDate + 'T00:00:00');

    setRecords(prev => {
      const nextRecords: DayRecord[] = [];
      for (let i = 0; i < numDays; i++) {
        let dateStr = '';
        let dayOfWeek = '';

        if (autoFillDates) {
          const currentDate = new Date(start);
          currentDate.setDate(start.getDate() + i);
          dateStr = currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
          dayOfWeek = dayNames[currentDate.getDay()];
        }

        const existing = prev[i];
        nextRecords.push({
          dayNumber: i + 1,
          dateStr: existing && existing.dateStr !== undefined ? existing.dateStr : dateStr,
          dayOfWeek: existing && existing.dayOfWeek !== undefined ? existing.dayOfWeek : dayOfWeek,
          readings: existing ? { ...existing.readings } : {},
          insulinDose: existing ? existing.insulinDose : '',
          notes: existing ? existing.notes : ''
        });
      }
      return nextRecords;
    });
  }, [numDays, startDate, autoFillDates]);

  // Handle date edit for a specific day
  const handleDateChange = (dayIndex: number, value: string) => {
    setRecords(prev => {
      const updated = [...prev];
      if (updated[dayIndex]) {
        updated[dayIndex] = {
          ...updated[dayIndex],
          dateStr: value
        };
      }
      return updated;
    });
  };

  // Handle cell edit
  const handleCellChange = (dayIndex: number, colId: string, value: string) => {
    setRecords(prev => {
      const updated = [...prev];
      if (updated[dayIndex]) {
        updated[dayIndex] = {
          ...updated[dayIndex],
          readings: {
            ...updated[dayIndex].readings,
            [colId]: value
          }
        };
      }
      return updated;
    });
  };

  const handleInsulinChange = (dayIndex: number, value: string) => {
    setRecords(prev => {
      const updated = [...prev];
      if (updated[dayIndex]) {
        updated[dayIndex] = { ...updated[dayIndex], insulinDose: value };
      }
      return updated;
    });
  };

  const handleNotesChange = (dayIndex: number, value: string) => {
    setRecords(prev => {
      const updated = [...prev];
      if (updated[dayIndex]) {
        updated[dayIndex] = { ...updated[dayIndex], notes: value };
      }
      return updated;
    });
  };

  // Toggle Column
  const toggleColumn = (colId: string) => {
    setColumns(prev =>
      prev.map(c => (c.id === colId ? { ...c, enabled: !c.enabled } : c))
    );
  };

  // Apply Preset
  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    if (presetId === 'dmg_gestacional') {
      setDiabetesType('DMG');
      setTargetFastingMax(95);
      setTargetPostMax(120);
      setCustomInstructions('Metas de DMG: Jejum < 95 mg/dL; 1h após refeição < 140 mg/dL; 2h após < 120 mg/dL. Se 2 ou mais valores anormais em 1 semana, entrar em contato.');
    } else {
      setTargetFastingMax(130);
      setTargetPostMax(180);
    }

    setColumns(prev =>
      prev.map(c => ({
        ...c,
        enabled: preset.activeCols.includes(c.id)
      }))
    );
  };

  // Fill Realistic Example Data
  const fillSampleData = () => {
    setPatientName('José Carlos da Silva');
    setDiabetesType('DM2');
    setCurrentMeds('Dapagliflozina 10mg pela manhã + Metformina 850mg almoço e jantar + Insulina NPH 16 UI às 22h');
    setCustomInstructions('Atenção especial à higiene íntima após o uso da Dapagliflozina. Não ficar em jejum prolongado.');
    setAutoFillDates(true);

    const activeColIds = columns.filter(c => c.enabled).map(c => c.id);
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const start = new Date(startDate + 'T00:00:00');

    setRecords(prev =>
      prev.map((day, idx) => {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + idx);
        const dateStr = currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const dayOfWeek = dayNames[currentDate.getDay()];

        const readings: Record<string, string> = {};

        activeColIds.forEach(colId => {
          let val = 110;
          if (colId === 'jejum') {
            val = Math.floor(95 + Math.sin(idx) * 25 + (idx === 4 ? -35 : 0));
          } else if (colId.includes('pos')) {
            val = Math.floor(145 + Math.cos(idx * 0.7) * 45 + (idx === 7 ? 65 : 0));
          } else if (colId === 'madrugada') {
            val = Math.floor(88 + Math.cos(idx) * 18);
          } else if (colId === 'ao_deitar') {
            val = Math.floor(135 + Math.sin(idx * 1.2) * 20);
          } else {
            val = Math.floor(115 + Math.random() * 25);
          }
          readings[colId] = Math.max(55, Math.min(280, val)).toString();
        });

        return {
          ...day,
          dateStr,
          dayOfWeek,
          readings,
          insulinDose: '16 UI NPH',
          notes: idx === 4 ? 'Episódio de tontura e suor frio às 06h (reverteu com 15g glicose)' : (idx === 7 ? 'Churrasco de família à tarde' : '')
        };
      })
    );
  };

  // Clear all readings and dates (leaves completely blank for patient to write)
  const clearReadings = () => {
    setAutoFillDates(false);
    setRecords(prev =>
      prev.map(day => ({
        ...day,
        dateStr: '',
        dayOfWeek: '',
        readings: {},
        insulinDose: '',
        notes: ''
      }))
    );
  };

  // Active columns list
  const activeColumns = useMemo(() => columns.filter(c => c.enabled), [columns]);

  // Calculate statistics from filled cells
  const stats = useMemo(() => {
    const allValues: number[] = [];
    let countHypo = 0;
    let countInTarget = 0;
    let countHigh = 0;
    let countSevereHigh = 0;

    records.forEach(day => {
      activeColumns.forEach(col => {
        const valStr = day.readings[col.id];
        if (valStr && !isNaN(Number(valStr)) && Number(valStr) > 0) {
          const val = Number(valStr);
          allValues.push(val);

          const isFasting = col.id === 'jejum' || col.id === 'madrugada';
          const maxTarget = isFasting ? targetFastingMax : targetPostMax;

          if (val < targetHypo) {
            countHypo++;
          } else if (val > 250) {
            countSevereHigh++;
            countHigh++;
          } else if (val > maxTarget) {
            countHigh++;
          } else {
            countInTarget++;
          }
        }
      });
    });

    const total = allValues.length;
    const avg = total > 0 ? Math.round(allValues.reduce((a, b) => a + b, 0) / total) : 0;
    // Estimated HbA1c (Nathan et al., 2008: eAG = 28.7 * A1c - 46.7  =>  A1c = (eAG + 46.7) / 28.7)
    const estimatedA1c = avg > 0 ? ((avg + 46.7) / 28.7).toFixed(1) : '-';
    const minVal = total > 0 ? Math.min(...allValues) : 0;
    const maxVal = total > 0 ? Math.max(...allValues) : 0;
    const tir = total > 0 ? Math.round((countInTarget / total) * 100) : 0;
    const hypoPercent = total > 0 ? Math.round((countHypo / total) * 100) : 0;

    return {
      total,
      avg,
      estimatedA1c,
      minVal,
      maxVal,
      countHypo,
      countHigh,
      countSevereHigh,
      tir,
      hypoPercent
    };
  }, [records, activeColumns, targetFastingMax, targetPostMax, targetHypo]);

  // Color helper for values
  const getCellColorClass = (valStr: string, colId: string) => {
    if (!valStr || isNaN(Number(valStr)) || Number(valStr) <= 0) return 'bg-transparent text-ink';
    const val = Number(valStr);
    const isFasting = colId === 'jejum' || colId === 'madrugada';
    const maxTarget = isFasting ? targetFastingMax : targetPostMax;

    if (val < targetHypo) {
      return 'bg-red-500/20 text-red-400 font-bold border-red-500/50';
    }
    if (val > 250) {
      return 'bg-purple-500/20 text-purple-300 font-bold border-purple-500/50';
    }
    if (val > maxTarget) {
      return 'bg-amber-500/20 text-amber-300 font-semibold border-amber-500/40';
    }
    return 'bg-emerald-500/15 text-emerald-400 font-bold border-emerald-500/40';
  };

  useEffect(() => {
    const handleBeforePrint = () => {
      document.body.classList.add('glicemia-print-active');
    };
    const handleAfterPrint = () => {
      document.body.classList.remove('glicemia-print-active');
    };
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('glicemia-print-active');
    };
  }, []);

  // Print function
  const handlePrint = () => {
    document.body.classList.add('glicemia-print-active');
    const origTitle = document.title;
    const cleanPatient = (patientName || 'Paciente').trim().replace(/[^a-zA-Z0-9]/g, '_');
    document.title = `Mapa_Glicemico_${cleanPatient}_${numDays}d`;
    requestAnimationFrame(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('glicemia-print-active');
        document.title = origTitle;
      }, 1000);
    });
  };

  // Copy structured text to clipboard
  const copyReportText = () => {
    const activeColLabels = activeColumns.map(c => c.label).join(' | ');
    let text = `DIÁRIO DE CONTROLE GLICÊMICO (MAPA DE GLICEMIA CAPILAR)\n`;
    text += `Paciente: ${patientName || '______________________'}\n`;
    text += `Diagnóstico: ${diabetesType} | Médico/Unidade: ${doctorName}\n`;
    text += `Período: ${records[0]?.dateStr || ''} a ${records[records.length - 1]?.dateStr || ''} (${numDays} dias)\n`;
    text += `Metas: Jejum: ${targetFastingMin}-${targetFastingMax} mg/dL | Pós-prandial: < ${targetPostMax} mg/dL | Hipo: < ${targetHypo} mg/dL\n`;
    text += `Medicamentos: ${currentMeds}\n\n`;

    const extraHeaders = [
      includeInsulinCol ? 'Insulina' : null,
      includeNotesCol ? 'Obs' : null
    ].filter(Boolean).join(' | ');

    text += `REGISTROS:\nData (Dia) | ${activeColLabels}${extraHeaders ? ' | ' + extraHeaders : ''}\n`;
    text += `---------------------------------------------------------------------\n`;

    records.forEach(d => {
      const readings = activeColumns.map(c => d.readings[c.id] || '-').join(' | ');
      let line = `${d.dateStr || '__/__'} (${d.dayOfWeek || '#'+d.dayNumber}) | ${readings}`;
      if (includeInsulinCol) line += ` | ${d.insulinDose || '-'}`;
      if (includeNotesCol) line += ` | ${d.notes || '-'}`;
      text += `${line}\n`;
    });

    if (stats.total > 0) {
      text += `\nRESUMO ESTATÍSTICO:\n`;
      text += `Total de medições: ${stats.total}\n`;
      text += `Média Glicêmica Geral: ${stats.avg} mg/dL (HbA1c estimada: ~${stats.estimatedA1c}%)\n`;
      text += `Tempo no Alvo (TIR): ${stats.tir}%\n`;
      text += `Episódios de Hipoglicemia (<${targetHypo}): ${stats.countHypo} (${stats.hypoPercent}%)\n`;
      text += `Glicemia Mínima: ${stats.minVal} mg/dL | Máxima: ${stats.maxVal} mg/dL\n`;
    }

    text += `\nORIENTAÇÕES MÉDICAS:\n${customInstructions}\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-20">
      
      {/* Scoped Print Style to ensure ONLY the portal document is printed */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 ${paperOrientation};
            margin: 5mm 6mm;
          }
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Hide the entire React SPA root so no screen wrappers/paddings produce blank pages */
          body.glicemia-print-active #root {
            display: none !important;
          }
          /* Display ONLY the dedicated single-page print portal */
          #print-portal-glicemia {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            max-width: ${paperOrientation === 'landscape' ? '285mm' : '198mm'} !important;
            margin: 0 auto !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-after: avoid !important;
            break-inside: avoid !important;
          }
          #print-portal-glicemia * {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}} />

      {/* Top Banner & Title (No Print) */}
      <div className="no-print flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-950/40 via-card to-cyan-950/30 border border-blue-500/20 rounded-3xl shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Syringe size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">
              Endocrinologia & Metabologia • Ferramenta Clínica
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight flex items-center gap-3">
            Mapa & Diário de Glicemia Capilar
          </h1>
          <p className="text-xs md:text-sm text-ink-muted max-w-3xl leading-relaxed">
            Configure a frequência diária (quantas vezes aferir), número de dias, horários pré/pós-prandiais, ao deitar e madrugada. Totalmente editável para preenchimento em tela ou impressão A4 limpa para o paciente preencher com caneta.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Printer size={16} />
            Imprimir / Salvar PDF (A4)
          </button>

          <button
            onClick={copyReportText}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-card border border-line hover:border-brand-blue text-brand-navy flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>

          <button
            onClick={fillSampleData}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 flex items-center gap-2 transition-all cursor-pointer"
            title="Preencher com exemplo de dados realistas para simulação"
          >
            <Sparkles size={16} />
            Exemplo Real
          </button>

          <button
            onClick={clearReadings}
            className="px-3 py-2.5 rounded-xl font-bold text-xs bg-card border border-line hover:border-red-500/40 text-ink-muted hover:text-red-400 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Limpar todos os valores preenchidos na tabela"
          >
            <Trash2 size={15} />
            Limpar
          </button>
        </div>
      </div>

      {/* Navigation Tabs (No Print) */}
      <div className="no-print flex items-center gap-2 border-b border-line pb-px overflow-x-auto no-scrollbar">
        {[
          { id: 'editor', label: '1. Tabela & Preenchimento Interativo', icon: SlidersHorizontal },
          { id: 'orientacoes', label: '2. Orientações ao Paciente & Regra 15x15', icon: ShieldAlert },
          { id: 'stats', label: `3. Análise & Estatísticas (${stats.total} medições)`, icon: Activity },
          { id: 'preview', label: '4. Visualizar Folha Impressa (A4)', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-brand-blue text-brand-blue bg-brand-blue/5 rounded-t-xl'
                : 'border-transparent text-ink-muted hover:text-brand-navy hover:border-slate-400'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* QUICK PRESETS & CONFIGURATION PANEL (Always visible in Editor or can be collapsed) */}
      {activeTab === 'editor' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="no-print card p-5 flex flex-col gap-5 border border-slate-700/60 bg-card/80 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-line/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-brand-blue/10 text-brand-blue">
                <Sliders size={18} />
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy">
                Configuração Rápida do Perfil Glicêmico
              </h2>
            </div>
            <span className="text-xs text-ink-muted">
              Selecione um modelo pronto ou personalize as colunas e dias livremente
            </span>
          </div>

          {/* Preset Buttons Grid */}
          <div>
            <label className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-2">
              Modelos Prontos de Monitorização (1 Clique):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className="p-3 rounded-xl border border-line bg-card hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-left flex flex-col gap-1 cursor-pointer group"
                >
                  <span className="font-bold text-xs text-brand-navy group-hover:text-brand-blue transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[11px] text-ink-muted line-clamp-2 leading-relaxed">
                    {preset.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Columns & Time slots Selection */}
          <div className="pt-2 border-t border-line/60">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                Horários das Aferições (Ligue ou Desligue Colunas):
              </label>
              <span className="text-xs font-semibold text-brand-blue">
                {activeColumns.length} aferições/dia selecionadas
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {columns.map(col => {
                const Icon = col.icon;
                return (
                  <button
                    key={col.id}
                    onClick={() => toggleColumn(col.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      col.enabled
                        ? 'bg-blue-600/20 border-blue-500/60 text-blue-300 shadow-sm'
                        : 'bg-card border-line text-ink-muted/70 hover:border-slate-500'
                    }`}
                  >
                    <Icon size={14} className={col.enabled ? 'text-blue-400' : 'text-slate-500'} />
                    <span>{col.label}</span>
                    <span className="text-[10px] opacity-75 font-mono">({col.timeHint})</span>
                    {col.enabled && <Check size={13} className="text-blue-400 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeframe and Additional Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2 border-t border-line/60 items-end">
            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1.5">
                Duração (Número de Dias)
              </label>
              <div className="flex items-center gap-1.5">
                {[7, 14, 21, 30].map(d => (
                  <button
                    key={d}
                    onClick={() => setNumDays(d)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      numDays === d
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-card border-line text-ink-muted hover:text-brand-navy'
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1.5">
                Coluna de Data
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setAutoFillDates(false);
                    setRecords(prev => prev.map(r => ({ ...r, dateStr: '', dayOfWeek: '' })));
                  }}
                  className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    !autoFillDates
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : 'bg-card border-line text-ink-muted hover:text-brand-navy'
                  }`}
                  title="Coluna livre sem data para o paciente anotar à mão ou digitar"
                >
                  ✓ Livre (Sem data)
                </button>
                <button
                  type="button"
                  onClick={() => setAutoFillDates(true)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    autoFillDates
                      ? 'bg-brand-blue text-white border-brand-blue shadow-xs'
                      : 'bg-card border-line text-ink-muted hover:text-brand-navy'
                  }`}
                  title="Preencher com datas automáticas do calendário"
                >
                  Calendário
                </button>
              </div>
              {autoFillDates && (
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full mt-1 px-2 py-1 text-[11px] bg-card border border-line rounded-lg text-brand-navy focus:outline-none focus:border-brand-blue"
                />
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1.5">
                Meta Jejum (mg/dL)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={targetFastingMin}
                  onChange={e => setTargetFastingMin(Number(e.target.value))}
                  className="w-1/2 px-2 py-1.5 text-xs bg-card border border-line rounded-lg text-center text-brand-navy focus:outline-none focus:border-brand-blue"
                  placeholder="Min (70)"
                />
                <span className="text-ink-muted text-xs">até</span>
                <input
                  type="number"
                  value={targetFastingMax}
                  onChange={e => setTargetFastingMax(Number(e.target.value))}
                  className="w-1/2 px-2 py-1.5 text-xs bg-card border border-line rounded-lg text-center text-brand-navy focus:outline-none focus:border-brand-blue"
                  placeholder="Max (130)"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1.5">
                Meta Pós-Prandial (2h)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-ink-muted text-xs">&lt;</span>
                <input
                  type="number"
                  value={targetPostMax}
                  onChange={e => setTargetPostMax(Number(e.target.value))}
                  className="w-full px-2 py-1.5 text-xs bg-card border border-line rounded-lg text-center text-brand-navy focus:outline-none focus:border-brand-blue"
                  placeholder="180"
                />
                <span className="text-ink-muted text-xs">mg/dL</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink-muted hover:text-brand-navy">
                <input
                  type="checkbox"
                  checked={includeInsulinCol}
                  onChange={e => setIncludeInsulinCol(e.target.checked)}
                  className="rounded border-line text-brand-blue focus:ring-0"
                />
                Coluna Insulina
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink-muted hover:text-brand-navy">
                <input
                  type="checkbox"
                  checked={includeNotesCol}
                  onChange={e => setIncludeNotesCol(e.target.checked)}
                  className="rounded border-line text-brand-blue focus:ring-0"
                />
                Observações
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* PATIENT & DOCTOR HEADER INFO (Editable in editor) */}
      {activeTab === 'editor' && (
        <div className="no-print card p-5 border border-slate-700/60 bg-card/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1">
              Nome do Paciente
            </label>
            <input
              type="text"
              placeholder="Ex: João da Silva Santos"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-bg border border-line rounded-xl text-brand-navy focus:outline-none focus:border-brand-blue font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1">
              Tipo de Diabetes
            </label>
            <select
              value={diabetesType}
              onChange={e => setDiabetesType(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-bg border border-line rounded-xl text-brand-navy focus:outline-none focus:border-brand-blue font-medium cursor-pointer"
            >
              <option value="DM2">Diabetes Mellitus Tipo 2 (DM2)</option>
              <option value="DM1">Diabetes Mellitus Tipo 1 (DM1)</option>
              <option value="DMG">Diabetes Gestacional (DMG)</option>
              <option value="LADA">Diabetes Autoimune Latente (LADA)</option>
              <option value="MODY">MODY / Outros Tipos</option>
              <option value="Pre-Diabetes">Pré-Diabetes / Intolerância à Glicose</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1">
              Médico / Orientador / Contato
            </label>
            <input
              type="text"
              placeholder="Ex: Dra. Mariana Costa - CRM 12345"
              value={doctorName}
              onChange={e => setDoctorName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-bg border border-line rounded-xl text-brand-navy focus:outline-none focus:border-brand-blue font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block mb-1">
              Medicamentos / Insulinas Atuais
            </label>
            <input
              type="text"
              placeholder="Ex: Metformina 850mg 2x/d + Dapagliflozina 10mg..."
              value={currentMeds}
              onChange={e => setCurrentMeds(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-bg border border-line rounded-xl text-brand-navy focus:outline-none focus:border-brand-blue font-medium"
            />
          </div>
        </div>
      )}

      {/* STATS SUMMARY BAR (If any data exists) */}
      {stats.total > 0 && activeTab === 'editor' && (
        <div className="no-print grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="card p-3 border-emerald-500/30 bg-emerald-500/5 flex flex-col">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Média Glicêmica</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-emerald-300">{stats.avg}</span>
              <span className="text-xs text-emerald-400 font-mono">mg/dL</span>
            </div>
            <span className="text-[10px] text-ink-muted mt-0.5">eA1c estimada: ~{stats.estimatedA1c}%</span>
          </div>

          <div className="card p-3 border-blue-500/30 bg-blue-500/5 flex flex-col">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">No Alvo (TIR)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-blue-300">{stats.tir}%</span>
            </div>
            <span className="text-[10px] text-ink-muted mt-0.5">{stats.total} aferições válidas</span>
          </div>

          <div className={`card p-3 flex flex-col ${stats.countHypo > 0 ? 'border-red-500/40 bg-red-500/10' : 'border-line'}`}>
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Hipoglicemias (&lt;70)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-red-400">{stats.countHypo}</span>
              <span className="text-xs text-red-400/80">({stats.hypoPercent}%)</span>
            </div>
            <span className="text-[10px] text-ink-muted mt-0.5">{stats.countHypo === 0 ? 'Nenhum episódio' : 'Requer atenção!'}</span>
          </div>

          <div className="card p-3 border-amber-500/30 bg-amber-500/5 flex flex-col">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Hiperglicemias</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-amber-300">{stats.countHigh}</span>
              <span className="text-xs text-amber-400/80">&gt; meta</span>
            </div>
            <span className="text-[10px] text-ink-muted mt-0.5">{stats.countSevereHigh} graves (&gt;250)</span>
          </div>

          <div className="card p-3 border-line flex flex-col">
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Menor Valor</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-ink">{stats.minVal}</span>
              <span className="text-xs text-ink-muted font-mono">mg/dL</span>
            </div>
            <span className="text-[10px] text-ink-muted mt-0.5">mínimo no período</span>
          </div>

          <div className="card p-3 border-line flex flex-col">
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Maior Valor</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-ink">{stats.maxVal}</span>
              <span className="text-xs text-ink-muted font-mono">mg/dL</span>
            </div>
            <span className="text-[10px] text-ink-muted mt-0.5">pico registrado</span>
          </div>
        </div>
      )}

      {/* TAB 1: THE INTERACTIVE EDITABLE TABLE (SCREEN ONLY PREVIEW) */}
      {activeTab === 'editor' && (
        <div className="no-print card p-4 md:p-6 overflow-hidden border border-slate-700/60 shadow-2xl flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-line/60">
            <div>
              <h3 className="font-bold text-lg text-brand-navy flex items-center gap-2">
                <span>Grade de Medições Diárias</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-blue/20 text-blue-300 font-mono">
                  {numDays} Dias • {activeColumns.length} Horários
                </span>
              </h3>
              <p className="text-xs text-ink-muted">
                Digite os valores diretamente nas células (colorização inteligente em tempo real) ou deixe em branco para imprimir.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setNumDays(prev => Math.min(31, prev + 1))}
                className="px-2.5 py-1.5 rounded-lg border border-line text-xs font-bold text-brand-navy hover:bg-bg flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> +1 Dia
              </button>
              <button
                onClick={() => setNumDays(prev => Math.max(3, prev - 1))}
                className="px-2.5 py-1.5 rounded-lg border border-line text-xs font-bold text-ink-muted hover:text-red-400 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 size={14} /> -1 Dia
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-line/80 rounded-2xl bg-card shadow-inner">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900/90 text-slate-300 text-xs font-bold border-b border-line">
                  <th className="py-3 px-3 w-16 text-center border-r border-line">Dia</th>
                  <th className="py-3 px-3 w-32 border-r border-line">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-xs">Data</span>
                      <span className="text-[10px] text-emerald-400 font-medium">Livre p/ anotar</span>
                    </div>
                  </th>
                  {activeColumns.map(col => {
                    const Icon = col.icon;
                    return (
                      <th key={col.id} className="py-3 px-3 border-r border-line min-w-[110px]">
                        <div className="flex items-center gap-1.5">
                          <Icon size={14} className="text-brand-blue shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-xs">{col.shortLabel}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-normal">
                              {col.timeHint}
                            </span>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                  {includeInsulinCol && (
                    <th className="py-3 px-3 border-r border-line min-w-[130px] group/th">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <Syringe size={14} className="text-amber-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-xs">Insulina / Dose</span>
                            <span className="text-[10px] text-slate-400 font-normal">Unidades</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIncludeInsulinCol(false)}
                          title="Remover coluna de Insulina"
                          className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all cursor-pointer text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  )}
                  {includeNotesCol && (
                    <th className="py-3 px-3 min-w-[160px] group/th">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <FileText size={14} className="text-cyan-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-xs">Observações / Sintomas</span>
                            <span className="text-[10px] text-slate-400 font-normal">Alimentação / Hipo</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIncludeNotesCol(false)}
                          title="Remover coluna de Observações"
                          className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all cursor-pointer text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 text-xs">
                {records.map((record, dayIdx) => (
                  <tr 
                    key={record.dayNumber}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Day Number */}
                    <td className="py-2.5 px-3 text-center font-bold text-brand-navy border-r border-line/60 bg-slate-900/30">
                      #{record.dayNumber}
                    </td>

                    {/* Date - Free for patient to annotate */}
                    <td className="py-2 px-2 border-r border-line/60">
                      <input
                        type="text"
                        placeholder="___/___"
                        value={record.dateStr}
                        onChange={e => handleDateChange(dayIdx, e.target.value)}
                        className="w-full px-2 py-1.5 text-center text-xs bg-bg/50 border border-line/60 rounded-lg text-brand-navy focus:outline-none focus:border-brand-blue font-mono placeholder:text-slate-500"
                        title="Data livre para o paciente anotar"
                      />
                    </td>

                    {/* Glucose Columns */}
                    {activeColumns.map(col => {
                      const val = record.readings[col.id] || '';
                      const colorClass = getCellColorClass(val, col.id);

                      return (
                        <td key={col.id} className="py-2 px-2 border-r border-line/60">
                          <div className="relative">
                            <input
                              type="number"
                              min="20"
                              max="600"
                              placeholder="---"
                              value={val}
                              onChange={e => handleCellChange(dayIdx, col.id, e.target.value)}
                              className={`w-full px-2 py-1.5 text-center text-xs rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-brand-blue font-mono ${colorClass}`}
                            />
                            {val && Number(val) < targetHypo && (
                              <span 
                                title="Hipoglicemia (<70 mg/dL)! Ingerir 15g de carboidrato rápido."
                                className="absolute right-1 top-1 text-[10px] text-red-400 animate-pulse pointer-events-none"
                              >
                                ⚠️
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}

                    {/* Insulin Column */}
                    {includeInsulinCol && (
                      <td className="py-2 px-2 border-r border-line/60">
                        <input
                          type="text"
                          placeholder="Ex: 14 UI NPH"
                          value={record.insulinDose}
                          onChange={e => handleInsulinChange(dayIdx, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-bg/50 border border-line/60 rounded-lg text-ink focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </td>
                    )}

                    {/* Notes Column */}
                    {includeNotesCol && (
                      <td className="py-2 px-2">
                        <input
                          type="text"
                          placeholder="Ex: Sintomas, refeição diferente..."
                          value={record.notes}
                          onChange={e => handleNotesChange(dayIdx, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-bg/50 border border-line/60 rounded-lg text-ink focus:outline-none focus:border-brand-blue"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs pt-2 text-ink-muted">
            <span className="font-bold text-brand-navy">Legenda de Cores:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span>&lt; {targetHypo} mg/dL (Hipoglicemia)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>No Alvo ({targetFastingMin}-{targetFastingMax} jejum / &lt;{targetPostMax} pós)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>&gt; {targetPostMax} mg/dL (Acima da meta)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span>&gt; 250 mg/dL (Hiperglicemia grave)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORIENTAÇÕES MÉDICAS & CONDUTA DE HIPOGLICEMIA */}
      {activeTab === 'orientacoes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-print flex flex-col gap-6">
          
          {/* Card: Regra dos 15x15 para Hipoglicemia */}
          <div className="card p-6 border-2 border-red-500/50 bg-gradient-to-br from-red-950/30 via-card to-amber-950/20 shadow-xl">
            <div className="flex items-center gap-3 border-b border-red-500/30 pb-4 mb-4">
              <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-red-300">
                  Conduta Imediata para Hipoglicemia: Regra dos 15x15 (&lt; 70 mg/dL)
                </h3>
                <p className="text-xs text-red-200/80">
                  Sintomas comuns: tremores, suor frio, fraqueza, tontura, palpitações, visão turva ou confusão.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-red-300 font-bold">
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-black">1</span>
                  <span>Ingerir 15g de Carboidrato Rápido</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  • 1 copo (150 mL) de refrigerante comum (não diet) OU suco de frutas;<br />
                  • OU 1 colher de sopa de açúcar diluído em água;<br />
                  • OU 3 a 4 balas mastigáveis de caramelo/glicose.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-500/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black">2</span>
                  <span>Aguardar 15 Minutos em Repouso</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Não coma chocolate, biscoitos ou doces gordurosos (a gordura retarda a absorção do açúcar). Fique sentado e calmo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">3</span>
                  <span>Remedir a Glicemia Capilar</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  • Se continuar &lt; 70 mg/dL: repetir os 15g de açúcar e esperar +15 min.<br />
                  • Se normalizou (&gt; 70 mg/dL) e a próxima refeição demorar mais de 1h, faça um pequeno lanche com carboidrato complexo (ex: torrada com queijo).
                </p>
              </div>
            </div>
          </div>

          {/* Card: Cuidados com Dapagliflozina & Higiene Íntima */}
          <div className="card p-6 border border-indigo-500/30 bg-indigo-950/20 shadow-lg">
            <div className="flex items-center gap-3 border-b border-indigo-500/30 pb-3 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-indigo-200">
                  Cuidados Importantes com iSGLT2 (Dapagliflozina, Empagliflozina)
                </h3>
                <p className="text-xs text-indigo-300/80">
                  Estes medicamentos protegem os rins e o coração eliminando o excesso de glicose pela urina.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-card border border-indigo-500/20 space-y-2">
                <p className="font-bold text-indigo-300">✓ Higiene Íntima Rigorosa</p>
                <p>
                  Sempre lave ou seque muito bem a região genital após urinar, sem deixar umidade residual. Isso previne micoses genitais (candidíase e balanopostite). Dê preferência a roupas íntimas de algodão, evitando tecidos sintéticos apertados.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-indigo-500/20 space-y-2">
                <p className="font-bold text-indigo-300">✓ Hidratação e Alerta Clínico</p>
                <p>
                  Beba água regularmente para manter boa hidratação. Ao notar ardor persistente para urinar, coceira ou secreção genital, avise o médico. O tratamento de infecções fúngicas é rápido e dispensa a interrupção do remédio na maioria dos casos.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Dicas de Como Medir Corretamente a Glicemia */}
          <div className="card p-6 border border-line flex flex-col gap-4">
            <h3 className="font-bold text-base text-brand-navy flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Como Realizar a Ponta de Dedo Corretamente
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-bg border border-line">
                <span className="font-bold text-brand-navy block mb-1">1. Lave as Mãos</span>
                <p className="text-ink-muted">Lave com água e sabão e seque bem. Evite álcool líquido úmido, pois ele dilui a gota de sangue e falseia o valor.</p>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-line">
                <span className="font-bold text-brand-navy block mb-1">2. Puncione a Lateral</span>
                <p className="text-ink-muted">Fure na lateral da polpa digital, onde há menos terminações nervosas. Dói bem menos do que no centro da ponta do dedo.</p>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-line">
                <span className="font-bold text-brand-navy block mb-1">3. Não Esprema com Força</span>
                <p className="text-ink-muted">Aperte suavemente a base do dedo. Não esprema com força excessiva para não misturar líquido intersticial com o sangue.</p>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-line">
                <span className="font-bold text-brand-navy block mb-1">4. Anote Imediatamente</span>
                <p className="text-ink-muted">Registre o valor na hora nesta tabela, anotando se sentiu algum sintoma ou se comeu fora da rotina.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: STATS & TIME IN RANGE */}
      {activeTab === 'stats' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-print flex flex-col gap-6">
          <div className="card p-6 border border-line flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="font-bold text-lg text-brand-navy">Análise Glicêmica & Tempo no Alvo (TIR)</h3>
                <p className="text-xs text-ink-muted">Estatísticas calculadas a partir dos {stats.total} registros anotados.</p>
              </div>
              <button
                onClick={fillSampleData}
                className="px-3 py-1.5 rounded-lg border border-brand-blue text-brand-blue text-xs font-bold hover:bg-brand-blue/10 cursor-pointer"
              >
                Carregar Amostra Demonstrativa
              </button>
            </div>

            {stats.total === 0 ? (
              <div className="p-10 text-center flex flex-col items-center gap-3 text-ink-muted">
                <Activity size={40} className="text-slate-600" />
                <p className="text-sm">Ainda não há valores digitados na tabela de medições.</p>
                <p className="text-xs">Preencha alguns valores na aba "Tabela & Preenchimento Interativo" ou clique em "Carregar Amostra Demonstrativa".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-emerald-500/30 flex flex-col items-center text-center justify-center">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Tempo no Alvo (TIR)</span>
                  <div className="text-5xl font-black text-emerald-400 mb-2">{stats.tir}%</div>
                  <p className="text-xs text-ink-muted">
                    Meta internacional: <strong>&gt; 70%</strong> das medições dentro da faixa alvo ({targetFastingMin} a {targetPostMax} mg/dL).
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-blue-500/30 flex flex-col items-center text-center justify-center">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Média & Estimativa de HbA1c</span>
                  <div className="text-5xl font-black text-blue-400 mb-2">{stats.avg} <span className="text-xl font-normal text-ink-muted">mg/dL</span></div>
                  <p className="text-xs text-ink-muted">
                    HbA1c estimada (Nathan et al.): <strong className="text-blue-300 text-sm">~{stats.estimatedA1c}%</strong>.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-red-500/30 flex flex-col items-center text-center justify-center">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Segurança: Hipoglicemias</span>
                  <div className="text-5xl font-black text-red-400 mb-2">{stats.countHypo}</div>
                  <p className="text-xs text-ink-muted">
                    Meta clínica: <strong>&lt; 4%</strong> das leituras abaixo de 70 mg/dL para prevenção de eventos adversos.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* EDITOR BOTTOM HELPER: Quick access to A4 sheet */}
      {activeTab === 'editor' && (
        <div className="no-print p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Printer size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Pronto para imprimir a folha do paciente?</h4>
              <p className="text-[11px] text-slate-400">
                Imprima agora diretamente em A4 limpo (1 folha) para entrega ou visualize a prévia exata.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('preview')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <FileText size={15} /> Visualizar Folha A4
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer transition-all"
            >
              <Printer size={15} /> Imprimir Agora (1 Página)
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: A4 PRINTABLE SHEET PREVIEW (SCREEN ONLY) */}
      {activeTab === 'preview' && (
        <div className="flex flex-col gap-4">
          
          {/* Header controls for A4 (No Print) */}
          <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Printer size={16} className="text-emerald-400" />
              <span>Folha A4 Oficial • Prévia de Impressão (Sem poluição visual)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Orientação:</span>
                <button
                  onClick={() => setPaperOrientation('landscape')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-all ${paperOrientation === 'landscape' ? 'bg-brand-blue text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  Paisagem (Recomendado)
                </button>
                <button
                  onClick={() => setPaperOrientation('portrait')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-all ${paperOrientation === 'portrait' ? 'bg-brand-blue text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  Retrato
                </button>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 cursor-pointer transition-all"
              >
                <Printer size={15} /> Imprimir Agora (1 Página)
              </button>
            </div>
          </div>

          {/* Realistic Paper Preview Container on Screen */}
          <div className="overflow-x-auto pb-6">
            <div 
              className={`mx-auto transition-all ${
                paperOrientation === 'landscape' ? 'max-w-[285mm]' : 'max-w-[210mm]'
              }`}
            >
              <A4GlicemiaPrintDocument
                patientName={patientName}
                diabetesType={diabetesType}
                doctorName={doctorName}
                currentMeds={currentMeds}
                customInstructions={customInstructions}
                numDays={numDays}
                records={records}
                activeColumns={activeColumns}
                includeInsulinCol={includeInsulinCol}
                includeNotesCol={includeNotesCol}
                targetFastingMin={targetFastingMin}
                targetFastingMax={targetFastingMax}
                targetPostMax={targetPostMax}
                targetHypo={targetHypo}
                paperOrientation={paperOrientation}
                isPrintPortal={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* PORTAL FOR PRINT ENGINE: Rendered directly in document.body */}
      {isMounted && typeof document !== 'undefined' && createPortal(
        <div id="print-portal-glicemia" className={`glicemia-portal ${paperOrientation}`}>
          <A4GlicemiaPrintDocument
            patientName={patientName}
            diabetesType={diabetesType}
            doctorName={doctorName}
            currentMeds={currentMeds}
            customInstructions={customInstructions}
            numDays={numDays}
            records={records}
            activeColumns={activeColumns}
            includeInsulinCol={includeInsulinCol}
            includeNotesCol={includeNotesCol}
            targetFastingMin={targetFastingMin}
            targetFastingMax={targetFastingMax}
            targetPostMax={targetPostMax}
            targetHypo={targetHypo}
            paperOrientation={paperOrientation}
            isPrintPortal={true}
          />
        </div>,
        document.body
      )}

    </div>
  );
}

// ==========================================================================
// A4 PRINTABLE DOCUMENT COMPONENT
// Single-page medical layout with crisp typography and zero overflow
// ==========================================================================
function A4GlicemiaPrintDocument({
  patientName,
  diabetesType,
  doctorName,
  currentMeds,
  customInstructions,
  numDays,
  records,
  activeColumns,
  includeInsulinCol,
  includeNotesCol,
  targetFastingMin,
  targetFastingMax,
  targetPostMax,
  targetHypo,
  paperOrientation,
  isPrintPortal = false
}: {
  patientName: string;
  diabetesType: string;
  doctorName: string;
  currentMeds: string;
  customInstructions: string;
  numDays: number;
  records: DayRecord[];
  activeColumns: ColumnConfig[];
  includeInsulinCol: boolean;
  includeNotesCol: boolean;
  targetFastingMin: number;
  targetFastingMax: number;
  targetPostMax: number;
  targetHypo: number;
  paperOrientation: 'landscape' | 'portrait';
  isPrintPortal?: boolean;
}) {
  const isCompact = numDays > 14;
  const cellPadding = isCompact ? 'py-0.5 px-1 text-[9.5px]' : 'py-1 px-1.5 text-[10.5px]';

  return (
    <div 
      className={`bg-white text-slate-900 w-full ${isPrintPortal ? 'p-0 m-0 border-0 shadow-none' : 'p-6 md:p-8 rounded-xl shadow-2xl border border-slate-300'}`}
      style={{
        color: '#0f172a',
        backgroundColor: '#ffffff',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
        pageBreakAfter: 'avoid',
        breakAfter: 'avoid'
      }}
    >
      {/* Header: Title and Medical Context */}
      <div className="border-b-2 border-blue-600 pb-2 mb-2.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base md:text-lg font-black text-slate-900 tracking-tight uppercase">
              DIÁRIO DE CONTROLE GLICÊMICO (MAPA DE GLICEMIA CAPILAR)
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold">
              Ambulatório de Endocrinologia & Metabologia • Acompanhamento Médico e Titulação Terapêutica
            </p>
          </div>
          <div className="text-right text-[10.5px] font-bold text-slate-700 shrink-0">
            {doctorName || 'Dr(a). Médico(a)'}
          </div>
        </div>

        {/* Patient Details Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-200 text-xs">
          <div>
            <span className="font-bold text-slate-500 block text-[9px] uppercase tracking-wider">Paciente:</span>
            <span className="font-bold text-slate-900 text-xs truncate block">
              {patientName || '__________________________________________'}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-500 block text-[9px] uppercase tracking-wider">Diagnóstico:</span>
            <span className="font-bold text-slate-900 text-xs">
              {diabetesType === 'DM2' ? 'Diabetes Mellitus Tipo 2 (DM2)' : 
               diabetesType === 'DM1' ? 'Diabetes Mellitus Tipo 1 (DM1)' : 
               diabetesType === 'DMG' ? 'Diabetes Gestacional (DMG)' : diabetesType}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-500 block text-[9px] uppercase tracking-wider">Período de Monitorização:</span>
            <span className="font-semibold text-slate-800 text-xs">
              {numDays} dias {records[0]?.dateStr ? `(${records[0]?.dateStr} a ${records[records.length - 1]?.dateStr || ''})` : ''}
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-500 block text-[9px] uppercase tracking-wider">Metas Glicêmicas:</span>
            <span className="font-bold text-blue-700 text-[11px]">
              Jejum: {targetFastingMin}-{targetFastingMax} | Pós: &lt;{targetPostMax} mg/dL
            </span>
          </div>
        </div>

        {currentMeds && (
          <div className="mt-1.5 text-[9.5px] text-slate-800 bg-slate-100 p-1.5 rounded border border-slate-200">
            <strong className="text-slate-900">Medicação / Insulinas Prescritas:</strong> {currentMeds}
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="overflow-hidden border border-slate-400 rounded-md mb-2.5">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-400 text-[9.5px]">
              <th className="py-1 px-1.5 w-8 text-center border-r border-slate-300">Dia</th>
              <th className="py-1 px-1.5 w-18 border-r border-slate-300 text-center">
                <div className="font-bold text-slate-900">Data</div>
                <div className="text-[8px] font-normal text-slate-500 font-mono">(Anotar)</div>
              </th>
              {activeColumns.map(col => (
                <th key={col.id} className="py-1 px-1.5 border-r border-slate-300 text-center">
                  <div className="font-bold text-slate-900 leading-tight">{col.shortLabel}</div>
                  <div className="text-[8px] font-normal text-slate-500 font-mono leading-tight">{col.timeHint}</div>
                </th>
              ))}
              {includeInsulinCol && (
                <th className="py-1 px-1.5 border-r border-slate-300 text-center min-w-[70px]">
                  <div className="font-bold text-slate-900">Insulina</div>
                  <div className="text-[8px] font-normal text-slate-500">Dose/Tipo</div>
                </th>
              )}
              {includeNotesCol && (
                <th className="py-1 px-1.5 text-center min-w-[95px]">
                  <div className="font-bold text-slate-900">Observações / Hipos</div>
                  <div className="text-[8px] font-normal text-slate-500">Sintomas / refeição</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {records.map(record => (
              <tr key={record.dayNumber} className="border-b border-slate-300">
                <td className={`${cellPadding} text-center font-bold text-slate-700 border-r border-slate-300 bg-slate-50`}>
                  {record.dayNumber}
                </td>
                <td className={`${cellPadding} border-r border-slate-300 text-center font-medium font-mono text-slate-900`}>
                  {record.dateStr ? (
                    <span className="font-bold">{record.dateStr}</span>
                  ) : (
                    <span className="text-slate-400 tracking-wider font-normal text-[10px]">___/___</span>
                  )}
                </td>

                {activeColumns.map(col => {
                  const val = record.readings[col.id] || '';
                  const isHypo = val && Number(val) < targetHypo;
                  const isHigh = val && Number(val) > (col.id === 'jejum' ? targetFastingMax : targetPostMax);

                  return (
                    <td 
                      key={col.id} 
                      className={`${cellPadding} text-center border-r border-slate-300 font-mono font-bold ${
                        isHypo ? 'bg-red-100 text-red-700' : isHigh ? 'bg-amber-50 text-amber-900' : 'text-slate-900'
                      }`}
                    >
                      {val ? (
                        <span>
                          {val} {isHypo && <span className="text-[8px]">⚠️</span>}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-[8px]">•</span>
                      )}
                    </td>
                  );
                })}

                {includeInsulinCol && (
                  <td className={`${cellPadding} border-r border-slate-300 text-slate-800 text-[9px]`}>
                    {record.insulinDose || ''}
                  </td>
                )}

                {includeNotesCol && (
                  <td className={`${cellPadding} text-slate-800 text-[9px]`}>
                    {record.notes || ''}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Guidance: Regra 15x15 & Doctor's Orientations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[9px] text-slate-700 bg-slate-50 p-2 rounded border border-slate-300 mb-2">
        <div className="border-r border-slate-200 pr-2">
          <span className="font-bold text-red-700 block mb-0.5 uppercase tracking-wide">
            ⚠️ SE GLICEMIA &lt; 70 mg/dL (REGRA DOS 15g x 15 MINUTOS):
          </span>
          <p className="leading-tight">
            1. Ingira 15g de carboidrato rápido (150 mL de refrigerante comum OU 1 colher de sopa de açúcar na água).<br />
            2. Aguarde 15 minutos em repouso e meça novamente a ponta de dedo.<br />
            3. Se continuar &lt; 70, repita. Se normalizar, faça seu lanche habitual.
          </p>
        </div>

        <div>
          <span className="font-bold text-blue-900 block mb-0.5 uppercase tracking-wide">
            ORIENTAÇÕES DO SEU MÉDICO:
          </span>
          <p className="leading-tight">
            {customInstructions || 'Trazer esta folha preenchida na próxima consulta ambulatorial.'}
          </p>
          <div className="mt-0.5 text-[8px] text-slate-500 italic">
            *Em uso de Dapagliflozina ou Empagliflozina: secar/higienizar muito bem a região genital após urinar.
          </div>
        </div>
      </div>

      {/* Signature & Date line */}
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
