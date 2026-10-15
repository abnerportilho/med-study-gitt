import React, { useState } from 'react';
import { 
  Eye, CheckCircle2, AlertCircle, Sparkles, 
  HelpCircle, ShieldCheck, Activity, ArrowRight, Zap, RefreshCw, FileText
} from 'lucide-react';

export default function EndoDiagnosticoImagem() {
  const [selectedMethod, setSelectedMethod] = useState<'usg' | 'rnm' | 'laparo'>('usg');

  return (
    <div className="space-y-8">
      {/* HEADER DO EIXO 4 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Eye size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Eixo 4 · Investigação Diagnóstica & Métodos de Imagem
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              4. A Laparoscopia Deixou de Ser Obrigatória para Todas
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          Houve uma <strong>mudança histórica de paradigma (Diretrizes ESHRE / FEBRASGO / ACOG)</strong>: o diagnóstico de endometriose é hoje <em>clínico e subsidiado por métodos de imagem especializados</em> de alta acurácia (Ultrassom com preparo intestinal e Ressonância Magnética). A laparoscopia não é mais o primeiro passo investigativo.
        </p>
      </div>

      {/* NOVO FLUXOGRAMA DE DECISÃO DIAGNÓSTICA (4 PASSOS) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Fluxo Moderno de Raciocínio Diagnóstico (4 Etapas Sequenciais)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800">
            Passo a Passo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* PASSO 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                1. Suspeita Clínica
              </span>
              <strong className="text-white block text-sm">Anamnese + Exame Físico</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                História de dor cíclica incapacitante (6 D's), absenteísmo, palpação de nódulos em ligamentos ou dor ao toque bimanual.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              Início imediato do raciocínio
            </div>
          </div>

          {/* PASSO 2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                2. Imagem Direcionada
              </span>
              <strong className="text-white block text-sm">USG com Preparo Intestinal</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ultrassonografia transvaginal especializada por examinador treinado (avaliando mobilidade uterina, <em>sliding sign</em> e nódulos).
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              Método de escolha de 1ª linha
            </div>
          </div>

          {/* PASSO 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                3. Conduta Terapêutica / RM
              </span>
              <strong className="text-white block text-sm">Tratamento Empírico ou RM</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Se sem desejo gestacional: iniciar bloqueio hormonal empírico. Se dúvida de invasão profunda ou indicação cirúrgica: solicitar RM de pelve.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              Bloqueio hormonal guiado
            </div>
          </div>

          {/* PASSO 4 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                4. Reavaliação / Laparoscopia
              </span>
              <strong className="text-white block text-sm">Laparoscopia Seletiva</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                A laparoscopia fica reservada para: falha do tratamento clínico empírico com imagem negativa, suspeita de lesões peritoneais superficiais refratárias ou indicação cirúrgica.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              Cirurgia sob indicação precisa
            </div>
          </div>
        </div>
      </div>

      {/* MÉTODOS DE IMAGEM: USG ESPECIALIZADA VS RNM VS LAPAROSCOPIA */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Eye size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Comparativo dos Métodos Diagnósticos Especializados
            </h4>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMethod('usg')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedMethod === 'usg' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              USG com Preparo
            </button>
            <button
              onClick={() => setSelectedMethod('rnm')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedMethod === 'rnm' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ressonância (RM)
            </button>
            <button
              onClick={() => setSelectedMethod('laparo')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedMethod === 'laparo' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Laparoscopia
            </button>
          </div>
        </div>

        {/* DETALHE DO MÉTODO ESCOLHIDO */}
        {selectedMethod === 'usg' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h5 className="text-base font-black text-white">Ultrassonografia Transvaginal com Preparo Intestinal</h5>
                <span className="text-xs text-cyan-400 font-mono">Método de Escolha de 1ª Linha (Sensibilidade e Especificidade &gt; 90% para doença profunda)</span>
              </div>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800">
                Dinâmico & Acessível
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <strong className="text-slate-200 block font-bold">Protocolo & Avaliação Passo a Passo:</strong>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong>Preparo intestinal prévio:</strong> Uso de laxativo suave para esvaziamento do reto e sigmoide, permitindo identificar nódulos da muscular própria.</li>
                  <li>• <strong>Endometriomas ovarianos:</strong> Cistos uniloculares ou multiloculares com ecos homogêneos em "vidro fosco", sem fluxo vascular interno ao Doppler.</li>
                  <li>• <strong>Sinal do Deslizamento (<em>Sliding Sign</em>):</strong> O examinador pressiona suavemente a parede vaginal anterior e o fundo de saco com o transdutor enquanto a outra mão mobiliza o fundo uterino pelo abdome. Se o reto deslizar livremente contra o colo e o útero $\to$ <em>Sliding positivo (fundo de saco pérvio)</em>. Se o reto mover-se em bloco aderido $\to$ <em>Sliding negativo (obliteração do fundo de saco de Douglas)</em>.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-200 block font-bold">Mapeamento de Compartimentos:</strong>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong>Compartimento Posterior:</strong> Ligamentos uterossacros espessados (hipoecoicos), toro uterino e septo retovaginal.</li>
                  <li>• <strong>Retossigmoide:</strong> Lesão em "cometa" ou nódulo hipoecoico infiltrando a camada muscular com retração luminal.</li>
                  <li>• <strong>Compartimento Anterior:</strong> Espessamento e nódulos no recesso vesicouterino e parede da bexiga.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'rnm' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h5 className="text-base font-black text-white">Ressonância Magnética (RM) de Pelve com Protocolo para Endometriose</h5>
                <span className="text-xs text-purple-400 font-mono">Mapeamento Pré-Operatório Global e Sítios Complexos</span>
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
                Visão Panorâmica
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <strong className="text-slate-200 block font-bold">Indicações Precisas da RM:</strong>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• Quando o Ultrassom transvaginal for <strong>inconclusivo ou duvidoso</strong>.</li>
                  <li>• Planejamento cirúrgico de doença profunda extensa para equipe multidisciplinar.</li>
                  <li>• Suspeita de acometimento <strong>ureteral</strong> (hidronefrose/estenose) ou <strong>intestinal alto</strong> (íleo terminal, apêndice cecal).</li>
                  <li>• Suspeita de infiltração de <strong>plexos nervosos</strong> (nervo ciático, raízes sacrais S1-S4) e diafragma.</li>
                  <li>• Caracterização e diagnóstico diferencial de massas anexiais volumosas ou complexas.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-200 block font-bold">Achados Radiológicos Típicos:</strong>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong>Endometrioma:</strong> Alto sinal em T1 (sangue subagudo), com perda de sinal ("shading") nas sequências ponderadas em T2.</li>
                  <li>• <strong>Nódulos fibróticos profundos:</strong> Baixo sinal em T2 (hipointensos) com focos hiperintensos milimétricos ("pontos brilhantes" de sangramento glandular ectópico).</li>
                  <li>• <strong>O laudo radiológico ideal deve responder:</strong> <em>Onde está a lesão? Quanto infiltra da parede? Quais órgãos vizinhos estão ameaçados?</em></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'laparo' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h5 className="text-base font-black text-white">Laparoscopia Diagnóstica & Terapêutica</h5>
                <span className="text-xs text-emerald-400 font-mono">Padrão Histopatológico — Papel Atual Selecionado</span>
              </div>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                Cirúrgico & Histológico
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <strong className="text-slate-200 block font-bold">Quando Considerar a Laparoscopia?</strong>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• Quando os exames de imagem (USG e RM) forem <strong>normais</strong>, mas o <strong>tratamento clínico empírico falhou</strong> ou gerou efeitos adversos intoleráveis.</li>
                  <li>• Paciente com suspeita de endometriose peritoneal superficial ativa causadora de dor refratária.</li>
                  <li>• Quando já existe indicação cirúrgica formal (endometrioma &gt; 3-4 cm suspeito, obstrução ureteral, estenose intestinal).</li>
                </ul>
              </div>

              <div className="space-y-2">
                <strong className="text-slate-200 block font-bold">Princípio Mandatório "Ver e Tratar":</strong>
                <p className="text-slate-300 leading-relaxed">
                  A laparoscopia puramente diagnóstica está em desuso. Todo procedimento laparoscópico deve ser <strong>terapêutico no mesmo ato cirúrgico</strong> (exérese/ablação de focos, liberação de aderências e ressecção de endometriomas por técnica de cistectomia cuidadosa preservando a reserva ovariana).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RACIOCÍNIO CLÍNICO: IMAGEM NORMAL NÃO ENCERRA A INVESTIGAÇÃO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-3">
          <AlertCircle size={20} />
          <h4 className="text-sm font-black uppercase tracking-wider">
            Raciocínio Clínico Crítico: "Imagem Normal NÃO Encerra a Investigação"
          </h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A doença <strong>peritoneal superficial</strong> consiste em implantes milimétricos que habitualmente <strong>não são identificados</strong> nem pelo ultrassom nem pela ressonância magnética. Por isso, um exame de imagem com laudo normal jamais deve ser usado para desqualificar a queixa de dor da paciente.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Se a Suspeita Clínica é Baixa / Atípica</span>
            <p className="text-slate-300 leading-relaxed">
              Reavaliar outros diagnósticos diferenciais pélvicos (Síndrome do Intestino Irritável, cistite intersticial/síndrome da bexiga dolorosa, síndrome miofascial do assoalho pélvico, congestão pélvica) e acompanhar evolução clínica.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">Se a Suspeita Clínica é Alta</span>
            <p className="text-slate-300 leading-relaxed">
              Iniciar <strong>tratamento hormonal empírico</strong> (bloqueio ovulatório com progestagênio ou CHC contínuo), encaminhar para exame de imagem em centro especializado com preparo intestinal ou discutir indicação laparoscópica se refratária.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
