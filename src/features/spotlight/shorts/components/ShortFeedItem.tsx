import { Image } from "@/components/base/Image";
import { Link } from "@tanstack/react-router";
import { forwardRef } from "react";
import type { FeedPost } from "../../types/feed.types";
import { UgcPostType } from "../../types/enums";
import ShortActions from "./actions/ShortActions";
import ShortsVideoPlayer, {
  type ShortsVideoPlayerHandle,
} from "./ShortsVideoPlayer";

export type FeedItemState =
  | "placeholder"
  | "thumbnail"
  | "active"
  | "preload"
  | "cached";

interface ShortFeedItemProps {
  post: FeedPost;
  state: FeedItemState;
  intersectionRef: (node: HTMLDivElement | null) => void;
}

const ShortFeedItem = forwardRef<ShortsVideoPlayerHandle, ShortFeedItemProps>(
  function ShortFeedItem({ post, state, intersectionRef }, playerRef) {
    if (state === "placeholder") {
      return <div style={{ height: "100dvh", flexShrink: 0 }} />;
    }

    const isVideo = post.type === UgcPostType.VIDEO;

    return (
      <div
        ref={intersectionRef}
        className="relative flex-shrink-0 overflow-hidden bg-black"
        style={{ height: "100dvh", scrollSnapAlign: "start" }}
      >
        {isVideo && (state === "active" || state === "preload" || state === "cached") ? (
          <ShortsVideoPlayer
            ref={playerRef}
            postId={post.id}
            hlsUrl={post.media.playUrl}
            thumbnail={post.media.thumbnail}
            alt={post.caption}
            className="size-full"
            isActive={state === "active"}
            isPreload={state === "preload"}
          />
        ) : (
          /* Thumbnail-only for image posts or thumbnail state */
          <div className="size-full">
            <Image
              src={post.media.thumbnail}
              alt={post.caption}
              className="size-full object-cover"
            />
          </div>
        )}

        {/* Gradient overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Creator info — bottom left */}
        <div className="absolute bottom-10 left-4 right-20 flex items-center gap-3">
          <Link
            to="/spotlight/users/$userId"
            params={{ userId: post.creator.id }}
            className="flex items-center gap-2 min-w-0"
          >
            <Image
              src={post.creator.profileImage}
              alt={post.creator.fullName}
              className="size-9 rounded-full flex-shrink-0 border border-white/30"
            />
            <span className="text-white font-semibold text-sm truncate [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
              {post.creator.fullName}
            </span>
          </Link>
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="absolute bottom-4 left-4 right-20">
            <p className="text-white/90 text-sm line-clamp-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
              {post.caption}
            </p>
          </div>
        )}

        {/* Action buttons — right side */}
        <ShortActions
          stats={post.stats}
          isLiked={post.isLiked}
          isBookmarked={post.isBookmarked}
          postId={post.id}
          caption={post.caption}
          thumbnail={post.media.thumbnail}
        />
      </div>
    );
  },
);

export default ShortFeedItem;
