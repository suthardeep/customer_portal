import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { campaignQueries } from "@/features/spotlight/campaigns/campaignsQueries";
import type { Product } from "@/features/products/types/product.types";
import { useToggle } from "@/hooks/useToggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import CampaignSubmissionForm from "../submit/CampaignSubmissionForm";

interface CampaignJoinButtonProps {
  campaignId: string;
  products: Product[];
}

const CampaignJoinButton = ({
  campaignId,
  products,
}: CampaignJoinButtonProps) => {
  const submissionDialog = useToggle();
  const { data: submissions } = useSuspenseQuery(
    campaignQueries.myCampaignSubmissions(campaignId, {}),
  );
  const hasSubmissions = submissions.data.length > 0;

  return (
    <>
      <div className="space-y-2">
        <Button fullWidth size="lg" onClick={submissionDialog.open}>
          {hasSubmissions ? "Add new submission" : "Join & Submit"}
        </Button>
      </div>
      <Dialog
        isOpen={submissionDialog.isOpen}
        onClose={submissionDialog.close}
        title="Submission"
        size="lg"
      >
        <CampaignSubmissionForm
          campaignId={campaignId}
          products={products}
          onSuccess={submissionDialog.close}
        />
      </Dialog>
    </>
  );
};

export default CampaignJoinButton;
