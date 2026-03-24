function CampaignProductsSkeleton() {
  return (
    <div className="mt-2">
      <div className="shimmer h-5 w-40 rounded mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-n-400 bg-white p-2"
          >
            <div className="shimmer size-16 shrink-0 rounded-md" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="shimmer h-4 w-3/4 rounded" />
              <div className="shimmer h-3 w-1/2 rounded" />
              <div className="shimmer h-4 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampaignProductsSkeleton;
