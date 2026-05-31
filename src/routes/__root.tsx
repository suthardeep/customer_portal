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
import { TRENDING_PRODUCTS_PARAMS } from "@/features/products/constants";
import { productQueries } from "@/features/products/productQueries";
import { siteConfigQueries } from "@/features/site-config/siteConfigQueries";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  jsonLdScript,
} from "@/utils/jsonLd";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_URL,
} from "@/utils/seo";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_DESCRIPTION },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:type", content: "website" },
      { property: "og:url", content: APP_URL },
      { property: "og:image", content: `${APP_URL}/aavak-logo-white-bg.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${APP_URL}/aavak-logo-white-bg.jpg` },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "sitemap", type: "application/xml", href: "/api/sitemap.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: jsonLdScript(buildOrganizationJsonLd()),
      },
      {
        type: "application/ld+json",
        children: jsonLdScript(buildWebSiteJsonLd()),
      },
    ],
  }),

  shellComponent: RootDocument,
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(authQueries.profile());
    context.queryClient.prefetchQuery(spotlightQueries.profile());
    context.queryClient.prefetchQuery(cartQueries.detail());
    context.queryClient.prefetchQuery(productQueries.searchSuggestions());
    context.queryClient.prefetchQuery(
      productQueries.list(TRENDING_PRODUCTS_PARAMS),
    );
    context.queryClient.prefetchQuery(siteConfigQueries.detail());
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
