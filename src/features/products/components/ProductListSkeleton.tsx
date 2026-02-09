import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title skeleton */}
      <div className="shimmer mb-6 h-8 w-48" />

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
