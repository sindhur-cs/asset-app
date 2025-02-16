import { File } from 'lucide-react'
import { AssetType } from '../../constants/assetTypes'

interface AssetTypeCardProps {
  type: AssetType
}

const AssetTypeCard = ({ type }: AssetTypeCardProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-purple-100">
      <div className="p-2 bg-purple-50 rounded-lg">
        <File className="h-5 w-5 text-purple-600" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{type.name}</h3>
        <p className="text-sm text-gray-500">.{type.extension}</p>
      </div>
    </div>
  )
}

export default AssetTypeCard 