import { Link } from "@tanstack/react-router";
import { Logo } from "./compound/logo/Logo";
import { AavakProtectLogo } from "./compound/logo/AavakProtectLogo";
import CategoriesTabNav from "./CategoriesTabNav";
import { Suspense } from "react";
import CategoriesTabNavSkeleton from "./CategoriesTabNavSkeleton";
import { AavakFinTechLogo } from "./compound/logo/AavakFinTechLogo";

export default function Header() {
  return (
    <div>
      <header className="border-b border-n-500">
        <div className="p-3 max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Logo className="w-32" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="fall flex-col gap-1">
              <AavakFinTechLogo />
              <p>Fintech</p>
            </div>
            <div className="fall flex-col gap-1">
              <AavakProtectLogo />
              <p>Protect</p>
            </div>
          </div>
        </div>
      </header>
      <Suspense fallback={<CategoriesTabNavSkeleton />}>
        <CategoriesTabNav />
      </Suspense>
    </div>
  );
}
