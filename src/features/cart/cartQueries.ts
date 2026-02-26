import { queryOptions } from "@tanstack/react-query";
import { getCart } from "./cartService";
import { cartKeys } from "./cartQueryFactory";
import type { Cart } from "./types/types";

export const cartQueries = {
  detail: () =>
    queryOptions({
      queryKey: cartKeys.detail(),
      queryFn: async (): Promise<Cart> => {
        const response = await getCart();
        return response.data;
      },
    }),
};
