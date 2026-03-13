import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import type {
  HomepageResponse,
  SectionContentResponse,
  SectionResponse,
} from "./types/types";

export const getHomepageConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomepageResponse> => {
    return apiRequest<HomepageResponse>("/v2/homepage/list/public");
  },
);

export const getSectionById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<SectionResponse> => {
    return apiRequest<SectionResponse>(`/v1/section/${id}`);
  });

export const getSectionContent = createServerFn({ method: "GET" })
  .inputValidator((actionApi: string) => actionApi)
  .handler(async ({ data: actionApi }): Promise<SectionContentResponse> => {
    const endpoint = actionApi.startsWith("/api")
      ? actionApi.slice(4)
      : actionApi;
    return apiRequest<SectionContentResponse>(endpoint);
  });
