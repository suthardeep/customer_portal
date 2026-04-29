import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon/Icon";
import { Chip } from "@/components/base/chip/Chip";
import { UgcPostType } from "@/features/spotlight/types/enums";
import { CampaignSubmissionStatus } from "../types/enums";
import type { CampaignSubmission } from "../types/submission.types";
import {
  getSubmissionStatusLabel,
  getSubmissionStatusChipColor,
} from "../utils";
import { prettyDate } from "@/utils/formatDateTime";

interface CampaignSubmissionCardProps {
  submission: CampaignSubmission;
  onClick?: () => void;
}

export function CampaignSubmissionCard({
  submission,
  onClick,
}: CampaignSubmissionCardProps) {
  const {
    post,
    status,
    reviewTitle,
    reviewDescription,
    products,
    createdAt,
    reviewedAt,
  } = submission;
  const isVideo = post.type === UgcPostType.VIDEO;
  const thumbnail = post.media.thumbnail;

  return (
    <div className="rounded-xl border border-n-400 bg-white overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="flex gap-3 p-3">
        <div className="relative shrink-0 size-20 rounded-lg overflow-hidden bg-n-200">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={post.caption ?? "Submission"}
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full flex items-center justify-center">
              <Icon name="Image" size="lg" className="text-n-500" />
            </div>
          )}
          {isVideo && (
            <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1 py-0.5">
              <Icon name="Play" size="xs" className="text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h6 className="font-medium text-n-900 line-clamp-2">
              {post.caption ?? post.title ?? "No caption"}
            </h6>
            <Chip
              color={getSubmissionStatusChipColor(
                status as CampaignSubmissionStatus,
              )}
              size="xs"
            >
              {getSubmissionStatusLabel(status as CampaignSubmissionStatus)}
            </Chip>
          </div>

          <div className="flex items-center gap-1 text-n-900">
            <Icon name="Calendar" size="xs" />
            <p>
              {reviewedAt
                ? `Reviewed on ${prettyDate(reviewedAt)}`
                : `Submitted on ${prettyDate(createdAt)}`}
            </p>
          </div>

          {products.length > 0 && (
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="size-5 rounded overflow-hidden shrink-0">
                <Image
                  src={products[0].mediaUrls?.[0] ?? ""}
                  alt={products[0].name}
                  className="size-full object-cover"
                />
              </div>
              <span className="text-n-900 truncate">{products[0].name}</span>
              {products.length > 1 && (
                <span className="text-n-700 shrink-0">
                  +{products.length - 1}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {(reviewTitle || reviewDescription) && (
        <div className="mx-3 mb-3 p-2.5 rounded-lg bg-n-100 border border-n-300">
          <div className="flex items-center gap-1.5 mb-1">
            <Icon name="Feedback" size="xs" className="text-n-600" />
            <p className="font-medium text-n-800">
              {reviewTitle ?? "Review feedback"}
            </p>
          </div>
          {reviewDescription && (
            <p className="text-n-800">{reviewDescription}</p>
          )}
        </div>
      )}
    </div>
  );
}
