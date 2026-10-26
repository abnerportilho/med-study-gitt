import React from 'react';
import { 
  AlertCircle, ShieldAlert, Shield, Globe, Users, TrendingDown,
  FileText, Activity, AlertTriangle, CheckCircle2, BookmarkCheck, BarChart2
} from 'lucide-react';

export default function PreEclampsiaConceitosRisco() {
  return (
    <div className="space-y-6">
      
      {/* 1. CLASSIFICAÇÃO & DEFINIÇÕES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* DENTRO DA SHEG */}
        <div className="bg-slate-900 border-2 border-red-800/60 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-red-900/60 pb-3">
            <h3 className="text-base sm:text-lg font-black text-red-300 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="text-red-400" /> DENTRO DA SHEG (&gt; 20ª Semana)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-950 text-red-200 border border-red-700">Surge pós-20 sem</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-black text-amber-400 uppercase">1. Hipertensão Arterial Gestacional (HAG)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                PAS ≥ 140 ou PAD ≥ 90 mmHg (2 medidas com espaçamento de 4h) após a 20ª semana <strong>SEM proteinúria e SEM lesões de órgãos-alvo</strong>.
              </p>
              <p className="text-[11px] text-amber-300 font-bold mt-1">⚠️ Até 25% das pacientes com HAG evoluem para Pré-Eclâmpsia ao longo da gestação!</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-black text-red-400 uppercase">2. Pré-Eclâmpsia (PE)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                HAG + <strong>Proteinúria</strong> OU <strong>Disfunção/Lesão de Órgão-Alvo</strong> (clínica, laboratorial ou dopplervelocimétrica).
              </p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">
                <em>*Nota clínica:* NÃO se usam mais os termos "PE Leve" e "PE Grave". A terminologia atual é PE com ou sem sinais de deterioração clínica/laboratorial, sendo um processo dinâmico. <strong>Toda PE interna!</strong></em>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-black text-purple-400 uppercase">3. Pré-Eclâmpsia Sobreposta à HAC</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hipertensa crônica prévia que após a 20ª semana apresenta <strong>surgimento de proteinúria</strong> (ou triplicação da prévia) OU <strong>lesão de órgão-alvo nova</strong>. Mais precoce e grave que PE isolada.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-black text-rose-400 uppercase">4. Iminência de Eclâmpsia</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sintomas neurológicos/visuais/hepáticos (Cefaleia refratária, Escotomas, Epigastralgia/dor em HCD) OU <strong>Crise Hipertensiva (PAS ≥ 160 ou PAD ≥ 110 mmHg)</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-red-700 space-y-1 bg-red-950/20">
              <span className="text-xs font-black text-red-300 uppercase">5. Eclâmpsia & Sineclâmpsia</span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Presença de <strong>crise convulsiva tônico-clônica generalizada</strong> ou <strong>coma (sineclâmpsia)</strong> em gestante/puérpera com pré-eclâmpsia, sem outra causa neurológica identificada.
              </p>
            </div>

            <div className="p-4 bg-fuchsia-950/40 rounded-2xl border border-fuchsia-700 space-y-1">
              <span className="text-xs font-black text-fuchsia-300 uppercase">6. Síndrome HELLP</span>
              <p className="text-xs text-slate-200 leading-relaxed">
                <strong>H</strong>emolysis (DHL ≥ 600 UI/L, BT ≥ 1,2 mg/dL, esquizócitos) + <strong>E</strong>levated <strong>L</strong>iver enzymes (TGO/TGP ≥ 70 UI/L) + <strong>L</strong>ow <strong>P</strong>latelets (Plaquetas ≤ 100.000 / mm³).
              </p>
            </div>
          </div>
        </div>

        {/* FORA DA SHEG & CONTINUUM */}
        <div className="bg-slate-900 border-2 border-slate-700 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base sm:text-lg font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Shield className="text-blue-400" /> FORA DA SHEG / DIAGNÓSTICOS DIFERENCIAIS
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-950 text-blue-200 border border-blue-700">Diferenciais</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-black text-blue-400 uppercase">Hipertensão Arterial Crônica (HAC)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                PAS ≥ 140 ou PAD ≥ 90 mmHg identificada <strong>ANTES da 20ª semana</strong> de gestação ou que persiste além de 12 semanas pós-parto. Fator de alto risco para PE sobreposta.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-black text-teal-400 uppercase">Hipertensão do Jaleco Branco</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                PAS ≥ 140 ou PAD ≥ 90 mmHg no consultório, mas normal no ambiente domiciliar (PAS &lt; 135 e PAD &lt; 85 mmHg em MAPA ou MRPA).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-black text-indigo-400 uppercase">Hipertensão Mascarada</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                PA aparentemente normal no consultório (&lt; 140/90), mas elevada no MAPA/MRPA (PAS ≥ 135 ou PAD ≥ 85 mmHg).
              </p>
              <p className="text-[10px] text-amber-300 font-bold mt-1">
                ⚠️ Jaleco branco e Mascarada aumentam o risco de evolução para PE no mesmo patamar de risco da HAC!
              </p>
            </div>

            {/* BOX CONTINUUM DA SHEG */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border-2 border-indigo-900/60 space-y-2">
              <span className="text-xs font-black text-indigo-300 uppercase flex items-center gap-1.5">
                <Activity size={15} /> O Continuum da SHEG
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Até <strong>25% das pacientes com HAG</strong> desenvolverão PE ao longo da gravidez.</li>
                <li>HAC é forte fator de risco (RR 5,1) para pré-eclâmpsia sobreposta.</li>
                <li>Pré-eclâmpsia é <strong>doença progressiva e dinâmica</strong>: quanto mais precoce o diagnóstico (&lt; 34 sem), pior o prognóstico esperado materno e fetal.</li>
                <li>Se não houver PA basal antes de 20 semanas (típico de falta de pré-natal), <strong>tratar sempre como Pré-Eclâmpsia</strong> — subtratar gera catástrofe materna.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FATORES DE RISCO (BARTSCH ET AL., BMJ 2016 META-ANÁLISE COM 25 MILHÕES DE GESTAÇÕES) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase flex items-center gap-2">
              <ShieldAlert className="text-amber-400" /> Fatores de Risco Clínicos & Força de Associação (RR)
            </h3>
            <p className="text-xs text-slate-400">
              Referência: <strong>Bartsch et al., BMJ 2016</strong> (92 estudos, &gt; 25 milhões de gestações) + <strong>ASPRE Trial (NEJM 2017)</strong>.
            </p>
          </div>
          <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-700 rounded-full text-xs font-black self-start">
            Nível de Evidência B / RCTs Nível I
          </span>
        </div>

        {/* TABELA DE ESTRATIFICAÇÃO DE RISCO */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-black uppercase text-[11px]">
                <th className="p-3">Fator de Risco</th>
                <th className="p-3 text-center">Risco Relativo (RR) IC95%</th>
                <th className="p-3 text-center">Taxa de PE no Grupo Exposto</th>
                <th className="p-3 text-center">Classificação ACOG/NICE/FEBRASGO</th>
                <th className="p-3">Mecanismo Fisiopatológico Específico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
              <tr className="hover:bg-slate-800/50 bg-red-950/20">
                <td className="p-3 font-bold text-white">Pré-Eclâmpsia em Gestação Prévia</td>
                <td className="p-3 text-center font-mono font-black text-red-400">8,4 (7,1 – 9,9)</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-red-900 text-red-200 rounded font-black text-[10px]">ALTO RISCO (1 basta)</span></td>
                <td className="p-3 text-[11px]">Memória imunológica / dano endotelial vascular prévio persistente.</td>
              </tr>
              <tr className="hover:bg-slate-800/50 bg-red-950/15">
                <td className="p-3 font-bold text-white">Síndrome Antifosfolípide (SAAF)</td>
                <td className="p-3 text-center font-mono font-black text-red-400">Maior taxa (não o maior RR)</td>
                <td className="p-3 text-center font-mono font-black text-rose-300">17,3% (6,8 – 31,4%)</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-red-900 text-red-200 rounded font-black text-[10px]">ALTO RISCO (1 basta)</span></td>
                <td className="p-3 text-[11px]">Trombose microvascular direta no leito placentário (mecanismo trombótico primário).</td>
              </tr>
              <tr className="hover:bg-slate-800/50 bg-red-950/10">
                <td className="p-3 font-bold text-white">Hipertensão Arterial Crônica (HAC)</td>
                <td className="p-3 text-center font-mono font-black text-amber-400">5,1 (4,0 – 6,5)</td>
                <td className="p-3 text-center font-mono font-bold text-amber-300">16,0% (12,6 – 19,7%)</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-red-900 text-red-200 rounded font-black text-[10px]">ALTO RISCO (1 basta)</span></td>
                <td className="p-3 text-[11px]">Disfunção endotelial basal pré-existente satura a reserva vascular ao 2º insulto.</td>
              </tr>
              <tr className="hover:bg-slate-800/50 bg-red-950/10">
                <td className="p-3 font-bold text-white">Diabetes Mellitus Pré-Gestacional (DM 1 ou 2)</td>
                <td className="p-3 text-center font-mono font-black text-amber-400">3,7 (3,1 – 4,3)</td>
                <td className="p-3 text-center font-mono font-bold text-amber-300">11,0% (8,4 – 13,8%)</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-red-900 text-red-200 rounded font-black text-[10px]">ALTO RISCO (1 basta)</span></td>
                <td className="p-3 text-[11px]">Glicotoxicidade, estresse oxidativo, resistência insulínica e vasculopatia.</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-white">Obesidade Pré-Gestacional (IMC &gt; 30 kg/m²)</td>
                <td className="p-3 text-center font-mono font-black text-amber-400">2,8 (2,6 – 3,1)</td>
                <td className="p-3 text-center font-mono font-bold text-slate-300">7,1% (6,1 – 8,2%)</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-amber-900 text-amber-200 rounded font-black text-[10px]">ALTO / MODERADO (diverge)</span></td>
                <td className="p-3 text-[11px]">Inflamação sistêmica de baixo grau crônica somada ao estado pró-inflamatório.</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-white">Doença Renal Crônica (DRC)</td>
                <td className="p-3 text-center font-mono font-black text-amber-400">1,8 (1,5 – 2,1)</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-red-900 text-red-200 rounded font-black text-[10px]">ALTO RISCO (ACOG/NICE)</span></td>
                <td className="p-3 text-[11px]">Sobrecarga glomerular e lesão endotelial prévia. Classificada como alto pela gravidade do desfecho.</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-white">Nuliparidade</td>
                <td className="p-3 text-center font-mono font-black text-amber-400">2,1 (1,9 – 2,4)</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-sky-900 text-sky-200 rounded font-black text-[10px]">MODERADO (requer ≥ 2)</span></td>
                <td className="p-3 text-[11px]">Ausência de exposição prévia a antígenos paternos e trofoblásticos.</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-white">Reprodução Assistida (FIV / ART)</td>
                <td className="p-3 text-center font-mono font-black text-amber-400">1,8 (1,6 – 2,1)</td>
                <td className="p-3 text-center font-mono font-bold text-slate-300">6,2% (4,7 – 7,x)</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-sky-900 text-sky-200 rounded font-black text-[10px]">MODERADO (requer ≥ 2)</span></td>
                <td className="p-3 text-[11px]">Ausência de corpo lúteo em ciclos programados + fatores imunológicos.</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 font-bold text-white">Idade Materna ≥ 35–40 anos</td>
                <td className="p-3 text-center font-mono font-black text-amber-400">1,2 (1,1 – 1,3)</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center"><span className="px-2 py-0.5 bg-sky-900 text-sky-200 rounded font-black text-[10px]">MODERADO (requer ≥ 2)</span></td>
                <td className="p-3 text-[11px]">Envelhecimento vascular e aumento de comorbidades subclínicas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PÉROLA EPIDEMIOLÓGICA: RR ALTO vs FRAÇÃO ATRIBUÍVEL POPULACIONAL */}
        <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-700/70 text-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-black uppercase">
            <BookmarkCheck size={16} /> Pérola de Prova & Saúde Pública: RR Alto vs. Fração Atribuível Populacional
          </div>
          <p className="text-slate-200 leading-relaxed">
            <strong>SAAF</strong> tem a maior taxa de PE no grupo exposto (17,3%) e altíssimo risco individual, mas é rara na população geral (baixa fração atribuível populacional). Por outro lado, <strong>nuliparidade (RR 2,1)</strong> e <strong>obesidade (RR 2,8)</strong> têm riscos relativos moderados, porém são extremamente comuns — respondendo pela <strong>maioria absoluta dos casos de pré-eclâmpsia na população</strong>. Isso é determinante para a criação de políticas públicas de rastreio e profilaxia.
          </p>
        </div>
      </div>

      {/* 3. EPIDEMIOLOGIA: PANORAMA GLOBAL vs BRASIL */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Globe className="text-teal-400" />
          <h3 className="text-base sm:text-lg font-black text-white uppercase">Epidemiologia Global vs. Realidade Brasileira</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GLOBAL */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-black text-teal-300 uppercase tracking-wider block">Panorama Global</span>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="p-2 bg-slate-900 rounded border border-slate-800">
                • <strong>Incidência de Pré-Eclâmpsia:</strong> 2% a 8% das gestações (ACOG). Eclâmpsia em 0,1% a 2,7%.
              </li>
              <li className="p-2 bg-slate-900 rounded border border-slate-800">
                • <strong>Mortalidade Materna Mundial:</strong> 2ª causa de morte materna no mundo (atrás de hemorragia), representando 10% a 15% dos óbitos globais.
              </li>
              <li className="p-2 bg-slate-900 rounded border border-slate-800">
                • <strong>Desigualdade:</strong> 99% das mortes ocorrem em países de média e baixa renda.
              </li>
              <li className="p-2 bg-slate-900 rounded border border-slate-800">
                • <strong>América Latina e Caribe:</strong> Hipertensão gestacional responde por quase 26% das mortes maternas (muito acima da média global de 16%).
              </li>
            </ul>
          </div>

          {/* BRASIL */}
          <div className="p-5 bg-slate-950 rounded-2xl border-2 border-red-900/60 space-y-3">
            <span className="text-xs font-black text-red-300 uppercase tracking-wider block">Panorama Brasil (Datasus / Febrasgo)</span>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="p-2 bg-slate-900 rounded border border-red-900/50 text-red-200">
                • <strong>1ª CAUSA de Morte Materna no Brasil:</strong> Diferente do mundo onde é a 2ª, no Brasil as doenças hipertensivas são a principal causa de óbito materno (~20% a 25% do total).
              </li>
              <li className="p-2 bg-slate-900 rounded border border-slate-800">
                • <strong>Incidência:</strong> PE em ~7,5% e Eclâmpsia em 0,2% a 0,8%. Responde por 20% de todos os desfechos maternos graves.
              </li>
              <li className="p-2 bg-slate-900 rounded border border-slate-800">
                • <strong>Óbitos por Eclâmpsia (DATASUS CID O15 2019-2024):</strong> 798 óbitos no período, com queda de 30,6% (160 óbitos em 2019 para 111 em 2024), mas RMM segue distante da meta ODS (30/100 mil até 2030).
              </li>
              <li className="p-2 bg-slate-900 rounded border border-slate-800 text-amber-200">
                • <strong>Disparidade Crítica no Acesso ao Pré-Natal:</strong> Mortalidade materna entre mulheres indígenas é <strong>3,3x maior que a média nacional</strong> (cobertura de 6+ consultas é de apenas 62% vs 82% geral). Isso se conecta diretamente com a história de pacientes que faltam ao pré-natal!
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
