import { authQueries } from "@/features/auth/authQueries";
import { createFileRoute, isRedirect, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery(authQueries.profile());

      if (user) {
        throw redirect({
          to: "/account/my-orders",
          search: { currentPage: 1 },
        });
      }
    } catch (e) {
      if (isRedirect(e)) throw e;
      // Not authenticated - allow access
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
