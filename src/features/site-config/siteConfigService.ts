import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import type { BaseApiResponse } from "@/types/baseApi.types";
import type { SiteConfig } from "./types/types";

export const getSiteConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<BaseApiResponse<SiteConfig>> => {
    return apiRequest<BaseApiResponse<SiteConfig>>("/v1/site-config");
  },
);
