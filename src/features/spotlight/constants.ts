import type {
  SpotlightCurrentStatus,
  SpotlightProfileStat,
  SpotlightSidebarSection,
} from "./types/types";

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
        to: "/",
      },
      {
        label: "Shorts",
        icon: "PlayList",
        to: "/",
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
        label: "My Post",
        icon: "MyPost",
        to: "/spotlight/my-posts",
      },
    ],
  },
];
