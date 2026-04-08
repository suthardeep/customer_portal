import { createFileRoute } from "@tanstack/react-router";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { ShortFeedScroller } from "@/features/spotlight/shorts/components/ShortFeedScroller";
import { ShortFeedSkeleton } from "@/features/spotlight/shorts/components/skeletons/ShortFeedSkeleton";

export const Route = createFileRoute("/_public/spotlight/shorts/$id")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      spotlightQueries.postDetail(params.id),
    );
  },
  component: RouteComponent,
  pendingComponent: ShortFeedSkeleton,
  staticData: {
    hideHeader: "mobile",
    showBottomBar: false,
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <ShortFeedScroller initialPostId={id} />;
}
