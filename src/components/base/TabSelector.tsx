import { cn } from "@/utils/cssHelpers";
import { useEffect, useRef, useState } from "react";

export interface TabSelectorItem {
  value: string;
  label: string;
}

type TabSelectorSize = "sm" | "md" | "lg";

interface TabSelectorProps {
  items: TabSelectorItem[];
  value: string;
  onChange: (value: string) => void;
  size?: TabSelectorSize;
  className?: string;
}

const sizeClasses: Record<TabSelectorSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function TabSelector({
  items,
  value,
  onChange,
  size = "md",
  className,
}: TabSelectorProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const index = items.findIndex((item) => item.value === value);
    const button = buttonRefs.current[index];

    if (button) {
      setHighlightStyle({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });
    }
  }, [value, items]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center gap-0.5 rounded-xl bg-n-300 p-0.5",
        className,
      )}
    >
      <span
        className="absolute top-0.5 bottom-0.5 rounded-xl bg-p-500 transition-all duration-300 ease-in-out"
        style={{ left: highlightStyle.left, width: highlightStyle.width }}
      />

      {items.map((item, index) => (
        <button
          key={item.value}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          type="button"
          onClick={() => onChange(item.value)}
          className={cn(
            "relative z-10 flex-1 cursor-pointer rounded-xl font-medium transition-colors duration-150",
            sizeClasses[size],
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-500 focus-visible:ring-offset-1",
            item.value === value
              ? "text-n-50"
              : "bg-transparent text-n-850 hover:text-n-950",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
