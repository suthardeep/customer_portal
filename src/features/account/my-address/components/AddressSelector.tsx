import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { ADDRESS_TYPE_CONFIG } from "../constants";
import type { Address } from "../types/types";
import { formatAddress } from "../utils";

interface AddressSelectorProps {
  selectedAddress: Address | null;
  onChange: () => void;
}

const AddressSelector = ({
  selectedAddress,
  onChange,
}: AddressSelectorProps) => {
  if (!selectedAddress) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-(--s-200) bg-s-50 p-4">
        <p className="text-sm text-n-900">No address selected</p>
        <Button size="sm" variant="ghost" color="secondary" onClick={onChange}>
          Select Address
        </Button>
      </div>
    );
  }

  const config = ADDRESS_TYPE_CONFIG[selectedAddress.addressType];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-(--s-200) bg-s-50  p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-s-200/50">
        <Icon
          name={config.icon}
          size="md"
          className="text-s-600"
          strokeWidth={2}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-s-900">{config.label}</p>
        </div>
        <p className="mt-0.5 text-sm text-n-900 font-medium line-clamp-2">
          {formatAddress(selectedAddress)}
        </p>
      </div>

      <Button size="sm" variant="ghost" color="secondary" onClick={onChange}>
        Change
      </Button>
    </div>
  );
};

export default AddressSelector;
