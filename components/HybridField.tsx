import React, { useState, useEffect } from 'react';
import { VisualPhysics, VisualPhysicsObject } from '../types';
import { Plus, Trash2, Box, Type } from 'lucide-react';

interface HybridFieldProps {
  label: string;
  value: VisualPhysics;
  onChange: (val: VisualPhysics) => void;
}

const HybridField: React.FC<HybridFieldProps> = ({ label, value, onChange }) => {
  // Determine initial mode based on incoming value type
  const [isObjectMode, setIsObjectMode] = useState<boolean>(typeof value === 'object');

  // If value is null/undefined, default to string empty
  const safeValue = value ?? "";

  const handleToggleMode = () => {
    if (isObjectMode) {
      // Switching to String: Flatten object to JSON string or just take the first value?
      // Let's just reset to empty string to be safe, or JSON stringify
      if (window.confirm("Switching to Text mode will flatten the object structure. Continue?")) {
        onChange(JSON.stringify(safeValue, null, 2));
        setIsObjectMode(false);
      }
    } else {
      // Switching to Object: Create a basic object with one key 'description' containing the string
      onChange({ description: safeValue as string });
      setIsObjectMode(true);
    }
  };

  if (!isObjectMode) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider">{label}</label>
          <button 
            onClick={handleToggleMode}
            className="text-[10px] flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Box size={12} /> Switch to Object
          </button>
        </div>
        <textarea
          className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-sm text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all min-h-[80px]"
          value={safeValue as string}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  // Object Mode Rendering
  const objectValue = safeValue as VisualPhysicsObject;
  const entries = Object.entries(objectValue);

  const updateKey = (oldKey: string, newKey: string, val: string) => {
    const newObj = { ...objectValue };
    delete newObj[oldKey];
    newObj[newKey] = val;
    onChange(newObj);
  };

  const updateValue = (key: string, val: string) => {
    onChange({ ...objectValue, [key]: val });
  };

  const removeField = (key: string) => {
    const newObj = { ...objectValue };
    delete newObj[key];
    onChange(newObj);
  };

  const addField = () => {
    onChange({ ...objectValue, [`new_field_${Date.now()}`]: "" });
  };

  return (
    <div className="space-y-2 border border-slate-800 bg-slate-900/50 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-2">
          <Box size={14} /> {label} (Structured)
        </label>
        <button 
            onClick={handleToggleMode}
            className="text-[10px] flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Type size={12} /> Switch to Text
          </button>
      </div>
      
      <div className="space-y-3">
        {entries.map(([k, v]) => (
          <div key={k} className="flex gap-2 items-start group">
             <input 
                type="text" 
                value={k} 
                onChange={(e) => updateKey(k, e.target.value, v as string)}
                className="w-1/3 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-amber-200/80 focus:border-amber-500"
             />
             <textarea 
                value={v as string} 
                onChange={(e) => updateValue(k, e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:border-amber-500 min-h-[38px]"
             />
             <button 
               onClick={() => removeField(k)}
               className="text-slate-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
             >
               <Trash2 size={14} />
             </button>
          </div>
        ))}
      </div>
      <button 
        onClick={addField}
        className="mt-2 text-xs flex items-center gap-1 text-amber-500/70 hover:text-amber-400"
      >
        <Plus size={14} /> Add Field
      </button>
    </div>
  );
};

export default HybridField;
