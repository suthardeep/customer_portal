const AddressSelectCardSkeleton = () => (
  <div className="flex items-center gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
    <div className="shimmer size-10 shrink-0 rounded-full" />
    <div className="min-w-0 flex-1 space-y-2">
      <div className="shimmer h-4 w-16 rounded" />
      <div className="shimmer h-3 w-full rounded" />
      <div className="shimmer h-3 w-3/4 rounded" />
    </div>
    <div className="shimmer size-4 shrink-0 rounded-full" />
  </div>
);

const AddressSelectListSkeleton = () => (
  <div className="flex flex-col gap-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <AddressSelectCardSkeleton key={i} />
    ))}
  </div>
);

export default AddressSelectListSkeleton;
