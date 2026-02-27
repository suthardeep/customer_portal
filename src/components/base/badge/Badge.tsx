import { cn } from "@/utils/cssHelpers";

interface BadgeProps {
  count: number;
  className?: string;
}

export function Badge({ count, className }: BadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        "absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 rounded-full bg-danger-500 text-white text-[10px] font-bold flex items-center justify-center leading-none",
        className,
      )}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
