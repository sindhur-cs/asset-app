import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '../../components/Sidebar'
import CreateMappingDialog from '../../components/CreateMappingDialog';
import MappingCard from '../../components/MappingCard';
import { useAssetTypeStore } from '../../store/assetTypeStore';
import { AssetType } from '../../constants/assetTypes';
import { useMappingStore } from '../../store/mappingStore';

const ScreenScheme = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { assetTypes } = useAssetTypeStore();
  const { mappings, addMapping } = useMappingStore();

  const handleCreateMapping = (name: string, selectedAssetModel: string, selectedAssetTypes: AssetType[]) => {
    addMapping(name, selectedAssetModel, selectedAssetTypes);
    console.log('Mapping Created:', { name, assetModel: selectedAssetModel, assetTypes: selectedAssetTypes });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Asset Model Mappings</h1>
              <p className="text-gray-600 mt-1">Manage Asset Model Mappings</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                Create Mapping
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mappings.map((mapping, index) => (
              <MappingCard key={index} name={mapping.name} assetTypes={mapping.assetTypes} assetModel={mapping.assetModel} isDefault={mapping.isDefault} />
            ))}
          </div>
          <CreateMappingDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onCreate={handleCreateMapping}
            assetTypes={assetTypes}
          />
        </div>
      </main>
    </div>
  )
}

export default ScreenScheme 