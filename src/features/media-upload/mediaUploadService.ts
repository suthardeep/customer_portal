import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { BaseApiResponse } from "@/types/baseApi.types";
import type {
  BulkStartRequest,
  BulkStartResponse,
  BulkFinishRequest,
  BulkFinishResponse,
} from "./types/types";

export const bulkStartUpload = createServerFn({ method: "POST" })
  .inputValidator((data: BulkStartRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<BulkStartResponse>> => {
      const token = getToken();

      return apiRequest<BaseApiResponse<BulkStartResponse>>(
        "/v1/media/upload/bulk-start",
        {
          method: "POST",
          body: data,
          token,
        },
      );
    },
  );

export const bulkFinishUpload = createServerFn({ method: "POST" })
  .inputValidator((data: BulkFinishRequest) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<BulkFinishResponse>> => {
      const token = getToken();

      return apiRequest<BaseApiResponse<BulkFinishResponse>>(
        "/v1/media/upload/bulk-finish",
        {
          method: "POST",
          body: data,
          token,
        },
      );
    },
  );
