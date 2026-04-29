export const cartKeys = {
  all: ["cart"] as const,
  detail: () => [...cartKeys.all, "detail"] as const,
  coupons: () => [...cartKeys.all, "coupons"] as const,
  availableCoupons: (params: object) => [...cartKeys.coupons(), params] as const,
  summaries: () => [...cartKeys.all, "summary"] as const,
  summary: (params: object) => [...cartKeys.summaries(), params] as const,
};
