import { Chip } from "@/components/base/chip/Chip";
import { Image } from "@/components/base/Image";
import { MediaStatus } from "@/features/spotlight/types/enums";
import {
  getMediaStatusChipColor,
  getMediaStatusLabel,
} from "../../my-posts/utils";

interface ShortVideoPlaceholderProps {
  status: MediaStatus;
  thumbnail?: string;
}

export function ShortVideoPlaceholder({
  status,
  thumbnail,
}: ShortVideoPlaceholderProps) {
  return (
    <div className="relative size-full aspect-9/16 rounded-xl overflow-hidden bg-n-800">
      {thumbnail && (
        <Image
          src={thumbnail}
          alt="processing-img"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-30 blur-sm"
        />
      )}
      <div className="absolute inset-0 fall">
        <Chip color={getMediaStatusChipColor(status)} size="sm">
          {" "}
          {getMediaStatusLabel(status)}{" "}
        </Chip>
      </div>
    </div>
  );
}
