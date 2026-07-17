import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Chip } from "@/components/base/chip/Chip";
import { Image } from "@/components/base/Image";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { WishlistButton } from "@/features/wishlist/components/WishlistButton";
import { useWishlistSheetStore } from "@/features/wishlist/stores/wishlistSheetStore";
import { useAddItemToCollectionMutation } from "@/features/wishlist/wishlistMutations";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Product } from "../types";
import { ProductCardAddToCart } from "./ProductCardAddToCart";

type PreloadMode = "intent" | "render" | "viewport" | false;

interface ProductCardProps {
  product: Product;
  className?: string;
  disableDetailPageRedirection?: boolean;
  preload?: PreloadMode;
}

export function ProductCard({
  product,
  className,
  disableDetailPageRedirection = false,
  preload = "intent",
}: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();

  const imageUrl = product?.mediaUrls?.[0];

  const wishlistItems = useQuery({
    ...wishlistQueries.collectionsProducts("ALL", { pageSize: 100 }),
    enabled: isAuthenticated,
  });

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

        {/* AD Chip */}
        {product.isAd && (
          <div className="absolute top-2 left-2">
            <Chip size="xs" color="neutral">
              AD
            </Chip>
          </div>
        )}

        {/* Wishlist Button */}
        <WishlistButton
          isWishlisted={!!isWishlisted}
          onClick={handleWishlistClick}
        />

        {/* Add to Cart Button */}
        <div
          className="absolute bottom-0 right-0"
          onClick={(e) => e.preventDefault()}
        >
          <ProductCardAddToCart
            productId={product.id}
            variantId={product.variantId}
            hasVariants={product.hasVariants}
            outOfStock={!product.inStock}
            minOrderQuantity={product.minOrderQuantity}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1 px-3 pt-1 pb-2">
        {/* Earn Points Chip */}
        <div>
          <AavakCoinsChip coins={product.totalAavakCoinForUser} />
        </div>

        {/* Brand Name */}
        {product.brandName && (
          <span className="text-n-900">{product.brandName}</span>
        )}

        {/* Product Name */}
        <p className="line-clamp-2 font-medium text-n-900">{product.name}</p>

        {/* Price Row */}
        <div className="flex flex-wrap items-center gap-2">
          <h6 className="font-bold text-n-900">
            {formatCurrency(product.price)}
          </h6>
          <p className="text-n-700 line-through">
            {" "}
            {formatCurrency(product.mrp)}{" "}
          </p>
        </div>
        {product.discountPercent > 0 ? (
          <span className="font-medium text-success-600">
            {product.discountPercent}% off
          </span>
        ) : product.discount > 0 ? (
          <span className="font-medium text-success-600">
            {formatCurrency(product.discount)} off
          </span>
        ) : null}

        {/* Delivery Date - Hardcoded for now */}
        {/* <span className="text-n-700">Delivery by Mon, 10 Feb</span> */}
      </div>
    </div>
  );

  if (disableDetailPageRedirection) {
    return content();
  }

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product?.id }}
      search={{
        variantId: product?.variantId ?? undefined,
        isAd: product.isAd || undefined,
      }}
      preload={preload}
    >
      {content()}
    </Link>
  );
}
