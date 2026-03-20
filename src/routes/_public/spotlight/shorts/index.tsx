import Spinner from "@/components/compound/spinner/Spinner";
import FallbackView from "@/components/empty-states/FallbackView";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/spotlight/shorts/")({
  beforeLoad: async ({ context }) => {
    const data = await context.queryClient.ensureInfiniteQueryData(
      spotlightQueries.feedExplore(),
    );
    const firstPost = data.pages[0]?.posts[0];
    if (firstPost) {
      throw redirect({
        to: "/spotlight/shorts/$id",
        params: { id: firstPost.id },
      });
    }
  },
  pendingComponent: () => (
    <div className="h-[80dvh] w-full fall">
      <Spinner size={40} />
    </div>
  ),
  errorComponent: () => (
    <FallbackView title="Oops" subtitle="We are unable to fetch shorts" />
  ),
});
