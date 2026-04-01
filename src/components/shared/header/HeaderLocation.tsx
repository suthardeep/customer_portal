import { Icon } from "@/components/base/icon/Icon";
import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import { ADDRESS_TYPE_CONFIG } from "@/features/account/my-address/constants";
import { useDetectLocation } from "@/features/account/my-address/hooks/useDetectLocation";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import type { Address } from "@/features/account/my-address/types/types";
import { formatAddress } from "@/utils/formatAddress";
import { useToggle } from "@/hooks/useToggle";

export function HeaderLocation() {
  const { activeAddress, selectSavedAddress, setDetectedAddress } =
    useSelectedAddressStore();
  const selectedAddressId = activeAddress?.id ?? null;
  const sheetToggle = useToggle();

  const { detect, isDetecting, error } = useDetectLocation(
    (detected) => setDetectedAddress(detected),
    { autoDetect: !activeAddress },
  );

  const typeLabel = activeAddress?.addressType
    ? ADDRESS_TYPE_CONFIG[activeAddress.addressType].label
    : "Change";

  const label = isDetecting
    ? "Detecting..."
    : error
      ? error
      : activeAddress
        ? formatAddress(activeAddress)
        : "Detect location";

  const handleClick = () => {
    if (activeAddress) {
      sheetToggle.open();
    } else {
      detect();
    }
  };

  const handleSelect = (address: Address) => {
    selectSavedAddress(address);
    sheetToggle.close();
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isDetecting}
        className="flex items-center gap-2 group cursor-pointer"
      >
        <Icon
          name="Location"
          size="lg"
          className="shrink-0 text-n-900 group-hover:text-p-600"
        />
        <div>
          <div className="flex items-center gap-0.5">
            <p className="font-medium text-left group-hover:text-p-600">
              {typeLabel}
            </p>
            <Icon
              name="ChevronDown"
              size="xs"
              className="text-n-900 group-hover:text-p-600"
            />
          </div>
          <p className="text-[13px] font-medium text-n-800 truncate group-hover:text-p-600 text-left max-w-56 md:max-w-72">
            {label}
          </p>
        </div>
      </button>
      <AddressSelectorSheet
        isOpen={sheetToggle.isOpen}
        onClose={sheetToggle.close}
        selectedAddressId={selectedAddressId}
        onSelect={handleSelect}
      />
    </>
  );
}
