import { useState } from 'react'
import { X } from 'lucide-react'
import { AssetType } from '../../constants/assetTypes'

interface AddCustomTypeDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (type: AssetType) => void
}

const AddCustomTypeDialog = ({ isOpen, onClose, onAdd }: AddCustomTypeDialogProps) => {
  const [name, setName] = useState('')
  const [extension, setExtension] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && extension) {
      onAdd({
        id: extension,
        name,
        extension,
      })
      setName('')
      setExtension('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Custom Asset Type</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., SVG Image"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">File Extension</label>
              <input
                type="text"
                value={extension}
                onChange={(e) => setExtension(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., svg"
                required
              />
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
              Add Type
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCustomTypeDialog 