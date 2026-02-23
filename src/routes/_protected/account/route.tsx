import AccountSidebar from "@/features/account/components/AccountSidebar";
import { authQueries } from "@/features/auth/authQueries";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account")({
  loader: async ({ context }) => {
    // Prefetch user profile for the sidebar
    await context.queryClient.ensureQueryData(authQueries.profile());
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex gap-x-7 p-4 md:p-6 lg:py-8">
      <AccountSidebar />
      <div className="rounded-xl bg-white p-6 border border-n-400 w-full">
        <Outlet />
      </div>
    </div>
  );
}
