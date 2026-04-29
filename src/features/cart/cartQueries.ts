import { queryOptions } from "@tanstack/react-query";
import { getCart, getAvailableCoupons, getCartSummary } from "./cartService";
import { cartKeys } from "./cartQueryFactory";
import type { Cart, CartSummaryParams, CartSummaryResponse } from "./types/types";
import type { AvailableCouponsParams, AvailableCouponsResult } from "./types/coupon.types";

export const cartQueries = {
  detail: () =>
    queryOptions({
      queryKey: cartKeys.detail(),
      queryFn: async (): Promise<Cart> => {
        const response = await getCart();
        return response.data;
      },
    }),
  availableCoupons: (params: AvailableCouponsParams) =>
    queryOptions({
      queryKey: cartKeys.availableCoupons(params),
      queryFn: async (): Promise<AvailableCouponsResult> => {
        const response = await getAvailableCoupons({ data: params });
        return response.data;
      },
    }),
  summary: (params: CartSummaryParams) =>
    queryOptions({
      queryKey: cartKeys.summary(params),
      queryFn: async (): Promise<CartSummaryResponse> => {
        const response = await getCartSummary({ data: params });
        return response.data;
      },
    }),
};
