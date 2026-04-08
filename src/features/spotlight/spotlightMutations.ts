import { showErrorToasts, toast } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { spotlightKeys } from "./spotlightQueryFactory";
import {
  createPost,
  deletePost,
  onboardCreator,
  reportPost,
  toggleBookmark,
  toggleLike,
  updateSpotlightProfile,
} from "./spotlightService";
import type { CreateDirectPostRequest, PostDetail, ReportPostRequest } from "./types/feed.types";
import type {
  CreateSpotlightProfileRequest,
  UpdateSpotlightProfileRequest,
} from "./types/types";

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

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateDirectPostRequest) => {
      const response = await createPost({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotlightKeys.myPosts() });
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
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useOnboardCreatorMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: CreateSpotlightProfileRequest) => {
      const response = await onboardCreator({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotlightKeys.profile() });
      router.navigate({ to: "/spotlight/edit-profile" });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useReportPostMutation = () => {
  return useMutation({
    mutationFn: async (data: ReportPostRequest) => {
      const response = await reportPost({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useDeletePostMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await deletePost({ data: postId });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotlightKeys.myPosts() });
      router.navigate({ to: "/spotlight/my-posts" });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
