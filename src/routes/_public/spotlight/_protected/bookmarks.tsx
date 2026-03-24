import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { BookmarksEmptyState } from "@/features/spotlight/bookmarks/components/BookmarksEmptyState";
import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import SpotlightPostGrid from "@/features/spotlight/components/SpotlightPostGrid";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

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
      <div className="mt-8">
        {posts.length === 0 ? (
          <BookmarksEmptyState />
        ) : (
          <SpotlightPostGrid isLoading={isFetchingNextPage}>
            {posts.map((post) => (
              <SpotlightPostCard key={post.id} post={post} showBookmark />
            ))}
          </SpotlightPostGrid>
        )}
      </div>

      {hasNextPage && <div ref={loadMoreRef} />}
    </div>
  );
}
