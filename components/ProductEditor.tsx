import React, { useState, useEffect } from 'react';
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
  // Sincroniza o estado local quando o produto muda (correção importante)
  const [localProduct, setLocalProduct] = useState<Product>(product);
  
  useEffect(() => {
    setLocalProduct(product);
  }, [product]);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleFieldChange = (field: keyof Product, value: any) => {
    setLocalProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAIImprove = async (field: keyof Product) => {
    const currentValue = localProduct[field];
    // Apenas funciona se for string por agora
    if (typeof currentValue !== 'string') {
        alert("AI improvement currently only works on text fields. Switch to text mode first.");
        return;
    }
    
    setIsGenerating(true);
    const improved = await suggestImprovement(currentValue, brandContext, 'refine');
    handleFieldChange(field, improved);
    setIsGenerating(false);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-6 shadow-xl animate-fade-in">
      <div className="flex justify-between items-start border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Product Details</h3>
          <p className="text-xs text-slate-400 font-mono">Editing: {localProduct.name}</p>
        </div>
        <button 
          onClick={() => onSave(localProduct)}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-amber-900/20"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Product Name</label>
          <input 
            type="text" 
            value={localProduct.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-slate-100 focus:border-amber-500 font-medium"
          />
        </div>

        {/* 1. VISUAL PHYSICS (Já estava a usar Hybrid, mantém-se) */}
        <HybridField 
          label="Visual Physics (The Object)" 
          value={localProduct.visual_physics} 
          onChange={(val) => handleFieldChange('visual_physics', val)} 
        />

        {/* 2. SENSORY PROFILE (Agora usa HybridField!) */}
        <HybridField 
          label="Sensory Profile (Taste & Texture)" 
          value={localProduct.sensory} 
          onChange={(val) => handleFieldChange('sensory', val)} 
        />

        {/* 3. NARRATIVE (Agora usa HybridField!) */}
        <HybridField 
          label="Narrative & Micro-Stories" 
          value={localProduct.narrative} 
          onChange={(val) => handleFieldChange('narrative', val)} 
        />

        {/* 4. FOOD PAIRING (Novo campo com HybridField!) */}
        <HybridField 
          label="Food Pairing Matrix" 
          value={localProduct.food_pairing || ""} // Garante que não é null
          onChange={(val) => handleFieldChange('food_pairing', val)} 
        />

        {/* Lighting (Pode ficar simples ou Hybrid, vamos por simples por agora para variar, ou Hybrid para consistência) */}
        <div className="space-y-1">
           <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lighting Strategy</label>
           <input
             type="text"
             className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-sm text-slate-200 focus:border-amber-500"
             value={localProduct.lighting_strategy || localProduct.lighting || ""} // Tenta apanhar legacy key
             onChange={(e) => handleFieldChange('lighting', e.target.value)}
             placeholder="e.g. Chiaroscuro, Backlit, High Noon"
           />
        </div>

      </div>
    </div>
  );
};

export default ProductEditor;