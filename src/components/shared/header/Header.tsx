import { cn } from "@/utils/cssHelpers";
import { Link, useMatches } from "@tanstack/react-router";
import { Suspense } from "react";
import { Logo } from "../../compound/logo/Logo";
import CategoriesTabNav from "../CategoriesTabNav";
import CategoriesTabNavSkeleton from "../CategoriesTabNavSkeleton";
import { HeaderWallet } from "../HeaderWallet";
import { HeaderAccountIcon } from "./HeaderAccountIcon";
import { HeaderCartIcon } from "./HeaderCartIcon";
import { HeaderFintechIcon } from "./HeaderFintechIcon";
import { HeaderLocation } from "./HeaderLocation";
import { HeaderProtectIcon } from "./HeaderProtectIcon";
import { HeaderSearchIcon } from "./HeaderSearchIcon";
import { HeaderSellNowIcon } from "./HeaderSellNowIcon";
import { MenuDrawer } from "./MenuDrawer";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { AavakLogoIcon } from "@/components/compound/logo/AavakLogoIcon";

export default function Header() {
  const showCategorySubNav = useMatches({
    select: (matches) => matches.some((m) => m.staticData?.showCategorySubNav),
  });
  const maxWidth = useMatches({
    select: (matches) => {
      const match = [...matches].reverse().find((m) => m.staticData?.maxWidth);
      return match?.staticData?.maxWidth as string | undefined;
    },
  });

  return (
    <div>
      <header className="border-b border-n-500">
        <div
          className={cn(
            "p-3 mx-auto flex items-center gap-4",
            maxWidth ? maxWidth : "max-w-8xl",
          )}
        >
          <Link to="/" className="block lg:hidden">
            <AavakLogoIcon />
          </Link>
          <Link to="/" className="hidden lg:block">
            <Logo className="w-32" />
          </Link>
          <HeaderLocation />
          <div className="flex items-center gap-5 ml-auto">
            <HeaderWallet className="hidden lg:flex" />
            <HeaderSearchIcon className="hidden lg:flex" />
            <HeaderSellNowIcon className="hidden lg:flex" />
            <HeaderCartIcon className="hidden lg:flex" />
            <HeaderAccountIcon className="hidden lg:flex" />
            <HeaderFintechIcon className="hidden lg:flex" />
            <HeaderProtectIcon className="hidden lg:flex" />
            <div className="lg:hidden space-x-2">
              <Link to="/search" search={{ q: "" }}>
                <IconButton
                  icon="Search"
                  aria-label="Search"
                  variant="ghost"
                  color="neutral"
                />
              </Link>
              <MenuDrawer />
            </div>
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
