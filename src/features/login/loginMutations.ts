import { authKeys } from "@/features/auth/authQueryFactory";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { spotlightKeys } from "../spotlight/spotlightQueryFactory";
import { sendOtp, verifyOtp, validateReferral } from "./loginService";
import type {
  SendOtpRequest,
  SendOtpResponse,
  User,
  VerifyOtpRequest,
  ValidateReferralRequest,
  ValidateReferralResponse,
} from "./types/types";
import { walletKeys } from "../account/wallet/walletQueryFactory";
import { toast } from "@/utils/toast";
import { migrateCart } from "@/features/cart/cartService";
import { cartKeys } from "@/features/cart/cartQueryFactory";
import type { Cart } from "@/features/cart/types/types";
import { getSessionId } from "@/utils/getSessionId";

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: SendOtpRequest): Promise<SendOtpResponse> => {
      const response = await sendOtp({ data });
      return response.data;
    },
  });
};

export const useValidateReferralMutation = () => {
  return useMutation({
    mutationFn: async (
      data: ValidateReferralRequest,
    ): Promise<ValidateReferralResponse> => {
      return validateReferral({ data });
    },
    onSuccess: (res) => {
      if (!res.data.valid) {
        toast.error("Invalid referral code");
      }
    },
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: VerifyOtpRequest): Promise<User> => {
      return verifyOtp({ data });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });
      const cachedCart = queryClient.getQueryData<Cart>(cartKeys.detail());
      if (cachedCart && cachedCart.totalItems > 0) {
        const sessionId = getSessionId();
        await migrateCart({ data: { sessionId } }).catch(() => {});
      }
      await queryClient.refetchQueries({ queryKey: authKeys.profile() });
      await queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
      await queryClient.invalidateQueries({
        queryKey: spotlightKeys.profile(),
      });
    },
  });
};
