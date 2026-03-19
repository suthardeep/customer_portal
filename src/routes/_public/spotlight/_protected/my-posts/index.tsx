import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import SpotlightPostGrid from "@/features/spotlight/components/SpotlightPostGrid";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const Route = createFileRoute("/_public/spotlight/_protected/my-posts/")(
  {
    loader: async ({ context }) => {
      await context.queryClient.ensureInfiniteQueryData(
        spotlightQueries.myPosts(),
      );
    },
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
      <SpotlightPostGrid className="mt-8" isLoading={isFetchingNextPage}>
        {posts.map((post) => (
          <Link
            key={post.id}
            to="/spotlight/my-posts/$postId"
            params={{ postId: post.id }}
          >
            <SpotlightPostCard post={post} disableRedirect />
          </Link>
        ))}
      </SpotlightPostGrid>

      {hasNextPage && <div ref={loadMoreRef} />}
    </div>
  );
}
