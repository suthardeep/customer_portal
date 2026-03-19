import { Image } from "@/components/base/Image";
import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import SpotlightPostGrid from "@/features/spotlight/components/SpotlightPostGrid";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const Route = createFileRoute("/_public/spotlight/users/$userId")({
  loader: async ({ context, params }) => {
    context.queryClient.ensureQueryData(
      spotlightQueries.userProfile(params.userId),
    );
    context.queryClient.ensureInfiniteQueryData(
      spotlightQueries.userPosts(params.userId),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();

  const { data: profile } = useSuspenseQuery(
    spotlightQueries.userProfile(userId),
  );
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(spotlightQueries.userPosts(userId));

  const [loadMoreRef, entry] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data.pages.flatMap((page) => page.data);

  const stats = [
    { value: profile.postCount, label: "Posts" },
    { value: profile.totalViewCount, label: "Views" },
  ];

  return (
    <div className="space-y-6">
      {/* User details row */}
      <div className="flex items-center gap-4">
        <div className="size-20 overflow-hidden rounded-full border border-n-400 shrink-0">
          <Image
            src={profile.profileImageUrl}
            alt={profile.name}
            className="size-full rounded-full object-cover"
          />
        </div>
        <div className="space-y-1.5">
          <h5 className="font-semibold text-n-900">{profile.name}</h5>
          {profile.bio && (
            <p className="text-n-800 line-clamp-2">{profile.bio}</p>
          )}
          <div className="flex gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-1 rounded-full bg-p-50 px-3 py-1"
              >
                <span className="font-bold text-n-900">{stat.value}</span>
                <span className="font-medium text-n-800">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <SpotlightPostGrid isLoading={isFetchingNextPage}>
        {posts.map((post) => (
          <SpotlightPostCard key={post.id} post={post} />
        ))}
      </SpotlightPostGrid>

      {hasNextPage && <div ref={loadMoreRef} />}
    </div>
  );
}
