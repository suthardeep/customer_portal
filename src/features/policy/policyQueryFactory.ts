import type { PolicyTypeEnum } from "./types/types";

export const policyKeys = {
  all: ["policy"] as const,
  detail: (type: PolicyTypeEnum) => [...policyKeys.all, type] as const,
};
