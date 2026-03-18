import { Icon } from "@/components/base/icon";

interface AnalyticsProgressBarProps {
  label: string;
  current: number;
  required: number;
}

export function AnalyticsProgressBar({
  label,
  current,
  required,
}: AnalyticsProgressBarProps) {
  const percentage = Math.min((current / required) * 100, 100);

  return (
    <div className="flex items-center gap-4 py-3 px-5 rounded-xl bg-red-50/40">
      <div className="bg-p-50 rounded-full size-12 overflow-hidden fall">
        <Icon
          name="MegaPhone"
          aria-label="tier-megaphone"
          className="text-p-600"
          strokeWidth={2}
          size="xl"
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold uppercase tracking-wide text-n-800">
            {label}
          </span>
          <span className="text-xs font-medium text-n-900">
            {current} / {required}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-n-200">
          <div
            className="h-full rounded-full bg-p-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
