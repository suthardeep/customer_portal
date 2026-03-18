import { Icon } from "@/components/base/icon/Icon";
import type { CreatorAnalyticsPostsCreated } from "@/features/spotlight/types/analytics.types";

interface AnalyticsPostsCreatedProps {
  postsCreated: CreatorAnalyticsPostsCreated;
}

export function AnalyticsPostsCreated({
  postsCreated,
}: AnalyticsPostsCreatedProps) {
  return (
    <div className="rounded-xl border border-n-400 p-4 flex flex-col justify-between gap-3">
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl bg-p-50">
          <Icon
            name="Analytics"
            size="lg"
            strokeWidth={2}
            className="text-p-500"
          />
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-2">
            <Icon name="VideoCameraSpark" size="sm" className="text-n-800" />
            <p className="font-medium text-n-800">{postsCreated.videoCount}</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Image" size="sm" className="text-n-800" />
            <p className="font-medium text-n-800">{postsCreated.imageCount}</p>
          </div>
        </div>
      </div>
      <div className="space-y-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-n-800">
          Posts Created
        </span>
        <p className="text-2xl font-bold text-n-900">{postsCreated.total}</p>
      </div>
    </div>
  );
}
