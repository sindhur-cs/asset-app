import { create } from 'zustand';

interface SidebarState {
  isAssetModelsOpen: boolean;
  isAssetTypesOpen: boolean;
  isFieldsOpen: boolean;
  isSettingOpen: boolean;
  toggleAssetModels: () => void;
  toggleAssetTypes: () => void;
  toggleFields: () => void;
  toggleSettings: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isAssetModelsOpen: false,
  isAssetTypesOpen: false,
  isFieldsOpen: false,
  isSettingOpen: false,
  toggleAssetModels: () => set((state) => ({ isAssetModelsOpen: !state.isAssetModelsOpen })),
  toggleAssetTypes: () => set((state) => ({ isAssetTypesOpen: !state.isAssetTypesOpen })),
  toggleFields: () => set((state) => ({ isFieldsOpen: !state.isFieldsOpen })),
  toggleSettings: () => set((state) => ({ isSettingOpen: !state.isSettingOpen }))
}));