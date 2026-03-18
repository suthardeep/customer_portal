import { useToggleBookmarkMutation } from "@/features/spotlight/spotlightMutations";
import ShortActionIconButton from "./ShortActionIconButton";

interface ShortBookmarkProps {
  isBookmarked: boolean;
  bookmarks: number;
  postId: string;
}

const ShortBookmark: React.FC<ShortBookmarkProps> = (props) => {
  const { bookmarks, isBookmarked, postId } = props;
  const toggleBookmark = useToggleBookmarkMutation();

  const handleBookmarkClick = () => {
    toggleBookmark.mutate(postId);
  };
  return (
    <ShortActionIconButton
      name="Bookmark"
      aria-label="bookmark-short-icon"
      label={bookmarks}
      highlight={isBookmarked}
      onClick={handleBookmarkClick}
    />
  );
};

export default ShortBookmark;
