import type { BaseApiResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getSessionId } from "@/utils/getSessionId";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type {
  AddCartItemRequest,
  Cart,
  CartItem,
  DeleteCartItemRequest,
  UpdateCartItemRequest,
} from "./types/types";

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
    const { id, quantity } = data;
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest(`/v1/cart/items/${id}`, {
      method: "PATCH",
      body: { quantity, sessionId },
      token,
    });
  });

export const deleteCartItem = createServerFn({ method: "POST" })
  .inputValidator((data: DeleteCartItemRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const { id } = data;
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest(`/v1/cart/items/${id}`, {
      method: "DELETE",
      body: { sessionId },
      token,
    });
  });

export const clearCart = createServerFn({ method: "POST" }).handler(
  async (): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    const sessionId = getSessionId();
    return apiRequest("/v1/cart", {
      method: "DELETE",
      body: { sessionId },
      token,
    });
  },
);
