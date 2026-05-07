import { showErrorToasts } from "@/components/toast";
import { haptic } from "@/utils/haptics";
import { queryClient } from "@/queryClient";
import { cartKeys } from "@/features/cart/cartQueryFactory";
import { myOrderKeys } from "@/features/account/my-orders/myOrdersQueryFactory";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { initiatePayment, verifyPayment } from "./checkoutService";
import { useCheckoutStore } from "./stores/checkoutStore";
import type { CodOrderResponse, VerifyPaymentPayload } from "./types/types";

export const useInitiatePaymentMutation = () => {
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await initiatePayment({ data: { sessionId } });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const usePlaceCodOrderMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await initiatePayment({ data: { sessionId } });
      return response.data;
    },
    onSuccess: (data) => {
      haptic("heavy");
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({ queryKey: myOrderKeys.all });
      useCheckoutStore.getState().reset();
      navigate({
        to: "/order-success/$orderId",
        params: { orderId: (data as CodOrderResponse).orderId },
      });
    },
    onError: (error) => {
      haptic("error");
      showErrorToasts(error);
      navigate({ to: "/order-error" });
    },
  });
};

export const useVerifyPaymentMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { orderId: string } & VerifyPaymentPayload) => {
      const response = await verifyPayment({ data });
      return response.data;
    },
    onSuccess: (data) => {
      haptic("heavy");
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      useCheckoutStore.getState().reset();
      navigate({
        to: "/order-success/$orderId",
        params: { orderId: data.id },
      });
    },
    onError: (error) => {
      haptic("error");
      showErrorToasts(error);
      navigate({ to: "/order-error" });
    },
  });
};
