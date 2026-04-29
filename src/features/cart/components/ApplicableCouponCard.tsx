import { Icon } from "@/components/base/icon/Icon";
import { Button } from "@/components/base/button/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import type { CouponEvaluation } from "../types/coupon.types";

interface ApplicableCouponCardProps {
  coupon: CouponEvaluation;
  onApply: (code: string) => void;
}

export function ApplicableCouponCard({ coupon, onApply }: ApplicableCouponCardProps) {
  return (
    <div className="rounded-xl border border-n-400 bg-n-50 p-3.5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-p-50">
          <Icon name="Coupon" size="lg" className="text-p-500" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="font-mono text-sm font-semibold text-n-900 tracking-wide">
            {coupon.code}
          </span>
          <p className="text-xs text-n-800 truncate">{coupon.description}</p>
          {coupon.savingsAmount && (
            <p className="text-xs font-medium text-success-600">
              Save {formatCurrency(coupon.savingsAmount)}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-1.5">
          <Button onClick={() => onApply(coupon.code)} size="sm" variant="ghost">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
