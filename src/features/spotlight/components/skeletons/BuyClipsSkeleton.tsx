import { SpotlightPostCardSkeleton } from "./SpotlightPostCardSkeleton";

export function BuyClipsSkeleton() {
  return (
    <div className="p-4">
      <div className="shimmer h-7 w-32 rounded" />
      <div className="mt-3 flex items-center w-full gap-2">
        <div className="shimmer h-4 w-24 rounded" />
        <div className="shimmer h-4 w-24 rounded" />
      </div>
      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="break-inside-avoid mb-4">
            <SpotlightPostCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
