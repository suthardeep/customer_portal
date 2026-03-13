import type { HorizontalListDisplaySettings } from "../../types/types";

interface HorizontalListLayoutProps {
  children: React.ReactNode;
  displaySettings: HorizontalListDisplaySettings;
}

export function HorizontalListLayout({
  children,
  displaySettings,
}: HorizontalListLayoutProps) {
  const gap = displaySettings.spacing ?? 16;

  return (
    <div
      className="flex overflow-x-auto no-scrollbar"
      style={{ gap: `${gap}px` }}
    >
      {children}
    </div>
  );
}
