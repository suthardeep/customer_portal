import Dialog from "@/components/base/Dialog";
import { Icon } from "@/components/base/icon/Icon";
import { prettyDate } from "@/utils/formatDateTime";
import type { TrackingEvent } from "../types/types";
import { OrderLifecycleStatus } from "../types/types";
import { cn } from "@/utils/cssHelpers";

interface MyOrdersTrackingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trackingEvents: TrackingEvent[];
  currentStatus: OrderLifecycleStatus;
}

export function MyOrdersTrackingDialog({
  isOpen,
  onClose,
  trackingEvents,
  currentStatus,
}: MyOrdersTrackingDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Order Updates"
      subTitle={`${trackingEvents.length} update${trackingEvents.length !== 1 ? "s" : ""}`}
      size="sm"
    >
      {trackingEvents.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <Icon name="Package" size="lg" className="text-n-500" />
          <p className="text-sm text-n-600">No updates yet</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {trackingEvents.map((event, index) => {
            const isCurrent = event.status === currentStatus;
            const isLast = index === trackingEvents.length - 1;

            return (
              <div key={index} className="relative flex gap-3 pb-5 last:pb-0">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-1.75 top-4 bottom-0 w-0.5 bg-n-300" />
                )}

                {/* Bullet */}
                <div
                  className={
                    isCurrent
                      ? "z-10 mt-1 size-3.5 shrink-0 rounded-full bg-p-500"
                      : "z-10 mt-1 size-3.5 shrink-0 rounded-full border-2 border-n-400 bg-n-50"
                  }
                />

                {/* Content */}
                <div className="flex flex-col gap-0.5">
                  <p
                    className={cn(
                      isCurrent
                        ? "font-semibold text-n-900"
                        : "text-sm font-medium text-n-800",
                    )}
                  >
                    {event.status}
                  </p>
                  {event.description && (
                    <p className="text-xs text-n-800">{event.description}</p>
                  )}
                  <p className="text-xs text-n-800">
                    {prettyDate(event.timestamp, { showTime: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Dialog>
  );
}
