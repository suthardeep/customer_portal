import { CampaignSubmissionStatus } from "./types/enums";

export const SUBMISSION_STATS = [
  {
    label: "Accepted",
    statuses: [CampaignSubmissionStatus.CONTENT_APPROVED],
    className: "bg-success-50 text-success-700",
  },
  {
    label: "Pending",
    statuses: [
      CampaignSubmissionStatus.PENDING_REVIEW,
      CampaignSubmissionStatus.NEEDS_UPDATING,
    ],
    className: "bg-orange-50 text-orange-700",
  },
  {
    label: "Rejected",
    statuses: [CampaignSubmissionStatus.CONTENT_REJECTED],
    className: "bg-danger-50 text-danger-700",
  },
];
