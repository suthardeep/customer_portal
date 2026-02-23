export function CollectionCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white">
      {/* Image Section */}
      <div className="aspect-square bg-gray-100">
        <div className="shimmer h-full w-full" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 p-3">
        <div className="shimmer h-5 w-3/4 rounded" />
        <div className="shimmer h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}
