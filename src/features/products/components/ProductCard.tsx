import { Chip } from "@/components/base/chip/Chip";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function ProductCard({
  product,
  isWishlisted = false,
  onWishlistToggle,
  onAddToCart,
  className,
}: ProductCardProps) {
  const imageUrl = product.mediaUrls?.[0];

  const handleWishlistClick = () => {
    onWishlistToggle?.(product.id);
  };

  const handleAddToCartClick = () => {
    onAddToCart?.(product.id);
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-n-300 bg-white",
        "transition-shadow hover:shadow-md",
        className,
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Image src={imageUrl ?? ""} alt={product.name} />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute right-2 top-2 flex size-8 items-center justify-center rounded-full",
            "bg-white/80 backdrop-blur-sm transition-colors hover:bg-white",
          )}
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={18}
            className={cn(
              "transition-colors",
              isWishlisted ? "fill-danger-500 text-danger-500" : "text-n-700",
            )}
          />
        </button>

        {/* Add to Cart Button */}
        <IconButton
          icon="Add"
          size="sm"
          variant="filled"
          color="primary"
          aria-label="Add to cart"
          onClick={handleAddToCartClick}
          className="absolute bottom-2 right-2"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1 px-3 pt-1 pb-2">
        {/* Earn Points Chip */}
        <div>
          <Chip
            color="secondary"
            size="sm"
            className="inline-flex items-center gap-1.5"
          >
            <Image
              src="/aavak-coin-v1.png"
              alt="product-aavak-coin"
              eager
              className="size-4 object-contain"
            />
            <span className="text-nowrap text-p-900">Earn 100</span>
          </Chip>
        </div>

        {/* Brand Name */}
        {product.brandName && (
          <span className="text-n-700">{product.brandName}</span>
        )}

        {/* Product Name */}
        <p className="line-clamp-2 font-medium text-n-900">{product.name}</p>

        {/* Price Row */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-n-900">
            {" "}
            {formatCurrency(product.minPrice)}{" "}
          </p>
          <p className="text-n-600 line-through"> {formatCurrency(1599)} </p>
        </div>
        <span className="font-medium text-success-600">20% off</span>

        {/* Delivery Date - Hardcoded for now */}
        <span className="text-n-700">Delivery by Mon, 10 Feb</span>
      </div>
    </div>
  );
}
