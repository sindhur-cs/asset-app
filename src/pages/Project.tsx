import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useProjectStore } from '../store/projectStore'
import { Layers } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldConfigMappingStore } from '../store/fieldConfigMappingStore'
import { useFieldConfigurationStore } from '../store/fieldConfigurationStore'

const Project = () => {
    const { id } = useParams()
    const { getProject } = useProjectStore()
    const [assets, setAssets] = useState(new Map());
    const { mappings } = useFieldConfigMappingStore();
    const { getConfiguration, configurations } = useFieldConfigurationStore();

    const project = getProject(Number(id))
    console.log(project);
    if(!project) {
        return <>No Project found</>
    }

    const { listMappings } = project.fieldConfigurationMapping;

    useEffect(() => {
        const newAssets = new Map(assets); // creating a local map to store the data temporarily

        listMappings.forEach((listMapping) => {
            // get the fields configured
            const { fieldConfig } = listMapping;
            const configuration = getConfiguration(fieldConfig);
            const getConfiguredFields = new Set(configuration?.fieldConfigs.map((f) => f.name));

            // get the assets mapped
            const assetsList = listMapping.assetTypes.map((asset) => ({ 
                name: asset.name, 
                category: (asset.category || "Custom") 
            }));

            assetsList.forEach((asset) => {
                if(newAssets.has(asset.name)) {
                    const existingAsset = newAssets.get(asset.name);
                    const mergedFields = new Set([...existingAsset.configuredFields, ...getConfiguredFields]);
                    newAssets.set(asset.name, { 
                        category: asset.category, 
                        configuredFields: mergedFields 
                    });
                }
                else {
                    newAssets.set(asset.name, { 
                        category: asset.category, 
                        configuredFields: new Set(getConfiguredFields) 
                    });
                }
            });
        });

        setAssets(newAssets);
    }, [listMappings, project, mappings, mappings.length]);

    const isFieldMandatory = (fieldName: string) => {
        console.log(configurations)
        return configurations?.some(config => 
            config.fieldConfigs?.some(fieldConfig => 
                fieldConfig.name === fieldName && fieldConfig.isMandatory
            )
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-purple-900 mb-6">{project?.name}</h1>

                    <div className="flex flex-col gap-4 mt-11">
                        <div>
                            <div className="flex items-center text-purple-700 gap-2 mb-2">
                                <Layers className="h-5 w-5" />
                                <h2 className="text-xl font-semibold text-purple-900">Asset Types</h2>
                            </div>
                        </div>
                        <div>
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Configured Fields</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {/* destructing the asset elements so that it can be used as variables */}
                                    {Array.from(assets).map(([assetName, { category, configuredFields }]) => (
                                        <tr key={assetName}>
                                            <td className="px-6 py-4 text-sm font-medium text-purple-900">{assetName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{category}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.from(configuredFields).map((field, index) => {
                                                        // @ts-ignore
                                                        const isMandatory = isFieldMandatory(field);
                                                        return (
                                                            <span 
                                                                key={index}
                                                                className={`px-2 py-1 rounded text-xs ${
                                                                    isMandatory 
                                                                        ? 'bg-purple-600 text-white' 
                                                                        : 'bg-purple-100 text-purple-400'
                                                                }`}
                                                            >
                                                                {/* @ts-ignore */}
                                                                {field || ""}
                                                            </span>
                                                        );
                                                    })}
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