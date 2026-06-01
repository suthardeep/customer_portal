import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function SimilarProductsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="shimmer h-5 w-36 rounded" />
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-44 shrink-0">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
