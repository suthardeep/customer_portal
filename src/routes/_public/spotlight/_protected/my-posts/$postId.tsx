import { Button } from "@/components/base/button/Button";
import { Chip } from "@/components/base/chip/Chip";
import Dialog from "@/components/base/Dialog";
import { Icon } from "@/components/base/icon";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { HlsVideoPlayer } from "@/features/spotlight/components/HlsVideoPlayer";
import { MyPostDetailSkeleton } from "@/features/spotlight/components/skeletons/MyPostDetailSkeleton";
import { SpotlightTaggedProductsStack } from "@/features/spotlight/components/SpotlightTaggedProductsStack";
import { STATS } from "@/features/spotlight/my-posts/constants";
import {
  getStatusChipColor,
  getStatusLabel,
} from "@/features/spotlight/my-posts/utils";
import { ShortVideoPlaceholder } from "@/features/spotlight/shorts/components/ShortVideoPlaceholder";
import { useDeletePostMutation } from "@/features/spotlight/spotlightMutations";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { MediaStatus } from "@/features/spotlight/types/enums";
import { useToggle } from "@/hooks/useToggle";
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
  const deleteDialog = useToggle();
  const deletePostMutation = useDeletePostMutation();

  return (
    <div>
      <AccountPageHeader
        title={"My Posts"}
        trailingTitleComponent={
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost">
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              variant="ghost"
              onClick={deleteDialog.open}
            >
              Delete
            </Button>
          </div>
        }
      />

      <div className="flex flex-col md:flex-row gap-6 items-start mt-8">
        {/* Center — media */}
        <div className="aspect-9/16 w-full max-w-110 mx-auto md:w-80 max-h-[70vh] overflow-hidden rounded-xl relative">
          {post.media.status === MediaStatus.READY ? (
            <HlsVideoPlayer
              hlsUrl={post.media.hlsUrl}
              thumbnail={post.media.thumbnail}
              alt={post.caption}
              className="size-full"
            />
          ) : (
            <ShortVideoPlaceholder
              status={post.media.status}
              thumbnail={post.media.thumbnail}
            />
          )}
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
      <Dialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        title="Delete Post"
        subTitle="Are you sure you want to delete this post? This action cannot be undone."
        size="sm"
        actions={{
          secondary: {
            label: "Cancel",
            onClick: deleteDialog.close,
          },
          primary: {
            label: "Delete",
            color: "danger",
            loading: deletePostMutation.isPending,
            onClick: () => deletePostMutation.mutate(postId),
          },
        }}
      />
    </div>
  );
}
