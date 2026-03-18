import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { AnalyticsAavakCoins } from "@/features/spotlight/analytics/components/AnalyticsAavakCoins";
import { AnalyticsConversationRate } from "@/features/spotlight/analytics/components/AnalyticsConversationRate";
import { AnalyticsCurrentStatus } from "@/features/spotlight/analytics/components/AnalyticsCurrentStatus";
import { AnalyticsPostsCreated } from "@/features/spotlight/analytics/components/AnalyticsPostsCreated";
import { AnalyticsTotalViews } from "@/features/spotlight/analytics/components/AnalyticsTotalViews";
import { AnalyticsPageSkeleton } from "@/features/spotlight/analytics/components/skeletons/AnalyticsPageSkeleton";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";

export const Route = createFileRoute("/_public/spotlight/_protected/analytics")(
  {
    loader: async ({ context }) => {
      await context.queryClient.ensureQueryData(
        spotlightQueries.creatorAnalytics(),
      );
    },
    pendingComponent: AnalyticsPageSkeleton,
    component: RouteComponent,
  },
);

function RouteComponent() {
  const { data } = useSuspenseQuery(spotlightQueries.creatorAnalytics());

  return (
    <div className="space-y-4">
      <AccountPageHeader title="Performance Analytics" />
      <AnalyticsCurrentStatus data={data} />
      <AnalyticsTotalViews totalViews={data.totalViews} />
      <div className="grid md:grid-cols-2 gap-4">
        <AnalyticsPostsCreated postsCreated={data.postsCreated} />
        <AnalyticsConversationRate
          engagementRate={data.engagementRate}
          engagementRateGrowthPct={data.engagementRateGrowthPct}
        />
      </div>
      <AnalyticsAavakCoins aavakCoinsEarned={data.aavakCoinsEarned} />
    </div>
  );
}
