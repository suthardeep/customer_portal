import { queryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import type { InvoiceData, OrderItem, OrderItemDetail } from "./types/types";
import { myOrderKeys } from "./myOrdersQueryFactory";
import {
  getMyOrders,
  getMyOrderItemDetail,
  getMyOrderItemInvoice,
} from "./myOrdersService";
import { MY_ORDERS_PAGE_SIZE } from "./constants";

export const myOrderQueries = {
  list: (
    params: PaginationQueryParams = {
      currentPage: 1,
      pageSize: MY_ORDERS_PAGE_SIZE,
    },
  ) =>
    queryOptions({
      queryKey: myOrderKeys.list(params),
      queryFn: async (): Promise<PaginatedResponse<OrderItem>> => {
        const response = await getMyOrders({ data: params });
        return response.data;
      },
    }),

  detail: (orderItemId: string) =>
    queryOptions({
      queryKey: myOrderKeys.detail(orderItemId),
      queryFn: async (): Promise<OrderItemDetail> => {
        const response = await getMyOrderItemDetail({ data: orderItemId });
        return response.data;
      },
    }),

  invoice: (itemId: string) =>
    queryOptions({
      queryKey: myOrderKeys.invoice(itemId),
      queryFn: async (): Promise<InvoiceData> => {
        const response = await getMyOrderItemInvoice({ data: itemId });
        return response.data;
      },
    }),
};
