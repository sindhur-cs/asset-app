import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import { useAssetTypeStore } from '../../store/assetTypeStore'
import AssetTypeCard from '../../components/asset-types/AssetTypeCard'
import AddCustomTypeDialog from '../../components/asset-types/AddCustomTypeDialog'

const AssetTypes = () => {
  const [isAddingType, setIsAddingType] = useState(false)
  
  const { assetTypes, addAssetType, removeAssetType } = useAssetTypeStore()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Asset Types</h1>
              <p className="text-gray-600 mt-1">Manage asset types</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddingType(true)}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                Add Custom Type
              </button>
            </div>
          </div>

          {/* Project Asset Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {assetTypes.map((type) => (
              <AssetTypeCard 
                key={type.id} 
                type={type} 
                onDelete={type.isDefault ? () => {} : removeAssetType}
              />
            ))}
          </div>

          {/* Dialogs */}
          <AddCustomTypeDialog
            isOpen={isAddingType}
            onClose={() => setIsAddingType(false)}
            onAdd={addAssetType}
          />
        </div>
      </main>
    </div>
  )
}

export default AssetTypes 