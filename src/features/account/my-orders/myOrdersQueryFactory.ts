import type { PaginationQueryParams } from "@/types/general.types";

export const myOrderKeys = {
  all: ["my-orders"] as const,
  list: (params: PaginationQueryParams) =>
    [...myOrderKeys.all, "list", params] as const,
  detail: (orderItemId: string) =>
    [...myOrderKeys.all, "detail", orderItemId] as const,
  invoice: (itemId: string) =>
    [...myOrderKeys.all, "invoice", itemId] as const,
};
