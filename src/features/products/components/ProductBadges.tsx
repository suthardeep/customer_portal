import { Icon } from "@/components/base/icon";
import type { ProductFeature } from "../types/types";

interface ProductBadgesProps {
  features?: ProductFeature[];
}

export function ProductBadges({ features }: ProductBadgesProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="flex items-start justify-evenly gap-6 mt-4">
      {features.map((feature) => {
        return (
          <div key={feature.id} className="flex flex-col items-center gap-2">
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
              {feature.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
