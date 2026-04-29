import type { BaseApiResponse } from "@/types/baseApi.types";

export type DiscountType = "PERCENTAGE" | "FLAT";

export interface CouponEvaluation {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  savingsAmount: number;
  minOrderValue: number;
}

export interface LockedCoupon {
  id: string;
  code: string;
  description: string;
  unlockHint: string;
  minOrderValue: number;
}

export interface AvailableCouponsResult {
  applicable: CouponEvaluation[];
  locked: LockedCoupon[];
}

export interface AvailableCouponsParams {
  cartId?: string;
  productId?: string;
  variantId?: string;
  quantity?: number;
}

export type AvailableCouponsResponse = BaseApiResponse<AvailableCouponsResult>;
