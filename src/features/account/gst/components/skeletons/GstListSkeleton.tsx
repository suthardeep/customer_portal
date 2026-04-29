const GstListItemSkeleton = () => (
  <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
    <div className="min-w-0 flex-1 space-y-2">
      <div className="shimmer h-4 w-36 rounded" />
      <div className="shimmer h-3 w-28 rounded" />
      <div className="shimmer h-3 w-full rounded" />
    </div>
    <div className="flex shrink-0 gap-1">
      <div className="shimmer size-8 rounded-lg" />
      <div className="shimmer size-8 rounded-lg" />
    </div>
  </div>
);

const GstListSkeleton = () => (
  <div className="flex flex-col gap-3 p-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <GstListItemSkeleton key={i} />
    ))}
  </div>
);

export default GstListSkeleton;
