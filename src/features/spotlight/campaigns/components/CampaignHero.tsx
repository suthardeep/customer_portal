import { Image } from "@/components/base/Image";
import { prettyNumber } from "@/utils/prettyNumber";

interface CampaignHeroProps {
  image: string | null;
  name: string;
  campaignBudget: string;
}

function CampaignHero({ image, name, campaignBudget }: CampaignHeroProps) {
  return (
    <div className="relative w-full">
      <div className="max-h-[60dvh] lg:max-h-[50dvh] overflow-hidden rounded-2xl">
        <Image src={image ?? ""} alt={name} className="object-cover h-full" />
      </div>
      <div className="absolute bottom-3 right-3 bg-white rounded-lg px-2.5 py-2 flex items-center gap-1.5 shadow-sm">
        <div className="size-5 shrink-0">
          <Image
            src="/aavak-coin-v1.png"
            alt="coin"
            eager
            className="object-contain"
          />
        </div>
        <span className="font-semibold text-n-900">
          {prettyNumber(campaignBudget)}
        </span>
      </div>
    </div>
  );
}

export default CampaignHero;
