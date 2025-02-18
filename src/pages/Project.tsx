import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useProjectStore } from '../store/projectStore'
import { Layers } from 'lucide-react'

const Project = () => {
    const { id } = useParams()
    const { getProject } = useProjectStore()

    const project = getProject(Number(id))

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-purple-900 mb-6">{project?.name}</h1>

                    <div className="flex flex-col gap-4 mt-11">
                        <div className="mb-8">
                            <div className="flex items-center text-purple-700 gap-2 mb-4">
                                <Layers className="h-5 w-5" />
                                <h2 className="text-xl font-semibold text-purple-900">Asset Types</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-3">
                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Project 