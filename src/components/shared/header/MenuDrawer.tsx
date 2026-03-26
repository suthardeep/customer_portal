import { IconButton } from "@/components/base/icon-button/IconButton";
import { Icon } from "@/components/base/icon/Icon";
import type { IconName } from "@/components/base/icon/iconRegistry";
import { Image } from "@/components/base/Image";
import Sheet from "@/components/base/sheet/Sheet";
import { AavakFinTechLogo } from "@/components/compound/logo/AavakFinTechLogo";
import { AavakProtectLogo } from "@/components/compound/logo/AavakProtectLogo";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { useToggle } from "@/hooks/useToggle";
import { useNavigate } from "@tanstack/react-router";

export function MenuDrawer() {
  const drawer = useToggle();
  const { isAuthenticated, user } = useAuth();
  const loginDialog = useLoginDialog();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    drawer.close();
    if (isAuthenticated) {
      navigate({ to: "/account" });
    } else {
      loginDialog.open({
        onSuccess: () => navigate({ to: "/account" }),
      });
    }
  };

  const handleCartClick = () => {
    drawer.close();
    navigate({ to: "/cart" });
  };
  const handleSpotlightClick = () => {
    drawer.close();
    navigate({ to: "/spotlight/buy-clips" });
  };

  const accountLabel = isAuthenticated
    ? user?.fullName?.split(" ")[0] || user?.phone || "Account"
    : "Login / Sign up";

  return (
    <>
      <IconButton
        icon="Menu"
        aria-label="Open menu"
        onClick={drawer.open}
        variant="ghost"
        color="neutral"
        size="md"
      />

      <Sheet
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        title="Menu"
        direction="right"
        size="sm"
      >
        <div>
          <nav className="flex flex-col divide-y divide-n-300">
            <DrawerItem
              icon="ShoppingCart"
              label="Cart"
              onClick={handleCartClick}
            />
            <button
              onClick={handleAccountClick}
              className="flex items-center gap-3 py-3.5 px-1 w-full text-left group"
            >
              {isAuthenticated && user?.profileImageUrl ? (
                <div className="size-5">
                  <Image
                    src={user.profileImageUrl}
                    alt={accountLabel}
                    className="rounded-full object-cover shrink-0 border border-n-500"
                  />
                </div>
              ) : (
                <Icon
                  name="User"
                  size="md"
                  className="text-n-800 group-hover:text-p-600 shrink-0"
                />
              )}
              <p className="font-medium text-n-900 group-hover:text-p-600">
                {accountLabel}
              </p>
            </button>
            <DrawerItem
              icon="Wallet"
              label="Wallet"
              onClick={() => {
                drawer.close();
                navigate({ to: "/account/wallet" });
              }}
            />
            <DrawerItem icon="Store" label="Sell Now" />
            <DrawerItem
              icon="VideoCameraSpark"
              label="Spotlight"
              onClick={handleSpotlightClick}
            />
            <button className="flex items-center gap-3 py-3.5 px-1 w-full text-left group">
              <AavakFinTechLogo />
              <p className="font-medium text-n-900 group-hover:text-p-600">
                Fintech
              </p>
            </button>
            <button className="flex items-center gap-3 py-3.5 px-1 w-full text-left group">
              <AavakProtectLogo />
              <p className="font-medium text-n-900 group-hover:text-p-600">
                Protect
              </p>
            </button>
          </nav>
        </div>
      </Sheet>
    </>
  );
}

function DrawerItem({
  icon,
  label,
  onClick,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 py-3.5 px-1 w-full text-left group"
    >
      <Icon
        name={icon}
        size="md"
        className="text-n-800 group-hover:text-p-600 shrink-0"
      />
      <p className="font-medium text-n-900 group-hover:text-p-600">{label}</p>
    </button>
  );
}
