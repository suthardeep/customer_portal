import type { IconName } from "@/components/base/icon/iconRegistry";
import type { LinkProps } from "@tanstack/react-router";

type RouteTo = LinkProps["to"];

export interface SidebarNavItem {
  label: string;
  icon: IconName;
  to: RouteTo;
}

export interface SidebarSection {
  title: string;
  items: SidebarNavItem[];
}

export interface QuickActionCard {
  label: string;
  icon: IconName;
  to: RouteTo;
}
