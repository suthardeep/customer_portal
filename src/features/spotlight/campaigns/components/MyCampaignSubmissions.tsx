import { useState } from "react";
import { SUBMISSION_STATS } from "../constants";
import type { CampaignSubmission } from "../types/submission.types";
import { CampaignSubmissionCard } from "./CampaignSubmissionCard";
import CampaignSubmissionDetailSheet from "./CampaignSubmissionDetailSheet";

interface MyCampaignSubmissionsProps {
  campaignId: string;
  submissions: CampaignSubmission[];
}

export default function MyCampaignSubmissions({
  campaignId,
  submissions,
}: MyCampaignSubmissionsProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<CampaignSubmission | null>(null);

  if (submissions.length === 0) return null;

  return (
    <div className="mt-2">
      <h6 className="font-bold text-n-900">My Submissions</h6>
      <div className="flex gap-2 mt-3">
        {SUBMISSION_STATS.map(({ label, statuses, className }) => {
          const count = submissions.filter((s) =>
            statuses.includes(s.status),
          ).length;
          return (
            <span
              key={label}
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${className}`}
            >
              {count} {label}
            </span>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {submissions.map((submission) => (
          <CampaignSubmissionCard
            key={submission.id}
            submission={submission}
            onClick={() => setSelectedSubmission(submission)}
          />
        ))}
      </div>

      <CampaignSubmissionDetailSheet
        campaignId={campaignId}
        submission={selectedSubmission}
        isOpen={selectedSubmission !== null}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
}
