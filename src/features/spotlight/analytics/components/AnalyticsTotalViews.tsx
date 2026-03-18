import { formatCompactNumber } from "@/utils/formatCompactNumber";

interface AnalyticsTotalViewsProps {
  totalViews: number;
}

export function AnalyticsTotalViews({ totalViews }: AnalyticsTotalViewsProps) {
  return (
    <div className="rounded-xl border border-n-400 p-4 space-y-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-n-800">
        Total Views
      </span>
      <p className="text-2xl font-bold text-n-900">
        {formatCompactNumber(totalViews)}
      </p>
    </div>
  );
}
