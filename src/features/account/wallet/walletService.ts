import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type {
  TopUpRequest,
  TopUpResponse,
  VerifyTopUpRequest,
  WalletBalance,
  WalletTransaction,
  WalletWithdrawal,
  WithdrawRequest,
} from "./types/types";

export const getWalletBalance = createServerFn({ method: "GET" }).handler(
  async (): Promise<BaseApiResponse<WalletBalance>> => {
    const token = getToken();
    return apiRequest("/v1/wallet/balance", { token });
  },
);

export const getWalletTransactions = createServerFn({ method: "GET" })
  .inputValidator((data: PaginationQueryParams) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<PaginatedResponse<WalletTransaction>>> => {
      const token = getToken();
      return apiRequest("/v1/wallet/transactions", { params: data, token });
    },
  );

export const getWalletWithdrawals = createServerFn({ method: "GET" })
  .inputValidator((data: PaginationQueryParams) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<PaginatedResponse<WalletWithdrawal>>> => {
      const token = getToken();
      return apiRequest("/v1/wallet/withdrawals", { params: data, token });
    },
  );

export const topUpWallet = createServerFn({ method: "POST" })
  .inputValidator((data: TopUpRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<TopUpResponse>> => {
    const token = getToken();
    return apiRequest("/v1/wallet/topup", { method: "POST", body: data, token });
  });

export const verifyTopUp = createServerFn({ method: "POST" })
  .inputValidator((data: VerifyTopUpRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<null>> => {
    const token = getToken();
    return apiRequest("/v1/wallet/topup/verify", { method: "POST", body: data, token });
  });

export const withdrawFromWallet = createServerFn({ method: "POST" })
  .inputValidator((data: WithdrawRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<null>> => {
    const token = getToken();
    return apiRequest("/v1/wallet/withdraw", { method: "POST", body: data, token });
  });
