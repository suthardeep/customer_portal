export function ProductReviewsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: rating summary skeleton */}
      <div className="space-y-4">
        <div className="shimmer h-10 w-32 rounded-md" />
        <div className="shimmer h-4 w-28 rounded-md" />
        <div className="shimmer h-9 w-36 rounded-md" />
        <div className="space-y-3 mt-4">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <div className="shimmer h-4 w-4 rounded-sm" />
              <div className="shimmer h-3 w-8 rounded-md" />
              <div className="shimmer h-2 flex-1 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Right: review cards skeleton */}
      <div className="space-y-6">
        <div className="shimmer h-5 w-24 rounded-md" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="shimmer size-8 rounded-full" />
              <div className="shimmer h-4 w-24 rounded-md" />
            </div>
            <div className="shimmer h-3 w-20 rounded-md" />
            <div className="shimmer h-4 w-40 rounded-md" />
            <div className="shimmer h-3 w-full rounded-md" />
            <div className="shimmer h-3 w-3/4 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
