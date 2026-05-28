import { Button } from "@/components/base/button/Button";
import { useCreateProductShareLinkMutation } from "@/features/affiliate/affiliateMutations";
import { useShareLink } from "@/features/affiliate/hooks/useShareLink";

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
  const createShareLink = useCreateProductShareLinkMutation();
  const shareAction = useShareLink();

  const handleClick = async () => {
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
