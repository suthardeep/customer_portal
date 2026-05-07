import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { ApiError } from "@/utils/api";
import { getToken } from "@/utils/getToken";
import type { BaseApiResponse } from "@/types/baseApi.types";
import type {
  BookmarkToggleData,
  CreateDirectPostRequest,
  CreateSpotlightProfileRequest,
  CreatorAnalyticsResponse,
  CreatorStoreResponse,
  FeedExploreParams,
  FeedExploreResponse,
  LikeToggleData,
  MyPostsParams,
  MyPostsResponse,
  PostDetailResponse,
  ReportPostRequest,
  SpotlightProfile,
  SpotlightProfileResponse,
  UpdateSpotlightProfileRequest,
  UserPostsResponse,
} from "./types/types";
import type { CreatorTiersResponse } from "./types/analytics.types";
import type {
  BookmarkedPostsParams,
  BookmarkedPostsResponse,
} from "./types/index";

export const getBookmarkedPosts = createServerFn({ method: "GET" })
  .inputValidator((data: BookmarkedPostsParams) => data)
  .handler(async ({ data }): Promise<BookmarkedPostsResponse> => {
    const token = getToken();

    return apiRequest<BookmarkedPostsResponse>("/v1/ugc/posts/saved", {
      params: data,
      token,
    });
  });

export const getSpotlightProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<SpotlightProfileResponse> => {
    const token = getToken();
    try {
      return await apiRequest<SpotlightProfileResponse>("/v1/ugc/creators/me", { token });
    } catch (e) {
      if (e instanceof ApiError && e.statusCode === 404) {
        return { data: null, statusCode: 404 };
      }
      throw e;
    }
  },
);

export const getFeedExplore = createServerFn({ method: "GET" })
  .inputValidator((data: FeedExploreParams) => data)
  .handler(async ({ data }): Promise<FeedExploreResponse> => {
    const token = getToken();

    return apiRequest<FeedExploreResponse>("/v1/ugc/feed/explore", {
      params: data,
      token,
    });
  });

export const getPostById = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: postId }): Promise<PostDetailResponse> => {
    const token = getToken();

    return apiRequest<PostDetailResponse>(`/v1/ugc/posts/${postId}`, {
      token,
    });
  });

export const getCreatorAnalytics = createServerFn({ method: "GET" }).handler(
  async (): Promise<CreatorAnalyticsResponse> => {
    const token = getToken();

    return apiRequest<CreatorAnalyticsResponse>(
      "/v1/ugc/creators/me/analytics",
      {
        token,
      },
    );
  },
);

export const updateSpotlightProfile = createServerFn({ method: "POST" })
  .inputValidator((data: UpdateSpotlightProfileRequest) => data)
  .handler(async ({ data }): Promise<SpotlightProfileResponse> => {
    const token = getToken();

    return apiRequest<SpotlightProfileResponse>("/v1/ugc/creators/me", {
      method: "PATCH",
      body: data,
      token,
    });
  });

export const onboardCreator = createServerFn({ method: "POST" })
  .inputValidator((data: CreateSpotlightProfileRequest) => data)
  .handler(async ({ data }): Promise<SpotlightProfileResponse> => {
    const token = getToken();

    return apiRequest<SpotlightProfileResponse>("/v1/ugc/creators/onboard", {
      method: "POST",
      body: data,
      token,
    });
  });

export const getCreatorTiers = createServerFn({ method: "GET" }).handler(
  async (): Promise<CreatorTiersResponse> => {
    return apiRequest<CreatorTiersResponse>("/v1/ugc/tiers");
  },
);

export const getMyPosts = createServerFn({ method: "GET" })
  .inputValidator((data: MyPostsParams) => data)
  .handler(async ({ data }): Promise<MyPostsResponse> => {
    const token = getToken();

    return apiRequest<MyPostsResponse>("/v1/ugc/posts/me", {
      params: data,
      token,
    });
  });

export const getMyPostById = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: postId }): Promise<PostDetailResponse> => {
    const token = getToken();

    return apiRequest<PostDetailResponse>(`/v1/ugc/posts/me/${postId}`, {
      token,
    });
  });

export const getCreatorStore = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: customerId }): Promise<CreatorStoreResponse> => {
    const token = getToken();
    return apiRequest<CreatorStoreResponse>(
      `/v1/ugc/creators/${customerId}/store`,
      { token },
    );
  });

export const getUserProfile = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(
    async ({
      data: customerId,
    }): Promise<BaseApiResponse<SpotlightProfile>> => {
      const token = getToken();

      return apiRequest<BaseApiResponse<SpotlightProfile>>(
        `/v1/ugc/creators/${customerId}`,
        {
          token,
        },
      );
    },
  );

export const getUserPosts = createServerFn({ method: "GET" })
  .inputValidator((data: { customerId: string } & MyPostsParams) => data)
  .handler(
    async ({ data: { customerId, ...params } }): Promise<UserPostsResponse> => {
      const token = getToken();

      return apiRequest<UserPostsResponse>(
        `/v1/ugc/creators/${customerId}/posts`,
        {
          params,
          token,
        },
      );
    },
  );

export const createPost = createServerFn({ method: "POST" })
  .inputValidator((data: CreateDirectPostRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<{ id: string }>> => {
    const token = getToken();
    return apiRequest<BaseApiResponse<{ id: string }>>("/v1/ugc/posts", {
      method: "POST",
      body: data,
      token,
    });
  });

export const toggleLike = createServerFn({ method: "POST" })
  .inputValidator((data: string) => data)
  .handler(
    async ({ data: postId }): Promise<BaseApiResponse<LikeToggleData>> => {
      const token = getToken();

      return apiRequest<BaseApiResponse<LikeToggleData>>(
        `/v1/ugc/posts/${postId}/like`,
        { method: "POST", token },
      );
    },
  );

export const toggleBookmark = createServerFn({ method: "POST" })
  .inputValidator((data: string) => data)
  .handler(
    async ({ data: postId }): Promise<BaseApiResponse<BookmarkToggleData>> => {
      const token = getToken();

      return apiRequest<BaseApiResponse<BookmarkToggleData>>(
        `/v1/ugc/posts/${postId}/bookmark`,
        { method: "POST", token },
      );
    },
  );

export const recordPostView = createServerFn({ method: "POST" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: postId }): Promise<BaseApiResponse<void>> => {
    const token = getToken();

    return apiRequest<BaseApiResponse<void>>(`/v1/ugc/posts/${postId}/view`, {
      method: "POST",
      token,
    });
  });

export const reportPost = createServerFn({ method: "POST" })
  .inputValidator((data: ReportPostRequest) => data)
  .handler(async ({ data: { postId, ...body } }): Promise<BaseApiResponse<null>> => {
    const token = getToken();

    return apiRequest<BaseApiResponse<null>>(`/v1/ugc/posts/${postId}/report`, {
      method: "POST",
      body,
      token,
    });
  });

export const deletePost = createServerFn({ method: "POST" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: postId }): Promise<BaseApiResponse<null>> => {
    const token = getToken();

    return apiRequest<BaseApiResponse<null>>(`/v1/ugc/posts/${postId}`, {
      method: "DELETE",
      token,
    });
  });
