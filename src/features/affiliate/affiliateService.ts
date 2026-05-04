import type { BaseApiResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type {
  AffiliateLinkResponse,
  CreateAppInviteLinkRequest,
  CreateProductShareLinkRequest,
  CreateReferralShareLinkRequest,
  CreateStoreShareLinkRequest,
  CreateUgcShareLinkRequest,
  ResolveShareCodeRequest,
  ResolveShareCodeResponse,
} from "./types/types";

export const resolveShareCode = createServerFn({ method: "GET" })
  .inputValidator((data: ResolveShareCodeRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<ResolveShareCodeResponse>> => {
      return apiRequest(`/v1/s/${data.code}`, {
        params: { platform: data.platform },
      });
    },
  );

export const createProductShareLink = createServerFn({ method: "POST" })
  .inputValidator((data: CreateProductShareLinkRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<AffiliateLinkResponse>> => {
      const token = getToken();
      return apiRequest("/v1/affiliate/links/product", {
        method: "POST",
        body: data,
        token,
      });
    },
  );

export const createUgcShareLink = createServerFn({ method: "POST" })
  .inputValidator((data: CreateUgcShareLinkRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<AffiliateLinkResponse>> => {
      const token = getToken();
      return apiRequest("/v1/affiliate/links/ugc", {
        method: "POST",
        body: data,
        token,
      });
    },
  );

export const createStoreShareLink = createServerFn({ method: "POST" })
  .inputValidator((data: CreateStoreShareLinkRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<AffiliateLinkResponse>> => {
      const token = getToken();
      return apiRequest("/v1/affiliate/links/store", {
        method: "POST",
        body: data,
        token,
      });
    },
  );

export const createReferralShareLink = createServerFn({ method: "POST" })
  .inputValidator((data: CreateReferralShareLinkRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<AffiliateLinkResponse>> => {
      const token = getToken();
      return apiRequest("/v1/affiliate/links/referral", {
        method: "POST",
        body: data,
        token,
      });
    },
  );

export const createAppInviteLink = createServerFn({ method: "POST" })
  .inputValidator((data: CreateAppInviteLinkRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<AffiliateLinkResponse>> => {
      const token = getToken();
      return apiRequest("/v1/affiliate/links/app-invite", {
        method: "POST",
        body: data,
        token,
      });
    },
  );
