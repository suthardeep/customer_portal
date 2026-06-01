import { Image } from "@/components/base/Image";
import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link } from "@tanstack/react-router";
import type { CartOffer, CartOfferRewardProduct } from "../types/types";
import { useAddCartItemMutation } from "../cartMutations";

interface CartOfferBannerProps {
  offers: CartOffer[];
}

export function CartOfferBanner({ offers }: CartOfferBannerProps) {
  if (!offers?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      {offers.map((offer) => (
        <OfferCard key={offer.discountId} offer={offer} />
      ))}
    </div>
  );
}

function OfferCard({ offer }: { offer: CartOffer }) {
  if (offer.offerState === "READY_TO_CLAIM") {
    return <ReadyToClaimCard offer={offer} />;
  }

  if (offer.offerState === "AUTO_APPLIED") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-success-300 bg-success-50 px-4 py-3">
        <Icon
          name="CheckCircle"
          size="md"
          className="text-success-600 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-success-800">
            {offer.discountName}
          </p>
          <p className="text-xs text-success-700">
            {offer.savingsAmount > 0
              ? `You save ${formatCurrency(offer.savingsAmount)}`
              : offer.message}
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-success-500 px-2 py-0.5 text-xs font-bold text-white">
          {offer.badge}
        </span>
      </div>
    );
  }

  if (offer.offerState === "CONDITIONS_NOT_YET_MET") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-n-300 bg-n-100 px-4 py-3">
        <Icon name="Coupon" size="md" className="text-n-500 shrink-0" />
        <p className="text-sm text-n-600">{offer.message}</p>
      </div>
    );
  }

  return null;
}

function ReadyToClaimCard({ offer }: { offer: CartOffer }) {
  const rewardProducts = offer.claimAction?.rewardProducts ?? [];

  return (
    <div className="rounded-xl border border-(--s-200) bg-n-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--s-200)">
        <div className="flex items-center gap-2">
          <Icon name="Coupon" size="md" className="text-s-600 shrink-0" />
          <p className="text-sm font-semibold text-s-700">{offer.message}</p>
        </div>
        <span className="shrink-0 rounded-md bg-s-600 px-2 py-0.5 text-xs font-bold text-white">
          {offer.badge}
        </span>
      </div>

      <div className="flex flex-col gap-2 px-4 py-3">
        {rewardProducts.map((reward) => (
          <RewardProductRow key={reward.productId} reward={reward} />
        ))}
      </div>
    </div>
  );
}

function RewardProductRow({ reward }: { reward: CartOfferRewardProduct }) {
  const addItem = useAddCartItemMutation();
  const product = reward.product;

  if (!product) return null;

  const handleAddFree = () => {
    addItem.mutate({ variantId: product.variantId, quantity: reward.quantity });
  };

  const imageUrl = product.mediaUrls[0];

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        search={{ variantId: product.variantId }}
        className="size-16 shrink-0 overflow-hidden rounded-lg border border-n-300 bg-n-100"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            className="size-full object-cover"
          />
        ) : (
          <div className="size-full flex items-center justify-center">
            <Icon name="ShoppingCart" size="md" className="text-n-400" />
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          search={{ variantId: product.variantId }}
        >
          <p className="line-clamp-2 text-sm font-semibold text-n-900">
            {product.name}
          </p>
        </Link>
        <p className="mt-0.5 text-xs text-n-800">Qty: {reward.quantity}</p>
      </div>

      {product.hasVariants ? (
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          search={{ variantId: product.variantId }}
        >
          <Button variant="filled" color="primary" size="sm">
            Select
          </Button>
        </Link>
      ) : (
        <Button
          variant="filled"
          color="secondary"
          size="sm"
          onClick={handleAddFree}
          isLoading={addItem.isPending}
        >
          Add Free
        </Button>
      )}
    </div>
  );
}
