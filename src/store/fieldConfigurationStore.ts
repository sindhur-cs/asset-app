import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { systemFields } from './customFieldStore'

export interface FieldConfig {
  fieldId: string
  name: string
  isHidden: boolean
  isMandatory: boolean
  defaultValue?: string
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
    name: field.name,
    isHidden: true,
    isMandatory: true,
    defaultValue: ''
  }))
}

interface FieldConfigurationState {
  configurations: FieldConfiguration[]
  addConfiguration: (config: FieldConfiguration) => void
  removeConfiguration: (configId: string) => void
  getConfigurations: () => FieldConfiguration[]
  getConfiguration: (config: string) => FieldConfiguration | null
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
      },

      getConfiguration: (config) => {
        return get().configurations.find((c) => config === c.id) || null
      }
    }),
    {
      name: 'field-configuration-storage'
    }
  )
) 