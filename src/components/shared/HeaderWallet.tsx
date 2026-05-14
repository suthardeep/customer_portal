import { Image } from "@/components/base/Image";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { walletQueries } from "@/features/account/wallet/walletQueries";
import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

interface HeaderWalletProps {
  className?: string;
}

export function HeaderWallet({ className }: HeaderWalletProps) {
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();
  const navigate = useNavigate();
  const { data: balance, isLoading } = useQuery(walletQueries.balance());

  if (isAuthenticated) {
    return (
      <Link to="/account/wallet" className={cn(containerClassName, className)}>
        <WalletContent
          isLoading={isLoading}
          balance={balance?.totalBalance ?? 0}
        />
      </Link>
    );
  }

  return (
    <button
      onClick={() => loginDialog.open({ onSuccess: () => navigate({ to: "/account/wallet" }) })}
      className={cn(containerClassName, className)}
    >
      <WalletContent isLoading={false} balance={0} />
    </button>
  );
}

const containerClassName =
  "fall flex-col gap-1.5 justify-between group cursor-pointer min-w-10";

function WalletContent({
  isLoading,
  balance,
}: {
  isLoading: boolean;
  balance: number;
}) {
  return (
    <>
      <div className="size-6 rounded-full overflow-hidden">
        <Image src="/aavak-coin-v1.png" alt="Aavak Coins" eager />
      </div>
      {isLoading ? (
        <div className="shimmer w-12 h-4" />
      ) : (
        <div className="rounded-full fall px-1.5 bg-linear-to-b from-[#F5EE80] to-[#E0BF45] border border-[#A48635]">
          <span className="text-n-1000 font-semibold text-[11px]">
            {formatCurrency(balance)}
          </span>
        </div>
      )}
    </>
  );
}
