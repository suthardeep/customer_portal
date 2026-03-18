import { Image } from "@/components/base/Image";
import type { FeedPost } from "../types/types";
import { UgcPostType } from "../types/enums";
import { Icon } from "@/components/base/icon";
import { Link } from "@tanstack/react-router";
import SpotlightBookmark from "./SpotlightBookmark";
import SpotlightTypeIcon from "./SpotlightTypeIcon";

interface SpotlightPostCardProps {
  post: FeedPost;
  showBookmark?: boolean;
}

function SpotlightPostCard({
  post,
  showBookmark = false,
}: SpotlightPostCardProps) {
  const aspectClass =
    post.type === UgcPostType.VIDEO ? "aspect-9/16" : "aspect-video";

  return (
    <Link className="group" to="/spotlight/shorts/$id" params={{ id: post.id }}>
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={post.media.thumbnail}
          alt={post.caption}
          className={`${aspectClass} w-full object-cover`}
        />
        <div className="absolute inset-x-0 top-0 p-2.5 bg-linear-to-b flex items-center gap-2 from-black/60 to-transparent">
          {showBookmark && (
            <SpotlightBookmark
              isBookmarked={post.isBookmarked}
              postId={post.id}
            />
          )}
          <SpotlightTypeIcon type={post.type} className="ml-auto" />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 px-2">
        <div className="size-6 border-[0.5px] rounded-full border-n-500 overflow-hidden">
          <Image
            src={post.creator.profileImage}
            alt={post.creator.fullName}
            className="size-6 rounded-full object-cover"
          />
        </div>
        <span className="text-xs font-medium truncate mr-auto">
          {post.creator.fullName}
        </span>
        <Icon name="Heart" strokeWidth={2} className="text-danger-500" />
        <span>{post.stats.likes}</span>
      </div>
    </Link>
  );
}

export default SpotlightPostCard;
