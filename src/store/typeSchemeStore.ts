import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultAssetTypes, AssetType } from '../constants/assetTypes'

export interface TypeScheme {
  id: string
  name: string
  assetTypes: AssetType[]
  isDefault?: boolean
}

const defaultScheme: TypeScheme = {
  id: 'default-scheme',
  name: 'Default Asset Type Group',
  assetTypes: defaultAssetTypes,
  isDefault: true
}

interface TypeSchemeState {
  schemes: TypeScheme[]
  addScheme: (name: string, assetTypes: AssetType[]) => void
  removeScheme: (schemeId: string) => void
  getSchemes: () => TypeScheme[]
}

export const useTypeSchemeStore = create<TypeSchemeState>()(
  persist(
    (set, get) => ({
      schemes: [defaultScheme],

      addScheme: (name, assetTypes) => {
        const newScheme: TypeScheme = {
          id: `scheme-${Date.now()}`,
          name,
          assetTypes
        }
        set((state) => ({
          schemes: [...state.schemes, newScheme]
        }))
      },

      removeScheme: (schemeId) => {
        set((state) => ({
          schemes: state.schemes.filter(scheme => scheme.id !== schemeId)
        }))
      },

      getSchemes: () => {
        return get().schemes
      }
    }),
    {
      name: 'type-scheme-storage'
    }
  )
) 