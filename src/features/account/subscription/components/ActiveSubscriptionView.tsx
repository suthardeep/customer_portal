import Dialog from "@/components/base/Dialog";
import { Icon } from "@/components/base/icon/Icon";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import { prettyDate } from "@/utils/formatDateTime";
import dayjs from "dayjs";
import { useCancelSubscriptionMutation } from "../subscriptionMutations";
import { SubscriptionStatus } from "../types/enums";
import type { CurrentSubscription, SubscriptionPlan } from "../types/types";
import { getSubscriptionStatusLabel } from "../utils";
import { SubscriptionPlanSelector } from "./SubscriptionPlanSelector";

interface ActiveSubscriptionViewProps {
  subscription: CurrentSubscription;
  plans: SubscriptionPlan[];
}

export function ActiveSubscriptionView({
  subscription,
  plans,
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
            <p className="text-n-700">Active plan</p>
            <p className="text-n-50 font-medium capitalize">
              {subscription.planPeriod}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-n-700">
              {isPeriodPast ? "Expired on" : "Valid until"}
            </p>
            <p className="text-n-50 font-medium">
              {prettyDate(subscription.currentPeriodEnd)}
            </p>
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
        <>
          <p className="text-center text-n-600 text-sm">
            {subscription.cancelledAt && (
              <>
                Subscription cancelled on {prettyDate(subscription.cancelledAt)}
                .{" "}
              </>
            )}
            Premium access until {prettyDate(subscription.currentPeriodEnd)}.
          </p>

          {subscription.pendingSubscription ? (
            <div className="flex flex-col gap-3">
              <p className="text-center text-n-600 text-sm">
                Good news — you've already got your next plan sorted! It'll kick
                in automatically when your current premium access ends, so you
                won't miss a beat.
              </p>

              <div className="rounded-xl border border-(--s-700) bg-linear-to-br from-s-1000 to-p-1000 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-s-900/40">
                  <Icon
                    name="Calendar"
                    size="sm"
                    className="text-s-400 shrink-0"
                  />
                  <p className="text-xs font-medium uppercase tracking-wide text-s-100">
                    Upcoming plan
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-3 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-n-50 font-semibold capitalize">
                      {subscription.pendingSubscription.planPeriod} plan
                    </p>
                    <h5 className="font-bold text-s-300">
                      {formatCurrency(
                        subscription.pendingSubscription.planAmountInr,
                      )}
                    </h5>
                  </div>

                  <div className="h-px bg-s-800" />

                  <div className="flex items-center justify-between">
                    <p className="text-n-700 text-sm">Starts on</p>
                    <p className="text-s-100 font-medium text-sm">
                      {prettyDate(
                        subscription.pendingSubscription.billingStartsAt,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-s-800" />
                <p className="text-xs text-n-700 shrink-0">
                  Subscribe for next period
                </p>
                <div className="h-px flex-1 bg-s-800" />
              </div>
              <SubscriptionPlanSelector plans={plans} />
            </>
          )}
        </>
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
