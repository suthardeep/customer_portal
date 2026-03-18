import SpotlightRouteHeader from "@/features/spotlight/components/SpotlightRouteHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/spotlight/campaigns")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SpotlightRouteHeader />
    </div>
  );
}
