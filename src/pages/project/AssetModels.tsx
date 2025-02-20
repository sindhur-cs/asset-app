import { useState } from 'react'
import { Plus, Settings, Trash2, Database, GripVertical } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import { useAssetModelStore } from '../../store/assetModelStore'
import { useCustomFieldStore, systemFields } from '../../store/customFieldStore'
import { useDrag, useDrop } from 'react-dnd'

const AssetModels = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [modelName, setModelName] = useState('')
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const { getModels, addModel, removeModel } = useAssetModelStore()
  const { getFields } = useCustomFieldStore()

  const models = getModels()
  const customFields = getFields()

  // here track the custom fields in a state to track its movement
  const [cFields, setCFields] = useState(customFields); 

  const handleCreateModel = (e: React.FormEvent) => {
    e.preventDefault()
    if (modelName) {
      const selectedCustomFields = customFields.filter(
        field => selectedFields.includes(field.id)
      )
      addModel(modelName, selectedCustomFields)
      setModelName('')
      setSelectedFields([])
      setIsCreating(false)
    }
  }

  const moveField = (dragIndex: number, hoverIndex: number) => {
    // moves the custom fields
    const updatedCFields = [...cFields]
    const draggedCField = updatedCFields[dragIndex]
    updatedCFields.splice(dragIndex, 1)
    updatedCFields.splice(hoverIndex, 0, draggedCField)
    setCFields(updatedCFields)
  }

  const Item = ({ field, index }: { field: any; index: number }) => {
    const [, ref] = useDrag({
      type: 'FIELD',
      item: { index },
    })

    const [, drop] = useDrop({
      accept: 'FIELD',
      hover: (item: { index: number }) => {
        if (item.index !== index) {
          moveField(item.index, index)
          item.index = index
        }
      },
    })

    return (
      <div
        ref={node => {
          ref(drop(node));
        }}
        key={field.id}
        className="flex items-center hover:bg-purple-50 rounded-lg gap-2 p-2 select-none"
      >
        <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedFields.includes(field.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedFields([...selectedFields, field.id])
              } else {
                setSelectedFields(selectedFields.filter(id => id !== field.id))
              }
            }}
            className="text-purple-600 rounded"
          />
          <span>{field.name}</span>
        </label>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Asset Models</h1>
              <p className="text-gray-600 mt-1">Create and manage asset models</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              Create Model
            </button>
          </div>

          {/* Models List */}
          <div className="grid gap-4">
            {models.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-purple-200 transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      {model.name}
                      {model.isDefault && <span className="ml-2 text-sm text-purple-600">(Default)</span>}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {model.customFields.length + systemFields.length} fields
                    </p>
                  </div>
                  {!model.isDefault && (
                    <button
                      onClick={() => removeModel(model.id)}
                      className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* System Fields */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">System Fields</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {systemFields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg"
                        >
                          <Settings className="h-4 w-4 text-purple-600" />
                          <span className="text-sm text-purple-900">{field.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Fields */}
                  {model.customFields.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Fields</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {model.customFields.map((field) => (
                          <div
                            key={field.id}
                            className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg"
                          >
                            <Database className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-purple-900">{field.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Create Model Dialog */}
          {isCreating && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Asset Model</h2>
                <form onSubmit={handleCreateModel}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model Name
                      </label>
                      <input
                        type="text"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Image Asset"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        System Fields (Always Included)
                      </label>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {systemFields.map((field) => (
                          <div
                            key={field.id}
                            className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg"
                          >
                            <Settings className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-purple-900">{field.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Custom Fields
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {cFields.map((field, index) => (
                          <Item key={field.id} field={field} index={index} />
                        ))}
                      </div>
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
                      Create Model
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

export default AssetModels
