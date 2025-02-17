import { File, Trash2 } from 'lucide-react'
import { AssetType } from '../../constants/assetTypes'

interface AssetTypeCardProps {
  type: AssetType
  onDelete: (typeId: string) => void
}

const AssetTypeCard = ({ type, onDelete }: AssetTypeCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-purple-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-50 rounded-lg">
          <File className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 flex items-center">
            {type.name}
            {type.category && (
              <span className="text-purple-600 ml-2 text-xs">({type.category})</span>
            )}
          </h3>
          <p className="text-sm text-gray-500">.{type.extension}</p>
        </div>
      </div>
      {!type.isDefault && onDelete && (
        <button
          onClick={() => onDelete(type.id)}
          className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

export default AssetTypeCard 