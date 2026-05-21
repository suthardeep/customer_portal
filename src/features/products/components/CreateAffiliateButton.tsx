import { Button } from "@/components/base/button/Button";
import { affiliateQueries } from "@/features/affiliate/affiliateQueries";
import { useShareLink } from "@/features/affiliate/hooks/useShareLink";
import { useQuery } from "@tanstack/react-query";

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
  const shareLinkQuery = useQuery(affiliateQueries.productShareLink(productId, variantId));
  const shareAction = useShareLink();

  const handleClick = async () => {
    if (!shareLinkQuery.data) return;
    await shareAction.share(shareLinkQuery.data, productName);
  };

  return (
    <Button
      variant="outline"
      fullWidth
      isLoading={shareLinkQuery.isLoading}
      onClick={handleClick}
    >
      {shareAction.copied.isOpen ? "Link Copied!" : "Create Affiliate"}
    </Button>
  );
}
