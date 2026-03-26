import type { CampaignSubmission } from "../types/submission.types";
import { CampaignSubmissionCard } from "./CampaignSubmissionCard";

interface MyCampaignSubmissionsProps {
  submissions: CampaignSubmission[];
}

export default function MyCampaignSubmissions({
  submissions,
}: MyCampaignSubmissionsProps) {
  if (submissions.length === 0) return null;

  return (
    <div className="mt-2">
      <h6 className="font-bold text-n-900">My Submissions</h6>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {submissions.map((submission) => (
          <CampaignSubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
    </div>
  );
}
