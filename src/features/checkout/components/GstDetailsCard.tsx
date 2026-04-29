import { Icon } from "@/components/base/icon/Icon";
import type { SaveGstResponse } from "@/features/account/gst/types/types";

interface GstDetailsCardProps {
  gstDetails: SaveGstResponse;
}

export function GstDetailsCard({ gstDetails }: GstDetailsCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-n-900">GST Details</p>
      <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
        <Icon
          name="Briefcase"
          size="md"
          className="mt-0.5 shrink-0 text-n-800"
        />
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold text-n-900">{gstDetails.businessName}</p>
          <p className="text-sm text-n-800">{gstDetails.gstin}</p>
          <p className="text-sm text-n-700">{gstDetails.billingAddress}</p>
        </div>
      </div>
    </div>
  );
}
