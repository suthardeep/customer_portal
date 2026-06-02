import FallbackView from "@/components/empty-states/FallbackView";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cartQueries } from "@/features/cart/cartQueries";
import { CartEmptyState } from "@/features/cart/components/CartEmptyState";
import { CartItemList } from "@/features/cart/components/CartItemList";
import { CartOfferBanner } from "@/features/cart/components/CartOfferBanner";
import { CartSummary } from "@/features/cart/components/CartSummary";
import CartSkeleton from "@/features/cart/components/skeletons/CartSkeleton";
import { DeliveryInfo } from "@/features/products/components/DeliveryInfo";
import { RecentlyViewedSection } from "@/features/user-activities/components/RecentlyViewedSection";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/cart")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(cartQueries.detail());
  },
  headers: () => ({
    'Cache-Control': 'private, no-store',
  }),
  pendingComponent: CartSkeleton,
  errorComponent: (err) => (
    <FallbackView
      title="Failed to load your cart"
      subtitle={err?.error?.message ?? "Please try again later"}
      icon="ShoppingCart"
      color="danger"
    />
  ),
  component: CartComponent,
});

function CartComponent() {
  const { data: cart, isLoading } = useSuspenseQuery(cartQueries.detail());
  const { isAuthenticated } = useAuth();

  const hasItems = cart.items.length > 0;

  return (
    <div className="flex flex-col gap-6 p-4 pb-28 lg:pb-4">
      {hasItems && (
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_400px] lg:items-start">
          <div className="flex flex-col gap-3">
            <DeliveryInfo />
            <CartItemList items={cart.items} />
            <CartOfferBanner offers={cart.offers ?? []} />
          </div>
          <CartSummary cart={cart} />
        </div>
      )}

      {!hasItems && isLoading && <CartSkeleton />}
      {!hasItems && !isLoading && <CartEmptyState />}

      {isAuthenticated && <RecentlyViewedSection />}
    </div>
  );
}
