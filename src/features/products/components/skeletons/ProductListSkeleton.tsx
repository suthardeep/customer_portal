import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductListSkeleton() {
  return (
    <div className="container mx-auto p-4 pt-6 pb-28 lg:pb-6">
      <div className="flex gap-6 items-start">
        <aside className="hidden lg:block w-52 shrink-0 space-y-4">
          <div className="shimmer h-5 w-24 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="shimmer h-4 w-20 rounded" />
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="shimmer h-4 w-full rounded" />
              ))}
            </div>
          ))}
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-4">
            <div className="shimmer h-4 w-48 rounded" />
            <div className="shimmer h-8 w-20 rounded lg:hidden" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
