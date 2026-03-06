export interface WalletBalance {
  earnedBalance: number;
  purchasedBalance: number;
  totalBalance: number;
  totalEarned: number;
  totalSpent: number;
  totalWithdrawn: number;
  totalPurchased: number;
  heldBalance: number;
  isActive: boolean;
}

import {
  TransactionDirectionEnum,
  TransactionPoolEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from "./enums";

export interface TransactionBalanceAfter {
  total: number;
  earned: number;
  purchased: number;
}

export interface WalletTransaction {
  id: string;
  type: TransactionTypeEnum;
  direction: TransactionDirectionEnum;
  pool: TransactionPoolEnum;
  amount: number;
  balanceAfter: TransactionBalanceAfter;
  source: string;
  referenceType: string;
  referenceId: string;
  description: string;
  metadata: Record<string, string | number>;
  status: TransactionStatusEnum;
  createdAt: string;
}

export type WithdrawalStatus = "PROCESSING" | "CONFIRMED" | "FAILED" | "CANCELLED";

export interface WithdrawalBankDetails {
  ifsc: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface TopUpRequest {
  amount: number;
  description: string;
}

export interface TopUpResponse {
  transactionId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface VerifyTopUpRequest {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}

export interface WithdrawRequest {
  amount: number;
  bankAccount: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
  };
}

export interface WalletWithdrawal {
  id: string;
  customerId: string;
  amount: string;
  amountInr: string;
  status: WithdrawalStatus;
  bankDetails: WithdrawalBankDetails;
  processedByAdminId: string | null;
  processedAt: string | null;
  adminNotes: string | null;
  walletTransactionId: string;
  razorpayPayoutId: string | null;
  razorpayContactId: string | null;
  razorpayFundAccountId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
