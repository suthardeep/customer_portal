import { AavakFinTechLogo } from "@/components/compound/logo/AavakFinTechLogo";

type Props = {
  className?: string;
};

export function HeaderFintechIcon({ className }: Props) {
  return (
    <div className={className}>
      <div className="fall flex-col gap-2 justify-between group cursor-pointer min-w-10 ml-8">
        <AavakFinTechLogo />
        <p className="font-medium text-n-900 group-hover:text-n-950 transition-colors text-[13px]!">
          Fintech
        </p>
      </div>
    </div>
  );
}
