import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Project {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

interface ProjectState {
  projects: Project[]
  addProject: (name: string) => void
  updateProject: (id: number, name: string) => void
  deleteProject: (id: number) => void
  getProject: (id: number) => Project | undefined
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      
      addProject: (name) => {
        const newProject = {
          id: Date.now(),
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          projects: [...state.projects, newProject]
        }))
        return newProject
      },

      updateProject: (id, name) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, name, updatedAt: new Date().toISOString() }
              : project
          )
        }))
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id)
        }))
      },

      getProject: (id) => {
        return get().projects.find((project) => project.id === id)
      },
    }),
    {
      name: 'project-storage'
    }
  )
) 