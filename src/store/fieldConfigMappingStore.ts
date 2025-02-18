import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssetType, defaultAssetTypes } from '../constants/assetTypes';
import { useProjectStore } from './projectStore';

export interface FieldConfigMapping {
  name: string;
  listMappings: {mappingId: number, assetTypes: AssetType[], fieldConfig: string}[],
  isDefault: boolean;
}

interface FieldConfigMappingState {
  mappings: FieldConfigMapping[];
  addMapping: (name: string, fieldConfig: string, assetTypes: AssetType[]) => void;
  removeMapping: (name: string) => void;
  getMappings: () => FieldConfigMapping[];
}

const defaultConfig: FieldConfigMapping = {
  name: 'Default Field Configuration Mapping',
  listMappings: [{ mappingId: Date.now(), assetTypes: defaultAssetTypes, fieldConfig: "default-config" }],
  isDefault: true
}

export const useFieldConfigMappingStore = create<FieldConfigMappingState>()(
  persist(
    (set, get) => ({
      mappings: [
        defaultConfig,
      ],

      addMapping: (name, fieldConfig, assetTypes) => {
        const mapping = get().mappings.find((mapping: FieldConfigMapping) => mapping.name === name);
        console.log(mapping, name);
        if(mapping) {
            const newMapping = { ...mapping, listMappings: [...mapping.listMappings, { mappingId: Date.now(), assetTypes, fieldConfig }] };
            set((state) => ({
                mappings: state.mappings.map((m) => m.name === mapping.name ? newMapping : m)
            }));

            // triggers the newly added mapping under the same field config scheme name
            useProjectStore.getState().updateProject(newMapping);

            return;
        }
        
        const newMapping: FieldConfigMapping = { 
          name, 
          listMappings: [{ mappingId: Date.now(), assetTypes, fieldConfig }],
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