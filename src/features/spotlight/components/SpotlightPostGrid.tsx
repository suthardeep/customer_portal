import { cn } from "@/utils/cssHelpers";
import { Children } from "react";
import type { ReactNode } from "react";

interface SpotlightPostGridProps {
  children: ReactNode;
  className?: string;
}

function SpotlightPostGrid({ children, className }: SpotlightPostGridProps) {
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
    </div>
  );
}

export default SpotlightPostGrid;
