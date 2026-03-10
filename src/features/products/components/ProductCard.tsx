import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Button } from "@/components/base/button/Button";
import { Image } from "@/components/base/Image";
import { useWishlistSheetStore } from "@/features/wishlist/stores/wishlistSheetStore";
import { WishlistButton } from "@/features/wishlist/components/WishlistButton";
import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link } from "@tanstack/react-router";
import type { Product } from "../types";
import { useQuery } from "@tanstack/react-query";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
import { useAddItemToCollectionMutation } from "@/features/wishlist/wishlistMutations";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";

interface ProductCardProps {
  product: Product;
  onAddToCartSuccess?: (productId: string) => void;
  className?: string;
  disableDetailPageRedirection?: boolean;
}

export function ProductCard({
  product,
  onAddToCartSuccess,
  className,
  disableDetailPageRedirection = false,
}: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();

  const imageUrl = product?.mediaUrls?.[0];

  const wishlistItems = useQuery(
    wishlistQueries.collectionsProducts("ALL", {
      pageSize: 100,
    }),
  );

  const isWishlisted = wishlistItems?.data?.data?.some(
    (item) => item?.productId === product?.id,
  );

  const addItemToAllCollectionMutation = useAddItemToCollectionMutation();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginDialog.open({
        onSuccess: () => {
          handleWishlistAdd();
        },
      });
      return;
    }
    handleWishlistAdd();
  };

  const handleWishlistAdd = () => {
    if (!isWishlisted) {
      addItemToAllCollectionMutation.mutate({
        productId: product.id,
        variantId: product?.variantId,
      });
    }
    openWishlistSheet({
      productId: product.id,
      productName: product.name,
      variantId: product?.variantId,
    });
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCartSuccess) {
      onAddToCartSuccess?.(product.id);
    }
  };

  const openWishlistSheet = useWishlistSheetStore((state) => state.open);

  const content = () => (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-n-300 bg-white",
        className,
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Image src={imageUrl ?? ""} alt={product.name} />

        {/* Wishlist Button */}
        <WishlistButton
          isWishlisted={!!isWishlisted}
          onClick={handleWishlistClick}
        />

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCartClick}
          className="absolute bottom-0 right-0 rounded-md bg-white! hover:text-p-600"
          aria-label="Add to cart"
          size="xs"
          variant="outline"
        >
          Add
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1 px-3 pt-1 pb-2">
        {/* Earn Points Chip */}
        <div>
          <AavakCoinsChip coins={100} />
        </div>

        {/* Brand Name */}
        {product.brandName && (
          <span className="text-n-900">{product.brandName}</span>
        )}

        {/* Product Name */}
        <p className="line-clamp-2 font-medium text-n-900">{product.name}</p>

        {/* Price Row */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-n-900">
            {" "}
            {formatCurrency(product.price)}{" "}
          </p>
          <p className="text-n-600 line-through"> {formatCurrency(1599)} </p>
        </div>
        <span className="font-medium text-success-600">20% off</span>

        {/* Delivery Date - Hardcoded for now */}
        <span className="text-n-700">Delivery by Mon, 10 Feb</span>
      </div>
    </div>
  );

  if (disableDetailPageRedirection) {
    return content();
  }

  return (
    <Link to="/product/$productId" params={{ productId: product?.id }}>
      {content()}
    </Link>
  );
}
