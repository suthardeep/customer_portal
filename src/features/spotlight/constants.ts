import type {
  SpotlightCurrentStatus,
  SpotlightProfileStat,
  SpotlightSidebarSection,
} from "./types/types";
import { ReportReason } from "./types/enums";
import type { IconName } from "@/components/base/icon/iconRegistry";

export type SpotlightBenefit = { icon: IconName; label: string; image: string };
export const SPOTLIGHT_BENEFITS: readonly SpotlightBenefit[] = [
  {
    icon: "Cash",
    label: "Multi-tier Earning",
    image: "/spotlight-benifit-1.avif",
  },
  {
    icon: "Analytics",
    label: "Cross-platform Tracking",
    image: "/spotlight-benifit-2.avif",
  },
  {
    icon: "Coins",
    label: "AAVAK Coin Wallet",
    image: "/spotlight-benifit-3.avif",
  },
];

export type SpotlightHowItWork = {
  title: string;
  description: string;
  image: string;
};
export const SPOTLIGHT_HOW_IT_WORKS: readonly SpotlightHowItWork[] = [
  {
    title: "Review products",
    description:
      "Rate and review products & get selected be the voice of our brand, you help others shop better!",
    image: "/spotlight-marketing-1.avif",
  },
  {
    title: "Inspire others",
    description:
      "Once you are selected for the program, Share your OOTDs & be the face of our brand",
    image: "/spotlight-marketing-2.avif",
  },
  {
    title: "Earn rewards",
    description:
      "If you are great at something never do it for free! Earn monthly commissions Up to",
    image: "/spotlight-marketing-3.avif",
  },
];

export type SpotlightStepState = "inactive" | "active";
export type SpotlightJoinStep = {
  number: number;
  label: string;
  state: SpotlightStepState;
};
export const SPOTLIGHT_JOIN_STEPS: readonly SpotlightJoinStep[] = [
  { number: 1, label: "Complete Profile", state: "inactive" },
  { number: 2, label: "Get Approved", state: "active" },
  { number: 3, label: "Select Campaign", state: "inactive" },
];

export const REPORT_REASON_OPTIONS = [
  { label: "Spam", value: ReportReason.SPAM },
  { label: "Inappropriate", value: ReportReason.INAPPROPRIATE },
  { label: "Fake Product", value: ReportReason.FAKE_PRODUCT },
  { label: "Misleading", value: ReportReason.MISLEADING },
  { label: "Other", value: ReportReason.OTHER },
];

export const SPOTLIGHT_PROFILE_STATS: SpotlightProfileStat[] = [
  { value: "25k", label: "Views" },
  { value: "12", label: "Posts" },
];

export const SPOTLIGHT_CURRENT_STATUS: SpotlightCurrentStatus = {
  name: "Inizio",
  badge: "Starter",
};

export const CONTENT_NICHES = [
  "Lifestyle",
  "Fashion",
  "Tech",
  "Travel",
  "Food",
  "Fitness",
  "Beauty",
  "Gaming",
  "Finance",
  "Education",
] as const;

export const SPOTLIGHT_SIDEBAR_SECTIONS: SpotlightSidebarSection[] = [
  {
    title: "",
    items: [
      {
        label: "Create Post",
        icon: "AddSquare",
        to: "/spotlight/create-post",
      },
      {
        label: "Shorts",
        icon: "PlayList",
        to: "/spotlight/shorts",
      },
      {
        label: "Bookmarks",
        icon: "Bookmark",
        to: "/spotlight/bookmarks",
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        label: "Edit Profile",
        icon: "Pencil",
        to: "/spotlight/edit-profile",
      },
      {
        label: "Analytics",
        icon: "Analytics",
        to: "/spotlight/analytics",
      },
      {
        label: "My Posts",
        icon: "MyPost",
        to: "/spotlight/my-posts",
      },
    ],
  },
];
