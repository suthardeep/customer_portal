export const userActivityKeys = {
  all: ["user-activities"] as const,
  recentViews: () => [...userActivityKeys.all, "recent-views"] as const,
};
