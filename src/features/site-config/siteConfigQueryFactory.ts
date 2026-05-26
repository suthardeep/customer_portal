export const siteConfigKeys = {
  all: ["site-config"] as const,
  detail: () => [...siteConfigKeys.all, "detail"] as const,
};
