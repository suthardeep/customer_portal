import { Icon } from "@/components/base/icon";
import { cn } from "@/utils/cssHelpers";
import { haptic } from "@/utils/haptics";

interface WishlistButtonProps {
  isWishlisted: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function WishlistButton({ isWishlisted, onClick }: WishlistButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => { haptic("medium"); onClick(e); }}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "absolute right-2 top-2 flex size-8 items-center justify-center rounded-full group",
        "backdrop-blur-xl transition-colors",
        isWishlisted ? "bg-red-50" : "bg-black/30 hover:bg-red-50",
      )}
    >
      <Icon
        name="Heart"
        size="md"
        strokeWidth={2.5}
        className={cn(
          "transition-all duration-200",
          isWishlisted
            ? "fill-danger-500 text-danger-500 group-hover:scale-90"
            : "text-white group-hover:text-danger-500 group-hover:scale-110",
        )}
      />
    </button>
  );
}
