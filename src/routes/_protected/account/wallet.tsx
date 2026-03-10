import Divider from "@/components/base/Divider";
import { Image } from "@/components/base/Image";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { HeldAmountCard } from "@/features/account/wallet/components/HeldAmountCard";
import { RedeemAmountCard } from "@/features/account/wallet/components/RedeemAmountCard";
import { TransactionHistory } from "@/features/account/wallet/components/TransactionHistory";
import { walletQueries } from "@/features/account/wallet/walletQueries";
import { AnimatedNumber } from "@/components/base/AnimatedNumber";
import { formatCurrency } from "@/utils/formatCurrency";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account/wallet")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(walletQueries.balance());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(walletQueries.balance());
  return (
    <div className="p-0!">
      <div className="lg:p-6">
        <AccountPageHeader title="Aavak Balance" />
        <div className="fall gap-3 mt-8">
          <div className="size-10">
            <Image
              src="/aavak-coin-v1.png"
              alt="aavak-coin-image"
              className="object-contain"
            />
          </div>
          <AnimatedNumber
            value={data?.totalBalance}
            formatter={formatCurrency}
            className="text-3xl! font-bold"
            wrapperClassName="text-3xl"
          />
        </div>
        <p className="text-n-900 text-center mt-3 mb-8">Available Balance</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2">
          <RedeemAmountCard earnedBalance={data?.earnedBalance} />
          <HeldAmountCard heldBalance={data?.heldBalance} />
        </div>
      </div>
      <Divider />
      <div className="lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h6 className="font-semibold">Transaction History</h6>
        </div>
        <TransactionHistory />
      </div>
      {/* <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h6 className="font-semibold">
            {isTransactionHistory?.isOpen ? "Transaction" : "Withdrawal"}{" "}
            History
          </h6>
          <Button
            onClick={isTransactionHistory.toggle}
            variant="ghost"
            size="sm"
          >
            View {isTransactionHistory.isOpen ? "Transactions" : "Withdrawals"}
          </Button>
        </div>
        {isTransactionHistory.isOpen ? (
          <TransactionHistory />
        ) : (
          <WithdrawalHistory />
        )}
      </div> */}
    </div>
  );
}
