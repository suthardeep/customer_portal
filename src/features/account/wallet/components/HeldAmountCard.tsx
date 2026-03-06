import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { Popover } from "@/components/base/popover/Popover";
import InfoItem from "@/components/compound/InfoItem";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import { HeldCoinsInfo } from "./HeldCoinsInfo";
import { TopUpDialog } from "./TopUpDialog";

interface HeldAmountCardProps {
  heldBalance: number;
}

export function HeldAmountCard({ heldBalance }: HeldAmountCardProps) {
  const topUpSheet = useToggle();

  return (
    <>
      <div className="flex items-center justify-between border border-n-400 rounded-xl p-3">
        <InfoItem
          label="Held coins"
          trailingLabel={
            <Popover trigger={<Icon name="Info" />}>
              <HeldCoinsInfo />
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
                {formatCurrency(heldBalance)}{" "}
              </h6>
            </div>
          }
        />
        <Button onClick={topUpSheet.open}>Top Up</Button>
      </div>
      <TopUpDialog isOpen={topUpSheet.isOpen} onClose={topUpSheet.close} />
    </>
  );
}
