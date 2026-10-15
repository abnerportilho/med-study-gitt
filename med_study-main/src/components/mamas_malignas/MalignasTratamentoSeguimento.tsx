import React, { useState } from 'react';
import { 
  Sparkles, Heart, Activity, ShieldCheck, CheckCircle2, 
  AlertTriangle, ArrowRight, Stethoscope, Pill, Scissors, Sun, Calendar
} from 'lucide-react';

export default function MalignasTratamentoSeguimento() {
  const [activeTab, setActiveTab] = useState<'cirurgia' | 'radioterapia' | 'sistemico' | 'seguimento'>('cirurgia');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 6 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Sparkles size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Eixo 6 · Terapêutica Multimodal & Sobrevivência
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Como Tratar & Acompanhar: Cirurgia, Terapias Sistêmicas e Seguimento
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O tratamento moderno do câncer de mama é estritamente personalizado e interdisciplinar. Combina o controle locorregional (cirurgia conservadora, avaliação axilar e radioterapia) com terapias sistêmicas adaptadas ao subtipo biológico e um seguimento baseado em evidências.
        </p>

        {/* NAVEGAÇÃO DE SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'cirurgia', label: '1. Cirurgia da Mama & da Axila' },
            { id: 'radioterapia', label: '2. Radioterapia: Quando & Por Que?' },
            { id: 'sistemico', label: '3. Tratamento Sistêmico por Subtipo' },
            { id: 'seguimento', label: '4. Seguimento Racional & Sobrevivência' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. CIRURGIA DA MAMA E DA AXILA */}
      {activeTab === 'cirurgia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Scissors className="text-emerald-400" size={20} />
              Controle Cirúrgico: Menos Mutilação com a Mesma Segurança
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Grandes estudos prospectivos randomizados (como NSABP B-06 e Milão I) provaram que a <strong>cirurgia conservadora associada à radioterapia pós-operatória oferece a mesma sobrevida global que a mastectomia total</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* CIRURGIA DA MAMA */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-cyan-300 text-sm block">Abordagem Cirúrgica da Mama</span>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 block">Cirurgia Conservadora (Setorectomia / Quadrantectomia):</strong>
                    <span>Excisão completa da lesão tumoral com <strong>margens cirúrgicas microscopicamente livres</strong> ("sem tinta sobre o tumor invasivo" e ≥ 2 mm no CDIS). Torna a <strong>radioterapia adjuvante obrigatória</strong>.</span>
                  </li>
                  <li className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block">Mastectomia Total (com ou sem preservação de pele/mamilo):</strong>
                    <span>Indicada quando a relação volume tumoral/volume mamário é desfavorável, em microcalcificações pleomórficas difusas, margens persistentemente positivas após re-excisão, ou por opção fundamentada da paciente. Sempre que possível, associada à reconstrução mamária imediata.</span>
                  </li>
                </ul>
              </div>

              {/* ABORDAGEM DA AXILA */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-rose-300 text-sm block">Abordagem da Axila: Descalonamento Cirúrgico</span>
                <ul className="space-y-2 text-slate-300 text-[11px]">
                  <li className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-rose-300 block">Biópsia do Linfonodo Sentinela (BLS):</strong>
                    <span>Padrão-ouro em pacientes com axila clinicamente negativa (cN0). Injeção de radiocoloide (Tecnécio-99m) e/ou corante azul patente. Identifica os primeiros 1 a 3 linfonodos de drenagem, <strong>evitando o esvaziamento axilar mórbido e o linfedema de membro superior em até 70-80% das mulheres</strong>.</span>
                  </li>
                  <li className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-indigo-300 block">Esvaziamento Axilar Completo (Níveis I e II):</strong>
                    <span>Reservado para doença metastática clinicamente palpável/fixa inicial (cN1-2), pacientes com linfonodos positivos fora dos critérios do estudo ACOSOG Z0011, ou falha de resposta completa na axila após neoadjuvância.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. RADIOTERAPIA */}
      {activeTab === 'radioterapia' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Sun className="text-amber-400" size={20} />
              Radioterapia: Quando e Por Que Indicar?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              A radioterapia locorregional elimina focos microscópicos residuais no parênquima ou na parede torácica, reduzindo a recidiva local em 50-70% e convertendo esse benefício em ganho de sobrevida a longo prazo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 space-y-2">
                <span className="font-bold text-amber-300 text-sm">Pós-Cirurgia Conservadora</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Indicação MANDATÓRIA</strong> na quase totalidade das pacientes submetidas à ressecção segmentar da mama. A irradiação de toda a mama restante com ou sem reforço (*boost*) no leito tumoral assegura controle oncológico idêntico à mastectomia.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
                <span className="font-bold text-rose-300 text-sm">Pós-Mastectomia (Critérios de Alto Risco)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Indicada na parede torácica e fossas de drenagem quando há:
                </p>
                <ul className="space-y-1 text-slate-400 text-[11px]">
                  <li>• Tumores volumosos maiores que 5 cm (T3 ou T4).</li>
                  <li>• Comprometimento de $\ge 4$ linfonodos axilares (N2 ou N3).</li>
                  <li>• Margens cirúrgicas profundas ou superficiais exíguas ou comprometidas.</li>
                  <li>• Câncer de mama inflamatório (T4d).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TRATAMENTO SISTÊMICO POR SUBTIPO */}
      {activeTab === 'sistemico' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Pill className="text-cyan-400" size={20} />
              A Terapia Sistêmica Guiada pela Biologia Tumoral
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Diferente da cirurgia e radioterapia (que tratam o local), a terapia sistêmica viaja pela corrente sanguínea para esterilizar micrometástases ocultas.
            </p>

            <div className="space-y-4 text-xs">
              {/* LUMINAIS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-sm">Tumores Luminais (RE+ / RP+)</span>
                  <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    Terapia Endócrina 5 a 10 Anos
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong>Mulheres na pré-menopausa:</strong> Tamoxifeno (modulador seletivo do receptor de estrogênio - SERM) $\pm$ supressão ovariana com análogos de GnRH (gosserrelina) se alto risco.</li>
                  <li>• <strong>Mulheres na pós-menopausa:</strong> Inibidores da Aromatase (anastrozol, letrozol, exemestano) são mais eficazes que o tamoxifeno. Exigem monitorização da densidade mineral óssea.</li>
                  <li>• <strong>Pacientes com alto risco de recidiva (axila positiva volumosa):</strong> Adição de inibidores de CDK4/6 (Abemaciclibe) por 2 anos associado à hormonioterapia.</li>
                </ul>
              </div>

              {/* HER2-POSITIVOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400 text-sm">Tumores HER2-Positivos (HER2 3+ ou FISH amplificado)</span>
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800">
                    Terapia-Alvo Anti-HER2
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong>Bloqueio anti-HER2:</strong> Trastuzumabe ± Pertuzumabe (duplo bloqueio) combinado com quimioterapia contendo taxano.</li>
                  <li>• <strong>Cenário Neoadjuvante (pré-operatório):</strong> Preferencial para tumores ≥ 2 cm ou axila positiva.</li>
                  <li>• <strong>Resposta Patológica Completa (pCR / ypT0 ypN0):</strong> Manter Trastuzumabe até completar 1 ano.</li>
                  <li>• <strong>Doença Residual na Peça (não-pCR):</strong> Troca para o conjugado anticorpo-droga <strong>Trastuzumabe Entansina (T-DM1)</strong> reduz risco de recidiva em 50% (Estudo KATHERINE).</li>
                </ul>
              </div>

              {/* TRIPLO-NEGATIVOS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 text-sm">Tumores Triplo-Negativos (RE-, RP-, HER2-)</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Quimioterapia ± Imunoterapia
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• Não se beneficiam de hormonioterapia ou bloqueio anti-HER2.</li>
                  <li>• <strong>Tratamento pré-operatório (neoadjuvante):</strong> Esquema robusto com antraciclina + ciclofosfamida (AC) seguido de taxano + carboplatina ± Pembrolizumabe (imunoterapia).</li>
                  <li>• <strong>Doença residual pós-quimioterapia (não-pCR):</strong> Benefício comprovado com <strong>Capecitabina oral adjuvante</strong> por 6-8 ciclos (Estudo CREATE-X) ou <strong>Olaparibe</strong> em mutação germinativa BRCA.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SEGUIMENTO RACIONAL */}
      {activeTab === 'seguimento' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Calendar className="text-emerald-400" size={20} />
              Seguimento Racional Pós-Tratamento: Menos é Mais
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O acompanhamento de quem encerrou o tratamento primário com intenção curativa tem como meta identificar recidiva locorregional precoce e segundo tumor primário.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
                <span className="font-bold text-emerald-400 text-sm">O Que Realmente Deve Ser Feito</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Anamnese e Exame Clínico Detalhado:</strong> A cada 3 a 6 meses nos primeiros 3 anos; a cada 6 a 12 meses nos anos 4 e 5; e anual a partir de então.</li>
                  <li>• <strong>Mamografia Anual Bilateral</strong> (ou unilateral se mastectomia total prévia).</li>
                  <li>• Ressonância Magnética mamária anual apenas para pacientes de alto risco genético comprovado (BRCA).</li>
                  <li>• Estímulo a hábitos de vida saudáveis, controle de peso e adesão rigorosa à terapia endócrina prescrita.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
                <span className="font-bold text-rose-400 text-sm">O Que NÃO Deve Ser Feito em Assintomáticas</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>NÃO solicitar rotineiramente:</strong> Marcadores tumorais séricos (CA 15-3, CEA).</li>
                  <li>• <strong>NÃO solicitar de rotina:</strong> Tomografias computadorizadas periódicas, cintilografias ósseas ou ultrassom de abdome.</li>
                  <li>• <strong>Por que?</strong> Ensaios clínicos demonstraram que exames de imagem e sangue de rotina em pacientes sem sintomas <strong>NÃO aumentam a sobrevida global</strong> e aumentam falso-positivos, biópsias desnecessárias, ansiedade crônica e exposição à radiação.</li>
                  <li>• Exames complementares devem ser solicitados <strong>imediatamente quando surgirem sintomas</strong> específicos (ex: dor óssea persistente, tosse nova, cefaleia refratária).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
