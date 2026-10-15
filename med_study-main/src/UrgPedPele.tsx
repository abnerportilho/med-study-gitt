import React from 'react';
import { Biohazard, AlertCircle, Syringe } from 'lucide-react';

export default function UrgPedPele() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Impetigo */}
        <div className="bg-amber-950/30 p-5 rounded-2xl border-t-4 border-amber-500 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Biohazard className="text-amber-400" />
            <h3 className="text-xl font-bold text-white">Impetigo</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Infecção bacteriana superficial, altamente contagiosa. Comum em pré-escolares, surge sobre picadas/escoriações. Agentes: <i>S. aureus</i> e <i>S. pyogenes</i>.
          </p>
          
          <div className="bg-slate-900 p-3 rounded-lg flex-1 mb-4 border border-slate-700">
            <h4 className="text-amber-300 font-bold text-sm mb-2">Formas Clínicas</h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <strong className="text-white">Não Bolhoso (Crostoso):</strong> Mais comum. Vesículas rompem e formam <span className="text-amber-400 font-bold">crostas melicéricas</span> (cor de mel) sobre base eritematosa. Rosto e braços.
              </div>
              <div className="border-t border-slate-800 pt-2">
                <strong className="text-white">Bolhoso:</strong> <i>S. aureus</i> produtor de toxinas. Bolhas flácidas de conteúdo claro. Mais comum em áreas úmidas (axilas, virilhas).
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-900/50 pt-3">
            <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2"><Syringe size={14} className="text-amber-400"/> Tratamento</h4>
            <div className="space-y-1 text-xs text-slate-300 mt-2">
              <p><strong className="text-amber-300">Forma Localizada:</strong> Tópico (Mupirocina 3x/dia por 7d ou Retapamulina/Ozenoxacina).</p>
              <p><strong className="text-amber-300">Forma Exuberante (VO):</strong> Cefalexina (25-50 mg/kg/dia 6/6h por 7d) ou Amoxc-Clavulanato. (Se MRSA: Clindamicina ou SMZ-TMP).</p>
            </div>
          </div>
        </div>

        {/* Escabiose */}
        <div className="bg-slate-800 p-5 rounded-2xl border-t-4 border-slate-500 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="text-slate-400" />
            <h3 className="text-xl font-bold text-white">Escabiose (Sarna)</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Infestação pelo ácaro <i>Sarcoptes scabiei</i>. Transmissão por contato direto e prolongado ou fômites. Cava túneis na epiderme.
          </p>
          
          <div className="bg-slate-900 p-3 rounded-lg flex-1 mb-4 border border-slate-700">
            <h4 className="text-slate-300 font-bold text-sm mb-2">Quadro Clínico</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• <span className="text-white font-bold">Prurido intenso INFERNAL à noite.</span></li>
              <li>• Pápulas eritematosas, escoriações crostosas, <strong>túneis lineares</strong> discretos.</li>
              <li>• Local: entre dedos, punhos, axilas, genitália, nádegas. (Em bebês: palma da mão e planta do pé).</li>
            </ul>
          </div>
          
          <div className="border-t border-slate-700 pt-3">
            <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2"><Syringe size={14} className="text-slate-400"/> Tratamento</h4>
            <div className="space-y-1 text-xs text-slate-300 mt-2">
              <p><strong className="text-white">Tópico (1ª Escolha):</strong> Permetrina 5%. Aplicar à noite em todo o corpo (pescoço p/ baixo). Lavar após 8-14h. <span className="text-amber-400">Repetir após 7 dias!</span></p>
              <p><strong className="text-white">Sistêmico (Casos Extensos/Surtos):</strong> Ivermectina VO (200 mcg/kg) dose única, repetir em 7 a 14 dias.</p>
              <p className="mt-2 pt-2 border-t border-slate-700 italic text-slate-400">Lavar roupas de cama com água quente e secar ao sol. Ou guardar em sacos fechados por 3 dias.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
