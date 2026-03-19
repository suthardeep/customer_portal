import { authKeys } from "@/features/auth/authQueryFactory";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { spotlightKeys } from "../spotlight/spotlightQueryFactory";
import { sendOtp, verifyOtp } from "./loginService";
import type {
  SendOtpRequest,
  SendOtpResponse,
  User,
  VerifyOtpRequest,
} from "./types/types";
import { walletKeys } from "../account/wallet/walletQueryFactory";

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: SendOtpRequest): Promise<SendOtpResponse> => {
      const response = await sendOtp({ data });
      return response.data;
    },
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: VerifyOtpRequest): Promise<User> => {
      return verifyOtp({ data });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: authKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
      await queryClient.invalidateQueries({
        queryKey: spotlightKeys.profile(),
      });
    },
  });
};
