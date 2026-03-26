export interface RazorpaySubscriptionOrderData {
  subscriptionId: string;
  key: string;
}

export interface RazorpaySubscriptionResult {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

interface OpenRazorpaySubscriptionOptions {
  order: RazorpaySubscriptionOrderData;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (result: RazorpaySubscriptionResult) => void;
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

export async function openRazorpaySubscriptionCheckout({
  order,
  description = "Subscription",
  prefill,
  onSuccess,
  onDismiss,
}: OpenRazorpaySubscriptionOptions) {
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error("Failed to load Razorpay SDK");

  const options = {
    key: order.key,
    subscription_id: order.subscriptionId,
    description,
    prefill,
    handler: (response: RazorpaySubscriptionResult) => {
      onSuccess(response);
    },
    modal: {
      ondismiss: onDismiss,
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
