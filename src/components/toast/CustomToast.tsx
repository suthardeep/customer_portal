import { cn } from "@/utils/cssHelpers";
import { Icon } from "@/components/base/icon/Icon";
import type { CustomToastProps, ToastType } from "./toast.types";

// Static data outside component
const bgColorMap: Record<ToastType, string> = {
  success: "bg-success-50 dark:bg-success-950",
  error: "bg-danger-50 dark:bg-danger-950",
  warning: "bg-orange-50 dark:bg-orange-950",
  info: "bg-p-50 dark:bg-p-950",
  default: "bg-n-50 dark:bg-n-800",
};

const textColorMap: Record<ToastType, string> = {
  success: "text-success-800 dark:text-success-500",
  error: "text-danger-800 dark:text-danger-300",
  warning: "text-orange-600 dark:text-orange-300",
  info: "text-p-600 dark:text-p-200",
  default: "text-n-600 dark:text-n-300",
};

const borderColorMap: Record<ToastType, string> = {
  success: "border-success-400 dark:border-success-800",
  error: "border-danger-200 dark:border-danger-900",
  warning: "border-orange-200 dark:border-orange-900",
  info: "border-p-200 dark:border-p-800",
  default: "border-n-300 dark:border-n-400/50",
};

const iconMap: Record<ToastType, React.ReactNode> = {
  success: (
    <Icon name="CheckCircle" size="lg" className={textColorMap.success} />
  ),
  error: <Icon name="AlertCircle" size="lg" className={textColorMap.error} />,
  warning: <Icon name="Warning" size="lg" className={textColorMap.warning} />,
  info: <Icon name="Info" size="lg" className={textColorMap.info} />,
  default: null,
};

export function CustomToast({
  type,
  message,
  description,
  onClose,
  allowDismiss = true,
  showIcons = false,
}: CustomToastProps) {
  return (
    <div
      className={cn(
        "w-full max-w-lg min-w-87.5 rounded-lg border px-3 py-2 shadow-2xs md:rounded-xl md:p-4 dark:shadow",
        bgColorMap[type],
        borderColorMap[type],
      )}
    >
      <div className="flex items-center gap-3">
        {showIcons && iconMap[type]}
        <div className="flex-1">
          <p className={cn("font-medium md:text-base", textColorMap[type])}>
            {message}
          </p>
          {description && (
            <p className="dark:text-n-200 text-xs text-n-600">{description}</p>
          )}
        </div>
        {allowDismiss && (
          <div
            className={cn(
              "cursor-pointer rounded-full p-1 transition-all hover:brightness-110",
              bgColorMap[type],
            )}
            onClick={onClose}
          >
            <Icon name="X" size="sm" className={cn(textColorMap[type])} />
          </div>
        )}
      </div>
    </div>
  );
}
