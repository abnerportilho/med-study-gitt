import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Baby, 
  Printer, 
  Copy, 
  Check, 
  Eye, 
  Sparkles, 
  Heart, 
  Sun, 
  Droplets, 
  ShieldAlert, 
  SlidersHorizontal, 
  User, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

interface Section {
  n: number;
  title: string;
  intro?: string;
  bullets: string[];
  footer: string;
  c: { 
    border: string; 
    bg: string; 
    line: string; 
    dot: string; 
    title: string; 
    footer: string; 
    screen: string; 
  };
}

const SECTIONS_AMAMENTACAO: Section[] = [
  {
    n: 1,
    title: 'A Pega Correta (Passo a Passo)',
    intro: 'Amamentar NÃO deve doer. Dor forte ou rachadura indica que a pega precisa de ajuste imediato.',
    bullets: [
      'boca bem aberta ("boca de peixinho"), abocanhando quase toda a aréola inferior;',
      'lábios evertidos (virados para fora, como bico de pato);',
      'queixo do bebê encostado ou bem próximo à mama da mãe;',
      'nariz livre para respirar, sem precisar que a mãe aperte a mama com os dedos;',
      'bochechas arredondadas ao sugar (sem covinhas e sem estalo de língua).'
    ],
    footer: '✓ Pega profunda na aréola garante leite abundante e protege o mamilo contra fissuras.',
    c: { 
      border: 'border-pink-400', 
      bg: 'bg-pink-50/85', 
      line: 'border-pink-200', 
      dot: 'bg-pink-600', 
      title: 'text-pink-950', 
      footer: 'text-pink-900', 
      screen: 'border-pink-500/40 text-pink-300' 
    },
  },
  {
    n: 2,
    title: 'Posicionamento do Bebê e da Mãe',
    bullets: [
      'barriga com barriga: o corpo do bebê deve estar alinhado e voltado para a mãe;',
      'cabeça, pescoço e coluna do bebê em linha reta, sem cabeça virada para o lado;',
      'traga o bebê até a mama, nunca incline seu corpo ou abaixe a mama até o bebê;',
      'use almofada ou travesseiro para apoiar os braços da mãe e relaxar ombros e coluna;',
      'posições variadas: tradicional, invertida (bola de futebol americano) ou deitada.'
    ],
    footer: '✓ Mãe relaxada e confortável produz mais ocitocina e o leite desce com facilidade.',
    c: { 
      border: 'border-purple-400', 
      bg: 'bg-purple-50/85', 
      line: 'border-purple-200', 
      dot: 'bg-purple-600', 
      title: 'text-purple-950', 
      footer: 'text-purple-900', 
      screen: 'border-purple-500/40 text-purple-300' 
    },
  },
  {
    n: 3,
    title: 'Prevenção e Tratamento de Fissuras',
    intro: 'A melhor prevenção de fissuras é a pega correta na aréola e nunca apenas no mamilo.',
    bullets: [
      'o próprio leite materno é o melhor cicatrizante: passe umas gotas na aréola após mamar e deixe secar;',
      'para interromper a mamada: coloque o dedo mindinho limpo no canto da boca do bebê para soltar o vácuo;',
      'NUNCA puxe o mamilo para fora da boca com o vácuo ativo (isso rasga a pele);',
      'varie as posições a cada mamada para aliviar o ponto de maior pressão sobre o bico;',
      'se fissura dolorosa: amamente primeiro na mama menos machucada, onde o reflexo de ejeção é ativado.'
    ],
    footer: '✓ Corrigir a pega resolve 95% das fissuras em 48 a 72 horas.',
    c: { 
      border: 'border-rose-400', 
      bg: 'bg-rose-50/85', 
      line: 'border-rose-200', 
      dot: 'bg-rose-600', 
      title: 'text-rose-950', 
      footer: 'text-rose-900', 
      screen: 'border-rose-500/40 text-rose-300' 
    },
  },
  {
    n: 4,
    title: 'Hidratação e Cuidados com a Pele',
    bullets: [
      'hidratação interna generosa: beba água sempre que sentir sede e mantenha uma garrafa ao lado nas mamadas;',
      'NÃO lave os mamilos antes ou depois de cada mamada — o banho diário habitual com água morna é suficiente;',
      'NÃO use sabonetes, álcool ou buchas nos mamilos: eles retiram os óleos protetores naturais das glândulas de Montgomery;',
      'evite pomadas espessas desnecessárias que precisam ser retiradas antes da mamada com atrito doloroso;',
      'se usar lanolina ou hidrogel sob indicação, aplique camada ultrafina e areje a mama.'
    ],
    footer: '✓ Mamilo limpo apenas com água e hidratado com o próprio leite se mantém íntegro e flexível.',
    c: { 
      border: 'border-cyan-400', 
      bg: 'bg-cyan-50/85', 
      line: 'border-cyan-200', 
      dot: 'bg-cyan-600', 
      title: 'text-cyan-950', 
      footer: 'text-cyan-900', 
      screen: 'border-cyan-500/40 text-cyan-300' 
    },
  },
  {
    n: 5,
    title: 'Banho de Sol & Arejamento das Mamas',
    bullets: [
      'tome 10 a 15 minutos de sol matinal (antes das 9h ou após as 16h) com as mamas expostas;',
      'o sol suave fortalece e prepara a pele do complexo aréolo-mamilar;',
      'em dias nublados ou em apartamento: luz natural indireta próxima à janela já é benéfica;',
      'deixe as mamas arejadas e secas o máximo de tempo possível;',
      'evite absorventes de seio de plástico que abafam e mantêm umidade quente (porta para fungos);',
      'prefira sutiãs 100% algodão sem aros metálicos e conchas rígidas apenas se prescritas.'
    ],
    footer: '✓ Sol moderado e pele arejada estimulam a regeneração celular e previnem candidíase mamária.',
    c: { 
      border: 'border-amber-400', 
      bg: 'bg-amber-50/85', 
      line: 'border-amber-200', 
      dot: 'bg-amber-600', 
      title: 'text-amber-950', 
      footer: 'text-amber-900', 
      screen: 'border-amber-500/40 text-amber-300' 
    },
  },
  {
    n: 6,
    title: 'Livre Demanda & Esvaziamento',
    bullets: [
      'livre demanda: amamente sempre que o bebê pedir (sinais precoces: mexer a boca, virar a cabeça, levar a mãozinha à boca);',
      'não espere o bebê chorar de desespero — chorar é sinal tardio de fome e dificulta a pega calma;',
      'deixe o bebê esvaziar bem a primeira mama antes de oferecer a segunda (o leite do final da mamada é rico em gordura e sacia);',
      'ingurgitamento ("peito empedrado"): faça massagem circular suave e ordenha manual de alívio na aréola ANTES de ofertar para amaciar a pega;',
      'NUNCA aplique compressas quentes na mama engurgitada (o calor aumenta a produção e piora o inchaço).'
    ],
    footer: '✓ Amamentação em livre demanda estimula produção calibrada exatamente para a necessidade do bebê.',
    c: { 
      border: 'border-emerald-500', 
      bg: 'bg-emerald-50/85', 
      line: 'border-emerald-200', 
      dot: 'bg-emerald-600', 
      title: 'text-emerald-950', 
      footer: 'text-emerald-900', 
      screen: 'border-emerald-500/40 text-emerald-300' 
    },
  },
];

export default function AmamentacaoGuiaMain() {
  const [patientName, setPatientName] = useState<string>('');
  const [babyName, setBabyName] = useState<string>('');
  const [babyAge, setBabyAge] = useState<string>('Recém-Nascido');
  const [doctorName, setDoctorName] = useState<string>('Dr(a). Equipe de Pediatria / Obstetrícia');
  const [customNote, setCustomNote] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'app' | 'a4'>('app');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const handleBeforePrint = () => {
      document.body.classList.add('amamentacao-print-active');
    };
    const handleAfterPrint = () => {
      document.body.classList.remove('amamentacao-print-active');
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('amamentacao-print-active');
    };
  }, []);

  const handlePrint = () => {
    document.body.classList.add('amamentacao-print-active');
    const originalTitle = document.title;
    const cleanPatient = (patientName || 'Mae_e_Bebe').trim().replace(/[^a-zA-Z0-9]/g, '_');
    document.title = `Guia_Amamentacao_Pega_e_Cuidados_${cleanPatient}`;
    
    requestAnimationFrame(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('amamentacao-print-active');
        document.title = originalTitle;
      }, 1000);
    });
  };

  const handleCopySummary = () => {
    const text = `GUIA DE ORIENTAÇÕES: AMAMENTAÇÃO, PEGA CORRETA & CUIDADOS
Paciente / Mãe: ${patientName || 'Mãe'}
Bebê: ${babyName || 'Bebê'} (${babyAge})
Profissional: ${doctorName}

1. PEGA CORRETA: Boca bem aberta ("peixinho"), lábios evertidos, queixo encostado na mama, nariz livre, abocanhar aréola inferior.
2. POSICIONAMENTO: Barriga com barriga alinhados, trazer o bebê à mama sem curvar o corpo, apoiar braços.
3. FISSURAS: Passar gotas do próprio leite materno após mamar; soltar o vácuo com o dedo mindinho antes de retirar; corrigir a pega.
4. HIDRATAÇÃO: Ingestão hídrica abundante da mãe; não usar sabonete, buchas ou álcool nos mamilos; não esfregar a pele.
5. BANHO DE SOL: 10-15 min de sol suave matinal nas mamas (< 9h ou > 16h); manter seios arejados e secos; sutiã de algodão sem aros.
6. LIVRE DEMANDA & MANEJO: Amamentar aos primeiros sinais de fome; esvaziar uma mama antes da outra; massagem circular suave se ingurgitamento; compressa fria (nunca quente no ingurgitamento).

SINAIS DE ALARME (PROCURAR PEDIATRIA/BANCO DE LEITE):
- Febre > 37.8°C, calafrios ou mal-estar com mama vermelha, quente e dolorosa (mastite);
- Dor intensa contínua que não passa após os primeiros segundos da pega;
- Fissura sangrante profunda ou bebê que não ganha peso / urina menos de 6 fraldas por dia.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const docProps = {
    patientName,
    babyName,
    babyAge,
    doctorName,
    customNote
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 p-2 sm:p-4 md:p-6 font-sans">
      
      {/* Top Banner Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-3xl border border-line shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-500 dark:text-pink-400 font-bold text-xs uppercase tracking-widest mb-1">
            <Baby size={16} />
            <span>Ficha de Orientação Ambulatorial · Impressão A4</span>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-500 text-[10px] font-bold border border-pink-500/30">
              SBP / Ministério da Saúde
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight flex items-center gap-2">
            <span>Guia de Amamentação: Pega Correta & Cuidados</span>
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted max-w-2xl leading-relaxed">
            Orientações práticas para a puérpera e família: técnica de pega profunda, prevenção e alívio de fissuras mamárias, hidratação materna, banho de sol e manejo do ingurgitamento.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
          {/* Toggle View Mode */}
          <div className="flex items-center bg-bg p-1 rounded-2xl border border-line">
            <button
              onClick={() => setViewMode('app')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'app'
                  ? 'bg-card text-brand-navy shadow-sm'
                  : 'text-ink-muted hover:text-brand-navy'
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>Painel</span>
            </button>
            <button
              onClick={() => setViewMode('a4')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'a4'
                  ? 'bg-card text-pink-500 shadow-sm'
                  : 'text-ink-muted hover:text-brand-navy'
              }`}
            >
              <Eye size={13} />
              <span>Folha A4</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopySummary}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs bg-bg border border-line hover:border-slate-400 text-brand-navy transition-all cursor-pointer shadow-sm"
            title="Copiar texto resumido para prontuário eletrônico"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-500">Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar Texto</span>
              </>
            )}
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-600/20 active:scale-98 transition-all cursor-pointer"
          >
            <Printer size={16} />
            <span>IMPRIMIR A4</span>
          </button>
        </div>
      </header>

      {/* Patient & Customization Bar */}
      <div className="bg-card p-4 sm:p-5 rounded-3xl border border-line shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-ink-muted mb-1 flex items-center gap-1">
            <User size={12} className="text-pink-500" />
            Nome da Mãe:
          </label>
          <input
            type="text"
            placeholder="Ex.: Maria Eduarda Santos"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-bg border border-line focus:outline-none focus:border-pink-500 text-brand-navy placeholder:text-ink-muted/60"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-ink-muted mb-1 flex items-center gap-1">
            <Baby size={12} className="text-pink-500" />
            Nome do Bebê:
          </label>
          <input
            type="text"
            placeholder="Ex.: Arthur Santos"
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-bg border border-line focus:outline-none focus:border-pink-500 text-brand-navy placeholder:text-ink-muted/60"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-ink-muted mb-1 flex items-center gap-1">
            <Droplets size={12} className="text-cyan-500" />
            Idade / Fase:
          </label>
          <input
            type="text"
            placeholder="Ex.: 15 dias de vida"
            value={babyAge}
            onChange={(e) => setBabyAge(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-bg border border-line focus:outline-none focus:border-pink-500 text-brand-navy placeholder:text-ink-muted/60"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-ink-muted mb-1 flex items-center gap-1">
            <Sparkles size={12} className="text-purple-400" />
            Médico(a) / Assinatura:
          </label>
          <input
            type="text"
            placeholder="Ex.: Dr. Abner Portilho"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-bg border border-line focus:outline-none focus:border-pink-500 text-brand-navy placeholder:text-ink-muted/60"
          />
        </div>
      </div>

      {/* Main Content: Interactive Panel or A4 Sheet Preview */}
      {viewMode === 'app' ? (
        <div className="flex flex-col gap-6">
          {/* 6 Core Rule Cards in Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTIONS_AMAMENTACAO.map((sec) => (
              <div 
                key={sec.n}
                className="bg-card p-5 rounded-3xl border border-line shadow-sm hover:border-pink-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-line">
                    <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 font-extrabold text-xs flex items-center justify-center shrink-0 border border-pink-500/30">
                      {sec.n}
                    </span>
                    <h3 className="font-extrabold text-sm text-brand-navy">
                      {sec.title}
                    </h3>
                  </div>

                  {sec.intro && (
                    <p className="text-xs text-ink-muted mb-2 font-medium leading-relaxed bg-bg/50 p-2.5 rounded-xl border border-line/60">
                      {sec.intro}
                    </p>
                  )}

                  <ul className="space-y-1.5 text-xs text-ink-muted leading-relaxed">
                    {sec.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-pink-500 shrink-0 font-bold mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-line text-[11px] font-bold text-pink-400">
                  {sec.footer}
                </div>
              </div>
            ))}
          </div>

          {/* Alarm Signs & What NOT to Do Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sinais de Alarme */}
            <div className="bg-rose-500/10 border border-rose-500/30 p-5 rounded-3xl">
              <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm uppercase tracking-wide mb-3">
                <ShieldAlert size={18} />
                <span>Sinais de Alarme: Procure Atendimento Imediato</span>
              </div>
              <ul className="space-y-2 text-xs text-ink leading-relaxed">
                <li className="flex items-start gap-2">
                  <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Mama muito vermelha, endurecida, quente e febre &gt; 37.8°C com calafrios:</strong> suspeita de mastite infecciosa. Requer avaliação médica rápida.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Fissura profunda com sangramento persistente ou dor lancinante contínua</strong> durante toda a mamada (e não apenas nos primeiros segundos da sucção).</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Bebê letárgico, não urina pelo menos 6 fraldas por dia</strong> ou perdeu peso além do esperado para os primeiros 10 dias.</span>
                </li>
              </ul>
            </div>

            {/* O Que NÃO Fazer */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-3xl">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase tracking-wide mb-3">
                <XCircle size={18} />
                <span>Mitos & O que NUNCA fazer</span>
              </div>
              <ul className="space-y-2 text-xs text-ink leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-black">✕</span>
                  <span><strong>NÃO passar buchas, toalhas ásperas ou álcool:</strong> a pele do mamilo se prepara sozinha pela natureza; friccionar causa feridas precoces.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-black">✕</span>
                  <span><strong>NÃO aplicar compressas quentes na mama cheia:</strong> o calor aumenta ainda mais a congestão vascular e o inchaço. Use compressa fria por no máx. 15 minutos após mamar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-black">✕</span>
                  <span><strong>NÃO dar bicos artificiais, chupetas ou mamadeiras nos primeiros 30 dias:</strong> causam confusão de bicos e levam ao desmame precoce e pega rasa.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* A4 Sheet Preview in App Container */
        <div className="flex justify-center bg-bg/50 p-4 sm:p-6 rounded-3xl border border-line overflow-x-auto">
          <A4AmamentacaoDocument {...docProps} />
        </div>
      )}

      {/* Hidden Portal for Clean 1-Page A4 Native Printing */}
      {isMounted &&
        createPortal(
          <div id="print-portal-root" className="hidden print:block print:w-full print:m-0 print:p-0">
            <A4AmamentacaoDocument {...docProps} isPrintPortal />
          </div>,
          document.body,
        )}
    </div>
  );
}

// ==========================================================================
// FOLHA A4 (Retrato, 1 página exata) — Padrão Profissional para Impressão
// ==========================================================================
function A4AmamentacaoDocument({
  patientName,
  babyName,
  babyAge,
  doctorName,
  customNote,
  isPrintPortal = false,
}: {
  patientName: string;
  babyName: string;
  babyAge: string;
  doctorName: string;
  customNote?: string;
  isPrintPortal?: boolean;
}) {
  return (
    <div
      className={`bg-white text-slate-950 font-sans w-full ${
        isPrintPortal 
          ? 'max-w-[200mm] p-1 m-0' 
          : 'max-w-[210mm] min-h-[297mm] p-6 sm:p-7 shadow-2xl rounded-sm border border-slate-300'
      }`}
      style={{ boxSizing: 'border-box', color: '#0f172a', backgroundColor: '#ffffff' }}
    >
      <div className="flex flex-col space-y-2">
        {/* Header Ribbon */}
        <header className="rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white p-3 shadow-sm flex items-center justify-center text-center">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="p-1 rounded-md bg-white/20 text-white inline-flex shadow-inner">
                <Baby size={18} />
              </span>
              <h1 className="text-base sm:text-lg font-black tracking-wide uppercase text-white drop-shadow-sm">
                Guia de Amamentação: Pega Correta & Cuidados
              </h1>
            </div>
            <p className="text-[11.5px] text-pink-50 font-medium leading-snug">
              Amamentar com conforto e sem dor: técnica correta, prevenção de fissuras, banho de sol e cuidados diários.
            </p>
          </div>
        </header>

        {/* Identification Subheader */}
        <div className="grid grid-cols-3 gap-2 text-[10.5px] px-1 py-1 border-b border-slate-200">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Mãe: </span>
            <span className="font-bold text-slate-900 text-[11px]">{patientName || '__________________________________'}</span>
          </div>
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Bebê / Fase: </span>
            <span className="font-bold text-slate-900 text-[11px]">
              {babyName ? `${babyName} (${babyAge || 'RN'})` : '__________________________________'}
            </span>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Equipe: </span>
            <span className="font-bold text-slate-900 text-[11px]">{doctorName || 'Pediatria / Obstetrícia'}</span>
          </div>
        </div>

        {/* 6 Sections Grid (3x2) */}
        <div className="grid grid-cols-3 gap-1.5 text-[10px] leading-[1.25]">
          {SECTIONS_AMAMENTACAO.map((s) => (
            <div 
              key={s.n} 
              className={`p-2 rounded-xl border-2 ${s.c.border} ${s.c.bg} shadow-xs flex flex-col justify-between`}
            >
              <div>
                <div className={`flex items-center gap-1.5 border-b ${s.c.line} pb-0.5 mb-1`}>
                  <span className={`w-4 h-4 rounded-full ${s.c.dot} text-white font-black text-[10.5px] flex items-center justify-center shrink-0 shadow-xs`}>
                    {s.n}
                  </span>
                  <h2 className={`font-black text-[10.5px] ${s.c.title} uppercase tracking-tight`}>
                    {s.title}
                  </h2>
                </div>
                {s.intro && (
                  <p className="text-slate-800 text-[9.5px] text-justify mb-0.5 font-medium leading-tight">
                    {s.intro}
                  </p>
                )}
                <ul className="text-slate-800 space-y-0.5 pl-1 text-[9.2px]">
                  {s.bullets.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </div>
              <div className={`mt-1 pt-0.5 border-t ${s.c.line} font-bold ${s.c.footer} text-[8.8px]`}>
                {s.footer}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Sinais de Alarme & O que Evitar */}
        <div className="grid grid-cols-[55%_45%] gap-1.5">
          {/* Sinais de Alarme */}
          <div className="p-2 rounded-xl border-2 border-rose-500 bg-rose-50/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-rose-200 pb-0.5 mb-1">
                <span className="p-0.5 rounded bg-rose-600 text-white inline-flex shrink-0">
                  <ShieldAlert size={12} />
                </span>
                <h3 className="font-black text-[10.5px] text-rose-950 uppercase tracking-tight">
                  Quando Buscar Avaliação Médica / Banco de Leite
                </h3>
              </div>
              <ul className="text-slate-800 space-y-0.5 text-[9.2px] leading-tight">
                <li>• <strong>Mastite:</strong> mama com área vermelha, quente, muito dolorosa + febre (&gt;37.8°C) ou calafrios;</li>
                <li>• <strong>Dor intensa contínua:</strong> dor aguda que não cede após os primeiros 30 segundos da pega;</li>
                <li>• <strong>Fissura profunda</strong> ou ferida com secreção amarelada / pus;</li>
                <li>• <strong>Bebê letárgico,</strong> sem urinar pelo menos 6 fraldas/dia ou sem ganho de peso.</li>
              </ul>
            </div>
            <div className="mt-1 pt-0.5 border-t border-rose-200 font-bold text-rose-900 text-[8.8px]">
              ⚠️ Dúvidas na pega? Procure o Banco de Leite Humano mais próximo ou seu pediatra.
            </div>
          </div>

          {/* O Que NÃO Fazer */}
          <div className="p-2 rounded-xl border-2 border-amber-500 bg-amber-50/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 border-b border-amber-200 pb-0.5 mb-1">
                <span className="p-0.5 rounded bg-amber-600 text-white inline-flex shrink-0">
                  <XCircle size={12} />
                </span>
                <h3 className="font-black text-[10.5px] text-amber-950 uppercase tracking-tight">
                  O que NUNCA fazer na Amamentação
                </h3>
              </div>
              <ul className="text-slate-800 space-y-0.5 text-[9.2px] leading-tight">
                <li>• <strong>NUNCA usar bucha, toalha grossa ou álcool:</strong> machuca e remove a hidratação natural;</li>
                <li>• <strong>NUNCA pôr compressa quente</strong> se a mama estiver ingurgitada/empedrada;</li>
                <li>• <strong>NÃO usar bicos artificiais, chupetas ou mamadeiras</strong> (confusão de bicos);</li>
                <li>• <strong>NUNCA puxar o mamilo</strong> sem antes quebrar o vácuo com o dedo mindinho.</li>
              </ul>
            </div>
            <div className="mt-1 pt-0.5 border-t border-amber-200 font-bold text-amber-900 text-[8.8px]">
              💡 O melhor protetor do seio é a pega profunda e o próprio leite materno.
            </div>
          </div>
        </div>

        {/* Footer Signature Bar */}
        <footer className="pt-1 border-t border-slate-200 flex justify-between items-center text-[8.5px] text-slate-500">
          <span>Diretrizes de Amamentação — SBP & Ministério da Saúde • Prontuário Médico Digital</span>
          <span>Carimbo / Assinatura: _____________________________________________</span>
        </footer>
      </div>
    </div>
  );
}
