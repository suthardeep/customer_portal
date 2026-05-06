import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { MyOrdersCardSkeleton } from "./MyOrdersCardSkeleton";

export function MyOrdersListSkeleton() {
  return (
    <AccountPageWrapper>
      <div className="w-full">
        <div className="mb-4 flex items-center gap-1">
          <div className="shimmer h-6 w-28 rounded" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <MyOrdersCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </AccountPageWrapper>
  );
}
