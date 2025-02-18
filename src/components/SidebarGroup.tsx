import { Link } from 'react-router-dom'
import {
    Settings,
    Layers,
    Database,
    Monitor,
    Grid,
    FileSpreadsheet,
    LucideProps
} from 'lucide-react'
import { useSidebarStore } from '../store/sidebarStore'

const SidebarGroup = ({ item }: { item: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, label: string, path: string, isGroup: boolean } }) => {
    const { isAssetModelsOpen, isAssetTypesOpen, isFieldsOpen, toggleAssetModels, toggleAssetTypes, toggleFields } = useSidebarStore()
    const Icon = item.icon
    const isActive = (path: string) => location.pathname === path

    return (
        <>
            {item.isGroup ? <>
                <button
                    onClick={() => {
                        if (item.label === 'Asset Models') {
                            toggleAssetModels()
                        } else if (item.label === 'Asset Types') {
                            toggleAssetTypes()
                        } else if (item.label === 'Fields') {
                            toggleFields()
                        }
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left text-purple-800"
                >
                    <div className="flex-shrink-0">
                        <Icon className="h-5 w-5" />
                    </div>
                    {item.label}
                </button>
                {item.label === 'Asset Models' && isAssetModelsOpen && (
                    <ul className="ml-7 space-y-2 mt-2 border-l-[1.5px] border-purple-400 pl-1 mb-2">
                        <li>
                            <Link
                                to={`/models`}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive('/models')
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Database className="h-5 w-5" />
                                </div>
                                Asset Models
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/asset-model-scheme`}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive('/asset-model-scheme')
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Monitor className="h-5 w-5" />
                                </div>
                                Asset Model Mappings
                            </Link>
                        </li>
                    </ul>
                )}
                {item.label === 'Asset Types' && isAssetTypesOpen && (
                    <ul className="ml-7 space-y-2 mt-2 border-l-[1.5px] border-purple-400 pl-1 mb-2">
                        <li>
                            <Link
                                to={`/asset-types`}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive('/asset-types')
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Layers className="h-5 w-5" />
                                </div>
                                Asset Types
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/type-schemes`}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive('/type-schemes')
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Grid className="h-5 w-5" />
                                </div>
                                Asset Type Groups
                            </Link>
                        </li>
                    </ul>
                )}
                {item.label === 'Fields' && isFieldsOpen && (
                    <ul className="ml-7 space-y-2 mt-2 border-l-[1.5px] border-purple-400 pl-1 mb-2">
                        <li>
                            <Link
                                to={`/custom-fields`}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive('/custom-fields')
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <FileSpreadsheet className="h-5 w-5" />
                                </div>
                                Custom Fields
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/field-configurations`}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive('/field-configurations')
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Settings className="h-5 w-5" />
                                </div>
                                Field Configurations
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/field-configuration-mappings`}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive('/field-configuration-mappings')
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Grid className="h-5 w-5" />
                                </div>
                                Field Configuration Mappings
                            </Link>
                        </li>
                    </ul>
                )}
            </> : <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive(item.path)
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                    }`}
            >
                <div className="flex-shrink-0">
                    <Icon className="h-5 w-5" />
                </div>
                {item.label}
            </Link>}
        </>
    )
}

export default SidebarGroup