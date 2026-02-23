import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/queryClient';
import { authKeys } from '@/features/auth/authQueryFactory';
import { sendOtp, verifyOtp } from './loginService';
import type { SendOtpRequest, SendOtpResponse, VerifyOtpRequest, User } from './types/types';

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
    onSuccess: () => {
      // Invalidate profile to trigger fresh fetch
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};
