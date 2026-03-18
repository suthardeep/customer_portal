import type { IconName } from "@/components/base/icon/iconRegistry";
import type { LinkProps } from "@tanstack/react-router";

type RouteTo = LinkProps["to"];

export interface SpotlightSidebarNavItem {
  label: string;
  icon: IconName;
  to: RouteTo;
}

export interface SpotlightSidebarSection {
  title: string;
  items: SpotlightSidebarNavItem[];
}
