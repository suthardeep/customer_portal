import { SpotlightSidebarNavItem } from "./SpotlightSidebarNavItem";
import type { SpotlightSidebarSection as SpotlightSidebarSectionType } from "../types/types";

interface SpotlightSidebarSectionProps {
  section: SpotlightSidebarSectionType;
}

export function SpotlightSidebarSection({
  section,
}: SpotlightSidebarSectionProps) {
  return (
    <div>
      {section.title && (
        <span className="mb-2 px-3 font-semibold uppercase text-n-800">
          {section.title}
        </span>
      )}
      <div className="space-y-0.5 mt-1">
        {section.items.map((item) => (
          <SpotlightSidebarNavItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
