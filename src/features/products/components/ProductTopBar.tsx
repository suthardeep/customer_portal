import { IconButton } from "@/components/base/icon-button/IconButton";
import { useCreateProductShareLinkMutation } from "@/features/affiliate/affiliateMutations";
import { useShareLink } from "@/features/affiliate/hooks/useShareLink";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { useWishlistSheetStore } from "@/features/wishlist/stores/wishlistSheetStore";
import { useAddItemToCollectionMutation } from "@/features/wishlist/wishlistMutations";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
import { cn } from "@/utils/cssHelpers";
import { toast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearch } from "@tanstack/react-router";

interface ProductTopBarProps {
  brandName?: string;
  brandId?: string;
  productName: string;
}

export function ProductTopBar({
  brandName,
  productName,
  brandId,
}: ProductTopBarProps) {
  const { productId } = useParams({
    from: "/_public/products/$productId",
  });
  const { variantId } = useSearch({
    from: "/_public/products/$productId",
  });
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();

  const wishlistItems = useQuery({
    ...wishlistQueries.collectionsProducts("ALL", { pageSize: 100 }),
    enabled: isAuthenticated,
  });
  const isWishlisted = wishlistItems?.data?.data?.some(
    (item) => item?.productId === productId,
  );

  const openWishlistSheet = useWishlistSheetStore((state) => state.open);
  const addItemToAllCollectionMutation = useAddItemToCollectionMutation();

  const shareLink = useCreateProductShareLinkMutation();
  const shareAction = useShareLink();

  const handleShareClick = async () => {
    if (!isAuthenticated) {
      loginDialog.open();
      return;
    }
    const link = await shareLink.mutateAsync({ productId, variantId });
    await shareAction.share(link, productName);
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      loginDialog.open();
      return;
    }
    if (!isWishlisted) {
      if (variantId) {
        addItemToAllCollectionMutation.mutate({
          productId: productId,
          variantId: variantId,
        });
      } else {
        toast.error("Please select at least one variant");
      }
    }
    openWishlistSheet({ productId, productName, variantId: variantId ?? "" });
  };

  return (
    <div className="flex gap-2 justify-between items-center">
      {brandName && (
        <Link
          to="/products"
          search={{ brandId, brandName }}
          className="text-sm text-n-800 hover:text-p-700 group"
        >
          View all products of{" "}
          <span className="text-sm font-semibold text-n-800 group-hover:text-p-700">
            {" "}
            {brandName}
          </span>
        </Link>
      )}
      <div className="flex justify-end gap-1">
        <IconButton
          icon="Heart"
          size="lg"
          variant="ghost"
          color="neutral"
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
          iconClassName={cn(isWishlisted && "fill-danger-500 text-danger-500")}
        />
        <IconButton
          icon="Share"
          size="lg"
          variant="ghost"
          color="neutral"
          onClick={handleShareClick}
          isLoading={shareLink.isPending}
          aria-label="Share product"
        />
      </div>
    </div>
  );
}
