import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CustomField, systemFields } from './customFieldStore'

export interface AssetModel {
  id: string
  name: string
  projectId: string
  customFields: CustomField[]
  isDefault?: boolean
  createdAt: string
}

const defaultModel: AssetModel = {
  id: 'default-model',
  name: 'Default Screen',
  projectId: '',
  customFields: [],
  isDefault: true,
  createdAt: new Date().toISOString()
}

interface AssetModelState {
  models: Record<string, AssetModel[]>
  addModel: (projectId: string, name: string, customFields: CustomField[]) => void
  removeModel: (projectId: string, modelId: string) => void
  getProjectModels: (projectId: string) => AssetModel[]
}

export const useAssetModelStore = create<AssetModelState>()(
  persist(
    (set, get) => ({
      models: {},

      addModel: (projectId, name, customFields) => {
        const newModel: AssetModel = {
          id: `${projectId}-${Date.now()}`,
          name,
          projectId,
          customFields,
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          models: {
            ...state.models,
            [projectId]: [...(state.models[projectId] || [defaultModel]), newModel]
          }
        }))
      },

      removeModel: (projectId, modelId) => {
        set((state) => {
          // Don't allow removal of default model
          if (state.models[projectId]?.find(model => model.id === modelId)?.isDefault) {
            return state
          }
          return {
            models: {
              ...state.models,
              [projectId]: state.models[projectId]?.filter(model => model.id !== modelId) || [defaultModel]
            }
          }
        })
      },

      getProjectModels: (projectId) => {
        const models = get().models[projectId] || [{ ...defaultModel, projectId }]
        return models
      }
    }),
    {
      name: 'asset-model-storage'
    }
  )
) 