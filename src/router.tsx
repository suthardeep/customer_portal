import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";

import * as Sentry from "@sentry/tanstackstart-react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import RouteErrorComponent from "./components/empty-states/RouteErrorComponent";
import NotFoundComponent from "./components/empty-states/NotFoundComponent";

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    defaultStaleTime: 5 * 60 * 1000,
    defaultErrorComponent: RouteErrorComponent,
    defaultNotFoundComponent: NotFoundComponent,
    context: {
      ...rqContext,
    },

    defaultPreload: "intent",
    defaultPreloadStaleTime: 1000 * 60 * 10,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  if (!router.isServer) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      enabled: import.meta.env.PROD,
      integrations: [],
      tracesSampleRate: 1.0,
      sendDefaultPii: true,
    });
  }

  return router;
};

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    showCategorySubNav?: boolean;
    showBottomBar?: boolean;
    showSpotlightBottomBar?: boolean;
    maxWidth?: "max-w-7xl" | "max-w-8xl" | "none";
    hideHeader?: "all" | "desktop" | "mobile";
  }
}
