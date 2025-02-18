import { X } from 'lucide-react'
import { FieldConfigMapping } from '../store/fieldConfigMappingStore'

interface CreateProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  onProjectNameChange: (name: string) => void
  onSubmit: (e: React.FormEvent) => void
  mappings: FieldConfigMapping[]
  selectedMapping: string
  onMappingChange: (mapping: string) => void
}

const CreateProjectDialog = ({
  isOpen,
  onClose,
  projectName,
  onProjectNameChange,
  onSubmit,
  mappings,
  selectedMapping,
  onMappingChange
}: CreateProjectDialogProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Space</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Space Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., My Project"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Configuration Mapping
              </label>
              <select
                value={selectedMapping}
                onChange={(e) => onMappingChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                {mappings.map((mapping) => (
                  <option key={mapping.name} value={mapping.name}>
                    {mapping.name}
                  </option>
                ))}
              </select>
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
              Create Space
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProjectDialog 