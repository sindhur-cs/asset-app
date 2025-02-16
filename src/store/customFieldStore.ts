import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'select'

export interface CustomField {
  id: string
  name: string
  type: FieldType
  projectId: string
  required: boolean
  options?: string[] // For select type fields
}

// System fields that will be available for all asset types
export const systemFields = [
  {
    id: 'size',
    name: 'File Size',
    type: 'number' as FieldType,
    required: true,
    isSystem: true
  },
  {
    id: 'dimensions',
    name: 'Dimensions',
    type: 'text' as FieldType,
    required: true,
    isSystem: true
  }
]

interface CustomFieldState {
  fields: Record<string, CustomField[]> // projectId -> fields[]
  addField: (projectId: string, field: Omit<CustomField, 'id' | 'projectId'>) => void
  removeField: (projectId: string, fieldId: string) => void
  updateField: (projectId: string, fieldId: string, updates: Partial<CustomField>) => void
  getProjectFields: (projectId: string) => CustomField[]
}

export const useCustomFieldStore = create<CustomFieldState>()(
  persist(
    (set, get) => ({
      fields: {},

      addField: (projectId, fieldData) => {
        const newField: CustomField = {
          id: `${projectId}-${Date.now()}`,
          projectId,
          ...fieldData
        }
        set((state) => ({
          fields: {
            ...state.fields,
            [projectId]: [...(state.fields[projectId] || []), newField]
          }
        }))
      },

      removeField: (projectId, fieldId) => {
        set((state) => ({
          fields: {
            ...state.fields,
            [projectId]: state.fields[projectId]?.filter(field => field.id !== fieldId) || []
          }
        }))
      },

      updateField: (projectId, fieldId, updates) => {
        set((state) => ({
          fields: {
            ...state.fields,
            [projectId]: state.fields[projectId]?.map(field =>
              field.id === fieldId ? { ...field, ...updates } : field
            ) || []
          }
        }))
      },

      getProjectFields: (projectId) => {
        return get().fields[projectId] || []
      }
    }),
    {
      name: 'custom-field-storage'
    }
  )
) 