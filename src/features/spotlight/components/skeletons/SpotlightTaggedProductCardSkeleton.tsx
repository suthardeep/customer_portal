export function SpotlightTaggedProductCardSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-lg border border-n-300 bg-white">
      <div className="shimmer aspect-square w-24 shrink-0" />
      <div className="flex flex-1 flex-col gap-1 p-2">
        <div className="shimmer h-4 w-full" />
        <div className="flex items-center justify-between">
          <div className="shimmer h-3 w-16" />
          <div className="flex gap-1.5">
            <div className="shimmer h-4 w-14" />
            <div className="shimmer h-4 w-10" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="shimmer h-5 w-16 rounded-full" />
          <div className="shimmer h-6 w-10 rounded-md" />
        </div>
      </div>
    </div>
  );
}
