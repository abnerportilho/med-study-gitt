import React from 'react';
import { 
  FileText, CheckCircle2, AlertTriangle, Zap, 
  ShieldAlert, Eye, HeartPulse, Stethoscope, Users, Scale
} from 'lucide-react';

export default function DMGClassificacao() {
  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO TEMA 5 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <FileText size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Eixo 5 · Estratificação e Classificação
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              5. Classificação de Priscilla White Modificada & Peculiaridades
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A classificação moderna do DMG em <strong>Classes A1 e A2</strong> é um instrumento dinâmico de avaliação da <strong>resposta ao tratamento</strong>, tendo impacto direto no calendário de vigilância fetal e na idade gestacional ideal para o parto.
        </p>
      </div>

      {/* 5.1 CLASSES A1 E A2 (WHITE MODIFICADA) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
          <Scale size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            5.1 Classes A1 e A2 de Priscilla White Modificada
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Classe A1 */}
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-emerald-800/80 space-y-4 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-700">
                  Não Medicamentoso
                </span>
                <span className="text-xs font-mono font-bold text-emerald-300">A1 (Dieta/MEV)</span>
              </div>
              <h5 className="text-base font-black text-white">DMG Classe A1</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Controle glicêmico alcançado <strong>exclusivamente com Terapia Nutricional e Atividade Física</strong>.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Glicemias capilares dentro das metas em mais de 70-80% das medidas.</li>
                <li>Menor risco de desfechos perinatais adversos severos.</li>
                <li>Vigilância fetal habitual sem necessidade de cardiotocografias semanais precoces se houver bom controle e crescimento simétrico.</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 font-bold">
              Momento do Parto: 39 semanas a 40 semanas + 6 dias (pode aguardar termo completo).
            </div>
          </div>

          {/* Classe A2 */}
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-amber-800/80 space-y-4 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-700">
                  Medicamentoso
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">A2 (Insulina/Farmaco)</span>
              </div>
              <h5 className="text-base font-black text-white">DMG Classe A2</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Necessidade de <strong>terapia medicamentosa (Insulinoterapia)</strong> para atingir ou manter as metas glicêmicas.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Mais de 20-30% dos valores capilares alterados após 1-2 semanas de MEV.</li>
                <li>Indica maior gravidade intrínseca da disfunção de células beta ou resistência placentária exacerbada.</li>
                <li>Exige vigilância fetal anteparto intensificada (CTG e PBF a partir de 32-34 semanas).</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 font-bold">
              Momento do Parto: 39 semanas a 39 semanas + 6 dias (não ultrapassar 40 semanas!).
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 italic">
          * A classificação não é estática: uma gestante classificada inicialmente como A1 pode evoluir para A2 conforme a idade gestacional avança e a resistência contrainsulínica placentária se intensifica no 3º trimestre.
        </p>
      </div>

      {/* NEVER MISS — A2 ANTECIPA PARTO */}
      <div className="p-6 md:p-8 rounded-3xl bg-amber-950/40 border-2 border-amber-500/80 space-y-3 shadow-xl">
        <div className="flex items-center gap-2.5 text-amber-400">
          <Zap size={22} className="fill-amber-400" />
          <h4 className="text-sm md:text-base font-black uppercase tracking-wider">
            ⚡ NEVER MISS — A Classe A2 Por Si Só Altera a Idade Gestacional do Parto
          </h4>
        </div>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
          A transição de A1 para A2 não é apenas uma mudança de prescrição de receita médica. <strong>A simples necessidade de insulina já reclassifica a gestante</strong> para um estrato de maior risco perinatal, impondo:
        </p>
        <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
          <li><strong>Antecipação do parto:</strong> resolução programada entre <strong>39 e 39+6 semanas</strong> (nunca ultrapassando 40 semanas, ao contrário da A1 que pode ir até 40+6).</li>
          <li><strong>Vigilância biofísica intensificada:</strong> cardiotocografia e perfil biofísico fetal semanais ou bi-semanais a partir de 32-34 semanas.</li>
        </ul>
      </div>

      {/* 5.2 CLASSIFICAÇÃO DE PRISCILLA WHITE COMPLETA (CLASSES B A T) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400 border-b border-slate-800 pb-3">
          <Scale size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            5.2 Classificação de Priscilla White no Diabetes Pré-Gestacional (Classes B a T)
          </h4>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          No diabetes pré-gestacional, o prognóstico materno-fetal e o risco de malformações e vasculopatia materna não dependem apenas de ser DM1 ou DM2, mas da <strong>idade de início, tempo de duração da doença e presença de lesão de órgãos-alvo (vasculopatia)</strong>, conforme estratificado por Priscilla White:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3">Classe</th>
                <th className="p-3">Critérios Clínicos / Tempo de Evolução</th>
                <th className="p-3">Vasculopatia / Lesão de Órgão-Alvo</th>
                <th className="p-3">Impacto Clínico & Risco Obstétrico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr>
                <td className="p-3 font-bold text-emerald-400 font-mono">Classe B</td>
                <td className="p-3">Início aos &ge; 20 anos de idade E duração &lt; 10 anos</td>
                <td className="p-3 text-slate-400">Ausência de vasculopatia</td>
                <td className="p-3">Menor risco de pré-eclâmpsia e restrição de crescimento entre as pré-gestacionais.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-cyan-400 font-mono">Classe C</td>
                <td className="p-3">Início entre 10 e 19 anos de idade OU duração de 10 a 19 anos</td>
                <td className="p-3 text-slate-400">Ausência de vasculopatia evidente</td>
                <td className="p-3">Risco intermediário; vigilância metabólica e fetal rigorosa.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-amber-400 font-mono">Classe D</td>
                <td className="p-3">Início antes dos 10 anos OU duração &ge; 20 anos OU Retinopatia benigna</td>
                <td className="p-3 text-amber-300">Retinopatia de fundo (não proliferativa) / calcificação vascular</td>
                <td className="p-3">Risco aumentado de insuficiência placentária, pré-eclâmpsia e RCF.</td>
              </tr>
              <tr className="bg-rose-950/20">
                <td className="p-3 font-bold text-rose-400 font-mono">Classe F</td>
                <td className="p-3">Nefropatia Diabética</td>
                <td className="p-3 text-rose-300">Proteinúria &ge; 500 mg/24h documentada no 1º trimestre</td>
                <td className="p-3">Alto risco de pré-eclâmpsia sobreposta (até 50%), prematuridade extrema e RCF.</td>
              </tr>
              <tr className="bg-rose-950/20">
                <td className="p-3 font-bold text-rose-400 font-mono">Classe R</td>
                <td className="p-3">Retinopatia Proliferativa</td>
                <td className="p-3 text-rose-300">Neovascularização retiniana ou hemorragia vítrea</td>
                <td className="p-3">Risco de perda visual aguda; indicação de fotocoagulação a laser urgente.</td>
              </tr>
              <tr className="bg-rose-950/30">
                <td className="p-3 font-bold text-rose-300 font-mono">Classe H</td>
                <td className="p-3">Cardiopatia Isquêmica</td>
                <td className="p-3 text-rose-200">Doença arterial coronariana / infarto prévio</td>
                <td className="p-3">Elevadíssima mortalidade materna; gestação contraindicada em casos graves não revascularizados.</td>
              </tr>
              <tr className="bg-purple-950/30">
                <td className="p-3 font-bold text-purple-300 font-mono">Classe T</td>
                <td className="p-3">Transplante Renal Prévio</td>
                <td className="p-3 text-purple-200">Enxerto renal funcionante sob imunossupressão</td>
                <td className="p-3">Manejo conjunto com nefrologia de transplantes; ajuste de imunossupressores teratogênicos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5.3 DIABETES PRÉVIO VS GESTACIONAL & AVALIAÇÃO DE ÓRGÃO-ALVO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 border-b border-slate-800 pb-3">
          <Eye size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            5.3 Peculiaridades da Avaliação Inicial de Órgãos-Alvo por Tipo de Diabetes
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-slate-950 rounded-2xl border border-slate-800">
            <thead className="bg-slate-900 text-slate-300 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="p-3.5">Parâmetro de Avaliação</th>
                <th className="p-3.5">Diabetes Mellitus Prévio (DM1 / DM2)</th>
                <th className="p-3.5">Diabetes Mellitus Gestacional (DMG)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              <tr>
                <td className="p-3.5 font-bold text-white">Tempo de Exposição à Hiperglicemia</td>
                <td className="p-3.5 text-rose-300">Crônico (anos/meses antes da concepção)</td>
                <td className="p-3.5 text-amber-300">Recente (semanas, restrito à gestação)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Fundo de Olho (Fundoscopia com Midríase)</td>
                <td className="p-3.5 text-rose-400 font-bold">OBRIGATÓRIO no 1º trimestre (risco de progressão rápida de retinopatia proliferativa)</td>
                <td className="p-3.5 text-slate-400">NÃO indicado rotineiramente sem queixas ou comorbidades prévias</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Função Renal e Proteinúria (Urina 24h / RPCI)</td>
                <td className="p-3.5 text-rose-400 font-bold">OBRIGATÓRIO na 1ª consulta (rastreio basal de nefropatia e PE sobreposta)</td>
                <td className="p-3.5 text-slate-400">Rastreio habitual do pré-natal (EAS/Urocultura; proteinúria se surgirem picos de PA)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Ecocardiograma Fetal Especializado</td>
                <td className="p-3.5 text-rose-400 font-bold">OBRIGATÓRIO com 24-28 sem (risco de cardiopatia congênita por embriopatia)</td>
                <td className="p-3.5 text-slate-400">US morfológico de 2º trimestre padrão suficiente (a não ser que haja hipertrofia septal tardia)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTEXTO BRASIL — CONDUTA DO OBSTETRA */}
      <div className="p-6 md:p-8 rounded-3xl bg-emerald-950/40 border-2 border-emerald-600/80 space-y-3 shadow-xl">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <Users size={22} />
          <h4 className="text-sm md:text-base font-black uppercase tracking-wider">
            🇧🇷 CONTEXTO BRASIL — Autonomia do Obstetra no Manejo da Insulina
          </h4>
        </div>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
          Embora o ideal seja o cuidado multiprofissional com endocrinologista e nutricionista, na realidade do SUS e de muitos municípios brasileiros o obstetra ou médico da atenção primária <strong>precisa ter autonomia e segurança técnica para orientar o plano alimentar, prescrever e titular a insulina</strong>. 
        </p>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
          O atraso no início da insulinoterapia enquanto se aguarda consulta especializada externa aumenta diretamente o risco de macrossomia e sofrimento fetal agudo.
        </p>
      </div>
    </div>
  );
}
