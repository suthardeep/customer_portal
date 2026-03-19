import { cn } from "@/utils/cssHelpers";
import { Icon } from "@/components/base/icon/Icon";
import type { CustomToastProps, ToastType } from "./toast.types";

// Static data outside component
const bgColorMap: Record<ToastType, string> = {
  success: "bg-success-50",
  error: "bg-danger-50",
  warning: "bg-orange-50",
  info: "bg-p-50",
  default: "bg-n-50",
};

const textColorMap: Record<ToastType, string> = {
  success: "text-success-800",
  error: "text-danger-800",
  warning: "text-orange-600",
  info: "text-p-600",
  default: "text-n-600",
};

const borderColorMap: Record<ToastType, string> = {
  success: "border-success-400",
  error: "border-danger-200",
  warning: "border-orange-200",
  info: "border-p-200",
  default: "border-n-300",
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
        "w-full max-w-lg min-w-87.5 rounded-lg border px-3 py-2 shadow-lg md:rounded-xl md:p-3",
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
          {description && <p className="text-xs text-n-600">{description}</p>}
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
