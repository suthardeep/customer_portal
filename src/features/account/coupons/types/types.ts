import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { DiscountType } from "@/features/cart/types/coupon.types";

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue: number;
}

export type CouponsResponse = BaseApiResponse<PaginatedResponse<Coupon>>;

export interface CouponsParams {
  currentPage?: number;
}
