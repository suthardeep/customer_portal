export function WithdrawalHistoryItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="shimmer h-4 w-2/3 rounded" />
        <div className="shimmer h-3 w-1/3 rounded" />
        <div className="shimmer h-3 w-1/4 rounded" />
      </div>
      <div className="shimmer h-5 w-16 rounded" />
      <div className="shimmer h-4 w-14 rounded" />
    </div>
  );
}
