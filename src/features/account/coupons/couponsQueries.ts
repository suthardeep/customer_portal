import { queryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import { couponKeys } from "./couponsQueryFactory";
import { getAvailableCoupons } from "./couponsService";
import type { Coupon, CouponsParams } from "./types/types";

export const couponQueries = {
  list: (params: CouponsParams = {}) =>
    queryOptions({
      queryKey: couponKeys.list(params),
      queryFn: async (): Promise<PaginatedResponse<Coupon>> => {
        const response = await getAvailableCoupons({ data: params });
        return response.data;
      },
    }),
};
