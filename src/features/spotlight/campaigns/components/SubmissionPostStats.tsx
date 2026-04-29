import { Icon } from "@/components/base/icon/Icon";
import type { IconName } from "@/components/base/icon/iconRegistry";
import type { SubmissionPostStats as SubmissionPostStatsType } from "../types/submission.types";

interface StatItem {
  icon: IconName;
  label: string;
  value: number;
}

interface SubmissionPostStatsProps {
  stats: SubmissionPostStatsType;
}

const STAT_ITEMS = (stats: SubmissionPostStatsType): StatItem[] => [
  { icon: "Eye", label: "Views", value: stats.views },
  { icon: "Heart", label: "Likes", value: stats.likes },
  { icon: "Bookmark", label: "Saves", value: stats.bookmarks },
  { icon: "Share", label: "Shares", value: stats.shares },
];

export default function SubmissionPostStats({ stats }: SubmissionPostStatsProps) {
  return (
    <div>
      <p className="font-medium text-n-700 mb-2">Post Stats</p>
      <div className="grid grid-cols-4 gap-2">
        {STAT_ITEMS(stats).map(({ icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-lg border border-n-300 py-3"
          >
            <Icon name={icon} size="sm" className="text-n-600" />
            <span className="font-semibold text-n-900">{value}</span>
            <span className="text-n-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
