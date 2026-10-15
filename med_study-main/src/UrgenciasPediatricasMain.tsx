import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import UrgPedIVAS from './UrgPedIVAS';
import UrgPedLaringite from './UrgPedLaringite';
import UrgPedFaringite from './UrgPedFaringite';
import UrgPedOtite from './UrgPedOtite';
import UrgPedSinusite from './UrgPedSinusite';
import UrgPedPneumonia from './UrgPedPneumonia';
import UrgPedAsma from './UrgPedAsma';
import UrgPedCefaleia from './UrgPedCefaleia';
import UrgPedTCE from './UrgPedTCE';
import UrgPedDiarreia from './UrgPedDiarreia';
import UrgPedPele from './UrgPedPele';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TABS = [
  { id: 'ivas', label: 'IVAS' },
  { id: 'laringite', label: 'Laringite' },
  { id: 'faringite', label: 'Faringite & Amigdalite' },
  { id: 'otite', label: 'Otite' },
  { id: 'sinusite', label: 'Sinusite' },
  { id: 'pneumonia', label: 'Pneumonia' },
  { id: 'asma', label: 'Asma & Bronquiolite' },
  { id: 'cefaleia', label: 'Cefaleia' },
  { id: 'tce', label: 'TCE' },
  { id: 'diarreia', label: 'Diarreia' },
  { id: 'pele', label: 'Lesões de Pele' }
];

export default function UrgenciasPediatricasMain() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const renderContent = () => {
    switch (activeTab) {
      case 'ivas': return <UrgPedIVAS />;
      case 'laringite': return <UrgPedLaringite />;
      case 'faringite': return <UrgPedFaringite />;
      case 'otite': return <UrgPedOtite />;
      case 'sinusite': return <UrgPedSinusite />;
      case 'pneumonia': return <UrgPedPneumonia />;
      case 'asma': return <UrgPedAsma />;
      case 'cefaleia': return <UrgPedCefaleia />;
      case 'tce': return <UrgPedTCE />;
      case 'diarreia': return <UrgPedDiarreia />;
      case 'pele': return <UrgPedPele />;
      default: return null;
    }
  };

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Stethoscope size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Emergência</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Urgências Pediátricas</h1>
          <p className="text-slate-400 mt-2">Dra. Angelo Carneiro Bonadio</p>
        </div>
      </header>
      
      {/* Horizontal Scroll Navigation */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800 text-slate-200">
        {renderContent()}
      </div>
    </>
  );
}
