import Pagination from "@/components/compound/Pagination";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import FallbackView from "@/components/empty-states/FallbackView";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import CouponCard from "@/features/account/coupons/components/CouponCard";
import { CouponsListSkeleton } from "@/features/account/coupons/components/skeletons/CouponsListSkeleton";
import { couponQueries } from "@/features/account/coupons/couponsQueries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const couponsSearchSchema = z.object({
  currentPage: z.number().int().min(1).catch(1),
});

export const Route = createFileRoute("/_protected/account/coupons")({
  validateSearch: couponsSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      couponQueries.list({ currentPage: deps.currentPage }),
    );
  },
  pendingComponent: CouponsListSkeleton,
  errorComponent: () => (
    <FallbackView title="Unable to load coupons" icon="Coupon" color="danger" />
  ),
  component: CouponsComponent,
});

function CouponsComponent() {
  const { currentPage } = Route.useSearch();
  const couponsQuery = useQuery(couponQueries.list({ currentPage }));

  return (
    <AccountPageWrapper>
      <AccountPageHeader title="Coupons" />
      <QueryStateHandler
        query={couponsQuery}
        loadingSkeleton={<CouponsListSkeleton />}
        emptyTitle="No coupons available"
        fallbackIcon="Coupon"
        isEmpty={couponsQuery.data?.meta?.totalRows === 0}
      >
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
          {couponsQuery.data?.data?.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
        {couponsQuery.data && (
          <Pagination {...couponsQuery.data.meta} scrollToTopOnPageChange />
        )}
      </QueryStateHandler>
    </AccountPageWrapper>
  );
}
