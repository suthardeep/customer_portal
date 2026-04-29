import { Icon } from "@/components/base/icon/Icon";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Coupon } from "../types/types";
import { useState } from "react";
import { cn } from "@/utils/cssHelpers";

interface CouponCardProps {
  coupon: Coupon;
}

function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const discountLabel =
    coupon.discountType === "PERCENTAGE"
      ? `${coupon.discountValue}% off`
      : `${formatCurrency(coupon.discountValue)} off`;

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-p-600">
              {discountLabel}
            </span>
            {coupon.minOrderValue > 0 && (
              <span className="text-xs text-n-500">
                · Min order {formatCurrency(coupon.minOrderValue)}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="coupon-code-button"
          className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[10px] transition-colors duration-150 ease-out hover:bg-n-300 active:bg-n-200"
        >
          <div className="h-4 overflow-hidden">
            <div
              className={cn(
                "transition-transform duration-500 ease-spring",
                copied ? "-translate-y-1/2" : "translate-y-0",
              )}
            >
              <div className="flex h-4 items-center justify-center">
                <Icon name="Copy" size="md" className="text-n-800" />
              </div>
              <div className="flex h-4 items-center justify-center">
                <Icon name="Check" size="md" className="text-p-500" />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default CouponCard;
