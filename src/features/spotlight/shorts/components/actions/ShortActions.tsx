import { FeedPost } from "@/features/spotlight/types/feed.types";
import ShortBookmark from "./ShortBookmark";
import ShortLike from "./ShortLike";
import ShortShare from "./ShortShare";
import ShortViews from "./ShortViews";
import { cn } from "@/utils/cssHelpers";

type ShortActionsProps = {
  stats: FeedPost["stats"];
  isLiked: boolean;
  isBookmarked: boolean;
  postId: string;
  className?: string;
};

const ShortActions: React.FC<ShortActionsProps> = (props) => {
  const { isBookmarked, isLiked, stats, className, postId } = props;
  return (
    <div
      className={cn(
        "flex flex-col gap-y-4 absolute lg:relative bottom-10 right-4",
        className,
      )}
    >
      <ShortLike isLiked={isLiked} likes={stats.likes} postId={postId} />
      <ShortShare shares={stats.shares} />
      <ShortViews views={stats.views} />
      <ShortBookmark
        isBookmarked={isBookmarked}
        bookmarks={stats.bookmarks}
        postId={postId}
      />
    </div>
  );
};

export default ShortActions;
