import { Icon } from "@/components/base/icon/Icon";

interface AnalyticsConversationRateProps {
  engagementRate: number;
  engagementRateGrowthPct: number | null;
}

export function AnalyticsConversationRate({
  engagementRate,
  engagementRateGrowthPct,
}: AnalyticsConversationRateProps) {
  return (
    <div className="rounded-xl border border-n-400 p-4 flex flex-col justify-between gap-3">
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-full bg-pink-100">
          <Icon
            name="Heart"
            size="lg"
            strokeWidth={2}
            className="text-pink-500"
          />
        </div>
        {engagementRateGrowthPct !== null && (
          <div className="flex items-center gap-1 text-s-600">
            <Icon name="TrendingUp" size="xs" />
            <span className="text-xs font-semibold">
              {engagementRateGrowthPct}%
            </span>
          </div>
        )}
      </div>
      <div className="space-y-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-n-800">
          Conversation Rate
        </span>
        <p className="text-2xl font-bold text-n-900">{engagementRate}%</p>
      </div>
    </div>
  );
}
