import React, { useState, useMemo } from 'react';
import { PolicyEntry } from '../types';
import { Layers, ChevronDown, ListFilter } from 'lucide-react';

interface PivotViewProps {
  data: PolicyEntry[];
}

const PivotView: React.FC<PivotViewProps> = ({ data }) => {
  const [pivotBy, setPivotBy] = useState<'dasar' | 'fasa' | 'perundangan' | 'skop'>('dasar');

  const groups = useMemo(() => {
    const result: Record<string, PolicyEntry[]> = {};
    data.forEach(item => {
      const keys = item[pivotBy] as string[];
      keys.forEach(key => {
        if (!result[key]) result[key] = [];
        result[key].push(item);
      });
    });
    return result;
  }, [data, pivotBy]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <ListFilter size={16} />
            Susun Mengikut:
          </span>
          <div className="flex gap-2">
            {(['dasar', 'fasa', 'perundangan', 'skop'] as const).map(option => (
              <button
                key={option}
                onClick={() => setPivotBy(option)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
                  pivotBy === option 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {option === 'perundangan' ? 'Akta' : option}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs font-medium text-slate-400 italic">
          Menunjukkan {Object.keys(groups).length} kategori unik
        </div>
      </div>

      <div className="space-y-4">
        {/* Fix: Explicitly cast Object.entries to [string, PolicyEntry[]][] to resolve 'unknown' type inference errors */}
        {(Object.entries(groups) as [string, PolicyEntry[]][]).sort(([a], [b]) => a.localeCompare(b)).map(([key, items]) => (
          <div key={key} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-indigo-600">
                  <Layers size={18} />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{key}</h3>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-200 uppercase">
                  {items.length} {items.length > 1 ? 'Entri' : 'Entri'}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-white">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/3">Objektif Utama</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fokus Spesifik</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fasa</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800 leading-snug">{item.objektif}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {item.fokus.slice(0, 3).map((f, i) => (
                            <span key={i} className="text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-600 whitespace-nowrap">
                              {f}
                            </span>
                          ))}
                          {item.fokus.length > 3 && (
                            <span className="text-[11px] text-slate-400">+{item.fokus.length - 3} lagi</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {item.fasa.map(f => (
                            <span key={f} className="text-[10px] font-bold text-amber-600 px-1.5 py-0.5 bg-amber-50 rounded border border-amber-100">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider">
                          Perincian
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PivotView;