import type { BaseApiResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type { GstProfile, SaveGstFormData, SaveGstResponse, UpdateGstRequest } from "./types/types";

export const saveGstDetails = createServerFn({ method: "POST" })
  .inputValidator((data: SaveGstFormData) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<SaveGstResponse>> =>
    apiRequest("/v1/customer/gst", {
      method: "POST",
      body: data,
      token: getToken(),
    }),
  );

export const getGstProfiles = createServerFn({ method: "GET" }).handler(
  async (): Promise<BaseApiResponse<GstProfile[]>> =>
    apiRequest("/v1/customer/gst", { token: getToken() }),
);

export const getGstProfileById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<BaseApiResponse<GstProfile>> =>
    apiRequest(`/v1/customer/gst/${id}`, { token: getToken() }),
  );

export const updateGstProfile = createServerFn({ method: "POST" })
  .inputValidator((data: UpdateGstRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<GstProfile>> => {
    const { id, ...body } = data;
    return apiRequest(`/v1/customer/gst/${id}`, {
      method: "PATCH",
      body,
      token: getToken(),
    });
  });

export const deleteGstProfile = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<BaseApiResponse<void>> =>
    apiRequest(`/v1/customer/gst/${id}`, { method: "DELETE", token: getToken() }),
  );
