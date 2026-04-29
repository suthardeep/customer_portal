import { StarRatingDisplay } from "@/components/base/StarRatingDisplay";
import type { ProductVariant } from "../types";
import type { ProductDetail } from "../types/types";
import { PriceDisplay } from "./PriceDisplay";

interface ProductDetailHeaderProps {
  product: ProductDetail;
  selectedVariant?: ProductVariant;
}

export function ProductDetailHeader({
  product,
  selectedVariant,
}: ProductDetailHeaderProps) {
  const currentPrice = selectedVariant
    ? selectedVariant.sellingPrice
    : product.minPrice;

  const originalPrice = selectedVariant
    ? selectedVariant.mrp > selectedVariant.sellingPrice
      ? selectedVariant.mrp
      : undefined
    : product.maxPrice > product.minPrice
      ? product.maxPrice
      : undefined;

  const discount = selectedVariant?.discountPercent;
  const earnCoins = selectedVariant?.totalAavakCoinForUser ?? 0;

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <h5 className="font-semibold text-n-900">{product.name}</h5>

      {/* Rating and Reviews */}
      {product.avgRating !== undefined && (
        <StarRatingDisplay
          rating={product.avgRating}
          reviewCount={product.totalReviews}
          size="sm"
        />
      )}

      {/* Price */}
      <PriceDisplay
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        discount={discount}
        earnCoins={earnCoins}
      />

      {/* Stock availability */}
      {selectedVariant && (
        <div className="mb-2">
          {selectedVariant.quantity <= 0 ? (
            <p className="text-sm font-medium text-danger-600">Out of stock</p>
          ) : selectedVariant.quantity <= 5 ? (
            <p className="text-sm font-medium text-warning-600">
              Only {selectedVariant.quantity} left in stock
            </p>
          ) : (
            <p className="text-sm text-success-600">In stock</p>
          )}
        </div>
      )}
    </div>
  );
}
