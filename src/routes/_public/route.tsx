import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { cn } from "@/utils/cssHelpers";
import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { siteConfigQueries } from "@/features/site-config/siteConfigQueries";

export const Route = createFileRoute("/_public")({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(siteConfigQueries.detail());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const maxWidth = useMatches({
    select: (matches) => {
      const match = matches.find((m) => m.staticData?.maxWidth);
      return match?.staticData?.maxWidth as
        | "none"
        | "max-w-7xl"
        | "max-w-8xl"
        | undefined;
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main
          className={cn(
            "mx-auto flex flex-1 w-full flex-col *:flex-1",
            maxWidth === "none" ? "" : "max-w-8xl",
          )}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
