const AddressListItemSkeleton = () => (
  <div className="flex items-center gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
    <div className="shimmer size-10 shrink-0 rounded-full" />
    <div className="min-w-0 flex-1 space-y-2">
      <div className="shimmer h-4 w-16 rounded" />
      <div className="shimmer h-3 w-full rounded" />
      <div className="shimmer h-3 w-3/4 rounded" />
    </div>
    <div className="shimmer size-8 shrink-0 rounded-lg" />
  </div>
);

const AddressListSkeleton = () => (
  <div>
    <div className="flex items-center gap-1 mb-4">
      <div className="shimmer h-6 w-28 rounded" />
    </div>
    <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <AddressListItemSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default AddressListSkeleton;
