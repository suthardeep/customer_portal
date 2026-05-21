export const affiliateKeys = {
  all: ["affiliate"] as const,
  referralLink: (referralCode: string) =>
    [...affiliateKeys.all, "referralLink", referralCode] as const,
  productShareLink: (productId: string, variantId?: string) =>
    [...affiliateKeys.all, "productShareLink", productId, variantId] as const,
};
