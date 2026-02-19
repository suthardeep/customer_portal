import { cn } from "@/utils/cssHelpers";
import { Icon, type IconName } from "@/components/base/icon";
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
      {icon && (
        <Icon
          name={icon}
          size="lg"
          className={cn("text-n-800", !isCompact && "size-12")}
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
