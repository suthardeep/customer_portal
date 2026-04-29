import { Icon } from "@/components/base/icon/Icon";
import { cn } from "@/utils/cssHelpers";
import { prettyDate } from "@/utils/formatDateTime";
import {
  ORDER_TRACKING_STEPS,
  TERMINAL_NON_DELIVERED_STATUSES,
} from "../constants";
import type { OrderLifecycleStatus, TrackingEvent } from "../types/types";
import { getOrderStatusLabel } from "../utils/orderStatusHelpers";

interface MyOrdersTrackingTimelineProps {
  currentStatus: OrderLifecycleStatus;
  trackingEvents: TrackingEvent[];
}

export function MyOrdersTrackingTimeline({
  currentStatus,
  trackingEvents,
}: MyOrdersTrackingTimelineProps) {
  const isTerminal = TERMINAL_NON_DELIVERED_STATUSES.includes(currentStatus);
  const showEventLog = isTerminal && trackingEvents.length > 0;

  if (showEventLog) {
    return <EventLogTimeline events={trackingEvents} />;
  }

  return <StepTimeline currentStatus={currentStatus} />;
}

function StepTimeline({
  currentStatus,
}: {
  currentStatus: OrderLifecycleStatus;
}) {
  const currentIndex = ORDER_TRACKING_STEPS.indexOf(currentStatus);

  return (
    <div>
      <div className="flex items-start">
        {ORDER_TRACKING_STEPS.map((step, index) => {
          const isCompleted = currentIndex >= index;
          const isLast = index === ORDER_TRACKING_STEPS.length - 1;

          return (
            <div key={step} className="flex flex-1 flex-col items-center">
              {/* Circle + connector row */}
              <div className="flex w-full items-center">
                {/* Left connector */}
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    index === 0
                      ? "invisible"
                      : isCompleted
                        ? "bg-success-500"
                        : "bg-n-500",
                  )}
                />

                {/* Circle */}
                {isCompleted ? (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-success-500">
                    <Icon
                      name="Check"
                      size="sm"
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="size-7 shrink-0 rounded-full border-2 border-n-500 bg-white" />
                )}

                {/* Right connector */}
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    isLast
                      ? "invisible"
                      : isCompleted && currentIndex > index
                        ? "bg-success-500"
                        : "bg-n-500",
                  )}
                />
              </div>

              {/* Label */}
              <p
                className={cn(
                  "mt-2 text-center text-xs",
                  isCompleted
                    ? "font-semibold text-n-900"
                    : "text-n-700 font-medium",
                )}
              >
                {getOrderStatusLabel(step)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventLogTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <div className="flex flex-col">
      {events.map((event, index) => (
        <div key={index} className="relative flex gap-3 pb-5 last:pb-0">
          {/* Connector line */}
          {index < events.length - 1 && (
            <div className="absolute left-1.75 top-4 w-0.5 bottom-0 bg-n-300" />
          )}

          {/* Bullet */}
          <div className="z-10 mt-1 size-3.5 shrink-0 rounded-full border-2 border-n-500 bg-white" />

          {/* Content */}
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">{event.status}</p>
            <p className="text-xs text-n-900">{event.description}</p>
            <p className="text-xs text-n-800">
              {prettyDate(event.timestamp, { showTime: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
