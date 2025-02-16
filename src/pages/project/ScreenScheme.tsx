import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

const ScreenScheme = () => {
  const { id } = useParams()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-900">Screen Scheme</h1>
            <p className="text-gray-600 mt-1">Manage screen scheme for Project {id}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ScreenScheme 