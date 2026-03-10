import { Icon } from "@/components/base/icon/Icon";

type Props = {
  className?: string;
};

export function HeaderSellNowIcon({ className }: Props) {
  return (
    <div className={className}>
      <div className="fall flex-col gap-2 justify-between group cursor-pointer min-w-10">
        <Icon name="Store" size="lg" className={iconClassName} />
        <p className="font-medium text-n-900 group-hover:text-n-950 transition-colors text-[13px]!">
          Sell Now
        </p>
      </div>
    </div>
  );
}

const iconClassName = "text-n-900 group-hover:text-n-950";
