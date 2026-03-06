import { openRazorpayCheckout, type RazorpayOrderData, type RazorpayPaymentResult } from "@/lib/razorpay";
import { useCallback, useState } from "react";

type PaymentStatus = "idle" | "checkout_open" | "verifying" | "success" | "error" | "dismissed";

interface UsePaymentOptions {
  onVerify: (result: RazorpayPaymentResult) => Promise<void>;
  onDismiss?: () => void;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
}

export function usePayment({ onVerify, onDismiss, description, prefill }: UsePaymentOptions) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(
    async (orderData: RazorpayOrderData) => {
      try {
        setError(null);
        setStatus("checkout_open");

        await openRazorpayCheckout({
          order: orderData,
          description,
          prefill,
          onSuccess: async (result) => {
            try {
              setStatus("verifying");
              await onVerify(result);
              setStatus("success");
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : "Payment verification failed";
              setError(message);
              setStatus("error");
            }
          },
          onDismiss: () => {
            setStatus("dismissed");
            onDismiss?.();
          },
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Could not open payment dialog";
        setError(message);
        setStatus("error");
      }
    },
    [onVerify, onDismiss, description, prefill],
  );

  return {
    status,
    error,
    initiatePayment,
    reset: () => {
      setStatus("idle");
      setError(null);
    },
  };
}
