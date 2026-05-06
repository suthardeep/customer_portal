import { Button } from "@/components/base/button/Button";
import { useCreateProductShareLinkMutation } from "@/features/affiliate/affiliateMutations";
import { useShareLink } from "@/features/affiliate/hooks/useShareLink";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";

interface CreateAffiliateButtonProps {
  productId: string;
  variantId?: string;
  productName: string;
}

export function CreateAffiliateButton({
  productId,
  variantId,
  productName,
}: CreateAffiliateButtonProps) {
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();
  const createShareLink = useCreateProductShareLinkMutation();
  const shareAction = useShareLink();

  const handleClick = async () => {
    if (!isAuthenticated) {
      loginDialog.open();
      return;
    }
    const link = await createShareLink.mutateAsync({ productId, variantId });
    await shareAction.share(link, productName);
  };

  return (
    <Button
      variant="outline"
      fullWidth
      isLoading={createShareLink.isPending}
      onClick={handleClick}
    >
      {shareAction.copied.isOpen ? "Link Copied!" : "Create Affiliate"}
    </Button>
  );
}
