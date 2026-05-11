import { Checkbox } from "@/components/base/checkbox/Checkbox";
import type {
  ProductFilterOptionGroup,
  ProductFilterOptionValue,
  ProductFilters,
} from "@/features/products/types";

export interface FiltersPanelProps {
  filters: ProductFilters;
  selectedOptionValues: string[];
  onToggle: (slug: string) => void;
  onClearAll: () => void;
}

export function FiltersPanel({
  filters,
  selectedOptionValues,
  onToggle,
  onClearAll,
}: FiltersPanelProps) {
  if (filters.optionGroups.length === 0) return null;

  const activeCount = selectedOptionValues.length;

  return (
    <div className="sticky top-4 max-h-[calc(100vh-2rem)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-n-900">Filters</p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm text-p-500 hover:text-p-600 cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="overflow-y-auto flex flex-col gap-6 pr-1">
        {filters.optionGroups.map((group) => (
          <FilterGroupSection
            key={group.id}
            group={group}
            values={filters.optionValues.filter(
              (v) => v.optionGroupId === group.id,
            )}
            selectedOptionValues={selectedOptionValues}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterGroupSectionProps {
  group: ProductFilterOptionGroup;
  values: ProductFilterOptionValue[];
  selectedOptionValues: string[];
  onToggle: (slug: string) => void;
}

function FilterGroupSection({
  group,
  values,
  selectedOptionValues,
  onToggle,
}: FilterGroupSectionProps) {
  if (values.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-n-900">{group.name}</p>
      <div className="flex flex-col gap-2">
        {values.map((v) => (
          <Checkbox
            key={v.id}
            label={v.value}
            checked={selectedOptionValues.includes(v.slug)}
            onChange={() => onToggle(v.slug)}
          />
        ))}
      </div>
    </div>
  );
}
