import { Link, useLocation, useParams } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Settings, 
  Layers, 
  Database, 
  Monitor, 
  Grid,
  FileSpreadsheet
} from 'lucide-react'
import { useProjectStore } from '../store/projectStore'
import { useSidebarStore } from '../store/sidebarStore' 

const Sidebar = () => {
  const location = useLocation()
  const params = useParams()
  const isProjectRoute = location.pathname.includes('/project/')
  const { getProject } = useProjectStore()
  const project = getProject(Number(params.id))
  const isActive = (path: string) => location.pathname === path
  const { isAssetModelsOpen, isAssetTypesOpen, isFieldsOpen, toggleAssetModels, toggleAssetTypes, toggleFields } = useSidebarStore()

  const navItems = [
    { icon: LayoutDashboard, label: 'Spaces', path: '/' },
    { 
      icon: Layers, 
      label: 'Asset Types', 
      path: `/asset-types`, 
      isGroup: true
    },
    { 
      icon: Database, 
      label: 'Asset Models', 
      path: `/models`, 
      isGroup: true
    },
    { 
      icon: FileSpreadsheet, 
      label: 'Fields', 
      path: `/fields`, 
      isGroup: true
    },
  ]

  return (
    <div className="w-64 min-h-screen bg-white border-r border-purple-100 p-6">
      <Link to="/" className="block mb-8">
        <h2 className="text-xl font-bold text-purple-900">Asset App</h2>
      </Link>
      
      {isProjectRoute && (
        <Link to={`/project/${params.id}`}>
            <div className="mb-4 px-4 py-3 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-purple-700">Current Space</h3>
            <p className="text-sm text-purple-900 mt-1">{project?.name}</p>
            </div>
        </Link>
      )}

      <nav>
        {!isProjectRoute && <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                {item.isGroup ? (
                  <>
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
                      <ul className="ml-7 space-y-2 mt-2 border-l-[1.5px] border-purple-400 pl-1">
                        <li>
                          <Link 
                            to={`/models`}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isActive('/models')
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
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isActive('/asset-model-scheme')
                                ? 'bg-purple-50 text-purple-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                            }`}
                          >
                            <div className="flex-shrink-0">
                              <Monitor className="h-5 w-5" />
                            </div>
                            Asset Model Scheme
                          </Link>
                        </li>
                      </ul>
                    )}
                    {item.label === 'Asset Types' && isAssetTypesOpen && (
                      <ul className="ml-7 space-y-2 mt-2 border-l-[1.5px] border-purple-400 pl-1">
                        <li>
                          <Link 
                            to={`/asset-types`}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isActive('/asset-types')
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
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isActive('/type-schemes')
                                ? 'bg-purple-50 text-purple-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                            }`}
                          >
                            <div className="flex-shrink-0">
                              <Grid className="h-5 w-5" />
                            </div>
                            Asset Type Schemes
                          </Link>
                        </li>
                      </ul>
                    )}
                    {item.label === 'Fields' && isFieldsOpen && (
                      <ul className="ml-7 space-y-2 mt-2 border-l-[1.5px] border-purple-400 pl-1">
                        <li>
                          <Link 
                            to={`/custom-fields`}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isActive('/custom-fields')
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
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isActive('/field-configurations')
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
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isActive('/field-configuration-mappings')
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
                  </>
                ) : (
                  <Link 
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-purple-50 text-purple-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>}

        {isProjectRoute && (
          <>
            <Link 
              to="/"
              className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-purple-600"
            >
              <LayoutDashboard className="h-5 w-5" />
              Back to Spaces
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}

export default Sidebar 