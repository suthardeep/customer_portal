function CheckoutAddressSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="shimmer size-10 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="shimmer h-4 w-24 rounded" />
        <div className="shimmer h-3 w-48 rounded" />
      </div>
      <div className="shimmer h-8 w-16 rounded-lg" />
    </div>
  );
}

function CheckoutPaymentSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="shimmer h-5 w-36 rounded" />
      <div className="shimmer h-16 w-full rounded-xl" />
      <div className="shimmer h-16 w-full rounded-xl" />
    </div>
  );
}

function CheckoutItemCardSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="shimmer size-20 shrink-0 rounded-xl" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-4 w-1/4 rounded" />
        <div className="shimmer h-3 w-16 rounded" />
      </div>
    </div>
  );
}

function CheckoutSummarySkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-n-400 bg-n-50">
      <div className="flex flex-col gap-3 p-4">
        <div className="shimmer h-5 w-28 rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <hr className="border-n-200" />
        <div className="shimmer h-5 w-full rounded" />
      </div>
      <hr className="border-n-200" />
      <div className="p-4">
        <div className="shimmer h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function CheckoutSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:grid lg:grid-cols-[1fr_400px] lg:items-start">
      <div className="flex flex-col gap-4">
        <CheckoutAddressSkeleton />
        <CheckoutPaymentSkeleton />
        <div className="flex flex-col gap-3">
          <div className="shimmer h-5 w-32 rounded" />
          {Array.from({ length: 2 }).map((_, i) => (
            <CheckoutItemCardSkeleton key={i} />
          ))}
        </div>
      </div>
      <CheckoutSummarySkeleton />
    </div>
  );
}
