import { Button } from "@/components/base/button/Button";
import { Chip } from "@/components/base/chip/Chip";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { HlsVideoPlayer } from "@/features/spotlight/components/HlsVideoPlayer";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { MyPostDetailSkeleton } from "@/features/spotlight/components/skeletons/MyPostDetailSkeleton";
import { SpotlightTaggedProductsStack } from "@/features/spotlight/components/SpotlightTaggedProductsStack";
import { STATS } from "@/features/spotlight/my-posts/constants";
import {
  getStatusChipColor,
  getStatusLabel,
} from "@/features/spotlight/my-posts/utils";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { prettyDate } from "@/utils/formatDateTime";
import { prettyNumber } from "@/utils/prettyNumber";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_public/spotlight/_protected/my-posts/$postId",
)({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      spotlightQueries.myPostDetail(params.postId),
    );
  },
  pendingComponent: MyPostDetailSkeleton,
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery(
    spotlightQueries.myPostDetail(postId),
  );

  return (
    <div>
      <AccountPageHeader
        title={"My Posts"}
        trailingTitleComponent={
          <Button size="sm" variant="ghost">
            Edit
          </Button>
        }
      />
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Center — media */}
        <div className="aspect-9/16 w-full max-w-110 mx-auto md:w-80 max-h-[70vh] overflow-hidden rounded-xl">
          <HlsVideoPlayer
            hlsUrl={post.media.hlsUrl}
            thumbnail={post.media.thumbnail}
            alt={post.caption}
            className="size-full"
          />
        </div>

        {/* Right — details */}
        <div className="flex flex-col gap-6 w-full">
          {/* Status */}
          <div className="flex items-center justify-between gap-4">
            <Chip color={getStatusChipColor(post.status)} size="sm">
              {getStatusLabel(post.status)}
            </Chip>
            <p className="font-medium text-n-800">
              {" "}
              Posted on {prettyDate(post.createdAt)}{" "}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:w-fit">
            {STATS.map(({ icon, key, label, iconBg, iconColor }) => (
              <div
                key={key}
                className="flex flex-col gap-3 min-w-32 rounded-2xl items-center border border-n-400 bg-n-50 p-4"
              >
                <div
                  className={`flex size-9 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon name={icon} size="md" className={iconColor} />
                </div>
                <p className="text-xl font-bold text-n-950">
                  {prettyNumber(post.stats[key])}
                </p>
                <span className="text-n-800">{label}</span>
              </div>
            ))}
          </div>

          {/* Caption */}
          {post.caption && <p className="text-n-900">{post.caption}</p>}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-n-100 px-3 py-1 text-sm text-n-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Tagged Products */}
          <SpotlightTaggedProductsStack products={post.taggedProducts} />
        </div>
      </div>
    </div>
  );
}
