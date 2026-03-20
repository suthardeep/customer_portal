import { Image } from "@/components/base/Image";
import { MediaStatus, UgcPostType } from "@/features/spotlight/types/enums";
import type { PostMedia } from "@/features/spotlight/types/feed.types";
import { ShortImageSlider } from "./ShortImageSlider";
import { ShortVideoPlaceholder } from "./ShortVideoPlaceholder";
import ShortsVideoPlayer from "./ShortsVideoPlayer";

interface ShortPlayerProps {
  type: UgcPostType;
  media: PostMedia;
  title: string;
}

export function ShortPlayer({ type, media, title }: ShortPlayerProps) {
  if (type === UgcPostType.VIDEO) {
    if (media.status !== MediaStatus.READY) {
      return (
        <ShortVideoPlaceholder
          status={media.status}
          thumbnail={media.thumbnail}
        />
      );
    }

    return (
      <ShortsVideoPlayer
        hlsUrl={media.hlsUrl}
        thumbnail={media.thumbnail}
        alt={title}
        className="size-full lg:rounded-xl"
        isActive
        isPreload={false}
      />
    );
  }

  if (media.images && media.images.length > 1) {
    return <ShortImageSlider images={media.images} title={title} />;
  }

  return (
    <Image
      src={media.images?.[0] ?? media.thumbnail}
      alt={title}
      className="size-full rounded-xl object-cover"
    />
  );
}
