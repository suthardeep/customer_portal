import type { TopUpResponse } from "@/features/account/wallet/types/types";

export type RazorpayOrderData = TopUpResponse;

export interface RazorpayPaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface OpenRazorpayOptions {
  order: RazorpayOrderData;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (result: RazorpayPaymentResult) => void;
  onDismiss?: () => void;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout({
  order,
  description = "Payment",
  prefill,
  onSuccess,
  onDismiss,
}: OpenRazorpayOptions) {
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error("Failed to load Razorpay SDK");

  const options = {
    key: order.key,
    amount: order.amount,
    currency: order.currency,
    order_id: order.razorpayOrderId,
    description,
    prefill,
    handler: (response: RazorpayPaymentResult) => {
      onSuccess(response);
    },
    modal: {
      ondismiss: onDismiss,
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
