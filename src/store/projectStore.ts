import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FieldConfigMapping } from './fieldConfigMappingStore'

export interface Project {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  fieldConfigurationMapping: FieldConfigMapping
}

interface ProjectState {
  projects: Project[]
  addProject: (name: string, fieldConfigurationMapping: FieldConfigMapping) => void
  updateProject: (newMapping: FieldConfigMapping) => void
  getProject: (id: number) => Project | undefined
  removeProject: (id: number) => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      
      addProject: (name, fieldConfigurationMapping) => {
        const newProject = {
          id: Date.now(),
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          fieldConfigurationMapping
        }
        set((state) => ({
          projects: [...state.projects, newProject]
        }))
        return newProject
      },

      updateProject: (newMapping: FieldConfigMapping) => {
        console.log(newMapping);
        set((state) => ({
          projects: state.projects.map(project => 
            project.fieldConfigurationMapping.name === newMapping.name
              ? { 
                  ...project, 
                  fieldConfigurationMapping: newMapping,
                  updatedAt: new Date().toISOString()
                }
              : project
          )
        }))
      },

      getProject: (id) => {
        return get().projects.find((project) => project.id === id)
      },

      removeProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id)
        }))
      },
    }),
    {
      name: 'project-storage'
    }
  )
) 