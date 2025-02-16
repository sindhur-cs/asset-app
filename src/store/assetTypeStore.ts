import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultAssetTypes, AssetType } from '../constants/assetTypes'

interface AssetTypeState {
  projectAssetTypes: Record<string, AssetType[]>
  addAssetType: (projectId: string, assetType: AssetType) => void
  addDefaultType: (projectId: string, defaultType: AssetType) => void
  getProjectTypes: (projectId: string) => AssetType[]
  removeAssetType: (projectId: string, assetTypeId: string) => void
}

export const useAssetTypeStore = create<AssetTypeState>()(
  persist(
    (set, get) => ({
      projectAssetTypes: {},
      
      addAssetType: (projectId, assetType) => {
        set((state) => ({
          projectAssetTypes: {
            ...state.projectAssetTypes,
            [projectId]: [...(state.projectAssetTypes[projectId] || []), assetType]
          }
        }))
      },

      addDefaultType: (projectId, defaultType) => {
        const projectType = {
          ...defaultType,
          id: `${projectId}-${defaultType.extension}`,
          projectId
        }
        set((state) => ({
          projectAssetTypes: {
            ...state.projectAssetTypes,
            [projectId]: [...(state.projectAssetTypes[projectId] || []), projectType]
          }
        }))
      },

      getProjectTypes: (projectId) => {
        return get().projectAssetTypes[projectId] || []
      },

      removeAssetType: (projectId, assetTypeId) => {
        set((state) => ({
          projectAssetTypes: {
            ...state.projectAssetTypes,
            [projectId]: state.projectAssetTypes[projectId]?.filter(
              type => type.id !== assetTypeId
            ) || []
          }
        }))
      }
    }),
    {
      name: 'asset-type-storage'
    }
  )
) 