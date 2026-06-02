import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PolicyContent } from "@/features/policy/components/PolicyContent";
import { PolicyPageSkeleton } from "@/features/policy/components/skeletons/PolicyPageSkeleton";
import { policyQueries } from "@/features/policy/policyQueries";
import { PolicyTypeEnum } from "@/features/policy/types/types";
import FallbackView from "@/components/empty-states/FallbackView";
import { APP_NAME, APP_URL, buildMeta } from "@/utils/seo";

export const Route = createFileRoute("/_public/terms-and-conditions")({
  head: () => ({
    meta: buildMeta({
      title: `Terms & Conditions — ${APP_NAME}`,
      description: `Read the ${APP_NAME} terms and conditions governing use of our platform and services.`,
      url: `${APP_URL}/terms-and-conditions`,
    }),
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      policyQueries.detail(PolicyTypeEnum.TERMS_AND_CONDITIONS),
    );
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  }),
  pendingComponent: PolicyPageSkeleton,
  errorComponent: () => (
    <div className="p-4">
      <FallbackView
        title="Unable to load Terms and Conditions"
        color="danger"
        icon="AlertCircle"
        subtitle="We are facing some issues. Please try again later."
      />
    </div>
  ),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  const { data } = useSuspenseQuery(
    policyQueries.detail(PolicyTypeEnum.TERMS_AND_CONDITIONS),
  );
  return <PolicyContent policy={data} />;
}
