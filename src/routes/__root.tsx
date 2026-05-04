import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

import { AppSheets } from "../components/shared/AppSheets";
import { LoginDialog } from "../features/auth/components/LoginDialog";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles/styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { authQueries } from "@/features/auth/authQueries";
import { cartQueries } from "@/features/cart/cartQueries";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Aavak",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  loader: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(authQueries.profile()).catch(() => null);
    if (user) {
      context.queryClient.prefetchQuery(spotlightQueries.profile());
    }
    context.queryClient.prefetchQuery(cartQueries.detail());
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div>{children}</div>
        <LoginDialog />
        <AppSheets />
        <Toaster position="top-right" richColors={false} closeButton={false} />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
