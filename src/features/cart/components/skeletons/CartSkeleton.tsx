function CartDeliveryBannerSkeleton() {
  return (
    <div className="flex items-start justify-between rounded-xl border border-n-400 bg-n-50 p-3">
      <div className="flex flex-col gap-1.5">
        <div className="shimmer h-4 w-48 rounded" />
        <div className="shimmer h-3 w-72 rounded" />
      </div>
      <div className="shimmer h-4 w-24 rounded" />
    </div>
  );
}

function CartSelectionHeaderSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-n-400 bg-n-50 px-4 py-3">
      <div className="shimmer size-4 rounded" />
      <div className="shimmer h-4 w-36 rounded" />
    </div>
  );
}

function CartItemCardSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="shimmer mt-1 size-4 shrink-0 rounded" />
      <div className="shimmer size-20 shrink-0 rounded-xl" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="shimmer h-4 w-3/4 rounded" />
          <div className="shimmer size-5 rounded" />
        </div>
        <div className="shimmer h-4 w-1/4 rounded" />
        <div className="shimmer h-5 w-20 rounded-full" />
        <div className="shimmer h-3 w-24 rounded" />
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <div className="shimmer size-7 rounded-lg" />
            <div className="shimmer h-4 w-8 rounded" />
            <div className="shimmer size-7 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartSummarySkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-n-400 bg-n-50">
      {/* Coupons section */}
      <div className="p-4">
        <div className="flex justify-between">
          <div className="shimmer h-5 w-32 rounded" />
          <div className="shimmer h-4 w-14 rounded" />
        </div>
        <div className="mt-3 shimmer h-10 w-full rounded-xl" />
      </div>

      <hr className="border-n-200" />

      {/* Price summary */}
      <div className="flex flex-col gap-3 p-4">
        <div className="shimmer h-5 w-28 rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <hr className="border-n-200" />
        <div className="shimmer h-5 w-full rounded" />
      </div>

      <hr className="border-n-200" />

      {/* GST row */}
      <div className="p-4">
        <div className="shimmer h-5 w-36 rounded" />
      </div>

      {/* Continue button */}
      <div className="p-4 pt-0">
        <div className="shimmer h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function CartSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:grid lg:grid-cols-[1fr_320px] lg:items-start">
      <div className="flex flex-col gap-3">
        <CartDeliveryBannerSkeleton />
        <CartSelectionHeaderSkeleton />
        {Array.from({ length: 3 }).map((_, i) => (
          <CartItemCardSkeleton key={i} />
        ))}
      </div>
      <CartSummarySkeleton />
    </div>
  );
}
