import { Button } from "@/components/base/button/Button";
import MenuItem from "@/components/base/MenuItem";
import { Popover } from "@/components/base/popover/Popover";
import Sheet from "@/components/base/sheet/Sheet";
import { useToggle } from "@/hooks/useToggle";
import { PRODUCT_SORT_OPTIONS } from "@/features/products/constants";
import type { ProductQueryParams } from "@/features/products/types";

type SortValue = ProductQueryParams["sortBy"];

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: undefined, label: "Default" },
  ...PRODUCT_SORT_OPTIONS,
];

interface ProductSortDropdownProps {
  value: SortValue;
  onChange: (value: SortValue) => void;
}

export function ProductSortDropdown({
  value,
  onChange,
}: ProductSortDropdownProps) {
  const popover = useToggle();
  const sheet = useToggle();

  const selectedLabel =
    PRODUCT_SORT_OPTIONS.find((option) => option.value === value)?.label ??
    "Sort";

  const handleSelect = (nextValue: SortValue, close: () => void) => {
    onChange(nextValue);
    close();
  };

  return (
    <>
      {/* Desktop: Popover */}
      <div className="hidden lg:block">
        <Popover
          align="end"
          isOpen={popover.isOpen}
          onOpenChange={(open) => (open ? popover.open() : popover.close())}
          trigger={
            <Button
              variant="outline"
              color="neutral"
              size="sm"
              endIcon="ChevronDown"
            >
              {selectedLabel}
            </Button>
          }
        >
          <div>
            {SORT_OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                endIcon={value === option.value ? "Check" : undefined}
                onClick={() => handleSelect(option.value, popover.close)}
              >
                {option.label}
              </MenuItem>
            ))}
          </div>
        </Popover>
      </div>

      {/* Mobile: Sheet */}
      <div className="lg:hidden w-full">
        <Button
          variant="outline"
          color="neutral"
          size="sm"
          endIcon="ChevronDown"
          fullWidth
          onClick={sheet.open}
        >
          {selectedLabel}
        </Button>

        <Sheet isOpen={sheet.isOpen} onClose={sheet.close} title="Sort by">
          <div className="flex flex-col gap-1 py-2">
            {SORT_OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                endIcon={value === option.value ? "Check" : undefined}
                onClick={() => handleSelect(option.value, sheet.close)}
              >
                {option.label}
              </MenuItem>
            ))}
          </div>
        </Sheet>
      </div>
    </>
  );
}
