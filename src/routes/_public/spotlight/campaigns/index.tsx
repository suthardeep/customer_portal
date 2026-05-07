import { campaignQueries } from "@/features/spotlight/campaigns/campaignsQueries";
import CampaignCard from "@/features/spotlight/campaigns/components/CampaignCard";
import { CampaignsListSkeleton } from "@/features/spotlight/campaigns/components/skeletons/CampaignsListSkeleton";
import { CampaignStatus } from "@/features/spotlight/campaigns/types/enums";
import SpotlightRouteHeader from "@/features/spotlight/components/SpotlightRouteHeader";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/spotlight/campaigns/")({
  component: RouteComponent,
  pendingComponent: CampaignsListSkeleton,
  loader: async ({ context }) => {
    await context.queryClient.ensureInfiniteQueryData(
      campaignQueries.campaignListInfinite({}),
    );
  },
});

function RouteComponent() {
  const { data } = useSuspenseInfiniteQuery(
    campaignQueries.campaignListInfinite({ status: CampaignStatus.LIVE }),
  );
  const campaigns = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div>
      <SpotlightRouteHeader />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
