import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssetType, defaultAssetTypes } from '../constants/assetTypes';

interface FieldConfigMapping {
  name: string;
  assetTypes: AssetType[];
  fieldConfig: string;
  isDefault: boolean;
}

interface FieldConfigMappingState {
  mappings: FieldConfigMapping[];
  addMapping: (name: string, fieldConfig: string, assetTypes: AssetType[]) => void;
  removeMapping: (name: string) => void;
  getMappings: () => FieldConfigMapping[];
}

const defaultConfig: FieldConfigMapping = {
  name: 'Default Field Config Mapping',
  assetTypes: defaultAssetTypes,
  fieldConfig: 'default-config',
  isDefault: true
}

export const useFieldConfigMappingStore = create<FieldConfigMappingState>()(
  persist(
    (set, get) => ({
      mappings: [
        defaultConfig,
      ],

      addMapping: (name, fieldConfig, assetTypes) => {
        const newMapping: FieldConfigMapping = { 
          name, 
          fieldConfig, 
          assetTypes, 
          isDefault: false 
        };
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
      name: 'field-config-mapping-storage',
    }
  )
); 