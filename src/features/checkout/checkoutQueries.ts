import { queryOptions } from "@tanstack/react-query";
import { checkoutKeys } from "./checkoutQueryFactory";
import { createBuyNowSession, createCheckoutSession } from "./checkoutService";
import type { CheckoutPayload, CheckoutSession } from "./types/types";
import type { BuyNowPayload } from "./types/buyNow.types";

export const checkoutQueries = {
  session: (payload: CheckoutPayload) =>
    queryOptions({
      queryKey: checkoutKeys.session(payload),
      queryFn: async (): Promise<CheckoutSession> => {
        const response = await createCheckoutSession({ data: payload });
        return response.data;
      },
      enabled: !!payload.addressId,
    }),

  buyNowSession: (payload: BuyNowPayload) =>
    queryOptions({
      queryKey: checkoutKeys.buyNowSession(payload),
      queryFn: async (): Promise<CheckoutSession> => {
        const response = await createBuyNowSession({ data: payload });
        return response.data;
      },
      enabled: !!payload.addressId,
    }),
};
