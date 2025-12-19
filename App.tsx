import React, { useState } from 'react';
import { MasterDB, Brand } from './types';
import { INITIAL_DB } from './constants';
import Sidebar from './components/Sidebar';
import BrandEditor from './components/BrandEditor';

const App: React.FC = () => {
  const [db, setDb] = useState<MasterDB>(INITIAL_DB);
  const [selectedBrandIdx, setSelectedBrandIdx] = useState<number>(0);

  const handleUpdateBrand = (updatedBrand: Brand) => {
    const newBrands = [...db.brands];
    newBrands[selectedBrandIdx] = updatedBrand;
    setDb({ ...db, brands: newBrands });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(db, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MASTER_WINE_DB_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        // Basic validation could go here
        if (json.brands && Array.isArray(json.brands)) {
          setDb(json);
          setSelectedBrandIdx(0);
          alert("Database imported successfully.");
        } else {
          alert("Invalid JSON structure.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to parse JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar 
        brands={db.brands}
        selectedBrandIdx={selectedBrandIdx}
        onSelectBrand={setSelectedBrandIdx}
        onExport={handleExport}
        onImport={handleImport}
      />
      
      <main className="flex-1 h-full relative">
        {db.brands[selectedBrandIdx] ? (
          <BrandEditor 
            brand={db.brands[selectedBrandIdx]}
            onUpdate={handleUpdateBrand}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            Select a brand to start editing
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
