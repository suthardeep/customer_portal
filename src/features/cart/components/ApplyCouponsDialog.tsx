import Dialog from "@/components/base/Dialog";
import { useQuery } from "@tanstack/react-query";
import { cartQueries } from "../cartQueries";
import type { AvailableCouponsParams } from "../types/coupon.types";
import { ApplyCouponsDialogSkeleton } from "./skeletons/ApplyCouponsDialogSkeleton";
import { ApplicableCouponCard } from "./ApplicableCouponCard";
import { LockedCouponCard } from "./LockedCouponCard";

interface ApplyCouponsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  params: AvailableCouponsParams;
  onApply: (code: string) => void;
}

const ApplyCouponsDialog: React.FC<ApplyCouponsDialogProps> = (props) => {
  const { isOpen, onClose, params, onApply } = props;

  const { data, isLoading } = useQuery(cartQueries.availableCoupons(params));

  const hasApplicable = (data?.applicable.length ?? 0) > 0;
  const hasLocked = (data?.locked.length ?? 0) > 0;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Apply Coupon" size="sm">
      {isLoading ? (
        <ApplyCouponsDialogSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {hasApplicable && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-n-800">
                Available Coupons
              </p>
              {data!.applicable.map((coupon) => (
                <ApplicableCouponCard
                  key={coupon.id}
                  coupon={coupon}
                  onApply={onApply}
                />
              ))}
            </div>
          )}

          {hasApplicable && hasLocked && <hr className="border-n-200" />}

          {hasLocked && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-n-800">Locked Coupons</p>
              {data!.locked.map((coupon) => (
                <LockedCouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          )}

          {!hasApplicable && !hasLocked && (
            <p className="py-6 text-center text-sm text-n-500">
              No coupons available for your cart right now.
            </p>
          )}
        </div>
      )}
    </Dialog>
  );
};

export default ApplyCouponsDialog;
