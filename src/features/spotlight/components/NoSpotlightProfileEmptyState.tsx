import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { Link } from "@tanstack/react-router";

export function NoSpotlightProfileEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center h-[60dvh]">
      <div className="flex size-16 items-center justify-center rounded-full bg-p-50">
        <Icon name="User" size="xl" className="text-p-500" strokeWidth={3} />
      </div>
      <div className="space-y-1 my-1">
        <h6 className="font-semibold text-n-900">No profile found</h6>
        <p className="text-n-800">
          Your spotlight profile isn't set up yet. Create one to get started.
        </p>
      </div>
      <Link to="/spotlight/create-profile">
        <Button>Create Profile</Button>
      </Link>
    </div>
  );
}
