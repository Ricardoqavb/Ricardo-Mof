import React, { useState } from 'react';
import { Brand, Collection } from '../types';
import CollectionEditor from './CollectionEditor';
import { Layers, Info, Sparkles } from 'lucide-react';
import { analyzeBrand } from '../services/geminiService';

interface BrandEditorProps {
  brand: Brand;
  onUpdate: (updatedBrand: Brand) => void;
}

const BrandEditor: React.FC<BrandEditorProps> = ({ brand, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'collections'>('identity');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDefinitionChange = (field: string, value: any) => {
    onUpdate({
      ...brand,
      brand_definition: {
        ...brand.brand_definition,
        [field]: value
      }
    });
  };

  const handleCollectionUpdate = (index: number, updatedCollection: Collection) => {
    const newCollections = [...brand.collections];
    newCollections[index] = updatedCollection;
    onUpdate({ ...brand, collections: newCollections });
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeBrand(brand);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{brand.business_unit}</span>
            <h1 className="text-3xl font-bold text-white mt-1">{brand.brand_name}</h1>
          </div>
          <button 
             onClick={runAnalysis}
             disabled={isAnalyzing}
             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Sparkles size={16} className={isAnalyzing ? "animate-spin" : ""} />
            {isAnalyzing ? "Thinking..." : "AI Analysis"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('identity')}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'identity' 
                ? 'border-amber-500 text-amber-500' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info size={16} /> Identity & Values
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'collections' 
                ? 'border-amber-500 text-amber-500' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={16} /> Ranges & Collections ({brand.collections.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        
        {/* AI Analysis Result */}
        {analysisResult && (
          <div className="mb-8 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg text-sm text-indigo-100">
            <h3 className="font-bold text-indigo-400 mb-2 flex items-center gap-2"><Sparkles size={14}/> Gemini Analysis</h3>
            <p className="whitespace-pre-line leading-relaxed">{analysisResult}</p>
            <button onClick={() => setAnalysisResult(null)} className="mt-2 text-xs text-indigo-400 underline">Dismiss</button>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Signature</label>
                <textarea 
                  className="w-full bg-slate-800 border-none rounded p-3 text-slate-200 focus:ring-1 focus:ring-amber-500"
                  rows={3}
                  value={brand.brand_definition.signature}
                  onChange={(e) => handleDefinitionChange('signature', e.target.value)}
                />
              </div>
              <div className="group">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Archetype</label>
                <input 
                  type="text"
                  className="w-full bg-slate-800 border-none rounded p-3 text-slate-200 focus:ring-1 focus:ring-amber-500"
                  value={brand.brand_definition.archetype}
                  onChange={(e) => handleDefinitionChange('archetype', e.target.value)}
                />
              </div>
              <div className="group">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Visual Identity</label>
                <textarea 
                  className="w-full bg-slate-800 border-none rounded p-3 text-slate-200 focus:ring-1 focus:ring-amber-500"
                  rows={4}
                  value={brand.brand_definition.visual_identity}
                  onChange={(e) => handleDefinitionChange('visual_identity', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
               {/* Values Array Edit */}
               <div className="group">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Brand Values (Comma Separated)</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-800 border-none rounded p-3 text-slate-200 focus:ring-1 focus:ring-amber-500"
                    value={brand.brand_definition.values.join(", ")}
                    onChange={(e) => handleDefinitionChange('values', e.target.value.split(',').map(s => s.trim()))}
                  />
               </div>
               
               {/* Territories Array Edit */}
               <div className="group">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Territories (Comma Separated)</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-800 border-none rounded p-3 text-slate-200 focus:ring-1 focus:ring-amber-500"
                    value={brand.brand_definition.territories.join(", ")}
                    onChange={(e) => handleDefinitionChange('territories', e.target.value.split(',').map(s => s.trim()))}
                  />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="max-w-4xl space-y-2">
            {brand.collections.map((col, idx) => (
              <CollectionEditor 
                key={idx} 
                collection={col} 
                onUpdate={(updated) => handleCollectionUpdate(idx, updated)}
                brandContext={`${brand.brand_name} - ${brand.brand_definition.archetype}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandEditor;
