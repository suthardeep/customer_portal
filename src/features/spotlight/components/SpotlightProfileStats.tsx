import type { SpotlightProfile } from "../types/types";

interface SpotlightProfileStatsProps {
  profile: Pick<SpotlightProfile, "totalViewCount" | "postCount">;
}

export function SpotlightProfileStats({ profile }: SpotlightProfileStatsProps) {
  const stats = [
    { value: profile.totalViewCount, label: "Views" },
    { value: profile.postCount, label: "Posts" },
  ];

  return (
    <div className="flex gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-1 items-center justify-center gap-1 rounded-full px-4 py-2 w-full bg-p-50"
        >
          <span className="font-bold text-n-900">{stat.value}</span>
          <span className="font-medium text-n-800">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
