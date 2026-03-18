import { Image } from "@/components/base/Image";

interface AnalyticsAavakCoinsProps {
  aavakCoinsEarned: number;
}

const formatter = new Intl.NumberFormat("en-IN");

export function AnalyticsAavakCoins({
  aavakCoinsEarned,
}: AnalyticsAavakCoinsProps) {
  return (
    <div className="rounded-xl bg-linear-to-r from-p-50/50 via-p-200 to-p-50/50 py-4 px-8 flex items-center justify-between">
      <div className="space-y-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-p-700">
          Aavak Coins Earned
        </span>
        <p className="text-2xl font-bold text-p-900">
          {formatter.format(aavakCoinsEarned)}
        </p>
      </div>
      <div className="size-12">
        <Image src="/aavak-coin-v1.png" alt="coin" eager />
      </div>
    </div>
  );
}
