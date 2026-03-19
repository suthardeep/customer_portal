import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { useQuery } from "@tanstack/react-query";
import { spotlightQueries } from "../spotlightQueries";
import { SpotlightProfileSidebarContent } from "./SpotlightProfileSidebarContent";
import { SpotlightProfileSidebarSkeleton } from "./skeletons/SpotlightProfileSidebarSkeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";

function SpotlightProfileEmptyState() {
  const loginDialog = useLoginDialog();

  const handleLoginClick = () => {
    loginDialog.open();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center h-[60dvh]">
      <div className="flex size-16 items-center justify-center rounded-full bg-p-50">
        <Icon name="User" size="xl" className="text-p-500" strokeWidth={3} />
      </div>
      <div className="space-y-1 my-1">
        <h6 className="font-semibold text-n-900">No profile found</h6>
        <p className="text-n-800">
          Your spotlight profile isn't set up yet. Please login to continue.
        </p>
      </div>
      <Button onClick={handleLoginClick}>Login</Button>
    </div>
  );
}

export function SpotlightProfileSidebar() {
  const { data, isLoading } = useQuery(spotlightQueries.profile());
  const { isLoading: authLoading } = useAuth();
  const loading = isLoading || authLoading;

  return (
    <aside className="w-96 space-y-5 rounded-xl bg-white p-6 border border-n-400 hidden lg:block">
      {loading ? (
        <SpotlightProfileSidebarSkeleton />
      ) : data ? (
        <SpotlightProfileSidebarContent profile={data.profile} />
      ) : (
        <SpotlightProfileEmptyState />
      )}
    </aside>
  );
}
