import { useState } from 'react'
import { Plus, File, Trash2, X } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import { useTypeSchemeStore } from '../../store/typeSchemeStore'
import { useAssetTypeStore } from '../../store/assetTypeStore'
import { AssetType } from '../../constants/assetTypes'

const TypeSchemes = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [newSchemeName, setNewSchemeName] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<AssetType[]>([])
  
  const { getSchemes, addScheme, removeScheme } = useTypeSchemeStore()
  const { assetTypes } = useAssetTypeStore()
  
  const schemes = getSchemes()

  const handleCreateScheme = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSchemeName && selectedTypes.length > 0) {
      addScheme(newSchemeName, selectedTypes)
      setNewSchemeName('')
      setSelectedTypes([])
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
              <h1 className="text-2xl font-bold text-purple-900">Asset Type Schemes</h1>
              <p className="text-gray-600 mt-1">Manage asset type schemes</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              Create Scheme
            </button>
          </div>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-lg border border-purple-100 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {scheme.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {scheme.assetTypes.length} types
                    </p>
                  </div>
                  {!scheme.isDefault && (
                    <button
                      onClick={() => removeScheme(scheme.id)}
                      className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {scheme.assetTypes.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg"
                    >
                      <File className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-purple-900">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Create Scheme Dialog */}
          {isCreating && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Create Type Scheme</h2>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateScheme}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Scheme Name
                      </label>
                      <input
                        type="text"
                        value={newSchemeName}
                        onChange={(e) => setNewSchemeName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Image Assets"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Asset Types
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {assetTypes.map((type) => (
                          <label
                            key={type.id}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50"
                          >
                            <input
                              type="checkbox"
                              checked={selectedTypes.some(t => t.id === type.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTypes([...selectedTypes, type])
                                } else {
                                  setSelectedTypes(selectedTypes.filter(t => t.id !== type.id))
                                }
                              }}
                              className="text-purple-600 rounded"
                            />
                            <span>{type.name}</span>
                          </label>
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
                      disabled={!newSchemeName || selectedTypes.length === 0}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Scheme
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

export default TypeSchemes 