import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { MyPostsEmptyState } from "@/features/spotlight/my-posts/components/MyPostsEmptyState";
import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import SpotlightPostGrid from "@/features/spotlight/components/SpotlightPostGrid";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const Route = createFileRoute("/_public/spotlight/_protected/my-posts/")(
  {
    loader: async ({ context }) => {
      await context.queryClient.ensureInfiniteQueryData(
        spotlightQueries.myPosts(),
      );
    },
    headers: () => ({
      'Cache-Control': 'private, no-store',
    }),
    component: RouteComponent,
  },
);

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(spotlightQueries.myPosts());

  const [loadMoreRef, entry] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data.pages.flatMap((page) => page.data);

  return (
    <div>
      <AccountPageHeader title="My Posts" />
      <div className="mt-8">
        {posts.length === 0 ? (
          <MyPostsEmptyState />
        ) : (
          <SpotlightPostGrid isLoading={isFetchingNextPage}>
            {posts.map((post) => (
              <SpotlightPostCard
                key={post.id}
                post={post}
                linkTo="/spotlight/my-posts/$postId"
                linkParams={{ postId: post.id }}
              />
            ))}
          </SpotlightPostGrid>
        )}
      </div>

      {hasNextPage && <div ref={loadMoreRef} />}
    </div>
  );
}
