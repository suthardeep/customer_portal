import { CouponCardSkeleton } from "./CouponCardSkeleton";

export function CouponsListSkeleton() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-1">
        <div className="shimmer h-6 w-24 rounded" />
      </div>
      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <CouponCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
