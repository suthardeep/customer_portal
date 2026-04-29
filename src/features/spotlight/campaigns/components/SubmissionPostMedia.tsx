import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon/Icon";
import { UgcPostType } from "@/features/spotlight/types/enums";
import type { SubmissionPostMedia as SubmissionPostMediaType, SubmissionPost } from "../types/submission.types";

interface SubmissionPostMediaProps {
  type: SubmissionPost["type"];
  media: SubmissionPostMediaType;
}

export default function SubmissionPostMedia({ type, media }: SubmissionPostMediaProps) {
  const isVideo = type === UgcPostType.VIDEO;
  const images = media.images ?? [];
  const thumbnail = media.thumbnail;

  if (isVideo) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-n-200">
        {thumbnail ? (
          <Image src={thumbnail} alt="Video thumbnail" className="size-full object-cover" />
        ) : (
          <div className="size-full flex items-center justify-center">
            <Icon name="Play" size="lg" className="text-n-500" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-12 rounded-full bg-black/50 flex items-center justify-center">
            <Icon name="Play" size="lg" className="text-white" />
          </div>
        </div>
      </div>
    );
  }

  if (images.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {images.map((url, i) => (
          <div key={url} className="aspect-square rounded-lg overflow-hidden bg-n-200">
            <Image src={url} alt={`Image ${i + 1}`} className="size-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  if (thumbnail) {
    return (
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-n-200">
        <Image src={thumbnail} alt="Submission" className="size-full object-cover" />
      </div>
    );
  }

  return (
    <div className="aspect-square w-full rounded-xl bg-n-200 flex items-center justify-center">
      <Icon name="Image" size="lg" className="text-n-500" />
    </div>
  );
}
