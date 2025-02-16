import { X, File, Trash2, Plus } from 'lucide-react'
import { AssetType, defaultAssetTypes } from '../../constants/assetTypes'

interface SelectDefaultTypeDialogProps {
  isOpen: boolean
  onClose: () => void
  projectAssetTypes: AssetType[]
  onSelect: (type: AssetType) => void
  onRemove: (typeId: string) => void
}

const SelectDefaultTypeDialog = ({
  isOpen,
  onClose,
  projectAssetTypes,
  onSelect,
  onRemove,
}: SelectDefaultTypeDialogProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Default Asset Types</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {defaultAssetTypes.map((type) => {
            const isSelected = projectAssetTypes.some(t => t.extension === type.extension)
            const projectType = projectAssetTypes.find(t => t.extension === type.extension)
            
            return (
              <div
                key={type.id}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-colors duration-200 ${
                  isSelected 
                    ? 'border-purple-200 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                }`}
              >
                <div className="p-2 bg-purple-50 rounded-lg">
                  <File className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-500">.{type.extension}</p>
                </div>
                {isSelected ? (
                  <button
                    onClick={() => onRemove(projectType!.id)}
                    className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelect(type)}
                    className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectDefaultTypeDialog 