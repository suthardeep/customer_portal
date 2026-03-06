import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { Popover } from "@/components/base/popover/Popover";
import InfoItem from "@/components/compound/InfoItem";
import { formatCurrency } from "@/utils/formatCurrency";
import { RedeemAmountInfo } from "./RedeemAmountInfo";

interface RedeemAmountCardProps {
  earnedBalance: number;
}

export function RedeemAmountCard({ earnedBalance }: RedeemAmountCardProps) {
  return (
    <div className="flex items-center justify-between border border-n-400 rounded-xl p-3">
      <InfoItem
        label="Redeem amount"
        trailingLabel={
          <Popover trigger={<Icon name="Info" />}>
            <RedeemAmountInfo />
          </Popover>
        }
        value={
          <div className="fall gap-1">
            <div className="size-5">
              <Image
                src="/aavak-coin-v1.png"
                alt="aavak-coin-image"
                className="object-contain"
              />
            </div>
            <h6 className="font-bold text-n-1000">
              {" "}
              {formatCurrency(earnedBalance)}{" "}
            </h6>
          </div>
        }
      />
      <Button variant="outline">Withdraw</Button>
    </div>
  );
}
