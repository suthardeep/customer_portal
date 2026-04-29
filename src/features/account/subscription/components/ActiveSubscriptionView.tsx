import Dialog from "@/components/base/Dialog";
import { Icon } from "@/components/base/icon/Icon";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import { prettyDate } from "@/utils/formatDateTime";
import dayjs from "dayjs";
import { useCancelSubscriptionMutation } from "../subscriptionMutations";
import { SubscriptionStatus } from "../types/enums";
import type { CurrentSubscription } from "../types/types";
import { getSubscriptionStatusLabel } from "../utils";

interface ActiveSubscriptionViewProps {
  subscription: CurrentSubscription;
}

export function ActiveSubscriptionView({
  subscription,
}: ActiveSubscriptionViewProps) {
  const cancelDialog = useToggle();
  const cancelMutation = useCancelSubscriptionMutation();

  const isCancelled = subscription.status === SubscriptionStatus.CANCELLED;
  const isPeriodPast = dayjs(subscription.currentPeriodEnd).isBefore(dayjs());

  const handleCancel = () => {
    cancelMutation.mutate(undefined, {
      onSuccess: () => cancelDialog.close(),
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Plan card */}
      <div className="rounded-2xl bg-linear-to-br from-s-1000 to-p-1000 border border-(--s-800) flex flex-col gap-5 shadow-2xl/60">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-1.5">
          <div className="flex items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full bg-s-500">
              <Icon name="Award" size="xl" className="text-n-50" />
            </div>
            <div>
              <p className="font-semibold text-n-50 capitalize">
                {subscription.planPeriod} plan
              </p>
              <p className="text-n-700">
                {getSubscriptionStatusLabel(subscription.status)}
              </p>
            </div>
          </div>
          <h5 className="font-bold text-s-300">
            {formatCurrency(subscription.planAmountInr)}
          </h5>
        </div>

        {/* Divider */}
        <div className="h-px bg-s-700" />

        {/* Details */}
        <div className="flex flex-col gap-3 p-6 pt-1">
          <div className="flex items-center justify-between">
            <p className="text-n-700">
              {isPeriodPast ? "Period ended" : "Current period ends"}
            </p>
            <p className="text-n-50 font-medium">
              {prettyDate(subscription.currentPeriodEnd)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-n-700">Premium access</p>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                subscription.isPremiumActive
                  ? "bg-success-100 text-success-700"
                  : "bg-n-800 text-n-400"
              }`}
            >
              {subscription.isPremiumActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {!isCancelled && (
        <button
          className="text-n-600 text-sm underline underline-offset-2 self-center hover:text-p-400 cursor-pointer"
          onClick={cancelDialog.open}
        >
          Cancel subscription
        </button>
      )}

      {isCancelled && (
        <p className="text-center text-n-600 text-sm">
          Subscription cancelled. Premium access until{" "}
          {prettyDate(subscription.currentPeriodEnd)}.
        </p>
      )}

      <Dialog
        isOpen={cancelDialog.isOpen}
        onClose={cancelDialog.close}
        title="Cancel subscription?"
        size="sm"
        disableBackdropClose={cancelMutation.isPending}
        actions={{
          secondary: {
            label: "Keep plan",
            onClick: cancelDialog.close,
            disabled: cancelMutation.isPending,
          },
          primary: {
            label: "Yes, cancel",
            onClick: handleCancel,
            loading: cancelMutation.isPending,
            disabled: cancelMutation.isPending,
            color: "danger",
          },
        }}
      >
        <p className="text-n-900">
          {`You'll keep premium access until ${prettyDate(subscription.currentPeriodEnd)}. After that, your account reverts to the free plan.`}
        </p>
      </Dialog>
    </div>
  );
}
