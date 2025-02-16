import { Link } from 'react-router-dom'
import { Folder } from 'lucide-react'

interface ProjectCardProps {
  id: number
  name: string
  updatedAt: string
}

const ProjectCard = ({ id, name, updatedAt }: ProjectCardProps) => {
  const formatDate = (date: string) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      'day'
    )
  }

  return (
    <Link
      to={`/project/${id}`}
      className="group p-6 bg-white border border-purple-100 rounded-lg shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-200">
          <Folder className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">Updated {formatDate(updatedAt)}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard 