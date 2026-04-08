import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "@/components/base/Image";
import { SpotlightTaggedProductsStack } from "@/features/spotlight/components/SpotlightTaggedProductsStack";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import type { FeedPost } from "@/features/spotlight/types/feed.types";
import { MediaStatus, UgcPostType } from "@/features/spotlight/types/enums";
import { useRef, useState, useEffect } from "react";
import { useShortsEngagement } from "../hooks/useShortsEngagement";
import ShortActions from "./actions/ShortActions";
import { ShortImageSlider } from "./ShortImageSlider";
import { ShortVideoPlaceholder } from "./ShortVideoPlaceholder";
import ShortsVideoPlayer from "./ShortsVideoPlayer";
import SpotlightBackButton from "../../components/SpotlightBackButton";
import { SpotlightTaggedProductsMobileStack } from "../../components/SpotlightTaggedProductsMobileStack";
import { ShortCreatorInfo } from "./ShortCreatorInfo";

interface ShortFeedScrollerItemProps {
  post: FeedPost;
  isActive: boolean;
  isPreload: boolean;
}

export function ShortFeedScrollerItem({
  post,
  isActive,
  isPreload,
}: ShortFeedScrollerItemProps) {
  const { data: detail } = useSuspenseQuery(
    spotlightQueries.postDetail(post.id),
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMediaReady, setIsMediaReady] = useState(false);

  useEffect(() => {
    setIsMediaReady(false);
  }, [post.id]);

  useShortsEngagement(
    isActive ? detail : null,
    videoRef,
    isMediaReady,
  );

  const stats = detail.stats;
  const isLiked = detail.isLiked;
  const isBookmarked = detail.isBookmarked;
  const taggedProducts = detail.taggedProducts ?? [];
  const media = detail.media;

  function renderPlayer() {
    if (post.type === UgcPostType.VIDEO) {
      if (media.status !== MediaStatus.READY) {
        return (
          <ShortVideoPlaceholder
            status={media.status}
            thumbnail={media.thumbnail}
          />
        );
      }
      if (!media.hlsUrl) {
        return (
          <Image
            src={media.thumbnail}
            alt={post.caption}
            className="size-full object-cover"
          />
        );
      }
      return (
        <ShortsVideoPlayer
          hlsUrl={media.hlsUrl}
          thumbnail={media.thumbnail}
          alt={post.caption}
          className="size-full lg:rounded-xl"
          postId={post.id}
          isActive={isActive}
          isPreload={isPreload}
          onVideoReady={(el) => { videoRef.current = el; setIsMediaReady(true); }}
        />
      );
    }

    const images = post.media.images;
    if (images && images.length > 1) {
      return (
        <ShortImageSlider
          images={images}
          title={post.caption}
          onFirstImageLoad={() => setIsMediaReady(true)}
        />
      );
    }
    return (
      <Image
        src={images?.[0] ?? post.media.thumbnail}
        alt={post.caption}
        className="size-full object-cover"
        onLoad={() => setIsMediaReady(true)}
      />
    );
  }

  return (
    <div className="relative size-full bg-black lg:bg-transparent lg:grid xl:grid-cols-3 lg:grid-cols-2 lg:gap-4 lg:items-start lg:p-6">
      {/* Desktop: left column (back button + tagged products) */}
      <div className="hidden xl:flex flex-col h-full justify-between">
        <SpotlightBackButton />
        <SpotlightTaggedProductsStack products={taggedProducts} />
      </div>

      {/* Player — rendered ONCE, adapts layout via CSS */}
      <div className="absolute inset-0 lg:relative lg:aspect-9/16 lg:max-h-[80vh] lg:w-full lg:rounded-md lg:overflow-hidden">
        {renderPlayer()}
        {/* FOR Tablets */}
        <div className="absolute bottom-10 left-4 w-full z-10 hidden lg:block xl:hidden">
          <SpotlightTaggedProductsMobileStack products={taggedProducts} />
        </div>
        {/* FOR Tablets */}
      </div>
      {/* Mobile overlay chrome */}
      <div className="lg:hidden">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-black/80 to-transparent z-5 pointer-events-none" />
        <div className="absolute bottom-10 left-4 w-full z-10">
          <div className="flex items-center justify-between gap-4 mb-14">
            <SpotlightTaggedProductsMobileStack products={taggedProducts} />
            <ShortActions
              stats={stats}
              isBookmarked={isBookmarked}
              isLiked={isLiked}
              postId={post.id}
              className="z-10 mb-16 mr-4"
            />
          </div>
          <ShortCreatorInfo creator={post.creator} caption={post.caption} />
        </div>
      </div>

      {/* Desktop: right column (creator info + actions) */}
      <div className="hidden lg:flex flex-col justify-between w-full h-full items-start">
        <ShortCreatorInfo creator={post.creator} caption={post.caption} />
        <ShortActions
          stats={stats}
          isBookmarked={isBookmarked}
          isLiked={isLiked}
          postId={post.id}
          className="ml-8 my-auto"
        />
      </div>
    </div>
  );
}
