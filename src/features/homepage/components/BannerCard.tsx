import { Image } from "@/components/base/Image";
import type { Banner } from "../types/types";
import { BANNER_RATIO_MAP } from "../utils";

interface BannerCardProps {
  banner: Banner;
}

export function BannerCard({ banner }: BannerCardProps) {
  const aspectRatio = BANNER_RATIO_MAP[banner.ratio] ?? "16/9";

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        aspectRatio,
        borderRadius: `${banner.roundness}px`,
      }}
    >
      <Image
        src={banner.mediaUrl}
        alt={banner.title}
        className="size-full object-cover"
      />
    </div>
  );
}
