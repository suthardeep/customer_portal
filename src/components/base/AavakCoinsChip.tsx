import { Chip } from "@/components/base/chip/Chip";
import { Image } from "@/components/base/Image";

interface AavakCoinsChipProps {
  coins: number | undefined;
  label?: string;
}

export function AavakCoinsChip({ coins, label = "" }: AavakCoinsChipProps) {
  if (!coins || coins === 0) return;
  return (
    <Chip
      variant="filled"
      color="secondary"
      size="sm"
      className="inline-flex items-center gap-1.5"
    >
      <div className="size-4">
        <Image src="/aavak-coin-v1.png" alt="coin" eager />
      </div>
      <span className="text-nowrap text-s-900">
        {label || "Earn"} {coins}
      </span>
    </Chip>
  );
}
