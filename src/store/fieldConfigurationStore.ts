import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FieldConfig {
  fieldId: string
  isHidden: boolean
  isMandatory: boolean
}

export interface FieldConfiguration {
  id: string
  name: string
  fieldConfigs: FieldConfig[]
}

interface FieldConfigurationState {
  configurations: FieldConfiguration[]
  addConfiguration: (config: FieldConfiguration) => void
  removeConfiguration: (configId: string) => void
  getConfigurations: () => FieldConfiguration[]
}

export const useFieldConfigurationStore = create<FieldConfigurationState>()(
  persist(
    (set, get) => ({
      configurations: [],
      
      addConfiguration: (config) => {
        set((state) => ({
          configurations: [...state.configurations, config]
        }))
      },
      
      removeConfiguration: (configId) => {
        set((state) => ({
          configurations: state.configurations.filter(c => c.id !== configId)
        }))
      },
      
      getConfigurations: () => {
        return get().configurations
      }
    }),
    {
      name: 'field-configuration-storage'
    }
  )
) 