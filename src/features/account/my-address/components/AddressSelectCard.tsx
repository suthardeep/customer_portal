import { Icon } from "@/components/base/icon/Icon";
import { Radio } from "@/components/base/radio/Radio";
import { Chip } from "@/components/base/chip/Chip";
import { cn } from "@/utils/cssHelpers";
import type { Address } from "../types/types";
import { formatAddress } from "../utils";
import { ADDRESS_TYPE_CONFIG } from "../constants";

interface AddressSelectCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: (address: Address) => void;
}

const AddressSelectCard = ({
  address,
  isSelected,
  onSelect,
}: AddressSelectCardProps) => {
  const config = ADDRESS_TYPE_CONFIG[address.addressType];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(address)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(address)}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border bg-n-50 p-4 transition-colors duration-150",
        isSelected ? "border-p-500 bg-p-50" : "border-n-400",
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-p-100">
        <Icon
          name={config.icon}
          size="md"
          className="text-p-600"
          strokeWidth={2}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-n-900">{config.label}</p>
          {address.isDefault && <Chip>Default</Chip>}
        </div>
        <p className="mt-0.5 text-sm text-n-800 line-clamp-2">
          {formatAddress(address)}
        </p>
      </div>

      <Radio
        checked={isSelected}
        readOnly
        className="pointer-events-none"
        aria-hidden
      />
    </div>
  );
};

export default AddressSelectCard;
