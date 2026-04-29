import { Icon } from "@/components/base/icon/Icon";
import { Image } from "@/components/base/Image";
import type { CampaignProduct } from "../types/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link } from "@tanstack/react-router";

interface CampaignProductCardProps {
  product: CampaignProduct;
}

export function CampaignProductCard({ product }: CampaignProductCardProps) {
  const notEligibleForShort = product.isLocked;
  const imageUrl = product.mediaUrls?.[0];

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      search={{ variantId: product.variantId }}
      className="flex flex-col gap-1 rounded-lg border border-n-400 bg-white p-2 group"
    >
      <div className="flex items-center gap-3">
        <div className="relative aspect-square size-16 shrink-0 overflow-hidden rounded-md">
          <Image
            src={imageUrl ?? ""}
            alt={product.name}
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <p className="line-clamp-1 font-medium text-n-900 group-hover:text-p-500">
            {product.name}
          </p>
          {product.brandName && (
            <span className="text-n-800">{product.brandName}</span>
          )}
          <p className="font-semibold text-n-900">
            {formatCurrency(product.price)}
          </p>
        </div>
        <Icon
          name={notEligibleForShort ? "Lock" : "ChevronRight"}
          size="md"
          className="text-n-900 shrink-0"
        />
      </div>
      {notEligibleForShort && (
        <div className="p-1 border text-center border-p-500 bg-p-50 rounded-lg fall mt-1 text-n-900">
          <p>
            You must purchase and receive this product before creating Spotlight
            content.
          </p>
        </div>
      )}
    </Link>
  );
}
