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
          ? "flex-row items-center gap-3 p-4"
          : "flex flex-col items-center justify-center gap-4 p-8",
        classname,
      )}
    >
      {icon && (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full",
            isCompact ? "size-10" : "size-24",
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
      <div
        className={cn(
          "flex flex-col",
          isCompact ? "gap-0.5" : "gap-1 text-center",
        )}
      >
        <h6 className={cn(styles.text, !isCompact && "font-medium")}>
          {title || "No data found"}
        </h6>
        {subtitle && (
          <p className={cn(styles.text, "opacity-70")}>{subtitle}</p>
        )}
        {footer && <div className="mt-3">{footer}</div>}
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
