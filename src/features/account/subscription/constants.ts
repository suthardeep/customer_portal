export type SubscriptionPlan = {
  id: "yearly" | "monthly";
  title: string;
  billingAmount: number;
  billingLabel: string;
  monthlyPrice: number;
  isBestOffer: boolean;
  trialLabel?: string;
};

export const SUBSCRIPTION_FEATURES = [
  { id: "early-deal", label: "Early deal access" },
  { id: "prime-categories", label: "Prime-only categories" },
  { id: "affiliate", label: "Create affiliate stores" },
  { id: "withdrawals", label: "Instant withdrawals" },
  { id: "delivery", label: "Free delivery", isFullWidth: true },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "yearly",
    title: "Yearly Plan",
    billingAmount: 1499,
    billingLabel: "billed every year",
    monthlyPrice: 125,
    isBestOffer: true,
  },
  {
    id: "monthly",
    title: "Monthly Plan",
    billingAmount: 199,
    billingLabel: "",
    monthlyPrice: 199,
    isBestOffer: false,
    trialLabel: "7 days",
  },
];
