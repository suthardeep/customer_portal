import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import type { Product } from "@/features/products/types/product.types";
import { campaignQueries } from "@/features/spotlight/campaigns/campaignsQueries";
import { useToggle } from "@/hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
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
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();

  const { data: submissions } = useQuery({
    ...campaignQueries.myCampaignSubmissions(campaignId, {}),
    enabled: isAuthenticated,
  });
  const hasSubmissions = (submissions && submissions.data.length > 0) || false;

  const handleJoinClick = () => {
    if (!isAuthenticated) {
      loginDialog.open({ onSuccess: submissionDialog.open });
      return;
    }
    submissionDialog.open();
  };

  return (
    <>
      <div className="space-y-2">
        <Button fullWidth size="lg" onClick={handleJoinClick}>
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
