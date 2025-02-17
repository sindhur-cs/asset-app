import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useProjectStore } from '../store/projectStore'
import { useTypeSchemeStore } from '../store/typeSchemeStore'
import { useMappingStore } from '../store/mappingStore'
import { useFieldConfigMappingStore } from '../store/fieldConfigMappingStore'
import MappingCard from '../components/MappingCard'
import FieldConfigMappingCard from '../components/FieldConfigMappingCard'
import { Database, File, FileSpreadsheet, Layers } from 'lucide-react'

const Project = () => {
    const { id } = useParams()
    const { getProject } = useProjectStore()
    const { getSchemes } = useTypeSchemeStore()
    const { getMappings } = useMappingStore()
    const { getMappings: getFieldConfigMappings } = useFieldConfigMappingStore()

    const project = getProject(Number(id))
    const defaultScheme = getSchemes().find(scheme => scheme.isDefault)
    const defaultModelMapping = getMappings().find(mapping => mapping.isDefault)
    const defaultFieldConfigMapping = getFieldConfigMappings().find(mapping => mapping.isDefault)

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-purple-900 mb-6">{project?.name}</h1>

                    <div className="flex flex-col gap-4 mt-11">
                        {/* Default Asset Group */}
                        {defaultScheme && (
                            <div className="mb-8">
                                <div className="flex items-center text-purple-700 gap-2 mb-4">
                                    <Layers className="h-5 w-5" />
                                    <h2 className="text-xl font-semibold text-purple-900">Asset Type Group</h2>
                                </div>
                                <div className="bg-white rounded-lg border border-purple-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                        {defaultScheme.name}
                                        <span className="ml-2 text-sm text-purple-600">(Default)</span>
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">{defaultScheme.assetTypes.length} types</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {defaultScheme.assetTypes.map((type) => (
                                            <div key={type.id} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                                                <File className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm text-purple-900">{type.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Default Model Mapping */}
                        {defaultModelMapping && (
                            <div className="mb-8">
                                <div className="flex items-center text-purple-700 gap-2 mb-4">
                                    <Database className="h-5 w-5" />
                                    <h2 className="text-xl font-semibold text-purple-900">Asset Model Mapping</h2>
                                </div>
                                <MappingCard
                                    name={defaultModelMapping.name}
                                    assetTypes={defaultModelMapping.assetTypes}
                                    assetModel={defaultModelMapping.assetModel}
                                    isDefault={defaultModelMapping.isDefault}
                                />
                            </div>
                        )}

                        {/* Default Field Configuration Mapping */}
                        {defaultFieldConfigMapping && (
                            <div className="mb-8">
                                <div className="flex items-center text-purple-700 gap-2 mb-4">
                                    <FileSpreadsheet className="h-5 w-5" />
                                    <h2 className="text-xl font-semibold text-purple-900">Field Configuration Mapping</h2>
                                </div>
                                <FieldConfigMappingCard
                                    name={defaultFieldConfigMapping.name}
                                    assetTypes={defaultFieldConfigMapping.assetTypes}
                                    fieldConfig={defaultFieldConfigMapping.fieldConfig}
                                    isDefault={defaultFieldConfigMapping.isDefault}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Project 