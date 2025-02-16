import { create } from 'zustand';

interface SidebarState {
  isAssetModelsOpen: boolean;
  isAssetTypesOpen: boolean;
  isFieldsOpen: boolean;
  toggleAssetModels: () => void;
  toggleAssetTypes: () => void;
  toggleFields: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isAssetModelsOpen: false,
  isAssetTypesOpen: false,
  isFieldsOpen: false,
  toggleAssetModels: () => set((state) => ({ isAssetModelsOpen: !state.isAssetModelsOpen })),
  toggleAssetTypes: () => set((state) => ({ isAssetTypesOpen: !state.isAssetTypesOpen })),
  toggleFields: () => set((state) => ({ isFieldsOpen: !state.isFieldsOpen })),
}));