import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CustomField } from './customFieldStore'

export interface AssetModel {
  id: string
  name: string
  customFields: CustomField[]
  isDefault?: boolean
  createdAt: string
}

const defaultModel: AssetModel = {
  id: 'default-model',
  name: 'Default Model',
  customFields: [],
  isDefault: true,
  createdAt: new Date().toISOString()
}

interface AssetModelState {
  models: AssetModel[]
  addModel: (name: string, customFields: CustomField[]) => void
  removeModel: (modelId: string) => void
  getModels: () => AssetModel[]
}

export const useAssetModelStore = create<AssetModelState>()(
  persist(
    (set, get) => ({
      models: [defaultModel],

      addModel: (name, customFields) => {
        const newModel: AssetModel = {
          id: `model-${Date.now()}`,
          name,
          customFields,
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          models: [...state.models, newModel]
        }))
      },

      removeModel: (modelId) => {
        set((state) => ({
          models: state.models.filter(model => model.id !== modelId)
        }))
      },

      getModels: () => {
        return get().models
      }
    }),
    {
      name: 'asset-model-storage'
    }
  )
) 