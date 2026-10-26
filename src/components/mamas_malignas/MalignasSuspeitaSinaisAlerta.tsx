import React, { useState } from 'react';
import { 
  AlertTriangle, Eye, ShieldAlert, Thermometer, User, 
  Flame, CheckCircle2, ArrowRight, Stethoscope, Droplet, Layers
} from 'lucide-react';

export default function MalignasSuspeitaSinaisAlerta() {
  const [selectedTopic, setSelectedTopic] = useState<'sinais' | 'urgencia' | 'paget' | 'inflamatorio' | 'homem'>('sinais');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 2 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
            <AlertTriangle size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              Eixo 2 · Apresentação Clínica
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Quando Suspeitar: Sinais de Alerta & Formas Especiais
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          O câncer de mama pode se apresentar como nódulo palpável — mas não apenas. Alterações cutâneas sutis, retração de mamilo, descarga sanguinolenta espontânea unilateral, eczemas rebeldes e formas agressivas com edema difuso exigem reconhecimento imediato e referência urgente.
        </p>

        {/* NAVEGAÇÃO ENTRE SUBTÓPICOS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'sinais', label: '1. Sinais de Alerta Cardinais' },
            { id: 'urgencia', label: '2. Critérios de Referência Urgente' },
            { id: 'paget', label: '3. Doença de Paget do Mamilo' },
            { id: 'inflamatorio', label: '4. Câncer Inflamatório (T4d)' },
            { id: 'homem', label: '5. Câncer de Mama Masculino (~1%)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTopic(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTopic === tab.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. SINAIS DE ALERTA CARDINAIS */}
      {selectedTopic === 'sinais' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Eye className="text-amber-400" size={20} />
              Manifestações Clínicas Clássicas e Atípicas
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Na maioria dos casos palpáveis, o câncer se manifesta como caroço/nódulo, mas alterações de contorno, pele e mamilo demandam investigação diagnóstica rigorosa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Nódulo Endurecido ou Fixo</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Consistência pétrea ou firme, limites imprecisos, pouco móvel ou aderido aos planos profundos (músculo peitoral) ou à derme superficial, com crescimento progressivo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Retração de Pele ou Mamilo</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Formação de covinhas (*dimpling*), áreas aplainadas, desvio do eixo mamilar ou inversão recente do mamilo causada pelo encurtamento dos ligamentos de Cooper.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Descarga Sanguinolenta</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Descarga papilar patológica: <strong>espontânea</strong> (sem compressão), <strong>unilateral</strong>, <strong>uniductal</strong> e de aspecto sanguinolento ou aquoso cristalino (*água de rocha*).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Eczema Persistente do Mamilo</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Descamação, vermelhidão, crosta ou exsudação unilateral na ponta da papila que não melhora após uso de pomadas com corticoides tópicos (suspeitar de Paget).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Edema & "Casca de Laranja"</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Espessamento cutâneo e poros dilatados proeminentes (*peau d'orange*), associados a calor e eritema difuso por obstrução neoplásica dos linfáticos dérmicos.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>Linfonodomegalia Axilar</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Linfonodos endurecidos, indolores, coalescentes ou fixos na axila ipsilateral, ou nas fossas supra/infraclaviculares (sinal de disseminação locorregional).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CRITÉRIOS DE REFERÊNCIA URGENTE */}
      {selectedTopic === 'urgencia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <ShieldAlert className="text-rose-400" size={20} />
              Referência Urgente: Situações Que Não Podem Esperar
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Na atenção primária e no atendimento ambulatorial geral, identificar esses quadros impõe encaminhamento ágil e solicitação imediata de exames diagnósticos complementares.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3.5">Apresentação Clínica</th>
                    <th className="p-3.5">Conduta Inicial Obrigatória</th>
                    <th className="p-3.5">Justificativa Clínica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
                  <tr>
                    <td className="p-3.5 font-bold text-rose-300">Nódulo em mulher &gt; 50 anos</td>
                    <td className="p-3.5 text-amber-300 font-semibold">Encaminhar imediatamente para investigação com MMG + US</td>
                    <td className="p-3.5 text-slate-400">Pico de incidência da doença; todo nódulo de início recente é suspeito até prova em contrário.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-rose-300">Nódulo persistente em mulher &gt; 30 anos</td>
                    <td className="p-3.5 text-amber-300 font-semibold">Investigar formalmente com imagem dirigida</td>
                    <td className="p-3.5 text-slate-400">Persistência após o ciclo menstrual afasta alterações funcionais puramente cíclicas.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-rose-300">Nódulo duro, fixo ou em crescimento progressivo</td>
                    <td className="p-3.5 text-rose-300 font-semibold">Investigar em qualquer idade (inclusive jovens)</td>
                    <td className="p-3.5 text-slate-400">Características físicas altamente correlacionadas com neoplasia invasiva maligna.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-red-300">Descarga sanguinolenta unilateral espontânea</td>
                    <td className="p-3.5 text-red-300 font-semibold">Investigar com imagem e citologia/biópsia</td>
                    <td className="p-3.5 text-slate-400">Descartar papiloma intraductal e carcinoma ductal (in situ ou invasor).</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-purple-300">Eczema mamilar persistente unilateral</td>
                    <td className="p-3.5 text-purple-300 font-semibold">Biópsia de pele obrigatória para excluir Paget</td>
                    <td className="p-3.5 text-slate-400">Em &gt; 85% dos casos há adenocarcinoma ou CDIS no parênquima mamário adjacente.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-orange-300">Edema difuso / pele em casca de laranja (*peau d'orange*)</td>
                    <td className="p-3.5 text-orange-300 font-semibold">Suspeitar de Câncer Inflamatório (T4d) imediatamente</td>
                    <td className="p-3.5 text-slate-400">Forma agressiva de evolução rápida com invasão maciça dos linfáticos dérmicos.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. DOENÇA DE PAGET DO MAMILO */}
      {selectedTopic === 'paget' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-purple-800/80 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <Stethoscope size={22} />
                <span>Doença de Paget do Mamilo</span>
              </div>
              <span className="text-[11px] font-mono bg-purple-950 text-purple-300 px-2.5 py-1 rounded-xl border border-purple-800 font-bold">
                Apresentação Cutânea
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              A Doença de Paget mamária representa uma invasão neoplásica da epiderme do mamilo por células adenocarcinomatosas glandulares (*células de Paget*), que infiltram os queratinócitos escamosos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-300 text-sm">Manifestação Clínica Típica</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Eczema <strong>estritamente unilateral</strong> e persistente na ponta da papila/mamilo.</li>
                  <li>• Formação de crosta, descamação, exsudato serossanguinolento ou erosão superficial.</li>
                  <li>• Sintomas de queimação, prurido localizado ou dor pontual no mamilo.</li>
                  <li>• Pode se estender secundariamente para a aréola circundante.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-300 text-sm">Associação Oncológica & Conduta</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Pode coexistir com CDIS ou carcinoma invasor</strong> na quase totalidade dos casos (85% a 95%).</li>
                  <li>• O nódulo subjacente pode ou não ser palpável ao exame físico.</li>
                  <li>• <strong>Requer biópsia</strong> por *punch* ou incisional da lesão cutânea mamilar.</li>
                  <li>• Avaliação complementar obrigatória com mamografia bilateral e ultrassom das mamas.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800 text-xs text-slate-200">
              <strong className="text-purple-300 block mb-1">Dica Prática para Concursos e Ambulatório:</strong>
              Eczema bilateral em mulher jovem e atópica quase sempre é dermatite de contato ou eczema atópico. Já a lesão eczematosa <strong>unilateral e que não responde a corticoide tópico por 2-3 semanas</strong> é Doença de Paget até prova em contrário!
            </div>
          </div>
        </div>
      )}

      {/* 4. CÂNCER INFLAMATÓRIO (T4d) */}
      {selectedTopic === 'inflamatorio' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-orange-800/80 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-base">
                <Flame size={22} />
                <span>Câncer Inflamatório da Mama (Classificação T4d)</span>
              </div>
              <span className="text-[11px] font-mono bg-orange-950 text-orange-300 px-2.5 py-1 rounded-xl border border-orange-800 font-bold">
                Emergência Oncológica
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O câncer inflamatório é a forma primária mais agressiva de câncer de mama. Não é causado por bactérias ou vírus: <strong>a inflamação clínica é secundária à embolização e bloqueio massivo dos vasos linfáticos da derme por células neoplásicas</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-orange-300 text-sm">Quadro Clínico & Aspecto da Pele</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>Eritema e edema difusos</strong> que acometem rapidamente mais de um terço da mama.</li>
                  <li>• Pele espessada em <strong>"casca de laranja" (*peau d'orange*)</strong>, com calor local e aumento mamário rápido.</li>
                  <li>• Acometimento axilar precoce (linfonodos metastáticos volumosos).</li>
                  <li>• Evolução ultrarrápida (semanas a poucos meses).</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-rose-300 text-sm">Aspectos Diagnósticos & Estadiamento</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>T4d é um diagnóstico essencialmente CLÍNICO!</strong></li>
                  <li>• A biópsia de pele por *punch* demonstra êmbolos tumorais nos linfáticos dérmicos, mas sua ausência não anula o diagnóstico se a clínica for típica.</li>
                  <li>• Classifica a paciente no mínimo como <strong>Estádio IIIB</strong> (localmente avançado).</li>
                  <li>• <strong>Armadilha:</strong> Tratar repetidamente com antibióticos como se fosse "mastite" fora da lactação gera atrasos catastróficos.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-orange-900 text-xs text-orange-200">
              <strong className="block font-bold mb-1">Tratamento Multimodal Obrigatório:</strong>
              O câncer inflamatório (T4d) <strong>NUNCA começa por cirurgia</strong>! O tratamento inicia-se obrigatoriamente com <strong>Quimioterapia Neoadjuvante sistêmica intensiva</strong>, seguida de mastectomia radical modificada e radioterapia locorregional.
            </div>
          </div>
        </div>
      )}

      {/* 5. CÂNCER DE MAMA MASCULINO */}
      {selectedTopic === 'homem' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-cyan-800/80 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <User size={22} />
                <span>Câncer de Mama Masculino</span>
              </div>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded-xl border border-cyan-800 font-bold">
                ≈1% de Todos os Casos
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Embora incomum, o câncer de mama também atinge o sexo masculino. Devido ao menor volume de parênquima glandular no homem, a neoplasia rapidamente invade a pele ou a fáscia peitoral.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-300 text-sm">Características Clínicas</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Apresenta-se como <strong>massa unilateral indolor, geralmente retroareolar</strong>.</li>
                  <li>• O diagnóstico frequentemente ocorre em <strong>estágio mais tardio</strong> devido ao desconhecimento e falta de suspeita clínica.</li>
                  <li>• Exige palpação rigorosa da axila e das cadeias linfonodais regionais.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-300 text-sm">Genética & Rastreamento Familiar</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Forte ligação com variantes germinativas patogênicas, com destaque primordial para o gene <strong>BRCA2</strong>.</li>
                  <li>• <strong>O aconselhamento e teste genético são mandatórios</strong> para todo homem com diagnóstico de câncer de mama.</li>
                  <li>• Permite investigar e proteger filhos e irmãs com rastreamento precoce.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
