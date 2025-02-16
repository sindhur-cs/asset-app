import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssetType, defaultAssetTypes } from '../constants/assetTypes';

interface Mapping {
  name: string;
  assetTypes: AssetType[];
  assetModel: string;
  isDefault: boolean;
}

interface MappingState {
  mappings: Mapping[];
  addMapping: (name: string, assetModel: string, assetTypes: AssetType[]) => void;
  removeMapping: (name: string) => void;
  getMappings: () => Mapping[];
}

export const useMappingStore = create<MappingState>()(
  persist(
    (set, get) => ({
      mappings: [
        {
          name: 'Default Mapping',
          assetTypes: defaultAssetTypes,
          assetModel: '',
          isDefault: true
        },
      ],

      addMapping: (name, assetModel, assetTypes) => {
        const newMapping: Mapping = { name, assetModel, assetTypes, isDefault: false };
        set((state) => ({
          mappings: [...state.mappings, newMapping],
        }));
      },

      removeMapping: (name) => {
        set((state) => ({
          mappings: state.mappings.filter((mapping) => mapping.name !== name),
        }));
      },

      getMappings: () => {
        return get().mappings;
      },
    }),
    {
      name: 'mapping-storage',
    }
  )
); 