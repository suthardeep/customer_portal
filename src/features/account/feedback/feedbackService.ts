import type { BaseApiResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type { CreateFeedbackRequest } from "./types/types";

export const createFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: CreateFeedbackRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> =>
    apiRequest("/v1/feedback", {
      method: "POST",
      body: data,
      token: getToken(),
    }),
  );
