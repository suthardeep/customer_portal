import { useToggle } from "@/hooks/useToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { haversineDistance } from "@/utils/haversine";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { addressQueries } from "../addressQueries";
import { useCreateAddressMutation } from "../addressMutations";
import { ADDRESS_MATCH_THRESHOLD_METERS } from "../constants";
import { useDetectLocation } from "./useDetectLocation";
import { useSelectedAddressStore } from "../stores/selectedAddressStore";
import AddAddressDialog from "../components/AddAddressDialog";
import type { Address, AddressFormData } from "../types/types";

interface UseAddressSelectorOptions {
  /** Auto-trigger detection on mount when there is no active/saved address. */
  autoDetect?: boolean;
}

/**
 * Shared logic for the address selector sheet: detection, matching a detected
 * location against saved addresses, and saving a detected address (with a login
 * gate). Returns the props to spread onto `AddressSelectorSheet` plus a ready
 * `addDialog` element to render alongside it.
 */
export const useAddressSelector = ({
  autoDetect = false,
}: UseAddressSelectorOptions = {}) => {
  const { isAuthenticated } = useAuth();
  const { activeAddress, selectSavedAddress, setDetectedAddress, _hasHydrated } =
    useSelectedAddressStore();

  const sheet = useToggle();
  const addDialog = useToggle();
  const loginDialog = useLoginDialog();
  const createMutation = useCreateAddressMutation();

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
        // Matched a saved address — select it and close the sheet.
        selectSavedAddress(match);
        sheet.close();
      } else {
        // Unsaved detected address — keep the sheet open so the user can
        // review it and choose to save it via the preview card.
        setDetectedAddress(detected);
      }
    },
    { autoDetect: autoDetect && _hasHydrated && !activeAddress && !hasSavedAddresses },
  );

  // A detected (unsaved) address is the active address without an `id`.
  const detectedAddress =
    activeAddress && !activeAddress.id ? activeAddress : null;

  const detectedDefaults: Partial<AddressFormData> | undefined = detectedAddress
    ? {
        addressLine1: detectedAddress.addressLine1,
        addressLine2: detectedAddress.addressLine2,
        landmark: detectedAddress.landmark,
        city: detectedAddress.city,
        state: detectedAddress.state,
        pincode: detectedAddress.pincode,
        latitude: detectedAddress.latitude,
        longitude: detectedAddress.longitude,
      }
    : undefined;

  const handleSelect = (address: Address) => {
    selectSavedAddress(address);
    sheet.close();
  };

  const handleSaveDetected = () => {
    if (isAuthenticated) {
      sheet.close();
      addDialog.open();
    } else {
      loginDialog.open({
        onSuccess: () => {
          sheet.close();
          addDialog.open();
        },
      });
    }
  };

  const handleAddDetectedAddress = (data: AddressFormData) => {
    const isFirst = !hasSavedAddresses;
    createMutation.mutate(
      { ...data, isDefault: isFirst },
      {
        onSuccess: (newAddress) => {
          selectSavedAddress(newAddress);
          addDialog.close();
        },
      },
    );
  };

  /** Props to spread onto `<AddressSelectorSheet />`. */
  const sheetProps = {
    isOpen: sheet.isOpen,
    onClose: sheet.close,
    selectedAddressId: activeAddress?.id ?? null,
    onSelect: handleSelect,
    onDetectLocation: detect,
    isDetecting,
    detectError: error,
    detectedAddress,
    onSaveDetected: handleSaveDetected,
  };

  /** Render alongside the sheet to enable the "Save this address" flow. */
  const addDialogElement = (
    <AddAddressDialog
      isOpen={addDialog.isOpen}
      onClose={addDialog.close}
      onSubmit={handleAddDetectedAddress}
      isMutating={createMutation.isPending}
      defaultValues={detectedDefaults}
    />
  );

  return {
    activeAddress,
    openSheet: sheet.open,
    isDetecting,
    sheetProps,
    addDialog: addDialogElement,
  };
};
