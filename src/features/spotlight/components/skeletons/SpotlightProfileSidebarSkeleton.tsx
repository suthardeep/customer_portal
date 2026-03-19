export function SpotlightProfileSidebarSkeleton() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="shimmer size-16 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="shimmer h-4 w-28 rounded" />
          <div className="shimmer h-3 w-36 rounded" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <div className="shimmer flex-1 h-9 rounded-full" />
        <div className="shimmer flex-1 h-9 rounded-full" />
      </div>

      {/* Current Status */}
      <div className="flex items-center justify-between rounded-xl border border-n-400 px-4 py-2">
        <div className="space-y-1.5">
          <div className="shimmer h-2.5 w-20 rounded" />
          <div className="shimmer h-4 w-16 rounded" />
        </div>
        <div className="shimmer size-14 rounded-full" />
      </div>

      {/* Nav sections */}
      <div className="space-y-5">
        {/* Section 1 — no title, 3 items */}
        <div className="space-y-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="shimmer size-5 rounded" />
              <div className="shimmer h-3.5 w-24 rounded" />
            </div>
          ))}
        </div>

        {/* Section 2 — "Profile" title + 3 items */}
        <div>
          <div className="shimmer mb-3 h-3 w-14 rounded px-3" />
          <div className="space-y-0.5 mt-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2">
                <div className="shimmer size-5 rounded" />
                <div className="shimmer h-3.5 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
