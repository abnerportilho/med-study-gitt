import React, { useState } from 'react';
import { 
  Droplet, Flame, AlertCircle, CheckCircle2, ShieldAlert, 
  HelpCircle, Sparkles, Activity, Eye, Pill, ArrowRight
} from 'lucide-react';

export default function MamaDescargaInflamacao() {
  const [selectedSubTab, setSelectedSubTab] = useState<'descarga' | 'papiloma' | 'ectasia' | 'galactorreia' | 'mastite' | 'abscesso' | 'granulomatosa'>('descarga');

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO 6 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Droplet size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Eixo 6 · Descarga Papilar & Inflamação
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Descarga Papilar, Processos Inflamatórios & Mastites
            </h3>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A aparência do líquido importa menos do que o <strong>padrão clínico global</strong> (espontânea vs provocada; uni vs bilateral; uni vs multiductal). Aprenda o manejo de papilomas, ectasia ductal, galactorreia, mastites e abscessos.
        </p>

        {/* SUBTABS */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'descarga', label: '1. Padrões de Descarga' },
            { id: 'papiloma', label: '2. Papiloma Intraductal' },
            { id: 'ectasia', label: '3. Ectasia Ductal' },
            { id: 'galactorreia', label: '4. Galactorreia & Fármacos' },
            { id: 'mastite', label: '5. Mastite Puerperal' },
            { id: 'abscesso', label: '6. Abscesso Mamário' },
            { id: 'granulomatosa', label: '7. Mastite Granulomatosa' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubTab === tab.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. PADRÕES DE DESCARGA */}
      {selectedSubTab === 'descarga' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Droplet className="text-cyan-400" size={20} />
              Descarga Fisiológica vs Patológica: Perguntas que Mudam a Conduta
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 uppercase">Descarga Fisiológica / Benigna</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono">Mais Comum</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Apresentação:</strong> Bilateral, multiductal (múltiplos poros).</li>
                  <li><strong>Gatilho:</strong> Ocorre apenas após expressão vigorosa (provocada).</li>
                  <li><strong>Coloração:</strong> Esbranquiçada (leitosa), amarelada, esverdeada ou acastanhada.</li>
                  <li><strong>Causas:</strong> Estimulação mecânica repetitiva, fármacos, ectasia ductal simples.</li>
                  <li><strong>Conduta:</strong> Orientar cessar ordenha, tranquilizar e revisar medicações.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-400 uppercase">Descarga Papilar Patológica (Suspeita)</span>
                  <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded font-mono">Investigação Ativa</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Apresentação:</strong> <strong>Espontânea</strong> (mancha o sutiã/roupa), <strong>Unilateral</strong> e <strong>Uniductal</strong> (um único poro).</li>
                  <li><strong>Aspecto:</strong> Serossanguinolenta / Sanguinolenta ("água de carne") ou Serosa pura ("água de rocha").</li>
                  <li><strong>Etiologias:</strong> Papiloma Intraductal (~50%), Ectasia ductal (~30%), Carcinoma in situ / invasor (~10-15%).</li>
                  <li><strong>Conduta:</strong> Mamografia + USG direcionado da região retroareolar + Excisão cirúrgica de ducto terminal (microdochectomia).</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/50 flex items-start gap-3">
              <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                <strong className="text-white">Citologia do Líquido Papilar:</strong>
                <span> A análise citológica da descarga tem <strong>baixa sensibilidade (alto índice de falsos negativos)</strong>. Um laudo citológico negativo NÃO exclui neoplasia ductal ou papiloma com atipia em paciente com descarga patológica espontânea!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PAPILOMA INTRADUCTAL */}
      {selectedSubTab === 'papiloma' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="text-rose-400" size={20} />
              Papiloma Intraductal: Principal Causa de Descarga Patológica
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Neoplasia epitelial benigna polipoide que cresce no lúmen de um ducto lactífero principal, localizada classicamente na <strong>região central e retroareolar</strong> em mulheres de 35 a 55 anos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-rose-400 block">Quadro Clínico & Diagnóstico</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Sintoma Cardeal:</strong> Descarga sanguinolenta ou serosa espontânea, unilateral e uniductal.<br />
                  • <strong>Exame Físico:</strong> Ponto de gatilho periareolar onde a compressão suave deflagra a saída da secreção pelo ducto correspondente.<br />
                  • <strong>Ultrassonografia:</strong> Ducto ectásico contendo nódulo intracístico/endoluminal vascularizado.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-emerald-400 block">Conduta Terapêutica</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Tratamento de Escolha:</strong> Ressecção seletiva do ducto comprometido (<strong>Microdochectomia</strong>) ou exérese dos ductos principais (cirurgia de Urban) com envio para exame anatomopatológico.<br />
                  • <strong>Atenção:</strong> Papilomas múltiplos periféricos (papilomatose) ou papilomas com atipia na biópsia conferem risco aumentado de malignidade subjacente.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ECTASIA DUCTAL */}
      {selectedSubTab === 'ectasia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Activity className="text-amber-400" size={20} />
              Ectasia Ductal Mamária: Secreção Multicolorida & Tabagismo
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Dilatação crônica dos ductos subareolares coletores principais com acúmulo de secreção lipídica espessa, descamação epitelial e subsequente reação inflamatória periductal fibrosante.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-amber-400 block">Apresentação Clínica</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Mais comum em mulheres perimenopáusicas e pós-menopáusicas.</li>
                  <li><strong>Descarga multicolorida:</strong> Secreção pastosa, escura, verde-oliva, marrom ou preta.</li>
                  <li>Frequentemente bilateral e multiductal.</li>
                  <li>A fibrose periductal tardia pode levar à <strong>retração horizontal/em fenda do mamilo</strong>.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-cyan-400 block">Fator de Risco & Manejo</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Associação com Tabagismo:</strong> Substâncias tóxicas do tabaco lesam o epitélio ductal e favorecem mastite periductal recidivante.</li>
                  <li><strong>Conduta:</strong> Tranquilização, cessação do tabagismo e higiene local.</li>
                  <li>Cirurgia (exérese do cone de ductos) apenas se houver infecções de repetição, fístulas ou retração dolorosa.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. GALACTORREIA & FÁRMACOS */}
      {selectedSubTab === 'galactorreia' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Pill className="text-purple-400" size={20} />
              Galactorreia: Investigação Clínica, Medicamentosa & Endócrina
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Descarga papilar com aspecto puramente <strong>leitoso (leite verdadeiro)</strong> fora do período gravídico-puerperal ou persistente por mais de 6 meses a 1 ano após o desmame completo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-purple-400 block">1. Investigação Inicial</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Excluir gravidez:</strong> Solicitar beta-hCG sérico/urinário.<br />
                  • <strong>Dosar Prolactina sérica:</strong> Coleta matinal em repouso de 30 min sem estimulação prévia.<br />
                  • <strong>Dosar TSH:</strong> Hipotireoidismo primário eleva TRH, estimulando diretamente a secreção de prolactina.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-pink-400 block">2. Causas Farmacológicas Comuns</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Antipsicóticos/Neurolépticos:</strong> Haloperidol, Risperidona, Clorpromazina.<br />
                  • <strong>Antieméticos antidopaminérgicos:</strong> Metoclopramida, Domperidona.<br />
                  • <strong>Antidepressivos:</strong> Tricíclicos, ISRS, Venlafaxina.<br />
                  • <strong>Anti-hipertensivos:</strong> Metildopa, Verapamil.<br />
                  • <strong>Opioides</strong> e anticoncepcionais orais de alta dose.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-cyan-400 block">3. Causas Tumorais & Conduta</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>Prolactinomas:</strong> Se Prolactina &gt;100-200 ng/mL ou sintomas neurológicos (cefaleia, alteração de campo visual) → solicitar <strong>Ressonância Magnética de Sela Túrcica</strong>.<br />
                  • <strong>Tratamento:</strong> Agonistas dopaminérgicos (Cabergolina ou Bromocriptina) ou ajuste medicamentoso.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MASTITE PUERPERAL */}
      {selectedSubTab === 'mastite' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <Flame className="text-rose-400" size={20} />
              Mastite Puerperal: Tratar a Mãe e Preservar a Lactação
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Processo inflamatório/infeccioso agudo que ocorre tipicamente nas primeiras 6 a 8 semanas pós-parto, desencadeado por <strong>estase láctea associada a microfissuras mamilares</strong> com invasão de bactérias da microbiota da pele ou nasofaringe do recém-nascido (predomínio de <em>Staphylococcus aureus</em>).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-rose-400 block">Quadro Clínico Típico</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Dor intensa e eritema em cunha bem demarcado em um quadrante mamário.</li>
                  <li>Calor local, edema e ingurgitamento glandular doloroso.</li>
                  <li><strong>Sintomas sistêmicos exuberantes:</strong> Febre alta (&gt;38,5°C), calafrios, taquicardia, prostração e mialgia intensa ("síndrome gripal da lactante").</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-emerald-400 block">Pilares do Tratamento</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Manutenção da Amamentação:</strong> A amamentação e o esvaziamento mamário frequente (por sucção ou bomba) NÃO devem ser interrompidos! O leite é seguro para o bebê.</li>
                  <li><strong>Antibioticoterapia empírica (10 a 14 dias):</strong> Cefalexina 500mg 6/6h ou Amoxicilina + Clavulanato 875/125mg 12/12h. (Se suspeita de MRSA: Clindamicina ou Sulfametoxazol-Trimetoprima se bebê termo &gt;1 mês).</li>
                  <li>Analgésicos, anti-inflamatórios e correção minuciosa da pega do bebê.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ABSCESSO MAMÁRIO */}
      {selectedSubTab === 'abscesso' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <AlertCircle className="text-amber-400" size={20} />
              Abscesso Mamário: Diagnóstico & Drenagem Adequada
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Complicação em 5% a 11% das mastites não tratadas adequadamente ou com esvaziamento ineficaz, caracterizado pela formação de <strong>coleção purulenta encapsulada</strong> no parênquima mamário.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-amber-400 block">1. Suspeita Clínica</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Presença de <strong>massa palpável flutuante</strong> com calor e rubor sobrejacente, ou paciente com mastite que <strong>não melhora após 48 a 72 horas de antibioticoterapia adequada</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-cyan-400 block">2. Confirmação Ultrassonográfica</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O USG é mandatório para confirmar a coleção anecoica/hipoecoica com reforço acústico e débris internos, mensurar as dimensões e guiar a punção percutânea.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-emerald-400 block">3. Drenagem de Escolha</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • <strong>1ª Linha:</strong> Aspiração por agulha calibrosa guiada por USG (pode ser repetida a cada 48h). Menor dano tecidual, menor dor e não interrompe amamentação.<br />
                  • <strong>Incisão e Drenagem Cirúrgica:</strong> Reservada para abscessos volumosos (&gt;5 cm), necrose de pele ou falha de aspirações repetidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. MASTITE GRANULOMATOSA */}
      {selectedSubTab === 'granulomatosa' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2">
              <ShieldAlert className="text-purple-400" size={20} />
              Mastite Granulomatosa Lobulocêntrica: Diagnóstico de Exclusão
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Doença inflamatória crônica benigna rara que acomete mulheres jovens multíparas em idade fértil. Apresenta-se como massa inflamatória endurecida associada a fístulas cutâneas crônicas e supuração recorrente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-purple-400 block">Desafio Diagnóstico</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • Simula com grande facilidade infecções bacterianas refratárias ou <strong>Carcinoma Inflamatório da Mama</strong>.<br />
                  • <strong>Core Biopsy Histopatológica:</strong> Demonstra granulomas não caseosos centrados nos lóbulos mamários com células gigantes de Langhans.<br />
                  • <strong>Mandatório:</strong> Pesquisa e cultura para afastar Tuberculose mamária (pesquisa de BAAR), infecções fúngicas e bactérias atípicas (<em>Corynebacterium kroppenstedtii</em>).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-cyan-400 block">Tratamento Individualizado</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  • Como se trata de processo autoimune/inflamatório primário, a base do tratamento é a <strong>Corticoterapia oral em doses imunossupressoras</strong> (Prednisona 0,5 a 1 mg/kg/dia com desmame lento ao longo de meses).<br />
                  • Casos refratários podem exigir Metotrexato ou ressecção cirúrgica conservadora.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-xs text-rose-200 leading-relaxed font-medium">
              🚨 <strong>Axioma Fundamental da Mastologia:</strong> <em>"Persistência é um dado diagnóstico."</em> Todo processo inflamatório mamário que não responde satisfatoriamente aos antibióticos ou drenagens no prazo esperado deve ser submetido a <strong>biópsia de pele e parênquima para afastar Carcinoma Inflamatório</strong>!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
