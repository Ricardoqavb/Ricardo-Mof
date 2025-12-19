import React from 'react';
import { Brand } from '../types';
import { Wine, Download, Upload, Database } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  brands: Brand[];
  selectedBrandIdx: number;
  onSelectBrand: (idx: number) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ brands, selectedBrandIdx, onSelectBrand, onExport, onImport }) => {
  // Group by Business Unit
  const grouped = brands.reduce((acc, brand, index) => {
    const unit = brand.business_unit || 'Other';
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push({ brand, originalIndex: index });
    return acc;
  }, {} as Record<string, { brand: Brand; originalIndex: number }[]>);

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-full">
      {/* App Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-amber-600 p-2 rounded-lg">
          <Database className="text-white" size={20} />
        </div>
        <div>
          <h2 className="font-bold text-slate-100 text-sm leading-tight">Pocket Photographer</h2>
          <p className="text-[10px] text-slate-500 font-mono">Master DB v6.0</p>
        </div>
      </div>

      {/* Brand List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {Object.entries(grouped).map(([unit, items]) => (
          <div key={unit}>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2">{unit}</h3>
            <div className="space-y-1">
              {items.map(({ brand, originalIndex }) => (
                <button
                  key={originalIndex}
                  onClick={() => onSelectBrand(originalIndex)}
                  className={clsx(
                    "w-full text-left px-3 py-2 rounded-md text-xs font-medium flex items-center gap-2 transition-all",
                    selectedBrandIdx === originalIndex
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-900/20"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  )}
                >
                  <Wine size={14} className={selectedBrandIdx === originalIndex ? "opacity-100" : "opacity-50"} />
                  {brand.brand_name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950">
        <button 
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 text-xs py-2 rounded transition-colors"
        >
          <Download size={14} /> Export JSON
        </button>
        <label className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 text-xs py-2 rounded cursor-pointer transition-colors">
          <Upload size={14} /> Import JSON
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
