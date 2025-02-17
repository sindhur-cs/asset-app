import React from 'react';
import { AssetType } from '../constants/assetTypes';
import { File, Trash2 } from 'lucide-react';
import { useFieldConfigMappingStore } from '../store/fieldConfigMappingStore';
import { useFieldConfigurationStore } from '../store/fieldConfigurationStore';

interface FieldConfigMappingCardProps {
  name: string;
  assetTypes: AssetType[];
  fieldConfig: string;
  isDefault: boolean;
}

const FieldConfigMappingCard: React.FC<FieldConfigMappingCardProps> = ({ 
  name, 
  assetTypes, 
  fieldConfig, 
  isDefault 
}) => {
  const { removeMapping } = useFieldConfigMappingStore();
  const { getConfigurations } = useFieldConfigurationStore();
  const fieldConfigs = getConfigurations();

  const configName = fieldConfigs.find(config => config.id === fieldConfig)?.name || 'Default Config';

  const handleDelete = () => {
    removeMapping(name);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-purple-200 transition-colors duration-200">
      <div className="flex justify-between items-start">
        <div className='w-full'>
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            {name} 
            {isDefault && <span className="ml-2 text-sm text-purple-600">(Default)</span>}
          </h3>
          <p className="text-sm text-gray-500">{assetTypes.length} asset types</p>
          <div className='pt-4'>
            <span className="text-sm font-medium text-gray-700 mb-2">Field Configuration</span>
            <div className="p-4 text-sm my-2 w-full rounded-lg bg-purple-50 flex items-center">
              <File className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-purple-700 ml-1">{configName}</span>
            </div>
          </div>
        </div>
        {!isDefault && (
          <button 
            onClick={handleDelete} 
            className="absolute right-14 p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {assetTypes.length > 0 && (
          <div className='pt-2'>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Asset Types</h4>
            <div className="grid grid-cols-2 gap-2 py-1">
              {assetTypes.map((type) => (
                <div key={type.id} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                  <File className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-900">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldConfigMappingCard; 