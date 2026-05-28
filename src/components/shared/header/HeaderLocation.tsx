import { Icon } from "@/components/base/icon/Icon";
import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import { ADDRESS_TYPE_CONFIG } from "@/features/account/my-address/constants";
import { AddressTypeEnum } from "@/features/account/my-address/enums";
import { useDetectLocation } from "@/features/account/my-address/hooks/useDetectLocation";
import { addressQueries } from "@/features/account/my-address/addressQueries";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import type { Address } from "@/features/account/my-address/types/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatAddress } from "@/utils/formatAddress";
import { haversineDistance } from "@/utils/haversine";
import { useToggle } from "@/hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
import { ADDRESS_MATCH_THRESHOLD_METERS } from "./constants";
import { useRef } from "react";

export function HeaderLocation() {
  const { isAuthenticated } = useAuth();
  const { activeAddress, selectSavedAddress, setDetectedAddress, _hasHydrated } =
    useSelectedAddressStore();
  const selectedAddressId = activeAddress?.id ?? null;
  const sheetToggle = useToggle();
  const { data: savedAddresses } = useQuery({
    ...addressQueries.list(),
    enabled: isAuthenticated,
  });
  const savedAddressesRef = useRef(savedAddresses);
  savedAddressesRef.current = savedAddresses;

  const hasSavedAddresses = !!savedAddresses?.length;

  const { detect, isDetecting, error } = useDetectLocation(
    (detected) => {
      const match = savedAddressesRef.current?.find(
        (addr) =>
          addr.latitude != null &&
          addr.longitude != null &&
          haversineDistance(
            detected.latitude,
            detected.longitude,
            addr.latitude,
            addr.longitude,
          ) <= ADDRESS_MATCH_THRESHOLD_METERS,
      );
      if (match) {
        selectSavedAddress(match);
      } else {
        setDetectedAddress(detected);
      }
    },
    { autoDetect: _hasHydrated && !activeAddress && !hasSavedAddresses },
  );

  const typeLabel = activeAddress?.addressType
    ? activeAddress.addressType === AddressTypeEnum.OTHER &&
      activeAddress.otherAddressLabel
      ? activeAddress.otherAddressLabel
      : ADDRESS_TYPE_CONFIG[activeAddress.addressType].label
    : "Change";

  const label = isDetecting
    ? "Detecting..."
    : activeAddress
      ? formatAddress(activeAddress)
      : error
        ? error
        : "Detect location";

  const handleClick = () => {
    if (activeAddress || hasSavedAddresses) {
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
