import React, { useState } from 'react';
import { 
  Sparkles, Stethoscope, Dna, ShieldCheck, 
  AlertTriangle, CheckCircle2, Info, ArrowRight, Layers
} from 'lucide-react';

export default function DermSindromeEczemas() {
  const [activeTab, setActiveTab] = useState<'atopica' | 'contato' | 'estase_numular'>('atopica');
  const [atopicaAgeGroup, setAtopicaAgeGroup] = useState<'lactente' | 'infantil' | 'adulto'>('lactente');

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'atopica', label: 'Dermatite Atópica (Hanifin-Rajka & Biológicos)', badge: 'Eixo Th2 / Filagrina' },
          { id: 'contato', label: 'Dermatite de Contato: Irritativa (DCI) vs Alérgica (DCA)', badge: 'Patch Test' },
          { id: 'estase_numular', label: 'Eczema Numular & Dermatite de Estase', badge: 'Insuficiência Venosa' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{t.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeTab === t.id ? 'bg-cyan-700/60 text-cyan-100' : 'bg-slate-800 text-slate-400'}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. DERMATITE ATÓPICA */}
      {/* =================================================================== */}
      {activeTab === 'atopica' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Eczema Constitucional · Diretrizes SBD & Consenso Latino-Americano
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Dermatite Atópica (DA): Fisiopatologia, Fases e Terapêutica
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Doença inflamatória crônica com prurido intolerável, xerose cutânea e defeito intrínseco na barreira epidérmica (mutação no gene da <strong>filagrina - FLG</strong>). Componente da Tríade Atópica (Dermatite Atópica + Asma + Rinite Alérgica).
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                  Imunidade Th2 (IL-4 / IL-13)
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-bold text-cyan-200">
                  Critérios de Hanifin e Rajka
                </div>
              </div>
            </div>

            {/* Age group phase selector */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 block">Distribuição Topográfica por Faixa Etária:</span>
              <div className="flex items-center gap-2">
                {[
                  { id: 'lactente', label: '1. Fase do Lactente (3 meses a 2 anos)' },
                  { id: 'infantil', label: '2. Fase Infantil (2 a 12 anos)' },
                  { id: 'adulto', label: '3. Fase do Adolescente & Adulto (> 12 anos)' },
                ].map(ag => (
                  <button
                    key={ag.id}
                    onClick={() => setAtopicaAgeGroup(ag.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border cursor-pointer ${
                      atopicaAgeGroup === ag.id
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Age phase details */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            {atopicaAgeGroup === 'lactente' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-cyan-300">Fase do Lactente (3 meses a 2 anos)</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                    Lesões Agudas e Exsudativas
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Início clássico ao redor dos 3 meses com <strong>bochechas eritematosas, vesículas e crostas</strong> (aspecto exsudativo), couro cabeludo e superfícies extensoras dos membros.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <strong className="text-amber-400 block">Pérola Semiológica Fundamental:</strong>
                  <p>O centro da face (região perioral e ponta nasal) e a <strong>área coberta pela fralda são tipicamente POUPADAS</strong> (o microambiente oclusivo e úmido da fralda protege temporariamente a barreira cutânea deficiente).</p>
                </div>
              </div>
            )}

            {atopicaAgeGroup === 'infantil' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-cyan-300">Fase Infantil (2 a 12 anos)</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                    Transição para Subagudo e Flexural
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  As lesões migram das faces extensoras para as <strong>dobras flexurais</strong>: fossas antecubitais, fossas poplíteas, punhos, pescoço e pregas retroauriculares.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <strong className="text-cyan-400 block">Características Típicas:</strong>
                  <p>Pápulas escoriadas, xerose intensa e início de liquenificação nas dobras. Sinais menores: <strong>dupla prega infraorbitária de Dennie-Morgan</strong>, palidez perioral, hiperlinearidade palmar e ceratose pilar nos braços.</p>
                </div>
              </div>
            )}

            {atopicaAgeGroup === 'adulto' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-cyan-300">Fase do Adolescente & Adulto (&gt; 12 anos)</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                    Lesões Crônicas e Liquenificadas
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quadro dominado por <strong>liquenificação acentuada</strong> ("pele de elefante" em couraça), prurigo nodular, dermatite das mãos, eczema periorbitário e acometimento da face e pescoço ("red neck syndrome").
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <strong className="text-rose-400 block">Complicação Infecciosa Grave (Erupção Variceliforme de Kaposi / Eczema Herpético):</strong>
                  <p>Disseminação fulminante do vírus Herpes Simplex (HSV) sobre a pele atópica desprovida de peptídeos antimicrobianos. Cursa com centenas de vesículas umbilicadas com crostas, febre alta e toxemia. <strong>Emergência dermatológica: iniciar Aciclovir IV imediatamente.</strong></p>
                </div>
              </div>
            )}
          </div>

          {/* Stepped Management */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-cyan-400" size={18} />
              Manejo Terapêutico Escalonado da Dermatite Atópica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[11px] block">Degrau 1: Cuidados de Base (100% dos pacientes)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Banhos rápidos (5 a 10 min), mornos, sem buchas, com sabonetes syndet suaves.
                </p>
                <p className="text-slate-400 text-[10px]">
                  <strong>Regra dos 3 minutos:</strong> aplicar hidratante emoliente rico em ceramidas em todo o corpo nos primeiros 3 minutos após sair do banho para selar a umidade.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase text-[11px] block">Degrau 2: Crises Leves a Moderadas</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Corticoides tópicos de baixa a média potência (Desonida 0,05% em face/dobras; Mometasona 0,1% em tronco/membros).
                </p>
                <p className="text-slate-400 text-[10px]">
                  <strong>Inibidores de Calcineurina Tópicos:</strong> Tacrolimo 0,03% / 0,1% e Pimecrolimo 1%. Poupadores de corticoide, ideais para manutenção proativa 2x/semana.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-orange-400 uppercase text-[11px] block">Degrau 3: Moderada a Grave / Refratária</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Fototerapia com UVB de banda estreita (Narrowband) ou imunossupressores orais convencionais.
                </p>
                <p className="text-slate-400 text-[10px]">
                  <strong>Metotrexato</strong> (10–15 mg/semana) ou <strong>Ciclosporina oral</strong> (3–5 mg/kg/dia por no máximo 6 meses para controle de crise aguda refratária).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[11px] block">Degrau 4: Terapia Alvo / Biológicos Modernos</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Para DA moderada a grave com SCORAD &gt; 50 ou refratariedade sistêmica.
                </p>
                <p className="text-slate-400 text-[10px]">
                  • <strong>Dupilumabe (anti-IL4Rα):</strong> Bloqueia IL-4 e IL-13. Excelente perfil sem imunossupressão ampla. Aprovado a partir dos 6 meses de vida.<br />
                  • <strong>Inibidores de JAK orais:</strong> Upadacitinibe e Baricitinibe (alívio do prurido em 24-48h).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. DERMATITE DE CONTATO */}
      {/* =================================================================== */}
      {activeTab === 'contato' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              Dermatoses Ocupacionais & Ambientais
            </span>
            <h2 className="text-2xl font-black text-white">Dermatite de Contato por Irritante (DCI) vs Alérgica (DCA)</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Diferenciação mandatória em ambulatório e perícias trabalhistas. 80% dos casos de dermatite de contato são por irritante primário, enquanto 20% envolvem mecanismo imunológico de hipersensibilidade celular.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-3">Critério Comparativo</th>
                  <th className="p-3 text-amber-300">Dermatite de Contato por Irritante (DCI)</th>
                  <th className="p-3 text-cyan-300">Dermatite de Contato Alérgica (DCA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                <tr>
                  <td className="p-3 font-bold text-white">Mecanismo Patogênico</td>
                  <td className="p-3">Dano citotóxico direto aos queratinócitos e quebra física de barreira lipídica. <strong>Não-imunológico</strong>.</td>
                  <td className="p-3"><strong>Hipersensibilidade Celular Tipo IV (Tardia)</strong> mediada por Linfócitos T sensibilizados.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Sensibilização Prévia</td>
                  <td className="p-3"><strong>Não necessária.</strong> Pode ocorrer no primeiro contato se a substância for cáustica.</td>
                  <td className="p-3"><strong>Obrigatória.</strong> Requer período de indução prévio (dias a anos de exposição silenciosa).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Frequência Relativa</td>
                  <td className="p-3 font-mono font-bold text-amber-400">≈ 80% de todas as dermatites de contato</td>
                  <td className="p-3 font-mono font-bold text-cyan-400">≈ 20% das dermatites de contato</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Delimitação Anatômica</td>
                  <td className="p-3"><strong>Estritamente restrita</strong> à área exata de contato com o agente agressor. Bordas nítidas.</td>
                  <td className="p-3"><strong>Ultrapassa a área de contato.</strong> Efeito "crescendo" com lesões à distância por disseminação imune.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Sintoma Predominante</td>
                  <td className="p-3">Ardor, queimação, dor e sensação de repuxamento.</td>
                  <td className="p-3"><strong>Prurido intenso e intolerável.</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Exemplos Típicos</td>
                  <td className="p-3">Detergentes, água sanitária, cimento fresco (alcalino), sabões industriais, mãos de lavadeiras.</td>
                  <td className="p-3"><strong>Sulfato de níquel</strong> (bijuterias, botões de jeans), formaldeído em esmaltes, PPD em tinturas capilares, Neomicina tópica.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Teste de Contato (Patch Test)</td>
                  <td className="p-3 font-bold text-slate-400">NEGATIVO (ou reações irritativas inespecíficas).</td>
                  <td className="p-3 font-bold text-emerald-400">POSITIVO (padrão-ouro diagnóstico com leitura em 48h e 96h).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. ECZEMA NUMULAR & ESTASE */}
      {/* =================================================================== */}
      {activeTab === 'estase_numular' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              Eczemas Subagudos e Circulatórios
            </span>
            <h2 className="text-2xl font-black text-white">Eczema Numular & Dermatite de Estase</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Dermatites eczematosas comuns na prática clínica geral e geriátrica, com fisiopatologia ligada à xerose senil e à hipertensão venosa crônica dos membros inferiores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-amber-300 block">Eczema Numular (Discomedro)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Placas eritematosas circulares bem delimitadas em formato de <strong>moeda</strong> (1 a 5 cm), recobertas por microvesículas agrupadas, crostas e exsudato seroso, que posteriormente liquenificam.
              </p>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <p>• <strong>População típica:</strong> Homens idosos no inverno (xerose intensa e banhos muito quentes).</p>
                <p>• <strong>Diferencial principal:</strong> Tinea corporis (a micose tem clareamento central e borda ativa com descamação, enquanto o eczema numular é homogêneo em toda a moeda).</p>
                <p>• <strong>Tratamento:</strong> Corticoide de média/alta potência (pomada de Betametasona) por 2 semanas e emolientes intensivos com ureia a 10%.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 block">Dermatite de Estase Venosa</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Decorrente da hipertensão venosa crônica por insuficiência valvular nos membros inferiores (terço distal das pernas).
              </p>
              <div className="space-y-1.5 text-slate-400 text-[11px]">
                <p>• <strong>Púrpura Ocre:</strong> Extravasamento de hemácias com deposição cutânea crônica de hemosiderina (coloração castanho-ferruginosa permanente).</p>
                <p>• <strong>Lipodermatoesclerose:</strong> Fibrose profunda da derme e tecido adiposo subcutâneo, deixando a perna afunilada em <strong>"garrafa de champanhe invertida"</strong>.</p>
                <p>• <strong>Alerta:</strong> Pele hiper-reativa. Altíssimo risco de desenvolver Dermatite de Contato Alérgica por antibióticos tópicos (neomicina) ou curativos.</p>
                <p>• <strong>Tratamento essencial:</strong> Terapia de compressão inelástica (Bota de Unna) ou elástica, elevação dos membros e corticoide tópico fraco por curto período.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
