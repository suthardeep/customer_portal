import { Icon } from "@/components/base/icon/Icon";
import { formatCompactNumber } from "@/utils/formatCompactNumber";
import { prettyDate } from "@/utils/formatDateTime";
import type { ProductSeller } from "../types/types";

type Props = {
  seller: ProductSeller;
};

export function ProductSellerInfo({ seller }: Props) {
  return (
    <div className="border border-n-400 rounded-xl p-4 space-y-3">
      <p className="font-medium text-n-800 uppercase tracking-wide">
        Seller Info
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-full bg-p-100 flex items-center justify-center shrink-0">
            <Icon name="Store" size="md" className="text-p-500" />
          </div>
          <div>
            <p className="font-semibold text-n-900 leading-tight">
              {seller.businessName ?? seller.name}
            </p>
            {seller.businessName && (
              <p className="text-sm text-n-600">{seller.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          <Icon name="Star" size="sm" className="text-yellow-500" />
          <span className="text-sm font-medium text-n-900">
            {seller.avgRating.toFixed(1)}
          </span>
          <span className="text-sm text-n-800">
            ({formatCompactNumber(seller.totalReviews)} reviews)
          </span>
        </div>

        <div className="flex items-center gap-1 text-n-800">
          <Icon name="Calendar" size="sm" />
          <span className="text-sm">
            Selling since {prettyDate(seller.joinedDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
