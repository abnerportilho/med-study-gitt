import React, { useState } from 'react';
import { 
  User, CheckCircle2, XCircle, AlertCircle, 
  HelpCircle, ChevronRight, Stethoscope, Scissors, 
  Award, RefreshCw, FileText
} from 'lucide-react';

export default function UroCasoClinicoInterativo() {
  const [activeSection, setActiveSection] = useState<'caso' | 'questoes'>('caso');

  // Estado das Questões
  const [selectedQ1, setSelectedQ1] = useState<string | null>(null);
  const [showFeedbackQ1, setShowFeedbackQ1] = useState<boolean>(false);

  const [selectedQ2, setSelectedQ2] = useState<string | null>(null);
  const [showFeedbackQ2, setShowFeedbackQ2] = useState<boolean>(false);

  const [selectedQ3, setSelectedQ3] = useState<string | null>(null);
  const [showFeedbackQ3, setShowFeedbackQ3] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* HEADER DO EIXO */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
              Eixo 6 • Aplicação Clínica & Questões de Prova
            </span>
            <h2 className="text-xl md:text-3xl font-black text-white">
              Caso Clínico Real & Questões de Fixação
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              O caso clínico integral apresentado pelo Prof. Dr. André Bernardo (Paciente MHT, 57 anos) com raciocínio diagnóstico, grade POP-Q, etapas cirúrgicas e as 3 questões dos slides com resolução comentada.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('caso')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'caso'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              1. Caso Clínico Real (MHT)
            </button>
            <button
              onClick={() => setActiveSection('questoes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'questoes'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              2. Questões de Prova (Slides 34-36)
            </button>
          </div>
        </div>
      </div>

      {/* SEÇÃO 1: CASO CLÍNICO INTEGRAL */}
      {activeSection === 'caso' && (
        <div className="space-y-6">
          {/* IDENTIFICAÇÃO E HISTÓRIA */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <User className="text-cyan-400" size={20} />
                Identificação & História Clínica (Prof. Dr. André Bernardo)
              </h3>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
                MHT, 57 anos
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 text-sm block">Anamnese & Antecedentes:</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong>Paciente:</strong> MHT, 57 anos, doméstica, católica.</li>
                  <li>• <strong>Queixa Principal (QP):</strong> Perda urinária aos esforços há 3 anos.</li>
                  <li>• <strong>HPMA:</strong> Perda iniciou há 25 anos após o 1º parto (apenas aos grandes esforços). Há 3 anos evoluiu com piora dramática para <strong>mínimos esforços (falar, caminhar, escovar dentes)</strong>, gerando severo isolamento social, constrangimento e abalo na vida conjugal.</li>
                  <li>• <strong>ISDA:</strong> Dispareunia de profundidade e ganho de 10 kg na última década.</li>
                  <li>• <strong>Comorbidades:</strong> DM2 (metformina 850mg), HAS (losartana 50mg), depressão (sertralina 50mg). Menopausa aos 50 anos sem TRH.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-amber-300 text-sm block">História Obstétrica & Exame Físico:</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong>Obstetrícia:</strong> G3P3 (três partos normais vaginais). Fetos pesando <strong>3.500g, 3.700g e 3.950g</strong>. 1º parto instrumentalizado com fórceps e episiotomia médio-lateral direita (EMLD); 2º parto com nova EMLD.</li>
                  <li>• <strong>Exame Geral:</strong> IMC 38 kg/m² (Obesidade Grau II), PA 130/95 mmHg.</li>
                  <li>• <strong>Exame Ginecológico:</strong> Perda urinária sincrônica evidente às manobras de tosse e Valsalva. Abaulamento de parede anterior e rotura de corpo perineal.</li>
                </ul>
              </div>
            </div>

            {/* GRADE POP-Q DO CASO */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2">Grade POP-Q Oficial da Paciente MHT:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-800">
                    <span className="text-[10px] text-cyan-400 font-bold block">Aa</span>
                    <span className="text-sm text-white font-bold">0</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-800">
                    <span className="text-[10px] text-cyan-400 font-bold block">Ba</span>
                    <span className="text-sm text-amber-400 font-bold">0</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-purple-800">
                    <span className="text-[10px] text-purple-400 font-bold block">C</span>
                    <span className="text-sm text-white font-bold">-5</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-800">
                    <span className="text-[10px] text-rose-400 font-bold block">HG</span>
                    <span className="text-sm text-rose-300 font-bold">6</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-800">
                    <span className="text-[10px] text-rose-400 font-bold block">CP</span>
                    <span className="text-sm text-rose-300 font-bold">2</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold block">CVT</span>
                    <span className="text-sm text-white font-bold">8</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block">Ap</span>
                    <span className="text-sm text-white font-bold">0</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block">Bp</span>
                    <span className="text-sm text-white font-bold">-3</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-purple-800">
                    <span className="text-[10px] text-purple-400 font-bold block">D</span>
                    <span className="text-sm text-white font-bold">-7</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <strong className="text-cyan-300 block">Diagnósticos Anatômicos & Funcionais:</strong>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>1. <strong>Cistocele Grau 2 / Estádio II:</strong> Ba = 0 cm (ao nível do anel himenal).</li>
                    <li>2. <strong>Rotura Perineal de 2º Grau:</strong> Alargamento severo do hiato genital (HG = 6 cm) e encurtamento do corpo perineal (CP = 2 cm).</li>
                    <li>3. <strong>Retocele Inicial:</strong> Ap = 0 cm.</li>
                    <li>4. <strong>IUE Grave aos Mínimos Esforços:</strong> Grande perda do suporte uretral anterior com componente esfincteriano.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TRATAMENTO CIRÚRGICO EXECUTADO NO CASO */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-800 space-y-3 pt-4">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Scissors size={16} />
                Procedimento Cirúrgico Realizado pelo Prof. André Bernardo (3 Tempos):
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-mono text-[10px] font-bold">TEMPO 1</span>
                  <strong className="text-white block">Colpoperineoplastia Posterior</strong>
                  <p className="text-slate-300 text-[11px]">
                    Reconstrução do corpo perineal e miorrafia dos elevadores do ânus, reduzindo o HG de 6 para 3,5 cm e recompondo o CP de 2 para 3,5 cm.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-mono text-[10px] font-bold">TEMPO 2</span>
                  <strong className="text-white block">Colpoplastia Sítio-Específica</strong>
                  <p className="text-slate-300 text-[11px]">
                    Dissecção no espaço de Retzius e reinserção da fáscia pubocervical no Arco Tendíneo da Fáscia Pélvica (ATFP), corrigindo a cistocele.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-mono text-[10px] font-bold">TEMPO 3</span>
                  <strong className="text-white block">Sling Aponeurótico Autólogo</strong>
                  <p className="text-slate-300 text-[11px]">
                    Confecção de fita da fáscia do músculo reto abdominal da paciente sob a uretra média sem tensão, curando a IUE sem risco de erosão sintética.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 2: QUESTÕES DOS SLIDES 34, 35 E 36 */}
      {activeSection === 'questoes' && (
        <div className="space-y-6">
          {/* QUESTÃO 1 (SLIDE 34) */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 font-bold">QUESTÃO 1 • SLIDE 34</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
                Fatores de Risco
              </span>
            </div>

            <h3 className="text-sm md:text-base font-bold text-white">
              São fatores de risco para prolapso genital, EXCETO:
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { id: 'A', text: 'A) Parto vaginal' },
                { id: 'B', text: 'B) Macrossomia fetal (> 4.000g)' },
                { id: 'C', text: 'C) Baixa escolaridade' },
                { id: 'D', text: 'D) Obesidade' },
                { id: 'E', text: 'E) Hipoestrogenismo na menopausa' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedQ1(opt.id);
                    setShowFeedbackQ1(true);
                  }}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between ${
                    selectedQ1 === opt.id
                      ? opt.id === 'C'
                        ? 'bg-emerald-950 border border-emerald-700 text-emerald-200'
                        : 'bg-rose-950 border border-rose-700 text-rose-200'
                      : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span>{opt.text}</span>
                  {selectedQ1 === opt.id && (
                    opt.id === 'C' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-rose-400" />
                  )}
                </button>
              ))}
            </div>

            {showFeedbackQ1 && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-800 text-xs space-y-1">
                <strong className="text-cyan-300 block">Gabarito Oficial: Alternativa C (Baixa escolaridade)</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Justificativa da Aula:</strong> Baixa escolaridade não possui nexo biológico ou biomecânico causal com a perda de sustentação fascial. Os fatores de risco estabelecidos no estudo com 15.307 mulheres e na apresentação do Prof. André são: Parto vaginal (OR 7,22), Macrossomia fetal &gt; 4.000g (OR 2,90), História familiar (OR 2,27), Obesidade (IMC) e Hipoestrogenismo na pós-menopausa.
                </p>
              </div>
            )}
          </div>

          {/* QUESTÃO 2 (SLIDE 35) */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 font-bold">QUESTÃO 2 • SLIDE 35</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
                Biomecânica Anterior
              </span>
            </div>

            <h3 className="text-sm md:text-base font-bold text-white">
              O defeito fascial anterior acarreta:
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { id: 'A', text: 'A) Incontinência fecal e retocele' },
                { id: 'B', text: 'B) Incontinência urinária aos esforços e cistocele' },
                { id: 'C', text: 'C) Prolapso de cúpula vaginal isolado' },
                { id: 'D', text: 'D) Enterocele de fundo de saco de Douglas' },
                { id: 'E', text: 'E) Ausência de repercussões miccionais' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedQ2(opt.id);
                    setShowFeedbackQ2(true);
                  }}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between ${
                    selectedQ2 === opt.id
                      ? opt.id === 'B'
                        ? 'bg-emerald-950 border border-emerald-700 text-emerald-200'
                        : 'bg-rose-950 border border-rose-700 text-rose-200'
                      : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span>{opt.text}</span>
                  {selectedQ2 === opt.id && (
                    opt.id === 'B' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-rose-400" />
                  )}
                </button>
              ))}
            </div>

            {showFeedbackQ2 && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-800 text-xs space-y-1">
                <strong className="text-cyan-300 block">Gabarito Oficial: Alternativa B (Incontinência urinária aos esforços e cistocele)</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Justificativa da Aula:</strong> O compartimento anterior (Nível II de DeLancey) é sustentado pela fáscia pubocervical e pelos ligamentos pubouretrais. Quando há rotura fascial ou descolamento lateral do ATFP, a parede anterior desce formando a <strong>cistocele</strong> e a uretra perde seu ponto de apoio suburetral firme, resultando em <strong>incontinência urinária de esforço (IUE)</strong>.
                </p>
              </div>
            )}
          </div>

          {/* QUESTÃO 3 (SLIDE 36) */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 font-bold">QUESTÃO 3 • SLIDE 36</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
                Estadiamento POP-Q
              </span>
            </div>

            <h3 className="text-sm md:text-base font-bold text-white">
              Paciente com exame físico POP-Q demonstrando maior prolapso em 0 cm (ao nível do anel himenal) é classificada em qual estádio?
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { id: 'A', text: 'A) Estádio 0' },
                { id: 'B', text: 'B) Estádio I' },
                { id: 'C', text: 'C) Estádio II' },
                { id: 'D', text: 'D) Estádio III' },
                { id: 'E', text: 'E) Estádio IV' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedQ3(opt.id);
                    setShowFeedbackQ3(true);
                  }}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between ${
                    selectedQ3 === opt.id
                      ? opt.id === 'C'
                        ? 'bg-emerald-950 border border-emerald-700 text-emerald-200'
                        : 'bg-rose-950 border border-rose-700 text-rose-200'
                      : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span>{opt.text}</span>
                  {selectedQ3 === opt.id && (
                    opt.id === 'C' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-rose-400" />
                  )}
                </button>
              ))}
            </div>

            {showFeedbackQ3 && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-800 text-xs space-y-1">
                <strong className="text-cyan-300 block">Gabarito Oficial: Alternativa C (Estádio II)</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Justificativa da Aula:</strong> O Estádio II do sistema POP-Q (ICS) é rigorosamente delimitado pelo intervalo: <strong>-1 cm ≤ ponto mais distal ≤ +1 cm</strong> em relação ao hímen. Estando o ponto em <strong>0 cm</strong> (exatamente na linha himenal, como na paciente MHT com Ba = 0), a classificação enquadra-se no <strong>Estádio II</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
