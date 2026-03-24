import { useToggleBookmarkMutation } from "@/features/spotlight/spotlightMutations";
import ShortActionIconButton from "./ShortActionIconButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";

interface ShortBookmarkProps {
  isBookmarked: boolean;
  bookmarks: number;
  postId: string;
}

const ShortBookmark: React.FC<ShortBookmarkProps> = (props) => {
  const { bookmarks, isBookmarked, postId } = props;
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();

  const toggleBookmark = useToggleBookmarkMutation();

  const handleBookmarkClick = () => {
    if (isAuthenticated) {
      toggleBookmark.mutate(postId);
    } else {
      loginDialog.open({
        onSuccess() {
          toggleBookmark.mutate(postId);
        },
      });
    }
  };
  return (
    <ShortActionIconButton
      name="Bookmark"
      aria-label="bookmark-short-icon"
      label={bookmarks}
      highlight={isBookmarked}
      onClick={handleBookmarkClick}
      enableLightMode
    />
  );
};

export default ShortBookmark;
