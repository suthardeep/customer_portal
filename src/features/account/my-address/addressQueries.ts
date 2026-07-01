import { queryOptions } from "@tanstack/react-query";
import { addressKeys } from "./addressQueryFactory";
import {
  getAddressById,
  getAddresses,
  getLocationByPincode,
} from "./addressService";
import type { Address, PincodeLocation } from "./types/types";

const PINCODE_REGEX = /^\d{6}$/;

export const addressQueries = {
  list: () =>
    queryOptions({
      queryKey: addressKeys.list(),
      queryFn: async (): Promise<Address[]> => {
        const response = await getAddresses();
        return response.data;
      },
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: addressKeys.detail(id),
      queryFn: async (): Promise<Address> => {
        const response = await getAddressById({ data: id });
        return response.data;
      },
    }),

  pincodeLookup: (pincode: string) =>
    queryOptions({
      queryKey: addressKeys.pincode(pincode),
      queryFn: (): Promise<PincodeLocation> =>
        getLocationByPincode({ data: pincode }),
      // A pincode always maps to the same location, so cache it indefinitely.
      enabled: PINCODE_REGEX.test(pincode),
      staleTime: Infinity,
      retry: false,
    }),
};
