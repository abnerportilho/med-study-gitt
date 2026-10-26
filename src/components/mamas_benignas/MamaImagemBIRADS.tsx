import React, { useState } from 'react';
import { 
  Eye, CheckCircle2, AlertCircle, ShieldAlert, 
  HelpCircle, Sparkles, Activity, FileText, ArrowRight
} from 'lucide-react';

export default function MamaImagemBIRADS() {
  const [selectedBirads, setSelectedBirads] = useState<number>(3);
  const [selectedMethod, setSelectedMethod] = useState<'paaf' | 'core' | 'vabb' | 'cirurgica'>('core');

  const BIRADS_DATA = [
    {
      cat: 0,
      name: 'BI-RADS 0',
      status: 'Avaliação Incompleta',
      risk: 'Indeterminado',
      conduct: 'Necessita exames adicionais de imagem (incidências mamográficas especiais, compressão focal, magnificação, USG ou RM) ou comparação com exames anteriores.',
      details: 'Comum em mamas densas ou quando há sobreposição de tecido.',
      color: 'border-slate-700 bg-slate-900 text-slate-200'
    },
    {
      cat: 1,
      name: 'BI-RADS 1',
      status: 'Exame Negativo',
      risk: '~ 0%',
      conduct: 'Manter rastreamento de rotina conforme a faixa etária e diretrizes vigentes (ex: mamografia bienal 50-69 anos ou anual >40 anos).',
      details: 'Mamas simétricas, sem massas, distorções arquiteturais ou microcalcificações suspeitas.',
      color: 'border-emerald-800 bg-emerald-950/40 text-emerald-300'
    },
    {
      cat: 2,
      name: 'BI-RADS 2',
      status: 'Achado Benigno',
      risk: '~ 0%',
      conduct: 'Manter rastreamento de rotina conforme a faixa etária. Não requer controle em curto intervalo.',
      details: 'Cistos simples, fibroadenomas hialinizados/calcificados em "pipoca", lipomas, hamartomas, implantes íntegros, linfonodos intramamários típicos.',
      color: 'border-emerald-800 bg-emerald-950/40 text-emerald-300'
    },
    {
      cat: 3,
      name: 'BI-RADS 3',
      status: 'Provavelmente Benigno',
      risk: '≤ 2% de malignidade',
      conduct: 'Controle em curto intervalo (aos 6, 12 e 24 meses). Se estável por 2 anos completos → reclassificar para BI-RADS 2. Se houver crescimento ou suspeita → reclassificar para BI-RADS 4 e biopsiar.',
      details: 'Nódulo sólido oval, circunscrito e paralelo à pele (típico de fibroadenoma); grupo de microcalcificações puntiformes monomórficas; cistos complicados agrupados.',
      color: 'border-amber-700 bg-amber-950/40 text-amber-300'
    },
    {
      cat: 4,
      name: 'BI-RADS 4',
      status: 'Achado Suspeito',
      risk: '> 2% a < 95% de malignidade (4A: 2-10%, 4B: 10-50%, 4C: 50-95%)',
      conduct: 'Diagnóstico histológico obrigatório (Core Biopsy orientada por USG ou Mamotomia/VABB para microcalcificações).',
      details: 'Nódulo de contornos microlobulados, margens indistintas, microcalcificações pleomórficas heterogêneas ou distorção arquitetural.',
      color: 'border-rose-700 bg-rose-950/40 text-rose-300'
    },
    {
      cat: 5,
      name: 'BI-RADS 5',
      status: 'Altamente Suspeito',
      risk: '≥ 95% de malignidade',
      conduct: 'Diagnóstico histológico mandatório pré-operatório imediato (Core Biopsy).',
      details: 'Massa espiculada densa, microcalcificações lineares ramificadas, nódulo não paralelo mais alto que largo com sombra acústica posterior.',
      color: 'border-rose-800 bg-rose-950/80 text-rose-200'
    },
    {
      cat: 6,
      name: 'BI-RADS 6',
      status: 'Malignidade Comprovada',
      risk: '100% (Histológico conhecido)',
      conduct: 'Planejamento e tratamento oncológico definitivo (cirurgia conservadora, mastectomia, quimioterapia neoadjuvante).',
      details: 'Exames de imagem realizados após biópsia prévia com laudo positivo para carcinoma.',
      color: 'border-purple-800 bg-purple-950/50 text-purple-300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 3 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Eye size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Eixo 3 · Radiologia & Propedêutica
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Imagem Diagnóstica, Classificação BI-RADS & Avaliação Tríplice
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A categoria radiológica conduz a próxima etapa clínica. O exame em paciente sintomática é <strong>diagnóstico e direcionado</strong>, diferindo do rastreamento populacional assintomático.
        </p>
      </div>

      {/* 1. SELEÇÃO DO MÉTODO DE IMAGEM */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <Activity className="text-cyan-400" size={20} />
          Seleção Racional do Método de Imagem por Faixa Etária e Apresentação
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase text-cyan-400 block">Menores de 30 Anos</span>
            <h5 className="text-sm font-bold text-white">Ultrassonografia (USG) como 1º Exame</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamas predominantemente densas e ricas em tecido glandular reduzem a sensibilidade da mamografia. O USG diferencia com alta precisão se a alteração palpável é <strong>sólida ou cística</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase text-purple-400 block">A partir de 30 a 35 Anos</span>
            <h5 className="text-sm font-bold text-white">Mamografia / Tomossíntese + USG</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              A mamografia avalia microcalcificações, distorções e densidades assimétricas. A ultrassonografia é complementar indispensável para caracterizar nódulos e direcionar biópsias.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase text-amber-400 block">Ressonância Magnética (RM)</span>
            <h5 className="text-sm font-bold text-white">Indicações Específicas</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Avaliação de integridade de implantes mamários, estadiamento locorregional de câncer comprovado, rastreamento de alto risco genético (BRCA1/2) e casos de discordância diagnóstica de difícil elucidação.
            </p>
          </div>
        </div>
      </div>

      {/* 2. TABELA INTERATIVA DO BI-RADS */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-base font-black text-white flex items-center gap-2">
            <Sparkles className="text-amber-400" size={20} />
            Sistema BI-RADS: Traduzindo Achados em Conduta
          </h4>
          <span className="text-xs text-slate-400">Clique nas categorias para explorar a conduta:</span>
        </div>

        {/* BOTOES BI-RADS */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {BIRADS_DATA.map(item => (
            <button
              key={item.cat}
              onClick={() => setSelectedBirads(item.cat)}
              className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                selectedBirads === item.cat
                  ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg scale-105'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="text-xs font-black">Cat {item.cat}</div>
              <div className="text-[10px] truncate opacity-80">{item.status}</div>
            </button>
          ))}
        </div>

        {/* DETALHE DO BI-RADS SELECIONADO */}
        {(() => {
          const current = BIRADS_DATA.find(b => b.cat === selectedBirads)!;
          return (
            <div className={`p-5 rounded-2xl border space-y-3 ${current.color}`}>
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-2">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider">{current.name}: {current.status}</span>
                  <div className="text-xs font-mono opacity-90 mt-0.5">Risco Estimado de Malignidade: <strong>{current.risk}</strong></div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20">
                  Conduta Padrão
                </span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div>
                  <strong className="text-white block mb-0.5">Conduta Clínica Recomendada:</strong>
                  <p>{current.conduct}</p>
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Achados Típicos na Imagem:</strong>
                  <p className="opacity-90">{current.details}</p>
                </div>
              </div>

              {current.cat === 3 && (
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-700 text-xs text-amber-200 space-y-1">
                  <strong>⚠️ Atenção ao BI-RADS 3 ("Não é Esquecimento"):</strong>
                  <p>
                    O seguimento de curto intervalo só é seguro quando a paciente tem condições reais de adesão ao retorno. Se houver alto risco genético, ansiedade extrema incompatível ou inviabilidade de seguimento, a biópsia (Core) pode ser considerada.
                  </p>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* 3. AVALIAÇÃO TRÍPLICE & CONCORDÂNCIA */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <ShieldAlert className="text-purple-400" size={20} />
          Avaliação Tríplice Obrigatória: A Concordância que Salva Vidas
        </h4>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Nenhum diagnóstico mamário deve ser firmado com base em um único dado isolado. O manejo seguro exige a integração harmoniosa de 3 pilares:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-rose-950 text-rose-400 flex items-center justify-center font-bold text-xs border border-rose-800">1</div>
            <h5 className="text-xs font-black uppercase text-white">Clínica</h5>
            <p className="text-[11px] text-slate-300">O que a história relata e a palpação física demonstra (consistência, mobilidade, sinais cutâneos).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-800">2</div>
            <h5 className="text-xs font-black uppercase text-white">Imagem</h5>
            <p className="text-[11px] text-slate-300">Mamografia, ultrassonografia ou ressonância caracterizando margens, ecos e calcificações.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-800">3</div>
            <h5 className="text-xs font-black uppercase text-white">Patologia</h5>
            <p className="text-[11px] text-slate-300">Laudo citológico ou histopatológico que deve explicar e justificar os achados clínicos e radiológicos.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-xs text-rose-200 leading-relaxed font-medium">
          🚨 <strong>Regra de Discordância:</strong> <em>"Resultado benigno discordante NÃO encerra a investigação."</em> Se uma massa espiculada BI-RADS 5 resulta em "tecido mamário normal" na biópsia, o procedimento foi falso-negativo (erro de amostragem). Deve-se repetir a biópsia ou indicar biópsia excisional cirúrgica!
        </div>
      </div>

      {/* 4. MÉTODOS DE AMOSTRAGEM / BIÓPSIA */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-base font-black text-white flex items-center gap-2">
          <FileText className="text-emerald-400" size={20} />
          Escolha da Amostragem pela Pergunta Diagnóstica
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'paaf', name: 'PAAF (Agulha Fina)' },
            { id: 'core', name: 'Core Biopsy (Agulha Grossa)' },
            { id: 'vabb', name: 'Mamotomia (Vácuo / VABB)' },
            { id: 'cirurgica', name: 'Biópsia Cirúrgica' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m.id as any)}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                selectedMethod === m.id
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {selectedMethod === 'paaf' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>PAAF (Punção Aspirativa por Agulha Fina):</span>
              <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded">Citologia</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Entrega:</strong> Amostra citológica líquida/celular.<br />
              <strong>Indicações Principais:</strong> Esvaziamento terapêutico de cistos mamários sintomáticos/tensos e avaliação de linfonodos axilares suspeitos.<br />
              <strong>Limitação:</strong> Não preserva a arquitetura tecidual, não diferencia carcinoma <em>in situ</em> de invasor e tem alto índice de material insuficiente em massas sólidas.
            </p>
          </div>
        )}

        {selectedMethod === 'core' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Core Biopsy (Punção com Agulha Grossa / Tru-Cut):</span>
              <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded">Padrão-Ouro Histológico</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Entrega:</strong> Cilindros/fragmentos de tecido para análise histopatológica e imunohistoquímica.<br />
              <strong>Indicações Principais:</strong> Método de 1ª escolha para praticamente todas as <strong>massas sólidas suspeitas (BI-RADS 4 e 5)</strong> sob guia ultrassonográfica.<br />
              <strong>Vantagens:</strong> Baixa morbidade, ambulatorial, rápida e diferencia com clareza lesões benignas de invasoras.
            </p>
          </div>
        )}

        {selectedMethod === 'vabb' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Mamotomia / Biópsia a Vácuo (VABB):</span>
              <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded">Alto Volume</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Entrega:</strong> Grandes fragmentos contínuos sob sucção a vácuo.<br />
              <strong>Indicações Principais:</strong> Padrão-ouro para amostragem de <strong>microcalcificações agrupadas suspeitas</strong> guiadas por estereotaxia ou lesões vistas apenas na Ressonância Magnética. Permite colocação de clipe metálico marcador de titânio.
            </p>
          </div>
        )}

        {selectedMethod === 'cirurgica' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Biópsia Cirúrgica (Excisional / Incisional):</span>
              <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded">Cirurgia</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Entrega:</strong> Remoção completa da lesão (setorectomia / nodulectomia).<br />
              <strong>Indicações Principais:</strong> Lesões com discordância clínico-radiológica-patológica persistente, suspeita de tumor filoide, hiperplasia ductal atípica na Core Biopsy (risco de subestimação) ou lesão papilífera com atipia.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
