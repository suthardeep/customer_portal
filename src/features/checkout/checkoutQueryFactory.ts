import type { BuyNowPayload } from "./types/buyNow.types";
import type { CheckoutPayload } from "./types/types";

export const checkoutKeys = {
  all: ["checkout"] as const,
  sessions: () => [...checkoutKeys.all, "session"] as const,
  session: (payload: CheckoutPayload) =>
    [...checkoutKeys.sessions(), payload] as const,
  buyNowSessions: () => [...checkoutKeys.all, "buy-now-session"] as const,
  buyNowSession: (payload: BuyNowPayload) =>
    [...checkoutKeys.buyNowSessions(), payload] as const,
};
