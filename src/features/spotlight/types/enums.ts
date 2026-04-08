export enum UgcPostType {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
}

export enum PostStatus {
  PENDING_REVIEW = "pending_review",
  PUBLISHED = "published",
  REJECTED = "rejected",
  ARCHIVED = "archived",
}

export enum MediaStatus {
  READY = "ready",
  PROCESSING = "processing",
  FAILED = "failed",
}

export enum ReportReason {
  SPAM = "SPAM",
  INAPPROPRIATE = "INAPPROPRIATE",
  FAKE_PRODUCT = "FAKE_PRODUCT",
  MISLEADING = "MISLEADING",
  OTHER = "OTHER",
}
