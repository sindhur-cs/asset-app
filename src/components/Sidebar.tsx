import { Link, useLocation, useParams } from 'react-router-dom'
import {
    LayoutDashboard,
    Settings,
    Layers,
    Database,
    FileSpreadsheet
} from 'lucide-react'
import { useProjectStore } from '../store/projectStore'
import { useSidebarStore } from '../store/sidebarStore'
import SidebarGroup from './SidebarGroup'
import { useState } from 'react'

const Sidebar = () => {
    const location = useLocation()
    const params = useParams()
    const isProjectRoute = location.pathname.includes('/project/')
    const { getProject } = useProjectStore()
    const project = getProject(Number(params.id))
    const isActive = (path: string) => location.pathname === path
    const { toggleSettings, isSettingOpen } = useSidebarStore();
    const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);

    const navItems = [
        {
            icon: LayoutDashboard,
            label: 'Spaces',
            path: '/'
        },
        {
            icon: Settings,
            label: "Settings",
            path: "/settings",
            isGroup: true,
            children: [
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
        }
    ]

    const projectSettingsItems = [
        {
            icon: Settings,
            label: "Space Settings",
            path: "",
            isGroup: true,
            children: [
                {
                    icon: Layers,
                    label: 'Asset Types',
                    path: `/project/${params.id}`
                },
                {
                    icon: FileSpreadsheet,
                    label: 'Fields',
                    path: `/project/${params.id}/fields`
                },
            ]
        }
    ]

    return (
        <div className="w-72 min-h-screen bg-white border-r border-purple-100 p-6">
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
                                    (item.children && item.children.length > 0) ?
                                        <>
                                            <button
                                                onClick={() => {
                                                    if (item.label === 'Settings') {
                                                        toggleSettings();
                                                    }
                                                }}
                                                className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left text-purple-800"
                                            >
                                                <div className="flex-shrink-0">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                {item.label}
                                            </button>
                                            {
                                                isSettingOpen && <div className="flex flex-col gap-1.5 ml-7 mt-2 border-l-[1.5px] border-purple-400">
                                                    {
                                                        item.children.map((item: any) => (
                                                            <SidebarGroup key={item.path} item={item} />
                                                        ))
                                                    }
                                                </div>
                                            }
                                        </> :
                                        <SidebarGroup item={item} />
                                ) : (
                                    <Link
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
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ul>}

                {isProjectRoute && (
                    <div className="flex flex-col gap-3">
                    <ul className="space-y-2">
                        {projectSettingsItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <li key={item.path}>
                                    {item.isGroup ? (
                                        (item.children && item.children.length > 0) ?
                                            <>
                                                <button
                                                    onClick={() => {
                                                        if (item.label === 'Space Settings') {
                                                            setIsProjectSettingsOpen(!isProjectSettingsOpen);
                                                        }
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left text-purple-800"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    {item.label}
                                                </button>
                                                {
                                                    isProjectSettingsOpen && <div className="flex flex-col gap-1.5 ml-7 mt-2 border-l-[1.5px] border-purple-400">
                                                        {
                                                            item.children.map((item: any) => (
                                                                <SidebarGroup key={item.path} item={item} />
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </> :
                                            <SidebarGroup item={item} />
                                    ) : (
                                        <Link
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
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-purple-600"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Back to Spaces
                    </Link>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Sidebar 