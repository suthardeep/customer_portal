export enum SubscriptionType {
  NORMAL = "NORMAL",
  PREMIUM = "PREMIUM",
}

export enum SubscriptionStatus {
  CREATED = "CREATED", // sub created, awaiting first payment
  AUTHENTICATED = "AUTHENTICATED", // first payment auth confirmed, awaiting activation
  ACTIVE = "ACTIVE", // billing ongoing
  PENDING = "PENDING", // renewal payment due/retrying (still premium)
  PAUSED = "PAUSED", // explicitly paused; downgraded to NORMAL
  HALTED = "HALTED", // payment failed after retries; downgraded to NORMAL
  CANCELLED = "CANCELLED", // user cancelled; premium until currentPeriodEnd
  COMPLETED = "COMPLETED", // all billing cycles done; downgraded to NORMAL
  RESUMED = "RESUMED", // resumed from paused; back to PREMIUM
  EXPIRED = "EXPIRED", // currentPeriodEnd passed, downgraded to NORMAL
}

export enum SubscriptionPeriod {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}
