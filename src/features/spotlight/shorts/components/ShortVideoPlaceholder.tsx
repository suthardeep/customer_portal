import { Icon } from "@/components/base/icon";
import { MediaStatus } from "@/features/spotlight/types/enums";

interface ShortVideoPlaceholderProps {
  status: MediaStatus;
  thumbnail?: string;
}

const PLACEHOLDER_CONFIG: Record<
  Exclude<MediaStatus, MediaStatus.READY>,
  { icon: "Clock" | "AlertCircle"; label: string; iconClass: string }
> = {
  [MediaStatus.PROCESSING]: {
    icon: "Clock",
    label: "Processing video…",
    iconClass: "text-orange-400",
  },
  [MediaStatus.FAILED]: {
    icon: "AlertCircle",
    label: "Processing failed",
    iconClass: "text-danger-500",
  },
};

export function ShortVideoPlaceholder({
  status,
  thumbnail,
}: ShortVideoPlaceholderProps) {
  const config = PLACEHOLDER_CONFIG[status as Exclude<MediaStatus, MediaStatus.READY>];

  return (
    <div className="relative size-full rounded-xl overflow-hidden bg-n-200">
      {thumbnail && (
        <img
          src={thumbnail}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-30 blur-sm"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex size-14 items-center justify-center rounded-full bg-n-950/60 backdrop-blur-sm">
          <Icon name={config.icon} size="lg" className={config.iconClass} />
        </div>
        <span className="text-n-50 font-medium drop-shadow">{config.label}</span>
      </div>
    </div>
  );
}
