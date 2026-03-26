import type { ChipColor } from "@/components/base/chip/chip.types";
import { CampaignSubmissionStatus } from "./types/enums";

export const getSubmissionStatusLabel = (
  status: CampaignSubmissionStatus,
): string => {
  const labels: Record<CampaignSubmissionStatus, string> = {
    [CampaignSubmissionStatus.PENDING_REVIEW]: "Pending Review",
    [CampaignSubmissionStatus.CONTENT_APPROVED]: "Approved",
    [CampaignSubmissionStatus.CONTENT_REJECTED]: "Rejected",
    [CampaignSubmissionStatus.NEEDS_UPDATING]: "Needs Update",
  };

  return labels[status];
};

export const getSubmissionStatusChipColor = (
  status: CampaignSubmissionStatus,
): ChipColor => {
  const colors: Record<CampaignSubmissionStatus, ChipColor> = {
    [CampaignSubmissionStatus.PENDING_REVIEW]: "orange",
    [CampaignSubmissionStatus.CONTENT_APPROVED]: "success",
    [CampaignSubmissionStatus.CONTENT_REJECTED]: "danger",
    [CampaignSubmissionStatus.NEEDS_UPDATING]: "primary",
  };

  return colors[status];
};
