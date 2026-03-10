import type { Address } from "../types/types";
import { create } from "zustand";

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
  Partial<Pick<Address, "addressType">> & { id?: string };

interface SelectedAddressState {
  activeAddress: ActiveAddress | null;

  selectSavedAddress: (address: Address) => void;
  setDetectedAddress: (address: Omit<ActiveAddress, "id">) => void;
  clearSelection: () => void;
}

export const useSelectedAddressStore = create<SelectedAddressState>((set) => ({
  activeAddress: null,

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
      },
    }),

  setDetectedAddress: (address) =>
    set({ activeAddress: { ...address } }),

  clearSelection: () => set({ activeAddress: null }),
}));
