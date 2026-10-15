import React, { useState } from 'react';
import { 
  Eye, Stethoscope, Layers, ShieldCheck, AlertTriangle, 
  CheckCircle2, ArrowRight, Sparkles, Scale, BookOpen, 
  HelpCircle, Target, ShieldAlert
} from 'lucide-react';

export default function MalignasPropedêuticaImagemBIRADS() {
  const [activeSection, setActiveSection] = useState<'rastreamento' | 'metodos' | 'birads' | 'biopsias' | 'concordancia'>('rastreamento');

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
              Eixo 3 · Propedêutica Armada
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Como Investigar: Rastreamento, Imagem & O Sistema BI-RADS
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          Rastreamento e investigação diagnóstica são processos distintos com metas diferentes. A escolha do método de imagem (MMG, US, Tomossíntese, RM) responde a dúvidas clínicas específicas, traduzidas pelo sistema BI-RADS na indicação do tipo correto de biópsia e na mandatória regra da concordância tripla.
        </p>

        {/* SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'rastreamento', label: '1. Rastreamento vs Diagnóstico no Brasil' },
            { id: 'metodos', label: '2. Arsenal de Imagem & Mamas Densas' },
            { id: 'birads', label: '3. BI-RADS: Imagem Traduzida em Conduta' },
            { id: 'biopsias', label: '4. Qual Biópsia Para Qual Achado?' },
            { id: 'concordancia', label: '5. A Regra da Concordância Tripla' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. RASTREAMENTO VS INVESTIGAÇÃO DIAGNÓSTICA */}
      {activeSection === 'rastreamento' && (
        <div className="space-y-6">
          {/* CONCEITO CHAVE */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Scale className="text-cyan-400" size={20} />
              Rastreamento e Investigação Diagnóstica São Processos Diferentes
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/80 space-y-2">
                <span className="font-bold text-cyan-300 text-sm block">Rastreamento (Screening)</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• População-alvo: <strong>Mulheres estritamente assintomáticas</strong>.</li>
                  <li>• Estratégia de saúde pública e prevenção secundária populacional.</li>
                  <li>• <strong>Mamografia bilateral como exame-base</strong> universal.</li>
                  <li>• Objetivo: Detectar lesões subclínicas impalpáveis (&lt; 1 cm) para reduzir mortalidade.</li>
                  <li>• Benefícios e danos devem ser ponderados na decisão informada.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/80 space-y-2">
                <span className="font-bold text-amber-300 text-sm block">Investigação Diagnóstica</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• População-alvo: Paciente com <strong>sinal, sintoma ou achado de imagem anormal</strong>.</li>
                  <li>• Abordagem dirigida à apresentação clínica específica.</li>
                  <li>• <strong>Pode e deve ocorrer em qualquer idade</strong> (sem limite de 40 ou 50 anos).</li>
                  <li>• Exames complementares direcionados (ex: US para nódulo em jovem; compressão localizada).</li>
                  <li>• Objetivo: Esclarecer a lesão, classificar o BI-RADS e confirmar ou excluir câncer.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AS DIRETRIZES NO BRASIL */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <BookOpen className="text-rose-400" size={18} />
              No Brasil, Recomendações Convivem (O Cenário das Sociedades Especializadas vs Ministério da Saúde)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Entidade Reguladora</th>
                    <th className="p-3">População de Risco Habitual</th>
                    <th className="p-3">Racional Clínico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-rose-300">FEBRASGO / SBM / CBR</td>
                    <td className="p-3 font-semibold text-white">Mamografia Anual dos 40 aos 74 anos</td>
                    <td className="p-3 text-slate-400">Detecta tumores menores, preserva axila e proporciona maior ganho em anos de vida salvos.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">SBOC 2026</td>
                    <td className="p-3 font-semibold text-white">Mamografia Anual dos 40 aos 74 anos</td>
                    <td className="p-3 text-slate-400">Alinhada com a média de idade jovem de diagnóstico no Brasil (54 anos).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Ministério da Saúde (SUS / INCA)</td>
                    <td className="p-3 font-semibold text-white">Mamografia Bienal dos 50 aos 69 anos</td>
                    <td className="p-3 text-slate-400">Diretriz de política pública baseada na relação de custo-efetividade e minimização de sobrediagnóstico.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-purple-300">Mulheres com $\ge$ 75 anos</td>
                    <td className="p-3 font-semibold text-white">Decisão Individualizada</td>
                    <td className="p-3 text-slate-400">Considerar expectativa de vida (&gt; 10 anos), comorbidades clínicas e autonomia da paciente.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BALANÇO DE BENEFÍCIOS E DANOS */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={18} />
              Decisão Informada: Rastrear Traz Benefício — E Também Efeitos Adversos
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
                <span className="font-bold text-emerald-400 text-sm">Benefícios Comprovados</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Menor mortalidade por câncer de mama (redução de 20% a 35%).</li>
                  <li>• Tumores menores ao diagnóstico inicial.</li>
                  <li>• Menor comprometimento linfonodal metastático na axila.</li>
                  <li>• Tratamentos cirúrgicos e sistêmicos potencialmente menos mutilantes e agressivos.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
                <span className="font-bold text-rose-400 text-sm">Possíveis Danos & Sobrediagnóstico</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Resultados falso-positivos gerando ansiedade e sofrimento emocional.</li>
                  <li>• Biópsias percutâneas ou cirúrgicas para achados benignos.</li>
                  <li>• <strong>Sobrediagnóstico (*overdiagnosis*):</strong> diagnóstico de tumores que nunca se manifestariam clinicamente.</li>
                  <li>• Exposição à baixa radiação ionizante repetida.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ARSENAL DE IMAGEM & MAMAS DENSAS */}
      {activeSection === 'metodos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Layers className="text-cyan-400" size={20} />
              Cada Método Responde a Uma Pergunta
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-300 text-sm">Mamografia (MMG)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Base universal do rastreamento.</strong> Único método validado em ensaios clínicos para reduzir mortalidade. Padrão-ouro para identificação de microcalcificações pleomórficas e distorções arquiteturais.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-300 text-sm">Ultrassonografia (US)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Caracteriza achados e guia procedimentos.</strong> Excelente para diferenciar nódulos sólidos de cistos e avaliar mulheres jovens (&lt; 35 anos), gestantes e axila.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 text-sm">Tomossíntese Mamária</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Mamografia 3D em múltiplos cortes.</strong> Reduz a sobreposição do parênquima mamário em mamas densas, aumentando a taxa de detecção e diminuindo reconvocações falso-positivas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-300 text-sm">Ressonância Magnética</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Situações selecionadas e alto risco genético.</strong> Rastreamento anual de mutações BRCA, carcinoma lobular, primário oculto, avaliação de resposta à neoadjuvância e rotura de próteses.
                </p>
              </div>
            </div>
          </div>

          {/* O DESAFIO DAS MAMAS DENSAS */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-amber-900/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-amber-300 text-base flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-400" />
                Mamas Densas Reduzem a Sensibilidade Mamográfica
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-3 py-1 rounded-xl border border-amber-800">
                Redução de 30% a 48%
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Mamas predominantemente densas (compostas por tecido fibroglandular denso ou extremamente densas - BI-RADS C e D) impõem dois desafios clínicos simultâneos:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-amber-300 text-sm block">1. Efeito de Mascaramento</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Tanto o parênquima glandular denso quanto o tumor sólido aparecem brancos (radiopacos) no exame radiológico, podendo esconder pequenas lesões malignas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-rose-300 text-sm block">2. Fator de Risco Independente</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Mulheres com mamas extremamente densas apresentam um risco biológico intrínseco de 4 a 6 vezes maior de desenvolver câncer de mama em relação àquelas com mamas predominantemente adiposas.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/60 text-xs text-slate-200">
              <strong className="text-amber-300 block mb-1">Atenção ao Conceito Prático:</strong>
              O método complementar depende do risco individual e do achado radiológico. O <strong>ultrassom isolado NÃO substitui a mamografia</strong> no rastreamento de risco habitual, pois ele é incapaz de detectar microcalcificações suspeitas isoladas!
            </div>
          </div>
        </div>
      )}

      {/* 3. BI-RADS */}
      {activeSection === 'birads' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Target className="text-cyan-400" size={20} />
              BI-RADS Traduz Imagem em Conduta Clínica
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O sistema BI-RADS (*Breast Imaging Reporting and Data System*) padroniza a linguagem radiológica e converte a probabilidade de malignidade em um <strong>próximo passo clínico mandatário</strong>.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Significado Clínico</th>
                    <th className="p-3">Risco de Câncer</th>
                    <th className="p-3">Próximo Passo / Conduta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3 font-black text-amber-300 font-mono text-sm">BI-RADS 0</td>
                    <td className="p-3">Exame Inconclusivo / Incompleto</td>
                    <td className="p-3 text-slate-400 font-mono">Indeterminado</td>
                    <td className="p-3 text-amber-300 font-semibold">Avaliação por imagem adicional (magnificação, compressão, US ou comparação com anteriores)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-emerald-400 font-mono text-sm">BI-RADS 1</td>
                    <td className="p-3">Negativo / Mama Normal</td>
                    <td className="p-3 text-slate-400 font-mono">~0%</td>
                    <td className="p-3 text-emerald-300 font-semibold">Manter rotina de rastreamento habitual</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-emerald-400 font-mono text-sm">BI-RADS 2</td>
                    <td className="p-3">Achados Tipicamente Benignos (ex: cisto simples, fibroadenoma calcificado)</td>
                    <td className="p-3 text-slate-400 font-mono">~0%</td>
                    <td className="p-3 text-emerald-300 font-semibold">Manter rotina de rastreamento habitual</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-blue-400 font-mono text-sm">BI-RADS 3</td>
                    <td className="p-3">Provavelmente Benigno (ex: nódulo oval circunscrito, cisto complicado isolado)</td>
                    <td className="p-3 text-slate-400 font-mono">&le; 2%</td>
                    <td className="p-3 text-blue-300 font-semibold">Seguimento em curto prazo (controle em 6 meses para avaliar estabilidade)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-rose-400 font-mono text-sm">BI-RADS 4A-4C</td>
                    <td className="p-3">Suspeita de Malignidade (4A: baixa 2-10%; 4B: moderada 10-50%; 4C: alta 50-95%)</td>
                    <td className="p-3 text-slate-400 font-mono">2% a 95%</td>
                    <td className="p-3 text-rose-400 font-bold">BIÓPSIA tecidual mandatória</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-red-500 font-mono text-sm">BI-RADS 5</td>
                    <td className="p-3">Altamente Sugestivo de Câncer (ex: nódulo espiculado denso, microcalcificações lineares ramificadas)</td>
                    <td className="p-3 text-slate-400 font-mono">&gt; 95%</td>
                    <td className="p-3 text-red-400 font-bold">BIÓPSIA diagnóstica e planejamento terapêutico oncológico</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-purple-400 font-mono text-sm">BI-RADS 6</td>
                    <td className="p-3">Malignidade Já Comprovada por Biópsia Anterior</td>
                    <td className="p-3 text-slate-400 font-mono">100%</td>
                    <td className="p-3 text-purple-300 font-semibold">Planejamento cirúrgico definitivo e avaliação de extensão</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. QUAL BIÓPSIA PARA QUAL ACHADO */}
      {activeSection === 'biopsias' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Stethoscope className="text-cyan-400" size={20} />
              Qual Biópsia Para Qual Achado?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O método de amostragem histopatológica depende da visibilidade da lesão em cada modalidade de imagem e do tipo de achado arquitetural.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3.5">Achado de Imagem / Clínico</th>
                    <th className="p-3.5">Método Preferencial de Biópsia</th>
                    <th className="p-3.5">Observações Clínicas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3.5 font-bold text-white">Nódulo sólido visível ao Ultrassom</td>
                    <td className="p-3.5 font-bold text-cyan-300">Core Biopsy guiada por US (PAG)</td>
                    <td className="p-3.5 text-slate-400">Rápida, sem radiação, visualização contínua da agulha no centro do nódulo.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Microcalcificações suspeitas (invisíveis ao US)</td>
                    <td className="p-3.5 font-bold text-amber-300">Biópsia a Vácuo Estereotáxica (Mamotomia)</td>
                    <td className="p-3.5 text-slate-400">Obtém fragmentos volumosos, aspira sangramento e coloca clipe metálico no leito.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Lesão visível APENAS na Ressonância Magnética</td>
                    <td className="p-3.5 font-bold text-purple-300">Biópsia percutânea guiada por RM</td>
                    <td className="p-3.5 text-slate-400">Exige contraste venoso paramagnético e materiais não ferromagnéticos dedicados.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Linfonodo axilar clinicamente ou radiologicamente suspeito</td>
                    <td className="p-3.5 font-bold text-emerald-300">PAAF (Citologia) ou Core Biopsy guiada por US</td>
                    <td className="p-3.5 text-slate-400">PAAF confirma metástase com alta especificidade; core permite imunohistoquímica.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Lesão B3 / Alto Risco (HDA, AEP, CLIS, papiloma com atipia)</td>
                    <td className="p-3.5 font-bold text-rose-300">Ampliação amostral com mamotomia ou Excisão cirúrgica</td>
                    <td className="p-3.5 text-slate-400">Evita a subestimação de carcinoma in situ ou invasivo adjacente não colhido.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. A REGRA DA CONCORDÂNCIA TRIPLA */}
      {activeSection === 'concordancia' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-600 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <ShieldAlert size={22} className="text-rose-400 shrink-0" />
                <span>A Regra de Ouro: Um Laudo Benigno Não Encerra um Caso Discordante</span>
              </div>
              <span className="text-[11px] font-mono bg-rose-950 text-rose-300 px-2.5 py-1 rounded-xl border border-rose-800 font-bold">
                Concordância Tripla
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              O fluxo correto do diagnóstico mamário é: <strong>Achado Clínico &rarr; Imagem Dirigida &rarr; Classificação BI-RADS &rarr; Biópsia &rarr; CONCORDÂNCIA TRIPLA</strong>.
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-rose-800/80 space-y-3">
              <div className="text-sm md:text-base font-black text-white italic font-serif border-l-4 border-rose-500 pl-4 py-1">
                "O anatomopatológico precisa explicar o achado clínico e radiológico. Discordância exige revisão, nova amostragem ou excisão — não tranquilização por impressão."
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-rose-300 block">Cenário de Discordância Clássico:</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Nódulo espiculado hiperdenso palpável com retração cutânea classificado como <strong>BI-RADS 5</strong>. A core biopsy retorna com laudo: <em>"Tecido fibroglandular normal"</em> ou <em>"Alterações fibrocísticas sem atipias"</em>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-emerald-300 block">Conduta Médica Correta:</strong>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>JAMAIS liberar a paciente ou confiar no laudo benigno!</strong> A agulha certamente amostrou a periferia e errou o alvo. Realizar reunião multidisciplinar, revisão de lâmina e prosseguir para nova biópsia guiada ou <strong>biópsia cirúrgica excisional com marcação pré-operatória por agulhamento</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
