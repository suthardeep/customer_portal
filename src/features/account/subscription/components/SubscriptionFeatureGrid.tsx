import { Icon } from "@/components/base/icon/Icon";
import { cn } from "@/utils/cssHelpers";
import { SUBSCRIPTION_FEATURES } from "../constants";

export function SubscriptionFeatureGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
      {SUBSCRIPTION_FEATURES.map((feature) => (
        <li
          key={feature.id}
          className={cn(
            "flex items-center gap-2",
            feature.isFullWidth && "col-span-2 justify-center",
          )}
        >
          <Icon
            name="Star"
            size="sm"
            className="text-yellow-400 shrink-0 **:fill-(--accent-star) **:fill-(--accent-star)"
          />
          <p className="text-n-50 font-medium">{feature.label}</p>
        </li>
      ))}
    </ul>
  );
}
