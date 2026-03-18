import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/base/icon/Icon";
import type { SpotlightSidebarNavItem as SpotlightSidebarNavItemType } from "../types/types";

interface SpotlightSidebarNavItemProps {
  item: SpotlightSidebarNavItemType;
}

export function SpotlightSidebarNavItem({
  item,
}: SpotlightSidebarNavItemProps) {
  return (
    <Link
      to={item.to}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-n-300 text-n-900"
      activeProps={{
        className: "text-p-700 bg-p-50/50!",
      }}
    >
      <Icon name={item.icon} size="lg" className="text-current" />
      <p className="flex-1 font-semibold">{item.label}</p>
      <Icon name="ChevronRight" size="md" />
    </Link>
  );
}
