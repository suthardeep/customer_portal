import { Image } from "@/components/base/Image";
import type { FeedPost } from "../types/types";
import { MediaStatus, UgcPostType } from "../types/enums";
import { Icon } from "@/components/base/icon";
import { Link } from "@tanstack/react-router";
import SpotlightBookmark from "./SpotlightBookmark";
import SpotlightTypeIcon from "./SpotlightTypeIcon";
import { Chip } from "@/components/base/chip/Chip";
import {
  getMediaStatusChipColor,
  getMediaStatusLabel,
  getStatusChipColor,
  getStatusLabel,
} from "../my-posts/utils";
import { ShortVideoPlaceholder } from "../shorts/components/ShortVideoPlaceholder";

interface SpotlightPostCardProps {
  post: FeedPost;
  showBookmark?: boolean;
  disableRedirect?: boolean;
  showMediaStatus?: boolean;
  showPostReviewStatus?: boolean;
  linkTo?: string;
  linkParams?: Record<string, string>;
}

function SpotlightPostCard({
  post,
  showBookmark = false,
  disableRedirect = false,
  showMediaStatus = false,
  showPostReviewStatus = false,
  linkTo,
  linkParams,
}: SpotlightPostCardProps) {
  const aspectClass =
    post.type === UgcPostType.VIDEO ? "aspect-9/16" : "aspect-video";

  const content = (
    <>
      <div className="relative overflow-hidden rounded-xl">
        {post.media.status === MediaStatus.READY ? (
          <Image
            src={post.media.thumbnail}
            alt={post.caption}
            className={`${aspectClass} w-full object-cover`}
          />
        ) : (
          <ShortVideoPlaceholder
            status={post.media.status}
            thumbnail={post.media.thumbnail}
          />
        )}

        <div className="absolute inset-x-0 top-0 p-2.5 bg-linear-to-b flex items-center gap-2 from-black/60 to-transparent">
          {showBookmark && (
            <SpotlightBookmark
              isBookmarked={post.isBookmarked}
              postId={post.id}
            />
          )}
          <SpotlightTypeIcon type={post.type} className="ml-auto" />
        </div>
        {(showMediaStatus || showPostReviewStatus) && (
          <div className="absolute inset-x-0 bottom-0 p-1.5 bg-linear-to-b flex items-center gap-2">
            {showPostReviewStatus && (
              <Chip color={getStatusChipColor(post.status)} size="xs">
                {getStatusLabel(post.status)}
              </Chip>
            )}
            {showMediaStatus && (
              <Chip
                color={getMediaStatusChipColor(post.media.status)}
                size="xs"
                className="ml-auto"
              >
                {" "}
                {getMediaStatusLabel(post.media.status)}{" "}
              </Chip>
            )}
          </div>
        )}
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
    </>
  );

  if (disableRedirect) {
    return (
      <div className="group">
        {content}
      </div>
    );
  }

  return (
    <Link
      className="group"
      to={linkTo ?? "/spotlight/shorts/$id"}
      params={linkParams ?? { id: post.id }}
    >
      {content}
    </Link>
  );
}

export default SpotlightPostCard;
