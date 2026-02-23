import { CollectionCardSkeleton } from "./CollectionCardSkeleton";

export function CollectionListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="shimmer h-8 w-48 rounded" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CollectionCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
