import { Link, useMatches } from "@tanstack/react-router";
import { Icon } from "@/components/base/icon/Icon";
import { HeaderCartIcon } from "../header/HeaderCartIcon";
import { HeaderAccountIcon } from "../header/HeaderAccountIcon";
import MultiPlatformIcon from "@/components/compound/logo/MultiPlatformIcon";

const BottomBar = () => {
  const showBottomBar = useMatches({
    select: (matches) => matches.some((m) => m.staticData?.showBottomBar),
  });
  if (!showBottomBar) return null;
  return (
    <div className="lg:hidden fixed bottom-4 left-2 right-2 flex items-center gap-4">
      <div className="border border-n-400 rounded-full p-2 bg-white w-full flex items-center justify-around shadow-lg">
        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-n-900"
          activeProps={{
            className: "flex flex-col items-center gap-0.5 text-p-600",
          }}
          activeOptions={{ exact: true }}
        >
          <Icon name="Home" size="lg" className="text-inherit" />
          <p className="text-xs text-inherit font-medium">Home</p>
        </Link>
        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-n-900"
          activeProps={{
            className: "flex flex-col items-center gap-0.5 text-p-600",
          }}
          activeOptions={{ exact: true }}
        >
          <Icon name="Explore" size="lg" className="text-inherit" />
          <p className="text-xs text-inherit font-medium">Explore</p>
        </Link>
        <HeaderCartIcon isMobile />
        <HeaderAccountIcon isMobile />
      </div>
      <MultiPlatformIcon />
    </div>
  );
};

export default BottomBar;
