import type { PaymentMethod } from "./types";

export interface BuyNowPayload {
  variantId: string;
  quantity: number;
  addressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  coinsToApply?: number;
  gstDetailsId?: string;
  affiliateCode?: string;
}
