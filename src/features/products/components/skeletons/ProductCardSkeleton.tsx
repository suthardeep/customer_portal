export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-n-300 bg-white">
      <div className="shimmer aspect-square w-full" />
      <div className="flex flex-col gap-2 px-3 pt-1 pb-2">
        <div className="shimmer h-4 w-16 rounded" />
        <div className="shimmer h-3 w-24 rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="flex gap-2">
          <div className="shimmer h-4 w-16 rounded" />
          <div className="shimmer h-4 w-12 rounded" />
        </div>
        <div className="shimmer h-3 w-20 rounded" />
        <div className="shimmer h-3 w-28 rounded" />
      </div>
    </div>
  );
}
