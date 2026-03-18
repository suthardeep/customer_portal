import { useSuspenseQuery } from "@tanstack/react-query";
import { Icon } from "@/components/base/icon/Icon";
import { spotlightQueries } from "../spotlightQueries";

export function SpotlightCurrentStatus() {
  const { data } = useSuspenseQuery(spotlightQueries.creatorAnalytics());

  const progress = Math.min(Math.max(data.nextLevelProgress, 0), 100);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-between rounded-xl border border-n-400 px-4 py-2">
      <div className="space-y-0.5 flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wide text-n-600">
          Current Status
        </span>
        <span className="font-bold text-p-900">{data.currentTier}</span>
      </div>
      <div className="relative flex size-14 items-center justify-center">
        <svg className="-rotate-90" width="56" height="56" viewBox="0 0 56 56">
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
  );
}
