import { Icon } from "@/components/base/icon";
import { FeedPost } from "../types/feed.types";
import { UgcPostType } from "../types/enums";
import { cn } from "@/utils/cssHelpers";

interface SpotlightTypeIconProps {
  type: FeedPost["type"];
  className?: string;
}

const SpotlightTypeIcon: React.FC<SpotlightTypeIconProps> = (props) => {
  const { type, className } = props;
  const isVideo = type === UgcPostType.VIDEO;
  return (
    <Icon
      name={isVideo ? "PlayList" : "Image"}
      aria-label={isVideo ? "video-icon" : "image-icon"}
      className={cn("text-white", className)}
      size="lg"
      strokeWidth={2}
    />
  );
};

export default SpotlightTypeIcon;
