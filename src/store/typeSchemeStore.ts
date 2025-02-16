import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultAssetTypes, AssetType } from '../constants/assetTypes'

export interface TypeScheme {
  id: string
  name: string
  projectId?: string
  assetTypes: AssetType[]
  isDefault?: boolean
}

const defaultScheme: TypeScheme = {
  id: 'default-scheme',
  name: 'Default Scheme',
  assetTypes: defaultAssetTypes,
  isDefault: true
}

interface TypeSchemeState {
  schemes: Record<string, TypeScheme[]>
  addScheme: (projectId: string, name: string, assetTypes: AssetType[]) => void
  removeScheme: (projectId: string, schemeId: string) => void
  getProjectSchemes: (projectId: string) => TypeScheme[]
}

export const useTypeSchemeStore = create<TypeSchemeState>()(
  persist(
    (set, get) => ({
      schemes: {},

      addScheme: (projectId, name, assetTypes) => {
        const newScheme: TypeScheme = {
          id: `${projectId}-${Date.now()}`,
          name,
          projectId,
          assetTypes
        }
        set((state) => {
          const currentSchemes = state.schemes[projectId] || [defaultScheme]
          const hasOnlyDefault = currentSchemes.length === 1 && currentSchemes[0].isDefault
          
          return {
            schemes: {
              ...state.schemes,
              [projectId]: hasOnlyDefault 
                ? [newScheme]  // Replace default with new scheme
                : [...currentSchemes, newScheme]  // Add to existing schemes
            }
          }
        })
      },

      removeScheme: (projectId, schemeId) => {
        set((state) => {
          const updatedSchemes = state.schemes[projectId]?.filter(
            scheme => scheme.id !== schemeId
          ) || []
          
          return {
            schemes: {
              ...state.schemes,
              [projectId]: updatedSchemes.length ? updatedSchemes : [defaultScheme]
            }
          }
        })
      },

      getProjectSchemes: (projectId) => {
        const schemes = get().schemes[projectId]
        return schemes || [defaultScheme]
      }
    }),
    {
      name: 'type-scheme-storage'
    }
  )
) 