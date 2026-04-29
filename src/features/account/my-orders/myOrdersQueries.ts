import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import type { InvoiceData, MyOrdersInfiniteParams, MyOrdersQueryParams, OrderDetail, OrderItem, OrderItemDetail } from "./types/types";
import { myOrderKeys } from "./myOrdersQueryFactory";
import {
  getMyOrders,
  getMyOrderItemDetail,
  getMyOrderItemInvoice,
  getOrderById,
} from "./myOrdersService";

export const myOrderQueries = {
  list: (params: MyOrdersQueryParams = {}) =>
    queryOptions({
      queryKey: myOrderKeys.list(params),
      queryFn: async (): Promise<PaginatedResponse<OrderItem>> => {
        const response = await getMyOrders({ data: params });
        return response.data;
      },
    }),

  listInfinite: (params: MyOrdersInfiniteParams = {}) =>
    infiniteQueryOptions({
      queryKey: myOrderKeys.listInfinite(params),
      queryFn: async ({ pageParam }): Promise<PaginatedResponse<OrderItem>> => {
        const response = await getMyOrders({
          data: { currentPage: pageParam, ...params },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
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

  order: (id: string) =>
    queryOptions({
      queryKey: myOrderKeys.order(id),
      queryFn: async (): Promise<OrderDetail> => {
        const response = await getOrderById({ data: id });
        return response.data;
      },
    }),
};
