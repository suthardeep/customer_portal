import type { QuickActionCard, SidebarSection } from "./types/types";

export const QUICK_ACTION_CARDS: QuickActionCard[] = [
  {
    label: "My orders",
    icon: "ShoppingCart",
    to: "/account/my-orders",
  },
  {
    label: "Wallet",
    icon: "Wallet",
    to: "/account/wallet",
  },
];

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Account",
    items: [
      {
        label: "My Address",
        icon: "Location",
        to: "/account/my-address",
      },
      {
        label: "My wishlist",
        icon: "Heart",
        to: "/account/wishlist",
      },
      {
        label: "Subscription",
        icon: "Bell",
        to: "/subscription",
      },
    ],
  },
  {
    title: "Earn & Grow",
    items: [
      {
        label: "Become a Seller",
        icon: "Store",
        to: "/",
      },
      {
        label: "Referral link",
        icon: "Link",
        to: "/account/refer-and-earn",
      },
    ],
  },
  {
    title: "Discount",
    items: [
      {
        label: "Coupons",
        icon: "Coupon",
        to: "/",
      },
    ],
  },
  {
    title: "Help Center",
    items: [
      {
        label: "Support",
        icon: "Support",
        to: "/",
      },
      {
        label: "Feedback & Suggestion",
        icon: "Feedback",
        to: "/",
      },
    ],
  },
];
