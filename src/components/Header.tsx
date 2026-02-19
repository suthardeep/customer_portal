import { Link } from "@tanstack/react-router";
import { Logo } from "./compound/logo/Logo";
import { AavakProtectLogo } from "./compound/logo/AavakProtectLogo";
import CategoriesTabNav from "./CategoriesTabNav";
import { Suspense, type ReactNode } from "react";
import CategoriesTabNavSkeleton from "./CategoriesTabNavSkeleton";
import { AavakFinTechLogo } from "./compound/logo/AavakFinTechLogo";
import { cn } from "@/utils/cssHelpers";
import { Icon } from "@/components/base/icon/Icon";

export default function Header() {
  return (
    <div>
      <header className="border-b border-n-500">
        <div className="p-3 max-w-8xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Logo className="w-32" />
          </Link>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const content = (
                <div
                  className={cn(
                    "fall flex-col gap-2 justify-between group cursor-pointer",
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
      <Suspense fallback={<CategoriesTabNavSkeleton />}>
        <CategoriesTabNav />
      </Suspense>
    </div>
  );
}

const iconClassName = `text-n-900 group-hover:text-n-950`;

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
    icon: <Icon name="ShoppingCart" size="lg" className={iconClassName} />,
  },
  {
    label: "Login",
    icon: <Icon name="User" size="lg" className={iconClassName} />,
  },
  { label: "Fintech", icon: <AavakFinTechLogo />, isFinTechLogo: true },
  { label: "Protect", icon: <AavakProtectLogo /> },
];

type NavItem = {
  label: string;
  icon: ReactNode;
  isFinTechLogo?: boolean;
  link?: string;
  onClick?: () => void;
};
