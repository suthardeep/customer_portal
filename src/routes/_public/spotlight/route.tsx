import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { SpotlightProfileSidebar } from "@/features/spotlight/components/SpotlightProfileSidebar";
import { SpotlightRouteSkeleton } from "@/features/spotlight/components/skeletons/SpotlightRouteSkeleton";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import RouteErrorComponent from "@/components/empty-states/RouteErrorComponent";
import SpotlightNavbar from "@/features/spotlight/components/SpotlightNavbar";

export const Route = createFileRoute("/_public/spotlight")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.prefetchQuery(spotlightQueries.profile()),
      context.queryClient.prefetchInfiniteQuery(spotlightQueries.feedExplore()),
    ]);
  },
  pendingComponent: SpotlightRouteSkeleton,
  component: RouteComponent,
  errorComponent: RouteErrorComponent,
});

function RouteComponent() {
  return (
    <div className="flex gap-x-7 md:p-6 lg:py-8 items-stretch">
      <SpotlightProfileSidebar />
      <SpotlightNavbar />
      <div className="rounded-xl bg-white lg:[&>div]:p-6 lg:border border-n-400 w-full">
        <Outlet />
      </div>
    </div>
  );
}
