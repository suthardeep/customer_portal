import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
  logout,
  updateCustomerProfile,
  requestEmailOtp,
  verifyEmailOtp,
} from "./authService";
import { authKeys } from "./authQueryFactory";
import type {
  UpdateProfileRequest,
  RequestEmailOtpRequest,
  VerifyEmailOtpRequest,
} from "./types/types";

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await updateCustomerProfile({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useRequestEmailOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: RequestEmailOtpRequest) => {
      return requestEmailOtp({ data });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useVerifyEmailOtpMutation = () => {
  return useMutation({
    mutationFn: async (data: VerifyEmailOtpRequest) => {
      return verifyEmailOtp({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      queryClient.clear();
      router.navigate({ to: "/" });
    },
  });
};
