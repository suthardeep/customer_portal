import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/order-error")({
  component: OrderErrorComponent,
});

function OrderErrorComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 mt-32">
      <div className="w-full max-w-md space-y-6">
        {/* Error icon */}
        <div className="flex justify-center">
          <Icon
            name="AlertCircle"
            size="lg"
            className="size-24 text-danger-500"
          />
        </div>

        {/* Title & subtitle */}
        <div className="space-y-1 text-center">
          <h3 className="font-semibold mb-2">Payment Failed</h3>
          <p className="text-n-800">
            Something went wrong while processing your payment. Your cart has
            been saved.
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate({ to: "/cart" })}>
            Go to Cart
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate({ to: "/checkout" })}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
