import { Button } from "@/components/base/button/Button";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { useInfiniteQuery } from "@tanstack/react-query";
import { walletQueries } from "../walletQueries";
import { WithdrawalHistoryItemSkeleton } from "./skeletons/WithdrawalHistoryItemSkeleton";
import { WithdrawalHistoryItem } from "./WithdrawalHistoryItem";

const LOADING_SKELETON_COUNT = 5;

const loadingSkeleton = (
  <div className="divide-y divide-n-300">
    {Array.from({ length: LOADING_SKELETON_COUNT }).map((_, i) => (
      <WithdrawalHistoryItemSkeleton key={i} />
    ))}
  </div>
);

export function WithdrawalHistory() {
  const withdrawalsQuery = useInfiniteQuery(walletQueries.withdrawalsInfinite());

  const withdrawals =
    withdrawalsQuery.data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <QueryStateHandler
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query={withdrawalsQuery as any}
      loadingSkeleton={loadingSkeleton}
      emptyTitle="No withdrawals yet"
      isEmpty={!withdrawalsQuery.isLoading && withdrawals.length === 0}
    >
      <div>
        <div className="divide-y divide-n-400">
          {withdrawals.map((withdrawal) => (
            <WithdrawalHistoryItem key={withdrawal.id} withdrawal={withdrawal} />
          ))}
        </div>
        {withdrawalsQuery.hasNextPage && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              isLoading={withdrawalsQuery.isFetchingNextPage}
              onClick={() => withdrawalsQuery.fetchNextPage()}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </QueryStateHandler>
  );
}
