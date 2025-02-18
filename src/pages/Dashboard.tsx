import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import CreateProjectDialog from '../components/CreateProjectDialog'
import ProjectCard from '../components/ProjectCard'
import { useProjectStore } from '../store/projectStore'
import { useFieldConfigMappingStore } from '../store/fieldConfigMappingStore'

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [selectedMapping, setSelectedMapping] = useState('')
  
  const { projects, addProject } = useProjectStore()
  const { getMappings } = useFieldConfigMappingStore()
  const mappings = getMappings()

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim()) {
      const selectedMappingConfig = mappings.find(mapping => mapping.name === selectedMapping)
      addProject(projectName.trim(), selectedMappingConfig || mappings[0])
      setProjectName('')
      setSelectedMapping('')
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Spaces</h1>
              <p className="text-gray-600 mt-1">Manage and organize your spaces</p>
            </div>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              Create Space
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                name={project.name}
                updatedAt={project.updatedAt}
              />
            ))}
          </div>
        </div>

        <CreateProjectDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          projectName={projectName}
          onProjectNameChange={setProjectName}
          onSubmit={handleCreateProject}
          mappings={mappings}
          selectedMapping={selectedMapping}
          onMappingChange={setSelectedMapping}
        />
      </main>
    </div>
  )
}

export default Dashboard 