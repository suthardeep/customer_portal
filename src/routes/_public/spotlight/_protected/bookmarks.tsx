import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import SpotlightPostGrid from "@/features/spotlight/components/SpotlightPostGrid";
import { SpotlightPostCardSkeleton } from "@/features/spotlight/components/skeletons/SpotlightPostCardSkeleton";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

const LOAD_MORE_SKELETON_COUNT = 10;

export const Route = createFileRoute("/_public/spotlight/_protected/bookmarks")(
  {
    loader: async ({ context }) => {
      await context.queryClient.ensureInfiniteQueryData(
        spotlightQueries.bookmarkedPosts(),
      );
    },
    component: RouteComponent,
  },
);

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(spotlightQueries.bookmarkedPosts());

  const [loadMoreRef, entry] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data.pages.flatMap((page) => page.data);

  return (
    <div>
      <AccountPageHeader title="Bookmarks" />

      <SpotlightPostGrid className="mt-8">
        {posts.map((post) => (
          <SpotlightPostCard key={post.id} post={post} showBookmark />
        ))}
      </SpotlightPostGrid>

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {isFetchingNextPage &&
            Array.from({ length: LOAD_MORE_SKELETON_COUNT }, (_, i) => (
              <SpotlightPostCardSkeleton key={i} />
            ))}
        </div>
      )}
    </div>
  );
}
