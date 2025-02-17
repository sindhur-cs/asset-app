import { useState } from 'react';
import { X } from 'lucide-react';
import { AssetType } from '../constants/assetTypes';
import { useAssetModelStore } from '../store/assetModelStore';
import CategorizedAssetTypeSelector from './asset-types/CategorizedAssetTypeSelector';

interface CreateMappingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, assetModel: string, assetTypes: AssetType[]) => void;
  assetTypes: AssetType[];
}

const CreateMappingDialog = ({ isOpen, onClose, onCreate, assetTypes }: CreateMappingDialogProps) => {
  const [mappingName, setMappingName] = useState('');
  const [selectedAssetModel, setSelectedAssetModel] = useState<string>('');
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([]);

  const { getModels } = useAssetModelStore();
  const assetModels = getModels();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mappingName && selectedAssetModel && selectedAssetTypes.length > 0) {
      onCreate(mappingName, selectedAssetModel, selectedAssetTypes.map(id => assetTypes.find(type => type.id === id)!));
      setMappingName('');
      setSelectedAssetModel('');
      setSelectedAssetTypes([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Mapping</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mapping Name</label>
              <input
                type="text"
                value={mappingName}
                onChange={(e) => setMappingName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Custom Mapping"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Asset Model</label>
              <select
                value={selectedAssetModel}
                onChange={(e) => setSelectedAssetModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select an asset model</option>
                {assetModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Asset Types</label>
              <CategorizedAssetTypeSelector
                assetTypes={assetTypes}
                selectedIds={selectedAssetTypes}
                onSelect={(id) => setSelectedAssetTypes(prev => [...prev, id])}
                onDeselect={(id) => setSelectedAssetTypes(prev => prev.filter(selectedId => selectedId !== id))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              Create Mapping
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMappingDialog; 