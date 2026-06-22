import Header from "@/components/shared/header/Header";
import { authQueries } from "@/features/auth/authQueries";
import { reviewQueries } from "@/features/reviews/reviewsQueries";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const path = location.pathname;

    try {
      const user = await context.queryClient.fetchQuery(authQueries.profile());
      if (!user)
        throw redirect({
          to: "/login",
          search: {
            redirectTo: path,
          },
        });
    } catch {
      throw redirect({
        to: "/login",
        search: {
          redirectTo: path,
        },
      });
    }
  },
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(authQueries.profile());
    context.queryClient.prefetchQuery(reviewQueries.myReviews());
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <div className="mx-auto max-w-8xl flex flex-1 w-full flex-col *:flex-1">
        <Outlet />
      </div>
    </div>
  );
}
