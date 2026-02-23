import type { IconName } from "@/components/base/icon/iconRegistry";

export interface SidebarNavItem {
  label: string;
  icon: IconName;
  to: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarNavItem[];
}

export interface QuickActionCard {
  label: string;
  icon: IconName;
  to: string;
}
