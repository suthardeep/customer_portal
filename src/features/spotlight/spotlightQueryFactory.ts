export const spotlightKeys = {
  all: ["spotlight"] as const,
  profile: () => [...spotlightKeys.all, "profile"] as const,
  feedExplore: () => [...spotlightKeys.all, "feed-explore"] as const,
  postDetail: (id: string) => [...spotlightKeys.all, "post", id] as const,
  creatorAnalytics: () => [...spotlightKeys.all, "creator-analytics"] as const,
  bookmarkedPosts: () => [...spotlightKeys.all, "bookmarked-posts"] as const,
  creatorTiers: () => [...spotlightKeys.all, "creator-tiers"] as const,
  myPosts: () => [...spotlightKeys.all, "my-posts"] as const,
};
