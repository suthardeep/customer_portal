function CouponCardSkeleton() {
  return (
    <div className="rounded-xl border border-n-300 bg-n-50 p-3.5">
      <div className="flex items-center gap-3">
        <div className="shimmer size-10 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="shimmer h-4 w-1/3 rounded" />
          <div className="shimmer h-3 w-2/3 rounded" />
        </div>
        <div className="shimmer h-7 w-16 rounded-lg" />
      </div>
    </div>
  );
}

export function ApplyCouponsDialogSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="shimmer h-4 w-28 rounded" />
      <div className="flex flex-col gap-2">
        <CouponCardSkeleton />
        <CouponCardSkeleton />
      </div>
      <hr className="border-n-200" />
      <div className="shimmer h-4 w-24 rounded" />
      <div className="flex flex-col gap-2">
        <CouponCardSkeleton />
        <CouponCardSkeleton />
      </div>
    </div>
  );
}
