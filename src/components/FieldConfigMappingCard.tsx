import React, { useState } from 'react';
import { AssetType } from '../constants/assetTypes';
import { Edit, File, Trash2 } from 'lucide-react';
import { useFieldConfigMappingStore } from '../store/fieldConfigMappingStore';
import CreateFieldConfigMappingDialog from './CreateFieldConfigMappingDialog';
import { useAssetTypeStore } from '../store/assetTypeStore';
import { useFieldConfigurationStore } from '../store/fieldConfigurationStore';

interface FieldConfigMappingCardProps {
    name: string;
    listMappings: { mappingId: number, assetTypes: AssetType[], fieldConfig: string }[],
    isDefault: boolean;
}

const FieldConfigMappingCard: React.FC<FieldConfigMappingCardProps> = ({
    name,
    listMappings,
    isDefault,
}) => {
    const { removeMapping } = useFieldConfigMappingStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { assetTypes } = useAssetTypeStore();
    const { getConfigurations } = useFieldConfigurationStore();
    const fieldConfigs = getConfigurations();

    const handleDelete = () => {
        removeMapping(name);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-purple-200 transition-colors duration-200 relative">
            <div className="flex justify-between items-start">
                <div className='w-full pl-1'>
                    <h3 className="flex items-center text-lg font-semibold text-gray-900">
                        {name}
                        {isDefault && <span className="ml-2 text-sm text-purple-600">(Default)</span>}
                    </h3>
                    <p className="text-sm text-gray-500 pt-0.5">{listMappings.length} configuration(s)</p>
                </div>
                {!isDefault && (
                    <>
                        <button
                            onClick={() => {
                                setIsDialogOpen(true)
                            }}
                            className="absolute right-14 p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                        >
                            <Edit className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="absolute right-6 p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>
            <div className="flex flex-col gap-6 my-6">
            {listMappings?.map((listMapping) => {
                const configName = fieldConfigs.find(config => config.id === listMapping.fieldConfig)?.name || 'Default Config';

                return <div key={listMapping.mappingId} className="bg-purple-50 rounded-lg p-4 py-6 transition-all hover:shadow-sm">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Field Configuration</span>
                        </div>
                        <div className="p-3 text-sm w-full rounded-lg border border-purple-200 bg-white flex items-center transition-colors hover:border-purple-300">
                            <File className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                            <span className="text-purple-700 truncate">{configName}</span>
                        </div>
                        
                        {listMapping.assetTypes.length > 0 && (
                            <div className="pt-3">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Asset Types</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {listMapping.assetTypes.map((type) => (
                                        <div 
                                            key={type.id} 
                                            className="flex items-center gap-2 p-2 border border-purple-200 rounded-lg bg-white transition-colors hover:border-purple-300"
                                        >
                                            <File className="h-4 w-4 text-purple-600 flex-shrink-0" />
                                            <span className="text-sm text-purple-900 truncate">{type.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            })}
            </div>

            <CreateFieldConfigMappingDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                assetTypes={assetTypes}
                edit={name}
            />
        </div>
    );
};

export default FieldConfigMappingCard; 