import { SidebarNavItem } from "./SidebarNavItem";
import type { SidebarSection as SidebarSectionType } from "../types/types";

interface SidebarSectionProps {
  section: SidebarSectionType;
}

export function SidebarSection({ section }: SidebarSectionProps) {
  return (
    <div>
      <span className="mb-2 px-3 font-semibold uppercase text-n-800">
        {section.title}
      </span>
      <div className="space-y-0.5 mt-1">
        {section.items.map((item) => (
          <SidebarNavItem key={item.to} item={item} />
        ))}
      </div>
    </div>
  );
}
