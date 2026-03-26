import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon";
import { prettyDate } from "@/utils/formatDateTime";
import { prettyNumber } from "@/utils/prettyNumber";
import type { CampaignListItem } from "../types/types";
import { Link } from "@tanstack/react-router";
import CampaignDeliverables from "./CampaignDeliverables";

interface CampaignCardProps {
  campaign: CampaignListItem;
}

function CampaignCard({ campaign }: CampaignCardProps) {
  const activeTiers = Object.entries(campaign.tierBudgets).filter(
    ([, tier]) => tier.isActive,
  ) as [string, { budget: number; isActive: boolean }][];

  return (
    <Link
      to="/spotlight/campaigns/$campaignId"
      params={{ campaignId: campaign.id }}
      className="rounded-2xl bg-white border border-n-100 overflow-hidden shadow-sm"
    >
      {/* Image */}
      <div className="relative h-52">
        <Image
          src={campaign.image ?? ""}
          alt={campaign.name}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-white rounded-lg px-2.5 py-2 flex items-center gap-1.5 shadow-sm">
          <div className="size-5">
            <Image
              src="/aavak-coin-v1.png"
              alt="coin"
              eager
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-n-900">
            {prettyNumber(campaign.campaignBudget)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-2 space-y-2">
        <h5 className="font-bold">{campaign.name}</h5>

        {/* Tags */}
        <CampaignDeliverables
          videoDeliverables={campaign.videoDeliverables}
          imageDeliverables={campaign.imageDeliverables}
        />

        {/* Tier Budgets */}
        {activeTiers.length > 0 && (
          <div className="rounded-xl bg-red-50/50 border border-red-100 px-4 py-3">
            <span className="font-semibold uppercase tracking-wider text-n-900">
              Base Compensation Tiers
            </span>
            <div
              className={`grid divide-x divide-red-200 mt-6 ${activeTiers.length === 1 ? "grid-cols-1 justify-items-center" : activeTiers.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
            >
              {activeTiers.map(([tierName, tier]) => (
                <div
                  key={tierName}
                  className="flex flex-col items-center gap-1 px-2"
                >
                  <span className="font-semibold uppercase tracking-wide text-n-800">
                    {tierName}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-n-900">
                    <div className="size-4 shrink-0">
                      <Image src="/aavak-coin-v1.png" alt="coin" eager />
                    </div>
                    {prettyNumber(tier.budget)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-1.5 text-n-900 text-sm">
            <Icon name="Calendar" size="sm" />
            Due {prettyDate(campaign.endDate, { disableRelativeDates: true })}
          </span>
          <button className="flex items-center gap-0.5 font-semibold text-sm text-n-900">
            Details
            <Icon name="ChevronRight" size="sm" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default CampaignCard;
