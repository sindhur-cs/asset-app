import { useState } from 'react';
import { useFieldConfigurationStore } from '../store/fieldConfigurationStore';
import { AssetType } from '../constants/assetTypes';
import { useFieldConfigMappingStore } from '../store/fieldConfigMappingStore';

interface CreateFieldConfigMappingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  assetTypes: AssetType[];
}

const CreateFieldConfigMappingDialog = ({ 
  isOpen, 
  onClose, 
  assetTypes 
}: CreateFieldConfigMappingDialogProps) => {
  const [mappingName, setMappingName] = useState('');
  const [selectedFieldConfig, setSelectedFieldConfig] = useState('');
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([]);

  const { getConfigurations } = useFieldConfigurationStore();
  const fieldConfigs = getConfigurations();
  const { addMapping } = useFieldConfigMappingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mappingName && selectedFieldConfig && selectedAssetTypes.length > 0) {
      addMapping(
        mappingName,
        selectedFieldConfig,
        selectedAssetTypes.map(id => assetTypes.find(type => type.id === id)!)
      );
      setMappingName('');
      setSelectedFieldConfig('');
      setSelectedAssetTypes([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Field Config Mapping</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mapping Name
              </label>
              <input
                type="text"
                value={mappingName}
                onChange={(e) => setMappingName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Image Asset Mapping"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Field Configuration
              </label>
              <select
                value={selectedFieldConfig}
                onChange={(e) => setSelectedFieldConfig(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a configuration</option>
                {fieldConfigs.map((config) => (
                  <option key={config.id} value={config.id}>
                    {config.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Asset Types
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {assetTypes.map((type) => (
                  <label
                    key={type.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAssetTypes.includes(type.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAssetTypes([...selectedAssetTypes, type.id]);
                        } else {
                          setSelectedAssetTypes(
                            selectedAssetTypes.filter(id => id !== type.id)
                          );
                        }
                      }}
                      className="text-purple-600 rounded"
                    />
                    <span>{type.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Create Mapping
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFieldConfigMappingDialog; 