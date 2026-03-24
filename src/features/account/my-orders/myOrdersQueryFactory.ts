import type { MyOrdersInfiniteParams, MyOrdersQueryParams } from "./types/types";

export const myOrderKeys = {
  all: ["my-orders"] as const,
  list: (params: MyOrdersQueryParams) =>
    [...myOrderKeys.all, "list", params] as const,
  listInfinite: (params: MyOrdersInfiniteParams) =>
    [...myOrderKeys.all, "list", "infinite", params] as const,
  detail: (orderItemId: string) =>
    [...myOrderKeys.all, "detail", orderItemId] as const,
  invoice: (itemId: string) =>
    [...myOrderKeys.all, "invoice", itemId] as const,
};
