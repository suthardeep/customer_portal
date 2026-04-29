import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type { CouponsParams, CouponsResponse } from "./types/types";

export const getAvailableCoupons = createServerFn({ method: "GET" })
  .inputValidator((data: CouponsParams) => data)
  .handler(async ({ data }): Promise<CouponsResponse> => {
    const token = getToken();
    return apiRequest("/v1/discounts/available-coupons", { params: data, token });
  });
