import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Box, Type, List } from 'lucide-react';

interface HybridFieldProps {
  label: string;
  value: any; // Mudámos para any para aceitar Sensory/Narrative também
  onChange: (val: any) => void;
}

const HybridField: React.FC<HybridFieldProps> = ({ label, value, onChange }) => {
  // Se o valor for nulo/undefined, inicializa vazio
  const safeValue = value ?? "";
  
  // Deteta se é objeto (e não array)
  const isObjectInitial = typeof safeValue === 'object' && safeValue !== null && !Array.isArray(safeValue);
  const [isObjectMode, setIsObjectMode] = useState<boolean>(isObjectInitial);

  // Sincroniza o modo se o valor externo mudar drasticamente
  useEffect(() => {
    setIsObjectMode(typeof safeValue === 'object' && safeValue !== null && !Array.isArray(safeValue));
  }, [safeValue]);

  const handleToggleMode = () => {
    if (isObjectMode) {
      if (window.confirm("Mudar para Texto vai 'achatar' o objeto. Continuar?")) {
        onChange(JSON.stringify(safeValue, null, 2));
        setIsObjectMode(false);
      }
    } else {
      try {
        // Tenta fazer parse se for uma string JSON válida
        const parsed = JSON.parse(safeValue as string);
        onChange(parsed);
      } catch {
        // Se for texto normal, cria um objeto simples
        onChange({ description: safeValue as string });
      }
      setIsObjectMode(true);
    }
  };

  // MODO TEXTO
  if (!isObjectMode) {
    return (
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
          <button 
            onClick={handleToggleMode}
            className="text-[10px] flex items-center gap-1 text-amber-500 hover:text-amber-400 transition-colors"
          >
            <Box size={12} /> Switch to Object
          </button>
        </div>
        <textarea
          className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-sm text-slate-200 focus:border-amber-500 min-h-[80px]"
          value={typeof safeValue === 'string' ? safeValue : JSON.stringify(safeValue)}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  // MODO OBJETO
  const objectValue = safeValue as Record<string, any>;
  const entries = Object.entries(objectValue);

  const updateKey = (oldKey: string, newKey: string, val: any) => {
    const newObj = { ...objectValue };
    delete newObj[oldKey];
    newObj[newKey] = val;
    onChange(newObj);
  };

  const updateValue = (key: string, val: any) => {
    onChange({ ...objectValue, [key]: val });
  };

  // Função especial para editar Arrays (ex: Keywords) como texto separado por vírgulas
  const handleArrayChange = (key: string, valString: string) => {
    const arrayVal = valString.split(',').map(s => s.trim());
    updateValue(key, arrayVal);
  };

  const removeField = (key: string) => {
    const newObj = { ...objectValue };
    delete newObj[key];
    onChange(newObj);
  };

  const addField = () => {
    const keyName = `field_${Date.now()}`;
    onChange({ ...objectValue, [keyName]: "" });
  };

  return (
    <div className="space-y-2 border border-slate-700 bg-slate-900/30 p-3 rounded-lg mb-4">
      <div className="flex items-center justify-between mb-2 border-b border-slate-700 pb-2">
        <label className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
          <Box size={14} /> {label} (Structured)
        </label>
        <button 
            onClick={handleToggleMode}
            className="text-[10px] flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Type size={12} /> Switch to Text
          </button>
      </div>
      
      <div className="space-y-3">
        {entries.map(([k, v]) => (
          <div key={k} className="flex gap-2 items-start group">
             {/* Key Input */}
             <input 
                type="text" 
                value={k} 
                onChange={(e) => updateKey(k, e.target.value, v)}
                className="w-1/3 bg-slate-950 border border-slate-600 rounded px-2 py-1 text-xs text-slate-400 focus:text-amber-400 focus:border-amber-500 font-mono"
             />
             
             {/* Value Input (Deteta se é Array ou String) */}
             {Array.isArray(v) ? (
               <div className="flex-1 relative">
                 <List size={10} className="absolute top-2 right-2 text-slate-500"/>
                 <textarea 
                    value={v.join(", ")} 
                    onChange={(e) => handleArrayChange(k, e.target.value)}
                    placeholder="Comma separated list..."
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:border-amber-500 min-h-[38px]"
                 />
               </div>
             ) : (
               <textarea 
                  value={String(v)} 
                  onChange={(e) => updateValue(k, e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:border-amber-500 min-h-[38px]"
               />
             )}

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
        className="mt-2 text-[10px] flex items-center gap-1 text-slate-500 hover:text-amber-500 uppercase font-bold tracking-wide"
      >
        <Plus size={12} /> Add Field
      </button>
    </div>
  );
};

export default HybridField;