import {
  openRazorpaySubscriptionCheckout,
  type RazorpaySubscriptionOrderData,
  type RazorpaySubscriptionResult,
} from "@/lib/razorpaySubscription";
import { useCallback, useState } from "react";

type PaymentStatus = "idle" | "checkout_open" | "polling" | "success" | "error" | "dismissed";

interface UseSubscriptionPaymentOptions {
  onVerify: (result: RazorpaySubscriptionResult) => Promise<void>;
  onDismiss?: () => void;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
}

export function useSubscriptionPayment({
  onVerify,
  onDismiss,
  description,
  prefill,
}: UseSubscriptionPaymentOptions) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(
    async (orderData: RazorpaySubscriptionOrderData) => {
      try {
        setError(null);
        setStatus("checkout_open");

        await openRazorpaySubscriptionCheckout({
          order: orderData,
          description,
          prefill,
          onSuccess: async (result) => {
            try {
              setStatus("polling");
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
