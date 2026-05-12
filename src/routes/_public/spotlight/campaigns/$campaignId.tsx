import dayjs from "dayjs";
import { campaignQueries } from "@/features/spotlight/campaigns/campaignsQueries";
import CampaignHero from "@/features/spotlight/campaigns/components/CampaignHero";
import CampaignDescription from "@/features/spotlight/campaigns/components/CampaignDescription";
import CampaignDeliverables from "@/features/spotlight/campaigns/components/CampaignDeliverables";
import CampaignRequirements from "@/features/spotlight/campaigns/components/CampaignRequirements";
import CampaignRules from "@/features/spotlight/campaigns/components/CampaignRules";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import CampaignGuidelineDownload from "@/features/spotlight/campaigns/components/CampaignGuidelineDownload";
import CampaignJoinButton from "@/features/spotlight/campaigns/components/CampaignJoin";
import CampaignProducts from "@/features/spotlight/campaigns/components/CampaignProducts";
import MyCampaignSubmissions from "@/features/spotlight/campaigns/components/MyCampaignSubmissions";
import ErrorText from "@/components/base/ErrorText";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const Route = createFileRoute(
  "/_public/spotlight/campaigns/$campaignId",
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(
        campaignQueries.campaignDetail(params.campaignId),
      ),
      context.queryClient.prefetchQuery(
        campaignQueries.myCampaignSubmissions(params.campaignId, {}),
      ),
    ]);
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { isAuthenticated } = useAuth();
  const { data } = useSuspenseQuery(
    campaignQueries.campaignDetail(params.campaignId),
  );
  const { data: submissions } = useQuery({
    ...campaignQueries.myCampaignSubmissions(params.campaignId, {}),
    enabled: isAuthenticated,
  });

  const isCampaignEnded = dayjs().isAfter(dayjs(data.endDate));
  const isRewardsFull = data.rewardedCreatorCount >= data.numberOfInfluencers;

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
        <CampaignProducts products={data.products} />
        <CampaignGuidelineDownload guidelinePdfUrl={data.guidelinePdfUrl} />
        {submissions && submissions?.data?.length > 0 && (
          <MyCampaignSubmissions
            campaignId={data.id}
            submissions={submissions.data}
          />
        )}
      </div>
      {isCampaignEnded ? (
        <ErrorText withBgCard className="text-center">
          This campaign has ended and is no longer accepting submissions.
        </ErrorText>
      ) : isRewardsFull ? (
        <div className="p-2 bg-amber-50 rounded-md">
          <p className="text-center text-amber-800 font-medium">
            All reward slots have been filled. No new submissions are being
            accepted.
          </p>
        </div>
      ) : (
        <CampaignJoinButton
          campaignId={params.campaignId}
          products={data.products}
        />
      )}
    </div>
  );
}
