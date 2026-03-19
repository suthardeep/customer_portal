export function MyPostDetailSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-1 mb-4">
        <div className="shimmer size-8 rounded-lg" />
        <div className="shimmer h-5 w-24 rounded mr-auto" />
        <div className="shimmer h-7 w-12 rounded-lg" />
      </div>

      <div className="flex gap-6 items-start">
        {/* Left — media */}
        <div className="shimmer aspect-9/16 max-h-[70vh] min-w-[calc(70vh*9/16)] rounded-xl" />

        {/* Right — details */}
        <div className="flex flex-col gap-6 w-full">
          {/* Status + date */}
          <div className="flex items-center justify-between gap-4">
            <div className="shimmer h-6 w-20 rounded-full" />
            <div className="shimmer h-4 w-32 rounded" />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-3 w-fit">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 aspect-square rounded-2xl items-center border border-n-400 bg-n-50 p-4"
              >
                <div className="shimmer size-9 rounded-xl" />
                <div className="shimmer h-6 w-10 rounded" />
                <div className="shimmer h-3.5 w-14 rounded" />
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="flex flex-col gap-2">
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-4 w-3/4 rounded" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="shimmer h-7 w-16 rounded-full" />
            ))}
          </div>

          {/* Tagged products */}
          <div className="flex flex-col gap-3">
            <div className="shimmer h-5 w-36 rounded" />
            <div className="flex flex-col gap-2">
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="shimmer h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
