import { SpotlightPostCardSkeleton } from "@/features/spotlight/components/skeletons/SpotlightPostCardSkeleton";
import { cn } from "@/utils/cssHelpers";
import { Children } from "react";
import type { ReactNode } from "react";

interface SpotlightPostGridProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  skeletonCount?: number;
}

const COLUMN_CONFIGS = [
  "grid-cols-2",
  "sm:grid-cols-3",
  "lg:grid-cols-4",
  "xl:grid-cols-5",
];

function getColumnCount(): number {
  if (typeof window === "undefined") return 2;
  if (window.innerWidth >= 1280) return 5;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 640) return 3;
  return 2;
}

function distributeToColumns(
  items: ReactNode[],
  colCount: number,
): ReactNode[][] {
  const columns: ReactNode[][] = Array.from({ length: colCount }, () => []);
  Children.forEach(items, (child, i) => {
    columns[i % colCount].push(child);
  });
  return columns;
}

function SpotlightPostGrid({
  children,
  className,
  isLoading,
  skeletonCount = 10,
}: SpotlightPostGridProps) {
  const childArray = Children.toArray(children);
  const colCount = getColumnCount();
  const columns = distributeToColumns(childArray, colCount);

  const skeletons = isLoading
    ? Array.from({ length: skeletonCount }, (_, i) => (
        <div key={`skeleton-${i}`} className="mb-4">
          <SpotlightPostCardSkeleton />
        </div>
      ))
    : [];

  return (
    <div className={cn(`grid gap-4 ${COLUMN_CONFIGS.join(" ")}`, className)}>
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          {col.map((child, rowIdx) => (
            <div key={rowIdx}>{child}</div>
          ))}
          {/* Distribute skeletons across columns */}
          {skeletons
            .filter((_, i) => i % colCount === colIdx)
            .map((skeleton) => skeleton)}
        </div>
      ))}
    </div>
  );
}

export default SpotlightPostGrid;
