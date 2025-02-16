import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useProjectStore } from '../store/projectStore'

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
        </div>
      </main>
    </div>
  )
}

export default Project 