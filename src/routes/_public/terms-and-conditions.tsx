import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PolicyContent } from "@/features/policy/components/PolicyContent";
import { PolicyPageSkeleton } from "@/features/policy/components/skeletons/PolicyPageSkeleton";
import { policyQueries } from "@/features/policy/policyQueries";
import { PolicyTypeEnum } from "@/features/policy/types/types";
import FallbackView from "@/components/empty-states/FallbackView";

export const Route = createFileRoute("/_public/terms-and-conditions")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      policyQueries.detail(PolicyTypeEnum.TERMS_AND_CONDITIONS),
    );
  },
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
