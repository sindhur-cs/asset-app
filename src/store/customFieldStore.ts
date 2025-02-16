import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FieldType = 'text' | 'number' | 'date' | 'boolean'

export interface CustomField {
  id: string
  name: string
  type: FieldType
  required: boolean
}

interface CustomFieldState {
  fields: CustomField[]
  addField: (field: CustomField) => void
  removeField: (fieldId: string) => void
  getFields: () => CustomField[]
}

export const useCustomFieldStore = create<CustomFieldState>()(
  persist(
    (set, get) => ({
      fields: [],

      addField: (field) => {
        set((state) => ({
          fields: [...state.fields, field]
        }))
      },

      removeField: (fieldId) => {
        set((state) => ({
          fields: state.fields.filter(field => field.id !== fieldId)
        }))
      },

      getFields: () => {
        return get().fields
      }
    }),
    {
      name: 'custom-field-storage'
    }
  )
)

export const systemFields: CustomField[] = [
  {
    id: 'name',
    name: 'Name',
    type: 'text',
    required: true
  },
  {
    id: 'description',
    name: 'Description',
    type: 'text',
    required: false
  }
] 