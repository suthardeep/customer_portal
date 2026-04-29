import { PaymentMethod } from "./types/types";

export const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: "CreditCard" | "Cash";
}[] = [
  {
    value: "PREPAID",
    label: "Pay Online",
    description: "UPI, Cards, Net Banking via Razorpay",
    icon: "CreditCard",
  },
  {
    value: "COD",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "Cash",
  },
];
