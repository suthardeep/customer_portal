export function MyOrdersDetailSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="shimmer h-6 w-36 rounded" />

      {/* Product block */}
      <div className="flex gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
        <div className="shimmer size-20 shrink-0 rounded-xl" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="shimmer h-4 w-3/4 rounded" />
          <div className="shimmer h-3 w-1/4 rounded" />
          <div className="shimmer h-5 w-20 rounded-full" />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4 rounded-xl border border-n-400 bg-n-50 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="shimmer size-5 shrink-0 rounded-full" />
            <div className="shimmer h-4 w-1/2 rounded" />
          </div>
        ))}
      </div>

      {/* Shipping section */}
      <div className="shimmer h-24 w-full rounded-xl" />

      {/* Payment section */}
      <div className="shimmer h-20 w-full rounded-xl" />
    </div>
  );
}
