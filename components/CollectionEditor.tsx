import React, { useState } from 'react';
import { Collection, Product } from '../types';
import ProductEditor from './ProductEditor';
import { ChevronDown, ChevronRight, Edit2, PlusCircle, Wine } from 'lucide-react';

interface CollectionEditorProps {
  collection: Collection;
  onUpdate: (updatedCollection: Collection) => void;
  brandContext: string;
}

const CollectionEditor: React.FC<CollectionEditorProps> = ({ collection, onUpdate, brandContext }) => {
  const [expanded, setExpanded] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const handleProductUpdate = (index: number, updatedProduct: Product) => {
    const newProducts = [...collection.products];
    newProducts[index] = updatedProduct;
    onUpdate({ ...collection, products: newProducts });
    setEditingProductId(null);
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      name: "New Product",
      visual_physics: "Describe liquid...",
      sensory: "Describe taste...",
      narrative: "Describe setting..."
    };
    onUpdate({ ...collection, products: [...collection.products, newProduct] });
  };

  return (
    <div className="border border-slate-700 rounded-lg bg-slate-800/50 overflow-hidden mb-4">
      {/* Collection Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          {expanded ? <ChevronDown className="text-amber-500" /> : <ChevronRight className="text-slate-500" />}
          <div>
            <h4 className="text-lg font-semibold text-slate-100">{collection.name}</h4>
            <div className="flex gap-2 text-xs text-slate-400 mt-1">
              <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-500/80">{collection.tier}</span>
              <span>{collection.vibe}</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-slate-500">{collection.products.length} Products</span>
      </div>

      {/* Product List */}
      {expanded && (
        <div className="p-4 border-t border-slate-700 bg-slate-900/30 space-y-4">
           {/* Products Grid */}
           <div className="grid grid-cols-1 gap-3">
             {collection.products.map((product, idx) => (
               <div key={idx}>
                 {editingProductId === idx ? (
                   <ProductEditor 
                      product={product} 
                      onSave={(p) => handleProductUpdate(idx, p)} 
                      brandContext={brandContext}
                   />
                 ) : (
                   <div 
                      className="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700/50 hover:border-amber-500/50 group transition-all"
                   >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 rounded-full text-amber-600">
                          <Wine size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{product.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-md">
                            {typeof product.visual_physics === 'string' 
                              ? product.visual_physics 
                              : (product.visual_physics as any).liquid || 'Complex Visuals'}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setEditingProductId(idx)}
                        className="p-2 text-slate-400 hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 size={16} />
                      </button>
                   </div>
                 )}
               </div>
             ))}
           </div>
           
           <button 
             onClick={handleAddProduct}
             className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-amber-500 hover:border-amber-500/50 transition-colors"
           >
             <PlusCircle size={18} /> Add Product to {collection.name}
           </button>
        </div>
      )}
    </div>
  );
};

export default CollectionEditor;
