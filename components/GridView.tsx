
import React from 'react';
import { PolicyEntry } from '../types';
import { Tag, Building, ExternalLink, Scale } from 'lucide-react';

interface GridViewProps {
  data: PolicyEntry[];
}

const GridView: React.FC<GridViewProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <p className="text-lg">Tiada data dijumpai.</p>
        <p className="text-sm">Sila laraskan penapis atau carian anda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
          <div className="p-6 flex-1">
            <div className="flex gap-2 mb-4 flex-wrap">
              {item.dasar.map(d => (
                <span key={d} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                  {d}
                </span>
              ))}
              {item.fasa.map(f => (
                <span key={f} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100">
                  {f}
                </span>
              ))}
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
              {item.objektif}
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <Tag size={12} /> Fokus Penilaian
                </div>
                <ul className="grid grid-cols-1 gap-1">
                  {item.fokus.map((f, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <Building size={12} /> Skop Pelaksanaan
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.skop.map((s, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale size={14} className="text-slate-400" />
              <div className="flex gap-2">
                {item.perundangan.map((p, idx) => (
                  <span key={idx} className="text-xs font-semibold text-slate-500">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <button className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-indigo-600">
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
