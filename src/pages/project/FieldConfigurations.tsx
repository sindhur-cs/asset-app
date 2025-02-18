import { useState } from 'react'
import { Plus, Settings, Trash2, File, ChevronRight, Info } from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import { useFieldConfigurationStore } from '../../store/fieldConfigurationStore'
import { useCustomFieldStore, systemFields } from '../../store/customFieldStore'

const FieldConfigurations = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [configName, setConfigName] = useState('')
  const [selectedFields, setSelectedFields] = useState<Record<string, {
    name: string
    isHidden: boolean
    isMandatory: boolean
    isDefault: boolean
    defaultValue?: string
  }>>({})
  const [expandedFieldId, setExpandedFieldId] = useState<string | null>(null)
  
  const { getFields } = useCustomFieldStore()
  const { getConfigurations, addConfiguration, removeConfiguration } = useFieldConfigurationStore()
  
  const customFields = getFields()
  const configurations = getConfigurations()
  const allFields = [...systemFields, ...customFields]

  const systemFieldIds = new Set(systemFields.map(f => f.id));

  const handleCreateConfig = (e: React.FormEvent) => {
    e.preventDefault()
    if (configName && Object.keys(selectedFields).length > 0) {
      // Create default hidden state for system fields
      const systemFieldDefaults = Object.fromEntries(
        systemFields.map(field => [
          field.id,
          { 
            name: field.name,
            isHidden: true, 
            isMandatory: true, 
            isDefault: true 
          }
        ])
      )
      
      addConfiguration({
        id: `config-${Date.now()}`,
        name: configName,
        fieldConfigs: Object.entries({
          ...systemFieldDefaults, // System fields default to hidden
          ...selectedFields       // User selections override defaults
        }).map(([fieldId, settings]) => ({
          fieldId,
          ...settings
        }))
      })
      setConfigName('')
      setSelectedFields({})
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
              <h1 className="text-2xl font-bold text-purple-900">Field Configurations</h1>
              <p className="text-gray-600 mt-1">Manage field visibility and requirements</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              Create Configuration
            </button>
          </div>

          {/* Configurations List */}
          <div className="grid gap-4">
            {configurations.map((config) => (
              <div 
                key={config.id} 
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-purple-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center">
                        {config.name}
                        {config.id === "default-config" && (
                          <span className="ml-2 text-sm text-purple-600">(Default)</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {config.fieldConfigs.length} fields configured
                      </p>
                    </div>
                  </div>
                  {config.id !== "default-config" && (
                    <button
                      onClick={() => removeConfiguration(config.id)}
                      className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-7 mb-2">
                  {config.fieldConfigs.map((f) => {
                    const field = allFields.find(field => field.id === f.fieldId);
                    return (
                        <div className="flex flex-col p-2 bg-purple-50 rounded-lg">
                      <div key={f.fieldId} className="flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                          {systemFieldIds.has(f.fieldId) ? (
                            <Settings className="h-4 w-4 text-purple-600" />
                          ) : (
                            <File className="h-4 w-4 text-purple-600" />
                          )}
                          <span className="text-sm">{field?.name}</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          {f.isHidden && (
                            <div className="flex items-center gap-1 px-4 text-purple-600 bg-purple-100 p-2 rounded-2xl">
                              <span className="text-xs">Hidden</span>
                            </div>
                          )}
                          {f.isMandatory && (
                            <div className="flex items-center gap-1 px-4 text-purple-600 bg-purple-100 p-2 rounded-2xl">
                              <span className="text-xs">Mandatory</span>
                            </div>
                          )}
                        </div>
                      </div>
                          {f.defaultValue && (
                            <div className="flex items-center gap-2 py-1.5 bg-purple-50 rounded-lg text-purple-600">
                              <Info className="h-4 w-4" />
                              <span className="text-xs">{f.defaultValue}</span>
                            </div>
                          )}
                        </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Create Configuration Dialog */}
          {isCreating && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Create Field Configuration</h2>
                <form onSubmit={handleCreateConfig}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Configuration Name</label>
                      <input
                        type="text"
                        value={configName}
                        onChange={(e) => setConfigName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Custom Configuration"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                      {allFields.map((field) => {
                        const isSystemField = systemFieldIds.has(field.id);
                        const isExpanded = expandedFieldId === field.id;
                        
                        return (
                          <div 
                            key={field.id}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <div 
                              className={`flex items-center justify-between p-3 ${!isSystemField ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                              onClick={() => !isSystemField && setExpandedFieldId(isExpanded ? null : field.id)}
                            >
                              <div className="flex items-center gap-3">
                                {isSystemField ? (
                                  <Settings className="h-4 w-4 text-purple-600" />
                                ) : (
                                  <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                )}
                                <span className="text-sm">{field.name}</span>
                                {isSystemField && (
                                  <span className="text-xs text-purple-600">(System)</span>
                                )}
                              </div>
                            </div>

                            {!isSystemField && isExpanded && (
                              <div className="pl-8 pr-4 pb-3 space-y-2">
                                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                                  <input
                                    type="checkbox"
                                    checked={selectedFields[field.id]?.isHidden || false}
                                    onChange={(e) => setSelectedFields({
                                      ...selectedFields,
                                      [field.id]: { 
                                        ...selectedFields[field.id],
                                        name: field.name,
                                        isHidden: e.target.checked 
                                      }
                                    })}
                                    className="text-purple-600 rounded"
                                  />
                                  <span className="text-sm">Hidden</span>
                                </label>
                                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                                  <input
                                    type="checkbox"
                                    checked={selectedFields[field.id]?.isMandatory || false}
                                    onChange={(e) => setSelectedFields({
                                      ...selectedFields,
                                      [field.id]: { 
                                        ...selectedFields[field.id],
                                        name: field.name,
                                        isMandatory: e.target.checked 
                                      }
                                    })}
                                    className="text-purple-600 rounded"
                                  />
                                  <span className="text-sm">Mandatory</span>
                                </label>
                                <div className="space-y-1 px-1 flex flex-col gap-0.5">
                                  <input
                                    type="text"
                                    value={selectedFields[field.id]?.defaultValue || ''}
                                    onChange={(e) => setSelectedFields({
                                      ...selectedFields,
                                      [field.id]: {
                                        ...selectedFields[field.id],
                                        name: field.name,
                                        defaultValue: e.target.value
                                      }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-200 transition-colors duration-200"
                                    placeholder="Enter help text..."
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
                      Create Configuration
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

export default FieldConfigurations 