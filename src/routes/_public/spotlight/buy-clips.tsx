import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import SpotlightPostGrid from "@/features/spotlight/components/SpotlightPostGrid";
import SpotlightRouteHeader from "@/features/spotlight/components/SpotlightRouteHeader";
import { BuyClipsSkeleton } from "@/features/spotlight/components/skeletons/BuyClipsSkeleton";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const Route = createFileRoute("/_public/spotlight/buy-clips")({
  loader: async ({ context }) => {
    await context.queryClient.ensureInfiniteQueryData(
      spotlightQueries.feedExplore(),
    );
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=120, s-maxage=120, stale-while-revalidate=600',
  }),
  pendingComponent: BuyClipsSkeleton,
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
    <div className="p-4">
      <SpotlightRouteHeader />
      <SpotlightPostGrid className="mt-8" isLoading={isFetchingNextPage}>
        {posts.map((post) => (
          <SpotlightPostCard key={post.id} post={post} />
        ))}
      </SpotlightPostGrid>

      {hasNextPage && <div ref={loadMoreRef} />}
    </div>
  );
}
