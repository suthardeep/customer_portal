import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type {
  CancelOrderItemRequest,
  InvoiceData,
  OrderItem,
  OrderItemDetail,
  ReturnOrderItemRequest,
} from "./types/types";

export const getMyOrders = createServerFn({ method: "GET" })
  .inputValidator((data: PaginationQueryParams) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<PaginatedResponse<OrderItem>>> => {
      const token = getToken();
      return apiRequest("/v1/orders/my-orders", {
        params: data,
        token,
      });
    },
  );

export const getMyOrderItemDetail = createServerFn({ method: "GET" })
  .inputValidator((orderItemId: string) => orderItemId)
  .handler(
    async ({ data: orderItemId }): Promise<BaseApiResponse<OrderItemDetail>> => {
      const token = getToken();
      return apiRequest(`/v1/orders/my-orders/items/${orderItemId}`, {
        token,
      });
    },
  );

export const getMyOrderItemInvoice = createServerFn({ method: "GET" })
  .inputValidator((itemId: string) => itemId)
  .handler(
    async ({ data: itemId }): Promise<BaseApiResponse<InvoiceData>> => {
      const token = getToken();
      return apiRequest(`/v1/orders/items/${itemId}/invoice`, { token });
    },
  );

export const cancelMyOrderItem = createServerFn({ method: "POST" })
  .inputValidator((data: CancelOrderItemRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    const { itemId, ...body } = data;
    return apiRequest(`/v1/orders/items/${itemId}/cancel`, {
      method: "POST",
      body,
      token,
    });
  });

export const returnMyOrderItem = createServerFn({ method: "POST" })
  .inputValidator((data: ReturnOrderItemRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    const { itemId, ...body } = data;
    return apiRequest(`/v1/orders/items/${itemId}/return`, {
      method: "POST",
      body,
      token,
    });
  });
