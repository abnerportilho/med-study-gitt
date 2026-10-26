import React, { useState } from 'react';
import { 
  Dna, Activity, ShieldAlert, HeartPulse, Sparkles, 
  CheckCircle2, AlertTriangle, ArrowRight, UserCheck, Flame, Info, BookOpen
} from 'lucide-react';

export default function MalignasCarcinogeneseRisco() {
  const [activeSubTab, setActiveSubTab] = useState<'carcinogenese' | 'fatores' | 'hereditario' | 'modelos' | 'prevencao'>('carcinogenese');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 1 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Dna size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 1 · Da Célula ao Risco Clínico
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Como o Câncer se Desenvolve & Estratificação de Risco
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A carcinogênese mamária é um processo progressivo em múltiplas etapas que se inicia na unidade ductolobular terminal. Compreender a biologia celular, o papel divisor da membrana basal, os fatores modificáveis e os critérios de alto risco genético é a chave para o rastreamento individualizado.
        </p>

        {/* SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'carcinogenese', label: '1. Sistema Ductolobular & Carcinogênese' },
            { id: 'fatores', label: '2. Fatores Modificáveis vs Não Modificáveis' },
            { id: 'hereditario', label: '3. Predisposição Hereditária (BRCA)' },
            { id: 'modelos', label: '4. Modelos Matemáticos (Gail vs Tyrer-Cuzick)' },
            { id: 'prevencao', label: '5. Prevenção Reduz Risco — Não Cria Culpa' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. CARCINOGÊNESE & SISTEMA DUCTOLOBULAR */}
      {activeSubTab === 'carcinogenese' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="text-rose-400" size={20} />
              A Mama como Sistema Ductolobular & A Origem das Lesões
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Anatomicamente e histologicamente, o parênquima mamário é estruturado como uma árvore arborizada de ductos e lóbulos imersos em estroma fibroconectivo e tecido adiposo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-300 text-sm">Unidade Ductolobular Terminal (UDLT)</span>
                <p className="text-slate-400 leading-relaxed">
                  É a sede anatômica fundamental onde <strong>a grande maioria das lesões epiteliais nasce</strong>, desde hiperplasias atípicas e carcinomas <em>in situ</em> até carcinomas invasivos.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-300 text-sm">Componentes Envolvidos</span>
                <p className="text-slate-400 leading-relaxed">
                  Ductos coletores, alvéolos glandulares, estroma circundante e a rica rede de vasos capilares e linfáticos interlobulares participam ativamente da apresentação clínica e da disseminação.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 text-sm">Impacto Topográfico</span>
                <p className="text-slate-400 leading-relaxed">
                  A localização tumoral (ex: retroareolar vs quadrante superolateral) influencia diretamente o exame físico, a facilidade de detecção mamográfica, o padrão de drenagem axilar e o planejamento cirúrgico.
                </p>
              </div>
            </div>
          </div>

          {/* O FLUXO DA CARCINOGÊNESE */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-rose-900/60 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-base flex items-center gap-2">
                <Activity size={20} className="text-rose-400" />
                Da Alteração Celular à Doença Invasiva e Metástase
              </span>
              <span className="text-[11px] font-mono text-rose-300 bg-rose-950 px-2.5 py-1 rounded-xl border border-rose-800 font-bold">
                Cinco Etapas Sucessivas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono font-bold text-slate-400">ETAPA 01</div>
                <strong className="text-white block text-sm">Alteração Celular</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Mutações genéticas e eventos epigenéticos afetam proto-oncogenes e genes supressores de tumor.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono font-bold text-slate-400">ETAPA 02</div>
                <strong className="text-white block text-sm">Expansão Clonal</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Multiplicação celular desordenada com seleção de subclones celulares mais adaptados à proliferação.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-800/80 space-y-2">
                <div className="text-[10px] font-mono font-bold text-amber-400">ETAPA 03</div>
                <strong className="text-amber-300 block text-sm">Carcinoma In Situ</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Células malignas preenchem o lúmen, mas a <strong>membrana basal está 100% íntegra</strong>. Sem risco de metástase direta.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-800 space-y-2">
                <div className="text-[10px] font-mono font-bold text-rose-400">ETAPA 04</div>
                <strong className="text-rose-300 block text-sm">Invasão Estromal</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Ruptura da membrana basal, degradação da matriz extracelular e infiltração no estroma adjacente.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-700 space-y-2">
                <div className="text-[10px] font-mono font-bold text-rose-300">ETAPA 05</div>
                <strong className="text-rose-200 block text-sm">Disseminação</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Angiogênese, invasão linfovascular, evasão do sistema imune e colonização de órgãos a distância (metástase).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FATORES DE RISCO */}
      {activeSubTab === 'fatores' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400" size={20} />
              Risco Não é Destino: Estratificação Populacional
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O câncer de mama é a <strong>1ª causa de morte por câncer em mulheres no Brasil</strong>, com uma estimativa de <strong>66,54 casos novos por 100 mil mulheres</strong> (INCA). Embora cerca de 1% dos casos ocorra em homens, o rastreamento e o reconhecimento precoce são pilares essenciais da saúde da mulher.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* NÃO MODIFICÁVEIS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Dna size={18} />
                  <span>Fatores Não Modificáveis</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Idade Avançada:</strong> É o principal fator de risco populacional. A incidência começa a aumentar acentuadamente após os <strong>40 anos</strong>; a média nacional ao diagnóstico é de <strong>54 anos</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>História Familiar:</strong> Parentes de 1º grau acometidas antes dos 50 anos ou bilateralidade.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Mutações Germinativas:</strong> Genes de alta penetrância (BRCA1, BRCA2, TP53, PTEN, PALB2).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Alta Densidade Mamária:</strong> Tecido fibroglandular predominante reduz a sensibilidade mamográfica e aumenta o risco intrínseco.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Exposição Hormonal Prolongada:</strong> Menarca precoce (&lt; 12 anos) e menopausa tardia (&gt; 55 anos), nuliparidade e primeira gestação a termo tardia (&gt; 30 anos).</span>
                  </li>
                </ul>
              </div>

              {/* POTENCIALMENTE MODIFICÁVEIS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Activity size={18} />
                  <span>Fatores Potencialmente Modificáveis</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Consumo de Bebidas Alcoólicas:</strong> Existe relação linear comprovada mesmo em doses leves a moderadas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Obesidade e Sobrepeso Pós-Menopausa:</strong> No climatério, a principal fonte estrogênica é a aromatização periférica no tecido adiposo subcutâneo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Sedentarismo / Inatividade Física:</strong> A prática regular de exercícios aeróbicos e resistidos reduz o risco relativo em 10-25%.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Terapia Hormonal Combinada (Estrogênio + Progesterona):</strong> Uso prolongado (&gt; 5 anos) associa-se a discreto aumento de risco; deve ser individualizada com menor dose e tempo possível.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Alimentação Ultraprocessada & Síndrome Metabólica:</strong> Hiperinsulinemia e inflamação crônica estimulam proliferação celular.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PREDISPOSIÇÃO HEREDITÁRIA */}
      {activeSubTab === 'hereditario' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Dna className="text-purple-400" size={20} />
              Quando Suspeitar de Síndrome de Predisposição Hereditária
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Apenas cerca de <strong>5% a 10% de todos os cânceres de mama</strong> decorrem de mutações germinativas herdadas. Reconhecer os critérios clínicos que justificam o teste genético permite estratégias redutoras de risco (salpingo-ooforectomia, mastectomia profilática, RM mamária anual).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Sinal Clínico ou Familiar</th>
                    <th className="p-3">Por Que Chama a Atenção? (Lógica Genética)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-rose-300">Diagnóstico em Idade Jovem (&lt; 45–50 anos)</td>
                    <td className="p-3 text-slate-300">Maior probabilidade de alteração genética constitucional congênita subjacente.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-purple-300">Câncer Triplo-Negativo em Idade Jovem (&lt; 60 anos)</td>
                    <td className="p-3 text-slate-300">Forte associação com variantes patogênicas germinativas no gene <strong>BRCA1</strong>.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Câncer de Mama Masculino</td>
                    <td className="p-3 text-slate-300">Evento raro que exige rastreio de mutações em quase 100% dos casos, especialmente no gene <strong>BRCA2</strong>.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">Associação Mama + Ovário, Pâncreas ou Próstata Agressiva</td>
                    <td className="p-3 text-slate-300">Espectro fenotípico compartilhado da Síndrome de Câncer de Mama e Ovário Hereditário (HBOC / BRCA).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-300">Múltiplos Casos na Mesma Linhagem ou Bilateralidade</td>
                    <td className="p-3 text-slate-300">Carga familiar relevante em três gerações consecutivas (linhagens materna ou paterna!).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODELOS MATEMÁTICOS DE RISCO */}
      {activeSubTab === 'modelos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <BookOpen className="text-cyan-400" size={20} />
              Modelos de Risco Respondem a Perguntas Diferentes
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Na consulta de mastologia e ginecologia, a estimativa objetiva do risco orienta se a paciente precisa apenas de mamografia habitual ou de <strong>rastreamento diferenciado intensivo com Ressonância Magnética</strong> e quimioprevenção.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* MODELO DE GAIL */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-sm">Modelo de Gail (NCI)</span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800">
                    História Pessoal & 5 Anos
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Baseado na <strong>história pessoal reprodutiva</strong> (idade da menarca, idade ao primeiro parto a termo, número de biópsias mamárias prévias com ou sem atipias).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong>História familiar muito limitada:</strong> avalia apenas parentes de primeiro grau (mãe, irmãs, filhas).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong>Aplicação Clínica Principal:</strong> Apoia a indicação de <strong>quimioprevenção</strong> (tamoxifeno ou inibidores de aromatase) se risco em 5 anos $\ge 1,67\%$.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-rose-400">Limitação Crítica:</strong> NÃO é adequado para avaliar famílias com histórico complexo, casos paternos ou suspeita de mutação germinativa.</span>
                  </li>
                </ul>
              </div>

              {/* MODELO DE TYRER-CUZICK / BOADICEA */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 text-sm">Tyrer–Cuzick (IBIS) / BOADICEA</span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800">
                    Risco Vitalício & RM
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>Avalia <strong>história familiar detalhada em até três gerações</strong> (parentes de 1º e 2º graus, linhagens materna e paterna, idade ao diagnóstico, câncer de ovário).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>Incorpora <strong>densidade mamária</strong> (BI-RADS A-D), índice de massa corporal (IMC), idade da menopausa e biópsias com hiperplasia atípica ou CLIS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span><strong>Estimativa de Risco ao Longo da Vida:</strong> Define se a paciente ultrapassa o limiar de <strong>alto risco (&gt; 20% de risco cumulativo na vida)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span><strong>Aplicação Prática:</strong> Justifica o <strong>rastreamento diferenciado anual com Ressonância Magnética das mamas</strong> alternada com mamografia!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PREVENÇÃO REDUZ RISCO - NÃO CRIA CULPA */}
      {activeSubTab === 'prevencao' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base border-b border-slate-800 pb-3">
            <HeartPulse size={22} className="text-rose-400" />
            <span>Prevenção Reduz Risco — Não Cria Culpa</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs md:text-sm leading-relaxed space-y-3">
            <p className="italic font-serif text-slate-300 text-sm md:text-base border-l-2 border-rose-500 pl-4 py-1">
              "Hábitos saudáveis ajudam e devem ser incentivados, mas não explicam isoladamente por que uma pessoa desenvolveu câncer."
            </p>
            <p className="text-slate-300">
              A carcinogênese envolve fatores estocásticos (erros aleatórios de replicação celular ao longo do tempo), interações genéticas complexas e ambiente. Manter peso adequado, praticar atividade física regular, moderar ou cessar o consumo alcoólico e adotar alimentação saudável reduzem significativamente o risco relativo, mas o acolhimento médico livre de julgamento é a base da oncologia moderna.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
