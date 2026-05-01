import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import type { PolicyResponse, PolicyTypeEnum } from "./types/types";

export const getPolicy = createServerFn({ method: "GET" })
  .inputValidator((type: PolicyTypeEnum) => type)
  .handler(async ({ data: type }): Promise<PolicyResponse> => {
    return apiRequest<PolicyResponse>(`/v1/policy/${type}`);
  });
