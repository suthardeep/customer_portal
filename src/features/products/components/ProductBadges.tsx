import { Icon } from "@/components/base/icon";
import type { ProductFeature, ProductReturnPolicy } from "../types/types";
import { getReturnPolicyLabel } from "../utils";

interface ProductBadgesProps {
  features?: ProductFeature[];
  returnPolicy?: ProductReturnPolicy;
}

export function ProductBadges({ features, returnPolicy }: ProductBadgesProps) {
  if (!features || features.length === 0) return null;

  const getLabel = (feature: ProductFeature) => {
    if (feature.icon === "DeliveryReturn" && returnPolicy) {
      return getReturnPolicyLabel(returnPolicy);
    }
    return feature.label;
  };

  const getDescription = (feature: ProductFeature) => {
    if (feature.icon === "DeliveryReturn" && returnPolicy) {
      return returnPolicy.description;
    }
    return feature.description;
  };

  return (
    <div className="flex items-start justify-evenly gap-6 mt-4">
      {features.map((feature) => {
        const label = getLabel(feature);
        const description = getDescription(feature);
        return (
          <div
            key={feature.id}
            className="flex flex-col items-center gap-2"
            title={description}
          >
            {feature.icon && (
              <div className="flex size-10 items-center justify-center rounded-full border border-(--s-200) bg-s-50">
                <Icon
                  name={feature.icon}
                  size="lg"
                  className="text-s-600"
                  strokeWidth={2}
                />
              </div>
            )}
            <span className="max-w-16 text-center text-xs font-medium text-n-850">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
