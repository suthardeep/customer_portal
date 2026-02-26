const SKELETON_COUNT = 5;

function ProductCardSkeleton() {
  return (
    <div className="flex w-44 shrink-0 flex-col overflow-hidden rounded-lg border border-n-300 bg-white">
      <div className="shimmer aspect-square w-full" />
      <div className="flex flex-col gap-2 px-3 pt-1 pb-2">
        <div className="shimmer h-4 w-16 rounded" />
        <div className="shimmer h-3 w-20 rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-4 w-24 rounded" />
      </div>
    </div>
  );
}

export function RecentlyViewedSkeleton() {
  return (
    <section className="flex flex-col gap-3">
      <div className="shimmer h-5 w-36 rounded" />
      <div className="flex gap-3 overflow-x-hidden pb-2">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
