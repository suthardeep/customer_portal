import { CategoryCardSkeleton } from "./CategoryCardSkeleton";
import { ProductCardSkeleton } from "@/features/products/components/ProductCardSkeleton";

export function CategoryDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Subcategory cards skeleton */}
      <div className="mb-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {Array.from({ length: 6 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>

      {/* Product sections skeleton - 3 sections */}
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          {/* Section header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="shimmer h-5 w-32" />
            <div className="shimmer h-4 w-16" />
          </div>
          {/* Products row */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-48 shrink-0">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
