import { useState, useCallback } from "react";
import type { SubscriptionPlan } from "../types/types";
import { SubscriptionPeriod } from "../types/enums";
import { SubscriptionPlanCard } from "./SubscriptionPlanCard";
import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";
import { useSubscribeMutation } from "../subscriptionMutations";
import { useSubscriptionPayment } from "@/hooks/useSubscriptionPayment";
import { subscriptionQueries } from "../subscriptionQueries";
import { authQueries } from "@/features/auth/authQueries";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/utils/toast";
import type { RazorpaySubscriptionResult } from "@/lib/razorpaySubscription";

interface SubscriptionPlanSelectorProps {
  plans: SubscriptionPlan[];
}

export function SubscriptionPlanSelector({
  plans,
}: SubscriptionPlanSelectorProps) {
  const defaultPlan = plans.find((p) => p.period === SubscriptionPeriod.YEARLY);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    defaultPlan?.id ?? plans[0]?.id ?? "",
  );

  const { data: profile } = useQuery(authQueries.profile());

  const subscribeMutation = useSubscribeMutation();

  const handleVerify = useCallback(
    async (_result: RazorpaySubscriptionResult) => {
      // Activation confirmed via polling on isPremiumActive
    },
    [],
  );

  const { status, initiatePayment, reset } = useSubscriptionPayment({
    onVerify: handleVerify,
    description: "Aavak Prime Subscription",
    prefill: {
      name: profile?.fullName,
      email: profile?.email,
      contact: profile?.phone,
    },
  });

  const isPolling = status === "polling";

  const { data: currentSubscription } = useQuery({
    ...subscriptionQueries.current(),
    enabled: isPolling,
    refetchInterval: 3000,
  });

  if (isPolling && currentSubscription?.isPremiumActive) {
    toast.success("Subscription activated successfully!");
    reset();
  }

  const handleSubscribe = async () => {
    const orderData = await subscribeMutation.mutateAsync({
      planId: selectedPlanId,
    });
    initiatePayment(orderData);
  };

  const handleTryAgain = () => {
    reset();
  };

  const isLoading =
    subscribeMutation.isPending || status === "checkout_open" || isPolling;

  const getButtonLabel = () => {
    if (subscribeMutation.isPending) return "Creating subscription…";
    if (status === "checkout_open") return "Complete in Razorpay…";
    if (isPolling) return "Activating…";
    return "Subscribe";
  };

  if (isPolling) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-xl bg-s-900 p-10">
        <div className="relative flex size-20 items-center justify-center">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-s-300 opacity-60" />
          <div className="relative flex size-16 items-center justify-center rounded-full bg-s-500">
            <Icon name="Award" size="lg" className="size-8 text-n-1000" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <h6 className="font-medium text-n-900">
            Activating your subscription…
          </h6>
          <p className="text-n-800">
            Please wait while we confirm your payment
          </p>
        </div>
      </div>
    );
  }

  if (status === "dismissed") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-danger-50 p-8">
        <div className="flex size-16 items-center justify-center rounded-full bg-danger-100">
          <Icon
            name="AlertCircle"
            size="lg"
            className="size-8 text-danger-500"
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <h6 className="font-medium text-danger-700">Payment Cancelled</h6>
          <p className="text-danger-600 opacity-70">
            Would you like to try again?
          </p>
        </div>
        <Button variant="filled" color="primary" onClick={handleTryAgain}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 w-full">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={plan.period === SubscriptionPeriod.YEARLY ? "pt-4" : ""}
          >
            <SubscriptionPlanCard
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onSelect={setSelectedPlanId}
            />
          </div>
        ))}
      </div>
      <Button
        className="mt-10 text-n-50 font-bold"
        size="lg"
        fullWidth
        variant="filled"
        color="secondary"
        onClick={handleSubscribe}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {getButtonLabel()}
      </Button>
    </div>
  );
}
