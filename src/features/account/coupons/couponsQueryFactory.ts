import type { CouponsParams } from "./types/types";

export const couponKeys = {
  all: ["coupons"] as const,
  list: (params?: CouponsParams) => [...couponKeys.all, "list", params] as const,
};
