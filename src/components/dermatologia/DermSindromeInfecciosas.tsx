import React, { useState } from 'react';
import { 
  Bug, ShieldAlert, AlertTriangle, Stethoscope, 
  Pill, CheckCircle2, Info, Sparkles, Eye
} from 'lucide-react';

export default function DermSindromeInfecciosas() {
  const [activeTab, setActiveTab] = useState<'bacterianas' | 'micoticas' | 'virais' | 'parasitarias'>('bacterianas');

  return (
    <div className="space-y-6">
      {/* Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'bacterianas', label: 'Bacterianas (Erisipela, Celulite, Impetigo)', badge: 'S. pyogenes & S. aureus' },
          { id: 'micoticas', label: 'Micóticas (Tineas, Ptiríase, Esporotricose)', badge: 'Itraconazol & Terbinafina' },
          { id: 'virais', label: 'Virais (Herpes Simples, Zoster, HPV)', badge: 'Aciclovir & Zoster' },
          { id: 'parasitarias', label: 'Ectoparasitoses (Escabiose & Larva Migrans)', badge: 'Permetrina & Ivermectina' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{t.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${activeTab === t.id ? 'bg-emerald-700/60 text-emerald-100' : 'bg-slate-800 text-slate-400'}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 1. BACTERIANAS */}
      {/* =================================================================== */}
      {activeTab === 'bacterianas' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Piodermites & Infecções de Tecidos Moles
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Erisipela vs Celulite & Impetigo
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Infecções bacterianas mais prevalentes na emergência e atenção primária. A diferenciação anatômica entre derme superficial com linfáticos (erisipela) e derme profunda com hipoderme (celulite) dita a conduta e o espectro antimicrobiano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Erisipela */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-rose-400">Erisipela</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Superficial / S. pyogenes
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Agente Etiológico:</strong> Quase exclusivamente <em>Streptococcus pyogenes</em> (Estreptococo beta-hemolítico do grupo A).</li>
                <li>• <strong>Plano Anatômico:</strong> Derme superficial e vasos linfáticos dérmicos.</li>
                <li>• <strong>Bordas da Lesão:</strong> <strong>BEM DELIMITADAS, nítidas e elevadas</strong> em relação à pele sã adjacente ("degrau" palpável). Eritema vivo brilhante ("vermelho fogo"), calor e edema importante (casca de laranja).</li>
                <li>• <strong>Início:</strong> Súbito com <strong>febre alta (&gt; 38,5ºC) e calafrios intensos</strong> precedendo ou coincidindo com a lesão cutânea.</li>
                <li>• <strong>Antibioticoterapia:</strong> Penicilina Procaína IM (400.000 a 800.000 UI 12/12h) ou Amoxicilina oral 500 mg 8/8h por 10 dias. Se alergia: Claritromicina ou Clindamicina.</li>
              </ul>
            </div>

            {/* Celulite */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-amber-400">Celulite</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Profunda / S. aureus + Strepto
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Agente Etiológico:</strong> <em>Staphylococcus aureus</em> e <em>Streptococcus pyogenes</em>.</li>
                <li>• <strong>Plano Anatômico:</strong> Derme profunda e tecido celular subcutâneo (hipoderme).</li>
                <li>• <strong>Bordas da Lesão:</strong> <strong>IMPRECISAS e mal delimitadas</strong>, esmaecendo gradualmente na pele normal sem degrau evidente.</li>
                <li>• <strong>Início:</strong> Mais insidioso (dias de evolução), febre moderada ou ausente no início.</li>
                <li>• <strong>Antibioticoterapia:</strong> Cobertura obrigatória para Estafilococo produtor de penicilinase: <strong>Cefalexina 500 mg 6/6h VO</strong> ou Cefazolina/Oxacilina IV se internação. Se risco de MRSA comunitário: Sulfametoxazol-Trimetoprima ou Clindamicina.</li>
              </ul>
            </div>
          </div>

          {/* Impetigo Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-emerald-300">Impetigo Não-Bolhoso vs Bolhoso</h3>
              <span className="text-[10px] font-mono text-slate-400">Infecção Pediátrica mais Comum</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                <strong className="text-amber-300 block">Forma Não-Bolhosa (Crostosa / 70%):</strong>
                <p>Pápulas que viram vesículas e rapidamente se transformam em <strong>crostas melicéricas aderentes ("cor de mel")</strong> clássicas ao redor da boca e nariz de crianças. Causado por <em>S. aureus</em> e <em>S. pyogenes</em>.</p>
                <p className="text-slate-400 pt-1"><strong>Alerta:</strong> Pode desencadear <strong>GNPE</strong> (Glomerulonefrite Pós-Estreptocócica), mas NÃO causa Febre Reumática!</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                <strong className="text-cyan-300 block">Forma Bolhosa (30%):</strong>
                <p>Bolhas flácidas com conteúdo purulento causadas exclusivamente pela <strong>toxina esfoliativa A e B de <em>Staphylococcus aureus</em></strong> (cliva a desmogleína 1 na camada granulosa). Comum em recém-nascidos e lactentes.</p>
                <p className="text-slate-400 pt-1"><strong>Tratamento:</strong> Lesões poucas: Mupirocina tópica 2% 3x/dia. Lesões múltiplas: Cefalexina oral 50 mg/kg/dia por 7 dias.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. MICÓTICAS */}
      {/* =================================================================== */}
      {activeTab === 'micoticas' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Micoses Superficiais e Subcutâneas
            </span>
            <h2 className="text-2xl font-black text-white">Dermatofitoses, Pitiríase Versicolor e Esporotricose</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Diagnósticos fundamentais com sinais clínicos e terapêuticas direcionadas por antifúngicos tópicos (alilaminas/azólicos) ou orais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Tineas */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 block uppercase text-[11px]">1. Tineas (Dermatofitoses)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Fungos ceratinofílicos (<em>Trichophyton, Microsporum, Epidermophyton</em>).
              </p>
              <div className="space-y-1 text-slate-400 text-[10px]">
                <p>• <strong>Tinea corporis:</strong> Placa anular com <strong>clareamento central e borda eritematodescamativa ativa e elevada</strong> que avança centrifugamente com prurido.</p>
                <p>• <strong>Tinea capitis:</strong> Placa alopécica descamativa com tonsura em crianças. <strong>Tratamento SEMPRE SISTÊMICO: Griseofulvina 20 mg/kg/dia ou Terbinafina por 6 a 8 semanas</strong> (tópicos não penetram o folículo!).</p>
                <p>• <strong>Tratamento cutâneo:</strong> Terbinafina 1% ou Amorolfina/Ciclopirox tópico 1 a 2x/dia por 2 a 4 semanas.</p>
              </div>
            </div>

            {/* Pitiríase Versicolor */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 block uppercase text-[11px]">2. Pitiríase Versicolor ("Pano Branco")</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Infecção oportunista por leveduras lipofílicas <em>Malassezia spp.</em> em tronco superior, pescoço e braços.
              </p>
              <div className="space-y-1 text-slate-400 text-[10px]">
                <p>• <strong>Clínica:</strong> Múltiplas máculas hipocrômicas, hipercrômicas ou eritematosas ("versicolor") confluentes com fina descamação furfurácea.</p>
                <p>• <strong>Sinais Semiológicos:</strong> Sinal da unha de Zileri (+) e Sinal do Lençol (+). Lâmpada de Wood com fluorescência amarelo-dourada.</p>
                <p>• <strong>Tratamento:</strong> Xampu de Cetoconazol 2% ou Sulfeto de Selênio 2,5% no banho por 14 dias; se disseminado: Fluconazol 300 mg/semana por 2 semanas.</p>
              </div>
            </div>

            {/* Esporotricose */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 block uppercase text-[11px]">3. Esporotricose Felina (Zoonose)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Micose subcutânea causada por <em>Sporothrix brasiliensis</em> transmitida por arranhadura ou mordedura de gato infectado.
              </p>
              <div className="space-y-1 text-slate-400 text-[10px]">
                <p>• <strong>Forma Linfocutânea (80%):</strong> Nódulo ou goma ulcerada no ponto de inoculação (cancro esporotricótico) seguido por <strong>linfangite nodular ascendente em rosário</strong>.</p>
                <p>• <strong>Diagnóstico:</strong> Cultura para fungos a 25ºC (padrão-ouro).</p>
                <p>• <strong>Tratamento de Escolha:</strong> <strong>Itraconazol 100 a 200 mg/dia VO</strong> durante as refeições por 3 a 6 meses (manter até 2 a 4 semanas após cura clínica completa).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. VIRAIS */}
      {/* =================================================================== */}
      {activeTab === 'virais' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Dermatoviroses Comuns
            </span>
            <h2 className="text-2xl font-black text-white">Herpes Zoster, Herpes Simples e HPV</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Zoster */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-amber-300">Herpes Zoster (Cobreiro)</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-800">
                  Reativação de VZV
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Distribuição:</strong> Vesículas agrupadas sobre base eritematosa estritamente <strong>unilaterais em faixa metamérica</strong> seguindo o trajeto de um dermátomo (torácico 50%, trigeminal 15%).</li>
                <li>• <strong>Dor Neuropática:</strong> Em queimação ou choque, frequentemente precede as lesões de pele em 48 a 72 horas.</li>
                <li>• <strong>Sinal de Hutchinson:</strong> Vesículas na ponta ou asa do nariz indicam acometimento do ramo nasociliar da divisão oftálmica do Trigêmeo (V1) = <strong>risco iminente de cegueira e ceratite herpética</strong> (avaliação oftalmológica urgente).</li>
                <li>• <strong>Posologia do Aciclovir Oral:</strong> <strong>800 mg de 4 em 4 horas (5 vezes ao dia) por 7 dias</strong> iniciado nas primeiras 72 horas para prevenir a terrível <strong>Neuralgia Pós-Herpética</strong> (tratar sequela com Pregabalina ou Gabapentina).</li>
              </ul>
            </div>

            {/* HPV */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-cyan-300">Verrugas Virais & HPV</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-200 border border-cyan-800">
                  Proliferação Epitelial
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Verruga Vulgar (HPV 2 e 4):</strong> Pápulas hiperceratóticas ásperas no dorso de mãos e dedos.</li>
                <li>• <strong>Verruga Plantar ("Olho de Peixe" / HPV 1):</strong> Hiperqueratose dolorosa à compressão lateral que <strong>interrompe as linhas dermatoglíficas</strong> e revela pontos negros (capilares trombosados à raspagem). Diferencial com calo (o calo não sangra e preserva as linhas da pele).</li>
                <li>• <strong>Condiloma Acuminado (HPV 6 e 11):</strong> Lesões vegetantes em "couve-flor" em genitália e ânus.</li>
                <li>• <strong>Tratamento:</strong> Crioterapia com nitrogênio líquido, ácido salicílico + lático 15% tópico, Imiquimode 5% ou eletrocoagulação.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. ECTOPARASITOSES */}
      {/* =================================================================== */}
      {activeTab === 'parasitarias' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Parasitoses Cutâneas
            </span>
            <h2 className="text-2xl font-black text-white">Escabiose (Sarna) & Larva Migrans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Escabiose */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-amber-300">Escabiose Humana (Sarna)</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-800">
                  Sarcoptes scabiei
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Prurido Noturno Violento:</strong> Piora crucial ao deitar pelo aquecimento do leito, que estimula a movimentação do ácaro fêmea.</li>
                <li>• <strong>Lesões Patognomônicas:</strong> <strong>Túneis acarianos</strong> (trajetos lineares milimétricos com vesícula terminal) em <strong>espaços interdigitais das mãos, punhos, aréolas mamárias, axilas e glande/pênis</strong> (nódulos escabióticos genitais). Poupa face e couro cabeludo em adultos!</li>
                <li>• <strong>Tratamento Mandatório (Tratar a Família Toda!):</strong>
                  <br />1) <strong>Permetrina 5% loção:</strong> Aplicar do pescoço aos pés à noite, retirar após 8-12h no banho matinal. <strong>Repetir após 7 dias</strong> (mata ninfas eclodidas).
                  <br />2) <strong>Ivermectina oral:</strong> 200 mcg/kg dose única, repetida rigorosamente após 7 a 14 dias.
                  <br />3) <strong>Higiene ambiental:</strong> Lavar roupas de cama e uso pessoal em água quente ou isolar em saco plástico fechado por 72h.
                </li>
              </ul>
            </div>

            {/* Larva Migrans */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-cyan-300">Larva Migrans Cutânea ("Bicho Geográfico")</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-200 border border-cyan-800">
                  Ancylostoma braziliense
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Mecanismo de Transmissão:</strong> Penetração transcutânea de larvas presentes em areia ou solo contaminado por fezes de cães e gatos (praias, parques infantis).</li>
                <li>• <strong>Lesão Típica:</strong> Cordão eritematoso serpiginoso e sinuoso muito pruriginoso que avança de 1 a 2 cm ao dia, localizado preferencialmente nos pés, nádegas e pernas.</li>
                <li>• <strong>Tratamento:</strong>
                  <br />• Lesões únicas/poucas: Tiabendazol pomada 5% 3x/dia por 10 a 14 dias.
                  <br />• Lesões múltiplas: <strong>Albendazol 400 mg/dia VO por 3 a 5 dias</strong> ou <strong>Ivermectina 200 mcg/kg em dose única</strong>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
