import { Button } from "@/components/base/button/Button";
import FallbackView from "@/components/empty-states/FallbackView";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account/")({
  component: () => (
    <FallbackView
      title="You should not be here"
      footer={
        <Link to="/account/my-orders" search={{ page: 1 }}>
          {" "}
          <Button>Go to my orders</Button>
        </Link>
      }
    />
  ),
  beforeLoad: () => {
    throw redirect({ to: "/account/my-orders", search: { page: 1 } });
  },
});
