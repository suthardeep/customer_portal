import { Icon } from "@/components/base/icon";
import { Chip } from "@/components/base/chip/Chip";

interface CampaignDeliverablesProps {
  videoDeliverables: number;
  imageDeliverables: number;
  showHeadingText?: boolean;
}

function CampaignDeliverables({
  videoDeliverables,
  imageDeliverables,
  showHeadingText = false,
}: CampaignDeliverablesProps) {
  if (videoDeliverables === 0 && imageDeliverables === 0) return null;

  return (
    <div>
      {showHeadingText && (
        <h6 className="font-bold text-n-900 mb-2">Deliverables</h6>
      )}
      <div className="flex items-center gap-2">
        {videoDeliverables > 0 && (
          <Chip color="secondary" size="sm" className="bg-orange-50">
            <span className="flex items-center gap-1 font-medium text-orange-900">
              <Icon
                name="PlayList"
                size="sm"
                className="text-current"
                strokeWidth={2}
              />
              {videoDeliverables} Reels/mo
            </span>
          </Chip>
        )}
        {imageDeliverables > 0 && (
          <Chip color="secondary" size="sm" className="bg-sky-50">
            <span className="flex items-center gap-1 font-medium text-sky-900">
              <Icon
                name="Image"
                size="sm"
                className="text-current"
                strokeWidth={2}
              />
              {imageDeliverables} Post/mo
            </span>
          </Chip>
        )}
      </div>
    </div>
  );
}

export default CampaignDeliverables;
