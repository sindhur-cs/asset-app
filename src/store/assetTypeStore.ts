import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AssetType } from '../constants/assetTypes'

interface AssetTypeState {
  assetTypes: AssetType[],
  addAssetType: (assetType: AssetType) => void
  addDefaultType: (defaultType: AssetType) => void
  removeAssetType: (assetTypeId: string) => void
}

export const useAssetTypeStore = create<AssetTypeState>()(
  persist(
    (set, get) => ({
      assetTypes: [],
      
      addAssetType: (assetType) => {
        set({
          assetTypes: [...(get().assetTypes || []), assetType]
        })
      },

      addDefaultType: (defaultType) => {
        set({
          assetTypes: [...(get().assetTypes || []), defaultType]
        })
      },

      removeAssetType: (assetTypeId) => {
        set({
          assetTypes: get().assetTypes.filter(type => type.id !== assetTypeId)
        })
      }
    }),
    {
      name: 'asset-type-storage'
    }
  )
) 