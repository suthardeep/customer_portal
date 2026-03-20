import { campaignQueries } from "@/features/spotlight/campaigns/campaignsQueries";
import CampaignHero from "@/features/spotlight/campaigns/components/CampaignHero";
import CampaignDescription from "@/features/spotlight/campaigns/components/CampaignDescription";
import CampaignDeliverables from "@/features/spotlight/campaigns/components/CampaignDeliverables";
import CampaignRequirements from "@/features/spotlight/campaigns/components/CampaignRequirements";
import CampaignRules from "@/features/spotlight/campaigns/components/CampaignRules";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import CampaignGuidelineDownload from "@/features/spotlight/campaigns/components/CampaignGuidelineDownload";
import CampaignJoinButton from "@/features/spotlight/campaigns/components/CampaignJoin";

export const Route = createFileRoute(
  "/_public/spotlight/campaigns/$campaignId",
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      campaignQueries.campaignDetail(params.campaignId),
    );
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data } = useSuspenseQuery(
    campaignQueries.campaignDetail(params.campaignId),
  );

  return (
    <div className="relative">
      <AccountPageHeader title={data?.name ?? "Campaign details"} />
      <CampaignHero
        image={data.image}
        name={data.name}
        campaignBudget={data.campaignBudget}
      />
      <div className="p-4 space-y-6">
        <CampaignDescription
          name={data.name}
          description={data.description}
          startDate={data.startDate}
          endDate={data.endDate}
        />
        <CampaignDeliverables
          videoDeliverables={data.videoDeliverables}
          imageDeliverables={data.imageDeliverables}
          showHeadingText
        />
        <CampaignRequirements requirements={data.requirements} />
        <CampaignRules rules={data.rules} />
        <CampaignGuidelineDownload guidelinePdfUrl={data.guidelinePdfUrl} />
      </div>
      <CampaignJoinButton
        campaignId={params.campaignId}
        products={data.products}
      />
    </div>
  );
}
