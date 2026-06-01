export type AffiliateLinkType =
  | "PRODUCT_SHARE"
  | "STORE"
  | "UGC_CONTENT"
  | "CREATOR_STORE"
  | "APP_INVITE"
  | "REFERRAL_INVITE"
  | "REEL_SHARE";

export type AffiliateLinkTargetType =
  | "PRODUCT"
  | "UGC_POST"
  | "CREATOR_STORE"
  | "REFERRAL"
  | "APP_HOME";

export interface AffiliateLinkResponse {
  id: string;
  code: string;
  url: string;
  productId: string | null;
  linkType: AffiliateLinkType;
  targetType: AffiliateLinkTargetType;
  targetId: string | null;
  airbridgeUrl?: string | null;
  fallbackUrl?: string | null;
  clickCount: number;
  conversionCount: number;
  expiresAt: string | null;
  createdAt: string;
}

export interface CreateProductShareLinkRequest {
  productId: string;
  variantId?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateUgcShareLinkRequest {
  targetId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateStoreShareLinkRequest {
  targetId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateReferralShareLinkRequest {
  targetId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateAppInviteLinkRequest {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface ResolveShareCodeRequest {
  code: string;
  platform: "android" | "ios" | "web";
}

export interface ResolveShareCodeResponse {
  url: string;
}
