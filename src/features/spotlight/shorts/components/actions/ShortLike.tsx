import { useToggleLikeMutation } from "@/features/spotlight/spotlightMutations";
import ShortActionIconButton from "./ShortActionIconButton";

interface ShortLikeProps {
  isLiked: boolean;
  likes: number;
  postId: string;
}

const ShortLike: React.FC<ShortLikeProps> = (props) => {
  const { isLiked, likes, postId } = props;
  const toggleLike = useToggleLikeMutation();

  const handleLikeClick = () => {
    toggleLike.mutate(postId);
  };

  return (
    <ShortActionIconButton
      name="ThumbsUp"
      aria-label="like-short-icon"
      label={likes}
      highlight={isLiked}
      onClick={handleLikeClick}
    />
  );
};

export default ShortLike;
