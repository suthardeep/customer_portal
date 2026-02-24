import Header from "@/components/shared/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
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
