import { useState } from 'react'
import { Plus, Settings, Trash2 } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import { useCustomFieldStore, FieldType } from '../../store/customFieldStore'

const CustomFields = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const [fieldType, setFieldType] = useState<FieldType>('text')
  const [isRequired, setIsRequired] = useState(false)

  const { getFields, addField, removeField } = useCustomFieldStore()
  const customFields = getFields()

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault()
    if (fieldName && fieldType) {
      addField({
        id: `field-${Date.now()}`,
        name: fieldName,
        type: fieldType,
        required: isRequired
      })
      setFieldName('')
      setFieldType('text')
      setIsRequired(false)
      setIsCreating(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Custom Fields</h1>
              <p className="text-gray-600 mt-1">Create and manage custom fields for your assets</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              Create Field
            </button>
          </div>

          {/* Fields List */}
          <div className="grid gap-4">
            {customFields.map((field) => (
              <div 
                key={field.id} 
                className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between hover:border-purple-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{field.name}</h3>
                    <p className="text-sm text-gray-500">{field.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeField(field.id)}
                  className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Create Field Dialog */}
          {isCreating && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Custom Field</h2>
                <form onSubmit={handleCreateField}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Name
                      </label>
                      <input
                        type="text"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Copyright Owner"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Type
                      </label>
                      <select
                        value={fieldType}
                        onChange={(e) => setFieldType(e.target.value as FieldType)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="boolean">Yes/No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Create Field
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CustomFields 