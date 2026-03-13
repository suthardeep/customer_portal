import type { GridDisplaySettings } from "../../types/types";

interface GridLayoutProps {
  children: React.ReactNode;
  displaySettings: GridDisplaySettings;
}

const GRID_COLS_MAP: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

export function GridLayout({ children, displaySettings }: GridLayoutProps) {
  const cols = displaySettings.columnsMax ?? 4;
  const gap = displaySettings.gridSpacing ?? 16;
  const gridColsClass = GRID_COLS_MAP[cols] ?? "grid-cols-2 md:grid-cols-4";

  return (
    <div className={`grid ${gridColsClass}`} style={{ gap: `${gap}px` }}>
      {children}
    </div>
  );
}
