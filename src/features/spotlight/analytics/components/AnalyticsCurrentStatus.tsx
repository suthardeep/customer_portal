import { Icon } from "@/components/base/icon/Icon";
import type { CreatorAnalytics } from "@/features/spotlight/types/analytics.types";
import { AnalyticsProgressBar } from "./AnalyticsProgressBar";

interface AnalyticsCurrentStatusProps {
  data: Pick<
    CreatorAnalytics,
    | "currentTier"
    | "currentTierSubtitle"
    | "nextTier"
    | "nextLevelProgress"
    | "thresholds"
  >;
}

export function AnalyticsCurrentStatus({ data }: AnalyticsCurrentStatusProps) {
  const progress = Math.min(Math.max(data.nextLevelProgress, 0), 100);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="rounded-xl border border-n-400 p-4 space-y-4">
      {/* Top section: tier info + ring */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-n-800">
            Current Status
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-p-900">{data.currentTier}</span>
            <span className="rounded-full bg-p-50 px-2 py-0.5 text-xs font-semibold text-n-900">
              {data.currentTierSubtitle}
            </span>
          </div>
        </div>
        <div className="relative flex size-14 items-center justify-center">
          <svg
            className="-rotate-90"
            width="56"
            height="56"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              className="stroke-n-200"
              strokeWidth="4"
            />
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              className="stroke-p-500"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <Icon
            name="Star"
            size="lg"
            className="absolute size-6 text-yellow-500"
          />
        </div>
      </div>

      <div className="border-t border-n-200" />

      {/* Bottom section: next level + progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-n-800">
            Next Level:{" "}
            <span className="text-sm text-p-900"> {data.nextTier}</span>
          </p>
          <p className="font-semibold text-n-900">{data.nextLevelProgress}%</p>
        </div>
        <AnalyticsProgressBar
          label="Completed Campaigns"
          current={data.thresholds.completedCampaigns.current}
          required={data.thresholds.completedCampaigns.required}
        />
      </div>
    </div>
  );
}
