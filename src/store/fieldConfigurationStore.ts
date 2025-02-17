import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { systemFields } from './customFieldStore'

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

const defaultConfig: FieldConfiguration = {
  id: 'default-config',
  name: 'Default Configuration',
  fieldConfigs: systemFields.map(field => ({
    fieldId: field.id,
    isHidden: false,
    isMandatory: true
  }))
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
      configurations: [defaultConfig],
      
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