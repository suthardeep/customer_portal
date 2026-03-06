import type { PaginationQueryParams } from "@/types/general.types";

export const walletKeys = {
  all: ["wallet"] as const,
  balance: () => [...walletKeys.all, "balance"] as const,
  transactions: (params: PaginationQueryParams) =>
    [...walletKeys.all, "transactions", params] as const,
  withdrawals: (params: PaginationQueryParams) =>
    [...walletKeys.all, "withdrawals", params] as const,
  transactionsInfinite: (params: Omit<PaginationQueryParams, "currentPage">) =>
    [...walletKeys.all, "transactions", "infinite", params] as const,
  withdrawalsInfinite: (params: Omit<PaginationQueryParams, "currentPage">) =>
    [...walletKeys.all, "withdrawals", "infinite", params] as const,
};
