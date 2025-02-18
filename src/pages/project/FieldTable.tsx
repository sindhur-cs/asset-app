import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { useProjectStore } from '../../store/projectStore'
import { FileSpreadsheet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldConfigMappingStore } from '../../store/fieldConfigMappingStore'
import { useFieldConfigurationStore } from '../../store/fieldConfigurationStore'
import { useCustomFieldStore, systemFields } from '../../store/customFieldStore'

const Project = () => {
    const { id } = useParams()
    const { getProject } = useProjectStore()
    const [fieldsMap, setFieldsMap] = useState(new Map())
    const { mappings } = useFieldConfigMappingStore()
    const { getConfiguration } = useFieldConfigurationStore()
    const { getFields } = useCustomFieldStore()
    const customFields = getFields()
    const allFields = [...systemFields, ...customFields]

    const project = getProject(Number(id))
    if(!project) return <>No Project found</>

    const { listMappings } = project.fieldConfigurationMapping

    useEffect(() => {
        const newFields = new Map()

        listMappings.forEach((listMapping) => {
            const configuration = getConfiguration(listMapping.fieldConfig)
            if(!configuration) return

            // Get assets for this mapping
            const assetNames = listMapping.assetTypes.map(asset => asset.name)

            configuration.fieldConfigs.forEach((fieldConfig) => {
                const field = allFields.find(f => f.id === fieldConfig.fieldId)
                if(!field) return

                if(newFields.has(field.id)) {
                    const existing = newFields.get(field.id)
                    assetNames.forEach(name => existing.assets.add(name))
                } else {
                    newFields.set(field.id, {
                        name: field.name,
                        type: field.type,
                        assets: new Set(assetNames)
                    })
                }
            })
        })

        setFieldsMap(newFields)
    }, [listMappings, project, mappings, getConfiguration])

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-purple-900 mb-6">{project.name}</h1>
                    <div className="flex flex-col gap-4 mt-11">
                        <div>
                            <div className="flex items-center text-purple-700 gap-2 mb-2">
                                <FileSpreadsheet className="h-5 w-5" />
                                <h2 className="text-xl font-semibold text-purple-900">Fields</h2>
                            </div>
                        </div>
                        <div>
                            <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {Array.from(fieldsMap).map(([fieldId, { name, type, assets }]) => (
                                        <tr key={fieldId} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-purple-900">{name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <span className="text-gray-500 py-1 text-xs capitalize">
                                                    {type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.from(assets).map((asset, index) => (
                                                        <span 
                                                            key={index}
                                                            className="bg-purple-100 text-purple-400 px-2 py-1 rounded text-xs"
                                                        >
                                                            {/* @ts-ignore */}
                                                            {asset || ""}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Project 