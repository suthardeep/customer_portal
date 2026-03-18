import { Icon } from "@/components/base/icon";
import { useToggleBookmarkMutation } from "@/features/spotlight/spotlightMutations";
import { cn } from "@/utils/cssHelpers";

interface SpotlightBookmarkProps {
  isBookmarked: boolean;
  postId: string;
}

const SpotlightBookmark: React.FC<SpotlightBookmarkProps> = (props) => {
  const { isBookmarked, postId } = props;
  const toggleBookmark = useToggleBookmarkMutation();

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleBookmark.mutate(postId);
  };

  return (
    <button
      type="button"
      aria-label={isBookmarked ? "Remove from wishlist" : "Add to wishlist"}
      onClick={handleBookmarkClick}
      disabled={toggleBookmark.isPending}
      className={cn(
        "absolute right-2 top-2 flex size-8 items-center justify-center rounded-full group cursor-pointer",
        "backdrop-blur-xl transition-colors",
        isBookmarked ? "bg-p-50" : "bg-black/30 hover:bg-p-50",
      )}
    >
      <Icon
        name="Bookmark"
        size="md"
        strokeWidth={2.5}
        className={cn(
          "transition-all duration-200",
          isBookmarked
            ? "fill-p-500 text-p-500 group-hover:scale-90"
            : "text-white group-hover:text-p-500 group-hover:scale-110",
        )}
      />
    </button>
  );
};

export default SpotlightBookmark;
