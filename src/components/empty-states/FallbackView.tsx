import { cn } from "@/utils/cssHelpers";
import { Icon, type IconName } from "@/components/base/icon";
import type { ReactNode } from "react";

export interface FallbackViewProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  footer?: ReactNode;
  classname?: string;
  version?: "default" | "compact";
  color?: FallbackViewColor;
}

const FallbackView: React.FC<FallbackViewProps> = (props) => {
  const {
    title,
    subtitle,
    footer,
    icon,
    classname,
    version = "default",
    color = "neutral",
  } = props;

  const isCompact = version === "compact";
  const styles = colorStyles[color];

  return (
    <div
      className={cn(
        "flex w-full rounded-xl",
        styles.bg,
        isCompact
          ? "flex-row items-center gap-3 p-3"
          : "flex items-center justify-center flex-col gap-4 p-8",
        classname,
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex size-24 items-center justify-center rounded-full",
            styles.iconBg,
          )}
        >
          <Icon
            name={icon}
            size="lg"
            className={cn(styles.icon, !isCompact && "size-10")}
            strokeWidth={2}
          />
        </div>
      )}
      <div className={cn(!isCompact && "text-center flex flex-col gap-1")}>
        <h6 className={cn(styles.text, !isCompact && "font-medium")}>
          {title || "No data found"}
        </h6>
        {subtitle && (
          <p className={cn(styles.text, "opacity-70 mt-1")}>{subtitle}</p>
        )}
        {footer && footer}
      </div>
    </div>
  );
};

export default FallbackView;

type FallbackViewColor = "neutral" | "danger";

const colorStyles: Record<
  FallbackViewColor,
  { bg: string; icon: string; text: string; iconBg: string }
> = {
  neutral: {
    bg: "bg-n-50",
    icon: "text-p-500",
    text: "text-n-900",
    iconBg: "bg-p-50",
  },
  danger: {
    bg: "bg-danger-50",
    icon: "text-danger-500",
    text: "text-danger-600",
    iconBg: "bg-danger-100/50",
  },
};
