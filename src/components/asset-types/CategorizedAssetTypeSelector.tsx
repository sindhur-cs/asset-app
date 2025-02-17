import { AssetType } from '../../constants/assetTypes';

interface CategorizedAssetTypeSelectorProps {
  assetTypes: AssetType[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
}

const CategorizedAssetTypeSelector = ({
  assetTypes,
  selectedIds,
  onSelect,
  onDeselect
}: CategorizedAssetTypeSelectorProps) => {
  // creating category based mapping
  const groupedAssetTypes = assetTypes.reduce((acc, type) => {
    const category = type.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(type);
    return acc;
  }, {} as Record<string, AssetType[]>);

  // checking if parent asset type fully selected or not
  const isCategoryFullySelected = (category: string) => {
    return groupedAssetTypes[category].every(type => 
      selectedIds.includes(type.id)
    );
  };

  // checking if parent asset type partially selected or not
  const isCategoryPartiallySelected = (category: string) => {
    return groupedAssetTypes[category].some(type => 
      selectedIds.includes(type.id)
    ) && !isCategoryFullySelected(category);
  };

  // Handle category checkbox change
  const handleCategoryChange = (category: string, isChecked: boolean) => {
    groupedAssetTypes[category].forEach(type => {
      if (isChecked) {
        onSelect(type.id);
      } else {
        onDeselect(type.id);
      }
    });
  };

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {Object.entries(groupedAssetTypes).map(([category, types]) => (
        <div key={category}>
          {category !== 'Uncategorized' && (
            <>
              <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50">
                <input
                  type="checkbox"
                  checked={isCategoryFullySelected(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  className="text-purple-600 rounded"
                />
                <span className="font-medium">
                  {category}
                  {isCategoryPartiallySelected(category) && (
                    <span className="ml-1 text-xs text-purple-600">(partially selected)</span>
                  )}
                </span>
              </label>
              <div className="pl-6">
                {types.map((type) => (
                  <label key={type.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(type.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onSelect(type.id);
                        } else {
                          onDeselect(type.id);
                        }
                      }}
                      className="text-purple-600 rounded"
                    />
                    <span>{type.name}</span>
                  </label>
                ))}
              </div>
            </>
          )}
          {category === 'Uncategorized' && types.map((type) => (
            <label key={type.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50">
              <input
                type="checkbox"
                checked={selectedIds.includes(type.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSelect(type.id);
                  } else {
                    onDeselect(type.id);
                  }
                }}
                className="text-purple-600 rounded"
              />
              <span>{type.name}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategorizedAssetTypeSelector; 