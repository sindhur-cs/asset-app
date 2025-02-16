import { X } from 'lucide-react'

interface CreateProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  onProjectNameChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const CreateProjectDialog = ({
  isOpen,
  onClose,
  projectName,
  onProjectNameChange,
  onSubmit
}: CreateProjectDialogProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Project</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="projectName" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter project name"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProjectDialog 