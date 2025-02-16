export interface AssetType {
  id: string;
  name: string;
  extension: string;
}

export const defaultAssetTypes: AssetType[] = [
  { id: 'png', name: 'PNG Image', extension: 'png' },
  { id: 'jpeg', name: 'JPEG Image', extension: 'jpeg' },
  { id: 'pdf', name: 'PDF Document', extension: 'pdf' },
  { id: 'gif', name: 'GIF Image', extension: 'gif' },
  { id: 'mp4', name: 'MP4 Video', extension: 'mp4' },
  { id: 'mlv', name: 'MLV Video', extension: 'mlv' },
  { id: 'doc', name: 'Document', extension: 'doc' },
]