import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import Sheet from "@/components/base/sheet/Sheet";
import { useToggle } from "@/hooks/useToggle";
import type {
  ProductFilterOptionGroup,
  ProductFilterOptionValue,
  ProductFilters,
} from "@/features/products/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const filtersSchema = z.object({
  optionValues: z.array(z.string()),
});

type FiltersFormData = z.infer<typeof filtersSchema>;

export interface FiltersSheetProps {
  filters: ProductFilters;
  selectedOptionValues: string[];
  onApply: (selectedOptionValues: string[]) => void;
  isFetching?: boolean;
}

export function FiltersSheet({
  filters,
  selectedOptionValues,
  onApply,
  isFetching,
}: FiltersSheetProps) {
  const { isOpen, open, close } = useToggle();

  const { handleSubmit, reset, watch, setValue } = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: { optionValues: [] },
  });

  const currentValues = watch("optionValues");

  const handleOpen = () => {
    reset({ optionValues: selectedOptionValues });
    open();
  };

  const toggleValue = (id: string) => {
    const next = currentValues.includes(id)
      ? currentValues.filter((v) => v !== id)
      : [...currentValues, id];
    setValue("optionValues", next);
  };

  const onSubmit = (data: FiltersFormData) => {
    onApply(data.optionValues);
    close();
  };

  const activeCount = selectedOptionValues.length;
  if (filters.optionGroups.length === 0) return;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium cursor-pointer transition-colors ${
          isFetching
            ? "border-p-300 bg-p-50 text-p-700"
            : "border-n-200 bg-white text-n-900 hover:bg-n-300"
        }`}
      >
        <Icon name="Filter" size="sm" />
        <span>Filters</span>
        {activeCount > 0 && (
          <>
            <span className="flex size-4 items-center justify-center rounded-full bg-p-500 text-[10px] font-semibold text-white">
              {activeCount}
            </span>
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onApply([]);
              }}
              className="flex size-4 items-center justify-center rounded-full bg-n-200 text-n-600 hover:bg-n-300"
            >
              <Icon name="X" size="xs" />
            </span>
          </>
        )}
      </button>

      <Sheet
        isOpen={isOpen}
        onClose={close}
        title="Filters"
        direction="right"
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              color="neutral"
              fullWidth
              disabled={currentValues.length === 0}
              onClick={() => {
                onApply([]);
                close();
              }}
            >
              Clear all
            </Button>
            <Button type="button" fullWidth onClick={handleSubmit(onSubmit)}>
              Apply
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-6 py-2">
          {filters.optionGroups.map((group) => (
            <OptionGroupSection
              key={group.id}
              group={group}
              values={filters.optionValues.filter(
                (v) => v.optionGroupId === group.id,
              )}
              selectedOptionValues={currentValues}
              onToggle={toggleValue}
            />
          ))}
        </div>
      </Sheet>
    </>
  );
}

interface OptionGroupSectionProps {
  group: ProductFilterOptionGroup;
  values: ProductFilterOptionValue[];
  selectedOptionValues: string[];
  onToggle: (id: string) => void;
}

function OptionGroupSection({
  group,
  values,
  selectedOptionValues,
  onToggle,
}: OptionGroupSectionProps) {
  if (values.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-n-900">{group.name}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => {
          const isSelected = selectedOptionValues.includes(v.slug);
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onToggle(v.slug)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors cursor-pointer ${
                isSelected
                  ? "border-p-500 bg-p-50 font-medium text-p-600"
                  : "border-n-200 bg-white text-n-900 hover:bg-n-300"
              }`}
            >
              {v.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
