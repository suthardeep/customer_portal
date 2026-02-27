import { prettyDate } from "@/utils/formatDateTime";
import { useToggle } from "@/hooks/useToggle";
import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import type { DeliveryInfo as DeliveryInfoType } from "../types/types";
import { Button } from "@/components/base/button/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface DeliveryInfoProps {
  delivery?: DeliveryInfoType;
}

export function DeliveryInfo({ delivery }: DeliveryInfoProps) {
  const sheet = useToggle();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="shimmer rounded-xl w-full h-20.5" />;
  }

  if (!delivery || !isAuthenticated) return null;

  const deliveryDateFormatted = prettyDate(delivery.estimatedDate, {
    showDate: true,
    showDay: true,
    disableRelativeDates: true,
  });

  return (
    <>
      <div className="rounded-xl border border-(--s-200) bg-s-50 p-3">
        {/* Delivery Date */}
        <p className="font-semibold text-n-950">
          Delivery by {deliveryDateFormatted}
        </p>

        {/* Location + Change */}
        <div className="flex items-center justify-between pt-1 font-medium">
          <p className="text-n-850">
            to {delivery.location.pinCode}, {delivery.location.city}
          </p>
          <Button
            variant="ghost"
            color="secondary"
            className="font-semibold text-s-700 hover:text-s-800 transition-colors text-sm"
            onClick={sheet.open}
          >
            Change
          </Button>
        </div>
      </div>

      <AddressSelectorSheet
        isOpen={sheet.isOpen}
        onClose={sheet.close}
        selectedAddressId={null}
        onSelect={sheet.close}
      />
    </>
  );
}
