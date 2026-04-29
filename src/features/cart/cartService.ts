import type { BaseApiResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getSessionId } from "@/utils/getSessionId";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type {
  AddCartItemRequest,
  Cart,
  CartItem,
  CartSummaryParams,
  CartSummaryResponse,
  DeleteCartItemRequest,
  MigrateCartRequest,
  UpdateCartItemRequest,
} from "./types/types";
import type {
  AvailableCouponsParams,
  AvailableCouponsResponse,
} from "./types/coupon.types";

export const getCart = createServerFn({ method: "GET" }).handler(
  async (): Promise<BaseApiResponse<Cart>> => {
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest("/v1/cart", {
      params: { sessionId },
      token,
    });
  },
);

export const addCartItem = createServerFn({ method: "POST" })
  .inputValidator((data: AddCartItemRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<CartItem>> => {
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest("/v1/cart/items", {
      method: "POST",
      body: { ...data, sessionId },
      token,
    });
  });

export const updateCartItem = createServerFn({ method: "POST" })
  .inputValidator((data: UpdateCartItemRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<CartItem>> => {
    const { variantId, quantity } = data;
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest(`/v1/cart/items/${variantId}`, {
      method: "PATCH",
      body: { quantity },
      params: { sessionId },
      token,
    });
  });

export const deleteCartItem = createServerFn({ method: "POST" })
  .inputValidator((data: DeleteCartItemRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const { variantId } = data;
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest(`/v1/cart/items/${variantId}`, {
      method: "DELETE",
      params: { sessionId },
      token,
    });
  });

export const clearCart = createServerFn({ method: "POST" }).handler(
  async (): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest("/v1/cart", {
      method: "DELETE",
      params: { sessionId },
      token,
    });
  },
);

export const getCartSummary = createServerFn({ method: "GET" })
  .inputValidator((data: CartSummaryParams) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<CartSummaryResponse>> => {
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest("/v1/orders/checkout/summary", {
      params: { ...data, cartSessionId: data.cartSessionId ?? sessionId },
      token,
    });
  });

export const migrateCart = createServerFn({ method: "POST" })
  .inputValidator((data: MigrateCartRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    return apiRequest("/v1/cart/migrate", {
      method: "POST",
      body: data,
      token,
    });
  });

export const getAvailableCoupons = createServerFn({ method: "GET" })
  .inputValidator((data: AvailableCouponsParams) => data)
  .handler(async ({ data }): Promise<AvailableCouponsResponse> => {
    const token = getToken();
    return apiRequest("/v1/discounts/coupons/available", {
      params: data,
      token,
    });
  });
