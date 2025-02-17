export interface AssetType {
  id: string;
  name: string;
  extension: string;
  isDefault: boolean;
  category?: string;
}

export const defaultAssetTypes: AssetType[] = [
  { id: 'png', name: 'PNG Image', extension: 'png', isDefault: true, category: "Images" },
  { id: 'jpeg', name: 'JPEG Image', extension: 'jpeg', isDefault: true, category: "Images" },
  { id: 'pdf', name: 'PDF Document', extension: 'pdf', isDefault: true, category: "Documents" },
  { id: 'gif', name: 'GIF Image', extension: 'gif', isDefault: true, category: "Images" },
  { id: 'mp4', name: 'MP4 Video', extension: 'mp4', isDefault: true, category: "Videos" },
  { id: 'mlv', name: 'MLV Video', extension: 'mlv', isDefault: true, category: "Videos" },
  { id: 'doc', name: 'Document', extension: 'doc', isDefault: true, category: "Documents" },
]