import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import type { WalletBalance, WalletTransaction, WalletWithdrawal } from "./types/types";
import { walletKeys } from "./walletQueryFactory";
import {
  getWalletBalance,
  getWalletTransactions,
  getWalletWithdrawals,
} from "./walletService";

const DEFAULT_PAGE_PARAMS: PaginationQueryParams = {
  currentPage: 1,
  pageSize: 10,
};

const TRANSACTIONS_INFINITE_PAGE_SIZE = 10;

export const walletQueries = {
  balance: () =>
    queryOptions({
      queryKey: walletKeys.balance(),
      queryFn: async (): Promise<WalletBalance> => {
        const response = await getWalletBalance();
        return response.data;
      },
    }),

  transactions: (params: PaginationQueryParams = DEFAULT_PAGE_PARAMS) =>
    queryOptions({
      queryKey: walletKeys.transactions(params),
      queryFn: async (): Promise<PaginatedResponse<WalletTransaction>> => {
        const response = await getWalletTransactions({ data: params });
        return response.data;
      },
    }),

  withdrawals: (params: PaginationQueryParams = DEFAULT_PAGE_PARAMS) =>
    queryOptions({
      queryKey: walletKeys.withdrawals(params),
      queryFn: async (): Promise<PaginatedResponse<WalletWithdrawal>> => {
        const response = await getWalletWithdrawals({ data: params });
        return response.data;
      },
    }),

  withdrawalsInfinite: (
    params: Omit<PaginationQueryParams, "currentPage"> = {
      pageSize: TRANSACTIONS_INFINITE_PAGE_SIZE,
    },
  ) =>
    infiniteQueryOptions({
      queryKey: walletKeys.withdrawalsInfinite(params),
      queryFn: async ({
        pageParam,
      }): Promise<PaginatedResponse<WalletWithdrawal>> => {
        const response = await getWalletWithdrawals({
          data: { currentPage: pageParam, ...params },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),

  transactionsInfinite: (
    params: Omit<PaginationQueryParams, "currentPage"> = {
      pageSize: TRANSACTIONS_INFINITE_PAGE_SIZE,
    },
  ) =>
    infiniteQueryOptions({
      queryKey: walletKeys.transactionsInfinite(params),
      queryFn: async ({
        pageParam,
      }): Promise<PaginatedResponse<WalletTransaction>> => {
        const response = await getWalletTransactions({
          data: { currentPage: pageParam, ...params },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),
};
