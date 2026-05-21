import { queryOptions } from "@tanstack/react-query";
import { createProductShareLink, createReferralShareLink } from "./affiliateService";
import { affiliateKeys } from "./affiliateQueryFactory";

export const affiliateQueries = {
  referralLink: (referralCode: string) =>
    queryOptions({
      queryKey: affiliateKeys.referralLink(referralCode),
      queryFn: async () => {
        const response = await createReferralShareLink({
          data: { targetId: referralCode },
        });
        return response.data;
      },
      staleTime: Infinity,
      enabled: !!referralCode,
    }),
  productShareLink: (productId: string, variantId?: string) =>
    queryOptions({
      queryKey: affiliateKeys.productShareLink(productId, variantId),
      queryFn: async () => {
        const response = await createProductShareLink({
          data: { productId, variantId },
        });
        return response.data;
      },
      staleTime: Infinity,
      enabled: !!productId,
    }),
};
