import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import SpotlightPostGrid from "@/features/spotlight/components/SpotlightPostGrid";
import SpotlightRouteHeader from "@/features/spotlight/components/SpotlightRouteHeader";
import { SpotlightPostCardSkeleton } from "@/features/spotlight/components/skeletons/SpotlightPostCardSkeleton";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

const LOAD_MORE_SKELETON_COUNT = 10;

export const Route = createFileRoute("/_public/spotlight/buy-clips")({
  loader: async ({ context }) => {
    await context.queryClient.ensureInfiniteQueryData(
      spotlightQueries.feedExplore(),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(spotlightQueries.feedExplore());

  const [loadMoreRef, entry] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data.pages.flatMap((page) => page.posts);

  return (
    <div>
      <SpotlightRouteHeader />

      <SpotlightPostGrid className="mt-8">
        {posts.map((post) => (
          <SpotlightPostCard key={post.id} post={post} />
        ))}
      </SpotlightPostGrid>

      {hasNextPage && (
        <div ref={loadMoreRef}>
          {isFetchingNextPage && (
            <SpotlightPostGrid>
              {Array.from({ length: LOAD_MORE_SKELETON_COUNT }, (_, i) => (
                <SpotlightPostCardSkeleton key={i} />
              ))}
            </SpotlightPostGrid>
          )}
        </div>
      )}
    </div>
  );
}
