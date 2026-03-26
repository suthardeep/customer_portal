import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_public/spotlight/_protected")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.fetchQuery(
        spotlightQueries.profile(),
      );
      if (!data.profile?.id) {
        throw redirect({ to: "/spotlight/buy-clips" });
      }
    } catch (e) {
      if (isRedirect(e)) throw e;
      throw redirect({ to: "/spotlight/buy-clips" });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
