import { Button } from "@/components/base/button/Button";
import FallbackView from "@/components/empty-states/FallbackView";
import { Link } from "@tanstack/react-router";

export function CartEmptyState() {
  return (
    <FallbackView
      title="Your cart is empty"
      subtitle="Add items to get started"
      icon="ShoppingCart"
      footer={
        <Link to="/">
          <Button variant="outline" color="primary" size="md">
            Continue Shopping
          </Button>
        </Link>
      }
    />
  );
}
