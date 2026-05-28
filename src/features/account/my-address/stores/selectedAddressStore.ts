import type { Address } from "../types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * The active address used across the app.
 * `id` is only present when the address was selected from "My Addresses".
 */
export type ActiveAddress = Pick<
  Address,
  | "addressLine1"
  | "addressLine2"
  | "landmark"
  | "city"
  | "state"
  | "pincode"
  | "country"
  | "latitude"
  | "longitude"
> &
  Partial<Pick<Address, "addressType" | "otherAddressLabel">> & { id?: string };

interface SelectedAddressState {
  activeAddress: ActiveAddress | null;
  _hasHydrated: boolean;

  selectSavedAddress: (address: Address) => void;
  setDetectedAddress: (address: Omit<ActiveAddress, "id">) => void;
  clearSelection: () => void;
}

export const useSelectedAddressStore = create<SelectedAddressState>()(
  persist(
    (set) => ({
      activeAddress: null,
      _hasHydrated: false,

      selectSavedAddress: (address) =>
        set({
          activeAddress: {
            id: address.id,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            landmark: address.landmark,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country,
            latitude: address.latitude,
            longitude: address.longitude,
            addressType: address.addressType,
            otherAddressLabel: address.otherAddressLabel,
          },
        }),

      setDetectedAddress: (address) =>
        set({ activeAddress: { ...address } }),

      clearSelection: () => set({ activeAddress: null }),
    }),
    {
      name: "selected-address",
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      },
    },
  ),
);
