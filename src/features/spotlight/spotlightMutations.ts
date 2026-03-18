import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { spotlightKeys } from "./spotlightQueryFactory";
import { toggleBookmark, toggleLike, updateSpotlightProfile } from "./spotlightService";
import type { PostDetail } from "./types/feed.types";
import type { UpdateSpotlightProfileRequest } from "./types/types";


export const useToggleLikeMutation = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await toggleLike({ data: postId });
      return { postId, data: response.data };
    },
    onSuccess: ({ postId, data }) => {
      queryClient.setQueryData<PostDetail>(
        spotlightKeys.postDetail(postId),
        (prev) =>
          prev
            ? {
                ...prev,
                isLiked: data.isLiked,
                stats: { ...prev.stats, likes: data.likes },
              }
            : prev,
      );
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useToggleBookmarkMutation = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await toggleBookmark({ data: postId });
      return { postId, data: response.data };
    },
    onSuccess: ({ postId, data }) => {
      queryClient.setQueryData<PostDetail>(
        spotlightKeys.postDetail(postId),
        (prev) =>
          prev
            ? {
                ...prev,
                isBookmarked: data.isBookmarked,
                stats: { ...prev.stats, bookmarks: data.bookmarks },
              }
            : prev,
      );
      queryClient.invalidateQueries({
        queryKey: spotlightKeys.bookmarkedPosts(),
      });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useUpdateSpotlightProfileMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateSpotlightProfileRequest) => {
      const response = await updateSpotlightProfile({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotlightKeys.profile() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
