import { queryOptions } from "@tanstack/react-query";
import { addressKeys } from "./addressQueryFactory";
import { getAddressById, getAddresses } from "./addressService";
import type { Address } from "./types/types";

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
};
