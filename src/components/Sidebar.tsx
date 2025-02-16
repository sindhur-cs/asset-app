import { Link, useLocation, useParams } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Layers, 
  Database, 
  Monitor, 
  Grid,
  FileSpreadsheet,
  Layout
} from 'lucide-react'
import { useProjectStore } from '../store/projectStore'

const Sidebar = () => {
  const location = useLocation()
  const params = useParams()
  const isProjectRoute = location.pathname.includes('/project/')
  const { getProject } = useProjectStore()
  const project = getProject(Number(params.id))
  const isActive = (path: string) => location.pathname === path

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' }
  ]

  const projectNavItems = [
    { 
      icon: Layers, 
      label: 'Asset Types', 
      path: `/project/${params.id}/asset-types` 
    },
    { 
      icon: Grid, 
      label: 'Asset Type Schemes', 
      path: `/project/${params.id}/type-schemes` 
    },
    { 
      icon: Database, 
      label: 'Asset Models', 
      path: `/project/${params.id}/models` 
    },
    { 
      icon: Monitor, 
      label: 'Screen Scheme', 
      path: `/project/${params.id}/screen-scheme` 
    },
    { 
      icon: FileSpreadsheet, 
      label: 'Custom Fields', 
      path: `/project/${params.id}/custom-fields` 
    },
  ]

  const navItems = isProjectRoute ? projectNavItems : mainNavItems

  return (
    <div className="w-64 min-h-screen bg-white border-r border-purple-100 p-6">
      <Link to="/" className="block mb-8">
        <h2 className="text-xl font-bold text-purple-900">Asset App</h2>
      </Link>
      
      {isProjectRoute && (
        <Link to={`/project/${params.id}`}>
            <div className="mb-8 px-4 py-3 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-purple-700">Current Project</h3>
            <p className="text-sm text-purple-900 mt-1">{project?.name}</p>
            </div>
        </Link>
      )}

      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {isProjectRoute && (
          <>
            <div className="h-px bg-purple-100 my-6" />
            <Link 
              to="/"
              className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-purple-600"
            >
              <LayoutDashboard className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}

export default Sidebar 