import { Icon } from "@/components/base/icon";
import { prettyDate } from "@/utils/formatDateTime";
import { useState } from "react";

interface CampaignDescriptionProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const DESCRIPTION_CHAR_LIMIT = 160;

function CampaignDescription({
  name,
  description,
  startDate,
  endDate,
}: CampaignDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLong = description.length > DESCRIPTION_CHAR_LIMIT;
  const displayedDescription =
    isLong && !isExpanded
      ? `${description.slice(0, DESCRIPTION_CHAR_LIMIT)}...`
      : description;

  return (
    <div className="w-full">
      {/* Dates */}
      <div className="flex items-center justify-between">
        <p className="text-n-800">
          Posted date :{" "}
          <span className="font-semibold text-n-900">
            {prettyDate(startDate, {
              disableRelativeDates: true,
            })}
          </span>
        </p>
        <span className="flex items-center gap-1.5 text-n-900 font-medium">
          <Icon name="Clock" size="sm" />
          Due{" "}
          {prettyDate(endDate, {
            disableRelativeDates: true,
          })}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-n-900 mt-6 mb-3">{name}</h3>

      {/* Description */}
      <p className="text-n-800">
        {displayedDescription}
        {isLong && (
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="ml-1 font-medium text-p-500"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  );
}

export default CampaignDescription;
