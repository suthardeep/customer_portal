import { queryClient } from "@/queryClient";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import type { FeedPost } from "@/features/spotlight/types/feed.types";

export function prefetchUpcomingPosts(
  posts: FeedPost[],
  currentIndex: number,
  count = 5,
) {
  const upcoming = posts.slice(currentIndex, currentIndex + 1 + count);
  for (const post of upcoming) {
    queryClient.prefetchQuery(spotlightQueries.postDetail(post.id));
  }
}
