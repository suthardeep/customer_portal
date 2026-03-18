import { useSuspenseQuery } from "@tanstack/react-query";
import SpotlightTierBadge from "@/components/compound/illustrations/SpotlightTierBadge";
import { cn } from "@/utils/cssHelpers";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";

interface CreatorTierCardProps {
  currentTier: string;
}

export function CreatorTierCard({ currentTier }: CreatorTierCardProps) {
  const { data: tiers } = useSuspenseQuery(spotlightQueries.creatorTiers());

  return (
    <div className="rounded-2xl bg-linear-to-l from-p-400 to-p-600 p-5 text-white flex flex-col justify-between gap-4 self-start">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-lg">Creator Tier System</p>
          <p className="text-p-100 text-sm mt-1">
            Start your journey and unlock higher rewards as you progress.
          </p>
        </div>
        <SpotlightTierBadge />
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {tiers.map((tier, i) => {
          const isCurrent = tier.tier === currentTier;

          return (
            <div key={tier.id} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-p-200 text-xs">→</span>}
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrent
                    ? "bg-white text-p-700 rounded-full px-3 py-0.5"
                    : "text-p-100",
                )}
              >
                {tier.tier}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
