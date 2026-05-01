function SupportTicketCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="shimmer h-4 w-2/3 rounded" />
        <div className="shimmer h-5 w-16 rounded-full shrink-0" />
      </div>
      <div className="flex items-center gap-2">
        <div className="shimmer h-5 w-16 rounded-full" />
        <div className="shimmer h-3 w-24 rounded" />
      </div>
      <div className="shimmer h-3 w-full rounded" />
      <div className="shimmer h-3 w-4/5 rounded" />
    </div>
  );
}

export function SupportTicketListSkeleton() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="shimmer h-6 w-36 rounded" />
        <div className="shimmer h-9 w-32 rounded-lg" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SupportTicketCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
