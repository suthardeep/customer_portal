import { Button } from "@/components/base/button/Button";
import FallbackView from "@/components/empty-states/FallbackView";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { MyOrderHeaderDetails } from "@/features/account/my-orders/components/MyOrderDetailsHeader";
import { MyOrdersCancelDialog } from "@/features/account/my-orders/components/MyOrdersCancelDialog";
import { MyOrdersDetailPaymentSection } from "@/features/account/my-orders/components/MyOrdersDetailPaymentSection";
import { MyOrdersTrackingDialog } from "@/features/account/my-orders/components/MyOrdersTrackingDialog";
import { MyOrdersTrackingTimeline } from "@/features/account/my-orders/components/MyOrdersTrackingTimeline";
import { MyOrdersDetailSkeleton } from "@/features/account/my-orders/components/skeletons/MyOrdersDetailSkeleton";
import { myOrderQueries } from "@/features/account/my-orders/myOrdersQueries";
import { OrderLifecycleStatus } from "@/features/account/my-orders/types/types";
import { useToggle } from "@/hooks/useToggle";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/account/my-orders/$orderItemId",
)({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      myOrderQueries.detail(params.orderItemId),
    );
  },
  pendingComponent: MyOrdersDetailSkeleton,
  errorComponent: () => (
    <FallbackView
      title="Unable to load order details"
      icon="PackageRemove"
      color="danger"
    />
  ),
  component: OrderDetailComponent,
});

function OrderDetailComponent() {
  const { orderItemId } = Route.useParams();
  const { data: order } = useSuspenseQuery(myOrderQueries.detail(orderItemId));
  const cancelDialog = useToggle();
  const trackingDialog = useToggle();

  const hasActions = order.canCancel || order.canReturn;
  const isDelivered = order.lifecycleStatus === OrderLifecycleStatus.DELIVERED;
  const isCancelled = order.lifecycleStatus === OrderLifecycleStatus.CANCELLED;
  const canReorder = isDelivered || isCancelled;
  console.log(order, "order");

  return (
    <AccountPageWrapper className="space-y-4">
      <AccountPageHeader title="Order Details" />

      <MyOrderHeaderDetails order={order} enableRating />

      <div className="rounded-xl border border-n-400 bg-n-50 p-4">
        <p className="mb-8 font-semibold">Order Tracking</p>
        <MyOrdersTrackingTimeline
          currentStatus={order.lifecycleStatus}
          trackingEvents={order.trackingEvents}
        />
        <Button
          variant="ghost"
          size="sm"
          className="mt-6"
          onClick={trackingDialog.open}
        >
          See all updates
        </Button>
      </div>

      <MyOrdersDetailPaymentSection order={order} />

      {isDelivered && <InvoiceDownloadButton orderItemId={orderItemId} />}

      {canReorder && (
        <Link
          to="/products/$productId"
          params={{ productId: order.productId }}
          search={{ variantId: order.variantId, quantity: order.quantity }}
        >
          <Button variant="outline" color="neutral" fullWidth>
            Order Again
          </Button>
        </Link>
      )}

      {hasActions && (
        <div className="flex gap-3 pt-1">
          {order.canCancel && (
            <Button
              variant="outline"
              color="danger"
              onClick={cancelDialog.open}
              fullWidth
            >
              Cancel Order
            </Button>
          )}
          {order.canReturn && (
            <Link
              to="/account/my-orders/return/$orderItemId"
              params={{ orderItemId }}
            >
              <Button
                variant="outline"
                color="neutral"
                startIcon="DeliveryReturn"
                fullWidth
              >
                Return Order
              </Button>
            </Link>
          )}
        </div>
      )}

      <MyOrdersTrackingDialog
        isOpen={trackingDialog.isOpen}
        onClose={trackingDialog.close}
        trackingEvents={order.trackingEvents}
        currentStatus={order.lifecycleStatus}
      />
      <MyOrdersCancelDialog
        orderItemId={orderItemId}
        isOpen={cancelDialog.isOpen}
        onClose={cancelDialog.close}
      />
    </AccountPageWrapper>
  );
}

function InvoiceDownloadButton({ orderItemId }: { orderItemId: string }) {
  const invoiceQuery = useQuery({
    ...myOrderQueries.invoice(orderItemId),
    enabled: false,
  });

  const handleDownload = async () => {
    const result = await invoiceQuery.refetch();
    if (result.data?.invoiceUrl) {
      window.open(result.data.invoiceUrl, "_blank");
    }
  };

  return (
    <Button
      variant="outline"
      color="neutral"
      onClick={handleDownload}
      isLoading={invoiceQuery.isFetching}
      fullWidth
    >
      Download Invoice
    </Button>
  );
}
