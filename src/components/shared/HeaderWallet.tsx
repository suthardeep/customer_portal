import { Image } from "@/components/base/Image";
import { walletQueries } from "@/features/account/wallet/walletQueries";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function HeaderWallet() {
  const { data: balance, isLoading } = useQuery(walletQueries.balance());

  return (
    <Link
      to="/account/wallet"
      className="fall flex-col gap-1.5 justify-between group cursor-pointer min-w-10"
    >
      <div className="size-6 rounded-full overflow-hidden">
        <Image src="/aavak-coin-v1.png" alt="Aavak Coins" eager />
      </div>
      {isLoading ? (
        <div className="shimmer w-12 h-4" />
      ) : (
        <div className="rounded-full fall px-1.5 bg-linear-to-b from-[#F5EE80] to-[#E0BF45] border border-[#A48635]">
          <span className="text-n-1000 font-semibold text-[11px]">
            {formatCurrency(balance?.totalBalance ?? 0)}
          </span>
        </div>
      )}
    </Link>
  );
}
