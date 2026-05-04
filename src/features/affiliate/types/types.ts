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
}

export interface CreateUgcShareLinkRequest {
  targetId: string;
}

export interface CreateStoreShareLinkRequest {
  targetId: string;
}

export interface CreateReferralShareLinkRequest {
  targetId: string;
}

export type CreateAppInviteLinkRequest = Record<string, never>;

export interface ResolveShareCodeRequest {
  code: string;
  platform: "android" | "ios" | "web";
}

export interface ResolveShareCodeResponse {
  url: string;
}
