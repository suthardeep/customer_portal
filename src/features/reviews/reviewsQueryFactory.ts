export const reviewKeys = {
  all: ["reviews"] as const,
  myReviews: () => [...reviewKeys.all, "my-reviews"] as const,
  productReviewStats: (productId: string) =>
    [...reviewKeys.all, "stats", productId] as const,
  productReviews: (productId: string, params?: { currentPage?: number; pageSize?: number }) =>
    [...reviewKeys.all, "list", productId, params] as const,
  productReviewsInfinite: (productId: string) =>
    [...reviewKeys.all, "infinite", productId] as const,
};
