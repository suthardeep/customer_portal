import { useQuery } from "@tanstack/react-query";
import { spotlightQueries } from "../spotlightQueries";
import { NotLoggedInEmptyState } from "./NotLoggedInEmptyState";
import { NoSpotlightProfileEmptyState } from "./NoSpotlightProfileEmptyState";
import { SpotlightProfileSidebarContent } from "./SpotlightProfileSidebarContent";
import { SpotlightProfileSidebarSkeleton } from "./skeletons/SpotlightProfileSidebarSkeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function SpotlightProfileSidebar() {
  const { data, isLoading } = useQuery(spotlightQueries.profile());
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const loading = isLoading || authLoading;

  const hasSpotlightProfile = data?.profile?.id;

  return (
    <aside className="w-96 space-y-5 rounded-xl bg-white p-6 border border-n-400 hidden lg:block">
      {loading ? (
        <SpotlightProfileSidebarSkeleton />
      ) : !isAuthenticated ? (
        <NotLoggedInEmptyState
          title="Login to continue"
          subtitle="Please login to access your spotlight profile."
        />
      ) : !hasSpotlightProfile ? (
        <NoSpotlightProfileEmptyState />
      ) : (
        <SpotlightProfileSidebarContent profile={data.profile} />
      )}
    </aside>
  );
}
