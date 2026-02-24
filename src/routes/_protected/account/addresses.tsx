import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account/addresses")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/account/addresses"!</div>;
}
