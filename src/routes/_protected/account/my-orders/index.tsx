import Pagination from "@/components/compound/Pagination";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import FallbackView from "@/components/empty-states/FallbackView";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { MyOrdersCard } from "@/features/account/my-orders/components/MyOrdersCard";
import { MyOrdersListSkeleton } from "@/features/account/my-orders/components/skeletons/MyOrdersListSkeleton";
import { MY_ORDERS_PAGE_SIZE } from "@/features/account/my-orders/constants";
import { myOrderQueries } from "@/features/account/my-orders/myOrdersQueries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const myOrdersSearchSchema = z.object({
  currentPage: z.number().int().min(1).catch(1),
});

export const Route = createFileRoute("/_protected/account/my-orders/")({
  validateSearch: myOrdersSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    const { currentPage } = deps;
    await context.queryClient.ensureQueryData(
      myOrderQueries.list({ currentPage, pageSize: MY_ORDERS_PAGE_SIZE }),
    );
  },
  headers: () => ({
    'Cache-Control': 'private, no-store',
  }),
  pendingComponent: MyOrdersListSkeleton,
  errorComponent: () => (
    <FallbackView
      title="Unable to load your orders"
      icon="PackageRemove"
      color="danger"
    />
  ),
  component: MyOrdersComponent,
});

function MyOrdersComponent() {
  const { currentPage } = Route.useSearch();
  const params = { currentPage, pageSize: MY_ORDERS_PAGE_SIZE };
  const myOrdersQuery = useQuery(myOrderQueries.list(params));

  return (
    <AccountPageWrapper>
      <AccountPageHeader title="My Orders" />

      <QueryStateHandler
        query={myOrdersQuery}
        loadingSkeleton={<MyOrdersListSkeleton />}
        emptyTitle="No orders yet"
        fallbackIcon="PackageRemove"
        isEmpty={myOrdersQuery.data?.meta?.totalRows === 0}
      >
        <div className="space-y-6">
          {myOrdersQuery.data?.data.map((order) => (
            <MyOrdersCard key={order.orderItemId} order={order} enableRating />
          ))}
          {myOrdersQuery.data && (
            <Pagination {...myOrdersQuery.data.meta} scrollToTopOnPageChange />
          )}
        </div>
      </QueryStateHandler>
    </AccountPageWrapper>
  );
}
