import { Icon } from "@/components/base/icon/Icon";
import { CartCountBadge } from "@/features/cart/components/CartCountBadge";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { cn } from "@/utils/cssHelpers";
import { Link, useMatches, useNavigate } from "@tanstack/react-router";
import { Suspense, type ReactNode } from "react";
import { AavakFinTechLogo } from "../compound/logo/AavakFinTechLogo";
import { AavakProtectLogo } from "../compound/logo/AavakProtectLogo";
import { Logo } from "../compound/logo/Logo";
import CategoriesTabNav from "./CategoriesTabNav";
import CategoriesTabNavSkeleton from "./CategoriesTabNavSkeleton";

export default function Header() {
  const loginDialog = useLoginDialog();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const showCategorySubNav = useMatches({
    select: (matches) => matches.some((m) => m.staticData?.showCategorySubNav),
  });
  const maxWidth = useMatches({
    select: (matches) => {
      const match = [...matches].reverse().find((m) => m.staticData?.maxWidth);
      return match?.staticData?.maxWidth as string | undefined;
    },
  });

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate({ to: "/account/my-orders" });
    } else {
      loginDialog.open({
        onSuccess: () => navigate({ to: "/account/my-orders" }),
      });
    }
  };

  const getAccountLabel = () => {
    if (isLoading) {
      return "...";
    } else if (isAuthenticated) {
      return user?.fullName || user?.phone || "Account";
    } else {
      return "Login";
    }
  };

  const NAV_ITEMS: NavItem[] = [
    {
      label: "Search",
      icon: <Icon name="Search" size="lg" className={iconClassName} />,
    },
    {
      label: "Sell Now",
      icon: <Icon name="Store" size="lg" className={iconClassName} />,
    },
    {
      label: "Cart",
      icon: (
        <div className="relative">
          <Icon name="ShoppingCart" size="lg" className={iconClassName} />
          <CartCountBadge />
        </div>
      ),
      link: "/cart",
    },
    {
      label: getAccountLabel(),
      icon: <Icon name="User" size="lg" className={iconClassName} />,
      onClick: handleAccountClick,
    },
    { label: "Fintech", icon: <AavakFinTechLogo />, isFinTechLogo: true },
    { label: "Protect", icon: <AavakProtectLogo /> },
  ];

  return (
    <div>
      <header className="border-b border-n-500">
        <div
          className={cn(
            "p-3 mx-auto flex items-center justify-between",
            maxWidth ? maxWidth : "max-w-8xl",
          )}
        >
          <Link to="/">
            <Logo className="w-32" />
          </Link>
          <div className="flex items-center gap-4">
            {NAV_ITEMS.map((item) => {
              const content = (
                <div
                  className={cn(
                    "fall flex-col gap-2 justify-between group cursor-pointer min-w-10",
                    item.isFinTechLogo && "ml-8",
                  )}
                >
                  {item.icon}
                  <p
                    className={cn(
                      "font-medium text-n-900  group-hover:text-n-950 transition-colors text-[13px]!",
                    )}
                  >
                    {item.label}
                  </p>
                </div>
              );

              if (item.link) {
                return (
                  <Link key={item.label} to={item.link}>
                    {content}
                  </Link>
                );
              }

              if (item.onClick) {
                return (
                  <button key={item.label} onClick={item.onClick}>
                    {content}
                  </button>
                );
              }

              return <div key={item.label}>{content}</div>;
            })}
          </div>
        </div>
      </header>
      {showCategorySubNav && (
        <Suspense fallback={<CategoriesTabNavSkeleton />}>
          <CategoriesTabNav />
        </Suspense>
      )}
    </div>
  );
}

const iconClassName = `text-n-900 group-hover:text-n-950`;

type NavItem = {
  label: string;
  icon: ReactNode;
  isFinTechLogo?: boolean;
  link?: string;
  onClick?: () => void;
};
