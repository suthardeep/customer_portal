import { Icon } from "@/components/base/icon/Icon";
import type { LockedCoupon } from "../types/coupon.types";

interface LockedCouponCardProps {
  coupon: LockedCoupon;
}

export function LockedCouponCard({ coupon }: LockedCouponCardProps) {
  return (
    <div className="rounded-xl border border-n-300 bg-n-100 p-3.5 opacity-60">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-n-200">
          <Icon name="Lock" size="lg" className="text-n-500" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="font-mono text-sm font-semibold text-n-700 tracking-wide">
            {coupon.code}
          </span>
          <p className="text-xs text-n-600">{coupon.description}</p>
          <p className="text-xs italic text-n-500">{coupon.unlockHint}</p>
        </div>
      </div>
    </div>
  );
}
