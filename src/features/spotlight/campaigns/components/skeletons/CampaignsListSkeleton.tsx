function CampaignCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-n-100 overflow-hidden shadow-sm">
      <div className="shimmer h-52 w-full" />
      <div className="px-4 py-2 space-y-2">
        <div className="shimmer h-5 w-3/4 rounded" />
        <div className="flex gap-2">
          <div className="shimmer h-5 w-20 rounded-full" />
          <div className="shimmer h-5 w-20 rounded-full" />
        </div>
        <div className="rounded-xl bg-red-50/50 border border-red-100 px-4 py-3 space-y-4">
          <div className="shimmer h-4 w-40 rounded" />
          <div className="grid grid-cols-3 gap-2">
            <div className="shimmer h-8 rounded" />
            <div className="shimmer h-8 rounded" />
            <div className="shimmer h-8 rounded" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="shimmer h-4 w-28 rounded" />
          <div className="shimmer h-4 w-14 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CampaignsListSkeleton() {
  return (
    <div>
      <div className="shimmer h-7 w-32 rounded" />
      <div className="mt-3 flex items-center w-full gap-2">
        <div className="shimmer h-4 w-24 rounded" />
        <div className="shimmer h-4 w-24 rounded" />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <CampaignCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
