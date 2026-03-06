export const reviewKeys = {
  all: ["reviews"] as const,
  myReviews: () => [...reviewKeys.all, "my-reviews"] as const,
};
