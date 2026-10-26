import React from 'react';
import { 
  Sparkles, Layers, AlertCircle, Heart, Activity, 
  MapPin, Eye, ShieldAlert, Zap, Dna, ArrowRight
} from 'lucide-react';

export default function EndoConceitoEpidemio() {
  return (
    <div className="space-y-8">
      {/* HEADER DO EIXO 1 */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800">
            <Layers size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">
              Eixo 1 · Conceito, Anatomia & Epidemiologia
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              1. Conceito, Fenótipos Clínicos e Epidemiologia
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          A endometriose é uma <strong>doença inflamatória crônica, sistêmica e estrogênio-dependente</strong> caracterizada pela presença de glândulas e estroma semelhantes ao endométrio fora da cavidade uterina. Embora benigna do ponto de vista histológico, apresenta comportamento invasivo, fibroso e potencialmente incapacitante. <em>A doença não se resume à "menstruação fora do lugar".</em>
        </p>
      </div>

      {/* EPIDEMIOLOGIA & IMPACTO */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-lg">
          <span className="text-xs font-bold uppercase text-slate-400 block">Prevalência Populacional</span>
          <span className="text-3xl font-black text-rose-400 font-mono">Até 10%</span>
          <span className="text-xs text-slate-400 block">das mulheres em idade reprodutiva (menacme)</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-lg">
          <span className="text-xs font-bold uppercase text-slate-400 block">Mulheres com Endometriose</span>
          <span className="text-3xl font-black text-amber-400 font-mono">30% a 50%</span>
          <span className="text-xs text-slate-400 block">apresentam infertilidade conjugal associada</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-lg">
          <span className="text-xs font-bold uppercase text-slate-400 block">Investigação de Infertilidade</span>
          <span className="text-3xl font-black text-purple-400 font-mono">Até 50%</span>
          <span className="text-xs text-slate-400 block">das mulheres inférteis recebem o diagnóstico</span>
        </div>
      </div>

      {/* IMPACTO BIOPSICOSSOCIAL */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-rose-400">
          <Heart size={18} />
          <h4 className="text-xs font-black uppercase tracking-wider">Impacto Multidimensional na Vida da Mulher</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          No Brasil e no mundo, o atraso diagnóstico médio varia de <strong>7 a 10 anos</strong> desde o início dos primeiros sintomas na adolescência até a elucidação diagnóstica. A doença acarreta impacto profundo sobre dor física, sexualidade (dispareunia de profundidade), rendimento no trabalho e estudo (absenteísmo recorrente), saúde mental (ansiedade e depressão) e planejamento reprodutivo.
        </p>
      </div>

      {/* OS TRÊS FENÓTIPOS CLÍNICOS (PODEM COEXISTIR) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400">
            <Layers size={20} />
            <h4 className="text-sm font-black uppercase tracking-wider">
              Os 3 Fenótipos Anatômicos (Apresentações que Podem Coexistir)
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-800">
            Biótipos da Doença
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. PERITONEAL SUPERFICIAL */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                  Fenótipo 1
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Superficial</span>
              </div>
              <h5 className="text-base font-black text-white">Endometriose Peritoneal</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lesões superficiais sobre o peritônio parietal e visceral que <strong>não ultrapassam 5 mm de profundidade</strong>. 
              </p>
              
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px]">
                <strong className="text-slate-300 block">Evolução Cromática das Lesões:</strong>
                <div className="flex items-center gap-2 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span><strong>Vermelhas:</strong> Iniciais, hipervascularizadas e altamente ativas.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 shrink-0"></span>
                  <span><strong>Negras / Castanhas:</strong> Acúmulo de hemossiderina ("pólvora").</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0"></span>
                  <span><strong>Brancas:</strong> Fibróticas, cicatriciais e quiescentes.</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300 mt-3">
              ⚠️ <em>Pequenas lesões peritoneais podem ser intensamente dolorosas; a ultrassonografia e a RNM habituais frequentemente não as detectam.</em>
            </div>
          </div>

          {/* 2. OVARIANA (ENDOMETRIOMA) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  Fenótipo 2
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Ovariano</span>
              </div>
              <h5 className="text-base font-black text-white">Endometrioma Ovariano</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pseudocisto ovariano formado pela invaginação do córtex com acúmulo de sangue antigo degradado espesso (<strong>"cisto em chocolate"</strong>).
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                <div>• <strong>Imagem:</strong> Padrão clássico em "vidro fosco" (<em>ground-glass</em>) com ecos homogêneos finos e vascularização periférica ao Doppler.</div>
                <div>• <strong>Impacto:</strong> Inflamação local, ferro livre tóxico e estresse oxidativo que causam fibrose e redução da reserva folicular.</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-rose-300 mt-3">
              ⚡ <em>A cistectomia cirúrgica agressiva remove córtex são e reduz drasticamente o AMH (reserva ovariana).</em>
            </div>
          </div>

          {/* 3. PROFUNDA INFILTRATIVA */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                  Fenótipo 3
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Infiltrativo &gt; 5mm</span>
              </div>
              <h5 className="text-base font-black text-white">Endometriose Profunda</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lesões que <strong>infiltram mais de 5 mm sob a superfície peritoneal</strong>, caracterizadas por proliferação fibromuscular, nódulos e aderências densas.
              </p>

              <div className="space-y-1 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                <strong className="text-purple-300 block">Principais Sítios Infiltrados:</strong>
                <div>• Ligamentos uterossacros e toro uterino</div>
                <div>• Fundo de saco posterior e septo retovaginal</div>
                <div>• Retossigmoide (parede anterior do reto)</div>
                <div>• Bexiga, ureteres e raízes nervosas sacrais</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-purple-300 mt-3">
              🎯 <em>Exige mapeamento completo por USG especializada ou RNM antes de qualquer decisão cirúrgica.</em>
            </div>
          </div>
        </div>

        {/* DISSOCIAÇÃO CLÍNICO-ANATÔMICA — REGRA DE OURO */}
        <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/80 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap size={18} className="fill-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider">
              ⚡ REGRA DE OURO — O Fenótipo Anatômico Não Prediz, Sozinho, a Intensidade da Dor
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Existe frequente <strong>dissociação clínico-anatômica</strong>: uma paciente com pequenas lesões superficiais avermelhadas no peritônio pode apresentar dor pélvica refratária e incapacitante (pela hiperprodução de prostaglandinas e citocinas), enquanto outra paciente com volumoso endometrioma de 8 cm ou nódulo retal profundo pode ser completamente assintomática e descobrir a lesão apenas na investigação de infertilidade.
          </p>
        </div>
      </div>

      {/* SÍTIOS ANATÔMICOS FREQUENTES E RAROS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 border-b border-slate-800 pb-2">
            <MapPin size={18} />
            <h5 className="text-xs font-black uppercase tracking-wider">Sítios Pélvicos Mais Frequentes</h5>
          </div>
          <ul className="space-y-1.5 text-slate-300">
            <li>• <strong>Ovários (Endometriomas):</strong> Sítio mais comum de acometimento macroscópico.</li>
            <li>• <strong>Peritônio pélvico:</strong> Fossa ovárica e folheto anterior e posterior.</li>
            <li>• <strong>Compartimento posterior:</strong> Ligamentos uterossacros, fundo de saco de Douglas (fossa retouterina) e septo retovaginal.</li>
            <li>• <strong>Trato gastrointestinal:</strong> Reto e cólon sigmoide (responsável por disquezia cíclica).</li>
            <li>• <strong>Trato urinário:</strong> Bexiga (músculo detrusor) e ureteres (risco de estenose silenciosa).</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-2">
            <ShieldAlert size={18} />
            <h5 className="text-xs font-black uppercase tracking-wider">Sítios Extrapélvicos e Raros</h5>
          </div>
          <ul className="space-y-1.5 text-slate-300">
            <li>• <strong>Parede abdominal e cicatriz umbilical:</strong> Típico após cesariana prévia (nódulo palpável doloroso cíclico).</li>
            <li>• <strong>Diafragma e tórax (Endometriose Torácica):</strong> Catamênio torácico, dor escapular direita cíclica, pneumotórax catamenial ou hemotórax.</li>
            <li>• <strong>Plexos nervosos pélvicos:</strong> Nervo ciático e plexo sacral (lombociatalgia cíclica).</li>
            <li>• <strong>Locais raros:</strong> Apêndice cecal, íleo terminal e canal inguinal.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
