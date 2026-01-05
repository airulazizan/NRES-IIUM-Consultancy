
import React from 'react';
import { Filter, ChevronRight, BookOpen, Clock } from 'lucide-react';

interface SidebarProps {
  selectedDasar: string[];
  setSelectedDasar: (val: string[]) => void;
  selectedFasa: string[];
  setSelectedFasa: (val: string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedDasar, setSelectedDasar, selectedFasa, setSelectedFasa }) => {
  const toggleDasar = (dasar: string) => {
    setSelectedDasar(prev => 
      prev.includes(dasar) ? prev.filter(d => d !== dasar) : [...prev, dasar]
    );
  };

  const toggleFasa = (fasa: string) => {
    setSelectedFasa(prev => 
      prev.includes(fasa) ? prev.filter(f => f !== fasa) : [...prev, fasa]
    );
  };

  const dasars = ["SUP Roadmap 2018–2030", "MPSR 2021–2030"];
  const fasas = ["F1", "F2", "F3", "F4", "F5", "F6"];

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
      <div className="p-6">
        <div className="flex items-center gap-2 text-indigo-600 mb-8">
          <Filter size={20} />
          <span className="font-bold tracking-tight uppercase text-sm">Penapis Kajian</span>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold text-sm uppercase tracking-wider">
              <BookOpen size={16} className="text-indigo-500" />
              Dasar / Roadmap
            </div>
            <div className="space-y-2">
              {dasars.map(d => (
                <button
                  key={d}
                  onClick={() => toggleDasar(d)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                    selectedDasar.includes(d) 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium ring-2 ring-indigo-500/10' 
                      : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {d}
                    {selectedDasar.includes(d) && <ChevronRight size={14} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold text-sm uppercase tracking-wider">
              <Clock size={16} className="text-indigo-500" />
              Fasa Kajian (TOR)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {fasas.map(f => (
                <button
                  key={f}
                  onClick={() => toggleFasa(f)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border text-center ${
                    selectedFasa.includes(f)
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
          <p className="font-semibold text-slate-700 mb-1">Nota Data:</p>
          Data merangkumi perancangan sistem plastik negara serta pelaksanaan Roadmap Plastik Sekali Guna.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
