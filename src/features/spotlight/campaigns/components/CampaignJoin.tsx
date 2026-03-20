import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { useToggle } from "@/hooks/useToggle";
import CampaignSubmissionForm from "./CampaignSubmissionForm";
import type { Product } from "@/features/products/types/product.types";

interface CampaignJoinButtonProps {
  campaignId: string;
  products: Product[];
}

const CampaignJoinButton = ({
  campaignId,
  products,
}: CampaignJoinButtonProps) => {
  const submissionDialog = useToggle();

  return (
    <>
      <Button fullWidth size="lg" onClick={submissionDialog.open}>
        Join & Submit
      </Button>
      <Dialog
        isOpen={submissionDialog.isOpen}
        onClose={submissionDialog.close}
        title="Submission"
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
