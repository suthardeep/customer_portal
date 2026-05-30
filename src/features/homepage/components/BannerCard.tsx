import { Image } from "@/components/base/Image";
import { Link } from "@tanstack/react-router";
import type { Banner } from "../types/types";
import { BANNER_RATIO_MAP, getBannerHref } from "../utils";

interface BannerCardProps {
  banner: Banner;
}

export function BannerCard({ banner }: BannerCardProps) {
  const aspectRatio = BANNER_RATIO_MAP[banner.ratio] ?? "16/9";
  const href = getBannerHref(banner.ctaConfig);

  const cardStyle = {
    width: "var(--item-width, 100%)",
    aspectRatio,
    borderRadius: `${banner.roundness}px`,
  };

  const content = (
    <Image
      src={banner.mediaUrl}
      alt={banner.title}
      className="size-full object-cover"
    />
  );

  if (href?.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="overflow-hidden shrink-0 block"
        style={cardStyle}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        to={href}
        className="overflow-hidden shrink-0 block"
        style={cardStyle}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="overflow-hidden shrink-0" style={cardStyle}>
      {content}
    </div>
  );
}
