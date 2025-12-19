import React, { useState } from 'react';
import { Product } from '../types';
import HybridField from './HybridField';
import { Sparkles, Save } from 'lucide-react';
import { suggestImprovement } from '../services/geminiService';

interface ProductEditorProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  brandContext: string;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, brandContext }) => {
  const [localProduct, setLocalProduct] = useState<Product>(product);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFieldChange = (field: keyof Product, value: any) => {
    setLocalProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAIImprove = async (field: keyof Product) => {
    const currentValue = localProduct[field];
    if (typeof currentValue !== 'string') return;
    
    setIsGenerating(true);
    const improved = await suggestImprovement(currentValue, brandContext, 'refine');
    handleFieldChange(field, improved);
    setIsGenerating(false);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-6 shadow-xl">
      <div className="flex justify-between items-start border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Product Details</h3>
          <p className="text-xs text-slate-400">Editing: {localProduct.name}</p>
        </div>
        <button 
          onClick={() => onSave(localProduct)}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase">Product Name</label>
          <input 
            type="text" 
            value={localProduct.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-slate-100 focus:border-amber-500"
          />
        </div>

        {/* Deep Field: Visual Physics */}
        <HybridField 
          label="Visual Physics" 
          value={localProduct.visual_physics} 
          onChange={(val) => handleFieldChange('visual_physics', val)} 
        />

        {/* Deep Field: Sensory */}
        <div className="space-y-1 relative">
           <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center justify-between">
              Sensory Profile
              <button onClick={() => handleAIImprove('sensory')} disabled={isGenerating} className="text-amber-500 hover:text-amber-300">
                <Sparkles size={14} className={isGenerating ? "animate-spin" : ""} />
              </button>
           </label>
           <textarea
             className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-sm text-slate-200 focus:border-amber-500 min-h-[80px]"
             value={localProduct.sensory as string} // Assuming simple string for now as per majority
             onChange={(e) => handleFieldChange('sensory', e.target.value)}
           />
        </div>

        {/* Narrative */}
        <div className="space-y-1 relative">
           <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center justify-between">
              Narrative & Story
              <button onClick={() => handleAIImprove('narrative')} disabled={isGenerating} className="text-amber-500 hover:text-amber-300">
                <Sparkles size={14} className={isGenerating ? "animate-spin" : ""} />
              </button>
           </label>
           <textarea
             className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-sm text-slate-200 focus:border-amber-500 min-h-[100px]"
             value={localProduct.narrative}
             onChange={(e) => handleFieldChange('narrative', e.target.value)}
           />
        </div>

        {/* Lighting */}
        <div className="space-y-1">
           <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Lighting Style</label>
           <input
             type="text"
             className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-sm text-slate-200 focus:border-amber-500"
             value={localProduct.lighting || ""}
             onChange={(e) => handleFieldChange('lighting', e.target.value)}
             placeholder="e.g. Chiaroscuro, Backlit, High Noon"
           />
        </div>

      </div>
    </div>
  );
};

export default ProductEditor;
