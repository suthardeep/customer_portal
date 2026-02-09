import { cn } from "@/utils/cssHelpers";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  iconRegistry,
  type IconName,
} from "@/components/base/icon/iconRegistry";
import type { ReactNode } from "react";

export interface FallbackViewProps {
  title: string;
  icon?: IconName;
  footer?: ReactNode;
  classname?: string;
  version?: "default" | "compact";
}

const FallbackView: React.FC<FallbackViewProps> = (props) => {
  const { title, footer, icon, classname, version = "default" } = props;

  const iconData = icon ? iconRegistry[icon] : null;

  const isCompact = version === "compact";

  return (
    <div
      className={cn(
        "bg-gray-50 flex w-full rounded-xl",
        isCompact
          ? "flex-row items-center gap-3 p-3"
          : "flex items-center justify-center flex-col gap-4 p-8",
        classname,
      )}
    >
      {iconData && (
        <HugeiconsIcon
          icon={iconData}
          size={isCompact ? 20 : 48}
          strokeWidth={1.5}
          className="text-n-800"
        />
      )}
      <p className={cn(!isCompact && "text-center text-n-800 font-medium")}>
        {title || "No data found"}
      </p>
      {footer && footer}
    </div>
  );
};

export default FallbackView;
