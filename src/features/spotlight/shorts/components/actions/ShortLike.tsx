import { useToggleLikeMutation } from "@/features/spotlight/spotlightMutations";
import ShortActionIconButton from "./ShortActionIconButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";

interface ShortLikeProps {
  isLiked: boolean;
  likes: number;
  postId: string;
}

const ShortLike: React.FC<ShortLikeProps> = (props) => {
  const { isLiked, likes, postId } = props;
  const toggleLike = useToggleLikeMutation();
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();

  const handleLikeClick = () => {
    if (isAuthenticated) {
      toggleLike.mutate(postId);
    } else {
      loginDialog.open({
        onSuccess() {
          toggleLike.mutate(postId);
        },
      });
    }
  };

  return (
    <ShortActionIconButton
      name="ThumbsUp"
      aria-label="like-short-icon"
      label={likes}
      highlight={isLiked}
      onClick={handleLikeClick}
      enableLightMode
    />
  );
};

export default ShortLike;
