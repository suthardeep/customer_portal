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
}

const MenuItem = ({
  children,
  onClick,
  startIcon,
  endIcon,
  variant = "default",
}: MenuItemProps) => {
  const isDanger = variant === "danger";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-n-300 cursor-pointer",
      )}
    >
      {startIcon && (
        <Icon
          name={startIcon}
          size="sm"
          className={isDanger ? "text-danger-600" : "text-n-700"}
        />
      )}
      {children}
      {endIcon && (
        <Icon
          name={endIcon}
          size="sm"
          className={cn("ml-auto", isDanger ? "text-danger-600" : "text-n-700")}
        />
      )}
    </button>
  );
};

export default MenuItem;
