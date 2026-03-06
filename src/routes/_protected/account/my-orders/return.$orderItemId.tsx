import { Image } from "@/components/base/Image";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { ReturnProductForm } from "@/features/account/my-orders/components/ReturnProductForm";
import { myOrderQueries } from "@/features/account/my-orders/myOrdersQueries";
import { formatCurrency } from "@/utils/formatCurrency";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/account/my-orders/return/$orderItemId",
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      myOrderQueries.detail(params.orderItemId),
    );
  },
});

function RouteComponent() {
  const { orderItemId } = Route.useParams();
  const { data: order } = useSuspenseQuery(myOrderQueries.detail(orderItemId));
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({
      to: "/account/my-orders/$orderItemId",
      params: { orderItemId },
    });
  };

  return (
    <div>
      <AccountPageHeader title="Return Item" />
      <div className="p-2 rounded-xl border border-n-400 flex gap-4">
        <div className="size-16 shrink-0 overflow-hidden">
          <Image
            src={order.productImage}
            alt={order.productName}
            className="size-full object-cover rounded-xl"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 mt-1">
          <h6 className="line-clamp-1 font-medium">{order.productName}</h6>
          <p className="line-clamp-1 font-medium text-n-800">
            {formatCurrency(order.itemPrice)}
          </p>
        </div>
      </div>
      <ReturnProductForm orderItemId={orderItemId} onSuccess={handleSuccess} />
    </div>
  );
}
