import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import FieldConfigMappingCard from '../../components/FieldConfigMappingCard';
import { useAssetTypeStore } from '../../store/assetTypeStore';
import { useFieldConfigMappingStore } from '../../store/fieldConfigMappingStore';
import CreateFieldConfigMappingDialog from '../../components/CreateFieldConfigMappingDialog';

const FieldConfigMappings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { assetTypes } = useAssetTypeStore();
  const { mappings } = useFieldConfigMappingStore();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Field Config Mappings</h1>
              <p className="text-gray-600 mt-1">Manage Field Config Mappings</p>
            </div>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              Create Mapping
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mappings.map((mapping, index) => (
              <FieldConfigMappingCard
                key={index}
                name={mapping.name}
                listMappings={mapping.listMappings}
                isDefault={mapping.isDefault}
              />
            ))}
          </div>
          <CreateFieldConfigMappingDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            assetTypes={assetTypes}
            edit={""}
          />
        </div>
      </main>
    </div>
  );
};

export default FieldConfigMappings; 