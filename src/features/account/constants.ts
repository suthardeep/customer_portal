import type { QuickActionCard, SidebarSection } from "./types/types";

export const QUICK_ACTION_CARDS: QuickActionCard[] = [
  {
    label: "My order",
    icon: "ShoppingCart",
    to: "/account/orders",
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
        label: "Address",
        icon: "Location",
        to: "/account/addresses",
      },
      {
        label: "My wishlist",
        icon: "Heart",
        to: "/account/wishlist",
      },
      {
        label: "Subscription",
        icon: "Bell",
        to: "/account/subscription",
      },
    ],
  },
  {
    title: "Earn & Grow",
    items: [
      {
        label: "Studio",
        icon: "VideoCameraSpark",
        to: "/account/studio",
      },
      {
        label: "Become a Seller",
        icon: "Store",
        to: "/account/seller",
      },
      {
        label: "Referral link",
        icon: "Link",
        to: "/account/referral",
      },
    ],
  },
  {
    title: "Discount",
    items: [
      {
        label: "Coupons",
        icon: "Coupon",
        to: "/account/coupons",
      },
    ],
  },
  {
    title: "Help Center",
    items: [
      {
        label: "Support",
        icon: "Support",
        to: "/account/support",
      },
      {
        label: "Feedback & Suggestion",
        icon: "Feedback",
        to: "/account/feedback",
      },
    ],
  },
];
