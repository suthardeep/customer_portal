import { cn } from "@/utils/cssHelpers";
import { Icon } from "@/components/base/icon/Icon";
import type { IconName } from "@/components/base/icon/iconRegistry";
import type { ReactNode } from "react";

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  startIcon?: IconName;
  endIcon?: IconName;
  variant?: "default" | "danger";
  className?: string;
}

const MenuItem = ({
  children,
  onClick,
  startIcon,
  endIcon,
  variant = "default",
  className = "",
}: MenuItemProps) => {
  const isDanger = variant === "danger";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-n-400 font-medium cursor-pointer",
        className,
      )}
    >
      {startIcon && (
        <Icon
          name={startIcon}
          size="sm"
          className={cn("text-current", isDanger && "text-danger-600")}
        />
      )}
      {children}
      {endIcon && (
        <Icon
          name={endIcon}
          size="sm"
          className={cn("ml-auto text-current", isDanger && "text-danger-600")}
        />
      )}
    </button>
  );
};

export default MenuItem;
