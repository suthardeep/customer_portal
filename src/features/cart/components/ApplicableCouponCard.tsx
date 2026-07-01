import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/base/icon/Icon";
import { Button } from "@/components/base/button/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import { useToggle } from "@/hooks/useToggle";
import type { CouponEvaluation } from "../types/coupon.types";

interface ApplicableCouponCardProps {
  coupon: CouponEvaluation;
  onApply: (code: string) => void;
}

export function ApplicableCouponCard({ coupon, onApply }: ApplicableCouponCardProps) {
  const expanded = useToggle();
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;

    const measure = () => {
      setIsClamped(element.scrollHeight > element.clientHeight + 1);
    };

    // Measure after paint so layout/fonts are settled (dialog mount/animation).
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [coupon.description]);

  return (
    <div className="rounded-xl border border-n-400 bg-n-50 p-3.5">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-p-50">
          <Icon name="Coupon" size="lg" className="text-p-500" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="font-mono text-sm font-semibold text-n-900 tracking-wide">
            {coupon.code}
          </span>
          <p
            ref={descriptionRef}
            className={`text-xs text-n-800 ${expanded.isOpen ? "" : "line-clamp-2"}`}
          >
            {coupon.description}
          </p>
          {(isClamped || expanded.isOpen) && (
            <button
              type="button"
              onClick={expanded.toggle}
              className="self-start text-xs font-medium text-p-500"
            >
              {expanded.isOpen ? "Read less" : "Read more"}
            </button>
          )}
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
