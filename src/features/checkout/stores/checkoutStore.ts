import type { SaveGstResponse } from "@/features/account/gst/types/types";
import { create } from "zustand";
import type { BuyNowPayload } from "../types/buyNow.types";
import type { CheckoutPayload, PaymentMethod } from "../types/types";

interface CheckoutState {
  // Checkout payload fields
  paymentMethod: PaymentMethod;
  coinsToApply: number | undefined;
  gstDetailsId: string | undefined;
  couponCode: string | undefined;
  affiliateCode: string | undefined;

  // GST display info (set alongside gstDetailsId)
  savedGstDetails: SaveGstResponse | undefined;

  // Derived UI state
  isFullyCoveredByCoins: boolean;

  // Actions
  setPaymentMethod: (method: PaymentMethod) => void;
  applyCoins: (coins: number, amountToPay: number) => void;
  removeCoins: () => void;
  setGstDetailsId: (id: string, details: SaveGstResponse) => void;
  clearGst: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  setAffiliateCode: (code: string) => void;
  reset: () => void;
}

const initialState = {
  paymentMethod: "PREPAID" as PaymentMethod,
  coinsToApply: undefined,
  gstDetailsId: undefined,
  couponCode: undefined,
  affiliateCode: undefined,
  savedGstDetails: undefined,
  isFullyCoveredByCoins: false,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  applyCoins: (coins, amountToPay) => {
    const fullyCovered = coins >= amountToPay;
    set({
      coinsToApply: coins,
      isFullyCoveredByCoins: fullyCovered,
      ...(fullyCovered && { paymentMethod: "COD" }),
    });
  },

  removeCoins: () => set({ coinsToApply: undefined, isFullyCoveredByCoins: false }),

  setGstDetailsId: (id, details) =>
    set({ gstDetailsId: id, savedGstDetails: details }),

  clearGst: () => set({ gstDetailsId: undefined, savedGstDetails: undefined }),

  applyCoupon: (code) => set({ couponCode: code }),

  removeCoupon: () => set({ couponCode: undefined }),

  setAffiliateCode: (code) => set({ affiliateCode: code }),

  reset: () => set(initialState),
}));

export function buildCheckoutPayload(
  addressId: string,
  state: Pick<CheckoutState, "paymentMethod" | "coinsToApply" | "gstDetailsId" | "couponCode" | "affiliateCode">,
): CheckoutPayload {
  return {
    addressId,
    paymentMethod: state.paymentMethod,
    ...(state.coinsToApply !== undefined && { coinsToApply: state.coinsToApply }),
    ...(state.gstDetailsId !== undefined && { gstDetailsId: state.gstDetailsId }),
    ...(state.couponCode !== undefined && { couponCode: state.couponCode }),
    ...(state.affiliateCode !== undefined && { affiliateCode: state.affiliateCode }),
  };
}

export function buildBuyNowPayload(
  addressId: string,
  variantId: string,
  quantity: number,
  state: Pick<CheckoutState, "paymentMethod" | "coinsToApply" | "gstDetailsId" | "couponCode" | "affiliateCode">,
): BuyNowPayload {
  return {
    variantId,
    quantity,
    addressId,
    paymentMethod: state.paymentMethod,
    ...(state.coinsToApply !== undefined && { coinsToApply: state.coinsToApply }),
    ...(state.gstDetailsId !== undefined && { gstDetailsId: state.gstDetailsId }),
    ...(state.couponCode !== undefined && { couponCode: state.couponCode }),
    ...(state.affiliateCode !== undefined && { affiliateCode: state.affiliateCode }),
  };
}
