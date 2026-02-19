import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Icon } from "@/components/base/icon";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Product } from "../types";
import { Link } from "@tanstack/react-router";

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
  const imageUrl = product.mediaUrls?.[0];

  const isWishlisted = false;
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCartSuccess) {
      onAddToCartSuccess?.(product.id);
    }
  };

  const content = () => (
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
            "absolute right-2 top-2 flex size-8 items-center justify-center rounded-full group",
            "backdrop-blur-xl transition-colors bg-black/30 hover:bg-red-50",
          )}
        >
          <Icon
            name="Heart"
            size="md"
            strokeWidth={2.5}
            className={cn(
              "transition-all duration-200",
              isWishlisted
                ? "fill-danger-500 text-danger-500"
                : "text-white group-hover:text-danger-500 group-hover:scale-110",
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
          <AavakCoinsChip coins={100} />
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

  if (disableDetailPageRedirection) {
    return content();
  }

  return (
    <Link to="/product/product/$productId" params={{ productId: product?.id }}>
      {content()}
    </Link>
  );
}
