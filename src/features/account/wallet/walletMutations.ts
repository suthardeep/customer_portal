import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { walletKeys } from "./walletQueryFactory";
import { topUpWallet, verifyTopUp, withdrawFromWallet } from "./walletService";
import type { TopUpRequest, VerifyTopUpRequest, WithdrawRequest } from "./types/types";

export const useTopUpWalletMutation = () => {
  return useMutation({
    mutationFn: async (data: TopUpRequest) => {
      const response = await topUpWallet({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useVerifyTopUpMutation = () => {
  return useMutation({
    mutationFn: async (data: VerifyTopUpRequest) => {
      const response = await verifyTopUp({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useWithdrawFromWalletMutation = () => {
  return useMutation({
    mutationFn: async (data: WithdrawRequest) => {
      const response = await withdrawFromWallet({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
