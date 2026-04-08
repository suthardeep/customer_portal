import { Button } from "@/components/base/button/Button";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { useInfiniteQuery } from "@tanstack/react-query";
import { walletQueries } from "../walletQueries";
import { TransactionHistoryItem } from "./TransactionHistoryItem";
import { TransactionHistoryItemSkeleton } from "./skeletons/TransactionHistoryItemSkeleton";

const LOADING_SKELETON_COUNT = 5;

const loadingSkeleton = (
  <div className="divide-y divide-n-300">
    {Array.from({ length: LOADING_SKELETON_COUNT }).map((_, i) => (
      <TransactionHistoryItemSkeleton key={i} />
    ))}
  </div>
);

export function TransactionHistory() {
  const transactionsQuery = useInfiniteQuery(
    walletQueries.transactionsInfinite(),
  );

  const transactions =
    transactionsQuery.data?.pages.flatMap((page) => page.data) ?? [];
  console.log(transactions);

  return (
    <QueryStateHandler
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query={transactionsQuery as any}
      loadingSkeleton={loadingSkeleton}
      emptyTitle="No transactions yet"
      isEmpty={!transactionsQuery.isLoading && transactions.length === 0}
    >
      <div>
        <div className="divide-y divide-n-400">
          {transactions.map((transaction) => (
            <TransactionHistoryItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
        {transactionsQuery.hasNextPage && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              isLoading={transactionsQuery.isFetchingNextPage}
              onClick={() => transactionsQuery.fetchNextPage()}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </QueryStateHandler>
  );
}
