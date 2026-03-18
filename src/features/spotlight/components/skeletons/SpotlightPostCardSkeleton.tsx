export function SpotlightPostCardSkeleton() {
  return (
    <div>
      <div className="shimmer aspect-9/16 w-full rounded-xl" />
      <div className="mt-2 flex items-center gap-2 px-2">
        <div className="shimmer size-6 rounded-full" />
        <div className="shimmer h-3 w-16 rounded" />
        <div className="shimmer ml-auto size-4 rounded" />
        <div className="shimmer h-3 w-6 rounded" />
      </div>
    </div>
  );
}
