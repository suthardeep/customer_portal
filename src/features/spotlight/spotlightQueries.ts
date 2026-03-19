import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import {
  getSpotlightProfile,
  getFeedExplore,
  getPostById,
  getCreatorAnalytics,
  getBookmarkedPosts,
  getCreatorTiers,
  getMyPosts,
  getMyPostById,
  getUserProfile,
  getUserPosts,
} from "./spotlightService";
import { spotlightKeys } from "./spotlightQueryFactory";

export const spotlightQueries = {
  profile: () =>
    queryOptions({
      queryKey: spotlightKeys.profile(),
      queryFn: async () => {
        const response = await getSpotlightProfile();
        return response.data;
      },
    }),

  feedExplore: (limit?: number) =>
    infiniteQueryOptions({
      queryKey: spotlightKeys.feedExplore(),
      queryFn: async ({ pageParam }) => {
        const response = await getFeedExplore({
          data: { cursor: pageParam, limit },
        });
        return response.data;
      },
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextCursor : undefined,
    }),

  postDetail: (postId: string) =>
    queryOptions({
      queryKey: spotlightKeys.postDetail(postId),
      queryFn: async () => {
        const response = await getPostById({ data: postId });
        return response.data;
      },
    }),

  creatorAnalytics: () =>
    queryOptions({
      queryKey: spotlightKeys.creatorAnalytics(),
      queryFn: async () => {
        const response = await getCreatorAnalytics();
        return response.data;
      },
    }),

  bookmarkedPosts: () =>
    infiniteQueryOptions({
      queryKey: spotlightKeys.bookmarkedPosts(),
      queryFn: async ({ pageParam }) => {
        const response = await getBookmarkedPosts({
          data: { page: pageParam },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),

  creatorTiers: () =>
    queryOptions({
      queryKey: spotlightKeys.creatorTiers(),
      queryFn: async () => {
        const response = await getCreatorTiers();
        return response.data;
      },
    }),

  myPosts: (params?: { currentPage?: number; pageSize?: number }) =>
    infiniteQueryOptions({
      queryKey: spotlightKeys.myPosts(),
      queryFn: async ({ pageParam }) => {
        const response = await getMyPosts({
          data: { currentPage: pageParam, ...params },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),

  myPostDetail: (postId: string) =>
    queryOptions({
      queryKey: spotlightKeys.myPostDetail(postId),
      queryFn: async () => {
        const response = await getMyPostById({ data: postId });
        return response.data;
      },
    }),

  userProfile: (customerId: string) =>
    queryOptions({
      queryKey: spotlightKeys.userProfile(customerId),
      queryFn: async () => {
        const response = await getUserProfile({ data: customerId });
        return response.data;
      },
    }),

  userPosts: (customerId: string) =>
    infiniteQueryOptions({
      queryKey: spotlightKeys.userPosts(customerId),
      queryFn: async ({ pageParam }) => {
        const response = await getUserPosts({
          data: { customerId, currentPage: pageParam },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),
};
