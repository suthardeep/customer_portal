import type { BaseApiResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type {
  CheckoutPayload,
  CheckoutSession,
  CodOrderResponse,
  InitiatePaymentResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "./types/types";
import type { BuyNowPayload } from "./types/buyNow.types";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: CheckoutPayload) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<CheckoutSession>> => {
    return apiRequest("/v1/orders/checkout", {
      method: "POST",
      body: data,
      token: getToken(),
    });
  });

export const initiatePayment = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<InitiatePaymentResponse | CodOrderResponse>> =>
      apiRequest("/v1/orders/initiate-payment", {
        method: "POST",
        body: data,
        token: getToken(),
      }),
  );

export const verifyPayment = createServerFn({ method: "POST" })
  .inputValidator((data: { orderId: string } & VerifyPaymentPayload) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<VerifyPaymentResponse>> => {
    const { orderId, ...body } = data;
    return apiRequest(`/v1/orders/${orderId}/verify-payment`, {
      method: "POST",
      body,
      token: getToken(),
    });
  });

export const createBuyNowSession = createServerFn({ method: "POST" })
  .inputValidator((data: BuyNowPayload) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<CheckoutSession>> => {
    console.log("[BuyNow] payload:", data);
    return apiRequest("/v1/orders/buy-now", {
      method: "POST",
      body: data,
      token: getToken(),
    });
  });
