import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PolicyContent } from "@/features/policy/components/PolicyContent";
import { PolicyPageSkeleton } from "@/features/policy/components/skeletons/PolicyPageSkeleton";
import { policyQueries } from "@/features/policy/policyQueries";
import { PolicyTypeEnum } from "@/features/policy/types/types";
import FallbackView from "@/components/empty-states/FallbackView";
import { APP_NAME, APP_URL, buildMeta } from "@/utils/seo";

export const Route = createFileRoute("/_public/privacy-policy")({
  head: () => ({
    meta: buildMeta({
      title: `Privacy Policy — ${APP_NAME}`,
      description: `Read the ${APP_NAME} privacy policy to understand how we collect, use and protect your data.`,
      url: `${APP_URL}/privacy-policy`,
    }),
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      policyQueries.detail(PolicyTypeEnum.PRIVACY_POLICY),
    );
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  }),
  pendingComponent: PolicyPageSkeleton,
  errorComponent: () => (
    <div className="p-4">
      <FallbackView
        title="Unable to load Privacy Policy"
        color="danger"
        icon="AlertCircle"
        subtitle="We are facing some issues. Please try again later."
      />
    </div>
  ),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const { data } = useSuspenseQuery(
    policyQueries.detail(PolicyTypeEnum.PRIVACY_POLICY),
  );
  return <PolicyContent policy={data} />;
}
