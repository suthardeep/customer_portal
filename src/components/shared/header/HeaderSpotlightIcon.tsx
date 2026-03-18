import { Icon } from "@/components/base/icon/Icon";
import { cn } from "@/utils/cssHelpers";
import { Link } from "@tanstack/react-router";

type Props = {
  className?: string;
  isMobile?: boolean;
};

export function HeaderSpotlightIcon({ className, isMobile }: Props) {
  return (
    <Link
      to="/spotlight/buy-clips"
      className={cn(
        "flex flex-col items-center text-n-900 relative",
        isMobile ? "gap-0.5" : "gap-2",
        className,
      )}
      activeProps={{
        className: "flex flex-col items-center gap-0.5 text-p-600",
      }}
      activeOptions={{ exact: true }}
    >
      <Icon
        name="VideoCameraSpark"
        size="lg"
        className={cn("text-inherit!", iconClassName)}
      />
      <p className="text-[13px] text-inherit font-medium">Spotlight</p>
    </Link>
  );
}

const iconClassName = "text-n-900 group-hover:text-n-950";
