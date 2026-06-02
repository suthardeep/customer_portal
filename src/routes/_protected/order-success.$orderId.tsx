import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { Image } from "@/components/base/Image";
import FallbackView from "@/components/empty-states/FallbackView";
import { myOrderQueries } from "@/features/account/my-orders/myOrdersQueries";
import OrderSuccessSkeleton from "@/features/checkout/components/skeletons/OrderSuccessSkeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/order-success/$orderId")({
  loader: async ({ context, params }) => {
    await context.queryClient.fetchQuery({
      ...myOrderQueries.order(params.orderId),
      retry: 4,
      retryDelay: (attempt: number) => attempt * 2000,
    });
  },
  headers: () => ({
    'Cache-Control': 'private, no-store',
  }),
  pendingComponent: OrderSuccessSkeleton,
  errorComponent: ({ error }) => (
    <div className="flex mt-32 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <FallbackView
          title="Could not load order"
          subtitle={(error as Error)?.message ?? "Unknown error"}
          icon="AlertCircle"
          color="danger"
        />
      </div>
    </div>
  ),
  component: OrderSuccessComponent,
});

function OrderSuccessComponent() {
  const { orderId } = Route.useParams();
  const { data: order } = useSuspenseQuery(myOrderQueries.order(orderId));

  const totalCoinsEarned = order.items.reduce(
    (sum, item) => sum + item.aavakCoinsEarned * item.quantity,
    0,
  );

  return (
    <div className="flex mt-32 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Green check image */}
        <div className="flex justify-center">
          <div className="size-28">
            <Image
              src="/green-check.webp"
              alt="Order confirmed"
              eager
              className="object-contain"
            />
          </div>
        </div>

        {/* Title & subtitle */}
        <div className="space-y-1 text-center">
          <h3 className="font-bold text-n-900">Order Confirmed!</h3>
          <p className="text-n-800">Your Shopping Journey Doesn't End Here!</p>
        </div>

        {/* Order number */}
        <p className="text-center text-n-800">{order.orderNumber}</p>

        {/* Deliver to */}
        <div className="flex items-center gap-3 rounded-xl border border-n-400 bg-n-50 px-4 py-3">
          <Icon name="Location" size="md" className="text-p-500 shrink-0" />
          <div>
            <p className="text-n-800">Deliver to</p>
            <p className="font-medium">{order.deliveryCity}</p>
          </div>
        </div>

        {/* Coins earned */}
        {totalCoinsEarned > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-n-400 bg-n-50 px-4 py-3">
            <p className="text-n-800">Coins earned from this order</p>
            <AavakCoinsChip coins={totalCoinsEarned} label=" " />
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <Link to="/account/my-orders" search={{ currentPage: 1 }}>
            <Button fullWidth>View Order</Button>
          </Link>
          <Link to="/">
            <Button fullWidth variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
