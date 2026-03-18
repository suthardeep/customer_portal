import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { Link } from "@tanstack/react-router";

const SpotlightRouteHeader = () => {
  return (
    <div>
      <AccountPageHeader title="Spotlight" />
      <div className="mt-4 flex items-center w-full">
        <Link
          to="/spotlight/buy-clips"
          className={className}
          activeProps={{
            className: activeClassName,
          }}
        >
          Buy Clips
        </Link>
        <Link
          to="/spotlight/campaigns"
          className={className}
          activeProps={{
            className: activeClassName,
          }}
        >
          Campaigns
        </Link>
      </div>
    </div>
  );
};

export default SpotlightRouteHeader;

const className = `text-sm text-n-800 border-b text-center pb-2 w-full font-medium border-b-transparent`;
const activeClassName = `text-p-900 !border-b-p-900`;
