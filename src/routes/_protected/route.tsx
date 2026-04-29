import Header from "@/components/shared/header/Header";
import { authQueries } from "@/features/auth/authQueries";
import { reviewQueries } from "@/features/reviews/reviewsQueries";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
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
    <div>
      <Header />
      <div className="max-w-8xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
