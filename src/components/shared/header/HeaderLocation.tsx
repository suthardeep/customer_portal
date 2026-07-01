import { Icon } from "@/components/base/icon/Icon";
import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import { ADDRESS_TYPE_CONFIG } from "@/features/account/my-address/constants";
import { AddressTypeEnum } from "@/features/account/my-address/enums";
import { useAddressSelector } from "@/features/account/my-address/hooks/useAddressSelector";
import { addressQueries } from "@/features/account/my-address/addressQueries";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatAddress } from "@/utils/formatAddress";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function HeaderLocation() {
  const { isAuthenticated, isLoading } = useAuth();
  const { activeAddress, clearSelection, _hasHydrated } =
    useSelectedAddressStore();

  const { openSheet, isDetecting, sheetProps, addDialog } = useAddressSelector({
    autoDetect: true,
  });

  const { data: savedAddresses, isSuccess: savedAddressesLoaded } = useQuery({
    ...addressQueries.list(),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (_hasHydrated && !isLoading && !isAuthenticated && activeAddress?.id) {
      clearSelection();
    }
  }, [_hasHydrated, isLoading, isAuthenticated, activeAddress?.id, clearSelection]);

  // Clear a stale selection: the active address references a saved address id
  // that no longer exists in the list (e.g. deleted in another session).
  useEffect(() => {
    if (
      savedAddressesLoaded &&
      activeAddress?.id &&
      !savedAddresses?.some((addr) => addr.id === activeAddress.id)
    ) {
      clearSelection();
    }
  }, [savedAddressesLoaded, savedAddresses, activeAddress?.id, clearSelection]);

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
      : sheetProps.detectError
        ? sheetProps.detectError
        : "Detect location";

  return (
    <>
      <button
        onClick={openSheet}
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
      <AddressSelectorSheet {...sheetProps} />
      {addDialog}
    </>
  );
}
