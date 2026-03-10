import { AavakProtectLogo } from "@/components/compound/logo/AavakProtectLogo";

type Props = {
  className?: string;
};

export function HeaderProtectIcon({ className }: Props) {
  return (
    <div className={className}>
      <div className="fall flex-col gap-2 justify-between group cursor-pointer min-w-10">
        <AavakProtectLogo />
        <p className="font-medium text-n-900 group-hover:text-n-950 transition-colors text-[13px]!">
          Protect
        </p>
      </div>
    </div>
  );
}
