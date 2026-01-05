
import React, { useState, useMemo } from 'react';
import { POLICY_DATA } from './constants';
import { ViewMode, PolicyEntry } from './types';
import Sidebar from './components/Sidebar';
import GridView from './components/GridView';
import PivotView from './components/PivotView';
import GraphView from './components/GraphView';
import { Search, LayoutGrid, Network, TableProperties, Info } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDasar, setSelectedDasar] = useState<string[]>([]);
  const [selectedFasa, setSelectedFasa] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return POLICY_DATA.filter((item) => {
      const matchesSearch = 
        item.objektif.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fokus.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.skop.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDasar = selectedDasar.length === 0 || 
        item.dasar.some(d => selectedDasar.includes(d));

      const matchesFasa = selectedFasa.length === 0 ||
        item.fasa.some(f => selectedFasa.includes(f));

      return matchesSearch && matchesDasar && matchesFasa;
    });
  }, [searchTerm, selectedDasar, selectedFasa]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        selectedDasar={selectedDasar}
        setSelectedDasar={setSelectedDasar}
        selectedFasa={selectedFasa}
        setSelectedFasa={setSelectedFasa}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-indigo-600 text-white rounded-lg">
                <Info size={20} />
              </span>
              Dashboard Kajian Plastik Malaysia
            </h1>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-2xl px-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari objektif, fokus, atau skop..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <LayoutGrid size={16} /> Grid View
            </button>
            <button 
              onClick={() => setViewMode('pivot')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'pivot' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <TableProperties size={16} /> Pivot View
            </button>
            <button 
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'graph' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Network size={16} /> Network Map
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {viewMode === 'grid' && <GridView data={filteredData} />}
          {viewMode === 'pivot' && <PivotView data={filteredData} />}
          {viewMode === 'graph' && <GraphView data={filteredData} />}
        </section>
      </main>
    </div>
  );
};

export default App;
