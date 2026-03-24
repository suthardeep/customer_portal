import type { UploadProgress } from "@/features/media-upload/types/types";

interface SubmissionUploadProgressProps {
  progress: UploadProgress;
}

const SubmissionUploadProgress = ({ progress }: SubmissionUploadProgressProps) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-n-700 capitalize">{progress.phase}...</span>
      <span className="text-n-700">{progress.percent}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-n-200">
      <div
        className="h-full rounded-full bg-p-500 transition-all duration-300"
        style={{ width: `${progress.percent}%` }}
      />
    </div>
  </div>
);

export default SubmissionUploadProgress;
