export enum TransactionTypeEnum {
  EARN = "EARN",
  SPEND = "SPEND",
  WITHDRAW = "WITHDRAW",
  PURCHASE = "PURCHASE",
  EXPIRE = "EXPIRE",
  REVERSE = "REVERSE",
}

export enum TransactionDirectionEnum {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum TransactionPoolEnum {
  EARNED = "EARNED",
  PURCHASED = "PURCHASED",
  BOTH = "BOTH",
}

export enum TransactionStatusEnum {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  REVERSED = "REVERSED",
}

export enum WalletOwnerType {
  CUSTOMER = "CUSTOMER",
  VENDOR = "VENDOR",
  ADMIN = "ADMIN",
}

export enum TransactionSourceEnum {
  // Customer Specific
  ORDER_EARN = "ORDER_EARN",
  ORDER_DISCOUNT = "ORDER_DISCOUNT",
  REFERRAL = "REFERRAL",
  AFFILIATE = "AFFILIATE",
  UGC_CAMPAIGN = "UGC_CAMPAIGN",
  REVIEW = "REVIEW",
  BONUS = "BONUS",
  TOPUP = "TOPUP",

  // Vendor Specific
  SALES_REVENUE = "SALES_REVENUE",
  WAREHOUSE_RENT = "WAREHOUSE_RENT",
  PPC_AD = "PPC_AD",
  CAMPAIGN_FEE = "CAMPAIGN_FEE",
  APPRAISAL_FEE = "APPRAISAL_FEE",
  WITHDRAWAL = "WITHDRAWAL",

  // System
  MANUAL = "MANUAL",
  SYSTEM_CORRECTION = "SYSTEM_CORRECTION",
}
