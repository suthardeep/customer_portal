import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { SpotlightProfileSidebar } from "@/features/spotlight/components/SpotlightProfileSidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import RouteErrorComponent from "@/components/empty-states/RouteErrorComponent";

export const Route = createFileRoute("/_public/spotlight")({
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(spotlightQueries.profile());
  },
  component: RouteComponent,
  errorComponent: RouteErrorComponent,
});

function RouteComponent() {
  return (
    <div className="flex gap-x-7 p-4 md:p-6 lg:py-8 items-start">
      <SpotlightProfileSidebar />
      <div className="rounded-xl bg-white lg:[&>div]:p-6 lg:border border-n-400 w-full">
        <Outlet />
      </div>
    </div>
  );
}
