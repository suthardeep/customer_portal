export function MyOrdersCardSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="shimmer size-16 shrink-0 rounded-lg" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="shimmer h-4 w-2/3 rounded" />
        <div className="shimmer h-5 w-20 rounded-full" />
        <div className="shimmer h-3 w-1/2 rounded" />
        <div className="shimmer h-3 w-1/3 rounded" />
      </div>
      <div className="shimmer size-5 shrink-0 rounded" />
    </div>
  );
}
