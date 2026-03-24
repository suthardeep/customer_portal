import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { IconName } from "@/components/base/icon/iconRegistry";
import type { LinkProps } from "@tanstack/react-router";

type RouteTo = LinkProps["to"];

interface SpotlightNavItem {
  label: string;
  icon: IconName;
  to: RouteTo;
}

const NAV_ITEMS: SpotlightNavItem[] = [
  { label: "Home", icon: "Home", to: "/spotlight/buy-clips" },
  { label: "Shorts", icon: "PlayList", to: "/spotlight/shorts" },
  { label: "Bookmarks", icon: "Bookmark", to: "/spotlight/bookmarks" },
  { label: "Profile", icon: "User", to: "/spotlight/edit-profile" },
];

function SpotlightNavbarItem({ label, icon, to }: SpotlightNavItem) {
  const { user, isAuthenticated } = useAuth();
  const isProfile = label === "Profile";
  const profileLabel =
    isProfile && isAuthenticated
      ? user?.fullName?.split(" ")[0] || user?.phone || "Profile"
      : label;

  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1 px-4 py-1 text-n-800 transition-colors"
      activeProps={{ className: "text-p-600" }}
    >
      {isProfile && isAuthenticated && user?.profileImageUrl ? (
        <div className="size-5">
          <Image
            src={user.profileImageUrl}
            alt="profile"
            className="rounded-full object-cover shrink-0 border border-n-300"
          />
        </div>
      ) : (
        <Icon name={icon} size="lg" className="text-current" />
      )}
      <p className="font-medium">{profileLabel}</p>
    </Link>
  );
}

const SpotlightNavbar = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2  lg:hidden z-20 flex gap-2 items-center">
      <Link
        to="/spotlight/create-post"
        className="size-12 flex items-center justify-center rounded-full shadow-lg bg-linear-to-br from-[#4492EE] to-[#D556EC]"
      >
        <Icon name="Add" className="text-white" strokeWidth={3} size="xl" />
      </Link>
      <div className="flex items-center bg-white rounded-full shadow-lg px-1 py-1 border border-n-300">
        {NAV_ITEMS.map((item) => (
          <SpotlightNavbarItem key={item.label} {...item} />
        ))}
      </div>
    </nav>
  );
};

export default SpotlightNavbar;
