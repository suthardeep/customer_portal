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

function SpotlightPostGrid({
  children,
  className,
  isLoading,
  skeletonCount = 10,
}: SpotlightPostGridProps) {
  return (
    <div
      className={cn(
        "columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5",
        className,
      )}
    >
      {Children.map(children, (child) => (
        <div className="mb-4 break-inside-avoid">{child}</div>
      ))}
      {isLoading &&
        Array.from({ length: skeletonCount }, (_, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <SpotlightPostCardSkeleton />
          </div>
        ))}
    </div>
  );
}

export default SpotlightPostGrid;
