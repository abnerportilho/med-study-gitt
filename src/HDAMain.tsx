import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplet, Activity, AlertCircle, Syringe, ClipboardList, HeartPulse, ShieldAlert, Crosshair, Scale, Brain
} from 'lucide-react';

const tabs = [
  { id: 'fisiopatologia', label: '1. Fisiopatologia' },
  { id: 'clinica', label: '2. Quadro Clínico' },
  { id: 'choque', label: '3. Choque & Hipovolemia' },
  { id: 'tratamento', label: '4. Tratamento & Conduta' }
];

export default function HDAMain() {
  const [activeTab, setActiveTab] = useState('fisiopatologia');
  const [treatmentRoute, setTreatmentRoute] = useState<'varicosa' | 'nao-varicosa'>('varicosa');

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-950 border border-red-900/30 p-6 rounded-3xl shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500">
          <Droplet size={140} />
        </div>
        <div className="z-10">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <Droplet size={24} />
            <h2 className="text-sm font-black uppercase tracking-widest text-red-500">
              Emergência • Medicina Interna
            </h2>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Hemorragia Digestiva Alta (HDA)
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Diagnóstico, ressuscitação hemodinâmica, drogas vasoativas e manejo clínico agudo da HDA Varicosa e Não Varicosa. Da triagem à hemostasia.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-red-700 text-white shadow-lg shadow-red-900/30 font-extrabold translate-y-[-2px]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 pb-20">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Fisiopatologia */}
          {activeTab === 'fisiopatologia' && (
             <motion.div key="fisiopatologia" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                
                <div className="bg-slate-950 border border-red-900/30 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                     <Droplet className="text-red-500" /> Definição Anatômica
                   </h3>
                   <p className="text-sm text-slate-300 leading-relaxed mb-4">
                     Considera-se <strong>Hemorragia Digestiva Alta (HDA)</strong> todo sangramento originado no trato gastrointestinal superior, topograficamente localizado entre o esôfago e o duodeno, <strong>proximal ao Ligamento de Treitz</strong> (músculo suspensor do duodeno).
                   </p>
                   
                   <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">As Duas Grandes Rotas da HDA</h4>
                   <div className="grid md:grid-cols-2 gap-4">
                      
                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative overflow-hidden flex flex-col">
                         <strong className="text-rose-400 text-sm uppercase mb-2">1. HDA Não Varicosa (80%)</strong>
                         <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            Predominada pela <strong>Doença Ulcerosa Péptica</strong>. Mecanismo primário envolve lesão da mucosa permitindo exposição vascular e sangramento difuso/arterial. 
                         </p>
                         <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                           <strong className="text-slate-300 block mb-1">Ações Agreçoras e AINEs:</strong>
                           AINEs inibem a cicloxigenase (COX-1), despencando a síntese de <strong>prostaglandinas</strong> no estômago. Isso reduz brutalmente o muco protetor e a secreção de bicarbonato. A acidez (HCl) lisa coágulos que tentam se formar — <em>coágulo instável por meio ácido</em>.
                         </div>
                      </div>

                      <div className="bg-indigo-950/20 border border-indigo-900/40 p-5 rounded-2xl relative overflow-hidden flex flex-col">
                         <strong className="text-indigo-400 text-sm uppercase mb-2">2. HDA Varicosa (20%)</strong>
                         <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            Ocorre em doentes com Cirrose Hepática e <strong>Hipertensão Portal</strong>. O parênquima hepático fibrótico opõe barreira ao fluxo esplâncnico, gerando dilatações venosas extremas (varizes esofágicas e gástricas).
                         </p>
                         <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-900/50 text-xs text-indigo-200">
                           <strong className="text-indigo-100 block mb-1">Fisiopatologia da Ruptura:</strong>
                           Tensão de Parede altíssima → Rompimento varicoso. O cenário é catastrófico pois junta o sangramento venoso portal à imunossupressão cirrótica, plaquetopenia pela esplenomegalia congestiva e déficit de fatores de coagulação sintetizados no fígado.
                         </div>
                      </div>

                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-indigo-400 mb-6 flex items-center gap-2">
                     <Brain className="text-indigo-500" /> Fisiopatologia Avançada &amp; Fatores de Risco
                   </h3>
                   
                   <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-4">
                         <div className="flex-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                            <span className="text-[10px] text-rose-500 uppercase font-black tracking-widest mb-2 border-b border-rose-900/30 pb-2 block">H. pylori & Doença Ulcerosa</span>
                            <p className="text-xs text-slate-300 leading-relaxed mb-3">
                              A infecção crônica pelo <em>Helicobacter pylori</em> induz inflamação severa da mucosa gástrica e duodenal. A bactéria produz urease (alcalinizando o microambiente) e toxinas que destroem a barreira de muco protetor. 
                            </p>
                            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-[11px] text-slate-400">
                               <strong className="text-white">Fatores de Risco:</strong> Uso concomitante de AINEs, tabagismo, estresse fisiológico extremo (Úlceras de Cushing/Curling em GRD queimado/TCE).
                            </div>
                         </div>
                         
                         <div className="flex-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
                            <span className="text-[10px] text-amber-500 uppercase font-black tracking-widest mb-2 border-b border-amber-900/30 pb-2 block">Laceração de Mallory-Weiss</span>
                            <p className="text-xs text-slate-300 leading-relaxed mb-3">
                              Fisiopatologia mecânica. Vômitos incoercíveis ou esforço violento para vomitar (retching) geram um aumento brutal e súbito da pressão intra-abdominal e intragástrica, resultando em lacerações lineares na junção esofagogástrica.
                            </p>
                            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-[11px] text-slate-400">
                               <strong className="text-white">Fatores de Risco:</strong> Alcoolismo pesado (binge drinking), bulimia, hiperêmese gravídica.
                            </div>
                         </div>
                      </div>

                      <div className="bg-indigo-950/20 border border-indigo-900/40 p-5 rounded-2xl">
                         <span className="text-[10px] text-indigo-400 uppercase font-black tracking-widest mb-2 border-b border-indigo-900/40 pb-2 block">Mecânica da Hipertensão Portal e Varizes</span>
                         <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                               <p className="text-xs text-indigo-200/80 leading-relaxed mb-3">
                                 O fígado cirrótico possui resistência vascular elevada. O sangue mesentérico encontra um "muro" fibrótico e busca vias colaterais (anastomoses portossistêmicas) de menor resistência, dilatando massivamente submucosa esofágica e fundo gástrico.
                               </p>
                            </div>
                            <div className="w-px bg-indigo-900/40 hidden md:block"></div>
                            <div className="flex-1">
                               <ul className="text-xs text-indigo-200/80 space-y-2">
                                  <li><strong className="text-indigo-400 block">Gradiente Venoso Hepático (HVPG)</strong> Acima de 10 mmHg para formar varizes. <strong className="text-indigo-300">Acima de 12 mmHg</strong> deflagra o risco iminente de ruptura.</li>
                                  <li><strong className="text-indigo-400 block">Lei de Laplace na Variz</strong> A tensão da parede é proporcional ao raio e à pressão. Varizes calibrosas rompem exponencialmente mais fácil.</li>
                               </ul>
                               <div className="mt-3 bg-red-950/40 p-2 border border-red-900/50 rounded text-[10px] text-rose-300">
                                  <strong>Gatilhos Potencializadores:</strong> Tosse, valsalva, refeições copiosas ou infecções cruzadas agravam o HVPG.
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

             </motion.div>
          )}

          {/* TAB 2: Quadro Clinico */}
          {activeTab === 'clinica' && (
             <motion.div key="clinica" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <AlertCircle /> Identificação e Diagnóstico Clínico
                   </h3>
                   
                   <div className="flex flex-col gap-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                           <strong className="text-white text-sm block mb-1">Hematêmese</strong>
                           <p className="text-[10px] text-rose-500 uppercase font-bold mb-2">O Marco Visual</p>
                           <p className="text-xs text-slate-400 leading-relaxed">
                              Vômito sanguinolento. Se <strong>vermelho vivo (rutilante) e com coágulos</strong>, indica sangramento muito vigoroso e ativo (o sangue não precisou estagiar no estômago). Se o vômito aparenta <strong>"borra de café"</strong>, o sangramento sofreu digestão parcial do ácido clorídrico (hematina), indicando fluxo mais lento.
                           </p>
                        </div>
                        
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                           <strong className="text-white text-sm block mb-1">Melena</strong>
                           <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2">Sangue Digerido Baixo</p>
                           <p className="text-xs text-slate-400 leading-relaxed">
                              Fezes ejetadas como uma pasta negra, similar à graxa ("piche"), com odor altamente pútrido inconfundível. Alta predição temporal: O sangue precisa permanecer ali de 12 a 14h pra virar melena.
                           </p>
                        </div>
                     </div>

                     <div className="bg-amber-950/20 border border-amber-900/40 p-5 rounded-2xl flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                           <strong className="text-white text-sm block mb-1">Hematoquezia na HDA?</strong>
                           <p className="text-xs text-amber-200/70 leading-relaxed">
                              Sim, e é um sinal de morte iminente. Normalmente, sangue vermelho vivo pelo ânus indica origem baixa. Se for HDA, significa que o doente está perdendo no mínimo 1000 a 1500 mL de sangue tão agressivamente que tem efeito catártico — trânsito intestinal acelerado pelo volume de sangue arterial vivo, que cruza TGI e sai no reto ainda brilhante, vindo atrelado a fortíssimo choque hipovolêmico.
                           </p>
                        </div>
                        <div className="w-px bg-amber-900/30 hidden md:block"></div>
                        <div className="flex-1">
                           <strong className="text-white text-sm block mb-1">Sinais Ocultos & Uremia</strong>
                           <p className="text-xs text-amber-200/70 leading-relaxed">
                              Idosos podem apresentar Síncope (isquemia global abrupta), angina silenciosa isolada, exaustão. Laboratorialmente: <strong>Ureia eleva-se desproporcionalmente</strong> à creatinina (Relação Ureia/Cr &gt; 30). (Sangue desce o intestino → as proteínas do sangue são quebradas pelas bactérias → amônia e ureia absorvidas).
                           </p>
                        </div>
                     </div>

                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <ClipboardList /> Arsenal Diagnóstico e Pragmático
                   </h3>
                   
                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                         <strong className="text-white text-sm block mb-1">O Toque Retal Obrigatório</strong>
                         <p className="text-[10px] text-slate-500 font-black mb-2 uppercase tracking-widest">O exame físico não termina sem ele</p>
                         <p className="text-xs text-slate-400 leading-relaxed">
                           Pacientes com queixas vagas de astenia, anemia inexplicada ou síncope, sem externalização evidente de sangue. O toque retal revelando melena na luva firma instantaneamente o diagnóstico de HDA, mudando toda a conduta e triagem.
                         </p>
                      </div>

                      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                         <strong className="text-white text-sm block mb-1">Sondagem Nasogástrica (SNG) e Lavagem</strong>
                         <p className="text-[10px] text-slate-500 font-black mb-2 uppercase tracking-widest">Controverso mas útil na dúvida</p>
                         <p className="text-xs text-slate-400 leading-relaxed">
                           A passagem de SNG <strong>não é rotina obrigatória</strong>. Porém, se o aspirado vier com sangue vivo tinto, confirma o sangramento contínuo severo. Lavar o estômago com SF 0.9% ajuda a clarear o campo para o endoscopista, mas não para a hemorragia ativa.
                         </p>
                      </div>
                   </div>

                   <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-2xl mt-4">
                     <strong className="text-white text-sm block mb-2">Painel Laboratorial da Emergência</strong>
                     <div className="flex flex-wrap gap-2 text-[10px] uppercase font-black">
                       <span className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">Hemograma Completo</span>
                       <span className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">Tipagem e Prova Cruzada (TS/ABO)</span>
                       <span className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">Coagulograma (TAP/RNI/TTPa)</span>
                       <span className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">Função Renal e Ureia</span>
                       <span className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">Função Hepática (TGO/TGP/BR)</span>
                     </div>
                     <p className="text-[10px] text-slate-500 font-medium italic mt-3">
                       *O hematócrito inicial NÃO é confíavel. Na hemorragia aguda perde-se plasma e hemácias igualmente, logo a concentração aparenta normal. A queda real do Hb leva de 24 a 72h para aparecer plenamente após hemodiluição com hidratação.
                     </p>
                   </div>
                </div>

                <div className="bg-indigo-950/20 border border-indigo-900/40 p-6 rounded-[2rem]">
                   <h3 className="text-xl font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     Filtro de Rápida Triagem: É Cirrótico?
                   </h3>
                   <p className="text-xs text-slate-300 leading-relaxed mb-4">
                     Ao receber uma HDA, procure violentamente se existem estigmas de insuficiência hepática e hipertensão portal, porque a mortalidade e as intervenções precoces explodem:
                   </p>
                   <div className="flex flex-wrap gap-2 text-[10px] uppercase font-black">
                     <span className="bg-slate-900 text-indigo-400 border border-indigo-900/50 px-3 py-1 rounded-full">Ascite</span>
                     <span className="bg-slate-900 text-indigo-400 border border-indigo-900/50 px-3 py-1 rounded-full">Icterícia</span>
                     <span className="bg-slate-900 text-indigo-400 border border-indigo-900/50 px-3 py-1 rounded-full">Esplenomegalia</span>
                     <span className="bg-slate-900 text-indigo-400 border border-indigo-900/50 px-3 py-1 rounded-full">Plaquetopenia</span>
                     <span className="bg-slate-900 text-indigo-400 border border-indigo-900/50 px-3 py-1 rounded-full">Encefalopatia</span>
                   </div>
                   <div className="mt-4 p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-xs text-red-200 font-bold max-w-sm">
                     *Na incerteza na emergência caótica, assuma HDA Varicosa e inicie os vasoativos imediatamente.
                   </div>
                </div>
             </motion.div>
          )}

          {/* TAB 3: Choque e Hipovolemia */}
          {activeTab === 'choque' && (
             <motion.div key="choque" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
               <div className="bg-slate-950 border border-rose-900/30 p-6 rounded-[2rem]">
                  <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <HeartPulse /> Choque Hemorrágico & Ressuscitação
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-950/20 border border-red-900/40 p-5 rounded-2xl relative overflow-hidden flex flex-col">
                      <strong className="text-rose-400 text-sm block mb-1">A Tríade Letal do Trauma/Choque</strong>
                      <p className="text-[10px] text-rose-500 font-black mb-3 uppercase tracking-widest">O Ciclo da Morte</p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        A perda maciça de sangue arterial gera hipoperfusão sistêmica. As células sem oxigênio iniciam respiração anaeróbia, produzindo ácido lático (<strong>Acidose</strong>). O choque desliga o centro termorregulador e a reposição de fluidos frios gera <strong>Hipotermia</strong>. Ambas (frio e ácido) inativam as enzimas da cascata de coagulação, gerando <strong>Coagulopatia</strong>, que piora o sangramento.
                      </p>
                    </div>

                    <div className="bg-amber-950/20 border border-amber-900/40 p-5 rounded-2xl relative">
                      <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-2 border-b border-amber-900/40 pb-2 block">Hipotensão Permissiva</span>
                      <p className="text-xs text-amber-200/80 leading-relaxed mb-4">
                        Se entrar despejando galões de Ringer Lactato ou SF 0.9% para subir agressivamente a pressão (ex: alvo 120x80), ocorrerá duas catástrofes: <strong>1)</strong> Aumento brutal da pressão intra-varicosa/arterial (estourando coágulos em formação). <strong>2)</strong> Hemodiluição severa dos fatores de coagulação e plaquetas restantes.
                      </p>
                      <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-900">
                        <strong className="text-amber-500 text-[10px] uppercase font-black block text-center">Alvo de PAM Progressivo</strong>
                        <p className="text-xs text-center text-amber-300 font-bold mt-1">Manejar fluidos para manter PAM ≥ 65 mmHg.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                       <Activity className="text-slate-500" size={16} /> Protocolo de Ação Imediata (HDA Maciça)
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      
                      <div>
                        <strong className="text-slate-300 text-xs block mb-1">1. Vias Aéreas (A)</strong>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          Endoscopistas realizam procedimento com o paciente deitado. Se estiver rebaixado, chocado, agitado ou com hematêmese viva: <strong>Intubação Orotraqueal Rápida (IOT)</strong> para proteger as vias aéreas de broncoaspiração de sangue.
                        </p>
                      </div>

                      <div>
                        <strong className="text-slate-300 text-xs block mb-1">2. Acesso Venoso (C)</strong>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          <strong>Dois acessos periféricos curtos e grossos</strong> (Jelco 14 ou 16G) antecubitais. Acessos periféricos calibrosos infundem fluidos exponencialmente mais rápido do que um cateter venoso central longo devido à Lei de Poiseuille.
                        </p>
                      </div>

                      <div>
                        <strong className="text-slate-300 text-xs block mb-1">3. Transfusão Restritiva</strong>
                        <div className="text-[10px] text-slate-500 space-y-1 mt-1">
                          <p className="bg-slate-950 p-1.5 rounded border border-slate-800"><span className="font-bold text-rose-400">Hb &lt; 7.0 g/dL</span> em pacientes hígidos.</p>
                          <p className="bg-slate-950 p-1.5 rounded border border-slate-800"><span className="font-bold text-rose-400">Hb &lt; 8.0 g/dL</span> em coronariopatas documentados.</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="bg-rose-950/20 border border-rose-900/40 p-5 rounded-2xl text-center">
                    <strong className="text-rose-400 block text-xs uppercase tracking-widest font-black mb-2">Protocolo de Transfusão Maciça (PTM)</strong>
                    <p className="text-xs text-rose-200/80 max-w-2xl mx-auto">
                      Na exanguinação ativa, não transfundir apenas Hemácias (isso dilui fatores de coagulação). Acionar Banco de Sangue com <strong>1:1:1</strong> (1 Concentrado de Hemácias : 1 Plasma Fresco Congelado : 1 Pool de Plaquetas). Aqueça os fluidos para combater a hipotermia da tríade letal.
                    </p>
                  </div>
               </div>
             </motion.div>
          )}

          {/* TAB 4: Tratamento Agudo */}
          {activeTab === 'tratamento' && (
             <motion.div key="tratamento" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
               <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                  <h3 className="text-xl font-black text-sky-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Syringe /> Farmacologia Heamostática
                  </h3>

                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setTreatmentRoute('varicosa')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        treatmentRoute === 'varicosa'
                          ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                          : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-indigo-400'
                      }`}
                    >
                      HDA Varicosa
                    </button>
                    <button
                      onClick={() => setTreatmentRoute('nao-varicosa')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        treatmentRoute === 'nao-varicosa'
                          ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                          : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-emerald-400'
                      }`}
                    >
                      HDA Não Varicosa
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {treatmentRoute === 'varicosa' && (
                      <motion.div
                        key="varicosa"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-indigo-950/20 p-6 rounded-2xl border border-indigo-900/40"
                      >
                        <p className="text-sm text-indigo-300 font-bold mb-4 uppercase tracking-wider text-center border-b border-indigo-900/50 pb-4">
                          Protocolo Agudo: O Tempo é Fígado
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                            <strong className="text-white block text-sm mb-2">1. Vasoativos Esplâncnicos (Imediato)</strong>
                            <p className="text-xs text-slate-400 leading-relaxed mb-3">
                              Fazem vasoconstrição potente do leito venoso abdominal. Isso "fecha a torneira" que alimenta o sistema porta, fazendo a pressão da variz despencar em minutos. <strong>Sempre inicie antes da endoscopia</strong> (na suspeita).
                            </p>
                            <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-900/50 text-[10px] font-mono text-indigo-200">
                              <span className="block mb-1 text-indigo-400 font-bold">Terlipressina (1ª Linha):</span>
                              - 2mg EV a cada 4 horas no dia 1 e 2.<br/>
                              - Reduzir para 1mg se sangramento controlado.<br/>
                              - Duração de 2 a 5 dias.
                              <span className="block mt-2 mb-1 text-sky-400 font-bold">Octreotida (Alternativa):</span>
                              - Bolus em push 50mcg EV, seguido de bomba 50mcg/h.
                            </div>
                          </div>

                          <div className="flex flex-col gap-4">
                            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex-1">
                              <strong className="text-white block text-sm mb-2">2. Antibiótico Profilático</strong>
                              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                                Reduz mortalidade de forma cabal. Sangue no intestino causa proliferação bacteriana gigantesca e translocação portossistêmica num imunodeprimido (Cirrótico).
                              </p>
                              <div className="bg-rose-950/20 p-3 rounded-lg border border-rose-900/40 text-[10px] font-mono text-rose-300 tracking-wide">
                                <strong>Ceftriaxona 1g EV ao dia</strong> (durante 5 a 7 dias inteiros). Impede PBE e infecções de corrente.
                              </div>
                            </div>
                            
                            <div className="bg-amber-950/20 border border-amber-900/40 p-5 rounded-xl flex-1">
                              <strong className="text-amber-500 block text-sm mb-1">Manejo Pós-Endoscopia (TIPS)</strong>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Se a Terapia Endoscópica (Ligadura Elástica) falhar em estancar a variz ou houver ressangramento avassalador, o paciente tem indicação mandatório para <strong>TIPS</strong> (Shunt Portossistêmico Intra-hepático Transjugular) precoce.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {treatmentRoute === 'nao-varicosa' && (
                      <motion.div
                        key="nao-varicosa"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-emerald-950/10 p-6 rounded-2xl border border-emerald-900/40"
                      >
                        <p className="text-sm text-emerald-400 font-bold mb-4 uppercase tracking-wider text-center border-b border-emerald-900/40 pb-4">
                          Protocolo Agudo: Estabilização do Coágulo Úlcera
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                            <strong className="text-white block text-sm mb-2">1. Inibidores de Bomba de Prótons (IBP)</strong>
                            <p className="text-[10px] text-emerald-500 font-black tracking-widest uppercase mb-2">Supressão Ácida Massiva</p>
                            <p className="text-xs text-slate-400 leading-relaxed mb-3">
                              A agregação plaquetária é virtualmente anulada e pepsina destrói coágulos em meio com pH baixo. Elevar o pH intragástrico para <strong>&gt; 6.0</strong> estabiliza fortemente o trombo frágil da borda da úlcera até o fechamento hemostático.
                            </p>
                            <div className="bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/50 text-[10px] font-mono text-emerald-200">
                              <span className="block mb-1 text-emerald-400 font-bold">Posologia de Alto Risco Intravenosa:</span>
                              <strong>Omeprazol ou Pantoprazol</strong><br/>
                              - Bolus Inicial: 80 mg IV.<br/>
                              - Manutenção: 8 mg/hora em BIC por 72 horas (Janela de maior re-sangramento).
                            </div>
                          </div>

                          <div className="flex flex-col gap-4">
                            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex-1 relative overflow-hidden">
                              <span className="absolute right-0 bottom-0 text-[100px] text-zinc-800/10 font-black leading-none pointer-events-none">AINEs</span>
                              <strong className="text-white block text-sm mb-2">2. Suspensão de Ofensores</strong>
                              <ul className="text-xs text-slate-400 leading-relaxed space-y-2">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>Sustar AINEs obrigatoriamente.</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>Interromper Aspirina (AAS). O risco de morte por hemorragia gastrointestinal supera os eventos cardíacos no evento agudo (salvo exceções críticas intra-stent muito recentes).</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Anticoagulantes precisam de avaliação para agentes de reversão imediata (ex: Complexo Protrombínico + Vit K para varfarina instável).</li>
                              </ul>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-center text-center">
                                <strong className="text-sm text-white mb-2">Procinéticos?</strong>
                                <p className="text-xs text-slate-400">
                                   O uso de <strong>Eritromicina</strong> ou <strong>Metoclopramida</strong> EV pouco antes do exame é indicado apenas para esvaziar o estômago empastado de coágulos grossos, caso se suspeite de visibilidade trágica.
                                </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* 3. EDA e Scores */}
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                  <h3 className="text-xl font-black text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ClipboardList /> Estratificadores e Scores na Emergência
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                       <strong className="text-white block mb-1">Glasgow-Blatchford Score (GBS)</strong>
                       <p className="text-[10px] text-amber-500 font-black mb-3 uppercase tracking-widest">Calculado Pré-Endoscopia</p>
                       <p className="text-xs text-slate-300 leading-relaxed mb-3">
                         Utilizado rigorosamente no PS para <strong>libertar segurança de exames ambulatoriais</strong>. Une valores numéricos objetivos: PAS, Frequência Cardíaca, Hemoglobina, Ureia, e presença de síncope/melena.
                       </p>
                       <div className="bg-emerald-950/20 p-2 border border-emerald-900/50 rounded text-emerald-300 text-[10px] uppercase font-black text-center">
                          GBS ≤ 1: Alta Segura. Realizar Endoscopia ambulatorial e dispensar o doente do PS.
                       </div>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                       <strong className="text-white block mb-1">AIMS65 Score</strong>
                       <p className="text-[10px] text-rose-500 font-black mb-3 uppercase tracking-widest">Preditor Iminente de Mortalidade</p>
                       <p className="text-xs text-slate-300 leading-relaxed mb-3">
                         Muito simplificado e feito imediatamente no PA para predição severa de óbito. Critérios binários de sim ou não: <br/><strong>A</strong>lbumina &lt; 3.0 / <strong>I</strong>NR &gt; 1.5 / <strong>M</strong>ental alterado / <strong>S</strong>istólica &lt; 90 / Idade &gt; <strong>65</strong>.
                       </p>
                       <div className="bg-rose-950/20 p-2 border border-rose-900/50 rounded text-rose-300 text-[10px] uppercase font-black text-center mt-[14px]">
                          Escores ≥ 2 devem motivar leito de UTI monitorizado instantâneo e ligar forte os alertas vitais.
                       </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-center text-slate-500 block mt-2">
                     *Nota Acadêmica: O Escore de Rockall incorpora critérios de idade/choque e cruza somando os <strong>Achados Endoscópicos reais vivos</strong> (só aplicável quando ele volta do procedimento limpo da endoscopia para ditar o risco crônico pós-procedimento).
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-indigo-950/20 border border-indigo-900/30 p-6 rounded-[2rem]">
                    <h3 className="text-lg font-black text-indigo-400 uppercase tracking-widest mb-3">Quando Acionar o Endoscópio?</h3>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                       A esmagadora parte das Diretrizes propõem calma. O endoscopista é operador-dependente crítico: num paciente sangrando mal ressuscitado chocado na sala, o risco letal do tubo é pior que a falha terapêutica.
                    </p>
                    <ul className="text-[11px] text-slate-400 space-y-3 font-medium">
                       <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span><strong>Alvo Geral (Maioria):</strong> Endoscopia terapêutica em até 24 horas da admissão, quando perfeitamente ressuscitado.</li>
                       <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span><strong>Casos Mais Agudizados:</strong> Dentro das primeiras 12 horas, se instabilidade franca pesada persistente ou alto-risco cirrótico já visualizado na triagem que não estanca em piso médico.</li>
                    </ul>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem]">
                    <h3 className="text-lg font-black text-white uppercase tracking-widest mb-3">Eritromicina Auxiliar?</h3>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                       Sim, não no contexto antibiótico aqui! Agente Pró-cinético gástrico forte sistêmico. Doente com estômago com 1,5 kg de coágulos grossos dentro e lavagem impossível?
                    </p>
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs leading-relaxed text-slate-400 font-mono">
                       Infundir <strong>250mg de Eritromicina EV lento</strong>, cerca de 30 a 90 minutos antes do Scope descer no cirúrgico. Esvazia o órgão quase todo salvando valioso tempo intra-operatório na câmera.
                    </div>
                  </div>
                </div>

                {/* 4. Erros Fatais */}
                <h3 className="text-xl font-black text-rose-500 uppercase tracking-widest px-2 mt-8 mb-4 flex items-center gap-2">
                   <ShieldAlert /> 5 Erros Fatais no Pronto-Socorro
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                   <div className="bg-rose-950/20 border-l-4 border-rose-600 p-5 rounded-r-2xl overflow-hidden relative">
                     <span className="absolute right-0 top-0 text-[100px] text-rose-900/20 font-black leading-none pointer-events-none">1</span>
                     <strong className="text-white block mb-1">Atrasar a Injeção dos Vasoativos.</strong>
                     <p className="text-xs text-slate-300">Na suspeita de HDA varicosa grave, esperar para injetar a Terlipressina só "se a endoscopia confirmar varizes" é nefasto. Faça empiricamente a suspensão venosa esplâncnica mal sinta os estigmas crônicos do rebaixamento.</p>
                   </div>
                   
                   <div className="bg-rose-950/20 border-l-4 border-rose-600 p-5 rounded-r-2xl overflow-hidden relative">
                     <span className="absolute right-0 top-0 text-[100px] text-rose-900/20 font-black leading-none pointer-events-none">2</span>
                     <strong className="text-white block mb-1">Cegueira ao Antibiótico na Varicosa.</strong>
                     <p className="text-xs text-slate-300">Não dar Ceftriaxona para o cirrótico é imperdoável nas Diretrizes. Metade dos ressangramentos ocorre pós-procedimento infeccioso; ele reduz de forma cabal a mortalidade bruta aguda por impedir a PBE.</p>
                   </div>

                   <div className="bg-rose-950/20 border-l-4 border-rose-600 p-5 rounded-r-2xl overflow-hidden relative">
                     <span className="absolute right-0 top-0 text-[100px] text-rose-900/20 font-black leading-none pointer-events-none">3</span>
                     <strong className="text-white block mb-1">A Má Estratégia de Transfundir até o 'Normal'.</strong>
                     <p className="text-xs text-slate-300">Transfundir um doente isquêmico doente do fígado a torto e direito na emergência até conseguir "Hemoglobina de 11 g/dL" por medo. Você acabou de estourar violentamente as veias das varizes colaterais dele através da elevação pressórica do coágulo sanguíneo pela alta viscosidade imposta (O famoso fenômeno do Efeito de Destamponamento fatal).</p>
                   </div>

                   <div className="bg-rose-950/20 border-l-4 border-rose-600 p-5 rounded-r-2xl overflow-hidden relative">
                     <span className="absolute right-0 top-0 text-[100px] text-rose-900/20 font-black leading-none pointer-events-none">4</span>
                     <strong className="text-white block mb-1">A Hiper-Hidratação a Cegas no Choque.</strong>
                     <p className="text-xs text-slate-300">Você administra 5 Litros no choque em 30 min num cirrótico, varrendo e literalmente 'lavando' as plaquetas e os poucos fatores de coagulação originais que o paciente não fabricava que restavam circulantes.</p>
                   </div>

                   <div className="bg-slate-900 border-l-4 border-indigo-600 p-5 rounded-r-2xl md:col-span-2 overflow-hidden relative">
                     <span className="absolute right-0 top-0 text-[100px] text-indigo-900/20 font-black leading-none pointer-events-none">5</span>
                     <strong className="text-white block mb-1">As Válvulas de Escape Clínico (Saber da Tábua da Salvação).</strong>
                     <p className="text-xs text-slate-300 leading-relaxed">
                       Você deve sempre se perguntar no plantão noturno: E se, e apenas SE o endoscopista não puder curar o coágulo? Qual meu plano B?<br/>
                       Para a Não-Varicosa: Embolização arterial guiada interveccionista ou Cirurgia clássica.<br/>
                       Para Varicosa em sangramento exarcebado que endoscopia falhou: Puxar a ponte mecânica esofágica imposta à força que estanca o trajeto para a Cirurgia / TIPS — A colocação emergencial cega do infame <strong>Balão de Sengstaken-Blakemore</strong> (infla o estômagogástrico 250mL e tensiona a porta superior contra as varizes e infla o esfincter balão distal na zona esofágica em altas tensões). Máx 24h suportadas ante isquemia perfurativa grave orgânica.
                     </p>
                   </div>
                </div>

             </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
