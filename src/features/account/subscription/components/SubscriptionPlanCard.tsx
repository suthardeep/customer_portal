import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import type { SubscriptionPlan } from "../types/types";
import { SubscriptionPeriod } from "../types/enums";
import { getSubscriptionPeriodLabel } from "../utils";

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

export function SubscriptionPlanCard({
  plan,
  isSelected,
  onSelect,
}: SubscriptionPlanCardProps) {
  const isYearly = plan.period === SubscriptionPeriod.YEARLY;

  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      className={cn(
        "relative w-full rounded-2xl p-5 text-left cursor-pointer transition-all duration-200 ring-3",
        isSelected
          ? "bg-linear-to-r from-p-400 to-p-600 ring-p-200"
          : "bg-s-950 ring-transparent",
      )}
    >
      {isYearly && (
        <div className="absolute -top-3.5 left-4">
          <span className="bg-n-50 text-p-600 font-bold rounded-full px-4 py-1.5">
            Best Offer
          </span>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mt-1">
        <div>
          <p className="font-bold text-n-50">{plan.item.name}</p>
          {plan.item.description && (
            <p className="text-n-50/70 mt-0.5">{plan.item.description}</p>
          )}
        </div>

        <div className="flex items-baseline gap-1 shrink-0">
          <h4 className="font-bold text-n-50">
            {formatCurrency(plan.item.amount / 100)}
          </h4>
          <p className="text-n-50/70">{getSubscriptionPeriodLabel(plan.period)}</p>
        </div>
      </div>
    </button>
  );
}
