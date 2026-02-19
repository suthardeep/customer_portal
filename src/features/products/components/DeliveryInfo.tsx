import { prettyDate } from "@/utils/formatDateTime";
import type { DeliveryInfo as DeliveryInfoType } from "../types/types";

interface DeliveryInfoProps {
  delivery?: DeliveryInfoType;
}

export function DeliveryInfo({ delivery }: DeliveryInfoProps) {
  if (!delivery) return null;

  const deliveryDateFormatted = prettyDate(delivery.estimatedDate, {
    showDate: true,
    showDay: true,
    disableRelativeDates: true,
  });

  return (
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
        <button className="font-semibold text-s-700 hover:text-s-800 transition-colors text-sm">
          Change
        </button>
      </div>
    </div>
  );
}
